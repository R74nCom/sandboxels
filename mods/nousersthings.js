elements.caesium = {
color: ["#917921", "#ebcb59", "#a48b2d", "#d6b84c"],
behavior: behaviors.SOLID,
category: "solids",
state: "solid",
tempHigh: 28.44,
stateHigh: "molten_caesium",
density: 1873,
reactions: {
		"water": { "elem1":"pop", "elem2":"hydrogen" },
		"sugar_water": { "elem1":"pop", "elem2":"hydrogen" },
		"dirty_water": { "elem1":"pop", "elem2":"hydrogen" },
		"pool_water": { "elem1":"pop", "elem2":"hydrogen" },
		"salt_water": { "elem1":"pop", "elem2":"hydrogen" },
		"seltzer":  { "elem1":"pop", "elem2":"hydrogen" },
	}
},
elements.molten_caesium = {
	color: ["#735c0a", "#a68e37", "#7e6715", "#9b832e"],
	behavior: behaviors.LIQUID,
	category: "states",
	state: "liquid",
	tempLow: 27.44,
	stateLow: "caesium",
	tempHigh: 671,
	stateHigh: "caesium_vapor",
	density: 1843,
	temp: 29,
	reactions: {
		"water": { "elem1":"pop", "elem2":"hydrogen" },
		"sugar_water": { "elem1":"pop", "elem2":"hydrogen" },
		"dirty_water": { "elem1":"pop", "elem2":"hydrogen" },
		"pool_water": { "elem1":"pop", "elem2":"hydrogen" },
		"salt_water": { "elem1":"pop", "elem2":"hydrogen" },
		"seltzer":  { "elem1":"pop", "elem2":"hydrogen" },
	}
},
elements.caesium_vapor = {
	color: ["#d89e77", "#cd9064", "#af6f34", "#a26320"],
	behavior: behaviors.GAS,
	category: "states",
	state: "gas",
	tempLow: 660,
	stateLow: "molten_caesium",
	density: 1.7,
	temp: 700
},
elements.subzero_grass_seed = {
	color: ["#022c14", "#032911", "#032205", "#021f00"],
	behavior: [
	"XX|M2%0.1|XX",
	"XX|L2:subzero_grass AND C2:subzero_grass%15|XX",
	"XX|M1|XX",
	],
	category: "life",
	state: "solid",
	tempHigh: 10,
	temp: 0,
	stateHigh: "dead_plant",
	density: 1400
},
elements.subzero_grass = {
	color: ["#003220", "#022a1a", "#032314", "#001c0d"],
	behavior: behaviors.STURDYPOWDER,
	category: "life",
	state: "solid",
	tempHigh: 13,
	temp: 0,
	stateHigh: "dead_plant",
	density:1400
},
elements.technetium = {
	color: ["#e7d9bb", "#bab195", "#8f8a70", "#66654e"],
	behavior: [
	"XX|XX|XX",
	"XX|CH:neutron%0.07|XX",
	"XX|XX|XX",
	],
	category: "solids",
	state: "solid",
	tempHigh: 2157,
	stateHigh: "molten_technetium",
	density: 11500
},
 elements.molten_technetium = {
	color: ["#d16b42", "#da904c", "#dfb360", "#e2d57f"],
	behavior: behaviors.LIQUID,
	tick: function(pixel) {
		if (Math.random() < 0.0007) {
			changePixel(pixel, "neutron", false);
		}
	},
	category: "states",
	state: "liquid",
	tempLow: 2140,
	temp: 2200,
	stateLow: "technetium",
	density: 11400
}
