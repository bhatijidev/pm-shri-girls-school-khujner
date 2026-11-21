import db from '../config/db.js';

// POST /api/contact — Public endpoint with anti-spam & rate limit protections
export const submitInquiry = (req, res) => {
  try {
    const { name, phone, email, inquiryType, message, website_url, bot_trap } = req.body;

    // 1. Anti-Bot Honeypot: Hidden input that only bots fill
    if (website_url || bot_trap) {
      return res.status(200).json({
        success: true,
        message: 'Inquiry submitted successfully',
        data: { ticket_id: 'PMSHRI-KHJ-' + Math.floor(100000 + Math.random() * 900000) }
      });
    }

    // 2. Input Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'कृपया अपना नाम दर्ज करें (Name is required)' });
    }
    const cleanPhone = (phone || '').replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return res.status(400).json({ success: false, message: 'कृपया मान्य 10-अंकीय मोबाइल नंबर दर्ज करें (Valid 10-digit phone required)' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'कृपया अपनी पूछताछ या संदेश लिखें (Message is required)' });
    }

    const trimmedPhone = cleanPhone.slice(-10);

    // 3. Flood Prevention: Same phone number cannot submit another inquiry within 3 minutes
    const recentPhoneInquiry = db.prepare(`
      SELECT id, ticket_id, created_at FROM contact_inquiries
      WHERE phone LIKE ? AND created_at > datetime('now', '-3 minutes')
    `).get(`%${trimmedPhone}`);

    if (recentPhoneInquiry) {
      return res.status(429).json({
        success: false,
        message: 'आपकी एक पूछताछ (Ticket: ' + recentPhoneInquiry.ticket_id + ') हाल ही में दर्ज हुई है। कृपया अगला फॉर्म भेजने से पहले 3 मिनट प्रतीक्षा करें या सीधे विद्यालय कार्यालय (95759 62662) पर कॉल करें।'
      });
    }

    // 4. Duplicate Spam Prevention: Identical message within 15 minutes is rejected
    const dupMessage = db.prepare(`
      SELECT id FROM contact_inquiries
      WHERE message = ? AND created_at > datetime('now', '-15 minutes')
    `).get(message.trim());

    if (dupMessage) {
      return res.status(429).json({
        success: false,
        message: 'यह संदेश पहले ही प्राप्त हो चुका है। कृपया डुप्लीकेट अनुरोध न भेजें।'
      });
    }

    const ticketId = 'PMSHRI-KHJ-' + Math.floor(100000 + Math.random() * 900000);

    const stmt = db.prepare(`
      INSERT INTO contact_inquiries (ticket_id, name, phone, email, inquiry_type, message, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, 'pending', datetime('now'), datetime('now'))
    `);

    stmt.run(
      ticketId,
      name.trim(),
      trimmedPhone,
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
        phone: trimmedPhone,
        inquiry_type: inquiryType,
        created_at: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error('Contact inquiry error:', err);
    res.status(500).json({ success: false, message: 'Failed to submit inquiry. Please try again or call the office directly.' });
  }
};

// POST /api/contact/manual — Protected Admin endpoint to create a lead/inquiry manually (e.g. phone or walk-in)
export const createManualInquiry = (req, res) => {
  try {
    const { name, phone, email, inquiry_type, message, status, admin_notes } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ success: false, message: 'Phone number is required' });
    }

    const ticketId = 'PMSHRI-KHJ-' + Math.floor(100000 + Math.random() * 900000);

    const stmt = db.prepare(`
      INSERT INTO contact_inquiries (ticket_id, name, phone, email, inquiry_type, message, status, admin_notes, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `);

    stmt.run(
      ticketId,
      name.trim(),
      phone.trim(),
      (email && email.trim()) || null,
      (inquiry_type && inquiry_type.trim()) || 'Office Walk-in / Phone',
      (message && message.trim()) || 'Recorded by School Administration',
      status || 'pending',
      admin_notes || null
    );

    const created = db.prepare('SELECT * FROM contact_inquiries WHERE ticket_id = ?').get(ticketId);

    res.status(201).json({
      success: true,
      message: 'Manual inquiry created successfully',
      data: created
    });
  } catch (err) {
    console.error('Manual inquiry creation error:', err);
    res.status(500).json({ success: false, message: 'Failed to create manual inquiry' });
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

// PATCH /api/contact/:id — Update status / admin notes / details (Admin only)
export const updateInquiryStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_notes, name, phone, email, inquiry_type, message } = req.body;

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
    if (name) {
      updates.push('name = ?');
      params.push(name.trim());
    }
    if (phone) {
      updates.push('phone = ?');
      params.push(phone.trim());
    }
    if (email !== undefined) {
      updates.push('email = ?');
      params.push(email ? email.trim() : null);
    }
    if (inquiry_type) {
      updates.push('inquiry_type = ?');
      params.push(inquiry_type.trim());
    }
    if (message) {
      updates.push('message = ?');
      params.push(message.trim());
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
