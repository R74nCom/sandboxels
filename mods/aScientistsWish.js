//Main version. Still in WIP
//reminder for creator: human code is on index.html line 3242.
//Ini adalah aScientistsWish.js, mod dari Sandboxels yang diciptakan oleh Carbon Monoxide dengan bantuan startup oleh Salmonfishy, bertema sains dan semi fiktif dengan adanya zombie, mod ini masih dalam tahap pengembangan.
elements.carbon_monoxide = {
  color: ["#b5b5b5", "#404040", "#2b2b2b",],
  behavior: behaviors.GAS,
  behaviorOn: [
    "XX|XX|XX",
    "XX|CH:fire|XX",
    "XX|XX|XX",
],
  category: "gases",
  state: "gas",
  density: 1.14,
  burn: 75,
  tempHigh: 609,
  stateHigh: "fire",
  tempLow: -192,
  stateLow: "liquid_carbon_monoxide",
  burntime: 5,
  fireColor: ["#ff8833", "#ffad33", "#ffbe26", "#26baff", "#26e9ff", ],
  burnInto: "carbon_dioxide", chance: 0.3,
  darkText: true,
  reactions: {
    "head": { elem2: "rotten_meat", chance: 0.5, },
    "body": { elem2:"rotten_meat", chance:0.5 },
    "human": { elem2:"rotten_meat", chance:0.5 },
    "worm": { elem2: "rotten_meat", chance:0.5 },
    "bee": { elem2: "dead_bug", chance: 0.5 },
    "ant": { elem2: "dead_bug", chance: 0.5 },
    "flea": { elem2: "dead_bug", chance: 0.5 },
    "spider": { elem2: "dead_bug", chance: 0.5 },
    "fly": { elem2: "dead_bug", chance: 0.5 },
    "stink_bug": { elem2: "dead_bug", chance: 0.5 },
    "bird": { elem2: "rotten_meat", chance: 0.5 },
    "frog": { elem2: "slime", chance: 0.5 },
    "rat": { elem2: ["rotten_meat", "plague"], chance: 0.5 },
    "fish": { elem2: "rotten_meat", chance: 0.5 },
    "tadpole" : { elem2: "rotten_meat", chance: 0.5 },
    "slug": { elem2: "slime", chance: 0.5 },
    "snail": { elem2: "slime", chance: 0.5 },
    "grass": { elem2: "dead_plant", chance: 0.5 },
    "plant": { elem2: "dead_plant", chance: 0.5 },
    "cactus": { elem2: "dead_plant", chance: 0.5 },
    "petal": { elem2: "dead_plant", chance: 0.5 },
  }
};
elements.liquid_carbon_monoxide = {
     color: ["#b5b5b5", "#404040", "#2b2b2b",],
     behavior: behaviors.LIQUID,
     category: "liquids",
     state: "liquid",
     density: 1.14,
     darkText: true,
     tempHigh: -190,
     temp: -192,
     tempLow: -199,
     hidden: true,
     stateLow: "ice_carbon_monoxide",
     stateHigh: "carbon_monoxide", 
};
elements.ice_carbon_monoxide = {
     color: ["#b5b5b5", "#404040", "#2b2b2b",],
     behavior: behaviors.WALL,
     category: "solids",
     state: "solid",
     temp: -199,
     density: 1.14,
     tempHigh: -192,
     darkText: true,
     stateHigh: "liquid_carbon_monoxide", 
};
elements.carbon_monoxide_detector = {
  behavior: behaviors.WALL,
  color: [ "#ffffff", "#e0e0e0", "#cccbca", ],
  reactions: {
  "carbon_monoxide": {"charge1":1},   
  },
  conduct: 1,
  tempHigh: 1550,
  stateHigh: ["molten_metal_scrap","electric","molten_plastic"],
  colorOn: "#ff0000",
  movable: false,
  insulate: true,
  noMix: true,
  category:"machines",
  darkText: true,
  hardness: 1,
};
elements.gelatin = {
     behavior: behaviors.SOLID,
     category: "food",
     state: "powder",
     density: 1.2,
     color: ["#ffe7b8","#fce2ac","#fcf2dc"],
     breakInto: "gelatin_powder",
     ignoreAir: true,
     isFood: true,
     reactions: {
        "water": { elem2: "jelly", },
        "pool_water": { elem2: "jelly", },
        "salt_water": { elem2: "jelly", }
        }

};
elements.gelatin_powder = {
     behavior: behaviors.POWDER,
     category: "food",
     density: 1.2,
     state: ["#ffe7b8","#fce2ac","#fcf2dc"],
     color: "#edeb9f",
     hidden: true,
     ignoreAir: true,
     isFood: true,
     reactions: {
        "water": { elem2: "jelly", },
        "pool_water": { elem2: "jelly", },
        "salt_water": { elem2: "jelly", }
     }
    };
elements.fallout_drum = {
behavior: [
    ["XX","CR:radiation%25","XX"],
    ["CR:radiation%25","XX","CR:radiation%25"],
    ["XX","CR:radiation%25","XX"]
],
category: "radiated",
state: "solid",
density: 9000,
color: "#e3cc34",
conduct: 1,
tempHigh: 2500,
stateHigh: ["aluminum","radiated_water","radiated_water","fallout"],
breakInto: ["fallout","fallout"],
reactions: { 
 "water": { elem1:"fallout_drum", elem2:"radiated_water" },
 "dna": { elem2: "cancer", },
 "cell": { elem2: "cancer", },
}
};

elements.radiated_water = {
    behavior: [
        "XX|CR:radiation%2.5|XX",
        "M2 AND CR:radiation%2.5|CH:radiation%0.2|M2 AND CR:radiation%2.5",
        "M1|M1|M1",
    ],
category: "radiated",
state:"liquid",
density :1300,
color: ["#23d959","#29d65d"],
hidden: true,
tempHigh: 140,
conduct: 1,
stateHigh: "radiated_air",
tempLow: -6,
stateLow: "rad_ice",
reactions: {
    "head": { elem2: ["rotten_meat","ash","plague"], },
    "body": { elem2:"rotten_meat",  },
    "human": { elem2:"rotten_meat", },
    "worm": { elem2: "rotten_meat",  },
    "bee": { elem2: "dead_bug", },
    "ant": { elem2: "dead_bug", },
    "flea": { elem2: "dead_bug", },
    "spider": { elem2: "dead_bug", },
    "fly": { elem2: "dead_bug", },
    "stink_bug": { elem2: "dead_bug",  },
    "bird": { elem2: "rotten_meat", },
    "frog": { elem2: "slime", },
    "rat": { elem2: ["rotten_meat", "plague"], },
    "fish": { elem2: "rotten_meat", },
    "tadpole" : { elem2: "rotten_meat", },
    "slug": { elem2: "slime", },
    "snail": { elem2: "slime", },
    "grass": { elem2: "dead_plant", },
    "plant": { elem2: "dead_plant", },
    "cactus": { elem2: "dead_plant", },
    "petal": { elem2: "dead_plant", },
    "cell": { elem2: "cancer", },
    "dna": { elem2: null, },
}
};

elements.radiated_air = {
behavior: behaviors.DGAS,
category: "radiated",
state:"gas",
density :10,
color: ["#60f53b","#65ba50"],
reactions: {
    "head": { elem2: ["rotten_meat","ash","plague"], },
    "body": { elem2:"rotten_meat",  },
    "human": { elem2:"rotten_meat", },
    "worm": { elem2: "rotten_meat",  },
    "bee": { elem2: "dead_bug", },
    "ant": { elem2: "dead_bug", },
    "flea": { elem2: "dead_bug", },
    "spider": { elem2: "dead_bug", },
    "fly": { elem2: "dead_bug", },
    "stink_bug": { elem2: "dead_bug",  },
    "bird": { elem2: "rotten_meat", },
    "frog": { elem2: "slime", },
    "rat": { elem2: ["rotten_meat", "plague"], },
    "fish": { elem2: "rotten_meat", },
    "tadpole" : { elem2: "rotten_meat", },
    "slug": { elem2: "slime", },
    "snail": { elem2: "slime", },
    "grass": { elem2: "dead_plant", },
    "plant": { elem2: "dead_plant", },
    "cactus": { elem2: "dead_plant", },
    "petal": { elem2: "dead_plant", },
    "cell": { elem2: "cancer", },
    "dna": { elem2: null, },
},
};

elements.siren = {
desc: "Detecting Nuclear Radiation Residues",
behavior: behaviors.WALL,
category: "machines",
state:"solid",
density :500,
color: "#808080",
reactions: {
    "fallout": {"charge1":1},
    "radiated_water": {"charge1":1},
    "radiated_air": {"charge1":1},
    "radiation": {"charge1":1},
    "rad_snow": {"charge1":1},
    "rad_rock": {"charge1":1},
}
};

elements.radiated_metal = {  
    behavior: [
        ["XX","CR:radiation%25","XX"],
        ["CR:radiation%25","XX","CR:radiation%25"],
        ["XX","CR:radiation%25","XX"]
    ],
category: "radiated",
state:"solid",
density :2045,
conduct: 1,
color: ["#5e705a","#83ab7b","#474747"],
tempHigh: 1440,
stateHigh: ["molten_nickel","molten_iron","molten_tin","fallout"],
reactions: {
   "water": { elem2:"radiated_water", chance:0.7 }, 
   "foam": { elem1:["tin","nickel","iron"] },
}
};

elements.rad_ice = {
    behavior: [
        ["XX","CR:radiation%25","XX"],
        ["CR:radiation%25","XX","CR:radiation%25"],
        ["XX","CR:radiation%25","XX"]
    ],
category: "radiated",
state:"solid",
density: 1905,
color: ["#81d79c","#68b899","#68abb8"],
hidden: true,
temp: -6,
tempHigh: 5,
stateHigh: ["radiated_water","water"],
reactions: {
    "snow": { elem2:"dirty_water" },
    "water": { elem2:"radiated_water" },
}
}

elements.rad_snow = {
    behavior: [
        "XX|CR:radiation%2|XX",
        "CR:radiation%2|XX|CR:radiation%2",
        "M2|M1|M2", ],
category: "radiated",
state:"powder",
density: 1500,
color: ["#9effe4","#b5fffd","#d4fff1"],
temp: -2,
tempHigh: 21,
stateHigh: "radiated_water",
};

elements.rad_rock = {
behavior: [
    "XX|CR:radiation%2|XX",
    "CR:radiation%2|XX|CR:radiation%2",
    "M2|M1|M2", ],
category: "land",
state: "powder",
density: 2790,
color: ["#34382d","#3f4633","#595a4d"],
tempHigh: 1200,
stateHigh: ["magma","fallout"],
reactions: {
    "water": { elem2:"dirty_water" },
    "salt_water": { elem2:"dirty_water" },
    "sugar_water": { elem2:"dirty_water" },
    "seltzer": { elem2:"dirty_water" },
    "bleach": {elem2: "rock", chance:0.1 },
    "rad_cleaner": { elem1:"rock" },
    "foam": { elem1:"rock" },
    "juice": { elem2: null },
    "blood": { elem2:"infection" },
    "grass": { elem2:"dead_plant" },
    "plant": { elem2:"dead_plant" },
    "cell": { elem2:"cancer" },
    "worm": { elem2:"ash" },
    "glass": { elem2:"rad_glass"},
    "glass_shard": { elem2:"rad_shard" },
}
};

elements.rad_cleaner = {
behavior: behaviors.WALL,
category: "machines",
state: "solid",
density: 2500,
color: ["#383838","#212220"],
desc: "clean radiated elements",
tempHigh: 1250,
stateHigh: ["fallout","molten_plastic","steam"],
reactions: {
    "radiated_water": {elem2:"water" },
    "radiated_air": {elem2: "oxygen"},
    "rad_snow": {elem2: "snow"},
    "rad_rock": {elem2: "rock"},
    "radiated_metal": {elem2: ["nickel","tin","iron"], },
    "fallout": {elem2: "rock", },
    "radiation": { elem2: null, },
}
};
elements.hazmat_head = {
    color: ["#404040","#1a1a1a","#737373"],
    category: "life",
    hidden: true,
    density: 1380,
    state: "solid",
    conduct: .05,
    temp: 39,
    tempHigh: 3500,
    stateHigh: ["ash","iron",],
    tempLow: -180,
    stateLow: "frozen_meat",
    breakInto: ["blood","meat","bone","metal_scrap"],
    forceSaveColor: true,
    reactions: {
        "oxygen": { elem2:"carbon_dioxide", chance:0.5 },
        "meat": { elem2:null, chance:0.1 },
        "cooked_meat": { elem2:null, chance:0.1 },
        "cured_meat": { elem2:null, chance:0.1 },
        "sugar": { elem2:null, chance:0.1 },
        "broth": { elem2:null, chance:0.2 },
        "yolk": { elem2:null, chance:0.1 },
        "hard_yolk": { elem2:null, chance:0.1 },
        "dough": { elem2:null, chance:0.1 },
        "batter": { elem2:null, chance:0.2 },
        "butter": { elem2:null, chance:0.1 },
        "melted_butter": { elem2:null, chance:0.2 },
        "chocolate": { elem2:null, chance:0.2 },
        "melted_chocolate": { elem2:null, chance:0.3 },
        "grape": { elem2:null, chance:0.1 },
        "tomato": { elem2:null, chance:0.1 },
        "herb": { elem2:null, chance:0.1 },
        "lettuce": { elem2:null, chance:0.1 },
        "corn": { elem2:null, chance:0.1 },
        "popcorn": { elem2:null, chance:0.15 },
        "potato": { elem2:null, chance:0.1 },
        "baked_potato": { elem2:null, chance:0.15 },
        "bread": { elem2:null, chance:0.1 },
        "toast": { elem2:null, chance:0.1 },
        "gingerbread": { elem2:null, chance:0.1 },
        "baked_batter": { elem2:null, chance:0.2 },
        "wheat": { elem2:null, chance:0.1 },
        "candy": { elem2:null, chance:0.1 },
        "yogurt": { elem2:null, chance:0.2 },
        "frozen_yogurt": { elem2:null, chance:0.1 },
        "ice_cream": { elem2:null, chance:0.2 },
        "beans": { elem2:[null,null,null,null,null,null,null,null,"stench"], chance:0.2 },
        "tea": { elem2:null, chance:0.2 },
        "coffee": { elem2:null, chance:0.2 },
        "milk": { elem2:null, chance:0.2 },
        "cream": { elem2:null, chance:0.2 },
        "soda": { elem2:null, chance:0.2 },
        "chocolate_milk": { elem2:null, chance:0.2 },
        "fruit_milk": { elem2:null, chance:0.2 },
        "pilk": { elem2:null, chance:0.2 },
        "eggnog": { elem2:null, chance:0.2 },
        "juice": { elem2:null, chance:0.2 },
        "cheese": { elem2:null, chance:0.1 },
        "melted_cheese": { elem2:null, chance:0.2 },
        "alcohol": { elem2:null, chance:0.2 },
        "antidote": { elem2:null, chance:0.2 },
        "honey": { elem2:null, chance:0.2 },
        "caramel": { elem2:null, chance:0.2 },
        "molasses": { elem2:null, chance:0.05 },
        "ketchup": { elem2:null, chance:0.1 },
        "pumpkin_seed": { elem2:null, chance:0.1 },
        "nut": { elem2:null, chance:0.1 },
        "nut_meat": { elem2:null, chance:0.1 },
        "nut_butter": { elem2:null, chance:0.1 },
        "nut_milk": { elem2:null, chance:0.2 },
        "jelly": { elem2:null, chance:0.2 },
        "mayo": { elem2:null, chance:0.2 },
        "mashed_potato": { elem2:null, chance:0.2 },
        "sauce": { elem2:null, chance:0.2 },
        "pickle": { elem2:null, chance:0.1 },
        "sun": { elem1:"cooked_meat" },
        "water": { elem2:"bubble", attr2:{"clone":"water"}, chance:0.001 },
        "salt_water": { elem2:"bubble", attr2:{"clone":"salt_water"}, chance:0.001 },
        "pool_water": { elem2:"bubble", attr2:{"clone":"pool_water"}, chance:0.001 },
    },
    properties: {
        dead: false
    },
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            // Turn into rotten_meat if pixelTicks-dead > 500
            if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
                changePixel(pixel,"rotten_meat");
                return
            }
        }

        // Find the body
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "hazmat_body") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) { // If body is dead, kill head
                pixel.dead = body.dead;
            }
        }
        else { var body = null }

        if (tryMove(pixel, pixel.x, pixel.y+1)) {
            // create blood if severed 10% chance
            if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1 && !pixel.charge) {
                createPixel("blood", pixel.x, pixel.y+1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
        // homeostasis
        if (pixel.temp > 40) { pixel.temp -= 1; }
        else if (pixel.temp < 40) { pixel.temp += 1; }
    }
};

elements.hazmat_body = {
    color: ["#2c7328","#2db526","#ffc42e","#f5c345","#cf9502",],
    category: "life",
    hidden: true,
    density: 1370,
    state: "solid",
    conduct: .25,
    temp: 39,
    tempHigh: 3500,
    stateHigh: ["metal_scrap","ash"],
    tempLow: -180,
    stateLow: "frozen_meat",
    breakInto: ["blood","meat","bone","metal_scrap","radiation","fallout",],
    forceSaveColor: true,
    reactions: {
        "egg": { elem2:"yolk", chance:0.5, oneway:true },
        "grape": { elem2:"juice", chance:0.5, color2:"#291824", oneway:true },
        "ant": { elem2:"dead_bug", chance:0.05, oneway:true },
        "fly": { elem2:"dead_bug", oneway:true },
        "firefly": { elem2:"dead_bug", oneway:true },
        "bee": { elem2:"dead_bug", oneway:true },
        "flea": { elem2:"dead_bug", oneway:true },
        "termite": { elem2:"dead_bug", oneway:true },
        "worm": { elem2:"slime", chance:0.05, oneway:true },
        "stink_bug": { elem2:"stench", oneway:true },
        "grass_seed": { elem2:null, chance:0.05 },
        "gold_coin": { elem2:null, chance:0.05 },
        "diamond": { elem2:null, chance:0.05 },
    },
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
            if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
                var headpixel = pixelMap[pixel.x][pixel.y-2];
                if (headpixel.element == "hazmat_head") {
                    if (isEmpty(pixel.x, pixel.y-1)) {
                        movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
                    }
                }
            }
        }
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            // Turn into rotten_meat if pixelTicks-dead > 500
            if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
                changePixel(pixel,"rotten_meat");
            }
            return
        }

        // Find the head
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "hazmat_head") {
            var head = pixelMap[pixel.x][pixel.y-1];
            if (head.dead) { // If head is dead, kill body
                pixel.dead = head.dead;
            }
        }
        else { var head = null }
        if (pixel.burning) {
            pixel.panic += 0.1;
            if (head && pixelTicks-pixel.burnStart > 240) {
                pixel.color = head.color;
            }
        }
        else if (pixel.panic > 0) {
            pixel.panic -= 0.1;
        }

        if (isEmpty(pixel.x, pixel.y-1)) {
            // create blood if decapitated 10% chance
            if (Math.random() < 0.1 && !pixel.charge) {
                createPixel("blood", pixel.x, pixel.y-1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
        else if (head == null) { return }
        else if (Math.random() < 0.1*(isEmpty(pixel.x, pixel.y+1) ? 1 : pixel.panic+1)) { // Move 10% chance
            var movesToTry = [
                [1*pixel.dir,0],
                [1*pixel.dir,-1],
            ];
            // While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
                    var origx = pixel.x+move[0];
                    var origy = pixel.y+move[1];
                    if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
                        movePixel(head, head.x+move[0], head.y+move[1]);
                        break;
                    }
                }
            }
            // 15% chance to change direction
            if (Math.random() < 0.15) {
                pixel.dir *= -1;
            }
            // homeostasis
            if (pixel.temp > 39) { pixel.temp -= 1; }
            else if (pixel.temp < 39) { pixel.temp += 1; }
        }

    }
};

elements.hazmat_human = {
    color: ["#404040","#1a1a1a","#737373"],
    category: "life",
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            createPixel("hazmat_body", pixel.x, pixel.y+1);
            pixel.element = "hazmat_head";
        }
        else if (isEmpty(pixel.x, pixel.y-1)) {
            createPixel("hazmat_head", pixel.x, pixel.y-1);
            pixelMap[pixel.x][pixel.y-1].color = pixel.color;
            pixel.element = "hazmat_body";
            pixel.color = pixelColorPick(pixel)
        }
        else {
            deletePixel(pixel.x, pixel.y);
        }
    },
    related: ["hazmat_body","hazmat_head"],
    cooldown: defaultCooldown,
    forceSaveColor: true, 
};

elements.zombie_head = {
    color: ["#57f542","#43de2f","#46c435"],
    category: "life",
    hidden: true,
    density: 1025,
    state: "solid",
    conduct: .07,
    temp: 28,
    tempHigh: 320,
    stateHigh: ["ash","zombie_virus",],
    tempLow: -45,
    stateLow: ["frozen_meat","zombie_virus",],
    breakInto: ["infection","rotten_meat","bone","zombie_virus",],
    forceSaveColor: true,
    reactions: {
        "head": { elem2: ["rotten_meat","zombie",], chance:0.8, },
        "body": { elem2: ["rotten_meat","zombie",], chance:0.5, },
        "oxygen": { elem2:"carbon_dioxide", chance:0.5 },
        "rotten_meat": { elem2: null, chance:0.5 },
        "meat": { elem2:null, chance:0.1 },
        "cooked_meat": { elem2:null, chance:0.1 },
        "cured_meat": { elem2:null, chance:0.1 },
    },
    properties: {
        dead: false
    },
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            // Turn into rotten_meat if pixelTicks-dead > 500
            if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
                changePixel(pixel,"rotten_meat");
                return
            }
        }

        // Find the body
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "zombie_body") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) { // If body is dead, kill head
                pixel.dead = body.dead;
            }
        }
        else { var body = null }

        if (tryMove(pixel, pixel.x, pixel.y+1)) {
            // create blood if severed 10% chance
            if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1 && !pixel.charge) {
                createPixel("blood", pixel.x, pixel.y+1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
        // homeostasis
        if (pixel.temp > 28) { pixel.temp -= 1; }
        else if (pixel.temp < 28) { pixel.temp += 1; }
    }
};

elements.zombie_body = {
    color: ["#2d7ecf","#4d94db","#65a175",],
    category: "life",
    hidden: true,
    density: 1520,
    state: "solid",
    conduct: .29,
    temp: 29,
    tempHigh: 350,
    stateHigh: ["zombie_virus","ash"],
    tempLow: -180,
    stateLow: ["frozen_meat","zombie_virus",],
    breakInto: ["infection","rotten_meat","bone","zombie_virus",],
    forceSaveColor: true,
    reactions: {
        "head": { elem2: ["rotten_meat","zombie",], chance:0.8, },
        "body": { elem2: ["rotten_meat","zombie",], chance:0.5, },
        "oxygen": { elem2:"carbon_dioxide", chance:0.5 },
        "rotten_meat": { elem2: null, chance:0.5 },
        "meat": { elem2:null, chance:0.1 },
        "cooked_meat": { elem2:null, chance:0.1 },
        "cured_meat": { elem2:null, chance:0.1 },
    },
    
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
            if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
                var headpixel = pixelMap[pixel.x][pixel.y-2];
                if (headpixel.element == "zombie_head") {
                    if (isEmpty(pixel.x, pixel.y-1)) {
                        movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
                    }
                }
            }
        }
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            // Turn into rotten_meat if pixelTicks-dead > 500
            if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
                changePixel(pixel,"rotten_meat");
            }
            return
        }

        // Find the head
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "zombie_head") {
            var head = pixelMap[pixel.x][pixel.y-1];
            if (head.dead) { // If head is dead, kill body
                pixel.dead = head.dead;
            }
        }
        else { var head = null }
        if (pixel.burning) {
            pixel.panic += 0.1;
            if (head && pixelTicks-pixel.burnStart > 240) {
                pixel.color = head.color;
            }
        }
        else if (pixel.panic > 0) {
            pixel.panic -= 0.1;
        }

        if (isEmpty(pixel.x, pixel.y-1)) {
            // create blood if decapitated 10% chance
            if (Math.random() < 0.1 && !pixel.charge) {
                createPixel("blood", pixel.x, pixel.y-1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
        else if (head == null) { return }
        else if (Math.random() < 0.1*(isEmpty(pixel.x, pixel.y+1) ? 1 : pixel.panic+1)) { // Move 10% chance
            var movesToTry = [
                [1*pixel.dir,0],
                [1*pixel.dir,-1],
            ];
            // While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
                    var origx = pixel.x+move[0];
                    var origy = pixel.y+move[1];
                    if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
                        movePixel(head, head.x+move[0], head.y+move[1]);
                        break;
                    }
                }
            }
            // 15% chance to change direction
            if (Math.random() < 0.15) {
                pixel.dir *= -1;
            }
            // homeostasis
            if (pixel.temp > 29) { pixel.temp -= 1; }
            else if (pixel.temp < 29) { pixel.temp += 1; }
        }

    }
};

elements.zombie = {
    // color: ["#404040","#1a1a1a","#737373"],
    color: ["#57f542","#43de2f","#46c435"],
    category: "life",
    properties: {
        dead: false,
        dir: 1,
        panic: 0,
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            createPixel("zombie_body", pixel.x, pixel.y+1);
            pixel.element = "zombie_head";
        }
        else if (isEmpty(pixel.x, pixel.y-1)) {
            createPixel("zombie_head", pixel.x, pixel.y-1);
            pixelMap[pixel.x][pixel.y-1].color = pixel.color;
            pixel.element = "zombie_body";
            pixel.color = pixelColorPick(pixel)
        }
        else {
            deletePixel(pixel.x, pixel.y);
        }
    },
    related: ["zombie_body","zombie_head"],
    cooldown: defaultCooldown,
    forceSaveColor: true, 
};

elements.zombie_virus = {
    behavior: behaviors.DGAS,
    color: ["#660266","#bd06bd","#f041f0",],
    category: "special",
    density: 30,
    state: "gas",
    reactions: {
        "head": { elem2: ["zombie","rotten_meat",], chance: 0.5, },
        "body": { elem2: ["zombie","rotten_meat",], chance: 0.5, },
    }
}

elements.matter = {
    behavior: behaviors.GAS,
    color: ["#c4f8ff","#b0f6ff","#9ccfd6",],
    darkText: true,
    category: "energy",
    density: 2.20,
    state: "gas",
    reactions: {
        "antimatter": { elem1: "explosion", },
        "positron": { elem1: "explosion", },
        "electron": { elem1: "explosion", },
    }
};
elements.particle_accelerator_left = {
    behavior: behaviors.SOLID,
    color: ["#363aa3","#858585","#d1d1d1"],
    density: 8200,
    category: "machines",
    state: "solid",
    reactions: {
        "matter": { elem2: ["accelerated_matter_left",] },
    }
};
elements.particle_accelerator_right = {
    behavior: behaviors.SOLID,
    color: ["#363aa3","#858585","#d1d1d1"],
    density: 8200,
    category: "machines",
    state: "solid",
    reactions: {
        "matter": { elem2: ["accelerated_matter_right",] },
    } 
};

elements.accelerated_matter_left = {
    color: ["#c0ecf0","#a8f8ff",],
    behavior: [
        "M2|EX:10|XX",
        "M1 AND EX:10|XX|EX:10",
        "M2|EX:10|XX",
    ],
    hidden: true,
    state: "gas",
    category: "energy",
    density: 2.20,
    reactions: {
        "accelerated_matter_right": { elem1: ["antimatter","pop",null,], chance: 0.3, },
        "accelerated_matter_left": { elem1: ["antimatter","pop",null,], chance: 0.3, },
        "antimatter": { elem1: "pop", chance: 0.01, }, 
    }

};
elements.accelerated_matter_right = {
    color: ["#c0ecf0","#a8f8ff",],
    behavior: [
        "XX|EX:10|M2",
       "EX:10|XX|M1 AND EX:10",
        "XX|EX:10|M2",
    ],
    hidden: true,
    state: "gas",
    category:"energy",
    density: 2.20,
    reactions: {
        "accelerated_matter_left": { elem1: ["antimatter","pop",null,], chance: 0.3, },
        "accelerated_matter_right": { elem1: ["antimatter","pop",null,], chance: 0.3, },
        "antimatter": { elem1: "pop", chance: 0.01, },

    }

};
elements.phosgene = {
    color: ["#dbdbdb","#f2f2f2","#c2c2c2", ],
    behavior: behaviors.GAS,
    state: "gas",
    category: "gases",
    density: 4.25,
    tempLow: 7,
    stateLow: "liquid_phosgene",
    tempHigh: 300,
    stateHigh: ["carbon_monoxide","chlorine",],
    reactions: {
                "head": { elem2: "rotten_meat", chance: 0.5, },
                "body": { elem2:"rotten_meat", chance:0.5 },
                "human": { elem2:"rotten_meat", chance:0.5 },
                "worm": { elem2: "rotten_meat", chance:0.5 },
                "bee": { elem2: "dead_bug", chance: 0.5 },
                "ant": { elem2: "dead_bug", chance: 0.5 },
                "flea": { elem2: "dead_bug", chance: 0.5 },
                "spider": { elem2: "dead_bug", chance: 0.5 },
                "fly": { elem2: "dead_bug", chance: 0.5 },
                "stink_bug": { elem2: "dead_bug", chance: 0.5 },
                "bird": { elem2: "rotten_meat", chance: 0.5 },
                "frog": { elem2: "slime", chance: 0.5 },
                "rat": { elem2: ["rotten_meat", "plague"], chance: 0.5 },
                "fish": { elem2: "rotten_meat", chance: 0.5 },
                "tadpole" : { elem2: "rotten_meat", chance: 0.5 },
                "slug": { elem2: "slime", chance: 0.5 },
                "snail": { elem2: "slime", chance: 0.5 },
                "grass": { elem2: "dead_plant", chance: 0.5 },
                "plant": { elem2: "dead_plant", chance: 0.5 },
                "cactus": { elem2: "dead_plant", chance: 0.5 },
                "petal": { elem2: "dead_plant", chance: 0.5 },
                "water": { elem2: ["acid", "carbon_dioxide",] },
                "salt_water": { elem2: ["acid", "carbon_dioxide",] },
}
}
elements.liquid_phosgene = {
    color: ["#dbdbdb","#f2f2f2","#c2c2c2", ],
    behavior: behaviors.LIQUID,
    state: "liquid",
    category: "states",
    density: 7.50,
    tempLow: -118,
    hidden: true,
    temp: -10,
    stateLow: "solid_phosgene",
    tempHigh: 8,
    stateHigh: "phosgene",
}
elements.solid_phosgene = {
    color: ["#dbdbdb","#f2f2f2","#c2c2c2", ],
    behavior: behaviors.WALL,
    state: "solid",
    category: "states",
    hidden: true,
    density: 12.45,
    temp: -150,
    tempHigh: -117,
    stateHigh: "liquid_phosgene",
}
elements.chlorophyll = {
    color: ["#208556","#2fa16b"],
    behavior: behaviors.POWDER,
    state: "powder",
    category: "powders",
    density: 1.1,
    tempHigh: 250,
    stateHigh: "carbon_dioxide",
    burn: 10,
    burnTime: 500,
    burnInto: "carbon_dioxide",
    tempLow: -114,
    stateLow: "dead_plant",
    reactions: {
        "light": { elem1: null, chance: 0.2, elem2: null, chance: 0.2, },
        "acid": { elem1: ["magnesium"], }
    }
}
elements.lithium = { //Unsur lithium, buat versi baru, masih WIP.
    color: ["#928c96", "#9c9c9c",],
    state: "powder",
    category: "powders",
    behavior: behaviors.POWDER,
    density: 0.5,
    tempHigh: 180, 
    stateHigh: "molten_lithium",
    conduct: 0.2,
    burn: 85,
    burnTime: 500,
    reactions: {
            "water": { elem1: ["pop","explosion","hydrogen","lithium_hydroxide"] },
            "salt_water": { elem1: ["pop","explosion","hydrogen","lithium_hydroxide"] },
            "pool_water": { elem1: ["pop","explosion","hydrogen","lithium_hydroxide"] },
            "dirty_water": { elem1: ["pop","explosion","hydrogen","lithium_hydroxide"] },
            "sugar_water": { elem1: ["pop","explosion","hydrogen","lithium_hydroxide"] },
            "steam": { elem1: ["pop","explosion","hydrogen","lithium_hydroxide"] },
            "oxygen": { elem1: "lithium_oxide" },
            "chlorine": { elem1: "lithium_chloride" },
            "acid": { elem1: ["lithium_chloride","hydrogen"], chance: 0.2 },
            "carbon_dioxide": { elem1: "lithium_carbonate" },
            "carbon_monoxide": { elem1: "lithium_carbonate" },
            "nitrogen": { elem1: "lithium_nitride", chance: 0.1 }
        } 
    }
elements.molten_lithium = {
    color: ["#c0c0c0", "#d0d0d0", "#b0b0b0"],
    behavior: behaviors.LIQUID,
    temp: 250, // temperatur normal
    density: 0.5, 
    conduct: 0.5,
    state: "liquid",
    category: "states",
    hidden: true,
    tempLow: 180,
    stateLow: "lithium",
    burn: 50,
    burnTime: 300,
    burnInto: "lithium_oxide",
}

elements.lithium_hydroxide = {
    color: "#c8e4d8",
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 1500,
    tempHigh: 462, // titik leleh LiOH
    stateHigh: "molten_lithium_hydroxide",
    reactions: {},
};

// Molten Lithium Hydroxide
elements.molten_lithium_hydroxide = {
    color: "#dff7f2",
    behavior: behaviors.LIQUID,
    category: "states",
    state: "liquid",
    density: 1400,
    hidden: true,
    temp: 463,
    tempHigh: 924, // perkiraan titik didih
    stateHigh: "lithium_hydroxide_gas", // opsional
    reactions: {},
};

// Lithium Oxide (hasil reaksi lithium dengan oksigen)
elements.lithium_oxide = {
    color: "#d0d0d0",
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 2013,
    tempHigh: 1438,
    stateHigh: "molten_lithium_oxide",
    reactions: {},
};

// Molten Lithium Oxide
elements.molten_lithium_oxide = {
    color: "#e8e8e8",
    behavior: behaviors.LIQUID,
    category: "states",
    state: "liquid",
    density: 1800,
    hidden: true,
    temp: 1440,
    reactions: {},
};

// Lithium Carbonate (hasil reaksi lithium dengan karbon dioksida)
elements.lithium_carbonate = {
    color: "#f0f0f0",
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 2110,
    tempHigh: 723, 
    stateHigh: "molten_lithium_carbonate",
    reactions: {},
};

// Molten Lithium Carbonate
elements.molten_lithium_carbonate = {
    color: "#fafafa",
    behavior: behaviors.LIQUID,
    category: "states",
    state: "liquid",
    density: 1900,
    hidden: true,
    temp: 725,
    reactions: {},
};

// Lithium Chloride (hasil reaksi lithium dengan klorin atau asam)
elements.lithium_chloride = {
    color: "#e0e0f8",
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 2068,
    tempHigh: 614,
    stateHigh: "molten_lithium_chloride",
    reactions: {},
};

// Molten Lithium Chloride
elements.molten_lithium_chloride = {
    color: "#f0f0ff",
    behavior: behaviors.LIQUID,
    category: "states",
    state: "liquid",
    hidden: true,
    density: 1900,
    temp: 615,
    reactions: {},
};

// Lithium Nitride (hasil reaksi lithium dengan nitrogen)
elements.lithium_nitride = {
    color: "#b8b8b8",
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 1270,
    tempHigh: 813,
    stateHigh: "molten_lithium_nitride",
    reactions: {},
};

// Molten Lithium Nitride
elements.molten_lithium_nitride = {
    color: "#c8c8c8",
    behavior: behaviors.LIQUID,
    category: "states",
    state: "liquid",
    hidden: true,
    density: 1100,
    temp: 815,
    reactions: {},
};
elements.phosphorus = {
    color: ["#ffffcc", "#ffff99", "#ffff66"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 1820,
    burn: 100,
    burnTime: 100,
    burnInto: "fire",
    reactions: {
        "oxygen": { elem1: "fire", chance: 0.5 },
        "water": { elem1: "explosion", },
    },
    tempHigh: 44,
    stateHigh: "molten_phosphorus",
    hidden: false,
};
elements.molten_phosphorus = {
    color: ["#ffcc00", "#ff9900"],
    behavior: behaviors.LIQUID,
    category: "states",
    state: "liquid",
    density: 1600,
    hidden: true,
    burning: true,
    burnTime: 2000,
    burnInto: "fire",
    reactions: {
        "oxygen": { elem1: "fire", chance: 1 },
    },
    temp: 100,
    tempLow: 43,
    stateLow: "phosphorus",
    viscosity: 20,
};
elements.phosphorus_bomb = {
    color: "#ffdd66",
    behavior: behaviors.POWDER,
    category: "weapons",
    state: "solid",
    density: 1200,
    desc: "Don't let UN see this...",
    tick: function(pixel) {
        // Periksa apakah ada elemen lain di sekitarnya
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                let x = pixel.x + dx;
                let y = pixel.y + dy;
                if (!isEmpty(x, y)) {
                    // Meledak: ubah area sekitar jadi molten_phosphorus
                    for (let ex = -3; ex <= 3; ex++) {
                        for (let ey = -3; ey <= 3; ey++) {
                            let nx = pixel.x + ex;
                            let ny = pixel.y + ey;
                            if (isEmpty(nx, ny) && Math.random() < 0.6) {
                                createPixel("molten_phosphorus", nx, ny);
                            }
                        }
                    }
                    deletePixel(pixel.x, pixel.y); // Hancurkan bomb setelah meledak
                    return;
                }
            }
        }
    }
};
