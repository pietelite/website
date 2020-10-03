from django.conf import settings

static_folder = settings.STATIC_URL

features  = [
    {
        'name': 'StackOverflow',
        'image': static_folder + 'pieter/stackoverflow.png',
        'width': 90,
        'height': 90,
        'destination': 'https://stackoverflow.com/users/11912161/pieter-svenson',
        'aura': 'orange'
    },
    {
        'name': 'LinkedIn',
        'image': static_folder + 'pieter/linkedin.png',
        'width': 100,
        'height': 100,
        'destination': 'https://www.linkedin.com/in/pietersvenson',
        'aura': 'blue'
    },
    {
        'name': 'GitHub',
        'image': static_folder + 'pieter/github.png',
        'width': 100,
        'height': 100,
        'destination': 'https://www.github.com/pietelite',
        'aura': 'red'
    },
    {
        'name': 'Email',
        'image': static_folder + 'pieter/mail.png',
        'width': 90,
        'height': 90,
        'destination': 'mailto:pieter2@illinois.edu',
        'aura': 'green'
    },
    {
        'name': 'PlanSite',
        'image': static_folder + 'pieter/plansite.png',
        'width': 100,
        'height': 115,
        'destination': 'https://www.plansite3d.com',
        'aura': 'yellow'
    }
]

for feature in features:
    feature['aura_size'] = max(feature['width'], feature['height'])/2
