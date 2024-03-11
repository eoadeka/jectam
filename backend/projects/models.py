from django.db import models
from autoslug import AutoSlugField
import uuid
from django.utils.timezone import now
from accounts.models import CustomUser
# Create your models here.

# Define the characteristics of a project, including its title, description, start date, end date, and associated team members.
class Project(models.Model):
    PROJECT_STATUS_CHOICES = (
        ('To Do', 'To do'),
        ('In Progress', 'In Progress'),
        ('Done', 'Done')
    )

    PROJECT_METHOD_CHOICES = (
        ('Scrum', 'Scrum'),
        ('Prince2', 'PRINCE2'),
        ('Waterfall', 'Waterfall')
    )

    project_id = models.UUIDField(
        primary_key = True, 
        default = uuid.uuid4,
        editable = False, 
        unique=True
        )
    title = models.CharField(max_length=255)
    slug = AutoSlugField(default="", null=False, populate_from='title')
    three_word_description = models.CharField(max_length=255, default="description...")
    description = models.TextField()
    created_by = models.ForeignKey(CustomUser,related_name='created_projects', on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(default=now, blank=True)
    updated_at = models.DateTimeField(default=now, blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    method = models.CharField(max_length=20, choices=PROJECT_METHOD_CHOICES, blank=True, null=True)
    project_status = models.CharField(max_length=20, choices=PROJECT_STATUS_CHOICES, blank=True, null=True)
    is_completed = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False)
    # team_members = models.ManyToManyField(CustomUser)

# Represent individual tasks within a project, capturing details like task name, description, due date, assigned user, and task status.
class Task(models.Model):
    TASK_STATUS_CHOICES = (
        ('To Do', 'To do'),
        ('In Progress', 'In Progress'),
        ('Done', 'Done')
    )

    CATEGORY_CHOICES = (
        ('Backend Devt', 'Backend Devt'),
        ('Backend Devt', 'Backend Devt'),
        ('UI Design', 'UI Design')
    )

    PRIORITY_CHOICES = (
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High')
    )

    task_id = models.UUIDField(
        primary_key = True, 
        default = uuid.uuid4,
        editable = False, 
        unique=True
    )
    title = models.CharField(max_length=255, default="task")
    slug = AutoSlugField(default="", null=False, populate_from='title')
    project = models.ForeignKey(Project, related_name='tasks', on_delete=models.CASCADE)
    description = models.TextField()
    due_date = models.DateField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, blank=True, null=True)
    assignee = models.ForeignKey(CustomUser, related_name='tasks_assignees', on_delete=models.CASCADE, blank=True, null=True)
    status = models.CharField(max_length=20, choices=TASK_STATUS_CHOICES, blank=True, null=True)
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, blank=True, null=True)
    is_completed = models.BooleanField(default=False)

    # class Meta:
    #     permissions = [
    #         ("change_task_status", "Can change the status of tasks"),
    #         ("close_task", "Can remove a task by setting its status as closed"),
    #     ]
    
    # user.has_perm("app.close_task")

    
# Define a model for project-related documents, including attributes such as document name, description, upload date, and associated project.
class Document(models.Model):
    document_id = models.UUIDField(
        primary_key = True, 
        default = uuid.uuid4,
        editable = False, 
        unique=True
        )
    title = models.CharField(max_length=255, default="document")
    slug = AutoSlugField(default="", null=False, populate_from='title')
    description = models.TextField()
    upload_date = models.DateTimeField(auto_now_add=True)
    project = models.ForeignKey(Project, related_name='documents', on_delete=models.CASCADE)
    file = models.FileField(upload_to='project_documents/')
