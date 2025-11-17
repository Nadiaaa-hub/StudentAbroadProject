from django.contrib import admin
from .models import University
from django.utils.html import format_html

@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    list_display = ('name_uk', 'name_en', 'country', 'location_uk', 'is_approved', 'logo_preview')
    list_filter = ('country', 'is_approved')
    search_fields = ('name_uk', 'name_en', 'country', 'location_uk', 'location_en')
    list_editable = ('is_approved',)
    readonly_fields = ('logo_preview', 'background_image_preview')
    
    fieldsets = (
        ('Основна інформація (Українська)', {
            'fields': ('name_uk', 'country', 'location_uk', 'description_uk', 'is_approved')
        }),
        ('Основна інформація (Англійська)', {
            'fields': ('name_en', 'location_en', 'description_en')
        }),
        ('Контактна інформація', {
            'fields': ('contact_email', 'website_url')
        }),
        ('Додаткова інформація (Українська)', {
            'fields': ('additional_info_uk',)
        }),
        ('Додаткова інформація (Англійська)', {
            'fields': ('additional_info_en',)
        }),
        ('Зображення', {
            'fields': (
                'logo', 'logo_preview',
                'background_image', 'background_image_preview'
            )
        }),
    )

    def logo_preview(self, obj):
        if obj.logo:
            return format_html('<img src="{}" style="max-height: 100px;"/>', obj.logo.url)
        return "—"
    logo_preview.short_description = "Прев'ю логотипу"

    def background_image_preview(self, obj):
        if obj.background_image:
            return format_html('<img src="{}" style="max-height: 100px;"/>', obj.background_image.url)
        return "—"
    background_image_preview.short_description = "Прев'ю фону"