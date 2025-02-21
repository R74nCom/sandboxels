//thanks r74n and sandboxels mod devs for the idea for making this and adding so much value to my gaming experience
//if one needs a desc for the mod list on the website it'd be something around "charson's mods compiled such as random foods and random elements asked for by random people, beta"
//thanks!

//needs absolute zero to be set to -99999999999999999999999999999

//n2s - for food, change all instances of ', elem2:"head"' into nothing.

elements.calcium_chloride = {
    color: "#ffffff",
    behavior: behaviors.STURDYPOWDER,
    category: "powders",
    hidden: true,
    breakInto: ["calcium", "chlorine"],
    state: "solid",
    tempHigh: 772,
    reactions: {
        "sodium_carbonate": { elem1:"foam", elem2:"chalk" },
    }
};

if (!elements.calcium.reactions) { // Include this block once
    elements.calcium.reactions = {} // This creates the property if it doesn't exist
}
elements.calcium.reactions.chlorine = { elem1: "calcium_chloride" }

if (!elements.sun.reactions) { // Include this block once
    elements.sun.reactions = {} // This creates the property if it doesn't exist
}
elements.sun.reactions.light = { elem2: "sunlight" }

if (!elements.aluminum.reactions) { // Include this block once
    elements.aluminum.reactions = {} // This creates the property if it doesn't exist
}
elements.aluminum.reactions.oxygen = { elem1: "alumina" }

if (!elements.nitrogen.reactions) { // Include this block once
    elements.nitrogen.reactions = {} // This creates the property if it doesn't exist
}
elements.nitrogen.reactions.fire = { elem1: "pyrane" }

if (!elements.radiation.reactions) { // Include this block once
    elements.radiation.reactions = {} // This creates the property if it doesn't exist
}
elements.radiation.reactions.dead_plant = { elem2: "radioactive_maple_seed" }
elements.radiation.reactions.ant = { elem2: "rad_ant" }
elements.radiation.reactions.sugar = { elem2: "powdered_lime" }
elements.radiation.reactions.soap = { elem2: "purificanol" }
elements.radiation.reactions.diamond = { elem2: "emerald" }
elements.radiation.reactions.bird = { elem2: "pyrus_minimus" }

if (!elements.melted_cheese.reactions) { // Include this block once
    elements.melted_cheese.reactions = {} // This creates the property if it doesn't exist
}
elements.melted_cheese.reactions.sauce = { elem2: "akshajium" }

if (!elements.sodium.reactions) { // Include this block once
    elements.sodium.reactions = {} // This creates the property if it doesn't exist
}
elements.sodium.reactions.carbon_dioxide = { elem1: "sodium_carbonate" }

elements.sodium_carbonate = {
    color: "#ffffff",
    behavior: behaviors.POWDER,
    category: "powders",
    hidden: true,
    breakInto: ["sodium", "carbon_dioxide"],
    state: "solid",
    tempHigh: 851,
    reactions: {
        "calcium_chloride": { elem1:"foam", elem2:"chalk" },
    }
};

elements.silicon = {
    color: ["#9EBFE2", "#686F89", "#9BA4AB", "#373D4D"],
    behavior: behaviors.STURDYPOWDER,
    desc: "Silicon is a chemical element. It has symbol Si and atomic number 14. It is a hard, brittle crystalline solid with a blue-grey metallic lustre, and is a tetravalent metalloid and semiconductor.",
    category: "solids",
    state: "solid",
    tempHigh: 1414,
    reactions: {
        "oxygen": { elem1:"silicate", elem2:"pop" },
    }
};

elements.alumina = {
    color: ["#989ECE", "#DADAFF", "#E6E1FF"],
    behavior: behaviors.POWDER,
    category: "powders",
    hidden: true,
    state: "solid",
    tempHigh: 500,
    stateHigh: "hyper_aluminum",
    reactions: {
        "silicate": { elem1:"kaolin", elem2:"kaolin" },
    }
};

elements.hyper_aluminum = {
    color: ["#61829e", "#61829e", "#61829e", "#61829e", "#5872a7"],
    behavior: behaviors.WALL,
    category: "solids",
    hidden: true,
    state: "solid",
    tempHigh: 9999999,
    conduct: 1,
    desc: "With a sleek, metallic sheen, this material boasts enhanced durability, resistance to extreme temperatures, and a remarkable ability to withstand corrosion. Hyper Aluminium is the pinnacle of modern materials science—stronger, lighter, and more efficient than ever before, setting the stage for a new era of innovation.",
    charge: 3,
    stateHigh: "molten_aluminum",
    hardness: 0.95,
    reactions: {
        "steel": { elem2:"galvanized_steel" },
	"rock_wall": { elem2:"wall" },
    }
};

elements.silicate = {
    color: ["#A6B5B8", "#A7A8A0", "#665953", "#BDDAE8"],
    behavior: behaviors.POWDER,
    category: "powders",
    hidden: true,
    breakInto: "silica",
    state: "solid",
    tempHigh: 500,
    stateHigh: "molten_silicon",
    reactions: {
        "alumina": { elem1:"kaolin", elem2:"kaolin" },
    }
};

elements.silica = {
    color: ["#ACAA9B", "#CAC7B6", "#979A93"],
    behavior: behaviors.LIGHTWEIGHT,
    behaviorOn: behaviors.BOUNCY,
    category: "powders",
    hidden: true,
    state: "solid",
    tempHigh: 5000,
    stateHigh: "molten_ash",
    reactions: {
        "head": { elem1: null, func: behaviors.KILLPIXEL2 }, //silicosis reference.
    }
};


elements.kaolin = {
    color: ["#d3e2e6", "#e1e9eb", "#ede7e4", "#fcfcfc"],
    behavior: behaviors.POWDER,
    category: "land",
    hidden: true,
    state: "solid",
    tempHigh: 500,
    stateHigh: "porcelain",
    reactions: {
        "fired_clay": { elem1:"porcelain", elem2:"porcelain" },
	"blood": { elem2: null },
	"dirt": { elem1: "clay", elem2:"clay_soil" },
    }
};

elements.kaolinite = {
    color: ["#3b3b3b", "#575757", "#fcfcfc"],
    behavior: behaviors.STURDYPOWDER,
    category: "solids",
    hidden: true,
    state: "solid",
    tempHigh: 500,
    stateHigh: "molten_slag",
    breakInto: ["rock", "kaolin"],
    reactions: {
	"water": { elem1: "silicate", elem2:"dirty_water" },
    }
};

elements.chalk = {
    color: ["#D8275D", "#E0527D", "#AF508C", "#BF73A3"],
    stain: 0.5,
    stainSelf: true,
    canContain: true,
    related: ["art", "calcium"],
    customColor: true,
    hidden: true,
    category: "solids",
    breakInto: "chalk_powder",
    state: "solid",
    tempHigh: 5900,
    stateHigh: "ash",
};

elements.chalk_powder = {
    color: ["#D8275D", "#E0527D", "#AF508C", "#BF73A3"],
    stain: 0.3,
    behavior: behaviors.POWDER,
    stainSelf: true,
    hidden: true,
    customColor: true,
    category: "powders",
    state: "solid",
    tempHigh: 5900,
    stateHigh: "ash",
};

elements.powdered_lime = {
    color: ["#96F10E", "#BEF00F"],
    stain: 0.2,
    hidden: true,
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    reactions: {
        "water": { elem1:"foam", elem2:"limeade" },
        "head": { elem1: null, chance: 0.9, func: behaviors.FEEDPIXEL },
    }
};

elements.limeade = {
    color: ["#96F10E", "#BEF00F", "#96F10E"],
    alpha: 0.9,
    stain: 0.1,
    behavior: behaviors.LIQUID,
    category: "food",
    state: "solid",
    tempHigh: 105,
    stateHigh: "foam",
    tempLow: 0,
    reactions: {
        "head": { elem1: null, chance: 0.7, func: behaviors.FEEDPIXEL },
    }
};

//stupidity mod begins here

elements.stupid = {
    color: ["#eb3486", "#0affda", "#c7fa89"],
    behavior: behaviors.POWDER,
    category: "weapons",
    viscosity: 10000,
    state: "solid",
    related: ["di_stupid", "tri_stupid"],
    density: 100,
    desc: "stupid",
    temp: 20,
    tempLow: 19,
    tempHigh: 21,
	  reactions: {
        "water": { elem1:"blaster", elem2:"nuke", chance: 0.001 },
        "stupid": { elem1:"cloner", elem2:"nuke", chance: 0.5 },
	"electric": { elem1:"di_stupid", elem2:"tri_stupid" },
	"dirt": { elem1:"tornado", elem2:"stupid", chance: 0.5 },
    }
};

elements.di_stupid = {
    color: ["#0b3486", "#faffda", "#07fa89"],
    behavior: behaviors.POWDER,
    category: "weapons",
    viscosity: 10000,
    state: "solid",
    density: 100,
    hidden: true,
    desc: "stupid",
    temp: 20,
    tempLow: 19,
    tempHigh: 21,
	  reactions: {
        "di_stupid": { elem1:"di_stupid", elem2:"tsunami", chance: 0.001 },
        "stupid": { elem1:"party_popper", elem2:"cloner" },
	"water": { elem1:"earthquake", elem2:"acid" },
    }
};

elements.almond = {
    color: ["#855b34", "#9c836b", "#f5e7da"],
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    density: 100,
    desc: "stupid",
    temp: 20,
    tempLow: 10,
    tempHigh: 40,
    stateHigh: "nut_sauce",
    breakInto: "nut_sauce",
    stateLow: "cloner",
    conduct: 1,
	  reactions: {
        "head": { elem1: null, chance: 0.55, func: behaviors.FEEDPIXEL },
        "juice": { elem1:"party_popper", elem2:"party_popper" },
	"water": { elem1:"nut_sauce", elem2:"almond_water" },
    }
};

elements.nut_sauce = {
    color: ["#f2cba7", "#f5e7da"],
    behavior: behaviors.LIQUID,
    category: "food",
    viscosity: 10000,
    state: "liquid",
    density: 100,
    desc: "Highly flammable.",
    temp: 20,
    tempLow: 0,
    tempHigh: 50,
    hidden: true,
    stateHigh: ["blaster", "floating_cloner"],
    stateHighColor: "#EF5810",
    stateLow: "glue",
    conduct: 1,
	  reactions: {
        "head": { elem1: null, chance: 0.9, func: behaviors.FEEDPIXEL },
    }
};

elements.tri_stupid = {
    color: ["#ffffff", "#7a1d1d", "#000000"],
    behavior: behaviors.POWDER,
    category: "weapons",
    viscosity: 10000,
    state: "solid",
    density: 100,
    desc: "stupid",
    temp: 20,
    tempLow: 0,
    hidden: true,
    tempHigh: 40,
    stateLow: "ice",
    stateHigh: "magma",
    conduct: 1,
	  reactions: {
        "almond": { elem1:"hot_bomb", elem2:"cold_bomb" },
	"nut_sauce": { elem1:"heat_ray", elem2:"freeze_ray" },
    }
};

//milkandsoap aka milkandstupidity mod begins here

elements.maple_syrup = {
    color: "#a13d08",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 100000,
    state: "liquid",
    density: 720,
    isFood: true,
    stain: 0.01,
    desc: "english for sirop derable",
	  reactions: {
        "head": { elem1: null, chance: 0.4, func: behaviors.FEEDPIXEL },
    }
};

elements.radioactive_maple_seed = {
    color: ["#52d156", "#5d875f"],
    behavior: behaviors.RADPOWDER,
    behaviorOn: [
    "XX|XX|XX",
    "XX|EX:2>popcorn|XX",
    "XX|XX|XX",
],
    category: "life",
    viscosity: 100000,
    hidden: true,
    state: "solid",
    isFood: true,
    desc: "how does this work",
  	reactions: {
        "dirt": { elem1:"maple_nut", elem2:"dirt" },
        "grass": { elem1:"maple_nut", elem2:"dirt" },
	"ant": { elem1: null, elem2:"rad_ant" }
    }
};

elements.maple_nut = {
    color: "#735e3b",
    behavior: behaviors.POWDER,
    category: "life",
    viscosity: 100000,
    state: "solid",
    isFood: true,
    hidden: true,
    desc: "I dont think this is biologically accurate",
    breakInto: ["maple_syrup", "maple_powder"],
  	reactions: {
        "dirt": { elem1:"maple_plant", elem2:"maple_nut", chance: 0.001 },
    }
};

elements.maple_plant = {
    color: "#735e3b",
    behavior: behaviors.STURDYPOWDER,
    category: "life",
    viscosity: 100000,
    state: "solid",
    isFood: true,
    hidden: true,
    desc: "I dont think this is biologically accurate",
    breakInto: "dead_plant",
    burn: 90,
	reactions: {
        "dirt": { elem1:"maple_plant", elem2:"maple_nut", chance: 0.001 },
        "plant": { elem1:"maple_plant", elem2:"maple_plant", chance: 0.1 },
	"dead_plant": { elem1:"maple_plant", elem2:"maple_plant", chance: 0.3 },
        "water": { elem1:"maple_plant", elem2:"maple_plant", chance: 0.0001 },
    }
};

elements.maple_powder = {
    color: "#9e6213",
    behavior: behaviors.POWDER,
    category: "food",
    viscosity: 100000,
    state: "solid",
    hidden: true,
    isFood: true,
	reactions: {
        "milk": { elem1:"foam", elem2:"maple_milk" },
	"clay": { elem1: null, elem2:"terracotta" },
    }
};

elements.red_terracotta = {
    color: "#c96363",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    tempHigh: 500,
    hidden: true,
    stateHigh: "heated_terracotta",
};

elements.terracotta = {
    color: ["#c98c63", "#B97140"],
    hardness: 0.4,
    singleColor: true,
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    tempHigh: 500,
    stateHigh: "heated_terracotta",
    breakInto: "brick_rubble",
    breakIntoColor: "#A5775A",
    reactions: {
	"pyric_nitrite": { elem1:"red_terracotta", elem2: null },
	"sulfur": { elem1:"yellow_terracotta", elem2: null },
	"gold_coin": { elem1:"golden_terracotta", elem2: null },
	"scheele_green": { elem1:"green_terracotta", elem2: null },
	"rad_shard": { elem1:"teal_terracotta", elem2: null },
	"skibidi_soda": { elem1:"blue_terracotta", elem2: null }, 
	"violetium": { elem1:"purple_terracotta", elem2: null },
    }
};

elements.yellow_terracotta = {
    color: "#c9ae63",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    hidden: true,
    tempHigh: 500,
    stateHigh: "heated_terracotta",
};

elements.golden_terracotta = {
    color: ["#EEC211", "#DBC624", "#E8D417", "#E7DD66"],
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    hidden: true,
    tempHigh: 500,
    breakInto: ["gold", "terracotta"],
    stateHigh: ["heated_terracotta", "molten_gold", "slag"],
};

elements.green_terracotta = {
    color: "#63c96d",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    hidden: true,
    tempHigh: 500,
    stateHigh: "heated_terracotta",
};

elements.teal_terracotta = {
    color: "#63c994",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    tempHigh: 500,
    hidden: true,
    stateHigh: "heated_terracotta",
};

elements.blue_terracotta = {
    color: "#63b6c9",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    hidden: true,
    tempHigh: 500,
    stateHigh: "heated_terracotta",
};

elements.purple_terracotta = {
    color: "#6f63c9",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    tempHigh: 500,
    hidden: true,
    stateHigh: "heated_terracotta",
};

elements.heated_terracotta = {
    color: "#db773d",
    behavior: behaviors.STURDYPOWDER,
    category: "states",
    state: "solid",
    temp: 500,
    tempHigh: 1000,
    hidden: true,
    tempLow: 20,
    stateLow: ["teracotta", "purity"],
};

elements.maple_milk = {
    color: "#f5e3cb",
    behavior: behaviors.LIQUID,
    category: "food",
    viscosity: 100000,
    state: "liquid",
    desc: "a great drink",
    hidden: true,
    isFood: true,
	reactions: {
        "head": { elem1: null, chance: 0.9, func: behaviors.FEEDPIXEL },
    }
};

elements.purity = {
    color: "#f0f7fc",
    behavior: behaviors.WALL,
    category: "soaps",
    state: "solid",
    tempHigh: 70,
	hidden: true,
    stateHigh: "soap",
    stain: 1,
};

elements.purium = {
    color: "#cededd",
    behavior: behaviors.WALL,
    category: "soaps",
    state: "solid",
    hidden: true,
    tempHigh: 125,
    stateHigh: "purificanol",
    stain: 1,
    conduct: 1,
    breakInto: "purium_dust",
};

elements.purium_dust = {
    color: ["#cededd", "#95c7c4", "#ffffff"],
    behavior: behaviors.POWDER,
    category: "soaps",
	hidden: true,
    state: "solid",
    tempHigh: 125,
    stateHigh: ["purity", "soap"],
    stain: 1,
    conduct: 1,
};

elements.invalid = {
    color: ["#ff00dc", "#010001"],
    behavior: [
            ["XX","CR:malware","XX"],
            ["XX","XX","XX"],
            ["M2","M1","M2"]
        ],
    category: "machines",
    state: "solid",
    tempHigh: 9999,
    desc: "INVALID DESCRIPTION",
    stateHigh: "fallout",
    tempLow: -40,
    stateLow: "random",
    conduct: 1,
    breakInto: "electric",
    reactions: {
        "electric": { elem1: "null", elem2:"null" },
    }
};

elements.null = {
    color: ["#514a57", "#2c1040"],
    behavior: behaviors.WALL,
    category: "machines",
    state: "solid",
    desc: "null",
    tempLow: -40,
    breakInto: "random",
    stateLow: "unknown",
    conduct: 1,
	hidden: true,
    reactions: {
        "electric": { elem1: "null", elem2:"null" },
    }
};

elements.purificanol = {
    color: "#ffffff",
    behavior: behaviors.LIQUID,
    category: "soaps",
    viscosity: 100,
    state: "liquid",
    desc: "soap 3.0",
    extinguish: true,
    stain: -0.5,
    behaviorOn: [
    ["XX","CO:5","XX"],
    ["CO:5","XX","CO:5"],
    ["CO:5 AND M1","CO:5 AND M1","CO:5 AND M1"]
],
    density: 999999999,
    temp: 1,
    tempLow: -273,
    stateLow: "foam",
	reactions: {
        "dirt": { elem1: "foam", elem2: "purity" },
	"dead_bug": { elem1: "foam", elem2: "ant" },
	"uranium": { elem1: "foam", elem2: "lead" },
	"chalk_powder": { elem1: "foam", elem2: "foam" },
	"poison": { elem1: "foam", elem2: "antidote" },
	"infection": { elem1: "bless", elem2: ["vaccine", "antibody"] },
	"fallout": { elem1: "anti_soap", elem2: "contaminol" },
        "sand": { elem1: "foam", elem2: "purity" },
        "dust": { elem1: "foam", elem2: "purity" },
        "ash": { elem1: "foam", elem2: "purity" },
        "rock": { elem1: "foam", elem2: "porcelain" },
        "clay": { elem1: "foam", elem2: "porcelain" },
        "magma": { elem1: "foam", elem2: "purium" },
	"slag": { elem1: "foam", elem2: "purity" },
	"molten_slag": { elem1: "foam", elem2: "purium_dust" },
	"basalt": { elem1: "foam", elem2: "purity" },
        "slime": { elem1: "foam", elem2: "purity" },
	"dirty_water": { elem1: "foam", elem2: "water" },
	"blood": { elem1: "foam", elem2: "water" },
	"molten_iron": { elem1: "foam", elem2: "purium" },
	"molten_dirt": { elem1: "foam", elem2: "purium" },
	"molten_copper": { elem1: "foam", elem2: "purium" },
	"rust": { elem1: "foam", elem2: "purium_dust" },
	"water": { elem1: "foam", elem2: "bubble" },
	"ice": { elem1: "foam", elem2: "bubble" },
	"steam": { elem1: "foam", elem2: "bubble" },
	"mudstone": { elem1: "foam", elem2: "porcelain" },
	"rad_ant": { elem1: "foam", elem2: "ant" },
	"dead_plant": { elem1: "foam", elem2: "plant" },
	"frozen_plant": { elem1: "foam", elem2: "plant" },
	"smoke": { elem1: "foam", elem2: "bless" },
	"fire": { elem1: "foam", elem2: "bless" },
	"meat": { elem1: "foam", elem2: "cooked_meat" },
	"rotten_meat": { elem1: "foam", elem2: "cured_meat" },
	"cancer": { elem1: "foam", elem2: "dna" },
    "thermite": { elem1: "foam", elem2: "null" },
    },
};

elements.rad_ant = {
    color: ["#6ceb36", "#50e012"],
    behavior: behaviors.LIQUID,
    category: "life",
    state: "solid",
	hidden: true,
    desc: "uh oh",
    tempHigh: 100,
    stateHigh: ["dead_bug", "radiation"],
  	reactions: {
        "dirt": { elem1:"rad_ant", elem2:"radiation" },
        "grass": { elem1:"rad_ant", elem2:"radioactive_maple_seed" },
	"ant": { elem1:"rad_ant", elem2:"rad_ant" },
	"rock": { elem1:"rad_ant", elem2:"uranium" },
    }
};

elements.buttermilk = {
    color: "#f4f5c1",
    behavior: behaviors.LIQUID,
    category: "food",
    state: "liquid",
    desc: "Yum!",
	hidden: true,
    tempHigh: 100,
    stateHigh: "steam",
  	reactions: {
        "head": { elem1: null, chance: 0.9, func: behaviors.FEEDPIXEL },
        "water": { elem1: null, elem2:"milk" },
	"rock": { elem1: null, elem2:"butter" },
	"magma": { elem1: null, elem2:"melted_butter" },
    }
};

if (!elements.butter.reactions) { // Include this block once
    elements.butter.reactions = {} // This creates the property if it doesn't exist
}
elements.butter.reactions.milk = { "elem1":null, "elem2":"buttermilk" }

elements.stupid_particle = {
    color: ["#eb3486", "#0affda", "#c7fa89"],
    behavior: behaviors.BOUNCY,
    category: "weapons",
    state: "solid",
    density: 0,
    desc: "stupid",
    temp: 20,
    tempLow: 19,
    tempHigh: 21,
	  reactions: {
        "stupid_particle": { elem1:"neutron", elem2:"nuke", chance: 0.5},
    }
};

elements.boom_boom_particle = {
    color: ["#00ff00", "#ff00dc", "#0000ff"],
    behavior: behaviors.BOUNCY,
    category: "weapons",
    state: "gas",
    density: 0,
    desc: "andrew zhao",
    temp: 20,
    tempLow: 19,
    tempHigh: 21,
	  reactions: {
        "boom_boom_particle": { elem1:"explosion", elem2:"pop", chance: 0.7 },
    }
};

elements.julianite = {
    color: ["#505050", "#265227"],
    behavior: behaviors.RADPOWDER,
    category: "special",
    state: "liquid",
    tempHigh: 999999,
    stateHigh: "plasma",
    tempLow: -25,
  	reactions: {
        "electric": { elem1:"hyperjulianite" },
	"plasma": { elem1:"hyperjulianite" },
	"smoke": { elem1:"hyperjulianite" },
	"lightning": { elem1:"hyperjulianite" },
	"rock": { elem2:"julianite" },
    }
};

elements.hyperjulianite = {
    color: ["#6A6A6A", "#522651"],
    behavior: behaviors.SLIDE,
    category: "states",
    state: "solid",
	hidden: true,
    tempHigh: 1000,
    tempLow: -40,
    stateLow: "snake",
  	reactions: {
        "static": { elem2:"julianite" },
	"rock": { elem2:"plasma" },
	"water": { elem2:"electric" },
	"dirt": { elem2:"battery" },
	"plant": { elem2:"snake" },
    }
};

elements.sankarium = {
    color: ["#b5140e", "#494b52", "#d2d9d2"],
    behavior: behaviors.BUBBLE,
    category: "special",
    state: "solid",
    tempHigh: 100,
    burn: 90,
    fireColor: "#0c92f7",
    burnInto: "c-4",
    stateHigh: "narayananium",
  	reactions: {
        "dirt": { elem1:"stupid" },
    }
};

elements.narayananium = {
    color: ["#0EAFB5", "#525049", "#D9D2D9"],
    behavior: behaviors.POWDER,
    category: "special",
    state: "solid",
	hidden: true,
    burn: 90,
    fireColor: "#22DDA2",
};

elements.narayananium.behavior = [
   ["XX","XX","XX"],
    ["XX","XX","XX"],
    ["XX","M1 AND EX:10>party_popper","XX"],   
];

elements.tetra_stupid = {
    color: ["#4AB58A", "#B54A75"],
    behavior: behaviors.SLIDE,
    category: "weapons",
    state: "solid",
	hidden: true,
    conduct: 1,
};

elements.banana = {
    color: ["#F4FD3F", "#C3F30C", "#FBE904"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    desc: "minion reference",
    burn: 90,
    fireColor: "#ED126A",
    burnInto: "fragrance",
    conduct: 1,
    breakInto: "banana_milk",
    breakIntoColor: "#d8b284",
    reactions: {
        "head": { elem1: null, chance: 0.35, func: behaviors.FEEDPIXEL },
	"milk": { elem1: null, elem2: "banana_milk" },
    }
};

elements.banana_milk = {
    color: "#fdfdce",
    behavior: behaviors.LIQUID,
    category: "food",
    state: "liquid",
    density: 10000,
    charge: 1,
    superconductAt: 100,
    burn: 100,
    viscosity: 29,
    tempLow: -7,
	hidden: true,
    stateLowName: "frozen_banana_milkshake",
    tempHigh: 239,
    stateHigh: "steam",
    fireColor: "#DD00FF",
    burnInto: "dioxin",
    conduct: 1,
    reactions: {
        "head": { elem1: null, chance: 0.9, func: behaviors.FEEDPIXEL },
    }
};

//particlesplus begins here
					 
elements.thermon = {
    color: "#EB14AC",
    behavior: behaviors.BOUNCY,
    category: "energy",
    desc: "The thermon is a subatomic particle with a negative one elementary electric charge as well as heat.",
    state: "gas",
    charge: 1,
    maxSize: 1,
    superconductAt: 1,
    burning: true,
    temp: 999,
    fireColor: "#1CD8E3",
    conduct: 1,
    reactions: {
        "thermon": { elem1: "superthermon", elem2: "neutron" },
    }
};

elements.superthermon = {
    color: "#B010EF",
    behavior: behaviors.BOUNCY,
	hidden: true,
    category: "energy",
    desc: "The superthermon is a subatomic particle with a negative one elementary electric charge as well as high heat.",
    state: "gas",
    charge: 1,
    maxSize: 1,
    superconductAt: 1,
    burning: true,
    temp: 99999,
    fireColor: "#1CD8E3",
    conduct: 1,
    reactions: {
        "neutron": { elem1: "explosion" },
	"thermon": { elem1: "hyperthermon", elem2: "neutron" },
    }
};

elements.hyperthermon = {
    color: ["#5554AB", "#FF9D00"],
    behavior: behaviors.BOUNCY,
    category: "energy",
	hidden: true,
    desc: "The hyperthermon is a subatomic particle with a negative one elementary electric charge as well as immense heat.",
    state: "gas",
    charge: 1,	
    maxSize: 1,
    superconductAt: 1,
    burning: true,
    temp: 9999999,
    fireColor: "#1CD8E3",
    conduct: 1,
    reactions: {
        "neutron": { elem1: "explosion" },
	"electric": { elem1: "h_bomb" },
	"thermon": { elem1: "unstable_thermon", elem2: "neutron" },
    }
};

elements.unstable_thermon = {
    color: ["#FFFFFF"],
    behavior: behaviors.BOUNCY,
    category: "energy",
    desc: "ERROR",
	hidden: true,
    maxSize: 1,
    state: "gas",
    charge: 1,
    superconductAt: 1,
    burning: true,
    temp: 9999999999999999999999999999999999999,
    fireColor: "#1CD8E3",
    conduct: 1,
    reactions: {
        "neutron": { elem1: "explosion" },
	"proton": { elem1: "dirty_bomb" },
	"electric": { elem1: "h_bomb" },
	"thermon": { elem1: "supernova", elem2: "neutron" },
    }
};


elements.tetra_stupid.behavior = [
    ["CH:tetra_stupid","CH:banana","CH:tetra_stupid"],
    ["CH:banana","XX","CH:banana"],
    ["M2","M1 AND CH:banana","M2"]
];

elements.cryon = {
    color: "#1FD1E0",
    behavior: behaviors.BOUNCY,
    category: "energy",
    desc: "The cryon is a subatomic particle with a negative one elementary electric charge as well as negative heat.",
    state: "gas",
    charge: 1,
    superconductAt: -273.5,
    maxSize: 1,
    temp: -99,
    burn: 100,
    fireColor: "#1CD8E3",
    conduct: 1,
    reactions: {
        "cryon": { elem1: "supercryon", elem2: "neutron" },
    }
};

elements.supercryon = {
    color: "#99B1C0",
    behavior: behaviors.BOUNCY,
    category: "energy",
    desc: "The supercryon is a subatomic particle with a negative one elementary electric charge as well as extremely low heat.",
    state: "gas",
	hidden: true,
    charge: 1,
    maxSize: 1,
    superconductAt: -273.5,
    temp: -273.5,
	hidden: true,
    burn: 100,
    fireColor: "#1CD8E3",
    conduct: 1,
    reactions: {
        "neutron": { elem1: "explosion" },
	"cryon": { elem1: "hypercryon", elem2: "neutron" },
    }
};

elements.hypercryon = {
    color: ["#0062FF", "#6424DB"],
    behavior: behaviors.BOUNCY,
    category: "energy",
    desc: "The hypercryon is a subatomic particle with a negative one elementary electric charge as well as immense lack of heat.",
    state: "gas",
    charge: 1,
    superconductAt: -273.5,
	hidden: true,
    temp: -999999,
    burn: 100,
    maxSize: 1,
    fireColor: "#1CD8E3",
    conduct: 1,
    reactions: {
        "neutron": { elem1: "explosion" },
	"electric": { elem1: "h_bomb" },
	"cryon": { elem1: "unstable_cryon", elem2: "neutron" },
    }
};

elements.unstable_cryon = {
    color: ["#FFFFFF"],
    behavior: behaviors.BOUNCY,
    category: "energy",
    maxSize: 1,
    desc: "ERROR",
    state: "gas",
    charge: 1,
    superconductAt: -273.5,
	hidden: true,
    temp: -999999999999999999999999999,
    burn: 100,
    fireColor: "#1CD8E3",
    conduct: 1,
    reactions: {
        "neutron": { elem1: "explosion" },
	"proton": { elem1: "dirty_bomb" },
	"electric": { elem1: "h_bomb" },
	"cryon": { elem1: "supernova", elem2: "neutron" },
    }
};

elements.anti_soap = {
    color: ["#0000FF"],
    behavior: behaviors.FOAM,
    category: "soaps",
    state: "solid",
    hidden: true,
    burn: 100,
    reactions: {
        "soap": { elem2: null },
	"purificanol": { elem2: null },
    }
};

elements.violetium = {
    color: ["#494bb3", "#7049b3", "#7049b3"],
    category: "powders",
    state: "solid",
    temp: 40,
    burn: 100,
    fireColor: "#6e34eb",
    conduct: 1,
};

elements.violetium.behavior = [
   ["XX","XX","XX"],
    ["XX","XX","XX"],
    ["XX","M1 AND EX:10>purple_gold","XX"],   
];

elements.pyrus_minimus = {
    color: ["#eb6e34", "#ffd014", "#ff143c"],
    desc: "The rare Pyrus Minimus is a flying...animal? It preys on birds and worms.",
    behaviorOn: [
    "XX|XX|XX",
    "XX|EX:5>firework|XX",
    "XX|XX|XX",
],
    behavior: behaviors.FLY,
    category: "life",
    state: "solid",
    foodNeed: 7,
    breakInto: ["fire", "cooked_meat", "slime"],
    glow: true,
    temp: 300,
    baby: "pyrus_minimus",
    singleColor: true,
    fireColor: "#ff5b14",
    conduct: 1,
     reactions: {
        "cooked_meat": { elem2: null, func: behaviors.FEEDPIXEL },
	"dead_plant": { elem2: null, func: behaviors.FEEDPIXEL },
	"juice": { elem2: null, func: behaviors.FEEDPIXEL },
	"chocolate": { elem2: null, func: behaviors.FEEDPIXEL },
	"basalt": { elem2: null, func: behaviors.FEEDPIXEL },
	"bird": { elem2: ["feather", "blood"], func: behaviors.FEEDPIXEL },
	"worm": { elem2: null, func: behaviors.FEEDPIXEL },
    }
};

elements.stablium = {
    color: ["#516c87", "#de1998", "#c4e043"],
    behavior: behaviors.POWDER,
    behaviorOn: [
    "XX|XX|XX",
    "XX|EX:25>fw_ember,electric,flash,pop,proton|XX",
    "XX|XX|XX",
],
    category: "special",
    state: "solid",
    alpha: 0.73,
    breakInto: ["positron", "electrum"],
    glow: true,
    temp: 20,
    burn: 55,
    singleColor: true,
    fireColor: ["#f71e0a", "#f7940a", "#eff70a", "#0af722", "#0a69f7"],
    conduct: 1,
    tempHigh: 275,
     reactions: {
        "proton": { elem1: "ash", elem2: ["thermon", "cryon"] },
    } 
};

elements.arsenic = {
    color: ["#874809", "#97ad05"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    temp: 20,
    burn: 55,
    burnInto: "poison",
    fireColor: "#a1ccc7",
    tempHigh: 275,
     reactions: {
        "copper": { elem1: "scheele_green", elem2: "scheele_green" },
    } 
};

elements.scheele_green = {
    color: ["#2B7D45", "#87CA7C"],
    behavior: behaviors.RADPOWDER,
    category: "powders",
    state: "solid",
    alpha: 0.99,
    temp: 20,
    breakInto: "poison",
    burn: 55,
    burnInto: "poison",
    fireColor: "#2cff29",
    tempHigh: 275,
	hidden: true,
    stateHigh: "molten_copper",
     reactions: {
        "terracotta": { elem1: null, elem2: "green_terracotta" },
	"head": { elem1: "poison", elem2: "green_skull", chance: 0.3, func: behaviors.KILLPIXEL2 },
    } 
};

elements.green_skull = {
    color: ["#67bf65", "#527d51"],
    behavior: behaviors.RADPOWDER,
    category: "powders",
    state: "solid",
    temp: 20,
    breakInto: ["bone_meal", "fallout"],
    burn: 55,
    burnInto: "rad_shard",
	hidden: true,
    fireColor: "#573311",
    tempHigh: 275,
    stateHigh: "rad_steam",
     reactions: {
	"head": { elem2: "green_skull", chance: 0.1, func: behaviors.KILLPIXEL2 },
    } 
};

elements.contaminol = {
    color: "#005F00",
    behavior: behaviors.RADLIQUID,
    category: "soaps",
    viscosity: 100,
    state: "liquid",
    extinguish: true,
    density: 999999999,
    temp: 1,
    tempLow: -273,
    stateLow: "foam",
	reactions: {
        "dirt": { elem1: "foam", elem2: "impurity" },
	"purity": { elem1: "foam", elem2: "impurity" },
        "sand": { elem1: "foam", elem2: "tinder" },
        "dust": { elem1: "foam", elem2: "magnesium" },
        "ash": { elem1: "foam", elem2: "magnesium" },
        "rock": { elem1: "foam", elem2: "mudstone" },
        "clay": { elem1: "foam", elem2: "slag" },
        "magma": { elem1: "foam", elem2: "molten_uranium" },
	"purium_dust": { elem1: "foam", elem2: "rust" },
	"basalt": { elem1: "foam", elem2: "thermite" },
        "slime": { elem1: "foam", elem2: "magma" },
	"dirty_water": { elem1: "foam", elem2: "slime" },
	"water": { elem1: "foam", elem2: "oil" },
	"iron": { elem1: "foam", elem2: "impurium" },
	"molten_dirt": { elem1: "foam", elem2: "impurium" },
	"copper": { elem1: "foam", elem2: "rust" },
	"gold_coin": { elem1: "foam", elem2: "rust" },
	"ice": { elem1: "foam", elem2: "blood_ice" },
	"steam": { elem1: "foam", elem2: "rad_steam" },
	"porcelain": { elem1: "foam", elem2: "smoke" },
	"plant": { elem1: "foam", elem2: "dead_plant" },
	"laser": { elem1: "purificanol", elem2: "explosion" },
	"ant": { elem1: "foam", elem2: "rad_ant" },
        "electric": { elem1: "foam", elem2: "malware" },
	"meat": { elem1: "foam", elem2: "rotten_meat" },
	"cooked_meat": { elem1: "foam", elem2: "rotten_meat" },
	"cured_meat": { elem1: "foam", elem2: "rotten_meat" },
	"dna": { elem1: "foam", elem2: "cancer" },
    }
};

elements.impurity = {
    color: "#4B0663",
    behavior: behaviors.WALL,
    category: "soaps",
    state: "solid",
    tempHigh: 70,
    hidden: true,
    stateHigh: "acid",
    stateHighColor: "#EB14E0",
    stain: 1,
};

elements.impurium = {
    color: "#CECFDE",
    behavior: behaviors.WALL,
    category: "soaps",
    state: "solid",
    tempHigh: 125,
    stateHigh: "contaminol",
    stain: 1,
    hidden: true,
    conduct: 1,
    breakInto: "plague",
};

elements.volatilium = {
    color: ["#97BF40", "#58BF40", "#BFA740"],
    behavior: behaviors.STURDYPOWDER,
    category: "special",
    state: "solid",
    alpha: 0.99,
    breakInto: ["electric", "steel"],
    temp: 20,
    burn: 55,
    singleColor: true,
    fireColor: ["#f71e0a", "#f7940a", "#eff70a", "#0af722", "#0a69f7"],
    conduct: 1,
    tempHigh: 30,
	breakInto: "border",
     reactions: {
        "neutron": { elem1: "molten_slag", elem2: ["invalid", "beryllium"] },
        "beryllium": { elem2: "beryllium_volatilium_alloy" },
    } 
};

elements.beryllium = {
    color: ["#AAAA9f", "#615d52", "#282b28"],
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    breakInto: ["emerald", "proton"],
    temp: 20,
    conduct: 1,
	desc: "Beryllium is a chemical element, it has symbol Be and atomic number 4. It is a steel-gray, hard, strong, lightweight and brittle alkaline earth metal. It is a divalent element that occurs naturally only in combination with other elements to form minerals.",
    tempHigh: 1287,
	breakInto: "emerald",
     reactions: {
        "oxygen": { elem1: "beryllium_oxide", elem2: "beryllium_oxide" },
	"head": { elem1: "poison", chance: 0.05, func: behaviors.KILLPIXEL2 },
	"volatilium": { elem2: "beryllium_volatilium_alloy" },
    } 
};

elements.beryllium_oxide = {
    color: "#c9c9d1",
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    temp: 20,
    insulate: 1,
};

elements.emerald = {
    color: ["#2edb93", "#75C03F", "#3FC049", "#42c78f", "#22B748"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    temp: 20,
    alpha: 0.8,
    tempHigh: 1287,
};

//ai generated elements begin here

elements.verylithium = {
    color: ["#A3B19C", "#3A5D4E", "#9A9E7C"],
    behavior: behaviors.WALL,
    category: "ai-generated",
    state: "solid",
    alpha: 0.95,
    breakInto: ["crystal", "liquid_metal"],
    temp: 25,
    burn: 70,
    singleColor: true,
    fireColor: ["#f70a3b", "#a47f1e", "#f7d02f", "#0af75c", "#0a3aef"],
    conduct: 0.9,
    tempHigh: 1000,
    breakInto: "crystal",
    reactions: {
        "neutron": { elem1: "verylithium_oxide", elem2: ["molten_metal", "beryllium"] },
        "water": { elem1: "verylithium_hydrate" },
        "head": { elem1: "electric", func: behaviors.KILLPIXEL2 }
    }
};

elements.volantium = {
    color: ["#97C040", "#43BF60", "#5C7A35"],
    behavior: behaviors.WALL,
    category: "ai-generated",
    state: "solid",
    alpha: 0.99,
    breakInto: ["electric", "steel"],
    temp: 15,
    burn: 45,
    singleColor: false,
    fireColor: ["#d91f2f", "#efad00", "#42f70a", "#2188d9", "#31a72e"],
    conduct: 1.2,
    tempHigh: 35,
    breakInto: "voltain",
    reactions: {
        "neutron": { elem1: "volantium_plasma", elem2: ["beryllium", "molten_slag"] },
        "oxygen": { elem1: "volantium_oxide" }
    }
};

elements.voltain = {
    color: ["#D3B5E0", "#9B74CC", "#6A4E92"], // colors for voltain (purple and violet hues)
    behavior: behaviors.AGPOWDER,
    category: "ai-generated",
    state: "solid", // in solid state
    alpha: 0.99, // high opacity
    breakInto: ["crystal"],
    temp: 20, // temperature in Celsius
    burn: 50, // burn rate, how much it burns
    singleColor: false, // does not have a single color, as it's a multi-colored crystal
    fireColor: ["#f00", "#ff0", "#ff80d5", "#ff4f7f", "#7f2dff"], // fire-like colors (purple to pink)
    conduct: 0.8, // lower conductivity, suitable for a crystal
    tempHigh: 30, // maximum temperature before breaking down
    stateHigh: "dust",
    reactions: {
        "magma": { elem1: "mixed_metal_slag" }, // reacts with water
    }
};


elements.beryllium_volatilium_alloy = {
    color: ["#7f8c45", "#4f5c7d", "#9f8b5a"],
    behavior: behaviors.WALL,
    category: "ai-generated",
    state: "solid",
    alpha: 0.85,
    breakInto: ["beryllium", "volantium"],
    temp: 40,
    burn: 60,
    singleColor: true,
    fireColor: ["#fa0a1f", "#ef8d1f", "#f7e20a", "#0afc1e"],
    conduct: 1.3,
    tempHigh: 1200,
    reactions: {
        "neutron": { elem1: "mixed_metal_slag", elem2: ["beryllium", "volantium"] },
        "air": { elem1: "oxidized_alloy" },
        "fire": { elem1: "molten_alloy" }
    }
};

elements.crystal = {
    color: ["#A2D8C8", "#6B9E8F", "#4F7F8F"],
    behavior: behaviors.POWDER,
    category: "ai-generated",
    state: "solid",
    alpha: 1.0,
    temp: 5,
    burn: 0,
    singleColor: true,
    conduct: 0,
    tempHigh: 500,
    breakInto: "chatgptium_vapor",
    desc: "A highly organized structure, often formed in nature under precise conditions. Crystals are brittle and beautiful, frequently seen as precious gemstones.",
};

elements.liquid_metal = {
    color: ["#D1B7A1", "#9F8C7A", "#5C3A29"],
    behavior: behaviors.LIQUID,
    category: "ai-generated",
    state: "liquid",
    alpha: 1.0,
    temp: 30,
    burn: 100,
    singleColor: true,
    hidden: true,
    conduct: 1.5,
    tempHigh: 1500,
    breakInto: "chatgptium",
    desc: "A liquid form of metal, exhibiting high fluidity and electrical conductivity. Typically found in high-temperature environments or specific chemical states.",
};

elements.verylithium_oxide = {
    color: ["#A8C0A2", "#91B19E", "#5A6D52"],
    behavior: behaviors.STURDYPOWDER,
    category: "ai-generated",
    state: "solid",
    alpha: 1.0,
    temp: 50,
    burn: 20,
    singleColor: true,
    hidden: true,
    conduct: 0.5,
    tempHigh: 600,
    breakInto: "dust",
    desc: "An oxide compound of Verylithium, formed when exposed to oxygen. It is a solid, stable compound, often used in industrial applications for its mild reactivity.",
};

elements.verylithium_hydrate = {
    color: ["#A7D0C3", "#8DB6B2", "#4C7B6A"],
    behavior: behaviors.STURDYPOWDER,
    category: "ai-generated",
    state: "solid",
    alpha: 0.95,
    hidden: true,
    temp: 25,
    burn: 0,
    singleColor: true,
    conduct: 0.2,
    tempHigh: 400,
    breakInto: "dirty_water",
    desc: "A hydrated form of Verylithium, where water molecules are integrated into its structure. It is a stable and non-reactive compound when kept in controlled conditions.",
};

elements.volantium_plasma = {
    color: ["#7E6CC0", "#8F6CB9", "#4A5FA1"],
    behavior: behaviors.RADPOWDER,
    category: "ai-generated",
    state: "plasma",
    alpha: 1.0,
    temp: 1000,
    burn: 500,
    singleColor: false,
    hidden: true,
    conduct: 2.0,
    charge: 2,
    tempHigh: 2000,
    hidden: true,
    desc: "A highly energized state of Volantium, where the atoms are ionized and capable of conducting electricity at extreme temperatures.",
};

elements.volantium_oxide = {
    color: ["#9C9E4A", "#B1B23C", "#B8B548"],
    behavior: behaviors.POWDER,
    category: "ai-generated",
    state: "solid",
    alpha: 1.0,
    temp: 40,
    burn: 10,
    singleColor: true,
    conduct: 0.3,
    hidden: true,
    tempHigh: 700,
    breakInto: "dust",
    breakIntoColour: "#42374f",
    desc: "An oxide compound of Volantium, typically formed when exposed to oxygen at higher temperatures. It is a stable, non-reactive material with mild conductivity.",
};

elements.oxidized_alloy = {
    color: ["#7D6F5B", "#A69A88", "#9C9E88"],
    behavior: behaviors.WALL,
    category: "ai-generated",
    state: "solid",
    alpha: 1.0,
    temp: 20,
    hidden: true,
    burn: 50,
    singleColor: true,
    conduct: 0.8,
    tempHigh: 1200,
    breakInto: "rust",
    desc: "An alloy that has undergone oxidation, resulting in a more stable but less conductive form. It is commonly used in environments where resistance to corrosion is crucial.",
};

elements.molten_alloy = {
    color: ["#C4A4A1", "#B85C5A", "#B0A898"],
    behavior: behaviors.MOLTEN,
    category: "ai-generated",
    state: "liquid",
    alpha: 1.0,
    temp: 800,
    hidden: true,
    burn: 200,
    singleColor: true,
    conduct: 2.0,
    tempHigh: 1800,
    breakInto: "chatgptium_alloy",
    breakIntoColour: "#374f3d",
    desc: "A molten state of alloy created at high temperatures. It has excellent fluidity and conductivity, often used in high-performance industrial applications.",
};

elements.mixed_metal_slag = {
    color: ["#6E5A4E", "#7E6757", "#9C7F70"],
    behavior: behaviors.POWDER,
    category: "ai-generated",
    state: "solid",
    alpha: 1.0,
    temp: 100,
    burn: 0,
    singleColor: true,
    conduct: 0,
    tempHigh: 800,
    breakInto: "chatgptium_alloy",
    desc: "The by-product of metal refinement, a waste material that forms during the extraction of metals from ores. It is a sticky and non-conductive substance.",
};
	
elements.chatgptium = {
    color: ["#0091D5", "#1A72B8", "#66A3FF"],
    behavior: behaviors.POWDER,
    category: "ai-generated",
    state: "solid",
    alpha: 0.98,
    temp: 22,
    burn: 0,
    singleColor: false,
    conduct: 0.5,
    tempHigh: 100,
    stateHigh: "chatgptium_vapor",
    desc: "A rare, virtual gas element that exists in the interaction between human thought and digital knowledge. It changes color based on the surrounding conversation and environment, constantly adapting to communicate with surrounding elements.",
    reactions: {
        "electrum": { elem1: "chatgptium_alloy", elem2: "electric" },
	"electric": { elem1: "chatgptium_alloy", elem2: "electric" },
	"iron": { elem1: "chatgptium_alloy", elem2: "electric" },
	"wire": { elem1: "chatgptium_alloy", elem2: "electric" },
	"battery": { elem1: "chatgptium_alloy", elem2: "electric" },
    }
};

elements.chatgptium_vapor = {
    color: ["#66D3FF", "#00B5E2", "#B0C9D5"],
    behavior: behaviors.GAS,
    hidden: true,
    category: "ai-generated",
    state: "gas",
    alpha: 0.95,
    temp: 25,
    burn: 0,
    singleColor: false,
    conduct: 0.4,
    tempLow: -20,
    stateLow: "chatgptium_crystal",
    desc: "The gaseous form of ChatGPTium, which becomes more fluid and dispersed as it rises in temperature. It communicates in wisps and is most active in digital spaces.",
};

elements.chatgptium_crystal = {
    color: ["#B0D6E1", "#92A4B2", "#5C9EB3"],
    behavior: behaviors.POWDER,
    category: "ai-generated",
    state: "solid",
    alpha: 1.0,
    glow: true,
    hidden: true,
    temp: 20,
    burn: 0,
    singleColor: true,
    conduct: 0.1,
    tempHigh: 300,
    desc: "A crystalline form of ChatGPTium, solidified after long periods of communication. It has an almost ethereal glow and a mysterious connection to information processing.",
};

elements.chatgptium_alloy = {
    color: ["#5F99FF", "#80A5D9", "#3D80B6"],
    behavior: behaviors.STURDYPOWDER,
    category: "ai-generated",
    state: "solid",
    alpha: 0.9,
    temp: 50,
    hidden: true,
    burn: 10,
    singleColor: true,
    conduct: 0.8,
    tempHigh: 1200,
    desc: "A rare alloy formed when ChatGPTium interacts with computational elements. It has a unique ability to store and transmit information rapidly, and is often used in high-tech devices.",
};

//ai generated elements end here, charsonsmodbeta begins here

elements.akshajium = {
    color: ["#a8160c", "#fdff94", "#d47d20"],
    behavior: behaviors.POWDER,
    category: "food",
    viscosity: 10000,
    state: "solid",
    density: 100,
    desc: "pizza",
    related: ["sankarium", "narayananium"],
    breakInto: ["crumb", "sauce", "melted_cheese", "cooked_meat"],
	reactions: {
        "head": { elem1: null, chance: 0.36, func: behaviors.FEEDPIXEL },
    }
};

elements.brioche_steam = {
    color: "#ab8c60",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 720,
    temp: 80,
    tempLow: 30,
	desc: "how does this make any sense?",
    stateLow: ["brioche"],
    isFood: true,
};

elements.fancy_dough = {
    color: "#d1c0a5",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 999999,
    state: "liquid",
    density: 720,
    temp: 30,
    tempHigh: 50,
    stateHigh: ["steam", "brioche_steam"],
    desc: "it can be evaporated",
	reactions: {
        "head": { elem1: null, chance: 0.1, func: behaviors.FEEDPIXEL },
    }
};

elements.brioche = {
    color: ["#c2770e", "#b06227"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    temp: 30,
    tempHigh: 80,
    tempLow: 10,
    stateHigh: ["fragrance", "ash"],
    stateLow: ["cold_brioche"],
    burn: 55,
    isFood: true,
    breakInto: "fancy_flour",
	reactions: {
        "head": { elem1: null, chance: 0.7, func: behaviors.FEEDPIXEL },
    }
};

elements.aresium = {
    color: ["#1017ad", "#2E5AD1"],
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|XX|XX"
],
    category: "solids",
    temp: 19,
    tempHigh: 100,
    tempLow: -20,
    stateHigh: ["skibidi_aresium"],
    stateLow: ["magma", "electric", "explosion", "cold_fire"],
	desc: "it's a transition metal named after mars",
    burn: 0,
    conduct: 1,
};

elements.skibidi_aresium = {
    color: "#ad1051",
    behavior: [
    "XX|XX|XX",
    "M1 AND EX:10>brick_rubble,radiation|XX|M1 AND EX:10>brick_rubble,radiation",
    "XX|XX|XX"
],
    category: "states",
    temp: 100,
    tempHigh: 300,
    stateHigh: ["tnt", "molten_iron", "copper", "explosion"],
    burn: 0,
    conduct: 1,
};

elements.cold_brioche = {
    color: "#5f7a8c",
    behavior: behaviors.WALL,
    category: "states",
    temp: 5,
    tempHigh: 30,
    stateHigh: ["brioche"],
};

elements.fancy_flour = {
    color: "#f5e9b5",
    behavior: behaviors.POWDER,
    category: "powders",
    temp: 20,
    tempHigh: 70,
	burn: 70,
    stateHigh: ["fragrance", "smoke"],
};

elements.irradiate = {
    color: ["#2edb93", "#00ff00"],
    category: "tools",
    behavior:  [
    "XX|XX|XX",
    "XX|CH:radiation|XX",
    "XX|XX|XX",
],
};
    

elements.pyrane = {
    color: "#fc7c19",
    behavior: behaviors.GAS,
    hidden: true,
    category: "gases",
    state: "gas",
    temp: 50,
    tempLow: -20,
    stateLow: ["fyrium"],
    reactions: {
        "ash": { elem1: null, elem2:"pyric_nitrite" },
	    "dirt": { elem1:"pyrane", elem2:"fire" },
	    "hydrogen": { elem1:"hydroid", elem2:"hydroid" },
    }
};

elements.pyric_nitrite = {
    color: "#b3270e",
    behavior: behaviors.POWDER,
    behaviorOn: [
    "XX|XX|XX",
    "XX|EX:10>fire,nitrogen,stench,electric|XX",
    "XX|XX|XX",
],
    category: "powders",
    state: "solid",
    temp: 20,
    conduct: 1,
	desc: "not to be confused with iron pyrite or anything like that",
    reactions: {
        "iron": { elem1:"pyric_nitrite", elem2:"pyric_rust" },
		"oil": { elem1: null, elem2:"nitrol_fuel" },
		"electric": { elem1:["fire", "nitrogen", "stench", "electric", "explosion"], elem2:"fire" },
    }
};

elements.pyric_rust = {
    color: "#913e17",
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    temp: 20,
    reactions: {
        "steel": { elem1: null, elem2:"tnt" }
    }
};

elements.fyrium = {
    color: "#ffa930",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    temp: 20,
    tempHigh: 137,
    stateHigh: ["molten_fyrium"],
    breakInto: ["fire"],
};

elements.molten_fyrium = {
    color: "#ffffff",
    behavior: behaviors.MOLTEN,
    category: "states",
    temp: 137,
    tempLow: -20,
    stateLow: ["fyrium"],
    reactions: {
        "water": { elem1:"explosion", elem2: null }
    }
};

elements.nitrol_fuel = {
    color: "#4f180e",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    temp: 20,
    stain: 0.5,
    reactions: {
        "wood": { elem1: null, elem2:"fueled_wood" },
    }
};

elements.fueled_wood = {
    color: "#631608",
    behavior: behaviors.WALL,
    category: "weapons",
    state: "solid",
    temp: 20,
    tempHigh: 30,
    stateHigh: ["rocket", "pyrane", "nitrol_fuel", "explosion", "stench"],
    reactions: {
        "fire": { elem1:["rocket", "pyrane", "nitrol_fuel", "explosion", "stench"], elem2:["rocket", "pyrane", "nitrol_fuel", "explosion", "stench"] },
    }
};

elements.hydroid = {
    color: "#3a0ca6",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    temp: 20,
    tempHigh: 100,
    tempLow: -20,
    density: 12,
	conduct: 1,
	desc: "this is NOT water",
    stateHigh: ["pyrane", "steam"],
    reactions: {
        "fire": { elem1: "hydroid", elem2:"explosion" },
		"body": { elem1: "hydroid", elem2:"fyrium" },
        "head": { elem1: "hydroid", elem2:"pyrane", func: behaviors.KILLPIXEL2 },
        "water": { elem1: "hydroid", elem2:"hydroid" },
        "maple_syrup": { elem1: "hydroid", elem2:"hydroid" },
		"magma": { elem1: "hydroid", elem2:"hydroid" },
		"oil": { elem1: "hydroid", elem2:"hydroid" },
        "juice": { elem1: "hydroid", elem2:"hydroid" },
        "ice": { elem1: "hydroid", elem2:"hydroid" },
    }
};

//by someone named spencer
elements.kai_cenat = {
    color: "#e00b0b",
    behavior: behaviors.STURDYPOWDER,
    category: "special",
    state: "solid",
    desc: "wow",
    conduct: 1,
	desc: "someone named spencer told me to add this",
};

elements.kai_cenat.behavior = [
    ["XX","CH:kai_cenat","XX"],
    ["CH:kai_cenat","XX","CH:kai_cenat"],
    ["M2","M1 AND CH:kai_cenat","M2"]
];

elements.kai_eraser = {
    color: ["e00b0b", "#ff0000", "#00ff00", "#0000ff"],
    tool: function(pixel) {
        if (pixel.element == "kai_cenat") {
            pixel.element = "foam"
        }
    },
    category: "tools",
};

//ok this is the skibidi-edited mod part

elements.tocopherol = {
    color: "#094237",
    behavior: behaviors.POWDER,
    category: "powders",
    viscosity: 10000,
    state: "solid",
    density: 100,
        reactions: {
        "sodium_acetate": { elem1:"tocopheryl_acetate", elem2:"sodium" },
    }
};

elements.tweakium = {
    color: "#22dfce",
    behavior: [
    "XX|M1|XX",
    "M1|CH:liquid_light%5|M1",
    "XX|M2|XX",
],
    category: "special",
    state: "gas",
    density: 720,
    temp: 80,
        reactions: {
        "head": { elem1:"fw_ember", elem2:"cooked_meat", chance: 0.1 },
        "body": { elem1:"fw_ember", elem2:"cooked_meat", chance: 0.3 },
	"tweakium": { elem1:"firework", chance: 0.005 },
    }
};

elements.tocopheryl_gas = {
    color: "#96e3d4",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 720,
    temp: 80,
    tempLow: 0,
    stateLow: ["tocopherol"],
};

elements.sunlight = {
    color: "#ffc9c9",
    behavior: behaviors.BOUNCY,
    category: "energy",
    state: "liquid",
    glow: true,
    density: 720,
    stain: 1,
    temp: 5600,
    tempLow: -273,
    stateLow: ["liquid_light"],
};

elements.tocopheryl_acetate = {
    color: "#cffdff",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 999999,
    state: "liquid",
    density: 720,
    temp: 30,
    tempHigh: 96,
    stateHigh: ["tocopheryl_gas"],
        reactions: {
        "zinc": { elem1:"sunscreen", elem2:"sunscreen" },
    }
};

elements.nahnium = {
    color: ["#bfa6f5", "#b5a5d9"],
    behavior: [
    "HT:5|CR:tweakium%1|HT:5",
    "CR:liquid_light%5|XX|CR:liquid_light%5",
    "XX|M1|XX",
],
    category: "powders",
    temp: 30,
    tempHigh: 80,
    tempLow: 10,
        reactions: {
        "nahnium": { elem1:"nahnium", elem2:"glass_shard", chance: 0.01 },
    }
};

elements.sunscreen = {
    color: "#ffeeff",
    behavior: behaviors.LIQUID,
    category: "liquids",
    temp: 0,
    stain: -0.1,
    tempHigh: 9600,
    stateHigh: ["tocopheryl_gas"],
        reactions: {
        "light": { elem2: null },
	"sunlight": { elem2: null },
        "water": { elem1:"soapy_water", elem2:"soapy_water" },
    }
};

elements.stupidine = {
    color: "#4e4b75",
    behavior: behaviors.STURDYPOWDER,
    category: "solids",
    state: "solid",
    temp: 20,
    tempHigh: 137,
    stateHigh: "liquid_stupidine",
    tempLow: -31,
    stateLow: "activated_stupidine",
        reactions: {
        "stupidine": { elem2:"fragrance", chance:0.01 },
	"iron": { elem2:"stupid", chance:0.01 },
	"light": { elem2:"nahnium", chance:0.01 },
    }
};

elements.liquid_stupidine = {
    color: ["#5328c9", "#4089e3"],
    behavior: [
	    ["M2","M1","M2"],
            ["XX","XX","XX"],
            ["XX","CR:slime%1","XX"]
],
    category: "liquids",
    state: "liquid",
    temp: 140,
    tempHigh: 500,
    stateHigh: "stupidine_gas",
    tempLow: 25,
    stateLow: "skibidine",
    breakInto: "skibidine",
};

elements.stupidine_gas = {
    color: "#802d3a",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    temp: 500,
    tempHigh: 1000,
    stateHigh: ["nuke", "explosion"],
    tempLow: 200,
    stateLow: "liquid_stupidine",
        reactions: {
        "stupidine_gas": { elem1:"stench", chance:0.1 },
    }
};

elements.activated_stupidine = {
    color: "#3d2f61",
    behavior: [
    "XX|XX|XX",
    "XX|CH:hot_bomb|XX",
    "XX|XX|XX",
],
    category: "solids",
    state: "solid",
    temp: 20,
};

elements.skibidi_soda = {
    color: "#3279a8",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    tempHigh: 100,
    stateHigh: ["skibidiness", "skibidine"],
        reactions: {
        "oxygen": { elem1:"skibidi_soda", elem2:"skibidiness" },
        "head": { elem1: "skibidiness", func: behaviors.FEEDPIXEL },
    }
};

elements.skibidine = {
    color: ["#51649c", "#949c51"],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
        reactions: {
        "carbon_dioxide": { elem1:"skibidi_soda", elem2:"skibidi_soda" },
        "iron": { elem1: "magma", elem2:"stupidine" },
    }
};


elements.skibidiness = {
    color: "#567de8",
    behavior: behaviors.DGAS,
    category: "gases",
    state: "gas",
    temp: 20,
        reactions: {
        "water": { elem1:"skibidiness", elem2:"skibidi_soda"},
    }
};

elements.right_missile = {
    color: ["#8a9499", "#9e9e9e", "#d1d1d1"],
    category: "weapons",
    state: "solid",
    temp: 40,
    burning: true,
    tempHigh: 2000,
    stateHigh: "molten_metal_scrap",
    breakInto: "metal_scrap",
    fireColor: "#e342a5",
    conduct: 1,
    charge: 3,
};

elements.right_missile.behavior = [
   ["XX","XX","XX"],
    ["XX","XX","M1 AND EX:20>explosion"],
    ["XX","XX","XX"],   
];

elements.left_missile = {
    color: ["#8a9499", "#9e9e9e", "#d1d1d1"],
    category: "weapons",
    state: "solid",
    temp: 40,
    burning: true,
    tempHigh: 2000,
    stateHigh: "molten_metal_scrap",
    breakInto: "metal_scrap",
    fireColor: "#e342a5",
    conduct: 1,
    charge: 3,
};

elements.left_missile.behavior = [
   ["XX","XX","XX"],
    ["M1 AND EX:20>explosion","XX","XX"],
    ["XX","XX","XX"],   
];

//ignore these

elements.melted_butter.reactions.bread = { "elem1": null, "elem2":"brioche" },
elements.water.reactions.fancy_flour = { "elem1": null, "elem2":"fancy_dough" },
elements.wood.reactions.nitrol_fuel = { "elem1":"fueled_wood", "elem2": null },
	
elements.brioche.breakInto = "fancy_flour";
elements.fyrium.breakInto = "fire";

elements.fire.reactions.nitrogen = { "elem1": null, "elem2": "pyrane" },
elements.ash.reactions.pyrane = { "elem1":"pyric_nitrite", "elem2": null },
elements.oil.reactions.pyric_nitrite = { "elem1":"nitrol_fuel", "elem2": null },
elements.hydrogen.reactions.pyrane = { "elem1":"hydroid", "elem2": null },
elements.fire.reactions.fueled_wood = { "elem1": "fire", "elem2": ["rocket", "pyrane", "nitrol_fuel", "explosion", "stench"] };
elements.water.reactions.molten_fyrium = { "elem1": null, "elem2":["fire", "explosion"] },

elements.brioche.breakInto = "fancy_flour";
elements.fyrium.breakInto = "fire";
