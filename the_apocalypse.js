elements.zombie = {
	// color: ["#746021"],
	color: ["#8b803d","#b8b165","#b89765"],
	category: "apocalypse",
	properties: {
		dead: false,
		dir: 1,
		panic: 0
	},
	onPlace: function(pixel) {
		if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element === "rotten_head") {
			deletePixel(pixel.x, pixel.y-1);
		}
		else if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element === "rotten_body") {
			deletePixel(pixel.x, pixel.y+1);
		}

		if (isEmpty(pixel.x, pixel.y+1)) {
			createPixel("rotten_body", pixel.x, pixel.y+1);
			var color = pixel.color;
			changePixel(pixel,"rotten_head");
			pixel.color = color;
		}
		else if (isEmpty(pixel.x, pixel.y-1)) {
			createPixel("rotten_head", pixel.x, pixel.y-1);
			pixelMap[pixel.x][pixel.y-1].color = pixel.color;
			changePixel(pixel,"rotten_body");
		}
		else {
			deletePixel(pixel.x, pixel.y);
		}
	},
	reactions: {
		"fire": { attr1:{panic:5} },
		"plasma": { attr1:{panic:5} },
		"cold_fire": { attr1:{panic:5} },
		"electric": { attr1:{panic:5} },
		"blood": { attr1:{panic:-1} },
		"infection":{ attr1:{panic:-2} },
		"cancer": { attr1:{panic:3} },
		"plague": { attr1:{panic:0} },
		"radiation": { attr1:{panic:5} },
		"tnt": { attr1:{panic:5} },
		"dynamite": { attr1:{panic:5} },
		"c4": { attr1:{panic:5} },
		"grenade": { attr1:{panic:5} },
		"gunpowder": { attr1:{panic:5} },
		"acid": { attr1:{panic:5} },
		"acid_gas": { attr1:{panic:5} },
		"stench": { attr1:{panic:1} }
	},
	related: ["rotten_body","rotten_head"],
	cooldown: defaultCooldown,
	forceSaveColor: true
},
elements.rotten_body = {
	color: ["#8b803d","#b8b165","#b89765"],
	behavior: [
		"XX|CR:plague,stench,fly%0.25 AND CH:meat>rotten_meat|XX",
		"SP%99 AND CH:meat>rotten_meat%1|XX|SP%99 AND CH:meat>rotten_meat%1",
		"XX|XX|XX"
	],
	category: "apocalypse",
	hidden: true,
	density: 1500,
	state: "solid",
	conduct: .05,
	temp: 37,
	tempHigh: 300,
	stateHigh: "plague",
	tempLow: -30,
	stateLow: "frozen_meat",
	burn: 12,
	burnTime: 300,
	burnInto: "plague",
	breakInto: ["infection","infectious_plague","bone"],
	forceSaveColor: true,
	pickElement: "zombie",
	reactions: {
		"cancer": { elem1:"cancer", chance:0.005 },
		"radiation": { elem1:["ash","bone","plague","ammonia"], chance:0.4 },
		"neutron": { elem1:["ash","bone","plague","ammonia"], chance:0.01 },
		"fallout": { elem1:["ash","plague","bone","ammonia"], chance:0.01 },
		"egg": { elem2:"yolk", chance:0.5, oneway:true },
		"grape": { elem2:"juice", chance:0.5, color2:"#291824", oneway:true },
		"ant": { elem2:"dead_bug", chance:0.05, oneway:true },
		"spider": { elem2:"dead_bug", oneway:true },
		"fly": { elem2:"dead_bug", oneway:true },
		"firefly": { elem2:"dead_bug", oneway:true },
		"bee": { elem2:"dead_bug", oneway:true },
		"flea": { elem2:"dead_bug", oneway:true },
		"termite": { elem2:"dead_bug", oneway:true },
		"worm": { elem2:"slime", chance:0.05, oneway:true },
		"stink_bug": { elem2:"stench", oneway:true },
		"grass": { elem2:"dead_plant", chance:0.05 },
		"sun": { elem1:"plague" },
		"alcohol": { chance:0.2, attr1:{"panic":0} },
		"anesthesia": { attr1:{"panic":0} },
		"alcohol_gas": { chance:0.2, attr1:{"panic":0} },
		"rat": { elem2:["infection","dead_rat"] },
		"water": { elem2:"dirty_water", chance:0.2 },
		"sugar_water": { elem2:"dirty_water", chance:0.2 },
		"salt_water": { elem2:"dirty_water", chance:0.2},
		"cheese": { elem2:"rotten_cheese", chance:0.2 },
		"body": { attr2:{panic:20} }
	},
	properties: {
		dead: false,
		dir: 1,
		panic: 0
	},
	tick: function(pixel) {
		if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
			if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
				var headpixel = pixelMap[pixel.x][pixel.y-2];
				if (headpixel.element === "rotten_head") {
					if (isEmpty(pixel.x, pixel.y-1)) {
						movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
					}
					else {
						swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
					}
				}
			}
		}
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
				changePixel(pixel,"infectious_plague");
			}
			return
		}

		// Find the head
		if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "rotten_head") {
			var head = pixelMap[pixel.x][pixel.y-1];
			if (head.dead) { // If head is dead, kill body
				pixel.dead = head.dead;
			}
			else if (head.panic > 0) {
				pixel.panic = head.panic;
				delete head.panic;
			}
		}
		else { var head = null }
		if (head && Math.random() < 0.25) {
			let y = Math.random() < 0.5 ? 0 : -1;
			for (let x = 1; x < 10; x++) {
				let x2 = pixel.x+(x*pixel.dir);
				let y2 = pixel.y+y;
				if (!isEmpty(x2,y2,true)) {
					let seenPixel = pixelMap[x2][y2];
					if (elements.human.reactions[seenPixel.element] && elements.human.reactions[seenPixel.element].attr1 && elements.human.reactions[seenPixel.element].attr1.panic) {
						pixel.panic += elements.human.reactions[seenPixel.element].attr1.panic;
						pixel.dir *= -1;
						break;
					}
					else if (seenPixel.dead || seenPixel.temp > 200) {
						pixel.panic += 0;
						pixel.dir *= -0;
						if (seenPixel.panic) delete seenPixel.panic;
						break;
					}
				}
			}
		}
		if (pixel.burning) {
			pixel.panic += 0.1;
			if (head && pixelTicks-pixel.burnStart > 240) {
				pixel.color = head.color;
			}
		}
		if (pixel.charge) {
			pixel.panic += 1;
		}
		else if (pixel.panic > 0) {
			pixel.panic -= 0.1;
			if (pixel.panic < 0) { pixel.panic = 0; }
			else if (pixel.panic > 50) { pixel.panic = 50; }
		}

		if (isEmpty(pixel.x, pixel.y-1)) {
			// create blood if decapitated 10% chance
			if (Math.random() < 0.1 && !pixel.charge) {
				createPixel("infection", pixel.x, pixel.y-1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		else if (head === null) { return }
		else if (Math.random() < 0.1*(isEmpty(pixel.x, pixel.y+1) ? 1 : pixel.panic+1)) { // Move 10% chance
			var movesToTry = [
				[1*pixel.dir,0],
				[1*pixel.dir,-1],
			];
			let moved = false;
			// While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
			while (movesToTry.length > 0) {
				var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
				if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
					var origx = pixel.x+move[0];
					var origy = pixel.y+move[1];
					if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
						movePixel(head, head.x+move[0], head.y+move[1]);
						moved = true;
						break;
					}
				}
				else if (!isEmpty(pixel.x+move[0], pixel.y+move[1], true)) {
					var hitPixel = pixelMap[pixel.x+move[0]][pixel.y+move[1]];
					if (hitPixel.element === "rotten_body" || hitPixel.element === "rotten_head" && hitPixel.panic < pixel.panic) {
						// interact with other human
						hitPixel.panic = pixel.panic;
					}
				}
			}
			// 15% chance to change direction
			if (Math.random() < 0.15 || !moved) {
				pixel.dir *= -1;
			}
			// homeostasis
			if (pixel.temp > 37) { pixel.temp -= 1; }
			else if (pixel.temp < 37) { pixel.temp += 1; }
		}

	}
},
elements.rotten_head = {
	color: ["#8b803d","#b8b165","#b89765"],
	behavior: [
		"XX|CR:plague,stench,fly%0.25 AND CH:meat>rotten_meat%1|XX",
		"SP%99 AND CH:meat>rotten_meat%1|XX|SP%99 AND CH:meat>rotten_meat%1",
		"XX|XX|XX"
	],
	category: "apocalypse",
	hidden: true,
	density: 1005,
	state: "solid",
	conduct: .05,
	temp: 37,
	tempHigh: 300,
	stateHigh: "infectious_plague",
	tempLow: -30,
	stateLow: "frozen_meat",
	burn: 12,
	burnTime: 300,
	burnInto: "plague",
	breakInto: ["infection","infectious_plague","bone"],
	forceSaveColor: true,
	pickElement: "zombie",
	reactions: {
		"cancer": { elem1:"cancer", chance:0.005 },
		"radiation": { elem1:["ash","bone","plague","ammonia"], chance:0.4 },
		"neutron": { elem1:["ash","bone","plague","ammonia"], chance:0.03 },
		"fallout": { elem1:["ash","bone","plague","ammonia"], chance:0.03 },
		"oxygen": { elem2:"carbon_dioxide", chance:0.5 },
		"sun": { elem1:"plague" },
		"light": { stain1:"#825043" },
		"bee": { stain1:"#cc564b", chance:0.2 },
		"water": { elem2:"dirty_water", attr2:{"clone":"water"}, chance:0.001 },
		"salt_water": { elem2:"dirty_water", attr2:{"clone":"salt_water"}, chance:0.001 },
		"pool_water": { elem2:"dirty_water", attr2:{"clone":"pool_water"}, chance:0.001 },
		"alcohol": { chance:0.2, attr1:{"panic":0} },
		"anesthesia": { attr1:{"panic":0} },
		"alcohol_gas": { chance:0.2, attr1:{"panic":0} },
		"head": { elem2:["meat","bone","blood"], chance:0.1 },
		"meat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
		"blood": { elem2:null, chance:0.1 },
		"dirty_water":{ elem2:"bubble", attr2:{"clone":"dirty_water"}, chance:0.001 },
		"dead_rat":{ elem2:null, chance:0.1, func:behaviors.FEEDPIXEL }
	},
	properties: {
		dead: false
	},
	tick: function(pixel) {
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
				changePixel(pixel,"infectious_plague");
				return
			}
		}

		// Find the body
		if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "rotten_body") {
			var body = pixelMap[pixel.x][pixel.y+1];
			if (body.dead) { // If body is dead, kill head
				pixel.dead = body.dead;
			}
		}
		else { var body = null }

		// check for eating food
		if (body && !pixel.dead && Math.random() < 0.1) {
			shuffleArray(interactCoordsShuffle);
			for (var i = 0; i < interactCoordsShuffle.length; i++) {
				var x = pixel.x+interactCoordsShuffle[i][0];
				var y = pixel.y+interactCoordsShuffle[i][1];
				if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].isFood && pixelMap[x][y].panic === undefined) {
					deletePixel(x,y);
					break;
				}
			}
		}

		if (tryMove(pixel, pixel.x, pixel.y+1)) {
			// create blood if severed 10% chance
			if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1 && !pixel.charge) {
				createPixel("infection", pixel.x, pixel.y+1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		// homeostasis
		if (pixel.temp > 37) { pixel.temp -= 1; }
		else if (pixel.temp < 37) { pixel.temp += 1; }
	},
	onChange: function(pixel) {
		for (var i = 0; i < adjacentCoords.length; i++) {
			var coord = adjacentCoords[i];
			var x = pixel.x+coord[0];
			var y = pixel.y+coord[1];
			if (!isEmpty(x,y,true) && pixelMap[x][y].panic !== undefined) {
				pixelMap[x][y].panic += 20;
			}
		}
	},
	onDelete: function(pixel) {
		for (var i = 0; i < adjacentCoords.length; i++) {
			var coord = adjacentCoords[i];
			var x = pixel.x+coord[0];
			var y = pixel.y+coord[1];
			if (!isEmpty(x,y,true) && pixelMap[x][y].panic !== undefined) {
				pixelMap[x][y].panic += 20;
			}
		}
	}
},
elements.necromancy = {
	color:"#e4baee",
	tool: function(pixel) {
		if (["rotten_meat", "soul"].includes(pixel.element)) {
			changePixel(pixel,"zombie");
		}
		if (["dead_rat"].includes(pixel.element)) {
			changePixel(pixel,"zombified_rat");
		}
	},
	category: "apocalypse"
}
elements.rat = {
	color: ["#a698a9","#8c7d82","#ccc3cf"],
	behavior: [
		"XX|M2%1.5|M2%5",
		"XX|FX%2 AND RL:plague%0.05|M2 AND BO",
		"XX|M1|M2"
	],
	reactions: {
		"oxygen": { elem2:"carbon_dioxide", chance:0.5 },
		"meat": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"cooked_meat": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"cured_meat": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"cheese": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
		"cheese_powder": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
		"rotten_cheese": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
		"melted_cheese": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
		"tomato": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"sauce": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
		"plant": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"vine": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"evergreen": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"algae": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
		"grass_seed": { elem2:null, chance:0.3 , func:behaviors.FEEDPIXEL},
		"wheat_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
		"wheat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
		"potato_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
		"potato": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"corn_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
		"corn": { elem2:null, chance:0.1 , func:behaviors.FEEDPIXEL},
		"lichen": { elem2:null, chance:0.04, func:behaviors.FEEDPIXEL },
		"flower_seed": { elem2:null, chance:0.4 , func:behaviors.FEEDPIXEL},
		"flour": { elem2:null, chance:0.1 , func:behaviors.FEEDPIXEL},
		"dough": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"bread": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"toast": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"gingerbread": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
		"rice": { elem2:null, chance:0.1 , func:behaviors.FEEDPIXEL},
		"yogurt": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
		"beans": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
		"salt": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"sugar": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
		"crumb": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"herb": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"salt_water": { elem2:"dirty_water", chance:0.2 },
		"sugar_water": { elem2:"dirty_water", chance:0.2 },
		"water": { elem2:"dirty_water", chance:0.2 },
		"popcorn": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
		"candy": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
		"caramel": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
		"lichen": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"egg": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"yolk": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
		"hard_yolk": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
		"eggnog": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
		"milk": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
		"grape": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
		"batter": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
		"baked_batter": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"butter": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
		"melted_butter": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
		"lettuce": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
		"baked_potato": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"ice_cream": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
		"cream": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
		"pumpkin": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"pumpkin_seed": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
		"coffee_bean": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"coffee_ground": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"nut": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"nut_meat": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"nut_butter": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"jelly": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"worm": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"ant": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"spider": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"frog": { elem2:null, chance:0.005, func:behaviors.FEEDPIXEL },
		"snail": { elem2:"limestone", chance:0.1, func:behaviors.FEEDPIXEL },
		"slug": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL }
	},
	egg: "rat",
	category: "life",
	temp: 37.6,
	tempHigh: 120,
	stateHigh: "dead_rat",
	tempLow: -18,
	stateLow: "frozen_meat",
	breakInto: ["infection","dead_rat"],
	burn:80,
	burnTime:150,
	state: "solid",
	density: 1450,
	conduct: 0.25
},
elements.dead_rat = {
	color: ["#afa587","#a28a74","#c0b88d","#c0a88d"],
	behavior: [
		"XX|CR:plague,stench,stench,stench,fly%0.25 AND CH:meat>rotten_meat%1|XX",
		"SP%99 AND CH:meat>rotten_meat%1|XX|SP%99 AND CH:meat>rotten_meat%1",
		"XX|M1 AND CH:meat>rotten_meat%1|XX"
	],
	reactions: {
	"water": { elem2:"broth", tempMin:70, color2:"#d7db69" },
	"salt_water": { elem2:"broth", tempMin:70, color2:"#d7db69" },
	"sugar_water": { elem2:"broth", tempMin:70, color2:"#d7db69" },
	"dirty_water": { elem2:"broth", tempMin:70, color2:"#d7db69" },
	"seltzer": { elem2:"broth", tempMin:70, color2: "#d7db69"}
	},
	tempHigh: 300,
	stateHigh: ["plague","ash","ammonia"],
	category:"food",
	hidden: true,
	burn:12,
	burnTime:200,
	burnInto:["plague","ash","ammonia"],
	state: "solid",
	density: 1005,
	conduct: 0.1,
	isFood: true

},

elements.zombified_rat = {
	color: ["#afa587","#a28a74","#c0b88d","#c0a88d"],
	behavior: [
		"ST:head|CR:plague,stench,stench,stench,fly%0.25 AND CH:meat>rotten_meat%1 AND M2%1.5 AND SW:head|M2%5 AND ST:head",
		"SP%99 AND CH:meat>rotten_meat%1|SW:head|SP%99 AND CH:meat>rotten_meat%1 AND M2 AND BO",
		"XX|M1 AND CH:meat>rotten_meat%1 AND SW:head|M2"
	],
	reactions: {
		"oxygen": { elem2:"carbon_dioxide", chance:0.5 },
		"rotten_meat": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"head": { elem2:"meat", chance:0.5 },
		"rotten_cheese": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"vine": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"blood": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL},
		"salt_water":{ elem2:"dirty_water", chance:0.2 },
		"sugar_water":{ elem2:"dirty_water", chance:0.2 },
		"water":{ elem2:"dirty_water", chance:0.2 },
		"wood":{ elem2:"sawdust", chance:0.2 },
		"sawdust":{ elem2:null, chance:0.2 },
		"brick":{ elem2:"brick_rubble", chance:0.5 },
		"brick_rubble":{ elem2:null, chance:0.5 }
		
	},
	temp:37.6,
	tempHigh: 300,
	stateHigh: ["infectious_plague","ash","ammonia"],
	tempLow: -18,
	stateLow: "frozen_meat",
	category: "apocalypse",
	hidden: true,
	burn:12,
	burnTime: 200,
	burnInto:["infectious_plague","ash","ammonia"],
	state: "solid",
	density: 1005,
	conduct:0.1

},
elements.infectious_plague = {
	color: "#292d32",
	behavior: [
		"M2|M1|M2",
		"M1|DL%1|M1",
		"M2|M1|M2"
	],
	reactions: {
		"rat":{ elem2:"zombified_rat", chance:0.05 },
		"frog":{ elem2:"infectious_plague", chance:0.05 },
		"ant":{ elem2:"infectious_plague", chance: 0.05 },
		"bee":{ elem2:"infectious_plague", chance: 0.05 },
		"fish":{ elem2:"infectious_plague", chance:0.05 },
		"firefly":{ elem2:"infectious_plague", chance:0.05 },
		"chlorine": { elem1:null },
		"liquid_chlorine":{ elem1:null },
		"light":{ elem1:null },
		"body":{ func:function(pixel, pixel2) {
			pixel2.element = "infected_body"
		}},
		"head":{ func:function(pixel, pixel2) {
			pixel2.element = "infected_head"
		}}

	},
	tempHigh: 300,
	stateHigh: null,
	category: "apocalypse",
	hidden: true,
	state: "gas",
	density: 600
},
elements.infected_human = {
	color: ["#dbccac","#d8c79b","#d6c498","#c8b17e","#ac915e","#9d8054","#836948","#564b37"],
	category: "apocalypse",
	hidden:true,
	properties: {
		dead: false,
		dir: 1,
		panic: 0
	},
	onPlace: function(pixel) {
		if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element === "infected_head") {
			deletePixel(pixel.x, pixel.y-1);
		}
		else if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element === "infected_body") {
			deletePixel(pixel.x, pixel.y+1);
		}

		if (isEmpty(pixel.x, pixel.y+1)) {
			createPixel("infected_body", pixel.x, pixel.y+1);
			var color = pixel.color;
			changePixel(pixel,"infected_head");
			pixel.color = color;
		}
		else if (isEmpty(pixel.x, pixel.y-1)) {
			createPixel("infected_head", pixel.x, pixel.y-1);
			pixelMap[pixel.x][pixel.y-1].color = pixel.color;
			changePixel(pixel,"infected_body");
		}
		else {
			deletePixel(pixel.x, pixel.y);
		}
	},
	reactions: {
		"fire": { attr1:{panic:5} },
		"plasma": { attr1:{panic:5} },
		"cold_fire": { attr1:{panic:5} },
		"electric": { attr1:{panic:5} },
		"blood": { attr1:{panic:1} },
		"infection": { attr1:{panic:2} },
		"cancer": { attr1:{panic:3} },
		"plague": { attr1:{panic:5} },
		"radiation": { attr1:{panic:5} },
		"tnt": { attr1:{panic:5} },
		"dynamite": { attr1:{panic:5} },
		"c4": { attr1:{panic:5} },
		"grenade": { attr1:{panic:5} },
		"gunpowder": { attr1:{panic:5} },
		"acid": { attr1:{panic:5} },
		"acid_gas": { attr1:{panic:5} },
		"stench": { attr1:{panic:2} }
	},
	related: ["infected_body","infected_head"],
	cooldown: defaultCooldown,
	forceSaveColor: true
},
elements.infected_body = {
	color: ["#069469","#047e99","#7f5fb0"],
	category: "apocalypse",
	hidden: true,
	density: 1500,
	state: "solid",
	conduct: .05,
	temp: 37,
	tempHigh: 150,
	stateHigh: "cooked_meat",
	tempLow: -30,
	stateLow: "frozen_meat",
	burn: 10,
	burnTime: 250,
	burnInto: "cooked_meat",
	breakInto: ["infection","meat","bone","infectious_plague"],
	forceSaveColor: true,
	pickElement: "infected_human",
	reactions: {
		"cancer": { elem1:"cancer", chance:0.005 },
		"radiation": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.4 },
		"neutron": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.01 },
		"fallout": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.01 },
		"plague": { elem1:"plague", chance:0.05 },
		"egg": { elem2:"yolk", chance:0.5, oneway:true },
		"grape": { elem2:"juice", chance:0.5, color2:"#291824", oneway:true },
		"ant": { elem2:"dead_bug", chance:0.05, oneway:true },
		"spider": { elem2:"dead_bug", oneway:true },
		"fly": { elem2:"dead_bug", oneway:true },
		"firefly": { elem2:"dead_bug", oneway:true },
		"bee": { elem2:"dead_bug", oneway:true },
		"flea": { elem2:"dead_bug", oneway:true },
		"termite": { elem2:"dead_bug", oneway:true },
		"worm": { elem2:"slime", chance:0.05, oneway:true },
		"stink_bug": { elem2:"stench", oneway:true },
		"grass_seed": { elem2:null, chance:0.05 },
		"gold_coin": { elem2:null, chance:0.05 },
		"diamond": { elem2:null, chance:0.05 },
		"sun": { elem1:"cooked_meat" },
		"alcohol": { chance:0.2, attr1:{"panic":0} },
		"anesthesia": { attr1:{"panic":0} },
		"alcohol_gas": { chance:0.2, attr1:{"panic":0} },
	},
	properties: {
		dead: false,
		dir: 1,
		panic: 0
	},
	tick: function(pixel) {
		if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
			if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
				var headpixel = pixelMap[pixel.x][pixel.y-2];
				if (headpixel.element === "infected_head") {
					if (isEmpty(pixel.x, pixel.y-1)) {
						movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
					}
					else {
						swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
					}
				}
			}
		}
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
				changePixel(pixel,"rotten_body");
			}
			return
		}

		// Find the head
		if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "infected_head") {
			var head = pixelMap[pixel.x][pixel.y-1];
			if (head.dead) { // If head is dead, kill body
				pixel.dead = head.dead;
			}
			else if (head.panic > 0) {
				pixel.panic = head.panic;
				delete head.panic;
			}
		}
		else { var head = null }
		if (head && Math.random() < 0.25) {
			let y = Math.random() < 0.5 ? 0 : -1;
			for (let x = 1; x < 10; x++) {
				let x2 = pixel.x+(x*pixel.dir);
				let y2 = pixel.y+y;
				if (!isEmpty(x2,y2,true)) {
					let seenPixel = pixelMap[x2][y2];
					if (elements.human.reactions[seenPixel.element] && elements.human.reactions[seenPixel.element].attr1 && elements.human.reactions[seenPixel.element].attr1.panic) {
						pixel.panic += elements.human.reactions[seenPixel.element].attr1.panic;
						pixel.dir *= -1;
						break;
					}
					else if (seenPixel.dead || seenPixel.temp > 200) {
						pixel.panic += 5;
						pixel.dir *= -1;
						if (seenPixel.panic) delete seenPixel.panic;
						break;
					}
				}
			}
		}
		if (pixel.burning) {
			pixel.panic += 0.1;
			if (head && pixelTicks-pixel.burnStart > 240) {
				pixel.color = head.color;
			}
		}
		if (pixel.charge) {
			pixel.panic += 1;
		}
		else if (pixel.panic > 0) {
			pixel.panic -= 0.1;
			if (pixel.panic < 0) { pixel.panic = 0; }
			else if (pixel.panic > 50) { pixel.panic = 50; }
		}

		if (isEmpty(pixel.x, pixel.y-1)) {
			// create blood if decapitated 10% chance
			if (Math.random() < 0.1 && !pixel.charge) {
				createPixel("infection", pixel.x, pixel.y-1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		else if (head === null) { return }
		else if (Math.random() < 0.1*(isEmpty(pixel.x, pixel.y+1) ? 1 : pixel.panic+1)) { // Move 10% chance
			var movesToTry = [
				[1*pixel.dir,0],
				[1*pixel.dir,-1],
			];
			let moved = false;
			// While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
			while (movesToTry.length > 0) {
				var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
				if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
					var origx = pixel.x+move[0];
					var origy = pixel.y+move[1];
					if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
						movePixel(head, head.x+move[0], head.y+move[1]);
						moved = true;
						break;
					}
				}
				else if (!isEmpty(pixel.x+move[0], pixel.y+move[1], true)) {
					var hitPixel = pixelMap[pixel.x+move[0]][pixel.y+move[1]];
					if (hitPixel.element === "body" || hitPixel.element === "head" && hitPixel.panic < pixel.panic) {
						// interact with other human
						hitPixel.panic = pixel.panic;
					}
				}
			}
			// 15% chance to change direction
			if (Math.random() < 0.15 || !moved) {
				pixel.dir *= -1;
			}
			// homeostasis
			if (pixel.temp > 37) { pixel.temp -= 1; }
			else if (pixel.temp < 37) { pixel.temp += 1; }
		}

	}
},
elements.infected_head = {
	color: ["#dbccac","#d8c79b","#d6c498","#c8b17e","#ac915e","#9d8054","#836948","#564b37"],
	category: "apocalypse",
	hidden: true,
	density: 1080,
	state: "solid",
	conduct: .05,
	temp: 37,
	tempHigh: 150,
	stateHigh: "cooked_meat",
	tempLow: -30,
	stateLow: "frozen_meat",
	burn: 10,
	burnTime: 250,
	burnInto: "cooked_meat",
	breakInto: ["infection","meat","bone","infectious_plague"],
	forceSaveColor: true,
	pickElement: "infected_human",
	reactions: {
		"cancer": { elem1:"cancer", chance:0.005 },
		"radiation": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.4 },
		"neutron": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.03 },
		"fallout": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.03 },
		"plague": { elem1:"plague", chance:0.05 },
		"oxygen": { elem2:"carbon_dioxide", chance:0.5 },
		"beans": { elem2:[null,null,null,null,null,null,null,null,"stench"], chance:0.2 },
		"sun": { elem1:"cooked_meat" },
		"light": { stain1:"#825043" },
		"bee": { stain1:"#cc564b", chance:0.2 },
		"water": { elem2:"bubble", attr2:{"clone":"water"}, chance:0.001 },
		"salt_water": { elem2:"bubble", attr2:{"clone":"salt_water"}, chance:0.001 },
		"pool_water": { elem2:"bubble", attr2:{"clone":"pool_water"}, chance:0.001 },
		"alcohol": { chance:0.2, attr1:{"panic":0} },
		"anesthesia": { attr1:{"panic":0} },
		"alcohol_gas": { chance:0.2, attr1:{"panic":0} },
	},
	properties: {
		dead: false
	},
	tick: function(pixel) {
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
				changePixel(pixel,"rotten_head");
				return
			}
		}

		// Find the body
		if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "infected_body") {
			var body = pixelMap[pixel.x][pixel.y+1];
			if (body.dead) { // If body is dead, kill head
				pixel.dead = body.dead;
			}
		}
		else { var body = null }

		// check for eating food
		if (body && !pixel.dead && Math.random() < 0.1) {
			shuffleArray(interactCoordsShuffle);
			for (var i = 0; i < interactCoordsShuffle.length; i++) {
				var x = pixel.x+interactCoordsShuffle[i][0];
				var y = pixel.y+interactCoordsShuffle[i][1];
				if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].isFood && pixelMap[x][y].panic === undefined) {
					deletePixel(x,y);
					break;
				}
			}
		}

		if (tryMove(pixel, pixel.x, pixel.y+1)) {
			// create blood if severed 10% chance
			if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1 && !pixel.charge) {
				createPixel("infectious_plague", pixel.x, pixel.y+1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		// homeostasis
		if (pixel.temp > 37) { pixel.temp -= 1; }
		else if (pixel.temp < 37) { pixel.temp += 1; }
	},
	onChange: function(pixel) {
		for (var i = 0; i < adjacentCoords.length; i++) {
			var coord = adjacentCoords[i];
			var x = pixel.x+coord[0];
			var y = pixel.y+coord[1];
			if (!isEmpty(x,y,true) && pixelMap[x][y].panic !== undefined) {
				pixelMap[x][y].panic += 20;
			}
		}
	},
	onDelete: function(pixel) {
		for (var i = 0; i < adjacentCoords.length; i++) {
			var coord = adjacentCoords[i];
			var x = pixel.x+coord[0];
			var y = pixel.y+coord[1];
			if (!isEmpty(x,y,true) && pixelMap[x][y].panic !== undefined) {
				pixelMap[x][y].panic += 20;
			}
		}
	}
}
