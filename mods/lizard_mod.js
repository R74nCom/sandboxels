// lizard_mod.js by @RedBirdly

function blendColors(color1, color2, ratio = 0.5) {
    // Convert the colors to RGB
    const rgb1 = parseColor(color1);
    const rgb2 = parseColor(color2);

    // Calculate the blended color
    const blendedColor = [
        Math.round(rgb1[0] * (1 - ratio) + rgb2[0] * ratio), // Red
        Math.round(rgb1[1] * (1 - ratio) + rgb2[1] * ratio), // Green
        Math.round(rgb1[2] * (1 - ratio) + rgb2[2] * ratio)  // Blue
    ];

    // Convert the blended color back to a CSS color string
    return `rgb(${blendedColor[0]}, ${blendedColor[1]}, ${blendedColor[2]})`;
}


function parseColor(color) {
    // Create a temporary div to parse the color
    const div = document.createElement('div');
    div.style.color = color;
    document.body.appendChild(div);

    // Get the computed color
    const computedColor = getComputedStyle(div).color;

    // Remove the temporary div
    document.body.removeChild(div);

    // Parse the computed color into RGB values
    const match = computedColor.match(/\d+/g);
    return match.map(Number);
}

// dark red, dark green, brown, dark gray, light gray, lime
let lizard_colors = ["#4d2f2a", "#356641", "#85754d", "#3c3c3c", "#A1A1A1", "#98fb98"];

// camouflage function for lizards
function camo(pixel) {
    if (!paused) {
        // set camouflage color to random color
        if (Math.random() < 0.002) {
            let n = Math.floor(Math.random() * lizard_colors.length);
            pixel.color = lizard_colors[n];
        }
        // set camouflage color to random color but make it slightly gray because camouflage isn't perfect
        if (Math.random() < 0.1) {
            for (let i = 0; i < currentPixels.length; i++) {
                let x = currentPixels[i].x;
                let y = currentPixels[i].y;
                let dx = Math.abs(x - pixel.x);
                let dy = Math.abs(y - pixel.y);
                if (dx <= 1 && dy <= 1 && currentPixels[i].element != "lizard") {
                    pixel.color = blendColors(blendColors(currentPixels[i].color, "#887766", 0.4), pixel.color);
                    break;
                }
            }
        }
    }
}

// define element
elements.lizard = {
    color: lizard_colors,
    behavior: [
        "ST%98|M1%6|ST%98",
        "XX|XX|M2%20 AND BO",
        "XX|M1%80|M2",
    ],
    tick: camo,
    tempHigh: 100,
    stateHigh: "ash",
    tempLow: 0,
    stateLow: "dead_bug",
    breakInto: "dead_bug",
    category: "life",
    burn: 95,
    burnTime: 25,
    state: "solid",
    density: 500,
    conduct: 0.15,
    reactions: {
        "bird": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
        "plant": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
        "tomato": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
        "fly": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
        "ant": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
    }
};
