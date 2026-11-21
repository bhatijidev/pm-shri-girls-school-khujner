import sqlite3

conn = sqlite3.connect('server/database.sqlite')
c = conn.cursor()

c.execute("SELECT COUNT(id) FROM books WHERE pdf_file_url LIKE '%ncert.nic.in%'")
print("NCERT direct pdf count:", c.fetchone()[0])

c.execute("SELECT COUNT(id) FROM books WHERE external_url LIKE '%ncert.nic.in%'")
print("NCERT external_url count:", c.fetchone()[0])

c.execute("SELECT COUNT(id) FROM books")
print("Total books:", c.fetchone()[0])

c.execute("SELECT id, title, pdf_file_url, external_url FROM books WHERE pdf_file_url LIKE '%ncert.nic.in%' LIMIT 5")
for r in c.fetchall():
    print(r)

print("\n--- Non-NCERT Books ---")
c.execute("SELECT id, title, category_id, pdf_file_url, external_url FROM books WHERE pdf_file_url NOT LIKE '%ncert.nic.in%' LIMIT 10")
for r in c.fetchall():
    print(r)

print("\n--- NCERT link_type ---")
c.execute("SELECT link_type, count(id) FROM books WHERE pdf_file_url LIKE '%ncert.nic.in%' GROUP BY link_type")
for r in c.fetchall():
    print(r)
