from django.contrib import admin
from .models import University

@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    list_display = ('name', 'country', 'website_url', 'is_approved')
    list_filter = ('country', 'is_approved')
    search_fields = ('name', 'country')
    list_editable = ('is_approved',)
    prepopulated_fields = {}