from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
import json
from .models import FAQItem, FAQCategory

@csrf_exempt
@require_GET
def faq_list(request):
    try:
        lang = request.GET.get('lang', 'en')
        
        # Перевіряємо чи підтримується мова
        if lang not in ['en', 'ua']:
            lang = 'en'
        
        faq_items = FAQItem.objects.all().order_by('-created_at')
        
        result = []
        for item in faq_items:
            categories = []
            for category in item.categories.all():
                categories.append({
                    'name': getattr(category, f'name_{lang}', category.name_en)
                })
            
            result.append({
                'question': getattr(item, f'question_{lang}', item.question_en),
                'answer': getattr(item, f'answer_{lang}', item.answer_en),
                'categories': categories,
                'author': getattr(item, f'author_{lang}', item.author),
                'editor': getattr(item, f'editor_{lang}', item.editor),
                'created_at': item.created_at.strftime('%d/%m/%Y'),
                'updated_at': item.updated_at.strftime('%d/%m/%Y')
            })
        
        response = JsonResponse({'faq_items': result, 'status': 'success'})
        response["Access-Control-Allow-Origin"] = "*"
        return response
        
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'message': str(e),
            'faq_items': []
        }, status=500)