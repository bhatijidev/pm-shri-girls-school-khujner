import db from '../config/db.js';
import { apiCache } from '../utils/cache.js';

// GET /api/notices — paginated, filterable, searchable
export const getAllNotices = (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const category = req.query.category;
    const search = req.query.search;
    const urgent = req.query.urgent;

    const cacheKey = `notices:list:${page}:${limit}:${category || ''}:${search || ''}:${urgent || ''}`;
    const cached = apiCache.get(cacheKey);
    if (cached) {
      res.setHeader('Cache-Control', 'public, max-age=30, stale-while-revalidate=60');
      res.setHeader('X-Cache', 'HIT');
      return res.json(cached);
    }

    let whereClause = 'WHERE n.is_active = 1';
    const params = [];

    // Filter by specific category (if not 'urgent' or 'all')
    if (category && category !== 'urgent' && category !== 'all') {
      whereClause += ' AND n.category = ?';
      params.push(category);
    }

    // Filter by urgent status (either category is 'urgent' or query param urgent is 'true'/'1')
    if (category === 'urgent' || urgent === 'true' || urgent === '1') {
      whereClause += " AND (n.is_urgent = 1 OR n.category = 'urgent')";
    }

    if (search && search.trim()) {
      whereClause += ' AND (n.title LIKE ? OR n.title_hindi LIKE ? OR n.content LIKE ? OR n.content_hindi LIKE ?)';
      const searchTerm = `%${search.trim()}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM notices n ${whereClause}`;
    const { total } = db.prepare(countQuery).get(...params);

    // Get paginated results
    const dataQuery = `
      SELECT n.*, u.full_name as author_name
      FROM notices n
      LEFT JOIN admin_users u ON n.created_by = u.id
      ${whereClause}
      ORDER BY n.is_urgent DESC, n.published_at DESC
      LIMIT ? OFFSET ?
    `;
    const notices = db.prepare(dataQuery).all(...params, limit, offset);

    const responsePayload = {
      success: true,
      data: notices,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };

    apiCache.set(cacheKey, responsePayload, 30); // 30s cache
    res.setHeader('Cache-Control', 'public, max-age=30, stale-while-revalidate=60');
    res.setHeader('X-Cache', 'MISS');
    return res.json(responsePayload);
  } catch (error) {
    console.error('Get all notices error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// GET /api/notices/latest — latest 5 for ticker
export const getLatestNotices = (req, res) => {
  try {
    const cacheKey = 'notices:latest';
    const cached = apiCache.get(cacheKey);
    if (cached) {
      res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=120');
      res.setHeader('X-Cache', 'HIT');
      return res.json(cached);
    }

    const notices = db.prepare(`
      SELECT id, title, title_hindi, category, is_urgent, published_at
      FROM notices
      WHERE is_active = 1
      ORDER BY published_at DESC
      LIMIT 5
    `).all();

    const responsePayload = {
      success: true,
      data: notices
    };

    apiCache.set(cacheKey, responsePayload, 60);
    res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=120');
    res.setHeader('X-Cache', 'MISS');
    return res.json(responsePayload);
  } catch (error) {
    console.error('Get latest notices error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// GET /api/notices/urgent — only urgent active notices
export const getUrgentNotices = (req, res) => {
  try {
    const cacheKey = 'notices:urgent';
    const cached = apiCache.get(cacheKey);
    if (cached) {
      res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=120');
      res.setHeader('X-Cache', 'HIT');
      return res.json(cached);
    }

    const notices = db.prepare(`
      SELECT id, title, title_hindi, content, content_hindi, category, published_at, attachment_url
      FROM notices
      WHERE is_active = 1 AND is_urgent = 1
      ORDER BY published_at DESC
    `).all();

    const responsePayload = {
      success: true,
      data: notices
    };

    apiCache.set(cacheKey, responsePayload, 60);
    res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=120');
    res.setHeader('X-Cache', 'MISS');
    return res.json(responsePayload);
  } catch (error) {
    console.error('Get urgent notices error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// GET /api/notices/:id — single notice
export const getNoticeById = (req, res) => {
  try {
    const { id } = req.params;

    const notice = db.prepare(`
      SELECT n.*, u.full_name as author_name
      FROM notices n
      LEFT JOIN admin_users u ON n.created_by = u.id
      WHERE n.id = ? AND n.is_active = 1
    `).get(id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found.'
      });
    }

    return res.json({
      success: true,
      data: notice
    });
  } catch (error) {
    console.error('Get notice by id error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// POST /api/notices — create notice
export const createNotice = (req, res) => {
  try {
    const {
      title, title_hindi, content, content_hindi,
      category, is_urgent, attachment_url, expires_at
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required.'
      });
    }

    const result = db.prepare(`
      INSERT INTO notices (title, title_hindi, content, content_hindi, category, is_urgent, attachment_url, expires_at, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      title, title_hindi || null, content, content_hindi || null,
      category || 'general', is_urgent ? 1 : 0,
      attachment_url || null, expires_at || null,
      req.user.id
    );

    const notice = db.prepare('SELECT * FROM notices WHERE id = ?').get(result.lastInsertRowid);
    apiCache.clearPrefix('notices:');

    return res.status(201).json({
      success: true,
      message: 'Notice created successfully.',
      data: notice
    });
  } catch (error) {
    console.error('Create notice error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// PUT /api/notices/:id — update notice
export const updateNotice = (req, res) => {
  try {
    const { id } = req.params;
    const {
      title, title_hindi, content, content_hindi,
      category, is_urgent, attachment_url, expires_at, is_active
    } = req.body;

    const existing = db.prepare('SELECT * FROM notices WHERE id = ?').get(id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found.'
      });
    }

    db.prepare(`
      UPDATE notices SET
        title = ?, title_hindi = ?, content = ?, content_hindi = ?,
        category = ?, is_urgent = ?, attachment_url = ?, expires_at = ?,
        is_active = ?, updated_at = datetime('now')
      WHERE id = ?
    `).run(
      title ?? existing.title,
      title_hindi ?? existing.title_hindi,
      content ?? existing.content,
      content_hindi ?? existing.content_hindi,
      category ?? existing.category,
      is_urgent !== undefined ? (is_urgent ? 1 : 0) : existing.is_urgent,
      attachment_url ?? existing.attachment_url,
      expires_at ?? existing.expires_at,
      is_active !== undefined ? (is_active ? 1 : 0) : existing.is_active,
      id
    );

    const updated = db.prepare('SELECT * FROM notices WHERE id = ?').get(id);
    apiCache.clearPrefix('notices:');

    return res.json({
      success: true,
      message: 'Notice updated successfully.',
      data: updated
    });
  } catch (error) {
    console.error('Update notice error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// DELETE /api/notices/:id — soft delete
export const deleteNotice = (req, res) => {
  try {
    const { id } = req.params;

    const existing = db.prepare('SELECT * FROM notices WHERE id = ?').get(id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found.'
      });
    }

    db.prepare('UPDATE notices SET is_active = 0, updated_at = datetime(\'now\') WHERE id = ?').run(id);
    apiCache.clearPrefix('notices:');

    return res.json({
      success: true,
      message: 'Notice deleted successfully.'
    });
  } catch (error) {
    console.error('Delete notice error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};
