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
        
        # Перевіряємо чи підтримується мова (додаємо підтримку 'uk' як альтернативи 'ua')
        if lang not in ['en', 'ua', 'uk']:
            lang = 'en'
        # Якщо використовується 'uk', змінюємо на 'ua' для зворотньої сумісності
        if lang == 'uk':
            lang = 'ua'
        
        # Фільтруємо тільки опубліковані FAQ
        faq_items = FAQItem.objects.filter(is_published=True).order_by('-created_at')
        
        result = []
        for item in faq_items:
            categories = []
            for category in item.categories.all():
                categories.append({
                    'id': category.id,
                    'name': getattr(category, f'name_{lang}', category.name_en)
                })
            
            result.append({
                'id': item.id,
                'question': getattr(item, f'question_{lang}', item.question_en),
                'answer': getattr(item, f'answer_{lang}', item.answer_en),
                'categories': categories,
                'author': getattr(item, f'author_{lang}', item.author),
                'editor': getattr(item, f'editor_{lang}', item.editor),
                'created_at': item.created_at.strftime('%d/%m/%Y'),
                'updated_at': item.updated_at.strftime('%d/%m/%Y')
            })
        
        response = JsonResponse({'faq_items': result, 'status': 'success', 'language': lang})
        response["Access-Control-Allow-Origin"] = "*"
        return response
        
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'message': str(e),
            'faq_items': []
        }, status=500)