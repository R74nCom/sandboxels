// made by voidapex11
// a sandboxels mod that adds pullers
/*
==CHANGELOG==
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

elements.pullersDesc = {
  color: pullerColour,
  name: 'pullers.js',
  category: "mods",
  behavior: behaviors.SELFDELETE,
  tool: function(pixel) {},
  onSelect: function(pixel) {
    let info1stMod = `pullers.js is a mod made by voidapex11 that adds pullers to sandboxels`
    alert(info1stMod)
    return
  },
};

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

if (enabledMods.includes("pushers.js")) {
  console.log('compatibility with pushers.js and imovable objects coming in a later update of the pullers.js\neventualy...')
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