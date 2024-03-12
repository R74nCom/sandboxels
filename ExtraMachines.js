elements.heatSensor = {
	color: "#ff0000",
    conduct: 1,
    category:"machines",
	tick: function(pixel) {
        if (pixel.temp > 430 ) {
              pixel.charge = 5;
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
	category: "powders",
	state: "solid",
	density: 208,
    conduct: 0.001
	
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
	category: "land",
	state: "solid",
	stain: 1,
	density: 190,
    conduct: 0.001
	
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


elements.gas = {
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
 behavior: behaviors.DELETE,
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
	color: "#a1ada5",
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
	category: "land",
	state: "solid",
	breakInto: "coal_dust",
	density: 380,
    conduct: 0.001
	
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
