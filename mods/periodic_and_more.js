
elements.beryllium = {
    color: "#b3b3b3",
    behavior: behaviors.WALL,
    category: "solids",
    viscosity: 100000,
    state: "solid",
    density: 720,
    reactions: {
        water: {elem1: "beryllium", elem2: "dirty_water"}
    }
};

 elements.galinstan = {
     color: "#a9a9a9",
     behavior: behaviors.LIQUID,
     category: "liquids",
     viscosity: 26,
     state: "liquid",
     density: 0.026
 };
     

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

elements.sand_exploder = {
    color: "#ff0000",
    tool: function(pixel) {
        if (pixel.element == "sand") {
            pixel.element = "explosion"
        }
    },
    category: "tools",
};

if (!elements.water.reactions) { // Include this block once
    elements.water.reactions = {} // This creates the property if it doesn't exist
}
elements.water.reactions.mayo = { "elem1":null, "elem2":"mayo_water" }
elements.water.reactions.soap = { "elem1":null, "elem2":"soapy_water" }

// Run after all mods are loaded, for cross-mod compatibility
runAfterLoad(function() {
    
    console.log("Hello World!");
});

// Creating eLists:
eLists.PERIODIC = ["beryllium", "scandium", "vanadium", "manganese", "cobalt"]
