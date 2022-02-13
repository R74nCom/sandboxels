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

elements.cursed_shock = {
	color: ["#ffff00", "#00ff00", "#ffff00", "#00ff00", "#ffff00", "#00ff00", "#ffff00", "#00ff00"],
	tool: function(pixel) {
		var con = elements[pixel.element].conduct;
		if (con == undefined) {con = 0}
		if (Math.random() < con || con == 0) { // If random number is less than conductivity, or anyway
			if (!pixel.charge && !pixel.chargeCD) {
				pixel.charge = 1;
				if (elements[pixel.element].colorOn) {
					pixel.color = pixelColorPick(pixel);
				}
			}
		}
		if(Math.random() > con) {
			if (elements[pixel.element].insulate != true) { // Otherwise heat the pixel (Resistance simulation)
				pixel.temp += 0.25;
				pixelTempCheck(pixel);
			}
		}
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
