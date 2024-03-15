from rest_framework import serializers
from .models import *
from accounts.serializers import UserProfileSerializer

class TaskSerializer(serializers.ModelSerializer):
    assignee = UserProfileSerializer(many=True, read_only=True)
    # assignee = serializers.SerializerMethodField('get_assignee')

    class Meta:
        model = Task
        # fields = '__all__'
        fields = ['title', 'description', 'due_date', 'category', 'status', 'priority', 'is_completed', 'project', 'assignee']
        extra_kwargs = {'assignee': {'required': False}}

    
    # def get_assignee(self, instance):
    #     assignee = instance.assignee.all()
    #     return UserProfileSerializer(assignee, many=True).data

class ProjectSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = '__all__'
        
        
class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'