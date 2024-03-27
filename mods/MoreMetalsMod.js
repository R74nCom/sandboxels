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
    behavior: behaviors.SUPERFLUID,
    category: "special",
    state:  "liquid",
    density: 7200,
    reactions: {
        "sand": {elem1: "Atomic_Acid", elem2: null},
        "dirt": {elem1: "Atomic_Acid", elem2: null},
        "wet_sand": {elem1: "Atomic_Acid", elem2: null},
        "mud": {elem1: "Atomic_Acid", elem2: null},
        "rock": {elem1: "Atomic_Acid", elem2: null},
        "rock_wall": {elem1: "Atomic_Acid", elem2: null},
        "packed_sand": {elem1: "Atomic_Acid", elem2: null},
        "mudstone": {elem1: "Atomic_Acid", elem2: null},
        "snow": {elem1: "Atomic_Acid", elem2: null},
        "gravel": {elem1: "Atomic_Acid", elem2: null},
        "clay": {elem1: "Atomic_Acid", elem2: null},
        "clay_soil": {elem1: "Atomic_Acid", elem2: null},
        "premafrost": {elem1: "Atomic_Acid", elem2: null},
        "mycelium": {elem1: "Atomic_Acid", elem2: null},
        "mulch": {elem1: "Atomic_Acid", elem2: null},
        "ant_wall": {elem1: "Atomic_Acid", elem2: null},
        "basalt": {elem1: "Atomic_Acid", elem2: null},
        "tuff": {elem1: "Atomic_Acid", elem2: null},
        "limestone": {elem1: "Atomic_Acid", elem2: null},
        "Quicklime": {elem1: "Atomic_Acid", elem2: null},
        "slacked_lime": {elem1: "Atomic_Acid", elem2: null},
        "salt_water": {elem1: "Atomic_Acid", elem2: null},
        "sugar_water": {elem1: "Atomic_Acid", elem2: null},
    },
};
elements.Atomic_Acid_Powder = {
    color: ["#22ff00", #5af542,]
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
