elements.piss = { 
	name: "piss",
	color: "#f7d96a",
	behavior: [
		"SW:piss_water%15|SW:piss_water%15|XX AND SW:piss_water%15",
		"M2 AND SW:piss_water%15|XX|M2 AND SW:piss_water%15",
		"M1 AND SW:piss_water%15|M1 AND SW:piss_water%15|M1 AND SW:piss_water%15",
	],
	density: 997,
	tempHigh: 100,
	stateHigh: ["steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","urea"],
	reactions: {
		"water": { "elem1": "piss_water", "elem2": "piss_water", "chance":0.7 }, //piss mixing
		"dirt": { "elem1": null, "elem2": "pissed_mud" }, //piss goes into dirt
		"mud": { "elem1": "piss_water", "elem2": "pissed_mud", "chance": (1/3) }, // piss goes into mud
		"sand": { "elem1": null, "elem2": "pissed_sand" }, // piss goes into sand
		"wet_sand": { "elem1": "piss_water", "elem2": "pissed_sand", "chance": (1/3) }, // piss goes into wet sand
		"snow": { "elem1": null, "elem2": "pissed_snow" }, // piss goes into snow
		"blood": { "elem1": "infection", "elem2": "infection" }, // piss infects blood
	},
	tempLow: 0,
	stateLow: "piss_ice",
	viscosity: 1,
	category: "piss",
	state: "liquid",
	conduct:elements.water.conduct+0.1,
	extraInfo: "A liquid excreted as waste by many animals.",
	stain: 0.07,
},

elements.piss_water = {
	name: "piss water",
	color: "#cae695",
	behavior: [
		"SW:piss%5|SW:piss%5|SW:piss%5",
		"M2 AND SW:piss%5|XX|M2 AND SW:piss%5",
		"M1 AND SW:piss%5|M1 AND SW:piss%5|M1 AND SW:piss%5",
	],
	reactions: {
		"water": { "elem1": "piss_water", "elem2": "piss_water", "chance":0.7 }, //piss mixing
		"dirt": { "elem1": "water", "elem2": "pissed_mud" }, //piss goes into dirt
		"sand": { "elem1": "water", "elem2": "pissed_sand" }, // piss goes into sand
		"snow": { "elem1": null, "elem2": "pissed_snow" }, // piss goes into snow
		"blood": { "elem1": "infection", "elem2": "infection" }, // piss infects blood
	},
	density: 997,
	tempHigh: 100,
	stateHigh: ["steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","urea"],
	tempLow: 0,
	stateLow: "piss_water_ice",
	viscosity: 1,
	state: "liquid",
	category: "piss",
	conduct: elements.water.conduct+0.05,
	hidden: true,
	stain: 0.05,
},

elements.piss_ice = {
	name: "frozen piss",
	color: "#fff7c4",
	behavior: behaviors.WALL,
	reactions: {
		"blood": { "elem2": "infection" }, // piss stuff on surface infects blood
	},
	density: 917,
	temp: -10,
	tempHigh: 0,
	stateHigh: "piss",
	state: "solid",
	category: "piss",
	breakInto: "pissed_snow",
},

elements.piss_water_ice = {
	name: "pissed ice",
	color: "#effcd7",
	reactions: {
		"blood": { "elem2": "infection" }, // piss stuff on surface infects blood
	},
	density: 917,
	temp: -10,
	tempHigh: 0,
	stateHigh: "piss_water",
	category: "piss",
	state: "solid",
	hidden: true,
	breakInto: "pissed_snow",
},

elements.pissed_snow = {
	name: "yellow snow",
	color: "#fdf5a4",
	behavior: behaviors.POWDER,
	reactions: {
		"blood": { "elem2": "infection" }, // piss stuff on surface infects blood
	},
	temp: -5,
	tempHigh: 0,
	stateHigh: "piss",
	state: "solid",
	category: "piss",
	hidden: true,
	density: 100,
},

elements.pissed_mud = {
	name: "pissed mud",
	color: "#b8ae82",
	behavior: [
		"XX|ST:40|XX",
		"ST:50|XX|ST:50",
		"M2|M1|M2",
	],
	reactions: {
		"water": { "elem1": "mud", "elem2": "piss_water", "chance": (3/4) },
		"water": { "elem2": "mud", "elem2": "piss" },
		"blood": { "elem2": "infection" }, // piss stuff on surface infects blood
	},
	tempLow: -50,
	stateLow: "pissed_permafrost",
	tempHigh: 100,
	stateHigh: "mud",
	category:"piss",
	state:"solid",
	density: 1740,
	hidden: true,
},

elements.pissed_sand = {
	name: "pissed sand",
	color: "#dbd874",
	behavior: [
		"XX|ST:35|XX",
		"ST:45|XX|ST:45",
		"M2|M1|M2",
	],
	reactions: {
		"water": { "elem1": "sand", "elem2": "piss_water", "chance": (3/4) },
		"water": { "elem2": "sand", "elem2": "piss" },
		"blood": { "elem2": "infection" }, // piss stuff on surface infects blood
	},
	tempHigh: 100,
	stateHigh: "wet_sand",
	category: "piss",
	state: "solid",
	density: 1915,
	hidden: true,
},

elements.pissed_permafrost = {
	name: "pissed permafrost",
	color: "#aecc89",
	behavior: behaviors.SUPPORT,
	reactions: {
		"blood": { "elem2": "infection" }, // piss stuff on surface infects blood
	},
	temp: -50,
	tempHigh: 0,
	stateHigh: "pissed_mud",
	category: "piss",
	state: "solid",
	hidden: true,
},

elements.piss_bomb = {
	color: "#ffea4d",
	behavior: [
		"XX|XX|XX",
		"XX|XX|XX",
		"M2|M1 AND EX:12>piss|M2",
	],
	category: "weapons",
	state: "solid",
	density: 1300,
},

elements.urea = {
	color: "#fef7ee", //once again mapping UV absorbances to the visible range
					  //https://www.researchgate.net/publication/266458879
					  //http://depts.washington.edu/cmditr/modules/lum/color.html
	behavior: behaviors.POWDER,
	state: "solid",
	density: 1320,
	tempHigh: 133,
	category: "powders",
},

elements.molten_urea = {
	tempHigh: 350, //https://pubs.acs.org/doi/pdf/10.1021/ie034052j
	stateHigh: ["ammonia","vaporized_isocyanic_acid"],
},

elements.liquid_isocyanic_acid = {
	color: "#ffe5f0", //now it's an IR spectrum
					  //https://www.researchgate.net/publication/231057584
	behavior: behaviors.LIQUID,
	reactions: {
		"water": { "elem1": "carbon_dioxide", "elem2": "ammonia" },
		"steam": { "elem1": "carbon_dioxide", "elem2": "ammonia" },
		"ice": { "elem1": "carbon_dioxide", "elem2": "ammonia" },
	},
	state: "liquid",
	density: 1140,
	tempHigh: 23,
	stateHigh: "vaporized_isocyanic_acid",
	tempLow: -86,
	stateLow: "frozen_isocyanic_acid",
	category: "liquids",
},

elements.frozen_isocyanic_acid = {
	color: "#ffe5f0",
	behavior: behaviors.WALL,
	reactions: {
		"water": { "elem1": "carbon_dioxide", "elem2": "ammonia" },
		"steam": { "elem1": "carbon_dioxide", "elem2": "ammonia" },
		"ice": { "elem1": "carbon_dioxide", "elem2": "ammonia" },
	},
	state: "solid",
	density: 1267,
	tempHigh: -86,
	stateHigh: "liquid_isocyanic_acid",
	category: "powders",
},

elements.vaporized_isocyanic_acid = {
	color: "#ffe5f0",
	behavior: behaviors.GAS,
	reactions: {
		"water": { "elem1": "carbon_dioxide", "elem2": "ammonia" },
		"steam": { "elem1": "carbon_dioxide", "elem2": "ammonia" },
		"ice": { "elem1": "carbon_dioxide", "elem2": "ammonia" },
	},
	state: "gas",
	density: 1026,
	tempLow: 23,
	stateLow: "liquid_isocyanic_acid",
	category: "gases",
}

runAfterLoad(function() {
	
    if(enabledMods.includes("mods/fey_and_more.js")) {
		//piss elements as impurities {
			eLists.IMPURITY.push("piss");
			eLists.IMPURITY.push("piss_water");
			eLists.IMPURITY.push("piss_ice");
			eLists.IMPURITY.push("piss_water_ice");
			eLists.IMPURITY.push("pissed_mud");
			eLists.IMPURITY.push("pissed_sand");
			eLists.IMPURITY.push("pissed_permafrost");
			eLists.IMPURITY.push("piss_fairy");
			eLists.IMPURITY.push("piss_bomb");
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
		//piss fairy {
			elements.piss_fairy = {
				color: ["#f7e660","#fdffbd","#ffe563"],
				state: "solid",
				behavior: [
					"XX|M1|M1",
					"XX|FX%5|XX",
					"XX|CR:piss%0.5 AND CR:fairy_dust%0.005 AND M1|M1",
				],
				category: "fey",
			};
		//}
		//eList rebuilding {
			eLists.FAIRY.push("piss_fairy");
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
			elements.concoction.reactions.piss = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.piss_water = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.piss_ice = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.piss_water_ice = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.pissed_mud = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.pissed_sand = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.pissed_permafrost = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.piss_bomb = { "elem1": "mistake", "elem2": null }
			elements.concoction.reactions.pissed_snow = { "elem1": "mistake", "elem2": null }
		//}
		//piss fairy creation {
			elements.fairy.reactions.piss = { "elem1": "piss_fairy" }
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
