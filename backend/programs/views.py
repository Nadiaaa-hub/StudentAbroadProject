from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from .models import Program
from .serializers import ProgramSerializer
from universities.models import University
import json

# ... (API Views залишаються без змін) ...
class ProgramList(generics.ListCreateAPIView):
    serializer_class = ProgramSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        queryset = Program.objects.filter(is_approved=True) if self.request.method == 'GET' else Program.objects.all()
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(name_uk__icontains=search) | Q(name_en__icontains=search) |
                Q(description_uk__icontains=search) | Q(description_en__icontains=search) |
                Q(faculty_uk__icontains=search) | Q(faculty_en__icontains=search)
            )
        return queryset
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
            Q(home_university__name_uk__icontains=home_university) |
            Q(home_university__name_en__icontains=home_university),
            is_approved=True
        )

class ProgramOptions(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        options = {
            'study_levels': dict(Program.STUDY_LEVEL_CHOICES),
            'program_types': dict(Program.PROGRAM_TYPE_CHOICES)
        }
        return Response(options)

# --- VIEWS ДЛЯ САЙТУ ---

def program_list_page(request):
    programs = Program.objects.filter(is_approved=True).order_by('-created_at')
    home_universities = University.objects.filter(home_programs__is_approved=True).distinct().order_by('name_uk')
    context = {'programs': programs, 'home_universities': home_universities}
    return render(request, 'program-list.html', context)

def program_detail_page(request):
    program_id = request.GET.get('id')
    context = {}
    if program_id:
        program = get_object_or_404(Program, pk=program_id)
        context = {'program': program, 'useful_links': program.get_useful_links_combined()}
    return render(request, 'programs-read-more.html', context)

def share_program_page(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            program = Program()
            program.name_uk = data.get('program_name', 'No Name')
            
            # --- 1. Inviting University ---
            inviting_id = data.get('inviting_uni_id')
            inviting_text = data.get('inviting_uni_text', '').strip()
            inviting_details = data.get('inviting_uni_details', '').strip()
            
            if inviting_id == 'any':
                program.university = None
                program.university_details = "ОБРАНО: Будь-який університет / Any University.\n" + inviting_details
            elif inviting_id:
                try:
                    program.university = University.objects.get(id=inviting_id)
                    program.university_details = inviting_details
                except University.DoesNotExist:
                    pass
            else:
                info_parts = []
                if inviting_text:
                    info_parts.append(f"НОВА НАЗВА: {inviting_text}")
                if inviting_details:
                    info_parts.append(f"ДЕТАЛІ: {inviting_details}")
                program.university_details = "\n\n".join(info_parts)

            # --- 2. Home University ---
            home_id = data.get('home_uni_id')
            home_text = data.get('home_uni_text', '').strip()
            home_details = data.get('home_uni_details', '').strip()
            
            if home_id == 'any':
                program.home_university = None
                program.home_university_details = "ОБРАНО: Будь-який університет / Any University.\n" + home_details
            elif home_id:
                try:
                    program.home_university = University.objects.get(id=home_id)
                    program.home_university_details = home_details
                except University.DoesNotExist:
                    pass
            else:
                info_parts = []
                if home_text:
                    info_parts.append(f"НОВА НАЗВА: {home_text}")
                if home_details:
                    info_parts.append(f"ДЕТАЛІ: {home_details}")
                program.home_university_details = "\n\n".join(info_parts)

            # --- Інші поля ---
            program.faculty_uk = data.get('faculty', 'Other')
            
            # Мапінг рівня навчання
            study_level_map = {
                'Bachelor': 'Bachelor',
                'Бакалавр': 'Bachelor',
                'Master': 'Master',
                'Магістр': 'Master',
                'PhD': 'PhD',
                'PhD / Аспірантура': 'PhD',
                'Other': 'Other',
                'Інше': 'Other'
            }
            raw_level = data.get('level', 'Other')
            program.study_level = study_level_map.get(raw_level, 'Other')
            
            program.description_uk = data.get('feedback', '')
            program.submitted_by_name = data.get('user_name', '')

            # --- FIX: Збереження деталей факультету та рівня ---
            # Оскільки в моделі немає полів faculty_details/level_details, 
            # зберігаємо їх у технічне поле user_university_text для адміна.
            
            admin_notes = []
            faculty_details = data.get('faculty_details', '').strip()
            level_details = data.get('level_details', '').strip()

            if faculty_details:
                admin_notes.append(f"Faculty details: {faculty_details}")
            if level_details:
                admin_notes.append(f"Level details: {level_details}")
            
            # Зберігаємо нотатки, обрізаючи до 255 символів (ліміт поля)
            if admin_notes:
                program.user_university_text = " | ".join(admin_notes)[:255]
            
            program.save()
            return JsonResponse({'status': 'success', 'message': 'Program added successfully'})
            
        except Exception as e:
            print(f"Error adding program: {e}")
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    universities = University.objects.filter(is_approved=True).order_by('name_uk')
    context = {'universities': universities}
    return render(request, 'share-my-program.html', context)