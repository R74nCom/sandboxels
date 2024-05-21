// Mod that makes fire look better with dark red at the top of the flame

let topColor = 'rgb(130, 0, 0)';
let blending = 0.7;

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

	if (Math.random()<0.1) {
		let originalColor = pixel.color;
		pixel.color = blendColors(originalColor, topColor, blending);
	}
};
