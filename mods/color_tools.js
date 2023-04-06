var modName = "mods/color_tools.js";
var libraryMod = "mods/code_library.js";

if(enabledMods.includes(libraryMod)) {
	var colorToolCounter = 0;
	saturationAmount = 1;
	saturationOp = "add";
	luminanceAmount = 1;
	luminanceOp = "add";
	hueAmount = 1;
	hueOp = "add";
	colorToolElementFilter = "none";
	
	var ops = ["add","subtract","multiply","divide","set","min","max","+","-","*","x","×","/","÷","=",">",">=","<","<="];

	function colorToolFilterPrompt() {
		var preElement = prompt("Enter the elements you want to limit it to\nSeparate multiple elements with commas\nType \"none\" for no filter");
		if(preElement === null) {
			return false;
		};
		if(preElement.includes(",")) {
			preElement = preElement.split(",");
			colorToolElementFilter = preElement;
			return colorToolElementFilter;
		};
		colorToolElementFilter = preElement;
		return colorToolElementFilter;
	};

	function saturationPrompt() {
		var preSaturation = prompt("Enter the value you want to use");
		var preSatOp = prompt(`Enter the operation ("add", "subtract", "multiply", or "divide", or "set")`);
		
		//value check
		if(isNaN(parseFloat(preSaturation))) {
			if(preSaturation === "" || preSaturation === null) {
				alert("No value was specified! Defaulting to 1");
				preSaturation = 1;
			} else {
				alert("Invalid value! The value must be a number (defaulting to 1)");
				preSaturation = 1;
			};
		};
		preSaturation = parseFloat(preSaturation);
					
		//operation check
		if(!ops.includes(preSatOp.toLowerCase())) {
			if(preSatOp === "" || preSatOp === null) {
				alert(`No operation was specified! Defaulting to "add".`);
				preSatOp = "add";
			} else {
				alert(`Invalid operation! Only "add", "subract", "multiply", "divide", "set", "min", and "max" are accepted (defaulting to "add").`);			
				preSatOp = "add";
			};
		};
		
		saturationAmount = preSaturation;
		saturationOp = preSatOp;
		return [preSaturation, preSatOp];
	};

	function luminancePrompt() {
		var preLuminance = prompt("Enter the value you want to use");
		var preLumOp = prompt(`Enter the operation ("add", "subtract", "multiply", or "divide", or "set")`);

		//value check
		if(isNaN(parseFloat(preLuminance))) {
			if(preLuminance === "" || preLuminance === null) {
				alert("No value was specified! Defaulting to 1");
				preLuminance = 1;
			} else {
				alert("Invalid value! The value must be a number (defaulting to 1)");
				preLuminance = 1;
			};
		};

		//operation check
		if(!ops.includes(preLumOp.toLowerCase())) {
			if(preLumOp === "" || preLumOp === null) {
				alert(`No operation was specified! Defaulting to "add".`);
				preLumOp = "add";
			} else {
				alert(`Invalid operation! Only "add", "subract", "multiply", "divide", "set", "min", and "max" are accepted (defaulting to "add").`);			
				preLumOp = "add";
			};
		};
		preLuminance = parseFloat(preLuminance)
		
		luminanceAmount = preLuminance;
		luminanceOp = preLumOp;
		return [preLuminance, preLumOp];
	};

	function huePrompt() {
		var preHue = prompt("Enter the value you want to use");
		var preHueOp = prompt(`Enter the operation ("add", "subtract", "multiply", or "divide", or "set")`);

		//value check
		if(isNaN(parseFloat(preHue))) {
			if(preHue === "" || preHue === null) {
				alert("No value was specified! Defaulting to 1");
				preHue = 1;
			} else {
				alert("Invalid value! The value must be a number (defaulting to 1)");
				preHue = 1;
			};
		};
		
		preHue = parseFloat(preHue);

		//operation check
		if(!ops.includes(preHueOp.toLowerCase())) {
			if(preHueOp === "" || preHueOp === null) {
				alert(`No operation was specified! Defaulting to "add".`);
				preHueOp = "add";
			} else {
				alert(`Invalid operation! Only "add", "subract", "multiply", "divide", "set", "min", and "max" are accepted (defaulting to "add").`);			
				preHueOp = "add";
			};
		};
		
		hueAmount = preHue;
		hueOp = preHueOp;
		return [preHue, preHueOp];
	};

	elements.multiply_color = {
		color: ["#c27070","#c29c70","#c2c270","#70c270","#70c2c2","#7070c2","#c270c2"],
		tool: function(pixel) {
			var element = pixel.element;
			if(  colorToolElementFilter === "none" || ( (typeof(colorToolElementFilter) === "string" && element === colorToolElementFilter) || (Array.isArray(colorToolElementFilter) && colorToolElementFilter.includes(element)) )  ) {
				pixel.color = multiplyColors(pixel.color,currentColor,"rgb");
			};
		},
		customColor: true,
		cooldown: 3,
		category: "color tools", //the toolbar is getting cluttered
		excludeRandom: true, //the toolbar is getting cluttered
		desc: "<span style='color:#FF00FF' onClick=colorToolFilterPrompt()>Click here to configure the element filter (applies to all color tools).</span>",
	}

	elements.divide_color = {
		color: ["#c27070","#c29c70","#c2c270","#70c270","#70c2c2","#7070c2","#c270c2"],
		tool: function(pixel) {
			var element = pixel.element;
			if(  colorToolElementFilter === "none" || ( (typeof(colorToolElementFilter) === "string" && element === colorToolElementFilter) || (Array.isArray(colorToolElementFilter) && colorToolElementFilter.includes(element)) )  ) {
				pixel.color = divideColors(pixel.color,currentColor,"rgb");
			};
		},
		customColor: true,
		cooldown: 3,
		category: "color tools",
		excludeRandom: true,
		desc: "<span style='color:#FF00FF' onClick=colorToolFilterPrompt()>Click here to configure the element filter (applies to all color tools).</span>",
	}

	elements.add_color = {
		color: ["#c27070","#c29c70","#c2c270","#70c270","#70c2c2","#7070c2","#c270c2"],
		tool: function(pixel) {
			var element = pixel.element;
			if(  colorToolElementFilter === "none" || ( (typeof(colorToolElementFilter) === "string" && element === colorToolElementFilter) || (Array.isArray(colorToolElementFilter) && colorToolElementFilter.includes(element)) )  ) {
				pixel.color = addColors(pixel.color,currentColor,"rgb");
			};
		},
		customColor: true,
		cooldown: 3,
		category: "color tools",
		excludeRandom: true,
		desc: "<span style='color:#FF00FF' onClick=colorToolFilterPrompt()>Click here to configure the element filter (applies to all color tools).</span>",
	}

	elements.subtract_color = {
		color: ["#c27070","#c29c70","#c2c270","#70c270","#70c2c2","#7070c2","#c270c2"],
		tool: function(pixel) {
			var element = pixel.element;
			if(  colorToolElementFilter === "none" || ( (typeof(colorToolElementFilter) === "string" && element === colorToolElementFilter) || (Array.isArray(colorToolElementFilter) && colorToolElementFilter.includes(element)) )  ) {
				pixel.color = subtractColors(pixel.color,currentColor,"rgb");
			};
		},
		customColor: true,
		cooldown: 3,
		category: "color tools",
		excludeRandom: true,
		desc: "<span style='color:#FF00FF' onClick=colorToolFilterPrompt()>Click here to configure the element filter (applies to all color tools).</span>",
	}

	elements.hue = {
		color: ["#ff0000","#ccff00","#00ff66","#0066ff","#cc00ff","#ff0000"],
		tool: function(pixel) {
			var element = pixel.element;
			if(  colorToolElementFilter === "none" || ( (typeof(colorToolElementFilter) === "string" && element === colorToolElementFilter) || (Array.isArray(colorToolElementFilter) && colorToolElementFilter.includes(element)) )  ) {
				pixel.color = changeHue(pixel.color,hueAmount,hueOp,"rgb");
			};
		},
		cooldown: 3,
		category: "color tools",
		excludeRandom: true,
		desc: "<span style='color:#FF00FF' onClick=huePrompt()>Click here to configure the tool.</span><br/><span style='color:#FF00FF' onClick=colorToolFilterPrompt()>Click here to configure the element filter (applies to all color tools).</span>",
	};

	elements.saturation = {
		color: ["#808080","#996666","#b34d4d","#cc3333","#e61919","#ff0000"],
		tool: function(pixel) {
			var element = pixel.element;
			if(  colorToolElementFilter === "none" || ( (typeof(colorToolElementFilter) === "string" && element === colorToolElementFilter) || (Array.isArray(colorToolElementFilter) && colorToolElementFilter.includes(element)) )  ) {
				pixel.color = changeSaturation(pixel.color,saturationAmount,saturationOp,"rgb");
			};
		},
		cooldown: 3,
		category: "color tools",
		excludeRandom: true,
		desc: "<span style='color:#FF00FF' onClick=saturationPrompt()>Click here to configure the tool.</span><br/><span style='color:#FF00FF' onClick=colorToolFilterPrompt()>Click here to configure the element filter (applies to all color tools).</span>"
	}

	elements.luminance = {
		color: ["#000000","#333333","#666666","#999999","#cccccc","#ffffff"],
		tool: function(pixel) {
			var element = pixel.element;
			if(  colorToolElementFilter === "none" || ( (typeof(colorToolElementFilter) === "string" && element === colorToolElementFilter) || (Array.isArray(colorToolElementFilter) && colorToolElementFilter.includes(element)) )  ) {
				pixel.color = changeLuminance(pixel.color,luminanceAmount,luminanceOp,"rgb");
			};
		},
		cooldown: 3,
		category: "color tools",
		excludeRandom: true,
		desc: "<span style='color:#FF00FF' onClick=luminancePrompt()>Click here to configure the tool.</span><br/><span style='color:#FF00FF' onClick=colorToolFilterPrompt()>Click here to configure the element filter (applies to all color tools).</span>"
	}

	elements.grayscale = {
		color: ["#7f7f7f"],
		tool: function(pixel) {
			var element = pixel.element;
			if(  colorToolElementFilter === "none" || ( (typeof(colorToolElementFilter) === "string" && element === colorToolElementFilter) || (Array.isArray(colorToolElementFilter) && colorToolElementFilter.includes(element)) )  ) {
				var oldColor = convertColorFormats(pixel.color,"json");
				var lightness = Math.round((oldColor.r * 0.299) + (oldColor.g * 0.587) + (oldColor.b * 0.114))
				var finalColor = [lightness, lightness, lightness]
				pixel.color = "rgb(" + finalColor.join(",") + ")"
			};
		},
		cooldown: 3,
		category: "color tools",
		excludeRandom: true,
		desc: "<span style='color:#FF00FF' onClick=colorToolFilterPrompt()>Click here to configure the element filter (applies to all color tools).</span>",
	}

	elements.invert = {
		color: ["#ff0000", "#00ffff"],
		tool: function(pixel) {
			var element = pixel.element;
			if(  colorToolElementFilter === "none" || ( (typeof(colorToolElementFilter) === "string" && element === colorToolElementFilter) || (Array.isArray(colorToolElementFilter) && colorToolElementFilter.includes(element)) )  ) {
				var oldColor = convertColorFormats(pixel.color,"json");
				var finalColor = [(255 - oldColor.r), (255 - oldColor.g), (255 - oldColor.b)]
				pixel.color = "rgb(" + finalColor.join(",") + ")"
			};
		},
		cooldown: 3,
		category: "color tools",
		excludeRandom: true,
		desc: "<span style='color:#FF00FF' onClick=colorToolFilterPrompt()>Click here to configure the element filter (applies to all color tools).</span>",
	}

	elements.reverse_R_G_B = {
		color: ["#7f7f7f"],
		tool: function(pixel) {
			var element = pixel.element;
			if(  colorToolElementFilter === "none" || ( (typeof(colorToolElementFilter) === "string" && element === colorToolElementFilter) || (Array.isArray(colorToolElementFilter) && colorToolElementFilter.includes(element)) )  ) {
				var oldColor = convertColorFormats(pixel.color,"json");
				var finalColor = [oldColor.b, oldColor.g, oldColor.r]
				pixel.color = "rgb(" + finalColor.join(",") + ")"
			};
		},
		cooldown: 3,
		category: "color tools",
		excludeRandom: true,
		desc: "<span style='color:#FF00FF' onClick=colorToolFilterPrompt()>Click here to configure the element filter (applies to all color tools).</span>",
	}

	elements.shift_R_G_B = {
		color: ["#7f7f7f"],
		tool: function(pixel) {
			var element = pixel.element;
			if(  colorToolElementFilter === "none" || ( (typeof(colorToolElementFilter) === "string" && element === colorToolElementFilter) || (Array.isArray(colorToolElementFilter) && colorToolElementFilter.includes(element)) )  ) {
				var oldColor = convertColorFormats(pixel.color,"json");
				var finalColor = [oldColor.g, oldColor.b, oldColor.r]
				pixel.color = "rgb(" + finalColor.join(",") + ")"
			};
		},
		cooldown: 3,
		category: "color tools",
		excludeRandom: true,
		desc: "<span style='color:#FF00FF' onClick=colorToolFilterPrompt()>Click here to configure the element filter (applies to all color tools).</span>",
	}
} else {
	enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod)
	alert(`The ${libraryMod} mod is required and has been automatically inserted (reload for this to take effect).`)
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
};
