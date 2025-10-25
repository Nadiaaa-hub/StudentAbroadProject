from django.db import models
from django_countries.fields import CountryField
from django.core.validators import FileExtensionValidator

class University(models.Model):
    name = models.CharField(max_length=200, verbose_name="Назва університету")
    country = CountryField(verbose_name="Країна")
    location = models.CharField(
        max_length=200,
        verbose_name="Місто/Адреса",
        blank=True,
        default=""
    )
    description = models.TextField(blank=True, verbose_name="Опис")
    contact_email = models.EmailField(blank=True, verbose_name="Контактний email")
    website_url = models.URLField(verbose_name="Вебсайт")
    additional_info = models.TextField(
        blank=True,
        verbose_name="Додаткова інформація (для Read More)"
    )
    
    logo = models.ImageField(
        upload_to='university_logos/',
        blank=True,
        null=True,
        verbose_name="Логотип",
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'svg'])]
    )
    
    background_image = models.ImageField(
        upload_to='university_backgrounds/',
        blank=True,
        null=True,
        verbose_name="Фонове зображення (для Read More)",
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])]
    )
    
    is_approved = models.BooleanField(default=True, verbose_name="Опубліковано")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Університет"
        verbose_name_plural = "Університети"
        ordering = ['name']