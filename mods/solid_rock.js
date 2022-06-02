elements.solid_rock = {
	color: ["#808080","#4f4f4f","#949494"],
	behavior: behaviors.WALL,
	reactions: {
		"water": {elem1: "wet_sand", chance: 0.00035},
		"salt_water": {elem1: "wet_sand", chance: 0.0005},
		"sugar_water": {elem1: "wet_sand", chance: 0.0004},
		"seltzer": {elem1: "wet_sand", chance: 0.0004},
		"dirty_water": {elem1: "wet_sand", chance: 0.0004},
		"soda": {elem1: "wet_sand", chance: 0.0004},
		"lichen": {elem1: "dirt", chance: 0.0025},
		"grape": {elem2: "juice", chance: 0.1, color2: "#291824"},
		"root": {elem1: "sand", chance: 0.0004},
		"wheat": {elem2: "flour"},
		"primordial_soup": {elem1: "wet_sand", chance: 0.001}
	},
	tempHigh: 950,
	stateHigh: "magma",
	category: "land",
	state: "solid",
	density: 2600,
	hardness: 0.55,
	breakInto: "rock",
}