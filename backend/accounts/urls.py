from django.urls import path, include
from . import views
from .views import *
# from .views import  GetCSRFToken, LoginView, LogoutView, CheckAuthenticatedView, DeleteAccountView


urlpatterns = [
    path('', views.accounts, name='accounts'),
    path('csrf/', views.csrf),
    path('ping/', views.ping),

    path('profile/', views.getProfile, name='profile'),
    path('token/', views.MyTokenObtainPairView.as_view(), name ='token_obtain_pair'),

    path('user', UserAPIView.as_view()),
    path('users/', UserListView.as_view(), name='user-list'),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    # path('authenticated', CheckAuthenticatedView.as_view()),
    path('register/', RegisterView, name ='register'),
    # path('login', LoginView.as_view()),
    path('logout/', LogoutView.as_view(), name ='logout'),
    # path('delete', DeleteAccountView.as_view()),
    # path('csrf_cookie', GetCSRFToken.as_view())
    path("<phone>/", getPhoneNumberRegistered.as_view(), name="OTP Gen"),
    path("time_based/<phone>/", getPhoneNumberRegistered_TimeBased.as_view(), name="OTP Gen Time Based"),

]
