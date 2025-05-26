"use strict";
// Shade.ts -> Shade.js
// Constants
const SHADOW_UPDATE_INTERVAL = 4;
const SHADOW_BLUR_RADIUS = 5;
const SHADOW_INTENSITY = 128;
// Canvases
let shadowCanvas1;
let shadowCanvasCtx1;
let shadowCanvas2;
let shadowCanvasCtx2;

function initializeShade() {
	shadowCanvas1 = new OffscreenCanvas(width + 1, height + 1);
	shadowCanvasCtx1 = shadowCanvas1.getContext('2d');
	shadowCanvas2 = new OffscreenCanvas(width + 1, height + 1);
	shadowCanvasCtx2 = shadowCanvas2.getContext("2d");
}

function updateShadows() {
	if (pixelTicks % SHADOW_UPDATE_INTERVAL !== 0)
		return;
	const shadowCanvasImageData1 = shadowCanvasCtx1.createImageData(width + 1, height + 1);
	const shadowCanvasData1 = shadowCanvasImageData1.data;
	for (let pixel of currentPixels) {
		const exposed = getNeighbors(pixel).length !== 4;
		const alphaIndex = (pixel.y * (width + 1) + pixel.x) * 4 + 3;
		shadowCanvasData1[alphaIndex] = exposed ? 0 : SHADOW_INTENSITY;
	}
	shadowCanvasCtx1.putImageData(shadowCanvasImageData1, 0, 0);
	// Blur the shadows
	shadowCanvasCtx2.clearRect(0, 0, shadowCanvas2.width, shadowCanvas2.height);
	shadowCanvasCtx2.filter = `blur(${SHADOW_BLUR_RADIUS}px)`;
	shadowCanvasCtx2.drawImage(shadowCanvas1, 0, 0, shadowCanvas2.width, shadowCanvas2.height);
	shadowCanvasCtx2.filter = "none";
}

function drawShadows(ctx) {
	ctx.globalAlpha = 1.0;
	ctx.drawImage(shadowCanvas2, 0, 0, canvas.width, canvas.height);
}

// Hooks
runAfterReset(initializeShade);
runEveryTick(updateShadows);
renderPostPixel(drawShadows);
