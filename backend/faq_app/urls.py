from django.urls import path
from . import views

app_name = 'faq_app'

urlpatterns = [
    path('api/faq/', views.faq_list, name='faq_list'),
]

"""
API Documentation:
GET /faq_app/api/faq/ - Get all FAQ items
Parameters:
- lang: Language code (en, ua, uk) - default: en
Example:
/faq_app/api/faq/?lang=ua - Get FAQ in Ukrainian
/faq_app/api/faq/?lang=en - Get FAQ in English
"""