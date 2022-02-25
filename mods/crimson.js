//TODO: enemies, ichor, crimsandstone
//Not doing: spawning
//Might not be possible: thorns (its breaking behavior would need a way for a pixel to detect when a pixel tryMove'd into its position), powders and clentamination (those would require a means of moving through pixels without falsely occupied pixels or other glitches)

function includesArray(parentArray, testArray) {
    for (let i = 0; i < parentArray.length; i++) {
        if (parentArray[i].every(function(value, index) { return value === testArray[index]})) {
            return true;
        }
    }
    return false;
}

crimRate = 0.002

function grassSpread(pixel,dirt,grass) {
	pixel.dirtArray = [] //initialize dirt neighbor list
	for (i = -3; i < 4; i++) { //iterate around
		for (j = -3; j < 4; j++) {
			if (!isEmpty(pixel.x+i,pixel.y+j,true)) { //check for a pixel to see if it's dirt
				if(Array.isArray(dirt)) {
					if(dirt.includes(pixelMap[pixel.x+i][pixel.y+j].element)) { //see if it's dirt
						if(!includesArray(pixel.dirtArray,[i,j])) { //avoid duplicate dirt entry
							pixel.dirtArray.push([i,j]) //store dirt
						}
					}
				} else {
					if(pixelMap[pixel.x+i][pixel.y+j].element == dirt) { //see if it's dirt
						if(!includesArray(pixel.dirtArray,[i,j])) { //avoid duplicate dirt entry
							pixel.dirtArray.push([i,j]) //store dirt
						}
					}
				}
			}
		}
	}
	for (k = 0; k < pixel.dirtArray.length; k++) { //iterate through dirt list
		if(Math.random() < crimRate*3.5) { //random chance
			if(isEmpty(pixel.x+pixel.dirtArray[k][0],pixel.y+pixel.dirtArray[k][1]-1)) { //check for empty space to grow grass
				createPixel(grass,pixel.x+pixel.dirtArray[k][0],pixel.y+pixel.dirtArray[k][1]-1) //place grass above dirt
			}
		}
	}
}

function crimSpread(pixel) { //corrupting (crimsonning?) blocks
	for (i = -3; i < 4; i++) { 
		for (j = -3; j < 4; j++) {
			if(i == 0 && j == 0) {
				continue
			}
			if(!isEmpty(pixel.x+i,pixel.y+j,true)) {
				if(pixelMap[pixel.x+i][pixel.y+j].element == "grass") {
					if(Math.random() < crimRate) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"crimson_grass")
					}
				} else if(pixelMap[pixel.x+i][pixel.y+j].element == "rock") {
					if(Math.random() < crimRate) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"crimstone")
					}
				} else if(pixelMap[pixel.x+i][pixel.y+j].element == "sand") {
					if(Math.random() < crimRate) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"crimsand")
					}
				} else if(pixelMap[pixel.x+i][pixel.y+j].element == "ice") {
					if(Math.random() < crimRate) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"red_ice")
					}
				} else if(pixelMap[pixel.x+i][pixel.y+j].element == "gravel") {
					if(Math.random() < crimRate) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"crimgravel")
					}
				} else if(pixelMap[pixel.x+i][pixel.y+j].element == "water") {
					if(Math.random() < crimRate*3) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"crimwater")
					}
				} else if(pixelMap[pixel.x+i][pixel.y+j].element == "snow") {
					if(Math.random() < crimRate) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"crimsnow")
					}
				} else if(pixelMap[pixel.x+i][pixel.y+j].element == "packed_snow") {
					if(Math.random() < crimRate) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"crimsnow")
					}
				} else if(pixelMap[pixel.x+i][pixel.y+j].element == "wet_sand") {
					if(Math.random() < crimRate) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"crimsand")
					}
				} else if(pixelMap[pixel.x+i][pixel.y+j].element == "mud") {
					if(Math.random() < crimRate) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"dirt")
					}
				} else if(pixelMap[pixel.x+i][pixel.y+j].element == "permafrost") {
					if(Math.random() < crimRate) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"dirt")
					}
				} else if(pixelMap[pixel.x+i][pixel.y+j].element == "vine") {
					if(Math.random() < crimRate) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"crimson_vine")
					}
				} else if(pixelMap[pixel.x+i][pixel.y+j].element == "sapling") {
					if(Math.random() < crimRate*4) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"shadewood_sapling")
					}
				}
			}
		}
	}
	grassSpread(pixel,"dirt","crimson_grass")
}

elements.crimson_grass = {
    color: ["#e82535","#cc471f","#d6153c","#c20e29","#b81a2c"],
    behavior: [
        "XX|CR:vicious_mushroom%0.01|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
    tick: function(pixel) {
        if(!pixel.ft) {
            pixel.ft = 0
        }
        if(pixel.ft % 3 == 0) { 
			crimSpread(pixel)
        }
		pixel.ft++
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn:50,
    burnTime:20,
    category:"life",
    state: "solid",
    density: 1400,
}

elements.crimstone = {
	color: ["#cb4444", "#953333", "#611c1c", "#b43434", "#752424"],
	behavior: behaviors.POWDER,
    tick: function(pixel) {
        if(!pixel.ft) {
            pixel.ft = 0
        }
        if(pixel.ft % 3 == 0) { 
			crimSpread(pixel)
        }
        pixel.ft++
    },
	tempHigh: 950,
	stateHigh: "magma",
	category: "land",
	state: "solid",
	density: 2550,
	hardness: 0.5,
	breakInto: ["crimsand","crimgravel"],
}

elements.crimsand = {
	color: ["#4c4c44", "#6c645c", "#5c544c", "#847c6c", "#24241c", "#4c4c44", "#6c645c", "#5c544c", "#847c6c", "#24241c", "#3c140c", "#842c24"],
	behavior: behaviors.POWDER,
    tick: function(pixel) {
        if(!pixel.ft) {
            pixel.ft = 0
        }
        if(pixel.ft % 3 == 0) { 
			crimSpread(pixel)
        }
        pixel.ft++
    },
	tempHigh: 1700,
	stateHigh: "molten_glass",
	category: "land",
	state: "solid",
	density: 1602,
}

elements.red_ice = {
	color: ["#f0ccc5", "#f7d8d2", "#eba39b"],
	behavior: behaviors.WALL,
    tick: function(pixel) {
        if(!pixel.ft) {
            pixel.ft = 0
        }
        if(pixel.ft % 3 == 0) { 
			crimSpread(pixel)
        }
        pixel.ft++
    },
	temp: 0,
	tempHigh: 5,
	stateHigh: "crimwater",
	category: "solids",
	state: "solid",
	density: 917,
	breakInto: "crimsnow",
}

elements.crimgravel = { //break from canon for crimstone breakInto
	color: ["#c4533f", "#de6957", "#b84639", "#cf4634", "#db6758", "#d17366", "#ab2b2b"],
	behavior: behaviors.POWDER,
    tick: function(pixel) {
        if(!pixel.ft) {
            pixel.ft = 0
        }
        if(pixel.ft % 3 == 0) { 
			crimSpread(pixel)
        }
        pixel.ft++
    },
	category:"land",
	tempHigh: 950,
	stateHigh: "magma",
	state: "solid",
	density: 1680,
	hardness: 0.2,
}

elements.crimwater = { //you shouldn't be able to purify ice by melting it
	color: "#e45c7c",
	behavior: behaviors.LIQUID,
    tick: function(pixel) {
        if(!pixel.ft) {
            pixel.ft = 0
        }
        if(pixel.ft % 3 == 0) { 
			crimSpread(pixel)
        }
        pixel.ft++
    },
	tempLow: 0,
	stateLow: "red_ice",
	viscosity: 1,
	category: "liquids",
	reactions: {
		"quicklime": { "elem1": null, "elem2": "slaked_lime", },
		"ruins": { "elem2": "rock", "chance": 0.00035 },
	},
	state: "liquid",
	density: 997,
	conduct: 0.02,
	stain: 0.1,
}

elements.crimsnow = { //BIG break from canon but you shouldn't be able to purify ice by grinding it either
	color: "#fce1e4",
	behavior: behaviors.POWDER,
    tick: function(pixel) {
        if(!pixel.ft) {
            pixel.ft = 0
        }
        if(pixel.ft % 3 == 0) { 
			crimSpread(pixel)
        }
        pixel.ft++
    },
	temp: 0,
	tempHigh: 5,
	stateHigh: "crimwater",
	category: "land",
	state: "solid",
	density: 100,
}

elements.vicious_mushroom = {
	color: "#e36554",
	behavior: behaviors.POWDER,
    tick: function(pixel) {
        if(!pixel.ft) {
            pixel.ft = 0
        }
        if(pixel.ft % 3 == 0) { 
			crimSpread(pixel)
        }
        pixel.ft++
    },
	category: "life",
	hidden: true,
	tempHigh: 225,
	stateHigh: "fire",
	burn: 10,
	burnTime: 65,
	state: "solid",
	density: 90.445,
}

elements.crimtane_ore = {
	color: ["#d83a3b", "#85242c", "#5d5d5d", "#540c14"],
	behavior: behaviors.POWDER,
	category: "land",
	tempHigh: 1552, //using palladium's melting point as an upper bound
	stateHigh: ["molten_slag","molten_slag","molten_crimtane"], //:sunglasses: can't turn things into slag if you're already slag
	state: "solid",
	density: 5854, //arbitrarily chosen, average of ((average of gold and palladium densities) + (crimstone density) + (crimstone density))
}

elements.crimtane = {
	color: ["#fc141e", "#C62A2F", "#903f3f", "#752E2E", "#5a1c1c", "#5B3C3C", "#5c5c5c"],
	behavior: behaviors.SOLID,
	category: "solids",
	tempHigh: 1200, //i want a behaviors.WALL form of crimtane... and I'm letting the game autogenerate molten_crimtane because I'm going to use it.
	//just pretend it got sintered somehow
	state: "solid",
	hidden: true,
	density: 15661,
}

elements.shadewood_tree_branch = {
	color: "#677a8f",
	behavior: [
		"CR:crimson_leaf,shadewood_tree_branch%2|CR:crimson_leaf,crimson_leaf,crimson_leaf,shadewood_tree_branch%2|CR:crimson_leaf,shadewood_tree_branch%2",
		"XX|XX|XX",
		"XX|XX|XX",
	],
	tempHigh: 400,
	stateHigh: ["fire","sap"],
	tempLow: -30,
	stateLow: "wood",
	category: "solids",
	burn: 40,
	burnTime: 50,
	burnInto: ["sap","ember","charcoal"],
	hidden: true,
	state: "solid",
	density: 1500,
	hardness: 0.15,
	breakInto: ["sap","sawdust"],
	hidden: true,
}
elements.crimson_vine = {
	color: "#de3323",
	behavior: [
		"XX|SP|XX",
		"XX|XX|XX",
		"XX|CL%1 AND M1|XX",
	],
    tick: function(pixel) {
        if(!pixel.ft) {
            pixel.ft = 0
        }
        if(pixel.ft % 3 == 0) { 
			crimSpread(pixel)
        }
        pixel.ft++
    },
	tempHigh: 100,
	stateHigh: "dead_plant",
	tempLow: -2,
	stateLow: "frozen_plant",
	burn: 35,
	burnTime: 100,
	category: "life",
	state: "solid",
	density: 1050,
}

elements.shadewood = {
	color: "#677a8f",
	behavior: behaviors.WALL,
	tempHigh: 400,
	stateHigh: ["ember","charcoal","fire","fire","fire"],
	category: "solids",
	burn: 5,
	burnTime: 300,
	burnInto: ["ember","charcoal","fire"],
	state: "solid",
	hardness: 0.15,
	breakInto: "shadewood_sawdust",
	density: 930, //used tigerwood
}

elements.shadewood_sapling = {
	color: ["#e64029", "#d43b26"],
	behavior: [
		"XX|M2%2|XX",
		"XX|L2:shadewood,shadewood_tree_branch%80|XX",
		"XX|M1|XX",
	],
	tempHigh: 100,
	stateHigh: "dead_plant",
	tempLow: -2,
	stateLow: "frozen_plant",
	burn: 65,
	burnTime: 15,
	category: "life",
	state: "solid",
	density: 1500,
}

elements.shadewood_sawdust = {
	color: ["#95abcf","#8190a3"],
	behavior: behaviors.POWDER,
	tempHigh: 400,
	stateHigh: "fire",
	category: "powders",
	burn: 25,
	burnTime: 150,
	burnInto: ["ash","fire","fire","fire"],
	state: "solid",
	density: 493,
	hidden: true,
}

elements.crimson_leaf = {
	color: "#de3323",
	behavior: behaviors.WALL,
	category:"life",
	tempHigh: 100,
	stateHigh: "dead_plant",
	tempLow: -1.66,
	stateLow: "frozen_plant",
	burn:65,
	burnTime:60,
	burnInto: "dead_plant",
	state: "solid",
	density: 500,
	hidden: true,
}
