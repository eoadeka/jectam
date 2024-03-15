from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http.response import JsonResponse
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework import viewsets



# Create your views here.
def projects(request):
    return HttpResponse("<h1>Projects</h1>")

# class ProjectView(APIView):
#     def get_project(self, pk):
#         try:
#             project = Project.objects.get(project_id=pk)
#             return project
#         except Project.DoesNotExist:
#             raise Http404

#     def get(self, request, pk=None):
#         if pk:
#             data = self.get_project(pk)
#             serializer = ProjectSerializer(data)
#         else:
#             data = Project.objects.all()
#             serializer = ProjectSerializer(data, many=True)
#         return Response(serializer.data)
    
#     def post(self, request):
#         data = request.data
#         serializer = ProjectSerializer(data=data)

#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse("Project Created Successfully", safe=False)
#         return JsonResponse("Failed to Add Project", safe=False)

#     def put(self, request, pk=None):
#         project_to_update = Project.objects.get(project_id=pk)
#         serializer = ProjectSerializer(instance=project_to_update, data=request.data, partial=True)

#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse("Project updated Successfully", safe=False)
#         return JsonResponse("Failed To Update Project")

#     def delete(self, request, pk):
#         project_to_delete = Project.objects.get(project_id=pk)
#         project_to_delete.delete()
#         return JsonResponse("Project Deleted Successfully", safe=False)
    
# class TaskView(APIView):

#     def post(self, request):
#         data = request.data
#         serializer = TaskSerializer(data=data)

#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse("Task Created Successfully", safe=False)
#         return JsonResponse("Failed to Add Task", safe=False)
    

class ProjectListCreateView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_queryset(self):
        user = self.request.user
        return Project.objects.filter(created_by=user)

class ProjectRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    parser_classes = (MultiPartParser, FormParser,)


class TaskRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class DocumentListCreateView(generics.ListCreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    parser_classes = (MultiPartParser, FormParser,)


class DocumentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

