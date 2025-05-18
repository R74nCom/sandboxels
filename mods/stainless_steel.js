// obtaining chromite (makes chrome)
elements.magma.stateLow = ["rock", "basalt", "basalt", "basalt", "chromite"];

// chrome
elements.chromite = {
    color: ["#372d38", "#6e6e6e"],
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    tempHigh: 2180,
    stateHigh: "magma",
};

// stainless steel
elements.stainless_steel = {
    color: "#454545",
    behavior: behaviors.WALL,
    state: "solid",
    category: "solids",
    tempHigh: 1510,
};

// chrome
elements.chrome = {
    color: "#c4c4c4",
    behavior: behaviors.WALL,
    state: "solid",
    category: "solids",
    tempHigh: 1900,
    reactions: {
        "molten_steel": { elem2:"molten_stainless_steel", tempMin:1800, tempMax:2000 }
    },
    alias: "chromium",
};

// obtaining chrome (makes stainless steel)
elements.molten_aluminum.reactions.chromite = { elem2:"chrome", tempMin:1000, tempMax:1200, chance:0.1 };

// bauxite (makes aluminum)
elements.bauxite = {
    color: ["#c4ad9d","#996644"],
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    tempHigh: 2072,
    breakInto: "crushed_bauxite",
};

// obtaining caustic soda
elements.salt_water.reactions.copper = { elem1:["hydrogen","hydrogen","oxygen","chlorine","caustic_soda"], charged:true, chance:0.0075 };
elements.salt_water.reactions.zinc = { elem1:["hydrogen","hydrogen","oxygen","chlorine","caustic_soda"], charged:true, chance:0.015 };
elements.salt_water.reactions.steel = { elem1:["hydrogen","hydrogen","oxygen","chlorine","caustic_soda"], charged:true, chance:0.0125 };
elements.salt_water.reactions.aluminum = { elem1:["hydrogen","hydrogen","oxygen","chlorine","caustic_soda"], charged:true, chance:0.0025 };
elements.salt_water.reactions.iron = { elem1:["hydrogen","hydrogen","oxygen","chlorine","caustic_soda"], charged:true, chance:0.0125 };
elements.salt_water.reactions.tin = { elem1:["hydrogen","hydrogen","oxygen","chlorine","caustic_soda"], charged:true, chance:0.1 };
elements.salt_water.reactions.brass = { elem1:["hydrogen","hydrogen","oxygen","chlorine","caustic_soda"], charged:true, chance:0.001 };
elements.salt_water.reactions.bronze = { elem1:["hydrogen","hydrogen","oxygen","chlorine","caustic_soda"], charged:true, chance:0.001 };
elements.salt_water.reactions.silver = { elem1:["hydrogen","hydrogen","oxygen","chlorine","caustic_soda"], charged:true, chance:0.0075 };
elements.salt_water.reactions.gold = { elem1:["hydrogen","hydrogen","oxygen","chlorine","caustic_soda"], charged:true, chance:0.0075 };      

// soda lime
elements.soda_lime = {
    color: "#dcdcdc",
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    reactions: {
        "crushed_bauxite": { elem1:"alumina", chance:50 }
    },
    alias: "calcium hydroxide",
};

// alumina
elements.alumina = {
    color: "#c3d4c3",
    behavior: behaviors.WALL,
    state: "solid",
    category: "solids", 
    tempHigh: 2072,
    stateHigh: "molten_aluminum",
    conduct: 1,
    alias: "aluminum oxide",
};

// uh
elements.aluminum.alias = "aluminium";

// caustic soda
elements.caustic_soda = {
    color: "#ececec",
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    reactions: {
        "quicklime": { elem1:"soda_lime" }
    },
    alias: "sodium hydroxide",
    denisity: 3000,
    tempHigh: 318,
};

// crushed bauxite (part of the process)
elements.crushed_bauxite = {
    color: ["#a28e7b","#774422"],
    behavior: behaviors.POWDER,
    category: "powders",
    tempHigh: 2072,
    stateHigh: "molten_bauxite",
};

// Makes Chrome and Stainless Steel more expensive on survival.js
if (enabledMods.includes("mods/survival.js")) {
    runAfterLoad(function() {
        elementWorth.chrome = 2;
        elementWorth.stainless_steel = 5;
    });
};

// Obtaining Bauxite (ores.js only)
if (enabledMods.includes("mods/ores.js")) {
    runAfterLoad(function() {
        eLists.oreSpawnConditions.bauxite = 0.38;
        eLists.oreRgb.bauxite = "rgba(140, 109, 88, ";
        eLists.idealOreHeight.bauxite = 0.2;
    });
};
