from django.contrib import admin
from django.utils.html import format_html
from .models import Program, Testimonial, BlogArticle, Announcement


@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    # ── Kolom yang tampil di halaman daftar program ──────────────
    list_display = (
        'title', 'type', 'status', 'price_display',
        'is_featured', 'facilitator_name', 'created_at'
    )
    list_filter = ('type', 'status', 'is_featured')
    search_fields = ('title', 'facilitator_name', 'tags', 'slug')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('created_at',)

    # ── Urutan kolom di form edit ────────────────────────────────
    fieldsets = (
        ('Informasi Utama', {
            'fields': ('title', 'slug', 'type', 'status', 'is_featured')
        }),
        ('Harga', {
            'fields': ('price', 'original_price')
        }),
        ('Detail Program', {
            'fields': ('description', 'duration', 'schedule', 'tags', 'curriculum')
        }),
        ('Fasilitator', {
            'fields': ('facilitator_name', 'facilitator_title', 'facilitator_bio', 'facilitator_avatar')
        }),
        ('Media & Tampilan', {
            'fields': ('demo_video_url', 'thumbnail_color')
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )

    # ── Aksi batch: bisa pilih banyak program lalu ubah status ──
    actions = ['mark_upcoming', 'mark_ongoing', 'mark_recorded', 'mark_featured', 'unmark_featured']

    @admin.display(description='Harga')
    def price_display(self, obj):
        price = f"Rp {obj.price:,.0f}".replace(',', '.')
        if obj.original_price:
            original = f"Rp {obj.original_price:,.0f}".replace(',', '.')
            discount = round((1 - obj.price / obj.original_price) * 100)
            return format_html(
                '<span style="color:#16a34a;font-weight:bold">{}</span> '
                '<span style="text-decoration:line-through;color:#9ca3af;font-size:11px">{}</span> '
                '<span style="background:#dcfce7;color:#15803d;border-radius:4px;padding:1px 5px;font-size:10px">-{}%</span>',
                price, original, discount
            )
        return format_html('<span style="font-weight:bold">{}</span>', price)

    @admin.action(description='Tandai: Akan Dilaksanakan')
    def mark_upcoming(self, request, queryset):
        queryset.update(status='upcoming')

    @admin.action(description='Tandai: Sedang Berlangsung')
    def mark_ongoing(self, request, queryset):
        queryset.update(status='ongoing')

    @admin.action(description='Tandai: Rekaman Tersedia')
    def mark_recorded(self, request, queryset):
        queryset.update(status='recorded')

    @admin.action(description='Jadikan Program Unggulan ⭐')
    def mark_featured(self, request, queryset):
        queryset.update(is_featured=True)

    @admin.action(description='Hapus dari Program Unggulan')
    def unmark_featured(self, request, queryset):
        queryset.update(is_featured=False)


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'rating_display', 'program_name')
    list_filter = ('rating',)
    search_fields = ('name', 'role', 'comment')

    @admin.display(description='Rating')
    def rating_display(self, obj):
        stars = '⭐' * obj.rating
        return format_html('<span title="{}/5">{}</span>', obj.rating, stars)


@admin.register(BlogArticle)
class BlogArticleAdmin(admin.ModelAdmin):
    list_display  = ('title', 'category', 'date', 'source_name', 'is_published', 'is_external')
    list_filter   = ('category', 'is_published', 'is_external')
    search_fields = ('title', 'excerpt', 'tag', 'source_name')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('created_at',)
    list_editable   = ('is_published',)

    fieldsets = (
        ('Konten Artikel', {
            'fields': ('title', 'slug', 'excerpt', 'category', 'tag', 'date')
        }),
        ('Gambar', {
            'fields': ('image_url', 'color'),
            'description': 'Path lokal: /images/nama.jpg — atau URL eksternal penuh'
        }),
        ('Sumber & Link', {
            'fields': ('source_name', 'is_external', 'external_url')
        }),
        ('Pengaturan', {
            'fields': ('is_published', 'created_at')
        }),
    )


@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display  = ('title', 'type', 'is_active', 'start_date', 'end_date', 'created_at')
    list_filter   = ('type', 'is_active')
    search_fields = ('title', 'message')
    list_editable = ('is_active',)
    readonly_fields = ('created_at',)

    fieldsets = (
        ('Pesan Banner', {
            'fields': ('title', 'message', 'type')
        }),
        ('Tombol (opsional)', {
            'fields': ('cta_label', 'cta_url'),
            'classes': ('collapse',)
        }),
        ('Pengaturan Waktu', {
            'fields': ('is_active', 'start_date', 'end_date')
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
