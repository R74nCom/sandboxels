// Clouds.js

if (!enabledMods.includes("mods/betterSettings.js")) { enabledMods.unshift("mods/betterSettings.js"); localStorage.setItem("enabledMods", JSON.stringify(enabledMods)); window.location.reload() };

var clouds_settingsTab = new SettingsTab("Clouds");

var cloud_count_setting = new Setting("Cloud count", "cloud_count", settingType.NUMBER, false, defaultValue=40);

clouds_settingsTab.registerSettings("Real time", cloud_count_setting);

settingsManager.registerTab(clouds_settingsTab);

function biasedRandom(A, B, samples) {
	var sum = 0;
	for (var i = 0;i < samples;i++) {
		sum += Math.random();
	}
	var average = sum / samples;

	return A + average * (B - A);
}

function randomBetween(A, B) {
    return Math.random() * (B - A) + A;
}

function initClouds(amount) {
	for (let i = 0; i < amount; i++) {
		var w = randomBetween(6, 17);
		var h = randomBetween(4, 10);
		var x = randomBetween(0, width - w);
		var y = biasedRandom(0, height * 0.75, 4);

		// Higher clouds move faster
		var speedBoost = 1 - (y / (height * 0.75));
		var speed = ((Math.random() - 0.5) * 0.05) * (0.5 + speedBoost * 2);

		var color = Math.random() > 0.5 ? "255,255,255" : "210,210,190";
		var blur = Math.max(Math.min(1 / (Math.abs(speed) * 48), 4), 0); // For parallax

		// Pre-render the cloud
		var offCanvas = document.createElement("canvas");
		var margin = blur;
		offCanvas.width = w * pixelSize + 2 * margin;
		offCanvas.height = h * pixelSize + 2 * margin;
		var offCtx = offCanvas.getContext("2d");

		var gradient = offCtx.createLinearGradient(0, margin, 0, h * pixelSize + margin);
		gradient.addColorStop(0, `RGBA(${color},0.12)`);
		gradient.addColorStop(1, `RGBA(${color},0.24)`);

		offCtx.filter = `blur(${blur}px)`;
		offCtx.fillStyle = gradient;
		offCtx.fillRect(margin, margin, w * pixelSize, h * pixelSize);

		clouds.push({ x, y, w, h, speed, color, blur, image: offCanvas, margin });
	}
}

function renderClouds(ctx) {
	// Fade in
	ctx.globalAlpha = Math.min(pixelTicks * 0.02, 1);

	for (var i = 0; i < clouds.length; i++) {
		var cloud = clouds[i];
		ctx.drawImage(
			cloud.image,
			cloud.x * pixelSize - cloud.margin,
			cloud.y * pixelSize - cloud.margin
		);
	}
}

function updateClouds() {
	if (paused) { return; }

	if (cloud_count_setting.value != clouds.length) {
		clouds = [];
		initClouds(cloud_count_setting.value);
		return;
	}

	for (var i = 0; i < clouds.length; i++) {
		var cloud = clouds[i];
		cloud.x += cloud.speed;

		// Wrap around
		if (cloud.x > width) {
			cloud.x = -cloud.w;
		} else if (cloud.x + cloud.w < 0) {
			cloud.x = width;
		}
	}
}

// Hooks
renderPrePixel(renderClouds);
runEveryTick(updateClouds);

var clouds = [];
runAfterReset(() => {
	initClouds(cloud_count_setting.value);
});
