from rest_framework import serializers
from .models import Program, Testimonial, BlogArticle, Announcement


class ProgramListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for listing cards."""
    class Meta:
        model = Program
        fields = (
            'id', 'title', 'slug', 'type', 'status',
            'price', 'original_price', 'tags',
            'duration', 'schedule', 'facilitator_name',
            'thumbnail_color', 'is_featured',
        )


class ProgramDetailSerializer(serializers.ModelSerializer):
    """Full serializer for program detail page."""
    testimonials = serializers.SerializerMethodField()

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
