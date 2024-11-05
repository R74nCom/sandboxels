// This is how to add a new mod to the game.

// Create a new Javascript file like this one.
// Add the file to the mods folder on GitHub, or host it somewhere else.
// https://github.com/R74nCom/sandboxels/tree/main/mods

// To add it in the Mod Loader:
// If it is in the mods folder, you can just use the name of the file.
// If it is hosted somewhere else, you can use the full URL, including the HTTPS://.

// Adding elements:
elements.dried_blood = {
    color: "#8A0303",
    behavior: behaviors.POWDER,
    category: "War",
   // viscosity: 100000,
    state: "liquid",
    density: 720,
};

elements.proximity_mine ={
  color: "ffffff",
  behavior: behaviours.AGPOWDER,
  category: "War",
 // viscosity: 1000000
  state: "solid",
  density:720,
}

// Changing existing elements:
//elements.water.color = "#ff0000";
//elements.water.behavior = behaviors.WALL;

// Removing elements:
// Be aware, things may break
//delete elements.ketchup;

// Adding behavior presets:
behaviors.SELFDELETE = [
    "XX|XX|XX",
    "XX|DL|XX",
    "XX|XX|XX",
];

// Raw JavaScript behaviors:
behaviors.proximity_mine.tick = function(pixel) {
    if (tryMove(pixel, pixel.x, pixel.y+1)) {
        pixel.element="explosion";
    }
    else {
        pixel.element="explosion";
    }
};

// Create a new tool:
elements.grenade = {
    color: "#ff0000",
    tool: function(pixel) {
        if (pixel.element != "water") {
            pixel.element = "explosion"
        }
    },
    category: "tools",
};

// Add reactions to existing elements
if (!elements.water.reactions) { // Include this block once
    elements.water.reactions = {} // This creates the property if it doesn't exist
}
if (!elements.dried_blood.reactions){
  elements.dried_blood.reactions = {}
}
elements.water.reactions.mayo = { "elem1":null, "elem2":"mayo_water" }
elements.water.reactions.soap = { "elem1":null, "elem2":"soapy_water" }
elements.dried_blood.reactions.water = {"elem2":null, "elem2":"blood"}
// Run after all mods are loaded, for cross-mod compatibility
runAfterLoad(function() {
    // Your code here
   /* int t = 5;
    if (if t>=0){
      t=t-1;
      console.log("HI SOLIDER")
    }*/
    console.log("Hello World!");
});

// Run if another mod is active
if (enabledMods.includes("mods/test.js")) {
    runAfterLoad(function() {
        // Your code here
        console.log("Hello World!");
    });
}

// Creating eLists:
eLists.CONDIMENT = ["ketchup","melted_cheese","mayo"];
// Adding elements to eLists:
eLists.CONDIMENT.push("honey");
