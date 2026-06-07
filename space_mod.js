elements.mars_sand = {
    color: "#b85c3a",
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    density: 1700,
reactions: {
    fire: { elem1: "unknown_glass" }
},


elements.unknown_glass = {
    color: "#6f7a8a",
    behavior: behaviors.WALL,
    category: "land",
    state: "solid",
    density: 2500
    smash: { elem1: “unknown_shards” }
elements.unknown_shards = {
    color: "#4d5a66",
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    density: 2600,
   };
elements.star_core = {
    color: "#ffd36a",
    behavior: behaviors.WALL,
    category: "energy",
    state: "solid",
    density: 5000,
    temp: 1000,
    reactions: {
fire: { elem1: "black_hole" },
lava: { elem1: "black_hole" }
}
};
elements.vacuum = {
    color: "#050505",
    behavior: behaviors.WALL,
    category: "energy",
    state: "gas",
    density: 0,


    reactions: {
        star_core: { elem1: "black_hole" },
        unknown_shards: { elem1: "cosmic_dust" }
    }
};