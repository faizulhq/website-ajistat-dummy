from django.db import models
import json


class Program(models.Model):
    TYPE_CHOICES = [
        ('bootcamp', 'Bootcamp'),
        ('short-class', 'Short Class'),
        ('private-class', 'Private Class'),
    ]
    STATUS_CHOICES = [
        ('upcoming', 'Akan Dilaksanakan'),
        ('ongoing', 'Sedang Berlangsung'),
        ('recorded', 'Rekaman Tersedia'),
    ]
    BRAND_CHOICES = [
        ('aji-institute', 'Aji Institute — Layanan Langsung'),
        ('ajistat',  'AjiStat — Statistika & Riset'),
        ('ajibiz',   'AjiBiz — Bisnis & Kewirausahaan'),
        ('ajicomm',  'AjiComm — Public Relations & Komunikasi'),
        ('ajiai',    'AjiAI — Digital Marketing & AI'),
        ('ajilingua','AjiLingua — Bahasa & Komunikasi'),
    ]

    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    description = models.TextField()
    price = models.DecimalField(max_digits=12, decimal_places=0)
    original_price = models.DecimalField(max_digits=12, decimal_places=0, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming')

    # JSON fields stored as text
    tags = models.JSONField(default=list)
    curriculum = models.JSONField(default=list)
    rundown = models.JSONField(default=list, blank=True, help_text="Format: [{\"day\": \"Hari 1\", \"time\": \"08.00 - 12.00\", \"label\": \"Sesi Pagi\", \"note\": \"Materi\"}]")

    # Facilitator
    facilitator_name = models.CharField(max_length=100, blank=True)
    facilitator_title = models.CharField(max_length=200, blank=True)
    facilitator_bio = models.TextField(blank=True)
    facilitator_avatar = models.CharField(max_length=10, blank=True)  # initials

    # Media
    image = models.ImageField(upload_to='programs/', null=True, blank=True, help_text="Gambar/Flyer Program (Opsional)")
    demo_video_url = models.CharField(max_length=500, blank=True)  # local path or YouTube URL
    thumbnail_color = models.CharField(max_length=7, default='#162660')  # hex color for placeholder

    # Brand / Sub-program
    brand = models.CharField(max_length=20, choices=BRAND_CHOICES, default='ajistat',
                             verbose_name='Brand / Sub-program',
                             help_text='Kategori brand program ini (AjiStat, AjiBiz, dll)')

    # Meta
    duration = models.CharField(max_length=50, blank=True)
    schedule = models.CharField(max_length=100, blank=True)
    registration_link = models.URLField(
        blank=True,
        null=True,
        verbose_name='Link Pendaftaran (Opsional)',
        help_text='Isi dengan link eksternal (misal Google Form). Jika kosong, otomatis diarahkan ke WhatsApp.'
    )
    is_featured = models.BooleanField(default=False)
    is_video_hero = models.BooleanField(
        default=False,
        verbose_name='⭐ Jadikan Hero di Halaman Video?',
        help_text='Centang untuk menampilkan video program ini sebagai video utama (autoplay) di halaman Video. Pastikan hanya 1 program yang dicentang.'
    )
    is_published = models.BooleanField(
        default=True,
        verbose_name='Tampilkan di Website?',
        help_text='Uncheck untuk menyembunyikan program dari website tanpa menghapus datanya'
    )
    order = models.IntegerField(default=0, help_text="Urutan tampil (angka terkecil tampil duluan)")
    show_documentation = models.BooleanField(
        default=False,
        verbose_name='Tampilkan Dokumentasi Pelatihan?',
        help_text='Aktifkan untuk menampilkan section foto dokumentasi di halaman program'
    )
    show_rundown = models.BooleanField(
        default=False,
        verbose_name='Tampilkan Rundown Harian?',
        help_text='Aktifkan untuk menampilkan tabel rundown jadwal harian di halaman program'
    )
    youtube_url = models.URLField(
        blank=True,
        null=True,
        verbose_name='Link Video YouTube ke-1',
        help_text='URL video YouTube pertama (contoh: https://youtu.be/xxxxx)'
    )
    youtube_url_2 = models.URLField(
        blank=True,
        null=True,
        verbose_name='Link Video YouTube ke-2',
        help_text='URL video YouTube kedua/tambahan (opsional)'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-is_featured', '-created_at']

    def __str__(self):
        return f"[{self.type.upper()}] {self.title}"


class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=150)
    program = models.ForeignKey(Program, null=True, blank=True, on_delete=models.SET_NULL, related_name='testimonials')
    program_name = models.CharField(max_length=200, blank=True)  # fallback if no FK
    rating = models.PositiveSmallIntegerField(default=5)
    comment = models.TextField()
    avatar = models.CharField(max_length=10, blank=True)

    def save(self, *args, **kwargs):
        if not self.avatar and self.name:
            parts = self.name.strip().split()
            self.avatar = (parts[0][0] + (parts[1][0] if len(parts) > 1 else '')).upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} — ⭐{self.rating}"


class ProgramDocumentation(models.Model):
    """Foto-foto dokumentasi pelatihan untuk ditampilkan di halaman program."""
    program = models.ForeignKey(
        Program, on_delete=models.CASCADE,
        related_name='documentation_images',
        verbose_name='Program'
    )
    image = models.ImageField(
        upload_to='documentation/',
        verbose_name='Foto Dokumentasi'
    )
    caption = models.CharField(
        max_length=200, blank=True,
        verbose_name='Keterangan Foto',
        help_text='Opsional — keterangan singkat foto (contoh: Sesi coding NVivo hari ke-2)'
    )
    order = models.PositiveIntegerField(
        default=0,
        verbose_name='Urutan',
        help_text='Angka terkecil tampil duluan'
    )

    class Meta:
        ordering = ['order']
        verbose_name = 'Foto Dokumentasi'
        verbose_name_plural = 'Foto Dokumentasi'

    def __str__(self):
        return f"Foto {self.order} — {self.program.title}"


class BlogArticle(models.Model):
    """Artikel blog yang dikelola via Django Admin."""

    CATEGORY_CHOICES = [
        ('liputan-media',  'Liputan Media'),
        ('statistika',     'Statistika'),
        ('metodologi',     'Metodologi'),
        ('kualitatif',     'Kualitatif'),
        ('akademik',       'Akademik'),
        ('tools-software', 'Tools & Software'),
    ]

    title        = models.CharField(max_length=300, verbose_name='Judul Artikel')
    slug         = models.SlugField(unique=True, max_length=300,
                     help_text='Otomatis dari judul. Contoh: liputan-pikiran-rakyat-2025')
    excerpt      = models.TextField(verbose_name='Ringkasan',
                     help_text='Deskripsi singkat artikel (1-2 kalimat)')
    category     = models.CharField(max_length=50, choices=CATEGORY_CHOICES,
                     verbose_name='Kategori')
    tag          = models.CharField(max_length=100, blank=True,
                     help_text='Label tag kecil di kartu. Contoh: Jurnalistik')
    date         = models.DateField(verbose_name='Tanggal Artikel')
    image_url    = models.CharField(max_length=300, blank=True,
                     verbose_name='Path / URL Gambar',
                     help_text='Path lokal: /images/nama-file.jpg  atau URL eksternal')
    color        = models.CharField(max_length=7, default='#1B3A8C',
                     help_text='Warna aksen kategori (hex). Contoh: #E11D48')
    source_name  = models.CharField(max_length=100, blank=True,
                     verbose_name='Nama Sumber / Media',
                     help_text='Misal: Pikiran Rakyat, Kompas, atau kosongkan')
    is_external  = models.BooleanField(default=False,
                     verbose_name='Link Eksternal?',
                     help_text='Centang jika artikel ada di website lain')
    external_url = models.URLField(blank=True,
                     verbose_name='URL Artikel Eksternal',
                     help_text='Isi jika "Link Eksternal" dicentang')
    is_published = models.BooleanField(default=True,
                     verbose_name='Tampilkan di Website?')
    created_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering     = ['-date', '-created_at']
        verbose_name = 'Artikel Blog'
        verbose_name_plural = 'Artikel Blog'

    def __str__(self):
        return self.title


class Announcement(models.Model):
    """Banner pengumuman di bagian atas website."""

    TYPE_CHOICES = [
        ('info',    'Info (Biru)'),
        ('promo',   'Promo (Hijau)'),
        ('warning', 'Penting (Kuning)'),
    ]

    title      = models.CharField(max_length=200, verbose_name='Judul Singkat')
    message    = models.TextField(verbose_name='Pesan',
                   help_text='Teks yang tampil di banner. Bisa menyertakan link.')
    type       = models.CharField(max_length=20, choices=TYPE_CHOICES,
                   default='info', verbose_name='Jenis / Warna')
    cta_label  = models.CharField(max_length=80, blank=True,
                   verbose_name='Label Tombol (opsional)',
                   help_text='Misal: Daftar Sekarang')
    cta_url    = models.URLField(blank=True,
                   verbose_name='URL Tombol (opsional)')
    is_active  = models.BooleanField(default=True,
                   verbose_name='Aktif?',
                   help_text='Hanya pengumuman aktif yang tampil di website')
    start_date = models.DateField(null=True, blank=True,
                   verbose_name='Mulai Tampil',
                   help_text='Kosongkan = langsung aktif')
    end_date   = models.DateField(null=True, blank=True,
                   verbose_name='Berakhir',
                   help_text='Kosongkan = tidak ada batas waktu')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering     = ['-created_at']
        verbose_name = 'Pengumuman / Banner'
        verbose_name_plural = 'Pengumuman / Banner'

    def __str__(self):
        status = 'AKTIF' if self.is_active else 'nonaktif'
        return f"[{status}] {self.title}"


class RisetProject(models.Model):
    STATUS_CHOICES = [
        ('ongoing',   'Sedang Berlangsung'),
        ('completed', 'Selesai'),
    ]

    title       = models.CharField(max_length=255, verbose_name='Judul Proyek')
    slug        = models.SlugField(unique=True, max_length=255)
    client      = models.CharField(max_length=255, blank=True, verbose_name='Klien / Instansi')
    description = models.TextField(verbose_name='Deskripsi Proyek')
    scope       = models.JSONField(
        default=list, blank=True,
        verbose_name='Bidang Riset',
        help_text='Contoh: ["Sosial Budaya", "Ekonomi", "Hankam"]'
    )
    methodology = models.JSONField(
        default=list, blank=True,
        verbose_name='Metodologi',
        help_text='Contoh: ["Survei", "Wawancara Mendalam", "FGD"]'
    )
    location    = models.CharField(max_length=255, blank=True, verbose_name='Lokasi')
    year        = models.IntegerField(null=True, blank=True, verbose_name='Tahun Pelaksanaan')
    status      = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='ongoing',
        verbose_name='Status Proyek'
    )
    image       = models.ImageField(
        upload_to='riset/', null=True, blank=True,
        verbose_name='Cover Image Proyek'
    )
    is_featured  = models.BooleanField(default=False, verbose_name='Tampilkan sebagai Unggulan?')
    is_published = models.BooleanField(default=False, verbose_name='Publikasikan?')
    order        = models.IntegerField(default=0, verbose_name='Urutan Tampil')
    created_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering     = ['order', '-created_at']
        verbose_name = 'Proyek Riset'
        verbose_name_plural = 'Proyek Riset'

    def __str__(self):
        return f"[{self.get_status_display()}] {self.title}"
