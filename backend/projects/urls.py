from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path('', views.projects, name='projects'),
    path('project/', ProjectView.as_view()),
    path('project/<int:pk>', ProjectView.as_view()),
    path('task/', TaskView.as_view())
]
