# backend/config/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic.base import TemplateView
from django.views.static import serve 
from django.conf.urls.i18n import i18n_patterns
import os


# Імпортуємо views
from universities.views import university_page_view, university_list_page
from programs.views import program_list_page, program_detail_page, share_program_page
from faq.views import faq_page_view  

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/programs/', include('programs.urls')),
    path('api/universities/', include('universities.urls')),
    path('faq/', include('faq.urls')),
]

urlpatterns += i18n_patterns(
    # --- ВИПРАВЛЕННЯ ТУТ ---
    # Змінили name='home' на name='index', щоб збігалося з шаблоном {% url 'index' %}
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
    path('index.html', TemplateView.as_view(template_name='index.html'), name='home-index'),
    
    # Додали name='confirmation', щоб працював редірект після форми
    path('confirmation.html', TemplateView.as_view(template_name='confirmation.html'), name='confirmation'),
    
    # Додали name='faq'
    path('faq.html', faq_page_view, name='faq'),
    # -----------------------

    path('program-list.html', program_list_page, name='program-list'),
    path('uni-list.html', university_list_page, name='uni-list'),
    
    path('uni-read-more.html', university_page_view, name='uni-read-more'),
    path('programs-read-more.html', program_detail_page, name='programs-read-more'),

    path('share-my-program.html', share_program_page, name='share-program-page'),
    path('search.html', TemplateView.as_view(template_name='search.html')),
    prefix_default_language=False,
)

if settings.DEBUG:
    urlpatterns += [
        path('project/<path:path>', serve, {'document_root': os.path.join(settings.BASE_DIR, 'static/project')}),
        path('js/<path:path>', serve, {'document_root': os.path.join(settings.BASE_DIR, 'static/js')}),
        path('fonts/<path:path>', serve, {'document_root': os.path.join(settings.BASE_DIR, 'static/fonts')}),
    ]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)