from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from apps.programs.urls import blog_urlpatterns, announcement_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.users.urls')),
    path('api/programs/', include('apps.programs.urls')),
    path('api/blog/', include((blog_urlpatterns, 'blog'))),
    path('api/announcements/', include((announcement_urlpatterns, 'announcements'))),
    path('api/', include('apps.orders.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
