import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', 'database.sqlite');
const db = new DatabaseSync(dbPath);

// Enable WAL mode, memory cache & fast synchronous mode for maximum speed
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');
db.exec('PRAGMA synchronous = NORMAL;');
db.exec('PRAGMA temp_store = MEMORY;');
db.exec('PRAGMA cache_size = -64000;');
db.exec('PRAGMA mmap_size = 268435456;');

// Create tables on first run
db.exec(`
  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT,
    email TEXT,
    role TEXT DEFAULT 'admin' CHECK(role IN ('superadmin', 'admin', 'editor')),
    last_login TEXT,
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    name_hindi TEXT,
    slug TEXT UNIQUE NOT NULL,
    icon TEXT,
    color TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS notices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    title_hindi TEXT,
    content TEXT NOT NULL,
    content_hindi TEXT,
    category TEXT DEFAULT 'general' CHECK(category IN ('exam', 'holiday', 'general', 'admission', 'result', 'urgent')),
    is_urgent INTEGER DEFAULT 0,
    attachment_url TEXT,
    published_at TEXT DEFAULT (datetime('now')),
    expires_at TEXT,
    is_active INTEGER DEFAULT 1,
    created_by INTEGER,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (created_by) REFERENCES admin_users(id)
  );

  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    title_hindi TEXT,
    author TEXT,
    publisher TEXT,
    description TEXT,
    category_id INTEGER NOT NULL,
    class_grade TEXT,
    subject TEXT,
    cover_image_url TEXT,
    link_type TEXT DEFAULT 'external' CHECK(link_type IN ('external', 'pdf', 'embed')),
    external_url TEXT,
    pdf_file_url TEXT,
    is_public_domain INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    view_count INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (category_id) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS instagram_embeds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    embed_code TEXT NOT NULL,
    caption TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now'))
  );

  -- High-performance database indexes
  CREATE INDEX IF NOT EXISTS idx_books_cat_active ON books(category_id, is_active);
  CREATE INDEX IF NOT EXISTS idx_books_class ON books(class_grade);
  CREATE INDEX IF NOT EXISTS idx_books_active ON books(is_active);
  CREATE INDEX IF NOT EXISTS idx_notices_active ON notices(is_active, published_at);
  CREATE INDEX IF NOT EXISTS idx_notices_urgent ON notices(is_urgent, is_active);
`);

export default db;
