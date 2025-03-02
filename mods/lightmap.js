if (!enabledMods.includes("mods/betterSettings.js")) { enabledMods.unshift("mods/betterSettings.js"); localStorage.setItem("enabledMods", JSON.stringify(enabledMods)); window.location.reload() };

var lightmap = [];
var nextLightmap = [];
var lightmapWidth, lightmapHeight;
var lightmapScale = 2;
var lightSourceBoost = 2;
var pixelSizeQuarter = pixelSizeHalf / 2;

// BetterSettings.js integration
var lightmap_settingsTab = new SettingsTab("Lightmap");

var resolution_setting = new Setting("Resolution (higher number = lower quality)", "resolution", settingType.NUMBER, false, defaultValue=2);
var falloff_setting = new Setting("Falloff (higher number = higher blur radius)", "falloff", settingType.NUMBER, false, defaultValue=0.8);

lightmap_settingsTab.registerSettings("Resolution", resolution_setting);
lightmap_settingsTab.registerSettings("Falloff", falloff_setting);

settingsManager.registerTab(lightmap_settingsTab);


function getRandomElement(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

if (!rgbToArray) {
	function rgbToArray(colorString) {
		if (typeof colorString !== "string") {
			console.error("Invalid colorString:", colorString);
			return null;
		}
		if (colorString.startsWith("rgb")) {
			return colorString
				.slice(4, -1)
				.split(",")
				.map(val => parseInt(val.trim()));
		} else if (colorString.startsWith("#")) {
			let hex = colorString.slice(1);
			if (hex.length === 3) {
				hex = hex
					.split("")
					.map(char => char + char)
					.join("");
			}
			if (hex.length !== 6) {
				console.error("Invalid hex color:", colorString);
				return null;
			}
			var r = parseInt(hex.slice(0, 2), 16);
			var g = parseInt(hex.slice(2, 4), 16);
			var b = parseInt(hex.slice(4, 6), 16);
			return [r, g, b];
		}
		console.error("Invalid color format:", colorString);
		return null;
	}
}

function scaleList(numbers, scale) {
	return numbers.map(number => number * scale);
}

function initializeLightmap(_width, _height) {
	lightmapWidth = Math.ceil(_width / lightmapScale) + 1;
	lightmapHeight = Math.ceil(_height / lightmapScale) + 1;

	function createLightmapArray(width_, height_) {
		return Array.from({ length: height_ }, () =>
			Array.from({ length: width_ }, () => ({ color: [0, 0, 0] }))
		);
	}

	var newLightmap = createLightmapArray(lightmapWidth, lightmapHeight);
	var newNextLightmap = createLightmapArray(lightmapWidth, lightmapHeight);

	lightmap = newLightmap;
	nextLightmap = newNextLightmap;
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
	var falloff = falloff_setting.value;
	var neighbors = [
		{ dx: 1, dy: 0 },
		{ dx: -1, dy: 0 },
		{ dx: 0, dy: 1 },
		{ dx: 0, dy: -1 }
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
					Math.min(Math.max(0, (totalColor[0] / neighborCount) * falloff), 255 * 8),
					Math.min(Math.max(0, (totalColor[1] / neighborCount) * falloff), 255 * 8),
					Math.min(Math.max(0, (totalColor[2] / neighborCount) * falloff), 255 * 8)
				]
			};
		}
	}

	deepCopy(nextLightmap, lightmap);
}

function rgbToHsv(r, g, b) {
	r /= 255;
	g /= 255;
	b /= 255;
	var max = Math.max(r, g, b);
	var min = Math.min(r, g, b);
	var h, s;
	var v = max;
	var d = max - min;
	s = max === 0 ? 0 : d / max;
	if (max === min) {
		h = 0;
	} else {
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}
	return [h, s, v];
}

function hsvToRgb(h, s, v) {
	var i = Math.floor(h * 6);
	var f = h * 6 - i;
	var p = v * (1 - s);
	var q = v * (1 - f * s);
	var t = v * (1 - (1 - f) * s);
	var r, g, b;

	switch (i % 6) {
		case 0:
			r = v;
			g = t;
			b = p;
			break;
		case 1:
			r = q;
			g = v;
			b = p;
			break;
		case 2:
			r = p;
			g = v;
			b = t;
			break;
		case 3:
			r = p;
			g = q;
			b = v;
			break;
		case 4:
			r = t;
			g = p;
			b = v;
			break;
		case 5:
			r = v;
			g = p;
			b = q;
			break;
	}
	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function renderLightmapPrePixel(ctx) {
	if (!lightmap || !lightmap[0]) return;
	var _width = lightmap[0].length;
	var _height = lightmap.length;

	for (var y = 0; y < _height; y++) {
		for (var x = 0; x < _width; x++) {
			var color = lightmap[y][x].color;
			var r = color[0];
			var g = color[1];
			var b = color[2];

			if (r > 16 || g > 16 || b > 16) {
				var hsv = rgbToHsv(r, g, b);
				var newColor = hsvToRgb(hsv[0], hsv[1], 1);
				var alpha = hsv[2];

				ctx.globalAlpha = 1.0;
				ctx.fillStyle = `rgba(${newColor[0]}, ${newColor[1]}, ${newColor[2]}, ${alpha * 0.4})`;
				ctx.fillRect(
					x * pixelSize * lightmapScale,
					y * pixelSize * lightmapScale,
					pixelSize * lightmapScale,
					pixelSize * lightmapScale
				);

				ctx.fillStyle = `rgba(${newColor[0]}, ${newColor[1]}, ${newColor[2]}, ${alpha * 0.25})`;
				ctx.fillRect(
					(x * pixelSize - pixelSizeHalf) * lightmapScale,
					(y * pixelSize - pixelSizeHalf) * lightmapScale,
					pixelSize * lightmapScale * 2,
					pixelSize * lightmapScale * 2
				);
			}
		}
	}
}

// Main loop
renderPrePixel(function(ctx) {
	// Reset lightmap if resolution changed
	if (resolution_setting.value != lightmapScale) {
		lightmapScale = resolution_setting.value;
		initializeLightmap(width, height);
		return;
	}

	if (!paused) {
		propagateLightmap();
	}
	renderLightmapPrePixel(ctx);
});

function glowItsOwnColor(pixel) {
	if (!pixel.color) return;
	var x = Math.floor(pixel.x / lightmapScale);
	var y = Math.floor(pixel.y / lightmapScale);
	try {
		lightmap[y][x] = { color: scaleList(rgbToArray(pixel.color), lightSourceBoost) };
	} catch (e) {
		console.log(e, pixel, pixel.color, rgbToArray(pixel.color), x, y)
	}
}

function glowItsOwnColorIfPowered(pixel) {
	if (!pixel.charge || pixel.charge <= 0) return;
	if (!pixel.color) return;
	var x = Math.floor(pixel.x / lightmapScale);
	var y = Math.floor(pixel.y / lightmapScale);
	lightmap[y][x] = { color: scaleList(rgbToArray(pixel.color), lightSourceBoost) };
}

function glowColor(pixel, color) {
	if (!color) return;
	var x = Math.floor(pixel.x / lightmapScale);
	var y = Math.floor(pixel.y / lightmapScale);
	lightmap[y][x] = { color: scaleList(color, lightSourceBoost) };
}

function glowRadiationColor(pixel) {
	var x = Math.floor(pixel.x / lightmapScale);
	var y = Math.floor(pixel.y / lightmapScale);
	lightmap[y][x] = { color: scaleList(radColor, lightSourceBoost) };
}

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

var originalFireTick3 = elements.fire.tick;
elements.fire.tick = function(pixel) {
	originalFireTick3(pixel);
	glowItsOwnColor(pixel);
};

var originalColdFireTick2 = elements.cold_fire.tick;
elements.cold_fire.tick = function(pixel) {
	originalColdFireTick2(pixel);
	glowItsOwnColor(pixel);
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

var radioactiveElements = [
	"uranium", "radiation", "rad_glass", "fallout",
	"molten_uranium", "rad_shard", "rad_cloud", "rad_steam"
];
radioactiveElements.forEach(element => {
	elements[element].tick = glowRadiationColor;
});

var fireflyColor = [240, 255, 70];
var radColor = [75, 100, 30];
var strangeMatterColor = [220 * 0.3, 255 * 0.3, 210 * 0.3];
var sparkColors = [[255, 210, 120], [255, 140, 10]];

runAfterReset(() => {
	initializeLightmap(width, height);
});
