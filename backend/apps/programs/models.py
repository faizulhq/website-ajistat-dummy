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

    # Facilitator
    facilitator_name = models.CharField(max_length=100, blank=True)
    facilitator_title = models.CharField(max_length=200, blank=True)
    facilitator_bio = models.TextField(blank=True)
    facilitator_avatar = models.CharField(max_length=10, blank=True)  # initials

    # Media
    demo_video_url = models.URLField(blank=True)  # YouTube embed URL
    thumbnail_color = models.CharField(max_length=7, default='#162660')  # hex color for placeholder

    # Meta
    duration = models.CharField(max_length=50, blank=True)
    schedule = models.CharField(max_length=100, blank=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-is_featured', '-created_at']

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
