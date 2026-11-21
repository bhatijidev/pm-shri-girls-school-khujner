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
    const language = req.query.language;
    const search = req.query.search;

    const cacheKey = `books:list:${page}:${limit}:${categoryId || ''}:${classGrade || ''}:${subject || ''}:${language || ''}:${search || ''}`;
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
      whereClause += ' AND b.subject = ?';
      params.push(subject);
    }

    if (language) {
      whereClause += ' AND b.language = ?';
      params.push(language);
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

// GET /api/books/public-stats — public stats for homepage
export const getPublicStats = (req, res) => {
  try {
    const cacheKey = 'public:stats';
    const cached = apiCache.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    const totalBooks = db.prepare('SELECT COUNT(*) as count FROM books WHERE is_active = 1').get().count;
    const totalNotices = db.prepare('SELECT COUNT(*) as count FROM notices WHERE is_active = 1').get().count;
    const urgentNotices = db.prepare('SELECT COUNT(*) as count FROM notices WHERE is_active = 1 AND is_urgent = 1').get().count;
    const totalViews = db.prepare('SELECT COALESCE(SUM(view_count), 0) as count FROM books WHERE is_active = 1').get().count;

    const payload = {
      success: true,
      data: {
        totalBooks,
        totalNotices,
        urgentNotices,
        totalViews,
        enrolledStudents: 550,
        boardPassRate: 96,
        facultyCount: 30
      }
    };

    apiCache.set(cacheKey, payload, 30);
    return res.json(payload);
  } catch (error) {
    console.error('Public stats error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// POST /api/books/:id/view — record a dynamic read/view of a book
export const recordBookView = (req, res) => {
  try {
    const { id } = req.params;
    const result = db.prepare('UPDATE books SET view_count = view_count + 1 WHERE id = ? AND is_active = 1').run(id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    apiCache.delete('books:stats');
    apiCache.delete('public:stats');
    return res.json({ success: true, message: 'Book read recorded.' });
  } catch (error) {
    console.error('Record book view error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// GET /api/books/stats — dashboard stats (always live & dynamic for admin)
export const getDashboardStats = (req, res) => {
  try {
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

    // Ensure the browser NEVER serves stale cached responses in the Admin CMS
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    return res.json(responsePayload);
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// GET /api/books/:id/pdf — Smart Direct PDF Streamer & Redirector (Zero 404 Guarantee)
export const getBookPdf = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const book = db.prepare('SELECT * FROM books WHERE id = ?').get(id);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    // Increment view count asynchronously
    try {
      db.prepare('UPDATE books SET view_count = view_count + 1 WHERE id = ?').run(id);
    } catch (e) {}

    const directUrl = book.pdf_file_url;
    if (directUrl && directUrl.startsWith('http')) {
      return res.redirect(302, directUrl);
    }

    if (book.external_url && book.external_url.startsWith('http')) {
      return res.redirect(302, book.external_url);
    }

    const fallbackUrl = `https://www.tiwariacademy.com/?s=${encodeURIComponent(book.title)}`;
    return res.redirect(302, fallbackUrl);
  } catch (err) {
    console.error('Book PDF redirect error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/books/filter-meta — Returns dynamic languages and subjects based on active filters
export const getFilterMetadata = (req, res) => {
  try {
    const selectedClass = req.query.class;
    const selectedCategory = req.query.category;
    const selectedLanguage = req.query.language;

    let whereClause = 'WHERE is_active = 1';
    const params = [];

    if (selectedCategory) {
      whereClause += ' AND category_id = ?';
      params.push(selectedCategory);
    }

    // 1. Languages with counts
    const languages = db.prepare(`
      SELECT language, COUNT(*) as count
      FROM books
      ${whereClause}
      AND language IS NOT NULL AND language != ''
      GROUP BY language
      ORDER BY count DESC
    `).all(...params);

    // 2. Subjects narrowed down by selectedClass & selectedLanguage
    let subWhere = whereClause;
    const subParams = [...params];
    if (selectedClass) {
      if (selectedClass === 'All Ages') {
        subWhere += " AND (class_grade = 'All Ages' OR class_grade LIKE '%Competitive%' OR class_grade LIKE '%All%')";
      } else {
        subWhere += ' AND (class_grade = ? OR class_grade LIKE ?)';
        subParams.push(selectedClass, `${selectedClass}-%`);
      }
    }
    if (selectedLanguage) {
      subWhere += ' AND language = ?';
      subParams.push(selectedLanguage);
    }

    const subjects = db.prepare(`
      SELECT subject, COUNT(*) as count
      FROM books
      ${subWhere}
      AND subject IS NOT NULL AND subject != ''
      GROUP BY subject
      ORDER BY count DESC, subject ASC
    `).all(...subParams);

    // Cache response for 60 seconds
    res.setHeader('Cache-Control', 'public, max-age=60');
    return res.json({
      success: true,
      data: { languages, subjects }
    });
  } catch (error) {
    console.error('Filter metadata error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
