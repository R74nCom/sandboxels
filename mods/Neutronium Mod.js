currentColor = "#80ffff";
function deletecoconut() {
    throw "The game crashed, because you deleted the coconut."
}
let rPOWDER = behaviors.POWDER
console.log("Welcome to the console.");
console.log(rPOWDER);
elements.test = {
    name: "Testium",
    color: "#ff0000",
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    density: 15,
    temp: 22,
    tempHigh: 35,
    stateHigh: "molten_testium",
    reactions: {
        "ilitium": { "elem1":"tralphium", "elem2":null },
        "nickel": { "elem1":"iron", "elem2":null },
    }
};
elements.molten_testium = {
    name:"Liquid Testium",
    color:"#0000ff",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 10,
    temp: 50,
    tempHigh: 450,
    stateHigh: "testium_gas",
    tempLow: 35,
    stateLow: "test",
    reactions: {
        "ilitium": { "elem1":"tralphium", "elem2":null },
        "molten_nickel": { "elem1":"molten_iron", "elem2":null },
    },
};

elements.testium_gas = {
    name:"Liquid Testium",
    color:"#00ff00",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 5,
    temp: 525,
    tempLow: 450,
    stateLow: "molten_testium",
    reactions: {
        "ilitium": { "elem1":"helium", "elem2":null },
    },
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
    viscosity: 10000,
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
        "oxygen": { "elem1":null, "elem2":"steam" },
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
category: "gases",
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
color: ["#e3907f", "#e68f3e"],
behavior: behaviors.LIQUID,
category: "liquids",
reactions: {
"chlorine": { "elem1": "titanium_tetrachloride", "elem2":null },
},
density: 4230,
state: "liquid",
temp: 2000,
tempLow: 1843,
stateLow: "rutile",
viscosity: 10000
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
reactions: {
    "water": { "elem1": "pool_water", "elem2":null },
    "hydrogen": { "elem1": "acid_gas", "elem2":null },//hydrochloric acid
    "dirty_water": { "elem2":"water" },
},
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
category: "mythical",
density: 7750,
state: "solid",
tempHigh: 2500,
stateHigh: "molten_mythril",
conduct: 0.93
};
elements.molten_mythril = {
color: ["#eda724", "#f0eabd"],
behavior: behaviors.LIQUID,
category: "mythical",
reactions: {
"molten_mithril": { "elem1": "molten_mithril_mythril_alloy", "elem2":null },
},
density: 6855,
state: "mythical",
tempLow: 2500,
stateLow: "mythril",
temp: 3000,
viscosity: 10000
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
category: "mythical",
density: 3922.5,
state: "liquid",
tempLow: 1975,
stateLow: "mithril_mythril_alloy",
viscosity: 10000,
temp: 2350
};
elements.mithril_mythril_alloy = {
conduct: 0.965,
name: "Mithril/Mythril Alloy",
color: "#bfd8d9",
behavior: behaviors.WALL,
category: "mythical",
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
conduct: 0.019,
viscosity: 100
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
color: ["#824b1b", "#914a20", "#ad3f1d"],
category: "land",
state: "solid",
behavior: behaviors.POWDER,
tempHigh: 1538,
stateHigh: "molten_hematite",
reactions: {
"blast_furnace_fuel": { "elem1":"hematite_mixture", "elem2":null },
},
};
elements.molten_hematite = {
color: ["#e68f3e", "#e0ae51", "#dbc356"],
category: "liquids",
state: "liquid",
behavior: behaviors.LIQUID,
tempLow: 1538,
stateLow: "hematite",
temp: 2000,
viscosity: 10000
};
elements.crystal = {
color: ["#a1e6df", "#bae8de"],
category: "solids",
state: "solid",
behavior: behaviors.WALL,
tempHigh: 1000,
stateHigh: "liquid_crystal",
conduct: 0.3
};
elements.t_center = {
color: "#808080",
behavior: [
"CR:a7|CR:wall|CR:a7",
"XX|XX|XX",
"XX|CR:t2|XX",
],
state: "solid",
category: "structures"
};
elements.a_center = {
color: "#808080",
behavior: [
"XX|XX|XX",
"CR:a2|XX|CR:a2",
"XX|XX|XX",
],
state: "solid",
category: "structures"
};
elements.a2 = {
color: "#808080",
behavior: [
"XX|XX|XX",
"CR:a3left|XX|CR:a3right",
"XX|XX|XX",
],
state: "solid",
category: "structures"
};
elements.a3left = {
color: "#808080",
behavior: [
"XX|CR:a4left|XX",
"XX|XX|XX",
"XX|CR:a5|XX",
],
state: "solid",
category: "structures"
};
elements.a3right = {
color: "#808080",
behavior: [
"XX|CR:a4right|XX",
"XX|XX|XX",
"XX|CR:a5|XX",
],
state: "solid",
category: "structures"
};
elements.a4left = {
color: "#808080",
behavior: [
"XX|CR:a6left|XX",
"XX|XX|XX",
"XX|XX|XX",
],
state: "solid",
category: "structures"
};
elements.a4right = {
color: "#808080",
behavior: [
"XX|CR:a6right|XX",
"XX|XX|XX",
"XX|XX|XX",
],
state: "solid",
category: "structures"
};
elements.a5 = {
color: "#808080",
behavior: [
"XX|CR:wall|XX",
"XX|XX|XX",
"XX|CR:wall|XX",
],
state: "solid",
category: "structures"
};
elements.a6left = {
color: "#808080",
behavior: [
"XX|XX|XX",
"XX|XX|CR:a7",
"XX|XX|XX",
],
state: "solid",
category: "structures"
};
elements.a6right = {
color: "#808080",
behavior: [
"XX|XX|XX",
"CR:a7|XX|XX",
"XX|XX|XX",
],
state: "solid",
category: "structures"
};
elements.a7 = {
color: "#808080",
behavior: [
"XX|XX|XX",
"CR:wall|XX|CR:wall",
"XX|XX|XX",
],
state: "solid",
category: "structures"
};
elements.t2 = {
color: "#808080",
behavior: [
"XX|CR:a5|XX",
"XX|XX|XX",
"XX|CR:a5",
],
state: "solid",
category: "structures"
};
elements.electrical_flamewave_generator = {
color: "#e6a045",
behavior: behaviors.WALL,
behaviorOn: [
"CR:flameshockwave1|CR:flameshockwave2|CR:flameshockwave3",
"CR:flameshockwave4|XX|CR:flameshockwave5",
"CR:flameshockwave6|CR:flameshockwave7|CR:flameshockwave8",
],
state: "solid",
category: "machines",
tempHigh: 2500,
stateHigh: ["molten_steel", "molten_mythril"],
conduct: 1,
};
elements.flameshockwave1 = {
color: "#c9c9c9",
category: "special",
behavior: [
"LB:fire AND M1|LB:fire|LB:fire",
"LB:fire|LB:fire AND DL%3.33|LB:fire",
"LB:fire|LB:fire|LB:fire",
],
};
elements.flameshockwave2 = {
color: "#c9c9c9",
category: "special",
behavior: [
"LB:fire|LB:fire AND M1|LB:fire",
"LB:fire|LB:fire AND DL%3.33|LB:fire",
"LB:fire|LB:fire|LB:fire",
],
};
elements.flameshockwave3 = {
color: "#c9c9c9",
category: "special",
behavior: [
"LB:fire|LB:fire|LB:fire AND M1",
"LB:fire|LB:fire AND DL%3.33|LB:fire",
"LB:fire|LB:fire|LB:fire",
],
};
elements.flameshockwave4 = {
color: "#c9c9c9",
category: "special",
behavior: [
"LB:fire|LB:fire|LB:fire",
"LB:fire AND M1|LB:fire AND DL%3.33|LB:fire",
"LB:fire|LB:fire|LB:fire",
],
};
elements.flameshockwave5 = {
color: "#c9c9c9",
category: "special",
behavior: [
"LB:fire|LB:fire|LB:fire",
"LB:fire|LB:fire AND DL%3.33|LB:fire AND M1",
"LB:fire|LB:fire|LB:fire",
],
};
elements.flameshockwave6 = {
color: "#c9c9c9",
category: "special",
behavior: [
"LB:fire|LB:fire|LB:fire",
"LB:fire|LB:fire AND DL%3.33|LB:fire",
"LB:fire AND M1|LB:fire|LB:fire",
],
};
elements.flameshockwave7 = {
color: "#c9c9c9",
category: "special",
behavior: [
"LB:fire|LB:fire|LB:fire",
"LB:fire|LB:fire AND DL%3.33|LB:fire",
"LB:fire|LB:fire AND M1|LB:fire",
],
};
elements.flameshockwave8 = {
color: "#c9c9c9",
category: "special",
behavior: [
"LB:fire|LB:fire|LB:fire",
"LB:fire|LB:fire AND DL%3.33|LB:fire",
"LB:fire|LB:fire|LB:fire AND M1",
],
};
elements.flamebomb = {
color: "#615f55",
category: "machines",
behavior: [
"CR:flameshockwave1|CR:flameshockwave2|CR:flameshockwave3",
"CR:flameshockwave4|DL%10|CR:flameshockwave5",
"CR:flameshockwave6 AND M2|CR:flameshockwave7 AND M1|CR:flameshockwave8 AND M2",
],
state: "solid"
};
elements.explosion5 = {
color: ["#ffb48f","#ffd991","#ffad91"],
category: "special",
state: "solid",
behavior: [
"CR:explosion4|CR:explosion4|CR:explosion4",
"CR:explosion4|DL|CR:explosion4",
"CR:explosion4|CR:explosion4|CR:explosion4",
],
};
elements.explosion4 = {
color: ["#ffb48f","#ffd991","#ffad91"],
category: "special",
state: "solid",
behavior: [
"CR:explosion3|CR:explosion3|CR:explosion3",
"CR:explosion3|DL|CR:explosion3",
"CR:explosion3|CR:explosion3|CR:explosion3",
],
};
elements.explosion3 = {
color: ["#ffb48f","#ffd991","#ffad91"],
category: "special",
state: "solid",
behavior: [
"CR:explosion|CR:explosion|CR:explosion",
"CR:explosion2|DL|CR:explosion2",
"CR:explosion2|CR:explosion2|CR:explosion2",
],
};
elements.explosion2 = {
color: ["#ffb48f","#ffd991","#ffad91"],
category: "special",
state: "solid",
behavior: [
"CR:explosion|CR:explosion|CR:explosion",
"CR:explosion|DL|CR:explosion",
"CR:explosion|CR:explosion|CR:explosion",
],
};
elements.explosion5explosion = {
color: ["#ffb48f","#ffd991","#ffad91"],
category: "special",
state: "solid",
behavior: [
"EX:10>explosion5|EX:10>explosion5|EX:10>explosion5",
"EX:10>explosion5|XX|EX:10>explosion5",
"EX:10>explosion5|EX:10>explosion5|EX:10>explosion5",
],
};
elements.carbon = {
color: "#424242",
category: "solids",
state: "solid",
behavior: behaviors.WALL,
burn: 5,
burnTime: 3000,
burnInto: ["carbon", "carbon_dioxide"],
stateHigh: "molten_carbon",
tempHigh: 3550,
};
elements.molten_carbon = {
color: ["#eda92b", "#f0af37", "#f5bb51", "#f5d151", "#fce697", "#fff4cf"],
category: "liquids",
state: "liquid",
behavior: behaviors.LIQUID,
stateLow: "carbon",
tempLow: 3550,
temp: 5000,
density: 1.2,
viscosity: 10000,
};
elements.titanium = {
color: "#e3e5e6",
category: "solids",
state: "solid",
behavior: behaviors.WALL,
stateHigh: "molten_titanium",
tempHigh: 1668,
conduct: 0.5,
};
elements.molten_titanium = {
color: ["#e0921d", "#e89e2e", "#f7b24a", "#fce168", "#fceca2", "#fffcf0"],
category: "liquids",
state: "liquid",
behavior: behaviors.LIQUID,
stateLow: "titanium",
tempLow: 1668,
temp: 2000,
viscosity: 10000
};
elements.laser_emitter = {
color: "#8a8886",
category: "machines",
state: "solid",
behavior: behaviors.LASEREMITTER
};
behaviors.LASEREMITTER = [
"CR:laser|CR:laser|CR:laser",
"CR:laser|XX|CR:laser",
"CR:laser|CR:laser|CR:laser",
];
elements.e_laser_emitter = {
color: "#8a8886",
colorOn: "#db5b0b",
category: "machines",
state: "solid",
behavior: behaviors.WALL,
behaviorOn: behaviors.LASEREMITTER,
conduct: 1,
};
elements.ilitium = {
color: "#97baa7",
category: "solids",
state: "solid",
behavior: [
"XX|M2%0.001|XX",
"M1%0.1|XX|M1%0.1",
"XX|M2%0.0015|XX",
],
};
elements.quartz = {
color: ["#f2f0e4", "#f7f7f2", "#bdb69f"],
category: "solids",
state: "solid",
behavior: behaviors.WALL,
tempHigh: 1715,
stateHigh: "molten_quartz"
};
elements.molten_quartz = {
color: ["#e0960b", "#edb92b", "#f7d748", "#ffe675", "#ede2af", "#fffdf2"],
category: "liquids",
state: "liquid",
behavior: behaviors.LIQUID,
tempLow: 1715,
stateLow: "quartz",
temp: 2000,
viscosity: 10000,
density: 2.65
};
elements.liquid_cloner = {
color: "#ffff00",
category: "special",
state: "liquid",
behavior: [
"CF|CF|CF",
"CF AND M2|XX|CF AND M2",
"CF AND M1|CF AND M1|CF AND M1",
],
density: 975,
};
elements.fire_cloner = {
color: "#ff8000",
category: "special",
state: "gas",
behavior: [
"CF AND HT%1 AND M1|CF AND HT%1|CF AND HT%1 AND M1",
"CF AND HT%1|HT%1|CF AND HT%1",
"CF AND HT%1|CF AND HT%1|CF AND HT%1",
],
};
elements.antigravity_powder_cloner = {
color: "#808000",
category: "special",
state: "powder",
behavior: [
"CF AND M2|CF AND M1|CF AND M2",
"CF|XX|CF",
"CF|CF|CF",
],
density: 1050,
};
elements.platinum = {
color: ["#cfdfe3", "#cfdfe3", "#f7f7f7", "#cfdfe3"],
category: "solids",
state: "solid",
behavior: behaviors.WALL,
tempHigh: 1768,
conduct: 1,
};
elements.uranium233 = {
name: "Uranium-233",
color: "#95a395",
category: "powders",
state: "solid",
behavior: behaviors.RADIOACTIVE_POWDER,
tempHigh: 1132,
stateHigh: "molten_uranium233",
density: 19,
};
elements.uranium235 = {
name: "Uranium-235",
color: "#7a997a",
category: "powders",
state: "solid",
behavior: [
"XX|XX|XX",
"XX|DL%0.02|XX",
"XX|XX|XX",
],
tempHigh: 1132.2,
stateHigh: "molten_uranium235",
density: 19.1,
};
elements.uranium238 = {
name: "Uranium-238",
color: "#4a754a",
category: "powders",
state: "solid",
behavior: [
"XX|XX|XX",
"XX|DL%0.01 AND CH:uranium235%0.05|XX",
"M2|M1|M2",
],
tempHigh: 1131,
stateHigh: "molten_uranium238",
density: 20,
};
/* Removed:
elements.butter = {
color: "#fcf1b1",
category: "food",
state: "solid",
behavior: ["XX|XX|XX","M2%5|XX|M2%5","M2|M1|M2"],
tempHigh: 38,
stateHigh: "molten_butter",
density: 911,
};
elements.molten_butter = {
color: "#f7e997",
category: "food",
state: "liquid",
behavior: behaviors.LIQUID,
tempLow: 38,
stateLow: "butter",
density: 910,
};
behaviors.GROW_PETALS = ["XX|CR:petal%5|XX", "CR:petal%5|XX|CR:petal%5", "XX|CR:petal%5|XX"]
elements.cactus_seed = {
color: "#2e5931",
category: "life",
state: "solid",
behavior: ["XX|M2%5|XX","CR:cactus%0.5|CH:cactus%0.01|CR:cactus%0.5","XX|M1,L2:cactus|XX"],
density: 1000,
tempHigh: 200,
stateHigh: ["steam", "nut"]
};
elements.sugar_cactus_seed = {
color: "#db9ed4",
category: "mythical",
state: "solid",
behavior: ["XX|M2%5|XX","CR:sugar_cactus%0.5|CH:sugar_cactus%0.01|CR:sugar_cactus%0.5","XX|M1,L2:sugar_cactus|XX"],
density: 1000,
stateHigh: ["caramel", "water"],
tempHigh: 150,
};
elements.cactus = {
color: "#2e5931",
category: "life",
state: "solid",
behavior: ["XX|XX|XX", "XX|CH:flowering_cactus%0.1|XX", "XX|XX|XX"],
tempHigh: 200,
stateHigh: ["steam", "wood"]
};
elements.sugar_cactus = {
color: "#db9ed4",
category: "mythical",
state: "solid",
behavior: ["XX|XX|XX", "XX|CH:flowering_sugar_cactus%0.1|XX", "XX|XX|XX"],
stateHigh: ["caramel", "water"],
tempHigh: 150,
};
elements.flowering_cactus = {
color: "#2f5a32",
category: "life",
state: "solid",
behavior: behaviors.GROW_PETALS,
tempHigh: 200,
stateHigh: ["steam", "wood"]
};
elements.flowering_sugar_cactus = {
color: "#dc9fd5",
category: "mythical",
state: "solid",
behavior: behaviors.GROW_PETALS,
tempHigh: 150,
stateHigh: ["caramel", "water"],
};
elements.nut = {
color: "#807353",
category: "food",
state: "solid",
behavior: behaviors.POWDER,
density: 500,
};
*/
/* Unfinished:
magnesium
hematite mixture
molten magnesium
silicon
molten silicon
silicon dioxide
*/
