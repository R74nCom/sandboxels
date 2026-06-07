// Ensure the elements object exists
elements.strontium = {
    color: "#e0e0e0",
    behavior: behaviors.POWDER,
    category: "solids",
    state: "solid",
    density: 2640,
    reactions: {
        "water": { elem1: "strontium_hydroxide", elem2: "hydrogen" },
        "oxygen": { elem1: "strontium_oxide", elem2: null }
    }
};

elements.strontium_chloride = {
    color: "#f5f5f5",
    behavior: behaviors.POWDER,
    category: "solids",
    state: "solid",
    density: 3052,
    reactions: {
        "fire": { elem1: "fire", elem2: null, color1: "#ff1a1a" }
    }
};

elements.strontium_oxide = {
    color: "#ffffff",
    behavior: behaviors.POWDER,
    category: "solids",
    state: "solid",
    density: 4700,
    reactions: {
        "water": { elem1: "strontium_hydroxide", elem2: null }
    }
};

elements.strontium_hydroxide = {
    color: "#fcfaf2",
    behavior: behaviors.POWDER,
    category: "solids",
    state: "solid",
    density: 1900,
    reactions: {
        "acid": { elem1: "salt_water", elem2: null } 
    }
};

// --- NEW STRONTIUM HALIDES ---

elements.strontium_fluoride = {
    color: "#e8f4f8", // Slightly translucent crystalline white
    behavior: behaviors.POWDER,
    category: "solids",
    state: "solid",
    density: 4240, // Quite dense
    reactions: {
        "fire": { elem1: "fire", elem2: "smoke", color1: "#ff3333" } // Sharp red flame
    }
};

elements.strontium_bromide = {
    color: "#f4ede2", // Off-white/yellowish tint
    behavior: behaviors.POWDER,
    category: "solids",
    state: "solid",
    density: 4216,
    reactions: {
        "fire": { elem1: "fire", elem2: "smoke", color1: "#e60000" }, // Vibrant crimson
        "water": { elem1: "dirty_water", elem2: null } // High solubility simulation
    }
};

elements.strontium_iodide = {
    color: "#e6dfb8", // Yellows slightly in air/light
    behavior: behaviors.POWDER,
    category: "solids",
    state: "solid",
    density: 4550,
    reactions: {
        "fire": { elem1: "fire", elem2: "smoke", color1: "#cc0000" }, // Deep dark red
        "water": { elem1: "dirty_water", elem2: null }
    }
};

// Fire reaction overrides for burning effects
elements.fire.reactions = elements.fire.reactions || {};
elements.fire.reactions.strontium = { elem1: "fire", elem2: "ash", color1: "#ff0033" };
elements.fire.reactions.strontium_chloride = { elem1: "fire", elem2: "smoke", color1: "#ff1a1a" };
elements.fire.reactions.strontium_fluoride = { elem1: "fire", elem2: "smoke", color1: "#ff3333" };
elements.fire.reactions.strontium_bromide = { elem1: "fire", elem2: "smoke", color1: "#e60000" };
elements.fire.reactions.strontium_iodide = { elem1: "fire", elem2: "smoke", color1: "#cc0000" };
