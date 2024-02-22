from django.db import models

# Create your models here.

# Define the characteristics of a project, including its title, description, start date, end date, and associated team members.
class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    # team_members = models.ManyToManyField(CustomUser)

# Represent individual tasks within a project, capturing details like task name, description, due date, assigned user, and task status.
class Task(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    due_date = models.DateField()
    # assigned_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=[('TODO', 'To Do'), ('IN_PROGRESS', 'In Progress'), ('COMPLETED', 'Completed')])
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

# Define a model for project-related documents, including attributes such as document name, description, upload date, and associated project.
class Document(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    upload_date = models.DateTimeField(auto_now_add=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    file = models.FileField(upload_to='project_documents/')
