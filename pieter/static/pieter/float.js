import animate, {stop, delay} from "/static/pieter/animateplus.js"

const STAR_SIZE_RANGE = [0.5, 8];

/* (per thousand pixels squared (1 mil pixels)) */
const STAR_DENSITY = 300;

/* (pixels per second) */
const STAR_SPEED_RANGE = [5, 32];

/* [0:1]
 * A higher size variation means more
 * variation in which stars show in front of others
 */
const STAR_ZINDEX_VARIATION = 0.1;

/* [0:1]
 * A higher speed variation means more variation of speed
 * in stars of the same size.
 */
const STAR_SPEED_VARIATION = 0.5;

const ORBIT_RADIUS = 200;

const ORBIT_SPEED = 1;
const ORBIT_SPEED_INIT_SPIN = 25

/* duration of time to show elements sequentially, in milliseconds */
const SHOW_DURATION = 1000; /* 1000 */

/* possible star colors */
const STAR_PALETTE = [
    "FFFFFF",
    "C5FEF8",
    "DAF8FF",
    "FFFCCA",
    "FAF6AA",
    "FADFAA"
];

const has_cursor = window.matchMedia("(hover:hover)").matches;

const random = (min, max) => Math.random() * (max - min) + min;

const vary = (value, variation) => value * random(1-variation/2, 1+variation/2);

const ratio = (value, min, max) => (value - min) / (max - min);

const float = (config) => {

    /*
     * ======|
     * STARS |
     * ======|
     */

    const generate_stars = (count, left_pos, top_pos, visible) =>
        Array.from({length: count}, (_, index) => {
            var circle = document.createElement("span");
            const size = random(STAR_SIZE_RANGE[1], STAR_SIZE_RANGE[0]);
            Object.assign(circle.style, {
                position: 'absolute',
                width: `${size}px`,
                height: `${size}px`,
                left: `${left_pos()}vw`,
                top: `${top_pos()}vh`,
                background: `#${STAR_PALETTE[Math.floor(random(0, STAR_PALETTE.length))]}`,
                visibility: (visible ? 'visible' : 'hidden'),
                zIndex: Math.floor(vary(ratio(size, STAR_SIZE_RANGE[0], STAR_SIZE_RANGE[1]) * star_count, STAR_ZINDEX_VARIATION)),
                opacity: 0
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

    const show_stars = () => {
        animate({
            elements: orig_stars,
            easing: "linear",
            duration: SHOW_DURATION,
            opacity: [0, 1]
        });
        animate({
            elements: perm_stars,
            easing: "linear",
            duration: SHOW_DURATION,
            opacity: [0, 1]
        });
    };

    const float_stars = () => {

        animate({
            elements: orig_stars,
            easing: "linear",
            duration: index => duration_fun_var(orig_stars[index].size) * 1000,
            transform: index => [
                `translate(0vw, -${Math.ceil(orig_stars[index].size/2)}px)`,
                `translate(-${Math.ceil(100 + orig_stars[index].size/(window.innerWidth)*100)}vw, -${Math.ceil(orig_stars[index].size/2)}px);`]
        });

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
     * =======|
     * SYSTEM |
     * =======|
     */

    const feature_containers = document.getElementsByClassName("feature-container");
    const feature_imgs = document.getElementsByClassName("feature-img");
    const feature_auras = document.getElementsByClassName("feature-aura");
    const feature_texts = document.getElementsByClassName("feature-text");
    const feature_text_headers = document.getElementsByClassName("feature-header");
    const feature_text_descriptions = document.getElementsByClassName("feature-description");
    const feature_text_description_lines = document.getElementsByClassName("feature-description-line");
    const feature_links = document.getElementsByClassName("feature-link");
    const feature_count = feature_containers.length;

    let shift_system_x_offset = 0;
    let shift_system_y_offset = 0;

    if (window.innerWidth > window.innerHeight) {
        shift_system_x_offset = Math.floor((window.innerWidth - ORBIT_RADIUS*2) / 3) // arbitrary divide by 3
    } else {
        shift_system_y_offset = Math.floor((window.innerHeight - ORBIT_RADIUS*2) / 3) // arbitrary divide by 3
    }



    if (!has_cursor) {
        for (let i = 0; i < feature_links.length; i++) {
            // remove the hyperlink on the images
            var wrap = document.createElement("span");
            wrap.innerHTML = feature_links[i].innerHTML;
            wrap.className = feature_links[i].className;
            feature_links[i].parentNode.replaceChild(wrap, feature_links[i])

            // make the header look like a button
            Object.assign(feature_text_headers[i].style, {
                textAlign: "center",
                background: `${feature_auras[i].style.background}`,
                color: "#e0e0e0",
                margin: "4% 15% 4% 15%",
                padding: "4%",
                fontSize: "2em",
            });
            Object.assign(feature_text_descriptions[i].style, {
                padding: "0 10% 10% 10%"
            })
            for (let i = 0; i < feature_text_description_lines.length; i++) {
                Object.assign(feature_text_description_lines[i].style, {
                    textAlign: "center",
                    fontSize: "1.8em"
                });
            }
        }
    }

    const show_nucleus = () => animate({
        elements: "#pieter-head",
        easing: "linear",
        duration: SHOW_DURATION,
        opacity: [0, 1]
    });

    const init_spin_easing_duration = {
        easing: "in-out-quintic",
        duration: 60 * 1000 / ORBIT_SPEED_INIT_SPIN
    };

    const show_features = () => {
        animate({
            elements: ".feature-img",
            ...init_spin_easing_duration,
            opacity: [0, 1]
        });
        animate({
            elements: ".feature-aura",
            ...init_spin_easing_duration,
            opacity: [0, 1]
        });
    }

    const get_features_by_id = () => {
        let map = {};
        for (let i = 0; i < feature_containers.length; i++) {
            let feature_id = feature_containers[i].feature_id;
            map[feature_id] = {};
            map[feature_id]['container'] = feature_containers[i];
            map[feature_id]['text'] = feature_texts[i];
        }
        return map;
    }

    const features_by_id = get_features_by_id();

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
        ...init_spin_easing_duration,
        transform: index => transform_feature(index, 1, 1, 0, 1),
    });

    const shift_system = () => {
        animate({
            elements: "#pieter-system",
            easing: "in-out-quartic",
            duration: 60 * 1000 / ORBIT_SPEED_INIT_SPIN,
            transform: ["translate(0px, 0px)", `translate(-${shift_system_x_offset}px, -${shift_system_y_offset}px)`]
        });
    }

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

    /*
     * =====|
     * TEXT |
     * =====|
     */

    const welcome_message = document.getElementById("welcome");

    const show_welcome = () => {
        let animate_ret = animate({
            elements: "#welcome",
            easing: "linear",
            duration: SHOW_DURATION,
            opacity: [0, 1]
        });
        delay(SHOW_DURATION / 10).then(() => welcome_message.style.display = "block");
        return animate_ret;
    }

    const hide_welcome = () => new Promise(() => {
        animate({
            elements: "#welcome",
            easing: "linear",
            duration: SHOW_DURATION,
            opacity: [1, 0]
        }).then(() => welcome_message.style.display = "none");
    });

    let text_width = 0;
    let min_width = 225;
    let text_top_offset = 0;
    let text_left_offset = 0;
    if (window.innerWidth > window.innerHeight) {
        text_width = Math.max(Math.floor((window.innerWidth/2 - ORBIT_RADIUS + shift_system_x_offset) * 0.5), min_width);
        text_top_offset = window.innerHeight * 0.35;
        text_left_offset = (window.innerWidth*3/2 + ORBIT_RADIUS - shift_system_x_offset - text_width)/2;
        text_left_offset += 40; // arbitrary to attempt to center based on general feature img size
    } else {
        text_width = Math.floor(window.innerWidth * 0.7);
        text_top_offset = Math.max(window.innerHeight * 2/3, window.innerHeight / 2 + ORBIT_RADIUS - shift_system_y_offset + 100);
        text_left_offset = (window.innerWidth - text_width) / 2;
    }

    for (let i = 0; i < feature_texts.length; i++) {
        Object.assign(feature_texts[i].style, {
            top: `${text_top_offset}px`,
            left: `${text_left_offset}px`,
            width: `${text_width}px`,
            display: "none"
        });
    }

    const show_text = (element) => {
        element.style.display = "block";
        return animate({
            elements: element,
            duration: 300,
            easing: "linear",
            opacity: [0, 0.8]
        });
    }


    const hide_text = (element) => {
        return new Promise(() => {
            animate({
                elements: element,
                duration: 300,
                easing: "linear",
                opacity: [0.8, 0]
            }).then(() => element.style.display = "none");
        });
    }

    /*
     * ==========|
     * LISTENERS |
     * ==========|
     */

    const init_listeners = () => {
        for (let i = 0; i < feature_imgs.length; i++) {
            if (has_cursor) {
                feature_imgs[i].addEventListener("mouseover", ({target}) => {
                    stop(".feature-container");
                    animate({
                        elements: feature_imgs[i],
                        duration: 1500,
                        easing: "out-elastic 1.3 0.3",
                        transform: ["scale(1)", "scale(1.6)"]
                    });
                    show_text(feature_texts[i]);
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
                    });
                    hide_text(feature_texts[i]);
                    orbit();
                });
            } else {
                var disabled_feature_click = false;
                feature_imgs[i].addEventListener("click", ({target}) => {
                    if (!disabled_feature_click) {
                        show_text(feature_texts[i]).then(() => {
                            disabled_feature_click = true;
                            delay(2000).then(() => {
                                disabled_feature_click = false;
                                hide_text(feature_texts[i])
                            });
                        });
                    }
                });
            }
        }
    }

    delay(500).then(() => show_welcome().then(() => delay(500).then(() => {
        hide_welcome();
        show_nucleus().then(() => {
            shift_system();
            show_features();
            spin_start().then(() => {
                init_listeners();
                orbit();
                show_stars();
                float_stars();
            });
        })
    })));


}

document.addEventListener("DOMContentLoaded", () => float());
