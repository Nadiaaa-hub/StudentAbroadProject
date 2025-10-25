from django.contrib import admin
from .models import FAQCategory, FAQItem

class FAQCategoryAdmin(admin.ModelAdmin):
    list_display = ('name_en', 'name_ua')
    search_fields = ('name_en', 'name_ua')

class FAQItemAdmin(admin.ModelAdmin):
    list_display = ('question_en', 'created_at', 'updated_at')
    list_filter = ('categories', 'created_at')
    search_fields = ('question_en', 'question_ua', 'answer_en', 'answer_ua')
    filter_horizontal = ('categories',)

admin.site.register(FAQCategory, FAQCategoryAdmin)
admin.site.register(FAQItem, FAQItemAdmin)