// Better_jayd_shader.js by Redbirdly
// Based on shader_by_jayd.js but faster/improved

var shaderElements = {
	fire: {radius: 3, alpha: 0.25},
	cold_fire: {radius: 3, alpha: 0.25},
	light: {radius: 2, alpha: 0.75},
	laser: {radius: 2, alpha: 0.75},
	plasma: {radius: 3, alpha: 0.5},
	electric: {radius: 2, alpha: 0.25},
	heat_ray: {radius: 3, alpha: 0.25},
	freeze_ray: {radius: 3, alpha: 0.25},
	flash: {radius: 3, alpha: 0.7},
	smoke: {radius: 2, alpha: 0.25},
	radiation: {radius: 2, alpha: 0.25},
	led_r: {radius: 2, led: true, alpha: 0.25},
	led_g: {radius: 2, led: true, alpha: 0.25},
	led_b: {radius: 2, led: true, alpha: 0.25}
};

// Change renderers
Object.entries(shaderElements).forEach(([key, info]) => {
	var {color, category, radius, alpha, led} = info;

	elements[key].renderer = (pixel, ctx) => {
		// Make LEDs still work properly
		if (led) {
			drawSquare(ctx, pixel.color, pixel.x, pixel.y, 1, 0.5);
			if (!pixel.charge) {return;}
		}

		// Taking drawSquare code out of function for performance reasons
		ctx.fillStyle = pixel.color;
		if (ctx.globalAlpha !== alpha) { ctx.globalAlpha = alpha; }

		// Draw circle
		switch (radius) {
			case 3:
				ctx.fillRect((pixel.x - 2) * pixelSize, (pixel.y - 2) * pixelSize, pixelSize * 5, pixelSize * 5);

				ctx.fillRect((pixel.x - 3) * pixelSize, (pixel.y) * pixelSize,     pixelSize, pixelSize);
				ctx.fillRect((pixel.x + 3) * pixelSize, (pixel.y) * pixelSize,     pixelSize, pixelSize);
				ctx.fillRect((pixel.x) * pixelSize,     (pixel.y - 3) * pixelSize, pixelSize, pixelSize);
				ctx.fillRect((pixel.x) * pixelSize,     (pixel.y + 3) * pixelSize, pixelSize, pixelSize);
				break;
			case 2:
				ctx.fillRect((pixel.x - 1) * pixelSize, (pixel.y - 1) * pixelSize, pixelSize * 3, pixelSize * 3);

				ctx.fillRect((pixel.x - 2) * pixelSize, (pixel.y) * pixelSize,     pixelSize * 5, pixelSize);
				ctx.fillRect((pixel.x) * pixelSize,     (pixel.y - 2) * pixelSize, pixelSize, pixelSize * 5);
				break;
			default:
				circleCoords(pixel.x, pixel.y, radius).forEach(coord => {
					ctx.fillRect((coord.x), (coord.y), pixelSize, pixelSize);
				});
				break;
		}
	};
});
