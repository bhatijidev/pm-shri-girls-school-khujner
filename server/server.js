import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

import { generalLimiter, mutationLimiter } from './middleware/rateLimit.js';
import authRoutes from './routes/auth.js';
import noticeRoutes from './routes/notices.js';
import bookRoutes from './routes/books.js';
import uploadRoutes from './routes/upload.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security: Disable X-Powered-By header to avoid fingerprinting
app.disable('x-powered-by');

// Trusted allowed origins allowlist
const allowedOrigins = [
  'http://localhost:5000',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5000',
  'http://127.0.0.1:5173',
  'https://pm-shri-girls-school-khujner.onrender.com'
];

if (process.env.ALLOWED_ORIGINS) {
  process.env.ALLOWED_ORIGINS.split(',').forEach((o) => allowedOrigins.push(o.trim()));
}

// Strict CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, or same-origin)
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.onrender.com')) {
      return callback(null, true);
    }
    return callback(new Error('Blocked by CORS policy (Unauthorized Origin)'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Comprehensive Helmet security headers with tuned Content Security Policy (CSP)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
      imgSrc: [
        "'self'",
        'data:',
        'blob:',
        'https://images.unsplash.com',
        'https://upload.wikimedia.org',
        'https://archive.org',
        'https://*.google.com',
        'https://*.google.co.in',
        'https://*.gstatic.com',
        'https://*.googleapis.com',
        'https://*.googleusercontent.com',
        'https://*.openstreetmap.org'
      ],
      frameSrc: [
        "'self'",
        'https://www.youtube.com',
        'https://www.youtube-nocookie.com',
        'https://maps.google.com',
        'https://www.google.com',
        'https://*.google.com',
        'https://*.google.co.in',
        'https://*.googleapis.com',
        'https://*.openstreetmap.org'
      ],
      connectSrc: [
        "'self'",
        'https://pm-shri-girls-school-khujner.onrender.com',
        'http://localhost:5000',
        'https://*.google.com',
        'https://*.googleapis.com',
        'https://*.gstatic.com'
      ],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"]
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  dnsPrefetchControl: { allow: false },
  frameguard: { action: 'sameorigin' },
  hidePoweredBy: true,
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  ieNoOpen: true,
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

// Gzip / Brotli payload compression for ultra-fast network speed
app.use(compression({
  threshold: 1024,
  level: 6
}));

// Logging: Combined in production, dev in local
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Hardened body parsing limits: Cap at 2MB to prevent memory exhaustion DoS
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Apply rate limiting
app.use('/api/', generalLimiter);

// Mutation rate limit on write actions
app.use(['/api/notices', '/api/books', '/api/upload'], (req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    return mutationLimiter(req, res, next);
  }
  next();
});

// Serve static files from uploads directory safely (disallow dotfiles and indexing)
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  dotfiles: 'ignore',
  index: false,
  maxAge: '1d'
}));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'PM SHRI Girls Higher Secondary School Khujner API is secure & operational.',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend static assets from client/dist in production
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDistPath, {
  dotfiles: 'ignore',
  index: 'index.html',
  maxAge: '1d'
}));

// React Router SPA Catch-all: send index.html for any client navigation route
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
    return next();
  }
  const indexPath = path.join(clientDistPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) next();
  });
});

// 404 handler for unmatched API routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`
  });
});

// Hardened Global error handler: never leak internal stack traces or database info
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err.message);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: process.env.NODE_ENV === 'development' ? err.message : 'A server error occurred. Please contact administrator.'
  });
});

app.listen(PORT, () => {
  console.log(`\n🛡️  PM SHRI Khujner Server running securely on http://localhost:${PORT}`);
  console.log(`📚 API Docs: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Admin Login: POST http://localhost:${PORT}/api/auth/login\n`);
});

export default app;
