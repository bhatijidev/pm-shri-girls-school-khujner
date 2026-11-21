import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('server/database.sqlite');

// Check if language column already exists
const tableInfo = db.prepare('PRAGMA table_info(books)').all();
const hasLanguage = tableInfo.some(c => c.name === 'language');

if (!hasLanguage) {
  console.log('Adding language column to books table...');
  db.exec("ALTER TABLE books ADD COLUMN language TEXT DEFAULT 'Hindi'");
  db.exec("CREATE INDEX IF NOT EXISTS idx_books_language ON books(language)");
  db.exec("CREATE INDEX IF NOT EXISTS idx_books_subject ON books(subject)");
  db.exec("CREATE INDEX IF NOT EXISTS idx_books_class_subject ON books(class_grade, subject)");
  console.log('Language column and indexes created!');
} else {
  console.log('Language column already exists.');
}

const books = db.prepare("SELECT id, title, subject, class_grade, pdf_file_url, external_url FROM books").all();

function detectLanguage(b) {
  const t = (b.title || '').toLowerCase();
  const sub = (b.subject || '').toLowerCase();
  const url = (b.pdf_file_url || '') + ' ' + (b.external_url || '');

  // 1. Explicit in title
  if (/\(urdu\)/i.test(b.title) || /\(उर्दू\)/i.test(b.title) || sub === 'urdu') return 'Urdu';
  if (/\(sanskrit\)/i.test(b.title) || /\(संस्कृत\)/i.test(b.title) || sub === 'sanskrit' || sub.includes('sanskrit')) return 'Sanskrit';
  if (/\(punjabi\)/i.test(b.title) || /\(पंजाबी\)/i.test(b.title) || sub === 'punjabi') return 'Punjabi';
  if (/\(santhali\)/i.test(b.title) || /\(संथाली\)/i.test(b.title) || sub === 'santhali') return 'Santhali';
  if (/\(maithli\)/i.test(b.title) || /\(maithili\)/i.test(b.title)) return 'Maithili';
  if (/\(english\)/i.test(b.title) || /\(अंग्रेजी\)/i.test(b.title) || sub === 'english' || sub === 'english supplementary') return 'English';
  if (/\(hindi\)/i.test(b.title) || /\(हिंदी\)/i.test(b.title) || /\(हिन्दी\)/i.test(b.title) || sub === 'hindi') return 'Hindi';

  // 2. NCERT code matching (2nd char of code)
  const m = url.match(/(?:download|textbook)\/(?:ncert-)?([a-z0-9_]{3,20})(?:ps|\d{2})/i) ||
            url.match(/[?&]([a-z0-9_]{3,20})=/i);
  if (m) {
    const code = m[1].toLowerCase();
    if (code.length >= 4) {
      if (code[1] === 'h') return 'Hindi';
      if (code[1] === 'e') return 'English';
      if (code[1] === 'u') return 'Urdu';
      if (code.slice(1, 3) === 'sk') return 'Sanskrit';
      if (code.slice(1, 3) === 'mt') return 'Maithili';
    }
  }

  // 3. Subject-based or title keywords
  if (t.includes('ganit') || t.includes('samajik') || t.includes('vigyan') || t.includes('bharat') || t.includes('hamara') || t.includes('itihas') || t.includes('bhugol') || t.includes('rajniti') || t.includes('arthashastra') || t.includes('shastra') || t.includes('gita') || t.includes('ramayan') || t.includes('upanishad') || t.includes('prashnottar')) {
    return 'Hindi';
  }

  if (t.includes('mathematics') || t.includes('science') || t.includes('physics') || t.includes('chemistry') || t.includes('biology') || t.includes('history') || t.includes('geography') || t.includes('economics') || t.includes('contemporary') || t.includes('democratic') || t.includes('financial') || t.includes('handbook') || t.includes('crafts') || t.includes('computer')) {
    return 'English';
  }

  return 'Hindi';
}

const updateStmt = db.prepare('UPDATE books SET language = ? WHERE id = ?');

const counts = {};
for (const b of books) {
  const lang = detectLanguage(b);
  updateStmt.run(lang, b.id);
  counts[lang] = (counts[lang] || 0) + 1;
}

db.exec('PRAGMA wal_checkpoint(TRUNCATE);');

console.log('Language classification completed!');
console.log('Counts:', counts);
