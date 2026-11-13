import fs from 'fs';
import path from 'path';

const projectRoot = 'C:\\Users\\PC\\Desktop\\notice';
const destRoot = 'C:\\Users\\PC\\Desktop\\pm-shri-khujner-hostinger';

console.log('Packaging PM SHRI Khujner for Hostinger...');

// 1. Clean or create destination
if (fs.existsSync(destRoot)) {
  fs.rmSync(destRoot, { recursive: true, force: true });
}
fs.mkdirSync(destRoot, { recursive: true });

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

// 2. Copy client/dist
console.log('Copying client/dist (production frontend)...');
copyDirSync(
  path.join(projectRoot, 'client', 'dist'),
  path.join(destRoot, 'client', 'dist')
);

// 3. Copy server (excluding node_modules, sqlite-shm, sqlite-wal)
console.log('Copying server (API, database, routes, models)...');
copyDirSync(
  path.join(projectRoot, 'server'),
  path.join(destRoot, 'server'),
  ['node_modules', 'database.sqlite-shm', 'database.sqlite-wal']
);

// 4. Copy root package.json
console.log('Copying root package.json...');
fs.copyFileSync(
  path.join(projectRoot, 'package.json'),
  path.join(destRoot, 'package.json')
);

// 5. Create production .env file
console.log('Creating production .env...');
const envContent = `PORT=5000
NODE_ENV=production
JWT_SECRET=pmshri-khujner-secret-key-2026-girls-school
JWT_EXPIRES_IN=8h
ADMIN_SECRET_PATH=pmshri-khujner-2026
`;
fs.writeFileSync(path.join(destRoot, '.env'), envContent, 'utf-8');

// 6. Create step-by-step README_HOSTINGER_SETUP.md in Hinglish
console.log('Creating README_HOSTINGER_SETUP.md...');
const readmeContent = `# 🚀 Hostinger par PM SHRI School Website Deploy Karne Ka Step-by-Step Guide

Bhai, is folder me aapki poori website (React Frontend + Node.js Backend + 503 Books & 6 Notices Database) 100% ready hai!

---

## Method 1: Hostinger "Web Apps" / "Node.js" se Deploy Karna (Sabse Aasan)

### Step 1: Hostinger hPanel Login Karein
1. [hostinger.in](https://hostinger.in) par login karein.
2. Apne **Unlimited Hosting** plan ke dashboard me jayein.
3. Left menu me **"Websites"** par click karke **"Add Website"** ya **"Create Web App"** par click karein.
4. Framework me **"Node.js"** / **"Express.js"** select karein.
5. **Node.js Version:** **Node.js 22** (LTS) select karein *(hamara SQLite Node 22 ke built-in module par chalta hai)*.

---

### Step 2: Files Upload Karein
1. Hostinger me **"File Manager"** kholiye.
2. Apni website ke root folder (jaise \`public_html\`) me jayein.
3. Desktop par bani **\`pm-shri-khujner-hostinger.zip\`** file ko **Upload** karein.
4. Upload hone ke baad zip file par right click karke **"Extract"** (Unzip) kar dein.

---

### Step 3: Application Configuration & Start
Hostinger ke **Node.js Configuration** section me ye set karein:
- **Application Root:** \`/\` (ya jahan files extract hui hain)
- **Application Startup File:** \`server/server.js\`
- **Node.js Version:** \`22.x\`
- **Run \`npm install\`** button par click karein (Hostinger saari libraries khud install kar lega).
- **"Start Application"** ya **"Restart"** button dabayein!

---

## Method 2: Hostinger Git / GitHub se Direct Deploy Karna (Aur bhi aasan)

Agar aapko manual zip upload nahi karna:
1. Hostinger hPanel me **"Git"** option me jayein.
2. Repository URL daalein: \`https://github.com/bhatijidev/pm-shri-girls-school-khujner.git\`
3. Branch: \`main\`
4. Install karein aur Node.js Version \`22\` select karke **"Deploy"** kar dein!

---

## 🔐 Admin Portal Login Details
- **Admin Login URL:** \`https://yourdomain.com/admin/pmshri-khujner-2026\`
- **Default Username:** \`admin\`
- **Default Password:** \`Admin@PMShri2026\`

---

## 📞 Support
Koi bhi step me dikkat aaye toh bas batana, mai poora guide karunga!
`;
fs.writeFileSync(path.join(destRoot, 'README_HOSTINGER_SETUP.md'), readmeContent, 'utf-8');

console.log('✅ Packaging complete! Folder ready at:', destRoot);
