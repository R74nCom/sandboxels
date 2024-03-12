elements.heatSensor = {
	color: "#ff0000",
    conduct: 1,
    category:"test",
	behavior: behaviors.WALL,
	tick: function(pixel) {
        if (pixel.temp > 430 ) {
              pixel.charge = 1;
        }
    },
	conduct: 1,
};
let itemA = "steam";
elements.turbine = {
  behavior: behaviors.WALL,
  
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
	color: "#ffc0cb",
	 hardness: 0.5,
	 tempHigh:180,
	 state: "solid",
	 behavior: behaviors.WALL,
	 conduct: 0,
	 category: "solids",
};

elements.coolant = {
	color: "#71ded3",
	 state: "liquid",
	  behavior: behaviors.LIQUID,
	 behavior: [
        "XX|CO:2|XX",
        "CO:2|XX|CO:2",
        "XX|CO:2|XX",
    ],
	 conduct: 0.5,
	 category: "test",
	 
};

elements.e_cooler = {
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
	 color: "#888800",
	 behavior: behaviors.WALL,
    behaviorOn: [
        "XX|CF%10|XX",
        "CF%10|XX|CF%10",
        "XX|CF%10|XX",
    ],
    ignore: ["cloner","ecloner","clone_powder","floating_cloner","wall","ewall","turbine","solar_panel"],
    category:"machines",
    insulate:true,
    hardness: 1,
	conduct: 1,
	name: "E-SlowCloner",
};

elements.Android = {
	color: ["#a1ada5","#ebf5ee","#bac2bc","#848a86","#505251"],
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

