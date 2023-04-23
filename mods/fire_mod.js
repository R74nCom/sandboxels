var modName = "mods/fire_mod.js";
var libraryMod = "mods/code_library.js";

if(enabledMods.includes(libraryMod)) {
	/*	elements.iron.reactions.radiation =
		{elem1: 'dirty_water', elem2: null}
		when radiation touches iron,
		the iron turns into dirty_water (elem1)
		and the radiation deletes itself (elem2)

		elements.AAA.reactions.BBB:
		{elem1: CCC, elem2: DDD}
		when BBB touches AAA,
		the AAA becomes CCC
		and the BBB becomes DDD
	*/

	//	imaginary reaction elements.iron.reactions.test

	//Variable
	fireSpawnBlacklist = ["fire","cold_fire","rad_fire"];

	//doBurning
	function doBurning(pixel) {
		if (pixel.burning) { // Burning
			pixel.burnStart ??= pixelTicks;
			var info = elements[pixel.element];
			var burnTempChange = info.burnTempChange ?? 1;
			var fireIsCold;
			var fire = info.fireElement === undefined ? "fire" : info.fireElement; //allow null but disallow undefined
			//console.log(info.fireElement,fire);
			while(fire instanceof Array) {
				fire = fire[Math.floor(Math.random()*fire.length)];
			};
			var fireTemp = info.fireSpawnTemp ?? pixel.temp;
			var fireChance = info.fireSpawnChance ?? 10;
			var fireIsCold = (fire === "cold_fire");
			//var fireInfo = fire === null ? null : elements[fire];

			pixel.temp += burnTempChange;
			pixelTempCheck(pixel);
			
			for (var i = 0; i < adjacentCoords.length; i++) { // Burn adjacent pixels
				var x = pixel.x+adjacentCoords[i][0];
				var y = pixel.y+adjacentCoords[i][1];
				if (!isEmpty(x,y,true)) {
					var newPixel = pixelMap[x][y];
					var newInfo = elements[newPixel.element];
					var newFireIsCold;
					var newFire = newInfo.fireElement == undefined ? "fire" : newInfo.fireElement;
					while(newFire instanceof Array) {
						newFire = newFire[Math.floor(Math.random()*newFire.length)];
					};
					newFireIsCold = (newFire === "cold_fire");
					//console.log(`burning pixel ${pixel.element}: ${fire} (${fireIsCold}) / burned element ${newPixel.element}: ${newFire} (${newFireIsCold})`);
					if((!fireIsCold && !newFireIsCold) || (fireIsCold && newFireIsCold)) {
						if (elements[newPixel.element].burn && !newPixel.burning) {
							if (Math.floor(Math.random()*100) < elements[newPixel.element].burn) {
								newPixel.burning = true;
								newPixel.burnStart = pixelTicks;
							}
						}
					}
				}
			}

			if ((pixelTicks - pixel.burnStart > (info.burnTime || 200)) && Math.floor(Math.random()*100)<(info.burn || 10)) {
				var burnInto = info.burnInto ?? "fire";
				while(burnInto instanceof Array) {
					burnInto = burnInto[Math.floor(Math.random()*burnInto.length)];
				};
				changePixel(pixel,burnInto,burnInto !== "smoke");
				//console.log("ass");
				pixel.temp = fireTemp;
				if (info.fireColor != undefined && burnInto == "fire") {
					pixel.color = pixelColorPick(pixel,info.fireColor);
				}
				else {
					pixel.color = pixelColorPick(pixel)
				}
			}
			else if (Math.floor(Math.random()*100)<fireChance && !fireSpawnBlacklist.includes(pixel.element)) { // Spawn fire
				//console.log(fire);
				if (isEmpty(pixel.x,pixel.y-1)) {
					if(fire !== null) {
						createPixel(fire,pixel.x,pixel.y-1);
						pixelMap[pixel.x][pixel.y-1].temp = fireTemp;
						if (info.fireColor != undefined) {
							pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1],info.fireColor);
						};
					};
				}
				// same for below if top is blocked
				else if (isEmpty(pixel.x,pixel.y+1)) {
					if(fire !== null) {
						createPixel(fire,pixel.x,pixel.y+1);
						pixelMap[pixel.x][pixel.y+1].temp = fireTemp;
						if (info.fireColor != undefined) {
							pixelMap[pixel.x][pixel.y+1].color = pixelColorPick(pixelMap[pixel.x][pixel.y+1],info.fireColor);
						};
					};
				}
			}
		}
	}

	//New elements

	elements.cold_fire.burning = true;
	elements.cold_fire.burnTempChange = -1;
	elements.cold_fire.burnTime = 25;
	elements.cold_fire.burnInto = "cold_smoke";
	elements.cold_fire.fireElement = "cold_fire";
	elements.cold_fire.behavior = [
		"M1|M1|M1",
		"M2|XX|M2",
		"XX|M2|XX"
	],

	elements.cold_smoke = {
		color: "#282848",
		behavior: behaviors.DGAS,
		reactions: {
			"steam": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,12], "setting":"clouds" },
			"rain_cloud": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,12], "setting":"clouds" },
			"cloud": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,12], "setting":"clouds" },
			"snow_cloud": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,12], "setting":"clouds" },
			"hail_cloud": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,12], "setting":"clouds" },
			"acid_cloud": { "elem1": "pyrocumulus", "chance":0.05, "y":[0,12], "setting":"clouds" },
			"fire_cloud": { "elem1": "pyrocumulus", "chance":0.05, "y":[0,12], "setting":"clouds" },
			"pyrocumulus": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,12], "setting":"clouds" },
		},
		temp: -100,
		tempHigh: 0,
		stateHigh: "smoke",
		tempLow: -114,
		stateLow: "cold_fire",
		category: "gases",
		state: "gas",
		density: 1280,
		stain: 0.075,
	};

	elements.rad_fire = { //this is BBB
		color: ["#daff21","#a6ff00","#ffff00"],
		behavior: [
			"XX|CR:radiation%0.1|XX",
			"CR:radiation%0.1|XX|CR:radiation%0.1",
			"XX|CR:radiation%0.1|XX",
		],
		tick: function(pixel) {
			if(Math.random() < 0.4) {
				pixel.temp++;
			};
			
			if(Math.random() < 0.05) { //5%/t to radify
				if(typeof(transformAdjacent) === "function" && typeof(radioactiveObject) === "object") {
					transformAdjacent(pixel,radioactiveObject);
				};
			};
			
			var move1Spots = [[-1,-1],[0,-1],[1,-1]];
			var move2Spots = [[-1,0],[0,1],[1,0]];
			
			var randomMove1 = move1Spots[Math.floor(Math.random() * move1Spots.length)];
			
			if(!tryMove(pixel, pixel.x+randomMove1[0], pixel.y+randomMove1[1])) {
				//console.log((pixel.x+randomMove1[0]) + " " + (pixel.y+randomMove1[1]))
				var newPixel = null;
				if(!outOfBounds(pixel.x+randomMove1[0],pixel.y+randomMove1[1])) {
					newPixel = pixelMap[pixel.x+randomMove1[0]][pixel.y+randomMove1[1]]; //newPixel is AAA
				};
				if(outOfBounds(pixel.x+randomMove1[0],pixel.y+randomMove1[1]) || !reactionStealer(pixel,newPixel,"radiation")) {
					var randomMove2 = move2Spots[Math.floor(Math.random() * move2Spots.length)];
					if(!tryMove(pixel, pixel.x+randomMove2[0], pixel.y+randomMove2[1])) {
						var newPixel = null;
						if(!outOfBounds(pixel.x+randomMove1[0],pixel.y+randomMove1[1])) {
							newPixel = pixelMap[pixel.x+randomMove1[0]][pixel.y+randomMove1[1]]; //newPixel is AAA
						};
						if(newPixel !== null) { reactionStealer(pixel,newPixel,"radiation") };
					};
				};
			};
			doDefaults(pixel);
		},
		reactions: { //fire + radiation reacts
			//Merged water-radiation reactions, plus altered seltzer
			"water": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
			"steam": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
			"carbon_dioxide": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
			"dirty_water": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
			"salt_water": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
			"sugar_water": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
			"seltzer": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
			//Radiation reactions added programatically
		},
		temp:800,
		tempLow:150,
		stateLow: "rad_smoke",
		//tempHigh: 7000,
		//stateHigh: "rad_plasma",
		category: "energy",
		burning: true,
		fireElement: "radiation",
		state: "gas",
		density: 0.1,
		ignoreAir: true,
	};

	elements.rad_smoke = {
		color: "#415c25",
		behavior: behaviors.DGAS,
		behavior: [
			"XX|CR:radiation%0.05|XX",
			"CR:radiation%0.05|XX|CR:radiation%0.05",
			"XX|CR:radiation%0.05|XX",
		],
		tick: function(pixel) {
			if(Math.random() < 0.05) {
				deletePixel(pixel.x,pixel.y);
				return;
			};
			
			if(Math.random() < 0.2) {
				pixel.temp++;
			};
			
			if(Math.random() < 0.04) { //4%/t to radify
				if(typeof(transformAdjacent) === "function" && typeof(radioactiveObject) === "object") {
					transformAdjacent(pixel,radioactiveObject);
				};
			};

			var move1Spots = [[0,-1],[1,0],[0,1],[-1,0]];
			var move2Spots = [[-1,-1],[1,-1],[1,1],[-1,1]];
			
			var randomMove1 = move1Spots[Math.floor(Math.random() * move1Spots.length)];
			if(!tryMove(pixel, pixel.x+randomMove1[0], pixel.y+randomMove1[1])) {
				//console.log((pixel.x+randomMove1[0]) + " " + (pixel.y+randomMove1[1]))
				var newPixel = null;
				if(!outOfBounds(pixel.x+randomMove1[0],pixel.y+randomMove1[1])) {
					newPixel = pixelMap[pixel.x+randomMove1[0]][pixel.y+randomMove1[1]]; //newPixel is AAA
				};
				if(outOfBounds(pixel.x+randomMove1[0],pixel.y+randomMove1[1]) || !reactionStealer(pixel,newPixel,"radiation")) {
					var randomMove2 = move2Spots[Math.floor(Math.random() * move2Spots.length)];
					if(!tryMove(pixel, pixel.x+randomMove2[0], pixel.y+randomMove2[1])) {
						var newPixel = null;
						if(!outOfBounds(pixel.x+randomMove1[0],pixel.y+randomMove1[1])) {
							newPixel = pixelMap[pixel.x+randomMove1[0]][pixel.y+randomMove1[1]]; //newPixel is AAA
						};
						if(newPixel !== null) { reactionStealer(pixel,newPixel,"radiation") };
					};
				};
			};
			doDefaults(pixel);
		},
		reactions: {
			//Spreading
			"liquid_fire": { "elem2":"liquid_rad_fire", "chance":0.2 },
			"fire": { "elem2":"rad_fire", "chance":0.2 },
			"smoke": { "elem2":"rad_smoke", "chance":0.2 },
			/*"steam": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,12], "setting":"clouds" },
			"rain_cloud": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,12], "setting":"clouds" },
			"cloud": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,12], "setting":"clouds" },
			"snow_cloud": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,12], "setting":"clouds" },
			"hail_cloud": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,12], "setting":"clouds" },
			"acid_cloud": { "elem1": "pyrocumulus", "chance":0.05, "y":[0,12], "setting":"clouds" },
			"fire_cloud": { "elem1": "pyrocumulus", "chance":0.05, "y":[0,12], "setting":"clouds" },
			"pyrocumulus": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,12], "setting":"clouds" },*/
			//Radiation reactions added programatically
		},
		temp: 134,
		tempHigh: 595,
		stateHigh: "rad_fire",
		category: "gases",
		state: "gas",
		density: 1340,
		stain: 0.075,
	};

	elements.cold_torch = {
		"color": "#4394d6",
		"behavior": [
			"XX|CR:cold_fire|XX",
			"XX|XX|XX",
			"XX|XX|XX"
		],
		"reactions": {
			"water": { "elem1": "wood" },
			"sugar_water": { "elem1": "wood" },
			"salt_water": { "elem1": "wood" },
			"seltzer": { "elem1": "wood" },
			"dirty_water": { "elem1": "wood" },
			"pool_water": { "elem1": "wood" },
			"steam": { "elem1": "wood" },
			"smog": { "elem1": "wood" },
			"rain_cloud": { "elem1": "wood" },
			"cloud": { "elem1": "wood" },
			"snow_cloud": { "elem1": "wood" },
			"hail_cloud": { "elem1": "wood" },
			"black_damp": { "elem1": "wood" }
		},
		"temp": -200,
		"category": "special",
		"breakInto": "sawdust",
		"tempHigh": 600,
		"stateHigh": "wood",
	};

	elements.rad_torch = {
		"color": "#85d643",
		"behavior": [
			"XX|CR:rad_fire|XX",
			"XX|XX|XX",
			"XX|XX|XX"
		],
		"reactions": {
			"water": { "elem1": "wood" },
			"sugar_water": { "elem1": "wood" },
			"salt_water": { "elem1": "wood" },
			"seltzer": { "elem1": "wood" },
			"dirty_water": { "elem1": "wood" },
			"pool_water": { "elem1": "wood" },
			"steam": { "elem1": "wood" },
			"smog": { "elem1": "wood" },
			"rain_cloud": { "elem1": "wood" },
			"cloud": { "elem1": "wood" },
			"snow_cloud": { "elem1": "wood" },
			"hail_cloud": { "elem1": "wood" },
			"black_damp": { "elem1": "wood" }
		},
		"temp": 800,
		"category": "special",
		"breakInto": "sawdust",
		"tempLow": -273,
		"stateHigh": "wood",
	};

	elements.napalm = {
		color: "#e0873e",
		behavior: [
			"XX|SA%40 AND ST|XX",
			"M2%10 AND SA%40 AND ST|XX|M2%10 AND SA%40 AND ST",
			"M2%50 AND M1%10|M1 AND SA%40 AND ST|M2%50 AND M1%10"
		],
		category: "weapons",
		state: "liquid",
		viscosity: 1000,
		density: 1200, //google was f***ing useless and i'm not searching that again, so arbitrary 1.2 it is
		burnTempChange: 3,
		burn: 300,
		burnTime: 500,
		temp: airTemp,
	},

	elements.hypernapalm = {
		name: "h y p e r n a p a l m", //HYPERNAPALM
		color: "#bd34eb",
		behavior: [
			"XX|SA%40 AND ST|XX",
			"M2%10 AND SA%40 AND ST|XX|M2%10 AND SA%40 AND ST",
			"M2%50 AND M1%10|M1 AND SA%40 AND ST|M2%50 AND M1%10"
		],
		category: "weapons",
		state: "liquid",
		viscosity: 1000,
		density: 1200,
		fireElement: "plasma",
		fireSpawnChance: 33,
		fireSpawnTemp: 7200,
		burnTempChange: 30,
		burn: 300,
		burnTime: 500,
	},

	elements.cold_napalm = {
		color: "#3e87e0",
		behavior: [
			"XX|SA%40 AND ST|XX",
			"M2%10 AND SA%40 AND ST|XX|M2%10 AND SA%40 AND ST",
			"M2%50 AND M1%10|M1 AND SA%40 AND ST|M2%50 AND M1%10"
		],
		category: "weapons",
		state: "liquid",
		viscosity: 1000,
		density: 1200,
		burn: 300,
		burnTime: 500,
		fireElement: "cold_fire",
		burnTempChange: -1,
		burnInto: "cold_fire",
	}

	elements.rad_napalm = {
		color: "#cdf760",
		behavior: [
			"XX|SA%40 AND ST AND CR:radiation%1|XX",
			"M2%10 AND SA%40 AND ST AND CR:radiation%1|HT%2.5|M2%10 AND SA%40 AND ST AND CR:radiation%1",
			"M2%50 AND M1%10|M1 AND SA%40 AND ST AND CR:radiation%1|M2%50 AND M1%10"
		],
		category: "weapons",
		state: "liquid",
		viscosity: 1000,
		density: 1300,
		burnTempChange: 2,
		burn: 300,
		burnTime: 500,
		fireElement: "rad_fire",
		temp: airTemp,
		burnInto: "rad_fire",
	},

	runAfterLoad(function() {
		if(eLists.spout) {
			eLists.spout.push("cold_torch");
			eLists.spout.push("rad_torch");
		};

		if(enabledMods.includes("mods/liquid_energy.js")) {
			elements.liquid_fire = {
				color: ["#ff6b21","#ffa600","#ff4000"],
				behavior: [
				"XX|M2|XX",
				"M2|XX|M2",
				"M1|M1|M1",
				],
				reactions: {
					"water": { "elem1": "liquid_smoke" },
				},
				temp:600,
				tempLow:100,
				stateLow: "liquid_smoke",
				tempHigh: 7000,
				stateHigh: "liquid_plasma",
				category: "energy liquids",
				burning: true,
				burnTime: Infinity,
				burnTempChange: 2,
				fireSpawnChance: 5,
				state: "liquid",
				density: 21,
			};

			elements.liquid_cold_fire = {
				color: ["#21cbff","#006aff","#00ffff"],
				behavior: [
					"XX|M2|XX",
					"M2|XX|M2",
					"M1|M1|M1",
				],
				reactions: {
					"fire": { "elem1": "liquid_smoke", "elem2": "liquid_smoke" },
					"plasma": { "elem1": "le_liquid_light", "elem2": "le_liquid_light" }, //prefixed to avoid conflict with F&M liquid_light
				},
				temp:-200,
				tempHigh:0,
				stateHigh: "liquid_smoke",
				burning: true,
				burnTempChange: -2,
				fireSpawnChance: 5,
				burnTime: Infinity,
				fireElement: "cold_fire",
				category: "energy liquids",
				state: "liquid",
				density: 42,
			};

			elements.liquid_rad_fire = {
				color: ["#daff21","#a6ff00","#ffff00"],
				behavior: [
					"XX|CR:radiation%0.1|XX",
					"CR:radiation%0.1|XX|CR:radiation%0.1",
					"XX|CR:radiation%0.1|XX",
				],
				tick: function(pixel) {
					if(Math.random() < 0.4) {
						pixel.temp++;
					};
					
					if(Math.random() < 0.06) { //6%/t to radify
						if(typeof(transformAdjacent) === "function" && typeof(radioactiveObject) === "object") {
							transformAdjacent(pixel,radioactiveObject);
						};
					};
			
					var move1Spots = [[-1,1],[0,1],[1,1]];
					var move2Spots = [[-1,0],[0,-1],[1,0]];
					
					var randomMove1 = move1Spots[Math.floor(Math.random() * move1Spots.length)];
					if(!tryMove(pixel, pixel.x+randomMove1[0], pixel.y+randomMove1[1])) {
						//console.log((pixel.x+randomMove1[0]) + " " + (pixel.y+randomMove1[1]))
						var newPixel = null;
						if(!outOfBounds(pixel.x+randomMove1[0],pixel.y+randomMove1[1])) {
							newPixel = pixelMap[pixel.x+randomMove1[0]][pixel.y+randomMove1[1]]; //newPixel is AAA
						};
						if(outOfBounds(pixel.x+randomMove1[0],pixel.y+randomMove1[1]) || !reactionStealer(pixel,newPixel,"radiation")) {
							var randomMove2 = move2Spots[Math.floor(Math.random() * move2Spots.length)];
							if(!tryMove(pixel, pixel.x+randomMove2[0], pixel.y+randomMove2[1])) {
								var newPixel = null;
								if(!outOfBounds(pixel.x+randomMove1[0],pixel.y+randomMove1[1])) {
									newPixel = pixelMap[pixel.x+randomMove1[0]][pixel.y+randomMove1[1]]; //newPixel is AAA
								};
								if(newPixel !== null) { reactionStealer(pixel,newPixel,"radiation") };
							};
						};
					};
					doDefaults(pixel);
				},
				reactions: { //fire + radiation reacts
					//Merged water-radiation reactions, plus altered seltzer
					"water": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
					"steam": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
					"carbon_dioxide": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
					"dirty_water": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
					"salt_water": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
					"sugar_water": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
					"seltzer": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
					//Radiation reactions added programatically
				},
				temp:800,
				//tempLow:100,
				//stateLow: "liquid_smoke",
				//tempHigh: 7000,
				//stateHigh: "liquid_plasma",
				category: "energy liquids",
				burning: true,
				burnTime: Infinity,
				burnTempChange: 3,
				fireSpawnChance: 5,
				fireElement: "rad_fire",
				state: "liquid",
				density: 21,
			};
		};
		
		elements.radiation.reactions.liquid_fire = { "elem2":"liquid_rad_fire", "chance":0.4 };
		elements.radiation.reactions.fire = { "elem2":"rad_fire", "chance":0.4 };
		elements.radiation.reactions.smoke = { "elem2":"rad_smoke", "chance":0.4 };
		
		runAfterLoad(function() {
			for(key in elements.radiation.reactions) {
				var value = elements.radiation.reactions[key];
				
				if(typeof(elements.rad_fire.reactions[key]) === "undefined") {
					elements.rad_fire.reactions[key] = value;
				};
			};
		});
		
		if(enabledMods.includes("mods/randomness.js")) {
			elements.unnamed_gas.burnTempChange = 10;
			elements.unnamed_gas.fireElement = "plasma";
			elements.unnamed_powder.burnTempChange = 20;
			elements.unnamed_powder.fireElement = "plasma";
			elements.burning_unnamed_gas.burnTempChange = 15;
			elements.burning_unnamed_gas.fireElement = "plasma";
			elements.burning_unnamed_powder.burnTempChange = 30;
			elements.burning_unnamed_powder.fireElement = "plasma";
		};
	});
} else {
	alert(`The ${libraryMod} mod is required and has been automatically inserted (reload for this to take effect).`)
	enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod)
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
};
