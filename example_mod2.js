// To create a mod:
// Create a new Javascript file like this one.
// Add the file to the mods folder on GitHub, or host it somewhere else.
// https://github.com/R74nCom/sandboxels/tree/main/mods

// To learn about modding, check the wiki: https://sandboxels.wiki.gg/wiki/Modding
// Or join our Discord: https://r74n.com/discord/

// To add it in the Mod Manager:
// If it is in the mods folder, you can just use the name of the file. (example_mod.js)
// If it is hosted somewhere else, you can use the full URL, including the HTTPS://.

// Adding elements:
elements.mustard = {
    color: "#ffff00",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1100,
    viscosity: 60000,
}

// Changing existing elements:
elements.water.color = "#ff0000";
elements.water.behavior = behaviors.WALL;

// Removing elements:
// Be aware, things may break
delete elements.ketchup;

// Custom behaviors:
elements.blue_sand = {
    color: "#0000ff",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2"
    ],
    category: "land",
    state: "solid"
}

// Raw JavaScript behaviors:
elements.mud.tick = function(pixel) {
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

// Reactions:
elements.sugar_stick = {
    color: "#ffffff",
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "water": { elem1:null, elem2:"sugar_water", chance:0.1 },
        "salt_water": { elem1:null, elem2:"sugar_water", chance:0.1 }
    },
    state: "solid",
    density: 1580
}

// Add reactions to existing elements:
// Include this block once to ensure the property exists
if (!elements.water.reactions) elements.water.reactions = {};
elements.water.reactions.mustard = { "elem1":null, "elem2":"mustard_water" };
elements.water.reactions.soap = { "elem1":null, "elem2":"soapy_water" };

// Custom element renderers:
elements.ball.renderer = function(pixel,ctx) {
    // Draw three horizontal squares
    drawSquare(ctx,"#00ff00",pixel.x-1,pixel.y);
    drawSquare(ctx,"#00ff00",pixel.x,pixel.y);
    drawSquare(ctx,"#00ff00",pixel.x+1,pixel.y);
};
// See 1.10example.js for more rendering examples.
