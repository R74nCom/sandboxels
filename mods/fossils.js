/* code by nekonico aka doobienecoarc */

worldgentypes.prehistory = {
                layers: [
                    [1.00, "grass"],
                    [0.10, "dirt"],
                    [0.02, "rock"],
                    [0, "basalt"],
                ],
                decor: [
                    ["dinosaur", 0.1, 10],
                    ["pinecone", 0.075],
                    ["bird", 0.025, 5],
                ],
                baseHeight: 0.5
},

elements.fossil = {
    color: ["#bbb3ae","#b4b4b4","#c0c0c0"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2%75|M1|M2%75",
    ],
    reactions: {
        "water": {elem1: ["wet_sand","fossil_sand"], chance: 0.00035},
        "salt_water": {elem1: ["wet_sand","fossil_sand"], chance: 0.0005},
        "sugar_water": {elem1: ["wet_sand","fossil_sand"], chance: 0.0004},
        "seltzer": {elem1: ["wet_sand","fossil_sand"], chance: 0.0004},
        "dirty_water": {elem1: ["wet_sand","fossil_sand"], chance: 0.0004},
        "soda": {elem1: ["wet_sand","fossil_sand"], chance: 0.0004},
        "lichen": {elem1: "dirt", chance: 0.0025},
        "bone": {elem2: "fossil", chance: 0.000025},
        "bone_marrow": {elem2: "marrow_fossil", chance: 0.00002},
        "skull": {elem2: ["human_fossil","human_fossil","fossil"], chance: 0.000025},
        "wood": {elem2: "petrified_wood", chance: 0.000015},
        "tree_branch": {elem2: "petrified_wood", chance: 0.000015},
        "grape": {elem2: "juice", chance: 0.1, color2: "#291824"},
        "wheat": {elem2: "flour"},
        "primordial_soup": {elem1: ["wet_sand","fossil_sand"], chance: 0.001}
    },
    tempHigh: 950,
    stateHigh: "magma",
    category: "life",
    state: "solid",
    density: 2600,
    hardness: 0.55,
    breakInto: ["rock","gravel","gravel","gravel","sand"],
};

elements.fossil_sand = {
    color: ["#bbb3ae","#b4b4b4","#c0c0c0"],
    behavior: behaviors.POWDER,
    reactions: {
        "water": {elem1: "wet_sand", chance: 0.00035},
        "salt_water": {elem1: "wet_sand", chance: 0.0005},
        "sugar_water": {elem1: "wet_sand", chance: 0.0004},
        "seltzer": {elem1: "wet_sand", chance: 0.0004},
        "dirty_water": {elem1: "wet_sand", chance: 0.0004},
        "soda": {elem1: "wet_sand", chance: 0.0004},
        "bone": {elem2: "fossil", chance: 0.0000025},
        "bone_marrow": {elem2: "marrow_fossil", chance: 0.000002},
        "skull": {elem2: ["human_fossil","human_fossil","fossil"], chance: 0.0000025},
        "wood": {elem2: "petrified_wood", chance: 0.0000015},
        "tree_branch": {elem2: "petrified_wood", chance: 0.0000015},
        "primordial_soup": {elem1: "wet_sand", chance: 0.001}
    },
    tempHigh: 1700,
    stateHigh: "molten_glass",
    category: "land",
    state: "solid",
    density: 2000,
    breakInto: ["gravel","gravel","sand"],
};

elements.marrow_fossil = {
    color: ["#cbb2b3","#c1a8a8","#d0b0b0"],
    hidden:true,
    behavior: behaviors.SUPPORTPOWDER,
    reactions: {
        "water": {elem1: ["wet_sand","fossil_sand"], chance: 0.00035},
        "salt_water": {elem1: ["wet_sand","fossil_sand"], chance: 0.0005},
        "sugar_water": {elem1: ["wet_sand","fossil_sand"], chance: 0.0004},
        "seltzer": {elem1: ["wet_sand","fossil_sand"], chance: 0.0004},
        "dirty_water": {elem1: ["wet_sand","fossil_sand"], chance: 0.0004},
        "soda": {elem1: ["wet_sand","fossil_sand"], chance: 0.0004},
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
    properties: {
        dna: "human",
    },
    name: "fossil",
    color: ["#bbb3ae","#b4b4b4","#c0c0c0"],
    hidden:true,
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2%50|M1|M2%50",
    ],
    reactions: {
        "water": {elem1: ["wet_sand","fossil_sand"], chance: 0.00035},
        "salt_water": {elem1: ["wet_sand","fossil_sand"], chance: 0.0005},
        "sugar_water": {elem1: ["wet_sand","fossil_sand"], chance: 0.0004},
        "seltzer": {elem1: ["wet_sand","fossil_sand"], chance: 0.0004},
        "dirty_water": {elem1: ["wet_sand","fossil_sand"], chance: 0.0004},
        "soda": {elem1: ["wet_sand","fossil_sand"], chance: 0.0004},
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

elements.dino_fossil = {
    properties: {
        dna: "dinosaur",
    },
    name: "fossil",
    color: ["#bbb3ae","#b4b4b4","#c0c0c0"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2%75|M1|M2%75",
    ],
    reactions: {
        "water": {elem1: ["wet_sand","fossil_sand"], chance: 0.00035},
        "salt_water": {elem1: ["wet_sand","fossil_sand"], chance: 0.0005},
        "sugar_water": {elem1: ["wet_sand","fossil_sand"], chance: 0.0004},
        "seltzer": {elem1: ["wet_sand","fossil_sand"], chance: 0.0004},
        "dirty_water": {elem1: ["wet_sand","fossil_sand"], chance: 0.0004},
        "soda": {elem1: ["wet_sand","fossil_sand"], chance: 0.0004},
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
    properties: {
        dna: "sapling",
    },
    color: ["#4e4e3e","#464646","#52533a"],
    hidden:true,
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "water": {elem1: ["wet_sand","fossil_sand"], chance: 0.00035},
        "salt_water": {elem1: ["wet_sand","fossil_sand"], chance: 0.0005},
        "sugar_water": {elem1: ["wet_sand","fossil_sand"], chance: 0.0004},
        "seltzer": {elem1: ["wet_sand","fossil_sand"], chance: 0.0004},
        "dirty_water": {elem1: ["wet_sand","fossil_sand"], chance: 0.0004},
        "soda": {elem1: ["wet_sand","fossil_sand"], chance: 0.0004},
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
    properties: {
        dna: "human",
    },
    color: "#d9d9d9",
    hidden:true,
    behavior: behaviors.POWDER,
    reactions: {
        "water": { elem2:"broth", tempMin:70, color2:"#d7db69" },
        "salt_water": { elem2:"broth", tempMin:70, color2:"#d7db69" },
        "sugar_water": { elem2:"broth", tempMin:70, color2:"#d7db69" },
        "seltzer": { elem2:"broth", tempMin:70, color2:"#d7db69" },
        "rock": { "elem1": "human_fossil", chance:0.00005 },
        "sand": { "elem1": "human_fossil", chance:0.000035 },
        "dirt": { "elem1": "human_fossil", chance:0.00003 },
        "tuff": { "elem1": "human_fossil", chance:0.00005 },
        "basalt": { "elem1": "human_fossil", chance:0.00004 },
        "mudstone": { "elem1": "human_fossil", chance:0.00004 },
        "packed_sand": { "elem1": "human_fossil", chance:0.00004 },
        "gravel": { "elem1": "human_fossil", chance:0.000035 },
        "clay": { "elem1": "human_fossil", chance:0.00003 },
        "clay_soil": { "elem1": "human_fossil", chance:0.00003 },
        "permafrost": { "elem1": "human_fossil", chance:0.000035 },
        "mulch": { "elem1": "human_fossil", chance:0.00003 },
        "ant_wall": { "elem1": "human_fossil", chance:0.00002 },
        "limestone": { "elem1": "human_fossil", chance:0.00005 },
        "quicklime": { "elem1": "human_fossil", chance:0.000045 },
        "slaked_lime": { "elem1": "human_fossil", chance:0.000035 },
    },
    category:"life",
    tempHigh: 760,
    stateHigh: "quicklime",
    state: "solid",
    density: 1000,
    hardness: 0.5,
    breakInto: ["quicklime","bone","human_bones","bone_marrow"]
},

elements.human_bones = {
    properties: {
        dna: "human",
    },
    name: "bone",
    color: "#d9d9d9",
    hidden:true,
    behavior: behaviors.SUPPORT,
    reactions: {
        "water": { elem2:"broth", tempMin:70, color2:"#d7db69" },
        "salt_water": { elem2:"broth", tempMin:70, color2:"#d7db69" },
        "sugar_water": { elem2:"broth", tempMin:70, color2:"#d7db69" },
        "seltzer": { elem2:"broth", tempMin:70, color2:"#d7db69" },
        "rock": { "elem1": "human_fossil", chance:0.00005 },
        "sand": { "elem1": "human_fossil", chance:0.000035 },
        "dirt": { "elem1": "human_fossil", chance:0.00003 },
        "tuff": { "elem1": "human_fossil", chance:0.00005 },
        "basalt": { "elem1": "human_fossil", chance:0.00004 },
        "mudstone": { "elem1": "human_fossil", chance:0.00004 },
        "packed_sand": { "elem1": "human_fossil", chance:0.00004 },
        "gravel": { "elem1": "human_fossil", chance:0.000035 },
        "clay": { "elem1": "human_fossil", chance:0.00003 },
        "clay_soil": { "elem1": "human_fossil", chance:0.00003 },
        "permafrost": { "elem1": "human_fossil", chance:0.000035 },
        "mulch": { "elem1": "human_fossil", chance:0.00003 },
        "ant_wall": { "elem1": "human_fossil", chance:0.00002 },
        "limestone": { "elem1": "human_fossil", chance:0.00005 },
        "quicklime": { "elem1": "human_fossil", chance:0.000045 },
        "slaked_lime": { "elem1": "human_fossil", chance:0.000035 },
    },
    category:"life",
    tempHigh: 760,
    stateHigh: "quicklime",
    state: "solid",
    density: 1000,
    hardness: 0.5,
    breakInto: ["quicklime","bone","bone","bone_marrow"]
},

elements.dino_bones = {
    properties: {
        dna: "dinosaur",
    },
    name: "bone",
    color: "#d9d9d9",
    hidden:true,
    behavior: behaviors.SUPPORT,
    reactions: {
        "water": { elem2:"broth", tempMin:70 },
        "salt_water": { elem2:"broth", tempMin:70 },
        "sugar_water": { elem2:"broth", tempMin:70 },
        "seltzer": { elem2:"broth", tempMin:70 },
        "rock": { "elem1": "dino_fossil", chance:0.00005 },
        "sand": { "elem1": "dino_fossil", chance:0.000035 },
        "dirt": { "elem1": "dino_fossil", chance:0.00003 },
        "tuff": { "elem1": "dino_fossil", chance:0.00005 },
        "basalt": { "elem1": "dino_fossil", chance:0.00004 },
        "mudstone": { "elem1": "dino_fossil", chance:0.00004 },
        "packed_sand": { "elem1": "dino_fossil", chance:0.00004 },
        "gravel": { "elem1": "dino_fossil", chance:0.000035 },
        "clay": { "elem1": "dino_fossil", chance:0.00003 },
        "clay_soil": { "elem1": "dino_fossil", chance:0.00003 },
        "permafrost": { "elem1": "dino_fossil", chance:0.000035 },
        "mulch": { "elem1": "dino_fossil", chance:0.00003 },
        "ant_wall": { "elem1": "dino_fossil", chance:0.00002 },
        "limestone": { "elem1": "dino_fossil", chance:0.00005 },
        "quicklime": { "elem1": "dino_fossil", chance:0.000045 },
        "slaked_lime": { "elem1": "dino_fossil", chance:0.000035 },
    },
    category:"life",
    tempHigh: 760,
    stateHigh: "quicklime",
    state: "solid",
    density: 1500,
    hardness: 0.5,
    breakInto: ["quicklime","bone","bone","bone_marrow"]
},

elements.coal = {
    color: "#2b2b2b",
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "water": { elem2:"dirty_water", chance:0.02 },
        "salt_water": { elem2:"dirty_water", chance:0.02 },
        "sugar_water": { elem2:"dirty_water", chance:0.02 },
        "seltzer": { elem2:"dirty_water", chance:0.02 },
        "dead_plant": { elem2:"coal", tempMin:200, chance:0.005, oneway:true },
        "wood": { elem2:["coal","coal","charcoal"], tempMin:280, chance:0.005, oneway:true },
        "tree_branch": { elem2:["coal","coal","charcoal"], tempMin:280, chance:0.005, oneway:true },
        "charcoal": { elem2:"coal", tempMin:200, chance:0.005, oneway:true },
    },
    burn: 28,
    burnTime: 1000,
    burnInto: ["fire","fire","fire","fire","dust","carbon_dioxide"],
    tempHigh: 6000,
    stateHigh: "fire",
    category: "powders",
    state: "solid",
    density: 250,
    breakInto: ["dust","ash","carbon_dioxide"],
    hardness: 0.5,
},

elements.bug_amber = {
    hidden:true,
    name: "amber",
    color: ["#ffc000","#b67f18","#c86305","#cf7a19","#e4ae3a"],
    temp: 20,
    tempHigh: 345,
    stateHigh: ["smoke","sap","sap","dead_bug","sap"],
    breakInto: [null,null,null,"dna","dna","sap","sap","sap","sap","sap","dead_bug"],
    category: "solids"
},

elements.hive_amber = {
    hidden:true,
    properties: {
        dna: "bee",
    },
    name: "amber",
    color: "#ffc000",
    temp: 20,
    tempHigh: 345,
    stateHigh: ["smoke","smoke","honey","honey","honey","dead_bug","dead_bug","sap"],
    breakInto: [null,"dna","dna","honey","honey","honey","honey","honey","sap","dead_bug",null,"dna","dna","honey","honey","honey","honey","honey","sap","dead_bug","bee"],
    category: "solids"
},

elements.dinosaur = {
    hidden:true,
    properties: {
        dna: "dinosaur",
    },
    color: ["#7F2B0A","#808080","#006400"],
    behavior: [
        "XX|M2%5|XX",
        "M2%10|XX|M2%20 AND BO",
        "M2%5|M1|M2%15",
    ],
    tempHigh: 225,
    stateHigh: ["cooked_meat","cooked_meat","ash","dino_bones"],
    tempLow: -35,
    stateLow: ["frozen_meat","frozen_meat","dino_bones","dino_bones"],
    breakInto: ["blood","blood","meat","meat","dino_bones","blood","blood","meat","meat","dino_bones","feather"],
    category: "life",
    burn: 75,
    burnTime: 30,
    burnInto: ["cooked_meat","cooked_meat","ash","dino_bones"],
    state: "solid",
    density: 1500,
    conduct: 0.25,
    reactions: {
        "bird": { elem2: [null,null,null,null,null,null,"blood","feather"], chance: 0.3, func: behaviors.FEEDPIXEL },
        "head": { elem2: [null,null,null,null,null,null,null,"blood","blood","skull"], chance: 0.5, func: behaviors.FEEDPIXEL },
        "body": { elem2: [null,null,null,null,null,null,"blood","blood","bone"], chance: 0.5, func: behaviors.FEEDPIXEL },
        "plant": { elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL },
        "bone": { elem2: ["bone_marrow","blood","quicklime",null,null,null], chance: 0.3, },
        "skull": { elem2: ["bone_marrow","blood","quicklime",null,null,null], chance: 0.1, },
        "bone_marrow": { elem2: ["blood","blood",null], chance: 0.3, func: behaviors.FEEDPIXEL },attr1:{"dna":"snail"},
        "blood": { elem2: null, chance: 0.01, func: behaviors.FEEDPIXEL },
        "meat": { elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL },
        "cooked_meat": { elem2: null, chance: 0.4, func: behaviors.FEEDPIXEL },
        "cured_meat": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
        "fly": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
        "ant": { elem2: [null,null,null,null,null,null,"dead_bug"], chance: 0.05, func: behaviors.FEEDPIXEL },
        "worm": { elem2: [null,null,null,null,null,null,"slime"], chance: 0.05, func: behaviors.FEEDPIXEL },
        "glass": { elem2: "glass_shard", chance: 0.05 },
        "concrete": { elem2: "dust", chance: 0.03 },
    },
},

elements.trilobite = {
    hidden:true,
    properties: {
        dna: "trilobite",
    },
    color: "#808080",
    behavior: [
        "XX|M2%5|SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%05",
        "XX|FX%0.5|M2%50 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%10 AND BO",
        "M2%50|M1|M2%50 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%10",
    ],
    reactions: {
        "algae": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "kelp": { elem2:"water", chance:0.25 },
        "plant": { elem2:null, chance:0.125, func:behaviors.FEEDPIXEL },
        "fly": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "firefly": { elem2:null, chance:0.6, func:behaviors.FEEDPIXEL },
        "worm": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "tadpole": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.5 },
        "broth": { elem2:"water", chance:0.2, func:behaviors.FEEDPIXEL },
        "slug": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "herb": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "lettuce": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "dead_plant": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "lichen": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "yeast": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "yogurt": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "tea": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "yolk": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "cell": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "crumb": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "alcohol": { elem1:"dead_bug", attr1:{"dna":"trilobite"}, chance:0.001 },
        "water": { elem2:"bubble", attr2:{"clone":"water"}, chance:0.002, oneway:true },
        "salt_water": { elem2:"bubble", attr2:{"clone":"salt_water"}, chance:0.002, oneway:true },
        "pool_water": { elem1:"dead_bug", chance:0.001 },
        "chlorine": { elem1:"dead_bug", chance:0.1 },
        "vinegar": { elem1:"dead_bug", chance:0.001 },
    },
    foodNeed: 10,
    temp: 20,
    tempHigh: 150,
    stateHigh: "meat",
    tempLow: -20,
    stateLow: ["dead_bug","frozen_meat"],
    category:"life",
    breakInto: ["dead_bug","blood"],
    burn:25,
    burnTime:250,
    state: "solid",
    density: 1080,
    conduct: 0.2,
    eggColor: ["#211316","#2C1A1D","#503734"]
},

elements.extracted_dna = {
    hidden:true,
    name: "artificial_egg",
    color: ["#211316","#2C1A1D","#503734","#e0d3ab"],
    behavior: behaviors.POWDER,
    tick: function(pixel) {
        if (Math.random() < 0.00025 || (pixel.dna && pixel.temp > 40 && pixel.temp < 150)) {
            if (pixel.dna) {
                changePixel(pixel,pixel.dna);
            }
            else changePixel(pixel,"cell")
        }
    },
    innerColor: "#ffffff",
    tempHigh: 1200,
    stateHigh: ["steam","dna","calcium","carbon_dioxide","sulfur_gas"],
    breakInto: ["yolk","yolk","dna","cell"],
    category:"life",
    conduct: 1,
};

elements.extractor = {
    name: "dna-extractor",
    color: ["#d1c6be","#b5c0ad","#b9b8bc"],
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "fossil": { elem2:"extracted_dna", chance:0.05 },
        "marrow_fossil": { elem2:"extracted_dna", chance:0.06 },
        "petrified_wood": { elem2:"extracted_dna", attr2:{"dna":"sapling"}, chance:0.01 },
        "wood": { elem2:"extracted_dna", attr2:{"dna":"sapling"}, chance:0.05 },
        "bone_marrow": { elem2:"extracted_dna", chance:0.1 },
        "bone": { elem2:"extracted_dna", chance:0.1 },
        "meat": { elem2:"extracted_dna", chance:0.1 },
        "frozen_meat": { elem2:"extracted_dna", chance:0.1 },
        "cooked_meat": { elem2:"extracted_dna", chance:0.1 },
        "rotten_meat": { elem2:"extracted_dna", chance:0.05 },
        "blood": { elem2:"extracted_dna", chance:0.1 },
        "slime": { elem2:"extracted_dna", chance:0.05 },
        "dead_bug": { elem2:"extracted_dna", chance:0.2 },
        "hive_amber": { elem2:"extracted_dna", chance:0.2 },
        "bug_amber": { elem2:"extracted_dna", chance:0.2 },
        "dino_bones": { elem2:"extracted_dna", attr2:{"dna":"dinosaur"}, chance:0.2 },
        "skull": { elem2:"extracted_dna", attr2:{"dna":"human"}, chance:0.2 },
        "dino_fossil": { elem2:"extracted_dna", attr2:{"dna":"dinosaur"}, chance:0.02 },
        "human_fossil": { elem2:"extracted_dna", attr2:{"dna":"human"}, chance:0.02 },
    },
    category:"machines",
    conduct: 1,
    hardness: 1,
};

elements.head.breakInto = ["blood","meat","human_bones","skull"]

elements.head.burnInto = ["ash","cooked_meat","human_bones","skull","skull"]

elements.head.stateHigh = ["cooked_meat","human_bones","skull","skull"]

elements.head.stateLow = ["frozen_meat","human_bones","skull","skull","skull"]

elements.body.breakInto = ["blood","meat","human_bones","bone"]

elements.body.burnInto = ["ash","cooked_meat","human_bones"]

elements.body.stateHigh = ["cooked_meat","human_bones"]

elements.body.stateLow = ["frozen_meat","human_bones","human_bones"]

elements.dead_bug.breakInto = ["calcium","calcium","calcium","quicklime"]

if (!elements.sap.reactions) { elements.sap.reactions = {} }
    elements.sap.reactions.dead_bug = { elem1:"bug_amber", elem2:null, chance:0.1 };
    elements.sap.reactions.hive = { elem1:null, elem2:"hive_amber", attr2:{"dna":"bee"}, chance:0.01 };
    elements.sap.reactions.ant = { elem1:"bug_amber", attr1:{"dna":"ant"}, elem2:null, chance:0.1 };
    elements.sap.reactions.fly = { elem1:"bug_amber", attr1:{"dna":"fly"}, elem2:null, chance:0.1 };
    elements.sap.reactions.flea = { elem1:"bug_amber", attr1:{"dna":"flea"}, elem2:null, chance:0.1 };
    elements.sap.reactions.termite = { elem1:"bug_amber", attr1:{"dna":"termite"}, elem2:null, chance:0.1 };
    elements.sap.reactions.worm = { elem1:"bug_amber", attr1:{"dna":"worm"}, elem2:null, chance:0.1 };
    elements.sap.reactions.bee = { elem1:"bug_amber", attr1:{"dna":"bee"}, elem2:null, chance:0.1 };
    elements.sap.reactions.firefly = { elem1:"bug_amber", attr1:{"dna":"firefly"}, elem2:null, chance:0.1 };
    elements.sap.reactions.stinkbug = { elem1:"bug_amber", attr1:{"dna":"stinkbug"}, elem2:null, chance:0.1 };
    elements.sap.reactions.slug = { elem1:"bug_amber", attr1:{"dna":"slug"}, elem2:null, chance:0.08 };
    elements.sap.reactions.snail = { elem1:"bug_amber", attr1:{"dna":"snail"}, elem2:null, chance:0.05 };
    elements.sap.reactions.trilobite = { elem1:"bug_amber", attr1:{"dna":"trilobite"}, elem2:null, chance:0.1 };


if (!elements.bone.reactions) { elements.bone.reactions = {} }
    elements.bone.reactions.rock = { "elem1": "fossil", tempMin:60, chance:0.00005 };
    elements.bone.reactions.sand = { "elem1": "fossil", tempMin:60, chance:0.000035 };
    elements.bone.reactions.dirt = { "elem1": "fossil", tempMin:60, chance:0.00003 };
    elements.bone.reactions.tuff = { "elem1": "fossil", tempMin:60, chance:0.00005 };
    elements.bone.reactions.basalt = { "elem1": "fossil", tempMin:60, chance:0.00004 };
    elements.bone.reactions.mudstone = { "elem1": "fossil", tempMin:60, chance:0.00004 };
    elements.bone.reactions.packed_sand = { "elem1": "fossil", tempMin:60, chance:0.00004 };
    elements.bone.reactions.gravel = { "elem1": "fossil", tempMin:60, chance:0.000035 };
    elements.bone.reactions.clay = { "elem1": "fossil", tempMin:60, chance:0.00003 };
    elements.bone.reactions.clay_soil = { "elem1": "fossil", tempMin:60, chance:0.00003 };
    elements.bone.reactions.mulch = { "elem1": "fossil", tempMin:60, chance:0.00003 };
    elements.bone.reactions.ant_wall = { "elem1": "fossil", tempMin:60, chance:0.00002 };
    elements.bone.reactions.limestone = { "elem1": "fossil", tempMin:60, chance:0.00005 };
    elements.bone.reactions.quicklime = { "elem1": "fossil", tempMin:60, chance:0.000045 };
    elements.bone.reactions.slaked_lime = { "elem1": "fossil", tempMin:60, chance:0.000035 };


if (!elements.bone_marrow.reactions) { elements.bone_marrow.reactions = {} }
elements.bone_marrow.reactions.rock = { "elem1": "marrow_fossil", tempMin:70, chance:0.00005 };
elements.bone_marrow.reactions.sand = { "elem1": "marrow_fossil", tempMin:70, chance:0.000035 };
elements.bone_marrow.reactions.dirt = { "elem1": "marrow_fossil", tempMin:70, chance:0.0003 };
elements.bone_marrow.reactions.tuff = { "elem1": "marrow_fossil", tempMin:70, chance:0.00005 };
elements.bone_marrow.reactions.basalt = { "elem1": "marrow_fossil", tempMin:70, chance:0.00004 };
elements.bone_marrow.reactions.mudstone = { "elem1": "marrow_fossil", tempMin:70, chance:0.00004 };
elements.bone_marrow.reactions.packed_sand = { "elem1": "marrow_fossil", tempMin:70, chance:0.00004 };
elements.bone_marrow.reactions.gravel = { "elem1": "marrow_fossil", tempMin:70, chance:0.000035 };
elements.bone_marrow.reactions.clay = { "elem1": "marrow_fossil", tempMin:70, chance:0.00003 };
elements.bone_marrow.reactions.clay_soil = { "elem1": "marrow_fossil", tempMin:70, chance:0.00003 }
elements.bone_marrow.reactions.mulch = { "elem1": "marrow_fossil", tempMin:70, chance:0.00003 };
elements.bone_marrow.reactions.ant_wall = { "elem1": "marrow_fossil", tempMin:70, chance:0.00002 };
elements.bone_marrow.reactions.limestone = { "elem1": "marrow_fossil", tempMin:70, chance:0.00005 };
elements.bone_marrow.reactions.quicklime = { "elem1": "marrow_fossil", tempMin:70, chance:0.000045 };
elements.bone_marrow.reactions.slaked_lime = { "elem1": "marrow_fossil", tempMin:70, chance:0.000035 };


if (!elements.wood.reactions) { elements.wood.reactions = {} }
elements.wood.reactions.rock = { "elem1": "petrified_wood", tempMin:50, tempMax:279, chance:0.000045 };
elements.wood.reactions.rock = { "elem1": ["methane","coal","coal","coal","coal"], tempMin:280, chance:0.000045 };
elements.wood.reactions.sand = { "elem1": ["methane","coal","coal","coal","coal"], tempMin:280, chance:0.000035 };
elements.wood.reactions.dirt = { "elem1": ["methane","coal","coal","coal","coal"], tempMin:280, chance:0.00003 };
elements.wood.reactions.tuff = { "elem1": "petrified_wood", tempMin:50, tempMax:279, chance:0.000045 };
elements.wood.reactions.tuff = { "elem1": ["methane","coal","coal","coal","coal"], tempMin:280, chance:0.000045 };
elements.wood.reactions.basalt = { "elem1": "petrified_wood", tempMin:50, tempMax:279, chance:0.000035 };
elements.wood.reactions.basalt = { "elem1": ["methane","coal","coal","coal","coal"], tempMin:280, chance:0.000035 };
elements.wood.reactions.mudstone = { "elem1": "petrified_wood", tempMin:50, tempMax:279, chance:0.000035 };
elements.wood.reactions.mudstone = { "elem1": ["methane","coal","coal","coal","coal"], tempMin:280, chance:0.000035 };
elements.wood.reactions.packed_sand = { "elem1": "petrified_wood", tempMin:50, chance:0.000035 };
elements.wood.reactions.gravel = { "elem1": "petrified_wood", tempMin:50, chance:0.00003 };
elements.wood.reactions.clay = { "elem1": "petrified_wood", tempMin:50, chance:0.000025 };
elements.wood.reactions.clay_soil = { "elem1": "petrified_wood", tempMin:50, chance:0.000025 }
elements.wood.reactions.mulch = { "elem1": "petrified_wood", tempMin:50, chance:0.000025 };
elements.wood.reactions.ant_wall = { "elem1": "petrified_wood", tempMin:50, chance:0.000015 };
elements.wood.reactions.limestone = { "elem1": "petrified_wood", tempMin:50, chance:0.000045 };
elements.wood.reactions.quicklime = { "elem1": "petrified_wood", tempMin:50, chance:0.00004 };
elements.wood.reactions.slaked_lime = { "elem1": "petrified_wood", tempMin:50, chance:0.00003 };


if (!elements.tree_branch.reactions) { elements.tree_branch.reactions = {} }
elements.tree_branch.reactions.rock = { "elem1": "petrified_wood", tempMin:50, tempMax:279, chance:0.00005 };
elements.tree_branch.reactions.rock = { "elem1": ["methane","coal","coal","coal","coal"], tempMin:280, chance:0.00005 };
elements.tree_branch.reactions.sand = { "elem1": ["methane","coal","coal","coal","coal"], tempMin:280, chance:0.00003 };
elements.tree_branch.reactions.dirt = { "elem1": ["methane","coal","coal","coal","coal"], tempMin:280, chance:0.000025 };
elements.tree_branch.reactions.tuff = { "elem1": "petrified_wood", tempMin:50, tempMax:279, chance:0.00005 };
elements.tree_branch.reactions.tuff = { "elem1": ["methane","coal","coal","coal","coal"], tempMin:280, chance:0.00005 };
elements.tree_branch.reactions.basalt = { "elem1": "petrified_wood", tempMin:50, tempMax:279, chance:0.00004 };
elements.tree_branch.reactions.basalt = { "elem1": ["methane","coal","coal","coal","coal"], tempMin:280, chance:0.00004 };
elements.tree_branch.reactions.mudstone = { "elem1": "petrified_wood", tempMin:50, tempMax:279, chance:0.00004 };
elements.tree_branch.reactions.mudstone = { "elem1": ["methane","coal","coal","coal","coal"], tempMin:280, chance:0.00004 };
elements.tree_branch.reactions.packed_sand = { "elem1": "petrified_wood", tempMin:50, chance:0.00004 };
elements.tree_branch.reactions.gravel = { "elem1": "petrified_wood", tempMin:50, chance:0.000035 };
elements.tree_branch.reactions.clay = { "elem1": "petrified_wood", tempMin:50, chance:0.00003 };
elements.tree_branch.reactions.clay_soil = { "elem1": "petrified_wood", tempMin:50, chance:0.00003 }
elements.tree_branch.reactions.mulch = { "elem1": "petrified_wood", tempMin:50, chance:0.00003 };
elements.tree_branch.reactions.ant_wall = { "elem1": "petrified_wood", tempMin:50, chance:0.00002 };
elements.tree_branch.reactions.limestone = { "elem1": "petrified_wood", tempMin:50, chance:0.00005 };
elements.tree_branch.reactions.quicklime = { "elem1": "petrified_wood", tempMin:50, chance:0.000045 };
elements.tree_branch.reactions.slaked_lime = { "elem1": "petrified_wood", tempMin:50, chance:0.000035 };

if (!elements.dead_plant.reactions) { elements.dead_plant.reactions = {} }
elements.dead_plant.reactions.rock = { "elem1": ["oil","methane","methane","coal","coal"], tempMin:280, chance:0.00005 };
elements.dead_plant.reactions.sand = { "elem1": ["oil","methane","methane","coal","coal"], tempMin:280, chance:0.000025 };
elements.dead_plant.reactions.dirt = { "elem1": ["oil","methane","methane","coal","coal"], tempMin:280, chance:0.000025 };
elements.dead_plant.reactions.tuff = { "elem1": ["oil","methane","methane","coal","coal"], tempMin:280, chance:0.000025 };
elements.dead_plant.reactions.basalt = { "elem1": ["oil","methane","methane","coal","coal"], tempMin:280, chance:0.00005 };
elements.dead_plant.reactions.mudstone = { "elem1": ["oil","methane","methane","coal","coal"], tempMin:280, chance:0.000025 };
elements.dead_plant.reactions.packed_sand = { "elem1": ["oil","methane","methane","coal","coal"], tempMin:280, chance:0.00003 };
elements.dead_plant.reactions.gravel = { "elem1": ["oil","methane","methane","coal","coal"], tempMin:280, chance:0.000025 };
elements.dead_plant.reactions.clay = { "elem1": ["oil","methane","methane","coal","coal"], tempMin:280, chance:0.000025 };
elements.dead_plant.reactions.clay_soil = { "elem1": ["oil","methane","methane","coal","coal"], tempMin:280, chance:0.000025 };
elements.dead_plant.reactions.mulch = { "elem1": ["oil","methane","methane","coal","coal"], tempMin:280, chance:0.000025 };
elements.dead_plant.reactions.ant_wall = { "elem1": ["oil","methane","methane","coal","coal"], tempMin:280, chance:0.000025 };
elements.dead_plant.reactions.limestone = { "elem1": ["oil","methane","methane","coal","coal"], tempMin:280, chance:0.000035 };
elements.dead_plant.reactions.quicklime = { "elem1": ["oil","methane","methane","coal","coal"], tempMin:280, chance:0.000025 };
elements.dead_plant.reactions.slaked_lime = { "elem1": ["oil","methane","methane","coal","coal"], tempMin:280, chance:0.000025 };

if (!elements.algae.reactions) { elements.algae.reactions = {} }
elements.algae.reactions.rock = { "elem1": ["oil","methane","methane","coal"], tempMin:280, chance:0.00005 };
elements.algae.reactions.sand = { "elem1": ["oil","methane","methane","coal"], tempMin:280, chance:0.000025 };
elements.algae.reactions.dirt = { "elem1": ["oil","methane","methane","coal"], tempMin:280, chance:0.000025 };
elements.algae.reactions.tuff = { "elem1": ["oil","methane","methane","coal"], tempMin:280, chance:0.000025 };
elements.algae.reactions.basalt = { "elem1": ["oil","methane","methane","coal"], tempMin:280, chance:0.00005 };
elements.algae.reactions.mudstone = { "elem1": ["oil","methane","methane","coal"], tempMin:280, chance:0.000025 };
elements.algae.reactions.packed_sand = { "elem1": ["oil","methane","methane","coal"], tempMin:280, chance:0.00003 };
elements.algae.reactions.gravel = { "elem1": ["oil","methane","methane","coal"], tempMin:280, chance:0.000025 };
elements.algae.reactions.clay = { "elem1": ["oil","methane","methane","coal"], tempMin:280, chance:0.000025 };
elements.algae.reactions.clay_soil = { "elem1": ["oil","methane","methane","coal"], tempMin:280, chance:0.000025 };
elements.algae.reactions.mulch = { "elem1": ["oil","methane","methane","coal"], tempMin:280, chance:0.000025 };
elements.algae.reactions.ant_wall = { "elem1": ["oil","methane","methane","coal"], tempMin:280, chance:0.000025 };
elements.algae.reactions.limestone = { "elem1": ["oil","methane","methane","coal"], tempMin:280, chance:0.000035 };
elements.algae.reactions.quicklime = { "elem1": ["oil","methane","methane","coal"], tempMin:280, chance:0.000025 };
elements.algae.reactions.slaked_lime = { "elem1": ["oil","methane","methane","coal"], tempMin:280, chance:0.000025 };

delete elements.dirt.reactions.bone
delete elements.rock.reactions.dead_plant
