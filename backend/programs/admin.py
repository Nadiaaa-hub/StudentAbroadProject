# programs/admin.py
from django.contrib import admin
from .models import Program

class ProgramAdmin(admin.ModelAdmin):
    list_display = ('name_uk', 'name_en', 'university', 'home_university', 'faculty_uk', 'study_level', 'is_approved')
    list_filter = ('is_approved', 'program_type', 'study_level', 'faculty_uk')
    search_fields = ('name_uk', 'name_en', 'university__name_uk', 'university__name_en', 'home_university__name_uk', 'home_university__name_en')
    list_editable = ('is_approved',)
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Основна інформація (Українська)', {
            'fields': ('name_uk', 'university', 'home_university', 'faculty_uk', 'description_uk', 'testimonial_uk')
        }),
        ('Основна інформація (Англійська)', {
            'fields': ('name_en', 'faculty_en', 'description_en', 'testimonial_en')
        }),
        ('Деталі програми', {
            'fields': ('program_type', 'study_level')
        }),
        ('Корисні посилання (Українська)', {
            'fields': ('useful_link_1', 'useful_link_1_title_uk', 
                      'useful_link_2', 'useful_link_2_title_uk',
                      'useful_link_3', 'useful_link_3_title_uk'),
            'classes': ('collapse',)
        }),
        ('Корисні посилання (Англійська)', {
            'fields': ('useful_link_1_title_en', 'useful_link_2_title_en', 'useful_link_3_title_en'),
            'classes': ('collapse',)
        }),
        ('Інформація про подання', {
            'fields': ('submitted_by_name', 'submitted_by_email', 'is_approved')
        }),
        ('Часові мітки', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

admin.site.register(Program, ProgramAdmin)