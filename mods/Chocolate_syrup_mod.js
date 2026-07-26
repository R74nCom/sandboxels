metadata = {
    name: "Chocolate Syrup Mod",
    author: "YourName",
    description: "Adds thick chocolate syrup that turns milk into chocolate milk.",
    version: "1.0.0"
};

runAfterLoad(function() {
    elements.chocolate_syrup = {
        color: "#4a2c11",
        behavior: behaviors.LIQUID,
        category: "liquids",
        viscosity: 50,
        state: "liquid",
        density: 1300
    };

    elements.chocolate_syrup.reactions = {
        "milk": { "elem1": "chocolate_milk", "elem2": "chocolate_milk" }
    };
});
