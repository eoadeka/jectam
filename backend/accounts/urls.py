from django.urls import path, include
from . import views
from .views import *
# from .views import  GetCSRFToken, LoginView, LogoutView, CheckAuthenticatedView, DeleteAccountView


urlpatterns = [
    path('', views.accounts, name='accounts'),
    path('csrf/', views.csrf),
    path('ping/', views.ping),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    # path('authenticated', CheckAuthenticatedView.as_view()),
    # path('register', SignupView.as_view()),
    # path('login', LoginView.as_view()),
    path('logout/', LogoutView.as_view(), name ='logout'),
    # path('delete', DeleteAccountView.as_view()),
    # path('csrf_cookie', GetCSRFToken.as_view())


]
