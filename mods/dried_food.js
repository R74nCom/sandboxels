// A mod that adds dried versions of some foods. (by pilot_773)

elements.dried_tomato = {
    color: elements.sauce.color,
    category: "food",
    behavior: behaviors.STURDYPOWDER
};

elements.dried_lettuce = {
    color: elements.herb.color,
    category: "food",
    behavior: behaviors.STURDYPOWDER
};

elements.raisin = {
    color: elements.fireball.color,
    category: "food",
    behavior: behaviors.STURDYPOWDER
};

elements.dry = {
    color: elements.earthquake.color,
    category: "tools",
    tool: function(pixel) {
        if (pixel.element == "tomato") {
            pixel.element = "dried_tomato"
        }
        if (pixel.element == "lettuce") {
            pixel.element = "dried_lettuce"
        }
        if (pixel.element == "grape") {
            pixel.element = "raisin"
        }
    },
}

elements.dried_tomato.reactions.water = { "elem1":"tomato", "elem2":null }
elements.dried_lettuce.reactions.water = { "elem1":"lettuce", "elem2":null }