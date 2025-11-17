from rest_framework import serializers
from .models import University

class UniversitySerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    additional_info = serializers.SerializerMethodField()
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
    
    def get_name(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('lang', 'uk') if request else 'uk'
        
        if language == 'en' and obj.name_en:
            return obj.name_en
        return obj.name_uk
    
    def get_location(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('lang', 'uk') if request else 'uk'
        
        if language == 'en' and obj.location_en:
            return obj.location_en
        return obj.location_uk
    
    def get_description(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('lang', 'uk') if request else 'uk'
        
        if language == 'en' and obj.description_en:
            return obj.description_en
        return obj.description_uk
    
    def get_additional_info(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('lang', 'uk') if request else 'uk'
        
        if language == 'en' and obj.additional_info_en:
            return obj.additional_info_en
        return obj.additional_info_uk
    
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