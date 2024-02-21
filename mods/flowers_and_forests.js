/* Flowers And Forests
Created by Pixelegend4 and SquareScreamYT
*/

elements.nutmeg = {
	color: "#b86d42",
	behavior: behaviors.POWDER,
	category: "land",
	state: "solid",
    breakInto: "nutmeg_ground",
};

elements.nutmeg_drink = {
	color: "#b86d42",
	behavior: behaviors.LIQUID,
	category: "land",
	state: "solid",
    reactions: {
        "baked_batter": { elem1: "nutmeg_cake", elem2: "nutmeg_cake" },
    },
};
elements.nutmeg_cake = {
	color: "#b86d42",
	behavior: behaviors.SOLID,
	category: "land",
	state: "solid",
};

elements.nutmeg_ground = {
	color: "#804d2f",
	behavior: behaviors.POWDER,
	category: "land",
	state: "solid",
    reactions: {
        "water": { elem1: "nutmeg_drink", elem2: "nutmeg_drink" },
    },
};
elements.cactus = {
	color: "#35ff08",
	behavior: behaviors.SOLID,
	category: "land",
	state: "solid",
	reactions: {
        "human": { elem1: "blood", elem2: "blood" },
	"fly": { elem1: "blood", elem2: "blood" },
	"bee": { elem1: "honey", elem2: "honey" },
    },
};
elements.blue_cactus = {
	color: "#0033FF",
	behavior: behaviors.SOLID,
	category: "land",
	state: "solid",
	reactions: {
        "human": { elem1: null, elem2: "blood" },
	"fly": { elem1: null, elem2: "blood" },
	"bee": { elem1: null, elem2: "honey" },
    },
};
elements.sycamore_wood = {
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
elements.sycamore_branch = {
    color: "#632e1f",
    behavior: [
        "CR:sycamore_leaves,sycamore_branch%2|CR:sycamore_leaves,sycamore_branch%2|CR:sycamore_leaves,sycamore_branch%2",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tempHigh: 100,
    stateHigh: "sycamore_wood",
    tempLow: -30,
    stateLow: "sycamore_wood",
    category: "life",
    burn: 40,
    burnTime: 50,
    burnInto: ["sap","ember","charcoal"],
    hidden: true,
    state: "solid",
    density: 1500,
    hardness: 0.15,
    breakInto: ["sap","sawdust"],
};
elements.sycamore_leaves = {
    color: ["#00d404","#0ec911","#109e12"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
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
    hidden: true
}

elements.sycamore_seed = {
    color: "#854610",
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
                    createPixel(Math.random() > 0.5 ? "sycamore_wood" : "sycamore_branch",pixel.x,pixel.y+1);
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"sycamore_wood");
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
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|FX%10|XX",
        "XX|M1|XX",
    ],
};

worldgentypes.fields = {
    layers: [
        [0.75, "dirt"],
        [0.05, "rock"],
        [0, "basalt"],
    ],
    decor: [
        ["sapling", 0.04, 20],
        ["grass", 0.25, 30],
	    ["grass", 0.25, 30],
        ["bee", 0.02, 25],
        ["cloud", 1, 2],
    ],
    baseHeight: 0.25
}

worldgentypes.sycamore_forest = {
    layers: [
        [0.75, "dirt"],
        [0.05, "dirt"],
    ],
    decor: [
        ["sycamore_seed", 0.04, 20],
        ["sycamore_seed", 0.10, 20],
        ["sycamore_seed", 0.13, 20],
	    ["grass", 0.25, 30],
        ["cloud", 1, 2],
    ],
    baseHeight: 0.25
};

elements.onion = {
	color: "#f5b042",
	behavior: behaviors.POWDER,
	category: "land",
	state: "solid",
};

elements.palm_tree_seed = {
    color: "#7a603d",
    tick: function(pixel) {
            if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1) && pixel.height < 7) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel("palm_tree_stem",pixel.x,pixel.y+1);
                    
                    pixel.height++
                }
            }
            else if (pixel.age > 150 && pixel.height > 6 && Math.random() < 0.1) {
                changePixel(pixel,"palm_tree_top");
            }
            pixel.age++;
        doDefaults(pixel);
    },
    properties: {
        "age":0,
        "height": 0
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
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
};

elements.palm_tree_stem = {
    color: "#8f6c3f",
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
elements.palm_tree_top = {
    color: "#8f6c3f",
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
    properties:{
        "leftleaves": 0,
        "rightleaves": 0,
    },
    hidden: true,
    tick: function(pixel) {
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.rightleaves == 0) {
            if (isEmpty(pixel.x+1,pixel.y)) {
                createPixel(Math.random() > 0.5 ? "palm_leaves" : "palm_leaves",pixel.x+1,pixel.y);

                pixel.rightleaves++
            }
        }
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.rightleaves == 1) {
            if (isEmpty(pixel.x+2,pixel.y)) {
                createPixel(Math.random() > 0.5 ? "palm_leaves" : "palm_leaves",pixel.x+2,pixel.y);

                pixel.rightleaves++
            }
        }
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.rightleaves == 2) {
            if (isEmpty(pixel.x+3,pixel.y)) {
                createPixel(Math.random() > 0.5 ? "palm_leaves" : "palm_leaves",pixel.x+3,pixel.y);

                pixel.rightleaves++
            }
        }
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.rightleaves == 3) {
            if (isEmpty(pixel.x+4,pixel.y+1)) {
                createPixel(Math.random() > 0.5 ? "palm_leaves" : "palm_leaves",pixel.x+4,pixel.y+1);

                pixel.rightleaves++
            }
        }


        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.leftleaves == 0) {
            if (isEmpty(pixel.x-1,pixel.y)) {
                createPixel(Math.random() > 0.5 ? "palm_leaves" : "palm_leaves",pixel.x-1,pixel.y);

                pixel.leftleaves++
            }
        }
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.leftleaves == 1) {
            if (isEmpty(pixel.x-2,pixel.y)) {
                createPixel(Math.random() > 0.5 ? "palm_leaves" : "palm_leaves",pixel.x-2,pixel.y);

                pixel.leftleaves++
            }
        }
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.leftleaves == 2) {
            if (isEmpty(pixel.x-3,pixel.y)) {
                createPixel(Math.random() > 0.5 ? "palm_leaves" : "palm_leaves",pixel.x-3,pixel.y);

                pixel.leftleaves++
            }
        }
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.leftleaves == 3) {
            if (isEmpty(pixel.x-4,pixel.y+1)) {
                createPixel(Math.random() > 0.5 ? "palm_leaves" : "palm_leaves",pixel.x-4,pixel.y+1);

                pixel.leftleaves++
            }
        }
        pixel.age++;
    doDefaults(pixel);
},
}
elements.palm_leaves = {
    color: ["#569923","#5ea12b"],
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
    hidden: true
}
elements.fruit_vine = {
    color: "#00df00",
    behavior: [
        "ST:wood|ST:wood|ST:wood",
        "ST:wood AND CR:grape%0.01|XX|ST:wood AND CR:grape%0.01",
        "ST:wood|ST:wood AND M1|ST:wood",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
        "carbon_dioxide": { elem2:"oxygen", chance:0.25 },
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    state: "solid",
    density: 1050,
    breakInto: "dead_plant"
}
elements.fruit_vine_seed = {
    color: "#6b4f36",
    tick: function(pixel) {
            if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    if (!isEmpty(pixel.x+1,pixel.y-1) || !isEmpty(pixel.x-1,pixel.y-1)) {
                        movePixel(pixel,pixel.x,pixel.y-1);
                        createPixel("fruit_vine",pixel.x,pixel.y+1);
                    }
                }
                if (!isEmpty(pixel.x+2,pixel.y-1) && isEmpty(pixel.x+1,pixel.y-1)) {
                    movePixel(pixel,pixel.x+1,pixel.y-1);
                    createPixel("fruit_vine",pixel.x-1,pixel.y+1);
                }
                if (!isEmpty(pixel.x-2,pixel.y-1) && isEmpty(pixel.x-1,pixel.y-1)) {
                    movePixel(pixel,pixel.x-1,pixel.y-1);
                    createPixel("fruit_vine",pixel.x+1,pixel.y+1);
                }
                if (!isEmpty(pixel.x,pixel.y-1) && !isEmpty(pixel.x+1,pixel.y) && isEmpty(pixel.x+1,pixel.y-1)) {
                    movePixel(pixel,pixel.x+1,pixel.y-1);
                    createPixel("fruit_vine",pixel.x-1,pixel.y+1);
                }
                if (!isEmpty(pixel.x,pixel.y-1) && !isEmpty(pixel.x-1,pixel.y) && isEmpty(pixel.x-1,pixel.y-1)) {
                    movePixel(pixel,pixel.x-1,pixel.y-1);
                    createPixel("fruit_vine",pixel.x+1,pixel.y+1);
                }
                /*if (pixelMap[pixel.x+1][pixel.y-1].element !== "wood" && pixelMap[pixel.x-1][pixel.y-1].element !== "wood") {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel("fruit_vine",pixel.x,pixel.y+1);
                    if (isEmpty(pixel.x+1,pixel.y-1) && pixelMap[pixel.x+2][pixel.y-1].element === "wood") {
                        movePixel(pixel,pixel.x+1,pixel.y-1);
                        createPixel("fruit_vine",pixel.x-1,pixel.y+1);
                    }
                    if (isEmpty(pixel.x-1,pixel.y-1) && pixelMap[pixel.x-2][pixel.y-1].element === "wood") {
                        movePixel(pixel,pixel.x-1,pixel.y-1);
                        createPixel("fruit_vine",pixel.x+1,pixel.y+1);
                    }
                }*/
            }
            else if (pixel.age > 400 && Math.random() < 0.1) {
                changePixel(pixel,"fruit_vine");
            }
            pixel.age++;
        doDefaults(pixel);
    },
    properties: {
        "age":0,
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
    seed: true,
    behavior: [
        "ST:wood,fruit_vine|ST:wood,fruit_vine|ST:wood,fruit_vine",
        "ST:wood,fruit_vine|XX|ST:wood,fruit_vine",
        "ST:wood,fruit_vine|M1|ST:wood,fruit_vine",
    ],
};
