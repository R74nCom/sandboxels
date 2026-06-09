// metalOnRail.js - Sandboxels mod adding realistic metals not in the original game
// Includes transition metals like chromium, cobalt, manganese, molybdenum, niobium, palladium, rhenium, rhodium, ruthenium, tantalum, vanadium, zirconium, and others like beryllium, cadmium, gallium, indium, osmium, iridium
// Each with solid, liquid, and vapor states where applicable, accurate melting/boiling points, densities, colors, conductivity, hardness, heat conductivity
// Behaviors: Solids are static (WALL-like), liquids flow, vapors are gas
// Added heatConduct for thermal conductivity (normalized 0-1, relative to silver ~1)
// Added reactions for some (e.g., oxidation at high temp, water for toxic metals)
// Added toxic reactions: cadmium/beryllium with water create dirty_water
// Added custom alloys via reactions between molten metals (e.g., molten_iron + molten_chromium = stainless_steel)
// Alloys have their own properties, solid/liquid/vapor
// No radiation for these non-radioactive metals
// Added more substances like carbides, chlorides, oxides
// Chemical reactions added for realism: oxidation, reaction with water/acid/halogens where applicable
// Place in Sandboxels mods folder or paste in mod box


elements.chromium = {
    name: "chromium",
    color: ["#a0a0a0","#b0b0b0","#909090","#c0c0c0"],  // silvery-white
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 7140,
    conduct: 0.22,
    heatConduct: 0.22,  // 93.7 W/mK / 429 ~0.22
    hard: 8.5,  // Mohs
    tempHigh: 2180,  // 1907°C
    stateHigh: "molten_chromium",
    reactions: {
        "oxygen": { elem1: "chromium_oxide", tempMin: 500, chance: 0.01 },  // forms protective oxide
        "molten_iron": { elem1: "stainless_steel", elem2: null, chance: 0.5, tempMin: 1700 },  // alloy with iron (needs heat)
        "chlorine": { elem1: "chromium_chloride", chance: 0.2, tempMin: 300 }  // reacts with halogens
    }
};

elements.molten_chromium = {
    name: "molten chromium",
    color: ["#ffcc99","#ffddaa","#ffbb88","#ffaa77"],  // orange-glow
    behavior: behaviors.LIQUID,
    temp: 2200,
    tempLow: 2180,
    stateLow: "chromium",
    tempHigh: 2945,  // 2672°C
    stateHigh: "chromium_vapor",
    viscosity: 5000,
    density: 6300,
    category: "liquids",
    state: "liquid",
    conduct: 0.15,
    heatConduct: 0.15,
    reactions: {
        "molten_cobalt": { elem1: "cobalt_chrome", elem2: null, chance: 0.6 },  // Co-Cr alloy
        "molten_iron": { elem1: "stainless_steel", elem2: null, chance: 0.7 },
        "carbon": { elem1: "chromium_carbide", chance: 0.1, tempMin: 2000 },  // forms carbide at high temp
        "acid": { elem1: "chromium_solution", chance: 0.3 }  // dissolves in acid
    }
};

elements.chromium_vapor = {
    name: "chromium vapor",
    color: ["#ffffff","#eeeeee","#dddddd"],  // white hot gas
    behavior: behaviors.GAS,
    temp: 3000,
    tempLow: 2945,
    stateLow: "molten_chromium",
    density: 0.01,
    category: "gases",
    state: "gas",
    hidden: true
};

elements.chromium_oxide = {
    name: "chromium oxide",
    color: ["#00ff00","#00ee00","#00cc00"],  // green Cr2O3
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 5210,
    hard: 8.5,
    tempHigh: 2708,  // 2435°C
    stateHigh: "molten_chromium_oxide",
    reactions: {
        "acid": { elem1: "chromium_solution", chance: 0.1 }  // dissolves in strong acids
    }
};

elements.molten_chromium_oxide = {
    name: "molten chromium oxide",
    color: ["#66ff66","#55ff55","#44ff44"],
    behavior: behaviors.LIQUID,
    temp: 2750,
    tempLow: 2708,
    stateLow: "chromium_oxide",
    viscosity: 8000,
    density: 4600
};

elements.chromium_carbide = {
    name: "chromium carbide",
    color: ["#555555","#666666","#444444"],  // dark gray
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 6660,
    hard: 9.5,
    tempHigh: 2168,  // 1895°C
    stateHigh: "molten_chromium_carbide",
    reactions: {
        "oxygen": { elem1: "chromium_oxide", elem2: "carbon_dioxide", chance: 0.05, tempMin: 1000 }
    }
};

elements.molten_chromium_carbide = {
    name: "molten chromium carbide",
    color: ["#ff8800","#ff9900","#ff7700"],
    behavior: behaviors.LIQUID,
    temp: 2200,
    tempLow: 2168,
    stateLow: "chromium_carbide",
    viscosity: 9000,
    density: 6000
};

elements.chromium_chloride = {
    name: "chromium chloride",
    color: ["#008800","#009900","#007700"],  // green CrCl3
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 2870,
    tempHigh: 1423,  // 1150°C sublimes
    stateHigh: "chromium_vapor",  // sublimes/decomposes
    reactions: {
        "water": { elem1: null, elem2: "chromium_solution", chance: 0.5 }  // hydrates/dissolves
    }
};

elements.chromium_solution = {
    name: "chromium solution",
    color: ["#00aa00","#00bb00","#009900"],  // green aqueous
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1050,
    viscosity: 1000
};

elements.cobalt = {
    name: "cobalt",
    color: ["#8b8b8b","#9b9b9b","#7b7b7b","#ababab"],  // grayish
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 8900,
    conduct: 0.17,
    heatConduct: 0.23,  // 100 W/mK / 429 ~0.23
    hard: 5,
    tempHigh: 1768,  // 1495°C
    stateHigh: "molten_cobalt",
    reactions: {
        "chlorine": { elem1: "cobalt_chloride", chance: 0.2, tempMin: 300 }
    }
};

elements.molten_cobalt = {
    name: "molten cobalt",
    color: ["#ff9999","#ffaaaa","#ff8888","#ffbbbb"],
    behavior: behaviors.LIQUID,
    temp: 1800,
    tempLow: 1768,
    stateLow: "cobalt",
    tempHigh: 3200,  // 2927°C
    stateHigh: "cobalt_vapor",
    viscosity: 4500,
    density: 7800,
    category: "liquids",
    state: "liquid",
    conduct: 0.12,
    heatConduct: 0.16,
    reactions: {
        "molten_chromium": { elem1: "cobalt_chrome", elem2: null, chance: 0.6 },
        "molten_molybdenum": { elem1: "stellite", elem2: null, chance: 0.3 },
        "acid": { elem1: "cobalt_solution", chance: 0.4 }
    }
};

elements.cobalt_vapor = {
    name: "cobalt vapor",
    color: ["#ffcccc","#ffbbbb","#ffdddd"],
    behavior: behaviors.GAS,
    temp: 3250,
    tempLow: 3200,
    stateLow: "molten_cobalt",
    density: 0.01,
    category: "gases",
    state: "gas",
    hidden: true
};

elements.cobalt_chloride = {
    name: "cobalt chloride",
    color: ["#0000ff","#0000ee","#0000cc"],  // blue
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 3360,
    tempHigh: 1013,  // 740°C
    stateHigh: "molten_cobalt_chloride",
    reactions: {
        "water": { elem1: null, elem2: "cobalt_solution" }  // dissolves
    }
};

elements.molten_cobalt_chloride = {
    name: "molten cobalt chloride",
    color: ["#6666ff","#5555ff","#7777ff"],
    behavior: behaviors.LIQUID,
    temp: 1050,
    tempLow: 1013,
    stateLow: "cobalt_chloride",
    viscosity: 4000,
    density: 3000
};

elements.cobalt_solution = {
    name: "cobalt solution",
    color: ["#0000aa","#000099","#0000bb"],  // dark blue
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1050,
    viscosity: 1000
};

elements.manganese = {
    name: "manganese",
    color: ["#9c9c9c","#acacac","#8c8c8c","#bcbcbc"],  // silvery-gray
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 7210,
    conduct: 0.078,
    heatConduct: 0.018,  // 7.81 W/mK / 429 ~0.018
    hard: 6,
    tempHigh: 1519,  // 1246°C
    stateHigh: "molten_manganese",
    reactions: {
        "oxygen": { elem1: "manganese_oxide", tempMin: 400, chance: 0.02 }
    }
};

elements.molten_manganese = {
    name: "molten manganese",
    color: ["#ffcc66","#ffdd77","#ffbb55","#ffaa44"],
    behavior: behaviors.LIQUID,
    temp: 1550,
    tempLow: 1519,
    stateLow: "manganese",
    tempHigh: 2335,  // 2062°C
    stateHigh: "manganese_vapor",
    viscosity: 6000,
    density: 6600,
    category: "liquids",
    state: "liquid",
    conduct: 0.05,
    heatConduct: 0.01,
    reactions: {
        "molten_iron": { elem1: "hadfield_steel", elem2: null, chance: 0.4 },  // high-manganese steel
        "carbon": { elem1: "manganese_carbide", chance: 0.1, tempMin: 1500 }
    }
};

elements.manganese_vapor = {
    name: "manganese vapor",
    color: ["#ffeecc","#ffffdd","#ffccbb"],
    behavior: behaviors.GAS,
    temp: 2350,
    tempLow: 2335,
    stateLow: "molten_manganese",
    density: 0.01,
    category: "gases",
    state: "gas",
    hidden: true
};

elements.manganese_oxide = {
    name: "manganese oxide",
    color: ["#000000","#111111","#222222"],  // black MnO2
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 5026,
    tempHigh: 807,  // 534°C decomposes
    stateHigh: "manganese",  // decomposes to Mn
    reactions: {
        "acid": { elem1: "manganese_solution", chance: 0.2 }
    }
};

elements.manganese_solution = {
    name: "manganese solution",
    color: ["#aa00aa","#990099","#bb00bb"],  // purple-ish
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1050,
    viscosity: 1000
};

elements.manganese_carbide = {
    name: "manganese carbide",
    color: ["#444444","#555555","#333333"],  // dark gray
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 5600,
    hard: 8,
    tempHigh: 1800,
    stateHigh: "molten_manganese_carbide"
};

elements.molten_manganese_carbide = {
    name: "molten manganese carbide",
    color: ["#ff9933","#ffaa44","#ff8822"],
    behavior: behaviors.LIQUID,
    temp: 1850,
    tempLow: 1800,
    stateLow: "manganese_carbide",
    viscosity: 7000,
    density: 5000
};

elements.molybdenum = {
    name: "molybdenum",
    color: ["#a8a8a8","#b8b8b8","#989898","#c8c8c8"],  // gray
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 10220,
    conduct: 0.2,
    heatConduct: 0.32,  // 138 W/mK / 429 ~0.32
    hard: 5.5,
    tempHigh: 2896,  // 2623°C
    stateHigh: "molten_molybdenum",
    reactions: {
        "sulfur": { elem1: "molybdenum_disulfide", tempMin: 500, chance: 0.01 }
    }
};

elements.molten_molybdenum = {
    name: "molten molybdenum",
    color: ["#ffff99","#ffffaa","#ffff88","#ffffbb"],
    behavior: behaviors.LIQUID,
    temp: 2950,
    tempLow: 2896,
    stateLow: "molybdenum",
    tempHigh: 4912,  // 4639°C
    stateHigh: "molybdenum_vapor",
    viscosity: 7000,
    density: 9300,
    category: "liquids",
    state: "liquid",
    conduct: 0.15,
    heatConduct: 0.25,
    reactions: {
        "molten_cobalt": { elem1: "stellite", elem2: null, chance: 0.3 },  // Co-Cr-Mo alloy, simplified
        "molten_nickel": { elem1: "hastelloy", elem2: null, chance: 0.4 }
    }
};

elements.molybdenum_vapor = {
    name: "molybdenum vapor",
    color: ["#ffffff","#eeeeee","#dddddd"],
    behavior: behaviors.GAS,
    temp: 4950,
    tempLow: 4912,
    stateLow: "molten_molybdenum",
    density: 0.01,
    category: "gases",
    state: "gas",
    hidden: true
};

elements.molybdenum_disulfide = {
    name: "molybdenum disulfide",
    color: ["#333333","#444444","#222222"],  // black-gray lubricant
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 5060,
    hard: 1.5,
    tempHigh: 1458,  // 1185°C decomposes
    stateHigh: "molybdenum",  // decomposes
    reactions: {
        "oxygen": { elem1: "molybdenum_trioxide", elem2: "sulfur_dioxide", chance: 0.05, tempMin: 800 }
    }
};

elements.molybdenum_trioxide = {
    name: "molybdenum trioxide",
    color: ["#ffffff","#eeeeee","#dddddd"],  // white/yellow
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 4690,
    tempHigh: 1068,  // 795°C
    stateHigh: "molten_molybdenum_trioxide"
};

elements.molten_molybdenum_trioxide = {
    name: "molten molybdenum trioxide",
    color: ["#ffffcc","#ffffdd","#ffffbb"],
    behavior: behaviors.LIQUID,
    temp: 1100,
    tempLow: 1068,
    stateLow: "molybdenum_trioxide",
    viscosity: 5000,
    density: 4200
};

elements.niobium = {
    name: "niobium",
    color: ["#b0b0b0","#c0c0c0","#a0a0a0","#d0d0d0"],  // gray-white
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 8570,
    conduct: 0.13,
    heatConduct: 0.12,  // 53.7 W/mK / 429 ~0.12
    hard: 6,
    tempHigh: 2750,  // 2477°C
    stateHigh: "molten_niobium",
    reactions: {
        "carbon": { elem1: "niobium_carbide", tempMin: 2000, chance: 0.05 }
    }
};

elements.molten_niobium = {
    name: "molten niobium",
    color: ["#ffeecc","#ffffdd","#ffddbb","#ffffee"],
    behavior: behaviors.LIQUID,
    temp: 2800,
    tempLow: 2750,
    stateLow: "niobium",
    tempHigh: 5017,  // 4744°C
    stateHigh: "niobium_vapor",
    viscosity: 6500,
    density: 7700,
    category: "liquids",
    state: "liquid",
    conduct: 0.1,
    heatConduct: 0.1,
    reactions: {
        "molten_titanium": { elem1: "niobium_titanium", elem2: null, chance: 0.5 },  // Nb-Ti superconductor alloy
        "molten_tantalum": { elem1: "niobium_tantalum", elem2: null, chance: 0.4 }
    }
};

elements.niobium_vapor = {
    name: "niobium vapor",
    color: ["#ffffff","#eeeeee"],
    behavior: behaviors.GAS,
    temp: 5050,
    tempLow: 5017,
    stateLow: "molten_niobium",
    density: 0.01,
    category: "gases",
    state: "gas",
    hidden: true
};

elements.niobium_carbide = {
    name: "niobium carbide",
    color: ["#555555","#666666","#444444"],  // gray
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 7820,
    hard: 9,
    tempHigh: 3883,  // 3610°C
    stateHigh: "molten_niobium_carbide",
    reactions: {
        "oxygen": { elem1: "niobium_oxide", elem2: "carbon_dioxide", chance: 0.02, tempMin: 1500 }
    }
};

elements.molten_niobium_carbide = {
    name: "molten niobium carbide",
    color: ["#ff9933","#ffaa44","#ff8822"],
    behavior: behaviors.LIQUID,
    temp: 3900,
    tempLow: 3883,
    stateLow: "niobium_carbide",
    viscosity: 8500,
    density: 7000
};

elements.niobium_oxide = {
    name: "niobium oxide",
    color: ["#ffffff","#eeeeee","#dddddd"],  // white Nb2O5
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 4550,
    tempHigh: 1785,  // 1512°C
    stateHigh: "molten_niobium_oxide"
};

elements.molten_niobium_oxide = {
    name: "molten niobium oxide",
    color: ["#ffffcc","#ffffdd","#ffffbb"],
    behavior: behaviors.LIQUID,
    temp: 1800,
    tempLow: 1785,
    stateLow: "niobium_oxide",
    viscosity: 9000,
    density: 4100
};

elements.palladium = {
    name: "palladium",
    color: ["#c0c0c0","#d0d0d0","#b0b0b0","#e0e0e0"],  // silvery-white
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 12020,
    conduct: 0.11,
    heatConduct: 0.17,  // 71.8 W/mK / 429 ~0.17
    hard: 4.75,
    tempHigh: 1828,  // 1555°C
    stateHigh: "molten_palladium",
    reactions: {
        "chlorine": { elem1: "palladium_chloride", chance: 0.15, tempMin: 200 }
    }
};

elements.molten_palladium = {
    name: "molten palladium",
    color: ["#ffddcc","#ffeebb","#ffccaa","#ffffdd"],
    behavior: behaviors.LIQUID,
    temp: 1850,
    tempLow: 1828,
    stateLow: "palladium",
    tempHigh: 3236,  // 2963°C
    stateHigh: "palladium_vapor",
    viscosity: 5500,
    density: 10800,
    category: "liquids",
    state: "liquid",
    conduct: 0.08,
    heatConduct: 0.12,
    reactions: {
        "molten_gold": { elem1: "white_gold", elem2: null, chance: 0.5 }  // Pd-Au alloy
    }
};

elements.palladium_vapor = {
    name: "palladium vapor",
    color: ["#ffeeee","#ffdddd"],
    behavior: behaviors.GAS,
    temp: 3250,
    tempLow: 3236,
    stateLow: "molten_palladium",
    density: 0.01,
    category: "gases",
    state: "gas",
    hidden: true
};

elements.palladium_chloride = {
    name: "palladium chloride",
    color: ["#ff0000","#ee0000","#cc0000"],  // red-brown
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 4000,
    tempHigh: 952,  // 679°C decomposes
    stateHigh: "palladium",  // decomposes
    reactions: {
        "water": { elem1: null, elem2: "palladium_solution", chance: 0.3 }
    }
};

elements.palladium_solution = {
    name: "palladium solution",
    color: ["#aa0000","#990000","#bb0000"],  // dark red
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1050,
    viscosity: 1000
};

elements.white_gold = {
    name: "white gold",
    color: ["#eeeeee","#dddddd","#ffffff"],  // pale yellow-white
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 16000,
    conduct: 0.25,
    heatConduct: 0.3,
    hard: 4,
    tempHigh: 1300,
    stateHigh: "molten_white_gold"
};

elements.molten_white_gold = {
    name: "molten white gold",
    color: ["#ffffcc","#ffffdd","#ffffbb"],
    behavior: behaviors.LIQUID,
    temp: 1350,
    tempLow: 1300,
    stateLow: "white_gold",
    viscosity: 5000,
    density: 14400,
    category: "liquids",
    state: "liquid"
};

elements.rhenium = {
    name: "rhenium",
    color: ["#a5a5a5","#b5b5b5","#959595","#c5c5c5"],  // grayish
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 21020,
    conduct: 0.18,
    heatConduct: 0.11,  // 47.9 W/mK / 429 ~0.11
    hard: 7,
    tempHigh: 3459,  // 3186°C
    stateHigh: "molten_rhenium",
    reactions: {
        "oxygen": { elem1: "rhenium_trioxide", tempMin: 400, chance: 0.02 }
    }
};

elements.molten_rhenium = {
    name: "molten rhenium",
    color: ["#ffffcc","#ffffdd","#ffffbb","#ffffee"],
    behavior: behaviors.LIQUID,
    temp: 3500,
    tempLow: 3459,
    stateLow: "rhenium",
    tempHigh: 5869,  // 5596°C
    stateHigh: "rhenium_vapor",
    viscosity: 8000,
    density: 18900,
    category: "liquids",
    state: "liquid",
    conduct: 0.12,
    heatConduct: 0.09,
    reactions: {
        "molten_tungsten": { elem1: "rhenium_tungsten", elem2: null, chance: 0.4 }  // Re-W alloy for high temp
    }
};

elements.rhenium_vapor = {
    name: "rhenium vapor",
    color: ["#ffffff","#eeeeee"],
    behavior: behaviors.GAS,
    temp: 5900,
    tempLow: 5869,
    stateLow: "molten_rhenium",
    density: 0.01,
    category: "gases",
    state: "gas",
    hidden: true
};

elements.rhenium_trioxide = {
    name: "rhenium trioxide",
    color: ["#ff0000","#ee0000","#dd0000"],  // red
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 6900,
    tempHigh: 673,  // 400°C decomposes
    stateHigh: "rhenium",  // decomposes
    reactions: {
        "acid": { elem1: "rhenium_solution", chance: 0.1 }
    }
};

elements.rhenium_solution = {
    name: "rhenium solution",
    color: ["#aa0000","#990000","#bb0000"],  // dark red
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1050,
    viscosity: 1000
};

elements.rhenium_tungsten = {
    name: "rhenium tungsten",
    color: ["#808080","#909090","#707070"],  // gray
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 20000,
    conduct: 0.15,
    heatConduct: 0.2,
    hard: 8,
    tempHigh: 3500,
    stateHigh: "molten_rhenium_tungsten"
};

elements.molten_rhenium_tungsten = {
    name: "molten rhenium tungsten",
    color: ["#ffff99","#ffffaa","#ffff88"],
    behavior: behaviors.LIQUID,
    temp: 3550,
    tempLow: 3500,
    stateLow: "rhenium_tungsten",
    viscosity: 9000,
    density: 18000,
    category: "liquids",
    state: "liquid"
};

elements.rhodium = {
    name: "rhodium",
    color: ["#d0d0d0","#e0e0e0","#c0c0c0","#f0f0f0"],  // silvery-white
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 12410,
    conduct: 0.24,
    heatConduct: 0.35,  // 150 W/mK / 429 ~0.35
    hard: 6,
    tempHigh: 2237,  // 1964°C
    stateHigh: "molten_rhodium",
    reactions: {
        "oxygen": { elem1: "rhodium_oxide", tempMin: 600, chance: 0.01 }
    }
};

elements.molten_rhodium = {
    name: "molten rhodium",
    color: ["#ffeedd","#ffffcc","#ffddbb","#ffffee"],
    behavior: behaviors.LIQUID,
    temp: 2300,
    tempLow: 2237,
    stateLow: "rhodium",
    tempHigh: 3968,  // 3695°C
    stateHigh: "rhodium_vapor",
    viscosity: 6000,
    density: 11100,
    category: "liquids",
    state: "liquid",
    conduct: 0.18,
    heatConduct: 0.28,
    reactions: {
        "molten_platinum": { elem1: "platinum_rhodium", elem2: null, chance: 0.5 }  // Pt-Rh alloy for thermocouples
    }
};

elements.rhodium_vapor = {
    name: "rhodium vapor",
    color: ["#ffffff","#eeeeee"],
    behavior: behaviors.GAS,
    temp: 4000,
    tempLow: 3968,
    stateLow: "molten_rhodium",
    density: 0.01,
    category: "gases",
    state: "gas",
    hidden: true
};

elements.rhodium_oxide = {
    name: "rhodium oxide",
    color: ["#000000","#111111","#222222"],  // black
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 8200,
    tempHigh: 1373,  // 1100°C decomposes
    stateHigh: "rhodium",
    reactions: {
        "acid": { elem1: "rhodium_solution", chance: 0.1 }
    }
};

elements.rhodium_solution = {
    name: "rhodium solution",
    color: ["#880000","#770000","#990000"],  // dark red
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1050,
    viscosity: 1000
};

elements.platinum_rhodium = {
    name: "platinum rhodium",
    color: ["#d0d0d0","#e0e0e0","#c0c0c0"],  // silvery
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 18000,
    conduct: 0.22,
    heatConduct: 0.3,
    hard: 5.5,
    tempHigh: 2000,
    stateHigh: "molten_platinum_rhodium"
};

elements.molten_platinum_rhodium = {
    name: "molten platinum rhodium",
    color: ["#ffffcc","#ffffdd","#ffffbb"],
    behavior: behaviors.LIQUID,
    temp: 2050,
    tempLow: 2000,
    stateLow: "platinum_rhodium",
    viscosity: 7000,
    density: 16200,
    category: "liquids",
    state: "liquid"
};

elements.ruthenium = {
    name: "ruthenium",
    color: ["#b5b5b5","#c5c5c5","#a5a5a5","#d5d5d5"],  // silvery
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 12410,
    conduct: 0.23,
    heatConduct: 0.27,  // 117 W/mK / 429 ~0.27
    hard: 6.5,
    tempHigh: 2607,  // 2334°C
    stateHigh: "molten_ruthenium",
    reactions: {
        "oxygen": { elem1: "ruthenium_tetroxide", tempMin: 500, chance: 0.01 }
    }
};

elements.molten_ruthenium = {
    name: "molten ruthenium",
    color: ["#ffccdd","#ffbbcc","#ffddbb","#ffaabb"],
    behavior: behaviors.LIQUID,
    temp: 2650,
    tempLow: 2607,
    stateLow: "ruthenium",
    tempHigh: 4423,  // 4150°C
    stateHigh: "ruthenium_vapor",
    viscosity: 7000,
    density: 11100,
    category: "liquids",
    state: "liquid",
    conduct: 0.17,
    heatConduct: 0.2,
    reactions: {
        "molten_iridium": { elem1: "ruthenium_iridium", elem2: null, chance: 0.4 }  // Ru-Ir alloy
    }
};

elements.ruthenium_vapor = {
    name: "ruthenium vapor",
    color: ["#ffdddd","#ffcccc"],
    behavior: behaviors.GAS,
    temp: 4450,
    tempLow: 4423,
    stateLow: "molten_ruthenium",
    density: 0.01,
    category: "gases",
    state: "gas",
    hidden: true
};

elements.ruthenium_tetroxide = {
    name: "ruthenium tetroxide",
    color: ["#ffff00","#eeee00","#dddd00"],  // yellow
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 3500,
    tempHigh: 298,  // 25°C melts
    stateHigh: "molten_ruthenium_tetroxide",
    reactions: {
        "water": { elem1: "ruthenium", elem2: "oxygen", chance: 0.05 }  // decomposes in water
    }
};

elements.molten_ruthenium_tetroxide = {
    name: "molten ruthenium tetroxide",
    color: ["#ffff66","#eeee55","#dddd44"],
    behavior: behaviors.LIQUID,
    temp: 350,
    tempLow: 298,
    stateLow: "ruthenium_tetroxide",
    viscosity: 3000,
    density: 3100
};

elements.ruthenium_iridium = {
    name: "ruthenium iridium",
    color: ["#c0c0c0","#d0d0d0","#b0b0b0"],  // silvery
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 17000,
    conduct: 0.18,
    heatConduct: 0.25,
    hard: 7,
    tempHigh: 2800,
    stateHigh: "molten_ruthenium_iridium"
};

elements.molten_ruthenium_iridium = {
    name: "molten ruthenium iridium",
    color: ["#ffccff","#ffddff","#ffbbff"],
    behavior: behaviors.LIQUID,
    temp: 2850,
    tempLow: 2800,
    stateLow: "ruthenium_iridium",
    viscosity: 8000,
    density: 15300,
    category: "liquids",
    state: "liquid"
};

elements.tantalum = {
    name: "tantalum",
    color: ["#a0a0a0","#b0b0b0","#909090","#c0c0c0"],  // gray-blue
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 16650,
    conduct: 0.13,
    heatConduct: 0.13,  // 57.5 W/mK / 429 ~0.13
    hard: 6.5,
    tempHigh: 3290,  // 3017°C
    stateHigh: "molten_tantalum",
    reactions: {
        "carbon": { elem1: "tantalum_carbide", tempMin: 2500, chance: 0.05 }
    }
};

elements.molten_tantalum = {
    name: "molten tantalum",
    color: ["#ffff99","#ffffaa","#ffff77","#ffffbb"],
    behavior: behaviors.LIQUID,
    temp: 3350,
    tempLow: 3290,
    stateLow: "tantalum",
    tempHigh: 5731,  // 5458°C
    stateHigh: "tantalum_vapor",
    viscosity: 7500,
    density: 15000,
    category: "liquids",
    state: "liquid",
    conduct: 0.1,
    heatConduct: 0.1,
    reactions: {
        "molten_niobium": { elem1: "niobium_tantalum", elem2: null, chance: 0.4 }
    }
};

elements.tantalum_vapor = {
    name: "tantalum vapor",
    color: ["#ffffff","#eeeeee"],
    behavior: behaviors.GAS,
    temp: 5750,
    tempLow: 5731,
    stateLow: "molten_tantalum",
    density: 0.01,
    category: "gases",
    state: "gas",
    hidden: true
};

elements.tantalum_carbide = {
    name: "tantalum carbide",
    color: ["#666666","#777777","#555555"],  // brown-gray
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 14400,
    hard: 9,
    tempHigh: 4153,  // 3880°C
    stateHigh: "molten_tantalum_carbide",
    reactions: {
        "oxygen": { elem1: "tantalum_oxide", elem2: "carbon_dioxide", chance: 0.02, tempMin: 2000 }
    }
};

elements.molten_tantalum_carbide = {
    name: "molten tantalum carbide",
    color: ["#ffcc00","#ffdd11","#ffbb00"],
    behavior: behaviors.LIQUID,
    temp: 4200,
    tempLow: 4153,
    stateLow: "tantalum_carbide",
    viscosity: 9500,
    density: 13000
};

elements.tantalum_oxide = {
    name: "tantalum oxide",
    color: ["#ffffff","#eeeeee","#dddddd"],  // white Ta2O5
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 8200,
    tempHigh: 2143,  // 1870°C
    stateHigh: "molten_tantalum_oxide"
};

elements.molten_tantalum_oxide = {
    name: "molten tantalum oxide",
    color: ["#ffffcc","#ffffdd","#ffffbb"],
    behavior: behaviors.LIQUID,
    temp: 2200,
    tempLow: 2143,
    stateLow: "tantalum_oxide",
    viscosity: 10000,
    density: 7400
};

elements.vanadium = {
    name: "vanadium",
    color: ["#909090","#a0a0a0","#808080","#b0b0b0"],  // silvery-gray
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 6110,
    conduct: 0.31,
    heatConduct: 0.07,  // 30.7 W/mK / 429 ~0.07
    hard: 7,
    tempHigh: 2183,  // 1910°C
    stateHigh: "molten_vanadium",
    reactions: {
        "oxygen": { elem1: "vanadium_pentoxide", tempMin: 500, chance: 0.01 }
    }
};

elements.molten_vanadium = {
    name: "molten vanadium",
    color: ["#ffaa99","#ffbbaa","#ff9988","#ffccbb"],
    behavior: behaviors.LIQUID,
    temp: 2200,
    tempLow: 2183,
    stateLow: "vanadium",
    tempHigh: 3680,  // 3407°C
    stateHigh: "vanadium_vapor",
    viscosity: 5500,
    density: 5500,
    category: "liquids",
    state: "liquid",
    conduct: 0.25,
    heatConduct: 0.05,
    reactions: {
        "molten_chromium": { elem1: "vanadium_chrome", elem2: null, chance: 0.5 },  // V-Cr alloy
        "molten_iron": { elem1: "vanadium_steel", elem2: null, chance: 0.6 }
    }
};

elements.vanadium_vapor = {
    name: "vanadium vapor",
    color: ["#ffcccc","#ffbbbb"],
    behavior: behaviors.GAS,
    temp: 3700,
    tempLow: 3680,
    stateLow: "molten_vanadium",
    density: 0.01,
    category: "gases",
    state: "gas",
    hidden: true
};

elements.vanadium_pentoxide = {
    name: "vanadium pentoxide",
    color: ["#ff9900","#ee8800","#dd7700"],  // orange-yellow
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 3360,
    tempHigh: 963,  // 690°C
    stateHigh: "molten_vanadium_pentoxide",
    reactions: {
        "acid": { elem1: "vanadium_solution", chance: 0.2 }
    }
};

elements.molten_vanadium_pentoxide = {
    name: "molten vanadium pentoxide",
    color: ["#ffcc33","#ffbb22","#ffdd44"],
    behavior: behaviors.LIQUID,
    temp: 1000,
    tempLow: 963,
    stateLow: "vanadium_pentoxide",
    viscosity: 5000,
    density: 3000
};

elements.vanadium_solution = {
    name: "vanadium solution",
    color: ["#00aa99","#009988","#00bbaa"],  // blue-green
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1050,
    viscosity: 1000
};

elements.zirconium = {
    name: "zirconium",
    color: ["#b0b0b0","#c0c0c0","#a0a0a0","#d0d0d0"],  // silvery-white
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 6510,
    conduct: 0.23,
    heatConduct: 0.05,  // 22.7 W/mK / 429 ~0.05
    hard: 5,
    tempHigh: 2128,  // 1855°C
    stateHigh: "molten_zirconium",
    reactions: {
        "oxygen": { elem1: "zirconium_dioxide", tempMin: 400, chance: 0.01 }
    }
};

elements.molten_zirconium = {
    name: "molten zirconium",
    color: ["#ffdd99","#ffeeaa","#ffcc88","#ffffbb"],
    behavior: behaviors.LIQUID,
    temp: 2150,
    tempLow: 2128,
    stateLow: "zirconium",
    tempHigh: 4682,  // 4409°C
    stateHigh: "zirconium_vapor",
    viscosity: 6000,
    density: 5800,
    category: "liquids",
    state: "liquid",
    conduct: 0.18,
    heatConduct: 0.04,
    reactions: {
        "molten_titanium": { elem1: "titanium_zirconium", elem2: null, chance: 0.4 }  // Ti-Zr alloy
    }
};

elements.zirconium_vapor = {
    name: "zirconium vapor",
    color: ["#ffffff","#eeeeee"],
    behavior: behaviors.GAS,
    temp: 4700,
    tempLow: 4682,
    stateLow: "molten_zirconium",
    density: 0.01,
    category: "gases",
    state: "gas",
    hidden: true
};

elements.zirconium_dioxide = {
    name: "zirconium dioxide",
    color: ["#ffffff","#eeeeee","#dddddd"],  // white zirconia
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 5680,
    hard: 8.5,
    tempHigh: 2983,  // 2710°C
    stateHigh: "molten_zirconium_dioxide",
    reactions: {
        "acid": { elem1: "zirconium_solution", chance: 0.05 }  // resistant but can dissolve in HF
    }
};

elements.molten_zirconium_dioxide = {
    name: "molten zirconium dioxide",
    color: ["#ffffcc","#ffffdd","#ffffbb"],
    behavior: behaviors.LIQUID,
    temp: 3000,
    tempLow: 2983,
    stateLow: "zirconium_dioxide",
    viscosity: 10000,
    density: 5100
};

elements.zirconium_solution = {
    name: "zirconium solution",
    color: ["#aaaaaa","#bbbbbb","#999999"],  // grayish
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1050,
    viscosity: 1000
};

elements.beryllium = {
    name: "beryllium",
    color: ["#a8a8a8","#b8b8b8","#989898","#c8c8c8"],  // steel gray
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 1850,
    conduct: 0.55,  // high, 23.8 MS/m relative
    heatConduct: 0.47,  // 200 W/mK / 429 ~0.47
    hard: 5.5,
    tempHigh: 1550,  // 1277°C = 1550K
    stateHigh: "molten_beryllium",
    reactions: {
        "water": { elem2: "dirty_water", chance: 0.2, tempMin: 100 },  // contaminates at boil, toxic
        "molten_copper": { elem1: "beryllium_copper", elem2: null, chance: 0.5 }
    }
};

elements.molten_beryllium = {
    name: "molten beryllium",
    color: ["#ffccff","#ffddff","#ffbbff","#ffaaff"],
    behavior: behaviors.LIQUID,
    temp: 1600,
    tempLow: 1550,
    stateLow: "beryllium",
    tempHigh: 2750,  // 2477°C = 2750K
    stateHigh: "beryllium_vapor",
    viscosity: 4000,
    density: 1690,
    category: "liquids",
    state: "liquid",
    conduct: 0.4,
    heatConduct: 0.35,
    reactions: {
        "steam": { elem1: "beryllium_oxide", elem2: "hydrogen", chance: 0.1 },  // reacts with steam
        "molten_copper": { elem1: "beryllium_copper", elem2: null, chance: 0.6 }
    }
};

elements.beryllium_vapor = {
    name: "beryllium vapor",
    color: ["#ffeeee","#ffdddd"],
    behavior: behaviors.GAS,
    temp: 2800,
    tempLow: 2750,
    stateLow: "molten_beryllium",
    density: 0.01,
    category: "gases",
    state: "gas",
    hidden: true
};

elements.beryllium_oxide = {
    name: "beryllium oxide",
    color: ["#ffffff","#eeeeee","#dddddd"],  // white
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 3010,
    hard: 9,
    tempHigh: 2823,  // 2550°C
    stateHigh: "molten_beryllium_oxide",
    reactions: {
        "acid": { elem1: "beryllium_solution", chance: 0.1 }
    }
};

elements.molten_beryllium_oxide = {
    name: "molten beryllium oxide",
    color: ["#ffffcc","#ffffdd","#ffffbb"],
    behavior: behaviors.LIQUID,
    temp: 2850,
    tempLow: 2823,
    stateLow: "beryllium_oxide",
    viscosity: 10000,
    density: 2700
};

elements.beryllium_solution = {
    name: "beryllium solution",
    color: ["#aaaaaa","#bbbbbb","#999999"],  // colorless/gray
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1050,
    viscosity: 1000
};

elements.beryllium_copper = {
    name: "beryllium copper",
    color: ["#cc9966","#ddaa77","#bb8855"],  // reddish-brown
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 8250,
    conduct: 0.4,
    heatConduct: 0.25,
    hard: 7,
    tempHigh: 1258,  // 985°C
    stateHigh: "molten_beryllium_copper"
};

elements.molten_beryllium_copper = {
    name: "molten beryllium copper",
    color: ["#ff9933","#ffaa44","#ff8822"],
    behavior: behaviors.LIQUID,
    temp: 1300,
    tempLow: 1258,
    stateLow: "beryllium_copper",
    viscosity: 5500,
    density: 7400
};

elements.cadmium = {
    name: "cadmium",
    color: ["#c8c8c8","#d8d8d8","#b8b8b8","#e8e8e8"],  // silvery bluish-gray
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 8650,
    conduct: 0.1,
    heatConduct: 0.23,  // 96.8 W/mK / 429 ~0.23
    hard: 2,
    tempHigh: 594,  // 321°C
    stateHigh: "molten_cadmium",
    reactions: {
        "oxygen": { elem1: "cadmium_oxide", tempMin: 300, chance: 0.02 }
    }
};

elements.molten_cadmium = {
    name: "molten cadmium",
    color: ["#ffeeff","#ffffee","#ffddff","#ffccff"],
    behavior: behaviors.LIQUID,
    temp: 600,
    tempLow: 594,
    stateLow: "cadmium",
    tempHigh: 1040,  // 767°C
    stateHigh: "cadmium_vapor",
    viscosity: 3000,
    density: 8000,
    category: "liquids",
    state: "liquid",
    conduct: 0.08,
    heatConduct: 0.18,
    reactions: {
        "water": { elem2: "dirty_water", chance: 0.5 }
    }
};

elements.cadmium_vapor = {
    name: "cadmium vapor",
    color: ["#ffffff","#eeeeee"],
    behavior: behaviors.GAS,
    temp: 1050,
    tempLow: 1040,
    stateLow: "molten_cadmium",
    density: 0.01,
    category: "gases",
    state: "gas",
    hidden: true
};

elements.cadmium_oxide = {
    name: "cadmium oxide",
    color: ["#663300","#552200","#774400"],  // brown-black
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 8150,
    tempHigh: 1833,  // 1560°C sublimes
    stateHigh: "cadmium_vapor",  // sublimes
    reactions: {
        "acid": { elem1: "cadmium_solution", chance: 0.2 }
    }
};

elements.cadmium_solution = {
    name: "cadmium solution",
    color: ["#aaaaaa","#bbbbbb","#999999"],  // colorless
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1050,
    viscosity: 1000
};

elements.gallium = {
    name: "gallium",
    color: ["#d0d0d0","#e0e0e0","#c0c0c0","#f0f0f0"],  // silvery
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 5910,
    conduct: 0.05,
    heatConduct: 0.09,  // 40.6 W/mK / 429 ~0.09
    hard: 1.5,
    tempHigh: 303,  // 29.8°C
    stateHigh: "molten_gallium",
    reactions: {
        "arsenic": { elem1: "gallium_arsenide", tempMin: 500, chance: 0.01 }  // semiconductor
    }
};

elements.molten_gallium = {
    name: "molten gallium",
    color: ["#ffffff","#eeeeee","#dddddd","#cccccc"],
    behavior: behaviors.LIQUID,
    temp: 310,
    tempLow: 303,
    stateLow: "gallium",
    tempHigh: 2477,  // 2204°C
    stateHigh: "gallium_vapor",
    viscosity: 2000,
    density: 6095,
    category: "liquids",
    state: "liquid",
    conduct: 0.04,
    heatConduct: 0.07,
    reactions: {
        "molten_aluminum": { elem1: "gallinstan", elem2: null, chance: 0.3 },  // with indium too, simplified
        "molten_indium": { elem1: "gallinstan", elem2: null, chance: 0.3 }
    }
};

elements.gallium_vapor = {
    name: "gallium vapor",
    color: ["#ffffff","#eeeeee"],
    behavior: behaviors.GAS,
    temp: 2500,
    tempLow: 2477,
    stateLow: "molten_gallium",
    density: 0.01,
    category: "gases",
    state: "gas",
    hidden: true
};

elements.gallium_arsenide = {
    name: "gallium arsenide",
    color: ["#666666","#777777","#555555"],  // gray
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 5317,
    conduct: 0.0005,  // semiconductor
    tempHigh: 1511,  // 1238°C
    stateHigh: "molten_gallium_arsenide",
    reactions: {
        "oxygen": { elem1: "gallium_oxide", elem2: "arsenic_trioxide", chance: 0.01, tempMin: 800 }
    }
};

elements.molten_gallium_arsenide = {
    name: "molten gallium arsenide",
    color: ["#999999","#aaaaaa","#888888"],
    behavior: behaviors.LIQUID,
    temp: 1550,
    tempLow: 1511,
    stateLow: "gallium_arsenide",
    viscosity: 4000,
    density: 4800
};

elements.gallium_oxide = {
    name: "gallium oxide",
    color: ["#ffffff","#eeeeee","#dddddd"],  // white
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 6440,
    tempHigh: 2053,  // 1780°C
    stateHigh: "molten_gallium_oxide"
};

elements.molten_gallium_oxide = {
    name: "molten gallium oxide",
    color: ["#ffffcc","#ffffdd","#ffffbb"],
    behavior: behaviors.LIQUID,
    temp: 2100,
    tempLow: 2053,
    stateLow: "gallium_oxide",
    viscosity: 8000,
    density: 5800
};

elements.arsenic_trioxide = {
    name: "arsenic trioxide",
    color: ["#ffffff","#eeeeee","#dddddd"],  // white
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 3860,
    tempHigh: 586,  // 313°C sublimes
    stateHigh: "arsenic_vapor"
};

elements.indium = {
    name: "indium",
    color: ["#b8b8b8","#c8c8c8","#a8a8a8","#d8d8d8"],  // silvery lustrous gray
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 7310,
    conduct: 0.12,
    heatConduct: 0.19,  // 81.6 W/mK / 429 ~0.19
    hard: 1.2,
    tempHigh: 430,  // 157°C
    stateHigh: "molten_indium",
    reactions: {
        "phosphorus": { elem1: "indium_phosphide", tempMin: 600, chance: 0.01 }  // semiconductor
    }
};

elements.molten_indium = {
    name: "molten indium",
    color: ["#eeeeff","#ddddff","#ccccff","#bbbbff"],
    behavior: behaviors.LIQUID,
    temp: 450,
    tempLow: 430,
    stateLow: "indium",
    tempHigh: 2345,  // 2072°C
    stateHigh: "indium_vapor",
    viscosity: 2500,
    density: 7020,
    category: "liquids",
    state: "liquid",
    conduct: 0.1,
    heatConduct: 0.15,
    reactions: {
        "molten_gallium": { elem1: "gallinstan", elem2: null, chance: 0.3 }
    }
};

elements.indium_vapor = {
    name: "indium vapor",
    color: ["#ffffff","#eeeeee"],
    behavior: behaviors.GAS,
    temp: 2350,
    tempLow: 2345,
    stateLow: "molten_indium",
    density: 0.01,
    category: "gases",
    state: "gas",
    hidden: true
};

elements.indium_phosphide = {
    name: "indium phosphide",
    color: ["#333333","#444444","#222222"],  // black
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 4810,
    conduct: 0.001,
    tempHigh: 1343,  // 1070°C
    stateHigh: "molten_indium_phosphide",
    reactions: {
        "oxygen": { elem1: "indium_oxide", elem2: "phosphorus_pentoxide", chance: 0.01, tempMin: 900 }
    }
};

elements.molten_indium_phosphide = {
    name: "molten indium phosphide",
    color: ["#666666","#777777","#555555"],
    behavior: behaviors.LIQUID,
    temp: 1400,
    tempLow: 1343,
    stateLow: "indium_phosphide",
    viscosity: 4500,
    density: 4300
};

elements.indium_oxide = {
    name: "indium oxide",
    color: ["#ffffff","#eeeeee","#dddddd"],  // yellow-white
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 7180,
    tempHigh: 2183,  // 1910°C
    stateHigh: "molten_indium_oxide"
};

elements.molten_indium_oxide = {
    name: "molten indium oxide",
    color: ["#ffffcc","#ffffdd","#ffffbb"],
    behavior: behaviors.LIQUID,
    temp: 2200,
    tempLow: 2183,
    stateLow: "indium_oxide",
    viscosity: 9000,
    density: 6500
};

elements.phosphorus_pentoxide = {
    name: "phosphorus pentoxide",
    color: ["#ffffff","#eeeeee","#dddddd"],  // white
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 2390,
    tempHigh: 633,  // 360°C sublimes
    stateHigh: "phosphorus_vapor"
};

elements.osmium = {
    name: "osmium",
    color: ["#808080","#909090","#707070","#a0a0a0"],  // bluish-white
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 22570,
    conduct: 0.1,
    heatConduct: 0.2,  // 87 W/mK / 429 ~0.2
    hard: 7,
    tempHigh: 3306,  // 3033°C
    stateHigh: "molten_osmium",
    reactions: {
        "oxygen": { elem1: "osmium_tetroxide", tempMin: 500, chance: 0.01 }
    }
};

elements.molten_osmium = {
    name: "molten osmium",
    color: ["#ccffff","#bbffcc","#aaffbb","#ddffee"],
    behavior: behaviors.LIQUID,
    temp: 3350,
    tempLow: 3306,
    stateLow: "osmium",
    tempHigh: 5285,  // 5012°C
    stateHigh: "osmium_vapor",
    viscosity: 9000,
    density: 20000,
    category: "liquids",
    state: "liquid",
    conduct: 0.08,
    heatConduct: 0.15,
    reactions: {
        "molten_platinum": { elem1: "osmium_platinum", elem2: null, chance: 0.4 }  // Os-Pt alloy
    }
};

elements.osmium_vapor = {
    name: "osmium vapor",
    color: ["#ffffff","#eeeeee"],
    behavior: behaviors.GAS,
    temp: 5300,
    tempLow: 5285,
    stateLow: "molten_osmium",
    density: 0.01,
    category: "gases",
    state: "gas",
    hidden: true
};

elements.osmium_tetroxide = {
    name: "osmium tetroxide",
    color: ["#ffffff","#eeeeee","#dddddd"],  // white/yellow
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 4900,
    tempHigh: 403,  // 130°C
    stateHigh: "molten_osmium_tetroxide",
    reactions: {
        "water": { elem1: "osmium", elem2: "oxygen", chance: 0.05 }  // decomposes
    }
};

elements.molten_osmium_tetroxide = {
    name: "molten osmium tetroxide",
    color: ["#ffff99","#ffffaa","#ffff88"],
    behavior: behaviors.LIQUID,
    temp: 450,
    tempLow: 403,
    stateLow: "osmium_tetroxide",
    viscosity: 3000,
    density: 4400
};

elements.osmium_platinum = {
    name: "osmium platinum",
    color: ["#d0d0d0","#e0e0e0","#c0c0c0"],  // silvery
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 21000,
    conduct: 0.15,
    heatConduct: 0.25,
    hard: 7,
    tempHigh: 3000,
    stateHigh: "molten_osmium_platinum"
};

elements.molten_osmium_platinum = {
    name: "molten osmium platinum",
    color: ["#ffffcc","#ffffdd","#ffffbb"],
    behavior: behaviors.LIQUID,
    temp: 3050,
    tempLow: 3000,
    stateLow: "osmium_platinum",
    viscosity: 8500,
    density: 18900,
    category: "liquids",
    state: "liquid"
};

elements.iridium = {
    name: "iridium",
    color: ["#c5c5c5","#d5d5d5","#b5b5b5","#e5e5e5"],  // white
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 22560,
    conduct: 0.2,
    heatConduct: 0.34,  // 147 W/mK / 429 ~0.34
    hard: 6.5,
    tempHigh: 2719,  // 2446°C
    stateHigh: "molten_iridium",
    reactions: {
        "chlorine": { elem1: "iridium_chloride", chance: 0.1, tempMin: 400 }
    }
};

elements.molten_iridium = {
    name: "molten iridium",
    color: ["#ffffcc","#ffffdd","#ffffbb","#ffffee"],
    behavior: behaviors.LIQUID,
    temp: 2750,
    tempLow: 2719,
    stateLow: "iridium",
    tempHigh: 4701,  // 4428°C
    stateHigh: "iridium_vapor",
    viscosity: 8000,
    density: 20000,
    category: "liquids",
    state: "liquid",
    conduct: 0.15,
    heatConduct: 0.28,
    reactions: {
        "molten_ruthenium": { elem1: "ruthenium_iridium", elem2: null, chance: 0.4 }
    }
};

elements.iridium_vapor = {
    name: "iridium vapor",
    color: ["#ffffff","#eeeeee"],
    behavior: behaviors.GAS,
    temp: 4750,
    tempLow: 4701,
    stateLow: "molten_iridium",
    density: 0.01,
    category: "gases",
    state: "gas",
    hidden: true
};

elements.iridium_chloride = {
    name: "iridium chloride",
    color: ["#00ff00","#00ee00","#00dd00"],  // green
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 6000,
    tempHigh: 1036,  // 763°C decomposes
    stateHigh: "iridium",  // decomposes
    reactions: {
        "water": { elem1: null, elem2: "iridium_solution", chance: 0.3 }
    }
};

elements.iridium_solution = {
    name: "iridium solution",
    color: ["#00aa00","#009900","#00bb00"],  // green
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1050,
    viscosity: 1000
};

// === ALLOYS ===
elements.stainless_steel = {
    name: "stainless steel",
    color: ["#c0c0c0","#d0d0d0","#b0b0b0"],  // shiny gray
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 7900,
    conduct: 0.04,
    heatConduct: 0.04,
    hard: 5,
    tempHigh: 1700,  // approx 1425-1510°C
    stateHigh: "molten_stainless_steel"
};

elements.molten_stainless_steel = {
    name: "molten stainless steel",
    color: ["#ff9933","#ffaa44","#ff8822","#ff7722"],
    behavior: behaviors.LIQUID,
    temp: 1750,
    tempLow: 1700,
    stateLow: "stainless_steel",
    viscosity: 6500,
    density: 7000,
    category: "liquids",
    state: "liquid"
};

elements.cobalt_chrome = {
    name: "cobalt chrome",
    color: ["#a0a0a0","#b0b0b0","#909090"],  // gray
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 8390,
    conduct: 0.13,
    heatConduct: 0.03,
    hard: 7,
    tempHigh: 1623,  // approx 1350°C
    stateHigh: "molten_cobalt_chrome"
};

elements.molten_cobalt_chrome = {
    name: "molten cobalt chrome",
    color: ["#ff6666","#ff7777","#ff5555"],
    behavior: behaviors.LIQUID,
    temp: 1650,
    tempLow: 1623,
    stateLow: "cobalt_chrome",
    viscosity: 7000,
    density: 7500,
    category: "liquids",
    state: "liquid"
};

elements.hadfield_steel = {
    name: "hadfield steel",
    color: ["#808080","#909090","#707070"],  // dark gray
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 7800,
    conduct: 0.02,
    heatConduct: 0.03,
    hard: 6.5,
    tempHigh: 1600,
    stateHigh: "molten_hadfield_steel"
};

elements.molten_hadfield_steel = {
    name: "molten hadfield steel",
    color: ["#ff9966","#ffaa77","#ff8855"],
    behavior: behaviors.LIQUID,
    temp: 1650,
    tempLow: 1600,
    stateLow: "hadfield_steel",
    viscosity: 6000,
    density: 7000,
    category: "liquids",
    state: "liquid"
};

elements.niobium_titanium = {
    name: "niobium titanium",
    color: ["#b5b5b5","#c5c5c5","#a5a5a5"],  // gray
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 5500,
    conduct: 0.15,
    heatConduct: 0.1,
    hard: 6,
    tempHigh: 2000,
    stateHigh: "molten_niobium_titanium"
};

elements.molten_niobium_titanium = {
    name: "molten niobium titanium",
    color: ["#ffee99","#ffffaa","#ffdd88"],
    behavior: behaviors.LIQUID,
    temp: 2050,
    tempLow: 2000,
    stateLow: "niobium_titanium",
    viscosity: 6500,
    density: 4900,
    category: "liquids",
    state: "liquid"
};

elements.niobium_tantalum = {
    name: "niobium tantalum",
    color: ["#a8a8a8","#b8b8b8","#989898"],  // gray
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 12000,
    conduct: 0.14,
    heatConduct: 0.12,
    hard: 6.5,
    tempHigh: 3000,
    stateHigh: "molten_niobium_tantalum"
};

elements.molten_niobium_tantalum = {
    name: "molten niobium tantalum",
    color: ["#ffff66","#ffff77","#ffff55"],
    behavior: behaviors.LIQUID,
    temp: 3050,
    tempLow: 3000,
    stateLow: "niobium_tantalum",
    viscosity: 7500,
    density: 10800,
    category: "liquids",
    state: "liquid"
};

elements.vanadium_chrome = {
    name: "vanadium chrome",
    color: ["#959595","#a5a5a5","#858585"],  // dark gray
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 6800,
    conduct: 0.25,
    heatConduct: 0.15,
    hard: 8,
    tempHigh: 2000,
    stateHigh: "molten_vanadium_chrome"
};

elements.molten_vanadium_chrome = {
    name: "molten vanadium chrome",
    color: ["#ffaa66","#ffbb77","#ff9955"],
    behavior: behaviors.LIQUID,
    temp: 2050,
    tempLow: 2000,
    stateLow: "vanadium_chrome",
    viscosity: 6000,
    density: 6100,
    category: "liquids",
    state: "liquid"
};

elements.titanium_zirconium = {
    name: "titanium zirconium",
    color: ["#b0b0b0","#c0c0c0","#a0a0a0"],  // gray
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 5500,
    conduct: 0.2,
    heatConduct: 0.06,
    hard: 5.5,
    tempHigh: 1900,
    stateHigh: "molten_titanium_zirconium"
};

elements.molten_titanium_zirconium = {
    name: "molten titanium zirconium",
    color: ["#ffdd66","#ffee77","#ffcc55"],
    behavior: behaviors.LIQUID,
    temp: 1950,
    tempLow: 1900,
    stateLow: "titanium_zirconium",
    viscosity: 5500,
    density: 4900,
    category: "liquids",
    state: "liquid"
};

// === Custom Alloy Creator ===
elements.alloy_creator = {
    name: "alloy creator",
    color: "#ff0000",  // red for furnace-like
    behavior: behaviors.WALL,
    category: "machines",
    state: "solid",
    density: 3000,
    hard: 8,
    conduct: 0.5,
    tempHigh: 2000,
    stateHigh: "molten_alloy_creator",  // can melt itself if overheated
    tick: function(pixel) {
        if (pixel.temp > 1000) {  // activated at high temp
            for (var i = -1; i <= 1; i++) {
                for (var j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) continue;
                    var px = pixel.x + i;
                    var py = pixel.y + j;
                    if (!outOfBounds(px, py) && !isEmpty(px, py)) {
                        var neighbor = pixelMap[px][py];
                        if (neighbor.element.includes("molten_") && Math.random() < 0.1) {
                            // Simple: turn nearby molten metal to a generic alloy
                            changePixel(neighbor, "generic_alloy");
                        }
                    }
                }
            }
        }
    }
};

elements.molten_alloy_creator = {
    name: "molten alloy creator",
    color: "#ff6600",
    behavior: behaviors.LIQUID,
    temp: 2050,
    tempLow: 2000,
    stateLow: "alloy_creator",
    viscosity: 10000,
    density: 2700,
    category: "liquids"
};

elements.generic_alloy = {
    name: "generic alloy",
    color: ["#aaaaaa","#bbbbbb","#999999"],
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 8000,
    conduct: 0.15,
    heatConduct: 0.2,
    hard: 6,
    tempHigh: 1800,
    stateHigh: "molten_generic_alloy"
};

elements.molten_generic_alloy = {
    name: "molten generic alloy",
    color: ["#ffaa00","#ffbb11","#ff9900"],
    behavior: behaviors.LIQUID,
    temp: 1850,
    tempLow: 1800,
    stateLow: "generic_alloy",
    viscosity: 7000,
    density: 7200,
    category: "liquids"
};

elements.stellite = {
    name: "stellite",
    color: ["#909090","#a0a0a0","#808080"],  // gray
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 8390,
    conduct: 0.1,
    heatConduct: 0.03,
    hard: 8.5,
    tempHigh: 1623,
    stateHigh: "molten_stellite"
};

elements.molten_stellite = {
    name: "molten stellite",
    color: ["#ff5555","#ff6666","#ff4444"],
    behavior: behaviors.LIQUID,
    temp: 1650,
    tempLow: 1623,
    stateLow: "stellite",
    viscosity: 7500,
    density: 7500,
    category: "liquids",
    state: "liquid"
};

// === Additional Alloys with Original Elements ===

// Add to elements.molten_iron.reactions (assuming original iron exists)
elements.molten_iron.reactions = elements.molten_iron.reactions || {};
elements.molten_iron.reactions["molten_chromium"] = { elem1: "stainless_steel", elem2: null, chance: 0.7 };
elements.molten_iron.reactions["molten_vanadium"] = { elem1: "vanadium_steel", elem2: null, chance: 0.6 };
elements.molten_iron.reactions["molten_manganese"] = { elem1: "hadfield_steel", elem2: null, chance: 0.4 };
elements.molten_iron.reactions["molten_molybdenum"] = { elem1: "moly_steel", elem2: null, chance: 0.5 };
elements.molten_iron.reactions["molten_cobalt"] = { elem1: "cobalt_steel", elem2: null, chance: 0.5 };

// Add to elements.molten_nickel.reactions (original nickel)
elements.molten_nickel = elements.molten_nickel || { /* if not defined, assume it exists */ };
elements.molten_nickel.reactions = elements.molten_nickel.reactions || {};
elements.molten_nickel.reactions["molten_chromium"] = { elem1: "nichrome", elem2: null, chance: 0.6 };
elements.molten_nickel.reactions["molten_copper"] = { elem1: "cupronickel", elem2: null, chance: 0.5 };
elements.molten_nickel.reactions["molten_molybdenum"] = { elem1: "hastelloy", elem2: null, chance: 0.4 };

// Add to elements.molten_copper.reactions
elements.molten_copper.reactions = elements.molten_copper.reactions || {};
elements.molten_copper.reactions["molten_nickel"] = { elem1: "cupronickel", elem2: null, chance: 0.5 };
elements.molten_copper.reactions["molten_beryllium"] = { elem1: "beryllium_copper", elem2: null, chance: 0.6 };

// Add to elements.molten_aluminum.reactions
elements.molten_aluminum.reactions = elements.molten_aluminum.reactions || {};
elements.molten_aluminum.reactions["molten_gallium"] = { elem1: "gallinstan", elem2: null, chance: 0.3 };  // with indium too, but simplify

// New Alloy Elements

elements.vanadium_steel = {
    name: "vanadium steel",
    color: ["#808080","#909090","#707070","#a0a0a0"],
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 7800,
    conduct: 0.05,
    heatConduct: 0.1,
    hard: 7,
    tempHigh: 1700,
    stateHigh: "molten_vanadium_steel"
};

elements.molten_vanadium_steel = {
    name: "molten vanadium steel",
    color: ["#ff9933","#ffaa44","#ff8822","#ff7722"],
    behavior: behaviors.LIQUID,
    temp: 1750,
    tempLow: 1700,
    stateLow: "vanadium_steel",
    viscosity: 6500,
    density: 7000,
    category: "liquids",
    state: "liquid"
};

elements.moly_steel = {
    name: "moly steel",
    color: ["#909090","#a0a0a0","#808080","#b0b0b0"],
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 7850,
    conduct: 0.06,
    heatConduct: 0.12,
    hard: 6.5,
    tempHigh: 1650,
    stateHigh: "molten_moly_steel"
};

elements.molten_moly_steel = {
    name: "molten moly steel",
    color: ["#ffcc33","#ffdd44","#ffbb22","#ffaa11"],
    behavior: behaviors.LIQUID,
    temp: 1700,
    tempLow: 1650,
    stateLow: "moly_steel",
    viscosity: 7000,
    density: 7100,
    category: "liquids",
    state: "liquid"
};

elements.cobalt_steel = {
    name: "cobalt steel",
    color: ["#7b7b7b","#8b8b8b","#6b6b6b","#9b9b9b"],
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 8200,
    conduct: 0.08,
    heatConduct: 0.15,
    hard: 7,
    tempHigh: 1600,
    stateHigh: "molten_cobalt_steel"
};

elements.molten_cobalt_steel = {
    name: "molten cobalt steel",
    color: ["#ff8866","#ff9977","#ff7755","#ffaa88"],
    behavior: behaviors.LIQUID,
    temp: 1650,
    tempLow: 1600,
    stateLow: "cobalt_steel",
    viscosity: 6000,
    density: 7400,
    category: "liquids",
    state: "liquid"
};

elements.nichrome = {
    name: "nichrome",
    color: ["#a0a0a0","#b0b0b0","#909090","#c0c0c0"],
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 8400,
    conduct: 0.01,  // low conductivity for resistance wire
    heatConduct: 0.03,
    hard: 5,
    tempHigh: 1673,  // 1400°C
    stateHigh: "molten_nichrome"
};

elements.molten_nichrome = {
    name: "molten nichrome",
    color: ["#ffaa00","#ffbb11","#ff9900","#ffcc22"],
    behavior: behaviors.LIQUID,
    temp: 1700,
    tempLow: 1673,
    stateLow: "nichrome",
    viscosity: 6500,
    density: 7600,
    category: "liquids",
    state: "liquid"
};

elements.cupronickel = {
    name: "cupronickel",
    color: ["#cc9966","#ddaa77","#bb8855","#eebb88"],
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 8900,
    conduct: 0.05,
    heatConduct: 0.07,
    hard: 4,
    tempHigh: 1373,  // 1100°C
    stateHigh: "molten_cupronickel"
};

elements.molten_cupronickel = {
    name: "molten cupronickel",
    color: ["#ff9933","#ffaa44","#ff8822","#ff7711"],
    behavior: behaviors.LIQUID,
    temp: 1400,
    tempLow: 1373,
    stateLow: "cupronickel",
    viscosity: 5000,
    density: 8000,
    category: "liquids",
    state: "liquid"
};

elements.hastelloy = {
    name: "hastelloy",
    color: ["#b5b5b5","#c5c5c5","#a5a5a5","#d5d5d5"],
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 9240,
    conduct: 0.03,
    heatConduct: 0.02,
    hard: 5.5,
    tempHigh: 1600,
    stateHigh: "molten_hastelloy"
};

elements.molten_hastelloy = {
    name: "molten hastelloy",
    color: ["#ffcc99","#ffddaa","#ffbb88","#ffaa77"],
    behavior: behaviors.LIQUID,
    temp: 1650,
    tempLow: 1600,
    stateLow: "hastelloy",
    viscosity: 7000,
    density: 8300,
    category: "liquids",
    state: "liquid"
};

elements.gallinstan = {
    name: "gallinstan",
    color: ["#d0d0d0","#e0e0e0","#c0c0c0","#f0f0f0"],
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 6440,
    conduct: 0.06,
    heatConduct: 0.1,
    hard: 1,
    tempHigh: 253,  // -20°C, liquid at room temp but solid here for simplicity
    stateHigh: "molten_gallinstan"
};

elements.molten_gallinstan = {
    name: "molten gallinstan",
    color: ["#ffffff","#eeeeee","#dddddd","#cccccc"],
    behavior: behaviors.LIQUID,
    temp: 300,
    tempLow: 253,
    stateLow: "gallinstan",
    viscosity: 2000,
    density: 6440,
    category: "liquids",
    state: "liquid"
};