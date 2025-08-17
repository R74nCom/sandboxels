// Inspiration from halogen.js
// --- Halogens and water-containing liquids ---
var halogens = [
    "fluorine", "liquid_fluorine", "fluorine_ice",
    "chlorine", "liquid_chlorine", "chlorine_ice",
    "bromine_ice", "bromine", "bromine_gas",
    "iodine", "liquid_iodine", "iodine_gas",
    "astatine", "molten_astatine", "astatine_gas",
    "tennessine"
];

var water_containing = [
    "water", "dirty_water", "salt_water", "sugar_water",
    "seltzer", "pool_water", "primordial_soup", "nut_milk"
];

// --- Alkali metal hydroxide densities (kg/m³) ---
const hydroxideDensities = { li: 1460, na: 2130, k: 2120, rb: 2350, cs: 2200, fr: 2400 };

// --- Normal alkali reaction with halogens ---
function normalAlkali(pixel, reactto = "pop") {
    for (let i = 0; i < adjacentCoords.length; i++) {
        const x = pixel.x + adjacentCoords[i][0];
        const y = pixel.y + adjacentCoords[i][1];
        const otherPixel = getPixel(x, y);
        if (!isEmpty(x, y, true) && halogens.includes(otherPixel.element)) {
            if (Math.random() <= 0.1) {
                changePixel(pixel, "salt");
                changePixel(otherPixel, reactto);
            }
        }
    }
}


function waterReaction(pixel, options = {}) {
    const { tempIncrease = 100, reactionChance = 0.05, effectType = "pop" } = options;

    if (!pixel) return;

    for (let i = 0; i < adjacentCoords.length; i++) {
        const x = pixel.x + adjacentCoords[i][0];
        const y = pixel.y + adjacentCoords[i][1];
        const otherPixel = getPixel(x, y);

        if (!otherPixel) continue;
        if (!isEmpty(x, y, true) && water_containing.includes(otherPixel.element)) {
            if (Math.random() <= reactionChance) {
                const rand = Math.random();

                if (rand <= 0.33 && pixel && (pixel.element !== "explosion" || pixel.element !== "pop")) {
                    if (effectType === "explosion") {
                        deletePixel(pixel.x, pixel.y)
                        explodeAt(pixel.x, pixel.y, 10)
                    } else {
                        changePixel(pixel, effectType);
                    }

                } else if (rand <= 0.66) {
                    // form hydroxide
                    const hydroxide = pixel.symbol + "oh";
                    if (!elements[hydroxide]) {
                        addElement(hydroxide, {
                            color: "#dfefff",
                            category: "compounds",
                            behavior: behaviors.POWDER,
                            state: "solid",
                            density: hydroxideDensities[pixel.symbol] || 1500,
                            tempHigh: 500,
                            reactions: {
                                "acid": { elem1: "water", elem2: "salt" }
                            }
                        });
                    }
                    changePixel(pixel, hydroxide);
                    deletePixel(otherPixel.x, otherPixel.y);

                } else {
                    // produce hydrogen gas
                    createPixel("hydrogen", otherPixel.x, otherPixel.y);
                }

                pixel.temp += tempIncrease;
            }
        }
    }
}


// Solid lithium
elements.lithium = {
    color: "#bfbfbf",
    state: "solid",
    behavior: behaviors.POWDER,
    category: "alkali",
    tempHigh: 180.5,
    density: 533,
    conduct: 0.42,
    reactions: {
        "chlorine": { elem1: "salt", elem2: "pop" },
        "vinegar": { elem1: "sodium_acetate", elem2: [null, null, null, "hydrogen"], attr1: { "foam": 15 } },
        "water": { elem1: ["pop", "pop", "pop", "hydrogen", "lioh"], chance: 0.01, temp2: 200 },
        "salt_water": { elem1: ["pop", "pop", "pop", "hydrogen", "lioh"], chance: 0.01, temp2: 200 },
        "sugar_water": { elem1: ["pop", "pop", "pop", "hydrogen", "lioh"], chance: 0.01, temp2: 200 },
        "dirty_water": { elem1: ["pop", "pop", "pop", "hydrogen", "lioh"], chance: 0.01, temp2: 200 },
        "seltzer": { elem1: ["pop", "pop", "pop", "hydrogen", "lioh"], chance: 0.01, temp2: 200 },
        "pool_water": { elem1: ["pop", "pop", "pop", "hydrogen", "lioh"], chance: 0.01, temp2: 200 },
        "primordial_soup": { elem1: ["pop", "pop", "pop", "hydrogen", "lioh"], chance: 0.01, temp2: 200 },
        "nut_milk": { elem1: ["pop", "pop", "pop", "hydrogen", "lioh"], chance: 0.01, temp2: 200 },
        "acid": { elem1: ["hydrogen", "salt", "salt", "pop"], elem2: ["hydrogen", "salt", "salt", "pop"], temp1: 100, temp2: 100 }
    },
    properties: { symbol: "li" }
};

// Molten lithium
elements.molten_lithium = {
    tempLow: 180.5,
    tempHigh: 1334,
    stateLow: "lithium",
    density: 533,
    conduct: 0.42,
    category: "states",
    reactions: {
        "chlorine": { elem1: "salt", elem2: "pop" },
        "vinegar": { elem1: "sodium_acetate", elem2: [null, null, null, "hydrogen"], attr1: { "foam": 15 } },
        "water": { elem1: ["pop", "pop", "pop", "hydrogen", "lye"], chance: 0.01, temp2: 200 },
        "salt_water": { elem1: ["pop", "pop", "pop", "hydrogen", "lye"], chance: 0.01, temp2: 200 },
        "sugar_water": { elem1: ["pop", "pop", "pop", "hydrogen", "lye"], chance: 0.01, temp2: 200 },
        "dirty_water": { elem1: ["pop", "pop", "pop", "hydrogen", "lye"], chance: 0.01, temp2: 200 },
        "seltzer": { elem1: ["pop", "pop", "pop", "hydrogen", "lye"], chance: 0.01, temp2: 200 },
        "pool_water": { elem1: ["pop", "pop", "pop", "hydrogen", "lye"], chance: 0.01, temp2: 200 },
        "primordial_soup": { elem1: ["pop", "pop", "pop", "hydrogen", "lye"], chance: 0.01, temp2: 200 },
        "nut_milk": { elem1: ["pop", "pop", "pop", "hydrogen", "lye"], chance: 0.01, temp2: 200 },
        "acid": { elem1: ["hydrogen", "salt", "salt", "pop"], elem2: ["hydrogen", "salt", "salt", "pop"], temp1: 100, temp2: 100 }
    },
    properties: { symbol: "li" }
};

// Gas
elements.lithium_gas = {
    color: "#bfbfbf",
    state: "gas",
    tempLow: 1334,
    stateLow: "molten_lithium"
};

elements.lioh = {
    color: "#dfefff",
    category: "compounds",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 1460,
    tempHigh: 500,
    reactions: {
        "acid": { elem1: "water", elem2: "salt" }
    }
}


// --- Alkali metals configuration ---
const alkaliMetals = [
    { name: "rubidium", symbol: "rb", density: 1534, conduct: 0.6, melt: 39.3, boil: 688, color: ["#ffffff", "#e1e1e1", "#c0c0c0", "#bbbbbb"] },
    { name: "caesium", symbol: "cs", density: 1850, conduct: 0.59, melt: 28.44, boil: 671, color: ["#ffffff", "#e5e5e5", "#cfcfcf", "#bbbbbb"] }
];

// --- Generate elements dynamically ---
alkaliMetals.forEach(metal => {
    // Solid
    elements[metal.name] = {
        color: metal.color,
        state: "solid",
        behavior: behaviors.POWDER,
        category: "alkali",
        tempHigh: metal.melt,
        stateHigh: `liquid_${metal.name}`,
        density: metal.density,
        conduct: metal.conduct,
        tick(pixel) {
            normalAlkali(pixel);
            waterReaction(pixel, { effectType: "explosion", reactionChance: 0.05 });
        },
        properties: { symbol: metal.symbol }
    };

    // Liquid
    elements[`liquid_${metal.name}`] = {
        color: metal.color,
        state: "liquid",
        behavior: behaviors.LIQUID,
        tempLow: metal.melt,
        temp: metal.melt,
        tempHigh: metal.boil,
        stateLow: metal.name,
        stateHigh: `${metal.name}_gas`,
        density: metal.density,
        conduct: metal.conduct,
        category: "states",
        hidden: true,
        tick(pixel) {
            normalAlkali(pixel);
            waterReaction(pixel, { effectType: "explosion", reactionChance: 0.05 });
        },
        properties: { symbol: metal.symbol }
    };

    // Gas
    elements[`${metal.name}_gas`] = {
        color: metal.color,
        state: "gas",
        tempLow: metal.boil,
        stateLow: `liquid_${metal.name}`,
        category: "states",
        hidden: true,
        behavior: behaviors.GAS,
        temp: metal.boil
    };
});

elements.sodium.category = "alkali"
elements.potassium.category = "alkali"

elements.francium = {
    color: ["#ddddff", "#ccccff", "#aaaaff"],
    category: "alkali",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 1870,
    tempHigh: 27,
    stateHigh: "molten_francium",
    conduct: 0.2,
    tick(pixel) {
        normalAlkali(pixel);
        waterReaction(pixel, { effectType: "explosion", reactionChance: 0.2, tempIncrease: 300 });
        if (Math.random() < 0.001) {
            changePixel(pixel, "lead");
        }
        for (var i = 0; i < adjacentCoords.length; i++) {
            var x = pixel.x + adjacentCoords[i][0];
            var y = pixel.y + adjacentCoords[i][1];
            if (isEmpty(x, y) && Math.random() <= 0.02) {
                createPixel("radiation", x, y)
                getPixel(x, y).temp = pixel.temp
            }
            if (!isEmpty(x, y)) {
                let p = getPixel(x, y)
                if (p && p.element === "neutron" && Math.random() <= 0.5) {
                    var rand = Math.random()
                    if (rand <= 0.01) {
                        changePixel(pixel, "lead")
                    }
                }
            }
        }
    },
    properties: {
        symbol: "fr"
    }
}

elements.molten_francium = {
    color: ["#ddddff", "#ccccff", "#aaaaff"],
    state: "liquid",
    behavior: behaviors.LIQUID,
    density: 1870,
    tempLow: 27,
    temp: 27,
    tempHigh: 600,
    stateLow: "francium",
    stateHigh: "francium_gas",
    category: "states",
    hidden: true,
    tick(pixel) {
        normalAlkali(pixel);
        waterReaction(pixel, { effectType: "explosion", reactionChance: 0.2, tempIncrease: 300 });
        if (Math.random() < 0.001) {
            changePixel(pixel, "lead");
        }
        for (var i = 0; i < adjacentCoords.length; i++) {
            var x = pixel.x + adjacentCoords[i][0];
            var y = pixel.y + adjacentCoords[i][1];
            if (isEmpty(x, y) && Math.random() <= 0.02) {
                createPixel("radiation", x, y)
                getPixel(x, y).temp = pixel.temp
            }
            if (!isEmpty(x, y)) {
                let p = getPixel(x, y)
                if (p && p.element === "neutron" && Math.random() <= 0.5) {
                    var rand = Math.random()
                    if (rand <= 0.01) {
                        changePixel(pixel, "lead")
                    }
                }
            }
        }
    },
    properties: { symbol: "fr" }
}

elements.francium_gas = {
    color: "#ccccff",
    behavior: behaviors.GAS,
    state: "gas",
    tempLow: 600,
    temp: 600,
    stateLow: "molten_francium",
    category: "states",
    hidden: true
}
