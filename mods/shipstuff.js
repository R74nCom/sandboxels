// Shipstuff, made by netty

// Ship materials
elements.ship_steel = {
  color: ["#2B7D15", "#2B7D15", "#34E504"],
  behavior: behaviors.WALL,
  hardness: 1,
  tempHigh: 9500,
  stateHigh: "magma",
  density: 1e+20,
};
// Bombers
elements.bomberLeft = {
  color: "#555757",
  conduct: 1, 
  behavior: behaviors.WALL,
  behaviorOn: [
     "XX|XX|XX",
     "CR:ship_missileL|XX|XX",
     "XX|XX|XX",
  ],
};
elements.bomberRight = {
  color: "#555757",
  behavior: behaviors.WALL,
  conduct: 1,  
  behaviorOn: [
     "XX|XX|XX",
     "XX|XX|CR:ship_missileR",
     "XX|XX|XX",
  ],
};

// Missiles
elements.ship_missileR = {
  color: "#FFFFFF",
  hidden: true,
  behavior: [
     "XX|XX|XX",
     "CR:fw_ember|XX|M1",
     "XX|XX|XX",
  ],
  tick: function(pixel) {
      for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x4 = pixel.x+coord[0];
                var y4 = pixel.y+coord[1];
     if (isEmpty(x4, y4, true) && !isEmpty(x, y)) {
            explodeAt(pixel.x, pixel.y, 25, "plasma");
     }
    }
},
};
elements.ship_missileL = {
  color: "#FFFFFF",
  hidden: true,
  behavior: [
     "XX|XX|XX",
     "M1|XX|CR:fw_ember",
     "XX|XX|XX",
  ],
  tick: function(pixel) {
      for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x5 = pixel.x+coord[0];
                var y5 = pixel.y+coord[1];
     if (isEmpty(x5, y5, true) && !isEmpty(x, y)) {
            explodeAt(pixel.x, pixel.y, 25, "plasma");
     }
    }
},
};
  elements.ship_missile = {
    color: ["#F5F6F5", "#E1DFDF"], 
    category: "weapons",
    behavior: [
      "XX|M1|XX",
      "XX|XX|XX",
      "XX|CR:flash|XX",
    ],
    tick: function(pixel) {
      for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x6 = pixel.x+coord[0];
                var y6 = pixel.y+coord[1];
     if (isEmpty(x6, y6, true) && !isEmpty(x, y)) {
            explodeAt(pixel.x, pixel.y, 30, "plasma, fire, fw_ember");
     }
    }
   },
  };
  elements.ship_flare = {
    color: ["#FFBD00", "#FF4200", "#7C00FF"],
    category: "weapons",
    behavior: [
      "XX|M1|XX",
      "XX|XX|XX",
      "XX|CR:smoke|XX",
    ],
    tick: function(pixel) {
      for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x7 = pixel.x+coord[0];
                var y7 = pixel.y+coord[1];
     if (isEmpty(x7, y7, true) && !isEmpty(x, y)) {
            explodeAt(pixel.x, pixel.y, 20, "fw_ember, smoke");
     }
    }
   },
  };
// Bombs / Nukes
elements.stationary_nuke = {
color: ["#E7E71B", "#CCCC31", "#048904"],
burn: 25,
burnInto: "n_explosion",
burnTime: 200,
behavior: WALL,
};
elements.naval_mine = {
   color: ["#0C32A0", "#09267A"],
   behavior: behaviors.POWDER,
   reactions: {
    "water": { elem1: "explosion", elem2: "water" },
    "salt_water": { elem1: "explosion", elem2: "salt" },
   },
   hardness: 0.45,
   density: 500,
};

// Other ship materials
elements.tempered_glass = {
   color: "#A1A1A1",
   behavior: behaviors.WALL,
   colorPattern: textures.GLASS,
   colorKey: {
        "g": "#5e807d",
        "s": "#638f8b",
        "S": "#679e99"},
        hardnesss: 0.85,
        tempHigh: 2500,
        stateHigh: "rad_glass",
        density: 5700,
};
elements.bulletproof_glass= {
   color: "#5E5F5E",
   behavior: behaviors.WALL,
   colorPattern: textures.GLASS,
   colorKey: {
        "g": "#5e807d",
        "s": "#638f8b",
        "S": "#679e99"},
        hardnesss: 0.94,
        tempHigh: 3500,
        stateHigh: "rad_glass",
        density: 6000,
};
elements.asphalt = {
   color: "#313131",
   behavior: behaviors.WALL,
   hardness: 0.35,
   density: 145,
   tempHigh: 2500,
   stateHigh: "molten_asphalt",
};
elements.molten_asphalt = {
   color: "#313131",
   behavior: behaviors.LIQUID,
   hardness: 0.30,
   density: 125,
   temp: 3000,
   burnTime: 50
};
// Technologies
elements.flare_shooter = {
  color: ["#000000", "#FFBD00"],
  conduct: 1,  
  behavior: behaviors.WALL,
  behaviorOn: [
    "XX|CR:ship_flare|XX",
    "XX|XX|XX",
    "XX|XX|XX",
  ],
  hardness: 0.20,
  tempHigh: 2000,
  stateHigh: "molten_glass",
  density: 900,
};
elements.flying_nuker ={
   color: ["#0BD10B", "#034603"],
   behavior: [
     "XX|XX|XX",
     "XX|XX|M1 AND BO",
     "XX|CR:nuke|XX",
   ],
   hardness: 0.55,
   density: 300
};
// End of mod