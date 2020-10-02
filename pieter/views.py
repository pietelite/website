from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse
from .features import all_features

static_folder = settings.STATIC_URL

all_features = [
    {
        'name': 'GitHub',
        'image': static_folder + 'pieter/github.png',
        'width': 100,
        'height': 100,
        'destination': 'https://www.github.com/pietelite'
    },
    {
        'name': 'LinkedIn',
        'image': static_folder + 'pieter/linkedin.png',
        'width': 100,
        'height': 100,
        'destination': 'https://www.linkedin.com/in/pietersvenson'
    },
    {
        'name': 'StackOverflow',
        'image': static_folder + 'pieter/stackoverflow.png',
        'width': 90,
        'height': 90,
        'destination': 'https://stackoverflow.com/users/11912161/pieter-svenson'
    },
    {
        'name': 'Email',
        'image': static_folder + 'pieter/mail.png',
        'width': 90,
        'height': 90,
        'destination': 'mailto:pieter2@illinois.edu'
    },
    {
        'name': 'PlanSite',
        'image': static_folder + 'pieter/plansite.png',
        'width': 100,
        'height': 115,
        'destination': 'https://www.plansite3d.com'
    }
]


def home(request):
    context = {'features': all_features,
               'feature_count': len(all_features),
               'feature_size': 100,
               'orbit_radius': 250,
               'orbit_speed': 100000}
    return HttpResponse(render(request, 'pieter/home.html', context))
