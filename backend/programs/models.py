# programs/models.py
from django.db import models
from universities.models import University

class Program(models.Model):
    STUDY_LEVEL_CHOICES = [
        ('bachelor', 'Bachelor'),
        ('master', 'Master'),
        ('phd', 'PhD'),
    ]
    
    PROGRAM_TYPE_CHOICES = [
        ('exchange', 'Exchange Program'),
        ('degree', 'Degree Program'),
        ('short_term', 'Short-term Program'),
    ]
    
    FACULTY_CHOICES = [
        ('arts', 'Arts and Humanities'),
        ('business', 'Business and Economics'),
        ('engineering', 'Engineering and Technology'),
        ('law', 'Law'),
        ('medicine', 'Medicine and Health'),
        ('science', 'Natural Sciences'),
        ('social', 'Social Sciences'),
        ('computer', 'Computer Science'),
        ('education', 'Education'),
        ('other', 'Other'),
    ]
    
    # Ukrainian fields
    name_uk = models.CharField(max_length=200, verbose_name="Назва програми (укр)")
    name_en = models.CharField(max_length=200, verbose_name="Program name (eng)", blank=True)
    
    university = models.ForeignKey(University, on_delete=models.CASCADE, related_name='host_programs', verbose_name="Університет прийому")
    
    # Home university - така сама логіка як у university
    home_university = models.ForeignKey(
        University, 
        on_delete=models.CASCADE, 
        related_name='home_programs',
        verbose_name="Університет відправлення",
        null=True,
        blank=True
    )
    
    program_type = models.CharField(max_length=20, choices=PROGRAM_TYPE_CHOICES, default='exchange')
    study_level = models.CharField(max_length=20, choices=STUDY_LEVEL_CHOICES)
    
    faculty_uk = models.CharField(max_length=100, verbose_name="Факультет (укр)")
    faculty_en = models.CharField(max_length=100, blank=True, verbose_name="Faculty (eng)")
    
    description_uk = models.TextField(blank=True, default='', verbose_name="Опис (укр)")
    description_en = models.TextField(blank=True, default='', verbose_name="Description (eng)")
    
    testimonial_uk = models.TextField(blank=True, default='', verbose_name="Відгук (укр)")
    testimonial_en = models.TextField(blank=True, default='', verbose_name="Testimonial (eng)")
    
    useful_link_1 = models.URLField(blank=True, null=True, verbose_name="Корисне посилання 1")
    useful_link_2 = models.URLField(blank=True, null=True, verbose_name="Корисне посилання 2")
    useful_link_3 = models.URLField(blank=True, null=True, verbose_name="Корисне посилання 3")
    useful_link_1_title_uk = models.CharField(max_length=100, blank=True, null=True, verbose_name="Назва посилання 1 (укр)")
    useful_link_2_title_uk = models.CharField(max_length=100, blank=True, null=True, verbose_name="Назва посилання 2 (укр)")
    useful_link_3_title_uk = models.CharField(max_length=100, blank=True, null=True, verbose_name="Назва посилання 3 (укр)")
    useful_link_1_title_en = models.CharField(max_length=100, blank=True, null=True, verbose_name="Назва посилання 1 (eng)")
    useful_link_2_title_en = models.CharField(max_length=100, blank=True, null=True, verbose_name="Назва посилання 2 (eng)")
    useful_link_3_title_en = models.CharField(max_length=100, blank=True, null=True, verbose_name="Назва посилання 3 (eng)")
    
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    submitted_by_name = models.CharField(max_length=100, blank=True, default='')
    submitted_by_email = models.EmailField(blank=True, default='')

    def __str__(self):
        return f"{self.name_uk} at {self.university.name_uk}"

    def get_useful_links(self, language='uk'):
        """Повертає список корисних посилань з назвами"""
        links = []
        
        if self.useful_link_1:
            title_field = f'useful_link_1_title_{language}'
            title = getattr(self, title_field, None) or (f'Корисне посилання 1' if language == 'uk' else 'Useful link 1')
            links.append({
                'url': self.useful_link_1,
                'title': title
            })
        
        if self.useful_link_2:
            title_field = f'useful_link_2_title_{language}'
            title = getattr(self, title_field, None) or (f'Корисне посилання 2' if language == 'uk' else 'Useful link 2')
            links.append({
                'url': self.useful_link_2,
                'title': title
            })
        
        if self.useful_link_3:
            title_field = f'useful_link_3_title_{language}'
            title = getattr(self, title_field, None) or (f'Корисне посилання 3' if language == 'uk' else 'Useful link 3')
            links.append({
                'url': self.useful_link_3,
                'title': title
            })
        
        return links

    class Meta:
        ordering = ['-created_at']