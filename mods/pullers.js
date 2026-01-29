// made by voidapex11
// a sandboxels mod that adds pullers
/*
==CHANGELOG==
  Version 2.0.1
@voidapex11
~fixed name of mods category

  Version 2.0.0
@voidapex11
~set max size of the mod description to 1
+gravity cells
+black hole
 it acts like void but it has gravity
~for modders, the gravity range of black holes and gravity cells is customisable

  Version 1.2.1
@voidapex11
~fixed error
+e pullers

  Version 1.1.2
@voidapex11
~fixed spelling mistake's

  Version 1.1.1
@voidapex11
~initial commit
+pullersDesc
+imovable_inator& movable_inator
+imovable wall, steel & insulation
+L, R, U & D pullers
+void light&dark
~don't commit without permission as you may disrupt other dev's hard work
~update changelog with newer updates first
~Version format is:
 rewrites.major updates.paches&minor features 
 put a '#' at the end of the version format if it has not been pushed to the github
~for change-log 
'~' means notes/changes '+' means aditions and '-' is removals 
*/

behaviors.SELFDELETE = [
  "XX|XX|XX",
  "XX|DL|XX",
  "XX|XX|XX",
];

pullerColour = '#e0adb6'

// elements.pullersDesc = {
//   color: pullerColour,
//   name: 'pullers.js',
//   category: "Mods",
//   behavior: behaviors.SELFDELETE,
//   tool: function(pixel) {},
//   onSelect: function(pixel) {
//     let info1stMod = `pullers.js is a mod made by voidapex11 that adds pullers to sandboxels`
//     alert(info1stMod)
//     return
//   },
// };

// for the inator reference: if you know you know
elements.immovable_inator = {
  color: "#525252",
  tool: function(pixel) {
    pixel.immovable = true
  },
  category: "tools",
}

elements.movable_inator = {
  color: "#a8a8a8",
  tool: function(pixel) {
    pixel.immovable = false
  },
  category: 'tools',
}



elements.immovable_wall = {
  color: "#808080",
  behavior: behaviors.WALL,
  category: "solids",
  insulate: true,
  hardness: 1,
  noMix: true,
  properties: {
    immovable: true
  }
}

elements.immovable_steel = {
  color: "#71797e",
  behavior: behaviors.WALL,
  reactions: {
      "water": { elem1:"rust", chance:0.002 },
      "salt_water": { elem1:"rust", chance:0.004 },
      "dirty_water": { elem1:"rust", chance:0.03 },
      "pool_water": { elem1:"rust", chance:0.03 },
      "sugar_water": { elem1:"rust", chance:0.003 },
      "seltzer": { elem1:"rust", chance:0.005 },
      "salt": { elem1:"rust", chance:0.003 },
      "blood": { elem1:"rust", chance:0.002 },
      "infection": { elem1:"rust", chance:0.002 },
      "antibody": { elem1:"rust", chance:0.002 },
  },
  tempHigh: 1455.5,
  category: "solids",
  density: 7850,
  conduct: 0.42,
  hardness: 0.8,
  properties: {
    immovable: true
  }
}

elements.immovable_insulation = {
  color: "#b8aea5",
  behavior: behaviors.WALL,
  category: "solids",
  insulate: true,
  state: "solid",
  noMix: true,
  properties: {
    immovable: true
  }
}



elements.left_puller = {
	color: pullerColour,
	properties: {
		range: 10,
		pushStrength: 1,
	},
	tick: function(pixel) { 
		pixel.range ??= 10;
		pixel.pushStrength ??= 1;
    for(h = pixel.pushStrength; h >= pixel.pushStrength; h--) {
			for (i = 1; i <= pixel.range; i++) {

        if (!isEmpty(pixel.x + i, pixel.y, true)) { 
          if (pixelMap[pixel.x+i][pixel.y]['immovable']) {break}
          else {
            tryMove(pixelMap[pixel.x + i][pixel.y], pixel.x + i - 1, pixel.y); 
          }
        }
      }
		};

		doDefaults(pixel);
	},
	category: "machines",
	breakInto: ["metal_scrap", "steel", "iron", "glass", "uranium", "tin"],
	tempHigh: 2400,
	stateHigh: ["molten_aluminum", "molten_steel", "molten_iron", "molten_glass", "molten_uranium", "molten_tin"],
	density: 10000,
	hardness: 0.85,
	conduct: 1,
	state: "solid",
}



elements.right_puller = {
	color: pullerColour,
	properties: {
		range: 10,
		pushStrength: 1,
	},
	tick: function(pixel) { 
		pixel.range ??= 10;
		pixel.pushStrength ??= 1;
    for(h = pixel.pushStrength; h >= pixel.pushStrength; h--) {
			for (i = 1; i <= pixel.range; i++) {
        if (!isEmpty(pixel.x - i, pixel.y, true)) {
          if (pixelMap[pixel.x-i][pixel.y]['immovable']) {break}
          else {
            tryMove(pixelMap[pixel.x - i][pixel.y], pixel.x - i + 1, pixel.y); 
          }
        }
      }
		};

		doDefaults(pixel);
	},
	category: "machines",
	breakInto: ["metal_scrap", "steel", "iron", "glass", "uranium", "tin"],
	tempHigh: 2400,
	stateHigh: ["molten_aluminum", "molten_steel", "molten_iron", "molten_glass", "molten_uranium", "molten_tin"],
	density: 10000,
	hardness: 0.85,
	conduct: 1,
	state: "solid",
}

elements.down_puller = {
	color: pullerColour,
	properties: {
		range: 10,
		pushStrength: 1,
	},
	tick: function(pixel) { 
		pixel.range ??= 10;
		pixel.pushStrength ??= 1;
    for(h = pixel.pushStrength; h >= pixel.pushStrength; h--) {
			for (i = 1; i <= pixel.range; i++) { 
        
        if (!isEmpty(pixel.x, pixel.y - i, true)) {
          if (pixelMap[pixel.x][pixel.y - i]['immovable']) {break}
          else {
            tryMove(pixelMap[pixel.x][pixel.y - i], pixel.x, pixel.y - i + 1); 
          }
        }
      }
		};

		doDefaults(pixel);
	},
	category: "machines",
	breakInto: ["metal_scrap", "steel", "iron", "glass", "uranium", "tin"],
	tempHigh: 2400,
	stateHigh: ["molten_aluminum", "molten_steel", "molten_iron", "molten_glass", "molten_uranium", "molten_tin"],
	density: 10000,
	hardness: 0.85,
	conduct: 1,
	state: "solid",
}

elements.up_puller = {
	color: pullerColour,
	properties: {
		range: 10,
		pushStrength: 1,
	},
	tick: function(pixel) { 
		pixel.range ??= 10;
		pixel.pushStrength ??= 1;
    for(h = pixel.pushStrength; h >= pixel.pushStrength; h--) {
			for (i = 1; i <= pixel.range; i++) { 
        if (!isEmpty(pixel.x, pixel.y + i, true)) {          
          
          if (pixelMap[pixel.x][pixel.y + i]['immovable']){
            break
          }
          else {
            tryMove(pixelMap[pixel.x][pixel.y + i], pixel.x, pixel.y + i - 1);
          }
        }
      }
		};

		doDefaults(pixel);
	},
	category: "machines",
	breakInto: ["metal_scrap", "steel", "iron", "glass", "uranium", "tin"],
	tempHigh: 2400,
	stateHigh: ["molten_aluminum", "molten_steel", "molten_iron", "molten_glass", "molten_uranium", "molten_tin"],
	density: 10000,
	hardness: 0.85,
	conduct: 1,
	state: "solid",
}

if (enabledMods.includes("mods/pushers.js")) {
  console.info('compatibility with pushers.js and imovable objects coming in a later update of the pullers.js')
}

e_pullerColour='#c3a5d6'

elements.left_e_puller = {
	color: e_pullerColour,
	properties: {
		range: 10,
		pushStrength: 1,
	},
	tick: function(pixel) {
    if (pixel.charge) {
      elements.left_puller.tick(pixel)
    }
		doDefaults(pixel);
	},
	category: "machines",
	breakInto: ["metal_scrap", "steel", "iron", "glass", "uranium", "tin"],
	tempHigh: 2400,
	stateHigh: ["molten_aluminum", "molten_steel", "molten_iron", "molten_glass", "molten_uranium", "molten_tin"],
	density: 10000,
	hardness: 0.85,
	conduct: 1,
	state: "solid",
}



elements.right_e_puller = {
	color: e_pullerColour,
	properties: {
		range: 10,
		pushStrength: 1,
	},
	tick: function(pixel) { 
		if (pixel.charge) {
      elements.right_puller.tick(pixel)
    }

		doDefaults(pixel);
	},
	category: "machines",
	breakInto: ["metal_scrap", "steel", "iron", "glass", "uranium", "tin"],
	tempHigh: 2400,
	stateHigh: ["molten_aluminum", "molten_steel", "molten_iron", "molten_glass", "molten_uranium", "molten_tin"],
	density: 10000,
	hardness: 0.85,
	conduct: 1,
	state: "solid",
}

elements.down_e_puller = {
	color: e_pullerColour,
	properties: {
		range: 10,
		pushStrength: 1,
	},
	tick: function(pixel) { 
		if (pixel.charge) {
      elements.down_puller.tick(pixel)
    }

		doDefaults(pixel);
	},
	category: "machines",
	breakInto: ["metal_scrap", "steel", "iron", "glass", "uranium", "tin"],
	tempHigh: 2400,
	stateHigh: ["molten_aluminum", "molten_steel", "molten_iron", "molten_glass", "molten_uranium", "molten_tin"],
	density: 10000,
	hardness: 0.85,
	conduct: 1,
	state: "solid",
}

elements.up_e_puller = {
	color: e_pullerColour,
	properties: {
		range: 10,
		pushStrength: 1,
	},
	tick: function(pixel) { 
    if (pixel.charge) {
      elements.up_puller.tick(pixel)
    }
		doDefaults(pixel);
	},
	category: "machines",
	breakInto: ["metal_scrap", "steel", "iron", "glass", "uranium", "tin"],
	tempHigh: 2400,
	stateHigh: ["molten_aluminum", "molten_steel", "molten_iron", "molten_glass", "molten_uranium", "molten_tin"],
	density: 10000,
	hardness: 0.85,
	conduct: 1,
	state: "solid",
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
    console.log('hit')
  }
  return arr;
}

elements.gravity_cell = {
  color: pullerColour,
  properties: {
    range: 3,
  },
  tick: function(pixel) {
    pixel.color = ("#" + ((192 + Math.abs((pixelTicks * 4) % 64)).toString(16) + "e0ad").padStart(6, '0'));
    for (j=0; j <=pixel.range; j++) {
      
      // generate the cooridinates that nabough the grav cell
      cords=circleCoords(pixel.x, pixel.y, j)
      for (i in cords) {
        pos = cords[i]
        if (!isEmpty(pos.x,pos.y)&&!(pos.x==pixel.x&&pos.y==pixel.y)){
          x = (pixel.x-pos.x)
          y = (pixel.y-pos.y)
          
          if (x<0) {
            x=-1
          } else if (x>0){
            x=1
          }
  
          if (y<0) {
            y=-1
          } else if (y>0){
            y=1
          }
          
          try {
            tryMove(pixelMap[pos.x][pos.y], pos.x+x, pos.y+y)
          } catch (error) {}// if there is an error, its probably out of bounds, not my problem :)
        }
      }
    }
    doDefaults(pixel);
  },
  category: "machines",
  density: 10000,
  hardness: 1,
  conduct: 0,
  state: "solid",  
}


elements.black_hole = {
  color: elements.void.color,
  maxSize: 1,
  properties: {
    range: 10,
    immovable: true,
  },
  tick: function(pixel) {
    
    for (j=0; j <=pixel.range; j++) {
      
      // generate the cooridinates that neighbour the black hole
      cords=circleCoords(pixel.x, pixel.y, j)
      for (i in cords) {
        pos = cords[i]
        if (!isEmpty(pos.x,pos.y)&&!(pos.x==pixel.x&&pos.y==pixel.y)){
          x = (pixel.x-pos.x)
          y = (pixel.y-pos.y)
          
          if (x<0) {
            x=-1
          } else if (x>0){
            x=1
          }
  
          if (y<0) {
            y=-1
          } else if (y>0){
            y=1
          }
          
          try {
            tryMove(pixelMap[pos.x][pos.y], pos.x+x, pos.y+y)
          } catch (error) {}// if there is an error, its probably out of bounds, not my problem :)
        }
      }
    }

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)&&!((i==0)&&(j==0))) {
          deletePixel(pixel.x+j,pixel.y+i)
        }
      }
    }

    doDefaults(pixel);
  },
  category: "machines",
  density: 10000,
  hardness: 1,
  temp: -273.15,
  insulate:true,
  conduct: 0,
  excludeRandom: true,
  noMix: true,
  state: "solid",  
  movable: false
}
