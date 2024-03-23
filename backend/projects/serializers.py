from rest_framework import serializers
from .models import *
from accounts.serializers import UserProfileSerializer
from comments.serializers import *

class TaskSerializer(serializers.ModelSerializer):
    # assignee = serializers.PrimaryKeyRelatedField(many=True,queryset=CustomUser.objects.all())
    assignee = UserProfileSerializer(many=True,read_only=True, required=False)
    # assignee = serializers.SerializerMethodField('get_assignee')
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = '__all__'
        # fields = ['task_id','title', 'description', 'due_date', 'category', 'status', 'priority', 'is_completed', 'project', 'assignee']
        # extra_kwargs = {'assignee': {'required': False}}

    # def create(self,validated_data):  #create method
    #     assignee = self.initial_data['assignee']
        
    #     assigneeInstances = []
        
    #     for genre in assignee:
    #         assigneeInstances.append(CustomUser.objects.get(pk = genre['id']))
    #     task = Task.objects.create(**validated_data)
    #     task.assignee.set(assigneeInstances)
    #     return task


    
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

class DocumentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentType
        fields = '__all__'

# class DocumentTemplateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DocumentTemplate
#         fields = '__all__'
