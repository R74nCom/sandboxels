// unhide oxygen (air), dirt (earth), fire, and water
if (!settings.alchemyUnlocked) {
    settings.alchemyUnlocked = {
        "oxygen": true,
        "dirt": true,
        "fire": true,
        "water": true,
    };
}
if (settings.unlocked.alchemymod) {
    for (var element in settings.unlocked) {
        if (settings.unlocked[element]) {
            settings.alchemyUnlocked[element] = true
        }
    }
}

// loop through the elements object
if (elements.explosion) {
    elements.explosion.category = "tools";
}
for (var element in elements) {
    if (settings.alchemyUnlocked[element]) {
        elements[element].hidden = false;
        if (elements[element].category !== "tools") { elements[element].category = "alchemy mod"; }
    }
    else if (elements[element].category !== "tools") {
        // give the element the hidden attribute true
        elements[element].hidden = true;
        // set its category to "alchemy mod"
        elements[element].category = "alchemy mod";
    }
}

// set the unhide setting to Unlock as Discovered (2)
settings.unhide = 2;

runAfterLoad(function(){
    checkUnlock = function(element) {
        if (elements[element] && elements[element].hidden && !settings.alchemyUnlocked[element]) {
            settings.alchemyUnlocked[element] = true;
            if (settings.unhide === 2) {
                createElementButton(element)
                var categoryButton = document.querySelector(".categoryButton[current='true']");
                var currentCategory = categoryButton.getAttribute("category");
                if (currentCategory !== elements[element].category) {
                    document.getElementById("categoryButton-"+elements[element].category).classList.add("notify");
                }
                // add notify to the elementButton of the element
                document.getElementById("elementButton-"+element).classList.add("notify");
            }
            saveSettings();
        }
    }
})
runAfterAutogen(function(){
    for (var element in elements) {
        if (elements[element].category === "states") {
            elements[element].category = "alchemy mod"
        }
    }
})
window.addEventListener("load",function(){
    for (var element in elements) {
        if (elements[element].hidden && document.getElementById("elementButton-"+element)) {
            document.getElementById("elementButton-"+element).remove()
        }
    }
})