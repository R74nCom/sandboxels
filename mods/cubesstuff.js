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
    }
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
    category: "powders"
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
        "grape": { elem1: "pie", elem2: null, tempMin: 200 }
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
    breakIntoColor: ["#ff822e", "#ff8c2e"]
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
    category: "life"
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

elements.press = {
    color: ["#999999", "#c0c0c0", "#999999"],
    category: "tools",
    tool: function (pixel) {
        // edited smash code
        if (isPressable(pixel)) {
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
            if (isEmpty(x, y)) {
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
        if (Math.random() <= 0.25) {
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
    category: "powders"
}

elements.glow_stick_liquid = {
    color: ["#00ff00", "#ea00ff", "#00eeff"],
    glow: true,
    behavior: behaviors.LIQUID,
    breakInto: "glow_stick_liquid",
    category: "liquids"
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
    category: "special"
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
    color: "#FF0000",
    behavior: behaviors.WALL,
    category: "special",
    onSelect: function() {
        let ans1 = Number(prompt("Select the radius you want your circle to be:"));
        let ans2 = prompt("Now give the element your circle should be made of:");

        // Validate radius
        if (Number.isInteger(ans1) && ans1 > 0) {
            circleRad = ans1;
        } else {
            logMessage("Invalid radius, using default/last size: " + circleRad);
        }

        // Validate element
        let similar = mostSimilarElement(ans2);
        if (similar && elements[similar]) {
            circleElem = similar;
        } else {
            logMessage("Invalid element, using default/last element: " + circleElem);
        }
    },
    onPlace: function(pixel) {
        drawCircle(pixel.x, pixel.y, circleRad, circleElem);
        changePixel(pixel, circleElem);
    },
    maxSize: 1
};

runAfterReset(function() {
    circleRad = 7;
    circleElem = "wood";
})
