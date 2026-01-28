// xVS_wasm.js - A mod that will apply global Realistic Lighting, Shadows, and Water Effects for ALL elements (including addons)
// Features:
// - Dynamic colored light propagation from fire, lights, hot pixels, etc.
// - Realistic occlusion shadows (darker in crevices/caves), modulated by light intensity
// - Wavy foam on ALL liquids (water, oils, mod liquids)
// - Works with any mods/addons automatically (liquids get waves, all get lit/shadowed)
// Performance: Low-res lightmap + cached shadows = smooth even on large views

// ===== WASM LOADER (NON-MODULE VERSION) =====
let wasmReady = false;

// Load embedded WASM script
if (typeof Module === 'undefined') {
    const script = document.createElement('script');
    // Use absolute path if hosted on GitHub
    script.src = location.origin + location.pathname.replace(/[^/]*$/, '') + 'mods/xVS_cal_wasm.js';
    // Or if same folder: script.src = 'xVS_cal_wasm.js';
    script.onload = () => {
        Module.onRuntimeInitialized = () => {
            wasmReady = true;
            console.log("Realistic System: WASM ready (single-file)");
        };
    };
    script.onerror = () => {
        console.warn("WASM failed – using JS fallback");
        wasmReady = false;
    };
    document.head.appendChild(script);
}

// === LIGHTMAP SYSTEM ===
var lightmap = [];
var nextLightmap = [];
var lightmapScale = 4;
var lightSourceBoost = 3;
var falloff = 0.85;

function rgbToArray(colorString) {
    if (typeof colorString !== "string") return [255,255,255];
    if (colorString.startsWith("rgb")) {
        return colorString.slice(4, -1).split(",").map(val => parseInt(val.trim()));
    } else if (colorString.startsWith("#")) {
        let hex = colorString.slice(1);
        if (hex.length === 3) hex = hex.split("").map(char => char + char).join("");
        let r = parseInt(hex.slice(0, 2), 16);
        let g = parseInt(hex.slice(2, 4), 16);
        let b = parseInt(hex.slice(4, 6), 16);
        return [r, g, b];
    }
    return [255,255,255];
}

function scaleList(numbers, scale) {
    return numbers.map(number => number * scale);
}

function rgbToHsv(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;
    let d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max === min) h = 0;
    else {
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
    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);
    let r, g, b;
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

function initializeLightmap(w, h) {
    let lw = Math.ceil(w / lightmapScale) + 1;
    let lh = Math.ceil(h / lightmapScale) + 1;
    function createArray(width_, height_) {
        return Array.from({length: height_}, () => Array.from({length: width_}, () => ({color: [0, 0, 0]})));
    }
    lightmap = createArray(lw, lh);
    nextLightmap = createArray(lw, lh);
}

// === PROPAGATE LIGHTMAP (WASM OR JS) ===
function propagateLightmap() {
    if (!lightmap[0]) return;
    const width = lightmap[0].length;
    const height = lightmap.length;
    const total = width * height;

    if (wasmReady && Module) {
        try {
            const inR = new Float32Array(total);
            const inG = new Float32Array(total);
            const inB = new Float32Array(total);
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const idx = y * width + x;
                    const c = lightmap[y][x].color;
                    inR[idx] = c[0] || 0;
                    inG[idx] = c[1] || 0;
                    inB[idx] = c[2] || 0;
                }
            }

            const outR = new Float32Array(total);
            const outG = new Float32Array(total);
            const outB = new Float32Array(total);

            Module.ccall(
                'propagate_lightmap_f32',
                null,
                ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'],
                [
                    Module.HEAPF32.subarray(inR.byteOffset / 4, inR.byteOffset / 4 + total),
                    Module.HEAPF32.subarray(inG.byteOffset / 4, inG.byteOffset / 4 + total),
                    Module.HEAPF32.subarray(inB.byteOffset / 4, inB.byteOffset / 4 + total),
                    Module.HEAPF32.subarray(outR.byteOffset / 4, outR.byteOffset / 4 + total),
                    Module.HEAPF32.subarray(outG.byteOffset / 4, outG.byteOffset / 4 + total),
                    Module.HEAPF32.subarray(outB.byteOffset / 4, outB.byteOffset / 4 + total),
                    width, height, falloff
                ]
            );

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const idx = y * width + x;
                    nextLightmap[y][x].color = [outR[idx], outG[idx], outB[idx]];
                }
            }
        } catch (e) {
            console.error("WASM light propagation failed", e);
            wasmReady = false;
            return propagateLightmapJS();
        }
    } else {
        return propagateLightmapJS();
    }

    // Copy next → current
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            lightmap[y][x] = {...nextLightmap[y][x]};
        }
    }
}

function propagateLightmapJS() {
    const width = lightmap[0].length;
    const height = lightmap.length;
    const neighbors = [{dx:1,dy:0},{dx:-1,dy:0},{dx:0,dy:1},{dx:0,dy:-1}];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let totalColor = [0,0,0];
            let neighborCount = 0;
            for (const n of neighbors) {
                const nx = x + n.dx;
                const ny = y + n.dy;
                if (nx >= 0 && ny >= 0 && nx < width && ny < height) {
                    const c = lightmap[ny][nx].color;
                    totalColor[0] += c[0];
                    totalColor[1] += c[1];
                    totalColor[2] += c[2];
                    neighborCount++;
                }
            }
            const factor = neighborCount > 0 ? falloff / neighborCount : 0;
            nextLightmap[y][x].color = [
                Math.min(765, Math.max(0, totalColor[0] * factor)),
                Math.min(765, Math.max(0, totalColor[1] * factor)),
                Math.min(765, Math.max(0, totalColor[2] * factor))
            ];
        }
    }
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            lightmap[y][x] = {...nextLightmap[y][x]};
        }
    }
}

function renderLightmap(ctx) {
    if (!lightmap[0]) return;
    let lw = lightmap[0].length;
    let lh = lightmap.length;
    for (let y = 0; y < lh; y++) {
        for (let x = 0; x < lw; x++) {
            let color = lightmap[y][x].color;
            let r = color[0], g = color[1], b = color[2];
            if (r > 16 || g > 16 || b > 16) {
                let hsv = rgbToHsv(r, g, b);
                let newColor = hsvToRgb(hsv[0], hsv[1], 1);
                let alpha = hsv[2];
                ctx.globalAlpha = 1;
                ctx.fillStyle = `rgba(${newColor[0]},${newColor[1]},${newColor[2]},${alpha * 0.4})`;
                ctx.fillRect(x * pixelSize * lightmapScale, y * pixelSize * lightmapScale, pixelSize * lightmapScale, pixelSize * lightmapScale);
                ctx.fillStyle = `rgba(${newColor[0]},${newColor[1]},${newColor[2]},${alpha * 0.25})`;
                ctx.fillRect((x * pixelSize - pixelSizeHalf) * lightmapScale, (y * pixelSize - pixelSizeHalf) * lightmapScale,
                    pixelSize * lightmapScale * 2, pixelSize * lightmapScale * 2);
            }
        }
    }
}

function glowItsOwnColor(pixel) {
    if (!pixel.color) return;
    let x = Math.floor(pixel.x / lightmapScale);
    let y = Math.floor(pixel.y / lightmapScale);
    if (x < 0 || y < 0 || x >= lightmap[0]?.length || y >= lightmap?.length) return;
    lightmap[y][x].color = scaleList(rgbToArray(pixel.color), lightSourceBoost);
}

function glowPowered(pixel) {
    if (!pixel.charge || pixel.charge <= 0 || !pixel.color) return;
    glowItsOwnColor(pixel);
}

let lightEmitters = [
    "fire", "cold_fire", "plasma", "lava", "magma", "sun", "light", "liquid_light", "laser", "flash", "rainbow",
    "ember", "fw_ember", "explosion", "n_explosion", "supernova", "fireball", "blaster", "lightning", "electric",
    "positron", "neutron", "proton", "radiation", "fallout", "rad_cloud", "rad_steam", "uranium", "molten_uranium"
];
lightEmitters.forEach(elName => {
    let el = elements[elName];
    if (el && el.tick) {
        let origTick = el.tick;
        el.tick = function(pixel) {
            origTick(pixel);
            glowItsOwnColor(pixel);
        };
    }
});

["neon", "led", "light_bulb"].forEach(elName => {
    let el = elements[elName];
    if (el && el.tick) {
        let origTick = el.tick;
        el.tick = function(pixel) {
            origTick(pixel);
            glowPowered(pixel);
        };
    }
});

function glowTemp(pixel) {
    let t = pixel.temp;
    if (t < 500) return;
    let intensity = Math.min(1, (t - 500) / 2000);
    let r = Math.min(255, 100 + 155 * intensity);
    let g = Math.min(255, 50 * intensity);
    let b = Math.min(255, 10 * intensity);
    let x = Math.floor(pixel.x / lightmapScale);
    let y = Math.floor(pixel.y / lightmapScale);
    if (x < 0 || y < 0 || x >= lightmap[0]?.length || y >= lightmap?.length) return;
    lightmap[y][x].color = scaleList([r, g, b], lightSourceBoost * intensity);
}
runPerPixel(glowTemp);

renderPrePixel(function(ctx) {
    if (!paused) propagateLightmap();
    renderLightmap(ctx);
});

if (typeof runAfterReset !== 'undefined') {
    runAfterReset(() => initializeLightmap(width, height));
} else {
    setTimeout(() => initializeLightmap(width, height), 100);
}

// === SHADOWS (WASM ACCELERATED BLOCKER COUNT) ===
const DEFAULT_LIGHT_FACTOR = 0.8;
const MIN_LIGHT_INTENSITY = 0.4;
const MAX_DIRECT_NEIGHBORS = 4;
const FOLLOWUP_COORDS_TO_CHECK = [
    [-1,-1],[-1,1],[1,-1],[1,1],
    [-2,0],[2,0],[0,-2],[0,2],
    [-3,0],[3,0],[0,-3],[0,3],
    [-4,0],[4,0],[0,-4],[0,4]
];

let transparentElements = [];
function initTransparent() {
    transparentElements = [];
    Object.keys(elements).forEach(name => {
        let el = elements[name];
        if (el.state === "gas" || el.category === "special" || el.putInTransparentList) {
            transparentElements.push(name);
        }
    });
    ["glass", "stained_glass", "glass_shard", "ice", "led"].forEach(t => {
        if (!transparentElements.includes(t)) transparentElements.push(t);
    });
}
initTransparent();

let frameCounter = 0;
let pixelBrightnessCache = {};

function isOutOfBounds(x, y) {
    return x >= width || y >= height || x < 0 || y < 0;
}

function calculateBrightness(pixel) {
    let directNeighbors = 0;
    [[-1,0],[1,0],[0,-1],[0,1]].forEach(([dx,dy]) => {
        if (!isOutOfBounds(pixel.x + dx, pixel.y + dy)) directNeighbors++;
    });
    let outOfBounds = 4 - directNeighbors;
    if (directNeighbors + outOfBounds >= MAX_DIRECT_NEIGHBORS) {
        return adjustBrightness(computeBrightnessFurther(pixel));
    }
    return 1;
}

function computeBrightnessFurther(pixel) {
    if (!wasmReady || !Module) return computeBrightnessFurtherJS(pixel);

    // Build grid: 0=empty, 1=transparent, 2=opaque
    const lw = Math.min(1000, width);  // limit for performance
    const lh = Math.min(1000, height);
    const grid = new Uint8Array(lw * lh);
    for (let y = 0; y < lh; y++) {
        for (let x = 0; x < lw; x++) {
            if (isOutOfBounds(x, y)) {
                grid[y * lw + x] = 2; // treat OOB as opaque
            } else {
                let elName = pixelMap[x]?.[y]?.element;
                if (!elName) grid[y * lw + x] = 0;
                else if (transparentElements.includes(elName)) grid[y * lw + x] = 1;
                else grid[y * lw + x] = 2;
            }
        }
    }

    // Flatten coords
    const coordsFlat = new Int8Array(FOLLOWUP_COORDS_TO_CHECK.length * 2);
    for (let i = 0; i < FOLLOWUP_COORDS_TO_CHECK.length; i++) {
        coordsFlat[i * 2] = FOLLOWUP_COORDS_TO_CHECK[i][0];
        coordsFlat[i * 2 + 1] = FOLLOWUP_COORDS_TO_CHECK[i][1];
    }

    const blockers = new Uint8Array(lw * lh);
    try {
        Module.ccall(
            'compute_blockers_u8',
            null,
            ['number', 'number', 'number', 'number', 'number', 'number'],
            [
                Module.HEAPU8.subarray(grid.byteOffset, grid.byteOffset + grid.length),
                Module.HEAPU8.subarray(blockers.byteOffset, blockers.byteOffset + blockers.length),
                lw, lh,
                Module.HEAP8.subarray(coordsFlat.byteOffset, coordsFlat.byteOffset + coordsFlat.length),
                FOLLOWUP_COORDS_TO_CHECK.length
            ]
        );
        let px = Math.min(pixel.x, lw - 1);
        let py = Math.min(pixel.y, lh - 1);
        let blockerCount = blockers[py * lw + px];
        return 1 - (blockerCount / FOLLOWUP_COORDS_TO_CHECK.length);
    } catch (e) {
        console.warn("WASM shadow failed", e);
        wasmReady = false;
        return computeBrightnessFurtherJS(pixel);
    }
}

function computeBrightnessFurtherJS(pixel) {
    let blockers = 0;
    FOLLOWUP_COORDS_TO_CHECK.forEach(([dx,dy]) => {
        let nx = pixel.x + dx, ny = pixel.y + dy;
        if (isOutOfBounds(nx, ny)) {
            blockers++;
            return;
        }
        let elName = pixelMap[nx]?.[ny]?.element;
        if (elName && !transparentElements.includes(elName)) blockers++;
    });
    return 1 - (blockers / FOLLOWUP_COORDS_TO_CHECK.length);
}

function adjustBrightness(factor) {
    return factor * DEFAULT_LIGHT_FACTOR + MIN_LIGHT_INTENSITY;
}

function applyShadows(ctx) {
    if (frameCounter % 2 === 0) {
        currentPixels.forEach(pixel => {
            let brightness = calculateBrightness(pixel);
            pixelBrightnessCache[`${pixel.x},${pixel.y}`] = brightness;
        });
    }
    currentPixels.forEach(pixel => {
        let brightness = pixelBrightnessCache[`${pixel.x},${pixel.y}`] || 1;
        let lx = Math.floor(pixel.x / lightmapScale);
        let ly = Math.floor(pixel.y / lightmapScale);
        let lightInt = 0;
        if (ly >= 0 && ly < lightmap?.length && lx >= 0 && lx < lightmap[0]?.length) {
            let lm = lightmap[ly][lx].color;
            lightInt = (lm[0] + lm[1] + lm[2]) / (255 * 3);
        }
        let shadeAlpha = (1 - brightness) * 0.7 * Math.max(0.2, 1 - lightInt * 0.8);
        ctx.globalAlpha = shadeAlpha;
        ctx.fillStyle = "#000";
        ctx.fillRect(pixel.x * pixelSize, pixel.y * pixelSize, pixelSize, pixelSize);
    });
    frameCounter++;
}
renderPostPixel(applyShadows);

// === LIQUID WAVES (pure JS – too tied to rendering) ===
renderEachPixel(function(pixel, ctx) {
    let el = elements[pixel.element];
    if (el && el.state === "liquid") {
        let time = (pixelTicks * 0.01 + pixel.x * 0.15 + pixel.y * 0.03) % (Math.PI * 2);
        let waveOffset = Math.sin(time) * 0.35 - 0.15;
        let foamY = Math.floor(pixel.y + waveOffset);
        let foamAlpha = 0.6 + Math.sin(time * 1.5) * 0.3;
        let foamColor = "#e8f4ff";
        drawSquare(ctx, foamColor, pixel.x, foamY, 1, foamAlpha * 0.4);

        let lx = Math.floor(pixel.x / lightmapScale);
        let ly = Math.floor(pixel.y / lightmapScale);
        if (ly >= 0 && ly < lightmap?.length && lx >= 0 && lx < lightmap[0]?.length) {
            let lmBright = (lightmap[ly][lx].color[0] + lightmap[ly][lx].color[1] + lightmap[ly][lx].color[2]) / (255 * 3);
            if (lmBright > 0.2) {
                let causticAlpha = lmBright * 0.3;
                let causticX = pixel.x + Math.sin(time * 0.7) * 0.2;
                let causticY = pixel.y + 0.5 + Math.cos(time * 1.2) * 0.15;
                drawSquare(ctx, "#00ff88", causticX, causticY, 0.8, causticAlpha);
            }
        }
    }
});

if (typeof runEveryTick !== 'undefined') {
    runEveryTick(initTransparent);

}
