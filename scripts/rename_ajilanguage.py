import os
import re

# Direktori target
FRONTEND_SRC = r"d:\Aji Mitra Statistika (Faiz)\Website dummy Aji Mitra Statistika\frontend\src"

# Pola penggantian — urutan penting (spesifik dulu, baru umum)
REPLACEMENTS = [
    # slug/tags (lowercase: prioritaskan dulu)
    ("'ajilanguage'", "'ajilangua'"),
    ('"ajilanguage"', '"ajilangua"'),
    # URL/href path
    ("/program-ajilanguage", "/program-ajilangua"),
    # query key
    ("'programs', 'ajilanguage'", "'programs', 'ajilangua'"),
    # display name text (tampilan)
    ("AjiLanguage — Bahasa", "AjiLangua — Bahasa"),
    ("AjiLanguage", "AjiLangua"),
    # Nama function (hanya di page.tsx yang spesifik)
    ("function AjiLanguagePage", "function AjiLanguaPage"),
    # Kelas Langsung
    ("Kelas AjiLanguage", "Kelas AjiLangua"),
    # Tim fasilitator
    ("Tim Fasilitator AjiLanguage", "Tim Fasilitator AjiLangua"),
    # String pesan WA
    ("mendaftar program AjiLangua", "mendaftar program AjiLangua"),  # sudah benar, skip
]

ENCODING = 'utf-8'
files_updated = []

for root, dirs, files in os.walk(FRONTEND_SRC):
    for fname in files:
        if not fname.endswith(('.tsx', '.ts', '.js', '.jsx', '.json')):
            continue
        fpath = os.path.join(root, fname)
        try:
            with open(fpath, 'r', encoding=ENCODING) as f:
                original = f.read()
        except Exception:
            continue

        updated = original
        for old, new in REPLACEMENTS:
            updated = updated.replace(old, new)

        if updated != original:
            with open(fpath, 'w', encoding=ENCODING) as f:
                f.write(updated)
            files_updated.append(fpath)
            print(f"Updated: {fpath}")

print(f"\nTotal files updated: {len(files_updated)}")
