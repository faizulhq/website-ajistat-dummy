from django.db import models

class CompanyConfig(models.Model):
    whatsapp = models.CharField(max_length=20, default='6285195564668', help_text="Format: 628xxx (tanpa + atau 0)")
    whatsapp_display = models.CharField(max_length=50, default='+62 851-9556-4668')
    email = models.EmailField(default='info@aji-institute.id')
    instagram = models.CharField(max_length=50, default='@ajiinstitute.id')
    address = models.TextField(default='Kompleks Bandung Indah Raya Blok C7 No.1, Kel. Mekarjaya, Kec. Rancasari, Bandung')
    operational_hours = models.CharField(max_length=100, default='24 Jam / 7 Hari')
    whatsapp_template = models.TextField(
        blank=True,
        null=True,
        help_text="Gunakan {divisi} untuk nama divisi otomatis. Kosongkan untuk format default.",
        default="Halo Tim *{divisi}*,\n\nSaya tertarik untuk mendapatkan informasi lebih lanjut terkait layanan yang tersedia.\n\nBerikut data saya:\nNama:\nJurusan/Fakultas/Universitas:\nLembaga/Instansi:\nKebutuhan (konsultasi/bootcamp/kelas private/dll):\n\nMohon informasinya. Terima kasih."
    )
    footer_description = models.TextField(
        default="Aji Institute adalah lembaga pelatihan dan konsultasi riset, metodologi, dan manajemen terpadu yang membantu individu dan korporasi.",
        help_text="Teks singkat perkenalan di bagian footer web."
    )
    social_tiktok = models.CharField(max_length=100, blank=True, null=True, help_text="Link akun TikTok (misal: https://tiktok.com/@ajiinstitute)")
    social_linkedin = models.CharField(max_length=100, blank=True, null=True, help_text="Link akun LinkedIn (opsional)")
    
    
    class Meta:
        verbose_name = 'Company Setting'
        verbose_name_plural = 'Company Settings'
        
    def __str__(self):
        return "Pengaturan Perusahaan (Edit Ini)"

class TeamMember(models.Model):
    name = models.CharField(max_length=100, help_text="Nama divisi atau individu (misal: Aji Pamoso atau Tim Fasilitator AjiStat)")
    role = models.CharField(max_length=100, help_text="Jabatan atau fungsi (misal: CEO Aji Institute)")
    initials = models.CharField(max_length=5, help_text="Inisial jika tidak ada foto (misal: AP atau ST)")
    accent_color = models.CharField(max_length=20, default='#1B3A8C', help_text="Warna utama (Hex, misal: #1B3A8C)")
    accent_light = models.CharField(max_length=20, default='#EEF2FF', help_text="Warna latar/muda (Hex, misal: #EEF2FF)")
    description = models.TextField(help_text="Deskripsi singkat untuk di kartu")
    detail = models.TextField(help_text="Deskripsi panjang untuk di pop-up modal")
    tags = models.CharField(max_length=255, help_text="Pisahkan dengan koma (misal: SPSS, SmartPLS, AMOS)")
    image = models.ImageField(upload_to='teams/', null=True, blank=True, help_text="Foto/Logo tim (Optional)")
    is_ceo = models.BooleanField(default=False, help_text="Centang jika ini adalah profil CEO (akan tampil di section besar atas)")
    order = models.IntegerField(default=0, help_text="Urutan tampil (makin kecil makin atas)")

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'Team & Division'
        verbose_name_plural = 'Teams & Divisions'
        
    def __str__(self):
        return self.name

class HeroBanner(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.TextField()
    badge_text = models.CharField(max_length=50, default='Info Terbaru')
    image = models.ImageField(upload_to='banners/', help_text="Gambar latar banner")
    cta_text = models.CharField(max_length=50, default='Lihat Program →')
    cta_link = models.CharField(max_length=200, default='/')
    cta_external = models.BooleanField(default=False)
    cta2_text = models.CharField(max_length=50, default='Hubungi Kami')
    cta2_link = models.CharField(max_length=200, default='/')
    overlay_gradient = models.CharField(max_length=100, default='from-[#162058]/90 via-[#1B3A8C]/75 to-transparent')
    chips = models.CharField(max_length=200, help_text="Koma terpisah, misal: SPSS,SmartPLS", blank=True)
    stats = models.CharField(max_length=200, help_text="Format: Nilai|Label, misal: 10+|Tools, 5|Format", blank=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order', '-id']
        
    def __str__(self):
        return self.title

class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100, help_text="Misal: Mahasiswa S2 UGM")
    content = models.TextField()
    rating = models.IntegerField(default=5)
    image = models.ImageField(upload_to='testimonials/', null=True, blank=True)
    is_featured = models.BooleanField(default=True, help_text="Tampilkan di halaman utama")
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order', '-id']
        
    def __str__(self):
        return f"{self.name} - {self.role}"

class ToolLogo(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    use_for = models.TextField(help_text="Kegunaan (misal: Uji asumsi, regresi, dll)")
    color = models.CharField(max_length=20, default='#1B3A8C')
    image = models.ImageField(upload_to='tools/')
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order', 'id']
        
    def __str__(self):
        return self.name

# ==========================================
# Proxy Models untuk merapikan Admin Panel
# ==========================================
from apps.programs.models import BlogArticle as OriginalBlogArticle
from apps.programs.models import Announcement as OriginalAnnouncement

class CmsBlogArticle(OriginalBlogArticle):
    class Meta:
        proxy = True
        verbose_name = 'Artikel Blog'
        verbose_name_plural = 'Artikel Blog'

class CmsAnnouncement(OriginalAnnouncement):
    class Meta:
        proxy = True
        verbose_name = 'Pengumuman / Banner'
        verbose_name_plural = 'Pengumuman / Banner'
