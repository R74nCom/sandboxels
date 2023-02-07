

// Adding elements:
elements.steaming_water = {
    color: "#87CEEB",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 200000,
    state: "liquid",
    density: 720,
};

// Changing existing elements:
elements.water.color = "#87CEEB";
elements.water.behavior = behaviors.WALL;

// Removing elements:
// Be aware, things may break



// Adding behavior presets:
behaviors.S

// Raw JavaScript behaviors:
behaviors.mud.tick = function(pixel) {
    if (tryMove(pixel, pixel.x, pixel.y+1)) {
        console.log("Moved!");
    }
    else {
        console.log("Couldn't move!")
    }
};

// Add reactions to existing elements
if (!elements.water.reactions) { // Include this block once
    elements.water.reactions = {} // This creates the property if it doesn't exist
}
elements.water.reactions.mayo = { "elem1":null, "elem2":"mayo_water" }
elements.water.reactions.soap = { "elem1":null, "elem2":"soapy_water" }

// Run after all mods are loaded, for cross-mod compatibility
runAfterLoad(function() {
    // Your code here
    console.log("Hello World!");
});

// Run if another mod is active
if (enabledMods.includes("test.js")) {

    runAfterLoad(function() {
        // Your code here
        console.log("Hello World!");
    });
}

// Creating eLists:
eLists.STREAMING = [];
// Adding elements to eLists:
eLists.STEAMING.push("steaming water");
