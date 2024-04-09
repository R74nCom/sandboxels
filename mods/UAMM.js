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
		if(!isEmpty(x, y, true)){
			var otherPixel = pixelMap[x][y]
			if (otherPixel.element == "liquid_ammonia"){foundelem1 = true; break}
		}
	}
	for (var i = 0; i < squareCoords.length; i++) {
		var coord = squareCoords[i];
		var x = pixel.x+coord[0];
		var y = pixel.y+coord[1];
		if(!isEmpty(x, y, true)){
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
	reactions: {
		"water": {func: (pixel1) => {pixel1.burning=true;pixel1.burnStart=pixelTicks},
		elem1: ["rad_steam", "fallout"], elem2: "explosion"}
	}
}

elements.liquid_radiocesium = {
	color: ["#e8dcc1", "#d4c6a5", "#bfbaae", "#f5f1e9"],
	behavior: behaviors.RADMOLTEN,
	hidden: true,
	state: "liquid",
	tempLow: 28,
	stateLow: "radiocesium",
	density: 1842,
	reactions: {
		"water": {func: (pixel1) => {pixel1.burning=true;pixel1.burnStart=pixelTicks},
		elem1: ["rad_steam", "fallout"], elem2: "explosion"}
	}
}

elements.lithium = {
	color: ["#e3a814", "#dbab32", "#e8bc4f", "#fabf2d"],
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
	fireColor: "#8c21de",
	burn: 1,
	burnTime: 500,
	tempHigh: 29,
	stateHigh: "liquid_cesium",
	density: 534,
}
