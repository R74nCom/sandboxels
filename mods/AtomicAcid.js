elements.Reinforced_Steel = {
    color: "#807575",
    behavior: behaviors.WALL,
    category: "solids",
    state:  "solid",
    density: 720,
    tempHigh: 10000,
    stateHigh: "Molten_Reinforced_Steel",
};
elements.Molten_Reinforced_Steel = {
    color: "#e64e17",
    behavior: behaviors.SUPERFLUID,
    category: "states",
    state:  "liquid",
    density: 7200,
    stateLow: "Reinforced_Steel",
    tempLow: 9980,
    hidden:true,
};
elements.Atomic_Acid = {
    color: "#22ff00",
    category: "liquids",
    state:  "liquid",
    density: 1,
    stateHigh: "supernova",
    tempHigh: 1000,
    stateLow: "plasma",
    tempLow: -273,
};
elements.Atomic_Acid_Powder = {
    color: ["#22ff00", "#5af542"],
    behavior: behaviors.POWDER,
    category: "powders",
    state:  "solid",
    density: 7200,
    tempHigh: 200,
    stateHigh: "Burntpowder",
    reactions:{
        "water": {elem1: "Atomic_Acid", elem2: "water"}
    },
};
elements.Burntpowder = {
    color: "#7c838f",
    behavior: behaviors.POWDER,
    category: "powders",
    state:  "solid",
    density: 7200,
    tempLow: 10,
    stateLow: "Atomic_Acid_Powder",
    hidden:true,
    reactions:{
        "water": {elem1: null, elem2: null}
    },
};
