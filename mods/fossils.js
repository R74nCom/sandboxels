elements.fossil = {
    color: ["#bbb3ae","#b4b4b4","#c0c0c0"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2%75|M1|M2%75",
    ],
    reactions: {
        "water": {elem1: "wet_sand", chance: 0.00035},
        "salt_water": {elem1: "wet_sand", chance: 0.0005},
        "sugar_water": {elem1: "wet_sand", chance: 0.0004},
        "seltzer": {elem1: "wet_sand", chance: 0.0004},
        "dirty_water": {elem1: "wet_sand", chance: 0.0004},
        "soda": {elem1: "wet_sand", chance: 0.0004},
        "lichen": {elem1: "dirt", chance: 0.0025},
        "bone": {elem2: "fossil", chance: 0.000025},
        "bone_marrow": {elem2: "marrow_fossil", chance: 0.00002},
        "skull": {elem2: ["human_fossil","human_fossil","fossil"], chance: 0.000025},
        "wood": {elem2: "petrified_wood", chance: 0.000015},
        "tree_branch": {elem2: "petrified_wood", chance: 0.000015},
        "grape": {elem2: "juice", chance: 0.1, color2: "#291824"},
        "wheat": {elem2: "flour"},
        "primordial_soup": {elem1: "wet_sand", chance: 0.001}
    },
    tempHigh: 950,
    stateHigh: "magma",
    category: "life",
    state: "solid",
    density: 2600,
    hardness: 0.55,
    breakInto: ["rock","gravel","gravel","gravel","sand"],
};

elements.marrow_fossil = {
    color: ["#cbb2b3","#c1a8a8","#d0b0b0"],
    hidden:true,
    behavior: behaviors.SUPPORTPOWDER,
    reactions: {
        "water": {elem1: "wet_sand", chance: 0.00035},
        "salt_water": {elem1: "wet_sand", chance: 0.0005},
        "sugar_water": {elem1: "wet_sand", chance: 0.0004},
        "seltzer": {elem1: "wet_sand", chance: 0.0004},
        "dirty_water": {elem1: "wet_sand", chance: 0.0004},
        "soda": {elem1: "wet_sand", chance: 0.0004},
        "lichen": {elem1: "dirt", chance: 0.0025},
        "bone": {elem2: "fossil", chance: 0.000025},
        "bone_marrow": {elem2: "marrow_fossil", chance: 0.00002},
        "skull": {elem2: ["human_fossil","human_fossil","fossil"], chance: 0.000025},
        "wood": {elem2: "petrified_wood", chance: 0.000015},
        "tree_branch": {elem2: "petrified_wood", chance: 0.000015},
        "grape": {elem2: "juice", chance: 0.1, color2: "#291824"},
        "wheat": {elem2: "flour"},
        "primordial_soup": {elem1: "wet_sand", chance: 0.001}
    },
    tempHigh: 950,
    stateHigh: "magma",
    category: "life",
    state: "solid",
    density: 2550,
    hardness: 0.55,
    breakInto: ["rock","gravel","gravel","gravel","sand"],
};

elements.human_fossil = {
    color: ["#bbb3ae","#b4b4b4","#c0c0c0"],
    hidden:true,
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2%50|M1|M2%50",
    ],
    reactions: {
        "water": {elem1: "wet_sand", chance: 0.00035},
        "salt_water": {elem1: "wet_sand", chance: 0.0005},
        "sugar_water": {elem1: "wet_sand", chance: 0.0004},
        "seltzer": {elem1: "wet_sand", chance: 0.0004},
        "dirty_water": {elem1: "wet_sand", chance: 0.0004},
        "soda": {elem1: "wet_sand", chance: 0.0004},
        "lichen": {elem1: "dirt", chance: 0.0025},
        "bone": {elem2: "fossil", chance: 0.000025},
        "bone_marrow": {elem2: "marrow_fossil", chance: 0.00002},
        "skull": {elem2: ["human_fossil","human_fossil","fossil"], chance: 0.000025},
        "wood": {elem2: "petrified_wood", chance: 0.000015},
        "tree_branch": {elem2: "petrified_wood", chance: 0.000015},
        "grape": {elem2: "juice", chance: 0.1, color2: "#291824"},
        "wheat": {elem2: "flour"},
        "primordial_soup": {elem1: "wet_sand", chance: 0.001}
    },
    tempHigh: 950,
    stateHigh: "magma",
    category: "life",
    state: "solid",
    density: 2600,
    hardness: 0.55,
    breakInto: ["rock","gravel","gravel","gravel","sand"],
};

elements.petrified_wood = {
    color: ["#4e4e3e","#464646","#52533a"],
    hidden:true,
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "water": {elem1: "wet_sand", chance: 0.00035},
        "salt_water": {elem1: "wet_sand", chance: 0.0005},
        "sugar_water": {elem1: "wet_sand", chance: 0.0004},
        "seltzer": {elem1: "wet_sand", chance: 0.0004},
        "dirty_water": {elem1: "wet_sand", chance: 0.0004},
        "soda": {elem1: "wet_sand", chance: 0.0004},
        "lichen": {elem1: "dirt", chance: 0.0025},
        "bone": {elem2: "fossil", chance: 0.000025},
        "bone_marrow": {elem2: "marrow_fossil", chance: 0.00002},
        "skull": {elem2: ["human_fossil","human_fossil","fossil"], chance: 0.000025},
        "wood": {elem2: "petrified_wood", chance: 0.000015},
        "tree_branch": {elem2: "petrified_wood", chance: 0.000015},
        "grape": {elem2: "juice", chance: 0.1, color2: "#291824"},
        "wheat": {elem2: "flour"},
        "primordial_soup": {elem1: "wet_sand", chance: 0.001}
    },
    tempHigh: 950,
    stateHigh: "magma",
    category: "life",
    state: "solid",
    density: 2600,
    breakInto: ["rock","rock","gravel","gravel","gravel","gravel","gravel","sawdust"],
};

elements.skull = {
    color: "#d9d9d9",
    hidden:true,
    behavior: behaviors.SUPPORT,
    reactions: {
        "water": { elem2:"broth", tempMin:70, color2:"#d7db69" },
        "salt_water": { elem2:"broth", tempMin:70, color2:"#d7db69" },
        "sugar_water": { elem2:"broth", tempMin:70, color2:"#d7db69" },
        "seltzer": { elem2:"broth", tempMin:70, color2:"#d7db69" },
        "rock": { "elem1": "fossil", chance:0.00005 },
        "sand": { "elem1": "fossil", chance:0.000035 },
        "dirt": { "elem1": "fossil", chance:0.00003 },
        "tuff": { "elem1": "fossil", chance:0.00005 },
        "basalt": { "elem1": "fossil", chance:0.00004 },
        "mudstone": { "elem1": "fossil", chance:0.00004 },
        "packed_sand": { "elem1": "fossil", chance:0.00004 },
        "gravel": { "elem1": "fossil", chance:0.000035 },
        "clay": { "elem1": "fossil", chance:0.00003 },
        "clay_soil": { "elem1": "fossil", chance:0.00003 },
        "permafrost": { "elem1": "fossil", chance:0.000035 },
        "mulch": { "elem1": "fossil", chance:0.00003 },
        "ant_wall": { "elem1": "fossil", chance:0.00002 },
        "limestone": { "elem1": "fossil", chance:0.00005 },
        "quicklime": { "elem1": "fossil", chance:0.000045 },
        "slaked_lime": { "elem1": "fossil", chance:0.000035 },
    },
    category:"life",
    tempHigh: 760,
    stateHigh: "quicklime",
    state: "solid",
    density: 1500,
    hardness: 0.5,
    breakInto: ["quicklime","bone","bone","bone_marrow"]
},

elements.head.breakInto = ["blood","meat","skull"]

elements.dead_bug.breakInto = ["calcium","calcium","calcium","quicklime"]

elements.amber.breakInto = ["dna","dna","sap","sap","sap","sap","sap","dead_bug"]

elements.amber.tempHigh = 185

elements.amber.stateHigh = ["sap","sap","sap","calcium","sugar"]

if (!elements.bone.reactions) { elements.bone.reactions = {} }
    elements.bone.reactions.rock = { "elem1": "fossil", chance:0.00005 };
    elements.bone.reactions.sand = { "elem1": "fossil", chance:0.000035 };
    elements.bone.reactions.dirt = { "elem1": "fossil", chance:0.00003 };
    elements.bone.reactions.tuff = { "elem1": "fossil", chance:0.00005 };
    elements.bone.reactions.basalt = { "elem1": "fossil", chance:0.00004 };
    elements.bone.reactions.mudstone = { "elem1": "fossil", chance:0.00004 };
    elements.bone.reactions.packed_sand = { "elem1": "fossil", chance:0.00004 };
    elements.bone.reactions.gravel = { "elem1": "fossil", chance:0.000035 };
    elements.bone.reactions.clay = { "elem1": "fossil", chance:0.00003 };
    elements.bone.reactions.clay_soil = { "elem1": "fossil", chance:0.00003 };
    elements.bone.reactions.permafrost = { "elem1": "fossil", chance:0.000035 };
    elements.bone.reactions.mulch = { "elem1": "fossil", chance:0.00003 };
    elements.bone.reactions.ant_wall = { "elem1": "fossil", chance:0.00002 };
    elements.bone.reactions.limestone = { "elem1": "fossil", chance:0.00005 };
    elements.bone.reactions.quicklime = { "elem1": "fossil", chance:0.000045 };
    elements.bone.reactions.slaked_lime = { "elem1": "fossil", chance:0.000035 };


if (!elements.bone_marrow.reactions) { elements.bone_marrow.reactions = {} }
elements.bone_marrow.reactions.rock = { "elem1": "marrow_fossil", chance:0.00005 };
elements.bone_marrow.reactions.sand = { "elem1": "marrow_fossil", chance:0.000035 };
elements.bone_marrow.reactions.dirt = { "elem1": "marrow_fossil", chance:0.00003 };
elements.bone_marrow.reactions.tuff = { "elem1": "marrow_fossil", chance:0.00005 };
elements.bone_marrow.reactions.basalt = { "elem1": "marrow_fossil", chance:0.00004 };
elements.bone_marrow.reactions.mudstone = { "elem1": "marrow_fossil", chance:0.00004 };
elements.bone_marrow.reactions.packed_sand = { "elem1": "marrow_fossil", chance:0.00004 };
elements.bone_marrow.reactions.gravel = { "elem1": "marrow_fossil", chance:0.000035 };
elements.bone_marrow.reactions.clay = { "elem1": "marrow_fossil", chance:0.00003 };
elements.bone_marrow.reactions.clay_soil = { "elem1": "marrow_fossil", chance:0.00003 };
elements.bone_marrow.reactions.permafrost = { "elem1": "marrow_fossil", chance:0.000035 };
elements.bone_marrow.reactions.mulch = { "elem1": "marrow_fossil", chance:0.00003 };
elements.bone_marrow.reactions.ant_wall = { "elem1": "marrow_fossil", chance:0.00002 };
elements.bone_marrow.reactions.limestone = { "elem1": "marrow_fossil", chance:0.00005 };
elements.bone_marrow.reactions.quicklime = { "elem1": "marrow_fossil", chance:0.000045 };
elements.bone_marrow.reactions.slaked_lime = { "elem1": "marrow_fossil", chance:0.000035 };


if (!elements.wood.reactions) { elements.wood.reactions = {} }
elements.wood.reactions.rock = { "elem1": "petrified_wood", chance:0.000045 };
elements.wood.reactions.sand = { "elem1": "petrified_wood", chance:0.00003 };
elements.wood.reactions.dirt = { "elem1": "petrified_wood", chance:0.000025 };
elements.wood.reactions.tuff = { "elem1": "petrified_wood", chance:0.000045 };
elements.wood.reactions.basalt = { "elem1": "petrified_wood", chance:0.000035 };
elements.wood.reactions.mudstone = { "elem1": "petrified_wood", chance:0.000035 };
elements.wood.reactions.packed_sand = { "elem1": "petrified_wood", chance:0.000035 };
elements.wood.reactions.gravel = { "elem1": "petrified_wood", chance:0.00003 };
elements.wood.reactions.clay = { "elem1": "petrified_wood", chance:0.000025 };
elements.wood.reactions.clay_soil = { "elem1": "petrified_wood", chance:0.000025 };
elements.wood.reactions.permafrost = { "elem1": "petrified_wood", chance:0.00003 };
elements.wood.reactions.mulch = { "elem1": "petrified_wood", chance:0.000025 };
elements.wood.reactions.ant_wall = { "elem1": "petrified_wood", chance:0.000015 };
elements.wood.reactions.limestone = { "elem1": "petrified_wood", chance:0.000045 };
elements.wood.reactions.quicklime = { "elem1": "petrified_wood", chance:0.00004 };
elements.wood.reactions.slaked_lime = { "elem1": "petrified_wood", chance:0.00003 };


if (!elements.tree_branch.reactions) { elements.tree_branch.reactions = {} }
elements.tree_branch.reactions.rock = { "elem1": "petrified_wood", chance:0.00005 };
elements.tree_branch.reactions.sand = { "elem1": "petrified_wood", chance:0.000035 };
elements.tree_branch.reactions.dirt = { "elem1": "petrified_wood", chance:0.00003 };
elements.tree_branch.reactions.tuff = { "elem1": "petrified_wood", chance:0.00005 };
elements.tree_branch.reactions.basalt = { "elem1": "petrified_wood", chance:0.00004 };
elements.tree_branch.reactions.mudstone = { "elem1": "petrified_wood", chance:0.00004 };
elements.tree_branch.reactions.packed_sand = { "elem1": "petrified_wood", chance:0.00004 };
elements.tree_branch.reactions.gravel = { "elem1": "petrified_wood", chance:0.000035 };
elements.tree_branch.reactions.clay = { "elem1": "petrified_wood", chance:0.00003 };
elements.tree_branch.reactions.clay_soil = { "elem1": "petrified_wood", chance:0.00003 };
elements.tree_branch.reactions.permafrost = { "elem1": "petrified_wood", chance:0.000035 };
elements.tree_branch.reactions.mulch = { "elem1": "petrified_wood", chance:0.00003 };
elements.tree_branch.reactions.ant_wall = { "elem1": "petrified_wood", chance:0.00002 };
elements.tree_branch.reactions.limestone = { "elem1": "petrified_wood", chance:0.00005 };
elements.tree_branch.reactions.quicklime = { "elem1": "petrified_wood", chance:0.000045 };
elements.tree_branch.reactions.slaked_lime = { "elem1": "petrified_wood", chance:0.000035 };
