# programs/serializers.py
from rest_framework import serializers
from .models import Program
from universities.models import University

class ProgramSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    home_university = serializers.SerializerMethodField()
    faculty = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    testimonial = serializers.SerializerMethodField()
    
    university = serializers.StringRelatedField()
    university_id = serializers.PrimaryKeyRelatedField(
        queryset=University.objects.all(),
        source='university',
        write_only=True,
        required=False,
        allow_null=True
    )
    university_name = serializers.CharField(
        write_only=True,
        required=False,
        allow_null=True,
        allow_blank=True
    )
    
    # Додаємо такі самі поля для home_university
    home_university_id = serializers.PrimaryKeyRelatedField(
        queryset=University.objects.all(),
        source='home_university',
        write_only=True,
        required=False,
        allow_null=True
    )
    home_university_name = serializers.CharField(
        write_only=True,
        required=False,
        allow_null=True,
        allow_blank=True
    )
    
    useful_links = serializers.SerializerMethodField()
    
    class Meta:
        model = Program
        fields = [
            'id', 'name', 'university', 'university_id', 'university_name',
            'home_university', 'home_university_id', 'home_university_name',
            'program_type', 'study_level', 'faculty', 
            'description', 'useful_links', 'is_approved', 'created_at', 
            'submitted_by_email', 'submitted_by_name', 'testimonial',
            'useful_link_1', 'useful_link_1_title_uk', 'useful_link_1_title_en',
            'useful_link_2', 'useful_link_2_title_uk', 'useful_link_2_title_en',
            'useful_link_3', 'useful_link_3_title_uk', 'useful_link_3_title_en'
        ]
        read_only_fields = ['id', 'created_at', 'is_approved']

    def get_name(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('lang', 'uk') if request else 'uk'
        
        if language == 'en' and obj.name_en:
            return obj.name_en
        return obj.name_uk
    
    def get_home_university(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('lang', 'uk') if request else 'uk'
        
        if obj.home_university:
            if language == 'en' and obj.home_university.name_en:
                return obj.home_university.name_en
            return obj.home_university.name_uk
        return None
    
    def get_faculty(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('lang', 'uk') if request else 'uk'
        
        if language == 'en' and obj.faculty_en:
            return obj.faculty_en
        return obj.faculty_uk
    
    def get_description(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('lang', 'uk') if request else 'uk'
        
        if language == 'en' and obj.description_en:
            return obj.description_en
        return obj.description_uk
    
    def get_testimonial(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('lang', 'uk') if request else 'uk'
        
        if language == 'en' and obj.testimonial_en:
            return obj.testimonial_en
        return obj.testimonial_uk

    def get_useful_links(self, obj):
        """Повертає список корисних посилань для API"""
        request = self.context.get('request')
        language = request.query_params.get('lang', 'uk') if request else 'uk'
        return obj.get_useful_links(language)

    def validate(self, data):
        # Валідація для university
        if 'university' in data and isinstance(data['university'], str) and data['university'].startswith('new-'):
            data['university_name'] = data.pop('university')
            return data
            
        if 'university' not in data and 'university_name' not in data:
            raise serializers.ValidationError(
                "Either university_id or university_name must be provided"
            )
        
        # Валідація для home_university
        if 'home_university' in data and isinstance(data['home_university'], str) and data['home_university'].startswith('new-'):
            data['home_university_name'] = data.pop('home_university')
            
        return data

    def create(self, validated_data):
        university_name = validated_data.pop('university_name', None)
        home_university_name = validated_data.pop('home_university_name', None)
        
        # Створення нового університету прийому
        if university_name:
            university = University.objects.create(
                name_uk=university_name,
                name_en=university_name,
                is_approved=False,
                country='',
                website_url=''
            )
            validated_data['university'] = university
        
        # Створення нового університету відправлення
        if home_university_name:
            home_university = University.objects.create(
                name_uk=home_university_name,
                name_en=home_university_name,
                is_approved=False,
                country='',
                website_url=''
            )
            validated_data['home_university'] = home_university
        
        return super().create(validated_data)