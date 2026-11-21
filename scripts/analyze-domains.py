import sqlite3
from urllib.parse import urlparse

conn = sqlite3.connect('server/database.sqlite')
c = conn.cursor()

c.execute("SELECT id, title, category_id, pdf_file_url, external_url FROM books")
rows = c.fetchall()

domains = {}
for r in rows:
    book_id, title, cat_id, pdf_url, ext_url = r
    p_domain = urlparse(pdf_url).netloc if pdf_url else 'None'
    e_domain = urlparse(ext_url).netloc if ext_url else 'None'
    key = f"PDF: {p_domain} | EXT: {e_domain}"
    domains[key] = domains.get(key, 0) + 1

print("--- Breakdown of Book URLs by Domain ---")
for k, count in sorted(domains.items(), key=lambda x: x[1], reverse=True):
    print(f"{count:4d} books -> {k}")
