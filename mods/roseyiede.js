var modName = "mods/roseyiede.js";
var libraryMod = "mods/code_library.js";

if(enabledMods.includes(libraryMod)) {
	/*
	//arbitrarily picked
		binitialArrayL = ["m","n","p","t","ch","k","b","d","j","g","f","th","s","sh","h","l","r","y","w","z"] //:eggTF:
		bvowelArrayL = ["a","e","i","o","u","ay","ee","ie"] //:eggTF:
		bmedialArrayL = ["m","n","p","t","k","b","d","g","f","th","s","sh","h","l","r","y","z","sp","st","bl"] //:eggTF:
		bfinalArrayL = ["m","n","p","t","k","b","d","g","f","th","s","sh","l","r","y","z","st"] //:eggTF:

	function bGenerateName() {
		//these are picked arbitrarily
		
		//console.log("getting random type")
		var randomInt1 = _randomInt(6)

		//console.log("generating type " + randomInt1)
		if(randomInt1 == 0) {
			var randomName = _randomArrayChoice(binitialArrayL) + _randomArrayChoice(bvowelArrayL) + _randomArrayChoice(bfinalArrayL)
			//console.log("generated T" + randomInt1 + " name")
		} else if(randomInt1 == 1) {
			var randomName = _randomArrayChoice(binitialArrayL) + _randomArrayChoice(bvowelArrayL) + _randomArrayChoice(bmedialArrayL) + _randomArrayChoice(bvowelArrayL) + _randomArrayChoice(bfinalArrayL)
			//console.log("generated T" + randomInt1 + " name")
		} else if(randomInt1 == 2) {
			var randomName = _randomArrayChoice(binitialArrayL) + _randomArrayChoice(bvowelArrayL) + _randomArrayChoice(bfinalArrayL) + "e"
			//console.log("generated T" + randomInt1 + " name")
		} else if(randomInt1 == 3) {
			var randomName = _randomArrayChoice(binitialArrayL) + _randomArrayChoice(bvowelArrayL) + _randomArrayChoice(bmedialArrayL) + _randomArrayChoice(bvowelArrayL) + _randomArrayChoice(bmedialArrayL) +     _randomArrayChoice(bfinalArrayL)
			//console.log("generated T" + randomInt1 + " name")
		} else if(randomInt1 == 4) {
			var randomName = _randomArrayChoice(bvowelArrayL) + _randomArrayChoice(binitialArrayL) + _randomArrayChoice(bvowelArrayL) + _randomArrayChoice(bfinalArrayL)
			//console.log("generated T" + randomInt1 + " name")
		} else if(randomInt1 == 5) {
			var randomName = _randomArrayChoice(binitialArrayL) + _randomArrayChoice(bvowelArrayL) + _randomArrayChoice(bmedialArrayL) + _randomArrayChoice(bvowelArrayL) + _randomArrayChoice(bmedialArrayL) + _randomArrayChoice(bvowelArrayL)
			//console.log("generated T" + randomInt1 + " name")
		} else if(randomInt1 == 6) {
			var randomName = _randomArrayChoice(binitialArrayL) + _randomArrayChoice(bvowelArrayL) + _randomArrayChoice(bmedialArrayL) + _randomArrayChoice(bvowelArrayL)
			//console.log("generated T" + randomInt1 + " name")
		} else {
			var randomName = randomArrayChoice(bvowelArrayL) + randomArrayChoice(bmedialArrayL) + randomArrayChoice(bvowelArrayL) + randomArrayChoice(bfinalArrayL)
			//console.log("warning: type was above 6 somehow")
		}
		//console.log(randomName)
		return randomName
	}
	*/

	//Base Roseyiede

	elements.roseyiede = {
		color: "#686118",
		behavior: behaviors.LIQUID,
		tempHigh: 103,
		stateHigh: "gaseous_roseyiede",
		tempLow: -8,
		stateLow: "solid_roseyiede",
		category: "liquids",
		state: "liquid",
		density: 1000,
	},

	elements.gaseous_roseyiede = {
		color: "#a49e4c",
		behavior: behaviors.GAS,
		tempLow: -8,
		stateLow: "powdered_roseyiede",
		tick: function(pixel) {
		  if(pixelTicks % 5 == 0) {
			if(pixel.temp < 3) {
				if(Math.random() < 0.00135) {
					changePixel(pixel,"roseyiede",false);
					return;
				};
			};
			if(pixel.temp < 23) {
				if(Math.random() < 0.001) {
					changePixel(pixel,"roseyiede",false);
					return;
				};
			};
			if(pixel.temp < 43) {
				if(Math.random() < 0.0007) {
					changePixel(pixel,"roseyiede",false);
					return;
				};
			};
			if(pixel.temp < 63) {
				if(Math.random() < 0.00045) {
					changePixel(pixel,"roseyiede",false);
					return;
				};
			};
			if(pixel.temp < 83) {
				if(Math.random() < 0.00025) {
					changePixel(pixel,"roseyiede",false);
					return;
				};
			};
			if(pixel.temp < 103) {
				if(Math.random() < 0.0001) {
					changePixel(pixel,"roseyiede",false);
				};
			};
		  };
		},
		category: "gases",
		state: "gas",
		density: 0.63,
		temp: 120,
	},

	elements.solid_roseyiede = {
		color: "#685e10",
		behavior: behaviors.WALL,
		tempHigh: 103,
		stateHigh: "gaseous_roseyiede",
		category: "solids",
		state: "solid",
		density: 1121,
		hardness: 0.121,
		breakInto: "powdered_roseyiede",
		temp: -20,
	},

	elements.powdered_roseyiede = {
		color: "#6c641c",
		behavior: behaviors.POWDER,
		tempHigh: -8,
		stateHigh: "roseyiede",
		category: "powders",
		state: "solid",
		density: 182,
		temp: -20,
	}

	//Volatile Roseyiede

	elements.explosive_roseyiede = {
		color: "#986118",
		behavior: behaviors.LIQUID,
		tempHigh: 98,
		stateHigh: "gaseous_explosive_roseyiede",
		tempLow: -6,
		stateLow: "solid_explosive_roseyiede",
		burn: 11,
		burnInto: ["explosive_roseyiede","explosive_roseyiede","explosive_roseyiede","explosive_roseyiede","explosive_roseyiede","explosive_roseyiede","explosive_roseyiede","explosive_roseyiede","explosive_roseyiede","explosive_roseyiede","fire","fire","fire","fire","fire","fire","fire","fire","fire","explosion"],
		burnTime: 312,
		tick: function(pixel) {
		  if(pixelTicks % 5 == 0) {
			if(pixel.temp < 3) {
				if(Math.random() < 0.0011) {
					changePixel(pixel,"explosive_roseyiede_vapor",false);
					return;
				};
			};
			if(pixel.temp < 23) {
				if(Math.random() < 0.0008) {
					changePixel(pixel,"explosive_roseyiede_vapor",false);
					return;
				};
			};
			if(pixel.temp < 43) {
				if(Math.random() < 0.00055) {
					changePixel(pixel,"explosive_roseyiede_vapor",false);
					return;
				};
			};
			if(pixel.temp < 63) {
				if(Math.random() < 0.00035) {
					changePixel(pixel,"explosive_roseyiede_vapor",false);
					return;
				};
			};
			if(pixel.temp < 83) {
				if(Math.random() < 0.0002) {
					changePixel(pixel,"explosive_roseyiede_vapor",false);
					return;
				};
			};
			if(pixel.temp < 98) {
				if(Math.random() < 0.0001) {
					changePixel(pixel,"explosive_roseyiede_vapor",false);
				};
			};
		  };
		},
		category: "liquids",
		state: "liquid",
		density: 1000,
	},

	elements.gaseous_explosive_roseyiede = {
		color: "#c89e4c",
		behavior: behaviors.GAS,
		tempLow: -6,
		stateLow: "powdered_explosive_roseyiede",
		burn: 88,
		burnInto: ["gaseous_explosive_roseyiede","gaseous_explosive_roseyiede","gaseous_explosive_roseyiede","gaseous_explosive_roseyiede","gaseous_explosive_roseyiede","explosion","fire","fire","fire","fire","fire","fire","fire","fire","gaseous_explosive_roseyiede","explosion","fire","fire","fire","explosion"],
		burnTime: 48,
		tick: function(pixel) {
		  if(pixelTicks % 5 == 0) {
			if(pixel.temp < 3) {
				if(Math.random() < 0.00135) {
					changePixel(pixel,"explosive_roseyiede",false);
					return;
				};
			};
			if(pixel.temp < 23) {
				if(Math.random() < 0.001) {
					changePixel(pixel,"explosive_roseyiede",false);
					return;
				};
			};
			if(pixel.temp < 43) {
				if(Math.random() < 0.0007) {
					changePixel(pixel,"explosive_roseyiede",false);
					return;
				};
			};
			if(pixel.temp < 63) {
				if(Math.random() < 0.00045) {
					changePixel(pixel,"explosive_roseyiede",false);
					return;
				};
			};
			if(pixel.temp < 83) {
				if(Math.random() < 0.00025) {
					changePixel(pixel,"explosive_roseyiede",false);
					return;
				};
			};
			if(pixel.temp < 98) {
				if(Math.random() < 0.0001) {
					changePixel(pixel,"explosive_roseyiede",false);
				};
			};
		  };
		},
		category: "gases",
		state: "gas",
		density: 0.63,
		temp: 120,
	},

	elements.explosive_roseyiede_vapor = {
		color: "#c89449",
		behavior: behaviors.GAS,
		tempHigh: 98,
		stateHigh: "gaseous_explosive_roseyiede",
		tempLow: -6,
		stateLow: "powdered_explosive_roseyiede",
		burn: 88,
		burnInto: ["explosive_roseyiede_vapor","explosive_roseyiede_vapor","explosive_roseyiede_vapor","explosive_roseyiede_vapor","explosive_roseyiede_vapor","explosion","fire","fire","fire","fire","fire","fire","fire","fire","explosive_roseyiede_vapor","fire","fire","fire","fire","explosion"],
		burnTime: 48,
		tick: function(pixel) {
		  if(pixelTicks % 5 == 0) {
			if(pixel.temp < 3) {
				if(Math.random() < 0.0011) {
					changePixel(pixel,"explosive_roseyiede",false);
					return;
				};
			};
			if(pixel.temp < 23) {
				if(Math.random() < 0.0008) {
					changePixel(pixel,"explosive_roseyiede",false);
					return;
				};
			};
			if(pixel.temp < 43) {
				if(Math.random() < 0.00055) {
					changePixel(pixel,"explosive_roseyiede",false);
					return;
				};
			};
			if(pixel.temp < 63) {
				if(Math.random() < 0.00035) {
					changePixel(pixel,"explosive_roseyiede",false);
					return;
				};
			};
			if(pixel.temp < 83) {
				if(Math.random() < 0.0002) {
					changePixel(pixel,"explosive_roseyiede",false);
					return;
				};
			};
			if(pixel.temp < 98) {
				if(Math.random() < 0.0001) {
					changePixel(pixel,"explosive_roseyiede",false);
				};
			};
		  };
		},
		category: "gases",
		state: "gas",
		density: 0.63,
		temp: 40,
	},

	elements.solid_explosive_roseyiede = {
		color: "#985e10",
		behavior: behaviors.WALL,
		tempHigh: 98,
		stateHigh: "gaseous_explosive_roseyiede",
		burn: 4,
		burnInto: ["solid_explosive_roseyiede","solid_explosive_roseyiede","solid_explosive_roseyiede","solid_explosive_roseyiede","solid_explosive_roseyiede","solid_explosive_roseyiede","solid_explosive_roseyiede","solid_explosive_roseyiede","solid_explosive_roseyiede","solid_explosive_roseyiede","fire","fire","fire","fire","fire","fire","fire","fire","fire","explosion"],
		burnTime: 662,
		category: "solids",
		state: "solid",
		density: 1121,
		hardness: 0.121,
		breakInto: "powdered_explosive_roseyiede",
		temp: -20,
	},

	elements.powdered_explosive_roseyiede = {
		color: "#98641c",
		behavior: behaviors.POWDER,
		tempHigh: -6,
		stateHigh: "explosive_roseyiede",
		burn: 42,
		burnInto: ["powdered_explosive_roseyiede","powdered_explosive_roseyiede","powdered_explosive_roseyiede","powdered_explosive_roseyiede","powdered_explosive_roseyiede","powdered_explosive_roseyiede","powdered_explosive_roseyiede","powdered_explosive_roseyiede","fire","fire","explosion","fire","fire","fire","fire","fire","fire","fire","fire","explosion"],
		burnTime: 101,
		category: "powders",
		state: "solid",
		density: 182,
		temp: -20,
	},

	elements.boiling_roseyiede = {
		name: "forever- boiling roseyiede",
		color: "#9e942e",
		behavior: [
			"XX|M2%5 AND CR:gaseous_roseyiede%0|XX", //display CR
			"M2|HT:0|M2", //display HT
			"M1|M1|M1",
		],
		reactions: {
			"roseyiede": { elem2: "boiling_roseyiede", chance: 0.006 }
		},
		tick: function(pixel) {
			if(pixelTicks % 3 == 0) {
				if(pixel.temp > -206/3) {
					if(Math.random() < (pixel.temp - 103) / (51500/3) + 0.01) {
						tryCreatePixel("gaseous_roseyiede",pixel.x,pixel.y-1)
					};
				}
				if(pixel.temp < 103) {
					pixel.temp += (((pixel.temp - 103) / 100) ** 2) / 2 + 1;
				}
			};
		},
		category: "liquids",
		state: "liquid",
		density: 956,
		temp: 120,
	}
} else {
	alert(`The ${libraryMod} mod is required and has been automatically inserted (reload for this to take effect).`)
	enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod)
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
};
