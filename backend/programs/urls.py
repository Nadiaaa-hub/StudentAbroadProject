from django.urls import path
from . import views  # Додайте цей імпорт

urlpatterns = [
    path('', views.ProgramList.as_view(), name='program-list'),
    path('<int:pk>/', views.ProgramDetail.as_view(), name='program-detail'),
]