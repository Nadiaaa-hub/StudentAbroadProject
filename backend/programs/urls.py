# programs/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.ProgramList.as_view(), name='program-list'),
    path('<int:pk>/', views.ProgramDetail.as_view(), name='program-detail'),
    path('university/<int:university_id>/', views.UniversityPrograms.as_view(), name='university-programs'),
    path('home-university/', views.HomeUniversityPrograms.as_view(), name='home-university-programs'),
    path('options/', views.ProgramOptions.as_view(), name='program-options'),
    path('share/', views.share_program_page, name='share_program'),
]