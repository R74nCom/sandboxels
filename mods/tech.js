elements.monitor_case = {
    color: "#4a4848",
    behavior: behaviors.SOLID,
    category: "tech",
    state: "solid",
    density: 500,
};

elements.pc_core = {
    color: "#f0cd43",
    behavior: [
        "XX|SH|XX",
        "SH|XX|SH",
        "XX|SH|XX",
    ],
    category: "tech",
    tempHigh: 8000,
    stateHigh: ["molten_steel","explosion","molten_iron"],
    reactions: {
        "poison": { elem1: "malfunctioned_wire", elem2: "null" },
        "salt_water": { elem1: "malfunctioned_wire", elem2: "null" },
	"water": { elem1: "explosion", elem2: "null" },
        "malware": { elem1: "null", elem2: "null" },
	},
	breakInto: ["rust", "electrogalvanized"],
};

elements.malfunctioned_wire = {
    color: "#6d32a8",
    behavior: behaviors.WALL,
    category: "tech",
    conduct: 999,
    noMix: true
};

elements.red_wire = {
    color: "#ff3d1f",
    behavior: behaviors.WALL,
    category: "tech",
    insulate: true,
    conduct: 1,
    noMix: true,
    reactions: {
        "acid": { elem1: "malfunctioned_wire", elem2: "null" },
        "poison": { elem1: "malfunctioned_wire", elem2: "null" },
        "salt_water": { elem1: "malfunctioned_wire", elem2: "null" },
	"water": { elem1: "malfunctioned_wire", elem2: "null" },
	},
	breakInto: ["plastic", "copper"],
};

elements.green_wire = {
    color: "#66c22d",
    behavior: behaviors.WALL,
    category: "tech",
    insulate: true,
    conduct: 1,
    noMix: true,
    reactions: {
        "acid": { elem1: "malfunctioned_wire", elem2: "null" },
        "poison": { elem1: "malfunctioned_wire", elem2: "null" },
        "salt_water": { elem1: "malfunctioned_wire", elem2: "null" },
	"water": { elem1: "malfunctioned_wire", elem2: "null" },
	},
	breakInto: ["plastic", "copper"],
};

elements.blue_wire = {
    color: "#1f81cc",
    behavior: behaviors.WALL,
    category: "tech",
    insulate: true,
    conduct: 1,
    noMix: true,
    reactions: {
        "acid": { elem1: "malfunctioned_wire", elem2: "null" },
        "poison": { elem1: "malfunctioned_wire", elem2: "null" },
	"water": { elem1: "malfunctioned_wire", elem2: "null" },
        "salt_water": { elem1: "malfunctioned_wire", elem2: "null" },
	},
	breakInto: ["plastic", "copper"],
};

elements.electrogalvanized = {
    color: "#6c6e70",
    behavior: behaviors.WALL,
    category: "tech",
    state: "solid",
    conduct: 2,
    density: 7850,
};

elements.nvidia_cpu = {
    color: "#76B900", // Nvidia's signature green color
    behavior: [
        "XX|SH|XX",
        "SH|XX|SH",
        "XX|SH|XX",
    ],
    category: "tech",
    temp: 25, // Starting temperature (room temperature in Celsius)
    tempHigh: 1000, // Melting point for realism
    stateHigh: "molten_silicon", // Assuming it melts into molten silicon
    reactions: {
        "water": { elem1: "short_circuit", elem2: "steam" },
        "salt_water": { elem1: "short_circuit", elem2: "null" },
        "acid": { elem1: "corroded_cpu", elem2: "null" },
        "poison": { elem1: "corroded_cpu", elem2: "null" },
    },
    breakInto: ["silicon", "metal_scrap"],
    conduct: 10, // Moderate conductivity
    density: 2330, // Density of silicon
    tick: function(pixel) {
        if (!pixel.heatTick) {
            pixel.heatTick = 0;
        }
        pixel.heatTick++;
        if (pixel.heatTick >= 300) { // 300 ticks ~ 5 seconds
            pixel.temp += 2; // Increase temperature by 2 degrees Celsius
            pixel.heatTick = 0; // Reset heatTick counter
        }
        
        // Check for cooling fan nearby
        let cooled = false;
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                let neighbor = pixelMap[pixel.x + dx]?.[pixel.y + dy];
                if (neighbor && neighbor.element === "spinning_cooler_fan") {
                    cooled = true;
                }
            }
        }

        if (cooled) {
            if (!pixel.coolTick) {
                pixel.coolTick = 0;
            }
            pixel.coolTick++;
            if (pixel.coolTick >= 300) { // 300 ticks ~ 5 seconds
                pixel.temp -= 2; // Decrease temperature by 2 degrees Celsius
                pixel.coolTick = 0; // Reset coolTick counter
            }
        } else {
            pixel.coolTick = 0; // Reset coolTick counter if no cooler is nearby
        }
    },
};


elements.molten_silicon = {
    color: "#ffcc99",
    behavior: behaviors.LIQUID,
    category: "states",
    state: "liquid",
    temp: 1414, // Melting point of silicon
    tempLow: 1414,
    stateLow: "silicon",
    density: 2570,
    viscosity: 100,
};

elements.short_circuit = {
    color: "#ff0000",
    behavior: behaviors.POWDER,
    category: "energy",
    temp: 100,
    state: "solid",
};

elements.corroded_cpu = {
    color: "#a0a0a0",
    behavior: behaviors.POWDER,
    category: "tech",
    tempHigh: 800,
    stateHigh: "ash",
    conduct: 1,
};

elements.silicon = {
    color: "#f0f0f0",
    behavior: behaviors.SOLID,
    category: "solids",
    tempHigh: 1414,
    stateHigh: "molten_silicon",
    density: 2330,
};

elements.glowing_rainbow_led = {
    color: ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#8B00FF"], // Colors of the rainbow
    behavior: [
        "XX|XX|XX",
        "XX|SH|XX",
        "XX|XX|XX",
    ],
    category: "tech",
    state: "solid",
    density: 300, // Arbitrary density for LED
    tempHigh: 150, // Melting point for realism
    stateHigh: "molten_plastic",
    reactions: {
        "water": { elem1: "short_circuit", elem2: "steam" },
        "salt_water": { elem1: "short_circuit", elem2: "null" },
        "acid": { elem1: "corroded_led", elem2: "null" },
        "poison": { elem1: "corroded_led", elem2: "null" },
    },
    tick: function(pixel) {
        // Function to cycle through colors
        if (!pixel.colorIndex) {
            pixel.colorIndex = 0; // Initialize color index
        }
        pixel.colorIndex = (pixel.colorIndex + 1) % elements.glowing_rainbow_led.color.length;
        pixel.color = elements.glowing_rainbow_led.color[pixel.colorIndex];
    },
};

elements.corroded_led = {
    color: "#707070",
    behavior: behaviors.POWDER,
    category: "tech",
    tempHigh: 800,
    stateHigh: "ash",
    conduct: 1,
};

elements.spinning_cooler_fan = {
    color: "#4a90e2", // Blue color for the fan
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    category: "tech",
    state: "solid",
    density: 800, // Arbitrary density for the fan
    tick: function(pixel) {
        // Define movement pattern
        if (!pixel.moveStep) {
            pixel.moveStep = 0; // Initialize movement step
        }
        
        // Determine the current movement direction
        let directions = [
            {dx: 0, dy: -1},  // Move up
            {dx: 1, dy: 0},   // Move right
            {dx: 0, dy: 1},   // Move down
            {dx: -1, dy: 0}   // Move left
        ];
        
        let move = directions[pixel.moveStep];
        
        // Attempt to move in the current direction
        let newX = pixel.x + move.dx;
        let newY = pixel.y + move.dy;
        
        if (isEmpty(newX, newY)) {
            // If the next position is empty, move there
            movePixel(pixel, newX, newY);
        }
        
        // Advance to the next step in the movement pattern
        pixel.moveStep = (pixel.moveStep + 1) % directions.length;
    },
};

function isEmpty(x, y) {
    // Check if the position (x, y) is empty
    if (x >= 0 && y >= 0 && x < width && y < height) {
        return !pixelMap[x][y];
    }
    return false;
}

function movePixel(pixel, newX, newY) {
    // Move the pixel to the new position
    if (isEmpty(newX, newY)) {
        pixelMap[pixel.x][pixel.y] = null; // Clear the current position
        pixel.x = newX;
        pixel.y = newY;
        pixelMap[newX][newY] = pixel; // Set the new position
    }
}
