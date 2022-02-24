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

elements.anti_gravity = {
	color: [elements.dirt.color[1],elements.dirt.color[1],elements.oxygen.color,elements.oxygen.color],
	tool: function(pixel) {
		pixel.r = 2;
	},
	category: "tools",
	excludeRandom: true,
};

elements.normal_gravity = {
	color: [elements.oxygen.color,elements.oxygen.color,elements.dirt.color[1],elements.dirt.color[1]],
	tool: function(pixel) {
		pixel.r = 0;
	},
	category: "tools",
	excludeRandom: true,
};

elements.rg1 = {
	color: [elements.dirt.color[14],elements.dirt.color[14],elements.liquid_oxygen.color,elements.liquid_oxygen.color],
	tool: function(pixel) {
		pixel.r = 1;
	},
	category: "tools",
	excludeRandom: true,
};

elements.rg3 = {
	color: [elements.liquid_oxygen.color,elements.liquid_oxygen.color,elements.dirt.color[14],elements.dirt.color[14]],
	tool: function(pixel) {
		pixel.r = 3;
	},
	category: "tools",
	excludeRandom: true,
};

elements.daoe = {
	name: "delete all of element",
	color: ["#a7a7a7", "#a7a7a7", "#a7a7a7", "#a7a7a7", "#000000", "#000000", "#000000", "#000000"],
	tool: function(pixel) {
		for (var i = 1; i < width; i++) {
			for (var j = 1; j < height; j++) {
				if (!isEmpty(i,j)) {
					if(pixelMap[i][j].element == pixel.element) {
						deletePixel(i,j)
					}
				}
			}
		}
	},
	category: "tools",
	excludeRandom: true,
};
