// made by sqec

elements.coral_stem = {
    color: "#4a5e49",
    behavior: [
        "CH:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup>coral_stem,coral,coral%2|CH:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup>coral,coral_stem,coral,coral%2|CH:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup>coral_stem,coral,coral%2",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tick: function(pixel) {
        if (!pixel.fColor) {
            pixel.fColor = "hsl(" + Math.floor(Math.random()*360) + ",100%,50%)";
        }
        var coordsToCheck = [
            [pixel.x-1,pixel.y],
            [pixel.x+1,pixel.y],
            [pixel.x,pixel.y-1],
            [pixel.x,pixel.y+1],
        ]
        for (var i = 0; i < coordsToCheck.length; i++) {
            var coord = coordsToCheck[i];
            if (isEmpty(coord[0],coord[1])) {
                createPixel("coral",coord[0],coord[1]);
                pixelMap[coord[0]][coord[1]].color = pixel.fColor;
            }
        }
        doDefaults(pixel)
    },
    tempHigh: 100,
    stateHigh: "dead_coral",
    tempLow: -30,
    stateLow: "dead_coral",
    category: "life",
    burn: 40,
    burnTime: 50,
    burnInto: [,"ember","charcoal"],
    hidden: true,
    state: "solid",
    density: 1500,
    hardness: 0.15,
    hidden: true,
}
elements.coral = {
    color: ["#ff0000","#ff8800","#ffff00","#88ff00","#00ff00","#00ff88","#00ffff","#0088ff","#0000ff","#8800ff","#ff00ff"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035}
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
    hidden: true,
    properties:{
        "colored": false
    }
}
elements.coral_egg = {
    color: "#4a5e49",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup|XX",
    ],
    tick: function(pixel) {
        if (!isEmpty(pixel.x,pixel.y+1)) {
            if (!outOfBounds(pixel.x,pixel.y+1)) {
                var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                    changePixel(dirtPixel,"root");
                    changePixel(pixel,"coral_stem");
                }
            }
        }
        if (pixel.age > 100) {
            changePixel(pixel,"coral_stem");
        }
        pixel.age++;
        doDefaults(pixel)
    },
    tempHigh: 100,
    stateHigh: "dead_coral",
    tempLow: -30,
    stateLow: "dead_coral",
    category: "life",
    burn: 40,
    hidden: true,
    state: "solid",
    density: 1500,
    hardness: 0.15,
    properties:{
        age:0
    }
}
elements.dead_coral = {
    color: "#ababab",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035}
    },
    stateHigh:"quicklime",
    tempHigh:400,
    category:"life",
    burn:65,
    breakInto: "quicklime",
    state: "solid",
    density: 1050,
    hidden: true,
}
