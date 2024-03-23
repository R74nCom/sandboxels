// changelog

// 1.0 update - the base update
// added seasoning
// added seasoned_water

// 1.1 update - soup update
// adds soup
// changed seasoning to a SUPPORT behaviour
// seasoned water at high temp is soup
// changed seasoning density

elements.seasoning = {
    color: "#876461",
    behavior: behaviors.SUPPORT,
    category: "food",
    tempHigh: 9000,
    stateHigh: "ash",
    state: "solid",
    reactions: {
        "water": { elem1: "seasoned_water", elem2: "null" },
        "salt_water": { elem1: "seasoned_water", elem2: "null" },
    },
    density: 3000,
};

elements.seasoned_water = {
    color: "#73d627",
    behavior: behaviors.LIQUID,
    tempHigh: 100,
    stateHigh: "soup",
    tempLow: 0,
    stateLow: "ice",
    category: "liquids",
    heatCapacity: 4.184,
    reactions: {
        "dirt": { 
            elem1: null, 
            elem2: "mud",
        },
        "sand": { elem1: null, elem2: "wet_sand" },
        "clay_soil": { elem1: null, elem2: "clay" },
        "salt": { elem1: "salt_water", elem2: null, temp1:-20 },
        "sugar": { elem1: "sugar_water", elem2: null },
        "honey": { elem1: "sugar_water" },
        "caramel": { elem1: "sugar_water" },
        "molasses": { elem1: "sugar_water" },
        "dust": { elem1: "dirty_water", elem2: null },
        "ash": { elem1: "dirty_water", elem2: null },
        "cyanide": { elem1: "dirty_water", elem2: null },
        "cyanide_gas": { elem1: "dirty_water", elem2: null },
        "carbon_dioxide": { elem1: "seltzer", elem2: null, oneway:true },
        "sulfur": { elem1: "dirty_water", elem2: null },
        "rat": { elem1: "dirty_water", chance:0.005 },
        "plague": { elem1: "dirty_water", elem2: null },
        "rust": { elem1: "dirty_water", chance:0.005 },
        "lead": { elem1: "dirty_water", chance:0.005 },
        "solder": { elem1: "dirty_water", chance:0.005 },
        "fallout": { elem1: "dirty_water", chance:0.25 },
        "radiation": { elem1: "dirty_water", chance:0.25 },
        "uranium": { elem1: "dirty_water", chance:0.25 },
        "rotten_meat": { elem1: "dirty_water", chance:0.25 },
        "rotten_cheese": { elem1: "dirty_water", chance:0.25 },
        "cancer": { elem1: "dirty_water", chance:0.25 },
        "oil": { elem1: "dirty_water", chance:0.005 },
        "dioxin": { elem1: "dirty_water", chance:0.1 },
        "quicklime": { elem1: "slaked_lime", elem2: "slaked_lime", temp2:100, temp1:100, chance:0.05 },
        "rock": { elem2: "wet_sand", chance: 0.00035 },
        "limestone": { elem2: "wet_sand", chance: 0.00035 },
        "tuff": { elem2: "wet_sand", color2:"#7a6b5c", chance: 0.00035 },
        "ruins": { elem2: "rock", chance: 0.00035 },
        "mudstone": { elem2: "mud", chance: 0.00035 },
        "methane": { elem1:"primordial_soup", elem2:"primordial_soup", tempMin:60, charged:true },
        "ammonia": { elem1:"primordial_soup", elem2:"primordial_soup", tempMin:60, charged:true },
        "fly": { elem2:"dead_bug", chance:0.1, oneway:true },
        "firefly": { elem2:"dead_bug", chance:0.1, oneway:true },
        "bee": { elem2:"dead_bug", chance:0.05, oneway:true },
        "stink_bug": { elem2:"dead_bug", chance:0.1, oneway:true },
        "cured_meat": { elem1:"salt_water", elem2:"meat" },
        "aluminum": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0025 },
        "zinc": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.015 },
        "steel": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0125 },
        "iron": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0125 },
        "tin": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.01 },
        "brass": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.001 },
        "bronze": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.001 },
        "copper": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0075 },
        "silver": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0075 },
        "gold": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0075 },
    },
    state: "liquid",
    density: 999,
    conduct: 0.02,
    stain: -0.9,
    extinguish: true
};

elements.soup = {
	color: "#e8c238",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
    density: 7000,
};
