elements.sakura_wood = {
    color: "#632e1f",
    behavior: behaviors.WALL,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "solids",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    breakIntoColor: ["#dba66e","#cc8a64"],
    hidden: true
}
elements.sakura_branch = {
    color: "#632e1f",
    behavior: [
        "CR:sakura,sakura_branch%2|CR:sakura,sakura,sakura,sakura_branch%2|CR:sakura,sakura_branch%2",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tempHigh: 100,
    stateHigh: "sakura_wood",
    tempLow: -30,
    stateLow: "sakura_wood",
    category: "life",
    burn: 40,
    burnTime: 50,
    burnInto: ["sap","ember","charcoal"],
    hidden: true,
    state: "solid",
    density: 1500,
    hardness: 0.15,
    breakInto: ["sap","sawdust"],
    seed: "sakura_seed"
}
elements.sakura = {
    color: ["#ff7ad3","#ff94db","#ffa6f0"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|CR:sakura_blossom%0.25|XX",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    seed: "sakura_seed",
    hidden: true
}
elements.sakura_blossom = {
    color: ["#ff7ad3","#ff94db","#ffa6f0"],
    behavior: [
        "XX|XX|XX",
        "XX|FX%0.25 AND DL%0.65|XX",
        "M2%10|M1%10|M1%10",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    seed: "sakura_seed",
    hidden: true
}

elements.sakura_seed = {
    color: ["#ff7ad3","#ff94db","#ffa6f0"],
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "sakura_wood" : "sakura_branch",pixel.x,pixel.y+1);
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"sakura_wood");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true
};



elements.beehive = {
    color: ["#ab985e","#948454"],
    tick: function(pixel){
        if (!pixel.pollen) { return; }
        if (isEmpty(pixel.x,pixel.y+1)) {
            if (Math.random() < 0.25) {
                createPixel("honey",pixel.x,pixel.y+1);
                pixel.pollen--;
            }
        }
        else {
            if (!outOfBounds(pixel.x,pixel.y+1) && pixelMap[pixel.x][pixel.y+1].element === "beehive") {
                pixelMap[pixel.x][pixel.y+1].pollen += pixel.pollen;
                pixel.pollen = 0;
            }
        }
        doDefaults(pixel);
    },
    properties: {
        "pollen": 0,
    },
    tempHigh: 248,
    stateHigh: ["fire","fire","ash"],
    burn: 70,
    burnTime: 300,
    burnInto: "ash",
    category: "life",
    state: "solid",
    density: 1201
}
elements.bee.reactions.beehive = {
    func: function(bee,hive) {
        if (bee.pollen) {
            hive.pollen++;
        }
        bee.pollen = null;
    }
}

elements.dollar = {
    color: ["#324a26","#4e8732","#54803d","#698a58","#8aa87b"],
    behavior: [
        "XX|XX|XX",
        "XX|FX%0.25|XX",
        "M2%10|M1%10|M1%10",
    ],
    category: "powders",
    tempHigh: 400,
    stateHigh: ["ash","smoke","smoke","smoke"],
    burn:50,
    burnTime:200,
    burnInto: ["ash","smoke","smoke","smoke"],
    state: "solid",
    density: 500
}

elements.butterfly = {
    color: ["#ff562b","#ff7226","#ffdf2b","#2bfbff","#2134ff","#c226ff"],
    tick: behaviors.FLY,
    reactions: {
        "sugar_water": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "honey": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "sap": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "sugar": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "soda": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "caramel": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "juice": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
    },
    foodNeed: 5,
    tempHigh: 100,
    stateHigh: "ash",
    tempLow: 0,
    stateLow: "dead_bug",
    breakInto: "dead_bug",
    category:"life",
    burn:95,
    burnTime:25,
    state: "solid",
    density: 600,
    conduct: 1,
    baby: "caterpillar",
}
elements.caterpillar = {
    color: "#4b7847",
    behavior: [
        "XX|XX|XX",
        "XX|FX%8|M2%1 AND BO",
        "XX|M1|XX",
    ],
    tick: function(pixel) {
        if (pixelTicks - pixel.start > 500) {
            changePixel(pixel,"butterfly");
        }
    },
    reactions: {
        "plant": { elem2:null, chance:0.1 },
        "grass": { elem2:null, chance:0.1 },
        "dead_plant": { elem2:null, chance:0.1 },
        "sapling": { elem2:null, chance:0.1 },
        "sakura": { elem2:null, chance:0.1 },
        "sakura_seed": { elem2:null, chance:0.1 },
        "sakura_blossom": { elem2:null, chance:0.1 },
        "petal": { elem2:null, chance:0.1 },
        "flower_seed": { elem2:null, chance:0.1 },
        "wheat": { elem2:null, chance:0.1 },
        "vine": { elem2:null, chance:0.1 },
        "bamboo": { elem2:null, chance:0.1 },
        "bamboo_plant": { elem2:null, chance:0.1 },
        "evergreen": { elem2:null, chance:0.1 },
    },
    tempHigh: 100,
    stateHigh: "ash",
    tempLow: 0,
    stateLow: "dead_bug",
    breakInto: "dead_bug",
    category:"life",
    burn:95,
    burnTime:25,
    state: "solid",
    density: 500,
    conduct: 0.15
}

worldgentypes.spring = {
    layers: [
        [0.85, "dirt"],
        [0.05, "rock"],
        [0, "basalt"],
    ],
    decor: [
        ["sakura_seed", 0.04, 20],
        ["sapling", 0.04, 20],
        ["pinecone", 0.04, 20],
        ["grass", 0.25, 30],
        ["butterfly", 0.02, 25],
        ["bee", 0.02, 25],
        ["firefly", 0.02, 25],
        ["rain_cloud", 1, 2],
        ["rain_cloud", 1, 6],
        ["rain_cloud", 1, 10],
    ],
    baseHeight: 0.25
}

//if (!settings.bg) {settings.bg = "#00bfff";}