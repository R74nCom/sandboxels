/* 
Use intellisense for sandboxels modding here:
    to show availavle functions and show global variables
    https://github.com/R74nCom/sandboxels-types
*/


// Changelog
/*
V1
Solids: Aerogel, Nordic Gold, Nordic Gold coin, Pyrite
Machines: Disco Ball
Extras: Fire Extinguisher Powder

V2
Machines: Button, Disco Floor, Faulty Wire, Randomizer,
Tools: Press, Circle
Solids: Cardboard, Obsidian
Powders: Glow Stick, Obsidian Shard
Liquids: Glow Stick Liquid, Lighter fluid, Gasoline
Life: Mold, Moss, 
Gases: Lighter Fluid Gas
Food: Pie, Pie Crust

V3
Tools: RGB LED, Dice, Custom Bomb
Life: Pineapple Plants (seed, stem, fruit)
Hazards: Lithium Battery, Lithium, Rubidium, Asbestos
Minerals: Chalk, Chalk Powder, Lapis Lazuli
Light: UV Light, Phosphor, Neon Tube
Extras: Realistic Ball

V3.1
Bug Fixes
Chalk powder, Wet chalk poeder, and Obsidian shard can now be glued back as intended.
Dog can now be smashed correctly.
Steam support with promptInput() instead of prompt()

V3.2
Machines: Robot, Adjustable heater/cooler

Bug Fixes
Fixed compatibility issue with nousersthings.js

V4
Machines: Paper filter, Indestructable filter, and Note block
Life: Cacao Plants (seed, stem, fruit)
Tools: Polish
Extras: 2 ways to make an element with no name
Special: Black hole
Building Materials: Roman concrete/cement

V5
Machines: Random Teleporter
Life: Carrot seed and fruit
Minerals: Quartz and Quartz powder
Special: Random Word Generator, Fill all,
Element fill all, Pulsing Color, Element line, White hole

Changes:
    Moved sandstone to land category

Technical:
    New helpers for squareCoords and adjacentCoords
    Rainbow color preset
*/
let globals = {
    circleRad: 7,
    circleElem: "wood",
    red: randomIntInRange(0, 255),
    green: randomIntInRange(0, 255),
    blue: randomIntInRange(0, 255),
    explodeElem: "fire",
    adjusted_heater_temp: 100
}

const rainbowColor = ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"]

elements.button = {
    color: "#970000",
    conduct: 1,
    charge: 0,
    category: "machines",
    behavior: behaviors.WALL,
    state: "solid",
    onSelect: function () {
        logMessage("Click the button with no elements equipped to charge the button.")
    },
    properties: {
        clicked: false,
        clickTime: 1,
    },
    onClicked: function (pixel) {
        pixel.clicked = true
        pixel.clickTime = 1
    },
    tick: function (pixel) {
        if (pixel.clicked == true && pixel.clickTime > 0) {
            pixel.charge = 1
            pixel.clickTime--
        }
        else if (pixel.clicked == true && pixel.clickTime <= 0) {
            pixel.clicked = false
            pixel.charge = 0
        }
    }
}


function isPressable(pixel) {
    if (elements[pixel.element].pressInto !== undefined) return true;
}

elements.aerogel = {
    color: "#79ffff",
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    tempHigh: 1200,
    stateHigh: "ash",
    insulate: true,
    density: 0.2,
    hardness: 0.1,
    breakInto: "dust",
    onPlace: function (pixel) {
        if (pixel.alpha === undefined) { pixel.alpha = Math.random() * (0.5 - 0.4) + 0.4 }
    }
}

let oldCopperReactions = elements.copper.reactions
elements.molten_copper.reactions.molten_aluminum = { elem1: "molten_nordic_gold", elem2: null, chance: 0.5 }
elements.acid.ignore.push("nordic_gold")
elements.acid.ignore.push("nordic_gold_coin")

elements.nordic_gold = {
    color: ["#f1db7c", "#e5c34b", "#d2a742", "#b98c31", "#a47320"],
    tempHigh: 1060,
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 8800,
    conduct: 0.90,
    breakInto: "nordic_gold_coin"
}

elements.nordic_gold_coin = {
    color: ["#f1db7c", "#e5c34b", "#d2a742", "#b98c31", "#a47320"],
    tempHigh: 1060,
    stateHigh: "molten_nordic_gold",
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 8800,
    conduct: 0.90,
    alias: "euro_coin",
    reactions: {
        "glue": { elem1: "nordic_gold", elem2: null }
    }
}

function randomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

elements.disco_ball = {
    color: "#ebebc3",
    buttonColor: rainbowColor,
    renderer: renderPresets.LED,
    behavior: behaviors.WALL,
    category: "machines",
    tempHigh: 1500,
    stateHigh: ["molten_glass", "molten_glass", "molten_copper"],
    conduct: 1,
    breakInto: "glass_shard",
    forceSaveColor: true,
    tick: function (pixel) {
        if (!pixel.charge) {
            pixel.charge = 0
        }
        for (var i = 0; i < squareCoords.length; i++) {
            var coord = squareCoords[i];
            var x = pixel.x + coord[0];
            var y = pixel.y + coord[1];
            if (pixel.charge > 0) {
                pixel.color = randomColor()
                if (isEmpty(x, y)) {
                    createPixel("light", x, y)
                    let p = getPixel(x, y)
                    if (p !== null && p.element == "light") {
                        p.color = pixel.color
                    }
                }
            }
            else { pixel.color = "#ebebc3" }
        }
    },
    state: "solid"
}

elements.molten_iron.reactions.sulfur = { elem1: "pyrite", elem2: null, chance: 0.25 }
elements.molten_iron.reactions.molten_sulfur = { elem1: "pyrite", elem2: null, chance: 0.25 }
elements.molten_iron.reactions.sulfur_gas = { elem1: "pyrite", elem2: null, chance: 0.25 }

elements.cubesstuff_pyrite = {
    color: ["#d8c25e", "#bbaa49", "#998f3e"],
    alias: ["fools_gold", "Iron Disulfide"],
    density: 5000,
    tempHigh: 1177,
    stateHigh: ["iron", "molten_sulfur"],
    grain: 0.4,
    state: "solid",
    behavior: behaviors.WALL,
    category: "deprecated"
}

elements.fire_extinguisher_powder = {
    color: "#ececec",
    behavior: [
        "XX|XX|XX",
        "XX|DL%1|XX",
        "M2%30|M1%30|M2%30"
    ],
    extinguish: true,
    tick: function (pixel) {
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coords = adjacentCoords[i];
            var x = pixel.x + coords[0];
            var y = pixel.y + coords[1];
            if (getPixel(x, y)?.burning === true) {
                let elem = getPixel(x, y)
                elem.burning = false
            }
        }
    },
    tool: function (pixel) {
        if (pixel.burning === true) {
            delete pixel.burning;
            delete pixel.burnStart;
        }
    },
    canPlace: true,
    category: "powders",
    state: "solid"
}

elements.pie_crust = {
    color: "#f1f192",
    breakInto: "crumb",
    tempHigh: 500,
    stateHigh: "ash",
    burn: 5,
    burnTime: 400,
    burnInto: ["smoke", "smoke", "smoke", "ash"],
    category: "food",
    state: "solid",
    behavior: behaviors.STURDYPOWDER,
    isFood: true,
    hidden: true,
    density: 230,
    reactions: {
        "pumpkin": { elem1: "pie", elem2: null, tempMin: 200 },
        "cooked_meat": { elem1: "pie", elem2: null, tempMin: 200 },
        "meat": { elem1: "pie", elem2: null, tempMin: 200 },
        "potato": { elem1: "pie", elem2: null, tempMin: 200 },
        "mashed_potato": { elem1: "pie", elem2: null, tempMin: 200 },
        "baked_potato": { elem1: "pie", elem2: null, tempMin: 200 },
        "grape": { elem1: "pie", elem2: null, tempMin: 200, func: function (pixel) { pixel.originColor = "#8200fc" } },
        "pineapple": { elem1: "pie", elem2: null, tempMin: 200, func: function (pixel) { pixel.originColor = "#ffd900" } }
    }
}

elements.pie = {
    color: "#fac145",
    darkText: false,
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    isFood: true,
    density: 240,
    burn: 5,
    burnTime: 400,
    burnInto: ["smoke", "smoke", "smoke", "ash"],
    state: "solid",
    tempHigh: 500,
    stateHigh: "ash",
    breakInto: "sauce",
    breakIntoColor: ["#ff822e", "#ff8c2e"],
    tick: function (pixel) {
        if (pixel.originColor) {
            pixel.breakIntoColor = pixel.originColor
        }
    }
}

elements.gasoline = {
    color: ["#ffff66", "#ffff55", "#ffff44"],
    behavior: behaviors.LIQUID,
    burn: 80,
    burnTime: 100,
    burnInto: ["fire", "fire", "fire", "explosion"],
    viscosity: 0.7,
    density: 750,
    category: "liquids",
    state: "liquid",
    conduct: 0.02,
    behaviorOn: [
        "XX|XX|XX",
        "XX|EX:10|XX",
        "XX|XX|XX"
    ]
}

// Make molten sulfur stinky
elements.molten_sulfur.tick = function (pixel) {
    for (var i = 0; i < adjacentCoords.length; i++) {
        var coords = adjacentCoords[i];
        var x = pixel.x + coords[0];
        var y = pixel.y + coords[1];
        if (isEmpty(x, y) && Math.random() <= 0.0005) {
            createPixel("stench", x, y)
            let p = getPixel(x, y)
            if (p !== null && p.element == "stench") {
                p.temp = pixel.temp
            }
        }
    }
}

elements.disco_floor = {
    color: rainbowColor,
    breakInto: "glass_shard",
    category: "machines",
    forceSaveColor: true,
    conduct: 1,
    behavior: behaviors.WALL,
    state: "solid",
    tick: function (pixel) {
        pixel.changeCd ??= 20;
        pixel.changeCd--;

        if (pixel.changeCd <= 0) {
            let colors = elements.disco_floor.color;
            pixel.color = colors[Math.floor(Math.random() * colors.length)];
            pixel.changeCd = 20;
        }
    }
};

elements.moss = {
    color: ["#007900", "#006000", "#008300"],
    behavior: behaviors.POWDER,
    tick: function (pixel) {
        for (var i = 0; i < squareCoords.length; i++) {
            var coords = squareCoords[i];
            var x = pixel.x + coords[0];
            var y = pixel.y + coords[1];
            if (isEmpty(x, y) && Math.random() <= 0.01 && getPixel(pixel.x, pixel.y + 1) && getPixel(pixel.x, pixel.y + 1).element !== "moss") {
                createPixel('moss', x, y)
            }
        }
    },
    tempHigh: 70,
    stateHigh: "dead_plant",
    extraTempHigh: {
        "100": ["dead_plant", "dead_plant", "steam"]
    },
    tempLow: -10,
    stateLow: "frozen_plant",
    burn: 50,
    burnTime: 30,
    reactions: {
        "carbon_dioxide": { elem2: "oxygen", chance: 0.1 },
        "rock": { elem2: "dirt", chance: 0.0025 },
        "rock_wall": { elem2: "dirt", chance: 0.0025 },
        "gravel": { elem2: "dirt", chance: 0.0025 },
    },
    category: "life",
    state: "solid"
}

elements.magma.extraTempLow = { "700": "obsidian" }

elements.obsidian = {
    color: ["#1f1f1f", "#1f1f1f", "#1f1f1f", "#1f1f1f", "#292929"],
    buttonColor: ["#1a1a1a", "#2b2b2b", "#3b3b3b"],
    colorPattern: textures.GLASS,
    colorKey: {
        "g": "#1f1f1f",
        "s": "#292929",
        "S": "#252525"
    },
    grain: 0,
    behavior: behaviors.WALL,
    category: "solids",
    tempHigh: 1200,
    stateHigh: "magma",
    state: "solid",
    density: 2500,
    breakInto: "obsidian_shard"
}

elements.obsidian_shard = {
    color: ["#1f1f1f", "#1f1f1f", "#1f1f1f", "#1f1f1f", "#292929"],
    behavior: behaviors.POWDER,
    grain: 0,
    category: "powders",
    tempHigh: 1200,
    stateHigh: "magma",
    state: "solid",
    density: 2500,
    reactions: {
        "glue": { elem1: "obsidian", elem2: null }
    }
}

elements.cardboard = {
    color: ["#9E6B34"],
    burn: 70,
    burnTime: 300,
    burnInto: ["fire", "fire", "fire", "fire", "fire", "ash"],
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
    category: "solids",
    tempHigh: 248,
    stateHigh: ["fire", "fire", "fire", "fire", "fire", "ash"],
    state: "solid",
    density: 1200
}

elements.paper.pressInto = "cardboard"

function pressPixel(pixel) {
    if (elements[pixel.element].pressInto === undefined) { return; }
    // if it is an array, choose a random item, else just use the value
    let result;
    if (elements[pixel.element].pressInto !== undefined) {
        if (Array.isArray(elements[pixel.element].pressInto)) {
            result = elements[pixel.element].pressInto[Math.floor(Math.random() * elements[pixel.element].pressInto.length)];
        }
        else {
            result = elements[pixel.element].pressInto;
        }
    }
    // change the pixel to the result
    if (result === null) {
        deletePixel(pixel.x, pixel.y);
        return;
    }

    else if (result !== undefined) {
        changePixel(pixel, result);
    }
}

elements.press = {
    color: ["#999999", "#c0c0c0", "#999999"],
    category: "tools",
    tool: function (pixel) {
        // edited smash code
        if (isPressable(pixel)) {
            let old = pixel.element
            if (Math.random() < (1 - (elements[pixel.element].resistPress || 0)) / (shiftDown ? 1 : 4)) {
                pressPixel(pixel)
            }

            else if (old === pixel.element && elements[pixel.element].movable && !isEmpty(pixel.x, pixel.y + 1) && !paused) {
                let x = 0; let y = 0;
                if (Math.random() < 0.66) x = Math.random() < 0.5 ? 1 : -1;
                if (Math.random() < 0.66) y = Math.random() < 0.5 ? 1 : -1;
                tryMove(pixel, pixel.x + x, pixel.y + y)
            }
        }
        if (elements[pixel.element].onPress !== undefined) {
            elements[pixel.element].onPress(pixel)
        }
    }
}

elements.malware.reactions.wire = { elem2: [null, "faulty_wire"], chance: 0.01 };

elements.faulty_wire = {
    color: ["#4d0a03", "#4d0a03", "#4d0a03", "#4d0a03", "#4d0a03", "#4d0a03", "#4d0a03", "#4d0a03", "#4d0a03", "#a95232",],
    buttonColor: "#4d0a03",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|CR:electric,flash%1|XX",
        "CR:electric,flash%1|XX|CR:electric,flash%1",
        "XX|CR:electric,flash%1|XX"
    ],
    category: "machines",
    insulate: true,
    conduct: 0.7,
    noMix: true,
    state: "solid"
}

elements.lighter_fluid = {
    color: "#f1e185",
    behavior: [
        "XX|XX|XX",
        "M2 AND SW:lighter_fluid_gas|XX|M2 AND SW:lighter_fluid_gas",
        "M1 AND SW:lighter_fluid_gas|M1 AND SW:lighter_fluid_gas|M1 AND SW:lighter_fluid_gas"
    ],
    category: "liquids",
    state: "liquid",
    density: 750,
    tick: function (pixel) {
        pixel.gasMade ??= 0
        for (var i = 0; i < squareCoordsShuffle.length; i++) {
            var coord = squareCoordsShuffle[i];
            var x = pixel.x + coord[0];
            var y = pixel.y + coord[1];
            if (isEmpty(x, y) && Math.random() >= 0.75) {
                createPixel("lighter_fluid_gas", x, y)
                pixel.gasMade += 1
            }
        }

        if (pixel.gasMade > 100 && Math.random() <= 0.01) {
            deletePixel(pixel.x, pixel.y)
        }
    }
}

elements.lighter_fluid_gas = {
    color: "#f1e185",
    alpha: 0.1,
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    burn: 100,
    isGas: true,
    hidden: true,
    density: 20,
    tick: function (pixel) {
        if (Math.random() <= 0.1) {
            deletePixel(pixel.x, pixel.y)
        }
    }
}

elements.mold = {
    color: "#054e05",
    category: "life",
    behavior: behaviors.POWDER,
    state: "solid",
    burn: 70,
    burnTime: 100,
    tempHigh: 200,
    stateHigh: "fire",
    tempLow: -10,
    stateLow: "frozen_plant",
    reactions: {
        "meat": { elem1: "rotten_meat", elem2: "rotten_meat" },
        "cheese": { elem1: "rotten_cheese", elem2: "rotten_cheese" }
    },
    tick: function (pixel) {
        let moldable = ["meat", "cheese", "rotten_meat", "rotten_cheese"]
        for (var i = 0; i < squareCoords.length; i++) {
            var coords = squareCoords[i];
            var x = pixel.x + coords[0];
            var y = pixel.y + coords[1];
            if (isEmpty(x, y) && Math.random() <= 0.01 && getPixel(pixel.x, pixel.y + 1) && moldable.includes(getPixel(pixel.x, pixel.y + 1).element)) {
                createPixel('mold', x, y)
            }
        }
    }
}

elements.glow_stick = {
    color: ["#00ff00", "#ea00ff", "#00eeff"],
    glow: true,
    behavior: behaviors.POWDER,
    breakInto: "glow_stick_liquid",
    category: "powders",
    tempHigh: 300,
    stateHigh: ["molten_plastic", "stench"],
    state: "solid"
}

elements.glow_stick_liquid = {
    color: ["#00ff00", "#ea00ff", "#00eeff"],
    glow: true,
    behavior: behaviors.LIQUID,
    category: "liquids",
    hidden: true,
    tempHigh: 300,
    stateHigh: "stench",
    tempLow: -5,
    stateLow: "glow_stick_ice",
    state: "solid"
}

elements.glow_stick_ice = {
    color: ["#00ff00", "#ea00ff", "#00eeff"],
    behavior: behaviors.WALL,
    category: "states",
    hidden: true,
    temp: -5,
    tempHigh: -5,
    stateHigh: "glow_stick_liquid",
    state: "solid"
}

elements.randomizer = {
    buttonColor: rainbowColor,
    excludeRandom: true,
    onSelect: function () {
        logMessage("Warning: It can fill up the screen with random elements")
    },
    tick: function (pixel) {
        pixel.color = randomColor()
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coords = adjacentCoords[i];
            var x = pixel.x + coords[0];
            var y = pixel.y + coords[1];
            let p = getPixel(x, y)
            if (!isEmpty(x, y) && !outOfBounds(x, y)) {
                if (p && p.element !== "randomizer") {
                    changePixel(p, "random")
                }
            }
        }
    },
    behavior: behaviors.WALL,
    insulate: true,
    hardness: 1,
    category: "special",
    state: "solid"
}

elements.cloner.ignore.push("randomizer")
elements.ecloner.ignore.push("randomizer")
elements.floating_cloner.ignore.push("randomizer")
elements.slow_cloner.ignore.push("randomizer")
elements.rocket.ignore.push("randomizer")

elements.antibomb.tick = function (pixel) {
    doDefaults(pixel)
    if (!tryMove(pixel, pixel.x, pixel.y + 1)) {
        if (!outOfBounds(pixel.x, pixel.y + 1)) {
            var elem = pixelMap[pixel.x][pixel.y + 1].element;
            if (elements[elem].isGas) { return }
        }
        else {
            var elem = "smoke";
        }
        if (elem !== "antibomb" && elem !== "randomizer") {
            explodeAt(pixel.x, pixel.y, 8, elem)
        }
    }
}

function drawCircle(x0, y0, radius, element) {
    for (let y = -radius; y <= radius; y++) {
        for (let x = -radius; x <= radius; x++) {
            if (x * x + y * y <= radius * radius) {
                let px = x0 + x;
                let py = y0 + y;
                if (isEmpty(px, py)) {
                    createPixel(element, px, py);
                }
            }
        }
    }
}

elements.circle = {
    color: "#ffffff",
    behavior: behaviors.WALL,
    category: "special",
    state: "solid",
    onSelect: function () {
        promptInput(
            "Select the radius you want your circle to be:",
            function (input1) {
                let ans1 = Number(input1)
                if (Number.isInteger(ans1) && ans1 > 0) {
                    globals.circleRad = ans1
                } else {
                    globals.circleRad = 7
                    logMessage("Invalid radius, using default size: " + globals.circleRad);
                }
                promptInput(
                    "Select the element you want your circle to be:",
                    function (ans2) {
                        let similar = mostSimilarElement(ans2);
                        if (similar && elements[similar]) {
                            globals.circleElem = similar;
                        } else {
                            globals.circleElem = "wood"
                            logMessage("Invalid element, using default element: " + globals.circleElem);
                        }
                    },
                    "Element prompt",
                    "wood"
                );
            },
            "Radius prompt",
            "7"
        );
    },
    onPlace: function (pixel) {
        drawCircle(pixel.x, pixel.y, globals.circleRad, globals.circleElem);
        changePixel(pixel, globals.circleElem);
        pixel.temp = (elements[globals.circleElem].temp || 20)
    },
    maxSize: 1,
    excludeRandom: true
};

runAfterReset(function () {
    if (globals.rCircle) {
        globals.circleRad = 7;
        globals.circleElem = "wood";
    }
})

/**
 * gets a random int in a range
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function randomIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



elements.rgb_led = {
    buttonColor: rainbowColor,
    behavior: behaviors.WALL,
    desc: "Input the red, green, and blue value (not exceeding 255) and get the color.",
    renderer: renderPresets.LED,
    conduct: 1,
    state: "solid",
    breakInto: "glass_shard",
    forceSaveColor: true,
    reactions: {
        "light": { charge1: 1, elem2: null },
        "liquid_light": { charge1: 1, elem2: null }
    },
    category: "deprecated",
    tempHigh: 1500,
    stateHigh: ["molten_glass", "molten_glass", "molten_glass", "molten_gallium"],

    onSelect: () => {
        promptInput("Enter red value (0-255):", function (old_r_inp) {
            let r_inp = parseInt(old_r_inp);
            if (r_inp > 255 || r_inp < 0 || isNaN(r_inp)) {
                logMessage("Red value is invalid, using default/last red value: " + globals.red);
            } else {
                globals.red = r_inp;
            }

            promptInput("Enter green value (0-255):", function (old_g_inp) {
                let g_inp = parseInt(old_g_inp);
                if (g_inp > 255 || g_inp < 0 || isNaN(g_inp)) {
                    logMessage("Green value is invalid, using default/last green value: " + globals.green);
                } else {
                    globals.green = g_inp;
                }

                promptInput("Enter blue value (0-255):", function (old_b_inp) {
                    let b_inp = parseInt(old_b_inp);
                    if (b_inp > 255 || b_inp < 0 || isNaN(b_inp)) {
                        logMessage("Blue value is invalid, using default/last blue value: " + globals.blue);
                    } else {
                        globals.blue = b_inp;
                    }
                }, "Blue Value", String(globals.blue)); // optional default input
            }, "Green Value", String(globals.green));
        }, "Red Value", String(globals.red));
    },

    onPlace: (pixel) => {
        var ledColor = RGBToHex([globals.red, globals.green, globals.blue]);
        pixel.color = ledColor;
    }
};


runAfterReset(() => {
    if (globals.rRGBLed) {
        globals.red = 100;
        globals.greed = 100;
        globals.blue = 100;
    }
})

if (!elements.malware.reactions) { elements.malware.reactions = {} }
elements.malware.reactions.rgb_led = { elem2: ["led_r", "led_g", "led_b"], chance: 0.01 }
elements.malware.reactions.led_r = { elem2: ["rgb_led", "led_g", "led_b"], chance: 0.01 }
elements.malware.reactions.led_g = { elem2: ["rgb_led", "led_r", "led_b"], chance: 0.01 }
elements.malware.reactions.led_b = { elem2: ["rgb_led", "led_g", "led_r"], chance: 0.01 }

elements.dice = {
    color: "#d5d5d5",
    state: "solid",
    onClicked(pixel) {
        pixel.clicked = true;
    },

    tick(pixel) {
        if (pixel.rolled === undefined) {
            pixel.rolled = false;
        }

        if (pixel.clicked && !pixel.rolled) {
            const roll = randomIntInRange(1, 6);
            clearLog()
            logMessage("Dice roll: " + roll);
            pixel.rolled = true;
        }

        if (!pixel.clicked) {
            pixel.rolled = false;
        }

        pixel.clicked = false;
    },
    behavior: behaviors.WALL,
    density: 500,
    category: "special",
    onSelect: () => {
        logMessage("Click The Dice to Roll")
        logMessage("It is reccomended to roll only one dice at a time as it will only show one value")
    }
}

elements.wood.pressInto = "plank";
elements.wood.resistPress = 0.5;

elements.plank = {
    color: "#98633B",
    behavior: behaviors.WALL,
    renderer: renderPresets.WOODCHAR,
    tempHigh: 400,
    stateHigh: ["ember", "charcoal", "fire", "fire", "fire"],
    category: "solids",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember", "charcoal", "fire"],
    state: "solid",
    hardness: 0.50,
    breakInto: "sawdust",
    forceSaveColor: true
}

elements.sand.pressInto = "packed_sand";
elements.sand.resistPress = 0.2
elements.snow.pressInto = "packed_snow";
elements.snow.resistPress = 0.2

elements.asbestos = {
    color: "#f1f5f1",
    behavior: [
        "SP|XX|SP",
        "XX|XX|XX",
        "SA AND M2|M1|SP AND M2"
    ],
    category: "powders",
    state: "solid",
    tempHigh: 800,
    stateHigh: ["dust", "ash", "fire"],
    breakInto: ["gravel", "sand", "dust"],
    reactions: {
        "body": { elem2: "cancer", chance: 0.5 },
        "head": { elem2: "cancer", chance: 0.5 }
    },
    nocheer: true
}

elements.lithium_battery = {
    color: "#616161",
    behavior: [
        "XX|SH|XX",
        "SH|XX|SH",
        "XX|SH|XX"
    ],
    tempHigh: 1400,
    stateHigh: ["explosion", "lithium", "acid_gas"],
    hardness: 0.8,
    breakInto: ["lithium", "acid"],
    category: "machines",
    alias: "lithium-ion battery",
    state: "solid"
}

elements.lithium = {
    color: "#acacac",
    behavior: behaviors.POWDER,
    reactions: {
        "water": { elem1: ["pop", "pop", "pop", "hydrogen"], chance: 0.01, temp2: 200 },
        "salt_water": { elem1: ["pop", "pop", "pop", "hydrogen"], chance: 0.01, temp2: 200 },
        "pool_water": { elem1: ["pop", "pop", "pop", "hydrogen"], chance: 0.01, temp2: 200 },
        "sugar_water": { elem1: ["pop", "pop", "pop", "hydrogen"], chance: 0.01, temp2: 200 },
        "seltzer": { elem1: ["pop", "pop", "pop", "hydrogen"], chance: 0.01, temp2: 200 },
        "dirty_water": { elem1: ["pop", "pop", "pop", "hydrogen"], chance: 0.01, temp2: 200 },
        "primordial_soup": { elem1: ["pop", "pop", "pop", "hydrogen"], chance: 0.01, temp2: 200 },
        "nut_milk": { elem1: ["pop", "pop", "pop", "hydrogen"], chance: 0.01, temp2: 200 }
    },
    density: 533.4,
    tempHigh: 180.5,
    conduct: 0.45,
    category: "powders",
    state: "solid"
}

elements.molten_lithium = {
    tempHigh: 1344,
    stateHigh: 'lithium_gas',
    reactions: {
        "water": { elem1: ["pop", "pop", "pop", "hydrogen"], chance: 0.01, temp2: 200 },
        "salt_water": { elem1: ["pop", "pop", "pop", "hydrogen"], chance: 0.01, temp2: 200 },
        "pool_water": { elem1: ["pop", "pop", "pop", "hydrogen"], chance: 0.01, temp2: 200 },
        "sugar_water": { elem1: ["pop", "pop", "pop", "hydrogen"], chance: 0.01, temp2: 200 },
        "seltzer": { elem1: ["pop", "pop", "pop", "hydrogen"], chance: 0.01, temp2: 200 },
        "dirty_water": { elem1: ["pop", "pop", "pop", "hydrogen"], chance: 0.01, temp2: 200 },
        "primordial_soup": { elem1: ["pop", "pop", "pop", "hydrogen"], chance: 0.01, temp2: 200 },
        "nut_milk": { elem1: ["pop", "pop", "pop", "hydrogen"], chance: 0.01, temp2: 200 }
    },
    state: "liquid"
}

elements.lithium_gas = {
    color: "#cccccc",
    behavior: behaviors.GAS,
    isGas: true,
    tempLow: 1334,
    stateLow: "molten_lithium",
    density: 533.4,
    conduct: 0.45,
    temp: 1334,
    category: "states",
    hidden: true,
    state: "gas"
}

elements.chalk = {
    color: "#fff3ac",
    behavior: behaviors.WALL,
    stain: 0.25,
    category: "land",
    breakInto: "chalk_powder",
    tempHigh: 1000,
    density: 2700,
    reactions: {
        "water": { elem1: "wet_chalk", elem2: null, chance: 0.5 },
        "salt_water": { elem1: "wet_chalk", elem2: null, chance: 0.5 },
        "seltzer": { elem1: "wet_chalk", elem2: null, chance: 0.5 },
        "dirty_water": { elem1: "wet_chalk", elem2: null, chance: 0.5 },
        "sugar_water": { elem1: "wet_chalk", elem2: null, chance: 0.5 },
        "pool_water": { elem1: "wet_chalk", elem2: null, chance: 0.5 },
        "primordial_soup": { elem1: "wet_chalk", elem2: null, chance: 0.5 },
        "nut_milk": { elem1: "wet_chalk", elem2: null, chance: 0.5 }
    },
    alias: "calcite",
    state: "solid"
}

elements.chalk_powder = {
    color: "#fff3ac",
    behavior: behaviors.POWDER,
    stain: 0.25,
    category: "powders",
    tempHigh: 1000,
    stateHigh: "molten_chalk",
    density: 2700,
    reactions: {
        "water": { elem1: "wet_chalk_powder", elem2: null, chance: 0.5 },
        "salt_water": { elem1: "wet_chalk_powder", elem2: null, chance: 0.5 },
        "seltzer": { elem1: "wet_chalk_powder", elem2: null, chance: 0.5 },
        "dirty_water": { elem1: "wet_chalk_powder", elem2: null, chance: 0.5 },
        "sugar_water": { elem1: "wet_chalk_powder", elem2: null, chance: 0.5 },
        "pool_water": { elem1: "wet_chalk_powder", elem2: null, chance: 0.5 },
        "primordial_soup": { elem1: "wet_chalk_powder", elem2: null, chance: 0.5 },
        "nut_milk": { elem1: "wet_chalk_powder", elem2: null, chance: 0.5 },
        "glue": { elem1: "chalk", elem2: null }
    },
    state: "solid"
}

elements.wet_chalk = {
    color: "#bbb17b",
    behavior: behaviors.WALL,
    stain: 0.25,
    category: "land",
    breakInto: "wet_chalk_powder",
    tempHigh: 100,
    stateHigh: "chalk",
    density: 2300,
    onStateHigh: (pixel) => {
        releaseElement(pixel, "steam")
    },
    state: "solid"
}

elements.wet_chalk_powder = {
    color: "#bbb17b",
    behavior: behaviors.POWDER,
    stain: 0.25,
    category: "powders",
    tempHigh: 100,
    stateHigh: "chalk_powder",
    density: 2000,
    onStateHigh: (pixel) => {
        releaseElement(pixel, "steam")
    },
    state: "solid",
    reactions: {
        "glue": { elem1: "chalk", elem2: null }
    }
}

elements.lapis_lazuli = {
    color: ["#0000df", "#1212cc", "#120A8F", "#060080"],
    behavior: behaviors.WALL,
    breakInto: "lapis_lazuli_powder",
    tempHigh: 1100,
    stateHigh: 'magma',
    state: "solid",
    category: "solids"
}

elements.lapis_lazuli_powder = {
    color: "#120A8F",
    behavior: behaviors.POWDER,
    tempHigh: 1100,
    stateHigh: "magma",
    alias: "Ultramarine",
    category: "powders",
    state: "solid"
}

elements.uv_light = {
    color: "#440088",
    behavior: [
        "XX|XX|XX",
        "XX|DL%1|XX",
        "XX|XX|XX"
    ],
    glow: true,
    tick: behaviors.BOUNCY,
    temp: 35,
    tempLow: -273,
    stateLow: ["liquid_light", null],
    stateLowColorMultiplier: 0.8,
    breakInto: "light",
    breakIntoColor: "#ffcfcf",
    category: "energy",
    state: "gas",
    density: 0.00001,
    ignoreAir: true,
    reactions: {
        "ozone": { elem1: null, chance: 0.9 },
    }
};

if (!settings.cheerful) {
    elements.uv_light.reactions.cell = { elem2: "cancer", chance: 0.05 },
        elements.uv_light.reactions.skin = { elem2: "cancer", chance: 0.005 }
}
else {
    if (elements.uv_light.reactions.cell) {
        delete elements.uv_light.reactions.cell
    }
    if (elements.uv_light.reactions.skin) {
        delete elements.uv_light.reactions.skin
    }
}

function fadeColor(base, glow, ratio) {
    // ratio 1 = full glow, 0 = base color
    let r1 = parseInt(glow.substr(1, 2), 16);
    let g1 = parseInt(glow.substr(3, 2), 16);
    let b1 = parseInt(glow.substr(5, 2), 16);
    let r2 = parseInt(base.substr(1, 2), 16);
    let g2 = parseInt(base.substr(3, 2), 16);
    let b2 = parseInt(base.substr(5, 2), 16);
    let r = Math.round(r1 * ratio + r2 * (1 - ratio));
    let g = Math.round(g1 * ratio + g2 * (1 - ratio));
    let b = Math.round(b1 * ratio + b2 * (1 - ratio));
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}


elements.phosphor = {
    color: "#fffbe7",
    behavior: behaviors.POWDER,
    tick: function (pixel) {
        let nearUV = false;
        for (let i = 0; i < adjacentCoords.length; i++) {
            let x = pixel.x + adjacentCoords[i][0];
            let y = pixel.y + adjacentCoords[i][1];
            let p = getPixel(x, y);
            if (p && p.element == "uv_light") {
                nearUV = true;
                break;
            }
        }

        if (nearUV) {
            pixel.colorStay = 60; // longer for realism
        }

        if (pixel.colorStay > 0) {
            let ratio = pixel.colorStay / 60; // exponential fade would be even better
            pixel.color = fadeColor("#fffbe7", "#00c500", ratio);
            pixel.colorStay--;
        } else {
            pixel.color = "#fffbe7"
        }
        if (enabledMods.includes("mods/glow.js")) {
            if (pixel.color !== "#fffbe7") {
                pixel.emit = pixel.colorStay / 10
            }
        }
    },
    category: "powders",
    state: "solid",
};

elements.packed_sand.pressInto = "sandstone"
elements.packed_sand.resistPress = 0.7
elements.packed_snow.pressInto = "ice"
elements.packed_snow.resistPress = 0.7

elements.sandstone = {
    color: "#d3bc56",
    behavior: behaviors.WALL,
    breakInto: "sand",
    hardness: 0.5,
    state: "solid",
    stateHigh: "glass",
    tempHigh: 1700,
    category: "land"
}

// Glow.js integrtion
if (enabledMods.includes("mods/glow.js")) {
    elements.uv_light.emit = true
    elements.glow_stick.emit = true
    delete elements.glow_stick.glow
    elements.glow_stick_liquid.emit = true
    delete elements.glow_stick_liquid.glow
}


let neonTubeChoice = "#00ff00"; // default color

elements.neon_tube = {
    color: "#d1d1b5",
    renderer: renderPresets.BORDER,
    alpha: 0.25,
    conduct: 1,
    behavior: behaviors.WALL,
    breakInto: ["neon", "glass_shard"],
    grain: 0,
    category: "machines",
    state: "solid",
    tick: (pixel) => {
        pixel.def_color ??= pixel.color;
        pixel.glow_color ??= neonTubeChoice;

        if (pixel.charge) {
            pixel.alpha = 1;
            pixel.color = pixel.glow_color;
        } else {
            pixel.alpha = 0.25;
            pixel.color = pixel.def_color;
        }

        if (enabledMods.includes("mods/glow.js")) {
            if (pixel.charge) {
                pixel.emit = true;
                pixel.emitColor = pixel.glow_color;
            } else {
                delete pixel.emit;
                delete pixel.emitColor;
            }
        }
    },
    // Broken since yellow stacks above color
    // only green is good
    /*
    onSelect() {
        promptChoose(
            "Pick a color for your neon tube:",
            ["Red", "Green", "Blue", "Pink"],
            function(choice) {
                let colors = {
                    "Red": "#ff0000",
                    "Green": "#00ff00",
                    "Blue": "#0000ff",
                    "Pink": "#ff66cc"
                };
                neonTubeChoice = colors[choice] || "#00ff00";
                logMessage("Neon tube color set to " + choice);
            },
            "Neon Tube Setup"
        );
    }
    */
};

elements.realistic_ball = {
    color: "#e35693",
    tempHigh: 250,
    stateHigh: "molten_plastic",
    category: "special",
    state: "solid",
    density: 1052,
    hidden: true,
    tick: function (pixel) {
        // initialize velocity
        if (pixel.vy === undefined) {
            pixel.vy = 0;
        }

        // gravity
        pixel.vy += 0.3;

        // predict next position
        let nextY = pixel.y + Math.sign(pixel.vy);

        if (isEmpty(pixel.x, nextY)) {
            // free space → move
            tryMove(pixel, pixel.x, pixel.y + Math.sign(pixel.vy));
        } else {
            // collision: reverse velocity (bounce)
            pixel.vy *= -0.7;

            // stop very small bounces
            if (Math.abs(pixel.vy) < 0.5) {
                pixel.vy = 0;
            }
        }
    }
}

elements.custom_bomb = {
    color: "#49443b",
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown,
    behavior: behaviors.STURDYPOWDER,
    onSelect: function () {
        promptInput(
            "Input the element you want your bomb to explode into",
            function (input) {
                let pr1 = mostSimilarElement(input)
                if (pr1 && elements[pr1]) {
                    if (pr1 === "custom_bomb") {
                        promptConfirm("Are you sure you want custom bomb to create itself as it will spread", (a) => { if (!a) { globals.explodeElem = 'fire' } else globals.explodeElem = 'custom_bomb' }, "Warning")
                    }
                    else { globals.explodeElem = pr1 }
                }
                else {
                    globals.explodeElem = 'fire'
                    logMessage("Invalid element. Using default: fire")
                }
            },
            "Element prompt",
            "fire"
        )
    },
    tick: function (pixel) {
        let belowPixel = getPixel(pixel.x, pixel.y + 1);

        // If pixel is at the bottom or resting on a solid
        if (outOfBounds(pixel.x, pixel.y + 1) || (belowPixel && belowPixel.element !== "custom_bomb" && !isEmpty(pixel.x, pixel.y + 1) && belowPixel.element !== "fire" && belowPixel.element !== "smoke")) {
            explodeAt(pixel.x, pixel.y, 10, globals.explodeElem);
            deletePixel(pixel.x, pixel.y);
        }
    }
}

runAfterReset(() => {
    if (globals.rCustomBomb) {
        globals.explodeElem = 'fire'
    }
})

elements.pineapple = {
    color: "#ffd900",
    isFood: true,
    behavior: behaviors.STURDYPOWDER,
    breakInto: ["juice", "juice", "juice", "juice", "juice", "pineapple_seed"],
    breakIntoColor: "#fffc00",
    category: "food",
    state: "solid",
    seed: "pineapple_seed"
}

elements.pineapple_seed = {
    color: "#695531",
    behavior: behaviors.STURDYPOWDER,
    cooldown: defaultCooldown,
    category: "life",
    tempHigh: 400,
    stateHigh: "fire",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 50,
    burnTime: 20,
    state: "solid",
    tick: function (pixel) {
        let belowPixel = getPixel(pixel.x, pixel.y + 1)
        if (
            !isEmpty(pixel.x, pixel.y + 1) &&
            belowPixel &&
            Math.random() <= 0.05
        ) {
            changePixel(pixel, "pineapple_stem")
            pixel.growthState = 1
            pixel.growDiagLeft = true
            pixel.growDiagRight = true
        }
    },
    seed: true
}

eListAdd("SEEDS", "pineapple_seed")

elements.pineapple_stem = {
    color: "#3aab11",
    behavior: behaviors.WALL,
    movable: false,
    category: "life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn: 15,
    burnTime: 60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    tick: function (pixel) {
        let left = pixel.x - 1
        let right = pixel.x + 1
        let up = pixel.y - 1
        let down = pixel.y + 1
        let belowPixel = getPixel(pixel.x, down)
        pixel.fruitCD ??= 60
        if (!outOfBounds(pixel.x, down) && belowPixel && eLists.SOIL.includes(belowPixel.element) && pixel.growthState === 1) {
            changePixel(belowPixel, "root")
        }
        if (pixel.growthState === 1 && Math.random() <= 0.05) {
            if (isEmpty(left, up) && pixel.growDiagLeft === true) {
                createPixel("pineapple_stem", left, up)
                let newPixel = getPixel(left, up)
                if (newPixel) {
                    newPixel.growthState = 2
                    newPixel.growDiagLeft = true
                    delete newPixel.growDiagRight
                }
            }
            else {
                delete pixel.growDiagLeft
            }
            if (isEmpty(right, up) && pixel.growDiagRight === true) {
                createPixel("pineapple_stem", right, up)
                let newPixel = getPixel(right, up)
                if (newPixel) {
                    newPixel.growthState = 2
                    newPixel.growDiagRight = true
                    delete newPixel.growDiagLeft
                }
            }
            else {
                delete pixel.growDiagRight
            }
        }
        if (!pixel.growDiagLeft && !pixel.growDiagRight && pixel.growthState === 1) {
            if (Math.random() <= 0.05 && isEmpty(pixel.x, up) && !pixel.fruitCD && !pixel.pineappleGrown) {
                createPixel("pineapple", pixel.x, up)
                pixel.fruitCD = 60
                pixel.pineappleGrown = true
            }
            if (pixel.fruitCD && !pixel.pineappleGrown) {
                pixel.fruitCD--
            }
        }
        if (isEmpty(pixel.x, up)) {
            pixel.pineappleGrown = false
        }
        if (pixel.growthState === 2 && Math.random() <= 0.05) {
            if (isEmpty(left, up) && pixel.growDiagLeft === true) {
                createPixel("pineapple_stem", left, up)
            }
            if (isEmpty(right, up) && pixel.growDiagRight === true) {
                createPixel("pineapple_stem", right, up)
            }
        }
    }
}

// making redstone conductive bc idk why its not
if (enabledMods.includes("mods/minecraft.js")) {
    runAfterLoad(() => {
        elements.redstone_dust.conduct = 1
    })
}

elements.rubidium = {
    color: "#c0c0c0",
    state: "solid",
    behavior: behaviors.POWDER,
    tempHigh: 39.30,
    stateHigh: "liquid_rubidium",
    density: 1534,
    conduct: 0.6,
    reactions: {
        "water": { elem1: ["explosion", "explosion", "hydrogen"], temp2: 200 },
        "salt_water": { elem1: ["explosion", "explosion", "hydrogen"], temp2: 200 },
        "sugar_water": { elem1: ["explosion", "explosion", "hydrogen"], temp2: 200 },
        "pool_water": { elem1: ["explosion", "explosion", "hydrogen"], temp2: 200 },
        "dirty_water": { elem1: ["explosion", "explosion", "hydrogen"], temp2: 200 },
        "seltzer": { elem1: ["explosion", "explosion", "hydrogen"], temp2: 200 },
        "primordial_soup": { elem1: ["explosion", "explosion", "hydrogen"], temp2: 200 },
        "nut_milk": { elem1: ["explosion", "explosion", "hydrogen"], temp2: 200 }
    },
    category: "powders"
}

elements.liquid_rubidium = {
    color: "#d0d0d0",
    state: "liquid",
    behavior: behaviors.LIQUID,
    tempHigh: 688,
    density: 1460,
    conduct: 0.6,
    tempLow: 39.30,
    stateLow: "rubidium",
    temp: 40,
    reactions: {
        "water": { elem1: ["explosion", "explosion", "hydrogen"], temp2: 200 },
        "salt_water": { elem1: ["explosion", "explosion", "hydrogen"], temp2: 200 },
        "sugar_water": { elem1: ["explosion", "explosion", "hydrogen"], temp2: 200 },
        "pool_water": { elem1: ["explosion", "explosion", "hydrogen"], temp2: 200 },
        "dirty_water": { elem1: ["explosion", "explosion", "hydrogen"], temp2: 200 },
        "seltzer": { elem1: ["explosion", "explosion", "hydrogen"], temp2: 200 },
        "primordial_soup": { elem1: ["explosion", "explosion", "hydrogen"], temp2: 200 },
        "nut_milk": { elem1: ["explosion", "explosion", "hydrogen"], temp2: 200 }
    },
    category: "states",
    hidden: true
}

elements.dog = {
    color: ["#221d0c", "#5c4300", "#7c5b00", "#fcfceb"],
    behavior: [
        "XX|XX|M2%3",
        "XX|FX%5|M2%5",
        "XX|M1|XX"
    ],
    tempHigh: 100,
    stateHigh: "cooked_meat",
    tempLow: -10,
    stateLow: "frozen_meat",
    category: "life",
    state: "solid",
    burn: 30,
    burnTime: 50,
    burnInto: ["cooked_meat", "smoke"],
    breakInto: ["meat", "blood"],
    reactions: {
        "meat": { elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL },
        "egg": { elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL },
        "yolk": { elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL },
        "cheese": { elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL },
        "cooked_meat": { elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL },
        "chocolate": { elem2: null, chance: 0.2, func: behaviors.FEEDPIXEL, elem1: "rotten_meat" },
        "grape": { elem2: null, chance: 0.2, func: behaviors.FEEDPIXEL, elem1: "rotten_meat" },
        "rat": { elem2: null, chance: 0.3, func: behaviors.FEEDPIXEL },
        "nut_butter": { elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL },
    },
    egg: "dog",
}

// Keyboard state tracking
const robotKeys = {
    left: false,
    right: false,
    jump: false
};

// Set up keyboard listeners
window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'a' || key === 'arrowleft') robotKeys.left = true;
    if (key === 'd' || key === 'arrowright') robotKeys.right = true;
    if (key === 'w' || key === 'arrowup') robotKeys.jump = true;
});

window.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'a' || key === 'arrowleft') robotKeys.left = false;
    if (key === 'd' || key === 'arrowright') robotKeys.right = false;
    if (key === 'w' || key === 'arrowup') robotKeys.jump = false;
});

// Helper function for movement
function tryMoveRobot(headPixel, direction) {
    const newX = headPixel.x + direction;
    const body = getPixel(headPixel.x, headPixel.y + 1);

    if (body && body.element === "robot_body" &&
        isEmpty(newX, headPixel.y) &&
        isEmpty(newX, body.y)) {
        movePixel(body, newX, body.y);
        movePixel(headPixel, newX, headPixel.y);
        return true;
    }
    return false;
}

function tryJump(headPixel) {
    const body = getPixel(headPixel.x, headPixel.y + 1);
    if (!body || body.element !== "robot_body") return false;

    // Check if grounded (on solid surface or bottom of screen)
    const underBody = getPixel(body.x, body.y + 1);
    const isGrounded = (!isEmpty(body.x, body.y + 1) || outOfBounds(body.x, body.y + 1));

    if (isGrounded) {
        // Check space above
        if (isEmpty(headPixel.x, headPixel.y - 1) &&
            isEmpty(headPixel.x, headPixel.y - 2)) {

            // Two-stage jump animation
            pixelTicks = 0;
            headPixel.jumping = true;

            // First frame - small hop
            movePixel(headPixel, headPixel.x, headPixel.y - 1);
            movePixel(body, body.x, headPixel.y + 1);

            // Second frame - complete jump (after small delay)
            setTimeout(() => {
                if (headPixel.jumping) {  // Only if still jumping
                    movePixel(headPixel, headPixel.x, headPixel.y - 1);
                    movePixel(body, body.x, headPixel.y + 1);
                    headPixel.jumping = false;
                }
            }, 100);  // 100ms delay for smoother animation
            return true;
        }
    }
    return false;
}
// Robot elements
elements.robot_head = {
    color: "#d9d9d9",
    category: "machines",
    state: "solid",
    tick(pixel) {
        const body = getPixel(pixel.x, pixel.y + 1);

        if (body && body.element === "robot_body") {
            pixel.connected = true;
            body.connected = true;

            // Controlled movement
            if (pixel.mode === "Controlled") {
                if (robotKeys.left) {
                    tryMoveRobot(pixel, -1);
                }
                else if (robotKeys.right) {
                    tryMoveRobot(pixel, 1);
                }

                if (robotKeys.jump && !pixel.jumping) {
                    tryJump(pixel);
                }
            }
            // Aimless wandering
            else if (pixel.mode === "Aimless" && Math.random() < 0.02) {
                pixel.dir = pixel.dir || (Math.random() < 0.5 ? -1 : 1);
                if (!tryMoveRobot(pixel, pixel.dir)) {
                    pixel.dir *= -1;
                }
            }
        }
        else {
            pixel.connected = false;
            tryMove(pixel, pixel.x, pixel.y + 1);
        }
    }
};

elements.robot_body = {
    color: "#b1b1b1",
    category: "machines",
    state: "solid",
    tick(pixel) {
        const head = getPixel(pixel.x, pixel.y - 1);

        if (head && head.element === "robot_head") {
            pixel.connected = true;
            head.connected = true;

            // Gravity - move down if space below
            if (isEmpty(pixel.x, pixel.y + 1)) {
                let oldY = pixel.y;
                movePixel(pixel, pixel.x, pixel.y + 1);
                movePixel(head, head.x, oldY);
            }
        }
        else {
            pixel.connected = false;
            tryMove(pixel, pixel.x, pixel.y + 1);
        }
    }
};

// Robot creator element
globals.mode = "Aimless"
elements.robot = {
    color: "#b1b1b1",
    category: "machines",
    state: "solid",
    onSelect() {
        promptChoose(
            "Choose robot mode",
            ["Aimless", "Controlled"],
            (choice) => {
                if (choice === "Controlled" && isMobile) {
                    logMessage("Controlled mode doesn't work on mobile");
                    globals.mode = "Aimless";
                } else {
                    globals.mode = choice || "Aimless";
                    if (globals.mode === "Controlled") {
                        logMessage("Controls: A/D to move and W to jump or (Not reccomended) ←/→ to move, and ↑ to jump");
                    }
                }
            },
            "Robot Mode"
        );
    },
    onPlace(pixel) {
        // Try to create head above
        if (isEmpty(pixel.x, pixel.y - 1)) {
            createPixel("robot_head", pixel.x, pixel.y - 1);
            const head = getPixel(pixel.x, pixel.y - 1);
            head.mode = globals.mode;
            changePixel(pixel, "robot_body");
            pixel.mode = globals.mode;
        }
        // Try to create body below if above is blocked
        else if (isEmpty(pixel.x, pixel.y + 1)) {
            createPixel("robot_body", pixel.x, pixel.y + 1);
            const body = getPixel(pixel.x, pixel.y + 1);
            body.mode = globals.mode;
            changePixel(pixel, "robot_head");
            pixel.mode = globals.mode;
        }
        // Delete if no space
        else {
            deletePixel(pixel.x, pixel.y);
        }
    },
    cooldown: defaultCooldown
};

elements.mercury_gas.behaviorOn = [
    "M2|CR:uv_light%10 AND M1|M2",
    "CR:uv_light%10 AND M1|XX|CR:uv_light%10 AND M1",
    "M2|CR:uv_light%10 AND M1|M2"
]


elements.broken_adjustable_heater = {
    color: "#ff0000",
    category: "extras",
    insulate: true,
    behavior: behaviors.WALL,

    onSelect() {
        promptInput(
            "Select the temperature you want to adjust to",
            function (choice) {
                if (choice && !isNaN(Number(choice))) {
                    globals.adjusted_heater_temp = Number(choice)
                    logMessage("Occasionally creates superheated pixels")
                }
            },
            "Temperature Prompt", `${globals.adjusted_heater_temp}`
        )
    },
    tick(pixel) {
        pixel.heat_temp ??= globals.adjusted_heater_temp
        for (let i = 0; i < adjacentCoords.length; i++) {
            let x = pixel.x + adjacentCoords[i][0];
            let y = pixel.y + adjacentCoords[i][1];
            let current_pixel = getPixel(x, y);

            if (
                current_pixel &&
                !elements[current_pixel.element]?.insulate
                && current_pixel.temp < pixel.heat_temp
            ) {
                current_pixel.temp = Math.min(current_pixel.temp + 2, pixel.heat_temp);
            }
        }
    }
};

globals.adjusted_temp = 100
globals.heatAmount = 2

elements.adjustable_heater = {
    color: "#ff0000",
    category: "machines",
    insulate: true,
    behavior: behaviors.WALL,

    onSelect() {
        promptInput(
            "Select the temperature you want to adjust to",
            function (choice) {
                if (choice && !isNaN(Number(choice))) {
                    globals.adjusted_temp = Number(choice);
                }
            },
            "Temperature Prompt", `${globals.adjusted_temp}`
        );
    },

    tick(pixel) {
        for (let i = 0; i < adjacentCoords.length; i++) {
            let x = pixel.x + adjacentCoords[i][0];
            let y = pixel.y + adjacentCoords[i][1];
            let current_pixel = getPixel(x, y);

            if (
                current_pixel &&
                !elements[current_pixel.element]?.insulate
            ) {
                // Heat or cool toward the adjusted temp
                if (current_pixel.temp < globals.adjusted_temp) {
                    current_pixel.temp = Math.min(current_pixel.temp + globals.heatAmount, globals.adjusted_temp);
                } else if (current_pixel.temp > globals.adjusted_temp) {
                    current_pixel.temp = Math.max(current_pixel.temp - globals.heatAmount, globals.adjusted_temp);
                }
                pixelTempCheck(current_pixel)
            }
        }
    }
};

globals.adjusted_cooler_temp = 0; // default cooling target

elements.broken_adjustable_cooler = {
    color: "#0000ff",
    category: "extras",
    insulate: true,
    behavior: behaviors.WALL,

    onSelect() {
        promptInput(
            "Select the temperature you want to cool to",
            function (choice) {
                if (choice && !isNaN(Number(choice))) {
                    globals.adjusted_cooler_temp = Number(choice);
                    logMessage("Occasionally creates supercooled pixels");
                }
            },
            "Temperature Prompt", `${globals.adjusted_cooler_temp}`
        );
    },

    tick(pixel) {
        pixel.cool_temp ??= globals.adjusted_cooler_temp;
        for (let i = 0; i < adjacentCoords.length; i++) {
            let x = pixel.x + adjacentCoords[i][0];
            let y = pixel.y + adjacentCoords[i][1];
            let current_pixel = getPixel(x, y);

            if (
                current_pixel &&
                !elements[current_pixel.element]?.insulate &&
                current_pixel.temp > pixel.cool_temp
            ) {
                // Cool the pixel toward the target
                current_pixel.temp = Math.max(current_pixel.temp - 2, pixel.cool_temp);
            }
        }
    }
};

globals.adjusted_cool_temp = 0; // default cooling target
globals.coolAmount = 2; // adjustable step

elements.adjustable_cooler = {
    color: "#0000ff",
    category: "machines",
    insulate: true,
    behavior: behaviors.WALL,

    onSelect() {
        promptInput(
            "Select the temperature you want to cool to",
            function (choice) {
                if (choice && !isNaN(Number(choice))) {
                    globals.adjusted_cool_temp = Number(choice);
                }
            },
            "Temperature Prompt", `${globals.adjusted_cool_temp}`
        );
    },

    tick(pixel) {
        for (let i = 0; i < adjacentCoords.length; i++) {
            let x = pixel.x + adjacentCoords[i][0];
            let y = pixel.y + adjacentCoords[i][1];
            let current_pixel = getPixel(x, y);

            if (
                current_pixel &&
                !elements[current_pixel.element]?.insulate
            ) {
                // Cool or heat toward target (mirrors fixed heater logic)
                if (current_pixel.temp > globals.adjusted_cool_temp) {
                    current_pixel.temp = Math.max(current_pixel.temp - globals.coolAmount, globals.adjusted_cool_temp);
                } else if (current_pixel.temp < globals.adjusted_cool_temp) {
                    current_pixel.temp = Math.min(current_pixel.temp + globals.coolAmount, globals.adjusted_cool_temp);
                }

                pixelTempCheck(current_pixel)
            }
        }
    }
};


globals.polishedList = new Set()
elements.polish = {
    desc: "Polishes textured elements",
    category: "tools",
    color: ["#a0dff0", "#c0e8f8", "#e0f5ff"],
    tool(pixel) {
        let element = pixel.element
        if ((elements[pixel.element].colorPattern && !globals.polishedList.has(`${pixel.x}, ${pixel.y}`)) || shiftDown) {
            deletePixel(pixel.x, pixel.y)
            createPixel(element, pixel.x, pixel.y)
            globals.polishedList.add(`${pixel.x}, ${pixel.y}`)
        }
    },
    onUnselect() {
        globals.polishedList.clear()
    }
}

elements[" "] = {
    category: "extras",
    onSelect() {
        logMessage("This Element has weird properties since its a space ' '")
    },
    alias: "space"
}

elements.paper_filter = {
    desc: "Filters solids from liquids",
    color: "#ececec",
    behavior: behaviors.WALL,
    reactions: {
        "light": { stain1: "#ebdfa7" },
        "oxygen": { stain1: "#ebdfa7" }
    },
    tempHigh: 248,
    stateHigh: ["fire", "fire", "fire", "fire", "fire", "ash"],
    burn: 70,
    burnTime: 300,
    burnInto: ["fire", "fire", "fire", "fire", "fire", "ash"],
    category: "machines",
    density: 1201,
    breakInto: "confetti",
    breakIntoColor: ["#ffffff", "#e6e6e6", "#dbdbdb"],
    tick(pixel) {
        let upPixel = getPixel(pixel.x, pixel.y - 1)

        if (upPixel && elements[upPixel.element].state == "liquid" && !pixel.con) {
            deletePixel(pixel.x, pixel.y - 1)
            pixel.con = upPixel
        }

        if (upPixel && (upPixel.element === "paper_filter" || upPixel.element === "indestructable_filter") && upPixel.con && !pixel.con) {
            let liquid = upPixel.con
            let viscMove = true

            let visc = elements[liquid.element].viscosity
            if (visc) {
                viscMove = (Math.random() * 100) < (100 / Math.pow(visc, 0.5))
            }

            if (viscMove) {
                pixel.con = liquid
                delete upPixel.con
            }
        }

        if (isEmpty(pixel.x, pixel.y + 1) && !outOfBounds(pixel.x, pixel.y + 1) && pixel.con) {
            let liquid = pixel.con
            let viscExit = true

            let visc = elements[liquid.element].viscosity
            if (visc) {
                viscExit = (Math.random() * 100) < (100 / Math.pow(visc, 0.5))
            }

            if (viscExit) {
                createPixel(liquid.element, pixel.x, pixel.y + 1)
                delete pixel.con
            }
        }
    }
}

elements.indestructable_filter = {
    desc: "Filters solids from liquids",
    color: "#aaaaaa",
    behavior: behaviors.WALL,
    category: "machines",
    state: "solid",
    movable: false,
    tick(pixel) {
        let upPixel = getPixel(pixel.x, pixel.y - 1)
        let belowPixel = getPixel(pixel.x, pixel.y + 1)

        if (upPixel && elements[upPixel.element].state == "liquid" && !pixel.con) {
            deletePixel(pixel.x, pixel.y - 1)
            pixel.con = upPixel
        }

        if (upPixel && (upPixel.element === "indestructable_filter" || upPixel.element === "paper_filter") && upPixel.con && !pixel.con) {
            let liquid = upPixel.con
            let viscMove = true

            let visc = elements[liquid.element].viscosity
            if (visc) {
                viscMove = (Math.random() * 100) < (100 / Math.pow(visc, 0.5))
            }

            if (viscMove) {
                pixel.con = liquid
                delete upPixel.con
            }
        }

        if (isEmpty(pixel.x, pixel.y + 1) && !outOfBounds(pixel.x, pixel.y + 1) && pixel.con) {
            let liquid = pixel.con
            let viscExit = true

            let visc = elements[liquid.element].viscosity
            if (visc) {
                viscExit = (Math.random() * 100) < (100 / Math.pow(visc, 0.5))
            }

            if (viscExit) {
                createPixel(liquid.element, pixel.x, pixel.y + 1)
                delete pixel.con
            }
        }
    }
}

globals.blackHoleExpand = false
elements.black_hole = {
    color: "#111111",
    hardness: 1,
    category: "special",
    properties: {
        absorbed: 0
    },
    renderer: function (pixel, ctx) {
        if (!viewInfo[view].colorEffects) { drawDefault(ctx, pixel); return }
        renderPresets.HEATGLOW(pixel, ctx);
        if (pixel.alpha === 0) return;

        let edge = false;
        pixel.edge = false;
        pixel.color = "#111111";

        for (var i = 0; i < adjacentCoords.length; i++) {
            var coords = adjacentCoords[i];
            var x = pixel.x + coords[0];
            var y = pixel.y + coords[1];
            if (!outOfBounds(x, y)) {
                let neighbor = getPixel(x, y);
                if (!neighbor || elements[neighbor.element].movable !== elements[pixel.element].movable) {
                    edge = true;
                    break;
                }
            }
        }
        if (edge) { pixel.color = "#ffae00"; pixel.edge = true }
    },
    tick(pixel) {
        // Glow effect
        if (pixel.edge) {
            pixel.glow = true;
            if (enabledMods.includes("mods/glow.js")) {
                pixel.emit = 10;
            }
        }
        else {
            pixel.glow = false;
            if (enabledMods.includes("mods/glow.js")) {
                pixel.emit = 0;
            }
        }

        // Suction physics
        let radius = 20; // how far the suction reaches
        for (let dx = -radius; dx <= radius; dx++) {
            for (let dy = -radius; dy <= radius; dy++) {
                if (dx === 0 && dy === 0) continue;

                let x = pixel.x + dx;
                let y = pixel.y + dy;

                if (!outOfBounds(x, y)) {
                    let other = getPixel(x, y);
                    if (other && other !== pixel) {
                        let elemDef = elements[other.element];

                        // Skip if indestructible
                        if (elemDef.hardness === 1) continue;

                        // Distance to black hole
                        let dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist <= radius) {
                            // Suction chance: closer = stronger pull
                            let chance = 1 / dist;
                            if (Math.random() < chance) {
                                let stepX = Math.sign(pixel.x - x);
                                let stepY = Math.sign(pixel.y - y);

                                let newX = x + stepX;
                                let newY = y + stepY;

                                if (isEmpty(newX, newY) && !outOfBounds(newX, newY)) {
                                    movePixel(other, newX, newY);
                                }
                                else if (dist <= 1.5) {
                                    deletePixel(x, y); // absorb it
                                    pixel.absorbed++
                                }
                            }
                        }
                    }
                }
            }
            if (globals.blackHoleExpand) {
                for (var i = 0; i < adjacentCoords.length; i++) {
                    var x = pixel.x + adjacentCoords[i][0];
                    var y = pixel.y + adjacentCoords[i][1];
                    if (pixel.absorbed >= 30 && isEmpty(x, y)) {
                        createPixel("black_hole", x, y)
                        pixel.absorbed = 0
                    }
                }
            }
        }
    },
    forceSaveColor: true,
    onSelect() {
        promptChoose(
            "Do you want the black hole to grow?",
            ["Yes", "No"],
            (choice) => {
                if (!choice) {
                    choice = "No"
                }
                if (choice == "Yes") {
                    globals.blackHoleExpand = true
                }
                else {
                    globals.blackHoleExpand = false
                }
            }
        )
    }
};

elements.white_hole = {
    color: "#ffffff",
    renderer: function (pixel, ctx) {
        if (!viewInfo[view].colorEffects) { drawDefault(ctx, pixel); return }
        renderPresets.HEATGLOW(pixel, ctx);
        if (pixel.alpha === 0) return;
        let edge = false;
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coords = adjacentCoords[i];
            var x = pixel.x + coords[0];
            var y = pixel.y + coords[1];
            if (isEmpty(x, y) || (!outOfBounds(x, y) && elements[pixelMap[x][y].element].movable !== elements[pixel.element].movable)) {
                edge = true;
                break;
            }
        }
        if (edge) { drawSquare(ctx, "rgba(0,0,0," + (pixel.alpha || 1) / 4 + ")", pixel.x, pixel.y) }
    },
    tick(pixel) {
        for (var i = 0; i < squareCoords.length; i++) {
            var coord = squareCoords[i];
            var x = pixel.x + coord[0];
            var y = pixel.y + coord[1];
            if (isEmpty(x, y) && !outOfBounds(x, y) && Math.random() <= 0.0005) {
                createPixel(
                    ["proton", "neutron", "electric",
                        "proton", "neutron", "electric",
                        "proton", "neutron", "electric",
                        "proton", "neutron", "electric",
                        "random"], x, y)
            }
        }
        let radius = 20;
        for (let dx = -radius; dx <= radius; dx++) {
            for (let dy = -radius; dy <= radius; dy++) {
                if (dx === 0 && dy === 0) continue;

                let x = pixel.x + dx;
                let y = pixel.y + dy;

                if (!outOfBounds(x, y)) {
                    let other = getPixel(x, y);
                    if (other && other !== pixel) {
                        let elemDef = elements[other.element];

                        if (elemDef.hardness === 1) continue;

                        let dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist <= radius) {
                            let chance = 1 / (dist * 0.75);
                            if (Math.random() < chance) {
                                let stepX = Math.sign(pixel.x - x);
                                let stepY = Math.sign(pixel.y - y);

                                let newX = x - stepX;
                                let newY = y - stepY;

                                if (isEmpty(newX, newY) && !outOfBounds(newX, newY)) {
                                    movePixel(other, newX, newY);
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    hardness: 1,
    behavior: behaviors.WALL,
    category: "special"
}

elements.cacao_fruit = {
    color: "#854700",
    behavior: [
        "XX|ST:cacao_stem|XX",
        "ST:cacao_stem|XX|ST:cacao_stem",
        "XX|ST:cacao_stem AND M1|XX"
    ],
    isFood: true,
    burn: 10,
    burnTime: 100,
    burnInto: "ash",
    breakInto: "cacao_bean",
    category: "food",
    state: "solid",
    density: 1000
}

elements.cacao_bean = {
    color: "#ffe7ba",
    isFood: true,
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2%10|M1|M2%10"
    ],
    tempHigh: 100,
    stateHigh: "dried_cacao_bean",
    onStateHigh(pixel) { releaseElement(pixel, "steam") },
    state: "solid",
    category: "food",
    density: 1000
}

elements.dried_cacao_bean = {
    color: "#61321e",
    behavior: behaviors.POWDER,
    reactions: {
        "sugar_water": { elem2: "melted_chocolate", tempMin: 65 },
        "water": { elem2: "melted_chocolate", tempMin: 65 }
    },
    tempHigh: 400,
    stateHigh: "ash",
    isFood: true,
    category: "food",
    state: "solid",
    density: 1000
}

elements.coffee_bean.reactions.sugar_water = { elem2: "coffee", tempMin: 80 }
elements.coffee.reactions.sugar_water = { elem2: "coffee", tempMin: 70, chance: 0.2 }
elements.coffee_ground.reactions.sugar_water = elements.coffee_ground.reactions.water
elements._ = {
    category: "extras",
    onSelect() {
        logMessage("Another way to make an element with no name \"_\"")
    },
    alias: ["underscore"]
}

elements.cacao_seed = {
    color: "#8b3f00",
    behavior: behaviors.STURDYPOWDER,
    cooldown: defaultCooldown,
    category: "life",
    tempHigh: 400,
    stateHigh: "fire",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 50,
    burnTime: 20,
    state: "solid",
    tick(pixel) {
        let belowPixel = getPixel(pixel.x, pixel.y + 1)
        if ((!isEmpty(pixel.x, pixel.y + 1) && belowPixel) || outOfBounds(pixel.x, pixel.y + 1) && Math.random() <= 0.005) {
            changePixel(pixel, "cacao_stem")
            pixel.stage = 1
        }
    }
}

elements.cacao_stem = {
    color: "#916a00",
    renderer: renderPresets.WOODCHAR,
    movable: false,
    tempHigh: 100,
    stateHigh: "wood",
    tempLow: -30,
    stateLow: "wood",
    category: "life",
    burn: 2,
    burnTime: 300,
    burnInto: ["sap", "ember", "charcoal", "smoke"],
    state: "solid",
    density: 1500,
    hardness: 0.15,
    breakInto: ["sap", "sawdust"],
    seed: "cacao_seed",
    forceSaveColor: true,
    stateHighColorMultiplier: 0.95,
    onPlace(pixel) {
        pixel.stage = 1
    },
    hoverStat(pixel) {
        if (pixel.stage) return pixel.stage;
        else return 0;
    },
    tick(pixel) {
        // 1 = trunk
        // 2 = spread
        // 3 = stop
        if (pixel.stage === 1 && isEmpty(pixel.x, pixel.y - 1) && Math.random() <= 0.05) {
            tryMove(pixel, pixel.x, pixel.y - 1, "cacao_stem")
            let oldPixel = getPixel(pixel.x, pixel.y + 1)
            if (oldPixel) {
                delete oldPixel.stage
            }
            if (Math.random() <= 0.3) {
                pixel.stage = 2
            }
        }
        if (pixel.stage === 2) {
            let rand = Math.random()
            let nx;
            if (rand < 0.4) {
                nx = 1
            }
            else if (rand < 0.8) {
                nx = -1
            }
            else nx = 0;
            if (isEmpty(pixel.x + nx, pixel.y - 1) && Math.random() <= 0.05) {
                createPixel(["cacao_stem", "plant"], pixel.x + nx, pixel.y - 1)
                let newPixel = getPixel(pixel.x + nx, pixel.y - 1)
                if (Math.random() <= 0.2 && newPixel) {
                    newPixel.stage = 3
                }
                else if (newPixel) newPixel.stage = 2;
            }
            if (!isEmpty(pixel.x + 1, pixel.y - 1) && !isEmpty(pixel.x, pixel.y - 1) && !isEmpty(pixel.x - 1, pixel.y - 1) && Math.random() <= 0.005) {
                shuffleArray(adjacentCoordsShuffle)
                for (var i = 0; i < adjacentCoordsShuffle.length; i++) {
                    var x = pixel.x + adjacentCoordsShuffle[i][0];
                    var y = pixel.y + adjacentCoordsShuffle[i][1];
                    if (isEmpty(x, y) && !pixel.fruitMade) {
                        createPixel("cacao_fruit", x, y)
                        pixel.fruitMade = true
                        pixel.fruitCoordsx = x
                        pixel.fruitCoordsy = y
                        break
                    }
                }
            }
        }
        if (pixel.fruitCoordsx && pixel.fruitCoordsy) {
            if (getPixel(pixel.fruitCoordsx, pixel.fruitCoordsy) && getPixel(pixel.fruitCoordsx, pixel.fruitCoordsy).element === "cacao_fruit") return;
            pixel.fruitMade = false
            delete pixel.fruitCoordsx
            delete pixel.fruitCoordsy
        }
    }
}


// --- audio setup ---
// @ts-ignore
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playNote(frequency, duration = 1, type = "sine", volume = 0.1) {
    if (!Number.isFinite(frequency)) {
        console.error("Invalid frequency:", frequency);
        return;
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.value = frequency;

    gain.gain.setValueAtTime(volume, audioCtx.currentTime);
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}


const pianoFrequencies = {
    "A0": 27.500, "A#0": 29.135, "BB0": 29.135, "B0": 30.868,
    "C1": 32.703, "C#1": 34.648, "DB1": 34.648, "D1": 36.708,
    "D#1": 38.891, "EB1": 38.891, "E1": 41.203, "F1": 43.654,
    "F#1": 46.249, "GB1": 46.249, "G1": 48.999, "G#1": 51.913,
    "AB1": 51.913, "A1": 55.000, "A#1": 58.270, "BB1": 58.270,
    "B1": 61.735,

    "C2": 65.406, "C#2": 69.296, "DB2": 69.296, "D2": 73.416,
    "D#2": 77.782, "EB2": 77.782, "E2": 82.407, "F2": 87.307,
    "F#2": 92.499, "GB2": 92.499, "G2": 97.999, "G#2": 103.826,
    "AB2": 103.826, "A2": 110.000, "A#2": 116.541, "BB2": 116.541,
    "B2": 123.471,

    "C3": 130.813, "C#3": 138.591, "DB3": 138.591, "D3": 146.832,
    "D#3": 155.563, "EB3": 155.563, "E3": 164.814, "F3": 174.614,
    "F#3": 184.997, "GB3": 184.997, "G3": 195.998, "G#3": 207.652,
    "AB3": 207.652, "A3": 220.000, "A#3": 233.082, "BB3": 233.082,
    "B3": 246.942,

    "C4": 261.626, "C#4": 277.183, "DB4": 277.183, "D4": 293.665,
    "D#4": 311.127, "EB4": 311.127, "E4": 329.628, "F4": 349.228,
    "F#4": 369.994, "GB4": 369.994, "G4": 391.995, "G#4": 415.305,
    "AB4": 415.305, "A4": 440.000, "A#4": 466.164, "BB4": 466.164,
    "B4": 493.883,

    "C5": 523.251, "C#5": 554.365, "DB5": 554.365, "D5": 587.330,
    "D#5": 622.254, "EB5": 622.254, "E5": 659.255, "F5": 698.456,
    "F#5": 739.989, "GB5": 739.989, "G5": 783.991, "G#5": 830.609,
    "AB5": 830.609, "A5": 880.000, "A#5": 932.328, "BB5": 932.328,
    "B5": 987.767,

    "C6": 1046.502, "C#6": 1108.731, "DB6": 1108.731, "D6": 1174.659,
    "D#6": 1244.508, "EB6": 1244.508, "E6": 1318.510, "F6": 1396.913,
    "F#6": 1479.978, "GB6": 1479.978, "G6": 1567.982, "G#6": 1661.219,
    "AB6": 1661.219, "A6": 1760.000, "A#6": 1864.655, "BB6": 1864.655,
    "B6": 1975.533,

    "C7": 2093.005, "C#7": 2217.461, "DB7": 2217.461, "D7": 2349.318,
    "D#7": 2489.016, "EB7": 2489.016, "E7": 2637.020, "F7": 2793.826,
    "F#7": 2959.955, "GB7": 2959.955, "G7": 3135.963, "G#7": 3322.438,
    "AB7": 3322.438, "A7": 3520.000, "A#7": 3729.310, "BB7": 3729.310,
    "B7": 3951.066,

    "C8": 4186.009
};


globals.note = 261.626; // default C4
globals.notesToPlay = [];

function flushNotes() {
    if (globals.notesToPlay.length === 0) return;


    let baseVolume = 0.2;
    let volume = baseVolume / Math.sqrt(globals.notesToPlay.length);

    for (let f of globals.notesToPlay) {
        playNote(f, 1, "sine", volume);
    }

    globals.notesToPlay = [];
}

elements.note_block = {
    color: "#965500",
    behavior: behaviors.WALL,
    onSelect() {
        promptInput(
            "Select the note this note block should be",
            function (choice) {
                if (!choice) {
                    if (!globals.note) { globals.note = 261.626; }
                    return;
                }
                let key = choice.toUpperCase();
                if (key in pianoFrequencies) {
                    globals.note = pianoFrequencies[key];
                } else {
                    globals.note = 261.626; // fallback = C4
                }
            },
            "Note prompt"
        );
    },
    onPlace(pixel) {
        pixel.note = globals.note;
    },
    tick(pixel) {
        if (pixel.charge) {
            globals.notesToPlay.push(Number(pixel.note));
        }
    },
    conduct: 1,
    category: "machines"
};

runEveryTick(function () { flushNotes() });

/*
elements.uncook = {
    color: ["#4dcdff", "#70ddff", "#bcddff", "#ffffff"],
    category: "tools",
    tool(pixel) {
        if (!pixel || !pixel.element) return;

        // 1) If the current element itself defines stateLow, use it (common case)
        const cur = elements[pixel.element];
        if (cur && cur.stateLow !== undefined) {
            const low = cur.stateLow;
            pixel.element = Array.isArray(low) ? low[Math.floor(Math.random() * low.length)] : low;
            if (typeof pixel.temp === "number") pixel.temp = Math.max(0, pixel.temp - 1);
            return; // done
        }

        // 2) Otherwise search for an element whose stateHigh === the current element
        for (const key in elements) {
            const el = elements[key];
            if (!el) continue;
            if (el.stateHigh === pixel.element) {
                // 'key' is the low-state element name
                changePixel(pixel, key)
                if (typeof pixel.temp === "number") pixel.temp = Math.max(0, pixel.temp - 1);
                return; // done
            }
            // If el.stateHigh can be an array of high-state names:
            if (Array.isArray(el.stateHigh) && el.stateHigh.includes(pixel.element)) {
                changePixel(pixel, key)
                if (typeof pixel.temp === "number") pixel.temp = Math.max(0, pixel.temp - 1);
                return;
            }
        }
    }
};
*/

elements.roman_cement = {
    color: "#b8b8b8",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 1000,
    density: 1400,
    state: "solid",
    tempLow: -10,
    stateLow: "roman_concrete",
    tempHigh: 1550,
    stateHigh: "magma",
    tick(pixel) {
        if (pixelTicks - pixel.start > 100 && Math.random() <= 0.1) {
            changePixel(pixel, "roman_concrete")
        }
    }
}

elements.roman_concrete = {
    color: "#ababab",
    behavior: behaviors.SUPPORT,
    tempHigh: 1500,
    stateHigh: "magma",
    category: "powders",
    state: "solid",
    density: 2400,
    hardness: 0.5,
    breakInto: "dust",
    darkText: true
}

/**
 * 
 * @param {string} element 
 * @param {object} reaction 
 * @returns {void}
 */
function doWaterReactions(element, reaction) {
    if (!elements[element].reactions) {
        elements[element].reactions = {}
    }
    elements[element].reactions.water = reaction
    elements[element].reactions.salt_water = reaction
    elements[element].reactions.pool_water = reaction
    elements[element].reactions.sugar_water = reaction
    elements[element].reactions.dirty_water = reaction
    elements[element].reactions.selter = reaction
    elements[element].reactions.primordial_soup = reaction
    elements[element].reactions.nut_milk = reaction
}

doWaterReactions("slaked_lime", { elem1: "roman_cement", elem2: null, chance: 0.25 })

globals.cachedWords = [];
globals.otherCachedWords = [];
globals.filteredCachedWords = [];
globals.loadingLogged = false;


async function getWordList() {
    if (globals.cachedWords) return globals.cachedWords;
    try {
        const response = await fetch("https://raw.githubusercontent.com/first20hours/google-10000-english/refs/heads/master/google-10000-english-no-swears.txt");
        if (!response.ok) throw new Error('Network error');
        const text = await response.text();
        globals.cachedWords = text.split("\n");
        return globals.cachedWords;
    } catch (err) {
        console.error(err);
        return [];
    }
}


async function getCleanWordList() {
    if (globals.otherCachedWords) return globals.otherCachedWords;
    try {
        const response = await fetch("https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words.txt");
        if (!response.ok) throw new Error('Network error');
        const text = await response.text();
        globals.otherCachedWords = text.split("\n");
        return globals.otherCachedWords;
    } catch (err) {
        console.error(err);
        return [];
    }
}

async function filterWordList() {
    if (!globals.cachedWords) await getWordList();
    if (!globals.otherCachedWords) await getCleanWordList();

    if (globals.filteredCachedWords) return globals.filteredCachedWords;

    const cleanSet = new Set(globals.otherCachedWords);
    globals.filteredCachedWords = [];

    const chunkSize = 1000;
    for (let i = 0; i < globals.cachedWords.length; i += chunkSize) {
        const chunk = globals.cachedWords.slice(i, i + chunkSize);
        globals.filteredCachedWords.push(...chunk.filter(word => cleanSet.has(word)));
        await new Promise(requestAnimationFrame);
    }
    console.log("Finished filtering")
    return globals.filteredCachedWords;
}

filterWordList()

// getting myself familiar with async functions
elements.random_word_generator = {
    color: "#ffffff",
    behavior: behaviors.WALL,
    desc: "When shocked logs a random word",
    conduct: 1,
    category: "special",
    tick: function (pixel) {
        pixel.cd ??= 0;

        if (pixel.charge === 1 && pixel.cd <= 0) {
            if (!globals.filteredCachedWords && !globals.loadingLogged) {
                logMessage("Loading...");
                globals.loadingLogged = true;
            }

            const words = globals.filteredCachedWords ?? []

            if (words.length > 0) {
                const word = words[Math.floor(Math.random() * words.length)];
                logMessage("Your word is: " + word);
                pixel.cd = 10;
            } else {
                logMessage("Failed to load words.");
            }
        } else if (pixel.cd > 0) {
            pixel.cd--;
        }
    }
};

globals.paint_color = "#ff0000";

elements.paint_using_hex = {
    color: elements.paint.color,
    onSelect() {
        promptInput(
            "Select the color you want in hex. If you pass an array, make sure each hex value is wrapped with quotes.",
            (choice) => {
                if (!choice) return;

                const regex = /^#([a-fA-F0-9]{6})$/;

                if (regex.test(choice)) {
                    globals.paint_color = choice;
                    return;
                }

                try {
                    const converted = choice.replace(/'/g, '"')
                    const parsed = JSON.parse(converted);

                    if (Array.isArray(parsed)) {
                        let valid = true;
                        for (let value of parsed) {
                            if (!regex.test(value)) {
                                valid = false;
                                break;
                            }
                        }
                        if (valid) {
                            globals.paint_color = parsed;
                            return;
                        }
                    }
                } catch (e) {
                    logMessage("Parse failed")
                    console.log(e)
                }

                logMessage("Invalid color or array of colors");
                console.log(`${choice}`)
            }
        );
    },
    tool(pixel) {
        if (!shiftDown) {
            pixel.color = pixelColorPick(pixel, globals.paint_color);
        }
        else if (Array.isArray(globals.paint_color)) {
            pixel.color = choose(globals.paint_color)
        }
        else {
            pixel.color = globals.paint_color
        }
    },
    category: "tools"
};

globals.rCircle = false
globals.rRGBLed = false
globals.rCustomBomb = false
dependOn("betterSettings.js", () => {
    // @ts-ignore
    var Reset = new SettingsTab("Reset");
    // @ts-ignore
    var resetCircle = new Setting("Reset circle value and radius on reset", "Reset circle", settingType.BOOLEAN, false, defaultValue = false);
    // @ts-ignore
    var resetRGBLed = new Setting("Reset RGB Led value on reset", "Reset RGB Led", settingType.BOOLEAN, false, defaultValue = false);
    // @ts-ignore
    var resetCustomBomb = new Setting("Reset Custom Bomb value on reset", "Reset Custom Bomb", settingType.BOOLEAN, false, defaultValue = false);
    Reset.registerSettings("Reset", resetRGBLed)
    Reset.registerSettings("Reset", resetCircle)
    Reset.registerSettings("Reset", resetCustomBomb)
    // @ts-ignore
    settingsManager.registerTab(Reset);
    runEveryTick(() => {
        if (resetCircle.value == true) {
            globals.rCircle = true
        } else globals.rCircle = false
        if (resetCustomBomb.value == true) {
            globals.rCustomBomb = true
        } else globals.rCustomBomb = false
        if (resetRGBLed.value == true) {
            globals.rRGBLed = true
        } else globals.rRGBLed = false
    })
}, true)

elements.quartz = {
    color: ["#f0f0f0", "#ebebeb", "#f8f8f8"],
    grain: 0,
    conduct: 0.3,
    behavior: behaviors.WALL,
    onBreak(pixel) {
        if (Math.random() <= 0.2) {
            pixel.charge = 1
        }
    },
    onPress(pixel) {
        if (Math.random() <= 0.2) {
            pixel.charge = 1
        }
    },
    density: 2650,
    hardness: 0.7,
    breakInto: "quartz_powder",
    category: "solids"
}

elements.quartz_powder = {
    color: ["#dddddd", "#e0e0e0", "#f0f0f0"],
    grain: 0,
    conduct: 0.3,
    behavior: behaviors.POWDER,
    onBreak(pixel) {
        if (Math.random() <= 0.2) {
            pixel.charge = 1
        }
    },
    density: 2650,
    hardness: 0.7,
    category: "powders"
}

elements.carrot_seed = {
    color: '#925420',
    behavior: behaviors.STURDYPOWDER,
    cooldown: defaultCooldown,
    category: "life",
    tempHigh: 400,
    stateHigh: "fire",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 50,
    burnTime: 20,
    state: "solid",
    tick(pixel) {
        let belowPixel = getPixel(pixel.x, pixel.y + 1)
        if (belowPixel && eLists.SOIL.includes(belowPixel.element) && Math.random() <= 0.05) {
            changePixel(belowPixel, "carrot")
            belowPixel.stage = 1
            belowPixel.connected = true
            changePixel(pixel, "plant")
        }
    }
}


elements.carrot = {
    color: ["#ec9a00", "#d67200"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    density: 700,
    isFood: true,
    breakInto: "juice",
    breakIntoColor: "#ffa600",
    hoverStat(pixel) {
        if (pixel.stage) return pixel.stage
        else return 0;
    },
    tick(pixel) {
        let belowPixel = getPixel(pixel.x, pixel.y + 1)
        if (getPixel(pixel.x, pixel.y - 1) && getPixel(pixel.x, pixel.y - 1).element != "carrot" && getPixel(pixel.x, pixel.y - 1).element != "plant") {
            pixel.connected = false;
        }
        if (!getPixel(pixel.x, pixel.y - 1)) {
            pixel.connected = false
        }
        if (pixel.stage == 1 && Math.random() <= 0.05 && belowPixel && eLists.SOIL.includes(belowPixel.element) && pixel.connected) {
            changePixel(belowPixel, "carrot");
            let newStage;
            if (Math.random() <= 0.3) newStage = 1; else newStage = 2;
            belowPixel.stage = newStage
            belowPixel.connected = true
        }
        else if (pixel.stage == 2) {
            if (Math.random() <= 0.1 && belowPixel && eLists.SOIL.includes(belowPixel.element) && pixel.connected) {
                changePixel(belowPixel, "root")
            }
        }
    }
}

function factorial(n) {
    if (n < 0) throw new Error("Factorial not defined for negative numbers");
    let result = 1;
    for (let i = 2; i <= Number(n); i++) {
        result *= i;
    }
    return result;
}

function parseEquation(eq) {
    eq = eq.replace(/\s+/g, "");

    let tokens = [];
    let current_num = "";

    for (let i = 0; i < eq.length; i++) {
        // Multi-character constants
        if (eq.startsWith("pi", i)) {
            if (current_num !== "") { tokens.push(parseFloat(current_num)); current_num = ""; }
            tokens.push(Math.PI);
            i++;
            continue;
        }
        if (eq.startsWith("phi", i)) {
            if (current_num !== "") { tokens.push(parseFloat(current_num)); current_num = ""; }
            tokens.push(1.6180339887);
            i += 2;
            continue;
        }
        // Multi-character functions
        if (eq.startsWith("sqrt", i)) {
            if (current_num !== "") { tokens.push(parseFloat(current_num)); current_num = ""; }
            tokens.push("sqrt");
            i += 3; // skip 'qrt'
            continue;
        }

        let char = eq[i];

        if (/[0-9.]/.test(char)) {
            current_num += char;
        } else {
            if (current_num !== "") { tokens.push(parseFloat(current_num)); current_num = ""; }

            if (char === "-" && (i === 0 || /[+\-*/(]/.test(eq[i - 1]))) {
                current_num = "-";
            }
            else if (char === "e") { tokens.push(Math.E); }
            else if (char === "π") { tokens.push(Math.PI); }
            else if (char === "φ") { tokens.push(1.6180339887); }
            else if (char === "×") { tokens.push("*"); }
            else if (char === "÷") { tokens.push("/"); }
            else { tokens.push(char); }
        }
    }

    if (current_num !== "") { tokens.push(parseFloat(current_num)); }

    // Implicit multiplication
    let fixed = [];
    for (let i = 0; i < tokens.length; i++) {
        fixed.push(tokens[i]);
        let curr = tokens[i];
        let next = tokens[i + 1];

        if (
            (typeof curr === "number" && next === "(") ||
            (curr === ")" && typeof next === "number") ||
            (curr === ")" && next === "(") ||
            (typeof curr === "number" && next === "sqrt") // implicit multiplication with functions
        ) {
            fixed.push("*");
        }
    }

    return fixed;
}


function evaluate(tokens) {
    function helper(start = 0) {
        let stack = [];
        let i = start;

        while (i < tokens.length) {
            let token = tokens[i];

            if (typeof token === "number") {
                stack.push(token);

                // Check for factorial
                if (tokens[i + 1] === "!") {
                    stack[stack.length - 1] = factorial(stack[stack.length - 1]);
                    i++; // skip the '!' token
                }
            }
            else if (token === "sqrt") {
                let [val, nextIndex] = helper(i + 1);
                stack.push(Math.sqrt(val));

                // Check for factorial after function
                if (tokens[nextIndex + 1] === "!") {
                    stack[stack.length - 1] = factorial(stack[stack.length - 1]);
                    nextIndex++;
                }

                i = nextIndex;
            }
            else if (token === "(") {
                let [val, nextIndex] = helper(i + 1);
                stack.push(val);

                // Factorial for parentheses
                if (tokens[nextIndex + 1] === "!") {
                    stack[stack.length - 1] = factorial(stack[stack.length - 1]);
                    nextIndex++;
                }

                i = nextIndex;
            }
            else if (token === ")") {
                break;
            }
            else {
                // operator
                stack.push(token);
            }
            i++;
        }


        // First handle * and /
        for (let j = 0; j < stack.length; j++) {
            if (stack[j] === "*" || stack[j] === "/") {
                let left = stack[j - 1];
                let right = stack[j + 1];
                let result = stack[j] === "*" ? left * right : left / right;
                stack.splice(j - 1, 3, result);
                j--;
            }
        }

        // Then handle + and -
        for (let j = 0; j < stack.length; j++) {
            if (stack[j] === "+" || stack[j] === "-") {
                let left = stack[j - 1];
                let right = stack[j + 1];
                let result = stack[j] === "+" ? left + right : left - right;
                stack.splice(j - 1, 3, result);
                j--;
            }
        }

        return [stack[0], i];
    }

    return helper(0)[0];
}

function calculate(expr) {
    let tokens = parseEquation(expr);
    return evaluate(tokens);
}

elements.calculator = {
    canPlace: false,
    onSelect() {
        promptInput("Input your equation", (eq) => {
            try {
                let ans = calculate(eq)
                if (ans == Infinity) {
                    logMessage("Division by 0 error")
                    return;
                }
                if (isNaN(ans)) {
                    logMessage("Error")
                    return;
                }
                logMessage(ans.toFixed(10))
            }
            catch (e) {
                logMessage("Invalid Characters Detected")
                console.log(e)
            }
        })
    },
    category: "tools"
}

elements.random_teleporter = {
    buttonColor: ["#5fdaff", "#dd8500"],
    color: "#5fdaff",
    grain: 0,
    tick(pixel) {
        // Color fading
        pixel.fadeTo ??= "orange"
        pixel.colorStay ??= 30
        if (pixel.fadeTo === "orange") {
            if (pixel.colorStay > 0) {
                let ratio = pixel.colorStay / 30
                pixel.color = fadeColor("#dd8500", "#5fdaff", ratio)
                pixel.colorStay--
            } else pixel.fadeTo = "blue";
        } else {
            if (30 - pixel.colorStay > 0) {
                let ratio = (30 - pixel.colorStay) / 30
                pixel.color = fadeColor("#5fdaff", "#dd8500", ratio)
                pixel.colorStay++
            } else pixel.fadeTo = "orange";
        }

        shuffleArray(squareCoordsShuffle)
        for (var i = 0; i < squareCoordsShuffle.length; i++) {
            let coord = squareCoordsShuffle[i];
            let x = pixel.x + coord[0];
            let y = pixel.y + coord[1];
            if (!isEmpty(x, y)) {
                let p = getPixel(x, y)
                if (!p) return;
                if (elements[p.element]?.hardness === 1) return;
                let availableCoords = [];
                for (let j = 0; j <= width; j++) {
                    for (let k = 0; k <= height; k++) {
                        if (isEmpty(j, k)) {
                            availableCoords.push([j, k])
                        }
                    }
                }
                if (availableCoords.length > 0) {
                    let newCoords = choose(availableCoords)
                    tryMove(p, newCoords[0], newCoords[1])
                }
            }
        }
    },
    hardness: 1,
    behavior: behaviors.WALL,
    renderer: renderPresets.BORDER,
    category: "machines"
}

elements.fill_all = {
    color: "#ae4cd9",
    behavior: behaviors.WALL,
    category: "special",
    reactions: {
        "neutron": { elem1: "lattice" },
        "proton": { elem1: "vertical" },
        "electric": { elem1: "horizontal" },
        "positron": { elem1: "vertical" },
        "plasma": { elem1: "armageddon", tempMin: 500, charged: true }
    },
    density: 1834,
    tick(pixel) {
        for (let x = 0; x <= width; x++) {
            for (let y = 0; y <= height; y++) {
                tryCreate("filler", x, y)
            }
        }
        changePixel(pixel, "filler")
    },
    maxSize: 1,
    excludeRandom: true
}

globals.elemFillAll = "sand"
elements.element_fill_all = {
    color: "#ae4cd9",
    behavior: behaviors.WALL,
    category: "special",
    excludeRandom: true,
    reactions: {
        "neutron": { elem1: "lattice" },
        "proton": { elem1: "vertical" },
        "electric": { elem1: "horizontal" },
        "positron": { elem1: "vertical" },
        "plasma": { elem1: "armageddon", tempMin: 500, charged: true }
    },
    onSelect() {
        promptInput("What element should this filler fill", (elem) => {
            let el = mostSimilarElement(elem)
            if (el) {
                globals.elemFillAll = el
            }
        }, "Element Prompt")
    },
    tick(pixel) {
        for (let x = 0; x <= width; x++) {
            for (let y = 0; y <= height; y++) {
                tryCreate(globals.elemFillAll, x, y)
            }
        }
        changePixel(pixel, globals.elemFillAll)
    },
    maxSize: 1,
}

globals.pulsecol1 = "#ffffff"
globals.pulsecol2 = "#000000"
elements.pulsing_color = {
    buttonColor: rainbowColor,
    behavior: behaviors.WALL,
    category: "special",
    onSelect() {
        promptInput("Input the starting color of the pulse in hex", (col1) => {
            if (col1) {
                if (/^#([A-Fa-f0-9]{6})$/.test(col1)) {
                    globals.pulsecol1 = col1
                    promptInput("Input the second color that it should pulse to", (col2) => {
                        if (col2) {
                            if (/^#([A-Fa-f0-9]{6})$/.test(col2)) {
                                globals.pulsecol2 = col2
                            }
                        }
                    })
                }
            }
        })
    },
    onPlace(pixel) {
        pixel.color = globals.pulsecol1
    },
    tick(pixel) {
        // 1 = fade to color 2, 0 = fade to color 1
        let frames = 30
        pixel.fadeTo ??= 1
        pixel.colorStay ??= frames
        pixel.col1 ??= globals.pulsecol1
        pixel.col2 ??= globals.pulsecol2
        if (pixel.fadeTo === 1) {
            if (pixel.colorStay > 0) {
                let ratio = pixel.colorStay / frames
                pixel.color = fadeColor(pixel.col2, pixel.col1, ratio)
                pixel.colorStay--
            } else pixel.fadeTo = 0;
        } else {
            if (frames - pixel.colorStay > 0) {
                let ratio = (frames - pixel.colorStay) / frames
                pixel.color = fadeColor(pixel.col1, pixel.col2, ratio)
                pixel.colorStay++
            } else pixel.fadeTo = 1;
        }
    }
}

globals.createElemWDir = "wood"
globals.lineDir = 0
elements.element_line = {
    color: "#d9d9d9",
    behavior: behaviors.WALL,
    category: "special",
    hidden: true,
    excludeRandom: true,
    insulate: true,
    movable: false,
    onSelect() {
        promptInput("Input the element it should use", (input) => {
            if (!input) return;
            let elem = mostSimilarElement(input)
            if (elem) {
                globals.createElemWDir = elem
            }
            promptDir("Choose The direction the line should draw in", (dir) => {
                globals.lineDir = dir
            }, "Direction Input")
        }, "Element Input")
    },
    onPlace(pixel) {
        pixel.clone ??= globals.createElemWDir
        pixel.dir ??= globals.lineDir
    },
    tick(pixel) {
        if (pixel.dir === 0) {
            if (!tryMove(pixel, pixel.x + 1, pixel.y, pixel.clone)) {
                changePixel(pixel, pixel.clone, true)
            }
        }
        if (pixel.dir === 1) {
            if (!tryMove(pixel, pixel.x, pixel.y + 1, pixel.clone)) {
                changePixel(pixel, pixel.clone, true)
            }
        }
        if (pixel.dir === 2) {
            if (!tryMove(pixel, pixel.x + 1, pixel.y, pixel.clone)) {
                changePixel(pixel, pixel.clone, true)
            }
        }
        if (pixel.dir === 3) {
            if (!tryMove(pixel, pixel.x, pixel.y - 1, pixel.clone)) {
                changePixel(pixel, pixel.clone, true)
            }
        }
    }
}

globals.replaceElem = "wood"
elements.replace_all_of_element = {
    color: ["#35008a", "#000000"],
    category: "tools",
    onSelect() {
        promptInput("What should it change into?", (input) => {
            if (!input) return;
            let elem = mostSimilarElement(input)
            if (elem) {
                globals.replaceElem = elem
            }
        }, "Element Prompt")
    },
    tool(pixel) {
        let elem = pixel.element
        if (elem === globals.replaceElem) return

        for (let row of pixelMap) {
            for (let p of row) {
                if (p?.element === elem) {
                    changePixel(p, globals.replaceElem)
                }
            }
        }
    }
}

/**
 * 
 * @param {(pixel: Pixel | undefined) => void} callback 
 */
function forEachPixel(callback) {
    for (let x = 0; x <= width; x++) {
        for (let y = 0; y <= height; y++) {
            callback(pixelMap[x][y])
        }
    }
}

elements["🐔poolnoodle"] = {
    category: "extras",
    color: ["#7700ff", "#90ff90", "#ff0000", "#f700ff"],
    buttonColor: rainbowColor,
    behavior: behaviors.STURDYPOWDER,
    density: 30,
    properties: {
        panic: 0,
        panicTimer: 0
    },
    onClicked(pixel) {
        pixel.panic = 1
        pixel.panicTimer = 60
    },
    tick(pixel) {
        if (Math.random() < 0.002) {
            if (Math.random() <= 0.1 && (getPixel(pixel.x, pixel.y - 1) || outOfBounds(pixel.x, pixel.y + 1))) {
                tryMove(pixel, pixel.x, pixel.y - 2) // 2 to coutneract gravity
            }
            Math.random() < 0.5
                ? tryMove(pixel, pixel.x + 1, pixel.y)
                : tryMove(pixel, pixel.x - 1, pixel.y);
        }
        if (!pixel.panic) return
        if (pixel.panicTimer <= 0) {
            pixel.panic = 0
        }
        pixel.panicTimer--
        if (Math.random() <= 0.1 && (getPixel(pixel.x, pixel.y - 1) || outOfBounds(pixel.x, pixel.y + 1))) {
            tryMove(pixel, pixel.x, pixel.y - 2) // same as above
        }
        if (Math.random() <= 0.7) {
            Math.random() <= 0.5 ? tryMove(pixel, pixel.x + 1, pixel.y) : tryMove(pixel, pixel.x - 1, pixel.y)
        }
    }
}
