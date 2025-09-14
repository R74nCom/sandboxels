// ==UserScript==
// @name full_lab_mod_final_fixed
// @version 1.3
// ==/UserScript==

elements.cold_pills = {
    color: "#FFFFFF",
    behavior: behaviors.POWDER,
    category: "powders",
    reactions: { "water": { elem1: "pseudoephedrine_water" } }
};

elements.crushed_pills = {
    color: "#FFFFFF",
    behavior: behaviors.POWDER,
    category: "powders",
    reactions: { "water": { elem1: "pseudoephedrine_water" } }
};

elements.lab_glass = {
    color: "#AAAAFF",
    behavior: behaviors.SOLID,
    category: "solids",
    tempHigh: 2000,
    breakInto: ["glass_shard"],
    hardness: 1.0
};

elements.pseudoephedrine_water = {
    color: "#8B0000",
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: "pseudoephedrine"
};

elements.pseudoephedrine = {
    color: "#FFFF99",
    behavior: behaviors.POWDER,
    category: "powders",
    reactions: { "hydriodic_acid": { elem1: "methamphetamine_hydroiodide" } }
};

elements.iodine_solution = {
    color: "#800080",
    behavior: behaviors.LIQUID,
    category: "liquids",
    reactions: { "muriatic_acid": { elem1: "iodine" }, "hydrogen_peroxide": { elem1: "iodine" } },
    behaviorOnMix: ["purple_vapor"]
};

elements.iodine = {
    color: "#4B0082",
    behavior: behaviors.POWDER,
    category: "powders"
};

elements.muriatic_acid = {
    color: "#87CEFA",
    behavior: behaviors.LIQUID,
    category: "liquids"
};

elements.hydrogen_peroxide = {
    color: "#F0F8FF",
    behavior: behaviors.LIQUID,
    category: "liquids"
};

elements.red_phosphorus = {
    color: "#8B0000",
    behavior: behaviors.POWDER,
    category: "powders",
    reactions: { "water": { elem1: "phosphorus_water" } }
};

elements.phosphorus_water = {
    color: "#FF6347",
    behavior: behaviors.LIQUID,
    category: "liquids",
    reactions: { "iodine": { elem1: "hydriodic_acid", elem2: "phosphine_gas" } }
};

elements.hydriodic_acid = {
    color: "#FF4500",
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 300,
    stateHigh: "phosphine_gas"
};

elements.phosphine_gas = {
    color: "#FFA500",
    behavior: behaviors.GAS,
    category: "gases"
};

elements.methamphetamine_hydroiodide = {
    color: "#FF1493",
    behavior: behaviors.LIQUID,
    category: "liquids",
    reactions: { "sodium_hydroxide": { elem1: "meth_oil" } }
};

elements.meth_oil = {
    color: "#FFD700",
    behavior: behaviors.LIQUID,
    category: "liquids",
    reactions: { "ether": { elem1: "meth_base" } }
};

elements.meth_base = {
    color: "#FFA500",
    behavior: behaviors.LIQUID,
    category: "liquids",
    reactions: { "hcl_gas": { elem1: "watered_down_meth" } }
};

elements.watered_down_meth = {
    color: "#FFFFFF",
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: "white_meth"
};

elements.white_meth = {
    color: "#FFFFFF",
    behavior: behaviors.POWDER,
    category: "powders"
};

elements.sodium_hydroxide = {
    color: "#FFFFFF",
    behavior: behaviors.POWDER,
    category: "powders"
};

elements.ether = {
    color: "#E0FFFF",
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 35,
    stateHigh:"ether_vapor"
};

elements.ether_vapor = {
    color: "#AFEEEE",
    behavior: behaviors.GAS,
    category: "gases",
    reactions: { "fire": { elem1: "explosion" } }
};

elements.salt = {
    color: "#F5F5F5",
    behavior: behaviors.POWDER,
    category: "powders",
    reactions: { "sulfuric_acid": { elem1: "hcl_gas" } }
};

elements.hcl_gas = {
    color: "#87CEFA",
    behavior: behaviors.GAS,
    category: "gases"
};

elements.sulfuric_acid = {
    color: "#FFD700",
    behavior: behaviors.LIQUID,
    category: "liquids"
};

elements.aluminum = {
    color: "#C0C0C0",
    behavior: behaviors.POWDER,
    category: "powders",
    reactions: { "muriatic_acid": { elem1: "bubbling_gas" } }
};
