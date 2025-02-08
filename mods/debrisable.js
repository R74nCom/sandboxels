elements.microplastic = {
	color: ["#B7BFBF","#c3cccc"],
	behavior: behaviors.POWDER,
	category: "powders",
	tempHigh: 200,
	stateHigh: "dioxin",
    reactions: {
        "water": { elem1:null, elem2:"microplastic_water", chance:0.5 },
    },
	burn: 15,
	burnTime: 350,
	burnInto: "dioxin",
	state: "solid",
	density: 902,
	hidden: true,
}

elements.microplastic_water = {
    color: ["#6491E8","#799EE3","#97B0DA"],
    behavior: behaviors.LIQUID,
    tempHigh: 105,
    stateHigh: ["steam","dioxin"],
    tempLow: -5,
    stateLowName: "plastic_ice",
    viscosity: 10,
    category: "liquids",
    reactions: {
        "rock": { elem2: "wet_sand", chance: 0.0004 },
        "limestone": { elem2: "wet_sand", chance: 0.0004 },
        "plant": { elem1:"water", chance:0.05 },
        "algae": { elem1:"water", chance:0.05 },
        "kelp": { elem1:"water", chance:0.05 },
        "charcoal": { elem1:"water", chance:0.02 },
        "gravel": { elem1:"water", chance:0.01 },
        "fly": { elem2:"dead_bug", chance:0.1, oneway:true },
        "firefly": { elem2:"dead_bug", chance:0.1, oneway:true },
        "bee": { elem2:"dead_bug", chance:0.05, oneway:true },
        "stink_bug": { elem2:"dead_bug", chance:0.1, oneway:true },
        "dirty_water": { elem2:"bubble", attr2:{"clone":"microplastic_water"}, chance:0.001, tempMin:85 },
        "microplastic_water": { elem2:"bubble", attr2:{"clone":"microplastic_water"}, chance:0.001, tempMin:85 },
    },
    hidden: true,
    state: "liquid",
    density: 1018,
    conduct: 0.075,
    extinguish: true
}

elements.glass_fiber = {
    color: ["#5e807d","#679e99"],
    behavior: behaviors.POWDER,
    reactions: {
        "radiation": { elem1:"rad_glass_fiber", chance:0.33 },
        "rad_steam": { elem1:"rad_glass_fiber", elem2:null, chance:0.33 },
        "fallout": { elem1:"rad_glass_fiber", elem2:"radiation", chance:0.1 }
    },
    tempHigh: 1490,
    stateHigh: "molten_glass",
    category: "powders",
    state: "solid",
    density: 2500,
    hidden: true
}

elements.rad_glass_fiber = {
    color: ["#648c64","#6aad83"],
    behavior: behaviors.RADPOWDER,
    tempHigh: 1490,
    stateHigh: "molten_rad_glass",
    category: "powders",
    state: "solid",
    density: 2500,
    hidden: true
}

elements.copper_debris = {
	color: ["#a95232","#be4322","#c76035"],
	behavior: behaviors.SUPPORT,
	reactions: {
        "blood": { elem1:"oxidized_copper", chance:0.01 },
        "infection": { elem1:"oxidized_copper", chance:0.01 },
        "antibody": { elem1:"oxidized_copper", chance:0.01 },
        "fire": { elem1:"oxidized_copper", chance:0.0095 },
    },
    category: "solids",
    tempHigh: 1085,
    stateHigh: "molten_copper",
    density: 8960,
    conduct: 0.95,
    hardness: 0.025,
    fireColor: ["#07BA4F","#00BC5B","#00C2A9","#11B7E7","#C6F2EC"]
}

elements.silver_debris = {
	color: "#cacaca",
    behavior: behaviors.SUPPORT,
    tempHigh: 961.8,
    category: "powders",
    density: 9297,
    conduct: 0.99,
    hardness: 0.25,
    hidden: true
}

elements.iron_debris = {
	color: ["#cbcdcd","#bdbdbd"],
    behavior: behaviors.SUPPORT,
    reactions: {
        "water": { elem1:"rust", chance:0.003 },
        "salt_water": { elem1:"rust", chance:0.01 },
        "dirty_water": { elem1:"rust", chance:0.05 },
        "pool_water": { elem1:"rust", chance:0.05 },
        "sugar_water": { elem1:"rust", chance:0.004 },
        "seltzer": { elem1:"rust", chance:0.007 },
        "salt": { elem1:"rust", chance:0.005 },
        "blood": { elem1:"rust", chance:0.004 },
        "infection": { elem1:"rust", chance:0.004 },
        "antibody": { elem1:"rust", chance:0.004 },
        "fire": { elem1:"rust", chance:0.003 },
        "coffee": { elem1:"rust", chance:0.0004 },
        "tea": { elem1:"rust", chance:0.0004 },
        "broth": { elem1:"rust", chance:0.0004 },
        "juice": { elem1:"rust", chance:0.0004 },
        "nut_milk": { elem1:"rust", chance:0.0004 },
    },
    breakInto: "iron_dust",
    tempHigh: 1538,
    category: "powders",
    density: 7660,
    conduct: 0.47,
    hardness: 0.4,
    darkText: true,
    hidden: true
}

elements.steel_debris = {
	color: ["#888f94","#71797e","#71797e","#71797e"],
    grain: 0.75,
    behavior: behaviors.SUPPORT,
    reactions: {
        "water": { elem1:"rust", chance:0.0025 },
        "salt_water": { elem1:"rust", chance:0.005 },
        "dirty_water": { elem1:"rust", chance:0.04 },
        "pool_water": { elem1:"rust", chance:0.04 },
        "sugar_water": { elem1:"rust", chance:0.0035 },
        "seltzer": { elem1:"rust", chance:0.006 },
        "salt": { elem1:"rust", chance:0.004 },
        "blood": { elem1:"rust", chance:0.003 },
        "infection": { elem1:"rust", chance:0.003 },
        "antibody": { elem1:"rust", chance:0.003 },
        "fire": { elem1:"rust", chance:0.0025 },
        "coffee": { elem1:"rust", chance:0.0003 },
        "tea": { elem1:"rust", chance:0.0003 },
        "broth": { elem1:"rust", chance:0.0003 },
        "juice": { elem1:"rust", chance:0.0003 },
        "nut_milk": { elem1:"rust", chance:0.0003 },
    },
    breakInto: ["iron_debris","iron_debris","iron_dust"],
    tempHigh: 1455.5,
    category: "powders",
    density: 7750,
    conduct: 0.42,
    hardness: 0.8,
    hidden: true
}

elements.zinc_dust = {
	color: ["#8d8c8e","#f6f6f1","#c7c7c5","#ccccca","#6b6a6a","#848382"],
    behavior: behaviors.POWDER,
    tempHigh: 419.53,
    stateHigh: "molten_zinc",
    category: "powders",
    density: 7068,
    conduct: 0.53,
    hardness: 0.1,
    fireColor: ["#91B797","#CAE4CA","#F1F2F0"],
    superconductAt: -272.25
}

elements.tin_scrap = {
    color: ["#9e9d98","#aeada4"],
    behavior: behaviors.SUPPORT,
    tick: function(pixel) {
        if (pixel.temp < 13.2 && Math.random() < 0.0005) {
            changePixel(pixel,"metal_scrap");
        }
        doDefaults(pixel)
    },
    tempHigh: 231.9,
    stateHigh:"molten_tin",
    category: "powders",
    density: 7260,
    conduct: 0.45,
    hardness: 0.15,
    superconductAt: -269.45
}

elements.aluminum_foil = {
    color: "#d2d9db",
    reactions: {
        "radiation": { elem2:"electric", temp1:200 }
    },
    behavior: behaviors.SUPPORT,
    tempHigh: 660.3,
    stateHigh: "molten_aluminum",
    category: "powders",
    density: 2710,
    conduct: 0.73,
    hardness: 0.01,
    breakInto: "aluminum_dust",
    fireColor: "#A7B3BF",
    superconductAt: -271.95
}

elements.aluminum_dust = {
    color: ["#BEC4C6","#C8CFD0","#B1B1B4"],
    reactions: {
        "radiation": { elem2:"electric", temp1:200 }
    },
    behavior: behaviors.POWDER,
    tempHigh: 660.3,
    stateHigh: "molten_aluminum",
    category: "powders",
    density: 2710,
    conduct: 0.73,
    fireColor: "#A7B3BF",
    superconductAt: -271.95
}

elements.tungsten_scrap = {
    color: ["#d4d3cd","#c3c0b8","#bcbaae","#625950"],
    behavior: behaviors.SUPPORT,
    tempHigh: 3422,
    stateHigh: "molten_tungsten",
    category: "powders",
    density: 13300,
    conduct: 0.35,
    superconductAt: -270.65,
    hardness: 0.5
}

elements.brass_scrap = {
    color: ["#cb9e5d","#865e39"],
    behavior: behaviors.SUPPORTPOWDER,
    tempHigh: 927,
    stateHigh: "molten_brass",
    category: "powders",
    density: 7550,
    conduct: 0.22,
    hardness: 0.1,
    hidden: true
}

elements.bronze_coin = {
    color: "#cd7f32",
    behavior: behaviors.POWDER,
    reactions: {
        "water": { elem1:"oxidized_copper", chance:0.00125 },
        "salt_water": { elem1:"oxidized_copper", chance:0.0025 },
        "dirty_water": { elem1:"oxidized_copper", chance:0.02 },
        "pool_water": { elem1:"oxidized_copper", chance:0.02 },
        "sugar_water": { elem1:"oxidized_copper", chance:0.00175 },
        "seltzer": { elem1:"oxidized_copper", chance:0.003 },
        "blood": { elem1:"oxidized_copper", chance:0.0015 },
        "infection": { elem1:"oxidized_copper", chance:0.0015 },
        "antibody": { elem1:"oxidized_copper", chance:0.0015 },
    },
    tempHigh: 913,
    stateHigh: "molten_bronze",
    category: "powders",
    density: 8150,
    conduct: 0.44,
    hardness: 0.15,
    hidden: true
}

elements.gallium_shard = {
    color: ["#b3b3b3","#cccccc","#dbdbdb"],
    behavior: behaviors.POWDER,
    tempHigh: 29.76,
    stateHigh: "molten_gallium",
    category: "powders",
    density: 5100,
    conduct: 0.05,
    hardness: 0.15,
    superconductAt: -272.15,
    hidden: true
}

elements.pyrite_shard = {
    color: ["#e8e0cb","#cdcaaf","#726a53","#8f835e","#bfb9a0",],
    behavior: behaviors.POWDER,
    tempHigh: 1182.5,
    stateHigh: "molten_pyrite",
    category: "powders",
    density: 4900,
    state: "solid",
    conduct: 0.5,
    hardness: 0.6,
    hidden: true,
    alias: "fool's gold coin"
}

elements.solder_debris = {
    color: "#a1a19d",
    behavior: behaviors.SUPPORTPOWDER,
    tempHigh: 200,
    stateHigh: "molten_solder",
    category: "powders",
    density: 8885,
    conduct: 0.43,
    hardness: 0.15,
    hidden: true
}

elements.amber_shard = {
    color: ["#b67f18","#c86305","#cf7a19","#e4ae3a"],
    behavior: behaviors.POWDER,
    tempHigh: 345,
    stateHigh: ["dna","sugar","sugar","steam","smoke","smoke","smoke","smoke","smoke","smoke","sugar","sugar","steam","smoke","smoke","smoke","smoke","smoke","smoke","sugar","sugar","steam","smoke","smoke","smoke","smoke","smoke","smoke"],
    category: "powders",
    hidden: true,
    density: 1250
}

elements.lead_dust = {
    color: ["#6c6c6a","#838381"],
    behavior: behaviors.POWDER,
    reactions: {
        "water": { elem2:"dirty_water", chance:0.5 },
        "salt_water": { elem2:"dirty_water", chance:0.5 },
        "sugar_water": { elem2:"dirty_water", chance:0.5 },
        "seltzer": { elem2:"dirty_water", chance:0.5 },
        "dye": { elem1:null, func:function(pixel1,pixel2){ pixel2.element = "lead_paint"
        }, chance:0.5 },
    },
    tempHigh: 327.5,
    category: "powders",
    density: 8343,
    conduct: 0.41,
    fireColor: ["#DBD1E9","#D7E9F2","#9AB0D1"],
    superconductAt: -265.95,
    hidden: true
}

elements.lead_paint = {
    color: ["#ff0000","#ff8800","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"],
    behavior: behaviors.LIQUID,
    reactions: {
        "water": { elem1:null, elem2:"dirty_water", chance:0.05 },
        "salt_water": { elem1:null, elem2:"dirty_water", chance:0.05 },
        "sugar_water": { elem1:null, elem2:"dirty_water", chance:0.05 },
        "seltzer": { elem1:null, elem2:"dirty_water", chance:0.05 },
        "dirty_water": { elem1:null, chance:0.05 },
        "pool_water": { elem1:null, elem2:"water", chance:0.05 },
        "bleach": { elem1:null, elem2:null, chance:0.05 },
        "cell": { elem2:"dna", chance:0.0015 },
        "blood": { elem2:"infection", chance:0.01 },
        "antibody": { elem2:"blood", chance:0.025 },
        "frog": { elem2:"meat", chance:0.05 },
        "fish": { elem2:"meat", chance:0.05 },
        "rat": { elem2:"rotten_meat", chance:0.05 },
        "bird": { elem2:"rotten_meat", chance:0.05 },
        "ant": { elem2:"dead_bug", chance:0.05 },
        "fly": { elem2:"dead_bug", chance:0.05 },
        "bee": { elem2:"dead_bug", chance:0.05 },
        "stinkbug": { elem2:"dead_bug", chance:0.05 },
        "firefly": { elem2:"dead_bug", chance:0.05 },
        "plant": { elem2:"dead_plant", chance:0.05 },
        "vine": { elem2:"dead_plant", chance:0.05 },
        "cactus": { elem2:"dead_plant", chance:0.05 },
        "sapling": { elem2:"dead_plant", chance:0.05 },
        "grass": { elem2:"dead_plant", chance:0.05 },
        "head": { func:behaviors.KILLPIXEL2, chance:0.005 },
    },
    viscosity: 900,
    customColor: true,
    stain: 0.69,
    tempHigh: 100,
    stateHigh: "smoke",
    category: "liquids",
    state: "liquid",
    density: 1252,
    stainSelf: true,
    hidden: true
}

elements.nickels = {
    color: "#6C7474",
    behavior: behaviors.POWDER,
    tempHigh: 1064,
    stateHigh: "molten_nickel",
    category: "powders",
    state: "solid",
    density: 19300,
    conduct: 0.78,
    hardness: 0.2
}

elements.iron_dust = {
	color: ["#888f94","#71797e","#71797e"],
    grain: 0.85,
    behavior: behaviors.POWDER,
    reactions: {
        "water": { elem1:"rust_dust", chance:0.003 },
        "salt_water": { elem1:"rust_dust", chance:0.01 },
        "dirty_water": { elem1:"rust_dust", chance:0.05 },
        "pool_water": { elem1:"rust_dust", chance:0.05 },
        "sugar_water": { elem1:"rust_dust", chance:0.004 },
        "seltzer": { elem1:"rust_dust", chance:0.007 },
        "salt": { elem1:"rust_dust", chance:0.005 },
        "blood": { elem1:"rust_dust", chance:0.004 },
        "infection": { elem1:"rust_dust", chance:0.004 },
        "antibody": { elem1:"rust_dust", chance:0.004 },
        "fire": { elem1:"rust_dust", chance:0.003 },
        "coffee": { elem1:"rust_dust", chance:0.0004 },
        "tea": { elem1:"rust_dust", chance:0.0004 },
        "broth": { elem1:"rust_dust", chance:0.0004 },
        "juice": { elem1:"rust_dust", chance:0.0004 },
        "nut_milk": { elem1:"rust_dust", chance:0.0004 },
    },
    tempHigh: 1538,
    stateHigh: "molten_iron",
    category: "powders",
    density: 7560,
    conduct: 0.47,
    hardness: 0.4,
    darkText: true,
    hidden: true
}

elements.rust_dust = {
	color: ["#ae551c","#bc6e39","#925f49"],
    behavior: behaviors.POWDER,
    tempHigh: 1538,
    stateHigh: "molten_iron",
    category: "powders",
    state: "solid",
    density: 5250,
    conduct: 0.37,
    hardness: 0.3,
    alias: "iron oxide",
    hidden: true
}

elements.concrete_rubble = {
    color: ["#9E9E9E","#929292","#858585","#7F7F7F"],
    behavior: behaviors.STURDYPOWDER,
    category: "powders",
    tempHigh: 1490,
    stateHigh: "magma",
    state: "solid",
    density: 1650,
    hardness: 0.25,
    hidden: true
}

elements.wood_scrap = {
    color: ["#a0522d","#955637"],
    behavior: behaviors.SUPPORT,
    renderer: renderPresets.WOODCHAR,
    tempHigh: 395,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "powders",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.1,
    breakInto: "sawdust",
    hidden: true
}

elements.bamboo_debris = {
    color: ["#87B026","#8B9D2F",],
    behavior: behaviors.SUPPORT,
    tempHigh: 380,
    stateHigh: ["ember","fire","fire","fire"],
    burn: 10,
    burnTime: 200,
    burnInto: ["ember","fire","fire","fire"],
    category: "powders",
    state: "solid",
    density: 686,
    breakInto: ["sawdust","sawdust","sawdust","sawdust","sawdust","sawdust","sawdust","sawdust","sawdust","sawdust","sawdust","sawdust","sawdust","sawdust","sawdust","sawdust","sawdust","sawdust","sawdust","sawdust","sawdust","sawdust","sawdust","sawdust","sawdust","sawdust","sawdust","sawdust","bamboo_plant"],
    hidden: true
}

elements.ground_meat = {
    color: ["#A74142","#C05B50","#D67970","#AA4248"],
    behavior: behaviors.SUPPORTPOWDER,
    reactions: {
        "dirty_water": { elem1:"rotten_meat", chance:0.1 },
        "fly": { elem1:"rotten_meat", chance:0.2 },
        "dioxin": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cancer": { elem1:"rotten_meat", chance:0.1 },
        "plague": { elem1:"rotten_meat", elem2:null, chance:0.3 },
        "ant": { elem1:"rotten_meat", chance:0.1 },
        "worm": { elem1:"rotten_meat", chance:0.1 },
        "rat": { elem1:"rotten_meat", chance:0.3 },
        "mushroom_spore": { elem1:"rotten_meat", chance:0.1 },
        "mushroom_stalk": { elem1:"rotten_meat", chance:0.1 },
        "mycelium": { elem1:"rotten_meat", chance:0.1 },
        "hyphae": { elem1:"rotten_meat", chance:0.1 },
        "mercury": { elem1:"rotten_meat", elem2:null, chance:0.2 },
        "mercury_gas": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "virus": { elem1:"rotten_meat", chance:0.1 },
        "poison": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "infection": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "ink": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "acid": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "acid_gas": { elem1:"rotten_meat", chance:0.4 },
        "cyanide": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "cyanide_gas": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "rotten_cheese": { elem1:"rotten_meat", chance:0.02 },
        "fallout": { elem1:"rotten_meat", chance:0.2 },
        "water": { elem2:"broth", tempMin:70 },
        "salt_water": { elem2:"broth", tempMin:70 },
        "sugar_water": { elem2:"broth", tempMin:70 },
        "seltzer": { elem2:"broth", tempMin:70 },
        "salt": { elem1:"cured_meat" },
        "vinegar": { elem1:"cured_meat", chance:0.1 },
    },
    tempHigh: 100,
    stateHigh: "cooked_meat",
    tempLow: -18,
    stateLow: "frozen_meat",
    category:"food",
    burn:15,
    burnTime:200,
    burnInto:"cooked_meat",
    state: "solid",
    density: 1019.5,
    conduct: 0.2,
    isFood: true,
    hidden: true
}

elements.rotten_ground_meat = {
    color: ["#BEA16A","#BE896A"],
    behavior: [
        "XX|CR:plague,stench,stench,stench,fly%0.25 AND CH:ground_meat>rotten_ground_meat%1 AND CH:meat>rotten_meat%1|XX",
        "SP%99 AND CH:ground_meat>rotten_ground_meat%1 AND CH:meat>rotten_meat%1|XX|SP%99 AND CH:ground_meat>rotten_ground_meat%1 AND CH:meat>rotten_meat%1",
        "M2|M1 AND CH:ground_meat>rotten_ground_meat%1 AND CH:meat>rotten_meat%1|M2",
    ],
    reactions: {
        "water": { elem2:"broth", tempMin:70, color2:"#d7db69" },
        "salt_water": { elem2:"broth", tempMin:70, color2:"#d7db69" },
        "sugar_water": { elem2:"broth", tempMin:70, color2:"#d7db69" },
        "dirty_water": { elem2:"broth", tempMin:70, color2:"#d7db69" },
        "seltzer": { elem2:"broth", tempMin:70, color2:"#d7db69" }
    },
    tempHigh: 300,
    stateHigh: ["plague","ash","ammonia"],
    category:"food",
    hidden: true,
    burn:12,
    burnTime:200,
    burnInto:["plague","ash","ammonia"],
    state: "solid",
    density: 1005,
    conduct: 0.1,
    isFood: true,
    hidden: true
}

elements.cured_ground_meat = {
    color: ["#C45452","#CD7873","#E09693","#C2585D"],
    behavior: behaviors.SUPPORTPOWDER,
    reactions: {
        "water": { elem2:"broth", tempMin:70 },
        "salt_water": { elem2:"broth", tempMin:70 },
        "sugar_water": { elem2:"broth", tempMin:70 },
        "seltzer": { elem2:"broth", tempMin:70 },
    },
    tempHigh: 100,
    stateHigh: "cooked_meat",
    category:"food",
    burn:15,
    burnTime:200,
    burnInto:"cooked_meat",
    state: "solid",
    density: 1019.5,
    conduct: 0.3,
    isFood: true,
    hidden: true
}

elements.scrap_paper = {
    color: ["#ffffff","#e6e6e6"],
    behavior: behaviors.POWDER,
    reactions: {
        "water": { elem1:"cellulose", elem2:null },
        "dirty_water": { elem1:"cellulose", elem2:null },
        "salt_water": { elem1:"cellulose", elem2:null },
        "sugar_water": { elem1:"cellulose", elem2:null },
        "seltzer": { elem1:"cellulose", elem2:null },
        "soda": { elem1:"cellulose", elem2:null },
        "blood": { elem1:"cellulose", elem2:null },
        "foam": { elem1:"cellulose", elem2:null },
        "bubble": { elem1:"cellulose", elem2:null },
        "oil": { elem1:"cellulose", elem2:null },
        "alcohol": { elem1:"cellulose", elem2:null },
        "vinegar": { elem1:"cellulose", elem2:null },
        "light": { stain1:"#ebdfa7" },
        "oxygen": { stain1:"#ebdfa7" }
    },
    tempHigh: 248,
    stateHigh: ["fire","fire","fire","fire","fire","ash"],
    burn: 70,
    burnTime: 300,
    burnInto: ["fire","fire","fire","fire","fire","ash"],
    category: "powders",
    state: "solid",
    density: 1195,
    breakInto: "confetti",
    breakIntoColor: ["#ffffff","#e6e6e6","#dbdbdb"],
    hidden: true
}

elements.cloth_scrap = {
    color: ["#F7F7F7","#F1F1F1","#E8E8E8","#CDCDCD","#e6e6e6","#dbdbdb"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        behaviors.ABSORB(pixel,1,0.01);
    },
    onBreak: behaviors.RELEASE_MOISTURE,
    onDelete: behaviors.RELEASE_MOISTURE,
    reactions: {
        "water":{}, "salt_water":{}, "sugar_water":{}, "dirty_water":{}, "pool_water":{}, "seltzer":{},
    },
    tempHigh: 405,
    stateHigh: "fire",
    burn: 6,
    burnTime: 350,
    burnInto: ["smoke","smoke","smoke","smoke","ash"],
    category: "powders",
    state: "solid",
    breakInto: "dust",
    movable:false,
    breakIntoColor: ["#f7f7f7","#dbdbdb"],
    hidden: true
}

elements.snow_nine = {
    color: ["#C6E9F9","#CCF0FC","#D7FAFC"],
    behavior: [
        "XX|XX|XX",
        "XX|CH:snow%0.5|XX",
        "M2|M1|M2",
    ],
    reactions: {
        "water": { elem2: ["ice_nine","snow_nine"] },
        "salt_water": { elem2: ["ice_nine","snow_nine"] },
        "dirty_water": { elem2: ["ice_nine","snow_nine"] },
        "sugar_water": { elem2: ["ice_nine","snow_nine"] },
        "seltzer": { elem2: ["ice_nine","snow_nine"] },
        "pool_water": { elem2: ["ice_nine","snow_nine"] },
        "steam": { elem2: "snow_nine" },
        "rain_cloud": { elem2: "snow_nine" },
        "cloud": { elem2: "snow_nine" },
        "snow_cloud": { elem2: "snow_nine" },
        "hail_cloud": { elem2: ["ice_nine","snow_nine"] },
        "thunder_cloud": { elem2: ["ice_nine","snow_nine"] },
        "snow": { elem2: "snow_nine", chance: 0.05 },
        "smog": { elem2: "snow_nine" },
        "rad_steam": { elem2: "snow_nine" }
    },
    temp:-100,
    category: "special",
    state: "solid",
    density: 917,
    hidden: true,
    excludeRandom: true
}

elements.antiice = {
    color: "#EAEFF6",
    behavior: behaviors.WALL,
    category:"special",
    tempHigh: 5,
    stateHigh: "antifluid",
    temp: -5,
    state: "solid",
    density: 100,
    hidden: true
}

elements.antisnow = {
    color: "#D8E8F3",
    behavior: behaviors.AGPOWDER,
    category:"special",
    tempHigh: 18,
    stateHigh: "antifluid",
    temp: -5,
    state: "solid",
    density: 995,
    hidden: true
}


elements.plastic.breakInto = ["microplastic","microplastic","microplastic","microplastic","glitter"]

elements.amber.breakInto = "amber_shard"

elements.insulation.breakInto = ["microplastic","glass_fiber","cloth_scrap","dust"]

elements.bead.breakInto = ["microplastic","microplastic","microplastic","glitter"]

elements.wire.breakInto = ["microplastic","glass_fiber","copper_debris","silver_debris","glass_fiber","copper_debris","silver_debris"]

elements.copper.breakInto = ["copper_debris"]

elements.silver.breakInto = ["silver_debris"]

elements.zinc.breakInto = ["zinc_dust"]

elements.tin.breakInto = ["tin_scrap"]

elements.tin.tick = function(pixel) {
    if (pixel.temp < 13.2 && Math.random() < 0.0005) {
        changePixel(pixel,"tin_scrap");
    }
    doDefaults(pixel)
}

elements.iron.breakInto = ["iron_debris","iron_debris","iron_debris","iron_debris","iron_dust"]

elements.lead.breakInto = ["lead_dust"]

elements.steel.breakInto = ["steel_debris","steel_debris","steel_debris","iron_debris","iron_dust"]

elements.galvanized_steel.breakInto = ["steel","steel","steel","steel","steel","steel","steel","steel","steel_debris"]

elements.rust.breakInto = ["rust_dust"]

elements.concrete.breakInto = ["concrete_rubble"]

elements.wood.breakInto = ["wood_scrap","wood_scrap","wood_scrap","wood_scrap","sawdust"]

elements.meat.breakInto = ["ground_meat"]

elements.cured_meat.breakInto = ["cured_ground_meat"]

elements.rotten_meat.breakInto = ["rotten_ground_meat"]

elements.paper.breakInto = ["scrap_paper"]

elements.paper.breakIntoColor = ["#ffffff","#e6e6e6"]

elements.cloth.breakInto = ["cloth_scrap"]

elements.bamboo.breakInto = ["bamboo_debris","bamboo_debris","bamboo_debris","bamboo_debris","bamboo_debris","bamboo_debris","bamboo_debris","bamboo_debris","bamboo_debris","bamboo_debris","bamboo_debris","bamboo_debris","bamboo_debris","bamboo_debris","bamboo_plant"]

elements.nickel.breakInto = ["nickels"]

elements.aluminum.breakInto = ["aluminum_foil"]

elements.tungsten.breakInto = ["tungsten_scrap"]

elements.brass.breakInto = ["brass_scrap"]

elements.bronze.breakInto = ["bronze_coin"]

elements.sterling.breakInto = ["silver_debris"]

elements.gallium.breakInto = ["gallium_shard"]

elements.pyrite.breakInto = ["pyrite_shard"]

elements.solder.breakInto = ["solder_debris"]

elements.straw.breakInto = ["flour","flour","dust"]

elements.ice_nine.breakInto = "snow_nine"

elements.art.breakInto = "dye"

elements.udder.breakInto = ["blood","blood","meat","meat","meat","meat","milk"]

elements.antiice.breakInto = "antisnow"

elements.antigas.stateHigh = {}

elements.antigas.tempHigh = {}
