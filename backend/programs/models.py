from django.db import models
from django_countries.fields import CountryField
from universities.models import University

class Program(models.Model):
    PROGRAM_TYPES = [
        ('exchange', 'Exchange Program'),
        ('degree', 'Degree Program'),
        ('short_term', 'Short-term Program'),
    ]
    
    name = models.CharField(max_length=200)
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    country = CountryField()
    program_type = models.CharField(max_length=20, choices=PROGRAM_TYPES)
    description = models.TextField()
    requirements = models.TextField()
    application_deadline = models.DateField()
    duration = models.CharField(max_length=100)
    language = models.CharField(max_length=100)
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    submitted_by_email = models.EmailField(blank=True)
    submitted_by_name = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.name} at {self.university.name}"