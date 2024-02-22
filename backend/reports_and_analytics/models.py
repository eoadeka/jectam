from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from projects.models import Project, Task
from accounts.models import CustomUser

class ProjectReport(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    creator = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    title = models.CharField(max_length=100)
    description = models.TextField()

    # Additional fields as needed

    def __str__(self):
        return self.title

class TaskReport(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    creator = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    title = models.CharField(max_length=100)
    description = models.TextField()

    # Additional fields as needed

    def __str__(self):
        return self.title

class AnalyticsData(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(default=timezone.now)
    data = models.JSONField()

    # Additional fields as needed

    def __str__(self):
        return f"{self.project} - {self.timestamp}"
