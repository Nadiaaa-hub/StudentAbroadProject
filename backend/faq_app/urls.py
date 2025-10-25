from django.urls import path
from . import views

app_name = 'faq_app'

urlpatterns = [
    path('api/faq/', views.faq_list, name='faq_list'),
]