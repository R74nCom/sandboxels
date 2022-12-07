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
		var info = elements[pixel.element];
		var burnTempChange = info.burnTempChange
		if (burnTempChange == undefined) {
			burnTempChange = 1;
		};
		//move fire ahead so that cold burners don't light hot burners
		var fireIsCold;
		//Fire getter block
			var fire = info.fireElement;
			if (fire == undefined) {
				fire = 'fire';
			}
			else if(fire instanceof Array) {
				fire = fire[Math.floor(Math.random()*fire.length)];
			}
		//End fire getter block
		//Fire temp getter block
			var fireTemp = info.fireSpawnTemp;
			if (fireTemp == undefined) {
				fireTemp = pixel.temp;
			};
		//End fire temp getter block
		//Fire chance getter block
			var fireChance = info.fireSpawnChance;
			if (fireChance == undefined) {
				fireChance = 10;
			};
		//End fire chance getter block
		var fireIsCold = (fire === "cold_fire");
		var fireInfo = elements[fire];

		pixel.temp += burnTempChange;
		pixelTempCheck(pixel);
		
		for (var i = 0; i < adjacentCoords.length; i++) { // Burn adjacent pixels
			var x = pixel.x+adjacentCoords[i][0];
			var y = pixel.y+adjacentCoords[i][1];
			if (!isEmpty(x,y,true)) {
				var newPixel = pixelMap[x][y];
				var newInfo = elements[newPixel.element];
				var newFireIsCold;
				//Fire getter block
					var newFire = newInfo.fireElement;
					if (newFire == undefined) {
						newFire = 'fire';
					}
					else if(newFire instanceof Array) {
						newFire = newFire[Math.floor(Math.random()*newFire.length)];
					}
				//End fire getter block
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
			var burnInto = info.burnInto;
			if (burnInto == undefined) {
				burnInto = 'fire';
			}
			else if (burnInto instanceof Array) {
				burnInto = burnInto[Math.floor(Math.random()*burnInto.length)];
			}
			changePixel(pixel,burnInto,(burnInto !== "smoke"));
			if (info.fireColor != undefined && burnInto == "fire") {
				pixel.color = pixelColorPick(pixel,info.fireColor);
			}
			else {
				pixel.color = pixelColorPick(pixel)
			}
		}
		else if (Math.floor(Math.random()*100)<fireChance && !fireSpawnBlacklist.includes(pixel.element)) { // Spawn fire
			if (isEmpty(pixel.x,pixel.y-1)) {
				createPixel(fire,pixel.x,pixel.y-1);
				pixelMap[pixel.x][pixel.y-1].temp = fireTemp;
				if (info.fireColor != undefined) {
					pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1],info.fireColor);
				};
			}
			// same for below if top is blocked
			else if (isEmpty(pixel.x,pixel.y+1)) {
				createPixel(fire,pixel.x,pixel.y+1);
				pixelMap[pixel.x][pixel.y+1].temp = fireTemp;
				if (info.fireColor != undefined) {
					pixelMap[pixel.x][pixel.y+1].color = pixelColorPick(pixelMap[pixel.x][pixel.y+1],info.fireColor);
				};
			}
		}
	}
}

//Use other pixels' reactions as if they were meant for the calling pixel
function reactionStealer(pixel,newPixel,reactionTarget) {
	if(!elements[reactionTarget]) {
		throw new Error(`No such element ${reactionTarget}!`);
	};
	if(typeof(newPixel) === "undefined") { //timing issue?
		return false;
	};
	var newElement = newPixel.element;
	var newInfo = elements[newElement];
	if(typeof(newInfo.reactions) === "undefined") {
		return false;
	};
	if(typeof(newInfo.reactions[reactionTarget]) === "undefined") {
		return false;
	};
	var pixel2 = pixel;
	var pixel1 = newPixel;
	var r = newInfo.reactions[reactionTarget];
	
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
	if (r.chance !== undefined && Math.random() > r.chance) {
		return false;
	}
	if (r.y !== undefined && (pixel1.y < r.y[0] || pixel1.y > r.y[1])) {
		return false;
	}
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
	if (r.elem2 !== undefined) {
		// if r.elem2 is an array, set elem2 to a random element from the array, otherwise set it to r.elem2
		if (Array.isArray(r.elem2)) {
			var elem2 = r.elem2[Math.floor(Math.random() * r.elem2.length)];
		} else { var elem2 = r.elem2; }

		if (elem2 == null) {
			deletePixel(pixel2.x,pixel2.y);
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
		//Spreading
		"liquid_fire": { "elem2":"liquid_rad_fire", "chance":0.4 },
		"fire": { "elem2":"rad_fire", "chance":0.4 },
		"smoke": { "elem2":"rad_smoke", "chance":0.4 },
		//Merged water-radiation reactions, plus altered seltzer
		"water": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
		"steam": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
		"carbon_dioxide": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
		"dirty_water": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
		"salt_water": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
		"sugar_water": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
		"seltzer": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
		//Radiation reactions
		"bubble": { "elem2":"rad_steam", "chance":0.4 },
		"foam": { "elem2":"rad_steam", "chance":0.4 },
		"ice": { "elem2":"rad_steam", "chance":0.4 },
		"snow": { "elem2":"rad_steam", "chance":0.4 },
		"packed_snow": { "elem2":"rad_steam", "chance":0.4 },
		"slime": { "elem2":"rad_steam", "chance":0.4 },
		"milk": { "elem2":"cheese", "chance":0.4 },
		"permafrost": { "elem1":"rad_steam", "elem2":"dirt", "chance":0.4 },
		"mud": { "elem1":"rad_steam", "elem2":"dirt", "chance":0.4 },
		"wet_sand": { "elem1":"rad_steam", "elem2":"sand", "chance":0.4 },
		"clay": { "elem1":"rad_steam", "elem2":"clay_soil", "chance":0.4 },
		"slaked_lime": { "elem1":"rad_steam", "elem2":"limestone", "chance":0.4 },
		"rain_cloud": { "elem2":"rad_cloud", "chance":0.4 },
		"snow_cloud": { "elem2":"rad_cloud", "chance":0.4 },
		"hail_cloud": { "elem2":"rad_cloud", "chance":0.4 },
		"plant": { "elem2":"dead_plant", "chance":0.4 },
		"frozen_plant": { "elem2":"dead_plant", "chance":0.4 },
		"grass": { "elem2":["dead_plant","straw","grass_seed","wheat_seed"], "chance":0.4 },
		"algae": { "elem2":["mushroom_spore","lichen","yeast"], "chance":0.4 },
		"mushroom_spore": { "elem2":["lichen","yeast"], "chance":0.4 },
		"mushroom_cap": { "elem2":["lichen","plant"], "chance":0.4 },
		"mushroom_stalk": { "elem2":["lichen","yeast"], "chance":0.4 },
		"mushroom_gill": { "elem2":["lichen","yeast"], "chance":0.4 },
		"flea": { "elem2":["ash","ant","termite"], "chance":0.4 },
		"ant": { "elem2":["ash","flea","termite"], "chance":0.4 },
		"termite": { "elem2":["ash","flea","ant"], "chance":0.4 },
		"fly": { "elem2":["ash","firefly","bee"], "chance":0.4 },
		"bee": { "elem2":["ash","firefly","fly"], "chance":0.4 },
		"firefly": { "elem2":["ash","bee","fly"], "chance":0.4 },
		"frog": { "elem2":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
		"tadpole": { "elem2":["frog","worm",null], "chance":0.4 },
		"fish": { "elem2":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
		"rat": { "elem2":["ash","meat","rotten_meat","cooked_meat","plague"], "chance":0.4 },
		"bird": { "elem2":["ash","meat","rotten_meat","cooked_meat","plague"], "chance":0.4 },
		"bone": { "elem2":["calcium","calcium","calcium","cancer"], "chance":0.4 },
		"meat": { "elem2":["ash","rotten_meat","cooked_meat"], "chance":0.4 },
		"rotten_meat": { "elem2":["ash","meat","cooked_meat"], "chance":0.4 },
		"cooked_meat": { "elem2":["ash","rotten_meat"], "chance":0.4 },
		"bamboo": { "elem2":["wood","plant","bamboo_plant"], "chance":0.4 },
		"bamboo_plant": { "elem2":["wood","plant","bamboo"], "chance":0.4 },
		"sapling": { "elem2":["wood","plant","tree_branch"], "chance":0.4 },
		"tree_branch": { "elem2":["wood","plant","sapling"], "chance":0.4 },
		"grass_seed": { "elem2":["straw","wheat_seed"], "chance":0.4 },
		"lichen": { "elem2":"algae", "chance":0.4 },
		"yeast": { "elem2":["algae","mushroom_spore","lichen"], "chance":0.4 },
		"wheat_seed": { "elem2":["straw","wheat","grass_seed"], "chance":0.4 },
		"flower_seed": { "elem2":["straw","grass","pistil","petal"], "chance":0.4 },
		"pistil": { "elem2":["straw","grass","flower_seed","petal"], "chance":0.4 },
		"petal": { "elem2":["straw","grass","flower_seed","pistil"], "chance":0.4 },
		"vine": { "elem1":["vine"], "chance":0.4 },
		"worm": { "elem2":"ash", "chance":0.4 },
		"corn": { "elem2":"popcorn", "chance":0.4 },
		"corn_seed": { "elem2":"corn", "chance":0.4 },
		"potato": { "elem2":"potato_seed", "chance":0.4 },
		"potato_seed": { "elem2":"potato", "chance":0.4 },
		"slug": { "elem2":"slime", "chance":0.4 },
		"snail": { "elem2":"slime", "chance":0.4 },
		"cell": { "elem2":"cancer", "chance":0.4 },
		"blood": { "elem2":["infection","cancer"], "chance":0.4 },
		"antibody": { "elem2":"cancer", "chance":0.4 },
		"infection": { "elem2":"cancer", "chance":0.4 },
		"cancer": { "elem2":null, "chance":0.1 },
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
		//Radiation reactions
		"bubble": { "elem2":"rad_steam", "chance":0.4 },
		"foam": { "elem2":"rad_steam", "chance":0.4 },
		"ice": { "elem2":"rad_steam", "chance":0.4 },
		"snow": { "elem2":"rad_steam", "chance":0.4 },
		"packed_snow": { "elem2":"rad_steam", "chance":0.4 },
		"slime": { "elem2":"rad_steam", "chance":0.4 },
		"milk": { "elem2":"cheese", "chance":0.4 },
		"permafrost": { "elem1":"rad_steam", "elem2":"dirt", "chance":0.4 },
		"mud": { "elem1":"rad_steam", "elem2":"dirt", "chance":0.4 },
		"wet_sand": { "elem1":"rad_steam", "elem2":"sand", "chance":0.4 },
		"clay": { "elem1":"rad_steam", "elem2":"clay_soil", "chance":0.4 },
		"slaked_lime": { "elem1":"rad_steam", "elem2":"limestone", "chance":0.4 },
		"rain_cloud": { "elem2":"rad_cloud", "chance":0.4 },
		"snow_cloud": { "elem2":"rad_cloud", "chance":0.4 },
		"hail_cloud": { "elem2":"rad_cloud", "chance":0.4 },
		"plant": { "elem2":"dead_plant", "chance":0.4 },
		"frozen_plant": { "elem2":"dead_plant", "chance":0.4 },
		"grass": { "elem2":["dead_plant","straw","grass_seed","wheat_seed"], "chance":0.4 },
		"algae": { "elem2":["mushroom_spore","lichen","yeast"], "chance":0.4 },
		"mushroom_spore": { "elem2":["lichen","yeast"], "chance":0.4 },
		"mushroom_cap": { "elem2":["lichen","plant"], "chance":0.4 },
		"mushroom_stalk": { "elem2":["lichen","yeast"], "chance":0.4 },
		"mushroom_gill": { "elem2":["lichen","yeast"], "chance":0.4 },
		"flea": { "elem2":["ash","ant","termite"], "chance":0.4 },
		"ant": { "elem2":["ash","flea","termite"], "chance":0.4 },
		"termite": { "elem2":["ash","flea","ant"], "chance":0.4 },
		"fly": { "elem2":["ash","firefly","bee"], "chance":0.4 },
		"bee": { "elem2":["ash","firefly","fly"], "chance":0.4 },
		"firefly": { "elem2":["ash","bee","fly"], "chance":0.4 },
		"frog": { "elem2":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
		"tadpole": { "elem2":["frog","worm",null], "chance":0.4 },
		"fish": { "elem2":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
		"rat": { "elem2":["ash","meat","rotten_meat","cooked_meat","plague"], "chance":0.4 },
		"bird": { "elem2":["ash","meat","rotten_meat","cooked_meat","plague"], "chance":0.4 },
		"bone": { "elem2":["calcium","calcium","calcium","cancer"], "chance":0.4 },
		"meat": { "elem2":["ash","rotten_meat","cooked_meat"], "chance":0.4 },
		"rotten_meat": { "elem2":["ash","meat","cooked_meat"], "chance":0.4 },
		"cooked_meat": { "elem2":["ash","rotten_meat"], "chance":0.4 },
		"bamboo": { "elem2":["wood","plant","bamboo_plant"], "chance":0.4 },
		"bamboo_plant": { "elem2":["wood","plant","bamboo"], "chance":0.4 },
		"sapling": { "elem2":["wood","plant","tree_branch"], "chance":0.4 },
		"tree_branch": { "elem2":["wood","plant","sapling"], "chance":0.4 },
		"grass_seed": { "elem2":["straw","wheat_seed"], "chance":0.4 },
		"lichen": { "elem2":"algae", "chance":0.4 },
		"yeast": { "elem2":["algae","mushroom_spore","lichen"], "chance":0.4 },
		"wheat_seed": { "elem2":["straw","wheat","grass_seed"], "chance":0.4 },
		"flower_seed": { "elem2":["straw","grass","pistil","petal"], "chance":0.4 },
		"pistil": { "elem2":["straw","grass","flower_seed","petal"], "chance":0.4 },
		"petal": { "elem2":["straw","grass","flower_seed","pistil"], "chance":0.4 },
		"vine": { "elem1":["vine"], "chance":0.4 },
		"worm": { "elem2":"ash", "chance":0.4 },
		"corn": { "elem2":"popcorn", "chance":0.4 },
		"corn_seed": { "elem2":"corn", "chance":0.4 },
		"potato": { "elem2":"potato_seed", "chance":0.4 },
		"potato_seed": { "elem2":"potato", "chance":0.4 },
		"slug": { "elem2":"slime", "chance":0.4 },
		"snail": { "elem2":"slime", "chance":0.4 },
		"cell": { "elem2":"cancer", "chance":0.4 },
		"blood": { "elem2":["infection","cancer"], "chance":0.4 },
		"antibody": { "elem2":"cancer", "chance":0.4 },
		"infection": { "elem2":"cancer", "chance":0.4 },
		"cancer": { "elem2":null, "chance":0.1 },
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
	burnTempChange: 2,
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
				//Spreading
				"liquid_fire": { "elem2":"liquid_rad_fire", "chance":0.6 },
				"fire": { "elem2":"rad_fire", "chance":0.6 },
				"smoke": { "elem2":"rad_smoke", "chance":0.6 },
				//Merged water-radiation reactions, plus altered seltzer
				"water": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
				"steam": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
				"carbon_dioxide": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
				"dirty_water": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
				"salt_water": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
				"sugar_water": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
				"seltzer": { "elem1": "rad_smoke", "elem2":"rad_steam", "chance":0.4 },
				//Radiation reactions
				"bubble": { "elem2":"rad_steam", "chance":0.4 },
				"foam": { "elem2":"rad_steam", "chance":0.4 },
				"ice": { "elem2":"rad_steam", "chance":0.4 },
				"snow": { "elem2":"rad_steam", "chance":0.4 },
				"packed_snow": { "elem2":"rad_steam", "chance":0.4 },
				"slime": { "elem2":"rad_steam", "chance":0.4 },
				"milk": { "elem2":"cheese", "chance":0.4 },
				"permafrost": { "elem1":"rad_steam", "elem2":"dirt", "chance":0.4 },
				"mud": { "elem1":"rad_steam", "elem2":"dirt", "chance":0.4 },
				"wet_sand": { "elem1":"rad_steam", "elem2":"sand", "chance":0.4 },
				"clay": { "elem1":"rad_steam", "elem2":"clay_soil", "chance":0.4 },
				"slaked_lime": { "elem1":"rad_steam", "elem2":"limestone", "chance":0.4 },
				"rain_cloud": { "elem2":"rad_cloud", "chance":0.4 },
				"snow_cloud": { "elem2":"rad_cloud", "chance":0.4 },
				"hail_cloud": { "elem2":"rad_cloud", "chance":0.4 },
				"plant": { "elem2":"dead_plant", "chance":0.4 },
				"frozen_plant": { "elem2":"dead_plant", "chance":0.4 },
				"grass": { "elem2":["dead_plant","straw","grass_seed","wheat_seed"], "chance":0.4 },
				"algae": { "elem2":["mushroom_spore","lichen","yeast"], "chance":0.4 },
				"mushroom_spore": { "elem2":["lichen","yeast"], "chance":0.4 },
				"mushroom_cap": { "elem2":["lichen","plant"], "chance":0.4 },
				"mushroom_stalk": { "elem2":["lichen","yeast"], "chance":0.4 },
				"mushroom_gill": { "elem2":["lichen","yeast"], "chance":0.4 },
				"flea": { "elem2":["ash","ant","termite"], "chance":0.4 },
				"ant": { "elem2":["ash","flea","termite"], "chance":0.4 },
				"termite": { "elem2":["ash","flea","ant"], "chance":0.4 },
				"fly": { "elem2":["ash","firefly","bee"], "chance":0.4 },
				"bee": { "elem2":["ash","firefly","fly"], "chance":0.4 },
				"firefly": { "elem2":["ash","bee","fly"], "chance":0.4 },
				"frog": { "elem2":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
				"tadpole": { "elem2":["frog","worm",null], "chance":0.4 },
				"fish": { "elem2":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
				"rat": { "elem2":["ash","meat","rotten_meat","cooked_meat","plague"], "chance":0.4 },
				"bird": { "elem2":["ash","meat","rotten_meat","cooked_meat","plague"], "chance":0.4 },
				"bone": { "elem2":["calcium","calcium","calcium","cancer"], "chance":0.4 },
				"meat": { "elem2":["ash","rotten_meat","cooked_meat"], "chance":0.4 },
				"rotten_meat": { "elem2":["ash","meat","cooked_meat"], "chance":0.4 },
				"cooked_meat": { "elem2":["ash","rotten_meat"], "chance":0.4 },
				"bamboo": { "elem2":["wood","plant","bamboo_plant"], "chance":0.4 },
				"bamboo_plant": { "elem2":["wood","plant","bamboo"], "chance":0.4 },
				"sapling": { "elem2":["wood","plant","tree_branch"], "chance":0.4 },
				"tree_branch": { "elem2":["wood","plant","sapling"], "chance":0.4 },
				"grass_seed": { "elem2":["straw","wheat_seed"], "chance":0.4 },
				"lichen": { "elem2":"algae", "chance":0.4 },
				"yeast": { "elem2":["algae","mushroom_spore","lichen"], "chance":0.4 },
				"wheat_seed": { "elem2":["straw","wheat","grass_seed"], "chance":0.4 },
				"flower_seed": { "elem2":["straw","grass","pistil","petal"], "chance":0.4 },
				"pistil": { "elem2":["straw","grass","flower_seed","petal"], "chance":0.4 },
				"petal": { "elem2":["straw","grass","flower_seed","pistil"], "chance":0.4 },
				"vine": { "elem1":["vine"], "chance":0.4 },
				"worm": { "elem2":"ash", "chance":0.4 },
				"corn": { "elem2":"popcorn", "chance":0.4 },
				"corn_seed": { "elem2":"corn", "chance":0.4 },
				"potato": { "elem2":"potato_seed", "chance":0.4 },
				"potato_seed": { "elem2":"potato", "chance":0.4 },
				"slug": { "elem2":"slime", "chance":0.4 },
				"snail": { "elem2":"slime", "chance":0.4 },
				"cell": { "elem2":"cancer", "chance":0.4 },
				"blood": { "elem2":["infection","cancer"], "chance":0.4 },
				"antibody": { "elem2":"cancer", "chance":0.4 },
				"infection": { "elem2":"cancer", "chance":0.4 },
				"cancer": { "elem2":null, "chance":0.1 },
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
