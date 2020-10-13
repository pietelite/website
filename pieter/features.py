from django.conf import settings

static_folder = settings.STATIC_URL


class Feature:

    def __init__(self, id, image, name='', width=100, height=100,
            destination='', aura='#FFFFFF', description=[], download=False,
            new_tab=True):
        self.id = id
        if name:
            self.name = name
        else:
            self.name = id
        self.image = image
        self.width = width
        self.height = height
        self.destination = destination
        self.aura = aura
        self.description = description
        self.download = download
        self.x_offset = -width/2
        self.y_offset = -height/2
        self.aura_size = max(width, height)/2
        self.new_tab = new_tab

stackoverflow = Feature('stackoverflow', static_folder + 'pieter/stackoverflow-white.png',
    name='Stack Overflow', width=70, height=90,
    destination='https://stackoverflow.com/users/11912161/pieter-svenson',
    aura='#EE8800',
    description=['The most popular online community for '\
                 'developers to learn and share knowledge'])

linkedin = Feature('linkedin', static_folder + 'pieter/linkedin-white.png',
    name='LinkedIn', width=80, height=80,
    destination='https://www.linkedin.com/in/pietersvenson',
    aura='#005192',
    description=['Professional social networking account'])

email = Feature('email', static_folder + 'pieter/mail-white.png',
    name='Email', width=110, height=110,
    destination='mailto:pieter2@illinois.edu',
    aura='#2A816E',
    description=['Send me a message if you want to get in touch',
                    'pieter.svenson@outlook.com'])

plansite = Feature('plansite', static_folder + 'pieter/hexagon.png',
    name='PlanSite', width=90, height=105,
    destination='https://www.plansite3d.com',
    aura='#5C0093',
    description=['Start-up in the Civil Engineering industry '\
                   'focusing on developing tools for the contracting process'])

github = Feature('github', static_folder + 'pieter/github.png',
    name='GitHub', #standard width/height
    destination='https://www.github.com/pietelite',
    aura='#BD0000',
    description=['My code respositories, including the one for this website'])

instagram = Feature('instagram', static_folder + 'pieter/instagram.png',
    name='Instagram', width=90, height=90,
    destination='https://instagram.com/pietelite',
    aura='#DD006B',
    description=['Casual social media account'])

resume = Feature('resume', static_folder + 'pieter/paper.png',
    name='Resume', width=110, height=110,
    destination=static_folder + 'pieter/pietersvenson-resume.pdf',
    aura='#DD006B',
    description=['Download my resume'],
    download=True,
    new_tab=False)
