// Define a new plant
function createGrowingPlant() {
    const plant = {
        type: "plant",
        color: [0, 255, 0], // Green color
        spreadRate: 0.2, // Rate at which the plant spreads
    };

    // Handle plant growth in contact with water
    function onWaterTouch() {
        if (this.type === "seed" && this.nearWater()) {
            this.type = "plant"; // Seed turns into a plant when in contact with water
            this.color = [0, 255, 0]; // Turn the seed green
        }
    }

    // Check if the element is near water
    plant.nearWater = function() {
        const neighbors = this.getNeighbors();
        return neighbors.some(neighbor => neighbor.type === "water");
    };

    // Update plant state
    plant.update = function() {
        if (this.type === "plant" && this.nearWater()) {
            this.spread(); // Spread if near water
        }
    };

    // Plant spreading behavior
    plant.spread = function() {
        const emptyNeighbors = this.getEmptyNeighbors();
        if (emptyNeighbors.length > 0) {
            const newPlant = this.createNewElement("plant");
            newPlant.position = emptyNeighbors[Math.floor(Math.random() * emptyNeighbors.length)].position;
            newPlant.color = this.color;
            newPlant.spreadRate = this.spreadRate;
        }
    };

    return plant;
}

// Add the plant to the game's element system
const plant = createGrowingPlant();

// Add the plant as a seed in the game's life category
addElement("seed", plant);

// Now, seeds placed next to water will grow into plants and spread
