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

elements.cotton_candy = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	density: 1000,
	color: "#b6c7e3",
	behavior: behaviors.POWDER,
	category: "food",
	state: "liquid",
	reactions: {
		"water": { elem1: "sugar", elem2: null },
	}
};

elements.mc_donalds = {
	tempHigh: 6969,
	stateHigh: "void",
	density: 69,
	color: "#ff0000",
	behavior: behaviors.STURDYPOWDER,
	category: "joke",
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
	breakInto: "watermelon_flesh",
	color: "#40993f",
	behavior: behaviors.SUPPORT,
	category: "food",
	state: "solid",
};

elements.melon = { //this one is kind of boring ngl it looks like a sponge but its food
	isFood: true,
	tempHigh: 500,
	stateHigh: "steam",
	color: "#c4bf1f",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
};

elements.watermelon_flesh = {
	hidden: true,
	isFood: true,
	tempHigh: 500,
	stateHigh: "steam",
	color: "#ff5d47",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
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

elements.green_berries = {
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
	tempHigh: 500,
	stateHigh: "melted_meth",
	color: "#0affef",
	behavior: behaviors.POWDER,
	category: "joke",
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

elements.lemon = {
	breakInto: "lemonade",
	tempHigh: 500,
	stateHigh: "steam",
	color: "#c9c22a",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
}

elements.lemon.reactions = {
	"juice": { elem1: null, elem2: "lemonade" }
}

elements.lemonade = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "steam",
	color: "#fff41c",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "liquid",
};

elements.poop = {
	hardness: 1,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#331600",
	behavior: behaviors.STURDYPOWDER,
	category: "joke",
	state: "solid",
	reactions: {
		"piss": { elem1: null, elem2: "bless" },
	}
};

elements.marshmallow = {
	isFood: true,
	tempHigh: 50,
	stateHigh: "cooked_marshmallow",
	color: "#ffe4e3",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
};

elements.cooked_marshmallow = {
	hidden: true,
	isFood: true,
	tempHigh: 150,
	stateHigh: "burnt_marshmallow",
	color: "#d49e9d",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.burnt_marshmallow = {
	hidden: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#1c1212",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
};

elements.ramen = {
	isFood: true,
	tempHigh: 90,
	stateHigh: "cooked_ramen",
	color: "#fae34d",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
};

elements.cooked_ramen = {
	hidden: true,
	density: 800,
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#ada24e",
	behavior: behaviors.SUPPORT,
	category: "food",
	state: "liquid",
}

elements.cereal = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: ["#ba3425", "#baa31e", "#26ba1e", "#1e9dba", "#6f1eba"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.sushi = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: ["#020802", "#fff0eb", "#ff6524", "#35ab26"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.indestructible_wall = {
	noMix: true,
	tempHigh: 99999999999999999999999999999999,
	stateHigh: "void",
	hardness: 1,
	color: "#7a7a7a",
	behavior: behaviors.WALL,
	category: "solids",
	state: "solid",
};

elements.diamond_ore = {
	tempHigh: 1000,
	stateHigh: "ash",
	breakInto: "diamond",
	color: ["#525252", "#525252", "#525252", "#525252", "#525252", "#2ba3ff"],
	behavior: behaviors.WALL,
	category: "joke",
	state: "solid",
};

elements.coca_cola = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "steam",
	color: "#381e13",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "liquid",
};

elements.piss = {
	tempHigh: 500,
	stateHigh: "steam",
	color: "#ffff00",
	behavior: behaviors.LIQUID,
	category: "joke",
	state: "liquid",
};

elements.soup = {
	isFood: true,
	temp: 50,
	tempHigh: 500,
	stateHigh: "steam",
	color: "#945e00",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "liquid",
};

elements.pastry = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#ba6727",
	behavior: behaviors.SUPPORT,
	category: "food",
	state: "solid",
};

elements.melted_meth = {
	tempHigh: 100000,
	stateHigh: "beans",
	color: "#00a2ff",
	behavior: behaviors.LIQUID,
	category: "joke",
	state: "solid",
};

elements.expired_milk = {
	tempHigh: 500,
	stateHigh: "ash",
	color: "#b8c2b4",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "solid",
	reactions: {
		"dirty_water": { elem1: "milk", elem2: "expired_milk" },
		"milk": { elem1: "expired_milk", elem2: "milk" },
		"water": { elem1: "milk", elem2: "dirty_water" },
	}
};

elements.kfc = {
	tempHigh: 69420,
	stateHigh: "void",
	color: "#d16e11",
	behavior: behaviors.STURDYPOWDER,
	category: "joke",
	state: "solid",
};

elements.wendys = {
	tempHigh: 69420,
	stateHigh: "void",
	color: "#db1e0d",
	behavior: behaviors.STURDYPOWDER,
	category: "joke",
	state: "solid",
};

elements.burger_king = {
	tempHigh: 69420,
	stateHigh: "void",
	color: "#db660d",
	behavior: behaviors.STURDYPOWDER,
	category: "joke",
	state: "solid",
};

elements.pizza_hut = {
	tempHigh: 69420,
	stateHigh: "void",
	color: "#ed3b24",
	behavior: behaviors.STURDYPOWDER,
	category: "joke",
	state: "solid",
};

elements.dominos = {
	tempHigh: 69420,
	stateHigh: "void",
	color: ["#ed4934", "#3494ed"],
	behavior: behaviors.STURDYPOWDER,
	category: "joke",
	state: "solid",
};


elements.vape = {
	tempHigh: 500999,
	stateHigh: "beans",
	color: "#999999",
	behavior:  [
        "XX|CR:smoke|XX",
        "CR:smoke|XX|CR:smoke",
        "XX|CR:smoke|XX",
    ],
	category: "joke",
	state: "solid",
};

elements.tendon = {
	temp: 20000,
	color: ["#1eff00", "#1eff00", "#1eff00", "#acffa1", "#1eff00", "#1eff00", "#1eff00"],
	behavior: behaviors.DGAS,
	category: "energy",
	state: "gas",
};

elements.plasma.tempHigh = 18000
elements.plasma.stateHigh = "tendon"

elements.pea = {
	isFood: true,
	breakInto: "mashed_pea",
	tempHigh: 500,
	stateHigh: "ash",
	color: "#3cbf2a",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
};

elements.mashed_pea = {
	hidden: true,
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#97f578",
	behavior: behaviors.POWDER,
	category: "food",
	state: "liquid",
};

elements.beans = {
	isFood: true,
	viscosity: 1000,
	density: 721,
	hardness: 1,
	color: ["#ff751f", "#ff411f"],
	category: "food",
	behavior: behaviors.LIQUID,
	state: "liquid",
};

elements.chicken = {
	tempHigh: 60,
	stateHigh: "chicken_nugget",
	color: "#cfbab0",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
};

elements.chicken_nugget = {
	hidden: true,
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#e0723f",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.cocaine = {
	tempHigh: 500,
	stateHigh: "ash",
	color: "#fafafa",
	behavior: behaviors.POWDER,
	category: "joke",
	state: "liquid",
};

elements.zombie = {
	viscosity: 1000,
	density: 1000,
	hardness: 1,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#114700",
	behavior: behaviors.LIQUID,
	category: "special",
	state: "liquid",
};

elements.toothpaste = {
	tempHigh: 500,
	stateHigh: "ash",
	color: ["#e8e8e8", "#ff0000", "#00b7ff"],
	behavior: behaviors.STURDYPOWDER,
	category: "liquids",
	state: "liquid",
};

elements.radioactive_grape = {
	hidden: true,
	tempHigh: 1000,
	stateHigh: "ash",
	color: "#7d00d1",
	behavior: behaviors.RADPOWDER,
	category: "food",
	state: "liquid",
};


elements.shampoo = {
	viscosity: 1000,
	density: 500,
	hardness: 1,
	tempHigh: 500,
	stateHigh: "steam",
	color: "#ccd3e0",
	behavior: behaviors.FOAM,
	category: "liquids",
	state: "liquid",
};

elements.salami = {
	density: 1000,
	hardness: 1,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#de3c1d",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.moon = {
	density: 3344,
	hardness: 1,
	tempHigh: 10000,
	stateHigh: "beans",
	color: "#bababa",
	behavior: behaviors.WALL,
	category: "special",
	state: "solid",
};

elements.dragon_fruit = {
	breakInto: "mashed_dragon_fruit",
	tempHigh: 500,
	stateHigh: "ash",
	color: ["#ff006f", "#ff006f", "#ff006f", "#036300", "#ff006f", "#ff006f", "#ff006f", "#ff006f"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.mashed_dragon_fruit = {
	hidden: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: ["#e3e3e3", "#e3e3e3", "#0f0f0f", "#e3e3e3", "#e3e3e3", "#e3e3e3"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.chantilly = {
	hardness: 1,
	tempHigh: 500,
	stateHigh: "steam",
	color: "#cccccc",
	behavior: behaviors.FOAM,
	category: "liquids",
	state: "liquid",
};

elements.fart = {
	tempHigh: 99999999999,
	stateHigh: "void",
	color: "#2e4722",
	behavior: behaviors.DGAS,
	category: "joke",
	state: "gas",
};

elements.chips = {
	density: 600,
	hidden: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#ff9a1f",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.fries = {
	density: 600,
	hidden: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#d6ab0f",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.mayo = {
	viscosity: 2000,
	density: 1200,
	tempHigh: 500,
	stateHigh: "steam",
	color: ["#ffe896", "#fff3c7"],
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "liquid",
};

elements.barbecue_sauce = {
	viscosity: 3000,
	density: 1800,
	tempHigh: 500,
	stateHigh: "steam",
	color: "#420400",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "liquid",
};

elements.fried_water = {
	temp: 50,
	hidden: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#a3591c",
	behavior: behaviors.POWDER,
	category: "joke",
	state: "liquid",
};

elements.solid_water = {
	hidden: true,
	tempHigh: 100,
	stateHigh: "fried_water",
	color: "#dfe9f5",
	behavior: behaviors.STURDYPOWDER,
	category: "joke",
	state: "liquid",
};

elements.grape.reactions = {
	"radiation": { elem1: null, elem2: "radioactive_grape" }
};

elements.egg.reactions = {
	"water": { elem1: "boiled_egg", tempMin: 100 },
	"steam": { elem1: "boiled_egg", tempMin: 100 }
};

elements.potato.reactions = {
	"water": { elem1: "fries", tempMin: 100, chance: 50 },
	"water": { elem1: "chips", tempMin: 100, chance: 50 },
	"steam": { elem1: "fries", tempMin: 100, chance: 50 },
	"steam": { elem1: "fries", tempMin: 100, chance: 50 },
};

elements.water.reactions = {
	"cocaine": { elem1: null, elem2: "solid_water", chance: 1 }
}
