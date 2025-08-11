// Changelog
// Starts at version 3

/*
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
*/



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
    buttonColor: ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"],
    renderer: renderPresets.LED,
    behavior: behaviors.WALL,
    category: "machines",
    tempHigh: 1500,
    stateHigh: ["molten_glass", "molten_glass", "molten_copper"],
    conduct: 1,
    breakInto: "glass_shard",
    forceSaveColor: true,
    tick: function (pixel) {
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

elements.pyrite = {
    color: ["#d8c25e", "#bbaa49", "#998f3e"],
    alias: ["fools_gold", "Iron Disulfide"],
    density: 5000,
    tempHigh: 1177,
    stateHigh: ["iron", "molten_sulfur"],
    grain: 0.4,
    state: "solid",
    behavior: behaviors.WALL,
    category: "solids"
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
            p = getPixel(x, y)
            if (p !== null && p.element == "stench") {
                p.temp = pixel.temp
            }
        }
    }
}

elements.disco_floor = {
    color: ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"],
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

// Add TPS keybind
keybinds["KeyT"] = function () {
    tpsPrompt()
}

function addRow() {
    const table = document.getElementById("controlsTable");
    const rowCount = table.rows.length;

    const newRow = table.insertRow(rowCount - 1);

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);

    cell1.textContent = "Change TPS";
    cell2.innerHTML = "<kbd>T</kbd>";
}

addRow()

elements.randomizer = {
    buttonColor: ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"],
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
                if (p.element !== "randomizer") {
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


let circleRad = 7;
let circleElem = "wood";

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
                    circleRad = ans1
                } else {
                    circleRad = 7
                    logMessage("Invalid radius, using default size: " + circleRad);
                }
                promptInput(
                    "Select the element you want your circle to be:",
                    function (ans2) {
                        let similar = mostSimilarElement(ans2);
                        if (similar && elements[similar]) {
                            circleElem = similar;
                        } else {
                            circleElem = "wood"
                            logMessage("Invalid element, using default element: " + circleElem);
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
        drawCircle(pixel.x, pixel.y, circleRad, circleElem);
        changePixel(pixel, circleElem);
        pixel.temp = (elements[circleElem].temp || 20)
    },
    maxSize: 1,
    excludeRandom: true
};

runAfterReset(function () {
    circleRad = 7;
    circleElem = "wood";
})

function randomIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let r = randomIntInRange(0, 255);
let g = randomIntInRange(0, 255);
let b = randomIntInRange(0, 255);

elements.rgb_led = {
    buttonColor: ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"],
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
    category: "machines",
    tempHigh: 1500,
    stateHigh: ["molten_glass", "molten_glass", "molten_glass", "molten_gallium"],

    onSelect: () => {
        promptInput("Enter red value (0-255):", function (r_inp) {
            r_inp = parseInt(r_inp);
            if (r_inp > 255 || r_inp < 0 || isNaN(r_inp)) {
                logMessage("Red value is invalid, using default/last red value: " + r);
            } else {
                r = r_inp;
            }

            promptInput("Enter green value (0-255):", function (g_inp) {
                g_inp = parseInt(g_inp);
                if (g_inp > 255 || g_inp < 0 || isNaN(g_inp)) {
                    logMessage("Green value is invalid, using default/last green value: " + g);
                } else {
                    g = g_inp;
                }

                promptInput("Enter blue value (0-255):", function (b_inp) {
                    b_inp = parseInt(b_inp);
                    if (b_inp > 255 || b_inp < 0 || isNaN(b_inp)) {
                        logMessage("Blue value is invalid, using default/last blue value: " + b);
                    } else {
                        b = b_inp;
                    }
                }, "Blue Value", b); // optional default input
            }, "Green Value", g);
        }, "Red Value", r);
    },

    onPlace: (pixel) => {
        var ledColor = RGBToHex({ r: r, g: g, b: b });
        pixel.color = ledColor;
    }
};


runAfterReset(() => {
    r = 100;
    g = 100;
    b = 100;
})

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
    category: "solids"
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

explodeElem = "fire"
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
                pr1 = mostSimilarElement(input)
                if (elements[pr1]) {
                    if (pr1 === "custom_bomb") {
                        explodeElem = 'fire'
                        logMessage("Element cannot explode to itself. Using default: fire")
                    }
                    else { explodeElem = pr1 }
                }
                else {
                    explodeElem = 'fire'
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
            explodeAt(pixel.x, pixel.y, 10, explodeElem);
            deletePixel(pixel.x, pixel.y);
        }
    }
}

runAfterReset(() => {
    explodeElem = 'fire'
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
        "salt_water": { elem1: ["explosion", "explosion", "hydrogen"], temp2: 200 },
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
        "salt_water": { elem1: ["explosion", "explosion", "hydrogen"], temp2: 200 },
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
