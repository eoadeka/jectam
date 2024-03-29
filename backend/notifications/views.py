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
    serializer_class = NotificationsSerializer
    pagination_class = PageNumberPagination

class NotificationMarkAllReadView(generics.UpdateAPIView):
    queryset = Notifications.objects.all()
    serializer_class = NotificationsSerializer

    def patch(self, request, *args, **kwargs):
        notifications = self.get_queryset()
        notifications.update(is_read=True)
        return Response(status=status.HTTP_200_OK)
    
class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notifications.objects.all()
    serializer_class = NotificationsSerializer

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

