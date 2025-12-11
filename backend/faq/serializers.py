# backend/faq/serializers.py

from rest_framework import serializers
from .models import FAQItem, FAQCategory

class FAQCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQCategory
        fields = ['id', 'name_en', 'name_ua']

class FAQSerializer(serializers.ModelSerializer):
    categories = FAQCategorySerializer(many=True, read_only=True)

    class Meta:
        model = FAQItem
        fields = '__all__'