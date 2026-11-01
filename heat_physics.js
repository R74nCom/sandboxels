// Sandboxels Mod: Heat Physics (Heating Simulator)

// 1. Warm Water (50°C, lower density so it floats to the top)
elements.warm_water = {
    color: "#4da6ff",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 950,        // Lighter than cold water, making it rise
    temp: 50,           // Starts at 50 degrees Celsius
    tempLow: 30,        // When cooling down below 30 degrees...
    stateLow: "cold_water", // ...it turns into Cold Water
    viscosity: 1,
    desc: "Warm water (50°C). It is less dense than cold water, causing it to float to the top."
};

// 2. Cold Water (18°C, higher density so it sinks to the bottom)
elements.cold_water = {
    color: "#0066cc",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1050,       // Denser than warm water, making it sink
    temp: 18,           // Starts at 18 degrees Celsius
    tempHigh: 31,       // When heating up above 31 degrees...
    stateHigh: "warm_water", // ...it turns into Warm Water
    viscosity: 1,
    desc: "Cold water (18°C). It is denser than warm water, causing it to sink to the bottom."
};

// 3. Heater Element (To simulate your radiator or heating system)
elements.heater = {
    color: "#ff3333",
    behavior: behaviors.WALL,
    category: "machines",
    state: "solid",
    alwaysHeat: true,
    temp: 80,           // Constantly stays at 80 degrees Celsius
    desc: "A solid heating element that constantly radiates 80°C heat. Perfect for the bottom of your tank!"
};
