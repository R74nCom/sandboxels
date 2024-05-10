elements.scissor = {
    color: ["#CCCCCC","#999999","#808080","#71797E"],
    category: "weapons",
    behavior: behaviors.STURDYPOWDER,
    state: "solid",
    density: 7850,
    tempHigh: 1455.5,
    stateHigh: "molten_steel",
    reactions: {
        "rock": { elem1:null },
        "paper": { elem2:null },
        "head": { elem2:["blood","meat"], chance:0.005 },
        "body": { elem2:["blood","meat"], chance:0.005 },
    },
    hardness: 0.75,
    conduct: 0.32,
}

elements.rock.reactions = {
    "fly": { elem2:"dead_bug", chance:0.25, oneway:true },
    "firefly": { elem2:"dead_bug", chance:0.2, oneway:true },
    "stink_bug": { elem2:"dead_bug", chance:0.15, oneway:true },
    "bee": { elem2:"dead_bug", chance:0.1, oneway:true },
    "bird": { elem2:"feather", chance:0.025, oneway:true },
    "egg": { elem2:"yolk", oneway:true },
    "bone": { elem2:"oil", tempMin:300, chance:0.005, oneway:true },
    "dead_plant": { elem2:"charcoal", tempMin:200, chance:0.005, oneway:true },
    "charcoal": { elem2:"diamond", tempMin:800, tempMax:900, chance:0.005, oneway:true },
    "sand": { elem2:"packed_sand", tempMin:500, chance:0.005, oneway:true },
    "wet_sand": { elem2:"packed_sand", chance:0.005, oneway:true },
    "paper": { elem1:null },
}