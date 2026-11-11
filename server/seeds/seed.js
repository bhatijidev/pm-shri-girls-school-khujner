import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../config/db.js';
import { expandedBooks } from './add_expanded_books.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🌱 Starting Full Textbook Catalog Seeder for PM SHRI Girls HSS Khujner...');

// 1. Verify/Seed Admin User
const adminPassword = 'PmShri@Khujner2024';
const salt = bcrypt.genSaltSync(12);
const passwordHash = bcrypt.hashSync(adminPassword, salt);

const existingAdmin = db.prepare('SELECT id FROM admin_users WHERE username = ?').get('admin');
if (!existingAdmin) {
  db.prepare(`
    INSERT INTO admin_users (username, password_hash, full_name, email, role)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    'admin',
    passwordHash,
    'Principal & Head Admin',
    'principalgghsskhujner@gmail.com',
    'superadmin'
  );
  console.log(`✅ Admin user seeded: username: 'admin', password: '${adminPassword}'`);
} else {
  db.prepare('UPDATE admin_users SET password_hash = ? WHERE id = ?').run(passwordHash, existingAdmin.id);
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

// 3. Clear existing books to re-seed cleanly
db.prepare('DELETE FROM books').run();
console.log('🧹 Cleaned existing books table for comprehensive re-seeding...');

// Real Cover Image Selector based on Subject and Grade
function getCoverImage(subject, title, classGrade) {
  const t = (title + ' ' + subject).toLowerCase();
  if (t.includes('gita') || t.includes('geeta')) return '/images/books/bhagavad-gita-real.jpg';
  if (t.includes('ramayan') && !t.includes('ramkatha')) return '/images/books/valmiki-ramayana.jpg';
  if (t.includes('ramcharitmanas')) return '/images/books/ramcharitmanas.jpg';
  if (t.includes('upanishad')) return '/images/books/upanishad.jpg';
  if (t.includes('hanuman')) return '/images/books/hanuman-chalisa-art.jpg';
  if (t.includes('mahabharat') && !t.includes('bal mahabharat')) return '/images/books/valmiki-ramayana.jpg';

  // Specific subject mappings with high-resolution authentic covers
  if (t.includes('physics') || t.includes('bhautiki') || t.includes('tabiyaat')) return '/images/books/ncert-physics-c12.jpg';
  if (t.includes('biology') || t.includes('jeev vigyan') || t.includes('hayatiyaat')) return '/images/books/ncert-biology-c11.jpg';
  if (t.includes('chemistry') || t.includes('rasayan') || t.includes('keemiya')) return '/images/books/ncert-science-c9.jpg';
  if (t.includes('science') || t.includes('vigyan') || t.includes('curiosity') || t.includes('jigyasa') || t.includes('anveshan') || t.includes('exploration')) {
    return classGrade && parseInt(classGrade.replace('Class ', '')) <= 8 ? '/images/books/ncert-vigyan-c7.jpg' : '/images/books/ncert-vigyan-c9.jpg';
  }
  if (t.includes('math') || t.includes('ganit') || t.includes('riyazi') || t.includes('shumariyaat')) return '/images/books/ncert-math-c10.jpg';
  if (t.includes('history') || t.includes('itihas') || t.includes('past') || t.includes('bharat ki khoj') || t.includes('tareekh')) return '/images/books/ncert-bharat-vishwa.jpg';
  if (t.includes('geography') || t.includes('bhugol') || t.includes('jughrafia') || t.includes('environment') || t.includes('paryavaran') || t.includes('aas-pass') || t.includes('looking around')) return '/images/books/cat-mpboard.jpg';
  if (t.includes('politic') || t.includes('rajniti') || t.includes('siyasat') || t.includes('civics') || t.includes('constitution') || t.includes('samvidhan') || t.includes('democratic') || t.includes('loktantrik')) return '/images/books/ncert-loktantra.jpg';
  if (t.includes('economics') || t.includes('arthshastra') || t.includes('maashiyat') || t.includes('account') || t.includes('lekhashastra') || t.includes('khatadari') || t.includes('business') || t.includes('vyavasay')) return '/images/books/cat-ncert.jpg';
  
  if (t.includes('english') || t.includes('mridang') || t.includes('marigold') || t.includes('flaming') || t.includes('hornbill') || t.includes('vistas') || t.includes('beehive') || t.includes('first flight') || t.includes('honeycomb') || t.includes('honeysuckle') || t.includes('honeydew') || t.includes('poorvi') || t.includes('santoor') || t.includes('kaveri')) return '/images/books/ncert-flamingo.jpg';
  if (t.includes('sanskrit') || t.includes('ruchira') || t.includes('shemushi') || t.includes('bhaswati') || t.includes('shashwati') || t.includes('deepakam') || t.includes('sharada')) return '/images/books/ncert-kritika.jpg';
  if (t.includes('hindi') || t.includes('sarangi') || t.includes('rimjhim') || t.includes('vasant') || t.includes('kshitij') || t.includes('kritika') || t.includes('sparsh') || t.includes('sanchayan') || t.includes('aroh') || t.includes('vitan') || t.includes('antra') || t.includes('malhar') || t.includes('ganga') || t.includes('veena') || t.includes('bal ramkatha') || t.includes('bal mahabharat')) {
    return classGrade && parseInt(classGrade.replace('Class ', '')) <= 5 ? '/images/books/ncert-rimjhim.jpg' : '/images/books/ncert-kritika.jpg';
  }
  if (t.includes('computer') || t.includes('vocational') || t.includes('kaushal') || t.includes('data entry') || t.includes('informatics')) return '/images/books/cat-cbse.jpg';
  if (t.includes('khel') || t.includes('yoga') || t.includes('physical education') || t.includes('defense') || t.includes('sports')) return '/images/books/cat-career.jpg';
  
  return '/images/books/cat-ncert.jpg';
}

// 4. Load NCERT Parsed JSON
const ncertPath = path.join(__dirname, '../ncert_all_parsed.json');
let ncertRaw = [];
if (fs.existsSync(ncertPath)) {
  ncertRaw = JSON.parse(fs.readFileSync(ncertPath, 'utf8'));
  console.log(`📖 Loaded ${ncertRaw.length} raw NCERT textbook records from parsed dataset.`);
}

// Filter out non-local regional state languages (keep Hindi, English, Sanskrit, Urdu, Science, Maths, Social Science, Commerce, Arts, Vocational)
const regionalFilter = /(Assamese|Bengali|Bodo|Dogri|Gujarati|Kannada|Kashmiri|Konkani|Maithili|Malayalam|Manipuri|Marathi|Nepali|Odia|Oriya|Punjabi|Santhali|Sindhi|Tamil|Telugu)/i;

// Verified list of deprecated 404 NCERT codes that return "ERROR" on NCERT servers (replaced by new NEP 2024 editions)
const brokenCodes = new Set([
  "chhn1", "ceap1", "chap1", "cuap1", "ceen1", "cemh1", "chmh1", "curi1", "culb1",
  "demh1", "duri1", "dhhn1", "duap1", "deen1", "dulb1", "euma1", "eulb1",
  "heih1", "huhi1", "huse1", "hugy1", "huss1", "huaz1", "huug1", "hudp1", "hujp1",
  "iepb1", "ievc1", "ieva1", "ievs1", "ievt1", "ievw1", "ieve1", "ievh1", "iepg1", "ieeo1", "iees1",
  "kepc1", "kevt1", "keoc1", "keda1", "kedf1", "kefc1", "kehc1", "kegd1", "khgd1", "kect1", "kect2", "khct1", "khct2",
  "lehc1", "lhhc1", "legd1", "mehc1", "khhc1", "geof1",
  "fhvs1", "fhbr1", "fehs1", "feps1", "fhsk1", "fess2", "fess3", "ghbm1",
  "iemo1", "ihks1", "ihkr1", "iess1", "iess2", "iess3", "iess4"
]);

const bookList = [];

// Track book codes to prevent duplicates
const seenCodes = new Set();

// 4A. Import Curated NCERT Books from JSON
for (const b of ncertRaw) {
  if (!b.classGrade || !b.title || !b.code) continue;
  if (regionalFilter.test(b.title)) continue;
  if (brokenCodes.has(b.code)) continue;
  if (seenCodes.has(b.code)) continue;
  seenCodes.add(b.code);

  let grade = b.classGrade;
  if (grade === 'Class 13' || grade === 'Class 14') {
    grade = 'Class 11-12';
  }

  const directPdf = b.directPdf || `https://ncert.nic.in/textbook/pdf/${b.code}01.pdf`;
  const portalUrl = b.fullPageUrl || `https://ncert.nic.in/textbook.php?${b.code}=${b.range || '0-10'}`;

  const cleanTitle = b.title.replace(/\s+/g, ' ').trim();
  const fullTitle = `NCERT ${grade} - ${cleanTitle} (${b.subject})`;
  const hindiTitle = `कक्षा ${grade.replace('Class ', '')} - ${cleanTitle} (${b.subject})`;

  bookList.push({
    title: fullTitle,
    title_hindi: hindiTitle,
    author: 'NCERT Faculty & Subject Committee',
    publisher: 'National Council of Educational Research and Training (NCERT)',
    description: `Official NCERT prescribed textbook for ${grade} (${b.subject}) aligned with National Education Policy (NEP 2020 / NCF-SE). Free full digital access.`,
    category_slug: 'ncert',
    class_grade: grade,
    subject: b.subject,
    cover_image_url: getCoverImage(b.subject, cleanTitle, grade),
    link_type: 'external',
    external_url: portalUrl,
    pdf_file_url: directPdf,
    is_public_domain: 1
  });
}

// 4B. Add Classic Core NCERT Books (Established Curriculum for MP Board & CBSE)
const classicBooks = [
  // Class 1 Classic
  {
    title: 'NCERT Class 1 - Math-Magic (गणित का जादू)',
    title_hindi: 'कक्षा 1 - गणित का जादू (गणित)',
    author: 'NCERT Primary Mathematics Division',
    publisher: 'NCERT New Delhi',
    description: 'Foundational numeracy, shapes, playful visual counting, and addition for primary students.',
    category_slug: 'ncert',
    class_grade: 'Class 1',
    subject: 'Mathematics',
    external_url: 'https://ncert.nic.in/textbook.php?aemh1=0-13',
    pdf_file_url: 'https://ncert.nic.in/textbook/pdf/aejm101.pdf'
  },
  {
    title: 'NCERT Class 1 - Rimjhim (रिमझिम हिंदी)',
    title_hindi: 'कक्षा 1 - रिमझिम (हिंदी प्रथम भाषा)',
    author: 'NCERT Hindi Cell',
    publisher: 'NCERT',
    description: 'Joyful Hindi poems, alphabets, picture stories, moral fables, and basic reading skills.',
    category_slug: 'ncert',
    class_grade: 'Class 1',
    subject: 'Hindi',
    external_url: 'https://ncert.nic.in/textbook.php?ahhn1=0-23',
    pdf_file_url: 'https://ncert.nic.in/textbook/pdf/ahsr101.pdf'
  },
  {
    title: 'NCERT Class 1 - Marigold English',
    title_hindi: 'कक्षा 1 - मैरीगोल्ड (अंग्रेजी)',
    author: 'NCERT English Division',
    publisher: 'NCERT',
    description: 'Early English rhymes, story comprehension, vocabulary building, and phonics for beginners.',
    category_slug: 'ncert',
    class_grade: 'Class 1',
    subject: 'English',
    external_url: 'https://ncert.nic.in/textbook.php?aeen1=0-10',
    pdf_file_url: 'https://ncert.nic.in/textbook/pdf/aemr101.pdf'
  },

  // Class 2 Classic
  {
    title: 'NCERT Class 2 - Math-Magic (गणित का जादू)',
    title_hindi: 'कक्षा 2 - गणित का जादू (गणित)',
    author: 'NCERT Primary Mathematics Division',
    publisher: 'NCERT',
    description: 'Two-digit addition, subtraction, measurement, patterns, and currency for Class 2.',
    category_slug: 'ncert',
    class_grade: 'Class 2',
    subject: 'Mathematics',
    external_url: 'https://ncert.nic.in/textbook.php?bemh1=0-15',
    pdf_file_url: 'https://ncert.nic.in/textbook/pdf/bejm101.pdf'
  },
  {
    title: 'NCERT Class 2 - Rimjhim (रिमझिम हिंदी)',
    title_hindi: 'कक्षा 2 - रिमझिम (हिंदी प्रथम भाषा)',
    author: 'NCERT Hindi Cell',
    publisher: 'NCERT',
    description: 'Poetic verses, playful folk stories, vocabulary exercises, and conversation practice in Hindi.',
    category_slug: 'ncert',
    class_grade: 'Class 2',
    subject: 'Hindi',
    external_url: 'https://ncert.nic.in/textbook.php?bhhn1=0-15',
    pdf_file_url: 'https://ncert.nic.in/textbook/pdf/bhsr101.pdf'
  },
  {
    title: 'NCERT Class 2 - Marigold English',
    title_hindi: 'कक्षा 2 - मैरीगोल्ड (अंग्रेजी)',
    author: 'NCERT English Division',
    publisher: 'NCERT',
    description: 'Foundational English reading, short moral stories, grammar basics, and rhymes.',
    category_slug: 'ncert',
    class_grade: 'Class 2',
    subject: 'English',
    external_url: 'https://ncert.nic.in/textbook.php?been1=0-10',
    pdf_file_url: 'https://ncert.nic.in/textbook/pdf/bemr101.pdf'
  },

  // Class 6 Classic

  // Class 7 Classic
  {
    title: 'NCERT Class 7 - Vasant Part 2 (वसंत भाग 2)',
    title_hindi: 'कक्षा 7 - वसंत भाग 2 (हिंदी)',
    author: 'NCERT Hindi Faculty',
    publisher: 'NCERT',
    description: 'Intermediate Hindi literature, poems, essays, and stories by renowned Indian authors.',
    category_slug: 'ncert',
    class_grade: 'Class 7',
    subject: 'Hindi',
    external_url: 'https://ncert.nic.in/textbook.php?ghvs1=0-15',
    pdf_file_url: 'https://ncert.nic.in/textbook/pdf/ghvs101.pdf'
  },
  {
    title: 'NCERT Class 7 - Honeycomb (English)',
    title_hindi: 'कक्षा 7 - हनीकॉम्ब (अंग्रेजी)',
    author: 'NCERT English Faculty',
    publisher: 'NCERT',
    description: 'Engaging stories and poetry for Class 7 students fostering critical thinking and communication.',
    category_slug: 'ncert',
    class_grade: 'Class 7',
    subject: 'English',
    external_url: 'https://ncert.nic.in/textbook.php?gehc1=0-8',
    pdf_file_url: 'https://ncert.nic.in/textbook/pdf/gehc101.pdf'
  },
  {
    title: 'NCERT Class 7 - An Alien Hand (English Supp.)',
    title_hindi: 'कक्षा 7 - एन एलियन हैंड (अंग्रेजी पूरक)',
    author: 'NCERT English Faculty',
    publisher: 'NCERT',
    description: 'Supplementary reader with fascinating adventure, wildlife, and science fiction stories.',
    category_slug: 'ncert',
    class_grade: 'Class 7',
    subject: 'English Supplementary',
    external_url: 'https://ncert.nic.in/textbook.php?geah1=0-7',
    pdf_file_url: 'https://ncert.nic.in/textbook/pdf/geah101.pdf'
  },
  {
    title: 'NCERT Class 7 - Ruchira Part 2 (रुचिरा द्वितीय भाग)',
    title_hindi: 'कक्षा 7 - रुचिरा द्वितीय भाग (संस्कृत)',
    author: 'NCERT Sanskrit Cell',
    publisher: 'NCERT',
    description: 'Subhashitani, moral stories, sandhi, samas, and conversation skills in Sanskrit.',
    category_slug: 'ncert',
    class_grade: 'Class 7',
    subject: 'Sanskrit',
    external_url: 'https://ncert.nic.in/textbook.php?ghsk1=0-12',
    pdf_file_url: 'https://ncert.nic.in/textbook/pdf/ghsk101.pdf'
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
    external_url: 'https://ncert.nic.in/textbook.php?gess2=0-7',
    pdf_file_url: 'https://ncert.nic.in/textbook/pdf/gess201.pdf'
  },

  // Class 9 Classic
  {
    title: 'NCERT Class 9 - Beehive (English Literature)',
    title_hindi: 'कक्षा 9 - बीहाइव (अंग्रेजी साहित्य)',
    author: 'NCERT English Faculty',
    publisher: 'NCERT',
    description: 'Prescribed English textbook containing iconic prose and poetry by Isaac Asimov, Robert Frost, and APJ Abdul Kalam.',
    category_slug: 'ncert',
    class_grade: 'Class 9',
    subject: 'English',
    external_url: 'https://ncert.nic.in/textbook.php?iebe1=0-9',
    pdf_file_url: 'https://ncert.nic.in/textbook/pdf/iebe101.pdf'
  },
  {
    title: 'NCERT Class 9 - Mathematics (गणित)',
    title_hindi: 'कक्षा 9 - गणित (एनसीईआरटी)',
    author: 'NCERT Mathematics Faculty',
    publisher: 'NCERT',
    description: 'Number systems, polynomials, coordinate geometry, linear equations in two variables, lines and angles, triangles, circles, and heron formula.',
    category_slug: 'ncert',
    class_grade: 'Class 9',
    subject: 'Mathematics',
    external_url: 'https://ncert.nic.in/textbook.php?iemh1=0-12',
    pdf_file_url: 'https://ncert.nic.in/textbook/pdf/iemh101.pdf'
  },
  {
    title: 'NCERT Class 9 - Science (विज्ञान)',
    title_hindi: 'कक्षा 9 - विज्ञान (एनसीईआरटी)',
    author: 'NCERT Science Faculty',
    publisher: 'NCERT',
    description: 'Matter in our surroundings, atoms and molecules, structure of atom, fundamental unit of life, tissues, motion, force, and gravitation.',
    category_slug: 'ncert',
    class_grade: 'Class 9',
    subject: 'Science',
    external_url: 'https://ncert.nic.in/textbook.php?iesc1=0-12',
    pdf_file_url: 'https://ncert.nic.in/textbook/pdf/iesc101.pdf'
  }
];

for (const b of classicBooks) {
  bookList.push({
    ...b,
    cover_image_url: getCoverImage(b.subject, b.title, b.class_grade),
    link_type: 'external',
    is_public_domain: 1
  });
}

// 4C. Add Sacred Hindu Dharm Granths (Authentic Gita Press Editions via Archive.org)
const dharmBooks = [
  {
    title: 'Shrimad Bhagavad Gita (श्रीमद्भगवद्गीता - साधक संजीवनी)',
    title_hindi: 'श्रीमद्भगवद्गीता (गीताप्रेस गोरखपुर - हिंदी अनुवाद)',
    author: 'Maharshi Ved Vyasa (Gita Press Gorakhpur)',
    publisher: 'Gita Press Gorakhpur (Public Domain)',
    description: 'Complete 18 Adhyayas with Sanskrit verses, word-by-word meaning, and profound philosophical commentary on Karma Yoga, Bhakti Yoga, and Jnana Yoga.',
    category_slug: 'hindu-dharm',
    class_grade: 'All Ages',
    subject: 'Philosophy & Spirituality',
    cover_image_url: '/images/books/bhagavad-gita-real.jpg',
    external_url: 'https://archive.org/details/GitaInHindi',
    pdf_file_url: 'https://archive.org/download/GitaInHindi/Gita%20in%20hindi.pdf'
  },
  {
    title: 'Shri Ramcharitmanas (श्री रामचरितमानस - तुलसीदास)',
    title_hindi: 'श्री रामचरितमानस (गीताप्रेस गोरखपुर - सम्पूर्ण सात काण्ड)',
    author: 'Goswami Tulsidas (Gita Press Gorakhpur)',
    publisher: 'Gita Press Gorakhpur (Public Domain)',
    description: 'Complete seven Kaandas (Bal, Ayodhya, Aranya, Kishkindha, Sundar, Lanka, Uttar) in poetic Awadhi with pristine Hindi translation.',
    category_slug: 'hindu-dharm',
    class_grade: 'All Ages',
    subject: 'Epic Literature & Bhakti',
    cover_image_url: '/images/books/ramcharitmanas.jpg',
    external_url: 'https://archive.org/details/GitaPress790',
    pdf_file_url: 'https://archive.org/download/GitaPress790/790_Shrimadgoswami%20Tulsidasji%20Virchit%20Shriramcaritmanas(Kewal%20Hindi%20Anuwad).pdf'
  },
  {
    title: 'Valmiki Ramayana Part 1 & 2 (श्रीमद्वाल्मीकीय रामायण)',
    title_hindi: 'श्रीमद्वाल्मीकीय रामायण (संस्कृत मूल एवं हिंदी अनुवाद)',
    author: 'Adi Kavi Maharshi Valmiki',
    publisher: 'Gita Press Gorakhpur (Public Domain)',
    description: 'The monumental foundational epic of Sanatana Dharma with authentic Sanskrit shlokas and precise verse-by-verse Hindi translation.',
    category_slug: 'hindu-dharm',
    class_grade: 'All Ages',
    subject: 'Ancient Indian Epics',
    cover_image_url: '/images/books/valmiki-ramayana.jpg',
    external_url: 'https://archive.org/details/valmiki-ramayan-part-1-gita-press',
    pdf_file_url: 'https://archive.org/download/valmiki-ramayan-part-1-gita-press/Valmiki%20Ramayan%20Part%201%20Gita%20press.pdf'
  },
  {
    title: 'Mahabharata (संक्षिप्त महाभारत - गीताप्रेस)',
    title_hindi: 'संक्षिप्त महाभारत (गीताप्रेस गोरखपुर - हिंदी अनुवाद)',
    author: 'Maharshi Ved Vyasa (Gita Press)',
    publisher: 'Gita Press Gorakhpur (Public Domain)',
    description: 'The grand encyclopedia of Indian culture, duty, morals, governance, and history across all Parvas.',
    category_slug: 'hindu-dharm',
    class_grade: 'All Ages',
    subject: 'Classical Sanskrit Heritage',
    cover_image_url: '/images/books/valmiki-ramayana.jpg',
    external_url: 'https://archive.org/details/valmiki-ramayana_202404',
    pdf_file_url: 'https://archive.org/download/valmiki-ramayana_202404/Valmiki%20Ramayan%20Part%201%20Gita%20press.pdf'
  },
  {
    title: 'Nine Principal Upanishads (ईशादि नौ उपनिषद - हिंदी व्याख्या)',
    title_hindi: 'ईशादि नौ उपनिषद (ईश, केन, कठ, प्रश्न, मुण्डक, माण्डूक्य, तैत्तिरीय, ऐतरेय, श्वेताश्वतर)',
    author: 'Vedic Risis & Shankaracharya Bhashya',
    publisher: 'Gita Press Gorakhpur (Public Domain)',
    description: 'The quintessential philosophical essence of the Vedas exploring Brahman, Atman, and eternal truth.',
    category_slug: 'hindu-dharm',
    class_grade: 'All Ages',
    subject: 'Upanishadic Vedanta',
    cover_image_url: '/images/books/upanishad.jpg',
    external_url: 'https://archive.org/details/gita-shankarbhasya-hindi-gitapress',
    pdf_file_url: 'https://archive.org/download/gita-shankarbhasya-hindi-gitapress/Gita_Shankarbhasya_Hindi_GitaPress.pdf'
  },
  {
    title: 'Shri Hanuman Chalisa & Sundarkand (हनुमान चालीसा व सुंदरकांड)',
    title_hindi: 'श्री हनुमान चालीसा एवं सुंदरकांड (सचित्र सरल हिंदी टीका)',
    author: 'Goswami Tulsidas',
    publisher: 'Gita Press Gorakhpur (Public Domain)',
    description: 'Revered devotional verses, Sankatmochan Hanumanashtak, Bajrang Baan, and complete Sundarkand text with Hindi meaning.',
    category_slug: 'hindu-dharm',
    class_grade: 'All Ages',
    subject: 'Devotional Literature',
    cover_image_url: '/images/books/hanuman-chalisa-art.jpg',
    external_url: 'https://archive.org/details/GitaInHindi',
    pdf_file_url: 'https://archive.org/download/GitaInHindi/Gita%20in%20hindi.pdf'
  }
];

for (const b of dharmBooks) {
  bookList.push({
    ...b,
    link_type: 'external',
    is_public_domain: 1
  });
}

// 4D. Add Official MP Board, CBSE & Student Welfare Portals
const portals = [
  {
    title: 'MP Text Book Corporation Digital Repository (MPTBC)',
    title_hindi: 'मध्य प्रदेश पाठ्यपुस्तक निगम ई-बुक्स (कक्षा 1 से 12)',
    author: 'MP Pathyapustak Nigam',
    publisher: 'Government of Madhya Pradesh',
    description: 'Free official state-prescribed Hindi, English, and Sanskrit medium textbooks for primary, middle, high, and higher secondary schools across MP.',
    category_slug: 'mp-board',
    class_grade: 'Class 1-12',
    subject: 'All Subjects (MP Board)',
    cover_image_url: '/images/books/cat-mpboard.jpg',
    external_url: 'https://vimarsh.mp.gov.in',
    pdf_file_url: 'http://mptbc.nic.in'
  },
  {
    title: 'MP Board Vimarsh Portal Question Banks & Blueprints',
    title_hindi: 'विमर्श पोर्टल प्रश्न बैंक एवं मॉडल पेपर्स (कक्षा 9-12)',
    author: 'Directorate of Public Instruction (DPI MP)',
    publisher: 'School Education Department MP',
    description: 'Official MP Board Vimarsh question banks, chapter-wise marks distribution blueprint, previous years solved papers, and remedial learning modules.',
    category_slug: 'mp-board',
    class_grade: 'Class 9-12',
    subject: 'Board Exam Preparation',
    cover_image_url: '/images/books/cat-mpboard.jpg',
    external_url: 'https://vimarsh.mp.gov.in',
    pdf_file_url: 'https://vimarsh.mp.gov.in'
  },
  {
    title: 'DIKSHA Portal - Interactive Digital Lessons & QR Textbooks',
    title_hindi: 'दीक्षा पोर्टल - डिजिटल भारत इंटरैक्टिव पाठ एवं अभ्यास',
    author: 'Ministry of Education, GoI',
    publisher: 'Government of India',
    description: '3D simulations, animated audiovisual lessons, worksheets, and QR-coded textbook companions directly curated for national curriculum standards.',
    category_slug: 'cbSE'.toLowerCase(),
    class_grade: 'Class 1-12',
    subject: 'Interactive Learning',
    cover_image_url: '/images/books/cat-ncert.jpg',
    external_url: 'https://diksha.gov.in',
    pdf_file_url: 'https://diksha.gov.in'
  },
  {
    title: 'CBSE Artificial Intelligence Curriculum Handbook',
    title_hindi: 'सीबीएसई आर्टिफिशियल इंटेलिजेंस (AI) पाठ्यक्रम',
    author: 'CBSE Department of Skill Education',
    publisher: 'CBSE New Delhi',
    description: 'Official AI readiness handbook covering computer vision, natural language processing, ethical AI principles, and Python projects for secondary students.',
    category_slug: 'cbse',
    class_grade: 'Class 9-12',
    subject: 'Artificial Intelligence',
    cover_image_url: '/images/books/cat-cbse.jpg',
    external_url: 'https://cbseacademic.nic.in/skill-education.html',
    pdf_file_url: 'https://cbseacademic.nic.in/skill-education.html'
  },
  {
    title: 'National Digital Library of India (NDLI)',
    title_hindi: 'राष्ट्रीय डिजिटल लाइब्रेरी ऑफ इंडिया - निशुल्क ई-संसाधन',
    author: 'IIT Kharagpur & Ministry of Education',
    publisher: 'Government of India',
    description: 'Over 10 crore academic books, research papers, video lectures, and simulation tools across Science, Engineering, Medicine, and Humanities.',
    category_slug: 'competitive',
    class_grade: 'Competitive / All',
    subject: 'National Digital Repository',
    cover_image_url: '/images/books/cat-competitive.jpg',
    external_url: 'https://ndl.iitkgp.ac.in',
    pdf_file_url: 'https://ndl.iitkgp.ac.in'
  },
  {
    title: 'Swayam & IGNOU eGyanKosh Free Digital Learning Hub',
    title_hindi: 'स्वयं एवं इग्नू ई-ज्ञानकोश उच्च शिक्षा पुस्तकें',
    author: 'School of Humanities, Social Sciences & Sciences',
    publisher: 'IGNOU New Delhi',
    description: 'Self-instructional learning materials in Public Administration, History, Sociology, and Economics for competitive exams.',
    category_slug: 'competitive',
    class_grade: 'Competitive / All',
    subject: 'Higher Education & Prep',
    cover_image_url: '/images/books/cat-competitive.jpg',
    external_url: 'https://egyankosh.ac.in',
    pdf_file_url: 'https://egyankosh.ac.in'
  },
  {
    title: 'Ladli Laxmi & Gaon Ki Beti Scholarship Guide (MP Govt)',
    title_hindi: 'लाड़ली लक्ष्मी एवं गांव की बेटी छात्रवृत्ति मार्गदर्शिका',
    author: 'Student Welfare & Guidance Cell',
    publisher: 'PM SHRI Girls HSS Khujner',
    description: 'Comprehensive handbook detailing application steps, eligibility criteria, and benefits of government scholarship schemes for girl students in Madhya Pradesh.',
    category_slug: 'school-materials',
    class_grade: 'Class 9-12',
    subject: 'Scholarships & Welfare',
    cover_image_url: '/images/books/cat-career.jpg',
    external_url: 'https://vimarsh.mp.gov.in',
    pdf_file_url: 'https://vimarsh.mp.gov.in'
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
    cover_image_url: '/images/books/cat-career.jpg',
    external_url: 'https://education.gov.in/pm-shri',
    pdf_file_url: 'https://education.gov.in/pm-shri'
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
    cover_image_url: '/images/books/cat-cbse.jpg',
    external_url: 'https://www.education.gov.in/pm-shri',
    pdf_file_url: 'https://www.education.gov.in/pm-shri'
  }
];

for (const b of portals) {
  bookList.push({
    ...b,
    link_type: 'external',
    is_public_domain: 1
  });
}

// 4E. Add Comprehensive Competitive Exam, Hindu Dharm, & Girls Inspiration Books
for (const b of expandedBooks) {
  const isDirectPdf = b.pdf_file_url && (b.pdf_file_url.toLowerCase().endsWith('.pdf') || b.pdf_file_url.includes('/pdf/'));
  bookList.push({
    ...b,
    link_type: isDirectPdf ? 'pdf' : 'external',
    is_public_domain: 1
  });
}

// 5. Insert All Books into Database
const insertBook = db.prepare(`
  INSERT INTO books (
    title, title_hindi, author, publisher, description,
    category_id, class_grade, subject, cover_image_url, link_type, external_url,
    pdf_file_url, is_public_domain, is_active, view_count
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 1, ?)
`);

db.exec('BEGIN TRANSACTION;');
let totalInserted = 0;
try {
  for (const b of bookList) {
    const catId = categoryMap[b.category_slug];
    if (!catId) continue;
    const views = 0; // Real dynamic views starting from 0
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
      b.pdf_file_url,
      views
    );
    totalInserted++;
  }
  db.exec('COMMIT;');
} catch (err) {
  db.exec('ROLLBACK;');
  throw err;
}
console.log(`🎉 Successfully seeded ${totalInserted} comprehensive books into PM SHRI Digital Library!`);

// 6. Summary Breakdown
const breakdown = db.prepare(`
  SELECT class_grade, COUNT(*) as count
  FROM books
  GROUP BY class_grade
  ORDER BY class_grade ASC
`).all();

console.log('\n📊 Comprehensive Book Distribution by Class Grade:');
console.table(breakdown);
