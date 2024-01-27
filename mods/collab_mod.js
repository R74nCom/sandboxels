elements.lemon = {
    onSelect: function() {
        logMessage("Mod made by mrapple, ilikepizza and stefanblox");
    },
  color: ["#ffaa1d","#ffd300","#ffdf00","#ffff00","#fff44f"],
  behavior: behaviors.POWDER,
  category: "food",
  state: "solid",
  breakInto: "lemonade",
  tempHigh: 256,
  stateHigh: "steam",
  reactions: {
      "sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#ffffd8","#fffecf"] },
  }
};

elements.lemonade = {
    onSelect: function() {
        logMessage("Mod made by mrapple, ilikepizza and stefanblox");
    },
    tempHigh: 150,
    stateHigh: "steam",
    tempMin: -15,
    color: ["#f8ff80","#f6ff6c","#f5ff57","#f3ff39","#f0ff00"],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
};

elements.uranium_tea = {
    onSelect: function() {
        logMessage("Mod made by mrapple, ilikepizza and stefanblox");
    },
    viscosity: 1000,
    tempHigh: 1100,
    stateHigh: ["molten_uranium", "steam", "fragrance", "null"],
    color: ["#943e04", "#aa7a20", "#806612"],
    behavior: behaviors.RADLIQUID,
    category: "liquids",
    state: "liquid",
    reactions: {
        "neutron": { elem1:"n_explosion", tempMin:500, chance:0.1 }
    },
};

elements.sned = {
    onSelect: function() {
        logMessage("Mod made by mrapple, ilikepizza and stefanblox");
    },
	desc: "slowly expanding...",
	color: "#dfe0d9",
	behavior: [
		"XX|XX AND CR:sned%1|XX",
		"M2 AND CR:sned%1|XX|M2 AND CR:sned%1",
		"M1|M1 AND CH:sned%1|M1",
	],
	category: "joke",
	state: "liquid",
	excludeRandom: true
};

elements.uranium_coffee = {
    onSelect: function() {
        logMessage("Mod made by mrapple, ilikepizza and stefanblox");
    },color: "#24100b",
    behavior: behaviors.LIQUID,
    reactions: {
        "stench": { elem2:null },
        "oxygen": { elem2:"fragrance", chance:0.01 },
        "sugar": { elem2:null, color1:"#99552A", chance:0.005},
        "honey": { elem2:null, color1:"#99552A", chance:0.005},
        "milk": { elem2:"foam", color1:"#CA9D68", chance:0.005},
        "nut_milk": { elem2:"foam", color1:"#CA9D68", chance:0.005},
        "cream": { elem2:"foam", color1:"#CA9D68", chance:0.005},
        "ice_cream": { elem2:null, color1:"#CA9D68", chance:0.005},
        "chocolate": { elem2:null, color1:"#6A3517", chance:0.005},
        "melted_chocolate": { elem2:null, color1:"#6A3517", chance:0.005},
        "water": { elem2:"coffee", tempMin:70, chance:0.2 },
        "salt_water": { elem2:"coffee", tempMin:70, chance:0.2 },
        "sugar_water": { elem2:"melted_uranium", tempMin:60, chance:0.3 },
        "seltzer": { elem2:"coffee", tempMin:70, chance:0.2 },
        "neutron": { elem1:"n_explosion", tempMin:500, chance:0.1 }
    },
    tempHigh: 130,
    stateHigh: ["steam","fragrance","molten_uranium",null],
    tempLow: 0,
    category:"liquids",
    state: "liquid",
    density: 1001.74,
    stain: 0.01,
    hidden: true,
    isFood: true
}

elements.uranium_soda = {
    onSelect: function() {
        logMessage("Mod made by mrapple, ilikepizza and stefanblox");
    },
    color: "#19ad19",
    behavior: [
        "XX|CR:foam%2|XX",
        "M2|XX|M2",
        "M2|M1|M2",
    ],
    tempHigh: 100,
    stateHigh: ["steam","carbon_dioxide","molten_uranium"],
    tempLow: -1.11,
    category: "liquids",
    reactions: {
        "dirt": { elem1: null, elem2: "fallout" },
        "sand": { elem1: null, elem2: "fallout" },
        "clay_soil": { elem1: null, elem2: "fallout" },
        "rock": { elem2: "fallout", chance: 0.0004 },
        "water": { elem1: "uranium", elem2: "uranium" },
        "salt": { elem2:"foam", chance:0.05 },
        "salt_water": { elem2:"foam", chance:0.01 },
        "sugar": { elem2:"foam", chance:0.001 },
        "candy": { elem2:"foam", chance:0.01 },
        "caramel": { elem2:"foam", chance:0.01 },
        "rust": { elem2:"fallout", chance:0.01 },
        "oxidized_copper": { elem2:"fallout", chance:0.01 },
        "neutron": { elem1:"n_explosion", tempMin:500, chance:0.1 }
    },
    state: "liquid",
    density: 1030,
    isFood: true
}

elements.uranium_juice = {
    onSelect: function() {
        logMessage("Mod made by mrapple, ilikepizza and stefanblox");
    },
    color: "#84dd84",
    behavior: behaviors.RADLIQUID,
    reactions: {
        "dirt": { elem1: null, elem2: "fallout" },
        "sand": { elem1: null, elem2: "fallout" },
        "clay_soil": { elem1: null, elem2: "fallout" },
        "seltzer": { elem1: "uranium_soda", elem2: "foam" },
        "carbon_dioxide": { elem1: "uranium_soda", elem2: "foam" },
        "neutron": { elem1:"n_explosion", tempMin:500, chance:0.1 }
    },
    tempHigh: 160,
    stateHigh: ["steam","molten_uranium"],
    tempLow: -10,
    stateLowColorMultiplier: 1.1,
    category: "liquids",
    state: "liquid",
    density: 1054,
    stain: 0.05,
    isFood: true,
}

elements.plutonium_tea = {
    onSelect: function() {
        logMessage("Mod made by mrapple, ilikepizza and stefanblox");
    },
    viscosity: 1100,
    tempHigh: 1000,
    stateHigh: ["fragrance", "null"],
    color: ["#795508", "#828b09"],
	behavior: behaviors.RADLIQUID,
	category: "liquids",
	state: "liquid",
    tempLow: 0,
    stateLow: "plutonium"
};
// mrapples stuffs
elements.plutonium = {
    onSelect: function() {
        logMessage("Mod made by mrapple, ilikepizza and stefanblox");
    },
    color: ["#38a30e", "#0d662b", "#5d995d"],
    behavior: behaviors.RADPOWDER,
    category: "powders",
    state: "solid",
    tempHigh: 100,
    stateHigh: "plutonium_tea"
};

elements.your_dad = {
    onSelect: function() {
        logMessage("Mod made by mrapple, ilikepizza and stefanblox");
    },
	color: "#000000",
	behavior: behaviors.WALL,
	category: "joke",
	state: "solid",
    behavior: [
        "XX|XX|XX",
        "XX|DL|XX",
        "XX|XX|XX"
    ],
    canPlace: false, // exists: false
};

// end of mrapples stuffs

elements.how_the_fuck_did_you_burn_the_water = {
    onSelect: function() {
        logMessage("Mod made by mrapple, ilikepizza and stefanblox");
    },
    color: "#18202c",
    behavior: behaviors.LIQUID,
    category: "joke",
    hidden: true,
    alias: "SANS HOW THE FUCK DID YOU BURN THE WATER?",
};

elements.theres_a_bomb_strapped_to_my_chest = {
    onSelect: function() {
        logMessage("Mod made by mrapple, ilikepizza and stefanblox");
    },
    color: "#b42020",
    behavior: [
        "XX|XX|XX",
        "XX|EX:15>explosion|XX", // let me finish
        "XX|XX|XX",
    ],
    category: "joke",
    hidden: true,
    burn: 100,
    burnTime: 1,
    burnInto: "explosion",
    tempHigh: 600,
    stateHigh: "explosion",
    state: "solid",
    density: 1630,
    excludeRandom: true,
    alias: "ITS GOING TO EXPLODE IN THREE SECON-",
};

if (!elements.uranium.reactions) elements.uranium.reactions = {
    onSelect: function() {
        logMessage("Mod made by mrapple, ilikepizza and stefanblox");
    },
};
elements.uranium.reactions.herbs = {
    onSelect: function() {
        logMessage("Mod made by mrapple, ilikepizza and stefanblox");
    }, elem1: "uranium_tea", elem2: null, chance: 20 }
elements.uranium.reactions.coffee_ground = {
    onSelect: function() {
        logMessage("Mod made by mrapple, ilikepizza and stefanblox");
    }, elem1: "uranium_coffee", elem2: null, chance: 30 }
elements.uranium.reactions.seltzer = {
    onSelect: function() {
        logMessage("Mod made by mrapple, ilikepizza and stefanblox");
    }, elem2: "uranium_soda", elem2: null, chance: 30 }
elements.uranium.reactions.juice = {
    onSelect: function() {
        logMessage("Mod made by mrapple, ilikepizza and stefanblox");
    }, elem1: "uranium_juice", elem2: null, chance: 30 }
