var modName = "mods/color_tools.js";
var libraryMod = "mods/code_library.js";

if(enabledMods.includes(libraryMod)) {
	var colorToolCounter = 0;
	
	function colorToolCounterIncrement() {
		if(typeof(colorToolCounter) === "undefined") {
			colorToolCounter = 0;
		};
		colorToolCounter++;
	};
	colorToolCounterInterval = setInterval(colorToolCounterIncrement, 50);

	elements.multiply_color = {
		color: ["#c27070","#c29c70","#c2c270","#70c270","#70c2c2","#7070c2","#c270c2"],
		tool: function(pixel) {
			if(colorToolCounter % 3 == 0) {
				pixel.color = multiplyColors(pixel.color,currentColor,"rgb");
				colorToolCounter = 0;
			};
		},
		customColor: true,
		category: "color tools", //the toolbar is getting cluttered
		excludeRandom: true, //the toolbar is getting cluttered
	}

	elements.divide_color = { //can't get it to work how I want it to work
		color: ["#c27070","#c29c70","#c2c270","#70c270","#70c2c2","#7070c2","#c270c2"],
		tool: function(pixel) {
			if(colorToolCounter % 3 == 0) {
				pixel.color = divideColors(pixel.color,currentColor,"rgb");
				colorToolCounter = 0;
			};
		},
		customColor: true,
		category: "color tools",
		excludeRandom: true,
	}

	elements.add_color = {
		color: ["#c27070","#c29c70","#c2c270","#70c270","#70c2c2","#7070c2","#c270c2"],
		tool: function(pixel) {
			if(colorToolCounter % 3 == 0) {
				pixel.color = addColors(pixel.color,currentColor,"rgb");
				colorToolCounter = 0;
			};
		},
		customColor: true,
		category: "color tools",
		excludeRandom: true,
	}

	elements.subtract_color = {
		color: ["#c27070","#c29c70","#c2c270","#70c270","#70c2c2","#7070c2","#c270c2"],
		tool: function(pixel) {
			if(colorToolCounter % 3 == 0) {
				pixel.color = subtractColors(pixel.color,currentColor,"rgb");
				colorToolCounter = 0;
			};
		},
		customColor: true,
		category: "color tools",
		excludeRandom: true,
	}

	elements.grayscale = {
		color: ["#7f7f7f"],
		tool: function(pixel) {
			// convert the hex of currentColor to rgb and set it as a string
			var oldColor = hexToRGB(rgbToHex(pixel.color))
			var lightness = Math.round((oldColor.r * 0.299) + (oldColor.g * 0.587) + (oldColor.b * 0.114))
			var finalColor = [lightness, lightness, lightness]
			pixel.color = "rgb(" + finalColor.join(",") + ")"
		},
		category: "color tools",
		excludeRandom: true,
	}

	elements.invert = {
		color: ["#ff0000", "#00ffff"],
		tool: function(pixel) {
		  if(colorToolCounter % 3 == 0) {
			// convert the hex of currentColor to rgb and set it as a string
			var oldColor = hexToRGB(rgbToHex(pixel.color))
			var finalColor = [(255 - oldColor.r), (255 - oldColor.g), (255 - oldColor.b)]
			pixel.color = "rgb(" + finalColor.join(",") + ")"
			colorToolCounter = 0;
		  };
		},
		category: "color tools",
		excludeRandom: true,
	}

	elements.reverse_R_G_B = {
		color: ["#7f7f7f"],
		tool: function(pixel) {
		  if(colorToolCounter % 3 == 0) {
			// convert the hex of currentColor to rgb and set it as a string
			var oldColor = hexToRGB(rgbToHex(pixel.color))
			var finalColor = [oldColor.b, oldColor.g, oldColor.r]
			pixel.color = "rgb(" + finalColor.join(",") + ")"
			colorToolCounter = 0;
		  };
		},
		category: "color tools",
		excludeRandom: true,
	}

	elements.shift_R_G_B = {
		color: ["#7f7f7f"],
		tool: function(pixel) {
		  if(colorToolCounter % 3 == 0) {
			// convert the hex of currentColor to rgb and set it as a string
			var oldColor = hexToRGB(rgbToHex(pixel.color))
			var finalColor = [oldColor.g, oldColor.b, oldColor.r]
			pixel.color = "rgb(" + finalColor.join(",") + ")"
			colorToolCounter = 0;
		  };
		},
		category: "color tools",
		excludeRandom: true,
	}
} else {
	alert(`The ${libraryMod} mod is required and has been automatically inserted (reload for this to take effect).`)
	enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod)
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
};
