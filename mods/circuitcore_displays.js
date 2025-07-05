// Circuitcore_displays.js

ccd_ensureModEnabled("mods/circuitcore.js");
const ccd_isLightmapEnabled = enabledMods.includes("mods/lightmap.js") || enabledMods.includes("mods/fast_lightmap.js");

function ccd_ensureModEnabled(modName) {
	if (enabledMods.includes(modName))
		return;

	enabledMods.unshift(modName);
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	window.location.reload();
}

function general_display(w, h, colorMode) { // colorMode: 0 for monochrome, 1 for 3-bit, 2 for 4-bit
	return function(pixel) {
		let pins = [];

		// X input (expands right)
		for (let i = 0; i < Math.ceil(Math.log2(w)); i++) {
			pins.push([-1, (i * 2) + 1, true]);
		}

		// Y input (expands downward)
		for (let i = 0; i < Math.ceil(Math.log2(h)); i++) {
			pins.push([(i * 2) + 1, -1, true]);
		}

		if (colorMode === 1) { // 3-bit color
			pins.push([-1, 11, true]); // Red
			pins.push([-1, 13, true]); // Green
			pins.push([-1, 15, true]); // Blue
		} else if (colorMode === 2) { // 4-bit color
			for (let i = 0; i < 4; i++) {
				pins.push([-1, 11 + (i * 2), true]); // 4-bit color input
			}
		} else { // Monochrome
			pins.push([w - 4, -1, true]);
		}

		// Reset pin
		pins.push([w - 2, -1, true]);

		// Clock input
		pins.push([w, -1, true]);

		initializeCircuit(pixel, pins, w + 2, h + 2, false, pixel.circuitRotation, addDisplayCallback);

		let X = [];
		for (let i = 0; i < Math.ceil(Math.log2(w)); i++) {
			X.push(checkPin(pixel, pins, i));
		}

		let Y = [];
		for (let i = 0; i < Math.ceil(Math.log2(h)); i++) {
			Y.push(checkPin(pixel, pins, Math.ceil(Math.log2(w)) + i));
		}

		let color;
		if (colorMode === 1) {
			let red = checkPin(pixel, pins, Math.ceil(Math.log2(w)) + Math.ceil(Math.log2(h)));
			let green = checkPin(pixel, pins, Math.ceil(Math.log2(w)) + Math.ceil(Math.log2(h)) + 1);
			let blue = checkPin(pixel, pins, Math.ceil(Math.log2(w)) + Math.ceil(Math.log2(h)) + 2);
			color = `rgb(${red ? 255 : 0}, ${green ? 255 : 0}, ${blue ? 255 : 0})`;
		} else if (colorMode === 2) {
			let colorIndex = 0;
			for (let i = 0; i < 4; i++) {
				colorIndex += checkPin(pixel, pins, Math.ceil(Math.log2(w)) + Math.ceil(Math.log2(h)) + i) ? Math.pow(2, i) : 0;
			}
			color = colorPalette_4bit[colorIndex];
		} else {
			color = checkPin(pixel, pins, Math.ceil(Math.log2(w)) + Math.ceil(Math.log2(h))) ? "rgb(16, 230, 120)" : "rgb(16, 24, 32)";
		}

		let reset = checkPin(pixel, pins, Math.ceil(Math.log2(w)) + Math.ceil(Math.log2(h)) + (colorMode === 1 ? 3 : (colorMode === 2 ? 4 : 1)));
		let clock = checkPin(pixel, pins, Math.ceil(Math.log2(w)) + Math.ceil(Math.log2(h)) + (colorMode === 1 ? 4 : (colorMode === 2 ? 5 : 2)));

		let x_pos = 0;
		for (let i = 0; i < X.length; i++) {
			x_pos += X[i] ? Math.pow(2, (X.length - 1) - i) : 0;
		}

		let y_pos = 0;
		for (let i = 0; i < Y.length; i++) {
			y_pos += Y[i] ? Math.pow(2, (Y.length - 1) - i) : 0;
		}

		if (x_pos >= w || y_pos >= h) return;

		let px = pixel.x + 1 + x_pos;
		let py = pixel.y + 1 + y_pos;

		if (reset) {
			for (let y = 1; y <= h; y++) {
				for (let x = 1; x <= w; x++) {
					let reset_px = pixel.x + x;
					let reset_py = pixel.y + y;
					if (pixelMap[reset_px] && pixelMap[reset_px][reset_py] && pixelMap[reset_px][reset_py].element === "displayPixel") {
						pixelMap[reset_px][reset_py].color = "rgb(16, 24, 32)";
					}
				}
			}
			return;
		}

		if (clock) {
			if (pixelMap[px] && pixelMap[px][py] && pixelMap[px][py].element === "displayPixel") {
				pixelMap[px][py].color = color;
			}
		}
	};
}

elements.gridDisplay = {
	color: "#33FF66",
	category: "logic",
	maxSize: 1,
	onSelect: function() {
		// Prompt the user for display width, height, and color depth
		let width = parseInt(prompt("Enter the display width (e.g., 16, 32, 64):", "16"));
		let height = parseInt(prompt("Enter the display height (e.g., 16, 32, 64):", "16"));
		let colorDepth = parseInt(prompt("Enter the color depth (1 for monochrome, 3 for 3-bit, 4 for 4-bit):", "4"));

		// Set these values for the pixel
		elements.gridDisplay.displayWidth = width;
		elements.gridDisplay.displayHeight = height;
		elements.gridDisplay.displayColorDepth = colorDepth;
	},
	cc_stableTick: function(pixel) {
		// Get the display properties
		let width = elements.gridDisplay.displayWidth || 16;
		let height = elements.gridDisplay.displayHeight || 16;
		let colorDepth = elements.gridDisplay.displayColorDepth || 4;

		// Call general_display with the appropriate parameters
		let displayFunction = general_display(width, height, colorDepth === 1 ? 0 : (colorDepth === 3 ? 1 : 2));
		displayFunction(pixel);
	}
};

elements.displayPixel = {
	color: "#000000",
	category: "logic",
	state: "solid",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		if (pixel.start === pixelTicks) {
			pixel.color = "rgb(16, 24, 32)";
		}

		if (ccd_isLightmapEnabled && pixel.color) {
			let x = Math.floor(pixel.x / lightmapScale);
			let y = Math.floor(pixel.y / lightmapScale);
			lightmap[y][x] = { color: scaleList(rgbToArray(pixel.color), 2) };
		}
	}
};
