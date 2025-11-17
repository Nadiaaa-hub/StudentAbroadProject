# programs/views.py
from rest_framework import generics
from .models import Program
from .serializers import ProgramSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q

class ProgramList(generics.ListCreateAPIView):
    serializer_class = ProgramSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        queryset = Program.objects.filter(is_approved=True) if self.request.method == 'GET' else Program.objects.all()
        
        # Пошук по обох мовах
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(name_uk__icontains=search) | 
                Q(name_en__icontains=search) |
                Q(description_uk__icontains=search) |
                Q(description_en__icontains=search) |
                Q(faculty_uk__icontains=search) |
                Q(faculty_en__icontains=search) |
                Q(home_university_uk__icontains=search) |
                Q(home_university_en__icontains=search)
            )
        
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(is_approved=False)

# Решта класів залишаються незмінними
class ProgramDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    permission_classes = [AllowAny]

class UniversityPrograms(generics.ListAPIView):
    serializer_class = ProgramSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        university_id = self.kwargs['university_id']
        return Program.objects.filter(university_id=university_id, is_approved=True)

class HomeUniversityPrograms(generics.ListAPIView):
    serializer_class = ProgramSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        home_university = self.request.query_params.get('home_university', '')
        return Program.objects.filter(
            Q(home_university__name_uk__icontains=home_university) |
            Q(home_university__name_en__icontains=home_university),
            is_approved=True
        )

class ProgramOptions(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        options = {
            'study_levels': dict(Program.STUDY_LEVEL_CHOICES),
            'faculties': dict(Program.FACULTY_CHOICES),
            'program_types': dict(Program.PROGRAM_TYPE_CHOICES)
        }
        return Response(options)