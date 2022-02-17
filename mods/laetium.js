elements.laetium = {
    color: "#f57f87",
    tempHigh: 2950,
    hardness: 0.87252,
    density: 6719,
    conduct: 4.7E210,
    behavior: behaviors.WALL,
    tick: function(pixel) {
        neighbors = [[-1,0],[0,-1],[1,0],[0,1]]
        for(i = 0; i < neighbors.length; i++) {
            if(!isEmpty(pixel.x+neighbors[i][0],pixel.y+neighbors[i][1],true)) {
                if(elements[pixelMap[pixel.x+neighbors[i][0]][pixel.y+neighbors[i][1]].element].category) {
                    if(elements[pixelMap[pixel.x+neighbors[i][0]][pixel.y+neighbors[i][1]].element].category == "cum") {
                        pixel.temp += 5
                    }
                }
            }
        }
    },
}

elements.molten_laetium = {
    color: ['#ff9f44', '#ff7f44', '#ff5f00'],
    behavior: behaviors.MOLTEN,
    reactions: {
        "ash": { "elem1": null, "elem2": "laetium_slag"},
        "dust": { "elem1": null, "elem2": "laetium_slag"},
        "magma": { "elem1": null, "elem2": "laetium_slag"},
    },
    tick: function(pixel) {
        neighbors = [[-1,0],[0,-1],[1,0],[0,1]]
        for(i = 0; i < neighbors.length; i++) {
            if(!isEmpty(pixel.x+neighbors[i][0],pixel.y+neighbors[i][1],true)) {
                if(pixelMap[pixel.x+neighbors[i][0]][pixel.y+neighbors[i][1]].element.category) {
                    if(pixelMap[pixel.x+neighbors[i][0]][pixel.y+neighbors[i][1]].element.category == "cum") {
                        pixel.temp += 5
                    }
                }
            }
        }
    },
    density: 6100,
    temp: 3000,
    tempLow: 2944,
    stateLow: "laetium",
    tempHigh: 5837,
    stateHigh: "vaporized_laetium",
    viscosity: 1.517,
    hidden: true,
    state: "liquid",
    category: "molten",
}

elements.vaporized_laetium = {
    color: ['#efdf54', '#efbf54', '#efaf10'],
    behavior: behaviors.GAS,
    tick: function(pixel) {
        neighbors = [[-1,0],[0,-1],[1,0],[0,1]]
        for(i = 0; i < neighbors.length; i++) {
            if(!isEmpty(pixel.x+neighbors[i][0],pixel.y+neighbors[i][1],true)) {
                if(pixelMap[pixel.x+neighbors[i][0]][pixel.y+neighbors[i][1]].element.category) {
                    if(pixelMap[pixel.x+neighbors[i][0]][pixel.y+neighbors[i][1]].element.category == "cum") {
                        pixel.temp += 5
                    }
                }
            }
        }
    },
    density: 49,
    temp: 6000,
    tempLow: 5837,
    stateLow: "molten_laetium",
    viscosity: 0.1,
    hidden: true,
    state: "gas",
    category: "gases",
}

function splitRgbColor(color) {
    var colorTempArray = color.split(",")
    var r = colorTempArray[0].split(",")[0].substring(4)
    var g = colorTempArray[1]
    var b = colorTempArray[2].slice(0,-1)
    return [r,g,b]
}

runAfterLoad(function() {
    elements.laetium_slag = JSON.parse(JSON.stringify(elements.slag))
    elements.laetium_slag.color = ['#a05c5a', '#af6967', '#b06d6d', '#ae6b6c', '#b67a7a']
    elements.laetium_slag.tempHigh = 2950
    elements.laetium_slag.stateHigh = ["molten_slag","molten_laetium"]
});

//dummy edit
