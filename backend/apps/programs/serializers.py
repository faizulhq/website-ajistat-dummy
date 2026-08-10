from rest_framework import serializers
from .models import Program, Testimonial, BlogArticle, Announcement, ProgramDocumentation, RisetProject


class ProgramDocumentationSerializer(serializers.ModelSerializer):
    """Serializer for documentation photos with absolute image URL."""
    image = serializers.SerializerMethodField()

    class Meta:
        model = ProgramDocumentation
        fields = ('id', 'image', 'caption', 'order')

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            url = obj.image.url
            return request.build_absolute_uri(url) if request else url
        return None


class ProgramListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for listing cards."""
    class Meta:
        model = Program
        fields = (
            'id', 'title', 'slug', 'type', 'status',
            'price', 'original_price', 'tags', 'brand',
            'duration', 'schedule', 'facilitator_name',
            'thumbnail_color', 'is_featured', 'is_video_hero', 'image',
            'youtube_url', 'youtube_url_2', 'demo_video_url',
        )


class ProgramDetailSerializer(serializers.ModelSerializer):
    """Full serializer for program detail page."""
    testimonials = serializers.SerializerMethodField()
    documentation_images = ProgramDocumentationSerializer(many=True, read_only=True)

    class Meta:
        model = Program
        fields = '__all__'

    def get_testimonials(self, obj):
        qs = obj.testimonials.all()[:3]
        return TestimonialSerializer(qs, many=True).data


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ('id', 'name', 'role', 'program_name', 'rating', 'comment', 'avatar')


class BlogArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model  = BlogArticle
        fields = (
            'id', 'title', 'slug', 'excerpt', 'category',
            'tag', 'date', 'image_url', 'color',
            'source_name', 'is_external', 'external_url',
        )


class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Announcement
        fields = (
            'id', 'title', 'message', 'type',
            'cta_label', 'cta_url',
        )


class RisetProjectSerializer(serializers.ModelSerializer):
    """Serializer for research project portfolio."""
    image = serializers.SerializerMethodField()

    class Meta:
        model  = RisetProject
        fields = '__all__'

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            url = obj.image.url
            return request.build_absolute_uri(url) if request else url
        return None
