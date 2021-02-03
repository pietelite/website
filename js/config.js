
export const FEATURES = [/*"stackoverflow", */"linkedin",
    "email", /* plansite, */"whimc", "github", "resume"];

/* duration of time to show elements sequentially, in milliseconds */
export const SHOW_DURATION = 1000;

export const STAR_SIZE_RANGE = [0.5, 8];

/* (per thousand pixels squared (1 mil pixels)) */
export const STAR_DENSITY = 50;

/* (pixels per second) */
export const STAR_SPEED_RANGE = [5, 32];

/* [0:1]
 * A higher size variation means more
 * variation in which stars show in front of others
 */
export const STAR_ZINDEX_VARIATION = 0.1;

/* [0:1]
 * A higher speed variation means more variation of speed
 * in stars of the same size.
 */
export const STAR_SPEED_VARIATION = 0.5;

export const ORBIT_RADIUS = 200;

export const ORBIT_SPEED = 1;
export const ORBIT_SPEED_INIT_SPIN = 25;

/* (milliseconds) */
export const MOBILE_SHOW_DESCRIPTION_DELAY = 3500;

/* possible star colors */
export const STAR_PALETTE = [
    "FFFFFF",
    "C5FEF8",
    "DAF8FF",
    "FFFCCA",
    "FAF6AA",
    "FADFAA"
];
