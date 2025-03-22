/* TODO:

- warning and automatic disable for non-chromium users
- firefly glow
- sun temperature-dependent glow strength

*/

var isChromium = !!window.chrome;

if (!isChromium) {
    window.addEventListener("load",function(){
        console.log(1)
        logMessage("Error: glow.js only works on Chrome or Chromium-based browsers.")
    })
}
else {

addCanvasLayer("glowmod");
addCanvasLayer("glowmod2");
canvasLayersPre.unshift(canvasLayers["glowmod"]);
glowmodCtx = canvasLayers["glowmod"].getContext("2d");
glowmodCtx2 = canvasLayers["glowmod2"].getContext("2d");
delete canvasLayers.glowmod;
delete canvasLayers.glowmod2;


//--------------------------------------------------------------------------------------------------------------



elements.fire.emit = true;
elements.lightning.emit = 15;
elements.electric.emit = true;
elements.plasma.emit = true;
elements.uranium.emit = 3;
elements.uranium.emitColor = "#009800";
elements.rainbow.emit = true;
elements.static.emit = true;
elements.flash.emit = true;
elements.cold_fire.emit = true;
elements.blaster.emit = true;
elements.ember.emit = true;
elements.fw_ember.emit = 10;
elements.bless.emit = true;
elements.pop.emit = true;
elements.explosion.emit = true;
elements.n_explosion.emit = 10;
elements.supernova.emit = 20;
elements.midas_touch.emit = true;
elements.fireball.emit = true;
elements.sun.emit = 15;
elements.light.emit = 3;
elements.liquid_light.emit = true;
elements.laser.emit = 3;
elements.neutron.emit = 3;
elements.proton.emit = 3;
elements.radiation.emit = 3;
elements.fallout.emit = 3;
elements.rad_steam.emit = 2;
elements.rad_steam.emitColor = "#6ad48c";
elements.rad_cloud.emit = 2;
elements.rad_cloud.emitColor = "#009800";
elements.rad_glass.emit = 2;
elements.rad_glass.emitColor = "#009800";
elements.rad_shard.emit = 2;
elements.rad_shard.emitColor = "#009800";
elements.malware.emit = 2;
elements.border.emit = 2;
elements.void.emit = 10;


//---------------------------------------------------------------------------------------------------------------


viewInfo[1] = { // Blur Glow (Emissive pixels only)
    name: "",
    pixel: viewInfo[1].pixel,
    effects: true,
    colorEffects: true,
    pre: function(ctx) {
        glowmodCtx2.canvas.width = ctx.canvas.width;
        glowmodCtx2.canvas.height = ctx.canvas.height;
    },
    pixel: viewInfo[1].pixel,
    post: function(ctx) {
        glowmodCtx.canvas.width = ctx.canvas.width;
        glowmodCtx.canvas.height = ctx.canvas.height;
        glowmodCtx.filter = "blur(30px)";
        // Draw the blurred content on the canvas
        glowmodCtx.drawImage(glowmodCtx2.canvas, 0, 0);
        glowmodCtx.filter = "none";
    },
};

renderEachPixel(function(pixel,ctx) {
    if (view === 1) {
        if (elements[pixel.element].emit || pixel.emit || (elements[pixel.element].colorOn && pixel.charge)) {
            let a = (settings.textures !== 0) ? pixel.alpha : undefined;
            let d = elements[pixel.element].emit||true;
            if (d === true) d = 5;
            let r = Math.floor(d/2);
            drawSquare(glowmodCtx2,elements[pixel.element].emitColor||pixel.color,pixel.x-r,pixel.y-r,d,a);
        }
        if (pixel.charge && !elements[pixel.element].colorOn) {
            drawSquare(glowmodCtx2,"#ffff00",pixel.x-1,pixel.y-1,3);
        }
    }
})

}





















































//------------------------------------------------------------------------------------------------------------------














































elements.shader_test = {
    color: "#FFFFFF",
    category: "special",
    renderer: function(pixel,ctx) {
        var circlec = circleCoords(pixel.x, pixel.y, 3);
            for (var i = 0; i < circlec.length; i++){
            var coord = circlec[i];
            var x = coord.x;
            var y = coord.y;
            drawSquare(ctx,"#ffffff",x,y,1,0.25)
        }
    }
}
elements.fire.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 3);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        drawSquare(ctx,pixel.color,x,y,1,0.25)
    }
}
elements.cold_fire.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 3);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        drawSquare(ctx,pixel.color,x,y,1,0.25)
    }
}
elements.light.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 2);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        drawSquare(ctx,pixel.color,x,y,1,0.75)
    }
}
elements.laser.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 2);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        drawSquare(ctx,pixel.color,x,y,1,0.75)
    }
}
elements.plasma.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 3);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        drawSquare(ctx,pixel.color,x,y,1,0.5)
    }
}
elements.electric.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 2);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        drawSquare(ctx,pixel.color,x,y,1,0.25)
    }
}
elements.heat_ray.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 3);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        drawSquare(ctx,pixel.color,x,y,1,0.25)
    }
}
elements.freeze_ray.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 3);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        drawSquare(ctx,pixel.color,x,y,1,0.25)
    }
}
elements.flash.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 3);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        drawSquare(ctx,pixel.color,x,y,1,0.7)
    }
}
elements.smoke.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 2);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        drawSquare(ctx,pixel.color,x,y,1,0.25)
    }
}
elements.radiation.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 2);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        drawSquare(ctx,pixel.color,x,y,1,0.25)
    }
}
elements.led_r.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 3);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        if (pixel.charge) {
            drawSquare(ctx,pixel.color,x,y,1,0.5)
        }
        else {
            drawSquare(ctx,pixel.color,pixel.x,pixel.y,1,1)
        }
    }
}
elements.led_g.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 3);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        if (pixel.charge) {
            drawSquare(ctx,pixel.color,x,y,1,0.5)
        }
        else {
            drawSquare(ctx,pixel.color,pixel.x,pixel.y,1,1)
        }
    }
}
elements.led_b.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 3);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        if (pixel.charge) {
            drawSquare(ctx,pixel.color,x,y,1,0.5)
        }
        else {
            drawSquare(ctx,pixel.color,pixel.x,pixel.y,1,1)
        }
    }
}
elements.fw_ember.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 3);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        drawSquare(ctx,pixel.color,x,y,1,0.25)
    }
}



















































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
