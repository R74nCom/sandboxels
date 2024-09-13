
elements.beautiful_sun = {
    color: "#c12600",
    tick: function(pixel) {
        // minimum 1726
        // maximum 7726
        if (pixel.eclipse) { pixel.color = pixelColorPick(pixel,"#f68656"); var c=0.01}
        else if (pixel.temp < 1500) { pixel.color = pixelColorPick(pixel,"#7a4e43"); }
        else if (pixel.temp < 3600) { pixel.color = pixelColorPick(pixel,"#ffbdbd"); var c=0.015 }
        else if (pixel.temp < 5000) { pixel.color = pixelColorPick(pixel,"#da2b27"); var c=0.025 }
        else if (pixel.temp < 7000) { pixel.color = pixelColorPick(pixel,"#c12600"); var c=0.05 }
        else if (pixel.temp < 11000) { pixel.color = pixelColorPick(pixel,"#f7fff5"); var c=0.1 }
        else if (pixel.temp < 28000) { pixel.color = pixelColorPick(pixel,"#bde0ff"); var c=0.2 }
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
        "carbon_dioxide": { elem2:"neon", temp1:5, tempMax:1800 }
    },
    temp: 5504,
    tempLow: -100,
    stateLow: "supernova",
    category: "special",
    state: "gas",
    //density: 1408,
    insulate: true,
    noMix: true,
    alias: "star",
    movable: false
},

elements.beautiful_light = {
    hidden: true,
    name: "light",
    color: "#ffb09c",
    tick: function(pixel) {
    if (Math.random() < 0.02) {
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
        "static": { "color1":["#ffffff","#bdbdbd","#808080","#424242","#1c1c1c"] }
        "head": { "color1":["#ffffff","#bdbdbd","#808080","#424242","#1c1c1c"] }
    },
    temp: 35,
    tempLow: -273,
    stateLow: ["liquid_light",null],
    stateLowColorMultiplier: 0.8,
    category: "energy",
    state: "gas",
    density: 0.00001,
    ignoreAir: true,
    insulate: true
},

elements.freed_human = {
    name: "melted_human",
    color: ["#f3e7db","#f7ead0","#eadaba","#d7bd96","#a07e56","#825c43","#604134","#3a312a"],
    behavior: [
        "XX|CL%0.5|XX",
        "M2%0.5|XX|M2%0.5",
        "M2%10|M1|M2%10",
    ],
    reactions: {
        "oxygen": { elem2:"carbon_dioxide", chance:0.5 },
        "meat": { elem2:null, chance:0.1 },
        "cooked_meat": { elem2:null, chance:0.1 },
        "sun": { elem1:"cooked_meat" },
        "light": { stain1:"#825043" },
        "bee": { elem1:"organic_slime", elem2:"organic_slime", chance:0.2 },
        "water": { elem2:"bubble", attr2:{"clone":"water"}, chance:0.001 },
        "salt_water": { elem2:"bubble", attr2:{"clone":"salt_water"}, chance:0.001 },
        "pool_water": { elem2:"bubble", attr2:{"clone":"pool_water"}, chance:0.001 },
    },
    tempHigh: 102,
    stateHigh: ["steam","steam","steam","sugar"],
    tempLow: -2,
    stateLow: ["ice","ice","ice","sugar_ice"],
    state: "solid",
    density: 1000.1,
    category: "life",
    breakInto: ["water","dna","dna","dna"]
},

elements.organic_slime = {
    name: "slime",
    color: ["#f3e7db","#f7ead0","#eadaba","#d7bd96","#a07e56","#825c43","#604134","#3a312a"],
    behavior: [
        "XX|CL%0.5|XX",
        "M2%0.5|XX|M2%0.5",
        "M2%10|M1|M2%10",
    ],
    reactions: {
        "oxygen": { elem2:"carbon_dioxide", chance:0.5 },
        "meat": { elem2:null, chance:0.1 },
        "cooked_meat": { elem2:null, chance:0.1 },
        "sun": { elem1:"cooked_meat" },
        "light": { stain1:"#825043" },
        "bee": { elem1:"organic_slime", elem2:"organic_slime", chance:0.2 },
        "water": { elem2:"bubble", attr2:{"clone":"water"}, chance:0.001 },
        "salt_water": { elem2:"bubble", attr2:{"clone":"salt_water"}, chance:0.001 },
        "pool_water": { elem2:"bubble", attr2:{"clone":"pool_water"}, chance:0.001 },
    },
    tempHigh: 102,
    stateHigh: ["steam","steam","steam","sugar"],
    tempLow: -2,
    stateLow: ["ice","ice","ice","sugar_ice"],
    state: "solid",
    density: 1000.1,
    category: "life",
    breakInto: ["water","dna","dna","dna"]
},
