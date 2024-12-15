behaviors.SOLIDIFY = function(pixel) {
    pixel.solid = true
}

elements.corn_starch = {
    color: ["#f5f5f1","#f2f3ee","#fcfdfc"],
    behavior: behaviors.POWDER,
    reactions: {
        "water": { elem1: "oobleck", elem2: null },
        "salt_water": { elem1: "oobleck", elem2: null },
        "sugar_water": { elem1: "oobleck", elem2: null },
        "seltzer": { elem1: "oobleck", elem2: null },
        "pool_water": { elem1: "oobleck", elem2: null },
        "juice": { elem1: "oobleck", elem2: null },
        "vinegar": { elem1: "oobleck", elem2: null },
        "yolk": { elem1: "oobleck", elem2: null },
        "yogurt": { elem1: "oobleck", elem2: null },
        "honey": { elem1:"oobleck", elem2:null },
        "molasses": { elem1:"oobleck", elem2:null },
        "sap": { elem1:"oobleck", elem2:null },
        "caramel": { elem1:"oobleck", elem2:null },
        "broth": { elem1:"oobleck", elem2:null },
        "soda": { elem1:"oobleck", elem2:null },
        "tea": { elem1:"oobleck", elem2:null },
        "blood": { elem1:"oobleck", elem2:null },
        "infection": { elem1:"oobleck", elem2:null },
        "antibody": { elem1:"oobleck", elem2:null },
        "milk": { elem1:"oobleck", elem2:null },
        "cream": { elem1:"oobleck", elem2:null },
    },
    category: "food",
    tempHigh: 600,
    stateHigh: "fire",
    burn:20,
    burnTime:15,
    state: "solid",
    density: 680,
    isFood: true
}

elements.oobleck = {
    color: "#8ef1b8",
    tick: function(pixel){
        if (pixel.solid === true) {
            if (pixel.start === pixelTicks) {return}
            if (pixel.charge && elements[pixel.element].behaviorOn) {
                pixelTick(pixel);
                return;
            }
            tryMove(pixel,pixel.x,pixel.y+1);
            doDefaults(pixel);
            if (pixel.solidage > 100 && Math.random() > 0.75) {
                pixel.solid = false
                pixel.solidage = 0
            }
            else {
                pixel.solidage ++
            }
        }
        else if (pixel.solid === false) {
            if (pixel.start === pixelTicks) {return}
            if (pixel.charge && elements[pixel.element].behaviorOn) {
                pixelTick(pixel);
                return;
            }
            var viscMove = true;
        if (elements[pixel.element].viscosity) {
            viscMove = (Math.random()*100) < 100 / Math.pow(elements[pixel.element].viscosity, 0.25);
        }
        if (!viscMove) {
            var move1Spots = [
                0
            ]
        }
        else {
            var move1Spots = [
                1,0,-1
            ]
        }
        var moved = false;
        for (var i = 0; i < move1Spots.length; i++) {
            const j = Math.random()*move1Spots.length | 0;
            const coord = move1Spots[j];
            if (tryMove(pixel, pixel.x+coord, pixel.y+1)) { moved = true; break; }
            move1Spots.splice(j, 1);
        }
        if (!moved) {
            if (viscMove) {
                if (Math.random() < 0.5) {
                    if (!tryMove(pixel, pixel.x+1, pixel.y)) {
                        tryMove(pixel, pixel.x-1, pixel.y);
                    }
                } else {
                    if (!tryMove(pixel, pixel.x-1, pixel.y)) {
                        tryMove(pixel, pixel.x+1, pixel.y);
                    }
                }
            }
        }
        doDefaults(pixel);
        }
    },
    properties: {
        solid: false,
        solidage: 0,
    },
    viscosity: 5000,
    tempHigh: 120,
    stateHigh: ["steam","corn_starch"],
    tempLow: 0,
    category:"liquids",
    state: "liquid",
    onBreak: behaviors.SOLIDIFY,
    density: 1450,
    stain: 0.10
}

elements.corn.breakInto = ["flour","flour","flour","corn_starch"]

elements.red_ice = {
    color: "#D2042D",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
    reactions: {
        "water":{elem2:"red_ice", chance:0.25},
        "steam":{elem2:"red_ice", chance:0.15},
        "blood":{elem2:"red_ice", chance:0.25},
        "blood_ice":{elem2:"red_ice", chance:0.25},
        "antibody":{elem2:"red_ice", chance:0.25},
        "salt_water":{elem2:"red_ice", chance:0.25},
        "sugar_water":{elem2:"red_ice", chance:0.25},
        "dirty_water":{elem2:"red_ice", chance:0.25},
        "pool_water":{elem2:"red_ice", chance:0.25},
        "slush":{elem2:"red_ice", chance:0.25},
        "seltzer":{elem2:"red_ice", chance:0.25},
        "juice":{elem2:"red_ice", chance:0.25},
        "soda":{elem2:"red_ice", chance:0.25},
        "milk":{elem2:"red_ice", chance:0.25},
        "slime":{elem2:"red_ice", chance:0.25},
        "tea":{elem2:"red_ice", chance:0.25},
        "coffee":{elem2:"red_ice", chance:0.25},
        "neutral_acid":{elem2:"red_ice", chance:0.25},
        "infection":{elem2:"red_ice", chance:0.25},
        "meat":{elem2:"red_ice_meat", chance:0.15},
        "skin":{elem2:"red_ice_meat", chance:0.075},
        "body":{elem2:"red_ice_meat", chance:0.04},
        "head":{elem2:"red_ice_meat", chance:0.05},
        "frozen_meat":{elem2:"red_ice_meat", chance:0.15},
        "fish":{elem2:"red_ice_meat", chance:0.15},
        "bird":{elem2:"red_ice_meat", chance:0.15},
        "frog":{elem2:"red_ice_meat", chance:0.15},
        "tadpole":{elem2:"red_ice_meat", chance:0.15},
    },
    tempLow: 0,
    stateLow: "red_water",
    category: "solids",
    state: "solid",
    density: 917,
}

elements.red_ice_meat = {
    color: "#AC3536",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
    reactions: {
        "water":{elem2:"red_ice", chance:0.025},
        "steam":{elem2:"red_ice", chance:0.015},
        "blood":{elem2:"red_ice", chance:0.025},
        "blood_ice":{elem2:"red_ice", chance:0.25},
        "antibody":{elem2:"red_ice", chance:0.025},
        "salt_water":{elem2:"red_ice", chance:0.025},
        "sugar_water":{elem2:"red_ice", chance:0.025},
        "dirty_water":{elem2:"red_ice", chance:0.025},
        "pool_water":{elem2:"red_ice", chance:0.025},
        "slush":{elem2:"red_ice", chance:0.025},
        "seltzer":{elem2:"red_ice", chance:0.025},
        "juice":{elem2:"red_ice", chance:0.025},
        "soda":{elem2:"red_ice", chance:0.025},
        "milk":{elem2:"red_ice", chance:0.025},
        "slime":{elem2:"red_ice", chance:0.025},
        "tea":{elem2:"red_ice", chance:0.025},
        "coffee":{elem2:"red_ice", chance:0.025},
        "neutral_acid":{elem2:"red_ice", chance:0.025},
        "infection":{elem2:"red_ice", chance:0.025},
        "meat":{elem2:"red_ice_meat", chance:0.015},
        "skin":{elem2:"red_ice_meat", chance:0.0075},
        "body":{elem2:"red_ice_meat", chance:0.004},
        "head":{elem2:"red_ice_meat", chance:0.005},
        "frozen_meat":{elem2:"red_ice_meat", chance:0.015},
        "fish":{elem2:"red_ice_meat", chance:0.015},
        "bird":{elem2:"red_ice_meat", chance:0.015},
        "frog":{elem2:"red_ice_meat", chance:0.015},
        "tadpole":{elem2:"red_ice_meat", chance:0.015},
    },
    tempHigh: 0,
    stateHigh: "meat",
    category:"food",
    hidden:true,
    state: "solid",
    density: 1067.5,
    isFood: true
}

elements.red_water = {
    color: "#880808",
    behavior: behaviors.LIQUID,
    reactions: {
        "water":{elem2:"red_ice"},
        "blood":{elem2:"red_ice"},
        "blood_ice":{elem2:"red_ice", chance:0.25},
        "antibody":{elem2:"red_ice"},
        "salt_water":{elem2:"red_ice"},
        "sugar_water":{elem2:"red_ice"},
        "dirty_water":{elem2:"red_ice"},
        "pool_water":{elem2:"red_ice"},
        "slush":{elem2:"red_ice"},
        "seltzer":{elem2:"red_ice"},
        "juice":{elem2:"red_ice"},
        "soda":{elem2:"red_ice"},
        "milk":{elem2:"red_ice"},
        "slime":{elem2:"red_ice"},
        "tea":{elem2:"red_ice"},
        "coffee":{elem2:"red_ice"},
        "neutral_acid":{elem2:"red_ice"},
        "infection":{elem2:"red_ice"},
        "meat":{elem2:"red_ice_meat", chance:0.015},
        "skin":{elem2:"red_ice_meat", chance:0.0075},
        "body":{elem2:"red_ice_meat", chance:0.004},
        "head":{elem2:"red_ice_meat", chance:0.005},
        "frozen_meat":{elem2:"red_ice_meat", chance:0.015},
        "fish":{elem2:"red_ice_meat", chance:0.015},
        "bird":{elem2:"red_ice_meat", chance:0.015},
        "frog":{elem2:"red_ice_meat", chance:0.015},
        "tadpole":{elem2:"red_ice_meat", chance:0.015},
    },
    temp: -20,
    tempHigh: 0,
    stateHigh: "red_ice",
    tempLow: -100,
    stateLow: "red_steam",
    category: "liquids",
    state: "liquid",
    density: 997,
}

elements.red_steam = {
    color: "#F88379",
    behavior: behaviors.GAS,
    reactions: {
        "water":{elem2:"red_ice"},
        "blood":{elem2:"red_ice"},
        "blood_ice":{elem2:"red_ice", chance:0.25},
        "antibody":{elem2:"red_ice"},
        "salt_water":{elem2:"red_ice"},
        "sugar_water":{elem2:"red_ice"},
        "dirty_water":{elem2:"red_ice"},
        "pool_water":{elem2:"red_ice"},
        "slush":{elem2:"red_ice"},
        "seltzer":{elem2:"red_ice"},
        "juice":{elem2:"red_ice"},
        "soda":{elem2:"red_ice"},
        "milk":{elem2:"red_ice"},
        "slime":{elem2:"red_ice"},
        "tea":{elem2:"red_ice"},
        "coffee":{elem2:"red_ice"},
        "neutral_acid":{elem2:"red_ice"},
        "infection":{elem2:"red_ice"},
        "meat":{elem2:"red_ice_meat", chance:0.015},
        "skin":{elem2:"red_ice_meat", chance:0.0075},
        "body":{elem2:"red_ice_meat", chance:0.004},
        "head":{elem2:"red_ice_meat", chance:0.005},
        "frozen_meat":{elem2:"red_ice_meat", chance:0.015},
        "fish":{elem2:"red_ice_meat", chance:0.015},
        "bird":{elem2:"red_ice_meat", chance:0.015},
        "frog":{elem2:"red_ice_meat", chance:0.015},
        "tadpole":{elem2:"red_ice_meat", chance:0.015},
    },
    temp: -150,
    tempHigh: -100,
    stateHigh: "red_water",
    category: "gases",
    state: "gas",
    density: 0.6,
}

elements.graphite = {
    color: "#2F2F33",
    colorKey: {
        "C":"#2F2F33",
        "V":"#343434"
    },
    colorPattern: [
        "VVVCCCVVV",
        "VVCVVVCVV",
        "VCVVVVVCV",
        "CVVVVVVVC",
        "VCVVVVVCV",
        "VVCVVVCVV",
    ],
    behavior: behaviors.WALL,
    tempHigh: 3600,
    category: "solids",
    state: "solid",
    density: 2260,
    hardness: 0.99,
    breakInto: "graphite_dust",
    stain: 0.5
}

elements.graphite_dust = {
    color: "#3B3B3B",
    behavior: behaviors.POWDER,
    reactions: {
        "water": { elem2: "dirty_water", elem1: null },
        "salt_water": { elem2: "dirty_water", elem1: null },
        "sugar_water": { elem2: "dirty_water", elem1: null },
        "seltzer": { elem2: "dirty_water", elem1: null },
        "pool_water": { elem2: "dirty_water", elem1: null },
        "blood": { elem2: "infection", elem1: null },
    },
    tempHigh: 3600,
    category: "powders",
    state: "solid",
    density: 1830,
    stain: 0.5
}