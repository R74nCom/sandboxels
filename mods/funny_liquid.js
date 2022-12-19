elements.cum = { 
	name: "cum",
	color: "#e6e1d5",
	behavior: [
		"ST%50|ST%50|ST%50",
		"M2 AND ST%65|XX|M2 AND ST%65",
		"M1 AND ST%80|M1 AND ST%80|M1 AND ST%80",
	],
	density: 997,
	tempHigh: 36,
	stateHigh: "dead_cum",
	state: "liquid",
	reactions: {
		"water": { "elem1": "cum_water", "elem2": "cum_water", "chance":0.1 }, //cum mixing
		"cum_water": { "elem1": "cum_water", "elem2": "cum", "chance":0.03, "oneway": true }, //cum mixing
		"dead_cum": { "elem1": "dead_cum", "elem2": "cum", "chance":0.03, "oneway": true }, //cum mixing
		"dead_cum_water": { "elem1": "dead_cum_water", "elem2": "cum", "chance":0.03, "oneway": true }, //cum mixing
		"sugar": { "elem1": null, "elem2": "cum", "chance":0.7 }, //sperm eat sugar
		"sugar_water": { "elem1": "cum_water", "elem2": "cum_water", "chance":0.15 }, //fed and diluted
		"dirt": { "elem1": null, "elem2": "cummy_mud" }, //cum goes into dirt
		"mud": { "elem1": "cum_water", "elem2": "cummy_mud", "chance": (1/3) }, // cum goes into mud
		"sand": { "elem1": null, "elem2": "cummy_sand" }, // cum goes into sand
		"wet_sand": { "elem1": "cum_water", "elem2": "cummy_sand", "chance": (1/3) }, // cum goes into wet sand
		"acid": { "elem1": "water", "elem2": ["cum_water", "dead_cum_water", "dead_cum_water", "dead_cum_water", "dead_cum_water"], "chance": 0.1 }, //cum is basic
		"slime": { "elem1": "water", "elem2": "cum_slime" }, //cum enters slime
		"salt": { "elem1": null, "elem2": "dead_cum" }, //salt kills sperm
		"salt_water": { "elem1": "dead_cum_water", "elem2": null }, //killed and diluted
		"alcohol": { "elem1": "alcohol", "elem2": "dead_cum" }, //sperm die from alcohol, also I'm not implementing alcohol-water mixing
		"soap": { "elem1": "soap", "elem2": "dead_cum" }, //sperm die from soap
		"radiation": { "elem1": "radiation", "elem2": "dead_cum" }, //sperm die from radiation
	},
	tempLow: 0,
	stateLow: "cum_ice",
	viscosity: 30,
	category:"cum",
	conduct:0,
	extraInfo: "A whitish, sticky liquid that contains sperm. <span style=\"font-size: 0;\">It isn't funny.</span>",
	stain: 0.11,
},
elements.dead_cum = { 
	name: "dead cum",
	color: "#d0d0d0",
	behavior: [
		"ST%50|ST%50|ST%50",
		"M2 AND ST%65|XX|M2 AND ST%65",
		"M1 AND ST%80|M1 AND ST%80|M1 AND ST%80",
	],
	density: 997,
	tempHigh: 100,
	stateHigh: ["steam","burnt_cum"],
	reactions: {
		"water": { "elem1": "dead_cum_water", "elem2": "dead_cum_water", "chance":0.1 }, //cum mixing
		"cum_water": { "elem1": "cum_water", "elem2": "dead_cum", "chance":0.03, "oneway": true }, //cum mixing
		"cum": { "elem1": "cum", "elem2": "dead_cum", "chance":0.03, "oneway": true }, //cum mixing
		"dead_cum_water": { "elem1": "dead_cum_water", "elem2": "dead_cum", "chance":0.03, "oneway": true }, //cum mixing
		"dirt": { "elem1": null, "elem2": "dead_cummy_mud" }, //cum goes into dirt
		"mud": { "elem1": "dead_cum_water", "elem2": "dead_cummy_mud", "chance": (1/3) }, // cum goes into mud
		"sand": { "elem1": null, "elem2": "dead_cummy_sand" }, // cum goes into sand
		"wet_sand": { "elem1": "dead_cum_water", "elem2": "dead_cummy_sand", "chance": (1/3) }, // cum goes into wet sand
		"acid": { "elem1": "water", "elem2": "dead_cum_water" }, //dead cum is still basic
		"salt_water": { "elem1": "dead_cum_water", "elem2": "dead_cum_water" }, //salty mixing
		"salt": { "elem1": null, "elem2": "salt_water" }, //salty mixing
	},
	tempLow: 0,
	stateLow: "dead_cum_ice",
	viscosity: 20,
	state: "liquid",
	category:"cum",
	conduct: 0.04,
	hidden:true,
	extraInfo: "Semen whose sperm have died.",
	stain: 0.11,
},
elements.cum_water = {
	name: "cum water",
	color: "#a7c1db",
	behavior: [
		"XX|XX|XX",
		"M2|XX|M2",
		"M1|M1|M1",
	],
	reactions: {
		"sugar_water": { "elem1": "cum_water", "elem2": "cum_water", "chance":0.7 }, //sperm eat sugar
		"water": { "elem1": "cum_water", "elem2": "cum_water", "chance":0.7 }, //sperm eat sugar
		"dirt": { "elem1": "water", "elem2": "cummy_mud" }, //cum goes into dirt
		"sand": { "elem1": "water", "elem2": "cummy_sand" }, // cum goes into sand
		"sugar": { "elem1": null, "elem2": "cum_water", "chance":0.7 }, //sperm eat sugar
		"slime": { "elem1": "water", "elem2": "cum_slime" }, //cum enters slime
		"salt": { "elem1": null, "elem2": "dead_cum_water" }, //cum dies
		"salt_water": { "elem1": ["dead_cum_water", "salt_water"], "elem2": ["dead_cum_water", "salt_water"] }, //cum dies
		"acid": { "elem1": ["acid", "water"], "elem2": "water" }, //diluted cum is less effective
		"soap": { "elem1": "soap", "elem2": "dead_cum_water" },
		"alcohol": { "elem1": "alcohol", "elem2": "dead_cum_water" },
		"radiation": { "elem1": "radiation", "elem2": "dead_cum_water" },
	},
	density: 997,
	tempHigh: 35,
	stateHigh: "dead_cum_water",
	tempLow: 0,
	stateLow: "cum_water_ice",
	viscosity: 8,
	category: "cum",
	conduct: 0.03,
	state: "liquid",
	hidden: true,
	extraInfo: "Dilute semen.",
	stain: 0.04,
},
elements.dead_cum_water = {
	name: "dead cum water",
	color: "#b7b7c6",
	behavior: behaviors.LIQUID,
	reactions: {
		"acid": { "elem1": ["acid", "water"], "elem2": "water" }, //diluted cum is less effective
	},
	density: 997,
	tempHigh: 100,
	stateHigh: "steam",
	tempLow: 0,
	stateLow: "dead_cum_water_ice",
	viscosity: 8,
	category: "cum",
	state: "liquid",
	conduct: 0.03,
	hidden:true,
	extraInfo: "Dilute semen whose sperm have died.",
	stain: 0.04,
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
	state: "solid",
	tempHigh: 180,
	stateHigh: "ash",
	hidden: true,
	category: "cum",
	extraInfo: "A disgusting residue left from burnt semen.",
},
elements.cum_ice = {
	name: "frozen cum",
	color: "#cfe2e6",
	behavior: behaviors.WALL,
	reactions: {
		"acid": { "elem1": "water", "elem2": ["cum_water_ice", "dead_cum_water_ice", "dead_cum_water_ice", "dead_cum_water_ice", "dead_cum_water_ice"] }, //frozen bases are still basic
		"alcohol": { "elem1": "alcohol", "elem2": "dead_cum_ice" }, //alcohol kills things
		"soap": { "elem1": "soap", "elem2": "dead_cum_ice" }, //soap also kills things
		"radiation": { "elem1": "radiation", "elem2": "dead_cum_ice" }, //so does radiation
	},
	density: 917,
	temp: 0,
	tempHigh: 5,
	stateHigh: "cum",
	state: "solid",
	category: "cum",
	extraInfo: "Frozen semen.",
	breakInto: "cum_snow",
},
elements.cum_water_ice = {
	name: "cummy ice",
	color: "#cae3e8",
	behavior: behaviors.WALL,
	reactions: {
		"acid": { "elem1": ["water", "acid"], "elem2": "ice" }, //less concentrated frozen bases are less basic then more concentrated frozen bases
		"alcohol": { "elem1": "alcohol", "elem2": "dead_cum_water_ice" }, //alcohol kills things
		"soap": { "elem1": "soap", "elem2": "dead_cum_water_ice" }, //soap also kills things
		"radiation": { "elem1": "radiation", "elem2": "dead_cum_water_ice" }, //so does radiation
	},
	density: 917,
	temp: 0,
	tempHigh: 5,
	stateHigh: "cum_water",
	state: "solid",
	category: "cum",
	hidden: true,
	extraInfo: "Dilute, frozen semen.",
	breakInto: ["snow","cum_snow"],
},
elements.dead_cum_ice = {
	name: "dead frozen cum",
	color: "#d5d5ec",
	behavior: behaviors.WALL,
	reactions: {
		"acid": { "elem1": "water", "elem2": "dead_cum_water_ice" },
	},
	density: 917,
	temp: 0,
	state: "solid",
	tempHigh: 5,
	stateHigh: "dead_cum",
	category: "cum",
	hidden:true,
	extraInfo: "Frozen semen whose sperm have died.",
	breakInto: "dead_cum_snow",
},
elements.dead_cum_water_ice = {
	name: "dead cummy ice",
	color: "#e2e2e7",
	behavior: behaviors.WALL,
	reactions: {
		"acid": { "elem1": ["acid", "water"], "elem2": "ice" },
	},
	density: 917,
	temp: 0,
	tempHigh: 5,
	stateHigh: "cum_water",
	state: "solid",
	category: "cum",
	hidden:true,
	extraInfo: "Dilute, frozen semen whose sperm have died.",
	breakInto: ["snow","dead_cum_snow"],
},
elements.cum_snow = {
	color: "#eff6fa",
	behavior: behaviors.POWDER,
	temp: -5,
	tempHigh: 0,
	stateHigh: "cum",
	category: "cum",
	hidden: true,
	state: "solid",
	density: 100,
},
elements.dead_cum_snow = {
	color: "#c6c6c3",
	behavior: behaviors.POWDER,
	temp: -5,
	tempHigh: 0,
	stateHigh: "dead_cum",
	category: "cum",
	hidden: true,
	state: "solid",
	density: 100,
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
		"acid": { "elem1": ["acid", "water"], "elem2": "mud" },
		"soap": { "elem1": "soap", "elem2": "dead_cummy_mud" },
		"alcohol": { "elem1": "alcohol", "elem2": "dead_cummy_mud" },
		"radiation": { "elem1": "radiation", "elem2": "dead_cummy_mud" },
	},
	tempLow: -50,
	stateLow: "cummy_permafrost",
	tempHigh: 35,
	stateHigh: "dead_cummy_mud",
	category:"cum",
	state:"solid",
	density: 1740,
	hidden: true,
	extraInfo: "Dirt that has absorbed semen.",
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
		"acid": { "elem1": ["acid", "water"], "elem2": "wet_sand" },
		"soap": { "elem1": "soap", "elem2": "dead_cummy_sand" },
		"alcohol": { "elem1": "alcohol", "elem2": "dead_cummy_sand" },
		"radiation": { "elem1": "radiation", "elem2": "dead_cummy_sand" },
	},
	tempHigh: 35,
	stateHigh: "dead_cummy_sand",
	category: "cum",
	state: "solid",
	density: 1915,
	hidden: true,
	extraInfo: "Sand that has absorbed semen.",
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
		"acid": { "elem1": ["acid", "water"], "elem2": "mud" },
	},
	tempLow: -50,
	stateLow: "dead_cummy_permafrost",
	tempHigh: 100,
	stateHigh: "mudstone",
	category:"cum",
	state:"solid",
	density: 1740,
	hidden:true,
	extraInfo: "Dirt that has absorbed semen. The sperm are dead.",
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
		"acid": { "elem1": ["acid", "water"], "elem2": "wet_sand" },
	},
	tempHigh: 100,
	stateHigh: "packed_sand",
	category: "cum",
	state: "solid",
	density: 1915,
	hidden:true,
	extraInfo: "Sand that has absorbed semen. The sperm are dead.",
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
		"acid": { "elem1": ["acid", "water"], "elem2": "slime" },
	},
	density: 1470,
	tempHigh: 150,
	stateHigh: ["steam","steam","burnt_cum","burnt_cum","slime"],
	hidden:true,
	extraInfo: "Slime that has absorbed semen.",
},
elements.cummy_snake = {
	color: "#bfbfbf",
	behavior: [
		"XX|CH:cum_ice>cum%1 AND SW:cum%20|XX",
		"CH:cum_ice>cum%1 AND SW:cum%20|LB:cum_ice AND RT%5|M1 AND BO:1,2,3 AND CH:cum_ice>cum%1 AND SW:cum%20",
		"XX|CH:cum_ice>cum%1 AND SW:cum%20|XX",
	],
	state: "solid",
	rotatable: true,
	category: "cum",
	extraInfo: "It moves in a snake-like pattern and leaves a trail of solid semen. It can melt through this semen if it is trapped.",
},
elements.penis = {
	color: "#9c5e5f",
	behavior: [
		"XX|CR:cum,cum,cum,precum%6|XX",
		"CR:cum,cum,cum,precum%6|XX|CR:cum,cum,cum,precum%6",
		"XX|CR:cum,cum,cum,precum%6|XX",
	],
	behaviorOn: [
		"precum_ice%10|CR:cum,cum,cum,cum,precum%10|precum_ice%10",
		"precum_ice%10|XX|precum_ice%10",
		"precum_ice%10|precum_ice%10|precum_ice%10",
	],
	rotatable: false,
	state: "solid",
	category: "cum",
	conduct: 1,
	tempHigh: 60,
	stateHigh: "rotten_meat",
	extraInfo: "A piece of living tissue from which semen exits.",
},
elements.cummy_permafrost = {
	name: "cummy permafrost",
	color: "#86b5a5",
	behavior: behaviors.SUPPORT,
	reactions: {
		"acid": { "elem1": ["acid", "water"], "elem2": "permafrost" },
		"soap": { "elem1": "soap", "elem2": "dead_cummy_permafrost" },
		"alcohol": { "elem1": "alcohol", "elem2": "dead_cummy_permafrost" },
		"radiation": { "elem1": "radiation", "elem2": "dead_cummy_permafrost" },
	},
	temp: -50,
	state: "solid",
	tempHigh: 0,
	stateHigh: "cummy_mud",
	category: "cum",
	hidden: true,
	extraInfo: "Frozen, semen-infused mud.",
}
elements.dead_cummy_permafrost = {
	name: "dead cummy permafrost",
	color: "#b4bfbb",
	behavior: behaviors.SUPPORT,
	reactions: {
		"acid": { "elem1": ["acid", "water"], "elem2": "permafrost" },
	},
	temp: -50,
	tempHigh: 0,
	stateHigh: "dead_cummy_mud",
	category: "cum",
	state: "solid",
	hidden: true,
	extraInfo: "Frozen mud infused with lifeless semen.",
}
elements.precum = { 
	name: "pre-cum",
	color: "#d0d0d0",
	behavior: [
		"ST%50|ST%50|ST%50",
		"M2 AND ST%65|XX|M2 AND ST%65",
		"M1 AND ST%80|M1 AND ST%80|M1 AND ST%80",
	],
	density: 997,
	tempHigh: 100,
	stateHigh: "steam",
	reactions: {
		"acid": { "elem1": "water", "elem2": ["precum", "precum", "precum", "precum", "precum", "precum", "precum", "water", "water", "water"] }, //precum is still basic
	},
	tempLow: 0,
	stateLow: "precum_ice",
	viscosity: 20,
	category:"cum",
	state: "liquid",
	extraInfo: "A sticky fluid that neutralizes acid.",
	stain: 0.03,
},
elements.precum_ice = { 
	name: "frozen pre-cum",
	color: "#e0e4f0",
	behavior: behaviors.WALL,
	density: 917,
	tempHigh: 0,
	stateHigh: "precum",
	reactions: {
		"acid": { "elem1": "water", "elem2": ["precum_ice", "precum_ice", "precum_ice", "precum_ice", "precum_ice", "precum_ice", "precum_ice", "ice", "ice", "ice"] },
	},
	viscosity: 20,
	temp: -5,
	category:"cum",
	hidden: true,
	state: "solid",
	extraInfo: "Frozen pre-ejaculate.",
	breakInto: "precum_snow",
},
elements.precum_snow = {
	color: "#d7e5e9",
	behavior: behaviors.POWDER,
	reactions: {
		"acid": { "elem1": "water", "elem2": ["precum_snow", "precum_snow", "precum_snow", "precum_snow", "precum_snow", "precum_snow", "precum_snow", "water", "water", "water"] }, //precum snow is still basic
	},
	temp: -5,
	tempHigh: 0,
	stateHigh: "precum",
	category: "cum",
	hidden: true,
	state: "solid",
	density: 100,
},

elements.precum.conduct = elements.water.conduct;

// Adding reactions to existing elements
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
elements.cell.reactions.cum = { "elem1":"cum", "chance":0.01 }

elements.acid.ignore.push("water")

runAfterLoad(function() {
	
    if(enabledMods.includes("mods/fey_and_more.js")) {
		//cum elements as impurities {
			eLists.IMPURITY.push("cum");
			eLists.IMPURITY.push("cum_water");
			eLists.IMPURITY.push("cum_ice");
			eLists.IMPURITY.push("precum");
			eLists.IMPURITY.push("precum_ice");
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
			eLists.IMPURITY.push("dead_cummy_permafrost");
			eLists.IMPURITY.push("cummy_snake");
			eLists.IMPURITY.push("cum_slime");
			eLists.IMPURITY.push("burnt_cum");
			eLists.IMPURITY.push("cum_fairy");
			eLists.IMPURITY.push("cum_bomb");
			eLists.IMPURITY.push("cum_reviver");
			eLists.IMPURITY.push("cum_snow");
			eLists.IMPURITY.push("dead_cum_snow");
			eLists.IMPURITY.push("precum_snow");
		//}
		//regenerate behaviors of elements that use eLists.IMPURITY {
			elements.pure_water.behavior = [
				"DL:"+eLists.IMPURITY+"|DL:"+eLists.IMPURITY+"|DL:"+eLists.IMPURITY+"",
				"DL:"+eLists.IMPURITY+" AND M2|XX|DL:"+eLists.IMPURITY+" AND M2",
				"DL:"+eLists.IMPURITY+" AND M1|DL:"+eLists.IMPURITY+" AND M1|DL:"+eLists.IMPURITY+" AND M1",
			];
			elements.pure_steam.behavior = [
				"M2 AND DL:"+eLists.IMPURITY+"|M1 AND DL:"+eLists.IMPURITY+"|M2 AND DL:"+eLists.IMPURITY+"",
				"M1 AND DL:"+eLists.IMPURITY+"|XX|M1 AND DL:"+eLists.IMPURITY+"",
				"M2 AND DL:"+eLists.IMPURITY+"|M1 AND DL:"+eLists.IMPURITY+"|M2 AND DL:"+eLists.IMPURITY+"",
			];
		//}
		//cum fairy {
			elements.cum_fairy = {
				color: ["#e3e3cf", "#f4f7de", "#f4f3e3", "#e0e0dd"],
				state: "solid",
				behavior: [
					"XX|M1|M1",
					"XX|FX%5|XX",
					"XX|CR:cum%0.5 AND CR:fairy_dust%0.005 AND M1|M1",
				],
				category: "fey",
			};
		//}
		//eList rebuilding {
			eLists.FAIRY.push("cum_fairy");
			elements.iron.behavior = [
				"XX|DL:"+eLists.FAIRY+"|XX",
				"DL:"+eLists.FAIRY+"|XX|DL:"+eLists.FAIRY+"",
				"XX|DL:"+eLists.FAIRY+"|XX"
			];
			elements.silver.behavior = [
				"XX|DL:"+eLists.FAIRY+"|XX",
				"DL:"+eLists.FAIRY+"|XX|DL:"+eLists.FAIRY+"",
				"XX|DL:"+eLists.FAIRY+"|XX"
			];
		//}
		//concoction support (it's all mistakes) {
			elements.concoction.reactions.cum = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.cum_water = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.cum_ice = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.cum_snow = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.precum = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.precum_ice = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.precum_snow = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.cummy_ice = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.dead_cum = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.dead_cum_water = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.dead_cum_ice = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.dead_cum_snow = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.dead_cummy_ice = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.cummy_mud = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.cummy_sand = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.cummy_permafrost = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.dead_cummy_mud = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.dead_cummy_sand = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.dead_cummy_permafrost = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.burnt_cum = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.cum_slime = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.cummy_snake = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.penis = { "elem1": "mistake", "elem2": null }
			elements.concoction.reactions.cum_bomb = { "elem1": "mistake", "elem2": null }
		//}
		//cum fairy creation {
			elements.fairy.reactions.cum = { "elem1": "cum_fairy" }
		//}
	};

    if(enabledMods.includes("mods/fey_and_more.js") && enabledMods.includes("mods/randomness.js")) {
		//additional eList rebuilding for RM steel derivatives
		elements.tungstensteel.behavior = [
			"XX|DL:"+eLists.FAIRY+"|XX",
			"DL:"+eLists.FAIRY+"|XX|DL:"+eLists.FAIRY+"",
			"XX|DL:"+eLists.FAIRY+"|XX",
		],
		elements.molten_tungstensteel.behavior = [
			"XX|DL:"+eLists.FAIRY+" AND CR:fire%2.5|XX",
			"DL:"+eLists.FAIRY+" AND M2|XX|DL:"+eLists.FAIRY+" AND M2",
			"M1|DL:"+eLists.FAIRY+"|M1",
		]
	};
});
