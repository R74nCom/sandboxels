// Dosa Element
sandbox.addElement({
    name: 'Dosa',
    category: 'Food',
    color: '#FFE4B5', // Light brown color for cooked dosa
    behavior: [
        "ELEMENT.DRAGGABLE",
        "ELEMENT.EDIBLE"
    ],
    properties: {
        taste: 'savory',
        calories: 200
    }
});

// Idli Element
sandbox.addElement({
    name: 'Idli',
    category: 'Food',
    color: '#F5F5F5', // White color for cooked idli
    behavior: [
        "ELEMENT.DRAGGABLE",
        "ELEMENT.EDIBLE"
    ],
    properties: {
        taste: 'mild',
        calories: 100
    }
});

// Chapathi Element
sandbox.addElement({
    name: 'Chapathi',
    category: 'Food',
    color: '#D2B48C', // Tan color for chapathi
    behavior: [
        "ELEMENT.DRAGGABLE",
        "ELEMENT.EDIBLE"
    ],
    properties: {
        taste: 'savory',
        calories: 180
    }
});

// Samosa Element
sandbox.addElement({
    name: 'Samosa',
    category: 'Food',
    color: '#A52A2A', // Brown color for fried samosa
    behavior: [
        "ELEMENT.DRAGGABLE",
        "ELEMENT.EDIBLE",
        "ELEMENT.SMASHABLE"  // Custom behavior to handle smashing
    ],
    properties: {
        taste: 'spicy',
        calories: 150
    },
    onSmash: function() {
        // Release existing Potato and Flour, along with Spices
        sandbox.addElementInstance('Potato', this.x, this.y);
        sandbox.addElementInstance('Flour', this.x + 10, this.y);
        sandbox.addElementInstance('Spices', this.x - 10, this.y);
        
        // Remove the smashed Samosa element
        sandbox.removeElementInstance(this);
    }
});

// Dosa Batter Element
sandbox.addElement({
    name: 'Dosa Batter',
    category: 'Food',
    color: '#FFF5E1', // Light color for dosa batter
    behavior: [
        "ELEMENT.DRAGGABLE",
        "ELEMENT.LIQUID", // Represent batter as a liquid-like element
        "ELEMENT.HEATABLE" // Custom behavior for heating reaction
    ],
    properties: {
        taste: 'raw',
        calories: 150
    },
    onHeat: function() {
        // Transform dosa batter into dosa when heated
        sandbox.addElementInstance('Dosa', this.x, this.y);
        
        // Remove the batter element once it has turned into dosa
        sandbox.removeElementInstance(this);
    }
});

// Idli Batter Element
sandbox.addElement({
    name: 'Idli Batter',
    category: 'Food',
    color: '#E0E0E0', // Light grey color for idli batter
    behavior: [
        "ELEMENT.DRAGGABLE",
        "ELEMENT.LIQUID", // Represent batter as a liquid-like element
        "ELEMENT.HEATABLE" // Custom behavior for heating reaction
    ],
    properties: {
        taste: 'raw',
        calories: 100
    },
    onHeat: function() {
        // Transform idli batter into idli when heated
        sandbox.addElementInstance('Idli', this.x, this.y);
        
        // Remove the batter element once it has turned into idli
        sandbox.removeElementInstance(this);
    }
});

// Additional element for Spices
sandbox.addElement({
    name: 'Spices',
    category: 'Ingredient',
    color: '#FFD700', // Yellow color for spices
    behavior: ["ELEMENT.POWDER", "ELEMENT.DRAGGABLE"]
});

// Curry Element
sandbox.addElement({
    name: 'Curry',
    category: 'Food',
    color: '#FFD700', // Bright yellow color for curry
    behavior: [
        "ELEMENT.FLUID", // Curry as a fluid
        "ELEMENT.EDIBLE"
    ],
    properties: {
        taste: 'spicy',
        calories: 300
    }
});
