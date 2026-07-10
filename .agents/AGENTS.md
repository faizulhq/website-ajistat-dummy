# AGENTS.md — Panduan Konteks Project Aji Institute

> File ini adalah **konteks wajib** yang harus dibaca oleh AI agent sebelum mengerjakan task apapun di project ini.
> Selalu baca file ini terlebih dahulu di awal setiap sesi kerja.

---

## 1. Gambaran Umum Project

**Nama:** Website Aji Institute  
**Tujuan:** Website resmi lembaga pelatihan dan konsultasi akademik/riset  
**Owner:** Faiz (developer) — user yang mengoperasikan admin dan deploy  
**Struktur:** Monorepo dengan 2 frontend + 1 backend Django

### Domain & Deployment
| Layanan | Domain | Keterangan |
|---|---|---|
| Backend API | `https://api.aji-institute.com` | Django REST Framework, di-host di cPanel |
| Frontend Utama | `https://aji-institute.com` | Next.js, build ke `/public_html` di cPanel |
| Frontend AjiStat | `https://ajistat.aji-institute.com` | Next.js terpisah, sub-domain cPanel |
| Admin Django | `https://api.aji-institute.com/admin` | Django Admin Panel |

### Environment Development
| Layanan | URL Lokal |
|---|---|
| Backend Django | `http://localhost:8000` |
| Frontend Utama | `http://localhost:3000` |
| Frontend AjiStat | `http://localhost:3001` (atau port berbeda) |

---

## 2. Struktur Folder Project

```
/                                   ← Root project
├── backend/                        ← Django backend
│   ├── apps/
│   │   ├── cms/                    ← Model CMS: Popup, Banner, Team, dll
│   │   ├── programs/               ← Model Program, Blog, Announcement, Riset
│   │   ├── users/                  ← Auth JWT
│   │   └── orders/                 ← Cart & Order (Midtrans)
│   ├── config/
│   │   └── urls.py                 ← URL routing utama
│   ├── manage.py
│   └── requirements.txt
├── frontend/                       ← Next.js frontend Aji Institute
│   └── src/
│       ├── app/                    ← Pages (App Router)
│       ├── components/             ← Reusable components
│       └── lib/
│           ├── types.ts            ← TypeScript interfaces
│           ├── api.ts              ← Axios API calls
│           └── config.ts           ← Konfigurasi frontend
├── frontend-ajistat/               ← Next.js frontend AjiStat (sub-brand)
│   └── src/ (struktur sama dengan frontend/)
└── .agents/
    └── AGENTS.md                   ← File ini
```

---

## 3. Backend — Django Models

### 3.1 `apps/programs/models.py` — Model Program

```python
class Program(models.Model):
    # Pilihan TYPE
    TYPE_CHOICES = [
        ('bootcamp', 'Bootcamp'),
        ('short-class', 'Short Class'),
        ('private-class', 'Private Class'),
    ]
    # Pilihan STATUS
    STATUS_CHOICES = [
        ('upcoming', 'Akan Dilaksanakan'),
        ('ongoing', 'Sedang Berlangsung'),
        ('recorded', 'Rekaman Tersedia'),
    ]
    # Pilihan BRAND
    BRAND_CHOICES = [
        ('aji-institute', 'Aji Institute — Layanan Langsung'),
        ('ajistat',       'AjiStat — Statistika & Riset'),
        ('ajibiz',        'AjiBiz — Bisnis & Kewirausahaan'),
        ('ajicomm',       'AjiComm — Public Relations & Komunikasi'),
        ('ajiai',         'AjiAI — Digital Marketing & AI'),
        ('ajilingua',     'AjiLingua — Bahasa & Komunikasi'),
    ]

    # Field-field Program
    title            = CharField(max_length=255)
    slug             = SlugField(unique=True, max_length=255)       # auto dari title
    type             = CharField(choices=TYPE_CHOICES)
    description      = TextField()
    price            = DecimalField(max_digits=12, decimal_places=0)
    original_price   = DecimalField(null=True, blank=True)          # harga coret
    status           = CharField(choices=STATUS_CHOICES, default='upcoming')
    tags             = JSONField(default=list)                       # list string
    curriculum       = JSONField(default=list)                       # list string materi
    rundown          = JSONField(default=list, blank=True)           # format: [{day, time, label, note}]
    facilitator_name = CharField(max_length=100, blank=True)
    facilitator_title= CharField(max_length=200, blank=True)
    facilitator_bio  = TextField(blank=True)
    facilitator_avatar = CharField(max_length=10, blank=True)       # inisial, misal: "AP"
    image            = ImageField(upload_to='programs/', null=True)
    demo_video_url   = CharField(max_length=500, blank=True)
    youtube_url      = URLField(blank=True, null=True)
    youtube_url_2    = URLField(blank=True, null=True)
    thumbnail_color  = CharField(max_length=7, default='#162660')   # hex
    brand            = CharField(choices=BRAND_CHOICES, default='ajistat')
    duration         = CharField(max_length=50, blank=True)         # misal: "3 Kali Pertemuan"
    schedule         = CharField(max_length=100, blank=True)        # misal: "Sabtu, 09.30 WIB"
    is_featured      = BooleanField(default=False)
    is_published     = BooleanField(default=True)                   # sembunyikan tanpa hapus
    order            = IntegerField(default=0)                      # urutan tampil
    show_documentation = BooleanField(default=False)                # tampilkan foto dokumentasi
    show_rundown     = BooleanField(default=False)                  # tampilkan tabel rundown
    created_at       = DateTimeField(auto_now_add=True)
```

> ⚠️ **TIDAK ADA** field: `registration_link`, `start_time`, `end_time`, `is_online`, `platform`, `benefits`.
> Jadwal & platform ditulis bebas di field `schedule` (CharField).
> Link pendaftaran tidak ada di model — gunakan CTA di popup atau field deskripsi.

### 3.2 `apps/cms/models.py` — Model Popup (Welcome Popup)

```python
class Popup(models.Model):
    title            = CharField(max_length=200)
    subtitle         = TextField(blank=True, null=True)
    image            = ImageField(upload_to='popup/')               # flyer JPG/PNG
    badge            = CharField(max_length=60, blank=True, null=True)
    badge_color      = CharField(max_length=7, default='#F0A500')   # hex, default emas
    highlights       = TextField(blank=True, null=True)             # satu poin per baris (newline)
    cta_text         = CharField(max_length=100, default='Hubungi Kami via WhatsApp')
    cta_url          = URLField()
    show_on_main_site = BooleanField(default=True)
    show_on_ajistat  = BooleanField(default=True)
    is_active        = BooleanField(default=False)                  # default NON-AKTIF
    order            = IntegerField(default=0)
    slide_duration   = IntegerField(default=5)                      # detik per slide
    created_at       = DateTimeField(auto_now_add=True)
    updated_at       = DateTimeField(auto_now=True)
```

> 💡 Field `highlights` diisi teks biasa, **satu poin per baris** (newline `\n`). Bukan JSON.  
> `badge_color` terbaik: `#F0A500` (emas) agar kontras dengan latar biru popup.

### 3.3 `apps/cms/models.py` — Model Lain

| Model | Keterangan |
|---|---|
| `CompanyConfig` | Info perusahaan: WA, email, alamat, jam operasional, template WA |
| `TeamMember` | Profil tim/divisi — tampil di halaman Tentang |
| `HeroBanner` | Slide banner di halaman utama |
| `Testimonial` (cms) | Testimoni untuk halaman utama |
| `ToolLogo` | Logo tools (SPSS, NVivo, dll) di halaman utama |

### 3.4 `apps/programs/models.py` — Model Lain

| Model | Keterangan |
|---|---|
| `Testimonial` (programs) | Testimoni terkait program tertentu (FK ke Program) |
| `ProgramDocumentation` | Foto-foto dokumentasi pelatihan (FK ke Program) |
| `BlogArticle` | Artikel blog — kategori: liputan-media, statistika, metodologi, dll |
| `Announcement` | Banner pengumuman di bagian atas website |
| `RisetProject` | Proyek riset/survei yang dikerjakan |

---

## 4. Backend — API Endpoints

Base URL production: `https://api.aji-institute.com/api`  
Base URL development: `http://localhost:8000/api`

| Endpoint | Method | Keterangan |
|---|---|---|
| `/programs/` | GET | List semua program (filter: `type`, `search`, `featured`) |
| `/programs/<slug>/` | GET | Detail program by slug |
| `/programs/slugs/` | GET | List slug semua program (untuk generateStaticParams) |
| `/programs/testimonials/all/` | GET | Semua testimonial |
| `/blog/` | GET | List artikel blog (filter: `category`) |
| `/announcements/` | GET | List pengumuman aktif |
| `/riset/` | GET | List proyek riset |
| `/cms/config/` | GET | Info perusahaan (CompanyConfig) |
| `/cms/teams/` | GET | Data tim |
| `/cms/banners/` | GET | Banner aktif |
| `/cms/testimonials/` | GET | Testimoni featured |
| `/cms/tools/` | GET | Logo tools |
| `/cms/popup_active/` | GET | **List popup aktif** (untuk WelcomePopup slider) |
| `/auth/login/` | POST | Login JWT |
| `/auth/register/` | POST | Register user |
| `/cart/` | GET/POST/DELETE | Keranjang belanja |
| `/checkout/` | POST | Checkout via Midtrans |
| `/orders/` | GET | Riwayat order |

---

## 5. Frontend — Komponen Kunci

### `WelcomePopup.tsx`
- Fetch dari `/api/cms/popup_active/`
- Menampilkan slider popup saat pengunjung pertama buka website
- Filter berdasarkan `show_on_main_site` (aji-institute.com) atau `show_on_ajistat` (ajistat)
- Disimpan di `localStorage` agar tidak muncul ulang dalam 1 hari

### `AnnouncementBar.tsx`
- Fetch dari `/api/announcements/`
- Banner notifikasi di bagian paling atas halaman

### Frontend Routes (`/src/app/`)
| Route | Keterangan |
|---|---|
| `/` | Halaman utama |
| `/program/[slug]/` | Detail program |
| `/bootcamp/` | Listing program tipe bootcamp |
| `/short-class/` | Listing short class |
| `/private-class/` | Listing private class |
| `/program-ajistat/` | Listing program brand ajistat |
| `/program-ajibiz/` | Listing program brand ajibiz |
| `/blog/` | Halaman blog |
| `/tentang/` | Halaman tentang |
| `/konsultasi/` | Halaman konsultasi |
| `/proyek-riset/` | Halaman proyek riset |

---

## 6. Tech Stack

| Layer | Teknologi |
|---|---|
| Backend | Django 5.x + Django REST Framework |
| Auth | JWT (djangorestframework-simplejwt) |
| Payment | Midtrans |
| Frontend | Next.js (App Router) + TypeScript |
| Styling | Vanilla CSS / Tailwind (cek per file) |
| HTTP Client | Axios |
| Deployment | cPanel (Shared Hosting) |
| Media Files | `backend/media/` → served via Django |

---

## 7. Deployment Workflow

> User (Faiz) melakukan `git commit` dan `git push` **secara manual**.  
> Agent **TIDAK** boleh menjalankan `git commit` atau `git push` tanpa konfirmasi eksplisit.

### Alur Deploy Backend
1. `git push` (dilakukan user manual)
2. cPanel Terminal: `git pull`
3. `python manage.py migrate` (jika ada migration baru)
4. Restart aplikasi di cPanel

### Alur Deploy Frontend
1. Build lokal: `npm run build`
2. Zip folder `out/` atau `.next/`
3. Upload ke cPanel via File Manager
4. Extract ke direktori yang sesuai

### Perintah Development
```bash
# Backend
cd backend
python manage.py runserver       # port 8000

# Frontend Utama
cd frontend
npm run dev                      # port 3000

# Frontend AjiStat
cd frontend-ajistat
npm run dev                      # port lain
```

---

## 8. Informasi Brand & Bisnis

### Brand Utama
**Aji Institute** — Lembaga pelatihan dan konsultasi riset, metodologi, dan manajemen terpadu.  
**Tagline:** "Solusi akademik yang praktis, rapi, dan profesional."  
**Alamat:** Kompleks Bandung Indah Raya Blok C7 No.1, Bandung  
**WA:** +62 823-1934-1735 (`6282319341735`)  
**Email:** info@aji-institute.id  
**Instagram:** @aji.institute

### Sub-Brand
| Brand | Fokus |
|---|---|
| AjiStat | Statistika & Riset (SPSS, SmartPLS, AMOS, NVivo, dll) |
| AjiBiz | Bisnis & Kewirausahaan |
| AjiComm | Public Relations & Komunikasi |
| AjiAI | Digital Marketing & AI |
| AjiLingua | Bahasa & Komunikasi |

### Layanan (Bukan Program, tapi Jasa)
Layanan jasa (formatting, analisis data, proofreading, dll) **tidak dibuat sebagai Program**.  
Promosi layanan jasa dilakukan via **WelcomePopup** saja.

---

## 9. Aturan Wajib untuk Agent

### ❌ JANGAN lakukan ini:
- Jangan tambah field baru ke model tanpa membuat migrasi Django
- Jangan jalankan `git commit` atau `git push` tanpa konfirmasi user
- Jangan buka/proses file `.zip` (ada banyak file zip di root — abaikan semua)
- Jangan buat `Program` baru untuk layanan jasa (formatting, analisis, dll) — gunakan Popup
- Jangan asumsikan field model — selalu cek `models.py` terlebih dahulu

### ✅ SELALU lakukan ini:
- Baca `models.py` relevan sebelum membuat panduan input data
- Baca `types.ts` sebelum mengubah interface TypeScript
- Cek `admin.py` untuk mengetahui field apa saja yang tersedia di form Django Admin
- Pastikan setiap model baru ada migration-nya sebelum deploy
- Konfirmasi ke user sebelum melakukan perubahan yang berdampak luas

### Urutan Cek File saat Task Baru:
1. `backend/apps/[app]/models.py` — struktur data
2. `backend/apps/[app]/admin.py` — field yang tampil di admin
3. `backend/apps/[app]/views.py` — logika API
4. `frontend/src/lib/types.ts` — TypeScript interface
5. `frontend/src/lib/api.ts` — cara frontend memanggil API

---

## 10. State Popup Saat Ini

| Order | Judul | Status |
|---|---|---|
| 1 | Layanan Akademik & Tesis | ✅ Aktif |
| 2 | Jasa Perapihan Daftar Isi | ✅ Aktif |
| 3 | AjiStat — Pengolahan & Analisa Data | ⏳ Menunggu diinput admin |
| 4 | Mini Bootcamp Kualitatif NVIVO | ⏳ Menunggu diinput admin |
| 5 | Mini Bootcamp MS Word Formatting | ⏳ Menunggu diinput admin |
| — | Bootcamp UNJANI | ❌ Nonaktif |
| — | Kelas Private Online | ❌ Nonaktif |

---

*Terakhir diperbarui: 2026-07-10*
