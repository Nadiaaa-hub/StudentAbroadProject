from rest_framework import generics, status
from rest_framework.response import Response
from .models import Program
from .serializers import ProgramSerializer
from universities.models import University

class ProgramList(generics.ListCreateAPIView):
    serializer_class = ProgramSerializer

    def get_queryset(self):
        queryset = Program.objects.filter(is_approved=True)
        university_id = self.request.query_params.get('university')
        if university_id:
            queryset = queryset.filter(university_id=university_id)
        return queryset

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(is_approved=False)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProgramDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer

class UniversityPrograms(generics.ListAPIView):
    serializer_class = ProgramSerializer

    def get_queryset(self):
        university_id = self.kwargs['university_id']
        return Program.objects.filter(university_id=university_id, is_approved=True)