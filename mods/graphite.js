elements.graphite = {
    color: "#4d4f4f",
    behavior: behaviors.POWDER,
    category: "GraphiteMod",
    state: "solid",
    density: 2.26,
    tempHigh: 3600,
    stateHigh: "carbon_gas",
    flammable: false,
    reactions: {
        "oxygen": { elem1: "carbon_dioxide", elem2: null, tempMin: 700 },
        "fire": { elem1: "carbon_monoxide", elem2: null, tempMin: 700 },
        "fluorine": { elem1: "carbon_tetrafluoride", elem2: null },
        "silicon_dioxide": { elem1: "silicon", elem2: "carbon_monoxide", tempMin: 1700 }
    }
};

/* Carbon (solid) */
elements.carbon = {
    color: "#7a7d7d",
    behavior: behaviors.POWDER,
    category: "GraphiteMod",
    state: "solid",
    density: 2.2,
    tempHigh: 3600,
    stateHigh: "carbon_gas",
    flammable: false,
    reactions: {
        "oxygen": { elem1: "carbon_dioxide", elem2: null, tempMin: 700 },
        "fire": { elem1: "carbon_monoxide", elem2: null, tempMin: 700 },
        "fluorine": { elem1: "carbon_tetrafluoride", elem2: null },
        "silicon_dioxide": { elem1: "silicon", elem2: "carbon_monoxide", tempMin: 1700 }
    }
};

/* Carbon gas (vapor) */
elements.carbon_gas = {
    color: "#666666",
    behavior: behaviors.GAS,
    category: "GraphiteMod",
    state: "gas",
    density: 0.0018,
    reactions: {
        "oxygen": { elem1: "carbon_monoxide", elem2: null },
        "fluorine": { elem1: "carbon_tetrafluoride", elem2: null },
        "hydrogen": { elem1: "hydrocarbon_gas", elem2: null, tempMin: 1200 },
        "silicon": { elem1: "silicon_carbide", elem2: null, tempMin: 1400 }
    }
};

/* Hydrocarbon gas (generic hydrocarbon product placeholder) */
elements.hydrocarbon_gas = {
    color: "#ffdca3",
    behavior: behaviors.GAS,
    category: "GraphiteMod",
    state: "gas",
    density: 0.7,
    reactions: {
        "oxygen": { elem1: "carbon_dioxide", elem2: "water" },
        "fire": { elem1: "carbon_dioxide", elem2: "water" },
        "fluorine": { elem1: "carbon_tetrafluoride", elem2: "hydrogen_fluoride" },
        "water": { elem1: "water", elem2: null }
    }
};

/* Carbon monoxide */
elements.carbon_monoxide = {
    color: "#bfbfbf",
    behavior: behaviors.GAS,
    category: "GraphiteMod",
    state: "gas",
    density: 1.145,
    reactions: {
        "oxygen": { elem1: "carbon_dioxide", elem2: null },
        "fire": { elem1: "carbon_dioxide", elem2: null },
        "iron_oxide": { elem1: "iron", elem2: "carbon_dioxide", tempMin: 800 },
        "fluorine": { elem1: "carbonyl_fluoride", elem2: null }
    }
};

/* Carbonyl fluoride (COF2) */
elements.carbonyl_fluoride = {
    color: "#cfeef0",
    behavior: behaviors.GAS,
    category: "GraphiteMod",
    state: "gas",
    density: 2.5,
    reactions: {
        "water": { elem1: "carbon_dioxide", elem2: "hydrogen_fluoride" },
        "fire": { elem1: "carbon_dioxide", elem2: "fluorine" },
        "hydrofluoric_acid": { elem1: "hydrogen_fluoride", elem2: "carbon_dioxide" },
        "oxygen": { elem1: "carbon_dioxide", elem2: "fluorine" }
    }
};

/* Fluorine */
elements.fluorine = {
    color: "#b5e61d",
    behavior: behaviors.GAS,
    category: "GraphiteMod",
    state: "gas",
    density: 1.696,
    temp: 25,
    flammable: false,
    reactions: {
        "graphite": { elem1: "carbon_tetrafluoride", elem2: null },
        "carbon": { elem1: "carbon_tetrafluoride", elem2: null },
        "hydrogen": { elem1: "hydrogen_fluoride", elem2: null },
        "water": { elem1: "hydrogen_fluoride", elem2: "oxygen" },
        "silicon": { elem1: "silicon_tetrafluoride", elem2: null }
    }
};

/* Carbon tetrafluoride (CF4) */
elements.carbon_tetrafluoride = {
    color: "#ccffff",
    behavior: behaviors.GAS,
    category: "GraphiteMod",
    state: "gas",
    density: 3.72,
    flammable: false,
    reactions: { 
        "fire": { elem1: "carbon_dioxide", elem2: "fluorine", tempMin: 2000 },
        "silicon": { elem1: "silicon_tetrafluoride", elem2: "carbon", tempMin: 900 },
        "molten_silicon": { elem1: "silicon_tetrafluoride", elem2: "carbon", tempMin: 900 },
        "silicon_dioxide": { elem1: "silicon_tetrafluoride", elem2: "carbon_monoxide", tempMin: 1500 }
    }
};

/* Hydrogen fluoride (gas) */
elements.hydrogen_fluoride = {
    color: "#e0ffff",
    behavior: behaviors.GAS,
    category: "GraphiteMod",
    state: "gas",
    density: 0.98,
    temp: 25,
    flammable: false,
    reactions: {
        "water": { elem1: "hydrofluoric_acid", elem2: null },
        "silicon_dioxide": { elem1: "silicon_tetrafluoride", elem2: "water" },
        "calcium_carbonate": { elem1: "calcium_fluoride", elem2: "carbon_dioxide" },
        "calcium_hydroxide": { elem1: "calcium_fluoride", elem2: "water" }
    }
};

/* Hydrofluoric acid (aqueous HF) */
elements.hydrofluoric_acid = {
    color: "#66ccff",
    behavior: behaviors.LIQUID,
    category: "GraphiteMod",
    state: "liquid",
    density: 1.15,
    tempLow: -83,
    stain: "#99ddff",
    reactions: {
        "glass": { elem1: "silicon_tetrafluoride", elem2: "water" },
        "sand": { elem1: "silicon_tetrafluoride", elem2: "water" },
        "silicon_dioxide": { elem1: "silicon_tetrafluoride", elem2: "water" },
        "calcium_carbonate": { elem1: "calcium_fluoride", elem2: "carbon_dioxide" },
        "calcium_hydroxide": { elem1: "calcium_fluoride", elem2: "water" }
    }
};

/* Silicon tetrafluoride */
elements.silicon_tetrafluoride = {
    color: "#e6ffff",
    behavior: behaviors.GAS,
    category: "GraphiteMod",
    state: "gas",
    density: 1.66,
    flammable: false,
    reactions: {
        "water": { elem1: "hydrofluoric_acid", elem2: "silicon_dioxide" },
        "sand": { elem1: "hydrofluoric_acid", elem2: "silicon_dioxide" },
        "glass": { elem1: "hydrofluoric_acid", elem2: "silicon_dioxide" },
        "calcium_hydroxide": { elem1: "calcium_fluoride", elem2: "hydrofluoric_acid" }
    }
};

/* Silicon (solid) */
elements.silicon = {
    color: "#9a9a9a",
    behavior: behaviors.SOLID,
    category: "GraphiteMod",
    state: "solid",
    density: 2.33,
    tempHigh: 1414,
    stateHigh: "molten_silicon",
    flammable: false,
    reactions: {
        "oxygen": { elem1: "silicon_dioxide", elem2: null, tempMin: 500 },
        "fluorine": { elem1: "silicon_tetrafluoride", elem2: null },
        "hydrofluoric_acid": { elem1: "silicon_tetrafluoride", elem2: null },
        "carbon_tetrafluoride": { elem1: "silicon_tetrafluoride", elem2: "carbon", tempMin: 900 }
    }
};

elements.molten_silicon = {
    color: "#ffb366",
    behavior: behaviors.LIQUID,
    category: "GraphiteMod",
    state: "liquid",
    density: 2.5,
    temp: 1414,
    stateLow: "silicon",
    reactions: {
        "oxygen": { elem1: "silicon_dioxide", elem2: null },
        "fluorine": { elem1: "silicon_tetrafluoride", elem2: null },
        "carbon_tetrafluoride": { elem1: "silicon_tetrafluoride", elem2: "carbon" },
        "graphite": { elem1: "silicon_carbide", elem2: null, tempMin: 1500 }
    }
};

/* Silicon dioxide (quartz / sand) */
elements.silicon_dioxide = {
    color: "#f2f2f2",
    behavior: behaviors.SOLID,
    category: "GraphiteMod",
    state: "solid",
    density: 2.65,
    tempHigh: 1710,
    stateHigh: "molten_silicon_dioxide",
    flammable: false,
    reactions: {
        "hydrofluoric_acid": { elem1: "silicon_tetrafluoride", elem2: "water" },
        "hydrogen_fluoride": { elem1: "silicon_tetrafluoride", elem2: "water" },
        "graphite": { elem1: "silicon", elem2: "carbon_monoxide", tempMin: 1700 },
        "carbon": { elem1: "silicon", elem2: "carbon_monoxide", tempMin: 1700 }
    }
};

elements.molten_silicon_dioxide = {
    color: "#ffcc99",
    behavior: behaviors.LIQUID,
    category: "GraphiteMod",
    state: "liquid",
    density: 2.3,
    temp: 1710,
    stateLow: "silicon_dioxide",
    flammable: false,
    reactions: {
        "hydrofluoric_acid": { elem1: "silicon_tetrafluoride", elem2: "water" },
        "hydrogen_fluoride": { elem1: "silicon_tetrafluoride", elem2: "water" },
        "graphite": { elem1: "silicon", elem2: "carbon_monoxide", tempMin: 1700 },
        "carbon": { elem1: "silicon", elem2: "carbon_monoxide", tempMin: 1700 }
    }
};

/* Calcium carbonate (limestone) */
elements.calcium_carbonate = {
    color: "#fffccc",
    behavior: behaviors.SOLID,
    category: "GraphiteMod",
    state: "solid",
    density: 2.71,
    flammable: false,
    reactions: {
        "acid": { elem1: "carbon_dioxide", elem2: "water" },
        "hydrofluoric_acid": { elem1: "calcium_fluoride", elem2: "carbon_dioxide" },
        "hydrogen_fluoride": { elem1: "calcium_fluoride", elem2: "carbon_dioxide" },
        "fire": { elem1: "calcium_oxide", elem2: "carbon_dioxide", tempMin: 850 }
    }
};

/* Calcium oxide (quicklime) */
elements.calcium_oxide = {
    color: "#fafafa",
    behavior: behaviors.SOLID,
    category: "GraphiteMod",
    state: "solid",
    density: 3.34,
    tempHigh: 2572,
    stateHigh: "molten_calcium_oxide",
    reactions: {
        "water": { elem1: "calcium_hydroxide", elem2: null },
        "carbon_dioxide": { elem1: "calcium_carbonate", elem2: null },
        "hydrogen_fluoride": { elem1: "calcium_fluoride", elem2: "water" },
        "hydrofluoric_acid": { elem1: "calcium_fluoride", elem2: "water" }
    }
};

elements.molten_calcium_oxide = {
    color: "#f0e6cc",
    behavior: behaviors.LIQUID,
    category: "GraphiteMod",
    state: "liquid",
    density: 3.0,
    temp: 2572,
    stateLow: "calcium_oxide",
    reactions: {
        "water": { elem1: "calcium_hydroxide", elem2: null },
        "carbon_dioxide": { elem1: "calcium_carbonate", elem2: null },
        "hydrogen_fluoride": { elem1: "calcium_fluoride", elem2: "water" },
        "hydrofluoric_acid": { elem1: "calcium_fluoride", elem2: "water" }
    }
};

/* Calcium hydroxide (slaked lime) */
elements.calcium_hydroxide = {
    color: "#f9fff9",
    behavior: behaviors.SOLID,
    category: "GraphiteMod",
    state: "solid",
    density: 2.21,
    flammable: false,
    reactions: {
        "carbon_dioxide": { elem1: "calcium_carbonate", elem2: "water" },
        "hydrofluoric_acid": { elem1: "calcium_fluoride", elem2: "water" },
        "hydrogen_fluoride": { elem1: "calcium_fluoride", elem2: "water" },
        "silicon_tetrafluoride": { elem1: "calcium_fluoride", elem2: "hydrofluoric_acid" }
    }
};

/* Calcium fluoride (fluorspar) */
elements.calcium_fluoride = {
    color: "#ccccff",
    behavior: behaviors.SOLID,
    category: "GraphiteMod",
    state: "solid",
    density: 3.18,
    flammable: false,
    reactions: {
        "acid": { elem1: "hydrofluoric_acid", elem2: "calcium_sulfate" },
        "hydrofluoric_acid": { elem1: "calcium_fluoride", elem2: null },
        "hydrogen_fluoride": { elem1: "calcium_fluoride", elem2: null },
        "molten_silicon_dioxide": { elem1: "calcium_silicate", elem2: null }
    }
};

/* Calcium silicate (simple placeholder for Ca-silicates) */
elements.calcium_silicate = {
    color: "#ddd8cc",
    behavior: behaviors.SOLID,
    category: "GraphiteMod",
    state: "solid",
    density: 2.9,
    flammable: false,
    reactions: {
        "acid": { elem1: "calcium_fluoride", elem2: "silicon_tetrafluoride" },
        "water": { elem1: "calcium_hydroxide", elem2: "silicon_dioxide" },
        "fire": { elem1: "molten_calcium_silicate", elem2: null, tempMin: 1400 },
        "hydrofluoric_acid": { elem1: "calcium_fluoride", elem2: "silicon_tetrafluoride" }
    }
};

elements.molten_calcium_silicate = {
    color: "#f0e6cc",
    behavior: behaviors.LIQUID,
    category: "GraphiteMod",
    state: "liquid",
    density: 2.9,
    temp: 1400,
    stateLow: "calcium_silicate",
    flammable: false
};

/* Calcium sulfate (gypsum/anhydrite) */
elements.calcium_sulfate = {
    color: "#e6e6e6",
    behavior: behaviors.SOLID,
    category: "GraphiteMod",
    state: "solid",
    density: 2.96,
    flammable: false,
    reactions: {
        "water": { elem1: "gypsum", elem2: null },
        "carbon": { elem1: "calcium_sulfide", elem2: "carbon_dioxide", tempMin: 1200 },
        "hydrofluoric_acid": { elem1: "calcium_fluoride", elem2: "acid" },
        "hydrogen_fluoride": { elem1: "calcium_fluoride", elem2: "acid" }
    }
};

/* Gypsum (hydrated CaSO4) */
elements.gypsum = {
    color: "#f3f3f3",
    behavior: behaviors.SOLID,
    category: "GraphiteMod",
    state: "solid",
    density: 2.32,
    flammable: false,
    reactions: {
        "fire": { elem1: "calcium_sulfate", elem2: "water", tempMin: 250 },
        "acid": { elem1: "calcium_sulfate", elem2: "acid" },
        "carbon": { elem1: "calcium_sulfide", elem2: "carbon_dioxide", tempMin: 1200 },
        "water": { elem1: "gypsum", elem2: null }
    }
};

/* Calcium sulfide (product of high-T reduction) */
elements.calcium_sulfide = {
    color: "#cfa76f",
    behavior: behaviors.SOLID,
    category: "GraphiteMod",
    state: "solid",
    density: 2.8,
    flammable: false,
    reactions: {
        "water": { elem1: "hydrogen_sulfide", elem2: null },
        "acid": { elem1: "hydrogen_sulfide", elem2: "calcium_fluoride" },
        "fire": { elem1: "calcium_sulfide", elem2: null },
        "carbon_dioxide": { elem1: "calcium_carbonate", elem2: "sulfur_dioxide" }
    }
};


elements.silicon_carbide = {
    color: "#2e2e2e",
    behavior: behaviors.SOLID,
    category: "GraphiteMod",
    state: "solid",
    density: 3.21,
    tempHigh: 2730,
    stateHigh: "molten_silicon_carbide",
    reactions: {
        "oxygen": { elem1: "silicon_dioxide", elem2: "carbon_dioxide", tempMin: 1000 },
        "fluorine": { elem1: "silicon_tetrafluoride", elem2: "carbon_tetrafluoride", tempMin: 500 },
        "hydrofluoric_acid": { elem1: "silicon_tetrafluoride", elem2: "carbon_tetrafluoride" },
        "hydrogen_fluoride": { elem1: "silicon_tetrafluoride", elem2: "carbon_tetrafluoride" }
    }
};

elements.molten_silicon_carbide = {
    color: "#443f3f",
    behavior: behaviors.LIQUID,
    category: "GraphiteMod",
    state: "liquid",
    density: 3.2,
    temp: 2730,
    stateLow: "silicon_carbide",
    flammable: false
};

/* Paper with graphite (drawing) */
elements.paper_with_graphite = {
    color: "#888888",
    behavior: behaviors.SOLID,
    category: "GraphiteMod",
    state: "solid",
    density: 0.8,
    flammable: true,
    reactions: {
        "fire": { elem1: "ash", elem2: "smoke" },
        "oxygen": { elem1: "ash", elem2: "smoke", tempMin: 300 },
        "water": { elem1: "paper", elem2: null },
        "hydrofluoric_acid": { elem1: "ash", elem2: "acid" }
    }
};

elements.eraser = {
    color: "#ffffff",
    tool: function(pixel) {
        if (pixel.element == "paper_with_graphite") {
            pixel.element = "paper"
            pixel.color = "#ffffff"
        }
    },
    category: "tools",
};

