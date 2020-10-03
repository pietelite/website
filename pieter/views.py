from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse
from .features import features as all_features

static_folder = settings.STATIC_URL


def home(request):
    context = {'features': all_features,
               'feature_count': len(all_features),
               'rough_feature_size': 100,
               'orbit_radius': 250,
               'orbit_speed': 100000,
               'static_url': static_folder}
    return HttpResponse(render(request, 'pieter/home.html', context))
