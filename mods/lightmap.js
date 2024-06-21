// Redbirdly's Mod that adds a better light system
// if the mod is too laggy, use fast_lightmap.js

var lightmap = [];
var nextLightmap = [];
var lightmapWidth, lightmapHeight;
var lightmapScale = 2;
var pixelSizeQuarter = pixelSizeHalf / 2;

// Define RGB colors
var fireColor = [255, 69, 0];
var coldFireColor = [0, 191, 255];
var fireflyColor = [240, 255, 70];
var radColor = [75, 100, 30];
var strangeMatterColor = [220 * 0.3, 255 * 0.3, 210 * 0.3];
var sparkColors = [[255, 210, 120], [255, 140, 10]];

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function rgbToArray(rgbString) {
    return rgbString.slice(4, -1).split(',').map(val => parseInt(val.trim()));
}

function scaleList(numbers, scale) {
    return numbers.map(number => number * scale);
}

function initializeLightmap(width, height) {
    lightmapWidth = Math.ceil(width / lightmapScale);
    lightmapHeight = Math.ceil(height / lightmapScale);

    for (var y = 0; y < lightmapHeight; y++) {
        lightmap[y] = [];
        nextLightmap[y] = [];
        for (var x = 0; x < lightmapWidth; x++) {
            lightmap[y][x] = { color: [0, 0, 0] };
            nextLightmap[y][x] = { color: [0, 0, 0] };
        }
    }
}

function deepCopy(source, target) {
    for (var y = 0; y < source.length; y++) {
        target[y] = [];
        for (var x = 0; x < source[y].length; x++) {
            target[y][x] = { ...source[y][x] };
        }
    }
}

function propagateLightmap() {
    if (!lightmap || !lightmap[0]) return;

    var width = lightmap[0].length;
    var height = lightmap.length;

    var neighbors = [
        { dx: 1, dy: 0 },
        { dx: -1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
    ];

    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var totalColor = [0, 0, 0];
            var neighborCount = 0;

            neighbors.forEach(({ dx, dy }) => {
                var nx = x + dx;
                var ny = y + dy;
                if (nx >= 0 && ny >= 0 && nx < width && ny < height) {
                    totalColor[0] += lightmap[ny][nx].color[0];
                    totalColor[1] += lightmap[ny][nx].color[1];
                    totalColor[2] += lightmap[ny][nx].color[2];
                    neighborCount++;
                }
            });

            nextLightmap[y][x] = {
                color: [
                    Math.min(Math.max(0, totalColor[0] / neighborCount * 0.8), 255 * 8),
                    Math.min(Math.max(0, totalColor[1] / neighborCount * 0.8), 255 * 8),
                    Math.min(Math.max(0, totalColor[2] / neighborCount * 0.8), 255 * 8)
                ]
            };
        }
    }

    deepCopy(nextLightmap, lightmap);
}

function rgbToHsv(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;

    var d = max - min;
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
    var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function renderLightmap() {
    if (!canvas) return;
    if (!lightmap || !lightmap[0]) return;

    var context = canvas.getContext('2d');
    var width = lightmap[0].length;
    var height = lightmap.length;

    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var { color } = lightmap[y][x];
            var [r, g, b] = color;

            if (r > 0 || g > 0 || b > 0) {
                var [h, s, v] = rgbToHsv(r, g, b);
                var newColor = hsvToRgb(h, s, 1);
                var alpha = v;

                context.fillStyle = `rgba(${newColor[0]}, ${newColor[1]}, ${newColor[2]}, ${alpha * 0.4})`;
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

function glowItsOwnColor(pixel) {
    if (!pixel.color) {return;}
    var x = Math.floor(pixel.x / lightmapScale);
    var y = Math.floor(pixel.y / lightmapScale);
    lightmap[y][x] = { color: rgbToArray(pixel.color) };
}

function glowItsOwnColorIfPowered(pixel) {
    if (!pixel.charge || pixel.charge <= 0) {return;}
    if (!pixel.color) return;
    var x = Math.floor(pixel.x / lightmapScale);
    var y = Math.floor(pixel.y / lightmapScale);
    lightmap[y][x] = { color: rgbToArray(pixel.color) };
}

function glowColor(pixel, color) {
    if (!color) {return;}
    var x = Math.floor(pixel.x / lightmapScale);
    var y = Math.floor(pixel.y / lightmapScale);
    lightmap[y][x] = { color: color };
}

function glowRadiationColor(pixel) {
    var x = Math.floor(pixel.x / lightmapScale);
    var y = Math.floor(pixel.y / lightmapScale);
    lightmap[y][x] = { color: radColor };
}


// Define element tick functions
var originalStrangeMatterTick = elements.strange_matter.tick;
elements.strange_matter.tick = function(pixel) {
    originalStrangeMatterTick(pixel);
    glowColor(pixel, strangeMatterColor);
};

var originalLightTick = elements.light.tick;
elements.light.tick = function(pixel) {
    originalLightTick(pixel);
    glowItsOwnColor(pixel);
};

var originalLiquidLightTick = elements.liquid_light.tick;
elements.liquid_light.tick = function(pixel) {
    originalLiquidLightTick(pixel);
    glowItsOwnColor(pixel);
};

var originalLaserTick = elements.laser.tick;
elements.laser.tick = function(pixel) {
    originalLaserTick(pixel);
    glowColor(pixel, scaleList(rgbToArray(pixel.color), 0.5));
};

var originalFireTick2 = elements.fire.tick;
elements.fire.tick = function(pixel) {
    originalFireTick2(pixel);
    glowColor(pixel, fireColor);
};

var originalFlashTick = elements.flash.tick;
elements.flash.tick = function(pixel) {
    originalFlashTick(pixel);
    glowItsOwnColor(pixel);
};

var originalRainbowTick = elements.rainbow.tick;
elements.rainbow.tick = function(pixel) {
    originalRainbowTick(pixel);
    glowItsOwnColor(pixel);
};

var originalFireflyTick = elements.firefly.tick;
elements.firefly.tick = function(pixel) {
    originalFireflyTick(pixel);

    var x = Math.floor(pixel.x / lightmapScale);
    var y = Math.floor(pixel.y / lightmapScale);

    var tickMod = pixelTicks % pixel.fff;
    var num;

    if (tickMod <= 2) num = 1;
    else if (tickMod <= 3) num = 0.75;
    else if (tickMod <= 4) num = 0.5;
    else if (tickMod <= 5) num = 0.25;
    else return;

    lightmap[y][x] = { color: scaleList(fireflyColor, num) };
};

elements.electric.tick = pixel => glowColor(pixel, scaleList(getRandomElement(sparkColors), 0.5));

elements.neon.tick = glowItsOwnColorIfPowered;
elements.led_r.tick = glowItsOwnColorIfPowered;
elements.led_g.tick = glowItsOwnColorIfPowered;
elements.led_b.tick = glowItsOwnColorIfPowered;
elements.light_bulb.behaviorOn = null;
elements.light_bulb.tick = glowItsOwnColorIfPowered;
elements.sun.tick = glowItsOwnColor;
elements.magma.tick = glowItsOwnColor;
elements.plasma.tick = glowItsOwnColor;
elements.fw_ember.tick = glowItsOwnColor;

elements.cold_fire.tick = pixel => glowColor(pixel, coldFireColor);

// Radioactive elements
var radioactiveElements = [
    "uranium", "radiation", "rad_glass", "fallout",
    "molten_uranium", "rad_shard", "rad_cloud", "rad_steam"
];
radioactiveElements.forEach(element => {
    elements[element].tick = glowRadiationColor;
});

window.addEventListener('load', () => initializeLightmap(width, height));

var originalTick = tick;
tick = function() {
    originalTick();
    if (!paused) propagateLightmap();
};
resetInterval(tps);

var originalDoFrame = doFrame;
doFrame = function() {
    originalDoFrame();
    propagateLightmap();
};

if (enabledMods.includes("mods/velocity.js")) {
    runAfterAutogen(() => {
        var originalDrawPixels = drawPixels;
        drawPixels = function(forceTick = false) {
            originalDrawPixels(forceTick);
            renderLightmap();
        };
    });
} else {
    var originalDrawPixels = drawPixels;
    drawPixels = function(forceTick = false) {
        originalDrawPixels(forceTick);
        renderLightmap();
    };
}
