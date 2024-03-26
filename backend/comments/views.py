from django.shortcuts import render
from rest_framework import generics
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .permissions import *
from notifications.models import *
from .models import *
from .serializers import *
from projects.models import Task 

# Create your views here.
class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        # Get the task ID from request data
        task_id = self.request.data.get('task')

        # Fetch the task object from the database
        task = Task.objects.get(pk=task_id)

        # Save the comment
        serializer.save()

        # Create a notification for the new comment
        Notifications.objects.create(
            notification_type='commented',
            message=f'New comment added to {task.title}',
            task=task,
            # project=project
        )

    # def perform_create(self, serializer):
    #     serializer.save(created_by=self.request.user)


class CommentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    

    # def get(self, request, comment_id):
    #     comments = Comment.objects.filter(comment_id=comment_id)
    #     serializer = CommentSerializer(comments, many=True)
    #     return Response(serializer.data)
    
class TaskCommentsAPIView(ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsCommenterOrReadOnly]
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        task_id = self.kwargs['task']
        return Comment.objects.filter(task=task_id)


# class CommentList(APIView):
#     def get(self, request):
#         comments = Comment.objects.all()
#         serializer = CommentSerializer(comments, many=True)
#         return Response(serializer.data)

class CommentDetail(APIView):
    def get(self, request, comment_id):
        comments = Comment.objects.filter(comment_id=comment_id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)