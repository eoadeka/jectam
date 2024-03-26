from django.urls import path
from . import views
from .views import *


urlpatterns = [

    path('comments/', CommentListCreateView.as_view(), name='comment-list-create'),
    path('comments/<str:task>/comments', TaskCommentsAPIView.as_view(), name='comment-detail'),
    path('comments/<str:pk>/', CommentRetrieveUpdateDestroyView.as_view(), name='comment-detail'),
    path('comments/details/<str:comment_id>/', CommentDetail.as_view(), name='comment-detail'),
] 
