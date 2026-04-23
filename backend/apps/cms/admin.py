from django.contrib import admin
from .models import CompanyConfig, TeamMember, HeroBanner, Testimonial, ToolLogo

@admin.register(CompanyConfig)
class CompanyConfigAdmin(admin.ModelAdmin):
    list_display = ['whatsapp', 'email', 'instagram']

    def has_add_permission(self, request):
        # Mencegah penambahan lebih dari 1 konfigurasi (Singleton)
        if self.model.objects.count() >= 1:
            return False
        return super().has_add_permission(request)

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'is_ceo', 'order']
    list_editable = ['order', 'is_ceo']
    list_filter = ['is_ceo']
    search_fields = ['name', 'role', 'tags']

@admin.register(HeroBanner)
class HeroBannerAdmin(admin.ModelAdmin):
    list_display = ['title', 'badge_text', 'is_active', 'order']
    list_editable = ['is_active', 'order']

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'rating', 'is_featured', 'order']
    list_editable = ['is_featured', 'order']
    list_filter = ['rating', 'is_featured']

@admin.register(ToolLogo)
class ToolLogoAdmin(admin.ModelAdmin):
    list_display = ['name', 'order']
    list_editable = ['order']

from .models import CmsBlogArticle, CmsAnnouncement

@admin.register(CmsBlogArticle)
class CmsBlogArticleAdmin(admin.ModelAdmin):
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

@admin.register(CmsAnnouncement)
class CmsAnnouncementAdmin(admin.ModelAdmin):
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
