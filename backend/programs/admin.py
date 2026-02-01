from django.contrib import admin
from django import forms
from .models import Program

class ProgramAdmin(admin.ModelAdmin):
    list_display = (
        'name_uk', 
        'university', 
        'home_university', 
        'faculty_uk', 
        'is_approved',
        'created_at'
    )
    
    list_filter = ('is_approved', 'program_type', 'study_level', 'faculty_uk')
    
    search_fields = (
        'name_uk', 
        'name_en', 
        'university__name_uk', 
        'home_university__name_uk',
        'university_details',
        'home_university_details',
        'user_university_text'
    )
    
    list_editable = ('is_approved',)
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Основна інформація', {
            'fields': ('name_uk', 'name_en', 'is_approved')
        }),
        
        ('Університет Прийому', {
            'fields': (
                'university',          
                'university_details'   
            ),
            'description': "Якщо поле 'Університет' пусте або обрано невірне, перевірте 'Інформація про університет'."
        }),
        
        ('Домашній Університет', {
            'fields': (
                'home_university',
                'home_university_details'
            )
        }),

        ('Факультет та Рівень', {
            # user_university_text тепер буде виглядати як велике поле
            'fields': ('faculty_uk', 'faculty_en', 'study_level', 'program_type', 'user_university_text')
        }),
        
        ('Опис та Відгук', {
            'fields': ('description_uk', 'description_en', 'testimonial_uk', 'testimonial_en')
        }),
        
        ('Корисні посилання', {
            'fields': (
                'useful_link_1', 'useful_link_1_title_uk', 'useful_link_1_title_en',
                'useful_link_2', 'useful_link_2_title_uk', 'useful_link_2_title_en',
                'useful_link_3', 'useful_link_3_title_uk', 'useful_link_3_title_en'
            ),
            'classes': ('collapse',)
        }),
        
        ('Інформація про заявника', {
            'fields': ('submitted_by_name', 'submitted_by_email', 'created_at', 'updated_at')
        }),
    )

    # Цей метод робить поле user_university_text великим (Textarea)
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        # Встановлюємо ширину (cols) та висоту (rows) для зручності
        form.base_fields['user_university_text'].widget = forms.Textarea(attrs={'rows': 4, 'cols': 100})
        # Робимо підказку більш помітною
        form.base_fields['user_university_text'].help_text = "Технічне поле: тут зберігаються додаткові деталі про ступінь (level) від користувача."
        return form

admin.site.register(Program, ProgramAdmin)