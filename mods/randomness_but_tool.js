elements.burn = {
	color: ["#FF6B21", "#FFA600", "#FF4000"],
	tool: function(pixel) {
		pixel.burnStart = pixelTicks;
		pixel.burning = true;
	},
	category: "tools",
	excludeRandom: true,
};

elements.cursed_shock = {
	color: ["#ffff00", "#00ff00", "#ffff00", "#00ff00", "#ffff00", "#00ff00", "#ffff00", "#00ff00"],
	tool: function(pixel) {
		if(pixel.chargeCD) {
			delete pixel.chargeCD;
		};
		if (!pixel.charge) {
			pixel.charge = 1;
			if (elements[pixel.element].colorOn) {
				pixel.color = pixelColorPick(pixel);
			};
		};
	},
	category: "tools",
	excludeRandom: true,
};
