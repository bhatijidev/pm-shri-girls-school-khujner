import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

// Pre-computed dummy hash for constant-time comparison when user doesn't exist (prevents timing attacks)
const DUMMY_HASH = '$2a$12$K19j7Y4U83Xv6uPj5Wn6y.d1vM5K7yWj0P4aH1c5q3W9e7r1t3y5u';

// POST /api/auth/login
export const login = (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Valid username and password are required.'
      });
    }

    // Input sanitization: Trim and length boundary
    const cleanUsername = username.trim().toLowerCase();
    if (cleanUsername.length > 50 || password.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input length.'
      });
    }

    const user = db.prepare('SELECT * FROM admin_users WHERE username = ? AND is_active = 1').get(cleanUsername);

    // Constant-time execution: Always compare against user hash or dummy hash
    const targetHash = user ? user.password_hash : DUMMY_HASH;
    const isMatch = bcrypt.compareSync(password, targetHash);

    if (!user || !isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password.'
      });
    }

    // Update last login timestamp safely
    db.prepare('UPDATE admin_users SET last_login = datetime(\'now\') WHERE id = ?').run(user.id);

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
        full_name: user.full_name
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    return res.json({
      success: true,
      message: 'Login successful.',
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          full_name: user.full_name,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// GET /api/auth/profile
export const getProfile = (req, res) => {
  try {
    const user = db.prepare('SELECT id, username, full_name, email, role, last_login, created_at FROM admin_users WHERE id = ?').get(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    return res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// PUT /api/auth/change-password
export const changePassword = (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword || typeof oldPassword !== 'string' || typeof newPassword !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Old password and new password are required.'
      });
    }

    // Enforce stronger password policy
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters long.'
      });
    }

    const hasLetter = /[a-zA-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    if (!hasLetter || !hasNumber) {
      return res.status(400).json({
        success: false,
        message: 'New password must contain both letters and numbers.'
      });
    }

    const user = db.prepare('SELECT * FROM admin_users WHERE id = ?').get(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    const isMatch = bcrypt.compareSync(oldPassword, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect.'
      });
    }

    const salt = bcrypt.genSaltSync(12);
    const newHash = bcrypt.hashSync(newPassword, salt);

    db.prepare('UPDATE admin_users SET password_hash = ?, updated_at = datetime(\'now\') WHERE id = ?').run(newHash, req.user.id);

    return res.json({
      success: true,
      message: 'Password changed successfully.'
    });
  } catch (error) {
    console.error('Change password error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};
