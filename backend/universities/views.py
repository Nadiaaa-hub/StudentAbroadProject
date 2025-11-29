from rest_framework import generics
from .models import University
from .serializers import UniversitySerializer, UniversityOptionsSerializer
from rest_framework.permissions import AllowAny
from django.db.models import Q

class UniversityListView(generics.ListAPIView):
    serializer_class = UniversitySerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        queryset = University.objects.filter(is_approved=True)
        
        # Фільтрація по країні
        country = self.request.query_params.get('country')
        if country:
            queryset = queryset.filter(country=country)
        
        # Пошук (по обох мовах)
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(name_uk__icontains=search) | 
                Q(name_en__icontains=search) |
                Q(description_uk__icontains=search) |
                Q(description_en__icontains=search) |
                Q(location_uk__icontains=search) |
                Q(location_en__icontains=search))
        
        return queryset.order_by('name_uk')

class UniversityDetailView(generics.RetrieveAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer
    permission_classes = [AllowAny]

class UniversityCreateView(generics.CreateAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer
    permission_classes = [AllowAny]

# ДОДАЙТЕ ЦЕЙ НОВИЙ VIEW
class UniversityOptionsView(generics.ListAPIView):
    """View для отримання університетів для вибору в формі"""
    serializer_class = UniversityOptionsSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return University.objects.filter(is_approved=True).order_by('name_uk')