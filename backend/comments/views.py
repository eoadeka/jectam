from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView


from .models import *
from .serializers import *

# Create your views here.
class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    # def perform_create(self, serializer):
    #     serializer.save(created_by=self.request.user)


class CommentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get(self, request, task):
        comments = Comment.objects.filter(task=task)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)


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