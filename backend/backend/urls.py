from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/programs/', include('programs.urls')),
    path('api/universities/', include('universities.urls')),
]