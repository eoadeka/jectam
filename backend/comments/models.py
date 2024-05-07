from django.db import models
import uuid
from django.utils.timezone import now
from accounts.models import *
from projects.models import *

# Create your models here.
class Comment(models.Model):
    comment_id = models.UUIDField(
        primary_key = True, 
        default = uuid.uuid4,
        editable = False, 
        unique=True
        )
    # comment = models.CharField(max_length=255)
    task = models.ForeignKey(Task, related_name='comment', on_delete=models.CASCADE)
    commenter = models.ForeignKey(CustomUser, related_name='comment', on_delete=models.CASCADE)
    comment = models.TextField()
    timeStamp = models.DateTimeField(default=now, blank=True)
    is_read = models.BooleanField(default=False)

    class Meta:
    #   abstract = True
      ordering = ['-timeStamp']

    # def __str__(self):
    #     return self.comment