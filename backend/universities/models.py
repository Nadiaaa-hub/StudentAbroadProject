from django.db import models
from django_countries.fields import CountryField
from django.core.validators import FileExtensionValidator

class University(models.Model):
    # Ukrainian fields
    name_uk = models.CharField(max_length=200, verbose_name="Назва університету (укр)")
    name_en = models.CharField(max_length=200, verbose_name="University name (eng)", blank=True)
    
    country = CountryField(verbose_name="Країна")
    
    location_uk = models.CharField(
        max_length=200,
        verbose_name="Місто/Адреса (укр)",
        blank=True,
        default=""
    )
    location_en = models.CharField(
        max_length=200,
        verbose_name="Location/Address (eng)",
        blank=True,
        default=""
    )
    
    description_uk = models.TextField(blank=True, verbose_name="Опис (укр)")
    description_en = models.TextField(blank=True, verbose_name="Description (eng)")
    
    contact_email = models.EmailField(blank=True, verbose_name="Контактний email")
    website_url = models.URLField(verbose_name="Вебсайт")
    
    additional_info_uk = models.TextField(
        blank=True,
        verbose_name="Додаткова інформація (укр)"
    )
    additional_info_en = models.TextField(
        blank=True,
        verbose_name="Additional info (eng)"
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
        verbose_name="Фонове зображення",
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])]
    )
    
    is_approved = models.BooleanField(default=True, verbose_name="Опубліковано")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name_uk

    class Meta:
        verbose_name = "Університет"
        verbose_name_plural = "Університети"
        ordering = ['name_uk']