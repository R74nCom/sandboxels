// explosive_sand.js
// Mod: Arena explosiva al tocar humanos

elements.explosive_sand = {
    name: "Explosive Sand",
    desc: "Arena que explota al tocar un humano.",
    color: ["#e0c068", "#d9b55f", "#cfae52"],
    behavior: behaviors.LIQUID,
    category: "land",
    state: "solid",
    density: 1600,
    hardness: 0.2,

    reactions: {
        human: function(pixel, humanPixel) {
            deletePixel(humanPixel.x, humanPixel.y);
            explode(humanPixel.x, humanPixel.y, 20);
        },
    },
};

