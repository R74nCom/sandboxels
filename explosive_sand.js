// explosive_sand.js
// Mod: Arena explosiva al tocar humanos (con delay)

elements.explosive_sand = {
    name: "Explosive Sand",
    desc: "Arena que explota unos segundos después de tocar un humano.",
    color: ["#e0c068", "#d9b55f", "#fcae52"],
    behavior: behaviors.LIQUID,
    category: "land",
    state: "solid",
    density: 1600,
    hardness: 0.2,
    _armed: false, // para evitar múltiples activaciones
    reactions: {
        human: function(pixel, humanPixel) {
            if (!pixel._armed) {
                pixel._armed = true; // marcar como activada
                let flashInterval = setInterval(() => {
                    // alterna colores para el efecto de parpadeo
                    pixel.color = pixel.color === "#ff0000" ? "#fcae52" : "#ff0000";
                }, 200); // parpadeo cada 0.2s

                setTimeout(() => {
                    clearInterval(flashInterval); // parar parpadeo
                    explodeAt(pixel.x, pixel.y, 60); // 💥 Explosión más grande
                    deletePixel(pixel);
                }, 3000); // explota después de 3 segundos
            }
        },
    },
    tempHigh: 1700,
    stateHigh: "molten_sand",
    tempLow: -10,
    stateLow: "packed_snow",
    conduct: 0.2,
};



