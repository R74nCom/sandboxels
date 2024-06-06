// Redbirdly's Mod that adds a better light system
// if the mod is too laggy, use fast_lightmap.js

let lightmap = [];
let nextLightmap = [];
let lightmapWidth, lightmapHeight;
let pixelSizeQuarter = pixelSizeHalf / 2;
let lightmapScale = 2;

// Define RGB colors
let lightColor = [255, 223, 186];
let sunColor = [255*8, 210*8, 26*8];
let lampColor = [255*4, 223*4, 186*4];
let laserColor = [255, 0, 0]; 
let ledRColor = [255, 0, 0];
let ledGColor = [0, 255, 0];
let ledBColor = [0, 0, 255];
let fireColor = [255, 69, 0];
let plasmaColor = [160, 69, 255];
let coldFireColor = [0, 191, 255];
let magmaColor = [255, 140, 0];
let neonColor = [255*2, 60*2, 10*2];

function initializeLightmap(width, height) {
    lightmapWidth = Math.ceil(width / lightmapScale);
    lightmapHeight = Math.ceil(height / lightmapScale);
    
    for (let y = 0; y < lightmapHeight; y++) {
        lightmap[y] = [];
        nextLightmap[y] = [];
        for (let x = 0; x < lightmapWidth; x++) {
            lightmap[y][x] = { color: [0, 0, 0] };
            nextLightmap[y][x] = { color: [0, 0, 0] };
        }
    }
}

function deepCopy(source, target) {
    for (let y = 0; y < source.length; y++) {
        target[y] = [];
        for (let x = 0; x < source[y].length; x++) {
            target[y][x] = { ...source[y][x] };
        }
    }
}

function propagateLightmap() {
    if (!lightmap || !lightmap[0]) { return; }
    let width = lightmap[0].length;
    let height = lightmap.length;

    let neighbors = [
        { dx: 1, dy: 0 },
        { dx: -1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
    ];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let totalColor = [0, 0, 0];
            let neighborCount = 0;
            neighbors.forEach(({ dx, dy }) => {
                let nx = x + dx;
                let ny = y + dy;
                if (nx >= 0 && ny >= 0 && nx < width && ny < height) {
                    totalColor[0] += lightmap[ny][nx].color[0];
                    totalColor[1] += lightmap[ny][nx].color[1];
                    totalColor[2] += lightmap[ny][nx].color[2];
                    neighborCount++;
                }
            });
            nextLightmap[y][x] = {
                color: [
                    Math.min(Math.max(0, totalColor[0] / neighborCount * 0.8), 255*8),
                    Math.min(Math.max(0, totalColor[1] / neighborCount * 0.8), 255*8),
                    Math.min(Math.max(0, totalColor[2] / neighborCount * 0.8), 255*8)
                ]
            };
        }
    }

    deepCopy(nextLightmap, lightmap);
}

function rgbToHsv(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;

    let d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
        h = 0;
    } else {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, v];
}

function hsvToRgb(h, s, v) {
    let r, g, b;

    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function renderLightmap() {
    if (!canvas) { return; }
    if (!lightmap || !lightmap[0]) { return; }
    let context = canvas.getContext('2d');
    let width = lightmap[0].length;
    let height = lightmap.length;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let { color } = lightmap[y][x];
            let [r, g, b] = color;
            if (r > 0 || g > 0 || b > 0) {
                let [h, s, v] = rgbToHsv(r, g, b);
                let newColor = hsvToRgb(h, s, 1);
                let alpha = v;

                context.fillStyle = `rgba(${newColor[0]}, ${newColor[1]}, ${newColor[2]}, ${alpha*0.4})`;
                context.fillRect(
                    x * pixelSize * lightmapScale, 
                    y * pixelSize * lightmapScale, 
                    pixelSize * lightmapScale, 
                    pixelSize * lightmapScale
                );
                context.fillStyle = `rgba(${newColor[0]}, ${newColor[1]}, ${newColor[2]}, ${alpha * 0.25})`;
                context.fillRect(
                    (x * pixelSize - pixelSizeHalf) * lightmapScale, 
                    (y * pixelSize - pixelSizeHalf) * lightmapScale, 
                    pixelSize * lightmapScale * 2, 
                    pixelSize * lightmapScale * 2
                );
            }
        }
    }
}

elements.sun.tick = function(pixel) {
    let x = Math.floor(pixel.x / lightmapScale);
    let y = Math.floor(pixel.y / lightmapScale);
    lightmap[y][x] = { color: sunColor };
};

let originalLightTick = elements.light.tick;
elements.light.tick = function(pixel) {
    originalLightTick(pixel);
    let x = Math.floor(pixel.x / lightmapScale);
    let y = Math.floor(pixel.y / lightmapScale);
    lightmap[y][x] = { color: lightColor };
};

let originalLiquidLightTick = elements.liquid_light.tick;
elements.liquid_light.tick = function(pixel) {
    originalLiquidLightTick(pixel);
    let x = Math.floor(pixel.x / lightmapScale);
    let y = Math.floor(pixel.y / lightmapScale);
    lightmap[y][x] = { color: lightColor };
};

elements.magma.tick = function(pixel) {
    let x = Math.floor(pixel.x / lightmapScale);
    let y = Math.floor(pixel.y / lightmapScale);
    lightmap[y][x] = { color: fireColor };
};

elements.neon.tick = function(pixel) {
    if (!pixel.charge || pixel.charge <= 0) {return;}
    let x = Math.floor(pixel.x / lightmapScale);
    let y = Math.floor(pixel.y / lightmapScale);
    lightmap[y][x] = { color: neonColor };
};

elements.light_bulb.behaviorOn = null
elements.light_bulb.tick = function(pixel) {
    if (pixel.charge > 0) {pixel.lightIntensity = 10;}
    if (pixel.lightIntensity > 0) {
        let x = Math.floor(pixel.x / lightmapScale);
        let y = Math.floor(pixel.y / lightmapScale);
        lightmap[y][x] = { color: lampColor };
    }
    pixel.lightIntensity -= 1;
};

elements.led_r.tick = function(pixel) {
    if (pixel.charge > 0) {pixel.lightIntensity = 4;}
    if (pixel.lightIntensity > 0) {
        let x = Math.floor(pixel.x / lightmapScale);
        let y = Math.floor(pixel.y / lightmapScale);
        lightmap[y][x] = { color: ledRColor };
    }
    pixel.lightIntensity -= 1;
};

elements.led_g.tick = function(pixel) {
    if (pixel.charge > 0) {pixel.lightIntensity = 4;}
    if (pixel.lightIntensity > 0) {
        let x = Math.floor(pixel.x / lightmapScale);
        let y = Math.floor(pixel.y / lightmapScale);
        lightmap[y][x] = { color: ledGColor };
    }
    pixel.lightIntensity -= 1;
};

elements.led_b.tick = function(pixel) {
    if (pixel.charge > 0) {pixel.lightIntensity = 4;}
    if (pixel.lightIntensity > 0) {
        let x = Math.floor(pixel.x / lightmapScale);
        let y = Math.floor(pixel.y / lightmapScale);
        lightmap[y][x] = { color: ledBColor };
    }
    pixel.lightIntensity -= 1;
};

let originalLaserTick = elements.laser.tick;
elements.laser.tick = function(pixel) {
    originalLaserTick(pixel);
    let x = Math.floor(pixel.x / lightmapScale);
    let y = Math.floor(pixel.y / lightmapScale);
    lightmap[y][x] = { color: laserColor };
};

let originalFireTick2 = elements.fire.tick;
elements.fire.tick = function(pixel) {
    originalFireTick2(pixel);
    let x = Math.floor(pixel.x / lightmapScale);
    let y = Math.floor(pixel.y / lightmapScale);
    lightmap[y][x] = { color: fireColor };
};

elements.cold_fire.tick = function(pixel) {
    let x = Math.floor(pixel.x / lightmapScale);
    let y = Math.floor(pixel.y / lightmapScale);
    lightmap[y][x] = { color: coldFireColor };
};

elements.plasma.tick = function(pixel) {
    let x = Math.floor(pixel.x / lightmapScale);
    let y = Math.floor(pixel.y / lightmapScale);
    lightmap[y][x] = { color: plasmaColor };
};

// Wait for loading
// if it loads too soon then width will be undefined
setTimeout(() => { initializeLightmap(width, height); }, 700);

// Add code to functions instead of replacing them
let originalTick = tick;
tick = function() {
    originalTick();
    if (!paused) {propagateLightmap();}
};
// Even after updating tick(), setInterval still uses the old tick(), reset setInterval
resetInterval(tps);

let originalDrawPixels = drawPixels;
drawPixels = function(forceTick = false) {
    originalDrawPixels(forceTick);
    renderLightmap();
};
