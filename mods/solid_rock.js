var modName = "mods/random_rocks.js";
// var onTryMoveIntoMod = "mods/onTryMoveInto.js";
// var libraryMod = "mods/code_library.js";

dependOn("code_library.js", function(){

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
	onMoveInto: function(pixel,otherPixel) {
		if(elements[otherPixel.element].category === "corruption") {
			if(Math.random() < 0.05) {
				changePixel(pixel,"corrupt_solid_rock");
				return;
			};
		} else {
			reactionStealer(pixel,otherPixel,"rock");
		};
	},
	tempHigh: 950,
	stateHigh: "magma",
	category: "land",
	state: "solid",
	density: 2600,
	hardness: 0.55,
	breakInto: "rock",
}

if(enabledMods.includes("mods/fey_and_more.js")) {
	elements.corrupt_solid_rock = {
		color: ["#514c78","#514c78","#2a264d","#2a264d","#514c78","#514c78"],
		behavior: behaviors.WALL,
		tempHigh: 1200,
		category: "corruption",
		state: "solid",
		density: 1250,
		breakInto: "corrupt_rock",
		tick: function(pixel) {
			var randomNeighborOffset = adjacentCoords[Math.floor(Math.random() * adjacentCoords.length)];
			var rfX = pixel.x+randomNeighborOffset[0];
			var rfY = pixel.y+randomNeighborOffset[1];
			if(!isEmpty(rfX,rfY,true)) {
				var otherPixel = pixelMap[rfX][rfY];
				if(otherPixel.element === "solid_rock") {
					if(Math.random() < 0.05) {
						changePixel(otherPixel,"corrupt_solid_rock")
					};
				};
			};
		},
	};
	
	runAfterLoad(function() {
		elements.corrupt_solid_rock.reactions = elements.corrupt_land.reactions;
	});
}

},true);