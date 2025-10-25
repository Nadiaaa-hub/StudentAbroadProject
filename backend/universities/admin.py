from django.contrib import admin
from .models import University
from django.utils.html import format_html

@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    list_display = ('name', 'country', 'location', 'is_approved', 'logo_preview')
    list_filter = ('country', 'is_approved')
    search_fields = ('name', 'country', 'location')
    list_editable = ('is_approved',)
    readonly_fields = ('logo_preview', 'background_image_preview')
    
    fieldsets = (
        ('Основна інформація', {
            'fields': ('name', 'country', 'location', 'is_approved')
        }),
        ('Контактна інформація', {
            'fields': ('contact_email', 'website_url')
        }),
        ('Опис', {
            'fields': ('description', 'additional_info')
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