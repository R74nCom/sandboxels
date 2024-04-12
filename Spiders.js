// Define the elements for your mod
elements.spider = {
    color: "#404040", // Dark gray color for spider
    behavior: behaviors.SOLID, // Spider is a solid entity
    category: "entities",
    state: "solid"
};

elements.cocoon = {
    color: "#FFCC66", // Light orange color for cocoon
    behavior: behaviors.SOLID, // Cocoon is a solid entity
    category: "entities",
    state: "solid"
};

elements.spider_nest = {
    color: "#8B4513", // Brown color for spider nest
    behavior: behaviors.SOLID, // Spider nest is a solid entity
    category: "entities",
    state: "solid"
};

elements.spider_food = {
    color: "#996633", // Brownish color for spider food
    behavior: behaviors.LIQUID, // Spider food behaves like liquid
    viscosity: 3000, // Adjusted viscosity for spider food
    density: 1.2, // Adjusted density for spider food
    category: "liquids",
    state: "liquid"
};

elements.baby_spider = {
    color: "#808080", // Gray color for baby spider
    behavior: behaviors.SOLID, // Baby spider is a solid entity
    category: "entities",
    state: "solid"
};

elements.spider_egg = {
    color: "#E6E6E6", // Light gray color for spider egg
    behavior: behaviors.SOLID, // Spider egg is a solid entity
    category: "entities",
    state: "solid"
};

elements.sticky_slime = {
    color: "#99CCFF", // Light blue color for sticky slime
    behavior: behaviors.LIQUID, // Sticky slime behaves like liquid
    viscosity: 5000, // Adjusted viscosity for stickiness
    density: 1.1, // Adjusted density for sticky slime
    category: "liquids",
    state: "liquid"
};

elements.slime_web = {
    color: "#99FF99", // Light green color for slime web
    behavior: behaviors.SOLID, // Slime web is a solid element
    category: "entities",
    state: "solid"
};

elements.slime_web_liquid = {
    color: "#99FF99", // Light green color for liquid slime web
    behavior: behaviors.LIQUID, // Liquid slime web behaves like liquid
    viscosity: 4000, // Adjusted viscosity for stickiness
    density: 1.0, // Adjusted density for liquid slime web
    category: "liquids",
    state: "liquid"
};

// Second mod spider web-related elements
elements.thick_spider_web = {
    color: "#A9A9A9", // Dark gray color for thick spider web
    behavior: behaviors.SOLID, // Thick spider web is a solid element
    category: "entities",
    state: "solid"
};

elements.thin_spider_web = {
    color: "#D3D3D3", // Light gray color for thin spider web
    behavior: behaviors.SOLID, // Thin spider web is a solid element
    category: "entities",
    state: "solid"
};

elements.gooey_web = {
    color: "#FFD700", // Gold color for gooey web
    behavior: behaviors.LIQUID, // Gooey web behaves like liquid
    viscosity: 8000, // Adjusted viscosity for stickiness
    density: 1.2, // Adjusted density for gooey web
    category: "liquids",
    state: "liquid"
};

elements.sticky_cobweb = {
    color: "#DAA520", // Goldenrod color for sticky cobweb
    behavior: behaviors.SOLID, // Sticky cobweb is a solid element
    category: "entities",
    state: "solid"
};

elements.silk_thread = {
    color: "#FFDAB9", // Peachpuff color for silk thread
    behavior: behaviors.SOLID, // Silk thread is a solid element
    category: "entities",
    state: "solid"
};

elements.stretchy_web = {
    color: "#DDA0DD", // Plum color for stretchy web
    behavior: behaviors.LIQUID, // Stretchy web behaves like liquid
    viscosity: 6000, // Adjusted viscosity for stickiness
    density: 1.1, // Adjusted density for stretchy web
    category: "liquids",
    state: "liquid"
};

elements.shimmering_web = {
    color: "#00CED1", // Dark turquoise color for shimmering web
    behavior: behaviors.SOLID, // Shimmering web is a solid element
    category: "entities",
    state: "solid"
};

// Define reactions between elements
elements.spider_web.reactions = {
    "human": { elem1: "cocoon", elem2: null } // When spider web touches a human, it creates a cocoon
};

// Function to move a spider towards a target position
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
    if (isTarget(spiderX + 1, spiderY, "cocoon") || isTarget(spiderX - 1, spiderY, "cocoon") ||
        isTarget(spiderX, spiderY + 1, "cocoon") || isTarget(spiderX, spiderY - 1, "cocoon")) {
        // If a cocoon is nearby, the spider will move towards it
        moveSpiderTowardsTarget(spiderX, spiderY, cocoonX, cocoonY);

        // Add more behavior here, such as trapping humans in cocoons or other actions
    } else {
        // Otherwise, the spider randomly moves around its nest (e.g., spider_nest)
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

// Function to handle AI behaviors for all entities in the mod
function handleAI() {
    // Example: Get all spider entities and call spiderAI function for each one
    const spiderEntities = sandboxels.getEntitiesOfType("spider");
    spiderEntities.forEach(spider => {
        spiderAI(spider.x, spider.y);
    });

    // Add more AI behavior handling for other entities as needed
}

// Call the function to handle AI behaviors periodically
setInterval(handleAI, 100); // Adjust the interval as needed for smoother or more frequent AI updates

// Define the human control tool
const humanControlTool = {
    // Function to handle mouse down event
    onMouseDown: function(x, y) {
        // Check if there's a human entity at the clicked position
        const clickedEntity = sandboxels.getEntityAt(x, y);
        if (clickedEntity && clickedEntity.type === "human") {
            // Set the selected human entity for control
            this.selectedHuman = clickedEntity;
            this.isMouseDown = true;
        }
    },

    // Function to handle mouse move event
    onMouseMove: function(x, y) {
        // If mouse is down and a human is selected for control
        if (this.isMouseDown && this.selectedHuman) {
            // Move the selected human to the mouse position
            sandboxels.moveEntity(this.selectedHuman.x, this.selectedHuman.y, x, y);
        }
    },

    // Function to handle mouse up event
    onMouseUp: function(x, y) {
        // Reset selected human and mouse down flag
        this.selectedHuman = null;
        this.isMouseDown = false;
    }
};

// Register the human control tool with Sandboxels
sandboxels.registerTool("human_control", humanControlTool);

// Enable the human control tool when the mod is loaded
sandboxels.setTool("human_control");

// Debugging:
console.log("Mod loaded successfully!");
