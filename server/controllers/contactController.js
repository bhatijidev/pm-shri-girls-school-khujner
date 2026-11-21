import db from '../config/db.js';

// POST /api/contact — Public endpoint with validation
export const submitInquiry = (req, res) => {
  try {
    const { name, phone, email, inquiryType, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }
    if (!phone || !phone.trim() || phone.replace(/\D/g, '').length < 10) {
      return res.status(400).json({ success: false, message: 'Valid 10-digit mobile number is required' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message / inquiry text is required' });
    }

    const ticketId = 'PMSHRI-KHJ-' + Math.floor(100000 + Math.random() * 900000);

    const stmt = db.prepare(`
      INSERT INTO contact_inquiries (ticket_id, name, phone, email, inquiry_type, message, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, 'pending', datetime('now'), datetime('now'))
    `);

    stmt.run(
      ticketId,
      name.trim(),
      phone.trim(),
      (email && email.trim()) || null,
      (inquiryType && inquiryType.trim()) || 'General Inquiry',
      message.trim()
    );

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: {
        ticket_id: ticketId,
        name: name.trim(),
        phone: phone.trim(),
        inquiry_type: inquiryType,
        created_at: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error('Contact inquiry error:', err);
    res.status(500).json({ success: false, message: 'Failed to submit inquiry. Please try again or call the office directly.' });
  }
};

// GET /api/contact — Protected admin endpoint
export const getInquiries = (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(Math.max(1, parseInt(req.query.limit) || 20), 100);
    const offset = (page - 1) * limit;
    const status = req.query.status;
    const search = req.query.search;

    let whereClause = 'WHERE 1=1';
    const params = [];

    if (status && status !== 'all') {
      whereClause += ' AND status = ?';
      params.push(status);
    }

    if (search && search.trim()) {
      whereClause += ' AND (name LIKE ? OR phone LIKE ? OR ticket_id LIKE ? OR message LIKE ?)';
      const term = `%${search.trim()}%`;
      params.push(term, term, term, term);
    }

    const { total } = db.prepare(`SELECT COUNT(*) as total FROM contact_inquiries ${whereClause}`).get(...params);

    const inquiries = db.prepare(`
      SELECT * FROM contact_inquiries
      ${whereClause}
      ORDER BY id DESC
      LIMIT ? OFFSET ?
    `).all(...params, limit, offset);

    // Get counts by status for admin badge
    const stats = db.prepare(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'contacted' THEN 1 ELSE 0 END) as contacted,
        SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) as resolved
      FROM contact_inquiries
    `).get();

    res.json({
      success: true,
      data: {
        inquiries,
        stats: {
          total: stats.total || 0,
          pending: stats.pending || 0,
          contacted: stats.contacted || 0,
          resolved: stats.resolved || 0
        },
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });
  } catch (err) {
    console.error('Error fetching inquiries:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch inquiries' });
  }
};

// PATCH /api/contact/:id — Update status / admin notes
export const updateInquiryStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_notes } = req.body;

    const existing = db.prepare('SELECT id FROM contact_inquiries WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    const updates = [];
    const params = [];

    if (status) {
      updates.push('status = ?');
      params.push(status);
    }
    if (admin_notes !== undefined) {
      updates.push('admin_notes = ?');
      params.push(admin_notes);
    }
    updates.push("updated_at = datetime('now')");
    params.push(id);

    db.prepare(`UPDATE contact_inquiries SET ${updates.join(', ')} WHERE id = ?`).run(...params);

    const updated = db.prepare('SELECT * FROM contact_inquiries WHERE id = ?').get(id);

    res.json({
      success: true,
      message: 'Inquiry updated successfully',
      data: updated
    });
  } catch (err) {
    console.error('Error updating inquiry:', err);
    res.status(500).json({ success: false, message: 'Failed to update inquiry' });
  }
};

// DELETE /api/contact/:id — Delete inquiry
export const deleteInquiry = (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM contact_inquiries WHERE id = ?').run(id);
    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (err) {
    console.error('Error deleting inquiry:', err);
    res.status(500).json({ success: false, message: 'Failed to delete inquiry' });
  }
};
