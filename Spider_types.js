// Define different types of spiders for the third mod
const thirdModSpiders = [
    {
        name: "SlimeSpider",
        color: "#81cf63", // Slime spider color
        behavior: behaviors.LIQUID, // Slime spider behaves like liquid
        viscosity: 5000, // Slime spider viscosity
        category: "entities",
        state: "liquid",
        canTrap: true, // Slime spider can trap humans
        trap: function(humanX, humanY) {
            // Logic to trap a human with slime spider
            // Move the human onto the spider
            sandboxels.moveEntity(humanX, humanY, this.x, this.y);
            // Attach the human to the spider
            sandboxels.attachEntity(humanX, humanY, this.x, this.y);
        },
        carryCocoonedHuman: function(cocoonedHumanX, cocoonedHumanY) {
            // Logic to carry a cocooned human onto the spider's web
            // Move the cocooned human to the spider's position
            sandboxels.moveEntity(cocoonedHumanX, cocoonedHumanY, this.x, this.y);
            // Attach the cocooned human to the spider's web
            sandboxels.attachEntity(cocoonedHumanX, cocoonedHumanY, this.x, this.y);
        }
    },
    {
        name: "SapSpider",
        color: "#cda434", // Sap spider color
        behavior: behaviors.LIQUID, // Sap spider behaves like liquid
        viscosity: 7000, // Sap spider viscosity
        category: "entities",
        state: "liquid",
        canTrap: true, // Sap spider can trap humans
        trap: function(humanX, humanY) {
            // Logic to trap a human with sap spider
            // Check if the human is within range
            const distance = Math.sqrt((this.x - humanX) ** 2 + (this.y - humanY) ** 2);
            if (distance < 3) {
                // Move the human onto the spider
                sandboxels.moveEntity(humanX, humanY, this.x, this.y);
                // Attach the human to the spider
                sandboxels.attachEntity(humanX, humanY, this.x, this.y);
            }
        },
        carryCocoonedHuman: function(cocoonedHumanX, cocoonedHumanY) {
            // Logic to carry a cocooned human onto the spider's web
            // Move the cocooned human to the spider's position
            sandboxels.moveEntity(cocoonedHumanX, cocoonedHumanY, this.x, this.y);
            // Attach the cocooned human to the spider's web
            sandboxels.attachEntity(cocoonedHumanX, cocoonedHumanY, this.x, this.y);
        }
    },
    {
        name: "WebWeaverSpider",
        color: "#663399", // Web weaver spider color
        behavior: behaviors.SOLID, // Web weaver spider behaves like a solid entity
        category: "entities",
        state: "solid",
        canTrap: true, // Web weaver spider can trap humans
        trap: function(humanX, humanY) {
            // Logic to trap a human with web weaver spider
            // Move the human onto the spider
            sandboxels.moveEntity(humanX, humanY, this.x, this.y);
            // Attach the human to the spider
            sandboxels.attachEntity(humanX, humanY, this.x, this.y);
        },
        carryCocoonedHuman: function(cocoonedHumanX, cocoonedHumanY) {
            // Logic to carry a cocooned human onto the spider's web
            // Move the cocooned human to the spider's position
            sandboxels.moveEntity(cocoonedHumanX, cocoonedHumanY, this.x, this.y);
            // Attach the cocooned human to the spider's web
            sandboxels.attachEntity(cocoonedHumanX, cocoonedHumanY, this.x, this.y);
        }
    },
    {
        name: "JumpingSpider",
        color: "#000000", // Jumping spider color
        behavior: behaviors.LIQUID, // Jumping spider behaves like liquid
        viscosity: 5000, // Jumping spider viscosity
        category: "entities",
        state: "liquid",
        canTrap: true, // Jumping spider can trap humans
        trap: function(humanX, humanY) {
            // Logic to trap a human with jumping spider
            // Move the human onto the spider
            sandboxels.moveEntity(humanX, humanY, this.x, this.y);
            // Attach the human to the spider
            sandboxels.attachEntity(humanX, humanY, this.x, this.y);
        },
        carryCocoonedHuman: function(cocoonedHumanX, cocoonedHumanY) {
            // Logic to carry a cocooned human onto the spider's web
            // Move the cocooned human to the spider's position
            sandboxels.moveEntity(cocoonedHumanX, cocoonedHumanY, this.x, this.y);
            // Attach the cocooned human to the spider's web
            sandboxels.attachEntity(cocoonedHumanX, cocoonedHumanY, this.x, this.y);
        }
    },
    // Add more spiders here...
];

// Function to create a spider entity
function createSpider(x, y, type) {
    sandboxels.addLiquid(x, y, type.name, type.color, type.viscosity);
}

// Function to add spiders to the sandboxels environment
function addSpiders() {
    thirdModSpiders.forEach(spider => {
        createSpider(0, 0, spider);
    });
}

// Call the function to add spiders when the script is loaded
addSpiders();
