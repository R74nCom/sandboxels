// energy:

elements.gama = {
    color: "#e78930",
    tick: behaviors.BOUNCY,
    category: "energy",
    conduct: 1,
    hardness: 0,
    state: "gas",
    name: "gama",
    density: 0,
    temp1: 100,
    hidden: false,

    reactions: {
        body: {elem1: "radiation"},
        head: {elem1: "radiation"},
        neutron: {elem1: "positron"},
        lead: {elem1: null, chance: 0.5},
    },

    behavior: [
        "XX|XX|XX",
        "XX|DL%0.2|XX",
        "XX|XX|XX"
    ],
    
    ignoreAir: true,
};

elements.alpha = {
    color: "#ddda2a",
    tick: behaviors.BOUNCY,
    category: "energy",
    state: "gas",
    name: "alpha",
    density: 0,
    temp1: 50,
    hidden: false,
    conduct: 0,
    hardness: 0,

    reactions: {
        body: {elem1: "radiation"},
        head: {elem1: "radiation"},
        neutron: {elem1: "positron"},
        lead: {elem1: null},
    },

    behavior: [
        "XX|XX|XX",
        "XX|DL%0.2|XX",
        "XX|XX|XX"
    ],

    ignoreAir: true,
};

elements.beta = {
    color: "#3ba0a3",
    tick: behaviors.BOUNCY,
    category: "energy",
    state: "gas",
    name: "beta",
    density: 0.5,
    temp1: 150,
    conduct: 1,
    hardness: 0.5,
    hidden: false,

    reactions: {
        body: {elem1: "radiation"},
        head: {elem1: "radiation"},
        neutron: {elem1: "positron"},
        lead: {elem1: null},
    },
    
    behavior: [
        "XX|XX|XX",
        "XX|DL%0.2|XX",
        "XX|XX|XX"
    ],

    ignoreAir: true,
};

// nuclear:
elements.graphite = {
    color: "#8a8383",
    density: 2.3,
    state: "solid",
    conduct: 0,
    hardness: 1,
    name: "graphite",
    hidden: false,
    category: "solids",

    tempHigh: 3626,
    stateHigh: "molten_graphite",

    behavior: [
        "RL:neutron%2 AND RL:radiation%1"
    ],

    reactions: {
        neutron: {elem2: null, chance: 0.8}
    },
};

elements.boron = {
    color: "#948d8d",
    density: 2.37,
    conduct: 0,
    hardness: 1,
    name: "boron",
    category: "solids",

    tempHigh: 2076,
    stateHigh: "molten_boron",

    reactions: {
        neutron: {elem2: null, chance: 0.9},
    },

    behavior: [
        "RL:radiation%0.01"
    ],
};

elements.plutonium = {
    color: "#c5a61d",
    density: 19.86,
    conduct: 0,
    hardness: 1,
    category: "solids",
    name: "plutonium",
    state: "SOLID",

    tempHigh: 375,
    stateHigh: "molten_plutonium",

    behavior: [
        "RL:gama%0.2 AND RL:alpha%0.3 AND RL:beta%0.05 AND RL:radiation%0.2",
    ],

    reactions: {
        neutron: {temp1: 150, elem2: "radiation"}
    },

};

// states:

elements.molten_boron = {
    color: "#b88c2e",
    density: 2.3,
    state: "MOLTEN",
    category: "liquids",
    hidden: true,
    tick: behaviors.MOLTEN,
    
    tempLow: 2056,
    stateLow: "boron",

    behavior: [
        "RL:radiation%1 AND RL:neutron%0.05"
    ],

};

elements.molten_graphite = {
    color: "#d18719",
    density: 2.3,
    state: "MOLTEN",
    category: "liquids",
    hidden: true,
    tick: behaviors.MOLTEN,

    tempLow: 3580,
    stateLow: "graphite",

    behavior: [
        "RL:radiation%3 AND RL:neutron%5"
    ],

};

elements.molten_plutonium = {

    color: "#ffd900",
    state: "MOLTEN",
    category: "liquids",
    hidden: true,

    behavior: behaviors.MOLTEN,

    tempLow: 350,
    stateLow: "plutonium",

    tick: function(pixel) {
        if (pixel.temp > 600) {
            changePixel(pixel, "n_explosion")
        }
    },
};
