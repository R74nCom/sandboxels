elements.igniter = {
	color: elements.fire.color,
	tool: function(pixel) {
		pixel.burnStart = pixelTicks;
		pixel.burning = true;
	},
	category: "tools",
	excludeRandom: true,
};