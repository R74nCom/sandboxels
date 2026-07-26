metadata = {
    name: "Ketchup to Milk",
    author: "YourName",
    description: "Transforms ketchup into milk upon contact with salt water.",
    version: "1.0.0"
};
runAfterLoad(function() {

    if (elements.salt_water) {
        if (!elements.salt_water.reactions) elements.salt_water.reactions = {};
        elements.salt_water.reactions.ketchup = { "elem1": "salt_water", "elem2": "milk" };
    }

    if (elements.ketchup) {
        if (!elements.ketchup.reactions) elements.ketchup.reactions = {};
        elements.ketchup.reactions.salt_water = { "elem1": "milk", "elem2": "salt_water" };
    }
});
