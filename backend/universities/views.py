# views.py
from rest_framework import generics
from .models import University
from .serializers import UniversitySerializer
from django.core.exceptions import ValidationError

class UniversityListView(generics.ListAPIView):
    serializer_class = UniversitySerializer
    queryset = University.objects.filter(is_approved=True)

    def get_queryset(self):
        queryset = super().get_queryset()
        # Фільтрація по країні
        country = self.request.query_params.get('country', None)
        if country:
            queryset = queryset.filter(country=country)
        
        # Пошук по назві або опису
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                models.Q(name__icontains=search) | 
                models.Q(description__icontains=search)
            )
        
        return queryset.order_by('name')