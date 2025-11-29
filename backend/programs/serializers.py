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
    
    # ВИПРАВЛЕННЯ: Видаляємо university_id та home_university_id, бо вони конфліктують
    university_name = serializers.CharField(
        write_only=True,
        required=False,
        allow_null=True,
        allow_blank=True
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
            'id', 'name', 'university', 'university_name',
            'home_university', 'home_university_name',
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
        university_id = self.context['request'].data.get('university_id')
        university_name = data.get('university_name')
        
        if not university_id and not university_name:
            raise serializers.ValidationError({
                "university": "Either university_id or university_name must be provided"
            })
        
        # Валідація для home_university
        home_university_id = self.context['request'].data.get('home_university_id')
        home_university_name = data.get('home_university_name')
        
        # home_university не обов'язкове поле
        if not home_university_id and not home_university_name and home_university_name != '':
            # Якщо передано порожній рядок, це нормально
            pass
            
        return data

    def create(self, validated_data):
        university_name = validated_data.pop('university_name', None)
        home_university_name = validated_data.pop('home_university_name', None)
        
        # Отримуємо ID з контексту запиту
        university_id = self.context['request'].data.get('university_id')
        home_university_id = self.context['request'].data.get('home_university_id')
        
        # Обробка university
        if university_id and not university_id.startswith('new-'):
            # Існуючий університет
            validated_data['university_id'] = int(university_id)
        elif university_name:
            # Новий університет
            clean_university_name = university_name.replace('new-', '')
            university = University.objects.create(
                name_uk=clean_university_name,
                name_en=clean_university_name,
                is_approved=False,
                country='UA',
                website_url=''
            )
            validated_data['university'] = university
        
        # Обробка home_university
        if home_university_id and not home_university_id.startswith('new-'):
            # Існуючий університет
            validated_data['home_university_id'] = int(home_university_id)
        elif home_university_name:
            # Новий університет
            clean_home_university_name = home_university_name.replace('new-', '')
            home_university = University.objects.create(
                name_uk=clean_home_university_name,
                name_en=clean_home_university_name,
                is_approved=False,
                country='UA',
                website_url=''
            )
            validated_data['home_university'] = home_university
        
        # Встановлюємо is_approved=False для нових програм
        validated_data['is_approved'] = False
        
        return super().create(validated_data)