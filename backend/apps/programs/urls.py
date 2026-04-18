from django.urls import path
from . import views

urlpatterns = [
    path('', views.ProgramListView.as_view(), name='program-list'),
    path('slugs/', views.ProgramSlugListView.as_view(), name='program-slugs'),
    path('testimonials/all/', views.TestimonialListView.as_view(), name='testimonials'),
    path('<slug:slug>/', views.ProgramDetailView.as_view(), name='program-detail'),
]

blog_urlpatterns = [
    path('', views.BlogArticleListView.as_view(), name='blog-list'),
]

announcement_urlpatterns = [
    path('', views.AnnouncementListView.as_view(), name='announcements'),
]
