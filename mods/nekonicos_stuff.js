
behaviors.SOLIDIFY = function(pixel) {
    pixel.solid = true
}

var colorOne = "#ffffff"
var colorTwo = "#000000"

elements.colorOne = {
    tick: function(pixel) {
        if (pixel.color != colorOne) {
            pixel.color = colorOne
        }
        if (pixel.gradient > 0) {
            pixel.gradient -= 1
        }
    },
    properties: {
        gradient: 0,
    },
    isColor: true,
    category: "special"
}

elements.colorTwo = {
    tick: function(pixel) {
        if (pixel.color != colorTwo) {
            pixel.color = colorTwo
        }
    },
    properties: {
        gradient: 0,
    },
    isColor: true,
    category: "special"
}

elements.colorTwo_controller = {
    color: "#36397A",
    grain: 0,
    tick: function(pixel) {
        if (pixel.color != colorTwo) {
            colorTwo = pixel.color
        }
    },
    category: "special"
}

elements.colorOne_controller = {
    color: "#9e4839",
    grain: 0,
    tick: function(pixel) {
        if (pixel.color != colorOne) {
            colorOne = pixel.color
        }
    },
    category: "special"
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

elements.desand = {
    color: "#192a88",
    tool: function (pixel) {
        if (pixel.element === "sand") {
            deletePixel(pixel.x,pixel.y)
        } 
        else if (pixel.element === "packed_sand") {
            changePixel(pixel,"foam")
        } 
        else if (pixel.element === "color_sand") {
            pixel.element = "smoke";
        }
        else if (pixel.element === "glass") {
            deletePixel(pixel.x,pixel.y)
        }
        else if (pixel.element === "rad_glass") {
            changePixel(pixel,"radiation")
        }
        else if (pixel.element === "glass_shard") {
            deletePixel(pixel.x,pixel.y)
        }
        else if (pixel.element === "rad_shard") {
            changePixel(pixel,"radiation")
        }
        else if (pixel.element === "molten_glass") {
            changePixel(pixel,"fire")
        }
        else if (pixel.element === "molten_rad_glass") {
            changePixel(pixel,"fire")
        }
        else if (pixel.element === 'stained_glass') {
            pixel.element = "smoke";
        }
        else if (pixel.element === "wet_sand") {
            changePixel(pixel,"water")
        } 
        else if (pixel.element === "sandstorm") {
            if (Math.random() < 0.95) {
                pixel.element = "foam";
            }
            else {
                changePixel(pixel,"cloud")
            }
        } 
        else if (pixel.element === "tornado") {
            if (pixel.fired === "sand") {
                pixel.fired = null
                pixel.color = pixelColorPick(pixel,elements.tornado.color)
            } 
        } 
        else if (pixel.element === "concrete") {
            if (Math.random() < 0.95) {
                pixel.element = "gravel";
            }
            else {
                changePixel(pixel,"oxygen")
            }
        } 
        else if (pixel.element === "cement") {
            if (Math.random() < 0.80) {
                pixel.element = "gravel";
            }
            else {
                changePixel(pixel,"water")
            }
        } 
    },
    category: "tools",
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
        "rain_cloud": { elem2: "red_rain", chance:0.4 },
        "cloud": { elem2: "red_cloud", chance:0.4, chance:0.4 },
        "snow_cloud": { elem2: "red_snow_cloud", chance:0.4 },
        "frozen_plant":{elem2:"red_ice_plant", chance:0.025},
        "dead_plant":{elem2:"red_plant", chance:0.025},
        "salt_ice":{elem2:"red_ice", chance:0.25},
        "sugar_ice":{elem2:"red_ice", chance:0.25},
        "juice_ice":{elem2:"red_ice", chance:0.25},
        "dirty_ice":{elem2:"red_ice", chance:0.25},
        "ice":{elem2:"red_ice", chance:0.25},
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
    breakInto: "red_snow",
    tempLow: 0,
    stateLow: "red_water",
    category: "solids",
    state: "solid",
    density: 917,
}

elements.red_snow = {
    color: "#D64765",
    behavior: behaviors.POWDER,
    reactions: {
        "rain_cloud": { elem2: "red_rain", chance:0.4 },
        "cloud": { elem2: "red_cloud", chance:0.4, chance:0.4 },
        "snow_cloud": { elem2: "red_snow_cloud", chance:0.4 },
        "frozen_plant":{elem2:"red_ice_plant", chance:0.025},
        "dead_plant":{elem2:"red_plant", chance:0.025},
        "salt_ice":{elem2:"red_ice", chance:0.25},
        "sugar_ice":{elem2:"red_ice", chance:0.25},
        "juice_ice":{elem2:"red_ice", chance:0.25},
        "dirty_ice":{elem2:"red_ice", chance:0.25},
        "ice":{elem2:"red_ice", chance:0.25},
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
    temp: 5,
    tempLow: -18,
    tempHigh: 100,
    stateHigh: "packed_red_snow",
    stateLow: "red_water",
    category: "land",
    state: "solid",
    density: 100
}

elements.packed_red_snow = {
    color: "#CC3F5F",
    behavior: behaviors.SUPPORTPOWDER,
    reactions: {
        "rain_cloud": { elem2: "red_rain", chance:0.4 },
        "cloud": { elem2: "red_cloud", chance:0.4, chance:0.4 },
        "snow_cloud": { elem2: "red_snow_cloud", chance:0.4 },
        "frozen_plant":{elem2:"red_ice_plant", chance:0.025},
        "dead_plant":{elem2:"red_plant", chance:0.025},
        "salt_ice":{elem2:"red_ice", chance:0.25},
        "sugar_ice":{elem2:"red_ice", chance:0.25},
        "juice_ice":{elem2:"red_ice", chance:0.25},
        "dirty_ice":{elem2:"red_ice", chance:0.25},
        "ice":{elem2:"red_ice", chance:0.25},
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
    temp: 5,
    tempLow: -20,
    tempHigh: 200,
    stateHigh: "red_ice",
    stateLow: "red_water",
    breakInto: "red_snow",
    category: "land",
    state: "solid",
    density: 400,
    hidden: true
}

elements.red_ice_meat = {
    color: "#AC3536",
    behavior: [
        "XX|CH:frozen_meat,meat>red_ice_meat%1|XX",
        "CH:frozen_meat,meat>red_ice_meat%1|XX|CH:frozen_meat,meat>red_ice_meat%1",
        "XX|M1 AND CH:frozen_meat,meat>red_ice_meat%1|XX",
    ],
    reactions: {
        "rain_cloud": { elem2: "red_rain", chance:0.4 },
        "cloud": { elem2: "red_cloud", chance:0.4, chance:0.4 },
        "snow_cloud": { elem2: "red_snow_cloud", chance:0.4 },
        "frozen_plant":{elem2:"red_ice_plant", chance:0.025},
        "dead_plant":{elem2:"red_plant", chance:0.025},
        "salt_ice":{elem2:"red_ice", chance:0.25},
        "sugar_ice":{elem2:"red_ice", chance:0.25},
        "juice_ice":{elem2:"red_ice", chance:0.25},
        "dirty_ice":{elem2:"red_ice", chance:0.25},
        "ice":{elem2:"red_ice", chance:0.25},
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
    tempLow: -100,
    stateLow: "meat",
    category:"food",
    hidden:true,
    state: "solid",
    density: 1067.5,
    isFood: true
}

elements.red_ice_plant = {
    color: "#735958",
    reactions: {
        "rain_cloud": { elem2: "red_rain", chance:0.4 },
        "cloud": { elem2: "red_cloud", chance:0.4, chance:0.4 },
        "snow_cloud": { elem2: "red_snow_cloud", chance:0.4 },
        "frozen_plant":{elem2:"red_ice_plant", chance:0.025},
        "dead_plant":{elem2:"red_plant", chance:0.025},
        "salt_ice":{elem2:"red_ice", chance:0.25},
        "sugar_ice":{elem2:"red_ice", chance:0.25},
        "juice_ice":{elem2:"red_ice", chance:0.25},
        "dirty_ice":{elem2:"red_ice", chance:0.25},
        "ice":{elem2:"red_ice", chance:0.25},
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
    behavior: behaviors.WALL,
    category:"life",
    tempHigh: 300,
    stateHigh: "fire",
    burn:85,
    burnTime:45,
    temp: 2.66,
    tempLow: -7,
    stateLow: "red_plant",
    state: "solid",
    density: 1050,
    hidden: true
}

elements.red_plant = {
    color: ["#AA3527","#AA3227","#AA2C27","#A11D1D"],
    reactions: {
        "rain_cloud": { elem2: "red_rain", chance:0.4 },
        "cloud": { elem2: "red_cloud", chance:0.4, chance:0.4 },
        "snow_cloud": { elem2: "red_snow_cloud", chance:0.4 },
        "frozen_plant":{elem2:"red_ice_plant", chance:0.025},
        "dead_plant":{elem2:"red_plant", chance:0.025},
        "salt_ice":{elem2:"red_ice", chance:0.25},
        "sugar_ice":{elem2:"red_ice", chance:0.25},
        "juice_ice":{elem2:"red_ice", chance:0.25},
        "dirty_ice":{elem2:"red_ice", chance:0.25},
        "ice":{elem2:"red_ice", chance:0.25},
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
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2",
    ],
    category:"life",
    tempHigh: 2,
    stateHigh: "red_ice_plant",
    state: "solid",
    density: 1050,
    hidden: true
}

elements.red_water = {
    color: "#880808",
    behavior: behaviors.LIQUID,
    reactions: {
        "rain_cloud": { elem2: "red_rain", chance:0.4 },
        "cloud": { elem2: "red_cloud", chance:0.4, chance:0.4 },
        "snow_cloud": { elem2: "red_snow_cloud", chance:0.4 },
        "frozen_plant":{elem2:"red_ice_plant", chance:0.025},
        "dead_plant":{elem2:"red_plant", chance:0.025},
        "salt_ice":{elem2:"red_ice", chance:0.25},
        "sugar_ice":{elem2:"red_ice", chance:0.25},
        "juice_ice":{elem2:"red_ice", chance:0.25},
        "dirty_ice":{elem2:"red_ice", chance:0.25},
        "ice":{elem2:"red_ice", chance:0.25},
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
    tempLow: -100,
    stateLow: "red_steam",
    tempHigh: 0,
    stateHigh: "red_ice",
    category: "liquids",
    state: "liquid",
    density: 997,
    conduct: 0.02,
    temp: -20,
    stain: -0.5,
    extinguish: true
}

elements.red_steam = {
    color: "#F88379",
    behavior: behaviors.GAS,
    reactions: {
        "red_steam": { elem1: "red_cloud", elem2: "red_cloud", chance:0.05, "y":[0,15], "setting":"clouds" },
        "red_rain": { elem1: "red_rain", chance:0.4, "y":[0,12], "setting":"clouds" },
        "red_cloud": { elem1: "red_cloud", chance:0.4, "y":[0,12], "setting":"clouds" },
        "red_snow_cloud": { elem1: "red_rain_cloud", chance:0.4, "y":[0,12], "setting":"clouds" },
        "rain_cloud": { elem2: "red_rain", chance:0.4 },
        "cloud": { elem2: "red_cloud", chance:0.4, chance:0.4 },
        "snow_cloud": { elem2: "red_snow_cloud", chance:0.4 },
        "frozen_plant":{elem2:"red_ice_plant", chance:0.025},
        "dead_plant":{elem2:"red_plant", chance:0.025},
        "salt_ice":{elem2:"red_ice", chance:0.25},
        "sugar_ice":{elem2:"red_ice", chance:0.25},
        "juice_ice":{elem2:"red_ice", chance:0.25},
        "dirty_ice":{elem2:"red_ice", chance:0.25},
        "ice":{elem2:"red_ice", chance:0.25},
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

elements.red_cloud = {
    color: "#E8ABAB",
    behavior: [
        "XX|XX|XX",
        "XX|CO:1%5|M1%2.5 AND BO",
        "XX|XX|XX",
    ],
    reactions: {
        "red_rain": { elem1:"red_rain", temp1: 20 },
        "red_cloud": { elem1:"red_rain", elem2:"red_rain", temp1:20, temp2:20, charged:true },
        "rain_cloud": { elem2: "red_rain", chance:0.4 },
        "cloud": { elem2: "red_cloud", chance:0.4, chance:0.4 },
        "snow_cloud": { elem2: "red_snow_cloud", chance:0.4 },
        "frozen_plant":{elem2:"red_ice_plant", chance:0.025},
        "dead_plant":{elem2:"red_plant", chance:0.025},
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
    category:"gases",
    temp: -110,
    tempHigh: -100,
    stateHigh: "red_rain",
    state: "gas",
    breakInto: "red_rain",
    density: 0.4,
    ignoreAir: true,
    conduct: 0.03
}

elements.red_rain = {
    color: "#C27A79",
    behavior: [
        "XX|XX|XX",
        "XX|CH:red_water%0.05|M1%2.5 AND BO",
        "CR:electric%0.05|CR:electric%0.05|CR:electric%0.05",
    ],
    reactions: {
        "rain_cloud": { elem2: "red_rain", chance:0.4 },
        "cloud": { elem2: "red_cloud", chance:0.4, chance:0.4 },
        "snow_cloud": { elem2: "red_snow_cloud", chance:0.4 },
        "frozen_plant":{elem2:"red_ice_plant", chance:0.025},
        "dead_plant":{elem2:"red_plant", chance:0.025},
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
    category:"gases",
    temp: -70,
    tempLow: -100,
    stateLow: "red_cloud",
    breakInto: "water",
    tempHigh: 0,
    stateHigh: "red_snow_cloud",
    state: "gas",
    density: 0.5,
    ignoreAir: true,
    conduct: 0.03
}

elements.red_snow_cloud = {
    color: "#CC8482",
    behavior: [
        "XX|XX|XX",
        "XX|CH:red_snow%0.05|M1%2.5 AND BO",
        "XX|XX|XX",
    ],
    category:"gases",
    temp: 10,
    tempLow: -30,
    stateLow: "red_rain",
    state: "gas",
    density: 0.55,
    ignoreAir: true,
    conduct: 0.01,
    reactions: {
        "rain_cloud": { elem2: "red_rain", chance:0.4 },
        "cloud": { elem2: "red_cloud", chance:0.4, chance:0.4 },
        "snow_cloud": { elem2: "red_snow_cloud", chance:0.4 },
        "frozen_plant":{elem2:"red_ice_plant", chance:0.025},
        "dead_plant":{elem2:"red_plant", chance:0.025},
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
    stain: 0.4
}

elements.white_pawn = {
    color: "#F2F2CC",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "DL:black_pawn,black_rook,black_bishop,black_knight%0.5|M1%0.5|DL:black_pawn,black_rook,black_bishop,black_knight%0.5",
    ],
    tempHigh: 400,
    stateHigh: "ember",
    category: "chess",
    state: "solid",
    density: 2260,
    hardness: 0.5,
    breakInto: "sawdust",
}

elements.black_pawn = {
    color: "#2F2F33",
    behavior: [
        "DL:white_pawn,white_rook,white_bishop,white_knight%0.5|M1%0.5|DL:white_pawn,white_rook,white_bishop,white_knight%0.5",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tempHigh: 400,
    stateHigh: "ember",
    category: "chess",
    state: "solid",
    density: 2260,
    hardness: 0.5,
    breakInto: "sawdust",
}

elements.white_rook = {
    color: "#F2F2CC",
    behavior: [
        "XX|M1%0.5|XX",
        "M1%0.5|XX|M1%0.5",
        "XX|M1%0.5|XX",
    ],
    reactions: {
        "black_pawn": { elem2: null },
        "black_rook": { elem2: null },
        "black_bishop": { elem2: null },
        "black_knight": { elem2: null },
        "black_queen": { elem2: null },
        "black_king": { elem2: "supernova" },
    },
    tempHigh: 400,
    stateHigh: "ember",
    category: "chess",
    state: "solid",
    density: 2260,
    hardness: 0.5,
    breakInto: "sawdust",
}

elements.black_rook = {
    color: "#2F2F33",
    behavior: [
        "XX|M1%0.5|XX",
        "M1%0.5|XX|M1%0.5",
        "XX|M1%0.5|XX",
    ],
    reactions: {
        "white_pawn": { elem2: null },
        "white_rook": { elem2: null },
        "white_bishop": { elem2: null },
        "white_knight": { elem2: null },
        "white_queen": { elem2: null },
        "white_king": { elem2: "supernova" },
    },
    tempHigh: 400,
    stateHigh: "ember",
    category: "chess",
    state: "solid",
    density: 2260,
    hardness: 0.5,
    breakInto: "sawdust",
}

elements.white_bishop = {
    color: "#F2F2CC",
    behavior: [
        "M1%0.5|XX|M1%0.5",
        "XX|XX|XX",
        "M1%0.5|XX|M1%0.5",
    ],
    reactions: {
        "black_pawn": { elem2: null },
        "black_rook": { elem2: null },
        "black_bishop": { elem2: null },
        "black_knight": { elem2: null },
        "black_queen": { elem2: null },
        "black_king": { elem2: "supernova" },
    },
    tempHigh: 400,
    stateHigh: "ember",
    category: "chess",
    state: "solid",
    density: 2260,
    hardness: 0.5,
    breakInto: "sawdust",
}

elements.black_bishop = {
    color: "#2F2F33",
    behavior: [
        "M1%0.5|XX|M1%0.5",
        "XX|XX|XX",
        "M1%0.5|XX|M1%0.5",
    ],
    reactions: {
        "white_pawn": { elem2: null },
        "white_rook": { elem2: null },
        "white_bishop": { elem2: null },
        "white_knight": { elem2: null },
        "white_queen": { elem2: null },
        "white_king": { elem2: "supernova" },
    },
    tempHigh: 400,
    stateHigh: "ember",
    category: "chess",
    state: "solid",
    density: 2260,
    hardness: 0.5,
    breakInto: "sawdust",
}

elements.white_knight = {
    color: "#F2F2CC",
    behavior: [
        "XX|M1%0.5|XX|M1%0.5|XX",
        "M1%0.5|XX|XX|XX|M1%0.5",
        "XX|XX|XX|XX|XX",
        "M1%0.5|XX|XX|XX|M1%0.5",
        "XX|M1%0.5|XX|M1%0.5|XX",
    ],
    reactions: {
        "black_pawn": { elem2: null },
        "black_rook": { elem2: null },
        "black_bishop": { elem2: null },
        "black_knight": { elem2: null },
        "black_queen": { elem2: null },
        "black_king": { elem2: "supernova" },
    },
    tempHigh: 400,
    stateHigh: "ember",
    category: "chess",
    state: "solid",
    density: 2260,
    hardness: 0.5,
    breakInto: "sawdust",
}

elements.black_knight = {
    color: "#2F2F33",
    behavior: [
        "XX|M1%0.5|XX|M1%0.5|XX",
        "M1%0.5|XX|XX|XX|M1%0.5",
        "XX|XX|XX|XX|XX",
        "M1%0.5|XX|XX|XX|M1%0.5",
        "XX|M1%0.5|XX|M1%0.5|XX",
    ],
    reactions: {
        "white_pawn": { elem2: null },
        "white_rook": { elem2: null },
        "white_bishop": { elem2: null },
        "white_knight": { elem2: null },
        "white_queen": { elem2: null },
        "white_king": { elem2: "supernova" },
    },
    tempHigh: 400,
    stateHigh: "ember",
    category: "chess",
    state: "solid",
    density: 2260,
    hardness: 0.5,
    breakInto: "sawdust",
}

elements.white_queen = {
    color: "#F2F2CC",
    behavior: [
        "M1%0.5|M1%0.5|M1%0.5",
        "M1%0.5|XX|M1%0.5",
        "M1%0.5|M1%0.5|M1%0.5",
    ],
    reactions: {
        "black_pawn": { elem2: null },
        "black_rook": { elem2: null },
        "black_bishop": { elem2: null },
        "black_knight": { elem2: null },
        "black_queen": { elem2: null },
        "black_king": { elem2: "supernova" },
    },
    tempHigh: 400,
    stateHigh: "ember",
    category: "chess",
    state: "solid",
    density: 2260,
    hardness: 0.5,
    breakInto: "sawdust",
}

elements.black_queen = {
    color: "#2F2F33",
    behavior: [
        "M1%0.5|M1%0.5|M1%0.5",
        "M1%0.5|XX|M1%0.5",
        "M1%0.5|M1%0.5|M1%0.5",
    ],
    reactions: {
        "white_pawn": { elem2: null },
        "white_rook": { elem2: null },
        "white_bishop": { elem2: null },
        "white_knight": { elem2: null },
        "white_queen": { elem2: null },
        "white_king": { elem2: "supernova" },
    },
    tempHigh: 400,
    stateHigh: "ember",
    category: "chess",
    state: "solid",
    density: 2260,
    hardness: 0.5,
    breakInto: "sawdust",
}

elements.white_king = {
    color: "#F2F2CC",
    behavior: [
        "M1%0.05|M1%0.05|M1%0.05",
        "M1%0.05|XX|M1%0.05",
        "M1%0.025|M1%0.025|M1%0.025",
    ],
    reactions: {
        "black_pawn": { elem2: null },
        "black_rook": { elem2: null },
        "black_bishop": { elem2: null },
        "black_knight": { elem2: null },
        "black_queen": { elem2: null },
    },
    tempHigh: 400,
    stateHigh: "ember",
    category: "chess",
    state: "solid",
    density: 2260,
    hardness: 0.5,
    breakInto: "sawdust",
}

elements.black_king = {
    color: "#2F2F33",
    behavior: [
        "M1%0.025|M1%0.025|M1%0.025",
        "M1%0.05|XX|M1%0.05",
        "M1%0.05|M1%0.05|M1%0.05",
    ],
    reactions: {
        "white_pawn": { elem2: null },
        "white_rook": { elem2: null },
        "white_bishop": { elem2: null },
        "white_knight": { elem2: null },
        "white_queen": { elem2: null },
    },
    tempHigh: 400,
    stateHigh: "ember",
    category: "chess",
    state: "solid",
    density: 2260,
    hardness: 0.5,
    breakInto: "sawdust",
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
    stain: 0.6
}

scaleLimit = 0

elements.pixel_scale = {
    color: "#89796C",
    category: "machines",
    behavior: behaviors.WALL,
    tempHigh: 3000,
    stateHigh: "molten_steel",
    density: 7850, 
    movable: false,
    onSelect: function() {
        var answer1 = prompt("Input the desired pixel limit of this scale. It will not work if you place multiple limits while paused.",(scaleLimit||undefined));
        if (!answer1) { return }
		scaleLimit = (answer1);
    }, 
    tick: function(pixel){ 
        if (pixel.start === pixelTicks) {
			pixel.scaleLimit = scaleLimit
		}
        if (isEmpty(pixel.x-1,pixel.y) || pixelMap[pixel.x-1][pixel.y].element !== pixel.element) {
        pixel.scaleList = []
        for (let i = 1; i < width; i++){
            if (!isEmpty(pixel.x+i, pixel.y, true)) {
            if (pixelMap[pixel.x+i][pixel.y].element === pixel.element){
                let distance2 = grabPixels(pixelMap[pixel.x+i][pixel.y]); 
                pixel.scaleList.push((distance2.top - 1));
            }
            }
        }
        pixel.scaleSum = 0
        for (let i = 0; i < pixel.scaleList.length; i++){
            if (pixel.scaleList[i]){
                pixel.scaleSum += (pixel.scaleList[i])
            }
        }
        let distance = grabPixels(pixel);
        pixel.scaleSum += (distance.top - 1)
        if (pixel.scaleSum > (pixel.scaleLimit - 1)) {
            if (!isEmpty(pixel.x, pixel.y-1, true)) {
                var hitPixel = pixelMap[pixel.x][pixel.y-1]
                doElectricity(hitPixel);
                if (elements[hitPixel.element].conduct) {
                    hitPixel.charge = 0.5
                }
            }
            if (!isEmpty(pixel.x, pixel.y+1, true)) {
                var hitPixel = pixelMap[pixel.x][pixel.y+1]
                doElectricity(hitPixel);
                if (elements[hitPixel.element].conduct) {
                    hitPixel.charge = 0.5
                }
            }
            if (!isEmpty(pixel.x-1, pixel.y, true)) {
                var hitPixel = pixelMap[pixel.x-1][pixel.y]
                doElectricity(hitPixel);
                if (elements[hitPixel.element].conduct) {
                    hitPixel.charge = 0.5
                }
            }
            if (!isEmpty(pixel.x+1, pixel.y, true)) {
                var hitPixel = pixelMap[pixel.x+1][pixel.y]
                doElectricity(hitPixel);
                if (elements[hitPixel.element].conduct) {
                    hitPixel.charge = 0.5
                }
            }
        } 
        }
    }
}

kiloLimit = 0

elements.weight_scale = {
    color: "#7A7977",
    category: "machines",
    behavior: behaviors.WALL,
    tempHigh: 3000,
    stateHigh: "molten_steel",
    movable: false,
    onSelect: function() {
        var answer1 = prompt("Input the desired kilogram limit of this scale. It will not work if you place multiple limits while paused.",(kiloLimit||1602));
        if (!answer1) { return }
		kiloLimit = (answer1);
    }, 
    tick: function(pixel){ 
        if (pixel.start === pixelTicks) {
			pixel.scaleLimit = kiloLimit
		}
        if (isEmpty(pixel.x-1,pixel.y) || !outOfBounds(pixel.x-1,pixel.y) || pixelMap[pixel.x-1][pixel.y].element !== pixel.element) {
        pixel.scaleList = []
        for (let i = 1; i < width; i++){
            if (!isEmpty(pixel.x+i, pixel.y, true)) {
            if (pixelMap[pixel.x+i][pixel.y].element === pixel.element){
                let distance2 = grabWeights(pixelMap[pixel.x+i][pixel.y]); 
                pixel.scaleList.push((distance2.weight));
            }
            }
        }
        pixel.scaleSum = 0
        for (let i = 0; i < pixel.scaleList.length; i++){
            if (pixel.scaleList[i]){
                pixel.scaleSum += (pixel.scaleList[i])
            }
        }
        let distance = grabWeights(pixel);
        pixel.scaleSum += (distance.weight)
        if (pixel.scaleSum > (pixel.scaleLimit - 1)) {
            if (!isEmpty(pixel.x, pixel.y-1, true)) {
                var hitPixel = pixelMap[pixel.x][pixel.y-1]
                doElectricity(hitPixel);
                if (elements[hitPixel.element].conduct) {
                    hitPixel.charge = 0.5
                }
            }
            if (!isEmpty(pixel.x, pixel.y+1, true)) {
                var hitPixel = pixelMap[pixel.x][pixel.y+1]
                doElectricity(hitPixel);
                if (elements[hitPixel.element].conduct) {
                    hitPixel.charge = 0.5
                }
            }
            if (!isEmpty(pixel.x-1, pixel.y, true)) {
                var hitPixel = pixelMap[pixel.x-1][pixel.y]
                doElectricity(hitPixel);
                if (elements[hitPixel.element].conduct) {
                    hitPixel.charge = 0.5
                }
            }
            if (!isEmpty(pixel.x+1, pixel.y, true)) {
                var hitPixel = pixelMap[pixel.x+1][pixel.y]
                doElectricity(hitPixel);
                if (elements[hitPixel.element].conduct) {
                    hitPixel.charge = 0.5
                }
            }
        } 
        }
    }
}

scanLimit = 0
scanningLimit = 0

elements.pixel_scanner = {
    color: "#799187",
    category: "machines",
    behavior: behaviors.WALL,
    tempHigh: 3000,
    stateHigh: ["molten_steel","molten_steel","molten_steel","flash"],
    density: 7850, 
    movable: false,
    onSelect: function() {
        var answer1 = prompt("Input the desired pixel limit of this scanner. It will not work if you place multiple limits while paused.",(scanLimit||5));
        if (!answer1) { return }
		scanLimit = (answer1);
        var answer2 = prompt("Input the desired scanning limit of this scanner. It will not work if you place multiple limits while paused.",(scanningLimit||10));
        if (!answer2) { return }
		scanningLimit = (answer2);
    }, 
    tick: function(pixel){ 
        if (pixel.start === pixelTicks) {
			pixel.scaleLimit = scanLimit
            pixel.scanningLimit = scanningLimit
		}
        if (isEmpty(pixel.x-1,pixel.y) || pixelMap[pixel.x-1][pixel.y].element !== pixel.element) {
        pixel.scaleList = []
        for (let i = 1; i < width; i++){
            if (!isEmpty(pixel.x+i, pixel.y, true)) {
            if (pixelMap[pixel.x+i][pixel.y].element === pixel.element){
                let distance2 = grabAllPixels(pixelMap[pixel.x+i][pixel.y]); 
                pixel.scaleList.push((distance2.pixels - 1));
            }
            }
        }
        pixel.scaleSum = 0
        for (let i = 0; i < pixel.scaleList.length; i++){
            if (pixel.scaleList[i]){
                pixel.scaleSum += (pixel.scaleList[i])
            }
        }
        let distance = grabAllPixels(pixel);
        pixel.scaleSum += (distance.pixels - 1)
        if (pixel.scaleSum > (pixel.scaleLimit - 1)) {
            if (!isEmpty(pixel.x, pixel.y-1, true)) {
                var hitPixel = pixelMap[pixel.x][pixel.y-1]
                doElectricity(hitPixel);
                if (elements[hitPixel.element].conduct) {
                    hitPixel.charge = 0.5
                }
            }
            if (!isEmpty(pixel.x, pixel.y+1, true)) {
                var hitPixel = pixelMap[pixel.x][pixel.y+1]
                doElectricity(hitPixel);
                if (elements[hitPixel.element].conduct) {
                    hitPixel.charge = 0.5
                }
            }
            if (!isEmpty(pixel.x-1, pixel.y, true)) {
                var hitPixel = pixelMap[pixel.x-1][pixel.y]
                doElectricity(hitPixel);
                if (elements[hitPixel.element].conduct) {
                    hitPixel.charge = 0.5
                }
            }
            if (!isEmpty(pixel.x+1, pixel.y, true)) {
                var hitPixel = pixelMap[pixel.x+1][pixel.y]
                doElectricity(hitPixel);
                if (elements[hitPixel.element].conduct) {
                    hitPixel.charge = 0.5
                }
            }
        } 
        }
    }
}

kiloScanLimit = 0
kiloScanningLimit = 0

elements.weight_scanner = {
    color: "#6D9190",
    category: "machines",
    behavior: behaviors.WALL,
    tempHigh: 3000,
    stateHigh: "molten_steel",
    movable: false,
    onSelect: function() {
        var answer1 = prompt("Input the desired kilogram limit of this scanner. It will not work if you place multiple limits while paused.",(kiloScanLimit||1602));
        if (!answer1) { return }
		kiloScanLimit = (answer1);
        var answer2 = prompt("Input the desired scanning limit of this scanner. It will not work if you place multiple limits while paused.",(kiloScanningLimit||10));
        if (!answer2) { return }
		kiloScanningLimit = (answer2);
    }, 
    tick: function(pixel){ 
        if (pixel.start === pixelTicks) {
			pixel.scaleLimit = kiloScanLimit
            pixel.scanningLimit = kiloScanningLimit
		}
        if (isEmpty(pixel.x-1,pixel.y) || pixelMap[pixel.x-1][pixel.y].element !== pixel.element) {
        pixel.scaleList = []
        for (let i = 1; i < width; i++){
            if (!isEmpty(pixel.x+i, pixel.y, true)) {
            if (pixelMap[pixel.x+i][pixel.y].element === pixel.element){
                let distance2 = grabAllWeights(pixelMap[pixel.x+i][pixel.y]); 
                pixel.scaleList.push((distance2.weight));
            }
            }
        }
        pixel.scaleSum = 0
        for (let i = 0; i < pixel.scaleList.length; i++){
            if (pixel.scaleList[i]){
                pixel.scaleSum += (pixel.scaleList[i])
            }
        }
        let distance = grabAllWeights(pixel);
        pixel.scaleSum += (distance.weight)
        if (pixel.scaleSum > (pixel.scaleLimit - 1)) {
            if (!isEmpty(pixel.x, pixel.y-1, true)) {
                var hitPixel = pixelMap[pixel.x][pixel.y-1]
                doElectricity(hitPixel);
                if (elements[hitPixel.element].conduct) {
                    hitPixel.charge = 0.5
                }
            }
            if (!isEmpty(pixel.x, pixel.y+1, true)) {
                var hitPixel = pixelMap[pixel.x][pixel.y+1]
                doElectricity(hitPixel);
                if (elements[hitPixel.element].conduct) {
                    hitPixel.charge = 0.5
                }
            }
            if (!isEmpty(pixel.x-1, pixel.y, true)) {
                var hitPixel = pixelMap[pixel.x-1][pixel.y]
                doElectricity(hitPixel);
                if (elements[hitPixel.element].conduct) {
                    hitPixel.charge = 0.5
                }
            }
            if (!isEmpty(pixel.x+1, pixel.y, true)) {
                var hitPixel = pixelMap[pixel.x+1][pixel.y]
                doElectricity(hitPixel);
                if (elements[hitPixel.element].conduct) {
                    hitPixel.charge = 0.5
                }
            }
        } 
        }
    }
}

grabPixels = function(pixel){
    let element = pixel.element
    let results = {}
    for (let i = 0; i < height; i++) {
        if (isEmpty(pixel.x, pixel.y-i, true)){
            results.top = i
            break;
        }
    }
    return results
}

grabAllPixels = function(pixel){
    let element = pixel.element
    let results = {}
    results.pixels = 0
    for (let i = 0; i < height; i++) {
        if (!isEmpty(pixel.x, pixel.y-i, true)){
            results.pixels += 1
        }
        if (i > (pixel.scanningLimit - 1)){
            break;
        }
    }
    return results
}

grabWeights = function(pixel){
    let element = pixel.element
    let results = {}
    let weight = 0
    for (let i = 0; i < height; i++){
        if (!isEmpty(pixel.x, pixel.y-i, true)){
            if (elements[pixelMap[pixel.x][pixel.y-i].element].density && !weight) {
                weight += elements[pixelMap[pixel.x][pixel.y-i].element].density
            }
            else if (elements[pixelMap[pixel.x][pixel.y-i].element].density && weight) {
                weight += elements[pixelMap[pixel.x][pixel.y-i].element].density
            }
            else if (!elements[pixelMap[pixel.x][pixel.y-i].element].density) {
                let result;
                if (elements[pixelMap[pixel.x][pixel.y-i].element].breakInto !== undefined) {
                    if (Array.isArray(elements[pixelMap[pixel.x][pixel.y-i].element].breakInto)) {
                        result = elements[pixelMap[pixel.x][pixel.y-i].element].breakInto[Math.floor(Math.random() * elements[pixel.element].breakInto.length)];
                        weight += elements.result.density
                    }
                    else {
                        result = elements[pixelMap[pixel.x][pixel.y-i].element].breakInto;
                        weight += elements.result.density
                    }
                }
            }
        }
        if (isEmpty(pixel.x, pixel.y-i, true)){
            results.top = i
            if (isEmpty(pixel.x, pixel.y-i, true)){
                results.topelement = "air"
            } else {
                results.topelement = pixelMap[pixel.x][pixel.y-i].element
            }
            break;
        }
    }
    results.weight = weight
    return results
}

grabAllWeights = function(pixel){
    let element = pixel.element
    let results = {}
    let weight = 0
    for (let i = 0; i < height; i++){
        if (!isEmpty(pixel.x, pixel.y-i, true)){
            if (elements[pixelMap[pixel.x][pixel.y-i].element].density && !weight) {
                weight = elements[pixelMap[pixel.x][pixel.y-i].element].density
            }
            else if (elements[pixelMap[pixel.x][pixel.y-i].element].density && weight) {
                weight += elements[pixelMap[pixel.x][pixel.y-i].element].density
            }
            else if (!elements[pixelMap[pixel.x][pixel.y-i].element].density) {
                let result;
                if (elements[pixelMap[pixel.x][pixel.y-i].element].breakInto !== undefined) {
                    if (Array.isArray(elements[pixelMap[pixel.x][pixel.y-i].element].breakInto)) {
                        result = elements[pixelMap[pixel.x][pixel.y-i].element].breakInto[Math.floor(Math.random() * elements[pixel.element].breakInto.length)];
                        weight += elements.result.density
                    }
                    else {
                        result = elements[pixelMap[pixel.x][pixel.y-i].element].breakInto;
                        weight += elements.result.density
                    }
                }
            }
        }
        if (i > (pixel.scanningLimit - 1)){
            break;
        }
    }
    results.weight = weight
    return results
}

var modName = "mods/nekonicos_stuff.js";
var cookieMod = "mods/cookie_clicker.js";

if (!enabledMods.includes(cookieMod)) {

elements.cookie_dough = {
    color: ["#bfac91","#CDBFAB",],
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "chocolate": { elem1:"chocolate_chip_cookie_dough", elem2:null, chance: 0.5 },
        "chocolate_powder": { elem1:"chocolate_chip_cookie_dough", elem2:null, chance: 0.5 },
    },
    category: "food",
    tempHigh: 74,
    stateHigh: "plain_cookie",
    burn:40,
    burnTime:25,
    burnInto:"ash",
    state: "solid",
    density: 526.9,
    isFood: true
}

elements.chocolate_chip_cookie_dough = {
    color: ["#bfac91","#CDBFAB","#bfac91","#CDBFAB","#bfac91","#CDBFAB","#bfac91","#CDBFAB","#bfac91","#CDBFAB","#4d2818","#3b1b0d","#33160a"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    tempHigh: 74,
    stateHigh: "cookie",
    burn:40,
    burnTime:25,
    burnInto:"ash",
    state: "solid",
    density: 526.9,
    isFood: true
}

clicked = false
cookies = 0
oldcookies = 0
createdcookies = 0

elements.plain_cookie = {
    color: ["#C4966C","#C0946B"],
    behavior: behaviors.POWDER,
    reactions: {
        "chocolate": { elem1:"cookie", elem2:null, chance: 0.25 },
        "chocolate_powder": { elem1:"cookie", elem2:null, chance: 0.25 },
    },
    tempHigh: 192,
    stateHigh: "toast",
    category: "food",
    burn: 10,
    burnTime: 200,
    burnInto: "toast",
    breakInto: "crumb",
    breakIntoColor: ["#c8946a","#c08655","#ba7a45","#a86d3e"],
    state: "solid",
    density: 233.96,
    isFood: true
}

elements.cookie = {
    color: ["#C4966C","#C0946B","#C4966C","#C0946B","#C4966C","#C0946B","#C4966C","#C0946B","#C4966C","#C0946B","#4d2818","#3b1b0d","#33160a"],
    behavior: behaviors.POWDER,
    tick: function(pixel) {
        var top = mousePos.y - Math.floor(mouseSize/2);
        var bottom = mousePos.y + Math.floor(mouseSize/2);
        var left = mousePos.x - Math.floor(mouseSize/2);
        var right = mousePos.x + Math.floor(mouseSize/2);
        if ((pixel.x >= left && pixel.x <= right && pixel.y >= top && pixel.y <= bottom) && mouseIsDown === true && clicked === false) {
            clicked = true
            cookies += 1
        }
        else if ((pixel.x >= left && pixel.x <= right && pixel.y >= top && pixel.y <= bottom) && mouseIsDown !== true && clicked === true) {
            clicked = false
        }
        doDefaults(pixel);
    },
    tempHigh: 95,
    stateHigh: ["melted_chocolate","plain_cookie","plain_cookie"],
    category: "food",
    burn: 10,
    burnTime: 200,
    burnInto: ["melted_chocolate","plain_cookie","plain_cookie"],
    breakInto: ["crumb","crumb","crumb","crumb","crumb","chocolate","chocolate_powder"],
    breakIntoColor: ["#bfac91","#CDBFAB","#bfac91","#CDBFAB","#bfac91","#CDBFAB","#bfac91","#CDBFAB","#bfac91","#CDBFAB","#4d2818","#3b1b0d","#33160a"],
    state: "solid",
    density: 233.96,
    isFood: true,
    renderer: function(pixel,ctx) {
        if (!viewInfo[view].effects) { return }
        if (isEmpty(pixel.x,pixel.y+1) || !outOfBounds(pixel.x,pixel.y+1) || pixelMap[pixel.x][pixel.y+1].element === "pipe") {
            drawPlus(ctx,"#C4966C",pixel.x,pixel.y,undefined,2)
        }
        drawDefault(ctx,pixel)
    }
}

elements.dough.reactions.sugar = { elem1:"cookie_dough", elem2: null, chance:0.5}
elements.dough.reactions.chocolate = { elem1:"chocolate_chip_cookie_dough", elem2: null, chance:0.5}
elements.dough.reactions.chocolate_powder = { elem1:"chocolate_chip_cookie_dough", elem2: null, chance:0.5}

} 
