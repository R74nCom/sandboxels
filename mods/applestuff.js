elements.cat = {
	color: ["#ffffff", "#494949", "#ffc505"],
	behavior: [
        "XX|XX|XX",
        "M2%25|XX|M2%25",
        "XX|M1|XX",
    ],
	category: "life",
	state: "solid",
    desc: "cat.",
    tempHigh: 100,
    stateHigh: "meat",
    tempLow: 0,
    stateLow: "frozen_meat"
};

elements.the_hot_destroyer = {
    color: "#ff0000",
	behavior: behaviors.POWDER,
	category: "weapons",
	state: "solid",
    desc: "literally just is super hot, destroys anything that can be melted",
    temp: Infinity,
    reactions: {
        "the_cold_destroyer": {elem1: null, elem2: null}
    }
};

elements.the_cold_destroyer = {
    color: "#00ccff",
	behavior: behaviors.POWDER,
	category: "weapons",
	state: "solid",
    desc: "literally just is super cold, freezes anything that can be frozen",
    temp: -Infinity,
    reactions: {
        "the_hot_destroyer": {elem1: null, elem2: null}
    }
};

elements.plutoneeum = {
    color: ["#38a30e", "#0d662b", "#5d995d"],
    behavior: behaviors.RADPOWDER,
    category: "powders",
    state: "solid",
    desc: "misspelled on purpose to avoid conflicts with other mods",
};

elements.lipstick = {
	color: "#a30000",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "liquid",
    viscosity: 650,
    tempHigh: 100,
    stateHigh: "steam",
    desc: "this mod is meant to have a description to everything but i don't know what to put here... its lipstick i guess?"
};

elements.very_hot_gold = {
    color: ["#fff0b5","#986a1a","#f0bb62"],
    behavior: behaviors.WALL,
    category: "solids",
    density: 19300,
    conduct: 0.81,
    hardness: 0.25,
    breakInto: "gold_coin",
    temp: Infinity,
    desc: "i'm running out of ideas, have this i guess"
};

elements.sour_patch_kids = {
	color:["#ff0000", "#00ff00", "#c8ff02", "#ff00c8"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
    desc: "don't think their meant to be purple"
};

// this piece of text is gonna change every update
