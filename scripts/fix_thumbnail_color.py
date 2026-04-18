import sqlite3

conn = sqlite3.connect('backend/db.sqlite3')
cursor = conn.cursor()

# Update semua thumbnail_color lama yang masih pakai warna lama biru muda ke navy
OLD_COLORS = ['#4FA8D8', '#2568B5']  # biru muda & biru medium lama
NEW_COLOR = '#1B3A8C'  # Royal Navy Blue

for old_color in OLD_COLORS:
    cursor.execute(
        'UPDATE programs_program SET thumbnail_color = ? WHERE thumbnail_color = ?',
        (NEW_COLOR, old_color)
    )
    print(f'Updated {cursor.rowcount} rows: {old_color} -> {NEW_COLOR}')

conn.commit()
conn.close()
print('Done!')
