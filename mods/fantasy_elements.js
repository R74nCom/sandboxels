elements.dragon_breath = {
    color: "#f94e4e",
    behavior: behaviors.GAS,
    category: "fantasy",
    state: "gas",
    density: 0.1,
    weight: 1,
    update: function(x, y) {
        // Update the element's behavior
    },
    reactions: {
        "oxygen": { elem1: "fire", elem2: "fire" },
		"frostbite": { elem1: "pulsium", elem2: "pulsium" },
    }
};

elements.frostbite = {
    color: "#0000ff",
    behavior: behaviors.SOLID,
    category: "fantasy",
    state: "solid",
    density: 1.5,
    weight: 100,
    update: function(x, y) {
        // Update the element's behavior
    },
    reactions: {
        "water": { elem1: "ice", elem2: "ice" },
		"dragon_breath": { elem1: "pulsium", elem2: "pulsium" },
    }
};

elements.pulsium = {
    color: "#ffff00",
    behavior: behaviors.LIQUID,
    category: "fantasy",
    state: "liquid",
    density: 1923,
    weight: 100,
    update: function(x, y) {
        // Update the element's behavior
    },
	reactions: {
        "molten_iron": { elem1: "pulsium_bar", elem2: "pulsium_bar" },
		"molten_tin": { elem1: "pulsium_bar", elem2: "pulsium_bar" },
		"water": { elem1: "sap", elem2: "sap" },
		"magma": { elem1: "pulsium_bar", elem2: "pulsium_bar" },
    }
};

elements.pulsium_bar = {
    color: "#ffd700",
    behavior: behaviors.SOLID,
    category: "fantasy",
    state: "solid",
    density: 1700,
    weight: 100,
    update: function(x, y) {
        // Update the element's behavior
    }
};

elements.goblins_delight = {
    color: "#00ff00",
    behavior: behaviors.LIQUID,
    category: "fantasy",
    state: "solid",
    density: 0.5,
    weight: 50,
    reactions: {
        "liquid_light": { elem1: "water", elem2: "oil" },
		"radiation": { elem1: "sauce", elem2: "sauce" },
    }
};

elements.pheonix = {
    color: ["#ff0000"],
    tick: behaviors.FLY,
    reactions: {        "fire": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "salt": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
		"pulsium_bar": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
		"pulsium": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
		"dragon_breath": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
    },
    foodNeed: 5,
    tempHigh: 999999,
    stateHigh: "ash",
    tempLow: 0,
    category:"fantasy",
    burn:100,
    burnTime:19,
    state: "solid",
    density: 850,
    conduct: 1,
    baby: "baby_pheonix",
};

elements.phoenix_ash = {
    color: "#a8a8a5",
    behavior: behaviors.POWDER,
    category: "fantasy",
    state: "solid",
    density: 1.5,
    weight: 100,
    reactions: {
        "water": { elem1: "pheonix", elem2: "pheonix" },
    }
};

elements.baby_pheonix = {
    color: ["#ffdd00"],
    tick: behaviors.FLY,
    foodNeed: 5,
    tempHigh: 999999,
    stateHigh: "ash",
    tempLow: 0,
    category:"fantasy",
    burn:100,
    burnTime:19,
    state: "solid",
	stateLow: "iced_pheonix",
    breakInto: "phoenix_ash",
    density: 850,
    conduct: 1,
};

elements.iced_pheonix = {
    color: "#34baeb",
    behavior: behaviors.SOLID,
    category: "fantasy",
    state: "solid",
	breakInto: "ice",
    density: 1.5,
    weight: 100,
    update: function(x, y) {
        // Update the element's behavior
    },
};

// New Fantasy Elements with Updated Reactions
elements.dragon_scale = {
    color: "#8B4513",
    behavior: behaviors.SOLID,
    category: "fantasy",
    state: "solid",
    density: 0.8,
    weight: 60,
    update: function(x, y) {
        // Update the element's behavior
    },
    reactions: {
        "fire": { elem1: null, elem2: "dragon_breath" },
        "plasma": { elem1: null, elem2: "dragon_breath" },
        "goblins_delight": { elem1: "dragon_breath", elem2: null },
        "pulsium": { elem1: "dragon_breath", elem2: null },
        "oil": { elem1: null, elem2: "dragon_breath" },
        "salt": { elem1: "dragon_breath", elem2: null },
        "sap": { elem1: "dragon_breath", elem2: null },
        "water": { elem1: "dragon_breath", elem2: null },
        "laser": { elem1: null, elem2: "dragon_breath" },
        "oxygen": { elem1: null, elem2: "dragon_breath" },
        "wall": { elem1: "dragon_breath", elem2: null },
        "glass": { elem1: null, elem2: "dragon_breath" },
        "wood": { elem1: null, elem2: "dragon_breath" },
        "charcoal": { elem1: null, elem2: "dragon_breath" },
    },
};

elements.mystic_runes = {
    color: "#9932CC",
    behavior: behaviors.SOLID,
    category: "fantasy",
    state: "solid",
    density: 0.8,
    weight: 60,
    update: function(x, y) {
        // Update the element's behavior
    },
    reactions: {
        "heat_ray": { elem1: null, elem2: "mystic_runes" },
        "god_ray": { elem1: null, elem2: "mystic_runes" },
        "laser": { elem1: null, elem2: "mystic_runes" },
        "helium": { elem1: null, elem2: "mystic_runes" },
        "oxygen": { elem1: null, elem2: "mystic_runes" },
        "sugar": { elem1: null, elem2: "mystic_runes" },
        "wall": { elem1: "mystic_runes", elem2: null },
        "glass": { elem1: null, elem2: "mystic_runes" },
        "wood": { elem1: null, elem2: "mystic_runes" },
        "charcoal": { elem1: null, elem2: "mystic_runes" },
        "diamond": { elem1: null, elem2: "mystic_runes" },
    },
};

elements.enchanted_wood = {
    color: "#923B70",
    behavior: behaviors.SOLID,
    category: "fantasy",
    state: "solid",
    density: 0.8,
    weight: 60,
    update: function(x, y) {
        // Update the element's behavior
    },
    reactions: {
        "fire": { elem1: null, elem2: "charcoal" },
        "plasma": { elem1: null, elem2: "charcoal" },
        "water": { elem1: null, elem2: "mystic_runes" },
    },
};

// update 1.1 below
// adds 3 more extra elements
// by hackerpro908
// main game by R74N called sandboxels

elements.quartzium = {
    color: "#51484f",
    behavior: behaviors.SOLID,
    category: "fantasy",
    state: "solid",
    density: 1065, 
    weight: 100,
    reactions: {
        "fire": { elem1: "quartz", elem2: "quartz" },
    },
};
elements.quartz = {
    color: "#ebedeb",
    behavior: behaviors.SOLID,
    category: "fantasy",
    state: "solid",
    density: 8076,
    weight: 100,
};

elements.moonite = {
    color: "#e6e6e6",
    behavior: behaviors.SUPERFLUID,
    category: "fantasy",
    state: "solid",
    density: 8076,
    weight: 100,
};
