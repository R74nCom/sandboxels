elements.Reinforced_Steel = {
    color: "#807575",
    behavior: behaviors.WALL,
    category: "solids",
    state:  "solid",
    density: 720,
    stateHigh: 10000,
    burnInto: "Molten_Reinforced_Steel"
};
elements.Molten_Reinforced_Steel = {
    color: "#e64e17",
    behavior: behaviors.LIQUID,
    category: "states",
    state:  "liquid",
    density: 7200,
    stateLow: 9990,
};
elements.Atomic_Acid = {
    color: "#22ff00",
    behavior: behaviors.LIQUID,
    category: "special",
    state:  "liquid",
    density: 7200,
    reactions: {
        "sand" {"elem1": "null"}
        "dirt" {"elem1": "null"}
        "wet_sand" {"elem1": "null"}
    }
};
