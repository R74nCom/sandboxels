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
"CR:neutron%0.01 AND M2|DL%0.01|CR:neutron%0.01 AND M2",
"M1|CR:neutron%0.01 AND M1|M1",
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
behavior: behaviors.RADIOACTIVE_POWDER,
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
elements.coal = {
color: "#363023",
behavior: behaviors.POWDER,
category: "energy",
density: 900,
state: "solid",
tempHigh: 1000,
stateHigh: "coal_coke",
burn: 33,
burnTime: 1500,
burnInto: ["ash", "coal_coke", "fire", "carbon_dioxide"]
};
elements.coal_coke = {
color: "#232b36",
behavior: behaviors.POWDER,
category: "energy",
reactions: {
"limestone": { "elem1":"blast_furnace_fuel", "elem2":null },
},
density: 900,
state: "solid",
burn: 45,
burnTime: 2000,
burnInto: ["ash", "carbon_dioxide", "fire"]
};
elements.blast_furnace_fuel = {
color: "#94947c",
behavior: behaviors.POWDER,
category: "energy",
density: 1450,
state: "solid",
burn: 25,
burnTime: 1500,
burnInto: ["carbon_dioxide", "fire", "slag"]
};
elements.rutile = {
color: "#522614",
behavior: behaviors.POWDER,
category: "land",
density: 4240,
state: "solid",
tempHigh: 1843,
stateHigh: "molten_rutile",
};
elements.slag = {
color: ["#2e2616", "#453124"],
behavior: behaviors.POWDER,
category: "land",
density: 2000,
state: "solid",
};
elements.molten_rutile = {
color: "#e3907f",
behavior: behaviors.LIQUID,
category: "liquids",
reactions: {
"chlorine": { "elem1": "titanium_tetrachloride", "elem2":null },
},
density: 4230,
state: "liquid",
temp: 2000,
tempLow: 1843,
stateLow: "rutile"
};
elements.titanium_tetrachloride = {
color: "#d9d7b2",
behavior: behaviors.LIQUID,
category: "liquids",
density: 1728,
state: "liquid",
tempHigh: 136.4,
stateHigh: "titanium_tetrachloride_gas",
tempLow: -24,
stateLow: "titanium_tetrachloride_crystal",
};
elements.titanium_tetrachloride_gas = {
color: "#e8edd5",
behavior: behaviors.GAS,
category: "gases",
density: 500,
state: "gas",
temp: 200,
tempLow: 136.4,
stateLow: "titanium_tetrachloride"
};
elements.titanium_tetrachloride_crystal = {
color: "#f5fffe",
behavior: behaviors.WALL,
category: "solids",
density: 1728,
state: "solid",
temp: -50,
tempHigh: -24,
stateHigh: "titanium_tetrachloride"
};
elements.chlorine = {
color: "#89b87b",
behavior: behaviors.GAS,
category: "gases",
density:3.2,
state: "gas",
tempLow: -101.5,
stateLow: "liquid_chlorine"
};
elements.liquid_chlorine = {
color: "#4b9c33",
behavior: behaviors.LIQUID,
category: "liquids",
density: 1.468,
state: "liquid",
tempHigh: -101.5,
stateHigh: "chlorine",
temp: -150
};
elements.mythril = {
color: "#51bd89",
behavior: behaviors.WALL,
category: "solids",
density: 7750,
state: "solid",
tempHigh: 2500,
stateHigh: "molten_mythril",
conduct: 0.93
};
elements.molten_mythril = {
color: "#eda724",
behavior: behaviors.LIQUID,
category: "liquids",
reactions: {
"molten_mithril": { "elem1": "molten_mythril_mithril_alloy", "elem2":null },
},
density: 6855,
state: "liquid",
tempLow: 2500,
stateLow: "mythril",
temp: 3000
};
elements.argon = {
color: "#92dec7",
colorOn: "#8a27d6",
behavior: behaviors.GAS,
category: "gases",
density: 1.78,
state: "gas",
tempLow: -189.4,
stateLow: "liquid_argon",
conduct: 0.85
};
elements.liquid_argon = {
color: "#679991",
colorOn: "#6d3080",
behavior: behaviors.LIQUID,
category: "liquids",
density: 1398.2,
state: "liquid",
tempHigh: -189.4,
temp: -200,
stateHigh: "argon",
conduct: 0.9
};
elements.molten_mithril_mythril_alloy = {
name: "Molten Mithril/Mythril Alloy",
color: "#ebd8a4",
behavior: behaviors.LIQUID,
category: "liquids",
density: 3922.5,
state: "liquid",
tempLow: 1975,
stateLow: "mithril_mythril_alloy"
},
elements.mithril_mythril_alloy = {
conduct: 0.965,
name: "Mithril/Mythril Alloy",
color: "#bfd8d9",
behavior: behaviors.WALL,
category: "solids",
density: 4425,
state: "solid",
tempHigh: 1975,
stateHigh: "molten_mithril_mythril_alloy"
};
elements.berry_seed = {
color: ["#941260", "#752043"],
behavior: [
"XX|M2%0.1|XX",
"L2:berry_leaf%50 AND M2%5|CH:berry_leaf%0.1|L2:berry_leaf%50 AND M2%5",
"XX|M1|XX",
],
category: "life",
density: 1200,
state: "solid",
burn: 10,
burnTime: 50,
burnInto: ["ash", "carbon_dioxide", "juice"]
};
elements.old_berry_leaf = {
color: ["#0fbf53", "#118f42"],
behavior: [
"XX|CR:berry%0.01|XX",
"CR:berry%0.01|XX|CR:berry%0.01",
"XX|CR:berry%0.01|XX",
],
category: "life",
state: "solid",
burn: 15,
burnTime: 50,
burnInto: ["ash", "carbon_dioxide"]
};
elements.berry_leaf = {
burn: 10,
burnTime: 50,
burnInto: ["ash", "carbon_dioxide", "juice"],
color: ["#0fbf53", "#118f42"],
behavior: [
"XX|CR:berry leaf,old_berry_leaf%1|XX",
"CR:berry leaf,old_berry_leaf%2 AND SA|CH:old_berry_leaf%0.1|CR:berry leaf,old_berry_leaf%2 AND SA",
"XX|CR:berry leaf,old_berry_leaf%2|XX",
],
category: "life",
state: "solid"
};
elements.juice = {
burn: 5,
burnTime: 100,
burnInto: ["water", "carbon_dioxide", "smoke"],
color: "#eb96b5",
behavior: behaviors.LIQUID,
category: "life",
state: "liquid",
conduct: 0.019
};
elements.berry = {
burn: 15,
burnTime: 150,
burnInto: ["ash", "carbon_dioxide", "juice"],
color: "#bf2477",
behavior: [
"XX|XX|XX",
"XX|CH:ripe_berry%0.01|XX",
"XX|XX|XX",
],
category: "life",
state: "solid"
};
elements.flamer = {
color: ["#ff8000", "#ff00ff"],
category: "machines",
state: "solid",
behavior: [
"XX|CL%50|XX",
"CL%50|CH:fire, plasma|CL%50",
"M2|CL%50 AND M1|M2",
],
temp: 1000
};
elements.hematite = {
color: ["#824b1b", "#914a20", "##ad3f1d"],
category: "land",
state: "solid",
behavior: behaviors.POWDER,
tempHigh: 1538,
stateHigh: "molten_hematite",
reactions: {
"blast_furnace_fuel": { "elem1":"hematite_mixture", "elem2":null },
},
};
/* Unfinished:
molten hematite
magnesium
molten magnesium
titanium
molten titanium
*/
