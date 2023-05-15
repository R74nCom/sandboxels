elements.liquid_legend = {

    color: "#13d644",

    behavior: behaviors.LIQUID,

    category: "energyliquids",

    viscosity: 43,

    state: "liquid",

    density: 720,

};

behaviors.liquid_legend.tick = function(pixel) {

    if (tryMove(pixel, pixel.x, pixel.y+1)) {

        console.log("Moved!");

    }

    else {

        console.log("Couldn't move!")

    }

};

if (!elements.liquid_legend.reactions) {

    elements.liquid_legend.reactions = {}

}

elements.liquid_legend.reactions.magma = { "elem1":null, "elem2":"armageddon" }

elements.liquid_legend.reactions.radiation = { "elem1":null, "elem2":"fallout" }

AfterLoad(function() {

    6766

    console.log("Hello World!");

});

if (enabledMods.includes("test.js")) {

    runAfterLoad(function() {

        6766

        console.log("Hello World!");

    });

}
