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
import spacy
# from spacy.lang.en import English
from .predict_method import predict_methodology_from_keywords
from random_word import RandomWords
from django.db.models import Q


# Load the English language model for spaCy
nlp = spacy.load("en_core_web_sm")

@csrf_exempt
def generate_random_words(request):
    # Initialize RandomWords object
    r = RandomWords()

    # Generate three random words
    random_words = [r.get_random_word() for _ in range(3)]

    # Join the words with a dash
    random_words_joined = '-'.join(random_words)
    # print(random_words_joined)

    # Return the random words as JSON response
    return JsonResponse({'random_words': random_words_joined})


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

    def create_deadline_notifications(self):

        # Retrieve the user making the request
        user = self.request.user
        print(user)

        # Retrieve projects with deadlines within 7 days
        projects_with_deadline = [
            project for project in Project.objects.all()
            if project.end_date and (project.end_date - datetime.now().date()) <= timedelta(days=7)
        ]

        # Check if notifications already exist for these projects
        existing_notifications = Notifications.objects.filter(
            notification_type='deadline_approaching',
            project__in=projects_with_deadline,
            recipient=user
        )

        # If a notification does not exist for a project, create it
        for project in projects_with_deadline:
            if not existing_notifications.filter(project=project).exists():
                notification_data = {
                    'notification_type': 'deadline_approaching',
                    'message': f'Deadline for project "{project.title}" is approaching within 7 days.',
                    'project': project.project_id,
                    'recipient': user,
                    'sender': 'Jectam'  # You can specify the sender if needed
                }
                Notifications.objects.create(**notification_data)


    def get_queryset(self):
        # Call the create_deadline_notifications function before retrieving projects
        # self.create_deadline_notifications()
        user = self.request.user
        # Filter projects where the user is the creator or a team member
        # return Project.objects.filter(team_members=user) | Project.objects.filter(created_by=user)
        return Project.objects.filter(Q(team_members=user) | Q(created_by=user)).order_by('-created_at').distinct()


    def perform_create(self, serializer):
        project = serializer.save(created_by=self.request.user)
        # Add the creator to the team_members list
        project.team_members.add(self.request.user)

         # Create a notification for the new comment
        notification_data = {
            'notification_type': 'asked_to_join',
            'message': f'You\'ve been invited to {project}',
            'project': project,
            'sender': self.request.user,
            # 'recipient': project.team_members,
            # project: project
        }

        for team_member in project.team_members.exclude(id=self.request.user.id):  # Assuming team_members is a ManyToManyField
            notification_data['recipient'] = team_member
            print(team_member)
        Notifications.objects.create(**notification_data)
        print(notification_data)

        # print(project.team_members)
        self.create_tasks(project)
        return Response(serializer.data)

    # def list(self, request, *args, **kwargs):
    #     # Call the parent list method to retrieve the list of projects
    #     response = super().list(request, *args, **kwargs)
        
    #     # After listing projects, create notifications for projects with approaching deadlines
    #     self.create_deadline_notifications()
        
    #     return response
    
  
    

    # def get_queryset(self):
    #     user = self.request.user.id
    #     return Project.objects.filter(created_by=user)

class ProjectRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_assignees_list(self, task_id):
        # Assuming you have a MongoDB client already configured
        assignee_collection = projectsDB['projects_task_assignee']

        # Query assignees for the given task_id
        assignees_cursor = assignee_collection.find({'task_id': task_id})

        # Convert the cursor object to a list of dictionaries
        assignees = [assignee for assignee in assignees_cursor]

        return assignees
    
    def get_team_members_list(self, project_id):
        team_members_collection = projectsDB['projects_project_team_members']
        team_members_cursor = team_members_collection.find({'project_id': project_id})

        # Extract user_id from each team member document
        team_members = [team_member['customuser_id'] for team_member in team_members_cursor]

        return team_members


    # permission_classes = [IsAuthenticated] 

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
                }
                final_review_meeting_serializer = TaskSerializer(data=final_review_meeting_task_data)
                if final_review_meeting_serializer.is_valid():
                    final_review_meeting_instance = final_review_meeting_serializer.save()

                    # Get the team members list for the project
                    team_members_list = self.get_team_members_list(instance.project_id)
                    print(team_members_list)


                    # Assign the final review meeting task to all project team members
                    if team_members_list:
                        for assignee in team_members_list:
                            final_review_meeting_instance.assignee.add(assignee)

                    # Save the final_review_meeting_instance after adding the assignees
                    final_review_meeting_instance.save()
                    print(final_review_meeting_instance.assignee)

                    return Response(serializer.data)
                else:
                    # Handle validation errors if necessary
                    raise ValidationError(final_review_meeting_serializer.errors)

        return Response(serializer.data)


class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    parser_classes = (MultiPartParser, FormParser,)

    def perform_create(self, serializer):
        task = serializer.save()
        # task.assignee.add(self.request.user)
        return Response(serializer.data)


class TaskRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_assignees_list(self, task_id):
        # Assuming you have a MongoDB client already configured
        assignee_collection = projectsDB['projects_task_assignee']

        # Query assignees for the given task_id
        assignees_cursor = assignee_collection.find({'task_id': task_id})

        # Convert the cursor object to a list of dictionaries
        assignees = [assignee for assignee in assignees_cursor]

        return assignees

    def perform_update(self, serializer):
        instance = serializer.save()

        project = instance.project

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
                'project': project.project_id,  
            }
            review_meeting_serializer = TaskSerializer(data=review_meeting_task_data)
            if review_meeting_serializer.is_valid():
                review_meeting_instance = review_meeting_serializer.save()

                # Assign the review meeting task to the project creator
                review_meeting_instance.assignee.add(project.created_by_id)

                # Assign the review meeting task to each assignee of the completed task
                # Get assignees list using the get_assignees_list function
                assignees_list = self.get_assignees_list(instance.task_id)

                if assignees_list:
                    for assignee_data in assignees_list:
                        assignee_id = assignee_data.get('customuser_id')
                        if assignee_id:
                            review_meeting_instance.assignee.add(assignee_id)


                # Save the review_meeting_instance after adding the assignees
                review_meeting_instance.save()
                # print(assignees_list)
            else:
                # Handle validation errors if necessary
                raise ValidationError(review_meeting_serializer.errors)

        return Response(serializer.data)

class DocumentListCreateView(generics.ListCreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]  
    
    # def get_queryset(self):
    #     document_type = self.request.query_params.get('document_type')
    #     return Document.objects.filter(document_type=document_type)


class DocumentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

class TemplateTypeListView(APIView):
    permission_classes = [IsAuthenticated]  

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
            file_type = project_details.get('file_type')

            # Load JSON data from the selected file
            with open(f'./projects/docs_templates/{file_name}_template.json', 'r') as file:
                json_data = json.load(file)
                # print(json_data)

            # Generate the document using the imported script and project details
            generated_document, document_id  = generate_document(json_data, project_id,  file_type)

            # Convert document content to string (for demonstration purposes)
            document_content = "\n".join([p.text for p in generated_document.paragraphs])

            # Return the generated document content to the frontend
            return JsonResponse({"document_content": document_content,  "document_id": document_id})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Only POST requests are supported."}, status=405)




def perform_prediction(project_description, methodology_keywords):
    """
    Perform prediction based on project description.
    """
    try:
        # Perform text analysis with spaCy
        doc = nlp(project_description)

        # Extract keywords or relevant terms from the project description
        keywords = [token.text.lower() for token in doc if not token.is_stop and not token.is_punct]

        # Initialize methodology scores
        methodology_scores = {methodology: 0 for methodology in methodology_keywords}

        # Calculate scores based on the presence of keywords and characteristics
        for methodology, data in methodology_keywords.items():
            method_keywords = data['keywords']
            characteristics = data['characteristics']

            for keyword in keywords:
                if keyword in method_keywords:
                    methodology_scores[methodology] += 1
                for characteristic in characteristics:
                    if characteristic in project_description.lower():
                        methodology_scores[methodology] += 1

        # Determine the predicted methodology based on keyword and characteristic occurrences
        predicted_methodology = max(methodology_scores, key=methodology_scores.get)
        return predicted_methodology
    except Exception as e:
        print("Error in perform_prediction:", e)
        return None  


@csrf_exempt
def predict_methodology(request):
    if request.method == 'POST':
        try:
            # Get the project description from the POST request
            request_data = json.loads(request.body)
            project_description = request_data.get('project_description')
            # print(project_description)

            if not project_description:
                raise ValueError("Project description is empty.")

              # Define keywords associated with each methodology
            methodology_keywords = {
                'Agile': {
                    'keywords': ['agile', 'scrum', 'sprint', 'kanban', 'iteration', 'user story', 'continuous integration', 'collaboration', 'feedback', 'adaptive planning'],
                    'characteristics': ['flexible', 'adaptive', 'iterative', 'collaborative']
                },
                'Waterfall': {
                    'keywords': ['waterfall', 'sequential', 'phases', 'documentation', 'requirements', 'plan-driven', 'design', 'implementation', 'testing', 'deployment'],
                    'characteristics': ['structured', 'predictive', 'sequential']
                },
                'Scrum': {
                    'keywords': ['scrum master', 'product owner', 'daily stand-ups', 'product backlog', 'sprint planning', 'sprint review', 'sprint retrospective'],
                    'characteristics': ['iterative', 'collaborative', 'adaptive']
                },
                'Extreme Programming (XP)': {
                    'keywords': ['pair programming', 'test-driven development', 'small releases', 'refactoring', 'simplicity'],
                    'characteristics': ['iterative', 'collaborative', 'adaptive']
                },
                'Lean': {
                    'keywords': ['maximize value', 'minimize waste', 'continuous improvement', 'value stream mapping', 'flow', 'pull-based'],
                    'characteristics': ['efficient', 'waste reduction', 'continuous improvement']
                },
                'Kanban': {
                    'keywords': ['visualize workflow', 'limit work in progress', 'flow-based', 'pull system', 'continuous delivery'],
                    'characteristics': ['visual management', 'workflow optimization', 'flow efficiency']
                },
                'PRINCE2': {
                    'keywords': ['structured', 'controlled', 'stages', 'deliverables', 'reviews', 'roles', 'management by exception', 'project board', 'project manager'],
                    'characteristics': ['structured', 'controlled', 'governance-focused']
                },
                'Six Sigma': {
                    'keywords': ['define', 'measure', 'analyze', 'improve', 'control', 'statistical', 'data-driven', 'DMAIC', 'continuous improvement'],
                    'characteristics': ['data-driven', 'continuous improvement', 'statistical analysis']
                },
            }


            # print("keywords")
            # Perform prediction based on project description
            predicted_methodology = perform_prediction(project_description, methodology_keywords)
            # print(keywords)
            # predicted_methodology = predict_methodology_from_keywords(keywords, methodology_keywords)
            print(predicted_methodology)

            # Return the predicted methodology as JSON response
            return JsonResponse({'predicted_methodology': predicted_methodology})
        
        except ValueError as ve:
            return JsonResponse({'error': str(ve)}, status=400)
        
        except Exception as e:
            return JsonResponse({'error': 'An error occurred while processing the request.'}, status=500)
    else:
        # Return error for non-POST requests
        return JsonResponse({'error': 'Only POST requests are allowed.'}, status=400)

