// function whenAvailable(names, callback) {
//     var interval = 10; // ms
//     window.setTimeout(function() {
// 		let bool = true;
// 		for(let i = 0; i < names.length; i++)
// 		{
// 			if(!window[names[i]])
// 			{
// 				bool = false;
// 			}
// 		}
//         if (bool) {
//             callback();
//         } else {
//             whenAvailable(names, callback);
//         }
//     }, interval);
// }

var modName = "mods/metals.js";
// var changeTempMod = "mods/changeTempReactionParameter.js";
// var runAfterAutogenMod = "mods/runAfterAutogen2.js";
var libraryMod = "mods/code_library.js";
dependOn("code_library.js", function(){
	elements.iron.hardness = 0.74
	//https://www.engineeringtoolbox.com/bhn-brinell-hardness-number-d_1365.html
	//https://en.wikipedia.org/wiki/Hardnesses_of_the_elements_(data_page)
	//"Annealed chissel steel" hardness and then divided by iron hardness (Brinell)
	//sqrt()ed like IACS-derived conductivities and scaled to the 0.8 hardness of steel
	//and because 1 means infinite hardness, the others are derived using
	//1-(0.26/(otherThingBHN/200))
	//it doesn't matter much anyway but I'd like to have some semblance/veneer of accuracy
	//Then I nerfed and buffed some of them with inconsistent rounding.

	elements.chromium = {
		color: ["#c8cccb", "#dce3e0", "#ebedeb"],
		behavior: behaviors.WALL,
		reactions: {
			
		},
		tempHigh: 1907,
		category: "solids",
		density: 7190,
		conduct: 0.35,
		hardness: 0.985,
		state: "solid",
	};

	nichromeDoNeighborCount = true;

	function nichromeNeighborLogic(count) {
		if(count < 3) { return 2.5 };
		return count == 3 ? 1.25 : 0;
	};

	elements.nichrome = {
		color: ["#d1cfcb", "#dbd7ce", "#e8e2d5"],
		behavior: behaviors.WALL,
		tempHigh: 1400,
		category: "solids",
		density: 8300,
		conduct: 0.75,
		hardness: 0.7, //???
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
				pixel.temp += ((1.1 + nichromeNeighborLogic(neighbors)) * pixel.charge);
			};
		},
	};

	elements.molten_chromium = {
		density: 6300,
		temp: 2000,
		reactions: { //(test.hello ??= {}).world
			molten_nichrome: { elem1: "molten_nichrome", elem2: "molten_chromium", chance: 0.4, changeTemp: false, oneway: true },
		},
	};

	elements.molten_nichrome = {
		reactions: { //(test.hello ??= {}).world
			molten_nickel: { elem1: "molten_nickel", elem2: "molten_nichrome", chance: 0.4, changeTemp: false, oneway: true },
			molten_haseulite: { elem2: "molten_hanichrite", elem1: ["molten_nichrome","molten_nichrome","molten_nichrome","molten_nichrome","molten_nichrome","molten_nichrome","molten_nichrome","molten_nichrome","molten_nichrome","molten_hanichrite"], changeTemp: false },
		},
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
				pixel.temp += ((1.1 + nichromeNeighborLogic(neighbors)) * pixel.charge) * 1.1;
			};
		},
	};

	worldgentypes.test = {
		layers: [[0.3, "pointer"], [0, "molten_nickel"]],
		temperature: 2000
	};

	runAfterAutogen(function() {
		if(!elements.molten_nickel.reactions) {
			elements.molten_nickel.reactions = {};
		};

		elements.molten_nickel.reactions.molten_chromium = { elem1: "molten_nichrome", elem2: ["molten_chromium","molten_chromium","molten_chromium","molten_chromium","molten_nichrome"], changeTemp: false };
		});

	//Copper exists

	elements.ruthenium = {
		color: ["#e8ebca","#eaebd5"], //color pulled from my ass because I don't want another gray metal
		behavior: behaviors.WALL,
		tempHigh: 2334,
		category: "solids",
		state: "solid",
		density: 12450,
		conduct: 0.45,
		hardness: 0.97,
	},

	elements.molten_ruthenium = {
		density: 10650,
	},

	elements.rhodium = {
		color: ["#f0e4df","#f7eae4"], //it looked slightly reddish on Wikipedia
		behavior: behaviors.WALL,
		tempHigh: 1964,
		category: "solids",
		state: "solid",
		density: 12410,
		conduct: 0.59,
		hardness: 0.95,
	},

	elements.molten_rhodium = {
		density: 10700,
	},

	elements.palladium = {
		color: ["#fff8ed","#f5e6ce","#faeccf"], //Terraria reference
		behavior: behaviors.WALL,
		tempHigh: 1555,
		category: "solids",
		state: "solid",
		density: 12023,
		conduct: 0.38,
		hardness: 0.83,
	},

	elements.molten_palladium = {
		density: 10380,
	},

	//Silver exists

	elements.rhenium = {
		color: ["#e5f0d1","#e6edda"], //it looks like almost every other metal but in some pictures the lighting makes it look ever-so-slightly greenish
		behavior: behaviors.WALL,
		tempHigh: 3186,
		category: "solids",
		state: "solid",
		density: 21020,
		conduct: 0.29,
		hardness: 0.96,
	},

	elements.molten_rhenium = {
		density: 18900,
	},

	elements.osmium = {
		color: ["#d8e1eb","#cee1f0"], //it looks bluish
		behavior: behaviors.WALL,
		tempHigh: 3033,
		category: "solids",
		state: "solid",
		density: 22590,
		conduct: 0.40,
		hardness: 0.98,
	},

	elements.molten_osmium = {
		density: 2e4,
	},

	elements.iridium = {
		color: ["#dfb9f0","#d6a9eb","#dfd1ed","#eeeeee"], //Minecraft and Stardew Valley reference
		behavior: behaviors.WALL,
		tempHigh: 2446,
		category: "solids",
		state: "solid",
		density: 22560,
		conduct: 0.54,
		hardness: 0.97,
	},

	elements.molten_iridium = {
		density: 19000,
	},

	elements.platinum = {
		color: ["#dddddd","#d7d7d7"],
		behavior: behaviors.WALL,
		tempHigh: 1768,
		category: "solids",
		state: "solid",
		density: 21450,
		conduct: 0.38,
		hardness: 0.83226,
	},

	elements.molten_platinum = {
		density: 19770,
	},

	//Gold exists

	elements.mercury = {
		color: ["#d1d1d1", "#bababa"],
		behavior: behaviors.LIQUID,
		tempHigh: 357,
		stateHigh: "mercury_gas",
		tempLow: -39,
		stateLow: "frozen_mercury",
		state: "solid",
		category: "liquids",
		density: 13534,
		conduct: 0.13,
		breakInto: "mercury_gas",
	},

	elements.frozen_mercury = {
		color: ["#d1d1d1", "#bababa"],
		density: 14184,
		behavior: behaviors.WALL,
		conduct: 0.13,
		tempHigh: -39,
		temp: -50,
		stateHigh: "mercury",
		category: "solids",
		state: "solid",
		state: "solid",
		hidden: true,
		hardness: 0.2775, //(desperately scaled Mohs hardness)
	},

	elements.mercury_gas = { //hg d@bp extrapolated from density change with temperature: 12743
		density: 8.477,
		color: ["#d1d1d1", "#bababa"],
		colorOn: ["#96ffbf", "#9cffc2", "#9effe7"],
		conduct: 0.13,
		behavior: behaviors.GAS,
		tempLow: 357,
		temp: 400,
		stateLow: "mercury",
		category: "gases",
		state: "gas",
		hidden: true,
	}

	var mooreNeighborhood = [[-1,-1],[0,-1],[1,1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];
	
	var bismuthCrystalColorArray = [
		"#f58887",
		"#fcd19a",
		"#fcf588",
		"#aef29d",
		"#9af5e4",
		"#b3bef5",
		"#dbb9f0",
		"#f2acdb"
	]
	
	var bismuthCrystalElements = ["bismuth","molten_bismuth"];
	
	quadriCoords = [[-1,1],[0,1],[1,1],[1,0]];
	
	//i'm not replacing pixelTick for this shit
	/*function mooreDoHeat(pixel) {
		// Check right and bottom adjacent pixels
		for (var i = 0; i < quadriCoords.length; i++) {
			var x = pixel.x+quadriCoords[i][0];
			var y = pixel.y+quadriCoords[i][1];
			if (!isEmpty(x,y,true)) {
				var newPixel = pixelMap[x][y];
				// Skip if both temperatures are the same
				if (pixel.temp == newPixel.temp || elements[newPixel.element].insulate == true) {
					continue;
				}
				// Set both pixel temperatures to their average
				var avg = (pixel.temp + newPixel.temp)/2;
				pixel.temp = avg;
				newPixel.temp = avg;
				pixelTempCheck(pixel);
				pixelTempCheck(newPixel);
			};
		};
	};*/
	
	function bismuthCrystallization(pixel) {
		if(pixel.temp < elements.bismuth.tempHigh) { //initial crystal on cool
			//pixel.color = "rgb(255,0,0)";
				//initialize CCC
			pixel.crystalColorCounter ??= Math.floor(Math.random() * 8); //initialize CCC
			//pixel.crystalColorCounter ??= 0; 
			if(pixel.element !== "bismuth") {
				pixel.temp -= 0.05; //incentivize cooling
				pixel.element = "bismuth"
				//console.log(`pixel (${pixel.x},${pixel.y}) frozen by bismuthCrystallization`)
				pixel.color = pixelColorPick(pixel,bismuthCrystalColorArray[pixel.crystalColorCounter % 8]);
			}; //solidify
		};
		
		if(pixel.crystalColorCounter !== undefined) {
			for(i = 0; i < mooreNeighborhood.length; i++) {
				var newX = pixel.x + mooreNeighborhood[i][0];
				var newY = pixel.y + mooreNeighborhood[i][1];
				
				if(isEmpty(newX,newY,true)) {
					continue;
				} else {
					var newPixel = pixelMap[newX][newY];
					if(bismuthCrystalElements.includes(newPixel.element)) {
						if(newPixel.temp < elements.bismuth.tempHigh) {
							newPixel.temp -= 0.05;
							newPixel.element = "bismuth";
							newPixel.crystalColorCounter = (pixel.crystalColorCounter + 1) % 8;
							newPixel.color = pixelColorPick(pixel,bismuthCrystalColorArray[pixel.crystalColorCounter % 8]);
						};
					};
				};
			};
		};
		
		//mooreDoHeat(pixel);
	};

	elements.molten_bismuth = {
		color: "#d1c6b0", //not really hot enough to be red
		behavior: behaviors.LIQUID,
		tempLow: -Infinity, //suppress normal freezing mechanism
		stateLow: "molten_bismuth",
		tick: function(pixel) {
			bismuthCrystallization(pixel);
		},
		density: 10050,
		state: "liquid",
		category: "liquids",
		temp: 300,
		tempHigh: 1560,
		fireColor: "#4275db",
	};

	runAfterAutogen(function() {
		delete elements.molten_bismuth.tempLow;
		delete elements.molten_bismuth.stateLow;
	});

	elements.bismuth = {
		color: "#d1c6b0",
		behavior: behaviors.WALL,
		/*reactions: {
			
		},*/
		tempHigh: 271.5,
		category: "solids",
		density: 9780,
		conduct: 0.12,
		hardness: 0.22,
		state: "solid",
		fireColor: "#4275db",
	};

	elements.bismuth_gas = {
		density: 9, //made-up number
		fireColor: "#4275db",
	};
	
	zirconoids = ["zirconium","molten_zirconium","zirconium_gas"];

	function zirconiumMoveContainedNeutron(pixelFrom,pixelTo) {
		if(!pixelFrom || !pixelTo) {
			return false
		};
		pixelFrom.neutrons ??= 0;
		if(pixelFrom.neutrons < 1) {
			return false;
		};
		pixelTo.neutrons ??= 0;
		pixelFrom.neutrons--;
		pixelTo.neutrons++;
	};

	function neutronAbsorbency(pixel,otherPixel) {
		if(isNaN(pixel.neutrons)) {
			pixel.neutrons = 0;
		};
		pixel.neutrons ??= 0; //probably redundant with the above
		if(!otherPixel) {
			return null;
		};
		if(otherPixel.element === "neutron") {
			/*var otherIndex = currentPixels.indexOf(otherPixel);
			if(otherIndex !== -1) { currentPixels.splice(otherIndex,1) };
			pixelMap[otherPixel.x][otherPixel.y] = undefined;*/
			deletePixel(otherPixel.x,otherPixel.y);
			pixel.neutrons++;
			return true;
		} else {
			return false;
		};
	};

	function neutronMovement(pixel,whitelist=null) {
		if(!pixel.oldColor) {
			pixel.oldColor = pixel.color;
		};
		if(isNaN(pixel.neutrons)) {
			pixel.neutrons = 0;
		};
		pixel.neutrons ??= 0; //probably redundant with the above

		if(pixel.oldColor === null) { pixel.oldColor = pixel.color };

		var color = convertColorFormats(pixel.oldColor,"json");
		//color.g += (pixel.neutrons * 4);
		//color.b += (pixel.neutrons * 6);
		color.g += (pixel.neutrons * 32);
		color.b += (pixel.neutrons * 48);
		color = convertColorFormats(color,"rgb");
		pixel.color = color;

		for(i = 0; i < pixel.neutrons; i++) {
			if(pixel.neutrons < 1) { break };
			var vx = Math.floor(Math.random() * 3) - 1;
			var vy = Math.floor(Math.random() * 3) - 1;
			if (vx===0 && vy===0) {
				if (Math.random() < 0.5)	{ vx = Math.random() < 0.5 ? 1 : -1; }
				else						{ vy = Math.random() < 0.5 ? 1 : -1; }
			};

			var newPos = {x: pixel.x+vx, y: pixel.y+vy};
						
			if(outOfBounds(newPos.x,newPos.y)) {
				continue;
			};

			if(isEmpty(newPos.x,newPos.y,false)) {
				createPixelReturn("neutron",newPos.x,newPos.y).temp = pixel.temp;
				pixel.neutrons--;
				if(pixel.neutrons < 1) { break };
			} else if(!isEmpty(newPos.x,newPos.y,true)) {
				var newPixel = pixelMap[newPos.x][newPos.y];
				if(whitelist == null || whitelist.includes(newPixel.element)) {
					zirconiumMoveContainedNeutron(pixel,newPixel);
					if(pixel.neutrons < 1) { break };
				};
			};
		};
	};

	elements.zirconium = {
		color: ["#ccc59b", "#dbd3a4"],
		behavior: behaviors.WALL,
		properties: {
			oldColor: null,
		},
		onMoveInto: function(pixel,otherPixel) {
			neutronAbsorbency(pixel,otherPixel);
		},
		tick: function(pixel) {
			neutronMovement(pixel,zirconoids);
		},
		tempHigh: 1855,
		category: "solids",
		density: 6520,
		conduct: 0.19,
		hardness: 0.5,
	},

	elements.molten_zirconium = {
		density: 5803,
		tempHigh: 4409,
		behavior: behaviors.MOLTEN,
		onMoveInto: function(pixel,otherPixel) {
			neutronAbsorbency(pixel,otherPixel);
		},
		tick: function(pixel) {
			neutronMovement(pixel,zirconoids);
		},
	};


	elements.zirconium_gas = {
		density: 3, //Unknown/Unmeasured value
		behavior: behaviors.GAS,
		onMoveInto: function(pixel,otherPixel) {
			neutronAbsorbency(pixel,otherPixel);
		},
		tick: function(pixel) {
			neutronMovement(pixel,zirconoids);
		},
	};

	elements.neutron.state = "gas";
	elements.neutron.ignoreAir = "true";

	neighbors = [[-1,0],[0,-1],[1,0],[0,1]]

	function randomChoice(array) {
		return array[Math.floor(Math.random() * array.length)];
	}

	function tryTarnish(pixel,element,chance) {
		if(exposedToAir(pixel)) {
			if(Array.isArray(element)) {
				if(Math.random() < chance) {
					changePixel(pixel,randomChoice(element))
				}
			} else {
				if(Math.random() < chance) {
					changePixel(pixel,element)
				}
			}
		}
	}

	//Non-element: Liquid ammonia
	elements.liquid_ammonia = {
		color: "#bab6a9",
		behavior: behaviors.LIQUID,
		reactions: {
			"methane": { "elem1":null, "elem2":"cyanide", "chance":0.25 },
			"plant": { "elem1":"plant", "chance":0.05 },
			"wheat_seed": { "elem1":"wheat", "chance":0.05 },
			"grass": { "elem1":"grass", "chance":0.05 },
			"grass_seed": { "elem1":"grass", "chance":0.05 },
			"bamboo_plant": { "elem1":"bamboo", "chance":0.05 },
			"flower_seed": { "elem1":"flower_seed", "chance":0.05 },
			"petal": { "elem1":"flower_seed", "chance":0.05 },
			"vine": { "elem1":"vine", "chance":0.05 },
			"sapling": { "elem1":"tree_branch", "chance":0.05 },
			"tree_branch": { "elem1":"tree_branch", "chance":0.05 },
			"corn_seed": { "elem1":"corn", "chance":0.05 },
			"root": { "elem1":"root", "chance":0.05 },
			"dirt": { "elem1":"grass", "chance":0.05 },
			"mud": { "elem1":"grass", "chance":0.05 },
			"potato_seed": { "elem1":"potato", "chance":0.05 },
			"yeast": { "elem1":"yeast", "chance":0.05 },
			"fish": { "elem2":"meat" },
			"frog": { "elem2":"meat" },
		},
		tempHigh: -78,
		stateHigh: "ammonia",
		category: "liquids",
		state: "liquid",
		hidden: true,
		density: 681.9,
	}

	elements.ammonia.tempLow = -78
	elements.ammonia.stateLow = "liquid_ammonia"

	//Hydrogen
	//Hydrogen exists, but its solid form doesn't.
	elements.liquid_hydrogen.tempLow = -259.16
	elements.liquid_hydrogen.stateLow = "hydrogen_ice"

	elements.hydrogen_ice = {
		color: "#E6E6FF",
		behavior: behaviors.WALL,
		density: 76,
		category: "solids",
		state: "solid",
		hidden: true,
		tempHigh: -259,
		stateHigh: "liquid_hydrogen",
	}

	//Lithium (incomplete/hiatus)
	elements.lithium = {
		color: "#b0ab9d",
		behavior: behaviors.WALL,
		tick: function(pixel) {
			tryTarnish(pixel,"lithium_oxide",0.007) 
			if(pixel.temp >= 179) {
				pixel.burning = true; 
				pixel.burnStart = pixelTicks; 
			}
		},
		reactions: {
			"steam": { "elem1": "hydrogen", "elem2": "lithium_hydroxide" }, 
			"water": { "elem1": "hydrogen", "elem2": "lithium_hydroxide" }, 
			"nitrogen": { "elem1": "lithium_nitride", "elem2": "lithium_nitride" }, 
			"liquid_nitrogen": { "elem1": "lithium_nitride", "elem2": "lithium_nitride" }, 
			"liquid_hydrogen": { "elem1": "lithium_hydride", "elem2": "lithium_hydride" }, 
			"ammonia": { "elem1": ["hydrogen",null], "elem2": "lithium_amide" }, 
			"liquid_ammonia": { "elem1": ["hydrogen",null], "elem2": "lithium_amide" }, 
		},
		density: 534,
		category: "solids",
		state: "solid",
		conduct: 0.42697,
		hardness: 0.019,
		tempHigh: 180,
		burn: 20,
		burnTime: 130,
		burnInto: "lithium_oxide",
		fireColor: "#fc0a22",
	}

	elements.molten_lithium = { //too damn reactive
		color: "#b0ab9d",
		behavior: [
		"XX|HT:1%1|XX",
		"M2 AND HT:0.1%1|HT:1%1|M2 AND HT:1%1",
		"M1|M1 AND HT:1%1|M1"
		],
		tick: function(pixel) {
			tryTarnish(pixel,"lithium_oxide",0.014) 
		},
		reactions: {
			"steam": { "elem1": "hydrogen", "elem2": "lithium_hydroxide" }, 
			"water": { "elem1": "hydrogen", "elem2": "lithium_hydroxide" }, 
			"nitrogen": { "elem1": "lithium_nitride", "elem2": "lithium_nitride" }, 
			"liquid_nitrogen": { "elem1": "lithium_nitride", "elem2": "lithium_nitride" }, 
			"hydrogen": { "elem1": "lithium_hydride", "elem2": "lithium_hydride" }, 
			"liquid_hydrogen": { "elem1": "lithium_hydride", "elem2": "lithium_hydride" }, 
			"ammonia": { "elem1": ["hydrogen",null], "elem2": "lithium_amide" }, 
			"liquid_ammonia": { "elem1": ["hydrogen",null], "elem2": "lithium_amide" }, 
		},
		burning: true,
		burnInto: "lithium_oxide",
		fireColor: "#fc0a22",
		density: 512,
	}

	elements.lithium_oxide = {
		color: "#eee9ec", //HRT UV-to-visible strategy again
		behavior: behaviors.POWDER,
		reactions: {
			"steam": { "elem1": "lithium_hydroxide", "elem2": "lithium_hydroxide", chance: 0.03 }, 
			"water": { "elem1": "lithium_hydroxide", "elem2": "lithium_hydroxide", chance: 0.03 }, 
			"carbon_dioxide": { "elem1": null, "elem2": "lithium_carbonate" },
		},
		density: 2013,
		category: "powders",
		state: "solid",
		hidden: true,
		tempHigh: 1438,
	}

	elements.lithium_hydroxide = {
		color: "#eeeeee",
		behavior: behaviors.POWDER,
		reactions: {
			"steam": { "elem1": null, "elem2": "lithium_hydroxide_monohydrate" },
			"water": { "elem1": null, "elem2": "lithium_hydroxide_monohydrate" },
			"carbon_dioxide": { "elem1": "water", "elem2": [null,"lithium_carbonate"], chance: 0.5 }, 
		},
		density: 1460,
		category: "powders",
		state: "solid",
		hidden: true,
		tempHigh: 462,
	}

	elements.lithium_hydroxide_monohydrate = {
		color: "#e0e4e7",
		behavior: behaviors.POWDER,
		reactions: {
			"carbon_dioxide": { "elem1": "water", "elem2": [null,"lithium_carbonate"], chance: 0.5 }, 
		},
		tick: function(pixel) {
			emptyNeighborArray = [] 
			for(i=0;i<4;i++) {
				if(isEmpty(pixel.x+neighbors[i][0],pixel.y+neighbors[i][1],true)) {
					emptyNeighborArray.push(neighbors[i])
				}
			}
			if(pixel.temp >= 100) {
				if(emptyNeighborArray.length > 0) {
					var placement = randomChoice(emptyNeighborArray)
					if(isEmpty(pixel.x+placement[0],pixel.y+placement[1])) {
						createPixel("steam",pixel.x+placement[0],pixel.y+placement[1])
						changePixel(pixel,"lithium_hydroxide")
					}
				}
			}
		},
		density: 1510,
		category: "powders",
		state: "solid",
		hidden: true,
	}

	elements.lithium_carbonate = { //todo
		color: "#eeeeee",
		behavior: behaviors.POWDER,
		density: 2110,
		category: "powders",
		state: "solid",
		hidden: true,
		tempHigh: 723,
	}

	elements.lithium_nitride = {
		color: "#eeeeee",
		behavior: behaviors.POWDER,
		reactions: {
			"steam": { "elem1": "lithium_hydroxide", "elem2": "ammonia" }, 
			"water": { "elem1": "lithium_hydroxide", "elem2": "ammonia" }, 
			"hydrogen": { "elem1": "lithium_hydride", "elem2": "lithium_amide" }, 
			"liquid_hydrogen": { "elem1": "lithium_hydride", "elem2": "lithium_amide" }, 
		},
		density: 1270,
		category: "powders",
		state: "solid",
		hidden: true,
		tempHigh: 813,
	}

	elements.lithium_hydride = {
		color: "#eeeeee",
		behavior: behaviors.POWDER,
		reactions: { //the acid part of lye
			"ammonia": { "elem1": "hydrogen", "elem2": "lithium_amide" },
			"liquid_ammonia": { "elem1": "hydrogen", "elem2": "lithium_amide" },
		},
		density: 780,
		category: "powders",
		state: "solid",
		hidden: true,
		tempHigh: 689,
	}

	elements.lithium_amide = {
		color: "#eeeeee",
		behavior: behaviors.POWDER,
		reactions: {
			"steam": { "elem1": "lithium_hydroxide", "elem2": "ammonia" },
			"water": { "elem1": "lithium_hydroxide", "elem2": "ammonia" },
		},
		density: 1178,
		category: "powders",
		state: "solid",
		hidden: true,
		tempHigh: 375,
	}

	//Sodium exists

	//...

	//at request of Serioustar#1337

	elements.niobium = {
		color: ["#dedede","#edead8","#e8e9ed"],
		behavior: behaviors.WALL,
		tempHigh: 2477,
		category: "solids",
		density: 8570,
		conduct: 0.35,
		hardness: 0.7, //idk lol
	};
},true)