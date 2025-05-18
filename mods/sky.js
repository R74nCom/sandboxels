// Sky.js

// BetterSettings.js integration
if (!enabledMods.includes("mods/betterSettings.js")) { enabledMods.unshift("mods/betterSettings.js"); localStorage.setItem("enabledMods", JSON.stringify(enabledMods)); window.location.reload() };

var sky_settingsTab = new SettingsTab("Sky");

var realtime_setting = new Setting("Use real life time for sky", "real_time", settingType.BOOLEAN, false, defaultValue=false);
var initial_hour_setting = new Setting("Initial hour", "initial_hour", settingType.NUMBER, false, defaultValue=8);
var ticks_per_hour_setting = new Setting("Ticks per hour", "ticks_per_hour", settingType.NUMBER, false, defaultValue=300);
var airtemp_setting = new Setting("Change air temperature based on time", "air_temp", settingType.BOOLEAN, false, defaultValue=true);
var drawSun = new Setting("Add sun", "drawSun", settingType.BOOLEAN, false, defaultValue=true);

sky_settingsTab.registerSettings("Real time", realtime_setting);
sky_settingsTab.registerSettings("Initial hour", initial_hour_setting);
sky_settingsTab.registerSettings("Ticks per hour", ticks_per_hour_setting);
sky_settingsTab.registerSettings("Temperature", airtemp_setting);
sky_settingsTab.registerSettings("Sun", drawSun);

settingsManager.registerTab(sky_settingsTab);

// Destructuring makes it faster
function lerpColor([r1, g1, b1], [r2, g2, b2], t) {
    return [r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t].map(Math.round);
}

function hourToTemp(hour, Tmin=10, Tmax=30) {
    return Tmin + (Tmax - Tmin) * Math.pow(Math.sin((Math.PI / 24) * (hour - 4)), 2);
}

function getSunPositionInRect(x_, y_, w, h) {
	// Convert hour to angle
	var angle = Math.PI * (18 - hour) / 12;

	// Convert angle to position
	var centerX = x_ + (w / 2);
	var centerY = y_ + h;
	var radius = (w) / 2;
	var x = centerX + radius * Math.cos(angle);
	var y = centerY - radius * Math.sin(angle);

	return { angle, x, y };
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

function drawSunSquare(ctx, sunPos, size, color, blur) {
	ctx.save();
	ctx.filter = `blur(${blur}px)`;
	ctx.translate(sunPos.x * pixelSize, sunPos.y * pixelSize);
	ctx.rotate(sunPos.angle);
	ctx.fillStyle = color;
	ctx.fillRect(-size * 0.5, -size * 0.5, size, size);
	ctx.restore();
}

function renderSkyAndSun(ctx) {
	// Get sky colors and make gradient
	const { skyTop, skyBottom } = getSkyColors(hour);
	const gradient = ctx.createLinearGradient(0, 0, 0, height * pixelSize);
	gradient.addColorStop(0, skyTop);
	gradient.addColorStop(1, skyBottom);

	ctx.globalAlpha = 1.0;
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, (width + 1) * pixelSize, (height + 1) * pixelSize);

	// Draw sun
	if (hour < 5.5 || hour > 18.5) {return;}
	if (!drawSun.value) {return;}

	var sunPos = getSunPositionInRect(width * 0.1, height * 0.1, width * 0.8, height * 0.9);
	var sunSize = pixelSize * 9;
	var nearSunSetOrRise = Math.pow((1 - Math.cos((Math.PI / 6) * hour)) / 2, 4);
	var color = RGBToHex(lerpColor([255, 230, 225], [255, 160, 128], nearSunSetOrRise));

	drawSunSquare(ctx, sunPos, sunSize, color, 5); // Glow
	drawSunSquare(ctx, sunPos, sunSize * 0.75, "#FFFFFF", 1);
}

function updateDayTime() {
	if (paused) {return;}

	if (realtime_setting.value) {
		const now = new Date();
		hour = now.getHours() + now.getMinutes() / 60;
	} else {
		var hours_per_tick = 1 / (ticks_per_hour_setting.value + 1);
		hour = (hour + hours_per_tick) % 24; // Keep within 0-23
	}

	if (airtemp_setting.value) {
		airTemp = hourToTemp(hour, 12, 26);
	}
}

// Sky should be first layer
function prioritizeSky() {
	const idx = renderPrePixelList.indexOf(renderSkyAndSun);
	if (idx !== -1) {
		const [skyFn] = renderPrePixelList.splice(idx, 1);
		renderPrePixelList.unshift(skyFn);
	}
}

// Resetting canvas also resets hour
function initializeSky() {
	hour = initial_hour_setting.value;
}

// Hooks
runAfterReset(initializeSky);
runAfterLoad(prioritizeSky);
runEveryTick(updateDayTime);
renderPrePixel(renderSkyAndSun);

var hour = initial_hour_setting.value;
