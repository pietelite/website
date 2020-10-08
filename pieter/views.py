from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse
from .features import feature_pool

def home(request):
    # The features we want to show in order
    # (data in feature_pool in features.py)
    features = ['stackoverflow', 'email', 'linkedin', 'instagram', 'plansite', 'github']

    context = {'features': [feature_pool[feature_name] for feature_name in features]}
    return HttpResponse(render(request, 'pieter/home.html', context))
