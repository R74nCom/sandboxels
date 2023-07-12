
const defaultCooldown = 8;
const airDensity = settings.airdensity || 1.225; // kg/m^3
const airTemp = settings.airtemp || 20; // Celsius
const absoluteZero = settings.abszero || -273.15; // Celsius

var behaviors = {
    POWDER_OLD: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2",
    ],
    POWDER: function (pixel) {
        if (pixel.start === pixelTicks) { return }
        if (pixel.charge && elements[pixel.element].behaviorOn) {
            pixelTick(pixel)
        }
        if (!tryMove(pixel, pixel.x, pixel.y + 1)) {
            if (Math.random() < 0.5) {
                if (!tryMove(pixel, pixel.x + 1, pixel.y + 1)) {
                    tryMove(pixel, pixel.x - 1, pixel.y + 1);
                }
            } else {
                if (!tryMove(pixel, pixel.x - 1, pixel.y + 1)) {
                    tryMove(pixel, pixel.x + 1, pixel.y + 1);
                }
            }
        }
        doDefaults(pixel);
    },
    AGPOWDER: [
        "M2|M1|M2",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    LIQUID_OLD: [
        "XX|XX|XX",
        "M2|XX|M2",
        "M1|M1|M1",
    ],
    LIQUID: function (pixel) {
        if (pixel.start === pixelTicks) { return }
        if (pixel.charge && elements[pixel.element].behaviorOn) {
            pixelTick(pixel)
        }
        if (elements[pixel.element].viscosity && (!((Math.random() * 100) < 100 / Math.pow(elements[pixel.element].viscosity, 0.25)))) {
            var move1Spots = [
                [pixel.x, pixel.y + 1]
            ]
        }
        else {
            var move1Spots = [
                [pixel.x + 1, pixel.y + 1],
                [pixel.x, pixel.y + 1],
                [pixel.x - 1, pixel.y + 1],
            ]
        }
        var moved = false;
        for (var i = 0; i < move1Spots.length; i++) {
            var coords = move1Spots[Math.floor(Math.random() * move1Spots.length)];
            if (tryMove(pixel, coords[0], coords[1])) { moved = true; break; }
            else { move1Spots.splice(move1Spots.indexOf(coords), 1); }
        }
        if (!moved) {
            if (elements[pixel.element].viscosity === undefined || !(!((Math.random() * 100) < 100 / Math.pow(elements[pixel.element].viscosity, 0.25)))) {
                if (Math.random() < 0.5) {
                    if (!tryMove(pixel, pixel.x + 1, pixel.y)) {
                        tryMove(pixel, pixel.x - 1, pixel.y);
                    }
                } else {
                    if (!tryMove(pixel, pixel.x - 1, pixel.y)) {
                        tryMove(pixel, pixel.x + 1, pixel.y);
                    }
                }
            }
        }
        doDefaults(pixel);
    },
    SUPERFLUID_OLD: [
        "XX|XX|XX",
        "XX|XX|M2 AND BO",
        "XX|M1|M2",
    ],
    SUPERFLUID: function (pixel) {
        if (pixel.start === pixelTicks) { return }
        if (pixel.charge && elements[pixel.element].behaviorOn) {
            pixelTick(pixel)
        }
        if (!tryMove(pixel, pixel.x, pixel.y + 1)) {
            // go either left or right depending on pixel.flipX
            var newx = pixel.flipX ? pixel.x - 1 : pixel.x + 1;
            if (Math.random() < 0.5) {
                if (!tryMove(pixel, newx, pixel.y)) {
                    pixel.flipX = !pixel.flipX;
                    tryMove(pixel, newx, pixel.y + 1);
                }
            }
            else {
                if (!tryMove(pixel, newx, pixel.y + 1)) {
                    if (!tryMove(pixel, newx, pixel.y)) { pixel.flipX = !pixel.flipX; }
                }
            }
        }
        doDefaults(pixel);
    },
    LIGHTWEIGHT: [
        "XX|XX|XX",
        "XX|FX%0.25|XX",
        "M2%10|M1%10|M1%10",
    ],
    SLIDE: [
        "XX|XX|XX",
        "XX|XX|M2 AND BO",
        "XX|M1|M1",
    ],
    AGLIQUID: [
        "M1|M1|M1",
        "M2|XX|M2",
        "XX|XX|XX",
    ],
    WALL: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    UL_UR: [
        "M1|M1|M1",
        "M2|XX|M2",
        "XX|M2|XX",
    ],
    UL_UR_OPTIMIZED: function (pixel) {
        if (pixel.start === pixelTicks) { return }
        if (pixel.charge && elements[pixel.element].behaviorOn) {
            pixelTick(pixel)
        }
        var move1Spots = [
            [pixel.x, pixel.y - 1],
            [pixel.x + 1, pixel.y - 1],
            [pixel.x - 1, pixel.y - 1],
        ]
        var moved = false;
        for (var i = 0; i < move1Spots.length; i++) {
            var coords = move1Spots[Math.floor(Math.random() * move1Spots.length)];
            if (tryMove(pixel, coords[0], coords[1])) { moved = true; break; }
            else { move1Spots.splice(move1Spots.indexOf(coords), 1); }
        }
        if (!moved) {
            var move2Spots = [
                [pixel.x, pixel.y + 1],
                [pixel.x + 1, pixel.y],
                [pixel.x - 1, pixel.y],
            ]
            for (var i = 0; i < move2Spots.length; i++) {
                var coords = move2Spots[Math.floor(Math.random() * move2Spots.length)];
                if (tryMove(pixel, coords[0], coords[1])) { break; }
                else { move2Spots.splice(move2Spots.indexOf(coords), 1); }
            }
        }
        doDefaults(pixel);
    },
    GAS_OLD: [
        "M2|M1|M2",
        "M1|XX|M1",
        "M2|M1|M2",
    ],
    GAS: function (pixel) {
        if (pixel.start === pixelTicks) { return }
        if (pixel.charge && elements[pixel.element].behaviorOn) {
            pixelTick(pixel)
        }
        var move1Spots = [
            [pixel.x, pixel.y + 1],
            [pixel.x, pixel.y - 1],
            [pixel.x + 1, pixel.y],
            [pixel.x - 1, pixel.y],
        ]
        var moved = false;
        for (var i = 0; i < move1Spots.length; i++) {
            var coords = move1Spots[Math.floor(Math.random() * move1Spots.length)];
            if (tryMove(pixel, coords[0], coords[1])) { moved = true; break; }
            else { move1Spots.splice(move1Spots.indexOf(coords), 1); }
        }
        if (!moved) {
            var move2Spots = [
                [pixel.x + 1, pixel.y + 1],
                [pixel.x - 1, pixel.y + 1],
                [pixel.x + 1, pixel.y - 1],
                [pixel.x - 1, pixel.y - 1],
            ]
            for (var i = 0; i < move2Spots.length; i++) {
                var coords = move2Spots[Math.floor(Math.random() * move2Spots.length)];
                if (tryMove(pixel, coords[0], coords[1])) { break; }
                else { move2Spots.splice(move2Spots.indexOf(coords), 1); }
            }
        }
        doDefaults(pixel);
    },
    DGAS: [
        "M2|M1|M2",
        "M1|DL%5|M1",
        "M2|M1|M2",
    ],
    SUPPORT: [
        "XX|XX|XX",
        "SP|XX|SP",
        "XX|M1|XX",
    ],
    SUPPORTPOWDER: [
        "XX|XX|XX",
        "SP|XX|SP",
        "M2|M1|M2",
    ],
    DELETE: [
        "XX|DL|XX",
        "DL|XX|DL",
        "XX|DL|XX",
    ],
    FILL: [
        "XX|CL|XX",
        "CL|XX|CL",
        "XX|CL|XX",
    ],
    CLONER: [
        "XX|CF|XX",
        "CF|XX|CF",
        "XX|CF|XX",
    ],
    STURDYPOWDER: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
    SELFDELETE: [
        "XX|XX|XX",
        "XX|DL|XX",
        "XX|XX|XX",
    ],
    FOAM: [
        "XX|XX|XX",
        "XX|DL%5|XX",
        "M2%25|M1%25|M2%25",
    ],
    BUBBLE: [
        "XX|XX|XX",
        "XX|DL%0.25 AND FX%1|M1%5",
        "XX|M1%1|M1%2",
    ],
    STICKY: [
        "XX|ST|XX",
        "ST|XX|ST",
        "XX|ST AND M1|XX",
    ],
    MOLTEN: [
        "XX|CR:fire%2.5|XX",
        "M2|XX|M2",
        "M1|M1|M1",
    ],
    RADPOWDER: [
        "XX|CR:radiation%2|XX",
        "CR:radiation%2|XX|CR:radiation%2",
        "M2|M1|M2",
    ],
    RADMOLTEN: [
        "XX|CR:fire,radiation%4.5|XX",
        "M2 AND CR:radiation%2|XX|M2 AND CR:radiation%2",
        "M1|M1|M1",
    ],
    RADLIQUID: [
        "XX|CR:radiation%2|XX",
        "M2 AND CR:radiation%2|XX|M2 AND CR:radiation%2",
        "M1|M1|M1",
    ],
    BOUNCY: function (pixel) {
        if (pixel.vx === undefined) {
            // choose 1, 0, or -1
            pixel.vx = Math.random() < 0.5 ? 1 : Math.random() < 0.5 ? 0 : -1;
            pixel.vy = Math.random() < 0.5 ? 1 : Math.random() < 0.5 ? 0 : -1;
            // if both are 0, make one of them 1 or -1
            if (pixel.vx === 0 && pixel.vy === 0) {
                if (Math.random() < 0.5) { pixel.vx = Math.random() < 0.5 ? 1 : -1; }
                else { pixel.vy = Math.random() < 0.5 ? 1 : -1; }
            }
        }
        // move and invert direction if hit
        if (!pixel.del && pixel.vx && !tryMove(pixel, pixel.x + pixel.vx, pixel.y)) { pixel.vx = -pixel.vx; }
        if (!pixel.del && pixel.vy && !tryMove(pixel, pixel.x, pixel.y + pixel.vy)) { pixel.vy = -pixel.vy; }
    },
    FEEDPIXEL: function (pixel) {
        if (!pixel.food) { pixel.food = 1 }
        else { pixel.food++ }
        if (pixel.food > (elements[pixel.element].foodNeed || 30)) {
            // loop through adjacentCoords and check each pixel to lay an egg
            for (var i = 0; i < adjacentCoords.length; i++) {
                var x = pixel.x + adjacentCoords[i][0];
                var y = pixel.y + adjacentCoords[i][1];
                if (isEmpty(x, y)) {
                    if (elements[pixel.element].egg) {
                        createPixel(elements[pixel.element].egg, x, y)
                    }
                    else {
                        createPixel("egg", x, y)
                        pixelMap[x][y].animal = elements[pixel.element].baby || pixel.element;
                    }
                    pixel.food = 0;
                    break;
                }
            }
        }
    },
    FLY: function (pixel, onHit) {
        var nx = pixel.flipX ? -1 : 1;
        var ny = Math.random() < 0.5 ? -1 : 1;
        var hit = false;
        if (!tryMove(pixel, pixel.x + nx, pixel.y + ny)) {
            if (!tryMove(pixel, pixel.x + nx, pixel.y - ny)) {
                if (!tryMove(pixel, pixel.x, pixel.y + ny)) {
                    if (!tryMove(pixel, pixel.x, pixel.y - ny)) { hit = [pixel.x, pixel.y - ny] }
                } else { hit = [pixel.x, pixel.y + ny] }
            } else { hit = [pixel.x + nx, pixel.y - ny] }
        } else { hit = [pixel.x + nx, pixel.y + ny] }
        if (hit && onHit) {
            if (!isEmpty(hit[0], hit[1], true)) {
                onHit(pixel, pixelMap[hit[0]][hit[1]]);
            }
            else { onHit(pixel); }
        }
        if (!isEmpty(pixel.x + nx, pixel.y) || Math.random() < 0.02) {
            pixel.flipX = !pixel.flipX;
        }
        if (pixel.charge && elements[pixel.element].behaviorOn) {
            pixelTick(pixel)
        }
        doDefaults(pixel);
    }
}
var textures = {
    BRICK: [
        "rrrrrwrrrrr",
        "rrrrrwrrrrr",
        "wwwwwwwwwww",
        "rrwrrrrrwrr",
        "rrwrrrrrwrr",
        "wwwwwwwwwww",
        "rrrrrrwrrrr",
        "rrrrrrwrrrr",
        "wwwwwwwwwww",
        "rrrrwrrrrwr",
        "rrrrwrrrrwr",
        "wwwwwwwwwww"],
    GLASS: [ // solid with streaks
        "gggggggggggg",
        "gggSgggggggg",
        "ggSgggggggsg",
        "gSgggggggsgg",
        "ggggggggsggg",
        "gggggggggggg",
        "gggggggggggg",
        "ggggsggggggg",
        "gggsgggggggg",
        "ggggggggggSg",
        "gggggggggSgg",
        "gggggggggggg",
    ]
}
var eLists = {
    ANIMAL: ["flea", "ant", "fly", "firefly", "bee", "frog", "fish", "worm", "termite", "rat", "slug", "snail", "stink_bug"],
    CLEANANIMAL: ["ant", "firefly", "bee", "frog", "fish"],
    SEEDS: ["grass_seed", "wheat_seed", "flower_seed", "bamboo_plant", "mushroom_spore", "corn_seed", "potato_seed"]
}



// Element Properties
// name - display name of the element [optional]
// color - color of the element's pixel
// behavior - behavior of the element
// ignore - elements to ignore in behavior [must be an array]
// category - category in which the element will show up in
// density - density of the element [only used for movable elements] (kg/m^3)
// state - solid, liquid, or gas [only used for movable elements]
// reactions - instructions for when elements attempt to move onto each other (object)
// conduct - conductivity of the element (0-1)
// behaviorOn - behavior to override when powered
// colorOn - color to change to when powered
// temp - default temperature of the element (Celsius)
// tempHigh - highest temperature before state change (Celsius)
// tempLow - lowest temperature before state change (Celsius)
// stateHigh - element transformed into when tempHigh is reached
// stateLow - element transformed into when tempLow is reached
// viscosity - how slow a liquid will move (higher = slower) (cps)
// burn - chance of burning per tick (0-100) (%)
// burnTime - time to burn (ticks)
// burnInto - element to turn into after burning
// fireColor - color of the flame given off when burning
// burning - whether the element is burning on creation
// charge - charge of the element on creation
// hardness - chance of resisting damage (0-1)
var elements = {
    "heat": { //hard-coded
        color: "#ff0000",
        behavior: [
            "HT:2|HT:2|HT:2",
            "HT:2|HT:2|HT:2",
            "HT:2|HT:2|HT:2",
        ],
        temp: 2,
        category: "tools",
        insulate: true
    },
    "cool": { //hard-coded
        color: "#0000ff",
        behavior: [
            "CO:2|CO:2|CO:2",
            "CO:2|CO:2|CO:2",
            "CO:2|CO:2|CO:2",
        ],
        temp: -2,
        category: "tools",
        insulate: true
    },
    "erase": { //hard-coded
        color: "#fdb5ff",
        behavior: [
            "DL|DL|DL",
            "DL|DL|DL",
            "DL|DL|DL",
        ],
        category: "tools"
    },
    "pick": { //hard-coded
        color: ["#fa9b9b", "#fae99b", "#9bfab7", "#9b9dfa"],
        behavior: [
            "CF|CF|CF",
            "CF|DL%5|CF",
            "CF|CF|CF",
        ],
        category: "tools",
        maxSize: 0,
        darkText: true
    },
    "mix": { //hard-coded
        color: ["#fff4b5", "#a6a6a6"],
        behavior: [
            "SW|SW|SW",
            "SW|DL%5|SW",
            "SW|SW|SW",
        ],
        category: "tools",
        darkText: true
    },
    "lookup": { //hard-coded
        color: ["#5e807d", "#5e807d", "#679e99", "#5e807d", "#5e807d"],
        behavior: behaviors.WALL,
        category: "tools",
        maxSize: 0,
    },
    "shock": { //hard-coded
        color: "#ffff00",
        behavior: [
            "SH|SH|SH",
            "SH|DL%5|SH",
            "SH|SH|SH",
        ],
        category: "tools",
        darkText: true
    },
    "paint": {
        color: ["#c27070", "#c29c70", "#c2c270", "#70c270", "#70c2c2", "#7070c2", "#c270c2"],
        tool: function (pixel) {
            if (!shiftDown) {
                pixel.color = pixelColorPick(pixel, currentColor)
            }
            else {
                // convert the hex of currentColor to rgb and set it as a string
                var rgb = currentColor.replace("#", "").match(/.{1,2}/g);
                for (var i = 0; i < rgb.length; i++) {
                    rgb[i] = parseInt(rgb[i], 16);
                }
                pixel.color = "rgb(" + rgb.join(",") + ")"
            }
        },
        customColor: true,
        category: "tools"
    },
    "sand": {
        color: "#e6d577",
        behavior: behaviors.POWDER,
        tempHigh: 1700,
        stateHigh: "molten_glass",
        category: "land",
        state: "solid",
        density: 1602
    },
    /* Tick Examples
    "tick_sand": {
        color: "#e6d577",
        tick: function(pixel) {
            tryMove(pixel, pixel.x, pixel.y+1);
            doHeat(pixel);
        },
        tempHigh: 1700,
        stateHigh: "molten_glass",
        category: "land",
        state: "solid",
        density: 1602,
        hidden: true,
        category: "land"
    },
    "tick_wood": {
        color: "#a0522d",
        tick: function(pixel) {
            doBurning(pixel);
            doHeat(pixel);
        },
        tempHigh: 400,
        stateHigh: "fire",
        category: "solids",
        burn: 5,
        burnTime: 300,
        burnInto: ["ash","charcoal","fire"],
        state: "solid",
        hardness: 0.15,
        breakInto: "sawdust",
        hidden: true,
        category: "solids"
    },
    "tick_wall": {
        color: "#808080",
        category: "solids",
        hidden: true
    },
    "tick_props": {
        color: "#ffffff",
        tick: function(pixel) {
            if (tryMove(pixel, pixel.x, pixel.y+1)) {
                pixel.moves += 1;
            }
            pixel.age += 1;
            if (pixel.moves > 20) { // This pixel will delete itself if it moves 20 times
                deletePixel(pixel.x, pixel.y);
            }
        },
        properties: { // Default properties to set when the pixel is created:
            "moves": 0,
            "age": 0
        },
        category: "powders",
        hidden: true
    },
    */
    "water": {
        color: "#2167ff",
        behavior: behaviors.LIQUID,
        tempHigh: 100,
        stateHigh: "steam",
        tempLow: 0,
        stateLow: "ice",
        category: "liquids",
        heatCapacity: 4.184,
        reactions: {
            "dirt": { // React with (water reacts with dirt to make mud)
                elem1: null, // First element transforms into; in this case, water deletes itself
                elem2: "mud", // Second element transforms into; in this case, dirt turns to mud
            },
            "sand": { elem1: null, elem2: "wet_sand" },
            "clay_soil": { elem1: null, elem2: "clay" },
            "salt": { elem1: "salt_water", elem2: null },
            "sugar": { elem1: "sugar_water", elem2: null },
            "dust": { elem1: "dirty_water", elem2: null },
            "ash": { elem1: "dirty_water", elem2: null },
            "cyanide": { elem1: "dirty_water", elem2: null },
            "cyanide_gas": { elem1: "dirty_water", elem2: null },
            "carbon_dioxide": { elem1: "seltzer", elem2: null, oneway: true },
            "sulfur": { elem1: "dirty_water", elem2: null },
            "rat": { elem1: "dirty_water", chance: 0.005 },
            "plague": { elem1: "dirty_water", elem2: null },
            "rust": { elem1: "dirty_water", chance: 0.005 },
            "fallout": { elem1: "dirty_water", chance: 0.25 },
            "radiation": { elem1: "dirty_water", chance: 0.25 },
            "uranium": { elem1: "dirty_water", chance: 0.25 },
            "rotten_meat": { elem1: "dirty_water", chance: 0.25 },
            "rotten_cheese": { elem1: "dirty_water", chance: 0.25 },
            "cancer": { elem1: "dirty_water", chance: 0.25 },
            "quicklime": { elem1: null, elem2: "slaked_lime" },
            "rock": { elem2: "wet_sand", chance: 0.00035 },
            "ruins": { elem2: "rock", chance: 0.00035 },
            "mudstone": { elem2: "mud", chance: 0.00035 },
            "methane": { elem1: "primordial_soup", elem2: "primordial_soup", tempMin: 60, charged: true },
            "ammonia": { elem1: "primordial_soup", elem2: "primordial_soup", tempMin: 60, charged: true },
            "fly": { elem2: "dead_bug", chance: 0.1, oneway: true },
            "firefly": { elem2: "dead_bug", chance: 0.1, oneway: true },
            "bee": { elem2: "dead_bug", chance: 0.05, oneway: true },
            "stink_bug": { elem2: "dead_bug", chance: 0.1, oneway: true },
            // electrolysis:
            "aluminum": { elem1: ["hydrogen", "hydrogen", "oxygen"], charged: true, chance: 0.0025 },
            "zinc": { elem1: ["hydrogen", "hydrogen", "oxygen"], charged: true, chance: 0.015 },
            "steel": { elem1: ["hydrogen", "hydrogen", "oxygen"], charged: true, chance: 0.0125 },
            "iron": { elem1: ["hydrogen", "hydrogen", "oxygen"], charged: true, chance: 0.0125 },
            "tin": { elem1: ["hydrogen", "hydrogen", "oxygen"], charged: true, chance: 0.01 },
            "lead": { elem1: ["hydrogen", "hydrogen", "oxygen"], charged: true, chance: 0.01 },
            "brass": { elem1: ["hydrogen", "hydrogen", "oxygen"], charged: true, chance: 0.001 },
            "bronze": { elem1: ["hydrogen", "hydrogen", "oxygen"], charged: true, chance: 0.001 },
            "copper": { elem1: ["hydrogen", "hydrogen", "oxygen"], charged: true, chance: 0.0075 },
            "silver": { elem1: ["hydrogen", "hydrogen", "oxygen"], charged: true, chance: 0.0075 },
            "gold": { elem1: ["hydrogen", "hydrogen", "oxygen"], charged: true, chance: 0.0075 },
        },
        state: "liquid",
        density: 997,
        conduct: 0.02,
        stain: -0.5
    },
    "salt_water": {
        color: "#4d85ff",
        behavior: behaviors.LIQUID,
        tempHigh: 102,
        stateHigh: ["steam", "salt"],
        tempLow: -2,
        stateLowName: "salt_ice",
        category: "liquids",
        reactions: {
            "dirt": { elem1: null, elem2: "mud" },
            "sand": { elem1: null, elem2: "wet_sand" },
            "clay_soil": { elem1: null, elem2: "clay" },
            "dust": { elem1: "dirty_water", elem2: null },
            "ash": { elem1: "dirty_water", elem2: null },
            "carbon_dioxide": { elem1: "dirty_water", elem2: null },
            "sulfur": { elem1: "dirty_water", elem2: null },
            "charcoal": { elem1: "dirty_water", chance: 0.005 },
            "rat": { elem1: "dirty_water", chance: 0.005 },
            "plague": { elem1: "dirty_water", elem2: null },
            "fallout": { elem1: "dirty_water", chance: 0.25 },
            "radiation": { elem1: "dirty_water", chance: 0.25 },
            "rust": { elem1: "dirty_water", chance: 0.005 },
            "quicklime": { elem1: null, elem2: "slaked_lime" },
            "rock": { elem2: "wet_sand", chance: 0.0005 },
            "fly": { elem2: "dead_bug", chance: 0.1, oneway: true },
            "firefly": { elem2: "dead_bug", chance: 0.1, oneway: true },
            "bee": { elem2: "dead_bug", chance: 0.05, oneway: true },
            "stink_bug": { elem2: "dead_bug", chance: 0.1, oneway: true },
            "cancer": { elem1: "dirty_water", chance: 0.25 },
            // electrolysis:
            "aluminum": { elem1: ["hydrogen", "hydrogen", "oxygen", "salt"], charged: true, chance: 0.0025 },
            "zinc": { elem1: ["hydrogen", "hydrogen", "oxygen", "salt"], charged: true, chance: 0.015 },
            "steel": { elem1: ["hydrogen", "hydrogen", "oxygen", "salt"], charged: true, chance: 0.0125 },
            "iron": { elem1: ["hydrogen", "hydrogen", "oxygen", "salt"], charged: true, chance: 0.0125 },
            "tin": { elem1: ["hydrogen", "hydrogen", "oxygen", "salt"], charged: true, chance: 0.01 },
            "lead": { elem1: ["hydrogen", "hydrogen", "oxygen", "salt"], charged: true, chance: 0.01 },
            "brass": { elem1: ["hydrogen", "hydrogen", "oxygen", "salt"], charged: true, chance: 0.001 },
            "bronze": { elem1: ["hydrogen", "hydrogen", "oxygen", "salt"], charged: true, chance: 0.001 },
            "copper": { elem1: ["hydrogen", "hydrogen", "oxygen", "salt"], charged: true, chance: 0.0075 },
            "silver": { elem1: ["hydrogen", "hydrogen", "oxygen", "salt"], charged: true, chance: 0.0075 },
            "gold": { elem1: ["hydrogen", "hydrogen", "oxygen", "salt"], charged: true, chance: 0.0075 },
        },
        state: "liquid",
        density: 1026,
        conduct: 0.1,
        stain: -0.66
    },
    "sugar_water": {
        color: "#8eaae6",
        behavior: behaviors.LIQUID,
        tempHigh: 105,
        stateHigh: ["steam", "sugar"],
        tempLow: -5,
        stateLowName: "sugar_ice",
        category: "liquids",
        reactions: {
            "dirt": { elem1: null, elem2: "mud" },
            "sand": { elem1: null, elem2: "wet_sand" },
            "clay_soil": { elem1: null, elem2: "clay" },
            "dust": { elem1: "dirty_water", elem2: null },
            "ash": { elem1: "dirty_water", elem2: null },
            "carbon_dioxide": { elem1: "soda", elem2: null },
            "sulfur": { elem1: "dirty_water", elem2: null },
            "charcoal": { elem1: "dirty_water", chance: 0.005 },
            "rat": { elem1: "dirty_water", chance: 0.005 },
            "plague": { elem1: "dirty_water", elem2: null },
            "fallout": { elem1: "dirty_water", chance: 0.25 },
            "radiation": { elem1: "dirty_water", chance: 0.25 },
            "rust": { elem1: "dirty_water", chance: 0.005 },
            "rock": { elem2: "wet_sand", chance: 0.0004 },
            "fly": { elem2: "dead_bug", chance: 0.1, oneway: true },
            "firefly": { elem2: "dead_bug", chance: 0.1, oneway: true },
            "bee": { elem2: "dead_bug", chance: 0.05, oneway: true },
            "stink_bug": { elem2: "dead_bug", chance: 0.1, oneway: true },
            // electrolysis:
            "aluminum": { elem1: ["hydrogen", "hydrogen", "oxygen", "sugar"], charged: true, chance: 0.0025 },
            "zinc": { elem1: ["hydrogen", "hydrogen", "oxygen", "sugar"], charged: true, chance: 0.015 },
            "steel": { elem1: ["hydrogen", "hydrogen", "oxygen", "sugar"], charged: true, chance: 0.0125 },
            "iron": { elem1: ["hydrogen", "hydrogen", "oxygen", "sugar"], charged: true, chance: 0.0125 },
            "tin": { elem1: ["hydrogen", "hydrogen", "oxygen", "sugar"], charged: true, chance: 0.01 },
            "lead": { elem1: ["hydrogen", "hydrogen", "oxygen", "sugar"], charged: true, chance: 0.01 },
            "brass": { elem1: ["hydrogen", "hydrogen", "oxygen", "sugar"], charged: true, chance: 0.001 },
            "bronze": { elem1: ["hydrogen", "hydrogen", "oxygen", "sugar"], charged: true, chance: 0.001 },
            "copper": { elem1: ["hydrogen", "hydrogen", "oxygen", "sugar"], charged: true, chance: 0.0075 },
            "silver": { elem1: ["hydrogen", "hydrogen", "oxygen", "sugar"], charged: true, chance: 0.0075 },
            "gold": { elem1: ["hydrogen", "hydrogen", "oxygen", "sugar"], charged: true, chance: 0.0075 },
        },
        hidden: true,
        state: "liquid",
        density: 1026,
        conduct: 0.05,
        stain: -0.45
    },
    "seltzer": {
        color: ["#8eaae6", "#82a4ed", "#b5c5e8", "#8eaae6", "#82a4ed"],
        behavior: [
            "XX|CR:foam%3|XX",
            "M2|XX|M2",
            "M2|M1|M2",
        ],
        tempHigh: 98,
        stateHigh: ["steam", "carbon_dioxide"],
        tempLow: 0,
        stateLowName: "seltzer_ice",
        category: "liquids",
        reactions: {
            "dirt": { elem1: null, elem2: "mud" },
            "sand": { elem1: null, elem2: "wet_sand" },
            "clay_soil": { elem1: null, elem2: "clay" },
            "rock": { elem2: "wet_sand", chance: 0.0004 },
            "sugar": { elem1: "soda", elem2: "foam" },
            "sugar_water": { elem1: "soda", elem2: "foam" },
            "fly": { elem2: "dead_bug", chance: 0.1, oneway: true },
            "firefly": { elem2: "dead_bug", chance: 0.1, oneway: true },
            "bee": { elem2: "dead_bug", chance: 0.05, oneway: true },
            "stink_bug": { elem2: "dead_bug", chance: 0.1, oneway: true },
            "plant": { elem1: "water" },
            "evergreen": { elem1: "water" },
            "cactus": { elem1: "water" },
            "algae": { elem1: "water" },
            // electrolysis:
            "aluminum": { elem1: ["hydrogen", "hydrogen", "oxygen", "carbon_dioxide"], charged: true, chance: 0.0025 },
            "zinc": { elem1: ["hydrogen", "hydrogen", "oxygen", "carbon_dioxide"], charged: true, chance: 0.015 },
            "steel": { elem1: ["hydrogen", "hydrogen", "oxygen", "carbon_dioxide"], charged: true, chance: 0.0125 },
            "iron": { elem1: ["hydrogen", "hydrogen", "oxygen", "carbon_dioxide"], charged: true, chance: 0.0125 },
            "tin": { elem1: ["hydrogen", "hydrogen", "oxygen", "carbon_dioxide"], charged: true, chance: 0.01 },
            "lead": { elem1: ["hydrogen", "hydrogen", "oxygen", "carbon_dioxide"], charged: true, chance: 0.01 },
            "brass": { elem1: ["hydrogen", "hydrogen", "oxygen", "carbon_dioxide"], charged: true, chance: 0.001 },
            "bronze": { elem1: ["hydrogen", "hydrogen", "oxygen", "carbon_dioxide"], charged: true, chance: 0.001 },
            "copper": { elem1: ["hydrogen", "hydrogen", "oxygen", "carbon_dioxide"], charged: true, chance: 0.0075 },
            "silver": { elem1: ["hydrogen", "hydrogen", "oxygen", "carbon_dioxide"], charged: true, chance: 0.0075 },
            "gold": { elem1: ["hydrogen", "hydrogen", "oxygen", "carbon_dioxide"], charged: true, chance: 0.0075 },
        },
        hidden: true,
        state: "liquid",
        density: 1026.91,
        conduct: 0.05,
        stain: -0.45
    },
    "dirty_water": {
        color: ["#0e824e", "#07755a", "#0c6934"],
        behavior: behaviors.LIQUID,
        tempHigh: 105,
        stateHigh: ["steam", "carbon_dioxide"],
        tempLow: -5,
        stateLowName: "dirty_ice",
        viscosity: 10,
        category: "liquids",
        reactions: {
            "dirt": { elem1: null, elem2: "mud" },
            "sand": { elem1: null, elem2: "wet_sand" },
            "clay_soil": { elem1: null, elem2: "clay" },
            "rock": { elem2: "wet_sand", chance: 0.0004 },
            "plant": { elem1: "water", chance: 0.05 },
            "algae": { elem1: "water", chance: 0.05 },
            "charcoal": { elem1: "water", chance: 0.02 },
            "gravel": { elem1: "water", chance: 0.01 },
            "fly": { elem2: "dead_bug", chance: 0.1, oneway: true },
            "firefly": { elem2: "dead_bug", chance: 0.1, oneway: true },
            "bee": { elem2: "dead_bug", chance: 0.05, oneway: true },
            "stink_bug": { elem2: "dead_bug", chance: 0.1, oneway: true }
        },
        hidden: true,
        state: "liquid",
        density: 1005,
        conduct: 0.1,
        //stain: 0.03
    },
    "pool_water": {
        color: "#a8d2e3",
        behavior: behaviors.LIQUID,
        tempHigh: 105,
        stateHigh: ["steam", "chlorine"],
        tempLow: -5,
        stateLowName: "pool_ice",
        category: "liquids",
        reactions: {
            "dirt": { elem1: null, elem2: "mud" },
            "sand": { elem1: null, elem2: "wet_sand" },
            "clay_soil": { elem1: null, elem2: "clay" },
            "rock": { elem2: "wet_sand", chance: 0.001 },
            "plant": { elem2: "dead_plant", chance: 0.05 },
            "evergreen": { elem2: "dead_plant", chance: 0.05 },
            "cactus": { elem2: "dead_plant", chance: 0.05 },
            "grass": { elem2: "dead_plant", chance: 0.05 },
            "algae": { elem2: null, chance: 0.05 },
            "cell": { elem2: null, chance: 0.05 },
            "cancer": { elem2: null, chance: 0.05 },
            "plague": { elem2: null },
            "flea": { elem2: "dead_bug", chance: 0.05 },
            "termite": { elem2: "dead_bug", chance: 0.05 },
            "ant": { elem2: "dead_bug", chance: 0.05 },
            "worm": { elem2: "dead_bug", chance: 0.05 },
            "fly": { elem2: "dead_bug", chance: 0.05 },
            "firefly": { elem2: "dead_bug", chance: 0.05 },
            "bee": { elem2: "dead_bug", chance: 0.05 },
            "stink_bug": { elem2: "dead_bug", chance: 0.05 },
            "dirty_water": { elem2: "water", chance: 0.05 },
            "slug": { elem2: null, chance: 0.05 },
            "snail": { elem2: null, chance: 0.05 },
            "lichen": { elem2: null, chance: 0.05 },
            "dead_bug": { elem2: null, chance: 0.001 },
            "pollen": { elem2: null },
            "root": { elem2: "fiber", chance: 0.05 },
            "flower_seed": { elem2: "dead_plant", chance: 0.05 },
            "wheat_seed": { elem2: "dead_plant", chance: 0.05 },
            "bamboo_plant": { elem2: "dead_plant", chance: 0.05 },
            "potato_seed": { elem2: "dead_plant", chance: 0.05 },
            "corn_seed": { elem2: "dead_plant", chance: 0.05 },
            "sapling": { elem2: "dead_plant", chance: 0.05 },
            "pinecone": { elem2: "dead_plant", chance: 0.05 },
            "blood": { elem2: null, chance: 0.01 },
            "infection": { elem2: null, chance: 0.05 },
            "antibody": { elem2: null, chance: 0.01 },
            "poison": { elem2: null, chance: 0.01 },
        },
        hidden: true,
        state: "liquid",
        density: 992.72,
        conduct: 0.15,
        stain: -0.5
    },
    "dirt": {
        //color: ["#9e6b4b","#9e6b4b","#9e6b4b","#9e6b4b","#9e6b4b","#9e6b4b","#9e6b4b","#9e6b4b","#9e6b4b","#9e6b4b","#9e6b4b","#9e6b4b","#9e6b4b","#9e6b4b","#a88c7b"],
        //color: ["#9b7653","#806144","#7d5937","#66482c"],
        color: ["#76552b", "#5c4221", "#573c1a", "#6b481e"],
        //color: ["#b9855d","#976c4b","#7a5639","#5b3d26"],
        behavior: behaviors.POWDER,
        tempHigh: 1200,
        tempLow: -50,
        stateLow: "permafrost",
        category: "land",
        state: "solid",
        density: 1220
    },
    "mud": {
        color: "#382417",
        behavior: behaviors.STURDYPOWDER,
        reactions: {
            "dirt": { elem1: "dirt", elem2: "mud", chance: 0.0005, oneway: true },
            "sand": { elem1: "dirt", elem2: "wet_sand", chance: 0.0005, oneway: true }
        },
        tempHigh: 100,
        stateHigh: "mudstone",
        tempLow: -50,
        stateLow: "permafrost",
        category: "land",
        state: "solid",
        density: 1730,
        stain: 0.02
    },
    "wet_sand": {
        color: ["#a19348", "#b5a85e"],
        behavior: behaviors.STURDYPOWDER,
        reactions: {
            "sand": { elem1: "sand", elem2: "wet_sand", chance: 0.0005, oneway: true },
            "dirt": { elem1: "sand", elem2: "mud", chance: 0.0005, oneway: true },
            "gravel": { elem1: "cement", elem2: null, chance: 0.2 }
        },
        tempHigh: 100,
        stateHigh: "packed_sand",
        tempLow: -50,
        stateLow: "packed_sand",
        category: "land",
        state: "solid",
        density: 1905
    },
    "rock": {
        color: ["#808080", "#4f4f4f", "#949494"],
        behavior: behaviors.POWDER,
        reactions: {
            "fly": { elem2: "dead_bug", chance: 0.25, oneway: true },
            "firefly": { elem2: "dead_bug", chance: 0.2, oneway: true },
            "stink_bug": { elem2: "dead_bug", chance: 0.15, oneway: true },
            "bee": { elem2: "dead_bug", chance: 0.1, oneway: true },
            "bird": { elem2: "feather", chance: 0.025, oneway: true },
            "bone": { elem2: "oil", tempMin: 300, chance: 0.005, oneway: true },
            "dead_plant": { elem2: "charcoal", tempMin: 200, chance: 0.005, oneway: true },
            "charcoal": { elem2: "diamond", tempMin: 800, chance: 0.005, oneway: true },
            "sand": { elem2: "packed_sand", tempMin: 500, chance: 0.005, oneway: true },
            "wet_sand": { elem2: "packed_sand", chance: 0.005, oneway: true },
        },
        tempHigh: 950,
        stateHigh: "magma",
        category: "land",
        state: "solid",
        density: 2550,
        hardness: 0.5,
        breakInto: ["sand", "gravel"]
    },
    "rock_wall": {
        color: ["#666666", "#363636", "#7a7a7a"],
        behavior: behaviors.WALL,
        tempHigh: 950,
        stateHigh: "magma",
        category: "land",
        state: "solid",
        density: 2550,
        hardness: 0.5,
        breakInto: "rock"
    },
    "mudstone": {
        color: "#4a341e",
        behavior: behaviors.SUPPORT,
        tempHigh: 1200,
        stateHigh: "molten_dirt",
        tempLow: -50,
        stateLow: "permafrost",
        category: "land",
        state: "solid",
        density: 1250,
        breakInto: "dirt"
    },
    "packed_sand": {
        color: ["#a1975d", "#b5ab70"],
        behavior: behaviors.SUPPORT,
        tempHigh: 1700,
        stateHigh: "molten_glass",
        category: "land",
        state: "solid",
        density: 1682,
        breakInto: "sand"
    },
    "plant": {
        color: "#00bf00",
        behavior: behaviors.WALL,
        reactions: {
            "vinegar": { elem1: "dead_plant", elem2: null, chance: 0.035 },
            "baking_soda": { elem1: "dead_plant", elem2: null, chance: 0.01 },
            "bleach": { elem1: "dead_plant", elem2: null, chance: 0.05 },
            "alcohol": { elem1: "dead_plant", elem2: null, chance: 0.035 }
        },
        category: "life",
        tempHigh: 100,
        stateHigh: "dead_plant",
        tempLow: -1.66,
        stateLow: "frozen_plant",
        burn: 65,
        burnTime: 60,
        burnInto: "dead_plant",
        breakInto: "dead_plant",
        state: "solid",
        density: 1050,
        seed: "flower_seed"
    },
    "dead_plant": {
        color: ["#826521", "#826021", "#825321", "#70360c"],
        behavior: [
            "XX|XX|XX",
            "XX|XX|XX",
            "M2|M1|M2",
        ],
        category: "life",
        tempHigh: 300,
        stateHigh: "fire",
        tempLow: -2,
        stateLow: "frozen_plant",
        burn: 85,
        burnTime: 45,
        state: "solid",
        density: 1050,
        hidden: true
    },
    "frozen_plant": {
        color: "#00bf8c",
        behavior: behaviors.WALL,
        category: "life",
        temp: -2.66,
        tempHigh: 7,
        stateHigh: "dead_plant",
        state: "solid",
        density: 1050,
        hidden: true
    },
    "grass": {
        color: ["#439809", "#258b08", "#118511", "#127b12", "#136d14"],
        tick: function (pixel) {
            if (!tryMove(pixel, pixel.x, pixel.y + 1)) {
                if (pixel.h < 2 && Math.random() < 0.0005 && isEmpty(pixel.x, pixel.y - 1)) {
                    createPixel(pixel.element, pixel.x, pixel.y - 1);
                    pixelMap[pixel.x][pixel.y - 1].h = pixel.h + 1;
                }
                var coords = [
                    [pixel.x + 1, pixel.y],
                    [pixel.x - 1, pixel.y],
                    [pixel.x + 1, pixel.y + 1],
                    [pixel.x - 1, pixel.y + 1],
                ];
                for (var i = 0; i < coords.length; i++) {
                    if (Math.random() < 0.005 && isEmpty(coords[i][0], coords[i][1])) {
                        if (!isEmpty(coords[i][0], coords[i][1] + 1, true)) {
                            var soil = pixelMap[coords[i][0]][coords[i][1] + 1];
                            if (soil.element === "dirt" || soil.element === "mud" || soil.element === "clay_soil") {
                                createPixel(pixel.element, coords[i][0], coords[i][1]);
                            }
                        }
                    }
                }
            }
            doDefaults(pixel);
        },
        properties: {
            "h": 0
        },
        tempHigh: 100,
        stateHigh: "dead_plant",
        tempLow: -2,
        stateLow: "frozen_plant",
        burn: 50,
        burnTime: 20,
        breakInto: "dead_plant",
        category: "life",
        state: "solid",
        density: 1400,
        seed: "grass_seed"
    },
    "algae": {
        color: ["#395706", "#6f9315", "#9dca19"],
        behavior: [
            "XX|XX|XX",
            "SW:water,salt_water,dirty_water,sugar_water%1|XX|SW:water,salt_water,dirty_water,sugar_water%1",
            "M2%10|M1|M2%10",
        ],
        tick: function (pixel) {
            if (Math.random() < 0.01 && !isEmpty(pixel.x + 1, pixel.y + 1, true) && isEmpty(pixel.x + 1, pixel.y)) {
                var newPixel = pixelMap[pixel.x + 1][pixel.y + 1];
                if (newPixel.element !== "algae" && elements[newPixel.element].state === "liquid") {
                    createPixel(pixel.element, pixel.x + 1, pixel.y);
                }
            }
            if (Math.random() < 0.01 && !isEmpty(pixel.x - 1, pixel.y + 1, true) && isEmpty(pixel.x - 1, pixel.y)) {
                var newPixel = pixelMap[pixel.x - 1][pixel.y + 1];
                if (newPixel.element !== "algae" && elements[newPixel.element].state === "liquid") {
                    createPixel(pixel.element, pixel.x - 1, pixel.y);
                }
            }
            doDefaults(pixel);
        },
        reactions: {
            "wood": { elem1: "lichen" },
            "chlorine": { elem1: "dead_plant", elem2: null, chance: 0.035 },
            "liquid_chlorine": { elem1: "dead_plant", elem2: null, chance: 0.035 },
            "baking_soda": { elem1: "dead_plant", elem2: null, chance: 0.035 },
            "broth": { elem2: "water", chance: 0.05 },
            "tea": { elem2: "water", chance: 0.05 },
        },
        category: "life",
        tempHigh: 225,
        stateHigh: "fire",
        burn: 95,
        burnTime: 20,
        state: "liquid",
        density: 920,
        seed: "algae"
    },
    "concrete": {
        color: "#ababab",
        behavior: behaviors.SUPPORT,
        tempHigh: 1500,
        stateHigh: "magma",
        category: "powders",
        state: "solid",
        density: 2400,
        hardness: 0.5,
        breakInto: "dust"
    },
    "wall": {
        color: "#808080",
        behavior: behaviors.WALL,
        category: "solids",
        insulate: true,
        hardness: 1,
        noMix: true
    },
    "fire": {
        color: ["#ff6b21", "#ffa600", "#ff4000"],
        tick: function (pixel) {
            behaviors.UL_UR_OPTIMIZED(pixel);
            if (settings.burn === 0 && (pixelTicks - pixel.start > 70) && Math.random() < 0.1) { changePixel(pixel, "smoke") }
        },
        reactions: {
            "water": { elem1: "smoke" },
            "steam": { elem1: "smoke" },
            "carbon_dioxide": { elem1: "smoke" },
            "dirty_water": { elem1: "smoke" },
            "salt_water": { elem1: "smoke" },
            "sugar_water": { elem1: "smoke" },
            "seltzer": { elem1: "smoke" },
            "pool_water": { elem1: "smoke" },
            "oxygen": { elem2: null, chance: 0.1 },
        },
        temp: 600,
        tempLow: 100,
        stateLow: "smoke",
        tempHigh: 7000,
        stateHigh: "plasma",
        category: "energy",
        burning: true,
        burnTime: 25,
        burnInto: "smoke",
        state: "gas",
        density: 0.1,
        ignoreAir: true,
        noMix: true
    },
    "bomb": {
        color: "#524c41",
        behavior: [
            "XX|EX:10|XX",
            "XX|XX|XX",
            "M2|M1 AND EX:10|M2",
        ],
        category: "weapons",
        state: "solid",
        density: 1300,
        excludeRandom: true,
        cooldown: defaultCooldown
    },
    "steam": {
        color: "#abd6ff",
        behavior: behaviors.GAS,
        reactions: {
            "steam": { elem1: null, elem2: "cloud", chance: 0.3, "y": [0, 15], "setting": "clouds" },
            "rain_cloud": { elem1: "rain_cloud", chance: 0.4, "y": [0, 12], "setting": "clouds" },
            "cloud": { elem1: "cloud", chance: 0.4, "y": [0, 12], "setting": "clouds" },
            "snow_cloud": { elem1: "rain_cloud", chance: 0.4, "y": [0, 12], "setting": "clouds" },
            "hail_cloud": { elem1: "rain_cloud", chance: 0.4, "y": [0, 12], "setting": "clouds" },
            "thunder_cloud": { elem1: "rain_cloud", chance: 0.4, "y": [0, 12], "setting": "clouds" },
            "pyrocumulus": { elem1: "cloud", chance: 0.4, "y": [0, 12], "setting": "clouds" },
            "anesthesia": { elem1: "acid_cloud", elem2: null, chance: 0.05, "y": [0, 12], "setting": "clouds" },
            "fire_cloud": { elem1: "cloud", elem2: "pyrocumulus", chance: 0.4, "y": [0, 12], "setting": "clouds" },
            "smoke": { elem1: "smog", elem2: null, chance: 0.001 },
            "carbon_dioxide": { elem1: "smog", elem2: null, chance: 0.001 }
        },
        temp: 150,
        tempLow: 95,
        extraTempLow: {
            0: "rime"
        },
        stateLow: "water",
        category: "gases",
        state: "gas",
        density: 0.6,
        conduct: 0.002,
        stain: -0.05,
        alias: "water vapor"
    },
    "ice": {
        color: "#b2daeb",
        behavior: behaviors.WALL,
        temp: -5,
        tempHigh: 5,
        stateHigh: "water",
        category: "solids",
        state: "solid",
        density: 917,
        breakInto: "snow"
    },
    "rime": {
        color: "#e6f2f7",
        behavior: behaviors.WALL,
        behaviorOn: [
            "XX|XX|XX",
            "XX|CH:rain_cloud|XX",
            "XX|XX|XX",
        ],
        temp: -10,
        tempHigh: 20,
        stateHigh: "water",
        category: "solids",
        hidden: true,
        state: "solid",
        density: 250,
        conduct: 1,
        breakInto: "packed_snow"
    },
    "snow": {
        color: "#e1f8fc",
        behavior: behaviors.POWDER,
        reactions: {
            "water": { elem1: "slush", elem2: "slush" },
            "salt_water": { elem1: "slush" },
            "dirty_water": { elem1: "slush" },
            "pool_water": { elem1: "slush" },
            "sugar_water": { elem1: "slush" },
            "seltzer": { elem1: "slush" }
        },
        temp: -5,
        tempHigh: 18,
        tempLow: -100,
        stateLow: "packed_snow",
        stateHigh: "water",
        category: "land",
        state: "solid",
        density: 100
    },
    "slush": {
        color: "#81bcd4",
        behavior: behaviors.LIQUID,
        reactions: {
            "dirt": { elem1: null, elem2: "mud" },
            "sand": { elem1: null, elem2: "wet_sand" }
        },
        temp: -5,
        tempHigh: 18,
        tempLow: -20,
        stateLow: "ice",
        stateHigh: "water",
        category: "liquids",
        state: "liquid",
        density: 95,
        viscosity: 100,
        hidden: true
    },
    "packed_snow": {
        color: "#bcdde3",
        behavior: behaviors.SUPPORTPOWDER,
        temp: 0,
        tempHigh: 20,
        tempLow: -200,
        stateLow: "ice",
        stateHigh: "water",
        category: "land",
        state: "solid",
        density: 400,
        hidden: true
    },
    "wood": {
        color: "#a0522d",
        behavior: behaviors.WALL,
        tempHigh: 400,
        stateHigh: ["ember", "charcoal", "fire", "fire", "fire"],
        category: "solids",
        burn: 5,
        burnTime: 300,
        burnInto: ["ember", "charcoal", "fire"],
        state: "solid",
        hardness: 0.15,
        breakInto: "sawdust"
    },
    "smoke": {
        color: "#383838",
        behavior: behaviors.DGAS,
        reactions: {
            "steam": { elem1: "pyrocumulus", chance: 0.08, "y": [0, 12], "setting": "clouds" },
            "rain_cloud": { elem1: "pyrocumulus", chance: 0.08, "y": [0, 12], "setting": "clouds" },
            "cloud": { elem1: "pyrocumulus", chance: 0.08, "y": [0, 12], "setting": "clouds" },
            "snow_cloud": { elem1: "pyrocumulus", chance: 0.08, "y": [0, 12], "setting": "clouds" },
            "hail_cloud": { elem1: "pyrocumulus", chance: 0.08, "y": [0, 12], "setting": "clouds" },
            "thunder_cloud": { elem1: "pyrocumulus", chance: 0.08, "y": [0, 12], "setting": "clouds" },
            "acid_cloud": { elem1: "pyrocumulus", chance: 0.05, "y": [0, 12], "setting": "clouds" },
            "fire_cloud": { elem1: "pyrocumulus", chance: 0.05, "y": [0, 12], "setting": "clouds" },
            "rad_cloud": { elem1: "pyrocumulus", chance: 0.05, "y": [0, 12], "setting": "clouds" },
            "pyrocumulus": { elem1: "pyrocumulus", chance: 0.08, "y": [0, 12], "setting": "clouds" }
        },
        temp: 114,
        tempHigh: 605,
        stateHigh: "fire",
        category: "gases",
        state: "gas",
        density: 1180,
        stain: 0.075,
        noMix: true
    },
    "magma": {
        color: ["#ff6f00", "#ff8c00", "#ff4d00"],
        behavior: behaviors.MOLTEN,
        reactions: {
            "ice": { elem1: "basalt" },
            "charcoal": { elem2: "diamond", tempMin: 800, chance: 0.005, oneway: true },
        },
        temp: 1200,
        tempLow: 800,
        stateLow: ["basalt", "basalt", "basalt", "rock"],
        viscosity: 10000,
        category: "liquids",
        state: "liquid",
        density: 2725
    },
    "plasma": {
        color: ["#8800ff", "#b184d9", "#8800ff"],
        behavior: behaviors.DGAS,
        behaviorOn: [
            "M2|M1|M2",
            "CL%5 AND M1|XX|CL%5 AND M1",
            "M2|M1|M2",
        ],
        temp: 7065,
        tempLow: 5000,
        stateLow: "fire",
        category: "energy",
        state: "gas",
        density: 1,
        //charge: 0.5,
        conduct: 1
    },
    "cold_fire": {
        color: ["#21cbff", "#006aff", "#00ffff"],
        behavior: [
            "M1|M1|M1",
            "M2|CH:smoke%8|M2",
            "XX|M2|XX",
        ],
        reactions: {
            "fire": { elem1: "smoke", elem2: "smoke" },
            "plasma": { elem1: "light", elem2: "light" }
        },
        temp: -200,
        tempHigh: 0,
        stateHigh: "smoke",
        category: "energy",
        state: "gas",
        density: 0.1,
        ignoreAir: true
    },
    "glass": {
        color: ["#5e807d", "#5e807d", "#679e99", "#5e807d", "#5e807d"],
        colorPattern: textures.GLASS,
        colorKey: {
            "g": "#5e807d",
            "s": "#638f8b",
            "S": "#679e99"
        },
        behavior: behaviors.WALL,
        reactions: {
            "radiation": { elem1: "rad_glass", chance: 0.33 },
            "rad_steam": { elem1: "rad_glass", elem2: null, chance: 0.33 },
            "fallout": { elem1: "rad_glass", elem2: "radiation", chance: 0.1 }
        },
        tempHigh: 1500,
        category: "solids",
        state: "solid",
        density: 2500,
        breakInto: "glass_shard",
        noMix: true
    },
    "molten_glass": {
        reactions: {
            "radiation": { elem1: "molten_rad_glass", chance: 0.66 },
            "rad_steam": { elem1: "molten_rad_glass", elem2: null, chance: 0.33 },
            "molten_uranium": { elem1: "molten_rad_glass", elem2: null },
            "fallout": { elem1: "molten_rad_glass", elem2: "radiation" }
        }
    },
    "rad_glass": {
        color: ["#648c64", "#648c64", "#6aad83", "#648c64", "#648c64"],
        colorPattern: textures.GLASS,
        colorKey: {
            "g": "#648c64",
            "s": "#679D74",
            "S": "#6aad83"
        },
        behavior: [
            "XX|CR:radiation%0.075|XX",
            "CR:radiation%0.075|XX|CR:radiation%0.075",
            "XX|CR:radiation%0.075|XX",
        ],
        tempHigh: 1500,
        category: "solids",
        state: "solid",
        density: 2500,
        breakInto: "rad_shard",
        hidden: true,
        noMix: true
    },
    "meat": {
        color: ["#9e4839", "#ba6449", "#d2856c", "#a14940"],
        behavior: [
            "XX|XX|XX",
            "SP|XX|SP",
            "XX|M1|XX",
        ],
        reactions: {
            "dirty_water": { elem1: "rotten_meat", chance: 0.1 },
            "fly": { elem1: "rotten_meat", chance: 0.2 },
            "dioxin": { elem1: "rotten_meat", elem2: null, chance: 0.1 },
            "uranium": { elem1: "rotten_meat", chance: 0.1 },
            "cancer": { elem1: "rotten_meat", chance: 0.1 },
            "plague": { elem1: "rotten_meat", elem2: null, chance: 0.3 },
            "ant": { elem1: "rotten_meat", chance: 0.1 },
            "worm": { elem1: "rotten_meat", chance: 0.1 },
            "rat": { elem1: "rotten_meat", chance: 0.3 },
            "mushroom_spore": { elem1: "rotten_meat", chance: 0.1 },
            "mushroom_stalk": { elem1: "rotten_meat", chance: 0.1 },
            "mercury": { elem1: "rotten_meat", elem2: null, chance: 0.2 },
            "mercury_gas": { elem1: "rotten_meat", elem2: null, chance: 0.1 },
            "virus": { elem1: "rotten_meat", chance: 0.1 },
            "poison": { elem1: "rotten_meat", elem2: null, chance: 0.5 },
            "infection": { elem1: "rotten_meat", elem2: null, chance: 0.1 },
            "ink": { elem1: "rotten_meat", elem2: null, chance: 0.1 },
            "acid": { elem1: "rotten_meat", elem2: null, chance: 0.5 },
            "acid_gas": { elem1: "rotten_meat", chance: 0.4 },
            "cyanide": { elem1: "rotten_meat", elem2: null, chance: 0.5 },
            "cyanide_gas": { elem1: "rotten_meat", elem2: null, chance: 0.5 },
            "water": { elem2: "broth", tempMin: 70 },
            "salt_water": { elem2: "broth", tempMin: 70 },
            "sugar_water": { elem2: "broth", tempMin: 70 },
            "seltzer": { elem2: "broth", tempMin: 70 },
            "rotten_cheese": { elem1: "rotten_meat", chance: 0.02 },
        },
        tempHigh: 100,
        stateHigh: "cooked_meat",
        tempLow: -18,
        stateLow: "frozen_meat",
        category: "food",
        burn: 15,
        burnTime: 200,
        burnInto: "cooked_meat",
        state: "solid",
        density: 1019.5,
        conduct: 0.2,
        isFood: true
    },
    "rotten_meat": {
        color: ["#b8b165", "#b89765"],
        behavior: [
            "XX|CR:plague,stench,stench,stench,fly%0.25 AND CH:meat>rotten_meat%1|XX",
            "SP%99 AND CH:meat>rotten_meat%1|XX|SP%99 AND CH:meat>rotten_meat%1",
            "XX|M1 AND CH:meat>rotten_meat%1|XX",
        ],
        tempHigh: 300,
        stateHigh: ["plague", "ash", "ammonia"],
        category: "food",
        hidden: true,
        burn: 12,
        burnTime: 200,
        burnInto: ["plague", "ash", "ammonia"],
        state: "solid",
        density: 1005,
        conduct: 0.1,
        isFood: true
    },
    "cooked_meat": {
        color: ["#ae7d5b", "#9b6d54", "#7e4d31"],
        behavior: behaviors.STURDYPOWDER,
        reactions: {
            "water": { elem2: "broth", tempMin: 70 },
            "salt_water": { elem2: "broth", tempMin: 70 },
            "sugar_water": { elem2: "broth", tempMin: 70 },
            "dirty_water": { elem2: "broth", tempMin: 70 },
            "seltzer": { elem2: "broth", tempMin: 70 }
        },
        tempHigh: 300,
        stateHigh: "ash",
        category: "food",
        hidden: true,
        burn: 10,
        burnTime: 200,
        burnInto: "ash",
        state: "solid",
        density: 1005,
        isFood: true
    },
    "frozen_meat": {
        color: ["#399e8f", "#49baa9", "#6cd2c6", "#40a197"],
        behavior: behaviors.STURDYPOWDER,
        temp: -18,
        tempHigh: 0,
        stateHigh: "meat",
        category: "food",
        hidden: true,
        state: "solid",
        density: 1067.5,
        isFood: true
    },
    "sugar": {
        color: "#f2f2f2",
        behavior: behaviors.POWDER,
        category: "food",
        tempHigh: 186,
        stateHigh: "caramel",
        state: "solid",
        density: 1590,
        isFood: true
    },
    "flour": {
        color: ["#f0e2b7", "#f0e4c0", "#ded1ab"],
        behavior: behaviors.POWDER,
        reactions: {
            "water": { elem1: "dough", elem2: null },
            "salt_water": { elem1: "dough", elem2: null },
            "sugar_water": { elem1: "dough", elem2: null },
            "seltzer": { elem1: "dough", elem2: null },
            "pool_water": { elem1: "dough", elem2: null },
            "yolk": { elem1: "batter", elem2: null },
            "yogurt": { elem1: "batter", elem2: null },
            "honey": { elem1: "gingerbread", elem2: null },
            "molasses": { elem1: "gingerbread", elem2: null },
            "sap": { elem1: "gingerbread", elem2: null },
            "caramel": { elem1: "gingerbread", elem2: null },
            "broth": { elem1: "gingerbread", elem2: null },
            "soda": { elem1: "gingerbread", elem2: null },
            "tea": { elem1: "gingerbread", elem2: null },
            "blood": { elem1: "gingerbread", elem2: null },
            "infection": { elem1: "gingerbread", elem2: null },
            "antibody": { elem1: "gingerbread", elem2: null },
            "milk": { elem1: "gingerbread", elem2: null },
            "cream": { elem1: "gingerbread", elem2: null },
        },
        category: "food",
        tempHigh: 400,
        stateHigh: "fire",
        burn: 40,
        burnTime: 25,
        state: "solid",
        density: 600,
        isFood: true
    },
    "cloner": {
        color: "#dddd00",
        behavior: behaviors.CLONER,
        ignore: ["ecloner", "slow_cloner", "clone_powder", "floating_cloner"],
        category: "machines",
        insulate: true,
        hardness: 1
    },
    "ecloner": {
        name: "e-cloner",
        color: "#dddd00",
        behavior: behaviors.WALL,
        behaviorOn: behaviors.CLONER,
        ignore: ["cloner", "slow_cloner", "clone_powder", "floating_cloner"],
        category: "machines",
        insulate: true,
        conduct: 1,
        hardness: 1
    },
    "slow_cloner": {
        color: "#888800",
        behavior: [
            "XX|CF%10|XX",
            "CF%10|XX|CF%10",
            "XX|CF%10|XX",
        ],
        ignore: ["cloner", "ecloner", "clone_powder", "floating_cloner"],
        category: "machines",
        insulate: true,
        hardness: 1
    },
    "wire": {
        color: "#4d0a03",
        behavior: behaviors.WALL,
        category: "machines",
        insulate: true,
        conduct: 1,
        noMix: true
    },
    "ewall": {
        color: "#7a7769",
        behavior: behaviors.WALL,
        category: "machines",
        hardness: 1,
        noMix: true,
        conduct: 1
    },
    "random": { //hard-coded
        color: ["#3e5f8a", "#a334ec", "#ea96f9", "#a6ecf6", "#70ebc8", "#d9286b", "#7eed91", "#a18b30"],
        behavior: behaviors.WALL,
        category: "special",
        excludeRandom: true
    },
    "image": {
        color: ["#78bbff", "#5bb81a"],
        onSelect: function () {
            // prompt to upload an image file, then store the image in placingImage
            var file = document.createElement("input");
            file.type = "file";
            file.accept = "image/*";
            file.onchange = function () {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var img = new Image();
                    img.onload = function () {
                        placingImage = img;
                    }
                    img.src = e.target.result;
                }
                reader.readAsDataURL(file.files[0]);
            }
            file.click();
        },
        onUnselect: function () {
            placingImage = null;
        },
        tool: function () { },
        category: "special",
    },
    "unpaint": {
        color: ["#ffffff", "#000000"],
        tool: function (pixel) {
            if (!elements[pixel.element].customColor) {
                pixel.color = pixelColorPick(pixel)
            }
        },
        ignore: ["color_sand", "stained_glass"],
        category: "special"
    },
    "uncharge": {
        color: "#0000ff",
        tool: function (pixel) {
            if (pixel.charge) {
                delete pixel.charge;
                pixel.chargeCD = 16;
            }
            var r = elements.uncharge.reactions[pixel.element];
            if (r) {
                if (r.elem2) { changePixel(pixel, r.elem2) }
                else { deletePixel(pixel.x, pixel.y) }
            }
        },
        reactions: {
            "electric": { elem2: null },
            "lightning": { elem2: null },
            "proton": { elem2: "neutron" },
        },
        category: "special",
        excludeRandom: true
    },
    "unburn": {
        color: "#383645",
        tool: function (pixel) {
            if (pixel.burning) {
                delete pixel.burning;
                delete pixel.burnStart;
            }
            if (pixel.element === "fire" || pixel.element === "plasma") {
                changePixel(pixel, "smoke")
            }
        },
        category: "special",
        excludeRandom: true
    },
    "smash": {
        color: ["#666666", "#888888", "#666666"],
        tool: function (pixel) {
            if (elements[pixel.element].breakInto) {
                // times 0.25 if not shiftDown else 1
                if (Math.random() < (elements[pixel.element].hardness || 1) * (shiftDown ? 1 : 0.25)) {
                    var breakInto = elements[pixel.element].breakInto;
                    // if breakInto is an array, pick one
                    if (Array.isArray(breakInto)) {
                        breakInto = breakInto[Math.floor(Math.random() * breakInto.length)];
                    }
                    if (breakInto === null) {
                        deletePixel(pixel.x, pixel.y);
                        return;
                    }
                    var oldelement = pixel.element;
                    changePixel(pixel, breakInto);
                    if (elements[oldelement].breakIntoColor) {
                        pixel.color = pixelColorPick(pixel, elements[oldelement].breakIntoColor);
                    }
                }
            }
        },
        category: "tools",
        excludeRandom: true
    },
    "filler": {
        color: "#ae4cd9",
        behavior: behaviors.FILL,
        category: "special",
        excludeRandom: true,
        reactions: {
            "neutron": { elem1: "lattice" },
            "proton": { elem1: "vertical" },
            "electric": { elem1: "horizontal" },
            "positron": { elem1: "vertical" },
            "plasma": { elem1: "armageddon", tempMin: 500, charged: true },
        }
    },
    "lattice": {
        color: "#cb4cd9",
        behavior: [
            "CL|XX|CL",
            "XX|XX|XX",
            "CL|XX|CL",
        ],
        hidden: true,
        category: "special",
        excludeRandom: true
    },
    "gravel": {
        color: ["#e3e0df", "#b1aba3", "#74736d", "#524b47"],
        behavior: behaviors.POWDER,
        reactions: {
            "broth": { elem2: "water", chance: 0.01 },
            "tea": { elem2: "water", chance: 0.01 },
        },
        category: "land",
        tempHigh: 950,
        stateHigh: "magma",
        state: "solid",
        density: 1680,
        hardness: 0.2,
        breakInto: "sand"
    },
    "slime": {
        color: "#81cf63",
        behavior: behaviors.LIQUID,
        reactions: {
            "bomb": { elem2: "sticky_bomb", elem2: null }
        },
        viscosity: 5000,
        tempHigh: 120,
        stateHigh: "steam",
        tempLow: 0,
        category: "liquids",
        state: "liquid",
        density: 1450,
        stain: 0.05
    },
    "cement": {
        color: "#b5b5b5",
        behavior: behaviors.LIQUID,
        tick: function (pixel) {
            if (pixelTicks - pixel.start > 100) {
                changePixel(pixel, "concrete")
            }
        },
        onMix: function (pixel) {
            pixel.start = pixelTicks;
        },
        category: "liquids",
        tempHigh: 1550,
        stateHigh: "magma",
        tempLow: -10,
        stateLow: "concrete",
        state: "solid",
        density: 1440,
        hardness: 0.1,
        viscosity: 1000
    },
    "dust": {
        color: "#666666",
        behavior: behaviors.POWDER,
        category: "powders",
        burn: 10,
        burnTime: 1,
        state: "solid",
        density: 1490
    },
    "void": {
        color: "#262626",
        behavior: behaviors.DELETE,
        category: "special",
        hardness: 1,
        excludeRandom: true
    },
    "sun": {
        color: "#ffffbd",
        tick: function (pixel) {
            // minimum 1726
            // maximum 7726
            if (pixel.temp < 1500) { pixel.color = pixelColorPick(pixel, "#7a4e43"); var c = 0 }
            else if (pixel.temp < 3600) { pixel.color = pixelColorPick(pixel, "#ffbdbd"); var c = 0.015 }
            else if (pixel.temp < 5000) { pixel.color = pixelColorPick(pixel, "#ffd5bd"); var c = 0.025 }
            else if (pixel.temp < 7000) { pixel.color = pixelColorPick(pixel, "#ffffbd"); var c = 0.05 }
            else if (pixel.temp < 11000) { pixel.color = pixelColorPick(pixel, "#f7fff5"); var c = 0.1 }
            else if (pixel.temp < 28000) { pixel.color = pixelColorPick(pixel, "#bde0ff"); var c = 0.2 }
            else { pixel.color = pixelColorPick(pixel, "#c3bdff"); var c = 0.4 }
            for (var i = 0; i < adjacentCoords.length; i++) {
                var x = pixel.x + adjacentCoords[i][0];
                var y = pixel.y + adjacentCoords[i][1];
                if (isEmpty(x, y)) {
                    if (Math.random() > c) { continue }
                    createPixel("light", x, y);
                    pixelMap[x][y].color = pixel.color;
                }
                else if (!outOfBounds(x, y)) {
                    var newPixel = pixelMap[x][y];
                    if (pixel.temp !== newPixel.temp && elements[newPixel.element].id === elements.sun.id) {
                        var avg = (pixel.temp + newPixel.temp) / 2;
                        pixel.temp = avg;
                        newPixel.temp = avg;
                        pixelTempCheck(pixel);
                        pixelTempCheck(newPixel);
                    }
                }
            }
        },
        reactions: {
            "hydrogen": { elem2: "helium", temp1: 5 },
            "helium": { elem2: "carbon_dioxide", temp1: 5, tempMax: 3600 },
            "carbon_dioxide": { elem2: "neon", temp1: 5, tempMax: 1800 }
        },
        temp: 5504,
        tempLow: -100,
        stateLow: "supernova",
        category: "special",
        state: "gas",
        //density: 1408,
        insulate: true,
        noMix: true,
        alias: "star"
    },
    "cell": {
        color: ["#00ee00", "#83ee00", "#d6ee00"],
        behavior: [
            "XX|CL%0.5|XX",
            "CL%0.5|XX|CL%0.5",
            "M2%10|M1|M2%10",
        ],
        reactions: {
            "infection": { elem1: "cancer", chance: 0.01 },
            "blood": { elem1: "blood", chance: 0.01 },
            "antibody": { elem1: "antibody", chance: 0.01 },
            "sugar": { elem2: "cell", chance: 0.03 },
            "sugar_water": { elem2: "cell", chance: 0.04 },
            "alcohol": { elem1: [null, "dna"], chance: 0.02 },
            "poison": { elem1: null, chance: 0.02 },
            "oxygen": { elem2: "carbon_dioxide", chance: 0.05 },
            "ammonia": { elem2: "nitrogen", chance: 0.05 }
        },
        tempHigh: 102,
        stateHigh: "steam",
        tempLow: -2,
        stateLow: "ice",
        state: "solid",
        density: 1000.1,
        category: "life",
        breakInto: ["water", "dna", "dna", "dna"]
    },
    "cancer": {
        color: ["#300b29", "#5c114e", "#870c71"],
        behavior: [
            "XX|CL%1|XX",
            "CL%1|XX|CL%1",
            "M2%2|M1|M2%2",
        ],
        reactions: {
            "cell": { elem2: "cancer", chance: 0.005 },
            "frog": { elem2: "cancer", chance: 0.005 },
            "tadpole": { elem2: "cancer", chance: 0.005 },
            "fish": { elem2: "cancer", chance: 0.005 },
            "rat": { elem2: "cancer", chance: 0.005 },
            "bird": { elem2: "cancer", chance: 0.005 },
            "bone": { elem2: "cancer", chance: 0.005 },
            "bone_marrow": { elem2: "cancer", chance: 0.005 },
            "sugar": { elem2: "cancer", chance: 0.04 },
            "sugar_water": { elem2: "cancer", chance: 0.05 },
            "alcohol": { elem1: [null, "dna"], chance: 0.01 },
            "poison": { elem1: null, chance: 0.01 },
            "plant": { elem2: ["dead_plant", null], chance: 0.005 },
            "proton": { elem1: null, chance: 0.04 }
        },
        tempHigh: 80,
        stateHigh: "plague",
        tempLow: -30,
        stateLow: "dirty_water",
        state: "solid",
        density: 1000.2,
        category: "life",
        breakInto: "dna",
        breakIntoColor: ["#c9b7b7", "#c9c6b7", "#c9c6b7", "#b7c8c9", "#c9b7c5"],
        nocheer: true
    },
    "dna": {
        color: ["#ffe3e3", "#e3e3ff", "#ffffe3", "#e3ffe3"],
        behavior: behaviors.POWDER,
        reactions: {
            "fire": { elem2: null },
            "radiation": { "color1": ["#ffe3e3", "#e3e3ff", "#ffffe3", "#e3ffe3"] },
            "neutron": { "color1": ["#ffe3e3", "#e3e3ff", "#ffffe3", "#e3ffe3"] }
        },
        tempHigh: 190,
        stateHigh: "smoke",
        state: "solid",
        density: 1700,
        category: "life",
        hidden: true,
        alias: "deoxyribonucleic acid"
    },
    "plague": {
        color: "#36005c",
        behavior: [
            "M2|M1|M2",
            "M1|DL%1|M1",
            "M2|M1|M2",
        ],
        reactions: {
            "frog": { elem2: "plague", chance: 0.05 },
            "ant": { elem2: "plague", chance: 0.05 },
            "bee": { elem2: "plague", chance: 0.05 },
            "fish": { elem2: "plague", chance: 0.05 },
            "firefly": { elem2: "plague", chance: 0.05 },
            "chlorine": { elem1: null },
            "liquid_chlorine": { elem1: null }
        },
        tempHigh: 300,
        stateHigh: null,
        category: "life",
        state: "gas",
        density: 600
    },
    "worm": {
        color: "#d34c37",
        behavior: [
            "SW:dirt,sand,gravel,ash,mycelium,mud,wet_sand,clay_soil,water,salt_water,dirty_water%3|XX|SW:dirt,sand,gravel,ash,mycelium,mud,wet_sand,clay_soil,water,salt_water,dirty_water%3",
            "M2%10|XX|M2%10",
            "SW:dirt,sand,gravel,ash,mycelium,mud,wet_sand,clay_soil,water,salt_water,dirty_water%3|M1|SW:dirt,sand,gravel,ash,mycelium,mud,wet_sand,clay_soil,water,salt_water,dirty_water%3",
        ],
        reactions: {
            "ash": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
            "root": { elem2: "dirt", chance: 0.1, func: behaviors.FEEDPIXEL },
            "dead_plant": { elem2: "dirt", chance: 0.1, func: behaviors.FEEDPIXEL },
            "tinder": { elem2: [null, "dirt"], chance: 0.1, func: behaviors.FEEDPIXEL },
            "sawdust": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
            "dust": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
            "rotten_meat": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "dead_bug": { elem2: "dirt", chance: 0.1, func: behaviors.FEEDPIXEL },
            "hyphae": { elem2: "mycelium", chance: 0.1, func: behaviors.FEEDPIXEL },
            "plant": { elem2: "dirt", chance: 0.01, func: behaviors.FEEDPIXEL },
            "evergreen": { elem2: "dirt", chance: 0.01, func: behaviors.FEEDPIXEL },
            //"grass": { elem2:"dirt", chance:0.1, func:behaviors.FEEDPIXEL },
            "herb": { elem2: "dirt", chance: 0.1, func: behaviors.FEEDPIXEL },
            "limestone": { elem2: "calcium", chance: 0.025, func: behaviors.FEEDPIXEL },
            "egg": { elem2: "yolk", chance: 0.005, func: behaviors.FEEDPIXEL },
            "yolk": { elem2: null, chance: 0.01, func: behaviors.FEEDPIXEL },
            "quicklime": { elem2: "calcium", chance: 0.025, func: behaviors.FEEDPIXEL },
            "slaked_lime": { elem2: "calcium", chance: 0.025, func: behaviors.FEEDPIXEL },
            "mudstone": { elem2: "dirt", chance: 0.1 },
            "permafrost": { elem2: "dirt", chance: 0.1 },
            "packed_sand": { elem2: "sand", chance: 0.1 },
            "lichen": { elem2: "dirt", chance: 0.0025 },
            "salt": { elem1: "slime", elem2: null },
            "potassium_salt": { elem1: "slime", elem2: null },
            "epsom_salt": { elem1: "slime", elem2: null }
        },
        tempHigh: 100,
        stateHigh: "ash",
        tempLow: 0,
        stateLow: "frozen_worm",
        category: "life",
        breakInto: "slime",
        burn: 20,
        burnTime: 50,
        state: "solid",
        density: 1050,
        conduct: 0.17
    },
    "frozen_worm": {
        color: "#37d3b6",
        behavior: behaviors.STURDYPOWDER,
        temp: -20,
        tempHigh: 5,
        stateHigh: "worm",
        category: "life",
        breakInto: "slime",
        hidden: true,
        state: "solid",
        density: 1050,
        conduct: 0.17
    },
    "flea": {
        color: "#9e4732",
        behavior: [
            "M2|XX|M2",
            "XX|XX|XX",
            "M2|M1|M2",
        ],
        reactions: {
            "blood": { elem2: null, chance: 0.1875, func: behaviors.FEEDPIXEL },
            "infection": { elem2: null, chance: 0.1875, func: behaviors.FEEDPIXEL },
            "antibody": { elem2: null, chance: 0.1874, func: behaviors.FEEDPIXEL },
            "antidote": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "dead_plant": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "ketchup": { elem2: null, chance: 0.1 },
            "mercury": { elem2: null, elem1: null, chance: 0.1875 },
            "vinegar": { elem1: "dead_bug", elem2: null },
            "alcohol": { elem1: "dead_bug", elem2: null }
        },
        tempHigh: 100,
        stateHigh: "ash",
        tempLow: 0,
        stateLow: "dead_bug",
        category: "life",
        burn: 95,
        burnTime: 25,
        state: "solid",
        density: 400,
        conduct: 0.15
    },
    "termite": {
        color: "#f5a056",
        behavior: [
            "XX|XX|SW:wood,tree_branch,dirt,sand,gravel,clay_soil%5",
            "XX|FX%3|M2%15 AND BO",
            "XX|M1|SW:wood,tree_branch,dirt,sand,gravel,clay_soil%5",
        ],
        reactions: {
            "wood": { elem2: null, chance: 0.04, func: behaviors.FEEDPIXEL },
            "tree_branch": { elem2: null, chance: 0.02, func: behaviors.FEEDPIXEL },
            "cellulose": { elem2: null, chance: 0.04, func: behaviors.FEEDPIXEL },
            "paper": { elem2: null, chance: 0.04, func: behaviors.FEEDPIXEL },
            "bamboo": { elem2: null, chance: 0.03, func: behaviors.FEEDPIXEL },
            "bamboo_plant": { elem2: null, chance: 0.04, func: behaviors.FEEDPIXEL },
            "sapling": { elem2: null, chance: 0.025, func: behaviors.FEEDPIXEL },
            "sawdust": { elem2: null, chance: 0.025, func: behaviors.FEEDPIXEL },
            "particleboard": { elem2: null, chance: 0.025, func: behaviors.FEEDPIXEL },
            "tinder": { elem2: null, chance: 0.025, func: behaviors.FEEDPIXEL },
            "lichen": { elem2: null, chance: 0.025, func: behaviors.FEEDPIXEL },
            "vinegar": { elem1: "dead_bug", elem2: null },
            "alcohol": { elem1: "dead_bug", elem2: null }
        },
        foodNeed: 20,
        tempHigh: 100,
        stateHigh: "ash",
        tempLow: 0,
        stateLow: "dead_bug",
        category: "life",
        burn: 95,
        burnTime: 25,
        state: "solid",
        conduct: 0.15
    },
    "ant": {
        color: "#5e0b04",
        behavior: [
            "XX|XX|SW:dirt,sand,gravel,clay_soil%8",
            "XX|FX%8|M2 AND BO",
            "XX|M1|SW:dirt,sand,gravel,clay_soil%8",
        ],
        reactions: {
            "wheat": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
            "caramel": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "bread": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "sugar_water": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "soda": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "juice": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "sugar": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
            "rotten_meat": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "cheese": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "rotten_cheese": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "dead_bug": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "vinegar": { elem1: "dead_bug", elem2: null },
            "alcohol": { elem1: "dead_bug", elem2: null },
            "mushroom_cap": { elem2: null, chance: 0.025, func: behaviors.FEEDPIXEL },
            "candy": { elem2: null, chance: 0.025, func: behaviors.FEEDPIXEL }
        },
        tempHigh: 100,
        stateHigh: "ash",
        tempLow: 0,
        stateLow: "dead_bug",
        breakInto: "dead_bug",
        category: "life",
        burn: 95,
        burnTime: 25,
        state: "solid",
        density: 500,
        conduct: 0.15
    },
    "fly": {
        color: "#4c4e42",
        tick: behaviors.FLY,
        behaviorOn: [
            "XX|CR:flash|XX",
            "CR:flash|CH:ash|CR:flash",
            "XX|CR:flash|XX",
        ],
        reactions: {
            //"plant": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
            //"evergreen": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
            "dead_plant": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "meat": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "cooked_meat": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "rotten_meat": { elem2: [null, null, "ammonia"], chance: 0.15, func: behaviors.FEEDPIXEL },
            "cheese": { elem2: [null, null, "ammonia"], chance: 0.15, func: behaviors.FEEDPIXEL },
            "rotten_cheese": { elem2: [null, null, "ammonia"], chance: 0.15, func: behaviors.FEEDPIXEL },
            "vine": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "corn": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "potato": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "wheat": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
            "yeast": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "caramel": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "bread": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
            "sugar_water": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "soda": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL }
        },
        foodNeed: 15,
        tempHigh: 100,
        stateHigh: "ash",
        tempLow: 0,
        stateLow: "dead_bug",
        breakInto: "dead_bug",
        category: "life",
        burn: 95,
        burnTime: 25,
        state: "solid",
        density: 600,
        conduct: 1
    },
    "firefly": {
        color: ["#684841", "#684841", "#d9d950", "#684841", "#684841"],
        tick: function (pixel) {
            if (!pixel.fff) { // firefly flicker
                // choose a number between 20 and 80
                pixel.fff = Math.floor(Math.random() * 60) + 20;
            }
            if (pixelTicks % pixel.fff === 0) {
                pixel.color = pixelColorPick(pixel, "#d9d950")
            }
            else if (pixelTicks % pixel.fff === 2) {
                pixel.color = pixelColorPick(pixel, "#684841");
            }
            behaviors.FLY(pixel, function (firefly, newfly) {
                if (newfly) {
                    newfly.fff = firefly.fff;
                }
            })
        },
        reactions: {
            "pollen": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
            "honey": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
            "firefly": { elem2: null, chance: 0.01, func: behaviors.FEEDPIXEL },
            "sugar_water": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
            "soda": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
            "sugar": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL }
        },
        tempHigh: 100,
        stateHigh: "ash",
        tempLow: 0,
        stateLow: "dead_bug",
        breakInto: "dead_bug",
        category: "life",
        burn: 95,
        burnTime: 25,
        state: "solid",
        density: 600,
        conduct: 0.15
    },
    "bee": {
        color: "#c4b100",
        // behavior: [
        //     "XX|M2|M1",
        //     "XX|FX%2|M1 AND BO",
        //     "XX|CR:pollen%0.025 AND M2|M1",
        // ],
        tick: function (pixel) {
            if (pixel.pollen && Math.random() < 0.0005 && isEmpty(pixel.x, pixel.y + 1)) {
                createPixel("pollen", pixel.x, pixel.y + 1);
                pixelMap[pixel.x][pixel.y + 1].seed = pixel.pollen
            }
            behaviors.FLY(pixel, function (bee, pollenpixel) {
                if (pollenpixel) {
                    if (elements[pollenpixel.element].seed === true) {
                        bee.pollen = pollenpixel.element
                    }
                    else if (elements[pollenpixel.element].seed) {
                        bee.pollen = elements[pollenpixel.element].seed
                    }
                }
            })
        },
        reactions: {
            "sugar_water": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
            "soda": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
            "sugar": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "yeast": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "caramel": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
            "candy": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL }
        },
        egg: "honey",
        tempHigh: 100,
        stateHigh: "ash",
        tempLow: 0,
        stateLow: "dead_bug",
        breakInto: ["dead_bug", "honey"],
        category: "life",
        burn: 95,
        burnTime: 25,
        state: "solid",
        density: 600,
        conduct: 0.15
    },
    "stink_bug": {
        color: ["#56482d", "#52472c", "#635443"],
        properties: {
            "phase": 1
        },
        tick: function (pixel) {
            var newX = pixel.x;
            var newY = pixel.y;
            if (pixel.phase === 1) { // Landing
                newX += pixel.flipX ? -1 : 1;
                newY++;
                if (!tryMove(pixel, newX, newY)) { pixel.phase = 0 } // Stop landing
            }
            else if (pixel.phase === 2) { // Flying
                newX += pixel.flipX ? -1 : 1;
                newY += Math.random() < 0.5 ? -1 : 1;
                if (Math.random() < 0.01) { pixel.phase = 1 } // Start landing
                if (!tryMove(pixel, newX, newY)) {
                    pixel.flipX = !pixel.flipX;
                }
            }
            else if (pixel.phase === 0) { // Standing
                if (Math.random() < 0.05) { newX += pixel.flipX ? -1 : 1; }
                newY++;
                if (Math.random() < 0.01) { pixel.phase = 2 } // Start flying
                tryMove(pixel, newX, newY);
            }
            // Random chance to flip
            if (Math.random() < 0.05) { pixel.flipX = !pixel.flipX; }
            // Random chance to create "stench" behind
            if (Math.random() < 0.001) {
                if (isEmpty(pixel.x + (pixel.flipX ? 1 : -1), pixel.y)) {
                    createPixel("stench", pixel.x + (pixel.flipX ? 1 : -1), pixel.y);
                }
            }
            doHeat(pixel);
            doElectricity(pixel);
        },
        reactions: {
            "petal": { elem2: null, chance: 0.2, func: behaviors.FEEDPIXEL },
            "pistil": { elem2: null, chance: 0.2, func: behaviors.FEEDPIXEL },
            "grape": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "plant": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL }
        },
        flippableX: true,
        tempHigh: 100,
        stateHigh: "stench",
        tempLow: 0,
        stateLow: "dead_bug",
        category: "life",
        burn: 95,
        burnTime: 25,
        burnInto: "stench",
        breakInto: "stench",
        state: "solid",
        density: 600,
        conduct: 0.15
    },
    "dead_bug": {
        color: ["#38302a", "#403732", "#453a2e", "#241d15", "#242e23"],
        behavior: behaviors.POWDER,
        tempHigh: 100,
        stateHigh: "ash",
        category: "life",
        burn: 95,
        burnTime: 25,
        burnInto: ["smoke", "smoke", "ash"],
        state: "solid",
        density: 600,
        hidden: true
    },
    "human": {
        // color: ["#f5eac6","#d4c594","#a89160","#7a5733","#523018","#361e0e"],
        color: ["#f3e7db", "#f7ead0", "#eadaba", "#d7bd96", "#a07e56", "#825c43", "#604134", "#3a312a"],
        category: "life",
        properties: {
            dead: false,
            dir: 1,
            panic: 0
        },
        tick: function (pixel) {
            if (isEmpty(pixel.x, pixel.y + 1)) {
                createPixel("body", pixel.x, pixel.y + 1);
                pixel.element = "head";
            }
            else if (isEmpty(pixel.x, pixel.y - 1)) {
                createPixel("head", pixel.x, pixel.y - 1);
                pixelMap[pixel.x][pixel.y - 1].color = pixel.color;
                pixel.element = "body";
                pixel.color = pixelColorPick(pixel)
            }
            else {
                deletePixel(pixel.x, pixel.y);
            }
        },
        related: ["body", "head"]
    },
    "body": {
        color: ["#069469", "#047e99", "#7f5fb0"],
        category: "life",
        hidden: true,
        density: 1500,
        state: "solid",
        conduct: .05,
        temp: 37,
        tempHigh: 250,
        stateHigh: "cooked_meat",
        tempLow: -30,
        stateLow: "frozen_meat",
        burn: 10,
        burnTime: 250,
        burnInto: "cooked_meat",
        breakInto: ["blood", "meat", "bone"],
        reactions: {
            "cancer": { elem1: "cancer", chance: 0.005 },
            "radiation": { elem1: ["ash", "meat", "rotten_meat", "cooked_meat"], chance: 0.4 },
            "plague": { elem1: "plague", chance: 0.05 }
        },
        properties: {
            dead: false,
            dir: 1,
            panic: 0
        },
        tick: function (pixel) {
            if (tryMove(pixel, pixel.x, pixel.y + 1)) { // Fall
                if (!isEmpty(pixel.x, pixel.y - 2, true)) { // Drag head down
                    var headpixel = pixelMap[pixel.x][pixel.y - 2];
                    if (headpixel.element == "head") {
                        if (isEmpty(pixel.x, pixel.y - 1)) {
                            movePixel(pixelMap[pixel.x][pixel.y - 2], pixel.x, pixel.y - 1);
                        }
                        else {
                            swapPixels(pixelMap[pixel.x][pixel.y - 2], pixelMap[pixel.x][pixel.y - 1]);
                        }
                    }
                }
            }
            doHeat(pixel);
            doBurning(pixel);
            doElectricity(pixel);
            if (pixel.dead) {
                // Turn into rotten_meat if pixelTicks-dead > 500
                if (pixelTicks - pixel.dead > 200) {
                    changePixel(pixel, "rotten_meat");
                }
                return
            }

            // Find the head
            if (!isEmpty(pixel.x, pixel.y - 1, true) && pixelMap[pixel.x][pixel.y - 1].element == "head") {
                var head = pixelMap[pixel.x][pixel.y - 1];
                if (head.dead) { // If head is dead, kill body
                    pixel.dead = head.dead;
                }
            }
            else { var head = null }

            if (isEmpty(pixel.x, pixel.y - 1)) {
                // create blood if decapitated 10% chance
                if (Math.random() < 0.1) {
                    createPixel("blood", pixel.x, pixel.y - 1);
                    // set dead to true 15% chance
                    if (Math.random() < 0.15) {
                        pixel.dead = pixelTicks;
                    }
                }
            }
            else if (head == null) { return }
            else if (Math.random() < 0.1) { // Move 10% chance
                var movesToTry = [
                    [1 * pixel.dir, 0],
                    [1 * pixel.dir, -1],
                ];
                // While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
                while (movesToTry.length > 0) {
                    var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                    if (isEmpty(pixel.x + move[0], pixel.y + move[1] - 1)) {
                        if (tryMove(pixel, pixel.x + move[0], pixel.y + move[1])) {
                            movePixel(head, head.x + move[0], head.y + move[1]);
                            break;
                        }
                    }
                }
                // 15% chance to change direction
                if (Math.random() < 0.15) {
                    pixel.dir *= -1;
                }
                // homeostasis
                if (pixel.temp > 37) { pixel.temp -= 1; }
                else if (pixel.temp < 37) { pixel.temp += 1; }
            }

        }
    },
    "head": {
        color: ["#f3e7db", "#f7ead0", "#eadaba", "#d7bd96", "#a07e56", "#825c43", "#604134", "#3a312a"],
        category: "life",
        hidden: true,
        density: 1080,
        state: "solid",
        conduct: .05,
        temp: 37,
        tempHigh: 250,
        stateHigh: "cooked_meat",
        tempLow: -30,
        stateLow: "frozen_meat",
        burn: 10,
        burnTime: 250,
        burnInto: "cooked_meat",
        breakInto: ["blood", "meat", "bone"],
        reactions: {
            "cancer": { elem1: "cancer", chance: 0.005 },
            "radiation": { elem1: ["ash", "meat", "rotten_meat", "cooked_meat"], chance: 0.4 },
            "plague": { elem1: "plague", chance: 0.05 },
            "oxygen": { elem2: "carbon_dioxide", chance: 0.5 },
            "meat": { elem2: null, chance: 0.1 },
            "cooked_meat": { elem2: null, chance: 0.1 },
            "sugar": { elem2: null, chance: 0.1 },
            "broth": { elem2: null, chance: 0.2 },
            "yolk": { elem2: null, chance: 0.1 },
            "hard_yolk": { elem2: null, chance: 0.1 },
            "dough": { elem2: null, chance: 0.1 },
            "batter": { elem2: null, chance: 0.2 },
            "butter": { elem2: null, chance: 0.1 },
            "melted_butter": { elem2: null, chance: 0.2 },
            "chocolate": { elem2: null, chance: 0.2 },
            "melted_chocolate": { elem2: null, chance: 0.3 },
            "grape": { elem2: null, chance: 0.1 },
            "herb": { elem2: null, chance: 0.1 },
            "lettuce": { elem2: null, chance: 0.1 },
            "corn": { elem2: null, chance: 0.1 },
            "popcorn": { elem2: null, chance: 0.15 },
            "potato": { elem2: null, chance: 0.1 },
            "baked_potato": { elem2: null, chance: 0.15 },
            "bread": { elem2: null, chance: 0.1 },
            "toast": { elem2: null, chance: 0.1 },
            "gingerbread": { elem2: null, chance: 0.1 },
            "baked_batter": { elem2: null, chance: 0.2 },
            "wheat": { elem2: null, chance: 0.1 },
            "candy": { elem2: null, chance: 0.1 },
            "yogurt": { elem2: null, chance: 0.2 },
            "frozen_yogurt": { elem2: null, chance: 0.1 },
            "ice_cream": { elem2: null, chance: 0.2 },
            "beans": { elem2: null, chance: 0.2 },
            "tea": { elem2: null, chance: 0.2 },
            "milk": { elem2: null, chance: 0.2 },
            "chocolate_milk": { elem2: null, chance: 0.2 },
            "fruit_milk": { elem2: null, chance: 0.2 },
            "pilk": { elem2: null, chance: 0.2 },
            "eggnog": { elem2: null, chance: 0.2 },
            "juice": { elem2: null, chance: 0.2 },
            "cheese": { elem2: null, chance: 0.1 },
            "melted_cheese": { elem2: null, chance: 0.2 },
            "alcohol": { elem2: null, chance: 0.2 },
            "antidote": { elem2: null, chance: 0.2 },
            "honey": { elem2: null, chance: 0.2 },
            "caramel": { elem2: null, chance: 0.2 },
            "molasses": { elem2: null, chance: 0.05 },
            "ketchup": { elem2: null, chance: 0.1 },
        },
        properties: {
            dead: false
        },
        tick: function (pixel) {
            doHeat(pixel);
            doBurning(pixel);
            doElectricity(pixel);
            if (pixel.dead) {
                // Turn into rotten_meat if pixelTicks-dead > 500
                if (pixelTicks - pixel.dead > 200) {
                    changePixel(pixel, "rotten_meat");
                    return
                }
            }

            // Find the body
            if (!isEmpty(pixel.x, pixel.y + 1, true) && pixelMap[pixel.x][pixel.y + 1].element == "body") {
                var body = pixelMap[pixel.x][pixel.y + 1];
                if (body.dead) { // If body is dead, kill head
                    pixel.dead = body.dead;
                }
            }
            else { var body = null }

            if (isEmpty(pixel.x, pixel.y + 1)) {
                tryMove(pixel, pixel.x, pixel.y + 1);
                // create blood if severed 10% chance
                if (isEmpty(pixel.x, pixel.y + 1) && !pixel.dead && Math.random() < 0.1) {
                    createPixel("blood", pixel.x, pixel.y + 1);
                    // set dead to true 15% chance
                    if (Math.random() < 0.15) {
                        pixel.dead = pixelTicks;
                    }
                }
            }
            // homeostasis
            if (pixel.temp > 37) { pixel.temp -= 1; }
            else if (pixel.temp < 37) { pixel.temp += 1; }
        }
    },
    "bird": {
        color: "#997457",
        properties: { "phase": 2, "rising": 0 },
        tick: function (pixel) {
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
                        else if (newPixel.element === "bird") {
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
                newY++;
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
                newY--;
                if (!tryMove(pixel, newX, newY) || (pixel.rising > 5 && Math.random() < 0.05)) { pixel.phase = 2; pixel.rising = 0; } // Start gliding
                else { pixel.rising++; }
            }
            doHeat(pixel);
            doElectricity(pixel);
            doBurning(pixel);
        },
        flippableX: true,
        reactions: {
            "fly": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
            "firefly": { elem2: null, chance: 0.3, func: behaviors.FEEDPIXEL },
            "bee": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "worm": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
            "ant": { elem2: null, chance: 0.025, func: behaviors.FEEDPIXEL },
            "dead_bug": { elem2: null, chance: 0.04, func: behaviors.FEEDPIXEL },
            "lichen": { elem2: null, chance: 0.04, func: behaviors.FEEDPIXEL },
            "termite": { elem2: null, chance: 0.025, func: behaviors.FEEDPIXEL },
            "flea": { elem2: null, chance: 0.025, func: behaviors.FEEDPIXEL },
            "mushroom_cap": { elem2: null, chance: 0.025, func: behaviors.FEEDPIXEL },
            "mushroom_gill": { elem2: null, chance: 0.025, func: behaviors.FEEDPIXEL },
            "seeds": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
            "flower_seed": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
            "wheat_seed": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
            "corn_seed": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
            "corn": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
            "potato_seed": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
            "grass_seed": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
            "plague": { elem1: "plague", chance: 0.05 },
            "oxygen": { elem2: "carbon_dioxide", chance: 0.5 }
        },
        foodNeed: 20,
        tempHigh: 120,
        stateHigh: "cooked_meat",
        tempLow: -18,
        stateLow: "frozen_meat",
        category: "life",
        burn: 50,
        burnTime: 100,
        breakInto: "feather",
        state: "solid",
        density: 400,
        conduct: 0.5
    },
    "rat": {
        color: ["#a698a9", "#8c7d82", "#ccc3cf"],
        behavior: [
            "XX|CR:plague%0.05 AND M2%1.5|M2%5",
            "XX|FX%2|M2 AND BO",
            "XX|M1|M2",
        ],
        reactions: {
            "oxygen": { elem2: "carbon_dioxide", chance: 0.5 },
            "meat": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
            "cooked_meat": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
            "rotten_meat": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
            "cheese": { elem2: null, chance: 0.2, func: behaviors.FEEDPIXEL },
            "rotten_cheese": { elem2: null, chance: 0.2, func: behaviors.FEEDPIXEL },
            "melted_cheese": { elem2: null, chance: 0.3, func: behaviors.FEEDPIXEL },
            "plant": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
            "evergreen": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
            "algae": { elem2: null, chance: 0.2, func: behaviors.FEEDPIXEL },
            "grass_seed": { elem2: null, chance: 0.3, func: behaviors.FEEDPIXEL },
            "wheat_seed": { elem2: null, chance: 0.3, func: behaviors.FEEDPIXEL },
            "wheat": { elem2: null, chance: 0.2, func: behaviors.FEEDPIXEL },
            "potato_seed": { elem2: null, chance: 0.3, func: behaviors.FEEDPIXEL },
            "potato": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
            "corn_seed": { elem2: null, chance: 0.3, func: behaviors.FEEDPIXEL },
            "corn": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
            "lichen": { elem2: null, chance: 0.04, func: behaviors.FEEDPIXEL },
            "flower_seed": { elem2: null, chance: 0.4, func: behaviors.FEEDPIXEL },
            "flour": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
            "dough": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
            "bread": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
            "toast": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
            "gingerbread": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "yogurt": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "beans": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "salt": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
            "sugar": { elem2: null, chance: 0.2, func: behaviors.FEEDPIXEL },
            "herb": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
            "salt_water": { elem2: "dirty_water", chance: 0.2 },
            "sugar_water": { elem2: "dirty_water", chance: 0.2 },
            "water": { elem2: "dirty_water", chance: 0.2 },
            "popcorn": { elem2: null, chance: 0.3, func: behaviors.FEEDPIXEL },
            "candy": { elem2: null, chance: 0.3, func: behaviors.FEEDPIXEL },
            "caramel": { elem2: null, chance: 0.4, func: behaviors.FEEDPIXEL },
            "lichen": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
            "egg": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
            "yolk": { elem2: null, chance: 0.2, func: behaviors.FEEDPIXEL },
            "eggnog": { elem2: null, chance: 0.2, func: behaviors.FEEDPIXEL },
            "grape": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
            "batter": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
            "baked_batter": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
            "butter": { elem2: null, chance: 0.2, func: behaviors.FEEDPIXEL },
            "melted_butter": { elem2: null, chance: 0.3, func: behaviors.FEEDPIXEL },
            "lettuce": { elem2: null, chance: 0.2, func: behaviors.FEEDPIXEL },
            "baked_potato": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
            "ice_cream": { elem2: null, chance: 0.2, func: behaviors.FEEDPIXEL },
            "cream": { elem2: null, chance: 0.3, func: behaviors.FEEDPIXEL },
        },
        egg: "rat",
        category: "life",
        tempHigh: 120,
        stateHigh: "rotten_meat",
        tempLow: -18,
        stateLow: "frozen_meat",
        breakInto: "infection",
        burn: 80,
        burnTime: 150,
        state: "solid",
        density: 1450,
        conduct: 0.25
    },
    "frog": {
        color: "#607300",
        behavior: [
            "XX|XX|M2%3 AND SW:water,salt_water,sugar_water,dirty_water,seltzer%7",
            "XX|FX%0.5|CR:slime%0.01 AND BO",
            "XX|M1|XX",
        ],
        reactions: {
            "fly": { elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL },
            "firefly": { elem1: "meat", elem2: null, chance: 0.5 },
            "stinkbug": { elem2: null, chance: 0.55, func: behaviors.FEEDPIXEL },
            "snail": { elem2: "calcium", chance: 0.05, func: behaviors.FEEDPIXEL },
            "slug": { elem2: null, chance: 0.2, func: behaviors.FEEDPIXEL },
            "worm": { elem2: null, chance: 0.2, func: behaviors.FEEDPIXEL },
            "algae": { elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL },
            "oxygen": { elem2: "carbon_dioxide", chance: 0.5 },
            "dead_bug": { elem2: null, chance: 0.2, func: behaviors.FEEDPIXEL },
            "mercury": { elem1: "rotten_meat", chance: 0.1 },
            "bleach": { elem1: "rotten_meat", chance: 0.1 },
            "infection": { elem1: "rotten_meat", chance: 0.025 },
            "uranium": { elem1: "rotten_meat", chance: 0.1 },
            "cyanide": { elem1: "rotten_meat", chance: 0.1 },
            "chlorine": { elem1: "meat", chance: 0.1 },
            "alcohol": { elem1: "meat", chance: 0.025 },
            "dirty_water": { elem1: "rotten_meat", chance: 0.0001 },
            "pool_water": { elem1: "rotten_meat", chance: 0.005 },
        },
        foodNeed: 10,
        baby: "tadpole",
        temp: 19.1,
        tempHigh: 100,
        stateHigh: "cooked_meat",
        tempLow: -18,
        stateLow: "frozen_frog",
        category: "life",
        breakInto: "slime",
        burn: 75,
        burnTime: 30,
        state: "solid",
        density: 1450,
        conduct: 0.2
    },
    "frozen_frog": {
        color: "#007349",
        behavior: behaviors.STURDYPOWDER,
        temp: -20,
        tempHigh: 5,
        stateHigh: "frog",
        category: "life",
        breakInto: "slime",
        hidden: true,
        state: "solid",
        density: 1500
    },
    "tadpole": {
        color: "#87b574",
        behavior: [
            "XX|XX|M2%25 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%14",
            "XX|FX%0.5|SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%14",
            "XX|M1|SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%14",
        ],
        tick: function (pixel) {
            if (pixelTicks - pixel.start > 500) {
                changePixel(pixel, "frog");
            }
        },
        reactions: {
            "algae": { elem2: null, chance: 0.25 }
        },
        tempHigh: 100,
        stateHigh: "steam",
        tempLow: -10,
        stateLow: "ice",
        category: "life",
        hidden: true,
        state: "solid",
        density: 1450,
        conduct: 0.2
    },
    "fish": {
        color: "#ac8650",
        behavior: [
            "XX|M2%5|SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%14",
            "XX|FX%0.5|BO",
            "M2|M1|M2 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%5",
        ],
        reactions: {
            "algae": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
            "plant": { elem2: null, chance: 0.125, func: behaviors.FEEDPIXEL },
            "fly": { elem2: null, chance: 0.4, func: behaviors.FEEDPIXEL },
            "firefly": { elem2: null, chance: 0.6, func: behaviors.FEEDPIXEL },
            "worm": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
            "tadpole": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
            "oxygen": { elem2: "carbon_dioxide", chance: 0.5 },
            "dead_bug": { elem2: null, chance: 0.2, func: behaviors.FEEDPIXEL },
            "broth": { elem2: "water", chance: 0.2, func: behaviors.FEEDPIXEL },
            "slug": { elem2: null, chance: 0.2, func: behaviors.FEEDPIXEL },
            "herb": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "lettuce": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "dead_plant": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "lichen": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
            "yeast": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "yogurt": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "tea": { elem2: null, chance: 0.2, func: behaviors.FEEDPIXEL },
            "meat": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "rotten_meat": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "cooked_meat": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "yolk": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
            "cell": { elem2: null, chance: 0.15, func: behaviors.FEEDPIXEL },
        },
        foodNeed: 20,
        temp: 20,
        tempHigh: 120,
        stateHigh: "meat",
        tempLow: -20,
        stateLow: ["frozen_meat", "frozen_meat", "frozen_meat", "frozen_fish"],
        category: "life",
        breakInto: "blood",
        burn: 40,
        burnTime: 100,
        state: "solid",
        density: 1080,
        conduct: 0.2
    },
    "frozen_fish": {
        color: "#50ac86",
        behavior: behaviors.STURDYPOWDER,
        temp: -20,
        tempHigh: 5,
        stateHigh: "fish",
        category: "life",
        breakInto: "slime",
        hidden: true,
        state: "solid",
        density: 1050,
        conduct: 0.17
    },
    "slug": {
        color: ["#997e12", "#997e12", "#997e12", "#997e12", "#997e12", "#997e12", "#403314", "#403314", "#403314", "#403314", "#403314", "#403314", "#124a44"],
        behavior: [
            "XX|XX|XX",
            "XX|FX%0.25|M2%0.5 AND BO",
            "XX|M1|XX",
        ],
        reactions: {
            "salt": { elem1: "slime", elem2: null },
            "salt_water": { elem1: "slime", elem2: null },
            "potassium_salt": { elem1: "slime", elem2: null },
            "epsom_salt": { elem1: "slime", elem2: null },
            "plant": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "evergreen": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "cactus": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "dead_plant": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "worm": { elem2: null, chance: 0.01, func: behaviors.FEEDPIXEL },
            "mushroom_spore": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "grass": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "herb": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "grass_seed": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "algae": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "mushroom_cap": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "mushroom_stalk": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "mushroom_gill": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "lichen": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "hyphae": { elem2: "dirt", chance: 0.05, func: behaviors.FEEDPIXEL },
            "mycelium": { elem2: "dirt", chance: 0.05, func: behaviors.FEEDPIXEL }
        },
        tempLow: 5,
        stateLow: "slime",
        tempHigh: 90,
        stateHigh: "slime",
        breakInto: "slime",
        category: "life",
        state: "solid",
        density: 1450,
        conduct: 0.17
    },
    "snail": {
        color: "#5c3104",
        behavior: [
            "XX|XX|XX",
            "XX|FX%0.25|M2%0.5 AND BO",
            "XX|M1|XX",
        ],
        reactions: {
            "salt": { elem1: "calcium", elem2: null },
            "salt_water": { elem1: "calcium", elem2: null },
            "dirty_water": { elem2: "water", chance: 0.05, func: behaviors.FEEDPIXEL },
            "broth": { elem2: "water", chance: 0.05, func: behaviors.FEEDPIXEL },
            "tea": { elem2: "water", chance: 0.05, func: behaviors.FEEDPIXEL },
            "potassium_salt": { elem1: "calcium", elem2: null },
            "epsom_salt": { elem1: "calcium", elem2: null },
            "plant": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "evergreen": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "cactus": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "dead_plant": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "worm": { elem2: null, chance: 0.01, func: behaviors.FEEDPIXEL },
            "mushroom_spore": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "grass": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "herb": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "grass_seed": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "algae": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "mushroom_cap": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "mushroom_stalk": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "mushroom_gill": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "lichen": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
            "hyphae": { elem2: "dirt", chance: 0.05, func: behaviors.FEEDPIXEL },
            "mycelium": { elem2: "dirt", chance: 0.05, func: behaviors.FEEDPIXEL }
        },
        tempLow: -6.4,
        stateLow: "calcium",
        tempHigh: 100,
        stateHigh: "calcium",
        breakInto: "slime",
        category: "life",
        state: "solid",
        density: 1500,
        conduct: 0.16
    },
    "heater": {
        color: "#881111",
        behavior: [
            "XX|HT:2|XX",
            "HT:2|XX|HT:2",
            "XX|HT:2|XX",
        ],
        category: "machines",
        insulate: true
    },
    "cooler": {
        color: "#111188",
        behavior: [
            "XX|CO:2|XX",
            "CO:2|XX|CO:2",
            "XX|CO:2|XX",
        ],
        category: "machines",
        insulate: true
    },
    "superheater": {
        color: "#dd1111",
        behavior: [
            "XX|HT:10|XX",
            "HT:10|XX|HT:10",
            "XX|HT:10|XX",
        ],
        category: "machines",
        insulate: true
    },
    "freezer": {
        color: "#1111dd",
        behavior: [
            "XX|CO:10|XX",
            "CO:10|XX|CO:10",
            "XX|CO:10|XX",
        ],
        category: "machines",
        insulate: true
    },
    "torch": {
        color: "#d68542",
        behavior: [
            "XX|CR:fire|XX",
            "XX|XX|XX",
            "XX|XX|XX",
        ],
        reactions: {
            "water": { elem1: "wood" },
            "sugar_water": { elem1: "wood" },
            "salt_water": { elem1: "wood" },
            "seltzer": { elem1: "wood" },
            "dirty_water": { elem1: "wood" },
            "pool_water": { elem1: "wood" },
            "steam": { elem1: "wood" },
            "smog": { elem1: "wood" },
            "rain_cloud": { elem1: "wood" },
            "cloud": { elem1: "wood" },
            "snow_cloud": { elem1: "wood" },
            "hail_cloud": { elem1: "wood" },
            "thunder_cloud": { elem1: "wood" },
            "ice_nine": { elem1: "wood" }
        },
        temp: 600,
        category: "special",
        breakInto: "sawdust",
        tempLow: -273,
        stateLow: "wood"
    },
    "spout": {
        color: "#606378",
        behavior: [
            "XX|CR:water|XX",
            "CR:water|XX|CR:water",
            "XX|CR:water|XX",
        ],
        category: "special",
        tempHigh: 1455.5,
        stateHigh: "molten_steel",
        conduct: 0.42
    },
    "udder": {
        color: "#ecb3f5",
        tick: function (pixel) {
            if (Math.random() <= 0.025 && isEmpty(pixel.x, pixel.y + 1)) {
                createPixel("milk", pixel.x, pixel.y + 1);
                pixelMap[pixel.x][pixel.y + 1].temp = 38;
            }
            doDefaults(pixel);
        },
        tempHigh: 100,
        stateHigh: "cooked_meat",
        tempLow: -18,
        stateLow: "frozen_meat",
        burn: 15,
        burnTime: 200,
        burnInto: "cooked_meat",
        category: "special"
    },
    "bone_marrow": {
        color: "#c97265",
        behavior: [
            "XX|CR:blood,bone,bone%1|XX",
            "CR:blood,bone,bone%1|XX|CR:blood,bone,bone%1",
            "XX|CR:blood,bone,bone%1|XX",
        ],
        category: "life",
        tempHigh: 750,
        stateHigh: ["calcium", "salt", "steam", "ash"],
        tempLow: -10,
        stateLow: "frozen_meat",
        breakInto: ["calcium", "blood"],
        hidden: true
    },
    "bone": {
        color: "#d9d9d9",
        behavior: behaviors.SUPPORT,
        reactions: {
            "blood": { elem1: "bone_marrow", chance: 0.0005 },
            "antibody": { elem1: "bone_marrow", chance: 0.0005 },
            "water": { elem2: "broth", tempMin: 70 },
            "salt_water": { elem2: "broth", tempMin: 70 },
            "sugar_water": { elem2: "broth", tempMin: 70 },
            "seltzer": { elem2: "broth", tempMin: 70 },
        },
        category: "life",
        tempHigh: 760,
        stateHigh: "calcium",
        state: "solid",
        density: 1900,
        hardness: 0.5,
        breakInto: ["calcium", "calcium", "calcium", "bone_marrow"]
    },
    "balloon": {
        color: ["#fe4a75", "#267cb0", "#1a743c", "#ff6ffa", "#eaede5", "#1dc9f3", "#ff0101", "#f4cd32", "#bee347", "#fab937", "#91c7cc"],
        behavior: [
            "M1%50|M1%50|M1%50",
            "M2%5|XX|M2%5",
            "M2%5|M2%5|M2%5",
        ],
        category: "special",
        tempHigh: 120,
        stateHigh: "pop",
        burn: 20,
        burnTime: 2,
        burnInto: "pop",
        state: "solid",
        density: 0.164,
        breakInto: ["confetti", "helium", "helium", "helium"]
    },
    "antipowder": {
        color: "#ebd1d8",
        behavior: behaviors.AGPOWDER,
        category: "special",
        tempHigh: 1850,
        stateHigh: "antimolten",
        state: "solid",
        density: 1850
    },
    "antimolten": {
        color: ["#ffb5b5", "#ffd0b5", "#ffd0b5"],
        behavior: [
            "M1|M1|M1",
            "M2|XX|M2",
            "XX|CR:antifire%2.5|XX",
        ],
        temp: 1850,
        tempLow: 1750,
        stateLow: "antipowder",
        viscosity: 10000,
        hidden: true,
        state: "liquid",
        density: 1000,
        category: "special"
    },
    "antifire": {
        color: ["#ffc3a6", "#ffdfa3", "#ffb69e"],
        behavior: [
            "XX|M2|XX",
            "M2|XX|M2",
            "M1|M1|M1",
        ],
        reactions: {
            "antiliquid": { elem1: "antigas" }
        },
        temp: 600,
        tempLow: 100,
        stateLow: "antigas",
        tempHigh: 7000,
        stateHigh: "plasma",
        category: "special",
        burning: true,
        burnTime: 25,
        burnInto: "antigas",
        fireElement: "flash",
        hidden: true,
        state: "gas",
        density: 0.2
    },
    "antifluid": {
        color: "#d1dbeb",
        behavior: behaviors.AGLIQUID,
        category: "special",
        tempHigh: 100,
        stateHigh: "antigas",
        tempLow: 0,
        stateLowName: "antiice",
        state: "liquid",
        density: 1000
    },
    "antigas": {
        color: "#e6fffc",
        behavior: [
            "M2|M2|M2",
            "M2|XX|M2",
            "M1|M1|M1"
        ],
        category: "special",
        tempLow: 100,
        stateLow: "antifluid",
        hidden: true,
        state: "gas",
        density: 10
    },
    "vertical": {
        color: "#d9d9d9",
        behavior: [
            "XX|M1|XX",
            "CR:wall|XX|CR:wall",
            "XX|XX|XX",
        ],
        category: "special",
        hidden: true,
        excludeRandom: true
    },
    "horizontal": {
        color: "#d9d9d9",
        behavior: [
            "XX|CR:wall|XX",
            "XX|XX|M1",
            "XX|CR:wall|XX",
        ],
        category: "special",
        hidden: true,
        excludeRandom: true
    },
    "rocket": {
        color: "#ff0000",
        behavior: [
            "XX|M1|XX",
            "XX|DL%1|XX",
            "CR:smoke|CR:fire|CR:smoke",
        ],
        category: "special",
        hidden: true,
        state: "solid",
        temp: 700,
        density: 7300,
        conduct: 0.73,
        tempHigh: 1455.5,
        stateHigh: "molten_steel"
    },
    "ash": {
        color: ["#8c8c8c", "#9c9c9c"],
        behavior: behaviors.POWDER,
        reactions: {
            "steam": { elem1: "pyrocumulus", chance: 0.08, "y": [0, 12], "setting": "clouds" },
            "rain_cloud": { elem1: "pyrocumulus", chance: 0.08, "y": [0, 12], "setting": "clouds" },
            "cloud": { elem1: "pyrocumulus", chance: 0.08, "y": [0, 12], "setting": "clouds" },
            "snow_cloud": { elem1: "pyrocumulus", chance: 0.08, "y": [0, 12], "setting": "clouds" },
            "hail_cloud": { elem1: "pyrocumulus", chance: 0.08, "y": [0, 12], "setting": "clouds" },
            "thunder_cloud": { elem1: "pyrocumulus", chance: 0.08, "y": [0, 12], "setting": "clouds" },
            "acid_cloud": { elem1: "pyrocumulus", chance: 0.05, "y": [0, 12], "setting": "clouds" },
            "pyrocumulus": { elem1: "pyrocumulus", chance: 0.08, "y": [0, 12], "setting": "clouds" },
            "stench": { elem2: null, chance: 0.1 }
        },
        category: "powders",
        state: "solid",
        density: 700,
        tempHigh: 2000,
        forceAutoGen: true,
        stateHigh: ["molten_ash", "smoke", "smoke", "smoke"]
    },
    "molten_ash": {
        tempHigh: 3550,
        stateHigh: "smoke"
    },
    "light": {
        color: "#fffdcf",
        tick: function (pixel) {
            if (Math.random() < 0.02) {
                deletePixel(pixel.x, pixel.y);
                return;
            }
            if (pixel.vx === undefined) {
                // choose 1, 0, or -1
                pixel.vx = Math.random() < 0.5 ? 1 : Math.random() < 0.5 ? 0 : -1;
                pixel.vy = Math.random() < 0.5 ? 1 : Math.random() < 0.5 ? 0 : -1;
                // if both are 0, make one of them 1 or -1
                if (pixel.vx === 0 && pixel.vy === 0) {
                    if (Math.random() < 0.5) { pixel.vx = Math.random() < 0.5 ? 1 : -1; }
                    else { pixel.vy = Math.random() < 0.5 ? 1 : -1; }
                }
            }
            // move and invert direction if hit
            if (pixel.vx && !tryMove(pixel, pixel.x + pixel.vx, pixel.y)) {
                var newX = pixel.x + pixel.vx;
                if (!isEmpty(newX, pixel.y, true)) {
                    var newPixel = pixelMap[pixel.x + pixel.vx][pixel.y];
                    if (!elements[newPixel.element].insulate) {
                        newPixel.temp += 1;
                        pixelTempCheck(newPixel);
                    }
                    if (!elements.light.reactions[newPixel.element]) {
                        pixel.color = newPixel.color;
                    }
                }
                pixel.vx = -pixel.vx;
            }
            if (pixel.vy && !tryMove(pixel, pixel.x, pixel.y + pixel.vy)) {
                var newY = pixel.y + pixel.vy;
                if (!isEmpty(pixel.x, newY, true)) {
                    var newPixel = pixelMap[pixel.x][pixel.y + pixel.vy];
                    if (!elements[newPixel.element].insulate) {
                        newPixel.temp += 1;
                        pixelTempCheck(newPixel);
                    }
                    if (!elements.light.reactions[newPixel.element]) {
                        pixel.color = newPixel.color;
                    }
                }
                pixel.vy = -pixel.vy;
            }
        },
        reactions: {
            "glass": { "color1": ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"] },
            "rad_glass": { "color1": ["#9f6060", "#9f8260", "#9f9f60", "#609f60", "#609f9f", "#60609f", "#9f609f"] },
            "steam": { "color1": ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"] },
            "rain_cloud": { "color1": ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"] },
            "cloud": { "color1": ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"] },
            "smog": { "color1": ["#9f6060", "#9f8260", "#9f9f60", "#609f60", "#609f9f", "#60609f", "#9f609f"] },
            "ice": { "color1": "#c2fff9" },
            "rime": { "color1": "#c2fff9" },
            "water": { "color1": "#a1bac9" },
            "salt_water": { "color1": "#a1bac9" },
            "sugar_water": { "color1": "#a1bac9" },
            "dirty_water": { "color1": "#a1c9a8" },
            "seltzer": { "color1": "#c2fff9" },
            "diamond": { "color1": ["#c2c5ff", "#c2d9ff"] },
            "ozone": { "color1": "#7b9ae0" },
            "plant": { "color1": "#00ff00" },
            "algae": { "color1": "#00ff00" },
            "rainbow": { "color1": ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"] },
            "static": { "color1": ["#ffffff", "#bdbdbd", "#808080", "#424242", "#1c1c1c"] }
        },
        temp: 35,
        tempLow: -273,
        stateLow: ["liquid_light", null],
        category: "energy",
        state: "gas",
        density: 0.00001,
        ignoreAir: true,
        insulate: true
    },
    "liquid_light": {
        color: "#bdbc9d",
        //behavior: behaviors.SUPERFLUID,
        tick: function (pixel) {
            if (Math.random() < 0.002) {
                deletePixel(pixel.x, pixel.y);
                return;
            }
            if (pixel.charge && elements[pixel.element].behaviorOn) {
                pixelTick(pixel)
            }
            if (Math.random() < 0.33) { tryMove(pixel, pixel.x, pixel.y + 1) }
            if (!isEmpty(pixel.x, pixel.y + 1)) {
                // go either left or right depending on pixel.flipX
                var newx = pixel.flipX ? pixel.x - 1 : pixel.x + 1;
                if (Math.random() < 0.5) {
                    if (!tryMove(pixel, newx, pixel.y)) {
                        if (!outOfBounds(newx, pixel.y) && !elements.liquid_light.reactions[pixelMap[newx][pixel.y].element]) {
                            pixel.color = pixelMap[newx][pixel.y].color;
                        }
                        pixel.flipX = !pixel.flipX;
                        if (!tryMove(pixel, newx, pixel.y + 1) && !outOfBounds(newx, pixel.y + 1) && !elements.liquid_light.reactions[pixelMap[newx][pixel.y + 1].element]) {
                            pixel.color = pixelMap[newx][pixel.y + 1].color;
                        }
                    }
                }
                else {
                    if (!tryMove(pixel, newx, pixel.y + 1)) {
                        if (!outOfBounds(newx, pixel.y + 1) && !elements.liquid_light.reactions[pixelMap[newx][pixel.y + 1].element]) {
                            pixel.color = pixelMap[newx][pixel.y + 1].color;
                        }
                        if (!tryMove(pixel, newx, pixel.y)) {
                            pixel.flipX = !pixel.flipX;
                            if (!outOfBounds(newx, pixel.y) && !elements.liquid_light.reactions[pixelMap[newx][pixel.y].element]) {
                                pixel.color = pixelMap[newx][pixel.y].color;
                            }
                        }
                    }
                }
            }
            doDefaults(pixel);
        },
        reactions: {
            "glass": { "color1": ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"] },
            "rad_glass": { "color1": ["#9f6060", "#9f8260", "#9f9f60", "#609f60", "#609f9f", "#60609f", "#9f609f"] },
            "steam": { "color1": ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"] },
            "rain_cloud": { "color1": ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"] },
            "cloud": { "color1": ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"] },
            "smog": { "color1": ["#9f6060", "#9f8260", "#9f9f60", "#609f60", "#609f9f", "#60609f", "#9f609f"] },
        },
        temp: -273,
        tempHigh: -272,
        stateHigh: "light",
        category: "energy",
        state: "gas",
        density: 0.00002,
        ignoreAir: true,
        viscosity: 0,
        insulate: true,
        hidden: true
    },
    "laser": {
        color: "#ff0000",
        behavior: [
            "XX|XX|XX",
            "XX|DL%0.25|XX",
            "XX|XX|XX",
        ],
        tick: behaviors.BOUNCY,
        temp: 35,
        tempLow: -273,
        stateLow: ["liquid_light", null],
        category: "energy",
        state: "gas",
        density: 0.00001,
        ignoreAir: true
    },
    "ball": {
        color: "#e35693",
        behavior: [
            "XX|XX|XX",
            "XX|FY:0%5|XX",
            "XX|M1 AND BO|XX",
        ],
        tempHigh: 250,
        stateHigh: "molten_plastic",
        category: "energy",
        flipY: false,
        flippableY: true,
        hidden: true
    },
    "pointer": {
        color: "#ff0000",
        tick: function (pixel) {
            if (pixelTicks - pixel.start > 1) {
                deletePixel(pixel.x, pixel.y)
            }
        },
        category: "special",
        customColor: true,
        hidden: true
    },
    "charcoal": {
        color: "#2b2b2b",
        behavior: behaviors.POWDER,
        reactions: {
            "broth": { elem2: "water", chance: 0.02 },
            "tea": { elem2: "water", chance: 0.02 },
        },
        burn: 25,
        burnTime: 1000,
        burnInto: "carbon_dioxide",
        category: "powders",
        state: "solid",
        density: 208,
        breakInto: ["ash", "ash", "carbon_dioxide"],
        hardness: 0.5,
        conduct: 0.001
    },
    "tinder": {
        color: ["#917256", "#87684f", "#735f4a", "#5d4c3e", "#4b3a2e"],
        behavior: behaviors.STURDYPOWDER,
        category: "powders",
        tempHigh: 400,
        stateHigh: "fire",
        burn: 50,
        burnTime: 100,
        state: "solid",
        density: 23
    },
    "sawdust": {
        color: ["#dec150", "#c7b15a"],
        behavior: behaviors.POWDER,
        reactions: {
            "water": { elem1: "cellulose", elem2: null },
            "dirty_water": { elem1: "cellulose", elem2: null },
            "salt_water": { elem1: "cellulose", elem2: null },
            "sugar_water": { elem1: "cellulose", elem2: null },
            "sap": { elem1: "particleboard", elem2: null },
            "honey": { elem1: "particleboard", elem2: null },
            "glue": { elem1: "particleboard", elem2: null }
        },
        tempHigh: 400,
        stateHigh: "fire",
        category: "powders",
        burn: 25,
        burnTime: 150,
        burnInto: ["ash", "fire", "fire", "fire"],
        state: "solid",
        density: 393
    },
    "salt": {
        color: ["#f2f2f2", "#e0e0e0"],
        behavior: behaviors.POWDER,
        reactions: {
            "ice": { elem1: null, elem2: "salt_water", chance: 0.1 },
            "rime": { elem1: null, elem2: "salt_water", chance: 0.075 },
            "snow": { elem1: null, elem2: "salt_water", chance: 0.25 },
            "packed_snow": { elem1: null, elem2: "salt_water", chance: 0.05 },
            "packed_ice": { elem1: null, elem2: "salt_water", chance: 0.01 }
        },
        category: "powders",
        tempHigh: 801,
        state: "solid",
        density: 2160,
        fireColor: "#F1E906",
        alias: "sodium chloride"
    },
    "hail": {
        color: "#c5e9f0",
        tick: function (pixel) {
            for (var i = 0; i < 3; i++) {
                if (!tryMove(pixel, pixel.x, pixel.y + 1)) {
                    if (!isEmpty(pixel.x, pixel.y + 1, true)) {
                        var newPixel = pixelMap[pixel.x][pixel.y + 1];
                        if (newPixel.element === "hail") { break; }
                        if (elements[newPixel.element].state == "solid") {
                            if (Math.random() > (elements[newPixel.element].hardness || 0)) {
                                if (elements[newPixel.element].breakInto) {
                                    var breakInto = elements[newPixel.element].breakInto;
                                    // if it is an array, pick a random element
                                    if (Array.isArray(breakInto)) {
                                        breakInto = breakInto[Math.floor(Math.random() * breakInto.length)];
                                    }
                                    if (breakInto === null) {
                                        deletePixel(newPixel.x, newPixel.y);
                                    }
                                    else {
                                        changePixel(newPixel, breakInto);
                                    }
                                }
                                else {
                                    deletePixel(newPixel.x, newPixel.y);
                                }
                            }
                        }
                    }
                    deletePixel(pixel.x, pixel.y);
                    break;
                }
            }
        },
        temp: -200,
        tempHigh: 10,
        stateHigh: "water",
        category: "powders",
        state: "solid",
        density: 850,
        hidden: true
    },
    "hydrogen": {
        color: "#558bcf",
        behavior: behaviors.GAS,
        reactions: {
            "oxygen": { elem1: null, elem2: "steam", tempMin: 500 },
            "hydrogen": { elem1: null, elem2: "helium", tempMin: 10000 },
            "nitrogen": { elem1: null, elem2: "oxygen", tempMin: 10000 },
            "sulphur": { elem1: null, elem2: "chlorine", tempMin: 10000 },
            "neon": { elem1: null, elem2: "sodium", tempMin: 10000 }
        },
        category: "gases",
        burn: 100,
        burnTime: 2,
        tempLow: -253,
        stateLow: "liquid_hydrogen",
        state: "gas",
        density: 0.08375
    },
    "oxygen": {
        color: "#99c7ff",
        behavior: behaviors.GAS,
        reactions: {
            "copper": { elem1: null, elem2: "oxidized_copper", chance: 0.05 },
            "iron": { elem1: null, elem2: "rust", chance: 0.025 },
            "water": { elem1: "foam" },
            "salt_water": { elem1: "foam" },
            "sugar_water": { elem1: "foam" },
            "seltzer": { elem1: "foam" },
            "soda": { elem1: "foam" },
            "dirty_water": { elem1: "foam" },
            "oxygen": { elem1: null, elem2: "ozone", chance: 0.3, "y": [0, 12], "setting": "clouds" },
            "ozone": { elem1: "ozone", chance: 0.4, "y": [0, 12], "setting": "clouds" }
        },
        category: "gases",
        // burn: 100,
        // burnTime: 2,
        tempLow: -183.94,
        stateLow: "liquid_oxygen",
        state: "gas",
        density: 1.292
    },
    "nitrogen": {
        color: "#b8d1d4",
        behavior: behaviors.GAS,
        reactions: {
            "oxygen": { elem1: null, elem2: "anesthesia" },
            "hydrogen": { elem1: null, elem2: "ammonia" },
            "neon": { elem1: null, elem2: "chlorine", tempMin: 10000 }
        },
        category: "gases",
        tempLow: -195.8,
        stateLow: "liquid_nitrogen",
        state: "gas",
        density: 1.165
    },
    "helium": {
        color: "#a69494",
        behavior: behaviors.GAS,
        category: "gases",
        tempLow: -272.20,
        stateLow: "liquid_helium",
        state: "gas",
        density: 0.1786
    },
    "anesthesia": {
        color: "#d3e1e3",
        behavior: behaviors.GAS,
        category: "gases",
        tempLow: -88.48,
        stateLow: ["nitrogen", "oxygen"],
        hidden: true,
        state: "gas",
        density: 1.9781,
        alias: ["nitrous oxide", "anaesthesia", "anesthetic"]
    },
    "ammonia": {
        color: "#bab6a9",
        behavior: behaviors.GAS,
        reactions: {
            "methane": { elem1: null, elem2: "cyanide_gas", chance: 0.25 },
            "plant": { elem1: "plant", chance: 0.05 },
            "evergreen": { elem1: "evergreen", chance: 0.05 },
            "cactus": { elem1: "cactus", chance: 0.05 },
            "wheat_seed": { elem1: "wheat", chance: 0.05 },
            "grass": { elem1: "grass", chance: 0.05 },
            "grass_seed": { elem1: "grass", chance: 0.05 },
            "bamboo_plant": { elem1: "bamboo", chance: 0.05 },
            "flower_seed": { elem1: "flower_seed", chance: 0.05 },
            "petal": { elem1: "flower_seed", chance: 0.05 },
            "vine": { elem1: "vine", chance: 0.05 },
            "sapling": { elem1: "tree_branch", chance: 0.05 },
            "tree_branch": { elem1: "tree_branch", chance: 0.05 },
            "corn_seed": { elem1: "corn", chance: 0.05 },
            "root": { elem1: "root", chance: 0.05 },
            "dirt": { elem1: "grass", chance: 0.05 },
            "mud": { elem1: "grass", chance: 0.05 },
            "potato_seed": { elem1: "potato", chance: 0.05 },
            "yeast": { elem1: "yeast", chance: 0.05 },
            "fish": { elem2: "meat", chance: 0.05 },
            "bird": { elem2: "meat", chance: 0.05 },
            "frog": { elem2: "meat", chance: 0.05 },
            "rat": { elem2: "rotten_meat", chance: 0.05 },
        },
        tempLow: -33.34,
        category: "gases",
        state: "gas",
        density: 0.73
    },
    "liquid_ammonia": {
        tempLow: -260,
        stateLow: ["nitrogen_ice", "hydrogen_ice"]
    },
    "carbon_dioxide": {
        color: "#2f2f2f",
        behavior: behaviors.GAS,
        reactions: {
            "plant": { elem1: "oxygen" },
            "evergreen": { elem1: "oxygen" },
            "cactus": { elem1: "oxygen" },
            "bamboo": { elem1: "oxygen" },
            "bamboo_plant": { elem1: "oxygen" },
            "vine": { elem1: "oxygen" },
            "flower_seed": { elem1: "oxygen" },
            "grass_seed": { elem1: "oxygen" },
            "algae": { elem1: "oxygen" }
        },
        category: "gases",
        tempLow: -78.5,
        stateLow: "dry_ice",
        state: "gas",
        density: 1.977,
        alias: ["CO2", "CO₂"]
    },
    "oil": {
        color: "#470e00",
        behavior: behaviors.LIQUID,
        reactions: {
            "dirt": { elem1: null, elem2: "mud" },
            "sand": { elem1: null, elem2: "wet_sand" }
        },
        category: "liquids",
        tempHigh: 400,
        stateHigh: "fire",
        burn: 70,
        burnTime: 300,
        burnInto: ["carbon_dioxide", "fire"],
        viscosity: 250,
        state: "liquid",
        density: 825,
        stain: 0.05
    },
    "lamp_oil": {
        color: "#b3b38b",
        behavior: behaviors.LIQUID,
        reactions: {
            "glue": { elem2: null, chance: 0.05 }
        },
        category: "liquids",
        tempHigh: 2100,
        stateHigh: "fire",
        burn: 95,
        burnTime: 2000,
        burnInto: ["carbon_dioxide", "fire"],
        viscosity: 3,
        state: "liquid",
        density: 850,
        alias: "kerosene"
    },
    "propane": {
        color: "#cfcfcf",
        behavior: behaviors.GAS,
        category: "gases",
        tempHigh: 400,
        stateHigh: "fire",
        tempLow: -43,
        burn: 100,
        burnTime: 5,
        fireColor: ["#00ffff", "#00ffdd"],
        state: "gas",
        density: 2.0098,
        alias: "gas"
    },
    "methane": {
        color: "#9f9f9f",
        behavior: behaviors.GAS,
        category: "gases",
        tempHigh: 400,
        stateHigh: "fire",
        tempLow: -161.5,
        burn: 85,
        burnTime: 5,
        fireColor: ["#00ffff", "#00ffdd"],
        state: "gas",
        density: 0.554
    },
    "stained_glass": {
        color: ["#6b2e2e", "#6b4f2e", "#6b6b2e", "#2e6b2e", "#2e6b6b", "#2e2e6b", "#6b2e6b"],
        behavior: behaviors.WALL,
        tick: function (pixel) {
            if (pixel.start - 1 < pixelTicks) {
                pixel.color = "hsl(" + (pixel.colorstart || pixel.start) + ",40%,30%)";
                if (!pixel.colorstart) {
                    pixel.colorstart = pixel.start;
                }
            }
        },
        tempHigh: 1500,
        category: "solids",
        state: "solid",
        density: 2500,
        breakInto: "color_sand",
        noMix: true
    },
    "molten_stained_glass": {
        color: ["#c27070", "#c29c70", "#c2c270", "#70c270", "#70c2c2", "#7070c2", "#c270c2"],
        tick: function (pixel) {
            if (pixel.start - 1 < pixelTicks) {
                pixel.color = "hsl(" + (pixel.colorstart || pixel.start) + ",40%,60%)";
                if (!pixel.colorstart) {
                    pixel.colorstart = pixel.start;
                }
            }
        }
    },
    "art": {
        color: "#ffffff",
        behavior: behaviors.WALL,
        customColor: true,
        category: "special"
    },
    "rainbow": {
        color: ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"],
        tick: function (pixel) {
            var t = pixelTicks + pixel.x + pixel.y;
            var r = Math.floor(127 * (1 - Math.cos(t * Math.PI / 90)));
            var g = Math.floor(127 * (1 - Math.cos(t * Math.PI / 90 + 2 * Math.PI / 3)));
            var b = Math.floor(127 * (1 - Math.cos(t * Math.PI / 90 + 4 * Math.PI / 3)));
            pixel.color = "rgb(" + r + "," + g + "," + b + ")";
        },
        category: "special"
    },
    "static": {
        color: ["#ffffff", "#888888", "#000000"],
        behavior: [
            "XX|XX|XX",
            "XX|CC:ffffff,9c9c9c,454545|XX",
            "XX|XX|XX",
        ],
        category: "special"
    },
    "border": {
        color: "#00ffff",
        tick: function (pixel) {
            var t = pixelTicks / 2 + pixel.x + pixel.y;
            var r = Math.floor(127 * Math.sin(t / 1.5));
            pixel.color = "rgba(" + r + "," + r * 2 + "," + r * 2 + "," + r / 127 + ")";
        },
        category: "special",
        hardness: 1,
        insulate: true
    },
    "clay": {
        color: "#d4c59c",
        behavior: behaviors.SUPPORT,
        tempHigh: 135,
        stateHigh: "baked_clay",
        category: "land",
        state: "solid",
        density: 1760
    },
    "clay_soil": {
        color: ["#f49a6f", "#ab7160", "#b56c52"],
        behavior: [
            "XX|XX|XX",
            "XX|XX|XX",
            "M2%25|M1|M2%25",
        ],
        tempHigh: 140,
        stateHigh: "baked_clay",
        category: "land",
        state: "solid",
        density: 1600
    },
    "brick": {
        color: "#cb4141",
        colorPattern: textures.BRICK,
        colorKey: {
            "r": "#cb4141",
            "w": "#bababa"
        },
        behavior: behaviors.WALL,
        category: "solids",
        tempHigh: 1540,
        state: "solid",
        density: 1650,
        hardness: 0.33,
        breakInto: "brick_rubble"
    },
    "ruins": {
        color: "#5c5c5c",
        behavior: [
            "XX|SP|XX",
            "XX|XX|XX",
            "M2%1|M1|M2%1"
        ],
        tempHigh: 1500,
        stateHigh: "magma",
        category: "solids",
        state: "solid",
        density: 2400,
        hardness: 0.33,
        breakInto: "dust"
    },
    "porcelain": {
        color: "#e1e4dd",
        behavior: behaviors.WALL,
        category: "solids",
        state: "solid",
        density: 2403,
        hardness: 0.4,
        breakInto: "clay_shard",
        breakIntoColor: ["#e1e4dd", "#c7c7c7", "#b8b8b8"],
        noMix: true,
    },
    "sapling": {
        color: "#3e9c3e",
        tick: function (pixel) {
            if (isEmpty(pixel.x, pixel.y + 1)) {
                movePixel(pixel, pixel.x, pixel.y + 1);
            }
            else {
                if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                    if (!outOfBounds(pixel.x, pixel.y + 1)) {
                        var dirtPixel = pixelMap[pixel.x][pixel.y + 1];
                        if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                            changePixel(dirtPixel, "root");
                        }
                    }
                    if (isEmpty(pixel.x, pixel.y - 1)) {
                        movePixel(pixel, pixel.x, pixel.y - 1);
                        createPixel(Math.random() > 0.5 ? "wood" : "tree_branch", pixel.x, pixel.y + 1);
                    }
                }
                else if (pixel.age > 1000) {
                    changePixel(pixel, "wood");
                }
                pixel.age++;
            }
            doDefaults(pixel);
        },
        properties: {
            "age": 0
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
    },
    "pinecone": {
        color: ["#5c3e33", "#472f27", "#31211b"],
        tick: function (pixel) {
            if (!tryMove(pixel, pixel.x, pixel.y + 1) && pixelTicks - pixel.start > 50) {
                if (pixel.h === undefined) { // set to even number between 6 and 20
                    pixel.h = Math.floor(Math.random() * 7) * 2 + 6;
                }
                if (Math.random() < 0.02 && pixel.h > 0 && pixel.temp < 100) {
                    if (!outOfBounds(pixel.x, pixel.y + 1)) { // grow roots
                        var dirtPixel = pixelMap[pixel.x][pixel.y + 1];
                        if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                            changePixel(dirtPixel, "root");
                        }
                    }
                    if (isEmpty(pixel.x, pixel.y - 1)) {
                        movePixel(pixel, pixel.x, pixel.y - 1);
                        if (pixel.h % 2 && pixel.h < 12) {
                            createPixel("evergreen", pixel.x, pixel.y + 1);
                            pixelMap[pixel.x][pixel.y + 1].h = pixel.h;
                        }
                        else {
                            createPixel("wood", pixel.x, pixel.y + 1);
                        }
                        pixel.h--;
                    }
                }
                else if (pixel.h === 0) {
                    changePixel(pixel, "evergreen");
                }
            }
            doDefaults(pixel);
        },
        tempHigh: 100,
        stateHigh: "wood",
        burn: 65,
        burnTime: 15,
        category: "life",
        state: "solid",
        density: 1500,
        cooldown: defaultCooldown,
        seed: true
    },
    "evergreen": {
        color: "#006300",
        tick: function (pixel) {
            if (pixel.h > 0 && pixelTicks % (50 + pixel.h) === 0) {
                // extend to the left and right, giving the next evergreen h-1
                if (isEmpty(pixel.x - 1, pixel.y)) {
                    createPixel("evergreen", pixel.x - 1, pixel.y);
                    pixelMap[pixel.x - 1][pixel.y].h = pixel.h - 2;
                }
                if (isEmpty(pixel.x + 1, pixel.y)) {
                    createPixel("evergreen", pixel.x + 1, pixel.y);
                    pixelMap[pixel.x + 1][pixel.y].h = pixel.h - 2;
                }
            }
            doDefaults(pixel);
        },
        reactions: {
            "vinegar": { elem1: "dead_plant", elem2: null, chance: 0.035 },
            "baking_soda": { elem1: "dead_plant", elem2: null, chance: 0.01 },
            "bleach": { elem1: "dead_plant", elem2: null, chance: 0.05 },
            "alcohol": { elem1: "dead_plant", elem2: null, chance: 0.035 }
        },
        category: "life",
        tempHigh: 120,
        stateHigh: "dead_plant",
        burn: 45,
        burnTime: 75,
        burnInto: "dead_plant",
        state: "solid",
        density: 1050,
        seed: "pinecone",
        hidden: true
    },
    "cactus": {
        color: ["#78a33e", "#84b543", "#cce37b", "#84b543", "#78a33e"],
        tick: function (pixel) {
            if (!pixel.stage) {
                if (!tryMove(pixel, pixel.x, pixel.y + 1)) {
                    if (Math.random() < 0.02 && isEmpty(pixel.x, pixel.y - 1)) {
                        createPixel("cactus", pixel.x, pixel.y - 1);
                        pixelMap[pixel.x][pixel.y - 1].stage = 0;
                        pixel.stage = 1;
                    }
                    else if (Math.random() < 0.0025) {
                        pixel.stage = 2;
                        if (Math.random() < 0.25) {
                            pixel.color = pixelColorPick(pixel, "#E0007B")
                        }
                    }
                }
            }
            else if (pixel.stage === 1) { // create sides or stop
                if (Math.random() < 0.02) {
                    if (Math.random() < 0.15) { // create side
                        var nx = pixel.x + (Math.random() < 0.5 ? -1 : 1);
                        if (isEmpty(nx, pixel.y)) {
                            createPixel("cactus", nx, pixel.y);
                            pixelMap[nx][pixel.y].stage = 3;
                            pixel.stage = 2;
                        }
                    }
                    else {
                        pixel.stage = 2; // do nothing
                    }
                }
            }
            else if (pixel.stage === 3) { // just grow one to the side
                var nx = null;
                if (isEmpty(pixel.x + 1, pixel.y)) { nx = pixel.x + 1; }
                else if (isEmpty(pixel.x - 1, pixel.y)) { nx = pixel.x - 1; }
                if (nx) {
                    createPixel("cactus", nx, pixel.y);
                    pixelMap[nx][pixel.y].stage = 4;
                }
            }
            else if (pixel.stage === 4) { // grow a bit
                if (Math.random() < 0.02) {
                    if (Math.random() < 0.66) { // grow up
                        if (isEmpty(pixel.x, pixel.y - 1) && isEmpty(pixel.x, pixel.y - 2)) {
                            createPixel("cactus", pixel.x, pixel.y - 1);
                            pixelMap[pixel.x][pixel.y - 1].stage = 4;
                            pixel.stage = 2;
                        }
                    }
                    else {
                        pixel.stage = 2; // do nothing
                    }
                }
            }
            doDefaults(pixel);
        },
        reactions: {
            "water": { elem2: null, chance: 0.01 }
        },
        tempHigh: 250,
        stateHigh: ["dead_plant", "dead_plant", "dead_plant", "dead_plant", "dead_plant", "steam"],
        tempLow: -5,
        stateLow: "frozen_plant",
        breakInto: [null, null, null, "sap"],
        burn: 10,
        burnTime: 300,
        category: "life",
        state: "solid",
        density: 600,
        cooldown: defaultCooldown,
        seed: true
    },
    "seeds": {
        color: ["#359100", "#74b332", "#b9d461", "#dede7a"],
        tick: function (pixel) {
            // Choose randomly from eLists.SEEDS
            changePixel(pixel, eLists.SEEDS[Math.floor(Math.random() * eLists.SEEDS.length)]);
        },
        category: "life",
        cooldown: defaultCooldown,
        seed: true
    },
    "grass_seed": {
        color: ["#439809", "#258b08", "#118511", "#127b12", "#136d14"],
        behavior: [
            "XX|M2%0.05|XX",
            "XX|L2:grass|XX",
            "XX|M1|XX",
        ],
        tempHigh: 100,
        stateHigh: "dead_plant",
        tempLow: -2,
        stateLow: "frozen_plant",
        burn: 50,
        burnTime: 20,
        category: "life",
        state: "solid",
        density: 1400,
        hidden: true,
        cooldown: defaultCooldown,
        seed: true
    },
    "wheat_seed": {
        color: "#b6c981",
        behavior: [
            "XX|M2%0.25|XX",
            "XX|L2:wheat AND C2:wheat%30|XX",
            "XX|M1|XX",
        ],
        tempHigh: 400,
        stateHigh: "fire",
        burn: 50,
        burnTime: 20,
        category: "life",
        state: "solid",
        density: 769,
        hidden: true,
        cooldown: defaultCooldown,
        seed: true
    },
    "straw": {
        color: ["#e9d391", "#a3835e", "#b79a73"],
        behavior: behaviors.WALL,
        tempHigh: 400,
        stateHigh: "fire",
        burn: 30,
        burnTime: 200,
        burnInto: ["smoke", "smoke", "smoke", "smoke", "ash"],
        category: "solids",
        state: "solid",
        density: 67.5
    },
    "paper": {
        color: "#f0f0f0",
        behavior: behaviors.WALL,
        reactions: {
            "water": { elem1: "cellulose", elem2: null },
            "dirty_water": { elem1: "cellulose", elem2: null },
            "salt_water": { elem1: "cellulose", elem2: null },
            "sugar_water": { elem1: "cellulose", elem2: null },
            "seltzer": { elem1: "cellulose", elem2: null },
            "soda": { elem1: "cellulose", elem2: null },
            "blood": { elem1: "cellulose", elem2: null },
            "foam": { elem1: "cellulose", elem2: null },
            "bubble": { elem1: "cellulose", elem2: null },
            "oil": { elem1: "cellulose", elem2: null },
            "alcohol": { elem1: "cellulose", elem2: null },
            "vinegar": { elem1: "cellulose", elem2: null }
        },
        tempHigh: 248,
        stateHigh: ["fire", "fire", "fire", "fire", "fire", "ash"],
        burn: 70,
        burnTime: 300,
        burnInto: ["fire", "fire", "fire", "fire", "fire", "ash"],
        category: "solids",
        state: "solid",
        density: 1201
    },
    "pollen": {
        color: "#ffffc0",
        behavior: [
            "XX|XX|XX",
            "XX|XX|XX",
            "M2|M1|M2",
        ],
        tick: function (pixel) {
            if (Math.random() < 0.01) {
                changePixel(pixel, pixel.seed || "flower_seed");
            }
        },
        reactions: {
            "sugar_water": { elem1: null, elem2: "honey" },
            "water": { elem1: null },
            "salt_water": { elem1: null },
            "dirty_water": { elem1: null },
            "seltzer": { elem1: null },
            "pool_water": { elem1: null },
        },
        category: "life",
        tempHigh: 400,
        stateHigh: "ash",
        burn: 50,
        burnTime: 20,
        state: "solid",
        density: 1435
    },
    "flower_seed": {
        color: "#0e990e",
        behavior: [
            "XX|M2%1.5|XX",
            "XX|L2:plant AND C2:pistil%30|XX",
            "XX|M1|XX",
        ],
        tempHigh: 100,
        stateHigh: "dead_plant",
        tempLow: -2,
        stateLow: "frozen_plant",
        burn: 50,
        burnTime: 20,
        category: "life",
        state: "solid",
        density: 1400,
        cooldown: defaultCooldown,
        seed: true
    },
    "pistil": {
        color: ["#734e39", "#2f0603", "#d2ac3a", "#8a978f", "#593117"],
        tick: function (pixel) {
            if (!pixel.fColor) {
                // make it a hsl random hue, 100% saturation, 50% lightness
                pixel.fColor = "hsl(" + Math.floor(Math.random() * 360) + ",100%,50%)";
            }
            var coordsToCheck = [
                [pixel.x - 1, pixel.y],
                [pixel.x + 1, pixel.y],
                [pixel.x, pixel.y - 1],
                [pixel.x, pixel.y + 1],
            ]
            // check if each pixel is empty, if it is create a petal with the color fColor
            for (var i = 0; i < coordsToCheck.length; i++) {
                var coord = coordsToCheck[i];
                if (isEmpty(coord[0], coord[1])) {
                    createPixel("petal", coord[0], coord[1]);
                    pixelMap[coord[0]][coord[1]].color = pixel.fColor;
                }
            }
        },
        tempHigh: 100,
        stateHigh: "dead_plant",
        tempLow: -2,
        stateLow: "frozen_plant",
        burn: 50,
        burnTime: 20,
        category: "life",
        hidden: true,
        state: "solid",
        density: 1400,
        breakInto: "dead_plant",
        seed: "flower_seed"
    },
    "petal": {
        color: "#ff0000",
        behavior: [
            "XX|ST:pistil|XX",
            "ST:pistil|FX%0.25|ST:pistil",
            "M2%10|ST:pistil AND M1%10|M1%10",
        ],
        reactions: {
            "water": { elem2: "tea", tempMin: 80, "color2": "#9e4c00" },
            "salt_water": { elem2: "tea", tempMin: 80, "color2": "#9e4c00" },
            "sugar_water": { elem2: "tea", tempMin: 80, "color2": "#9e4c00" },
            "seltzer": { elem2: "tea", tempMin: 80, "color2": "#9e4c00" },
        },
        tempHigh: 100,
        stateHigh: "dead_plant",
        tempLow: -2,
        stateLow: "frozen_plant",
        burn: 50,
        burnTime: 20,
        category: "life",
        hidden: true,
        state: "solid",
        density: 1400,
        seed: "flower_seed"
    },
    "tree_branch": {
        color: "#a0522d",
        behavior: [
            "CR:plant,tree_branch%2|CR:plant,plant,plant,tree_branch%2|CR:plant,tree_branch%2",
            "XX|XX|XX",
            "XX|XX|XX",
        ],
        tempHigh: 100,
        stateHigh: "wood",
        tempLow: -30,
        stateLow: "wood",
        category: "life",
        burn: 40,
        burnTime: 50,
        burnInto: ["sap", "ember", "charcoal"],
        hidden: true,
        state: "solid",
        density: 1500,
        hardness: 0.15,
        breakInto: ["sap", "sawdust"],
        seed: "sapling"
    },
    "vine": {
        color: "#005900",
        // behavior: [
        //     "XX|SP|XX",
        //     "XX|XX|XX",
        //     "XX|CL%1 AND M1|XX",
        // ],
        tick: function (pixel) {
            if (isEmpty(pixel.x, pixel.y - 1)) {
                pixel.sp = 0; //not supported
            }
            else if (!outOfBounds(pixel.x, pixel.y - 1) && pixelMap[pixel.x][pixel.y - 1].element === "vine" && pixelMap[pixel.x][pixel.y - 1].sp === 0) {
                pixel.sp = 0;
            }
            else { pixel.sp = 1 } //supported
            if (pixel.sp === 0) { tryMove(pixel, pixel.x, pixel.y + 1); }
            else {
                if (pixel.fert && pixel.stage && Math.random() < 0.01 && isEmpty(pixel.x, pixel.y + 1)) {
                    clonePixel(pixel, pixel.x, pixel.y + 1);
                    pixelMap[pixel.x][pixel.y + 1].fert = true;
                    pixelMap[pixel.x][pixel.y + 1].stage = pixel.stage - 1;
                }
            }
            if (pixel.fert === undefined) { // able to grow down
                pixel.fert = Math.random() < 0.50;
            }
            if (pixel.stage === undefined) {
                pixel.stage = Math.floor(Math.random() * 20) + 10;
            }
            if (Math.random() < 0.03 && isEmpty(pixel.x - 1, pixel.y) && !isEmpty(pixel.x - 1, pixel.y - 1) && (outOfBounds(pixel.x - 1, pixel.y - 1) || pixelMap[pixel.x - 1][pixel.y - 1].element !== "vine")) {
                createPixel("vine", pixel.x - 1, pixel.y);
            }
            if (Math.random() < 0.03 && isEmpty(pixel.x + 1, pixel.y) && !isEmpty(pixel.x + 1, pixel.y - 1) && (outOfBounds(pixel.x + 1, pixel.y - 1) || pixelMap[pixel.x + 1][pixel.y - 1].element !== "vine")) {
                createPixel("vine", pixel.x + 1, pixel.y);
            }
            if (Math.random() < 0.03 && isEmpty(pixel.x, pixel.y - 1) && (
                (!isEmpty(pixel.x - 1, pixel.y - 1) && (outOfBounds(pixel.x - 1, pixel.y - 1) || pixelMap[pixel.x - 1][pixel.y - 1].element !== "vine")) ||
                (!isEmpty(pixel.x + 1, pixel.y - 1) && (outOfBounds(pixel.x + 1, pixel.y - 1) || pixelMap[pixel.x + 1][pixel.y - 1].element !== "vine")))
            ) {
                createPixel("vine", pixel.x, pixel.y - 1);
            }
            doDefaults(pixel);
        },
        tempHigh: 100,
        stateHigh: "dead_plant",
        tempLow: -2,
        stateLow: "frozen_plant",
        burn: 35,
        burnTime: 100,
        breakInto: "dead_plant",
        category: "life",
        state: "solid",
        density: 1050,
        seed: "vine",
        ignore: ["vine"]
    },
    "bamboo": {
        color: ["#7cc00c", "#77a012"],
        behavior: behaviors.WALL,
        tempHigh: 380,
        stateHigh: "fire",
        burn: 10,
        burnTime: 200,
        category: "life",
        state: "solid",
        density: 686,
        breakInto: "sawdust",
        seed: "bamboo_plant"
    },
    "bamboo_plant": {
        color: ["#fbc882", "#dfad64"],
        behavior: [
            "XX|M2%0.25|XX",
            "XX|L2:bamboo AND C2:bamboo%10|XX",
            "XX|M1|XX",
        ],
        tempHigh: 100,
        stateHigh: "dead_plant",
        tempLow: -2,
        stateLow: "bamboo",
        burn: 30,
        burnTime: 100,
        category: "life",
        state: "solid",
        density: 686,
        breakInto: "sawdust",
        cooldown: defaultCooldown,
        seed: true
    },
    "burner": {
        color: "#d6baa9",
        behavior: [
            "CR:propane|CR:propane|CR:propane",
            "XX|XX|XX",
            "XX|XX|XX",
        ],
        category: "machines",
        conduct: 0.73
    },
    "foam": {
        color: "#cad2e3",
        behavior: behaviors.FOAM,
        tick: function (pixel) {
            if (pixel.foam && isEmpty(pixel.x, pixel.y - 1)) {
                createPixel("foam", pixel.x, pixel.y - 1);
                pixel.foam--;
                pixelMap[pixel.x][pixel.y - 1].foam = pixel.foam;
                pixelMap[pixel.x][pixel.y - 1].temp = pixel.temp;
            }
        },
        category: "liquids",
        state: "gas",
        density: 40,
        stain: -0.1
    },
    "bubble": {
        color: "#afc7fa",
        behavior: behaviors.BUBBLE,
        category: "liquids",
        state: "gas",
        density: 1.294,
        stain: -0.1
    },
    "acid": {
        color: ["#b5cf91", "#a1ff5e", "#288f2a"],
        behavior: [
            "XX|DB%5|XX",
            "DB%5 AND M2|XX|DB%5 AND M2",
            "DB%5 AND M2|DB%10 AND M1|DB%5 AND M2",
        ],
        ignore: ["glass", "rad_glass", "glass_shard", "rad_shard", "stained_glass", "baked_clay", "acid_gas", "neutral_acid", "acid_cloud", "water", "salt_water", "sugar_water", "dirty_water", "copper", "gold", "porcelain", "plastic", "bead", "microplastic", "molten_plastic", "pool_water", "chlorine", "hydrogen"],
        reactions: {
            "ash": { elem1: "neutral_acid", elem2: null },
            "limestone": { elem1: "neutral_acid", elem2: null },
            "quicklime": { elem1: "neutral_acid", elem2: null },
            "slaked_lime": { elem1: "neutral_acid", elem2: null },
            "borax": { elem1: "neutral_acid", elem2: null },
            "ammonia": { elem1: "neutral_acid", elem2: null },
            "bleach": { elem1: "neutral_acid", elem2: null },
            "water": { elem1: null, elem2: "dirty_water" },
            "salt_water": { elem1: null, elem2: "water" },
            "sugar_water": { elem1: null, elem2: "water" },
            "charcoal": { elem1: null, elem2: "carbon_dioxide" },
            "rock": { elem1: null, elem2: "sand", chance: 0.05 }
        },
        category: "liquids",
        tempHigh: 110,
        stateHigh: "acid_gas",
        tempLow: -58.88,
        burn: 30,
        burnTime: 1,
        state: "liquid",
        density: 1049,
        stain: -0.1,
        alias: "hydrochloric acid"
    },
    "neutral_acid": {
        color: ["#c8d9b0", "#c1d9b0", "#b8dbb9"],
        behavior: behaviors.LIQUID,
        category: "liquids",
        state: "liquid",
        tempHigh: 110,
        stateHigh: "hydrogen",
        density: 1020,
        hidden: true
    },
    "acid_gas": {
        color: ["#85a758", "#3b7810", "#256626"],
        behavior: [
            "M1|DB%5 AND M1|M1",
            "DB%5 AND M1|XX|DB%5 AND M1",
            "DB%5 AND M1|DB%10 AND M1|DB%5 AND M1",
        ],
        ignore: ["glass", "rad_glass", "glass_shard", "rad_shard", "stained_glass", "baked_clay", "acid_gas", "neutral_acid", "acid_cloud", "water", "salt_water", "sugar_water", "dirty_water", "copper", "gold", "porcelain", "plastic", "bead", "microplastic", "molten_plastic", "pool_water", "chlorine", "hydrogen"],
        reactions: {
            "acid_gas": { elem1: null, elem2: "acid_cloud", chance: 0.3, "y": [0, 12], "setting": "clouds" },
            "rain_cloud": { elem1: null, elem2: "acid_cloud", chance: 0.4, "y": [0, 12], "setting": "clouds" },
            "cloud": { elem1: null, elem2: "acid_cloud", chance: 0.4, "y": [0, 12], "setting": "clouds" },
            "snow_cloud": { elem1: null, elem2: "acid_cloud", chance: 0.4, "y": [0, 12], "setting": "clouds" },
            "hail_cloud": { elem1: null, elem2: "acid_cloud", chance: 0.4, "y": [0, 12], "setting": "clouds" },
            "thunder_cloud": { elem1: null, elem2: "acid_cloud", chance: 0.4, "y": [0, 12], "setting": "clouds" },
            "pyrocumulus": { elem1: null, elem2: "acid_cloud", chance: 0.4, "y": [0, 12], "setting": "clouds" },
            "fire_cloud": { elem1: null, elem2: "acid_cloud", chance: 0.4, "y": [0, 12], "setting": "clouds" },
            "ash": { elem1: "hydrogen", elem2: null, chance: 0.05 },
            "limestone": { elem1: "hydrogen", elem2: null, chance: 0.05 },
            "quicklime": { elem1: "hydrogen", elem2: null, chance: 0.05 },
            "slaked_lime": { elem1: "hydrogen", elem2: null, chance: 0.05 },
            "borax": { elem1: "hydrogen", elem2: null, chance: 0.05 },
            "ammonia": { elem1: "hydrogen", elem2: null, chance: 0.05 },
            "bleach": { elem1: "hydrogen", elem2: null, chance: 0.05 }
        },
        category: "gases",
        temp: 120,
        tempHigh: 400,
        stateHigh: "fire",
        tempLow: 30,
        stateLow: "acid",
        burn: 30,
        burnTime: 1,
        state: "gas",
        density: 1.63
    },
    "glue": {
        color: "#f0f0f0",
        behavior: behaviors.STICKY,
        tempHigh: 475,
        stateHigh: ["cyanide_gas", "dioxin"],
        category: "liquids",
        state: "liquid",
        density: 1300,
        ignore: ["sawdust", "particleboard", "ice", "rime", "dry_ice", "oxygen_ice", "hydrogen_ice", "nitrogen_ice"]
    },
    "soda": {
        color: "#422016",
        behavior: [
            "XX|CR:foam%2|XX",
            "M2|XX|M2",
            "M2|M1|M2",
        ],
        tempHigh: 100,
        stateHigh: ["steam", "carbon_dioxide", "sugar"],
        tempLow: -1.11,
        stateLow: ["seltzer_ice", "sugar_ice"],
        category: "liquids",
        reactions: {
            "dirt": { elem1: null, elem2: "mud" },
            "sand": { elem1: null, elem2: "wet_sand" },
            "clay_soil": { elem1: null, elem2: "clay" },
            "rock": { elem2: "wet_sand", chance: 0.0004 },
            "water": { elem1: "sugar_water", elem2: "sugar_water" },
            "salt": { elem1: "foam", chance: 0.1 },
            "salt_water": { elem1: "foam", chance: 0.1 },
            "sugar": { elem2: "foam", chance: 0.001 },
            "candy": { elem2: "foam", chance: 0.01 },
            "caramel": { elem2: "foam", chance: 0.01 },
        },
        state: "liquid",
        density: 1030,
        isFood: true
    },
    "gray_goo": {
        color: "#c0c0c0",
        behavior: [
            "XX|CH:gray_goo%25|XX",
            "M2%5 AND CH:gray_goo%25|DL%5|M2%5 AND CH:gray_goo%25",
            "XX|CH:gray_goo%25 AND M1|XX",
        ],
        behaviorOn: [
            "XX|XX|XX",
            "XX|DL%5|XX",
            "M1|M2|M1",
        ],
        reactions: {
            "antibody": { elem1: "malware", elem2: null }
        },
        ignore: ["fire", "smoke", "malware", "flash", "light", "laser"],
        category: "special",
        state: "solid",
        density: 21450,
        excludeRandom: true,
        conduct: 0.25,
        darkText: true
    },
    "malware": {
        color: ["#8c4ac7", "#a13d6a"],
        behavior: [
            "CL%1|CL%1 AND SH|CL%1",
            "CL%1 AND SH|SH%5 AND DL%10|CL%1 AND SH",
            "M1%15 AND CL%1|M1%50 AND CL%2 AND SH|M1%15 AND CL%1",
        ],
        reactions: {
            "gray_goo": { elem2: "malware" },
            "fireball": { elem2: "rocket" },
            "wire": { elem2: null, chance: 0.01 },
            "cloner": { elem2: ["ecloner", "slow_cloner"], chance: 0.01 },
            "ecloner": { elem2: ["cloner", "slow_cloner"], chance: 0.01 },
            "slow_cloner": { elem2: ["cloner", "ecloner"], chance: 0.01 },
            "heater": { elem2: ["cooler", "superheater"], chance: 0.01 },
            "cooler": { elem2: ["heater", "freezer"], chance: 0.01 },
            "superheater": { elem2: ["heater", "freezer"], chance: 0.01 },
            "freezer": { elem2: ["cooler", "superheater"], chance: 0.01 },
            "led_r": { elem2: ["led_g", "led_b"], chance: 0.01 },
            "led_g": { elem2: ["led_r", "led_b"], chance: 0.01 },
            "led_b": { elem2: ["led_r", "led_g"], chance: 0.01 },
            "ewall": { elem2: "wall", chance: 0.01 },
        },
        category: "special",
        state: "solid",
        density: 2.1
    },
    "clone_powder": {
        color: "#f0f000",
        behavior: [
            "XX|CF|XX",
            "CF|XX|CF",
            "M2|CF AND M1|M2",
        ],
        ignore: ["cloner", "ecloner", "slow_cloner", "floating_cloner"],
        category: "machines",
        insulate: true,
        state: "solid",
        density: 2710,
        hardness: 1
    },
    "floating_cloner": {
        color: "#c7c787",
        behavior: [
            "XX|CF%3 AND M1%10|XX",
            "CF%3 AND M1%10|XX|CF%3 AND M1%10",
            "XX|CF%3 AND M1%10|XX",
        ],
        ignore: ["cloner", "ecloner", "slow_cloner", "clone_powder"],
        category: "machines",
        insulate: true,
        state: "solid",
        density: 1355,
        hardness: 1
    },
    "virus": {
        color: "#cc00ff",
        behavior: [
            "XX|CH:virus%25|XX",
            "CH:virus%25|XX|CH:virus%25",
            "XX|CH:virus%25 AND M1|XX",
        ],
        reactions: {
            "chlorine": { elem1: null },
            "liquid_chlorine": { elem1: null }
        },
        ignore: ["fire", "smoke", "soap", "plague", "cancer"],
        category: "special",
        state: "solid",
        density: 600,
        excludeRandom: true
    },
    "ice_nine": {
        color: ["#b0dcf7", "#bbe9fc", "#cefcfc"],
        behavior: [
            "XX|XX|XX",
            "XX|CH:ice%0.5|XX",
            "M2|M1|M2",
        ],
        reactions: {
            "water": { elem2: "ice_nine" },
            "salt_water": { elem2: "ice_nine" },
            "dirty_water": { elem2: "ice_nine" },
            "sugar_water": { elem2: "ice_nine" },
            "seltzer": { elem2: "ice_nine" },
            "pool_water": { elem2: "ice_nine" },
            "steam": { elem2: "ice_nine" },
            "rain_cloud": { elem2: "ice_nine" },
            "cloud": { elem2: "ice_nine" },
            "snow_cloud": { elem2: "ice_nine" },
            "hail_cloud": { elem2: "ice_nine" },
            "thunder_cloud": { elem2: "ice_nine" },
            "snow": { elem2: "ice_nine" },
            "smog": { elem2: "ice_nine" },
            "rad_steam": { elem2: "ice_nine" }
        },
        temp: -100,
        category: "special",
        state: "solid",
        density: 917,
        excludeRandom: true
    },
    "strange_matter": {
        color: ["#a4c730", "#b6ff57", "#74e846", "#2ba31d"],
        // behavior: [
        //     "M1%10|M1%10 AND SW%5|M1%10",
        //     "M1%10 AND CH:strange_matter|XX|M1%10 AND CH:strange_matter",
        //     "M1|M1 AND SW%5|M1"
        // ],
        tick: function (pixel) {
            if (Math.random() < 0.05 && !isEmpty(pixel.x, pixel.y + 1, true)) {
                swapPixels(pixel, pixelMap[pixel.x][pixel.y + 1]);
            }
            if (Math.random() < 0.05 && !isEmpty(pixel.x, pixel.y - 1, true)) {
                swapPixels(pixel, pixelMap[pixel.x][pixel.y - 1]);
            }
            if (!isEmpty(pixel.x - 1, pixel.y, true)) {
                if (elements.strange_matter.ignore.indexOf(pixelMap[pixel.x - 1][pixel.y].element) === -1) {
                    changePixel(pixelMap[pixel.x - 1][pixel.y], "strange_matter");
                }
            }
            if (!isEmpty(pixel.x + 1, pixel.y, true)) {
                if (elements.strange_matter.ignore.indexOf(pixelMap[pixel.x + 1][pixel.y].element) === -1) {
                    changePixel(pixelMap[pixel.x + 1][pixel.y], "strange_matter");
                }
            }
            var move1Spots = [
                [pixel.x, pixel.y + 1],
                [pixel.x + 1, pixel.y + 1],
                [pixel.x - 1, pixel.y + 1],
            ]
            if (Math.random() < 0.1) { move1Spots.push([pixel.x - 1, pixel.y]) }
            if (Math.random() < 0.1) { move1Spots.push([pixel.x + 1, pixel.y]) }
            if (Math.random() < 0.1) { move1Spots.push([pixel.x, pixel.y - 1]) }
            if (Math.random() < 0.1) { move1Spots.push([pixel.x - 1, pixel.y - 1]) }
            if (Math.random() < 0.1) { move1Spots.push([pixel.x + 1, pixel.y - 1]) }
            for (var i = 0; i < move1Spots.length; i++) {
                var coords = move1Spots[Math.floor(Math.random() * move1Spots.length)];
                if (tryMove(pixel, coords[0], coords[1])) { break; }
                else { move1Spots.splice(move1Spots.indexOf(coords), 1); }
            }
            doDefaults(pixel);
        },
        category: "special",
        state: "liquid",
        density: 2000,
        excludeRandom: true,
        ignore: ["fire", "smoke", "antimatter", "strange_matter", "wall", "ewall", "plasma"],
    },
    "permafrost": {
        color: ["#54443a", "#4f4235", "#453c30", "#524639"],
        behavior: behaviors.SUPPORT,
        temp: -50,
        tempHigh: 10,
        stateHigh: "mudstone",
        category: "land",
        state: "solid",
        density: 700
    },
    "melted_butter": {
        color: "#ffe240",
        behavior: behaviors.LIQUID,
        reactions: {
            "dirt": { elem1: null, elem2: "mud" },
            "sand": { elem1: null, elem2: "wet_sand" }
        },
        temp: 33,
        tempLow: 0,
        stateLow: "butter",
        tempHigh: 1000,
        stateHigh: ["smoke", "steam", "smoke", "steam", "smoke", "steam", "smoke", "steam", "calcium", "salt"],
        category: "liquids",
        viscosity: 42,
        hidden: true,
        state: "liquid",
        density: 911,
        isFood: true,
        stain: 0.05,
    },
    "melted_cheese": {
        color: "#fcdb53",
        behavior: behaviors.LIQUID,
        temp: 54,
        tempLow: 0,
        stateLow: "cheese",
        tempHigh: 1000,
        stateHigh: ["smoke", "steam", "alcohol_gas", "smoke", "steam", "alcohol_gas", "smoke", "steam", "alcohol_gas", "calcium", "salt"],
        category: "liquids",
        viscosity: 112,
        hidden: true,
        state: "liquid",
        density: 1153,
        isFood: true
    },
    "mushroom_spore": {
        color: ["#d1d1d1", "#d4cfa9", "#b4d4ae", "#b98aba", "#805236"],
        behavior: [
            "XX|M2%1.5|XX",
            "XX|L2:mushroom_stalk AND C2:mushroom_gill%20|XX",
            "XX|M1|XX",
        ],
        reactions: {
            "wood": { elem2: "dirt", chance: 0.04 },
            "tree_brake": { elem2: "dirt", chance: 0.04 },
            "plant": { elem2: "dirt", chance: 0.07 },
            "evergreen": { elem2: "dirt", chance: 0.07 },
            "root": { elem2: "dirt", chance: 0.07 },
            "grass": { elem2: "dirt", chance: 0.08 },
            "grass_seed": { elem2: "dirt", chance: 0.08 }
        },
        category: "life",
        tempHigh: 225,
        stateHigh: "fire",
        burn: 10,
        burnTime: 20,
        state: "solid",
        density: 123.6,
        cooldown: defaultCooldown,
        seed: true,
        darkText: true
    },
    "mushroom_stalk": {
        color: "#d1d1d1",
        behavior: [
            "XX|XX|XX",
            "XX|XX|XX",
            "XX|CH:dirt>hyphae%1 AND M1|XX",
        ],
        reactions: {
            "wood": { elem2: "dirt", chance: 0.04 },
            "tree_brake": { elem2: "dirt", chance: 0.04 },
            "plant": { elem2: "dirt", chance: 0.07 },
            "evergreen": { elem2: "dirt", chance: 0.07 },
            "root": { elem2: "dirt", chance: 0.07 },
            "grass": { elem2: "dirt", chance: 0.08 },
            "grass_seed": { elem2: "dirt", chance: 0.08 },
            "ash": { elem2: "dirt", chance: 0.04 },
            "water": { elem2: "broth", tempMin: 70, color2: ["#CC9978", "#CD8C6F", "#BE785E"] },
            "salt_water": { elem2: "broth", tempMin: 70, color2: ["#CC9978", "#CD8C6F", "#BE785E"] },
            "sugar_water": { elem2: "broth", tempMin: 70, color2: ["#CC9978", "#CD8C6F", "#BE785E"] },
            "seltzer": { elem2: "broth", tempMin: 70, color2: ["#CC9978", "#CD8C6F", "#BE785E"] },
        },
        category: "life",
        hidden: true,
        tempHigh: 225,
        stateHigh: "fire",
        burn: 10,
        burnTime: 65,
        state: "solid",
        density: 90.445,
        seed: "mushroom_spore",
        breakInto: [null, null, "mycelium"]
    },
    "mushroom_gill": {
        color: "#d4cfa9",
        tick: function (pixel) {
            if (!pixel.mColor) {
                // make it a hsl random hue, 100% saturation, 50% lightness
                pixel.mColor = "hsl(" + Math.floor(Math.random() * 200 + 180) % 360 + ",54%,52%)";
            }
            if (isEmpty(pixel.x, pixel.y - 1) && Math.random() < 0.1) {
                createPixel("mushroom_cap", pixel.x, pixel.y - 1);
                pixelMap[pixel.x][pixel.y - 1].color = pixel.mColor;
            }
            if (isEmpty(pixel.x - 1, pixel.y) && Math.random() < 0.02) {
                // create either mushroom_gill or mushroom_cap
                if (Math.random() < 0.5) {
                    createPixel("mushroom_gill", pixel.x - 1, pixel.y);
                    pixelMap[pixel.x - 1][pixel.y].mColor = pixel.mColor;
                } else {
                    createPixel("mushroom_cap", pixel.x - 1, pixel.y);
                    pixelMap[pixel.x - 1][pixel.y].color = pixel.mColor;
                }
            }
            if (isEmpty(pixel.x + 1, pixel.y) && Math.random() < 0.02) {
                if (Math.random() < 0.5) {
                    createPixel("mushroom_gill", pixel.x + 1, pixel.y);
                    pixelMap[pixel.x + 1][pixel.y].mColor = pixel.mColor;
                } else {
                    createPixel("mushroom_cap", pixel.x + 1, pixel.y);
                    pixelMap[pixel.x + 1][pixel.y].color = pixel.mColor;
                }
            }
        },
        reactions: {
            "water": { elem2: "broth", tempMin: 70, color2: ["#CC9978", "#CD8C6F", "#BE785E"] },
            "salt_water": { elem2: "broth", tempMin: 70, color2: ["#CC9978", "#CD8C6F", "#BE785E"] },
            "sugar_water": { elem2: "broth", tempMin: 70, color2: ["#CC9978", "#CD8C6F", "#BE785E"] },
            "seltzer": { elem2: "broth", tempMin: 70, color2: ["#CC9978", "#CD8C6F", "#BE785E"] },
        },
        category: "life",
        hidden: true,
        tempHigh: 225,
        stateHigh: "fire",
        burn: 10,
        burnTime: 65,
        burnInto: "mushroom_spore",
        state: "solid",
        density: 90.445,
        seed: "mushroom_spore",
        breakInto: [null, "mycelium", "mushroom_spore"]
    },
    "mushroom_cap": {
        color: ["#c74442", "#c74442", "#c74442", "#cfb4b4", "#c74442", "#c74442", "#c74442"],
        behavior: behaviors.WALL,
        reactions: {
            "water": { elem2: "broth", tempMin: 70, color2: ["#CC9978", "#CD8C6F", "#BE785E"] },
            "salt_water": { elem2: "broth", tempMin: 70, color2: ["#CC9978", "#CD8C6F", "#BE785E"] },
            "sugar_water": { elem2: "broth", tempMin: 70, color2: ["#CC9978", "#CD8C6F", "#BE785E"] },
            "seltzer": { elem2: "broth", tempMin: 70, color2: ["#CC9978", "#CD8C6F", "#BE785E"] },
        },
        category: "life",
        hidden: true,
        tempHigh: 225,
        stateHigh: "fire",
        burn: 10,
        burnTime: 65,
        burnInto: "mushroom_spore",
        state: "solid",
        density: 90.445,
        seed: "mushroom_spore",
        breakInto: [null, null, "mycelium"]
    },
    "hyphae": {
        color: "#c79789",
        behavior: [
            "CH:dirt>hyphae,hyphae,mycelium%0.5|CR:mushroom_spore%0.5|CH:dirt>hyphae,hyphae,mycelium%0.5",
            "CH:dirt>mycelium%0.5|XX|CH:dirt>mycelium%0.5",
            "CH:dirt>hyphae,hyphae,mycelium%0.5|XX|CH:dirt>hyphae,hyphae,mycelium%0.5",
        ],
        reactions: {
            "wood": { elem2: "dirt", chance: 0.04 },
            "tree_brake": { elem2: "dirt", chance: 0.04 },
            "plant": { elem2: "dirt", chance: 0.07 },
            "evergreen": { elem2: "dirt", chance: 0.07 },
            "root": { elem2: "dirt", chance: 0.07 },
            "grass": { elem2: "dirt", chance: 0.08 },
            "grass_seed": { elem2: "dirt", chance: 0.08 },
            "ash": { elem2: "dirt", chance: 0.04 },
            "water": { elem2: "broth", tempMin: 70, color2: ["#CC9978", "#CD8C6F", "#BE785E"] },
            "salt_water": { elem2: "broth", tempMin: 70, color2: ["#CC9978", "#CD8C6F", "#BE785E"] },
            "sugar_water": { elem2: "broth", tempMin: 70, color2: ["#CC9978", "#CD8C6F", "#BE785E"] },
            "seltzer": { elem2: "broth", tempMin: 70, color2: ["#CC9978", "#CD8C6F", "#BE785E"] },
        },
        category: "life",
        hidden: true,
        tempHigh: 225,
        stateHigh: "fire",
        burn: 30,
        burnTime: 20,
        state: "solid",
        density: 462,
        seed: "mushroom_spore",
        conduct: 0.1,
        breakInto: ["dirt", "dirt", "mycelium"]
    },
    "mycelium": {
        color: ["#734d5e", "#734d5e", "#734d5e", "#61404f", "#6b4b5a", "#755061", "#866372", "#987886", "#ab8e9a", "#bea4ad", "#d0b9c1", "#e3cfd5"],
        behavior: behaviors.POWDER,
        tempHigh: 225,
        stateHigh: "dirt",
        tempLow: -50,
        stateLow: "permafrost",
        burn: 20,
        burnTime: 40,
        burnInto: "dirt",
        category: "land",
        state: "solid",
        density: 462,
        seed: "mushroom_spore"
    },
    "lichen": {
        color: ["#b6d6c3", "#769482"],
        tick: function (pixel) {
            if (!tryMove(pixel, pixel.x, pixel.y + 1)) {
                var coords = [
                    [pixel.x + 1, pixel.y],
                    [pixel.x - 1, pixel.y],
                    [pixel.x + 1, pixel.y + 1],
                    [pixel.x - 1, pixel.y + 1],
                ];
                for (var i = 0; i < coords.length; i++) {
                    if (Math.random() < 0.005 && isEmpty(coords[i][0], coords[i][1])) {
                        if (!isEmpty(coords[i][0], coords[i][1] + 1) && (outOfBounds(coords[i][0], coords[i][1] + 1) || pixelMap[coords[i][0]][coords[i][1] + 1].element !== "lichen")) {
                            createPixel(pixel.element, coords[i][0], coords[i][1]);
                        }
                    }
                }
            }
            doDefaults(pixel);
        },
        reactions: {
            "carbon_dioxide": { elem2: "oxygen", chance: 0.05 },
            "rock": { elem2: "dirt", chance: 0.0025 },
            "vinegar": { elem1: null, chance: 0.01 }
        },
        tempHigh: 400,
        stateHigh: "fire",
        burn: 50,
        burnTime: 20,
        category: "life",
        state: "solid",
        density: 1.5
    },
    "antimatter": {
        color: "#a89ba8",
        behavior: [
            "M2|DB%50 AND M2 AND EX:8>fire,positron|M2",
            "M1|XX|M1",
            "M1|DB%50 AND M1 AND EX:8>fire,positron|M1",
        ],
        ignore: ["antimatter_bomb"],
        category: "special",
        state: "gas",
        density: 2.1,
        excludeRandom: true
    },
    "plastic": {
        color: "#c5dede",
        behavior: behaviors.WALL,
        tempHigh: 250,
        burn: 10,
        burnTime: 200,
        burnInto: ["dioxin", "smoke", "dioxin", "smoke", "stench"],
        category: "solids",
        state: "solid",
        density: 1052
    },
    "molten_plastic": {
        color: "#a4b3b3",
        behavior: behaviors.LIQUID,
        viscosity: 20
    },
    "cellulose": {
        color: "#c7d4c9",
        behavior: behaviors.LIQUID,
        tempHigh: 100,
        stateHigh: "paper",
        tempLow: 0,
        stateLow: "paper",
        burn: 1,
        burnTime: 300,
        burnInto: ["smoke", "smoke", "smoke", "steam"],
        category: "life",
        state: "solid",
        density: 65,
        viscosity: 2500,
        hidden: true
    },
    "wax": {
        color: "#fff3d6",
        behavior: behaviors.STURDYPOWDER,
        tempHigh: 57,
        stateHigh: "melted_wax",
        category: "powders",
        state: "solid",
        density: 900
    },
    "melted_wax": {
        color: "#d4c196",
        behavior: behaviors.LIQUID,
        temp: 67,
        tempLow: 57,
        stateLow: "wax",
        category: "liquids",
        viscosity: 112,
        hidden: true,
        state: "liquid",
        density: 900,
        viscosity: 1.355
    },
    "incense": {
        color: "#361f19",
        behavior: behaviors.STURDYPOWDER,
        tempHigh: 2320,
        stateHigh: ["fragrance", "smoke"],
        burn: 10,
        burnTime: 500,
        burnInto: ["fragrance", "smoke"],
        fireElement: ["fragrance", "smoke", "smoke"],
        breakInto: "sawdust",
        category: "powders",
        state: "solid",
        density: 686
    },
    "fuse": {
        color: "#825d38",
        behavior: behaviors.WALL,
        tempHigh: 500,
        stateHigh: "fire",
        burn: 100,
        burnTime: 1,
        fireElement: "smoke",
        burnInto: "pop",
        category: "solids",
        state: "solid",
        density: 1000
    },
    "dioxin": {
        color: "#b8b8b8",
        behavior: behaviors.GAS,
        reactions: {
            "cell": { elem2: "cancer", chance: 0.0015 },
            "blood": { elem2: "infection", chance: 0.01 },
            "antibody": { elem2: "blood", chance: 0.025 },
            "frog": { elem2: "meat", chance: 0.05 },
            "fish": { elem2: "meat", chance: 0.05 },
            "rat": { elem2: "rotten_meat", chance: 0.05 },
            "bird": { elem2: "rotten_meat", chance: 0.05 }
        },
        category: "gases",
        state: "gas",
        density: 1830
    },
    "insulation": {
        color: "#b8aea5",
        behavior: behaviors.WALL,
        category: "solids",
        insulate: true,
        state: "solid"
    },
    "sponge": {
        color: ["#bf9c00", "#ad8e05", "#876f05"],
        properties: {
            "damp": 0
        },
        tick: function (pixel) {
            var coordsToCheck = [
                [pixel.x - 1, pixel.y],
                [pixel.x + 1, pixel.y],
                [pixel.x, pixel.y - 1],
                [pixel.x, pixel.y + 1],
            ];
            for (var i = 0; i < coordsToCheck.length; i++) {
                var coord = coordsToCheck[i];
                if (!isEmpty(coord[0], coord[1], true)) {
                    var newPixel = pixelMap[coord[0]][coord[1]];
                    if (elements[newPixel.element].state === "liquid" && ((elements[newPixel.element].density || 0) < 2500)) {
                        deletePixel(coord[0], coord[1]);
                    }
                }
            }
            doBurning(pixel);
            doHeat(pixel);
        },
        reactions: {
            "soap": { elem2: "bubble" }
        },
        category: "solids",
        burn: 5,
        burnTime: 300,
        tempHigh: 500,
        stateHigh: "fire",
        state: "solid",
        density: 65
    },
    "iron": {
        color: ["#cbcdcd", "#bdbdbd"],
        behavior: behaviors.WALL,
        reactions: {
            "water": { elem1: "rust", chance: 0.0025 },
            "salt_water": { elem1: "rust", chance: 0.005 },
            "dirty_water": { elem1: "rust", chance: 0.04 },
            "sugar_water": { elem1: "rust", chance: 0.0035 },
            "seltzer": { elem1: "rust", chance: 0.006 },
            "salt": { elem1: "rust", chance: 0.004 }
        },
        tempHigh: 1538,
        category: "solids",
        density: 7860,
        conduct: 0.47,
        hardness: 0.4,
        darkText: true
    },
    "copper": {
        color: ["#a95232", "#be4322", "#c76035"],
        behavior: behaviors.WALL,
        reactions: {
            "water": { elem1: "oxidized_copper", chance: 0.0025 },
            "salt_water": { elem1: "oxidized_copper", chance: 0.005 },
            "dirty_water": { elem1: "oxidized_copper", chance: 0.04 },
            "sugar_water": { elem1: "oxidized_copper", chance: 0.0035 },
            "seltzer": { elem1: "oxidized_copper", chance: 0.006 }
        },
        category: "solids",
        tempHigh: 1085,
        density: 8960,
        conduct: 0.95,
        hardness: 0.3,
        fireColor: ["#07BA4F", "#00BC5B", "#00C2A9", "#11B7E7", "#C6F2EC"]
    },
    "gold": {
        color: ["#fff0b5", "#986a1a", "#f0bb62"],
        behavior: behaviors.WALL,
        tempHigh: 1064,
        category: "solids",
        density: 19300,
        conduct: 0.81,
        hardness: 0.25,
        breakInto: "gold_coin"
    },
    "nickel": {
        color: "#727472",
        behavior: behaviors.WALL,
        tempHigh: 1455,
        category: "solids",
        density: 8900,
        conduct: 0.51,
        hardness: 0.4
    },
    "zinc": {
        color: ["#8d8c8e", "#f6f6f1", "#c7c7c5", "#ccccca", "#6b6a6a", "#848382"],
        behavior: behaviors.WALL,
        tempHigh: 419.53,
        category: "solids",
        density: 7068,
        conduct: 0.53,
        hardness: 0.25,
        fireColor: ["#91B797", "#CAE4CA", "#F1F2F0"]
    },
    "silver": {
        color: "#cacaca",
        behavior: behaviors.WALL,
        tempHigh: 961.8,
        category: "solids",
        density: 10497,
        conduct: 0.99,
        hardness: 0.25
    },
    "tin": {
        color: ["#9e9d98", "#aeada4"],
        behavior: behaviors.WALL,
        tempHigh: 231.9,
        category: "solids",
        density: 7260,
        conduct: 0.45,
        hardness: 0.15
    },
    "lead": {
        color: "#6c6c6a",
        behavior: behaviors.WALL,
        tempHigh: 327.5,
        category: "solids",
        density: 11343,
        conduct: 0.41,
        hardness: 0.15,
        fireColor: ["#DBD1E9", "#D7E9F2", "#9AB0D1"]
    },
    "aluminum": {
        color: ["#d1c6be", "#b5c0ad", "#b9b8bc"],
        reactions: {
            "radiation": { elem2: "electric", temp1: 200 }
        },
        behavior: behaviors.WALL,
        tempHigh: 660.3,
        category: "solids",
        density: 2710,
        conduct: 0.73,
        hardness: 0.05
    },
    "tungsten": {
        color: ["#d4d3cd", "#c3c0b8", "#bcbaae", "#625950"],
        behavior: behaviors.WALL,
        tempHigh: 3422,
        category: "solids",
        density: 19300,
        conduct: 0.65,
        hardness: 0.75
    },
    "molten_tungsten": {
        color: ['#ffff67', '#ffd367', '#ff9e00', '#d1ff5c', '#5cffb0', '#0073ff', '#ca57ff', '#ffba57', '#ff8c00', '#c46f28', '#c45928', '#c44300']
    },
    "brass": {
        color: ["#cb9e5d", "#865e39"],
        behavior: behaviors.WALL,
        tempHigh: 927,
        category: "solids",
        density: 8550,
        conduct: 0.52,
        hardness: 0.275,
        hidden: true
    },
    "bronze": {
        color: "#cd7f32",
        behavior: behaviors.WALL,
        tempHigh: 913,
        category: "solids",
        density: 8150,
        conduct: 0.44,
        hardness: 0.225,
        hidden: true
    },
    "sterling": {
        color: ["#858478", "#eae8e2", "#bfbcb7"],
        behavior: behaviors.WALL,
        tempHigh: 802,
        category: "solids",
        density: 10375.25,
        conduct: 0.95,
        hardness: 0.275,
        hidden: true
    },
    "steel": {
        color: "#71797e",
        behavior: behaviors.WALL,
        tempHigh: 1455.5,
        category: "solids",
        density: 7850,
        conduct: 0.42,
        hardness: 0.8
    },
    "gallium": {
        color: ["#b3b3b3", "#cccccc", "#dbdbdb"],
        behavior: behaviors.WALL,
        tempHigh: 29.76,
        category: "solids",
        density: 5100,
        conduct: 0.05,
        hardness: 0.15
    },
    "molten_gallium": {
        color: ["#f7f7f7", "#d9d7d7"],
        behavior: behaviors.LIQUID,
        tempHigh: 2400,
        tempLow: 29.76,
        density: 6095,
        stateLow: "gallium",
        reactions: {
            "aluminum": { elem2: ["alga", null], chance: 0.01 },
            "molten_aluminum": { elem2: ["molten_alga", null], chance: 0.05 },
            "sodium": { elem1: "hydrogen", elem2: "salt", chance: 0.005 },
            "steel": { elem2: "iron", chance: 0.005 }
        }
    },
    "rose_gold": {
        color: ["#b76e79", "#a1334d", "#f06283"],
        behavior: behaviors.WALL,
        tempHigh: 897,
        category: "solids",
        density: 12900,
        conduct: 0.87,
        hardness: 0.275,
        hidden: true
    },
    "electrum": {
        color: ["#ffdd63", "#ad9532", "#bda853", "#bdb38e", "#fff5d1"],
        behavior: behaviors.WALL,
        tempHigh: 1063.9,
        category: "solids",
        density: 13750,
        conduct: 0.9,
        hardness: 0.25,
        hidden: true
    },
    "solder": {
        color: "#a1a19d",
        behavior: behaviors.WALL,
        tempHigh: 200,
        category: "solids",
        density: 8885,
        conduct: 0.43,
        hardness: 0.15,
        hidden: true
    },
    "molten_copper": {
        reactions: {
            "molten_zinc": { elem1: null, elem2: "molten_brass" },
            "molten_tin": { elem1: null, elem2: "molten_bronze" },
            "molten_silver": { elem1: null, elem2: "molten_sterling" },
            "molten_gold": { elem1: null, elem2: "molten_rose_gold" },
            "molten_sulfur": { elem1: null, elem2: "molten_copper_sulfate" },
            "sulfur_gas": { elem1: null, elem2: "molten_copper_sulfate" }
        }
    },
    "molten_gold": {
        reactions: {
            "molten_silver": { elem1: null, elem2: "molten_electrum" }
        }
    },
    "molten_iron": {
        reactions: {
            "charcoal": { elem1: "molten_steel", elem2: null },
            "diamond": { elem1: "molten_steel", elem2: null },
            "carbon_dioxide": { elem1: "molten_steel", elem2: null }
        }
    },
    "pyrite": {
        color: ["#e8e0cb", "#cdcaaf", "#726a53", "#8f835e", "#bfb9a0",],
        behavior: behaviors.WALL,
        tempHigh: 1182.5,
        category: "solids",
        density: 4900,
        state: "solid",
        conduct: 0.5,
        hardness: 0.6,
        hidden: true
    },
    "molten_tin": {
        reactions: {
            "molten_lead": { elem1: null, elem2: "molten_solder" }
        }
    },
    "juice": {
        color: "#f0bf3d",
        behavior: behaviors.LIQUID,
        reactions: {
            "dirt": { elem1: null, elem2: "mud" },
            "sand": { elem1: null, elem2: "wet_sand" },
            "clay_soil": { elem1: null, elem2: "clay" },
        },
        tempHigh: 160,
        stateHigh: ["steam", "sugar"],
        tempLow: -10,
        stateLowColorMultiplier: 1.1,
        category: "liquids",
        state: "liquid",
        density: 1054,
        stain: 0.05,
        isFood: true
    },
    "juice_ice": {
        stateHighColorMultiplier: 0.9,
    },
    "broth": {
        color: "#dbb169",
        behavior: behaviors.LIQUID,
        reactions: {
            "petal": { color1: ["#CC9978", "#CD8C6F", "#BE785E", "#CC9978", "#CD8C6F", "#BE785E", "#A9D475", "#5AF353", "#8E5FA5"], tempMin: 70, chance: 0.01 },
            "pistil": { color1: ["#CC9978", "#CD8C6F", "#BE785E", "#CC9978", "#CD8C6F", "#BE785E", "#A9D475", "#5AF353", "#8E5FA5"], tempMin: 70, chance: 0.01 },
            "potato": { color1: "#DFD0CB", tempMin: 70, chance: 0.05 },
            "rotten_meat": { color1: "#d7db69", tempMin: 70, chance: 0.05 },
            "melted_cheese": { color1: "#dbc469", tempMin: 70, chance: 0.05 },
            "beans": { color1: "#db9769", tempMin: 70, chance: 0.05 },
            "wheat": { color1: "#dbbd8a", tempMin: 70, chance: 0.05 },
            "algae": { color1: "#7dba57", tempMin: 70, chance: 0.05 },
            "mushroom_stalk": { color1: ["#CC9978", "#CD8C6F", "#BE785E"], tempMin: 70, chance: 0.05 },
            "mushroom_cap": { color1: ["#CC9978", "#CD8C6F", "#BE785E"], tempMin: 70, chance: 0.05 },
            "mushroom_gill": { color1: ["#CC9978", "#CD8C6F", "#BE785E"], tempMin: 70, chance: 0.05 },
            "hyphae": { color1: ["#CC9978", "#CD8C6F", "#BE785E"], tempMin: 70, chance: 0.05 },
        },
        tempHigh: 130,
        stateHigh: ["steam", "steam", "steam", "fragrance"],
        tempLow: 0,
        category: "food",
        state: "liquid",
        density: 1052,
        conduct: 0.03,
        stain: -0.01,
        hidden: true,
        isFood: true
    },
    "milk": {
        color: "#fafafa",
        behavior: behaviors.LIQUID,
        onMix: function (milk1, milk2) {
            if ((shiftDown && Math.random() < 0.01) || (elements[milk2.element].id === elements.milk.id && Math.random() < 0.00025)) {
                changePixel(milk1, "butter")
            }
        },
        reactions: {
            "melted_chocolate": { elem1: "chocolate_milk", elem2: null },
            "chocolate": { elem1: "chocolate_milk", elem2: "melted_chocolate", chance: 0.05 },
            "juice": { elem1: "fruit_milk", elem2: null, chance: 0.05 },
            "soda": { elem1: "pilk", elem2: null, chance: 0.1 },
            "yolk": { elem1: "eggnog", elem2: null, chance: 0.1 },
            "dirt": { elem1: null, elem2: "mud" },
            "sand": { elem1: null, elem2: "wet_sand" },
            "clay_soil": { elem1: null, elem2: "clay" },
            "radiation": { elem1: ["cheese", "rotten_cheese", "butter", "melted_cheese", "melted_butter", "cream"], chance: 0.4 },
            "caramel": { color1: "#C8B39A", elem2: null, chance: 0.05 }
        },
        tempLow: 0,
        stateLow: "ice_cream",
        stateLowColorMultiplier: [0.97, 0.93, 0.87],
        tempHigh: 93,
        stateHigh: "yogurt",
        viscosity: 1.5,
        category: "liquids",
        state: "liquid",
        density: 1036.86,
        isFood: true
    },
    "chocolate_milk": {
        color: "#664934",
        behavior: behaviors.LIQUID,
        reactions: {
            "dirt": { elem1: null, elem2: "mud" },
            "sand": { elem1: null, elem2: "wet_sand" },
            "radiation": { elem1: ["cheese", "rotten_cheese", "butter", "melted_cheese", "melted_butter", "cream"], chance: 0.4 },
        },
        tempLow: 0,
        stateLow: "ice_cream",
        stateLowColorMultiplier: [0.97, 0.93, 0.87],
        tempHigh: 200,
        stateHigh: "smoke",
        viscosity: 1.5,
        category: "liquids",
        state: "liquid",
        density: 1181,
        hidden: true,
        isFood: true
    },
    "fruit_milk": {
        color: "#c9988f",
        behavior: behaviors.LIQUID,
        reactions: {
            "dirt": { elem1: null, elem2: "mud" },
            "sand": { elem1: null, elem2: "wet_sand" },
            "radiation": { elem1: ["cheese", "rotten_cheese", "butter", "melted_cheese", "melted_butter", "cream"], chance: 0.4 },
        },
        tempLow: 0,
        stateLow: "ice_cream",
        stateLowColorMultiplier: [0.97, 0.93, 0.87],
        tempHigh: 200,
        stateHigh: "smoke",
        viscosity: 1.5,
        category: "liquids",
        state: "liquid",
        density: 1045,
        hidden: true,
        isFood: true
    },
    "pilk": {
        color: "#e9cba3",
        behavior: behaviors.LIQUID,
        reactions: {
            "dirt": { elem1: null, elem2: "mud" },
            "sand": { elem1: null, elem2: "wet_sand" },
            "radiation": { elem1: ["cheese", "rotten_cheese", "butter", "melted_cheese", "melted_butter", "cream"], chance: 0.4 },
        },
        tempLow: 0,
        stateLow: "ice_cream",
        stateLowColorMultiplier: [0.97, 0.93, 0.87],
        tempHigh: 200,
        stateHigh: ["smoke", "smoke", "sugar", "steam", "carbon_dioxide"],
        viscosity: 1.25,
        category: "liquids",
        state: "liquid",
        density: 1033,
        hidden: true,
        isFood: true
    },
    "eggnog": {
        color: "#ddbf98",
        behavior: behaviors.LIQUID,
        reactions: {
            "dirt": { elem1: null, elem2: "mud" },
            "sand": { elem1: null, elem2: "wet_sand" },
            "radiation": { elem1: ["cheese", "rotten_cheese", "butter", "melted_cheese", "melted_butter", "cream"], chance: 0.4 },
        },
        tempLow: 0,
        stateLow: "ice_cream",
        stateLowColorMultiplier: [0.97, 0.93, 0.87],
        tempHigh: 200,
        stateHigh: "smoke",
        viscosity: 1.5,
        category: "liquids",
        state: "liquid",
        density: 1033,
        hidden: true,
        isFood: true
    },
    "egg": {
        color: "#e0d3ab",
        tick: function (pixel) {
            if (pixel.start === pixelTicks) { return }
            if (!tryMove(pixel, pixel.x, pixel.y + 1)) {
                if (pixel.animal || pixel.fall < 20) {
                    if (Math.random() < 0.5) {
                        if (!tryMove(pixel, pixel.x + 1, pixel.y + 1)) {
                            tryMove(pixel, pixel.x - 1, pixel.y + 1);
                        }
                    } else {
                        if (!tryMove(pixel, pixel.x - 1, pixel.y + 1)) {
                            tryMove(pixel, pixel.x + 1, pixel.y + 1);
                        }
                    }
                    pixel.fall = 0;
                }
                else if (outOfBounds(pixel.x, pixel.y + 1) || (!isEmpty(pixel.x, pixel.y + 1, true) && elements.egg.ignore.indexOf(pixelMap[pixel.x][pixel.y + 1].element) === -1 && elements[pixelMap[pixel.x][pixel.y + 1].element].state === "solid")) {
                    changePixel(pixel, "yolk")
                }
                else { pixel.fall = 0 }
                if (pixel.animal && pixelTicks - pixel.start >= 500) {
                    changePixel(pixel, pixel.animal)
                }
            }
            else { pixel.fall++ }
            if (pixel.temp < -2) {
                pixel.animal = null;
            }
            doDefaults(pixel);
        },
        ignore: ["paper", "sponge", "straw", "wheat", "rat", "frog", "pollen", "clay", "snow", "mud", "wet_sand", "tinder", "feather", "bread", "ice_cream", "dough"],
        innerColor: "#ffffff",
        properties: { "fall": 0 },
        tempHigh: 1500,
        stateHigh: ["steam", "calcium", "carbon_dioxide", "sulfur_gas"],
        breakInto: "yolk",
        category: "food",
        state: "solid",
        density: 1031,
        cooldown: defaultCooldown
    },
    "yolk": {
        color: ["#ffbe33", "#ffcf33"],
        behavior: behaviors.LIQUID,
        reactions: {
            "dna": { elem1: "homunculus", elem2: null, chance: 0.05 }
        },
        tempHigh: 100,
        stateHigh: "hard_yolk",
        tempLow: 0,
        stateLow: "hard_yolk",
        category: "food",
        state: "liquid",
        density: 1027.5,
        viscosity: 270,
        isFood: true
    },
    "hard_yolk": {
        color: "#dead43",
        behavior: behaviors.STURDYPOWDER,
        tempHigh: 400,
        stateHigh: "smoke",
        category: "food",
        hidden: true,
        state: "solid",
        density: 1031
    },
    "dough": {
        color: "#bfac91",
        behavior: behaviors.STURDYPOWDER,
        onMix: function (dough, ingredient) {
            if (elements[ingredient.element].isFood && elements[ingredient.element].id !== elements.dough.id && elements[ingredient.element].id !== elements.flour.id && elements[ingredient.element].id !== elements.batter.id) {
                var rgb1 = dough.color.match(/\d+/g);
                var rgb2 = ingredient.color.match(/\d+/g);
                // average the colors
                var rgb = [
                    Math.round((parseInt(rgb1[0]) + parseInt(rgb2[0])) / 2),
                    Math.round((parseInt(rgb1[1]) + parseInt(rgb2[1])) / 2),
                    Math.round((parseInt(rgb1[2]) + parseInt(rgb2[2])) / 2)
                ];
                changePixel(ingredient, "dough")
                // convert rgb to hex
                var hex = RGBToHex(rgb);
                dough.color = pixelColorPick(dough, hex);
                // 50% change to delete ingredient
                if (Math.random() < 0.5) { deletePixel(ingredient.x, ingredient.y); }
                else {
                    ingredient.color = pixelColorPick(ingredient, hex);
                }
            }
        },
        category: "food",
        tempHigh: 94,
        stateHigh: "bread",
        //stateHighColorMultiplier: 0.9,
        burn: 40,
        burnTime: 25,
        burnInto: "ash",
        state: "solid",
        density: 526.9,
        isFood: true
    },
    "batter": {
        color: "#d4bc85",
        behavior: behaviors.LIQUID,
        onMix: function (batter, ingredient) {
            if (elements[ingredient.element].isFood && elements[ingredient.element].id !== elements.batter.id && elements[ingredient.element].id !== elements.flour.id && elements[ingredient.element].id !== elements.yolk.id && elements[ingredient.element].id !== elements.dough.id) {
                var rgb1 = batter.color.match(/\d+/g);
                var rgb2 = ingredient.color.match(/\d+/g);
                // average the colors
                var rgb = [
                    Math.round((parseInt(rgb1[0]) + parseInt(rgb2[0])) / 2),
                    Math.round((parseInt(rgb1[1]) + parseInt(rgb2[1])) / 2),
                    Math.round((parseInt(rgb1[2]) + parseInt(rgb2[2])) / 2)
                ];
                changePixel(ingredient, "batter")
                // convert rgb to hex
                var hex = RGBToHex(rgb);
                batter.color = pixelColorPick(batter, hex);
                // 50% change to delete ingredient
                if (Math.random() < 0.5) { deletePixel(ingredient.x, ingredient.y); }
                else {
                    ingredient.color = pixelColorPick(ingredient, hex);
                }
            }
        },
        category: "food",
        tempHigh: 94,
        stateHigh: "baked_batter",
        stateHighColorMultiplier: 0.9,
        burn: 40,
        burnTime: 25,
        burnInto: "ash",
        state: "liquid",
        viscosity: 10000,
        density: 1001,
        hidden: true,
        isFood: true
    },
    "homunculus": {
        color: ["#c4b270", "#9c916a", "#9e8955", "#a89a76"],
        behavior: [
            "XX|XX|XX",
            "M2%0.5|XX|M2%0.5",
            "XX|M1|XX",
        ],
        reactions: {
            "milk": { elem2: null, chance: 0.025 },
            "blood": { elem2: null, chance: 0.05 },
            "sugar": { elem2: null, chance: 0.025 },
            "meat": { elem2: null, chance: 0.001 },
            "cooked_meat": { elem2: null, chance: 0.0005 },
            "oxygen": { elem2: "carbon_dioxide" },
            "radiation": { elem1: "human", elem2: null }
        },
        tempHigh: 100,
        stateHigh: "meat",
        tempLow: 0,
        stateLow: "frozen_meat",
        category: "life",
        state: "solid",
        density: 1450,
        hidden: true,
        breakInto: ["blood", "slime"]
    },
    "butter": {
        color: "#ffe46b",
        behavior: behaviors.STURDYPOWDER,
        tempHigh: 33,
        stateHigh: "melted_butter",
        category: "food",
        state: "solid",
        density: 860,
        isFood: true
    },
    "cheese": {
        color: "#fcba03",
        behavior: behaviors.STURDYPOWDER,
        reactions: {
            "dirty_water": { elem1: "rotten_cheese", chance: 0.1 },
            "fly": { elem1: "rotten_cheese", chance: 0.2 },
            "dioxin": { elem1: "rotten_cheese", elem2: null, chance: 0.1 },
            "uranium": { elem1: "rotten_cheese", chance: 0.1 },
            "cancer": { elem1: "rotten_cheese", chance: 0.1 },
            "plague": { elem1: "rotten_cheese", elem2: null, chance: 0.3 },
            "ant": { elem1: "rotten_cheese", chance: 0.1 },
            "worm": { elem1: "rotten_cheese", chance: 0.1 },
            "rat": { elem1: "rotten_cheese", chance: 0.1 },
            "mushroom_spore": { elem1: "rotten_cheese", chance: 0.1 },
            "mushroom_stalk": { elem1: "rotten_cheese", chance: 0.1 },
            "mercury": { elem1: "rotten_cheese", elem2: null, chance: 0.2 },
            "mercury_gas": { elem1: "rotten_cheese", elem2: null, chance: 0.1 },
            "virus": { elem1: "rotten_cheese", chance: 0.1 },
            "poison": { elem1: "rotten_cheese", elem2: null, chance: 0.5 },
            "infection": { elem1: "rotten_cheese", elem2: null, chance: 0.1 },
            "ink": { elem1: "rotten_cheese", elem2: null, chance: 0.1 },
            "acid": { elem1: "rotten_cheese", elem2: null, chance: 0.5 },
            "acid_gas": { elem1: "rotten_cheese", chance: 0.4 },
            "cyanide": { elem1: "rotten_cheese", elem2: null, chance: 0.5 },
            "cyanide_gas": { elem1: "rotten_cheese", elem2: null, chance: 0.5 },
            "rotten_meat": { elem1: "rotten_cheese", chance: 0.02 },
        },
        tempHigh: 54,
        stateHigh: "melted_cheese",
        category: "food",
        state: "solid",
        density: 1153,
        isFood: true
    },
    "rotten_cheese": {
        color: ["#ffcc40", "#c1b338", "#839930"],
        behavior: [
            "XX|CR:plague,stench,stench,stench,fly%0.25 AND CH:cheese>rotten_cheese%1|XX",
            "CH:cheese>rotten_cheese%1|XX|CH:cheese>rotten_cheese%1",
            "XX|M1 AND CH:cheese>rotten_cheese%1|XX",
        ],
        tempHigh: 54,
        stateHigh: "melted_cheese",
        category: "food",
        state: "solid",
        density: 1150,
        isFood: true,
        hidden: true
    },
    "chocolate": {
        color: "#4d2818",
        behavior: behaviors.STURDYPOWDER,
        tempHigh: 31,
        stateHigh: "melted_chocolate",
        category: "food",
        state: "solid",
        density: 1325,
        isFood: true
    },
    "grape": {
        color: ["#b84b65", "#a10e69", "#a10e95", "#8a3eab"],
        behavior: [
            "XX|ST:vine|XX",
            "XX|XX|XX",
            "M2|M1|M2",
        ],
        reactions: {
            "radiation": { elem1: "explosion", chance: 0.1, "color1": "#291824" },
            "rock": { elem1: "juice", chance: 0.1, "color1": "#291824" },
            "concrete": { elem1: "juice", chance: 0.1, "color1": "#291824" },
            "basalt": { elem1: "juice", chance: 0.1, "color1": "#291824" },
            "acid": { elem1: "juice", "color1": "#291824" },
            "acid_gas": { elem1: "juice", "color1": "#291824" },
            "sugar_water": { elem1: null, elem2: "juice", "color2": "#291824" }
        },
        innerColor: "#cc7492",
        tempHigh: 256,
        stateHigh: ["steam", "sugar"],
        category: "food",
        state: "solid",
        density: 1154,
        breakInto: "juice",
        breakIntoColor: "#291824",
        ignoreAir: true,
        isFood: true
    },
    "vinegar": {
        color: "#ffecb3",
        behavior: behaviors.LIQUID,
        reactions: {
            "milk": { elem1: null, elem2: "cheese" },
            "pilk": { elem1: null, elem2: "cheese", "color2": "#c48a25" },
            "fruit_milk": { elem1: null, elem2: "cheese", "color2": "#c2864e" },
            "chocolate_milk": { elem1: null, elem2: "cheese", "color2": "#6b4000" },
            "eggnog": { elem1: null, elem2: "cheese", "color2": "#ffdb63" },
            "baking_soda": { elem1: "sodium_acetate", elem2: "carbon_dioxide", attr1: { "foam": 20 } },
            "rust": { elem2: "iron", chance: 0.05 },
            "oxidized_copper": { elem2: "copper", chance: 0.05 },
            "mushroom_spore": { elem2: null, chance: 0.05 },
            "mushroom_gill": { elem2: null, chance: 0.05 },
            "mushroom_cap": { elem2: null, chance: 0.05 },
            "pollen": { elem2: null, chance: 0.05 },
        },
        viscosity: 12,
        tempHigh: 100.6,
        stateHigh: "steam",
        category: "liquids",
        state: "liquid",
        density: 1006,
        stain: -0.8,
        isFood: true
    },
    "herb": {
        color: ["#2e5a09", "#3c6a16", "#507b28", "#759d3c"],
        reactions: {
            "water": { elem2: "tea", tempMin: 80 },
            "salt_water": { elem2: "tea", tempMin: 80 },
            "sugar_water": { elem2: "tea", tempMin: 80 },
            "seltzer": { elem2: "tea", tempMin: 80 },
            "stench": { elem2: null, chance: 0.25 },
            "steam": { elem2: "fragrance", chance: 0.1 },
            "flea": { elem2: null, chance: 0.01 },
            "termite": { elem2: null, chance: 0.01 },
            "fly": { elem2: null, chance: 0.01 },
            "ant": { elem2: null, chance: 0.01 },
            "stink_bug": { elem2: null, chance: 0.01 },
        },
        behavior: behaviors.POWDER,
        tempHigh: 300,
        stateHigh: ["fire", "smoke", "smoke", "smoke", "ash"],
        tempLow: -2,
        stateLow: "frozen_plant",
        burn: 10,
        burnTime: 300,
        burnInto: ["fire", "smoke", "smoke", "smoke", "smoke", "smoke", "smoke", "fragrance"],
        category: "food",
        state: "solid",
        density: 1400
    },
    "lettuce": {
        color: ["#a2c96b", "#81C520", "#639917"],
        behavior: behaviors.POWDER,
        tempHigh: 300,
        stateHigh: ["fire", "smoke", "smoke", "steam", "ash"],
        burn: 5,
        burnTime: 500,
        burnInto: ["fire", "smoke", "smoke", "steam", "ash"],
        category: "food",
        state: "solid",
        density: 1400
    },
    "corn": {
        color: ["#f8d223", "#d6ba2a", "#f7f5ba", "#dbd281", "#cdb12d"],
        tick: function (pixel) {
            if (pixel.temp >= 180) {
                changePixel(pixel, "popcorn");
                if (isEmpty(pixel.x, pixel.y - 1)) {
                    movePixel(pixel, pixel.x, pixel.y - 1);
                    if (isEmpty(pixel.x - 1, pixel.y)) { createPixel("pop", pixel.x - 1, pixel.y) }
                    if (isEmpty(pixel.x + 1, pixel.y)) { createPixel("pop", pixel.x + 1, pixel.y) }
                    if (isEmpty(pixel.x, pixel.y - 1)) { createPixel("pop", pixel.x, pixel.y - 1) }
                    if (isEmpty(pixel.x, pixel.y + 1)) { createPixel("pop", pixel.x, pixel.y + 1) }
                }
            }
            doDefaults(pixel)
        },
        category: "food",
        burn: 10,
        burnTime: 200,
        state: "solid",
        density: 721,
        seed: "corn_seed",
        isFood: true
    },
    "popcorn": {
        color: ["#a6a076", "#ebe4ab", "#ebe4ab", "#ebe4ab", "#ebe4ab", "#ebe4ab", "#ebe4ab", "#c99947"],
        behavior: behaviors.POWDER,
        category: "food",
        tempHigh: 500,
        stateHigh: "ash",
        burn: 20,
        burnTime: 200,
        burnInto: ["fire", "ash"],
        state: "solid",
        density: 360.5,
        hidden: true,
        isFood: true
    },
    "corn_seed": {
        color: ["#f2b813", "#f9e3ba"],
        behavior: [
            "XX|M2%0.25|XX",
            "XX|L2:plant,corn AND C2:corn%30|XX",
            "XX|M1|XX",
        ],
        tempHigh: 400,
        stateHigh: "fire",
        burn: 50,
        burnTime: 20,
        category: "life",
        state: "solid",
        density: 721,
        hidden: true,
        cooldown: defaultCooldown,
        seed: true
    },
    "potato": {
        color: ["#d99857", "#d98757", "#a66933"],
        behavior: [
            "XX|SH:wire%1|XX",
            "SH:wire%1|XX|SH:wire%1",
            "M2|M1 AND SH:wire%1|M2",
        ],
        innerColor: "#e3c688",
        breakInto: "juice",
        breakIntoColor: "#C7C255",
        tempHigh: 176,
        stateHigh: "baked_potato",
        burn: 10,
        burnTime: 300,
        burnInto: "ash",
        category: "food",
        state: "solid",
        density: 675,
        seed: "potato_seed",
        isFood: true
    },
    "baked_potato": {
        color: ["#F5B72F", "#E89F0C", "#9f7501"],
        behavior: behaviors.STURDYPOWDER,
        breakInto: ["juice", null],
        breakIntoColor: "#C7C255",
        tempHigh: 400,
        stateHigh: "ash",
        burn: 20,
        burnTime: 300,
        burnInto: "ash",
        category: "food",
        state: "solid",
        density: 675,
        isFood: true,
        hidden: true
    },
    "potato_seed": {
        color: ["#cda57f", "#aa7437", "#bc9563"],
        behavior: [
            "XX|CH:dirt>fiber|XX",
            "CH:dirt>potato%5|CH:potato%1|CH:dirt>potato%5",
            "XX|SW:dirt%3 AND M1|XX",
        ],
        tempHigh: 400,
        stateHigh: "fire",
        burn: 50,
        burnTime: 20,
        category: "life",
        state: "solid",
        density: 675,
        hidden: true,
        cooldown: defaultCooldown,
        seed: true
    },
    "root": {
        color: "#80715b",
        behavior: [
            "XX|XX|XX",
            "XX|XX|XX",
            "CH:dirt,mud,sand,wet_sand,clay_soil,mycelium>root,fiber%0.5|CH:dirt,mud,sand,wet_sand,clay_soil,mycelium>root,fiber,fiber%0.5|CH:dirt,mud,sand,wet_sand,clay_soil,mycelium>root,fiber%0.5",
        ],
        reactions: {
            "rock": { elem2: "sand", chance: 0.0004 },
            "mud": { elem2: "dirt", chance: 0.005 },
            "wet_sand": { elem2: "sand", chance: 0.005 },
            "water": { elem2: null, chance: 0.005 },
            "sugar_water": { elem2: null, chance: 0.008 }
        },
        tempHigh: 275,
        stateHigh: "dirt",
        tempLow: -50,
        stateLow: "fiber",
        burn: 20,
        burnTime: 60,
        burnInto: "dirt",
        breakInto: "sawdust",
        category: "life",
        state: "solid",
        density: 1250,
        conduct: 0.1
    },
    "fiber": {
        color: ["#6b563e", "#5c553e", "#42342d"],
        behavior: behaviors.POWDER,
        tempHigh: 275,
        stateHigh: "dirt",
        tempLow: -50,
        stateLow: "permafrost",
        burn: 20,
        burnTime: 60,
        burnInto: "dirt",
        category: "life",
        hidden: true,
        breakInto: "tinder",
        state: "solid",
        density: 462
    },
    "yeast": {
        color: ["#ad9166", "#9a7f4e", "#d8bb8d"],
        behavior: [
            "XX|CL:70%10|XX",
            "CL:70%10 AND SW:bread%30|XX|CL:70%10 AND SW:bread%30",
            "XX|M1|XX",
        ],
        reactions: {
            "bread": { elem1: "bread" },
            "sugar": { elem2: "alcohol", chance: 0.005 },
            "potato": { elem2: "alcohol", chance: 0.005, "color2": "#fec400" },
            "grape": { elem2: "alcohol", chance: 0.01, "color2": "#916851" },
            "juice": { elem2: "alcohol", chance: 0.015, "color2": "#916851" },
            "sugar": { elem2: "alcohol", chance: 0.005, "color2": "#80724d" },
            "corn": { elem2: "alcohol", chance: 0.005, "color2": "#b8b6a2" },
            "honey": { elem2: "alcohol", chance: 0.005, "color2": "#dccb72" },
            "molasses": { elem2: "alcohol", chance: 0.005, "color2": "#803924" },
            "herb": { elem2: "tea", chance: 0.005 },
            "oxygen": { elem2: "carbon_dioxide", chance: 0.05 },
            "algae": { elem1: "lichen", elem2: "lichen", chance: 0.02 },
            "bleach": { elem1: null, elem2: "foam", attr2: { "foam": 40 }, chance: 0.02, temp2: 75 },
        },
        tempHigh: 110,
        stateHigh: "bread",
        burn: 50,
        burnTime: 20,
        burnInto: ["smoke", "smoke", "smoke", "ash"],
        category: "food",
        state: "solid",
        density: 1180,
        isFood: true
    },
    "bread": {
        color: "#debd8c",
        behavior: behaviors.STURDYPOWDER,
        reactions: {
            "honey": { elem1: "gingerbread", elem2: null },
            "molasses": { elem1: "gingerbread", elem2: null },
            "sap": { elem1: "gingerbread", elem2: null },
            "caramel": { elem1: "gingerbread", elem2: null },
        },
        tempHigh: 176,
        stateHigh: "toast",
        category: "food",
        burn: 30,
        burnTime: 200,
        burnInto: ["smoke", "smoke", "smoke", "ash"],
        state: "solid",
        density: 233.96,
        isFood: true
    },
    "toast": {
        color: "#c08655",
        behavior: behaviors.STURDYPOWDER,
        tempHigh: 550,
        stateHigh: "ash",
        category: "food",
        burn: 50,
        burnTime: 170,
        burnInto: ["smoke", "smoke", "smoke", "ash"],
        state: "solid",
        density: 233.96,
        isFood: true
    },
    "gingerbread": {
        color: ["#a66530", "#bf773d", "#cc7d41"],
        behavior: behaviors.SUPPORT,
        tempHigh: 875,
        stateHigh: "ash",
        category: "food",
        burn: 30,
        burnTime: 200,
        burnInto: ["smoke", "smoke", "smoke", "ash"],
        state: "solid",
        density: 233.96,
        isFood: true
    },
    "baked_batter": {
        color: "#fcdf7e",
        behavior: behaviors.STURDYPOWDER,
        tempHigh: 550,
        stateHigh: "ash",
        category: "food",
        burn: 10,
        burnTime: 400,
        burnInto: ["smoke", "smoke", "smoke", "ash"],
        state: "solid",
        density: 233.96,
        hidden: true,
        isFood: true
    },
    "wheat": {
        color: ["#f1b569", "#edb864", "#de9c45", "#c2853d"],
        behavior: behaviors.WALL,
        reactions: {
            "rock": { elem1: "flour", elem2: "rock" },
            "water": { elem2: "tea", tempMin: 80, "color2": "#9e4c00" },
            "salt_water": { elem2: "tea", tempMin: 80, "color2": "#9e4c00" },
            "sugar_water": { elem2: "tea", tempMin: 80, "color2": "#9e4c00" },
            "seltzer": { elem2: "tea", tempMin: 80, "color2": "#9e4c00" },
        },
        tempHigh: 100,
        stateHigh: "dead_plant",
        tempLow: -2,
        stateLow: "frozen_plant",
        burn: 25,
        burnTime: 200,
        category: "food",
        breakInto: "flour",
        state: "solid",
        density: 769,
        seed: "wheat_seed",
        isFood: true
    },
    "candy": {
        color: "#e6cab1",
        behavior: behaviors.WALL,
        tempHigh: 186,
        stateHigh: "caramel",
        category: "food",
        state: "solid",
        density: 900,
        isFood: true
    },
    "baking_soda": {
        color: "#ededed",
        behavior: behaviors.POWDER,
        reactions: {
            "juice": { elem1: "water", elem2: ["carbon_dioxide", "foam"] },
            "glue": { elem1: "slime", elem2: "slime", chance: 0.1 },
        },
        category: "food",
        state: "solid",
        density: 2200,
        tempHigh: 3000,
        isFood: true
    },
    "yogurt": {
        color: "#f0efe6",
        behavior: [
            "XX|XX|XX",
            "XX|XX|XX",
            "M2%5|M1|M2%5",
        ],
        tempHigh: 1000,
        stateHigh: ["smoke", "smoke", "smoke", "calcium"],
        tempLow: 0,
        stateLowName: "frozen_yogurt",
        category: "food",
        state: "liquid",
        density: 820.33,
        isFood: true
    },
    "frozen_yogurt": {
        behavior: behaviors.STURDYPOWDER,
        category: "food",
        isFood: true
    },
    "ice_cream": {
        color: ["#f7f7f7", "#ededed", "#dedede"],
        behavior: behaviors.STURDYPOWDER,
        temp: 0,
        tempHigh: 15,
        stateHigh: "cream",
        stateHighColorMultiplier: 1.03,
        category: "food",
        state: "solid",
        density: 1096,
        isFood: true
    },
    "cream": {
        color: "#f7f7f7",
        behavior: behaviors.LIQUID,
        onMix: function (milk1, milk2) {
            if ((shiftDown && Math.random() < 0.01) || (elements[milk2.element].id === elements.milk.id && Math.random() < 0.00025)) {
                changePixel(milk1, "butter")
            }
        },
        reactions: {
            "dirt": { elem1: null, elem2: "mud" },
            "sand": { elem1: null, elem2: "wet_sand" },
            "clay_soil": { elem1: null, elem2: "clay" },
            "melted_chocolate": { color1: "#664934", elem2: null },
            "chocolate": { color1: "#664934", elem2: "melted_chocolate", chance: 0.05 },
            "juice": { color1: "#c9988f", elem2: null, chance: 0.05 },
            "soda": { color1: "#e9cba3", elem2: null, chance: 0.1 },
            "yolk": { color1: "#ddbf98", elem2: null, chance: 0.1 },
            "caramel": { color1: "#C8B39A", elem2: null, chance: 0.05 }
        },
        viscosity: 1.5,
        tempHigh: 1000,
        stateHigh: ["smoke", "smoke", "smoke", "steam", "steam", "calcium"],
        tempLow: 0,
        stateLow: "ice_cream",
        stateLowColorMultiplier: 0.97,
        category: "liquids",
        hidden: true,
        isFood: true,
        state: "liquid",
        density: 959.97,
    },
    "beans": {
        //color: ["#f33d02","#f04703","#fd9d24","#ffbf61"],
        //color: ["#b81901","#b61a00","#e97501","#f9922b"],
        color: ["#db1c0b", "#db3c0b", "#fa8023", "#ffa12e"],
        behavior: behaviors.LIQUID,
        category: "food",
        tempHigh: 350,
        stateHigh: ["fire", "fire", "ash"],
        state: "liquid",
        density: 721,
        viscosity: 1000,
        isFood: true
    },
    "dry_ice": {
        color: "#e6e6e6",
        behavior: behaviors.WALL,
        category: "solids",
        temp: -98.5,
        tempHigh: -78.5,
        stateHigh: "carbon_dioxide",
        state: "solid",
        density: 1562
    },
    "nitrogen_ice": {
        color: "#e6e6e6",
        behavior: behaviors.WALL,
        category: "solids",
        temp: -259.86,
        tempHigh: -209.86,
        stateHigh: "liquid_nitrogen",
        state: "solid",
        density: 1562,
        hidden: true
    },
    "particleboard": {
        color: ["#cca77c", "#ad8b63", "#b59d81", "#c7a073", "#c9b297"],
        behavior: behaviors.WALL,
        tempHigh: 500,
        stateHigh: ["ash", "fire", "fire", "fire"],
        category: "solids",
        burn: 2,
        burnTime: 400,
        burnInto: ["ash", "fire"],
        state: "solid",
        hardness: 0.2,
        breakInto: "sawdust",
        hidden: true
    },
    "alcohol": {
        color: "#c9c5b1",
        behavior: behaviors.LIQUID,
        reactions: {
            "virus": { elem2: null },
            "plague": { elem2: null }
        },
        tempHigh: 78.37,
        tempLow: -113.88,
        burn: 100,
        burnTime: 3,
        fireColor: ["#80acf0", "#96cdfe", "#bee6d4"],
        category: "liquids",
        state: "liquid",
        density: 785.1,
        stain: -0.25,
        isFood: true
    },
    "basalt": {
        color: ["#2e2e2e", "#333333", "#3d3d3d"],
        behavior: behaviors.STURDYPOWDER,
        reactions: {
            "fly": { elem2: "dead_bug", chance: 0.25, oneway: true },
            "firefly": { elem2: "dead_bug", chance: 0.2, oneway: true },
            "stink_bug": { elem2: "dead_bug", chance: 0.15, oneway: true },
            "bee": { elem2: "dead_bug", chance: 0.1, oneway: true },
            "bird": { elem2: "feather", chance: 0.025, oneway: true },
            "bone": { elem2: "oil", tempMin: 300, chance: 0.005, oneway: true },
            "dead_plant": { elem2: "charcoal", tempMin: 200, chance: 0.005, oneway: true },
            "charcoal": { elem2: "diamond", tempMin: 800, chance: 0.005, oneway: true },
        },
        tempHigh: 1262.5,
        stateHigh: "magma",
        category: "land",
        state: "solid",
        density: 3000,
        hardness: 0.65,
        breakInto: "gravel"
    },
    "soap": {
        color: "#f2f2f2",
        behavior: [
            "XX|CR:bubble%0.25|XX",
            "M2|XX|M2",
            "M2|M1|M2",
        ],
        reactions: {
            "rust": { elem2: "iron" },
            "oxidized_copper": { elem2: "copper" },
            "blood": { elem1: null, elem2: "water" },
            "dirty_water": { elem2: "water" },
            "salt_water": { elem2: "water" },
            "oxygen": { elem2: "bubble" },
            "plague": { elem2: null },
            "virus": { elem2: null },
            "infection": { elem2: null },
            "mushroom_spore": { elem2: null },
            "lichen": { elem2: null },
            "rotten_meat": { elem2: "meat" },
            "rotten_cheese": { elem2: "cheese" },
            "acid_gas": { elem2: "hydrogen" },
            "carbon_dioxide": { elem2: "oxygen" },
            "acid": { elem2: "hydrogen" },
            "acid_cloud": { elem2: "rain_cloud" },
            "oil": { elem2: null },
            "soda": { elem2: "sugar_water" },
            "ink": { elem2: null },
            "dye": { elem2: null },
            "stench": { elem2: null },
            "cancer": { elem2: null, chance: 0.01 },
            "rat": { elem2: null, chance: 0.01 },
            "ant": { elem2: "dead_bug", chance: 0.1 },
            "bee": { elem2: "dead_bug", chance: 0.1 },
            "fly": { elem2: "dead_bug", chance: 0.1 },
            "firefly": { elem2: "dead_bug", chance: 0.1 },
            "worm": { elem2: "dead_bug", chance: 0.1 },
            "flea": { elem2: "dead_bug", chance: 0.1 },
            "termite": { elem2: "dead_bug", chance: 0.1 },
            "stink_bug": { elem2: "dead_bug", chance: 0.1 },
            "smog": { elem2: "cloud" },
            "water": { elem1: ["foam", "bubble"], chance: 0.005 },
            "salt_water": { elem1: ["foam", "bubble"], chance: 0.005 },
            "sugar_water": { elem1: ["foam", "bubble"], chance: 0.005 },
            "seltzer": { elem1: ["foam", "bubble"], chance: 0.005 },
            "pool_water": { elem1: ["foam", "bubble"], chance: 0.005 },
        },
        tempHigh: 100,
        stateHigh: "bubble",
        viscosity: 500,
        state: "liquid",
        category: "liquids",
        density: 1055,
        stain: -1
    },
    "bleach": {
        color: "#ffffff",
        behavior: behaviors.LIQUID,
        reactions: {
            "acid": { elem1: "chlorine", elem2: null },
            "acid_gas": { elem1: "chlorine", elem2: null },
            "acid_cloud": { elem1: "chlorine", elem2: null },
            "water": { elem1: null, elem2: "dirty_water" },
            "plague": { elem2: null },
            "cell": { elem2: null, chance: 0.05 },
            "tadpole": { elem2: null, chance: 0.05 },
            "cancer": { elem2: null, chance: 0.01 },
            "fish": { elem2: "rotten_meat", chance: 0.01 },
            "oil": { elem1: null, elem2: "chlorine", chance: 0.01 },
            "lamp_oil": { elem1: null, elem2: "chlorine", chance: 0.01 },
            "blood": { elem2: null },
            "vinegar": { elem1: "poison_gas", elem2: null },
            "ammonia": { elem1: "poison_gas", elem2: null }, // Mustard Gas
            "alcohol": { elem1: "poison_gas", elem2: null }, // Chloroform
            "soap": { elem1: "poison_gas", elem2: null, chance: 0.1 },
            "iron": { elem1: null, elem2: "rust", chance: 0.1 },
            "copper": { elem1: null, elem2: "oxidized_copper", chance: 0.1 },
            "pollen": { elem2: null, chance: 0.1 },
            "antidote": { elem2: null, chance: 0.1 },
        },
        tempHigh: 111,
        stateHigh: ["salt", "steam"],
        viscosity: 0.956,
        state: "liquid",
        category: "liquids",
        density: 1210,
        stain: 0.1
    },
    "chlorine": {
        color: "#a5ac50",
        behavior: behaviors.GAS,
        reactions: {
            "water": { elem1: "pool_water", elem2: null },
            "hydrogen": { elem1: "acid_gas", elem2: null },//hydrochloric acid
            "dirty_water": { elem2: "water" },
            "ammonia": { elem1: "poison_gas", elem2: null },
            "liquid_ammonia": { elem1: "poison_gas", elem2: null },
        },
        tempLow: -36.04,
        stateLow: "liquid_chlorine",
        state: "gas",
        category: "gases",
        density: 3.2,
        stain: 0.005
    },
    "liquid_chlorine": {
        color: "#f4d217",
        behavior: behaviors.LIQUID,
        reactions: {
            "water": { elem1: "acid", elem2: null },
            "steam": { elem2: "acid_gas", elem1: null },
            "ammonia": { elem1: "poison", elem2: null },
            "liquid_ammonia": { elem1: "poison", elem2: null },
        },
        temp: -36.04,
        tempHigh: -34.04,
        stateHigh: "chlorine",
        tempLow: -101.5,
        state: "liquid",
        category: "liquids",
        density: 1562.5,
        stain: 0.01,
        hidden: true
    },
    "dye": {
        color: ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"],
        behavior: behaviors.LIQUID,
        reactions: {
            "water": { elem1: null, chance: 0.05 },
            "salt_water": { elem1: null, chance: 0.05 },
            "sugar_water": { elem1: null, chance: 0.05 },
            "seltzer": { elem1: null, chance: 0.05 },
            "dirty_water": { elem1: null, chance: 0.05 }
        },
        customColor: true,
        stain: 0.66,
        tempHigh: 100,
        stateHigh: "smoke",
        category: "liquids",
        state: "liquid",
        density: 998,
        stainSelf: true
    },
    "ink": {
        color: "#171717",
        behavior: behaviors.LIQUID,
        stain: 0.66,
        tempHigh: 100,
        stateHigh: "smoke",
        tempLow: 0,
        stateLowName: "frozen_ink",
        category: "liquids",
        state: "liquid",
        density: 1074.3
    },
    "mercury": {
        color: ["#53574b", "#65686a"],
        behavior: behaviors.LIQUID,
        reactions: {
            "gold": { elem1: null, elem2: "amalgam", chance: 0.01 },
            "zinc": { elem1: null, elem2: "amalgam", chance: 0.01 },
            "sodium": { elem1: null, elem2: "amalgam", chance: 0.01 },
            "aluminum": { elem1: null, elem2: "amalgam", chance: 0.01 },
            "tin": { elem1: null, elem2: "amalgam", chance: 0.01 },
            "lead": { elem1: null, elem2: "amalgam", chance: 0.01 },
            "silver": { elem1: null, elem2: "amalgam", chance: 0.01 },
            "copper": { elem1: null, elem2: "amalgam", chance: 0.01 },
            "gold_coin": { elem1: null, elem2: "amalgam", chance: 0.01 },
            "rose_gold": { elem1: null, elem2: "amalgam", chance: 0.01 },
            "water": { elem1: null, elem2: "dirty_water" },
            "salt_water": { elem1: null, elem2: "dirty_water" },
            "sugar_water": { elem1: null, elem2: "dirty_water" }
        },
        viscosity: 1.53,
        tempLow: -38.83,
        stateLowName: "solid_mercury",
        tempHigh: 356.73,
        category: "liquids",
        state: "liquid",
        density: 13545,
        conduct: 0.85
    },
    "mercury_gas": {
        density: 12800,
        conduct: 0
    },
    "solid_mercury": {
        conduct: 0.99
    },
    "blood": {
        color: "#ff0000",
        behavior: behaviors.LIQUID,
        reactions: {
            "vaccine": { elem1: "antibody", elem2: null },
            "plague": { elem1: "infection", elem2: null },
            "virus": { elem1: "infection", elem2: null },
            "cancer": { elem1: "infection" },
            "cyanide": { elem1: "infection", elem2: null },
            "cyanide_gas": { elem1: "infection", elem2: null },
            "mushroom_spore": { elem1: "infection", elem2: null },
            "mushroom_gill": { elem1: "infection" },
            "dirty_water": { elem1: "infection", elem2: null },
            "rad_steam": { elem1: "infection" },
            "rad_glass": { elem1: "infection" },
            "rad_shard": { elem1: "infection" },
            "rad_cloud": { elem1: "infection" },
            "rust": { elem1: "infection", chance: 0.05 },
            "oxidized_copper": { elem1: "infection", chance: 0.05 },
            "rat": { elem1: "infection", chance: 0.075 },
            "flea": { elem1: "infection", chance: 0.03 },
            "dirt": { elem1: null, elem2: "mud" },
            "sand": { elem1: null, elem2: "wet_sand" },
            "clay_soil": { elem1: null, elem2: "clay" },
            "mercury": { elem1: "infection", elem2: null, chance: 0.05 },
            "oxygen": { elem2: null, chance: 0.05 },
            "carbon_dioxide": { elem2: null, chance: 0.05 },
            "alcohol": { elem1: [null, "dna"], chance: 0.02 }
        },
        viscosity: 10,
        tempHigh: 124.55,
        stateHigh: ["steam", "salt", "oxygen"],
        tempLow: 0,
        category: "liquids",
        state: "liquid",
        density: 1060,
        stain: 0.05
    },
    "vaccine": {
        color: "#e0d0ad",
        behavior: behaviors.LIQUID,
        reactions: {
            "infection": { elem1: null, elem2: "antibody", chance: 0.1 },
            "antibody": { elem1: null, chance: 0.0025 },
            "plague": { elem2: null, chance: 0.1 },
            "virus": { elem2: null, chance: 0.1 },
            "cancer": { elem2: null, chance: 0.01 },
            "dirt": { elem1: null, elem2: "mud" },
            "sand": { elem1: null, elem2: "wet_sand" },
            "clay_soil": { elem1: null, elem2: "clay" },
        },
        viscosity: 2.6,
        tempHigh: 124.55,
        stateHigh: "steam",
        category: "liquids",
        state: "liquid",
        density: 1125,
        isFood: true,
        stain: -0.05
    },
    "antibody": {
        color: "#ff4040",
        behavior: behaviors.LIQUID,
        reactions: {
            "blood": { elem2: "antibody", chance: 0.01 },
            "infection": { elem2: "antibody", chance: 0.1 },
            "cancer": { elem2: null, chance: 0.01 },
            "poison": { elem1: "antidote", elem2: null, chance: 0.03 },
            "alcohol": { elem1: [null, "dna"], chance: 0.02 },
            "dirt": { elem1: null, elem2: "mud" },
            "sand": { elem1: null, elem2: "wet_sand" },
            "clay_soil": { elem1: null, elem2: "clay" },
        },
        viscosity: 6.3,
        tempHigh: 124.55,
        stateHigh: ["steam", "salt", "oxygen"],
        tempLow: 0,
        category: "liquids",
        hidden: true,
        state: "liquid",
        density: 1060,
        stain: 0.05
    },
    "infection": {
        color: "#cf005d",
        behavior: behaviors.LIQUID,
        reactions: {
            "blood": { elem2: "infection", chance: 0.01 },
            "frog": { elem2: "rotten_meat", chance: 0.005 },
            "fish": { elem2: "rotten_meat", chance: 0.005 },
            "meat": { elem2: "rotten_meat", chance: 0.005 },
            "alcohol": { elem1: [null, "dna"], chance: 0.02 },
            "dirt": { elem1: null, elem2: "mud" },
            "sand": { elem1: null, elem2: "wet_sand" },
            "clay_soil": { elem1: null, elem2: "clay" },
        },
        viscosity: 15,
        tempHigh: 124.55,
        stateHigh: ["plague", "plague", "plague", "salt", "oxygen"],
        tempLow: 0,
        category: "liquids",
        hidden: true,
        state: "liquid",
        density: 1060,
        stain: 0.05
    },
    "poison": {
        color: "#00ff00",
        behavior: behaviors.LIQUID,
        reactions: {
            "blood": { elem1: null, elem2: "infection" },
            "water": { elem1: null, elem2: "dirty_water" },
            "soap": { elem1: null, chance: 0.02 },
            "plant": { elem1: null, elem2: "dead_plant" },
            "evergreen": { elem1: null, elem2: "dead_plant" },
            "cactus": { elem1: null, elem2: "dead_plant" },
            "grass": { elem1: null, elem2: "dead_plant" },
            "vine": { elem1: null, elem2: "dead_plant" },
            "algae": { elem1: null, elem2: null },
            "mushroom_spore": { elem1: null, elem2: null },
            "lichen": { elem1: null, elem2: null },
            "yeast": { elem1: null, elem2: null },
            "rat": { elem1: null, elem2: "rotten_meat" },
            "frog": { elem1: null, elem2: "rotten_meat" },
            "tadpole": { elem2: null },
            "fish": { elem1: null, elem2: "rotten_meat" },
            "bird": { elem1: null, elem2: "rotten_meat" },
            "head": { elem1: null, elem2: "rotten_meat" },
            "body": { elem1: null, elem2: "rotten_meat" },
            "ant": { elem1: null, elem2: "dead_bug" },
            "worm": { elem1: null, elem2: "dead_bug" },
            "fly": { elem1: null, elem2: "dead_bug" },
            "firefly": { elem1: null, elem2: "dead_bug" },
            "bee": { elem1: null, elem2: "dead_bug" },
            "stink_bug": { elem1: null, elem2: "dead_bug" },
            "termite": { elem1: null, elem2: "dead_bug" },
            "flea": { elem1: null, elem2: "dead_bug" },
            "slug": { elem1: null, elem2: "slime" },
            "snail": { elem1: null, elem2: "calcium" },
            "sapling": { elem1: null, elem2: "dead_plant" },
            "root": { elem1: null, elem2: "dead_plant" },
            "flower_seed": { elem1: null, elem2: "dead_plant" },
            "pistil": { elem1: null, elem2: "dead_plant" },
            "petal": { elem1: null, elem2: "dead_plant" },
            "grass_seed": { elem1: null, elem2: "dead_plant" },
            "meat": { elem1: null, elem2: "rotten_meat" },
            "cheese": { elem1: null, elem2: "rotten_cheese" },
            "tree_branch": { elem1: null, elem2: "wood" },
            "mushroom_cap": { elem1: null, elem2: null, chance: 0.01 },
            "mushroom_gill": { elem1: null, elem2: null, chance: 0.01 },
            "mushroom_stalk": { elem1: null, elem2: null, chance: 0.01 },
            "hyphae": { elem1: null, elem2: null, chance: 0.02 },
            "mycelium": { elem1: null, elem2: "dirt", chance: 0.1 },
            "pollen": { elem2: null, chance: 0.01 },
            "mushroom_spore": { elem1: null, elem2: null, chance: 0.1 },
            "bone_marrow": { elem1: null, elem2: "rotten_meat" },
        },
        viscosity: 2,
        tempHigh: 110,
        tempLow: 0,
        category: "liquids",
        state: "liquid",
        density: 1060
    },
    "poison_gas": {
        color: "#98f5b0",
        tempLow: 0,
        stateLow: "poison"
    },
    "poison_ice": {
        color: "#9eff9e"
    },
    "antidote": {
        color: "#c9b836",
        behavior: behaviors.LIQUID,
        reactions: {
            "poison": { elem1: null, elem2: null }
        },
        viscosity: 2,
        tempHigh: 124.55,
        stateHigh: ["steam", "salt", "oxygen"],
        category: "liquids",
        state: "liquid",
        density: 1060,
        stain: -0.05
    },
    "tea": {
        color: "#6c4317",
        behavior: behaviors.LIQUID,
        reactions: {
            "stench": { elem2: null },
            "flea": { elem2: null, chance: 0.01 },
            "oxygen": { elem2: "fragrance", chance: 0.01 },
            "infection": { elem2: "blood", chance: 0.005 },
            "plague": { elem2: null, chance: 0.004 },
            "sugar": { elem2: null, color1: "#8f5a21", chance: 0.005 },
            "milk": { elem2: null, color1: "#9c6c38", chance: 0.005 },
            "cream": { elem2: null, color1: "#9c6c38", chance: 0.005 },
            "ice_cream": { elem2: null, color1: "#9c6c38", chance: 0.005 },
        },
        tempHigh: 125,
        stateHigh: ["steam", "fragrance", null],
        tempLow: 0,
        category: "liquids",
        state: "liquid",
        density: 1001,
        stain: -0.1,
        hidden: true,
        isFood: true
    },
    "honey": {
        color: ["#f6ce1a", "#e79001", "#bb5503"],
        behavior: behaviors.LIQUID,
        viscosity: 10000,
        tempHigh: 71.11,
        stateHigh: "caramel",
        category: "liquids",
        state: "liquid",
        density: 1420,
        isFood: true
    },
    "sap": {
        color: ["#b67f18", "#c86305", "#cf7a19", "#e4ae3a"],
        behavior: behaviors.LIQUID,
        tempHigh: 103.05,
        stateHigh: ["sugar", "smoke", "smoke"],
        category: "liquids",
        state: "liquid",
        viscosity: 15,
        density: 1400
    },
    "caramel": {
        color: "#e89a51",
        behavior: behaviors.LIQUID,
        viscosity: 500,
        temp: 40,
        tempLow: 24,
        stateLow: "candy",
        tempHigh: 204.44,
        stateHigh: "smoke",
        category: "liquids",
        state: "liquid",
        density: 850,
        isFood: true
    },
    "molasses": {
        color: ["#210c06", "#170804"],
        behavior: behaviors.LIQUID,
        viscosity: 7500,
        tempHigh: 1000,
        stateHigh: ["fire", "sugar", "steam"],
        category: "liquids",
        state: "liquid",
        density: 1600,
        stain: 0.05,
        isFood: true
    },
    "ketchup": {
        color: "#ff3119",
        behavior: behaviors.LIQUID,
        viscosity: 50000,
        tempHigh: 260,
        stateHigh: ["vinegar", "steam", "salt", "sugar"],
        category: "liquids",
        state: "liquid",
        density: 1235,
        stain: 0.05,
        isFood: true
    },
    "melted_chocolate": {
        color: "#3b160b",
        behavior: behaviors.LIQUID,
        tempLow: 0,
        stateLow: "chocolate",
        tempHigh: 99,
        stateHigh: ["steam", "sugar"],
        category: "liquids",
        viscosity: 40,
        state: "liquid",
        density: 1325,
        hidden: true,
        stain: 0.05,
        isFood: true
    },
    "liquid_hydrogen": {
        color: "#97afcf",
        behavior: behaviors.LIQUID,
        reactions: {
            "liquid_oxygen": { elem1: "ice", elem2: null },
            "oxygen": { elem1: "ice", elem2: null }
        },
        category: "liquids",
        burn: 100,
        burnTime: 2,
        temp: -255.879,
        tempHigh: -252.879,
        stateHigh: "hydrogen",
        tempLow: -259.2,
        state: "liquid",
        density: 71,
        hidden: true
    },
    "liquid_oxygen": {
        color: "#00ad99",
        behavior: behaviors.LIQUID,
        reactions: {
            "hydrogen": { elem1: "ice", elem2: null }
        },
        category: "liquids",
        burn: 100,
        burnTime: 2,
        temp: -190,
        tempHigh: -182.962,
        tempLow: -218.8,
        stateHigh: "oxygen",
        state: "liquid",
        density: 1141
    },
    "liquid_nitrogen": {
        color: "#d3e1e3",
        behavior: behaviors.LIQUID,
        category: "liquids",
        temp: -209.86,
        tempHigh: -195.795,
        stateHigh: "nitrogen",
        tempLow: -259.86,
        stateLow: "nitrogen_ice",
        state: "liquid",
        density: 804
    },
    "liquid_helium": {
        color: "#e3d3d3",
        behavior: behaviors.SUPERFLUID,
        category: "liquids",
        temp: -269,
        tempHigh: -268.95,
        stateHigh: "helium",
        state: "liquid",
        density: 145,
        viscosity: 0,
        hidden: true
    },
    "sodium": {
        color: ["#484849", "#5d5e5f", "#6b6968", "#747775"],
        tick: function (pixel) {
            behaviors.POWDER(pixel);
            for (var i = 0; i < adjacentCoords.length; i++) {
                var x = pixel.x + adjacentCoords[i][0];
                var y = pixel.y + adjacentCoords[i][1];
                if (isEmpty(x, y)) {
                    if (Math.random() < 0.005) { deletePixel(pixel.x, pixel.y) }
                    break
                }
            }
        },
        reactions: {
            "chlorine": { elem1: "salt", elem2: "pop" },
            "vinegar": { elem1: "sodium_acetate", elem2: null, attr1: { "foam": 15 } },
            "water": { elem1: "pop", chance: 0.01 },
            "salt_water": { elem1: "pop", chance: 0.01 },
            "sugar_water": { elem1: "pop", chance: 0.01 },
            "dirty_water": { elem1: "pop", chance: 0.01 },
            "seltzer": { elem1: "pop", chance: 0.01 },
            "acid": { elem1: "explosion" }
        },
        tempHigh: 97.794,
        category: "powders",
        state: "solid",
        density: 968,
        conduct: 0.85,
        hardness: 0.05
    },
    "molten_sodium": {
        tempLow: 97.794,
        tempHigh: 882.8,
        fireColor: "#ffff00",
        reactions: {
            "chlorine": { elem1: "salt", elem2: "pop" },
            "vinegar": { elem1: "sodium_acetate", elem2: null, attr1: { "foam": 15 } },
            "water": { elem1: "pop", chance: 0.01 },
            "salt_water": { elem1: "pop", chance: 0.01 },
            "sugar_water": { elem1: "pop", chance: 0.01 },
            "dirty_water": { elem1: "pop", chance: 0.01 },
            "seltzer": { elem1: "pop", chance: 0.01 },
            "acid": { elem1: "explosion" }
        }
    },
    "sodium_gas": {
        color: "#5d5e5f"
    },
    "calcium": {
        color: ["#515053", "#7a787d", "#748193", "#fef9ff", "#748193", "#7a787d", "#515053"],
        behavior: behaviors.POWDER,
        reactions: {
            "oxygen": { elem1: "quicklime", elem2: null }
        },
        tempHigh: 842,
        category: "powders",
        state: "solid",
        density: 1550,
        conduct: 0.40,
        hardness: 0.2,
        fireColor: "#ff6b21"
    },
    "molten_calcium": {
        burn: 10,
        burnInto: ["flash", "smoke", "pop"],
    },
    "limestone": {
        color: ["#c5b79c", "#d9ccb2", "#f8f1db", "#fcfaeb"],
        behavior: behaviors.STURDYPOWDER,
        tempHigh: 825,
        stateHigh: "quicklime",
        category: "land",
        state: "solid",
        density: 2100,
        hardness: 0.3,
        breakInto: ["quicklime", "calcium", "dust"]
    },
    "quicklime": {
        color: "#e9ebe7",
        behavior: behaviors.POWDER,
        tempHigh: 4662,
        stateHigh: "molten_calcium",
        category: "land",
        state: "solid",
        density: 1025,
        hardness: 0.23,
        breakInto: ["calcium", "dust"],
        hidden: true
    },
    "slaked_lime": {
        color: "#adb8b5",
        behavior: behaviors.STURDYPOWDER,
        tempHigh: 580,
        stateHigh: "quicklime",
        category: "land",
        hidden: true,
        state: "solid",
        density: 2211,
        hardness: 0.13,
        breakInto: ["calcium", "dust"]
    },
    "thermite": {
        color: ["#5d4947", "#5b3c42", "#372a2d"],
        behavior: behaviors.POWDER,
        tick: function (pixel) {
            if (pixel.burning) {
                changePixel(pixel, "molten_thermite");
                pixel.temp = 2200;
            }
        },
        tempHigh: 660,
        burn: 100,
        burnTime: 1000,
        category: "powders",
        density: 700,
        state: "solid",
        hardness: 0.325
    },
    "molten_thermite": {
        tick: function (pixel) {
            pixel.temp++;
        }
    },
    "slag": {
        color: ["#4b3a2d", "#6a5447", "#6b5b53", "#675851", "#78756e"],
        behavior: behaviors.POWDER,
        tempHigh: 1380,
        category: "powders",
        density: 2400,
        state: "solid",
        conduct: 0.03,
        hardness: 0.5
    },
    "amalgam": {
        color: ["#6b5535", "#96784f", "#604928", "#a69070"],
        behavior: behaviors.SUPPORT,
        tempHigh: 223,
        category: "powders",
        state: "solid",
        density: 13920,
        hardness: 0.1,
        hidden: true,
        conduct: 0.37,
    },
    "molten_aluminum": {
        reactions: {
            "rust": { elem1: null, elem2: "thermite" },
            "oxidized_copper": { elem1: null, elem2: "thermite" }
        }
    },
    "molten_zinc": {
        reactions: {
            "rust": { elem1: null, elem2: "thermite" },
            "oxidized_copper": { elem1: null, elem2: "thermite" }
        }
    },
    "neon": {
        color: "#bababa",
        behavior: behaviors.GAS,
        colorOn: ["#ff0000", "#d01822", "#fe5c0c"],
        tempLow: -246,
        stateLow: "liquid_neon",
        category: "gases",
        density: 0.9002,
        state: "gas",
        conduct: 0.86
    },
    "liquid_neon": {
        color: "#d1d1d1",
        behavior: behaviors.LIQUID,
        colorOn: ["#ff0000", "#d01822", "#fe5c0c"],
        temp: -247,
        tempHigh: -246,
        stateHigh: "neon",
        tempLow: -248.6,
        category: "liquids",
        hidden: true,
        density: 1207,
        state: "liquid",
        conduct: 0.83
    },
    "smog": {
        color: "#989398",
        behavior: [
            "XX|M2%5|XX",
            "M1%8|XX|M1%8",
            "XX|M2%5|XX",
        ],
        reactions: {
            "plant": { elem1: "cloud" },
            "evergreen": { elem1: "cloud" },
            "cactus": { elem1: "cloud" },
            "algae": { elem1: "cloud" },
        },
        temp: 100,
        tempLow: 47.5,
        stateLow: "dirty_water",
        category: "gases",
        density: 590.3,
        state: "gas",
        conduct: 0.03,
        stain: 0.0035
    },
    "stench": {
        color: "#6ab066",
        behavior: behaviors.GAS,
        reactions: {
            "oxygen": { elem2: "stench" },
            "water": { elem1: null, elem2: "dirty_water" },
            "nitrogen": { elem2: "stench" },
            "baking_soda": { elem1: null },
            "fire": { elem1: null },
            "bubble": { elem1: null },
            "foam": { elem1: null },
        },
        category: "gases",
        tempHigh: 1000,
        stateHigh: "fire",
        state: "gas",
        density: 1.293
    },
    "fragrance": {
        color: "#967bb6",
        behavior: behaviors.GAS,
        reactions: {
            "stench": { elem2: null },
            "oxygen": { elem2: "fragrance" },
            "dirty_water": { elem1: null, elem2: "water" }
        },
        tempHigh: 1000,
        stateHigh: "fire",
        category: "gases",
        state: "gas",
        density: 1.292
    },
    "cyanide": {
        color: "#b6ccb6",
        behavior: behaviors.LIQUID,
        reactions: {
            "frog": { elem2: "meat" },
            "ant": { elem2: null },
            "bee": { elem2: null },
            "fish": { elem2: "meat" },
            "firefly": { elem2: null }
        },
        tempHigh: 26,
        tempLow: -13.29,
        burn: 100,
        burnTime: 1,
        state: "liquid",
        density: 687,
        category: "liquids",
        hidden: true
    },
    "cyanide_gas": {
        reactions: {
            "frog": { elem2: "meat" },
            "ant": { elem2: null },
            "bee": { elem2: null },
            "fish": { elem2: "meat" },
            "firefly": { elem2: null }
        },
        tempHigh: 550,
        stateHigh: "fire",
        burn: 100,
        burnTime: 1,
        density: 941,
        category: "gases"
    },
    "ozone": {
        color: "#80a4ff",
        behavior: [
            "XX|XX|XX",
            "M1%7|XX|M1%7",
            "XX|XX|XX",
        ],
        reactions: {
            "carbon_dioxide": { elem1: null, elem2: null, chance: 0.05 },
            "anesthesia": { elem1: null, elem2: null, chance: 0.05 },
            "copper": { elem1: "oxygen", elem2: "oxidized_copper", chance: 0.05 },
            "iron": { elem1: "oxygen", elem2: "rust", chance: 0.025 },
            "charcoal": { elem1: "oxygen", elem2: "carbon_dioxide", chance: 0.025 },
            "dirty_water": { elem1: null, elem2: "water" },
            "stench": { elem1: null, elem2: null },
            "yeast": { elem2: null, chance: 0.1 },
            "plant": { elem1: null, elem2: "dead_plant", chance: 0.25 },
            "evergreen": { elem1: null, elem2: "dead_plant", chance: 0.25 },
            "cactus": { elem1: null, elem2: "dead_plant", chance: 0.2 },
            "grass": { elem1: null, elem2: "dead_plant", chance: 0.25 },
            "vine": { elem1: null, elem2: "dead_plant", chance: 0.25 },
            "tree_branch": { elem1: null, elem2: "wood", chance: 0.25 },
            "algae": { elem1: null, elem2: null, chance: 0.25 },
        },
        category: "gases",
        temp: -15,
        tempLow: -112,
        stateLow: "liquid_oxygen",
        state: "gas",
        stain: -0.1,
        density: 2.14
    },
    "cloud": {
        color: "#d5dce6",
        behavior: [
            "XX|XX|XX",
            "XX|CO:1%5|M1%2.5 AND BO",
            "XX|XX|XX",
        ],
        reactions: {
            "rain_cloud": { elem1: "rain_cloud", temp1: -20 },
            "electric": { elem1: "rain_cloud", temp1: -20 },
            "cloud": { elem1: "rain_cloud", elem2: "rain_cloud", temp1: -20, temp2: -20, charged: true },
            "anesthesia": { elem1: "acid_cloud", elem2: null, chance: 0.05 },
        },
        category: "gases",
        temp: 110,
        tempLow: 100,
        stateLow: "rain_cloud",
        state: "gas",
        density: 0.4,
        ignoreAir: true,
        conduct: 0.03
    },
    "rain_cloud": {
        color: "#636b78",
        behavior: [
            "XX|XX|XX",
            "XX|CH:water%0.05|M1%2.5 AND BO",
            "CR:electric%0.05|CR:electric%0.05|CR:electric%0.05",
        ],
        reactions: {
            "anesthesia": { elem1: "acid_cloud", elem2: null, chance: 0.05 },
        },
        category: "gases",
        temp: 70,
        tempHigh: 100,
        stateHigh: "cloud",
        tempLow: 0,
        stateLow: "snow_cloud",
        state: "gas",
        density: 0.5,
        ignoreAir: true,
        conduct: 0.03
    },
    "snow_cloud": {
        color: "#7e8691",
        behavior: [
            "XX|XX|XX",
            "XX|CH:snow%0.05|M1%2.5 AND BO",
            "XX|XX|XX",
        ],
        category: "gases",
        temp: -10,
        tempHigh: 30,
        stateHigh: "rain_cloud",
        tempLow: -200,
        stateLow: "hail_cloud",
        state: "gas",
        density: 0.55,
        ignoreAir: true,
        conduct: 0.01
    },
    "hail_cloud": {
        color: "#7e8691",
        behavior: [
            "XX|XX|XX",
            "XX|CH:hail%0.05|M1%2.5 AND BO",
            "XX|XX|XX",
        ],
        category: "gases",
        temp: -200,
        tempHigh: -180,
        stateHigh: "snow_cloud",
        state: "gas",
        density: 0.6,
        ignoreAir: true,
        conduct: 0.01
    },
    "thunder_cloud": {
        color: "#494f5b",
        behavior: [
            "XX|XX|XX",
            "XX|CH:lightning%0.001 AND CH:water%0.05|M1%2.5 AND BO",
            "XX|XX|XX",
        ],
        tick: function (pixel) {
            pixel.temp = 70;
        },
        category: "gases",
        temp: 70,
        tempLow: 0,
        stateLow: "snow_cloud",
        state: "gas",
        density: 0.55,
        ignoreAir: true,
        conduct: 0.03
    },
    "acid_cloud": {
        color: "#637865",
        behavior: [
            "XX|XX|XX",
            "XX|CH:acid%0.05|M1%2.5 AND BO",
            "XX|XX|XX",
        ],
        reactions: {
            "ash": { elem1: "rain_cloud", elem2: null, chance: 0.05 },
            "limestone": { elem1: "rain_cloud", elem2: null, chance: 0.05 },
            "quicklime": { elem1: "rain_cloud", elem2: null, chance: 0.05 },
            "slaked_lime": { elem1: "rain_cloud", elem2: null, chance: 0.05 },
            "borax": { elem1: "rain_cloud", elem2: null, chance: 0.05 },
            "ammonia": { elem1: "rain_cloud", elem2: null, chance: 0.05 },
            "bleach": { elem1: "rain_cloud", elem2: null, chance: 0.05 }
        },
        category: "gases",
        burn: 15,
        burnTime: 5,
        state: "gas",
        density: 0.7,
        ignoreAir: true
    },
    "pyrocumulus": {
        color: "#2e2e2e",
        behavior: [
            "XX|XX|XX",
            "XX|CH:ash%0.075|M1%2.5 AND BO",
            "XX|XX|XX",
        ],
        reactions: {
            "fireball": { elem1: null, elem2: "fire_cloud", chance: 0.25 }
        },
        category: "gases",
        hidden: true,
        state: "gas",
        density: 0.7,
        ignoreAir: true
    },
    "fire_cloud": {
        color: ["#332424", "#473431", "#473931"],
        behavior: [
            "XX|XX|XX",
            "XX|CH:fireball%0.02|M1%2.5 AND BO",
            "XX|XX|XX",
        ],
        reactions: {
            "rain_cloud": { elem1: "pyrocumulus", elem2: "pyrocumulus" },
            "snow_cloud": { elem1: "pyrocumulus", elem2: "rain_cloud" },
            "hail_cloud": { elem1: "pyrocumulus", elem2: "snow_cloud" },
            "thunder_cloud": { elem1: "pyrocumulus", elem2: "pyrocumulus" },
            "acid_cloud": { elem1: "fire", elem2: "electric" }
        },
        temp: 500,
        tempLow: 100,
        stateLow: "pyrocumulus",
        category: "gases",
        state: "gas",
        density: 0.8,
        ignoreAir: true,
        excludeRandom: true
    },
    "color_smoke": {
        color: ["#6b2e2e", "#6b4f2e", "#6b6b2e", "#2e6b2e", "#2e6b6b", "#2e2e6b", "#6b2e6b"],
        behavior: behaviors.GAS,
        category: "gases",
        state: "gas",
        density: 1.977,
        customColor: true
    },
    "spray_paint": {
        color: ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"],
        behavior: behaviors.GAS,
        category: "gases",
        state: "gas",
        burn: 100,
        burnTime: 1,
        density: 1250,
        customColor: true,
        stain: 0.25
    },
    "battery": {
        color: "#9c6c25",
        behavior: [
            "XX|SH|XX", // shocks (adds charge)
            "SH|XX|SH",
            "XX|SH|XX",
        ],
        category: "machines",
        tempHigh: 1455.5,
        stateHigh: "molten_steel"
    },
    "led_r": {
        behavior: behaviors.WALL,
        reactions: {
            "light": { "charge1": 1 },
            "liquid_light": { "charge1": 1 },
        },
        color: "#660000",
        colorOn: "#ff0000",
        category: "machines",
        tempHigh: 1500,
        stateHigh: ["molten_glass", "molten_glass", "molten_glass", "molten_gallium"],
        conduct: 1
    },
    "led_g": {
        behavior: behaviors.WALL,
        reactions: {
            "light": { "charge1": 1 },
            "liquid_light": { "charge1": 1 },
        },
        color: "#006600",
        colorOn: "#00ff00",
        category: "machines",
        tempHigh: 1500,
        stateHigh: ["molten_glass", "molten_glass", "molten_glass", "molten_gallium"],
        conduct: 1
    },
    "led_b": {
        behavior: behaviors.WALL,
        reactions: {
            "light": { "charge1": 1 },
            "liquid_light": { "charge1": 1 },
        },
        color: "#000066",
        colorOn: "#0000ff",
        category: "machines",
        tempHigh: 1500,
        stateHigh: ["molten_glass", "molten_glass", "molten_glass", "molten_gallium"],
        conduct: 1
    },
    "sulfur": {
        color: ["#e9d74c", "#89761b", "#ddc56b"],
        behavior: behaviors.POWDER,
        reactions: {
            "hydrogen": { elem2: "stench" }
        },
        category: "powders",
        tempHigh: 115.21,
        burn: 25,
        burnTime: 207,
        fireColor: ["#8180cc", "#7f84e6"],
        state: "solid",
        density: 2070,
        alias: "sulphur"
    },
    "molten_sulfur": {
        color: "#831502",
        behavior: behaviors.LIQUID,
        reactions: {
            "iron": { elem1: null, elem2: "pyrite" }
        },
        density: 1819,
        burn: 25,
        burnTime: 507,
        tempHigh: 444.6,
        viscosity: 8.5,
        fireColor: ["#8180cc", "#7f84e6"],
        alias: "molten sulphur"
    },
    "sulfur_gas": {
        color: "#b0a65d",
        burnTime: 57,
        density: 2.16
    },
    "copper_sulfate": {
        color: ["#4391fd", "#004cfe"],
        behavior: behaviors.POWDER,
        reactions: {
            "ant": { elem2: "dead_bug" },
            "fly": { elem2: "dead_bug" },
            "firefly": { elem2: "dead_bug" },
            "stinkbug": { elem2: "dead_bug" },
            "bee": { elem2: "dead_bug" },
        },
        tempHigh: 110,
        burn: 10,
        burnTime: 1007,
        fireColor: ["#91d106", "#feff97", "#248e01"],
        state: "solid",
        density: 3600,
        hidden: true,
        category: "powders"
    },
    "snake": {
        color: "#00bf00",
        behavior: [
            "XX|XX|XX",
            "XX|LB:plant AND RT%5|M1 AND BO:1,2,3",
            "XX|XX|XX",
        ],
        rotatable: true,
        category: "special",
        excludeRandom: true
    },
    "loopy": {
        color: "#eb3474",
        behavior: [
            "XX|M2|M1",
            "XX|RT%20|M2",
            "CF|XX|XX",
        ],
        rotatable: true,
        category: "special"
    },
    "radiation": {
        color: ["#00ff00", "#6fff00"],
        behavior: [
            "XX|M1%0.5 AND HT|XX",
            "M1%7 AND HT|DL%3|M1%7 AND HT",
            "XX|M1%1 AND HT|XX",
        ],
        reactions: {
            "water": { elem2: "rad_steam", chance: 0.4 },
            "steam": { elem2: "rad_steam", chance: 0.4 },
            "salt_water": { elem2: "rad_steam", chance: 0.4 },
            "sugar_water": { elem2: "rad_steam", chance: 0.4 },
            "dirty_water": { elem2: "rad_steam", chance: 0.4 },
            "seltzer": { elem2: "rad_steam", chance: 0.3 },
            "pool_water": { elem2: "rad_steam", chance: 0.2 },
            "soda": { elem2: "rad_steam", chance: 0.25 },
            "broth": { elem2: "rad_steam", chance: 0.3 },
            "tea": { elem2: "rad_steam", chance: 0.25 },
            "bubble": { elem2: "rad_steam", chance: 0.4 },
            "foam": { elem2: "rad_steam", chance: 0.4 },
            "ice": { elem2: "rad_steam", chance: 0.4 },
            "rime": { elem2: "rad_steam", chance: 0.4 },
            "snow": { elem2: "rad_steam", chance: 0.4 },
            "packed_snow": { elem2: "rad_steam", chance: 0.4 },
            "slime": { elem2: "rad_steam", chance: 0.4 },
            "permafrost": { elem1: "rad_steam", elem2: "dirt", chance: 0.4 },
            "mud": { elem1: "rad_steam", elem2: "dirt", chance: 0.4 },
            "wet_sand": { elem1: "rad_steam", elem2: "sand", chance: 0.4 },
            "clay": { elem1: "rad_steam", elem2: "clay_soil", chance: 0.4 },
            "slaked_lime": { elem1: "rad_steam", elem2: "limestone", chance: 0.4 },
            "rain_cloud": { elem2: "rad_cloud", chance: 0.4 },
            "snow_cloud": { elem2: "rad_cloud", chance: 0.4 },
            "hail_cloud": { elem2: "rad_cloud", chance: 0.4 },
            "thunder_cloud": { elem2: "rad_cloud", chance: 0.4 },
            "plant": { elem2: "dead_plant", chance: 0.4 },
            "evergreen": { elem2: ["dead_plant", "plant"], chance: 0.4 },
            "cactus": { elem2: ["dead_plant", "plant"], chance: 0.4 },
            "frozen_plant": { elem2: "dead_plant", chance: 0.4 },
            "grass": { elem2: ["dead_plant", "straw", "grass_seed", "wheat_seed"], chance: 0.4 },
            "herb": { elem2: "dead_plant", chance: 0.4 },
            "algae": { elem2: ["mushroom_spore", "lichen", "yeast"], chance: 0.4 },
            "mushroom_spore": { elem2: ["lichen", "yeast"], chance: 0.4 },
            "mushroom_cap": { elem2: ["lichen", "plant"], chance: 0.4 },
            "mushroom_stalk": { elem2: ["lichen", "yeast"], chance: 0.4 },
            "mushroom_gill": { elem2: ["lichen", "yeast"], chance: 0.4 },
            "flea": { elem2: ["ash", "ant", "termite"], chance: 0.4 },
            "ant": { elem2: ["ash", "flea", "termite"], chance: 0.4 },
            "termite": { elem2: ["ash", "flea", "ant"], chance: 0.4 },
            "fly": { elem2: ["ash", "firefly", "bee"], chance: 0.4 },
            "bee": { elem2: ["ash", "firefly", "fly"], chance: 0.4 },
            "firefly": { elem2: ["ash", "bee", "fly"], chance: 0.4 },
            "stink_bug": { elem2: "ash", chance: 0.4 },
            "frog": { elem2: ["ash", "meat", "rotten_meat", "cooked_meat", "tadpole"], chance: 0.4 },
            "tadpole": { elem2: ["frog", "frog", "worm", null], chance: 0.4 },
            "fish": { elem2: ["ash", "meat", "rotten_meat", "cooked_meat"], chance: 0.4 },
            "rat": { elem2: ["ash", "meat", "rotten_meat", "cooked_meat", "plague"], chance: 0.4 },
            "bird": { elem2: ["ash", "meat", "rotten_meat", "cooked_meat", "plague"], chance: 0.4 },
            "bone": { elem2: ["calcium", "calcium", "calcium", "cancer"], chance: 0.4 },
            "meat": { elem2: ["ash", "rotten_meat", "cooked_meat"], chance: 0.4 },
            "cheese": { elem2: "rotten_cheese", chance: 0.4 },
            "rotten_meat": { elem2: ["ash", "meat", "cooked_meat"], chance: 0.4 },
            "cooked_meat": { elem2: ["ash", "rotten_meat"], chance: 0.4 },
            "bamboo": { elem2: ["wood", "plant", "bamboo_plant"], chance: 0.4 },
            "bamboo_plant": { elem2: ["wood", "plant", "bamboo"], chance: 0.4 },
            "sapling": { elem2: ["wood", "plant", "tree_branch"], chance: 0.4 },
            "tree_branch": { elem2: ["wood", "plant", "sapling"], chance: 0.4 },
            "grass_seed": { elem2: ["straw", "wheat_seed"], chance: 0.4 },
            "lichen": { elem2: "algae", chance: 0.4 },
            "yeast": { elem2: ["algae", "mushroom_spore", "lichen"], chance: 0.4 },
            "wheat_seed": { elem2: ["straw", "wheat", "grass_seed"], chance: 0.4 },
            "flower_seed": { elem2: ["straw", "grass", "pistil", "petal"], chance: 0.4 },
            "pistil": { elem2: ["straw", "grass", "flower_seed", "petal"], chance: 0.4 },
            "petal": { elem2: ["straw", "grass", "flower_seed", "pistil"], chance: 0.4 },
            "vine": { elem1: ["vine"], chance: 0.4 },
            "worm": { elem2: "ash", chance: 0.4 },
            "corn": { elem2: "popcorn", chance: 0.4 },
            "corn_seed": { elem2: "corn", chance: 0.4 },
            "potato": { elem2: ["potato_seed", "potato_seed", "potato_seed", "potato_seed", "potato_seed", "potato_seed", "explosion"], chance: 0.4 },
            "potato_seed": { elem2: "potato", chance: 0.4 },
            "slug": { elem2: "slime", chance: 0.4 },
            "snail": { elem2: "slime", chance: 0.4 },
            "cell": { elem2: "cancer", chance: 0.4 },
            "blood": { elem2: ["infection", "cancer"], chance: 0.4 },
            "antibody": { elem2: "cancer", chance: 0.4 },
            "infection": { elem2: "cancer", chance: 0.4 },
            "cancer": { elem2: null, chance: 0.1 }
        },
        state: "gas",
        density: 1.5,
        category: "energy"
    },
    "rad_steam": {
        color: "#abffe4",
        behavior: [
            "XX|XX|XX",
            "M2%10|XX|M2%10",
            "XX|M2%10|XX",
        ],
        reactions: {
            "rad_steam": { elem1: null, elem2: "rad_cloud", chance: 0.3, "y": [0, 15], "setting": "clouds" },
            "steam": { elem1: null, elem2: "rad_cloud", chance: 0.3, "y": [0, 12], "setting": "clouds" },
            "rain_cloud": { elem1: "rad_cloud", chance: 0.4, "y": [0, 12], "setting": "clouds" },
            "snow_cloud": { elem1: "rad_cloud", chance: 0.4, "y": [0, 12], "setting": "clouds" },
            "hail_cloud": { elem1: "rad_cloud", chance: 0.4, "y": [0, 12], "setting": "clouds" },
            "thunder_cloud": { elem1: "rad_cloud", chance: 0.4, "y": [0, 12], "setting": "clouds" },
            "pyrocumulus": { elem1: "rad_cloud", chance: 0.4, "y": [0, 12], "setting": "clouds" },
            "rad_cloud": { elem1: "rad_cloud", chance: 0.3, "y": [0, 12], "setting": "clouds" }
        },
        tempLow: 10,
        stateLow: "fallout",
        category: "gases",
        hidden: true,
        state: "gas",
        density: 0.7
    },
    "rad_cloud": {
        color: ["#2d7528", "#557528"],
        behavior: [
            "XX|XX|XX",
            "XX|CH:fallout,radiation%0.025|M1%2.5 AND BO",
            "CR:radiation%0.05|CR:radiation%0.05|CR:radiation%0.05",
        ],
        category: "gases",
        hidden: true,
        state: "gas",
        density: 0.5,
        ignoreAir: true
    },
    "fallout": {
        color: ["#63b85a", "#448044", "#598044", "#7bb85a"],
        behavior: [
            "XX|CR:radiation%2|XX",
            "CR:radiation%2|CH:radiation%0.5|CR:radiation%2",
            "M2|M1 AND CR:radiation%2|M2",
        ],
        category: "energy",
        hidden: true,
        state: "solid",
        density: 1490
    },
    "neutron": {
        color: "#a6ffff",
        behavior: [
            "XX|XX|XX",
            "XX|CH:proton%0.25 AND DL%0.25|XX",
            "XX|XX|XX",
        ],
        tick: behaviors.BOUNCY,
        reactions: {
            "uranium": { temp2: 100 }
        },
        temp: 35,
        category: "energy",
        state: "gas",
        density: 0.00003,
        ignoreAir: true
    },
    "proton": {
        color: "#ffa6a6",
        behavior: [
            "XX|XX|XX",
            "XX|DL%0.5|XX",
            "XX|XX|XX",
        ],
        behaviorOn: [
            "XX|XX|XX",
            "XX|CH:hydrogen|XX",
            "XX|XX|XX",
        ],
        tick: behaviors.BOUNCY,
        reactions: {
            "electric": { elem1: null, elem2: "hydrogen", temp2: 10 }
        },
        temp: 40,
        category: "energy",
        state: "gas",
        conduct: 1,
        density: 0.00002,
        ignoreAir: true
    },
    "electric": {
        color: "#fffba6",
        behavior: [
            "CL%5|CL%5 AND SH|CL%5",
            "CL%5 AND SH|SH%5 AND DL%50|CL%5 AND SH",
            "M1%15 AND CL%6|M1%50 AND CL%13 AND SH|M1%15 AND CL%6",
        ],
        charge: 3,
        category: "energy",
        state: "gas",
        density: 2.1,
        insulate: true,
        ignoreAir: true
    },
    "uranium": {
        color: ["#599e61", "#364d3c", "#494d4a", "#6c8a42", "#798d65", "#b5e089"],
        behavior: [
            "XX|CR:radiation%1|XX",
            "CR:radiation%1|CH:lead%0.001|CR:radiation%1",
            "M2|M1|M2",
        ],
        reactions: {
            "neutron": { elem1: "n_explosion", tempMin: 500, chance: 0.1 }
        },
        tempHigh: 1132.2,
        category: "powders",
        state: "solid",
        density: 19100,
        hardness: 0.6,
        excludeRandom: true
    },
    "molten_uranium": {
        behavior: behaviors.RADMOLTEN,
        reactions: {
            "neutron": { elem1: "n_explosion", tempMin: 200 },
            "glass": { elem1: null, elem2: "rad_glass" },
            "glass_shard": { elem1: null, elem2: "rad_shard" }
        }
    },
    "diamond": {
        color: ["#03fcec", "#03c6fc", "#b3eeff", "#8ab0e6"],
        behavior: behaviors.POWDER,
        category: "powders",
        tempHigh: 900,
        stateHigh: "carbon_dioxide",
        state: "solid",
        density: 3515,
        hardness: 1
    },
    "gold_coin": {
        color: ["#fff0b5", "#986a1a", "#f0bb62"],
        behavior: behaviors.POWDER,
        tempHigh: 1064,
        stateHigh: "molten_gold",
        category: "powders",
        state: "solid",
        density: 19300,
        conduct: 0.78,
        hardness: 0.2
    },
    "rust": {
        color: ["#ae551c", "#bc6e39", "#925f49"],
        behavior: behaviors.SUPPORT,
        tempHigh: 1538,
        stateHigh: "molten_iron",
        category: "powders",
        state: "solid",
        density: 5250,
        conduct: 0.37,
        hardness: 0.3
    },
    "oxidized_copper": {
        color: ["#406555", "#42564a", "#517364"],
        behavior: behaviors.SUPPORT,
        reactions: {
            "hydrogen": { tempMin: 900, elem1: "copper", elem2: "steam" }
        },
        category: "powders",
        hidden: true,
        tempHigh: 1085,
        stateHigh: "molten_copper",
        density: 8960,
        conduct: 0.85,
        hardness: 0.2
    },
    "alga": {
        name: "AlGa",
        color: ["#bab2ab", "#a3ab9d", "#a5a4a6", "#bcc7b3", "#d4c5b8", "#cac6cf"],
        behavior: behaviors.SUPPORT,
        reactions: {
            "water": { elem1: ["aluminum", "gallium"], elem2: "hydrogen", chance: 0.01 }
        },
        tempHigh: 345.03,
        category: "powders",
        state: "solid",
        density: 3905,
        conduct: 0.39,
        hardness: 0.1,
        alias: "gallanylidynealumane",
        hidden: true
    },
    "metal_scrap": {
        color: ["#b0afb4", "#8c8f98", "#cbcdcd", "#6c6c6a", "#fef9ff"],
        behavior: behaviors.POWDER,
        tempHigh: 1538,
        stateHigh: ["molten_iron", "molten_aluminum", "molten_tin"],
        category: "powders",
        density: 2720,
        state: "solid",
        conduct: 0.43,
        hardness: 0.266
    },
    "glass_shard": {
        color: ["#5e807d", "#679e99", "#596b6e"],
        behavior: behaviors.POWDER,
        reactions: {
            "radiation": { elem1: "rad_shard", chance: 0.33 },
            "rad_steam": { elem1: "rad_shard", elem2: null, chance: 0.33 },
            "fallout": { elem1: "rad_shard", elem2: "radiation", chance: 0.1 }
        },
        tempHigh: 1500,
        stateHigh: "molten_glass",
        category: "powders",
        state: "solid",
        density: 2500
    },
    "rad_shard": {
        color: ["#648c64", "#6aad83", "#596e59"],
        behavior: behaviors.POWDER,
        tempHigh: 1500,
        stateHigh: "molten_rad_glass",
        category: "powders",
        state: "solid",
        density: 2500,
        hidden: true
    },
    "brick_rubble": {
        color: ["#cb4141", "#ab4d4d", "#872626"],
        behavior: behaviors.POWDER,
        category: "powders",
        tempHigh: 1540,
        stateHigh: "molten_brick",
        state: "solid",
        density: 1650,
        hardness: 0.25,
        breakInto: "dust",
        hidden: true
    },
    "baked_clay": {
        color: "#b85746",
        behavior: behaviors.SUPPORT,
        category: "powders",
        tempHigh: 1300,
        stateHigh: "porcelain",
        breakInto: "clay_shard",
        state: "solid",
        density: 2000,
        hardness: 0.3
    },
    "clay_shard": {
        color: ["#b85746", "#9c4333", "#8a473b"],
        behavior: behaviors.POWDER,
        category: "powders",
        tempHigh: 1300,
        stateHigh: "porcelain",
        state: "solid",
        density: 2000,
        hardness: 0.25
    },
    "feather": {
        color: ["#ffffff", "#e3e3e3", "#d1d1d1"],
        behavior: behaviors.LIGHTWEIGHT,
        category: "powders",
        tempHigh: 400,
        stateHigh: ["ash", "smoke", "smoke", "smoke"],
        burn: 50,
        burnTime: 20,
        burnInto: ["ash", "smoke", "smoke", "smoke"],
        state: "solid",
        density: 500
    },
    "confetti": {
        color: ["#dc2c37", "#edce66", "#0dbf62", "#0679ea", "#7144b2", "#d92097"],
        behavior: [
            "XX|XX|XX",
            "XX|FX%0.25|XX",
            "M2%25|M1%25|M1%25",
        ],
        category: "powders",
        tempHigh: 248,
        stateHigh: ["ash", "smoke", "smoke", "fire"],
        burn: 15,
        burnTime: 150,
        burnInto: ["ash", "smoke", "smoke", "smoke"],
        state: "solid",
        density: 1201
    },
    "glitter": {
        color: ["#ace4fb", "#d9fcff", "#8f6eb2", "#fdeafc", "#180e1c", "#6b2778"],
        behavior: behaviors.POWDER,
        category: "powders",
        tempHigh: 100,
        stateHigh: ["fire", "fire", "dioxin"],
        state: "solid",
        density: 1450,
        burn: 50,
        burnTime: 50,
        burnInto: ["smoke", "smoke", "dioxin"]
    },
    "bead": {
        color: ["#ff5e5e", "#ffcc5e", "#76ff5e", "#5ed4ff", "#5e61ff", "#cf5eff"],
        behavior: behaviors.POWDER,
        category: "powders",
        tempHigh: 185,
        stateHigh: "molten_plastic",
        burn: 10,
        burnTime: 400,
        burnInto: "dioxin",
        state: "solid",
        density: 1052
    },
    "color_sand": {
        color: ["#ff4d4d", "#ffac4d", "#ffff4d", "#4dff4d", "#4dffff", "#4d4dff", "#ff4dff"],
        tick: function (pixel) {
            behaviors.POWDER(pixel);
            if (pixel.start === pixelTicks) {
                pixel.color = "hsl(" + pixel.start + ",100%,65%)";
                pixel.colorstart = pixel.start;
            }
        },
        tempHigh: 1700,
        stateHigh: "molten_stained_glass",
        category: "powders",
        state: "solid",
        density: 1602
    },
    "borax": {
        color: "#ffffff",
        behavior: behaviors.POWDER,
        reactions: {
            "ant": { elem2: "dead_bug" },
            "fly": { elem2: "dead_bug" },
            "firefly": { elem2: "dead_bug" },
            "stinkbug": { elem2: "dead_bug" },
            "bee": { elem2: "dead_bug" },
            "glue": { elem1: "slime", elem2: "slime", chance: 0.1 },
        },
        category: "powders",
        burn: 15,
        burnTime: 200,
        fireColor: ["#34eb67", "#5ceb34"],
        tempHigh: 743,
        state: "solid",
        density: 1730,
        hidden: true
    },
    "epsom_salt": {
        color: ["#f2f2f2", "#d6d6d6"],
        behavior: behaviors.POWDER,
        category: "powders",
        burn: 40,
        burnTime: 200,
        fireColor: ["#ffffff", "#fcf0f0"],
        tempHigh: 1124,
        state: "solid",
        density: 1680,
        hidden: true
    },
    "potassium_salt": {
        color: ["#f2f2f2", "#e0e0e0"],
        behavior: behaviors.POWDER,
        category: "powders",
        burn: 40,
        burnTime: 200,
        fireColor: ["#ff00ee", "#ff6bf5"],
        tempHigh: 292,
        state: "solid",
        density: 3980,
        hidden: true
    },
    "sodium_acetate": {
        color: ["#ededed", "#dbdbdb"],
        behavior: [
            "XX|XX|XX",
            "XX|XX|XX",
            "M2|M1|M2",
        ],
        tick: function (pixel) {
            if ((pixel.foam || Math.random() < 0.25) && isEmpty(pixel.x, pixel.y - 1)) {
                createPixel("foam", pixel.x, pixel.y - 1);
                if (pixel.foam) {
                    pixelMap[pixel.x][pixel.y - 1].foam = pixel.foam;
                }
            }
        },
        hidden: true,
        state: "solid",
        density: 1530,
        category: "powders",
        tempHigh: 881.4
    },
    "lightning": {
        color: "#ffffed",
        tick: function (pixel) {
            if (!pixel.stage) { // create bolt
                var y = pixel.y;
                var xoffset = 0;
                var last = [pixel.x, pixel.y]
                for (var i = 0; i < 100; i++) {
                    y++;
                    // randomly go back and forth
                    if (Math.random() > 0.5) { xoffset++; }
                    else { xoffset--; }
                    var x = pixel.x + xoffset;
                    if (isEmpty(x, y)) {
                        createPixel("lightning", x, y);
                        pixelMap[x][y].stage = 1;
                        pixelMap[x][y].color = pixel.color;
                        last = [x, y];
                    }
                    else if (outOfBounds(x, y) || !elements[pixelMap[x][y].element].isGas) {
                        //strike
                        if (Math.random() < 0.01) { // BALL LIGHTNING
                            pixelMap[last[0]][last[1]].stage = 9;
                        }
                        if (!outOfBounds(x, y)) { pixelMap[x][y].temp = 27760 }
                        explodeAt(x, y, 13, ["plasma", "plasma", "plasma", "electric"]);
                        break;
                    }
                }
                doDefaults(pixel);
                deletePixel(pixel.x, pixel.y);
            }
            else if (pixel.stage === 9) { // BALL LIGHTNING
                // move either left or right randomly
                if (Math.random() > 0.5) { tryMove(pixel, pixel.x + 1, pixel.y) }
                else { tryMove(pixel, pixel.x - 1, pixel.y) }
                // create electric in a 3x3 area around pixel
                for (var x = pixel.x - 1; x <= pixel.x + 1; x++) {
                    for (var y = pixel.y - 1; y <= pixel.y + 1; y++) {
                        if (isEmpty(x, y)) {
                            createPixel("electric", x, y);
                            pixelMap[x][y].color = pixel.color;
                        }
                    }
                }
                doDefaults(pixel);
                if (pixelTicks - pixel.start >= 250) { deletePixel(pixel.x, pixel.y); }
            }
            else if (pixelTicks - pixel.start >= 4) {
                doDefaults(pixel);
                //deletePixel(pixel.x, pixel.y);
                changePixel(pixel, "electric")
            }
            else { doDefaults(pixel); }
        },
        temp: 27760,
        tempLow: -273,
        stateLow: ["liquid_light", null],
        category: "energy",
        state: "gas",
        maxSize: 1,
        cooldown: defaultCooldown,
        density: 1000,
        hardness: 1,
        excludeRandom: true,
        noMix: true
    },
    "bless": {
        color: ["#ffffff", "#fffa9c", "#00ffff"],
        tool: function (pixel) {
            if (elements.bless.ignore.indexOf(pixel.element) !== -1) { return; }
            if (pixel.burning) { // stop burning
                delete pixel.burning;
                delete pixel.burnStart;
            }
            if (pixel.temp > 100) {
                pixel.temp = (pixel.temp + 100) / 2;
                pixelTempCheck(pixel);
                if (pixel.del) { return }
            }
            if (pixel.temp < -200) {
                pixel.temp = (pixel.temp - 200) / 2;
                pixelTempCheck(pixel);
                if (pixel.del) { return }
            }
            if (pixel.origColor) {
                pixel.color = "rgb(" + pixel.origColor.join(",") + ")";
                delete pixel.origColor;
            }
            if (pixel.charge) {
                delete pixel.charge;
                pixel.chargeCD = 16;
            }
            if (elements.bless.reactions[pixel.element] && Math.random() < 0.25) {
                var r = elements.bless.reactions[pixel.element];
                var elem2 = r.elem2;
                if (elem2 !== undefined) {
                    if (Array.isArray(elem2)) { elem2 = elem2[Math.floor(Math.random() * elem2.length)]; }
                    if (elem2 === null) { deletePixel(pixel.x, pixel.y) }
                    else { changePixel(pixel, elem2); }
                }
            }
        },
        ignore: ["sun"],
        behavior: [
            "M2|M1|M2",
            "M1|DL%25|M1",
            "M2|M1|M2",
        ],
        reactions: {
            "cancer": { elem2: null },
            "rust": { elem2: "iron" },
            "oxidized_copper": { elem2: "copper" },
            "blood": { elem2: ["antibody", null] },
            "blood_ice": { elem2: "antibody_ice" },
            "dirty_water": { elem2: "water" },
            "plague": { elem2: null },
            "virus": { elem2: null },
            "filler": { elem2: "wall" },
            "armageddon": { elem2: null },
            "lattice": { elem2: "wall" },
            "vertical": { elem2: "wall" },
            "horizontal": { elem2: "wall" },
            "gray_goo": { elem2: "malware" },
            "infection": { elem2: ["antibody", null] },
            "antibody": { elem2: ["antibody", null] },
            "infection_ice": { elem2: "antibody_ice" },
            "poison": { elem2: "antidote" },
            "rotten_meat": { elem2: "meat" },
            "rotten_cheese": { elem2: "cheese" },
            "carbon_dioxide": { elem2: "oxygen" },
            "acid": { elem2: "hydrogen" },
            "acid_gas": { elem2: "hydrogen" },
            "acid_cloud": { elem2: "rain_cloud" },
            "fire_cloud": { elem2: "cloud" },
            "ash": { elem2: null },
            "molten_ash": { elem2: null },
            "pyrocumulus": { elem2: null },
            "cyanide": { elem2: null },
            "cyanide_gas": { elem2: null },
            "ammonia": { elem2: null },
            "liquid_ammonia": { elem2: null },
            "dioxin": { elem2: null },
            "stench": { elem2: null },
            "fragrance": { elem2: null },
            "chlorine": { elem2: null },
            "anesthesia": { elem2: null },
            "oil": { elem2: null },
            "bleach": { elem2: null },
            "soda": { elem2: "seltzer" },
            "ink": { elem2: null },
            "dye": { elem2: null },
            "cancer": { elem2: null },
            "rat": { elem2: null },
            "flea": { elem2: null },
            "termite": { elem2: null },
            "smog": { elem2: "cloud" },
            "mercury": { elem2: null },
            "slime": { elem2: null },
            "broth": { elem2: "water" },
            "fire": { elem2: "bless" },
            "plasma": { elem2: "bless" },
            "grenade": { elem2: "metal_scrap" },
            "flashbang": { elem2: "metal_scrap" },
            "cluster_bomb": { elem2: "metal_scrap" },
            "smoke_grenade": { elem2: "metal_scrap" },
            "greek_fire": { elem2: "smoke" },
            "nitro": { elem2: null },
            "smoke": { elem2: null },
            "lightning": { elem2: null },
            "electric": { elem2: null },
            "positron": { elem2: null },
            "antimatter": { elem2: null },
            "neutron": { elem2: null },
            "proton": { elem2: null },
            "radiation": { elem2: "flash" },
            "uranium": { elem2: "rock" },
            "magma": { elem2: "rock" },
            "mercury": { elem2: null },
            "mercury_gas": { elem2: null },
            "solid_mercury": { elem2: null },
            "ice_nine": { elem2: "ice" },
            "strange_matter": { elem2: "neutron" },
            "frozen_frog": { elem2: "frog" },
            "frozen_worm": { elem2: "worm" },
            "molten_thermite": { elem2: "rock" },
            "rad_glass": { elem2: "glass" },
            "rad_shard": { elem2: "glass_shard" },
            "rad_steam": { elem2: "steam" },
            "fallout": { elem2: null },
            "rad_cloud": { elem2: "rain_cloud" },
            "fireball": { elem2: "ball" },
            "bone_marrow": { elem2: "bone" },
            "fly": { elem2: null },
            "dead_bug": { elem2: null },
            "dead_plant": { elem2: "plant" },
            "slag": { elem2: "rock" },
            "molten_slag": { elem2: "magma" },
            "laser": { elem2: "light" },
            "light": { elem2: "flash" },
            "torch": { elem2: "wood" },
            "explosion": { elem2: null },
            "n_explosion": { elem2: null },
            "supernova": { elem2: null },
            "pop": { elem2: null },
            "ember": { elem2: null },
            "fw_ember": { elem2: null },
            "pollen": { elem2: null },
            "lead": { elem2: "gold" },
            "molten_lead": { elem2: "molten_gold" },
            "dirt": { elem1: "grass", oneway: true },
        },
        temp: 20,
        state: "gas",
        density: 0.001,
        canPlace: true,
        category: "energy",
        stain: -0.5
    },
    "god_ray": {
        color: ["#ffffff", "#ffee57"],
        tick: function (pixel) {
            var x = pixel.x;
            for (var y = pixel.y + 1; y < height; y++) {
                if (outOfBounds(x, y)) {
                    break;
                }
                if (isEmpty(x, y)) {
                    if (Math.random() > 0.1) { continue }
                    createPixel("flash", x, y);
                }
                else {
                    if (elements[pixelMap[x][y].element].id === elements.flash.id) { continue }
                    if (elements[pixelMap[x][y].element].id === elements.god_ray.id) { break }
                    if (!elements[pixelMap[x][y].element].isGas && isEmpty(x, y - 1)) {
                        createPixel("bless", x, y - 1);
                    }
                    if (Math.random() > 0.1) { continue }
                    elements.bless.tool(pixelMap[x][y])
                }
            }
            deletePixel(pixel.x, pixel.y);
        },
        category: "energy",
        state: "gas",
        excludeRandom: true,
        noMix: true
    },
    "heat_ray": {
        color: ["#ff0000", "#ff5e00"],
        tick: function (pixel) {
            var x = pixel.x;
            for (var y = pixel.y; y < height; y++) {
                if (outOfBounds(x, y)) {
                    break;
                }
                if (isEmpty(x, y)) {
                    if (Math.random() > 0.05) { continue }
                    createPixel("flash", x, y);
                    pixelMap[x][y].color = "#ff0000";
                }
                else {
                    if (elements[pixelMap[x][y].element].isGas) { continue }
                    if (elements[pixelMap[x][y].element].id === elements.heat_ray.id) { break }
                    pixelMap[x][y].temp += 100;
                    break;
                }
            }
            deletePixel(pixel.x, pixel.y);
        },
        temp: 3500,
        category: "energy",
        state: "gas",
        excludeRandom: true,
        noMix: true
    },
    "explosion": {
        color: ["#ffb48f", "#ffd991", "#ffad91"],
        behavior: [
            "XX|XX|XX",
            "XX|EX:10|XX",
            "XX|XX|XX",
        ],
        temp: 300,
        category: "energy",
        state: "gas",
        density: 1000,
        excludeRandom: true,
        noMix: true
    },
    "n_explosion": {
        color: ["#ffb48f", "#ffd991", "#ffad91"],
        behavior: [
            "XX|XX|XX",
            "XX|EX:40>plasma,plasma,plasma,plasma,radiation,rad_steam|XX",
            "XX|XX|XX",
        ],
        temp: 100000000,
        category: "energy",
        state: "gas",
        density: 1000,
        excludeRandom: true,
        hidden: true,
        alias: "nuclear explosion",
        noMix: true
    },
    "supernova": {
        color: ["#ffb48f", "#ffd991", "#ffad91"],
        behavior: [
            "XX|XX|XX",
            "XX|EX:80>plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,molten_iron,molten_uranium,molten_lead AND CH:void|XX",
            "XX|XX|XX",
        ],
        temp: 99999999700,
        category: "energy",
        state: "gas",
        density: 1000,
        hardness: 1,
        hidden: true,
        excludeRandom: true,
        maxSize: 1,
        noMix: true
    },
    "pop": {
        color: ["#ffb48f", "#ffd991", "#ffad91"],
        behavior: [
            "XX|XX|XX",
            "XX|EX:3|XX",
            "XX|XX|XX",
        ],
        category: "energy",
        state: "gas",
        density: 1000,
        excludeRandom: true,
        hidden: true,
        noMix: true
    },
    "cook": {
        color: ["#5c3322", "#2b1107", "#5c3322", "#5c3322", "#2b1107", "#5c3322"],
        tool: function (pixel) {
            if (!shiftDown) {
                pixel.temp += 0.5;
                pixelTempCheck(pixel);
            }
            else {
                pixel.temp += 1;
                pixelTempCheck(pixel);
            }
        },
        category: "energy",
        excludeRandom: true
    },
    "incinerate": {
        color: ["#e600ff", "#d984d8", "#ff00e1"],
        tool: function (pixel) {
            pixel.temp += 10000;
            if (!pixel.burning && elements[pixel.element].burn) {
                pixel.burning = true;
                pixel.burnStart = pixelTicks;
            }
            pixelTempCheck(pixel);
        },
        category: "energy",
        excludeRandom: true
    },
    "room_temp": {
        color: "#b1c96d",
        tool: function (pixel) {
            pixel.temp = (pixel.temp + 20) / 2;
            pixelTempCheck(pixel);
        },
        category: "energy",
        excludeRandom: true
    },
    "positron": {
        color: "#a6bfff",
        behavior: [
            "M1%15 AND CL%6|M1%50 AND CL%13|M1%15 AND CL%6",
            "CL%5|DL%50|CL%5",
            "CL%5|CL%5|CL%5",
        ],
        reactions: {
            "electric": { elem1: "explosion", elem2: "explosion" }
        },
        category: "energy",
        state: "gas",
        density: 2.1,
        insulate: true,
        hidden: true,
        ignoreAir: true
    },
    "tnt": {
        color: "#c92a2a",
        behavior: behaviors.WALL,
        behaviorOn: [
            "XX|XX|XX",
            "XX|EX:10|XX",
            "XX|XX|XX",
        ],
        conduct: 1,
        category: "weapons",
        burn: 100,
        burnTime: 1,
        burnInto: "explosion",
        tempHigh: 600,
        stateHigh: "explosion",
        state: "solid",
        density: 1630,
        excludeRandom: true,
        alias: "trinitrotoluene"
    },
    "c4": {
        name: "C-4",
        color: ["#d7c1a1", "#c8a77c"],
        behavior: behaviors.STURDYPOWDER,
        behaviorOn: [
            "XX|XX|XX",
            "XX|EX:10|XX",
            "XX|M1|XX",
        ],
        conduct: 1,
        category: "weapons",
        burn: 100,
        burnTime: 1,
        burnInto: "explosion",
        tempHigh: 600,
        stateHigh: "explosion",
        state: "solid",
        density: 1630,
        excludeRandom: true
    },
    "grenade": {
        color: "#5e5c57",
        behavior: [
            "XX|EX:6>metal_scrap,fire,fire,fire%1|XX",
            "XX|XX|XX",
            "M2|M1 AND EX:6>metal_scrap,fire,fire,fire%1|M2",
        ],
        behaviorOn: [
            "XX|XX|XX",
            "XX|EX:6>metal_scrap,fire,fire,fire%1|XX",
            "XX|XX|XX",
        ],
        category: "weapons",
        state: "solid",
        density: 1300,
        tempHigh: 1455.5,
        stateHigh: "molten_steel",
        excludeRandom: true,
        conduct: 1,
        cooldown: defaultCooldown,
        nocheer: true
    },
    "dynamite": {
        color: ["#de5050", "#c92a2a", "#a61919"],
        behavior: behaviors.POWDER,
        behaviorOn: [
            "XX|XX|XX",
            "XX|CH:explosion|XX",
            "XX|XX|XX",
        ],
        conduct: 1,
        category: "weapons",
        tempHigh: 600,
        stateHigh: "explosion",
        burn: 100,
        burnTime: 1,
        burnInto: "explosion",
        state: "solid",
        density: 1300,
        breakInto: "explosion",
        excludeRandom: true
    },
    "gunpowder": {
        color: ["#929980", "#757767", "#423d43"],
        behavior: behaviors.POWDER,
        category: "weapons",
        burn: 100,
        burnTime: 1,
        burnInto: "explosion",
        tempHigh: 600,
        stateHigh: "explosion",
        state: "solid",
        density: 1700,
        excludeRandom: true
    },
    "ember": {
        color: ["#ffe985", "#ffd885", "#ffc285"],
        behavior: [
            "XX|M1|M1",
            "XX|XX|XX",
            "XX|XX|XX",
        ],
        flippableX: true,
        category: "energy",
        temp: 300,
        tempLow: 0,
        stateLow: "ash",
        burn: 10,
        burnTime: 10,
        burnInto: "ash",
        burning: true,
        state: "gas",
        density: 700,
        hidden: true
    },
    "firework": {
        color: "#c44f45",
        tick: function (pixel) {
            if (pixel.burning) {
                if (!tryMove(pixel, pixel.x, pixel.y - 1)) {
                    // tryMove again to the top left or top right
                    tryMove(pixel, pixel.x + (Math.random() < 0.5 ? -1 : 1), pixel.y - 1);
                }
                if (pixelTicks - pixel.burnStart > 50 && Math.random() < 0.1) {
                    explodeAt(pixel.x, pixel.y, 10, "fw_ember");
                }
            }
            else {
                if (!tryMove(pixel, pixel.x, pixel.y + 1)) {
                    // tryMove again to the bottom left or bottom right
                    tryMove(pixel, pixel.x + (Math.random() < 0.5 ? -1 : 1), pixel.y + 1);
                }
            }
        },
        burn: 90,
        burnTime: 100,
        density: 2000,
        state: "solid",
        category: "weapons"
    },
    "fw_ember": {
        color: ["#ff7a70", "#ff9b70", "#ffe270", "#94ff70", "#00ffff", "#9b70ff", "#ffa8d2"],
        behavior: [
            "XX|XX|XX",
            "XX|DL%25|M2",
            "XX|M2|M1",
        ],
        name: "firework ember",
        burning: true,
        burnInto: "ash",
        fireElement: "carbon_dioxide",
        rotatable: true,
        temp: 649,
        tempLow: 0,
        stateLow: "carbon_dioxide",
        category: "energy",
        hidden: true,
        state: "gas",
        density: 700,
        alias: "firework ember"
    },
    "nuke": {
        color: "#534636",
        behavior: [
            "XX|EX:60>plasma,plasma,plasma,plasma,radiation,rad_steam|XX",
            "XX|XX|XX",
            "M2|M1 AND EX:60>plasma,plasma,plasma,plasma,radiation,rad_steam|M2",
        ],
        category: "weapons",
        state: "solid",
        density: 1500,
        excludeRandom: true,
        cooldown: defaultCooldown
    },
    "h_bomb": {
        color: "#533636",
        behavior: [
            "XX|EX:90>plasma,plasma,plasma,plasma,fire|XX",
            "XX|XX|XX",
            "M2|M1 AND EX:90>plasma,plasma,plasma,plasma,fire|M2",
        ],
        category: "weapons",
        state: "solid",
        density: 1600,
        excludeRandom: true,
        alias: "hydrogen bomb",
        cooldown: defaultCooldown
    },
    "dirty_bomb": {
        color: "#415336",
        behavior: [
            "XX|EX:40>radiation,radiation,radiation,rad_steam|XX",
            "XX|XX|XX",
            "M2|M1 AND EX:40>radiation,radiation,radiation,rad_steam|M2",
        ],
        category: "weapons",
        state: "solid",
        density: 1400,
        excludeRandom: true,
        cooldown: defaultCooldown
    },
    "emp_bomb": {
        color: "#418273",
        tick: function (pixel) {
            if (pixel.start === pixelTicks) { return }
            if (!tryMove(pixel, pixel.x, pixel.y + 1)) {
                if (outOfBounds(pixel.x, pixel.y + 1) || (pixelMap[pixel.x][pixel.y + 1].element !== "emp_bomb" && elements[pixelMap[pixel.x][pixel.y + 1].element].state !== "gas")) {
                    for (i = 0; i < currentPixels.length; i++) {
                        var newPixel = currentPixels[i];
                        if (newPixel.charge) {
                            delete newPixel.charge;
                            newPixel.chargeCD = 16;
                        }
                    }
                    explodeAt(pixel.x, pixel.y + 1, 20, "flash");
                }
            }
            doDefaults(pixel);
        },
        category: "weapons",
        state: "solid",
        density: 1400,
        excludeRandom: true,
        alias: "electromagnetic pulse bomb",
        cooldown: defaultCooldown
    },
    "nitro": {
        color: "#47c900",
        behavior: behaviors.LIQUID,
        behaviorOn: [
            "XX|XX|XX",
            "XX|EX:10|XX",
            "XX|XX|XX",
        ],
        conduct: 1,
        category: "weapons",
        tempHigh: 600,
        stateHigh: "fire",
        tempLow: 14,
        stateLowName: "frozen_nitro",
        burn: 100,
        burnTime: 1,
        burnInto: "explosion",
        viscosity: 36,
        state: "liquid",
        density: 1600,
        excludeRandom: true,
        alias: "nitroglycerin"
    },
    "greek_fire": {
        color: ["#4a3923", "#594933", "#78654a"],
        behavior: behaviors.LIQUID,
        category: "weapons",
        tempHigh: 4000,
        stateHigh: "fire",
        burn: 100,
        burnTime: 1500,
        burnInto: "fire",
        burning: true,
        temp: 500,
        insulate: true,
        viscosity: 2,
        state: "liquid",
        density: 498.5,
        excludeRandom: true
    },
    "sticky_bomb": {
        color: "#233096",
        behavior: [
            "XX|ST AND EX:10%2|XX",
            "ST AND EX:10%2|XX|ST AND EX:10%2",
            "XX|M1 AND ST AND EX:10%2|XX",
        ],
        category: "weapons",
        state: "solid",
        density: 1300,
        tempHigh: 1455.5,
        stateHigh: ["molten_steel", "slime"],
        excludeRandom: true,
        cooldown: defaultCooldown
    },
    "cold_bomb": {
        color: "#43646e",
        behavior: [
            "XX|EX:10>cold_fire|XX",
            "XX|XX|XX",
            "M2|M1 AND EX:10>cold_fire|M2",
        ],
        category: "weapons",
        state: "solid",
        density: 1300,
        tempHigh: 1455.5,
        stateHigh: "molten_steel",
        excludeRandom: true,
        cooldown: defaultCooldown
    },
    "hot_bomb": {
        color: "#6c436e",
        behavior: [
            "XX|HT:20000 AND EX:15>plasma|XX",
            "XX|XX|XX",
            "M2|M1 AND HT:20000 AND EX:15>plasma|M2",
        ],
        category: "weapons",
        state: "solid",
        density: 1300,
        tempHigh: 10455.5,
        stateHigh: "molten_steel",
        excludeRandom: true,
        cooldown: defaultCooldown
    },
    "electro_bomb": {
        color: "#6e6d43",
        behavior: [
            "XX|EX:10>electric|XX",
            "XX|XX|XX",
            "M2|M1 AND EX:10>electric|M2",
        ],
        category: "weapons",
        state: "solid",
        density: 1300,
        tempHigh: 1655.5,
        stateHigh: "molten_steel",
        excludeRandom: true,
        cooldown: defaultCooldown
    },
    "water_bomb": {
        color: "#34599e",
        behavior: [
            "XX|EX:10>water|XX",
            "XX|XX|XX",
            "M2|M1 AND EX:10>water|M2",
        ],
        category: "weapons",
        state: "solid",
        density: 1300,
        tempHigh: 1455.5,
        stateHigh: "molten_steel",
        excludeRandom: true,
        cooldown: defaultCooldown
    },
    "antimatter_bomb": {
        color: "#6e4343",
        behavior: [
            "XX|EX:20>antimatter|XX",
            "XX|XX|XX",
            "M2|M1 AND EX:20>antimatter|M2",
        ],
        category: "weapons",
        state: "solid",
        density: 1300,
        tempHigh: 10455.5,
        stateHigh: "molten_steel",
        excludeRandom: true,
        cooldown: defaultCooldown
    },
    "party_popper": {
        color: ["#dc2c37", "#edce66", "#0dbf62", "#0679ea", "#7144b2", "#d92097"],
        behavior: [
            "XX|EX:15>confetti,flash,flash,smoke|XX",
            "XX|XX|XX",
            "M2|M1 AND EX:15>confetti,flash,flash,smoke|M2",
        ],
        category: "weapons",
        state: "solid",
        density: 1300,
        excludeRandom: true,
        cooldown: defaultCooldown
    },
    "flashbang": {
        color: "#65665c",
        behavior: [
            "XX|EX:20>flash%1|XX",
            "XX|XX|XX",
            "M2|M1 AND EX:20>flash%1|M2",
        ],
        category: "weapons",
        state: "solid",
        density: 1300,
        tempHigh: 1455.5,
        stateHigh: "molten_steel",
        excludeRandom: true,
        cooldown: defaultCooldown
    },
    "flash": {
        color: "#fffdcf",
        tick: function (pixel) {
            if (Math.random() < 0.75 && pixelTicks - pixel.start > 1) {
                deletePixel(pixel.x, pixel.y)
            }
        },
        reactions: {
            "blood": { elem1: "pointer" },
            "molten_stained_glass": { elem1: "rainbow" },
            "gray_goo": { elem1: "static" }
        },
        category: "energy",
        temp: 40,
        tempLow: -273,
        stateLow: ["liquid_light", null],
        state: "gas",
        density: 1,
        tempLow: -270,
        stateLow: "light",
        hidden: true,
        noMix: true
    },
    "smoke_grenade": {
        color: "#65665c",
        behavior: [
            "XX|CR:smoke|XX",
            "XX|EX:4>smoke%1|XX",
            "M2|M1|M2",
        ],
        category: "weapons",
        state: "solid",
        density: 7300,
        conduct: 0.73,
        tempHigh: 1455.5,
        stateHigh: "molten_steel",
        excludeRandom: true,
        cooldown: defaultCooldown,
        nocheer: true
    },
    "fireball": {
        color: ["#782828", "#783b28", "#784b28"],
        behavior: [
            "XX|CR:fire%25|XX",
            "XX|CC:782828,783b28,784b28%25|XX",
            "M2|M1 AND EX:8|M2",
        ],
        reactions: {
            "water": { elem1: "rock", elem2: "steam" }
        },
        category: "weapons",
        temp: 600,
        tempLow: -100,
        stateLow: "rock",
        burning: true,
        burnInto: ["rock", "rock", "steam"],
        burnTime: 170,
        burn: 100,
        state: "solid",
        density: 1600,
        excludeRandom: true,
        cooldown: defaultCooldown
    },
    "landmine": {
        color: "#856c7d",
        behavior: [
            "XX|EX:20|XX",
            "XX|XX|XX",
            "XX|M1|XX",
        ],
        category: "weapons",
        state: "solid",
        density: 1300,
        tempHigh: 1455.5,
        stateHigh: "molten_steel",
        excludeRandom: true,
        cooldown: defaultCooldown,
        nocheer: true
    },
    "cluster_bomb": {
        color: "#7d776d",
        behavior: [
            "XX|EX:10>smoke,smoke,smoke,smoke,smoke,grenade|XX",
            "XX|XX|XX",
            "M2|M1 AND EX:10>smoke,smoke,smoke,smoke,smoke,grenade|M2",
        ],
        category: "weapons",
        state: "solid",
        density: 1300,
        tempHigh: 1455.5,
        stateHigh: "molten_steel",
        excludeRandom: true,
        cooldown: defaultCooldown
    },
    "armageddon": {
        color: "#a62900",
        behavior: [
            "XX|XX|XX",
            "XX|EX:10>armageddon,fire,fire,fire,fire,fire,fire,fire,fire,fire,fire,fire,fire%25 AND DL%10|XX",
            "XX|XX|XX",
        ],
        category: "weapons",
        state: "solid",
        density: 1300,
        hidden: true,
        excludeRandom: true,
        maxSize: 1,
        cooldown: defaultCooldown
    },
    "tesla_coil": {
        color: "#725c38",
        behavior: behaviors.WALL,
        behaviorOn: [
            "XX|CR:plasma|XX",
            "CR:plasma|XX|CR:plasma",
            "XX|CR:plasma|XX",
        ],
        category: "machines",
        conduct: 1,
        insulate: true,
        temp: 7065
    },
    "light_bulb": {
        color: "#a8a897",
        behavior: behaviors.WALL,
        behaviorOn: [
            "XX|CR:light|XX",
            "CR:light|XX|CR:light",
            "XX|CR:light|XX",
        ],
        colorOn: "#ebebc3",
        category: "machines",
        tempHigh: 1500,
        stateHigh: ["molten_glass", "molten_glass", "molten_copper"],
        conduct: 1,
        breakInto: "glass_shard"
    },
    "shocker": {
        color: "#78784c",
        behavior: behaviors.WALL,
        behaviorOn: [
            "XX|CR:electric AND SH|XX",
            "CR:electric AND SH|XX|CR:electric AND SH",
            "XX|CR:electric AND SH|XX",
        ],
        colorOn: "#ffff59",
        category: "machines",
        conduct: 1
    },
    "pressure_plate": {
        color: "#8a8a84",
        tick: function (pixel) {
            if (!isEmpty(pixel.x, pixel.y - 1, true)) {
                if (pixelMap[pixel.x][pixel.y - 1].element != "pressure_plate" || pixelMap[pixel.x][pixel.y - 1].on) {
                    pixel.on = true;
                    var coordsToShock = [
                        [pixel.x, pixel.y + 1],
                        [pixel.x + 1, pixel.y],
                        [pixel.x - 1, pixel.y],
                    ]
                    for (var i = 0; i < coordsToShock.length; i++) {
                        var x = coordsToShock[i][0];
                        var y = coordsToShock[i][1];
                        if (!isEmpty(x, y, true)) {
                            var newpixel = pixelMap[x][y];
                            if (elements[newpixel.element].conduct) {
                                newpixel.charge = 1;
                            }
                        }
                    }
                }
            }
            else if (pixel.on) {
                pixel.on = false;
            }
            tryMove(pixel, pixel.x, pixel.y + 1);
        },
        category: "machines"
    },
    "primordial_soup": {
        color: ["#501f24", "#6d2e1d"],
        behavior: [
            "XX|CR:foam%2|XX",
            "M2|CH:algae,cell,mushroom_spore,lichen,yeast,antibody,cellulose,seltzer,oxygen%0.005|M2",
            "M1|M1|M1",
        ],
        behaviorOn: [
            "XX|CR:foam%25|XX",
            "M2|CH:algae,cell,mushroom_spore,lichen,yeast,antibody,cellulose,seltzer,oxygen%5|M2",
            "M1|M1|M1",
        ],
        reactions: {
            "cancer": { elem1: "dirty_water" },
            "cyanide": { elem1: "dirty_water" },
            "cyanide_gas": { elem1: "dirty_water" },
            "infection": { elem1: "dirty_water" },
            "plague": { elem1: "dirty_water" },
            "bleach": { elem1: "dirty_water" },
            "poison": { elem1: "dirty_water" },
            "ammonia": { elem1: ["algae", "cell", "mushroom_spore", "lichen", "yeast", "antibody"], chance: 0.05 },
            "radiation": { elem1: ["algae", "cell", "mushroom_spore", "lichen", "yeast", "antibody"], chance: 0.15 },
            "light": { elem1: ["algae", "cell", "mushroom_spore", "lichen", "yeast", "antibody"], chance: 0.5 },
            "carbon_dioxide": { elem2: "oxygen" },
            "dirt": { elem2: "mud", chance: 0.2 },
            "sand": { elem2: "wet_sand", chance: 0.2 },
            "rock": { elem2: "wet_sand", chance: 0.001 }
        },
        category: "life",
        tempHigh: 100,
        stateHigh: "steam",
        conduct: 0.05,
        state: "liquid",
        density: 955,
        stain: -0.1
    },
    "molten_slag": {
        ignore: ["salt", "plastic", "sulfur", "epsom_salt", "potassium_salt", "borax", "solder", "ash"]
    },
    "molten_dirt": {
        stateLow: "mudstone"
    },
    "debug": {
        color: ["#b150d4", "#d1b74f"],
        tool: function (pixel) {
            mouseIsDown = false;
            shiftDown = false;
            var output = pixel.element.toUpperCase() + " at x" + pixel.x + ", y" + pixel.y + ", tick" + pixelTicks + "\n";
            for (var i in pixel) {
                if (i !== "x" && i !== "y" && i !== "element") {
                    output += "  " + i + ": " + pixel[i] + "\n";
                }
            }
            console.log(output);
            alert(output);
            lastDebug = pixelTicks;
        },
        maxSize: 1,
        category: "special"
    },
    //ice color: "#c5e9f0"
    "salt_ice": { color: "#b6ced4" },
    "sugar_ice": { color: "#c8dee3" },
    "seltzer_ice": { color: "#a7c4c9" },
    "dirty_ice": { color: "#a9d9c7" },
    "pool_ice": { color: "#c0eff0" },
    "blood_ice": { color: "#ff7070" },
    "antibody_ice": { color: "#ff8080" },
    "infection_ice": { color: "#ff7090" },

};