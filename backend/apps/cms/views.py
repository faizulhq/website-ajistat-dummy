from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import CompanyConfig, TeamMember, HeroBanner, Testimonial, ToolLogo
from .serializers import (
    CompanyConfigSerializer, TeamMemberSerializer, 
    HeroBannerSerializer, TestimonialSerializer, ToolLogoSerializer
)

class CMSViewSet(viewsets.ViewSet):
    """
    Satu ViewSet untuk mengambil seluruh data CMS (Read-Only)
    """
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['get'])
    def config(self, request):
        config = CompanyConfig.objects.first()
        if not config:
            # Fallback default jika belum ada di database
            return Response({
                'whatsapp': '6282319341735',
                'whatsapp_display': '+62 823-1934-1735',
                'email': 'info@aji-institute.id',
                'instagram': '@ajiinstitute.id',
                'address': 'Kompleks Bandung Indah Raya Blok C7 No.1, Kel. Mekarjaya, Kec. Rancasari, Bandung',
                'operational_hours': '24 Jam / 7 Hari',
                'whatsapp_template': 'Halo Tim *{divisi}*,\n\nSaya tertarik untuk mendapatkan informasi lebih lanjut terkait layanan yang tersedia.\n\nBerikut data saya:\nNama:\nJurusan/Fakultas/Universitas:\nLembaga/Instansi:\nKebutuhan (konsultasi/bootcamp/kelas private/dll):\n\nMohon informasinya. Terima kasih.',
            })
        serializer = CompanyConfigSerializer(config, context={'request': request})
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def teams(self, request):
        teams = TeamMember.objects.all()
        serializer = TeamMemberSerializer(teams, many=True, context={'request': request})
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def banners(self, request):
        banners = HeroBanner.objects.filter(is_active=True)
        serializer = HeroBannerSerializer(banners, many=True, context={'request': request})
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def testimonials(self, request):
        testimonials = Testimonial.objects.filter(is_featured=True)
        serializer = TestimonialSerializer(testimonials, many=True, context={'request': request})
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def tools(self, request):
        tools = ToolLogo.objects.all()
        serializer = ToolLogoSerializer(tools, many=True, context={'request': request})
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def popup_active(self, request):
        """Mengembalikan list semua popup aktif (untuk slider), diurutkan by order."""
        from .models import Popup
        popups = Popup.objects.filter(is_active=True)
        if not popups.exists():
            return Response([], status=200)  # empty list
        data = []
        for popup in popups:
            data.append({
                'id': popup.pk,
                'title': popup.title,
                'subtitle': popup.subtitle or '',
                'image': request.build_absolute_uri(popup.image.url) if popup.image else '',
                'badge': popup.badge or '',
                'badge_color': popup.badge_color,
                'highlights': popup.get_highlights_list(),
                'cta_text': popup.cta_text,
                'cta_url': popup.cta_url,
                'show_on_main_site': popup.show_on_main_site,
                'show_on_ajistat': popup.show_on_ajistat,
                'order': popup.order,
                'slide_duration': popup.slide_duration,
            })
        return Response(data)
