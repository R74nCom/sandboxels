// obtaining chromium (makes chrome)
elements.magma.stateLow = ["rock", "basalt", "basalt", "basalt", "chromite"];

// chrome
elements.chromite = {
    color: ["#372d38", "#6e6e6e"],
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    tempHigh: 2180,
    stateHigh: "magma",
};

// stainless steel
elements.stainless_steel = {
    color: "#454545",
    behavior: behaviors.WALL,
    state: "solid",
    category: "solids",
    tempHigh: 1510,
};

// chrome
elements.chrome = {
    color: "#c4c4c4",
    behavior: behaviors.WALL,
    state: "solid",
    category: "solids",
    tempHigh: 1900,
    reactions: {
        "molten_steel": { elem2:"molten_stainless_steel", tempMin:1800, tempMax:2000 }
    },
    alias: "chromium",
};

// obtaining chrome (makes stainless steel)
elements.molten_aluminum.reactions.chromite = { elem2:"chrome", tempMin:1000, tempMax:1200, chance:0.1 };