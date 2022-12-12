var modName = "mods/haseulite.js";
var loonaMod = "mods/funny elements 2022-11-15.js";
var runAfterAutogenMod = "mods/runAfterAutogen and onload restructure.js";
var explodeAtPlusMod = "mods/explodeAtPlus.js";
var libraryMod = "mods/code_library.js";

if(enabledMods.includes(loonaMod) && enabledMods.includes(runAfterAutogenMod) && enabledMods.includes(explodeAtPlusMod) && enabledMods.includes(libraryMod)) {
	//move explodeAt to YG Entertainment's dungeon

	oldExplodeAt = explodeAt;
	explodeAt = explodeAtPlus;
	haseuliteSpreadWhitelist = ["haseulite","haseulite_powder","molten_haseulite"];

	function coldExplosionAfterCooling(pixel,x,y,radius,fire,smoke,power,damage) {
		pixel.temp -= 2*damage*radius*power;
	};

	elements.loona = {
		color: ["#6f7d54","#4f5d34","#7c8a61"],
		behavior: behaviors.POWDER,
		tempHigh: 1031,
		category: "random rocks",
		state: "solid",
		density: 2466.73,
		hardness: 0.56,
		breakInto: ["rock","sulfur","loona_gravel","loona_gravel","loona_gravel","haseulite_powder", "rock","sulfur","loona_gravel","loona_gravel","loona_gravel","haseulite_powder", "rock","sulfur","loona_gravel","loona_gravel","loona_gravel","heejinite_powder"],
	},

	function spoutCriteria(name) {
		if(typeof(elements[name]) !== "object") {
			throw new Error(`Nonexistent element ${name}`);
		};
		var info = elements[name];
		//console.log(`${name} (${JSON.stringify(elements[name])})`);
		if(typeof(info.state) === "undefined") {
			var state = null;
		} else {
			var state = info.state;
		};
		if(typeof(info.category) === "undefined") {
			var category = "other";
		} else {
			var category = info.category;
		};
		if(excludedSpoutElements.includes(name)) {
			return false
		};
		var include = false;
		if(["liquid","gas"].includes(state)) {
			include = true;
		};
		if(info.movable) {
			include = true;
		};
		if(backupCategoryWhitelist.includes(category)) {
			include = true;
		};
		if(backupElementWhitelist.includes(name)) {
			include = true;
		};
		if(category.includes("mudstone")) {
			include = true;
		};
		//console.log(include);
		return include;
	};
	
	function heejiniteHeatCriteria(name) {
		if(typeof(elements[name]) !== "object") {
			throw new Error(`Nonexistent element ${name}`);
		};
		var info = elements[name];
		//console.log(`${name} (${JSON.stringify(elements[name])})`);
		if(typeof(info.tempLow) === "undefined") {
			return false;
		};
		if(typeof(info.tempHigh) !== "undefined" && info.tempHigh < elements.heejinite.tempHigh) {
			return false;
		};
		return (info.tempLow < elements.heejinite.tempHigh) || ((typeof(info.state) !== "undefined") && (info.state === "gas"));
	};

	spoutCriteria = function(name) {
		if(typeof(elements[name]) !== "object") {
			throw new Error(`Nonexistent element ${name}`);
		};
		var info = elements[name];
		//console.log(`${name} (${JSON.stringify(elements[name])})`);
		if(typeof(info.state) === "undefined") {
			var state = null;
		} else {
			var state = info.state;
		};
		if(typeof(info.category) === "undefined") {
			var category = "other";
		} else {
			var category = info.category;
		};
		var include = false;
		if(["liquid","gas"].includes(state)) {
			include = true;
		};
		if(info.movable) {
			include = true;
		};
		if(backupCategoryWhitelist.includes(category)) {
			include = true;
		};
		if(backupElementWhitelist.includes(name)) {
			include = true;
		};
		if(category.includes("mudstone")) {
			include = true;
		};
		//console.log(include);
		return include;
	};

	//it doesn't want to acknowledge spoutCriteria, so...

	runAfterAutogen(function() {
		elements.loona.stateHigh = ["molten_loona","rock","rock","rock","sulfur_gas","sulfur_gas","molten_haseulite","molten_loona","rock","rock","rock","sulfur_gas","sulfur_gas","molten_haseulite","molten_loona","rock","rock","rock","sulfur_gas","sulfur_gas","molten_heejinite"];
		hotHeejiniteElements = Object.keys(elements).filter(function(e) {
			return spoutCriteria(e) && heejiniteHeatCriteria(e) && !elements[e].excludeRandom && !e.startsWith("rad");
		});
	});

	elements.loona_gravel = {
		color: ["#b3be98","#919a6f","#68744b","#515931"],
		behavior: behaviors.POWDER,
		tempHigh: 1031,
		stateHigh: ["molten_loona","rock","rock","rock","sulfur_gas","sulfur_gas","molten_haseulite","molten_loona","rock","rock","rock","sulfur_gas","sulfur_gas","molten_haseulite","molten_loona","rock","rock","rock","sulfur_gas","sulfur_gas","molten_heejinite"],
		category: "random rocks",
		state: "solid",
		density: 1625.14,
		hardness: 0.97,
		breakInto: ["rock","sulfur","rock","haseulite_powder","rock","sulfur","rock","haseulite_powder","rock","sulfur","rock","heejinite_powder"],
	};

	haseuliteValueObject = {
		light: 1,
		radiation: 4,
		fire: [6, "smoke"],
		rad_fire: [10, "rad_smoke"],
		plasma: [15, "fire"]
	};

	/*function customStaining(pixel,customColorRgb,stainOverride=null) {
		if (settings["stainoff"]) { return }
		var stain = (stainOverride !== null ? stainOverride : elements[pixel.element].stain);
		if (stain > 0) {
			var newColor = customColorRgb.match(/\d+/g);
		}
		else {
			var newColor = null;
		}

		for (var i = 0; i < adjacentCoords.length; i++) {
			var x = pixel.x+adjacentCoords[i][0];
			var y = pixel.y+adjacentCoords[i][1];
			if (!isEmpty(x,y,true)) {
				var newPixel = pixelMap[x][y];
				if (elements[pixel.element].ignore && elements[pixel.element].ignore.indexOf(newPixel.element) !== -1) {
					continue;
				}
				if ((elements[newPixel.element].id !== elements[pixel.element].id || elements[newPixel.element].stainSelf) && (solidStates[elements[newPixel.element].state] || elements[newPixel.element].id === elements[pixel.element].id)) {
					if (Math.random() < Math.abs(stain)) {
						if (stain < 0) {
							if (newPixel.origColor) {
								newColor = newPixel.origColor;
							}
							else { continue; }
						}
						else if (!newPixel.origColor) {
							newPixel.origColor = newPixel.color.match(/\d+/g);
						}
						// if newPixel.color doesn't start with rgb, continue
						if (!newPixel.color.match(/^rgb/)) { continue; }
						// parse rgb color string of newPixel rgb(r,g,b)
						var rgb = newPixel.color.match(/\d+/g);
						if (elements[pixel.element].stainSelf && elements[newPixel.element].id === elements[pixel.element].id) {
							// if rgb and newColor are the same, continue
							if (rgb[0] === newColor[0] && rgb[1] === newColor[1] && rgb[2] === newColor[2]) { continue; }
							var avg = [];
							for (var j = 0; j < rgb.length; j++) {
								avg[j] = Math.round((rgb[j]*(1-Math.abs(stain))) + (newColor[j]*Math.abs(stain)));
							}
						}
						else {
							// get the average of rgb and newColor, more intense as stain reaches 1 
							var avg = [];
							for (var j = 0; j < rgb.length; j++) {
								avg[j] = Math.floor((rgb[j]*(1-Math.abs(stain))) + (newColor[j]*Math.abs(stain)));
							}
						}
						// set newPixel color to avg
						newPixel.color = "rgb("+avg.join(",")+")";
					}
				}
			}
		}
	}*/

	function haseuliteValueSpreading(pixel) {
		var randomNeighborOffset = adjacentCoords[Math.floor(Math.random() * adjacentCoords.length)];
		var rX = randomNeighborOffset[0];
		var rY = randomNeighborOffset[1];
		var rfX = pixel.x+rX;
		var rfY = pixel.y+rY;
		if(!isEmpty(rfX,rfY,true)) {
			var rOtherPixel = pixelMap[rfX][rfY];
			var rOtherElement = rOtherPixel.element;
			if(haseuliteSpreadWhitelist.includes(rOtherElement)) {
				if(typeof(rOtherPixel.value) !== "number") {
					rOtherPixel.value = 0;
				};
				if(typeof(rOtherPixel) === "undefined" || isEmpty(rfX,rfY,true)) {
					return false;
				};
				var averageValue = (pixel.value + rOtherPixel.value) / 2;
				pixel.value = averageValue;
				rOtherPixel.value = averageValue;
			};
		};
		return true;
	};

	function haseuliteValueAbsorbency(pixel) {
		for(i = 0; i < adjacentCoords.length; i++) {
			var oX = adjacentCoords[i][0];
			var oY = adjacentCoords[i][1];
			var fX = pixel.x+oX;
			var fY = pixel.y+oY;
			if(!isEmpty(fX,fY,true)) {
				var otherPixel = pixelMap[fX][fY];
				var otherElement = otherPixel.element;
				var otherInfo = elements[otherElement];
				if(haseuliteValueObject[otherElement]) {
					if(typeof(otherPixel) === "undefined" || isEmpty(fX,fY,true)) {
						return false;
					};
					var haseuliteValueData = haseuliteValueObject[otherElement];
					if(haseuliteValueData instanceof Array) {
						var finalElement = haseuliteValueData[1];
						if(finalElement instanceof Array) { finalElement = finalElement[Math.floor(Math.random() * finalElement.length)] };
						changePixel(otherPixel,haseuliteValueData[1]);
						pixel.value += haseuliteValueData[0];
					} else if(typeof(haseuliteValueData) === "number") {
						deletePixel(otherPixel.x,otherPixel.y);
						pixel.value += haseuliteValueData[0];
					};
				};
			};
		};
		return true;
	};

	function haseuliteValueFunction(pixel) {
		if(typeof(pixel.value) === "undefined") {
			pixel.value = 0;
		};

		var oldValue = pixel.value;
		if(!haseuliteValueAbsorbency(pixel) || isNaN(pixel.value)) {
			pixel.value = oldValue;
		};

		var oldValue = pixel.value;
		if(!haseuliteValueSpreading(pixel) || isNaN(pixel.value)) {
			pixel.value = oldValue;
		};
	}

	function haseulitoidTick(pixel) {
		haseuliteValueFunction(pixel);
		if(pixel.oldColor === null) { pixel.oldColor = pixel.color };
		pixel.color = lightenColor(pixel.oldColor,pixel.value / 3);
		
		if(pixel.value >= 350) {
			var coldBoomChance = Math.max(0.008 * ((pixel.value - 350) / 100), 0.001);
			if(Math.random() < coldBoomChance) {
				var coldBoomRadius = Math.min(30,Math.floor(7 + ((pixel.value - 350) / 100)));
				explodeAtPlus(pixel.x,pixel.y,coldBoomRadius,"cold_fire","cold_smoke",null,coldExplosionAfterCooling);
			};
		};
	}

	elements.haseulite = {
		color: ["#3cb00e", "#25d119", "#79f553"],
		fireColor: ["#08a953", "#2ea332", "#d1e0d3"],
		properties: {
			value: 0,
			oldColor: null
		},
		behavior: behaviors.WALL,
		tick: function(pixel) { haseulitoidTick(pixel) },
		excludeVelocity: true, //wall shouldn't move
		tempHigh: 1757,
		onExplosionBreakOrSurvive: function(pixel,x,y,radius) {
			/*power is always radius/10
				r 5: value 7
				r 10: value 14
				r 15: value 28 
				r 20: value 56 
				r 25: value 112 
				r 30: value 224 
			*/
			pixel.value += (2**(((radius) / 5) - 1) * 7);
		},
		category: "solids",
		state: "solid",
		density: 7550,
		hardness: 0.93,
		breakInto: "haseulite_powder",
		conduct: 0.84,
	};

	if(!elements.steel.reactions) {
		elements.steel.reactions = {};
	};

	elements.steel.reactions.haseulite_powder = {
		elem1: "haseulite_vent",
		elem2: null,
		chance: 0.01,
		tempMin: 1200,
	};

	adjacentCoordsInverted = [[0,-1],[0,1],[-1,0],[1,0]];

	elements.haseulite_vent = {
		color: "#88b058",
		fireColor: ["#08a953", "#2ea332", "#d1e0d3"],
		behavior: behaviors.WALL,
		rotatable: true,
		desc: "This uses rotation, so just use debug to see the r value. r 0 means it vents haseulite below it upwards, r 1 means it vents haseulite above it downwards, r 2 means it vents left, and r 3 means it vents right.",
		tick: function(pixel) { 
			if(isNaN(pixel.r)) {
				pixel.r = 0;
			};
			pixel.r = pixel.r % 4;
			var coord = adjacentCoords[pixel.r];
			var invertCoord = adjacentCoordsInverted[pixel.r];	

			var fX = pixel.x+coord[0];
			var fY = pixel.y+coord[1];

			if(!isEmpty(fX,fY,true)) {
				var otherPixel = pixelMap[fX][fY];
				var otherElement = otherPixel.element;
				var otherInfo = elements[otherElement];
				if(typeof(otherPixel) === "undefined" || isEmpty(fX,fY,true)) {
					return false;
				};
				if(haseuliteSpreadWhitelist.includes(otherElement)) {
					var ventLimit = Math.min(10,Math.floor(1 + (Math.sqrt(Math.max(otherPixel.value,1)) / 2)));
					for(i = 1; i <= ventLimit; i++) {
						if(otherPixel.value >= 3) {
							var fIX = pixel.x+(invertCoord[0] * i);
							var fIY = pixel.y+(invertCoord[1] * i);
							if(isEmpty(fIX,fIY,false)) {
								createPixel("cold_fire",fIX,fIY);
								otherPixel.value -= 3;
							} else { //if the pixel to place isn't empty
								if(!outOfBounds(fIX,fIY)) { //if it isn't OoB
									if(pixelMap[fIX][fIY].element !== "cold_fire") { //if it isn't cold fire
										break;
									};
								} else { //if it is OoB
									break;
								};
							};
						} else {
							break;
						};
					};
				};
			};
			return true;
		},
		excludeVelocity: true, //wall shouldn't move
		tempHigh: elements.steel.tempHigh,
		stateHigh: ["molten_steel","haseulite_powder"],
		breakInto: ["metal_scrap","haseulite_powder"],
		category: "machines",
		state: "solid",
		density: 7550,
		hardness: 0.93,
		breakInto: "haseulite_powder",
		conduct: 0.84,
	}

	elements.haseulite_powder = {
		color: ["#5fb33e", "#32ba29", "#63d141"],
		properties: {
			value: 0,
			oldColor: null
		},
		fireColor: ["#08a953", "#2ea332", "#d1e0d3"],
		tempHigh: 1757,
		behavior: behaviors.POWDER,
		tick: function(pixel) { haseulitoidTick(pixel) },
		onExplosionBreakOrSurvive: function(pixel,x,y,radius) {
			/*power is always radius/10
				r 5: value 7
				r 10: value 14
				r 15: value 28 
				r 20: value 56 
				r 25: value 112 
				r 30: value 224 
			*/
			pixel.value += (2**(((radius) / 5) - 1) * 7);
		},
		stateHigh: "molten_haseulite",
		category: "powders",
		state: "solid",
		hidden: true,
		density: 4512,
		hardness: 0.7,
		conduct: 0.43,
	};

	elements.molten_haseulite = {
		color: ["#cbf569","#f1ffd6","#fdffb5", "#fffa99"],
		fireColor: ["#08a953", "#2ea332", "#d1e0d3"],
		properties: {
			value: 0,
			oldColor: null
		},
		tick: function(pixel) { haseulitoidTick(pixel) },
		onExplosionBreakOrSurvive: function(pixel,x,y,radius) {
			/*power is always radius/10
				r 5: value 7
				r 10: value 14
				r 15: value 28 
				r 20: value 56 
				r 25: value 112 
				r 30: value 224 
			*/
			pixel.value += (2**(((radius) / 5) - 1) * 7);
		},
		density: 7214,
		hardness: 0.52,
		breakInto: "haseulite_gas",
		temp: 1957,
		tempHigh: 3100,
		conduct: 0.23,
	};

	elements.haseulite_gas = {
		color: ["#ffff9d", "#ffffff", "#e9ffe6", "#ffffe5"],
		fireColor: ["#08a953", "#2ea332", "#d1e0d3"],
		properties: {
			value: 0,
			oldColor: null
		},
		tick: function(pixel) { haseulitoidTick(pixel) },
		onExplosionBreakOrSurvive: function(pixel,x,y,radius) {
			/*power is always radius/10
				r 5: value 7
				r 10: value 14
				r 15: value 28 
				r 20: value 56 
				r 25: value 112 
				r 30: value 224 
			*/
			pixel.value += (2**(((radius) / 5) - 1) * 7);
		},
		density: 0.289,
		temp: 3700,
		hardness: 1,
		conduct: 0.13,
	};

	/*
	var shimmeringColor = convertHslObjects(hslColorStringToObject(`hsl(${(pixelTicks / 2) % 360},100%,50%)`,"rgb"));
	customStaining(pixel,shimmeringColor,0.2);
	*/

	function heejinitoidTick(pixel) {
		if(pixel.oldColor === null) { pixel.oldColor = pixel.color };
		var color = rgbStringToHSL(convertColorFormats(pixel.oldColor,"rgb"),"json");
		var heejiniteHueSpread = 30 + (pixel.temp/9.25)
		var hueOffset = (Math.sin(pixelTicks / 11) * heejiniteHueSpread) + 15; color.h += hueOffset;
		var color = convertHslObjects(color,"rgb");
		pixel.color = color;
	};

	function hotHeejinitoidTick(pixel) {
		if(Math.random() < (pixel.temp >= 1500 ? 0.02 : 0.01)) {
			if(pixel.temp >= 1387.5) {
				var randomNeighborOffset = adjacentCoords[Math.floor(Math.random() * adjacentCoords.length)];
				var rX = randomNeighborOffset[0];
				var rY = randomNeighborOffset[1];
				var rfX = pixel.x+rX;
				var rfY = pixel.y+rY;
				if(isEmpty(rfX,rfY,false)) {
					var randomEligibleHotElement = hotHeejiniteElements[Math.floor(Math.random() * hotHeejiniteElements.length)];
					createPixel(randomEligibleHotElement,rfX,rfY);
					pixelMap[rfX][rfY].temp = pixel.temp;
				};
			};
		};
	}

	elements.heejinite = {
		color: ["#cf1172", "#fa1977", "#ff619e"],
		fireColor: ["#a9085e", "#a32e61", "#fca7c6"],
		properties: {
			oldColor: null
		},
		behavior: behaviors.WALL,
		tick: function(pixel) { heejinitoidTick(pixel) },
		excludeVelocity: true, //wall shouldn't move
		tempHigh: 837,
		category: "solids",
		state: "solid",
		density: 3773,
		stain: 0.1,
		hardness: 0.79,
		breakInto: "heejinite_powder",
		conduct: 0.86,
	};

	elements.heejinite_powder = {
		color: ["#d64790", "#e63e84", "#f054ac"],
		fireColor: ["#a9085e", "#a32e61", "#fca7c6"],
		properties: {
			oldColor: null
		},
		behavior: behaviors.POWDER,
		tick: function(pixel) { heejinitoidTick(pixel) },
		excludeVelocity: true, //wall shouldn't move
		tempHigh: 837,
		stateHigh: "molten_heejinite",
		category: "solids",
		state: "solid",
		density: 1412,
		stain: 0.1,
		hardness: 0.66,
		breakInto: "heejinite_powder",
		conduct: 0.42,
	};

	elements.molten_heejinite = {
		color: ["#ff0f77","#ff59c2","#ff405c", "#fa5a48"],
		fireColor: ["#a9085e", "#a32e61", "#fca7c6"],
		properties: {
			oldColor: null
		},
		tick: function(pixel) {
			heejinitoidTick(pixel);
			hotHeejinitoidTick(pixel);
		},
		density: 3121,
		hardness: 0.5,
		breakInto: "heejinite_gas",
		temp: 1000,
		tempHigh: 1501,
		conduct: 0.22,
	};

	elements.heejinite_gas = {
		color: ["#fffab8", "#ffdab3", "#ffd1d1", "#ffc4df", "#ffb0eb"],
		fireColor: ["#a9085e", "#a32e61", "#fca7c6"],
		properties: {
			oldColor: null
		},
		tick: function(pixel) {
			heejinitoidTick(pixel);
			hotHeejinitoidTick(pixel);
		},
		density: 0.117,
		temp: 1800,
		hardness: 1,
		conduct: 0.12,
	};

} else {
	if(!enabledMods.includes(loonaMod))				{ enabledMods.splice(enabledMods.indexOf(modName),0,loonaMod) };
	if(!enabledMods.includes(runAfterAutogenMod))	{ enabledMods.splice(enabledMods.indexOf(modName),0,runAfterAutogenMod) };
	if(!enabledMods.includes(explodeAtPlusMod))		{ enabledMods.splice(enabledMods.indexOf(modName),0,explodeAtPlusMod) };
	if(!enabledMods.includes(libraryMod))			{ enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod) };
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert(`The "${runAfterAutogenMod}", "${loonaMod}", "${libraryMod}", and "${explodeAtPlusMod}" mods are all required; any missing mods in this list have been automatically inserted (reload for this to take effect).`)
};
