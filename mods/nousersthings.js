elements.caesium = {
color: ["#917921", "#ebcb59", "#a48b2d", "#d6b84c"],
behavior: behaviors.WALL,
category: "solids",
state: "solid",
tempHigh: 28.44,
stateHigh: "molten_caesium",
density: 1873,
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
	density: 11500
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
                if (!isEmpty(x,y)) {
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
},
elements.destroyable_roomtemper = {
	color: "#18401a",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y)) {
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
},
elements.customtemper = {
	color: "#421b6b",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y)) {
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
},
elements.destroyable_customtemper = {
	color: "#261047",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y)) {
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
listPipes = ["pipe", "destroyable_pipe", "destroyable_e_pipe","channel_pipe","destroyable_channel_pipe","bridge_pipe"];
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
                    else if (!pixel.con && elements[newPixel.element].movable && (newPixel.element == pixel.filterType) ) { //suck up pixel
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
	color: "#787878",
	behavior: behaviors.WALL,
	category: "solids",
	state: "solid",
	tempHigh: 1538,
	stateHigh: "molten_iron",
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
	tempHigh: 100,
	stateHigh: "steam",
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
            changePixel(ingredient, "soup")
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
	density: 1100,
	stain: 0.02,
	state: "liquid",
},
elements.broth.onMix = function(pixel){
	changePixel(pixel, "soup")
}//,
//elements.portal_in = {
//	color: "#FFA000",
//	behavior: behaviors.WALL,
//	tick: function(pixel) {
//	},
//	category: "machines",
//	state: "solid",
//},
//elements.portal_out = {
//	color: "#0000FF",
//	behavior: behaviors.WALL,
//	tick: function(pixel) {
//	},
//	category: "machines",
//	state: "solid",
//}
