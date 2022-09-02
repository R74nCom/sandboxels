function splitRgbColor(color) {
    var colorTempArray = color.split(",")
    var r = colorTempArray[0].split(",")[0].substring(4)
    var g = colorTempArray[1]
    var b = colorTempArray[2].slice(0,-1)
    return [r,g,b]
}

function randomArrayChoice(array) {
    return array[Math.floor(Math.random() * array.length)]
}

elements.laetium = {
    color: "#f57f87",
    tempHigh: 2950,
    hardness: 0.87252,
    density: 6719,
    conduct: 4.7E210,
    behavior: behaviors.WALL,
    state: "solid",
    category: "solids",
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

elements.atisanium = {
    color: "#8dadb8",
    conduct: 0.87,
    colorOn: ["#ff00ff", "#e600e6", "#a300cc", "#ce07e8"],
    tempLow: -44,
    stateLow: "liquid_atisanium",
    density: 1.225,
    behavior: [
        "M1|M1|M1",
        "M1|XX|M1",
        "M1|M1|M1",
    ],
    state: "gas",
    category: "gases",
    tick: function(pixel) {
        var neighbors = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
        var neighborChoice = randomArrayChoice(neighbors)
        if(isEmpty(neighborChoice[0],pixel.y+neighborChoice[1],true)) {
            tryMove(pixel,pixel.x+neighborChoice[0],pixel.y+neighborChoice[1])
        }
        if(pixel.chargeCD) {
            if(pixel.chargeCD > 2) {
                pixel.chargeCD = 2
            }
        }
    },
}

elements.liquid_atisanium = {
    color: "#3f878a",
    conduct: 0.96,
    colorOn: ["#8307eb", "#8c00ff", "#9617ff", "#a02eff"],
    tempHigh: -45,
    stateHigh: "atisanium",
    tempLow: -214,
    stateLow: "alpha_atisanium",
    temp: -100,
    density: 15941,
    behavior: behaviors.LIQUID,
    state: "liquid",
    category: "liquids",
    tick: function(pixel) {
        var moveSpotsA = [[-1,1],[0,1],[1,1]]
        var moveSpotsB = [[-1,0],[1,0]]
        var msaChoice = randomArrayChoice(moveSpotsA)
        var msbChoice = randomArrayChoice(moveSpotsB)
        if(isEmpty(msaChoice[0],pixel.y+msaChoice[1],true)) {
            if(!tryMove(pixel,pixel.x+msaChoice[0],pixel.y+msaChoice[1])) {
                tryMove(pixel,pixel.x+msbChoice[0],pixel.y+msbChoice[1])
            }
        }
        if(pixel.chargeCD) {
            if(pixel.chargeCD > 2) {
                pixel.chargeCD = 2
            }
        }
        if(pixel.chargeCD) {
            if(pixel.chargeCD > 1) {
                if(Math.random() < 0.2) {
                    pixel.chargeCD = 1
                }
            }
        }
    },
}

elements.alpha_atisanium = {
    color: "#00382a",
    conduct: 0.987,
    colorOn: ["#3700ff", "#6820f7", "#4b15bf"],
    tempHigh: -213,
    stateHigh: "liquid_atisanium",
    tempLow: -261,
    stateLow: "beta_atisanium",
    temp: -240,
    density: 51295,
    behavior: behaviors.WALL,
    state: "solid",
    category: "solids",
    tick: function(pixel) {
        if(pixel.chargeCD) {
            if(pixel.chargeCD > 2) {
                pixel.chargeCD = 2
            }
        }
        if(pixel.chargeCD) {
            if(pixel.chargeCD > 1) {
                if(Math.random() < 0.4) {
                    pixel.chargeCD = 1
                }
            }
        }
    },
}

elements.beta_atisanium = {
    color: "#750e35",
    conduct: Infinity, //This is where I would make it a superconductor.
    colorOn: ["#0f0021", "#120324", "#4b106e", "#a6058e", "#42043a"], //pretend this is UV becoming more pronounced
    tempHigh: -260,
    stateHigh: "alpha_atisanium",
    temp: -270,
    density: 111295,
    behavior: behaviors.WALL,
    state: "solid",
    category: "solids",
    tick: function(pixel) {
        if(pixel.chargeCD) {
            if(pixel.chargeCD > 3) {
                pixel.chargeCD = 3
            }
        }
    },
}

elements.polusium = {
    color: "#dedc9e",
    tempHigh: 1213,
    hardness: 0.921952,
    density: 4113,
    conduct: 0.98,
    behavior: behaviors.WALL,
    state: "solid",
    category: "solids",
    tick: function(pixel) {
		var emptyNeighbors = [];
        for(i = 0; i < adjacentCoords.length; i++) {
            if(isEmpty(pixel.x+adjacentCoords[i][0],pixel.y+adjacentCoords[i][1],true)) {
				emptyNeighbors.push(adjacentCoords[i]);
            };
        };
		if(Math.random() < 0.002) {
			if(emptyNeighbors.length > 0) {
				var randomEmptyNeighbor = emptyNeighbors[Math.floor(Math.random() * emptyNeighbors.length)];
				changePixel(pixel,"polusium_oxide")
				createPixel("nitrogen",pixel.x+randomEmptyNeighbor[0],pixel.y+randomEmptyNeighbor[1])
			};
		};
    },
	reactions: {
		water: { elem1: "polusium_oxide", elem2: ["water","water","water","water","hydrogen"], chance: 0.006 },
		salt_water: { elem1: "polusium_oxide", elem2: ["salt_water","salt_water","salt_water","salt","hydrogen"], chance: 0.012 },
		bleach: { elem1: "polusium_oxide", chance: 0.02 }
	},
}

elements.molten_polusium = {
    tick: function(pixel) {
        neighbors = [[-1,0],[0,-1],[1,0],[0,1]]
        for(i = 0; i < neighbors.length; i++) {
            if(isEmpty(pixel.x+neighbors[i][0],pixel.y+neighbors[i][1],true)) {
                if(Math.random() < 0.004) {
                    changePixel(pixel,"molten_polusium_oxide")
                }
            }
            if(!isEmpty(pixel.x+neighbors[i][0],pixel.y+neighbors[i][1],true)) {
                if(pixelMap[pixel.x+neighbors[i][0]][pixel.y+neighbors[i][1]].element == "salt_water") {
                    if(Math.random() < 0.024) {
                        changePixel(pixel,"molten_polusium_oxide")
                    }
                }
            }
        }
    },
    density: 3410,
    temp: 1300,
    tempLow: 1212,
    stateLow: "polusium",
    tempHigh: 3110,
    stateHigh: "vaporized_polusium",
    viscosity: 13,
}

elements.vaporized_polusium = {
    color: ["#fdffd1", "#edf2cb", "#fcfac7"],
    behavior: behaviors.GAS,
    tick: function(pixel) {
        neighbors = [[-1,0],[0,-1],[1,0],[0,1]]
        for(i = 0; i < neighbors.length; i++) {
            if(isEmpty(pixel.x+neighbors[i][0],pixel.y+neighbors[i][1],true)) {
                if(Math.random() < 0.015) {
                    changePixel(pixel,"vaporized_polusium_oxide")
                }
            }
            if(!isEmpty(pixel.x+neighbors[i][0],pixel.y+neighbors[i][1],true)) {
                if(pixelMap[pixel.x+neighbors[i][0]][pixel.y+neighbors[i][1]].element == "salt_water") {
                    if(Math.random() < 0.06) {
                        changePixel(pixel,"vaporized_polusium_oxide")
                    }
                }
            }
        }
    },
    density: 21,
    temp: 3200,
    tempLow: 3109,
    stateLow: "molten_polusium",
    viscosity: 0.2,
    hidden: true,
    state: "gas",
    category: "gases",
}

elements.polusium_oxide = {
    color: "#a9b594",
    tempHigh: 1300,
    hardness: 0.511952,
    density: 3717,
    behavior: behaviors.POWDER,
    state: "solid",
    category: "solids",
    viscosity: 13,
}

elements.molten_polusium_oxide = {
    temp: 1350,
    tempHigh: 1400,
    stateHigh: "vaporized_polusium_oxide",
    density: 2917,
}

elements.vaporized_polusium_oxide = {
    color: "#faffc7",
    temp: 1500,
    tempLow: 1399,
    stateLow: "molten_polusium_oxide",
    density: 10,
    behavior: behaviors.GAS,
}

runAfterLoad(function() {
    elements.laetium_slag = JSON.parse(JSON.stringify(elements.slag))
    elements.laetium_slag.color = ['#a05c5a', '#af6967', '#b06d6d', '#ae6b6c', '#b67a7a']
    elements.laetium_slag.tempHigh = 2950
    elements.laetium_slag.stateHigh = ["molten_slag","molten_laetium"]
});
