elements.aether = {
color: "#ffe4e1",
behavior: behaviors.GAS,
category: "gases",
state: "gas",
density: 0.05,
weight: 1,
update: function(x, y) {
// Update the element's behavior
},
reactions: {
"water": { elem1: "aqua_vapor", elem2: null },
"fire": { elem1: "fire_spirit", elem2: null },
"dirt": { elem1: "terra_dust", elem2: null },
}
};

elements.aqua_vapor = {
color: "#add8e6",
behavior: behaviors.GAS,
category: "gases",
state: "gas",
density: 0.08,
weight: 1,
update: function(x, y) {
// Update the element's behavior
},
reactions: {
"fire": { elem1: "mystic_mist", elem2: null },
"dirt": { elem1: "enchanted_mud", elem2: null },
}
};

elements.fire_spirit = {
color: "#ff4500",
behavior: behaviors.GAS,
category: "gases",
state: "gas",
density: 0.02,
weight: 1,
update: function(x, y) {
// Update the element's behavior
},
reactions: {
"water": { elem1: "steam", elem2: null },
"dirt": { elem1: "scorched_earth", elem2: null },
}
};

elements.terra_dust = {
color: "#8b4513",
behavior: behaviors.POWDER,
category: "powders",
state: "solid",
density: 1.2,
weight: 50,
update: function(x, y) {
// Update the element's behavior
},
reactions: {
"water": { elem1: "enchanted_mud", elem2: null },
"fire": { elem1: "scorched_earth", elem2: null },
}
};

elements.mystic_mist = {
color: "#d8bfd8",
behavior: behaviors.GAS,
category: "gases",
state: "gas",
density: 0.06,
weight: 1,
update: function(x, y) {
// Update the element's behavior
},
reactions: {
"dirt": { elem1: "mystic_clay", elem2: null },
"fire": { elem1: "flame_spark", elem2: null },
}
};

elements.enchanted_mud = {
color: "#6b4226",
behavior: behaviors.LIQUID,
category: "liquids",
state: "liquid",
density: 1.5,
weight: 100,
update: function(x, y) {
// Update the element's behavior
},
reactions: {
"fire": { elem1: "mystic_clay", elem2: null },
}
};

elements.scorched_earth = {
color: "#654321",
behavior: behaviors.SOLID,
category: "solids",
state: "solid",
density: 1.8,
weight: 120,
update: function(x, y) {
// Update the element's behavior
},
reactions: {
"water": { elem1: "enchanted_mud", elem2: null },
}
};

elements.mystic_clay = {
color: "#a52a2a",
behavior: behaviors.SOLID,
category: "solids",
state: "solid",
density: 1.7,
weight: 110,
update: function(x, y) {
// Update the element's behavior
},
reactions: {
"fire": { elem1: "terra_dust", elem2: null },
}
};

elements.arcane_crystal = {
color: "#00ffff",
behavior: behaviors.SOLID,
category: "solids",
state: "solid",
density: 2.0,
weight: 150,
update: function(x, y) {
// Update the element's behavior
},
reactions: {
"water": { elem1: "mystic_mist", elem2: null },
"fire": { elem1: "fire_spirit", elem2: null },
"dirt": { elem1: "terra_dust", elem2: null },
}
};

elements.spirit_flame = {
color: "#ff69b4",
behavior: behaviors.GAS,
category: "gases",
state: "gas",
density: 0.03,
weight: 1,
update: function(x, y) {
// Update the element's behavior
},
reactions: {
"water": { elem1: "steam", elem2: null },
"dirt": { elem1: "scorched_earth", elem2: null },
"aether": { elem1: "fire_spirit", elem2: null },
}
};

elements.elven_dust = {
color: "#f0e68c",
behavior: behaviors.POWDER,
category: "powders",
state: "solid",
density: 0.5,
weight: 20,
update: function(x, y) {
// Update the element's behavior
},
reactions: {
"water": { elem1: "enchanted_mud", elem2: null },
"fire": { elem1: "spirit_flame", elem2: null },
}
};

elements.magic_water = {
color: "#1e90ff",
behavior: behaviors.LIQUID,
category: "liquids",
state: "liquid",
density: 1.0,
weight: 50,
update: function(x, y) {
// Update the element's behavior
},
reactions: {
"fire": { elem1: "mystic_mist", elem2: null },
"dirt": { elem1: "enchanted_mud", elem2: null },
"aether": { elem1: "aqua_vapor", elem2: null },
}
};

elements.lightning_bolt = {
color: "#ffff00",
behavior: behaviors.ENERGY,
category: "energy",
state: "gas",
density: 0.05,
weight: 1,
update: function(x, y) {
// Update the element's behavior
},
reactions: {
"water": { elem1: "aqua_vapor", elem2: "steam" },
"dirt": { elem1: "scorched_earth", elem2: null },
"aether": { elem1: "electric_mist", elem2: null },
}
};

elements.electric_mist = {
color: "#b0e0e6",
behavior: behaviors.GAS,
category: "gases",
state: "gas",
density: 0.04,
weight: 1,
update: function(x, y) {
// Update the element's behavior
},
reactions: {
"fire": { elem1: "spirit_flame", elem2: null },
"dirt": { elem1: "enchanted_mud", elem2: null },
}
};

elements.void_essence = {
color: "#8a2be2",
behavior: behaviors.LIQUID,
category: "liquids",
state: "liquid",
density: 1.2,
weight: 60,
update: function(x, y) {
// Update the element's behavior
},
reactions: {
"water": { elem1: "dark_mist", elem2: null },
"fire": { elem1: "dark_flame", elem2: null },
"dirt": { elem1: "dark_mud", elem2: null },
}
};

elements.dark_mist = {
color: "#483d8b",
behavior: behaviors.GAS,
category: "gases",
state: "gas",
density: 0.06,
weight: 1,
update: function(x, y) {
// Update the element's behavior
},
reactions: {
"fire": { elem1: "dark_flame", elem2: null },
"dirt": { elem1: "dark_mud", elem2: null },
}
};

elements.dark_flame = {
color: "#8b0000",
behavior: behaviors.GAS,
category: "gases",
state: "gas",
density: 0.04,
weight: 1,
update: function(x, y) {
// Update the element's behavior
},
reactions: {
"water": { elem1: "dark_mist", elem2: null },
"dirt": { elem1: "dark_mud", elem2: null },
}
};
