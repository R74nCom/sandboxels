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
};

elements.frozen_chocolate_yogurt = {
	color: "#ad8776",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.cooking_oil = {
	color: "#c4ab4f",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "solid",
	reactions: {
        "meat": { elem1: null, elem2: "chicken_nuggets" },
		"potato": { elem1: null, elem2: "fries" },
	}
};

elements.chicken_nuggets = {
	color: "#967242",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.fries = {
	color: "#ebba34",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.rose_sauce = {
	color: "#f0340e",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.rose_sauce = {
	color: "#f0340e",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
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
};

elements.orange = {
	color: "#ff9100",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	breakIntoColor: "#d69c4f",
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

if (!elements.lettuce.reactions) elements.lettuce.reactions = {};
elements.lettuce.reactions.ice_cream = { elem1: "moss", elem2: null }

if (!elements.ketchup.reactions) elements.ketchup.reactions = {};
elements.ketchup.reactions.yolk = { elem1: "rose_sauce", elem2: null }


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
