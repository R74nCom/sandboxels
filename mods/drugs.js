elements.methamphetamine = {
    category: "powders",
    color: ["#b6ccd8", "#c5cfd6", "#cbd5db", "#6da5e0"],
    state: "solid",
    behavior: behaviors.POWDER,
    temp: 20,
    tempHigh: 1700,
    stateHigh: "molten_methamphetamine",
    reactions: {
        "water": {elem1: null, elem2: "dirty_water"},
        "cell": {elem1: "methamphetamine", elem2: "plague", chance: 0.001},
        "plant": {elem1: "methamphetamine", elem2: "dead_plant", chance: 0.005},
    },
};

elements.molten_methamphetamine = {
    category: "states",
    color: ["#fb7300", "#f93100", "#e05a1d", "#d65611"],
    state: "liquid",
    behavior: behaviors.RADMOLTEN,
    tempLow: 1700,
    stateLow: "methamphetamine",
};

elements.morphine = {
    category: "powders",
    color: "#c4dcf2",
    state: "solid",
    behavior: behaviors.POWDER,
    tempHigh: 10000,
    stateHigh: "n_explosion",
    reactions: {
        "head": {elem1: "n_explosion", elem2: "n_explosion", chance: 0.00008},
        "body": {elem1: "n_explosion", elem2: "n_explosion", chance: 0.00008},
    },
};

elements.cigarette = {
    category: "solids",
    color: ["#754531", "#e1e1dd"],
    state: "solid",
    behavior: [
        "XX|CR:smoke%1 AND CR:carbon_dioxide%0.5|XX",
        "CR:smoke%1 AND CR:carbon_dioxide%0.5|XX|CR:smoke%1 AND CR:carbon_dioxide%0.5",
        "XX|CR:smoke%1 AND CR:carbon_dioxide%0.5|XX",
    ],
    tempHigh: 233,
    stateHigh: ["ash", "fire"],
    breakInto: ["dust", "ash", "ash", "ash", "charcoal"],
};

elements.cannabis = {
    category: "powders",
    state: "solid",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn: 15,
    burnTime: 60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    behavior: behaviors.POWDER,
    color: ["#2C7415", "#1D5F00", "#B2DC29", "#B2DC29", "#2C7415"],
    reactions: {
        "head": { elem1: null, elem2: "fly" }
    },
}

elements.cannabis_seed = {
    category: "life",
    state: "solid",
    tempHigh: 120,
    stateHigh: "dead_plant",
    breakInto: "cannabis",
    behavior: [
        "CR:cannabis_branch%2|CR:cannabis_branch%2|CR:cannabis_branch%2",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
    color: "#57272C",
}

elements.cannabis_branch = {
    category: "life",
    hidden: true,
    state: "solid",
    tempHigh: 120,
    stateHigh: "dead_plant",
    breakInto: "dead_plant",
    behavior: [
        "CR:cannabis_branch%0.7|CR:cannabis_branch%3|CR:cannabis_branch%0.7",
        "CR:cannabis%4|XX|CR:cannabis%4",
        "CR:cannabis%4|XX|CR:cannabis%4",
    ],
    color: "#57272C",   
}

elements.weed = {
    category: "powders",
    behavior: behaviors.POWDER,
    state: "solid",
    tempHigh: 150,
    stateHigh: "dead_plant",
    breakInto: "dead_plant",
    burn: 15,
    burnTime: 60,
    burnInto: "dead_plant",
    color: ["#71B441", "#416201", "#426D06", "#91CA6F"]
}

elements.weed_seed = {
    category: "life",
    state: "solid",
    tempHigh: 150,
    stateHigh: "dead_plant",
    breakInto: "weed",
    burn: 10,
    burnTime: 60,
    burnInto: "dead_plant",
    color: "#5c4532",
    behavior: [
        "CR:weed_branch%0.2|CR:weed_branch%0.2|CR:weed_branch%0.2",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
}

elements.weed_branch = {
    category: "life",
    hidden: true,
    state: "solid",
    tempHigh: 150,
    stateHigh: "dead_plant",
    breakInto: "weed",
    burn: 10,
    burnTime: 60,
    color: "#5c4532",
    behavior: [
        "CR:weed_branch%0.7|CR:weed_branch%3|CR:weed_branch%0.7",
        "CR:cannabis%4|XX|CR:cannabis%4",
        "CR:cannabis%4|XX|CR:cannabis%4"
    ],
}