// === CUSTOM FUNCTIONS FOR REALISM ===
function countNearbyNeutrons(pixel, radius = 1) {
    var count = 0;
    for (var i = -radius; i <= radius; i++) {
        for (var j = -radius; j <= radius; j++) {
            if (i === 0 && j === 0) continue;
            var px = pixel.x + i;
            var py = pixel.y + j;
            if (!outOfBounds(px, py) && !isEmpty(px, py, true)) {
                var neighbor = pixelMap[px][py];
                if (neighbor.element === "neutron" || neighbor.element === "fast_neutron") {
                    count++;
                }
            }
        }
    }
    return count;
}

function emitAlphaParticle(pixel, chance, decayProduct) {
    if (Math.random() < chance) {
        changePixel(pixel, decayProduct);
        // Emit helium (alpha particle) upwards
        if (isEmpty(pixel.x, pixel.y - 1)) {
            createPixel("helium", pixel.x, pixel.y - 1);
        }
        // Emit extra radiation
        for (var k = 0; k < 3; k++) {
            var rx = pixel.x + Math.floor(Math.random() * 5 - 2);
            var ry = pixel.y + Math.floor(Math.random() * 5 - 2);
            if (isEmpty(rx, ry)) {
                createPixel("radiation", rx, ry);
            }
        }
    }
}

function selfHeat(pixel, baseHeat, variance = 20) {
    pixel.temp += baseHeat + Math.random() * variance;
}

// === NUCLEAR EXPLOSION HELPER (must be at the top) ===
elements.NExplosion = {
    color: ["#ffff80","#ffffff","#ff8000"],
    behavior: [
        "CR:explosion%50 AND CR:radiation%100|CR:explosion%50 AND CR:radiation%100|CR:explosion%50 AND CR:radiation%100",
        "CR:explosion%50 AND CR:radiation%100|XX|CR:explosion%50 AND CR:radiation%100",
        "CR:explosion%50 AND CR:radiation%100|CR:explosion%50 AND CR:radiation%100|CR:explosion%50 AND CR:radiation%100"
    ],
    temp: 100000,
    category: "energy",
    state: "gas",
    density: 0.001,
    ignore: ["NExplosion","radiation","neutron"],
    burn: 100,
    burnTime: 9999,
    fireColor: "#ffff00",
    reactions: {}
};

// === FRANCIUM (extremely radioactive alkali metal, low melting) ===
elements.francium = {
    name: "francium",
    color: ["#ffffff","#dddddd","#eeeeee","#cccccc"],  // silvery-white
    behavior: [
        "XX|XX|XX",
        "XX|RL:radiation%30 AND CR:helium%0.0001 AND CH:radium%0.0001|XX",  // Added helium for alpha decay
        "XX|XX|XX"
    ],
    reactions: {
        "water": { elem1: "explosion", chance: 0.5 },  // extremely reactive, explodes with water
        "neutron": { elem1: "NExplosion", chance: 0.0001 },  // negligible fissility
        "fast_neutron": { elem1: "NExplosion", chance: 0.0005 }
    },
    tempHigh: 27,  // melts at ~27°C
    stateHigh: "molten_francium",
    category: "solids",
    state: "solid",
    density: 2480,  // approx 2.48 g/cm³
    darkText: true,
    conduct: 0.3,
    hard: 0.5,  // very soft
    burn: 100,
    burnTime: 100,
    fireColor: "#ffffff",
    tick: function(pixel) {
        if (Math.random() < 0.005) selfHeat(pixel, 80, 20);  // intense self-heating (short half-life ~22 min)
        emitAlphaParticle(pixel, 0.0001, "radium");
    }
};

elements.molten_francium = {
    name: "molten francium",
    color: ["#eeeeee","#cccccc","#dddddd","#bbbbbb"],
    behavior: behaviors.LIQUID,
    temp: 50,
    tempLow: 27,
    stateLow: "francium",
    viscosity: 1000,  // low viscosity like liquid alkali metals
    density: 2200,
    category: "liquids",
    state: "liquid",
    burn: 100,
    burnTime: 200,
    fireColor: "#dddddd",
    reactions: {
        "water": { elem1: "explosion", chance: 1.0 },  // instant explosion
        "radiation": { elem1: null, elem2: "radiation", chance: 0.2 }
    },
    tick: function(pixel) {
        if (Math.random() < 0.01) selfHeat(pixel, 130, 20);
    }
};

// === TECHNETIUM (radioactive transition metal) ===
elements.technetium = {
    name: "technetium",
    color: ["#a0a0a0","#808080","#909090","#b0b0b0"],  // silvery gray
    behavior: [
        "XX|XX|XX",
        "XX|RL:radiation%8 AND CH:molybdenum%0.001|XX",  // Tc-99 beta to Ru-99, but simplify
        "XX|XX|XX"
    ],
    reactions: {
        "neutron": { elem1: "NExplosion", chance: 0.005 },  // some fission potential
        "fast_neutron": { elem1: "NExplosion", chance: 0.01 }
    },
    tempHigh: 2157,
    stateHigh: "molten_technetium",
    category: "solids",
    state: "solid",
    density: 11500,
    darkText: true,
    conduct: 0.2,
    hard: 4,
    tick: function(pixel) {
        if (Math.random() < 0.0005) selfHeat(pixel, 30, 20);  // moderate self-heating
    }
};

elements.molten_technetium = {
    name: "molten technetium",
    color: ["#dddddd","#bbbbbb","#cccccc","#eeeeee"],
    behavior: behaviors.LIQUID,
    temp: 2200,
    tempLow: 2157,
    stateLow: "technetium",
    viscosity: 5000,
    density: 10300,
    category: "liquids",
    state: "liquid",
    burn: 30,
    burnTime: 400,
    fireColor: "#cccccc",
    reactions: {
        "neutron": { elem1: "NExplosion", chance: 0.01 },
        "fast_neutron": { elem1: "NExplosion", chance: 0.02 },
        "oxygen": { elem1: "technetium_dioxide", chance: 0.1 }  // forms oxide
    }
};

// === RADIUM (extremely radioactive, glows in the dark) ===
elements.radium = {
    name: "radium",
    color: ["#ccffcc","#aaffaa","#bbffbb","#ddffdd"],  // pale greenish glow (famous radium glow)
    behavior: [
        "XX|XX|XX",
        "XX|RL:radiation%20 AND CR:radon%0.08 AND CR:helium%0.08 AND CH:lead%0.0001|XX",  // Added helium for alpha decay
        "XX|XX|XX"
    ],
    reactions: {
        "neutron": { elem1: "NExplosion", chance: 0.0005 },      // almost no fissility
        "fast_neutron": { elem1: "NExplosion", chance: 0.002 }
    },
    tempHigh: 973,        // melts at 700 °C
    stateHigh: "molten_radium",
    category: "solids",
    state: "solid",
    density: 5500,        // real density ~5.5 g/cm³
    darkText: false,      // bright glow → light text looks better
    conduct: 0.18,
    hard: 1.5,            // soft alkaline-earth metal
    burn: 60,
    burnTime: 300,
    fireColor: "#88ff88",
    tick: function(pixel) {
        // Intense self-heating + constant faint glow effect (reduced for lag)
        if (Math.random() < 0.002) selfHeat(pixel, 60, 20);
        if (Math.random() < 0.005) {
            // tiny glowing particles (visual only)
            if (isEmpty(pixel.x + Math.floor(Math.random()*3)-1, pixel.y + Math.floor(Math.random()*3)-1)) {
                createPixel("light", pixel.x + Math.floor(Math.random()*3)-1, pixel.y + Math.floor(Math.random()*3)-1);
            }
        }
        emitAlphaParticle(pixel, 0.00001, "radon");  // Rare alpha decay event
    }
};

elements.molten_radium = {
    name: "molten radium",
    color: ["#ddffdd","#bbffbb","#ccffcc","#eeffee"],  // brighter glowing liquid
    behavior: behaviors.LIQUID,
    temp: 1100,
    tempLow: 973,
    stateLow: "radium",
    viscosity: 3000,       // surprisingly low viscosity for a liquid metal
    density: 5000,
    category: "liquids",
    state: "liquid",
    burn: 80,
    burnTime: 500,
    fireColor: "#aaffaa",
    reactions: {
        "water": { elem1: "explosion", chance: 0.25 },  // radium + water → violent reaction (real!)
        "neutron": { elem1: "NExplosion", chance: 0.003 },
        "radiation": { elem1: null, elem2: "radiation", chance: 0.1 }
    },
    tick: function(pixel) {
        if (Math.random() < 0.01) {
            // constant radon bubbling (now rare)
            if (!outOfBounds(pixel.x, pixel.y-1) && isEmpty(pixel.x, pixel.y-1)) {
                createPixel("radon", pixel.x, pixel.y-1);
            }
        }
    }
};

// === RADON (radioactive noble gas, decays fast) ===
elements.radon = {
    name: "radon",
    color: ["#ccff99","#aaff88","#bbff99","#ddffaa"],  // faint yellowish-green
    behavior: behaviors.GAS,
    reactions: {
        // Rn-222 → Po-218 (alpha), but we just turn it into radiation + tiny lead
        "radiation": { elem1: "lead", chance: 0.0003 }
    },
    category: "gases",
    state: "gas",
    density: 9.73,         // ~9.73 g/L at STP (very heavy gas)
    temp: 20,
    tempLow: -61.8,        // boils at –61.8 °C
    stateLow: null,
    tempHigh: null,
    burn: 100,
    burnTime: 10,
    fireColor: "#88ff88",
    tick: function(pixel) {
        // High radiation + decays quickly into solid polonium/lead dust (reduced for lag)
        if (Math.random() < 0.0008) {
            selfHeat(pixel, 180, 20);
            changePixel(pixel, "polonium_dust");
        }
        if (Math.random() < 0.012) {
            createPixel("radiation", pixel.x + Math.floor(Math.random()*5)-2, pixel.y + Math.floor(Math.random()*5)-2);
        }
        emitAlphaParticle(pixel, 0.0002, "polonium_dust");
    }
};

// Tiny polonium dust (decay product, insanely radioactive)
elements.polonium_dust = {
    color: ["#ffcccc","#ffaaaa","#ffbbbb","#ffdddd"],
    behavior: behaviors.POWDER,
    category: "solids",
    state: "solid",
    density: 9190,
    tempHigh: 527,         // melts at 254 °C
    stateHigh: "molten_polonium",
    tick: function(pixel) {
        if (Math.random() < 0.002) selfHeat(pixel, 280, 20);  // was 0.02
        if (Math.random() < 0.02) {
            createPixel("radiation", pixel.x, pixel.y);
        }
        emitAlphaParticle(pixel, 0.0005, "lead");  // Po-210 alpha to Pb-206
    }
};

elements.molten_polonium = {
    color: ["#ff8888","#ff6666","#ff9999"],
    behavior: behaviors.LIQUID,
    temp: 600,
    tempLow: 527,
    stateLow: "polonium_dust",
    viscosity: 4000,
    density: 8200,
    category: "liquids"
};

// === ACTINIUM (highly radioactive, glows blue) ===
elements.actinium = {
    name: "actinium",
    color: ["#a0a0ff","#8080ff","#9090ff","#c0c0ff"],  // bluish tint for glow
    behavior: [
        "XX|XX|XX",
        "XX|RL:radiation%15 AND CH:radium%0.005|XX",  // Ac-227 beta to Th-227, but simplify to radium (predecessor) or lead; high radiation due to short half-life ~22y
        "XX|XX|XX"
    ],
    reactions: {
        "neutron": { elem1: "NExplosion", chance: 0.001 },  // very low fissility
        "fast_neutron": { elem1: "NExplosion", chance: 0.005 }
    },
    tempHigh: 1323,  // 1050°C
    stateHigh: "molten_actinium",
    category: "solids",
    state: "solid",
    density: 10070,
    darkText: true,
    conduct: 0.12,
    hard: 2.5,
    tick: function(pixel) {
        if (Math.random() < 0.001) selfHeat(pixel, 80, 20);  // self-heating from intense radioactivity
    }
};

elements.molten_actinium = {
    name: "molten actinium",
    color: ["#ccccff","#aaaaff","#bbbbff","#ddddff"],  // glowing blue-white
    behavior: behaviors.LIQUID,
    temp: 1400,
    tempLow: 1323,
    stateLow: "actinium",
    viscosity: 6000,
    density: 9000,  // approx 10% less
    category: "liquids",
    state: "liquid",
    burn: 40,
    burnTime: 600,
    fireColor: "#8888ff",
    reactions: {
        "neutron": { elem1: "NExplosion", chance: 0.005 },
        "fast_neutron": { elem1: "NExplosion", chance: 0.01 },
        "water": { elem1: "explosion", chance: 0.02 }  // reactive
    }
};

// === THORIUM (weakly radioactive, fertile) ===
elements.thorium = {
    name: "thorium",
    color: ["#a0a0a0","#808080","#909090","#b0b0b0"],  // silvery gray
    behavior: [
        "XX|XX|XX",
        "XX|RL:radiation%0.5 AND CR:helium%0.00001 AND CH:lead%0.00001 AND CH:neutron%0.000005|XX",  // added helium
        "XX|XX|XX"
    ],
    reactions: {
        "neutron": { elem1: "neutron", elem2: "protactinium", chance: 0.05 },  // Th-232 + n → Th-233 beta to Pa-233
        "fast_neutron": { elem1: "NExplosion", chance: 0.0001 }  // very low fission
    },
    tempHigh: 2115,  // 1842°C
    stateHigh: "molten_thorium",
    category: "solids",
    state: "solid",
    density: 11780,
    darkText: true,
    conduct: 0.15,
    hard: 3,
    tick: function(pixel) {
        if (Math.random() < 0.00001) selfHeat(pixel, 5, 5);  // minimal self-heating
    }
};

elements.molten_thorium = {
    name: "molten thorium",
    color: ["#dddddd","#bbbbbb","#cccccc","#eeeeee"],
    behavior: behaviors.LIQUID,
    temp: 2200,
    tempLow: 2115,
    stateLow: "thorium",
    viscosity: 7000,
    density: 10500,
    category: "liquids",
    state: "liquid",
    burn: 20,
    burnTime: 400,
    fireColor: "#ffffff",
    reactions: {
        "neutron": { elem1: "protactinium", chance: 0.1 }  // breeding in molten state
    }
};

// === PROTACTINIUM (radioactive, fertile) ===
elements.protactinium = {
    name: "protactinium",
    color: ["#b0b0b0","#909090","#a0a0a0","#c0c0c0"],
    behavior: [
        "XX|XX|XX",
        "XX|RL:radiation%4 AND CR:helium%0.001 AND CH:actinium%0.001|XX",  // added helium
        "XX|XX|XX"
    ],
    reactions: {
        "neutron": { elem1: null, elem2: "uranium", chance: 0.03 },  // Pa-233 beta to U-233 (fissile)
        "fast_neutron": { elem1: "NExplosion", chance: 0.001 }
    },
    tempHigh: 1841,  // 1568°C
    stateHigh: "molten_protactinium",
    category: "solids",
    state: "solid",
    density: 15370,
    darkText: true,
    conduct: 0.18,
    hard: 3.2,
    tick: function(pixel) {
        if (Math.random() < 0.0005) selfHeat(pixel, 30, 20);
    }
};

elements.molten_protactinium = {
    name: "molten protactinium",
    color: ["#e0e0e0","#c0c0c0","#d0d0d0","#f0f0f0"],
    behavior: behaviors.LIQUID,
    temp: 1900,
    tempLow: 1841,
    stateLow: "protactinium",
    viscosity: 6500,
    density: 13800,
    category: "liquids",
    state: "liquid",
    burn: 30,
    burnTime: 500,
    fireColor: "#dddddd",
    reactions: {
        "neutron": { elem1: "uranium", chance: 0.05 }
    }
};

// === URANIUM (updated with more details) ===
elements.uranium = {
    color: ["#9ea190","#676d68","#a1a194","#99bba4"],
    behavior: [
        "XX|XX|XX",
        "XX|RL:radiation%2 AND CR:helium%0.0005 AND CH:lead%0.0005 AND CH:neutron%0.00025|XX",  // added helium
        "XX|XX|XX"
    ],
    reactions: {
        "neutron": { elem1: "neutron", elem2: "NExplosion", chance: 0.015 },  // slightly higher
        "fast_neutron": { elem1: "NExplosion", chance: 0.005 }
    },
    tempHigh: 1405,
    stateHigh: "molten_uranium",
    category: "solids",
    state: "solid",
    density: 19060,
    darkText: true,
    conduct: 0.28,
    hard: 6,
    tick: function(pixel) {
        if (Math.random() < 0.00005) selfHeat(pixel, 10, 10);  // minor self-heating
        var neutronCount = countNearbyNeutrons(pixel);
        if (neutronCount > 4 && Math.random() < 0.05) changePixel(pixel, "NExplosion");  // Criticality check
    }
};

elements.molten_uranium = {
    color: ["#d4ffaa","#b8ff8c","#e6ffcc"],
    behavior: behaviors.LIQUID,
    temp: 1500,
    tempLow: 1405,
    stateLow: "uranium",
    viscosity: 8000,
    density: 17300,
    category: "liquids",
    state: "liquid",
    burn: 15,
    burnTime: 400,
    fireColor: "#99ff99",
    reactions: {
        "neutron": { elem1: "NExplosion", chance: 0.04 },
        "fast_neutron": { elem1: "NExplosion", chance: 0.015 },
        "radiation": { elem1: null, elem2: "radiation", chance: 0.03 }
    },
    tick: function(pixel) {
        var neutronCount = countNearbyNeutrons(pixel, 2);  // Larger radius for molten
        if (neutronCount > 3 && Math.random() < 0.1) changePixel(pixel, "NExplosion");
    }
};

// === NEPTUNIUM (updated) ===
elements.neptunium = {
    color: ["#a09891","#46413e","#28282c","#807b7b"],
    behavior: [
        "XX|XX|XX",
        "XX|RL:radiation%5 AND CR:helium%0.0005 AND CH:protactinium%0.0005 AND CH:neutron%0.00025|XX",  // added helium
        "XX|XX|XX"
    ],
    reactions: {
        "neutron": { elem1: "NExplosion", chance: 0.01 },  // low but present
        "fast_neutron": { elem1: "NExplosion", chance: 0.03 }
    },
    tempHigh: 912,
    stateHigh: "molten_neptunium",
    category: "solids",
    state: "solid",
    density: 20450,
    darkText: true,
    conduct: 0.15,
    hard: 3.2,
    tick: function(pixel) {
        if (Math.random() < 0.0001) selfHeat(pixel, 20, 10);
        var neutronCount = countNearbyNeutrons(pixel);
        if (neutronCount > 5 && Math.random() < 0.02) changePixel(pixel, "NExplosion");
    }
};

elements.molten_neptunium = {
    color: ["#e6e6ff","#ccccff","#d4d4ff","#b3b3ff"],
    behavior: behaviors.LIQUID,
    temp: 1000,
    tempLow: 912,
    stateLow: "neptunium",
    viscosity: 7000,
    density: 19000,
    category: "liquids",
    state: "liquid",
    burn: 25,
    burnTime: 450,
    fireColor: "#aaaaff",
    reactions: {
        "neutron": { elem1: "NExplosion", chance: 0.03 },
        "fast_neutron": { elem1: "NExplosion", chance: 0.06 },
        "water": { elem1: "explosion", chance: 0.005 }
    },
    tick: function(pixel) {
        var neutronCount = countNearbyNeutrons(pixel);
        if (neutronCount > 4 && Math.random() < 0.05) changePixel(pixel, "NExplosion");
    }
};

// === PLUTONIUM (updated) ===
elements.plutonium = {
    color: ["#8b8f8f","#6c6e70","#7e7e86","#c2c2c2"],
    behavior: [
        "XX|XX|XX",
        "XX|RL:radiation%6 AND CR:helium%0.005 AND CH:uranium%0.005 AND CH:neutron%0.0035|XX",  // added helium
        "XX|XX|XX"
    ],
    reactions: {
        "neutron": { elem1: "neutron", elem2: "NExplosion", chance: 0.12 },  // very high
        "fast_neutron": { elem1: "NExplosion", chance: 0.18 }
    },
    tempHigh: 912,
    stateHigh: "molten_plutonium",
    category: "solids",
    state: "solid",
    density: 19840,
    darkText: true,
    conduct: 0.18,
    hard: 3.5,
    tick: function(pixel) {
        if (Math.random() < 0.0002) selfHeat(pixel, 40, 20);  // notable self-heating
        var neutronCount = countNearbyNeutrons(pixel);
        if (neutronCount > 2 && Math.random() < 0.15) changePixel(pixel, "NExplosion");  // High sensitivity
    }
};

elements.molten_plutonium = {
    color: ["#ccffff","#aadddd","#99eeee","#bbffff"],
    behavior: behaviors.LIQUID,
    temp: 1000,
    tempLow: 912,
    stateLow: "plutonium",
    viscosity: 6500,
    density: 17500,
    category: "liquids",
    state: "liquid",
    burn: 50,
    burnTime: 999,
    fireColor: "#88ff88",
    reactions: {
        "neutron": { elem1: "NExplosion", chance: 0.20 },
        "fast_neutron": { elem1: "NExplosion", chance: 0.30 },
        "water": { elem1: "explosion", chance: 0.015 }
    },
    tick: function(pixel) {
        var neutronCount = countNearbyNeutrons(pixel, 2);
        if (neutronCount > 1 && Math.random() < 0.25) changePixel(pixel, "NExplosion");  // Even higher in molten
    }
};

// === AMERICIUM (highly radioactive, used in smoke detectors) ===
elements.americium = {
    name: "americium",
    color: ["#b0b0ff","#9090ff","#a0a0ff","#d0d0ff"],  // purplish glow
    behavior: [
        "XX|XX|XX",
        "XX|RL:radiation%10 AND CR:helium%0.01 AND CH:neptunium%0.01 AND CH:neutron%0.0015|XX",  // corrected: Am-241 alpha to Np-237, added helium
        "XX|XX|XX"
    ],
    reactions: {
        "neutron": { elem1: "NExplosion", chance: 0.005 },  // low for Am-241
        "fast_neutron": { elem1: "NExplosion", chance: 0.02 }
    },
    tempHigh: 1449,  // 1176°C
    stateHigh: "molten_americium",
    category: "solids",
    state: "solid",
    density: 11700,
    darkText: true,
    conduct: 0.11,
    hard: 2.8,
    tick: function(pixel) {
        if (Math.random() < 0.0008) selfHeat(pixel, 60, 20);  // strong self-heating
    }
};

elements.molten_americium = {
    name: "molten americium",
    color: ["#e0e0ff","#c0c0ff","#d0d0ff","#f0f0ff"],
    behavior: behaviors.LIQUID,
    temp: 1500,
    tempLow: 1449,
    stateLow: "americium",
    viscosity: 6000,
    density: 10500,
    category: "liquids",
    state: "liquid",
    burn: 35,
    burnTime: 550,
    fireColor: "#bb88ff",
    reactions: {
        "neutron": { elem1: "NExplosion", chance: 0.01 },
        "fast_neutron": { elem1: "NExplosion", chance: 0.04 },
        "radiation": { elem1: null, elem2: "radiation", chance: 0.05 }
    }
};

// === CURIUM (very radioactive, self-glowing from heat) ===
elements.curium = {
    name: "curium",
    color: ["#c0c0c0","#a0a0a0","#b0b0b0","#e0e0e0"],
    behavior: [
        "XX|XX|XX",
        "XX|RL:radiation%12 AND CR:helium%0.02 AND CH:plutonium%0.02 AND CH:neutron%0.0385|XX",  // Cm-244 alpha to Pu-240, added helium
        "XX|XX|XX"
    ],
    reactions: {
        "neutron": { elem1: "NExplosion", chance: 0.02 },  // some isotopes fissile
        "fast_neutron": { elem1: "NExplosion", chance: 0.05 }
    },
    tempHigh: 1613,  // 1340°C
    stateHigh: "molten_curium",
    category: "solids",
    state: "solid",
    density: 13510,
    darkText: true,
    conduct: 0.13,
    hard: 3,
    tick: function(pixel) {
        if (Math.random() < 0.001) selfHeat(pixel, 80, 20);  // intense heat, Cm glows red-hot from decay
        var neutronCount = countNearbyNeutrons(pixel);
        if (neutronCount > 3 && Math.random() < 0.1) changePixel(pixel, "NExplosion");
    }
};

elements.molten_curium = {
    name: "molten curium",
    color: ["#ffdddd","#ffbbbb","#ffcccc","#ffeeee"],  // reddish glow
    behavior: behaviors.LIQUID,
    temp: 1700,
    tempLow: 1613,
    stateLow: "curium",
    viscosity: 7000,
    density: 12100,
    category: "liquids",
    state: "liquid",
    burn: 45,
    burnTime: 700,
    fireColor: "#ff8888",
    reactions: {
        "neutron": { elem1: "NExplosion", chance: 0.05 },
        "fast_neutron": { elem1: "NExplosion", chance: 0.1 },
        "water": { elem1: "explosion", chance: 0.01 }
    }
};

// === SUBSTANCES / COMPOUNDS ===
elements.uranium_dioxide = {  // UO2, ceramic fuel
    name: "uranium dioxide",
    color: ["#333333","#444444","#222222"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 10970,
    tempHigh: 2875,  // very high melting
    stateHigh: "molten_uranium_dioxide",
    reactions: {
        "neutron": { elem1: "NExplosion", chance: 0.01 }  // can fission
    },
    tick: function(pixel) {
        if (Math.random() < 0.00001) selfHeat(pixel, 5, 5);  // slight heating
        var neutronCount = countNearbyNeutrons(pixel);
        if (neutronCount > 5 && Math.random() < 0.03) changePixel(pixel, "NExplosion");
    }
};

elements.molten_uranium_dioxide = {
    name: "molten uranium dioxide",
    color: ["#ff6600","#ff8800","#ff4400"],
    behavior: behaviors.LIQUID,
    temp: 3000,
    tempLow: 2875,
    stateLow: "uranium_dioxide",
    viscosity: 10000,
    density: 9800
};

elements.plutonium_dioxide = {  // PuO2
    name: "plutonium dioxide",
    color: ["#ffcc00","#ffdd00","#ffbb00"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 11460,
    tempHigh: 2400,
    stateHigh: "molten_plutonium_dioxide",
    reactions: {
        "neutron": { elem1: "NExplosion", chance: 0.08 }  // high fissility
    },
    tick: function(pixel) {
        if (Math.random() < 0.0001) selfHeat(pixel, 10, 10);
        var neutronCount = countNearbyNeutrons(pixel);
        if (neutronCount > 3 && Math.random() < 0.1) changePixel(pixel, "NExplosion");
    }
};

elements.molten_plutonium_dioxide = {
    name: "molten plutonium dioxide",
    color: ["#ffff00","#ffee00","#ffff33"],
    behavior: behaviors.LIQUID,
    temp: 2500,
    tempLow: 2400,
    stateLow: "plutonium_dioxide",
    viscosity: 9000,
    density: 10200
};

elements.neptunium_dioxide = {  // NpO2
    name: "neptunium dioxide",
    color: ["#666666","#777777","#555555"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 11200,
    tempHigh: 2547,
    stateHigh: "molten_neptunium_dioxide",
    reactions: {
        "neutron": { elem1: "NExplosion", chance: 0.005 }
    },
    tick: function(pixel) {
        var neutronCount = countNearbyNeutrons(pixel);
        if (neutronCount > 4 && Math.random() < 0.02) changePixel(pixel, "NExplosion");
    }
};

elements.molten_neptunium_dioxide = {
    name: "molten neptunium dioxide",
    color: ["#ff9933","#ffaa44","#ff8822"],
    behavior: behaviors.LIQUID,
    temp: 2600,
    tempLow: 2547,
    stateLow: "neptunium_dioxide",
    viscosity: 9500,
    density: 10000
};

elements.thorium_dioxide = {  // ThO2, thoria
    name: "thorium dioxide",
    color: ["#ffffff","#eeeeee","#dddddd"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 10000,
    tempHigh: 3390,  // extremely refractory
    stateHigh: "molten_thorium_dioxide"
};

elements.molten_thorium_dioxide = {
    name: "molten thorium dioxide",
    color: ["#ffffcc","#ffffdd","#ffffbb"],
    behavior: behaviors.LIQUID,
    temp: 3500,
    tempLow: 3390,
    stateLow: "thorium_dioxide",
    viscosity: 12000,
    density: 9000
};

elements.protactinium_dioxide = {  // PaO2
    name: "protactinium dioxide",
    color: ["#999999","#aaaaaa","#888888"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 10200,
    tempHigh: 2000,  // estimated
    stateHigh: "molten_protactinium_dioxide"
};

elements.molten_protactinium_dioxide = {
    name: "molten protactinium dioxide",
    color: ["#ffcc99","#ffddaa","#ffbb88"],
    behavior: behaviors.LIQUID,
    temp: 2100,
    tempLow: 2000,
    stateLow: "protactinium_dioxide",
    viscosity: 8000,
    density: 9100
};

elements.americium_dioxide = {  // AmO2
    name: "americium dioxide",
    color: ["#660066","#770077","#550055"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 11500,
    tempHigh: 2176,
    stateHigh: "molten_americium_dioxide",
    tick: function(pixel) {
        if (Math.random() < 0.0002) selfHeat(pixel, 20, 10);
    }
};

elements.molten_americium_dioxide = {
    name: "molten americium dioxide",
    color: ["#ff00ff","#ee00ee","#ff33ff"],
    behavior: behaviors.LIQUID,
    temp: 2200,
    tempLow: 2176,
    stateLow: "americium_dioxide",
    viscosity: 7000,
    density: 10300
};

elements.curium_dioxide = {  // CmO2
    name: "curium dioxide",
    color: ["#990000","#aa0000","#880000"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 11300,
    tempHigh: 2000,  // estimated
    stateHigh: "molten_curium_dioxide",
    tick: function(pixel) {
        if (Math.random() < 0.0003) selfHeat(pixel, 30, 10);
    }
};

elements.molten_curium_dioxide = {
    name: "molten curium dioxide",
    color: ["#ff3333","#ff4444","#ff2222"],
    behavior: behaviors.LIQUID,
    temp: 2100,
    tempLow: 2000,
    stateLow: "curium_dioxide",
    viscosity: 8000,
    density: 10100
};

elements.radium_chloride = {  // RaCl2, soluble salt
    name: "radium chloride",
    color: ["#ffffff","#eeeeee"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 5010,
    tempHigh: 1000,
    stateHigh: "molten_radium_chloride",
    reactions: {
        "water": { elem1: null, elem2: "radium_solution" }  // dissolves
    },
    tick: function(pixel) {
        if (Math.random() < 0.001) createPixel("radiation", pixel.x, pixel.y);
    }
};

elements.molten_radium_chloride = {
    name: "molten radium chloride",
    color: ["#ffff99","#ffffaa"],
    behavior: behaviors.LIQUID,
    temp: 1100,
    tempLow: 1000,
    stateLow: "radium_chloride",
    viscosity: 2000,
    density: 4500
};

elements.actinium_oxide = {  // Ac2O3
    name: "actinium oxide",
    color: ["#ccccff","#bbbbff"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 9500,
    tempHigh: 1800,  // estimated
    stateHigh: "molten_actinium_oxide",
    tick: function(pixel) {
        if (Math.random() < 0.0005) selfHeat(pixel, 10, 10);
    }
};

elements.molten_actinium_oxide = {
    name: "molten actinium oxide",
    color: ["#eeeeff","#ddddff"],
    behavior: behaviors.LIQUID,
    temp: 1900,
    tempLow: 1800,
    stateLow: "actinium_oxide",
    viscosity: 10000,
    density: 8500
};

elements.polonium_dioxide = {  // PoO2
    name: "polonium dioxide",
    color: ["#ff0000","#ee0000","#ff1111"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 8900,
    tempHigh: 600,  // decomposes
    stateHigh: "polonium_dust",  // decomposes
    tick: function(pixel) {
        if (Math.random() < 0.001) selfHeat(pixel, 80, 20);  // high heat
        if (Math.random() < 0.01) createPixel("radiation", pixel.x, pixel.y);
    }
};

elements.technetium_dioxide = {  // TcO2
    name: "technetium dioxide",
    color: ["#666666","#777777"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 6500,
    tempHigh: 1100,
    stateHigh: "molten_technetium_dioxide",
    tick: function(pixel) {
        if (Math.random() < 0.0002) createPixel("radiation", pixel.x, pixel.y);
    }
};

elements.molten_technetium_dioxide = {
    name: "molten technetium dioxide",
    color: ["#ff9966","#ffaa77"],
    behavior: behaviors.LIQUID,
    temp: 1200,
    tempLow: 1100,
    stateLow: "technetium_dioxide",
    viscosity: 6000,
    density: 5800
};

elements.francium_hydroxide = {  // FrOH, theoretical
    name: "francium hydroxide",
    color: ["#ffffff","#dddddd"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 3000,  // estimated
    reactions: {
        "water": { elem1: "explosion", chance: 0.1 }  // highly reactive base
    },
    tick: function(pixel) {
        if (Math.random() < 0.002) createPixel("radiation", pixel.x, pixel.y);
    }
};

// === ORES (in land category, only natural) ===
elements.uraninite = {  // Primary uranium ore (pitchblende)
    name: "uraninite",
    color: ["#333333","#444444","#222222","#555555"],  // black/gray
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    density: 10650,
    hard: 5.5,
    conduct: 0.05,
    reactions: {
        "acid": { elem1: "uranium", chance: 0.001 },
        "radiation": { elem1: "radium", chance: 0.00001 }  // trace decay products
    },
    tempHigh: 2875,  // same as UO2
    stateHigh: "molten_uraninite",
    tick: function(pixel) {
        if (Math.random() < 0.00001) createPixel("radiation", pixel.x, pixel.y);  // low radiation
        if (Math.random() < 0.000005) createPixel("radon", pixel.x, pixel.y - 1);  // rare radon emanation
    }
};

elements.molten_uraninite = {
    name: "molten uraninite",
    color: ["#ff6600","#ff8800","#ff4400","#ff5500"],
    behavior: behaviors.LIQUID,
    temp: 3000,
    tempLow: 2875,
    stateLow: "uraninite",
    viscosity: 10000,
    density: 9500,
    reactions: {
        "water": { elem1: "steam", chance: 0.1, temp1: -100 },  // cools and steams
        "neutron": { elem1: "NExplosion", chance: 0.005 }
    },
    tick: function(pixel) {
        if (Math.random() < 0.0001) createPixel("radiation", pixel.x, pixel.y);
    }
};

elements.carnotite = {  // Yellow uranium-vanadium ore
    name: "carnotite",
    color: ["#ffff00","#ffee00","#ffff33","#ffdd00"],  // yellow
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    density: 4300,
    hard: 2.5,
    conduct: 0.01,
    reactions: {
        "acid": { elem1: "uranium", chance: 0.0008 }
    },
    tempHigh: 1200,  // estimated
    stateHigh: "molten_carnotite",
    tick: function(pixel) {
        if (Math.random() < 0.000008) createPixel("radiation", pixel.x, pixel.y);
    }
};

elements.molten_carnotite = {
    name: "molten carnotite",
    color: ["#ffff66","#ffff88","#ffff44","#ffff55"],
    behavior: behaviors.LIQUID,
    temp: 1300,
    tempLow: 1200,
    stateLow: "carnotite",
    viscosity: 8000,
    density: 3800,
    reactions: {
        "water": { elem1: "explosion", chance: 0.01 }  // slight reaction
    }
};

elements.autunite = {  // Yellow-green uranium phosphate
    name: "autunite",
    color: ["#ccff00","#bbff00","#ddff00","#aaff00"],  // yellow-green
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    density: 3200,
    hard: 2,
    conduct: 0.02,
    reactions: {
        "acid": { elem1: "uranium", chance: 0.0006 }
    },
    tempHigh: 900,  // decomposes at lower temp
    stateHigh: "molten_autunite",
    tick: function(pixel) {
        if (Math.random() < 0.000006) createPixel("radiation", pixel.x, pixel.y);
    }
};

elements.molten_autunite = {
    name: "molten autunite",
    color: ["#ccff66","#bbff44","#ddff55","#aaff33"],
    behavior: behaviors.LIQUID,
    temp: 1000,
    tempLow: 900,
    stateLow: "autunite",
    viscosity: 7000,
    density: 2800
};

elements.torbernite = {  // Green uranium ore
    name: "torbernite",
    color: ["#00ff00","#00ee00","#00ff33","#00dd00"],  // green
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    density: 3500,
    hard: 2.5,
    conduct: 0.01,
    reactions: {
        "acid": { elem1: "uranium", chance: 0.0007 }
    },
    tempHigh: 950,
    stateHigh: "molten_torbernite",
    tick: function(pixel) {
        if (Math.random() < 0.000007) createPixel("radiation", pixel.x, pixel.y);
    }
};

elements.molten_torbernite = {
    name: "molten torbernite",
    color: ["#66ff66","#44ff44","#55ff55","#33ff33"],
    behavior: behaviors.LIQUID,
    temp: 1050,
    tempLow: 950,
    stateLow: "torbernite",
    viscosity: 7500,
    density: 3100
};

elements.coffinite = {  // Black uranium silicate
    name: "coffinite",
    color: ["#111111","#222222","#333333","#000000"],  // black
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    density: 5400,
    hard: 5,
    conduct: 0.03,
    reactions: {
        "acid": { elem1: "uranium", chance: 0.0009 }
    },
    tempHigh: 1400,
    stateHigh: "molten_coffinite",
    tick: function(pixel) {
        if (Math.random() < 0.000009) createPixel("radiation", pixel.x, pixel.y);
    }
};

elements.molten_coffinite = {
    name: "molten coffinite",
    color: ["#ff3333","#ff4444","#ff2222","#ff5555"],
    behavior: behaviors.LIQUID,
    temp: 1500,
    tempLow: 1400,
    stateLow: "coffinite",
    viscosity: 9000,
    density: 4800,
    reactions: {
        "neutron": { elem1: "NExplosion", chance: 0.001 }
    }
};

elements.monazite = {  // Primary thorium ore, yellow-brown
    name: "monazite",
    color: ["#cc9900","#aa8800","#bb9900","#ddaa00"],  // yellow-brown
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    density: 5200,
    hard: 5,
    conduct: 0.02,
    reactions: {
        "acid": { elem1: "thorium", chance: 0.0005 }
    },
    tempHigh: 1900,  // high melting
    stateHigh: "molten_monazite",
    tick: function(pixel) {
        if (Math.random() < 0.000005) createPixel("radiation", pixel.x, pixel.y);
    }
};

elements.molten_monazite = {
    name: "molten monazite",
    color: ["#ffcc66","#ffbb55","#ffdd77","#ffaa44"],
    behavior: behaviors.LIQUID,
    temp: 2000,
    tempLow: 1900,
    stateLow: "monazite",
    viscosity: 8500,
    density: 4600
};

elements.thorianite = {  // Black thorium oxide ore
    name: "thorianite",
    color: ["#222222","#333333","#111111","#444444"],  // black
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    density: 9800,
    hard: 6.5,
    conduct: 0.04,
    reactions: {
        "acid": { elem1: "thorium", chance: 0.0004 }
    },
    tempHigh: 3300,  // very high like ThO2
    stateHigh: "molten_thorianite",
    tick: function(pixel) {
        if (Math.random() < 0.000004) createPixel("radiation", pixel.x, pixel.y);
    }
};

elements.molten_thorianite = {
    name: "molten thorianite",
    color: ["#ffff99","#ffffaa","#ffff77","#ffffbb"],
    behavior: behaviors.LIQUID,
    temp: 3400,
    tempLow: 3300,
    stateLow: "thorianite",
    viscosity: 11000,
    density: 8800
};

elements.thorite = {  // Brown-black thorium silicate
    name: "thorite",
    color: ["#663300","#552200","#774400","#442200"],  // brown-black
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    density: 6700,
    hard: 4.5,
    conduct: 0.03,
    reactions: {
        "acid": { elem1: "thorium", chance: 0.0003 }
    },
    tempHigh: 1600,
    stateHigh: "molten_thorite",
    tick: function(pixel) {
        if (Math.random() < 0.000003) createPixel("radiation", pixel.x, pixel.y);
    }
};

elements.molten_thorite = {
    name: "molten thorite",
    color: ["#cc6600","#bb5500","#dd7700","#aa4400"],
    behavior: behaviors.LIQUID,
    temp: 1700,
    tempLow: 1600,
    stateLow: "thorite",
    viscosity: 9000,
    density: 6000
};

elements.allanite = {  // Thorium-bearing rare earth ore, dark brown
    name: "allanite",
    color: ["#993300","#882200","#aa4400","#771100"],  // dark brown
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    density: 3900,
    hard: 5.5,
    conduct: 0.02,
    reactions: {
        "acid": { elem1: "thorium", chance: 0.0002 }
    },
    tempHigh: 1500,
    stateHigh: "molten_allanite",
    tick: function(pixel) {
        if (Math.random() < 0.000002) createPixel("radiation", pixel.x, pixel.y);
    }
};

elements.molten_allanite = {
    name: "molten allanite",
    color: ["#ff6600","#ee5500","#ff7700","#dd4400"],
    behavior: behaviors.LIQUID,
    temp: 1600,
    tempLow: 1500,
    stateLow: "allanite",
    viscosity: 8000,
    density: 3500
};
