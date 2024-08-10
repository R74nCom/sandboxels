//Made by SuperASAX or SuperAAX

elements.metal_scrap = {
    color: ["#b0afb4","#8c8f98","#cbcdcd","#6c6c6a","#fef9ff"],
    behavior: behaviors.POWDER,
    reactions: {
        "rust": { elem1:null, elem2:"thermite", chance:0.1 },
    },
    tempHigh: 1538,
    category: "powders",
    density: 2720,
    state: "solid",
    conduct: 0.43,
    hardness: 0.266,
    stateHigh:"molten_metal_scrap"
},

elements.molten_metal_scrap = {
    color: ["#b0afb4","#8c8f98","#cbcdcd","#6c6c6a","#fef9ff"],
    behavior: behaviors.MOLTEN,
    category: "liquids",
    density: 2720,
    state: "liquid",
    temp: 1600,
    conduct: 0.43,
    hidden: true,
    hardness: 0.266,
    tempLow: 1538,
    stateLow: "metal_scrap",
    tick: function(pixel) {
        var randomNumGot=Math.random()
        if (randomNumGot < 0.15) {
            changePixel(pixelMap[pixel.x][pixel.y],"molten_tin");
        }
        if (randomNumGot < 0.30 && randomNumGot > 0.15) {
            changePixel(pixelMap[pixel.x][pixel.y],"molten_aluminum");
        }
        if (randomNumGot < 0.45 && randomNumGot > 0.30) {
            changePixel(pixelMap[pixel.x][pixel.y],"molten_brass");
        }
    }
};