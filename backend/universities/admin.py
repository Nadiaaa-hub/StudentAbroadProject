from django.contrib import admin
from django.utils.html import format_html
from unfold.admin import ModelAdmin
from unfold.decorators import display
from .models import University


@admin.register(University)
class UniversityAdmin(ModelAdmin):
    """
    Unfold-based admin for University model.
    Preserves all existing functionality with modern UI.
    """
    list_display = (
        'name_uk', 
        'name_en', 
        'country', 
        'location_uk', 
        'is_approved',
        'display_approved_badge',
        'logo_preview'
    )
    list_filter = ('country', 'is_approved')
    search_fields = ('name_uk', 'name_en', 'country', 'location_uk', 'location_en')
    list_editable = ('is_approved',)
    readonly_fields = ('logo_preview', 'background_image_preview', 'created_at', 'updated_at')
    
    # Performance optimization for large datasets
    list_select_related = True
    
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
        ('Метадані', {
            'fields': ('slug', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    @display(
        description="Статус",
        label={
            True: "success",
            False: "warning",
        }
    )
    def display_approved_badge(self, obj):
        return obj.is_approved, "Опубліковано" if obj.is_approved else "Чернетка"

    def logo_preview(self, obj):
        if obj.logo:
            return format_html('<img src="{}" style="max-height: 60px; border-radius: 4px;"/>', obj.logo.url)
        return "—"
    logo_preview.short_description = "Прев'ю логотипу"

    def background_image_preview(self, obj):
        if obj.background_image:
            return format_html('<img src="{}" style="max-height: 60px; border-radius: 4px;"/>', obj.background_image.url)
        return "—"
    background_image_preview.short_description = "Прев'ю фону"