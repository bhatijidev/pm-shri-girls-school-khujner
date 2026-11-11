import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, '..', 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Allowed extensions allowlists (strictly lowercase)
const ALLOWED_PDF_EXTS = new Set(['.pdf']);
const ALLOWED_IMG_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const DISALLOWED_DANGEROUS_EXTS = new Set([
  '.exe', '.php', '.phtml', '.php3', '.php4', '.php5', '.phps',
  '.js', '.mjs', '.cjs', '.html', '.htm', '.xhtml', '.svg',
  '.sh', '.bash', '.bat', '.cmd', '.ps1', '.py', '.rb', '.pl',
  '.jsp', '.asp', '.aspx', '.cgi', '.jar', '.vbs', '.wsf'
]);

// Storage configuration with secure random filename generation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let subDir = 'misc';
    if (file.mimetype === 'application/pdf') {
      subDir = 'pdfs';
    } else if (file.mimetype.startsWith('image/')) {
      subDir = 'images';
    }

    const targetDir = path.join(uploadsDir, subDir);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    cb(null, targetDir);
  },
  filename: (req, file, cb) => {
    // Generate 16 bytes of cryptographic randomness to prevent filename guessing or collisions
    const randomHex = crypto.randomBytes(16).toString('hex');
    const ext = path.extname(file.originalname).toLowerCase();
    
    // Sanitize original base name (strip anything except alphanumeric, dash, underscore)
    const baseName = path.basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9-_]/g, '_')
      .substring(0, 30);

    cb(null, `${baseName}-${randomHex}${ext}`);
  }
});

// Hardened File filter for PDFs
const pdfFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  
  // 1. Strict extension check
  if (!ALLOWED_PDF_EXTS.has(ext)) {
    return cb(new Error('Invalid file extension. Only .pdf files are accepted.'), false);
  }

  // 2. Strict MIME type check
  if (file.mimetype !== 'application/pdf') {
    return cb(new Error('Invalid MIME type. File must be a valid PDF.'), false);
  }

  // 3. Reject any hidden dangerous secondary extension (e.g. payload.php.pdf)
  const parts = file.originalname.toLowerCase().split('.');
  if (parts.length > 2) {
    for (let i = 1; i < parts.length - 1; i++) {
      if (DISALLOWED_DANGEROUS_EXTS.has('.' + parts[i])) {
        return cb(new Error('Potential malicious file pattern detected.'), false);
      }
    }
  }

  cb(null, true);
};

// Hardened File filter for images
const imageFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedMimeTypes = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp']);

  // 1. Strict extension check
  if (!ALLOWED_IMG_EXTS.has(ext)) {
    return cb(new Error('Invalid file extension. Only .jpg, .jpeg, .png, and .webp images are accepted.'), false);
  }

  // 2. Strict MIME type check
  if (!allowedMimeTypes.has(file.mimetype)) {
    return cb(new Error('Invalid MIME type for image.'), false);
  }

  // 3. Reject dangerous double extensions
  const parts = file.originalname.toLowerCase().split('.');
  if (parts.length > 2) {
    for (let i = 1; i < parts.length - 1; i++) {
      if (DISALLOWED_DANGEROUS_EXTS.has('.' + parts[i])) {
        return cb(new Error('Potential malicious file pattern detected.'), false);
      }
    }
  }

  cb(null, true);
};

// PDF upload middleware (50MB limit)
export const uploadPdf = multer({
  storage,
  fileFilter: pdfFilter,
  limits: { fileSize: 50 * 1024 * 1024, files: 1 } // 50MB, exactly 1 file
}).single('file');

// Image upload middleware (5MB limit)
export const uploadImage = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 } // 5MB, exactly 1 file
}).single('file');
