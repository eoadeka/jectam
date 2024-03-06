from rest_framework import serializers
from .models import *


class ProjectSerializer(serializers.Serializer):
    class Meta:
        model = Project
        fields = ('title',
                  'three_word_description',
                  'description',
                  'created_at',
                  'updated_at',
                  'start_date',
                  'end_date',
                  'method',
                  'project_status',
                  'is_completed',
                  'is_archived',
                  )
        
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('title',
                  'project',
                  'description',
                  'due_date',
                  'category',
                  'assignee',
                  'status',
                  'priority',
                  'is_completed',
                  )
        
class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ('title',
                  'description',
                  'upload_date',
                  'project',
                  'file',
                  )