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
		breakInto: ["rock","sulfur","loona_gravel","loona_gravel","loona_gravel","haseulite_powder"],
	},

	runAfterAutogen(function() {
		elements.loona.stateHigh = ["molten_loona","rock","rock","rock","sulfur_gas","sulfur_gas","molten_haseulite"];
	});

	elements.loona_gravel = {
		color: ["#b3be98","#919a6f","#68744b","#515931"],
		behavior: behaviors.POWDER,
		tempHigh: 1031,
		stateHigh: ["molten_loona","rock","rock","rock","sulfur_gas","sulfur_gas","molten_haseulite"],
		category: "random rocks",
		state: "solid",
		density: 1625.14,
		hardness: 0.97,
		breakInto: ["rock","sulfur","rock","haseulite_powder"],
	};

	haseuliteValueObject = {
		light: 1,
		radiation: 4,
		fire: [6, "smoke"],
		rad_fire: [10, "rad_smoke"],
		plasma: [15, "fire"]
	};

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
		category: "solids",
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
} else {
	if(!enabledMods.includes(loonaMod))				{ enabledMods.splice(enabledMods.indexOf(modName),0,loonaMod) };
	if(!enabledMods.includes(runAfterAutogenMod))	{ enabledMods.splice(enabledMods.indexOf(modName),0,runAfterAutogenMod) };
	if(!enabledMods.includes(explodeAtPlusMod))		{ enabledMods.splice(enabledMods.indexOf(modName),0,explodeAtPlusMod) };
	if(!enabledMods.includes(libraryMod))			{ enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod) };
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert(`The "${runAfterAutogenMod}", "${loonaMod}", "${libraryMod}", and "${explodeAtPlusMod}" mods are all required; any missing mods in this list have been automatically inserted (reload for this to take effect).`)
};
