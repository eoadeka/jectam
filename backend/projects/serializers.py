from rest_framework import serializers
from .models import *
from accounts.serializers import UserProfileSerializer
from comments.serializers import *
from jectam_db import projectsDB
from bson.json_util import dumps
from django.core.exceptions import ObjectDoesNotExist


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
    # assignee = serializers.ListField(child=serializers.IntegerField(), allow_empty=True, required=False)
    # assignee = serializers.PrimaryKeyRelatedField(many=True,queryset=CustomUser.objects.all())
    # assignee = UserProfileSerializer(many=True,required=False)
    # assignee = serializers.SerializerMethodField('get_assignee')
    assignees_list = serializers.SerializerMethodField()
    # assignee = AssigneeSerializer()
    # assignee = serializers.ListField(child=serializers.CharField())

    # comments = CommentSerializer(many=True, read_only=True)

    def get_assignees_list(self, obj):
        # Get the custom user model
        CustomUser = get_user_model()

        try:
            # assignees = obj.assignee.all()
            # return [assignee.get_full_name() for assignee in assignees]
            assignee_collection = projectsDB['projects_task_assignee']

            # Query all assignees
            assignees_cursor = assignee_collection.find({'task_id': obj.task_id})

            # Extract user_id from each assignee document
            user_ids = [assignee['customuser_id'] for assignee in assignees_cursor]

            # Fetch user details from CustomUser model and extract email address
            assignee_details = []
            for user_id in user_ids:
                try:
                    user = CustomUser.objects.get(pk=user_id)
                    # print("Retrieved user:", user)
                    assignee_data = {
                        'user_id': user_id,
                        'email': user.email,
                        'role': user.role,
                        'full_name': user.get_full_name(),
                        'profile_picture': user.profile_picture.url if user.profile_picture else None
                    }
                    assignee_details.append(assignee_data)
                    # print(assignee_data)
                except CustomUser.DoesNotExist:
                    assignee_details.append(None)
                    print(f"Warning: User with ID {user_id} does not exist in the database.")
            return assignee_details       
        except ObjectDoesNotExist:
            print("warning")
            # If no team members exist, insert one or more
            new_assignees = []
            # Your logic to create new team members goes here
            # Append new team members to the list new_team_members
            # Example:
            # new_team_members.append({'user_id': 'new_user_id', 'email': 'new_user_email', 'full_name': 'New User', 'profile_picture': None})
            
            # Insert new team members to the database
            for assignee in new_assignees:
                assignee_collection.insert_one({'project_id': obj.project_id, 'customuser_id': assignee['user_id']})

            return new_assignees

    class Meta:
        model = Task
        # fields = '__all__'
        fields = ['task_id','title', 'description', 'created_at', 'due_date', 'category', 'status', 'priority', 'is_completed', 'project', 'assignee', 'assignees_list']
        extra_kwargs = {'assignee': {'required': False}}

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
    team_members_list = serializers.SerializerMethodField()

    def get_team_members_list(self, obj):
        # Get the custom user model
        CustomUser = get_user_model()

        try:
            # Query all team members for the project
            team_members_collection = projectsDB['projects_project_team_members']
            team_members_cursor = team_members_collection.find({'project_id': obj.project_id})

            # Extract user_id from each team member document
            user_ids = [team_member['customuser_id'] for team_member in team_members_cursor]

            # Fetch user details from CustomUser model and extract email address
            team_member_details = []
            for user_id in user_ids:
                try:
                    user = CustomUser.objects.get(pk=user_id)
                    team_member_data = {
                        'user_id': user_id,
                        'email': user.email,
                        'role': user.role,
                        'full_name': user.get_full_name(),
                        'profile_picture': user.profile_picture.url if user.profile_picture else None
                    }
                    team_member_details.append(team_member_data)
                    # print(team_member_data)
                except CustomUser.DoesNotExist:
                    team_member_details.append(None)
                    print(f"Warning: User with ID {user_id} does not exist in the database.")

            return team_member_details

        except ObjectDoesNotExist:
            print("warning")
            # If no team members exist, insert one or more
            new_team_members = []
            # Your logic to create new team members goes here
            # Append new team members to the list new_team_members
            # Example:
            # new_team_members.append({'user_id': 'new_user_id', 'email': 'new_user_email', 'full_name': 'New User', 'profile_picture': None})
            
            # Insert new team members to the database
            for team_member in new_team_members:
                team_members_collection.insert_one({'project_id': obj.project_id, 'customuser_id': team_member['user_id']})

            return new_team_members
    
    class Meta:
            model = Project
            # fields = '__all__'
            fields = ['project_id','title','slug','created_by', 'three_word_description', 'description', 'start_date', 'end_date', 'method', 'project_status', 'is_completed', 'tasks', 'team_members', 'team_members_list']
            extra_kwargs = {'team_members': {'required': False}}

        

        # def get_team_members(self, obj):
        #     # assignees = obj.assignee.all()
        #     # return [assignee.get_full_name() for assignee in assignees]
        #     team_members_collection = projectsDB['projects_project_team_members']

        #     # Query all assignees
        #     team_members_cursor = team_members_collection.find({'project_id': obj.project_id})

        #     # Extract user_id from each assignee document
        #     user_ids = [team_member['customuser_id'] for team_member in team_members_cursor]

        #      # Get the custom user model
        #     CustomUser = get_user_model()

        #     # Fetch user details from CustomUser model and extract email address
        #     team_member_details = []
        #     for user_id in user_ids:
        #         try:
        #             user = CustomUser.objects.get(pk=user_id)
        #             print("Retrieved user:", user)
        #             team_member_data = {
        #                 'user_id': user_id,
        #                 'email': user.email,
        #                 'full_name': user.get_full_name(),
        #                 'profile_picture': user.profile_picture.url if user.profile_picture else None
        #             }
        #             team_member_details.append(team_member_data)
        #         except CustomUser.DoesNotExist:
        #             team_member_details.append(None)

        #     return team_member_details
        
        # def create_team_member(self, obj, user_email):
        #     CustomUser = get_user_model()
        #     try:
        #         user = CustomUser.objects.get(email=user_email)
        #         team_member_data = {
        #             'user_id': user.id,
        #             'email': user.email,
        #             'full_name': user.get_full_name(),
        #             'profile_picture': user.profile_picture.url if user.profile_picture else None
        #         }
        #         # Save the new team member to the database
        #         team_members_collection = projectsDB['projects_project_team_members']
        #         team_members_collection.insert_one({'project_id': obj.project_id, 'customuser_id': user.id})
        #         return team_member_data
        #     except CustomUser.DoesNotExist:
        #         return None
            
        # def get_or_create_team_member(self, obj):
        #     # Check if the project object has a valid project_id
        #     if obj.project_id:
        #         # Fetch or create team members for the project based on the project_id
        #         team_members_collection = projectsDB['projects_project_team_members']
        #         team_members_cursor = team_members_collection.find({'project_id': obj.project_id})

        #         # Extract user_id from each team member document
        #         user_ids = [team_member['customuser_id'] for team_member in team_members_cursor]

        #         # Get the custom user model
        #         CustomUser = get_user_model()

        #         # Fetch user details from CustomUser model and extract email address
        #         team_member_details = []
        #         for user_id in user_ids:
        #             try:
        #                 user = CustomUser.objects.get(pk=user_id)
        #                 team_member_data = {
        #                     'user_id': user_id,
        #                     'email': user.email,
        #                     'full_name': user.get_full_name(),
        #                     'profile_picture': user.profile_picture.url if user.profile_picture else None
        #                 }
        #                 team_member_details.append(team_member_data)
        #             except CustomUser.DoesNotExist:
        #                 team_member_details.append(None)

        #         return team_member_details
        #     else:
        #         return None

        # def to_representation(self, instance):
        #     representation = super().to_representation(instance)
        #     # Replace team_members field with the list of team members
        #     representation['team_members'] = self.get_or_create_team_member(instance)
        #     return representation


      
        
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
