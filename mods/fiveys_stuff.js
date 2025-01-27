elements.r74n_solid = {
    color: "#00ffff",
    behavior: behaviors.WALL,
    name: "r74n",
    category: "r74n",
    state: "powder",
    density: 740,
};
elements.r74n_water = {
    hidden:false,
    color: "#009999",
    behavior: behaviors.LIQUID,
    category: "r74n",
    viscosity: 74,
    state: "liquid",
    density: 74,
};

elements.frosted_ice = {
    color: "#c3e2f0",
    behavior: behaviors.WALL,
    tempHigh: 5,
    stateHigh: "water",
    temp: -9,
    category: "solids",
    state: "solid",
    density: 1027,
};
elements.packed_ice = {
    color: "#d6ebf5",
    behavior: behaviors.WALL,
    tempHigh: 5,
    stateHigh: "solids",
    temp: -26,
    category: "ices",
    state: "solid",
    density: 1257,
};
elements.compressed_ice = {
    color: "#80bbfa",
    behavior: behaviors.WALL,
    tempHigh: 5,
    stateHigh: "compressed_water",
    temp: -79,
    category: "solids",
    state: "solid",
    density: 2007,
};
elements.blue_ice = {
    color: "#3f96f1",
    behavior: behaviors.WALL,
    tempHigh: 5,
    stateHigh: "blue_water",
    temp: -138,
    category: "solids",
    state: "solid",
    density: 2657,
};
elements.trench_ice = {
    color: "#0070e4",
    behavior: behaviors.WALL,
    tempHigh: 5,
    stateHigh: "trench_water",
    temp: -273,
    category: "solids",
    state: "solid",
    density: 3017,
};
elements.packed_water = {
    color: "#1361bf",
    behavior: behaviors.LIQUID,
    tempHigh: 100,
    stateHigh: "steam",
    tempLow: 0,
    stateLow: "packed_ice",
    category: "liquids",
    state: "solid",
    density: 1337,
};
elements.compressed_water = {
    color: "#144f96",
    behavior: behaviors.LIQUID,
    tempHigh: 100,
    stateHigh: "steam",
    tempLow: 0,
    stateLow: "compressed_ice",
    category: "ices",
    state: "liquid",
    density: 2087,
};
elements.blue_water = {
    color: "#01336f",
    behavior: behaviors.LIQUID,
    tempHigh: 100,
    stateHigh: "steam",
    tempLow: 0,
    stateLow: "blue_ice",
    category: "ices",
    state: "liquid",
    density: 2737,
};
elements.trench_water = {
    color: "#00254d",
    behavior: behaviors.LIQUID_OLD,
    tempHigh: 100,
    stateHigh: "steam",
    tempLow: 0,
    stateLow: "trench_ice",
    category: "ices",
    state: "liquid",
    density: 3097,
    viscosity: 1243893
}
//If you spot any bugs, let me know! - Fivey1777
