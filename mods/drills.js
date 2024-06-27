/* Made by: NecroticPhantom
   With help from: voidapex11 */

// For change log: "+" = addition, "-" = removal and "~" = change. L, R, U, D corresponds to LEFT, RIGHT, UP and DOWN

/*
===CHANGE LOG===
	Version: 1.0.0 (Drills.js)
@Necrotic_Phantom & @voidapex11
+ steel drill L, R, U & D
+ steel drill missile L, R, U & D
+ diamond drill L, R, U & D
+ diamond drill missile L, R, U & D
+ void drill L, R, U & D
+ void drill missile L, R, U & D
+ drills.js info (drills_info) element to 'mods' category
~ fixed steel/diamond/void drill R & steel/diamond/void drill missile R crashing upon border collision
~ made steel/diamond/void drill missile L, R, U & D explode upon border contact
~ committed

	Version: 1.0.1
@NecroticPhantom
~ fixed steel/diamond/void drill L, R, U & D + steel/diamond/void drill missile L, R, U & D not breaking pixels with no listed hardness

*/


drills_mod_desc_Colour = "#000000"
steel_drill_Colour = "#71797e"
steel_drill_missile_Colour = ["#71797e", "#ff0000"];
diamond_drill_Colour = "#03fcec"
diamond_drill_missile_Colour = ["#03fcec", "#ff0000"];
void_drill_Colour = "#262626"
void_drill_missile_Colour = ["#262626", "#ff0000"];



behaviors.SELFDELETE = [
	"XX|XX|XX",
	"XX|DL|XX",
	"XX|XX|XX",
];



elements.drills_info = {
	color: drills_mod_desc_Colour,
	name: "drills.js_info",
	category: "Mods",
	behavior: behaviors.SELFDELETE,
	maxSize: 1,
	tool: function(pixel) {},
	onSelect: function(pixel) {
		let info1stMod = "The drills.js mod adds different kinds of drills to a new 'drills' category.\n\nMod made by: Necrotic_Phantom. \n With help from: voidapex11."
		alert(info1stMod)
	return
	},
}; 



steel_drill_function = function(pixel, dif_x, dif_y) {
	dif_x = dif_x-pixel.x
	dif_y = dif_y-pixel.y
	if (!outOfBounds(pixel.x+dif_x,pixel.y+dif_y)) {
		pxl = pixelMap[pixel.x+dif_x][pixel.y+dif_y]
		if (!isEmpty(pixel.x+dif_x,pixel.y+dif_y)) {
			if (elements[pxl.element].hardness <= 0.8) {
				delete pixelMap[pixel.x+dif_x][pixel.y+dif_y];
			}
			else if (elements[pxl.element].hardness == undefined) {
				delete pixelMap[pixel.x+dif_x][pixel.y+dif_y];
			};
		};
		tryMove(pixel,pixel.x+dif_x,pixel.y+dif_y);
	};
	doDefaults(pixel);
}

elements.steel_drill_LEFT = {
	color: steel_drill_Colour,
	tick: function(pixel) {
		steel_drill_function(pixel,pixel.x-1,pixel.y);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "steel", "iron", "tin"],
	tempHigh: 10000,
	stateHigh: ["molten_steel", "molten_iron", "molten_tin"],
	density: 10000,
	hardness: 0.8,
	conduct: 1,
	state: "solid",
}

elements.steel_drill_RIGHT = {
	color: steel_drill_Colour,
	tick: function(pixel) {
		steel_drill_function(pixel,pixel.x+1,pixel.y);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "steel", "iron", "tin"],
	tempHigh: 10000,
	stateHigh: ["molten_aluminum", "molten_steel", "molten_iron", "molten_tin"],
	density: 10000,
	hardness: 0.8,
	conduct: 1,
	state: "solid",
}

elements.steel_drill_UP = {
	color: steel_drill_Colour,
	tick: function(pixel) {
		steel_drill_function(pixel,pixel.x,pixel.y-1);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "steel", "iron", "tin"],
	tempHigh: 10000,
	stateHigh: ["molten_aluminum", "molten_steel", "molten_iron", "molten_tin"],
	density: 10000,
	hardness: 0.8,
	conduct: 1,
	state: "solid",
}

elements.steel_drill_DOWN = {
	color: steel_drill_Colour,
	tick: function(pixel) {
		steel_drill_function(pixel,pixel.x,pixel.y+1);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "steel", "iron", "tin"],
	tempHigh: 10000,
	stateHigh: ["molten_aluminum", "molten_steel", "molten_iron", "molten_tin"],
	density: 10000,
	hardness: 0.8,
	conduct: 1,
	state: "solid",
}



steel_drill_missile_function = function(pixel, dif_x, dif_y) {
	dif_x = dif_x-pixel.x
	dif_y = dif_y-pixel.y
	if (pixel.die <= 0) {
		deletePixel(pixel.x, pixel.y)
		explodeAt(pixel.x, pixel.y, 15);
		return true
	};
	if (!outOfBounds(pixel.x+dif_x,pixel.y+dif_y)) {
		pxl = pixelMap[pixel.x+dif_x][pixel.y+dif_y]
		if (!isEmpty(pixel.x+dif_x,pixel.y+dif_y)) {
			pixel.primed = true
			if (elements[pxl.element].hardness <= 0.8) {
				delete pixelMap[pixel.x+dif_x][pixel.y+dif_y];
			}
			else if (elements[pxl.element].hardness == undefined) {
				delete pixelMap[pixel.x+dif_x][pixel.y+dif_y];
			};
		}
		else if (pixel.primed) {
			pixel.die--
			return true
		};
		tryMove(pixel,pixel.x+dif_x,pixel.y+dif_y);
	}
	else if (outOfBounds(pixel.x+dif_x, pixel.y+dif_y)) {
		deletePixel(pixel.x, pixel.y)
		explodeAt(pixel.x, pixel.y, 15);
	};
	doDefaults(pixel);
}

elements.steel_drill_missile_LEFT = {
	color: steel_drill_missile_Colour,
	properties: {
		die: 5,
		primed: false,
	},
	tick: function(pixel) {
		steel_drill_missile_function(pixel,pixel.x-1,pixel.y);
	},
	category: "Drills",
	density: 10000,
	hardness: 0.8,
	conduct: 1,
	state: "solid",
	maxSize: 1,
}

elements.steel_drill_missile_RIGHT = {
	color: steel_drill_missile_Colour,
	properties: {
		die: 5,
		primed: false,
	},
	tick: function(pixel) {
		steel_drill_missile_function(pixel,pixel.x+1,pixel.y);
	},
	category: "Drills",
	density: 10000,
	hardness: 0.8,
	conduct: 1,
	state: "solid",
	maxSize: 1,
}

elements.steel_drill_missile_UP = {
	color: steel_drill_missile_Colour,
	properties: {
		die: 5,
		primed: false,
	},
	tick: function(pixel) {
		steel_drill_missile_function(pixel,pixel.x,pixel.y-1);
	},
	category: "Drills",
	density: 10000,
	hardness: 0.8,
	conduct: 1,
	state: "solid",
	maxSize: 1,
}

elements.steel_drill_missile_DOWN = {
	color: steel_drill_missile_Colour,
	properties: {
		die: 5,
		primed: false,
	},
	tick: function(pixel) {
		steel_drill_missile_function(pixel,pixel.x,pixel.y+1);
	},
	category: "Drills",
	density: 10000,
	hardness: 0.8,
	conduct: 1,
	state: "solid",
	maxSize: 1,
}



diamond_drill_function = function(pixel, dif_x, dif_y) {
	dif_x = dif_x-pixel.x
	dif_y = dif_y-pixel.y
	if (!outOfBounds(pixel.x+dif_x,pixel.y+dif_y)) {
		pxl = pixelMap[pixel.x+dif_x][pixel.y+dif_y]
		if (!isEmpty(pixel.x+dif_x,pixel.y+dif_y)) {
			if (elements[pxl.element].hardness <= 0.99) {
				delete pixelMap[pixel.x+dif_x][pixel.y+dif_y];
			}
			else if (elements[pxl.element].hardness == undefined) {
				delete pixelMap[pixel.x+dif_x][pixel.y+dif_y];
			};
		};
		tryMove(pixel,pixel.x+dif_x,pixel.y+dif_y);
	};
	doDefaults(pixel);
}

elements.diamond_drill_LEFT = {
	color: diamond_drill_Colour,
	tick: function(pixel) {
		diamond_drill_function(pixel,pixel.x-1,pixel.y);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "diamond", "iron", "tin"],
	tempHigh: 10000,
	stateHigh: ["molten_aluminum", "carbon_dioxide", "molten_iron", "molten_tin"],
	density: 10000,
	hardness: 0.99,
	conduct: 1,
	state: "solid",
}

elements.diamond_drill_RIGHT = {
	color: diamond_drill_Colour,
	tick: function(pixel) {
		diamond_drill_function(pixel,pixel.x+1,pixel.y);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "diamond", "iron", "tin"],
	tempHigh: 10000,
	stateHigh: ["molten_aluminum", "carbon_dioxide", "molten_iron", "molten_tin"],
	density: 10000,
	hardness: 0.99,
	conduct: 1,
	state: "solid",
}

elements.diamond_drill_UP = {
	color: diamond_drill_Colour,
	tick: function(pixel) {
		diamond_drill_function(pixel,pixel.x,pixel.y-1);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "diamond", "iron", "tin"],
	tempHigh: 10000,
	stateHigh: ["molten_aluminum", "carbon_dioxide", "molten_iron", "molten_tin"],
	density: 10000,
	hardness: 0.99,
	conduct: 1,
	state: "solid",
}

elements.diamond_drill_DOWN = {
	color: diamond_drill_Colour,
	tick: function(pixel) {
		diamond_drill_function(pixel,pixel.x,pixel.y+1);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "diamond", "iron", "tin"],
	tempHigh: 10000,
	stateHigh: ["molten_aluminum", "carbon_dioxide", "molten_iron", "molten_tin"],
	density: 10000,
	hardness: 0.99,
	conduct: 1,
	state: "solid",
}



diamond_drill_missile_function = function(pixel, dif_x, dif_y) {
	dif_x = dif_x-pixel.x
	dif_y = dif_y-pixel.y
	if (pixel.die <= 0) {
		deletePixel(pixel.x, pixel.y)
		explodeAt(pixel.x, pixel.y, 15);
		return true
	};
	if (!outOfBounds(pixel.x+dif_x,pixel.y+dif_y)) {
		pxl = pixelMap[pixel.x+dif_x][pixel.y+dif_y]
		if (!isEmpty(pixel.x+dif_x,pixel.y+dif_y)) {
			pixel.primed = true
			if (elements[pxl.element].hardness <= 0.99) {
				delete pixelMap[pixel.x+dif_x][pixel.y+dif_y];
			}
			else if (elements[pxl.element].hardness == undefined) {
				delete pixelMap[pixel.x+dif_x][pixel.y+dif_y];
			};
		}
		else if (pixel.primed) {
			pixel.die--
			return true
		};
		tryMove(pixel,pixel.x+dif_x,pixel.y+dif_y);
	}
	else if (outOfBounds(pixel.x+dif_x, pixel.y+dif_y)) {
		deletePixel(pixel.x, pixel.y)
		explodeAt(pixel.x, pixel.y, 15);
	};
	doDefaults(pixel);
}

elements.diamond_drill_missile_LEFT = {
	color: diamond_drill_missile_Colour,
	properties: {
		die: 5,
		primed: false,
	},
	tick: function(pixel) {
		diamond_drill_missile_function(pixel,pixel.x-1,pixel.y);
	},
	category: "Drills",
	density: 10000,
	hardness: 0.99,
	conduct: 1,
	state: "solid",
	maxSize: 1,
}

elements.diamond_drill_missile_RIGHT = {
	color: diamond_drill_missile_Colour,
	properties: {
		die: 5,
		primed: false,
	},
	tick: function(pixel) {
		diamond_drill_missile_function(pixel,pixel.x+1,pixel.y);
	},
	category: "Drills",
	density: 10000,
	hardness: 0.99,
	conduct: 1,
	state: "solid",
	maxSize: 1,
}

elements.diamond_drill_missile_UP = {
	color: diamond_drill_missile_Colour,
	properties: {
		die: 5,
		primed: false,
	},
	tick: function(pixel) {
		diamond_drill_missile_function(pixel,pixel.x,pixel.y-1);
	},
	category: "Drills",
	density: 10000,
	hardness: 0.99,
	conduct: 1,
	state: "solid",
	maxSize: 1,
}

elements.diamond_drill_missile_DOWN = {
	color: diamond_drill_missile_Colour,
	properties: {
		die: 5,
		primed: false,
	},
	tick: function(pixel) {
		diamond_drill_missile_function(pixel,pixel.x,pixel.y+1);
	},
	category: "Drills",
	density: 10000,
	hardness: 0.99,
	conduct: 1,
	state: "solid",
	maxSize: 1,
}



void_drill_function = function(pixel, dif_x, dif_y) {
	dif_x = dif_x-pixel.x
	dif_y = dif_y-pixel.y
	if (!outOfBounds(pixel.x+dif_x,pixel.y+dif_y)) {
		pxl = pixelMap[pixel.x+dif_x][pixel.y+dif_y]
		if (!isEmpty(pixel.x+dif_x,pixel.y+dif_y)) {
			if (elements[pxl.element].hardness <= 1) {
				delete pixelMap[pixel.x+dif_x][pixel.y+dif_y];
			}
			else if (elements[pxl.element].hardness == undefined) {
				delete pixelMap[pixel.x+dif_x][pixel.y+dif_y];
			};
		};
		tryMove(pixel,pixel.x+dif_x,pixel.y+dif_y);
	};
	doDefaults(pixel);
}

elements.void_drill_LEFT = {
	color: void_drill_Colour,
	tick: function(pixel) {
		void_drill_function(pixel,pixel.x-1,pixel.y);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "void", "iron", "tin"],
	tempHigh: 10000,
	stateHigh: ["molten_aluminum", "void", "molten_iron", "molten_tin"],
	density: 10000,
	hardness: 1,
	conduct: 1,
	state: "solid",
}

elements.void_drill_RIGHT = {
	color: void_drill_Colour,
	tick: function(pixel) {
		void_drill_function(pixel,pixel.x+1,pixel.y);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "void", "iron", "tin"],
	tempHigh: 10000,
	stateHigh: ["molten_aluminum", "void", "molten_iron", "molten_tin"],
	density: 10000,
	hardness: 1,
	conduct: 1,
	state: "solid",
}

elements.void_drill_UP = {
	color: void_drill_Colour,
	tick: function(pixel) {
		void_drill_function(pixel,pixel.x,pixel.y-1);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "void", "iron", "tin"],
	tempHigh: 10000,
	stateHigh: ["molten_aluminum", "void", "molten_iron", "molten_tin"],
	density: 10000,
	hardness: 1,
	conduct: 1,
	state: "solid",
}

elements.void_drill_DOWN = {
	color: void_drill_Colour,
	tick: function(pixel) {
		void_drill_function(pixel,pixel.x,pixel.y+1);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "void", "iron", "tin"],
	tempHigh: 10000,
	stateHigh: ["molten_aluminum", "void", "molten_iron", "molten_tin"],
	density: 10000,
	hardness: 1,
	conduct: 1,
	state: "solid",
}



void_drill_missile_function = function(pixel, dif_x, dif_y) {
	dif_x = dif_x-pixel.x
	dif_y = dif_y-pixel.y
	if (pixel.die <= 0) {
		deletePixel(pixel.x, pixel.y)
		explodeAt(pixel.x, pixel.y, 15);
		return true
	};
	if (!outOfBounds(pixel.x+dif_x,pixel.y+dif_y)) {
		pxl = pixelMap[pixel.x+dif_x][pixel.y+dif_y]
		if (!isEmpty(pixel.x+dif_x,pixel.y+dif_y)) {
			pixel.primed = true
			if (elements[pxl.element].hardness <= 1) {
				delete pixelMap[pixel.x+dif_x][pixel.y+dif_y];
			}
			else if (elements[pxl.element].hardness == undefined) {
				delete pixelMap[pixel.x+dif_x][pixel.y+dif_y];
			};
		}
		else if (pixel.primed) {
			pixel.die--
			return true
		};
		tryMove(pixel,pixel.x+dif_x,pixel.y+dif_y);
	}
	else if (outOfBounds(pixel.x+dif_x, pixel.y+dif_y)) {
		deletePixel(pixel.x, pixel.y)
		explodeAt(pixel.x, pixel.y, 15);
	};
	doDefaults(pixel);
}

elements.void_drill_missile_LEFT = {
	color: void_drill_missile_Colour,
	properties: {
		die: 5,
		primed: false,
	},
	tick: function(pixel) {
		void_drill_missile_function(pixel,pixel.x-1,pixel.y);
	},
	category: "Drills",
	density: 10000,
	hardness: 1,
	conduct: 1,
	state: "solid",
	maxSize: 1,
}

elements.void_drill_missile_RIGHT = {
	color: void_drill_missile_Colour,
	properties: {
		die: 5,
		primed: false,
	},
	tick: function(pixel) {
		void_drill_missile_function(pixel,pixel.x+1,pixel.y);
	},
	category: "Drills",
	density: 10000,
	hardness: 1,
	conduct: 1,
	state: "solid",
	maxSize: 1,
}

elements.void_drill_missile_UP = {
	color: void_drill_missile_Colour,
	properties: {
		die: 5,
		primed: false,
	},
	tick: function(pixel) {
		void_drill_missile_function(pixel,pixel.x,pixel.y-1);
	},
	category: "Drills",
	density: 10000,
	hardness: 1,
	conduct: 1,
	state: "solid",
	maxSize: 1,
}

elements.void_drill_missile_DOWN = {
	color: void_drill_missile_Colour,
	properties: {
		die: 5,
		primed: false,
	},
	tick: function(pixel) {
		void_drill_missile_function(pixel,pixel.x,pixel.y+1);
	},
	category: "Drills",
	density: 10000,
	hardness: 1,
	conduct: 1,
	state: "solid",
	maxSize: 1,
}
