// Sandboxels Custom Mod: Magic & Explosions
// Elements: Aether, Philosopher's Stone, Potion, and Mana Crystal

// 1. Define Potion (must be declared before Aether, since Aether's reaction references it)
elements.potion = {
    color: "#00ffcc",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1000,
    viscosity: 10
};

// 2. Define Aether (glowing gas with color variation)
elements.aether = {
    // Plain hex strings — no "%" syntax, which is not valid in Sandboxels color arrays
    color: ["#8a2be2", "#da70d6", "#ba55d3"],
    behavior: behaviors.GAS,
    category: "gases",   // FIX: "energy" is not a valid Sandboxels category; use "gases"
    state: "gas",
    density: 0.5,
    glow: true,
    reactions: {
        "water": { elem1: null, elem2: "potion" },
        "fire":  { elem1: "plasma", elem2: "plasma" }
    }
};

// 3. Define Philosopher's Stone
elements.philosophers_stone = {
    color: "#e60000",
    behavior: behaviors.SOLID,
    category: "solids",
    state: "solid",
    density: 5000,
    // FIX: "conduct" is not a Sandboxels property — removed.
    // To make it electrically conductive, add it to the conducts array instead:
    // conducts: ["electricity"],
    reactions: {
        "iron":   { elem1: "philosophers_stone", elem2: "gold" },
        "copper": { elem1: "philosophers_stone", elem2: "gold" },
        "lead":   { elem1: "philosophers_stone", elem2: "gold" }
    }
};

// 4. Define Mana Crystal (animated color + explosion + slow growth near aether)
elements.mana_crystal = {
    // FIX: Removed "%" from color strings — Sandboxels does not support "%" color modifiers.
    // Natural shimmer comes from the engine cycling through the array automatically.
    color: ["#0000ff", "#1e90ff", "#00ffff", "#4169e1"],
    behavior: behaviors.SOLID,
    category: "solids",
    state: "solid",
    density: 3000,
    tempHigh: 500,
    stateHigh: "magma",   // Melts to magma if overheated — "magma" is a valid Sandboxels element
    reactions: {
        // Touched by fire or plasma → both cells become explosion particles
        "fire":   { elem1: "explosion", elem2: "explosion" },
        "plasma": { elem1: "explosion", elem2: "explosion" },
        // Slow growth near aether: chance is 0–1 float (1 = 100 %)
        // FIX: chance must be a number between 0 and 1, not a percentage
        "aether": { elem1: "mana_crystal", elem2: "mana_crystal", chance: 0.1 }
    }
};

// 5. Refresh the element picker after injection
// FIX: initUI() does not exist in Sandboxels — use updateElementButtons() instead,
//      which rebuilds the category tabs and element grid without a full reinit.
if (typeof updateElementButtons === "function") {
    updateElementButtons();
}
