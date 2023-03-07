var modName = "mods/haseulite.js";
var loonaMod = "mods/funny elements 2022-11-15.js";
var fireMod = "mods/fire_mod.js";
var runAfterAutogenMod = "mods/runAfterAutogen and onload restructure.js";
var explodeAtPlusMod = "mods/explodeAtPlus.js";
var doElectricityMod = "mods/doElectricity changes.js";
var libraryMod = "mods/code_library.js";

if(enabledMods.includes(loonaMod) && enabledMods.includes(fireMod) && enabledMods.includes(runAfterAutogenMod) && enabledMods.includes(explodeAtPlusMod) && enabledMods.includes(doElectricityMod) && enabledMods.includes(libraryMod)) {
	//move explodeAt to YG Entertainment's dungeon

	oldExplodeAt = explodeAt;
	explodeAt = explodeAtPlus;
	haseuliteSpreadWhitelist = ["haseulite","haseulite_powder","molten_haseulite","haseulite_gas"];
	jinsouliteSpreadWhitelist = ["jinsoulite","jinsoulite_powder","molten_jinsoulite","jinsoulite_gas"];

	function coldExplosionAfterCooling(pixel,x,y,radius,fire,smoke,power,damage) {
		pixel.temp -= 2*damage*radius*power;
	};

	function reactionStealerImmutableElem2(pixel,newPixel,reactionTarget,ignoreSelf=true,_chanceMultMeantForJinsoulites=1) {
		if(!elements[reactionTarget]) {
			throw new Error(`No such element ${reactionTarget}!`);
		};
		if(typeof(newPixel) === "undefined") { //timing issue?
			return false;
		};
		var newElement = newPixel.element;
		if(ignoreSelf && newElement === pixel.element) {
			return false;
		};
		var newInfo = elements[newElement];
		if(typeof(newInfo.reactions) === "undefined") {
			return false;
		};
		if(typeof(newInfo.reactions[reactionTarget]) === "undefined") {
			return false;
		};
		var pixel2 = pixel;
		var pixel1 = newPixel;
		var r = JSON.parse(JSON.stringify(newInfo.reactions[reactionTarget]));
		
		if (r.setting && settings[r.setting]===0) {
			return false;
		}
		// r has the attribute "y" which is a range between two y values
		// r.y example: [10,30]
		// return false if y is defined and pixel1's y is not in the range
		if (r.tempMin !== undefined && pixel1.temp < r.tempMin) {
			return false;
		}
		if (r.tempMax !== undefined && pixel1.temp > r.tempMax) {
			return false;
		}
		if (r.charged && !pixel.charge) {
			return false;
		}
		if (r.chance !== undefined && Math.random() < (r.chance * _chanceMultMeantForJinsoulites)) {
			return false;
		}
		if (r.y !== undefined && (pixel1.y < r.y[0] || pixel1.y > r.y[1])) {
			return false;
		}
		if(r.elem1 !== undefined && r.elem2 !== undefined) {
			if(r.elem1 !== null && r.elem2 !== null) {
				r.elem1 = [r.elem1,r.elem2].flat();
			};
		};
		if (r.elem1 !== undefined) {
			// if r.elem1 is an array, set elem1 to a random element from the array, otherwise set it to r.elem1
			if (Array.isArray(r.elem1)) {
				var elem1 = r.elem1[Math.floor(Math.random() * r.elem1.length)];
			} else { var elem1 = r.elem1; }
			
			if (elem1 == null) {
				deletePixel(pixel1.x,pixel1.y);
			}
			else {
				changePixel(pixel1,elem1);
			}
		}
		if (r.charge1) { pixel1.charge = r.charge1; }
		if (r.temp1) { pixel1.temp += r.temp1; pixelTempCheck(pixel1); }
		if (r.color1) { // if it's a list, use a random color from the list, else use the color1 attribute
			pixel1.color = pixelColorPick(pixel1, Array.isArray(r.color1) ? r.color1[Math.floor(Math.random() * r.color1.length)] : r.color1);
		}
		if (r.attr1) { // add each attribute to pixel1
			for (var key in r.attr1) {
				pixel1[key] = r.attr1[key];
			}
		}
		if (r.charge2) { pixel2.charge = r.charge2; }
		if (r.temp2) { pixel2.temp += r.temp2; pixelTempCheck(pixel2); }
		if (r.color2) { // if it's a list, use a random color from the list, else use the color2 attribute
			pixel2.color = pixelColorPick(pixel2, Array.isArray(r.color2) ? r.color2[Math.floor(Math.random() * r.color2.length)] : r.color2);
		}
		if (r.attr2) { // add each attribute to pixel2
			for (var key in r.attr2) {
				pixel2[key] = r.attr2[key];
			}
		}
		if (r.func) { r.func(pixel1,pixel2); }
		return r.elem1!==undefined;
	};

	elements.loona = {
		color: ["#6f7d54","#4f5d34","#7c8a61"],
		behavior: behaviors.POWDER,
		tempHigh: 1031,
		category: "random rocks",
		state: "solid",
		density: 2466.73,
		hardness: 0.56,
		breakInto: ["rock","sulfur","loona_gravel","loona_gravel","loona_gravel","haseulite_powder", "rock","sulfur","loona_gravel","loona_gravel","loona_gravel","jinsoulite_powder", "rock","sulfur","loona_gravel","loona_gravel","loona_gravel","heejinite_powder"],
	};

	var backupCategoryWhitelist = ["land","powders","weapons","food","life","corruption","states","fey","Fantastic Creatures","dyes","energy liquids","random liquids","random gases","random rocks"];
	var backupElementWhitelist = ["mercury", "chalcopyrite_ore", "chalcopyrite_dust", "copper_concentrate", "fluxed_copper_concentrate", "unignited_pyrestone", "ignited_pyrestone", "everfire_dust", "extinguished_everfire_dust", "mistake", "polusium_oxide", "vaporized_polusium_oxide", "glowstone_dust", "redstone_dust", "soul_mud", "wet_soul_sand", "nitrogen_snow", "fusion_catalyst", "coal", "coal_coke", "blast_furnace_fuel", "molten_mythril"];

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
		elements.loona.stateHigh = ["molten_loona","rock","rock","rock","sulfur_gas","sulfur_gas","molten_haseulite","molten_loona","rock","rock","rock","sulfur_gas","sulfur_gas","molten_jinsoulite","molten_loona","rock","rock","rock","sulfur_gas","sulfur_gas","molten_heejinite"];
		hotHeejiniteElements = Object.keys(elements).filter(function(e) {
			return spoutCriteria(e) && heejiniteHeatCriteria(e) && !elements[e].excludeRandom && !e.startsWith("rad");
		});
	});

	elements.loona_gravel = {
		color: ["#b3be98","#919a6f","#68744b","#515931"],
		behavior: behaviors.POWDER,
		tempHigh: 1031,
		stateHigh: ["molten_loona","rock","rock","rock","sulfur_gas","sulfur_gas","molten_haseulite","molten_loona","rock","rock","rock","sulfur_gas","sulfur_gas","molten_jinsoulite","molten_loona","rock","rock","rock","sulfur_gas","sulfur_gas","molten_heejinite"],
		category: "random rocks",
		state: "solid",
		density: 1625.14,
		hardness: 0.97,
		breakInto: ["rock","sulfur","rock","haseulite_powder","rock","sulfur","rock","jinsoulite_powder","rock","sulfur","rock","heejinite_powder"],
	};

	haseuliteValueObject = {
		light: 1,
		radiation: 4,
		fire: {value: 6, remainder: "smoke"},
		rad_fire: {value: 10, remainder: "rad_smoke"},
		liquid_fire: {value: 12, remainder: ["fire","liquid_smoke","smoke"]},
		plasma: {value: 15, remainder: "fire"},
		liquid_rad_fire: {value: 20, remainder: [null,"rad_fire","rad_fire","rad_smoke","rad_smoke"]},
		liquid_plasma: {value: 30, remainder: ["plasma","liquid_fire","fire"]},
		liquid_irradium: {value: 4, remainder: 0}
	};

	jinsouliteValueObject = {
		cloud: 0.5,
		cloud_cloud: {value: 0.5, remainder: "cloud"},
		snow_cloud: {value: 0.75},
		hail_cloud: {value: 0.75},
		steam: 1,
		steam_cloud: {value: 0.5, remainder: "steam"},
		rain_cloud_cloud: {value: 0.5, remainder: "rain_cloud"},
		snow_cloud_cloud: {value: 0.5, remainder: "snow_cloud"},
		hail_cloud_cloud: {value: 0.5, remainder: "hail_cloud"},
		rain_cloud: {value: 1, remainder: "cloud"},
		water_cloud: {value: 1, remainder: "cloud"},
		snow: {value: 0.125},
		soda: {value: 0.8984375, remainder: "sugar"},
		blood: {value: 0.90625, remainder: "dna"},
		infection: {value: 0.90625, remainder: "dna"},
		packed_snow: {value: 0.90625},
		slime: {value: 0.9609375, remainder: "salt"}, //:eggTF:
		slush: {value: 0.9609375},
		ice: {value: 0.98046875},
		salt_water: {value: 1, remainder: "salt"}, //should be 0.965 but simplified here
		dirty_water: {value: 1, remainder: ["ash","dust","carbon_dioxide","ash","dust","carbon_dioxide","infection"]},
		sugar_water: {value: 1, remainder: "sugar"},
		seltzer: {value: 1, remainder: "carbon_dioxide"},
		pool_water: {value: 1, remainder: "chlorine"},
		water: {value: 1, tempMin: 80},
		water_bomb: 59,
		water_bomb_2: 164.5,
		water_bomb_3: 322.5,
		water_bomb_4: 534,
		water_bomb_5: 798,
		water_bomb_6: 1112.5,
		water_bomb_7: 1480,
		water_bomb_8: 1901.5,
		water_bomb_9: 2373,
		water_bomb_10: 2898, //average rates from in-game simulation since I can't come up with an exponential function
		water_bomb_bomb: 59*59,
		water_bomb_bomb_2: 59*164.5,
		water_bomb_bomb_3: 59*322.5,
		water_bomb_bomb_4: 59*534,
		water_bomb_bomb_5: 59*798,
		water_bomb_bomb_6: 59*1112.5,
		water_bomb_bomb_7: 59*1480,
		water_bomb_bomb_8: 59*1901.5,
		water_bomb_bomb_9: 59*2373,
		water_bomb_bomb_10: 59*2898, //creates up to around 2,898 water bombs, each of which theoretically create up to around 59 water
		water_bomb_bomb: 59*59,
		water_bomb_2_bomb: 164.5*59,
		water_bomb_3_bomb: 322.5*59,
		water_bomb_4_bomb: 534*59,
		water_bomb_5_bomb: 798*59,
		water_bomb_6_bomb: 1112.5*59,
		water_bomb_7_bomb: 1480*59,
		water_bomb_8_bomb: 1901.5*59,
		water_bomb_9_bomb: 2373*59,
		water_bomb_10_bomb: 2898*59,  //creates up to around 59 water bombs, each of which theoretically create up to around 2,898 water
		water_bomb_10_bomb_10: 2898*2898,  //skipping to the funny
		water_bomb_cloud: 30,
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

	function valueSpreading(pixel,whitelist=null) {
		var randomNeighborOffset = adjacentCoords[Math.floor(Math.random() * adjacentCoords.length)];
		var rX = randomNeighborOffset[0];
		var rY = randomNeighborOffset[1];
		var rfX = pixel.x+rX;
		var rfY = pixel.y+rY;
		if(!isEmpty(rfX,rfY,true)) {
			var rOtherPixel = pixelMap[rfX][rfY];
			var rOtherElement = rOtherPixel.element;
			if(whitelist === null || (whitelist !== null && whitelist.includes(rOtherElement))) {
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

	function valueAbsorbency(pixel,valueObject) {
		for(i = 0; i < adjacentCoords.length; i++) {
			var oX = adjacentCoords[i][0];
			var oY = adjacentCoords[i][1];
			var fX = pixel.x+oX;
			var fY = pixel.y+oY;
			if(!isEmpty(fX,fY,true)) {
				var otherPixel = pixelMap[fX][fY];
				var otherElement = otherPixel.element;
				var otherInfo = elements[otherElement];
				if(valueObject[otherElement]) {
					//console.log(`${otherElement} in your area`)
					if(typeof(otherPixel) === "undefined" || isEmpty(fX,fY,true)) {
						console.log(`nope`)
						return false;
					};
					var ValueData = valueObject[otherElement];
					//console.log(ValueData.toString())
					if(typeof(ValueData) == "object") {
						var tempMin = ValueData.tempMin ?? null;
						if(pixel.temp < tempMin) {
							continue;
						};
						var finalElement = ValueData.remainder ?? null;
						if(finalElement instanceof Array) {
							finalElement = finalElement[Math.floor(Math.random() * finalElement.length)];
						};
						if(finalElement !== 0) {
							if(finalElement !== null) {
								changePixel(otherPixel,finalElement);
							} else {
								deletePixel(otherPixel.x,otherPixel.y);
							};
						};
						pixel.value += ValueData.value;
					} else if(typeof(ValueData) === "number") {
						deletePixel(otherPixel.x,otherPixel.y);
						pixel.value += ValueData;
					};
				};
			};
		};
		return true;
	};

	function valueFunction(pixel,valueObject,elementWhitelist=null) {
		if(typeof(pixel.value) === "undefined") {
			pixel.value = 0;
		};

		var oldValue = pixel.value;
		if(!valueAbsorbency(pixel,valueObject) || isNaN(pixel.value)) {
			pixel.value = oldValue;
		};

		var oldValue = pixel.value;
		if(!valueSpreading(pixel,elementWhitelist) || isNaN(pixel.value)) {
			pixel.value = oldValue;
		};
	}

	function haseulitoidTick(pixel) {
		if(pixel.value == undefined) { pixel.value = 0 };
		valueFunction(pixel,haseuliteValueObject,haseuliteSpreadWhitelist);
		if(pixel.oldColor === undefined) { pixel.oldColor = pixelColorPick(pixel) };
		if(pixel.oldColor === null) { pixel.oldColor = pixel.color };
		if(isNaN(pixel.value)) { pixel.value = 0 };
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
			oldColor: null
		},
		category: "powders",
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
			oldColor: null
		},
		behavior: behaviors.LIQUID, //fire creation is problematic due to smoke cooling
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

	if(enabledMods.includes("mods/metals.js")) {
		elements.hanichrite = { //the names nickel, chrome, and haseulite do not mix
			color: ["#dde6bc", "#ebf2ef", "#e8fab1"],
			behavior: behaviors.WALL,
			tempHigh: 1560,
			category: "solids",
			density: 8218,
			conduct: 0.75,
			hardness: 0.78,
			state: "solid",
			tick: function(pixel) {
				if(nichromeDoNeighborCount) {
					var neighbors = 0;
					for(i = 0; i < adjacentCoords.length; i++) {
						if(!isEmpty(pixel.x+adjacentCoords[i][0],pixel.y+adjacentCoords[i][1],true)) {
							var newPixel = pixelMap[pixel.x+adjacentCoords[i][0]][pixel.y+adjacentCoords[i][1]];
							if(elements[newPixel.element].conduct) { neighbors++ };
						};
					};
				};
				if(pixel.charge) {
					pixel.temp -= ((1.13 + nichromeNeighborLogic(neighbors)) * pixel.charge);
				};
			},
		};

		elements.molten_hanichrite = {
			tick: function(pixel) {
				if(nichromeDoNeighborCount) {
					var neighbors = 0;
					for(i = 0; i < adjacentCoords.length; i++) {
						if(!isEmpty(pixel.x+adjacentCoords[i][0],pixel.y+adjacentCoords[i][1],true)) {
							var newPixel = pixelMap[pixel.x+adjacentCoords[i][0]][pixel.y+adjacentCoords[i][1]];
							if(elements[newPixel.element].conduct) { neighbors++ };
						};
					};
				};
				if(pixel.charge) {
					pixel.temp -= ((1.13 + nichromeNeighborLogic(neighbors)) * pixel.charge) * 1.09;
				};
			},
		};
	};

	/*
	var shimmeringColor = convertHslObjects(hslColorStringToObject(`hsl(${(pixelTicks / 2) % 360},100%,50%)`,"rgb"));
	customStaining(pixel,shimmeringColor,0.2);
	*/

	function heejinitoidTick(pixel) {
		if(pixel.oldColor === null) { pixel.oldColor = pixel.color };
		if(pixel.oldColor === undefined) { pixel.oldColor = pixelColorPick(pixel) };
		var color = rgbStringToHSL(convertColorFormats(pixel.oldColor,"rgb"),"json");
		var heejiniteHueSpread = 30 + (pixel.temp/9.25)
		var hueOffset = (Math.sin(pixelTicks / 11) * heejiniteHueSpread) + 15; color.h += hueOffset;
		var color = convertHslObjects(color,"rgb");
		pixel.color = color;
	};

	function hotHeejinitoidTick(pixel) {
		if(pixel.oldColor === undefined) { pixel.oldColor = pixelColorPick(pixel) };
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
		hidden: true,
		stateHigh: "molten_heejinite",
		category: "powders",
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

	jinsouliteReducedSwapWhitelist = ["slime","glue","soda","milk","chocolate_milk","fruit_milk","ink","blood","vaccine","antibody","infection","sap","ketchup","spirit_tear","enchanted_ketchup","lean","poisoned_ketchup","dirty_ketchup","zombie_blood"];

	function jinsouliteDissolution(pixel) {
		var did = false;
		for(i = 0; i < 2; i++) {
			var randomNeighborOffset = adjacentCoords[Math.floor(Math.random() * adjacentCoords.length)];
			var rfX = pixel.x+randomNeighborOffset[0];
			var rfY = pixel.y+randomNeighborOffset[1];
			if(!isEmpty(rfX,rfY,true)) {
				var rOtherPixel = pixelMap[rfX][rfY];
				if(!rOtherPixel) { return false };
				var rOtherElement = rOtherPixel.element;
				if(rOtherElement.endsWith("water") || (Math.random() < 0.3 && jinsouliteReducedSwapWhitelist.includes(rOtherElement))) {
					swapPixels(pixel,rOtherPixel);
					did = true;
				};
			};
		};
		return did;
	};

	function jinsouliteMovement(pixel,move1Spots,move2Spots) {		
		if(move1Spots.length > 0) {
			var randomMove1 = move1Spots[Math.floor(Math.random() * move1Spots.length)];
			if(!tryMove(pixel, pixel.x+randomMove1[0], pixel.y+randomMove1[1])) {
				//console.log((pixel.x+randomMove1[0]) + " " + (pixel.y+randomMove1[1]))
				var newPixel = null;
				if(!outOfBounds(pixel.x+randomMove1[0],pixel.y+randomMove1[1])) {
					newPixel = pixelMap[pixel.x+randomMove1[0]][pixel.y+randomMove1[1]]; //newPixel is AAA
				};
				if(outOfBounds(pixel.x+randomMove1[0],pixel.y+randomMove1[1]) || !reactionStealerImmutableElem2(pixel,newPixel,"water",true,2)) {
					if(move2Spots.length > 0) {
						var randomMove2 = move2Spots[Math.floor(Math.random() * move2Spots.length)];
						if(!tryMove(pixel, pixel.x+randomMove2[0], pixel.y+randomMove2[1])) {
							var newPixel = null;
							if(!outOfBounds(pixel.x+randomMove1[0],pixel.y+randomMove1[1])) {
								newPixel = pixelMap[pixel.x+randomMove1[0]][pixel.y+randomMove1[1]]; //newPixel is AAA
							};
							if(newPixel !== null) { reactionStealerImmutableElem2(pixel,newPixel,"water",true,2) };
						};
					};
				};
			};
		};
		doDefaults(pixel);
	};

	function jinsouliteSolidNonWaterSideReactions(pixel) {
		var randomNeighborOffset = adjacentCoords[Math.floor(Math.random() * adjacentCoords.length)];
		var rfX = pixel.x+randomNeighborOffset[0];
		var rfY = pixel.y+randomNeighborOffset[1];
		if(!isEmpty(rfX,rfY,true)) {
			var rOtherPixel = pixelMap[rfX][rfY];
			if(typeof(rOtherPixel) === "undefined" || isEmpty(rfX,rfY,true)) {
				return false;
			};
			reactionStealerImmutableElem2(pixel,rOtherPixel,"water",true,2);
		};
		return true;
	};
	
	function jinsouliteSolidWaterSideReactions(pixel) {
		var randomNeighborOffset = adjacentCoords[Math.floor(Math.random() * adjacentCoords.length)];
		var rfX = pixel.x+randomNeighborOffset[0];
		var rfY = pixel.y+randomNeighborOffset[1];
		if(!isEmpty(rfX,rfY,true)) {
			var pixel2 = pixelMap[rfX][rfY];
			var pixel1 = pixel;
			if(typeof(pixel2) === "undefined" || isEmpty(rfX,rfY,true)) {
				return false;
			};
			if(typeof(pixel1) === "undefined" || isEmpty(pixel.x,pixel.y,true)) {
				return false;
			};
			var rOtherElement = pixel2.element;
			var waterReactions = elements.water.reactions;
			
			if(rOtherElement === pixel.element) {
				return false;
			};
			if(waterReactions[rOtherElement]) {
				var r = waterReactions[rOtherElement];

				if (r.setting && settings[r.setting]===0) {
					return false;
				}
				// r has the attribute "y" which is a range between two y values
				// r.y example: [10,30]
				// return false if y is defined and pixel1's y is not in the range
				if (r.tempMin !== undefined && pixel1.temp < r.tempMin) {
					return false;
				}
				if (r.tempMax !== undefined && pixel1.temp > r.tempMax) {
					return false;
				}
				if (r.charged && !pixel.charge) {
					return false;
				}
				if (r.chance !== undefined && Math.random() < (r.chance * 2)) {
					return false;
				}
				if (r.y !== undefined && (pixel1.y < r.y[0] || pixel1.y > r.y[1])) {
					return false;
				}
				if (r.charge1) { pixel1.charge = r.charge1; }
				if (r.temp1) { pixel1.temp += r.temp1; pixelTempCheck(pixel1); }
				if (r.color1) { // if it's a list, use a random color from the list, else use the color1 attribute
					pixel1.color = pixelColorPick(pixel1, Array.isArray(r.color1) ? r.color1[Math.floor(Math.random() * r.color1.length)] : r.color1);
				}
				if (r.attr1) { // add each attribute to pixel1
					for (var key in r.attr1) {
						pixel1[key] = r.attr1[key];
					}
				}
				var elem1 = r.elem1
				if (elem1 !== undefined && elem1 instanceof Array) {
					elem1 = elem1[Math.floor(Math.random() * elem1.length)];
				};
				
				if (r.elem2 !== undefined) {
					// if r.elem2 is an array, set elem2 to a random element from the array, otherwise set it to r.elem2
					if (Array.isArray(r.elem2)) {
						var elem2 = r.elem2[Math.floor(Math.random() * r.elem2.length)];
					} else { var elem2 = r.elem2; }

					if (elem2 == null) {
						if(elem1 !== undefined) { changePixel(pixel2,elem1) };
					}
					else {
						changePixel(pixel2,elem2);
					}
				}
				if (r.charge2) { pixel2.charge = r.charge2; }
				if (r.temp2) { pixel2.temp += r.temp2; pixelTempCheck(pixel2); }
				if (r.color2) { // if it's a list, use a random color from the list, else use the color2 attribute
					pixel2.color = pixelColorPick(pixel2, Array.isArray(r.color2) ? r.color2[Math.floor(Math.random() * r.color2.length)] : r.color2);
				}
				if (r.attr2) { // add each attribute to pixel2
					for (var key in r.attr2) {
						pixel2[key] = r.attr2[key];
					}
				}
				if (r.func) { r.func(pixel1,pixel2); }
				return r.elem1!==undefined || r.elem2!==undefined;
			};
		};
		return true;
	};

	function jinsouliteValue(pixel) {
		valueFunction(pixel,jinsouliteValueObject,jinsouliteSpreadWhitelist);
		if(pixel.oldColor === null) { pixel.oldColor = pixel.color };
		if(isNaN(pixel.value)) { pixel.value = 0 };
		pixel.color = changeSaturation(pixel.oldColor,pixel.value / 3,"subtract","rgb")
		
		if(pixel.value > 1) {
			if(Math.random() < Math.min((pixel.value / 200),0.5)) {
				var randomNeighborOffset = adjacentCoords[Math.floor(Math.random() * adjacentCoords.length)];
				var rX = randomNeighborOffset[0];
				var rY = randomNeighborOffset[1];
				var rfX = pixel.x+rX;
				var rfY = pixel.y+rY;
				if(isEmpty(rfX,rfY,false)) {
					createPixel("water",rfX,rfY);
					pixel.value--;
				};
			};
			/*for(g = 0; g < adjacentCoords.length; g++) {
				var oX = adjacentCoords[g][0];
				var oY = adjacentCoords[g][1];
				var fX = pixel.x+oX;
				var fY = pixel.y+oY;
				if(isEmpty(fX,fY,false)) {
					createPixel("water",fX,fY);
					pixel.value--;
				};
			};*/
		};
	}

	function jinsoulitoidTick(pixel,move1Spots=[],move2Spots=[]) {
		if(pixel.oldColor === undefined) { pixel.oldColor = pixelColorPick(pixel) };
		if(pixel.value == undefined) { pixel.value = 0 };
		if(jinsouliteDissolution(pixel)) {
			return;
		};
		jinsouliteValue(pixel);
		jinsouliteMovement(pixel,move1Spots,move2Spots);
	};

	elements.jinsoulite = {
		color: ["#0e51b0", "#2129ff", "#3b3dbf"],
		fireColor: ["#121978", "#6a9fe6", "#5963d9"],
		behavior: [
			"XX|CR:water%0.05|XX",
			"CR:water%0.05|XX|CR:water%0.05",
			"XX|CR:water%0.05|XX"
		],
		behaviorOn: [
			"XX|CR:water%0.15|XX",
			"CR:water%0.15|XX|CR:water%0.15",
			"XX|CR:water%0.15|XX"
		],
		properties: {
			oldColor: null
		},
		tick: function(pixel) { 
			if(pixel.value == undefined) { pixel.value = 0 };
			if(pixel.oldColor === undefined) { pixel.oldColor = pixelColorPick(pixel) };
			jinsouliteValue(pixel);
			jinsouliteSolidNonWaterSideReactions(pixel);
			jinsouliteSolidWaterSideReactions(pixel);
		},
		tempHigh: 2606,
		category: "solids",
		state: "solid",
		density: 8331,
		hardness: 0.82,
		breakInto: "jinsoulite_powder",
		conduct: 0.93,
	};

	elements.jinsoulite_powder = {
		color: ["#4580ba", "#355eb0", "#2d6fc4"],
		fireColor: ["#121978", "#6a9fe6", "#5963d9"],
		tempHigh: 2606,
		behavior: [
			"XX|CR:water%0.05|XX",
			"CR:water%0.05|XX|CR:water%0.05",
			"XX|CR:water%0.05|XX"
		],
		properties: {
			oldColor: null
		},
		category: "powders",
		behaviorOn: [
			"XX|CR:water%0.15|XX",
			"CR:water%0.15|XX|CR:water%0.15",
			"XX|CR:water%0.15|XX"
		],
		tick: function(pixel) { jinsoulitoidTick(pixel,[[0,1]],[[-1,1],[1,1]]) },
		stateHigh: "molten_jinsoulite",
		category: "powders",
		state: "solid",
		hidden: true,
		density: 5801,
		hardness: 0.7,
		conduct: 0.43,
	};

	elements.molten_jinsoulite = {
		behavior: [
			"XX|CR:fire,fire,steam%0.5|XX",
			"XX|XX|XX",
			"XX|XX|XX"
		],
		behaviorOn: [
			"XX|CR:fire,steam,steam%0.7|XX",
			"CR:steam%0.1|XX|CR:steam%0.1",
			"XX|CR:steam%0.1|XX"
		],
		properties: {
			oldColor: null
		},
		color: ["#4e35db","#7767eb","#a876f5", "#78acff"],
		fireColor: ["#121978", "#6a9fe6", "#5963d9"],
		fireElement: ["fire","fire","steam"],
		tick: function(pixel) { jinsoulitoidTick(pixel,[[-1,1],[0,1],[1,1]],[[-1,0],[1,0]]); },
		density: 6448,
		hardness: 0.61,
		breakInto: "jinsoulite_gas",
		temp: 3000,
		tempHigh: 5532.8509,
		conduct: 0.34,
	};

	elements.jinsoulite_gas = {
		color: ["#c0f0ef", "#c2c1db", "#c0bff5", "#cdcce6"],
		behavior: [
			"XX|CR:steam%0.5|XX",
			"CR:steam%0.5|XX|CR:steam%0.5",
			"XX|CR:steam%0.5|XX",
		],
		behaviorOn: [
			"XX|CR:steam%1|XX",
			"CR:steam%1|XX|CR:steam%1",
			"XX|CR:steam%1|XX",
		],
		fireColor: ["#08a953", "#2ea332", "#d1e0d3"],
		properties: {
			oldColor: null
		},
		tick: function(pixel) { jinsoulitoidTick(pixel,adjacentCoords,[[-1,-1],[1,-1],[1,1],[-1,1]]) },
		density: 0.5833,
		temp: 6000,
		hardness: 1,
		conduct: 0.19,
	};
	
	//apples (used for yvesite)

	appleAttachWhitelist = ["wood","tree_branch"];

	elements.apple = {
		color: ["#ad2333", "#b51616", "#d6782f", "#e3c634", "#99de31"],
		tick: function(pixel) {
			if(pixel.attached) { //only attaches upwards
				if(isEmpty(pixel.x,pixel.y-1,true)) {
					pixel.attached = false;
				};
			} else { //Move if not attached
				if (!tryMove(pixel, pixel.x, pixel.y+1)) {
					if(Math.random() < 0.3) {
						if (Math.random() < 0.5) {
							if (!tryMove(pixel, pixel.x+1, pixel.y+1)) {
								tryMove(pixel, pixel.x-1, pixel.y+1);
							};
						} else {
							if (!tryMove(pixel, pixel.x-1, pixel.y+1)) {
								tryMove(pixel, pixel.x+1, pixel.y+1);
							};
						};
					};
				};
			};
			doDefaults(pixel);
			var shouldSpoil = true; //spoil by default
			if(pixel.attached) { //if it's attached
				if(!isEmpty(pixel.x,pixel.y-1,true)) { //if the attachment coords are a pixel and not OOB
					var attachPixel = pixelMap[pixel.x][pixel.y-1];
					var attachElement = attachPixel.element;
					if(appleAttachWhitelist.includes(attachElement)) {//if the element is a whitelisted "don't spoil" element
						shouldSpoil = false; //then don't spoil
					};
				};
			};
			if(shouldSpoil) { //spoil if not attached
				if(pixel.temp > -18 && pixel.temp <= 4) { //(no spoiling below -18C)
					pixel.spoilage += Math.max(Math.min(scale(pixel.temp,-18,4,0,9),9),0)
				} else if(pixel.temp > 4) {
					pixel.spoilage += Math.max(Math.min(scale(pixel.temp,4,20,9,30),40),0)
				};
			};
			if(pixel.spoilage > 14400) { //3600 = 120 ticks at 20C
				if(Math.random() < 0.05) {
					changePixel(pixel,"rotten_apple");
				};
			};
		},
		properties: {
			"spoilage": 0,
			"attached": false,
		},
		burn: 5,
		burnInto: ["steam", "ash"],
		burnTime: 600,
		tempHigh: 200,
		stateHigh: ["steam", "ash"],
		onTryMoveInto: function(pixel,otherPixel) {
			var otherInfo = elements[otherPixel.element]
			if(typeof(otherInfo.state) === "string" && otherInfo.state !== "gas") {
				pixel.attached = false;
			};
		},
	};

	elements.rotten_apple = {
		hidden: true,
		color: ["#802e24", "#9c4227", "#a34b26"],
		behavior: [
			"XX|CR:stench,fly%0.1|XX",
			"M2%0.5|CH:dirty_water,fly,fly%0.007|M2%0.5",
			"M2|M1|M2"
		],
		stain: 0.01,
		burn: 5,
		burnInto: ["steam", "ash"],
		burnTime: 600,
		tempHigh: 200,
		stateHigh: ["steam", "ash"],
	};

	//Yvesite

	var yvesiteAppleSpots = [[-1, 1], [0, 1], [1, 1]];
	var yvesitePowderAppleSpots = [[-1, 0], [0, -1], [1, 0]];

	function yvesiteApples(pixel,offsets) {
		if(pixel.charge) {
			var probAdd = Math.min(0,Math.max(pixel.temp,100)) / 2500;
			if(Math.random() < (0.02 + probAdd)) {
				var appleOffset = randomArrayChoice(offsets);
				if(tryCreatePixel("apple",pixel.x+appleOffset[0],pixel.y+appleOffset[1])) {
					var apple = pixelMap[pixel.x+appleOffset[0]][pixel.y+appleOffset[1]];
					apple.color = pixelColorPick(apple,"#c40e2c");
					apple.spoilage = -Infinity;
					return true;
				} else {
					return null;
				};
			};
		};
		return false;
	};

	elements.yvesite = {
		color: ["#850f2c", "#9c0e3d", "#911f3b", "#701625"],
		fireColor: ["#b5103f", "#ab3254", "#cc2157", "#ba0936"],
		behavior: behaviors.WALL,
		tick: function(pixel) {
			yvesiteApples(pixel,yvesiteAppleSpots);
		},
		reactions: {
			heejinite: {temp1: 1, temp2: 1},
			molten_heejinite: {temp1: 2, temp2: 2},
			heejinite_powder: {temp1: 2, temp2: 2},
			heejinite_gas: {temp1: 3, temp2: 3},
		},
		tempHigh: 1545,
		category: "solids",
		state: "solid",
		density: 3601,
		hardness: 0.88,
		breakInto: "yvesite_powder",
		conduct: 0.94,
	};

	elements.yvesite_powder = {
		color: ["#8f1734", "#962638", "#b32749", "#911a3e"],
		fireColor: ["#b5103f", "#ab3254", "#cc2157", "#ba0936"],
		behavior: behaviors.POWDER,
		tick: function(pixel) {
			yvesiteApples(pixel,yvesitePowderAppleSpots);
		},
		reactions: {
			heejinite: {temp1: 2, temp2: 2},
			molten_heejinite: {temp1: 3, temp2: 3},
			heejinite_powder: {temp1: 3, temp2: 3},
			heejinite_gas: {temp1: 4, temp2: 4},
		},
		tempHigh: 1545,
		stateHigh: "molten_yvesite",
		category: "solids",
		state: "solid",
		density: 1500,
		hardness: 0.43,
		breakInto: "yvesite_powder",
		conduct: 0.84,
	};
	
	elements.molten_yvesite = {
		color: ["#e81554", "#c90842", "#db4d70", "#cf2b54"],
		fireColor: ["#b5103f", "#ab3254", "#cc2157", "#ba0936"],
		behavior: behaviors.MOLTEN,
		density: 3608,
		state: "liquid",
		hardness: 0.57,
		breakInto: "yvesite_gas",
		temp: 1545,
		tempHigh: 3145,
		stateHigh: "yvesite_gas",
		tempLow: 1545,
		stateLow: "yvesite",
		conduct: 0.22,
	};

	elements.yvesite_gas = {
		color: ["#e34070", "#d13060", "#c2234a", "#db4866"],
		fireColor: ["#b5103f", "#ab3254", "#cc2157", "#ba0936"],
		behavior: behaviors.GAS,
		state: "gas",
		tempLow: 3145,
		stateLow: "molten_yvesite",
		density: 8.16,
		temp: 3300,
		hardness: 1,
		conduct: 0.11,
	};

	elements.fly.reactions.rotten_apple = { "elem2":null, chance:0.15, func:behaviors.FEEDPIXEL };
	
	//Vivite

	elements.vivite = {
		color: ["#ffb5ee", "#fc9fe0", "#fcd9fb"],
		colorOn: ["#ff8ca9", "#f76583", "#fcb8d5"],
		fireColor: ["#ff66ba", "#ff85ef", "#ff99f7"],
		behavior: behaviors.WALL,
		onCharge: function(pixel) {
			if(isNaN(pixel.charge)) { pixel.charge = 0 };
			if(isNaN(pixel.temp)) { pixel.temp = 20 };
			if(!pixel) { return false };
			doElectricity(pixel);
			for(i = 0; i < adjacentCoords.length; i++) {
				var newPixel = pixelMap[pixel.x+adjacentCoords[i][0]]?.[pixel.y+adjacentCoords[i][1]];
				if(newPixel) {
					newPixel.charge ??= 0;
					if(isNaN(newPixel.charge)) { newPixel.charge = 0 };
					try {
						newPixel.charge ??= 0;
						if(isNaN(newPixel.charge)) { newPixel.charge = 0 };
						doElectricity(newPixel)
						if(isNaN(newPixel.charge)) { newPixel.charge = 0 };
					} catch (error) {
						if(error.toString().includes("Maximum call stack size exceeded")) {
							return;
						};
						throw error;
					};
				} else {
					continue;
				};
			};
		},
		tick: function(pixel) {
			if(isNaN(pixel.charge)) { pixel.charge = 0 };
			if(isNaN(pixel.temp)) { pixel.temp = 20 };
			if(Math.random() < 0.013 && exposedToAir(pixel)) {
				changePixel(pixel,"vivite_oxide",false);
				pixel.temp += 0.1;
			};			
		},
		noResistance: true,
		reactions: {
			"ice": { elem1: "vivite_oxide", elem2: null, temp1: 0.2 },
			"water": { elem1: "vivite_oxide", elem2: null, temp1: 0.2 },
			"steam": { elem1: "vivite_oxide", elem2: null, temp1: 0.2 },
			"seltzer": { elem1: "vivite_oxide", elem2: "carbon_dioxide" },
			"seltzer_ice": { elem1: "vivite_oxide", elem2: "carbon_dioxide" },
			"sugar_water": { elem1: "vivite_oxide", elem2: "sugar" },
			"sugar_ice": { elem1: "vivite_oxide", elem2: "sugar" },
			"pool_water": { elem1: "vivite_oxide", elem2: "chlorine" },
			"pool_ice": { elem1: "vivite_oxide", elem2: "chlorine" },
			"salt_water": { elem1: "vivite_oxide", elem2: "salt" },
			"salt_ice": { elem1: "vivite_oxide", elem2: "salt" },
		},
		tempHigh: 938,
		category: "solids",
		state: "solid",
		density: 11013,
		hardness: 0.98,
		breakInto: "vivite_powder",
		conduct: 1,
	};

	elements.vivite_powder = {
		color: ["#f7a6e5", "#fa70d1", "#f0bbf2"],
		fireColor: ["#ff66ba", "#ff85ef", "#ff99f7"],
		behavior: behaviors.POWDER,
		tick: function(pixel) {
			if(Math.random() < 0.027 && exposedToAir(pixel)) {
				changePixel(pixel,"vivite_oxide_powder",false);
				pixel.temp += 0.1;
			};
		},
		reactions: {
			"ice": { elem1: "vivite_oxide_powder", elem2: null, temp1: 0.2 },
			"water": { elem1: "vivite_oxide_powder", elem2: null, temp1: 0.2 },
			"steam": { elem1: "vivite_oxide_powder", elem2: null, temp1: 0.2 },
			"seltzer": { elem1: "vivite_oxide_powder", elem2: "carbon_dioxide" },
			"seltzer_ice": { elem1: "vivite_oxide_powder", elem2: "carbon_dioxide" },
			"sugar_water": { elem1: "vivite_oxide_powder", elem2: "sugar" },
			"sugar_ice": { elem1: "vivite_oxide_powder", elem2: "sugar" },
			"pool_water": { elem1: "vivite_oxide_powder", elem2: "chlorine" },
			"pool_ice": { elem1: "vivite_oxide_powder", elem2: "chlorine" },
			"salt_water": { elem1: "vivite_oxide_powder", elem2: "salt" },
			"salt_ice": { elem1: "vivite_oxide_powder", elem2: "salt" },
		},
		noResistance: true,
		tempHigh: 938,
		stateHigh: "molten_vivite",
		category: "solids",
		state: "solid",
		density: 8471,
		hardness: 0.99613,
		breakInto: "vivite_powder",
		conduct: 0.89,
	};
	
	elements.smog.stateLow = ["water","dirty_water"];
	
	var wateroids = Object.keys(elements).filter(
		function(name) {
			return (
				elements[name].stateHigh == "water" || 
				elements[name].stateLow == "water" ||
				elements[name].stateHigh == "heavy_water" || 
				elements[name].stateLow == "heavy_water"
			)
		}
	);
	
	/*Object.keys(elements).filter(
		function(elem) {
			return (
				!wateroids.includes(elem) && (
					wateroids.includes(elements[elem].stateHigh) ||
					wateroids.includes(elements[elem].stateLow)
				)
			)
		}
	);*/
	
	for(var i = 0; i < wateroids.length; i++) {
		if(elements[wateroids[i]]) { elements[wateroids[i]].noViviteSlag = true };
	};
	
	function doViviteSlag(pixel,target) {
		if(!target) { //No pixel
			return false;
		};
		
		var newElement = target.element;
		if(newElement.includes("vivite")) { //Is vivite
			return false;
		};

		if(elements[pixel.element].reactions?.[newElement]) { //Pre-existing reaction
			return false;
		};
		
		if(elements[newElement].noViviteSlag) { //Excluded
			return false;
		};

		if(elements[newElement].state == "gas" && !elements[newElement].viviteSlag) {
			return false;
		};

		changePixel(newPixel,"vivite_slag",false);
		if(Math.random() < 1/3) { changePixel(pixel,"molten_vivite_slag",false) };
		return true;
	};
	
	elements.molten_vivite = {
		color: ["#f7a6e5", "#fa70d1", "#f0bbf2"],
		colorOn: ["#ff63ac", "#ff21bd", "#e81af0"],
		fireColor: ["#ff66ba", "#ff85ef", "#ff99f7"],
		tick: function(pixel) {
			var info = elements[pixel.element];
			
			if(Math.random() < 0.022 && exposedToAir(pixel)) {
				changePixel(pixel,pixel.temp > 7315.27 ? "molten_vivite_oxide" : "vivite_oxide_powder",false)
				pixel.temp += 0.1;
			};			

			if(Math.random() < 0.025) {
				var fireColor = info.fireColor;
				while(fireColor instanceof Array) { fireColor = fireColor[Math.floor(Math.random() * fireColor.length)] };
				var newFire = tryCreatePixelReturn("fire",pixel.x,pixel.y-1);
				if(newFire) {
					newFire.color = pixelColorPick(newFire,fireColor);
					newFire.temp = pixel.temp;
				};
			};
			
			var viscosityMoveChance = ((Math.random()*100) < 100 / ((info.viscosity ?? 1) ** 0.25)); //returns true if doing m2

			var move1Spots = viscosityMoveChance ? [[-1,1],[0,1],[1,1]] : [[0,1]];

			var move1Offset = move1Spots[Math.floor(Math.random() * move1Spots.length)];
			
			if(!tryMove(pixel, pixel.x + move1Offset[0], pixel.y + move1Offset[1])) {
				var newPixel = pixelMap[pixel.x + move1Offset[0]]?.[pixel.y + move1Offset[1]];
				if(newPixel) {
					doViviteSlag(pixel,newPixel);
				};
				var move2Spots = [[-1,0],[1,0]];

				var move2Offset = move2Spots[Math.floor(Math.random() * move2Spots.length)];

				//console.log(info.viscosity);

				var viscosityMoveChance = ((Math.random()*100) < 100 / ((info.viscosity ?? 1) ** 0.25)); //returns true if doing m2

				if(viscosityMoveChance) {
					if(!tryMove(pixel, pixel.x + move2Offset[0], pixel.y + move2Offset[1])) {
						var newPixel = pixelMap[pixel.x + move2Offset[0]]?.[pixel.y + move2Offset[1]];
						if(newPixel) {
							doViviteSlag(pixel,newPixel);
						};
					};
				};
			};
		},
		density: 8212,
		state: "liquid",
		hardness: 0.88,
		viscosity: 10000,
		breakInto: "vivite_gas",
		temp: 1100,
		tempHigh: 2256,
		stateHigh: "vivite_gas",
		tempLow: 938,
		stateLow: "vivite",
		conduct: 1,
		stain: 0.03,
		behavior: behaviors.WALL, //placeholder to prevent an auto-behaviors.MOLTEN process
	};

	elements.vivite_slag = {
		color: ["#d962b1", "#bf67b6", "#b57b9e"],
		fireColor: ["#fa5584", "#e85a70", "#e05c69", "#ed8672"],
		behavior: [
			"XX|XX|XX",
			"XX|XX|XX",
			"M2%25|M1|M2%25"
		],
		density: 9777,
		category: "solids",
		state: "solid",
		hardness: 0.71,
		breakInto: ["vivite_powder","slag"],
		tempHigh: 953,
		conduct: 0.27,
	};

	elements.vivite_oxide = {
		color: ["#f5b3c5", "#ffb0c6"],
		fireColor: ["#ff1f69", "#ff0004", "#ff006a"],
		reactions: {
			"carbon_monoxide": { elem1: "vivite", elem2: "carbon_dioxide", tempMin: 543, chance: 0.03 },
		},
		behavior: behaviors.WALL,
		reactions: {
			"ice": { elem1: "vivite_hydroxide", elem2: null, temp1: 234, tempMax: 733},
			"water": { elem1: "vivite_hydroxide", elem2: null, temp1: 234, tempMax: 733},
			"steam": { elem1: "vivite_hydroxide", elem2: null, temp1: 234, tempMax: 733},
			"seltzer": { elem1: "vivite_hydroxide", elem2: "carbon_dioxide", temp1: 234, tempMax: 733},
			"seltzer_ice": { elem1: "vivite_hydroxide", elem2: "carbon_dioxide", temp1: 234, tempMax: 733},
			"sugar_water": { elem1: "vivite_hydroxide", elem2: "sugar", temp1: 234, tempMax: 733},
			"sugar_ice": { elem1: "vivite_hydroxide", elem2: "sugar", temp1: 234, tempMax: 733},
			"pool_water": { elem1: "vivite_hydroxide", elem2: "chlorine", temp1: 234, tempMax: 733},
			"pool_ice": { elem1: "vivite_hydroxide", elem2: "chlorine", temp1: 234, tempMax: 733},
			"salt_water": { elem1: "vivite_hydroxide", elem2: "salt", temp1: 234, tempMax: 733},
			"salt_ice": { elem1: "vivite_hydroxide", elem2: "salt", temp1: 234, tempMax: 733},
		},
		density: 5135,
		category: "solids",
		state: "solid",
		hardness: 0.9983,
		breakInto: "vivite_oxide_powder",
		tempHigh: 7315.27,
	};

	elements.vivite_oxide_powder = {
		color: ["#f5b3c5", "#ffb0c6"],
		fireColor: ["#ff1f69", "#ff0004", "#ff006a"],
		behavior: behaviors.POWDER,
		reactions: {
			"carbon_monoxide": { elem1: "vivite_powder", elem2: "carbon_dioxide", tempMin: 543, chance: 0.03 },
		},
		reactions: {
			"ice": { elem1: "vivite_hydroxide", elem2: null, temp1: 234, tempMax: 733},
			"water": { elem1: "vivite_hydroxide", elem2: null, temp1: 234, tempMax: 733},
			"steam": { elem1: "vivite_hydroxide", elem2: null, temp1: 234, tempMax: 733},
			"seltzer": { elem1: "vivite_hydroxide", elem2: "carbon_dioxide", temp1: 234, tempMax: 733},
			"seltzer_ice": { elem1: "vivite_hydroxide", elem2: "carbon_dioxide", temp1: 234, tempMax: 733},
			"sugar_water": { elem1: "vivite_hydroxide", elem2: "sugar", temp1: 234, tempMax: 733},
			"sugar_ice": { elem1: "vivite_hydroxide", elem2: "sugar", temp1: 234, tempMax: 733},
			"pool_water": { elem1: "vivite_hydroxide", elem2: "chlorine", temp1: 234, tempMax: 733},
			"pool_ice": { elem1: "vivite_hydroxide", elem2: "chlorine", temp1: 234, tempMax: 733},
			"salt_water": { elem1: "vivite_hydroxide", elem2: "salt", temp1: 234, tempMax: 733},
			"salt_ice": { elem1: "vivite_hydroxide", elem2: "salt", temp1: 234, tempMax: 733},
		},
		density: 4813,
		category: "solids",
		state: "solid",
		hardness: 0.964,
		breakInto: "vivite_oxide_powder",
		tempHigh: 7315.27,
		stateHigh: "molten_vivite_oxide",
	};

	elements.vivite_hydroxide = {
		color: ["#f19cf7", "#d88aff"],
		behavior: behaviors.POWDER,
		density: 6112,
		category: "solids",
		state: "solid",
		hardness: 0.9983,
		breakInto: "vivite_hydroxide",
		tempHigh: 733,
		stateHigh: ["vivite_oxide_powder","water"],
	};

	elements.molten_vivite_oxide = {
		fireColor: ["#ff1f69", "#ff0004", "#ff006a"],
		reactions: {
			"carbon_monoxide": { elem1: "vivite_gas", elem2: "carbon_dioxide", tempMin: 543, chance: 0.03 },
		},
		density: 6113,
		hardness: 0.9993,
		breakInto: "molten_vivite_oxide",
		temp: 8000,
		tempHigh: 15500,
	};
	
	elements.vivite_oxide_gas = {
		reactions: {
			"carbon_monoxide": { elem1: "vivite", elem2: "carbon_dioxide", tempMin: 543, chance: 0.03 },
		},
	};

	elements.molten_vivite_slag = {
		color: ["#d44e88", "#db7258", "#eda455"],
		fireColor: ["#fa5584", "#e85a70", "#e05c69", "#ed8672"],
		density: 9213,
		hardness: 0.71,
		breakInto: ["molten_vivite","slag"],
		temp: 1100,
		conduct: 0.18,
		stain: 0.04
	};

	elements.vivite_gas = {
		color: ["#ffedfe", "#ffe0fd", "#ffd9f9", "#ffd1f0", "#ffccdf"],
		colorOn: ["#eec7fc", "#f5b1fc", "#faa2f1", "#fa93c3", "#ff99b1"],
		fireColor: ["#ff66ba", "#ff85ef", "#ff99f7"],
		tick: function(pixel) {
			if(Math.random() < 0.032 && exposedToAir(pixel)) {
				changePixel(pixel,pixel.temp > 15500 ? "vivite_oxide_gas" : pixel.temp > 7315.27 ? "molten_vivite_oxide" : "vivite_oxide_powder",false);
			};
		},
		behavior: behaviors.GAS,
		state: "gas",
		tempLow: 2256,
		stateLow: "molten_vivite",
		density: 18.02,
		temp: 3300,
		hardness: 1,
		conduct: 1,
	};
	
	runAfterLoad(function() {
		if(elements.carbon_monoxide) {
			elements.carbon_monoxide.reactions ??= {};
			elements.carbon_monoxide.reactions.vivite_oxide = { elem1: "carbon_dioxide", elem2: "vivite", tempMin: 543, chance: 0.03 };
			elements.carbon_monoxide.reactions.vivite_oxide_powder = { elem1: "carbon_dioxide", elem2: "vivite_powder", tempMin: 543, chance: 0.03 };
			elements.carbon_monoxide.reactions.molten_vivite_oxide = { elem1: "carbon_dioxide", elem2: "vivite_gas", tempMin: 543, chance: 0.03 };
			elements.carbon_monoxide.reactions.vivite_oxide_gas = { elem1: "carbon_dioxide", elem2: "vivite_gas", tempMin: 543, chance: 0.03 };
		}
	});
	
	runAfterLoad(function() {
		for(key in elements.water.reactions) {
			var value = JSON.parse(JSON.stringify(elements.water.reactions[key]));
			if(typeof(value.chance) === "number") {
				value.chance = Math.min(1,value.chance * 2);
			};
			if(value.elem2 === null && value.elem1 !== null) { 
				value.elem2 = value.elem1;
			};
			delete value.elem1;
			
			var movableJinsoulitoids = ["jinsoulite_powder","molten_jinsoulite","jinsoulite_gas"];
			for(j = 0; j < movableJinsoulitoids.length; j++) {
				var jinsoulitoid = movableJinsoulitoids[j];
				if(typeof(elements[jinsoulitoid].reactions) === "undefined") {
					elements[jinsoulitoid].reactions = {};
				};
				if(typeof(elements[jinsoulitoid].reactions[key]) === "undefined") {
					elements[jinsoulitoid].reactions[key] = value;
				};
			};
		};
	});
} else {
	if(!enabledMods.includes(loonaMod))				{ enabledMods.splice(enabledMods.indexOf(modName),0,loonaMod) };
	if(!enabledMods.includes(fireMod))				{ enabledMods.splice(enabledMods.indexOf(modName),0,fireMod) };
	if(!enabledMods.includes(runAfterAutogenMod))	{ enabledMods.splice(enabledMods.indexOf(modName),0,runAfterAutogenMod) };
	if(!enabledMods.includes(explodeAtPlusMod))		{ enabledMods.splice(enabledMods.indexOf(modName),0,explodeAtPlusMod) };
	if(!enabledMods.includes(doElectricityMod))		{ enabledMods.splice(enabledMods.indexOf(modName),0,doElectricityMod) };
	if(!enabledMods.includes(libraryMod))			{ enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod) };
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert(`The "${runAfterAutogenMod}", "${loonaMod}", "${fireMod}", "${libraryMod}", ${doElectricityMod}, and "${explodeAtPlusMod}" mods are all required; any missing mods in this list have been automatically inserted (reload for this to take effect).`)
};
