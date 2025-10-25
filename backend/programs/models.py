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
    
    name = models.CharField(max_length=200)
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    home_university = models.CharField(max_length=200, blank=True, default='')
    program_type = models.CharField(max_length=20, choices=PROGRAM_TYPE_CHOICES, default='exchange')
    study_level = models.CharField(max_length=20, choices=STUDY_LEVEL_CHOICES)
    faculty = models.CharField(max_length=100)
    description = models.TextField(blank=True, default='')
    testimonial = models.TextField(blank=True, default='')
    useful_link_1 = models.URLField(blank=True, null=True, verbose_name="Корисне посилання 1")
    useful_link_2 = models.URLField(blank=True, null=True, verbose_name="Корисне посилання 2")
    useful_link_3 = models.URLField(blank=True, null=True, verbose_name="Корисне посилання 3")
    useful_link_1_title = models.CharField(max_length=100, blank=True, null=True, verbose_name="Назва посилання 1")
    useful_link_2_title = models.CharField(max_length=100, blank=True, null=True, verbose_name="Назва посилання 2")
    useful_link_3_title = models.CharField(max_length=100, blank=True, null=True, verbose_name="Назва посилання 3")
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    submitted_by_name = models.CharField(max_length=100, blank=True, default='')
    submitted_by_email = models.EmailField(blank=True, default='')

    def __str__(self):
        return f"{self.name} at {self.university.name}"

    def get_useful_links(self):
        """Повертає список корисних посилань з назвами"""
        links = []
        if self.useful_link_1:
            links.append({
                'url': self.useful_link_1,
                'title': self.useful_link_1_title or 'Корисне посилання 1'
            })
        if self.useful_link_2:
            links.append({
                'url': self.useful_link_2,
                'title': self.useful_link_2_title or 'Корисне посилання 2'
            })
        if self.useful_link_3:
            links.append({
                'url': self.useful_link_3,
                'title': self.useful_link_3_title or 'Корисне посилання 3'
            })
        return links

    class Meta:
        ordering = ['-created_at']