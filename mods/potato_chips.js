elements.potato_chip = {
    behavior: behaviors.STURDYPOWDER,
    state: "solid",
    density: 1350,
    color: ["#F7DD93", "#D8A44B"],
    category: "food",
    desc: "Potato chip. Turns potato next to it into potato chip if temp is >= 104 - 180.",

    tick: function(pixel) {
        if(pixelTicks - pixel.start >= 10) {
    if (!isEmpty(pixel.x, pixel.y - 1, true)) {
        if (pixel.temp >= 104 && pixelMap[pixel.x][pixel.y - 1].element === "potato") {
            changePixel(pixelMap[pixel.x][pixel.y - 1], "potato_chip");  
        }
    }
    if (!isEmpty(pixel.x, pixel.y + 1, true)) {
        if (pixel.temp >= 104 && pixelMap[pixel.x][pixel.y + 1].element === "potato") {
            changePixel(pixelMap[pixel.x][pixel.y + 1], "potato_chip");  
        }
    }
    if (!isEmpty(pixel.x - 1, pixel.y, true)) {
        if (pixel.temp >= 104 && pixelMap[pixel.x - 1][pixel.y].element === "potato") {
            changePixel(pixelMap[pixel.x - 1][pixel.y], "potato_chip");  
        }
    }
    if (!isEmpty(pixel.x + 1,pixel.y, true)) {
        if (pixel.temp >= 104 && pixelMap[pixel.x + 1][pixel.y].element === "potato") {
            changePixel(pixelMap[pixel.x + 1][pixel.y], "potato_chip");  
        }
    }
    }
    }
}

elements.sunflower_oil = {
    behavior: behaviors.LIQUID,
    color: ["#FFFFCC", "#FFFF99", "#FFFF66", "#FFFF33", "#FFFF00", "#FFCC00"],
    viscosity: 63,
    category: "food",
    state: "liquid",
    reactions: {
        "potato": {elem2: "potato_chip", tempMin: 140},
    }
}
