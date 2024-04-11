const elementTypes = [
    {
        name: "Oobleck",
        color: "#A67C52", // Brownish color similar to oobleck
        behavior: behaviors.LIQUID,
        viscosity: 3000, // Adjusted viscosity to mimic oobleck
        density: 1.6, // Density close to oobleck
        category: "liquids",
        state: "liquid"
    },
    {
        name: "Quicksand",
        color: "#D2B48C", // Light brown color similar to quicksand
        behavior: behaviors.LIQUID,
        viscosity: 4000, // Adjusted viscosity to mimic quicksand
        density: 1.7, // Density close to quicksand
        category: "liquids",
        state: "liquid"
    },
    {
        name: "Spider",
        color: "#404040", // Dark gray color for spider
        behavior: behaviors.SOLID, // Spider is a solid entity
        category: "entities",
        state: "solid"
    },
    {
        name: "SpiderWeb",
        color: "#FFFFFF", // White color for spiderweb
        behavior: behaviors.SOLID, // Spiderweb is a solid element
        category: "entities",
        state: "solid"
    },
    {
        name: "SpiderWebLiquid",
        color: "#CCCCCC", // Light gray color for liquid spiderweb
        behavior: behaviors.LIQUID, // Liquid spiderweb behaves like liquid
        viscosity: 6000, // Adjusted viscosity for stickiness
        density: 1.0, // Adjusted density for liquid spiderweb
        category: "liquids",
        state: "liquid"
    },
    {
        name: "Cocoon",
        color: "#FFCC66", // Light orange color for cocoon
        behavior: behaviors.SOLID, // Cocoon is a solid entity
        category: "entities",
        state: "solid"
    },
    {
        name: "Bog",
        color: "#336633", // Greenish color for bog
        behavior: behaviors.LIQUID,
        viscosity: 5000, // Adjusted viscosity for bog
        density: 1.4, // Adjusted density for bog
        category: "liquids",
        state: "liquid"
    },
    {
        name: "Mire",
        color: "#663300", // Dark brown color for mire
        behavior: behaviors.LIQUID,
        viscosity: 6000, // Adjusted viscosity for mire
        density: 1.8, // Adjusted density for mire
        category: "liquids",
        state: "liquid"
    },
    {
        name: "Mud",
        color: "#734A12", // Brown color for mud
        behavior: behaviors.LIQUID,
        viscosity: 4500, // Adjusted viscosity for mud
        density: 1.5, // Adjusted density for mud
        category: "liquids",
        state: "liquid"
    },
    {
        name: "Moor",
        color: "#8B4513", // Saddle brown color for moor
        behavior: behaviors.LIQUID,
        viscosity: 3500, // Adjusted viscosity for moor
        density: 1.4, // Adjusted density for moor
        category: "liquids",
        state: "liquid"
    },
    {
        name: "SinkingFlesh",
        color: "#8B0000", // Dark red color for sinking flesh
        behavior: behaviors.LIQUID,
        viscosity: 8000, // Adjusted viscosity for sinking flesh
        density: 2.0, // Adjusted density for sinking flesh
        category: "liquids",
        state: "liquid"
    },
    {
        name: "Sludge",
        color: "#4E4E4E", // Dark gray color for sludge
        behavior: behaviors.LIQUID,
        viscosity: 5500, // Adjusted viscosity for sludge
        density: 1.3, // Adjusted density for sludge
        category: "liquids",
        state: "liquid"
    },
    {
        name: "ThickOil",
        color: "#292421", // Dark brown color for thick oil
        behavior: behaviors.LIQUID,
        viscosity: 7000, // Adjusted viscosity for thick oil
        density: 1.9, // Adjusted density for thick oil
        category: "liquids",
        state: "liquid"
    },
    {
        name: "Lava",
        color: "#FF4500", // Orange-red color for lava
        behavior: behaviors.LIQUID,
        viscosity: 10000, // Adjusted viscosity for lava
        density: 2.5, // Adjusted density for lava
        category: "liquids",
        state: "liquid"
    },
    {
        name: "Silt",
        color: "#86775f", // Light brown color for silt
        behavior: behaviors.LIQUID,
        viscosity: 4000, // Adjusted viscosity for silt
        density: 1.3, // Adjusted density for silt
        category: "liquids",
        state: "liquid"
    },
    {
        name: "Clay",
        color: "#8B4513", // Brown color for clay
        behavior: behaviors.LIQUID,
        viscosity: 6000, // Adjusted viscosity for clay
        density: 1.8, // Adjusted density for clay
        category: "liquids",
        state: "liquid"
    },
    {
        name: "Slurry",
        color: "#695D4E", // Dark brown color for slurry
        behavior: behaviors.LIQUID,
        viscosity: 5500, // Adjusted viscosity for slurry
        density: 1.5, // Adjusted density for slurry
        category: "liquids",
        state: "liquid"
    }
];

// Function to create an element based on its type
function createElement(x, y, typeIndex) {
    const type = elementTypes[typeIndex];
    if (type.behavior === behaviors.LIQUID) {
        sandboxels.addLiquid(x, y, type.name, type.color, type.viscosity, type.density);
    } else {
        sandboxels.addEntity(x, y, type.name, type.color);
    }
}

// Function to move spider towards a target position
function moveSpiderTowardsTarget(spiderX, spiderY, targetX, targetY) {
    // Calculate direction towards target
    const dx = targetX - spiderX;
    const dy = targetY - spiderY;

    // Move spider towards target
    if (Math.abs(dx) > Math.abs(dy)) {
        spiderX += Math.sign(dx);
    } else {
        spiderY += Math.sign(dy);
    }

    // Update spider position
    sandboxels.moveEntity(spiderX, spiderY, spiderX, spiderY);
}

// Function to check if a position contains a human
function isHuman(x, y) {
    // Logic to check if a human is at position (x, y)
    // For demonstration purposes, returning false
    return false;
}

// Function for the spider to trap and cocoon a human if present
function trapAndCocoonHuman(spiderX, spiderY) {
    if (isHuman(spiderX, spiderY)) {
        // Remove human entity
        sandboxels.removeEntity(spiderX, spiderY);

        // Create cocoon at human position
        createElement(spiderX, spiderY, 5); // Creates a cocoon at human position
    }
}

// Example usage:
createElement(10, 10, 0); // Creates oobleck at position (10, 10)
createElement(20, 20, 1); // Creates quicksand at position (20, 20)
createElement(30, 30, 2); // Creates a spider at position (30, 30)
createElement(40, 40, 3); // Creates spiderweb at position (40, 40)
createElement(50, 50, 4); // Creates liquid spiderweb at position (50, 50)
createElement(60, 60, 5); // Creates a cocoon at position (60, 60)
createElement(70, 70, 6); // Creates bog at position (70, 70)
createElement(80, 80, 7); // Creates mire at position (80, 80)
createElement(90, 90, 8); // Creates mud at position (90, 90)
createElement(100, 100, 9); // Creates moor at position (100, 100)
createElement(110, 110, 10); // Creates sinking flesh at position (110, 110)
createElement(120, 120, 11); // Creates sludge at position (120, 120)
createElement(130, 130, 12); // Creates thick oil at position (130, 130)
createElement(140, 140, 13); // Creates lava at position (140, 140)

// Spider's initial position
let spiderX = 30;
let spiderY = 30;

// Human's position (for demonstration)
const humanX = 45;
const humanY = 45;

// Main loop for spider AI
setInterval(() => {
    // Move spider towards human
    moveSpiderTowardsTarget(spiderX, spiderY, humanX, humanY);
    
    // Trap and cocoon human if present
    trapAndCocoonHuman(spiderX, spiderY);
}, 1000); // Adjust interval as needed for desired spider movement speed
