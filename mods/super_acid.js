// 1. The Liquid Form
elements.super_acid = {
    color: "#b000ff", // Neon magenta
    behavior: [
        "XX|XX|XX",
        "CH:vanish|XX|CH:vanish", // Deletes elements to the sides
        "M2|M1|M2"                // Flows like liquid
    ],
    category: "liquids",
    state: "liquid",
    temp: 1000000,
    insulate: true, // Insulated so it only changes via tools
    tempLow: -273.15,
    stateLow: "super_acid_ice",
    tick: function(pixel) {
        if (pixel.temp === undefined) { pixel.temp = 1000000; }
        
        let neighbors = [
            [-1, 0], [1, 0], [0, -1], [0, 1] // Left, Right, Up, Down
        ];
        for (let i = 0; i < neighbors.length; i++) {
            let nX = pixel.x + neighbors[i][0];
            let nY = pixel.y + neighbors[i][1];
            if (!isEmpty(nX, nY, true)) {
                let neighborPixel = pixelMap[nX][nY];
                neighborPixel.temp = pixel.temp; 
            }
        }
    }
};

// 2. The Ice Form (No Insulation)
elements.super_acid_ice = {
    color: "#dcb0ff", // Frosty magenta
    behavior: behaviors.POWDER, // Brittle: falls and crumbles like dust
    category: "solids",
    state: "solid",
    density: 1500,
    hardness: 0.01,            // Low hardness makes it very brittle
    temp: -273.15,             // Spawns at absolute zero
    tempHigh: -273.14,         // Melts if heated past absolute zero
    stateHigh: "super_acid"    // Turns back into the liquid
};
