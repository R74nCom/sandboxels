//Hello, this is are a science mod, we're made several things that related to science, examples like...electron, particle accelerator, and of course, carbon monoxide! :D
//We made some things not scientific, so this mod is not too boring. ;)
//we're normal people, who is not as smart as a real scientist. so if you have suggestion, feedback, or criticism, please let us know, so we can make this mod being more accurate. ><
//  discord account |
//                  |
//                  |
//                  v
//  creator,leader,supervisor,coder,uploader = @carbon_monoxides6
//  co-creator,co-coder,assistant,debugger = @salmonfishy (has exited from this mod project)
elements.carbon_monoxide = {
  color: "#b5b5b5",
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
  darkText: true,
  fireColor: "#ebba34",
  reactions: {
                "head": { elem2:"rotten_meat", chance:0.5 },
                "body": { elem2:"rotten_meat", chance:0.5 },
                "human": { elem2:"rotten_meat", chance:0.5 },
             }
};
elements.liquid_carbon_monoxide = {
     color: "#b5b5b5",
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
     color: "#b5b5b5",
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
  desc: "give red light and electric when found Carbon Monoxide touch",
  color: "#ffffff",
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

elements.electrons = {
color: "#b80606",
behavior: [
    "XX|SH|XX", // shocks (adds charge)
    "SH|DL%0.25|SH",
    "XX|SH|XX",
],
tick: behaviors.BOUNCY,
temp: 20,
category: "energy",
state: "gas",
density: 0.000003,
ignoreAir: true,
};
elements.gelatin = {
     behavior: behaviors.SOLID,
     category: "food",
     state: "solid",
     color: "#faf8ca",
     breakInto: "gelatin_powder",
     ignoreAir: true,
     isFood: true,
};
elements.gelatin_powder = {
     behavior: behaviors.POWDER,
     category: "food",
     state: "powder",
     color: "#edeb9f",
     hidden: true,
     ignoreAir: true,
     isFood: true,
};
elements.blueberries = {
behavior: behaviors.POWDER,
category: "food",
state: "solid",
color: ["#464196","#2e2b64"],
breakInto: "blueberries_juice",
ignoreAir: true,
isFood: true,
reactions: {
"sugar": { elem1: "blueberries_jam" },
},
};
elements.blueberries_juice = {
behavior: behaviors.LIQUID,
category: "food",
state: "liquid",
color: "#1f1c42",
hidden: true,
tempHigh: 170,
stateHigh: ["steam","sugar"],
reactions: {
ignoreAir: true,
isFood: true,
"gelatin": { elem1: "blueberries_jelly", elem2: null },
"gelatin_powder": { elem1: "blueberries_jelly", elem2: null },
},
};
elements.blueberries_jam = {
behavior: behaviors.LIQUID,
category: "food",
viscosity: 5000,
state: "liquid",
tempHigh: 200,
stateHigh: ["smoke","sugar"],
color: "#080629",
hidden: true,
ignoreAir: true,
isFood: true,
};
elements.blueberries_jelly = {
behavior: behaviors.LIQUID,
category: "food",
viscosity: 200000,
state: "liquid",
color: "#59559e",
hidden: true,
tempHigh: 200,
stateHigh: ["smoke","sugar"],
tempLow: -5,
stateLow: ["sugar_ice","sugar_ice","juice_ice"],
ignoreAir: true,
isFood: true,
};
elements.fallout_drum = {
behavior: behaviors.WALL,
category: "radiated",
state: "solid",
density: 9000,
color: "#e3cc34",
tempHigh: 2500,
stateHigh: ["aluminum","radiated_water","radiated_water","fallout"],
breakInto: ["fallout","fallout"],
reactions: { 
"water": { elem1:"fallout_drum", elem2:"radiated_water" },
}
};

elements.radiated_water = {
behavior: behaviors.LIQUID,
category: "radiated",
state:"liquid",
density :1300,
color: ["#23d959","#29d65d"],
hidden: true,
tempHigh: 140,
stateHigh: "polluted_air",
tempLow: -6,
stateLow: "rad_ice",
reactions: {
"human": { elem2:"rotten_meat" },
"body": { elem2:"rotten_meat" },
"head": { elem2:"ash" },
"bird": { elem2:"rotten_meat"},
"cell": { elem2:"cancer"},  
"worm": { elem2:"rotten_meat"},
}
};

elements.polluted_air = {
behavior: behaviors.DGAS,
category: "radiated",
state:"gas",
density :10,
color: ["#60f53b","#65ba50"],
reactions: {
    "body": { elem2:"rotten_meat" },
    "head": { elem2:"rotten_meat" },
    "human": { elem2:"rotten_meat" },
    "bird": { elem2:"rotten_meat" },
    "cell": { elem2:"cancer" },
    "water": { elem1: null, elem2: "radiated_water" },
    "worm": { elem2: ["ash","cancer"] },
    "flea": { elem2: "ash" },
    "seed": {elem2: "dead_plant" },
    "plant": {elem1: null, chance:0.5, elem2: "dead_plant", chance:0.5 },
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
    "polluted_air": {"charge1":1},
    "radiation": {"charge1":1},
    "rad_snow": {"charge1":1},
    "rad_rock": {"charge1":1},
}
};

elements.radiated_metal = {
behavior: behaviors.WALL,
category: "radiated",
state:"solid",
density :2045,
color: ["#5e705a","#83ab7b","#474747"],
tempHigh: 1440,
stateHigh: ["molten_nickel","molten_iron","molten_tin","fallout"],
reactions: {
   "water": { elem2:"radiated_water", chance:0.7 }, 
   "foam": { elem1:["tin","nickel","iron"] },
}
};

elements.rad_ice = {
behavior: behaviors.WALL,
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
behavior: behaviors.POWDER,
category: "radiated",
state:"powder",
density: 1500,
color: ["#9effe4","#b5fffd","#d4fff1"],
temp: -2,
tempHigh: 21,
stateHigh: "radiated_water",
};

elements.rad_rock = {
behavior: behaviors.POWDER,
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
    "polluted_air": {elem2: "oxygen"},
    "rad_snow": {elem2: "snow"},
    "rad_rock": {elem2: "rock"},
    "radiated_metal": {elem2: ["nickel","tin","iron"], },
    "fallout": {elem2: "rock", },
}
};


elements.rad_meat = {
behavior: behaviors.STURDYPOWDER,
category: "food",
state: "solid",
density: 1500,
color: ["#e8fc03","#f0b446","#92f046"],
tempHigh: 120,
stateHigh: ["rotten_meat","fallout"],
tempLow:-12,
stateLow: ["frozen_meat","radiation"],
reactions: {
  "water": {elem2: "radiated_water", chance:0.4},
  "salt_water": { elem2: "radiated_water" },
}
};

elements.lemon = {
behavior: behaviors.POWDER,
category: "food",
state: "powder",
density: 800,
color: ["#f9f934", "#f1ee20",],
tempHigh: 90,
stateHigh: "hot_lemon",
tempLow: -2,
stateLow: "wrinkled_lemon",
burn: 120,
burntime: 600,
burnInto: "ash",
breakInto: [ "lemon_water", "lemon_zest", ],
reactions: {
  "water": { elem2: "lemon_water", chance:0.2},
  "salt_water": { elem2: [ "lemon_water", "water",] },
  "dirty_water": { elem1: "rotten_lemon", },
  "soda": { elem2: "lemon_soda", },
  "head": { elem1: "saliva", chance:0.75}, 
  "milk": { elem2: "lemon_milk", },
  "tea": { elem2: "lemon_tea", },
  "poison": { elem2: "rotten_lemon", },
}                                                      
};

elements.hot_lemon = {
behavior: behaviors.POWDER,
state: "powder",
category: "food",
hidden: true,
density: 820,
color: ["#8a6d1e","#70661a",],
hidden: true,
temp: 90,
tempHigh: 200,
stateHigh: "fire",
tempLow: 30,
stateLow: "wrinkled_lemon",
burn: 120,
burntime: 600,
burnInto: "ash",
reactions: {
  "water": { elem2: "lemon_water", },
}
};

elements.wrinkled_lemon = {
behavior: behaviors.POWDER,
color: ["#999543","#a6a03a",],
state: "powder",
category: "food",
tempHigh: 90,
stateHigh: "hot_lemon",
hidden: true,
burn: 120,
burntime: 600,
burnInto: "ash",
reactions: {
"water": { elem2: "lemon_water", chance: 0.2,
}
}
};

elements.coolant = {
color: "#0eebeb",
behavior: [
    "XX|CO:4|XX",
    "CO:4|HT:1|CO:4",
    "XX|CO:4|XX",
],
category: "liquids",
state: "liquid",
insulate: true,
density: 1000,
darkText: false,
tempHigh: 500,
hidden: true,
stateHigh: "steam", 
};

elements.arkycite = {
color: "#46ab63",
behavior: behaviors.LIQUID,
category: "liquids",
state: "liquid",
density: 997,
darkText: false,
tempHigh: 400,
hidden: true,
burn: 40,
stateHigh: "fire", 
burntime: 500,
};

elements.lemon_water = {
color: ["#faec52","#faee69",],
behavior: behaviors.LIQUID,
category: "liquids",
state: "liquid",
density: 900,
tempHigh: 100,
stateHigh: ["steam","fragrance",],
hidden: true,
tempLow: -10,
stateLow: "lemon_ice",
reactions: {
"balloon": { elem2: "helium", chance: 0.5, },
"head": { elem1: "saliva", chance: 0.2, },
}
};

elements.lemon_zest = {
color: ["#ded254","#ccc03d",],
behavior: behaviors.POWDER,
category: "trashes",
state: "powder",
density: 1000,
hidden: true,
tempHigh: 350,
stateHigh: "fire",
breakInto: "lemon_water",
burn: 60,
burntime: 200,
burnInto: "smoke"
};

elements.saliva = {
color: ["#a6f5f0","#b6f0ec",],
behavior: behaviors.LIQUID,
category: "liquids",
state: "liquid",
density: 1280,
tempHigh: 105,
stateHigh: ["steam","fragrance"],
tempLow: -5,
stateHigh: "saliva_ice",
reactions: {
"water": { elem1: null, chance: 0.5, elem2: "dirty_water", chance: 0.5,
}
}
};

elements.lemon_milk = {
color: ["#f5f2c4","#f7f4b2",],
behavior: behaviors.LIQUID,
category: "liquids",
state: "liquid",
density: 1002,
tempHigh: 500,
stateHigh: "smoke",
tempLow: -2,
stateLow: "frozen_yogurt",
stateLowColor: ["#f5f3cb","#f7f5bc"],
reactions: {
"cell": { elem1: "yogurt", },
}
};

elements.lemon_soda = {
color: ["#f5c842","#edcc68",],
behavior: behaviors.LIQUID,
category: "liquids",
state: "liquid",
density: 1240,
tempHigh: 140,
stateHigh: ["carbon_dioxide", "smoke",],
reactions: {
"poison": { elem1: null, }
}
};

elements.saliva_ice = {
color: ["#97fcfb","#bcf7f6",],
behavior: behaviors.SOLID,
category: "states",
state: "solid",
density: 1300,
tempHigh: 5,
stateHigh: "saliva",
};

elements.lemon_tea = {
color: ["#dec85b","#edd351",],
behavior: behaviors.LIQUID,
category: "liquids",
state: "liquid",
density: 1580,
tempHigh: 280,
stateHigh: ["fragrance","smoke","smoke",],
tempLow: -2,
stateLowColor: ["#e8cf8b","#f0dca5",],
stateLow: "tea_ice",
reactions: {
"sugar": { elem2: null, },
}
};

elements.rotten_lemon = {
color: ["#e3f283","#cdcf6b"],
behavior: behaviors.POWDER,
category: "food",
state: "powder",
density: 1890,
tempHigh: 200,
stateHigh: ["stench","ash",],
reactions: {
"water": { elem2: "dirty_water" },
}
};

elements.cow = {
  color: ["#d9d9d9","#616161",],
  behavior: [
         "XX|XX|XX",
         "XX|FX%5.0|M2%5.0 AND BO",
         "XX|M1|XX",],
  category: "life",
  state: "powder",
  density: 2800,
  tempHigh: 250,
  stateHigh: "cooked_meat",
  tempLow: -10,
  stateLow: "frozen_meat",
  reactions: {
    "water": { elem2: null, chance: 0.2,},
    "milk": { elem2: null, chance: 0.1, },
    "alcohol": { elem2: null, chance: 0.21, },
    "poison": { elem1: "rotten_meat", elem2: null, },
    "grass": { elem2: null, },
    "plague": { elem1: "rotten_meat", chance: 0.3, },
    "worm": { elem2: null, },
    "flea": { elem2: null, },
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
    tempHigh: 6500,
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
    tempHigh: 6500,
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
        "sun": { elem1:"molten_tin", },
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
        "M2|XX|XX",
        "M1 AND XX|XX|XX",
        "M2|XX|XX",
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
        "XX|XX|M2",
       "XX|XX|M1 AND XX",
        "XX|XX|M2",
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
