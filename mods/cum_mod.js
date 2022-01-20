elements.cum = { 
	name: "cum",
	color: "#e6e1d5",
	behavior: [
		"ST%50 AND SW:water,cum_water,dead_cum,dead_cum_water,slime%15|ST%50 AND SW:water,cum_water,dead_cum,dead_cum_water,slime%15|XX AND ST%50 AND SW:water,cum_water,dead_cum,dead_cum_water,slime%15",
		"M2 AND ST%65 AND SW:water,cum_water,dead_cum,dead_cum_water,slime%15|XX|M2 AND ST%65 AND SW:water,cum_water,dead_cum,dead_cum_water,slime%15",
		"M1 AND ST%80 AND SW:water,cum_water,dead_cum,dead_cum_water,slime%15|M1 AND ST%80 AND SW:water,cum_water,dead_cum,dead_cum_water,slime%15|M1 AND ST%80 AND SW:water,cum_water,dead_cum,dead_cum_water,slime%15",
	],
	density: 997,
	tempHigh: 35,
	stateHigh: "dead_cum",
	reactions: {
		"water": { "elem1": "cum_water", "elem2": "cum_water", "chance":0.7 }, //cum mixing
		"sugar": { "elem1": null, "elem2": "cum", "chance":0.7 }, //sperm eat sugar
		"sugar_water": { "elem1": "cum_water", "elem2": "cum_water", "chance":0.7 }, //fed and diluted
		"dirt": { "elem1": null, "elem2": "cummy_mud" }, //cum goes into dirt
		"mud": { "elem1": "cum_water", "elem2": "cummy_mud", "chance": (1/3) }, // cum goes into mud
		"sand": { "elem1": null, "elem2": "cummy_sand" }, // cum goes into sand
		"wet_sand": { "elem1": "cum_water", "elem2": "cummy_sand", "chance": (1/3) }, // cum goes into wet sand
		"acid": { "elem1": "water", "elem2": "cum", "chance": 0.1 }, //cum is basic
		"slime": { "elem1": "water", "elem2": "cum_slime" }, //cum enters slime
		"salt": { "elem1": null, "elem2": "dead_cum" }, //salt kills sperm
		"salt_water": { "elem1": "dead_cum_water", "elem2": null }, //killed and diluted
		"acid": { "elem1": "water", "elem2": "dead_cum", "chance": 0.2 }, //sperm die from acid, also cum probably has an alkalinity a lot weaker than the acidity of acid, so the amount of cum needed to "neutralize" a small amount of acid wouldn't be diluted much by the small amount of water remaining
		"alcohol": { "elem1": "alcohol", "elem2": "dead_cum", "chance": 0.2 }, //sperm die from alcohol, also I'm not implementing alcohol-water mixing
		"soap": { "elem1": "soap", "elem2": "dead_cum", "chance": 0.2 }, //sperm die from soap
		"radiation": { "elem1": "radiation", "elem2": "dead_cum", "chance": 0.2 }, //sperm die from radiation
		"cum": { "elem1":"cum", "chance":0.01 }, //blood replacement behavior
	},
	tempLow: 0,
	stateLow: "cum_ice",
	viscosity: 20,
	category:"cum",
	conduct:0,
},
elements.dead_cum = { 
	name: "dead cum",
	color: "#d0d0d0",
	behavior: [
		"ST%50 AND SW:water,dead_cum_water%15|ST%50 AND SW:water,dead_cum_water%15|XX AND ST%50 AND SW:water,dead_cum_water%15",
		"M2 AND ST%65 AND SW:water,dead_cum_water%15|XX|M2 AND ST%65 AND SW:water,dead_cum_water%15",
		"M1 AND ST%80 AND SW:water,dead_cum_water%15|M1 AND ST%80 AND SW:water,dead_cum_water%15|M1 AND ST%80 AND SW:water,dead_cum_water%15",
	],
	density: 997,
	tempHigh: 100,
	stateHigh: ["steam","burnt_cum"],
	reactions: {
		"water": { "elem1": "dead_cum_water", "elem2": "dead_cum_water", "chance":0.7 }, //cum mixing
		"dirt": { "elem1": null, "elem2": "dead_cummy_mud" }, //cum goes into dirt
		"mud": { "elem1": "dead_cum_water", "elem2": "dead_cummy_mud", "chance": (1/3) }, // cum goes into mud
		"sand": { "elem1": null, "elem2": "dead_cummy_sand" }, // cum goes into sand
		"wet_sand": { "elem1": "dead_cum_water", "elem2": "dead_cummy_sand", "chance": (1/3) }, // cum goes into wet sand
		"acid": { "elem1": "water", "elem2": "dead_cum", "chance": 0.1 }, //dead cum is still basic
		"salt_water": { "elem1": "dead_cum_water", "elem2": "dead_cum_water" }, //salty mixing
		"sugar_water": { "elem1": "sugar_water", "elem2": "sugar_water" }, //salty mixing
		"salt": { "elem1": null, "elem2": "salt_water" }, //salty mixing
		"sugar": { "elem1": null, "elem2": "sugar_water" }, //salty mixing
	},
	tempLow: 0,
	stateLow: "dead_cum_ice",
	viscosity: 20,
	category:"cum",
	conduct: 0.04,
	hidden:true
},
elements.cum_water = {
	name: "cum water",
	color: "#a7c1db",
	behavior: [
		"SW:water,cum,dead_cum_water,dead_cum%5|SW:water,cum,dead_cum_water,dead_cum%5|SW:water,cum,dead_cum_water,dead_cum%5",
		"M2 AND SW:water,cum,dead_cum_water,dead_cum%5|XX|M2 AND SW:water,cum,dead_cum_water,dead_cum%5",
		"M1 AND SW:water,cum,dead_cum_water,dead_cum%5|M1 AND SW:water,cum,dead_cum_water,dead_cum%5|M1 AND SW:water,cum,dead_cum_water,dead_cum%5",
	],
	reactions: {
		"sugar_water": { "elem1": "cum_water", "elem2": "cum_water", "chance":0.7 }, //sperm eat sugar
		"water": { "elem1": "cum_water", "elem2": "cum_water", "chance":0.7 }, //sperm eat sugar
		"dirt": { "elem1": "water", "elem2": "cummy_mud" }, //cum goes into dirt
		"sand": { "elem1": "water", "elem2": "cummy_sand" }, // cum goes into sand
		"sugar": { "elem1": null, "elem2": "cum_water", "chance":0.7 }, //sperm eat sugar
		"slime": { "elem1": "water", "elem2": "cum_slime" }, //cum enters slime
		"salt": { "elem1": null, "elem2": "dead_cum_water" }, //cum dies
		"salt_water": { "elem1": "dead_cum_water", "dead_cum_water": "salt_water", "chance": 0.12 }, //cum dies
		"acid": { "elem1": "water", "elem2": "cum", "chance": 0.05 }, //less cum is less basic
		"acid": { "elem1": "water", "elem2": "dead_cum_water", "chance": 0.1 }, //sperm die from acid
		"alcohol": { "elem1": "alcohol", "elem2": "dead_cum_water", "chance": 0.2 }, //alcohol kills things
		"soap": { "elem1": "soap", "elem2": "dead_cum_water", "chance": 0.2 }, //soap also kills things
		"radiation": { "elem1": "soap", "elem2": "dead_cum_water", "chance": 0.2 }, //so does radiation
	},
	density: 997,
	tempHigh: 35,
	stateHigh: "dead_cum_water",
	tempLow: 0,
	stateLow: "cum_water_ice",
	viscosity: 8,
	category: "cum",
	conduct: 0.03,
},
elements.dead_cum_water = {
	name: "dead cum water",
	color: "#b7b7c6",
	behavior: [
		"SW:water,cum,dead_cum_water,dead_cum%3|SW:water,cum,dead_cum_water,dead_cum%3|SW:water,cum,dead_cum_water,dead_cum%3",
		"M2 AND SW:water,cum,dead_cum_water,dead_cum%4|XX|M2 AND SW:water,cum,dead_cum_water,dead_cum%4",
		"M1 AND SW:water,cum,dead_cum_water,dead_cum%5|M1 AND SW:water,cum,dead_cum_water,dead_cum%5|M1 AND SW:water,cum,dead_cum_water,dead_cum%5",
	],
	reactions: {
		"sugar_water": { "elem1": "cum_water", "elem2": "cum_water", "chance":0.7 }, //sperm eat sugar
		"dirt": { "elem1": "water", "elem2": "cummy_mud" }, //cum goes into dirt
		"sand": { "elem1": "water", "elem2": "cummy_sand" }, // cum goes into sand
		"sugar": { "elem1": null, "elem2": "cum_water", "chance":0.7 }, //sperm eat sugar
		"slime": { "elem1": "water", "elem2": "cum_slime" }, //cum enters slime
		"salt": { "elem1": null, "elem2": "dead_cum_water" }, //cum dies
		"acid": { "elem1": "water", "elem2": "dead_cum_water", "chance": 0.05 }, //dead and diluted but still basic
		"alcohol": { "elem1": "alcohol", "elem2": "dead_cum_water", "chance": 0.2 }, //alcohol kills things
		"soap": { "elem1": "soap", "elem2": "dead_cum_water", "chance": 0.2 }, //soap also kills things
	},
	density: 997,
	tempHigh: 100,
	stateHigh: "steam",
	tempLow: 0,
	stateLow: "dead_cum_water_ice",
	viscosity: 8,
	category: "cum",
	conduct: 0.03,
	hidden:true
},
elements.burnt_cum = {
	name: "burnt cum",
	density: 998,
	color: "#a6942e",
	behavior: [
		"XX|XX|XX",
		"XX|XX|XX",
		"M2 AND SW:steam%35|M1 AND SW:steam%70|M2 AND SW:steam%35",
	],
	category: "solids",
	tempHigh: 180,
	stateHigh: "ash",
	hidden: true,
	category: "cum",
},
elements.cum_ice = {
	name: "frozen cum",
	color: "#cfe2e6",
	behavior: behaviors.WALL,
	reactions: {
		"acid": { "elem1": "water", "elem2": "cum_ice", "chance": 0.2 }, //frozen bases are still basic
		"acid": { "elem1": "water", "elem2": "dead_cum_ice", "chance": 0.2 }, //sperm die from acid
		"alcohol": { "elem1": "alcohol", "elem2": "dead_cum_ice", "chance": 0.2 }, //alcohol kills things
		"soap": { "elem1": "soap", "elem2": "dead_cum_ice", "chance": 0.2 }, //soap also kills things
		"radiation": { "elem1": "soap", "elem2": "dead_cum_ice", "chance": 0.2 }, //so does radiation
	},
	density: 917,
	temp: 0,
	tempHigh: 5,
	stateHigh: "cum",
	category: "cum",
},
elements.cum_water_ice = {
	name: "cummy ice",
	color: "#cae3e8",
	behavior: behaviors.WALL,
	reactions: {
		"acid": { "elem1": "water", "elem2": "cum_water_ice", "chance": 0.05 }, //frozen bases are still basic
		"acid": { "elem1": "water", "elem2": "dead_cum_water_ice", "chance": 0.1 }, //sperm die from acid
		"alcohol": { "elem1": "alcohol", "elem2": "dead_cum_water_ice", "chance": 0.2 }, //alcohol kills things
		"soap": { "elem1": "soap", "elem2": "dead_cum_water_ice", "chance": 0.2 }, //soap also kills things
		"radiation": { "elem1": "soap", "elem2": "dead_cum_water_ice", "chance": 0.2 }, //so does radiation
	},
	density: 917,
	temp: 0,
	tempHigh: 5,
	stateHigh: "cum_water",
	category: "cum",
},
elements.dead_cum_ice = {
	name: "dead frozen cum",
	color: "#d5d5ec",
	behavior: behaviors.WALL,
	reactions: {
		"acid": { "elem1": "water", "elem2": "dead_cum_ice", "chance": 0.1 },
	},
	density: 917,
	temp: 0,
	tempHigh: 5,
	stateHigh: "dead_cum",
	category: "cum",
	hidden:true
},
elements.dead_cum_water_ice = {
	name: "dead cummy ice",
	color: "#e2e2e7",
	behavior: behaviors.WALL,
	reactions: {
		"acid": { "elem1": "water", "elem2": "dead_cum_water_ice", "chance": 0.05 },
	},
	density: 917,
	temp: 0,
	tempHigh: 5,
	stateHigh: "cum_water",
	category: "cum",
	hidden:true
},
elements.cummy_mud = {
	name: "cummy mud",
	color: "#826f63",
	behavior: [
		"XX|ST%40|XX",
		"M2%10 AND ST%50|XX|M2%10 AND  AND ST%50",
		"M2|M1|M2",
	],
	reactions: {
		"water": { "elem1": "mud", "elem2": "cum_water", "chance": (3/4) },
		"water": { "elem2": "mud", "elem2": "cum" },
		"acid": { "elem1": "water", "elem2": "cummy_mud", "chance": 0.1 },
		"acid": { "elem1": "water", "elem2": "dead_cummy_mud", "chance": 0.2 },
	},
	tempLow: -50,
	stateLow: "cummy_permafrost",
	tempHigh: 35,
	stateHigh: "dead_cummy_mud",
	category:"cum",
	state:"solid",
	density: 1740,
}, 
elements.cummy_sand = {
	name: "cummy sand",
	color: "#c5c88e",
	behavior: [
		"XX|ST%40|XX",
		"M2%10 AND ST%50|XX|M2%10 AND  AND ST%50",
		"M2|M1|M2",
	],
	reactions: {
		"water": { "elem1": "sand", "elem2": "cum_water", "chance": (3/4) },
		"water": { "elem2": "sand", "elem2": "cum" },
		"acid": { "elem1": "water", "elem2": "cummy_sand", "chance": 0.1 },
		"acid": { "elem1": "water", "elem2": "dead_cummy_sand", "chance": 0.2 },
	},
	tempHigh: 35,
	stateHigh: "dead_cummy_sand",
	category: "cum",
	state: "solid",
	density: 1915,
},
elements.dead_cummy_mud = {
	name: "dead cummy mud",
	color: "#978773",
	behavior: [
		"XX|ST%40|XX",
		"M2%10 AND ST%50|XX|M2%10 AND  AND ST%50",
		"M2|M1|M2",
	],
	reactions: {
		"water": { "elem1": "mud", "elem2": "dead_cum_water", "chance": 0.15 },
		"water": { "elem2": "mud", "elem2": "dead_cum", "chance": 0.05 },
		"acid": { "elem1": "water", "elem2": "dead_cummy_mud", "chance": 0.2 },
	},
	tempLow: -50,
	stateLow: "permafrost",
	tempHigh: 100,
	stateHigh: "mudstone",
	category:"cum",
	state:"solid",
	density: 1740,
	hidden:true
}, 
elements.dead_cummy_sand = {
	name: "dead cummy sand",
	color: "#a9a987",
	behavior: [
		"XX|ST%40|XX",
		"M2%10 AND ST%50|XX|M2%10 AND  AND ST%50",
		"M2|M1|M2",
	],
	reactions: {
		"water": { "elem1": "wet_sand", "elem2": "dead_cum_water", "chance": 0.15 },
		"water": { "elem2": "wet_sand", "elem2": "dead_cum", "chance": 0.05 },
		"acid": { "elem1": "water", "elem2": "dead_cummy_sand", "chance": 0.2 },
	},
	tempHigh: 100,
	stateHigh: "packed_sand",
	category: "cum",
	state: "solid",
	density: 1915,
	hidden:true
},
elements.cum_slime = {
	name: "cummy slime",
	color: "#a4cf83",
	behavior: behaviors.LIQUID,
	viscosity: 5500,
	category:"liquids",
	state: "liquid",
	reactions: {
		"water": { "elem1": "cum_water", "elem2": "slime", "chance": (1/5) },
		"acid": { "elem1": "water", "elem2": "cum_slime", "chance": 0.1 },
	},
	density: 1470,
	tempHigh: 150,
	stateHigh: ["steam","steam","burnt_cum","burnt_cum","slime"],
	hidden:true
},
elements.cummy_snake = {
	color: "#bfbfbf",
	behavior: [
		"XX|CH:cum_ice>cum%1 AND SW:cum%20|XX",
		"CH:cum_ice>cum%1 AND SW:cum%20|LB:cum_ice AND RT%5|M1 AND BO:1,2,3 AND CH:cum_ice>cum%1 AND SW:cum%20",
		"XX|CH:cum_ice>cum%1 AND SW:cum%20|XX",
	],
	rotatable: true,
	category: "cum",
},
elements.penis = {
	color: "#9c5e5f",
	behavior: [
		"XX|CR:cum%6|XX",
		"CR:cum%6|XX|CR:cum%6",
		"XX|CR:cum%6|XX",
	],
	behaviorOn: [
		"CR:cum%10|CR:cum%10|CR:cum%10",
		"CR:cum%10|XX|CR:cum%10",
		"CR:cum%10|CR:cum%10|CR:cum%10",
	],
	rotatable: false,
	category: "cum",
	conduct: 1,
	tempHigh: 60,
	stateHigh: "rotten_meat",
},
elements.cummy_permafrost = {
	name: "cummy permafrost",
	color: "#86b5a5",
	behavior: behaviors.SUPPORT,
	temp: -50,
	tempHigh: 0,
	stateHigh: "cummy_mud",
	category: "cum",
}
// Add reactions to existing elements
if (!elements.fly.reactions) {
    elements.fly.reactions = {}
}
if (!elements.frog.reactions) {
    elements.frog.reactions = {}
}
if (!elements.ant.reactions) {
    elements.ant.reactions = {}
}
if (!elements.fish.reactions) {
    elements.fish.reactions = {}
}
if (!elements.water.reactions) {
    elements.water.reactions = {}
}
elements.fly.reactions.cum = { "elem1":"fly", "elem2":null }
elements.frog.reactions.cum = { "elem1":"cum_water", "elem2":"frog" }
elements.ant.reactions.cum = { "elem1":"ant", "elem2":null }
elements.fish.reactions.cum = { "elem1":"fish", "elem2":"cum_water" }
elements.fish.reactions.cum_water = { "elem1":"fish", "elem2":"water" }
elements.fish.reactions.dead_cum = { "elem1":"fish", "elem2":"dead_cum_water" }
elements.fish.reactions.dead_cum_water = { "elem1":"fish", "elem2":"water" }

/*if(enabledMods.includes("mods/fey_and_more.js")) {
    eLists.IMPURITY.push("cum");
    eLists.IMPURITY.push("cum_water");
    eLists.IMPURITY.push("cum_ice");
    eLists.IMPURITY.push("cum_water_ice");
    eLists.IMPURITY.push("dead_cum");
    eLists.IMPURITY.push("dead_cum_water");
    eLists.IMPURITY.push("dead_cum_ice");
    eLists.IMPURITY.push("dead_cum_water_ice");
    eLists.IMPURITY.push("cummy_mud");
    eLists.IMPURITY.push("dead_cummy_mud");
    eLists.IMPURITY.push("cummy_sand");
    eLists.IMPURITY.push("dead_cummy_sand");
    eLists.IMPURITY.push("cummy_permafrost");
    eLists.IMPURITY.push("cummy_snake");
    eLists.IMPURITY.push("cum_slime");
    eLists.IMPURITY.push("burnt_cum");
};*/
