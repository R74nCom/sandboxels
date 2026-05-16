elements.sphagnum_moss= {
    color: "#034308",
    behavior: behaviors.STURDYPOWDER,
    category: "life",
    state: "solid"
}


elements.rift= {
    color: "#180051",
    tick: function(pixel) {releaseElement(pixel, "strange_goo")
    },
    behavior: behaviors.SOLID,
    category: "special",
    state: "solid"
}
elements.strange_goo= {
    color: "#000049",
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "deadly_goo": { elem1: "null", elem2: "supernova" }
    },
    category: "liquids",
    state: "liquid"
}
elements.deadly_rift= {
    color: "#51002e",
    tick: function(pixel) {releaseElement(pixel, "deadly_goo")
    },
    behavior: behaviors.SOLID,
    reactions: {
        fire: { elem1: "null", elem2: "supernova"}
    },
    category: "special",
    state: "solid"
}
elements.deadly_goo= {
    color: "#3f0049",
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "fire": { elem1: "null", elem2: "n_explosion" }
    },
    category: "liquids",
    state: "liquid"
}
elements.funny_rock= {
    color: "#3e2643",
    behavior: behaviors.STURDYPOWDER,
    reactions: { "fire": { elem1: "null", elem2: "n_explosion" }},
    category: "land",
    state: "solid"
}
