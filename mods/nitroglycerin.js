
// created by Rain :o 20/8 2024

elements.glycerol = {
	color: "#eeeeee",
	behavior: behaviors.LIQUID,
	viscosity: 1412,
	category: "liquids",
	state: "liquid",
	density: 1261,
	tempLow: 18,
	tempHigh: 290,
	tick: function (pixel) {
		pixel.color = "rgba(250, 250, 250, 0.7)";
	},
	reactions: {
	},
	burn: 5,
	burnTime: 40,
};

elements.nitro.tempHigh = 218; //More accurate detonation temperature
elements.salt_water.tempLow = -20; //melting point depression

elements.nitro.tick = function (pixel) { // Exothermic decomposition of nitroglycerin when above 60°
	if (pixel.temp > 60) {
		pixel.temp += 1;
		if (Math.random() > 0.999) {
			var possibleElements = ["oxygen", "nitrogen", "nitrogen", "steam", "steam", "steam", "carbon_dioxide", "carbon_dioxide", "carbon_dioxide"]; //array of possibilities for changing the nitroglycerin pixel

			var randomElement = possibleElements[Math.floor(Math.random() * possibleElements.length)]; //randomly selecting an element from the array

			changePixel(pixel, randomElement); // Change the pixel to the randomly selected element
		}
	}
}

if (enabledMods.includes("mods/chem.js")) {
	runAfterLoad(function () {
		elements.glycerol.reactions.nitric_acid = { elem1: "nitro", chance: 0.05, temp1: 70 }; //nitric acid nitrates glycerol to make nitroglycerin
		elements.nitric_acid.ignore.push("glycerol", "nitro") //added my glycerol and nitro to allow for making nitroglycerin

		elements.copper.reactions.sulfuric_acid = { elem1: "copper_sulfate", elem2: null, chance: 0.1 }; //this is how you can actually make CuSO4
		elements.sulfuric_acid.ignore.push("copper_sulfate")

		elements.grease.reactions.sodium_hydroxide = { elem1: "soap", elem2: "null", chance: 0.04, tempMin: 40 };
		elements.sodium_hydroxide.ignore.push("grease", "soap", "fat");


	});
} else {
	elements.glycerol.reactions.acid = { elem1: "nitro", chance: 0.05, temp1: 70 }; //if we don't have nitric acid from chem.js, "acid" is a good approximation
	elements.acid.ignore.push("glycerol", "nitro")
}