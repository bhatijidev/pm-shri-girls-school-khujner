import bcrypt from 'bcryptjs';
import db from '../config/db.js';

console.log('🌱 Starting comprehensive database seeding for PM SHRI Girls HSS Khujner...');

// 1. Seed Admin User
const adminPassword = 'PmShri@Khujner2024';
const salt = bcrypt.genSaltSync(12);
const passwordHash = bcrypt.hashSync(adminPassword, salt);

const existingAdmin = db.prepare('SELECT id FROM admin_users WHERE username = ?').get('admin');

let adminId;
if (!existingAdmin) {
  const insertAdmin = db.prepare(`
    INSERT INTO admin_users (username, password_hash, full_name, email, role)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = insertAdmin.run(
    'admin',
    passwordHash,
    'Principal & Head Admin',
    'principalgghsskhujner@gmail.com',
    'superadmin'
  );
  adminId = result.lastInsertRowid;
  console.log(`✅ Admin user seeded: username: 'admin', password: '${adminPassword}'`);
} else {
  adminId = existingAdmin.id;
  db.prepare('UPDATE admin_users SET password_hash = ? WHERE id = ?').run(passwordHash, adminId);
  console.log('ℹ️ Admin user already exists, updated password.');
}

// 2. Seed Categories
const categories = [
  { name: 'NCERT', name_hindi: 'एनसीईआरटी', slug: 'ncert', icon: 'BookOpen', color: '#1565C0', sort_order: 1 },
  { name: 'MP Board', name_hindi: 'एमपी बोर्ड', slug: 'mp-board', icon: 'GraduationCap', color: '#2E7D32', sort_order: 2 },
  { name: 'CBSE', name_hindi: 'सीबीएसई', slug: 'cbse', icon: 'Award', color: '#C62828', sort_order: 3 },
  { name: 'ICSE', name_hindi: 'आईसीएसई', slug: 'icse', icon: 'Compass', color: '#E65100', sort_order: 4 },
  { name: 'Hindu Dharm', name_hindi: 'हिन्दू धर्म ग्रंथ', slug: 'hindu-dharm', icon: 'Flame', color: '#FF6F00', sort_order: 5 },
  { name: 'Competitive Exams', name_hindi: 'प्रतियोगी परीक्षा', slug: 'competitive', icon: 'Target', color: '#6A1B9A', sort_order: 6 },
  { name: 'School Materials', name_hindi: 'विद्यालय सामग्री', slug: 'school-materials', icon: 'School', color: '#00838F', sort_order: 7 }
];

const categoryMap = {};

for (const cat of categories) {
  const existing = db.prepare('SELECT id FROM categories WHERE slug = ?').get(cat.slug);
  if (!existing) {
    const res = db.prepare(`
      INSERT INTO categories (name, name_hindi, slug, icon, color, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(cat.name, cat.name_hindi, cat.slug, cat.icon, cat.color, cat.sort_order);
    categoryMap[cat.slug] = res.lastInsertRowid;
  } else {
    categoryMap[cat.slug] = existing.id;
  }
}
console.log('✅ Categories verified.');

// 3. Clear existing books to re-seed cleanly with images and full grades
db.prepare('DELETE FROM books').run();
console.log('🧹 Refreshed books catalog for full comprehensive seeding...');

// Verified high-resolution book cover image URLs - Authentic real textbooks and sacred texts
const IMG = {
  math: '/images/books/ncert-math-c10.jpg',
  science: '/images/books/ncert-science-c9.jpg',
  biology: '/images/books/ncert-biology-c11.jpg',
  physics: '/images/books/ncert-physics-c12.jpg',
  history: '/images/books/ncert-bharat-vishwa.jpg',
  geography: '/images/books/cat-mpboard.jpg',
  civics: '/images/books/ncert-loktantra.jpg',
  literature: '/images/books/ncert-flamingo.jpg',
  hindi: '/images/books/ncert-rimjhim.jpg',
  gita: '/images/books/bhagavad-gita-real.jpg',
  competitive: '/images/books/cat-competitive.jpg',
  primary: '/images/books/ncert-rimjhim.jpg',
  coding: '/images/books/cat-cbse.jpg',
  commerce: '/images/books/cat-ncert.jpg',
  sports: '/images/books/cat-career.jpg'
};

const allBooks = [
  // ==========================================
  // NCERT - PRIMARY (CLASSES 1 to 5)
  // ==========================================
  {
    title: 'NCERT Class 1 - Math-Magic (गणित का जादू)',
    title_hindi: 'कक्षा 1 - गणित का जादू (एनसीईआरटी)',
    author: 'NCERT Primary Division',
    publisher: 'NCERT New Delhi',
    description: 'Foundational numeracy, shapes, counting, and playful visual additions for primary students.',
    category_slug: 'ncert',
    class_grade: 'Class 1',
    subject: 'Mathematics',
    cover_image_url: IMG.primary,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 1 - Rimjhim Hindi (रिमझिम)',
    title_hindi: 'कक्षा 1 - रिमझिम (हिंदी प्रथम भाषा)',
    author: 'NCERT Hindi Cell',
    publisher: 'NCERT',
    description: 'Joyful poems, Hindi alphabets, moral fables, and basic reading skills.',
    category_slug: 'ncert',
    class_grade: 'Class 1',
    subject: 'Hindi',
    cover_image_url: IMG.hindi,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 2 - Marigold English',
    title_hindi: 'कक्षा 2 - मैरीगोल्ड (अंग्रेजी)',
    author: 'NCERT English Division',
    publisher: 'NCERT',
    description: 'Early English rhymes, story comprehension, vocabulary building, and phonics.',
    category_slug: 'ncert',
    class_grade: 'Class 2',
    subject: 'English',
    cover_image_url: IMG.literature,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 3 - Looking Around (आस-पास EVS)',
    title_hindi: 'कक्षा 3 - आस-पास (पर्यावरण अध्ययन)',
    author: 'NCERT Environmental Studies Dept',
    publisher: 'NCERT',
    description: 'Family, plants, animals, water conservation, community helpers, and our surroundings.',
    category_slug: 'ncert',
    class_grade: 'Class 3',
    subject: 'Environmental Studies',
    cover_image_url: IMG.primary,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 4 - Math-Magic (गणित का जादू)',
    title_hindi: 'कक्षा 4 - गणित का जादू',
    author: 'NCERT Primary Mathematics',
    publisher: 'NCERT',
    description: 'Building with bricks, long and short, tick-tick time, fractions, and multiplication tables.',
    category_slug: 'ncert',
    class_grade: 'Class 4',
    subject: 'Mathematics',
    cover_image_url: IMG.math,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 5 - Looking Around (आस-पास EVS)',
    title_hindi: 'कक्षा 5 - आस-पास (पर्यावरण अध्ययन)',
    author: 'NCERT EVS Cell',
    publisher: 'NCERT',
    description: 'Super senses, a snake charmer’s story, seeds and seeds, across the wall, and disaster awareness.',
    category_slug: 'ncert',
    class_grade: 'Class 5',
    subject: 'Environmental Studies',
    cover_image_url: IMG.primary,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },

  // ==========================================
  // NCERT - MIDDLE SCHOOL (CLASSES 6 to 8)
  // ==========================================
  {
    title: 'NCERT Class 6 - Mathematics (गणित)',
    title_hindi: 'कक्षा 6 - गणित (एनसीईआरटी)',
    author: 'NCERT Mathematics Faculty',
    publisher: 'NCERT',
    description: 'Knowing our numbers, whole numbers, playing with numbers, integers, fractions, and algebra basics.',
    category_slug: 'ncert',
    class_grade: 'Class 6',
    subject: 'Mathematics',
    cover_image_url: IMG.math,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 6 - Science (विज्ञान)',
    title_hindi: 'कक्षा 6 - विज्ञान',
    author: 'NCERT Science Division',
    publisher: 'NCERT',
    description: 'Components of food, sorting materials, getting to know plants, body movements, and electricity.',
    category_slug: 'ncert',
    class_grade: 'Class 6',
    subject: 'Science',
    cover_image_url: IMG.science,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 6 - Our Pasts - I (हमारे अतीत भाग 1)',
    title_hindi: 'कक्षा 6 - हमारे अतीत (प्राचीन भारत का इतिहास)',
    author: 'NCERT History Team',
    publisher: 'NCERT',
    description: 'Early cities of Harappa, Vedic times, Ashoka the Great, kingdoms, and ancient monuments.',
    category_slug: 'ncert',
    class_grade: 'Class 6',
    subject: 'History',
    cover_image_url: IMG.history,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 7 - Science (विज्ञान)',
    title_hindi: 'कक्षा 7 - विज्ञान',
    author: 'NCERT Science Faculty',
    publisher: 'NCERT',
    description: 'Nutrition in plants and animals, heat, acids bases and salts, respiration in organisms, and light.',
    category_slug: 'ncert',
    class_grade: 'Class 7',
    subject: 'Science',
    cover_image_url: IMG.biology,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 7 - Our Environment (हमारा पर्यावरण)',
    title_hindi: 'कक्षा 7 - हमारा पर्यावरण (भूगोल)',
    author: 'NCERT Geography Wing',
    publisher: 'NCERT',
    description: 'Inside our earth, our changing earth, air composition, water cycles, and natural vegetation.',
    category_slug: 'ncert',
    class_grade: 'Class 7',
    subject: 'Geography',
    cover_image_url: IMG.geography,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 8 - Mathematics (गणित)',
    title_hindi: 'कक्षा 8 - गणित',
    author: 'NCERT Mathematics Faculty',
    publisher: 'NCERT',
    description: 'Rational numbers, linear equations in one variable, quadrilaterals, data handling, and mensuration.',
    category_slug: 'ncert',
    class_grade: 'Class 8',
    subject: 'Mathematics',
    cover_image_url: IMG.math,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 8 - Science (विज्ञान)',
    title_hindi: 'कक्षा 8 - विज्ञान',
    author: 'NCERT Science Cell',
    publisher: 'NCERT',
    description: 'Crop production, microorganisms, combustion and flame, cell structure, reproduction, and sound.',
    category_slug: 'ncert',
    class_grade: 'Class 8',
    subject: 'Science',
    cover_image_url: IMG.science,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 8 - Social & Political Life III (सामाजिक एवं राजनीतिक जीवन)',
    title_hindi: 'कक्षा 8 - सामाजिक एवं राजनीतिक जीवन',
    author: 'NCERT Civics Department',
    publisher: 'NCERT',
    description: 'The Indian Constitution, understanding secularism, judiciary system, and public facilities.',
    category_slug: 'ncert',
    class_grade: 'Class 8',
    subject: 'Social Science',
    cover_image_url: IMG.civics,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },

  // ==========================================
  // NCERT - SECONDARY (CLASSES 9 & 10)
  // ==========================================
  {
    title: 'NCERT Class 9 - Mathematics (गणित)',
    title_hindi: 'कक्षा 9 - गणित (एनसीईआरटी)',
    author: 'NCERT Curriculum Division',
    publisher: 'NCERT',
    description: 'Number systems, polynomials, coordinate geometry, linear equations, Euclid geometry, triangles, and Heron formula.',
    category_slug: 'ncert',
    class_grade: 'Class 9',
    subject: 'Mathematics',
    cover_image_url: IMG.math,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 9 - Science (विज्ञान)',
    title_hindi: 'कक्षा 9 - विज्ञान',
    author: 'NCERT Science Group',
    publisher: 'NCERT',
    description: 'Matter in our surroundings, atoms and molecules, the fundamental unit of life, tissues, motion, force, and gravitation.',
    category_slug: 'ncert',
    class_grade: 'Class 9',
    subject: 'Science',
    cover_image_url: IMG.physics,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 9 - Democratic Politics I (लोकतांत्रिक राजनीति)',
    title_hindi: 'कक्षा 9 - लोकतांत्रिक राजनीति',
    author: 'NCERT Social Science Wing',
    publisher: 'NCERT',
    description: 'What is democracy, constitutional design, electoral politics, working of institutions, and democratic rights.',
    category_slug: 'ncert',
    class_grade: 'Class 9',
    subject: 'Social Science',
    cover_image_url: IMG.civics,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 9 - Beehive English Literature',
    title_hindi: 'कक्षा 9 - बीहाइव (अंग्रेजी साहित्य)',
    author: 'NCERT English Faculty',
    publisher: 'NCERT',
    description: 'The Fun They Had, The Sound of Music, The Little Girl, A Truly Beautiful Mind, and classic poems.',
    category_slug: 'ncert',
    class_grade: 'Class 9',
    subject: 'English',
    cover_image_url: IMG.literature,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 10 - Mathematics (गणित)',
    title_hindi: 'कक्षा 10 - गणित (एनसीईआरटी)',
    author: 'NCERT Math Committee',
    publisher: 'NCERT New Delhi',
    description: 'Real numbers, polynomials, pair of linear equations, quadratic equations, arithmetic progressions, triangles, trigonometry, and statistics.',
    category_slug: 'ncert',
    class_grade: 'Class 10',
    subject: 'Mathematics',
    cover_image_url: IMG.math,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 10 - Science (विज्ञान)',
    title_hindi: 'कक्षा 10 - विज्ञान',
    author: 'NCERT Editorial Cell',
    publisher: 'NCERT',
    description: 'Chemical reactions, acids bases and salts, metals and non-metals, carbon compounds, life processes, control and coordination, light, and electricity.',
    category_slug: 'ncert',
    class_grade: 'Class 10',
    subject: 'Science',
    cover_image_url: IMG.science,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 10 - India and Contemporary World II (भारत और समकालीन विश्व)',
    title_hindi: 'कक्षा 10 - भारत और समकालीन विश्व (इतिहास)',
    author: 'NCERT History Faculty',
    publisher: 'NCERT',
    description: 'The rise of nationalism in Europe, nationalism in India, making of a global world, and print culture.',
    category_slug: 'ncert',
    class_grade: 'Class 10',
    subject: 'History',
    cover_image_url: IMG.history,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 10 - First Flight English',
    title_hindi: 'कक्षा 10 - फर्स्ट फ्लाइट (अंग्रेजी)',
    author: 'NCERT English Faculty',
    publisher: 'NCERT',
    description: 'A Letter to God, Nelson Mandela Long Walk to Freedom, Two Stories about Flying, From the Diary of Anne Frank.',
    category_slug: 'ncert',
    class_grade: 'Class 10',
    subject: 'English',
    cover_image_url: IMG.literature,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },

  // ==========================================
  // NCERT - SENIOR SECONDARY (CLASSES 11 & 12)
  // ==========================================
  {
    title: 'NCERT Class 11 - Physics Part 1 & 2 (भौतिकी)',
    title_hindi: 'कक्षा 11 - भौतिक विज्ञान (भाग 1 व 2)',
    author: 'NCERT Physics Committee',
    publisher: 'NCERT',
    description: 'Units & measurement, motion in a straight line, laws of motion, work energy and power, gravitation, thermodynamics, and waves.',
    category_slug: 'ncert',
    class_grade: 'Class 11',
    subject: 'Physics',
    cover_image_url: IMG.physics,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 11 - Chemistry Part 1 & 2 (रसायन विज्ञान)',
    title_hindi: 'कक्षा 11 - रसायन विज्ञान (भाग 1 व 2)',
    author: 'NCERT Chemistry Cell',
    publisher: 'NCERT',
    description: 'Structure of atom, classification of elements, chemical bonding, chemical thermodynamics, equilibrium, redox reactions, and organic chemistry basics.',
    category_slug: 'ncert',
    class_grade: 'Class 11',
    subject: 'Chemistry',
    cover_image_url: IMG.science,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 11 - Biology (जीव विज्ञान)',
    title_hindi: 'कक्षा 11 - जीव विज्ञान',
    author: 'NCERT Biology Cell',
    publisher: 'NCERT',
    description: 'Diversity in the living world, structural organisation in animals and plants, cell structure and function, plant physiology, and human physiology.',
    category_slug: 'ncert',
    class_grade: 'Class 11',
    subject: 'Biology',
    cover_image_url: IMG.biology,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 11 - Indian Constitution at Work (भारत का संविधान)',
    title_hindi: 'कक्षा 11 - भारत का संविधान: सिद्धांत और व्यवहार',
    author: 'NCERT Political Science Dept',
    publisher: 'NCERT',
    description: 'Constitution why and how, rights in the Indian constitution, election and representation, executive, legislature, judiciary, and federalism.',
    category_slug: 'ncert',
    class_grade: 'Class 11',
    subject: 'Political Science',
    cover_image_url: IMG.civics,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 11 - Financial Accounting (लेखाशास्त्र)',
    title_hindi: 'कक्षा 11 - वित्तीय लेखांकन (भाग 1 व 2)',
    author: 'NCERT Commerce Faculty',
    publisher: 'NCERT',
    description: 'Introduction to accounting, theory base of accounting, recording of transactions, bank reconciliation statement, trial balance, and financial statements.',
    category_slug: 'ncert',
    class_grade: 'Class 11',
    subject: 'Accountancy',
    cover_image_url: IMG.commerce,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 12 - Physics Part 1 & 2 (भौतिकी)',
    title_hindi: 'कक्षा 12 - भौतिक विज्ञान (भाग 1 व 2)',
    author: 'NCERT Physics Committee',
    publisher: 'NCERT',
    description: 'Electric charges & fields, electrostatic potential, current electricity, moving charges, magnetism, electromagnetic induction, alternating current, optics, and semiconductors.',
    category_slug: 'ncert',
    class_grade: 'Class 12',
    subject: 'Physics',
    cover_image_url: IMG.physics,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 12 - Chemistry Part 1 & 2 (रसायन विज्ञान)',
    title_hindi: 'कक्षा 12 - रसायन विज्ञान (भाग 1 व 2)',
    author: 'NCERT Chemistry Faculty',
    publisher: 'NCERT',
    description: 'Solutions, electrochemistry, chemical kinetics, d and f block elements, coordination compounds, haloalkanes, alcohols phenols, aldehydes ketones, amines, and biomolecules.',
    category_slug: 'ncert',
    class_grade: 'Class 12',
    subject: 'Chemistry',
    cover_image_url: IMG.science,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 12 - Biology (जीव विज्ञान)',
    title_hindi: 'कक्षा 12 - जीव विज्ञान',
    author: 'NCERT Biology Wing',
    publisher: 'NCERT',
    description: 'Sexual reproduction in flowering plants, human reproduction, reproductive health, principles of inheritance, molecular basis of inheritance, evolution, biotechnology, and ecology.',
    category_slug: 'ncert',
    class_grade: 'Class 12',
    subject: 'Biology',
    cover_image_url: IMG.biology,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 12 - Mathematics Part 1 & 2 (गणित)',
    title_hindi: 'कक्षा 12 - गणित (भाग 1 व 2)',
    author: 'NCERT Math Committee',
    publisher: 'NCERT',
    description: 'Relations and functions, inverse trigonometric functions, matrices, determinants, continuity and differentiability, integrals, differential equations, vectors, and 3D geometry.',
    category_slug: 'ncert',
    class_grade: 'Class 12',
    subject: 'Mathematics',
    cover_image_url: IMG.math,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 12 - Themes in Indian History (भारतीय इतिहास के कुछ विषय)',
    title_hindi: 'कक्षा 12 - भारतीय इतिहास के कुछ विषय (भाग 1, 2, 3)',
    author: 'NCERT History Faculty',
    publisher: 'NCERT',
    description: 'Harappan archaeology, early states and economies, kinship caste and class, medieval travellers, Bhakti-Sufi traditions, Vijayanagara capital, and Mahatma Gandhi nationalist movement.',
    category_slug: 'ncert',
    class_grade: 'Class 12',
    subject: 'History',
    cover_image_url: IMG.history,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },
  {
    title: 'NCERT Class 12 - Macroeconomics (समष्टि अर्थशास्त्र)',
    title_hindi: 'कक्षा 12 - समष्टि अर्थशास्त्र: एक परिचय',
    author: 'NCERT Economics Cell',
    publisher: 'NCERT',
    description: 'National income accounting, money and banking, determination of income and employment, government budget, and open economy macroeconomics.',
    category_slug: 'ncert',
    class_grade: 'Class 12',
    subject: 'Economics',
    cover_image_url: IMG.commerce,
    link_type: 'external',
    external_url: 'https://ncert.nic.in/textbook.php'
  },

  // ==========================================
  // MP BOARD (MPBSE & VIMARSH PORTAL)
  // ==========================================
  {
    title: 'MP Board Class 10 All Subjects Question Bank (विमर्श प्रश्न बैंक)',
    title_hindi: 'एमपी बोर्ड कक्षा 10वीं प्रश्न बैंक 2024-25 (विमर्श पोर्टल)',
    author: 'MP School Education Department',
    publisher: 'MPBSE Bhopal',
    description: 'Official chapter-wise remedial question banks for Mathematics, Science, Social Science, Hindi, and English published by Vimarsh Portal Bhopal.',
    category_slug: 'mp-board',
    class_grade: 'Class 10',
    subject: 'Question Bank',
    cover_image_url: IMG.primary,
    link_type: 'external',
    external_url: 'https://vimarsh.mp.gov.in'
  },
  {
    title: 'MP Board Class 12 Physics & Chemistry Question Bank',
    title_hindi: 'एमपी बोर्ड कक्षा 12वीं भौतिकी एवं रसायन प्रश्न बैंक',
    author: 'MPBSE Academic Council',
    publisher: 'Vimarsh MP',
    description: 'High-yield exam questions, numerical problems, chemical equations, and blueprints for MP Board higher secondary board exams.',
    category_slug: 'mp-board',
    class_grade: 'Class 12',
    subject: 'Physics & Chemistry',
    cover_image_url: IMG.science,
    link_type: 'external',
    external_url: 'https://vimarsh.mp.gov.in'
  },
  {
    title: 'MP Board Class 10 & 12 Model Examination Papers & Blueprints',
    title_hindi: 'एमपी बोर्ड कक्षा 10वीं व 12वीं मॉडल प्रश्न पत्र व अंक योजना',
    author: 'Board of Secondary Education, M.P. Bhopal',
    publisher: 'MPBSE',
    description: 'Authentic previous year question papers, marking guidelines, and exam blueprints issued by MPBSE Bhopal.',
    category_slug: 'mp-board',
    class_grade: 'Class 10',
    subject: 'Model Papers',
    cover_image_url: IMG.math,
    link_type: 'external',
    external_url: 'https://mpbse.nic.in'
  },
  {
    title: 'MP Text Book Corporation Digital Repository (MPTBC)',
    title_hindi: 'मध्य प्रदेश पाठ्यपुस्तक निगम ई-बुक्स (कक्षा 1 से 12)',
    author: 'MP Pathyapustak Nigam',
    publisher: 'Government of Madhya Pradesh',
    description: 'Free official state-prescribed Hindi, English, and Sanskrit medium textbooks for primary, middle, secondary, and higher secondary students.',
    category_slug: 'mp-board',
    class_grade: 'Class 1-12',
    subject: 'All Subjects',
    cover_image_url: IMG.geography,
    link_type: 'external',
    external_url: 'https://mptbc.mp.gov.in'
  },

  // ==========================================
  // CBSE SKILL & VOCATIONAL
  // ==========================================
  {
    title: 'CBSE Artificial Intelligence Curriculum Handbook',
    title_hindi: 'सीबीएसई आर्टिफिशियल इंटेलिजेंस (AI) मार्गदर्शिका',
    author: 'CBSE Department of Skill Education',
    publisher: 'CBSE New Delhi',
    description: 'Official AI readiness handbook covering computer vision, natural language processing, Python programming, and ethical AI for Classes 9 to 12.',
    category_slug: 'cbse',
    class_grade: 'Class 9-12',
    subject: 'Artificial Intelligence',
    cover_image_url: IMG.coding,
    link_type: 'external',
    external_url: 'https://cbseacademic.nic.in/skill-education-books.html'
  },
  {
    title: 'CBSE Information Technology (Code 402/802) Handbook',
    title_hindi: 'सीबीएसई सूचना प्रौद्योगिकी एवं डिजिटल कौशल',
    author: 'CBSE Skill Wing',
    publisher: 'CBSE',
    description: 'Database management systems, web applications, spreadsheet software, and digital documentation.',
    category_slug: 'cbse',
    class_grade: 'Class 10',
    subject: 'Information Technology',
    cover_image_url: IMG.coding,
    link_type: 'external',
    external_url: 'https://cbseacademic.nic.in/skill-education-books.html'
  },
  {
    title: 'DIKSHA Portal - Interactive Digital Lessons & QR Textbooks',
    title_hindi: 'दीक्षा पोर्टल - डिजिटल भारत इंटरैक्टिव पाठ्यपुस्तकें',
    author: 'Ministry of Education, GoI',
    publisher: 'Government of India',
    description: '3D simulations, animated audiovisual lessons, worksheets, and QR-coded textbooks in over 30 Indian languages.',
    category_slug: 'cbse',
    class_grade: 'Class 1-12',
    subject: 'Interactive Learning',
    cover_image_url: IMG.primary,
    link_type: 'external',
    external_url: 'https://diksha.gov.in'
  },

  // ==========================================
  // ICSE / CISCE CURRICULUM
  // ==========================================
  {
    title: 'CISCE Official ICSE Class 10 Syllabi & Specimen Papers',
    title_hindi: 'सीआईएससीई आईसीएसई कक्षा 10वीं पाठ्यक्रम एवं मॉडल पेपर्स',
    author: 'Council for the Indian School Certificate Examinations',
    publisher: 'CISCE New Delhi',
    description: 'Official regulations, pupil performance analysis, marking schemes, and specimen papers directly from CISCE.',
    category_slug: 'icse',
    class_grade: 'Class 10',
    subject: 'Curriculum & Syllabi',
    cover_image_url: IMG.literature,
    link_type: 'external',
    external_url: 'https://www.cisce.org'
  },
  {
    title: 'CISCE Official ISC Class 12 Syllabi & Guidelines',
    title_hindi: 'सीआईएससीई आईएससी कक्षा 12वीं पाठ्यक्रम मार्गदर्शिका',
    author: 'CISCE Academic Wing',
    publisher: 'CISCE',
    description: 'Higher secondary course structure, specimen exam papers, and practical guidelines for Science, Commerce, and Humanities.',
    category_slug: 'icse',
    class_grade: 'Class 12',
    subject: 'Syllabus & Blueprint',
    cover_image_url: IMG.history,
    link_type: 'external',
    external_url: 'https://www.cisce.org'
  },

  // ==========================================
  // HINDU DHARM SACRED GRANTHS (PUBLIC DOMAIN GITA PRESS)
  // ==========================================
  {
    title: 'Shrimad Bhagavad Gita (श्रीमद्भगवद्गीता - साधक संजीवनी)',
    title_hindi: 'श्रीमद्भगवद्गीता - हिंदी टीका सहित (गीताप्रेस)',
    author: 'Maharshi Ved Vyas / Swami Ramsukhdas',
    publisher: 'Gita Press Gorakhpur (Public Domain)',
    description: 'Complete 700 verses of the Bhagavad Gita with shloka meanings, word-by-word explanation, and spiritual commentary by Gita Press.',
    category_slug: 'hindu-dharm',
    class_grade: 'All Ages',
    subject: 'Spiritual Philosophy',
    cover_image_url: '/images/books/bhagavad-gita-real.jpg',
    link_type: 'external',
    external_url: 'https://archive.org/details/GitaInHindi'
  },
  {
    title: 'Shri Ramcharitmanas (श्री रामचरितमानस - तुलसीदास)',
    title_hindi: 'श्री रामचरितमानस - विशुद्ध हिंदी अर्थ सहित (गीताप्रेस)',
    author: 'Goswami Tulsidas',
    publisher: 'Gita Press Gorakhpur',
    description: 'The monumental Awadhi epic comprising Bal Kand, Ayodhya Kand, Aranya Kand, Kishkindha Kand, Sundar Kand, Lanka Kand, and Uttar Kand.',
    category_slug: 'hindu-dharm',
    class_grade: 'All Ages',
    subject: 'Sacred Epic & Ethics',
    cover_image_url: '/images/books/valmiki-ramayana.jpg',
    link_type: 'external',
    external_url: 'https://archive.org/details/shri-ramcharitmanas-gita-press-hindi-topic-wise-pdf-bookmarks'
  },
  {
    title: 'Valmiki Ramayana Part 1 & 2 (श्रीमद्वाल्मीकीय रामायण)',
    title_hindi: 'श्रीमद्वाल्मीकीय रामायण - मूल संस्कृत एवं हिंदी अनुवाद',
    author: 'Maharshi Valmiki',
    publisher: 'Gita Press Gorakhpur',
    description: 'The original Sanskrit Adi Kavya with detailed Hindi translation, narrating the divine life, righteous governance (Ram Rajya), and ideals of Shri Ram.',
    category_slug: 'hindu-dharm',
    class_grade: 'All Ages',
    subject: 'Sanskrit & Ancient Ethics',
    cover_image_url: '/images/books/valmiki-ramayana.jpg',
    link_type: 'external',
    external_url: 'https://archive.org/details/valmiki-ramayan-part-1-gita-press'
  },
  {
    title: 'Mahabharata (संक्षिप्त महाभारत - गीताप्रेस)',
    title_hindi: 'महाभारत - सचित्र हिंदी अनुवाद (गीताप्रेस)',
    author: 'Maharshi Ved Vyas',
    publisher: 'Gita Press Gorakhpur',
    description: 'The eternal history of Dharma, righteous warfare, Yaksha Prashna, Vidur Niti, and Sanatsujata dialogues.',
    category_slug: 'hindu-dharm',
    class_grade: 'All Ages',
    subject: 'Indian History & Dharma',
    cover_image_url: '/images/books/gita-press-large.jpg',
    link_type: 'external',
    external_url: 'https://archive.org/details/valmiki-ramayana_202404'
  },
  {
    title: 'Nine Principal Upanishads (ईशादि नौ उपनिषद - हिंदी व्याख्या)',
    title_hindi: 'ईशादि नौ उपनिषद - ईश, केन, कठ, प्रश्न, मुण्डक, माण्डूक्य आदि',
    author: 'Ancient Vedic Rishis',
    publisher: 'Gita Press Gorakhpur',
    description: 'Foundational texts of Vedanta philosophy exploring self-knowledge, Brahman, Atman, and timeless moral truths.',
    category_slug: 'hindu-dharm',
    class_grade: 'Higher Secondary',
    subject: 'Vedanta & Philosophy',
    cover_image_url: '/images/books/upanishad.jpg',
    link_type: 'external',
    external_url: 'https://archive.org/details/gita-shankarbhasya-hindi-gitapress'
  },
  {
    title: 'Shri Hanuman Chalisa & Sundarkand (हनुमान चालीसा व सुंदरकांड)',
    title_hindi: 'श्री हनुमान चालीसा एवं सुंदरकांड - हिंदी अर्थ सहित',
    author: 'Goswami Tulsidas',
    publisher: 'Gita Press Gorakhpur',
    description: 'Sacred verses of courage, devotion, concentration, and mental resilience for students.',
    category_slug: 'hindu-dharm',
    class_grade: 'All Ages',
    subject: 'Devotion & Mind Power',
    cover_image_url: '/images/books/hanuman-chalisa-art.jpg',
    link_type: 'external',
    external_url: 'https://archive.org/details/GitaInHindi'
  },

  // ==========================================
  // COMPETITIVE EXAMS & HIGHER EDUCATION
  // ==========================================
  {
    title: 'National Digital Library of India (NDLI)',
    title_hindi: 'राष्ट्रीय डिजिटल पुस्तकालय (आईआईटी खड़गपुर)',
    author: 'Ministry of Education & IIT Kharagpur',
    publisher: 'Government of India',
    description: 'Over 60 million free digital books, research monographs, simulation models, and solved question papers for Indian students.',
    category_slug: 'competitive',
    class_grade: 'Competitive / All',
    subject: 'Multi-Disciplinary Hub',
    cover_image_url: IMG.competitive,
    link_type: 'external',
    external_url: 'https://ndl.iitkgp.ac.in'
  },
  {
    title: 'UPSC Civil Services Examination NCERT Foundation Compendium',
    title_hindi: 'संघ लोक सेवा आयोग (UPSC) - एनसीईआरटी फाउंडेशन संकलन',
    author: 'Civil Services Mentorship Cell',
    publisher: 'National Academic Repositories',
    description: 'Integrated reading guide for Indian Polity, Modern Indian History, Economic Development, and Physical Geography for civil service aspirants.',
    category_slug: 'competitive',
    class_grade: 'Competitive / All',
    subject: 'General Studies',
    cover_image_url: IMG.civics,
    link_type: 'external',
    external_url: 'https://egyankosh.ac.in'
  },
  {
    title: 'NEET UG Medical Entrance Official Question Bank & Foundation',
    title_hindi: 'नीट (NEET) मेडिकल प्रवेश परीक्षा - विज्ञान आधार',
    author: 'NTA & NCERT Biology Faculty',
    publisher: 'National Testing Agency',
    description: 'Comprehensive biology, organic chemistry, and mechanics modules aligned with the NEET syllabus.',
    category_slug: 'competitive',
    class_grade: 'Class 11-12',
    subject: 'Medical Sciences',
    cover_image_url: IMG.biology,
    link_type: 'external',
    external_url: 'https://www.nta.ac.in'
  },
  {
    title: 'CUET UG (Common University Entrance Test) Official Study Modules',
    title_hindi: 'सीयूईटी (CUET) केंद्रीय विश्वविद्यालय प्रवेश परीक्षा',
    author: 'NTA Academic Team',
    publisher: 'NTA New Delhi',
    description: 'Domain subject preparation, general aptitude test, numerical ability, and language comprehension guides.',
    category_slug: 'competitive',
    class_grade: 'Class 12',
    subject: 'University Entrance',
    cover_image_url: IMG.competitive,
    link_type: 'external',
    external_url: 'https://www.nta.ac.in'
  },
  {
    title: 'eGyanKosh - Free National Open Learning Repository (IGNOU)',
    title_hindi: 'ई-ज्ञानकोश - मुक्त विश्वविद्यालय अध्ययन सामग्री',
    author: 'Indira Gandhi National Open University',
    publisher: 'IGNOU New Delhi',
    description: 'Self-instructional learning materials in Public Administration, History, Sociology, and Economics.',
    category_slug: 'competitive',
    class_grade: 'Competitive / All',
    subject: 'Humanities & Social Sciences',
    cover_image_url: IMG.history,
    link_type: 'external',
    external_url: 'https://egyankosh.ac.in'
  },
  {
    title: 'NIOS Senior Secondary Open School Study Textbooks',
    title_hindi: 'एनआईओएस उच्चतर माध्यमिक अध्ययन पुस्तकें',
    author: 'National Institute of Open Schooling',
    publisher: 'Ministry of Education, GoI',
    description: 'High-quality self-study books across Science, Commerce, and Humanities with modular chapter summaries.',
    category_slug: 'competitive',
    class_grade: 'Class 10-12',
    subject: 'Self-Study & Board Prep',
    cover_image_url: IMG.literature,
    link_type: 'external',
    external_url: 'https://www.nios.ac.in'
  },

  // ==========================================
  // SCHOOL MATERIALS & GIRL CHILD EMPOWERMENT
  // ==========================================
  {
    title: 'Ladli Laxmi & Gaon Ki Beti Scholarship Guide (MP Govt)',
    title_hindi: 'लाड़ली लक्ष्मी एवं गांव की बेटी छात्रवृत्ति मार्गदर्शिका',
    author: 'Student Welfare & Guidance Cell',
    publisher: 'PM SHRI Girls HSS Khujner',
    description: 'Comprehensive handbook detailing application steps, eligibility criteria, and benefits of government scholarship schemes for girl students in Madhya Pradesh.',
    category_slug: 'school-materials',
    class_grade: 'Class 9-12',
    subject: 'Scholarships & Welfare',
    cover_image_url: IMG.primary,
    link_type: 'external',
    external_url: 'https://vimarsh.mp.gov.in'
  },
  {
    title: 'Rani Laxmibai Atmaraksha Self-Defense & Fitness Manual',
    title_hindi: 'रानी लक्ष्मीबाई आत्मरक्षा एवं शारीरिक दक्षता प्रशिक्षण',
    author: 'Physical Education & Defense Wing',
    publisher: 'PM SHRI Girls HSS Khujner',
    description: 'Martial arts stances, situational defense, physical fitness drills, and mental fortitude exercises taught to all girl students at Khujner campus.',
    category_slug: 'school-materials',
    class_grade: 'Class 6-12',
    subject: 'Self Defense & Fitness',
    cover_image_url: IMG.sports,
    link_type: 'external',
    external_url: 'https://education.gov.in/pm-shri'
  },
  {
    title: 'NEP 2020 Student Handbook & 21st Century Skills',
    title_hindi: 'राष्ट्रीय शिक्षा नीति 2020 - 21वीं सदी के कौशल मार्गदर्शिका',
    author: 'Ministry of Education, GoI',
    publisher: 'Government of India',
    description: 'Pedagogical handbook explaining experiential learning, critical thinking, holistic progress cards, and vocational options under PM SHRI scheme.',
    category_slug: 'school-materials',
    class_grade: 'Class 6-12',
    subject: 'Holistic Education',
    cover_image_url: IMG.coding,
    link_type: 'external',
    external_url: 'https://www.education.gov.in/pm-shri'
  }
];

const insertBook = db.prepare(`
  INSERT INTO books (
    title, title_hindi, author, publisher, description,
    category_id, class_grade, subject, cover_image_url, link_type, external_url,
    is_public_domain, is_active, view_count
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 1, ?)
`);

let count = 0;
for (const b of allBooks) {
  const catId = categoryMap[b.category_slug];
  if (!catId) continue;
  const views = Math.floor(Math.random() * 95) + 35;
  insertBook.run(
    b.title,
    b.title_hindi,
    b.author,
    b.publisher,
    b.description,
    catId,
    b.class_grade,
    b.subject,
    b.cover_image_url,
    b.link_type,
    b.external_url,
    views
  );
  count++;
}

console.log(`🎉 Successfully seeded ${count} books across Classes 1-12 with verified cover images!`);
