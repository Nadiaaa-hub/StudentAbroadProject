import django_filters
from .models import Program

class ProgramFilter(django_filters.FilterSet):
    study_level = django_filters.MultipleChoiceFilter(
        choices=Program.STUDY_LEVELS
    )
    program_type = django_filters.MultipleChoiceFilter(
        choices=Program.PROGRAM_TYPES
    )

    class Meta:
        model = Program
        fields = {
            'university': ['exact'],
            'country': ['exact'],
            'study_level': ['exact'],
            'program_type': ['exact'],
        }