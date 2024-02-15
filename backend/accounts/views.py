from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

def accounts(request):
    return HttpResponse("<h1>Accounts</h1>")