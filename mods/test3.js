//this is intended to simulate a substance at its triple point

elements.test2_s_1 = {
    color: "#0000FF",
    behavior: behaviors.POWDER,
    tick: function(pixel) {
        if(pixel.temp > elements[pixel.element].tempLow) {
            if(Math.random() < 0.1) {
                changePixel(pixel,elements[pixel.element].stateHigh[Math.floor(Math.random() * elements[pixel.element].stateHigh.length)])
            }
        }
    },
    density: 718.3,
    temp: 24,
    tempHigh: -232,
    stateHigh: ["test2_s_1", "test2_s_2", "test2_l", "test2_g"],
    tempLow: -232,
    stateLow: ["test2_s_1"],
}

elements.test2_s_2 = {
    color: "#3000FF",
    behavior: behaviors.POWDER,
    tick: function(pixel) {
        if(Math.random() < 0.1) {
            changePixel(pixel,elements[pixel.element].stateHigh[Math.floor(Math.random() * elements[pixel.element].stateHigh.length)])
        }
    },
    density: 738.3,
    temp: 24,
    tempHigh: 24,
    stateHigh: ["test2_s_1", "test2_s_2", "test2_l", "test2_g"],
    tempLow: 24,
    stateLow: ["test2_s_1", "test2_s_2", "test2_l", "test2_g"],
}

elements.test2_l = {
    color: "#0020EF",
    behavior: behaviors.LIQUID,
    tick: function(pixel) {
        if(Math.random() < 0.1) {
            changePixel(pixel,elements[pixel.element].stateHigh[Math.floor(Math.random() * elements[pixel.element].stateHigh.length)])
        }
    },
    density: 693.3,
    temp: 24,
    tempHigh: 24,
    stateHigh: ["test2_s_1", "test2_s_2", "test2_l", "test2_g"],
    tempLow: 24,
    stateLow: ["test2_s_1", "test2_s_2", "test2_l", "test2_g"],
}

elements.test2_g = {
    color: "#2000CF",
    behavior: behaviors.GAS,
    tick: function(pixel) {
        if(pixel.temp < elements[pixel.element].tempHigh) {
            if(Math.random() < 0.1) {
                changePixel(pixel,elements[pixel.element].stateHigh[Math.floor(Math.random() * elements[pixel.element].stateHigh.length)])
            }
        }
    },
    density: 2.1,
    temp: 24,
    tempLow: 1738,
    stateLow: ["test2_s_1", "test2_s_2", "test2_l", "test2_g"],
    tempHigh: 1738,
    stateHigh: ["test2_g"],
}

elements.test2 = {
    color: "#0000FF",
    behavior: [
        "XX|XX|XX",
        "XX|CH:test2_s_1,test2_s_2,test2_l,test2_g|XX",
        "M2|M1|M2"
    ],
    density: 424.3,
    tempLow: 24,
    stateLow: ["test2_s_1", "test2_s_2", "test2_l", "test2_g"],
    tempHigh: 24,
    stateHigh: ["test2_s_1", "test2_s_2", "test2_l", "test2_g"],
}
