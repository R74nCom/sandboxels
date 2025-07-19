//broken rn dont know how to fix it yet
/*
elements.button = {
    color: "#970000",
    conduct: 1,
    charge: 0,
    category: "machines",
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
*/
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
    tool: function(pixel) {
        if(pixel.burning === true){
            delete pixel.burning;
            delete pixel.burnStart;
        }
    },
    canPlace: true
}