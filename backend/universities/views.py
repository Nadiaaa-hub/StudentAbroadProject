from rest_framework import generics
from .models import University
from .serializers import UniversitySerializer
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
        
        # Пошук
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | 
                Q(description__icontains=search) |
                Q(location__icontains=search))
        
        return queryset.order_by('name')

class UniversityDetailView(generics.RetrieveAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer
    permission_classes = [AllowAny]

class UniversityCreateView(generics.CreateAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
