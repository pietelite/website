from django.conf import settings

class Feature:
    test = "testing"

    def __init__(self, image, destination, static=True):
        self.image = image
        self.destination = destination
        self.static = static

    def zip(self):
        return {'image': self.image, 'destination': self.destination}


static_folder = settings.STATIC_URL

all_features = {
    'github': Feature(static_folder + 'pieter/github.png', 'https://www.github.com/pietelite').zip(),
    'linkedin': Feature(static_folder + 'pieter/linkedin.png', 'https://www.linkedin.com/in/pietersvenson').zip(),
    'stackoverflow': Feature(static_folder + 'pieter/stackoverflow.png', 'https://stackoverflow.com/users/11912161/pieter-svenson').zip(),
    'email': Feature(static_folder + 'pieter/mail.png', 'mailto:pieter2@illinois.edu').zip()
}
