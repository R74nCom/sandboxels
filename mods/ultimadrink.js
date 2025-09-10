behaviors.SOLIDIFY = function(pixel) {
    pixel.solid = true
}

elements.strawberry = {
    color: ["#e53939","#db1515"],
	behavior: [
		"ST:strawberry_plant|ST:strawberry_plant|ST:strawberry_plant",
		"ST:strawberry_plant|XX|ST:strawberry_plant",
		"ST:strawberry_plant AND M2|ST:strawberry_plant AND M1|ST:strawberry_plant AND M2",
	],
	reactions: {
		"radiation": { elem1:"explosion", chance:0.1, color1:"#a32222" },
		"rock": { elem1:"juice", chance:0.1, color1:"#a32222" },
		"concrete": { elem1:"juice", chance:0.1, color1:"#a32222" },
		"basalt": { elem1:"juice", chance:0.1, color1:"#a32222" },
		"limestone": { elem1:"juice", chance:0.1, color1:"#a32222" },
		"tuff": { elem1:"juice", chance:0.1, color1:"#a32222" },
		"water": { elem2:"juice", chance:0.005, color2:"#a32222" },
		"sugar_water": { elem2:"juice", chance:0.025, color2:"#a32222" },
		"acid": { elem1:"juice", color1:"#a32222" },
		"acid_gas": { elem1:"juice", color1:"#a32222" },
        "sugar": { elem2:null, elem1:"jam", chance:0.005, tempMin:100 },
	},
	innerColor: "#cc7492",
	tempHigh: 256,
	stateHigh: ["steam","sugar"],
	category: "food",
	state: "solid",
	density: 1154,
	breakInto: ["juice","juice","juice","strawberry_seed"],
	breakIntoColor: "#a32222",
	ignoreAir: true,
	isFood: true
}

elements.strawberry_seed = {
    color: "#EAE66A",
	tempHigh: 100,
	stateHigh: "dead_plant",
	tempLow: -2,
	stateLow: "frozen_plant",
	burn:50,
	burnTime:20,
	breakInto: null,
	category:"life",
	state: "solid",
	density: 1400,
	cooldown: defaultCooldown,
	seed: true,
    tick: function(pixel) {
		if (!tryMove(pixel,pixel.x,pixel.y+1)) {
			if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100 && isEmpty(pixel.x, pixel.y-1)) {
				changePixel(pixel,"plant")
                createPixel("strawberry_plant",pixel.x, pixel.y-1)
			}
			else if (pixel.age > 1000 && Math.random() < 0.05) {
				changePixel(pixel,"strawberry_plant");
				pixel.color = pixelColorPick(pixel, pixel.wc);
			}
			pixel.age++;
		}
		doDefaults(pixel);
	},
	properties: {
		"age":0
	},
}

elements.strawberry_plant = {
    color: "#009100",
	behavior: behaviors.WALL,
    movable: false,
	reactions: {
		"vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
		"baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
		"bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
		"alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
		"mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
		"salt": { elem1:"dead_plant", elem2:null, chance:0.001 },
		"stench": { elem2:null, chance:0.25 },
		"chlorine": { stain1:"#a2bf00" },
	},
	renderer: renderPresets.PLANTCHAR,
	category:"life",
	tempHigh: 100,
	stateHigh: "dead_plant",
	tempLow: -1.66,
	stateLow: "frozen_plant",
	burn:15,
	burnTime:60,
	burnInto: "dead_plant",
	breakInto: "dead_plant",
	state: "solid",
	density: 1050,
	forceSaveColor: true,
    hidden: true,
    tick: function(pixel) {
		if (!pixel.burning) {
			if (!pixel.lc) { pixel.lc = "#00bf00" }
			if (!pixel.wc) { pixel.wc = "#00bf00" }
			if (isEmpty(pixel.x-1,pixel.y-1) && Math.random() < 0.02) {
				if (Math.random() < 0.65) {
                    if (Math.random() > 0.75) {
					    createPixel("strawberry",pixel.x-1,pixel.y-1);
				    }
                    else {
					    createPixel("plant",pixel.x-1,pixel.y-1);
					    pixelMap[pixel.x-1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x-1][pixel.y-1], pixel.lc);
                    }
				}
				else {
					createPixel("strawberry_plant",pixel.x-1,pixel.y-1);
					pixelMap[pixel.x-1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x-1][pixel.y-1], pixel.wc);
					pixelMap[pixel.x-1][pixel.y-1].wc = pixel.wc;
					pixelMap[pixel.x-1][pixel.y-1].lc = pixel.lc;
				}
			}
			if (isEmpty(pixel.x+1,pixel.y-1) && Math.random() < 0.02) {
				if (Math.random() < 0.65) {
                    if (Math.random() > 0.75) {
					    createPixel("strawberry",pixel.x+1,pixel.y-1);
				    }
                    else {
					    createPixel("plant",pixel.x+1,pixel.y-1);
					    pixelMap[pixel.x+1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x+1][pixel.y-1], pixel.lc);
                    }
				}
				else {
					createPixel("strawberry_plant",pixel.x+1,pixel.y-1);
					pixelMap[pixel.x+1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x+1][pixel.y-1], pixel.wc);
					pixelMap[pixel.x+1][pixel.y-1].wc = pixel.wc;
					pixelMap[pixel.x+1][pixel.y-1].lc = pixel.lc;
				}
			}
			if (isEmpty(pixel.x,pixel.y-1) && Math.random() < 0.02) {
				if (Math.random() < 0.8) {
                    if (Math.random() > 0.8) {
					    createPixel("strawberry",pixel.x,pixel.y-1);
				    }
                    else {
					    createPixel("plant",pixel.x,pixel.y-1);
					    pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1], pixel.lc);
                    }
				}
				else {
					createPixel("strawberry_plant",pixel.x,pixel.y-1);
					pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1], pixel.wc);
					pixelMap[pixel.x][pixel.y-1].wc = pixel.wc;
					pixelMap[pixel.x][pixel.y-1].lc = pixel.lc;
				}
			}
		}
		doDefaults(pixel);
	},
}

elements.jam = {
	color: ["#a82953","#941540"],
	behavior: behaviors.LIQUID,
    reactions: {
		"bbq_sauce": { elem1:"strawbeque", elem2:"strawbeque", chance:0.5 },
	},
	viscosity: 2000000,
	tempHigh: 200,
	stateHigh: ["smoke","sugar"],
	tempLow: -5,
	stateLow: ["sugar_ice","sugar_ice","juice_ice"],
	category: "food",
	state: "liquid",
	density: 1245,
	isFood: true,
}

elements.bbq_sauce = {
    color: "#571E1A",
    behavior: behaviors.LIQUID,
    reactions: {
		"jam": { elem1:"strawbeque", elem2:"strawbeque", chance:0.5 },
	},
    viscosity: 50000,
    tempHigh: 260,
    stateHigh: ["carbon_dioxide","methane","steam","salt","sugar"],
    tempLow: -15,
	stateLowName: "bbq_ice",
    category:"liquids",
    state: "liquid",
    density: 1235,
    stain: 0.05,
    isFood: true
}

if (!elements.ketchup.reactions) { elements.ketchup.reactions = {}; }
elements.ketchup.reactions.molasses = { elem1:"bbq_sauce", elem2:"bbq_sauce", tempMin:100 }
elements.ketchup.reactions.sugar = { elem1:"bbq_sauce", elem2:"bbq_sauce", tempMin:100 }

if (!elements.sauce.reactions) { elements.sauce.reactions = {}; }
elements.sauce.reactions.sugar = { elem1:"bbq_sauce", elem2:"bbq_sauce", tempMin:100 }
elements.sauce.reactions.molasses = { elem1:"bbq_sauce", elem2:"bbq_sauce", tempMin:100 }

elements.strawbeque = {
    color: "#7d241e",
    behavior: behaviors.LIQUID,
    reactions: {
		"pilk": { elem1:"strawbequpilk", elem2:"strawbequpilk"},
		"jam": { elem2:"strawbeque", chance:0.005},
		"bbq_sauce": { elem2:"strawbeque", chance:0.005},
	},
    viscosity: 200000,
    tempHigh: 260,
    stateHigh: ["carbon_dioxide","methane","steam","salt","sugar","smoke","sugar"],
    tempLow: -10,
	stateLow: ["bbq_ice","bbq_ice","sugar_ice","juice_ice"],
    category:"liquids",
    state: "liquid",
    density: 1235,
    stain: 0.05,
    isFood: true,
    hidden: true,
}

if (!elements.pilk.reactions) { elements.pilk.reactions = {}; }
elements.pilk.reactions.strawbeque = { elem1:"strawbequpilk", elem2:"strawbequpilk"}

elements.strawbequpilk = {
    color: "#844540",
    behavior: behaviors.LIQUID,
    viscosity: 2000,
    tempHigh: 230,
    stateHigh: ["carbon_dioxide","methane","steam","salt","sugar","smoke","sugar","steam","bubble","cream","cream","sugar"],
    tempLow: -7.5,
    reactions: {
        "leagamen": { elem1:"beverage_of_the_gods", elem2:"beverage_of_the_gods" },
		"strawbeque": { elem2:"strawbequpilk", chance:0.005},
		"pilk": { elem2:"strawbequpilk", chance:0.005},
    },
	stateLow: ["bbq_ice","bbq_ice","sugar_ice","juice_ice","ice_cream","ice_cream"],
    category:"liquids",
    state: "liquid",
    density: 1133,
    stain: 0.05,
    isFood: true,
    hidden: true,
}

elements.lime = {
    color: ["#549c2d","#4d9c22"],
    behavior: [
		"ST:lime_branch|ST:lime_branch|ST:lime_branch",
		"ST:lime_branch|XX|ST:lime_branch",
		"ST:lime_branch AND M2|ST:lime_branch AND M1|ST:lime_branch AND M2",
	],
    reactions: {
		"radiation": { elem1:"explosion", chance:0.1, color1:"#85d14b" },
		"rock": { elem1:"lime_juice", chance:0.1 },
		"concrete": { elem1:"lime_juice", chance:0.1 },
		"basalt": { elem1:"lime_juice", chance:0.1 },
		"limestone": { elem1:"lime_juice", chance:0.1 },
		"tuff": { elem1:"lime_juice", chance:0.1 },
		"water": { elem2:"lime_juice", chance:0.005 },
		"sugar_water": { elem2:"lime_juice", chance:0.025 },
		"acid": { elem1:"lime_juice" },
		"acid_gas": { elem1:"lime_juice" },
        "sugar": { elem2:null, elem1:"jelly", chance:0.005, tempMin:100, color1:"#629c36" },
	},
    category:"food",
    tempHigh: 256,
	stateHigh: ["steam","smoke","sugar"],
    burn:65,
    burnTime:60,
    burnInto: ["steam", "smoke","sugar"],
    breakInto: "lime_juice",
    state: "solid",
    density: 1050,
    isFood: true,
}

elements.lime_seed = {
    color: "#d1d18c",
	tempHigh: 100,
	stateHigh: "dead_plant",
	tempLow: -2,
	stateLow: "frozen_plant",
	burn:50,
	burnTime:20,
	breakInto: null,
	category:"life",
	state: "solid",
	density: 1400,
	cooldown: defaultCooldown,
	seed: true,
    tick: function(pixel) {
		if (!tryMove(pixel,pixel.x,pixel.y+1)) {
			if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100 && isEmpty(pixel.x, pixel.y-1)) {
				changePixel(pixel,"wood")
                createPixel("lime_branch",pixel.x, pixel.y-1)
                if (isEmpty(pixel.x, pixel.y-2)) {
                    createPixel("lime_branch",pixel.x, pixel.y-2)
                }
			}
			else if (pixel.age > 1000 && Math.random() < 0.05) {
				changePixel(pixel,"wood");
				pixel.color = pixelColorPick(pixel, pixel.wc);
			}
			pixel.age++;
		}
		doDefaults(pixel);
	},
	properties: {
		"age":0
	},
}

elements.lime_branch = {
    color: "#a0522d",
	behavior: behaviors.WALL,
	renderer: renderPresets.WOODCHAR,
	movable: false,
	tempHigh: 100,
	stateHigh: "wood",
	tempLow: -30,
	stateLow: "wood",
	category: "life",
	burn: 2,
	burnTime: 300,
	burnInto: ["sap","ember","charcoal","smoke"],
	hidden: true,
	state: "solid",
	density: 1500,
	hardness: 0.15,
	breakInto: ["sap","sawdust"],
	seed: "lime_seed",
	forceSaveColor: true,
    tick: function(pixel) {
		if (!pixel.burning) {
			if (!pixel.lc) { pixel.lc = "#00bf00" }
			if (!pixel.wc) { pixel.wc = "#a0522d" }
			if (isEmpty(pixel.x-1,pixel.y-1) && Math.random() < 0.02) {
				if (Math.random() < 0.5) {
                    if (Math.random() > 0.7) {
					    createPixel("lime",pixel.x-1,pixel.y-1);
				    }
                    else {
					    createPixel("plant",pixel.x-1,pixel.y-1);
					    pixelMap[pixel.x-1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x-1][pixel.y-1], pixel.lc);
                    }
				}
				else {
					createPixel("lime_branch",pixel.x-1,pixel.y-1);
					pixelMap[pixel.x-1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x-1][pixel.y-1], pixel.wc);
					pixelMap[pixel.x-1][pixel.y-1].wc = pixel.wc;
					pixelMap[pixel.x-1][pixel.y-1].lc = pixel.lc;
				}
			}
			if (isEmpty(pixel.x+1,pixel.y-1) && Math.random() < 0.02) {
				if (Math.random() < 0.5) {
                    if (Math.random() > 0.7) {
					    createPixel("lime",pixel.x+1,pixel.y-1);
				    }
                    else {
					    createPixel("plant",pixel.x+1,pixel.y-1);
					    pixelMap[pixel.x+1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x+1][pixel.y-1], pixel.lc);
                    }
				}
				else {
					createPixel("lime_branch",pixel.x+1,pixel.y-1);
					pixelMap[pixel.x+1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x+1][pixel.y-1], pixel.wc);
					pixelMap[pixel.x+1][pixel.y-1].wc = pixel.wc;
					pixelMap[pixel.x+1][pixel.y-1].lc = pixel.lc;
				}
			}
			if (isEmpty(pixel.x,pixel.y-1) && Math.random() < 0.02) {
				if (Math.random() < 0.8) {
                    if (Math.random() > 0.8) {
					    createPixel("lime",pixel.x,pixel.y-1);
				    }
                    else {
					    createPixel("plant",pixel.x,pixel.y-1);
					    pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1], pixel.lc);
                    }
				}
				else {
					createPixel("lime_branch",pixel.x,pixel.y-1);
					pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1], pixel.wc);
					pixelMap[pixel.x][pixel.y-1].wc = pixel.wc;
					pixelMap[pixel.x][pixel.y-1].lc = pixel.lc;
				}
			}
		}
		doDefaults(pixel);
	},
}

elements.lime_juice = {
    color: "#85d14b",
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    reactions: {
		"seltzer": { elem1:"sprite", elem2:"sprite", chance:0.1 },
	},
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    tempLow: 0,
    stateLow:"juice_ice",
    stateLowColor:"#94e05a"
}

elements.sprite = {
	color: "#B9CEC6",
	behavior: [
		"XX|XX|XX",
		"M2|XX|M2",
		"M2|M1|M2",
	],
	tick: function(pixel) {
		if (Math.random() < 0.02 && isEmpty(pixel.x,pixel.y-1)) {
			let foam = releaseElement(pixel, "foam");
			if (foam) foam.color = pixelColorPick(foam,"#d8e8e2");
		}
	},
	onMix: function(pixel) {
		let foam = releaseElement(pixel, "foam");
		if (foam) foam.color = pixelColorPick(foam,"#d8e8e2");
	},
	tempHigh: 100,
	stateHigh: ["steam","carbon_dioxide","sugar"],
	tempLow: -1.11,
	category: "liquids",
	reactions: {
		"rock": { elem2: "wet_sand", chance: 0.0004 },
		"water": { elem1: "sugar_water", elem2: "sugar_water" },
		"salt": { elem2:"foam", chance:0.05, color2:"#d8e8e2" },
		"salt_water": { elem2:"foam", chance:0.01, color2:"#d8e8e2" },
		"sugar": { elem2:"foam", chance:0.001, color2:"#d8e8e2" },
		"egg": { elem2:"yolk", chance:0.001 },
		"candy": { elem2:"foam", chance:0.01, color2:"#d8e8e2" },
		"caramel": { elem2:"foam", chance:0.01, color2:"#d8e8e2" },
		"rust": { elem2:"iron", chance:0.01 },
		"oxidized_copper": { elem2:"copper", chance:0.01 },
	},
	state: "liquid",
	density: 1030,
	isFood: true
}

elements.cough_syrup = {
    density: 1200, 
    viscosity: 225,
    color: "#007a55",
    behavior: behaviors.LIQUID,
    stateHigh:["steam","sugar","sugar","alcohol","sugar","smoke","stench"],
    category: "liquids",
    state: "liquid",
    reactions: {
        "sprite": { elem1: "lean", elem2: "lean" },
        "doxylamine": { elem2: null, elem1: "nyquil" },
        "phenylephrine": { elem2: null, elem1: "dayquil" },
    },
}

elements.doxylamine = {
	tempHigh: 106,
	color: "#d1cfcb",
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
}

elements.phenylephrine = {
	tempHigh: 341.1,
	color: "#ebe9e6",
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
}

elements.nyquil = {
    density: 1200, 
    viscosity: 185,
    color: "#00c2a8",
    behavior: behaviors.LIQUID,
    stateHigh:["steam","sugar","sugar","alcohol","sugar","smoke","stench","doxylamine","doxylamine"],
    category: "liquids",
    state: "liquid",
    reactions: {
        "sprite": { elem1: "lean", elem2: "lean" },
        "phenylephrine": { elem2: null, elem1: "dayquil" },
    },
}

elements.lean = {
    density: 1077.75, 
    viscosity: 40, 
    color: "#a527db",
    behavior: [
        "XX|CR:foam%3|XX",
        "M2|XX|M2",
        "M1|M1|M1"
    ],
    reactions: {
        "gamen": { elem1:"leagamen", elem2:"leagamen" },
		"sprite": { elem2:"lean", chance:0.005},
		"nyquil": { elem2:"lean", chance:0.005},
		"cough_syrup": { elem2:"lean", chance:0.005},
    },
    tempHigh:105,
    stateHigh:["steam","steam","carbon_dioxide","sugar","alcohol","carbon_dioxide","sugar","smoke","stench"],
    category: "liquids",
    hidden: true, 
    state: "liquid",
    stain: 0.03,
}

if (!elements.dough.reactions) { elements.dough.reactions = {}; }
elements.dough.reactions.yolk = { elem1:"ramen_dough"}

elements.ramen_dough = {
	color: "#bfac91",
	behavior: behaviors.STURDYPOWDER,
	reactions: {
		"milk": { elem2:"ramen_broth", color2:"#ECC891", tempMin:70 },
        "water": { elem2:"ramen_broth", tempMin:70 },
		"salt_water": { elem2:"ramen_broth", tempMin:70 },
		"sugar_water": { elem2:"ramen_broth", tempMin:70 },
		"dirty_water": { elem2:"ramen_broth", tempMin:70, color2:"#d7db69" },
		"seltzer": { elem2:"ramen_broth", tempMin:70 },
		"cream": { elem2:"ramen_broth", color2:"#ECC891", tempMin:70 },
		"yeast": { elem2:"ramen_dough", tempMin:40, chance:0.01 },
		"cream": { elem2:"ramen_dough", tempMin:40, chance:0.01 },
		"baking_soda": { elem2:"ramen_dough", tempMin:40, chance:0.01 },
		"quicklime": { elem2:"ramen_dough", tempMin:40, chance:0.01 },
	},
	category: "food",
	tempHigh: 94,
	stateHigh: "ramen",
	burn:40,
	burnTime:25,
	burnInto:"ramen",
	state: "solid",
	density: 526.9,
	isFood: true,
    hidden: true,
}

elements.ramen = {
    color: ["#F3BA4F", "#F7D161"],
    behavior: behaviors.POWDER,
    reactions: {
		"water": { elem2:"ramen_broth", tempMin:70 },
		"salt_water": { elem2:"ramen_broth", tempMin:70 },
		"sugar_water": { elem2:"ramen_broth", tempMin:70 },
		"dirty_water": { elem2:"ramen_broth", tempMin:70, color2:"#d7db69" },
		"seltzer": { elem2:"ramen_broth", tempMin:70 },
	},
    category: "food",
    state: "solid",
    temp: 70,
    tempHigh: 130,
    stateHigh: ["toast"],
    burn:50,
    burnTime:450,
    burnInto:"toast",
    state: "solid",
    density: 900,
    conduct: 0.1,
    isFood: true,
}

elements.ramen_broth = {
	color: "#ecc891",
	behavior: behaviors.LIQUID,
	reactions: {
		"petal": { color1:["#CC9978","#CD8C6F","#BE785E","#CC9978","#CD8C6F","#BE785E","#A9D475","#5AF353","#8E5FA5"], tempMin:70, chance:0.01 },
		"pistil": { color1:["#CC9978","#CD8C6F","#BE785E","#CC9978","#CD8C6F","#BE785E","#A9D475","#5AF353","#8E5FA5"], tempMin:70, chance:0.01 },
		"potato": { color1:"#DFD0CB", tempMin:70, chance:0.05 },
		"melted_cheese": { color1:"#dbc469", tempMin:70, chance:0.05 },
		"beans": { color1:"#db9769", tempMin:70, chance:0.05 },
		"wheat": { color1:"#dbbd8a", tempMin:70, chance:0.05 },
		"kelp": { color1:"#7dba57", tempMin:70, chance:0.05 },
		"tomato": { color1:"#F9A24E", tempMin:70, chance:0.05 },
		"sauce": { color1:"#F9A24E", tempMin:70, chance:0.05 },
		"ketchup": { color1:"#F9A24E", tempMin:70, chance:0.05 },
		"mushroom_stalk": { color1:["#CC9978","#CD8C6F","#BE785E"], tempMin:70, chance:0.05 },
		"mushroom_cap": { color1:["#CC9978","#CD8C6F","#BE785E"], tempMin:70, chance:0.05 },
		"mushroom_gill": { color1:["#CC9978","#CD8C6F","#BE785E"], tempMin:70, chance:0.05 },
		"hyphae": { color1:["#CC9978","#CD8C6F","#BE785E"], tempMin:70, chance:0.05 },
        "oil": { elem1:"gamen", elem2:"gamen" },
	},
	tempHigh: 130,
	stateHigh: ["steam","steam","steam","fragrance","steam","steam","steam","salt"],
	tempLow: 0,
	category: "liquids",
	state: "liquid",
	density: 1052,
	conduct: 0.03,
	stain: -0.01,
	hidden: true,
	isFood: true,
	extinguish: true
}

elements.gamen = {
	color: "#926342",
	behavior: behaviors.LIQUID,
	reactions: {
		"petal": { color1:["#CC9978","#CD8C6F","#BE785E","#CC9978","#CD8C6F","#BE785E","#A9D475","#5AF353","#8E5FA5"], tempMin:70, chance:0.01 },
		"pistil": { color1:["#CC9978","#CD8C6F","#BE785E","#CC9978","#CD8C6F","#BE785E","#A9D475","#5AF353","#8E5FA5"], tempMin:70, chance:0.01 },
		"potato": { color1:"#DFD0CB", tempMin:70, chance:0.05 },
		"melted_cheese": { color1:"#dbc469", tempMin:70, chance:0.05 },
		"beans": { color1:"#db9769", tempMin:70, chance:0.05 },
		"wheat": { color1:"#dbbd8a", tempMin:70, chance:0.05 },
		"kelp": { color1:"#7dba57", tempMin:70, chance:0.05 },
		"tomato": { color1:"#F9A24E", tempMin:70, chance:0.05 },
		"sauce": { color1:"#F9A24E", tempMin:70, chance:0.05 },
		"ketchup": { color1:"#F9A24E", tempMin:70, chance:0.05 },
		"mushroom_stalk": { color1:["#CC9978","#CD8C6F","#BE785E"], tempMin:70, chance:0.05 },
		"mushroom_cap": { color1:["#CC9978","#CD8C6F","#BE785E"], tempMin:70, chance:0.05 },
		"mushroom_gill": { color1:["#CC9978","#CD8C6F","#BE785E"], tempMin:70, chance:0.05 },
		"hyphae": { color1:["#CC9978","#CD8C6F","#BE785E"], tempMin:70, chance:0.05 },
        "dirt": { elem1:null, elem2:"mud" },
		"sand": { elem1:null, elem2:"wet_sand" },
		"sulfur": { elem1:null, elem2:"greek_fire" },
		"molten_sulfur": { elem1:"greek_fire", elem2:"greek_fire" },
		"water": { burning1:true, elem2:"explosion" },
		"steam": { burning1:true, elem2:"explosion" },
		"salt_water": { burning1:true, elem2:"explosion" },
		"sugar_water": { burning1:true, elem2:"explosion" },
		"dirty_water": { burning1:true, elem2:"explosion" },
		"pool_water": { burning1:true, elem2:"explosion" },
		"seltzer": { burning1:true, elem2:"explosion" },
		"coral": { elem2:null, chance:0.01 },
        "lean": { elem1:"leagamen", elem2:"leagamen" },
		"oil": { elem2:"gamen", chance:0.005},
		"ramen_broth": { elem2:"gamen", chance:0.005},
	},
	tempHigh: 130,
	stateHigh: ["carbon_dioxide","steam","fragrance","steam","steam","steam","salt"],
    burn: 5,
	burnTime: 300,
	burnInto: ["carbon_dioxide","carbon_dioxide","fire","steam","fire","steam","fire","salt"],
	tempLow: 0,
	category: "liquids",
	state: "liquid",
	density: 1052,
	conduct: 0.03,
	stain: -0.01,
	hidden: true,
	isFood: true,
}

elements.leagamen = {
	color: "#994D7A",
	behavior: behaviors.LIQUID,
	reactions: {
		"petal": { color1:["#CC9978","#CD8C6F","#BE785E","#CC9978","#CD8C6F","#BE785E","#A9D475","#5AF353","#8E5FA5"], tempMin:70, chance:0.01 },
		"pistil": { color1:["#CC9978","#CD8C6F","#BE785E","#CC9978","#CD8C6F","#BE785E","#A9D475","#5AF353","#8E5FA5"], tempMin:70, chance:0.01 },
		"potato": { color1:"#DFD0CB", tempMin:70, chance:0.05 },
		"melted_cheese": { color1:"#dbc469", tempMin:70, chance:0.05 },
		"beans": { color1:"#db9769", tempMin:70, chance:0.05 },
		"wheat": { color1:"#dbbd8a", tempMin:70, chance:0.05 },
		"kelp": { color1:"#7dba57", tempMin:70, chance:0.05 },
		"tomato": { color1:"#F9A24E", tempMin:70, chance:0.05 },
		"sauce": { color1:"#F9A24E", tempMin:70, chance:0.05 },
		"ketchup": { color1:"#F9A24E", tempMin:70, chance:0.05 },
		"mushroom_stalk": { color1:["#CC9978","#CD8C6F","#BE785E"], tempMin:70, chance:0.05 },
		"mushroom_cap": { color1:["#CC9978","#CD8C6F","#BE785E"], tempMin:70, chance:0.05 },
		"mushroom_gill": { color1:["#CC9978","#CD8C6F","#BE785E"], tempMin:70, chance:0.05 },
		"hyphae": { color1:["#CC9978","#CD8C6F","#BE785E"], tempMin:70, chance:0.05 },
        "dirt": { elem1:null, elem2:"mud" },
		"sand": { elem1:null, elem2:"wet_sand" },
		"sulfur": { elem1:null, elem2:"greek_fire" },
		"molten_sulfur": { elem1:"greek_fire", elem2:"greek_fire" },
		"water": { burning1:true, elem2:"explosion" },
		"steam": { burning1:true, elem2:"explosion" },
		"salt_water": { burning1:true, elem2:"explosion" },
		"sugar_water": { burning1:true, elem2:"explosion" },
		"dirty_water": { burning1:true, elem2:"explosion" },
		"pool_water": { burning1:true, elem2:"explosion" },
		"seltzer": { burning1:true, elem2:"explosion" },
		"coral": { elem2:null, chance:0.01 },
        "strawbequpilk": { elem1:"beverage_of_the_gods", elem2:"beverage_of_the_gods" },
		"lean": { elem2:"leagamen", chance:0.005},
		"gamen": { elem2:"leagamen", chance:0.005},
	},
    tick: function(pixel) {
		if (!pixel.burning && pixel.temp > 90 && Math.random() < 0.001) {
			if (pixel.temp < 150) { changePixel(pixel,"propane") }
			else if (pixel.temp < 300) { changePixel(pixel,"molten_plastic") }
			else { changePixel(pixel,"lamp_oil") }
		}
	},
	tempHigh: 130,
	stateHigh: ["steam","steam","carbon_dioxide","sugar","alcohol","carbon_dioxide","sugar","smoke","carbon_dioxide","steam","steam","steam","steam","salt"],
    burn: 5,
	burnTime: 300,
	burnInto: ["carbon_dioxide","carbon_dioxide","fire","steam","fire","steam","fire","salt","sugar"],
	tempLow: 0,
    stateLowName: "leagamen_ice",
	category: "liquids",
	state: "liquid",
	density: 1052,
	conduct: 0.03,
	stain: -0.01,
	hidden: true,
	isFood: true,
}

elements.beverage_of_the_gods = {
	color: "#9E8086",
	behavior: behaviors.LIQUID,
	reactions: {
		"petal": { color1:["#CC9978","#CD8C6F","#BE785E","#CC9978","#CD8C6F","#BE785E","#A9D475","#5AF353","#8E5FA5"], tempMin:70, chance:0.01 },
		"pistil": { color1:["#CC9978","#CD8C6F","#BE785E","#CC9978","#CD8C6F","#BE785E","#A9D475","#5AF353","#8E5FA5"], tempMin:70, chance:0.01 },
		"potato": { color1:"#DFD0CB", tempMin:70, chance:0.05 },
		"melted_cheese": { color1:"#dbc469", tempMin:70, chance:0.05 },
		"beans": { color1:"#db9769", tempMin:70, chance:0.05 },
		"wheat": { color1:"#dbbd8a", tempMin:70, chance:0.05 },
		"kelp": { color1:"#7dba57", tempMin:70, chance:0.05 },
		"tomato": { color1:"#F9A24E", tempMin:70, chance:0.05 },
		"sauce": { color1:"#F9A24E", tempMin:70, chance:0.05 },
		"ketchup": { color1:"#F9A24E", tempMin:70, chance:0.05 },
		"mushroom_stalk": { color1:["#CC9978","#CD8C6F","#BE785E"], tempMin:70, chance:0.05 },
		"mushroom_cap": { color1:["#CC9978","#CD8C6F","#BE785E"], tempMin:70, chance:0.05 },
		"mushroom_gill": { color1:["#CC9978","#CD8C6F","#BE785E"], tempMin:70, chance:0.05 },
		"hyphae": { color1:["#CC9978","#CD8C6F","#BE785E"], tempMin:70, chance:0.05 },
        "dirt": { elem1:null, elem2:"mud" },
		"sand": { elem1:null, elem2:"wet_sand" },
		"sulfur": { elem1:null, elem2:"greek_fire" },
		"molten_sulfur": { elem1:"greek_fire", elem2:"greek_fire" },
		"water": { burning1:true, elem2:"explosion" },
		"steam": { burning1:true, elem2:"explosion" },
		"salt_water": { burning1:true, elem2:"explosion" },
		"sugar_water": { burning1:true, elem2:"explosion" },
		"dirty_water": { burning1:true, elem2:"explosion" },
		"pool_water": { burning1:true, elem2:"explosion" },
		"seltzer": { burning1:true, elem2:"explosion" },
		"coral": { elem2:null, chance:0.01 },
		"leagamen": { elem2:"beverage_of_the_gods", chance:0.005},
		"strawbequpilk": { elem2:"beverage_of_the_gods", chance:0.005},
	},
    tempLow: -5,
	tempHigh: 130,
	stateHigh: ["steam","steam","carbon_dioxide","sugar","alcohol","carbon_dioxide","sugar","smoke","carbon_dioxide","steam","steam","steam","steam","salt","carbon_dioxide","methane","steam","salt","sugar","smoke","sugar","steam","bubble","cream","cream","sugar"],
    burn: 5,
	burnTime: 300,
	burnInto: ["steam","steam","carbon_dioxide","sugar","alcohol","carbon_dioxide","sugar","smoke","carbon_dioxide","steam","steam","steam","steam","salt","carbon_dioxide","carbon_dioxide","fire","steam","fire","steam","fire","salt","sugar"],
    stateLow: ["bbq_ice","bbq_ice","sugar_ice","juice_ice","ice_cream","ice_cream","leagamen_ice","leagamen_ice","leagamen_ice","leagamen_ice","leagamen_ice"],
	category: "liquids",
	state: "liquid",
	density: 1052,
	conduct: 0.03,
	stain: -0.01,
	hidden: true,
	isFood: true,
}

elements.oreo = {
    color: ["#302c2b","#302c2b","#f7f7f7","#302c2b","#302c2b"],
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "water": { elem1: "wareos", elem2: "wareos" },
    },
    category: "food",
    state: "solid",
    isFood: true,
    tempHigh: 176,
    stateHigh: ["ash","ash","caramel","cream","ash","ash",],
    breakInto: "crumb",
    breakIntoColor: ["#302c2b","#464342"],
    onBreak: function(pixel) {
        releaseElement(pixel,"cream");
    },
    density: 233.95,
}

elements.wareos = {
	color: "#616572",
	behavior: behaviors.LIQUID,
	tempHigh: 100,
	stateHigh: ["steam","steam","steam","crumb","crumb","cream"],
	tempLow: 0,
	stateLow: ["ice","ice","ice","crumb","crumb","cream"],
	category: "liquids",
    isFood: true,
	reactions: {
		"salt": { elem1: "salt_water", elem2: null, temp1:-20 },
		"sugar": { elem1: "sugar_water", elem2: null },
		"honey": { elem1: "sugar_water" },
		"caramel": { elem1: "sugar_water", elem2: null },
		"molasses": { elem1: "sugar_water", chance:0.05 },
		"candy": { elem1: "sugar_water", elem2:"foam", chance:0.005 },
		"dust": { elem1: "dirty_water", elem2: null },
		"ash": { elem1: "dirty_water", elem2: null },
		"cyanide": { elem1: "dirty_water", elem2: null },
		"cyanide_gas": { elem1: "dirty_water", elem2: null },
		"carbon_dioxide": { elem1: "seltzer", elem2: null, oneway:true },
		"sulfur": { elem1: "dirty_water", elem2: null },
		"rat": { elem1: "dirty_water", chance:0.005 },
		"infection": { elem1: "dirty_water", elem2: null },
		"plague": { elem1: "dirty_water", elem2: null },
		"rust": { elem1: "dirty_water", chance:0.005 },
		"lead": { elem1: "dirty_water", chance:0.005 },
		"solder": { elem1: "dirty_water", chance:0.005 },
		"fallout": { elem1: "dirty_water", chance:0.25 },
		"radiation": { elem1: "dirty_water", chance:0.25 },
		"uranium": { elem1: "dirty_water", chance:0.25 },
		"rad_steam": { elem1: "dirty_water", chance:0.02 },
		"rad_glass": { elem1: "dirty_water", chance:0.005 },
		"rad_shard": { elem1: "dirty_water", chance:0.01 },
		"rotten_meat": { elem1: "dirty_water", chance:0.25 },
		"rotten_cheese": { elem1: "dirty_water", chance:0.25 },
		"cancer": { elem1: "dirty_water", chance:0.25 },
		"oil": { elem1: "dirty_water", chance:0.005 },
		"dioxin": { elem1: "dirty_water", chance:0.1 },
		"neutron": { elem1: ["dirty_water","dirty_water","dirty_water","rad_steam"], elem2:null, chance:0.1 },
		"rock": { elem2: "wet_sand", chance: 0.00035 },
		"limestone": { elem2: "wet_sand", chance: 0.00035 },
		"tuff": { elem2: "wet_sand", color2:"#7a6b5c", chance: 0.00035 },
		"ruins": { elem2: "rock", chance: 0.00035 },
		"mudstone": { elem2: "mud", chance: 0.00035 },
		"methane": { elem1:"primordial_soup", elem2:"primordial_soup", tempMin:60, charged:true },
		"ammonia": { elem1:"primordial_soup", elem2:"primordial_soup", tempMin:60, charged:true },
		"fly": { elem2:"dead_bug", chance:0.1, oneway:true },
		"firefly": { elem2:"dead_bug", chance:0.1, oneway:true },
		"bee": { elem2:"dead_bug", chance:0.05, oneway:true },
		"stink_bug": { elem2:"dead_bug", chance:0.1, oneway:true },
		"cured_meat": { elem1:"salt_water", elem2:"meat" },
		"water": { elem2:"bubble", attr2:{"clone":"water"}, chance:0.001, tempMin:85 },
		"wareos": { elem2:"bubble", attr2:{"clone":"wareos"}, chance:0.001, tempMin:85 },
		"aluminum": { elem1:["hydrogen","hydrogen","oxygen","crumb","crumb","cream"], charged:true, chance:0.0025 },
		"zinc": { elem1:["hydrogen","hydrogen","oxygen","crumb","crumb","cream"], charged:true, chance:0.015 },
		"steel": { elem1:["hydrogen","hydrogen","oxygen","crumb","crumb","cream"], charged:true, chance:0.0125 },
		"iron": { elem1:["hydrogen","hydrogen","oxygen","crumb","crumb","cream"], charged:true, chance:0.0125 },
		"tin": { elem1:["hydrogen","hydrogen","oxygen","crumb","crumb","cream"], charged:true, chance:0.01 },
		"brass": { elem1:["hydrogen","hydrogen","oxygen","crumb","crumb","cream"], charged:true, chance:0.001 },
		"bronze": { elem1:["hydrogen","hydrogen","oxygen","crumb","crumb","cream"], charged:true, chance:0.001 },
		"copper": { elem1:["hydrogen","hydrogen","oxygen","crumb","crumb","cream"], charged:true, chance:0.0075 },
		"silver": { elem1:["hydrogen","hydrogen","oxygen","crumb","crumb","cream"], charged:true, chance:0.0075 },
		"gold": { elem1:["hydrogen","hydrogen","oxygen","crumb","crumb","cream"], charged:true, chance:0.0075 },
        "wareos": { elem1:"woke", elem2:"woke" },
		"water": { elem2:"wareos", chance:0.005},
		"oreo": { elem2:"wareos", chance:0.005},
	},
    hidden: true,
	state: "liquid",
	density: 1124.3,
	conduct: 0.01,
	stain: -0.1,
	extinguish: true
}

elements.pineapple_seed = {
    color: "#695531",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (pixel.temp < 100 && pixel.temp > 20) {
                if (isEmpty(pixel.x,pixel.y-1) && pixel.age > (Math.random() * 100)) {
                    createPixel("pineapple",pixel.x,pixel.y-1)
                    pixelMap[pixel.x][pixel.y-1].h = 1
                    changePixel(pixel,"plant")
                } 
                else if (pixel.age > 1000) {
                    changePixel(pixel,"plant")
                }
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0,
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    temp:25,
    behavior: [
        "XX|XX|XX",
        "XX|FX%10|XX",
        "XX|M1|XX",
    ],
};

elements.pineapple = {
    color: "#e8bc38",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (pixel.h === 1) {
                if (isEmpty(pixel.x+1,pixel.y) && Math.random() > 0.75) {
                    createPixel("plant",pixel.x+1,pixel.y)
                    if (!pixel.leaf) {pixel.leaf = 1}
                    else {pixel.leaf++}
                } 
                if (isEmpty(pixel.x-1,pixel.y) && Math.random() > 0.75) {
                    createPixel("plant",pixel.x-1,pixel.y)
                    if (!pixel.leaf) {pixel.leaf = 1}
                    else {pixel.leaf++}
                }
                if (pixel.leaf === 2 && isEmpty(pixel.x,pixel.y-1) && Math.random() > 0.75) {
                    createPixel("pineapple",pixel.x,pixel.y-1)
                    pixelMap[pixel.x][pixel.y-1].h = 2
                    pixel.h = 0
                }
                else if (pixel.leaf < 2 && isEmpty(pixel.x,pixel.y-1) && Math.random() > 0.995) {
                    createPixel("pineapple",pixel.x,pixel.y-1)
                    pixelMap[pixel.x][pixel.y-1].h = 2
                    pixel.h = 0
                }
                else if (!isEmpty(pixel.x,pixel.y-1) && Math.random() > 0.9995) {
                    pixel.h = 0
                }
            }
            else if (pixel.h === 2) {
                if (isEmpty(pixel.x,pixel.y-1)) {
                    createPixel("plant",pixel.x,pixel.y-1)
                    pixel.h = 0
                }
            }
        }
        doDefaults(pixel);
    },
    reactions: {
		"water": { elem2:"pineapple_juice", chance:0.005 },
		"sugar_water": { elem2:"pineapple_juice", chance:0.025 },
		"acid": { elem1:"pineapple_juice" },
		"acid_gas": { elem1:"pineapple_juice" },
        "sugar": { elem2:null, elem1:"jelly", chance:0.005, tempMin:100, color1:"#C4AB3B" },
	},
    category:"food",
    tempHigh: 256,
	stateHigh: ["steam","smoke","sugar"],
    burn:65,
    burnTime:60,
    burnInto: ["steam", "smoke","sugar"],
    breakInto: "pineapple_juice",
    state: "solid",
    density: 1050,
    isFood: true,
}

elements.pineapple_juice = {
    color: "#d9ba32",
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    reactions: {
		"soda": { elem1:"poke", elem2:"poke" },
	},
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    tempLow: 0,
    stateLow:"juice_ice",
    stateLowColor:"#e6c94c",
    isFood: true
}

if (!elements.soda.reactions) { elements.soda.reactions = {}; }
elements.soda.reactions.pineapple_juice = { elem1:"poke", elem2:"poke" }

elements.poke = {
    color: "#876623",
    behavior: [
		"XX|XX|XX",
		"M2|XX|M2",
		"M2|M1|M2",
	],
	tick: function(pixel) {
		if (Math.random() < 0.02 && isEmpty(pixel.x,pixel.y-1)) {
			let foam = releaseElement(pixel, "foam");
			if (foam) foam.color = pixelColorPick(foam,"#9c7c3b");
		}
	},
	onMix: function(pixel) {
		let foam = releaseElement(pixel, "foam");
		if (foam) foam.color = pixelColorPick(foam,"#9c7c3b");
	},
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    reactions: {
		"wareos": { elem1:"woke", elem2:"woke" },
		"pineapple_juice": { elem2:"poke", chance:0.005},
		"soda": { elem2:"poke", chance:0.005},
	},
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    tempLow: 0,
    stateLow:["juice_ice","soda_ice"],
    stateLowColor:"#e6c94c",
    isFood: true
}

elements.woke = {
    color: "#766647",
    behavior: behaviors.LIQUID,
    category: "liquids",
    reactions: {
        "salt": { elem1: "salt_water", elem2: null, temp1:-20 },
		"sugar": { elem1: "sugar_water", elem2: null },
		"honey": { elem1: "sugar_water" },
		"caramel": { elem1: "sugar_water", elem2: null },
		"molasses": { elem1: "sugar_water", chance:0.05 },
		"candy": { elem1: "sugar_water", elem2:"foam", chance:0.005 },
		"dust": { elem1: "dirty_water", elem2: null },
		"ash": { elem1: "dirty_water", elem2: null },
		"cyanide": { elem1: "dirty_water", elem2: null },
		"cyanide_gas": { elem1: "dirty_water", elem2: null },
		"carbon_dioxide": { elem1: "seltzer", elem2: null, oneway:true },
		"sulfur": { elem1: "dirty_water", elem2: null },
		"rat": { elem1: "dirty_water", chance:0.005 },
		"infection": { elem1: "dirty_water", elem2: null },
		"plague": { elem1: "dirty_water", elem2: null },
		"rust": { elem1: "dirty_water", chance:0.005 },
		"lead": { elem1: "dirty_water", chance:0.005 },
		"solder": { elem1: "dirty_water", chance:0.005 },
		"fallout": { elem1: "dirty_water", chance:0.25 },
		"radiation": { elem1: "dirty_water", chance:0.25 },
		"uranium": { elem1: "dirty_water", chance:0.25 },
		"rad_steam": { elem1: "dirty_water", chance:0.02 },
		"rad_glass": { elem1: "dirty_water", chance:0.005 },
		"rad_shard": { elem1: "dirty_water", chance:0.01 },
		"rotten_meat": { elem1: "dirty_water", chance:0.25 },
		"rotten_cheese": { elem1: "dirty_water", chance:0.25 },
		"cancer": { elem1: "dirty_water", chance:0.25 },
		"oil": { elem1: "dirty_water", chance:0.005 },
		"dioxin": { elem1: "dirty_water", chance:0.1 },
		"neutron": { elem1: ["dirty_water","dirty_water","dirty_water","rad_steam"], elem2:null, chance:0.1 },
		"rock": { elem2: "wet_sand", chance: 0.00035 },
		"limestone": { elem2: "wet_sand", chance: 0.00035 },
		"tuff": { elem2: "wet_sand", color2:"#7a6b5c", chance: 0.00035 },
		"ruins": { elem2: "rock", chance: 0.00035 },
		"mudstone": { elem2: "mud", chance: 0.00035 },
		"methane": { elem1:"primordial_soup", elem2:"primordial_soup", tempMin:60, charged:true },
		"ammonia": { elem1:"primordial_soup", elem2:"primordial_soup", tempMin:60, charged:true },
		"fly": { elem2:"dead_bug", chance:0.1, oneway:true },
		"firefly": { elem2:"dead_bug", chance:0.1, oneway:true },
		"bee": { elem2:"dead_bug", chance:0.05, oneway:true },
		"stink_bug": { elem2:"dead_bug", chance:0.1, oneway:true },
		"cured_meat": { elem1:"salt_water", elem2:"meat" },
		"water": { elem2:"bubble", attr2:{"clone":"water"}, chance:0.001, tempMin:85 },
		"wareos": { elem2:"bubble", attr2:{"clone":"wareos"}, chance:0.001, tempMin:85 },
		"aluminum": { elem1:["hydrogen","hydrogen","oxygen","crumb","crumb","cream","sugar","sugar"], charged:true, chance:0.0025 },
		"zinc": { elem1:["hydrogen","hydrogen","oxygen","crumb","crumb","cream","sugar","sugar"], charged:true, chance:0.015 },
		"steel": { elem1:["hydrogen","hydrogen","oxygen","crumb","crumb","cream","sugar","sugar"], charged:true, chance:0.0125 },
		"iron": { elem1:["hydrogen","hydrogen","oxygen","crumb","crumb","cream","sugar","sugar"], charged:true, chance:0.0125 },
		"tin": { elem1:["hydrogen","hydrogen","oxygen","crumb","crumb","cream","sugar","sugar"], charged:true, chance:0.01 },
		"brass": { elem1:["hydrogen","hydrogen","oxygen","crumb","crumb","cream","sugar","sugar"], charged:true, chance:0.001 },
		"bronze": { elem1:["hydrogen","hydrogen","oxygen","crumb","crumb","cream","sugar","sugar"], charged:true, chance:0.001 },
		"copper": { elem1:["hydrogen","hydrogen","oxygen","crumb","crumb","cream","sugar","sugar"], charged:true, chance:0.0075 },
		"silver": { elem1:["hydrogen","hydrogen","oxygen","crumb","crumb","cream","sugar","sugar"], charged:true, chance:0.0075 },
		"gold": { elem1:["hydrogen","hydrogen","oxygen","crumb","crumb","cream","sugar","sugar"], charged:true, chance:0.0075 },
        "flemon_juice": { elem1: "the_apex", elem2: "the_apex" },
		"wareos": { elem2:"woke", chance:0.005},
		"poke": { elem2:"woke", chance:0.005},
	},
    state: "liquid",
    density: 1024.3,
    hidden: true,
    isFood: true,
    tempHigh: 100,
	stateHigh: ["steam","steam","steam","crumb","crumb","cream","steam","sugar","steam","sugar","steam","sugar"],
	tempLow: 0,
	stateLow: ["ice","ice","ice","crumb","crumb","cream","juice_ice","soda_ice","juice_ice","soda_ice"],
	extinguish: true
}

elements.frosting = {
	color: "#e8e8e8",
	behavior: behaviors.LIQUID,
	reactions: {
		"sugar": { elem2:null, chance:0.0025},
        "frosting": { elem1:"fremonade", elem2:"fremonade", chance:0.1 },
	},
	viscosity: 150000,
	tempHigh: 200,
	stateHigh: ["steam","bubble","steam","sugar","sugar","sugar","butter","cream"],
	tempLow: -100,
	stateLow: "ice_cream",
	stateLowColorMultiplier: 0.97,
	category: "food",
	isFood: true,
	state: "liquid",
	density: 1097,
},

elements.butter.onMix = function(milk1, milk2) {
		if ((shiftDown && Math.random() < 0.01) || (elements[milk2.element].id === elements.sugar.id && Math.random() < 0.00025)) {
            if (Math.random() > 0.75) {
			    changePixel(milk2,"frosting")
            }
            else {
                deletePixel(milk2.x,milk2.y)
            }
            changePixel(milk1,"frosting")
		}
	}

elements.lemon = {
    color: ["#fff700","#e3dc05"],
    behavior: [
		"ST:lemon_branch|ST:lemon_branch|ST:lemon_branch",
		"ST:lemon_branch|XX|ST:lemon_branch",
		"ST:lemon_branch AND M2|ST:lemon_branch AND M1|ST:lemon_branch AND M2",
	],
    reactions: {
		"radiation": { elem1:"explosion", chance:0.1, color1:"#C1D81E" },
		"rock": { elem1:"lemon_juice", chance:0.1 },
		"concrete": { elem1:"lemon_juice", chance:0.1 },
		"basalt": { elem1:"lemon_juice", chance:0.1 },
		"limestone": { elem1:"lemon_juice", chance:0.1 },
		"tuff": { elem1:"lemon_juice", chance:0.1 },
		"water": { elem2:"lemon_juice", chance:0.005 },
		"sugar_water": { elem2:"lemon_juice", chance:0.025 },
		"acid": { elem1:"lemon_juice" },
		"acid_gas": { elem1:"lemon_juice" },
        "sugar": { elem2:null, elem1:"jelly", chance:0.005, tempMin:100, color1:"#acc213" },
	},
    category:"food",
    tempHigh: 256,
	stateHigh: ["steam","smoke","sugar"],
    burn:65,
    burnTime:60,
    burnInto: ["steam", "smoke","sugar"],
    breakInto: "lemon_juice",
    state: "solid",
    density: 1050,
    isFood: true,
}

elements.lemon_seed = {
    color: "#d1d18c",
	tempHigh: 100,
	stateHigh: "dead_plant",
	tempLow: -2,
	stateLow: "frozen_plant",
	burn:50,
	burnTime:20,
	breakInto: null,
	category:"life",
	state: "solid",
	density: 1400,
	cooldown: defaultCooldown,
	seed: true,
    tick: function(pixel) {
		if (!tryMove(pixel,pixel.x,pixel.y+1)) {
			if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100 && isEmpty(pixel.x, pixel.y-1)) {
				changePixel(pixel,"wood")
                createPixel("lemon_branch",pixel.x, pixel.y-1)
                if (isEmpty(pixel.x, pixel.y-2)) {
                    createPixel("lemon_branch",pixel.x, pixel.y-2)
                }
			}
			else if (pixel.age > 1000 && Math.random() < 0.05) {
				changePixel(pixel,"wood");
				pixel.color = pixelColorPick(pixel, pixel.wc);
			}
			pixel.age++;
		}
		doDefaults(pixel);
	},
	properties: {
		"age":0
	},
}

elements.lemon_branch = {
    color: "#a0522d",
	behavior: behaviors.WALL,
	renderer: renderPresets.WOODCHAR,
	movable: false,
	tempHigh: 100,
	stateHigh: "wood",
	tempLow: -30,
	stateLow: "wood",
	category: "life",
	burn: 2,
	burnTime: 300,
	burnInto: ["sap","ember","charcoal","smoke"],
	hidden: true,
	state: "solid",
	density: 1500,
	hardness: 0.15,
	breakInto: ["sap","sawdust"],
	seed: "lemon_seed",
	forceSaveColor: true,
    tick: function(pixel) {
		if (!pixel.burning) {
			if (!pixel.lc) { pixel.lc = "#00bf00" }
			if (!pixel.wc) { pixel.wc = "#a0522d" }
			if (isEmpty(pixel.x-1,pixel.y-1) && Math.random() < 0.02) {
				if (Math.random() < 0.5) {
                    if (Math.random() > 0.7) {
					    createPixel("lemon",pixel.x-1,pixel.y-1);
				    }
                    else {
					    createPixel("plant",pixel.x-1,pixel.y-1);
					    pixelMap[pixel.x-1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x-1][pixel.y-1], pixel.lc);
                    }
				}
				else {
					createPixel("lemon_branch",pixel.x-1,pixel.y-1);
					pixelMap[pixel.x-1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x-1][pixel.y-1], pixel.wc);
					pixelMap[pixel.x-1][pixel.y-1].wc = pixel.wc;
					pixelMap[pixel.x-1][pixel.y-1].lc = pixel.lc;
				}
			}
			if (isEmpty(pixel.x+1,pixel.y-1) && Math.random() < 0.02) {
				if (Math.random() < 0.5) {
                    if (Math.random() > 0.7) {
					    createPixel("lemon",pixel.x+1,pixel.y-1);
				    }
                    else {
					    createPixel("plant",pixel.x+1,pixel.y-1);
					    pixelMap[pixel.x+1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x+1][pixel.y-1], pixel.lc);
                    }
				}
				else {
					createPixel("lemon_branch",pixel.x+1,pixel.y-1);
					pixelMap[pixel.x+1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x+1][pixel.y-1], pixel.wc);
					pixelMap[pixel.x+1][pixel.y-1].wc = pixel.wc;
					pixelMap[pixel.x+1][pixel.y-1].lc = pixel.lc;
				}
			}
			if (isEmpty(pixel.x,pixel.y-1) && Math.random() < 0.02) {
				if (Math.random() < 0.8) {
                    if (Math.random() > 0.8) {
					    createPixel("lemon",pixel.x,pixel.y-1);
				    }
                    else {
					    createPixel("plant",pixel.x,pixel.y-1);
					    pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1], pixel.lc);
                    }
				}
				else {
					createPixel("lemon_branch",pixel.x,pixel.y-1);
					pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1], pixel.wc);
					pixelMap[pixel.x][pixel.y-1].wc = pixel.wc;
					pixelMap[pixel.x][pixel.y-1].lc = pixel.lc;
				}
			}
		}
		doDefaults(pixel);
	},
}

elements.lemon_juice = {
    color: "#C1D81E",
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    reactions: {
		"seltzer": { elem1:"sprite", elem2:"sprite", chance:0.1 },
		"sugar_water": { elem1:"lemonade", elem2:"lemonade", chance:0.1 },
	},
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    tempLow: 0,
    stateLow:"juice_ice",
    stateLowColor:"#d1e82a"
}

elements.lemonade = {
	color: "#ccdb5a",
	behavior: behaviors.LIQUID,
	reactions: {
		"seltzer": { elem1: "sprite", elem2: "sprite" },
		"carbon_dioxide": { elem1: "sprite", elem2: "foam", color1:"#c1d149" },
		"sugar": { elem2:null, chance:0.005},
        "frosting": { elem1:"fremonade", elem2:"fremonade", chance:0.1 },
	},
	tempHigh: 160,
	stateHigh: ["steam","sugar"],
	tempLow: -10,
	stateLowColorMultiplier: 1.1,
	category: "liquids",
	state: "liquid",
	density: 1054,
	stain: 0.05,
	isFood: true
}

elements.fremonade = {
	color: ["#efe7a7","#efe7a7","#efe7a7","#d5ce90","#efe7a7"],
	behavior: behaviors.LIQUID,
	reactions: {
		"seltzer": { elem1: "sprite", elem2: "sprite" },
		"carbon_dioxide": { elem1: "sprite", elem2: "foam", color1:"#c1d149" },
		"sugar": { elem2:null, chance:0.005},
        "flame_juice": { elem1:"flemon_juice", elem2:"flemon_juice" },
		"frosting": { elem2:"fremonade", chance:0.005},
		"lemonade": { elem2:"fremonade", chance:0.005},
	},
    hidden: true,
	tempHigh: 160,
	stateHigh: ["steam","sugar"],
	tempLow: -10,
	stateLowColorMultiplier: 1.1,
	category: "liquids",
	state: "liquid",
	density: 1254,
	stain: 0.075,
    viscosity:1500,
	isFood: true
}

if (!elements.lamp_oil.reactions) { elements.lamp_oil.reactions = {}; }
elements.lamp_oil.reactions.alcohol = { elem1:"lighter_fluid", elem2:"lighter_fluid" }

if (!elements.alcohol.reactions) { elements.alcohol.reactions = {}; }
elements.alcohol.reactions.lamp_oil = { elem1:"lighter_fluid", elem2:"lighter_fluid" }
elements.alcohol.reactions.bromine = { elem1:"brine", elem2:"brine" }

elements.lighter_fluid = {
    color: "#b3b38b",
	behavior: behaviors.LIQUID,
	tick: function(pixel) {
		if (pixel.temp > 500 && !pixel.burning) {
			pixel.burning = true;
			pixel.burnStart = pixelTicks;
		}
	},
	reactions: {
		"glue": {elem2:null, chance:0.05},
		"wax": {elem2:null, chance:0.005},
		"melted_wax": {elem2:null, chance:0.025},
		"dirt": { elem1:null, elem2:"mud" },
		"steam": { burning1:true, elem2:"explosion" },
        "apple_juice": { elem1:"flame_juice", elem2:"flame_juice" }
	},
	category: "liquids",
	stateHigh: "fire",
	burn: 5,
	burnTime: 25,
	burnInto: ["carbon_dioxide","fire","fire","fire","fire","fire"],
	viscosity: 3,
	state: "liquid",
	density: 800,
	tempHigh: 600,
	fireColor: ["#00ffff","#00ffdd"],
}

elements.apple = {
    color: ["#a32d2d","#8b0202","#a32d2d","#8b0202","#a32d2d","#8b0202","#a32d2d","#8b0202","#7ab000"],
    behavior: [
		"ST:apple_branch|ST:apple_branch|ST:apple_branch",
		"ST:apple_branch|XX|ST:apple_branch",
		"ST:apple_branch AND M2|ST:apple_branch AND M1|ST:apple_branch AND M2",
	],
    reactions: {
		"rock": { elem1:"apple_juice", chance:0.1 },
		"concrete": { elem1:"apple_juice", chance:0.1 },
		"basalt": { elem1:"apple_juice", chance:0.1 },
		"limestone": { elem1:"apple_juice", chance:0.1 },
		"tuff": { elem1:"apple_juice", chance:0.1 },
		"water": { elem2:"apple_juice", chance:0.005 },
		"sugar_water": { elem2:"apple_juice", chance:0.025 },
		"acid": { elem1:"apple_juice" },
		"acid_gas": { elem1:"apple_juice" },
        "sugar": { elem2:null, elem1:"jelly", chance:0.005, tempMin:100, color1:"#e0d479" },
	},
    category:"food",
    tempHigh: 256,
	stateHigh: ["steam","smoke","sugar"],
    burn:65,
    burnTime:60,
    burnInto: ["steam", "smoke","sugar"],
    breakInto: ["apple_juice","apple_juice","apple_juice","apple_juice","apple_juice","apple_juice","apple_juice","apple_juice","apple_juice","apple_juice","apple_juice","apple_juice","apple_juice","apple_juice","apple_juice","apple_juice","apple_juice","apple_juice","apple_juice","apple_juice","apple_juice","apple_juice","apple_juice","apple_juice","apple_juice","apple_juice","apple_juice","apple_juice","apple_seed"],
    state: "solid",
    density: 1050,
    isFood: true,
}

elements.apple_seed = {
    color: "#291d07",
	tempHigh: 100,
	stateHigh: "dead_plant",
	tempLow: -2,
	stateLow: "frozen_plant",
	burn:50,
	burnTime:20,
	category:"life",
	state: "solid",
	density: 1400,
	cooldown: defaultCooldown,
    hardness: 0.1,
	breakInto: [null,null,null,null,null,null,null,null,null,null,null,null,"sawdust","dust","dust","dust","dust","dust","cyanide"],
	seed: true,
    tick: function(pixel) {
		if (!tryMove(pixel,pixel.x,pixel.y+1)) {
			if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100 && isEmpty(pixel.x, pixel.y-1)) {
				changePixel(pixel,"wood")
                createPixel("apple_branch",pixel.x, pixel.y-1)
                if (isEmpty(pixel.x, pixel.y-2)) {
                    createPixel("apple_branch",pixel.x, pixel.y-2)
                }
			}
			else if (pixel.age > 1000 && Math.random() < 0.05) {
				changePixel(pixel,"wood");
				pixel.color = pixelColorPick(pixel, pixel.wc);
			}
			pixel.age++;
		}
		doDefaults(pixel);
	},
	properties: {
		"age":0
	},
}

elements.apple_branch = {
    color: "#a0522d",
	behavior: behaviors.WALL,
	renderer: renderPresets.WOODCHAR,
	movable: false,
	tempHigh: 100,
	stateHigh: "wood",
	tempLow: -30,
	stateLow: "wood",
	category: "life",
	burn: 2,
	burnTime: 300,
	burnInto: ["sap","ember","charcoal","smoke"],
	hidden: true,
	state: "solid",
	density: 1500,
	hardness: 0.15,
	breakInto: ["sap","sawdust"],
	seed: "apple_seed",
	forceSaveColor: true,
    tick: function(pixel) {
		if (!pixel.burning) {
			if (!pixel.lc) { pixel.lc = "#00bf00" }
			if (!pixel.wc) { pixel.wc = "#a0522d" }
			if (isEmpty(pixel.x-1,pixel.y-1) && Math.random() < 0.02) {
				if (Math.random() < 0.5) {
                    if (Math.random() > 0.7) {
					    createPixel("apple",pixel.x-1,pixel.y-1);
				    }
                    else {
					    createPixel("plant",pixel.x-1,pixel.y-1);
					    pixelMap[pixel.x-1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x-1][pixel.y-1], pixel.lc);
                    }
				}
				else {
					createPixel("apple_branch",pixel.x-1,pixel.y-1);
					pixelMap[pixel.x-1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x-1][pixel.y-1], pixel.wc);
					pixelMap[pixel.x-1][pixel.y-1].wc = pixel.wc;
					pixelMap[pixel.x-1][pixel.y-1].lc = pixel.lc;
				}
			}
			if (isEmpty(pixel.x+1,pixel.y-1) && Math.random() < 0.02) {
				if (Math.random() < 0.5) {
                    if (Math.random() > 0.7) {
					    createPixel("apple",pixel.x+1,pixel.y-1);
				    }
                    else {
					    createPixel("plant",pixel.x+1,pixel.y-1);
					    pixelMap[pixel.x+1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x+1][pixel.y-1], pixel.lc);
                    }
				}
				else {
					createPixel("apple_branch",pixel.x+1,pixel.y-1);
					pixelMap[pixel.x+1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x+1][pixel.y-1], pixel.wc);
					pixelMap[pixel.x+1][pixel.y-1].wc = pixel.wc;
					pixelMap[pixel.x+1][pixel.y-1].lc = pixel.lc;
				}
			}
			if (isEmpty(pixel.x,pixel.y-1) && Math.random() < 0.02) {
				if (Math.random() < 0.75) {
                    if (Math.random() > 0.8) {
					    createPixel("apple",pixel.x,pixel.y-1);
				    }
                    else {
					    createPixel("plant",pixel.x,pixel.y-1);
					    pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1], pixel.lc);
                    }
				}
				else {
					createPixel("apple_branch",pixel.x,pixel.y-1);
					pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1], pixel.wc);
					pixelMap[pixel.x][pixel.y-1].wc = pixel.wc;
					pixelMap[pixel.x][pixel.y-1].lc = pixel.lc;
				}
			}
		}
		doDefaults(pixel);
	},
}

elements.apple_juice = {
    color: "#d4c86c",
    behavior: behaviors.LIQUID,
	reactions: {
		"seltzer": { elem1: "soda", elem2: "foam", color1:"#e0d479" },
		"carbon_dioxide": { elem1: "soda", elem2: "foam", color1:"#e0d479" },
		"sugar": { elem2:null, chance:0.005},
        "vinegar": { elem1:"apple_cider", elem2:null, chance:0.00025},
        "lighter_fluid": { elem1:"flame_juice", elem2:"flame_juice" }
	},
	tempHigh: 160,
	stateHigh: ["steam","sugar"],
	tempLow: -10,
	category: "liquids",
	state: "liquid",
	density: 1054,
	stain: 0.05,
	isFood: true,
    stateLow:"juice_ice",
    stateLowColor:"#fcef86"
}

elements.flame_juice = {
    color: ["#fcc333","#fcc333","#fcc333","#fcc333","#fcc333","#fcc333","#ff6b21","#ff6b21","#ffa600","#ffa600","#ffa600","#ff4000"],
    behavior: behaviors.LIQUID,
    hidden: true,
	reactions: {
		"seltzer": { elem1: "soda", elem2: "foam", color1:"#e0d479" },
		"carbon_dioxide": { elem1: "soda", elem2: "foam", color1:"#e0d479" },
		"sugar": { elem2:null, chance:0.005},
        "glue": {elem2:null, chance:0.05},
		"wax": {elem2:null, chance:0.005},
		"melted_wax": {elem2:null, chance:0.025},
		"dirt": { elem1:null, elem2:"mud" },
		"steam": { burning1:true, elem2:"explosion" },
        "fremonade": { elem1:"flemon_juice", elem2:"flemon_juice" },
		"apple_juice": { elem2:"flame_juice", chance:0.005},
		"lighter_fluid": { elem2:"flame_juice", chance:0.005},
	},
    tick: function(pixel) {
		if (pixel.temp > 500 && !pixel.burning) {
			pixel.burning = true;
			pixel.burnStart = pixelTicks;
		}
	},
	tempHigh: 610,
	stateHigh: ["steam","sugar","fire","fire","fire","fire"],
    burn: 5,
	burnTime: 25,
	burnInto: ["carbon_dioxide","fire","fire","fire","fire","fire"],
	tempLow: -10,
	category: "liquids",
	state: "liquid",
	density: 954,
    stateLow:["juice_ice","lighter_fluid"],
    stateLowColor:["#fcc333","#fcc333","#fcc333","#fcc333","#fcc333","#fcc333","#ff6b21","#ff6b21","#ffa600","#ffa600","#ffa600","#ff4000"],
}

elements.flemon_juice = {
    color: ["#fcc333","#fcc333","#fcc333","#fcc333","#fcc333","#fcc333","#fcc333","#fcc333","#fcc333","#fcc333","#fcc333","#ff6b21","#ff6b21","#ffa600","#ffa600","#ffa600","#ff4000"],
    behavior: behaviors.LIQUID,
	reactions: {
		"seltzer": { elem1: "sprite", elem2: "sprite", color1:"#e8b73a", color2:"#e8b73a" },
		"sugar": { elem2:null, chance:0.005},
        "glue": {elem2:null, chance:0.05},
		"wax": {elem2:null, chance:0.005},
		"melted_wax": {elem2:null, chance:0.025},
		"dirt": { elem1:null, elem2:"mud" },
		"steam": { burning1:true, elem2:"explosion" },
		"carbon_dioxide": { elem1: "sprite", elem2: "foam", color1:"#e8b73a" },
        "woke": { elem1: "the_apex", elem2: "the_apex" },
		"flame_juice": { elem2:"flemon_juice", chance:0.005},
		"fremonade": { elem2:"flemon_juice", chance:0.005},
	},
    tick: function(pixel) {
		if (pixel.temp > 500 && !pixel.burning) {
			pixel.burning = true;
			pixel.burnStart = pixelTicks;
		}
	},
	tempHigh: 610,
	stateHigh: ["steam","sugar","steam","sugar","fire","fire","fire","fire"],
    burn: 5,
	burnTime: 250,
	burnInto: ["steam","sugar","carbon_dioxide","fire","fire","fire","fire","fire"],
	tempLow: -10,
	category: "liquids",
	state: "liquid",
	density: 1254,
    viscosity: 1000,
    hidden: true,
    stateLow:["juice_ice","lighter_fluid","ice_cream"],
    stateLowColor:["#fcc333","#fcc333","#fcc333","#fcc333","#fcc333","#fcc333","#fcc333","#fcc333","#fcc333","#fcc333","#fcc333","#fcc333","#ff6b21","#ff6b21","#ffa600","#ffa600","#ffa600","#ff4000"],
}

elements.the_apex = {
    color: ["#f5d7f9","#a577a9","#f5d7f9","#a577a9"],
    colorPattern: [
		"WWRRRWWRRR",
		"WWRRWWWRRW",
		"WRRRWWRRRW",
		"WRRWWWRRWW",
		"RRRWWRRRWW",
		"RRWWWRRWWW",
		"RRWWRRRWWR",
		"RWWWRRWWWR",
		"RWWRRRWWRR",
		"WWWRRWWWRR",
	],
	colorKey: {"R":"#f5d7f9", "W":"#a577a9"},
    behavior: behaviors.LIQUID,
	reactions: {
		"sugar": { elem2:null, chance:0.005},
        "glue": {elem2:null, chance:0.05},
		"wax": {elem2:null, chance:0.005},
		"melted_wax": {elem2:null, chance:0.025},
		"dirt": { elem1:null, elem2:"mud" },
		"steam": { burning1:true, elem2:"explosion" },
		"rock": { elem2: "wet_sand", chance: 0.00035 },
		"limestone": { elem2: "wet_sand", chance: 0.00035 },
		"tuff": { elem2: "wet_sand", color2:"#7a6b5c", chance: 0.00035 },
		"ruins": { elem2: "rock", chance: 0.00035 },
		"mudstone": { elem2: "mud", chance: 0.00035 },
		"fly": { elem2:"dead_bug", chance:0.1, oneway:true },
		"firefly": { elem2:"dead_bug", chance:0.1, oneway:true },
		"bee": { elem2:"dead_bug", chance:0.05, oneway:true },
		"stink_bug": { elem2:"dead_bug", chance:0.1, oneway:true },
        "beverage_of_the_gods": { elem1: "true_beverage_of_the_gods", elem2: "true_beverage_of_the_gods" },
		"woke": { elem2:"the_apex", chance:0.005},
		"flemon_juice": { elem2:"the_apex", chance:0.005},
	},
    tick: function(pixel) {
		if (pixel.temp > 500 && !pixel.burning) {
			pixel.burning = true;
			pixel.burnStart = pixelTicks;
		}
	},
	tempHigh: 610,
	stateHigh: ["steam","sugar","steam","sugar","fire","fire","fire","fire"],
    burn: 50,
	burnTime: 200,
	burnInto: ["steam","sugar","carbon_dioxide","fire","fire","fire","fire","fire"],
	tempLow: -10,
	category: "liquids",
	state: "liquid",
	density: 1254,
    viscosity: 50,
    hidden: true,
    stateLow:["juice_ice","lighter_fluid","ice_cream","ice","ice","crumb"],
    stateLowColor:["#f5d7f9","#a577a9","#f5d7f9","#a577a9"],
}

elements.true_beverage_of_the_gods = {
    color: ["#ba8eb0","#dbbfda","#ba8eb0","#ba8eb0","#dbbfda","#8b5f85"],
    behavior: behaviors.LIQUID,
	reactions: {
		"sugar": { elem2:null, chance:0.005},
        "glue": {elem2:null, chance:0.05},
		"wax": {elem2:null, chance:0.005},
		"melted_wax": {elem2:null, chance:0.025},
		"dirt": { elem1:null, elem2:"mud" },
		"steam": { burning1:true, elem2:"explosion" },
		"rock": { elem2: "wet_sand", chance: 0.00035 },
		"limestone": { elem2: "wet_sand", chance: 0.00035 },
		"tuff": { elem2: "wet_sand", color2:"#7a6b5c", chance: 0.00035 },
		"ruins": { elem2: "rock", chance: 0.00035 },
		"mudstone": { elem2: "mud", chance: 0.00035 },
		"fly": { elem2:"dead_bug", chance:0.1, oneway:true },
		"firefly": { elem2:"dead_bug", chance:0.1, oneway:true },
		"bee": { elem2:"dead_bug", chance:0.05, oneway:true },
		"stink_bug": { elem2:"dead_bug", chance:0.1, oneway:true },
        "petal": { color1:["#CC9978","#CD8C6F","#BE785E","#CC9978","#CD8C6F","#BE785E","#A9D475","#5AF353","#8E5FA5"], tempMin:70, chance:0.01 },
		"pistil": { color1:["#CC9978","#CD8C6F","#BE785E","#CC9978","#CD8C6F","#BE785E","#A9D475","#5AF353","#8E5FA5"], tempMin:70, chance:0.01 },
		"potato": { color1:"#DFD0CB", tempMin:70, chance:0.05 },
		"melted_cheese": { color1:"#dbc469", tempMin:70, chance:0.05 },
		"beans": { color1:"#db9769", tempMin:70, chance:0.05 },
		"wheat": { color1:"#dbbd8a", tempMin:70, chance:0.05 },
		"kelp": { color1:"#7dba57", tempMin:70, chance:0.05 },
		"tomato": { color1:"#F9A24E", tempMin:70, chance:0.05 },
		"sauce": { color1:"#F9A24E", tempMin:70, chance:0.05 },
		"ketchup": { color1:"#F9A24E", tempMin:70, chance:0.05 },
		"mushroom_stalk": { color1:["#CC9978","#CD8C6F","#BE785E"], tempMin:70, chance:0.05 },
		"mushroom_cap": { color1:["#CC9978","#CD8C6F","#BE785E"], tempMin:70, chance:0.05 },
		"mushroom_gill": { color1:["#CC9978","#CD8C6F","#BE785E"], tempMin:70, chance:0.05 },
		"hyphae": { color1:["#CC9978","#CD8C6F","#BE785E"], tempMin:70, chance:0.05 },
		"sand": { elem1:null, elem2:"wet_sand" },
		"coral": { elem2:null, chance:0.01 },
		"beverage_of_the_gods": { elem2:"true_beverage_of_the_gods", chance:0.005},
		"the_apex": { elem2:"true_beverage_of_the_gods", chance:0.005},
	},
	tempHigh: 180,
	stateHigh: ["steam","sugar","steam","sugar","smoke","smoke","smoke","smoke","steam","sugar","steam","sugar","fire","fire","fire","fire","steam","steam","carbon_dioxide","sugar","alcohol","carbon_dioxide","sugar","smoke","carbon_dioxide","steam","steam","steam","steam","salt","carbon_dioxide","methane","steam","salt","sugar","smoke","sugar","steam","bubble","cream","cream","sugar"],
	tempLow: -7.5,
	category: "liquids",
	state: "liquid",
	density: 1254,
    viscosity: 25,
    hidden: true,
    stateLow:["juice_ice","lighter_fluid","ice_cream","ice","ice","crumb","juice_ice","lighter_fluid","ice_cream","ice","ice","crumb","bbq_ice","bbq_ice","sugar_ice","juice_ice","ice_cream","ice_cream","leagamen_ice","leagamen_ice","leagamen_ice","leagamen_ice","leagamen_ice","smoke"],
    stateLowColor:["#ba8eb0","#dbbfda","#ba8eb0","#ba8eb0","#dbbfda","#8b5f85"],
}

if (!elements.magnesium.reactions) { elements.magnesium.reactions = {}; }
elements.magnesium.reactions.water = { elem1:"hydrogen", elem2:"electrolyte_water", chance:0.01 }
elements.magnesium.reactions.sugar_water = { elem1:"hydrogen", elem2:"gatorade", color2:"#98abd4", chance:0.025 }

if (!elements.calcium.reactions) { elements.calcium.reactions = {}; }
elements.calcium.reactions.water = { elem1:["slaked_lime","pop","slaked_lime","pop","hydrogen","hydrogen","bubble"], elem2:["hydrogen","bubble","electrolyte_water","electrolyte_water"], chance:0.005, temp2:350 }
elements.calcium.reactions.sugar_water = { elem1:["slaked_lime","pop","slaked_lime","pop","hydrogen","hydrogen","bubble"], elem2:["bubble","gatorade","gatorade"], color2:"#98abd4", chance:0.01, temp2:350 }

elements.electrolyte_water = {
	color: "#98abd4",
	behavior: behaviors.LIQUID,
	tempHigh: 105,
	stateHigh: ["steam","steam","steam","steam","steam","steam","salt","salt","salt","magnesium","calcium","sodium"],
	tempLow: -5,
	stateLowName: "electrolyte_ice",
	category: "liquids",
	reactions: {
		"dust": { elem1: "dirty_water", elem2: null },
		"ash": { elem1: "dirty_water", elem2: null },
		"carbon_dioxide": { elem1: "soda", color1:"#98abd4", elem2: null },
		"cyanide": { elem1: "dirty_water", elem2: null },
		"sulfur": { elem1: "dirty_water", elem2: null },
		"charcoal": { elem1: "dirty_water", chance:0.005 },
		"rat": { elem1: "dirty_water", chance:0.005 },
		"infection": { elem1: "dirty_water", elem2: null },
		"plague": { elem1: "dirty_water", elem2: null },
		"fallout": { elem1: "dirty_water", chance:0.25 },
		"radiation": { elem1: "dirty_water", chance:0.25 },
		"rust": { elem1: "dirty_water", chance:0.005 },
		"lead": { elem1: "dirty_water", chance:0.005 },
		"solder": { elem1: "dirty_water", chance:0.005 },
		"rock": { elem2: "wet_sand", chance: 0.0004 },
		"limestone": { elem2: "wet_sand", chance: 0.0004 },
		"fly": { elem2:"dead_bug", chance:0.1, oneway:true },
		"firefly": { elem2:"dead_bug", chance:0.1, oneway:true },
		"bee": { elem2:"dead_bug", chance:0.05, oneway:true },
		"stink_bug": { elem2:"dead_bug", chance:0.1, oneway:true },
		"uranium": { elem1: "dirty_water", chance:0.25 },
		"sugar_water": { elem1:"gatorade", elem2:"gatorade", color1:"#98abd4", color2:"#98abd4", chance:0.1 },
        "juice": { elem1:"gatorade", elem2:"gatorade", color1:"#ddc860", color2:"#ddc860", chance:0.1 },
        "apple_juice": { elem1:"gatorade", elem2:"gatorade", color1:"#ddc860", color2:"#ddc860", chance:0.1 },
        "lemon_juice": { elem1:"gatorade", elem2:"gatorade", color1:"#d6ee58", color2:"#d6ee58", chance:0.1 },
        "lime_juice": { elem1:"gatorade", elem2:"gatorade", color1:"#d2ec4b", color2:"#d2ec4b", chance:0.1 },
		// electrolysis:
		"aluminum": { elem1:["hydrogen","hydrogen","oxygen","hydrogen","hydrogen","oxygen","salt","salt","salt","magnesium","calcium","sodium"], charged:true, chance:0.0025 },
		"zinc": { elem1:["hydrogen","hydrogen","oxygen","hydrogen","hydrogen","oxygen","salt","salt","salt","magnesium","calcium","sodium"], charged:true, chance:0.015 },
		"steel": { elem1:["hydrogen","hydrogen","oxygen","hydrogen","hydrogen","oxygen","salt","salt","salt","magnesium","calcium","sodium"], charged:true, chance:0.0125 },
		"iron": { elem1:["hydrogen","hydrogen","oxygen","hydrogen","hydrogen","oxygen","salt","salt","salt","magnesium","calcium","sodium"], charged:true, chance:0.0125 },
		"tin": { elem1:["hydrogen","hydrogen","oxygen","hydrogen","hydrogen","oxygen","salt","salt","salt","magnesium","calcium","sodium"], charged:true, chance:0.01 },
		"brass": { elem1:["hydrogen","hydrogen","oxygen","hydrogen","hydrogen","oxygen","salt","salt","salt","magnesium","calcium","sodium"], charged:true, chance:0.001 },
		"bronze": { elem1:["hydrogen","hydrogen","oxygen","hydrogen","hydrogen","oxygen","salt","salt","salt","magnesium","calcium","sodium"], charged:true, chance:0.001 },
		"copper": { elem1:["hydrogen","hydrogen","oxygen","hydrogen","hydrogen","oxygen","salt","salt","salt","magnesium","calcium","sodium"], charged:true, chance:0.0075 },
		"silver": { elem1:["hydrogen","hydrogen","oxygen","hydrogen","hydrogen","oxygen","salt","salt","salt","magnesium","calcium","sodium"], charged:true, chance:0.0075 },
		"gold": { elem1:["hydrogen","hydrogen","oxygen","hydrogen","hydrogen","oxygen","salt","salt","salt","magnesium","calcium","sodium"], charged:true, chance:0.0075 },
	},
	hidden: true,
	state: "liquid",
	density: 1158,
	conduct: 0.5,
	stain: -0.25,
	extinguish: true
}

elements.gatorade = {
	color: "#d9323e",
	behavior: behaviors.LIQUID,
	tempHigh: 105,
	stateHigh: ["steam","steam","steam","steam","steam","steam","salt","sugar","sugar","magnesium","calcium","salt"],
	tempLow: -5,
	stateLowName: "gatorade_ice",
	category: "liquids",
	reactions: {
		"dust": { elem1: "dirty_water", elem2: null },
		"ash": { elem1: "dirty_water", elem2: null },
		"carbon_dioxide": { elem1: "soda", color1:"#c23c46", elem2: null },
		"cyanide": { elem1: "dirty_water", elem2: null },
		"sulfur": { elem1: "dirty_water", elem2: null },
		"charcoal": { elem1: "dirty_water", chance:0.005 },
		"rat": { elem1: "dirty_water", chance:0.005 },
		"infection": { elem1: "dirty_water", elem2: null },
		"plague": { elem1: "dirty_water", elem2: null },
		"fallout": { elem1: "dirty_water", chance:0.25 },
		"radiation": { elem1: "dirty_water", chance:0.25 },
		"rust": { elem1: "dirty_water", chance:0.005 },
		"lead": { elem1: "dirty_water", chance:0.005 },
		"solder": { elem1: "dirty_water", chance:0.005 },
		"rock": { elem2: "wet_sand", chance: 0.0004 },
		"limestone": { elem2: "wet_sand", chance: 0.0004 },
		"fly": { elem2:"dead_bug", chance:0.1, oneway:true },
		"firefly": { elem2:"dead_bug", chance:0.1, oneway:true },
		"bee": { elem2:"dead_bug", chance:0.05, oneway:true },
		"stink_bug": { elem2:"dead_bug", chance:0.1, oneway:true },
		"uranium": { elem1: "dirty_water", chance:0.25 },
        "mashed_potato": { elem1: "tatorade", elem2: "tatorade" },
		// electrolysis:
		"aluminum": { elem1:["hydrogen","hydrogen","oxygen","hydrogen","hydrogen","oxygen","salt","sugar","sugar","magnesium","calcium","salt"], charged:true, chance:0.0025 },
		"zinc": { elem1:["hydrogen","hydrogen","oxygen","hydrogen","hydrogen","oxygen","salt","sugar","sugar","magnesium","calcium","salt"], charged:true, chance:0.015 },
		"steel": { elem1:["hydrogen","hydrogen","oxygen","hydrogen","hydrogen","oxygen","salt","sugar","sugar","magnesium","calcium","salt"], charged:true, chance:0.0125 },
		"iron": { elem1:["hydrogen","hydrogen","oxygen","hydrogen","hydrogen","oxygen","salt","sugar","sugar","magnesium","calcium","salt"], charged:true, chance:0.0125 },
		"tin": { elem1:["hydrogen","hydrogen","oxygen","hydrogen","hydrogen","oxygen","salt","sugar","sugar","magnesium","calcium","salt"], charged:true, chance:0.01 },
		"brass": { elem1:["hydrogen","hydrogen","oxygen","hydrogen","hydrogen","oxygen","salt","sugar","sugar","magnesium","calcium","salt"], charged:true, chance:0.001 },
		"bronze": { elem1:["hydrogen","hydrogen","oxygen","hydrogen","hydrogen","oxygen","salt","sugar","sugar","magnesium","calcium","salt"], charged:true, chance:0.001 },
		"copper": { elem1:["hydrogen","hydrogen","oxygen","hydrogen","hydrogen","oxygen","salt","sugar","sugar","magnesium","calcium","salt"], charged:true, chance:0.0075 },
		"silver": { elem1:["hydrogen","hydrogen","oxygen","hydrogen","hydrogen","oxygen","salt","sugar","sugar","magnesium","calcium","salt"], charged:true, chance:0.0075 },
		"gold": { elem1:["hydrogen","hydrogen","oxygen","hydrogen","hydrogen","oxygen","salt","sugar","sugar","magnesium","calcium","salt"], charged:true, chance:0.0075 },
	},
	state: "liquid",
	density: 1205.5,
	conduct: 0.65,
	extinguish: true
}

elements.tatorade = {
	color: ["#e3d89b","#e3d89b","#E99D99","#E69790","#DF8A68","#e5c09c"],
	behavior: behaviors.LIQUID,
    reactions: {
        "teder": { elem1: "tederade", elem2: "tederade" },
		"mashed_potato": { elem2:"tatorade", chance:0.005},
		"gatorade": { elem2:"tatorade", chance:0.005},
	},
	tempHigh: 202.5,
	stateHigh: ["ash","steam",null,null,null,"ash","steam",null,null,null,"steam","steam","steam","steam","steam","steam","salt","sugar","sugar","magnesium","calcium","salt"],
	burn: 3,
	burnTime: 300,
	burnInto: ["ash","steam","smoke","smoke","smoke","ash","steam","smoke","smoke","smoke","steam","steam","steam","steam","steam","steam","salt","sugar","sugar","magnesium","calcium","salt"],
	category: "food",
	state: "solid",
	density: 675,
	isFood: true,
	hidden: true,
    viscosity: 10000,
},

elements.apple_cider = {
    color: "#C98B44",
    behavior: behaviors.LIQUID,
	reactions: {
		"seltzer": { elem1: "soda", elem2: "foam", color1:"#e0d479" },
		"carbon_dioxide": { elem1: "soda", elem2: "foam", color1:"#e0d479" },
		"sugar": { elem2:null, chance:0.005},
        "tea": { elem1:"teder", elem2:"teder" }
	},
	tempHigh: 160,
	stateHigh: ["steam","sugar"],
	tempLow: -10,
	category: "liquids",
	state: "liquid",
	density: 1054,
	stain: 0.01,
    viscosity: 5,
	isFood: true,
    stateLowColor:"#d19754"
}

if (!elements.tea.reactions) { elements.tea.reactions = {}; }
elements.tea.reactions.apple_cider = { elem1:"teder", elem2:"teder" }

elements.teder = {
    color: ["#AE7739","#D28927"],
    behavior: behaviors.LIQUID,
	reactions: {
		"seltzer": { elem1: "soda", elem2: "foam", color1:"#e0d479" },
		"carbon_dioxide": { elem1: "soda", elem2: "foam", color1:"#e0d479" },
		"sugar": { elem2:null, chance:0.005},
        "stench": { elem2:null },
		"flea": { elem2:null, chance:0.01 },
		"oxygen": { elem2:"fragrance", chance:0.01 },
		"infection": { elem2:"blood", chance:0.005 },
		"plague": { elem2:null, chance:0.004 },
		"sugar": { elem2:null, color1:"#b37017", chance:0.005},
		"honey": { elem2:null, color1:"#b37017", chance:0.005},
		"milk": { elem2:null, color1:"#BE9260", chance:0.005},
		"nut_milk": { elem2:null, color1:"#BE9260", chance:0.005},
		"fruit_milk": { elem2:null, color1:"#BE9260", chance:0.005},
		"chocolate_milk": { elem2:"foam", color1:"#6b4614", chance:0.005},
		"pilk": { elem2:"foam", color1:"#BE9260", chance:0.005},
		"cream": { elem2:null, color1:"#BE9260", chance:0.005},
		"ice_cream": { elem2:null, color1:"#8c5f22", chance:0.005},
		"teder": { elem2:"bubble", color2:["#AE7739","#D28927"], attr2:{"clone":"tea"}, chance:0.001, tempMin:80 },
        "tatorade": { elem1: "tederade", elem2: "tederade" },
		"tea": { elem2:"teder", chance:0.005},
		"apple_cider": { elem2:"teder", chance:0.005},
	},
	tempHigh: 160,
	stateHigh: ["steam","sugar"],
	tempLow: -10,
	category: "liquids",
	state: "liquid",
	density: 1054,
	stain: 0.01,
    viscosity: 5,
	isFood: true,
    hidden: true,
    stateLowColor:["#c9914f","#C9842C"],
}

elements.tederade = {
    color: ["#b7a54e","#b7a54e","#D5C075","#D5C075","#A88C4D","#D5A036"],
    behavior: behaviors.LIQUID,
	reactions: {
		"seltzer": { elem1: "soda", elem2: "foam", color1:"#e0d479" },
		"carbon_dioxide": { elem1: "soda", elem2: "foam", color1:"#e0d479" },
		"sugar": { elem2:null, chance:0.005},
        "stench": { elem2:null },
		"flea": { elem2:null, chance:0.01 },
		"oxygen": { elem2:"fragrance", chance:0.01 },
		"infection": { elem2:"blood", chance:0.005 },
		"plague": { elem2:null, chance:0.004 },
		"sugar": { elem2:null, color1:"#b37017", chance:0.005},
		"honey": { elem2:null, color1:"#b37017", chance:0.005},
		"milk": { elem2:null, color1:"#BE9260", chance:0.005},
		"nut_milk": { elem2:null, color1:"#BE9260", chance:0.005},
		"fruit_milk": { elem2:null, color1:"#BE9260", chance:0.005},
		"chocolate_milk": { elem2:"foam", color1:"#6b4614", chance:0.005},
		"pilk": { elem2:"foam", color1:"#BE9260", chance:0.005},
		"cream": { elem2:null, color1:"#BE9260", chance:0.005},
		"ice_cream": { elem2:null, color1:"#8c5f22", chance:0.005},
		"teder": { elem2:"tederade", chance:0.005},
		"tatorade": { elem2:"tederade", chance:0.005},
		"gravatte": { elem1:"the_final_threshold", elem2:"the_final_threshold" },
	},
	tempHigh: 160,
	stateHigh: ["steam","sugar","steam","sugar","steam","sugar","steam","sugar","steam","sugar","steam","sugar","steam","sugar","steam","sugar","ash","steam",null,null,null,"ash","steam",null,null,null,"steam","steam","steam","steam","steam","steam","salt","sugar","sugar","magnesium","calcium","salt"],
	burn: 3,
	burnTime: 300,
	burnInto: ["steam","sugar","steam","sugar","steam","sugar","steam","sugar","steam","sugar","steam","sugar","steam","sugar","ash","steam","smoke","smoke","smoke","ash","steam","smoke","smoke","smoke","steam","steam","steam","steam","steam","steam","salt","sugar","sugar","magnesium","calcium","salt"],
	category: "liquids",
	state: "liquid",
	density: 1275,
	stain: 0.01,
    viscosity: 5000,
	isFood: true,
    hidden: true,
}

elements.grape_juice = {
	color: "#291824",
	behavior: behaviors.LIQUID,
	reactions: {
		"seltzer": { elem1: "soda", elem2: "foam", color1:"#291824" },
		"carbon_dioxide": { elem1: "soda", elem2: "foam", color1:"#291824" },
		"sugar": { elem2:null, chance:0.005},
		"magma": { elem1:"grava", elem2:"grava" },
	},
	tempHigh: 160,
	stateHigh: ["steam","sugar","grape_powder","grape_powder"],
	tempLow: -10,
	stateLowColorMultiplier: 1.1,
	stateLowName:"grape_ice",
	category: "liquids",
	state: "liquid",
	density: 1054,
	stain: 0.05,
	isFood: true
}

elements.grape_powder = {
	color: "#3E2F3A",
	behavior: behaviors.POWDER,
	reactions: {
		"seltzer": { elem2: "soda", elem1: "foam", color1:"#291824" },
		"water": { elem1:null, elem2:"grape_juice" },
		"magma": { elem1:"grava", elem2:"grava" },
	},
	temp: 90,
	tempHigh: 1500,
	stateHigh: ["carbon_dioxide","smoke","smoke"],
	category: "powders",
	state: "solid",
	density: 954,
	isFood: true,
	hidden:true
}

if (!elements.magma.reactions) { elements.magma.reactions = {}; }
elements.magma.reactions.grape_juice = { elem1:"grava", elem2:"grava" }
elements.magma.reactions.grape_powder = { elem1:"grava", elem2:"grava" }

elements.grava = {
	color: ["#453f48","#453f48","#f4ed56","#453f48","#453f48"],
	behavior: behaviors.MOLTEN,
	renderer: renderPresets.MOLTEN,
	reactions: {
		"seltzer": { elem2: "soda", elem1: "foam", color1:["#453f48","#453f48","#f4ed56","#453f48","#453f48"] },
		"water": { elem2:"grape_juice" },
		"ice": { elem1: ["basalt","grape_ice"] },
		"ash": { elem1: "molten_tuff", "elem2":null, tempMin:800 },
		"molten_ash": { elem1: "molten_tuff", "elem2":null, tempMin:800 },
		"charcoal": { elem2:"diamond", tempMin:800, tempMax:900, chance:0.005, oneway:true },
		"grape_powder": { elem2:"grava", chance:0.005},
		"grape_juice": { elem2:"grava", chance:0.005},
		"magma": { elem2:"grava", chance:0.005},
		"papatte": { elem1:"gravatte", elem2:"gravatte" },
	},
	temp: 90,
	tempLow: -10,
	stateLow: ["basalt","basalt","basalt","rock","grape_ice","grape_ice","grape_ice","grape_ice"],
	viscosity: 10000,
	category: "liquids",
	state: "liquid",
	density: 2925,
	alias: "grape lava",
	hidden: true,
}

elements.papaya = {
    color: ["#adc025","#adc025","#80ac3e","#86af3a","#416f0b","#416f0b","#344507"],
    behavior: [
		"ST:papaya_branch|ST:papaya_branch|ST:papaya_branch",
		"ST:wood|XX|ST:wood",
		"M2|M1|M2",
	],
    reactions: {
		"acid": { elem1:["papaya_meat","papaya_meat","papaya_meat","papaya_meat","papaya_seed"] },
		"acid_gas": { elem1:["papaya_meat","papaya_meat","papaya_meat","papaya_meat","papaya_seed"] },
        "sugar": { elem2:null, elem1:"jelly", chance:0.005, tempMin:100, color1:"#e0d479" },
		"latte": { elem1:"papatte", elem2:"papatte", chance:0.025 },
	},
    category:"food",
    tempHigh: 256,
	stateHigh: ["steam","smoke","sugar"],
    burn:65,
    burnTime:60,
    burnInto: ["steam", "smoke","sugar"],
    breakInto: ["papaya_meat","papaya_meat","papaya_meat","papaya_meat","papaya_seed"],
    state: "solid",
    density: 1050,
    isFood: true,
}

elements.papaya_seed = {
    color: ["#220b00","#231302","#220700"],
	tempHigh: 100,
	stateHigh: "dead_plant",
	tempLow: -2,
	stateLow: "frozen_plant",
	burn:50,
	burnTime:20,
	category:"life",
	state: "solid",
	density: 1400,
	cooldown: defaultCooldown,
    hardness: 0.1,
	breakInto: null,
	seed: true,
	behavior: [
		"XX|M2%1|XX",
		"XX|L2:wood AND C2:papaya_branch%10|XX",
		"XX|M1|XX",
	],
    tick: behaviors.SEEDRISE,
	properties: {
		"age":0
	},
}

elements.papaya_branch = {
    color: "#00bf00",
	behavior: behaviors.WALL,
	renderer: renderPresets.WOODCHAR,
	movable: false,
	tempHigh: 100,
	stateHigh: "dead_plant",
	tempLow: -30,
	stateLow: "frozen_plant",
	category: "life",
	burn: 2,
	burnTime: 100,
	burnInto: ["dead_plant","dead_plant","fire"],
	hidden: true,
	state: "solid",
	density: 1200,
	hardness: 0.15,
	breakInto: "dead_plant",
	seed: "papaya_seed",
	forceSaveColor: true,
    tick: function(pixel) {
		if (!pixel.lc) { pixel.lc = "#00bf00" }
		if (!pixel.wc) { pixel.wc = "#00bf00" }
		if (isEmpty(pixel.x+1,pixel.y)) {
			if (Math.random() < 0.45) {
				createPixel("plant",pixel.x+1,pixel.y);
				pixelMap[pixel.x+1][pixel.y].color = pixelColorPick(pixelMap[pixel.x+1][pixel.y], pixel.lc);
				if (isEmpty(pixel.x+2,pixel.y+1)) {
					createPixel("plant",pixel.x+2,pixel.y+1);
					pixelMap[pixel.x+2][pixel.y+1].color = pixelColorPick(pixelMap[pixel.x+2][pixel.y-1], pixel.lc);
				};
			}
			else {
				createPixel("papaya_branch",pixel.x+1,pixel.y);
				pixelMap[pixel.x+1][pixel.y].color = pixelColorPick(pixelMap[pixel.x+1][pixel.y], pixel.wc);
				pixelMap[pixel.x+1][pixel.y].wc = pixel.wc;
				pixelMap[pixel.x+1][pixel.y].lc = pixel.lc;
			}
		}
		if (isEmpty(pixel.x-1,pixel.y)) {
			if (Math.random() < 0.45) {
				createPixel("plant",pixel.x-1,pixel.y);
				pixelMap[pixel.x-1][pixel.y].color = pixelColorPick(pixelMap[pixel.x-1][pixel.y], pixel.lc);
				if (isEmpty(pixel.x-2,pixel.y+1)) {
					createPixel("plant",pixel.x-2,pixel.y+1);
					pixelMap[pixel.x-2][pixel.y+1].color = pixelColorPick(pixelMap[pixel.x-2][pixel.y-1], pixel.lc);
				}
			}
			else {
				createPixel("papaya_branch",pixel.x-1,pixel.y);
				pixelMap[pixel.x-1][pixel.y].color = pixelColorPick(pixelMap[pixel.x+1][pixel.y], pixel.wc);
				pixelMap[pixel.x-1][pixel.y].wc = pixel.wc;
				pixelMap[pixel.x-1][pixel.y].lc = pixel.lc;
			}
		}
		if (isEmpty(pixel.x,pixel.y+1)) {
			if (!isEmpty(pixel.x-1,pixel.y+1) && !outOfBounds(pixel.x-1,pixel.y+1)) {
				var trunk = pixelMap[pixel.x-1][pixel.y+1]
				if (elements[trunk.element].id === elements.wood.id) {
					createPixel("papaya",pixel.x,pixel.y+1)
				}
			}
			if (!isEmpty(pixel.x+1,pixel.y+1) && !outOfBounds(pixel.x+1,pixel.y+1)) {
				var trunk = pixelMap[pixel.x+1][pixel.y+1]
				if (elements[trunk.element].id === elements.wood.id) {
					createPixel("papaya",pixel.x,pixel.y+1)
				}
			}
		}
		if (isEmpty(pixel.x,pixel.y+2)) {
			if (!isEmpty(pixel.x-1,pixel.y+2) && !outOfBounds(pixel.x+1,pixel.y-2)) {
				var trunk = pixelMap[pixel.x-1][pixel.y+2]
				if (elements[trunk.element].id === elements.wood.id) {
					createPixel("papaya",pixel.x,pixel.y+2)
				}
			}
			if (!isEmpty(pixel.x+1,pixel.y+2) && !outOfBounds(pixel.x+1,pixel.y+2)) {
				var trunk = pixelMap[pixel.x+1][pixel.y+2]
				if (elements[trunk.element].id === elements.wood.id) {
					createPixel("papaya",pixel.x,pixel.y+2)
				}
			}
		}
		doDefaults(pixel);
	},
}

elements.papaya_meat = {
    color: ["#E56717","#ea7127","#eea660","#E56717","#ea7127"],
    behavior: behaviors.LIQUID,
	reactions: {
		"seltzer": { elem2:"soda", color2:"#F39E0A", chance:0.00025 },
		"latte": { elem1:"papatte", elem2:"papatte" },
	},
	tempHigh: 260,
	stateHigh: ["steam","sugar","dead_plant"],
	breakInto: "juice",
	breakIntoColor:"#EE8C0F",
	category: "food",
	state: "solid",
	density: 1054,
	stain: 0.0025,
	isFood: true,
	hidden: true
}

if (!elements.coffee.reactions) { elements.coffee.reactions = {}; }
elements.coffee.reactions.milk = { elem1:"latte", elem2:"foam", color1:"#CA9D68", chance:0.005}
elements.coffee.reactions.nut_milk = { elem1:"latte", elem2:"foam", color1:"#CA9D68", chance:0.005}
elements.coffee.reactions.cream = { elem1:"latte", elem2:"foam", color1:"#CA9D68", chance:0.005}
elements.coffee.reactions.ice_cream = { elem1:"latte", elem2:"foam", color1:"#CA9D68", chance:0.005}
elements.coffee.reactions.fruit_milk = { elem1:"latte", elem2:"foam", color1:"#AF7C59", chance:0.005}
elements.coffee.reactions.chocolate_milk = { elem1:"latte", elem2:"foam", color1:"#604931", chance:0.005}
elements.coffee.reactions.pilk = { elem1:"latte", elem2:"foam", color1:"#AA8B69", chance:0.005}
elements.coffee.reactions.sugar_water = { elem2:"coffee", color2:"#99552A", tempMin:70, chance:0.3 },

elements.latte = {
	color: "#7F5D3E",
	behavior: behaviors.LIQUID,
	reactions: {
		"stench": { elem2:null },
		"oxygen": { elem2:"fragrance", chance:0.01 },
		"sugar": { elem2:null, color1:"#905831", chance:0.005},
		"honey": { elem2:null, color1:"#905831", chance:0.005},
		"pumpkin_seed": { elem2:null, color1:"#74441E", chance:0.005},
		"milk": { elem2:"foam", color1:"#CA9D68", chance:0.0025},
		"nut_milk": { elem2:"foam", color1:"#CA9D68", chance:0.0025},
		"fruit_milk": { elem2:"foam", color1:"#AF7C59", chance:0.0025},
		"chocolate_milk": { elem2:"foam", color1:"#604931", chance:0.0025},
		"pilk": { elem2:"foam", color1:"#AA8B69", chance:0.0025},
		"cream": { elem2:"foam", color1:"#CA9D68", chance:0.0005},
		"ice_cream": { elem2:null, color1:"#CA9D68", chance:0.0025},
		"chocolate": { elem2:null, color1:"#724425", chance:0.005},
		"chocolate_powder": { elem2:null, color1:"#724425", chance:0.005},
		"melted_chocolate": { elem2:null, color1:"#724425", chance:0.005},
		"water": { elem2:"latte", tempMin:70, chance:0.2 },
		"salt_water": { elem2:"latte", tempMin:70, chance:0.2 },
		"sugar_water": { elem2:"melted_chocolate", tempMin:60, chance:0.3 },
		"seltzer": { elem2:"latte", tempMin:70, chance:0.2 },
		"coffee": { elem2:"bubble", color2:"#8a4d3e", attr2:{"clone":"coffee"}, chance:0.001, tempMin:80 },
		"latte": { elem2:"bubble", color2:"#7F5D3E", attr2:{"clone":"latte"}, chance:0.001, tempMin:80 },
		"papaya": { elem1:"papatte", elem2:"papatte", chance:0.01 },
		"papaya_meat": { elem1:"papatte", elem2:"papatte" },
	},
	tempHigh: 130,
	stateHigh: ["steam","cream","fragrance","foam"],
	temp: 70,
	tempLow: -2.5,
	stateLow:["coffee_ice","coffee_ice","coffee_ice","ice_cream"],
	stateLowColor:"#a8886a",
	category:"liquids",
	state: "liquid",
	density: 951.74,
	stain: 0.025,
	hidden: true,
	isFood: true
}

elements.papatte = {
	color: ["#B76229","#B76229","#B76229","#8e4e04","#eea21d","#B76229","#B76229"],
	behavior: behaviors.LIQUID,
	reactions: {
		"stench": { elem2:null },
		"oxygen": { elem2:"fragrance", chance:0.01 },
		"sugar": { elem2:null, color1:"#905831", chance:0.005},
		"honey": { elem2:null, color1:"#905831", chance:0.005},
		"pumpkin_seed": { elem2:null, color1:"#74441E", chance:0.005},
		"milk": { elem2:"foam", color1:"#CA9D68", chance:0.0025},
		"nut_milk": { elem2:"foam", color1:"#CA9D68", chance:0.0025},
		"fruit_milk": { elem2:"foam", color1:"#AF7C59", chance:0.0025},
		"chocolate_milk": { elem2:"foam", color1:"#604931", chance:0.0025},
		"pilk": { elem2:"foam", color1:"#AA8B69", chance:0.0025},
		"cream": { elem2:"foam", color1:"#CA9D68", chance:0.0005},
		"ice_cream": { elem2:null, color1:"#CA9D68", chance:0.0025},
		"chocolate": { elem2:null, color1:"#724425", chance:0.005},
		"chocolate_powder": { elem2:null, color1:"#724425", chance:0.005},
		"melted_chocolate": { elem2:null, color1:"#724425", chance:0.005},
		"seltzer": { elem2:"soda", color2:"#F39E0A", chance:0.00025 },
		"papaya": { elem2:"papatte", chance:0.005},
		"papaya_meat": { elem2:"papatte", chance:0.005},
		"latte": { elem2:"papatte", chance:0.005},
		"coffee": { elem2:"papatte", chance:0.005},
		"grava": { elem1:"gravatte", elem2:"gravatte" },
	},
	tempHigh: 130,
	stateHigh: ["steam","cream","fragrance","foam","sugar","sugar","sugar","steam","steam"],
	temp: 70,
	tempLow: -2.5,
	stateLow:["coffee_ice","coffee_ice","coffee_ice","ice_cream","sugar_ice","sugar_ice","sugar_ice"],
	stateLowColor:"#a8886a",
	category:"liquids",
	state: "liquid",
	density: 951.74,
	stain: 0.025,
	viscosity:100,
	hidden: true,
	isFood: true
}

elements.gravatte = {
	color: "#794F3A",
	behavior: behaviors.LIQUID,
	reactions: {
		"ice": { elem1: ["coffee_ice","coffee_ice","coffee_ice","ice_cream","sugar_ice","sugar_ice","sugar_ice","basalt","basalt","basalt","basalt","grape_ice","grape_ice","grape_ice","grape_ice"] },
		"ash": { elem1: "molten_tuff", "elem2":null, tempMin:800 },
		"molten_ash": { elem1: "molten_tuff", "elem2":null, tempMin:800 },
		"charcoal": { elem2:"diamond", tempMin:800, tempMax:900, chance:0.005, oneway:true },
		"grava": { elem2:"gravatte", chance:0.005},
		"papatte": { elem2:"gravatte", chance:0.005},
		"tederade": { elem1:"the_final_threshold", elem2:"the_final_threshold" },
	},
	temp: 80,
	tempLow: -25,
	stateLow:["coffee_ice","coffee_ice","coffee_ice","ice_cream","sugar_ice","sugar_ice","sugar_ice","basalt","basalt","basalt","rock","grape_ice","grape_ice","grape_ice","grape_ice"],
	stateLowColor:"#a8886a",
	category:"liquids",
	state: "liquid",
	density: 951.74,
	viscosity:1500,
	hidden: true,
	isFood: true
}

elements.the_final_threshold = {
	color: ["#121c27","#121c27","#121c27","#7b98b3","#3f5d75","#39547b","#7b98b3","#3f5d75","#39547b","#7b98b3","#3f5d75","#39547b","#7b98b3","#3f5d75","#39547b","#98a584","#98a584"],
	behavior: behaviors.LIQUID,
	reactions: {
		"ice": { elem1: ["coffee_ice","coffee_ice","coffee_ice","ice_cream","sugar_ice","sugar_ice","sugar_ice","basalt","basalt","basalt","basalt","grape_ice","grape_ice","grape_ice","grape_ice","tederade","tederade","tederade","tederade","tederade","tederade","tederade","tederade","tederade","tederade","tederade","tederade","tederade","tederade"] },
		"ash": { elem1: "molten_tuff", "elem2":null, tempMin:800 },
		"molten_ash": { elem1: "molten_tuff", "elem2":null, tempMin:800 },
		"charcoal": { elem2:"diamond", tempMin:800, tempMax:900, chance:0.005, oneway:true },
		"seltzer": { elem1: "soda", elem2: "foam", color1:"#e0d479" },
		"carbon_dioxide": { elem1: "soda", elem2: "foam", color1:"#e0d479" },
		"sugar": { elem2:null, chance:0.005},
		"honey": { elem2:null, chance:0.005},
		"milk": { elem2:null, chance:0.005},
        "stench": { elem2:null },
		"tederade": { elem2:"the_final_threshold", chance:0.005},
		"gravatte": { elem2:"the_final_threshold", chance:0.005},
		"the_drink_of_the_cosmos": { elem1:"transcendent_potion", elem2:"transcendent_potion" },
	},
	temp: 80,
	tempLow: -25,
	stateLow:["coffee_ice","coffee_ice","coffee_ice","ice_cream","sugar_ice","sugar_ice","sugar_ice","basalt","basalt","basalt","rock","grape_ice","grape_ice","grape_ice","grape_ice","tederade","tederade","tederade","tederade","tederade","tederade","tederade","tederade","tederade","tederade","tederade","tederade","tederade","tederade"],
	stateLowColor:["#121c27","#121c27","#121c27","#7b98b3","#3f5d75","#39547b","#7b98b3","#3f5d75","#39547b","#98a584","#98a584"],
	category:"liquids",
	state: "liquid",
	density: 1151.25,
	viscosity:2500,
	hidden: true,
	isFood: true
}

elements.bromine = {
  color: "#8a1a22",
  behavior: behaviors.LIQUID,
  reactions: {
    "water": { elem2: "dirty_water" },
    "meat": { elem2: "rotten_meat", chance:0.1 },
	"rat": { elem2: "rotten_meat", chance:0.1 },
	"head": { elem2: ["rotten_meat","rotten_meat","bone"], chance:0.1 },
	"body": { elem2: ["rotten_meat","rotten_meat","bone"], chance:0.1 },
	"bird": { elem2: "rotten_meat", chance:0.1 },
	"stinkbug": { elem2: ["stench","dead_bug","dead_bug"], chance:0.1 },
	"fly": { elem2: "dead_bug", chance:0.1 },
	"bee": { elem2: "dead_bug", chance:0.1 },
	"firefly": { elem2: "dead_bug", chance:0.1 },
	"spider": { elem2: "dead_bug", chance:0.1 },
	"flea": { elem2: "dead_bug", chance:0.1 },
	"ant": { elem2: "dead_bug", chance:0.1 },
	"termite": { elem2: "dead_bug", chance:0.1 },
    "potassium": { elem2: "fire" },
    "sodium": { elem2: "fire" },
	"alcohol": { elem1:"brine", elem2:"brine" }
  },
  tempLow: -7,
  tempHigh: 58,
  state: "liquid",
  category: "liquids",
  density: 3102,
  stain: 0.25,
}

elements.brine = {
  color: "#4f0a07",
  behavior: behaviors.LIQUID,
  reactions: {
    "water": { elem2: "dirty_water" },
    "meat": { elem2: "rotten_meat", chance:0.1 },
	"rat": { elem2: "rotten_meat", chance:0.1 },
	"head": { elem2: ["rotten_meat","rotten_meat","bone"], chance:0.1 },
	"body": { elem2: ["rotten_meat","rotten_meat","bone"], chance:0.1 },
	"bird": { elem2: "rotten_meat", chance:0.1 },
	"stinkbug": { elem2: ["stench","dead_bug","dead_bug"], chance:0.1 },
	"fly": { elem2: "dead_bug", chance:0.1 },
	"bee": { elem2: "dead_bug", chance:0.1 },
	"firefly": { elem2: "dead_bug", chance:0.1 },
	"spider": { elem2: "dead_bug", chance:0.1 },
	"flea": { elem2: "dead_bug", chance:0.1 },
	"ant": { elem2: "dead_bug", chance:0.1 },
	"termite": { elem2: "dead_bug", chance:0.1 },
    "potassium": { elem2: "fire" },
    "sodium": { elem2: "fire" },
	"alcohol": { elem1:"brine", elem2:"brine" },
	"virus": { elem2:null },
	"plague": { elem2:null },
	"charcoal": { color1:"#bdbdbd", chance:0.05 },
	"bromine": { elem2:"brine", chance:0.005},
	"alcohol": { elem2:"brine", chance:0.005},
	"money": { elem1:"moneybrine", elem2:"moneybrine" }
  },
  tempLow: -113.88,
  tempHigh: 65,
  stateHigh:["alcohol","bromine_gas"],
  state: "liquid",
  category: "liquids",
  density: 1750,
  stain: 0.01,
}

if (!elements.mercury.reactions) { elements.mercury.reactions = {}; }
elements.mercury.reactions.honey = { elem1:"money", elem2:"money" }

if (!elements.honey.reactions) { elements.honey.reactions = {}; }
elements.honey.reactions.mercury = { elem1:"money", elem2:"money" }

elements.money = {
    color: ["#85bb65","#5e8347","#65bb7d","#b2bb65","#dbffc4"],
    behavior: behaviors.POWDER,
    reactions: {
        "water": { elem1:"cellulose", elem2:null, chance:0.025 },
        "dirty_water": { elem1:"cellulose", elem2:null, chance:0.025 },
        "salt_water": { elem1:"cellulose", elem2:null, chance:0.025 },
        "sugar_water": { elem1:"cellulose", elem2:null, chance:0.025 },
        "seltzer": { elem1:"cellulose", elem2:null, chance:0.025 },
        "soda": { elem1:"cellulose", elem2:null, chance:0.025 },
        "blood": { elem1:"cellulose", elem2:null, chance:0.025 },
        "foam": { elem1:"cellulose", elem2:null, chance:0.025 },
        "bubble": { elem1:"cellulose", elem2:null, chance:0.025 },
        "oil": { elem1:"cellulose", elem2:null, chance:0.025 },
        "alcohol": { elem1:"cellulose", elem2:null, chance:0.025 },
        "vinegar": { elem1:"cellulose", elem2:null, chance:0.025 },
        "light": { stain1:"#ebdfa7" },
        "oxygen": { stain1:"#ebdfa7" },
		"mercury": { elem2:"money", chance:0.005},
		"honey": { elem2:"money", chance:0.005},
		"brine": { elem1:"moneybrine", elem2:"moneybrine" }
    },
    tempHigh: 248,
    stateHigh: ["fire","fire","fire","fire","fire","ash"],
    burn: 70,
    burnTime: 300,
    burnInto: ["fire","fire","fire","fire","fire","ash"],
    category: "powders",
    state: "solid",
    density: 1000,
    breakInto: "confetti",
    breakIntoColor: ["#85bb65","#65bb7d","#b2bb65","#85bb65"]
}

elements.moneybrine = {
  color: ["#4f0a07","#4f0a07","#4f0a07","#4f0a07","#4f0a07","#4f0a07","#4f0a07","#85bb65","#5e8347","#65bb7d","#b2bb65","#dbffc4","#4f0a07","#4f0a07","#4f0a07","#4f0a07","#4f0a07","#4f0a07","#4f0a07"],
  behavior: behaviors.LIQUID,
  reactions: {
    "water": { elem2: "dirty_water" },
    "meat": { elem2: "rotten_meat", chance:0.1 },
	"rat": { elem2: "rotten_meat", chance:0.1 },
	"head": { elem2: ["rotten_meat","rotten_meat","bone"], chance:0.1 },
	"body": { elem2: ["rotten_meat","rotten_meat","bone"], chance:0.1 },
	"bird": { elem2: "rotten_meat", chance:0.1 },
	"stinkbug": { elem2: ["stench","dead_bug","dead_bug"], chance:0.1 },
	"fly": { elem2: "dead_bug", chance:0.1 },
	"bee": { elem2: "dead_bug", chance:0.1 },
	"firefly": { elem2: "dead_bug", chance:0.1 },
	"spider": { elem2: "dead_bug", chance:0.1 },
	"flea": { elem2: "dead_bug", chance:0.1 },
	"ant": { elem2: "dead_bug", chance:0.1 },
	"termite": { elem2: "dead_bug", chance:0.1 },
    "potassium": { elem2: "fire" },
    "sodium": { elem2: "fire" },
	"alcohol": { elem1:"brine", elem2:"brine" },
	"virus": { elem2:null },
	"plague": { elem2:null },
	"money": { elem2:"moneybrine", chance:0.005},
	"brine": { elem2:"moneybrine", chance:0.005},
  },
  tempLow: -113.88,
  stateLow:["brine_ice","money"],
  tempHigh: 65,
  stateHigh:["alcohol","bromine_gas","money","money"],
  state: "liquid",
  category: "liquids",
  density: 2500,
  viscosity:1000
}

elements.soybean = {
    color: ["#cf9c6d","#cf9c6d","#cf9c6d","#9c6848","#9c6848","#8f644d","#5a3121","#8f644d","#9c6848","#9c6848","#cf9c6d","#cf9c6d","#cf9c6d"],
	behavior: [
		"ST:soybean_plant|ST:soybean_plant|ST:soybean_plant",
		"ST:soybean_plant|XX|ST:soybean_plant",
		"ST:soybean_plant AND M2|ST:soybean_plant AND M1|ST:soybean_plant AND M2",
	],
	tempHigh: 150,
	stateHigh: "wood",
	tempLow: -2,
	stateLow: "frozen_plant",
	burn:50,
	burnTime:20,
	breakInto: [null,"flour"],
	breakIntoColor:"#dfc596",
	category:"food",
	state: "solid",
	density: 1400,
	cooldown: defaultCooldown,
	seed: true,
	reactions: {
        "flour": { elem2:null, elem1:"soy_sauce", chance:0.005, tempMin:90 },
	},
    tick: function(pixel) {
		if (!tryMove(pixel,pixel.x,pixel.y+1) && !outOfBounds(pixel.x,pixel.y+1)) {
			if (eLists.SOIL.indexOf(pixelMap[pixel.x][pixel.y+1].element) !== -1) {
				if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100 && isEmpty(pixel.x, pixel.y-1)) {
					changePixel(pixel,"plant")
            	    createPixel("soybean_plant",pixel.x, pixel.y-1)
				}
				else if (pixel.age > 1000 && Math.random() < 0.05) {
					changePixel(pixel,"soybean_plant");
					pixel.color = pixelColorPick(pixel, pixel.wc);
				}
				pixel.age++;
			}
		}
		doDefaults(pixel);
	},
	properties: {
		"age":0
	},
}

elements.soybean_plant = {
    color: "#009100",
	behavior: behaviors.WALL,
    movable: false,
	reactions: {
		"vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
		"baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
		"bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
		"alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
		"mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
		"salt": { elem1:"dead_plant", elem2:null, chance:0.001 },
		"stench": { elem2:null, chance:0.25 },
		"chlorine": { stain1:"#a2bf00" },
	},
	renderer: renderPresets.PLANTCHAR,
	category:"life",
	tempHigh: 100,
	stateHigh: "dead_plant",
	tempLow: -1.66,
	stateLow: "frozen_plant",
	burn:15,
	burnTime:60,
	burnInto: "dead_plant",
	breakInto: "dead_plant",
	state: "solid",
	density: 1050,
	forceSaveColor: true,
    hidden: true,
	seed: "soybean",
    tick: function(pixel) {
		if (!pixel.burning) {
			if (!pixel.lc) { pixel.lc = "#00bf00" }
			if (!pixel.wc) { pixel.wc = "#00bf00" }
			if (isEmpty(pixel.x-1,pixel.y-1) && Math.random() < 0.02) {
				if (Math.random() < 0.65) {
                    if (Math.random() > 0.75) {
					    createPixel("soybean",pixel.x-1,pixel.y-1);
				    }
                    else {
					    createPixel("plant",pixel.x-1,pixel.y-1);
					    pixelMap[pixel.x-1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x-1][pixel.y-1], pixel.lc);
                    }
				}
				else {
					createPixel("soybean_plant",pixel.x-1,pixel.y-1);
					pixelMap[pixel.x-1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x-1][pixel.y-1], pixel.wc);
					pixelMap[pixel.x-1][pixel.y-1].wc = pixel.wc;
					pixelMap[pixel.x-1][pixel.y-1].lc = pixel.lc;
				}
			}
			if (isEmpty(pixel.x+1,pixel.y-1) && Math.random() < 0.02) {
				if (Math.random() < 0.65) {
                    if (Math.random() > 0.75) {
					    createPixel("soybean",pixel.x+1,pixel.y-1);
				    }
                    else {
					    createPixel("plant",pixel.x+1,pixel.y-1);
					    pixelMap[pixel.x+1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x+1][pixel.y-1], pixel.lc);
                    }
				}
				else {
					createPixel("soybean_plant",pixel.x+1,pixel.y-1);
					pixelMap[pixel.x+1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x+1][pixel.y-1], pixel.wc);
					pixelMap[pixel.x+1][pixel.y-1].wc = pixel.wc;
					pixelMap[pixel.x+1][pixel.y-1].lc = pixel.lc;
				}
			}
			if (isEmpty(pixel.x,pixel.y-1) && Math.random() < 0.02) {
				if (Math.random() < 0.8) {
                    if (Math.random() > 0.8) {
					    createPixel("soybean",pixel.x,pixel.y-1);
				    }
                    else {
					    createPixel("plant",pixel.x,pixel.y-1);
					    pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1], pixel.lc);
                    }
				}
				else {
					createPixel("soybean_plant",pixel.x,pixel.y-1);
					pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1], pixel.wc);
					pixelMap[pixel.x][pixel.y-1].wc = pixel.wc;
					pixelMap[pixel.x][pixel.y-1].lc = pixel.lc;
				}
			}
		}
		doDefaults(pixel);
	},
}

elements.soy_sauce = {
    color: "#480601",
    behavior: behaviors.LIQUID,
	reactions: {
		"maple_syrup": { elem1:"soyrup", elem2:"soyrup" },
		"corn_syrup": { elem1:"soyrup", elem2:"soyrup" }
	},
    tempLow: -5,
    tempHigh: 115,
    stateHigh: ["steam","steam","salt"],
    state: "liquid",
    category:"food",
    density: 1200,
}

elements.corn.breakInto = ["flour","flour","flour","corn_starch"]

elements.corn_starch = {
    color: ["#f5f5f1","#f2f3ee","#fcfdfc"],
    behavior: behaviors.POWDER,
    reactions: {
        "water": { elem1: "oobleck", elem2: null },
        "salt_water": { elem1: "oobleck", elem2: null },
        "sugar_water": { elem1: "oobleck", elem2: null },
        "seltzer": { elem1: "oobleck", elem2: null },
        "pool_water": { elem1: "oobleck", elem2: null },
        "juice": { elem1: "oobleck", elem2: null },
        "vinegar": { elem1: "oobleck", elem2: null },
        "yolk": { elem1: "oobleck", elem2: null },
        "yogurt": { elem1: "oobleck", elem2: null },
        "honey": { elem1:"oobleck", elem2:null },
        "molasses": { elem1:"oobleck", elem2:null },
        "sap": { elem1:"oobleck", elem2:null },
        "caramel": { elem1:"oobleck", elem2:null },
        "broth": { elem1:"oobleck", elem2:null },
        "soda": { elem1:"oobleck", elem2:null },
        "tea": { elem1:"oobleck", elem2:null },
        "blood": { elem1:"oobleck", elem2:null },
        "infection": { elem1:"oobleck", elem2:null },
        "antibody": { elem1:"oobleck", elem2:null },
        "milk": { elem1:"oobleck", elem2:null },
        "cream": { elem1:"oobleck", elem2:null },
    },
    category: "food",
    tempHigh: 600,
    stateHigh: "fire",
    burn:20,
    burnTime:15,
    state: "solid",
    density: 680,
    isFood: true
}

elements.oobleck = {
    color: "#8eaae6",
    tick: function(pixel){
        if (pixel.solid === true) {
            if (pixel.start === pixelTicks) {return}
            if (pixel.charge && elements[pixel.element].behaviorOn) {
                pixelTick(pixel);
                return;
            }
            tryMove(pixel,pixel.x,pixel.y+1);
            doDefaults(pixel);
            if (pixel.solidage > 100 && Math.random() > 0.75) {
                pixel.solid = false
                pixel.solidage = 0
            }
            else {
                pixel.solidage ++
            }
        }
        else if (pixel.solid === false) {
            if (pixel.start === pixelTicks) {return}
            if (pixel.charge && elements[pixel.element].behaviorOn) {
                pixelTick(pixel);
                return;
            }
            var viscMove = true;
        if (elements[pixel.element].viscosity) {
            viscMove = (Math.random()*100) < 100 / Math.pow(elements[pixel.element].viscosity, 0.25);
        }
        if (!viscMove) {
            var move1Spots = [
                0
            ]
        }
        else {
            var move1Spots = [
                1,0,-1
            ]
        }
        var moved = false;
        for (var i = 0; i < move1Spots.length; i++) {
            const j = Math.random()*move1Spots.length | 0;
            const coord = move1Spots[j];
            if (tryMove(pixel, pixel.x+coord, pixel.y+1)) { moved = true; break; }
            move1Spots.splice(j, 1);
        }
        if (!moved) {
            if (viscMove) {
                if (Math.random() < 0.5) {
                    if (!tryMove(pixel, pixel.x+1, pixel.y)) {
                        tryMove(pixel, pixel.x-1, pixel.y);
                    }
                } else {
                    if (!tryMove(pixel, pixel.x-1, pixel.y)) {
                        tryMove(pixel, pixel.x+1, pixel.y);
                    }
                }
            }
        }
        doDefaults(pixel);
        }
    },
    properties: {
        solid: false,
        solidage: 0,
    },
    viscosity: 5000,
    tempHigh: 120,
    stateHigh: ["steam","corn_starch"],
    tempLow: 0,
    category:"liquids",
    state: "liquid",
    onBreak: behaviors.SOLIDIFY,
    density: 1450,
    stain: 0.10,
	hidden: true,
}

elements.amylase = {
    color: "#dddbc2",
    behavior: behaviors.POWDER,
    reactions: {
        "water": { elem1: "saliva", elem2: null },
        "salt_water": { elem1: "saliva", elem2: null },
        "sugar_water": { elem2: null },
        "seltzer": { elem2: null },
        "pool_water": { elem2: null },
		"oobleck": { elem1:"corn_syrup", elem2:null}
    },
    category: "powders",
    tempHigh: 69.5,
    state: "solid",
    density: 1370,
}

elements.corn_syrup = {
    color: "#efecd9",
	behavior: behaviors.LIQUID,
    viscosity: 10000,
    tempHigh: 150,
    stateHigh: ["steam","corn_starch","sugar","sugar"],
	reactions: {
		"water": { elem2: "sugar_water", chance:0.05 },
		"salt_water": { elem2: "sugar_water", chance:0.05 },
		"seltzer": { elem2: "sugar_water", chance:0.05 },
		"water": { elem2: "sugar_water", chance:0.05 },
        "molasses": { elem1: "maple_syrup", elem2: null, chance:0.05 },
		"soy_sauce": { elem1:"soyrup", elem2:"soyrup" },
    },
    tempLow: 0,
    category:"liquids",
    state: "liquid",
    density: 1330,
    stain: 0.10
}

elements.tree_branch.mapleBreakInto = ["maple_sap","sawdust"]

elements.tree_branch.onBreak = function(pixel) {
	if (pixel.wc === "#5c311f" || pixel.wc === "#824427" || pixel.wc === "#471b05" || pixel.wc === "#4a2818") {
		var result = elements.tree_branch.mapleBreakInto[Math.floor(Math.random() * elements.tree_branch.mapleBreakInto.length)]
		changePixel(pixel,result)
	}
	else {
		var result = elements.tree_branch.breakInto[Math.floor(Math.random() * elements.tree_branch.breakInto.length)]
		changePixel(pixel,result)
	}
}

elements.maple_sap = {
	color: ["#b67f18","#c86305","#cf7a19","#e4ae3a"],
	behavior: behaviors.LIQUID,
	reactions: {
		"dead_bug": { elem1:"amber", elem2:null, chance:0.1 },
		"ant": { elem1:"amber", elem2:null, chance:0.1 },
		"fly": { elem1:"amber", elem2:null, chance:0.1 },
		"flea": { elem1:"amber", elem2:null, chance:0.1 },
		"termite": { elem1:"amber", elem2:null, chance:0.1 },
		"worm": { elem1:"amber", elem2:null, chance:0.1 },
		"bee": { elem1:"amber", elem2:null, chance:0.1 },
		"firefly": { elem1:"amber", elem2:null, chance:0.1 },
		"stink_bug": { elem1:"amber", elem2:null, chance:0.1 },
		"slug": { elem1:"amber", elem2:null, chance:0.1 },
		"snail": { elem1:"amber", elem2:null, chance:0.1 },
		"spider": { elem1:"amber", elem2:null, chance:0.1 },
	},
	tick: function(pixel) {
		if (!pixel.burning && pixel.temp > 95 && Math.random() < 0.001) {
			changePixel(pixel,"maple_syrup")
			releaseElement(pixel,"steam");
		}
	},
	tempHigh: 118.18,
	stateHigh: ["sugar","steam","smoke","smoke"],
	tempLow: 0,
	stateLowName: "amber",
	burn: 40,
	burnTime: 15,
	burnInto: "fire",
	category:"liquids",
	state: "liquid",
	viscosity: 15,
	density: 1400,
	hidden: true,
}

elements.maple_syrup = {
    color: ["#9C6A07","#A27216","#BB9351"],
	behavior: behaviors.LIQUID,
    viscosity: 10000,
    tempHigh: 210,
    stateHigh: ["steam","steam","sugar","sugar","sugar"],
	reactions: {
		"water": { elem2: "sugar_water", chance:0.05 },
		"salt_water": { elem2: "sugar_water", chance:0.05 },
		"seltzer": { elem2: "sugar_water", chance:0.05 },
		"water": { elem2: "sugar_water", chance:0.05 },
		"soy_sauce": { elem1:"soyrup", elem2:"soyrup" },
    },
    tempLow: 0,
    category:"liquids",
    state: "liquid",
    density: 1335,
    stain: 0.10
}

elements.soyrup = {
    color: "#7C4515",
	behavior: behaviors.LIQUID,
    viscosity: 900,
    tempHigh: 110,
    stateHigh: ["steam","steam","sugar","sugar","sugar","steam","steam","salt","steam","salt"],
	reactions: {
		"water": { elem2: "sugar_water", chance:0.05 },
		"salt_water": { elem2: "sugar_water", chance:0.05 },
		"seltzer": { elem2: "sugar_water", chance:0.05 },
		"water": { elem2: "sugar_water", chance:0.05 },
		"soy_sauce": { elem2:"soyrup", chance:0.005},
		"maple_syrup": { elem2:"soyrup", chance:0.005},
		"corn_syrup": { elem2:"soyrup", chance:0.005},
		"bullshake": { elem1:"shrulbshake", elem2:"shrulbshake" },
    },
    tempLow: 0,
    category:"liquids",
    state: "liquid",
    density: 1235,
    stain: 0.075,
	hidden: true,
}

if (!elements.coffee_bean.reactions) { elements.coffee_bean.reactions = {}; }
elements.coffee_bean.reactions.carbon_dioxide = { elem1:["dead_plant","dead_plant","sawdust"], elem2:"caffeinated_co2", tempMax:-48.6}

elements.caffeinated_co2 = {
	color: "#2f2f2f",
	behavior: behaviors.GAS,
	reactions: {
		"plant": { elem1:"oxygen" },
		"evergreen": { elem1:"oxygen" },
		"grass": { elem1:"oxygen" },
		"cactus": { elem1:"oxygen" },
		"bamboo": { elem1:"oxygen" },
		"bamboo_plant": { elem1:"oxygen" },
		"vine": { elem1:"oxygen" },
		"flower_seed": { elem1:"oxygen" },
		"grass_seed": { elem1:"oxygen" },
		"algae": { elem1:"oxygen" },
		"kelp": { elem1:"oxygen" },
		"sugar_water": { elem1:"foam", elem2:"red_bull" },
		"water": { elem1:"foam", elem2:"red_bull" },
		"seltzer": { elem1:"foam", elem2:"red_bull" },
		"soda": { elem1:"foam", elem2:"red_bull", color2:"#422016" },
		"juice": { elem1:"foam", elem2:"red_bull", color2:"#f0bf3d" },
	},
	temp:-48.6,
	category: "gases",
	tempLow: -79.75,
	stateLow: ["dry_ice","caffeine"],
	tempHigh: 0,
	stateHigh: ["carbon_dioxide","caffeine"],
	state: "gas",
	density: 2.5,
	hidden: true,
	alias: "caffeinated carbon dioxide"
}

elements.caffeine = {
	tempHigh: 178,
	stateHighName:"caffeine_gas",
	reactions: {
		"sugar_water": { elem1:null, elem2:"red_bull" },
		"water": { elem1:null, elem2:"caffeinated_water" },
		"seltzer": { elem1:"foam", elem2:"red_bull" },
		"soda": { elem1:"foam", elem2:"red_bull", color2:"#422016" },
		"juice": { elem1:null, elem2:"red_bull", color2:"#f0bf3d" },
	},
	color: "#D0C4C1",
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
}

elements.caffeine_gas = {
	behavior: behaviors.GAS,
	color: "#D0C4C1",
	state: "gas",
	hidden: true
}

elements.caffeinated_water = {
	color: "#C2BDAC",
	behavior: behaviors.LIQUID,
	tempHigh: 105,
	stateHigh: ["steam","steam","caffeine"],
	tempLow: -5,
	stateLowName: "caffeine_ice",
	category: "liquids",
	reactions: {
		"dust": { elem1: "dirty_water", elem2: null },
		"ash": { elem1: "dirty_water", elem2: null },
		"carbon_dioxide": { elem1: "red_bull", elem2: null },
		"cyanide": { elem1: "dirty_water", elem2: null },
		"sulfur": { elem1: "dirty_water", elem2: null },
		"charcoal": { elem1: "dirty_water", chance:0.005 },
		"rat": { elem1: "dirty_water", chance:0.005 },
		"infection": { elem1: "dirty_water", elem2: null },
		"plague": { elem1: "dirty_water", elem2: null },
		"fallout": { elem1: "dirty_water", chance:0.25 },
		"radiation": { elem1: "dirty_water", chance:0.25 },
		"rust": { elem1: "dirty_water", chance:0.005 },
		"lead": { elem1: "dirty_water", chance:0.005 },
		"solder": { elem1: "dirty_water", chance:0.005 },
		"rock": { elem2: "wet_sand", chance: 0.0004 },
		"limestone": { elem2: "wet_sand", chance: 0.0004 },
		"fly": { elem2:"dead_bug", chance:0.1, oneway:true },
		"firefly": { elem2:"dead_bug", chance:0.1, oneway:true },
		"bee": { elem2:"dead_bug", chance:0.05, oneway:true },
		"stink_bug": { elem2:"dead_bug", chance:0.1, oneway:true },
		"uranium": { elem1: "dirty_water", chance:0.25 },
		"caffeinated_water": { elem2:"bubble", attr2:{"clone":"caffeinated_water"}, chance:0.001, tempMin:85 },
		// electrolysis:
		"aluminum": { elem1:["hydrogen","hydrogen","oxygen","caffeine"], charged:true, chance:0.0025 },
		"zinc": { elem1:["hydrogen","hydrogen","oxygen","caffeine"], charged:true, chance:0.015 },
		"steel": { elem1:["hydrogen","hydrogen","oxygen","caffeine"], charged:true, chance:0.0125 },
		"iron": { elem1:["hydrogen","hydrogen","oxygen","caffeine"], charged:true, chance:0.0125 },
		"tin": { elem1:["hydrogen","hydrogen","oxygen","caffeine"], charged:true, chance:0.01 },
		"brass": { elem1:["hydrogen","hydrogen","oxygen","caffeine"], charged:true, chance:0.001 },
		"bronze": { elem1:["hydrogen","hydrogen","oxygen","caffeine"], charged:true, chance:0.001 },
		"copper": { elem1:["hydrogen","hydrogen","oxygen","caffeine"], charged:true, chance:0.0075 },
		"silver": { elem1:["hydrogen","hydrogen","oxygen","caffeine"], charged:true, chance:0.0075 },
		"gold": { elem1:["hydrogen","hydrogen","oxygen","caffeine"], charged:true, chance:0.0075 },
	},
	hidden: true,
	state: "liquid",
	density: 1026,
	conduct: 0.05,
	stain: -0.05,
	extinguish: true
}

elements.red_bull = {
	color: "#bf9b35",
	behavior: [
		"XX|XX|XX",
		"M2|XX|M2",
		"M2|M1|M2",
	],
	tick: function(pixel) {
		if (Math.random() < 0.02 && isEmpty(pixel.x,pixel.y-1)) {
			let foam = releaseElement(pixel, "foam");
			if (foam) foam.color = pixelColorPick(foam,"#D5C496");
		}
	},
	onMix: function(pixel) {
		let foam = releaseElement(pixel, "foam");
		if (foam) foam.color = pixelColorPick(foam,"#D5C496");
	},
	tempHigh: 100,
	stateHigh: ["steam","carbon_dioxide","sugar","steam","carbon_dioxide","sugar","steam","carbon_dioxide","sugar","steam","carbon_dioxide","sugar","caffeine"],
	tempLow: -1.11,
	category: "liquids",
	reactions: {
		"rock": { elem2: "wet_sand", chance: 0.0004 },
		"water": { elem1: "sugar_water", elem2: "sugar_water" },
		"salt": { elem2:"foam", chance:0.05, color2:"#D5C496" },
		"salt_water": { elem2:"foam", chance:0.01, color2:"#D5C496" },
		"sugar": { elem2:"foam", chance:0.001, color2:"#D5C496" },
		"egg": { elem2:"yolk", chance:0.001 },
		"candy": { elem2:"foam", chance:0.01, color2:"#D5C496" },
		"caramel": { elem2:"foam", chance:0.01, color2:"#D5C496" },
		"milkshake": { elem1:"bullshake", elem2:"bullshake" },
	},
	state: "liquid",
	density: 1030,
	isFood: true
}

elements.ice_cream.onMix = function(milk1, milk2) {
	if ((shiftDown && Math.random() < 0.01) || (elements[milk2.element].id === elements.milk.id && Math.random() < 0.00025) || (elements[milk2.element].id === elements.cream.id && Math.random() < 0.00025)) {
		var shakeColor = milk2.color
        if (Math.random() > 0.75) {
		    changePixel(milk2,"milkshake")
			milk2.color = pixelColorPick(pixel1, shakeColor);
        }
        else {
            deletePixel(milk2.x,milk2.y)
        }
        changePixel(milk1,"milkshake")
		milk1.color = pixelColorPick(pixel1, shakeColor);
	}
}

elements.milkshake = {
	color: ["#f7f7f7","#F0F0F0","#E5E5E5"],
	behavior: behaviors.LIQUID,
	reactions: {
		"melted_chocolate": { color1:"#664934", elem2:null },
		"chocolate": { color1:"#664934", elem2:null, chance:0.05 },
		"chocolate_powder": { color1:"#664934", elem2:null, chance:0.1 },
		"juice": { color1:"#D6B2AB", elem2:null, chance:0.05 },
		"soda": { color1:"#EEDBC2", elem2:null, chance:0.1 },
		"yolk": { color1:"#E2C9A9", elem2:null, chance:0.1 },
		"caramel": { color1:"#D1BFAB", chance:0.05 },
		"sugar": { elem2:null, chance:0.005},
		"red_bull": { elem1:"bullshake", elem2:"bullshake" },
	},
	viscosity: 15,
	tempHigh: 115,
	stateHigh: "cream",
	tempLow: -25,
	stateLow: "ice_cream",
	stateLowColorMultiplier: 0.97,
	category: "food",
	isFood: true,
	state: "liquid",
	density: 965,
}

elements.bullshake = {
	color: ["#D8C58D","#D5C28A","#D0BD85"],
	behavior: behaviors.LIQUID,
	reactions: {
		"melted_chocolate": { color1:"#664934", elem2:null },
		"chocolate": { color1:"#664934", elem2:null, chance:0.05 },
		"chocolate_powder": { color1:"#664934", elem2:null, chance:0.1 },
		"juice": { color1:"#D6B2AB", elem2:null, chance:0.05 },
		"soda": { color1:"#EEDBC2", elem2:null, chance:0.1 },
		"yolk": { color1:"#E2C9A9", elem2:null, chance:0.1 },
		"caramel": { color1:"#D1BFAB", chance:0.05 },
		"sugar": { elem2:null, chance:0.005},
		"egg": { elem2:"yolk", chance:0.001 },
		"candy": { elem2:"foam", chance:0.01, color2:"#D8C58D" },
		"caramel": { elem2:"foam", chance:0.01, color2:"#D8C58D" },
		"milkshake": { elem2:"bullshake", chance:0.005},
		"red_bull": { elem2:"bullshake", chance:0.005},
		"soyrup": { elem1:"shrulbshake", elem2:"shrulbshake" },
	},
	viscosity: 7.5,
	tempHigh: 115,
	stateHigh: ["cream","cream","cream","cream","cream","cream","cream","cream","cream","cream","cream","cream","steam","carbon_dioxide","sugar","steam","carbon_dioxide","sugar","steam","carbon_dioxide","sugar","steam","carbon_dioxide","sugar","caffeine"],
	tempLow: -25,
	stateLow: "ice_cream",
	stateLowColorMultiplier: 0.97,
	category: "liquids",
	isFood: true,
	state: "liquid",
	density: 965,
	hidden: true,
}

elements.shrulbshake = {
	color: "#A67F4C",
	behavior: behaviors.LIQUID,
	reactions: {
		"melted_chocolate": { color1:"#664934", elem2:null },
		"chocolate": { color1:"#664934", elem2:null, chance:0.05 },
		"chocolate_powder": { color1:"#664934", elem2:null, chance:0.1 },
		"juice": { color1:"#D6B2AB", elem2:null, chance:0.05 },
		"soda": { color1:"#EEDBC2", elem2:null, chance:0.1 },
		"yolk": { color1:"#E2C9A9", elem2:null, chance:0.1 },
		"caramel": { color1:"#D1BFAB", chance:0.05 },
		"sugar": { elem2:null, chance:0.005},
		"egg": { elem2:"yolk", chance:0.001 },
		"candy": { elem2:"foam", chance:0.01, color2:"#D8C58D" },
		"caramel": { elem2:"foam", chance:0.01, color2:"#D8C58D" },
		"soyrup": { elem2:"shrulbshake", chance:0.005},
		"bullshake": { elem2:"shrulbshake", chance:0.005},
		"moneybrine": { elem1:"the_drink_of_the_cosmos", elem2:"the_drink_of_the_cosmos" },
	},
	viscosity: 200,
	tempHigh: 115,
	stateHigh: ["steam","steam","sugar","sugar","sugar","steam","steam","salt","steam","salt","steam","steam","sugar","sugar","sugar","steam","steam","salt","steam","salt","steam","steam","sugar","sugar","sugar","steam","steam","salt","steam","salt","cream","cream","cream","cream","cream","cream","cream","cream","cream","cream","cream","cream","steam","carbon_dioxide","sugar","steam","carbon_dioxide","sugar","steam","carbon_dioxide","sugar","steam","carbon_dioxide","sugar","caffeine"],
	tempLow: -5,
	stateLow: ["ice_cream","soyrup"],
	stateLowColorMultiplier: 0.97,
	category: "liquids",
	isFood: true,
	state: "liquid",
	density: 965,
	hidden: true,
}

elements.the_drink_of_the_cosmos = {
	color: ["#090607","#090607","#090607","#090607","#553e25","#d3cdb1","#d3cdb1","#1e1d12","#d3cdb1","#d3cdb1","#553e25","#090607","#090607","#090607","#090607"],
	behavior: behaviors.LIQUID,
	reactions: {
		"melted_chocolate": { color1:"#664934", elem2:null },
		"chocolate": { color1:"#664934", elem2:null, chance:0.05 },
		"chocolate_powder": { color1:"#664934", elem2:null, chance:0.1 },
		"juice": { color1:"#D6B2AB", elem2:null, chance:0.05 },
		"soda": { color1:"#EEDBC2", elem2:null, chance:0.1 },
		"yolk": { color1:"#E2C9A9", elem2:null, chance:0.1 },
		"caramel": { color1:"#D1BFAB", chance:0.05 },
		"sugar": { elem2:null, chance:0.005},
		"egg": { elem2:"yolk", chance:0.001 },
		"candy": { elem2:"foam", chance:0.01, color2:"#D8C58D" },
		"caramel": { elem2:"foam", chance:0.01, color2:"#D8C58D" },
		"shrulbshake": { elem2:"the_drink_of_the_cosmos", chance:0.005},
		"moneybrine": { elem2:"the_drink_of_the_cosmos", chance:0.005},
		"the_final_threshold": { elem1:"transcendent_potion", elem2:"transcendent_potion" },
	},
	viscosity: 500,
	category: "liquids",
	state: "liquid",
	density: 2965,
	hidden: true,
	isFood: true
}

elements.transcendent_potion = {
	color: ["#0f132b","#0f132b","#93d1d8","#93d1d8","#93d1d8","#edf991","#fffdf7","#fffdf7","#edf991","#93d1d8","#93d1d8","#93d1d8","#0f132b","#0f132b"],
	behavior: behaviors.LIQUID,
	reactions: {
		"melted_chocolate": { elem2:null },
		"chocolate": { elem2:null, chance:0.05 },
		"chocolate_powder": { elem2:null, chance:0.1 },
		"juice": { elem2:null, chance:0.05 },
		"soda": { elem2:null, chance:0.1 },
		"yolk": { elem2:null, chance:0.1 },
		"caramel": { color1:"#D1BFAB", chance:0.05 },
		"egg": { elem2:"yolk", chance:0.001 },
		"sugar": { elem2:null, chance:0.005},
		"honey": { elem2:null, chance:0.005},
		"milk": { elem2:null, chance:0.005},
		"the_final_threshold": { elem2:"transcendent_potion", chance:0.005},
		"the_drink_of_the_cosmos": { elem2:"transcendent_potion", chance:0.005},
	},
	viscosity: 1500,
	category: "liquids",
	state: "liquid",
	density: 2058.15,
	hidden: true,
	isFood: true
}

elements.dayquil = {
    density: 1200, 
    viscosity: 185,
    color: "#e68300",
    behavior: behaviors.LIQUID,
    tempHigh:105,
    stateHigh:["steam","sugar","sugar","alcohol","sugar","smoke","stench","phenylephrine","phenylephrine"],
    category: "liquids",
    state: "liquid",
    reactions: {
        "sprite": { elem1: "lean", elem2: "lean" },
        "pickle_juice": { elem1: "pickquil", elem2: "pickquil" },
        "doxylamine": { elem1: null, elem2: "nyquil" },
    },
}

