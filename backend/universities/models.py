# models.py (оновлена версія)
from django.db import models
from django_countries.fields import CountryField
from django.core.validators import FileExtensionValidator

class University(models.Model):
    name = models.CharField(max_length=200, verbose_name="Назва університету")
    country = CountryField(verbose_name="Країна")
    description = models.TextField(blank=True, verbose_name="Опис")
    contact_email = models.EmailField(blank=True, verbose_name="Контактний email")
    website_url = models.URLField(verbose_name="Вебсайт")
    logo = models.ImageField(
        upload_to='university_logos/',
        blank=True,
        null=True,
        verbose_name="Логотип",
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'svg'])]
    )
    is_approved = models.BooleanField(default=True, verbose_name="Опубліковано")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.logo:
            
            pass
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Університет"
        verbose_name_plural = "Університети"
        ordering = ['name']