if(!settings) {
	settings = {}
}

if(!settings.bg) {
	settings.bg = "#000000"
}

elements.invisible_dye = {
	color: settings.bg,
	behavior: behaviors.LIQUID,
	tick: function(pixel) {
		var backgroundColor = hexToRGB(settings.bg);
		var rgbValue = "rgb("+backgroundColor.r+","+backgroundColor.g+","+backgroundColor.b+")";
		pixel.color = rgbValue;
	},
	hardness: 0.8,
	breakInto: "invisible_dye_gas",
	tempHigh: 110,
	stateHigh: "invisible_dye_gas",
	category: "special",
	state: "liquid",
        density: 1,
	stain: elements.dye.stain,
};

elements.invisible_dye_gas = {
	color: settings.bg,
	behavior: behaviors.GAS,
	tick: function(pixel) {
		var backgroundColor = hexToRGB(settings.bg);
		var rgbValue = "rgb("+backgroundColor.r+","+backgroundColor.g+","+backgroundColor.b+")";
		pixel.color = rgbValue;
	},
	hardness: 0.5,
	breakInto: "invisible_dye_gas",
	tempLow: 109,
	stateLow: "invisible_dye",
	category: "special",
	state: "liquid",
        density: 1,
	stain: elements.spray_paint.stain,
};
