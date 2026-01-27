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
~ made steel/diamond/void drill missile L, R, U & D explode upon contact with canvas edge
~ committed

	Version: 1.0.1 (No Hardness Fix)
@NecroticPhantom
~ fixed steel/diamond/void drill L, R, U & D + steel/diamond/void drill missile L, R, U & D not breaking pixels with no listed hardness

	Version: 2.0.0 (Drills Revamped (AKA Reverse Drills))
@NecroticPhantom
+ maxSize: 1 to all drills without it
~ rewrote drills and functions so no longer need L, R, U and D versions of all drills
- L, R, U and D versions of all drills
~ rewrote drills and functions so no longer need 1 function per drill material
- drill material-specific functions
- drill color variables
~ changed breakInto and stateHigh for most drills
~ changed density, tempHigh and conductivity of all drills
~ renamed 'drills.js_info' element to 'drills.js'
+ steel reverse drill
+ diamond reverse drill
+ void reverse drill

	Version 2.0.1 (Drills Not Functioning Hotfix)
@NecroticPhantom
~ Fixed all drills not drilling
~ Slight change to drill missile function (no functional difference)
~ Fixed reverse drills not creating pixels while drilling sometimes and when moving vertically

	Version 2.1.0 (Phasing Drills)
@NecroticPhantom
+ steel phasing drill
+ diamond phasing drill
+ void phasing drill

	Version 2.2.0 (Temperature Drills)
@NecroticPhantom
+ steel thermal drill
+ diamond thermal drill
+ void thermal drill
+ steel cryo drill
+ diamond cryo drill
+ void cryo drill
~ swapped "molten_aluminum" for "molten_metal_scrap" in stateHigh for all drills
+ stateLow to all drills ("steel" for all steel drills, "diamond" for all diamond drills and "void" for all void drills (weren't proper frozen equivalents so represents drill tip after drill frozen so can't turn anymore))
+ tempLow to all drills (0 for most drills and -25000 for cryo drills (I know you can't go past -273, but having -25000 mirrors the 25000 tempHigh of the thermal drills, since thermal drills need to be heat resistant and cryo drills need to be cold resistant, and I like the symmetry))
*/



// info element
// elements.drills_info = {
// 	color: "#000000",
// 	name: "drills.js",
// 	category: "Mods",
// 	behavior: behaviors.SELFDELETE,
// 	maxSize: 1,
// 	tool: function(pixel) {},
// 	onSelect: function(pixel) {
// 		let mod_info = "The drills.js mod adds different kinds of drills to a new 'drills' category.\n\nMod made by: Necrotic_Phantom. \n With help from: voidapex11."
// 		alert(mod_info)
// 	return
// 	},
// };



// functions
drill_function = function(pixel, dif_x, dif_y) {
	if (!outOfBounds(pixel.x + dif_x, pixel.y + dif_y)) {
		if (!isEmpty(pixel.x + dif_x, pixel.y + dif_y)) {
			pxl = pixelMap[pixel.x + dif_x][pixel.y + dif_y];
			if (elements[pxl.element].hardness <= elements[pixel.element].hardness || elements[pxl.element].hardness == undefined) {
				deletePixel(pxl.x, pxl.y);
			};
		};
		tryMove(pixel, pixel.x + dif_x, pixel.y + dif_y);
	};
};

drill_missile_function = function(pixel, dif_x, dif_y) {
	if (pixel.die == 0) {
		deletePixel(pixel.x, pixel.y);
		explodeAt(pixel.x, pixel.y, 15);
		return;
	};
	if (!outOfBounds(pixel.x + dif_x, pixel.y + dif_y)) {
		pxl = pixelMap[pixel.x + dif_x][pixel.y + dif_y];
		if (!isEmpty(pixel.x + dif_x, pixel.y + dif_y)) {
			pixel.primed = true;
			if (elements[pxl.element].hardness <= elements[pixel.element].hardness || elements[pxl.element].hardness == undefined) {
				deletePixel(pxl.x, pxl.y);
			};
		}
		else if (pixel.primed) {
			pixel.die--;
			return;
		};
		tryMove(pixel, pixel.x + dif_x, pixel.y + dif_y);
	}
	else if (outOfBounds(pixel.x + dif_x, pixel.y + dif_y)) {
		deletePixel(pixel.x, pixel.y);
		explodeAt(pixel.x, pixel.y, 15);
	};
};

reverse_drill_function = function(pixel, dif_x, dif_y, drill_element) {
	if (!outOfBounds(pixel.x + dif_x, pixel.y + dif_y)) {
		if (!isEmpty(pixel.x + dif_x, pixel.y + dif_y)) {
			pxl = pixelMap[pixel.x + dif_x][pixel.y + dif_y];
			if (elements[pxl.element].hardness <= elements[pixel.element].hardness || elements[pxl.element].hardness == undefined) {
				deletePixel(pxl.x, pxl.y);
			};
		};
		tryMove(pixel, pixel.x + dif_x, pixel.y + dif_y);
	};
	if (isEmpty(pixel.x - dif_x, pixel.y - dif_y)) {
		createPixel(drill_element, pixel.x - dif_x, pixel.y - dif_y);
	};
};

phasing_drill_function = function(pixel, dif_x, dif_y, current_element, current_color, non_phase_elements) {
	held_element = undefined;
	held_color = undefined;
	if (!outOfBounds(pixel.x + dif_x, pixel.y + dif_y)) {
		if (!isEmpty(pixel.x + dif_x, pixel.y + dif_y)) {
			pxl = pixelMap[pixel.x + dif_x][pixel.y + dif_y];
			if (elements[pxl.element].hardness <= elements[pixel.element].hardness || elements[pxl.element].hardness == undefined) {
				held_element = pxl.element;
				held_color = pxl.color;
				deletePixel(pxl.x, pxl.y);
			};
		};
		tryMove(pixel, pixel.x + dif_x, pixel.y + dif_y);
	};
	phase = true;
	if (isEmpty(pixel.x - dif_x, pixel.y - dif_y)) {
		if (current_element != undefined) {
			for (let i = 0; i < non_phase_elements.length; i++) {
				if (current_element == non_phase_elements[i]) {
					phase = false;
					break
				};
			};
			if (phase == true) {
				createPixel(current_element, pixel.x - dif_x, pixel.y - dif_y);
				phase_pxl = pixelMap[pixel.x - dif_x][pixel.y - dif_y];
				phase_pxl.color = current_color;
			};
		};
	};
	return [held_element, held_color];
};



// behaviours
behaviors.THERMAL_DRILL = [
	"XX|HT:1800|XX",
	"HT:1800|XX|HT:1800",
	"XX|HT:1800|XX",
];

behaviors.CRYO_DRILL = [
	"XX|CO:1800|XX",
	"CO:1800|XX|CO:1800",
	"XX|CO:1800|XX",
];



// elements
elements.steel_drill = {
	color: "#71797e",
	properties: {
		x_direction: 0,
		y_direction: 0,
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		drill_function(pixel, pixel.x_direction, pixel.y_direction);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "steel", "iron", "tin"],
	tempHigh: 1455.5,
	stateHigh: ["molten_metal_scrap", "molten_steel", "molten_iron", "molten_tin"],
	tempLow: 0,
	stateLow: "steel",
	density: 7850,
	hardness: 0.8,
	conduct: 0.42,
	state: "solid",
	maxSize: 1,
};

elements.diamond_drill = {
	color: "#03fcec",
	properties: {
		x_direction: 0,
		y_direction: 0,
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		drill_function(pixel, pixel.x_direction, pixel.y_direction);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "diamond", "iron", "tin"],
	tempHigh: 1455.5,
	stateHigh: ["molten_metal_scrap", "diamond", "molten_iron", "molten_tin"],
	tempLow: 0,
	stateLow: "diamond",
	density: 3515,
	hardness: 0.99,
	conduct: 0.01,
	state: "solid",
	maxSize: 1,
};

elements.void_drill = {
	color: "#262626",
	properties: {
		x_direction: 0,
		y_direction: 0,
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		drill_function(pixel, pixel.x_direction, pixel.y_direction);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "void", "iron", "tin"],
	tempHigh: 1455.5,
	stateHigh: ["molten_metal_scrap", "void", "molten_iron", "molten_tin"],
	tempLow: 0,
	stateLow: "void",
	density: 7850,
	hardness: 1,
	conduct: 0.01,
	state: "solid",
	maxSize: 1,
};

elements.steel_drill_missile = {
	color: ["#71797e", "#ff0000"],
	properties: {
		x_direction: 0,
		y_direction: 0,
		die: -1,
		primed: false,
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		if (pixel.die == -1) {
			pixel.die = Number(prompt("How many ticks (after priming) until explosion (enter as number)? "));
		};
		drill_missile_function(pixel, pixel.x_direction, pixel.y_direction);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "steel", "iron", "tin"],
	tempHigh: 1455.5,
	stateHigh: ["molten_metal_scrap", "molten_steel", "molten_iron", "molten_tin"],
	tempLow: 0,
	stateLow: "steel",
	density: 7850,
	hardness: 0.8,
	conduct: 0.42,
	state: "solid",
	maxSize: 1,
};

elements.diamond_drill_missile = {
	color: ["#03fcec", "#ff0000"],
	properties: {
		x_direction: 0,
		y_direction: 0,
		die: -1,
		primed: false,
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		if (pixel.die == -1) {
			pixel.die = Number(prompt("How many ticks (after priming) until explosion (enter as number)? "));
		};
		drill_missile_function(pixel, pixel.x_direction, pixel.y_direction);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "diamond", "iron", "tin"],
	tempHigh: 1455.5,
	stateHigh: ["molten_metal_scrap", "diamond", "molten_iron", "molten_tin"],
	tempLow: 0,
	stateLow: "diamond",
	density: 3515,
	hardness: 0.99,
	conduct: 0.01,
	state: "solid",
	maxSize: 1,
};

elements.void_drill_missile = {
	color: ["#262626", "#ff0000"],
	properties: {
		x_direction: 0,
		y_direction: 0,
		die: -1,
		primed: false,
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		if (pixel.die == -1) {
			pixel.die = Number(prompt("How many ticks (after priming) until explosion (enter as number)? "));
		};
		drill_missile_function(pixel, pixel.x_direction, pixel.y_direction);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "void", "iron", "tin"],
	tempHigh: 1455.5,
	stateHigh: ["molten_metal_scrap", "void", "molten_iron", "molten_tin"],
	tempLow: 0,
	stateLow: "void",
	density: 7850,
	hardness: 1,
	conduct: 0.01,
	state: "solid",
	maxSize: 1,
};

elements.steel_reverse_drill = {
	color: "#e79717", //reverse drill colours are the hexidecimal for the origional drills but reversed
	properties: {
		x_direction: 0,
		y_direction: 0,
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		reverse_drill_function(pixel, pixel.x_direction, pixel.y_direction, "steel");
	},
	category: "Drills",
	breakInto: ["metal_scrap", "steel", "iron", "tin"],
	tempHigh: 1455.5,
	stateHigh: ["molten_metal_scrap", "molten_steel", "molten_iron", "molten_tin"],
	tempLow: 0,
	stateLow: "steel",
	density: 7850,
	hardness: 0.8,
	conduct: 0.42,
	state: "solid",
	maxSize: 1,
};

elements.diamond_reverse_drill = {
	color: "#cecf30", //reverse drill colours are the hexidecimal for the origional drills but reversed
	properties: {
		x_direction: 0,
		y_direction: 0,
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		reverse_drill_function(pixel, pixel.x_direction, pixel.y_direction, "diamond");
	},
	category: "Drills",
	breakInto: ["metal_scrap", "diamond", "iron", "tin"],
	tempHigh: 1455.5,
	stateHigh: ["molten_metal_scrap", "diamond", "molten_iron", "molten_tin"],
	tempLow: 0,
	stateLow: "diamond",
	density: 3515,
	hardness: 0.99,
	conduct: 0.01,
	state: "solid",
	maxSize: 1,
};

elements.void_reverse_drill = {
	color: "#626262", //reverse drill colours are the hexidecimal for the origional drills but reversed
	properties: {
		x_direction: 0,
		y_direction: 0,
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		reverse_drill_function(pixel, pixel.x_direction, pixel.y_direction, "void");
	},
	category: "Drills",
	breakInto: ["metal_scrap", "void", "iron", "tin"],
	tempHigh: 1455.5,
	stateHigh: ["molten_metal_scrap", "void", "molten_iron", "molten_tin"],
	tempLow: 0,
	stateLow: "void",
	density: 7850,
	hardness: 1,
	conduct: 0.01,
	state: "solid",
	maxSize: 1,
};

elements.steel_phasing_drill = {
	color: ["#71797e", "#cdeedc"],
	properties: {
		x_direction: 0,
		y_direction: 0,
		stored_element: undefined,
		stored_color: undefined,
		non_phase_elements: [0],
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		if (pixel.non_phase_elements[0] == 0) {
			for (let i = 0; i > -1; i++) {
				pixel.non_phase_elements[i] = prompt("Enter element name to not phase through (Type: -1 when done): ");
				if (pixel.non_phase_elements[i] == "-1") {
					if (pixel.non_phase_elements[i] == "-1") {
						pixel.non_phase_elements == undefined;
					};
					break
				};
			};
		};
		stored_properties = phasing_drill_function(pixel, pixel.x_direction, pixel.y_direction, pixel.stored_element, pixel.stored_color, pixel.non_phase_elements);
		pixel.stored_element = stored_properties[0];
		pixel.stored_color = stored_properties[1];
	},
	category: "Drills",
	breakInto: ["metal_scrap", "steel", "iron", "tin"],
	tempHigh: 1455.5,
	stateHigh: ["molten_metal_scrap", "molten_steel", "molten_iron", "molten_tin"],
	tempLow: 0,
	stateLow: "steel",
	density: 7850,
	hardness: 0.8,
	conduct: 0.42,
	state: "solid",
	maxSize: 1,
};

elements.diamond_phasing_drill = {
	color: ["#03fcec", "#cdeedc"],
	properties: {
		x_direction: 0,
		y_direction: 0,
		stored_element: undefined,
		stored_color: undefined,
		non_phase_elements: [0],
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		if (pixel.non_phase_elements[0] == 0) {
			for (let i = 0; i > -1; i++) {
				pixel.non_phase_elements[i] = prompt("Enter element name to not phase through (Type: -1 when done): ");
				if (pixel.non_phase_elements[i] == "-1") {
					if (pixel.non_phase_elements[i] == "-1") {
						pixel.non_phase_elements == undefined;
					};
					break
				};
			};
		};
		stored_properties = phasing_drill_function(pixel, pixel.x_direction, pixel.y_direction, pixel.stored_element, pixel.stored_color, pixel.non_phase_elements);
		pixel.stored_element = stored_properties[0];
		pixel.stored_color = stored_properties[1];
	},
	category: "Drills",
	breakInto: ["metal_scrap", "diamond", "iron", "tin"],
	tempHigh: 1455.5,
	stateHigh: ["molten_metal_scrap", "diamond", "molten_iron", "molten_tin"],
	tempLow: 0,
	stateLow: "diamond",
	density: 3515,
	hardness: 0.99,
	conduct: 0.01,
	state: "solid",
	maxSize: 1,
};

elements.void_phasing_drill = {
	color: ["#262626", "#cdeedc"],
	properties: {
		x_direction: 0,
		y_direction: 0,
		stored_element: undefined,
		stored_color: undefined,
		non_phase_elements: [0],
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		if (pixel.non_phase_elements[0] == 0) {
			for (let i = 0; i > -1; i++) {
				pixel.non_phase_elements[i] = prompt("Enter element name to not phase through (Type: -1 when done): ");
				if (pixel.non_phase_elements[i] == "-1") {
					if (pixel.non_phase_elements[i] == "-1") {
						pixel.non_phase_elements == undefined;
					};
					break
				};
			};
		};
		stored_properties = phasing_drill_function(pixel, pixel.x_direction, pixel.y_direction, pixel.stored_element, pixel.stored_color, pixel.non_phase_elements);
		pixel.stored_element = stored_properties[0];
		pixel.stored_color = stored_properties[1];
	},
	category: "Drills",
	breakInto: ["metal_scrap", "void", "iron", "tin"],
	tempHigh: 1455.5,
	stateHigh: ["molten_metal_scrap", "void", "molten_iron", "molten_tin"],
	tempLow: 0,
	stateLow: "void",
	density: 7850,
	hardness: 1,
	conduct: 0.01,
	state: "solid",
	maxSize: 1,
};

elements.steel_thermal_drill = {
	color: ["#71797e", "#ff7800"],
	behavior: behaviors.THERMAL_DRILL,
	properties: {
		x_direction: 0,
		y_direction: 0,
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		drill_function(pixel, pixel.x_direction, pixel.y_direction);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "steel", "iron", "tin"],
	tempHigh: 25000,
	stateHigh: ["molten_metal_scrap", "molten_steel", "molten_iron", "molten_tin"],
	tempLow: 0,
	stateLow: "steel",
	density: 7850,
	hardness: 0.8,
	conduct: 0.42,
	state: "solid",
	maxSize: 1,
};

elements.diamond_thermal_drill = {
	color: ["#03fcec", "#ff7800"],
	behavior: behaviors.THERMAL_DRILL,
	properties: {
		x_direction: 0,
		y_direction: 0,
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		drill_function(pixel, pixel.x_direction, pixel.y_direction);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "diamond", "iron", "tin"],
	tempHigh: 25000,
	stateHigh: ["molten_metal_scrap", "diamond", "molten_iron", "molten_tin"],
	tempLow: 0,
	stateLow: "diamond",
	density: 3515,
	hardness: 0.99,
	conduct: 0.01,
	state: "solid",
	maxSize: 1,
};

elements.void_thermal_drill = {
	color: ["#262626", "#ff7800"],
	behavior: behaviors.THERMAL_DRILL,
	properties: {
		x_direction: 0,
		y_direction: 0,
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		drill_function(pixel, pixel.x_direction, pixel.y_direction);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "void", "iron", "tin"],
	tempHigh: 25000,
	stateHigh: ["molten_metal_scrap", "void", "molten_iron", "molten_tin"],
	tempLow: 0,
	stateLow: "void",
	density: 7850,
	hardness: 1,
	conduct: 0.01,
	state: "solid",
	maxSize: 1,
};

elements.steel_cryo_drill = {
	color: ["#71797e", "#00ffff"],
	behavior: behaviors.CRYO_DRILL,
	properties: {
		x_direction: 0,
		y_direction: 0,
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		drill_function(pixel, pixel.x_direction, pixel.y_direction);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "steel", "iron", "tin"],
	tempHigh: 1455.5,
	stateHigh: ["molten_metal_scrap", "molten_steel", "molten_iron", "molten_tin"],
	tempLow: -25000,
	stateLow: "steel",
	density: 7850,
	hardness: 0.8,
	conduct: 0.42,
	state: "solid",
	maxSize: 1,
};

elements.diamond_cryo_drill = {
	color: ["#03fcec", "#00ffff"],
	behavior: behaviors.CRYO_DRILL,
	properties: {
		x_direction: 0,
		y_direction: 0,
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		drill_function(pixel, pixel.x_direction, pixel.y_direction);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "diamond", "iron", "tin"],
	tempHigh: 1455.5,
	stateHigh: ["molten_metal_scrap", "diamond", "molten_iron", "molten_tin"],
	tempLow: -25000,
	stateLow: "diamond",
	density: 3515,
	hardness: 0.99,
	conduct: 0.01,
	state: "solid",
	maxSize: 1,
};

elements.void_cryo_drill = {
	color: ["#262626", "#00ffff"],
	behavior: behaviors.CRYO_DRILL,
	properties: {
		x_direction: 0,
		y_direction: 0,
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		drill_function(pixel, pixel.x_direction, pixel.y_direction);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "void", "iron", "tin"],
	tempHigh: 1455.5,
	stateHigh: ["molten_metal_scrap", "void", "molten_iron", "molten_tin"],
	tempLow: -25000,
	stateLow: "void",
	density: 7850,
	hardness: 1,
	conduct: 0.01,
	state: "solid",
	maxSize: 1,
};