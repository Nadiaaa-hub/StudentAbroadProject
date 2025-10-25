from django.db import models
from django.utils import timezone

class FAQCategory(models.Model):
    name_en = models.CharField(max_length=100)
    name_ua = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name_en

class FAQItem(models.Model):
    question_en = models.CharField(max_length=255)
    question_ua = models.CharField(max_length=255)
    answer_en = models.TextField()
    answer_ua = models.TextField()
    categories = models.ManyToManyField(FAQCategory)
    author = models.CharField(max_length=100)
    author_ua = models.CharField(max_length=100)
    editor = models.CharField(max_length=100)
    editor_ua = models.CharField(max_length=100)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.question_en