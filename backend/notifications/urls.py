from django.urls import path
from . import views

urlpatterns = [
    path('', views.notifications, name='notifications'),
    path('add/', views.add_notification, name='add_notifications'),
    path('show/', views.get_all_notifications, name='get_notifications'),
]
