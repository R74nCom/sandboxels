// this is a epic mod

heatSen = null;
elements.heatSensor = {
   
	color: "#ff0000",
    conduct: 0.1,
    category:"test",
	behavior: behaviors.WALL,
	
	onSelect: function(pixel){
        heatSen = prompt("Enter the temperature you want it to sense" );
	        
  },
  
	
	tick: function(pixel) {
    
	
	 if (pixel.temp >= heatSen ) {
              pixel.charge = 1;
              
        }

		
  },
        
};


elements.SteamTurbine = {
  behavior: behaviors.WALL,
    desc: "When steam touches it, it conducts electricity and the steam pixel is deleted",
      color: "#826c6e",   
          tick: function(pixel) {
        

          for (var i = 0; i < adjacentCoords.length; i++) {
              var coords = adjacentCoords[i];
              var x = pixel.x + coords[0];
              var y = pixel.y + coords[1];
              if (!isEmpty(x,y,true)) {
                  var sensed = pixelMap[x][y];
                  if (sensed.element == 'steam' ||sensed.element == 'rad_steam' ) {
					  deletePixel(x,y);
                      pixel.charge = 5;
                      break;
                  }
              }
          }
          doDefaults(pixel);
      },
      conduct: 1,
      movable: false,
      category:"machines",
      darkText: true,
  hardness: 1,

  };


elements.coal  = {
    desc: "A black powder that burns",
	color: "#3d3c39",
	behavior: behaviors.POWDER,
	category: "energy",
	state: "solid",
	density: 208,
    conduct: 0.001,
	
	tick: function(pixel) {
        if (pixel.temp > 900 && !pixel.burning) {
            pixel.burning = true;
            pixel.burnStart = pixelTicks;
        }
    },
	
	tempHigh:2500,
    stateHigh: "fire",
    hardness: 0.85,
    burn: 100,
    burnTime: 3500,
};


 elements.coal_dust = {
    desc: "A byproduct of smashed solid coal that burns like coal but for a shorter time",
	color: "#3d3c39",
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
	stain: 1,
	density: 190,
    conduct: 0.001,
	
	tick: function(pixel) {
        if (pixel.temp > 900 && !pixel.burning) {
            pixel.burning = true;
            pixel.burnStart = pixelTicks;
        }
    },
	
	tempHigh:2000,
    stateHigh: "fire",
    hardness: 0.3,
    burn: 100,
    burnTime: 3500,
};


elements.gasoline = {
    color: "#c9c5b1",
    desc: "A liquid that burns and is used to power most cars",
    behavior: behaviors.LIQUID,
    tick: function(pixel) {
        if (pixel.temp > 430 && !pixel.burning) {
            pixel.burning = true;
            pixel.burnStart = pixelTicks;
        }
    },
	tempHigh:3000,
    stateHigh: "fire",
    viscosity: 0.56,
    burn: 100,
    burnTime: 10000,
    fireColor: "#c9c5b1",
    category: "liquids",
    state: "liquid",
    density: 792,
    stain: -0.25,
}


elements.solar_panel = {
  behavior: behaviors.WALL,
  desc: "When light touches it, it conducts electricity and the light pixel is deleted",
      color: "#bebfa3",
          tick: function(pixel) {
       

          for (var i = 0; i < adjacentCoords.length; i++) {
              var coords = adjacentCoords[i];
              var x = pixel.x + coords[0];
              var y = pixel.y + coords[1];
              if (!isEmpty(x,y,true)) {
                  var sensed = pixelMap[x][y];
                  if (sensed.element == 'light') {
					  deletePixel(x,y);
                      pixel.charge = 5;
                      break;
                  }
              }
          }
          doDefaults(pixel);
      },
      conduct: 1,
      movable: false,
      category:"machines",
      darkText: true,
  hardness: 1,

  };

elements.titanium = {
    desc: "Another metal that does not erode nor conduct electricity",
	conduct: 0,
	color: ["#a1ada5","#ebf5ee","#bac2bc","#848a86","#505251"],
	tempHigh:3000,
    stateHigh: "molten_titanium",
    category: "solids",
    state: "soild",
	 hardness: 1,
    density: 792,
	behavior: behaviors.WALL,
};

elements.molten_titanium = {
    desc: "Melted version of titanium",
    temp : 3000,
	conduct: 0,
	color: ["#d16e04","#FFCC99","#FF6600","#FF7F50","#DC143C","#800020"],
	tempLow:2999,
    stateLow: "titanium",
    category: "states",
    state: "soild",
    density: 792,
	behavior: behaviors.MOLTEN,
};

elements.solid_coal = {
    desc: "A solid version of coal",
	color: "#3d3c39",
	behavior: behaviors.WALL,
	category: "energy",
	state: "solid",
	breakInto: "coal_dust",
	density: 380,
    conduct: 0.001,
	
	tick: function(pixel) {
        if (pixel.temp > 900 && !pixel.burning) {
            pixel.burning = true;
            pixel.burnStart = pixelTicks;
        }
    },
	
	tempHigh:3000,
    stateHigh: "fire",
    hardness: 0.85,
    burn: 100,
    burnTime: 3500,
};

elements.rubber = {
    desc: "Not finnished",
	color: "#ffc0cb",
	 hardness: 0.5,
	 tempHigh:180,
	 state: "solid",
	 behavior: behaviors.WALL,
	 conduct: 0,
	 category: "solids",
};

elements.coolant = {
    desc: "Cools down pixels that touch it and is a liquid",
	color: "#71ded3",
	 state: "liquid",
     insulate: true,
	  behavior: behaviors.LIQUID,
      tick: function(pixel) {
       

          for (var i = 0; i < adjacentCoords.length; i++) {
              var coords = adjacentCoords[i];
              var x = pixel.x + coords[0];
              var y = pixel.y + coords[1];
              if (!isEmpty(x,y,true)) {
                  var sensed = pixelMap[x][y];
                  if (sensed.element && sensed.temp > 21 ) {
					 
                     sensed.temp -= 1;
                      break;
                  }
              }
          }
          doDefaults(pixel);
      },
	 conduct: 0.5,
	 category: "test",
	 
};

elements.e_cooler = {
    desc: "Works like the cooler but needs power to work",
	color: elements.cooler.color,
	 hardness: 0.5,
	 state: "solid",
	 behavior: behaviors.WALL,
	 conduct: 1,
	 category: "machines",
	 behaviorOn: [
        "XX|CO:2|XX",
        "CO:2|XX|CO:2",
        "XX|CO:2|XX",
    ],
	name: "E-Cooler",
};

elements.e_Freezer = {
    desc: "Works like the freezer but needs power to work",
	color: elements.cooler.color,
	 hardness: 0.5,
	 state: "solid",
	 behavior: behaviors.WALL,
	 conduct: 1,
	 category: "machines",
	 behaviorOn: [
        "XX|CO:10|XX",
        "CO:10|XX|CO:10",
        "XX|CO:10|XX",
    ],
	name: "E-Freezer",
};

elements.e_heater = {
    desc: "Works like the heater but needs power to work",
	 hardness: 0.5,
	 state: "solid",
	 behavior: behaviors.WALL,
	 conduct: 1,
	 category: "machines",
	  color: "#881111",
    behaviorOn: [
        "XX|HT:4|XX",
        "HT:4|XX|HT:4",
        "XX|HT:4|XX",
    ],
	name: "E-Heater",
};

elements.e_SuperHeater = {
    desc: "Works like the Super Heater but needs power to work",
	 hardness: 0.5,
	 state: "solid",
     color: "#595656",
	 conduct: 1,
	 category: "machines",
	  color: "#881111",
    behaviorOn: [
        "XX|HT:12|XX",
        "HT:12|XX|HT:12",
        "XX|HT:12|XX",
    ],
	name: "E-SuperHeater",
};

elements.slow_Ecloner = {
    desc: "Works like the Slow Cloner but needs power to work",
	 color: "#888800",
	 behavior: behaviors.WALL,
    behaviorOn: [
        "XX|CF%10|XX",
        "CF%10|XX|CF%10",
        "XX|CF%10|XX",
    ],
    ignore: ["cloner","ecloner","clone_powder","floating_cloner","wall","ewall","SteamTurbine","solar_panel"],
    category:"machines",
    insulate:true,
    hardness: 1,
	conduct: 1,
	name: "E-SlowCloner",
};

elements.Android = {
    desc: "A robot",
	color: "#a1ada5",
    category: "life",
	color: ["#f3e7db","#f7ead0","#eadaba","#d7bd96","#a07e56","#825c43","#604134","#3a312a"],
    category: "life",
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            createPixel("AndroidBody", pixel.x, pixel.y+1);
            pixel.element = "AndroidHead";
        }
        else if (isEmpty(pixel.x, pixel.y-1)) {
            createPixel("AndroidHead", pixel.x, pixel.y-1);
            pixelMap[pixel.x][pixel.y-1].color = pixel.color;
            pixel.element = "AndroidBody";
            pixel.color = pixelColorPick(pixel)
        }
        else {
            deletePixel(pixel.x, pixel.y);
        }
    },
    related: ["AndroidBody","AndroidHead"],
    cooldown: defaultCooldown
};


elements.AndroidBody = {
    
	color: ["#a1ada5","#ebf5ee","#bac2bc","#848a86","#505251"],
    category: "life",
    breakInto: ["oil","metal_scrap","pop"],
	 properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
            if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
                var headpixel = pixelMap[pixel.x][pixel.y-2];
                if (headpixel.element == "AndroidHead") {
                    if (isEmpty(pixel.x, pixel.y-1)) {
                        movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
                    }
                }
            }
        }
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            // Turn into rotten_meat if pixelTicks-dead > 500
            if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
                changePixel(pixel,"rust");
            }
            return
        }

        // Find the head
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "AndroidHead") {
            var head = pixelMap[pixel.x][pixel.y-1];
            if (head.dead) { // If head is dead, kill body
                pixel.dead = head.dead;
            }
        }
        else { var head = null }
        if (pixel.burning) {
            pixel.panic += 0.1;
            if (head && pixelTicks-pixel.burnStart > 240) {
                pixel.color = head.color;
            }
        }
        else if (pixel.panic > 0) {
            pixel.panic -= 0.1;
        }

        if (isEmpty(pixel.x, pixel.y-1)) {
            // create blood if decapitated 10% chance
            if (Math.random() < 0.1 && !pixel.charge) {
                createPixel("oil", pixel.x, pixel.y-1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
        else if (head == null) { return }
        else if (Math.random() < 0.1*(isEmpty(pixel.x, pixel.y+1) ? 1 : pixel.panic+1)) { // Move 10% chance
            var movesToTry = [
                [1*pixel.dir,0],
                [1*pixel.dir,-1],
            ];
            // While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
                    var origx = pixel.x+move[0];
                    var origy = pixel.y+move[1];
                    if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
                        movePixel(head, head.x+move[0], head.y+move[1]);
                        break;
                    }
                }
            }
            // 15% chance to change direction
            if (Math.random() < 0.15) {
                pixel.dir *= -1;
            }
            // homeostasis
            if (pixel.temp > 37) { pixel.temp -= 1; }
            else if (pixel.temp < 37) { pixel.temp += 1; }
        }

    }
};

elements.AndroidHead = {
	color: ["#a1ada5","#ebf5ee","#bac2bc","#848a86","#505251"],
    category: "life",
	density: 1080,
    state: "solid",
    conduct: .05,
    temp: 69,
    breakInto: ["oil","metal_scrap","pop"],
};

listPipes = "pipe"


//thx to morechem.js for the idea

let setTemp = "";
elements.ajustableHeater = {
    desc: "Works like a heater but it can be set to a specific temp and needs power to work",
	color: ["#a1ada5","#ebf5ee","#bac2bc","#848a86","#505251"],
    category: "machines",
	density: 1080,
    state: "solid",
    conduct: 1,
	movable: false,
	name: "Ajustable-E-Heater",
	 onSelect: function(pixel){
    setTemp = parseInt(prompt("Enter the temperature you want it set to.", (setTemp || undefined)));
	        
  },
	tick: function(pixel) {
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coords = adjacentCoords[i];
            var x = pixel.x + coords[0];
            var y = pixel.y + coords[1];
            if (!isEmpty(x,y,true)) {
                var sensed = pixelMap[x][y];
                if (sensed.con || elements[sensed.element].movable && pixel.charge > 0) {
                    sensed.temp += setTemp/6;
					
                    break;
                }
            }
        }
        doDefaults(pixel);
    },
	 insulate:true
};



elements.dead_plant.conduct = 1;

compactPi = "dead_plant";
compactPi2 = "coal";
elements.compacter = {
    color: "#4e524f",
    conduct : 1,
    desc: "Turns dead plants into coal and needs power",
    tick: function(pixel) {
		if (pixel.start === pixelTicks) {
			pixel.CompactEl = compactPi
			pixel.CompactEl2 = compactPi2
		}
        if (1 === 2) {
           for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true)) {
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
                    else if (!pixel.con ) { //suck up pixel
					if  ((newPixel.element == pixel.CompactEl) || (newPixel.element == pixel.CompactEl2) ) {
						if (pixel.charge > 0) {
                            pixel.con = newPixel;
                            changePixel(newPixel, "coal")
                            newPixel.color = elements.coal.color
                            deletePixel(newPixel.x,newPixel.y);
                            pixel.con.x = pixel.x;
                            pixel.con.y = pixel.y;
                            pixel.con.del;
                            moved = true;
                            break;
                        }
						}
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
    insulate: true,
}

// thx to nousersthings mod for the filter
// only adding this bc my freind told me so 
// new and improved version which is not 100% copied from nouser but only about 5-10%

filterTypeVar = 0;
elements.filter = {
    
    desc: "A filter made by nouser",
    onSelect: function() {
        logMessage("Needs to be 1 pixel thick");
        var answer4 = prompt("Please input the desired element of this filter. It is case senstive.",(filterTypeVar||undefined));
        if (!answer4) { return }
		filterTypeVar = answer4;
    },
    color: "#414c4f",
   
    tick: function(pixel) {
    
        if (!pixel.stage && pixelTicks-pixel.start > 60) {
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                // delete this bc it makes the pipe walls
                // if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].movable) {
                //     deletePixel(x,y)
                // }
                // if (isEmpty(x,y)) {
                //     createPixel("pipe_wall",x,y);
                // }
            }
            pixel.stage = 2;
        }
        else if (pixel.stage === 1 && pixelTicks-pixel.start > 70) { //uninitialized
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coord = adjacentCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                pixel.stage = 2;
                // this makes the thing blue and keep pixel.stage = 2 cuz without it it breaks the code
                // if (isEmpty(x,y)) {
                //     pixel.stage = 2; //blue
                //     pixel.color = pixelColorPick(pixel,"#000036");
                //     break;
                // }
            }
        }
        else if (pixel.stage > 1 && pixelTicks % 3 === pixel.stage-2) { //initialized
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true) && pixelMap[x][y].element === "pipe") {
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
                    if (newPixel.element === "pipe") {
                        var nextStage;
                        switch (pixel.stage) {
                        
                        }
                        if (pixel.con && !newPixel.con && newPixel.stage === nextStage) { //transfer to jacent pipe
                            newPixel.con = pixel.con;
                            newPixel.con.x = newPixel.x;
                            newPixel.con.y = newPixel.y;
                            pixel.con = null;
                            moved = true;
                            break;
                        }
                    }
                    else if (!pixel.con && elements[newPixel.element].movable  && newPixel.element == filterTypeVar) { //suck up pixel
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
                    if (!isEmpty(x,y,true) && pixelMap[x][y].element === "pipe") {
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
}

filterTypeVar2 = 0;
elements.Destructive_Filter = {
    color: "#3c6c85",
    desc: "A filter that destroys anything that isn't allowed to get through",
    onSelect: function() {
        var answer4 = prompt("Please input the desired element of this filter.The the desired element will not get destroyed but everything else will.",(filterTypeVar||undefined));
        if (!answer4) { return }
		filterTypeVar2 = answer4;
    },
    tick: function(pixel) {
		if (pixel.start === pixelTicks) {
			pixel.filterType = filterTypeVar2
		}
        if (1 === 2) {
           for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true)) {
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
                    else if (!pixel.con ) { //suck up pixel
					if  (newPixel.element == pixel.filterType) {
						
                        pixel.con = newPixel;
		
                        deletePixel(newPixel.x,newPixel.y);
                        pixel.con.x = pixel.x;
                        pixel.con.y = pixel.y;
                        pixel.con.del;
                        moved = true;
                        break;
						} else if (!(newPixel.element == pixel.filterType) && !(newPixel.element == pixel.element))  {    
                            deletePixel(newPixel.x,newPixel.y);
                        }

						
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
    insulate: true,
}



// going to fix the sucking up solids problem soon!!
doNotEF = ["e_grinder","grinder","filter", "battery", "wire", "cloner", "sensor", "heater","cooler", "Ajustable-E-Heater", "E-Cooler", "E-Freezer", "E-Heater", "E-SuperHeater", "E-SlowCloner", "ewall", "titanium", "tungsten", "steel", "insulation","SteamTurbine","solar_panel"];

elements.grinder = {
    color: "#55565c",
	ignore: ["e_grinder","grinder"],
    desc: "Grinds things",
    tick: function(pixel) {
		
        if (1 === 2) {
           for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true)) {
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
                    else if (!pixel.con  && !doNotEF.includes(newPixel.element)) { //suck up pixel
				// (!pixel.con && !(newPixel.element === "e_grinder") && pixel.charge > 0 && !(newPixel.element.movable))
				// (!pixel.con && !(newPixel.element === "grinder") && !(newPixel.element === "e_grinder") && !(newPixel.element === "filter") && (newPixel.element.movable))	
				//!(newPixel.element === "grinder") && !(newPixel.element === "e_grinder")
                        pixel.con = newPixel;
						breakPixel(pixel.con);
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
    insulate: true,
}

//elements.battery.movable: false

elements.e_grinder = {
    color: "#55565c",	
	ignore: ["e_grinder","grinder"],
    conduct: 1,
    desc: "Grinds things,needs power to work",
    tick: function(pixel) {
		
        if (1 === 2) {
           for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true)) {
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
                    else if (!pixel.con  && !doNotEF.includes(newPixel.element) && pixel.charge > 0 ) { //suck up pixel
				
						
                        pixel.con = newPixel;
						breakPixel(pixel.con);
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
    insulate: true,
}



elements.quickSand = {
	color: elements.sand.color,
    category: "land",
    state: "liquid",
    behavior : behaviors.POWDER, //did this as a joke to see if it works lol
    density: 500,
    conduct: 0.02,
}

elements.Acid_Bomb = {    
    color: "#524c41",
    category: "weapons",
    state: "solid",
    density: 1300,
    ignore: "Acid_Bomb",
    excludeRandom: true,
    behavior: behaviors.POWDER,
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:15>acid,acid_gas,acid_gas|M2",
    ],
    
        
       
    
}

elements.E_Spout = {
    name: "E-Spout",
    color: "#606378",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|CR:water|XX",
        "CR:water|XX|CR:water",
        "XX|CR:water|XX",
    ],
    category:"special",
    tempHigh: 1455.5,
    stateHigh: "molten_steel",
    conduct: 1,
}


elements.DestroyableWire = {
    color: "#4d0a03",
    behavior: behaviors.WALL,
    category: "machines",
    insulate: true,
    conduct: 1,
    breakInto  : "metal_scrap",
    noMix: true,
}   


elements.pusherRight = {
  behavior: behaviors.WALL,
    ignore: "pushTest",
          tick: function(pixel) {
           
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coords = adjacentCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
              if (!isEmpty(x,y,true)) {
                  let sensed = pixelMap[x][y];
                  if (!(sensed.element == "pusherRight") ) {


					  var newX =  sensed.x + 1;
                      var newY =  sensed.y ;
                      
                      tryMove(sensed,newX,newY);
                      //break;
                  }
              }
          }
          doDefaults(pixel);
      },
      conduct: 1,
      movable: true,
      category:"machines",
      darkText: true,
  hardness: 1,


  }

  elements.pusherLeft = {
    behavior: behaviors.WALL,
      ignore: "pushTest",
            tick: function(pixel) {
             
              for (var i = 0; i < adjacentCoords.length; i++) {
                  var coords = adjacentCoords[i];
                  var x = pixel.x + coords[0];
                  var y = pixel.y + coords[1];
                if (!isEmpty(x,y,true)) {
                    let sensed = pixelMap[x][y];
                    if (!(sensed.element == "pusherLeft") ) {
  
  
                        var newX =  sensed.x - 1;
                        var newY =  sensed.y ;
                        
                        tryMove(sensed,newX,newY);
                        //break;
                    }
                }
            }
            doDefaults(pixel);
        },
        conduct: 1,
        movable: true,
        category:"machines",
        darkText: true,
    hardness: 1,
  
  
    }

  elements.de_leadifyer = {
    color: "#ff0000",
    tool: function(pixel) {
        if (pixel.element == "lead") {
            deletePixel(pixel.x,pixel.y);
        }
    },
    category: "tools",
};
    elements.NewWater = {
        color: elements.water.color,
        behavior : behaviors.LIQUID,
        category: "test",
	     state: "liquid",
      tick:function(pixel) {
        if (pixel.temp < 20) {
            pixel.color = "#317d7d";
        }
        else if (pixel.temp == 20 ) {
            pixel.color = elements.water.color;
        }
        else if (pixel.temp > 20 && pixel.temp < 30) {
            pixel.color = "#eb8634";
        } 
        else if (pixel.temp > 30) {
            pixel.color = "#eb4034";
        }

      },
      // make it work like normal water
      tempHigh: 100,
      stateHigh: "steam",
      tempLow: 0,
      stateLow: "ice",
     
      heatCapacity: 4.184,
      reactions: {
          "dirt": { // React with (water reacts with dirt to make mud)
              elem1: null, // First element transforms into; in this case, water deletes itself
              elem2: "mud", // Second element transforms into; in this case, dirt turns to mud
          },
          "sand": { elem1: null, elem2: "wet_sand" },
          "clay_soil": { elem1: null, elem2: "clay" },
          "salt": { elem1: "salt_water", elem2: null, temp1:-20 },
          "sugar": { elem1: "sugar_water", elem2: null },
          "honey": { elem1: "sugar_water" },
          "caramel": { elem1: "sugar_water" },
          "molasses": { elem1: "sugar_water" },
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
          "rotten_meat": { elem1: "dirty_water", chance:0.25 },
          "rotten_cheese": { elem1: "dirty_water", chance:0.25 },
          "cancer": { elem1: "dirty_water", chance:0.25 },
          "oil": { elem1: "dirty_water", chance:0.005 },
          "dioxin": { elem1: "dirty_water", chance:0.1 },
          "quicklime": { elem1: "slaked_lime", elem2: "slaked_lime", temp2:100, temp1:100, chance:0.05 },
          "rock": { elem2: "wet_sand", chance: 0.00035 },
          "limestone": { elem2: "wet_sand", chance: 0.00035 },
          "tuff": { elem2: "wet_sand", color2:"#7a6b5c", chance: 0.00035 },
          "ruins": { elem2: "rock", chance: 0.00035 },
          "mudstone": { elem2: "mud", chance: 0.00035 },
          "methane": { elem1:"primordial_soup", elem2:"primordial_soup", tempMin:60, charged:true },
          "ammonia": { elem1:"primordial_soup", elem2:"primordial_soup", tempMin:60, charged:true },
          "fly": { elem2:"dead_bug", chance:0.1, oneway:true },
          "firefly": { elem2:"dead_bug", chance:0.1, oneway:true },
          "bee": { elem2:"dead_bug", chance:0.05, oneway:true },
          "stink_bug": { elem2:"dead_bug", chance:0.1, oneway:true },
          "cured_meat": { elem1:"salt_water", elem2:"meat" },
          // electrolysis:
          "aluminum": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0025 },
          "zinc": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.015 },
          "steel": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0125 },
          "iron": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0125 },
          "tin": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.01 },
          "brass": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.001 },
          "bronze": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.001 },
          "copper": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0075 },
          "silver": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0075 },
          "gold": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0075 },
      },
      state: "liquid",
      density: 997,
      conduct: 0.02,
      stain: -0.5,
      extinguish: true
  }

  elements.test1 = {
    //seed: true,
    maxSize: 1,
    behavior: behaviors.WALL,
    properties : {
        //min: 10,
        //max: 40,
        Curheight : 1,
        height : 40, //Math.floor(Math.random() * (max - min + 1)) + min,
        age: 0,

    },
    category:"test",
    tick:function(pixel) {
        if(isEmpty(pixel.x+1,pixel.y) && pixel.Curheight < pixel.height){
            createPixel("steel",pixel.x+1,pixel.y, );
            }
            if(isEmpty(pixel.x-1,pixel.y) && pixel.Curheight < pixel.height){
                createPixel("steel",pixel.x-1,pixel.y, );
                }
                if(isEmpty(pixel.x+2,pixel.y) && pixel.Curheight < pixel.height){
                    createPixel("steel",pixel.x+2,pixel.y, );
                    }
                    if(isEmpty(pixel.x-2,pixel.y) && pixel.Curheight < pixel.height){
                        createPixel("steel",pixel.x-2,pixel.y, );
                        }

                      
 

                        if(isEmpty(pixel.x,pixel.y-39)  ) {
                            //var built
                            createPixel("concrete",pixel.x,pixel.y-40, );
                        }
                        if(isEmpty(pixel.x-1,pixel.y-39) ) {
                            createPixel("concrete",pixel.x-1,pixel.y-40, );  
                        }
                        if(isEmpty(pixel.x+1,pixel.y-39 )) {
                            createPixel("concrete",pixel.x+1,pixel.y-40, );  
                        }
            for (let i = pixel.Curheight; i < pixel.height; i++) {
                if(isEmpty(pixel.x,pixel.y-i) && pixel.Curheight < pixel.height){
                    
                   
                    if(isEmpty(pixel.x-2,pixel.y-i) ) {
                        createPixel("concrete",pixel.x-2,pixel.y-i, );  
                    }
                    if(isEmpty(pixel.x+2,pixel.y-i) ) {
                        createPixel("concrete",pixel.x+2,pixel.y-i, );  
                    }
                        i+1
                        pixel.Curheight +1;
                }
            }
            




           
      
        if(pixel.age > 100) {
            changePixel(pixel,"steel");
        }
        pixel.age++
        doDefaults(pixel);
        
    }
}


elements.test2 = {
   //seed: true,
   maxSize: 1,
   behavior: behaviors.WALL,
   properties : {
       //min: 10,
       //max: 40,
       baseLimit : 18,
       base:1,

       Curheight : 1,
       height : 18, //Math.floor(Math.random() * (max - min + 1)) + min,
       age: 0,

   },
   category:"test",
   tick:function(pixel) {
        //base
        if(isEmpty(pixel.x-i,pixel.y) ) {
            createPixel("steel",pixel.x-18,pixel.y, );  
        }
        for (let i = pixel.base; i < pixel.baseLimit; i++) {
           
                
               
                if(isEmpty(pixel.x-i,pixel.y) ) {
                    createPixel("steel",pixel.x-i,pixel.y, );  
                }
               
                    i+1
                    pixel.base +1;
            
        }

        for (let i = pixel.Curheight; i < pixel.height; i++) {
           
                
               
            if(isEmpty(pixel.x,pixel.y-i) ) {
                createPixel("steel",pixel.x,pixel.y-i, );  
            }
            if(isEmpty(pixel.x-18,pixel.y-i) ) {
                createPixel("steel",pixel.x-18,pixel.y-i, );  
            }
            if(isEmpty(pixel.x-i,pixel.y-17) ) {
                createPixel("steel",pixel.x-i,pixel.y-17);  
            }
           
                i+1
                pixel.Curheight +1;
        
         }
                     

       if(pixel.age > 100) {
           changePixel(pixel,"steel");
       }
       pixel.age++
       doDefaults(pixel);
       
   } 
}



  tarY = null;
  tarX = null;
 
elements.guided_missile = {
    maxSize: 1,
    behavior: behaviors.WALL,
    
    onSelect: function(pixel){
       
        tarX = prompt("enter x");
         tarY = prompt("enter y");
        
      },
      properties: {
        luanched : false,
        speed :2,
        AtY : false,
     },
      
      
            tick: function(pixel) {
                
                        if(pixel.temp >= 100) {
                     
                    pixel.luanched = true;
                    pixel.clone = "fire";
                    var newX =  pixel.x ;
                    var newY =  pixel.y - pixel.speed;
                    
                   
                        if (!(pixel.y == tarY) && pixel.y > tarY ) {
                            if((!tarY-pixel.y === 1) || (!tarY-pixel.y === -1)) {
                                let test = createPixel("fire",pixel.x,pixel.y+3); 
                                if(isEmpty(newX,newY)) {
                                       tryMove(pixel,newX,newY,);
                                } else {
                                    explodeAt(pixel.x, pixel.y, 13, ["fire","fire","plasma","plasma","plasma","plasma"]);
                                    
                                    deletePixel(pixel.x,pixel.y);
                                }
                                
                                 pixel.AtY = true;
                            } else {
                                pixel.speed = 1;
                                let test = createPixel("fire",pixel.x,pixel.y+3); 
                                if(isEmpty(newX,newY)) {
                                        tryMove(pixel,newX,newY,);
                                } else {
                                    explodeAt(pixel.x, pixel.y, 13, ["fire","fire","plasma","plasma","plasma","plasma"]);
                                    
                                    deletePixel(pixel.x,pixel.y);
                                }
                               
                                 //pixel.AtY = true;
                            }
                            
                        }
                            else if(!(pixel.y == tarY) && pixel.y < tarY ){
                                if((!tarY-pixel.y === 1) || (!tarY-pixel.y ===   -1)) {
                                    let test = createPixel("fire",pixel.x,pixel.y-3);
                                    if(isEmpty(pixel.x,pixel.y+pixel.speed)) {
                                       tryMove(pixel,pixel.x,pixel.y + pixel.speed,);
                                    } else {
                                        explodeAt(pixel.x, pixel.y, 13, ["fire","fire","plasma","plasma","plasma","plasma"]);
                                    
                                         deletePixel(pixel.x,pixel.y);
                                    }
                                   
                                     pixel.AtY = true;
                                } else {
                                    pixel.speed = 1;
                                    let test = createPixel("fire",pixel.x,pixel.y-3);
                                    if(isEmpty(pixel.x,pixel.y+pixel.speed)) {
                                       tryMove(pixel,pixel.x,pixel.y - pixel.speed,);
                                    } else {
                                        explodeAt(pixel.x, pixel.y, 13, ["fire","fire","plasma","plasma","plasma","plasma"]);
                                    
                                    deletePixel(pixel.x,pixel.y);
                                    }
                                   
                                     //pixel.AtY = true;
                                }

                                
                            } 
                            else if(pixel.AtY = true) {
                                if(pixel.x > tarX) {
                                    pixel.speed = 2;
                                    let test = createPixel("fire",pixel.x,pixel.y);
                                    if(isEmpty(pixel.x-1,pixel.y)) {
                                        tryMove(pixel,pixel.x-pixel.speed,pixel.y,test);
                                    } else {
                                        explodeAt(pixel.x, pixel.y, 13, ["fire","fire","plasma","plasma","plasma","plasma"]);
                                    
                                    deletePixel(pixel.x,pixel.y);
                                    }
                            
                                }
                                else if(pixel.x < tarX) {
                                    pixel.speed = 2;
                                    let test = createPixel("fire",pixel.x,pixel.y);
                                    if(isEmpty(pixel.x+2,pixel.y)) {
                                        tryMove(pixel,pixel.x+pixel.speed,pixel.y,test  );
                                     } else {
                                        explodeAt(pixel.x, pixel.y, 13, ["fire","fire","plasma","plasma","plasma","plasma"]);
                                    
                                    deletePixel(pixel.x,pixel.y);
                                     }
                                   
                                    
                                }
                                else if (pixel.x == tarX){
                                    explodeAt(pixel.x, pixel.y, 13, ["fire","fire","plasma","plasma","plasma","plasma"]);
                                    
                                    deletePixel(pixel.x,pixel.y);
                                } 
                                if(tarX-pixel.x == 1 || tarX-pixel.x == -1) {
                                    explodeAt(pixel.x, pixel.y, 13, ["fire","fire","plasma","plasma","plasma","plasma"]);  
                                    deletePixel(pixel.x,pixel.y);
                                }
                               
                            }

                            

                    
                   
                   
                    
                
            

        }
        },
        conduct: 1,
        movable: true,
        category:"test",
        darkText: true,
    hardness: 1,
  
    
    }

   
    elements.room_temp.category = "tools"
    elements.uncharge.category = "tools"
    elements.unburn.category = "tools"
    

textures.Reniforced_Titanuim = {
    REINFORCEDTITANIUM: [
        "GiGgggGiGGg",
        "gggGGGGgggg",
        "iiiiiiiiiii",
        "GgGGggggGGg",
        "GggGGgggGGg",
        "igGGGgggggi",
        "GggggggGGGG",
        "GggGGgggggg",
        "Ggggggggggg",
        "ggggggGGggg",
        "Ggggggggggg",
        "iiiiiiiiiii",],
  
   
}                                                                                                                 

elements.Reniforced_Titanuim = {
    color: "#787878",
    colorPattern: textures.Reniforced_Titanuim.REINFORCEDTITANIUM,
    colorKey: {
        "g": "#787878",
        "G": "#606060",
        "i": "#332f2f"},
    behavior: behaviors.WALL,
    
    tempHigh: 4000,
    stateHigh : "molten_titanium",
    category: "solids",
    state: "solid",
    density: 5000,
    hardness:1,
    noMix: true
}



elements.Missile_Up = {
    
    maxSize: 1,
    
    properties: {
       luanched : false,
    },
    
      
            
    tick: function(pixel) {
        if(pixel.temp >= 100) {
            pixel.luanched = true;
            if(isEmpty(pixel.x,pixel.y-1) ) {
                let exguast = createPixel("fire",pixel.x,pixel.y + 3)
                tryMove(pixel,pixel.x,pixel.y-2,);
            } else if(!isEmpty(pixel.x, pixel.y-1)) {
                
                explodeAt(pixel.x,pixel.y, 13 ,["fire","plasma","plasma","plasma"]); 
                    deletePixel(pixel.x,pixel.y)
                if(!(pixelMap[pixel.x][pixel.y-1] ==  "Missile_Down") || !(pixelMap[pixel.x][pixel.y-1] ==  "fire") ) {
               
                    explodeAt(pixel.x,pixel.y, 13 ,["fire","plasma","plasma","plasma"]); 
                    deletePixel(pixel.x,pixel.y)
                    
                  } 
              }
          }
          
    
},
        conduct: 1,
        movable: true,
        category:"weapons",
        darkText: true,
    hardness: 1,
  
  
    }

    elements.Missile_Down = {
    
        maxSize: 1,
        
        properties: {
           luanched : false,
        },
        
          
                tick: function(pixel) {
                    if(pixel.temp >= 100) {
                        pixel.luanched = true;
                        if(isEmpty(pixel.x,pixel.y+2) ) {
                            let exguast = createPixel("fire",pixel.x,pixel.y - 3)
                            tryMove(pixel,pixel.x,pixel.y+2,);
                        } else if(!isEmpty(pixel.x, pixel.y+1)) {
                            
                            explodeAt(pixel.x,pixel.y, 13 ,["fire","plasma","plasma","plasma"]); 
                                deletePixel(pixel.x,pixel.y)
                            if(!(pixelMap[pixel.x][pixel.y+1] ==  "Missile_Down") || !(pixelMap[pixel.x][pixel.y-1] ==  "fire") ) {
                           
                                explodeAt(pixel.x,pixel.y, 13 ,["fire","plasma","plasma","plasma"]); 
                                deletePixel(pixel.x,pixel.y)
                                
                              } 
                          }
                      }
                      
                
            },
            conduct: 1,
            movable: true,
            category:"weapons",
            darkText: true,
        hardness: 1,
      
      
        }
        elements.Missile_Left = {
    
            maxSize: 1,
            
            properties: {
               luanched : false,
            },
            
              
                    
            tick: function(pixel) { 
                if(pixel.temp >= 100) {
                    pixel.luanched = true;
                    if(isEmpty(pixel.x-1,pixel.y) ) {
                        let exguast = createPixel("fire",pixel.x+3,pixel.y)
                        tryMove(pixel,pixel.x-2,pixel.y);
                    } else if( !isEmpty(pixel.x-1, pixel.y) && !isEmpty(pixel.x-2, pixel.y) && !outOfBounds(pixel.x-1,pixel.y) && !outOfBounds(pixel.x-2,pixel.y) ) {
                        
                        explodeAt(pixel.x,pixel.y, 13 ,["fire","plasma","plasma","plasma"]); 
                            deletePixel(pixel.x,pixel.y)
                        if(!(pixelMap[pixel.x-1][pixel.y] ==  "Missile_Down") || !(pixelMap[pixel.x][pixel.y-1] ==  "fire") ) {
                       
                            explodeAt(pixel.x,pixel.y, 13 ,["fire","plasma","plasma","plasma"]); 
                            deletePixel(pixel.x,pixel.y)
                            
                          } 
                      }
                  }
                  
            
        },
                conduct: 1,
                movable: true,
                category:"weapons",
                darkText: true,
            hardness: 1,
          
          
            }


            elements.Missile_Right = {
    
                maxSize: 1,
                
                properties: {
                   luanched : false,
                },
                
                  
                        
                tick: function(pixel) { 
                    if(pixel.temp >= 100) {
                        pixel.luanched = true;
                        if(isEmpty(pixel.x+1,pixel.y) ) {
                            let exguast = createPixel("fire",pixel.x-3,pixel.y)
                            tryMove(pixel,pixel.x+2,pixel.y);
                        } else if( !isEmpty(pixel.x+1, pixel.y) && !isEmpty(pixel.x+2, pixel.y) && !outOfBounds(pixel.x+1,pixel.y) && !outOfBounds(pixel.x+2,pixel.y) ) {
                            
                            explodeAt(pixel.x,pixel.y, 13 ,["fire","plasma","plasma","plasma"]); 
                                deletePixel(pixel.x,pixel.y)
                            if(!(pixelMap[pixel.x+1][pixel.y] ==  "Missile_Down") || !(pixelMap[pixel.x][pixel.y+1] ==  "fire") ) {
                           
                                explodeAt(pixel.x,pixel.y, 13 ,["fire","plasma","plasma","plasma"]); 
                                deletePixel(pixel.x,pixel.y)
                                
                              } 
                          }
                      }
                      
                
            },
                    conduct: 1,
                    movable: true,
                    category:"weapons",
                    darkText: true,
                hardness: 1,
              
              
                }
    
        elements.pancho = {
            tempHigh: 300,
            stateHigh: "steam",
            color: ["#bd8e0d","#0ec930","#ff0000","#fcf800"],
            singleColor: true,
            behavior: behaviors.STURDYPOWDER,
            category: "food",
            state: "liquid"
        };


//imma finnish rest later
    elements.pesticide = {
        category: "test",
        state: "liquid",
        color: elements.plant.color,
        behavior:behaviors.LIQUID,
        reactions : {
            "plant": { elem1: "dead_plant" },
            "algae": { elem1: "dead_plant" },
            "cactus": { elem1: "dead_plant" },
            "hive": { elem1: "dead_plant" },
            "sapling": { elem1: "dead_plant" },
            "pinecone": { elem1: "dead_plant" },
            "evergreen": { elem1: "dead_plant" },
            "hyphae": { elem1: "dead_plant" },
            "petal": { elem1: "dead_plant" },
            "pistil": { elem1: "dead_plant" },
            "tree_branch": { elem1: "wood" },
        }

    }

    elements.uranium_particles = {
        color: ["#599e61","#364d3c","#494d4a","#6c8a42","#798d65","#b5e089"],
        tick: behaviors.BOUNCY,
        reactions: {
            "uranium_particles": { elem1:null, elem2:"supernova", chance:0.000001}
        },
        category: "???????",
       

    }
    ignoreGate = ["wall", "wire", "battery"];
    elements.air_filter = {
            
           
            color: "#414c4f",
           
            tick: function(pixel) {
                pixel.stage = 2
                if (!pixel.stage && pixelTicks-pixel.start > 60) {
                    for (var i = 0; i < squareCoords.length; i++) {
                        var coord = squareCoords[i];
                        var x = pixel.x+coord[0];
                        var y = pixel.y+coord[1];
                        
                    }
                    pixel.stage = 2;
                }
                else if (pixel.stage === 1 && pixelTicks-pixel.start > 70) { //uninitialized
                    for (var i = 0; i < adjacentCoords.length; i++) {
                        var coord = adjacentCoords[i];
                        var x = pixel.x+coord[0];
                        var y = pixel.y+coord[1];
                        pixel.stage = 2;
                      
                    }
                }
                else if (pixel.stage > 1 && pixelTicks % 3 === pixel.stage-2) { //initialized
                    for (var i = 0; i < squareCoords.length; i++) {
                        var coord = squareCoords[i];
                        var x = pixel.x+coord[0];
                        var y = pixel.y+coord[1];
                        if (!isEmpty(x,y,true) && pixelMap[x][y].element === "pipe") {
                            var newPixel = pixelMap[x][y];
                            if (newPixel.stage === 1) {
                                var newColor;
                                switch (pixel.stage) {
                               
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
                            if (newPixel.element === "pipe") {
                                var nextStage;
                                switch (pixel.stage) {
                                
                                }
                                if (pixel.con && !newPixel.con && newPixel.stage === nextStage) { //transfer to jacent pipe
                                    newPixel.con = pixel.con;
                                    newPixel.con.x = newPixel.x;
                                    newPixel.con.y = newPixel.y;
                                    pixel.con = null;
                                    moved = true;
                                    break;
                                }
                            }
                            else if (!pixel.con && (newPixel.element == "smoke" || newPixel.element == "carbon_dioxide" || newPixel.element == "smog"  || newPixel.element == "rad_steam" || newPixel.element == "oxygen" )) { //suck up pixel
                                changePixel(newPixel,"oxygen");
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
                            if (!isEmpty(x,y,true) && pixelMap[x][y].element === "pipe") {
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
        
    }

    function checkPixels(pixel, upOrDown) {
        var change = null;
        
        var x = pixel.x;
        var y = pixel.y;
    
        for (let i = 0; i < 7; i++) {
            if (upOrDown == true) {
                if (!isEmpty(x, y - i)) {
                    var sensed = pixelMap[x][pixel.y - i];
                    if (!(sensed.element == pixel.element)) {
                        // if (sensed.element.category === "solids") {
                        tryMove(sensed, sensed.x, sensed.y - 1);
                        // }
                    }
                }
            } else if (upOrDown == false) {
                if (!isEmpty(x, y + i)) {
                    var sensed = pixelMap[x][pixel.y + i];
                    if (!(sensed.element == pixel.element)) {
                        // if (sensed.element.category === "solids") {
                        tryMove(sensed, sensed.x, sensed.y + 1);
                        // }
                    }
                }
            }
        }
    }
    function checkPixels2(pixel, BringupOrDown) {
        var change = null;
        
        var x = pixel.x;
        var y = pixel.y;
    
        for (let i = 0; i < 7; i++) {
            if (BringupOrDown == true) {
                if (!isEmpty(x, y - i)) {
                    var sensed = pixelMap[x][pixel.y - i];
                    if (!(sensed.element == pixel.element)) {
                        // if (sensed.element.category === "solids") {
                        tryMove(sensed, sensed.x, sensed.y + 1);
                        // }
                    }
                }
            } else if (BringupOrDown == false) {
                if (!isEmpty(x, y + i)) {
                    var sensed = pixelMap[x][pixel.y + i];
                    if (!(sensed.element == pixel.element)) {
                        // if (sensed.element.category === "solids") {
                        tryMove(sensed, sensed.x, sensed.y - 1);
                        // }
                    }
                }
            }
        }
    }
    
    
    
    elements.Repel_Up_Magnet = {
        color: "#595656",
        behavior: behaviors.WALL,
        singleColor: true,
        category: "machines",
        state: "solid",
        
            tick: function(pixel){
                checkPixels(pixel,true)
            }
    }
    
    elements.Repel_Down_Magnet = {
        color: "#595656",
        singleColor: true,
        category: "machines",
        state: "solid",
        behavior: behaviors.WALL,
        
            tick: function(pixel){
                checkPixels(pixel,false)
            }
    }
    
    elements.Magnet_Pull_Down = {
        color: "#595656",
        singleColor: true,
        category: "machines",
        state: "solid",
        behavior: behaviors.WALL,
        
            tick: function(pixel){
                checkPixels2(pixel,true)
            }
    }
    
    elements.Magnet_Pull_Up = {
        color: "#595656",
        singleColor: true,
        category: "machines",
        state: "solid",
        behavior: behaviors.WALL,
        
            tick: function(pixel){
                checkPixels2(pixel,false)
            }
    }
    
    elements.Nucler_Fusion = {
        color: "#595656",
        maxSize: 1,
        behavior: behaviors.WALL,
        tick: function(pixel) {
            if(pixel.start) {
                explodeAt(pixel.x, pixel.y, 13, ["fire","fire","plasma","plasma","plasma","plasma"]);
            }
        }
    }
    




        SelectedX = null;
        SelectedY = null;
        elements.WireLessPower = {
            color: "#595656",
            singleColor: true,
            category: "machines",
            state: "solid",
            behavior: behaviors.WALL,
            conduct : 1,
            onSelect: function() {
                var answer4 = prompt("X pos",(SelectedX||undefined));
                if (!answer4) { return }
                SelectedX = answer4;
                var answer5 = prompt("Y pos",(SelectedY||undefined));
                if (!answer5) { return }
                SelectedY = answer5;
            },
            
                tick: function(pixel){
                    if (pixel.start === pixelTicks) {
                        pixel.SelX = SelectedX;
                        pixel.SelY = SelectedY;
                        pixel.placed = false;
                  
                    }
                    if(isEmpty(pixel.SelX,pixel.SelY) && pixel.placed == false){
                    createPixel("wire",pixel.SelX,pixel.SelY);
                        pixel.placed = true;
                    }
                    if(pixel.chargeCD) {
                        if (!isEmpty(pixel.SelX,pixel.SelY)) {
                            var sensed = pixelMap[pixel.SelX][pixel.SelY];
                            if(!sensed) {return} 
                            if (!sensed.chargeCD && !sensed.charge) sensed.charge = 1;
                        }
                    }

                }
            }

           

    //     elements.E_Gate = {
            
    //         name: "E-Gate",
    //         color: "#414c4f",
    //        conduct : 1,
    //         tick: function(pixel) {
    //             pixel.stage = 2
    //             if (!pixel.stage && pixelTicks-pixel.start > 60) {
    //                 for (var i = 0; i < squareCoords.length; i++) {
    //                     var coord = squareCoords[i];
    //                     var x = pixel.x+coord[0];
    //                     var y = pixel.y+coord[1];
                        
    //                 }
    //                 pixel.stage = 2;
    //             }
    //             else if (pixel.stage === 1 && pixelTicks-pixel.start > 70) { //uninitialized
    //                 for (var i = 0; i < adjacentCoords.length; i++) {
    //                     var coord = adjacentCoords[i];
    //                     var x = pixel.x+coord[0];
    //                     var y = pixel.y+coord[1];
    //                     pixel.stage = 2;
                      
    //                 }
    //             }
    //             else if (pixel.stage > 1 && pixelTicks % 3 === pixel.stage-2) { //initialized
    //                 for (var i = 0; i < squareCoords.length; i++) {
    //                     var coord = squareCoords[i];
    //                     var x = pixel.x+coord[0];
    //                     var y = pixel.y+coord[1];
    //                     if (!isEmpty(x,y,true) && pixelMap[x][y].element === "pipe") {
    //                         var newPixel = pixelMap[x][y];
    //                         if (newPixel.stage === 1) {
    //                             var newColor;
    //                             switch (pixel.stage) {
                               
    //                             }
    //                             newPixel.color = pixelColorPick(newPixel,newColor);
    //                         }
    //                     }
    //                 }
    //                 var moved = false;
    //                 shuffleArray(squareCoordsShuffle);
    //                 for (var i = 0; i < squareCoordsShuffle.length; i++) {
    //                     var coord = squareCoordsShuffle[i];
    //                     var x = pixel.x+coord[0];
    //                     var y = pixel.y+coord[1];
    //                     if (!isEmpty(x,y,true)) {
    //                         var newPixel = pixelMap[x][y];
    //                         if (newPixel.element === "pipe") {
    //                             var nextStage;
    //                             switch (pixel.stage) {
                                
    //                             }
    //                             if (pixel.con && !newPixel.con && newPixel.stage === nextStage) { //transfer to jacent pipe
    //                                 newPixel.con = pixel.con;
    //                                 newPixel.con.x = newPixel.x;
    //                                 newPixel.con.y = newPixel.y;
    //                                 pixel.con = null;
    //                                 moved = true;
    //                                 break;
    //                             }
    //                         }
    //                         else if (!pixel.con && pixel.chargeCD & !(newPixel.element == pixel.element)&& !(ignoreGate.includes(newPixel.element))) { //suck up pixel
    //                             pixel.con = newPixel;
    //                             deletePixel(newPixel.x,newPixel.y);
    //                             pixel.con.x = pixel.x;
    //                             pixel.con.y = pixel.y;
    //                             pixel.con.del;
    //                             moved = true;
    //                             break;
    //                         }
    //                     }
    //                 }
    //                 if (pixel.con && !moved) { // move to same stage if none other
    //                     for (var i = 0; i < squareCoordsShuffle.length; i++) {
    //                         var coord = squareCoordsShuffle[i];
    //                         var x = pixel.x+coord[0];
    //                         var y = pixel.y+coord[1];
    //                         if (isEmpty(x,y)) { 
    //                             delete pixel.con.del;
    //                             pixel.con.x = x;
    //                             pixel.con.y = y;
    //                             pixelMap[x][y] = pixel.con;
    //                             currentPixels.push(pixel.con);
    //                             pixel.con = null;
    //                             break;
    //                         }
    //                         if (!isEmpty(x,y,true) && pixelMap[x][y].element === "pipe") {
    //                             var newPixel = pixelMap[x][y];
    //                             if (pixel.con && !newPixel.con && newPixel.stage === pixel.stage) {
    //                                 newPixel.con = pixel.con;
    //                                 newPixel.con.x = newPixel.x;
    //                                 newPixel.con.y = newPixel.y;
    //                                 pixel.con = null;
    //                                 break;
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //             doDefaults(pixel);
    //         },
    //         category: "machines",
    //         movable: false,
    //         canContain: true,
        
    // }
    
    // RangeSelected = null;
    // elements.fan = {
    //     color: "#595656",
    //     category: "machines",
    //     state: "solid",
    //     conduct : 1,
    //     behavior : behaviors.WALL,
    //     onSelect: function() {
    //         var answer4 = prompt("Enter a range for how far the fan blows.",(RangeSelected||undefined));
    //         if (!answer4) { return }
    //         RangeSelected = answer4;
    //     },
    //     tick: function(pixel){
    //         if (pixel.start === pixelTicks) {
    //             pixel.RangeBlow = RangeSelected
    //         }
    //         for (let i = 0; i < pixel.RangeBlow; i++) { 
    //         if (!isEmpty(pixel.x+1, pixel.y)) {
    //             var sensed = pixelMap[pixel.x+1][pixel.y];
    //             if (!sensed) {return}
    //             if (!(sensed.element == pixel.element)) {
    //                 if (elements[sensed.element].category == "gases" || elements[sensed.element].category == "powders") {
                       
    //                     tryMove(sensed, sensed.x+1, sensed.y );
    //                  }
    //             }
    //         }
    //      }
    //     },
        
    // }

    // elements.test_Element = {
    //     color: "#595656",
    //     singleColor: true,
    //     category: "test",
    //     state: "solid",
    //     behavior : [
    //         ["XX","DL","XX"],
    //        ["DL","XX","DL"],
    //        ["M2","M1 AND DL","M2"]
    //     ],
    //     tick: function(pixel) {},
    //     conduct : 1,
        
    // }
