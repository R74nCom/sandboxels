if (!enabledMods.includes("mods/betterSettings.js")) { enabledMods.unshift("mods/betterSettings.js"); localStorage.setItem("enabledMods", JSON.stringify(enabledMods)); window.location.reload() };

var sky_settingsTab = new SettingsTab("Sky");

var realtime_setting = new Setting("Use real life time for sky", "real_time", settingType.BOOLEAN, false, defaultValue=false);
var initial_hour_setting = new Setting("Initial hour", "initial_hour", settingType.NUMBER, false, defaultValue=8);
var ticks_per_hour_setting = new Setting("Ticks per hour", "ticks_per_hour", settingType.NUMBER, false, defaultValue=150);

sky_settingsTab.registerSettings("Real time", realtime_setting);
sky_settingsTab.registerSettings("Initial hour", initial_hour_setting);
sky_settingsTab.registerSettings("Ticks per hour", ticks_per_hour_setting);

settingsManager.registerTab(sky_settingsTab);

//function lerpColor(start, end, t) {
//	return start.map((s, i) => Math.round(s + (end[i] - s) * t));
//}
// Destructuring makes it faster
function lerpColor([r1, g1, b1], [r2, g2, b2], t) {
    return [r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t].map(Math.round);
}

function getSkyColors(hour) {
	const SKY_COLOR_PAIRS = [
		[[0, 0, 15], [0, 0, 30]], // midnight
		[[10, 10, 40], [20, 20, 60]],
		[[255, 100, 50], [255, 150, 100]],
		[[135, 206, 235], [180, 230, 255]],
		[[135, 206, 250], [135, 206, 255]],
		[[135, 206, 250], [120, 190, 240]],
		[[255, 150, 100], [120, 70, 70]],
		[[30, 15, 60], [20, 10, 40]],
		[[0, 0, 15], [0, 0, 30]], // midnight
	];

	// Determine the interval (each interval is 3 hours)
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
	// Get sky colors and make gradient
	const { skyTop, skyBottom } = getSkyColors(hour);
	const gradient = ctx.createLinearGradient(0, 0, 0, height * pixelSize);
	gradient.addColorStop(0, skyTop);
	gradient.addColorStop(1, skyBottom);

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, (width + 1) * pixelSize, (height + 1) * pixelSize);
}

function updateDayTime() {
	if (paused) {return;}

	if (realtime_setting.value) {
		const now = new Date();
		hour = now.getHours() + now.getMinutes() / 60;
	} else {
		hour = (hour + (1 / ticks_per_hour_setting.value)) % 24; // Keep within 0-23
	}
}

// Sky should be first layer
function prioritizeRenderSky() {
	const idx = renderPrePixelList.indexOf(renderSky);
	if (idx !== -1) {
		const [skyFn] = renderPrePixelList.splice(idx, 1);
		renderPrePixelList.unshift(skyFn);
	}
}

// Resetting canvas also resets time
function initializeSky() {
	hour = initial_hour_setting.value;
}

// Hooks
runAfterReset(initializeSky);
runAfterLoad(prioritizeRenderSky);
runEveryTick(updateDayTime);
renderPrePixel(renderSky);

var hour = initial_hour_setting.value;
