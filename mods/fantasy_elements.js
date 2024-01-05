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
    density: 1.5,
    weight: 100,
    update: function(x, y) {
        // Update the element's behavior
    },
};


