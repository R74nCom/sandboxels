// RedBirdly's mod that makes fire look better with dark red at the top of the flame

var topColor = 'rgb(130, 0, 10)';
var blending = 0.9;

var topColdFireColor = 'rgb(30, 10, 110)';
var coldFireBlending = 0.9;

function cssColorToRGB(color) {
	let rgbMatch = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	return [parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3])];
}

function blendColors(color1, color2, weight) {
	const [r1, g1, b1] = cssColorToRGB(color1);
	const [r2, g2, b2] = cssColorToRGB(color2);

	const r = Math.round(r1 * weight + r2 * (1 - weight));
	const g = Math.round(g1 * weight + g2 * (1 - weight));
	const b = Math.round(b1 * weight + b2 * (1 - weight));

	return `rgb(${r}, ${g}, ${b})`;
}

let originalFireTick = elements.fire.tick;
elements.fire.tick = function(pixel) {
	// Call the original tick function
	originalFireTick(pixel);

	if (Math.random()<0.4) {
		let originalColor = pixel.color;
		pixel.color = blendColors(originalColor, topColor, blending);
	}
};

let originalColdFireTick = elements.cold_fire.tick;
elements.cold_fire.tick = function(pixel) {
	// Call the original tick function
	originalColdFireTick(pixel);

	if (Math.random()<0.4) {
		let originalColor = pixel.color;
		pixel.color = blendColors(originalColor, topColdFireColor, coldFireBlending);
	}
};

elements.fire.color = ["#ffcb31","#ffab21","#ff9600"];
elements.cold_fire.color = ["#11ddff","#2288dd"];
