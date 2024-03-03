elements.primer_up = {
	behavior: behaviors.SUPPORT,
	reactions: {
		"fire": { "charge1": 1 }
	},
	properties: {
		range: 100,
		pushTime: 0,
		pushLength: 5,
		pushStrength: 100,
	},
	tick: function (pixel) {
		pixel.range ??= 10;
		pixel.pushTime ??= 0;
		pixel.pushLength ??= 100;
		pixel.pushStrength ??= 100;
		if (isNaN(pixel.pushTime) || pixel.pushTime < 0) { pixel.pushTime = 0 };

		if (pixel.charge) {
			pixel.pushTime = pixel.pushLength;
		};

		if (pixel.pushTime > 0) {
			for (h = 0; h < pixel.pushStrength; h++) {
				for (i = (pixel.range - 1); i >= 0; i--) {
					if (!isEmpty(pixel.x, pixel.y - 1 - i, true)) {
						tryMove(pixelMap[pixel.x][pixel.y - 1 - i], pixel.x, pixel.y - 2 - i);
					};
				};
			};
			pixel.pushTime--;
		};

		doDefaults(pixel);
	},
	color: "#c0c0c0",
	colorOn: "#ffffff",
	category: "machines",
	tempHigh: 1500,
	stateHigh: "molten_glass",
	conduct: 1
};
elements.primer_down = {
	behavior: behaviors.SUPPORT,
	reactions: {
		"fire": { "charge1": 1 }
	},
	properties: {
		range: 100,
		pushTime: 0,
		pushLength: 5,
		pushStrength: 100,
	},
	tick: function (pixel) {
		pixel.range ??= 10;
		pixel.pushTime ??= 0;
		pixel.pushLength ??= 100;
		pixel.pushStrength ??= 100;
		if (isNaN(pixel.pushTime) || pixel.pushTime < 0) { pixel.pushTime = 0 };

		if (pixel.charge) {
			pixel.pushTime = pixel.pushLength;
		};

		if (pixel.pushTime > 0) {
			for (h = 0; h < pixel.pushStrength; h++) {
				for (i = (pixel.range - 1); i >= 0; i--) {
					if (!isEmpty(pixel.x, pixel.y + 1 + i, true)) {
						tryMove(pixelMap[pixel.x][pixel.y + 1 + i], pixel.x, pixel.y + 2 + i);
					};
				};
			};
			pixel.pushTime--;
		};

		doDefaults(pixel);
	},
	color: "#c0c0c0",
	colorOn: "#ffffff",
	category: "machines",
	tempHigh: 1500,
	stateHigh: "molten_glass",
	conduct: 1
};
elements.primer_right = {
	behavior: behaviors.SUPPORT,
	reactions: {
		"fire": { "charge1": 1 }
	},
	properties: {
		range: 100,
		pushTime: 0,
		pushLength: 5,
		pushStrength: 100,
	},
	tick: function (pixel) {
		pixel.range ??= 10;
		pixel.pushTime ??= 0;
		pixel.pushLength ??= 100;
		pixel.pushStrength ??= 100;
		if (isNaN(pixel.pushTime) || pixel.pushTime < 0) { pixel.pushTime = 0 };

		if (pixel.charge) {
			pixel.pushTime = pixel.pushLength;
		};

		if (pixel.pushTime > 0) {
			for (h = 0; h < pixel.pushStrength; h++) {
				for (i = (pixel.range - 1); i >= 0; i--) {
					if (!isEmpty(pixel.x + 1 + i, pixel.y, true)) {
						tryMove(pixelMap[pixel.x + 1 + i][pixel.y], pixel.x + 2 + i, pixel.y);
					};
				};
			};
			pixel.pushTime--;
		};

		doDefaults(pixel);
	},
	color: "#c0c0c0",
	colorOn: "#ffffff",
	category: "machines",
	tempHigh: 1500,
	stateHigh: "molten_glass",
	conduct: 1
};
elements.primer_left = {
	behavior: behaviors.SUPPORT,
	reactions: {
		"fire": { "charge1": 1 }
	},
	properties: {
		range: 100,
		pushTime: 0,
		pushLength: 5,
		pushStrength: 100,
	},
	tick: function (pixel) {
		pixel.range ??= 10;
		pixel.pushTime ??= 0;
		pixel.pushLength ??= 100;
		pixel.pushStrength ??= 100;
		if (isNaN(pixel.pushTime) || pixel.pushTime < 0) { pixel.pushTime = 0 };

		if (pixel.charge) {
			pixel.pushTime = pixel.pushLength;
		};

		if (pixel.pushTime > 0) {
			for (h = 0; h < pixel.pushStrength; h++) {
				for (i = (pixel.range - 1); i >= 0; i--) {
					if (!isEmpty(pixel.x - 1 - i, pixel.y, true)) {
						tryMove(pixelMap[pixel.x - 1 - i][pixel.y], pixel.x - 2 - i, pixel.y);
					};
				};
			};
			pixel.pushTime--;
		};

		doDefaults(pixel);
	},
	color: "#c0c0c0",
	colorOn: "#ffffff",
	category: "machines",
	tempHigh: 1500,
	stateHigh: "molten_glass",
	conduct: 1
}
elements.kerosene = {
	color: "#b3b38b",
	behavior: behaviors.LIQUID,
	behaviorOn: [
		"XX|XX|XX",
		"XX|CH:fire|XX",
		"XX|XX|XX",
	],
	conduct: 0.09,
	tick: function (pixel) {
		if (pixel.temp > 220 && !pixel.burning) {
			pixel.burning = true;
			pixel.burnStart = pixelTicks;
		}
	},
	reactions: {
		"glue": { elem2: null, chance: 0.05 },
		"wax": { elem2: null, chance: 0.005 },
		"melted_wax": { elem2: null, chance: 0.025 },
	},
	category: "liquids",
	tempHigh: 2100,
	stateHigh: "fire",
	burn: 95,
	burnTime: 2000,
	burnInto: ["carbon_dioxide", "fire"],
	viscosity: 3,
	state: "liquid",
	density: 850
}
if (!elements.hydrogen.reactions) elements.hydrogen.reactions = {};
elements.hydrogen.reactions.oxygen = { elem1: "kerosene", elem2: null }
elements.combustion_sesor = {
	behavior: behaviors.SUPPORT,
	reactions: {
		"fire": { "charge1": 1 }
	},
	color: "#C70039",
	colorOn: "#ffffff",
	category: "machines",
	tempHigh: 1500,
	stateHigh: "molten_glass",
	conduct: 1
};
elements.insulation_powder= {
	behavior: behaviors.SUPPORT,
	reactions: {
		"fire": { "charge1": 1 }
	},
	color: "#00FFFF",
	category: "powders",
	tempHigh: 1500,
	stateHigh: "molten_glass",
	insulate: true,
};
elements.conductive_insulation_powder = {
	behavior: behaviors.SUPPORT,
	reactions: {
		"fire": { "charge1": 1 }
	},
	color: "#FFFF00",
	colorOn: "#ffffff",
	category: "powders",
	tempHigh: 1500,
	stateHigh: "molten_glass",
	insulate: true,
	conduct: 1
};
elements.engine_up = {
	behavior: behaviors.SUPPORT,
	reactions: {
		"fire": { "charge1": 1 }
	},
	properties: {
		range: 25,
		pushTime: 0,
		pushLength: 2.5,
		pushStrength: 100,
	},
	tick: function (pixel) {
		pixel.range ??= 5;
		pixel.pushTime ??= 0;
		pixel.pushLength ??= 25;
		pixel.pushStrength ??= 25;
		if (isNaN(pixel.pushTime) || pixel.pushTime < 0) { pixel.pushTime = 0 };

		if (pixel.charge) {
			pixel.pushTime = pixel.pushLength;
		};

		if (pixel.pushTime > 0) {
			for (h = 0; h < pixel.pushStrength; h++) {
				for (i = (pixel.range - 1); i >= 0; i--) {
					if (!isEmpty(pixel.x, pixel.y - 1 - i, true)) {
						tryMove(pixelMap[pixel.x][pixel.y - 1 - i], pixel.x, pixel.y - 2 - i);
					};
				};
			};
			pixel.pushTime--;
		};

		doDefaults(pixel);
	},
	color: "#c0c0c0",
	colorOn: "#ffffff",
	category: "machines",
	tempHigh: 1500,
	stateHigh: "molten_glass",
	conduct: 1
};
elements.engine_down = {
	behavior: behaviors.SUPPORT,
	reactions: {
		"fire": { "charge1": 1 }
	},
	properties: {
		range: 25,
		pushTime: 0,
		pushLength: 2.5,
		pushStrength: 100,
	},
	tick: function (pixel) {
		pixel.range ??=  5;
		pixel.pushTime ??= 0;
		pixel.pushLength ??= 25;
		pixel.pushStrength ??= 25;
		if (isNaN(pixel.pushTime) || pixel.pushTime < 0) { pixel.pushTime = 0 };

		if (pixel.charge) {
			pixel.pushTime = pixel.pushLength;
		};

		if (pixel.pushTime > 0) {
			for (h = 0; h < pixel.pushStrength; h++) {
				for (i = (pixel.range - 1); i >= 0; i--) {
					if (!isEmpty(pixel.x, pixel.y + 1 + i, true)) {
						tryMove(pixelMap[pixel.x][pixel.y + 1 + i], pixel.x, pixel.y + 2 + i);
					};
				};
			};
			pixel.pushTime--;
		};

		doDefaults(pixel);
	},
	color: "#c0c0c0",
	colorOn: "#ffffff",
	category: "machines",
	tempHigh: 1500,
	stateHigh: "molten_glass",
	conduct: 1
};
elements.engine_right = {
	behavior: behaviors.SUPPORT,
	reactions: {
		"fire": { "charge1": 1 }
	},
	properties: {
		range: 25,
		pushTime: 0,
		pushLength: 2.5,
		pushStrength: 25,
	},
	tick: function (pixel) {
		pixel.range ??= 5;
		pixel.pushTime ??= 0;
		pixel.pushLength ??= 25;
		pixel.pushStrength ??= 25;
		if (isNaN(pixel.pushTime) || pixel.pushTime < 0) { pixel.pushTime = 0 };

		if (pixel.charge) {
			pixel.pushTime = pixel.pushLength;
		};

		if (pixel.pushTime > 0) {
			for (h = 0; h < pixel.pushStrength; h++) {
				for (i = (pixel.range - 1); i >= 0; i--) {
					if (!isEmpty(pixel.x + 1 + i, pixel.y, true)) {
						tryMove(pixelMap[pixel.x + 1 + i][pixel.y], pixel.x + 2 + i, pixel.y);
					};
				};
			};
			pixel.pushTime--;
		};

		doDefaults(pixel);
	},
	color: "#c0c0c0",
	colorOn: "#ffffff",
	category: "machines",
	tempHigh: 1500,
	stateHigh: "molten_glass",
	conduct: 1
};
elements.engine_left = {
	behavior: behaviors.SUPPORT,
	reactions: {
		"fire": { "charge1": 1 }
	},
	properties: {
		range: 25,
		pushTime: 0,
		pushLength: 2.5,
		pushStrength: 25,
	},
	tick: function (pixel) {
		pixel.range ??= 5;
		pixel.pushTime ??= 0;
		pixel.pushLength ??= 25;
		pixel.pushStrength ??= 25;
		if (isNaN(pixel.pushTime) || pixel.pushTime < 0) { pixel.pushTime = 0 };

		if (pixel.charge) {
			pixel.pushTime = pixel.pushLength;
		};

		if (pixel.pushTime > 0) {
			for (h = 0; h < pixel.pushStrength; h++) {
				for (i = (pixel.range - 1); i >= 0; i--) {
					if (!isEmpty(pixel.x - 1 - i, pixel.y, true)) {
						tryMove(pixelMap[pixel.x - 1 - i][pixel.y], pixel.x - 2 - i, pixel.y);
					};
				};
			};
			pixel.pushTime--;
		};

		doDefaults(pixel);
	},
	color: "#c0c0c0",
	colorOn: "#ffffff",
	category: "machines",
	tempHigh: 1500,
	stateHigh: "molten_glass",
	conduct: 1
}
elements.steam_sesor = {
	behavior: behaviors.SUPPORT,
	reactions: {
		"steam": { "charge1": 1 }
	},
	color: "#0000FF",
	colorOn: "#ffffff",
	category: "machines",
	tempHigh: 1500,
	stateHigh: "molten_glass",
	conduct: 1
};