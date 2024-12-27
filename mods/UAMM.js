console.log("Thanks for using UAMM!")

elements.rubidium = {
	color: ["#b5b5b5", "#c9c9c9", "#d6cccb"],
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
	tempHigh: 39.3,
	stateHigh: "liquid_rubidium",
	density: 1532,
	tick: function (pixel){
	var foundelem1 = false
	var foundelem2 = false
	for (var i = 0; i < squareCoords.length; i++) {
		var coord = squareCoords[i];
		var x = pixel.x+coord[0];
		var y = pixel.y+coord[1];
		if (!isEmpty(x, y, true)){
			var otherPixel = pixelMap[x][y]
			if (otherPixel.element == "liquid_ammonia"){foundelem1 = true; break}
		}
	}
	for (var i = 0; i < squareCoords.length; i++) {
		var coord = squareCoords[i];
		var x = pixel.x+coord[0];
		var y = pixel.y+coord[1];
		if (!isEmpty(x, y, true)){
			var otherPixel = pixelMap[x][y]
			if (otherPixel.element == "oxygen"){foundelem2 = true; break}
		}
	}
	if (foundelem1 && foundelem2){changePixel(pixel, "rubidium_peroxide", false)}
	},
    reactions: {
        "water": {elem1: "pop", elem2: "hydrogen", temp2: 400},
        "oxygen": {elem1: "rubidium_superoxide", elem2: null, chance: 0.3}
    }
};

elements.liquid_rubidium = {
	color: ["#cccccc", "#ebe8e8", "#f2e7e6"],
	behavior: behaviors.LIQUID,
	hidden: true,
	state: "liquid",
	tempLow: 38,
	stateLow: "rubidium",
	density: 1475,
    reactions: {
        "water": {elem1: "pop", elem2: "hydrogen", temp2: 400}
    }
}

elements.rubidium_superoxide = {
	color: ["#eded00", "#ffff26", "#e3e33d"],
	behavior: behaviors.POWDER,
	hidden: true,
	state: "solid",
	tempHigh: 340,
	stateHigh: "rubidium_peroxide",
	density: 1532,
    reactions: {
        "water": {elem2: null}
    }
};

elements.rubidium_peroxide = {
	color: ["#fffed9", "#ffffe8", "#edede4"],
	behavior: behaviors.POWDER,
	hidden: true,
	state: "solid",
	density: 1532,
    reactions: {
        "water": {elem2: null}
    }
};

elements.cesium = {
	color: ["#e3a814", "#dbab32", "#e8bc4f", "#fabf2d"],
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
	fireColor: "#8c21de",
	burn: 1,
	burnTime: 500,
	tempHigh: 29,
	stateHigh: "liquid_cesium",
	density: 1873,
	reactions: {
		"water": {func: (pixel1) => {pixel1.burning=true;pixel1.burnStart=pixelTicks},
		elem1: "pop", elem2: ["smoke", "fire"], temp2: 22},
		"fire": {elem1: ["smoke", "pop"]}
	}
};

elements.liquid_cesium = {
	color: ["#ebb121", "#edbd42", "#f5cb62", "#fcd26a"],
	behavior: behaviors.LIQUID,
	hidden: true,
	state: "liquid",
	tempLow: 28,
	stateLow: "cesium",
	density: 1842,
	reactions: {
		"water": {func: (pixel1) => {pixel1.burning=true;pixel1.burnStart=pixelTicks},
		elem1: "pop", elem2: ["smoke", "fire"], temp2: 22},
		"radiation": {elem1: "liquid_radiocesium", elem2: "smoke", chance: 0.65}
	}
};

elements.radiocesium = {
	color: ["#c7bda5", "#ada287", "#99958b", "#d1ccc0"],
	behavior: [
		"XX|CR:radiation%1|XX",
        "CR:radiation%1|XX|CR:radiation%1",
        "M2|M1|M2",
	],
	hidden: true,
	state: "solid",
	fireColor: "#8c21de",
	burn: 1,
	burnTime: 500,
	tempHigh: 29,
	stateHigh: "liquid_radiocesium",
	density: 1873,
	tick: function (pixel) {
		if (Math.random()<0.007) {
			if (Math.random()<0.5) {
				changePixel(pixel, "barium")
			}
			else {
				changePixel(pixel, "radiobarium")
			}
		}
	},
	reactions: {
		"water": {func: (pixel1) => {pixel1.burning=true;pixel1.burnStart=pixelTicks},
		elem1: ["rad_steam", "fallout"], elem2: "explosion"}
	}
};

elements.liquid_radiocesium = {
	color: ["#e8dcc1", "#d4c6a5", "#bfbaae", "#f5f1e9"],
	behavior: behaviors.RADMOLTEN,
	hidden: true,
	state: "liquid",
	tempLow: 28,
	stateLow: "radiocesium",
	density: 1842,
	tick: function (pixel) {
		if (Math.random()<0.007) {
			if (Math.random()<0.5) {
				changePixel(pixel, "barium")
			}
			else {
				changePixel(pixel, "radiobarium")
			}
		}
	},
	reactions: {
		"water": {func: (pixel1) => {pixel1.burning=true;pixel1.burnStart=pixelTicks},
		elem1: ["rad_steam", "fallout"], elem2: "explosion"}
	}
};

elements.barium = {
	color: ["#1e1e1e", "#353535", "#4e4e4e", "#696969"],
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
	tempHigh: 730,
	stateHigh: "liquid_barium",
	density: 3510,
	reactions: {
		"water": {elem1: "barium_hydroxide", elem2: "pop"}
	}
};

elements.liquid_barium = {
	color: ["#1e1e1e", "#353535", "#4e4e4e", "#696969"],
	behavior: behaviors.POWDER,
	hidden: true,
	state: "liquid",
	tempLow: 729,
	stateLow: "barium",
	density: 3338
}

elements.radiobarium = {
	color: ["#1e1e1e", "#353535", "#4e4e4e", "#696969"],
	behavior: behaviors.POWDER,
	hidden: true,
	state: "solid",
	density: 3510,
	tick: function (pixel) {
		if (Math.random()<0.007) {
			changePixel(pixel, "barium")
			for (var i = 0; i < squareCoords.length; i++) {
				var coord = squareCoords[i];
				var x = pixel.x+coord[0];
				var y = pixel.y+coord[1];
				var rays = 0;
				if (isEmpty(x, y)){
					createPixel("gamma_ray", x, y)
					rays += 1
					if (rays == 2) {
						break
					}
				}
			}
		}
	}
};

elements.barium_hydroxide = {
	color: ["#f4f4f4", "#ffffff", "#ebebeb", "#e5e5e5"],
	behavior: behaviors.POWDER,
	hidden: true,
	state: "solid",
	density: 3510
}

elements.gamma_ray = {
    color: "#ffffff",
    behavior: [
        "XX|XX|XX",
        "XX|DL%5|XX",
        "XX|XX|XX",
    ],
	hidden: true,
    temp: 1000,
    state: "gas",
    density: 0.00001,
    ignoreAir: true,
    tick: behaviors.BOUNCY
};

elements.lithium = {
	color: ["#e8e8e8", "#f5f5f5", "#c9c9c9", "#d4d4d4"],
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
	tempHigh: 180.5,
	stateHigh: "liquid_lithium",
	density: 534,
	tick: function (pixel){
        var otherPixel;
        for (var i = 0; i < squareCoords.length; i++) {
            var coord = squareCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (isEmpty(x, y, true)){
                if(Math.random()<0.003) {
                    changePixel(pixel, "dull_lithium")
                }
            }
            if (!isEmpty(x, y, true)) {
                otherPixel = pixelMap[x][y];
                if (otherPixel.element != "mineral_oil") {
					if (otherPixel.element != "lithium" && otherPixel.element != "dull_lithium" && otherPixel.element != "tarnished_lithium") {
						if(Math.random()<0.0007) {
							changePixel(pixel, "dull_lithium")
						}
					}
                }
            }
        }
    },
	reactions: {
		"water": {elem1: "lithium_hydroxide", elem2: "hydrogen", temp2: 400},
		"hydrogen": {elem1:"lithium_hydride", elem2: null, chance: 0.5}
	}
};

elements.dull_lithium = {
	color: ["#d4d4d4", "#e3e3e3", "#b3b3b3", "#bfbfbf"],
	behavior: behaviors.POWDER,
	hidden: true,
	state: "solid",
	tempHigh: 180.5,
	stateHigh: "liquid_lithium",
	density: 534,
	tick: function (pixel){
        var otherPixel;
        for (var i = 0; i < squareCoords.length; i++) {
            var coord = squareCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (isEmpty(x, y, true)){
                if(Math.random()<0.003) {
                    changePixel(pixel, "dull_lithium")
                }
            }
            if (!isEmpty(x, y, true)) {
                otherPixel = pixelMap[x][y];
                if (otherPixel.element != "mineral_oil") {
					if (otherPixel.element != "lithium" && otherPixel.element != "dull_lithium" && otherPixel.element != "tarnished_lithium") {
						if(Math.random()<0.0007) {
							changePixel(pixel, "dull_lithium")
						}
					}
                }
            }
        }
    },
	reactions: {
		"water": {elem1: "lithium_hydroxide", elem2: "hydrogen", temp2: 400},
		"hydrogen": {elem1:"lithium_hydride", elem2: null, chance: 0.5}
	}
};

elements.tarnished_lithium = {
	color: ["#212121", "#303030", "#0d0d0d", "#404040"],
	behavior: behaviors.POWDER,
	state: "solid",
	hidden: true,
	tempHigh: 180.5,
	stateHigh: "liquid_lithium"
};

elements.liquid_lithium = {
	color: ["#e8e8e8", "#f5f5f5", "#c9c9c9", "#d4d4d4"],
	behavior: behaviors.LIQUID,
	hidden: true,
	state: "liquid",
	tempLow: 179.5,
	stateLow: "lithium",
	density: 511.7
};

elements.lithium_hydroxide = {
	color: ["#ffffff", "#f1f1f1", "#e7e7e7", "#ededed"],
	behavior: behaviors.POWDER,
	hidden: true,
	state: "solid",
	tempHigh: 180.5,
	stateHigh: "liquid_lithium",
	density: 1540,
};

elements.lithium_hydride = {
	color: ["#8a8a8a", "#b5b5b5", "#bbbbbb"],
	behavior: behaviors.POWDER,
	hidden: true,
	state: "solid",
	density: 820,
	tick: function (pixel){
        var otherPixel;
        for (var i = 0; i < squareCoords.length; i++) {
            var coord = squareCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (isEmpty(x, y, true)){
				var chance = Math.random()
                if(Math.random()<0.003) {
					if (chance<0.3) {
						changePixel(pixel, "lithium_hydroxide")
					}
					else if (chance>0.3 && chance<0.7) {
						changePixel(pixel, "lithium_oxide")
					}
					else {
						changePixel(pixel, "lithium_carbonate")
					}
                }
            }
            if (!isEmpty(x, y, true)) {
                otherPixel = pixelMap[x][y];
                if (otherPixel.element != "mineral_oil") {
					if (otherPixel.element != "lithium" && otherPixel.element != "dull_lithium" && otherPixel.element != "tarnished_lithium") {
						var chance = Math.random()
						if(Math.random()<0.0007) {
							if (chance<0.3) {
								changePixel(pixel, "lithium_hydroxide")
							}
							else if (chance>0.3 && chance<0.7) {
								changePixel(pixel, "lithium_oxide")
							}
							else {
								changePixel(pixel, "lithium_carbonate")
							}
						}
					}
                }
            }
        }
    },
};

elements.lithium_oxide = {
	color: ["#ffffff", "#ececec", "#dbdbdb"],
	behavior: behaviors.POWDER,
	hidden: true,
	state: "solid",
	density: 2013,
	reactions: {
		"water": {elem1: "lithium_hydroxide", elem2: "pop", chance: 0.2},
		"carbon_dioxide": {elem1: "lithium_carbonate", elem2: null}
	}
};

elements.lithium_carbonate = {
	color: ["#ffffff", "#e0e0e0", "#c9c8c8"],
	behavior: behaviors.POWDER,
	hidden: true,
	state: "solid",
	density: 2110
};

elements.sodium = {
	color: ["#e8e8e8", "#f5f5f5", "#c9c9c9", "#d4d4d4"],
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
	tempHigh: 98,
	stateHigh: "liquid_sodium",
	density: 968,
	tick: function (pixel){
        var otherPixel;
        for (var i = 0; i < squareCoords.length; i++) {
            var coord = squareCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (isEmpty(x, y, true)){
                if(Math.random()<0.003) {
                    changePixel(pixel, "sodium_hydroxide")
                }
            }
            if (!isEmpty(x, y, true)) {
                otherPixel = pixelMap[x][y];
                if (otherPixel.element != "mineral_oil") {
					if (otherPixel.element != "sodium" && otherPixel.element != "sodium_hydroxide" && otherPixel.elememnt != "baking_soda") {
						if(Math.random()<0.001) {
							changePixel(pixel, "sodium_hydroxide")
						}
					}
                }
            }
        }
    },
	reactions: {
		"water": {elem1: "sodium_hydroxide", elem2: "hydrogen", temp1: 200, chance: 0.1},
		"salt_water": {elem1: "sodium_hydroxide", elem2: "hydrogen", temp1: 200, chance: 0.1},
	}
};

elements.liquid_sodium = {
    color: ["#e8e8e8", "#f5f5f5", "#c9c9c9", "#d4d4d4"],
	behavior: behaviors.LIQUID,
    hidden: true,
	state: "liquid",
    tempLow: 97,
	stateLow: "sodium",
	density: 951,
	reactions: {
		"water": {elem1: "sodium_hydroxide", elem2: "hydrogen", temp1: 200, chance: 0.0001},
		"salt_water": {elem1: "sodium_hydroxide", elem2: "hydrogen", temp1: 200, chance: 0.0001},
	}
};

elements.sodium_hydroxide = {
	color: ["#cccccc", "#c1c1c1", "#b7b7b7", "#bbbbbb"],
	behavior: behaviors.POWDER,
	hidden: true,
	state: "solid",
	density: 2100,
	tick: function (pixel){
        var otherPixel;
        for (var i = 0; i < squareCoords.length; i++) {
            var coord = squareCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (isEmpty(x, y, true)){
                if(Math.random()<0.0003) {
                    changePixel(pixel, "baking_soda")
                }
            }
            if (!isEmpty(x, y, true)) {
                otherPixel = pixelMap[x][y];
                if (otherPixel.element != "mineral_oil") {
					if (otherPixel.element != "sodium" && otherPixel.element != "sodium_hydroxide") {
						if(Math.random()<0.00001) {
							changePixel(pixel, "baking_soda")
						}
					}
                }
            }
        }
    },
    reactions: {
		"water": {elem1: "salt_water", elem2: null, chance: 0.1},
		"salt_water": {elem1: "salt_water", elem2: null, chance: 0.1},
	}
};


elements.mineral_oil = {
	color: ["#cdf6fa", "#e6fdff", "#bff9ff", "#f5feff"],
	behavior: behaviors.LIQUID,
	state: "liquid",
	category: "liquids",
	density: 870,
};
