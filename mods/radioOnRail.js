// ==========================================
// 1. CORE PHYSICS UTILITIES & HELPERS
// ==========================================

if (typeof countNearbyNeutrons !== "function") {
    window.countNearbyNeutrons = function(pixel, radius) {
        if (radius === undefined) radius = 1;
        var count = 0;
        for (var i = -radius; i <= radius; i++) {
            for (var j = -radius; j <= radius; j++) {
                if (i === 0 && j === 0) continue;
                var px = pixel.x + i;
                var py = pixel.y + j;
                if (!outOfBounds(px, py)) {
                    if (pixelMap[px] && pixelMap[px][py]) {
                        var neighbor = pixelMap[px][py];
                        if (neighbor.element === "neutron" || neighbor.element === "fast_neutron") {
                            count++;
                        }
                    }
                }
            }
        }
        return count;
    };
}

if (typeof selfHeat !== "function") {
    window.selfHeat = function(pixel, baseHeat, variance) {
        if (variance === undefined) variance = 20;
        pixel.temp += baseHeat + Math.random() * variance;
    };
}

if (typeof emitSpontaneousNeutrons !== "function") {
    window.emitSpontaneousNeutrons = function(pixel, chance, minNeutrons, maxNeutrons) {
        if (minNeutrons === undefined) minNeutrons = 1;
        if (maxNeutrons === undefined) maxNeutrons = 3;
        if (Math.random() < chance) {
            var amount = Math.floor(Math.random() * (maxNeutrons - minNeutrons + 1)) + minNeutrons;
            for (var i = 0; i < amount; i++) {
                var rx = pixel.x + Math.floor(Math.random() * 7 - 3);
                var ry = pixel.y + Math.floor(Math.random() * 7 - 3);
                if (!outOfBounds(rx, ry) && isEmpty(rx, ry)) {
                    createPixel(Math.random() < 0.3 ? "fast_neutron" : "neutron", rx, ry);
                }
            }
            if (typeof selfHeat === "function") selfHeat(pixel, 10 * amount, 10);
        }
    };
}

if (typeof handleNaturalDecay !== "function") {
    window.handleNaturalDecay = function(pixel, radChance, alphaChance, changeChance, changeTarget) {
        if (Math.random() < radChance) {
            var rx = pixel.x + Math.floor(Math.random() * 5 - 2);
            var ry = pixel.y + Math.floor(Math.random() * 5 - 2);
            if (!outOfBounds(rx, ry) && isEmpty(rx, ry)) {
                createPixel("radiation", rx, ry);
            }
        }
        if (Math.random() < alphaChance) {
            var rx = pixel.x + Math.floor(Math.random() * 5 - 2);
            var ry = pixel.y + Math.floor(Math.random() * 5 - 2);
            if (!outOfBounds(rx, ry) && isEmpty(rx, ry)) {
                createPixel("helium", rx, ry);
            }
        }
        if (Math.random() < changeChance && changeTarget && elements[changeTarget]) {
            changePixel(pixel, changeTarget);
        }
    };
}

// ==========================================
// 2. ENERGY & EXPLOSIONS
// ==========================================

elements.nexplosion = {
    color: ["#ffff80","#ffffff","#ff8000"],
    behavior: [
        "CR:explosion%50 AND CR:radiation%100|CR:explosion%50 AND CR:radiation%100|CR:explosion%50 AND CR:radiation%100",
        "CR:explosion%50 AND CR:radiation%100|XX|CR:explosion%50 AND CR:radiation%100",
        "CR:explosion%50 AND CR:radiation%100|CR:explosion%50 AND CR:radiation%100|CR:explosion%50 AND CR:radiation%100"
    ],
    temp: 100000, category: "energy", state: "gas", density: 0.001,
    ignore: ["nexplosion","radiation","neutron"], burn: 100, burnTime: 9999, fireColor: "#ffff00"
};

// ==========================================
// 3. PURE ELEMENTS (Realistic Physics)
// ==========================================

// Francium - Extremely radioactive alkali metal, melts at 27°C
elements.francium = {
    name: "francium", color: ["#ffffff","#dddddd","#eeeeee","#cccccc"],
    behavior: ["XX|XX|XX","XX|XX|XX","XX|XX|XX"],
    reactions: { "water": { elem1: "explosion", chance: 0.8 }, "neutron": { elem1: "nexplosion", chance: 0.1 } },
    tempHigh: 27, stateHigh: "molten_francium", category: "solids", state: "solid", density: 2480,
    darkText: true, conduct: 0.3, hard: 0.5, burn: 100, burnTime: 100, fireColor: "#ffffff",
    tick: function(pixel) {
        if (Math.random() < 0.005) selfHeat(pixel, 80, 20);
        handleNaturalDecay(pixel, 0.40, 0.05, 0.001, "radium"); // Fr-223 beta→Ra-223
    }
};
elements.molten_francium = {
    name: "molten francium", color: ["#eeeeee","#cccccc","#dddddd","#bbbbbb"],
    behavior: behaviors.LIQUID, temp: 50, tempLow: 27, stateLow: "francium",
    viscosity: 1000, density: 2200, category: "liquids", state: "liquid",
    burn: 100, burnTime: 200, fireColor: "#dddddd",
    reactions: { "water": { elem1: "explosion", chance: 1.0 } },
    tick: function(pixel) { if (Math.random() < 0.01) selfHeat(pixel, 130, 20); handleNaturalDecay(pixel, 0.40, 0.05, 0.001, "radium"); }
};

// Technetium - First artificial element
elements.technetium = {
    name: "technetium", color: ["#a0a0a0","#808080","#909090","#b0b0b0"],
    behavior: ["XX|XX|XX","XX|XX|XX","XX|XX|XX"],
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.005 } },
    tempHigh: 2157, stateHigh: "molten_technetium", category: "solids", state: "solid", density: 11500,
    darkText: true, conduct: 0.2, hard: 4,
    tick: function(pixel) { handleNaturalDecay(pixel, 0.02, 0.001, 0.0001, "molybdenum"); } // Tc-99 beta→Mo-99
};
elements.molten_technetium = {
    name: "molten technetium", color: ["#dddddd","#bbbbbb","#cccccc","#eeeeee"],
    behavior: behaviors.LIQUID, temp: 2200, tempLow: 2157, stateLow: "technetium",
    viscosity: 5000, density: 10300, category: "liquids", state: "liquid",
    burn: 30, burnTime: 400, fireColor: "#cccccc",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.01 }, "oxygen": { elem1: "technetium_dioxide", chance: 0.1 } }
};

// Radium - Glows blue/green from radioluminescence
elements.radium = {
    name: "radium", color: ["#ccffcc","#aaffaa","#bbffbb","#ddffdd"],
    behavior: ["XX|XX|XX","XX|XX|XX","XX|XX|XX"],
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.0005 } },
    tempHigh: 700, stateHigh: "molten_radium", category: "solids", state: "solid", density: 5500,
    darkText: false, conduct: 0.18, hard: 1.5, burn: 60, burnTime: 300, fireColor: "#88ff88",
    tick: function(pixel) {
        if (Math.random() < 0.002) selfHeat(pixel, 60, 20);
        handleNaturalDecay(pixel, 0.15, 0.02, 0.00001, "radon"); // Ra-226 alpha→Rn-222
    }
};
elements.molten_radium = {
    name: "molten radium", color: ["#ddffdd","#bbffbb","#ccffcc","#eeffee"],
    behavior: behaviors.LIQUID, temp: 1100, tempLow: 700, stateLow: "radium",
    viscosity: 3000, density: 5000, category: "liquids", state: "liquid",
    burn: 80, burnTime: 500, fireColor: "#aaffaa",
    reactions: { "water": { elem1: "explosion", chance: 0.25 }, "neutron": { elem1: "nexplosion", chance: 0.003 } }
};

// Radon - Heavy noble gas, sinks in real life
elements.radon = {
    name: "radon", color: ["#ccff99","#aaff88","#bbff99","#ddffaa"],
    behavior: behaviors.GAS, category: "gases", state: "gas", density: 9.73,
    temp: 20, tempLow: -61.7, stateLow: "liquid_radon",
    burn: 100, burnTime: 10, fireColor: "#88ff88",
    tick: function(pixel) {
        handleNaturalDecay(pixel, 0.30, 0.05, 0.005, "polonium_dust"); // Rn-222 alpha→Po-218
    }
};
elements.liquid_radon = {
    name: "liquid radon", color: ["#aaff88","#88ff66"],
    behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 2000,
    tempHigh: -61.7, stateHigh: "radon",
    tick: function(pixel) { handleNaturalDecay(pixel, 0.30, 0.05, 0.005, "polonium_dust"); }
};

// Polonium - Extreme alpha emitter, massive heat (RTG material)
elements.polonium_dust = {
    name: "polonium dust", color: ["#ffcccc","#ffaaaa","#ffbbbb","#ffdddd"],
    behavior: behaviors.POWDER, category: "powders", state: "solid", density: 9196,
    tempHigh: 254, stateHigh: "molten_polonium",
    tick: function(pixel) {
        if (Math.random() < 0.002) selfHeat(pixel, 280, 20);
        handleNaturalDecay(pixel, 0.60, 0.10, 0.002, "lead"); // Po-210 alpha→Pb-206
    }
};
elements.molten_polonium = {
    name: "molten polonium", color: ["#ff8888","#ff6666","#ff9999"],
    behavior: behaviors.LIQUID, temp: 600, tempLow: 254, stateLow: "polonium_dust",
    viscosity: 4000, density: 8200, category: "liquids", state: "liquid",
    tick: function(pixel) { if (Math.random() < 0.002) selfHeat(pixel, 280, 20); handleNaturalDecay(pixel, 0.60, 0.10, 0.002, "lead"); }
};

// Actinium - Glows blue, intense radiation
elements.actinium = {
    name: "actinium", color: ["#a0a0ff","#8080ff","#9090ff","#c0c0ff"],
    behavior: ["XX|XX|XX","XX|XX|XX","XX|XX|XX"],
    reactions: { "neutron": { elem1: "radiation", chance: 0.5 }, "fast_neutron": { elem1: "radiation", chance: 0.5 } },
    tempHigh: 1050, stateHigh: "molten_actinium", category: "solids", state: "solid", density: 10070,
    darkText: true, conduct: 0.12, hard: 2.5,
    tick: function(pixel) {
        if (Math.random() < 0.05) selfHeat(pixel, 15, 5);
        if (Math.random() < 0.04) {
            var rx = pixel.x + Math.floor(Math.random() * 5 - 2);
            var ry = pixel.y + Math.floor(Math.random() * 5 - 2);
            if (!outOfBounds(rx, ry) && isEmpty(rx, ry)) {
                createPixel(Math.random() < 0.2 ? "fast_neutron" : "neutron", rx, ry);
            }
        }
        handleNaturalDecay(pixel, 0.35, 0, 0.01, "radium"); // Ac-227 beta→Th-227 or alpha→Fr-223
    }
};
elements.molten_actinium = {
    name: "molten actinium", color: ["#ccccff","#aaaaff","#bbbbff","#ddddff"],
    behavior: behaviors.LIQUID, temp: 1400, tempLow: 1050, stateLow: "actinium",
    viscosity: 6000, density: 9000, category: "liquids", state: "liquid",
    burn: 40, burnTime: 600, fireColor: "#8888ff",
    reactions: { "neutron": { elem1: "radiation", chance: 0.6 }, "fast_neutron": { elem1: "radiation", chance: 0.6 } },
    tick: function(pixel) {
        if (Math.random() < 0.06) {
            var rx = pixel.x + Math.floor(Math.random() * 5 - 2);
            var ry = pixel.y + Math.floor(Math.random() * 5 - 2);
            if (!outOfBounds(rx, ry) && isEmpty(rx, ry)) { createPixel("neutron", rx, ry); }
        }
        handleNaturalDecay(pixel, 0.40, 0, 0.01, "radium");
    }
};

// Thorium - Fertile, very long half-life (14B years)
elements.thorium = {
    name: "thorium", color: ["#a0a0a0","#808080","#909090","#b0b0b0"],
    behavior: ["XX|XX|XX","XX|XX|XX","XX|XX|XX"],
    reactions: { "neutron": { elem1: null, elem2: "protactinium", chance: 0.05 }, "fast_neutron": { elem1: "nexplosion", chance: 0.0001 } },
    tempHigh: 1750, stateHigh: "molten_thorium", category: "solids", state: "solid", density: 11724,
    darkText: true, conduct: 0.15, hard: 3,
    tick: function(pixel) {
        if (Math.random() < 0.00001) selfHeat(pixel, 5, 5);
        if (Math.random() < 0.0000005) {
            var rx = pixel.x + Math.floor(Math.random() * 5 - 2);
            var ry = pixel.y + Math.floor(Math.random() * 5 - 2);
            if (!outOfBounds(rx, ry) && isEmpty(rx, ry)) { createPixel("neutron", rx, ry); }
        }
        handleNaturalDecay(pixel, 0.01, 0.00001, 0.000001, "radium"); // Th-232 alpha→Ra-228
    }
};
elements.molten_thorium = {
    name: "molten thorium", color: ["#dddddd","#bbbbbb","#cccccc","#eeeeee"],
    behavior: behaviors.LIQUID, temp: 2200, tempLow: 1750, stateLow: "thorium",
    viscosity: 7000, density: 10500, category: "liquids", state: "liquid",
    burn: 20, burnTime: 400, fireColor: "#ffffff",
    reactions: { "neutron": { elem1: "protactinium", chance: 0.1 } }
};

// Protactinium - Rare, fertile
elements.protactinium = {
    name: "protactinium", color: ["#d0d0d0","#b0b0b0","#c0c0c0","#e0e0e0"],
    behavior: ["XX|XX|XX","XX|XX|XX","XX|XX|XX"],
    reactions: { "neutron": { elem1: "uranium", chance: 0.05 } },
    tempHigh: 1568, stateHigh: "molten_protactinium", category: "solids", state: "solid", density: 15370,
    conduct: 0.2, hard: 4,
    tick: function(pixel) { handleNaturalDecay(pixel, 0.05, 0.001, 0.001, "actinium"); } // Pa-231 alpha→Ac-227
};
elements.molten_protactinium = {
    name: "molten protactinium", color: ["#e0e0e0","#c0c0c0","#d0d0d0","#f0f0f0"],
    behavior: behaviors.LIQUID, temp: 1900, tempLow: 1568, stateLow: "protactinium",
    viscosity: 6500, density: 13800, category: "liquids", state: "liquid",
    burn: 30, burnTime: 500, fireColor: "#dddddd",
    reactions: { "neutron": { elem1: "uranium", chance: 0.05 } }
};

// Uranium - Fissile U-235, Fertile U-238
elements.uranium = {
    color: ["#9ea190","#676d68","#a1a194","#99bba4"],
    behavior: ["XX|XX|XX","XX|XX|XX","XX|XX|XX"],
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.015 }, "fast_neutron": { elem1: "nexplosion", chance: 0.005 } },
    tempHigh: 1132, stateHigh: "molten_uranium", category: "solids", state: "solid", density: 19050,
    darkText: true, conduct: 0.28, hard: 6,
    tick: function(pixel) {
        if (Math.random() < 0.00005) selfHeat(pixel, 10, 10);
        emitSpontaneousNeutrons(pixel, 0.00005, 1, 2);
        var neutronCount = countNearbyNeutrons(pixel);
        if (neutronCount > 4 && Math.random() < 0.05) changePixel(pixel, "nexplosion");
        handleNaturalDecay(pixel, 0.10, 0.0005, 0.00005, "thorium"); // U-238 alpha→Th-234
    }
};
elements.molten_uranium = {
    color: ["#d4ffaa","#b8ff8c","#e6ffcc"],
    behavior: behaviors.LIQUID, temp: 1500, tempLow: 1132, stateLow: "uranium",
    viscosity: 8000, density: 17300, category: "liquids", state: "liquid",
    burn: 15, burnTime: 400, fireColor: "#99ff99",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.04 }, "fast_neutron": { elem1: "nexplosion", chance: 0.015 }, "radiation": { elem1: null, elem2: "radiation", chance: 0.03 } },
    tick: function(pixel) {
        emitSpontaneousNeutrons(pixel, 0.0001, 1, 2);
        var neutronCount = countNearbyNeutrons(pixel, 2);
        if (neutronCount > 3 && Math.random() < 0.1) changePixel(pixel, "nexplosion");
        handleNaturalDecay(pixel, 0.15, 0.001, 0.0001, "thorium");
    }
};

// Neptunium - First transuranic element
elements.neptunium = {
    name: "neptunium", color: ["#a09891","#46413e","#28282c","#807b7b"],
    behavior: ["XX|XX|XX","XX|XX|XX","XX|XX|XX"],
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.01 }, "fast_neutron": { elem1: "nexplosion", chance: 0.03 } },
    tempHigh: 644, stateHigh: "molten_neptunium", category: "solids", state: "solid", density: 20450,
    darkText: true, conduct: 0.15, hard: 3.2,
    tick: function(pixel) {
        if (Math.random() < 0.0001) selfHeat(pixel, 20, 10);
        var neutronCount = countNearbyNeutrons(pixel);
        if (neutronCount > 5 && Math.random() < 0.02) changePixel(pixel, "nexplosion");
        handleNaturalDecay(pixel, 0.08, 0.005, 0.0001, "protactinium"); // Np-237 alpha→Pa-233
    }
};
elements.molten_neptunium = {
    name: "molten neptunium", color: ["#e6e6ff","#ccccff","#d4d4ff","#b3b3ff"],
    behavior: behaviors.LIQUID, temp: 1000, tempLow: 644, stateLow: "neptunium",
    viscosity: 7000, density: 19000, category: "liquids", state: "liquid",
    burn: 25, burnTime: 450, fireColor: "#aaaaff",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.03 }, "fast_neutron": { elem1: "nexplosion", chance: 0.06 }, "water": { elem1: "explosion", chance: 0.005 } },
    tick: function(pixel) {
        var neutronCount = countNearbyNeutrons(pixel);
        if (neutronCount > 4 && Math.random() < 0.05) changePixel(pixel, "nexplosion");
        handleNaturalDecay(pixel, 0.12, 0.008, 0.0002, "protactinium");
    }
};

// Plutonium - Warm to touch, highly fissile
elements.plutonium = {
    color: ["#8b8f8f","#6c6e70","#7e7e86","#c2c2c2"],
    behavior: ["XX|XX|XX","XX|XX|XX","XX|XX|XX"],
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.12 }, "fast_neutron": { elem1: "nexplosion", chance: 0.18 } },
    tempHigh: 640, stateHigh: "molten_plutonium", category: "solids", state: "solid", density: 19816,
    darkText: true, conduct: 0.18, hard: 3.5,
    tick: function(pixel) {
        if (Math.random() < 0.0002) selfHeat(pixel, 40, 20);
        emitSpontaneousNeutrons(pixel, 0.001, 1, 3);
        var neutronCount = countNearbyNeutrons(pixel);
        if (neutronCount > 2 && Math.random() < 0.15) changePixel(pixel, "nexplosion");
        handleNaturalDecay(pixel, 0.15, 0.005, 0.0001, "uranium"); // Pu-239 alpha→U-235
    }
};
elements.molten_plutonium = {
    color: ["#ccffff","#aadddd","#99eeee","#bbffff"],
    behavior: behaviors.LIQUID, temp: 1000, tempLow: 640, stateLow: "plutonium",
    viscosity: 6500, density: 17500, category: "liquids", state: "liquid",
    burn: 50, burnTime: 999, fireColor: "#88ff88",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.20 }, "fast_neutron": { elem1: "nexplosion", chance: 0.30 }, "water": { elem1: "explosion", chance: 0.015 } },
    tick: function(pixel) {
        emitSpontaneousNeutrons(pixel, 0.002, 1, 3);
        var neutronCount = countNearbyNeutrons(pixel, 2);
        if (neutronCount > 1 && Math.random() < 0.25) changePixel(pixel, "nexplosion");
        handleNaturalDecay(pixel, 0.20, 0.01, 0.0002, "uranium");
    }
};

// Americium - Used in smoke detectors
elements.americium = {
    name: "americium", color: ["#a1a1a1", "#888888", "#b3b3b3", "#c4c4c4"],
    behavior: ["XX|XX|XX","XX|XX|XX","XX|XX|XX"],
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.10 }, "fast_neutron": { elem1: "nexplosion", chance: 0.15 } },
    tempHigh: 1176, stateHigh: "molten_americium", category: "solids", state: "solid", density: 13670,
    darkText: true, conduct: 0.15, hard: 3,
    tick: function(pixel) {
        if (Math.random() < 0.001) selfHeat(pixel, 50, 20);
        emitSpontaneousNeutrons(pixel, 0.003, 1, 3);
        var neutronCount = countNearbyNeutrons(pixel);
        if (neutronCount > 3 && Math.random() < 0.1) changePixel(pixel, "nexplosion");
        handleNaturalDecay(pixel, 0.20, 0.008, 0.0002, "neptunium"); // Am-241 alpha→Np-237
    }
};
elements.molten_americium = {
    name: "molten americium", color: ["#b8b8b8", "#9c9c9c", "#cecece"],
    behavior: behaviors.LIQUID, temp: 1200, tempLow: 1176, stateLow: "americium",
    viscosity: 6000, density: 12500, category: "liquids", state: "liquid",
    burn: 40, burnTime: 800, fireColor: "#aa55ff",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.15 }, "fast_neutron": { elem1: "nexplosion", chance: 0.25 } },
    tick: function(pixel) {
        emitSpontaneousNeutrons(pixel, 0.005, 2, 4);
        var neutronCount = countNearbyNeutrons(pixel, 2);
        if (neutronCount > 2 && Math.random() < 0.15) changePixel(pixel, "nexplosion");
        handleNaturalDecay(pixel, 0.25, 0.015, 0.0003, "neptunium");
    }
};

// Curium - Glows red/purple, high heat
elements.curium = {
    name: "curium", color: ["#c5c5d0", "#a1a1aa", "#d1d1dd", "#e0e0ff"],
    behavior: ["XX|XX|XX","XX|XX|XX","XX|XX|XX"],
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.15 }, "fast_neutron": { elem1: "nexplosion", chance: 0.20 } },
    tempHigh: 1340, stateHigh: "molten_curium", category: "solids", state: "solid", density: 13510,
    darkText: true, conduct: 0.20, hard: 4.5,
    tick: function(pixel) {
        if (Math.random() < 0.005) selfHeat(pixel, 60, 20);
        emitSpontaneousNeutrons(pixel, 0.008, 1, 3);
        var neutronCount = countNearbyNeutrons(pixel);
        if (neutronCount > 3 && Math.random() < 0.12) changePixel(pixel, "nexplosion");
        handleNaturalDecay(pixel, 0.30, 0.01, 0.0005, "plutonium"); // Cm-244 alpha→Pu-240
    }
};
elements.molten_curium = {
    name: "molten curium", color: ["#ddccff", "#ccaaff", "#eebbff"],
    behavior: behaviors.LIQUID, temp: 1400, tempLow: 1340, stateLow: "curium",
    viscosity: 6000, density: 12500, category: "liquids", state: "liquid",
    burn: 40, burnTime: 800, fireColor: "#aa55ff",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.25 }, "fast_neutron": { elem1: "nexplosion", chance: 0.35 } },
    tick: function(pixel) {
        emitSpontaneousNeutrons(pixel, 0.015, 2, 4);
        var neutronCount = countNearbyNeutrons(pixel, 2);
        if (neutronCount > 2 && Math.random() < 0.20) changePixel(pixel, "nexplosion");
        handleNaturalDecay(pixel, 0.35, 0.02, 0.001, "plutonium");
    }
};

// Californium - Extreme neutron emitter, spontaneous fission
elements.californium = {
    name: "californium", color: ["#999999", "#888888", "#aaaaaa", "#777777"],
    behavior: ["XX|XX|XX","XX|XX|XX","XX|XX|XX"],
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.25 }, "fast_neutron": { elem1: "nexplosion", chance: 0.30 } },
    tempHigh: 900, stateHigh: "molten_californium", category: "solids", state: "solid", density: 15100,
    darkText: true, conduct: 0.15, hard: 3,
    tick: function(pixel) {
        if (Math.random() < 0.01) selfHeat(pixel, 100, 20);
        emitSpontaneousNeutrons(pixel, 0.05, 2, 4);
        var neutronCount = countNearbyNeutrons(pixel);
        if (neutronCount > 2 && Math.random() < 0.2) changePixel(pixel, "nexplosion");
        handleNaturalDecay(pixel, 0.40, 0.02, 0.0005, "curium"); // Cf-252 alpha→Cm-248
    }
};
elements.molten_californium = {
    name: "molten californium", color: ["#bbbbbb", "#dddddd", "#aaaaaa"],
    behavior: behaviors.LIQUID, temp: 1000, tempLow: 900, stateLow: "californium",
    viscosity: 5500, density: 14000, category: "liquids", state: "liquid",
    burn: 60, burnTime: 999, fireColor: "#ffffff",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.35 }, "fast_neutron": { elem1: "nexplosion", chance: 0.45 } },
    tick: function(pixel) {
        if (Math.random() < 0.05) selfHeat(pixel, 150, 30);
        emitSpontaneousNeutrons(pixel, 0.08, 3, 5);
        var neutronCount = countNearbyNeutrons(pixel, 2);
        if (neutronCount > 1 && Math.random() < 0.30) changePixel(pixel, "nexplosion");
        handleNaturalDecay(pixel, 0.45, 0.03, 0.001, "curium");
    }
};

// ==========================================
// 4. COMPOUNDS & ORES (Restored)
// ==========================================

// Dioxides (Nuclear fuel ceramics)
elements.uranium_dioxide = { name: "uranium dioxide", color: ["#333","#444"], behavior: behaviors.POWDER, category: "powders", state: "solid", density: 10970, tempHigh: 2875, stateHigh: "molten_uranium_dioxide", reactions: {"neutron": {elem1:"nexplosion", chance:0.05}}, tick: function(p){ handleNaturalDecay(p, 0.02, 0.0005, 0.00001, "thorium"); } };
elements.molten_uranium_dioxide = { name: "molten uranium dioxide", color: ["#f60","#f80"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 9800, tempLow: 2875, stateLow: "uranium_dioxide", tick: function(p){ handleNaturalDecay(p, 0.02, 0.0005, 0.00001, "thorium"); } };

elements.plutonium_dioxide = { name: "plutonium dioxide", color: ["#fc0","#fd0"], behavior: behaviors.POWDER, category: "powders", state: "solid", density: 11460, tempHigh: 2400, stateHigh: "molten_plutonium_dioxide", reactions: {"neutron": {elem1:"nexplosion", chance:0.1}}, tick: function(p){ handleNaturalDecay(p, 0.1, 0.005, 0.0001, "uranium"); } };
elements.molten_plutonium_dioxide = { name: "molten plutonium dioxide", color: ["#ff0","#fe0"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 10200, tempLow: 2400, stateLow: "plutonium_dioxide", tick: function(p){ handleNaturalDecay(p, 0.1, 0.005, 0.0001, "uranium"); } };

elements.thorium_dioxide = { name: "thorium dioxide", color: ["#fff","#eee"], behavior: behaviors.POWDER, category: "powders", state: "solid", density: 10000, tempHigh: 3390, stateHigh: "molten_thorium_dioxide", tick: function(p){ handleNaturalDecay(p, 0.005, 0.00001, 0.000001, "radium"); } };
elements.molten_thorium_dioxide = { name: "molten thorium dioxide", color: ["#ffc","#ffd"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 9000, tempLow: 3390, stateLow: "thorium_dioxide", tick: function(p){ handleNaturalDecay(p, 0.005, 0.00001, 0.000001, "radium"); } };

elements.neptunium_dioxide = { name: "neptunium dioxide", color: ["#666","#777"], behavior: behaviors.POWDER, category: "powders", state: "solid", density: 11200, tempHigh: 2547, stateHigh: "molten_neptunium_dioxide", reactions: {"neutron": {elem1:"nexplosion", chance:0.02}}, tick: function(p){ handleNaturalDecay(p, 0.08, 0.005, 0.0001, "protactinium"); } };
elements.molten_neptunium_dioxide = { name: "molten neptunium dioxide", color: ["#f93","#fa4"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 10000, tempLow: 2547, stateLow: "neptunium_dioxide", tick: function(p){ handleNaturalDecay(p, 0.12, 0.008, 0.0002, "protactinium"); } };

elements.protactinium_dioxide = { name: "protactinium dioxide", color: ["#999","#aaa"], behavior: behaviors.POWDER, category: "powders", state: "solid", density: 10200, tempHigh: 2000, stateHigh: "molten_protactinium_dioxide", tick: function(p){ handleNaturalDecay(p, 0.05, 0.001, 0.001, "actinium"); } };
elements.molten_protactinium_dioxide = { name: "molten protactinium dioxide", color: ["#fc9","#fda"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 9100, tempLow: 2000, stateLow: "protactinium_dioxide", tick: function(p){ handleNaturalDecay(p, 0.05, 0.001, 0.001, "actinium"); } };

elements.americium_dioxide = { name: "americium dioxide", color: ["#606","#707"], behavior: behaviors.POWDER, category: "powders", state: "solid", density: 11500, tempHigh: 2176, stateHigh: "molten_americium_dioxide", tick: function(p){ handleNaturalDecay(p, 0.2, 0.008, 0.0002, "neptunium"); } };
elements.molten_americium_dioxide = { name: "molten americium dioxide", color: ["#f0f","#e0e"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 10300, tempLow: 2176, stateLow: "americium_dioxide", tick: function(p){ handleNaturalDecay(p, 0.25, 0.015, 0.0003, "neptunium"); } };

elements.curium_dioxide = { name: "curium dioxide", color: ["#900","#a00"], behavior: behaviors.POWDER, category: "powders", state: "solid", density: 11300, tempHigh: 2000, stateHigh: "molten_curium_dioxide", tick: function(p){ handleNaturalDecay(p, 0.3, 0.01, 0.0005, "plutonium"); } };
elements.molten_curium_dioxide = { name: "molten curium dioxide", color: ["#f33","#f44"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 10100, tempLow: 2000, stateLow: "curium_dioxide", tick: function(p){ handleNaturalDecay(p, 0.35, 0.02, 0.001, "plutonium"); } };

elements.polonium_dioxide = { name: "polonium dioxide", color: ["#f00","#e00"], behavior: behaviors.POWDER, category: "powders", state: "solid", density: 8900, tempHigh: 600, stateHigh: "polonium_dust", tick: function(p){ handleNaturalDecay(p, 0.5, 0.1, 0.002, "lead"); } };

elements.technetium_dioxide = { name: "technetium dioxide", color: ["#666","#777"], behavior: behaviors.POWDER, category: "powders", state: "solid", density: 6500, tempHigh: 1100, stateHigh: "molten_technetium_dioxide", tick: function(p){ handleNaturalDecay(p, 0.02, 0.001, 0.0001, "molybdenum"); } };
elements.molten_technetium_dioxide = { name: "molten technetium dioxide", color: ["#f96","#fa7"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 5800, tempLow: 1100, stateLow: "technetium_dioxide", tick: function(p){ handleNaturalDecay(p, 0.02, 0.001, 0.0001, "molybdenum"); } };

elements.radium_chloride = { name: "radium chloride", color: ["#fff","#eee"], behavior: behaviors.POWDER, category: "powders", state: "solid", density: 5010, tempHigh: 1000, stateHigh: "molten_radium_chloride", reactions: {"water": {elem1: null, elem2: "radium_solution"}}, tick: function(p){ handleNaturalDecay(p, 0.15, 0.02, 0.00001, "radon"); } };
elements.molten_radium_chloride = { name: "molten radium chloride", color: ["#ff9","#ffa"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 4500, tempLow: 1000, stateLow: "radium_chloride", tick: function(p){ handleNaturalDecay(p, 0.15, 0.02, 0.00001, "radon"); } };

elements.actinium_oxide = { name: "actinium oxide", color: ["#ccf","#bbf"], behavior: behaviors.POWDER, category: "powders", state: "solid", density: 9500, tempHigh: 1800, stateHigh: "molten_actinium_oxide", tick: function(p){ handleNaturalDecay(p, 0.35, 0, 0.01, "radium"); } };
elements.molten_actinium_oxide = { name: "molten actinium oxide", color: ["#eef","#ddf"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 8500, tempLow: 1800, stateLow: "actinium_oxide", tick: function(p){ handleNaturalDecay(p, 0.4, 0, 0.01, "radium"); } };

elements.francium_hydroxide = { name: "francium hydroxide", color: ["#fff","#ddd"], behavior: behaviors.POWDER, category: "powders", state: "solid", density: 3000, reactions: {"water": {elem1:"explosion", chance:0.1}}, tick: function(p){ handleNaturalDecay(p, 0.4, 0.05, 0.001, "radium"); } };

// Ores (Natural deposits in "land" category)
elements.uraninite = { name: "uraninite", color: ["#333","#222"], behavior: behaviors.POWDER, category: "land", state: "solid", density: 10650, hard: 5.5, conduct: 0.05, reactions: {"acid": {elem1:"uranium", chance:0.01}}, tempHigh: 2875, stateHigh: "molten_uraninite", tick: function(p){ handleNaturalDecay(p, 0.01, 0.00001, 0.000001, "radium"); } };
elements.molten_uraninite = { name: "molten uraninite", color: ["#f60","#f40"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 9500, tempLow: 2875, stateLow: "uraninite", reactions: {"water": {elem1:"steam", chance:0.1, temp1:-100}}, tick: function(p){ handleNaturalDecay(p, 0.01, 0.00001, 0.000001, "radium"); } };

elements.carnotite = { name: "carnotite", color: ["#ff0","#fe0"], behavior: behaviors.POWDER, category: "land", state: "solid", density: 4300, hard: 2.5, conduct: 0.01, reactions: {"acid": {elem1:"uranium", chance:0.008}}, tempHigh: 1200, stateHigh: "molten_carnotite", tick: function(p){ handleNaturalDecay(p, 0.008, 0.000008, 0.0000005, "radium"); } };
elements.molten_carnotite = { name: "molten carnotite", color: ["#ff6","#ff8"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 3800, tempLow: 1200, stateLow: "carnotite", reactions: {"water": {elem1:"explosion", chance:0.01}}, tick: function(p){ handleNaturalDecay(p, 0.008, 0.000008, 0.0000005, "radium"); } };

elements.autunite = { name: "autunite", color: ["#cf0","#bf0"], behavior: behaviors.POWDER, category: "land", state: "solid", density: 3200, hard: 2, conduct: 0.02, reactions: {"acid": {elem1:"uranium", chance:0.006}}, tempHigh: 900, stateHigh: "molten_autunite", tick: function(p){ handleNaturalDecay(p, 0.006, 0.000006, 0.0000004, "radium"); } };
elements.molten_autunite = { name: "molten autunite", color: ["#cf6","#bf4"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 2800, tempLow: 900, stateLow: "autunite", tick: function(p){ handleNaturalDecay(p, 0.006, 0.000006, 0.0000004, "radium"); } };

elements.torbernite = { name: "torbernite", color: ["#0f0","#0e0"], behavior: behaviors.POWDER, category: "land", state: "solid", density: 3500, hard: 2.5, conduct: 0.01, reactions: {"acid": {elem1:"uranium", chance:0.007}}, tempHigh: 950, stateHigh: "molten_torbernite", tick: function(p){ handleNaturalDecay(p, 0.007, 0.000007, 0.0000005, "radium"); } };
elements.molten_torbernite = { name: "molten torbernite", color: ["#6f6","#4f4"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 3100, tempLow: 950, stateLow: "torbernite", tick: function(p){ handleNaturalDecay(p, 0.007, 0.000007, 0.0000005, "radium"); } };

elements.coffinite = { name: "coffinite", color: ["#111","#000"], behavior: behaviors.POWDER, category: "land", state: "solid", density: 5400, hard: 5, conduct: 0.03, reactions: {"acid": {elem1:"uranium", chance:0.009}}, tempHigh: 1400, stateHigh: "molten_coffinite", tick: function(p){ handleNaturalDecay(p, 0.009, 0.000009, 0.0000006, "radium"); } };
elements.molten_coffinite = { name: "molten coffinite", color: ["#f33","#f22"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 4800, tempLow: 1400, stateLow: "coffinite", reactions: {"neutron": {elem1:"nexplosion", chance:0.001}}, tick: function(p){ handleNaturalDecay(p, 0.009, 0.000009, 0.0000006, "radium"); } };

elements.monazite = { name: "monazite", color: ["#c90","#a80"], behavior: behaviors.POWDER, category: "land", state: "solid", density: 5200, hard: 5, conduct: 0.02, reactions: {"acid": {elem1:"thorium", chance:0.005}}, tempHigh: 1900, stateHigh: "molten_monazite", tick: function(p){ handleNaturalDecay(p, 0.005, 0.000005, 0.0000003, "radium"); } };
elements.molten_monazite = { name: "molten monazite", color: ["#fc6","#fb5"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 4600, tempLow: 1900, stateLow: "monazite", tick: function(p){ handleNaturalDecay(p, 0.005, 0.000005, 0.0000003, "radium"); } };

elements.thorianite = { name: "thorianite", color: ["#222","#111"], behavior: behaviors.POWDER, category: "land", state: "solid", density: 9800, hard: 6.5, conduct: 0.04, reactions: {"acid": {elem1:"thorium", chance:0.004}}, tempHigh: 3300, stateHigh: "molten_thorianite", tick: function(p){ handleNaturalDecay(p, 0.004, 0.000004, 0.0000002, "radium"); } };
elements.molten_thorianite = { name: "molten thorianite", color: ["#ff9","#ffa"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 8800, tempLow: 3300, stateLow: "thorianite", tick: function(p){ handleNaturalDecay(p, 0.004, 0.000004, 0.0000002, "radium"); } };

elements.thorite = { name: "thorite", color: ["#630","#520"], behavior: behaviors.POWDER, category: "land", state: "solid", density: 6700, hard: 4.5, conduct: 0.03, reactions: {"acid": {elem1:"thorium", chance:0.003}}, tempHigh: 1600, stateHigh: "molten_thorite", tick: function(p){ handleNaturalDecay(p, 0.003, 0.000003, 0.0000002, "radium"); } };
elements.molten_thorite = { name: "molten thorite", color: ["#c60","#b50"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 6000, tempLow: 1600, stateLow: "thorite", tick: function(p){ handleNaturalDecay(p, 0.003, 0.000003, 0.0000002, "radium"); } };

elements.allanite = { name: "allanite", color: ["#930","#820"], behavior: behaviors.POWDER, category: "land", state: "solid", density: 3900, hard: 5.5, conduct: 0.02, reactions: {"acid": {elem1:"thorium", chance:0.002}}, tempHigh: 1500, stateHigh: "molten_allanite", tick: function(p){ handleNaturalDecay(p, 0.002, 0.000002, 0.0000001, "radium"); } };
elements.molten_allanite = { name: "molten allanite", color: ["#f60","#e50"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 3500, tempLow: 1500, stateLow: "allanite", tick: function(p){ handleNaturalDecay(p, 0.002, 0.000002, 0.0000001, "radium"); } };
