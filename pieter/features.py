from django.conf import settings

static_folder = settings.STATIC_URL

feature_pool = {
    'stackoverflow': {
        'name': 'Stack Overflow',
        'image': static_folder + 'pieter/stackoverflow-white.png',
        'width': 70,
        'height': 90,
        'destination': 'https://stackoverflow.com/users/11912161/pieter-svenson',
        'aura': '#EE8800',
        'description': ['The most popular online community for '\
                        'developers to learn and share knowledge']
    },
    'linkedin': {
        'name': 'LinkedIn',
        'image': static_folder + 'pieter/linkedin-white.png',
        'width': 80,
        'height': 80,
        'destination': 'https://www.linkedin.com/in/pietersvenson',
        'aura': '#005192',
        'description': ['Professional social networking account']
    },
    'email': {
        'name': 'Email',
        'image': static_folder + 'pieter/mail-white.png',
        'width': 110,
        'height': 110,
        'destination': 'mailto:pieter2@illinois.edu',
        'aura': '#2A816E',
        'description': ['Send me a message if you want to get in touch',
                        'pieter2@illinois.edu']
    },
    'plansite': {
        'name': 'PlanSite',
        'image': static_folder + 'pieter/hexagon.png',
        'width': 90,
        'height': 105,
        'destination': 'https://www.plansite3d.com',
        'aura': '#5C0093',
        'description': ['Start-up in the Civil Engineering industry '\
                       'focusing on developing tools for the contracting process']
    },
    'github': {
        'name': 'GitHub',
        'image': static_folder + 'pieter/github.png',
        'width': 100,
        'height': 100,
        'destination': 'https://www.github.com/pietelite',
        'aura': '#BD0000',
        'description': ['Hosting service for source code and version control']
    },
    'instagram': {
        'name': 'Instagram',
        'image': static_folder + 'pieter/instagram.png',
        'width': 90,
        'height': 90,
        'destination': 'https://instagram.com/pietelite/',
        'aura': '#DD006B',
        'description': ['Casual social media account']
    }
}

for feature in feature_pool:
    feature_pool[feature]['aura_size'] = max(feature_pool[feature]['width'], feature_pool[feature]['height'])/2
    feature_pool[feature]['x_offset'] = -feature_pool[feature]['width']/2
    feature_pool[feature]['y_offset'] = -feature_pool[feature]['height']/2
