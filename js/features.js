class Feature {

    constructor(id, image, name, width, height, destination, aura,
                description, download, new_tab) {
        this.id = id;
        if (name) {
            this.name = name;
        } else {
            this.name = id;
        }
        this.image = image;
        this.width = width;
        this.height = height;
        this.destination = destination;
        this.aura = aura;
        this.description = description;
        this.download = download;
        this.x_offset = -width/2;
        this.y_offset = -height/2;
        this.aura_size = Math.max(width, height)/2;
        this.new_tab = new_tab;
    }
}

let stackoverflow = new Feature("stackoverflow",
    "img/stackoverflow-white.png",
    "Stack Overflow", 70, 90,
    "https://stackoverflow.com/users/11912161/pieter-svenson",
    "#EE8800",
    ["The most popular online community for "
     + "developers to learn and share knowledge"],
    false, true);

let linkedin = new Feature("linkedin",
    "img/linkedin-white.png",
    "LinkedIn", 80, 80,
    "https://www.linkedin.com/in/pietersvenson",
    "#005192",
    ["Connect on my professional social networking account"],
    false, true);

let email = new Feature("email",
    "img/mail-white.png",
    "Email", 110, 110,
    "mailto:pieter.svenson@outlook.com",
    "#268729",
    ["Send me a message if you want to get in touch",
        "pieter.svenson@outlook.com"],
    false, true);

let plansite = new Feature("plansite",
    "img/hexagon.png",
    "PlanSite", 90, 105,
    "https://www.plansite3d.com",
    "#5C0093",
    ["Start-up in the Civil Engineering industry "
    + "focusing on developing tools for the contracting process"],
    false, true);

let whimc = new Feature("whimc",
    "img/hexagon.png",
    "WHIMC", 90, 105,
    "https://whimcproject.web.illinois.edu/about/people/",
    "#5C0093",
    ["What-If Hypothetical Implementations in Minecraft"],
    false, true);

let github = new Feature("github",
    "img/github.png",
    "GitHub", 100, 100,
    "https://www.github.com/pietelite",
    "#BD0000",
    ["Explore my code, including the code for this website"],
    false, true);

let resume = new Feature("resume",
    "img/paper.png",
    "Resume", 110, 110,
    "pietersvenson-resume.pdf",
    "#DD006B",
    ["Download my latest resume"],
    true, false);

let instagram = new Feature("instagram",
    "img/instagram.png",
    "Instagram", 90, 90,
    "https://instagram.com/pietelite",
    "#DD006B",
    ["Casual social media account"],
    false, true);

export var features = [stackoverflow, linkedin, email, plansite, whimc, github, resume, instagram];
