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
    category: "powders",
    state: "solid",
    density: 3052,
    reactions: {
        "fire": { elem1: "fire", elem2: null, color1: "#ff1a1a" } // Turns flame crimson red!
    }
};

elements.strontium_oxide = {
    color: "#ffffff",
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 4700,
    reactions: {
        "water": { elem1: "strontium_hydroxide", elem2: null }
    }
};

elements.strontium_hydroxide = {
    color: "#fcfaf2",
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 1900,
    reactions: {
        "acid": { elem1: "salt_water", elem2: null } // Simplified neutralization
    }
};

// Optional: Add a special crimson fire reaction when Strontium burns
elements.fire.reactions = elements.fire.reactions || {};
elements.fire.reactions.strontium = { elem1: "fire", elem2: "ash", color1: "#ff0033" };
