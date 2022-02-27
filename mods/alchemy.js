// Warning: This mod will remove all of your previously unlocked elements.

// loop through the elements object
if (elements.explosion) {
    elements.explosion.category = "tools";
}
for (var element in elements) {
    if (elements[element].category !== "tools") {
        // give the element the hidden attribute true
        elements[element].hidden = true;
        // set its category to "alchemy mod"
        elements[element].category = "alchemy mod";
    }
}

// set the unhide setting to Unlock as Discovered (2)
settings.unhide = 2;

// unhide oxygen (air), dirt (earth), fire, and water
if (!settings.unlocked.alchemymod) {
    settings.unlocked = {
        "oxygen": true,
        "dirt": true,
        "fire": true,
        "water": true,
        "alchemymod": true,
    };
}