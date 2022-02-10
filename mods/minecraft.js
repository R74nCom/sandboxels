elements.endstone = {
color: ["#e5edc2", "#bec797"],
behavior: behaviors.WALL,
category: "minecraft",
state: "solid",
stateHigh: "molten_endstone",
tempHigh: 1265
};
elements.molten_endstone = {
color: ["#6615d6", "#9651f5", "#d3c3eb"],
behavior: behaviors.LIQUID,
category: "minecraft",
state: "liquid",
stateLow: "endstone",
tempLow: 1265,
temp: 1500,
viscosity: 1000,
density: 1025
};
elements.netherrack = {
color: ["#8c2a0a", "#783722"],
behavior: behaviors.WALL,
category: "minecraft",
state: "solid",
tempHigh: 2750
};
