

// explosive_sand.js
// Mod: Arena explosiva al tocar humanos

elements.explosive_sand = {
    name: "Explosive Sand",
    desc: "Arena que explota al tocar un humano.",
    color: ["#e0c068", "#d9b55f", "#fcae52"],
    behavior: behaviors.LIQUID,
    category: "land",
    state: "solid",
    density: 1600,
    hardness: 0.2,
    reactions: {
        human: function(pixel, humanPixel) {
            // Explota cuando toca a un humano
            explodeAt(pixel.x, pixel.y, 40); // 💥 Radio 40
            deletePixel(pixel); // La arena desaparece tras explotar
        },
    },
    tempHigh: 1700,
    stateHigh: "molten_sand",
    tempLow: -10,
    stateLow: "packed_snow",
    conduct: 0.2,
};

