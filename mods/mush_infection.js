behaviorRules.CHF = function() {
	if (!isEmpty(btemp.newCoords.x,btemp.newCoords.y,true)) {
		var newPixel = pixelMap[btemp.newCoords.x][btemp.newCoords.y];
		if (btemp.info.ignore && btemp.info.ignore.indexOf(newPixel.element) !== -1) {
			return;
		}
		if (!elements[newPixel.element].hardness || Math.random() > elements[newPixel.element].hardness || (btemp.newCoords.x == btemp.pixel.x && btemp.newCoords.y == btemp.pixel.y)) {
			if (btemp.arg.indexOf(">") !== -1) {
				var argfrom = btemp.arg.split(">")[0];
				if (argfrom.indexOf(",") !== -1) {
					if (argfrom.split(",").indexOf(newPixel.element) === -1) {
						return;
					}
				}
				else if (argfrom !== newPixel.element) {
					return;
				}
				var argto = btemp.arg.split(">")[1];
			}
			else {
				var argfrom = null;
				var argto = btemp.arg;
			}
			if (argto.indexOf(",") !== -1) {
				var argto = choose(argto.split(","));
			}
			if (elements[argto]) {
				if (elements[newPixel.element].id !== elements[argto].id) {
					if (Math.random() < (1-(elements[newPixel.element].hardness || 0)) / (shiftDown ? 1 : 4)) {
					    changePixel(newPixel,argto);
				    }
				}
			}
		}
	}
}

elements.mush_spore = {
	color: ["#b4d4ae","#b98aba","#805236"],
	behavior: [
		"XX|M2%1.5|XX",
		"XX|L2:mush_stalk AND C2:mush_gill%20|XX",
		"XX|M1|XX",
	],
	tick: function(pixel) {
	    if (Math.random() < 0.02) {
	    	let x = 0;
	    	if (Math.random() < 0.25) {
	    		x += Math.random() < 0.5 ? -1 : 1;
	    	}
	    	if (!isEmpty(pixel.x+x,pixel.y-1,true) && eLists.SOIL.includes(pixelMap[pixel.x+x][pixel.y-1].element)) {
	    		let soil = pixelMap[pixel.x+x][pixel.y-1];
	    		swapPixels(pixel,soil);
	    		changePixel(soil,"mush_hyphae");
	    	}
            else if (!isEmpty(pixel.x+x,pixel.y-1,true) && !outOfBounds(pixel.x+x,pixel.y-1,true) && Math.random() < (1-(elements[pixelMap[pixel.x+x][pixel.y-1].element].hardness || 0)) / (shiftDown ? 1 : 4)) {
	    		let soil = pixelMap[pixel.x+x][pixel.y-1];
	    		swapPixels(pixel,soil);
	    		changePixel(soil,"mush_hyphae");
	    	}
	    }
    },
	reactions: {
		"wood": { elem2:"mush_hyphae", chance:0.04 },
		"tree_branch": { elem2:"mush_hyphae", chance:0.04 },
		"plant": { elem2:"mush_hyphae", chance:0.07 },
		"evergreen": { elem2:"mush_hyphae", chance:0.07 },
		"root": { elem2:"mush_hyphae", chance:0.07 },
		"grass": { elem2:"mush_hyphae", chance:0.08 },
		"grass_seed": { elem2:"mush_hyphae", chance:0.08 },
		"epsom_salt": { elem1:null, chance:0.1 },
        "skin": { stain2:"#cc564b" },
	},
	category: "life",
	tempHigh: 225,
	stateHigh: "fire",
	burn: 10,
	burnTime: 20,
	state: "solid",
	density: 123.6,
	cooldown: defaultCooldown,
	seed: true,
	darkText: true,
    mush: true
}
elements.mush_stalk = {
	color: "#BDC4B6",
	behavior: [
		"XX|XX|XX",
		"XX|XX|XX",
		"XX|CHF:mush_hyphae%1 AND M1|XX",
	],
    ignore:["mush_hyphae","mush_cap","mush_gill","mush_mulch","mush_stalk","mush_spore"],
	reactions: {
		"wood": { elem2:"mush_hyphae", chance:0.04 },
		"tree_branch": { elem2:"mush_hyphae", chance:0.04 },
		"plant": { elem2:"mush_hyphae", chance:0.07 },
		"evergreen": { elem2:"mush_hyphae", chance:0.07 },
		"root": { elem2:"mush_hyphae", chance:0.07 },
		"grass": { elem2:"mush_hyphae", chance:0.08 },
		"grass_seed": { elem2:"mush_hyphae", chance:0.08 },
		"ash": { elem2:"mush_hyphae", chance:0.04 },
		"water": { elem2:"broth", tempMin:70, color2:["#CC9978","#CD8C6F","#BE785E"] },
		"salt_water": { elem2:"broth", tempMin:70, color2:["#CC9978","#CD8C6F","#BE785E"] },
		"sugar_water": { elem2:"broth", tempMin:70, color2:["#CC9978","#CD8C6F","#BE785E"] },
		"seltzer": { elem2:"broth", tempMin:70, color2:["#CC9978","#CD8C6F","#BE785E"] },
        "skin": { stain2:"#cc564b" },
	},
	category: "life",
	hidden: true,
	tempHigh: 225,
	stateHigh: "fire",
	burn: 10,
	burnTime: 65,
	state: "solid",
	density: 90.445,
	seed: "mush_spore",
	breakInto: [null,null,"mush_mulch"],
    mush: true
}
elements.mush_gill = {
	color: "#BFC395",
	tick: function(pixel) {
		if (!pixel.mColor) {
			// make it a hsl random hue, 54% saturation, 52% lightness
			pixel.mColor = "hsl(" + Math.floor(Math.random()*200+180)%360 + ",54%,52%)";
		}
		if (isEmpty(pixel.x,pixel.y-1) && Math.random() < 0.1) {
			createPixel("mush_cap",pixel.x,pixel.y-1);
			pixelMap[pixel.x][pixel.y-1].color = pixel.mColor;
		}
		if (isEmpty(pixel.x-1,pixel.y) && Math.random() < 0.02) {
			// create either mush_gill or mush_cap
			if (Math.random() < 0.5) {
				createPixel("mush_gill",pixel.x-1,pixel.y);
				pixelMap[pixel.x-1][pixel.y].mColor = pixel.mColor;
			} else {
				createPixel("mush_cap",pixel.x-1,pixel.y);
				pixelMap[pixel.x-1][pixel.y].color = pixel.mColor;
			}
		}
		if (isEmpty(pixel.x+1,pixel.y) && Math.random() < 0.02) {
			if (Math.random() < 0.5) {
				createPixel("mush_gill",pixel.x+1,pixel.y);
				pixelMap[pixel.x+1][pixel.y].mColor = pixel.mColor;
			} else {
				createPixel("mush_cap",pixel.x+1,pixel.y);
				pixelMap[pixel.x+1][pixel.y].color = pixel.mColor;
			}
		}
        if (!isEmpty(pixel.x,pixel.y+1) && !outOfBounds(pixel.x,pixel.y+1) && (pixel.start + 10) > pixelTicks && pixel.main !== true) {
			pixel.main = true
		}
        if (isEmpty(pixel.x,pixel.y+1) && pixel.main == true) {
			createPixel("mush_stalk",pixel.x,pixel.y+1);
		}
		doDefaults(pixel);
	},
	reactions: {
		"water": { elem2:"broth", tempMin:70, color2:["#CC9978","#CD8C6F","#BE785E"] },
		"salt_water": { elem2:"broth", tempMin:70, color2:["#CC9978","#CD8C6F","#BE785E"] },
		"sugar_water": { elem2:"broth", tempMin:70, color2:["#CC9978","#CD8C6F","#BE785E"] },
		"seltzer": { elem2:"broth", tempMin:70, color2:["#CC9978","#CD8C6F","#BE785E"] }
	},
	category: "life",
	hidden: true,
	movable: false,
	tempHigh: 225,
	stateHigh: "fire",
	burn: 10,
	burnTime: 65,
	burnInto: "mush_spore",
	state: "solid",
	density: 90.445,
	seed: "mush_spore",
	breakInto: [null,"mush_mulch","mush_spore","poison"],
    mush: true
}
elements.mush_cap = {
	color: ["#c76243","#c74442","#c7437e","#c043c7","#7c43c7","#5FEA5F","#c76243","#c74442","#c7437e","#c043c7","#7c43c7","#4543c7","#5FEA5F"],
	singleColor: true,
	behavior: behaviors.WALL,
	reactions: {
		"water": { elem2:"broth", tempMin:70, color2:["#CC9978","#CD8C6F","#BE785E"] },
		"salt_water": { elem2:"broth", tempMin:70, color2:["#CC9978","#CD8C6F","#BE785E"] },
		"sugar_water": { elem2:"broth", tempMin:70, color2:["#CC9978","#CD8C6F","#BE785E"] },
		"seltzer": { elem2:"broth", tempMin:70, color2:["#CC9978","#CD8C6F","#BE785E"] }
	},
	category: "life",
	hidden: true,
	tempHigh: 225,
	stateHigh: "fire",
	burn: 10,
	burnTime: 65,
	burnInto: "mush_spore",
	state: "solid",
	density: 90.445,
	seed: "mush_spore",
	breakInto: [null,null,"mush_mulch"],
    mush: true
}
elements.mush_hyphae = {
	color: "#AB8A70",
	behavior: [
		"CHF:mush_hyphae,mush_hyphae,mush_mulch%5 AND CH:mush_mulch>mush_hyphae%0.05 AND CR:mush_hyphae%0.05|CR:mush_spore,mush_mulch%0.01 AND CH:mush_hyphae>mush_mulch%0.5|CHF:mush_hyphae,mush_hyphae,mush_mulch%5 AND CH:mush_mulch>mush_hyphae%0.05 AND CR:mush_hyphae%0.05",
		"CHF:mush_mulch%0.5 AND CR:mush_mulch%0.01 AND CH:mush_hyphae>mush_mulch%5|XX|CHF:mush_mulch%0.5 AND CR:mush_mulch%0.01 AND CH:mush_hyphae>mush_mulch%5",
		"CHF:mush_hyphae,mush_hyphae,mush_mulch%5 AND CH:mush_mulch>mush_hyphae%0.05 AND CR:mush_hyphae%0.5|CH:mush_hyphae>mush_mulch%0.5 AND CR:mush_mulch%0.01|CHF:mush_hyphae,mush_hyphae,mush_mulch%5 AND CH:mush_mulch>mush_hyphae%0.05 AND CR:mush_hyphae%0.5",
	],
    ignore:["mush_hyphae","mush_cap","mush_gill","mush_mulch","mush_stalk","mush_spore"],
	reactions: {
		"wood": { elem2:"mush_mulch", chance:0.04 },
		"tree_brake": { elem2:"mush_mulch", chance:0.04 },
		"plant": { elem2:"mush_mulch", chance:0.07 },
		"evergreen": { elem2:"mush_mulch", chance:0.07 },
		"root": { elem2:"mush_mulch", chance:0.07 },
		"grass": { elem2:"mush_mulch", chance:0.08 },
		"grass_seed": { elem2:"mush_mulch", chance:0.08 },
		"ash": { elem2:"mush_mulch", chance:0.04 },
		"water": { elem2:"broth", tempMin:70, color2:["#CC9978","#CD8C6F","#BE785E"] },
		"salt_water": { elem2:"broth", tempMin:70, color2:["#CC9978","#CD8C6F","#BE785E"] },
		"sugar_water": { elem2:"broth", tempMin:70, color2:["#CC9978","#CD8C6F","#BE785E"] },
		"seltzer": { elem2:"broth", tempMin:70, color2:["#CC9978","#CD8C6F","#BE785E"] },
        "skin": { stain2:"#cc564b" },
	},
	category: "life",
	hidden: true,
	tempHigh: 225,
	stateHigh: "fire",
	burn: 30,
	burnTime: 20,
	state: "solid",
	density: 462,
	seed: "mush_spore",
	conduct: 0.1,
	breakInto: ["mush_mulch","mush_mulch","mush_mulch"],
    mush: true
}
elements.mush_mulch = {
	color: ["#7F494C","#764042","#693A3F"],
	behavior: [
		"XX|ST:mush_hyphae%75|XX",
		"ST:mush_hyphae%75|FX%0.25|ST:mush_hyphae%75",
		"M2%50|ST:mush_hyphae AND M1%75|M1%50",
	],
	reactions: {
		"dead_plant": { elem2:[null,null,null,"mush_mulch","mush_hyphae"], chance:0.0025 },
		"rotten_meat": { elem2:[null,null,null,"mush_mulch","mush_hyphae"], chance:0.0025 },
		"dead_bug": { elem2:[null,null,null,"mush_mulch","mush_hyphae"], chance:0.0025 },
		"wood": { elem2:[null,"mush_mulch","mush_hyphae"], chance:0.0025 },
        "skin": { stain2:"#cc564b" },
	},
    tick: function(pixel) {
		if ((isEmpty(pixel.x+1,pixel.y) || isEmpty(pixel.x-1,pixel.y) || !isEmpty(pixel.x+1,pixel.y) || !isEmpty(pixel.x-1,pixel.y)) && isEmpty(pixel.x,pixel.y-1) && Math.random() < 0.01) {
			if (isEmpty(pixel.x+1,pixel.y) && isEmpty(pixel.x-1,pixel.y) && !isEmpty(pixel.x,pixel.y+1)) {
			    if (!outOfBounds(pixel.x,pixel.y+1)) {
                    if (elements[pixelMap[pixel.x][pixel.y+1].element].mush !== true) {
                        changePixel(pixel,"mush_spore")
		            }
		        }
                else {
                    changePixel(pixel,"mush_spore")
                }
            }
            if (!isEmpty(pixel.x+1,pixel.y) && !isEmpty(pixel.x-1,pixel.y) && !isEmpty(pixel.x,pixel.y+1)) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    if (elements[pixelMap[pixel.x][pixel.y+1].element].mush !== true) {
                        if (!isEmpty(pixel.x+1,pixel.y) && !outOfBounds(pixel.x+1,pixel.y)) {
                            if (elements[pixelMap[pixel.x+1][pixel.y].element].mush !== true) {
			                    changePixel(pixel,"mush_spore")
		                    }
		                }
                        if (!isEmpty(pixel.x-1,pixel.y) && !outOfBounds(pixel.x-1,pixel.y)) {
                            if (elements[pixelMap[pixel.x-1][pixel.y].element].mush !== true) {
			                    changePixel(pixel,"mush_spore")
		                    }
		                }
		            }
		        }
                else {
                    if (!isEmpty(pixel.x+1,pixel.y) && !outOfBounds(pixel.x+1,pixel.y)) {
                        if (elements[pixelMap[pixel.x+1][pixel.y].element].mush !== true) {
			                if (!isEmpty(pixel.x-1,pixel.y) && !outOfBounds(pixel.x-1,pixel.y)) {
                                if (elements[pixelMap[pixel.x-1][pixel.y].element].mush !== true) {
			                        changePixel(pixel,"mush_spore")
		                        }
		                    }
                            else {
                                changePixel(pixel,"mush_spore")
                            }
		                }
		            }
                    if (!isEmpty(pixel.x-1,pixel.y) && !outOfBounds(pixel.x-1,pixel.y)) {
                        if (elements[pixelMap[pixel.x-1][pixel.y].element].mush !== true) {
			                if (!isEmpty(pixel.x+1,pixel.y) && !outOfBounds(pixel.x+1,pixel.y)) {
                                if (elements[pixelMap[pixel.x+1][pixel.y].element].mush !== true) {
			                        changePixel(pixel,"mush_spore")
		                        }
		                    }
                            else {
                                changePixel(pixel,"mush_spore")
                            }
		                }
		            }
                }
		    }
		}
		doDefaults(pixel);
	},
	tempHigh:235,
	stateHigh: "dirt",
	tempLow: -45,
	stateLow: "permafrost",
	burn: 20,
	burnTime: 40,
	burnInto: "dirt",
	category:"land",
	state: "solid",
	density: 462,
	seed: "mush_spore",
    mush: true
}