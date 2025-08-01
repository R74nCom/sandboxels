"use strict";
// WorldEdit.js (compiled)
// Version: 1.0.1
// Constants
const w_accentColor = "#7cff62";
const w_style = {
	strokeWidth: 1,
	selectFill: "#57b64530",
	selectStroke: w_accentColor,
	selectDash: true,
	pasteFill: "#00FFFF40",
	pasteStroke: "#00FFFF"
};
// Global variables
let worldEditElements = {};
let pastePreviewCanvas;
let w_state = {
	firstSelectionPos: {x: 0, y: 0},
	selection: null,
	clipboard: null,
	prevNonWorldEditElement: "unknown"
};
// Define settings
let w_settingsTab;
let w_deselectOnResetSetting;
dependOn("betterSettings.js", () => {
	w_settingsTab = new SettingsTab("WorldEdit");
	w_deselectOnResetSetting = new Setting("Deselect on reset", "deselectOnReset", settingType.BOOLEAN, false, true);
	w_settingsTab.registerSettings("Selection", w_deselectOnResetSetting);
	settingsManager.registerTab(w_settingsTab);
}, true);

// Classes
class Rect {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	static fromCorners(start, end) {
		return new Rect(start.x, start.y, end.x - start.x, end.y - start.y);
	}

	static fromCornersXYXY(x, y, x2, y2) {
		return new Rect(x, y, x2 - x, y2 - y);
	}

	static fromGrid(grid, origin = {x: 0, y: 0}) {
		return new Rect(origin.x, origin.y, grid[0].length, grid.length);
	}

	get area() {
		return this.w * this.h;
	}

	get x2() {
		return this.x + this.w;
	}

	get y2() {
		return this.y + this.h;
	}

	set x2(val) {
		this.w = val - this.x;
	}

	set y2(val) {
		this.h = val - this.y;
	}

	copy() {
		return new Rect(this.x, this.y, this.w, this.h);
	}

	normalized() {
		return Rect.fromCornersXYXY(Math.min(this.x, this.x2), Math.min(this.y, this.y2), Math.max(this.x, this.x2), Math.max(this.y, this.y2));
	}
}

// Functions
function isPointInWorld(point) {
	return point.x >= 0 && point.x <= width && point.y >= 0 && point.y <= height;
}

function limitPointToWorld(point) {
	return {
		x: Math.max(0, Math.min(point.x, width)),
		y: Math.max(0, Math.min(point.y, height))
	};
}

function updatePastePreviewCanvas() {
	const clipboard = w_state.clipboard;
	if (!clipboard)
		return;
	const clipboardRect = Rect.fromGrid(clipboard);
	// Create canvas
	pastePreviewCanvas = new OffscreenCanvas(clipboardRect.w, clipboardRect.h);
	const pastePreviewCtx = pastePreviewCanvas.getContext("2d");
	const imageData = pastePreviewCtx.createImageData(clipboardRect.w, clipboardRect.h);
	const buffer = new Uint32Array(imageData.data.buffer);
	buffer.fill(0x00000000);
	for (let y = 0; y < clipboardRect.h; y++) {
		for (let x = 0; x < clipboardRect.w; x++) {
			if (clipboard[y][x])
				buffer[y * clipboardRect.w + x] = 0x44FFFF00;
		}
	}
	pastePreviewCtx.putImageData(imageData, 0, 0);
}

function renderSelection(ctx) {
	const selection = w_state.selection;
	if (!selection)
		return;
	const isSelecting = (mouseIsDown && mouseType === "left" && currentElement === "w_select");
	ctx.globalAlpha = 1.0;
	// Fill
	if (!isSelecting) {
		ctx.fillStyle = w_style.selectFill;
		ctx.fillRect(selection.x * pixelSize, selection.y * pixelSize, selection.w * pixelSize, selection.h * pixelSize);
	}
	// Dash if selection is big enough
	if (w_style.selectDash && selection.w >= 2 && selection.h >= 2)
		ctx.setLineDash([pixelSize, pixelSize]);
	// Stroke
	ctx.strokeStyle = w_style.selectStroke;
	ctx.lineWidth = w_style.strokeWidth;
	ctx.strokeRect(selection.x * pixelSize, selection.y * pixelSize, selection.w * pixelSize, selection.h * pixelSize);
	ctx.setLineDash([]);
}

function renderPastePreview(ctx) {
	if (currentElement !== 'w_paste')
		return;
	const clipboard = w_state.clipboard;
	if (!clipboard)
		return;
	const clipboardRect = Rect.fromGrid(clipboard, mousePos);
	// Fill
	ctx.fillStyle = w_style.pasteFill;
	ctx.fillRect(clipboardRect.x * pixelSize, clipboardRect.y * pixelSize, clipboardRect.w * pixelSize, clipboardRect.h * pixelSize);
	// Stroke
	ctx.strokeStyle = w_style.pasteStroke;
	ctx.lineWidth = w_style.strokeWidth;
	ctx.strokeRect(clipboardRect.x * pixelSize, clipboardRect.y * pixelSize, clipboardRect.w * pixelSize, clipboardRect.h * pixelSize);
	if (pastePreviewCanvas)
		ctx.drawImage(pastePreviewCanvas, mousePos.x * pixelSize, mousePos.y * pixelSize, clipboardRect.w * pixelSize, clipboardRect.h * pixelSize);
}

function addWorldEditKeybinds() {
	keybinds.w = () => {
		selectCategory("worldEdit");
	};
	keybinds.d = () => {
		elements.w_deselect.rawOnSelect();
	};
	keybinds.a = () => {
		elements.w_select_all.rawOnSelect();
	};
	keybinds.s = () => {
		selectElement("w_select");
		selectCategory("worldEdit");
	};
	keybinds.c = () => {
		elements.w_copy.rawOnSelect();
	};
	keybinds.v = () => {
		selectElement("w_paste");
		selectCategory("worldEdit");
	};
	keybinds.x = () => {
		elements.w_cut.rawOnSelect();
	};
	keybinds.Delete = () => {
		elements.w_delete.rawOnSelect();
	};
}

function modifySelectElement() {
	const originalSelectElement = selectElement;
	// @ts-ignore
	selectElement = (element) => {
		// Keep track of last non-worldEdit element
		if (!worldEditElements.hasOwnProperty(currentElement))
			w_state.prevNonWorldEditElement = currentElement;
		originalSelectElement(element);
	};
}

function addWorldEditElements(elementsToAdd) {
	for (const elementName in elementsToAdd) {
		const element = elementsToAdd[elementName];
		elements[elementName] = element;
		// Apply base settings for every worldEdit element
		element.category ?? (element.category = "worldEdit");
		element.color ?? (element.color = w_accentColor);
		element.tool ?? (element.tool = () => null);
		element.maxSize ?? (element.maxSize = 1);
		// Some elements will auto-deselect themselves
		if (!element.shouldStaySelected) {
			const originalOnSelect = element.onSelect;
			element.rawOnSelect = originalOnSelect;
			element.onSelect = function (...args) {
				originalOnSelect(...args);
				selectElement(w_state.prevNonWorldEditElement);
			};
		}
	}
}

function updateSelection() {
	if (!mouseIsDown)
		return;
	if (showingMenu)
		return;
	if (mouseType !== "left")
		return;
	if (currentElement !== "w_select")
		return;
	const rect = Rect.fromCorners(w_state.firstSelectionPos, limitPointToWorld(mousePos)).normalized();
	rect.x2 += 1;
	rect.y2 += 1;
	w_state.selection = rect;
}

// Elements
worldEditElements.w_deselect = {
	onSelect: function () {
		w_state.selection = null;
		if (pixelTicks != 0)
			logMessage("Deselected area.");
	}
};
worldEditElements.w_select_all = {
	onSelect: function () {
		w_state.selection = new Rect(0, 0, width + 1, height + 1);
		logMessage("Selected everything.");
	}
};
worldEditElements.w_select = {
	onMouseDown: function () {
		if (showingMenu)
			return;
		if (!isPointInWorld(mousePos))
			return;
		if (mouseType !== "left")
			return;
		w_state.firstSelectionPos = mousePos;
	},
	shouldStaySelected: true
};
worldEditElements.w_copy = {
	onSelect: function () {
		const selection = w_state.selection;
		if (!selection) {
			logMessage("Error: Nothing is selected.");
			return;
		}
		// Copy pixels
		w_state.clipboard = [];
		let clipboard = w_state.clipboard;
		for (let y = selection.y; y < selection.y2; y++) {
			const row = [];
			for (let x = selection.x; x < selection.x2; x++) {
				row.push(structuredClone(pixelMap[x][y]));
			}
			clipboard.push(row);
		}
		updatePastePreviewCanvas();
		logMessage(`Copied ${selection.w}x${selection.h}=${selection.area} pixel area.`);
	}
};
worldEditElements.w_paste = {
	onMouseDown: function () {
		if (showingMenu)
			return;
		if (!isPointInWorld(mousePos))
			return;
		if (mouseType !== "left")
			return;
		const clipboard = w_state.clipboard;
		if (!clipboard) {
			logMessage("Error: Nothing in clipboard.");
			return;
		}
		const pasteOrigin = mousePos;
		// Paste pixels
		for (let y = 0; y < clipboard.length; y++) {
			for (let x = 0; x < clipboard[0].length; x++) {
				const clipboardPixel = clipboard[y][x];
				const dest = {x: pasteOrigin.x + x, y: pasteOrigin.y + y};
				if (!isPointInWorld(dest))
					continue; // Skip if out of bounds
				if (pixelMap[dest.x][dest.y])
					continue; // Skip if pixel already there
				if (!clipboardPixel)
					continue; // Skip if new pixel is air
				// Create pixel
				const newPixel = structuredClone(clipboardPixel);
				Object.assign(newPixel, dest);
				pixelMap[dest.x][dest.y] = newPixel;
				currentPixels.push(newPixel);
			}
		}
		const area = Rect.fromGrid(clipboard).area;
		logMessage(`Pasted ${clipboard[0].length}x${clipboard.length}=${area} pixel area.`);
	},
	shouldStaySelected: true
};
worldEditElements.w_cut = {
	onSelect: function () {
		const selection = w_state.selection;
		if (!selection) {
			logMessage("Error: Nothing is selected.");
			return;
		}
		// Cut pixels
		w_state.clipboard = [];
		let clipboard = w_state.clipboard;
		for (let y = selection.y; y < selection.y2; y++) {
			const row = [];
			for (let x = selection.x; x < selection.x2; x++) {
				row.push(structuredClone(pixelMap[x][y]));
				const pixel = pixelMap[x][y];
				const index = currentPixels.indexOf(pixel);
				if (index !== -1)
					currentPixels.splice(index, 1);
				if (pixel) {
					delete pixelMap[x][y];
				}
			}
			clipboard.push(row);
		}
		updatePastePreviewCanvas();
		logMessage(`Cut ${selection.w}x${selection.h}=${selection.area} pixel area.`);
	}
};
worldEditElements.w_delete = {
	onSelect: function () {
		const selection = w_state.selection;
		if (!selection) {
			logMessage("Error: Nothing is selected.");
			return;
		}
		// Delete pixels
		for (let y = selection.y; y < selection.y2; y++) {
			for (let x = selection.x; x < selection.x2; x++) {
				const pixel = pixelMap[x][y];
				const index = currentPixels.indexOf(pixel);
				if (index !== -1)
					currentPixels.splice(index, 1);
				if (pixel) {
					delete pixelMap[x][y];
				}
			}
		}
		logMessage(`Deleted ${selection.w}x${selection.h}=${selection.area} pixel area.`);
	}
};
// Setup and hooks
modifySelectElement();
addWorldEditElements(worldEditElements);
addWorldEditKeybinds();
runAfterReset(() => {
	if (w_deselectOnResetSetting.value)
		w_state.selection = null;
});
runAfterReset(updatePastePreviewCanvas);
renderPrePixel(updateSelection);
renderPostPixel(renderSelection);
renderPostPixel(renderPastePreview);
