// Define different element types
const elementTypes = [
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
        name: "SpiderNest",
        color: "#8B4513", // Brown color for spider nest
        behavior: behaviors.SOLID, // Spider nest is a solid entity
        category: "entities",
        state: "solid"
    },
    {
        name: "SpiderFood",
        color: "#996633", // Brownish color for spider food
        behavior: behaviors.LIQUID, // Spider food behaves like liquid
        viscosity: 3000, // Adjusted viscosity for spider food
        density: 1.2, // Adjusted density for spider food
        category: "liquids",
        state: "liquid"
    },
    {
        name: "BabySpider",
        color: "#808080", // Gray color for baby spider
        behavior: behaviors.SOLID, // Baby spider is a solid entity
        category: "entities",
        state: "solid"
    },
    {
        name: "SpiderEgg",
        color: "#E6E6E6", // Light gray color for spider egg
        behavior: behaviors.SOLID, // Spider egg is a solid entity
        category: "entities",
        state: "solid"
    },
    {
        name: "StickySlime",
        color: "#99CCFF", // Light blue color for sticky slime
        behavior: behaviors.LIQUID, // Sticky slime behaves like liquid
        viscosity: 5000, // Adjusted viscosity for stickiness
        density: 1.1, // Adjusted density for sticky slime
        category: "liquids",
        state: "liquid"
    },
    {
        name: "SlimeWeb",
        color: "#99FF99", // Light green color for slime web
        behavior: behaviors.SOLID, // Slime web is a solid element
        category: "entities",
        state: "solid"
    },
    {
        name: "SlimeWebLiquid",
        color: "#99FF99", // Light green color for liquid slime web
        behavior: behaviors.LIQUID, // Liquid slime web behaves like liquid
        viscosity: 4000, // Adjusted viscosity for stickiness
        density: 1.0, // Adjusted density for liquid slime web
        category: "liquids",
        state: "liquid"
    }
    // Additional spider web-related elements can be added here
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

// Function to check if a position contains a target entity
function isTarget(x, y, targetType) {
    // Logic to check if the target entity is at position (x, y)
    // For demonstration purposes, returning false
    return false;
}

// Function to handle spider AI behaviors
function spiderAI(spiderX, spiderY) {
    // Check if there's a target entity nearby (e.g., a cocoon)
    if (isTarget(spiderX + 1, spiderY, "Cocoon") || isTarget(spiderX - 1, spiderY, "Cocoon") ||
        isTarget(spiderX, spiderY + 1, "Cocoon") || isTarget(spiderX, spiderY - 1, "Cocoon")) {
        // If a cocoon is nearby, the spider will move towards it
        moveSpiderTowardsTarget(spiderX, spiderY, cocoonX, cocoonY);
        
        // Make humans wiggle in the cocoon
        wiggleHumansInCocoon(cocoonX, cocoonY);
    } else {
        // Otherwise, the spider randomly moves around its nest (e.g., SpiderNest)
        const direction = Math.floor(Math.random() * 4); // Random direction (0: up, 1: down, 2: left, 3: right)
        switch (direction) {
            case 0:
                moveSpiderTowardsTarget(spiderX, spiderY, spiderX, spiderY - 1); // Move up
                break;
            case 1:
                moveSpiderTowardsTarget(spiderX, spiderY, spiderX, spiderY + 1); // Move down
                break;
            case 2:
                moveSpiderTowardsTarget(spiderX, spiderY, spiderX - 1, spiderY); // Move left
                break;
            case 3:
                moveSpiderTowardsTarget(spiderX, spiderY, spiderX + 1, spiderY); // Move right
                break;
        }
    }
}

// Function to make humans wiggle in the cocoon
function wiggleHumansInCocoon(cocoonX, cocoonY) {
    // Logic to wiggle humans inside the cocoon
    // For demonstration purposes, we will randomly move them within the cocoon
    const numHumans = sandboxels.countEntities(cocoonX, cocoonY, "Human"); // Count humans in the cocoon
    for (let i = 0; i < numHumans; i++) {
        const xOffset = Math.floor(Math.random() * 3) - 1; // Random offset (-1, 0, or 1) for x-axis
        const yOffset = Math.floor(Math.random() * 3) - 1; // Random offset (-1, 0, or 1) for y-axis
        sandboxels.moveEntity(cocoonX, cocoonY, cocoonX + xOffset, cocoonY + yOffset);
    }
}

// Example usage:
createElement(30, 30, 0); // Creates a spider at position (30, 30)
createElement(40, 40, 1); // Creates spiderweb at position (40, 40)
createElement(50, 50, 4); // Creates a spider nest at position (50, 50)
createElement(60, 60, 8); // Creates spider egg at position (60, 60)
createElement(70, 70, 9); // Creates sticky slime at position (70, 70)
createElement(80, 80, 10); // Creates slime web at position (80, 80)
createElement(90, 90, 11); // Creates liquid slime web at position (90, 90)

// Spider's initial position
let spiderX = 30;
let spiderY = 30;

// Cocoon's position (for demonstration)
const cocoonX = 60;
const cocoonY = 60;

// Main loop for spider AI
setInterval(() => {
    // Perform spider AI behavior
    spiderAI(spiderX, spiderY);
}, 1000); // Adjust interval as needed for desired spider movement speed
