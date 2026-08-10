from django.contrib import admin
from django.utils.html import format_html
from .models import Program, Testimonial, BlogArticle, Announcement, ProgramDocumentation, RisetProject


class ProgramDocumentationInline(admin.TabularInline):
    """Inline untuk upload foto dokumentasi langsung dari halaman edit program."""
    model = ProgramDocumentation
    extra = 1
    fields = ('image', 'caption', 'order')
    ordering = ('order',)
    verbose_name = 'Foto Dokumentasi'
    verbose_name_plural = 'Foto-foto Dokumentasi Pelatihan'


@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    inlines = [ProgramDocumentationInline]

    # ── Kolom yang tampil di halaman daftar program ──────────────
    list_display = (
        'title', 'brand', 'type', 'status', 'price_display',
        'is_published', 'is_featured', 'is_video_hero', 'show_documentation', 'show_rundown', 'order', 'facilitator_name', 'created_at'
    )
    list_editable = ('is_published', 'is_featured', 'is_video_hero', 'show_documentation', 'show_rundown', 'order')
    list_filter = ('brand', 'type', 'status', 'is_published', 'is_featured', 'is_video_hero', 'show_documentation', 'show_rundown')
    search_fields = ('title', 'facilitator_name', 'tags', 'slug')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('created_at',)

    # ── Urutan kolom di form edit ────────────────────────────────
    fieldsets = (
        ('Informasi Utama', {
            'fields': ('title', 'slug', 'brand', 'type', 'status', 'is_published', 'is_featured', 'is_video_hero', 'order')
        }),
        ('Harga', {
            'fields': ('price', 'original_price')
        }),
        ('Detail Program', {
            'fields': ('description', 'duration', 'schedule', 'registration_link', 'tags', 'curriculum')
        }),
        ('Fasilitator', {
            'fields': ('facilitator_name', 'facilitator_title', 'facilitator_bio', 'facilitator_avatar')
        }),
        ('Media & Tampilan', {
            'fields': ('image', 'demo_video_url', 'youtube_url', 'youtube_url_2', 'thumbnail_color')
        }),
        ('Dokumentasi Pelatihan', {
            'fields': ('show_documentation',),
            'description': (
                'Aktifkan toggle di bawah, lalu upload foto-foto sesi pelatihan '
                'di bagian "Foto-foto Dokumentasi Pelatihan" yang ada di bawah halaman ini.'
            ),
        }),
        ('Rundown Harian', {
            'fields': ('show_rundown',),
            'description': 'Aktifkan untuk menampilkan tabel rundown jadwal harian di halaman program. Biarkan nonaktif jika rundown belum siap.',
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

    @admin.action(description='Jadikan Program Unggulan')
    def mark_featured(self, request, queryset):
        queryset.update(is_featured=True)

    @admin.action(description='Hapus dari Program Unggulan')
    def unmark_featured(self, request, queryset):
        queryset.update(is_featured=False)


@admin.register(RisetProject)
class RisetProjectAdmin(admin.ModelAdmin):
    list_display  = ('title', 'client', 'location', 'year', 'status', 'is_published', 'is_featured', 'order')
    list_editable = ('is_published', 'is_featured', 'order')
    list_filter   = ('status', 'is_published', 'is_featured')
    search_fields = ('title', 'client', 'location')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('created_at',)

    fieldsets = (
        ('Informasi Utama', {
            'fields': ('title', 'slug', 'client', 'location', 'year', 'status', 'is_published', 'is_featured', 'order')
        }),
        ('Konten', {
            'fields': ('description', 'scope', 'methodology')
        }),
        ('Media', {
            'fields': ('image',)
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
