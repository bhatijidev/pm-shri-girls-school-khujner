import rateLimit from 'express-rate-limit';

// General rate limiter: Never block public GET requests (browsing library, notices, health check)
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50000,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.method === 'GET', // Allow unlimited GET browsing
  message: {
    success: false,
    message: 'Too many requests. Please try again later.'
  }
});

// Auth rate limiter: protection for login attempts
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again after 15 minutes.'
  }
});
