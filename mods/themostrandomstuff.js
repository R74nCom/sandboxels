elements.clump = {
    color: ["#1e0042", "#7d4db8"],
    behavior: behaviors.STURDYPOWDER,
    category: "mythic",
    state: "solid",
    stateHigh: "ash",
    tempHigh: 500,
    tempLow: -45,
    stateLow: "ice",
    desc: "first element",
}
elements.block = {
    color: "#9e0000",
    behavior: behaviors.WALL,
    category: "mythic",
    state: "solid",
    reactions: {
		"clump": { elem1: "gassed", elem2: "oil" },
    }
}
elements.plok = {
    color: "#d4d4d4",
    behavior: behaviors.LIQUID,
    category: "mythic",
    state: "liquid",
}
elements.gassed = {
    color: "#1c2a7a",
    behavior: behaviors.GAS,
    category: "mythic",
    state: "gas",
    reactions: {
		"plok": { elem1: "clump", elem2: "clump" },
    }
}
elements.pilnol = {
    color: "#290052",
    behavior: behaviors.LIQUID,
    category: "mythic",
    state: "liquid",
    stateHigh: "ash",
    tempHigh: 500,
    tempLow: -10,
    stateLow: "block",
}
elements.plox = {
    color: "#FFFFFF",
    behavior: behaviors.POWDER,
    category: "mythic",
    state: "solid",
    desc: "It just... exists."
}
elements.philosophers_stone = {
    color: "#FFD700",
    behavior: behaviors.POWDER,
    category: "mythic",
    state: "solid",
    reactions: {
        "silver": { elem1: "gold", elem2: "gold" },
        "zinc": { elem1: "gold", elem2: "gold" },
        "aluminum": { elem1: "gold", elem2: "gold" },
        "steel": { elem1: "gold", elem2: "gold" },
        "nickel": { elem1: "gold", elem2: "gold" },
    }
}
elements.xnopyt = {
    color: "#FF0000",
    behavior: behaviors.POWDER,
    category: "mythic",
    state: "solid",
    tempHigh: 200,
    stateHigh: "n_explosion",
    desc: "Then, xnopyt, AAAAA...."
}
elements.midas_touch_alternate = {
    color: "#FFD700",
    behavior: behaviors.POWDER,
    category: "mythic",
    state: "solid",
    reactions: {
        "head": { elem1: "gold", elem2:"gold" },
        "body": { elem1: "gold", elem2:"gold" }
    },
    desc: "This is made before the midas touch released."
}
elements.tainted_flesh = {
    breakInto: "dead_tainted_flesh",
    color: "#0a0014",
    behavior: behaviors.WALL,
    category: "mythic",
    state: "solid",
    reactions: {
        "meat": { elem1: "rotten_meat", elem2:"rotten_meat" },
        "cheese": { elem1: "rotten_cheese", elem2: "rotten_cheese" }
    },
}
elements.mold = {
    color: "#347557",
    behavior: behaviors.POWDER,
    category: "mythic",
    state: "solid",
    reactions: {
        "meat": { elem1: "rotten_meat", elem2:"rotten_meat" },
        "cheese": { elem1: "rotten_cheese", elem2: "rotten_cheese" }
    },
    desc: "Don't eat this, it's moldy! Ew."
}
elements.dead_tainted_flesh = {
    hidden: true,
    color: "#290e63",
    behavior: behaviors.POWDER,
    category: "mythic",
    state: "solid",
}
elements.core = {
    temp: 10000,
    color: "#add8e6",
    behavior: behaviors.WALL,
    category: "mythic",
    state: "gas",
    tempHigh: 100000,
    stateHigh: "supernova",
    desc: "DO NOET HEET IT UP1!!!11!!1!1",
}
elements.sand_exploder = {
    color: "#ff0000",
    tool: function(pixel) {
        if (pixel.element == "sand") {
            pixel.element = "explosion"
        }
    },
    category: "tools",
}
elements.tainted_flesh_exploder = {
    color: "#0a0014",
    tool: function(pixel) {
        if (pixel.element == "tainted_flesh") {
            pixel.element = "explosion"
        }
    },
    category: "tools",
}
elements.thelm = {
    color: "#0a0014",
    behavior: behaviors.POWDER,
    category: "mythic",
    state: "solid",
    tempHigh: 9000,
    stateHigh: "plok",
    desc: "ITS OVER 9000!",
}
elements.klome = {
    color: "#ffffff",
    behavior: behaviors.POWDER,
    category: "mythic",
    state: "solid",
    tempHigh: 500,
    stateHigh: "thelm",
    tempLow: -50,
    stateLow: "plox",
    desc: "I don't think that's sugar.",
}
elements.lard = {
    color: "#f5efe9",
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    tempHigh: 50,
    stateHigh: "liquid_lard",
    burn: 50,
    burnTime: 100,
    burnInto: ["smoke", "ash"],
    isFood: true,
}
elements.liquid_lard = {
    color: "#fff8f6",
    behavior: behaviors.LIQUID,
    category: "food",
    state: "liquid",
    tempHigh: 100,
    stateHigh: "steam",
    tempLow: 50,
    stateLow: "lard",
    burn: 40,
    burnTime: 80,
    burnInto: ["smoke", "steam"],
}
elements.vanilla_extract = {
    color: "#5C4033",
    behavior: behaviors.LIQUID,
    category: "food",
    state: "liquid",
    tempHigh: 100,
    stateHigh: "steam",
    tempLow: 1,
    stateLow: "ice",
    reactions: {
        "soda": { elem1: "nuka_cola", elem2: "nuka_cola" }
    },
    desc: "hi, i'm vanilla extract."
}
elements.nuka_cola = {
    hidden: true,
    color: "#522d05",
    behavior: behaviors.LIQUID,
    category: "fallout",
    state: "liquid",
    tempHigh: 100,
    stateHigh: "carbon_dioxide",
    tempLow: 1,
    stateLow: "ice",
    reactions: {
        "uranium": { elem1: "nuka_cola_quantum", elem2: "nuka_cola_quantum" }
    },
    desc: "A refreshing Nuka-Cola!"
}
elements.nuka_cola_quantum = {
    hidden: true,
    color: "#54e5ff",
    behavior: behaviors.LIQUID,
    category: "fallout",
    state: "liquid",
    tempHigh: 100,
    stateHigh: "carbon_dioxide",
    tempLow: 1,
    stateLow: "ice",
    desc: "A refreshing Nuka-Cola Quantum!"
}
elements.cabbage = {
    color: ["#d0e3a8", "#dee8ca"],
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    tempHigh: 200,
    stateHigh: "ash",
    tempLow: 1,
    stateLow: "ice",
    isFood: true,
    reactions: {
        salt: { elem1: "sauerkraut", elem2: "sauerkraut" }
    },
    desc: "It's cabbage."
}
elements.sauerkraut = {
    color: ["#979704", "#999904"],
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    tempHigh: 200,
    stateHigh: "ash",
    tempLow: 1,
    stateLow: "ice",
    isFood: true,
    desc: "Awww, big bowl of sauerkraut! Every single morning! It was driving me crazy!"
}
elements.sulfuric_acid = {
    color: "#ededed",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    tempHigh: 100,
    stateHigh: "steam",
    tempLow: 1,
    stateLow: "ice",
    reactions: {
        pool_water: { elem1: "grey_mixture", elem2: "grey_mixture" }
    },
}
elements.grey_mixture = {
    color: "#808080",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    tempHigh: 100,
    stateHigh: "brown_mixture",
    tempLow: 1,
    stateLow: "ice",
}
elements.brown_mixture = {
    color: "#7d6648",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    tempHigh: 500,
    stateHigh: "steam",
    tempLow: 1,
    stateLow: "ice",
    reactions: {
        metal_scrap: { elem1: "brown_mixture", elem2: "brown_mixture" },
        methylamine: { elem1: "solid_blue_crystal", elem2: "solid_blue_crystal" }
    },
}
elements.methylamine = {
    color: "#ededed",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    tempHigh: 200,
    stateHigh: "steam",
    tempLow: 20,
    stateLow: "ice",
}
elements.solid_blue_crystal = {
    breakInto: "not_suspicious_blue_crystal",
    color: "#00eaff",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    tempHigh: 500,
    stateHigh: "ash",
    tempLow: 20,
    stateLow: "ice",
}
elements.not_suspicious_blue_crystal = {
    color: ["#00eaff", "#3ddfff"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    tempHigh: 200,
    stateHigh: "melted_blue_crystal",
    tempLow: -20,
    stateLow: "blue_crystal_ice",
    desc: "It's not what it looks like!",
}
elements.melted_blue_crystal = {
    color: "#00bbff",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    tempHigh: 500,
    stateHigh: "steam",
    tempLow: 20,
    stateLow: "not_suspicious_blue_crystal",
}
elements.blue_crystal_ice = {
    color: "#29eaff",
    behavior: behaviors.WALL,
    category: "states",
    state: "solid",
    tempHigh: 1,
    stateHigh: "not_suspicious_blue_crystal",
}
elements.silt = {
    color: "#a8947d",
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    tempHigh: 1200,
    stateHigh: "molten_dirt",
    tempLow: -50,
    stateLow: "permafrost",
    reactions: {
        water: { elem1: "mud", elem2: "mud" },
        clay: { elem1: "silty_clay", elem2: "silty_clay" }
    },
}
elements.marble = {
    breakInto: "dust",
    color: "#e5e5e5",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    tempHigh: 1339,
    stateHigh: "magma",
}
elements.silty_clay = {
    hidden: true,
    color: "#a67d5a",
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    tempHigh: 1700,
    stateHigh: ["molten_dirt", "molten_glass",],
    tempLow: -50,
    stateLow: "permafrost",
    reactions: {
        sand: { elem1: "loam", elem2: "loam" }
    },
}
elements.loam = {
    hidden: true,
    color: "#8c5a3c",
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    tempHigh: 1700,
    stateHigh: ["molten_dirt", "porcelain", "molten_glass",],
    tempLow: -50,
    stateLow: "permafrost",
    reactions: {
        dead_plant: { elem1: "peat", elem2: "peat" }
    },
}
elements.granite = {
    color: ["#946553", "#483028", "#a99187"],
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    tempHigh: 1260,
    stateHigh: "magma",
}
elements.diorite = {
    color: ["#e4e5e5", "#bbbbbc", "#888888"],
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    tempHigh: 1300,
    stateHigh: "magma",
}
elements.andesite = {
    color: ["#666767", "#a4a796", "#87868a"],
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    tempHigh: 1250,
    stateHigh: "magma",
}
elements.rhyolite = {
    color: ["#917971", "#6b4b3e", "#bdaaa4"],
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    tempHigh: 722,
    stateHigh: "magma",
}
elements.gabbro = {
    color: ["#353434", "#aeada1", "#95866d"],
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    tempHigh: 1175,
    stateHigh: "magma",
}
elements.obsidian = {
    breakInto: "obsidian_shard",
    color: ["#010101", "#3b2752", "#261d3c"],
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    tempHigh: 1100,
    stateHigh: "magma",
}
elements.obsidian_shard = {
    hidden: true,
    color: ["#020202", "#4e3d61", "#2d263d"],
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    tempHigh: 1100,
    stateHigh: "magma",
}
elements.chalk = {
    breakInto: "dust",
    color: "#FFFFFF",
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    tempHigh: 1000,
    stateHigh: "dust",
}
elements.slate = {
    color: ["#424140", "#8b8a8d", "#434143"],
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    tempHigh: 2000,
    stateHigh: "magma",
}
elements.quartz = {
    color: ["#e4dfd7", "#f7f4f3", "#b7a58e"],
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    tempHigh: 1678,
    stateHigh: "magma",
}
elements.sandstone = {
    breakInto: "sand",
    color: ["#D2B48C", "#e6ddae", "#d1c192", "#dad1a4"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "XX|M1|XX",
    ],
    category: "land",
    state: "solid",
    tempHigh: 1000,
    stateHigh: "sand",
}
elements.lignite = {
    color: "#3d3f43",
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    tempHigh: 214,
    stateHigh: "charcoal",
}
elements.conglomerate = {
    color: ["#9b7a5e", "#b09760", "#bdb397", "#a98a75", "#b89961", "#bab2a1"],
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    tempHigh: 118,
    stateHigh: "charcoal",
}
elements.dacite = {
    color: ["#817a70", "#646c63", "#d6d2d4"],
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    tempHigh: 900,
    stateHigh: "magma",
}
elements.peat = {
    hidden: true,
    color: ["#5c4033", "#6e4f3a", "#4e3728"],
    behavior: behaviors.STURDYPOWDER,
    category: "land",
    tempHigh: 100,
    stateHigh: "lignite",
    state: "solid",
    density: 500,
};
