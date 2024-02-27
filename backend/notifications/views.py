from django.shortcuts import render
from django.http import HttpResponse
from .models import notifications_collection

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
    