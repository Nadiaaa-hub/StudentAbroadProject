# programs/views.py
from rest_framework import generics
from .models import Program
from .serializers import ProgramSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

class ProgramList(generics.ListCreateAPIView):
    serializer_class = ProgramSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        if self.request.method == 'GET':
            return Program.objects.filter(is_approved=True)
        return Program.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(is_approved=False)

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
            home_university__icontains=home_university,
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