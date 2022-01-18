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
        "fusion_catalyst": { "elem1":"ionized_helium", "elem2":"ionized_hydrogen" } /* NOTE:
Elem1 is the element shown in the properties, while elem2 is the element that is shown in the reactions. */
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
"oxygen": { "elem1":null, "elem2":"heavy_water" },
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
"XX|M1 AND BO|XX",
"XX|XX|M1 AND BO",
"M1 AND BO|XX|XX",
];
elements.neutron = {
color: "#0abef5",
behavior: behaviors.PARTICLE,
rotatable: true,
reactions: {
"protium": { "elem1":null, "elem2":"deuterium" },
"deuterium": { "elem1":null, "elem2":"tritium" },
"heavy_water": { "elem1":null, "elem2":"heavy_water"},
"heavy_steam": { "elem1":null, "elem2":"heavy_steam"},
"heavy_ice": { "elem1":null, "elem2":"heavy_ice"},
"heavy_snow": { "elem1":null, "elem2":"heavy_snow"},
},
category: "energy",
temp: 100,
density: 0.045
};
elements.heavy_water = {
color: "#394280",
behavior: behaviors.LIQUID,
category: "liquids",
density: 998,
state: "liquid",
tempHigh: 100,
stateHigh: "heavy_steam",
tempLow: 0,
stateLow: "heavy_ice"
};
behaviors.RADIOACTIVE_GAS = [
"M2|M1 AND CR:neutron%0.01|M2",
"M1 AND CR:neutron%0.01|DL%0.01|M1 AND CR:neutron%0.01",
"M2|M1 AND CR:neutron%0.01|M2", 
];
elements.tritium = {
color: "#7e86bf",
behavior: behaviors.RADIOACTIVE_GAS,
category: "gases",
density: 0.2,
state: "gas",
tempHigh: 9726.85,
stateHigh: "ionized_tritium",
tempLow: -248.15,
stateLow: "liquid_tritium"
};
elements.ionized_tritium = {
color: "#cff1fa",
behavior: behaviors.RADIOACTIVE_GAS,
category: "energy",
density: 0.199,
state: "gas",
tempLow: 9726.85,
stateLow: "tritium",
temp: 11000
};
behaviors.RADIOACTIVE_LIQUID = [ 
"XX|CR:neutron%0.01|XX",
"CR:neutron%0.01|DL%0.01|CR:neutron%0.01",
"M1|CR:neutron%0.01|M1",
];
elements.liquid_tritium = {
color: "#87ada7",
behavior: behaviors.RADIOACTIVE_LIQUID,
category: "liquids",
density: 50,
state: "liquid",
tempHigh: -248.15,
stateHigh: "tritium",
temp: -260
};
elements.radioactive_water = {
color: "#a510b5",
behavior: behaviors.RADIOACTIVE_LIQUID,
category: "liquids",
density: 1000,
state: "liquid",
tempHigh: 100,
stateHigh: "radioactive_steam",
tempLow: 0,
stateLow: "radioactive_ice"
};
elements.radioactive_steam = {
color: "#df90e8",
behavior: behaviors.RADIOACTIVE_GAS,
category: "gases",
density: 3.6,
state: "gas",
temp: 150,
tempLow: 100,
stateLow: "radioactive_water"
};
behaviors.RADIOACTIVE_SOLID = [
"XX|CR:neutron%0.01|XX",
"CR:neutron%0.01|DL%0.01|CR:neutron%0.01",
"XX|CR:neutron%0.01|XX",
];
elements.radioactive_ice = {
color: "#c2abcc",
behavior: behaviors.RADIOACTIVE_SOLID,
category: "solids",
state: "solid",
density: 920,
temp: -20,
tempHigh: 0,
stateHigh: "radioactive_water"
};
behaviors.RADIOACTIVE_POWDER = [
"XX|CR:neutron%0.01|XX",
"CR:neutron%0.01|DL%0.01|CR:neutron%0.01",
"M2|M1 AND CR:neutron%0.01|M2",
];
elements.radioactive_snow = {
color: "#9f7ba6",
behavior: behaviors.RADIOACTIVE_SOLID,
category: "land",
density: 103,
state: "solid",
temp: -20,
tempHigh: 0,
stateHigh: "radioactive_water"
};
elements.heavy_steam = {
color: "#656fb5",
behavior: behaviors.GAS,
category: "liquids",
density: 1.6,
state: "liquid",
temp: 150,
tempLow: 100,
stateLow: "heavy_water"
};
elements.heavy_ice = {
color: "#a8b8e3",
behavior: behaviors.WALL,
category: "solids",
density: 918,
state: "solid",
temp: -20,
tempHigh: 0,
stateHigh: "heavy_water"
};
elements.heavy_snow = {
color: "#8299b0",
behavior: behaviors.POWDER,
category: "land",
density: 101,
state: "solid",
temp: -20,
tempHigh: 0,
stateHigh: "heavy_water"
};
/* Unfinished:
Nothing!
*/
