from django.urls import path
from . import views

urlpatterns = [
    path('hello-world/', views.hello_world, name='hello_world'),
    path('home/', views.HomeView.as_view(), name ='home')

]
