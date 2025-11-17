from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic.base import TemplateView
from django.views.static import serve 
import os  
from django.conf.urls.i18n import i18n_patterns  # Додано для мов

# URL, які не потребують локалізації
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/programs/', include('programs.urls')),
    path('api/universities/', include('universities.urls')),
    path('faq_app/', include('faq_app.urls')),
]

# URL, які підтримують локалізацію (для фронтенду)
urlpatterns += i18n_patterns(
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
    path('index.html', TemplateView.as_view(template_name='index.html'), name='home-index'),
    path('confirmation.html', TemplateView.as_view(template_name='confirmation.html')),
    path('faq.html', TemplateView.as_view(template_name='faq.html')),
    path('program-list.html', TemplateView.as_view(template_name='program-list.html')),
    path('programs-read-more.html', TemplateView.as_view(template_name='programs-read-more.html')),
    path('share-my-program.html', TemplateView.as_view(template_name='share-my-program.html')),
    path('uni-list.html', TemplateView.as_view(template_name='uni-list.html')),
    path('uni-read-more.html', TemplateView.as_view(template_name='uni-read-more.html')),
    prefix_default_language=False,  # Дозволяє URLs без префіксу мови
)

# Додавання обробників для медіа та статичних файлів
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    # Обробка для js файлів
    urlpatterns += [
        path('js/<path:path>', serve, {
            'document_root': os.path.join(settings.BASE_DIR, '../frontend2/js')
        }),
    ]
    
    # Обробка для project файлів
    urlpatterns += [
        path('project/<path:path>', serve, {
            'document_root': os.path.join(settings.BASE_DIR, '../frontend2/project')
        }),
    ]
    
    # Стандартна обробка статики
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)