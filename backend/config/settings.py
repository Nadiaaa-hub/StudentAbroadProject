import os
from pathlib import Path
from dotenv import load_dotenv

# Завантажуємо змінні з файлу .env
load_dotenv()

# Будуємо шляхи всередині проекту: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# БЕЗПЕКА
SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-change-me-please')
DEBUG = os.getenv('DEBUG', 'True') == 'True'

ALLOWED_HOSTS = ['*']

# ДОДАТКИ
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Сторонні бібліотеки
    'rest_framework',
    'corsheaders',
    'django_filters',
    'django_countries',
    
    # Твої додатки (Apps)
    'universities.apps.UniversitiesConfig',
    'programs.apps.ProgramsConfig',
    'faq.apps.FaqConfig',  # Окремий додаток FAQ
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    
    'corsheaders.middleware.CorsMiddleware', # CORS має бути високо
    'django.middleware.locale.LocaleMiddleware', # Мови
    
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Вказуємо, що головний файл URL лежить у папці config
ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'], # <-- Вказуємо папку templates у корені backend
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.i18n',
            ],
        },
    },
]

# Вказуємо, що WSGI лежить у папці config
WSGI_APPLICATION = 'config.wsgi.application'

# БАЗА ДАНИХ (PostgreSQL)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DATABASE_NAME', 'studentabroad_db'),
        'USER': os.getenv('DATABASE_USER', 'postgres'),
        'PASSWORD': os.getenv('DATABASE_PASSWORD', 'maksimdata1234'),
        'HOST': os.getenv('DATABASE_HOST', 'localhost'),
        'PORT': os.getenv('DATABASE_PORT', '5432'),
    }
}

# ВАЛІДАЦІЯ ПАРОЛІВ
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# МОВНІ НАЛАШТУВАННЯ
LANGUAGE_CODE = 'uk'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

from django.utils.translation import gettext_lazy as _
LANGUAGES = [
    ('uk', _('Ukrainian')),
    ('en', _('English')),
]

LOCALE_PATHS = [
    BASE_DIR / 'locale',
]

# СТАТИКА І МЕДІА
STATIC_URL = '/static/'
# Ми беремо статику з папки static у корені backend
STATICFILES_DIRS = [
    BASE_DIR / "static",
]
STATIC_ROOT = BASE_DIR / 'staticfiles' # Для collectstatic

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# НАЛАШТУВАННЯ ID (Потрібно для деяких моделей)
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS
CORS_ALLOW_ALL_ORIGINS = True # Для розробки дозволяємо все
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5500",
]

# REST FRAMEWORK
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        # 'rest_framework.renderers.BrowsableAPIRenderer', # Розкоментуй для зручності в браузері
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.MultiPartParser'
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.QueryParameterVersioning',
}