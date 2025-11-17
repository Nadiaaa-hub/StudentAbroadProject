from django.contrib import admin
from .models import FAQCategory, FAQItem

class FAQCategoryAdmin(admin.ModelAdmin):
    list_display = ('name_en', 'name_ua', 'display_faq_count')
    search_fields = ('name_en', 'name_ua')
    
    def display_faq_count(self, obj):
        return obj.faqitem_set.count()
    display_faq_count.short_description = 'Кількість FAQ'

class FAQItemAdmin(admin.ModelAdmin):
    list_display = ('question_en', 'question_ua', 'is_published', 'display_categories', 'created_at', 'updated_at')
    list_filter = ('categories', 'created_at', 'is_published')  # Додано фільтр по публікації
    search_fields = ('question_en', 'question_ua', 'answer_en', 'answer_ua', 'author', 'author_ua')
    list_editable = ('is_published',)  # Дозволяє редагувати публікацію прямо зі списку
    filter_horizontal = ('categories',)
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('English Content', {
            'fields': ('question_en', 'answer_en', 'author', 'editor')
        }),
        ('Ukrainian Content', {
            'fields': ('question_ua', 'answer_ua', 'author_ua', 'editor_ua')
        }),
        ('Categories and Metadata', {
            'fields': ('categories', 'is_published', 'created_at', 'updated_at')  # Додано is_published
        }),
    )
    
    def display_categories(self, obj):
        return ", ".join([category.name_en for category in obj.categories.all()])
    display_categories.short_description = 'Categories'
    
    # Додаємо дії для масового публікування/приховування
    actions = ['publish_selected', 'unpublish_selected']
    
    def publish_selected(self, request, queryset):
        queryset.update(is_published=True)
    publish_selected.short_description = "Опублікувати вибрані FAQ"
    
    def unpublish_selected(self, request, queryset):
        queryset.update(is_published=False)
    unpublish_selected.short_description = "Приховати вибрані FAQ"

admin.site.register(FAQCategory, FAQCategoryAdmin)
admin.site.register(FAQItem, FAQItemAdmin)