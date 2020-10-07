from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse
from .features import features as all_features

def home(request):
    context = {'features': all_features}
    return HttpResponse(render(request, 'pieter/home.html', context))
