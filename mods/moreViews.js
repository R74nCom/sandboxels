if (!enabledMods.includes("mods/betterSettings.js")) { enabledMods.unshift("mods/betterSettings.js"); localStorage.setItem("enabledMods", JSON.stringify(enabledMods)); alert("'betterSettings.js' is a dependency for 'moreViews.js' and has been added. Please reload for it to take effect.") }
else {
const views = [
    // default sandboxels
    "Default View",
    "",
    "Thermal View",
    "Basic View",
    "Smooth View",
    // custom
    "3D View",
    "Inverted",
    "Darker",
    "Brighter",
    "Gray scale",
    "Sepia",
    "Hue rotation 180°",
    "Saturated",
    "Time",
    "Anaglyph",
    "VHS (VCR)",
    "Outline",
    "Upside down",
    "Vignette"
];

setView = (n) => {
    if (n <= views.length - 1 && n > 1) {
        view = n;
    } else {
        view = null;
    }
    setSetting('view', parseInt(view));
    document.querySelector('span[setting="view"]').children[0].value = view ?? 0;
}

for (const i in views) {
    if (i < 5) continue;
    const option = document.createElement("option");
    option.setAttribute("value", i);
    option.innerText = views[i];
    document.querySelector('.setting-span[setting="view"]').querySelector("select").appendChild(option);
    viewKey[i] = views[i];
}

const vcrFont = new FontFace("VCR", "url(mods/VCR_OSD_MONO.ttf)");
vcrFont.load().then(font => {
    console.log(font);
    document.fonts.add(font);
})

function blending(color, color2, t = 0.5) {
    const [r, g, b] = parseColor(color).replace("#", "").match(/../g).map(a => parseInt(a, 16));
    const [r2, g2, b2] = parseColor(color2).replace("#", "").match(/../g).map(a => parseInt(a, 16));
    if ([r, g, b].includes(undefined) || [r, g, b, t].includes(NaN)) console.log([r, g, b, t], parseColor(color), color);
    return `#${[
        (1 - t) * r + t * r2,
        (1 - t) * g + t * g2,
        (1 - t) * b + t * b2
    ].map(a => Math.floor(a).toString(16).padStart(2, "0")).join("")}`;
}

const cache = new Map();

function mixColors(color, color2) {
    if (cache.has(`${color}_${color2}`) || cache.has(`${color2}_${color}`)) return cache.get(`${color}_${color2}`) ?? cache.get(`${color2}_${color}`);
    const [r, g, b] = parseColor(color).replace("#", "").match(/../g).map(a => parseInt(a, 16));
    const [r2, g2, b2] = parseColor(color2).replace("#", "").match(/../g).map(a => parseInt(a, 16));
    const res = [
        Math.max(r, r2),
        Math.max(g, g2),
        Math.max(b, b2)
    ];
    cache.set(`${color}_${color2}`, `#${res.map(a => (Math.floor(a) % 256).toString(16).padStart(2, "0")).join("")}`);
    return `#${res.map(a => (Math.floor(a) % 256).toString(16).padStart(2, "0")).join("")}`;
}

const parseColor = (colorString) => {
    if (colorString instanceof Array) return parseColor(colorString[0]);
    if (typeof colorString != "string") return "#ffffff";
    if (colorString.startsWith("rgb(")) {
        const color = colorString.replace("rgb(", "").replace(")", "");
        return `#${color.split(",").map(a => parseInt(a).toString(16).length == 1 ? `0${parseInt(a).toString(16)}` : parseInt(a).toString(16)).join("")}`;
    } else if (colorString.startsWith("rgba(")) {
        const color = colorString.replace("rgba(", "").replace(")", "");
        return `#${color.split(",").filter((_, i) => i <= 2).map(a => parseInt(a).toString(16).length == 1 ? `0${parseInt(a).toString(16)}` : parseInt(a).toString(16)).join("")}`;
    } else {
        if (colorString.startsWith("#")) {
            const color = colorString.slice(1);
            if (color.length == 3) return `#${color.split(a => a.repeat(2)).join()}`;
            else if (color.length >= 6) return `#${color.slice(0, 6)}`;
            else return `#${color}`;
        }
    }
}

const rgbToHsl = (r, g, b) => {
    const r1 = r / 255;
    const g1 = g / 255;
    const b1 = b / 255;

    const cmax = Math.max(r1, g1, b1);
    const cmin = Math.min(r1, g1, b1);

    const delta = cmax - cmin;
    const l = (cmax + cmin) / 2;
    const s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    let h = 0;
    if (delta != 0) {
        switch (cmax) {
            case r1:
                h = 60 * (((g1 - b1) / delta) % 6);
                break;
            case g1:
                h = 60 * ((b1 - r1) / delta + 2);
                break;
            default:
                h = 60 * ((r1 - g1) / delta + 4);
        }
    }

    return {h, s, l};
}

const thetaSetting = new Setting("3D View Angle (0-90)", "theta", settingType.NUMBER, false, parseFloat((Math.atan(2) * 180 / Math.PI).toPrecision(3)));

const tab = new SettingsTab("moreViews.js");
tab.registerSetting(thetaSetting);

let maxDistance = -1;
const colorCache = new Map();

function getModeColor(color, distance = 0) {
    if (!colorCache.has(view)) colorCache.set(view, new Map());
    if (view == 18) {
        if (colorCache.get(view).has(color) && colorCache.get(view).get(color).has(distance)) return colorCache.get(view).get(color).get(distance);
    } else if (colorCache.get(view).has(color)) return colorCache.get(view).get(color);
    switch (view) {
        case 6: {
            const newColor = "#" + (parseInt(`0x1${parseColor(color).slice(1)}`) ^ 0xffffff).toString(16).slice(1);
            colorCache.get(view).set(color, newColor);
            return newColor;
        }
        case 7: {
            const newColor = blending(pixel.color, "#000000");
            colorCache.get(view).set(color, newColor);
            return newColor;
        }
        case 8: {
            const newColor = blending(pixel.color, "#ffffff");
            colorCache.get(view).set(color, newColor);
            return newColor;
        }
        case 9: {
            const [r, g, b] = parseColor(color).slice(1).match(/.{1,2}/g).map(a => parseInt(a, 16)).slice(0, 3);
            const {h, l} = rgbToHsl(r, g, b);
            const newColor = `hsl(${Math.round(h)}, 0%, ${Math.round(l * 100)}%)`;
            colorCache.get(view).set(color, newColor);
            return newColor;
        }
        case 10: {
            const [r, g, b] = parseColor(color).replace("#", "").match(/../g).map(a => parseInt(a, 16));
            const [r2, g2, b2] = [
                Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189)),
                Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168)),
                Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131))
            ];
            const newColor = `#${Math.floor(r2).toString(16).padStart(2, "0")}${Math.floor(g2).toString(16).padStart(2, "0")}${Math.floor(b2).toString(16).padStart(2, "0")}`;
            colorCache.get(view).set(color, newColor);
            return newColor;
        }
        case 11: {
            const [r, g, b] = parseColor(color).slice(1).match(/.{1,2}/g).map(a => parseInt(a, 16)).slice(0, 3);
            const {h, s, l} = rgbToHsl(r, g, b);
            const newColor = `hsl(${(Math.round(h) + 180 % 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
            colorCache.get(view).set(color, newColor);
            return newColor;
        }
        case 12: {
            const [r, g, b] = parseColor(color).slice(1).match(/.{1,2}/g).map(a => parseInt(a, 16)).slice(0, 3);
            const {h, s, l} = rgbToHsl(r, g, b);
            const newColor = `hsl(${Math.round(h)}, ${Math.round(s * 100) * 4}%, ${Math.round(l * 100)}%)`;
            colorCache.get(view).set(color, newColor);
            return newColor;
        }
        case 15: {
            const [r, g, b] = parseColor(color).replace("#", "").match(/../g);
            const [r2, g2, b2] = [parseInt(r, 16) * 0.75, parseInt(g, 16) * 0.75, parseInt(b, 16) * 0.75];
            const newColor = `rgb(${r2}, ${g2}, ${b2})`;
            colorCache.get(view).set(color, newColor);
            return newColor;
        }
        case 18: {
            const newColor = blending(pixel.color, "#000000", (1 / maxDistance) * distance);
            colorCache.get(view).has(color)
                ? colorCache.get(view).get(color).set(distance, newColor)
                : colorCache.get(view).set(color, new Map([[distance, newColor]]));
            return newColor;
        }
    }
    return color;
}

settingsManager.registerTab(tab);

runAfterLoadList.push(() => drawPixels = (function() {
    const oldDrawPixels = drawPixels;

    return function(forceTick = false) {
        if (view >= 5) {
            if (maxDistance = -1) maxDistance = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2) * 2;
            
            const canvas = document.getElementById("game");
            const ctx = canvas.getContext("2d");
            var newCurrentPixels = currentPixels.slice();
            var pixelsFirst = [];
            var pixelsLast = [];
            if (!paused || forceTick) {
                shuffleArray(newCurrentPixels);
            }
            
            for (var i = 0; i < newCurrentPixels.length; i++) {
                pixel = newCurrentPixels[i];
                if (pixel.del) {continue}
                if (!paused || forceTick) {
                    if (elements[pixel.element].tick) {
                        elements[pixel.element].tick(pixel);
                    }
                    if (pixel.del) {continue}
                    if (elements[pixel.element].behavior) {
                        pixelTick(pixel);
                    }
                };
                if (pixel.con) { pixel = pixel.con }
                if (elements[pixel.element].isGas || elements[pixel.element].glow) {
                    pixelsLast.push(pixel);
                }
                else {
                    pixelsFirst.push(pixel);
                }
            }
            
            if (hiding) {
                if (ctx.globalAlpha < 1) {
                    ctx.globalAlpha = 1;
                }

                if (elements[currentElement].maxSize < mouseSize) {
                    var mouseOffset = Math.trunc(elements[currentElement].maxSize/2);
                }
                else {
                    var mouseOffset = Math.trunc(mouseSize/2);
                }
                var topLeft = [mousePos.x-mouseOffset,mousePos.y-mouseOffset];
                var bottomRight = [mousePos.x+mouseOffset,mousePos.y+mouseOffset];

                ctx.strokeStyle = "white";
                ctx.strokeRect(topLeft[0]*pixelSize,topLeft[1]*pixelSize,(bottomRight[0]-topLeft[0]+1)*pixelSize,(bottomRight[1]-topLeft[1]+1)*pixelSize);
                
                if (settings.precision) {
                    ctx.fillStyle = "rgba(255,255,255,0.5)";
                    ctx.fillRect(mousePos.x*pixelSize,mousePos.y*pixelSize,pixelSize,pixelSize);
                }
                if ((!paused) || forceTick) {pixelTicks++};
                return;
            }
            
            if (!settings["bg"]) {ctx.clearRect(0, 0, canvas.width, canvas.height)}
            else {
                ctx.fillStyle = settings["bg"];
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            var pixelDrawList = pixelsFirst.concat(pixelsLast);
            for (var i = 0; i < pixelDrawList.length; i++) {
                pixel = pixelDrawList[i];
                if (pixelMap[pixel.x][pixel.y] == undefined) {continue}
                if (pixel.con) { pixel = pixel.con };
                ctx.fillStyle = getModeColor(pixel.color, view == 18 ? Math.sqrt((width / 2 - pixel.x) ** 2 + (height / 2 - pixel.y) ** 2) : 0);
                // 3D VIEW
                if (view == 5) {
                    const neighborRight = !outOfBounds(pixel.x + 1, pixel.y) && !!pixelMap[pixel.x + 1][pixel.y];
                    const neighborUp = !outOfBounds(pixel.x, pixel.y - 1) && !!pixelMap[pixel.x][pixel.y - 1];
                    const neighborUpRight = !outOfBounds(pixel.x + 1, pixel.y - 1) && !!pixelMap[pixel.x + 1][pixel.y - 1];
                    let size = 0;
                    let currentY = pixel.y;
                    while (!outOfBounds(pixel.x, currentY) && pixelMap[pixel.x][currentY] && pixelMap[pixel.x][currentY].element == pixel.element) {
                        currentY++;
                        size++;
                    }
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = pixel.color;
                    ctx.fillRect(pixel.x * pixelSize, pixel.y * pixelSize, pixelSize, pixelSize);
                    const px = pixel.x * pixelSize;
                    const py = pixel.y * pixelSize;
                    const theta = Math.max(Math.min(thetaSetting.get(), 90), 0) * Math.PI / 180;
                    const a = Math.cos(theta);
                    const b = Math.sin(theta);
                    const w = pixelSize;
                    const px2 = px + a * w;
                    const py2 = py - b * w;
                    const parts = [[[px, py], [[px2, py2], [px + w, py2], [px + w, py]], !neighborUp], [[px + w, py + w], [[px2 + w, py2 + w], [px2 + w, py], [px + w, py]], !neighborRight], [[px + w, py], [[px + w, py2], [px2 + w, py2], [px + w, py]], !neighborUp && !neighborUpRight], [[px + w, py], [[px2 + w, py2], [px2 + w, py], [px + w, py]], !neighborRight && !neighborUpRight]]
                    for (const part of parts.filter(p => p[2])) {
                        ctx.fillStyle = blending(pixel.color, "#000000");
                        ctx.beginPath();
                        ctx.moveTo(...part[0]);
                        for (const v of part[1]) {
                            ctx.lineTo(...v);
                        }
                        ctx.closePath();
                        ctx.fill();
                    }
                } else if (view == 13) {
                    const hue = 225 - (Math.log(pixel.start) / Math.log(pixelTicks)) * 225;
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = `hsl(${Math.min(Math.round(hue), 250)}, 100%, 50%)`;
                    ctx.fillRect(pixel.x * pixelSize, pixel.y * pixelSize, pixelSize, pixelSize);
                }  else if (view == 14) {
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = pixel.color;
                    ctx.fillRect(pixel.x * pixelSize, pixel.y * pixelSize, pixelSize, pixelSize);
                    
                    if (outOfBounds(pixel.x - 1, pixel.y) || !pixelMap[pixel.x - 1][pixel.y]) {
                        ctx.fillStyle = "#ff0000";
                        ctx.globalAlpha = 0.5;
                        ctx.fillRect(pixel.x * pixelSize - 0.5 * pixelSize, pixel.y * pixelSize, pixelSize, pixelSize);
                    }
                    if (outOfBounds(pixel.x + 1, pixel.y) || !pixelMap[pixel.x + 1][pixel.y]) {
                        ctx.fillStyle = "#00ffff";
                        ctx.globalAlpha = 0.5;
                        ctx.fillRect(pixel.x * pixelSize + 0.5 * pixelSize, pixel.y * pixelSize, pixelSize, pixelSize);
                    }
                } else if (view == 15) {
                    const [r, g, b] = parseColor(pixel.color).replace("#", "").match(/../g);
                    const [r2, g2, b2] = [parseInt(r, 16) * 0.75, parseInt(g, 16) * 0.75, parseInt(b, 16) * 0.75]
                    // scrolling effect
                    const offset = (pixelTicks + 6) % height >= pixel.y && (pixelTicks - 3) % height <= pixel.y
                        || (pixelTicks + 66) % height >= pixel.y && (pixelTicks - 57) % height <= pixel.y;
                    if (!pixelMap[pixel.x - 1] || !pixelMap[pixel.x - 1][pixel.y]) {
                        ctx.globalAlpha = 0.5;
                        ctx.fillStyle = `#${r.padStart(2, "0")}0000`;
                        ctx.fillRect(pixel.x * pixelSize - 0.75 * pixelSize - (offset ? 0.5 * pixelSize : 0) , pixel.y * pixelSize, pixelSize, pixelSize);
                    }
                    if (!pixelMap[pixel.x + 1] || !pixelMap[pixel.x + 1][pixel.y]) {
                        ctx.globalAlpha = 0.5;
                        ctx.fillStyle = `#0000${b.padStart(2, "0")}`;
                        ctx.fillRect(pixel.x * pixelSize + 0.75 * pixelSize - (offset ? 0.5 * pixelSize : 0), pixel.y * pixelSize, pixelSize, pixelSize);
                    }
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = `rgb(${r2}, ${g2}, ${b2})`
                    ctx.fillRect(pixel.x * pixelSize - (offset ? 0.5 * pixelSize : 0), pixel.y * pixelSize, pixelSize, pixelSize);
                    ctx.globalAlpha = 1;
                // i fucking hate it but at least it works
                // and i dont feel like finding something that is fast and pretty
                } else if (view == 16) {
                    ctx.globalAlpha = 1;
                    ctx.strokeStyle = pixel.color;
                    ctx.lineWidth = 2;
                    const cond1 = outOfBounds(pixel.x - 1, pixel.y)
                        || !pixelMap[pixel.x - 1][pixel.y]
                        || pixelMap[pixel.x - 1][pixel.y].element != pixel.element;
                    const cond2 = outOfBounds(pixel.x + 1, pixel.y)
                        || !pixelMap[pixel.x + 1][pixel.y]
                        || pixelMap[pixel.x + 1][pixel.y].element != pixel.element;
                    const cond3 = outOfBounds(pixel.x, pixel.y - 1)
                        || !pixelMap[pixel.x][pixel.y - 1]
                        || pixelMap[pixel.x][pixel.y - 1].element != pixel.element;
                    const cond4 = outOfBounds(pixel.x, pixel.y + 1)
                        || !pixelMap[pixel.x][pixel.y + 1]
                        || pixelMap[pixel.x][pixel.y + 1].element != pixel.element;
                    const cond5 = outOfBounds(pixel.x - 1, pixel.y - 1)
                        || !pixelMap[pixel.x - 1][pixel.y - 1]
                        || pixelMap[pixel.x - 1][pixel.y - 1].element != pixel.element;
                    const cond6 = outOfBounds(pixel.x + 1, pixel.y - 1)
                        || !pixelMap[pixel.x + 1][pixel.y - 1]
                        || pixelMap[pixel.x + 1][pixel.y - 1].element != pixel.element;
                    const cond7 = outOfBounds(pixel.x - 1, pixel.y + 1)
                        || !pixelMap[pixel.x - 1][pixel.y + 1]
                        || pixelMap[pixel.x - 1][pixel.y + 1].element != pixel.element;
                    const cond8 = outOfBounds(pixel.x + 1, pixel.y + 1)
                        || !pixelMap[pixel.x + 1][pixel.y + 1]
                        || pixelMap[pixel.x + 1][pixel.y + 1].element != pixel.element;
                    
                    if (cond1) {
                        ctx.beginPath();
                        ctx.moveTo(pixel.x * pixelSize + ctx.lineWidth / 2, pixel.y * pixelSize);
                        ctx.lineTo(pixel.x * pixelSize + ctx.lineWidth / 2, (pixel.y + 1) * pixelSize);
                        ctx.stroke();
                    }
                    if (cond2) {
                        ctx.beginPath();
                        ctx.moveTo((pixel.x + 1) * pixelSize - ctx.lineWidth / 2, pixel.y * pixelSize);
                        ctx.lineTo((pixel.x + 1) * pixelSize - ctx.lineWidth / 2, (pixel.y + 1) * pixelSize);
                        ctx.stroke();
                    }
                    if (cond3) {
                        ctx.beginPath();
                        ctx.moveTo(pixel.x * pixelSize, pixel.y * pixelSize + ctx.lineWidth / 2);
                        ctx.lineTo((pixel.x + 1) * pixelSize, pixel.y * pixelSize + ctx.lineWidth / 2);
                        ctx.stroke();
                    }
                    if (cond4) {
                        ctx.beginPath();
                        ctx.moveTo(pixel.x * pixelSize, (pixel.y + 1) * pixelSize - ctx.lineWidth / 2);
                        ctx.lineTo((pixel.x + 1) * pixelSize, (pixel.y + 1) * pixelSize - ctx.lineWidth / 2);
                        ctx.stroke();
                    }
                    if (!cond2 && !cond4 && cond8) ctx.fillRect((pixel.x + 1) * pixelSize - ctx.lineWidth, (pixel.y + 1) * pixelSize - ctx.lineWidth, ctx.lineWidth, ctx.lineWidth);
                    if (!cond2 && !cond3 && cond6) ctx.fillRect((pixel.x + 1) * pixelSize - ctx.lineWidth, pixel.y * pixelSize, ctx.lineWidth, ctx.lineWidth);
                    if (!cond1 && !cond3 && cond5) ctx.fillRect(pixel.x * pixelSize, pixel.y * pixelSize, ctx.lineWidth, ctx.lineWidth);
                    if (!cond1 && !cond4 && cond7) ctx.fillRect(pixel.x * pixelSize, (pixel.y + 1) * pixelSize - ctx.lineWidth, ctx.lineWidth, ctx.lineWidth);
                } else if (view == 17) {
                    ctx.fillRect(pixel.x * pixelSize, (height - pixel.y) * pixelSize, pixelSize, pixelSize);
                } else {
                    ctx.fillRect(pixel.x*pixelSize, pixel.y*pixelSize, pixelSize, pixelSize);
                }
                if (pixel.charge && view !== 2) { // Yellow glow on charge
                    if (!elements[pixel.element].colorOn) {
                        ctx.fillStyle = "rgba(255,255,0,0.5)";
                        ctx.fillRect(pixel.x*pixelSize, pixel.y*pixelSize, pixelSize, pixelSize);
                    }
                }
            }
            if (view == 15) {
                // TRACK READ NOISE
                for (let n = 0; n < 3; n++) {
                    const number = Math.floor(Math.random() * height);
                    ctx.globalAlpha = Math.random();
                    ctx.fillStyle = "#fff";
                    ctx.fillRect(0, (number + 0.5) * pixelSize, width * pixelSize, 0.2);
                    ctx.globalAlpha = 1;
                }
                const {font, textAlign} = ctx;
                ctx.font = "30px VCR";
                ctx.textAlign = "start";
                ctx.fillText(paused ? "PAUSE" : "PLAY", (0.025 * width) * pixelSize, (0.025 * width) * pixelSize + 15);
                if (paused) {
                    ctx.fillRect((0.05 * width) * pixelSize + ctx.measureText("PAUSE").width, (0.025 * width) * pixelSize - 7.5, 5, 22.5);
                    ctx.fillRect((0.05 * width) * pixelSize + ctx.measureText("PAUSE").width + 8, (0.025 * width) * pixelSize - 7.5, 5, 22.5);
                } else {
                    ctx.fillStyle = "#fff";
                    ctx.beginPath();
                    ctx.moveTo((0.05 * width) * pixelSize + ctx.measureText("PLAY").width, (0.025 * width) * pixelSize - 7.5);
                    ctx.lineTo((0.05 * width) * pixelSize + ctx.measureText("PLAY").width, (0.025 * width) * pixelSize + 15);
                    ctx.lineTo((0.05 * width) * pixelSize + ctx.measureText("PLAY").width + 17.5, (0.025 * width) * pixelSize + 3.75);
                    ctx.lineTo((0.05 * width) * pixelSize + ctx.measureText("PLAY").width, (0.025 * width) * pixelSize - 7.5);
                    ctx.fill();
                }
                const base = Math.floor(pixelTicks / tps);
                const seconds = base % 60 + "";
                const minutes = Math.floor(base / 60) % 60 + "";
                const hours = Math.floor(base / 60 / 60) + "";
                ctx.textAlign = "end";
                ctx.fillText(`${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`, (0.975 * width) * pixelSize, (0.025 * width) * pixelSize + 15);
                ctx.font = font;
                ctx.textAlign = textAlign;
            }
            if (ctx.globalAlpha < 1) {
                ctx.globalAlpha = 1;
            }

            if (elements[currentElement].maxSize < mouseSize) {
                var mouseOffset = Math.trunc(elements[currentElement].maxSize/2);
            }
            else {
                var mouseOffset = Math.trunc(mouseSize/2);
            }
            var topLeft = [mousePos.x-mouseOffset,mousePos.y-mouseOffset];
            var bottomRight = [mousePos.x+mouseOffset,mousePos.y+mouseOffset];
            // Draw a square around the mouse
            ctx.strokeStyle = "white";
            ctx.strokeRect(topLeft[0]*pixelSize,topLeft[1]*pixelSize,(bottomRight[0]-topLeft[0]+1)*pixelSize,(bottomRight[1]-topLeft[1]+1)*pixelSize);
            // draw one transparent pixel in the center
            if (settings.precision) {
                ctx.fillStyle = "rgba(255,255,255,0.5)";
                ctx.fillRect(mousePos.x*pixelSize,mousePos.y*pixelSize,pixelSize,pixelSize);
            }
            if ((!paused) || forceTick) {pixelTicks++};
        } else oldDrawPixels.apply(this, arguments);
    }
}()));
}