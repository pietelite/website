from django.conf import settings

static_folder = settings.STATIC_URL

features  = [
    {
        'name': 'StackOverflow',
        'image': static_folder + 'pieter/stackoverflow-white.png',
        'width': 70,
        'height': 90,
        'destination': 'https://stackoverflow.com/users/11912161/pieter-svenson',
        'aura': '#FF9900'
    },
    {
        'name': 'LinkedIn',
        'image': static_folder + 'pieter/linkedin-white.png',
        'width': 80,
        'height': 80,
        'destination': 'https://www.linkedin.com/in/pietersvenson',
        'aura': '#0072b1'
    },
    {
        'name': 'PlanSite',
        'image': static_folder + 'pieter/hexagon.png',
        'width': 90,
        'height': 105,
        'destination': 'https://www.plansite3d.com',
        'aura': 'yellow'
    },
    {
        'name': 'Email',
        'image': static_folder + 'pieter/mail-white.png',
        'width': 110,
        'height': 110,
        'destination': 'mailto:pieter2@illinois.edu',
        'aura': 'green'
    },
    {
        'name': 'GitHub',
        'image': static_folder + 'pieter/github.png',
        'width': 100,
        'height': 100,
        'destination': 'https://www.github.com/pietelite',
        'aura': 'red'
    }
]

for feature in features:
    feature['aura_size'] = max(feature['width'], feature['height'])/2
