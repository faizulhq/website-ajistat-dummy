from PIL import Image, ImageDraw, ImageFont
import os
import shutil

BASE = r"d:\Aji Mitra Statistika (Faiz)\Website dummy Aji Mitra Statistika"
FOTO_SRC = os.path.join(BASE, "foto-tambahan")
DEST_DIR = os.path.join(BASE, "frontend", "public", "images", "programs")
SLIDE_OUT = os.path.join(BASE, "frontend", "public", "images", "slide-programs.jpg")
BOOTCAMP_OUT = os.path.join(BASE, "frontend", "public", "images", "bootcamp-slide.jpg")

os.makedirs(DEST_DIR, exist_ok=True)

# -----------------------------------------------------------
# 1. Pindahkan semua foto ke public/images/programs/
# -----------------------------------------------------------
for fname in os.listdir(FOTO_SRC):
    src_path = os.path.join(FOTO_SRC, fname)
    dst_path = os.path.join(DEST_DIR, fname)
    shutil.copy2(src_path, dst_path)
    print(f"Copied: {fname}")

# -----------------------------------------------------------
# 2. Copy bootcamp-slide.jpg ke images/
# -----------------------------------------------------------
shutil.copy2(
    os.path.join(DEST_DIR, "bootcamp-slide.jpg"),
    BOOTCAMP_OUT
)
print("bootcamp-slide.jpg -> images/")

# -----------------------------------------------------------
# 3. Buat kolase 5 program
# -----------------------------------------------------------
PROGRAMS = [
    ("AjiStat",    "ajistat.jpg",    "Statistik & Riset"),
    ("AjiBiz",     "ajibiz.jpg",     "Bisnis & Manajemen"),
    ("AjiDigi",    "ajidigi.jpg",    "Digital Marketing"),
    ("AjiPR",      "ajipr.jpg",      "Public Relations"),
    ("AjiLangua",  "ajilangua.jpg",  "Bahasa & Akademik"),
]

# Canvas: 1920 x 900
CANVAS_W, CANVAS_H = 1920, 900
NAVY       = (22, 32, 88)      # #162058
NAVY_DARK  = (13, 22, 50)      # #0d1632
GOLD       = (240, 165, 0)     # #F0A500
WHITE      = (255, 255, 255)

canvas = Image.new("RGB", (CANVAS_W, CANVAS_H), NAVY_DARK)

# Layout: 3 foto atas, 2 foto bawah — tengah-aligned
COL_W = CANVAS_W // 3
ROW_H = CANVAS_H // 2
GAP   = 4
OVERLAY_H = 80   # tinggi overlay gelap bawah

def add_cell(canvas, img_path, x, y, w, h, label_top, label_sub):
    """Tambahkan foto + overlay + teks ke posisi (x, y)."""
    try:
        img = Image.open(img_path).convert("RGB")
    except Exception as e:
        print(f"  Error loading {img_path}: {e}")
        img = Image.new("RGB", (w, h), NAVY)

    # Resize & crop ke ukuran cell
    iw, ih = img.size
    scale = max(w / iw, h / ih)
    nw, nh = int(iw * scale), int(ih * scale)
    img = img.resize((nw, nh), Image.LANCZOS)
    left = (nw - w) // 2
    top  = (nh - h) // 2
    img = img.crop((left, top, left + w, top + h))

    # Gradient overlay bawah
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for i in range(OVERLAY_H):
        alpha = int(220 * (i / OVERLAY_H))
        draw.rectangle([(0, h - OVERLAY_H + i), (w, h - OVERLAY_H + i + 1)],
                        fill=(13, 22, 50, alpha))
    img_rgba = img.convert("RGBA")
    img_rgba = Image.alpha_composite(img_rgba, overlay)
    img = img_rgba.convert("RGB")

    # Tambahkan gap (border tipis navy gelap)
    cell = Image.new("RGB", (w, h), NAVY_DARK)
    cell.paste(img, (0, 0))

    # Teks nama program (atas = nama program, bawah = sub)
    draw = ImageDraw.Draw(cell)
    try:
        font_big = ImageFont.truetype("arial.ttf", 32)
        font_small = ImageFont.truetype("arial.ttf", 18)
    except:
        font_big = ImageFont.load_default()
        font_small = font_big

    # Nama program (kiri bawah)
    draw.text((16, h - OVERLAY_H + 10), label_top, font=font_big, fill=WHITE)
    draw.text((16, h - OVERLAY_H + 46), label_sub, font=font_small, fill=(200, 210, 240))

    # Gold accent line kiri
    draw.rectangle([(0, h - OVERLAY_H + 8), (4, h - OVERLAY_H + 70)], fill=GOLD)

    canvas.paste(cell, (x + GAP, y + GAP))

# Row 1: AjiStat, AjiBiz, AjiDigi  (3 kolom)
for i, (name, fname, sub) in enumerate(PROGRAMS[:3]):
    px = i * COL_W
    py = 0
    w  = COL_W - GAP * 2
    h  = ROW_H - GAP * 2
    img_path = os.path.join(DEST_DIR, fname)
    add_cell(canvas, img_path, px, py, w, h, name, sub)

# Row 2: AjiPR, AjiLangua — 2 kolom, centered
TWO_COL_W = CANVAS_W // 2
OFFSET_X   = 0
for i, (name, fname, sub) in enumerate(PROGRAMS[3:]):
    px = OFFSET_X + i * TWO_COL_W
    py = ROW_H
    w  = TWO_COL_W - GAP * 2
    h  = ROW_H - GAP * 2
    img_path = os.path.join(DEST_DIR, fname)
    add_cell(canvas, img_path, px, py, w, h, name, sub)

# Simpan
canvas.save(SLIDE_OUT, "JPEG", quality=90)
print(f"\nKolase saved: {SLIDE_OUT}")
print("All done!")
