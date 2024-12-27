const DEFAULT_LIGHT_FACTOR = 0.8;
const MIN_LIGHT_INTENSITY = 0.6;  // If pixel is completely obscured, it will still have this amount of light

const MAX_DIRECT_NEIGHBORS = 4;  // getNeighbors() returns max 4 pixels
const FOLLOWUP_COORDS_TO_CHECK = [
	[-1, -1], [-1, 1], [1, -1], [1, 1],
	[-2, 0], [2, 0], [0, -2], [0, 2],
	[-3, 0], [3, 0], [0, -3], [0, 3],
	[-4, 0], [4, 0], [0, -4], [0, 4]
];

// Pre-initialize the list of transparent elements
let transparentElementsTmp = "glass,stained_glass,glass_shard,solid_diamond,ice,led_r,led_g,led_b".split(",");
let transparentElements = [];

// Function to create the list of transparent elements based on their properties
function initializeTransparentElements() {
	Object.keys(elements).forEach(elementName => {
		const element = elements[elementName];

		// Check if the element is in a gas or liquid state
		if (element.state === "gas") {
			transparentElements.push(elementName);
		}

		// Check if the element's category is "special"
		if (element.category === "special") {
			transparentElements.push(elementName);
		}

		// Check if the element has a custom flag for transparency
		if (element.putInTransparentList) {
			transparentElements.push(elementName);
		}
	});
}

// Call the function once at startup to populate the transparentElements list
initializeTransparentElements();

// Customizable frame interval for recalculating brightness
const calculateEveryNFrames = 2;
let frameCounter = 0;

// Cache for storing pixel brightnesses
let pixelBrightnessCache = {};

// scaleList should only be defined once
if (typeof scaleList === 'undefined') {
	function scaleList(numbers, scale) {
		return numbers.map(number => number * scale);
	}
}

function isOutOfBounds(x, y) {
	return x >= width || y >= height || x < 0 || y < 0;
}

function getOutOfBoundsNeighbors(pixel) {
	const outOfBoundsNeighbors = [];

	// Define the 4 direct neighbors: left, right, top, bottom
	const neighborsToCheck = [
		{ x: pixel.x - 1, y: pixel.y },
		{ x: pixel.x + 1, y: pixel.y },
		{ x: pixel.x, y: pixel.y - 1 },
		{ x: pixel.x, y: pixel.y + 1 }
	];

	// Check each of the neighbors to see if they are out of bounds
	neighborsToCheck.forEach(neighbor => {
		if (isOutOfBounds(neighbor.x, neighbor.y)) {
			outOfBoundsNeighbors.push(neighbor);
		}
	});

	return outOfBoundsNeighbors;
}

// Iterate over each pixel and either calculate or draw occlusion lighting
function applyLightingToPixels(ctx) {
	// Recalculate pixel brightnesses every `n` frames
	if (frameCounter % calculateEveryNFrames === 0) {
		currentPixels.forEach(pixel => {
			const brightness = calculateBrightness(pixel);
			pixelBrightnessCache[`${pixel.x},${pixel.y}`] = brightness;  // Cache the brightness
		});
	}

	// Draw pixels based on cached brightness
	currentPixels.forEach(pixel => {
		const brightness = pixelBrightnessCache[`${pixel.x},${pixel.y}`] || 1;  // Default to full brightness if not calculated yet
		drawPixelShade(ctx, pixel, brightness);
	});

	// Increment the frame counter
	frameCounter++;
}

// Darken a pixel based on brightness
function drawPixelShade(ctx, pixel, brightness) {
	ctx.globalAlpha = 1.0;
	ctx.fillStyle = `rgba(0, 0, 0, ${1 - brightness})`;
	ctx.fillRect(pixel.x * pixelSize, pixel.y * pixelSize, pixelSize, pixelSize);
}

// Compute brightness for a given pixel
function calculateBrightness(pixel) {
	const neighboringPixelsCount = getNeighbors(pixel).length + getOutOfBoundsNeighbors(pixel).length;

	// If the pixel has enough light-blocking neighbors, perform a deeper search
	if (neighboringPixelsCount >= MAX_DIRECT_NEIGHBORS) {
		const lightFactor = computeBrightnessFurther(pixel);
		return adjustBrightness(lightFactor);
	}

	return 1;  // Full brightness
}

// Compute brightness based on further pixels that block light
function computeBrightnessFurther(pixel) {
	let lightBlockers = 0;

	FOLLOWUP_COORDS_TO_CHECK.forEach(offset => {
		const [dx, dy] = offset;
		const xCoord = pixel.x + dx;
		const yCoord = pixel.y + dy;

		if (isOutOfBounds(xCoord, yCoord)) {
			lightBlockers++;
			return;
		}

		// Check if the element is transparent
		const element = pixelMap[xCoord][yCoord];
		if (element != undefined && !transparentElements.includes(element.element)) {
			lightBlockers++;
		}
	});

	return 1 - (lightBlockers / FOLLOWUP_COORDS_TO_CHECK.length);
}

// Adjust brightness based on light factor
function adjustBrightness(lightFactor) {
	return lightFactor * DEFAULT_LIGHT_FACTOR + MIN_LIGHT_INTENSITY;
}

renderPostPixel(applyLightingToPixels);
