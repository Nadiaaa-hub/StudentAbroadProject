# programs/serializers.py
from rest_framework import serializers
from .models import Program
from universities.models import University

class ProgramSerializer(serializers.ModelSerializer):
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
    useful_links = serializers.SerializerMethodField()
    
    class Meta:
        model = Program
        fields = [
            'id', 'name', 'university', 'university_id', 'university_name',
            'home_university', 'program_type', 'study_level', 'faculty', 
            'description', 'useful_links', 'is_approved', 'created_at', 
            'submitted_by_email', 'submitted_by_name', 'testimonial',
            'useful_link_1', 'useful_link_1_title', 'useful_link_2', 
            'useful_link_2_title', 'useful_link_3', 'useful_link_3_title'
        ]
        read_only_fields = ['id', 'created_at', 'is_approved']

    def get_useful_links(self, obj):
        """Повертає список корисних посилань для API"""
        return obj.get_useful_links()

    def validate(self, data):
        if 'university' in data and isinstance(data['university'], str) and data['university'].startswith('new-'):
            data['university_name'] = data.pop('university')
            return data
            
        if 'university' not in data and 'university_name' not in data:
            raise serializers.ValidationError(
                "Either university_id or university_name must be provided"
            )
        return data

    def create(self, validated_data):
        university_name = validated_data.pop('university_name', None)
        
        if university_name:
            university = University.objects.create(
                name=university_name,
                is_approved=False,
                country='',
                website_url=''
            )
            validated_data['university'] = university
        
        return super().create(validated_data)