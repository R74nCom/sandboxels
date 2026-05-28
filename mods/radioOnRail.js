// === SIMPLE & ROBUST RADIATION HELPER ===
function emitRad(pixel, chance, heat) {
    if (Math.random() < chance) {
        var rx = pixel.x + Math.floor(Math.random() * 3) - 1;
        var ry = pixel.y + Math.floor(Math.random() * 3) - 1;
        if (!outOfBounds(rx, ry) && isEmpty(rx, ry)) {
            createPixel("radiation", rx, ry);
        }
        if (heat) pixel.temp += heat; // Realistic self-heating from decay
    }
}

// === ENERGY ===
elements.nexplosion = {
    color: ["#ffff80","#ffffff","#ff8000"],
    behavior: [
        "CR:explosion%50 AND CR:radiation%100|CR:explosion%50 AND CR:radiation%100|CR:explosion%50 AND CR:radiation%100",
        "CR:explosion%50 AND CR:radiation%100|XX|CR:explosion%50 AND CR:radiation%100",
        "CR:explosion%50 AND CR:radiation%100|CR:explosion%50 AND CR:radiation%100|CR:explosion%50 AND CR:radiation%100"
    ],
    temp: 100000, category: "energy", state: "gas", density: 0.001,
    ignore: ["nexplosion","radiation","neutron"]
};

// === PURE ELEMENTS (Real-World Data) ===

// Francium (Alkali metal, melts near room temp, extremely reactive)
elements.francium = {
    color: ["#ffffff","#dddddd"], behavior: ["XX|XX|XX","XX|XX|XX","XX|XX|XX"],
    category: "solids", state: "solid", density: 2480,
    tempHigh: 27, stateHigh: "molten_francium", // Melts at 27°C
    reactions: { "water": { elem1: "explosion", chance: 0.8 }, "neutron": { elem1: "nexplosion", chance: 0.05 } },
    tick: function(pixel) {
        emitRad(pixel, 0.4, 20); // Extremely high specific activity
        if (Math.random() < 0.001) changePixel(pixel, "radium"); // Fr-223 beta decays to Ra-223
    }
};
elements.molten_francium = { 
    color: ["#eeeeee","#cccccc"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 2200, 
    tempLow: 27, stateLow: "francium",
    reactions: { "water": { elem1: "explosion", chance: 1.0 } },
    tick: function(pixel) { emitRad(pixel, 0.4, 20); }
};

// Technetium (First artificial element, transition metal)
elements.technetium = {
    color: ["#a0a0a0","#808080"], behavior: ["XX|XX|XX","XX|XX|XX","XX|XX|XX"],
    category: "solids", state: "solid", density: 11500,
    tempHigh: 2157, stateHigh: "molten_technetium",
    tick: function(pixel) { emitRad(pixel, 0.02, 1); } // Tc-99 is a beta emitter, low heat
};
elements.molten_technetium = { 
    color: ["#dddddd","#bbbbbb"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 10300, 
    tempLow: 2157, stateLow: "technetium",
    tick: function(pixel) { emitRad(pixel, 0.02, 1); }
};

// Radium (Alkaline earth, glows blue/green due to radioluminescence)
elements.radium = {
    color: ["#ccffcc","#aaffaa"], behavior: ["XX|XX|XX","XX|XX|XX","XX|XX|XX"],
    category: "solids", state: "solid", density: 5500,
    tempHigh: 700, stateHigh: "molten_radium",
    tick: function(pixel) {
        emitRad(pixel, 0.15, 5);
        if (Math.random() < 0.0005) changePixel(pixel, "radon"); // Ra-226 alpha decays to Rn-222
    }
};
elements.molten_radium = { 
    color: ["#ddffdd","#bbffbb"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 5000, 
    tempLow: 700, stateLow: "radium",
    tick: function(pixel) { emitRad(pixel, 0.15, 5); }
};

// Radon (Heavy noble gas, sinks in real life but uses GAS behavior to move)
elements.radon = {
    color: ["#ccff99","#aaff88"], behavior: behaviors.GAS, // FIXES THE STATIC BUG
    category: "gases", state: "gas", density: 9.73,
    temp: 20, tempLow: -61.7, stateLow: "liquid_radon",
    tick: function(pixel) {
        emitRad(pixel, 0.3, 10); // High radiation
        if (Math.random() < 0.005) changePixel(pixel, "polonium_dust"); // Rn-222 alpha decays to Po-218 (solid dust)
    }
};
elements.liquid_radon = {
    color: ["#aaff88","#88ff66"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 2000,
    tempHigh: -61.7, stateHigh: "radon",
    tick: function(pixel) { emitRad(pixel, 0.3, 10); }
};

// Polonium (Extreme alpha emitter, massive heat generation)
elements.polonium_dust = {
    color: ["#ffcccc","#ffaaaa"], behavior: behaviors.POWDER,
    category: "powders", state: "solid", density: 9196,
    tempHigh: 254, stateHigh: "molten_polonium",
    tick: function(pixel) {
        emitRad(pixel, 0.6, 50); // Po-210 generates massive heat (used in RTGs)
        if (Math.random() < 0.002) changePixel(pixel, "lead"); // Po-210 alpha decays to stable Pb-206
    }
};
elements.molten_polonium = { 
    color: ["#ff8888","#ff6666"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 8200, 
    tempLow: 254, stateLow: "polonium_dust",
    tick: function(pixel) { emitRad(pixel, 0.6, 50); }
};

// Actinium (Glows blue in the dark)
elements.actinium = {
    color: ["#a0a0ff","#8080ff"], behavior: ["XX|XX|XX","XX|XX|XX","XX|XX|XX"],
    category: "solids", state: "solid", density: 10070,
    tempHigh: 1050, stateHigh: "molten_actinium",
    tick: function(pixel) {
        emitRad(pixel, 0.1, 3);
        if (Math.random() < 0.0003) changePixel(pixel, "thorium"); // Ac-227 decays to Th-227
    }
};
elements.molten_actinium = { 
    color: ["#ccccff","#aaaaff"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 9000, 
    tempLow: 1050, stateLow: "actinium",
    tick: function(pixel) { emitRad(pixel, 0.1, 3); }
};

// Thorium (Fertile, very long half-life)
elements.thorium = {
    color: ["#a0a0a0","#808080"], behavior: ["XX|XX|XX","XX|XX|XX","XX|XX|XX"],
    category: "solids", state: "solid", density: 11724,
    tempHigh: 1750, stateHigh: "molten_thorium",
    reactions: { "neutron": { elem1: "protactinium", chance: 0.2 } }, // Breeds Pa-233
    tick: function(pixel) {
        emitRad(pixel, 0.01, 0.5); // Very low specific activity (14B year half-life)
        if (Math.random() < 0.00001) changePixel(pixel, "radium"); // Th-232 decay chain
    }
};
elements.molten_thorium = { 
    color: ["#dddddd","#bbbbbb"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 10500, 
    tempLow: 1750, stateLow: "thorium",
    reactions: { "neutron": { elem1: "protactinium", chance: 0.3 } },
    tick: function(pixel) { emitRad(pixel, 0.01, 0.5); }
};

// Protactinium
elements.protactinium = {
    color: ["#b0b0b0","#909090"], behavior: ["XX|XX|XX","XX|XX|XX","XX|XX|XX"],
    category: "solids", state: "solid", density: 15370,
    tempHigh: 1568, stateHigh: "molten_protactinium",
    reactions: { "neutron": { elem1: "uranium", chance: 0.15 } }, // Breeds U-233
    tick: function(pixel) {
        emitRad(pixel, 0.05, 2);
        if (Math.random() < 0.0002) changePixel(pixel, "actinium"); // Pa-231 alpha decays to Ac-227
    }
};
elements.molten_protactinium = { 
    color: ["#e0e0e0","#c0c0c0"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 13800, 
    tempLow: 1568, stateLow: "protactinium",
    tick: function(pixel) { emitRad(pixel, 0.05, 2); }
};

// Uranium (Fissile U-235, Fertile U-238)
elements.uranium = {
    color: ["#9ea190","#676d68"], behavior: ["XX|XX|XX","XX|XX|XX","XX|XX|XX"],
    category: "solids", state: "solid", density: 19050,
    tempHigh: 1132, stateHigh: "molten_uranium",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.3 } }, // Fission
    tick: function(pixel) {
        emitRad(pixel, 0.03, 1);
        if (Math.random() < 0.00005) changePixel(pixel, "thorium"); // U-238 alpha decays to Th-234
        if (Math.random() < 0.000005) { // Spontaneous fission
            var rx = pixel.x + Math.floor(Math.random()*3)-1;
            var ry = pixel.y + Math.floor(Math.random()*3)-1;
            if (isEmpty(rx, ry)) createPixel("neutron", rx, ry);
        }
    }
};
elements.molten_uranium = { 
    color: ["#d4ffaa","#b8ff8c"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 17300, 
    tempLow: 1132, stateLow: "uranium",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.5 } },
    tick: function(pixel) { emitRad(pixel, 0.03, 1); }
};

// Neptunium
elements.neptunium = {
    color: ["#a09891","#46413e"], behavior: ["XX|XX|XX","XX|XX|XX","XX|XX|XX"],
    category: "solids", state: "solid", density: 20450,
    tempHigh: 644, stateHigh: "molten_neptunium",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.2 } },
    tick: function(pixel) {
        emitRad(pixel, 0.08, 3);
        if (Math.random() < 0.0001) changePixel(pixel, "plutonium"); // Np-237 captures neutron/beta decays
    }
};
elements.molten_neptunium = { 
    color: ["#e6e6ff","#ccccff"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 19000, 
    tempLow: 644, stateLow: "neptunium",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.4 } },
    tick: function(pixel) { emitRad(pixel, 0.08, 3); }
};

// Plutonium (Warm to touch, highly fissile)
elements.plutonium = {
    color: ["#8b8f8f","#6c6e70"], behavior: ["XX|XX|XX","XX|XX|XX","XX|XX|XX"],
    category: "solids", state: "solid", density: 19816,
    tempHigh: 640, stateHigh: "molten_plutonium",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.5 } }, // Highly fissile
    tick: function(pixel) {
        emitRad(pixel, 0.12, 8); // Pu-238/239 generates significant heat
        if (Math.random() < 0.0001) changePixel(pixel, "uranium"); // Pu-239 alpha decays to U-235
    }
};
elements.molten_plutonium = { 
    color: ["#ccffff","#aadddd"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 17500, 
    tempLow: 640, stateLow: "plutonium",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.8 } },
    tick: function(pixel) { emitRad(pixel, 0.12, 8); }
};

// Americium (Used in smoke detectors)
elements.americium = {
    color: ["#a1a1a1", "#888888"], behavior: ["XX|XX|XX","XX|XX|XX","XX|XX|XX"],
    category: "solids", state: "solid", density: 13670,
    tempHigh: 1176, stateHigh: "molten_americium",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.25 } },
    tick: function(pixel) {
        emitRad(pixel, 0.15, 5);
        if (Math.random() < 0.0002) changePixel(pixel, "neptunium"); // Am-241 alpha decays to Np-237
    }
};
elements.molten_americium = { 
    color: ["#e0e0ff","#c0c0ff"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 10500, 
    tempLow: 1176, stateLow: "americium",
    tick: function(pixel) { emitRad(pixel, 0.15, 5); }
};

// Curium (Glows red/purple, high heat)
elements.curium = {
    color: ["#c5c5d0", "#a1a1aa"], behavior: ["XX|XX|XX","XX|XX|XX","XX|XX|XX"],
    category: "solids", state: "solid", density: 13510,
    tempHigh: 1340, stateHigh: "molten_curium",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.4 } },
    tick: function(pixel) {
        emitRad(pixel, 0.25, 15); // Cm-244 is a strong heat source
        if (Math.random() < 0.0003) changePixel(pixel, "plutonium"); // Cm-244 alpha decays to Pu-240
    }
};
elements.molten_curium = { 
    color: ["#ffdddd","#ffbbbb"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 12100, 
    tempLow: 1340, stateLow: "curium",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.6 } },
    tick: function(pixel) { emitRad(pixel, 0.25, 15); }
};

// Californium (Extreme neutron emitter, spontaneous fission)
elements.californium = {
    color: ["#999999", "#888888"], behavior: ["XX|XX|XX","XX|XX|XX","XX|XX|XX"],
    category: "solids", state: "solid", density: 15100,
    tempHigh: 900, stateHigh: "molten_californium",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.7 } },
    tick: function(pixel) {
        emitRad(pixel, 0.4, 30); // Cf-252 generates massive heat
        if (Math.random() < 0.0005) changePixel(pixel, "curium"); // Cf-252 alpha decays to Cm-248
        // Spontaneous fission (Cf-252 is a primary neutron source)
        if (Math.random() < 0.005) {
            var rx = pixel.x + Math.floor(Math.random()*3)-1;
            var ry = pixel.y + Math.floor(Math.random()*3)-1;
            if (isEmpty(rx, ry)) createPixel("neutron", rx, ry);
        }
    }
};
elements.molten_californium = { 
    color: ["#bbbbbb", "#dddddd"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 14000, 
    tempLow: 900, stateLow: "californium",
    reactions: { "neutron": { elem1: "nexplosion", chance: 0.9 } },
    tick: function(pixel) { 
        emitRad(pixel, 0.4, 30); 
        if (Math.random() < 0.01) {
            var rx = pixel.x + Math.floor(Math.random()*3)-1;
            var ry = pixel.y + Math.floor(Math.random()*3)-1;
            if (isEmpty(rx, ry)) createPixel("neutron", rx, ry);
        }
    }
};

// === COMPOUNDS (Dioxides & Salts) ===
elements.uranium_dioxide = { color: ["#333","#444"], behavior: behaviors.POWDER, category: "powders", state: "solid", density: 10970, tempHigh: 2875, stateHigh: "molten_uranium_dioxide", reactions: {"neutron": {elem1:"nexplosion", chance:0.1}}, tick: function(p){ emitRad(p, 0.02, 0.5); } };
elements.molten_uranium_dioxide = { color: ["#f60","#f80"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 9800, tempLow: 2875, stateLow: "uranium_dioxide", tick: function(p){ emitRad(p, 0.02, 0.5); } };

elements.plutonium_dioxide = { color: ["#fc0","#fd0"], behavior: behaviors.POWDER, category: "powders", state: "solid", density: 11460, tempHigh: 2400, stateHigh: "molten_plutonium_dioxide", reactions: {"neutron": {elem1:"nexplosion", chance:0.2}}, tick: function(p){ emitRad(p, 0.1, 5); } };
elements.molten_plutonium_dioxide = { color: ["#ff0","#fe0"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 10200, tempLow: 2400, stateLow: "plutonium_dioxide", tick: function(p){ emitRad(p, 0.1, 5); } };

elements.thorium_dioxide = { color: ["#fff","#eee"], behavior: behaviors.POWDER, category: "powders", state: "solid", density: 10000, tempHigh: 3390, stateHigh: "molten_thorium_dioxide", tick: function(p){ emitRad(p, 0.005, 0.1); } };
elements.molten_thorium_dioxide = { color: ["#ffc","#ffd"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 9000, tempLow: 3390, stateLow: "thorium_dioxide", tick: function(p){ emitRad(p, 0.005, 0.1); } };

elements.polonium_dioxide = { color: ["#f00","#e00"], behavior: behaviors.POWDER, category: "powders", state: "solid", density: 8900, tempHigh: 600, stateHigh: "molten_polonium", tick: function(p){ emitRad(p, 0.5, 40); } };
elements.radium_chloride = { color: ["#fff","#eee"], behavior: behaviors.POWDER, category: "powders", state: "solid", density: 5010, tempHigh: 1000, stateHigh: "molten_radium_chloride", tick: function(p){ emitRad(p, 0.1, 3); } };
elements.molten_radium_chloride = { color: ["#ff9","#ffa"], behavior: behaviors.LIQUID, category: "liquids", state: "liquid", density: 4500, tempLow: 1000, stateLow: "radium_chloride", tick: function(p){ emitRad(p, 0.1, 3); } };

// === ORES (Natural deposits) ===
elements.uraninite = { color: ["#333","#222"], behavior: behaviors.POWDER, category: "land", state: "solid", density: 10650, reactions: {"acid": {elem1:"uranium", chance:0.01}}, tick: function(p){ emitRad(p, 0.01, 0.2); } };
elements.carnotite = { color: ["#ff0","#fe0"], behavior: behaviors.POWDER, category: "land", state: "solid", density: 4300, reactions: {"acid": {elem1:"uranium", chance:0.008}}, tick: function(p){ emitRad(p, 0.008, 0.1); } };
elements.autunite = { color: ["#cf0","#bf0"], behavior: behaviors.POWDER, category: "land", state: "solid", density: 3200, reactions: {"acid": {elem1:"uranium", chance:0.006}}, tick: function(p){ emitRad(p, 0.008, 0.1); } };
elements.torbernite = { color: ["#0f0","#0e0"], behavior: behaviors.POWDER, category: "land", state: "solid", density: 3500, reactions: {"acid": {elem1:"uranium", chance:0.007}}, tick: function(p){ emitRad(p, 0.008, 0.1); } };
elements.monazite = { color: ["#c90","#a80"], behavior: behaviors.POWDER, category: "land", state: "solid", density: 5200, reactions: {"acid": {elem1:"thorium", chance:0.005}}, tick: function(p){ emitRad(p, 0.005, 0.05); } };
elements.thorianite = { color: ["#222","#111"], behavior: behaviors.POWDER, category: "land", state: "solid", density: 9800, reactions: {"acid": {elem1:"thorium", chance:0.004}}, tick: function(p){ emitRad(p, 0.005, 0.05); } };
