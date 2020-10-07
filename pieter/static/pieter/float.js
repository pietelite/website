import animate, {stop, delay} from "/static/pieter/animateplus.js"

const STAR_SIZE_RANGE = [0.5, 8];

/* (per thousand pixels squared (1 mil pixels)) */
const STAR_DENSITY = 700;

/* (pixels per second) */
const STAR_SPEED_RANGE = [5, 30];

/* [0:1]
 * A higher size variation means more
 * variation in which stars show in front of others
 */
const STAR_ZINDEX_VARIATION = 0.1;

/* [0:1]
 * A higher speed variation means more variation of speed
 * in stars of the same size.
 */
const STAR_SPEED_VARIATION = 0.3;

const ORBIT_RADIUS = 200;

const ORBIT_SPEED = 1;

/* possible star colors */
const STAR_PALETTE = [
    "FFFFFF",
    "C5FEF8",
    "DAF8FF",
    "FFFCCA",
    "FAF6AA",
    "FADFAA"
];

const random = (min, max) => Math.random() * (max - min) + min;

const vary = (value, variation) => value * random(1-variation/2, 1+variation/2);

const ratio = (value, min, max) => (value - min) / (max - min);

const float = (config) => {

    const run_stars = () => {

        const generate_stars = (count, left_pos, top_pos, visible) =>
            Array.from({length: count}, (_, index) => {
                var circle = document.createElement("span");
                const size = random(STAR_SIZE_RANGE[1], STAR_SIZE_RANGE[0]);
                Object.assign(circle.style, {
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${left_pos()}vw`,
                    top: `${top_pos()}vh`,
                    background: `#${STAR_PALETTE[Math.floor(random(0, STAR_PALETTE.length))]}`,
                    visibility: (visible ? 'visible' : 'hidden'),
                    zIndex: Math.floor(vary(ratio(size, STAR_SIZE_RANGE[0], STAR_SIZE_RANGE[1]) * star_count, STAR_ZINDEX_VARIATION))
                    });
                Object.assign(circle, {
                    class: 'star',
                    size: size,
                    speed: Math.floor(random(STAR_SPEED_RANGE[0], STAR_SPEED_RANGE[1])),
                    show: () => circle.style.visibility = 'visible',
                    hide: () => circle.style.visibility = 'hidden'
                });
                return circle;
            });

        const star_count = Math.round(STAR_DENSITY * window.innerHeight * window.innerWidth / 1000000);

        const orig_stars = generate_stars(star_count, () => random(0, 100), () => random(0, 100), true);
        const perm_stars = generate_stars(star_count, () => 100, () => random(0, 100), false);

        document.getElementById("universe").append(...orig_stars);
        document.getElementById("universe").append(...perm_stars);

        const duration_fun = (size) => {
            const star_size_ratio = (size - STAR_SIZE_RANGE[0]) / (STAR_SIZE_RANGE[1] - STAR_SIZE_RANGE[0]);
            const star_speed = (STAR_SPEED_RANGE[1] - STAR_SPEED_RANGE[0]) * star_size_ratio + STAR_SPEED_RANGE[0];
            return window.innerWidth / star_speed;
        }

        const duration_fun_var = (size) => vary(duration_fun(size), STAR_SPEED_VARIATION)

        const avg_duration = window.innerWidth * 2 / (STAR_SPEED_RANGE[1] + STAR_SPEED_RANGE[0])

        animate({
            elements: orig_stars,
            easing: "linear",
            duration: index => duration_fun_var(orig_stars[index].size) * 1000,
            transform: index => [
                `translate(0vw, -${Math.ceil(orig_stars[index].size/2)}px)`,
                `translate(-${Math.ceil(100 + orig_stars[index].size/(window.innerWidth)*100)}vw, -${Math.ceil(orig_stars[index].size/2)}px);`]
        })

        for (var i = 0; i < perm_stars.length; i++) {
            const star = perm_stars[i];
            const size = perm_stars[i].size;
            const show = perm_stars[i].show;
            delay(i / star_count * avg_duration * 1000).then((time) => {
                show();
                animate({
                    elements: star,
                    easing: "linear",
                    loop: true,
                    duration: duration_fun_var(size) * 1000,
                    transform: [`translate(0vw, -${Math.ceil(size/2)}px)`, `translate(-${Math.ceil(100 + size/(window.innerWidth)*100)}vw, -${Math.ceil(size/2)}px)`]
                })
            });
        }

    }

    /*
     * =========|
     * FEATURES |
     * =========|
     */

     const feature_containers = document.getElementsByClassName("feature-container");
     const feature_imgs = document.getElementsByClassName("feature-img");
     const feature_count = feature_containers.length

    /* ratio of orbit that the features have gone through */
    var orbit_progress = 0;
    var orbit_progress_reset = 0;

    const transform_feature = (index, start_scale, end_scale, start_rot, end_rot) => [`
        rotate(${-index/feature_count + 1 - orbit_progress_reset}turn)
        translate(${ORBIT_RADIUS}px)
        scale(${start_scale})
        rotate(${index/feature_count + start_rot + orbit_progress_reset}turn`,`

        rotate(${-index/feature_count - orbit_progress_reset}turn)
        translate(${ORBIT_RADIUS}px)
        scale(${end_scale})
        rotate(${index/feature_count + end_rot + 0.001 + orbit_progress_reset}turn)`
    ]

    const spin_start = () => animate({
        elements: ".feature-container",
        duration: 1000,
        easing: "in-out-cubic",
        transform: index => transform_feature(index, 1, 1, 0, 1),
    });

    const orbit = () => animate({
        elements: ".feature-container",
        duration: 60 * 1000 / ORBIT_SPEED,
        easing: "linear",
        loop: true,
        transform: index => transform_feature(index, 1, 1, 0, 1),
        change: p => {
            if (orbit_progress > 1) {
                orbit_progress -= 1
            } else {
                orbit_progress = orbit_progress_reset + p
            }
        }
    });

    const init_listeners = () => {
        for (var i = 0; i < feature_imgs.length; i++) {
            feature_imgs[i].feature_index = i;
            feature_imgs[i].addEventListener("mouseover", ({target}) => {
                stop(".feature-container");
                animate({
                    elements: target,
                    duration: 1500,
                    easing: "out-elastic 1.3 0.3",
                    transform: ["scale(1)", "scale(1.6)"]
                });

            });
            feature_imgs[i].addEventListener("mouseout", ({target}) => {
                stop(".feature-container");
                stop(".feature-img");
                orbit_progress_reset = orbit_progress;
                animate({
                    elements: target,
                    easing: "out-cubic",
                    duration: 300,
                    transform: ["scale(1.6)", "scale(1)"]
                })
                .then(options => orbit());
            });
        }
    }

    run_stars();
    spin_start().then(() => {init_listeners(); orbit();});


}

float();
