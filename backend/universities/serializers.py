from rest_framework import serializers
from .models import University

class UniversitySerializer(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()
    background_image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = University
        fields = [
            'id', 'name', 'country', 'location',
            'description', 'contact_email', 'website_url',
            'additional_info', 'logo_url', 'background_image_url',
            'is_approved', 'created_at', 'updated_at'
        ]
    
    def get_logo_url(self, obj):
        request = self.context.get('request')
        if obj.logo and request:
            return request.build_absolute_uri(obj.logo.url)
        return None
    
    def get_background_image_url(self, obj):
        request = self.context.get('request')
        if obj.background_image and request:
            return request.build_absolute_uri(obj.background_image.url)
        return None