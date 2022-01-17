elements.test = {
    color: "#ff0000",
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    density: 10,
};
elements.Neutronium = {
    color: "#aaffff",
    behavior: behaviors.POWDER,
    tempHigh: 1000,
    stateHigh: "Molten_Neutronium",
    category: "energy",
    state: "solid",
    density: 100000000000000000,
};
    elements.Molten_Neutronium = {
    color: "#ffffaa",
    behavior: behaviors.LIQUID,
    temp: 2500,
    tempHigh: 5000,
    stateHigh: "Neutronium_Gas",
    tempLow: 1000,
    stateLow: "Neutronium",
    viscosity: 10,
    category: "energy",
    state: "liquid",
    density: 50000000000000000,
};
    elements.Neutronium_Gas = {  
    color: "#abcdef",
    behavior: behaviors.GAS,
    temp: 6000,
    tempLow: 5000,
    stateLow: "Molten_Neutronium",
    category: "energy",
    state: "gas",
    density: 0.045,
};
    elements.hydrogen = {
    name: "Protium",
    color: "#558bcf",
    behavior: behaviors.GAS,
    reactions: {
        "oxygen": { "elem1":null, "elem2":"hydrogen" },
    },
    category: "gases",
    burn: 100,
    burnTime: 2,
    tempHigh: 9726.85,
    stateHigh: "Ionized_Hydrogen",
    tempLow: -252.8,
    stateLow: "liquid_hydrogen",
    state: "gas",
    density: 0.08375,
};
    elements.liquid_hydrogen = {
    name: "Liquid Protium",
    color: "#97afcf",
    behavior: behaviors.LIQUID,
    reactions: {
        "liquid_oxygen": { "elem1":"ice", "elem2":null },
                    "oxygen": { "elem1":"ice", "elem2":null },
    },
    category: "liquids",
    burn: 100,
    burnTime: 2,
    temp:-252.8,
    tempHigh: -252.8,
    stateHigh: "hydrogen",
    state: "liquid",
    density: 71,
};
    elements.Ionized_Hydrogen = {
    name: "Ionized Protium",
    color: "ff00ff",
    behavior: behaviors.GAS,
    category: "energy",
    state: "gas",
    density: 0.08375,
    tempLow: 9726.85,
    stateLow: "hydrogen"
};
