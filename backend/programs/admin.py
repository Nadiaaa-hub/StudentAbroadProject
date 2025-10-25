# programs/admin.py
from django.contrib import admin
from .models import Program

class ProgramAdmin(admin.ModelAdmin):
    list_display = ('name', 'university', 'faculty', 'study_level', 'is_approved')
    list_filter = ('is_approved', 'program_type', 'study_level', 'faculty')
    search_fields = ('name', 'university__name', 'home_university')
    list_editable = ('is_approved',)
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'university', 'home_university')
        }),
        ('Program Details', {
            'fields': ('program_type', 'study_level', 'faculty', 'description')
        }),
        ('Testimonial', {
            'fields': ('testimonial',)
        }),
        ('Useful Links 1', {
            'fields': ('useful_link_1_title', 'useful_link_1'),
            'classes': ('collapse',)
        }),
        ('Useful Links 2', {
            'fields': ('useful_link_2_title', 'useful_link_2'),
            'classes': ('collapse',)
        }),
        ('Useful Links 3', {
            'fields': ('useful_link_3_title', 'useful_link_3'),
            'classes': ('collapse',)
        }),
        ('Submission Info', {
            'fields': ('submitted_by_name', 'submitted_by_email', 'is_approved')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

admin.site.register(Program, ProgramAdmin)