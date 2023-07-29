function runAfterAutogen(func) {
	runAfterAutogenList.push(func);
};

function runAfterButtons(func) {
	runAfterButtonsList.push(func);
};

runAfterAutogenList = [];

runAfterButtonsList = [];

function behaviorStringsToArrays() {
	for (var behavior in behaviors) {
		if (typeof behaviors[behavior][0] === "string") {
			var newbehavior = [];
			for (var i = 0; i < behaviors[behavior].length; i++) {
				newbehavior.push(behaviors[behavior][i].split("|"));
			}
			behaviors[behavior] = newbehavior;
		}
	}
}

function tripletsToRgbAndGenerateColorObjects() {
	for (var key in elements) {
		if (elements.hasOwnProperty(key)) {
			// if the element has no color, skip it
			if (elements[key].color === undefined) {
				continue;
			}
			// if the color is an array, loop over each one
			if (elements[key].color instanceof Array) {
				var rgbs = [];
				var rgbos = [];
				for (var i = 0; i < elements[key].color.length; i++) {
					var c = elements[key].color[i];
					if (c.startsWith("#")) {
						var rgb = hexToRGB(c);
						rgbs.push("rgb("+rgb.r+","+rgb.g+","+rgb.b+")");
						rgbos.push(rgb);
					}
					else {
						rgbs.push(c);
					}
				}
				elements[key].color = rgbs;
				elements[key].colorObject = rgbos;
			} else {
				// if elements[key].color starts with #
				if (elements[key].color.startsWith("#")) {
					var rgb = hexToRGB(elements[key].color);
					elements[key].color = "rgb("+rgb.r+","+rgb.g+","+rgb.b+")";
					elements[key].colorObject = rgb;
				}
			}
		}
	}
}

// Automatic molten element generation
// Moved above the exposed autoGenAllElements for ReferenceError purposes
function autoGen(newname,element,autoType) {
	var autoInfo = autoElements[autoType];
	var newcolor = elements[element].colorObject;
	var colorList = [];
	var colorObjectList = [];
	// if newcolor is not an array, put it in an array
	if (!(newcolor instanceof Array)) { newcolor = [newcolor]; }
	// for every color in the newcolor array, add a new color with the same value, but with the r and g values increased
	for (var i = 0; i < newcolor.length; i++) {
		var c = newcolor[i];
		for (var j = 0; j < autoInfo.rgb.length; j++) {
			var newc = autoInfo.rgb[j];
			r = Math.floor(c.r * newc[0]);
			g = Math.floor(c.g * newc[1]);
			b = Math.floor(c.b * newc[2]);
			if (r > 255) {r = 255;} if (g > 255) {g = 255;}
			colorList.push("rgb("+r+","+g+","+b+")");
			colorObjectList.push({r:r,g:g,b:b});
		}
	}
	var newelem = {
		//"name": newname.replaceAll("_"," "),
		behavior: autoInfo.behavior,
		hidden: autoInfo.hidden || false,
		state: autoInfo.state || "solid",
		category: autoInfo.category || "states",
	}
	if (colorList.length <= 1) { colorList = colorList[0]; }
	if (colorObjectList.length <= 1) { colorObjectList = colorObjectList[0]; }
	newelem.color = colorList;
	newelem.colorObject = colorObjectList;
	var multiplier = 1.1;
	if (autoInfo.type === "high") {
		if (!elements[element].stateHigh) {elements[element].stateHigh = newname;}
		newelem.temp = elements[element].tempHigh;
		newelem.tempLow = elements[element].tempHigh+(autoInfo.tempDiff || 0);
		newelem.stateLow = element;
		// Change density by *0.9
		if (elements[element].density) { newelem.density = Math.round(elements[element].density * 0.9 * 10) / 10; }
	}
	else if (autoInfo.type === "low") {
		if (!elements[element].stateLow) {elements[element].stateLow = newname;}
		newelem.temp = elements[element].tempLow;
		newelem.tempHigh = elements[element].tempLow+(autoInfo.tempDiff || 0);
		newelem.stateHigh = element;
		multiplier = 0.5;
		// Change density by *1.1
		if (elements[element].density) { newelem.density = Math.round(elements[element].density * 1.1 * 10) / 10; }
	}
	if (!elements[element].ignore) { elements[element].ignore = [] }
	elements[element].ignore.push(newname);
	if (elements[element].viscosity || autoInfo.viscosity) {
		newelem.viscosity = elements[element].viscosity || autoInfo.viscosity;
	}
	// Change by *multiplier
	if (elements[element].conduct) { newelem.conduct = Math.round(elements[element].conduct * multiplier * 10) / 10; }
	if (elements[element].burn) { newelem.burn = Math.round(elements[element].burn * multiplier * 10) / 10; }
	if (elements[element].burnTime) { newelem.burnTime = Math.round(elements[element].burnTime * multiplier * 10) / 10; }
	if (elements[element].burnInto) { newelem.burnInto = elements[element].burnInto; }
	if (elements[element].fireColor) { newelem.fireColor = elements[element].fireColor; }
	// If the new element doesn't exist, add it
	if (!elements[newname]) { elements[newname] = newelem; }
	else {
		// Loop through newelem's keys and values, copy them to the new element if they are not already defined
		for (var key in newelem) {
			if (elements[newname][key] == undefined) { elements[newname][key] = newelem[key]; }
		}
	}

	if (autoType === "molten" && (elements.molten_slag && elements.molten_slag.ignore && elements.molten_slag.ignore.indexOf(element) === -1)) { // Slag reactions
		if (newname !== "molten_slag") {
			if (!elements[newname].reactions) { elements[newname].reactions = {}; }
			elements[newname].reactions.ash = { "elem1":null, "elem2":"molten_slag" };
			elements[newname].reactions.dust = { "elem1":null, "elem2":"molten_slag" };
			elements[newname].reactions.magma = { "elem1":null, "elem2":"molten_slag" }
		};
	}
}

function autoGenAllElements() {
	for (element in elements) {
		if (elements[element].tempHigh!==undefined && (elements[element].stateHigh===undefined||elements[element].forceAutoGen)) {
			var newname = elements[element].stateHighName;
			if ((elements[element].state==="solid" || !elements[element].state)) { // Melting
				if (!newname) { newname = "molten_"+element }
				autoGen(newname,element,"molten");
			}
			else if (elements[element].state==="liquid") { // Evaporating
				if (!newname) {
					newname = element;
					if (newname.startsWith("liquid_")) { newname = newname.substring(7); }
					if (newname.startsWith("molten_")) { newname = newname.substring(7); }
					newname += "_gas";
				}
				autoGen(newname,element,"evaporate");
			}
		}
		if (elements[element].tempLow!==undefined && (elements[element].stateLow===undefined||elements[element].forceAutoGen)) {
			var newname = elements[element].stateLowName;
			if (elements[element].state==="liquid") { // Freezing
				if (!newname) {
					newname = element;
					if (newname.startsWith("liquid_")) { newname = newname.substring(7); }
					if (newname.endsWith("_water")) { newname = newname.substring(0,newname.length-6); }
					newname += "_ice";
				}
				autoGen(newname,element,"frozen");
			}
			else if (elements[element].state==="gas") { // Condensing
				if (!newname) {
					newname = element;
					if (newname.endsWith("_gas")) { newname = newname.substring(0,newname.length-4); }
					newname = "liquid_"+newname;
				}
				autoGen(newname,element,"condense");
			}
		}
		if (elements[element].behavior && typeof elements[element].behavior[0] === "string") {
			var newbehavior = [];
			for (var i = 0; i < elements[element].behavior.length; i++) {
				newbehavior.push(elements[element].behavior[i].split("|"));
			}
			elements[element].behavior = newbehavior;
		}
		if (elements[element].behaviorOn && typeof elements[element].behaviorOn[0] === "string") {
			var newbehavior = [];
			for (var i = 0; i < elements[element].behaviorOn.length; i++) {
				newbehavior.push(elements[element].behaviorOn[i].split("|"));
			}
			elements[element].behaviorOn = newbehavior;
		}
	}
}

function doFinalChecks() {
	nextid = 1;
	for (key in elements) {
		elements[key].id = nextid;
		nextid++;
		// If the element has no behavior, set it to behaviors.WALL
		if (!elements[key].behavior && !elements[key].tick) {
			elements[key].tick = function(pixel) {};
		}
		// If the behavior is a function, delete it and set tick to it instead
		if (typeof elements[key].behavior === "function") {
			if (elements[key].tick) {
				elements[key].tick1 = elements[key].tick;
				elements[key].tick2 = elements[key].behavior;
				elements[key].tick = function(pixel) {
					if (pixel.start === pixelTicks) {return}
					var id = elements[pixel.element].id;
					elements[pixel.element].tick1(pixel);
					if (!pixel.del && id === elements[pixel.element].id) {
						elements[pixel.element].tick2(pixel);
					}
				}
			}
			else {
				elements[key].tick = elements[key].behavior;
			}
			delete elements[key].behavior;
		}
		// If the element has no color, set it to white
		if (elements[key].color === undefined) {
			elements[key].color = "rgb(255,255,255)";
			elements[key].colorObject = {r:255,g:255,b:255};
		}
		// If the element's behavior is an array and contains M1 or M2, set its movable to true
		if (elements[key].behavior && typeof elements[key].behavior[0] === "object") {
			var bstring = JSON.stringify(elements[key].behavior);
			if (bstring.indexOf("M1")!==-1 || bstring.indexOf("M2")!==-1) { elements[key].movable = true; }
		}
		if (elements[key].tick) { elements[key].movable = true; }
		if (elements[key].behavior) {
			// If the element's behavior[1][1] includes "FX", set it's flippableX to true
			if (elements[key].behavior[1][1].indexOf("FX") !== -1) {
				elements[key].flippableX = true;
			}
			// If the element's behavior[1][1] includes "FY", set it's flippableY to true
			if (elements[key].behavior[1][1].indexOf("FY") !== -1) {
				elements[key].flippableY = true;
			}

			// If the element's behavior stringified includes "BO", loop through the behavior
			if (elements[key].behavior.toString().indexOf("BO") !== -1 && !elements[key].rotatable) {
				for (var i = 0; i < elements[key].behavior.length; i++) {
					// Loop through each array in the behavior
					for (var j = 0; j < elements[key].behavior[i].length; j++) {
						// If the behavior includes "BO", set the behaviorOn to the behavior
						if (elements[key].behavior[i][j].indexOf("BO") !== -1) {
							if ((i==0 && j==0) || (i==0 && j==2) || (i==2 && j==0) && (i==2 && j==2)) {
								elements[key].flippableX = true;
								elements[key].flippableY = true;
							}
							else if (i==0 || i==2) {
								elements[key].flippableY = true;
							}
							else if (j==0 || j==2) {
								elements[key].flippableX = true;
							}
						}
					}
				}
			}

			// If the element's behavior[1][1] includes "RT", set it's rotatable to "true"
			if (elements[key].behavior[1][1].indexOf("RT") !== -1) {
				elements[key].rotatable = true;
			}

		}

		// If the element's state is "gas", isGas = true
		if (elements[key].state === "gas") {
			elements[key].isGas = true;
		}
		// Else if the state is not "solid" or "liquid", delete it
		else if (elements[key].state !== "solid" && elements[key].state !== "liquid") {
			delete elements[key].state;
		}

		// If the element has reactions, loop through each one (it is an object), if the value for elem1 or elem2 is not an element and is not null, remove that key
		if (elements[key].reactions) {
			for (var reaction in elements[key].reactions) {
				// If elem1 exists
				if (elements[key].reactions[reaction].elem1) {
					// If elem1 is an array, loop through each element, else check once. Don't delete if it === null
					if (Array.isArray(elements[key].reactions[reaction].elem1)) {
						for (var i = 0; i < elements[key].reactions[reaction].elem1.length; i++) {
							if (elements[key].reactions[reaction].elem1[i] && !elements[elements[key].reactions[reaction].elem1[i]]) {
								elements[key].reactions[reaction].elem1.splice(i,1);
							}
						}
					}
					else if (elements[key].reactions[reaction].elem1 && !elements[elements[key].reactions[reaction].elem1]) {
						delete elements[key].reactions[reaction].elem1;
					}
				}
				// If elem2 exists
				if (elements[key].reactions[reaction].elem2) {
					// If elem2 is an array, loop through each element, else check once. Don't delete if it === null
					if (Array.isArray(elements[key].reactions[reaction].elem2)) {
						for (var i = 0; i < elements[key].reactions[reaction].elem2.length; i++) {
							if (elements[key].reactions[reaction].elem2[i] && !elements[elements[key].reactions[reaction].elem2[i]]) {
								elements[key].reactions[reaction].elem2.splice(i,1);
							}
						}
					}
					else if (elements[key].reactions[reaction].elem2 && !elements[elements[key].reactions[reaction].elem2]) {
						delete elements[key].reactions[reaction].elem2;
					}
				}
			}
		}

		// If the element's stateHigh or stateLow is not an element, remove it and tempHigh/Low
		if (elements[key].stateHigh) {
			// If it's an array, do it for each item, otherwise, just do it once
			if (Array.isArray(elements[key].stateHigh)) {
				for (var i = 0; i < elements[key].stateHigh.length; i++) {
					if (!elements[elements[key].stateHigh[i]] && elements[key].stateHigh[i] !== null) {
						elements[key].stateHigh.splice(i,1);
					}
				}
				if (elements[key].stateHigh.length == 0) {
					delete elements[key].stateHigh;
					delete elements[key].tempHigh;
				}
			}
			else {
				if (!elements[elements[key].stateHigh] && elements[key].stateHigh !== null) {
					delete elements[key].stateHigh;
					delete elements[key].tempHigh;
				}
			}
		}
		if (elements[key].stateLow) {
			if (Array.isArray(elements[key].stateLow)) {
				for (var i = 0; i < elements[key].stateLow.length; i++) {
					if (!elements[elements[key].stateLow[i]] && elements[key].stateLow[i] !== null) {
						elements[key].stateLow.splice(i,1);
					}
				}
				if (elements[key].stateLow.length == 0) {
					delete elements[key].stateLow;
					delete elements[key].tempLow;
				}
			}
			else {
				if (!elements[elements[key].stateLow] && elements[key].stateLow !== null) {
					delete elements[key].stateLow;
					delete elements[key].tempLow;
				}
			}
		}
		// same for burnInto
		if (elements[key].burnInto) {
			if (Array.isArray(elements[key].burnInto)) {
				for (var i = 0; i < elements[key].burnInto.length; i++) {
					if (!elements[elements[key].burnInto[i]]) {
						delete elements[key].burnInto[i];
					}
				}
				if (elements[key].burnInto.length == 0) {
					delete elements[key].burnInto;
				}
			}
			else {
				if (!elements[elements[key].burnInto]) {
					delete elements[key].burnInto;
				}
			}
		}
		// same for breakInto
		if (elements[key].breakInto) {
			if (Array.isArray(elements[key].breakInto)) {
				for (var i = 0; i < elements[key].breakInto.length; i++) {
					if (elements[key].breakInto[i]!==null && !elements[elements[key].breakInto[i]]) { delete elements[key].breakInto[i]; }
				}
				if (elements[key].breakInto.length == 0) { delete elements[key].breakInto; }
			}
			else {
				if (elements[key].breakInto[i]!==null && !elements[elements[key].breakInto]) { delete elements[key].breakInto; }
			}
		}

		if (elements[key].colorPattern) {
			if (!elements[key].colorKey) {
				delete elements[key].colorPattern;
			}
			else {
			var newPattern = [];
			for (var i = 0; i < elements[key].colorPattern.length; i++) {
				newPattern.push([]);
				var line = elements[key].colorPattern[i];
				// loop through each character in the line
				for (var j = 0; j < line.length; j++) {
					var char = line[j];
					if (elements[key].colorKey[char]) {
						if (elements[key].colorKey[char].startsWith("#")) {
							var rgb = hexToRGB(elements[key].colorKey[char]);
							elements[key].colorKey[char] = "rgb("+rgb.r+","+rgb.g+","+rgb.b+")";
						}
						newPattern[i].push(elements[key].colorKey[char]);
					}
					else {
						newPattern[i].push("rgb(255,255,255)");
					}
				}
			}
			elements[key].colorPattern = newPattern;
			delete elements[key].colorKey;
			}
		}
	}
};

function createWorldGenOptions() {
	for (var key in worldgentypes) {
		document.getElementById("worldgenselect").innerHTML += "<option value='" + key + "'>" + key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()) + "</option>";
	}
};

function validateWorldGenSelection() {
	if (settings["worldgen"] && !worldgentypes[settings["worldgen"]]) {
		settings["worldgen"] = "off";
	}
};

function validateRandomEventChoices() {
	for (var key in randomEventChoices) {
		for (var i = 0; i < randomEventChoices[key].length; i++) {
			if (!elements[randomEventChoices[key][i]]) {
				randomEventChoices[key].splice(i,1);
			}
		}
	}
};

function setEqualReactions(fromElement,toElement) {
	if (elements[fromElement] && elements[toElement]) {
		if (elements[fromElement].reactions) {
			elements[toElement].reactions = elements[fromElement].reactions;
			return true;
		};
	};
	return false;
};

function loadSettings() {
	var settingSpans = document.getElementsByClassName("setting-span");
	for (var i = 0; i < settingSpans.length; i++) {
		var setting = settingSpans[i].getAttribute("setting");
		if (setting in settings) {
			var settingValue = settings[setting];
			var settingElements = settingSpans[i].getElementsByTagName("select") || settingSpans[i].getElementsByTagName("input");
			if (settingElements.length > 0) {
				settingElements[0].value = settingValue;
			}
		}
	}
};

function setCanvasWidthAndHeight(ctx) {
	var newWidth  = Math.ceil(window.innerWidth*0.9 / pixelSize) * pixelSize;
	var newHeight = Math.ceil(window.innerHeight*0.675 / pixelSize) * pixelSize;
	// If the new width is greater than 800, set it to 800
	if (newWidth > 1000) { newWidth = 1000; }
	// If we are on a desktop and the new height is greater than 600, set it to 600
	if (window.innerWidth > 1000 && newHeight > 500) { newHeight = 500; }
	ctx.canvas.width = newWidth;
	ctx.canvas.height = newHeight;
	document.getElementById("gameDiv").style.width = newWidth + "px";
	document.getElementById("loadingP").style.display = "none";
	document.getElementById("canvasDiv").style.display = "block";

	width = Math.round(newWidth/pixelSize)-1;
	height = Math.round(newHeight/pixelSize)-1;
};

function definePixelMap() {
	if (settings["worldgen"]) {
		clearAll();
	}
	else {
		// Object with width arrays of pixels starting at 0
		pixelMap = [];
		for (var i = 0; i < width; i++) {
			pixelMap[i] = [];
		}
	}
};

function setRandomChoices() {
	randomChoices = Object.keys(elements).filter(function(e) {
		return elements[e].excludeRandom != true && elements[e].category != "tools" && !elements[e].tool;
	});
};

function addCanvasAndWindowListeners(gameCanvas) {
	gameCanvas.addEventListener("mousedown", mouseClick);
	gameCanvas.addEventListener("touchstart", mouseClick, { passive: false });
	window.addEventListener("mouseup", mouseUp);
	window.addEventListener("touchend", mouseUp, { passive: false });
	window.addEventListener("mousemove", mouseMove);
	gameCanvas.addEventListener("touchmove", mouseMove, { passive: false });
	gameCanvas.addEventListener("wheel", wheelHandle);
};

function generateModManagerList() {
	if (enabledMods.length > 0) {
		modManagerList = document.getElementById("modManagerList");
		for (var i = 0; i < enabledMods.length; i++) {
			var mod = enabledMods[i];
			// modName is the last part of the mod's path
			var modName = mod.split("/").pop();
			modManagerList.innerHTML += "<li><a href='" + mod + "' target='_blank'>" + modName + "</a> <span class='removeModX' onclick='removeMod(\"" + mod + "\")'>X</span></li>";
		}
	}
	else {
		document.getElementById("noMods").style.display = "block";
	}
};

//this part defines basically all of the keybinds
function addKeyboardListeners() {
	document.addEventListener("keydown", function(e) {
		if (e.ctrlKey || e.metaKey) {
			return
		}
		// else if tab, set document.body.class to "usingTab"
		else if (e.keyCode == 9) {
			document.body.classList.add("usingTab");
		}
		// F1 = hide #underDiv, #infoParent, #modParent, #pagetitle, #colorSelector if they aren't hidden, otherwise show them
		if (e.keyCode == 112) {
			e.preventDefault();
			if (document.getElementById("underDiv").style.display == "none") {
				document.getElementById("underDiv").style.display = "block";
				document.getElementById("pagetitle").style.display = "block";
				document.getElementById("colorSelector").style.display = "block";
				document.getElementById("bottomInfoBox").style.display = "block";
			} else {
				document.getElementById("underDiv").style.display = "none";
				if (showingMenu) {
					closeMenu()
				};
				document.getElementById("pagetitle").style.display = "none";
				document.getElementById("colorSelector").style.display = "none";
				document.getElementById("bottomInfoBox").style.display = "none";
			}
		}
		if (showingMenu) {
			// esc or / or tab / or \ (while in settings) to close
			if (e.keyCode == 27 || (e.keyCode == 191 && showingMenu=="info") || e.keyCode == 9 || (e.keyCode == 220 && showingMenu=="settings")) {
				e.preventDefault();
				closeMenu();
			}
			// enter to clear infoSearch
			else if (e.keyCode == 13 && showingMenu == "info") {
				var infoSearch = document.getElementById("infoSearch");
				infoSearch.value = "";
				showInfo();
			}
			return;
		}
		if (e.keyCode == 219 || e.keyCode == 189) {
			if (shiftDown) {mouseSize = 1}
			else {
				mouseSize -= 2;
				if (mouseSize < 1) { mouseSize = 1; }
			}
		}
		// If the user presses ] or =, increase the mouse size by 2
		if (e.keyCode == 221 || e.keyCode == 187) {
			if (shiftDown) {mouseSize = (mouseSize+15)-((mouseSize+15) % 15)}
			else {mouseSize += 2;}
			// if height>width and mouseSize>height, set mouseSize to height, if width>height and mouseSize>width, set mouseSize to width
			if (mouseSize > (height > width ? height : width)) { mouseSize = (height > width ? height : width); }
		}
		// User presses shift
		else if (e.keyCode == 16) {
			if (event.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT) {
				shiftDown = 1;
			} else if (event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
				shiftDown = 3;
			}
		}
		// User presses alt
		else if (e.keyCode == 18) {
			if (event.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT) {
				shiftDown = 2;
			} else if (event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
				shiftDown = 4;
			}
		}
		// p or spacebar or ` or k = pause
		if (e.keyCode == 80 || e.keyCode == 32 || e.keyCode == 192 || e.keyCode == 75) {
			e.preventDefault();
			togglePause();
		}
		// e = chooseElementPrompt()
		else if (e.keyCode == 69) {
			e.preventDefault();
			chooseElementPrompt();
		}
		// . = doFrame()
		else if (e.keyCode == 190) {
			e.preventDefault();
			doFrame();
		}
		// / or i = showInfo()
		else if (e.keyCode == 191 || e.keyCode == 73) {
			e.preventDefault();
			showInfo();
		}
		// f = full screen
		else if (e.keyCode == 70) {
			e.preventDefault();
			if (document.fullscreenElement) {
				document.exitFullscreen(document.body);
			} else {
				requestFullScreen(document.body);
			}
		}
		// 0-9 = setView(the number)
		else if (e.keyCode >= 48 && e.keyCode <= 57) {
			// if not command or control down, set view to the number
			e.preventDefault();
			setView(e.keyCode-48);
		}
		// right arrow = switch the category to the one after the current category
		else if (e.keyCode == 39) {
			e.preventDefault();
			// in categoryControls, find the button with the class categoryButton and the attribute current="true"
			var currentButton = document.querySelector(".categoryButton[current='true']");
			var currentCategory = currentButton.getAttribute("category");
			// get the categoryButton that is after the current one in the div
			var nextButton = currentButton.nextElementSibling;
			// if there is no next button, go to the first one
			if (nextButton == null) {
				nextButton = document.querySelector(".categoryButton");
			}
			var nextCategory = nextButton.getAttribute("category");
			selectCategory(nextCategory);
			// focus on categoryControls
			document.getElementById("categoryControls").focus();
		}
		// left arrow = switch the category to the one before the current category
		else if (e.keyCode == 37) {
			e.preventDefault();
			// in categoryControls, find the button with the class categoryButton and the attribute current="true"
			var currentButton = document.querySelector(".categoryButton[current='true']");
			var currentCategory = currentButton.getAttribute("category");
			// get the categoryButton that is before the current one in the div
			var prevButton = currentButton.previousElementSibling;
			// if there is no previous button, go to the last one
			if (prevButton == null) {
				prevButton = document.querySelector(".categoryButton:last-child");
			}
			var prevCategory = prevButton.getAttribute("category");
			selectCategory(prevCategory);
		}
		// m = closeMenu() and showModManager()
		else if (e.keyCode == 77) {
			e.preventDefault();
			closeMenu();
			showModManager();
		}
		// \ = closeMenu() and showSettings()
		else if (e.keyCode == 220) {
			e.preventDefault();
			closeMenu();
			showSettings();
		}
		// c or F2 = screenshot
		else if (e.keyCode == 67 || e.keyCode == 113) {
			e.preventDefault();
			var link = document.createElement('a');
			link.setAttribute('download', 'sandboxels-screenshot.png');
			link.setAttribute('href', document.getElementById("game").toDataURL("image/png").replace("image/png", "image/octet-stream"));
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}


		// x = explodeAt()
		/*else if (e.keyCode == 88) {
			e.preventDefault();
			explodeAt(mousePos.x, mousePos.y, Math.round(mouseSize/2));
		}*/

	});
};

function addUnshiftListeners() {
	document.addEventListener("keyup", function(e) {
		if (e.keyCode == 16 || e.keyCode == 18) {
			shiftDown = 0;
			if (shaping) {
				shaping = 0;
				shapeStart = null;
			}
		}
	});
};

function createButtonsAndCountElements() {
	elementCount = 0;
	hiddenCount = 0;
	categoryList = [];
	for (var element in elements) {
		elementCount++;
		if (settings.cheerful && elements[element].nocheer) {
			elements[element].hidden = true;
			hiddenCount++;
			continue;
		}
		var category = elements[element].category;
		if (category==null) {category="other"}
		if (categoryList.indexOf(category) === -1) {
			categoryList.push(category);
		}
		if (elements[element].hidden && (!settings["unhide"] || ( settings["unhide"]===2 && !settings.unlocked[element] ))) { hiddenCount++; continue; }
		var categoryDiv = document.getElementById("category-"+category);
		if (categoryDiv == null) {
			createCategoryDiv(category);
			categoryDiv = document.getElementById("category-"+category);
		}
		createElementButton(element);
	}
	// Set the first button in categoryControls div to be the current category
	document.getElementById("categoryControls").children[0].click()
	document.getElementById("extraInfo").innerHTML += "<small><p>There are " + elementCount + " elements, including " + hiddenCount + " hidden ones.</p><p>©2021-" + new Date().getFullYear() + ". All Rights Reserved. <a href='https://r74n.com'>R74n</a></p></small>";
	selectElement(currentElement);
	focusGame();
};

window.onload = function() {
	// If the browser is Firefox, set #categoryControls padding-bottom:11px;
	if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
		document.getElementById("categoryControls").style.paddingBottom = "11px";
	}

	// Loop through runAfterLoadList and run each function
	for (var i = 0; i < runAfterLoadList.length; i++) {
		runAfterLoadList[i]();
	}

	// Loop through behaviors and each behavior, if it is a string, split the items and replace the value with the array
	behaviorStringsToArrays();
	
	// convert every color in the elements object to rgb
	tripletsToRgbAndGenerateColorObjects()

	autoElements = {
		"molten": { // Solid -> Liquid
			rgb: [ [2,1.25,0.5], [2,1,0.5], [2,0.75,0] ],
			behavior: behaviors.MOLTEN,
			type: "high",
			viscosity: 10000,
			hidden: true,
			state: "liquid",
			tempDiff: -100,
		},
		"frozen": { // Liquid -> Solid
			rgb: [ [1.2,1.2,1.3] ],
			behavior: behaviors.WALL,
			type: "low",
			hidden: true,
			state: "solid",
		},
		"condense": { // Gas -> Liquid
			rgb: [ [0.5,0.5,0.5] ],
			behavior: behaviors.LIQUID,
			type: "low",
			hidden: true,
			state: "liquid",
		},
		"evaporate": { // Liquid -> Gas
			rgb: [ [1.5,1.5,1.5] ],
			behavior: behaviors.GAS,
			type: "high",
			hidden: true,
			state: "gas",
		}
	}

	// Loop through each element. If it has a tempHigh, but not a stateHigh, create a new molten element
	autoGenAllElements();
	
	// Loop through runAfterAutogenList and run each function
	for (var i = 0; i < runAfterAutogenList.length; i++) {
		runAfterAutogenList[i]();
	};

	// Loop through each element, final checks
	doFinalChecks();

	// Generate worldgen options
	// Loop through the worldgentypes object, add the key to the #worldgenselect select as an option with the value of the key and the name of the key capitalized and underscores replaced with spaces
	createWorldGenOptions();
	validateWorldGenSelection();

	// Loop through randomEventChoices, and loop through the array of each. If the element doesn't exist, remove it from the array.
	validateRandomEventChoices();
	
	// Poison == poison gas reactions
	setEqualReactions("poison","poison_gas");

	// Load settings
	// Loop through all the elements with setting-span class.
	// If the span's setting attribute is in settings, set the first select or input to the value of the setting.
	loadSettings();

		//scared to touch this because ctx is pretty important
	var gameCanvas = document.getElementById("game");
	// Get context
	var ctx = gameCanvas.getContext("2d");

	setCanvasWidthAndHeight(ctx);

	mousePos = {x:width/2,y:height/2};

	definePixelMap();

	// randomChoices = the keys of "elements" with any element with the category "tools" or the property excludeRandom set to true removed
	setRandomChoices();

	addCanvasAndWindowListeners(gameCanvas);
	gameCanvas.ontouchstart = function(e) {
		if (e.touches) e = e.touches[0];
		return false;
	}
	window.onbeforeunload = function(){ // Confirm leaving page if there are pixels on-screen
		if (currentPixels.length > 0){
			return 'Are you sure you want to leave?';
		}
	};
	
	// If enabledMods has items, add an li to modManagerList for each item with the href to the item, target blank, and the item's name, with "<span class="removeModX" onclick='removeMod('>X</span>" after the link
	generateModManagerList();
	
	document.getElementById("game").oncontextmenu = function(e) { e.preventDefault(); return false; }
	// If the user presses [ or -, decrease the mouse size by 2
	addKeyboardListeners();

	// If the user releases either shift
	addUnshiftListeners();

	// Create buttons for elements
	// For each element type in elements, create a button in controls that sets the current element to that type
	// Alphabetically sort and loop through dictionary named "elements"
	createButtonsAndCountElements();

	for (var i = 0; i < runAfterButtonsList.length; i++) {
		runAfterButtonsList[i]();
	};

	selectElement(currentElement);
	focusGame();
	// For every button element, onkeyup="event.preventDefault()"
	var buttonElements = document.getElementsByTagName("button");
	for (var i = 0; i < buttonElements.length; i++) {
		buttonElements[i].onkeyup = function(e) {
			e.preventDefault();
		}
	}

	if (window.self !== window.top && !location.ancestorOrigins[0].includes("itch.io")) {
		// Open a message that tells the user they aren't on the real website
		var menuParent = document.createElement("div");
		menuParent.className = "menuParent";
		menuParent.style.display = "block";
		menuParent.innerHTML = `<div class="menuScreen">
<button class="XButton" onclick="closeMenu();">-</button>
<span class="menuTitle">Sandboxels</span>
<div class="menuText" style="padding-top:1em">
You may be on a website that has embedded our game involuntarily.
<br><br>
The real game is at this URL: <a href="https://sandboxels.r74n.com" target="_blank">sandboxels.R74n.com</a>.
<br><br>
Please use the main website to support us instead.
<br><br>
You can also join our <a href="https://discord.gg/ejUc6YPQuS" target="_blank">Discord</a> if that isn't possible.
</div>
<br><br><br><br>
</div>`
		document.body.appendChild(menuParent);
		showingMenu = "alert";
	}
	
	//get the first .elementButton in the first .category, and selectElement(button.element)
	var firstDiv = document.getElementsByClassName("category")[0];
	var firstElementButton = firstDiv.getElementsByClassName("elementButton")[0];
	selectElement(firstElementButton.getAttribute("element"));
};
