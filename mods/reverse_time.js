emptyList = []

runPerPixel(function(pixel) {
    // run any code on each pixel every tick
    if (pixel.start>pixelTicks) {
        if (pixel.olderelement != undefined && pixel.oldercolor != undefined && pixel.olderstart != undefined && pixel.oldertemp != undefined && pixel.olderanimal != undefined && pixel.olderage != undefined) {
            OGChangePixel(pixel)
        }
        else {
            deletePixel(pixel.x,pixel.y) 
        }
    } /*
    if (pixel.start>pixelTicks+10) {
        deletePixel(pixel.x,pixel.y) 
    } */
    if (pixel.burnStart && pixel.burnStart>pixelTicks) {
        if (pixel.burning) {
			delete pixel.burning;
			delete pixel.burnStart;
		}
    }
    if (pixel.origColor && !pixel.stainStart) {
        pixel.stainStart = pixelTicks
    }
    if (pixel.stainStart && pixel.origColor && pixel.stainStart>pixelTicks) {
        pixel.color = "rgb("+pixel.origColor[0]+","+pixel.origColor[1]+","+pixel.origColor[2]+")"
        delete pixel.origColor
        delete pixel.stainStart
    }
})
  

changePixel = function(pixel,element,changetemp=true) {
    if (!element) { return }
    if (elements[pixel.element].onChange !== undefined) {
        elements[pixel.element].onChange(pixel,element);
    }
    if (!elements[element]) {
        pixel.invalidElement = element;
        element = "unknown"
    }
    if (!pixel.olderelement) {
        pixel.olderelement = []
    }
    if (!pixel.oldercolor) {
        pixel.oldercolor = []
    }
    if (!pixel.olderstart) {
        pixel.olderstart = []
    }
    if (!pixel.oldertemp) {
        pixel.oldertemp = []
    }
    if (!pixel.olderanimal) {
        pixel.olderanimal = []
    }
    if (!pixel.olderage) {
        pixel.olderage = []
    }
    for (var i = 0; i <= 500; i++) {
        if (!pixel.olderelement[i]) {
            pixel.olderelement[i] = pixel.element
            if (pixel.element === "human") {
                pixel.olderelement[i] = "head"
            }
            break;
        }
    }
    for (var i = 0; i <= 500; i++) {
        if (!pixel.oldercolor[i]) {
            pixel.oldercolor[i] = pixel.color
            break;
        }
    }
    for (var i = 0; i <= 500; i++) {
        if (!pixel.olderstart[i]) {
            pixel.olderstart[i] = pixel.start
            break;
        }
    }
    for (var i = 0; i <= 500; i++) {
        if (!pixel.oldertemp[i]) {
            pixel.oldertemp[i] = pixel.temp
            if (elements[pixel.element].tempHigh && elements[pixel.element].tempHigh < pixel.temp) {
                pixel.oldertemp[i] = (elements[pixel.element].tempHigh - 1.5)
            }
            if (elements[pixel.element].tempLow && elements[pixel.element].tempLow > pixel.temp) {
                pixel.oldertemp[i] = (elements[pixel.element].tempLow + 1.5)
            }
            break;
        }
    }
    for (var i = 0; i <= 500; i++) {
        if (!pixel.olderanimal[i]) {
            pixel.olderanimal[i] = pixel.animal
            if (!pixel.animal) {
                pixel.olderanimal[i] = pixel.element
            }
            break;
        }
    }
    for (var i = 0; i <= 500; i++) {
        if (!pixel.olderage[i]) {
            pixel.olderage[i] = pixel.age
            if (!pixel.age) {
                pixel.olderage[i] = pixel.start
            }
            break;
        }
    }
    pixel.element = element;
    pixel.color = pixelColorPick(pixel);
    pixel.start = pixelTicks;
    var elementInfo = elements[element];
    if (elementInfo.burning == true) {
        pixel.burning = true;
        pixel.burnStart = pixelTicks;
    }
    else if (pixel.burning && !elementInfo.burn) {
        delete pixel.burning;
        delete pixel.burnStart;
    }
    delete pixel.origColor; // remove stain
    delete pixel.clone;
    if (pixel.glow !== undefined) {
        delete pixel.glow;
    }
    if (pixel.r && !elementInfo.rotatable) {
        delete pixel.r;
    }
    if (pixel.flipX && !elementInfo.flippableX) {
        delete pixel.flipX;
    }
    if (pixel.flipY && !elementInfo.flippableY) {
        delete pixel.flipY;
    }
    // If elementInfo.flippableX, set it to true or false randomly
    if (elementInfo.flipX !== undefined) { pixel.flipX = elementInfo.flipX }
    else if (elementInfo.flippableX) {
        pixel.flipX = Math.random() >= 0.5;
    }
    // If elementInfo.flippableY, set it to true or false randomly
    if (elementInfo.flipY !== undefined) { pixel.flipY = elementInfo.flipY }
    else if (elementInfo.flippableY) {
        pixel.flipY = Math.random() >= 0.5;
    }
    if (elementInfo.temp !== undefined && changetemp) {
        pixel.temp = (elementInfo.temp+pixel.temp)/2;
        pixelTempCheck(pixel)
    }
    if (pixel.con && !elementInfo.canContain) {
        delete pixel.con;
    }
    // If elementInfo.properties, set each key to its value
    if (elementInfo.properties !== undefined) {
        for (var key in elementInfo.properties) {
            // If it is an array or object, make a copy of it
            if (typeof elementInfo.properties[key] == "object") {
                pixel[key] = JSON.parse(JSON.stringify(elementInfo.properties[key]));
            }
            else {
                pixel[key] = elementInfo.properties[key];
            }
        }
    }
    if (pixel.alpha !== undefined) {
        delete pixel.alpha;
    }
    if (pixel.emit) {
        delete pixel.emit;
    }
    if (elements[element].alpha !== undefined) {
        pixel.alpha = elements[element].alpha;
    }
    if (elements[element].onPlace !== undefined) {
        elements[element].onPlace(pixel);
    }
    checkUnlock(element);
}

OGChangePixel = function(pixel) {
    if (pixel.olderelement != undefined && pixel.oldercolor != undefined && pixel.olderstart != undefined && pixel.oldertemp != undefined && pixel.olderanimal != undefined && pixel.olderage != undefined && pixel.olderelement.length > emptyList.length && pixel.oldercolor.length > emptyList.length && pixel.olderstart.length > emptyList.length && pixel.oldertemp.length > emptyList.length && pixel.olderanimal.length > emptyList.length && pixel.olderage.length > emptyList.length && pixel.start<pixelTicks+5) {
        pixel.element = pixel.olderelement[(pixel.olderelement.length - 1)]
        pixel.color = pixel.oldercolor[(pixel.oldercolor.length - 1)]
        pixel.start = pixel.olderstart[(pixel.olderstart.length - 1)]
        pixel.temp = pixel.oldertemp[(pixel.oldertemp.length - 1)]
        pixel.animal = pixel.olderanimal[(pixel.olderanimal.length - 1)]
        pixel.age = pixel.olderage[(pixel.olderage.length - 1)]
        pixel.olderelement.pop()
        pixel.oldercolor.pop()
        pixel.olderstart.pop()
        pixel.oldertemp.pop()
        pixel.olderanimal.pop()
        pixel.olderage.pop()
    }
    else {
        deletePixel(pixel.x,pixel.y) 
    }
} 

elements.reverse_time = {
    color: "#f2eeb8",
    tool: function(pixel) {},
    perTick: function() {
        pixelTicks -= 2;
    }, 
    category: "tools",
    canPlace: false,
    darkText: true,
} 
/*

elements.egg = {
	color: "#e0d3ab",
	tick: function(pixel) {
        if (!pixel.animal && pixel.start>pixelTicks) {
            deletePixel(pixel.x,pixel.y)
        }
        else if (pixel.animal && pixel.start-pixelTicks >= 500 && Math.random() < 0.2) {
            deletePixel(pixel.x,pixel.y)
        }
		if (pixel.start === pixelTicks) {return}
		if (pixel.drag) pixel.fall = 0;
		if (!tryMove(pixel, pixel.x, pixel.y+1)) {
			if (pixel.animal || pixel.fall < 20) {
				if (Math.random() < 0.5) {
					if (!tryMove(pixel, pixel.x+1, pixel.y+1)) {
						tryMove(pixel, pixel.x-1, pixel.y+1);
					}
				} else {
					if (!tryMove(pixel, pixel.x-1, pixel.y+1)) {
						tryMove(pixel, pixel.x+1, pixel.y+1);
					}
				}
				pixel.fall = 0;
			}
			else if (outOfBounds(pixel.x,pixel.y+1) || (!isEmpty(pixel.x,pixel.y+1,true) && elements.egg.ignore.indexOf(pixelMap[pixel.x][pixel.y+1].element) === -1 && elements[pixelMap[pixel.x][pixel.y+1].element].state === "solid")) {
				changePixel(pixel,"yolk")
			}
			else {pixel.fall = 0}
			if (pixel.animal && pixelTicks-pixel.start >= 500 && Math.random() < 0.2) {
				changePixel(pixel,pixel.animal)
			}
		}
		else {pixel.fall ++}
		if (pixel.temp < -2 || pixel.temp > 100) {
			pixel.animal = null;
		}
		doDefaults(pixel);
	},
	ignore: ["paper","sponge","straw","wheat","rat","frog","pollen","clay","snow","mud","wet_sand","tinder","feather","bread","ice_cream","dough"],
	innerColor: "#ffffff",
	properties: { "fall":0 },
	tempHigh: 1500,
	stateHigh: ["steam","calcium","carbon_dioxide","sulfur_gas"],
	breakInto: "yolk",
	category: "food",
	state: "solid",
	density: 1031,
	cooldown: defaultCooldown
}

elements.tadpole = {
	color: "#87b574",
	behavior: [
		"XX|XX|M2%25 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%14",
		"XX|FX%0.5|SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%14",
		"XX|M1|SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%14",
	],
	tick: function(pixel) {
        if (pixel.start-pixelTicks > 500) {
			OGChangePixel(pixel,"egg")
            pixel.color = pixelColorPick(pixel,"#717c80")
            pixel.animal = "tadpole"
		}
        if (pixelTicks-pixel.start > 500) {
			changePixel(pixel,"frog");
		}
	},
	reactions: {
		"algae": { elem2:null, chance:0.25 },
		"kelp": { elem2:"water", chance:0.25 }
	},
	tempHigh: 100,
	stateHigh: "steam",
	tempLow: -10,
	stateLow: "ice",
	breakInto: ["slime",null],
	category:"life",
	hidden: true,
	state: "solid",
	density: 1450,
	conduct: 0.2
}

elements.frog = {
	color: "#607300",
	behavior: [
		"XX|XX|M2%3 AND SW:water,salt_water,sugar_water,dirty_water,seltzer%7",
		"XX|FX%0.5|CR:slime%0.01 AND BO",
		"XX|M1|XX",
	],
	reactions: {
		"fly": { elem2:null, chance:0.5, func:behaviors.FEEDPIXEL },
		"firefly": { elem1:"meat", elem2:null, chance:0.5 },
		"stink_bug": { elem2:null, chance:0.55, func:behaviors.FEEDPIXEL },
		"snail": { elem2:"limestone", chance:0.05, func:behaviors.FEEDPIXEL },
		"slug": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
		"worm": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
		"spider": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
		"algae": { elem2:null, chance:0.5, func:behaviors.FEEDPIXEL },
		"kelp": { elem2:"water", chance:0.5, func:behaviors.FEEDPIXEL },
		"oxygen": { elem2:"carbon_dioxide", chance:0.5 },
		"dead_bug": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
		"mercury": { elem1:"rotten_meat", chance:0.1 },
		"bleach": { elem1:"rotten_meat", chance:0.1 },
		"infection": { elem1:"rotten_meat", chance:0.025 },
		"uranium": { elem1:"rotten_meat", chance:0.1 },
		"cyanide": { elem1:"rotten_meat", chance:0.1 },
		"chlorine": { elem1:"meat", chance:0.1 },
		"alcohol": { elem1:"meat", chance:0.025 },
		"dirty_water": { elem1:"rotten_meat", chance:0.0001 },
		"pool_water": { elem1:"rotten_meat", chance:0.005 },
		"vinegar": { elem1:"rotten_meat", chance:0.001 },
	},
    tick: function(pixel) {
		if (pixelTicks < pixel.start) {
			OGChangePixel(pixel,"tadpole");
		}
	},
	foodNeed: 10,
	baby: "tadpole",
	eggColor:"#717c80",
	temp: 19.1,
	tempHigh: 100,
	stateHigh: "cooked_meat",
	stateHighColor: "#CDAF96",
	onStateHigh: function(pixel) {
		releaseElement(pixel,"steam");
	},
	tempLow: -18,
	stateLow: "frozen_frog",
	category:"life",
	breakInto: "slime",
	burn:15,
	burnTime:300,
	state: "solid",
	density: 1450,
	conduct: 0.2
}

elements.fly = {
	color: "#4c4e42",
	behaviorOn: [
		"XX|CR:flash|XX",
		"CR:flash|CH:ash|CR:flash",
		"XX|CR:flash|XX",
	],
	reactions: {
		"dead_plant": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
		"meat": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
		"cooked_meat": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
		"rotten_meat": { elem2:[null,null,"ammonia"], chance:0.15, func:behaviors.FEEDPIXEL },
		"cheese": { elem2:[null,null,"ammonia"], chance:0.15, func:behaviors.FEEDPIXEL },
		"cheese_powder": { elem2:[null,null,"ammonia"], chance:0.15, func:behaviors.FEEDPIXEL },
		"rotten_cheese": { elem2:[null,null,"ammonia"], chance:0.15, func:behaviors.FEEDPIXEL },
		"vine": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
		"corn": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
		"potato": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
		"crumb": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
		"wheat": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"yeast": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
		"caramel": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
		"bread": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
		"sugar_water": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
		"honey": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
		"soda": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL }
	},
    tick: function(pixel, onHit) {
        var nx = pixel.flipX ? -1 : 1;
        var ny = Math.random() < 0.5 ? -1 : 1;
        var hit = false;
        if (!tryMove(pixel, pixel.x+nx, pixel.y+ny)) {
            if (!tryMove(pixel, pixel.x+nx, pixel.y-ny)) {
                if (!tryMove(pixel, pixel.x, pixel.y+ny)) {
                    if (!tryMove(pixel, pixel.x, pixel.y-ny)) {hit=[pixel.x, pixel.y-ny]}
                }else {hit=[pixel.x, pixel.y+ny]}
            }else {hit=[pixel.x+nx, pixel.y-ny]}
        }else {hit=[pixel.x+nx, pixel.y+ny]}
        if (hit && onHit) {
            if (!isEmpty(hit[0], hit[1], true)) {
                onHit(pixel, pixelMap[hit[0]][hit[1]]);
            }
            else {onHit(pixel);}
        }
        if (pixel.del) {return}
        if (!isEmpty(pixel.x+nx,pixel.y) || Math.random() < 0.02) {
            pixel.flipX = !pixel.flipX;
        }
        if (pixel.charge && elements[pixel.element].behaviorOn) {
            pixelTick(pixel)
        }
        doDefaults(pixel);
        if (pixel.start-pixelTicks > 500) {
			OGChangePixel(pixel,"egg")
            pixel.animal = "fly"
		}
	},
	foodNeed: 15,
	tempHigh: 100,
	stateHigh: "ash",
	tempLow: 0,
	stateLow: "dead_bug",
	breakInto: "dead_bug",
	category:"life",
	burn:95,
	burnTime:25,
	state: "solid",
	density: 600,
	conduct: 1
} */