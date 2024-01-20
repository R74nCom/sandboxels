elements.cooked_rice = {
	viscosity: 1000,
	tempMin: 20,
	stateMin: "rice",
	tempHigh: 500,
	stateHigh: ["ash", "charcoal"],
	density: 699,
	color: "#c2b6b6",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "liquid",
	reactions: {
		"water": { elem1: null, elem2: "dirty_water" }
	}
};

elements.rice = {
	breakInto: "flour",
	viscosity: 10000,
	isFood: true,
	density: 696,
	tempHigh: 232,
	stateHigh: "cooked_rice",
	color: "#c8c8c8",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "liquid",
};

elements.moth = {
	tempHigh: 500,
	stateHigh: "ash",
	color: "#57381a",
	behavior: behaviors.FLY,
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

elements.cherry_cotton_candy = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	density: 1000,
	color: "#edd1e6",
	behavior: behaviors.POWDER,
	category: "food",
	state: "liquid",
	hidden: true,
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
	viscosity: 10000,
	isFood: true,
	tempHigh: 500,
	stateHigh: "steam",
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
	burn: 5,
	burnTime: 300,
};

elements.dark_oak_wood = {
	tempHigh: 500,
	stateHigh: "ash",
	color: "#573e28",
	behavior: behaviors.SUPPORT,
	category: "land",
	state: "solid",
	burn: 5,
	burnTime: 300,
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
	breakInto: "juice",
	breakIntoColor: "#a60000",
	tempHigh: 500,
	stateHigh: "ash",
	color: "#ff0f0f",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	reactions: {
		"cotton_candy": { elem1: null, elem2: "cherry_cotton_candy", tempMin: 0 },
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
	state: "liquid"
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
	reactions: {
        "juice": {elem1: "lemonade", elem2: null},
    }
};

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

elements.spaghetti = {
	isFood: true,
	tempHigh: 90,
	stateHigh: "cooked_ramen",
	color: "#fae34d",
	behavior: behaviors.SUPPORT,
	category: "food",
	state: "solid",
};

elements.cooked_spaghetti = {
	hidden: true,
	density: 800,
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#ada24e",
	behavior: behaviors.SUPPORT,
	category: "food",
	state: "solid",
};

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

elements.burnt_beans = {
	tempHigh: 500,
	stateHigh: "ash",
	isFood: true,
	viscosity: 10000,
	density: 721,
	hardness: 1,
	color: "#1a0d04",
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
	tempHigh: 500,
	stateHigh: "ash",
	color: "#114700",
	behavior: [
	    "M1%2|M1%2 AND SW%1|M1%2",
	    "M1%2 AND CH:zombie|XX|M1%2 AND CH:zombie",
		"M1|M1 AND SW%1|M1"
	],
	category: "special",
	state: "liquid",
	ignore: ["fire","smoke","antimatter","strange_matter","filler","lattice","wall","ewall","plasma","void","border"]
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
	color: ["#7d00d1", "#8047d6"],
	behavior: behaviors.RADPOWDER,
	category: "food",
	state: "liquid",
};

elements.radioactive_meat = {
	hidden: true,
	tempHigh: 1000,
	stateHigh: "ash",
    color: ["#4b5742", "#91564a"],
    behavior: behaviors.RADPOWDER,
    category: "food",
    state: "liquid",
};

elements.radioactive_chocolate = {
	hidden: true,
    tempHigh: 1000,
    stateHigh: "ash",
    color: ["#404d29", "#4d3429"],
    behavior: behaviors.RADPOWDER,
    category: "food",
    state: "liquid",
};

elements.radioactive_egg = {
	hidden: true,
	tempHigh: 1000,
    stateHigh: "ash",
    color: "#93cc87",
    behavior: behaviors.RADPOWDER,
    category: "food",
    state: "liquid",
};

elements.radioactive_milk = {
	hidden: true,
	tempHigh: 1000,
    stateHigh: "ash",
    color: "#9bb895",
    behavior: behaviors.RADLIQUID,
    category: "liquids",
    state: "liquid",
};

elements.radioactive_potato = {
	hidden: true,
	tempHigh: 1000,
    stateHigh: "ash",
    color: "#6e8544",
    behavior: behaviors.RADPOWDER,
    category: "food",
    state: "liquid",
};

elements.radioactive_water = {
	hidden: true,
	tempHigh: 1000,
    stateHigh: "steam",
    color: "#baf0aa",
    behavior: behaviors.RADLIQUID,
    category: "liquids",
    state: "liquid",
};

elements.radioactive_bread = {
	hidden: true,
	tempHigh: 1000,
    stateHigh: "ash",
    color: "#aec74c",
    behavior: behaviors.RADPOWDER,
    category: "food",
    state: "liquid",
};

elements.radioactive_toast = {
	hidden: true,
    tempHigh: 1000,
    stateHigh: "ash",
    color: "#565e38",
    behavior: behaviors.RADPOWDER,
    category: "food",
    state: "liquid",
};

elements.radioactive_beans = {
	hidden: true,
	tempHigh: 1000,
	stateHigh: "ash",
	color: ["#34541f", "#994926"],
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
	temp: Infinity,
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
	color: "#fcffbd",
    behavior: behaviors.LIQUID,
    reactions: {
        "glue": { elem2:null, chance:0.01 },
        "oil": { elem2:null, chance:0.01 },
        "sap": { elem2:null, chance:0.01 },
    },
    viscosity: 3491,
    tempHigh: 100.6,
    stateHigh: ["steam","carbon_dioxide","methane"],
    category:"liquids",
    state: "liquid",
    density: 910,
    stain: 0.01,
    isFood: true
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
	hidden: true,
	temp: 50,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#a3591c",
	behavior: behaviors.POWDER,
	category: "joke",
	state: "liquid",
};

elements.solid_water = {
	hidden: true,
	viscosity: 10000,
	tempHigh: 100,
	stateHigh: "fried_water",
	color: "#dfe9f5",
	behavior: behaviors.LIQUID,
	category: "joke",
	state: "liquid",
};

elements.vanilla = {
	hardness: 1,
	tempHigh: 300,
	stateHigh: "steam",
	color: "#e3e3e3",
	behavior: behaviors.FOAM,
	category: "food",
	state: "liquid",
	reactions: {
		"cream": { elem1: null, elem2: "vanilla_cream" },
		"ice_cream": { elem1: null, elem2: "vanilla_ice_cream" },
		"yolk": { elem1: null, elem2: "vanilla_pudding" },
	}
};

elements.vanilla_cream = {
	hardness: 1,
	hidden: true,
	tempHigh: 300,
	stateHigh: "steam",
	color: "#d6d6d6",
	behavior: behaviors.FOAM,
	category: "food",
	state: "liquid",
};

elements.vanilla_ice_cream = {
	hardness: 1,
	hidden: true,
	tempHigh: 200,
	stateHigh: "steam",
	color: "#f7f7f7",
	behavior: behaviors.FOAM,
	category: "food",
	state: "liquid",
	reactions: {
		"chocolate": { elem1: null, elem2: "chocolate_vanilla_ice_cream", tempMin: 0 },
		"melted_chocolate": { elem1: null, elem2: "chocolate_vanilla_ice_cream", tempMin: 0 },
	}
};

elements.chocolate_vanilla_ice_cream = {
	hardness: 1,
	hidden: true,
	tempHigh: 200,
	stateHigh: "steam",
	color: ["#dbdbdb", "#915936"],
	behavior: behaviors.FOAM,
	category: "food",
	state: "liquid",
};

elements.vanilla_pudding = {
	hardness: 1,
	hidden: true,
	tempHigh: 300,
	stateHigh: "steam",
	color: "#d4c4ba",
	behavior: behaviors.FOAM,
	category: "food",
	state: "liquid",
};

elements.cinnamon = {
	tempHigh: 500,
	stateHigh: "ash",
	color: "#3d1409",
	behavior: behaviors.POWDER,
	category: "powders",
	state: "liquid",
};

elements.porridge = {
	temp: 30,
	viscosity: 3000,
	density: 500,
	tempHigh: 500,
	stateHigh: "steam",
	color: "#b8a254",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "liquid",
};

elements.beet = {
	tempHigh: 400,
	stateHigh: "ash",
	color: "#5d0678",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.chocolate_egg = {
	hidden: true,
	tempHigh: 300,
	stateHigh: "steam",
	color: "#805e2e",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.chocolate_grape = {
	hidden: true,
	viscosity: 10000,
	tempHigh: 300,
	stateHigh: "steam",
	color: ["#9e3475", "#6e4d36"],
	behavior: behaviors.LIQUID,
	category: "food",
	state: "liquid",
};

elements.sprinkles = {
	tempHigh: 200,
	stateHigh: "ash",
	cooldown: 0.2,
	color: ["#ff5e5e", "#ffea5e", "#73ff5e", "#5efcff", "#995eff", "#ff5ed1"],
	behavior: behaviors.STURDYPOWDER,
	category: "powders",
	state: "liquid",
	maxSize: 1,
};

elements.incinerator = {
	color: "#bf4b7d",
	behavior: [
	"XX|HT:10000|XX",
	"HT:10000|XX|HT:10000",
	"XX|HT:10000|XX",
	],
	category: "machines",
	state: "solid",
	insulate: true,
	reactions: {
		"fart": { elem1: null, elem2: "ohio" },
	}
};

elements.cocoa = {
	breakInto: "cocoa_seeds",
	tempHigh: 300,
	stateHigh: "ash",
	color: "#912f1d",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
	reactions: {
	"milk": { elem1: null, elem2:"hot_chocolate" tempMin: 70} },
};

elements.cocoa_seeds = {
	breakInto: "chocolate",
	hidden: true,
	tempHigh: 80,
	stateHigh: "melted_chocolate",
	color: "#cfc7ab",
	behavior: behaviors.SUPPORT,
	category: "food",
	state: "solid",
};

elements.pineapple = {
	tempHigh: 200,
	stateHigh: "steam",
	color: "#ccbe3b",
	behavior: behaviors.SUPPORT,
	category: "food",
	state: "solid",
};

elements.broccoli = {
	viscosity: 100000,
	tempHigh: 300,
	stateHigh: "ash",
	color: "#073804",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "liquid",
};

elements.pepperoni = {
	tempHigh: 300,
	stateHigh: "ash",
	color: "#8f2e11",
	behavior: behaviors.SUPPORT,
	category: "food",
	state: "solid",
};

elements.pancake = {
	viscosity: 100000,
	tempHigh: 300,
	stateHigh: "ash",
	color: "#073804",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
};

elements.blueberry = {
	density: 626,
	viscosity: 10000,
	breakInto: "juice",
	breakIntoColor: "#0e2773",
	tempHigh: 200,
	stateHigh: "steam",
	color: "#192f73",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "liquid",
};

elements.cucumber = {
	tempHigh: 200,
	stateHigh: "steam",
	color: "#235214",
	behavior: behaviors.SUPPORT,
	category: "food",
	state: "solid",
};

elements.olive = {
	viscosity: 10000,
	tempHigh: 200,
	stateHigh: "steam",
	color: "#0d0806",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "liquid",
};

elements.mushroom = {
	tempHigh: 200,
	stateHigh: "steam",
	color: "#96847d",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.onion = {
	tempHigh: 300,
	stateHigh: "steam",
	color: "#460063",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.bacon = {
	tempHigh: 90,
	stateHigh: "cooked_bacon",
	color: ["#a1392d", "#edb4ad"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.cooked_bacon = {
	hidden: true,
	tempHigh: 300,
	stateHigh: "ash",
	color: ["#70211d", "#783b38"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.strawberry = {
	breakInto: "strawberry_juice",
	viscosity: 10000,
	density: 754,
	tempHigh: 200,
	stateHigh: "steam",
	color: "#db564d",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	
};

elements.beer = {
    tempHigh: 300,
    stateHigh: "steam",
    color: "#b39329",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
};

elements.strawberry_juice = {
	viscosity: 3000,
	density: 500,
	tempHigh: 500,
	stateHigh: "steam",
	color: "#ff9ec2",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "liquid",
	reactions: {
		"milk": { elem1: null, elem2: "strawberry_milk" },
};
	
elements.cardboard = {
	tempHigh: 500,
    stateHigh: "ash",
    color: "#7d4725",
    behavior: behaviors.SUPPORT,
    category: "land",
    state: "solid",
	burn: 5,
	burnTime: 200,
};

elements.carrot = {
	tempHigh: 500,
    stateHigh: "ash",
    color: "#f06c0e",
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "liquid",
};

elements.strawberry_milk = {
	viscosity: 3000,
	density: 500,
	tempHigh: 500,
	stateHigh: "steam",
	color: "#ffc4da",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "liquid",
};

elements.wine = {
	tempHigh: 400,
    stateHigh: "steam",
    color: "#2e0206",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
};

elements.plasma_bomb = {
	tempHigh: 1000,
    stateHigh: "ash",
    color: "#452f4a",
    behavior: [
	"XX|EX:20>plasma|XX",
	"XX|XX|XX",
	"M2|M1 AND EX:20>plasma|M2"
	],
    category: "weapons",
    state: "liquid",
},

elements.dark_energy = {
	hardness: 1,
	tempHigh: 1000000,
    stateHigh: "void",
    color: "#1b161c",
	behavior: [
	    "M1%10|M1%10 AND SW%5|M1%10",
	    "M1%10 AND CH:dark_energy|XX|M1%10 AND CH:dark_energy",
		"M1|M1 AND SW%5|M1"
	 ],
    category: "special",
    state: "gas",
};

elements.ohio = {
	hidden: true,
	hardness: 1,
	hidden: true,
    color: "#40174d",
    behavior: [
        "XX|XX|XX",
        "XX|EX:800>plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,molten_iron,molten_uranium,molten_lead,oxygen,molten_sodium,sulfur_gas,neon,chlorine,molten_calcium,molten_nickel,molten_copper,molten_zinc,gallium_gas AND CH:void|XX",
        "XX|XX|XX",
    ],
    temp: 99999999700,
	category: "joke",
    state: "gas",
	desc: "use at own risk",
};

elements.papaya = {
	tempHigh: 300,
	stateHigh: "steam",
	color: "#e38934",
	behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "liquid",
};

elements.caviar = {
	viscosity: 10000,
	tempHigh: 500,
    stateHigh: "steam",
    color: "#1f1b18",
    behavior: behaviors.LIQUID,
    category: "food",
    state: "liquid",
};

elements.peeper = {
	hidden: true,
	density: 1000,
	burn: 0.00001,
	burnTime: 9999,
	ignoreAir: true,
	burning: true,
	hardness: 1,
	tempHigh: 5000000000000000000,
	stateHigh: "ash",
	color: "#9c1208",
	behavior: behaviors.STURDYPOWDER,
    category: "joke",
    state: "solid",
};

elements.robux = {
	hidden: true,
	viscosity: 10000,
    tempHigh: 500,
    stateHigh: "fire",
    color: ["#4a8741", "#4bb53c"],
    behavior: behaviors.LIQUID,
    category: "joke",
    state: "liquid",
};

elements.ruby = {
	tempHigh: 2000,
	stateHigh: "magma",
	color: ["#d6091a", "#e83544"],
	behavior: behaviors.WALL,
	category: "solids",
	state: "solid",
};

elements.mosquito = {
	tempHigh: 2000,
	stateHigh: "ash",
	color: "#2b2421",
	behavior: behaviors.FLY,
	category: "life",
	state: "liquid",
};

elements.bug_spray = {
    tempHigh: 2000,
    stateHigh: "steam",
    color: "#c9d1cb",
    behavior: behaviors.DGAS,
    category: "gases",
    state: "gas",
	reactions: {
		"mosquito": { elem1: null, elem2: null },
		"ant": { elem1: null, elem2: null },
		"fly": { elem1: null, elem2: null },
		"stink_bug": { elem1: null, elem2: null },
	}
};

elements.heavy_water = {
	tempLow: 0,
	stateLow: "ice",
	tempHigh: 150,
	stateHigh: "steam",
	color: "#447ecf",
	behavior: behaviors.LIQUID_OLD,
	category: "liquids",
    state: "liquid",
};

elements.blood_orange = {
	hidden: true,
	tempHigh: 300,
	stateHigh: ["ash", "steam"],
    color: ["#f06c0e", "#bd1000"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "liquid",
};

elements.orange = {
    tempHigh: 300,
    stateHigh: "steam",
    color: "#f06c0e",
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "liquid",
	reactions: {
		"blood": { elem1: null, elem2: "blood_orange", chance: 0.01 },
	}
};

elements.cranberry = {
	viscosity: 10000,
	hidden: true,
    tempHigh: 300,
    stateHigh: "steam",
    color: "#ad2a1d",
    behavior: behaviors.LIQUID,
    category: "food",
    state: "liquid",
};

elements.yoyleberries = {
	desc: "who the fuck requested yoylecake?",
	viscosity: 10000,
    hidden: true,
    tempHigh: 300,
    stateHigh: "steam",
    color: "#630094",
    behavior: behaviors.LIQUID,
    category: "food",
    state: "liquid",
	reactions: {
		"batter": { elem1: null, elem2: "yoylecake" },
	}
};

elements.yoylecake = {
	hidden: true,
	tempHigh: 500,
	stateHigh: "steam",
	color: ["#9404db", "#28b82b"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.banana = {
	tempHigh: 300,
	stateHigh: "ash",
    color: "#f06c0e",
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "liquid",
};

elements.cool_ray = {
color: ["#0cdaed","#baf9ff"],
    tick: function(pixel) {
        var x = pixel.x;
        for (var y = pixel.y; y < height; y++) {
            if (outOfBounds(x, y)) {
                break;
            }
            if (isEmpty(x, y)) {
                if (Math.random() > 0.05) { continue }
                createPixel("flash", x, y);
                pixelMap[x][y].color = "#0cdaed";
                pixelMap[x][y].temp = 0;
            }
            else {
                if (elements[pixelMap[x][y].element].isGas) { continue }
                if (elements[pixelMap[x][y].element].id === elements.heat_ray.id) { break }
                pixelMap[x][y].temp += -10;
                pixelTempCheck(pixelMap[x][y]);
                break;
            }
        }
        deletePixel(pixel.x, pixel.y);
    },
    temp: 0,
    category: "energy",
    state: "gas",
    excludeRandom: true,
    noMix: true
};

elements.flood_disaster = {
	color: "#5397c2",
    behavior: [
        "XX|XX|XX",
        "XX|EX:10>flood_disaster,water,water,water,water,water,water,water,water,water,water,water,water%25 AND DL%10|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    hidden: true,
    excludeRandom: true,
    maxSize: 1,
    cooldown: defaultCooldown
};

elements.uranium_ice_cream = {
	viscosity: 10000,
	tempHigh: 150,
	stateHigh: "steam",
	color: ["#cee6cc", "#1bab11", "#305e2d", "#5a7059"],
	behavior: [
		"XX|CR:radiation%2|XX",
        "M2|XX|M2",
        "M2|M1|M2",
	],
    category: "food",
    state: "liquid",
};

elements.silver_coin = {
	tempHigh: 1000,
	stateHigh: "molten_silver",
	color: ["#ababab", "#dedede"],
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
};

elements.max_graphics_in_roblox = {
	color: "#238fe8",
    behavior: [
        "XX|XX|XX",
        "XX|EX:800000000000>plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,molten_iron,molten_uranium,molten_lead,oxygen,molten_sodium,sulfur_gas,neon,chlorine,molten_calcium,molten_nickel,molten_copper,molten_zinc,gallium_gas AND CH:void|XX",
        "XX|XX|XX",
    ],
    temp: 99999999700,
    category: "joke",
    state: "gas",
    density: 1000,
    hardness: 1,
    hidden: true,
    excludeRandom: true,
    maxSize: 1,
    noMix: true,
	desc: "ok now ACTUALLY use it at your own risk IM NOT KIDDING! THIS CAN FUCKING CRASH YOUR GAME"
};

elements.incinerate.category = "tools",
elements.cook.category = "tools",
elements.room_temp.category = "tools",

elements.beans.tempHigh = 349,
elements.beans.stateHigh = "burnt_beans"

if (!elements.radiation.reactions) elements.egg.reactions = {};
elements.radiation.reactions.meat = { elem1: null, elem2: "radioactive_meat" },
elements.radiation.reactions.grape = { elem1: null, elem2: "radioactive_grape" },
elements.radiation.reactions.egg = { elem1: null, elem2: "radioactive_egg" },
elements.radiation.reactions.potato = { elem1: null, elem2: "radioactive_potato" },
elements.radiation.reactions.water = { elem1: null, elem2: "radioactive_water" },
elements.radiation.reactions.chocolate = { elem1: null, elem2: "radioactive_chocolate" },
elements.radiation.reactions.milk = { elem1: null, elem2: "radioactive_milk" },
elements.radiation.reactions.bread = { elem1: null, elem2: "radioactive_bread" },
elements.radiation.reactions.toast = { elem1: null, elem2: "radioactive_toast" },
elements.radiation.reactions.beans = { elem1: null, elem2: "radioactive_beans" }

if (!elements.egg.reactions) elements.egg.reactions = {};
elements.egg.reactions.water = {elem1: "boiled_egg", tempMin: 100},
elements.egg.reactions.steam = {elem1: "boiled_egg", tempMin: 100},
elements.egg.reactions.melted_chocolate = {elem1: "chocolate_egg"},
elements.egg.reactions.chocolate = {elem1: "chocolate_egg", chance: 0.1}

if (!elements.potato.reactions) elements.potato.reactions = {};
elements.potato.reactions.water = {elem1: "fries", tempMin: 100, chance:50},
elements.potato.reactions.steam = {elem1: "fries", tempMin: 100, chance:50},
elements.potato.reactions.water = {elem1: "chips", tempMin: 100, chance:50},
elements.potato.reactions.steam = {elem1: "fries", tempMin: 100, chance:50}

if (!elements.water.reactions) elements.water.reactions = {};
elements.water.reactions.cocaine = { elem1: "solid_water", elem2: null }
elements.water.reactions.seasoning = { elem1: "season_water", elem2: null }

if (!elements.paper.reactions) elements.paper.reactions = {};
elements.paper.reactions.bless = { elem1: "robux", elem2: null, chance: 0.001 }

if (!elements.uranium.reactions) elements.uranium.reactions = {};
elements.uranium.reactions.ice_cream = {elem1: "uranium_ice_cream", elem2: null},
elements.uranium.reactions.cream = {elem1: "uranium_ice_cream", elem2: null}

if (!elements.dough.reactions) elements.dough.reactions = {};
elements.dough.reactions.yolk = {elem1: null, elem2: "spaghetti", tempMin: 25}

elements.silver.breakInto = "silver_coin" 
/*
Created by SquareScreamYT and RealerRaddler
Thanks to Alice, nousernamefound and Fioushemastor for helping :)

v1.1

Changelog (v1.0)
    - added chickens
        - lays chicken eggs
    - added chicks
        - hatches from chicken eggs
        - grows into chickens
    - added chicken eggs
        - added frozen chicken eggs
        - added hard boiled eggs
            - made by putting chicken eggs in hot water
    - added soup
        - made from broth and water
    - added noodles
        - made by putting batter in hot water
    - added chicken meat
        - raw chicken meat
        - cooked chicken meat
        - battered raw chicken
            - made by mixing raw chicken and batter
            - raw chicken nuggets
                - made by mixing battered raw chicken with crumbs
            - (cooked) chicken nuggets
    - added crushed worm
        - chicken food
        - made by smashing worms or mixing worms with rocks
        - added frozen crushed worms
    - added fried potato
        - made by putting potatoes in hot cooking oil
    - added smoked chicken
        - made by putting raw chicken with smoke
    - added boiled chicken
        - made by putting raw chicken in hot water
    - added fried chicken
        - made by putting raw chicken in hot cooking oil
    - added steamed chicken
        - made by putting raw chicken with steam
    - added olives
        - added olives
            - olives can be smashed into cooking oil
        - added olive wood
        - added olive branches
        - added olive leaves
    - added cooking oil




Changelog (v1.1)
    - added apples and related stuff
        - apples
        - applewood
        - apple branches
        - apple leaves
        - apple juice
            - made by smashing apples
        - apple seeds
        - apple slices
            - made by cutting apples
        - apple jam
            - made by putting sugar in apple juice
    - added knife tool
        - cuts, peels, etc. pixels
        - readded potato skin and peeled potato
        - changed fried potato recipe from potato to skinned potato\
    - added pepper
    - added cake
        - made by mixing baked batter and cream
    - added icing sugar
        - made by smashing sugar
    - added icing
        - made by shift-mixing icing sugar
	- noodles description
    - bug fix (freezing crushed worms makes them alive)
*/

/*
elements.test = {
    //other needed properties
    cutInto: "elem"
}
*/

elements.knife = {
    color: "#adb5bd",
    // other needed properties
    tool: (pixel) => {
        //store cutInto as a variable for legibility
        var cutInto = elements[pixel.element].cutInto;
        //if there’s no cutInto, it should equal undefined, which is falsey and !undefined = true
        if (!cutInto) { return };
        //if cutInto is an array, randomly pick one of its elements
        if(cutInto instanceof Array) { cutInto = cutInto[Math.floor(Math.random() * cutInto.length)] };
        //change pixel into the (chosen) element      
        changePixel(pixel, cutInto)
    },
    category:"tools",
}

elements.chicken = {
    color: ["#c29046", "#f5d271", "#d4bd7d"],
    behavior: [
        "M2%1|M2%2|M2%1",
        "M2%10|XX|M2%10",
        "XX|M1%33|XX",
    ],
    category:"life",
	state: "solid",
    reactions: {
        "meat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "chicken_nugget": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "grass": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "worm": { elem2: "crushed_worm", chance:0.3},
        "cooked_meat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "fish": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "rat": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "snail": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "frog": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "slug": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "grape": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "wheat_seed": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "flower_seed": { elem2:null, chance:0.32, func:behaviors.FEEDPIXEL },
        "corn_seed": { elem2:null, chance:0.35, func:behaviors.FEEDPIXEL },
        "corn": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "crumb": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "potato_seed": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "grass_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "pumpkin_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "pumpkin": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "nut": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "dead_bug": { elem2:null, chance:0.35, func:behaviors.FEEDPIXEL },
        "bee": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "ant": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "flea": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "termite": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "lichen": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.3 },
        "mercury": { elem1:"rotten_meat", chance:0.1 },
        "bleach": { elem1:"rotten_meat", chance:0.1 },
        "infection": { elem1:"rotten_meat", chance:0.025 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cyanide": { elem1:"rotten_meat", chance:0.1 },
        "chlorine": { elem1:"meat", chance:0.1 },
        "dirty_water": { elem1:"rotten_meat", chance:0.0001 },
    },
    egg: "chicken_egg",
    foodNeed: 10,
    temp: 40,
    tempHigh: 75,
    stateHigh: "cooked_chicken",
    tempLow: -18,
    stateLow: "frozen_meat",
    breakInto: ["feather", "raw_chicken"],
    burn:85,
    burnTime:450,
    state: "solid",
    density: 1117,
    conduct: 0.3,
};

elements.chicken_egg = {
    color: ["#e0d3ab","#d9cdb5"],
    behavior: [
        "XX|XX|XX",
        "XX|FX%5 AND CH:chick%0.1|XX",
        "M2%30|M1|M2%30",
    ],
    category: "food",
    state: "solid",
    temp: 30,
    tempLow: -18,
    stateLow: "frozen_chicken_egg",
    breakInto: ["yolk"],
    tempHigh: 500,
    stateHigh: ["calcium", "ash"],
    burn:50,
    burnTime:450,
    state: "solid",
    density: 900,
    conduct: 0.1,
    reactions: {
        "water": { elem1:null, elem2:"hard_boiled_egg", chance:10, tempMin:80 }
    }
};

elements.frozen_chicken_egg = {
    color: ["#e0d3cf","#d9cdd3"],
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    temp: -20,
    tempHigh: 10,
    stateHigh: "chicken_egg",
    breakInto: ["calcium", "hard_yolk"],
    burn:50,
    burnTime:450,
    state: "solid",
    density: 900,
    conduct: 0.1,
    hidden: true,
};

elements.hard_boiled_egg = {
	color: ["#e0d3ab","#d9cdb5","#e4d4b4","#f3f3ef"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
    tempHigh: 1000,
    stateHigh: ["ash", "smoke"],
    density: 820.33,
    isFood: true,
    hidden: true,
};

elements.chick = {
    color: ["#ffdf85", "#ffef5c"],
    behavior: [
        "M2%1|M2%2|M2%1",
        "M2%10|FX%5 AND CH:chicken%0.1|M2%10",
        "XX|M1%33|XX",
    ],
    category: "life",
    state: "solid",
    egg: "chicken_egg",
    foodNeed: 20,
    temp: 40,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -18,
    stateLow: "frozen_meat",
    breakInto: "blood",
    burn:85,
    burnTime:450,
    state: "solid",
    density: 900,
    conduct: 0.1,
    reactions: {
        "crushed_worm": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL},
        "meat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "chicken_nugget": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "grass": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "worm": { elem2: "crushed_worm", chance:0.3},
        "cooked_meat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "fish": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "rat": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "snail": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "frog": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "slug": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "grape": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "wheat_seed": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "flower_seed": { elem2:null, chance:0.32, func:behaviors.FEEDPIXEL },
        "corn_seed": { elem2:null, chance:0.35, func:behaviors.FEEDPIXEL },
        "corn": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "crumb": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "potato_seed": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "grass_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "pumpkin_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "pumpkin": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "nut": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "dead_bug": { elem2:null, chance:0.35, func:behaviors.FEEDPIXEL },
        "bee": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "ant": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "flea": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "termite": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "lichen": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.3 },
        "mercury": { elem1:"rotten_meat", chance:0.1 },
        "bleach": { elem1:"rotten_meat", chance:0.1 },
        "infection": { elem1:"rotten_meat", chance:0.025 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cyanide": { elem1:"rotten_meat", chance:0.1 },
        "chlorine": { elem1:"meat", chance:0.1 },
        "dirty_water": { elem1:"rotten_meat", chance:0.0001 },
    }
};

elements.soup = {
    color: "#fbd189",
    behavior: behaviors.LIQUID,
    tempHigh: 130,
    stateHigh: ["steam","steam","steam","fragrance"],
    tempLow: 0,
    category: "food",
    state: "liquid",
    density: 1052,
    conduct: 0.03,
    stain: -0.01,
    isFood: true,
    hidden: true,
};

if (!elements.broth.reactions) elements.broth.reactions = {};
elements.broth.reactions.water = { elem1: "soup", elem2: "soup" }

elements.noodles = {
    desc: "whatever noodles",
    color: ["#F3BA4F", "#F7D161"],
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    temp: 30,
    breakInto: ["crumb"],
    tempHigh: 130,
    stateHigh: ["toast"],
    burn:50,
    burnTime:450,
    state: "solid",
    density: 900,
    conduct: 0.1,
};

elements.season_water = {
    color: "#735a47",
    behavior: behaviors.LIQUID,
    tempHigh: 130,
    stateHigh: ["steam","steam","steam","fragrance"],
    tempLow: 0,
    category: "food",
    state: "liquid",
    density: 1052,
    conduct: 0.03,
    stain: -0.01,
    isFood: true,
    hidden: true,
};

if (!elements.batter.reactions) elements.batter.reactions = {};
elements.batter.reactions.water = {elem2: "noodles", tempMin: 70}
elements.batter.reactions.sugar = {elem2: "pancake", tempMin: 70}

elements.battered_raw_chicken = {
    color: ["#eacfa9", "#ecd2af"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:25,
    tempHigh: 600,
    stateHigh: ["ash","smoke"],
    reactions: {
        "crumb": { elem1: "raw_chicken_nugget", elem2: null },
    },
    hidden: true,
};

elements.steamed_chicken = {
    color:["#cfba8f", "#d2b788"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:50,
    tempHigh: 600,
    stateHigh: ["ash","smoke"],
    isFood: true,
    hidden: true,
}

elements.smoked_chicken = {
    color:["#AF4523", "#AC481F"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:55,
    tempHigh: 600,
    stateHigh: ["ash","smoke"],
    isFood: true,
    hidden: true,
}

elements.crushed_worm = {
    color: ["#e56932", "#c0714e"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp: 20,
    tempHigh: 50,
    stateHigh: ["ash", "smoke"],
    tempLow: -4,
    stateLow: "frozen_crushed_worm",
    density: 200.33,
    isFood: true,
    hidden: true,
};

elements.worm.reactions.rock = { elem1: "crushed_worm" }
elements.worm.breakInto = "crushed_worm"

elements.frozen_crushed_worm = {
    color: ["#2fcbae", "#3edabd", "#b2d5d9"],  
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp: -4,
    tempHigh: 20,
    stateHigh: "crushed_worm",
    density: 200.33,
    isFood: false,
    hidden: true,
};

elements.cooked_chicken = {
    color: ["#c17c20", "#ebad2b", "#f7b846"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp: 40,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    hidden: true,
};

elements.raw_chicken = {
    color: ["#dfc8bd", "#e2cdc0", "#b9a195"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    burnInto: "cook_chicken",
    temp:25,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    reactions: {
        "batter": { elem1: "battered_raw_chicken", elem2: null },
        "smoke": {elem1: "smoked_chicken"},
        "steam": {elem1: "steamed_chicken"},
        "water": {elem1: "boiled_chicken", tempMin: 70},
        "cooking_oil": {elem1: "fried_chicken", tempMin: 70}
    }
};

elements.boiled_chicken = {
    color: ["#F9CC84", "#EDCE89", "#F8CB78"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    isFood: true,
    temp: 65,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    hidden: true,
}

elements.fried_chicken = {
    color: ["#E87D1A", "#E77106", "#E77106"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    isFood: true,
    temp: 90,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    hidden: true,
}

elements.raw_chicken_nugget = {
    color: ["#d6bc7e", "#d2b47a", "#c7a969"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    burnInto: "chicken_nugget",
    temp:25,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    hidden: true,
    reactions: {
        "cooking_oil": {elem1: "chicken_nugget", tempMin: 70}
    }
};

elements.chicken_nugget = {
    color: ["#D77105", "#D77105", "#EB8C2C", "#EB8C2C"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp: 40,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    tempLow: -20,
    stateLow: "frozen_chicken_nugget",
    isFood: true,
    density: 100,
    hidden: true,
};

elements.frozen_chicken_nugget = {
    color: ["#45a69c", "#73d9cd", "#3f9f95", "#389d8e"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp: -20,
    tempHigh: 40,
    stateHigh: "chicken_nugget",
    isFood: false,
    density: 100,
    hidden: true,
};

elements.olive_wood = {
    color: "#632e1f",
    behavior: behaviors.WALL,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "solids",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    breakIntoColor: ["#dba66e","#cc8a64"],
}
elements.olive_branch = {
    color: "#632e1f",
    behavior: [
        "CR:olive_leaves,olive_branch%2|CR:olive_leaves,olive_leaves,olive_leaves,olive_branch%2|CR:olive_leaves,olive_branch%2",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tempHigh: 100,
    stateHigh: "olive_wood",
    tempLow: -30,
    stateLow: "olive_wood",
    category: "life",
    burn: 40,
    burnTime: 50,
    burnInto: ["sap","ember","charcoal"],
    hidden: true,
    state: "solid",
    density: 1500,
    hardness: 0.15,
    breakInto: ["sap","sawdust"],
    hidden: true,
}
elements.olive_leaves = {
    color: ["#407603","#376502","#2e5502"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|CR:olive%0.15|XX",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035}
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    seed: "olive_seed",
    hidden: true
}
elements.olive = {
    color: ["#6e8b3d","#7c9d45"],
    behavior: behaviors.POWDER,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "rock": { elem1:"cooking_oil", elem2:"rock", chance:0.035 },
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "cooking_oil",
    state: "solid",
    density: 1050,
    isFood: false
}

elements.cooking_oil = {
    color: "#ffc844",
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 400,
    stateHigh: "fire",
    burn: 70,
    burnTime: 300,
    burnInto: ["carbon_dioxide","fire"],
    viscosity: 250,
    state: "liquid",
    density: 825,
    temp: 30,
    reactions: {
        "peeled_potato": {elem2: "fried_potato", tempMin: 70}
    }
},

elements.pepper = {
    color: ["#1f190a", "#2b200d", "#362712", "#3b2211"],
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    isFood: true,
    temp: 20,
    hidden: true,
    tempHigh: 250,
    stateHigh: ["ash", "smoke"],
}

elements.potato.cutInto = ["peeled_potato","peeled_potato","peeled_potato","potato_skin"]//{elem1: ["potato_skin","peeled_potato"] }

elements.potato_skin = {
    color: ["#DC8A5A", "#A86C36", "#DC9A59", "#A76B35"],
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    isFood: true,
    temp: 20,
    hidden: true,
    density: 1100,
    tempHigh: 250,
    stateHigh: ["ash", "smoke"],
}

elements.peeled_potato = {
    color: ["#D6C39F", "#D1C09D", "#D1C09D", "#CDBF9E"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    isFood: true,
    temp: 20,
    hidden: true,
    breakInto: "mashed_potato",
    tempHigh: 176,
    stateHigh: "baked_potato",
    density: 1100,
    reactions: {
        "cooking_oil": { elem1: "fried_potato", tempMin: 70 }
    }
}

elements.fried_potato = {
    color: ["#DD7908", "#D57206", "#CA6801", "#D68001"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp: 35,
    hidden: true,
    tempHigh: 600,
    density: 1110,
    stateHigh: ["ash", "smoke"],
    isFood: true,
}

elements.applewood = {
    color: "#632e1f",
    behavior: behaviors.WALL,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "solids",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    breakIntoColor: ["#dba66e","#cc8a64"],
    hidden: true
}
elements.apple_branch = {
    color: "#632e1f",
    behavior: [
        "CR:apple_leaves,apple_branch%2|CR:apple_leaves,apple_branch%2|CR:apple_leaves,apple_branch%2",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tempHigh: 100,
    stateHigh: "applewood",
    tempLow: -30,
    stateLow: "applewood",
    category: "life",
    burn: 40,
    burnTime: 50,
    burnInto: ["sap","ember","charcoal"],
    hidden: true,
    state: "solid",
    density: 1500,
    hardness: 0.15,
    breakInto: ["sap","sawdust"],
}
elements.apple_leaves = {
    color: ["#00d404","#0ec911","#109e12"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|CR:apple%0.15|XX",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    hidden: true
}
elements.apple = {
    color: ["#eb1a1a","#f22c2c","#d62020"],
    behavior: behaviors.POWDER,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "apple_juice",
    cutInto: "apple_slice",
    state: "solid",
    density: 1050,
}

elements.apple_slice = {
    color: "#f0af37",
    behavior: behaviors.STURDYPOWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: ["sugar","steam"],
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "apple_juice",
    state: "solid",
    density: 1050,
    hidden: true,
}

elements.apple_seed = {
    color: "#854610",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "applewood" : "apple_branch",pixel.x,pixel.y+1);
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"applewood");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0
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
    behavior: [
        "XX|XX|XX",
        "XX|FX%10|XX",
        "XX|M1|XX",
    ],
};

elements.apple_juice = {
    color: "#ffde55",
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 400,
    stateHigh: "fire",
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    reactions: {
        "sugar": { elem1:"apple_jam", elem2:null, chance:0.35 }
    },
};

elements.cake = {
    color: ["#f2e5bf","#e8daba"],
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 550,
    stateHigh: "ash",
    category: "food",
    burn: 10,
    burnTime: 400,
    burnInto: ["smoke","smoke","smoke","ash"],
    breakInto: "crumb",
    state: "solid",
    density: 233.96,
    hidden: true,
    isFood: true
};

elements.icing_sugar = {
    color: "#f8f8f1",
    behavior: behaviors.POWDER,
    onMix: function(icing_sugar1, icing_sugar2) {
        if (shiftDown && Math.random() < 0.2) {
            changePixel(icing_sugar1,"icing")
        }
    },
    tempHigh: 186,
    stateHigh: "caramel",
    viscosity: 1.5,
    category: "food",
    state: "solid",
    hidden: true,
    density: 1036.86,
    isFood: true
};

elements.icing = {
    color: "#fefefb",
    behavior: behaviors.STURDYPOWDER,
    onMix: function(icing_sugar1, icing_sugar2) {
        if ((shiftDown && Math.random() < 0.2) || (elements[icing_sugar2.element].id === elements.icing_sugar.id && Math.random() < 0.25)) {
            changePixel(icing_sugar1,"icing")
        }
    },
    viscosity: 1.5,
    tempHigh: 1000,
    stateHigh: ["smoke","smoke","smoke","steam","steam","calcium"],
    stateLowColorMultiplier: 0.97,
    category: "food",
    isFood: true,
    state: "solid",
    density: 959.97,
};

elements.cream.reactions.baked_batter = {elem2: "cake" }

elements.sugar.breakInto = {elem1: "icing_sugar"}

elements.apple_jam = {
    color: "#ebc034",
    behavior: behaviors.LIQUID,
    category: "food",
    tempHigh: 400,
    stateHigh: ["sugar","smoke"],
    burn: 70,
    burnTime: 300,
    viscosity: 750,
    state: "liquid",
    density: 825,
    hidden: true
};

elements.mentos = {
	color: "#a9fff9",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
		reactions: {
		"soda": { elem1: "foam", elem2: "foam" },
		"sprite": { elem1: "foam", elem2: "foam" } ,
	}
		};
		
		elements.sprite = {
	color: "#b2f3ad",
    behavior: elements.soda.behavior,
	category: "food",
	state: "liquid",
		};
		
		elements.fanta = {
	color: "#ffd500",
    behavior: elements.soda.behavior,
	category: "food",
	state: "liquid",
		};

elements.lime = {
	color: "#b4ff15",
    behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	    reactions: {
        "seltzer": { elem1: null, elem2: "sprite" },
    },
		};
elements.beer = {
	color: ["#ffc43d","#ffc43d"],
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.root_beer = {
	color: ["#8b2f02","#732803"],
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.fruit_slushy = {
	color: ["#d43968","#ec5885","#f57ca1","#fba9c2","#ffe3eb"],
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.mold = {
	color: ["#b6d7a8","#6d9d5c","#ad8d6f"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.chocolate_slushy = {
	color: ["#c3ae9a","#ae967f","#977b5f","#876b4f","#816346"],
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.chocolate_sauce = {
	color: ["#491904","#54240b","#5e2d0b","#69371b","#764636"],
	density: 10,
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.chocolate_ice_cream = {
	color: ["#a47551","#523a28"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	density: 1096,
	tempHigh: 15,
	stateHigh: "cream",
	temp: 0,
};

elements.fruit_ice_cream = {
	color: ["#f8d8d8","#f6c1c1","#e39898"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	density: 1096,
	tempHigh: 15,
	stateHigh: "cream",
	temp: 0,
};

elements.mint_ice_cream = {

	color: ["#ebfdff","#d5fff7","#ceffe9","#dfffde","#daffd5"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	density: 1096,
	tempHigh: 15,
	stateHigh: "cream",
	temp: 0,
	reactions: {
        "chocolate": { elem1: "mint_chocolate_ice_cream", elem2: null },
	}
};

elements.mint_chocolate_ice_cream = {
	color: ["#311e08","#d5fff7","#ceffe9","#dfffde","#daffd5",],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	density: 1096,
	tempHigh: 15,
	stateHigh: "cream",
	temp: 0,
};


elements.chocolate_yogurt = {
	color: ["#654321","#71512b","#7e5f36","#8a6e42","#967d50"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	tempLow: 0,
	stateLow: "frozen_chocolate_yogurt",
};

elements.fruit_yogurt = {
	color: ["#ffc3d8","#ffabd6","#ff96c5","#ff84c2","#ff5daf"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	tempLow: 0,
	stateLow: "frozen_fruit_yogurt",
};

elements.frozen_fruit_yogurt = {
	color: ["#ffdfdf","#ffc0c0","#ff9b9b"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	density: 902,
	tempHigh: 0,
	stateHigh: "fruit_yogurt",
	temp: 0,
};

elements.frozen_chocolate_yogurt = {
	color: ["#a87848","#a57e57","#c1a07f","#e2c5ac","#efd0b1"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	density: 902,
	tempHigh: 0,
	stateHigh: "chocolate_yogurt",
	temp: 0,
};

elements.cooking_oil = {
	color: "#c4ab4f",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "solid",
	reactions: {
        "meat": { elem1: null, elem2: "chicken_nuggets" },
		"potato": { elem1: null, elem2: "fries" },
		"advanced_dough": { elem1: null, elem2: "churros" },
		"snow": { elem1: null, elem2: "fried_snow" },
	}
};

elements.chicken_nuggets = {
	color: ["#8f411c","#a35935"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.advanced_dough = {
	color: ["#f3e6c6","#f9e8a2","#ebd27b","#dba94e","#c08932"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	tempHigh: 94,
	stateHigh: "croissant",
	reactions: {
        "electric": { elem1: "steampunk_pancakes", elem2: null },
	}
};

elements.fries = {
	color: ["#f4c63e","#f6d165","#f8dd8b"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.fried_snow = {
	color: ["#f6c66a","#d29829","#905c1b"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.battery_acid = {
	color: ["#8fff00","#1de446"],
	behavior: behaviors.LIQUID,
	category: "machines",
	state: "solid",
	hidden: "TRUE",
};


elements.steampunk_pancakes = {
	color: "#252a33",
	behavior: behaviors.POWDER,
	category: "machines",
	state: "solid",
	hidden: "TRUE",
	//I have no idea why i added this, but when i removed it and started the mod, the mod removed itself. Words can't explain my fucking confusion.
};


elements.churros = {
	color: ["#ce9958","#b8732d","#9f633b"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	reactions: {
		"chocolate": { elem1: "chocolate_churros", elem2: null },
		"chocolate_sauce": { elem1: "chocolate_churros", elem2: null },
	}
};

elements.chocolate_churros = {
	color: ["#9f6204","#875200","#764100","#582c00","#492100"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.croissant = {
	color: ["#c68028","#ad7023","#905c1b","#794d16","#674112"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	breakInto: "crumb",
	tempHigh: 550,
	stateHigh: "ash",
	burnInto: "smoke"
};

elements.eggy_dough = {
	color: ["#df8c43","#e5a369","#ecba8e","#f2d1b4","#f9e8d9"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	tempHigh: 75,
	stateHigh: "french_toast",
	burnInto: "smoke"
};

elements.french_toast = {
	color: ["#a77644","#af7b4b","#af7f57"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "crumb",
	tempHigh: 550,
	stateHigh: "ash",
	burnInto: "smoke"
};

elements.rose_sauce = {
	color: ["#db2300","#e24f33"],
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.seasoning = {
	color: ["#945239","#896251"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.parmesan = {
	color: ["#ffffdd","#ffffe4","#ffffeb","#fffff1","#fffff8"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
};

elements.baking_powder = {
	color: "#fffaed",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	reactions: {
        "flour": { elem1: null, elem2: "advanced_dough" },
    },
};

elements.smashed_ice = {
	color: ["#e3fdff","#d1f7ff","#c0f7ff"],
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	 reactions: {
        "grape": { elem1: null, elem2: "fruit_slushy" },
        "blood_orange": { elem1: null, elem2: "fruit_slushy" },
        "canary_melon": { elem1: null, elem2: "fruit_slushy" },
        "honeydew_melon": { elem1: null, elem2: "fruit_slushy" },
        "cranberry": { elem1: null, elem2: "fruit_slushy" },
        "pitaya": { elem1: null, elem2: "fruit_slushy" },
        "coconut": { elem1: null, elem2: "fruit_slushy" },
        "cloudberry": { elem1: null, elem2: "fruit_slushy" },
        "crabapple": { elem1: null, elem2: "fruit_slushy" },
        "cactus_pear": { elem1: null, elem2: "fruit_slushy" },
        "pear": { elem1: null, elem2: "fruit_slushy" },
        "purpleberry": { elem1: null, elem2: "fruit_slushy" },
        "yellowberry": { elem1: null, elem2: "fruit_slushy" },
        "pomegranate": { elem1: null, elem2: "fruit_slushy" },
        "guava": { elem1: null, elem2: "fruit_slushy" },
        "raspberry": { elem1: null, elem2: "fruit_slushy" },
        "gooseberry": { elem1: null, elem2: "fruit_slushy" },
        "fig": { elem1: null, elem2: "fruit_slushy" },
        "durian": { elem1: null, elem2: "fruit_slushy" },
		"passionfruit": { elem1: null, elem2: "fruit_slushy" },
		"starfruit": { elem1: null, elem2: "fruit_slushy" },
		"rambutan": { elem1: null, elem2: "fruit_slushy" },
		"nance": { elem1: null, elem2: "fruit_slushy" },
		"nectarine": { elem1: null, elem2: "fruit_slushy" },
		"loganberry": { elem1: null, elem2: "fruit_slushy" },
		"currant": { elem1: null, elem2: "fruit_slushy" },
		"banana": { elem1: null, elem2: "fruit_slushy" },
		"blackberry": { elem1: null, elem2: "fruit_slushy" },
		"blueberry": { elem1: null, elem2: "fruit_slushy" },
		"green_apple": { elem1: null, elem2: "fruit_slushy" },
		"lemon": { elem1: null, elem2: "fruit_slushy" },
		"green_grape": { elem1: null, elem2: "fruit_slushy" },
		"cherry": { elem1: null, elem2: "fruit_slushy" },
		"apple": { elem1: null, elem2: "fruit_slushy" },
		"orange": { elem1: null, elem2: "fruit_slushy" },
		"kiwi": { elem1: null, elem2: "fruit_slushy" },
		"strawberry": { elem1: null, elem2: "fruit_slushy"},
		"chocolate": { elem1: null, elem2: "chocolate_slushy" },
		"juice": { elem1: null, elem2: "fruit_slushy" },
		"chocolate_sauce": { elem1: null, elem2: "chocolate_slushy" },
    },
	density: 100,
	tempHigh: 25,
	stateHigh: "water",
	tempLow: -100,
	stateLow: "snow",
};

elements.moss = {
	color: ["#355438","#416044","#4c7450","#68946c","#81a984"],
	behavior: behaviors.STURDYPOWDER,
	category: "life",
	state: "solid",
	burn: 5,
	burnTime: 15,
	density: 1400,
	breakInto: "dead_plant",
	tempHigh: 120,
	stateHigh: "dead_plant",
	tempLow: -4,
	stateLow: "frozen_plant",
	
	reactions: {
        "dna": { elem1: "moth", elem2: null },
	}
	
};

elements.moth = {
	color: "#665233",
	behavior: behaviors.FLY,
	category: "life",
	state: "solid",
	burn: 95,
	burnTime: 25,
	density: 600,
	breakInto: "dead_bug",
	tempHigh: 100,
	stateHigh: "ash",
	tempLow: 0,
	stateLow: "dead_bug",
};

elements.parrot = {
	color: ["#234d20","#36802d","#77ab59","#c9df8a","#f0f7da","#f90f0b","#f7ab4d","#fdfc0d","#0564b2","#60a3e6"],
	behavior: behaviors.FLY,
	category: "life",
	state: "solid",
	burn: 40,
	burnTime: 100,
	density: 400,
	breakInto: ["feather","blood"],
	tempHigh: 120,
	stateHigh: "cooked_meat",
	tempLow: -18,
	stateLow: "frozen_meat",
	reactions: {
        "fly": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "firefly": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "bee": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "worm": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "ant": { elem2:null, chance:0.025, func:behaviors.FEEDPIXEL },
        "dead_bug": { elem2:null, chance:0.04, func:behaviors.FEEDPIXEL },
        "lichen": { elem2:null, chance:0.04, func:behaviors.FEEDPIXEL },
        "termite": { elem2:null, chance:0.025, func:behaviors.FEEDPIXEL },
        "flea": { elem2:null, chance:0.025, func:behaviors.FEEDPIXEL },
        "mushroom_cap": { elem2:null, chance:0.025, func:behaviors.FEEDPIXEL },
        "mushroom_gill": { elem2:null, chance:0.025, func:behaviors.FEEDPIXEL },
        "seeds": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "flower_seed": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "wheat_seed": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "corn_seed": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "corn": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "potato_seed": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "grass_seed": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "crumb": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "pumpkin": { elem2:null, chance:0.025, func:behaviors.FEEDPIXEL },
        "pumpkin_seed": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "plague": { elem1:"plague", chance:0.05 },
        "oxygen": { elem2:"carbon_dioxide", chance:0.5 }
    },
    foodNeed: 20,
    temp: 41,
    tempHigh: 120,
    stateHigh: "cooked_meat",
    stateHighColor: "#E4CFB9",
    tempLow: -18,
    stateLow: "frozen_meat",
    category:"life",
    burn:50,
    burnTime:100,
    breakInto: ["feather","blood"],
    state: "solid",
    density: 400,
    conduct: 0.5
};

elements.cherry = {
	color: ["#ff0000","#e30202","#c00000","#9c0101"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	breakIntoColor: "#450008",
	reactionsColor: "#450008",
};

elements.strawberry = {
	color: ["#fb2943","#ff0033"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	breakIntoColor: ["#bf0147","#c61548","#cc2857","#c62354","#c11848"],
};

elements.apple = {
	color: ["#fc3434","#f91515","#d30404","#9f0606","#aa0404"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	breakIntoColor: ["#ffda69","#ffdb84"],
};

elements.green_apple = {
	color: ["#a8da61","#66cc00","#66cc33","#00cc00","#009900"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	breakIntoColor: ["#ffda69","#ffdb84"],
};

elements.orange = {
	color: ["#ff9a00","#ffc100","#ff8100"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ffc659","#ffb646","#ffa700","#ff8d00"],
	tempHigh: 256,
	stateHigh: "steam",
};

elements.kiwi = {
	color: ["#a9c77e","#61ab5a"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	breakIntoColor: ["#a9c77e","#bad98f"],
};

elements.blueberry = {
	color: ["#3e476f","#49598c","#5076b0","#5086c1","#8aa4ff"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	breakIntoColor: ["#8abeee","#8aacf4","#9591ee","#787fdb","#7c74ce"],
};

elements.plum = {
	color: ["#b62d82","#951661","#7c1249","#52001e","#360011"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	breakIntoColor: ["#bf66c9","#d499db","#eacced"],
};

elements.blackberry = {
	color: ["#2b0521","#3e0930","#4f123e","#601a4c","#6b2356"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	breakIntoColor: ["#a941a1","#ba59b2","#c570bf"],
};

elements.peach = {
	color: ["#f6a192","#f6b092","#f6c492","#f6cf92","#f6d992"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	breakIntoColor: ["#fce5b8","#fcdab8","#fccfb8"],
};

elements.lemon = {
	color: ["#ffaa1d","#ffd300","#ffdf00","#ffff00","#fff44f"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	breakIntoColor: ["#f8ff80","#f6ff6c","#f5ff57","#f3ff39","#f0ff00"],
};

elements.green_grape = {
	color: ["#b6f271","#a1f02f","#97d60c","#65ba14","#8bc33a"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#5f8536","#7ba84a"],
	tempHigh: 256,
	stateHigh: "steam",
};

elements.banana = {
	color: ["#ffb400","#ffc100","#ffdb00","#ffe700","#f0ff00"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: "#f0f060",
	reactions: {
        "steam": { elem1: "potassium", elem2: null },
	}
};

elements.blood_orange = {
	color: ["#db4437","#fc3d39","#e5302d","#f6602d","#f65026"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ff4600","#ff8353"],
};

elements.canary_melon = {
	color: ["#e9ff0c","#e9ff0c","#ffed0c"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ffff9e","#fffcaa"],
};

elements.honeydew_melon = {
	color: ["#b9ffa3","#c9ffa3","#d9ffa3"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#e9ffa3","#f9ffa3"],
};

elements.cranberry = {
	color: ["#471016","#7a1927","#69202f"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "sauce",
	breakIntoColor: ["#ba4242","#7a1717"],
	reactions: {
        "soda": { elem1: null, elem2: "sprite_cranberry" },
	}
};

elements.pitaya = {
	color: ["#f6a9d8","#d4306e","#6ab81f"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ff84ae","#ffafca"],
};

elements.coconut = {
	color: ["#6b3314","#583203","#673e1c"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "milk",
	breakIntoColor: ["#f7e5d8","#fdefe5","#fff7f1"],
};

elements.cloudberry = {
	color: ["#ff9636","#ffb169","#ffc896"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ffe1c7","#fff9f3"],
};

elements.crabapple = {
	color: ["#850b0b","#a32d2d","#ab4545"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ff8fcf","#ffb2de"],
};

elements.cactus_fruit = {
	color: ["#ff95b0","#ff80a0","#ff7489"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#75d802","#72d202"],
};

elements.pear = {
	color: ["#669900","#669933","#9ec419"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#c8e39e","#99cc99"],
};

elements.purpleberry = {
	color: ["#8b04a8","#a236b9","#b968cb"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#c08cc3","#e49cc2"],
};

elements.yellowberry = {
	color: ["#ffe505","#fffb05","#fdfa72"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#fffec8","#fffdaf"],
};

elements.pomegranate = {
	color: ["#950000","#c93434","#df5555","#8f163f","#6d0606"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ee717f","#e94254"],
};

elements.guava = {
	color: ["#1ae132","#44e788","#0a7a22"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ff5a76","#ff8fa2"],
};

elements.raspberry = {
	color: ["#f90064","#980036","#60081a"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#f23a72","#fb79a0"],
};

elements.gooseberry = {
	color: ["#63041c","#760024","#81052a"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#8b0031","#920436"],
};

elements.fig = {
	color: ["#1d1d3b","#2a2854","#402459"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ff4a4a","#ea3838"],
};

elements.durian = {
	color: ["#b07939","#c09461","#d0af88"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#faffaf","#fbffbf"],
};

elements.passionfruit = {
	color: ["#9d3385","#b15c9d","#c485b6"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ffdede","#ffe4e4"],
};

elements.starfruit = {
	color: ["#d5eb00","#ddef33","#e6f366"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#f2d553","#f5dd75"],
};

elements.rambutan = {
	color: ["#ff4a4a","#ea3838"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#faffaf","#fbffbf"],
};

elements.nance = {
	color: ["#ffff00","#ffff33"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ffff66","#ffff99"],
};

elements.nectarine = {
	color: ["#c92c0f","#cc4c58","#ea6161"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ffbd8b","#ffdbc0"],
};

elements.loganberry = {
	color: ["#db1515","#e53939","#fd5f5f"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ff8f8f","#ffb7b7"],
};

elements.currant = {
	color: ["#ff1828","#ff505c"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ff878f","#ffbcc0"],
};

elements.sprite_cranberry = {
	color: ["#65000f","#89001c","#b40024"],
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "solid",
};

elements.mint = {
	color: ["#72e88d","#53bd6c"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	reactions: {
        "cream": { elem1: null, elem2: "toorhpaste" },
		"ice_cream": { elem1: null, elem2: "mint_ice_cream" },
	}
};

elements.broccoli = {
	color: ["#004909","#046b00","#0b8500"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#00b215","#0b8500"],
};

elements.squash = {
	color: ["#f2ab15","#f5bc44","#f7cd73"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#efbe79","#ffd599"],
};

elements.zuchinni = {
	color: ["#375822","#58704a","#73816a"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#80a568","#a3c88c"],
};

elements.olive = {
	color: ["#445626","#52682d","#6e8b3d"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#d1ef71","#c1d64d"],
};

elements.eggplant = {
	color: ["#490b43","#30093a","#23033a"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#674ea7","#351c75"],
};

elements.potassium = {
	color: "#a3a333",
	behavior: behaviors.POWDER,
	category: "states",
	state: "solid",
	breakInto: "juice",
};

elements.onion = {
	color: ["#62121b","#a92940","#c04b65","#d8699e"],
	behavior: 
	[
		["XX","CH:onion>stench","XX"],
		["XX","XX","XX"],
		["XX","M1","XX"]
	],
	category: "food",
	state: "solid",
	breakInto: ["stench", null, null, null, null],
};

elements.cinnamon = {
	color: ["#cda67a","#986544","#6a462f"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
};

elements.garlic = {
	color: ["#f7f3e1","#f6f3c3","#f0e6bd"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "garlic_clove",
};

elements.garlic_clove = {
	color: ["#b8b17f","#6b5628"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.asparagus = {
	color: ["#77ab56","#92bc78","#adcd9a"],
	density: 675,
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	tempHigh: 173,
	stateHigh: "roasted_asparagus",
	burnInto: "ash",
	burn: 10,
	burnTime: 300,
	breakInto: "juice",
	breakIntoColor: "#c9ddbb",
};

elements.roasted_asparagus = {
	color: ["#849273","#9aa58d","#c0cbb3"],
	density: 675,
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	breakInto: "juice",
	breakIntoColor: ["#849273","#9aa58d","#c0cbb3"],
	tempHigh: 400,
	stateHigh: "ash",
	burnInto: "ash",
	burn: 20,
	burnTime: 300,
};

elements.oreo = {
	color: "#120600",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	reactions: {
		"toorhpaste": { elem1: "poison_oreo", elem2: null },
	}
};

elements.poison_oreo = {
	color: "#001112",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.cream_coffee = {
	color: ["#dbc1ac","#967259","#634832"],
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	tempLow: 0,
	stateLow: "coffee_ice",
	tempHigh: 130,
	stateHigh: ["steam","fragrance"],
};

elements.seafoam = {
	color: ["#a3c1ad","#a0d6b4","#5f9ea0","#317873","#49796b"],
	behavior: behaviors.LIQUID,
	category: "life",
	state: "solid",
};


elements.toorhpaste = {
	color: ["#31ffe0","#65ffe8","#97ffef","#c9fff7","#f3fffd"],
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "solid",
	reactions: {
		"juice": { elem1: "poison", elem2: null },
	}
};

if (!elements.lettuce.reactions) elements.lettuce.reactions = {};
elements.lettuce.reactions.ice_cream = { elem1: "moss", elem2: null }

if (!elements.advanced_dough.reactions) elements.advanced_dough.reactions = {};
elements.advanced_dough.reactions.yolk = { elem1: "eggy_dough", elem2: null }

if (!elements.yeast.reactions) elements.yeast.reactions = {};
elements.yeast.reactions.flour = { elem1: "beer", elem2: null }

if (!elements.beer.reactions) elements.beer.reactions = {};
elements.beer.reactions.fiber = { elem1: "root_beer", elem2: null }

if (!elements.cheese.reactions) elements.cheese.reactions = {};
elements.cheese.reactions.seasoning = { elem1: "parmesan", elem2: null }

if (!elements.sodium.reactions) elements.sodium.reactions = {};
elements.sodium.reactions.neutral_acid = { elem1: "baking_powder", elem2: null }

if (!elements.toast.reactions) elements.toast.reactions = {};
elements.toast.reactions.chocolate = { elem1: "oreo", elem2: null }

if (!elements.ketchup.reactions) elements.ketchup.reactions = {};
elements.ketchup.reactions.mayo = { elem1: "rose_sauce", elem2: null }

if (!elements.bread.reactions) elements.bread.reactions = {};
elements.bread.reactions.rotten_cheese = { elem1: "mold", elem2: null }

if (!elements.bread.reactions) elements.bread.reactions = {};
elements.bread.reactions.dirty_water = { elem1: "mold", elem2: null }

if (!elements.toast.reactions) elements.toast.reactions = {};
elements.toast.reactions.rotten_cheese = { elem1: "mold", elem2: null }

if (!elements.toast.reactions) elements.toast.reactions = {};
elements.toast.reactions.dirty_water = { elem1: "mold", elem2: null }

if (!elements.baked_batter.reactions) elements.baked_batter.reactions = {};
elements.baked_batter.reactions.rotten_cheese = { elem1: "mold", elem2: null }

if (!elements.baked_batter.reactions) elements.baked_batter.reactions = {};
elements.baked_batter.reactions.dirty_water = { elem1: "mold", elem2: null }

if (!elements.bread.reactions) elements.bread.reactions = {};
elements.bread.reactions.worm = { elem1: "mold", elem2: null }

if (!elements.bread.reactions) elements.bread.reactions = {};
elements.bread.reactions.mud = { elem1: "mold", elem2: null }

if (!elements.toast.reactions) elements.toast.reactions = {};
elements.toast.reactions.worm = { elem1: "mold", elem2: null }

if (!elements.toast.reactions) elements.toast.reactions = {};
elements.toast.reactions.mud = { elem1: "mold", elem2: null }

if (!elements.baked_batter.reactions) elements.baked_batter.reactions = {};
elements.baked_batter.reactions.worm = { elem1: "mold", elem2: null }

if (!elements.baked_batter.reactions) elements.baked_batter.reactions = {};
elements.baked_batter.reactions.mud = { elem1: "mold", elem2: null }

elements.sugar_ice.breakInto = "smashed_ice"

elements.algae.breakInto = "seafoam"

elements.battery.breakInto = "battery_acid"

elements.herb.breakInto = "seasoning"

elements.chocolate.breakInto = "chocolate_sauce"

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.juice = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.grape = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.jelly = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.cherry = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.orange = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.kiwi = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.green_grape = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.blood_orange = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.canary_melon = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.honeydew_melon = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.cranberry = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.pitaya = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.coconut = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.cloudberry = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.crabapple = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.cactus_fruit = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.pear = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.purpleberry = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.yellowberry = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.pomegranate = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.guava = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.raspberry = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.gooseberry = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.fig = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.durian = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.passionfruit = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.starfruit = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.rambutan = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.nance = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.nectarine = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.loganberry = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.currant = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.chocolate = { elem1: "chocolate_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.chocolate_sauce = { elem1: "chocolate_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.melted_chocolate = { elem1: "chocolate_ice_cream", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.grape = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.juice = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.green_grape = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.cherry = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.kiwi = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.orange = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.jelly = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.chocolate = { elem1: "chocolate_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.chocolate_sauce = { elem1: "chocolate_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.melted_chocolate = { elem1: "chocolate_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.blood_orange = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.canary_melon = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.honeydew_melon = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.cranberry = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.pitaya = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.coconut = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.cloudberry = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.crabapple = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.cactus_fruit = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.pear = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.purpleberry = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.yellowberry = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.pomegranate = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.guava = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.raspberry = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.gooseberry = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.fig = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.durian = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.passionfruit = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.starfruit = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.rambutan = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.nance = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.nectarine = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.loganberry = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.currant = { elem1: "fruit_yogurt", elem2: null }


//dev notes area below
/*
ok this is not actually a mod i just used other mods and made it into this i can mess with stuff 
*/
