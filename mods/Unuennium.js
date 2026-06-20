var modName = "mods/ununennium.js";
var libraryMod = "mods/code_library.js";

if (enabledMods.includes(libraryMod)) {

    elements.ununennium = {
        color: "#d1d1ff", // pale bluish tone
        behavior: behaviors.LIQUID,
        reactions: {
            "hydrogen": { elem1: "oxygen", elem2: null }
        },
        tempHigh: -156, // Celsius
        stateHigh: "gaseous_ununennium",
        tempLow: -231,
        stateLow: "solid_ununennium",
        category: "liquids",
        state: "liquid",
        density: 13500, // Heavy synthetic element
    };

    elements.solid_ununennium = {
        color: "#a8a8ff",
        behavior: behaviors.SOLID,
        temp: -232,
        category: "solids",
        state: "solid",
        density: 13800,
        hidden: true
    };

    elements.gaseous_ununennium = {
        color: "#e0e0ff",
        behavior: behaviors.GAS,
        temp: -155,
        category: "gases",
        state: "gas",
        density: 0.05,
        hidden: true
    };

}
