elements.Reinforced_Steel = {
    color: "#807575",
    behavior: behaviors.WALL,
    category: "solid",
    state:  "solid",
    density: 720,
    stateHigh: 10000,
    burnInto: "Molten_Reinforced_Steel"
};
elements.Molten_Reinforced_Steel = {
    color: "#807575",
    behavior: behaviors.LIQUID,
    category: "states",
    state:  "liquid",
    density: 7200,
    stateLow: 9990,
};
