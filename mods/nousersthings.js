// Gallium is the best element
elements.caesium = {
	color: ["#917921", "#ebcb59", "#a48b2d", "#d6b84c"],
	behavior: behaviors.WALL,
	category: "solids",
	state: "solid",
	tempHigh: 28.44,
	stateHigh: "molten_caesium",
	density: 1873,
	conduct: 0.90,
	reactions: {
			"water": { "elem1":"pop", "elem2":"hydrogen" },
			"sugar_water": { "elem1":"pop", "elem2":"hydrogen" },
			"dirty_water": { "elem1":"pop", "elem2":"hydrogen" },
			"pool_water": { "elem1":"pop", "elem2":"hydrogen" },
			"salt_water": { "elem1":"pop", "elem2":"hydrogen" },
			"seltzer":  { "elem1":"pop", "elem2":"hydrogen" },
		}
},
elements.molten_caesium = {
	color: ["#735c0a", "#a68e37", "#7e6715", "#9b832e"],
	behavior: behaviors.LIQUID,
	category: "states",
	state: "liquid",
	tempLow: 27.44,
	stateLow: "caesium",
	tempHigh: 671,
	stateHigh: "caesium_vapor",
	density: 1843,
	temp: 29,
	conduct: 0.90,
	reactions: {
		"water": { "elem1":"pop", "elem2":"hydrogen" },
		"sugar_water": { "elem1":"pop", "elem2":"hydrogen" },
		"dirty_water": { "elem1":"pop", "elem2":"hydrogen" },
		"pool_water": { "elem1":"pop", "elem2":"hydrogen" },
		"salt_water": { "elem1":"pop", "elem2":"hydrogen" },
		"seltzer":  { "elem1":"pop", "elem2":"hydrogen" },
	}
},
elements.caesium_vapor = {
	color: ["#d89e77", "#cd9064", "#af6f34", "#a26320"],
	behavior: behaviors.GAS,
	category: "states",
	state: "gas",
	tempLow: 660,
	stateLow: "molten_caesium",
	density: 1.7,
	temp: 700
},
elements.subzero_grass_seed = {
	color: ["#022c14", "#032911", "#032205", "#021f00"],
	behavior: [
	"XX|M2%0.1|XX",
	"XX|L2:subzero_grass AND C2:subzero_grass%15|XX",
	"XX|M1|XX",
	],
	category: "life",
	state: "solid",
	tempHigh: 10,
	temp: 0,
	stateHigh: "dead_plant",
	density: 1400
},
elements.subzero_grass = {
	color: ["#003220", "#022a1a", "#032314", "#001c0d"],
	behavior: behaviors.STURDYPOWDER,
	category: "life",
	state: "solid",
	tempHigh: 13,
	temp: 0,
	stateHigh: "dead_plant",
	density:1400
},
elements.technetium = {
	color: ["#e7d9bb", "#bab195", "#8f8a70", "#66654e"],
	behavior: [
	"XX|XX|XX",
	"XX|CH:neutron%0.07|XX",
	"XX|XX|XX",
	],
	category: "solids",
	state: "solid",
	tempHigh: 2157,
	stateHigh: "molten_technetium",
	density: 11500,
	conduct: 0.9
},
 elements.molten_technetium = {
	color: ["#d16b42", "#da904c", "#dfb360", "#e2d57f"],
	behavior: behaviors.LIQUID,
	tick: function(pixel) {
		if (Math.random() < 0.0007) {
			changePixel(pixel, "neutron", false);
		}
	},
	category: "states",
	state: "liquid",
	tempLow: 2140,
	temp: 2200,
	stateLow: "technetium",
	density: 11400
},
elements.destroyable_pipe = {
    color: "#414c4f",
    onSelect: function() {
        logMessage("Draw a pipe, wait for walls to appear, then erase the exit hole.");
    },
    tick: function(pixel) {
        if (!pixel.stage && pixelTicks-pixel.start > 60) {
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x,y)) {
                    createPixel("brick",x,y);
                    pixelMap[x][y].color = pixelColorPick(pixel,"#808080");
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
                    pixel.color = pixelColorPick(pixel,"#000036");
                    break;
                }
            }
        }
        else if (pixel.stage > 1 && pixelTicks % 3 === pixel.stage-2) { //initialized
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true) && (pixelMap[x][y].element === "destroyable_pipe" || pixelMap[x][y].element === "bridge_pipe")) {
                    var newPixel = pixelMap[x][y];
                    if (newPixel.stage === 1) {
                        var newColor;
                        switch (pixel.stage) {
                            case 2: newPixel.stage = 3; newColor = "#003600"; break; //green
                            case 3: newPixel.stage = 4; newColor = "#360000"; break; //red
                            case 4: newPixel.stage = 2; newColor = "#000036"; break; //blue
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
                    if (newPixel.element === "destroyable_pipe" || newPixel.element === "bridge_pipe") {
                        var nextStage;
                        switch (pixel.stage) {
                            case 2: nextStage = 4; break; //green
                            case 3: nextStage = 2; break; //red
                            case 4: nextStage = 3; break; //blue
                        }
                        if (pixel.con && !newPixel.con && newPixel.stage === nextStage) { //transfer to adjacent pipe
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
            if (pixel.con && !moved) { // move to same stage if none other
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
                    if (!isEmpty(x,y,true) && (pixelMap[x][y].element === "destroyable_pipe" || pixelMap[x][y].element === "bridge_pipe")) {
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
    category: "machines",
    movable: false,
    canContain: true,
	tempHigh: 1538,
	stateHigh: "molten_iron",
	breakInto: "metal_scrap", 
},
elements.destroyable_superheater = {
    color: "#dd1111",
    behavior: [
        "XX|HT:10|XX",
        "HT:10|XX|HT:10",
        "XX|HT:10|XX",
    ],
    category:"machines",
	stateLow:["iron","copper"],
	tempLow: -7,
	breakInto:["metal_scrap","oxidixed_copper"],
},
elements.destroyable_heater = {
    color: "#881111",
    behavior: [
        "XX|HT:2|XX",
        "HT:2|XX|HT:2",
        "XX|HT:2|XX",
    ],
    category:"machines",
	stateLow:["iron","copper"],
	tempLow: -7,
	breakInto:["metal_scrap","oxidixed_copper"],
},
elements.destroyable_cooler = {
    color: "#111188",
    behavior: [
        "XX|CO:2|XX",
        "CO:2|XX|CO:2",
        "XX|CO:2|XX",
    ],
    category:"machines",
	stateHigh:["iron","copper"],
	tempHigh: 49,
	breakInto:["metal_scrap","oxidixed_copper"],
},
elements.destroyable_freezer = {
    color: "#1111dd",
    behavior: [
        "XX|CO:10|XX",
        "CO:10|XX|CO:10",
        "XX|CO:10|XX",
    ],
    category:"machines",
	stateHigh:["iron","copper"],
	tempHigh: 49,
	breakInto:["metal_scrap","oxidized_copper"],
},
elements.destroyable_cloner = {
    color: "#dddd00",
    behavior: behaviors.CLONER,
    ignore: ["ecloner","slow_cloner","clone_powder","floating_cloner","wall","ewall","destroyable_cloner","destroyable_clone_powder","cloner"],
    category:"machines",
    darkText: true,
	breakInto: "destroyable_clone_powder",
	tempHigh: 1538,
	stateHigh: "molten_iron",
},
elements.destroyable_clone_powder = {
    color: "#f0f000",
    behavior: [
        "XX|CF|XX",
        "CF|XX|CF",
        "M2|CF AND M1|M2",
    ],
    ignore: ["ecloner","slow_cloner","clone_powder","floating_cloner","wall","ewall","destroyable_cloner","destroyable_clone_powder","cloner"],
    category:"machines",
    state:"solid",
    density:2710,
    darkText: true,
	breakInto: "destroyable_clone_powder",
	tempHigh: 1538,
	stateHigh: "molten_iron",
},
eLists.CLONERS = ["ecloner","slow_cloner","clone_powder","floating_cloner","wall","ewall","destroyable_cloner","destroyable_clone_powder","cloner"];
elements.cloner.ignore = eLists.CLONERS;
elements.slow_cloner.ignore = eLists.CLONERS;
elements.clone_powder.ignore = eLists.CLONERS;
elements.floating_cloner.ignore = eLists.CLONERS;
elements.roomtemper = {
	color: "#29632f",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y, true)) {
					if(pixelMap[x][y].temp < -230) {
                    pixelMap[x][y].temp = (pixelMap[x][y].temp + 7)
					} else if(pixelMap[x][y].temp > 270) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp - 7)
					} else if (pixelMap[x][y].temp < 20) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp + 2)
					} else if (pixelMap[x][y].temp > 20) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp - 2)
					}
                }
            }
	},
	category:"machines",
	state:"solid",
	insulate: true,
	noMix: true,
	movable: false,
},
elements.destroyable_roomtemper = {
	color: "#18401a",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y, true)) {
					if(pixelMap[x][y].temp < -230) {
                    pixelMap[x][y].temp = (pixelMap[x][y].temp + 7)
					} else if(pixelMap[x][y].temp > 270) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp - 7)
					} else if (pixelMap[x][y].temp < 20) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp + 2)
					} else if (pixelMap[x][y].temp > 20) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp - 2)
					}
                }
            }
	},
	category:"machines",
	state:"solid",
	tempHigh: 1538,
	stateHigh: ["steam","molten_iron"],
	tempLow: -200,
	stateLow: ["ice", "iron"],
	breakInto: ["snow","metal_scrap"],
	noMix: true,
	movable: false,
},
elements.customtemper = {
	color: "#421b6b",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y, true)) {
					if(pixelMap[x][y].temp < (pixel.temp - 250)) {
                    pixelMap[x][y].temp = (pixelMap[x][y].temp + 7)
					} else if(pixelMap[x][y].temp > (pixel.temp + 250)) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp - 7)
					} else if (pixelMap[x][y].temp < pixel.temp) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp + 2)
					} else if (pixelMap[x][y].temp > pixel.temp) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp - 2)
					}
                }
            }
	},
	category:"machines",
	state:"solid",
	insulate: true,
	noMix: true,
	movable: false,
},
elements.destroyable_customtemper = {
	color: "#261047",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y, true)) {
					if(pixelMap[x][y].temp < (pixel.temp - 250)) {
                    pixelMap[x][y].temp = (pixelMap[x][y].temp + 7)
					} else if(pixelMap[x][y].temp > (pixel.temp + 250)) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp - 7)
					} else if (pixelMap[x][y].temp < pixel.temp) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp + 2)
					} else if (pixelMap[x][y].temp > pixel.temp) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp - 2)
					}
                }
            }
	},
	category:"machines",
	state:"solid",
	insulate: true,
	breakInto: ["snow","metal_scrap","oxidized_copper","wire"],
	noMix: true,
	movable: false,
},
elements.e_pipe = {
    color: "#414c4f",
    onSelect: function() {
        logMessage("Draw a pipe, wait for walls to appear, then erase the exit hole.");
    },
    tick: function(pixel) {
        if (!pixel.stage && pixelTicks-pixel.start > 60) {
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x,y)) {
                    createPixel("brick",x,y);
                    pixelMap[x][y].color = pixelColorPick(pixel,"#808080");
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
                    pixel.color = pixelColorPick(pixel,"#000036");
                    break;
                }
            }
        }
        else if (pixel.stage > 1 && pixelTicks % 3 === pixel.stage-2) { //initialized
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true) && (pixelMap[x][y].element === "e_pipe" || pixelMap[x][y].element === "bridge_pipe")) {
                    var newPixel = pixelMap[x][y];
                    if (newPixel.stage === 1) {
                        var newColor;
                        switch (pixel.stage) {
                            case 2: newPixel.stage = 3; newColor = "#003600"; break; //green
                            case 3: newPixel.stage = 4; newColor = "#360000"; break; //red
                            case 4: newPixel.stage = 2; newColor = "#000036"; break; //blue
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
                    if (newPixel.element === "e_pipe" || newPixel.element === "bridge_pipe") {
                        var nextStage;
                        switch (pixel.stage) {
                            case 2: nextStage = 4; break; //green
                            case 3: nextStage = 2; break; //red
                            case 4: nextStage = 3; break; //blue
                        }
                        if (pixel.con && !newPixel.con && newPixel.stage === nextStage && (pixel.charge || pixel.chargeCD)) { //transfer to adjacent pipe
                            newPixel.con = pixel.con;
                            newPixel.con.x = newPixel.x;
                            newPixel.con.y = newPixel.y;
                            pixel.con = null;
                            moved = true;
                            break;
                        }
                    }
                    else if (!pixel.con && elements[newPixel.element].movable && (pixel.charge || pixel.chargeCD)) { //suck up pixel
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
            if (pixel.con && !moved && (pixel.charge || pixel.chargeCD)) { // move to same stage if none other
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
                    if (!isEmpty(x,y,true) && (pixelMap[x][y].element === "e_pipe" || pixelMap[x][y].element === "bridge_pipe")) {
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
    category: "machines",
    movable: false,
    canContain: true,
	conduct: 1,
},
elements.destroyable_e_pipe = {
    color: "#414c4f",
    onSelect: function() {
        logMessage("Draw a pipe, wait for walls to appear, then erase the exit hole.");
    },
    tick: function(pixel) {
        if (!pixel.stage && pixelTicks-pixel.start > 60) {
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x,y)) {
                    createPixel("brick",x,y);
                    pixelMap[x][y].color = pixelColorPick(pixel,"#808080");
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
                    pixel.color = pixelColorPick(pixel,"#000036");
                    break;
                }
            }
        }
        else if (pixel.stage > 1 && pixelTicks % 3 === pixel.stage-2) { //initialized
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true) && (pixelMap[x][y].element === "destroyable_e_pipe" || pixelMap[x][y].element === "bridge_pipe")) {
                    var newPixel = pixelMap[x][y];
                    if (newPixel.stage === 1) {
                        var newColor;
                        switch (pixel.stage) {
                            case 2: newPixel.stage = 3; newColor = "#003600"; break; //green
                            case 3: newPixel.stage = 4; newColor = "#360000"; break; //red
                            case 4: newPixel.stage = 2; newColor = "#000036"; break; //blue
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
                    if (newPixel.element === "destroyable_e_pipe" || newPixel.element === "bridge_pipe") {
                        var nextStage;
                        switch (pixel.stage) {
                            case 2: nextStage = 4; break; //green
                            case 3: nextStage = 2; break; //red
                            case 4: nextStage = 3; break; //blue
                        }
                        if (pixel.con && !newPixel.con && newPixel.stage === nextStage && (pixel.charge || pixel.chargeCD)) { //transfer to adjacent pipe
                            newPixel.con = pixel.con;
                            newPixel.con.x = newPixel.x;
                            newPixel.con.y = newPixel.y;
                            pixel.con = null;
                            moved = true;
                            break;
                        }
                    }
                    else if (!pixel.con && elements[newPixel.element].movable && (pixel.charge || pixel.chargeCD)) { //suck up pixel
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
            if (pixel.con && !moved && (pixel.charge || pixel.chargeCD)) { // move to same stage if none other
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
                    if (!isEmpty(x,y,true) && (pixelMap[x][y].element === "destroyable_e_pipe" || pixelMap[x][y].element === "bridge_pipe")) {
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
    category: "machines",
    movable: false,
    canContain: true,
	conduct: 1,
	tempHigh: 1538,
	stateHigh: "molten_iron",
	breakInto: ["metal_scrap", "wire"]
},
currentChannel = 0;
elements.channel_pipe = {
    color: "#414c4f",
    onSelect: function() {
		var answer3 = prompt("Please input the desired channel of this pipe strand. Warning: It wont work if you do multiple strand types while paused.",(currentChannel||undefined));
        if (!answer3) { return }
		currentChannel = answer3;
        logMessage("Draw a pipe, wait for walls to appear, then erase the exit hole. Use the prop tool to set channel to a number before erasing the holes.");
    },
    tick: function(pixel) {
		if (pixel.start===pixelTicks){
			pixel.channel = currentChannel;
		}
        if (!pixel.stage && pixelTicks-pixel.start > 60) {
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x,y)) {
                    createPixel("brick",x,y);
                    pixelMap[x][y].color = pixelColorPick(pixel,"#808080");
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
                    pixel.color = pixelColorPick(pixel,"#000036");
                    break;
                }
            }
        }
        else if (pixel.stage > 1 && pixelTicks % 3 === pixel.stage-2) { //initialized
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true) && ((pixelMap[x][y].element === "channel_pipe" && pixelMap[x][y].channel == pixel.channel) || pixelMap[x][y].element === "bridge_pipe")) {
                    var newPixel = pixelMap[x][y];
                    if (newPixel.stage === 1) {
                        var newColor;
                        switch (pixel.stage) {
                            case 2: newPixel.stage = 3; newColor = "#003600"; break; //green
                            case 3: newPixel.stage = 4; newColor = "#360000"; break; //red
                            case 4: newPixel.stage = 2; newColor = "#000036"; break; //blue
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
                    if ((newPixel.element === "channel_pipe" && pixelMap[x][y].channel == pixel.channel || newPixel.element === "bridge_pipe")) {
                        var nextStage;
                        switch (pixel.stage) {
                            case 2: nextStage = 4; break; //green
                            case 3: nextStage = 2; break; //red
                            case 4: nextStage = 3; break; //blue
                        }
                        if (pixel.con && !newPixel.con && newPixel.stage === nextStage) { //transfer to adjacent pipe
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
            if (pixel.con && !moved) { // move to same stage if none other
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
                    if (!isEmpty(x,y,true) && ((pixelMap[x][y].element === "channel_pipe" && pixelMap[x][y].channel == pixel.channel) || pixelMap[x][y].element === "bridge_pipe")) {
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
    category: "machines",
    movable: false,
    canContain: true,
},
elements.destroyable_channel_pipe = {
    color: "#414c4f",
      onSelect: function() {
		var answer3 = prompt("Please input the desired channel of this pipe strand. Warning: It wont work if you do multiple strand types while paused.",(currentChannel||undefined));
        if (!answer3) { return }
		currentChannel = answer3;
        logMessage("Draw a pipe, wait for walls to appear, then erase the exit hole. Use the prop tool to set channel to a number before erasing the holes.");
    },
    tick: function(pixel) {
		if (pixel.start === pixelTicks){
			pixel.channel = currentChannel;
		}
        if (!pixel.stage && pixelTicks-pixel.start > 60) {
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x,y)) {
                    createPixel("brick",x,y);
                    pixelMap[x][y].color = pixelColorPick(pixel,"#808080");
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
                    pixel.color = pixelColorPick(pixel,"#000036");
                    break;
                }
            }
        }
        else if (pixel.stage > 1 && pixelTicks % 3 === pixel.stage-2) { //initialized
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true) && (pixelMap[x][y].element === "destroyable_channel_pipe" && pixelMap[x][y].channel == pixel.channel || pixelMap[x][y].element === "bridge_pipe")) {
                    var newPixel = pixelMap[x][y];
                    if (newPixel.stage === 1) {
                        var newColor;
                        switch (pixel.stage) {
                            case 2: newPixel.stage = 3; newColor = "#003600"; break; //green
                            case 3: newPixel.stage = 4; newColor = "#360000"; break; //red
                            case 4: newPixel.stage = 2; newColor = "#000036"; break; //blue
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
                    if ((newPixel.element === "destroyable_channel_pipe" && pixelMap[x][y].channel == pixel.channel) || newPixel.element === "bridge_pipe") {
                        var nextStage;
                        switch (pixel.stage) {
                            case 2: nextStage = 4; break; //green
                            case 3: nextStage = 2; break; //red
                            case 4: nextStage = 3; break; //blue
                        }
                        if (pixel.con && !newPixel.con && newPixel.stage === nextStage) { //transfer to adjacent pipe
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
            if (pixel.con && !moved) { // move to same stage if none other
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
                    if (!isEmpty(x,y,true) && ((pixelMap[x][y].element === "destroyable_channel_pipe" && pixelMap[x][y].channel == pixel.channel) || pixelMap[x][y].element === "bridge_pipe")) {
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
    category: "machines",
    movable: false,
    canContain: true,
},
listPipes = ["pipe", "destroyable_pipe", "destroyable_e_pipe","channel_pipe","destroyable_channel_pipe","bridge_pipe","e_pipe"];
elements.bridge_pipe = {
    color: "#414c4f",
    onSelect: function() {
        logMessage("Draw a pipe, wait for walls to appear, then erase the exit hole.");
    },
    tick: function(pixel) {
        if (!pixel.stage && pixelTicks-pixel.start > 60) {
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x,y)) {
                    createPixel("brick",x,y);
                    pixelMap[x][y].color = pixelColorPick(pixel,"#808080");
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
                    pixel.color = pixelColorPick(pixel,"#000036");
                    break;
                }
            }
        }
        else if (pixel.stage > 1 && pixelTicks % 3 === pixel.stage-2) { //initialized
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true) && listPipes.includes(pixelMap[x][y].element)) {
                    var newPixel = pixelMap[x][y];
                    if (newPixel.stage === 1) {
                        var newColor;
                        switch (pixel.stage) {
                            case 2: newPixel.stage = 3; newColor = "#003600"; break; //green
                            case 3: newPixel.stage = 4; newColor = "#360000"; break; //red
                            case 4: newPixel.stage = 2; newColor = "#000036"; break; //blue
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
                    if (listPipes.includes(newPixel.element)) {
                        var nextStage;
                        switch (pixel.stage) {
                            case 2: nextStage = 4; break; //green
                            case 3: nextStage = 2; break; //red
                            case 4: nextStage = 3; break; //blue
                        }
                        if (pixel.con && !newPixel.con && newPixel.stage === nextStage) { //transfer to adjacent pipe
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
            if (pixel.con && !moved) { // move to same stage if none other
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
                    if (!isEmpty(x,y,true) && listPipes.includes(pixelMap[x][y].element)) {
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
    category: "machines",
    movable: false,
    canContain: true,
},
elements.pipe.tick = function(pixel) {
        if (!pixel.stage && pixelTicks-pixel.start > 60) {
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x,y)) {
                    createPixel("pipe_wall",x,y);
                    pixelMap[x][y].color = pixelColorPick(pixel,"#808080");
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
                    pixel.color = pixelColorPick(pixel,"#000036");
                    break;
                }
            }
        }
        else if (pixel.stage > 1 && pixelTicks % 3 === pixel.stage-2) { //initialized
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true) && (pixelMap[x][y].element === "pipe" || pixelMap[x][y].element === "bridge_pipe")) {
                    var newPixel = pixelMap[x][y];
                    if (newPixel.stage === 1) {
                        var newColor;
                        switch (pixel.stage) {
                            case 2: newPixel.stage = 3; newColor = "#003600"; break; //green
                            case 3: newPixel.stage = 4; newColor = "#360000"; break; //red
                            case 4: newPixel.stage = 2; newColor = "#000036"; break; //blue
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
                    if (newPixel.element === "pipe" || newPixel.element === "bridge_pipe") {
                        var nextStage;
                        switch (pixel.stage) {
                            case 2: nextStage = 4; break; //green
                            case 3: nextStage = 2; break; //red
                            case 4: nextStage = 3; break; //blue
                        }
                        if (pixel.con && !newPixel.con && newPixel.stage === nextStage) { //transfer to adjacent pipe
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
            if (pixel.con && !moved) { // move to same stage if none other
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
                    if (!isEmpty(x,y,true) && (pixelMap[x][y].element === "pipe" || pixelMap[x][y].element === "bridge_pipe")) {
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
	filterTypeVar = 0;
elements.filter = {
    color: "#599fc2",
    onSelect: function() {
        var answer4 = prompt("Please input the desired element of this filter. It will not work if you do multiple filter types while paused.",(filterTypeVar||undefined));
        if (!answer4) { return }
		filterTypeVar = answer4;
    },
    tick: function(pixel) {
		if (pixel.start === pixelTicks) {
			pixel.filterType = filterTypeVar
		}
        if (1 === 2) {
           for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x,y)) {
//                    createPixel("brick",x,y);
//                    pixelMap[x][y].color = pixelColorPick(pixel,"#808080");
                }
            }
 //           pixel.stage = 1;
        }
        else if (1 === 2) { //uninitialized
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coord = adjacentCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x,y)) {
 //                   pixel.stage = 2; //blue
 //                   pixel.color = pixelColorPick(pixel,"#000036");
                    break;
                }
            }
        }
        else if (1 === 1) { //initialized
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true) && listPipes.includes(pixelMap[x][y].element)) {
                    var newPixel = pixelMap[x][y];
                    if (newPixel.stage === 1) {
                        var newColor;
                        switch (pixel.stage) {
//                            case 2: newPixel.stage = 3; newColor = "#003600"; break; //green
 //                           case 3: newPixel.stage = 4; newColor = "#360000"; break; //red
//                            case 4: newPixel.stage = 2; newColor = "#000036"; break; //blue
                        }
 //                       newPixel.color = pixelColorPick(newPixel,newColor);
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
                    if (listPipes.includes(newPixel.element)) {
                        var nextStage;
                        switch (pixel.stage) {
 //                           case 2: nextStage = 4; break; //green
//                            case 3: nextStage = 2; break; //red
 //                           case 4: nextStage = 3; break; //blue
                        }
                        if (pixel.con && !newPixel.con) { //transfer to adjacent pipe
                            newPixel.con = pixel.con;
                            newPixel.con.x = newPixel.x;
                            newPixel.con.y = newPixel.y;
                            pixel.con = null;
                            moved = true;
                            break;
                        }
                    }
                    else if (!pixel.con && (newPixel.element == pixel.filterType) ) { //suck up pixel
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
            if (pixel.con && !moved) { // move to same stage if none other
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
                    if (!isEmpty(x,y,true) && listPipes.includes(pixelMap[x][y].element)) {
                        var newPixel = pixelMap[x][y];
                        if (pixel.con && !newPixel.con) {
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
    category: "machines",
    movable: false,
    canContain: true,
	noMix: true,
},
elements.heat_test = {
	onSelect: function() {
        logMessage("Use heatglow.js for more elements to glow when they are hot.");
    },
	color: "#787878",
	behavior: behaviors.WALL,
	category: "solids",
	state: "solid",
	tempHigh: 1538,
	stateHigh: "molten_iron",
	movable: false,
	tick: function(pixel){
		if (pixel.start == pixelTicks){
			pixel.ogR = parseInt(pixel.color.slice(4, pixel.color.indexOf(',')), 10)
			pixel.ogG = parseInt(pixel.color.slice(pixel.color.indexOf(',') + 1, pixel.color.lastIndexOf(',')), 10)
			pixel.ogB = parseInt(pixel.color.slice(pixel.color.lastIndexOf(',') + 1, -1), 10)
		}else if (pixelTicks > pixel.start){
			if (pixel.temp <= (elements.heat_test.tempHigh) - 700){ // replace 700 with lower limit of range
				pixel.ctemp = 0;
			} else if (pixel.temp > (elements.heat_test.tempHigh)-700 && pixel.temp <= elements.heat_test.tempHigh){ // replace 700 with lower limit of range
				pixel.ctemp = ((1/700)*pixel.temp)-(((elements.heat_test.tempHigh)-700)/700) // replace 700 with lower limit of range
			}
			if (pixel.ctemp <= 0.5){
				pixel.newR = (((510-(2*pixel.ogR))*pixel.ctemp)+pixel.ogR);
				pixel.newG = ((0-((2*pixel.ogG)*pixel.ctemp))+pixel.ogG);
				pixel.newB = ((0-((2*pixel.ogB)*pixel.ctemp))+pixel.ogB);
			}else if (pixel.ctemp > 0.5){
				pixel.newR = 255;
				pixel.newG = ((510*pixel.ctemp)-256);
				pixel.newB= ((280*pixel.ctemp)-140);
			}
			pixel.color = "rgb(" + pixel.newR + "," + pixel.newG + "," + pixel.newB + ")";
		}
	},
},
elements.soup = {
	color: "#3d2812",
	behavior: behaviors.LIQUID,
	category: "food",
	onMix: function(soup,ingredient) {
        if (elements[ingredient.element].isFood && elements[ingredient.element].id !== elements.soup.id && elements[ingredient.element].id !== elements.broth.id) {
            var rgb1 = soup.color.match(/\d+/g);
            var rgb2 = ingredient.color.match(/\d+/g);
            // average the colors
            var rgb = [
                Math.round((parseInt(rgb1[0])+parseInt(rgb2[0]))/2),
                Math.round((parseInt(rgb1[1])+parseInt(rgb2[1]))/2),
                Math.round((parseInt(rgb1[2])+parseInt(rgb2[2]))/2)
            ];
				if (!soup.elemlist){
				soup.elemlist = [];
				}
				soup.decidedHigh = soup.elemlist[Math.floor(Math.random()*soup.elemlist.length)];
				soup.elemlist.push(ingredient.element)
				soup.stateHigh = soup.elemlist;
            changePixel(ingredient, "soup");
            // convert rgb to hex
            var hex = RGBToHex(rgb);
            soup.color = pixelColorPick(soup, hex);
            // 50% change to delete ingredient
            if (Math.random() < 0.5) { deletePixel(ingredient.x, ingredient.y); }
            else {
                ingredient.color = pixelColorPick(ingredient, hex);
            }
		}
	},
	tick: function(pixel) {
		if (!pixel.decidedHigh){
			pixel.decidedHigh = "steam";
		}
		if (pixel.temp > 100){
			if (Math.random() < 0.5) {
				changePixel(pixel, "steam");
		} else {
			changePixel(pixel, pixel.decidedHigh)
		}
		}
		},
	density: 1100,
	stain: 0.02,
	state: "liquid",
},
elements.broth.onMix = function(pixel){
	changePixel(pixel, "soup")
},
converter1Var = 0;
converter2Var = 0;
elements.converter = {
	color: "#296127",
	behavior: behaviors.WALL,
	category: "machines",
	tick: function(pixel) {
		if (pixel.start === pixelTicks){
			pixel.contype = converter2Var;
			pixel.specialturn = converter1Var;
		}
		 for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y, true)) {
					var otherPixel = pixelMap[x][y];
					if ((otherPixel.element == pixel.specialturn || pixel.specialturn == "all") && !elements.converter.ignore.includes(otherPixel.element)){
						changePixel(otherPixel, pixel.contype)
					}
                }
            }
	},
	onSelect: function() {
        var answer5 = prompt("Please input what type of element should be converted. Write \"all\" to include everything.",(converter1Var||undefined));
        if (!answer5) { return }
		converter1Var = answer5;
		var answer6 = prompt("Please input what it should turn into.",(converter2Var||undefined));
        if (!answer6) { return }
		converter2Var = answer6;
    },
	ignore: ["converter", "wall", "ewall", "border"],
	movable: false,
},
elements.blackhole_storage = {
	color: "#171717",
	behavior: behaviors.WALL,
	category: "machines",
	tick: function(pixel) {
		if (!pixel.bhcontents){
			pixel.bhcontents = [];
		} else {
			pixel.decidedcontent = pixel.bhcontents[Math.floor(Math.random()*pixel.bhcontents.length)];
		}
		 for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y, true) && (!pixel.charge && !pixel.chargeCD)) {
					var otherPixel = pixelMap[x][y];
					if (elements[otherPixel.element].movable == true){
						pixel.bhcontents.push(otherPixel);
						deletePixel(otherPixel.x, otherPixel.y);
					}
                } else if (pixel.charge && isEmpty(x,y) && pixel.decidedcontent){
					var otherPixel = pixelMap[x][y];
					pixel.decidedcontent.x = x;
					pixel.decidedcontent.y = y;
					delete pixel.decidedcontent.del;
					otherPixel = pixel.decidedcontent;
					currentPixels.push(pixel.decidedcontent);
					pixel.bhcontents.splice(pixel.bhcontents.indexOf(pixel.decidedcontent), 1);
					pixel.decidedcontent = pixel.bhcontents[Math.floor(Math.random()*pixel.bhcontents.length)];
				}
            }
	},
	movable: false,
	conduct: 1,
},
elements.plutonium = {
	color: ["#616161", "#4b4949", "#353232", "#211c1c"],
	behavior: behaviors.STURDYPOWDER,
	category: "powders",
	tempHigh: 640,
	stateHigh: "molten_plutonium",
	state: "solid",
	tick: function(pixel){
		if (Math.random() < 0.0007) {
			changePixel(pixel, "neutron", false);
		} else if (Math.random() < 0.0007) {
			changePixel(pixel, "uranium", false);
		}
	},
	reactions: {
        "neutron": { elem1:"pn_explosion", tempMin:400, chance:0.1 },
    },
	density: 19186,
}
elements.molten_plutonium = {
	color: ["#6b5133", "#743f26", "#7c2727"],
	behavior: behaviors.LIQUID,
	category: "states",
	state: "liquid",
	tempLow: 620,
	stateLow: "plutonium",
	tick: function(pixel){
		if (Math.random() < 0.0007) {
			changePixel(pixel, "neutron", false);
		} else if (Math.random() < 0.0007) {
			changePixel(pixel, "uranium", false);
		}
	},
	reactions: {
        "neutron": { elem1:"pn_explosion", tempMin:400, chance:0.1 },
    },
	density: 16629,
},
elements.neutron.reactions.plutonium = { temp2:100 };
elements.neutron.reactions.molten_plutonium = { temp2:100 }
elements.pn_explosion = {
    color: ["#ffb48f","#ffd991","#ffad91"],
    behavior: [
        "XX|XX|XX",
        "XX|EX:80>plasma,plasma,plasma,plasma,radiation,rad_steam,neutron|XX",
        "XX|XX|XX",
    ],
    temp: 100000000,
    category: "energy",
    state: "gas",
    density: 1000,
    excludeRandom: true,
    hidden: true,
    alias: "plutonium nuclear explosion",
    noMix: true
},
elements.smasher = {
	color: "#606060",
	behavior: behaviors.WALL,
	category: "machines",
	tick: function(pixel){
		for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y, true)) {
					var otherPixel = pixelMap[x][y];
					breakPixel(otherPixel);
					}
        }
    },
	movable: false,
},
elements.mixer = {
	color: "#F0F0F0",
	behavior: behaviors.WALL,
	category: "machines",
	tick: function(pixel){
		pixel.mixList = [];
		for (var i = 0; i < squareCoords.length; i++) {
            var coord = squareCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (!isEmpty(x,y, true) && !elements[pixelMap[x][y].element].noMix) {
				var otherPixel = pixelMap[x][y];
				pixel.mixList.push(otherPixel);
			}
        }
		for (var i = 0; i < pixel.mixList.length; i++) {
                    var pixel1 = pixel.mixList[Math.floor(Math.random()*pixel.mixList.length)];
                    var pixel2 = pixel.mixList[Math.floor(Math.random()*pixel.mixList.length)];
                    swapPixels(pixel1,pixel2);
                    pixel.mixList.splice(pixel.mixList.indexOf(pixel1),1);
                    pixel.mixList.splice(pixel.mixList.indexOf(pixel2),1);
                    if (elements[pixel1.element].onMix) {
                        elements[pixel1.element].onMix(pixel1,pixel2);
                    }
                    if (elements[pixel2.element].onMix) {
                        elements[pixel2.element].onMix(pixel2,pixel1);
                    }
                }
	},
	movable: false,
    noMix: true,
},
elements.invisiblesupport = {
	color: "#000000",
	behavior: behaviors.WALL,
	tick: function(pixel){
		var x = pixel.x
		var y = pixel.y
		if (currentElement == "invisiblesupport"){
			pixel.color = "rgb(15, 15, 15)";
		} else {
			pixel.color = "rgba(0, 0, 0, -1)";
		}
		if ((isEmpty(x-1, y) || isEmpty(x+1,y)) && isEmpty(x,y+1)){
			deletePixel(pixel.x, pixel.y);
		}
	},
	category: "powders",
},
elements.invisiblewall = {
	color: "#000000",
	behavior: behaviors.WALL,
	tick: function(pixel){
		if (currentElement == "invisiblewall"){
			pixel.color = "rgb(15, 15, 15)";
		} else {
			pixel.color = "rgba(0, 0, 0, -1)";
		}
	},
	category: "solids",
    movable: false,
    noMix: true,
},
elements.bismuth = {
    color: ["#818181","#989898","#b0b0b0","#c9c9c9"],
    behavior: behaviors.WALL,
    category: "solids",
    tempHigh: 271.4,
    stateHigh: "molten_bismuth",
    density: 9780,
    state: "solid"
}
function RGBtoHSV(r, g, b) {
    if (arguments.length === 1) {
        g = r.g, b = r.b, r = r.r;
    }
    var max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        h,
        s = (max === 0 ? 0 : d / max),
        v = max / 255;

    switch (max) {
        case min: h = 0; break;
        case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
        case g: h = (b - r) + d * 2; h /= 6 * d; break;
        case b: h = (r - g) + d * 4; h /= 6 * d; break;
    }

    return {
        h: h,
        s: s,
        v: v
    };
}
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}
elements.molten_bismuth = {
    color: ["#ee8d63", "#ef7e5e", "#f06e5c", "#f05c5c"],
    behavior: behaviors.MOLTEN,
    category: "states",
    state: "liquid",
    temp: 280,
    tick: function(pixel){
        if (pixel.temp <= 261.4){
            pixel.tHue = 0;
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x, y, true)){
                  if (pixelMap[x][y].element == "bismuth"){
                      var otherPixel = pixelMap[x][y]
                      var nR = parseInt(otherPixel.color.slice(4, otherPixel.color.indexOf(',')), 10)
		              var nG = parseInt(otherPixel.color.slice(otherPixel.color.indexOf(',') + 1, otherPixel.color.lastIndexOf(',')), 10)
		              var nB = parseInt(otherPixel.color.slice(otherPixel.color.lastIndexOf(',') + 1, -1), 10)
                      var hsvResult = RGBtoHSV(nR, nG, nB)
                           if ((pixel.tHue+1)%1 < hsvResult.h){
                           pixel.tHue = hsvResult.h;
                         }
                     }
              }
            }
            changePixel(pixel, "bismuth")
            var rgbResult = HSVtoRGB(pixel.tHue + 0.08, 0.5, 0.9);
            const hexR = rgbResult.r.toString(16).padStart(2, '0');
            const hexG = rgbResult.g.toString(16).padStart(2, '0');
            const hexB = rgbResult.b.toString(16).padStart(2, '0');
            const hexCode = `#${hexR}${hexG}${hexB}`;
            pixel.color = pixelColorPick(pixel, hexCode)
        }
    },
    density: 10049,
}
const powderList = [behaviors.POWDER, behaviors.STURDYPOWDER, behaviors.POWDER_OLD, behaviors.AGPOWDER, behaviors.LIGHTWEIGHT, behaviors.SUPPORT, behaviors.SUPPORTPOWDER, behaviors.RADPOWDER]
const liquidList = [behaviors.LIQUID, behaviors.LIQUID_OLD, behaviors.SUPERFLUID_OLD, behaviors.SUPERFLUID, behaviors.AGLIQUID, behaviors.FOAM, behaviors.BUBBLE, behaviors.MOLTEN, behaviors.RADMOLTEN, behaviors.RADLIQUID]
const gasList = [behaviors.UL_UR, behaviors.UL_UR_OPTIMIZED, behaviors.GAS_OLD, behaviors.GAS, behaviors.DGAS]
elements.powder_filter = {
    color: "#599fc2",
    tick: function(pixel) {
        if (1 === 2) {
           for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x,y)) {
//                    createPixel("brick",x,y);
//                    pixelMap[x][y].color = pixelColorPick(pixel,"#808080");
                }
            }
 //           pixel.stage = 1;
        }
        else if (1 === 2) { //uninitialized
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coord = adjacentCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x,y)) {
 //                   pixel.stage = 2; //blue
 //                   pixel.color = pixelColorPick(pixel,"#000036");
                    break;
                }
            }
        }
        else if (1 === 1) { //initialized
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true) && listPipes.includes(pixelMap[x][y].element)) {
                    var newPixel = pixelMap[x][y];
                    if (newPixel.stage === 1) {
                        var newColor;
                        switch (pixel.stage) {
//                            case 2: newPixel.stage = 3; newColor = "#003600"; break; //green
 //                           case 3: newPixel.stage = 4; newColor = "#360000"; break; //red
//                            case 4: newPixel.stage = 2; newColor = "#000036"; break; //blue
                        }
 //                       newPixel.color = pixelColorPick(newPixel,newColor);
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
                    if (listPipes.includes(newPixel.element)) {
                        var nextStage;
                        switch (pixel.stage) {
 //                           case 2: nextStage = 4; break; //green
//                            case 3: nextStage = 2; break; //red
 //                           case 4: nextStage = 3; break; //blue
                        }
                        if (pixel.con && !newPixel.con) { //transfer to adjacent pipe
                            newPixel.con = pixel.con;
                            newPixel.con.x = newPixel.x;
                            newPixel.con.y = newPixel.y;
                            pixel.con = null;
                            moved = true;
                            break;
                        }
                    }
                    else if (!pixel.con && elements[newPixel.element].movable && (elements[newPixel.element].state == "solid") ) { //suck up pixel
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
            if (pixel.con && !moved) { // move to same stage if none other
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
                    if (!isEmpty(x,y,true) && listPipes.includes(pixelMap[x][y].element)) {
                        var newPixel = pixelMap[x][y];
                        if (pixel.con && !newPixel.con) {
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
    category: "machines",
    movable: false,
    canContain: true,
	noMix: true,
}
elements.liquid_filter = {
    color: "#599fc2",
    tick: function(pixel) {
        if (1 === 2) {
           for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x,y)) {
//                    createPixel("brick",x,y);
//                    pixelMap[x][y].color = pixelColorPick(pixel,"#808080");
                }
            }
 //           pixel.stage = 1;
        }
        else if (1 === 2) { //uninitialized
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coord = adjacentCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x,y)) {
 //                   pixel.stage = 2; //blue
 //                   pixel.color = pixelColorPick(pixel,"#000036");
                    break;
                }
            }
        }
        else if (1 === 1) { //initialized
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true) && listPipes.includes(pixelMap[x][y].element)) {
                    var newPixel = pixelMap[x][y];
                    if (newPixel.stage === 1) {
                        var newColor;
                        switch (pixel.stage) {
//                            case 2: newPixel.stage = 3; newColor = "#003600"; break; //green
 //                           case 3: newPixel.stage = 4; newColor = "#360000"; break; //red
//                            case 4: newPixel.stage = 2; newColor = "#000036"; break; //blue
                        }
 //                       newPixel.color = pixelColorPick(newPixel,newColor);
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
                    if (listPipes.includes(newPixel.element)) {
                        var nextStage;
                        switch (pixel.stage) {
 //                           case 2: nextStage = 4; break; //green
//                            case 3: nextStage = 2; break; //red
 //                           case 4: nextStage = 3; break; //blue
                        }
                        if (pixel.con && !newPixel.con) { //transfer to adjacent pipe
                            newPixel.con = pixel.con;
                            newPixel.con.x = newPixel.x;
                            newPixel.con.y = newPixel.y;
                            pixel.con = null;
                            moved = true;
                            break;
                        }
                    }
                    else if (!pixel.con && elements[newPixel.element].movable && (elements[newPixel.element].state == "liquid") ) { //suck up pixel
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
            if (pixel.con && !moved) { // move to same stage if none other
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
                    if (!isEmpty(x,y,true) && listPipes.includes(pixelMap[x][y].element)) {
                        var newPixel = pixelMap[x][y];
                        if (pixel.con && !newPixel.con) {
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
    category: "machines",
    movable: false,
    canContain: true,
	noMix: true,
}
elements.gas_filter = {
    color: "#599fc2",
    tick: function(pixel) {
        if (1 === 2) {
           for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x,y)) {
//                    createPixel("brick",x,y);
//                    pixelMap[x][y].color = pixelColorPick(pixel,"#808080");
                }
            }
 //           pixel.stage = 1;
        }
        else if (1 === 2) { //uninitialized
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coord = adjacentCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x,y)) {
 //                   pixel.stage = 2; //blue
 //                   pixel.color = pixelColorPick(pixel,"#000036");
                    break;
                }
            }
        }
        else if (1 === 1) { //initialized
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true) && listPipes.includes(pixelMap[x][y].element)) {
                    var newPixel = pixelMap[x][y];
                    if (newPixel.stage === 1) {
                        var newColor;
                        switch (pixel.stage) {
//                            case 2: newPixel.stage = 3; newColor = "#003600"; break; //green
 //                           case 3: newPixel.stage = 4; newColor = "#360000"; break; //red
//                            case 4: newPixel.stage = 2; newColor = "#000036"; break; //blue
                        }
 //                       newPixel.color = pixelColorPick(newPixel,newColor);
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
                    if (listPipes.includes(newPixel.element)) {
                        var nextStage;
                        switch (pixel.stage) {
 //                           case 2: nextStage = 4; break; //green
//                            case 3: nextStage = 2; break; //red
 //                           case 4: nextStage = 3; break; //blue
                        }
                        if (pixel.con && !newPixel.con) { //transfer to adjacent pipe
                            newPixel.con = pixel.con;
                            newPixel.con.x = newPixel.x;
                            newPixel.con.y = newPixel.y;
                            pixel.con = null;
                            moved = true;
                            break;
                        }
                    }
                    else if (!pixel.con && elements[newPixel.element].movable && (elements[newPixel.element].state == "gas")) { //suck up pixel
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
            if (pixel.con && !moved) { // move to same stage if none other
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
                    if (!isEmpty(x,y,true) && listPipes.includes(pixelMap[x][y].element)) {
                        var newPixel = pixelMap[x][y];
                        if (pixel.con && !newPixel.con) {
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
    category: "machines",
    movable: false,
    canContain: true,
	noMix: true,
}
function weightedAverage(num1, num2, weight){
    return ((weight * num1)+((1-weight)*num2))
}
elements.dyer = {
    customColor: true,
    color: ["#ff0000","#ff8800","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"],
    behavior: behaviors.wall,
    movable: false,
    state: "solid",
    category: "machines",
    tick: function(pixel){
        for (var i = 0; i < squareCoordsShuffle.length; i++) {
            var coord = squareCoordsShuffle[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (!isEmpty(x,y,true)) {
                if (!(pixelMap[x][y].element == "dyer")){
                    var newPixel = pixelMap[x][y];
                    var rgb1 = pixel.color.match(/\d+/g);
                    var rgb2 = newPixel.color.match(/\d+/g);
                    // average the colors
                    var rgb = [
                        weightedAverage(parseInt(rgb1[0]), parseInt(rgb2[0]), 0.2),
                        weightedAverage(parseInt(rgb1[1]), parseInt(rgb2[1]), 0.2),
                        weightedAverage(parseInt(rgb1[2]), parseInt(rgb2[2]), 0.2),
                    ];
                    // convert rgb to hex
                    var hex = RGBToHex(rgb);
                    newPixel.color = pixelColorPick(newPixel, hex);
                }
            }
        }
    }
}
elemfillerVar = 0;
elements.element_filler = {
    category: "special",
    color: elements.filler.color,
    excludeRandom: true,
    state: "solid",
    movable: "false",
    onSelect: function() {
        var answer6 = prompt("Please input the desired element of this filler. It will not work if you do multiple filler types while paused.",(elemfillerVar||undefined));
        if (!answer6) { return }
		elemfillerVar = mostSimilarElement(answer6);
    },
    tick: function(pixel){
        var neighbors = 0;
        if(!pixel.changeElem){
            pixel.changeElem = elemfillerVar;
        }
		for (var i = 0; i < squareCoords.length; i++) {
            var coord = squareCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (!isEmpty(x,y, true)) {
				neighbors = neighbors + 1;
			} else if (isEmpty(x, y)){
                createPixel("element_filler", x, y)
                pixelMap[x][y].changeElem = pixel.changeElem;
            } else (
                changePixel(pixel, pixel.changeElem)
            )
        }
        if (neighbors >= 8){
            changePixel(pixel, pixel.changeElem)
        }
    }
} 
var outlinerVar = 0
elements.outliner = {
    color: elements.filler.color,
    category: elements.filler.category,
    excludeRandom: true,
    onSelect: function() {
        var answerot = prompt("Please input the desired element of this outliner. It will not work if you do multiple outliner types while paused.",(outlinerVar||undefined));
        if (!answerot) { return }
		outlinerVar = mostSimilarElement(answerot);
    },
    tick: function(pixel){
        var neighbors = 0;
        if(!pixel.changeElem){
            pixel.changeElem = outlinerVar;
            if (pixel.nDelete == undefined){
                pixel.nDelete = false
            }
        }
        if (pixel.nDelete){
            deletePixel(pixel.x, pixel.y)
        }
		for (var i = 0; i < squareCoords.length; i++) {
            var coord = squareCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (!isEmpty(x,y, true)) {
				neighbors = neighbors + 1;
			}
        }
        if (neighbors >= 8){
            pixel.nDelete = true
        } else {
            changePixel(pixel, pixel.changeElem)
        }
    }
}
textures.transparency = [
    "wwwggg",
    "wwwggg",
    "wwwggg",
    "gggwww",
    "gggwww",
    "gggwww"
]
textures.steel = [
    "hHhhd",
    "Hnnnd",
    "hnnnd",
    "hnnnD",
    "dddDD"
]
textures.sponge = [
    "hddddnnddd",
    "Ddhddhnhdd",
    "ddDdnNnNdd",
    "dddhnnnnnh",
    "dhdNnhnnnN",
    "nNnhnNnddd",
    "dhnNnnddhd",
    "dDnnnhddDd",
    "dhnnnNdhdd",
    "ddddnddDdd"
]
textures.copper = [
    "uuuuum",
    "unhhnd",
    "uhhnnD",
    "uhnnHd",
    "unnHnD",
    "mdDdDD"
]
textures.gold = [
    "hnnndbHHHhhnbHHHh",
    "nnndbhnnnnndDbnnn",
    "nnddbnnnnnddDbnnn",
    "dddbnnnddddDDDbnd",
    "DDDbDDDDDDDDDDbDD",
    "BBBBBBBBBBBBBBBBB"
]
textures.diamond = [
    "llcccLbLl",
    "lcccccbbC",
    "CScccBbCC",
    "SSScBBBLC",
    "SSSSLBbLS",
    "SSSCLbbbL",
    "BSCCCnbBL",
    "BBBCnnBBB",
    "lBBcLnLbL"
]
elements.transparency = {
    color: ["#d4d4d4", "#ffffff"],
    colorPattern: textures.transparency,
    colorKey: {
        "g": "#D4D4D4",
        "w": "#ffffff"
    },
    behavior: behaviors.WALL,
    category: "special",
    state: "solid"
}
elements.textured_steel = {
    color: ["#708196", "#8895ad", "#596B77", "#525D6B", "#404954"],
    colorPattern: textures.steel,
    colorKey: {
        "h": "#708196",
        "H": "#8895ad",
        "n": "#596B77",
        "d": "#525D6B",
        "D": "#404954"
    },
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    tick: function(pixel){
        if (pixelTicks - pixel.start == 1){
        pixel.element = "steel"
        }
    }
}
elements.textured_sponge = {
    color: ["#ccaa00", "#c1a100", "#967d00", "#b89a00", "#ae9100"],
    colorPattern: textures.sponge,
    colorKey: {
        "n": "#ccaa00",
        "N": "#c1a100",
        "h": "#967d00",
        "d": "#b89a00",
        "D": "#ae9100"
    },
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    tick: function(pixel){
        if (pixelTicks - pixel.start == 1){
        pixel.element = "sponge"
        }
    }
}
elements.textured_copper = {
    color: ["#772F22", "#AB533F", "#9E3F2D", "#9E3F2D", "#4C1C11"],
    colorPattern: textures.copper,
    colorKey: {
        "u": "#772F22",
        "H": "#AB533F",
        "h": "#C0725A",
        "n": "#9E3F2D",
        "D": "#4C1C11",
        "d": "#622516",
        "m": "#712C1E"
    },
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    tick: function(pixel){
        if (pixelTicks - pixel.start == 1){
        pixel.element = "copper"
        }
    }
}
elements.textured_gold = {
    color: ["#E4B038", "#FFCA59", "#BF8A18", "#7F5A10", "#674611"],
    colorPattern: textures.gold,
    colorKey: {
        "h": "#FFCA59",
        "H": "#FFFFCC",
        "n": "#E4B038",
        "B": "#513412",
        "b": "#674611",
        "d": "#BF8A18",
        "D": "#7F5A10"
    },
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    tick: function(pixel){
        if (pixelTicks - pixel.start == 1){
        pixel.element = "gold"
        }
    }
}
elements.solid_diamond = {
    color: elements.diamond.color,
    category: "solids",
    colorPattern: textures.diamond,
    colorKey: {
        "c":"#36BDF3",
        "C": "#7DD1F2",
        "B": "#4B94ED",
        "b": "#97BEED",
        "L":"#C2D5ED",
        "n": "#7BAEED",
        "l": "#A2DBF2",
        "S": "#BDF8FF"
    },
    tempHigh: elements.diamond.tempHigh,
    stateHigh: elements.diamond.stateHigh,
    state: "solid",
    denisty: elements.diamond.density,
    hardness: elements.diamond.hardness
}
elements.textured_rose_gold = {
    color: ["#FF5991", "#E4386F", "#7F1037", "#FFCCCD", "#671133"],
    colorPattern: textures.gold,
    colorKey: {
        "h": "#FF5991",
        "H": "#FFCCCD",
        "n": "#E4386F",
        "B": "#511230",
        "b": "#671133",
        "d": "#BF1850",
        "D": "#7F1037"
    },
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    tick: function(pixel){
        if (pixelTicks - pixel.start == 1){
        pixel.element = "rose_gold"
        }
    }
}