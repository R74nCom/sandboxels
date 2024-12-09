elements.barf = {
    color: "#9ACD32",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M1|M1|M1"
    ],
    category: "liquids",
    density: 1020,
    state: "liquid",
    viscosity: 5,
    reactions: {
        "milk": { "elem1": "cheese", "chance": 1.0 }
    },
    tempHigh: 300,
    stateHigh: "stench",
    tempLow: 0,
    stateLow: "frozen_barf",
    flammable: true,
    burn: 20,
    burnInto: "smoke"
};

elements.frozen_barf = {
    color: "#B0E0E6",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX"
    ],
    category: "solids",
    density: 1030,
    state: "solid",
    tempHigh: 0,
    stateHigh: "barf"
};

elements.slime.reactions = elements.slime.reactions || {};
elements.slime.reactions.blood = { "elem1": "barf", "chance": 1.0 };

elements.blood.reactions = elements.blood.reactions || {};
elements.blood.reactions.slime = { "elem1": "barf", "chance": 1.0 };
