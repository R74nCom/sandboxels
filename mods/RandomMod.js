elements.hot_liquid = {
        color: ["#0008ff", "#242bff", "#454bff"],
        behavior: behaviors.LIQUID,
        category: "liquids", 
        state: "liquid",
        temp: 200,
      tempHigh: 400,
      stateHigh: "steam"
    };

     elements.hot_liquid.reactions = {
      "mercury": { elem1: null, elem2: "gold" },
      "acid": { elem1: "explosion", elem2: "explosion" },
      "super_acid": { elem1: null, elem2: "supernova"}
   };

elements.super_acid = {
    color: ["#00ff22", "#00b318", "#00660e"],
    behavior: [
        ["XX", "XX", "XX"],
        ["DL", "XX", "DL"],
        ["M2", "DL", "M2"] 
    ],
    category: "liquids",
    state: "liquid",
    density: 1500,
};

elements.super_acid.reactions = {
    "glass": { elem1: "super_acid", elem2: null }, 
    "wall": { elem1: "super_acid", elem2: null }
};

elements.durable_ice = {
        color: ["#02b5b5", "#1bcccc", "#72cccc", "#97dbdb"],
        behavior: behaviors.WALL,
        category: "solids",
        state: "solid",
        temp: -4000,
        tempHigh: 200,
        stateHigh: "water",
        strokeColor: "#d3e6e6"
};

elements.durable_ice.reactions = {
        "magma": { elem1: "durable_ice", elem2: "basalt"},
        "fire": { elem1: "durable_ice", elem2: "smoke" },
        "laser": { elem1: "durable_ice", elem2: "radiation" },
        "lightning": { elem1: "explosion", elem2: "explosion" }
};

elements.low_density = {
        color: ["#ffae00", "#ffc23d", "#ffd373", "#ffdc91", "#ffffff"],
        behavior: behaviors.LIQUID,
        category: "liquids",
        state: "liquid",
        temp: 20,
        density: 0.01
};

elements.low_density.reactions = {
        "high_density": { elem1: null, elem2: "average_density" }
};

elements.high_density = {
        color: ["#55ff00", "#81ff42", "#9eff6e", "#b9ff96", "#ffffff"],
        behavior: behaviors.LIQUID,
        category: "liquids",
        state: "liquid",
        temp: 20,
        density: 500
};
                
elements.average_density = {
        color: ["#7700ff", "#8f2eff", "#d3ff82", "#a75ffa", "#6c3bff"],
        behavior: behaviors.LIQUID,
        category: "states",
        state: "liquid",
        temp: 20,
        density: 250
};
