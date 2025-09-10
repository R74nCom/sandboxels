window.addEventListener("load", () => { 
    document.getElementById("elementButton-volcano_form")?.remove()
    document.getElementById("elementButton-volcano_core")?.remove()
    document.getElementById("elementButton-erupting_magma")?.remove()
    document.getElementById("elementButton-rock_formation")?.remove()
    document.getElementById("elementButton-rapid_snow")?.remove()
    document.getElementById("elementButton-sticky_snow")?.remove()
})

elements.tornado.maxSize = 0
elements.earthquake.maxSize = 0
elements.blaster.maxSize = 0
elements.armageddon.maxSize = 0

elements.volcano = {
    color:  ["#ff6f00","#ff8c00","#ff4d00"],
    behavior: [
		"XX|XX|XX",
		"XX|XX|XX",
		"M2|M1 AND EX:10>volcano_form,volcano_form,volcano_form,volcano_form,volcano_form,volcano_form,volcano_form,pyrocumulus|M2",
	],
    category: "weapons",
    temp:940,
    state: "solid",
    density: 100000000,
    category: "weapons",
	maxSize: 0,
	cooldown: defaultCooldown,
	excludeRandom: true,
}

elements.volcano_form = {
    color:  ["#ff6f00","#ff8c00","#ff4d00"],
    behavior: [
        "XX|M1|XX",
        "CR:rock_formation|CH:volcano_core|CR:rock_formation",
        "CR:rock_formation|CR:rock_formation|CR:rock_formation",
    ],
    hidden: true,
    category: "weapons",
    temp:940,
    state: "solid",
    density: 2725,
}
elements.volcano_core = {
    color:  ["#ff6f00","#ff8c00","#ff4d00"],
    tick: function(pixel) {
        if (pixel.age && pixel.age > 150) {
            explodeAt(pixel.x, pixel.y, 3, ["erupting_magma","volcano_core","erupting_magma","erupting_magma","erupting_magma","erupting_magma","erupting_magma","pyrocumulus"]);
            releaseElement(pixel, "pyrocumulus")
        }
        else {
            if (!pixel.age) {
                pixel.age = 1
            }
            else if (pixel.age) {
                pixel.age++
            }
        }
        if (pixel.temp < 900) {
            pixel.temp += 40
        }
    },
    hidden: true,
    category: "weapons",
    temp:940,
    state: "solid",
    density: 2725,
}

elements.erupting_magma = {
    color:  ["#ff6f00","#ff8c00","#ff4d00"],
    behavior: [
        "M2 AND HT:10|M1 AND SW:rock,tuff,basalt,magma AND CH:rock,tuff,basalt>magma AND HT:10|M2 AND HT:10",
        "HT:10|DL%1 AND HT:5|HT:10",
        "CR:magma AND HT:10|CR:magma AND HT:10|CR:magma AND HT:10",
    ],
    tick: function(pixel) {
        if (pixel.y < 8) {
            changePixel(pixel,"magma")
            explodeAt(pixel.x, pixel.y, 8, ["magma","magma","magma","magma","magma","magma","pyrocumulus"]);
            releaseElement(pixel, "pyrocumulus")
        }
        if (pixel.temp < 900) {
            pixel.temp += 40
        }
    },
    hidden: true,
    category: "weapons",
    state: "solid",
    temp:940,
    density: 2725,
}

elements.rock_formation = {
    color:  ["#ff6f00","#ff8c00","#ff4d00"],
    behavior: [
        "M2|M1|M2",
        "CR:rock,tuff,rock,tuff,rock,tuff,basalt|DL%1.5|CR:rock,tuff,rock,tuff,rock,tuff,basalt",
        "CR:rock,tuff,rock,tuff,rock,tuff,basalt|CR:rock,tuff,rock,tuff,rock,tuff,basalt|CR:rock,tuff,rock,tuff,rock,tuff,basalt",
    ],
    hidden: true,
    tick: function(pixel) {
        if (pixel.y < 10) {
            changePixel(pixel,"rock")
            releaseElement(pixel, "pyrocumulus")
        }
    },
    category: "weapons",
    temp:900,
    state: "solid",
    density: 2725,
}

elements.avalanche = {
    color: ["#e1f8fc","#b2daeb","#bcdde3"],
	tick: function(pixel) {
		if (pixel.stage) {
			var coords = circleCoords(pixel.x,pixel.y,pixel.stage);
			var coords = rectCoords(Math.floor(pixel.x-pixel.stage/2),pixel.y-pixel.stage,Math.floor(pixel.x+pixel.stage/2),pixel.y);
			if (pixel.stage >= pixel.mag) {
				deletePixel(pixel.x,pixel.y);
				return;
			}
			coords.forEach(function(coord){
				var x = coord.x;
				var y = coord.y;
				if (!isEmpty(x,y,true)) {
					var p = pixelMap[x][y];
					if (p.element === "avalanche") {
						if (pixel !== p) {
							pixel.mag = Math.min(pixel.mag+3,40);
							deletePixel(p.x,p.y);
						}
						return;
					}
					if (isBreakable(p)) {
						if (Math.random() < (elements[p.element].hardness || 1) * 0.1) {
							breakPixel(p);
						}
					}
					if (!elements[p.element].movable) { return }
					if (!p.del && Math.random() < 0.1) { tryMove(p,p.x,p.y-1); }
				}
				else if (isEmpty(x,y)) {
					createPixel(pixel.clone||"rapid_snow",x,y);
				}
			})
			pixel.stage++;
		}
		else if (!tryMove(pixel,pixel.x,pixel.y+1)) {
			if (!isEmpty(pixel.x,pixel.y+1,true)) {
				var elem = pixelMap[pixel.x][pixel.y+1].element;
				if (elem === "avalanche") { return }
				pixel.clone = "rapid_snow";
			}
			else {
				pixel.clone = "rapid_snow";
			}
			// random 10 to 20
			pixel.mag = Math.floor(Math.random() * 15) + 20;
			pixel.stage = 1;
		}
	},
    temp: -10,
	category: "weapons",
	state: "liquid",
	maxSize: 0,
	density: 997,
	cooldown: defaultCooldown,
	excludeRandom: true,
}

elements.rapid_snow = {
    color: "#e1f8fc",
    tick: function(pixel) {
        if (pixel.start === pixelTicks) {
            pixel.lastTrapped = pixelTicks
            return
        }
	    if (pixel.charge && elements[pixel.element].behaviorOn) {
		pixelTick(pixel);
	    	return;
	    }
	    if (!tryMove(pixel, pixel.x, pixel.y+1)) {
	    	// go either left or right depending on pixel.flipX
	    	var newx = pixel.flipX ? pixel.x-1 : pixel.x+1;
	    	if (Math.random() < 0.5) {
	    		if (!tryMove(pixel, newx, pixel.y)) {
                    if (!isEmpty(newx, pixel.y,true) || !outOfBounds(newx, pixel.y)) {
                        if (isBreakable(pixelMap[newx][pixel.y])) {
                            breakPixel(pixelMap[newx][pixel.y]);
                        }
                    }
                    else if ((outOfBounds(newx,pixel.y) || pixelMap[newx][pixel.y].element != "rapid_snow" && pixelMap[newx][pixel.y].element != "snow" && pixelMap[newx][pixel.y].element != "sticky_snow" && elements[pixelMap[newx][pixel.y].element].state != "liquid" && elements[pixelMap[newx][pixel.y].element].state != "gas") && Math.random() > 0.75) {
                        changePixel(pixel,"sticky_snow")
                    }
                    if (!outOfBounds(newx,pixel.y) && (pixelMap[newx][pixel.y].element == "snow" || pixelMap[newx][pixel.y].element == "sticky_snow") || !outOfBounds(newx,pixel.y) && Math.random() > 0.5 && pixelMap[newx][pixel.y].element != "rapid_snow") {
                        if (!tryMove(pixelMap[newx][pixel.y],newx+1,pixel.y) && !tryMove(pixelMap[newx][pixel.y],newx-1,pixel.y)) {
                            swapPixels(pixel,pixelMap[newx][pixel.y])
                        }
                    }
                    pixel.flipX = !pixel.flipX;
                    tryMove(pixel, newx, pixel.y+1);
                    if (pixelTicks-pixel.lastTrapped > 1000) {
                        shuffleArray(squareCoordsShuffle);
                        for (var i = 0; i < squareCoordsShuffle.length; i++) {
                            var x = pixel.x+squareCoordsShuffle[i][0];
                            var y = pixel.y+squareCoordsShuffle[i][1];
                            if (isEmpty(x,y)) {
                                pixel.lastTrapped = pixelTicks
                                break;
                            }
                            else {
                                changePixel(pixel,"sticky_snow")
                                break;
                            }
                        }
                    }
	    		}
	    	}
	    	else {
	    		if (!tryMove(pixel, newx, pixel.y+1)) {
	    			if (!tryMove(pixel, newx, pixel.y)) { pixel.flipX = !pixel.flipX; }
	    		}
	    	}
	    }
        if (outOfBounds(pixel.x,pixel.y+1) || !isEmpty(pixel.x,pixel.y+1,true)) {
            if (outOfBounds(pixel.x,pixel.y+1) || pixelMap[pixel.x][pixel.y+1].element != "rapid_snow" && pixelMap[pixel.x][pixel.y+1].element != "snow" && pixelMap[pixel.x][pixel.y+1].element != "sticky_snow" && pixelMap[pixel.x][pixel.y+1].element != "packed_snow" && elements[pixelMap[pixel.x][pixel.y+1].element].state != "liquid" && elements[pixelMap[pixel.x][pixel.y+1].element].state != "gas") {
                changePixel(pixel,"sticky_snow")
            }
        }
	    doDefaults(pixel);
    },
    hidden: true,
    reactions: {
		"salt_water": { elem1:"slush", elem2:"slush" },
		"uranium": { elem1:"dirty_water", chance:0.001 },
	},
	temp: -10,
	tempHigh: 20,
	tempLow: -100,
	stateLow: "packed_snow",
	stateHigh: "water",
	category: "land",
	state: "solid",
	density: 100
}

elements.sticky_snow = {
    name: "snow",
    tick: function(pixel) {
        if (pixelTicks-pixel.start > 500) {
            changePixel(pixel,"snow")
        }
	    doDefaults(pixel);
    },
	color: "#e1f8fc",
	behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1 AND ST|M2",
    ],
    ignore: ["snow","rapid_snow","slush","water","ice","packed_snow"],
	reactions: {
		"water": { elem1:"slush", elem2:"slush" },
		"salt_water": { elem1:"slush", elem2:"slush" },
		"dirty_water": { elem1:"slush", elem2:"slush" },
		"pool_water": { elem1:"slush", elem2:"slush" },
		"sugar_water": { elem1:"slush", elem2:"slush" },
		"seltzer": { elem1:"slush", elem2:"slush" },
		"uranium": { elem1:"dirty_water", chance:0.001 },
	},
	temp: -5,
	tempHigh: 20,
	tempLow: -100,
	stateLow: "packed_snow",
	stateHigh: "water",
	category: "land",
	state: "solid",
	density: 100
}

elements.sinkhole = {
    color: ["#2e2e2e","#808080","#4f4f4f","#949494","#76552b","#5c4221"],
    tick: function(pixel) {
        if (!isEmpty(pixel.x,pixel.y+1,true) && !outOfBounds(pixel.x,pixel.y+1) && pixel.color !== pixelMap[pixel.x][pixel.y+1].color) {
			pixel.color = pixelMap[pixel.x][pixel.y+1].color
		}
	    if ((pixel.hit === true || !tryMove(pixel, pixel.x, pixel.y+1) && pixel.h > 1 && pixel.active != true)) {
            if (pixel.hit != true) {
                pixel.hit = true
            }
            if (isEmpty(pixel.x+1,pixel.y) && pixel.h > 2 && !isEmpty(pixel.x+1,pixel.y+1,true)) {
                createPixel("sinkhole", pixel.x+1, pixel.y)
                pixelMap[pixel.x+1][pixel.y].h = (pixel.h-1)
            }
            if (isEmpty(pixel.x-1,pixel.y) && pixel.h > 2 && !isEmpty(pixel.x-1,pixel.y+1,true)) {
                createPixel("sinkhole", pixel.x-1, pixel.y)
                pixelMap[pixel.x-1][pixel.y].h = (pixel.h-1)
            }
	    }
        if (!isEmpty(pixel.x,pixel.y-1) || pixel.active == true) {
            if (!isEmpty(pixel.x-1, pixel.y) && !outOfBounds(pixel.x-1, pixel.y) && elements[pixelMap[pixel.x-1][pixel.y].element].movable == elements[pixel.element].movable) {
                pixelMap[pixel.x-1][pixel.y].active = true
            }
            if (!isEmpty(pixel.x+1, pixel.y) && !outOfBounds(pixel.x+1, pixel.y) && elements[pixelMap[pixel.x+1][pixel.y].element].movable == elements[pixel.element].movable) {
                pixelMap[pixel.x+1][pixel.y].active = true
            }
            var x = pixel.x;
            for (var y = (pixel.y + 3); y < (height + 3); y++) {
                if (outOfBounds(x, y+1) || isEmpty(x+1, y) &&  isEmpty(x-1, y) &&  isEmpty(x, y+2) && isEmpty(x, y+1)) {
                    deletePixel(pixel.x,pixel.y)
                    break;
                }
                if (!isEmpty(x, y) && !outOfBounds(x,y)) {
                    if (Math.random() > 0.05) {
                        deletePixel(x,y)
                    }
                    else {
                        if (isBreakable(pixelMap[x][y])) {
			                breakPixel(pixelMap[x][y]);
		                }
                        else if (Math.random() > 0.25) {
                            deletePixel(x,y)
                        }
                    }
                }
                if (!isEmpty(x+1, y) && !outOfBounds(x+1,y)) {
                    if (Math.random() > 0.05) {
                        if (isBreakable(pixelMap[x+1][y])) {
			                breakPixel(pixelMap[x+1][y]);
		                }
                        else if (Math.random() > 0.9) {
                            deletePixel(x+1,y)
                        }
                    }
                }
                if (!isEmpty(x-1, y) && !outOfBounds(x-1,y)) {
                    if (Math.random() > 0.5) {
                        if (isBreakable(pixelMap[x-1][y])) {
			                breakPixel(pixelMap[x-1][y]);
		                }
                        else if (Math.random() > 0.9) {
                            deletePixel(x-1,y)
                        }
                    }
                }
            }
        }
	    doDefaults(pixel);
    },
    properties: {
        h: 10,
	},
    canContain: true,
    forceSaveColor: true,
    category: "weapons",
    state: "solid",
    density: 100000000,
    category: "weapons",
	maxSize: 0,
	cooldown: defaultCooldown,
	excludeRandom: true,
} 

elements.meteor = {
	color: ["#782828","#783b28","#784b28"],
    behavior: [
		"XX|XX|XX",
		"XX|CC:782828,783b28,784b28%25|XX",
		"M2|XX|M2",
	],
    tick: function(pixel) {
        if (pixel.start === pixelTicks && pixel.y != 1) {
            tryMove(pixel, pixel.x, 1)
        }
        if (pixel.start === pixelTicks && pixel.material === undefined) {
			if (Math.random() < 0.5) {
				if (Math.random() < 0.5) {
			    	if (Math.random() < 0.5) {
			        	if (Math.random() < 0.5) {
			            	if (Math.random() < 0.25) {
			            	    pixel.material = "magma"
                                pixel.material2 = "uranium"
			                }
                            else {
                                pixel.material = "molten_iron"
                                pixel.material2 = "molten_nickel"
                            }
			            }
                        else {
                            pixel.material = "molten_iron"
                            pixel.material2 = "magma"
                        }
			        }
                    else {
                        pixel.material = "magma"
                        pixel.material2 = "molten_iron"
                    }
			    }
                else {
			    	if (Math.random() < 0.5) {
			        	if (Math.random() < 0.5) {
			        	    if (Math.random() < 0.75) {
			        	        if (Math.random() < 0.25) {
			        	            pixel.material = "ice"
                                    pixel.material2 = "dna"
			                    }
                                else {
                                    pixel.material = "ice"
                                    pixel.material2 = "iron"
                                }
			                }
                            else {
                                pixel.material = "ice"
                                pixel.material2 = "uranium"
                            }
			            }
                        else {
                            pixel.material = "rock"
                            pixel.material2 = "ice"
                        }
			        }
                    else {
                        pixel.material = "magma"
                        pixel.material2 = "ice"
                    }
			    }
			}
			else { 
                pixel.material = "magma" 
                pixel.material2 = "clay" 
            }
		}
        if (isEmpty(pixel.x, pixel.y-1)) {
            if (pixel.material === "ice" || pixel.material2 === "ice") {
                if (Math.random() < 0.5) {
			        createPixel("steam", pixel.x, pixel.y-1)
			    }
                else {
                    createPixel("fire", pixel.x, pixel.y-1)
                }
		    }
            else if (pixel.material === "uranium" || pixel.material2 === "uranium") {
                if (Math.random() < 0.5) {
			        createPixel("radiation", pixel.x, pixel.y-1)
			    }
                else {
                    createPixel("fire", pixel.x, pixel.y-1)
                }
		    }
            else if (elements[pixel.material].state === "gas") {
                if (Math.random() < 0.5) {
			        createPixel(pixel.material, pixel.x, pixel.y-1)
			    }
                else {
                    createPixel("fire", pixel.x, pixel.y-1)
                }
		    }
            else {
                createPixel("fire", pixel.x, pixel.y-1)
		    }
		}
		if (!tryMove(pixel, pixel.x, pixel.y+1)) {
            deletePixel(pixel.x,pixel.y) 
            if (Math.random() > 0.5) {
			    explodeAt(pixel.x,pixel.y,50,[pixel.material,pixel.material,pixel.material,pixel.material,pixel.material2,"explosion","explosion","explosion","magma"])
            }
            else {
                explodeAt(pixel.x,pixel.y,30,[pixel.material,pixel.material,pixel.material,pixel.material2,pixel.material2,"explosion","explosion","explosion","magma"])
            }
		}
	},
    renderer: function(pixel,ctx) {
		drawSquare(ctx,"#F0F08B",pixel.x-2,pixel.y-2,5,0.5);
        drawSquare(ctx,pixel.color,pixel.x-1,pixel.y-1,3,1);
        drawDefault(ctx,pixel);
	},
	reactions: {
		"water": { elem1:"rock", elem2:"explosion" }
	},
	category: "weapons",
	temp:1500,
	tempLow: -100,
	stateLow: "rock",
	burning: true,
	burnInto: "rock",
	burnTime: 170,
	burn: 100,
	state: "solid",
	density: 1600,
	maxSize: 0,
	cooldown: defaultCooldown,
	excludeRandom: true,
	glow: true
}
