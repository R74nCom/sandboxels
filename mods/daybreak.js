elements.beautiful_sun = {
    color: "#c12600",
    tick: function(pixel) {
        // minimum 1726
        // maximum 7726
        if (pixel.eclipse) { pixel.color = pixelColorPick(pixel,"#f68656"); var c=0.01}
        else if (pixel.temp < 1500) { pixel.color = pixelColorPick(pixel,"#7a4e43"); }
        else if (pixel.temp < 3600) { pixel.color = pixelColorPick(pixel,"#ffbdbd"); var c=0.05 }
        else if (pixel.temp < 7000) { pixel.color = pixelColorPick(pixel,"#c12600"); var c=0.1 }
        else if (pixel.temp < 11000) { pixel.color = pixelColorPick(pixel,"#ffb09c"); var c=0.25 }
        else if (pixel.temp < 28000) { pixel.color = pixelColorPick(pixel,"#f7fff5"); var c=0.5 }
        else { pixel.color = pixelColorPick(pixel,"#c3bdff"); var c=0.4 }
        if (pixel.temp < 1500) { var c=0 }
        for (var i = 0; i < adjacentCoords.length; i++) {
            var x = pixel.x+adjacentCoords[i][0];
            var y = pixel.y+adjacentCoords[i][1];
            if (isEmpty(x,y)) {
                if (Math.random() > c) {continue}
                createPixel("beautiful_light", x, y);
                pixelMap[x][y].color = pixel.color;
            }
            else if (!outOfBounds(x,y)) {
                var newPixel = pixelMap[x][y];
                if (elements[newPixel.element].id === elements.beautiful_sun.id) {
                    if (pixel.eclipse) { newPixel.eclipse = true }
                    if (pixel.temp!==newPixel.temp) {
                        var avg = (pixel.temp + newPixel.temp)/2;
                        pixel.temp = avg;
                        newPixel.temp = avg;
                        pixelTempCheck(pixel);
                        pixelTempCheck(newPixel);
                    }
                }
                else if (elements[newPixel.element].id === elements.sun.id) {
                    changePixel(newPixel, "beautiful_sun");
                }
            }
        }
    },
    tool: function(pixel) {
        if (pixel.element === "light") {
            deletePixel(pixel.x,pixel.y);
        }
        if (pixel.element === "beautiful_light") {
            deletePixel(pixel.x,pixel.y);
        }
    },
    canPlace: true,
    reactions: {
        "hydrogen": { elem2:"helium", temp1:5 },
        "helium": { elem2:"carbon_dioxide", temp1:5, tempMax:3600 },
        "carbon_dioxide": { elem2:"neon", temp1:5, tempMax:1800 },
        "sun": { elem2:"beautiful_sun", },
        "light": { elem2:"beautiful_light" },
    },
    temp: 5504,
    tempLow: -100,
    stateLow: "supernova",
    category: "brokenday",
    state: "gas",
    //density: 1408,
    insulate: true,
    noMix: true,
    alias: "hateful_star",
    movable: false
},

elements.beautiful_light = {
    hidden: true,
    name: "light",
    color: "#c12600",
    tick: function(pixel) {
    if (Math.random() < 0.01) {
        deletePixel(pixel.x,pixel.y);
        return;
    }
    if (pixel.bx===undefined) {
        // choose 1, 0, or -1
        pixel.bx = Math.random() < 0.5 ? 1 : Math.random() < 0.5 ? 0 : -1;
        pixel.by = Math.random() < 0.5 ? 1 : Math.random() < 0.5 ? 0 : -1;
        // if both are 0, make one of them 1 or -1
        if (pixel.bx===0 && pixel.by===0) {
            if (Math.random() < 0.5) { pixel.bx = Math.random() < 0.5 ? 1 : -1; }
            else { pixel.by = Math.random() < 0.5 ? 1 : -1; }
        }
    }
    // move and invert direction if hit
    if (pixel.bx && !tryMove(pixel, pixel.x+pixel.bx, pixel.y)) {
        var newX = pixel.x + pixel.bx;
        if (!isEmpty(newX, pixel.y, true)) {
            var newPixel = pixelMap[pixel.x+pixel.bx][pixel.y];
            if (!elements[newPixel.element].insulate) {
                newPixel.temp += 1;
                pixelTempCheck(newPixel);
            }
            if (!elements.light.reactions[newPixel.element]) {
                pixel.color = newPixel.color;
            }
            else if (!elements.beautiful_light.reactions[newPixel.element]) {
                pixel.color = newPixel.color;
            }
        }
        pixel.bx = -pixel.bx;
    }
    if (pixel.by && !tryMove(pixel, pixel.x, pixel.y+pixel.by)) {
        var newY = pixel.y + pixel.by;
        if (!isEmpty(pixel.x, newY, true)) {
            var newPixel = pixelMap[pixel.x][pixel.y+pixel.by];
            if (!elements[newPixel.element].insulate) {
                newPixel.temp += 0.05;
                pixelTempCheck(newPixel);
            }
            if (!elements.light.reactions[newPixel.element]) {
                pixel.color = newPixel.color;
            }
            else if (!elements.beautiful_light.reactions[newPixel.element]) {
                pixel.color = newPixel.color;
            }
        }
        pixel.by = -pixel.by;
    }
    },
    reactions: {
        "glass": { "color1":["#ff0000","#ff8800","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"] },
        "glass_shard": { "color1":["#ff0000","#ff8800","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"] },
        "rad_glass": { "color1":["#9f6060","#9f8260","#9f9f60","#609f60","#609f9f","#60609f","#9f609f"] },
        "rad_shard": { "color1":["#9f6060","#9f8260","#9f9f60","#609f60","#609f9f","#60609f","#9f609f"] },
        "steam": { "color1":["#ff0000","#ff8800","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"] },
        "rain_cloud": { "color1":["#ff0000","#ff8800","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"] },
        "cloud": { "color1":["#ff0000","#ff8800","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"] },
        "smog": { "color1":["#9f6060","#9f8260","#9f9f60","#609f60","#609f9f","#60609f","#9f609f"] },
        "ice": { "color1":"#c2fff9" },
        "rime": { "color1":"#c2fff9" },
        "water": { "color1":"#a1bac9" },
        "salt_water": { "color1":"#a1bac9" },
        "sugar_water": { "color1":"#a1bac9" },
        "dirty_water": { "color1":"#a1c9a8" },
        "seltzer": { "color1":"#c2fff9" },
        "diamond": { "color1":["#c2c5ff","#c2d9ff"] },
        "rainbow": { "color1":["#ff0000","#ff8800","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"] },
        "static": { "color1":["#ffffff","#bdbdbd","#808080","#424242","#1c1c1c"] },
        "sun": { elem2:"beautiful_sun", },
        "light": { elem2:"beautiful_light" },
        "meat": { elem2:"fused_organism" },
        "head": { elem2:"melted_human" },
        "body": { elem2:"melted_human" },
        "dead_bug": { elem2:"melted_insect" },
        "worm": { elem2:"melted_insect" },
        "ant": { color2:"#5E0B04", elem2:"melted_insect" },
        "bee": { elem2:"melted_insect" },
        "fly": { elem2:"melted_insect" },
        "firefly": { elem2:"melted_insect" },
        "stinkbug": { elem2:"melted_insect" },
        "slug": { color2:["#997e12","#997e12","#997e12","#997e12","#997e12","#997e12","#403314","#403314","#403314","#403314","#403314","#403314","#124a44"], elem2:"melted_insect"  },
        "snail": { color2:"#5c3104", elem2:"melted_insect", chance:0.5 },
        "tree_branch": { elem2:"wood"  },
        "plant": { elem2:"melted_plant"  },
        "grass": { elem2:"melted_plant"  },
        "evergreen": { color2:"#006300", elem2:"melted_plant"  },
        "pistil": { elem2:"melted_plant"  },
        "petal": { color2:["#ff0000","#ff8800","#ffff00","#88ff00","#00ff00","#00ff88","#00ffff","#0088ff","#0000ff","#8800ff","#ff00ff"], elem2:"melted_plant"  },
        "bamboo": { elem2:"melted_plant"  },
        "bamboo_plant": { elem2:"melted_plant" },
        "cactus": { elem2:"melted_plant"  },
        "corn": { color2:["#f8d223","#d6ba2a","#f7f5ba","#dbd281","#cdb12d"], elem2:"melted_plant"  },
        "wheat": { color2:["#f1b569","#edb864","#de9c45","#c2853d"], elem2:"melted_plant"  },
        "dead_plant": { elem2:"melted_plant"  },
        "sapling": { elem2:"melted_plant"  },
        "pinecone": { color2:["#5c3e33","#472f27","#31211b"], elem2:"melted_plant"  },
        "bird": { color2:"#997457", elem2:"melted_animal"  },
        "rat": { color2:["#a698a9","#8c7d82","#ccc3cf"], elem2:"melted_animal"  },
        "fish": { elem2:"melted_fish", chance:0.2 },
        "tadpole": { color2:"#87b574", elem2:"melted_fish", chance:0.2 },
        "frog": { color2:"#607300", elem2:"melted_fish", chance:0.2 },
    },
    temp: 35,
    tempLow: -273,
    stateLow: ["liquid_light",null],
    stateLowColorMultiplier: 0.8,
    category: "brokenday",
    state: "gas",
    density: 0.00001,
    ignoreAir: true,
    insulate: true
},

elements.melted_human = {
    color: ["#f3e7db","#eadaba","#d7bd96","#a07e56"],
    behavior: behaviors.LIQUID,
    viscosity: 7500,
    reactions: {
        "oxygen": { elem2:"carbon_dioxide", chance:0.5 },
        "meat": { elem2:null, chance:0.1 },
        "cooked_meat": { elem2:null, chance:0.1 },
        "sun": { elem2:"beautiful_sun", elem1:"cooked_meat" },
        "light": { elem2:"beautiful_light" },
        "dead_bug": { color2:"#CEC5B9", elem2:"fused_organism", chance:0.1 },
        "ant": { color2:"#D2B6AB", elem2:"fused_organism", chance:0.2 },
        "bee": { color2:"#E9DBAA", elem2:"fused_organism", chance:0.2 },
        "fly": { color2:"#CEC5B9", elem2:"fused_organism", chance:0.2 },
        "firefly": { color2:"#CEC5B9", elem2:"fused_organism", chance:0.2 },
        "stinkbug": { color2:"#CEC5B9", elem2:"fused_organism", chance:0.2 },
        "slug": { color2:["#DFD0AE","#E5D6C7"], elem2:"fused_organism", chance:0.2 },
        "snail": { color2:"#E5D6C7", elem2:"fused_organism", chance:0.15 },
        "head": { elem2:"melted_human", chance:0.1 },
        "body": { elem2:"melted_human", chance:0.1 },
        "bird": { color2:"#DAC8B7", elem2:"fused_organism", chance:0.1 },
        "rat": { color2:["#E2D5D0","#EADFD8"], elem2:"fused_organism", chance:0.1 },
        "fish": { color2:"#E3D1BC", elem2:"fused_organism", chance:0.2 },
        "tadpole": { color2:"#DBDCC4", elem2:"fused_organism", chance:0.2 },
        "frog": { color2:"#D2CDAA", elem2:"fused_organism", chance:0.2 },
        "melted_fish": { color2:"#E3D1BC",elem2:"fused_organism", chance:0.1 },
        "melted_animal": { color2:["#E2D5D0","#EADFD8","#DAC8B7"], elem2:"fused_organism", chance:0.1 },
        "melted_insect": { color2:"#CEC5B9", elem2:"fused_organism", chance:0.1 },
    },
    tempHigh: 300,
    stateHigh: "cooked_meat",
    tempLow: -20,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 300,
    burnInto: "cooked_meat",
    state: "liquid",
    density: 1900,
    category: "brokenday",
},

elements.melted_animal = {
    color: ["#997457","#a698a9"],
    behavior: behaviors.LIQUID,
    viscosity: 7500,
    reactions: {
        "oxygen": { elem2:"carbon_dioxide", chance:0.5 },
        "meat": { elem2:"fused_organism", chance:0.1 },
        "sun": { elem2:"beautiful_sun", elem1:"cooked_meat" },
        "light": { elem2:"beautiful_light" },
        "dead_bug": { color2:"#CEC5B9", elem2:"fused_organism", chance:0.1 },
        "ant": { color2:"#D2B6AB", elem2:"fused_organism", chance:0.2 },
        "bee": { color2:"#E9DBAA", elem2:"fused_organism", chance:0.2 },
        "fly": { color2:"#CEC5B9", elem2:"fused_organism", chance:0.2 },
        "firefly": { color2:"#CEC5B9", elem2:"fused_organism", chance:0.2 },
        "stinkbug": { color2:"#CEC5B9", elem2:"fused_organism", chance:0.2 },
        "slug": { color2:["#DFD0AE","#E5D6C7"], elem2:"fused_organism", chance:0.2 },
        "snail": { color2:"#E5D6C7", elem2:"fused_organism", chance:0.15 },
        "head": { color2:["#F1E4D4","#EDDECC"], elem2:"fused_organism", chance:0.1 },
        "body": { color2:["#F1E4D4","#EDDECC"], elem2:"fused_organism", chance:0.1 },
        "bird": { color2:"#997457", elem2:"melted_animal", chance:0.2 },
        "rat": { color2:["#a698a9","#8c7d82","#ccc3cf"], elem2:"melted_animal", chance:0.2 },
        "fish": { color2:"#E3D1BC", elem2:"fused_organism", chance:0.2 },
        "tadpole": { color2:"#DBDCC4", elem2:"fused_organism", chance:0.2 },
        "frog": { color2:"#D2CDAA", elem2:"fused_organism", chance:0.2 },
        "melted_fish": { color2:"#E3D1BC",elem2:"fused_organism", chance:0.1 },
        "melted_human": { color2:["#F1E4D4","#EDDECC"], elem2:"fused_organism", chance:0.1 },
        "melted_insect": { color2:"#CEC5B9", elem2:"fused_organism", chance:0.1 },
    },
    tempHigh: 275,
    stateHigh: "cooked_meat",
    tempLow: -20,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 300,
    burnInto: "cooked_meat",
    state: "liquid",
    density: 900,
    category: "brokenday",
},

elements.melted_fish = {
    color: "#ac8650",
    behavior: [ 
        "XX|XX|SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%5", 
        "M2%0.5|FX%0.5|M2%0.5 AND BO", 
        "M2%10|M1|M2%10 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%14", 
    ],
    reactions: {
        "oxygen": { elem2:"carbon_dioxide", chance:0.5 },
        "sun": { elem2:"beautiful_sun", elem1:"cooked_meat" },
        "light": { elem2:"beautiful_light" },
        "dead_bug": { color2:"#CEC5B9", elem2:"fused_organism", chance:0.1 },
        "ant": { color2:"#D2B6AB", elem2:"fused_organism", chance:0.2 },
        "bee": { color2:"#E9DBAA", elem2:"fused_organism", chance:0.2 },
        "fly": { color2:"#CEC5B9", elem2:"fused_organism", chance:0.2 },
        "firefly": { color2:"#CEC5B9", elem2:"fused_organism", chance:0.2 },
        "stinkbug": { color2:"#CEC5B9", elem2:"fused_organism", chance:0.2 },
        "head": { color2:["#F1E4D4","#EDDECC"], elem2:"fused_organism", chance:0.1 },
        "body": { color2:["#F1E4D4","#EDDECC"], elem2:"fused_organism", chance:0.1 },
        "bird": { color2:"#DAC8B7", elem2:"fused_organism", chance:0.2 },
        "rat": { color2:["#E2D5D0","#EADFD8"], elem2:"fused_organism", chance:0.2 },
        "slug": { color2:["#DFD0AE","#E5D6C7"], elem2:"fused_organism", chance:0.2 },
        "snail": { color2:"#E5D6C7", elem2:"fused_organism", chance:0.15 },
        "fish": { elem2:"melted_fish", chance:0.2 },
        "tadpole": { color2:"#87b574", elem2:"melted_fish", chance:0.2 },
        "frog": { color2:"#607300", elem2:"melted_fish", chance:0.2 },
        "melted_animal": { color2:["#E2D5D0","#EADFD8","#DAC8B7"], elem2:"fused_organism", chance:0.1 },
        "melted_human": { color2:["#F1E4D4","#EDDECC"], elem2:"fused_organism", chance:0.1 },
        "melted_insect": { color2:"#CEC5B9", elem2:"fused_organism", chance:0.1 },
    },
    tempHigh: 275,
    stateHigh: "cooked_meat",
    tempLow: -20,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 300,
    burnInto: "cooked_meat",
    state: "liquid",
    density: 800,
    category: "brokenday",
},

elements.melted_insect = {
    color: ["#4c4e42","#5e0b04","#4c4e42","#5e0b04","#56482d","#52472c","#635443"],
    behavior: behaviors.LIQUID,
    viscosity: 4500,
    reactions: {
        "meat": { elem2:"fused_organism", chance:0.1 },
        "cooked_meat": { elem2:"fused_organism", chance:0.1 },
        "sun": { elem2:"beautiful_sun", elem1:"cooked_meat" },
        "light": { elem2:"beautiful_light" },
        "dead_bug": { elem2:"melted_insect", chance:0.1 },
        "ant": { color2:"#5E0B04", elem2:"melted_insect", chance:0.2 },
        "bee": { color2:"#c4b100", elem2:"melted_insect", chance:0.2 },
        "fly": { elem2:"melted_insect", chance:0.2 },
        "firefly": { elem2:"melted_insect", chance:0.2 },
        "stinkbug": { elem2:"melted_insect", chance:0.2 },
        "slug": { color2:["#997e12","#997e12","#997e12","#997e12","#997e12","#997e12","#403314","#403314","#403314","#403314","#403314","#403314","#124a44"], elem2:"melted_insect", chance:0.2 },
        "snail": { color2:"#5c3104", elem2:"melted_insect", chance:0.15 },
        "fish": { color2:"#E3D1BC", elem2:"fused_organism", chance:0.2 },
        "tadpole": { color2:"#DBDCC4", elem2:"fused_organism", chance:0.2 },
        "frog": { color2:"#D2CDAA", elem2:"fused_organism", chance:0.2 },
        "head": { color2:["#F1E4D4","#EDDECC"], elem2:"fused_organism", chance:0.1 },
        "body": { color2:["#F1E4D4","#EDDECC"], elem2:"fused_organism", chance:0.1 },
        "melted_human": { color2:["#F1E4D4","#EDDECC"], elem2:"fused_organism", chance:0.1 },
        "bird": { color2:"#DAC8B7", elem2:"fused_organism", chance:0.1 },
        "rat": { color2:["#E2D5D0","#EADFD8"], elem2:"fused_organism", chance:0.1 },
        "melted_animal": { color2:["#E2D5D0","#EADFD8","#DAC8B7"], elem2:"fused_organism", chance:0.1 },
        "melted_fish": { color2:"#E3D1BC",elem2:"fused_organism", chance:0.1 },
    },
    tempHigh: 100,
    stateHigh: "dead_bug",
    tempLow: -20,
    stateLow: "dead_bug",
    burn: 10,
    burnTime: 150,
    burnInto: "ash",
    state: "liquid",
    density: 500,
    category: "brokenday",
},

elements.melted_plant = {
    color: ["#00bf00","#439809","#258b08","#118511","#127b12","#136d14"],
    behavior: behaviors.LIQUID,
    viscosity: 50000,
    reactions: {
        "sun": { elem2:"beautiful_sun", elem1:"dead_plant" },
        "light": { elem2:"beautiful_light" },
        "carbon_dioxide": { elem2:"oxygen" },
        "tree_branch": { elem2:"wood"  },
        "plant": { elem2:"melted_plant", chance:0.2  },
        "grass": { elem2:"melted_plant", chance:0.2  },
        "evergreen": { color2:"#006300", elem2:"melted_plant", chance:0.2  },
        "pistil": { elem2:"melted_plant", chance:0.2  },
        "petal": { color2:["#CC9978","#CD8C6F","#BE785E","#CC9978","#CD8C6F","#BE785E","#A9D475","#5AF353","#8E5FA5"], elem2:"melted_plant", chance:0.1  },
        "bamboo": { elem2:"melted_plant", chance:0.1  },
        "bamboo_plant": { elem2:"melted_plant", chance:0.1 },
        "cactus": { elem2:"melted_plant", chance:0.1  },
        "corn": { color2:["#f8d223","#d6ba2a","#f7f5ba","#dbd281","#cdb12d"], elem2:"melted_plant", chance:0.1  },
        "wheat": { color2:["#f1b569","#edb864","#de9c45","#c2853d"], elem2:"melted_plant", chance:0.1  },
        "dead_plant": { elem2:"melted_plant", chance:0.1  },
        "sapling": { elem2:"melted_plant", chance:0.05  },
        "pinecone": { color2:["#5c3e33","#472f27","#31211b"], elem2:"melted_plant", chance:0.05  },
    },
    tempHigh: 250,
    stateHigh: "dead_plant",
    tempLow: -20,
    stateLow: "frozen_plant",
    burn: 10,
    burnTime: 200,
    burnInto: ["dead_plant","fire","fire","fire","ash"],
    state: "liquid",
    density: 1200,
    category: "brokenday",
};

elements.fused_organism = {
    color: ["#E5D6C7","#f7ead0"],
    behavior: behaviors.LIQUID,
    viscosity: 6000,
    reactions: {
        "meat": { elem2:"fused_organism", chance:0.1 },
        "cooked_meat": { elem2:"fused_organism", chance:0.1 },
        "sun": { elem2:"beautiful_sun", elem1:"cooked_meat" },
        "light": { elem2:"beautiful_light" },
        "dead_bug": { color2:"#CEC5B9", elem2:"fused_organism", chance:0.1 },
        "ant": { color2:"#D2B6AB", elem2:"fused_organism", chance:0.2 },
        "bee": { color2:"#E9DBAA", elem2:"fused_organism", chance:0.2 },
        "fly": { color2:"#CEC5B9", elem2:"fused_organism", chance:0.2 },
        "firefly": { color2:"#CEC5B9", elem2:"fused_organism", chance:0.2 },
        "stinkbug": { color2:"#CEC5B9", elem2:"fused_organism", chance:0.2 },
        "slug": { color2:["#DFD0AE","#E5D6C7"], elem2:"fused_organism", chance:0.2 },
        "snail": { color2:"#E5D6C7", elem2:"fused_organism", chance:0.15 },
        "head": { color2:["#F1E4D4","#EDDECC"], elem2:"fused_organism", chance:0.1 },
        "body": { color2:["#F1E4D4","#EDDECC"], elem2:"fused_organism", chance:0.1 },
        "melted_human": { color2:["#F1E4D4","#EDDECC"], elem2:"fused_organism", chance:0.1 },
        "melted_insect": { color2:"#CEC5B9", elem2:"fused_organism", chance:0.1 },
        "bird": { color2:"#DAC8B7", elem2:"fused_organism", chance:0.1 },
        "rat": { color2:["#E2D5D0","#EADFD8"], elem2:"fused_organism", chance:0.1 },
        "fish": { color2:"#E3D1BC", elem2:"fused_organism", chance:0.2 },
        "tadpole": { color2:"#DBDCC4", elem2:"fused_organism", chance:0.2 },
        "frog": { color2:"#D2CDAA", elem2:"fused_organism", chance:0.2 },
        "melted_animal": { color2:["#E2D5D0","#EADFD8","#DAC8B7"], elem2:"fused_organism", chance:0.1 },
        "melted_fish": { color2:"#E3D1BC", elem2:"fused_organism", chance:0.1 },
    },
    tempHigh: 300,
    stateHigh: "cooked_meat",
    tempLow: -20,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 400,
    burnInto: "cooked_meat",
    state: "liquid",
    density: 2000,
    category: "brokenday",
};

HighNumber = "36 41 20 36 46 20 36 41 20 36 46 20 32 30 20 33 44 20 32 30 20 36 37 20 36 31 20 37 39"
