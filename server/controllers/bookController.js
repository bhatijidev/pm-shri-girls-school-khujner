import db from '../config/db.js';
import { apiCache } from '../utils/cache.js';

// GET /api/books — paginated, filterable, searchable
export const getAllBooks = (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(Math.max(1, parseInt(req.query.limit) || 12), 60);
    const offset = (page - 1) * limit;
    const categoryId = req.query.category;
    const classGrade = req.query.class;
    const subject = req.query.subject;
    const search = req.query.search;

    const cacheKey = `books:list:${page}:${limit}:${categoryId || ''}:${classGrade || ''}:${subject || ''}:${search || ''}`;
    const cached = apiCache.get(cacheKey);
    if (cached) {
      res.setHeader('Cache-Control', 'public, max-age=30, stale-while-revalidate=60');
      res.setHeader('X-Cache', 'HIT');
      return res.json(cached);
    }

    let whereClause = 'WHERE b.is_active = 1';
    const params = [];
    let orderClause = 'ORDER BY b.created_at DESC, b.id ASC';

    if (categoryId) {
      whereClause += ' AND b.category_id = ?';
      params.push(categoryId);
    }

    if (classGrade) {
      if (classGrade === 'All Ages') {
        whereClause += " AND (b.class_grade = 'All Ages' OR b.class_grade LIKE '%Competitive%' OR b.class_grade LIKE '%All%')";
      } else {
        const classMatch = classGrade.match(/^Class\s+(\d+)$/i);
        if (classMatch) {
          const gNum = parseInt(classMatch[1], 10);
          const allowedGrades = [classGrade];
          if (gNum >= 1 && gNum <= 12) allowedGrades.push('Class 1-12');
          if (gNum >= 6 && gNum <= 12) allowedGrades.push('Class 6-12');
          if (gNum >= 9 && gNum <= 12) allowedGrades.push('Class 9-12');
          if (gNum >= 10 && gNum <= 12) allowedGrades.push('Class 10-12');
          if (gNum >= 11 && gNum <= 12) allowedGrades.push('Class 11-12');

          const placeholders = allowedGrades.map(() => '?').join(', ');
          whereClause += ` AND (b.class_grade IN (${placeholders}) OR b.class_grade LIKE ?)`;
          params.push(...allowedGrades, `${classGrade}-%`);

          // Put exact class textbooks at top, general multi-grade references at bottom
          const safeGrade = classGrade.replace(/'/g, "''");
          orderClause = `ORDER BY CASE WHEN b.class_grade = '${safeGrade}' THEN 0 ELSE 1 END, b.id ASC`;
        } else {
          whereClause += ' AND b.class_grade = ?';
          params.push(classGrade);
        }
      }
    }

    if (subject) {
      whereClause += ' AND b.subject LIKE ?';
      params.push(`%${subject}%`);
    }

    if (search) {
      whereClause += ' AND (b.title LIKE ? OR b.title_hindi LIKE ? OR b.author LIKE ? OR b.subject LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM books b ${whereClause}`;
    const { total } = db.prepare(countQuery).get(...params);

    // Get paginated results
    const dataQuery = `
      SELECT b.*, c.name as category_name, c.name_hindi as category_name_hindi, c.slug as category_slug, c.icon as category_icon, c.color as category_color
      FROM books b
      LEFT JOIN categories c ON b.category_id = c.id
      ${whereClause}
      ${orderClause}
      LIMIT ? OFFSET ?
    `;
    const books = db.prepare(dataQuery).all(...params, limit, offset);

    const responsePayload = {
      success: true,
      data: books,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };

    apiCache.set(cacheKey, responsePayload, 30);
    res.setHeader('Cache-Control', 'public, max-age=30, stale-while-revalidate=60');
    res.setHeader('X-Cache', 'MISS');
    return res.json(responsePayload);
  } catch (error) {
    console.error('Get all books error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// GET /api/books/:id — single book, increment view_count
export const getBookById = (req, res) => {
  try {
    const { id } = req.params;

    const book = db.prepare(`
      SELECT b.*, c.name as category_name, c.name_hindi as category_name_hindi, c.slug as category_slug, c.icon as category_icon, c.color as category_color
      FROM books b
      LEFT JOIN categories c ON b.category_id = c.id
      WHERE b.id = ? AND b.is_active = 1
    `).get(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found.'
      });
    }

    // Increment view count
    db.prepare('UPDATE books SET view_count = view_count + 1 WHERE id = ?').run(id);

    return res.json({
      success: true,
      data: { ...book, view_count: book.view_count + 1 }
    });
  } catch (error) {
    console.error('Get book by id error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// GET /api/books/categories — all categories
export const getCategories = (req, res) => {
  try {
    const cacheKey = 'books:categories';
    const cached = apiCache.get(cacheKey);
    if (cached) {
      res.setHeader('Cache-Control', 'public, max-age=120, stale-while-revalidate=300');
      res.setHeader('X-Cache', 'HIT');
      return res.json(cached);
    }

    const categories = db.prepare(`
      SELECT c.*, COUNT(b.id) as book_count
      FROM categories c
      LEFT JOIN books b ON c.id = b.category_id AND b.is_active = 1
      GROUP BY c.id
      ORDER BY c.sort_order ASC
    `).all();

    const responsePayload = {
      success: true,
      data: categories
    };

    apiCache.set(cacheKey, responsePayload, 120);
    res.setHeader('Cache-Control', 'public, max-age=120, stale-while-revalidate=300');
    res.setHeader('X-Cache', 'MISS');
    return res.json(responsePayload);
  } catch (error) {
    console.error('Get categories error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// GET /api/books/by-category/:slug — books for a specific category by slug
export const getBooksByCategory = (req, res) => {
  try {
    const { slug } = req.params;

    const category = db.prepare('SELECT * FROM categories WHERE slug = ?').get(slug);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.'
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;

    const { total } = db.prepare('SELECT COUNT(*) as total FROM books WHERE category_id = ? AND is_active = 1').get(category.id);

    const books = db.prepare(`
      SELECT b.*, c.name as category_name, c.name_hindi as category_name_hindi, c.slug as category_slug, c.icon as category_icon, c.color as category_color
      FROM books b
      LEFT JOIN categories c ON b.category_id = c.id
      WHERE b.category_id = ? AND b.is_active = 1
      ORDER BY b.class_grade ASC, b.subject ASC
      LIMIT ? OFFSET ?
    `).all(category.id, limit, offset);

    return res.json({
      success: true,
      data: {
        category,
        books,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get books by category error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// POST /api/books — create book
export const createBook = (req, res) => {
  try {
    const {
      title, title_hindi, author, publisher, description,
      category_id, class_grade, subject, cover_image_url,
      link_type, external_url, pdf_file_url, is_public_domain
    } = req.body;

    if (!title || !category_id || typeof title !== 'string' || title.trim().length > 300) {
      return res.status(400).json({
        success: false,
        message: 'Valid title (≤ 300 characters) and category_id are required.'
      });
    }

    const cleanCategoryId = parseInt(category_id);
    if (!cleanCategoryId || cleanCategoryId < 1) {
      return res.status(400).json({
        success: false,
        message: 'category_id must be a valid positive integer.'
      });
    }

    // Verify category exists
    const category = db.prepare('SELECT id FROM categories WHERE id = ?').get(cleanCategoryId);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category_id.'
      });
    }

    const result = db.prepare(`
      INSERT INTO books (title, title_hindi, author, publisher, description, category_id, class_grade, subject, cover_image_url, link_type, external_url, pdf_file_url, is_public_domain)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      title, title_hindi || null, author || null, publisher || null,
      description || null, category_id, class_grade || null,
      subject || null, cover_image_url || null,
      link_type || 'external', external_url || null,
      pdf_file_url || null, is_public_domain ? 1 : 0
    );

    const book = db.prepare('SELECT * FROM books WHERE id = ?').get(result.lastInsertRowid);
    apiCache.clearPrefix('books:');

    return res.status(201).json({
      success: true,
      message: 'Book created successfully.',
      data: book
    });
  } catch (error) {
    console.error('Create book error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// PUT /api/books/:id — update book
export const updateBook = (req, res) => {
  try {
    const { id } = req.params;
    const {
      title, title_hindi, author, publisher, description,
      category_id, class_grade, subject, cover_image_url,
      link_type, external_url, pdf_file_url, is_public_domain, is_active
    } = req.body;

    const existing = db.prepare('SELECT * FROM books WHERE id = ?').get(id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Book not found.'
      });
    }

    db.prepare(`
      UPDATE books SET
        title = ?, title_hindi = ?, author = ?, publisher = ?,
        description = ?, category_id = ?, class_grade = ?, subject = ?,
        cover_image_url = ?, link_type = ?, external_url = ?,
        pdf_file_url = ?, is_public_domain = ?, is_active = ?,
        updated_at = datetime('now')
      WHERE id = ?
    `).run(
      title ?? existing.title,
      title_hindi ?? existing.title_hindi,
      author ?? existing.author,
      publisher ?? existing.publisher,
      description ?? existing.description,
      category_id ?? existing.category_id,
      class_grade ?? existing.class_grade,
      subject ?? existing.subject,
      cover_image_url ?? existing.cover_image_url,
      link_type ?? existing.link_type,
      external_url ?? existing.external_url,
      pdf_file_url ?? existing.pdf_file_url,
      is_public_domain !== undefined ? (is_public_domain ? 1 : 0) : existing.is_public_domain,
      is_active !== undefined ? (is_active ? 1 : 0) : existing.is_active,
      id
    );

    const updated = db.prepare('SELECT * FROM books WHERE id = ?').get(id);
    apiCache.clearPrefix('books:');

    return res.json({
      success: true,
      message: 'Book updated successfully.',
      data: updated
    });
  } catch (error) {
    console.error('Update book error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// DELETE /api/books/:id — soft delete
export const deleteBook = (req, res) => {
  try {
    const { id } = req.params;

    const existing = db.prepare('SELECT * FROM books WHERE id = ?').get(id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Book not found.'
      });
    }

    db.prepare('UPDATE books SET is_active = 0, updated_at = datetime(\'now\') WHERE id = ?').run(id);
    apiCache.clearPrefix('books:');

    return res.json({
      success: true,
      message: 'Book deleted successfully.'
    });
  } catch (error) {
    console.error('Delete book error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// GET /api/books/stats — dashboard stats
export const getDashboardStats = (req, res) => {
  try {
    const cacheKey = 'books:stats';
    const cached = apiCache.get(cacheKey);
    if (cached) {
      res.setHeader('Cache-Control', 'public, max-age=30, stale-while-revalidate=60');
      res.setHeader('X-Cache', 'HIT');
      return res.json(cached);
    }

    const totalBooks = db.prepare('SELECT COUNT(*) as count FROM books WHERE is_active = 1').get().count;
    const totalNotices = db.prepare('SELECT COUNT(*) as count FROM notices WHERE is_active = 1').get().count;
    const totalCategories = db.prepare('SELECT COUNT(*) as count FROM categories').get().count;
    const totalViews = db.prepare('SELECT COALESCE(SUM(view_count), 0) as count FROM books WHERE is_active = 1').get().count;
    const urgentNotices = db.prepare('SELECT COUNT(*) as count FROM notices WHERE is_active = 1 AND is_urgent = 1').get().count;

    const categoryStats = db.prepare(`
      SELECT c.name, c.name_hindi, c.icon, c.color, COUNT(b.id) as book_count
      FROM categories c
      LEFT JOIN books b ON c.id = b.category_id AND b.is_active = 1
      GROUP BY c.id
      ORDER BY book_count DESC
    `).all();

    const recentNotices = db.prepare(`
      SELECT id, title, title_hindi, category, is_urgent, published_at
      FROM notices
      WHERE is_active = 1
      ORDER BY published_at DESC
      LIMIT 5
    `).all();

    const responsePayload = {
      success: true,
      data: {
        totalBooks,
        totalNotices,
        totalCategories,
        totalViews,
        urgentNotices,
        categoryStats,
        recentNotices
      }
    };

    apiCache.set(cacheKey, responsePayload, 30);
    res.setHeader('Cache-Control', 'public, max-age=30, stale-while-revalidate=60');
    res.setHeader('X-Cache', 'MISS');
    return res.json(responsePayload);
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};
