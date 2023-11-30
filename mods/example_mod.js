// This is how to add a new mod to the game.

// Create a new Javascript file like this one.
// Add the file to the mods folder on GitHub, or host it somewhere else.
// https://github.com/R74nCom/sandboxels/tree/main/mods

// To add it in the Mod Loader:
// If it is in the mods folder, you can just use the name of the file.
// If it is hosted somewhere else, you can use the full URL, including the HTTPS://.

// Adding elements:
elements.mayo = {
    color: "#ffffff",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 100000,
    state: "liquid",
    density: 720,
};

// Changing existing elements:
elements.water.color = "#ff0000";
elements.water.behavior = behaviors.WALL;

// Removing elements:
// Be aware, things may break
delete elements.ketchup;

// Adding behavior presets:
behaviors.SELFDELETE = [
    "XX|XX|XX",
    "XX|DL|XX",
    "XX|XX|XX",
];

// Raw JavaScript behaviors:
behaviors.mud.tick = function(pixel) {
    if (tryMove(pixel, pixel.x, pixel.y+1)) {
        console.log("Moved!");
    }
    else {
        console.log("Couldn't move!")
    }
};

// Create a new tool:
elements.sand_exploder = {
    color: "#ff0000",
    tool: function(pixel) {
        if (pixel.element == "sand") {
            pixel.element = "explosion"
        }
    },
    category: "tools",
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
eLists.CONDIMENT = ["ketchup","melted_cheese","mayo"];
// Adding elements to eLists:
eLists.CONDIMENT.push("honey");

