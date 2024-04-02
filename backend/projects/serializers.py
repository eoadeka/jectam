from rest_framework import serializers
from .models import *
from accounts.serializers import UserProfileSerializer
from comments.serializers import *
from jectam_db import projectsDB
from bson.json_util import dumps

class AssigneeSerializer(serializers.Serializer):
    def to_representation(self, instance):
        assignee_collection = projectsDB['projects_task_assignee']
        print(instance)

        # Query all assignees
        assignees_cursor = assignee_collection.find({'task_id': instance})

        # Convert the cursor object to a list of dictionaries
        assignees = [assignee for assignee in assignees_cursor]

        # Serialize the data to JSON using bson.json_util.dumps
        assignees_json = dumps(assignees)

        # Return the list of assignees as a JSON response
        return assignees_json


class TaskSerializer(serializers.ModelSerializer):
    # assignee = serializers.PrimaryKeyRelatedField(many=True,queryset=CustomUser.objects.all())
    # assignee = UserProfileSerializer(many=True,required=False)
    # assignee = serializers.SerializerMethodField('get_assignee')
    assignees_list = serializers.SerializerMethodField('get_assignee')
    # assignee = AssigneeSerializer()
    # assignee = serializers.ListField(child=serializers.CharField())

    # comments = CommentSerializer(many=True, read_only=True)

    def get_assignee(self, obj):
        # assignees = obj.assignee.all()
        # return [assignee.get_full_name() for assignee in assignees]
        assignee_collection = projectsDB['projects_task_assignee']

        # Query all assignees
        assignees_cursor = assignee_collection.find({'task_id': obj.task_id})

        # Extract user_id from each assignee document
        user_ids = [assignee['customuser_id'] for assignee in assignees_cursor]

         # Get the custom user model
        CustomUser = get_user_model()

        # Fetch user details from CustomUser model and extract email address
        assignee_details = []
        for user_id in user_ids:
            try:
                user = CustomUser.objects.get(pk=user_id)
                assignee_data = {
                    'user_id': user_id,
                    'email': user.email,
                    'full_name': user.get_full_name(),
                    'profile_picture': user.profile_picture.url if user.profile_picture else None
                }
                assignee_details.append(assignee_data)
            except CustomUser.DoesNotExist:
                assignee_details.append(None)

        return assignee_details

    class Meta:
        model = Task
        # fields = '__all__'
        fields = ['task_id','title', 'description', 'due_date', 'category', 'status', 'priority', 'is_completed', 'project', 'assignee', 'assignees_list']
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
