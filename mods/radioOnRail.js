// Universal Helper: Safely modifies existing elements or creates new ones without breaking UI references
function safeDefine(name, props) {
    if (!elements[name]) { elements[name] = {}; }
    for (var key in props) {
        if (props.hasOwnProperty(key)) { elements[name][key] = props[key]; }
    }
}

// === CORE FUNCTIONS (Strict ES5 Syntax) ===
function emitSpontaneousNeutrons(pixel, chance, minNeutrons, maxNeutrons) {
    if (minNeutrons === undefined) minNeutrons = 1;
    if (maxNeutrons === undefined) maxNeutrons = 3;
    if (Math.random() < chance) {
        var amount = Math.floor(Math.random() * (maxNeutrons - minNeutrons + 1)) + minNeutrons;
        for (var i = 0; i < amount; i++) {
            var rx = pixel.x + Math.floor(Math.random() * 5 - 2);
            var ry = pixel.y + Math.floor(Math.random() * 5 - 2);
            if (!outOfBounds(rx, ry) && isEmpty(rx, ry)) {
                createPixel("neutron", rx, ry);
            }
        }
        selfHeat(pixel, 10 * amount, 10);
    }
}

function countNearbyNeutrons(pixel, radius) {
    if (radius === undefined) radius = 1;
    var count = 0;
    for (var i = -radius; i <= radius; i++) {
        for (var j = -radius; j <= radius; j++) {
            if (i === 0 && j === 0) continue;
            var px = pixel.x + i;
            var py = pixel.y + j;
            if (!outOfBounds(px, py) && !isEmpty(px, py, true)) {
                var neighbor = pixelMap[px][py];
                if (neighbor.element === "neutron") { count++; }
            }
        }
    }
    return count;
}

function emitAlphaParticle(pixel, chance, decayProduct) {
    if (Math.random() < chance) {
        changePixel(pixel, decayProduct);
        if (isEmpty(pixel.x, pixel.y - 1)) { createPixel("helium", pixel.x, pixel.y - 1); }
        for (var k = 0; k < 3; k++) {
            var rx = pixel.x + Math.floor(Math.random() * 5 - 2);
            var ry = pixel.y + Math.floor(Math.random() * 5 - 2);
            if (isEmpty(rx, ry)) { createPixel("radiation", rx, ry); }
        }
    }
}

function selfHeat(pixel, baseHeat, variance) {
    if (variance === undefined) variance = 20;
    pixel.temp += baseHeat + Math.random() * variance;
}

// === NUCLEAR EXPLOSION HELPER ===
safeDefine("nexplosion", {
    color: ["#ffff80","#ffffff","#ff8000"],
    behavior: "CR:explosion%50 AND CR:radiation%100|CR:explosion%50 AND CR:radiation%100|CR:explosion%50 AND CR:radiation%100,CR:explosion%50 AND CR:radiation%100|XX|CR:explosion%50 AND CR:radiation%100,CR:explosion%50 AND CR:radiation%100|CR:explosion%50 AND CR:radiation%100|CR:explosion%50 AND CR:radiation%100",
    temp: 100000, category: "energy", state: "gas", density: 0.001,
    ignore: ["nexplosion","radiation","neutron"], burn: 100, burnTime: 9999, fireColor: "#ffff00", reactions: {}
});

// === FRANCIUM ===
safeDefine("francium", {
    color: ["#ffffff","#dddddd","#eeeeee","#cccccc"],
    behavior: "XX|CR:radiation%7.5|XX,CR:radiation%7.5|CR:radiation%7.5 AND CR:helium%0.0001 AND CH:radium%0.0001|CR:radiation%7.5,XX|CR:radiation%7.5|XX",
    reactions: { "water": { elem1: "explosion", chance: 0.5 }, "neutron": { elem1: "nexplosion", chance: 0.0001 } },
    tempHigh: 27, stateHigh: "molten_francium", category: "solids", state: "solid", density: 2480,
    darkText: true, conduct: 0.3, hard: 0.5, burn: 100, burnTime: 100, fireColor: "#ffffff",
    tick: function(pixel) {
        if (Math.random() < 0.005) selfHeat(pixel, 80, 20);
        emitAlphaParticle(pixel, 0.0001, "radium");
    }
});

safeDefine("molten_francium", {
    color: ["#eeeeee","#cccccc","#dddddd","#bbbbbb"], behavior: behaviors.LIQUID, temp: 50, tempLow: 27, stateLow: "francium",
    viscosity: 1000, density: 2200, category: "liquids", state: "liquid", burn: 100, burnTime: 200, fireColor: "#dddddd",
    reactions: { "water": { elem1: "explosion", chance: 1.0 } },
    tick: function(pixel) { if (Math.random() < 0.01) selfHeat(pixel, 130, 20); }
});

// === TECHNETIUM ===
safeDefine("technetium", {
    color: ["#a0a0a0","#808080","#909090","#b0b0b0"],
    behavior: "XX|CR:radiation%2|XX,CR:radiation%2|CR:radiation%2 AND CH:molybdenum%0.001|CR:radiation%2,XX|CR:radiation%2|XX",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.005 } },
    tempHigh: 2157, stateHigh: "molten_technetium", category: "solids", state: "solid", density: 11500, darkText: true, conduct: 0.2, hard: 4,
    tick: function(pixel) { if (Math.random() < 0.0005) selfHeat(pixel, 30, 20); }
});

safeDefine("molten_technetium", {
    color: ["#dddddd","#bbbbbb","#cccccc","#eeeeee"], behavior: behaviors.LIQUID, temp: 2200, tempLow: 2157, stateLow: "technetium",
    viscosity: 5000, density: 10300, category: "liquids", state: "liquid", burn: 30, burnTime: 400, fireColor: "#cccccc",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.01 }, "oxygen": { elem1: "technetium_dioxide", chance: 0.1 } }
});

// === RADIUM ===
safeDefine("radium", {
    color: ["#ccffcc","#aaffaa","#bbffbb","#ddffdd"],
    behavior: "XX|CR:radiation%5|XX,CR:radiation%5|CR:radiation%5 AND CR:radon%0.08 AND CR:helium%0.08 AND CH:lead%0.0001|CR:radiation%5,XX|CR:radiation%5|XX",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.0005 } },
    tempHigh: 973, stateHigh: "molten_radium", category: "solids", state: "solid", density: 5500, darkText: false, conduct: 0.18, hard: 1.5, burn: 60, burnTime: 300, fireColor: "#88ff88",
    tick: function(pixel) {
        if (Math.random() < 0.002) selfHeat(pixel, 60, 20);
        if (Math.random() < 0.005 && isEmpty(pixel.x + Math.floor(Math.random()*3)-1, pixel.y + Math.floor(Math.random()*3)-1)) {
            createPixel("light", pixel.x + Math.floor(Math.random()*3)-1, pixel.y + Math.floor(Math.random()*3)-1);
        }
        emitAlphaParticle(pixel, 0.00001, "radon");
    }
});

safeDefine("molten_radium", {
    color: ["#ddffdd","#bbffbb","#ccffcc","#eeffee"], behavior: behaviors.LIQUID, temp: 1100, tempLow: 973, stateLow: "radium",
    viscosity: 3000, density: 5000, category: "liquids", state: "liquid", burn: 80, burnTime: 500, fireColor: "#aaffaa",
    reactions: { "water": { elem1: "explosion", chance: 0.25 }, "neutron": { elem1: "nexplosion", chance: 0.003 } },
    tick: function(pixel) {
        if (Math.random() < 0.01 && !outOfBounds(pixel.x, pixel.y-1) && isEmpty(pixel.x, pixel.y-1)) { createPixel("radon", pixel.x, pixel.y-1); }
    }
});

// === RADON ===
safeDefine("radon", {
    color: ["#ccff99","#aaff88","#bbff99","#ddffaa"], behavior: behaviors.GAS, category: "gases", state: "gas", density: 9.73, temp: 20, tempLow: -61.8, burn: 100, burnTime: 10, fireColor: "#88ff88",
    tick: function(pixel) {
        if (Math.random() < 0.0008) { selfHeat(pixel, 180, 20); changePixel(pixel, "polonium_dust"); }
        if (Math.random() < 0.012) { createPixel("radiation", pixel.x + Math.floor(Math.random()*5)-2, pixel.y + Math.floor(Math.random()*5)-2); }
        emitAlphaParticle(pixel, 0.0002, "polonium_dust");
    }
});

safeDefine("polonium_dust", {
    color: ["#ffcccc","#ffaaaa","#ffbbbb","#ffdddd"], behavior: behaviors.POWDER, category: "solids", state: "solid", density: 9190, tempHigh: 527, stateHigh: "molten_polonium",
    tick: function(pixel) {
        if (Math.random() < 0.002) selfHeat(pixel, 280, 20);
        if (Math.random() < 0.02) { createPixel("radiation", pixel.x, pixel.y); }
        emitAlphaParticle(pixel, 0.0005, "lead");
    }
});

safeDefine("molten_polonium", {
    color: ["#ff8888","#ff6666","#ff9999"], behavior: behaviors.LIQUID, temp: 600, tempLow: 527, stateLow: "polonium_dust", viscosity: 4000, density: 8200, category: "liquids"
});

// === ACTINIUM ===
safeDefine("actinium", {
    color: ["#a0a0ff","#8080ff","#9090ff","#c0c0ff"],
    behavior: "XX|CR:radiation%6.25|XX,CR:radiation%6.25|CR:radiation%6.25 AND CH:radium%0.01|CR:radiation%6.25,XX|CR:radiation%6.25|XX",
    reactions: { "neutron": { elem1: "radiation", chance: 0.5 } },
    tempHigh: 1323, stateHigh: "molten_actinium", category: "solids", state: "solid", density: 10070, darkText: true, conduct: 0.12, hard: 2.5,
    tick: function(pixel) {
        if (Math.random() < 0.05) selfHeat(pixel, 15, 5);
        if (Math.random() < 0.04) {
            var rx = pixel.x + Math.floor(Math.random() * 5 - 2);
            var ry = pixel.y + Math.floor(Math.random() * 5 - 2);
            if (!outOfBounds(rx, ry) && isEmpty(rx, ry)) { createPixel("neutron", rx, ry); }
        }
    }
});

safeDefine("molten_actinium", {
    color: ["#ccccff","#aaaaff","#bbbbff","#ddddff"], behavior: behaviors.LIQUID, temp: 1400, tempLow: 1323, stateLow: "actinium",
    viscosity: 6000, density: 9000, category: "liquids", state: "liquid", burn: 40, burnTime: 600, fireColor: "#8888ff",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.005 }, "water": { elem1: "explosion", chance: 0.02 } }
});

// === THORIUM ===
safeDefine("thorium", {
    color: ["#a0a0a0","#808080","#909090","#b0b0b0"],
    behavior: "XX|CR:radiation%0.125|XX,CR:radiation%0.125|CR:radiation%0.125 AND CR:helium%0.00001 AND CH:lead%0.00001|CR:radiation%0.125,XX|CR:radiation%0.125|XX",
    reactions: { "neutron": { elem1: null, elem2: "protactinium", chance: 0.05 } },
    tempHigh: 2115, stateHigh: "molten_thorium", category: "solids", state: "solid", density: 11780, darkText: true, conduct: 0.15, hard: 3,
    tick: function(pixel) {
        if (Math.random() < 0.00001) selfHeat(pixel, 5, 5);
        if (Math.random() < 0.0000005) {
            var rx = pixel.x + Math.floor(Math.random() * 5 - 2);
            var ry = pixel.y + Math.floor(Math.random() * 5 - 2);
            if (!outOfBounds(rx, ry) && isEmpty(rx, ry)) { createPixel("neutron", rx, ry); }
        }
    }
});

safeDefine("molten_thorium", {
    color: ["#dddddd","#bbbbbb","#cccccc","#eeeeee"], behavior: behaviors.LIQUID, temp: 2200, tempLow: 2115, stateLow: "thorium",
    viscosity: 7000, density: 10500, category: "liquids", state: "liquid", burn: 20, burnTime: 400, fireColor: "#ffffff",
    reactions: { "neutron": { elem1: "protactinium", chance: 0.1 } }
});

// === PROTACTINIUM ===
safeDefine("protactinium", {
    color: ["#b0b0b0","#909090","#a0a0a0","#c0c0c0"],
    behavior: "XX|CR:radiation%1|XX,CR:radiation%1|CR:radiation%1 AND CR:helium%0.001 AND CH:actinium%0.001|CR:radiation%1,XX|CR:radiation%1|XX",
    reactions: { "neutron": { elem1: null, elem2: "uranium", chance: 0.03 } },
    tempHigh: 1841, stateHigh: "molten_protactinium", category: "solids", state: "solid", density: 15370, darkText: true, conduct: 0.18, hard: 3.2,
    tick: function(pixel) { if (Math.random() < 0.0005) selfHeat(pixel, 30, 20); }
});

safeDefine("molten_protactinium", {
    color: ["#e0e0e0","#c0c0c0","#d0d0d0","#f0f0f0"], behavior: behaviors.LIQUID, temp: 1900, tempLow: 1841, stateLow: "protactinium",
    viscosity: 6500, density: 13800, category: "liquids", state: "liquid", burn: 30, burnTime: 500, fireColor: "#dddddd",
    reactions: { "neutron": { elem1: "uranium", chance: 0.05 } }
});

// === URANIUM ===
safeDefine("uranium", {
    color: ["#9ea190","#676d68","#a1a194","#99bba4"],
    behavior: "XX|CR:radiation%0.5|XX,CR:radiation%0.5|CR:radiation%0.5 AND CR:helium%0.0005 AND CH:lead%0.0005|CR:radiation%0.5,XX|CR:radiation%0.5|XX",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.015 } },
    tempHigh: 1405, stateHigh: "molten_uranium", category: "solids", state: "solid", density: 19060, darkText: true, conduct: 0.28, hard: 6,
    tick: function(pixel) {
        if (Math.random() < 0.00005) selfHeat(pixel, 10, 10);
        emitSpontaneousNeutrons(pixel, 0.00005, 1, 2);
        var neutronCount = countNearbyNeutrons(pixel);
        if (neutronCount > 4 && Math.random() < 0.05) changePixel(pixel, "nexplosion");
    }
});

safeDefine("molten_uranium", {
    color: ["#d4ffaa","#b8ff8c","#e6ffcc"], behavior: behaviors.LIQUID, temp: 1500, tempLow: 1405, stateLow: "uranium",
    viscosity: 8000, density: 17300, category: "liquids", state: "liquid", burn: 15, burnTime: 400, fireColor: "#99ff99",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.04 } },
    tick: function(pixel) {
        var neutronCount = countNearbyNeutrons(pixel, 2);
        if (neutronCount > 3 && Math.random() < 0.1) changePixel(pixel, "nexplosion");
    }
});

// === NEPTUNIUM ===
safeDefine("neptunium", {
    color: ["#a09891","#46413e","#28282c","#807b7b"],
    behavior: "XX|CR:radiation%1.25|XX,CR:radiation%1.25|CR:radiation%1.25 AND CR:helium%0.0005 AND CH:protactinium%0.0005|CR:radiation%1.25,XX|CR:radiation%1.25|XX",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.01 } },
    tempHigh: 912, stateHigh: "molten_neptunium", category: "solids", state: "solid", density: 20450, darkText: true, conduct: 0.15, hard: 3.2,
    tick: function(pixel) {
        if (Math.random() < 0.0001) selfHeat(pixel, 20, 10);
        var neutronCount = countNearbyNeutrons(pixel);
        if (neutronCount > 5 && Math.random() < 0.02) changePixel(pixel, "nexplosion");
    }
});

safeDefine("molten_neptunium", {
    color: ["#e6e6ff","#ccccff","#d4d4ff","#b3b3ff"], behavior: behaviors.LIQUID, temp: 1000, tempLow: 912, stateLow: "neptunium",
    viscosity: 7000, density: 19000, category: "liquids", state: "liquid", burn: 25, burnTime: 450, fireColor: "#aaaaff",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.03 }, "water": { elem1: "explosion", chance: 0.005 } },
    tick: function(pixel) {
        var neutronCount = countNearbyNeutrons(pixel);
        if (neutronCount > 4 && Math.random() < 0.05) changePixel(pixel, "nexplosion");
    }
});

// === PLUTONIUM ===
safeDefine("plutonium", {
    color: ["#8b8f8f","#6c6e70","#7e7e86","#c2c2c2"],
    behavior: "XX|CR:radiation%1.5|XX,CR:radiation%1.5|CR:radiation%1.5 AND CR:helium%0.005 AND CH:uranium%0.005|CR:radiation%1.5,XX|CR:radiation%1.5|XX",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.12 } },
    tempHigh: 912, stateHigh: "molten_plutonium", category: "solids", state: "solid", density: 19840, darkText: true, conduct: 0.18, hard: 3.5,
    tick: function(pixel) {
        if (Math.random() < 0.0002) selfHeat(pixel, 40, 20);
        emitSpontaneousNeutrons(pixel, 0.001, 1, 3);
        var neutronCount = countNearbyNeutrons(pixel);
        if (neutronCount > 2 && Math.random() < 0.15) changePixel(pixel, "nexplosion");
    }
});

safeDefine("molten_plutonium", {
    color: ["#ccffff","#aadddd","#99eeee","#bbffff"], behavior: behaviors.LIQUID, temp: 1000, tempLow: 912, stateLow: "plutonium",
    viscosity: 6500, density: 17500, category: "liquids", state: "liquid", burn: 50, burnTime: 999, fireColor: "#88ff88",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.20 }, "water": { elem1: "explosion", chance: 0.015 } },
    tick: function(pixel) {
        var neutronCount = countNearbyNeutrons(pixel, 2);
        if (neutronCount > 1 && Math.random() < 0.25) changePixel(pixel, "nexplosion");
    }
});

// === AMERICIUM ===
safeDefine("americium", {
    color: ["#a1a1a1", "#888888", "#b3b3b3", "#c4c4c4"],
    behavior: "XX|CR:radiation%2.0|XX,CR:radiation%2.0|CR:radiation%2.0 AND CR:helium%0.008 AND CH:neptunium%0.008|CR:radiation%2.0,XX|CR:radiation%2.0|XX",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.10 } },
    tempHigh: 1176, stateHigh: "molten_americium", category: "solids", state: "solid", density: 13670, darkText: true, conduct: 0.15, hard: 3,
    tick: function(pixel) {
        if (Math.random() < 0.001) selfHeat(pixel, 50, 20);
        emitSpontaneousNeutrons(pixel, 0.003, 1, 3);
        var neutronCount = countNearbyNeutrons(pixel);
        if (neutronCount > 3 && Math.random() < 0.1) changePixel(pixel, "nexplosion");
    }
});

safeDefine("molten_americium", {
    color: ["#e0e0ff","#c0c0ff","#d0d0ff","#f0f0ff"], behavior: behaviors.LIQUID, temp: 1500, tempLow: 1176, stateLow: "americium", // Fixed temp mismatch
    viscosity: 6000, density: 10500, category: "liquids", state: "liquid", burn: 35, burnTime: 550, fireColor: "#bb88ff",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.01 } }
});

// === CURIUM ===
safeDefine("curium", {
    color: ["#c5c5d0", "#a1a1aa", "#d1d1dd", "#e0e0ff"],
    behavior: "XX|CR:radiation%3.0|XX,CR:radiation%3.0|CR:radiation%3.0 AND CR:helium%0.01 AND CH:plutonium%0.005|CR:radiation%3.0,XX|CR:radiation%3.0|XX",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.15 } },
    tempHigh: 1340, stateHigh: "molten_curium", category: "solids", state: "solid", density: 13510, darkText: true, conduct: 0.20, hard: 4.5,
    tick: function(pixel) {
        if (Math.random() < 0.005) selfHeat(pixel, 60, 20);
        emitSpontaneousNeutrons(pixel, 0.008, 1, 3);
        var neutronCount = countNearbyNeutrons(pixel);
        if (neutronCount > 3 && Math.random() < 0.12) changePixel(pixel, "nexplosion");
    }
});

safeDefine("molten_curium", {
    color: ["#ffdddd","#ffbbbb","#ffcccc","#ffeeee"], behavior: behaviors.LIQUID, temp: 1700, tempLow: 1340, stateLow: "curium", // Fixed temp mismatch
    viscosity: 7000, density: 12100, category: "liquids", state: "liquid", burn: 45, burnTime: 700, fireColor: "#ff8888",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.05 }, "water": { elem1: "explosion", chance: 0.01 } }
});

// === CALIFORNIUM ===
safeDefine("californium", {
    color: ["#999999", "#888888", "#aaaaaa", "#777777"],
    behavior: "XX|CR:radiation%5.0|XX,CR:radiation%5.0|CR:radiation%5.0 AND CR:helium%0.02 AND CH:curium%0.01|CR:radiation%5.0,XX|CR:radiation%5.0|XX",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.25 } },
    tempHigh: 900, stateHigh: "molten_californium", category: "solids", state: "solid", density: 15100, darkText: true, conduct: 0.15, hard: 3,
    tick: function(pixel) {
        if (Math.random() < 0.01) selfHeat(pixel, 100, 20);
        emitSpontaneousNeutrons(pixel, 0.05, 2, 4);
        var neutronCount = countNearbyNeutrons(pixel);
        if (neutronCount > 2 && Math.random() < 0.2) changePixel(pixel, "nexplosion");
    }
});

safeDefine("molten_californium", {
    color: ["#bbbbbb", "#dddddd", "#aaaaaa"], behavior: behaviors.LIQUID, temp: 1000, tempLow: 900, stateLow: "californium",
    viscosity: 5500, density: 14000, category: "liquids", state: "liquid", burn: 60, burnTime: 999, fireColor: "#ffffff",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.35 } },
    tick: function(pixel) {
        if (Math.random() < 0.05) selfHeat(pixel, 150, 30);
        emitSpontaneousNeutrons(pixel, 0.08, 3, 5);
        var neutronCount = countNearbyNeutrons(pixel, 2);
        if (neutronCount > 1 && Math.random() < 0.30) { changePixel(pixel, "nexplosion"); }
    }
});

// === COMPOUNDS ===
safeDefine("uranium_dioxide", {
    color: ["#333333","#444444","#222222"], behavior: behaviors.POWDER, category: "powders", state: "solid", density: 10970, tempHigh: 2875, stateHigh: "molten_uranium_dioxide",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.01 } },
    tick: function(pixel) { if (Math.random() < 0.00001) selfHeat(pixel, 5, 5); var n = countNearbyNeutrons(pixel); if (n > 5 && Math.random() < 0.03) changePixel(pixel, "nexplosion"); }
});
safeDefine("molten_uranium_dioxide", { color: ["#ff6600","#ff8800","#ff4400"], behavior: behaviors.LIQUID, temp: 3000, tempLow: 2875, stateLow: "uranium_dioxide", viscosity: 10000, density: 9800 });
safeDefine("plutonium_dioxide", { color: ["#ffcc00","#ffdd00","#ffbb00"], behavior: behaviors.POWDER, category: "powders", state: "solid", density: 11460, tempHigh: 2400, stateHigh: "molten_plutonium_dioxide", reactions: { "neutron": { elem1: "nexplosion", chance: 0.08 } }, tick: function(pixel) { if (Math.random() < 0.0001) selfHeat(pixel, 10, 10); var n = countNearbyNeutrons(pixel); if (n > 3 && Math.random() < 0.1) changePixel(pixel, "nexplosion"); } });
safeDefine("molten_plutonium_dioxide", { color: ["#ffff00","#ffee00","#ffff33"], behavior: behaviors.LIQUID, temp: 2500, tempLow: 2400, stateLow: "plutonium_dioxide", viscosity: 9000, density: 10200 });

// === ORES ===
safeDefine("uraninite", { color: ["#333333","#444444","#222222","#555555"], behavior: behaviors.POWDER, category: "land", state: "solid", density: 10650, hard: 5.5, reactions: { "acid": { elem1: "uranium", chance: 0.001 } }, tempHigh: 2875, stateHigh: "molten_uraninite", tick: function(pixel) { if (Math.random() < 0.00001) createPixel("radiation", pixel.x, pixel.y); } });
safeDefine("molten_uraninite", { color: ["#ff6600","#ff8800","#ff4400","#ff5500"], behavior: behaviors.LIQUID, temp: 3000, tempLow: 2875, stateLow: "uraninite", viscosity: 10000, density: 9500, reactions: { "water": { elem1: "steam", chance: 0.1, temp1: -100 } } });
