// by Nekonico

viewInfo[4] = { // Nutrition View
    name: "nutr",
    pixel: function(pixel,ctx) {
        if (elements[pixel.element].isBio === true) {
        var nutrition = pixel.nutrition;
        if (nutrition < 0) {nutrition = 0}
        if (nutrition > 6000) {nutrition = 6000}
        var hue = Math.round(225 - (Math.log(nutrition)/Math.log(6000))*225);
        if (hue < 0) {hue = 0}
        if (hue > 225) {hue = 225}
        drawSquare(ctx,"hsl("+hue+",100%,50%)",pixel.x,pixel.y)
        }
    }
}

viewInfo[5] = { // Oxygen View
    name: "oxy",
    pixel: function(pixel,ctx) {
        if (elements[pixel.element].isBio === true) {
            var oxygen = pixel.oxygen;
            if (oxygen < 0) {oxygen = 0}
            if (oxygen > 6000) {oxygen = 6000}
            var hue = Math.round(225 - (Math.log(oxygen)/Math.log(6000))*225);
            if (hue < 0) {hue = 0}
            if (hue > 225) {hue = 225}
            drawSquare(ctx,"hsl("+hue+",100%,50%)",pixel.x,pixel.y)
        }
    }
}

viewInfo[6] = { // Speed View
    name: "spd",
    pixel: function(pixel,ctx) {
        if (elements[pixel.element].isBio === true) {
            var speed = pixel.speed;
            if (speed < -50) {speed = -50}
            if (speed > 150) {speed = 150}
            var hue = Math.round(225 - (Math.log(speed+50)/Math.log(100+50))*225);
            if (hue < 0) {hue = 0}
            if (hue > 225) {hue = 225}
            drawSquare(ctx,"hsl("+hue+",100%,50%)",pixel.x,pixel.y)
        }
    }
}

viewInfo[7] = { // Illness View
    name: "ill",
    pixel: function(pixel,ctx) {
        if ((elements[pixel.element].id === elements.infected_vessel.id || elements[pixel.element].id === elements.infection.id || elements[pixel.element].id === elements.cancer.id || elements[pixel.element].id === elements.plague.id || elements[pixel.element].id === elements.rotten_meat.id) || ((elements[pixel.element].isBio === true || elements[pixel.element].id === elements.digested_material.id || elements[pixel.element].id === elements.gaseous_material.id) && (pixel.speed < -5 || pixel.oxygen < 250 || pixel.nutrition < 250))) {
            var a = (settings.textures !== 0) ? pixel.alpha : undefined;
                    if (((elements[pixel.element].isGas && elements[pixel.element].glow !== false) || elements[pixel.element].glow || pixel.glow) && pixel.glow !== false) {
                        drawPlus(ctx,pixel.color,pixel.x,pixel.y,undefined,a)
                        // if (isEmpty(pixel.x+1,pixel.y) || isEmpty(pixel.x-1,pixel.y) || isEmpty(pixel.x,pixel.y+1) || isEmpty(pixel.x,pixel.y-1)) {}
                    }
                    else {
                        drawSquare(ctx,pixel.color,pixel.x,pixel.y,undefined,a)
                    }
                    if (pixel.charge && view !== 2) { // Yellow glow on charge
                        if (!elements[pixel.element].colorOn) {
                            drawSquare(ctx,"rgba(255,255,0,0.5)",pixel.x,pixel.y);
                        }
                    }
        }
    }
}

behaviorRules.BCF = function() {
    if (btemp.pixel.clone) {
        if (isEmpty(btemp.newCoords.x, btemp.newCoords.y)) {
            createPixel(btemp.pixel.clone, btemp.newCoords.x, btemp.newCoords.y)
            btemp.pixel.nutrition = (btemp.pixel.nutrition - 10)
            btemp.pixel.oxygen = (btemp.pixel.oxygen - 1)
            if (pixelMap[btemp.newCoords.x][btemp.newCoords.y]) {
                pixelMap[btemp.newCoords.x][btemp.newCoords.y].temp = btemp.pixel.temp;
                pixelTempCheck(pixelMap[btemp.newCoords.x][btemp.newCoords.y]);
            }
        }
    }
    else {
        if (!isEmpty(btemp.newCoords.x, btemp.newCoords.y,true)) {
            var newPixel = pixelMap[btemp.newCoords.x][btemp.newCoords.y];
            if (!btemp.pixel.clone && btemp.info.ignore && btemp.info.ignore.indexOf(newPixel.element) !== -1) {
                return;
            }
            if (newPixel.element !== btemp.pixel.element) {
                btemp.pixel.clone = newPixel.element;
                btemp.pixel.temp = newPixel.temp;
            }
            else if (newPixel.clone) {
                btemp.pixel.clone = newPixel.clone;
                btemp.pixel.temp = newPixel.temp;
            }
        }
    }
}

behaviorRules.BCR = function() {
    if (isEmpty(btemp.newCoords.x,btemp.newCoords.y)) {
        if (btemp.arg == null) {
            btemp.arg = btemp.pixel.element;
        }
        else if (btemp.arg.indexOf(",") !== -1) {
            btemp.arg = choose(btemp.arg.split(","));
        }
        if (elements[btemp.arg]) {
            createPixel(btemp.arg,btemp.newCoords.x,btemp.newCoords.y);
            btemp.pixel.nutrition = (btemp.pixel.nutrition - 1)
            if (btemp.info.fireColor && btemp.arg==="fire") {
                pixelMap[btemp.newCoords.x][btemp.newCoords.y].color = pixelColorPick(pixelMap[btemp.newCoords.x][btemp.newCoords.y],btemp.info.fireColor);
            }
            pixelMap[btemp.newCoords.x][btemp.newCoords.y].temp = btemp.pixel.temp
            pixelTempCheck(pixelMap[btemp.newCoords.x][btemp.newCoords.y]);
        }
    }
}

elements.flesh = {
	color: ["#9e4839","#ba6449"],
	category: "structural",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
        doDefaults(pixel);
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
	reactions: {
        "cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","blood","fat","meat","rotten_meat","cooked_meat"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
        speed: 0,
    },
    isBio: true,
    movable: false,
}

elements.epidermis = {
	color: "#f7ead0",
	category: "structural",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((pixel.temp > 35 || pixel.temp < 10) && Math.random() < 0.005) {
            for (var i = 0; i < squareCoords.length; i++) {
                var coords = squareCoords[i];
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
        if ((Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"dust"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"dust"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"dust"); 
                }
                else {
                    changePixel(pixel,"meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 3,
    burnTime: 350,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat","dust","dust","dust","dust"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","meat","rotten_meat","cooked_meat","flesh"], chance:0.2 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
        speed: 0,
    },
    isBio: true,
    movable: false,
}

elements.dermis = {
	color: "#CFA08B",
	category: "structural",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050)) && Math.random() < 0.005) {
            for (var i = 0; i < squareCoords.length; i++) {
                var coords = squareCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (isEmpty(x,y)) {
                    createPixel("epidermis",x,y);
                    pixelMap[x][y].nutrition = (Math.round(pixel.nutrition / 2))
                    pixelMap[x][y].oxygen = (Math.round(pixel.oxygen / 2))
                    pixel.nutrition = (Math.round(pixel.nutrition / 2))
                    pixel.oxygen = (Math.round(pixel.oxygen / 2))
                }
            }
        }
        doDefaults(pixel);
        if ((Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 4,
    burnTime: 350,
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
        speed: 0,
    },
    isBio: true,
    movable: false,
}

elements.cloak_skin = {
	color: "#CFD4A5",
	category: "structural",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((pixel.temp > 35 || pixel.temp < 10) && Math.random() < 0.005) {
            for (var i = 0; i < squareCoords.length; i++) {
                var coords = squareCoords[i];
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
        if ((Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"dust"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"dust"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"dust"); 
                }
                else {
                    changePixel(pixel,"meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (pixel.color != hitPixel.color) {
                    hitPixel.color = pixel.color
                }
            }
            else if (elements[hitPixel.element].movable) {
                if (pixel.color != hitPixel.color) {
                    pixel.color = hitPixel.color
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (pixel.color != hitPixel.color) {
                    hitPixel.color = pixel.color
                }
            }
            else if (elements[hitPixel.element].movable) {
                if (pixel.color != hitPixel.color) {
                    pixel.color = hitPixel.color
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (pixel.color != hitPixel.color) {
                    hitPixel.color = pixel.color
                }
            }
            else if (elements[hitPixel.element].movable) {
                if (pixel.color != hitPixel.color) {
                    pixel.color = hitPixel.color
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (pixel.color != hitPixel.color) {
                    hitPixel.color = pixel.color
                }
            }
            else if (elements[hitPixel.element].movable) {
                if (pixel.color != hitPixel.color) {
                    pixel.color = hitPixel.color
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 3,
    burnTime: 350,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat","dust","dust","dust","dust"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","meat","rotten_meat","cooked_meat","flesh"], chance:0.2 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
        speed: 0,
    },
    isBio: true,
    movable: false,
}

elements.cloak_dermis = {
	color: "#BC9F7B",
	category: "structural",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050)) && Math.random() < 0.005) {
            for (var i = 0; i < squareCoords.length; i++) {
                var coords = squareCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (isEmpty(x,y)) {
                    createPixel("cloak_skin",x,y);
                    pixelMap[x][y].nutrition = (Math.round(pixel.nutrition / 2))
                    pixelMap[x][y].oxygen = (Math.round(pixel.oxygen / 2))
                    pixel.nutrition = (Math.round(pixel.nutrition / 2))
                    pixel.oxygen = (Math.round(pixel.oxygen / 2))
                }
            }
        }
        doDefaults(pixel);
        if ((Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (pixel.color != hitPixel.color) {
                    hitPixel.color = pixel.color
                }
            }
            else if (elements[hitPixel.element].movable) {
                if (pixel.color != hitPixel.color) {
                    pixel.color = hitPixel.color
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (pixel.color != hitPixel.color) {
                    hitPixel.color = pixel.color
                }
            }
            else if (elements[hitPixel.element].movable) {
                if (pixel.color != hitPixel.color) {
                    pixel.color = hitPixel.color
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (pixel.color != hitPixel.color) {
                    hitPixel.color = pixel.color
                }
            }
            else if (elements[hitPixel.element].movable) {
                if (pixel.color != hitPixel.color) {
                    pixel.color = hitPixel.color
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (pixel.color != hitPixel.color) {
                    hitPixel.color = pixel.color
                }
            }
            else if (elements[hitPixel.element].movable) {
                if (pixel.color != hitPixel.color) {
                    pixel.color = hitPixel.color
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 4,
    burnTime: 350,
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
        speed: 0,
    },
    isBio: true,
    movable: false,
}

elements.loose_hair = {
    color: "#79554D",
    singleColor: true,
    behavior: behaviors.POWDER,
    category:"powders",
    tempHigh: 223,
    stateHigh: ["smoke","smoke","smoke","ash","ash","stench"],
    burn: 20,
    burnTime: 350,
    burnInto:["smoke","smoke","fire","ash","ash","stench"],
    breakInto: [null,null,null,null,"dust"],
    state: "solid",
    density: 2395,
    conduct: 0.05,
    hidden: true
}

elements.hair_end = {
    color: "#754a41",
	category: "structural",
    behavior: behaviors.WALL,
    tick: function(pixel) {
        if (pixel.dir === "up") {
            if (isEmpty(pixel.x,pixel.y+1)) {
                changePixel(pixel,"loose_hair"); 
            }
            else if (!isEmpty(pixel.x,pixel.y+1,true)) {
                if (elements[pixelMap[pixel.x][pixel.y+1].element].isHair != true) {
                    changePixel(pixel,"loose_hair"); 
                }
            }
        }
        else if (pixel.dir === "down") {
            if (isEmpty(pixel.x,pixel.y-1)) {
                changePixel(pixel,"loose_hair"); 
            }
            else if (!isEmpty(pixel.x,pixel.y-1,true)) {
                if (elements[pixelMap[pixel.x][pixel.y-1].element].isHair != true) {
                    changePixel(pixel,"loose_hair"); 
                }
            }
        }
        else if (pixel.dir === "left") {
            if (isEmpty(pixel.x+1,pixel.y)) {
                changePixel(pixel,"loose_hair"); 
            }
            else if (!isEmpty(pixel.x+1,pixel.y,true)) {
                if (elements[pixelMap[pixel.x+1][pixel.y].element].isHair != true) {
                    changePixel(pixel,"loose_hair"); 
                }
            }
        }
        else if (pixel.dir === "right") {
            if (isEmpty(pixel.x-1,pixel.y)) {
                changePixel(pixel,"loose_hair"); 
            }
            else if (!isEmpty(pixel.x-1,pixel.y,true)) {
                if (elements[pixelMap[pixel.x-1][pixel.y].element].isHair != true) {
                    changePixel(pixel,"loose_hair"); 
                }
            }
        }
        else if (!pixel.dir && pixel.age > 10) {
            changePixel(pixel,"loose_hair"); 
        }
        if (pixel.temp < 5 && Math.random() < 0.01) {
            for (var i = 0; i < squareCoords.length; i++) {
                var coords = squareCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (isEmpty(x,y)) {
                    pixel.temp += 10;
                    break;
                }
            }
        }
        if (pixel.temp < 10 && Math.random() < 0.1) {
            pixel.temp += 1;
        }
        doDefaults(pixel);
        pixel.age++
    },
    properties: {
        age: 0,
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempLow: -25,
    stateLow: "loose_hair",
    tempHigh: 123,
    stateHigh: "loose_hair",
    burn:15,
    burnTime: 400,
    burnInto:"loose_hair",
    breakInto:"loose_hair",
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:null, chance:0.0005 },
        "radiation": { elem1:["ash","dust"], chance:0.2 },
	},
    isHair: true,
    movable: false,
    hidden: true,
}

elements.attached_hair = {
    color: "#754a41",
	category: "structural",
    behavior: behaviors.WALL,
    tick: function(pixel) {
        if (Math.random() < 0.005) {
            if (pixel.dir === "up") {
                if (isEmpty(pixel.x,pixel.y-1)) {
                    if (Math.random() > 0.2) {
                        createPixel("attached_hair",pixel.x,pixel.y-1)
                        pixelMap[pixel.x][pixel.y-1].dir = "up"
                    }
                    else {
                        createPixel("hair_end",pixel.x,pixel.y-1)
                        pixelMap[pixel.x][pixel.y-1].dir = "up"
                    }
                }
            }
            else if (pixel.dir === "down") {
                if (isEmpty(pixel.x,pixel.y+1)) {
                    if (Math.random() > 0.2) {
                        createPixel("attached_hair",pixel.x,pixel.y+1)
                        pixelMap[pixel.x][pixel.y+1].dir = "down"
                    }
                    else {
                        createPixel("hair_end",pixel.x,pixel.y+1)
                        pixelMap[pixel.x][pixel.y+1].dir = "down"
                    }
                }
            }
            else if (pixel.dir === "left") {
                if (isEmpty(pixel.x-1,pixel.y)) {
                    if (Math.random() > 0.2) {
                        createPixel("attached_hair",pixel.x-1,pixel.y)
                        pixelMap[pixel.x-1][pixel.y].dir = "left"
                    }
                    else {
                        createPixel("hair_end",pixel.x-1,pixel.y)
                        pixelMap[pixel.x-1][pixel.y].dir = "left"
                    }
                }
            }
            else if (pixel.dir === "right") {
                if (isEmpty(pixel.x+1,pixel.y)) {
                    if (Math.random() > 0.2) {
                        createPixel("attached_hair",pixel.x+1,pixel.y)
                        pixelMap[pixel.x+1][pixel.y].dir = "right"
                    }
                    else {
                        createPixel("hair_end",pixel.x+1,pixel.y)
                        pixelMap[pixel.x+1][pixel.y].dir = "right"
                    }
                }
            }
        }
        if (pixel.dir === "up") {
            if (isEmpty(pixel.x,pixel.y+1)) {
                changePixel(pixel,"loose_hair"); 
            }
            else if (!isEmpty(pixel.x,pixel.y+1,true)) {
                if (elements[pixelMap[pixel.x][pixel.y+1].element].isHair != true) {
                    changePixel(pixel,"loose_hair"); 
                }
            }
        }
        else if (pixel.dir === "down") {
            if (isEmpty(pixel.x,pixel.y-1)) {
                changePixel(pixel,"loose_hair"); 
            }
            else if (!isEmpty(pixel.x,pixel.y-1,true)) {
                if (elements[pixelMap[pixel.x][pixel.y-1].element].isHair != true) {
                    changePixel(pixel,"loose_hair"); 
                }
            }
        }
        else if (pixel.dir === "left") {
            if (isEmpty(pixel.x+1,pixel.y)) {
                changePixel(pixel,"loose_hair"); 
            }
            else if (!isEmpty(pixel.x+1,pixel.y,true)) {
                if (elements[pixelMap[pixel.x+1][pixel.y].element].isHair != true) {
                    changePixel(pixel,"loose_hair"); 
                }
            }
        }
        else if (pixel.dir === "right") {
            if (isEmpty(pixel.x-1,pixel.y)) {
                changePixel(pixel,"loose_hair"); 
            }
            else if (!isEmpty(pixel.x-1,pixel.y,true)) {
                if (elements[pixelMap[pixel.x-1][pixel.y].element].isHair != true) {
                    changePixel(pixel,"loose_hair"); 
                }
            }
        }
        else if (!pixel.dir && pixel.age > 10) {
            changePixel(pixel,"loose_hair"); 
        }
        if (pixel.temp < 5 && Math.random() < 0.01) {
            for (var i = 0; i < squareCoords.length; i++) {
                var coords = squareCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (isEmpty(x,y)) {
                    pixel.temp += 10;
                    break;
                }
            }
        }
        if (pixel.temp < 10 && Math.random() < 0.1) {
            pixel.temp += 1;
        }
        doDefaults(pixel);
        pixel.age++
    },
    properties: {
        age: 0,
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempLow: -25,
    stateLow: "loose_hair",
    tempHigh: 123,
    stateHigh: "loose_hair",
    burn:15,
    burnTime: 400,
    burnInto:"loose_hair",
    breakInto:"loose_hair",
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:null, chance:0.0005 },
        "radiation": { elem1:["ash","dust"], chance:0.2 },
	},
    isHair: true,
    movable: false,
    hidden: true,
}

elements.hairy_skin = {
	color: "#ECDCC3",
	category: "structural",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050)) && Math.random() < 0.01) {
                if (isEmpty(pixel.x,pixel.y-1)) {
                    createPixel("attached_hair",pixel.x,pixel.y-1)
                    pixelMap[pixel.x][pixel.y-1].dir = "up"
                }
                if (isEmpty(pixel.x,pixel.y+1)) {
                    createPixel("attached_hair",pixel.x,pixel.y+1)
                    pixelMap[pixel.x][pixel.y+1].dir = "down"
                }

                if (isEmpty(pixel.x-1,pixel.y)) {
                    createPixel("attached_hair",pixel.x-1,pixel.y)
                    pixelMap[pixel.x-1][pixel.y].dir = "left"
                }

                if (isEmpty(pixel.x+1,pixel.y)) {
                    createPixel("attached_hair",pixel.x+1,pixel.y)
                    pixelMap[pixel.x+1][pixel.y].dir = "right"
                }

        }
        if ((pixel.temp > 35 || pixel.temp < 10) && Math.random() < 0.005) {
            for (var i = 0; i < squareCoords.length; i++) {
                var coords = squareCoords[i];
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
        if ((Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"dust"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"dust"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"dust"); 
                }
                else {
                    changePixel(pixel,"meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 375,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat","dust","dust","dust","dust"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","meat","rotten_meat","cooked_meat","flesh"], chance:0.2 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
        speed: 0,
    },
    isHair: true,
    isBio: true,
    movable: false,
}

elements.hair_dermis = {
	color: "#C89985",
	category: "structural",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050)) && Math.random() < 0.005) {
            for (var i = 0; i < squareCoords.length; i++) {
                var coords = squareCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (isEmpty(x,y)) {
                    if (Math.random() > 0.05) {
                        createPixel("hairy_skin",x,y);
                        pixelMap[x][y].nutrition = (Math.round(pixel.nutrition / 2))
                        pixelMap[x][y].oxygen = (Math.round(pixel.oxygen / 2))
                        pixel.nutrition = (Math.round(pixel.nutrition / 2))
                        pixel.oxygen = (Math.round(pixel.oxygen / 2))
                    }
                    else {
                        createPixel("epidermis",x,y);
                        pixelMap[x][y].nutrition = (Math.round(pixel.nutrition / 2))
                        pixelMap[x][y].oxygen = (Math.round(pixel.oxygen / 2))
                        pixel.nutrition = (Math.round(pixel.nutrition / 2))
                        pixel.oxygen = (Math.round(pixel.oxygen / 2))
                    }
                }
            }
        }
        doDefaults(pixel);
        if ((Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 360,
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
        speed: 0,
    },
    isHair: true,
    isBio: true,
    movable: false,
}

elements.scales = {
	color: "#6b839a",
	category: "structural",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
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
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"dust"); 
                }
                else {
                    changePixel(pixel,"calcium"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.95) {
                    changePixel(pixel,"dust"); 
                }
                else {
                    changePixel(pixel,"calcium"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"dust"); 
                }
                else {
                    changePixel(pixel,"calcium"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
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
        speed: 0,
    },
    isBio: true,
    movable: false,
}

elements.scale_dermis = {
	color: "#CFA08B",
	category: "structural",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050)) && Math.random() < 0.005) {
            for (var i = 0; i < squareCoords.length; i++) {
                var coords = squareCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (isEmpty(x,y)) {
                    createPixel("scales",x,y);
                        pixelMap[x][y].nutrition = (Math.round(pixel.nutrition / 2))
                        pixelMap[x][y].oxygen = (Math.round(pixel.oxygen / 2))
                        pixel.nutrition = (Math.round(pixel.nutrition / 2))
                        pixel.oxygen = (Math.round(pixel.oxygen / 2))
                }
            }
        }
        doDefaults(pixel);
        if ((Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
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
        speed: 0,
    },
    isBio: true,
    movable: false,
}

elements.bug_dermis = {
	color: "#C6AD5B",
	category: "structural",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050)) && Math.random() < 0.005) {
            for (var i = 0; i < squareCoords.length; i++) {
                var coords = squareCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (isEmpty(x,y)) {
                    createPixel("exoskeleton",x,y);
                        pixelMap[x][y].nutrition = (Math.round(pixel.nutrition / 2))
                        pixelMap[x][y].oxygen = (Math.round(pixel.oxygen / 2))
                        pixel.nutrition = (Math.round(pixel.nutrition / 2))
                        pixel.oxygen = (Math.round(pixel.oxygen / 2))
                }
            }
        }
        doDefaults(pixel);
        if ((Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
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
        speed: 0,
    },
    isBio: true,
    movable: false,
}

elements.amphib_dermis = {
	color: "#9DAB6A",
	category: "structural",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050)) && Math.random() < 0.005) {
            for (var i = 0; i < squareCoords.length; i++) {
                var coords = squareCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (isEmpty(x,y)) {
                    createPixel("amphib_skin",x,y);
                    pixelMap[x][y].nutrition = (Math.round(pixel.nutrition - ((pixel.nutrition / 4) * 3)))
                    pixelMap[x][y].oxygen = (Math.round(pixel.oxygen - ((pixel.oxygen / 4) * 3)))
                    pixel.nutrition = (Math.round(pixel.nutrition - (pixel.nutrition / 4)))
                    pixel.oxygen = (Math.round(pixel.oxygen - (pixel.oxygen / 4)))
                }
            }
        }
        doDefaults(pixel);
        if ((Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
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
        speed: 0,
    },
    isBio: true,
    movable: false,
}

elements.acidic_flesh = {
	color: ["#946231","#976E30"],
	category: "structural",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else if (Math.random() < 0.5) {
                    changePixel(pixel,"cooked_meat"); 
                }
                else {
                    changePixel(pixel,"acid"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else if (Math.random() < 0.5) {
                    changePixel(pixel,"frozen_meat"); 
                }
                else {
                    changePixel(pixel,"acid"); 
                }
            }
            else {
                if (Math.random() < 0.95) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"acid"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: ["acid_gas","cooked_meat","cooked_meat","cooked_meat"],
    tempLow: -25,
    stateLow: ["frozen_meat","acid","acid"],
    burn: 5,
    burnTime: 350,
    burnInto: ["acid_gas","cooked_meat","cooked_meat"],
    breakInto: ["acid","acid","meat"],
	reactions: {
        "cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","acid","fat","meat","rotten_meat","cooked_meat"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
        speed: 0,
    },
    isBio: true,
    movable: false,
}

elements.slimey_flesh = {
	color: ["#8EA714","#96B013"],
	category: "structural",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else if (Math.random() < 0.5) {
                    changePixel(pixel,"cooked_meat"); 
                }
                else {
                    changePixel(pixel,"slime"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else if (Math.random() < 0.5) {
                    changePixel(pixel,"frozen_meat"); 
                }
                else {
                    changePixel(pixel,"slime"); 
                }
            }
            else {
                if (Math.random() < 0.95) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"slime"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: ["slime","cooked_meat","cooked_meat","cooked_meat"],
    tempLow: -25,
    stateLow: ["frozen_meat","slime_ice","slime_ice"],
    burn: 5,
    burnTime: 350,
    burnInto: ["slime","cooked_meat","cooked_meat"],
    breakInto: ["slime","slime","meat"],
	reactions: {
        "cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","slime","slime","meat","rotten_meat","cooked_meat"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
        speed: 0,
    },
    isBio: true,
    movable: false,
}

elements.cloak_flesh = {
	color: ["#879720","#8C9D1F"],
    grain: 0,
	category: "structural",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        doDefaults(pixel);
        if ((Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (pixel.color != hitPixel.color) {
                    hitPixel.color = pixel.color
                }
            }
            else if (elements[hitPixel.element].movable) {
                if (pixel.color != hitPixel.color) {
                    pixel.color = hitPixel.color
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (pixel.color != hitPixel.color) {
                    hitPixel.color = pixel.color
                }
            }
            else if (elements[hitPixel.element].movable) {
                if (pixel.color != hitPixel.color) {
                    pixel.color = hitPixel.color
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (pixel.color != hitPixel.color) {
                    hitPixel.color = pixel.color
                }
            }
            else if (elements[hitPixel.element].movable) {
                if (pixel.color != hitPixel.color) {
                    pixel.color = hitPixel.color
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (pixel.color != hitPixel.color) {
                    hitPixel.color = pixel.color
                }
            }
            else if (elements[hitPixel.element].movable) {
                if (pixel.color != hitPixel.color) {
                    pixel.color = hitPixel.color
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 4,
    burnTime: 350,
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
        speed: 0,
    },
    isBio: true,
    movable: false,
}

elements.adipose = {
	color: ["#C3A375","#B9945A"],
	category: "nutrition",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"grease"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"fat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"grease"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 1000
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
    burn: 10,
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
        "XX|SW:acid_vessel%1|XX",
        "SW:acid_vessel%1|XX|SW:acid_vessel%1",
        "XX|SW:acid_vessel%1|XX",
    ],
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.975 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            changePixel(pixel,"acid");
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
        speed: 0,
    },
    tempHigh: 175,
    stateHigh: ["acid_gas","acid_gas","acid_gas","cooked_meat","cooked_meat"],
    tempLow: -50,
    stateLow: "frozen_meat",
    burn: 20,
    burnTime: 160,
    burnInto: ["acid_gas","acid_gas","acid_gas","acid_gas","cooked_meat"],
    breakInto: "acid",
    category: "circulation",
    state: "solid",
    density: 1250,
    conduct: .001,
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
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.975 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"blood"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"blood"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.95) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"blood"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
        speed: 0,
    },
    tempHigh: 175,
    stateHigh: "meat",
    tempLow: -50,
    stateLow: "frozen_meat",
    burn: 20,
    burnTime: 160,
    burnInto: "meat",
    breakInto: ["meat","blood","blood",],
    category: "circulation",
    state: "solid",
    density: 1250,
    conduct: .001,
    movable: false,
    isBio: true,
}

elements.kidney = {
    color: ["#AB1354","#89212E","#74272E"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.975 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() > 0.9 && pixel.pee > 0) {
                    changePixel(pixel,"urine"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() > 0.9 && pixel.pee > 0) {
                    changePixel(pixel,"urine"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() > 0.9 && pixel.pee > 0) {
                    changePixel(pixel,"urine"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (hitPixel.pee < pixel.pee && elements[hitPixel.element].isKidney === true) {
                    hitPixel.pee += 1
                    pixel.pee -= 1
                }
                if (elements[hitPixel.element].isBlood === true && Math.random() < 0.025 && (hitPixel.speed < 1 || Math.random() < 0.00025) && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
                    hitPixel.speed++
                    pixel.pee += 1
                }
            }
        }
        else if (pixel.pee > 4 && Math.random() > 0.95) {
            if (Math.random() > 0.8) {
                createPixel("urine",pixel.x,pixel.y-1)
            }
            pixel.pee -= 5
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (hitPixel.pee < pixel.pee && elements[hitPixel.element].isKidney === true) {
                    hitPixel.pee += 1
                    pixel.pee -= 1
                }
                if (elements[hitPixel.element].isBlood === true && Math.random() < 0.025 && (hitPixel.speed < 1 || Math.random() < 0.00025) && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
                    hitPixel.speed++
                    pixel.pee += 1
                }
            }
        }
        else if (pixel.pee > 4 && Math.random() > 0.95) {
            if (Math.random() > 0.8) {
                createPixel("urine",pixel.x,pixel.y+1)
            }
            pixel.pee -= 5
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (hitPixel.pee < pixel.pee && elements[hitPixel.element].isKidney === true) {
                    hitPixel.pee += 1
                    pixel.pee -= 1
                }
                if (elements[hitPixel.element].isBlood === true && Math.random() < 0.025 && (hitPixel.speed < 1 || Math.random() < 0.00025) && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
                    hitPixel.speed++
                    pixel.pee += 1
                }
            }
        }
        else if (pixel.pee > 4 && Math.random() > 0.95) {
            if (Math.random() > 0.8) {
                createPixel("urine",pixel.x-1,pixel.y)
            }
            pixel.pee -= 5
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (hitPixel.pee < pixel.pee && elements[hitPixel.element].isKidney === true) {
                    hitPixel.pee += 1
                    pixel.pee -= 1
                }
                if (elements[hitPixel.element].isBlood === true && Math.random() < 0.025 && (hitPixel.speed < 1 || Math.random() < 0.00025) && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
                    hitPixel.speed++
                    pixel.pee += 1
                }
            }
        }
        else if (pixel.pee > 4 && Math.random() > 0.95) {
            if (Math.random() > 0.8) {
                createPixel("urine",pixel.x+1,pixel.y)
            }
            pixel.pee -= 5
        }
    },
    properties: {
        oxygen: 1000,
        nutrition: 1000,
        speed: 0,
        pee: 0,
    },
    renderer: function(pixel,ctx) {
        drawDefault(ctx,pixel);
        if (pixel.pee > 0) {
            drawSquare(ctx,"#E9BE3C",pixel.x,pixel.y,undefined,Math.min(0.8,pixel.pee/10));
        }
    },
    tempHigh: 175,
    stateHigh: "meat",
    tempLow: -50,
    stateLow: "frozen_meat",
    burn: 20,
    burnTime: 160,
    burnInto: "meat",
    breakInto: ["meat","urine","blood"],
    category: "circulation",
    state: "solid",
    density: 1250,
    conduct: .001,
    movable: false,
    isBio: true,
    isKidney: true,
}

elements.liver = {
    color: ["#6c2e1f","#7B2827","#702B27"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.975 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.90) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
        }
        if (pixel.speed < -1 && Math.random() < (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
            pixel.speed += 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
    },
    properties: {
        oxygen: 1000,
        nutrition: 1000,
        speed: 0,
    },
    tempHigh: 175,
    stateHigh: "meat",
    tempLow: -50,
    stateLow: "frozen_meat",
    burn: 20,
    burnTime: 160,
    burnInto: "meat",
    breakInto: ["meat","rotten_meat","blood",],
    category: "nutrition",
    state: "solid",
    density: 1250,
    conduct: .001,
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
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050)) && Math.random() < 0.001) {
            for (var i = 0; i < squareCoords.length; i++) {
                var coords = squareCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (isEmpty(x,y)) {
                    createPixel("flesh",x,y);
                }
            }
        }
        if (Math.random() > 0.975 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen--
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            changePixel(pixel,"blood");
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (elements[hitPixel.element].isBlood === true && pixel.heartAttached === true && hitPixel.heartAttached === false && Math.random() > 0.5) {
                    hitPixel.heartAttached = true
                }
            }
        }
        else if (isEmpty(pixel.x, pixel.y-1) && Math.random() > 0.75 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (elements[hitPixel.element].isBlood === true && pixel.heartAttached === true && hitPixel.heartAttached === false && Math.random() > 0.5) {
                    hitPixel.heartAttached = true
                }
            }
        }
        else if (isEmpty(pixel.x, pixel.y+1) && Math.random() > 0.75 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 2
                    pixel.speed -= 2
                }
                if (elements[hitPixel.element].isBlood === true && pixel.heartAttached === true && hitPixel.heartAttached === false && Math.random() > 0.5) {
                    hitPixel.heartAttached = true
                }
            }
        }
        else if (isEmpty(pixel.x-1, pixel.y) && Math.random() > 0.75 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (elements[hitPixel.element].isBlood === true && pixel.heartAttached === true && hitPixel.heartAttached === false && Math.random() > 0.5) {
                    hitPixel.heartAttached = true
                }
            }
        }
        else if (isEmpty(pixel.x+1, pixel.y) && Math.random() > 0.75 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
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
    burnTime: 160,
    burnInto: "meat",
    breakInto: "blood",
    category: "circulation",
    state: "solid",
    density: 1250,
    conduct: .001,
    movable: false,
    isBio: true,
    isBlood: true,
}

elements.infected_vessel = {
    color: "#BF0347",
    behavior: [
        "XX|SW:blood_vessel%1|XX",
        "SW:blood_vessel%1|XX|SW:blood_vessel%1",
        "XX|SW:blood_vessel%1|XX",
    ],
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050)) && Math.random() < 0.001) {
            for (var i = 0; i < squareCoords.length; i++) {
                var coords = squareCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (isEmpty(x,y)) {
                    createPixel("flesh",x,y);
                }
            }
        }
        if (Math.random() > 0.5 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition -= 5
            pixel.oxygen -= 5
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            changePixel(pixel,"infection");
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
                if (hitPixel.oxygen < pixel.oxygen) {
                    if (pixel.heartAttached === true) {
                        hitPixel.oxygen += 35
                        pixel.oxygen -= 40
                    }
                    else {
                        hitPixel.oxygen += 25
                        pixel.oxygen -= 30
                    }
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    if (pixel.heartAttached === true) {
                        hitPixel.nutrition += 30
                        pixel.nutrition -= 35
                    }
                    else {
                        hitPixel.nutrition += 20
                        pixel.nutrition -= 25
                    }
                }
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 2
                }
                if (elements[hitPixel.element].isBlood === true && Math.random() > 0.5) {
                    if (Math.random() > 0.95) {
                        changePixel(hitPixel,"infected_vessel")
                    }
                }
                if (elements[hitPixel.element].isBlood === true && pixel.heartAttached === true && hitPixel.heartAttached === false && Math.random() > 0.5) {
                    hitPixel.heartAttached = true
                }
            }
        }
        else if (isEmpty(pixel.x, pixel.y-1) && Math.random() > 0.75 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
            if (Math.random() > 0.95) {
                createPixel("infection",pixel.x,pixel.y-1)
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
                        pixel.oxygen -= 40
                    }
                    else {
                        hitPixel.oxygen += 25
                        pixel.oxygen -= 30
                    }
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    if (pixel.heartAttached === true) {
                        hitPixel.nutrition += 30
                        pixel.nutrition -= 35
                    }
                    else {
                        hitPixel.nutrition += 20
                        pixel.nutrition -= 25
                    }
                }
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 2
                }
                if (elements[hitPixel.element].isBlood === true && Math.random() > 0.5) {
                    if (Math.random() > 0.95) {
                        changePixel(hitPixel,"infected_vessel")
                    }
                }
                if (elements[hitPixel.element].isBlood === true && pixel.heartAttached === true && hitPixel.heartAttached === false && Math.random() > 0.5) {
                    hitPixel.heartAttached = true
                }
            }
        }
        else if (isEmpty(pixel.x, pixel.y+1) && Math.random() > 0.75 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
            if (Math.random() > 0.95) {
                createPixel("infection",pixel.x,pixel.y+1)
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
                        pixel.oxygen -= 40
                    }
                    else {
                        hitPixel.oxygen += 25
                        pixel.oxygen -= 30
                    }
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    if (pixel.heartAttached === true) {
                        hitPixel.nutrition += 30
                        pixel.nutrition -= 35
                    }
                    else {
                        hitPixel.nutrition += 20
                        pixel.nutrition -= 25
                    }
                }
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 2
                }
                if (elements[hitPixel.element].isBlood === true && Math.random() > 0.5) {
                    if (Math.random() > 0.95) {
                        changePixel(hitPixel,"infected_vessel")
                    }
                }
                if (elements[hitPixel.element].isBlood === true && pixel.heartAttached === true && hitPixel.heartAttached === false && Math.random() > 0.5) {
                    hitPixel.heartAttached = true
                }
            }
        }
        else if (isEmpty(pixel.x-1, pixel.y) && Math.random() > 0.75 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
            if (Math.random() > 0.95) {
                createPixel("infection",pixel.x-1,pixel.y)
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
                        pixel.oxygen -= 40
                    }
                    else {
                        hitPixel.oxygen += 25
                        pixel.oxygen -= 30
                    }
                }
                if (hitPixel.nutrition < pixel.nutrition) {
                    if (pixel.heartAttached === true) {
                        hitPixel.nutrition += 30
                        pixel.nutrition -= 35
                    }
                    else {
                        hitPixel.nutrition += 20
                        pixel.nutrition -= 25
                    }
                }
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 2
                }
                if (elements[hitPixel.element].isBlood === true && Math.random() > 0.5) {
                    if (Math.random() > 0.95) {
                        changePixel(hitPixel,"infected_vessel")
                    }
                }
                if (elements[hitPixel.element].isBlood === true && pixel.heartAttached === true && hitPixel.heartAttached === false && Math.random() > 0.5) {
                    hitPixel.heartAttached = true
                }
            }
        }
        else if (isEmpty(pixel.x+1, pixel.y) && Math.random() > 0.75 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
            if (Math.random() > 0.95) {
                createPixel("infection",pixel.x+1,pixel.y)
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
    reactions: {
		"bless": { elem1:"blood_vessel"  },
	},
    tempHigh: 175,
    stateHigh: "meat",
    tempLow: -50,
    stateLow: "frozen_meat",
    burn: 20,
    burnTime: 160,
    burnInto: "meat",
    breakInto: "blood",
    category: "circulation",
    state: "solid",
    density: 1250,
    conduct: .001,
    movable: false,
    isBio: true,
    isBlood: true,
}

elements.white_blood_cell = {
    color: "#F5D7D4",
    behavior: [
        "XX|SW:blood_vessel%1|XX",
        "SW:blood_vessel%1 AND M2%10|XX|SW:blood_vessel%1 AND M2%10",
        "M2|SW:blood_vessel%1 AND M1|M2",
    ],
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > 0.975 && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            changePixel(pixel,"blood");
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
        }
        if (Math.random() > 0.995 && Math.random() < (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050)) || Math.random() > 0.9995) {
            changePixel(pixel,"blood_vessel");
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (elements[hitPixel.element].isBlood === true && Math.random() > 0.25) {
                    if (elements[hitPixel.element].id === elements.infected_vessel.id) {
                        changePixel(hitPixel,"blood_vessel")
                    }
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (elements[hitPixel.element].isBlood === true && Math.random() > 0.25) {
                    if (elements[hitPixel.element].id === elements.infected_vessel.id) {
                        changePixel(hitPixel,"blood_vessel")
                    }
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (elements[hitPixel.element].isBlood === true && Math.random() > 0.25) {
                    if (elements[hitPixel.element].id === elements.infected_vessel.id) {
                        changePixel(hitPixel,"blood_vessel")
                    }
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (elements[hitPixel.element].isBlood === true && Math.random() > 0.25) {
                    if (elements[hitPixel.element].id === elements.infected_vessel.id) {
                        changePixel(hitPixel,"blood_vessel")
                    }
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
		"cancer": { elem2:"flesh", chance:0.10  },
        "infected_vessel": { elem2:"blood_vessel", chance:0.10  },
        "plague": { elem2:null, chance:0.10  },
        "rotten_meat": { elem2:"flesh", chance:0.10 },
	},
    tempHigh: 175,
    stateHigh: "meat",
    tempLow: -50,
    stateLow: "frozen_meat",
    burn: 20,
    burnTime: 160,
    burnInto: "meat",
    breakInto: "blood",
    category: "circulation",
    state: "solid",
    density: 1250,
    conduct: .001,
    movable: false,
    isBio: true,
    isBlood: true,
}

elements.eye = {
	color: "#451800",
	category: "nervous system",
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
        if ((Math.random() > 0.895 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (Math.random() < 0.95) {
                changePixel(pixel,"meat"); 
            }
            else {
                changePixel(pixel,"salt_water"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            doElectricity(hitPixel);
            if (elements[hitPixel.element].id === elements.light.id) {
                pixel.saw = true
            }
            else if (pixel.saw === true && elements[hitPixel.element].id === elements.nerve.id && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            doElectricity(hitPixel);
            if (elements[hitPixel.element].id === elements.light.id && Math.random() > 0.5) {
                pixel.saw = true
            }
            else if (pixel.saw === true && elements[hitPixel.element].id === elements.nerve.id && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            doElectricity(hitPixel);
            if (elements[hitPixel.element].id === elements.light.id && Math.random() > 0.5) {
                pixel.saw = true
            }
            else if (pixel.saw === true && elements[hitPixel.element].id === elements.nerve.id && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            doElectricity(hitPixel);
            if (elements[hitPixel.element].id === elements.light.id && Math.random() > 0.5) {
                pixel.saw = true
            }
            else if (pixel.saw === true && elements[hitPixel.element].id === elements.nerve.id && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
        if (pixel.saw === true && Math.random() > 0.8) {
            pixel.saw = false
        }
    },
    density: 2710,
    state: "solid",
    tempHigh: 200,
    stateHigh: ["cooked_meat","salt_water","blood"],
    tempLow: -25,
    stateLow: ["salt_water","cerebrospinal_fluid","salt_water","blood","frozen_meat"],
    burn: 5,
    burnTime: 350,
    conduct: .001,
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

elements.olfactory_bulb = {
	color: "#8A7650",
	category: "nervous system",
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
        if ((Math.random() > 0.895 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (Math.random() < 0.85) {
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
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            doElectricity(hitPixel);
            if ((elements[hitPixel.element].id === elements.smoke.id || elements[hitPixel.element].id === elements.stench.id || elements[hitPixel.element].id === elements.fragrance.id || elements[hitPixel.element].id === elements.methane.id || elements[hitPixel.element].id === elements.ammonia.id) && Math.random() > 0.5) {
                pixel.smell = true
                deletePixel(hitPixel.x,hitPixel.y)
            }
            else if ((elements[hitPixel.element].id === elements.chlorine.id || elements[hitPixel.element].id === elements.poison_gas.id || elements[hitPixel.element].id === elements.acid_gas.id || elements[hitPixel.element].id === elements.cyanide_gas.id || elements[hitPixel.element].id === elements.dioxin.id) && Math.random() > 0.5) {
                pixel.smell = true
                deletePixel(hitPixel.x,hitPixel.y)
                pixel.oxygen -= 50
                pixel.nutrition -= 50
            }
            else if (pixel.smell === true && elements[hitPixel.element].id === elements.nerve.id && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
                if (!hitPixel.charge) {
                    hitPixel.charge = 0.1
                }
                else if (hitPixel.charge) {
                    hitPixel.charge += 0.1
                }
                pixel.smell = false
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
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
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            doElectricity(hitPixel);
            if ((elements[hitPixel.element].id === elements.smoke.id || elements[hitPixel.element].id === elements.stench.id || elements[hitPixel.element].id === elements.fragrance.id || elements[hitPixel.element].id === elements.methane.id || elements[hitPixel.element].id === elements.ammonia.id) && Math.random() > 0.5) {
                pixel.smell = true
                deletePixel(hitPixel.x,hitPixel.y)
            }
            else if ((elements[hitPixel.element].id === elements.chlorine.id || elements[hitPixel.element].id === elements.poison_gas.id  || elements[hitPixel.element].id === elements.acid_gas.id || elements[hitPixel.element].id === elements.cyanide_gas.id || elements[hitPixel.element].id === elements.dioxin.id) && Math.random() > 0.5) {
                pixel.smell = true
                deletePixel(hitPixel.x,hitPixel.y)
                pixel.oxygen -= 50
                pixel.nutrition -= 50
            }
            else if (pixel.smell === true && elements[hitPixel.element].id === elements.nerve.id && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
                if (!hitPixel.charge) {
                    hitPixel.charge = 0.1
                }
                else if (hitPixel.charge) {
                    hitPixel.charge += 0.1
                }
                pixel.smell = false
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
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
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            doElectricity(hitPixel);
            if ((elements[hitPixel.element].id === elements.smoke.id || elements[hitPixel.element].id === elements.stench.id || elements[hitPixel.element].id === elements.fragrance.id || elements[hitPixel.element].id === elements.methane.id || elements[hitPixel.element].id === elements.ammonia.id) && Math.random() > 0.5) {
                pixel.smell = true
                deletePixel(hitPixel.x,hitPixel.y)
            }
            else if ((elements[hitPixel.element].id === elements.chlorine.id || elements[hitPixel.element].id === elements.poison_gas.id  || elements[hitPixel.element].id === elements.acid_gas.id || elements[hitPixel.element].id === elements.cyanide_gas.id || elements[hitPixel.element].id === elements.dioxin.id) && Math.random() > 0.5) {
                pixel.smell = true
                deletePixel(hitPixel.x,hitPixel.y)
                pixel.oxygen -= 50
                pixel.nutrition -= 50
            }
            else if (pixel.smell === true && elements[hitPixel.element].id === elements.nerve.id && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
                if (!hitPixel.charge) {
                    hitPixel.charge = 0.1
                }
                else if (hitPixel.charge) {
                    hitPixel.charge += 0.1
                }
                pixel.smell = false
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
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
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            doElectricity(hitPixel);
            if ((elements[hitPixel.element].id === elements.smoke.id || elements[hitPixel.element].id === elements.stench.id || elements[hitPixel.element].id === elements.fragrance.id || elements[hitPixel.element].id === elements.methane.id || elements[hitPixel.element].id === elements.ammonia.id) && Math.random() > 0.5) {
                pixel.smell = true
                deletePixel(hitPixel.x,hitPixel.y)
            }
            else if ((elements[hitPixel.element].id === elements.chlorine.id || elements[hitPixel.element].id === elements.poison_gas.id  || elements[hitPixel.element].id === elements.acid_gas.id || elements[hitPixel.element].id === elements.cyanide_gas.id || elements[hitPixel.element].id === elements.dioxin.id) && Math.random() > 0.5) {
                pixel.smell = true
                deletePixel(hitPixel.x,hitPixel.y)
                pixel.oxygen -= 50
                pixel.nutrition -= 50
            }
            else if (pixel.smell === true && elements[hitPixel.element].id === elements.nerve.id && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
                if (!hitPixel.charge) {
                    hitPixel.charge = 0.1
                }
                else if (hitPixel.charge) {
                    hitPixel.charge += 0.1
                }
                pixel.smell = false
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
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
        if (pixel.smell === true && Math.random() > 0.8) {
            pixel.smell = false
        }
    },
    density: 2710,
    state: "solid",
    tempHigh: 200,
    stateHigh: ["cooked_meat","slime","blood"],
    tempLow: -25,
    stateLow: ["slime","slime","blood","frozen_meat"],
    burn: 5,
    burnTime: 350,
    conduct: .001,
    burnInto: ["cooked_meat","slime","blood"],
    breakInto: ["blood","blood","meat","meat","slime","slime","slime","meat"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","steam","slime","ash","slime","slime","meat","rotten_meat","cooked_meat","flesh"], chance:0.5 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
        smell: false,
    },
    isBio: true,
    movable: false,
}

elements.taste_bud = {
	color: "#DB6767",
	category: "nervous system",
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
        if ((Math.random() > 0.895 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen--
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (Math.random() < 0.95) {
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
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            doElectricity(hitPixel);
            if ((
                elements[hitPixel.element].id === elements.sugar.id || elements[hitPixel.element].id === elements.salt.id || elements[hitPixel.element].id === elements.grease.id || elements[hitPixel.element].id === elements.cooked_meat.id || elements[hitPixel.element].id === elements.chocolate.id || elements[hitPixel.element].id === elements.chocolate_powder.id || elements[hitPixel.element].id === elements.cheese.id || elements[hitPixel.element].id === elements.cheese_powder.id || elements[hitPixel.element].id === elements.pickle.id || elements[hitPixel.element].id === elements.herb.id || elements[hitPixel.element].id === elements.juice.id || elements[hitPixel.element].id === elements.gingerbread.id || elements[hitPixel.element].id === elements.ketchup.id || elements[hitPixel.element].id === elements.mayo.id || elements[hitPixel.element].id === elements.sauce.id || elements[hitPixel.element].id === elements.chocolate_milk.id || elements[hitPixel.element].id === elements.grape.id  || elements[hitPixel.element].id === elements.pilk.id || elements[hitPixel.element].id === elements.fruit_milk.id || elements[hitPixel.element].id === elements.nut_milk.id || elements[hitPixel.element].id === elements.soda.id || elements[hitPixel.element].id === elements.sugar_water.id
            ) && Math.random() > 0.5 && hitPixel.tasted != true) {
                pixel.taste = true
                if (Math.random() > 0.5) {
                hitPixel.tasted = false
                }
            }
            else if ((elements[hitPixel.element].id === elements.alcohol.id || elements[hitPixel.element].id === elements.rotten_cheese.id || elements[hitPixel.element].id === elements.rotten_meat.id || elements[hitPixel.element].id === elements.pool_water.id || elements[hitPixel.element].id === elements.poison.id || elements[hitPixel.element].id === elements.bleach.id || elements[hitPixel.element].id === elements.cyanide.id || elements[hitPixel.element].id === elements.infection.id) && Math.random() > 0.5) {
                pixel.taste = true
                if (Math.random() > 0.5) {
                    hitPixel.tasted = false
                }
                pixel.oxygen--
                pixel.nutrition--
            }
            else if (pixel.taste === true && elements[hitPixel.element].id === elements.nerve.id && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
                if (!hitPixel.charge) {
                    hitPixel.charge = 0.1
                }
                else if (hitPixel.charge) {
                    hitPixel.charge += 0.1
                }
                pixel.taste = false
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
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
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            doElectricity(hitPixel);
            if ((
                elements[hitPixel.element].id === elements.sugar.id || elements[hitPixel.element].id === elements.salt.id || elements[hitPixel.element].id === elements.grease.id || elements[hitPixel.element].id === elements.cooked_meat.id || elements[hitPixel.element].id === elements.chocolate.id || elements[hitPixel.element].id === elements.chocolate_powder.id || elements[hitPixel.element].id === elements.cheese.id || elements[hitPixel.element].id === elements.cheese_powder.id || elements[hitPixel.element].id === elements.pickle.id || elements[hitPixel.element].id === elements.herb.id || elements[hitPixel.element].id === elements.juice.id || elements[hitPixel.element].id === elements.gingerbread.id || elements[hitPixel.element].id === elements.ketchup.id || elements[hitPixel.element].id === elements.mayo.id || elements[hitPixel.element].id === elements.sauce.id || elements[hitPixel.element].id === elements.chocolate_milk.id || elements[hitPixel.element].id === elements.grape.id  || elements[hitPixel.element].id === elements.pilk.id || elements[hitPixel.element].id === elements.fruit_milk.id || elements[hitPixel.element].id === elements.nut_milk.id || elements[hitPixel.element].id === elements.soda.id || elements[hitPixel.element].id === elements.sugar_water.id
            ) && Math.random() > 0.5 && hitPixel.tasted != true) {
                pixel.taste = true
                if (Math.random() > 0.5) {
                hitPixel.tasted = false
                }
            }
            else if ((elements[hitPixel.element].id === elements.alcohol.id || elements[hitPixel.element].id === elements.rotten_cheese.id || elements[hitPixel.element].id === elements.rotten_meat.id || elements[hitPixel.element].id === elements.pool_water.id || elements[hitPixel.element].id === elements.poison.id || elements[hitPixel.element].id === elements.bleach.id || elements[hitPixel.element].id === elements.cyanide.id || elements[hitPixel.element].id === elements.infection.id) && Math.random() > 0.5) {
                pixel.taste = true
                if (Math.random() > 0.5) {
                    hitPixel.tasted = false
                }
                pixel.oxygen--
                pixel.nutrition--
            }
            else if (pixel.taste === true && elements[hitPixel.element].id === elements.nerve.id && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
                if (!hitPixel.charge) {
                    hitPixel.charge = 0.1
                }
                else if (hitPixel.charge) {
                    hitPixel.charge += 0.1
                }
                pixel.taste = false
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
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
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            doElectricity(hitPixel);
            if ((
                elements[hitPixel.element].id === elements.sugar.id || elements[hitPixel.element].id === elements.salt.id || elements[hitPixel.element].id === elements.grease.id || elements[hitPixel.element].id === elements.cooked_meat.id || elements[hitPixel.element].id === elements.chocolate.id || elements[hitPixel.element].id === elements.chocolate_powder.id || elements[hitPixel.element].id === elements.cheese.id || elements[hitPixel.element].id === elements.cheese_powder.id || elements[hitPixel.element].id === elements.pickle.id || elements[hitPixel.element].id === elements.herb.id || elements[hitPixel.element].id === elements.juice.id || elements[hitPixel.element].id === elements.gingerbread.id || elements[hitPixel.element].id === elements.ketchup.id || elements[hitPixel.element].id === elements.mayo.id || elements[hitPixel.element].id === elements.sauce.id || elements[hitPixel.element].id === elements.chocolate_milk.id || elements[hitPixel.element].id === elements.grape.id  || elements[hitPixel.element].id === elements.pilk.id || elements[hitPixel.element].id === elements.fruit_milk.id || elements[hitPixel.element].id === elements.nut_milk.id || elements[hitPixel.element].id === elements.soda.id || elements[hitPixel.element].id === elements.sugar_water.id
            ) && Math.random() > 0.5 && hitPixel.tasted != true) {
                pixel.taste = true
                if (Math.random() > 0.5) {
                hitPixel.tasted = false
                }
            }
            else if ((elements[hitPixel.element].id === elements.alcohol.id || elements[hitPixel.element].id === elements.rotten_cheese.id || elements[hitPixel.element].id === elements.rotten_meat.id || elements[hitPixel.element].id === elements.pool_water.id || elements[hitPixel.element].id === elements.poison.id || elements[hitPixel.element].id === elements.bleach.id || elements[hitPixel.element].id === elements.cyanide.id || elements[hitPixel.element].id === elements.infection.id) && Math.random() > 0.5) {
                pixel.taste = true
                if (Math.random() > 0.5) {
                    hitPixel.tasted = false
                }
                pixel.oxygen--
                pixel.nutrition--
            }
            else if (pixel.taste === true && elements[hitPixel.element].id === elements.nerve.id && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
                if (!hitPixel.charge) {
                    hitPixel.charge = 0.1
                }
                else if (hitPixel.charge) {
                    hitPixel.charge += 0.1
                }
                pixel.taste = false
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
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
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            doElectricity(hitPixel);
            if ((
                elements[hitPixel.element].id === elements.sugar.id || elements[hitPixel.element].id === elements.salt.id || elements[hitPixel.element].id === elements.grease.id || elements[hitPixel.element].id === elements.cooked_meat.id || elements[hitPixel.element].id === elements.chocolate.id || elements[hitPixel.element].id === elements.chocolate_powder.id || elements[hitPixel.element].id === elements.cheese.id || elements[hitPixel.element].id === elements.cheese_powder.id || elements[hitPixel.element].id === elements.pickle.id || elements[hitPixel.element].id === elements.herb.id || elements[hitPixel.element].id === elements.juice.id || elements[hitPixel.element].id === elements.gingerbread.id || elements[hitPixel.element].id === elements.ketchup.id || elements[hitPixel.element].id === elements.mayo.id || elements[hitPixel.element].id === elements.sauce.id || elements[hitPixel.element].id === elements.chocolate_milk.id || elements[hitPixel.element].id === elements.grape.id  || elements[hitPixel.element].id === elements.pilk.id || elements[hitPixel.element].id === elements.fruit_milk.id || elements[hitPixel.element].id === elements.nut_milk.id || elements[hitPixel.element].id === elements.soda.id || elements[hitPixel.element].id === elements.sugar_water.id
            ) && Math.random() > 0.5 && hitPixel.tasted != true) {
                pixel.taste = true
                if (Math.random() > 0.5) {
                hitPixel.tasted = false
                }
            }
            else if ((elements[hitPixel.element].id === elements.alcohol.id || elements[hitPixel.element].id === elements.rotten_cheese.id || elements[hitPixel.element].id === elements.rotten_meat.id || elements[hitPixel.element].id === elements.pool_water.id || elements[hitPixel.element].id === elements.poison.id || elements[hitPixel.element].id === elements.bleach.id || elements[hitPixel.element].id === elements.cyanide.id || elements[hitPixel.element].id === elements.infection.id) && Math.random() > 0.5) {
                pixel.taste = true
                if (Math.random() > 0.5) {
                    hitPixel.tasted = false
                }
                pixel.oxygen--
                pixel.nutrition--
            }
            else if (pixel.taste === true && elements[hitPixel.element].id === elements.nerve.id && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
                if (!hitPixel.charge) {
                    hitPixel.charge = 0.1
                }
                else if (hitPixel.charge) {
                    hitPixel.charge += 0.1
                }
                pixel.taste = false
            }
            else if (elements[hitPixel.element].isBio === true && Math.random() > 0.5) {
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
        if (pixel.taste === true && Math.random() > 0.8) {
            pixel.taste = false
        }
    },
    density: 2710,
    state: "solid",
    tempHigh: 200,
    stateHigh: ["cooked_meat","meat","blood"],
    tempLow: -25,
    stateLow: ["meat","blood","blood","frozen_meat"],
    burn: 5,
    burnTime: 350,
    conduct: .001,
    burnInto: ["cooked_meat","meat","blood"],
    breakInto: ["blood","blood","meat","meat","meat","meat","blood","meat"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","ash","meat","rotten_meat","cooked_meat","flesh"], chance:0.5 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
        taste: false,
    },
    isBio: true,
    movable: false,
}

elements.brain = {
	color: ["#fce3e3","#deb6c5","#f5ced5","#e87b8f"],
	category: "nervous system",
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
        if ((Math.random() > 0.85 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
        }
        if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            doElectricity(hitPixel);
            if (elements[hitPixel.element].id === elements.nerve.id && Math.random() > 0.75 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
                pixel.chargeCD = 16
                hitPixel.charge = 0.5
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            doElectricity(hitPixel);
            if (elements[hitPixel.element].id === elements.nerve.id && Math.random() > 0.75 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
                pixel.chargeCD = 16
                hitPixel.charge = 0.5
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            doElectricity(hitPixel);
            if (elements[hitPixel.element].id === elements.nerve.id && Math.random() > 0.75 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
                pixel.chargeCD = 16
                hitPixel.charge = 0.5
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            doElectricity(hitPixel);
            if (elements[hitPixel.element].id === elements.nerve.id && Math.random() > 0.75 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
                pixel.chargeCD = 16
                hitPixel.charge = 0.5
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
        if (pixel.charge) { 
            pixel.charge = 0;
            pixel.chargeCD = 16; 
        }
    },
    density: 2710,
    state: "solid",
    conduct: 1,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
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
        speed: 0,
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
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
        if (Math.random() > 0.895 && pixel.nutrition > 0 && pixel.oxygen > 0 || pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) {
            pixel.nutrition--
            pixel.oxygen--
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
        if (pixel.temp > 25) { pixel.temp -= 10; }
        else if (pixel.temp < 15) { pixel.temp += 10; }
        if (pixel.charge) { 
            pixel.charge = 0;
            pixel.chargeCD = 16; 
        }
    },
    density: 2710,
    state: "solid",
    conduct: 1,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
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
        speed: 0,
    },
    isBio: true,
    movable: false,
}

elements.nerve = {
	color: "#B33E93",
	category: "nervous system",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        doDefaults(pixel);
        if ((Math.random() > 0.895 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: 1,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
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
        speed: 0,
    },
    isBio: true,
    movable: false,
}

elements.throat_lining = {
	color: "#bc6157",
	category: "nutrition",
    behavior: [
        "XX|DL:stomach_acid,explosive_acid,decomposer_acid,carni_acid,herbi_acid%5|XX",
        "DL:stomach_acid,explosive_acid,decomposer_acid,carni_acid,herbi_acid%5|XX|DL:stomach_acid,explosive_acid,decomposer_acid,carni_acid,herbi_acid%5",
        "XX|DL:stomach_acid,explosive_acid,decomposer_acid,carni_acid,herbi_acid%5|XX",
    ],
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.l || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
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
        speed: 0,
    },
    isBio: true,
    movable: false,
}

elements.intestines = {
	color: "#bc6157",
	category: "nutrition",
    behavior: behaviors.WALL,
	hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
        }
		if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].id === elements.digested_material.id && Math.random() > 0.99) {
                if (Math.random() > 0.5) {
            		changePixel(hitPixel,"poop"); 
	            }
		        else {
            		changePixel(hitPixel,"stench"); 
	            }
                pixel.nutrition += hitPixel.nutrition;
                hitPixel.nutrition = 0;
                pixel.speed += hitPixel.speed;
                hitPixel.speed = 0;
            }
            else if (elements[hitPixel.element].id === elements.gaseous_material.id && Math.random() > 0.99) {
                changePixel(hitPixel,"stench");
                pixel.nutrition += hitPixel.nutrition;
                hitPixel.nutrition = 0;
                pixel.speed += hitPixel.speed;
                hitPixel.speed = 0;
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].id === elements.digested_material.id && Math.random() > 0.99) {
                if (Math.random() > 0.5) {
            		changePixel(hitPixel,"poop"); 
	            }
		        else {
            		changePixel(hitPixel,"stench"); 
	            }
                pixel.nutrition += hitPixel.nutrition;
                hitPixel.nutrition = 0;
                pixel.speed += hitPixel.speed;
                hitPixel.speed = 0;
            }
            else if (elements[hitPixel.element].id === elements.gaseous_material.id && Math.random() > 0.99) {
                changePixel(hitPixel,"stench");
                pixel.nutrition += hitPixel.nutrition;
                hitPixel.nutrition = 0;
                pixel.speed += hitPixel.speed;
                hitPixel.speed = 0;
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].id === elements.digested_material.id && Math.random() > 0.99) {
                if (Math.random() > 0.5) {
            		changePixel(hitPixel,"poop"); 
	            }
		        else {
            		changePixel(hitPixel,"stench"); 
	            }
                pixel.nutrition += hitPixel.nutrition;
                hitPixel.nutrition = 0;
                pixel.speed += hitPixel.speed;
                hitPixel.speed = 0;
            }
            else if (elements[hitPixel.element].id === elements.gaseous_material.id && Math.random() > 0.99) {
                changePixel(hitPixel,"stench");
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
        if (!isEmpty(pixel.x+1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x+1][pixel.y]
            if (elements[hitPixel.element].id === elements.digested_material.id && Math.random() > 0.99) {
                if (Math.random() > 0.5) {
            		changePixel(hitPixel,"poop"); 
	            }
		        else {
            		changePixel(hitPixel,"stench"); 
	            }
                pixel.nutrition += hitPixel.nutrition;
                hitPixel.nutrition = 0;
                pixel.speed += hitPixel.speed;
                hitPixel.speed = 0;
            }
            else if (elements[hitPixel.element].id === elements.gaseous_material.id && Math.random() > 0.99) {
                changePixel(hitPixel,"stench");
                pixel.nutrition += hitPixel.nutrition;
                hitPixel.nutrition = 0;
                pixel.speed += hitPixel.speed;
                hitPixel.speed = 0;
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
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
        speed: 0,
    },
    movable: false,
    isBio: true
}

elements.appendix = {
	color: "#B45942",
	category: "nutrition",
    behavior: behaviors.WALL,
	hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
            if (Math.random() > 0.999 && (pixel.nutrition < 750 || pixel.oxygen < 500)) {
                changePixel(pixel,"stomach_acid");
            }
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else if (Math.random() < 0.75) {
                    changePixel(pixel,"cooked_meat"); 
                }
                else {
                    changePixel(pixel,"stomach_acid"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else if (Math.random() < 0.75) {
                    changePixel(pixel,"frozen_meat"); 
                }
                else {
                    changePixel(pixel,"stomach_acid"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else if (Math.random() < 0.75) {
                    changePixel(pixel,"rotten_meat"); 
                }
                else {
                    changePixel(pixel,"stomach_acid"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
        }
		if (!isEmpty(pixel.x, pixel.y-1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y-1]
            if (elements[hitPixel.element].id === elements.digested_material.id && Math.random() > 0.999) {
                changePixel(hitPixel,"poop");
                pixel.nutrition += hitPixel.nutrition
                if (Math.random() > 0.99) {
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y+1]
            if (elements[hitPixel.element].id === elements.digested_material.id && Math.random() > 0.999) {
                changePixel(hitPixel,"poop");
                pixel.nutrition += hitPixel.nutrition
                if (Math.random() > 0.99) {
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
        if (!isEmpty(pixel.x-1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x-1][pixel.y]
            if (elements[hitPixel.element].id === elements.digested_material.id && Math.random() > 0.999) {
                changePixel(hitPixel,"poop");
                pixel.nutrition += hitPixel.nutrition
                if (Math.random() > 0.99) {
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
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
        speed: 0,
    },
    movable: false,
    isBio: true
}

elements.simple_lung = {
	color: "#EB85D9",
	category: "oxygen",
    behavior: behaviors.WALL,
	hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        for (var i = 0; i < squareCoords.length; i++) {
            var x = pixel.x+squareCoords[i][0];
            var y = pixel.y+squareCoords[i][1];
            if (isEmpty(x,y)) {
                if (Math.random() < 0.01) { pixel.oxygen += 100 }
                break
            } } 
        if ((Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
            else if ((elements[hitPixel.element].id === elements.chlorine.id || elements[hitPixel.element].id === elements.poison_gas.id  || elements[hitPixel.element].id === elements.acid_gas.id || elements[hitPixel.element].id === elements.cyanide_gas.id || elements[hitPixel.element].id === elements.dioxin.id) && Math.random() > 0.5) {
                pixel.smell = true
                deletePixel(hitPixel.x,hitPixel.y)
                pixel.oxygen -= 50
                pixel.nutrition -= 50
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
            else if ((elements[hitPixel.element].id === elements.chlorine.id || elements[hitPixel.element].id === elements.poison_gas.id  || elements[hitPixel.element].id === elements.acid_gas.id || elements[hitPixel.element].id === elements.cyanide_gas.id || elements[hitPixel.element].id === elements.dioxin.id) && Math.random() > 0.5) {
                pixel.smell = true
                deletePixel(hitPixel.x,hitPixel.y)
                pixel.oxygen -= 50
                pixel.nutrition -= 50
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
            else if ((elements[hitPixel.element].id === elements.chlorine.id || elements[hitPixel.element].id === elements.poison_gas.id  || elements[hitPixel.element].id === elements.acid_gas.id || elements[hitPixel.element].id === elements.cyanide_gas.id || elements[hitPixel.element].id === elements.dioxin.id) && Math.random() > 0.5) {
                pixel.smell = true
                deletePixel(hitPixel.x,hitPixel.y)
                pixel.oxygen -= 50
                pixel.nutrition -= 50
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
            else if ((elements[hitPixel.element].id === elements.chlorine.id || elements[hitPixel.element].id === elements.poison_gas.id  || elements[hitPixel.element].id === elements.acid_gas.id || elements[hitPixel.element].id === elements.cyanide_gas.id || elements[hitPixel.element].id === elements.dioxin.id) && Math.random() > 0.5) {
                pixel.smell = true
                deletePixel(hitPixel.x,hitPixel.y)
                pixel.oxygen -= 50
                pixel.nutrition -= 50
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
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
        speed: 0,
    },
    movable: false,
    isBio: true
}

elements.lungs = {
	color: "#d4aaab",
	category: "oxygen",
    behavior: behaviors.WALL,
	hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
            else if ((elements[hitPixel.element].id === elements.chlorine.id || elements[hitPixel.element].id === elements.poison_gas.id  || elements[hitPixel.element].id === elements.acid_gas.id || elements[hitPixel.element].id === elements.cyanide_gas.id || elements[hitPixel.element].id === elements.dioxin.id) && Math.random() > 0.5) {
                pixel.smell = true
                deletePixel(hitPixel.x,hitPixel.y)
                pixel.oxygen -= 50
                pixel.nutrition -= 50
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
            else if ((elements[hitPixel.element].id === elements.chlorine.id || elements[hitPixel.element].id === elements.poison_gas.id  || elements[hitPixel.element].id === elements.acid_gas.id || elements[hitPixel.element].id === elements.cyanide_gas.id || elements[hitPixel.element].id === elements.dioxin.id) && Math.random() > 0.5) {
                pixel.smell = true
                deletePixel(hitPixel.x,hitPixel.y)
                pixel.oxygen -= 50
                pixel.nutrition -= 50
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
            else if ((elements[hitPixel.element].id === elements.chlorine.id || elements[hitPixel.element].id === elements.poison_gas.id  || elements[hitPixel.element].id === elements.acid_gas.id || elements[hitPixel.element].id === elements.cyanide_gas.id || elements[hitPixel.element].id === elements.dioxin.id) && Math.random() > 0.5) {
                pixel.smell = true
                deletePixel(hitPixel.x,hitPixel.y)
                pixel.oxygen -= 50
                pixel.nutrition -= 50
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
            else if ((elements[hitPixel.element].id === elements.chlorine.id || elements[hitPixel.element].id === elements.poison_gas.id  || elements[hitPixel.element].id === elements.acid_gas.id || elements[hitPixel.element].id === elements.cyanide_gas.id || elements[hitPixel.element].id === elements.dioxin.id) && Math.random() > 0.5) {
                pixel.smell = true
                deletePixel(hitPixel.x,hitPixel.y)
                pixel.oxygen -= 50
                pixel.nutrition -= 50
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
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
        speed: 0,
    },
    movable: false,
    isBio: true
}

elements.amphib_skin = {
	color: "#7E9C33",
	category: "oxygen",
    behavior: [
        "XX|CR:slime%0.001|XX",
        "CR:slime%0.001|XX|CR:slime%0.001",
        "XX|CR:slime%0.001|XX",
    ],
	hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((pixel.temp > 35 || pixel.temp < 10) && Math.random() < 0.005) {
            for (var i = 0; i < squareCoords.length; i++) {
                var coords = squareCoords[i];
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
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
            else if ((elements[hitPixel.element].id === elements.chlorine.id || elements[hitPixel.element].id === elements.poison_gas.id  || elements[hitPixel.element].id === elements.acid_gas.id || elements[hitPixel.element].id === elements.cyanide_gas.id || elements[hitPixel.element].id === elements.dioxin.id) && Math.random() > 0.5) {
                pixel.smell = true
                deletePixel(hitPixel.x,hitPixel.y)
                pixel.oxygen -= 50
                pixel.nutrition -= 50
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
            else if ((elements[hitPixel.element].id === elements.chlorine.id || elements[hitPixel.element].id === elements.poison_gas.id  || elements[hitPixel.element].id === elements.acid_gas.id || elements[hitPixel.element].id === elements.cyanide_gas.id || elements[hitPixel.element].id === elements.dioxin.id) && Math.random() > 0.5) {
                pixel.smell = true
                deletePixel(hitPixel.x,hitPixel.y)
                pixel.oxygen -= 50
                pixel.nutrition -= 50
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
            else if ((elements[hitPixel.element].id === elements.chlorine.id || elements[hitPixel.element].id === elements.poison_gas.id  || elements[hitPixel.element].id === elements.acid_gas.id || elements[hitPixel.element].id === elements.cyanide_gas.id || elements[hitPixel.element].id === elements.dioxin.id) && Math.random() > 0.5) {
                pixel.smell = true
                deletePixel(hitPixel.x,hitPixel.y)
                pixel.oxygen -= 50
                pixel.nutrition -= 50
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
            else if ((elements[hitPixel.element].id === elements.chlorine.id || elements[hitPixel.element].id === elements.poison_gas.id  || elements[hitPixel.element].id === elements.acid_gas.id || elements[hitPixel.element].id === elements.cyanide_gas.id || elements[hitPixel.element].id === elements.dioxin.id) && Math.random() > 0.5) {
                pixel.smell = true
                deletePixel(hitPixel.x,hitPixel.y)
                pixel.oxygen -= 50
                pixel.nutrition -= 50
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
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
        speed: 0,
    },
    isBio: true,
    movable: false,
    burn:5,
    burnTime: 100,
    burnInto: ["cooked_meat","calcium","calcium","cooked_meat","calcium","calcium","quicklime"],
}

elements.exoskeleton = {
	color: ["#453a2e","#241d15","#242e23"],
	category: "oxygen",
    behavior: behaviors.WALL,
	hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
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
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"dust"); 
                }
                else {
                    changePixel(pixel,"calcium"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.95) {
                    changePixel(pixel,"dust"); 
                }
                else {
                    changePixel(pixel,"calcium"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"dust"); 
                }
                else {
                    changePixel(pixel,"calcium"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
            else if ((elements[hitPixel.element].id === elements.chlorine.id || elements[hitPixel.element].id === elements.poison_gas.id  || elements[hitPixel.element].id === elements.acid_gas.id || elements[hitPixel.element].id === elements.cyanide_gas.id || elements[hitPixel.element].id === elements.dioxin.id) && Math.random() > 0.5) {
                pixel.smell = true
                deletePixel(hitPixel.x,hitPixel.y)
                pixel.oxygen -= 50
                pixel.nutrition -= 50
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
            else if ((elements[hitPixel.element].id === elements.chlorine.id || elements[hitPixel.element].id === elements.poison_gas.id  || elements[hitPixel.element].id === elements.acid_gas.id || elements[hitPixel.element].id === elements.cyanide_gas.id || elements[hitPixel.element].id === elements.dioxin.id) && Math.random() > 0.5) {
                pixel.smell = true
                deletePixel(hitPixel.x,hitPixel.y)
                pixel.oxygen -= 50
                pixel.nutrition -= 50
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
            else if ((elements[hitPixel.element].id === elements.chlorine.id || elements[hitPixel.element].id === elements.poison_gas.id  || elements[hitPixel.element].id === elements.acid_gas.id || elements[hitPixel.element].id === elements.cyanide_gas.id || elements[hitPixel.element].id === elements.dioxin.id) && Math.random() > 0.5) {
                pixel.smell = true
                deletePixel(hitPixel.x,hitPixel.y)
                pixel.oxygen -= 50
                pixel.nutrition -= 50
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
            else if ((elements[hitPixel.element].id === elements.chlorine.id || elements[hitPixel.element].id === elements.poison_gas.id  || elements[hitPixel.element].id === elements.acid_gas.id || elements[hitPixel.element].id === elements.cyanide_gas.id || elements[hitPixel.element].id === elements.dioxin.id) && Math.random() > 0.5) {
                pixel.smell = true
                deletePixel(hitPixel.x,hitPixel.y)
                pixel.oxygen -= 50
                pixel.nutrition -= 50
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
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
        speed: 0,
    },
    isBio: true,
    movable: false,
    burn:5,
    burnTime: 100,
    burnInto: ["cooked_meat","calcium","calcium","cooked_meat","calcium","calcium","quicklime"],
}

elements.gills = {
	color: "#5EBAE3",
	category: "oxygen",
	hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
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
        speed: 0,
    },
    movable: false,
    isBio: true
}

elements.simple_gill = {
	color: "#75C0E2",
	category: "oxygen",
	hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen --
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                pixel.oxygen += 50
                if (!tryMove(hitPixel,pixel.x,pixel.y+1)) {
                    if (elements[pixelMap[pixel.x][pixel.y+1].element].state === "liquid") {
                        swapPixels(hitPixel,pixelMap[pixel.x][pixel.y+1])
                    }
                }
            }
            else if (elements[hitPixel.element].id === elements.salt_water.id && Math.random() > 0.75) {
                pixel.oxygen += 50
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
            else if (elements[hitPixel.element].id === elements.deoxygenated_water.id && Math.random() > 0.75) {
                if (isEmpty(pixel.x+1, pixel.y)) {
                    tryMove(hitPixel,pixel.x+1,pixel.y);
                }
            }
            else if (elements[hitPixel.element].id === elements.water.id && Math.random() > 0.75) {
                if (isEmpty(pixel.x+1, pixel.y)) {
                    pixel.oxygen += 50
                    tryMove(hitPixel,pixel.x+1,pixel.y);
                }
            }
            else if (elements[hitPixel.element].id === elements.salt_water.id && Math.random() > 0.75) {
                if (isEmpty(pixel.x+1, pixel.y)) {
                    pixel.oxygen += 50
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
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
        speed: 0,
    },
    movable: false,
    isBio: true
}

elements.stomach_lining = {
	color: "#be5c4b",
	category: "nutrition",
    behavior: [
        "XX|CR:stomach_acid%1|XX",
        "CR:stomach_acid%1|XX|CR:stomach_acid%1",
        "XX|CR:stomach_acid%1|XX",
    ],
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
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
        speed: 0,
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
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
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
        speed: 0,
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
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
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
        speed: 0,
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
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
        doDefaults(pixel);
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
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
        speed: 0,
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
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.85) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"pop"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"pop"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
        doDefaults(pixel);
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
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
        speed: 0,
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
        "XX|CR:intestine_bacteria%0.001|XX",
    ],
	hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
            else if ((elements[hitPixel.element].id === elements.digested_material.id || elements[hitPixel.element].id === elements.gaseous_material.id) && Math.random() > 0.75) {
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
        doDefaults(pixel);
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
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
        speed: 0,
    },
    movable: false,
    isBio: true
}

elements.sphincter = {
	color: "#c8846f",
	category: "nutrition",
	hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.9 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
            else if ((elements[hitPixel.element].id === elements.excreted_poop.id || elements[hitPixel.element].id === elements.poop.id || elements[hitPixel.element].id === elements.stench.id || elements[hitPixel.element].id === elements.dirty_water.id) && Math.random() > 0.75) {
                if (elements[hitPixel.element].id === elements.poop.id) {
                    changePixel(hitPixel,"excreted_poop");
                }
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
        doDefaults(pixel);
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
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
        speed: 0,
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
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.975 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen--
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.9999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"milk"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
        else if (isEmpty(pixel.x, pixel.y-1) && Math.random() > 0.95 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
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
        else if (isEmpty(pixel.x, pixel.y+1) && Math.random() > 0.95 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
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
        else if (isEmpty(pixel.x-1, pixel.y) && Math.random() > 0.95 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
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
        else if (isEmpty(pixel.x+1, pixel.y) && Math.random() > 0.95 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
            if (Math.random() > 0.95) {
                if (Math.random() > 0.95) {
                    pixel.nutrition -= 20
                }
                createPixel("milk",pixel.x+1,pixel.y)
            }
        }
        doDefaults(pixel);
    },
    properties: {
        oxygen: 1000,
        nutrition: 1000,
        speed: 0,
    },
    tempHigh: 175,
    stateHigh: "meat",
    tempLow: -50,
    stateLow: "frozen_meat",
    burn: 20,
    burnTime: 160,
    burnInto: "meat",
    breakInto: ["meat","meat","meat","milk"],
    category: "structural",
    state: "solid",
    density: 1250,
    conduct: .001,
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
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.975 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 550 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -5 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.55) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"ash"); 
                }
            }
            else {
                if (Math.random() < 0.95) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
        else if (isEmpty(pixel.x, pixel.y-1) && Math.random() > 0.95 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
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
            if (elements[hitPixel.element].isBio != true && Math.random() > 0.5) {
                if (hitPixel.temp < pixel.temp) {
                    hitPixel.temp++
                    pixel.temp--
                }
                if (hitPixel.temp > pixel.temp) {
                    hitPixel.temp--
                    pixel.temp++
                }
            }
        }
        else if (isEmpty(pixel.x, pixel.y+1) && Math.random() > 0.95 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
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
            if (elements[hitPixel.element].isBio != true && Math.random() > 0.5) {
                if (hitPixel.temp < pixel.temp) {
                    hitPixel.temp++
                    pixel.temp--
                }
                if (hitPixel.temp > pixel.temp) {
                    hitPixel.temp--
                    pixel.temp++
                }
            }
        }
        else if (isEmpty(pixel.x-1, pixel.y) && Math.random() > 0.95 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
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
            if (elements[hitPixel.element].isBio != true && Math.random() > 0.5) {
                if (hitPixel.temp < pixel.temp) {
                    hitPixel.temp++
                    pixel.temp--
                }
                if (hitPixel.temp > pixel.temp) {
                    hitPixel.temp--
                    pixel.temp++
                }
            }
        }
        else if (isEmpty(pixel.x+1, pixel.y) && Math.random() > 0.95 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) {
            if (Math.random() > 0.95) {
                if (Math.random() > 0.95) {
                    pixel.oxygen -= 5
                }
                createPixel("fire",pixel.x+1, pixel.y)
            }
        }
        doDefaults(pixel);
    },
    properties: {
        oxygen: 1000,
        nutrition: 1000,
        speed: 0,
    },
    tempHigh: 750,
    stateHigh: "cooked_meat",
    tempLow: -20,
    stateLow: "frozen_meat",
    breakInto: ["meat","cooked_meat","cooked_meat","fire"],
    category: "structural",
    state: "solid",
    insulate: true,
    density: 1250,
    conduct: .001,
    movable: false,
    isBio: true,
}

elements.digested_material = {
    color: "#B5C306",
    behavior: [
        "XX|XX|XX",
        "SW:stomach_acid,decomposer_acid,herbi_acid,carni_acid,explosive_acid%3 AND M2%5|XX|SW:stomach_acid,decomposer_acid,herbi_acid,carni_acid,explosive_acid%3 AND M2%5",
        "SW:stomach_acid,decomposer_acid,herbi_acid,carni_acid,explosive_acid%5 AND M2%75|SW:stomach_acid,decomposer_acid,herbi_acid,carni_acid,explosive_acid%10 AND M1|SW:stomach_acid,decomposer_acid,herbi_acid,carni_acid,explosive_acid%5 AND M2%75",
    ],
	properties: {
        nutrition: 100,
	speed: 0,
    },
    category: "nutrition",
    state: "solid",
    density: 900,
    conduct: 0.25,
    stain: 0.001,
    darkText: true,
    hidden: true,
    tempHigh: 90,
    stateHigh: "dirty_water",
    tempLow: -30,
    stateLow: "dirty_ice",
}

elements.gaseous_material = {
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
    density: 800,
    conduct: 0.25,
    stain: 0.001,
    darkText: true,
    hidden: true,
    tempHigh: 95,
    stateHigh: "dirty_water",
    tempLow: -35,
    stateLow: "dirty_ice",
}

elements.poop = {
    color: "#593001",
    behavior: [
        "CR:stench%0.0002|CR:stench%0.001|CR:stench%0.0002",
        "M2%75|XX|M2%75",
        "M2|M1|M2",
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
    viscosity: 500,
    density: 200,
    conduct: 0.005,
    darkText: true,
    hidden: true,
    isWaste: true,
    tempHigh: 90,
    stateHigh: "excreted_poop",
    tempLow: -30,
    stain: 0.005,
    stateLowName: "frozen_poop",
}

elements.excreted_poop = {
    color: "#593001",
    behavior: [
        "CR:stench,stench,stench,stench,bacteria,stench,stench,fly,stench,stench,fly,stench,stench%0.0002|CR:stench,stench,stench,stench,bacteria,stench,stench,fly,stench,stench,fly,stench,stench%0.001|CR:stench,stench,stench,stench,bacteria,stench,stench,fly,stench,stench,fly,stench,stench%0.0002",
        "M2%0.5|XX|M2%0.5",
        "M2%55|M1|M2%55",
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
    darkText: true,
    hidden: true,
    isWaste: true,
    tempHigh: 160,
    stateHigh: ["ash","stench","steam","steam","carbon_dioxide"],
    burn: 5,
    burnTime: 30,
    burnInto: ["ash","stench","steam","steam","carbon_dioxide","fire","fire"],
    tempLow: -10,
    stain: 0.005,
    stateLowName: "solid_poop",
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
        "bacteria": { elem2:null, chance:0.5, func:behaviors.FEEDPIXEL   },
        "intestine_bacteria": { elem2:null, chance:0.001, func:behaviors.FEEDPIXEL   },
        "mercury": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], chance:0.1 },
        "bleach": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], chance:0.1 },
        "uranium": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], chance:0.1 },
        "cyanide": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], chance:0.1 },
        "chlorine": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], chance:0.1 },
        "alcohol": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], chance:0.25 },
        "vinegar": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], chance:0.01 },
        "mouthwash": { elem1:[null,null,null,null,null,null,null,null,null,"dna"], chance:0.001 },
    },
    foodNeed: 25,
    egg: "intestine_bacteria",
    tempHigh: 80,
    stateHigh: "dna",
    tempLow: -10,
    stateLow: "dna",
    breakInto: "dna",
    category:"nutrition",
    burn:95,
    burnTime: 100,
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
        "DB%1 AND M2|DL%0.03|DB%1 AND M2",
        "DB%1 AND M2|DB%2 AND M1|DB%1 AND M2",
    ],
    ignore: ["amphib_skin","amphib_dermis","acidic_flesh","acid_vessel","throat_lining","explosive_stomach","stomach_lining","stomach_valve","slime","gaseous_material","digested_material","glass","rad_glass","glass_shard","rad_shard","stained_glass","baked_clay","acid_gas","neutral_acid","acid_cloud","water","salt_water","sugar_water","dirty_water","copper","gold","porcelain","plastic","bead","microplastic","molten_plastic","pool_water","chlorine","hydrogen","gold_coin","silver","nickel","calcium","bone","earthquake","tornado","tsunami","liquid_light","sensor"],
    reactions: {
        "bless": { elem1:null, elem2:["gaseous_material",null,null,null,null,null,null,null,null,null,null], attr2:{"nutrition":100, "speed":10}, chance:0.5 },
        "dirty_water": { elem1:null, elem2:"digested_material", attr2:{"nutrition":-5, "speed":-1}, chance:0.02 },
        "water": { elem1:null, elem2:"digested_material", attr2:{"nutrition":0, "speed":2}, chance:0.02 },
        "salt_water": { elem1:null, elem2:"digested_material", attr2:{"nutrition":5, "speed":-1}, chance:0.02 },
        "sugar_water": { elem1:null, elem2:"digested_material", attr2:{"nutrition":10, "speed":-1}, chance:0.02 },
        "tree_branch": { elem1:null, elem2:"wood", chance:0.02 },
        "sugar": { elem2:"digested_material", attr2:{"nutrition":25, "speed":5}, chance:0.02 },
        "molasses": { elem2:"digested_material", attr2:{"nutrition":10, "speed":8}, chance:0.02 },
        "dead_plant": { elem2:"digested_material", attr2:{"nutrition":15, "speed":1}, chance:0.02 },
        "meat": { elem2:"digested_material", attr2:{"nutrition":30, "speed":-1}, chance:0.02 },
        "cooked_meat": { elem2:"digested_material", attr2:{"nutrition":60}, chance:0.02 },
        "broth": { elem1:null, elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "rotten_meat": { elem2:["digested_material","ammonia",null,null,null], attr2:{"nutrition":-10, "speed":-10}, chance:0.02 },
        "cured_meat": { elem2:"digested_material", attr2:{"nutrition":50}, chance:0.02 },
        "cheese": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "cheese_powder": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "lettuce": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "herb": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "toast": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "bread": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "hard_yolk": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "yolk": { elem2:"gaseous_material", attr2:{"nutrition":5, "speed":-2}, chance:0.02 },
        "milk": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "eggnog": { elem2:"digested_material", attr2:{"nutrition":25, "speed":-1}, chance:0.02 },
        "nut_milk": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "chocolate_milk": { elem2:"digested_material", attr2:{"nutrition":25, "speed":1}, chance:0.02 },
        "fruit_milk": { elem2:"digested_material", attr2:{"nutrition":30, "speed":1}, chance:0.02 },
        "pilk": { elem2:"digested_material", attr2:{"nutrition":30, "speed":5}, chance:0.02 },
        "crumb": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "pickle": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "salt": { elem2:"digested_material", attr2:{"nutrition":5, "speed":-1}, chance:0.02 },
        "worm": { elem2:"gaseous_material", attr2:{"nutrition":5, "speed":-1}, chance:0.02 },
        "ant": { elem2:"gaseous_material", attr2:{"nutrition":5, "speed":-1}, chance:0.02 },
        "bee": { elem2:"gaseous_material", attr2:{"nutrition":5, "speed":-1}, chance:0.02 },
        "spider": { elem2:"gaseous_material", attr2:{"nutrition":5, "speed":-1}, chance:0.02 },
        "egg": { elem2:"gaseous_material", attr2:{"nutrition":-5, "speed":-2}, chance:0.02 },
        "soda": { elem2:"digested_material", attr2:{"nutrition":20, "speed":2}, chance:0.02 },
        "sap": { elem2:"digested_material", attr2:{"nutrition":-5, "speed":-1}, chance:0.02 },
        "juice": { elem2:"digested_material", attr2:{"nutrition":25, "speed":1}, chance:0.02 },
        "mayo": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "nut_butter": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "ketchup": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "jelly": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "bleach": { elem2:"digested_material", attr2:{"nutrition":-500, "speed":-10}, chance:0.02 },
        "poison": { elem2:"digested_material", attr2:{"nutrition":-750, "speed":-10}, chance:0.02 },
        "soap": { elem2:"digested_material", attr2:{"nutrition":-20, "speed":-10}, chance:0.02 },
        "mercury": { elem2:"digested_material", attr2:{"nutrition":-500, "speed":-10}, chance:0.02 },
        "chlorine": { elem2:"gaseous_material", attr2:{"nutrition":-500, "speed":-10}, chance:0.02 },
        "pool_water": { elem2:"digested_material", attr2:{"nutrition":-400, "speed":-10}, chance:0.02 },
        "coffee": { elem2:"digested_material", attr2:{"nutrition":20, "speed":10}, chance:0.02 },
        "tomato": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "grape": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "beans": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "sauce": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "butter": { elem2:"digested_material", attr2:{"nutrition":15, "speed":-1}, chance:0.02 },
        "melted_cheese": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "melted_chocolate": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "melted_butter": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "chocolate": { elem2:"digested_material", attr2:{"nutrition":35, "speed":2}, chance:0.02 },
        "chocolate_powder": { elem2:"digested_material", attr2:{"nutrition":35, "speed":2}, chance:0.02 },
        "rice": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "dough": { elem2:"digested_material", attr2:{"nutrition":5, "speed":-1}, chance:0.02 },
        "batter": { elem2:"digested_material", attr2:{"nutrition":5, "speed":-1}, chance:0.02 },
        "baked_batter": { elem2:"digested_material", attr2:{"nutrition":45, "speed":2}, chance:0.02 },
        "gingerbread": { elem2:"digested_material", attr2:{"nutrition":45, "speed":2}, chance:0.02 },
        "ice_cream": { elem2:"digested_material", attr2:{"nutrition":40, "speed":2}, chance:0.02 },
        "cream": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "caramel": { elem2:"digested_material", attr2:{"nutrition":30, "speed":3}, chance:0.02 },
        "potato": { elem2:"digested_material", attr2:{"nutrition":15, "speed":-1}, chance:0.02 },
        "baked_potato": { elem2:"digested_material", attr2:{"nutrition":45, "speed":1}, chance:0.02 },
        "mashed_potato": { elem2:"digested_material", attr2:{"nutrition":40, "speed":1}, chance:0.02 },
        "yogurt": { elem2:"digested_material", attr2:{"nutrition":35, "speed":1}, chance:0.02 },
        "frozen_yogurt": { elem2:"digested_material", attr2:{"nutrition":35, "speed":2}, chance:0.02 },
        "slush": { elem2:"digested_material", attr2:{"nutrition":5, "speed":-1}, chance:0.02 },
        "coffee_bean": { elem2:"digested_material", attr2:{"nutrition":-5, "speed":20}, chance:0.02 },
	    "coffee_ground": { elem2:"digested_material", attr2:{"nutrition":-5, "speed":15}, chance:0.02 },
        "yeast": { elem2:"digested_material", attr2:{"nutrition":-5, "speed":-1}, chance:0.02 },
        "alcohol": { elem2:"digested_material", attr2:{"nutrition":5, "speed":-15}, chance:0.02 },
        "honey": { elem2:"digested_material", attr2:{"nutrition":35, "speed":3}, chance:0.02 },
        "blood": { elem2:"digested_material", attr2:{"nutrition":5, "speed":-1}, chance:0.02 },
        "poop": { elem2:"gaseous_material", attr2:{"nutrition":-15, "speed":-10}, chance:0.02 },
        "excreted_poop": { elem2:"gaseous_material", attr2:{"nutrition":-15, "speed":-10}, chance:0.02 },
        "urine": { elem2:"gaseous_material", attr2:{"nutrition":-15, "speed":-10}, chance:0.02 },
        "tea": { elem2:"digested_material", attr2:{"nutrition":10, "speed":10}, chance:0.02 },
        "infection": { elem2:"digested_material", attr2:{"nutrition":-15, "speed":-5}, chance:0.02 },
        "cancer": { elem2:"gaseous_material", attr2:{"nutrition":-15, "speed":-15}, chance:0.02 },
        "plague": { elem2:"gaseous_material", attr2:{"nutrition":-15, "speed":-10}, chance:0.02 },
        "glue": { elem2:"gaseous_material", attr2:{"nutrition":-10, "speed":-10}, chance:0.02 },
    },
    category: "nutrition",
    tempHigh: 110,
    stateHigh: "acid_gas",
    tempLow: -58.88,
    burn: 30,
    burnTime: 1,
    state: "liquid",
    density: 1050,
    stain: -0.1
}

elements.herbi_acid = {
    color: ["#A8E54F","#5BC217"],
    behavior: [
        "XX|DB%1|XX",
        "DB%1 AND M2|DL%0.03|DB%1 AND M2",
        "DB%1 AND M2|DB%2 AND M1|DB%1 AND M2",
    ],
    ignore: ["amphib_skin","amphib_dermis","acidic_flesh","acid_vessel","throat_lining","explosive_stomach","herbi_stomach","carni_stomach","stomach_lining","stomach_valve","slime","gaseous_material","digested_material","glass","rad_glass","glass_shard","rad_shard","stained_glass","baked_clay","acid_gas","neutral_acid","acid_cloud","water","salt_water","sugar_water","dirty_water","copper","gold","porcelain","plastic","bead","microplastic","molten_plastic","pool_water","chlorine","hydrogen","gold_coin","silver","nickel","calcium","bone","earthquake","tornado","tsunami","liquid_light","sensor"],
    reactions: {
        "bless": { elem1:null, elem2:["gaseous_material",null,null,null,null,null,null,null,null,null,null], attr2:{"nutrition":100, "speed":10}, chance:0.5 },
        "dirty_water": { elem1:null, elem2:"digested_material", attr2:{"nutrition":-5, "speed":-3}, chance:0.02 },
        "water": { elem1:null, elem2:"digested_material", attr2:{"nutrition":0, "speed":5}, chance:0.02 },
        "salt_water": { elem1:null, elem2:"digested_material", attr2:{"nutrition":5, "speed":-1}, chance:0.02 },
        "sugar_water": { elem1:null, elem2:"digested_material", attr2:{"nutrition":10, "speed":1}, chance:0.02 },
        "plant": { elem2:"digested_material", attr2:{"nutrition":80, "speed":1}, chance:0.02},
        "tree_branch": { elem1:null, elem2:"wood", attr2:{"nutrition":10, "speed":1}, chance:0.02 },
        "sugar": { elem2:"digested_material", attr2:{"nutrition":25, "speed":5}, chance:0.02 },
        "molasses": { elem2:"digested_material", attr2:{"nutrition":10, "speed":8}, chance:0.02 },
        "dead_plant": { elem2:"digested_material", attr2:{"nutrition":75}, chance:0.02 },
        "meat": { elem2:"gaseous_material", attr2:{"nutrition":-10, "speed":-1}, chance:0.02 },
        "cooked_meat": { elem2:"digested_material", attr2:{"nutrition":-5, "speed":1}, chance:0.02 },
        "broth": { elem1:null, elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "rotten_meat": { elem2:["digested_material","ammonia",null,null,null], attr2:{"nutrition":-25, "speed":-20}, chance:0.02 },
        "cured_meat": { elem2:"digested_material", attr2:{"nutrition":-5, "speed":-1}, chance:0.02 },
        "cheese": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "cheese_powder": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "vine": { elem2:"digested_material", attr2:{"nutrition":60}, chance:0.02 },
        "grass": { elem2:"digested_material", attr2:{"nutrition":60}, chance:0.02 },
        "kelp": { elem2:"digested_material", attr2:{"nutrition":60}, chance:0.02 },
        "algae": { elem2:"digested_material", attr2:{"nutrition":50}, chance:0.02 },
        "lettuce": { elem2:"digested_material", attr2:{"nutrition":60}, chance:0.02 },
        "herb": { elem2:"digested_material", attr2:{"nutrition":50}, chance:0.02 },
        "toast": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "bread": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "hard_yolk": { elem2:"digested_material", attr2:{"nutrition":30}, chance:0.02 },
        "yolk": { elem2:"digested_material", attr2:{"nutrition":10, "speed":5}, chance:0.02 },
        "milk": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "eggnog": { elem2:"digested_material", attr2:{"nutrition":25, "speed":-1}, chance:0.02 },
        "nut_milk": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "chocolate_milk": { elem2:"digested_material", attr2:{"nutrition":35, "speed":1}, chance:0.02 },
        "fruit_milk": { elem2:"digested_material", attr2:{"nutrition":40, "speed":1}, chance:0.02 },
        "pilk": { elem2:"digested_material", attr2:{"nutrition":25, "speed":5}, chance:0.02 },
        "crumb": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "pickle": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "salt": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "worm": { elem2:"gaseous_material", attr2:{"nutrition":-10}, chance:0.02 },
        "ant": { elem2:"gaseous_material", attr2:{"nutrition":-10}, chance:0.02 },
        "bee": { elem2:"gaseous_material", attr2:{"nutrition":-10}, chance:0.02 },
        "spider": { elem2:"gaseous_material", attr2:{"nutrition":-10}, chance:0.02 },
        "egg": { elem2:"digested_material", attr2:{"nutrition":-20}, chance:0.02 },
        "soda": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "sap": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "juice": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "mayo": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "nut_butter": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "ketchup": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "jelly": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "bleach": { elem2:"digested_material", attr2:{"nutrition":-500, "speed":-20}, chance:0.02 },
        "poison": { elem2:"digested_material", attr2:{"nutrition":-750, "speed":-20}, chance:0.02 },
        "soap": { elem2:"digested_material", attr2:{"nutrition":-20, "speed":-10}, chance:0.02 },
        "mercury": { elem2:"digested_material", attr2:{"nutrition":-500, "speed":-20}, chance:0.02 },
        "chlorine": { elem2:"gaseous_material", attr2:{"nutrition":-500, "speed":-20}, chance:0.02 },
        "pool_water": { elem2:"digested_material", attr2:{"nutrition":-400, "speed":-15}, chance:0.02 },
        "coffee": { elem2:"digested_material", attr2:{"nutrition":20, "speed":10}, chance:0.02 },
        "tomato": { elem2:"digested_material", attr2:{"nutrition":55}, chance:0.02 },
        "grape": { elem2:"digested_material", attr2:{"nutrition":50}, chance:0.02 },
        "beans": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "sauce": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "butter": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "melted_cheese": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "melted_chocolate": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "melted_butter": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "chocolate": { elem2:"digested_material", attr2:{"nutrition":20, "speed":2}, chance:0.02 },
        "chocolate_powder": { elem2:"digested_material", attr2:{"nutrition":20, "speed":2}, chance:0.02 },
        "rice": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "dough": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "batter": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "baked_batter": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "gingerbread": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "ice_cream": { elem2:"digested_material", attr2:{"nutrition":30}, chance:0.02 },
        "cream": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "caramel": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "potato": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "baked_potato": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "mashed_potato": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "yogurt": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "frozen_yogurt": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "slush": { elem2:"digested_material", attr2:{"nutrition":5, "speed":-1}, chance:0.02 },
        "coffee_bean": { elem2:"digested_material", attr2:{"nutrition":-5, "speed":20}, chance:0.02 },
	    "coffee_ground": { elem2:"digested_material", attr2:{"nutrition":-5, "speed":15}, chance:0.02 },
        "yeast": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "alcohol": { elem2:"digested_material", attr2:{"nutrition":-5, "speed":-15}, chance:0.02 },
        "honey": { elem2:"digested_material", attr2:{"nutrition":35, "speed":3}, chance:0.02 },
        "blood": { elem2:"digested_material", attr2:{"nutrition":-5, "speed":-1}, chance:0.02 },
        "poop": { elem2:"gaseous_material", attr2:{"nutrition":-15, "speed":-10}, chance:0.02 },
        "excreted_poop": { elem2:"gaseous_material", attr2:{"nutrition":-15, "speed":-10}, chance:0.02 },
        "urine": { elem2:"gaseous_material", attr2:{"nutrition":-15, "speed":-10}, chance:0.02 },
        "tea": { elem2:"digested_material", attr2:{"nutrition":10, "speed":10}, chance:0.02 },
        "infection": { elem2:"digested_material", attr2:{"nutrition":-20, "speed":-5}, chance:0.02 },
        "cancer": { elem2:"gaseous_material", attr2:{"nutrition":-25, "speed":-15}, chance:0.02 },
        "plague": { elem2:"gaseous_material", attr2:{"nutrition":-15, "speed":-10}, chance:0.02 },
        "glue": { elem2:"gaseous_material", attr2:{"nutrition":-10, "speed":-10}, chance:0.02 },
    },
    category: "nutrition",
    tempHigh: 110,
    stateHigh: "acid_gas",
    tempLow: -58.88,
    burn: 30,
    burnTime: 1,
    state: "liquid",
    density: 1050,
    stain: -0.1
}

elements.carni_acid = {
    color: ["#ADA469","#5B6517"],
    behavior: [
        "XX|DB%1|XX",
        "DB%1 AND M2|DL%0.005|DB%1 AND M2",
        "DB%1 AND M2|DB%2 AND M1|DB%1 AND M2",
    ],
    ignore: ["amphib_skin","amphib_dermis","acidic_flesh","acid_vessel","throat_lining","explosive_stomach","stomach_lining","carni_stomach","stomach_valve","slime","gaseous_material","digested_material","glass","rad_glass","glass_shard","rad_shard","stained_glass","baked_clay","acid_gas","neutral_acid","acid_cloud","water","salt_water","sugar_water","dirty_water","copper","gold","porcelain","plastic","bead","microplastic","molten_plastic","pool_water","chlorine","hydrogen","gold_coin","silver","nickel","calcium","bone","earthquake","tornado","tsunami","liquid_light","sensor"],
    reactions: {
        "bless": { elem1:null, elem2:["gaseous_material",null,null,null,null,null,null,null,null,null,null], attr2:{"nutrition":100, "speed":10}, chance:0.5 },
        "dirty_water": { elem1:null, elem2:"digested_material", attr2:{"nutrition":-5, "speed":-2}, chance:0.02 },
        "water": { elem1:null, elem2:"digested_material", attr2:{"nutrition":0, "speed":5}, chance:0.02 },
        "salt_water": { elem1:null, elem2:"digested_material", attr2:{"nutrition":5, "speed":-1}, chance:0.02 },
        "sugar_water": { elem1:null, elem2:"digested_material", attr2:{"nutrition":10, "speed":1}, chance:0.02 },
        "plant": { elem2:"digested_material", attr2:{"nutrition":5, "speed":-5}, chance:0.02},
        "tree_branch": { elem1:null, elem2:"wood", chance:0.02 },
        "sugar": { elem2:"digested_material", attr2:{"nutrition":10, "speed":3}, chance:0.02 },
        "molasses": { elem2:"digested_material", attr2:{"nutrition":5, "speed":5}, chance:0.02 },
        "dead_plant": { elem2:"digested_material", attr2:{"nutrition":5, "speed":-1}, chance:0.02 },
        "meat": { elem2:"digested_material", attr2:{"nutrition":70, "speed":5}, chance:0.02 },
        "cooked_meat": { elem2:"digested_material", attr2:{"nutrition":60, "speed":4}, chance:0.02 },
        "broth": { elem1:null, elem2:"digested_material", attr2:{"nutrition":50, "speed":6}, chance:0.02 },
        "rotten_meat": { elem2:["digested_material","ammonia",null,null,null], attr2:{"nutrition":5, "speed":-5}, chance:0.02 },
        "cured_meat": { elem2:"digested_material", attr2:{"nutrition":50, "speed":-1}, chance:0.02 },
        "cheese": { elem2:"digested_material", attr2:{"nutrition":35, "speed":-1}, chance:0.02 },
        "cheese_powder": { elem2:"digested_material", attr2:{"nutrition":35, "speed":-1}, chance:0.02 },
        "lettuce": { elem2:"digested_material", attr2:{"nutrition":20}, chance:0.02 },
        "herb": { elem2:"digested_material", attr2:{"nutrition":5, "speed":-1}, chance:0.02 },
        "toast": { elem2:"digested_material", attr2:{"nutrition":20}, chance:0.02 },
        "bread": { elem2:"digested_material", attr2:{"nutrition":20}, chance:0.02 },
        "hard_yolk": { elem2:"digested_material", attr2:{"nutrition":50}, chance:0.02 },
        "yolk": { elem2:"digested_material", attr2:{"nutrition":50}, chance:0.02 },
        "milk": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "eggnog": { elem2:"digested_material", attr2:{"nutrition":20, "speed":-1}, chance:0.02 },
        "nut_milk": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "chocolate_milk": { elem2:"digested_material", attr2:{"nutrition":25, "speed":1}, chance:0.02 },
        "fruit_milk": { elem2:"digested_material", attr2:{"nutrition":30, "speed":1}, chance:0.02 },
        "pilk": { elem2:"digested_material", attr2:{"nutrition":30, "speed":5}, chance:0.02 },
        "crumb": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "pickle": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "salt": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "worm": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "ant": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "bee": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "spider": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "rat": { elem2:"digested_material", attr2:{"nutrition":15, "speed":-1}, chance:0.02 },
        "bird": { elem2:"digested_material", attr2:{"nutrition":15, "speed":1}, chance:0.02 },
        "fish": { elem2:"digested_material", attr2:{"nutrition":15, "speed":1}, chance:0.02 },
        "head": { elem2:"digested_material", attr2:{"nutrition":15, "speed":2}, chance:0.02 },
        "body": { elem2:"digested_material", attr2:{"nutrition":15, "speed":2}, chance:0.02 },
        "egg": { elem2:"digested_material", attr2:{"nutrition":25, "speed":1}, chance:0.02 },
        "soda": { elem2:"digested_material", attr2:{"nutrition":10, "speed":-1}, chance:0.02 },
        "sap": { elem2:"gaseous_material", attr2:{"nutrition":-10, "speed":-1}, chance:0.02 },
        "juice": { elem2:"digested_material", attr2:{"nutrition":10, "speed":1}, chance:0.02 },
        "mayo": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "nut_butter": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "ketchup": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "jelly": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "bleach": { elem2:"digested_material", attr2:{"nutrition":-500, "speed":-20}, chance:0.02 },
        "poison": { elem2:"digested_material", attr2:{"nutrition":-750, "speed":-20}, chance:0.02 },
        "soap": { elem2:"digested_material", attr2:{"nutrition":-20, "speed":-15}, chance:0.02 },
        "mercury": { elem2:"digested_material", attr2:{"nutrition":-500, "speed":-20}, chance:0.02 },
        "chlorine": { elem2:"gaseous_material", attr2:{"nutrition":-500, "speed":-20}, chance:0.02 },
        "pool_water": { elem2:"digested_material", attr2:{"nutrition":-400, "speed":-15}, chance:0.02 },
        "coffee": { elem2:"digested_material", attr2:{"nutrition":10, "speed":5}, chance:0.02 },
        "tomato": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "grape": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "beans": { elem2:"digested_material", attr2:{"nutrition":20}, chance:0.02 },
        "sauce": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "butter": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "melted_cheese": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "melted_chocolate": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "melted_butter": { elem2:"gaseous_material", attr2:{"nutrition":-10}, chance:0.02 },
        "chocolate": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "chocolate_powder": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "rice": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "dough": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "batter": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "baked_batter": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "gingerbread": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "ice_cream": { elem2:"digested_material", attr2:{"nutrition":30, "speed":1}, chance:0.02 },
        "cream": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "caramel": { elem2:"digested_material", attr2:{"nutrition":20}, chance:0.02 },
        "potato": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "baked_potato": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "mashed_potato": { elem2:"digested_material", attr2:{"nutrition":20}, chance:0.02 },
        "yogurt": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "frozen_yogurt": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "slush": { elem2:"digested_material", attr2:{"nutrition":-1, "speed":1}, chance:0.02 },
        "coffee_bean": { elem2:"gaseous_material", attr2:{"nutrition":-10, "speed":15}, chance:0.02 },
        "yeast": { elem2:"gaseous_material", attr2:{"nutrition":-10}, chance:0.02 },
        "alcohol": { elem2:"digested_material", attr2:{"nutrition":"-15", "speed":-15}, chance:0.02 },
        "honey": { elem2:"digested_material", attr2:{"nutrition":35, "speed":5}, chance:0.02 },
        "blood": { elem2:"digested_material", attr2:{"nutrition":15, "speed":3}, chance:0.02 },
        "poop": { elem2:"gaseous_material", attr2:{"nutrition":-15, "speed":-5}, chance:0.02 },
        "excreted_poop": { elem2:"gaseous_material", attr2:{"nutrition":-15, "speed":-5}, chance:0.02 },
        "urine": { elem2:"gaseous_material", attr2:{"nutrition":-15, "speed":-10}, chance:0.02 },
        "tea": { elem2:"digested_material", attr2:{"nutrition":5, "speed":10}, chance:0.02 },
        "infection": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "cancer": { elem2:"digested_material", attr2:{"nutrition":-5, "speed":-5}, chance:0.02 },
        "plague": { elem2:"gaseous_material", attr2:{"nutrition":-15, "speed":-10}, chance:0.02 },
        "glue": { elem2:"gaseous_material", attr2:{"nutrition":-10, "speed":-15}, chance:0.02 },
    },
    category: "nutrition",
    tempHigh: 110,
    stateHigh: "acid_gas",
    tempLow: -58.88,
    burn: 30,
    burnTime: 1,
    state: "liquid",
    density: 1050,
    stain: -0.1
}

elements.explosive_acid = {
    color: ["#E9DC8C","#D0C15A"],
    behavior: [
        "XX|DB%1|XX",
        "DB%1 AND M2|DL%0.001|DB%1 AND M2",
        "DB%1 AND M2|DB%2 AND M1|DB%1 AND M2",
    ],
    ignore: ["amphib_skin","amphib_dermis","acidic_flesh","acid_vessel","throat_lining","stomach_lining","explosive_stomach","stomach_valve","slime","gaseous_material","digested_material","glass","rad_glass","glass_shard","rad_shard","stained_glass","baked_clay","acid_gas","neutral_acid","acid_cloud","water","salt_water","sugar_water","dirty_water","copper","gold","porcelain","plastic","bead","microplastic","molten_plastic","pool_water","chlorine","hydrogen","gold_coin","silver","nickel","calcium","bone","earthquake","tornado","tsunami","liquid_light","sensor"],
    reactions: {
        "bless": { elem1:null, elem2:["gaseous_material",null,null,null,null,null,null,null,null,null,null], attr2:{"nutrition":100, "speed":10}, chance:0.5 },
        "dirty_water": { elem1:null, elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "water": { elem1:null, elem2:"digested_material", attr2:{"nutrition":0, "speed":10}, chance:0.02 },
        "salt_water": { elem1:null, elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "sugar_water": { elem1:null, elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "plant": { elem2:"digested_material", attr2:{"nutrition":10, "speed":5}, chance:0.02},
        "tree_branch": { elem1:null, elem2:"wood", chance:0.02 },
        "sugar": { elem2:"digested_material", attr2:{"nutrition":30, "speed":5}, chance:0.02 },
        "molasses": { elem2:"digested_material", attr2:{"nutrition":15, "speed":8}, chance:0.02 },
        "dead_plant": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "meat": { elem2:"digested_material", attr2:{"nutrition":30, "speed":5}, chance:0.02 },
        "cooked_meat": { elem2:"digested_material", attr2:{"nutrition":60}, chance:0.02 },
        "broth": { elem1:null, elem2:"digested_material", attr2:{"nutrition":55}, chance:0.02 },
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
        "eggnog": { elem2:"digested_material", attr2:{"nutrition":25, "speed":1}, chance:0.02 },
        "nut_milk": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "chocolate_milk": { elem2:"digested_material", attr2:{"nutrition":25, "speed":1}, chance:0.02 },
        "fruit_milk": { elem2:"digested_material", attr2:{"nutrition":30, "speed":1}, chance:0.02 },
        "pilk": { elem2:"digested_material", attr2:{"nutrition":30, "speed":5}, chance:0.02 },
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
        "chlorine": { elem2:"gaseous_material", attr2:{"nutrition":5}, chance:0.02 },
        "pool_water": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
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
        "cheese_powder": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "chocolate_powder": { elem2:"digested_material", attr2:{"nutrition":35, "speed":2}, chance:0.02 },
        "rice": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "dough": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "batter": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "baked_batter": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "gingerbread": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
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
        "poop": { elem2:"gaseous_material", attr2:{"nutrition":5}, chance:0.02 },
        "excreted_poop": { elem2:"gaseous_material", attr2:{"nutrition":5}, chance:0.02 },
        "urine": { elem2:"gaseous_material", attr2:{"nutrition":5}, chance:0.02 },
        "tea": { elem2:"digested_material", attr2:{"nutrition":5, "speed":5}, chance:0.02 },
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
    state: "liquid",
    density: 1050,
}

elements.decomposer_acid = {
    color: ["#847C35","#6F7326"],
    behavior: [
        "XX|DB%1|XX",
        "DB%1 AND M2|DL%0.005|DB%1 AND M2",
        "DB%1 AND M2|DB%2 AND M1|DB%1 AND M2",
    ],
    ignore: ["amphib_skin","amphib_dermis","acidic_flesh","acid_vessel","decomposer_stomach","throat_lining","explosive_stomach","herbi_stomach","carni_stomach","stomach_lining","stomach_valve","slime","gaseous_material","digested_material","glass","rad_glass","glass_shard","rad_shard","stained_glass","baked_clay","acid_gas","neutral_acid","acid_cloud","water","salt_water","sugar_water","dirty_water","copper","gold","porcelain","plastic","bead","microplastic","molten_plastic","pool_water","chlorine","hydrogen","gold_coin","silver","nickel","calcium","bone","earthquake","tornado","tsunami","liquid_light","sensor"],
    reactions: {
        "bless": { elem1:null, elem2:["gaseous_material",null,null,null,null,null,null,null,null,null,null], attr2:{"nutrition":100, "speed":10}, chance:0.5 },
        "dirty_water": { elem1:null, elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "water": { elem1:null, elem2:"digested_material", attr2:{"nutrition":0, "speed":5}, chance:0.02 },
        "salt_water": { elem1:null, elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "sugar_water": { elem1:null, elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "plant": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02},
        "tree_branch": { elem1:null, elem2:"wood", attr2:{"nutrition":30}, chance:0.02 },
        "sugar": { elem2:"digested_material", attr2:{"nutrition":30}, chance:0.02 },
        "molasses": { elem2:"digested_material", attr2:{"nutrition":20}, chance:0.02 },
        "dead_plant": { elem2:"digested_material", attr2:{"nutrition":90, "speed":5}, chance:0.02 },
        "meat": { elem2:"digested_material", attr2:{"nutrition":20}, chance:0.02 },
        "cooked_meat": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "broth": { elem1:null, elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "rotten_meat": { elem2:["digested_material","ammonia",null,null,null], attr2:{"nutrition":55, "speed":5}, chance:0.02 },
        "cured_meat": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "cheese": { elem2:"digested_material", attr2:{"nutrition":50}, chance:0.02 },
        "vine": { elem2:"digested_material", attr2:{"nutrition":30}, chance:0.02 },
        "grass": { elem2:"digested_material", attr2:{"nutrition":30}, chance:0.02 },
        "kelp": { elem2:"digested_material", attr2:{"nutrition":30}, chance:0.02 },
        "algae": { elem2:"digested_material", attr2:{"nutrition":60, "speed":5}, chance:0.02 },
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
        "bleach": { elem2:"digested_material", attr2:{"nutrition":-500, "speed":-15}, chance:0.02 },
        "poison": { elem2:"digested_material", attr2:{"nutrition":-750, "speed":-15}, chance:0.02 },
        "soap": { elem2:"digested_material", attr2:{"nutrition":-20, "speed":-10}, chance:0.02 },
        "mercury": { elem2:"digested_material", attr2:{"nutrition":-500, "speed":-15}, chance:0.02 },
        "chlorine": { elem2:"gaseous_material", attr2:{"nutrition":-500, "speed":-15}, chance:0.02 },
        "pool_water": { elem2:"digested_material", attr2:{"nutrition":-400, "speed":-15}, chance:0.02 },
        "coffee": { elem2:"digested_material", attr2:{"nutrition":20, "speed":10}, chance:0.02 },
        "tomato": { elem2:"digested_material", attr2:{"nutrition":55}, chance:0.02 },
        "grape": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "beans": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "sauce": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "butter": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "melted_cheese": { elem2:"digested_material", attr2:{"nutrition":15}, chance:0.02 },
        "melted_chocolate": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "melted_butter": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "chocolate": { elem2:"digested_material", attr2:{"nutrition":30, "speed":1}, chance:0.02 },
        "cheese_powder": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "chocolate_powder": { elem2:"digested_material", attr2:{"nutrition":35, "speed":1}, chance:0.02 },
        "rice": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "dough": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "batter": { elem2:"digested_material", attr2:{"nutrition":5}, chance:0.02 },
        "baked_batter": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "gingerbread": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "ice_cream": { elem2:"digested_material", attr2:{"nutrition":30}, chance:0.02 },
        "cream": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "caramel": { elem2:"digested_material", attr2:{"nutrition":10}, chance:0.02 },
        "potato": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "baked_potato": { elem2:"digested_material", attr2:{"nutrition":45}, chance:0.02 },
        "mashed_potato": { elem2:"digested_material", attr2:{"nutrition":40}, chance:0.02 },
        "yogurt": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "frozen_yogurt": { elem2:"digested_material", attr2:{"nutrition":35}, chance:0.02 },
        "slush": { elem2:"digested_material", attr2:{"nutrition":0}, chance:0.02 },
        "coffee_bean": { elem2:"digested_material", attr2:{"nutrition":-5, "speed":15}, chance:0.02 },
        "yeast": { elem2:"digested_material", attr2:{"nutrition":-5}, chance:0.02 },
        "alcohol": { elem2:"digested_material", attr2:{"nutrition":-35, "speed":-5}, chance:0.02 },
        "honey": { elem2:"digested_material", attr2:{"nutrition":35, "speed":1}, chance:0.02 },
        "blood": { elem2:"digested_material", attr2:{"nutrition":5, "speed":-1}, chance:0.02 },
        "infection": { elem2:"gaseous_material", attr2:{"nutrition":-15, "speed":-15}, chance:0.02 },
        "cancer": { elem2:"gaseous_material", attr2:{"nutrition":-15, "speed":-15}, chance:0.02 },
        "plague": { elem2:"gaseous_material", attr2:{"nutrition":-15, "speed":-15}, chance:0.02 },
        "glue": { elem2:"gaseous_material", attr2:{"nutrition":-10, "speed":-15}, chance:0.02 },
        "poop": { elem2:"digested_material", attr2:{"nutrition":25, "speed":1}, chance:0.02 },
        "excreted_poop": { elem2:"digested_material", attr2:{"nutrition":25}, chance:0.02 },
        "urine": { elem2:"gaseous_material", attr2:{"nutrition":5, "speed":1}, chance:0.02 },
        "tea": { elem2:"digested_material", attr2:{"nutrition":10, "speed":10}, chance:0.02 },
        "dead_bug": { elem2:"digested_material", attr2:{"nutrition":35, "speed":5}, chance:0.02 },
    },
    category: "nutrition",
    tempHigh: 110,
    stateHigh: "acid_gas",
    tempLow: -58.88,
    burn: 30,
    burnTime: 1,
    state: "liquid",
    density: 1050,
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
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.99 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                changePixel(pixel,"bone"); 
            }
            else if (pixel.temp < -15) {
                changePixel(pixel,"bone"); 
            }
            else {
                changePixel(pixel,"bone"); 
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
        speed: 0,
    },
    breakInto: ["quicklime","quicklime","quicklime","blood","bone","bone","bone","bone","bone","bone"],
    movable: false,
    isBio: true,
    burn: 1,
    burnTime: 100,
    burnInto: ["bone","bone","bone","bone","quicklime"],
}

elements.real_bone_marrow = {
	color: "#D3A491",
	category: "structural",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050)) && Math.random() < 0.005) {
            for (var i = 0; i < squareCoords.length; i++) {
                var coords = squareCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (isEmpty(x,y)) {
                    createPixel("real_bone",x,y);
                }
            }
        }
        doDefaults(pixel);
        if ((Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.95) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"blood"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.95) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"blood"); 
                }
            }
            else {
                if (Math.random() < 0.95) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"blood"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (elements[hitPixel.element].isBlood === true) {
                    if (Math.random() > 0.999 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2020))) {
                        changePixel(hitPixel,"white_blood_cell");
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (elements[hitPixel.element].isBlood === true) {
                    if (Math.random() > 0.999 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2020))) {
                        changePixel(hitPixel,"white_blood_cell");
                    }
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (elements[hitPixel.element].isBlood === true) {
                    if (Math.random() > 0.999 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2020))) {
                        changePixel(hitPixel,"white_blood_cell");
                    }
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
                if (elements[hitPixel.element].isBlood === true) {
                    if (Math.random() > 0.999 && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2020))) {
                        changePixel(hitPixel,"white_blood_cell");
                    }
                }
            }
        }
    },
    density: 2710,
    state: "solid",
    conduct: .001,
    tempHigh: 350,
    stateHigh: "cooked_meat",
    tempLow: -40,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 400,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
    hardness: 0.2,
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","meat","rotten_meat","cooked_meat","flesh"], chance:0.2 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
        speed: 0,
    },
    isBio: true,
    movable: false,
}

elements.cartilage = {
    color: "#DBDBDB",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.99 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.9) {
                    changePixel(pixel,"water"); 
                }
                else if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else if (Math.random() < 0.75) {
                    changePixel(pixel,"calcium"); 
                }
                else {
                    changePixel(pixel,"glue"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.9) {
                    changePixel(pixel,"water"); 
                }
                else if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else if (Math.random() < 0.75) {
                    changePixel(pixel,"quicklime"); 
                }
                else {
                    changePixel(pixel,"calcium"); 
                }
            }
            else {
                if (Math.random() < 0.9) {
                    changePixel(pixel,"water"); 
                }
                else if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else if (Math.random() < 0.75) {
                    changePixel(pixel,"quicklime"); 
                }
                else {
                    changePixel(pixel,"calcium"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
    },
    category:"structural",
    tempHigh: 200,
    stateHigh: ["calcium","glue","steam","steam","meat","steam",null],
    tempLow: -36,
    stateLow: ["calcium","calcium","meat","water","water","water",null],
    state: "solid",
    density: 1900,
    hardness: 0.05,
    properties: {
        oxygen: 1000,
        nutrition: 1000,
        speed: 0,
    },
    breakInto: ["quicklime","calcium","meat","meat","water","water",null],
    movable: false,
    isBio: true,
    burn: 1,
    burnTime: 100,
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
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
        speed: 0,
    },
    extinguish: true,
    isBio: true
}

elements.urine = {
    color: ["#E9BE3C","#D0B937"],
    behavior: behaviors.LIQUID,
    tempHigh: 102,
    stateHigh: ["steam","salt"],
    tempLow: -2,
    stateLowName: "pee_ice",
    category: "liquids",
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
        "aluminum": { elem1:["hydrogen","hydrogen","oxygen","chlorine","salt"], charged:true, chance:0.0025 },
        "zinc": { elem1:["hydrogen","hydrogen","oxygen","chlorine","salt"], charged:true, chance:0.015 },
        "steel": { elem1:["hydrogen","hydrogen","oxygen","chlorine","salt"], charged:true, chance:0.0125 },
        "iron": { elem1:["hydrogen","hydrogen","oxygen","chlorine","salt"], charged:true, chance:0.0125 },
        "tin": { elem1:["hydrogen","hydrogen","oxygen","chlorine","salt"], charged:true, chance:0.01 },
        "brass": { elem1:["hydrogen","hydrogen","oxygen","chlorine","salt"], charged:true, chance:0.001 },
        "bronze": { elem1:["hydrogen","hydrogen","oxygen","chlorine","salt"], charged:true, chance:0.001 },
        "copper": { elem1:["hydrogen","hydrogen","oxygen","chlorine","salt"], charged:true, chance:0.0075 },
        "silver": { elem1:["hydrogen","hydrogen","oxygen","chlorine","salt"], charged:true, chance:0.0075 },
        "gold": { elem1:["hydrogen","hydrogen","oxygen","chlorine","salt"], charged:true, chance:0.0075 },
    },
    state: "liquid",
    density: 1026,
    conduct: 0.1,
    stain: 0.01,
    stainSelf: true,
    isWaste: true,
    extinguish: true
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
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
    category: "circulation",
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
        "brain_jar_juice": { elem2:"bubble", color2:"#81cf63", attr2:{"clone":"brain_jar_juice"}, chance:0.00005 },
    },
    state: "liquid",
    density: 1026,
    stain: -0.01,
    properties: {
        oxygen: 1000,
        nutrition: 1000,
        speed: 0,
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
    stateHigh: ["dna","dna","dna","dna","dna","dna","carbon_dioxide","steam"],
    tempLow: 0,
    stateLow: "dna",
    breakInto: "dna",
    category:"life",
    burn:95,
    burnTime: 100,
    burnInto: ["dna","dna","dna","dna","dna","smoke","carbon_dioxide","steam"],
    state: "solid",
    density: 600,
    conduct: .1
}

elements.tract = {
    name: "bio-pipe",
    color: ["#7C4941","#83594C"],
    onSelect: function() {
        logMessage("Draw a pipe, wait for walls to appear, then erase the exit hole.");
    },
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
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
                        if (pixel.con && !newPixel.con && newPixel.stage === nextStage && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) { //transfer to adjacent pipe
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
            if (pixel.con && !moved && Math.random() > (1 - ((pixel.nutrition + pixel.oxygen + pixel.speed) / 2050))) { // move to same stage if none other
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
    conduct: 1,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
	reactions: {
        "cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","blood","fat","meat","rotten_meat","cooked_meat"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
        speed: 0,
    },
    isBio: true,
}

elements.biosensor = {
	color: ["#AD6770","#B0707D"],
	category: "nervous system",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coords = adjacentCoords[i];
            var x = pixel.x + coords[0];
            var y = pixel.y + coords[1];
            if (!isEmpty(x,y,true)) {
                var sensed = pixelMap[x][y];
                if (sensed.con || elements[sensed.element].movable && elements.biosensor.ignore.indexOf(sensed.element) === -1) {
                    pixel.charge = 5;
                    break;
                }
            }
        }
        if ((Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
        doDefaults(pixel);
    },
    ignore: ["flash"],
    density: 2710,
    state: "solid",
    conduct: 1,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
	reactions: {
        "cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","blood","fat","meat","rotten_meat","cooked_meat"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
        speed: 0,
    },
    isBio: true,
    movable: false,
}

elements.bioplate = {
	color: ["#AD6770","#B0707D"],
	category: "nervous system",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if (!isEmpty(pixel.x, pixel.y-1, true)){
            if (pixel.min && elements[pixelMap[pixel.x][pixel.y-1].element].density < pixel.min) {}
            else if (pixelMap[pixel.x][pixel.y-1].element != "bioplate" || pixelMap[pixel.x][pixel.y-1].on) {
                pixel.on = true;
                var coordsToShock = [
                    [pixel.x, pixel.y+1],
                    [pixel.x+1, pixel.y],
                    [pixel.x-1, pixel.y],
                ]
                for (var i = 0; i < coordsToShock.length; i++) {
                    var x = coordsToShock[i][0];
                    var y = coordsToShock[i][1];
                    if (!isEmpty(x,y,true)) {
                        var newpixel = pixelMap[x][y];
                        if (elements[newpixel.element].conduct) {
                            newpixel.charge = 1;
                        }
                    }
                }
            }
        }
        else if (pixel.on) {
            pixel.on = false;
        }
        if ((Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
        doDefaults(pixel);
    },
    ignore: ["flash"],
    density: 2710,
    state: "solid",
    conduct: 1,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
	reactions: {
        "cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","blood","fat","meat","rotten_meat","cooked_meat"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
        speed: 0,
    },
    isBio: true,
    movable: false,
}

elements.biocloner = {
	color: ["#BE9247","#C09850"],
	category: "nervous system",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|BCF|XX",
        "BCF|XX|BCF",
        "XX|BCF|XX",
    ],
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen --
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
        doDefaults(pixel)
        if (pixel.clone) { return }
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coords = adjacentCoords[i];
            var x = pixel.x + coords[0];
            var y = pixel.y + coords[1];
            if (!isEmpty(x,y,true)) {
                pixel.temp = pixelMap[x][y].temp;
                if (pixelMap[x][y].clone) { pixel.clone = pixelMap[x][y].clone; break }
                var element = pixelMap[x][y].element;
                if (element === pixel.element || elements[pixel.element].ignore.indexOf(element) !== -1 && element !== "fuse") { continue }
                pixel.clone = element;
                break;
            }
        }
    },
    ignore: ["cloner","slow_cloner","clone_powder","floating_cloner","wire","ewall","sensor","battery","fuse","nerve","flesh"],
    ignoreConduct:["fuse"],
    density: 2710,
    state: "solid",
    conduct: 1,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
	reactions: {
        "cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","blood","fat","meat","rotten_meat","cooked_meat"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
        speed: 0,
    },
    isBio: true,
    movable: false,
}

elements.valve = {
	color: ["#A9436A","#B64F71"],
	category: "nervous system",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|DL:valve_extension|XX",
        "DL:valve_extension|XX|DL:valve_extension",
        "XX|DL:valve_extension|XX",
    ],
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition--
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
        }
        if (pixel.charge || !pixel.open) {
            pixel.openAge = 0
            pixel.open = true
        }
        if (pixel.open === true) {
            pixel.openAge++
        }
        if (pixel.openAge > 29) {
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coords = adjacentCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (isEmpty(x,y)) {
                    createPixel("valve_extension",x,y);
                    pixel.openAge = 0;
                    pixel.open = false;
                }
            }
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
        doDefaults(pixel);
    },
    density: 2710,
    state: "solid",
    conduct: 1,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
	reactions: {
        "cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","blood","fat","meat","rotten_meat","cooked_meat"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
        speed: 0,
    },
    isBio: true,
    movable: false,
}

elements.valve_extension = {
    name: "valve",
	color: ["#9e4839","#ba6449"],
	category: "nervous system",
    behavior: behaviors.WALL,
    hoverStat: function(pixel) {
        return "Ntr:"+pixel.nutrition+" O2:"+pixel.oxygen
    },
    tick: function(pixel) {
        if ((Math.random() > 0.92 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.burning === true && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp > 43 && pixel.nutrition > 0 && pixel.oxygen > 0) || (pixel.temp < -10 && pixel.nutrition > 0 && pixel.oxygen > 0)) {
            pixel.nutrition -= 2
            pixel.oxygen -= 2
        }
        if (Math.random() > 0.5 && (pixel.nutrition < 1 || pixel.oxygen < 1 || pixel.speed < -100)) {
            if (pixel.temp > 95) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"cooked_meat"); 
                }
            }
            else if (pixel.temp < -15) {
                if (Math.random() < 0.75) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"frozen_meat"); 
                }
            }
            else {
                if (Math.random() < 0.999) {
                    changePixel(pixel,"meat"); 
                }
                else {
                    changePixel(pixel,"rotten_meat"); 
                }
            }
        }
        if (pixel.nutrition === null || isNaN(pixel.nutrition)) {
            pixel.nutrition = 500
        }
        if (pixel.oxygen === null || isNaN(pixel.oxygen)) {
            pixel.oxygen = 500
        }
        if (pixel.speed === null || isNaN(pixel.speed)) {
            pixel.speed = 0
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
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
                if (hitPixel.speed < pixel.speed) {
                    hitPixel.speed += 1
                    pixel.speed -= 1
                }
            }
        }
        doDefaults(pixel);
    },
    density: 2710,
    state: "solid",
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -25,
    stateLow: "frozen_meat",
    burn: 5,
    burnTime: 350,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat"],
	reactions: {
        "cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","blood","fat","meat","rotten_meat","cooked_meat"], chance:0.4 },
	},
	properties: {
        oxygen: 1000,
        nutrition: 1000,
        speed: 0,
    },
    isBio: true,
    movable: false,
    hidden: true,
}

elements.revive = {
    color: "#8BE73E",
    hidden: true,
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tool: function(pixel) {
        if (elements[pixel.element].isBio == true) {
            if (pixel.nutrition < 2000 || pixel.oxygen < 2000) {
                if (pixel.nutrition < 2000) {
                    pixel.nutrition += 100
                }
                if (pixel.oxygen < 2000) {
                    pixel.oxygen += 100
                }
            }
            if (pixel.burning) {
                pixel.burning = false
            }
        }
        if (elements[pixel.element].id === elements.rotten_meat.id || elements[pixel.element].id === elements.cancer.id) {
            changePixel(pixel,"flesh"); 
        }
        else if (elements[pixel.element].id === elements.bone.id) {
            changePixel(pixel,"real_bone"); 
        }
        else if (elements[pixel.element].id === elements.bone_marrow.id) {
            changePixel(pixel,"real_bone_marrow"); 
        }
        else if (elements[pixel.element].id === elements.skin.id) {
            changePixel(pixel,"epidermis"); 
        }
        else if (elements[pixel.element].id === elements.infected_vessel.id) {
            if (Math.random() < 0.95) {
                changePixel(pixel,"blood_vessel"); 
            }
            else {changePixel(pixel,"white_blood_cell"); }
        }
    },
    canPlace: false,
    category: "tools",
}

elements.drain_health = {
    color: "#AD1300",
    hidden: true,
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tool: function(pixel) {
        if (elements[pixel.element].isBio == true) {
            if (pixel.nutrition > 10 || pixel.oxygen > 10) {
                if (pixel.nutrition > 10) {
                    pixel.nutrition -= 10
                }
                if (pixel.oxygen > 10) {
                    pixel.oxygen -= 10
                }
            }
        }
    },
    canPlace: false,
    category: "tools",
}

elements.toilet = {
    color: "#e1e4dd",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 2403,
    hardness: 0.4,
    breakInto: ["porcelain_shard","porcelain_shard","porcelain_shard","porcelain_shard","porcelain_shard","porcelain_shard","porcelain_shard","water","porcelain_shard","porcelain_shard","porcelain_shard","water","porcelain_shard","porcelain_shard","porcelain_shard","urine","porcelain_shard","porcelain_shard","porcelain_shard","water","porcelain_shard","porcelain_shard","porcelain_shard","water","porcelain_shard","porcelain_shard","porcelain_shard","excreted_poop"],
    noMix: true,
    movable: false,
    tempHigh: 900,
    stateHigh: ["porcelain_shard","porcelain_shard","porcelain_shard","porcelain_shard","porcelain_shard","porcelain_shard","porcelain_shard","water","porcelain_shard","porcelain_shard","porcelain_shard","water","porcelain_shard","porcelain_shard","porcelain_shard","urine","porcelain_shard","porcelain_shard","porcelain_shard","water","porcelain_shard","porcelain_shard","porcelain_shard","water","porcelain_shard","porcelain_shard","porcelain_shard","excreted_poop"],
    tick: function(pixel) {
        var coords = rectCoords(pixel.x-1,pixel.y-1,pixel.x+1,pixel.y+3);
        for (var i = 0; i < coords.length; i++) { // Burn adjacent pixels
            var x = coords[i].x;
            var y = coords[i].y;
            if (!isEmpty(x,y,true)) {
                elements.toilet.tool(pixelMap[x][y]);
            }
        }
    },
    tool: function(pixel) {
        if (elements[pixel.element].isWaste === true) {
            deletePixel(pixel.x,pixel.y)
        }
    },
    canPlace: true,
    hidden: true,
} 

if (!elements.cancer.reactions) { elements.cancer.reactions = {} }
elements.cancer.reactions.attached_hair = { "elem2": "loose_hair", chance:0.4 };
elements.cancer.reactions.hair_end = { "elem2": "loose_hair", chance:0.4 };
elements.cancer.reactions.flesh = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.slimey_flesh = { "elem2": ["slime","cancer"], chance:0.004 };
elements.cancer.reactions.acidic_flesh = { "elem2": ["acid","cancer"], chance:0.004 };
elements.cancer.reactions.cloak_flesh = { "elem2": "cancer", chance:0.004 };
elements.cancer.reactions.adipose = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.blood_vessel = { "elem2": ["cancer","infected_vessel","infected_vessel","infected_vessel","infected_vessel"], chance:0.05 };
elements.cancer.reactions.white_blood_cell = { "elem2": ["cancer","blood","blood_vessel","blood_vessel","infected_vessel"], chance:0.005 };
elements.cancer.reactions.heart = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.kidney = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.liver = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.dermis = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.amphib_dermis = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.scale_dermis = { "elem2": "cancer", chance:0.004 };
elements.cancer.reactions.epidermis = { "elem2": "cancer", chance:0.0002 };
elements.cancer.reactions.amphib_skin = { "elem2": "cancer", chance:0.0003 };
elements.cancer.reactions.hairy_skin = { "elem2": "cancer", chance:0.0003 };
elements.cancer.reactions.hair_dermis = { "elem2": "cancer", chance:0.0003 };
elements.cancer.reactions.scales = { "elem2": "cancer", chance:0.0001 };
elements.cancer.reactions.real_bone = { "elem2": ["bone","bone","cancer"], chance:0.0001 };
elements.cancer.reactions.real_bone_marrow = { "elem2": ["bone","cancer","cancer","cancer","cancer","cancer","cancer"], chance:0.0001 };
elements.cancer.reactions.lungs = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.simple_lung = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.gills = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.brain = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.nerve = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.olfactory_bulb = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.eye = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.sphincter = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.digested_material = { "elem2": "cancer", chance:0.001 };
elements.cancer.reactions.intestines = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.stomach_valve = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.stomach_lining = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.decomposer_stomach = { "elem2": "cancer", chance:0.004 };
elements.cancer.reactions.herbi_stomach = { "elem2": "cancer", chance:0.004 };
elements.cancer.reactions.carni_stomach = { "elem2": "cancer", chance:0.004 };
elements.cancer.reactions.explosive_stomach = { "elem2": ["pop","cancer","cancer","cancer"], chance:0.003 };
elements.cancer.reactions.biotorch = { "elem2": ["cooked_meat","cancer","cancer","cancer"], chance:0.003 };
elements.cancer.reactions.biosensor = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.valve = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.valve_extension = { "elem2": "cancer", chance:0.005 };
elements.cancer.reactions.throat_lining = { "elem2": "cancer", chance:0.005 };

if (!elements.uranium.reactions) { elements.uranium.reactions = {} }
elements.uranium.reactions.attached_hair = { "elem2": "loose_hair", chance:0.4 };
elements.uranium.reactions.hair_end = { "elem2": "loose_hair", chance:0.4 };
elements.uranium.reactions.flesh = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat"], chance:0.5 };
elements.uranium.reactions.slimey_flesh = { "elem2": ["ash","slime","fat","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.4 };
elements.uranium.reactions.acidic_flesh = { "elem2": ["ash","acid","fat","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.4 };
elements.uranium.reactions.cloak_flesh = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.4 };
elements.uranium.reactions.adipose = { "elem2": ["ash","blood","fat","fat","meat","rotten_meat","cooked_meat"], chance:0.5 };
elements.uranium.reactions.blood_vessel = { "elem2": ["ash","blood","blood","blood","blood","blood","infected_vessel","meat","rotten_meat","cooked_meat"], chance:0.5 };
elements.uranium.reactions.heart = { "elem2": ["ash","blood","blood","blood","blood","blood","infected_vessel","meat","rotten_meat","cooked_meat"], chance:0.5 };
elements.uranium.reactions.kidney = { "elem2": ["ash","blood","meat","rotten_meat","cooked_meat"], chance:0.5 };
elements.uranium.reactions.liver = { "elem2": ["ash","blood","meat","rotten_meat","cooked_meat"], chance:0.5 };
elements.uranium.reactions.dermis = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.5 };
elements.uranium.reactions.amphib_dermis = { "elem2": ["ash","blood","slime","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.5 };
elements.uranium.reactions.scale_dermis = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.5 };
elements.uranium.reactions.bug_dermis = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.5 };
elements.uranium.reactions.epidermis = { "elem2": ["cooked_meat","cancer","ash","skin"], chance:0.1 };
elements.uranium.reactions.hairy_skin = { "elem2": ["cooked_meat","cancer","ash","skin","hair"], chance:0.1 };
elements.uranium.reactions.hair_dermis = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.5 };
elements.uranium.reactions.amphib_skin = { "elem2": ["cooked_meat","cancer","ash","skin","slime"], chance:0.4 };
elements.uranium.reactions.scales = { "elem2": ["cooked_meat","cancer","ash","epidermis","skin","dust","calcium"], chance:0.1 };
elements.uranium.reactions.exoskeleton = { "elem2": ["cooked_meat","cancer","ash","epidermis","skin","dust","calcium"], chance:0.1 };
elements.uranium.reactions.real_bone = { "elem2": ["bone","bone","radiation"], chance:0.01 };
elements.uranium.reactions.gills = { "elem2": ["ash","steam","meat","rotten_meat","cooked_meat","flesh"], chance:0.5 };
elements.uranium.reactions.lungs = { "elem2": ["ash","carbon_dioxide","meat","rotten_meat","cooked_meat","flesh","ash","carbon_dioxide","meat","rotten_meat","cooked_meat","flesh","ash","oxygen","meat","rotten_meat","cooked_meat","flesh"], chance:0.5 };
elements.uranium.reactions.simple_lung = { "elem2": ["ash","carbon_dioxide","meat","rotten_meat","cooked_meat","flesh","ash","carbon_dioxide","meat","rotten_meat","cooked_meat","flesh","ash","oxygen","meat","rotten_meat","cooked_meat","flesh"], chance:0.5 };
elements.uranium.reactions.brain = { "elem2": ["ash","steam","salt","meat","rotten_meat","cooked_meat","flesh","cerebrospinal_fluid"], chance:0.5 };
elements.uranium.reactions.amygdala = { "elem2": ["ash","steam","salt","ash","steam","salt","meat","rotten_meat","cooked_meat","flesh"], chance:0.5 };
elements.uranium.reactions.nerve = { "elem2": ["ash","steam","salt","ash","steam","salt","meat","rotten_meat","cooked_meat","flesh"], chance:0.5 };
elements.uranium.reactions.olfactory_bulb = { "elem2": ["ash","steam","salt","ash","steam","salt","meat","rotten_meat","cooked_meat","flesh"], chance:0.5 };
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
elements.uranium.reactions.biotorch = { "elem2": ["cancer","ash","steam","cooked_meat","rotten_meat","cooked_meat","flesh","fire"], chance:0.5 };
elements.uranium.reactions.biosensor = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat"], chance:0.5 };
elements.uranium.reactions.valve = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat"], chance:0.5 };
elements.uranium.reactions.valve_extension = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat"], chance:0.5 };

if (!elements.radiation.reactions) { elements.radiation.reactions = {} }
elements.radiation.reactions.attached_hair = { "elem2": "loose_hair", chance:0.4 };
elements.radiation.reactions.hair_end = { "elem2": "loose_hair", chance:0.4 };
elements.radiation.reactions.flesh = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.4 };
elements.radiation.reactions.slimey_flesh = { "elem2": ["ash","slime","fat","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.4 };
elements.radiation.reactions.acidic_flesh = { "elem2": ["ash","acid","fat","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.4 };
elements.radiation.reactions.cloak_flesh = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.4 };
elements.radiation.reactions.adipose = { "elem2": ["ash","blood","fat","fat","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.4 };
elements.radiation.reactions.blood_vessel = { "elem2": ["ash","blood","blood","blood","blood","blood","infected_vessel","meat","rotten_meat","cooked_meat"], chance:0.4 };
elements.radiation.reactions.heart = { "elem2": ["ash","blood","blood","blood","blood","infected_vessel","blood","meat","rotten_meat","cooked_meat"], chance:0.4 };
elements.radiation.reactions.kidney = { "elem2": ["ash","blood","meat","rotten_meat","cooked_meat"], chance:0.5 };
elements.radiation.reactions.liver = { "elem2": ["ash","blood","meat","rotten_meat","cooked_meat"], chance:0.5 };
elements.radiation.reactions.dermis = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.4 };
elements.radiation.reactions.amphib_dermis = { "elem2": ["ash","blood","slime","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.4 };
elements.radiation.reactions.scale_dermis = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.4 };
elements.radiation.reactions.scales = { "elem2": ["cooked_meat","cancer","ash","epidermis","skin","dust","calcium"], chance:0.1 };
elements.radiation.reactions.exoskeleton = { "elem2": ["cooked_meat","cancer","ash","epidermis","skin","dust","calcium"], chance:0.1 };
elements.radiation.reactions.bug_dermis = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.4 };
elements.radiation.reactions.epidermis = { "elem2": ["cooked_meat","cancer","ash","skin"], chance:0.1 };
elements.radiation.reactions.hairy_skin = { "elem2": ["cooked_meat","cancer","ash","skin","hair"], chance:0.1 };
elements.radiation.reactions.hair_dermis = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat","cancer","cancer"], chance:0.4 };
elements.radiation.reactions.amphib_skin = { "elem2": ["cooked_meat","cancer","ash","skin","slime"], chance:0.1 };
elements.radiation.reactions.real_bone = { "elem2": ["bone","bone","radiation"], chance:0.01 };
elements.radiation.reactions.gills = { "elem2": ["ash","steam","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 };
elements.radiation.reactions.lungs = { "elem2": ["cancer","ash","carbon_dioxide","meat","rotten_meat","cooked_meat","flesh","ash","carbon_dioxide","meat","rotten_meat","cooked_meat","flesh","ash","oxygen","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 };
elements.radiation.reactions.simple_lung = { "elem2": ["cancer","ash","carbon_dioxide","meat","rotten_meat","cooked_meat","flesh","ash","carbon_dioxide","meat","rotten_meat","cooked_meat","flesh","ash","oxygen","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 };
elements.radiation.reactions.brain = { "elem2": ["cancer","ash","steam","salt","meat","rotten_meat","cooked_meat","flesh","cerebrospinal_fluid"], chance:0.4 };
elements.radiation.reactions.amygdala = { "elem2": ["cancer","ash","steam","salt","ash","steam","salt","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 };
elements.radiation.reactions.nerve = { "elem2": ["cancer","ash","steam","salt","ash","steam","salt","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 };
elements.radiation.reactions.olfactory_bulb = { "elem2": ["cancer","ash","steam","salt","ash","steam","salt","meat","rotten_meat","cooked_meat","flesh"], chance:0.4 };
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
elements.radiation.reactions.biotorch = { "elem2": ["cancer","ash","steam","cooked_meat","rotten_meat","cooked_meat","flesh","fire"], chance:0.4 };
elements.radiation.reactions.biosensor = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat"], chance:0.4 };
elements.radiation.reactions.valve = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat"], chance:0.4 };
elements.radiation.reactions.valve_extension = { "elem2": ["ash","blood","fat","meat","rotten_meat","cooked_meat"], chance:0.4 };

if (!elements.plague.reactions) { elements.plague.reactions = {} }
elements.plague.reactions.attached_hair = { "elem2": "loose_hair", chance:0.04 };
elements.plague.reactions.hair_end = { "elem2": "loose_hair", chance:0.04 };
elements.plague.reactions.flesh = { "elem2": ["rotten_meat","plague","fat","meat","rotten_meat","plague","infection","infection"], chance:0.04 };
elements.plague.reactions.slimey_flesh = { "elem2": ["slime","slime","rotten_meat","plague","fat","meat","rotten_meat","plague","infection","infection"], chance:0.04 };
elements.plague.reactions.cloak_flesh = { "elem2": ["rotten_meat","plague","fat","meat","rotten_meat","plague","infection","infection"], chance:0.04 };
elements.plague.reactions.acidic_flesh = { "elem2": ["acid","rotten_meat","steam","meat","rotten_meat","plague","flesh"], chance:0.04 };
elements.plague.reactions.adipose = { "elem2": ["rotten_meat","plague","fat","fat","meat","rotten_meat","plague","infection","infection"], chance:0.04 };
elements.plague.reactions.blood_vessel = { "elem2": ["rotten_meat","plague","meat","rotten_meat","plague","infected_vessel","infected_vessel","infected_vessel","infected_vessel","infected_vessel","infected_vessel"], chance:0.1 };
elements.plague.reactions.heart = { "elem2": ["rotten_meat","plague","meat","rotten_meat","plague","infected_vessel","infection","infection","infection","infection","infection"], chance:0.04 };
elements.plague.reactions.kidney = { "elem2": ["rotten_meat","plague","rotten_meat","meat","rotten_meat","plague","infection","infection"], chance:0.04 };
elements.plague.reactions.liver = { "elem2": ["rotten_meat","plague","rotten_meat","meat","rotten_meat","plague","infection","infection"], chance:0.04 };
elements.plague.reactions.dermis = { "elem2": ["rotten_meat","infection","fat","meat","rotten_meat","plague","infection","infection"], chance:0.04 };
elements.plague.reactions.hair_dermis = { "elem2": ["rotten_meat","infection","fat","meat","rotten_meat","plague","infection","infection"], chance:0.04 };
elements.plague.reactions.hairy_skin = { "elem2": ["plague","infection","rotten_meat","dust","dust","hair"], chance:0.04 };
elements.plague.reactions.amphib_dermis = { "elem2": ["rotten_meat","infection","slime","meat","rotten_meat","plague","infection","infection"], chance:0.01 };
elements.plague.reactions.scale_dermis = { "elem2": ["rotten_meat","infection","fat","meat","rotten_meat","plague","infection","infection"], chance:0.04 };
elements.plague.reactions.epidermis = { "elem2": ["plague","infection","rotten_meat","dust","dust"], chance:0.01 };
elements.plague.reactions.amphib_skin = { "elem2": ["plague","infection","rotten_meat","skin","slime"], chance:0.01 };
elements.plague.reactions.scales = { "elem2": ["plague","infection","rotten_meat","dust","skin","calcium"], chance:0.01 };
elements.plague.reactions.real_bone = { "elem2": ["bone","bone","infection","plague"], chance:0.01 };
elements.plague.reactions.gills = { "elem2": ["infection","steam","meat","rotten_meat","plague","flesh","plague"], chance:0.05 };
elements.plague.reactions.lungs = { "elem2": ["infection","rotten_meat","carbon_dioxide","meat","rotten_meat","plague","flesh","rotten_meat","carbon_dioxide","meat","rotten_meat","plague","flesh","rotten_meat","oxygen","meat","rotten_meat","plague","flesh"], chance:0.1 };
elements.plague.reactions.simple_lung = { "elem2": ["infection","rotten_meat","carbon_dioxide","meat","rotten_meat","plague","flesh","rotten_meat","carbon_dioxide","meat","rotten_meat","plague","flesh","rotten_meat","oxygen","meat","rotten_meat","plague","flesh"], chance:0.04 };
elements.plague.reactions.brain = { "elem2": ["infection","rotten_meat","steam","salt","meat","rotten_meat","plague","flesh","cerebrospinal_fluid"], chance:0.04 };
elements.plague.reactions.amygdala = { "elem2": ["infection","rotten_meat","steam","salt","rotten_meat","steam","salt","meat","rotten_meat","plague","flesh"], chance:0.04 };
elements.plague.reactions.nerve = { "elem2": ["infection","rotten_meat","steam","salt","rotten_meat","steam","salt","meat","rotten_meat","plague","flesh"], chance:0.04 };
elements.plague.reactions.olfactory_bulb = { "elem2": ["infection","rotten_meat","steam","salt","rotten_meat","steam","salt","meat","rotten_meat","plague","flesh"], chance:0.04 };
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
elements.plague.reactions.biotorch = { "elem2": ["infection","ash","steam","cooked_meat","rotten_meat","plague","plague","fire"], chance:0.04 };
elements.plague.reactions.biosensor = { "elem2": ["infection","blood","fat","meat","rotten_meat","plague"], chance:0.04 };
elements.plague.reactions.valve = { "elem2": ["infection","infection","fat","meat","rotten_meat","plague"], chance:0.04 };
elements.plague.reactions.valve_extension = { "elem2": ["infection","infection","plague","meat","rotten_meat","plague"], chance:0.04 };

if (!elements.infection.reactions) { elements.infection.reactions = {} }
elements.infection.reactions.blood_vessel = { "elem2": ["infection","infected_vessel","infected_vessel","infected_vessel","infected_vessel","infected_vessel","infected_vessel","infected_vessel"], chance:0.1 };
elements.infection.reactions.heart = { "elem2": ["infection","infected_vessel","infection","infection","infection","infection","infected_vessel","infected_vessel"], chance:0.02 };

if (!elements.fly.reactions) { elements.infection.reactions = {} }
elements.fly.reactions.poop = { elem2:[null,null,"stench"], chance:0.15, func:behaviors.FEEDPIXEL };

if (!elements.stench.reactions) { elements.infection.reactions = {} }
elements.stench.reactions.intestines = { elem1:[null,null,null,null,null,null,"foam"], chance:0.005, };
elements.stench.reactions.stomach_valve = { elem1:[null,null,null,null,null,null,"foam"], chance:0.015, };

elements.bless.reactions.poop = { elem2:null }
elements.bless.reactions.excreted_poop = { elem2:null }
elements.bless.reactions.infected_vessel = { elem2:["blood_vessel","blood_vessel","blood_vessel","blood_vessel","blood_vessel","blood_vessel","white_blood_cell"] }
elements.bless.reactions.urine = { elem2:"water" }
elements.bless.tool = function(pixel) {
    if (elements.bless.ignore.indexOf(pixel.element) !== -1) { return; }
    if (pixel.burning && !elements[pixel.element].burning) { // stop burning
        delete pixel.burning;
        delete pixel.burnStart;
    }
    if (!elements[pixel.element].insulate) {
        if (pixel.temp > 100) {
            pixel.temp = (pixel.temp+100)/2;
            pixelTempCheck(pixel);
            if (pixel.del) {return}
        }
        if (pixel.temp < -200) {
            pixel.temp = (pixel.temp-200)/2;
            pixelTempCheck(pixel);
            if (pixel.del) {return}
        }
    }
    if (pixel.origColor) {
        pixel.color = "rgb("+pixel.origColor.join(",")+")";
        delete pixel.origColor;
    }
    if (pixel.charge) {
        delete pixel.charge;
        pixel.chargeCD = 16;
    }
    if (elements.bless.reactions[pixel.element] && Math.random()<0.25) {
        var r = elements.bless.reactions[pixel.element];
        var elem2 = r.elem2;
        if (elem2 !== undefined) {
            if (Array.isArray(elem2)) { elem2 = elem2[Math.floor(Math.random()*elem2.length)]; }
            if (elem2 === null) { deletePixel(pixel.x,pixel.y) }
            else { changePixel(pixel, elem2); }
        }
        if (r.func) { r.func(pixel,pixel) }
        if (r.color2) { pixel.color = pixelColorPick(pixel,r.color2) }
    }
    if (elements[pixel.element].isBio == true) {
        if (pixel.nutrition < 2000 || pixel.oxygen < 2000) {
            if (pixel.nutrition < 2000) {
                pixel.nutrition += 100
            }
            if (pixel.oxygen < 2000) {
                pixel.oxygen += 100
            }
            if (pixel.speed < 0) {
                pixel.oxygen += 10
            }
        }
        if (pixel.burning) {
            pixel.burning = false
        }
    }
}

elements.dna.reactions.juice = { "elem1": null, "elem2": "elixir", chance:0.01 };

elements.acid.ignore = ["herbi_stomach","carni_stomach","decomposer_stomach","amphib_skin","amphib_dermis","acidic_flesh","acid_vessel","explosive_stomach","stomach_valve","stomach_lining","throat_lining","glass","rad_glass","glass_shard","rad_shard","stained_glass","baked_clay","acid_gas","neutral_acid","acid_cloud","water","salt_water","sugar_water","dirty_water","copper","gold","porcelain","plastic","bead","microplastic","molten_plastic","pool_water","chlorine","hydrogen","gold_coin","silver","nickel","calcium","bone","earthquake","tornado","tsunami","liquid_light","sensor"]

elements.dirty_water.isWaste = true;
