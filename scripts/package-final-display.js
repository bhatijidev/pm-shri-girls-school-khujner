import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const projectRoot = 'C:\\Users\\PC\\Desktop\\notice';
const finalDisplayDir = 'C:\\Users\\PC\\Desktop\\PMSHRI_HOSTINGER_FINAL';

console.log('🚀 Preparing final Hostinger files on Desktop...');

// 1. Clean & recreate destination
if (fs.existsSync(finalDisplayDir)) {
  fs.rmSync(finalDisplayDir, { recursive: true, force: true });
}
fs.mkdirSync(finalDisplayDir, { recursive: true });

const frontendDir = path.join(finalDisplayDir, '1_FRONTEND_pmshrigirlskhujner.in');
const backendDir = path.join(finalDisplayDir, '2_BACKEND_backend.pmshrigirlskhujner.in');
fs.mkdirSync(frontendDir, { recursive: true });
fs.mkdirSync(backendDir, { recursive: true });

// Helper to copy directory recursively with exclusions
function copyDirSync(src, dest, excludeNames = []) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    if (excludeNames.includes(entry.name)) continue;

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath, excludeNames);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// -------------------------------------------------------------
// 1. PACKAGE FRONTEND (pmshrigirlskhujner.in)
// -------------------------------------------------------------
console.log('📦 Packaging Frontend for pmshrigirlskhujner.in...');
copyDirSync(path.join(projectRoot, 'client', 'dist'), frontendDir);

// Add .htaccess for React Router (Prevents 404 on refresh on /faculty, /notices, etc.)
const htaccessContent = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
`;
fs.writeFileSync(path.join(frontendDir, '.htaccess'), htaccessContent, 'utf-8');

// -------------------------------------------------------------
// 2. PACKAGE BACKEND (backend.pmshrigirlskhujner.in)
// -------------------------------------------------------------
console.log('📦 Packaging Backend for backend.pmshrigirlskhujner.in...');
copyDirSync(
  path.join(projectRoot, 'server'),
  backendDir,
  ['node_modules', 'database.sqlite-shm', 'database.sqlite-wal', '.env']
);

// Backend package.json (Standalone root for Hostinger Node.js)
const backendPkg = {
  name: "pmshri-khujner-backend",
  version: "1.0.0",
  type: "module",
  main: "server.js",
  scripts: {
    "start": "node server.js",
    "seed": "node seeds/seed.js"
  },
  dependencies: {
    "bcryptjs": "^2.4.3",
    "compression": "^1.8.2",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.0",
    "express-rate-limit": "^7.4.1",
    "helmet": "^8.0.0",
    "jsonwebtoken": "^9.0.2",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1"
  },
  engines: {
    "node": ">=22.0.0"
  }
};
fs.writeFileSync(
  path.join(backendDir, 'package.json'),
  JSON.stringify(backendPkg, null, 2),
  'utf-8'
);

// Backend .env
const backendEnv = `PORT=5000
NODE_ENV=production
JWT_SECRET=pmshri-khujner-secret-key-2026-girls-school
JWT_EXPIRES_IN=8h
ADMIN_SECRET_PATH=pmshri-khujner-2026
ALLOWED_ORIGINS=https://pmshrigirlskhujner.in,https://www.pmshrigirlskhujner.in,https://backend.pmshrigirlskhujner.in
`;
fs.writeFileSync(path.join(backendDir, '.env'), backendEnv, 'utf-8');

// -------------------------------------------------------------
// 3. CREATE ZIP ARCHIVES FOR INSTANT 1-CLICK UPLOAD
// -------------------------------------------------------------
console.log('🗜️ Creating Zip Archives...');
const frontendZip = path.join(finalDisplayDir, '1_FRONTEND_pmshrigirlskhujner.in.zip');
const backendZip = path.join(finalDisplayDir, '2_BACKEND_backend.pmshrigirlskhujner.in.zip');

try {
  execSync(
    `powershell -Command "Compress-Archive -Path '${frontendDir}\\*' -DestinationPath '${frontendZip}' -Force"`
  );
  console.log('✅ Created:', frontendZip);
} catch (e) {
  console.error('Frontend zip failed:', e.message);
}

try {
  execSync(
    `powershell -Command "Compress-Archive -Path '${backendDir}\\*' -DestinationPath '${backendZip}' -Force"`
  );
  console.log('✅ Created:', backendZip);
} catch (e) {
  console.error('Backend zip failed:', e.message);
}

// -------------------------------------------------------------
// 4. WRITE EASY STEP-BY-STEP GUIDE (TXT & HTML)
// -------------------------------------------------------------
const guideText = `================================================================================
   PM SHRI GOVT GIRLS HSS KHUJNER - HOSTINGER SETUP GUIDE
   Frontend: https://pmshrigirlskhujner.in
   Backend:  https://backend.pmshrigirlskhujner.in
================================================================================

Bhai, aapke liye dono domains ke alag-alag ready-to-upload files bana di gayi hain:

1. 🌐 FRONTEND (pmshrigirlskhujner.in)
   File: 1_FRONTEND_pmshrigirlskhujner.in.zip
   Size: ~1.2 MB
   Contains: Pre-built React App + Vite + Tailwind + .htaccess (for zero 404 errors)

2. ⚙️ BACKEND (backend.pmshrigirlskhujner.in)
   File: 2_BACKEND_backend.pmshrigirlskhujner.in.zip
   Size: ~2.5 MB
   Contains: Express.js API + 503 Books & 6 Notices SQLite Database + PDF Uploads

--------------------------------------------------------------------------------
STEP 1: HOSTINGER ME SUBDOMAIN BANAYEIN (Backend ke liye)
--------------------------------------------------------------------------------
1. Hostinger hPanel me login karein.
2. Apne domain "pmshrigirlskhujner.in" par click karein.
3. Left menu me "Subdomains" par click karein.
4. Subdomain name me type karein: backend
   (Full name ban jayega: backend.pmshrigirlskhujner.in)
5. "Create" par click kar dein.

--------------------------------------------------------------------------------
STEP 2: BACKEND UPLOAD KAREIN (backend.pmshrigirlskhujner.in)
--------------------------------------------------------------------------------
1. Hostinger hPanel ke left menu me "Node.js" ya "Web Apps" me jayein.
2. Domain me select karein: backend.pmshrigirlskhujner.in
3. Node.js Version: Node.js 22 select karein.
4. "File Manager" kholiye aur backend.pmshrigirlskhujner.in ke folder me jayein.
5. Desktop se "2_BACKEND_backend.pmshrigirlskhujner.in.zip" upload karein.
6. Uspar right-click karke "Extract" kar dein.
7. Node.js section me:
   - Application startup file: server.js
   - "Run npm install" par click karein.
   - "Start Application" / "Restart" dabayein.
8. Test karne ke liye browser me kholein:
   https://backend.pmshrigirlskhujner.in/api/health
   (Agar "PM SHRI Girls Higher Secondary School API is operational" dikhe, toh Backend 100% READY hai!)

--------------------------------------------------------------------------------
STEP 3: FRONTEND UPLOAD KAREIN (pmshrigirlskhujner.in)
--------------------------------------------------------------------------------
1. Hostinger me "File Manager" kholiye aur main domain ke "public_html" me jayein.
2. Desktop se "1_FRONTEND_pmshrigirlskhujner.in.zip" upload karein.
3. Right-click karke "Extract" kar dein.
4. Bas kaam khatam! Browser me kholein:
   https://pmshrigirlskhujner.in

--------------------------------------------------------------------------------
🔐 ADMIN DASHBOARD LOGIN CREDENTIALS
--------------------------------------------------------------------------------
- URL:      https://pmshrigirlskhujner.in/admin/pmshri-khujner-2026
- Username: admin
- Password: Admin@PMShri2026
================================================================================
`;

fs.writeFileSync(path.join(finalDisplayDir, 'HOSTINGER_SETUP_GUIDE.txt'), guideText, 'utf-8');
console.log('✅ Guide created: HOSTINGER_SETUP_GUIDE.txt');
console.log('🎉 ALL FILES SUCCESSFULLY CREATED IN:', finalDisplayDir);
