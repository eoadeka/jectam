from django.urls import path
from . import views
from .views import *

urlpatterns = [
    # path('', views.notifications, name='notifications'),
    # path('add/', views.add_notification, name='add_notifications'),
    path('show/', views.get_all_notifications, name='get_notifications'),
    path('notifications/', NotificationsListView.as_view(), name='notifications'),
    # path('mark-all-as-read/', views.mark_notifications_as_read, name='notification-mark-all-read'),
    # path('mark-all-as-read/', NotificationMarkAllReadView.as_view(), name='notification-mark-all-read'),
    path('mark-all-as-read/', NotificationViewSet.as_view({'patch': 'mark_all_read'}), name='notification-mark-all-read'),
]
