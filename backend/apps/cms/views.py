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
                'whatsapp': '6285195564668',
                'whatsapp_display': '+62 851-9556-4668',
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
