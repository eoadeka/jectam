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
from bson.json_util import dumps
from jectam_db import projectsDB
from datetime import datetime, timedelta
from notifications.models import *
from django.core.files import File
from rest_framework.exceptions import ValidationError
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated


# Create your views here.
def get_all_assignees(request):

    assignee_collection = projectsDB['projects_task_assignee']

   # Query all assignees
    assignees_cursor = assignee_collection.find({})

    # Convert the cursor object to a list of dictionaries
    assignees = [assignee for assignee in assignees_cursor]

    # Serialize the data to JSON using bson.json_util.dumps
    assignees_json = dumps(assignees)

    # Return the list of assignees as a JSON response
    return JsonResponse(assignees_json, safe=False)


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
    permission_classes = [IsAuthenticated]  
    initial_tasks_data = None

    def get_initial_tasks_data(self):
        if not self.initial_tasks_data:
            try:
                with open('./projects/initial_tasks.json', 'r') as file:
                    self.initial_tasks_data = json.load(file)
            except FileNotFoundError:
                print("Error: initial_tasks.json file not found")
                self.initial_tasks_data = []
            except json.JSONDecodeError:
                print("Error: Unable to decode initial_tasks.json file")
                self.initial_tasks_data = []
        return self.initial_tasks_data

    def create_tasks(self, project):
        user = self.request.user
        initial_tasks_data = self.get_initial_tasks_data()
        due_date = datetime.now() + timedelta(days=7)
        tasks_to_create = []

        for task_data in initial_tasks_data:
            task_data['project'] = project.pk
            task_data['due_date'] = due_date.strftime('%Y-%m-%d')
            task_data['assignee'] = [user.pk]
            tasks_to_create.append(task_data)

        task_serializer = TaskSerializer(data=tasks_to_create, many=True)
        if task_serializer.is_valid():
            tasks_created = task_serializer.save()
            print("Tasks created successfully:", tasks_created)
        else:
            print("Validation errors:", task_serializer.errors)

    def get_queryset(self):
        user = self.request.user
        # Filter projects where the user is the creator or a team member
        return Project.objects.filter(team_members=user) | Project.objects.filter(created_by=user)

    def perform_create(self, serializer):
        project = serializer.save(created_by=self.request.user)
        # project = serializer.save()
        # Add the creator to the team_members list
        project.team_members.add(self.request.user)
        print(project.team_members)
        self.create_tasks(project)
        return Response(serializer.data)

    # def list(self, request, *args, **kwargs):
    #     # Call the parent list method to retrieve the list of projects
    #     response = super().list(request, *args, **kwargs)
        
    #     # After listing projects, create notifications for projects with approaching deadlines
    #     self.create_deadline_notifications()
        
    #     return response
    
    # def create_deadline_notifications(self):

    #     # Retrieve the user making the request
    #     user = self.request.user.id

    #     # Retrieve projects with deadlines within 7 days
    #     projects_with_deadline = [
    #         project for project in Project.objects.all()
    #         if project.end_date and (project.end_date - datetime.now().date()) <= timedelta(days=7)
    #     ]

    #     # Check if notifications already exist for these projects
    #     existing_notifications = Notifications.objects.filter(
    #         notification_type='deadline_approaching',
    #         project__in=projects_with_deadline,
    #         recipient=user
    #     )

    #     # If a notification does not exist for a project, create it
    #     for project in projects_with_deadline:
    #         if not existing_notifications.filter(project=project).exists():
    #             notification_data = {
    #                 'notification_type': 'deadline_approaching',
    #                 'message': f'Deadline for project "{project.title}" is approaching within 7 days.',
    #                 'project': project,
    #                 'recipient': user,
    #                 'sender': None  # You can specify the sender if needed
    #             }
    #             Notifications.objects.create(**notification_data)

    

    # def get_queryset(self):
    #     user = self.request.user.id
    #     return Project.objects.filter(created_by=user)

class ProjectRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    # def perform_update(self, serializer):
    #     instance = serializer.save()

    #     # Retrieve all tasks associated with the project
    #     project_tasks = Task.objects.filter(project=instance)

    #     # Check if all tasks in the project are completed
    #     all_tasks_completed = all(task.is_completed for task in project_tasks)

    #     if all_tasks_completed:
    #         # Create a final review meeting task
    #         final_review_meeting_task_data = {
    #             'title': f'Final Review Meeting for Project: {instance.title}',
    #             'description': f'Final review meeting for the completed project: {instance.title}',
    #             'due_date': (datetime.now() + timedelta(days=2)).strftime('%Y-%m-%d'),  # 1 week from now
    #             'status': 'Under Review',
    #             'category': 'Final Review',
    #             'project': instance.project_id,
    #             # You may set other fields as needed
    #         }
    #         final_review_meeting_serializer = TaskSerializer(data=final_review_meeting_task_data)
    #         if final_review_meeting_serializer.is_valid():
    #             final_review_meeting_serializer.save()
    #         else:
    #             # Handle validation errors if necessary
    #             raise ValidationError(final_review_meeting_serializer.errors)

    #     return Response(serializer.data)

    def perform_update(self, serializer):
        instance = serializer.save()

        # Check if the updated project is marked as completed
        if instance.is_completed == True:
            # Set instance status to "Done"
            instance.project_status = "Done"
            instance.save()

            # Retrieve all tasks associated with the project
            project_tasks = Task.objects.filter(project=instance)

            # Check if all tasks in the project are completed
            all_tasks_completed = all(task.is_completed for task in project_tasks)

            if all_tasks_completed:
                # Create a final review meeting task
                final_review_meeting_task_data = {
                    'title': f'Final Review Meeting for Project: {instance.title}',
                    'description': f'Final review meeting for the completed project: {instance.title}',
                    'due_date': (datetime.now() + timedelta(days=2)).strftime('%Y-%m-%d'),  # 1 week from now
                    'status': 'To Do',
                    'category': 'Review',
                    'priority': 'Medium',
                    'project': instance.project_id,
                    # You may set other fields as needed
                }
                final_review_meeting_serializer = TaskSerializer(data=final_review_meeting_task_data)
                if final_review_meeting_serializer.is_valid():
                    final_review_meeting_serializer.save()
                else:
                    # Handle validation errors if necessary
                    raise ValidationError(final_review_meeting_serializer.errors)

        return Response(serializer.data)


class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    parser_classes = (MultiPartParser, FormParser,)


class TaskRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def perform_update(self, serializer):
        instance = serializer.save()

        project = instance.project.project_id

        # Check if the updated task is completed and has high priority
        if instance.is_completed == True and instance.priority == 'High':
            # Set instance status to "Done"
            instance.status = "Done"
            instance.save()

            # Create a review meeting task
            review_meeting_task_data = {
                'title': f'Review Meeting 🔍',
                'description': f'Review meeting for the completed high priority task: {instance.title}',
                'due_date': (datetime.now() + timedelta(days=2)).strftime('%Y-%m-%d'),  # 1 week from now
                'status': 'To Do',
                'priority': 'Medium',
                'category': 'Review',
                'project': project,  
                # You may set other fields as needed
            }
            review_meeting_serializer = TaskSerializer(data=review_meeting_task_data)
            if review_meeting_serializer.is_valid():
                review_meeting_serializer.save()
            else:
                # Handle validation errors if necessary
                raise ValidationError(review_meeting_serializer.errors)

        return Response(serializer.data)

class DocumentListCreateView(generics.ListCreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    
    # def get_queryset(self):
    #     document_type = self.request.query_params.get('document_type')
    #     return Document.objects.filter(document_type=document_type)


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

@csrf_exempt
def automate_document(request):
    if request.method == 'POST':
        try:
            # Extract project details and file name from the request body
            request_data = json.loads(request.body)
            project_details = request_data.get('projectDetails')
            file_name = request_data.get('fileName')  # Assuming the file name is provided in the request

            # Extract project and date from project details
            project_id = project_details.get('project')
            # date = project_details.get('date')
            file_type = project_details.get('file_type')

            # Convert date to string if it's a datetime object
            # if isinstance(date, datetime):
            #     date = date.strftime('%Y-%m-%d')
            #     print(date)

            # Load JSON data from the selected file
            with open(f'./projects/docs_templates/{file_name}_template.json', 'r') as file:
                json_data = json.load(file)
                # print(json_data)

            # Generate the document using the imported script and project details
            generated_document, document_id  = generate_document(json_data, project_id,  file_type)

            # print(' ')
            # print(generated_document.id)
            # print(generated_document.file_type)
            # Save the document (optional)
            # generated_document.save("generated_document.docx")

            # Convert document content to string (for demonstration purposes)
            document_content = "\n".join([p.text for p in generated_document.paragraphs])
            # print(document_content)
            # print(generated_document.id)
            # print(generated_document.document_id)

            # Return the generated document content to the frontend
            return JsonResponse({"document_content": document_content,  "document_id": document_id})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Only POST requests are supported."}, status=405)