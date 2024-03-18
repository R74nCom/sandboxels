// this is a epic mod

let heatSen = 0;
elements.heatSensor = {
    
	color: "#ff0000",
    conduct: 1,
    category:"test",
	behavior: behaviors.WALL,
	
	onSelect: function(pixel){
    setTemp = parseInt(prompt("Enter the temperature you want it to sense. zero will not work", (heatSen || undefined)));
	        
  },
  
	
	tick: function(pixel) {
        if((pixel.start == pixelTicks) && !(heatSen == 0)){
            pixel.clone.temp = heatSen
          }
	
	 if (pixel.temp > pixel.clone ) {
              pixel.charge = 1;
        }

		
  },
        
};

let itemA = "steam";
elements.SteamTurbine = {
  behavior: behaviors.WALL,
    desc: "When steam touches it, it conducts electricity and the steam pixel is deleted",
      color: "#826c6e",
          tick: function(pixel) {
        if(pixel.start == pixelTicks){
          pixel.clone = itemA;
        }

          for (var i = 0; i < adjacentCoords.length; i++) {
              var coords = adjacentCoords[i];
              var x = pixel.x + coords[0];
              var y = pixel.y + coords[1];
              if (!isEmpty(x,y,true)) {
                  var sensed = pixelMap[x][y];
                  if (sensed.element == pixel.clone) {
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

let itemB = "light";
elements.solar_panel = {
  behavior: behaviors.WALL,
  desc: "When light touches it, it conducts electricity and the light pixel is deleted",
      color: "#bebfa3",
          tick: function(pixel) {
        if(pixel.start == pixelTicks){
          pixel.clone = itemB;
        }

          for (var i = 0; i < adjacentCoords.length; i++) {
              var coords = adjacentCoords[i];
              var x = pixel.x + coords[0];
              var y = pixel.y + coords[1];
              if (!isEmpty(x,y,true)) {
                  var sensed = pixelMap[x][y];
                  if (sensed.element == pixel.clone) {
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
	color: "#d16e04",
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
	 behavior: behaviors.WALL,
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
	 breakInto: ["oil","metal_scrap","explosion"],
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
                changePixel(pixel,"rotten_meat");
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
    breakInto: ["oil","metal_scrap","explosion"],
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

//old grinder
// elements.grinder = {
	// color: ["#a1ada5","#ebf5ee","#bac2bc","#848a86","#505251"],
    // category: "machines",
	// density: 1080,
    // state: "solid",
    // conduct: 1,
	// movable: false,
	
	// ignore: "grinder",
	
		// tick: function(pixel) {
        // for (var i = 0; i < adjacentCoords.length; i++) {
            // var coords = adjacentCoords[i];
            // var x = pixel.x + coords[0];
            // var y = pixel.y + coords[1];
            // if (!isEmpty(x,y,true)) {
                // var sensed = pixelMap[x][y];
                // if (sensed.con || elements[sensed.element].movable && pixel.charge > 0) {
                    // breakPixel(sensed);
                // }
            // }
        // }
        // doDefaults(pixel);
    // },
	 // insulate:true
     
	
	
// };



elements.dead_plant.conduct = 1;
// let compact = "dead_plant";
// elements.compacter = {
	// behavior: behaviors.WALL,
      // color: "#bebfa3",
          // tick: function(pixel) {
        // if(pixel.start == pixelTicks){
          // pixel.clone = compact;
        // }
		

          // for (var i = 0; i < adjacentCoords.length; i++) {
              // var coords = adjacentCoords[i];
              // var x = pixel.x + coords[0];
              // var y = pixel.y + coords[1];
              // if (!isEmpty(x,y,true)) {
                  // var sensed = pixelMap[x][y];
                  // if (sensed.element == pixel.clone && pixel.charge > 0) {
					 // sensed.element = "coal"
					 // sensed.color = elements.coal.color
                      // break;
                  // }
              // }
          // }
          // doDefaults(pixel);
      // },
      // conduct: 1,
      // movable: false,
      // category:"machines",
      // darkText: true,
  // hardness: 1,
// }
compactPi = "dead_plant";
compactPi2 = "coal";
elements.compacter = {
    color: "#4e524f",
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
					if  ((newPixel.element == pixel.CompactEl) || (newPixel.element == pixel.CompactEl2) && pixel.charge > 0  ) {
						
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
// im not good at javascript and coding so yeah

filterTypeVar = 0;
elements.filter = {
    color: "#599fc2",
    desc: "A filter made by nouser",
    onSelect: function() {
        var answer4 = prompt("Please input the desired element of this filter. It is case senstive.",(filterTypeVar||undefined));
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
					if  (newPixel.element == pixel.filterType ) {
						
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

filterTypeVar2 = 0;
elements.Destructive_Filter = {
    color: "#3c6c85",
    desc: "A filter that destroys anything that isn't allowed to get through",
    onSelect: function() {
        var answer4 = prompt("Please input the desired element of this filter. It is case senstive.",(filterTypeVar||undefined));
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
						}
						else if(!(newPixel.element == "filter") && !(newPixel.element == "Destructive_Filter") && !doNotEF.includes(newPixel.element) ) {
							deletePixel(newPixel.x, newPixel.y);
							break;
							
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
                    else if (!pixel.con  && !doNotEF.includes(newPixel.element) ) { //suck up pixel
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
