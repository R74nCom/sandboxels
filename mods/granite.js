elements.granite = {
    color: ["#F3C3AD", "#F0AB75", "#DDA888", "#BD927E", "#998473", "#5C5E53", "#BD8366"],
    behavior: behaviors.WALL,
    category: "land",
    tempHigh: 1215,
    density: 2691,
    hardness: 0.75,
    breakInto: "granite_gravel",
}

elements.granite_gravel = {
    color: ["#E3B39D", "#E09B65", "#CD9878", "#AD826E", "#897463", "#4C4E43", "#AD7356", "#F3C3AD", "#F0AB75", "#DDA888", "#BD927E", "#998473", "#5C5E53", "#BD8366", "#FFD3BD", "#FFBB85", "#EDB898", "#CDA28E", "#A99483", "#6C6E63", "#CD9376"],
    behavior: behaviors.POWDER,
    category: "land",
    tempHigh: 1215,
    stateHigh: "molten_granite",
    density: 1320,
}
