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
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from django.http import JsonResponse
from .document_generator import generate_document
import json

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

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        user = self.request.user.id
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
    
    def get_queryset(self):
        document_type_id = self.request.query_params.get('document_type_id')
        return Document.objects.filter(document_type_id=document_type_id)


class DocumentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

class TemplateTypeListView(APIView):
    def get(self, request):
        template_types = Document.TEMPLATE_TYPES
        return Response({'template_types': template_types})

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    @action(detail=True, methods=['post'])
    def assign_user(self, request, pk=None):
        task = self.get_object()
        emails = request.data.get('emails', [])
        
        for email in emails:
            try:
                user = CustomUser.objects.get(email=email)
                task.assigned_users.add(user)
            except CustomUser.DoesNotExist:
                return Response({'error': f'User with email {email} does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        task.save()
        
        return Response({'message': 'Users assigned successfully'})


class TaskAPIView(APIView):
    def get(self,request):  # cRud (To read)
        queryset = Task.objects.all()
        serializer = TaskSerializer(queryset,many=True)  
        """
        many = True as we have manytomany field, 
        means multiple datas will be there ex : [{},{}]
        """
        return Response(serializer.data) 
    
def automate_document(request):
    if request.method == 'POST':
        try:
            # Extract project details and file name from the request body
            request_data = json.loads(request.body)
            project_details = request_data.get('projectDetails')
            file_name = request_data.get('fileName')  # Assuming the file name is provided in the request

            # Load JSON data from the selected file
            with open(f'backend/projects/docs_templates/{file_name}.json', 'r') as file:
                json_data = json.load(file)

            # Generate the document using the imported script and project details
            generated_document = generate_document(json_data, **project_details)

            # Save the document (optional)
            # generated_document.save("generated_document.docx")

            # Convert document content to string (for demonstration purposes)
            document_content = ""
            for paragraph in generated_document.paragraphs:
                document_content += paragraph.text + "\n"

            # Return the generated document content to the frontend
            return JsonResponse({"document_content": document_content})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Only POST requests are supported."}, status=405)