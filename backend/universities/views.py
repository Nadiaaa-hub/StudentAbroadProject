# backend/universities/views.py

from rest_framework import generics
from rest_framework.permissions import AllowAny
from django.db.models import Q
from .models import University
from .serializers import UniversitySerializer, UniversityOptionsSerializer
from django_countries import countries as all_countries

# --- ДОДАЙТЕ ЦІ ІМПОРТИ ---
from django.shortcuts import render, get_object_or_404
from programs.models import Program  # Імпорт моделі Program для пошуку зв'язків
# --------------------------

class UniversityListView(generics.ListAPIView):
    serializer_class = UniversitySerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        queryset = University.objects.filter(is_approved=True)
        country = self.request.query_params.get('country')
        if country:
            queryset = queryset.filter(country=country)
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

class UniversityOptionsView(generics.ListAPIView):
    serializer_class = UniversityOptionsSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return University.objects.filter(is_approved=True).order_by('name_uk')

def university_page_view(request):
    """
    View для відображення HTML сторінки університету.
    Працює з URL типу: /uni-read-more.html?id=2
    """
    uni_id = request.GET.get('id')
    context = {}
    
    if uni_id:
        university = get_object_or_404(University, pk=uni_id)
        
        # ВИПРАВЛЕНО: Шукаємо програми, де цей університет є приймаючим (university)
        # АБО домашнім (home_university).
        programs = Program.objects.filter(
            Q(university=university) | Q(home_university=university),
            is_approved=True
        ).distinct().order_by('-created_at')
        
        context = {
            'university': university,
            'programs': programs
        }
    
    return render(request, 'uni-read-more.html', context)

def university_list_page(request):
    """
    View для відображення сторінки списку університетів.
    """
    # Отримуємо всі затверджені університети
    universities = University.objects.filter(is_approved=True).order_by('name_uk')
    
    # --- ВИПРАВЛЕННЯ ---
    # Замість .distinct() використовуємо set(), це гарантовано прибере дублікати,
    # ігноруючи сортування університетів.
    used_country_codes = set(universities.values_list('country', flat=True))
    # -------------------
    
    # Формуємо список словників для шаблону з назвами обома мовами
    countries_data = []
    for code in used_country_codes:
        if not code: continue # Пропускаємо, якщо код країни пустий

        from django.utils import translation
        
        # Отримуємо англійську назву
        with translation.override('en'):
            name_en = dict(all_countries).get(code, code)
            
        # Отримуємо українську назву
        with translation.override('uk'):
            name_uk = dict(all_countries).get(code, code)
            
        countries_data.append({
            'code': code,
            'name_en': name_en,
            'name_uk': name_uk
        })
    
    # Сортуємо список країн за українською назвою для красивого відображення у фільтрі
    countries_data.sort(key=lambda x: x['name_uk'])

    context = {
        'universities': universities,
        'countries': countries_data, 
    }
    
    return render(request, 'uni-list.html', context)