elements.pyrane = {
    color: "#fc7c19",
    behavior: [
    "M1|M1 AND CR:fire%10|M1",
    "M1|XX|M1",
    "M1|M1|M1",
],
    hidden: true,
    category: "hydroid",
    state: "gas",
    temp: 50,
    tempLow: -20,
    stateLow: ["fyrium"],
    reactions: {
            "dirt": { elem1:"pyrane", elem2:"fire" },
            "hydrogen": { elem1:"hydroid", elem2:"hydroid" },
    }
};

elements.hydroid = {
    color: "#3a0ca6",
    behavior: [
        ["XX", "XX", "XX"],
        ["M2", "XX", "M2"],
        ["M1", "M1 AND SW:water AND CH:water>hydroid%10", "M1"]
    ],
    category: "hydroid",
    state: "liquid",
    temp: 20,
    tempHigh: 100,
    tempLow: -20,
    density: 12,
    conduct: 1,
    stain: 0.7,
    desc: "this is NOT water",
    stateHigh: ["pyrane", "steam"],
    stateLow: ["hydroid_ice"],
    reactions: {
        "fire": { elem2: "explosion" },
        "body": { elem2: "hydroid", chance: 0.5 },
        "head": { elem2: "hydroid", chance: 0.5 },
        "maple_syrup": { elem2: "hydroid" },
        "magma": { elem2: "hydroid" },
        "oil": { elem2: "hydroid" },
        "juice": { elem2: "hydroid" },
        "ice": { elem2: "hydroid_ice" },
        "blood": { elem2: "hydroid" },
        "infection": { elem2: "hydroid" },
        "milk": { elem1: "lactoid", elem2: "lactoid" }
    }
};

elements.lactoid = {
    color: ["#deeeff"],
    behavior: [
    "XX|XX|XX",
    "M1 AND SW:water AND CH:water>hydroid%5 AND CH:hydroid>lactoid%1 AND CH:milk>lactoid%10|XX|M1 AND SW:water AND CH:water>hydroid%5 AND CH:hydroid>lactoid%1 AND CH:milk>lactoid%10",
    "M1|M1 AND SW:water AND CH:water>hydroid%5 AND CH:hydroid>lactoid%1 AND CH:milk>lactoid%10|M1",
],
    category: "hydroid",
    state: "liquid",
    temp: 20,
    tempHigh: 100,
    tempLow: -25,
    density: 12,
    conduct: 1,
    stain: 0.7,
    desc: "this is NOT milk",
    stateHigh: ["pyrane", "steam", "salt"],
    stateLow: ["lactoid_ice"],
    reactions: {
        "fire": { elem2: "explosion" },
        "body": { elem2: "hydroid", chance: 0.5, func: behaviors.KILLPIXEL2 },
        "head": { elem1: null, elem2: "hydroid", chance: 0.01, func: behaviors.FEEDPIXEL },
        "maple_syrup": { elem2: "hydroid" },
        "magma": { elem2: "hydroid" },
        "oil": { elem2: "hydroid" },
        "juice": { elem2: "hydroid" },
        "ice": { elem1: "lactoid_ice", elem2: "lactoid_ice" },
        "slush": { elem1: "hydroid_milkshake", elem2: "hydroid_milkshake" },
        "blood": { elem2: "hydroid" },
        "infection": { elem2: "hydroid" },
    }
};

elements.lactoid_ice = {
    color: ["#bacbe0"],
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|M1|XX",
],
    category: "states",
    hidden: true,
    state: "solid",
    temp: -25,
    tempHigh: -20,
    density: 12,
    stain: 0.7,
    stateHigh: ["lactoid"],
    reactions: {
        "fire": { elem2: "explosion" },
        "body": { elem2: "hydroid", chance: 0.5, func: behaviors.KILLPIXEL2 },
        "head": { elem1: null, elem2: "hydroid", chance: 0.5, func: behaviors.FEEDPIXEL },
        "maple_syrup": { elem2: "hydroid" },
        "magma": { elem2: "hydroid" },
        "oil": { elem2: "hydroid" },
        "juice": { elem2: "hydroid" },
        "ice": { elem1: "lactoid_ice", elem2: "lactoid_ice" },
        "slush": { elem1: "hydroid_milkshake", elem2: "hydroid_milkshake" },
        "blood": { elem2: "hydroid" },
        "infection": { elem2: "hydroid" },
    }
};




elements.hydroid_ice = {
    color: ["#316787"],
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|M1|XX",
],
    category: "states",
    hidden: true,
    state: "solid",
    temp: -20,
    tempHigh: -18,
    density: 12,
    stain: 0.7,
    stateHigh: ["hydroid"],
    reactions: {
        "fire": { elem2: "explosion" },
        "body": { elem2: "hydroid", chance: 0.5, func: behaviors.KILLPIXEL2 },
        "head": { elem1: null, elem2: "hydroid", chance: 0.5, func: behaviors.FEEDPIXEL },
        "maple_syrup": { elem2: "hydroid" },
        "magma": { elem2: "hydroid" },
        "oil": { elem2: "hydroid" },
        "juice": { elem2: "hydroid" },
        "ice": { elem2: "hydroid_ice" },
        "ice_cream": { elem1: "hydroid_milkshake", elem2: "hydroid_milkshake" },
        "blood": { elem2: "hydroid" },
        "infection": { elem2: "hydroid" },
    }
};




elements.hydroid_milkshake = {
    color: ["#69acff", "#94b2d6", "#699bff"],
    behavior: [
    "XX|M1%0.1|XX",
    "M1|XX|M1",
    "M1|M1|M1",
],
    category: "hydroid",
    state: "liquid",
    temp: 20,
    tempHigh: 100,
    tempLow: -40,
    stateLow: "hydroid_ice",
    density: 12,
    conduct: 1,
    stain: 0.7,
    desc: "somehow edible",
    stateHigh: ["pyrane", "steam", "salt", "sugar"],
    reactions: {
        "fire": { elem2: "explosion" },
        "head": { elem1: null, func: behaviors.FEEDPIXEL }
    }
};

elements.cremoid = {
    color: ["#f2fffe"],
    behavior: [
    "XX|SW:milk,lactoid,butyroid,melted_butter,water AND CR:bubble%1|XX",
    "M1 AND SW:water|CH:butyroid%0.1|M1 AND SW:water",
    "M1|M1|M1",
],
    category: "hydroid",
    state: "liquid",
    temp: 20,
    tempHigh: 100,
    tempLow: -25,
    density: 12,
    conduct: 1,
    desc: "this is NOT cream",
    stateHigh: ["pyrane", "steam"],
    stateLow: ["icecream", "hydroid_milkshake"],
    reactions: {
        "fire": { elem2: "explosion" },
        "head": { elem1: null, chance: 0.01, func: behaviors.FEEDPIXEL },
        "ice": { elem1: "lactoid_ice", elem2: "lactoid_ice" },
        "slush": { elem1: "hydroid_milkshake", elem2: "hydroid_milkshake" },
    }
};

elements.butyroid = {
    color: ["#a3f1ff"],
    behavior: [
    "XX|XX|XX",
    "M1%2|CH:butter%0.1|M1%2",
    "M1|M1|M1",
],
    category: "hydroid",
    state: "liquid",
    temp: 20,
    tempHigh: 33,
    density: 120,
    conduct: 1,
    desc: "this is NOT cream",
    stateHigh: ["pyrane", "melted_butter"],
    reactions: {
        "fire": { elem2: "explosion" },
        "head": { elem1: null, chance: 0.01, func: behaviors.FEEDPIXEL },
    }
};




