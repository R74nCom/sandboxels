elements.iron.hardness = 0.74
//https://www.engineeringtoolbox.com/bhn-brinell-hardness-number-d_1365.html
//https://en.wikipedia.org/wiki/Hardnesses_of_the_elements_(data_page)
//"Annealed chissel steel" hardness and then divided by iron hardness (Brinell)
//sqrt()ed like IACS-derived conductivities and scaled to the 0.8 hardness of steel
//and because 1 means infinite hardness, the others are derived using
//1-(0.26/(otherThingBHN/200))
//it doesn't matter much anyway but I'd like to have some semblance/veneer of accuracy

//Copper exists

elements.ruthenium = {
    color: ["#e8ebca","#eaebd5"], //color pulled from my ass because I don't want another gray metal
    behavior: behaviors.WALL,
    tempHigh: 2334,
    category: "solids",
    state: "solid",
    density: 12450,
    conduct: 0.45,
    hardness: 0.97593,
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
    hardness: 0.94694,
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
    hardness: 0.82667,
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
    hardness: 0.96061,
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
    hardness: 0.98673,
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
    hardness: 0.96886,
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

elements.iron.hardness = 0.74
//https://www.engineeringtoolbox.com/bhn-brinell-hardness-number-d_1365.html
//https://en.wikipedia.org/wiki/Hardnesses_of_the_elements_(data_page)
//"Annealed chissel steel" hardness and then divided by iron hardness (Brinell)
//sqrt()ed like IACS-derived conductivities and scaled to the 0.8 hardness of steel
//and because 1 means infinite hardness, the others are derived using
//1-(0.26/(otherThingBHN/200))
//it doesn't matter much anyway but I'd like to have some semblance/veneer of accuracy

//Copper exists

elements.ruthenium = {
    color: ["#e8ebca","#eaebd5"], //color pulled from my ass because I don't want another gray metal
    behavior: behaviors.WALL,
    tempHigh: 2334,
    category: "solids",
    state: "solid",
    density: 12450,
    conduct: 0.45,
    hardness: 0.97593,
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
    hardness: 0.94694,
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
    hardness: 0.82667,
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
    hardness: 0.96061,
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
    hardness: 0.98673,
},

elements.molten_osmium = {
    density: 2e4,
},

elements.iridium = {
    color: ["#dfb9f0","#d6a9eb","#dfd1ed","#eeeeee"], //Minecraft modding/Stardew Valley reference, take your pick
    behavior: behaviors.WALL,
    tempHigh: 2446,
    category: "solids",
    state: "solid",
    density: 22560,
    conduct: 0.54,
    hardness: 0.96886,
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

neighbors = [[-1,0],[0,-1],[1,0],[0,1]]

function exposedToAir(pixel) {	
	if(isEmpty(pixel.x+neighbors[0][0],pixel.y+neighbors[0][1],true) || isEmpty(pixel.x+neighbors[1][0],pixel.y+neighbors[1][1],true) || isEmpty(pixel.x+neighbors[2][0],pixel.y+neighbors[2][1],true) || isEmpty(pixel.x+neighbors[3][0],pixel.y+neighbors[3][1],true)) {
		return true
	} else {
		return false
	}
}

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
		tryTarnish(pixel,"lithium_oxide",0.007) //oxidation
		if(pixel.temp >= 179) {
			pixel.burning = true; //auto-ignition at 179*C
			pixel.burnStart = pixelTicks; 
		}
	},
	reactions: {
		"steam": { "elem1": "hydrogen", "elem2": "lithium_hydroxide" }, //should be 2 Li(s) + 2 H2O -> 2 LiOH (aq) + H2(g) according to https://www.lenntech.com/periodic/water/lithium/lithium-and-water.htm#ixzz7LUgLrzua
		"water": { "elem1": "hydrogen", "elem2": "lithium_hydroxide" }, //should be 2 Li(s) + 2 H2O -> 2 LiOH (aq) + H2(g) according to https://www.lenntech.com/periodic/water/lithium/lithium-and-water.htm#ixzz7LUgLrzua
		"nitrogen": { "elem1": "lithium_nitride", "elem2": "lithium_nitride" }, //should be 6 Li + N2 → 2 Li3N according to Wikipedia
		"liquid_nitrogen": { "elem1": "lithium_nitride", "elem2": "lithium_nitride" }, //should be 6 Li + N2 → 2 Li3N according to Wikipedia
		"liquid_hydrogen": { "elem1": "lithium_hydride", "elem2": "lithium_hydride" }, //2 Li + H2 → 2 LiH
		"ammonia": { "elem1": ["hydrogen",null], "elem2": "lithium_amide" }, //2Li + 2NH_3 → 2LiNH_2 + H_2
		"liquid_ammonia": { "elem1": ["hydrogen",null], "elem2": "lithium_amide" }, //2Li + 2NH_3 → 2LiNH_2 + H_2
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
		tryTarnish(pixel,"lithium_oxide",0.014) //oxidation
	},
	reactions: {
		"steam": { "elem1": "hydrogen", "elem2": "lithium_hydroxide" }, //should be 2 Li(s) + 2 H2O -> 2 LiOH (aq) + H2(g) according to https://www.lenntech.com/periodic/water/lithium/lithium-and-water.htm#ixzz7LUgLrzua
		"water": { "elem1": "hydrogen", "elem2": "lithium_hydroxide" }, //"
		"nitrogen": { "elem1": "lithium_nitride", "elem2": "lithium_nitride" }, //should be 6 Li + N2 → 2 Li3N according to Wikipedia
		"liquid_nitrogen": { "elem1": "lithium_nitride", "elem2": "lithium_nitride" }, //"
		"hydrogen": { "elem1": "lithium_hydride", "elem2": "lithium_hydride" }, //2 Li + H2 → 2 LiH
		"liquid_hydrogen": { "elem1": "lithium_hydride", "elem2": "lithium_hydride" }, //"
		"ammonia": { "elem1": ["hydrogen",null], "elem2": "lithium_amide" }, //2Li + 2NH_3 → 2LiNH_2 + H_2
		"liquid_ammonia": { "elem1": ["hydrogen",null], "elem2": "lithium_amide" }, //"
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
		"steam": { "elem1": "lithium_hydroxide", "elem2": "lithium_hydroxide", chance: 0.03 }, //> The oxide reacts slowly
		"water": { "elem1": "lithium_hydroxide", "elem2": "lithium_hydroxide", chance: 0.03 }, //> The oxide reacts slowly
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
		"carbon_dioxide": { "elem1": "water", "elem2": [null,"lithium_carbonate"], chance: 0.5 }, //simulating 2 LiOH + CO_2 → Li_2_CO_3 + H_2_O
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
		"carbon_dioxide": { "elem1": "water", "elem2": [null,"lithium_carbonate"], chance: 0.5 }, //should be 2x water: 2 LiOH•H_2_O + CO_2 → Li_2_CO_3 + 2 H_2_O
	},
	tick: function(pixel) {
		emptyNeighborArray = [] //get empty neighbors to place split products
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

elements.lithium_carbonate = { //todo?: https://en.wikipedia.org/wiki/Lithium_carbonate
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
		"steam": { "elem1": "lithium_hydroxide", "elem2": "ammonia" }, //should be Li_3_N + 3 H_2_O → 3 LiOH + NH_3
		"water": { "elem1": "lithium_hydroxide", "elem2": "ammonia" }, //should be Li_3_N + 3 H_2_O → 3 LiOH + NH_3
		"hydrogen": { "elem1": "lithium_hydride", "elem2": "lithium_amide" }, //possibly Li_3_N + H → LiH + LiNH_2
		"liquid_hydrogen": { "elem1": "lithium_hydride", "elem2": "lithium_amide" }, //possibly Li_3_N + H → LiH + LiNH_2
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
