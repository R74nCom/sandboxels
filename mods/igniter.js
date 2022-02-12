elements.igniter = {
	color: elements.fire.color,
	tool: function(pixel) {
		pixel.burnStart = pixelTicks;
		pixel.burning = true;
	},
	category: "tools",
	excludeRandom: true,
};

elements.extinguisher = {
	color: "#bad1e3",
	tool: function(pixel) {
		if(pixel.burnStart) { delete pixel.burnStart }
		pixel.burning = false;
	},
	category: "tools",
	excludeRandom: true,
};
