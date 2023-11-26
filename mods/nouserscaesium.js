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
};
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
};
elements.caesium_vapor = {
	color: ["#d89e77", "#cd9064", "#af6f34", "#a26320"],
	behavior: behaviors.GAS,
	category: "states",
	state: "gas",
	tempLow: 660,
	stateLow: "molten_caesium",
	density: 1.7,
	temp: 700
}