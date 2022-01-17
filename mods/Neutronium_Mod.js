elements.test = {
    color: "#ff0000",
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    density: 10,
};
elements.neutronium = {
    name: "Neutronium",
    color: "#aaffff",
    behavior: behaviors.POWDER,
    tempHigh: 1000,
    stateHigh: "molten_neutronium",
    category: "solids",
    state: "solid",
    density: 100000000000000000,
};
    elements.molten_neutronium = {
    name: "Molten Neutronium",
    color: "#ffffaa",
    behavior: behaviors.LIQUID,
    temp: 2500,
    tempHigh: 5000,
    stateHigh: "neutronium_gas",
    tempLow: 1000,
    stateLow: "neutronium",
    viscosity: 10,
    category: "liquids",
    state: "liquid",
    density: 50000000000000000,
};
    elements.neutronium_gas = {  
    name: "Neutronium Gas",
    color: "#abcdef",
    behavior: behaviors.GAS,
    temp: 6000,
    tempLow: 5000,
    stateLow: "molten_neutronium",
    category: "gases",
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
    stateHigh: "ionized_hydrogen",
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
    elements.ionized_hydrogen = {
    name: "Ionized Protium",
    color: "#ff00ff",
    behavior: behaviors.GAS,
    reactions: {
        "fusion_catalyst": { "elem1":"ionized_deuterium", "elem2":"fusion_catalyst" },
        "ionized_deuterium": { "elem1":"ionized_tralphium", "elem2":"light" },
    },
    category: "energy",
    state: "gas",
    density: 0.08375,
    temp: 11000,
    tempLow: 9726.85,
    stateLow: "hydrogen"
};
    elements.fusion_catalyst = {
    name: "Fusion Catalyst",
    color: ["#ff0000", "#ffff00"],
    behavior: behaviors.GAS,
    category: "energy",
    state: "solid",
    density: 1500
};
    elements.ionized_deuterium = {
    name: "Ionized Deuterium",
    color: "#c73097",
    behavior: behaviors.GAS,
    category: "energy",
    state: "gas",
    density: 0.17,
    temp: 11000,
    tempLow: 9726.85,
    stateLow: "deuterium"
};
    elements.deuterium = {
    name: "Deuterium",
    color: "#ace0e6",
    behavior: behaviors.GAS,
    reactions: {
        "oxygen": { "elem1":"heavy_water", "elem2":null },
    },
    category: "gases",
    state: "gas",
    density: 0.18,
    tempHigh: 9726.85,
    stateHigh: "ionized_deuterium",
    tempLow: -254.43,
    stateLow: "liquid_deuterium"
};
    elements.ionized_tralphium = {
    name: "Ionized Tralphium",
    color: "#f0f7da",
    behavior: behaviors.GAS,
    reactions: {
        "fusion_catalyst": { "elem1":"ionized_hydrogen", "elem2":"ionized_helium" }
    },
    category: "energy",
    state: "gas",
    density: 0.164,
    temp: 30000,
    tempLow: 28726.85,
    stateLow: "tralphium"
};
    elements.tralphium = {
    name: "Tralphium",
    color: "#bbc4a1",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 0.165,
    tempHigh: 28726.85,
    stateHigh: "ionized_tralphium",
    tempLow: -269,
    stateLow: "liquid_tralphium"
};
    elements.ionized_helium = {
    name: "Ionized Helium-4",
    color: "#aa00ff",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 0.177,
    temp: 30000,
    tempLow: 28726.85,
    stateLow: "helium"
};
    elements.helium = {
    name: "Helium-4",
    color: "#fffacc",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 0.178,
    tempHigh: 28726.85,
    stateHigh: "ionized_helium",
    tempLow: -272.2,
    stateLow: "liquid_helium"
};
    elements.liquid_tralphium = {
    name: "Liquid Tralphium",
    color: "#c6d669",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 59,
    temp: -274,
    tempHigh: 269,
    stateHigh: "Tralphium"
};
elements.liquid_deuterium = {
name: "Liquid Deuterium",
color: "#bff2eb",
behavior: behaviors.LIQUID,
reactions: {
"oxygen": { "elem1":"heavy_water", "elem2":null },
},
category: "liquids",
state: "liquid",
density: 162.4,
temp: -260,
tempHigh: -254.43,
stateHigh: "deuterium"
};
elements.liquid_helium = {
name: "Liquid Helium-4",
color: "#b2d1b5",
behavior: behaviors.LIQUID,
category: "liquids",
state: "liquid",
density: 162.4,
temp: -274,
tempHigh: -272.2,
stateHigh: "helium"
};
behaviors.PARTICLE = [
"XX|XX|XX",
"XX|XX|M1 AND BO",
"XX|XX|XX",
];
elements.neutron = {
color: "#0abef5",
behavior: behaviors.PARTICLE,
rotatable: true,
reactions: {
"protium": { "elem1":"deuterium", "elem2":null },
"deuterium": { "elem1":"tritium", "elem2":null },
},
category: "energy",
temp: 100
};
/* Unfinished:
Tritium
Liquid Tritium
Ionized Tritium
Heavy Water
*/
