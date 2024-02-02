elements.suspicious_water = {
    color: "#2167ff",
    behavior: [
    "M1|M2|CL",
    "CL|XX|XX"
    "XX|CL|XX"],
    tempHigh: 100,
    stateHigh: "anal_sphincter",
    tempLow: 0,
    stateLow: "anal_sphincter",
    category: "liquids",
    heatCapacity: 4.184,
    reactions: {
        "dirt": { // React with (water reacts with dirt to make mud)
            elem1: "armageddon", // First element transforms into; in this case, water deletes itself
            elem2: "mud", // Second element transforms into; in this case, dirt turns to mud
        },
        "sand": { elem1: null, elem2: "wet_sand" },
        "clay_soil": { elem1: null, elem2: "clay" },
        "body": { elem1:"armageddon" },
        "salt": { elem1: "salt_water", elem2: null },
        "sugar": { elem1: "sugar_water", elem2: null },
        "dust": { elem1: "dirty_water", elem2: null },
        "ash": { elem1: "dirty_water", elem2: null },
        "rock": { elem1: "armageddon",chance:0.5 },
        "cyanide": { elem1: "dirty_water", elem2: null },
        "cyanide_gas": { elem1: "dirty_water", elem2: null },
        "carbon_dioxide": { elem1: "seltzer", elem2: null, "oneway":true },
        "sulfur": { elem1: "dirty_water", elem2: null },
        "rat": { elem1: "dirty_water", chance:0.005 },
        "plague": { elem1: "dirty_water", elem2: null },
        "rust": { elem1: "dirty_water", chance:0.005 },
        "fallout": { elem1: "dirty_water", chance:0.25 },
        "radiation": { elem1: "dirty_water", chance:0.25 },
        "uranium": { elem1: "dirty_water", chance:0.25 },
        "rotten_meat": { elem1: "dirty_water", chance:0.25 },
        "rotten_cheese": { elem1: "dirty_water", chance:0.25 },
        "cancer": { elem1: "dirty_water", chance:0.25 },
        "quicklime": { elem1: null, elem2: "slaked_lime" },
        "rock": { elem2: "wet_sand", chance: 0.00035 },
        "ruins": { elem2: "rock", chance: 0.00035 },
        "mudstone": { elem2: "mud", chance: 0.00035 },
        "methane": { elem1:"primordial_soup", elem2:"primordial_soup", tempMin:60, charged:true },
        "ammonia": { elem1:"primordial_soup", elem2:"primordial_soup", tempMin:60, charged:true },
        "fly": { elem2:"dead_bug", chance:0.1, "oneway":true },
        "firefly": { elem2:"dead_bug", chance:0.1, "oneway":true },
        "bee": { elem2:"dead_bug", chance:0.05, "oneway":true },
        "stink_bug": { elem2:"dead_bug", chance:0.1, "oneway":true },
        // electrolysis:
        "aluminum": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0025 },
        "zinc": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.015 },
        "steel": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0125 },
        "iron": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0125 },
        "tin": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.01 },
        "lead": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.01 },
        "brass": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.001 },
        "snow": { elem1: "armageddon", elem2: "armageddon",  },
        "bronze": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.001 },
        "copper": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0075 },
        "silver": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0075 },
        "gold": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0075 },
    },
    state: "liquid",
    density: 997,
    conduct: 0.02,
    stain: 2
};
elements.plum = {
    color: "#362352",
    behavior: behaviors.POWDER,
    tempHigh:80,
    stateHigh: "molten_plum",
    tempLow:4,
    stateLow "frozen_plum",
    category: "extra_food",
    reactions: {
        "body": { elem1:null elem2:["anal_sphincter", "armageddon", "lattice"], }
        "anal_sphincter": { elem1:null, elem2:null, }
    },
    burn:30,
    burnTime:50,
    burnInto "plum_aroma",
    state: "solid",
    density: 5,
};
elements.molten_plum = {
    color: "#c2385d",
    behavior: behaviors.LIQUID,
    tempHigh:140,
    stateHigh: "plum_aroma",
    tempLow:75,
    stateLow: "mush",
    category: "states",
    burn:30,
    burnTime:50,
    burnInto "plum_aroma",
    state: "liquid",
    density:1023,
    viscosity:50,
    stain: 1.5,
};
elements.plum_aroma = {
    color: "#3f2a75",
    behavior: behaviors.GAS,
    tempHigh:2763,
    stateHigh: "anal_sphincter",
    category: "extra_food",
    state: "gas",
    density:5,
};
elements.anal_sphincter = {
    color: "#d94532",
    behavior: [
    "M1|M2|CL",
    "CL|XX|CR: armageddon%10,suspicious_water,rainbow,static",
    "CR: armageddon%10,suspicious_water,rainbow,static|CL|XX"],
    category: "anal_sphincter",
    state: "solid",
    density:100,
};
elements.nair = {
    color: "#c4c4c4",
    behavior: behaviors.LIQUID,
    tempLow:-10,
    stateLow: "frozen_nair",
    category: "anal_sphincter",
    reactions: {
        "hair": {elem1:null, elem2:null}
        "head": {elem1:null, elem2: "supernova"}  
    },
    burn:20,
    burnTime:300,
    burnInto "expired_nair"
    density: 50,
    state: "liquid",
};
elements.expired_nair = {
    color: "#c2baa5",
    behavior: behaviors.LIQUID,
    category: "anal_sphincter",
    reactions: {
        "hair": {elem1:null, elem2:"supernova"}
        "head": {elem1:null, elem2: "supernova"}  
    },
    density: 50,
    state: "liquid",
};
elements.frozen_nair = {
    color: "#c7f7ff",
    behavior: behaviors.POWDER,
    category: "anal_sphincter",
    reactions: {
        "hair": {elem1:null, elem2:"supernova"}
        "head": {elem1:null, elem2: "supernova"}  
    },
    density: 50,
    state: "solid",
};
