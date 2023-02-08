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

	//do cooldown for mouse size > 1
	function mouse1Action(e,mouseX=undefined,mouseY=undefined,startPos) {
		if (currentElement == "erase") { mouse2Action(e,mouseX,mouseY); return; }
		else if (currentElement == "pick") { mouseMiddleAction(e,mouseX,mouseY); return; }
		// If x and y are undefined, get the mouse position
		if (mouseX == undefined && mouseY == undefined) {
			var canvas = document.getElementById("game");
			var ctx = canvas.getContext("2d");
			lastPos = mousePos;
			mousePos = getMousePos(canvas, e);
			var mouseX = mousePos.x;
			var mouseY = mousePos.y;
		}
		if (currentElement == "lookup") {
			if (!isEmpty(mouseX,mouseY,true)) {
				showInfo(pixelMap[mouseX][mouseY].element);
			}
			return;
		}
		var cooldowned = false;
		if (elements[currentElement].cooldown) {
			if (pixelTicks-lastPlace < elements[currentElement].cooldown) {
				return;
			}
			cooldowned = true;
		}
		lastPlace = pixelTicks;
		startPos = startPos || lastPos
		if (!(isMobile || (cooldowned && startPos.x===lastPos.x && startPos.y===lastPos.y) || elements[currentElement].tool || elements[currentElement].category==="tools")) {
			var coords = lineCoords(startPos.x,startPos.y,mouseX,mouseY);
		}
		else { var coords = mouseRange(mouseX,mouseY); }
		var element = elements[currentElement];
		var mixList = [];
		// For each x,y in coords
		for (var i = 0; i < coords.length; i++) {
			var x = coords[i][0];
			var y = coords[i][1];

			// If element name is heat or cool
			if (currentElement === "heat" || currentElement === "cool") {
				if (!isEmpty(x,y,false)) {
					if (outOfBounds(x,y)) {
						continue;
					}
					var pixel = pixelMap[x][y];
					if (shiftDown) {pixel.temp += element.temp+(Math.random()*element.temp*1.5)*20;}
					else {pixel.temp += element.temp+(Math.random()*element.temp*1.5);}
					pixelTempCheck(pixel);
				}
			}
			else if (currentElement === "mix") {
				if (!isEmpty(x,y,true)) {
					var pixel = pixelMap[x][y];
					if ((pixel.element != "fire" && pixel.element != "smoke") || shiftDown) {
						mixList.push(pixel);
					}
				}
			}
			else if (currentElement === "shock") {
				if (!isEmpty(x,y,true)) {
					// One loop that repeats 5 times if shiftDown else 1 time
					for (var j = 0; j < (shiftDown ? 5 : 1); j++) {
						var pixel = pixelMap[x][y];
						var con = elements[pixel.element].conduct;
						if (con == undefined) {continue}
						if (Math.random() < con) { // If random number is less than conductivity
							if (!pixel.charge && !pixel.chargeCD) {
								pixel.charge = 1;
								if (elements[pixel.element].colorOn) {
									pixel.color = pixelColorPick(pixel);
								}
							}
						}
						else if (elements[pixel.element].insulate != true) { // Otherwise heat the pixel (Resistance simulation)
							pixel.temp += 0.25;
							pixelTempCheck(pixel);
						}
					}
				}
			}
			else if (currentElement === "random" && isEmpty(x, y)) {
				// create pixel with random element from "randomChoices" array
				currentPixels.push(new Pixel(x, y, randomChoices[Math.floor(Math.random() * randomChoices.length)]));
			}
			else if (elements[currentElement].tool) {
				// run the tool function on the pixel
				if (!isEmpty(x,y,true)) {
					var pixel = pixelMap[x][y];
					// if the current element has an ignore property and the pixel's element is in the ignore property, don't do anything
					if (elements[currentElement].ignore && elements[currentElement].ignore.indexOf(pixel.element) != -1) {
						continue;
					}
					elements[currentElement].tool(pixel);
				}
			}
			else if (mode === "replace") {
				if (outOfBounds(x,y)) {
					continue;
				}
				// Remove pixel at position from currentPixels
				var index = currentPixels.indexOf(pixelMap[x][y]);
				if (index > -1) {
					currentPixels.splice(index, 1);
				}
				if (currentElement == "random") {
					currentPixels.push(new Pixel(x, y, randomChoices[Math.floor(Math.random() * randomChoices.length)]));
				}
				else {
					currentPixels.push(new Pixel(x, y, currentElement));
				}
				if (elements[currentElement].customColor) {
					pixelMap[x][y].color = pixelColorPick(currentElement,currentColor);
				}
			}
			else if (isEmpty(x, y)) {
				currentPixels.push(new Pixel(x, y, currentElement));
				if (elements[currentElement].customColor) {
					pixelMap[x][y].color = pixelColorPick(currentElement,currentColor);
				}
			}
		}
		if (currentElement == "mix") {
			// 1. repeat for each pixel in mixList
			// 2. choose 2 random pixels and swap their x and y
			// 3. remove pixel from mixList
			for (var i = 0; i < mixList.length; i++) {
				var pixel1 = mixList[Math.floor(Math.random()*mixList.length)];
				var pixel2 = mixList[Math.floor(Math.random()*mixList.length)];
				swapPixels(pixel1,pixel2);
				mixList.splice(mixList.indexOf(pixel1),1);
				mixList.splice(mixList.indexOf(pixel2),1);
			}
		}
	};
	//do cooldown for mouse size > 1
	
} else {
	enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod)
	alert(`The ${libraryMod} mod is required and has been automatically inserted (reload for this to take effect).`)
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
};
