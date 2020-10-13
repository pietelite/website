from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse
from .features import *

def home(request):
    # The features we want to show in this order counter-clockwise
    features = [stackoverflow, email, linkedin, resume, plansite, github]

    context = {'features': [feature.__dict__ for feature in features]}
    return HttpResponse(render(request, 'pieter/home.html', context))
