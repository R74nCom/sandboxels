elements.burnt_rice = {
	tempHigh: 999,
	stateHigh: "ash",
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
	isFood: true,
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
	tempHigh: 500,
	stateHigh: "ash",
	color: "#57381a",
	behavior: behaviors.GAS,
	category: "life",
	state: "solid",
};

elements.moss = {
	tempHigh: 500,
	stateHigh: "ash",
	density: 1000,
	color: "#2d571a",
	behavior: behaviors.POWDER,
	category: "land",
	state: "solid",
};

elements.mc_donalds = {
	tempHigh: 6969,
	stateHigh: "void",
	density: 69,
	color: "#ff0000",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
};

elements.maple_syrup = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "steam",
	density: 1333,
	hardness: 1,
	color: "#9c6000",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "liquid",
};

elements.boiled_egg = {
	isFood: true,
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
	isFood: true,
	tempHigh: 500,
	breakInto: "guacamole",
	stateHigh: "ash",
	color: "#254a22",
	behavior: behaviors.SUPPORTPOWDER,
	category: "food",
	state: "liquid",
};

elements.guacamole = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#a2e09d",
	behavior: behaviors.POWDER,
	category: "food",
	state: "liquid",
};

elements.watermelon = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	breakInto: "water_from_the_melon",
	color: "#40993f",
	behavior: behaviors.SUPPORT,
	category: "food",
	state: "solid",
};

elements.water_from_the_melon = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "steam",
	color: "#ff5d47",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "liquid",
};

elements.nachos = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#bd7b26",
	behavior: behaviors.SUPPORTPOWDER,
	category: "food",
	state: "solid",
};

elements.cherry = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#ff0f0f",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
};

elements.green_cherry = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#5ce344",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
};

elements.meth = {
	hardness: 1,
	tempHigh: 5000,
	stateHigh: "steam",
	color: "#0affef",
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
};

elements.garlic = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#ffebbd",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	reactions: {
		"bread": { elem1: null, elem2: "garlic_bread" },
	}
};

elements.garlic_bread = {
	isFood: true,
	breakInto: "crumb",
	tempHigh: 500,
	stateHigh: "ash",
	color: ["#db9b56", "#288a0c", "#db9b56", "#db9b56", "#db9b56", "#db9b56"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
};

elements.kiwi = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: ["#0f4700", "#0f4700", "#0f4700", "#0f4700", "#0f4700", "#0f4700", "#0f4700", "#0f4700", "#0f4700", "#210a00"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
};

elements.peanut_butter = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#d4903d",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
};

elements.poop = {
	tempHigh: 500,
	stateHigh: "ash",
	color: "#331600",
	behavior: behaviors.STURDYPOWDER,
	category: "special",
	state: "solid",
};
