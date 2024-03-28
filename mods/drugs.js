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
    reactions: {
        "head": {elem1: "n_explosion", elem2: "n_explosion", chance: 0.00008},
        "body": {elem1: "n_explosion", elem2: "n_explosion", chance: 0.00008},
    },
};