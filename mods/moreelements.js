elements.monosodium.glutamate = {
    color: "#FFFFFF",
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 2500,
    reactions: { 
  "water": {elem1:"water",elem2:"water"},
}
elements.mint = {
    color: ["#2BF225", "#1B9F16", "#02480A"],
    category: "life",
    state: "solid",
    density: 2500,
}
elements.miso = {
    color: "#F1A849",
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    density: 866,
    burn: 37.5,
    burnTime: 900,
    burnInto: ["steam", "smoke", "fire", "fire",],
    reactions: {
    "broth": {elem1: "broth", elem2: "broth"},
    },
    tempHigh: 111,
}
elements.honeydew = {
    color: "#F4BD46",
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    density: 2500,
    breakInto: "juice"
}
elements.morel = {
    color: "#D3B776",
    behavior: behaviors.POWDER,
    category: "life",
    state: "solid",
    density: 2500,
    tempHigh: 150,
    stateHigh: "ash",
}
elements.thyme = {
    color: "#2BF225",
    behavior: behaviors.POWDER,
    category: "life",
    state: "solid",
    density: 1025,
    desc: "Thyme.",
    tempHigh: 149,
    stateHigh: "ash",
    temp: 169,
}
elements.lithium = {
    color: "#B3B3B3",
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 1065,
}
elements.graphite = {
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    color: ["#000000","#232323"],
    reactions: {},
}
