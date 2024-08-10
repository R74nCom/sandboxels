//Made by SuperASAX or SuperAAX
elements.spread_bomb = {
    color: "#524c41",
    behavior: [
        "XX|EX:10|XX",
        "XX|DL|XX",
        "M2 AND CL|M1 AND EX:10|M2 AND CL",
    ],
    category: "Super's Funny Mod",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
},

elements.random_bomb = {
    color: "#524c41",
    behavior: [
        "XX|EX:10|XX",
        "CL%10|DL%5|CL%10",
        "M2 AND CL%10|M1%25 AND EX:10|M2 AND CL%10",
    ],
    category: "Super's Funny Mod",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
},

elements.strange_spread = {
    color: "#ABCDEF",
    category: "Super's Funny Mod",
    behavior: [
        "CL%90|XX|CL%90",
        "XX|EX:5%0.1|XX",
        "M2 AND CL%10|M1%25|M2 AND CL%10",
    ],
},

elements.cheese_matter = {
    color: "#fcba03",
    tick: function(pixel) {
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coords = adjacentCoords[i];
            var x = pixel.x + coords[0];
            var y = pixel.y + coords[1];
            if ((Math.random() < 0.05 || coords[0]) && !isEmpty(x,y,true)) {
                var elem = pixelMap[x][y].element;
                if (elements.cheese_matter.ignore.indexOf(elem) === -1 && elements[elem].hardness !== 1) {
                    if (coords[1]) {
                        swapPixels(pixel,pixelMap[x][y]);
                    }
                    else {
                        changePixel(pixelMap[x][y],"cheese_matter");
                    }
                }
            }
        }
        var move1Spots = [
            [pixel.x, pixel.y+1],
            [pixel.x+1, pixel.y+1],
            [pixel.x-1, pixel.y+1],
        ]
        if (Math.random() < 0.1) { move1Spots.push([pixel.x-1,pixel.y]) }
        if (Math.random() < 0.1) { move1Spots.push([pixel.x+1,pixel.y]) }
        if (Math.random() < 0.1) { move1Spots.push([pixel.x,pixel.y-1]) }
        if (Math.random() < 0.1) { move1Spots.push([pixel.x-1,pixel.y-1]) }
        if (Math.random() < 0.1) { move1Spots.push([pixel.x+1,pixel.y-1]) }
        for (var i = 0; i < move1Spots.length; i++) {
            var j = Math.floor(Math.random()*move1Spots.length);
            var coords = move1Spots[j];
            if (tryMove(pixel, coords[0], coords[1])) { break; }
            else { move1Spots.splice(j, 1); }
        }
        doDefaults(pixel);
    },
    reactions: {
        "void": { elem1:"explosion" }
    },
    category: "Super's Funny Mod",
    state: "solid",
    density: 2000,
    excludeRandom: true,
    ignore: ["fire","smoke","antimatter","cheese_matter","wall","ewall","plasma","void","border","cheese"],
    behavior: [
        "XX|XX|XX",
        "XX|CH:cheese%5|XX",
        "XX|XX|XX",
    ],
},



elements.antiball = {
    color: "#EEA537",
    behavior: [
        "ST|ST AND M1|ST",
        "ST|XX|ST",
        "ST|ST|ST",
    ],
    state: "solid",
    category: "Super's Funny Mod"
},

elements.bomb_bird = {
    color: "#997457",
    properties: { "phase": 2, "rising":0 },
    tick: function(pixel) {
        if (Math.random() < 0.00007 && isEmpty(pixel.x,pixel.y+2)) {
            createPixel("spread_bomb",pixel.x,pixel.y+2);
        }
        var newX = pixel.x;
        var newY = pixel.y;
        if (pixel.phase === 1) { // Landing
            newX += pixel.flipX ? -1 : 1;
            newY += Math.random() < 0.5 ? 0 : 1;
            if (!tryMove(pixel, newX, newY)) {
                if (outOfBounds(newX, newY)) { pixel.phase = 0 }
                else {
                    var newPixel = pixelMap[newX][newY];
                    if (elements[newPixel.element].state !== "solid") { pixel.phase = 3; }
                    else if (newPixel.element === "bomb_bird") {
                        pixel.phase = 3;
                        newPixel.phase = 3;
                    }
                    else { pixel.phase = 0; }
                }
            } // Stop landing
        }
        else if (pixel.phase === 2) { // Gliding
            newX += pixel.flipX ? -1 : 1;
            newY += Math.random() < 0.9 ? 0 : 1;
            if (Math.random() < 0.01) { pixel.phase = 1 } // Start landing
            if (!tryMove(pixel, newX, newY)) {
                pixel.flipX = !pixel.flipX;
                if (!outOfBounds(newX, newY) && pixelMap[newX][newY].element !== "bird") {
                    pixel.phase = 3;
                }
            }
        }
        else if (pixel.phase === 0) { // Standing
            if (Math.random() < 0.05) { newX += pixel.flipX ? -1 : 1; }
            newY ++;
            if (Math.random() < 0.01) { pixel.phase = 3 } // Start rising
            if (!tryMove(pixel, newX, newY)) {
                if (!outOfBounds(newX, newY) && pixelMap[newX][newY].element === "bird") {
                    pixel.phase = 3;
                    pixelMap[newX][newY].phase = 3;
                }
            }
        }
        else if (pixel.phase === 3) { // Rising
            newX += pixel.flipX ? -1 : 1;
            newY --;
            if (!tryMove(pixel, newX, newY) || (pixel.rising > 5 && Math.random() < 0.05)) { pixel.phase = 2; pixel.rising = 0; } // Start gliding
            else { pixel.rising ++; }
        }
        doHeat(pixel);
        doElectricity(pixel);
        doBurning(pixel);
    },
    flippableX: true,
    reactions: {
        "head": {elem1:"explosion"},
        "body": {elem1:"explosion"},
        "fly": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "firefly": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "bee": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "worm": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "ant": { elem2:null, chance:0.025, func:behaviors.FEEDPIXEL },
        "stink_bug": { elem2:"stench", chance:0.025, func:behaviors.FEEDPIXEL },
        "dead_bug": { elem2:null, chance:0.04, func:behaviors.FEEDPIXEL },
        "lichen": { elem2:null, chance:0.04, func:behaviors.FEEDPIXEL },
        "termite": { elem2:null, chance:0.025, func:behaviors.FEEDPIXEL },
        "flea": { elem2:null, chance:0.025, func:behaviors.FEEDPIXEL },
        "mushroom_cap": { elem2:null, chance:0.025, func:behaviors.FEEDPIXEL },
        "mushroom_gill": { elem2:null, chance:0.025, func:behaviors.FEEDPIXEL },
        "seeds": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "flower_seed": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "wheat_seed": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "corn_seed": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "corn": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "potato_seed": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "grass_seed": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "crumb": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "pumpkin": { elem2:null, chance:0.025, func:behaviors.FEEDPIXEL },
        "pumpkin_seed": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "rice": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "coffee_bean": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "coffee_ground": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "nut": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "nut_meat": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "nut_butter": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "jelly": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "plague": { elem1:"plague", chance:0.05 },
        "oxygen": { elem2:"carbon_dioxide", chance:0.5 }
    },
    foodNeed: 20,
    temp: 41,
    tempHigh: 120,
    stateHigh: "cooked_meat",
    stateHighColor: "#E4CFB9",
    tempLow: -18,
    stateLow: "frozen_meat",
    category:"Super's Funny Mod",
    burn:50,
    burnTime:100,
    breakInto: ["feather","blood"],
    state: "solid",
    density: 400,
    conduct: 0.5
},

elements.fillerX = {
    color: "#ae4cd9",
    behavior: [
        "DL|CL|DL",
        "CL|XX|CL",
        "DL|CL|DL",
    ],
    category:"special",
    excludeRandom: true,
    reactions: {
        "neutron": { elem1:"lattice" },
        "proton": { elem1:"vertical" },
        "electric": { elem1:"horizontal" },
        "positron": { elem1:"vertical" },
        "plasma": { elem1:"armageddon", tempMin:500, charged:true },
    },
    density: 1834
},
elements.latticeX = {
    color: "#cb4cd9",
    behavior: [
        "CL|DL|CL",
        "DL|XX|DL",
        "CL|DL|CL",
    ],
    tick: function(pixel) {
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coords = adjacentCoords[i];
            var x = pixel.x + coords[0];
            var y = pixel.y + coords[1];
            if (!isEmpty(x,y,true) && pixelMap[x][y].element === "lattice") {
                deletePixel(x,y)
            }
        }
    },
    reactions: {
        "cold_fire": { elem1:"ice_nine", chance:0.1 },
        "proton": { elem1:"filler", elem2:null, chance:0.1 },
        "electric": { elem1:null, elem2:"filler", chance:0.1 },
    },
    category:"special",
    excludeRandom: true,
    movable: false,
    density: 917
},



elements.mystery_thing_1 = {
    color: "#EEA537",
    behavior: [
        "ST AND CL%10|ST AND CL%10 AND M2|ST AND CL%10",
        "ST AND CL%10|DL%25 AND EX:5%1|ST AND CL%10",
        "ST AND CL%10|ST AND M1|ST AND CL%10",
    ],
    state: "solid",
    category: "Super's Funny Mod",
    reactions: {
        "water": { elem1:"null" }
    },
}, 
elements.mystery_thing_2 = {
    color: "#abcfed",
    behavior: [
        "CL%10 AND CH:galvanized_steel%10|CL%10 AND CH:galvanized_steel%10|CL%10 AND CH:galvanized_steel%10",
        "M2|CH:galvanized_steel%10 AND CH:spread_bomb%0.1|M2",
        "CH:null%10|M1|CH:null%10",
    ],
    category: "Super's Funny Mod",
    name:"0.1 by 0.1 meter apartment"
},
elements.sandboxelizer = {
    color: "#e6d577",
    category: "Super's Funny Mod",
    behavior: [
        "CL%3 AND CH:sand%10|M2|CL%3 AND CH:sand%10",
        "M2|M1|M2",
        "CL%3 AND CH:sand%10|M2|CL%3 AND CH:sand%10",
    ],
    reactions: {
        "sand": { elem1:"void", chance:0.1}
    }
};
//just doing some modding