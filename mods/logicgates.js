elements.output = {
    color: "#601616",
    category: "logic",
    state: "solid",
    behavior: behaviors.WALL,
    conduct: 1,
    tick: function(pixel){
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coord = adjacentCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (!isEmpty(x,y,true) && pixel.charged) {           
                if (pixelMap[x][y].element == "logic_wire" && pixelMap[x][y].lstate == 0){
                    if (pixelMap[x][y].lastUpdate == pixelTicks){
                        pixelMap[x][y].lstate = 2
                        pixelMap[x][y].color = pixelColorPick(pixelMap[x][y], "#ffe49c")
                    } else {
                        pixelMap[x][y].lstate = 1
                    }
                }
            }
        }
    }
}
elements.logic_wire = {
    color: "#3d4d2c",
    behavior: behaviors.WALL,
    state: "solid",
    category: "logic",
    tick: function (pixel){ // -2 uncharge spread -1 uncharge buffer 0 uncharged 1 charge buffer 2 charge spread
        pixel.lastUpdate = pixelTicks
        if (!pixel.lstate){
            pixel.lstate = 0
        }
        if (pixel.lstate == 0){
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coord = adjacentCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true)) {           
                    if (pixelMap[x][y].element == "output" && pixelMap[x][y].charge == 1){
                        pixel.lstate == 2;
                        pixel.color = pixelColorPick(pixel, "#ffe49c");
                    }
                }
            }
        }
        if (pixel.lstate == 2){
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coord = adjacentCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true)) {           
                    if (pixelMap[x][y].element == "logic_wire" && pixelMap[x][y].lstate == 0){
                        if (pixelMap[x][y].lastUpdate == pixelTicks){
                            pixelMap[x][y].lstate = 2
                            pixelMap[x][y].color = pixelColorPick(pixelMap[x][y], "#ffe49c")
                        } else {
                            pixelMap[x][y].lstate = 1
                        }
                    } else if (pixelMap[x][y].element == "output" && pixelMap[x][y].charged == 0){
                        pixel.lstate = -2
                        pixel.color = pixelColorPick(pixel, "#3d4d2c")
                    }
                }
            }
        }
        if (pixel.lstate == 1){
            pixel.lstate = 2
            pixel.color = pixelColorPick(pixel, "#ffe49c");
        }
        if (pixel.lstate == -2){
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coord = adjacentCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true)) {           
                    if (pixelMap[x][y].element == "logic_wire" && (pixelMap[x][y].lstate == 1 || pixelMap[x][y].lstate == 2)){
                        if (pixelMap[x][y].lastUpdate == pixelTicks){
                            pixelMap[x][y].lstate = -2
                            pixelMap[x][y].color = pixelColorPick(pixelMap[x][y], "#3d4d2c")
                        } else {
                            pixelMap[x][y].lstate = -1
                        }
                    }
                }
            }
            pixel.lstate = 0
        }
        if (pixel.lstate == -1){
            pixel.lstate = -2
            pixel.color = pixelColorPick(pixel, "#3d4d2c");
        }
    }
}
function countNeighbors(){
    var results = {
        "charged": 0,
        "uncharged": 0,
    }
    for (var i = 0; i < squareCoords.length; i++) {
        var coord = squareCoords[i];
        var x = pixel.x+coord[0];
        var y = pixel.y+coord[1];
        if (!isEmpty(x,y, true)) {
            var otherPixel = pixelMap[x][y];
            if (otherPixel.element == "logic_wire"){
                if (otherPixel.lstate > 0){
                    results.charged = results.charged + 1;
                } else {
                    results.uncharged = results.uncharged + 1;
                }
            }
        }
    }
    return results;
}
function chargeOutputs(){
    for (var i = 0; i < squareCoords.length; i++) {
        var coord = squareCoords[i];
        var x = pixel.x+coord[0];
        var y = pixel.y+coord[1];
        if (!isEmpty(x,y, true)) {
            var otherPixel = pixelMap[x][y];
            if (otherPixel.element == "output"){
                    otherPixel.charged = 1;
            }
        }
    }
}
function unchargeOutputs(){
    for (var i = 0; i < squareCoords.length; i++) {
        var coord = squareCoords[i];
        var x = pixel.x+coord[0];
        var y = pixel.y+coord[1];
        if (!isEmpty(x,y, true)) {
            var otherPixel = pixelMap[x][y];
            if (otherPixel.element == "output"){
                    otherPixel.charged = 0;
            }
        }
    }
}
elements.not_gate = {
    color: "#4a1b18",
    category: "logic",
    state: "solid",
    behavior: behaviors.WALL,
    tick: function(pixel){
        var countNeighborsResult = countNeighbors()
        if (countNeighborsResult.charged == 0){
            chargeOutputs();
        } else {
            unchargeOutputs();
        }
    }
}
elements.and_gate = {
    color: "#184a23",
    category: "logic",
    state: "solid",
    behavior: behaviors.WALL,
    tick: function(pixel){
        var countNeighborsResult = countNeighbors()
        if (countNeighborsResult.uncharged == 0){
            chargeOutputs();
        } else {
            unchargeOutputs();
        }
    }
}
elements.xor_gate = {
    color: "#30184a",
    category: "logic",
    state: "solid",
    behavior: behaviors.WALL,
    tick: function(pixel){
        var countNeighborsResult = countNeighbors()
        if (countNeighborsResult.charged == 1){
            chargeOutputs();
        } else {
            unchargeOutputs();
        }
    }
}
elements.or_gate = {
    color: "#4a4018",
    category: "logic",
    state: "solid",
    behavior: behaviors.WALL,
    tick: function(pixel){
        var countNeighborsResult = countNeighbors()
        if (countNeighborsResult.charged >= 1){
            chargeOutputs();
        } else {
            unchargeOutputs();
        }
    }
}
elements.nand_gate = {
    color: "#eb4034",
    category: "logic",
    state: "solid",
    behavior: behaviors.WALL,
    tick: function(pixel){
        var countNeighborsResult = countNeighbors()
        if (countNeighborsResult.uncharged){
            chargeOutputs();
        } else {
            unchargeOutputs();
        }
    }
}
elements.nor_gate = {
    color: "#eb8c34",
    category: "logic",
    state: "solid",
    behavior: behaviors.WALL,
    tick: function(pixel){
        var countNeighborsResult = countNeighbors()
        if (!countNeighborsResult.charged){
            chargeOutputs();
        } else {
            unchargeOutputs();
        }
    }
}
elements.nxor_gate = {
    color: "#ebd834",
    category: "logic",
    state: "solid",
    behavior: behaviors.WALL,
    tick: function(pixel){
        var countNeighborsResult = countNeighbors()
        if (!(countNeighborsResult.charged == 1)){
            chargeOutputs();
        } else {
            unchargeOutputs();
        }
    }
}
elements.E2L_lever = {
    color: "#b2ba75",
    behavior: behaviors.WALL,
    state: "solid",
    category: "logic",
    tick: function(pixel){
        if (pixel.start === pixelTicks){
			pixel.cooldown = 0;
			pixel.toggleMode = 1;
		}
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coord = adjacentCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (!isEmpty(x,y,true)) {           
                if ((pixelMap[x][y].charge || pixelMap[x][y].chargeCD) && pixel.cooldown == 0){
                    for (var i = 0; i < adjacentCoords.length; i++) {
                        var coord = adjacentCoords[i];
                        var x = pixel.x+coord[0];
                        var y = pixel.y+coord[1];
                        if (!isEmpty(x,y,true)) {           
                            if (pixelMap[x][y].element == "logic_wire"){
                                if (pixel.toggleMode == 1){
                                pixelMap[x][y].lstate = 2
                                pixelMap[x][y].color = pixelColorPick(pixel, "#ffe49c");
                                } else {
                                pixelMap[x][y].lstate = -2
                                pixelMap[x][y].color = pixelColorPick(pixel, "#3d4d2c");
                                }
                            }
                        }
                    }
                    pixel.cooldown = 15
                    if (pixel.toggleMode){
                        pixel.toggleMode = 0;
                    } else {
                        pixel.toggleMode = 1;
                    }
                }
            }
        }
        if (pixel.cooldown){
            pixel.cooldown = pixel.cooldown - 1
        }
    }
}
elements.E2L_button = {
    color: "#b2ba75",
    behavior: behaviors.WALL,
    state: "solid",
    category: "logic",
    tick: function(pixel){
        if (pixel.start === pixelTicks){
			pixel.cooldown = 0;
			pixel.toggleMode = 1;
		}
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coord = adjacentCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (!isEmpty(x,y,true)) {           
                if ((pixelMap[x][y].charge || pixelMap[x][y].chargeCD) && pixel.cooldown == 0){
                    for (var i = 0; i < adjacentCoords.length; i++) {
                        var coord = adjacentCoords[i];
                        var x = pixel.x+coord[0];
                        var y = pixel.y+coord[1];
                        if (!isEmpty(x,y,true)) {           
                            if (pixelMap[x][y].element == "logic_wire"){
                                if (pixel.toggleMode == 1){
                                pixelMap[x][y].lstate = 2
                                pixelMap[x][y].color = pixelColorPick(pixel, "#ffe49c");
                                } else {
                                pixelMap[x][y].lstate = -2
                                pixelMap[x][y].color = pixelColorPick(pixel, "#3d4d2c");
                                }
                            }
                        }
                    }
                    pixel.cooldown = 5
                    if (pixel.toggleMode){
                        pixel.toggleMode = 0;
                    } else {
                        pixel.toggleMode = 1;
                    }
                }
            }
        }
        if (pixel.cooldown){
            pixel.cooldown = pixel.cooldown - 1
        }
    }
}
elements.L2E_constant = {
    color: "#b2ba75",
    behavior: behaviors.WALL,
    state: "solid",
    category: "logic",
    tick: function(pixel){
        var foundOn = false;
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coord = adjacentCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (!isEmpty(x,y,true)) {           
                if (pixelMap[x][y].element == "logic_wire" && pixelMap[x][y].lstate > 0){
                    foundOn = true;
                }
            }
        }
        if (foundOn){
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coord = adjacentCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true)) {           
                    if (elements[pixelMap[x][y].element].conduct){
                        pixelMap[x][y].charge = 1
                    }
                }
            }
        } else {
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coord = adjacentCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true)) {           
                    if (elements[pixelMap[x][y].element].conduct){
                        pixelMap[x][y].charge = 0
                    }
                }
            }
        }
    }
}
var transmitterVar = 0;
elements.logic_transmitter = {
    onSelect: function() {
        var answertransmitter = prompt("Please input the desired element of this filter. It will not work if you do multiple filter types while paused.",(transmitterVar||undefined));
        if (!answertransmitter) { return }
		transmitterVar = answertransmitter;
    },
    color: "#c26994",
    state: "solid",
    behavior: behaviors.WALL,
    category: "logic",
    tick: function(pixel){
        var neighborResult = countNeighbors();
        if (pixel.start === pixelTicks){
			pixel.channel = transmitterVar;
		}
        pixel.clone = pixel.channel;
        var receivers = currentPixels.filter(function(pixelToCheck) {
            return (
                pixelToCheck !== pixel && //should work if this pixel is the same as the other one by reference
                pixelToCheck.element == "logic_receiver" &&
                pixelToCheck.channel == pixel.channel
            );
        }).map(pixel => [pixel.x,pixel.y]);
        for(var i in receivers) {
            i = parseInt(i);
            var wifiCoords = receivers[i];
            var newPixel = pixelMap[wifiCoords[0]]?.[wifiCoords[1]];
            if(newPixel) {
                if (neighborResult.charged){
                    for(var j in adjacentCoords) {
                        j = parseInt(j);
                        var pixelAdjacentToWifi = pixelMap[newPixel.x+adjacentCoords[j][0]]?.[newPixel.y+adjacentCoords[j][1]];
                        if(pixelAdjacentToWifi && pixelAdjacentToWifi.element == "logic_wire") { pixelAdjacentToWifi.lstate = 2 };
                   };
                } else {
                    for(var j in adjacentCoords) {
                        j = parseInt(j);
                        var pixelAdjacentToWifi = pixelMap[newPixel.x+adjacentCoords[j][0]]?.[newPixel.y+adjacentCoords[j][1]];
                        if(pixelAdjacentToWifi && pixelAdjacentToWifi.element == "logic_wire") { pixelAdjacentToWifi.lstate = -2 };
                   };
                }
            }
        };
    }
}
elements.logic_receiver = {
    onSelect: function() {
        var answertransmitter = prompt("Please input the desired element of this filter. It will not work if you do multiple filter types while paused.",(transmitterVar||undefined));
        if (!answertransmitter) { return }
		transmitterVar = answertransmitter;
    },
    color: "#69c2ba",
    behavior: behaviors.WALL,
    state: "solid",
    category: "logic",
    tick: function(pixel){
        if (pixel.start === pixelTicks){pixel.channel = transmitterVar}
        pixel.clone = pixel.channel;
    }
}
elements.logic_shock = {
    color: elements.shock.color,
    category: "tools",
    tool: function(pixel){
        if (pixel.element == "logic_wire"){pixel.lstate = 2; pixel.color = pixelColorPick(pixel, "#ffe49c")}
    },
    excludeRandom: true,
}
elements.logic_unshock = {
    color: elements.uncharge.color,
    category: "tools",
    tool: function(pixel){
        if (pixel.element == "logic_wire"){pixel.lstate = -2; pixel.color = pixelColorPick(pixel, "#3d4d2c")}
    },
    excludeRandom: true,
}