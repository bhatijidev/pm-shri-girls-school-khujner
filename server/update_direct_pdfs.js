import fs from 'fs';
import db from './config/db.js';
import { apiCache } from './utils/cache.js';

// Exact direct PDF mappings for NCERT books
const ncertDirect = {
  // Class 1
  'NCERT Class 1 - Mridang English': 'https://ncert.nic.in/textbook/pdf/aemr101.pdf',
  'NCERT Class 1 - Math-Magic (गणित का जादू)': 'https://ncert.nic.in/textbook/pdf/aejm101.pdf',
  'NCERT Class 1 - Rimjhim Hindi (रिमझिम)': 'https://ncert.nic.in/textbook/pdf/ahsr101.pdf',

  // Class 2
  'NCERT Class 2 - Marigold English': 'https://ncert.nic.in/textbook/pdf/bemr101.pdf',
  'NCERT Class 2 - Math-Magic': 'https://ncert.nic.in/textbook/pdf/bejm101.pdf',
  'NCERT Class 2 - Hindi Sarangi': 'https://ncert.nic.in/textbook/pdf/bhsr101.pdf',

  // Class 3
  'NCERT Class 3 - Looking Around (आस-पास EVS)': 'https://ncert.nic.in/textbook/pdf/ceap101.pdf',
  'NCERT Class 3 - Mathematics': 'https://ncert.nic.in/textbook/pdf/cemh101.pdf',

  // Class 4
  'NCERT Class 4 - Math-Magic (गणित का जादू)': 'https://ncert.nic.in/textbook/pdf/demh101.pdf',
  'NCERT Class 4 - Looking Around': 'https://ncert.nic.in/textbook/pdf/deap101.pdf',

  // Class 5
  'NCERT Class 5 - Looking Around (आस-पास EVS)': 'https://ncert.nic.in/textbook/pdf/eeap101.pdf',
  'NCERT Class 5 - Math-Magic': 'https://ncert.nic.in/textbook/pdf/eemh101.pdf',

  // Class 6
  'NCERT Class 6 - Mathematics (गणित)': 'https://ncert.nic.in/textbook/pdf/femh101.pdf',
  'NCERT Class 6 - Science (विज्ञान)': 'https://ncert.nic.in/textbook/pdf/fesc101.pdf',
  'NCERT Class 6 - Our Pasts - I (हमारे अतीत भाग 1)': 'https://ncert.nic.in/textbook/pdf/fess101.pdf',

  // Class 7
  'NCERT Class 7 - Science (विज्ञान)': 'https://ncert.nic.in/textbook/pdf/gesc101.pdf',
  'NCERT Class 7 - Our Environment (हमारा पर्यावरण)': 'https://ncert.nic.in/textbook/pdf/gess201.pdf',
  'NCERT Class 7 - Mathematics': 'https://ncert.nic.in/textbook/pdf/gemh101.pdf',

  // Class 8
  'NCERT Class 8 - Mathematics (गणित)': 'https://ncert.nic.in/textbook/pdf/hemh101.pdf',
  'NCERT Class 8 - Science (विज्ञान)': 'https://ncert.nic.in/textbook/pdf/hesc101.pdf',
  'NCERT Class 8 - Social & Political Life III (सामाजिक एवं राजनीतिक जीवन)': 'https://ncert.nic.in/textbook/pdf/hess301.pdf',

  // Class 9
  'NCERT Class 9 - Mathematics (गणित)': 'https://ncert.nic.in/textbook/pdf/iemh101.pdf',
  'NCERT Class 9 - Science (विज्ञान)': 'https://ncert.nic.in/textbook/pdf/iesc101.pdf',
  'NCERT Class 9 - Beehive English Literature': 'https://ncert.nic.in/textbook/pdf/iebe101.pdf',
  'NCERT Class 9 - Democratic Politics I (लोकतांत्रिक राजनीति)': 'https://ncert.nic.in/textbook/pdf/iess401.pdf',

  // Class 10
  'NCERT Class 10 - Mathematics (गणित)': 'https://ncert.nic.in/textbook/pdf/jemh101.pdf',
  'NCERT Class 10 - Science (विज्ञान)': 'https://ncert.nic.in/textbook/pdf/jesc101.pdf',
  'NCERT Class 10 - First Flight English': 'https://ncert.nic.in/textbook/pdf/jeff101.pdf',
  'NCERT Class 10 - India and Contemporary World II (भारत और समकालीन विश्व)': 'https://ncert.nic.in/textbook/pdf/jess301.pdf',

  // Class 11
  'NCERT Class 11 - Physics Part 1 & 2 (भौतिकी)': 'https://ncert.nic.in/textbook/pdf/keph101.pdf',
  'NCERT Class 11 - Chemistry Part 1 & 2 (रसायन विज्ञान)': 'https://ncert.nic.in/textbook/pdf/kech101.pdf',
  'NCERT Class 11 - Biology (जीव विज्ञान)': 'https://ncert.nic.in/textbook/pdf/kebo101.pdf',
  'NCERT Class 11 - Mathematics (गणित)': 'https://ncert.nic.in/textbook/pdf/kemh101.pdf',
  'NCERT Class 11 - Indian Constitution at Work (भारत का संविधान)': 'https://ncert.nic.in/textbook/pdf/keps201.pdf',
  'NCERT Class 11 - Financial Accounting (लेखाशास्त्र)': 'https://ncert.nic.in/textbook/pdf/keac101.pdf',

  // Class 12
  'NCERT Class 12 - Physics Part 1 & 2 (भौतिकी)': 'https://ncert.nic.in/textbook/pdf/leph101.pdf',
  'NCERT Class 12 - Chemistry Part 1 & 2 (रसायन विज्ञान)': 'https://ncert.nic.in/textbook/pdf/lech101.pdf',
  'NCERT Class 12 - Biology (जीव विज्ञान)': 'https://ncert.nic.in/textbook/pdf/lebo101.pdf',
  'NCERT Class 12 - Mathematics Part 1 & 2 (गणित)': 'https://ncert.nic.in/textbook/pdf/lemh101.pdf',
  'NCERT Class 12 - Themes in Indian History (भारतीय इतिहास के कुछ विषय)': 'https://ncert.nic.in/textbook/pdf/lehs101.pdf',
  'NCERT Class 12 - Macroeconomics (समष्टि अर्थशास्त्र)': 'https://ncert.nic.in/textbook/pdf/leec201.pdf'
};

// Exact direct PDF mappings for Hindu Dharm books
const dharmDirect = {
  'Shrimad Bhagavad Gita (श्रीमद्भगवद्गीता - साधक संजीवनी)': 'https://archive.org/download/GitaInHindi/Gita%20in%20hindi.pdf',
  'Shri Ramcharitmanas (श्री रामचरितमानस - तुलसीदास)': 'https://archive.org/download/GitaPress790/790_Shrimadgoswami%20Tulsidasji%20Virchit%20Shriramcaritmanas(Kewal%20Hindi%20Anuwad).pdf',
  'Valmiki Ramayana Part 1 & 2 (श्रीमद्वाल्मीकीय रामायण)': 'https://archive.org/download/valmiki-ramayan-part-1-gita-press/Valmiki%20Ramayan%20Part%201%20Gita%20press.pdf',
  'Mahabharata (संक्षिप्त महाभारत - गीताप्रेस)': 'https://archive.org/download/valmiki-ramayana_202404/Valmiki%20Ramayan%20Part%201%20Gita%20press.pdf',
  'Nine Principal Upanishads (ईशादि नौ उपनिषद - हिंदी व्याख्या)': 'https://archive.org/download/gita-shankarbhasya-hindi-gitapress/Gita_Shankarbhasya_Hindi_GitaPress.pdf',
  'Shri Hanuman Chalisa & Sundarkand (हनुमान चालीसा व सुंदरकांड)': 'https://archive.org/download/GitaInHindi/Gita%20in%20hindi.pdf'
};

// Also add Mridang directly if not present
const existingMridang = db.prepare("SELECT id FROM books WHERE title LIKE '%Mridang%'").get();
if (!existingMridang) {
  const cat = db.prepare("SELECT id FROM categories WHERE slug = 'ncert'").get();
  if (cat) {
    db.prepare(`
      INSERT INTO books (title, title_hindi, author, publisher, description, category_id, class_grade, subject, cover_image_url, link_type, external_url, pdf_file_url, is_public_domain)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'NCERT Class 1 - Mridang English (मृदंग)',
      'मृदंग - कक्षा 1 अंग्रेजी पाठ्यपुस्तक',
      'NCERT New Delhi',
      'NCERT',
      'National Education Policy (NEP 2020) aligned English textbook for Class 1 foundational stage students.',
      cat.id,
      'Class 1',
      'English',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80',
      'external',
      'https://ncert.nic.in/textbook/pdf/aemr101.pdf',
      'https://ncert.nic.in/textbook/pdf/aemr101.pdf',
      1
    );
    console.log('Added Class 1 Mridang book.');
  }
}

// Update all books
const allBooks = db.prepare('SELECT id, title FROM books').all();
let updatedCount = 0;

const updateStmt = db.prepare(`
  UPDATE books
  SET external_url = ?, pdf_file_url = ?, link_type = 'pdf', updated_at = datetime('now')
  WHERE id = ?
`);

for (const b of allBooks) {
  let targetPdf = null;

  if (ncertDirect[b.title]) {
    targetPdf = ncertDirect[b.title];
  } else if (dharmDirect[b.title]) {
    targetPdf = dharmDirect[b.title];
  } else {
    // Check partial matches for NCERT
    for (const [key, url] of Object.entries(ncertDirect)) {
      if (b.title.includes(key) || key.includes(b.title)) {
        targetPdf = url;
        break;
      }
    }
  }

  if (targetPdf) {
    updateStmt.run(targetPdf, targetPdf, b.id);
    updatedCount++;
    console.log(`Updated [${b.id}] ${b.title} -> ${targetPdf}`);
  }
}

apiCache.clearAll();
console.log(`\nSuccessfully updated ${updatedCount} books with direct PDF links!`);
