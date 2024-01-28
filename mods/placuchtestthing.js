elements.testdust = {
    color: "#CC8811",
    behavior: behaviors.POWDER,
    temp: 20,
    tempHigh: 1200,
    stateHigh: "testmolten",
    category: "powders",
    viscosity: 10000,
    state: "powder",
    reactions: {
        "testliquid" : { elem1: "testmud", elem2: null},
    },
    density: 1250,
};

elements.testmud = {
    color: "#BB5501",
    behavior: behaviors.STURDYPOWDER,
    temp: 20,
    tempHigh: 150,
    stateHigh: ["testdust","testdust","testgas","testdust","testgas"],
    category: "land",
    viscosity: 10000,
    state: "powder",
    density: 1450,
};

elements.testliquid = {
    color: "#EEAA33",
    behavior: behaviors.LIQUID,
    temp: 20,
    tempHigh: 150,
    stateHigh: "testgas",
    tempLow: -5,
    stateLow: "testice",
    category: "liquids",
    viscosity: 10000,
    state: "liquid",
    density: 1050,
};

elements.testmolten = {
    color: ["#FE6D01","#FF8C00","#FF4D00"],
    behavior: behaviors.MOLTEN,
    temp: 1500,
    tempLow: 1200,
    stateLow: "testsolid",
    category: "liquids",
    viscosity: 10000,
    state: "liquid",
    density: 1250,
};

elements.testsolid = {
    color: "#DC9831",
    behavior: behaviors.WALL,
    temp: 20,
    tempHigh: 1200,
    stateHigh: "testmolten",
    category: "solids",
    viscosity: 10000,
    state: "solid",
    density: 1250,
    breakInto: "testdust",
    noMix: true,
};

elements.testgas = {
    color: "#FFBB55",
    behavior: behaviors.GAS,
    temp: 200,
    tempLow: 145,
    stateLow: "testliquid",
    category: "gases",
    viscosity: 10000,
    state: "gas",
    density: 1050,
};

elements.testice = {
    color: "#FEBA53",
    behavior: behaviors.WALL,
    temp: -50,
    tempHigh: -5,
    stateHigh: "testliquid",
    category: "solids",
    viscosity: 10000,
    state: "solid",
    density: 1250,
    breakInto: "testdust", // thought it would be cool if all the elements would be connected in some way
    noMix: true,
};
