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
tempHigh: 2750,
stateHigh: "molten_netherrack",
};
elements.glowstone_dust = {
color: ["#d9d636", "#fffc63", "#a3a12f", "#e0dd3f"],
behavior: behaviors.POWDER,
category: "minecraft",
state: "solid",
tempHigh: 2500,
stateHigh: "molten_glowstone",
conduct: 0.975,
density: 1075
};
elements.molten_netherrack = {
name: "Nether Magma",
color: ["#f7f09c", "#faf9eb", "#ffffff", "#dcf7f7", "#86dbdb", "#1268a6"],
behavior: behaviors.LIQUID,
category: "minecraft",
state: "liquid",
tempLow: 2750,
stateLow: "netherrack",
temp: 3000,
viscosity: 1000,
density: 2305
};
elements.redstone_dust = {
color: ["#bf2424", "#f22424", "#a12020"],
behavior: behaviors.POWDER,
category: "minecraft",
state: "solid",
tempHigh: 1275,
stateHigh: "liquid_redstone",
density: 1250
};
behaviors.SOUL_SAND = [
"SA|SA|SA",
"XX|XX|XX",
"SA AND M2|SA AND M1|SA AND M2",
];
elements.soul_sand = {
color: ["#91704d", "#704e2b", "#523517"],
behavior: behaviors.SOUL_SAND,
category: "minecraft",
state: "solid",
tempHigh: 2575,
stateHigh: "soul_glass",
density: 1375,
reactions: {
"water": { "elem1":"wet_soul_sand", "elem2":null },
}
};
elements.soul_soil = {
color: ["#80664b", "#6e553b", "#5c452e"],
behavior: behaviors.SOUL_SAND,
category: "minecraft",
state: "solid",
tempHigh: 2565,
stateHigh: "soul_glass",
density: 1450,
reactions: {
"water": { "elem1":"soul_mud", "elem2":null },
}
};
elements.soul_mud = {
color: "#6e5437",
behavior: behaviors.POWDER,
category: "minecraft",
state: "solid",
tempHigh: 1985,
stateHigh: "soul_adobe",
density: 1585
};
elements.soul_glass = {
color: "#7a90c2",
behavior: behaviors.WALL,
category: "minecraft",
state: "solid",
tempHigh: 2585,
stateHigh: "molten_soul_glass",
density: 1685
};
elements.wet_soul_sand = {
color: ["#5c452e", "#856d56"],
behavior: behaviors.POWDER,
category: "minecraft",
state: "solid",
tempHigh: 150,
stateHigh: "soul_sand",
density: 1660,
};
/* unfinished but near:
Soul Adobe,
Molten Soul Glass,
Nether Quartz,
Molten Nether Quartz,
Dripstone,
Molten Dripstone,
Molten Glowstone,
Liquid Redstone,
Soul Flame,
Soul
*/
