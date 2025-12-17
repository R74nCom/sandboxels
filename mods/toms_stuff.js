// made by me haha
// didn't expect that, didn't you?
console.log('oh no')

// My Testing Stuff
elements.solid_element = {
    color: "#287cb8",
    behaviors: behaviors.WALL,
    category: "My Stuff",
    state: "solid",
    stateHigh: "ash",
    tempHigh: "2345",
    tempLow: "-234",
    stateLow: "ice",
    desc: "Test solid"
}
elements.liquid_element = {
    color: "#00eeff",
    behavior: behaviors.LIQUID,
    category: "My Stuff",
    state: "liquid",
    stateHigh: "steam",
    tempHigh: "2345",
    tempLow: "-234",
    stateLow: "ice",
    desc: "Test liquid"
}

// i based this off of cell machine
// movers
elements.mover = {
    color: "#2f00ff",
    behavior: [
        "XX|XX|XX",
        "XX|XX|M1",
        "XX|XX|XX",
    ],
    category: "Movers",
    state: "solid",
    stateHigh: "molten_metal",
    tempHigh: "2500",
    tempLow: "-2345",
    stateLow: "ice",
    desc: "Right mover"
}

elements.reverse_mover = {
    color: "#2f00ff",
    behavior: [
        "XX|XX|XX",
        "M1|XX|XX",
        "XX|XX|XX",
    ],
    category: "Movers",
    state: "solid",
    stateHigh: "molten_metal",
    tempHigh: "2500",
    tempLow: "-2345",
    stateLow: "ice",
    desc: "Left mover"
}

elements.up_mover = {
    color: "#2f00ff",
    behavior: [
        "XX|M1|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    category: "Movers",
    state: "solid",
    stateHigh: "molten_metal",
    tempHigh: "2500",
    tempLow: "-2345",
    stateLow: "ice",
}

elements.down_mover = {
    color: "#2f00ff",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
    category: "Movers",
    state: "solid",
    stateHigh: "molten_metal",
    tempHigh: "2500",
    tempLow: "-2345",
    stateLow: "ice",
}

// converter
elements.sand_converter = {
    color: "#000397",
    behavior: [
        "XX|XX|CH:sand",
        "XX|XX|M1",
        "XX|XX|CH:sand",
    ],
    category: "Movers",
    state: "solid",
    stateHigh: "molten_metal",
    tempHigh: "2500",
    tempLow: "-2345",
    stateLow: "ice",
}
// trashes
elements.trash = {
    color: "#ff00ff",
    behavior: [
        "XX|DL|XX",
        "DL|XX|DL",
        "XX|DL|XX",
    ],
    category: "Trashes",
    state: "solid",
    stateHigh: "molten_metal",
    tempHigh: "2500",
    tempLow: "-2345",
    stateLow: "ice",
}

// does enemies count as trashes?
// eh , why not
elements.enemy = {
    color: "#ff0000",
    behavior: [
        "XX|DB|XX",
        "DB|XX|DB",
        "XX|DB|XX",
    ],
    category: "Trashes",
    state: "solid",
    stateHigh: "molten_metal",
    stateHigh: "molten_metal",
    tempHigh: "2500",
    tempLow: "-2345",
    stateLow: "ice",
}

// generators
elements.directional_generator = {
    color: "#00ff00",
    behavior: [
        "XX|CF|XX",
        "CF|XX|CF",
        "XX|CF|XX",
    ],
    category: "Generators",
    state: "solid",
    stateHigh: "molten_metal",
    stateHigh: "molten_metal",
    tempHigh: "2500",
    tempLow: "-2345",
    stateLow: "ice",
}

// nuke cell
elements.nuke_cell = {
    color: "#ffff00",
    behavior: [
        "DL|CL|DL",
        "CL|XX|CL",
        "DL|CL|DL",
    ],
    category: "Special Cells",
    state: "solid",
    stateHigh: "molten_metal",
    tempHigh: "2500",
    tempLow: "-2345",
    stateLow: "ice",
}
// some stuff
elements.rad_shrimp = {
    color: ["#ff8484" , "#ff0000" , "#87ff62"],
    behavior: [
        "XX|XX|XX",
        "XX|LB:radiation|XX",
        "M1|M2|M1",
    ],
    category: "food",
    state: "powder",
    stateHigh: "cooked_rad_shrimp",
    tempHigh: "250",
    tempLow: "-234",
    stateLow: "frozen_rad_shrimp",
}
elements.cooked_rad_shrimp = {
    color: ["#ff0000" , "#ffc278"],
    behavior: behaviors.POWDER,
    category: "food",
    stateHigh: "ash",
    tempHigh: "450",
    stateLow: "rad_shrimp",
    tempLow: "20",
    temp: 250,
}
elements.frozen_rad_shrimp = {
    color: ["#6193ff" , "#0044d6"],
    category: "food",
    stateHigh: "rad_shrimp",
    temp: "-234",
    temphigh: "20",
    stateLow: "frozen_rad_shrimp",
    temp: -234,
}

// more sand
// lol

// fresh sand
elements.fresh_sand = {
    color: ["#f2e2a1" , "#d4b95b" , "#ffeb99"],
    behavior: behaviors.POWDER,
    category: "land",
    stateHigh: "molten_glass",
    tempHigh: "1450",
    stateLow: "clay",
    tempLow: "-234",
    desc : "Sand fresh from the beach(jk its just retextured sand)."
}

// blue sand
elements.blue_sand = {
    color: ["#a1c4f2" , "#5b9ed4" , "#99caff"],
    behavior: behaviors.POWDER,
    category: "land",
    stateHigh: "molten_glass",
    tempHigh: "1450",
    stateLow: "clay",
    tempLow: "-234",
    desc : "Blue sand from a cool island."
}
elements.wet_blue_sand = {
    color: ["#6a89b7" , "#3c5f86" , "#7199d0"],
    behavior: behaviors.POWDER,
    category: "states",
    tempHigh: "50",
    stateHigh: "blue_sand",
    desc: "so cool",
}

// green sand
elements.green_sand = {
    color: ["#a1f2b8" , "#5bd48e" , "#99ffd6"],
    behavior: behaviors.POWDER,
    category: "land",
    stateHigh: "molten_glass",
    tempHigh: "1450",
    stateLow: "clay",
    tempLow: "-234",
    desc : "Green sand from money island.",
    reactions: {
        "water": { elem1:null, elem2:"wet_green_sand"},
    },
}
elements.wet_green_sand = {
    color: ["#6a9a78" , "#3c865b" , "#71bfa0"],
    behavior: behaviors.POWDER,
    category: "states",
    tempHigh: "40",
    stateHigh: "green_sand",
    desc: "vro is not tuff",
}
// purple sand
elements.purple_sand = {
    color: ["#dba1f2" , "#9e5bd4" , "#ff99ff"],
    behavior: behaviors.POWDER,
    category: "land",
    stateHigh: "molten_glass",
    tempHigh: "1450",
    stateLow: "clay",
    tempLow: "-234",
    desc : "Purple sand from a magical island.",
    reactions: {
        "sawdust": { elem1:null, elem2:"confetti"},
        "water": { elem1:null, elem2:"wet_purple_sand"}
    },
}
elements.wet_purple_sand = {
    color: ["#845796" , "#5b2d80" , "#b069b0"],
    behavior: behaviors.POWDER,
    category: "states",
    tempHigh: "60",
    stateHigh: "purple_sand",
    desc: "ts so tuff",
}
// emeralds
elements.emerald = {
    color: ["#50c878" , "#2e8b57" , "#a8e4a0"],
    behavior: behaviors.POWDER,
    category: "powders",
    stateHigh: "molten_emerald",
    tempHigh: "2100",
    stateLow: "diamond",
    tempLow: "-234",
    desc : "A precious green gem."
}
elements.molten_emerald = {
    color: "#7fffd4",
    behavior: behaviors.LIQUID,
    category: "liquids",
    stateLow: "emerald",
    tempLow: "-2100",
    temp: 2100,
    desc : "Molten emerald."
}