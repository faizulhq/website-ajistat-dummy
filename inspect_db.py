import sqlite3

conn = sqlite3.connect('foto-tambahan/db (1).sqlite3')
cur = conn.cursor()

# List all tables
cur.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
tables = [r[0] for r in cur.fetchall()]
print("=== TABLES ===")
for t in tables:
    print(t)

# Find user table
user_table = next((t for t in tables if 'user' in t.lower()), None)
if user_table:
    print(f"\n=== USERS from {user_table} ===")
    cur.execute(f"PRAGMA table_info({user_table})")
    cols = [c[1] for c in cur.fetchall()]
    print("Columns:", cols)
    cur.execute(f"SELECT * FROM {user_table}")
    for row in cur.fetchall():
        print(row)

conn.close()
