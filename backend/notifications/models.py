from django.db import models
# from djongo import models
from django.contrib.auth.models import User
from django.utils import timezone
from projects.models import Project, Task
from accounts.models import CustomUser
from jectam_db import notificationsDB

# Create your models here.
# Represent discussions or messages related to a project, capturing data such as sender, message content, timestamp, and associated project.
# class Discussion(models.Model):
#     # sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
#     message = models.TextField()
#     timestamp = models.DateTimeField(auto_now_add=True)
#     project = models.ForeignKey(Project, on_delete=models.CASCADE)

notifications_collection = notificationsDB['Notifications']

class Notifications(models.Model):

    TYPE_CHOICES = (
        ('task_assigned', 'Task Assigned'),
        ('task_completed', 'Task Completed'),
        ('deadline_passed', 'Deadline Passed'),
        ('added_new_tags', 'Added New Tasks'),
        ('asked_to_join', 'Asked to Join'),
        ('mentioned_you', 'Mentioned You'),
        ('commented', 'Commented'),
        # Add more notification types as needed
    )

    notificationID = models.AutoField(primary_key=True)
    notification_type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    recipient = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='notifications')
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='sent_notifications')
    message = models.TextField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, blank=True, null=True)
    task = models.ForeignKey(Task, on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return self.message
    
    class Meta:
        verbose_name_plural = 'Notifications'