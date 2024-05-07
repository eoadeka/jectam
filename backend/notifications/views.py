from django.shortcuts import render
from rest_framework import generics, status
from django.http import HttpResponse
from rest_framework.response import Response
from .models import notifications_collection
from .serializers import *
from rest_framework.pagination import PageNumberPagination
from djongo.models import DjongoManager
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.decorators import action
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated
from jectam_db import projectsDB
import uuid
from django.db.utils import DatabaseError


# Create your views here.
def notifications(request):
    return HttpResponse("<h1>Notifications</h1>")

def add_notification(request):
    records = {
        "author" : "Jane Doe",
        "project": "AutoTasker",
        "comment": "This is a default comment."
    }
    notifications_collection.insert_one(records)
    return HttpResponse("New notification")

def get_all_notifications(request):
    notifications = notifications_collection.find()
    # notifications = "notif"
    return HttpResponse(notifications)

class NotificationsListView(generics.ListAPIView):
    queryset = Notifications.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationsSerializer
    pagination_class = PageNumberPagination

    def get_team_members_list(self, customuser_id):
        team_members_collection = projectsDB['projects_project_team_members']
        team_members_cursor = team_members_collection.find({'customuser_id': customuser_id})

        # Extract user_id from each team member document
        team_members = [team_member['customuser_id'] for team_member in team_members_cursor]

        return team_members

    def get_queryset(self):
        user = self.request.user  # Assuming you're using authentication and user is available
        if user.is_authenticated:
            # print(user.id)

            # Get the team members associated with the user
            team_members = self.get_team_members_list(user.id)
            print(team_members)

            # Get the projects associated with the team members
            projects_id = Project.objects.filter(team_members__in=team_members).values_list('project_id', flat=True)
            projects = [str(project_id) for project_id in projects_id]

            try:
                notifications = Notifications.objects.filter(project__in=projects).order_by('created_at').distinct()
                print(notifications)
            except DatabaseError as e:
                print("Error occurred while fetching notifications:", e)
                notifications = None
            except Exception as e:
                print("Error occurred while fetching notifications:", e)
                notifications = None
            # for notification in notifications:
            #     print("Project:", notification.project)
            #     print("Notification:", notification.message)
            #     print("=" * 20)
            # print("good")
            return notifications
        else:
            # Return an empty queryset if the user is not authenticated
            return Notifications.objects.none()


class NotificationsMarkAllReadView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]

    def get_team_members_list(self, customuser_id):
        team_members_collection = projectsDB['projects_project_team_members']
        team_members_cursor = team_members_collection.find({'customuser_id': customuser_id})

        # Extract user_id from each team member document
        team_members = [team_member['customuser_id'] for team_member in team_members_cursor]

        return team_members


    def patch(self, request, *args, **kwargs):
        # Get the current user
        user = self.request.user

        # Get the team members associated with the user
        team_members = self.get_team_members_list(user.id)

        # Get the projects associated with the team members
        projects_id = Project.objects.filter(team_members__in=team_members).values_list('project_id', flat=True)
        projects = [str(project_id) for project_id in projects_id]

        # Filter notifications based on the projects
        notifications = Notifications.objects.filter(project__in=projects)

        # Mark all notifications as read for the current user
        notifications.update(is_read=True)

        return Response(status=status.HTTP_200_OK)

    
class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notifications.objects.all()
    serializer_class = NotificationsSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['patch'])
    def mark_all_read(self, request):
        try:
            # Update all notifications to mark them as read
            queryset = self.filter_queryset(self.get_queryset())
            queryset.update(is_read=True)
            return Response({'message': 'All notifications marked as read'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# @csrf_exempt
# def mark_notifications_as_read(request):
#     if request.method == 'PATCH':

#         # Get all unread notifications
#         notifications = Notifications.objects.filter(is_read=False)

#         notifications_collection.insert_one(records)

#         # Update each notification to mark it as read
#         for notification in notifications:
#             notification.is_read = True
#             notification.save()

#         return HttpResponse("Notifications marked as read")

