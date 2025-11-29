from django.urls import path
from .views import UniversityListView, UniversityDetailView, UniversityCreateView, UniversityOptionsView

urlpatterns = [
    path('', UniversityListView.as_view(), name='university-list'),
    path('<int:pk>/', UniversityDetailView.as_view(), name='university-detail'),
    path('create/', UniversityCreateView.as_view(), name='university-create'),
    path('options/', UniversityOptionsView.as_view(), name='university-options'),  # ДОДАЙТЕ ЦЕЙ URL
]