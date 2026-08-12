elements.white_gold = {
    name: "White Gold",
    color: ["#8a8a8a", "#c2c2c2", "#cbced4", "#5e5e5e", "#cfcfcf"],
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 15000,
    hardness: 0.3
};

elements.molten_white_gold = {
    name: "Molten White Gold",
    color: ["#8a8a8a", "#c2c2c2", "#cbced4", "#5e5e5e", "#cfcfcf"],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 15000,
    temp: 1000,
    tempLow: 900,
    stateLow: "white_gold"
};

if (!elements.molten_gold.reactions) elements.molten_gold.reactions = {};
elements.molten_gold.reactions.molten_zinc = {
    elem1: "molten_white_gold",
    elem2: null
};

if (!elements.molten_zinc.reactions) elements.molten_zinc.reactions = {};
elements.molten_zinc.reactions.molten_gold = {
    elem1: null,
    elem2: "molten_white_gold"
};
