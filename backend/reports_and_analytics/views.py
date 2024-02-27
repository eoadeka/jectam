from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def reports_and_analytics(requests):
    return HttpResponse("<h1>Reports and Analytics</h1>")