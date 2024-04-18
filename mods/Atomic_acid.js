elements.Atomic_Acid = {
    color: "#22ff00",
    behavior: [
		"CH:Atomic_Acid|DL AND CH:Atomic_Acid|CH:Atomic_Acid",
		"DL AND M2 AND CH:Atomic_Acid|DL%50| AND M2 AND CH:Atomic_Acid",
		"M1 AND CH:Atomic_Acid|DL AND M1 AND CH:Atomic_Acid|M1 AND CH:Atomic_Acid",
	],
    category: "liquids",
    state:  "liquid",
    density: 1,
    stateHigh: "supernova",
    tempHigh: 1000,
    stateLow: "plasma",
    tempLow: -273,
    reactions: {
        "wall": {elem2: null},
    },
};
elements.YES = {
    color: "#e88d38",
    behavior: behaviors.POWDER,
    category: "weapons",
    state: "solid",
    density: 3,
    hidden:true,
    reactions: {
        "steel": {elem1: "h_bomb", elem2: null},
    },
};