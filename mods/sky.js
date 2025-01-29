const SETTINGS = {
    initialHour: 4,
    useRealTime: false,
    hoursPerTick: 0.01,
};

var hour = SETTINGS.initialHour;

function lerpColor(start, end, t) {
    return start.map((s, i) => Math.round(s + (end[i] - s) * t));
}

function getSkyColors(hour) {
    const SKY_COLOR_PAIRS = [
        [[10, 10, 25], [5, 5, 15]],         // Midnight
        [[20, 20, 40], [15, 15, 30]],       // Late night
        [[255, 153, 102], [60, 50, 100]],   // Dawn
        [[180, 220, 250], [135, 206, 250]], // Morning
        [[220, 250, 255], [80, 170, 255]],  // Noon
        [[210, 240, 255], [90, 180, 255]],  // Afternoon
        [[255, 100, 80], [255, 130, 100]],  // Sunset
        [[30, 10, 25], [15, 5, 15]],        // Early night
        [[10, 10, 25], [5, 5, 15]],         // Midnight loop
    ];

	// Find nearest sky colors and interpolate
    const index = Math.floor(hour / 3);
    const t = (hour % 3) / 3;

    const [bottomStart, topStart] = SKY_COLOR_PAIRS[index];
    const [bottomEnd, topEnd] = SKY_COLOR_PAIRS[index + 1];

    return {
        skyTop: `rgb(${lerpColor(topStart, topEnd, t).join(", ")})`,
        skyBottom: `rgb(${lerpColor(bottomStart, bottomEnd, t).join(", ")})`,
    };
}

function renderSky(ctx) {
    const { skyTop, skyBottom } = getSkyColors(hour);
    const gradient = ctx.createLinearGradient(0, 0, 0, height * pixelSize);

    gradient.addColorStop(0, skyTop);
    gradient.addColorStop(1, skyBottom);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width * pixelSize, height * pixelSize);
}

function updateDayTime() {
    if (SETTINGS.useRealTime) {
        const now = new Date();
        hour = now.getHours() + now.getMinutes() / 60;
    } else {
        hour = (hour + SETTINGS.hoursPerTick) % 24; // Keep within 0-23
    }
}

// Make sure the sky gets VIP treatment in the render list
function prioritizeRenderSky() {
    const idx = renderPrePixelList.indexOf(renderSky);
    if (idx !== -1) {
        const [skyFn] = renderPrePixelList.splice(idx, 1);
        renderPrePixelList.unshift(skyFn);
    }
}

// Resetting canvas also resets time
function initializeCanvas() {
    const resizeCanvas = autoResizeCanvas;
    autoResizeCanvas = (clear) => {
        resizeCanvas(clear);
        hour = SETTINGS.initialHour;
    };
}

// Hooks
setTimeout(initializeCanvas, 500);
runAfterLoad(prioritizeRenderSky);
runEveryTick(updateDayTime);
renderPrePixel(renderSky);
