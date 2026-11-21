import fs from 'fs';
import { DatabaseSync } from 'node:sqlite';

const ncertCollection = new Set(JSON.parse(fs.readFileSync('scripts/ncert_archive_collection.json', 'utf8')));
const psCollection = new Set(JSON.parse(fs.readFileSync('scripts/archive_ps_items.json', 'utf8')));
const db = new DatabaseSync('server/database.sqlite');

const books = db.prepare('SELECT id, title, pdf_file_url, external_url FROM books WHERE category_id = 1').all();

const updateStmt = db.prepare(`
  UPDATE books
  SET pdf_file_url = ?, external_url = ?
  WHERE id = ?
`);

let updatedCount = 0;
let unchangedCount = 0;

for (const b of books) {
  const raw = b.external_url || b.pdf_file_url || '';
  const m1 = raw.match(/[?&]([a-z0-9_]{3,20})=/i);
  const m2 = raw.match(/\/([a-z0-9_]{3,20})\d{2}\.pdf/i);
  const m3 = raw.match(/archive\.org\/download\/(?:ncert-)?([a-z0-9_]{3,20})ps\//i);
  const code = (m1 ? m1[1] : (m2 ? m2[1] : (m3 ? m3[1] : null)))?.toLowerCase();

  if (!code) {
    console.log(`[SKIPPED] No code found for ID ${b.id}: ${b.title}`);
    unchangedCount++;
    continue;
  }

  let pdfUrl = '';
  let detailUrl = '';

  if (ncertCollection.has('ncert-' + code)) {
    pdfUrl = `https://archive.org/download/ncert-${code}/${code}ps.pdf`;
    detailUrl = `https://archive.org/details/ncert-${code}`;
  } else {
    pdfUrl = `https://archive.org/download/${code}ps/${code}ps.pdf`;
    detailUrl = `https://archive.org/details/${code}ps`;
  }

  updateStmt.run(pdfUrl, detailUrl, b.id);
  updatedCount++;
}

console.log(`Successfully updated ${updatedCount} NCERT books to direct archive PDF URLs! (Skipped: ${unchangedCount})`);

// Verify sample
const sample = db.prepare('SELECT id, title, pdf_file_url, external_url FROM books WHERE id = 693').get();
console.log('Sample updated record (ID 693):', sample);
