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
    behavior: behaviors.AGFLUID	,
    category: "Purple Guy's Mod", 
    state: "liquid",
    density: 50
}

elements.reverse_soda = { 
    color: ["#5f2706", "#48230d", "#52250a"],
    behavior: behaviors.AGFLUID	,  behavior: [
        "M2|M1|M2",
        "M2|XX|M2",
        "XX|CR:foam%3|XX",
    ],
    category: "Purple Guy's Mod", 
    state: "liquid",
    density: 1030
}

if (!elements.sand.reactions) { elements.sand.reactions = {} }
elements.sand.reactions.dirt = { elem1:"dirty_sand", elem2:"dirty_sand" }

if (!elements.dirty_sand.reactions) { elements.dirty_sand.reactions = {} }
elements.dirty_sand.reactions.water = { elem1:"wet_dirty_sand", elem2:"wet_dirty_sand" }

if (!elements.soda.reactions) { elements.soda.reactions = {} }
elements.soda.reactions.reverse_gravity_liquid = { elem1:"reverse_soda", elem2:"reverse_soda" }