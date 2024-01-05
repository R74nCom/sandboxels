elements.burnt_rice = {
	density: 699,
	color: "#242424",
	behavior: behaviors.POWDER,
	category: "food",
	state: "liquid",
	reactions: {
		"water": { elem1: null, elem2: "dirty_water" }
	}
};

elements.rice = {
	burnInto: "burnt_rice",
	density: 696,
	tempHigh: 232,
	stateHigh: "burnt_rice",
	color: "#d1d1d1",
	behavior: behaviors.POWDER,
	category: "food",
	state: "liquid",
};

elements.moth = {
	color: "#57381a",
	behavior: behaviors.GAS,
	category: "life",
	state: "solid",
};

elements.moss = {
	density: 1000,
	color: "#2d571a",
	behavior: behaviors.POWDER,
	category: "land",
	state: "solid",
};

elements.mc_donalds = {
	density: 69,
	color: "#ff0000",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
};

elements.maple_syrup = {
	density: 1333,
	hardness: 1,
	color: "#9c6000",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "liquid",
};

elements.boiled_egg = {
	density: 700,
	breakInto: "yolk",
	tempHigh: 500,
	stateHigh: "ash",
	color: "#fff9d1",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.dark_oak = {
	breakInto: "dark_oak_wood",
	tempHigh: 500,
	stateHigh: "ash",
	color: "#302216",
	behavior: behaviors.WALL,
	category: "solids",
	state: "solid",
};

elements.dark_oak_wood = {
	tempHigh: 500,
	stateHigh: "ash",
	color: "#573e28",
	behavior: behaviors.SUPPORT,
	category: "land",
	state: "solid",
};

elements.avocado = {
	tempHigh: 1000,
	breakInto: "guacamole",
	stateHigh: "ash",
	color: "#254a22",
	behavior: behaviors.SUPPORTPOWDER,
	category: "food",
	state: "liquid",
};

elements.guacamole = {
	tempHigh: 1000,
	stateHigh: "ash",
	color: "#a2e09d",
	behavior: behaviors.POWDER,
	category: "food",
	state: "liquid",
};

elements.watermelon = {
	tempHigh: 1000,
	stateHigh: "ash",
	breakInto: "water_from_the_melon",
	color: "#40993f",
	behavior: behaviors.SUPPORT,
	category: "food",
	state: "solid",
};

elements.water_from_the_melon = {
	tempHigh: 1000,
	stateHigh: "steam",
	color: "#ff5d47",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "liquid",
};

elements.nachos = {
	tempHigh: 1000,
	stateHigh: "ash",
	color: "#ff5d47",
	behavior: behaviors.SUPPORTPOWDER,
	category: "food",
	state: "solid",
};

elements.cherry = {
	tempHigh: 1000,
	stateHigh: "ash",
	color: "#ff0f0f",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
};

elements.green_cherry = {
	tempHigh: 1000,
	stateHigh: "ash",
	color: "#5ce344",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
};

elements.meth = {
	tempHigh: 5000,
	stateHigh: "steam",
	color: "#0affef",
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
};
