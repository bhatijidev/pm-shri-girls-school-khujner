# 🏫 PM SHRI Government Girls Higher Secondary School, Khujner (M.P.)
### आधिकारिक विद्यालय पोर्टल एवं डिजिटल ई-लाइब्रेरी

[![School Scheme](https://img.shields.io/badge/Scheme-PM_SHRI_NEP_2020-orange.svg)](https://education.gov.in/pm-shri)
[![UDISE](https://img.shields.io/badge/UDISE-23300137920-blue.svg)](https://schools.org.in)
[![Board](https://img.shields.io/badge/Board-MPBSE_Bhopal-emerald.svg)](https://mpbse.nic.in)
[![Backend](https://img.shields.io/badge/Database-SQLite_3_(Built--in)-purple.svg)](https://nodejs.org)

---

## 🌟 Overview

A full-stack, responsive, and bilingual web application built for **PM SHRI Government Girls Higher Secondary School, Khujner**, District Rajgarh, Madhya Pradesh.

Key features include:
1. **Dynamic Notice Board**: Live circulars and exam schedules managed via the admin backend, with an urgent alert banner system on the public homepage.
2. **Copyright-Safe Digital Library**: 30+ categorized educational resources (NCERT, MP Board, CBSE, ICSE, Hindu Dharm Gita Press granths, and competitive exam portals) with zero copyright risks.
3. **Hidden Admin Portal**: Accessible exclusively via a private direct URL with no login buttons anywhere on the public website.
4. **Full CRUD & PDF Upload**: Admin can publish notices, upload official PDF circulars, and manage the digital book catalog.
5. **Instagram Updates**: Visual gallery connecting to `@pmshrikhujner`.

---

## 🔐 Administrative Credentials & Secret Route

> [!IMPORTANT]
> There is **no login button** on the public website. Access the admin dashboard directly using:

- **Secret Admin URL**: `http://localhost:5173/admin/pmshri-khujner-2026`
- **Username**: `admin`
- **Password**: `Admin@PMShri2026`
- **Official Email**: `principalgghsskhujner@gmail.com`
- **Principal Contact**: `+91 95759 62662` / `+91 95750 53750`
- **Address**: PM Shri Government Girls HSS School, Opposite Ganesh Mandir, Khujner, District Rajgarh, PIN Code: 465687

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** v20+ or v22+ (v26 installed)
- **npm** package manager

### 2. Start the Backend Server
```powershell
cd c:\Users\PC\Desktop\notice\server
npm install
node seeds/seed.js   # Seeds admin user, 7 categories, 29+ books, and notices
npm start            # Starts server on http://localhost:5000
```

### 3. Start the Frontend Client
```powershell
cd c:\Users\PC\Desktop\notice\client
npm install
npm run dev          # Starts Vite dev server on http://localhost:5173
```

Now open `http://localhost:5173` in your browser.

---

## 📚 Copyright-Safe Library Strategy

To prevent copyright infringement, the library uses a hybrid architecture:
- **NCERT Textbooks**: Direct links to `ncert.nic.in/textbook.php`.
- **MP Board**: Links to MP Text Book Corporation (`mptbc.mp.gov.in`) and Vimarsh Portal (`vimarsh.mp.gov.in`).
- **CBSE**: Direct links to CBSE Academic and Skill Education portals.
- **ICSE**: Official specimen papers and syllabus guides via `cisce.org`.
- **Hindu Dharm Granths**: Public domain editions published by Gita Press Gorakhpur hosted on the Internet Archive (Bhagavad Gita, Ramcharitmanas, Valmiki Ramayana).
- **Competitive Exams**: National Digital Library of India (NDLI), IGNOU eGyanKosh, NIOS, and SWAYAM official portals.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Lucide Icons, Axios, React Router v6.
- **Backend**: Node.js, Express.js, `node:sqlite` (Node native synchronous database engine).
- **Security**: JWT tokens, bcryptjs password hashing, Helmet, Rate Limiting, Multer file upload filters.
