from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path('', views.projects, name='projects'),
    # path('project/', ProjectView.as_view()),
    # path('project/<int:pk>', ProjectView.as_view()),
    # path('task/', TaskView.as_view())

    path('projects/', ProjectListCreateView.as_view(), name='project-list-create'),
    path('projects/<slug:pk>/', ProjectRetrieveUpdateDestroyView.as_view(), name='project-detail'),
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),
    path('tasks/<slug:pk>/', TaskRetrieveUpdateDestroyView.as_view(), name='task-detail'),
    path('documents/', DocumentListCreateView.as_view(), name='document-list-create'),
    path('documents/<slug:pk>/', DocumentRetrieveUpdateDestroyView.as_view(), name='document-detail'),
]
