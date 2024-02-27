from django.urls import path
from . import views

urlpatterns = [
    path('', views.reports_and_analytics, name='reports_and_analytics'),
]
