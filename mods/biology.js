// by Nekonico

viewInfo[4] = { // Nutrition View
    name: "nutr",
    pixel: function(pixel,ctx) {
        if (elements[pixel.element].isBio === true) {
        var nutrition = pixel.nutrition;
        if (nutrition < 0) {nutrition = 0}
        if (nutrition > 6000) {nutrition = 6000}
        // logarithmic scale, with coldest being 225 (-50 degrees) and hottest being 0 (6000 degrees)
        var hue = Math.round(225 - (Math.log(nutrition)/Math.log(6000))*225);
        if (hue < 0) {hue = 0}
        if (hue > 225) {hue = 225}
        drawSquare(ctx,"hsl("+hue+",100%,50%)",pixel.x,pixel.y)
        }
    }
}

viewInfo[5] = { // Oxy View
    name: "oxy",
    pixel: function(pixel,ctx) {
        if (elements[pixel.element].isBio === true) {
            var oxygen = pixel.oxygen;
            if (oxygen < 0) {oxygen = 0}
            if (oxygen > 6000) {oxygen = 6000}
            // logarithmic scale, with coldest being 225 (-50 degrees) and hottest being 0 (6000 degrees)
            var hue = Math.round(225 - (Math.log(oxygen)/Math.log(6000))*225);
            if (hue < 0) {hue = 0}
            if (hue > 225) {hue = 225}
            drawSquare(ctx,"hsl("+hue+",100%,50%)",pixel.x,pixel.y)
        }
    }
}

elements.flesh = {
	color: ["#9e4839","#ba6449"],
	category: "structural",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"rotten_meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        doDefaults(pixel);
    },
    density: 2710,
    state: "solid",
    conduct: .05,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
	reactions: {
        "cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","blood","fat","meat","rotten_meat","cooked_meat"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    isBio: true,
    movable: false,
}

elements.epidermis = {
	color: "#f7ead0",
	category: "structural",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((pixel.temp > 35 || pixel.temp < 10) && Math.random() < 0.005) {
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coords = adjacentCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (isEmpty(x,y)) {
                    if (pixel.temp > 35) {
                        pixel.temp -= 20;
                        createPixel("salt_water",x,y);
                        break;
                    }
                    pixel.temp += 20;
                    break;
                }
            }
        }
        if (pixel.temp < 15 && Math.random() < 0.1) {
            pixel.temp += 1;
        }
        doDefaults(pixel);
        if (Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"dust"); 
            }
            else {
                changePixel(pixel,"meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .05,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","meat","rotten_meat","cooked_meat","flesh"], chance:0.2 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    isBio: true,
    movable: false,
}

elements.dermis = {
	color: "#CFA08B",
	category: "structural",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000)) && Math.random() < 0.005) {
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coords = adjacentCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (isEmpty(x,y)) {
                    createPixel("epidermis",x,y);
                }
            }
        }
        doDefaults(pixel);
        if (Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"rotten_meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .05,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","meat","rotten_meat","cooked_meat","flesh"], chance:0.2 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    isBio: true,
    movable: false,
}

elements.scales = {
	color: "#6b839a",
	category: "structural",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (pixel.temp > 40 && Math.random() < 0.1) {
            pixel.temp -= 1;
        }
        doDefaults(pixel);
        if (Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.1) {
                changePixel(pixel,"calcium"); 
            }
            else {
                changePixel(pixel,"dust"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .05,
    tempHigh: 210,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    breakInto: ["blood","meat"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.000075 },
        "radiation": { elem1:["calcium","calcium","ash","meat","rotten_meat","cooked_meat","skin","epidermis"], chance:0.1 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    isBio: true,
    movable: false,
}

elements.scale_dermis = {
	color: "#CFA08B",
	category: "structural",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000)) && Math.random() < 0.005) {
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coords = adjacentCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (isEmpty(x,y)) {
                    createPixel("scales",x,y);
                }
            }
        }
        doDefaults(pixel);
        if (Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"rotten_meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .05,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","meat","rotten_meat","cooked_meat","flesh"], chance:0.2 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    isBio: true,
    movable: false,
}

elements.bug_dermis = {
	color: "#C6AD5B",
	category: "structural",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000)) && Math.random() < 0.005) {
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coords = adjacentCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (isEmpty(x,y)) {
                    createPixel("exoskeleton",x,y);
                }
            }
        }
        doDefaults(pixel);
        if (Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"rotten_meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .05,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","meat","rotten_meat","cooked_meat","flesh"], chance:0.2 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    isBio: true,
    movable: false,
}

elements.amphib_dermis = {
	color: "#9DAB6A",
    name: "amphibian_dermis",
	category: "structural",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000)) && Math.random() < 0.005) {
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coords = adjacentCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (isEmpty(x,y)) {
                    createPixel("amphib_skin",x,y);
                }
            }
        }
        doDefaults(pixel);
        if (Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"rotten_meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .05,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat","meat","slime","slime"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","slime","meat","rotten_meat","cooked_meat","flesh"], chance:0.2 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    isBio: true,
    movable: false,
}

elements.acidic_flesh = {
	color: ["#946231","#976E30"],
	category: "structural",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.1) {
                changePixel(pixel,"rotten_meat"); 
            }
            else {
                changePixel(pixel,"acid"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .05,
    tempHigh: 200,
    stateHigh: ["acid_gas","cooked_meat","cooked_meat","cooked_meat"],
    tempLow: -25,
    stateLow: ["frozen_meat","acid","acid"],
    burn: 10,
    burnTime: 250,
    burnInto: ["acid_gas","cooked_meat","cooked_meat"],
    breakInto: ["acid","acid","meat"],
	reactions: {
        "cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","acid","fat","meat","rotten_meat","cooked_meat"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    isBio: true,
    movable: false,
}

elements.slimey_flesh = {
	color: ["#8EA714","#96B013"],
	category: "structural",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.1) {
                changePixel(pixel,"rotten_meat"); 
            }
            else {
                changePixel(pixel,"slime"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .05,
    tempHigh: 200,
    stateHigh: ["slime","cooked_meat","cooked_meat","cooked_meat"],
    tempLow: -25,
    stateLow: ["frozen_meat","slime_ice","slime_ice"],
    burn: 10,
    burnTime: 250,
    burnInto: ["slime","cooked_meat","cooked_meat"],
    breakInto: ["slime","slime","meat"],
	reactions: {
        "cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","slime","slime","meat","rotten_meat","cooked_meat"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    isBio: true,
    movable: false,
}

elements.adipose = {
	color: ["#C3A375","#B9945A"],
	category: "nutrition",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"rotten_meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 1000
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 15
                    pixel.oxygen -= 15
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 5
                    pixel.nutrition -= 5
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 15
                    pixel.oxygen -= 15
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 5
                    pixel.nutrition -= 5
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 15
                    pixel.oxygen -= 15
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 5
                    pixel.nutrition -= 5
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 15
                    pixel.oxygen -= 15
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 5
                    pixel.nutrition -= 5
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .03,
    tempHigh: 200,
    stateHigh: ["fat","fat","fat","cooked_meat"],
    tempLow: -25,
    stateLow: ["fat","frozen_meat"],
    burn: 15,
    burnTime: 300,
    burnInto: ["fat","fat","fat","cooked_meat"],
    breakInto: ["fat","meat"],
	reactions: {
        "cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","blood","fat","fat","fat","fat","fat","meat","rotten_meat","cooked_meat"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1005,
    },
    isBio: true,
    movable: false,
}

elements.acid_vessel = {
    color: "#BF6B0E",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.975 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            changePixel(pixel,"acid");
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 25
                    pixel.oxygen -= 25
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 20
                    pixel.nutrition -= 20
                }
            }
        }
        else if (isEmpty(pixel.x, pixel.y-1) && Math.random() > 0.75) {
            if (Math.random() > 0.95) {
                createPixel("acid",pixel.x,pixel.y-1)
            }
            pixel.oxygen -= 50
            pixel.nutrition -= 50
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 25
                    pixel.oxygen -= 25
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 20
                    pixel.nutrition -= 20
                }
            }
        }
        else if (isEmpty(pixel.x, pixel.y+1) && Math.random() > 0.75) {
            if (Math.random() > 0.95) {
                createPixel("acid",pixel.x,pixel.y+1)
            }
            pixel.oxygen -= 50
            pixel.nutrition -= 50
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 25
                    pixel.oxygen -= 25
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 20
                    pixel.nutrition -= 20
                }
            }
        }
        else if (isEmpty(pixel.x-1, pixel.y) && Math.random() > 0.75) {
            if (Math.random() > 0.95) {
                createPixel("acid",pixel.x-1,pixel.y)
            }
            pixel.oxygen -= 50
            pixel.nutrition -= 50
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 25
                    pixel.oxygen -= 25
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 20
                    pixel.nutrition -= 20
                }
            }
        }
        else if (isEmpty(pixel.x+1, pixel.y) && Math.random() > 0.75) {
            if (Math.random() > 0.95) {
                createPixel("acid",pixel.x+1,pixel.y)
            }
            pixel.oxygen -= 50
            pixel.nutrition -= 50
        }
    },
    properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    tempHigh: 175,
    stateHigh: ["acid_gas","acid_gas","acid_gas","cooked_meat","cooked_meat"],
    tempLow: -50,
    stateLow: "frozen_meat",
    burn: 20,
    burnTime: 60,
    burnInto: ["acid_gas","acid_gas","acid_gas","acid_gas","cooked_meat"],
    breakInto: "acid",
    category: "circulation",
    state: "solid",
    density: 1250,
    conduct: 0.1,
    movable: false,
    isBio: true,
}

elements.heart = {
    color: ["#98002e","#532e63","#6f1200","#551900"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.975 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            changePixel(pixel,"blood");
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 25
                    pixel.oxygen -= 25
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 20
                    pixel.nutrition -= 20
                }
                if (elements[hitPixel.element].isBlood === true && hitPixel.heartAttached === false && Math.random() > 0.5) {
                    hitPixel.heartAttached = true
                }
            }
        }
        else if (isEmpty(pixel.x, pixel.y-1) && Math.random() > 0.75) {
            if (Math.random() > 0.95) {
                createPixel("blood",pixel.x,pixel.y-1)
            }
            pixel.oxygen -= 50
            pixel.nutrition -= 50
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 25
                    pixel.oxygen -= 25
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 20
                    pixel.nutrition -= 20
                }
                if (elements[hitPixel.element].isBlood === true && hitPixel.heartAttached === false && Math.random() > 0.5) {
                    hitPixel.heartAttached = true
                }
            }
        }
        else if (isEmpty(pixel.x, pixel.y+1) && Math.random() > 0.75) {
            if (Math.random() > 0.95) {
                createPixel("blood",pixel.x,pixel.y+1)
            }
            pixel.oxygen -= 50
            pixel.nutrition -= 50
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 25
                    pixel.oxygen -= 25
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 20
                    pixel.nutrition -= 20
                }
                if (elements[hitPixel.element].isBlood === true && hitPixel.heartAttached === false && Math.random() > 0.5) {
                    hitPixel.heartAttached = true
                }
            }
        }
        else if (isEmpty(pixel.x-1, pixel.y) && Math.random() > 0.75) {
            if (Math.random() > 0.95) {
                createPixel("blood",pixel.x-1,pixel.y)
            }
            pixel.oxygen -= 50
            pixel.nutrition -= 50
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 25
                    pixel.oxygen -= 25
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 20
                    pixel.nutrition -= 20
                }
                if (elements[hitPixel.element].isBlood === true && hitPixel.heartAttached === false && Math.random() > 0.5) {
                    hitPixel.heartAttached = true
                }
            }
        }
        else if (isEmpty(pixel.x+1, pixel.y) && Math.random() > 0.75) {
            if (Math.random() > 0.95) {
                createPixel("blood",pixel.x+1,pixel.y)
            }
            pixel.oxygen -= 50
            pixel.nutrition -= 50
        }
    },
    properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    tempHigh: 175,
    stateHigh: "meat",
    tempLow: -50,
    stateLow: "frozen_meat",
    burn: 20,
    burnTime: 60,
    burnInto: "meat",
    breakInto: "blood",
    category: "circulation",
    state: "solid",
    density: 1250,
    conduct: 0.1,
    movable: false,
    isBio: true,
}

elements.blood_vessel = {
    color: "#c72114",
    behavior: [
        "XX|SW:blood_vessel%1|XX",
        "SW:blood_vessel%1|XX|SW:blood_vessel%1",
        "XX|SW:blood_vessel%1|XX",
    ],
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.975 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen--
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            changePixel(pixel,"blood");
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    if (pixel.heartAttached === true) {
                        hitPixel.oxygen += 35
                        pixel.oxygen -= 34
                    }
                    else {
                        hitPixel.oxygen += 25
                        pixel.oxygen -= 25
                    }
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    if (pixel.heartAttached === true) {
                        hitPixel.nutrition += 30
                        pixel.nutrition -= 29
                    }
                    else {
                        hitPixel.nutrition += 20
                        pixel.nutrition -= 20
                    }
                }
                if (elements[hitPixel.element].isBlood === true && pixel.heartAttached === true && hitPixel.heartAttached === false && Math.random() > 0.5) {
                    hitPixel.heartAttached = true
                }
            }
        }
        else if (isEmpty(pixel.x, pixel.y-1) && Math.random() > 0.75 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000))) {
            if (Math.random() > 0.95) {
                createPixel("blood",pixel.x,pixel.y-1)
            }
            pixel.oxygen -= 50
            pixel.nutrition -= 50
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    if (pixel.heartAttached === true) {
                        hitPixel.oxygen += 35
                        pixel.oxygen -= 35
                    }
                    else {
                        hitPixel.oxygen += 25
                        pixel.oxygen -= 25
                    }
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    if (pixel.heartAttached === true) {
                        hitPixel.nutrition += 30
                        pixel.nutrition -= 30
                    }
                    else {
                        hitPixel.nutrition += 20
                        pixel.nutrition -= 20
                    }
                }
                if (elements[hitPixel.element].isBlood === true && pixel.heartAttached === true && hitPixel.heartAttached === false && Math.random() > 0.5) {
                    hitPixel.heartAttached = true
                }
            }
        }
        else if (isEmpty(pixel.x, pixel.y+1) && Math.random() > 0.75 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000))) {
            if (Math.random() > 0.95) {
                createPixel("blood",pixel.x,pixel.y+1)
            }
            pixel.oxygen -= 50
            pixel.nutrition -= 50
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    if (pixel.heartAttached === true) {
                        hitPixel.oxygen += 35
                        pixel.oxygen -= 35
                    }
                    else {
                        hitPixel.oxygen += 25
                        pixel.oxygen -= 25
                    }
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    if (pixel.heartAttached === true) {
                        hitPixel.nutrition += 30
                        pixel.nutrition -= 30
                    }
                    else {
                        hitPixel.nutrition += 20
                        pixel.nutrition -= 20
                    }
                }
                if (elements[hitPixel.element].isBlood === true && pixel.heartAttached === true && hitPixel.heartAttached === false && Math.random() > 0.5) {
                    hitPixel.heartAttached = true
                }
            }
        }
        else if (isEmpty(pixel.x-1, pixel.y) && Math.random() > 0.75 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000))) {
            if (Math.random() > 0.95) {
                createPixel("blood",pixel.x-1,pixel.y)
            }
            pixel.oxygen -= 50
            pixel.nutrition -= 50
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    if (pixel.heartAttached === true) {
                        hitPixel.oxygen += 35
                        pixel.oxygen -= 35
                    }
                    else {
                        hitPixel.oxygen += 25
                        pixel.oxygen -= 25
                    }
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    if (pixel.heartAttached === true) {
                        hitPixel.nutrition += 30
                        pixel.nutrition -= 30
                    }
                    else {
                        hitPixel.nutrition += 20
                        pixel.nutrition -= 20
                    }
                }
                if (elements[hitPixel.element].isBlood === true && pixel.heartAttached === true && hitPixel.heartAttached === false && Math.random() > 0.5) {
                    hitPixel.heartAttached = true
                }
            }
        }
        else if (isEmpty(pixel.x+1, pixel.y) && Math.random() > 0.75 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000))) {
            if (Math.random() > 0.95) {
                createPixel("blood",pixel.x+1,pixel.y)
            }
            pixel.oxygen -= 50
            pixel.nutrition -= 50
        }
    },
    properties: {
        oxygen: 1000,
        nutrition: 1000,
        heartAttached: false,
    },
    tempHigh: 175,
    stateHigh: "meat",
    tempLow: -50,
    stateLow: "frozen_meat",
    burn: 20,
    burnTime: 60,
    burnInto: "meat",
    breakInto: "blood",
    category: "circulation",
    state: "solid",
    density: 1250,
    conduct: 0.1,
    movable: false,
    isBio: true,
    isBlood: true,
}

elements.white_blood_cell = {
    color: "#F5D7D4",
    behavior: [
        "XX|SW:blood,blood_vessel%1|XX",
        "SW:blood,blood_vessel%1 AND M2%10|XX|SW:blood,blood_vessel%1 AND M2%10",
        "M2|SW:blood,blood_vessel%1 AND M1|M2",
    ],
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.975 && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            changePixel(pixel,"blood");
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 25
                    pixel.oxygen -= 25
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 20
                    pixel.nutrition -= 20
                }
                if (elements[hitPixel.element].isBlood === true && pixel.heartAttached === true && hitPixel.heartAttached === false && Math.random() > 0.5) {
                    hitPixel.heartAttached = true
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 25
                    pixel.oxygen -= 25
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 20
                    pixel.nutrition -= 20
                }
                if (elements[hitPixel.element].isBlood === true && pixel.heartAttached === true && hitPixel.heartAttached === false && Math.random() > 0.5) {
                    hitPixel.heartAttached = true
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 25
                    pixel.oxygen -= 25
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 20
                    pixel.nutrition -= 20
                }
                if (elements[hitPixel.element].isBlood === true && pixel.heartAttached === true && hitPixel.heartAttached === false && Math.random() > 0.5) {
                    hitPixel.heartAttached = true
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 25
                    pixel.oxygen -= 25
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 20
                    pixel.nutrition -= 20
                }
                if (elements[hitPixel.element].isBlood === true && pixel.heartAttached === true && hitPixel.heartAttached === false && Math.random() > 0.5) {
                    hitPixel.heartAttached = true
                }
            }
        }
    },
    properties: {
        oxygen: 1000,
        nutrition: 1000,
        heartAttached: false,
    },
    reactions: {
		"cancer": { elem2:"flesh", chance:10  },
        "infection": { elem2:"blood_vessel", chance:10  },
        "plague": { elem2:null, chance:10  },
        "cell": { elem2:"flesh", chance:10 },
        "rotten_meat": { elem2:"flesh", chance:10 },
        "meat": { elem2:"flesh", chance:10 },
	},
    tempHigh: 175,
    stateHigh: "meat",
    tempLow: -50,
    stateLow: "frozen_meat",
    burn: 20,
    burnTime: 60,
    burnInto: "meat",
    breakInto: "blood",
    category: "circulation",
    state: "solid",
    density: 1250,
    conduct: 0.1,
    movable: false,
    isBio: true,
    isBlood: true,
}

elements.eye = {
	color: "#451800",
	category: "nervous system",
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
        if (Math.random() > 0.895 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"rotten_meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            doElectricity(hitPixel);
            if (elements[hitPixel.element].id === elements.light.id) {
                pixel.saw = true
            }
            else if (pixel.saw === true && elements[hitPixel.element].id === elements.eye.id && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000))) {
                pixel.saw = false
                hitPixel.saw = true
            }
            else if (pixel.saw === true && elements[hitPixel.element].id === elements.eye_nerve.id && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000))) {
                if (!hitPixel.charge) {
                    hitPixel.charge = 0.1
                }
                else if (hitPixel.charge) {
                    hitPixel.charge += 0.1
                }
                pixel.saw = false
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            doElectricity(hitPixel);
            if (elements[hitPixel.element].id === elements.light.id && Math.random() > 0.5) {
                pixel.saw = true
            }
            else if (pixel.saw === true && elements[hitPixel.element].id === elements.eye.id && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000))) {
                pixel.saw = false
                hitPixel.saw = true
            }
            else if (pixel.saw === true && elements[hitPixel.element].id === elements.eye_nerve.id && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000))) {
                if (!hitPixel.charge) {
                    hitPixel.charge = 0.1
                }
                else if (hitPixel.charge) {
                    hitPixel.charge += 0.1
                }
                pixel.saw = false
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            doElectricity(hitPixel);
            if (elements[hitPixel.element].id === elements.light.id && Math.random() > 0.5) {
                pixel.saw = true
            }
            else if (pixel.saw === true && elements[hitPixel.element].id === elements.eye.id && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000))) {
                pixel.saw = false
                hitPixel.saw = true
            }
            else if (pixel.saw === true && elements[hitPixel.element].id === elements.eye_nerve.id && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000))) {
                if (!hitPixel.charge) {
                    hitPixel.charge = 0.1
                }
                else if (hitPixel.charge) {
                    hitPixel.charge += 0.1
                }
                pixel.saw = false
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            doElectricity(hitPixel);
            if (elements[hitPixel.element].id === elements.light.id && Math.random() > 0.5) {
                pixel.saw = true
            }
            else if (pixel.saw === true && elements[hitPixel.element].id === elements.eye.id && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000))) {
                pixel.saw = false
                hitPixel.saw = true
            }
            else if (pixel.saw === true && elements[hitPixel.element].id === elements.eye_nerve.id && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000))) {
                if (!hitPixel.charge) {
                    hitPixel.charge = 0.1
                }
                else if (hitPixel.charge) {
                    hitPixel.charge += 0.1
                }
                pixel.saw = false
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    tempHigh: 200,
    stateHigh: ["cooked_meat","salt_water","blood"],
    tempLow: -25,
    stateLow: ["salt_water","cerebrospinal_fluid","salt_water","blood","frozen_meat"],
    burn: 10,
    burnTime: 250,
    conduct: .05,
    burnInto: ["cooked_meat","salt_water","blood"],
    breakInto: ["blood","blood","blood","blood","cerebrospinal_fluid","cerebrospinal_fluid","salt_water","meat"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","steam","salt","ash","steam","salt","meat","rotten_meat","cooked_meat","flesh"], chance:0.5 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
        saw: false,
    },
    isBio: true,
    movable: false,
}

elements.brain = {
	color: ["#fce3e3","#deb6c5","#f5ced5","#e87b8f"],
	category: "nervous system",
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
        if (Math.random() > 0.85 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"rotten_meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            doElectricity(hitPixel);
            if (elements[hitPixel.element].id === elements.nerve.id && Math.random() > 0.5 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 4000))) {
                if (!hitPixel.charge) {
                    hitPixel.charge = 0.1
                }
                else if (hitPixel.charge) {
                    hitPixel.charge += 0.1
                }
                pixel.chargeCD = 8
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            doElectricity(hitPixel);
            if (elements[hitPixel.element].id === elements.nerve.id && Math.random() > (1.25 - ((pixel.nutrition + pixel.oxygen) / 2000))) {
                if (!hitPixel.charge) {
                    hitPixel.charge = 0.1
                }
                else if (hitPixel.charge) {
                    hitPixel.charge += 0.1
                }
                pixel.chargeCD = 8
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            doElectricity(hitPixel);
            if (elements[hitPixel.element].id === elements.nerve.id && Math.random() > (1.25 - ((pixel.nutrition + pixel.oxygen) / 2000))) {
                if (!hitPixel.charge) {
                    hitPixel.charge = 0.1
                }
                else if (hitPixel.charge) {
                    hitPixel.charge += 0.1
                }
                pixel.chargeCD = 8
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            doElectricity(hitPixel);
            if (elements[hitPixel.element].id === elements.nerve.id && Math.random() > (1.25 - ((pixel.nutrition + pixel.oxygen) / 2000))) {
                if (!hitPixel.charge) {
                    hitPixel.charge = 0.1
                }
                else if (hitPixel.charge) {
                    hitPixel.charge += 0.1
                }
                pixel.chargeCD = 8
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .5,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","steam","salt","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    isBio: true,
    movable: false,
}

elements.amygdala = { // please please please ignore that i callled it the amygdala imstupid and trided to fix it IM SORGYRY
	color: ["#B33E93","#B33E93","#f5ced5","#e87b8f"],
	category: "nervous system",
    name:"hypothalamus",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (Math.random() > 0.895 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen--
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"rotten_meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (pixel.temp > 25) { pixel.temp -= 1; }
        else if (pixel.temp < 15) { pixel.temp += 1; }
    },
    density: 2710,
    state: "solid",
    conduct: .8,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","steam","salt","ash","steam","salt","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    isBio: true,
    movable: false,
}

elements.eye_nerve = {
	color: "#B33E93",
	category: "nervous system",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.895 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"rotten_meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .8,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","steam","salt","ash","steam","salt","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    isBio: true,
    movable: false,
}

elements.nerve = {
	color: "#B33E93",
	category: "nervous system",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.895 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"rotten_meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .8,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","steam","salt","ash","steam","salt","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    isBio: true,
    movable: false,
}

elements.throat_lining = {
	color: "#bc6157",
	category: "nutrition",
    behavior: [
        "XX|DL:stomach_acid,explosive_acid,carni_acid,herbi_acid%5|XX",
        "DL:stomach_acid,explosive_acid,carni_acid,herbi_acid%5|XX|DL:stomach_acid,explosive_acid,carni_acid,herbi_acid%5",
        "XX|DL:stomach_acid,explosive_acid,carni_acid,herbi_acid%5|XX",
    ],
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"rotten_meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .05,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","slime","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    isBio: true,
    movable: false,
}

elements.intestines = {
	color: "#bc6157",
	category: "nutrition",
    behavior: behaviors.WALL,
	hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"rotten_meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
		if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].id === elements.digested_material.id && Math.random() > 0.99) {
                changePixel(hitPixel,"poop");
                pixel.nutrition += hitPixel.nutrition;
                hitPixel.nutrition = 0;
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.25) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].id === elements.digested_material.id && Math.random() > 0.99) {
                changePixel(hitPixel,"poop");
                pixel.nutrition += hitPixel.nutrition;
                hitPixel.nutrition = 0;
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.25) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].id === elements.digested_material.id && Math.random() > 0.99) {
                changePixel(hitPixel,"poop");
                pixel.nutrition += hitPixel.nutrition;
                hitPixel.nutrition = 0;
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.25) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].id === elements.digested_material.id && Math.random() > 0.99) {
                changePixel(hitPixel,"poop");
                pixel.nutrition += hitPixel.nutrition;
                hitPixel.nutrition = 0;
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.25) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .05,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","steam","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    movable: false,
    isBio: true
}

elements.appendix = {
	color: "#B45942",
	category: "nutrition",
    behavior: behaviors.WALL,
	hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
            if (Math.random() > 0.999 && (pixel.nutrition < 750 || pixel.oxygen < 500)) {
                changePixel(pixel,"stomach_acid");
            }
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"rotten_meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
		if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].id === elements.digested_material.id && Math.random() > 0.999) {
                changePixel(hitPixel,"poop");
                pixel.nutrition += hitPixel.nutrition
                if (Math.random() > 0.90) {
                    changePixel(pixel,"stomach_acid");
                }
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.25) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].id === elements.digested_material.id && Math.random() > 0.999) {
                changePixel(hitPixel,"poop");
                pixel.nutrition += hitPixel.nutrition
                if (Math.random() > 0.90) {
                    changePixel(pixel,"stomach_acid");
                }
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.25) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].id === elements.digested_material.id && Math.random() > 0.999) {
                changePixel(hitPixel,"poop");
                pixel.nutrition += hitPixel.nutrition
                if (Math.random() > 0.90) {
                    changePixel(pixel,"stomach_acid");
                }
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.25) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].id === elements.digested_material.id && Math.random() > 0.999) {
                changePixel(hitPixel,"poop");
                pixel.nutrition += hitPixel.nutrition
                if (Math.random() > 0.90) {
                    changePixel(pixel,"stomach_acid");
                }
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.25) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .05,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["stomach_acid","blood","meat"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","steam","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    movable: false,
    isBio: true
}

elements.simple_lung = {
	color: "#EB85D9",
	category: "oxygen",
    behavior: behaviors.WALL,
	hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        for (var i = 0; i < adjacentCoords.length; i++) {
            var x = pixel.x+adjacentCoords[i][0];
            var y = pixel.y+adjacentCoords[i][1];
            if (isEmpty(x,y)) {
                if (Math.random() < 0.01) { pixel.oxygen += 100 }
                break
            } } 
        if (Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"rotten_meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
		if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .05,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","carbon_dioxide","meat","rotten_meat","cooked_meat","flesh","ash","carbon_dioxide","meat","rotten_meat","cooked_meat","flesh","ash","oxygen","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    movable: false,
    isBio: true
}

elements.lungs = {
	color: "#d4aaab",
	category: "oxygen",
    behavior: behaviors.WALL,
	hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"rotten_meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
		if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].id === elements.oxygen.id && Math.random() > 0.95) {
                if (Math.random() > 0.75) {
                    changePixel(hitPixel,"carbon_dioxide");
                }
                pixel.oxygen += 100
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].id === elements.oxygen.id && Math.random() > 0.95) {
                if (Math.random() > 0.75) {
                    changePixel(hitPixel,"carbon_dioxide");
                }
                pixel.oxygen += 100
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].id === elements.oxygen.id && Math.random() > 0.95) {
                if (Math.random() > 0.75) {
                    changePixel(hitPixel,"carbon_dioxide");
                }
                pixel.oxygen += 100
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].id === elements.oxygen.id && Math.random() > 0.95) {
                if (Math.random() > 0.75) {
                    changePixel(hitPixel,"carbon_dioxide");
                }
                pixel.oxygen += 100
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .05,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","carbon_dioxide","meat","rotten_meat","cooked_meat","flesh","ash","carbon_dioxide","meat","rotten_meat","cooked_meat","flesh","ash","oxygen","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    movable: false,
    isBio: true
}

elements.amphib_skin = {
    name: "amphibian_skin",
	color: "#7E9C33",
	category: "oxygen",
    behavior: [
        "XX|CR:slime%0.001|XX",
        "CR:slime%0.001|XX|CR:slime%0.001",
        "XX|CR:slime%0.001|XX",
    ],
	hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((pixel.temp > 35 || pixel.temp < 10) && Math.random() < 0.005) {
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coords = adjacentCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (isEmpty(x,y)) {
                    if (pixel.temp > 35) {
                        pixel.temp -= 20;
                        if (Math.random() < 0.01) {
                            createPixel("slime",x,y);
                        }
                        break;
                    }
                    pixel.temp += 20;
                    break;
                }
            }
        }
        if (pixel.temp < 15 && Math.random() < 0.1) {
            pixel.temp += 1;
        }
        doDefaults(pixel);
        if (Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"rotten_meat"); 
            }
            else {
                changePixel(pixel,"dust"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
		if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].id === elements.oxygen.id && Math.random() > 0.95) {
                if (Math.random() > 0.75) {
                    changePixel(hitPixel,"carbon_dioxide");
                }
                pixel.oxygen += 100
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].id === elements.oxygen.id && Math.random() > 0.95) {
                if (Math.random() > 0.75) {
                    changePixel(hitPixel,"carbon_dioxide");
                }
                pixel.oxygen += 100
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].id === elements.oxygen.id && Math.random() > 0.95) {
                if (Math.random() > 0.75) {
                    changePixel(hitPixel,"carbon_dioxide");
                }
                pixel.oxygen += 100
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].id === elements.oxygen.id && Math.random() > 0.95) {
                if (Math.random() > 0.75) {
                    changePixel(hitPixel,"carbon_dioxide");
                }
                pixel.oxygen += 100
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .05,
    tempHigh: 220,
    stateHigh: ["cooked_meat","slime"],
    tempLow: -25,
    stateLow: ["frozen_meat","slime_ice","slime_ice"],
    breakInto: ["blood","meat","slime","slime"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.000075 },
        "radiation": { elem1:["slime","slime","ash","meat","rotten_meat","cooked_meat","skin","epidermis"], chance:0.1 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    isBio: true,
    movable: false,
    burn:5,
    burnTime:25,
    burnInto: ["cooked_meat","calcium","calcium","cooked_meat","calcium","calcium","quicklime"],
}

elements.exoskeleton = {
	color: ["#453a2e","#241d15","#242e23"],
	category: "oxygen",
    behavior: behaviors.WALL,
	hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (pixel.temp > 40 && Math.random() < 0.1) {
            pixel.temp -= 1;
        }
        doDefaults(pixel);
        if (Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.1) {
                changePixel(pixel,"calcium"); 
            }
            else {
                changePixel(pixel,"dust"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
		if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].id === elements.oxygen.id && Math.random() > 0.95) {
                if (Math.random() > 0.75) {
                    changePixel(hitPixel,"carbon_dioxide");
                }
                pixel.oxygen += 100
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].id === elements.oxygen.id && Math.random() > 0.95) {
                if (Math.random() > 0.75) {
                    changePixel(hitPixel,"carbon_dioxide");
                }
                pixel.oxygen += 100
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].id === elements.oxygen.id && Math.random() > 0.95) {
                if (Math.random() > 0.75) {
                    changePixel(hitPixel,"carbon_dioxide");
                }
                pixel.oxygen += 100
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].id === elements.oxygen.id && Math.random() > 0.95) {
                if (Math.random() > 0.75) {
                    changePixel(hitPixel,"carbon_dioxide");
                }
                pixel.oxygen += 100
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .05,
    tempHigh: 220,
    stateHigh: ["cooked_meat","calcium","calcium"],
    tempLow: -25,
    stateLow: "frozen_meat",
    breakInto: ["blood","meat","calcium"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.000075 },
        "radiation": { elem1:["calcium","calcium","ash","meat","rotten_meat","cooked_meat","skin","epidermis"], chance:0.1 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    isBio: true,
    movable: false,
    burn:5,
    burnTime:25,
    burnInto: ["cooked_meat","calcium","calcium","cooked_meat","calcium","calcium","quicklime"],
}

elements.gills = {
	color: "#5EBAE3",
	category: "oxygen",
	hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"rotten_meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
            else if (elements[hitPixel.element].id === elements.deoxygenated_water.id && Math.random() > 0.75) {
                if (!tryMove(hitPixel,pixel.x,pixel.y+1)) {
                    if (elements[pixelMap[pixel.x][pixel.y+1].element].state === "liquid") {
                        swapPixels(hitPixel,pixelMap[pixel.x][pixel.y+1])
                    }
                }
            }
            else if (elements[hitPixel.element].id === elements.water.id && Math.random() > 0.75) {
                pixel.oxygen += 100
                if (Math.random() > 0.75) {
                    changePixel(hitPixel,"deoxygenated_water")
                }
                if (!tryMove(hitPixel,pixel.x,pixel.y+1)) {
                    if (elements[pixelMap[pixel.x][pixel.y+1].element].state === "liquid") {
                        swapPixels(hitPixel,pixelMap[pixel.x][pixel.y+1])
                    }
                }
            }
            else if (elements[hitPixel.element].id === elements.salt_water.id && Math.random() > 0.75) {
                pixel.oxygen += 90
                    if (Math.random() > 0.85) {
                    changePixel(hitPixel,"deoxygenated_water")
                }
                if (!tryMove(hitPixel,pixel.x,pixel.y+1)) {
                    if (elements[pixelMap[pixel.x][pixel.y+1].element].state === "liquid") {
                        swapPixels(hitPixel,pixelMap[pixel.x][pixel.y+1])
                    }
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
            else if (elements[hitPixel.element].id === elements.deoxygenated_water.id && Math.random() > 0.75) {
                if (isEmpty(pixel.x+1, pixel.y)) {
                    tryMove(hitPixel,pixel.x+1,pixel.y);
                }
            }
            else if (elements[hitPixel.element].id === elements.water.id && Math.random() > 0.75) {
                if (isEmpty(pixel.x+1, pixel.y)) {
                    pixel.oxygen += 100
                    if (Math.random() > 0.75) {
                        changePixel(hitPixel,"deoxygenated_water")
                    }
                    tryMove(hitPixel,pixel.x+1,pixel.y);
                }
            }
            else if (elements[hitPixel.element].id === elements.salt_water.id && Math.random() > 0.75) {
                if (isEmpty(pixel.x+1, pixel.y)) {
                    pixel.oxygen += 90
                    if (Math.random() > 0.85) {
                        changePixel(hitPixel,"deoxygenated_water")
                    }
                    tryMove(hitPixel,pixel.x+1,pixel.y);
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .05,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","steam","oxygen","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    movable: false,
    isBio: true
}

elements.stomach_lining = {
	color: "#be5c4b",
	category: "nutrition",
    behavior: [
        "XX|CR:stomach_acid%5|XX",
        "CR:stomach_acid%5|XX|CR:stomach_acid%5",
        "XX|CR:stomach_acid%5|XX",
    ],
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"rotten_meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .05,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","steam","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    movable: false,
    isBio: true
}

elements.decomposer_stomach = {
	color: "#A4593F",
	category: "nutrition",
    behavior: [
        "XX|CR:decomposer_acid%5|XX",
        "CR:decomposer_acid%5|XX|CR:decomposer_acid%5",
        "XX|CR:decomposer_acid%5|XX",
    ],
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"rotten_meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .05,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","steam","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    movable: false,
    isBio: true
}

elements.herbi_stomach = {
	color: "#B77A3D",
	category: "nutrition",
    behavior: [
        "XX|CR:herbi_acid%5|XX",
        "CR:herbi_acid%5|XX|CR:herbi_acid%5",
        "XX|CR:herbi_acid%5|XX",
    ],
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"rotten_meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .05,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","steam","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    movable: false,
    isBio: true
}

elements.carni_stomach = {
	color: "#8E2A3E",
	category: "nutrition",
    behavior: [
        "XX|CR:carni_acid%5|XX",
        "CR:carni_acid%5|XX|CR:carni_acid%5",
        "XX|CR:carni_acid%5|XX",
    ],
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"rotten_meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .05,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","steam","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    movable: false,
    isBio: true
}

elements.explosive_stomach = {
	color: "#AA9167",
	category: "nutrition",
    behavior: [
        "XX|CR:explosive_acid%5|XX",
        "CR:explosive_acid%5|XX|CR:explosive_acid%5",
        "XX|CR:explosive_acid%5|XX",
    ],
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"rotten_meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .05,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","steam","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    movable: false,
    isBio: true
}

elements.stomach_valve = {
	color: "#c8846f",
	category: "nutrition",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|CR:intestine_bacteria%0.01|XX",
    ],
	hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"rotten_meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
            else if (elements[hitPixel.element].id === elements.digested_material.id && Math.random() > 0.75) {
                if (isEmpty(pixel.x, pixel.y+1)) {
                    tryMove(hitPixel,pixel.x,pixel.y+1);
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .05,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","steam","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    movable: false,
    isBio: true
}

elements.sphincter = {
	color: "#c8846f",
	category: "nutrition",
	hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"rotten_meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
            else if (elements[hitPixel.element].id === elements.poop.id && Math.random() > 0.75) {
                if (isEmpty(pixel.x, pixel.y+1)) {
                    tryMove(hitPixel,pixel.x,pixel.y+1);
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .05,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","steam","poop","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    movable: false,
    isBio: true
}

elements.real_udder = {
    color: "#ecb3f5",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.975 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen--
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            changePixel(pixel,"meat");
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 20
                    pixel.oxygen -= 20
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 20
                    pixel.nutrition -= 20
                }
            }
        }
        else if (isEmpty(pixel.x, pixel.y-1) && Math.random() > 0.95 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000))) {
            if (Math.random() > 0.95) {
                if (Math.random() > 0.95) {
                    pixel.nutrition -= 25
                }
                createPixel("milk",pixel.x,pixel.y-1)
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 20
                    pixel.oxygen -= 20
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 20
                    pixel.nutrition -= 20
                }
            }
        }
        else if (isEmpty(pixel.x, pixel.y+1) && Math.random() > 0.95 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000))) {
            if (Math.random() > 0.95) {
                if (Math.random() > 0.95) {
                    pixel.nutrition -= 25
                }
                createPixel("milk",pixel.x,pixel.y+1)
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 20
                    pixel.oxygen -= 20
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 20
                    pixel.nutrition -= 20
                }
            }
        }
        else if (isEmpty(pixel.x-1, pixel.y) && Math.random() > 0.95 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000))) {
            if (Math.random() > 0.95) {
                if (Math.random() > 0.95) {
                    pixel.nutrition -= 20
                }
                createPixel("milk",pixel.x-1,pixel.y)
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 20
                    pixel.oxygen -= 20
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 20
                    pixel.nutrition -= 20
                }
            }
        }
        else if (isEmpty(pixel.x+1, pixel.y) && Math.random() > 0.95 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000))) {
            if (Math.random() > 0.95) {
                if (Math.random() > 0.95) {
                    pixel.nutrition -= 20
                }
                createPixel("milk",pixel.x+1,pixel.y)
            }
        }
    },
    properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    tempHigh: 175,
    stateHigh: "meat",
    tempLow: -50,
    stateLow: "frozen_meat",
    burn: 20,
    burnTime: 60,
    burnInto: "meat",
    breakInto: ["meat","meat","meat","milk"],
    category: "structural",
    state: "solid",
    density: 1250,
    conduct: 0.1,
    movable: false,
    isBio: true,
}

elements.biotorch = {
    color: ["#856559","#7F6057","#815C50"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.975 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen--
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            changePixel(pixel,"cooked_meat");
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 20
                    pixel.oxygen -= 20
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 20
                    pixel.nutrition -= 20
                }
            }
        }
        else if (isEmpty(pixel.x, pixel.y-1) && Math.random() > 0.95 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000))) {
            if (Math.random() > 0.95) {
                pixel.oxygen -= 5
            }
            createPixel("fire",pixel.x,pixel.y-1)
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 20
                    pixel.oxygen -= 20
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 20
                    pixel.nutrition -= 20
                }
            }
        }
        else if (isEmpty(pixel.x, pixel.y+1) && Math.random() > 0.95 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000))) {
            if (Math.random() > 0.95) {
                if (Math.random() > 0.95) {
                    pixel.oxygen -= 5
                }
                createPixel("fire",pixel.x,pixel.y+1)
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 20
                    pixel.oxygen -= 20
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 20
                    pixel.nutrition -= 20
                }
            }
        }
        else if (isEmpty(pixel.x-1, pixel.y) && Math.random() > 0.95 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000))) {
            if (Math.random() > 0.95) {
                if (Math.random() > 0.95) {
                    pixel.oxygen -= 5
                }
                createPixel("fire",pixel.x-1, pixel.y)
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 20
                    pixel.oxygen -= 20
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 20
                    pixel.nutrition -= 20
                }
            }
        }
        else if (isEmpty(pixel.x+1, pixel.y) && Math.random() > 0.95 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000))) {
            if (Math.random() > 0.95) {
                if (Math.random() > 0.95) {
                    pixel.oxygen -= 5
                }
                createPixel("fire",pixel.x+1, pixel.y)
            }
        }
    },
    properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    tempHigh: 650,
    stateHigh: "cooked_meat",
    tempLow: -20,
    stateLow: "frozen_meat",
    breakInto: ["meat","cooked_meat","cooked_meat","fire"],
    category: "structural",
    state: "solid",
    density: 1250,
    conduct: 0.1,
    insulate: true,
    movable: false,
    isBio: true,
}

elements.digested_material = {
    color: "#B5C306",
    behavior: [
        "XX|XX|XX",
        "SW:stomach_acid,decomposer_acid,herbi_acid,carni_acid,explosive_acid%3 AND M2%35|XX|SW:stomach_acid,decomposer_acid,herbi_acid,carni_acid,explosive_acid%3 AND M2%35",
        "SW:stomach_acid,decomposer_acid,herbi_acid,carni_acid,explosive_acid%5 AND M2%50|SW:stomach_acid,decomposer_acid,herbi_acid,carni_acid,explosive_acid%10 AND M1|SW:stomach_acid,decomposer_acid,herbi_acid,carni_acid,explosive_acid%5 AND M2%50",
    ],
	properties: {
        nutrition: 100,
    },
    category: "nutrition",
    state: "solid",
    density: 200,
    conduct: 0.25,
    stain: 0.001,
    darkText: true,
    hidden: true,
    tempHigh: 90,
    stateHigh: "dirty_water",
    tempLow: -30,
    stateLow: "dirty_ice",
}

elements.poop = {
    color: "#593001",
    behavior: [
        "CR:stench,stench,stench,stench,bacteria,stench,stench,fly,stench,stench,fly,stench,stench%0.0002|CR:stench,stench,stench,stench,bacteria,stench,stench,fly,stench,stench,fly,stench,stench%0.001|CR:stench,stench,stench,stench,bacteria,stench,stench,fly,stench,stench,fly,stench,stench%0.0002",
        "M2%30|XX|M2%30",
        "M2%50|M1|M2%50",
    ],
    reactions: {
        "soap": { elem1:null, chance:0.2 },
        "bleach": { elem1:null, chance:0.5 },
        "pool_water": { elem1:null, elem2:"water", chance:0.05 },
        "water": { elem1:null, elem2:"dirty_water", chance:0.02 },
        "deoxygenated_water": { elem1:null, elem2:"dirty_water", chance:0.0175 },
        "salt_water": { elem1:null, elem2:"dirty_water", chance:0.02 },
        "sugar_water": { elem1:null, elem2:"dirty_water", chance:0.02 },
        "plant": { elem2:"dead_plant", chance:0.02},
    },
    category: "nutrition",
    state: "liquid",
    viscosity: 1000,
    density: 200,
    conduct: 0.25,
    darkText: true,
    hidden: true,
    tempHigh: 160,
    stateHigh: ["ash","stench","steam","steam","carbon_dioxide"],
    burn: 5,
    burnTime: 30,
    burnInto: ["ash","stench","steam","steam","carbon_dioxide","fire","fire"],
    tempLow: -30,
    stain: 0.005,
    stateLowName: "frozen_poop",
}

elements.intestine_bacteria = {
    color: "#955E93",
    behavior: [
        "XX|M2%0.3|M2%3",
        "XX|FX%2 AND DL%0.0005|M2%3 AND BO",
        "XX|M1|M2%3",
    ],
    reactions: {
        "water": { elem1:null, elem2:"dirty_water", chance:0.01 },
        "poop": { elem2:null, chance:0.01, func:behaviors.FEEDPIXEL  },
        "bacteria": { elem2:[null,"intestine_bacteria","intestine_bacteria","intestine_bacteria","intestine_bacteria","intestine_bacteria","intestine_bacteria","intestine_bacteria"], chance:0.5, func:behaviors.FEEDPIXEL   },
        "intestine_bacteria": { elem2:["intestine_bacteria",null,null,null,null,null,null,null], chance:0.001, func:behaviors.FEEDPIXEL   },
        "mercury": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], chance:0.1 },
        "bleach": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], chance:0.1 },
        "uranium": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], chance:0.1 },
        "cyanide": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], chance:0.1 },
        "chlorine": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], chance:0.1 },
        "alcohol": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], chance:0.25 },
        "vinegar": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], chance:0.01 },
        "mouthwash": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], chance:0.001 },
    },
    foodNeed: 15,
    egg: "intestine_bacteria",
    tempHigh: 80,
    stateHigh: "dna",
    tempLow: -10,
    stateLow: "dna",
    breakInto: "dna",
    category:"nutrition",
    burn:95,
    burnTime:25,
    burnInto: "dna",
    state: "solid",
    density: 600,
    stain: -0.005,
    conduct: 0.1
}

elements.stomach_acid = {
    color: ["#b5cf91","#288f2a"],
    behavior: [
        "XX|DB%1|XX",
        "DB%1 AND M2|DL%0.005|DB%1 AND M2",
        "DB%1 AND M2|DB%2 AND M1|DB%1 AND M2",
    ],
    ignore: ["amphib_skin","amphib_dermis",-"acidic_flesh","acid_vessel","throat_lining","explosive_stomach","stomach_lining","stomach_valve","slime","digested_material","glass","rad_glass","glass_shard","rad_shard","stained_glass","baked_clay","acid_gas","neutral_acid","acid_cloud","water","salt_water","sugar_water","dirty_water","copper","gold","porcelain","plastic","bead","microplastic","molten_plastic","pool_water","chlorine","hydrogen","gold_coin","silver","nickel","calcium","bone","earthquake","tornado","tsunami","liquid_light","sensor"],
    reactions: {
        "water": { elem1:null, elem2:"dirty_water", chance:0.02 },
        "salt_water": { elem1:null, elem2:"water", chance:0.02 },
        "sugar_water": { elem1:null, elem2:"water", chance:0.02 },
        "plant": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02},
        "tree_branch": { elem1:null, elem2:"wood", chance:0.02 },
        "sugar": { elem2:"digested_material", attr2:{"nutrition":30}, chance:0.02 },
        "dead_plant": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "meat": { elem2:"digested_material", attr2:{"nutrition":30}, chance:0.02 },
        "cooked_meat": { elem2:"digested_material", attr2:{"nutrition":60}, chance:0.02 },
        "rotten_meat": { elem2:["digested_material","ammonia",null,null,null], attr2:{"nutrition":-10}, chance:0.02 },
        "cured_meat": { elem2:"digested_material", attr2:{"nutrition":50}, chance:0.02 },
        "cheese": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "lettuce": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "herb": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "toast": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "bread": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "hard_yolk": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "yolk": { elem2:"digested_material", attr2:{"nutrition":-10}, chance:0.02 },
        "milk": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "crumb": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "pickle": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "salt": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "worm": { elem2:"digested_material", attr2:{"nutrition":-15}, chance:0.02 },
        "ant": { elem2:"digested_material", attr2:{"nutrition":-10}, chance:0.02 },
        "bee": { elem2:"digested_material", attr2:{"nutrition":-10}, chance:0.02 },
        "spider": { elem2:"digested_material", attr2:{"nutrition":-10}, chance:0.02 },
        "egg": { elem2:"digested_material", attr2:{"nutrition":-15}, chance:0.02 },
        "soda": { elem2:"digested_material", attr2:{"nutrition":20}, chance:0.02 },
        "sap": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "juice": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "mayo": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "nut_butter": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "ketchup": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "jelly": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "bleach": { elem2:"digested_material", attr2:{"nutrition":-500}, chance:0.02 },
        "poison": { elem2:"digested_material", attr2:{"nutrition":-750}, chance:0.02 },
        "soap": { elem2:"digested_material", attr2:{"nutrition":-20}, chance:0.02 },
        "mercury": { elem2:"digested_material", attr2:{"nutrition":-500}, chance:0.02 },
        "coffee": { elem2:"digested_material", attr2:{"nutrition":20}, chance:0.02 },
        "tomato": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "grape": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "beans": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "sauce": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "butter": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "melted_cheese": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "melted_chocolate": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "melted_butter": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "chocolate": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "rice": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "dough": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "batter": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "baked_batter": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "ice_cream": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "cream": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "caramel": { elem2:"digested_material", attr2:{"nutrition":30}, chance:0.02 },
        "potato": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "baked_potato": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "mashed_potato": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "yogurt": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "frozen_yogurt": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "slush": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "coffee_bean": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "yeast": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "alcohol": { elem2:"digested_material", attr2:{"nutrition":-35}, chance:0.02 },
        "honey": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "blood": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "infection": { elem2:"digested_material", attr2:{"nutrition":-15}, chance:0.02 },
        "cancer": { elem2:"digested_material", attr2:{"nutrition":-15}, chance:0.02 },
        "plague": { elem2:"digested_material", attr2:{"nutrition":-15}, chance:0.02 },
        "glue": { elem2:"digested_material", attr2:{"nutrition":-10}, chance:0.02 },
    },
    category: "nutrition",
    tempHigh: 110,
    stateHigh: "acid_gas",
    tempLow: -58.88,
    burn: 30,
    burnTime: 1,
    state: "liquid",
    density: 1049,
    stain: -0.1
}

elements.herbi_acid = {
    color: ["#A8E54F","#5BC217"],
    behavior: [
        "XX|DB%1|XX",
        "DB%1 AND M2|DL%0.005|DB%1 AND M2",
        "DB%1 AND M2|DB%2 AND M1|DB%1 AND M2",
    ],
    ignore: ["amphib_skin","amphib_dermis","acidic_flesh","acid_vessel","throat_lining","explosive_stomach","herbi_stomach","carni_stomach","stomach_lining","stomach_valve","slime","digested_material","glass","rad_glass","glass_shard","rad_shard","stained_glass","baked_clay","acid_gas","neutral_acid","acid_cloud","water","salt_water","sugar_water","dirty_water","copper","gold","porcelain","plastic","bead","microplastic","molten_plastic","pool_water","chlorine","hydrogen","gold_coin","silver","nickel","calcium","bone","earthquake","tornado","tsunami","liquid_light","sensor"],
    reactions: {
        "water": { elem1:null, elem2:"dirty_water", chance:0.02 },
        "salt_water": { elem1:null, elem2:"water", chance:0.02 },
        "sugar_water": { elem1:null, elem2:"water", chance:0.02 },
        "plant": { elem2:"digested_material", attr2:{"nutrition":80}, chance:0.02},
        "tree_branch": { elem1:null, elem2:"wood", attr2:{"nutrition":10}, chance:0.02 },
        "sugar": { elem2:"digested_material", attr2:{"nutrition":30}, chance:0.02 },
        "dead_plant": { elem2:"digested_material", attr2:{"nutrition":75}, chance:0.02 },
        "meat": { elem2:"digested_material", attr2:{"nutrition":-10}, chance:0.02 },
        "cooked_meat": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "rotten_meat": { elem2:["digested_material","ammonia",null,null,null], attr2:{"nutrition":-25}, chance:0.02 },
        "cured_meat": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "cheese": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "vine": { elem2:"digested_material", attr2:{"nutrition":60}, chance:0.02 },
        "grass": { elem2:"digested_material", attr2:{"nutrition":60}, chance:0.02 },
        "kelp": { elem2:"digested_material", attr2:{"nutrition":60}, chance:0.02 },
        "algae": { elem2:"digested_material", attr2:{"nutrition":50}, chance:0.02 },
        "lettuce": { elem2:"digested_material", attr2:{"nutrition":60}, chance:0.02 },
        "herb": { elem2:"digested_material", attr2:{"nutrition":50}, chance:0.02 },
        "toast": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "bread": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "hard_yolk": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "yolk": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "milk": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "crumb": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "pickle": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "salt": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "worm": { elem2:"digested_material", attr2:{"nutrition":-10}, chance:0.02 },
        "ant": { elem2:"digested_material", attr2:{"nutrition":-10}, chance:0.02 },
        "bee": { elem2:"digested_material", attr2:{"nutrition":-10}, chance:0.02 },
        "spider": { elem2:"digested_material", attr2:{"nutrition":-10}, chance:0.02 },
        "egg": { elem2:"digested_material", attr2:{"nutrition":-20}, chance:0.02 },
        "soda": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "sap": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "juice": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "mayo": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "nut_butter": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "ketchup": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "jelly": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "bleach": { elem2:"digested_material", attr2:{"nutrition":-500}, chance:0.02 },
        "poison": { elem2:"digested_material", attr2:{"nutrition":-750}, chance:0.02 },
        "soap": { elem2:"digested_material", attr2:{"nutrition":-20}, chance:0.02 },
        "mercury": { elem2:"digested_material", attr2:{"nutrition":-500}, chance:0.02 },
        "coffee": { elem2:"digested_material", attr2:{"nutrition":20}, chance:0.02 },
        "tomato": { elem2:"digested_material", attr2:{"nutrition":55}, chance:0.02 },
        "grape": { elem2:"digested_material", attr2:{"nutrition":50}, chance:0.02 },
        "beans": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "sauce": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "butter": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "melted_cheese": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "melted_chocolate": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "melted_butter": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "chocolate": { elem2:"digested_material", attr2:{"nutrition":30}, chance:0.02 },
        "rice": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "dough": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "batter": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "baked_batter": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "ice_cream": { elem2:"digested_material", attr2:{"nutrition":30}, chance:0.02 },
        "cream": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "caramel": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "potato": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "baked_potato": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "mashed_potato": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "yogurt": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "frozen_yogurt": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "slush": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "coffee_bean": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "yeast": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "alcohol": { elem2:"digested_material", attr2:{"nutrition":-35}, chance:0.02 },
        "honey": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "blood": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "infection": { elem2:"digested_material", attr2:{"nutrition":-15}, chance:0.02 },
        "cancer": { elem2:"digested_material", attr2:{"nutrition":-15}, chance:0.02 },
        "plague": { elem2:"digested_material", attr2:{"nutrition":-15}, chance:0.02 },
        "glue": { elem2:"digested_material", attr2:{"nutrition":-10}, chance:0.02 },
    },
    category: "nutrition",
    tempHigh: 110,
    stateHigh: "acid_gas",
    tempLow: -58.88,
    burn: 30,
    burnTime: 1,
    state: "liquid",
    density: 1049,
    stain: -0.1
}

elements.carni_acid = {
    color: ["#ADA469","#5B6517"],
    behavior: [
        "XX|DB%1|XX",
        "DB%1 AND M2|DL%0.005|DB%1 AND M2",
        "DB%1 AND M2|DB%2 AND M1|DB%1 AND M2",
    ],
    ignore: ["amphib_skin","amphib_dermis","acidic_flesh","acid_vessel","throat_lining","explosive_stomach","stomach_lining","carni_stomach","stomach_valve","slime","digested_material","glass","rad_glass","glass_shard","rad_shard","stained_glass","baked_clay","acid_gas","neutral_acid","acid_cloud","water","salt_water","sugar_water","dirty_water","copper","gold","porcelain","plastic","bead","microplastic","molten_plastic","pool_water","chlorine","hydrogen","gold_coin","silver","nickel","calcium","bone","earthquake","tornado","tsunami","liquid_light","sensor"],
    reactions: {
        "water": { elem1:null, elem2:"dirty_water", chance:0.02 },
        "salt_water": { elem1:null, elem2:"water", chance:0.02 },
        "sugar_water": { elem1:null, elem2:"water", chance:0.02 },
        "plant": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02},
        "tree_branch": { elem1:null, elem2:"wood", chance:0.02 },
        "sugar": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "dead_plant": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "meat": { elem2:"digested_material", attr2:{"nutrition":70}, chance:0.02 },
        "cooked_meat": { elem2:"digested_material", attr2:{"nutrition":60}, chance:0.02 },
        "rotten_meat": { elem2:["digested_material","ammonia",null,null,null], attr2:{"nutrition":5}, chance:0.02 },
        "cured_meat": { elem2:"digested_material", attr2:{"nutrition":50}, chance:0.02 },
        "cheese": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "lettuce": { elem2:"digested_material", attr2:{"nutrition":20}, chance:0.02 },
        "herb": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "toast": { elem2:"digested_material", attr2:{"nutrition":20}, chance:0.02 },
        "bread": { elem2:"digested_material", attr2:{"nutrition":20}, chance:0.02 },
        "hard_yolk": { elem2:"digested_material", attr2:{"nutrition":50}, chance:0.02 },
        "yolk": { elem2:"digested_material", attr2:{"nutrition":50}, chance:0.02 },
        "milk": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "crumb": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "pickle": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "salt": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "worm": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "ant": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "bee": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "spider": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "rat": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "bird": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "fish": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "head": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "body": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "egg": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "soda": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "sap": { elem2:"digested_material", attr2:{"nutrition":-10}, chance:0.02 },
        "juice": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "mayo": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "nut_butter": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "ketchup": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "jelly": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "bleach": { elem2:"digested_material", attr2:{"nutrition":-500}, chance:0.02 },
        "poison": { elem2:"digested_material", attr2:{"nutrition":-750}, chance:0.02 },
        "soap": { elem2:"digested_material", attr2:{"nutrition":-20}, chance:0.02 },
        "mercury": { elem2:"digested_material", attr2:{"nutrition":-500}, chance:0.02 },
        "coffee": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "tomato": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "grape": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "beans": { elem2:"digested_material", attr2:{"nutrition":20}, chance:0.02 },
        "sauce": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "butter": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "melted_cheese": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "melted_chocolate": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "melted_butter": { elem2:"digested_material", attr2:{"nutrition":-10}, chance:0.02 },
        "chocolate": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "rice": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "dough": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "batter": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "baked_batter": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "ice_cream": { elem2:"digested_material", attr2:{"nutrition":30}, chance:0.02 },
        "cream": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "caramel": { elem2:"digested_material", attr2:{"nutrition":20}, chance:0.02 },
        "potato": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "baked_potato": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "mashed_potato": { elem2:"digested_material", attr2:{"nutrition":20}, chance:0.02 },
        "yogurt": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "frozen_yogurt": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "slush": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "coffee_bean": { elem2:"digested_material", attr2:{"nutrition":-10}, chance:0.02 },
        "yeast": { elem2:"digested_material", attr2:{"nutrition":-10}, chance:0.02 },
        "alcohol": { elem2:"digested_material", attr2:{"nutrition":"-45"}, chance:0.02 },
        "honey": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "blood": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "infection": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "cancer": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "plague": { elem2:"digested_material", attr2:{"nutrition":-15}, chance:0.02 },
        "glue": { elem2:"digested_material", attr2:{"nutrition":-10}, chance:0.02 },
    },
    category: "nutrition",
    tempHigh: 110,
    stateHigh: "acid_gas",
    tempLow: -58.88,
    burn: 30,
    burnTime: 1,
    state: "liquid",
    density: 1049,
    stain: -0.1
}

elements.explosive_acid = {
    color: ["#E9DC8C","#D0C15A"],
    behavior: [
        "XX|DB%1|XX",
        "DB%1 AND M2|DL%0.001|DB%1 AND M2",
        "DB%1 AND M2|DB%2 AND M1|DB%1 AND M2",
    ],
    ignore: ["amphib_skin","amphib_dermis","acidic_flesh","acid_vessel","throat_lining","stomach_lining","explosive_stomach","stomach_valve","slime","digested_material","glass","rad_glass","glass_shard","rad_shard","stained_glass","baked_clay","acid_gas","neutral_acid","acid_cloud","water","salt_water","sugar_water","dirty_water","copper","gold","porcelain","plastic","bead","microplastic","molten_plastic","pool_water","chlorine","hydrogen","gold_coin","silver","nickel","calcium","bone","earthquake","tornado","tsunami","liquid_light","sensor"],
    reactions: {
        "water": { elem1:null, elem2:"dirty_water", chance:0.02 },
        "salt_water": { elem1:null, elem2:"water", chance:0.02 },
        "sugar_water": { elem1:null, elem2:"water", chance:0.02 },
        "plant": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02},
        "tree_branch": { elem1:null, elem2:"wood", chance:0.02 },
        "sugar": { elem2:"digested_material", attr2:{"nutrition":30}, chance:0.02 },
        "dead_plant": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "meat": { elem2:"digested_material", attr2:{"nutrition":30}, chance:0.02 },
        "cooked_meat": { elem2:"digested_material", attr2:{"nutrition":60}, chance:0.02 },
        "rotten_meat": { elem2:["digested_material","ammonia",null,null,null], attr2:{"nutrition":30}, chance:0.02 },
        "cured_meat": { elem2:"digested_material", attr2:{"nutrition":50}, chance:0.02 },
        "cheese": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "lettuce": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "herb": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "toast": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "bread": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "hard_yolk": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "yolk": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "milk": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "crumb": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "pickle": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "salt": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "worm": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "ant": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "bee": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "spider": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "egg": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "soda": { elem2:"digested_material", attr2:{"nutrition":20}, chance:0.02 },
        "sap": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "juice": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "mayo": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "nut_butter": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "ketchup": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "jelly": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "bleach": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "poison": { elem2:"digested_material", attr2:{"nutrition":20}, chance:0.02 },
        "soap": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "mercury": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "coffee": { elem2:"digested_material", attr2:{"nutrition":20}, chance:0.02 },
        "tomato": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "grape": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "beans": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "sauce": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "butter": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "melted_cheese": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "melted_chocolate": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "melted_butter": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "chocolate": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "rice": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "dough": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "batter": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "baked_batter": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "ice_cream": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "cream": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "caramel": { elem2:"digested_material", attr2:{"nutrition":30}, chance:0.02 },
        "potato": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "baked_potato": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "mashed_potato": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "yogurt": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "frozen_yogurt": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "slush": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "coffee_bean": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "yeast": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "alcohol": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "honey": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "blood": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "infection": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "cancer": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "plague": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "glue": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
    },
    category: "nutrition",
    tempHigh: 600,
    stateHigh: "pop",
    burn: 100,
    burnTime: 1,
    burnInto: "explosion",
    breakInto: ["explosion","pop"],
    viscosity: 36,
    tempLow: -58.88,
    burn: 30,
    burnTime: 1,
    state: "liquid",
    density: 1049,
}

elements.decomposer_acid = {
    color: ["#847C35","#6F7326"],
    behavior: [
        "XX|DB%1|XX",
        "DB%1 AND M2|DL%0.005|DB%1 AND M2",
        "DB%1 AND M2|DB%2 AND M1|DB%1 AND M2",
    ],
    ignore: ["amphib_skin","amphib_dermis","acidic_flesh","acid_vessel","decomposer_stomach","throat_lining","explosive_stomach","herbi_stomach","carni_stomach","stomach_lining","stomach_valve","slime","digested_material","glass","rad_glass","glass_shard","rad_shard","stained_glass","baked_clay","acid_gas","neutral_acid","acid_cloud","water","salt_water","sugar_water","dirty_water","copper","gold","porcelain","plastic","bead","microplastic","molten_plastic","pool_water","chlorine","hydrogen","gold_coin","silver","nickel","calcium","bone","earthquake","tornado","tsunami","liquid_light","sensor"],
    reactions: {
        "water": { elem1:null, elem2:"dirty_water", chance:0.02 },
        "salt_water": { elem1:null, elem2:"water", chance:0.02 },
        "sugar_water": { elem1:null, elem2:"water", chance:0.02 },
        "plant": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02},
        "tree_branch": { elem1:null, elem2:"wood", attr2:{"nutrition":30}, chance:0.02 },
        "sugar": { elem2:"digested_material", attr2:{"nutrition":30}, chance:0.02 },
        "dead_plant": { elem2:"digested_material", attr2:{"nutrition":90}, chance:0.02 },
        "meat": { elem2:"digested_material", attr2:{"nutrition":20}, chance:0.02 },
        "cooked_meat": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "rotten_meat": { elem2:["digested_material","ammonia",null,null,null], attr2:{"nutrition":55}, chance:0.02 },
        "cured_meat": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "cheese": { elem2:"digested_material", attr2:{"nutrition":50}, chance:0.02 },
        "vine": { elem2:"digested_material", attr2:{"nutrition":30}, chance:0.02 },
        "grass": { elem2:"digested_material", attr2:{"nutrition":30}, chance:0.02 },
        "kelp": { elem2:"digested_material", attr2:{"nutrition":30}, chance:0.02 },
        "algae": { elem2:"digested_material", attr2:{"nutrition":60}, chance:0.02 },
        "lettuce": { elem2:"digested_material", attr2:{"nutrition":50}, chance:0.02 },
        "herb": { elem2:"digested_material", attr2:{"nutrition":50}, chance:0.02 },
        "toast": { elem2:"digested_material", attr2:{"nutrition":20}, chance:0.02 },
        "bread": { elem2:"digested_material", attr2:{"nutrition":30}, chance:0.02 },
        "hard_yolk": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "yolk": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "milk": { elem2:"digested_material", attr2:{"nutrition":55}, chance:0.02 },
        "crumb": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "pickle": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "salt": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "worm": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "ant": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "bee": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "spider": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "egg": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "soda": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "sap": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "juice": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "mayo": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "nut_butter": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "ketchup": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "jelly": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "bleach": { elem2:"digested_material", attr2:{"nutrition":-500}, chance:0.02 },
        "poison": { elem2:"digested_material", attr2:{"nutrition":-750}, chance:0.02 },
        "soap": { elem2:"digested_material", attr2:{"nutrition":-20}, chance:0.02 },
        "mercury": { elem2:"digested_material", attr2:{"nutrition":-500}, chance:0.02 },
        "coffee": { elem2:"digested_material", attr2:{"nutrition":20}, chance:0.02 },
        "tomato": { elem2:"digested_material", attr2:{"nutrition":55}, chance:0.02 },
        "grape": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "beans": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "sauce": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "butter": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "melted_cheese": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "melted_chocolate": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "melted_butter": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "chocolate": { elem2:"digested_material", attr2:{"nutrition":30}, chance:0.02 },
        "rice": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "dough": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "batter": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "baked_batter": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "ice_cream": { elem2:"digested_material", attr2:{"nutrition":30}, chance:0.02 },
        "cream": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "caramel": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "potato": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "baked_potato": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "mashed_potato": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "yogurt": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "frozen_yogurt": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "slush": { elem2:"digested_material", attr2:{"nutrition":0}, chance:0.02 },
        "coffee_bean": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "yeast": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "alcohol": { elem2:"digested_material", attr2:{"nutrition":-35}, chance:0.02 },
        "honey": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "blood": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "infection": { elem2:"digested_material", attr2:{"nutrition":-15}, chance:0.02 },
        "cancer": { elem2:"digested_material", attr2:{"nutrition":-15}, chance:0.02 },
        "plague": { elem2:"digested_material", attr2:{"nutrition":-15}, chance:0.02 },
        "glue": { elem2:"digested_material", attr2:{"nutrition":-10}, chance:0.02 },
        "poop": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "dead_bug": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
    },
    category: "nutrition",
    tempHigh: 110,
    stateHigh: "acid_gas",
    tempLow: -58.88,
    burn: 30,
    burnTime: 1,
    state: "liquid",
    density: 1049,
    stain: -0.1
}

elements.deoxygenated_water = {
    color: "#829BD4",
    behavior: behaviors.LIQUID,
    tempHigh: 100,
    stateHigh: "steam",
    tempLow: 0,
    stateLow: "ice",
    category: "liquids",
    heatCapacity: 4.184,
    reactions: {
        "oxygen": { elem1: "water", elem2: null },
        "dust": { elem1: "dirty_water", elem2: null },
        "ash": { elem1: "dirty_water", elem2: null },
        "cyanide": { elem1: "dirty_water", elem2: null },
        "cyanide_gas": { elem1: "dirty_water", elem2: null },
        "carbon_dioxide": { elem1: "seltzer", elem2: null, oneway:true },
        "sulfur": { elem1: "dirty_water", elem2: null },
        "rat": { elem1: "dirty_water", chance:0.005 },
        "plague": { elem1: "dirty_water", elem2: null },
        "rust": { elem1: "dirty_water", chance:0.005 },
        "lead": { elem1: "dirty_water", chance:0.005 },
        "solder": { elem1: "dirty_water", chance:0.005 },
        "fallout": { elem1: "dirty_water", chance:0.25 },
        "radiation": { elem1: "dirty_water", chance:0.25 },
        "uranium": { elem1: "dirty_water", chance:0.25 },
        "rad_steam": { elem1: "dirty_water", chance:0.02 },
        "rad_glass": { elem1: "dirty_water", chance:0.005 },
        "rad_shard": { elem1: "dirty_water", chance:0.01 },
        "rotten_meat": { elem1: "dirty_water", chance:0.25 },
        "rotten_cheese": { elem1: "dirty_water", chance:0.25 },
        "cancer": { elem1: "dirty_water", chance:0.25 },
        "oil": { elem1: "dirty_water", chance:0.005 },
        "dioxin": { elem1: "dirty_water", chance:0.1 },
        "rock": { elem2: "wet_sand", chance: 0.00035 },
        "limestone": { elem2: "wet_sand", chance: 0.00035 },
        "tuff": { elem2: "wet_sand", color2:"#7a6b5c", chance: 0.00035 },
        "ruins": { elem2: "rock", chance: 0.00035 },
        "mudstone": { elem2: "mud", chance: 0.00035 },
        "fly": { elem2:"dead_bug", chance:0.1, oneway:true },
        "firefly": { elem2:"dead_bug", chance:0.1, oneway:true },
        "bee": { elem2:"dead_bug", chance:0.05, oneway:true },
        "stink_bug": { elem2:"dead_bug", chance:0.1, oneway:true },
        "cured_meat": { elem1:"salt_water", elem2:"meat" },
        "water": { elem1:"water", chance:0.005 },
        "salt_water": { elem1:"water", chance:0.005 },
        "deoxygenated_water": { elem2:"bubble", attr2:{"clone":"water"}, chance:0.001, tempMin:85 },
    },
    state: "liquid",
    density: 1100,
    conduct: 0.02,
    stain: -0.5,
    extinguish: true
}

elements.real_bone = {
    color: "#d9d9d9",
    behavior: behaviors.WALL,
    reactions: {
        "water": { elem2:"broth", tempMin:70 },
        "salt_water": { elem2:"broth", tempMin:70 },
        "sugar_water": { elem2:"broth", tempMin:70 },
        "seltzer": { elem2:"broth", tempMin:70 },
    },
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.99 && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen--
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            changePixel(pixel,"bone");
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    category:"structural",
    tempHigh: 260,
    stateHigh: "bone",
    tempLow: -36,
    stateLow: "bone",
    state: "solid",
    density: 1900,
    hardness: 0.5,
    properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    breakInto: ["quicklime","quicklime","quicklime","blood","bone","bone","bone","bone","bone","bone"],
    movable: false,
    isBio: true,
    burn:1,
    burnTime:25,
    burnInto: ["bone","bone","bone","bone","quicklime"],
}

elements.cerebrospinal_fluid = {
    color: "#CBC3E3",
    behavior: behaviors.LIQUID,
    tick: function(pixel) {
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
    },
    tempHigh: 102,
    stateHigh: ["steam","salt"],
    tempLow: -5,
    category: "nervous system",
    reactions: {
        "dust": { elem1: "dirty_water", elem2: null },
        "ash": { elem1: "dirty_water", elem2: null },
        "carbon_dioxide": { elem1: "dirty_water", elem2: null },
        "sulfur": { elem1: "dirty_water", elem2: null },
        "rat": { elem1: "dirty_water", chance:0.005 },
        "plague": { elem1: "dirty_water", elem2: null },
        "fallout": { elem1: "dirty_water", chance:0.25 },
        "radiation": { elem1: "dirty_water", chance:0.25 },
        "rust": { elem1: "dirty_water", chance:0.005 },
        "lead": { elem1: "dirty_water", chance:0.005 },
        "solder": { elem1: "dirty_water", chance:0.005 },
        "rock": { elem2: "wet_sand", chance: 0.0005 },
        "limestone": { elem2: "wet_sand", chance: 0.0005 },
        "fly": { elem2:"dead_bug", chance:0.1, oneway:true },
        "firefly": { elem2:"dead_bug", chance:0.1, oneway:true },
        "bee": { elem2:"dead_bug", chance:0.05, oneway:true },
        "stink_bug": { elem2:"dead_bug", chance:0.1, oneway:true },
        "cancer": { elem1: "dirty_water", chance:0.25 },
        "oil": { elem1: "dirty_water", chance:0.005 },
        "uranium": { elem1: "dirty_water", chance:0.25 },
        "wet_sand": { oneway:true, chance:0.007, func:function(pixel){
            if (isEmpty(pixel.x,pixel.y-1) || isEmpty(pixel.x,pixel.y-2) || isEmpty(pixel.x,pixel.y-3)) {
                changePixel(pixel,"foam");
                pixel.clone = "salt_water";
            }
        }},
        "salt_water": { elem2:"bubble", attr2:{"clone":"salt_water"}, chance:0.001, tempMin:85 },
        // electrolysis:
        "aluminum": { elem1:["hydrogen","hydrogen","oxygen","chlorine"], charged:true, chance:0.0025 },
        "zinc": { elem1:["hydrogen","hydrogen","oxygen","chlorine"], charged:true, chance:0.015 },
        "steel": { elem1:["hydrogen","hydrogen","oxygen","chlorine"], charged:true, chance:0.0125 },
        "iron": { elem1:["hydrogen","hydrogen","oxygen","chlorine"], charged:true, chance:0.0125 },
        "tin": { elem1:["hydrogen","hydrogen","oxygen","chlorine"], charged:true, chance:0.01 },
        "brass": { elem1:["hydrogen","hydrogen","oxygen","chlorine"], charged:true, chance:0.001 },
        "bronze": { elem1:["hydrogen","hydrogen","oxygen","chlorine"], charged:true, chance:0.001 },
        "copper": { elem1:["hydrogen","hydrogen","oxygen","chlorine"], charged:true, chance:0.0075 },
        "silver": { elem1:["hydrogen","hydrogen","oxygen","chlorine"], charged:true, chance:0.0075 },
        "gold": { elem1:["hydrogen","hydrogen","oxygen","chlorine"], charged:true, chance:0.0075 },
    },
    state: "liquid",
    density: 1026,
    stain: -0.01,
    properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    extinguish: true,
    isBio: true
}

elements.elixir = {
    color: "#8CB6AA",
    behavior: behaviors.LIQUID,
    reactions: {
        "dirt": { elem2: "mud", elem1: null },
        "dust": { elem1: "dirty_water", elem2: null },
        "ash": { elem1: "dirty_water", elem2: null },
        "carbon_dioxide": { elem1: "dirty_water", elem2: null },
        "sulfur": { elem1: "dirty_water", elem2: null },
        "rat": { elem1: "dirty_water", chance:0.005 },
        "plague": { elem1: "dirty_water", elem2: null },
        "fallout": { elem1: "dirty_water", chance:0.25 },
        "radiation": { elem1: "dirty_water", chance:0.25 },
        "rust": { elem1: "dirty_water", chance:0.005 },
        "lead": { elem1: "dirty_water", chance:0.005 },
        "solder": { elem1: "dirty_water", chance:0.005 },
        "rock": { elem2: "wet_sand", chance: 0.0005 },
        "limestone": { elem2: "wet_sand", chance: 0.0005 },
        "fly": { elem2:"dead_bug", chance:0.1, oneway:true },
        "firefly": { elem2:"dead_bug", chance:0.1, oneway:true },
        "bee": { elem2:"dead_bug", chance:0.05, oneway:true },
        "stink_bug": { elem2:"dead_bug", chance:0.1, oneway:true },
        "cancer": { elem1: "dirty_water", chance:0.25 },
        "oil": { elem1: "dirty_water", chance:0.005 },
        "uranium": { elem1: "dirty_water", chance:0.25 },
        "cerebrospinal_fluid": { elem1:"brain_jar_juice", elem2:"brain_jar_juice", chance:0.01 },
    },
    viscosity: 4000,
    tempHigh: 120,
    stateHigh: ["steam","steam","dna","dna","stench","salt",],
    tempLow: 0,
    category:"liquids",
    state: "liquid",
    density: 1450,
    stain: 0.05,
    hidden: true,
}

elements.brain_jar_juice = {
    color: "#4F8C24",
    behavior: behaviors.LIQUID,
    hidden: true,
    tick: function(pixel) {
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 1
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 1
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 1
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 1
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 1
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 1
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 1
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 1
                }
            }
        }
    },
    tempHigh: 102,
    stateHigh: ["steam","steam","dna","dna","stench","salt",],
    tempLow: -5,
    category: "structural",
    reactions: {
        "dust": { elem1: "dirty_water", elem2: null },
        "ash": { elem1: "dirty_water", elem2: null },
        "carbon_dioxide": { elem1: "dirty_water", elem2: null },
        "sulfur": { elem1: "dirty_water", elem2: null },
        "rat": { elem1: "dirty_water", chance:0.005 },
        "plague": { elem1: "dirty_water", elem2: null },
        "fallout": { elem1: "dirty_water", chance:0.25 },
        "radiation": { elem1: "dirty_water", chance:0.25 },
        "rust": { elem1: "dirty_water", chance:0.005 },
        "lead": { elem1: "dirty_water", chance:0.005 },
        "solder": { elem1: "dirty_water", chance:0.005 },
        "rock": { elem2: "wet_sand", chance: 0.0005 },
        "limestone": { elem2: "wet_sand", chance: 0.0005 },
        "fly": { elem2:"dead_bug", chance:0.1, oneway:true },
        "firefly": { elem2:"dead_bug", chance:0.1, oneway:true },
        "bee": { elem2:"dead_bug", chance:0.05, oneway:true },
        "stink_bug": { elem2:"dead_bug", chance:0.1, oneway:true },
        "cancer": { elem1: "dirty_water", chance:0.25 },
        "oil": { elem1: "dirty_water", chance:0.005 },
        "uranium": { elem1: "dirty_water", chance:0.25 },
        "wet_sand": { oneway:true, chance:0.007, func:function(pixel){
            if (isEmpty(pixel.x,pixel.y-1) || isEmpty(pixel.x,pixel.y-2) || isEmpty(pixel.x,pixel.y-3)) {
                changePixel(pixel,"foam");
                pixel.clone = "salt_water";
            }
        }},
        "brain_jar_juice": { elem2:"bubble", color2:"#81cf63", attr2:{"clone":"brain_jar_juice"}, chance:0.0001 },
    },
    state: "liquid",
    density: 1026,
    stain: -0.01,
    properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    extinguish: true
}

elements.bacteria = {
    color: "#769356",
    behavior: [
        "XX|SW:poop,dirty_water%5 AND M2%0.5|M2%5 AND SW:poop,dirty_water%5",
        "XX|FX%2|M2%5 AND SW:poop,dirty_water%5 AND BO",
        "XX|M1 AND SW:poop,dirty_water%5|M2%5 AND SW:poop,dirty_water%5",
    ],
    reactions: {
        "sphincter": { elem2:null, chance:0.01, func:behaviors.FEEDPIXEL },
        "flesh": { elem2:null, chance:0.02, func:behaviors.FEEDPIXEL },
        "intestine": { elem2:null, chance:0.01, func:behaviors.FEEDPIXEL },
        "blood_vessel": { elem2:null, chance:0.02, func:behaviors.FEEDPIXEL },
        "dermis": { elem2:null, chance:0.02, func:behaviors.FEEDPIXEL },
        "scale_dermis": { elem2:null, chance:0.01, func:behaviors.FEEDPIXEL },
        "bug_dermis": { elem2:null, chance:0.01, func:behaviors.FEEDPIXEL },
        "lungs": { elem2:null, chance:0.02, func:behaviors.FEEDPIXEL },
        "rotten_meat": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "poop": { elem2:[null,null,null,null,"poop"], chance:0.05, func:behaviors.FEEDPIXEL },
        "rotten_cheese": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "cheese": { elem2:"rotten_cheese", chance:0.5, func:behaviors.FEEDPIXEL },
        "meat": { elem2:"rotten_meat", chance:0.5, func:behaviors.FEEDPIXEL },
        "cured_meat": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], chance:0.01 },
        "dead_plant": { elem2:"dirt", chance:0.05, func:behaviors.FEEDPIXEL },
        "dead_bug": { elem2:null, chance:0.02, func:behaviors.FEEDPIXEL },
        "mercury": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], chance:0.1 },
        "bleach": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], chance:0.1 },
        "uranium": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], chance:0.1 },
        "cyanide": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], chance:0.1 },
        "chlorine": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], chance:0.1 },
        "alcohol": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], chance:0.25 },
        "water": { elem1:null, elem2:"dirty_water", chance:0.01 },
        "blood": { elem1:null, elem2:"infection", chance:0.01 },
        "salt_water": { elem1:null, elem2:"dirty_water", chance:0.01 },
        "sugar_water": { elem1:null, elem2:"dirty_water", chance:0.01, func:behaviors.FEEDPIXEL },
        "pool_water": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], elem2:"water", chance:0.005 },
        "vinegar": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], chance:0.001 },
        "mouthwash": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], chance:0.01 },
    },
    foodNeed: 15,
    egg: "bacteria",
    tempHigh: 100,
    stateHigh: "dna",
    tempLow: 0,
    stateLow: "dna",
    breakInto: "dna",
    category:"life",
    burn:95,
    burnTime:25,
    burnInto: "dna",
    state: "solid",
    density: 600,
    conduct: 0.1
}

elements.tract = {
    color: ["#7C4941","#83594C"],
    onSelect: function() {
        logMessage("Draw a pipe, wait for walls to appear, then erase the exit hole.");
    },
    hoverStat: function(pixel) {
        return "Nutr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1)) {
            if (Math.random() < 0.75) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"rotten_meat"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    hitPixel.oxygen += 10
                    pixel.oxygen -= 10
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    hitPixel.nutrition += 10
                    pixel.nutrition -= 10
                }
            }
        }
        if (!pixel.stage && pixelTicks-pixel.start > 60) {
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].movable) {
                    deletePixel(x,y)
                }
                if (isEmpty(x,y)) {
                    createPixel("flesh",x,y);
                }
            }
            pixel.stage = 1;
        }
        else if (pixel.stage === 1 && pixelTicks-pixel.start > 70) { //uninitialized
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coord = adjacentCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x,y)) {
                    pixel.stage = 2; //blue
                    pixel.color = pixelColorPick(pixel,"#552D3F");
                    break;
                }
            }
        }
        else if (pixel.stage > 1 && pixelTicks % 3 === pixel.stage-2) { //initialized
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true) && pixelMap[x][y].element === "tract") {
                    var newPixel = pixelMap[x][y];
                    if (newPixel.stage === 1) {
                        var newColor;
                        switch (pixel.stage) {
                            case 2: newPixel.stage = 3; newColor = "#554B21"; break; //green
                            case 3: newPixel.stage = 4; newColor = "#66241B"; break; //red
                            case 4: newPixel.stage = 2; newColor = "#552D3F"; break; //blue
                        }
                        newPixel.color = pixelColorPick(newPixel,newColor);
                    }
                }
            }
            var moved = false;
            shuffleArray(squareCoordsShuffle);
            for (var i = 0; i < squareCoordsShuffle.length; i++) {
                var coord = squareCoordsShuffle[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true)) {
                    var newPixel = pixelMap[x][y];
                    if (newPixel.element === "tract") {
                        var nextStage;
                        switch (pixel.stage) {
                            case 2: nextStage = 4; break; //green
                            case 3: nextStage = 2; break; //red
                            case 4: nextStage = 3; break; //blue
                        }
                        if (pixel.con && !newPixel.con && newPixel.stage === nextStage && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000))) { //transfer to adjacent pipe
                            newPixel.con = pixel.con;
                            newPixel.con.x = newPixel.x;
                            newPixel.con.y = newPixel.y;
                            pixel.con = null;
                            moved = true;
                            break;
                        }
                    }
                    else if (!pixel.con && elements[newPixel.element].movable) { //suck up pixel
                        pixel.con = newPixel;
                        deletePixel(newPixel.x,newPixel.y);
                        pixel.con.x = pixel.x;
                        pixel.con.y = pixel.y;
                        pixel.con.del;
                        moved = true;
                        break;
                    }
                }
            }
            if (pixel.con && !moved && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen) / 2000))) { // move to same stage if none other
                for (var i = 0; i < squareCoordsShuffle.length; i++) {
                    var coord = squareCoordsShuffle[i];
                    var x = pixel.x+coord[0];
                    var y = pixel.y+coord[1];
                    if (isEmpty(x,y)) {
                        delete pixel.con.del;
                        pixel.con.x = x;
                        pixel.con.y = y;
                        pixelMap[x][y] = pixel.con;
                        currentPixels.push(pixel.con);
                        pixel.con = null;
                        break;
                    }
                    if (!isEmpty(x,y,true) && pixelMap[x][y].element === "tract") {
                        var newPixel = pixelMap[x][y];
                        if (pixel.con && !newPixel.con && newPixel.stage === pixel.stage) {
                            newPixel.con = pixel.con;
                            newPixel.con.x = newPixel.x;
                            newPixel.con.y = newPixel.y;
                            pixel.con = null;
                            break;
                        }
                    }
                }
            }
        }
        doDefaults(pixel);
    },
    category: "structural",
    movable: false,
    canContain: true,
    forceSaveColor: true,
    density: 2710,
    state: "solid",
    conduct: .05,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
	reactions: {
        "cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","blood","fat","meat","rotten_meat","cooked_meat"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
    },
    isBio: true,
}

if (!elements.cancer.reactions) { elements.cancer.reactions = {} }
elements.cancer.reactions.flesh = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.adipose = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.blood_vessel = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.heart = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.dermis = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.amphib_dermis = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.scale_dermis = { "elem2": "cancer", chance:0.004 };
elements.cancer.reactions.epidermis = { "elem2": "cancer", chance:0.0002 };
elements.cancer.reactions.amphib_skin = { "elem2": "cancer", chance:0.0003 };
elements.cancer.reactions.scales = { "elem2": "cancer", chance:0.0001 };
elements.cancer.reactions.real_bone = { "elem2": ["bone","bone","cancer"], chance:0.0001 };
elements.cancer.reactions.lungs = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.gills = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.brain = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.nerve = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.eye_nerve = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.eye = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.sphincter = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.digested_material = { "elem2": "cancer", chance:0.001 };
elements.cancer.reactions.intestines = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.stomach_valve = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.stomach_lining = { "elem2": "cancer", chance:0.005 };
elements.uranium.reactions.decomposer_stomach = { "elem2": "cancer", chance:0.004 };
elements.uranium.reactions.herbi_stomach = { "elem2": "cancer", chance:0.004 };
elements.uranium.reactions.carni_stomach = { "elem2": "cancer", chance:0.004 };
elements.uranium.reactions.explosive_stomach = { "elem2": ["pop","cancer","cancer","cancer"], chance:0.003 };
elements.cancer.reactions.throat_lining = { "elem2": "cancer", chance:0.005 };

if (!elements.uranium.reactions) { elements.uranium.reactions = {} }
elements.uranium.reactions.flesh = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat"], chance:0.5 };
elements.uranium.reactions.adipose = { "elem2": ["ash","blood","fat","fat","meat","rotten_meat","cooked_meat"], chance:0.5 };
elements.uranium.reactions.blood_vessel = { "elem2": ["ash","blood","blood","blood","blood","blood","blood","meat","rotten_meat","cooked_meat"], chance:0.5 };
elements.uranium.reactions.heart = { "elem2": ["ash","blood","blood","blood","blood","blood","blood","meat","rotten_meat","cooked_meat"], chance:0.5 };
elements.uranium.reactions.dermis = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.5 };
elements.uranium.reactions.amphib_dermis = { "elem2": ["ash","blood","slime","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.5 };
elements.uranium.reactions.scale_dermis = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.5 };
elements.uranium.reactions.bug_dermis = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.5 };
elements.uranium.reactions.epidermis = { "elem2": ["cooked_meat","cancer","ash","skin","hair"], chance:0.1 };
elements.uranium.reactions.amphib_skin = { "elem2": ["cooked_meat","cancer","ash","skin","slime"], chance:0.4 };
elements.uranium.reactions.scales = { "elem2": ["cooked_meat","cancer","ash","epidermis","skin","dust","calcium"], chance:0.1 };
elements.uranium.reactions.exoskeleton = { "elem2": ["cooked_meat","cancer","ash","epidermis","skin","dust","calcium"], chance:0.1 };
elements.uranium.reactions.real_bone = { "elem2": ["bone","bone","radiation"], chance:0.01 };
elements.uranium.reactions.gills = { "elem2": ["ash","steam","meat","rotten_meat","cooked_meat","flesh"], chance:0.5 };
elements.uranium.reactions.lungs = { "elem2": ["ash","carbon_dioxide","meat","rotten_meat","cooked_meat","flesh","ash","carbon_dioxide","meat","rotten_meat","cooked_meat","flesh","ash","oxygen","meat","rotten_meat","cooked_meat","flesh"], chance:0.5 };
elements.uranium.reactions.brain = { "elem2": ["ash","steam","salt","meat","rotten_meat","cooked_meat","flesh","cerebrospinal_fluid"], chance:0.5 };
elements.uranium.reactions.amygdala = { "elem2": ["ash","steam","salt","ash","steam","salt","meat","rotten_meat","cooked_meat","flesh"], chance:0.5 };
elements.uranium.reactions.nerve = { "elem2": ["ash","steam","salt","ash","steam","salt","meat","rotten_meat","cooked_meat","flesh"], chance:0.5 };
elements.uranium.reactions.eye_nerve = { "elem2": ["ash","steam","salt","ash","steam","salt","meat","rotten_meat","cooked_meat","flesh"], chance:0.5 };
elements.uranium.reactions.eye = { "elem2": ["ash","steam","salt","ash","steam","salt","meat","rotten_meat","cooked_meat","flesh"], chance:0.5 };
elements.uranium.reactions.sphincter = { "elem2": ["ash","steam","poop","meat","rotten_meat","cooked_meat","flesh"], chance:0.5 };
elements.uranium.reactions.intestines = { "elem2": ["ash","steam","meat","rotten_meat","cooked_meat","flesh","ash","steam","meat","rotten_meat","cooked_meat","flesh","poop"], chance:0.5 };
elements.uranium.reactions.stomach_valve = { "elem2": ["ash","steam","meat","rotten_meat","cooked_meat","flesh"], chance:0.5 };
elements.uranium.reactions.stomach_lining = { "elem2": ["ash","steam","meat","rotten_meat","cooked_meat","flesh"], chance:0.5 };
elements.uranium.reactions.decomposer_stomach = { "elem2": ["cancer","ash","steam","meat","rotten_meat","cooked_meat","flesh"], chance:0.5 };
elements.uranium.reactions.herbi_stomach = { "elem2": ["cancer","ash","steam","meat","rotten_meat","cooked_meat","flesh"], chance:0.5 };
elements.uranium.reactions.carni_stomach = { "elem2": ["cancer","ash","steam","meat","rotten_meat","cooked_meat","flesh"], chance:0.5 };
elements.uranium.reactions.explosive_stomach = { "elem2": ["cancer","ash","steam","meat","rotten_meat","cooked_meat","flesh","pop"], chance:0.4 };
elements.uranium.reactions.throat_lining = { "elem2": ["ash","slime","meat","rotten_meat","cooked_meat","flesh"], chance:0.5 };

if (!elements.radiation.reactions) { elements.radiation.reactions = {} }
elements.radiation.reactions.flesh = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.4 };
elements.radiation.reactions.adipose = { "elem2": ["ash","blood","fat","fat","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.4 };
elements.radiation.reactions.blood_vessel = { "elem2": ["ash","blood","blood","blood","blood","blood","blood","meat","rotten_meat","cooked_meat"], chance:0.4 };
elements.radiation.reactions.heart = { "elem2": ["ash","blood","blood","blood","blood","blood","blood","meat","rotten_meat","cooked_meat"], chance:0.4 };
elements.radiation.reactions.dermis = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.4 };
elements.radiation.reactions.amphib_dermis = { "elem2": ["ash","blood","slime","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.4 };
elements.radiation.reactions.scale_dermis = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.4 };
elements.radiation.reactions.scales = { "elem2": ["cooked_meat","cancer","ash","epidermis","skin","dust","calcium"], chance:0.1 };
elements.radiation.reactions.exoskeleton = { "elem2": ["cooked_meat","cancer","ash","epidermis","skin","dust","calcium"], chance:0.1 };
elements.radiation.reactions.bug_dermis = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.4 };
elements.radiation.reactions.epidermis = { "elem2": ["cooked_meat","cancer","ash","skin","hair"], chance:0.1 };
elements.radiation.reactions.amphib_skin = { "elem2": ["cooked_meat","cancer","ash","skin","slime"], chance:0.1 };
elements.radiation.reactions.real_bone = { "elem2": ["bone","bone","radiation"], chance:0.01 };
elements.radiation.reactions.gills = { "elem2": ["ash","steam","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 };
elements.radiation.reactions.lungs = { "elem2": ["cancer","ash","carbon_dioxide","meat","rotten_meat","cooked_meat","flesh","ash","carbon_dioxide","meat","rotten_meat","cooked_meat","flesh","ash","oxygen","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 };
elements.radiation.reactions.brain = { "elem2": ["cancer","ash","steam","salt","meat","rotten_meat","cooked_meat","flesh","cerebrospinal_fluid"], chance:0.4 };
elements.radiation.reactions.amygdala = { "elem2": ["cancer","ash","steam","salt","ash","steam","salt","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 };
elements.radiation.reactions.nerve = { "elem2": ["cancer","ash","steam","salt","ash","steam","salt","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 };
elements.radiation.reactions.eye_nerve = { "elem2": ["cancer","ash","steam","salt","ash","steam","salt","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 };
elements.radiation.reactions.eye = { "elem2": ["cancer","ash","steam","salt","ash","steam","salt","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 };
elements.radiation.reactions.sphincter = { "elem2": ["cancer","ash","steam","poop","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 };
elements.radiation.reactions.intestines = { "elem2": ["cancer","ash","steam","meat","rotten_meat","cooked_meat","flesh","ash","steam","meat","rotten_meat","cooked_meat","flesh","poop"], chance:0.4 };
elements.radiation.reactions.stomach_valve = { "elem2": ["cancer","ash","steam","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 };
elements.radiation.reactions.stomach_lining = { "elem2": ["cancer","ash","steam","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 };
elements.radiation.reactions.decomposer_stomach = { "elem2": ["cancer","ash","steam","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 };
elements.radiation.reactions.herbi_stomach = { "elem2": ["cancer","ash","steam","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 };
elements.radiation.reactions.carni_stomach = { "elem2": ["cancer","ash","steam","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 };
elements.radiation.reactions.explosive_stomach = { "elem2": ["cancer","ash","steam","meat","rotten_meat","cooked_meat","flesh","pop"], chance:0.3 };
elements.radiation.reactions.throat_lining = { "elem2": ["cancer","ash","slime","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 };

if (!elements.plague.reactions) { elements.plague.reactions = {} }
elements.plague.reactions.flesh = { "elem2": ["rotten_meat","plague","fat","meat","rotten_meat","plague","infection","infection"], chance:0.04 };
elements.plague.reactions.adipose = { "elem2": ["rotten_meat","plague","fat","fat","meat","rotten_meat","plague","infection","infection"], chance:0.04 };
elements.plague.reactions.blood_vessel = { "elem2": ["rotten_meat","plague","meat","rotten_meat","plague","infection","infection","infection","infection","infection","infection"], chance:0.04 };
elements.plague.reactions.heart = { "elem2": ["rotten_meat","plague","meat","rotten_meat","plague","infection","infection","infection","infection","infection","infection"], chance:0.04 };
elements.plague.reactions.dermis = { "elem2": ["rotten_meat","infection","fat","meat","rotten_meat","plague","infection","infection"], chance:0.04 };
elements.plague.reactions.amphib_dermis = { "elem2": ["rotten_meat","infection","slime","meat","rotten_meat","plague","infection","infection"], chance:0.04 };
elements.plague.reactions.scale_dermis = { "elem2": ["rotten_meat","infection","fat","meat","rotten_meat","plague","infection","infection"], chance:0.04 };
elements.plague.reactions.epidermis = { "elem2": ["plague","infection","rotten_meat","skin","hair"], chance:0.1 };
elements.plague.reactions.amphib_skin = { "elem2": ["plague","infection","rotten_meat","skin","slime"], chance:0.1 };
elements.plague.reactions.scales = { "elem2": ["plague","infection","rotten_meat","dust","skin","calcium"], chance:0.1 };
elements.plague.reactions.real_bone = { "elem2": ["bone","bone","infection","plague"], chance:0.01 };
elements.plague.reactions.gills = { "elem2": ["infection","steam","meat","rotten_meat","plague","flesh","plague"], chance:0.04 };
elements.plague.reactions.lungs = { "elem2": ["infection","rotten_meat","carbon_dioxide","meat","rotten_meat","plague","flesh","rotten_meat","carbon_dioxide","meat","rotten_meat","plague","flesh","rotten_meat","oxygen","meat","rotten_meat","plague","flesh"], chance:0.04 };
elements.plague.reactions.brain = { "elem2": ["infection","rotten_meat","steam","salt","meat","rotten_meat","plague","flesh","cerebrospinal_fluid"], chance:0.04 };
elements.plague.reactions.amygdala = { "elem2": ["infection","rotten_meat","steam","salt","rotten_meat","steam","salt","meat","rotten_meat","plague","flesh"], chance:0.04 };
elements.plague.reactions.nerve = { "elem2": ["infection","rotten_meat","steam","salt","rotten_meat","steam","salt","meat","rotten_meat","plague","flesh"], chance:0.04 };
elements.plague.reactions.eye_nerve = { "elem2": ["infection","rotten_meat","steam","salt","rotten_meat","steam","salt","meat","rotten_meat","plague","flesh"], chance:0.04 };
elements.plague.reactions.eye = { "elem2": ["infection","rotten_meat","steam","salt","rotten_meat","steam","salt","meat","rotten_meat","plague","flesh"], chance:0.04 };
elements.plague.reactions.sphincter = { "elem2": ["infection","rotten_meat","steam","poop","meat","rotten_meat","plague","flesh"], chance:0.04 };
elements.plague.reactions.intestines = { "elem2": ["infection","rotten_meat","steam","meat","rotten_meat","plague","flesh","rotten_meat","steam","meat","rotten_meat","plague","flesh","poop"], chance:0.04 };
elements.plague.reactions.stomach_valve = { "elem2": ["infection","rotten_meat","steam","meat","rotten_meat","plague","flesh"], chance:0.04 };
elements.plague.reactions.stomach_lining = { "elem2": ["infection","rotten_meat","steam","meat","rotten_meat","plague","flesh"], chance:0.04 };
elements.plague.reactions.decomposer_stomach = { "elem2": ["infection","rotten_meat","steam","meat","rotten_meat","plague","flesh"], chance:0.04 };
elements.plague.reactions.herbi_stomach = { "elem2": ["infection","rotten_meat","steam","meat","rotten_meat","plague","flesh"], chance:0.04 };
elements.plague.reactions.carni_stomach = { "elem2": ["infection","rotten_meat","steam","meat","rotten_meat","plague","flesh"], chance:0.04 };
elements.plague.reactions.explosive_stomach = { "elem2": ["infection","plague","steam","meat","rotten_meat","plague","flesh","pop"], chance:0.03 };
elements.plague.reactions.throat_lining = { "elem2": ["infection","rotten_meat","slime","meat","rotten_meat","plague","flesh"], chance:0.04 };

if (!elements.fly.reactions) { elements.infection.reactions = {} }
elements.fly.reactions.poop = { elem2:[null,null,"stench"], chance:0.15, func:behaviors.FEEDPIXEL };
elements.fly.reactions.intestines = { elem1:[null,null,"stench"], chance:0.015, };
elements.fly.reactions.stomach_valve = { elem1:[null,null,"stench"], chance:0.05, };

elements.dna.reactions.juice = { "elem1": null, "elem2": "elixir", chance:0.01 };

elements.acid.ignore = ["herbi_stomach","carni_stomach","decomposer_stomach","amphib_skin","amphib_dermis","acidic_flesh","acid_vessel","explosive_stomach","stomach_valve","stomach_lining","throat_lining","glass","rad_glass","glass_shard","rad_shard","stained_glass","baked_clay","acid_gas","neutral_acid","acid_cloud","water","salt_water","sugar_water","dirty_water","copper","gold","porcelain","plastic","bead","microplastic","molten_plastic","pool_water","chlorine","hydrogen","gold_coin","silver","nickel","calcium","bone","earthquake","tornado","tsunami","liquid_light","sensor"]
