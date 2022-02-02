// This mod unhides all elements besides molten ones.

runAfterLoad(function() {
    // Loop through every item in the elements object, if it has a hidden property, delete it.
    for (var elem in elements) {
        if (elements[elem].hidden) {
            delete elements[elem].hidden;
        }
    }
});