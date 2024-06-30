elements.potassiumpermanganate = {
    color: ["#800080", "#FF00FF"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 2500,
    desc: "Potassium permanganate is a dark purple, crystalline solid. It is used as a powerful oxidizing agent.",
    tempHigh: 240,
    stateHigh: "molten_potassiumpermanganate",
}
elements.molten_potassiumpermanganate = {
    color: ["#4B0082", "#800080", "#9932CC", "#8A2BE2", "#6A5ACD", "#FF00FF"],
    category: "powders",
    state: "solid",
    density: 2500,
    desc: "Potassium permanganate is a dark purple, crystalline solid. It is used as a powerful oxidizing agent.",
    tempLow: 239,
    stateLow: "potassiumpermanganate",
}
elements.tolulene = {
    color: "#FFFFFF",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 866,
    desc: "Tolulene is used as a paint thinner and also referred to as benezene or methylbeneze",
    burn: 37.5,
    burnTime: 900,
    burnInto: ["steam", "smoke", "fire", "fire",],
    reactions: {
    "potassiumpermanganate": {elem1: "benzaldehyde", elem2: "benzaldehyde"},
    },
    tempHigh: 111,
}
elements.benzaldehyde = {
    color: "#F5F5F5",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1045,
    desc: "Benzaldehyde is cherry flavor. It is also clear like tolulene.",
    reactions: {
        "seltzer": {elem1: "cherrysoda", elem2: "cherrysoda"},
    },
}
elements.cherrysoda = {
    color: "#D2042D",
    behavior: behaviors.LIQUID,
    category: "food",
    state: "liquid",
    density: 1045,
    desc: "Cherry soda.",
    tempHigh: 150,
    stateHigh: "cherrysoda_gas",
}
elements.cherrysoda_gas = {
    color: "#D20459",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 1025,
    desc: "Cherry soda gas.",
    tempLow: 149,
    stateLow: "cherrysoda",
    temp: 169,
}
elements.cherrysoda_ice = {
    color: "#BF4F9C",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 1065,
    desc: "Cherry soda ice.",
    tempHigh: -27,
    stateHigh: "cherrysoda",
    temp: -47,
}
