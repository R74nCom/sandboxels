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
