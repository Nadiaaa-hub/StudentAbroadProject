# serializers.py
from rest_framework import serializers
from .models import University
from django.urls import reverse

class UniversitySerializer(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()
    
    class Meta:
        model = University
        fields = [
            'id',
            'name',
            'country',
            'description',
            'contact_email',
            'website_url',
            'logo_url',
            'is_approved',
            'created_at',
            'updated_at'
        ]
    
    def get_logo_url(self, obj):
        if obj.logo:
            return self.context['request'].build_absolute_uri(obj.logo.url)
        return None