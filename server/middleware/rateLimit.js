import rateLimit from 'express-rate-limit';

// General rate limiter: Protects all API endpoints from abusive traffic
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // 1000 requests per 15 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  }
});

// Strict Auth rate limiter: Protects login against brute-force and credential stuffing
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 10, // Max 10 failed login attempts per window
  skipSuccessfulRequests: true, // Do not count successful logins against limit
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many failed login attempts from this IP. Please try again after 15 minutes.'
  }
});

// Mutation rate limiter: Protects POST/PUT/DELETE operations from flooding
export const mutationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, // Max 150 write operations per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Write operation limit reached. Please try again later.'
  }
});

// Strict Contact Form Rate Limiter: Maximum 5 submissions per 15 minutes per IP
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 5, // Max 5 submissions per IP in 15 mins
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Aapne is device se kaafi anurodh bhej diye hain. Kripya 15 minute baad prayas karein ya seedhe vidyalaya helpline (+91 95759 62662) par call karein.'
  }
});
