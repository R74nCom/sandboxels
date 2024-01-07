elements.beer = {
	color: "#ffc64a",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.root_beer = {
	color: "#9e7723",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.fruit_slushy = {
	color: "#b867cf",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.mold = {
	color: "#86ab29",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.chocolate_slushy = {
	color: "#4f2e16",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.chocolate_sauce = {
	color: "#754828",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.chocolate_ice_cream = {
	color: "#704b3a",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.fruit_ice_cream = {
	color: "#de6ab7",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.chocolate_yogurt = {
	color: "#825c4b",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	tempLow: 0,
	stateLow: "frozen_chocolate_yogurt",
};

elements.fruit_yogurt = {
	color: "#f587d0",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	tempLow: 0,
	stateLow: "frozen_fruit_yogurt",
};

elements.frozen_fruit_yogurt = {
	color: "#ffc2ea",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	density: 902,
	tempHigh: 0,
	stateHigh: "fruit_yogurt",
};

elements.frozen_chocolate_yogurt = {
	color: "#ad8776",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	density: 902,
	tempHigh: 0,
	stateHigh: "chocolate_yogurt",
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
	color: "#967242",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.advanced_dough = {
	color: "#dbbc72",
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
	color: "#ebba34",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.fried_snow = {
	color: "#a16f37",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.steampunk_pancakes = {
	color: "#252a33",
	behavior: behaviors.POWDER,
	category: "machines",
	state: "solid",
	hidden: "TRUE",
};

elements.churros = {
	color: "#c29a3c",
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
	color: "#1c0c01",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.croissant = {
	color: "#e0c46e",
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
	color: "#c4ad7c",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	tempHigh: 75,
	stateHigh: "french_toast",
	burnInto: "smoke"
};

elements.french_toast = {
	color: "#ab8d4f",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "crumb",
	tempHigh: 550,
	stateHigh: "ash",
	burnInto: "smoke"
};

elements.rose_sauce = {
	color: "#f0340e",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.seasoning = {
	color: "#734631",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.parmesan = {
	color: "#e0c66e",
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
	color: "#c3d4e6",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	 reactions: {
        "grape": { elem1: null, elem2: "fruit_slushy" },
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
	color: "#389639",
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
	behavior: behaviors.BOUNCY,
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

elements.cherry = {
	color: "#c41428",
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
	color: "#ff0033",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	breakIntoColor: "#bd0f32",
};

elements.apple = {
	color: "#f21313",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	breakIntoColor: "#ffd500",
};

elements.orange = {
	color: "#ff9100",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
};

elements.kiwi = {
	color: "#34611a",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	breakIntoColor: "#517a38",
};

elements.green_grape = {
	color: "#b6eb7f",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: "#5f8536",
	tempHigh: 256,
	stateHigh: "steam",
};

elements.oreo = {
	color: "#120600",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
};

elements.toorhpaste = {
	color: "#7dfff2",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "solid",
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
