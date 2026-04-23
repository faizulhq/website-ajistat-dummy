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


