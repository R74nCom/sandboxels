// changelog for more_gold.js
// initial release

//1.0 update
// adds green_gold
// adds molten_green_gold

// 1.1 update
// adds black gold
// adds gold_rust 
// added reactions for the golds

elements.green_gold = {
    color: ["#94c7a3","#7bb298","#94c7a3"],
	reactions: {
        "water": { elem1:"gold_rust", chance:0.02 },
        "salt_water": { elem1:"gold_rust", chance:0.005 },
        "dirty_water": { elem1:"gold_rust", chance:0.04 },
        "pool_water": { elem1:"gold_rust", chance:0.04 },
        "sugar_water": { elem1:"gold_rust", chance:0.0035 },
        "seltzer": { elem1:"gold_rust", chance:0.006 },
        "alcohol": { elem1:"gold_rust", chance:0.03 },
        "blood": { elem1:"gold_rust", chance:0.003 },
        "infection": { elem1:"gold_rust", chance:0.003 },
        "antibody": { elem1:"gold_rust", chance:0.003 },
        "fire": { elem1:"gold_rust", chance:0.0025 },
		"oxygen": { elem1:"gold_rust", chance:0.05 },
    },
    behavior: behaviors.WALL,
    tempHigh: 500,
    category: "solids",
    density: 13000,
	burnInto: ["molten_green_gold"],
    conduct: 0.87,
};
elements.molten_green_gold = {
    color: "#d9f046",
    behavior: behaviors.MOLTEN,
    tempHigh: 500,
    category: "states",
    density: 13000,
    conduct: 0.87,
	Hidden: true
};

elements.black_gold = {
    color: "#333333",
    behavior: behaviors.WALL,
		reactions: {
        "water": { elem1:"gold_rust", chance:0.0025 },
        "salt_water": { elem1:"gold_rust", chance:0.005 },
        "dirty_water": { elem1:"gold_rust", chance:0.04 },
        "pool_water": { elem1:"gold_rust", chance:0.04 },
        "sugar_water": { elem1:"gold_rust", chance:0.0035 },
        "seltzer": { elem1:"gold_rust", chance:0.006 },
        "alcohol": { elem1:"gold_rust", chance:0.03 },
        "blood": { elem1:"gold_rust", chance:0.003 },
        "infection": { elem1:"gold_rust", chance:0.003 },
        "antibody": { elem1:"gold_rust", chance:0.003 },
        "fire": { elem1:"gold_rust", chance:0.0025 },
		"oxygen": { elem1:"gold_rust", chance:0.05 },
    },
    category: "solids",
    density: 19300,
    hardness: 0.25,
};

elements.gold_rust = {
    color: "#e6d37e",
    behavior: behaviors.SUPPORT,
    tempHigh: 3000,
    stateHigh: "molten_gold",
    category: "powders",
    state: "solid",
    density: 5250,
    conduct: 0.37,
    hardness: 0.3
};

elements.gold.reactions["fire"] = { elem1: null, elem2: "gold_rust" };
