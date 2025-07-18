elements.EXPLODE = {
    color: "#FF5555",
    behavior: [
        "XX|XX|XX",
        "XX|EX: 20>plasma|XX",
        "XX|XX|XX"
    ],
    category: "tools",
    /*tool: function(pixel) {
        if (pixel.element === "dirt"){
            createPixel("plasma")
        }
    }
    */
    
}

elements.admantine = {
    color: ["#5c5c5c", "#676469", "#747373"],
    behavior: behaviors.WALL,
    category: "solids",
    tempHigh: 3140,
    stateHigh: "molten_admantine",
    reactions: {
        "hydrogen": {elem1: null, elem2: null},
    },
    density: 10000,
    conduct: 1,
    hardness: 10,

}
  

elements.molten_admantine = {
    color: ["#d1521b", "#b68421", "#b14b77", "#e3aa38"],
    behavior: behaviors.MOLTEN,
    category: "liquids",
    tempHigh: 5900,
    tempLow: 3139,
    stateLow: "admantine",
    stateHigh: "admantine_gas",
    reactions: {
        "hydrogen": {elem1: null, elem2: null}
    },
    density: 100,
    hidden: true,
}

elements.admantine_gas = {
    color: ["#535353", "#a9a9a9", "#0b0b0b"],
    behavior: behaviors.GAS,
    category: "gases",
    tempLow: 5899, 
    stateLow: "molten_admantine",
    reactions: {
        "hydrogen": {elem1: null, elem2: null}
    },
    density: 10,
    hidden: true,
}


elements.superlight_liquid = {
    color: ["#7dadd4", "#a0cedc", "#72bdef", "#d8e1f5"],
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempLow: -100,
    tempHigh: 10000,
    reactions: {
        "admantine": {elem1: null, elem2: "iron"}
    },
    density: 0.00000001,
}

elements.left_powder = {
    color: "#555555",
    category: "powders",
    behavior: [
        "M2|XX|XX",
        "M1|XX|XX",
        "M2|XX|XX"
    ],
    tempHigh: 1000,
}

elements.right_powder = {
    color: "#555555",
    category: "powders",
    behavior: [
        "XX|XX|M2",
        "XX|XX|M1",
        "XX|XX|M2"
    ],
    tempHigh: 1000,
}

elements.volcano = {
    color: "#4f4848",
    category: "weapons",
    tick: function(pixel) {
        let isPlaced = false
        if (!tryMove(pixel,pixel.x,pixel.y+1)) {
            if (!pixel.isPlaced) {
                pixel.y -= 5
                pixel.isPlaced = true
            }
            let height = 5; // number of pyramid layers
            while (!isEmpty(pixel.x-4,pixel.y+4)) {
                for (let row = 2; row < height; row++) {
                    let width = row + 2; // pyramid gets wider each row
                    for (let col = 0; col < width; col++) {
                        let xOffset = col - row; // center the row
                        let x = pixel.x + xOffset;
                        let y = pixel.y + row;

                        createPixel("basalt", x, y);

                    }
            }
        }
        }    }
}

elements.cat = {
    color: ["#FFFFFF", "#caa022", "#afafaf", "#baa974"],
    category: "life",
    tempHigh: 40,
    tempLow: -5,
    stateHigh: "cooked_meat",
    stateLow: "frozen_meat",
    breakInto: ["meat", "bone", "vomit", "hairball", "blood", "bone", "stench", "infection", "flea"],
    tick: function(pixel) {
        let lr
        if (Math.random() < 0.2) {
            lr = Math.random() < 0.5 ? -1 : 1
        }
        else {
            lr = 0
        }
        if (!tryMove(pixel, pixel.x, pixel.y+1)) {
            if (lr === -1) {
                if (isEmpty(pixel.x + lr, pixel.y)) {
                    if (!tryMove(pixel, pixel.x + lr + lr, pixel.y)) {
                        if (!tryMove(pixel, pixel.x + lr, pixel.y - 1)) {
                            if (!tryMove(pixel, pixel.x + lr, pixel.y + 1)) {
                                lr = 1
                            }
                        }
                    }
                }
                
                    
                
            }
            else if (lr === 1) {
                if (isEmpty(pixel.x + lr, pixel.y)) {
                    if (!tryMove(pixel, pixel.x + lr + lr, pixel.y)) {
                        if (!tryMove(pixel, pixel.x + lr, pixel.y - 1)) {
                            if (!tryMove(pixel, pixel.x + lr, pixel.y + 1)) {
                                lr = -1
                            }
                        }
                    }
                }
            }
        }
        if (Math.random() < 0.0001) {
            if (isEmpty(pixel.x-1, pixel.y, true)) {
                createPixel("stench", pixel.x - 1, pixel.y)
            }
            else if (isEmpty(pixel.x+1, pixel.y, true)) {
                createPixel("stench", pixel.x + 1, pixel.y)
            }
        }
        if (Math.random() < 0.0005) {
            if (isEmpty(pixel.x-1, pixel.y, true)) {
                createPixel("vomit", pixel.x - 1, pixel.y)
            }
            else if (isEmpty(pixel.x+1, pixel.y, true)) {
                createPixel("vomit", pixel.x + 1, pixel.y)
            }
        }
        if (Math.random() < 0.0005) {
            if (isEmpty(pixel.x-1, pixel.y, true)) {
                createPixel("hairball", pixel.x - 1, pixel.y)
            }
            else if (isEmpty(pixel.x+1, pixel.y, true)) {
                createPixel("hairball", pixel.x + 1, pixel.y)
            }
        }
    },
    reactions: {
        "milk": {elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL},
        "meat": {elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL},
        "cooked_meat": {elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL},
        "rotten_meat": {elem2: "stench", chance: 0.5, func: behaviors.FEEDPIXEL},
        "bird": {elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL},
        "rat": {elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL},
        "beans": {elem2: "stench", chance: 0.5, func: behaviors.FEEDPIXEL},
        "fish": {elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL},
        "poison": {elem1: "rotten_meat", chance: 0.25},
        "acid": {elem1: "rotten_meat", chance: 0.8, elem2: null},
        "landmine": {elem2: null},



    }

}

elements.vomit = {
    color: ["#6b722f", "#92700b", "#a3944d", "#6a654e"],
    category: "liquids",
    tempHigh: 100,
    tempLow: 0,
    stateHigh: "stench",
    stateLow: "vomit_ice",
    hidden: true,
    behavior: behaviors.LIQUID
}

elements.hairball = {
    color: ["#958b71", "#868977"],
    category: "powders",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2"
    ],
    tempHigh: 250,
    stateHigh: "ash",
    hidden: true
}

elements.hot_stuff = {
    color: ["#a5d6a7", "#ffffff"],
    category: "solids",
    behavior: behaviors.WALL,
    temp: 0,
}