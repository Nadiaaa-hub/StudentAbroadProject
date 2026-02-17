# backend/config/seo_views.py
from django.http import HttpResponse
from django.views.decorators.cache import cache_page


@cache_page(60 * 60 * 24)  # Cache for 24 hours
def robots_txt_view(request):
    """
    Generate robots.txt dynamically.
    Allows crawling of public pages, blocks admin and API.
    """
    lines = [
        "User-agent: *",
        "Allow: /",
        "",
        "# Block admin and API paths",
        "Disallow: /admin/",
        "Disallow: /api/",
        "",
        "# Sitemap location",
        f"Sitemap: {request.build_absolute_uri('/sitemap.xml')}",
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain")
