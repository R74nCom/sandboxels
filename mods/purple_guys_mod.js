elements.super_bomb = {
    color: "#551c41",
    behavior: [
        "XX|EX:125|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:125|M2",
    ],
    category: "Purple Guy's Mod", 
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.mega_bomb = { 
    color: "#736e7e", 
    behavior: [
        "XX|EX:350|XX", 
        "XX|XX|XX",
        "M2|M1 AND EX:350|M2",
    ],
    category: "Purple Guy's Mod", 
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.ultra_bomb = { 
    color: "#79910a", 
    behavior: [
        "XX|EX:500>plasma2|XX", 
        "XX|XX|XX",
        "M2|M1 AND EX:500>plasma2|M2",
    ],
    category: "Purple Guy's Mod", 
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.ice_cream_bomb = { 
    color: "#ffffff", 
    behavior: [
        "XX|EX:20>ice_cream|XX", 
        "XX|XX|XX",
        "M2|M1 AND EX:20>ice_cream|M2",
    ],
    category: "Purple Guy's Mod", 
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}


elements.dirty_sand = { 
    color: ["#a35222", "#a15122", "#7e3f1a", "#f4ba9a", "#fed3ba", "#f2b796"],
    behavior: behaviors.POWDER,
    category: "Purple Guy's Mod", 
    state: "solid",
    density: 2822
}

elements.wet_dirty_sand = { 
    color: ["#a35210", "#a15110", "#7e3f0a", "#f4ba8a", "#fed2ba", "#f2b784"],
    behavior: behaviors.POWDER,
    category: "Purple Guy's Mod", 
    state: "liquid",
    density: 2822
}

elements.reverse_gravity_liquid = { 
    color: "#cdd7e2",
    behavior: behaviors.AGLIQUID	,
    category: "Purple Guy's Mod", 
    state: "liquid",
    density: 50
}

elements.reverse_soda = { 
    color: ["#5f2706", "#48230d", "#52250a"],
    behavior: behaviors.AGLIQUID	,  behavior: [
        "M2|M1|M2",
        "M2|XX|M2",
        "XX|CR:foam%3|XX",
    ],

    category: "Purple Guy's Mod", 
    state: "liquid",
    density: 1030
}

elements.negatively_dense_liquid = { 
    color: "#94ffd1",
    behavior: behaviors.LIQUID	,
    category: "Purple Guy's Mod", 
    state: "liquid",
    density: -2000
}

elements.plasma2 = { 
    color: "#caf7ff",
    behavior: behaviors.DGAS	,
    category: "Purple Guy's Mod", 
    state: "gas",
    density: 50000,
    temp:500000
}

elements.negative_fire = { 
    color: ["#a6bfc4", "#6bd2e4", "#b8dee4", "#32cae4"],
    behavior: behaviors.DGAS	,
    category: "Purple Guy's Mod", 
    state: "gas",
    density: -0.1,
    temp:-20000
}

elements.coldest_bomb = { 
    color: "#fffff0", 
    behavior: [
        "XX|EX:55>negative_fire|XX", 
        "XX|XX|XX",
        "M2|M1 AND EX:55>negative_fire|M2",
    ],
    category: "Purple Guy's Mod", 
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.reinforced_wall = { 
    color: "#ffff01", 
    behavior: behaviors.WALL,
    category: "Purple Guy's Mod", 
    state: "solid",
    density: 1300,
    hardness:10^81
}

elements.unreinforced_wall = { 
    color: "#ffff82", 
    behavior: behaviors.WALL,
    category: "Purple Guy's Mod", 
    state: "solid",
    density: 1300,
    hardness:0
}

elements.reinforced_liquid_wall = { 
    color: "#ffff01", 
    behavior: behaviors.WALL,
    category: "Purple Guy's Mod", 
    state: "liquid",
    density: 1300,
    hardness:10^81
}


if (!elements.sand.reactions) { elements.sand.reactions = {} }
elements.sand.reactions.dirt = { elem1:"dirty_sand", elem2:"dirty_sand" }

if (!elements.dirty_sand.reactions) { elements.dirty_sand.reactions = {} }
elements.dirty_sand.reactions.water = { elem1:"wet_dirty_sand", elem2:"wet_dirty_sand" }

if (!elements.soda.reactions) { elements.soda.reactions = {} }
elements.soda.reactions.reverse_gravity_liquid = { elem1:"reverse_soda", elem2:"reverse_soda" }

if (!elements.wall.reactions) { elements.wall.reactions = {} }
elements.wall.reactions.plasma2 = { elem1:"plasma2", elem2:"plasma2" }