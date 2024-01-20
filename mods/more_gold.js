elements.green_gold = {
    color: ["#94c7a3","#7bb298","#94c7a3"],
    behavior: behaviors.WALL,
    tempHigh: 500,
    category: "solids",
    density: 13000,
	burnInto: ["molten_green_gold"],
    conduct: 0.87,
};
elements.molten_green_gold = {
    color: "#d9f046",
    behavior: behaviors.MOLTEN,
    tempHigh: 500,
    category: "states",
    density: 13000,
    conduct: 0.87,
	Hidden: true
};
elements.gold_tree = {
    color: "#f2e013",
    tick: function (pixel) {
        if (pixel.h > 0 && pixelTicks % (50+pixel.h) === 0) {

            if (isEmpty(pixel.x-1,pixel.y)) {
                createPixel("gold",pixel.x-1,pixel.y);
                pixelMap[pixel.x-1][pixel.y].h = pixel.h-2;
            }
            if (isEmpty(pixel.x+1,pixel.y)) {
                createPixel("gold",pixel.x+1,pixel.y);
                pixelMap[pixel.x+1][pixel.y].h = pixel.h-2;
            }
        }
        doDefaults(pixel);
    },
    category:"solid",
    breakInto: "gold",
    state: "solid",
    density: 8000,
    seed: "gold_coin",
},
