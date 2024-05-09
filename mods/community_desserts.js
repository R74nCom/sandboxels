/*
 * Mod created by Tisquares
 * Every dessert idea is provided by the community. 
 * Don't see your favorite dessert? Let me know!
 * 
 * Got questions? Contact tisqbisque on Discord!
 * 
 * This version: 2.0
 */
// Other mods can add to this list [:
eListAdd("FRUITS",["apple","banana","blackberry","blueberry","grape","kiwi","mango","orange","peach","plum","pomegranate","rambutan","strawberry"]);
function fruitLength() {
    return eLists.FRUITS.length;
}

// Dulce de leche items
elements.dulce_de_leche = {
    alias: "manjar",
    color: ["#c56600", "#f7a204", "#ca6400", "#893604"],
    category: "Community",
    state: "liquid",
    behavior: behaviors.LIQUID,
    reactions: {
        "cream_cheese": { elem1: "dulce_de_leche", elem2: null, color1: ["#DFAB73", "#fbcc75", "#e2aa73", "#be9075"], oneway: true }, // for recipe accuracy :3
    },
    tempLow: -20,
    stateLow: "candy",
    tempHigh: 250,
    stateHigh: ["fragrance", "smoke", "smoke"],
    viscosity: 500,
    stain: 0.02,
    density: 1284.93,
    hidden: true,
    isFood: true,
    desc: "Added in version 1.0 of Community Desserts.\nMade by heating Sweetened Condensed Milk at 175°C+.\nFrom undexconocidox_26419.\n"
}
elements.sweetened_condensed_milk = {
    alias: "sweet_milk",
    color: ["#ffe9ba", "#fbd396", "#fde2a9"],
    category: "Community",
    state: "liquid",
    behavior: behaviors.LIQUID,
    onMix: function(cmilk, jamcheck) {
        if(shiftDown && elements[jamcheck.element].id === elements.jam.id && Math.random() < 0.06) {
            changePixel(cmilk,"mousse");
            pixelMap[cmilk.x][cmilk.y].color = shiftColor(rgbToHex(jamcheck.color),"#272727","add");
            deletePixel(jamcheck.x,jamcheck.y);
        }
    },
    tempLow: 0,
    stateLow: ["ice_cream", "sugar"],
    tempHigh: 175,
    stateHigh: "dulce_de_leche",
    viscosity: 5,
    stain: 0.015,
    density: 1050.83,
    hidden: true,
    isFood: true,
    desc: "Added in version 1.0 of Community Desserts.\nMade by mixing Milk and Sugar at 85°C+.\n",
}

// Chocotorta items
elements.cream_cheese = {
    color: ["#ebe9ea", "#e4dfdd", "#eeeeee"],
    category: "Community",
    state: "solid",
    behavior: behaviors.STURDYPOWDER,
    //reactions: {
    // For future use
    //},
    tempHigh: 65,
    stateHigh: "melted_cheese",
    stateHighColor: ["#fbffff", "#f6f6f6"],
    hardness: 0.01,
    density: 980.61,
    hidden: true,
    isFood: true,
    desc: "Added in version 1.0 of Community Desserts.\nMade by mixing Acid with Milk or Cream at 90°C-.\n",
}
elements.cocoa_bean = {
    color: ["#e16f51", "#e28e67", "#e18550", "#84574d"],
    category: "Community",
    state: "solid",
    behavior: behaviors.POWDER,
    // Has no reactions
    breakInto: "cocoa_powder",
    density: 593,
    tempHigh: 179.4,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    // not hidden by default
    // not food don't eat it
    desc: "Added in version 1.0 of Community Desserts.\n",
}
elements.cocoa_powder = {
    color: ["#855344", "#6d4c41", "#40271d"],
    category: "Community",
    state: "solid",
    behavior: behaviors.POWDER,
    onMix: function (powder, doughcheck) {
        if (elements[doughcheck.element].id == elements.dough.id && shiftDown && Math.random() < 0.25) {
            deletePixel(powder.x, powder.y);
            changePixel(doughcheck, "chocolate_biscuit_dough");
        }
    },
    density: 363.5,
    tempHigh: 50,
    stateHigh: "smoke",
    hidden: true,
    isFood: true,
    desc: "Added in version 1.0 of Community Desserts.\nMade by Smashing Cocoa Bean.\n",
}
elements.chocolate_biscuit_dough = {
    color: "#623727",
    category: "Community",
    state: "solid",
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 94,
    stateHigh: "chocolate_biscuit",
    burn: 40,
    burnTime: 25,
    burnInto: "ash",
    density: 526.9,
    isFood: true,
    hidden: true,
    desc: "Added in version 1.0 of Community Desserts.\nMade by hard mixing Cocoa Powder with Dough.\n",
}
elements.chocolate_biscuit = {
    color: "#864B36",
    category: "Community",
    state: "solid",
    behavior: behaviors.STURDYPOWDER,
    breakInto: "crumb",
    breakIntoColor: ["#af8264", "#b28461", "#aa7852", "#a8744b"],
    tempHigh: 232.2,
    stateHigh: ["smoke", "smoke", "smoke", "ash"],
    density: 233.96,
    isFood: true,
    hidden: true,
    desc: "Added in version 1.0 of Community Desserts.\nMade by cooking Choco Biscuit Dough at 94°C+.\nCan be layered with other items to make chocotorta, from undexconocidox_26419.\n",
}

// Haupia items
elements.coconut = {
    color: ["#793b1e", "#995c31", "#5f3015"],
    category: "Community",
    state: "solid",
    behavior: behaviors.POWDER,
    breakInto: ["coconut_milk", "tinder"],
    tempHigh: 225,
    stateHigh: ["steam", "ash", "smoke"],
    density: 822,
    desc: "Added in version 1.0 of Community Desserts.\n",
}
elements.coconut_milk = {
    color: ["#f3f3f3", "#e4ddcb", "#f8f8f8"],
    category: "Community",
    state: "liquid",
    behavior: behaviors.LIQUID,
    reactions: {
        "sugar": { elem1: null, elem2: "haupia_mix", tempMin: 90 },
    },
    tempHigh: 102,
    stateHigh: "steam",
    tempLow: -0.5,
    stateLowName: "coconut_ice",
    viscosity: 1.8,
    density: 1031.33,
    hidden: true,
    isFood: true,
    desc: "Added in version 1.0 of Community Desserts.\nMade by smashing Coconut.\n",
}
elements.haupia_mix = {
    color: ["#f3f3f3", "#e4ddcb", "#f8f8f8"],
    category: "Community",
    state: "liquid",
    behavior: behaviors.LIQUID,
    tempHigh: 105,
    stateHigh: "steam",
    tempLow: 3,
    stateLow: "haupia",
    viscosity: 2.3,
    density: 1242.67,
    hidden: true,
    desc: "Added in version 1.0 of Community Desserts.\nMade by mixing Coconut Milk and Sugar at 90°C+.\n",
}
elements.haupia = {
    color: ["#ffffff", "#f8f8f8", "#f7f9f8"],
    category: "Community",
    state: "solid",
    behavior: behaviors.SUPPORT,
    tempHigh: 105,
    stateHigh: ["steam", "fragrance"],
    density: 1300,
    hidden: true,
    isFood: true,
    desc: "Added in version 1.0 of Community Desserts.\nMade by cooling Haupia Mix at 3°C-.\nFrom tisqbisque.\n"
}

// Pie crust items
elements.pie_crust_batter = {
    alias: "pie_batter",
    color: ["#efdbae", "#ffe6ab", "#eacb88"],
    category: "Community",
    state: "solid",
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 180,
    stateHigh: "pie_crust",
    density: 233.96,
    isFood: true,
    hidden: true,
    desc: "Added in version 2.0 of Community Desserts.\nMade by mixing Dough and Butter.\n",
}
elements.pie_crust = {
    color: ["#c18d45", "#b07f3c", "#d0a352", "#b27f3a"],
    category: "Community",
    state: "solid",
    behavior: behaviors.STURDYPOWDER,
    breakInto: "crumb",
    breakIntoColor: ["#af8264", "#b28461", "#aa7852", "#a8744b"],
    tempHigh: 232.2,
    stateHigh: ["smoke", "smoke", "smoke", "ash"],
    density: 233.96,
    isFood: true,
    hidden: true,
    desc: "Added in version 2.0 of Community Desserts.\nMade by cooking Pie Crust Batter at 180°C+.\n",
}

// Jam and fruit items
elements.jam = {
    color: ["#e14a4a","#f64040","#e72225"],
    category: "Community",
    state: "liquid",
    behavior: behaviors.LIQUID,
    tick: function (pixel) {
        var madeJelly = false;
        // Check left, right, up, down from jam pixel..
        if(pixel.temp >= 95) {
            if(Math.random() < 0.05 && pixel.x-1 !== 0) {
                if (!isEmpty(pixel.x-1,pixel.y) && pixelMap[pixel.x-1][pixel.y].element === "water") {
                    changePixel(pixelMap[pixel.x-1][pixel.y],"jelly");
                    pixelMap[pixel.x-1][pixel.y].color = shiftColor(rgbToHex(pixel.color),"#272727","sub");
                    madeJelly = true;
                };
            };
            if(Math.random() < 0.05 && pixel.x+1 !== width) {
                if (!isEmpty(pixel.x+1,pixel.y) && pixelMap[pixel.x+1][pixel.y].element === "water") {
                    changePixel(pixelMap[pixel.x+1][pixel.y],"jelly");  
                    pixelMap[pixel.x+1][pixel.y].color = shiftColor(rgbToHex(pixel.color),"#272727","sub");
                    madeJelly = true;
                };
            };
            if(Math.random() < 0.05 && pixel.y-1 !== 0) {
                if (!isEmpty(pixel.x,pixel.y-1) && pixelMap[pixel.x][pixel.y-1].element === "water") {
                    changePixel(pixelMap[pixel.x][pixel.y-1],"jelly");
                    pixelMap[pixel.x][pixel.y-1].color = shiftColor(rgbToHex(pixel.color),"#272727","sub");
                    madeJelly = true;
                };
            };
            if(Math.random() < 0.05 && pixel.y+1 !== height) {
                if (!isEmpty(pixel.x,pixel.y+1) && pixelMap[pixel.x][pixel.y+1].element === "water") {
                    changePixel(pixelMap[pixel.x][pixel.y+1],"jelly");
                    pixelMap[pixel.x][pixel.y+1].color = shiftColor(rgbToHex(pixel.color),"#272727","sub");
                    madeJelly = true;
                };
            };
            if(madeJelly) {
                deletePixel(pixel.x,pixel.y);
            }
        }
    },
    tempHigh: 160,
    stateHigh: ["smoke", "smoke", "sugar"],
    tempLow: -5,
    stateLowName: "frozen_jam",
    stateLowColorMultiplier: 1.1,
    viscosity: 200000,
    stain: 0.3,
    density: 1333.5,
    isFood: true,
    hidden: true,
    desc: "Added in version 2.0 of Community Desserts.\nMade by smashing a fruit.\n",
}
elements.frozen_jam = {
    stateHighColorMultiplier: 0.91,
}
elements.fruit_seed = { // similar to pinecone
    color: ["#5c3333","#472727","#311b1b"],
    tick: function(pixel) {
        if (!tryMove(pixel,pixel.x,pixel.y+1) && pixelTicks-pixel.start > 50) {
            if (pixel.h === undefined) { // set to even number between 8 and 26
                pixel.h = Math.floor(Math.random()*9)*2+8;
                pixel.lh = pixel.h;
            }
            if (Math.random() < 0.02 && pixel.h > 0 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) { // grow roots
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel && (eLists.SOIL.indexOf(dirtPixel.element) !== -1  || dirtPixel.element === "grass")) {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1) && tryMove(pixel,pixel.x,pixel.y-1)) {
                    createPixel("wood",pixel.x,pixel.y+1);
                    pixel.h --;
                }
            }
            else if (pixel.h === 0) {
                changePixel(pixel,"fruit_tree");
                pixelMap[pixel.x][pixel.y].h = pixel.lh;
            }
        }
        doDefaults(pixel);
    },
    tempHigh: 500,
    stateHigh: "wood",
    burn: 5,
    burnTime: 100,
    category: "Community",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    desc: "Added in version 2.0 of Community Desserts.\nGrows into Fruit Tree.\n"
}
elements.fruit_tree = { // like sapling
    color: ["#007a00","#0a910a","#036903"],
    tick: function (pixel) {
        if (pixel.h > 0 && pixelTicks % (50+pixel.h) === 0) {
            // extend to the left and right, giving the next h-1
            // The taller the tree, the longer the umbrella
            if (isEmpty(pixel.x-1,pixel.y)) {
                createPixel("fruit_tree",pixel.x-1,pixel.y);
                pixelMap[pixel.x-1][pixel.y].h = pixel.h-2;
            }
            if (isEmpty(pixel.x+1,pixel.y)) {
                createPixel("fruit_tree",pixel.x+1,pixel.y);
                pixelMap[pixel.x+1][pixel.y].h = pixel.h-2;
            }
            if (isEmpty(pixel.x,pixel.y-1)) {
                createPixel("fruit_tree",pixel.x,pixel.y-1);
            }
        }
        else if(isEmpty(pixel.x,pixel.y+1) && Math.random() < 0.0005 ) {
            createPixel(eLists.FRUITS[Math.floor(Math.random()*fruitLength())],pixel.x,pixel.y+1);
        }
        doDefaults(pixel);
    },
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category: "Community",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:45,
    burnTime:75,
    burnInto: ["dead_plant","dead_plant","dead_plant","dead_plant","fruit_seed"],
    breakInto: ["dead_plant","dead_plant","dead_plant","dirt","sap"],
    state: "solid",
    density: 1050,
    seed: "fruit_seed",
    hidden: true,
    movable: false,
    desc: "Added in version 2.0 of Community Desserts.\nMay drop a random fruit. Current # of fruits: " + (fruitLength()-1) +".\n",
}
elements.apple = {
    color: ["#c6de70","#efdc5c","#c75833","#bd3838"],
    category: "Community",
    state: "solid",
    behavior: behaviors.POWDER,
    reactions: {
        "rock": { elem1:"juice", chance:0.1, color1:"#f5cb40" },
        "concrete": { elem1:"juice", chance:0.1, color1:"#f5cb40" },
        "basalt": { elem1:"juice", chance:0.1, color1:"#f5cb40" },
        "limestone": { elem1:"juice", chance:0.1, color1:"#f5cb40" },
        "tuff": { elem1:"juice", chance:0.1, color1:"#f5cb40" },
        "acid": { elem1:"juice", color1:"#f5cb40" },
        "acid_gas": { elem1:"juice", color1:"#f5cb40" },
    },
    breakInto: "jam",
    breakIntoColor: ["#ddae16","#fdcd53","#fed75e","#e9b429"],
    tempHigh: 256,
    stateHigh: ["steam", "sugar"],
    density: 460.72,
    isFood: true,
    hidden: true,
    desc: "Added in version 2.0 of Community Desserts.\n"
}
elements.banana = {
    color: ["#f8e662","#ffe312","#fee402","#fed601"],
    category: "Community",
    state: "solid",
    behavior: behaviors.POWDER,
    reactions: {
        "rock": { elem1:"juice", chance:0.1, color1:"#fae7b5" },
        "concrete": { elem1:"juice", chance:0.1, color1:"#fae7b5" },
        "basalt": { elem1:"juice", chance:0.1, color1:"#fae7b5" },
        "limestone": { elem1:"juice", chance:0.1, color1:"#fae7b5" },
        "tuff": { elem1:"juice", chance:0.1, color1:"#fae7b5" },
        "acid": { elem1:"juice", color1:"#fae7b5" },
        "acid_gas": { elem1:"juice", color1:"#fae7b5" },
    },
    breakInto: "jam",
    breakIntoColor: ["#d6aa46","#e3b544","#cda23a","#e3c869"],
    tempHigh: 256,
    stateHigh: ["steam", "sugar"],
    density: 634.01,
    isFood: true,
    hidden: true,
    desc: "Added in version 2.0 of Community Desserts.\n"
}
elements.blackberry = {
    color: ["#5c2f3e","#281c2a","#02060f","#19252c"],
    category: "Community",
    state: "solid",
    behavior: behaviors.POWDER,
    reactions: {
        "rock": { elem1:"juice", chance:0.1, color1:"#7b1e57" },
        "concrete": { elem1:"juice", chance:0.1, color1:"#7b1e57" },
        "basalt": { elem1:"juice", chance:0.1, color1:"#7b1e57" },
        "limestone": { elem1:"juice", chance:0.1, color1:"#7b1e57" },
        "tuff": { elem1:"juice", chance:0.1, color1:"#7b1e57" },
        "acid": { elem1:"juice", color1:"#7b1e57" },
        "acid_gas": { elem1:"juice", color1:"#7b1e57" },
    },
    breakInto: "jam",
    breakIntoColor: ["#481317","#50030d","#250b0c","#62020d"],
    tempHigh: 256,
    stateHigh: ["steam", "sugar"],
    density: 608.65,
    isFood: true,
    hidden: true,
    desc: "Added in version 2.0 of Community Desserts.\n"
}
elements.blueberry = {
    color: ["#385f9e","#386891","#4874b5","#4b8ee3"],
    category: "Community",
    state: "solid",
    behavior: behaviors.POWDER,
    reactions: {
        "rock": { elem1:"juice", chance:0.1, color1:"#933487" },
        "concrete": { elem1:"juice", chance:0.1, color1:"#933487" },
        "basalt": { elem1:"juice", chance:0.1, color1:"#933487" },
        "limestone": { elem1:"juice", chance:0.1, color1:"#933487" },
        "tuff": { elem1:"juice", chance:0.1, color1:"#933487" },
        "acid": { elem1:"juice", color1:"#933487" },
        "acid_gas": { elem1:"juice", color1:"#933487" },
    },
    breakInto: "jam",
    breakIntoColor: ["#48132c","#6f3a56","#13030d","#351123"],
    tempHigh: 256,
    stateHigh: ["steam", "sugar"],
    density: 625.56,
    isFood: true,
    hidden: true,
    desc: "Added in version 2.0 of Community Desserts.\n"
}
elements.kiwi = {
    color: ["#be8456","#cb8a3e","#bc7742","#975e25"],
    category: "Community",
    state: "solid",
    behavior: behaviors.POWDER,
    reactions: {
        "rock": { elem1:"juice", chance:0.1, color1:"#eef299" },
        "concrete": { elem1:"juice", chance:0.1, color1:"#eef299" },
        "basalt": { elem1:"juice", chance:0.1, color1:"#eef299" },
        "limestone": { elem1:"juice", chance:0.1, color1:"#eef299" },
        "tuff": { elem1:"juice", chance:0.1, color1:"#eef299" },
        "acid": { elem1:"juice", color1:"#eef299" },
        "acid_gas": { elem1:"juice", color1:"#eef299" },
    },
    breakInto: "jam",
    breakIntoColor: ["#beb43c","#b7ac41","#8d7614","#755e11"],
    tempHigh: 256,
    stateHigh: ["steam", "sugar"],
    density: 748.14,
    isFood: true,
    hidden: true,
    desc: "Added in version 2.0 of Community Desserts.\n"
}
elements.mango = {
    color: ["#ff1f25","#f97231","#fdeb1d","#85b624"],
    category: "Community",
    state: "solid",
    behavior: behaviors.POWDER,
    reactions: {
        "rock": { elem1:"juice", chance:0.1, color1:"#ffbf34" },
        "concrete": { elem1:"juice", chance:0.1, color1:"#ffbf34" },
        "basalt": { elem1:"juice", chance:0.1, color1:"#ffbf34" },
        "limestone": { elem1:"juice", chance:0.1, color1:"#ffbf34" },
        "tuff": { elem1:"juice", chance:0.1, color1:"#ffbf34" },
        "acid": { elem1:"juice", color1:"#ffbf34" },
        "acid_gas": { elem1:"juice", color1:"#ffbf34" },
    },
    breakInto: "jam",
    breakIntoColor: ["#ef9d00","#fdb005","#fed803","#fbdd00"],
    tempHigh: 256,
    stateHigh: ["steam", "sugar"],
    density: 697.41,
    isFood: true,
    hidden: true,
    desc: "Added in version 2.0 of Community Desserts.\n"
}
elements.orange = {
    color: ["#ffa500","#ff951d","#ffb20a","#f68310"],
    category: "Community",
    state: "solid",
    behavior: behaviors.POWDER,
    reactions: {
        "rock": { elem1:"juice", chance:0.1, color1:"#f7ca05" },
        "concrete": { elem1:"juice", chance:0.1, color1:"#f7ca05" },
        "basalt": { elem1:"juice", chance:0.1, color1:"#f7ca05" },
        "limestone": { elem1:"juice", chance:0.1, color1:"#f7ca05" },
        "tuff": { elem1:"juice", chance:0.1, color1:"#f7ca05" },
        "acid": { elem1:"juice", color1:"#f7ca05" },
        "acid_gas": { elem1:"juice", color1:"#f7ca05" },
    },
    breakInto: "jam",
    breakIntoColor: ["#edb848","#f6b23e","#e59e12","#eca528"],
    tempHigh: 256,
    stateHigh: ["steam", "sugar"],
    density: 435, // these oranges have peels so they float [:
    isFood: true,
    hidden: true,
    desc: "Added in version 2.0 of Community Desserts.\n"
}
elements.peach = {
    color: ["#ffc612","#f78a00","#d43d22","#a41622"],
    category: "Community",
    state: "solid",
    behavior: behaviors.POWDER,
    reactions: {
        "rock": { elem1:"juice", chance:0.1, color1:"#ffc663" },
        "concrete": { elem1:"juice", chance:0.1, color1:"#ffc663" },
        "basalt": { elem1:"juice", chance:0.1, color1:"#ffc663" },
        "limestone": { elem1:"juice", chance:0.1, color1:"#ffc663" },
        "tuff": { elem1:"juice", chance:0.1, color1:"#ffc663" },
        "acid": { elem1:"juice", color1:"#ffc663" },
        "acid_gas": { elem1:"juice", color1:"#ffc663" },
    },
    breakInto: "jam",
    breakIntoColor: ["#f59400","#f29e04","#e9a230","#eead37"],
    tempHigh: 256,
    stateHigh: ["steam", "sugar"],
    density: 650.92,
    isFood: true,
    hidden: true,
    desc: "Added in version 2.0 of Community Desserts.\n"
}
elements.plum = {
    color: ["#952444","#5a2346","#3e2141","#450a1a"],
    category: "Community",
    state: "solid",
    behavior: behaviors.POWDER,
    reactions: {
        "rock": { elem1:"juice", chance:0.1, color1:"#a10013" },
        "concrete": { elem1:"juice", chance:0.1, color1:"#a10013" },
        "basalt": { elem1:"juice", chance:0.1, color1:"#a10013" },
        "limestone": { elem1:"juice", chance:0.1, color1:"#a10013" },
        "tuff": { elem1:"juice", chance:0.1, color1:"#a10013" },
        "acid": { elem1:"juice", color1:"#a10013" },
        "acid_gas": { elem1:"juice", color1:"#a10013" },
    },
    breakInto: "jam",
    breakIntoColor: ["#a9050c","#55081a","#781123","#4f1e2f"],
    tempHigh: 256,
    stateHigh: ["steam", "sugar"],
    density: 697.41,
    isFood: true,
    hidden: true,
    desc: "Added in version 2.0 of Community Desserts.\n"
}
elements.pomegranate = {
    color: ["#fd4127","#be2216","#aa1519","#330104"],
    category: "Community",
    state: "solid",
    behavior: behaviors.POWDER,
    reactions: {
        "rock": { elem1:"juice", chance:0.1, color1:"#c9002c" },
        "concrete": { elem1:"juice", chance:0.1, color1:"#c9002c" },
        "basalt": { elem1:"juice", chance:0.1, color1:"#c9002c" },
        "limestone": { elem1:"juice", chance:0.1, color1:"#c9002c" },
        "tuff": { elem1:"juice", chance:0.1, color1:"#c9002c" },
        "acid": { elem1:"juice", color1:"#c9002c" },
        "acid_gas": { elem1:"juice", color1:"#c9002c" },
    },
    breakInto: "jam",
    breakIntoColor: ["#4b0000","#6b0900","#a3000e","#c80402"],
    tempHigh: 256,
    stateHigh: ["steam", "sugar"],
    density: 1150,
    isFood: true,
    hidden: true,
    desc: "Added in version 2.0 of Community Desserts.\n"
}
elements.rambutan = {
    color: ["#9a1408","#eb2814","#9bf05f","#f6ffff"],
    category: "Community",
    state: "solid",
    behavior: behaviors.POWDER,
    reactions: {
        "rock": { elem1:"juice", chance:0.1, color1:"#eae6dd" },
        "concrete": { elem1:"juice", chance:0.1, color1:"#eae6dd" },
        "basalt": { elem1:"juice", chance:0.1, color1:"#eae6dd" },
        "limestone": { elem1:"juice", chance:0.1, color1:"#eae6dd" },
        "tuff": { elem1:"juice", chance:0.1, color1:"#eae6dd" },
        "acid": { elem1:"juice", color1:"#eae6dd" },
        "acid_gas": { elem1:"juice", color1:"#eae6dd" },
    },
    breakInto: "jam",
    breakIntoColor: ["#60271a","#773119","#841e01","#953810"],
    tempHigh: 256,
    stateHigh: ["steam", "sugar"],
    density: 281,
    isFood: true,
    hidden: true,
    desc: "Added in version 2.0 of Community Desserts.\n"
}
elements.strawberry = {
    color: ["#c53415","#ea1720","#f1232d","#ea7e72"],
    category: "Community",
    state: "solid",
    behavior: behaviors.POWDER,
    reactions: {
        "rock": { elem1:"juice", chance:0.1, color1:"#f53c28" },
        "concrete": { elem1:"juice", chance:0.1, color1:"#f53c28" },
        "basalt": { elem1:"juice", chance:0.1, color1:"#f53c28" },
        "limestone": { elem1:"juice", chance:0.1, color1:"#f53c28" },
        "tuff": { elem1:"juice", chance:0.1, color1:"#f53c28" },
        "acid": { elem1:"juice", color1:"#f53c28" },
        "acid_gas": { elem1:"juice", color1:"#f53c28" },
    },
    breakInto: "jam",
    // Jam is strawberry-colored by default akschully
    tempHigh: 256,
    stateHigh: ["steam", "sugar"],
    density: 642.47,
    isFood: true,
    hidden: true,
    desc: "Added in version 2.0 of Community Desserts.\n"
}

// Vanilla items
elements.vanilla_bean = {
    alias: "vanilla",
    color: ["#362C1D","#6f4a3b","#764735","#593b30"],
    category: "Community",
    state: "solid",
    behavior: behaviors.POWDER,
    reactions: {
        "rock": { elem1:"vanilla_extract", chance:0.1 },
        "concrete": { elem1:"vanilla_extract", chance:0.1 },
        "basalt": { elem1:"vanilla_extract", chance:0.1 },
        "limestone": { elem1:"vanilla_extract", chance:0.1 },
        "tuff": { elem1:"vanilla_extract", chance:0.1 },
        "acid": { elem1:"vanilla_extract" },
        "acid_gas": { elem1:"vanilla_extract", },
    },
    breakInto: "vanilla_extract",
    tempHigh: 315,
    stateHigh: ["steam","ash"],
    density: 1100,
    desc: "Added in version 2.0 of Community Desserts.\n"
}
elements.vanilla_extract = {
    // Will have more application one day
    color: ["#5e1b00","#321501"],
    category: "Community",
    state: "liquid",
    behavior: behaviors.LIQUID,
    tempHigh: 285,
    stateHigh: ["steam", "alcohol_gas"],
    density: 879.16,
    viscosity: 5000,
    stain: 0.45,
    hidden: true,
    desc: "Added in version 2.0 of Community Desserts.\nMade by smashing Vanilla Bean.\nFrom lethanaero.\n",
}

// Mousse items
elements.mousse = {
    color: ["#fffdce","#fffee2","#fffff5"],
    category: "Community",
    state: "liquid",
    behavior: behaviors.LIQUID,
    tempHigh: 286,
    stateHigh: ["steam", "smoke", "smoke", "sugar"],
    density: 1707.61,
    viscosity: 5000000, // is there a limit?
    hidden: true,
    desc: "Added in version 2.0 of Community Desserts.\nMade by hard mixing Jam and Sweetened Condensed Milk.\nFrom brickmaster0513.\n",
}

// Tiramisu items
elements.egg_ribbons = {
    color: ["#ffdc5e","#ffe07c"],
    category: "Community",
    state: "liquid",
    behavior: behaviors.LIQUID,
    tempHigh: 150,
    stateHigh: ["smoke","hard_yolk"],
    tempLow: 0,
    stateLow: ["sugar","hard_yolk"],
    density: 1227.5,
    viscosity: 300,
    hidden: true,
    desc: "Added in version 2.0 of Community Desserts.\nMade by hard mixing Yolk and Sugar.\n",
}
elements.mascarpone = {
    color: ["#faf9f1","#faf9f7"],
    category: "Community",
    state: "liquid",
    behavior: behaviors.LIQUID,
    reactions: {
        "egg_ribbons": { elem1:"tiramisu_cream", elem2:null }
    },
    tempHigh: 218,
    stateHigh: ["smoke","smoke"],
    density: 946.79,
    viscosity: 30000,
    hidden: true,
    desc: "Added in version 2.0 of Community Desserts.\nMade by mixing Acid with Milk or Cream at 85°C+.\n",
}
elements.tiramisu_cream = {
    color: ["#fff0d1","#fbefd7"],
    category: "Community",
    state: "liquid",
    behavior: behaviors.LIQUID,
    tempHigh: 218,
    stateHigh: ["smoke","smoke"],
    density: 946.79,
    viscosity: 30000,
    hidden: true,
    desc: "Added in version 2.0 of Community Desserts.\nMade by mixing Egg Ribbons with Mascarpone.\nCan be layered with other items to make tiramisu, from tisqbisque.\n",
}

// Adjusting existing elements here
if (!elements.milk.reactions) { elements.milk.reactions = {} };
elements.milk.reactions.acid = { elem1: null, elem2: "cream_cheese", chance: 0.8 };
elements.milk.reactions.sugar = { elem1: "sweetened_condensed_milk", elem2: null, chance: 0.05, tempMin: 85 };

if (!elements.cream.reactions) { elements.cream.reactions = {} };
elements.cream.reactions.acid = { elem1: "cream_cheese", elem2: null, chance: 0.8, tempMax:90 };
if (!elements.acid.reactions) { elements.acid.reactions = {} };
elements.acid.reactions.cream = { elem1: null, elem2: "mascarpone", chance: 0.5, tempMin:85 };

if (!elements.dough.reactions) { elements.dough.reactions = {} };
elements.dough.reactions.butter = { elem1: "pie_crust_batter", elem2: null, chance: 0.05 };

if(elements.sugar.reactions.grape) { delete elements["sugar"].reactions.grape; }; // I would remove the reactions entirely but I don't want to mess with other mods
if(elements.caramel.reactions.grape) { delete elements["caramel"].reactions.grape; };
if(elements.grape.reactions.water) { delete elements["grape"].reactions.water };
if(elements.grape.reactions.sugar_water) { delete elements["grape"].reactions.sugar_water };
if (!elements.grape.hidden) { elements.grape.hidden = true };
elements.grape.breakInto = "jam";

if (!elements.jelly.desc) { elements.jelly.desc = "Changed in version 2.0 of Community Desserts.\nMade by mixing Jam and Water at temperatures 95°C+.\n" };
if (!elements.jelly.hidden) { elements.jelly.hidden = true };
elements.jelly.viscosity = 150000;
elements.jelly.stain = 0.25;

elements.yolk.onMix = function(pixel,sugarcheck) {
    if (elements[sugarcheck.element].id == elements.sugar.id && shiftDown && Math.random() < 0.35) {
        deletePixel(sugarcheck.x, sugarcheck.y);
        changePixel(pixel, "egg_ribbons");
    }
}

// Mod items first
elements.acid.ignore = ["cream_cheese", "cream", "milk", "mascarpone",
    "glass", "rad_glass", "glass_shard", "rad_shard", "stained_glass", "baked_clay", "acid_gas", "neutral_acid", "acid_cloud", "water", "salt_water", "sugar_water", "dirty_water", "copper", "gold", "porcelain", "plastic", "bead", "microplastic", "molten_plastic", "pool_water", "chlorine", "hydrogen", "gold_coin", "silver", "nickel", "calcium", "bone"];

// For new colors
function shiftColor(base, change, direction) {
    const colorRegEx = /^\#?[A-Fa-f0-9]{6}$/;

    // Missing parameter(s)
    if (!base || !change) {
        console.log("Parameter absent!");
        return '#000000';
    }
    // Invalid parameter(s)
    if (!base.match(colorRegEx) || !change.match(colorRegEx)) {
        console.log("Parameter bad!");
        return '#000000';
    }

    // Remove any '#'
    base = base.replace(/\#/g, '');
    change = change.replace(/\#/g, '');

    // Build new color
    let newColor = '';
    for (let i = 0; i < 3; i++) {
        const basePiece = parseInt(base.substring(i * 2, i * 2 + 2), 16);
        const changePiece = parseInt(change.substring(i * 2, i * 2 + 2), 16);
        let newPiece = '';

        if (direction === 'add') { // Adding a lighter color makes it darker. #000000 does effectively nothing! #ffffff makes it fully white!
            newPiece = (basePiece + changePiece);
            newPiece = newPiece > 255 ? 255 : newPiece;
        }
        if (direction === 'sub') { // Subtracting a darker color makes it closer to original. #000000 does effectively nothing! #ffffff makes it fully black!
            newPiece = (basePiece - changePiece);
            newPiece = newPiece < 0 ? 0 : newPiece;
        }

        newPiece = newPiece.toString(16);
        newPiece = newPiece.length < 2 ? '0' + newPiece : newPiece;
        newColor += newPiece;
    }

    return '#' + newColor;
}

function rgbToHex(rgbObj) {
    var values = rgbObj.substring(rgbObj.indexOf('(') + 1, rgbObj.lastIndexOf(')')).split(',');
    var r = parseInt(values[0]);
    var g = parseInt(values[1]);
    var b = parseInt(values[2]);
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}