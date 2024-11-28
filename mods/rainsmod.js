
// Created by Rain :o 19/11 2024

elements.car = {
	color: ["#ee70aa", "#ab33ef", "#5e6eee"],
	category: "special",
	density: 10000,
	state: "solid",
	tempHigh: 400,
	stateHigh: ["steel", "molten_plastic", "glass"],
	breakInto: ["steel", "plastic", "glass_shard"],
	reactions: {
		"water": { elem1: "rust", chance: 0.003 },
		"dirty_water": { elem1: "rust", chance: 0.003 },
		"salt_water": { elem1: "rust", chance: 0.006 },
		"grape": { elem2: "juice", chance: 0.1, color2: "#291824" },
		"tomato": { elem2: "sauce", chance: 0.1 },
		"egg": { elem2: "yolk", chance: 0.1 },
		"malware": {elem1: "explosion"},
	},
	flippableX: true,
	tick: function (pixel) {

		if (pixel.carFlip === undefined) {
			pixel.carFlip = 1; //it's the "pixel." that gives the variable to each car instance, very important :)
		}
		tryMove(pixel, pixel.x, pixel.y + 1); //try to move down (fall)
		if (!isEmpty(pixel.x, pixel.y + 1)) { //if it didn't work (if the car is on the ground):

			if (isEmpty(pixel.x + pixel.carFlip, pixel.y + 1)) {
				tryMove(pixel, pixel.x + pixel.carFlip, pixel.y + 1); // move diagonally down to avoid falling when going downhill
            }
			else if (isEmpty(pixel.x + pixel.carFlip, pixel.y)) {
				tryMove(pixel, pixel.x + pixel.carFlip, pixel.y); //move to the side (which side is derived from current carFlip state)

			} else if (isEmpty(pixel.x + pixel.carFlip, pixel.y - 1)) {
				tryMove(pixel, pixel.x + pixel.carFlip, pixel.y - 1);  //move diagonally up the hill

			} else { //if no movement possible (like when hitting a wall):
				pixel.carFlip = pixel.carFlip * -1; // Update carFlip for this car instance
			}

		doDefaults(pixel);
		}
	},
};

elements.tram = { 
	color: "#93E493",
	conduct: 1,
	category: "special",
	density: 10000,
	state: "solid",
	tempHigh: 400,
	stateHigh: ["aluminum", "molten_plastic", "glass"],
	breakInto: ["aluminum", "plastic", "glass_shard"],
	desc: "Powered by electricity. Can hang on conductive materials for suspension railway and can transport people",
	reactions: {
		"malware": { elem2: "electric" },
	},
	tick: function (pixel) {

		if (pixel.tramFlip === undefined) {
			pixel.tramFlip = 1; //tramFlip works like carFlip for the car
		}
		if (pixel.hasPixel === undefined) {
			pixel.hasPixel = 0;
        }

		doDefaults(pixel)

		if (pixel.charge > 0) { //only if powered by electricity
			if (isEmpty(pixel.x + 1 * pixel.tramFlip, pixel.y - 1) && !isEmpty(pixel.x + 1 * pixel.tramFlip, pixel.y - 2)) {
				var diUpPixel = pixelMap[pixel.x + 1 * pixel.tramFlip][pixel.y - 2] //establishes the variable. Must be down here because it would crash if there is no diUpPixel
				if (elements[diUpPixel.element].conduct && diUpPixel.element !== "tram") { //^ is also the reason this is a seperate if statement
					tryMove(pixel, pixel.x + 1 * pixel.tramFlip, pixel.y - 1); //move diagonally upwards if there is support
				}
				else {
					flip()
				}
			}
			else if (isEmpty(pixel.x + 1 * pixel.tramFlip, pixel.y) && !isEmpty(pixel.x + 1 * pixel.tramFlip, pixel.y - 1)) {
				var sidePixel = pixelMap[pixel.x + 1 * pixel.tramFlip][pixel.y - 1]
				if (elements[sidePixel.element].conduct && sidePixel.element !== "tram") {
					tryMove(pixel, pixel.x + 1 * pixel.tramFlip, pixel.y); //move to the side if there is support
				}
				else {
					flip()
				}
			}
			else if (isEmpty(pixel.x + 1 * pixel.tramFlip, pixel.y + 1) && !isEmpty(pixel.x + 1 * pixel.tramFlip, pixel.y)) {
				var diDownPixel = pixelMap[pixel.x + 1 * pixel.tramFlip][pixel.y]
				if (elements[diDownPixel.element].conduct && diDownPixel.element !== "tram") {
					tryMove(pixel, pixel.x + 1 * pixel.tramFlip, pixel.y + 1); //move diagonally downwards if there is support
				}
				else {
					flip()
				}
			}

			else if (isEmpty(pixel.x + 1 * pixel.tramFlip, pixel.y + 1) && isEmpty(pixel.x + 1 * pixel.tramFlip, pixel.y)) {
				tryMove(pixel, pixel.x + 1 * pixel.tramFlip, pixel.y + 1); //move diagonally downwards if there isn't support
			}
			else if (isEmpty(pixel.x + 1 * pixel.tramFlip, pixel.y) && isEmpty(pixel.x + 1 * pixel.tramFlip, pixel.y - 1)) {
				tryMove(pixel, pixel.x + 1 * pixel.tramFlip, pixel.y); //move to the side if there isn't support
			}
			else if (isEmpty(pixel.x + 1 * pixel.tramFlip, pixel.y - 1) && isEmpty(pixel.x + 1 * pixel.tramFlip, pixel.y - 2)) {
				tryMove(pixel, pixel.x + 1 * pixel.tramFlip, pixel.y - 1); //move diagonally upwards if there isn't support (uphill)
			}
			else {
				flip()
			}
		}

		else { //if not powered
			if (!isEmpty(pixel.x, pixel.y - 1)) {
				let upPixel = pixelMap[pixel.x][pixel.y - 1]  //looks at the properties of the pixel above
				if (elements[upPixel.element].conduct > 0.1 && upPixel.element !== "tram") { //if the pixel above is conductive but not tram
					return //nothing happens ie it doesn't fall

				}
			}
			tryMove(pixel, pixel.x, pixel.y + 1); //it falls down (same as above)
            
		}

		function flip() {
			pixel.tramFlip = pixel.tramFlip * -1; // changes movement direction

			if (pixel.hasPixel == 1) {

				validSpots = [];

				for (let dx = -1; dx <= 1; dx++) {
					for (let dy = -3; dy <= 1; dy++) {
						// Calculate the coordinates of the neighboring pixel for each pixel around our pixel
						let x = pixel.x + dx;
						let y = pixel.y + dy;


						if (isEmpty(x, y) && isEmpty(x, y + 1)) {
							validSpots.push({ x: x, y: y })
						}
					}
				}

				let randomIndex = Math.floor(Math.random() * validSpots.length); // random number from 0 to to the amount of validSpots
				let chosenSpot = validSpots[randomIndex];
				createPixel("human", chosenSpot.x, chosenSpot.y)
				pixel.hasPixel = 0


			}
			else if (pixel.hasPixel == 0) { // else if prevents it picking up a pixel it has just created
				validSpots = [];

				for (let dx = -1; dx <= 1; dx++) {
					for (let dy = -2; dy <= 2; dy++) {
						// Calculate the coordinates of the neighboring pixel
						let x = pixel.x + dx;
						let y = pixel.y + dy;

						// Access the pixel information from pixelMap
						let neighboringPixel = pixelMap[x][y];

						if (neighboringPixel && neighboringPixel.element == "head") {

							validSpots.push({ x: x, y: y })

						}
					}
				}

				if (validSpots.length > 0) {
					let randomIndex = Math.floor(Math.random() * validSpots.length);
					let chosenSpot = validSpots[randomIndex];

					deletePixel(chosenSpot.x, chosenSpot.y)
					deletePixel(chosenSpot.x, chosenSpot.y + 1)
					pixel.hasPixel = 1

                }

				
			}

		}
    },
};

elements.bouncy_ball = {
	color: "#e35693",
	tempHigh: 250,
	stateHigh: ["borax", "glue"],
	category: "special",
	conduct: 1,
	density: 1501,
	tick: function (pixel) {
		if (pixel.fallDist === undefined) {
			pixel.fallDist = 0;
		}
		if (pixel.isFalling === undefined) {
			pixel.isFalling = true;
        }

		if (pixel.isFalling) { //main loop of a bouncy ball. Functions are defined below
			falling()
		} else {
			rising()
		}
		if (pixel.charge > 0) { //will bounce on electricity (doesn't work on real bouncy balls :/)
			pixel.fallDist = (pixel.fallDist + 1)
			rising()
		}
		doDefaults(pixel);
		function falling() {
			
			if (isEmpty(pixel.x, pixel.y + 1)) {
				tryMove(pixel, pixel.x, pixel.y + 1)
				pixel.fallDist += 1; //counts how many pixels the ball has fallen so far
            } else { //if it touched the ground
				pixel.isFalling = false; //will change the outcome of the main if statement and make ball start rising
				pixel.fallDist = pixel.fallDist * 3 / 4; //dynamically decreases bounce height based on how high it is, instead of constant 1 per bounce
			}
		}
		function rising() {
			if (pixel.fallDist > 0 && isEmpty(pixel.x, pixel.y - 1)) { // because of also checking for an empty pixel above the ball won't get stuck on ceilings
				tryMove(pixel, pixel.x, pixel.y - 1)
				pixel.fallDist -= 1
			} else {
				pixel.isFalling = true;
				pixel.fallDist -= 1 //makes the ball lose 1 pixel height each bounce, useful at the end when * 3/4 only results in fractions
            }
			
        }

    }
};
elements.borax.reactions.glue = { elem1: "bouncy_ball", elem2: null, chance: 0.1 };


elements.microplastic = {
	color: ["#adc7c9", "#cadadb", "#6cbda8", "#62d5d4", "#b3b47b"],
	behavior: [
		"XX|XX|XX",
		"XX|XX|XX",
		"M2%25|M1%50|M2%25",
	],
	category: "powders",
	state: "solid",
	density: 700,
	tempHigh: 250,
	stateHigh: "molten_plastic",
	reactions: {
		"fish": { elem1: null, elem2: "meat", chance: 0.01 },
		"glue": { elem1: "bead", elem2: null, chance: 0.03 },
	},
};
elements.plastic.breakInto = "microplastic";
elements.cellulose.reactions.vinegar = { elem1: "bioplastic", elem2: null, tempMin: 40, chance: 0.1 };

elements.bioplastic = {
	color: "#eee093",
	behavior: behaviors.WALL,
	category: "solids",
	state: "solid",
	tempHigh: 227,
	stateHigh: "molten_bioplastic",
	breakInto: "bioplastic_crumbs",
	alias: "Cellulose acetate",
	desc: "It's biodegradable :)",
};
elements.bioplastic_crumbs = {
	color: ["#dfd499", "#c0e8a0", "#dfab87"],
	hidden: true,
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
	tempHigh: 227,
	stateHigh: "molten_bioplastic",
	desc: "small pieces of cellulose acetate"
};

elements.worm.reactions.bioplastic = { elem2: ["carbon_dioxide", null, null, null], chance: 0.05, func: behaviors.FEEDPIXEL };
elements.worm.reactions.bioplastic_crumbs = { elem2: ["carbon_dioxide", null, null, null], chance: 0.05, func: behaviors.FEEDPIXEL };
elements.worm.behavior = [
	"SW:dirt,sand,gravel,ash,mycelium,mud,wet_sand,clay_soil,water,salt_water,dirty_water,primordial_soup,blood,infection,color_sand,bioplastic%3|XX|SW:dirt,sand,gravel,ash,mycelium,mud,wet_sand,clay_soil,water,salt_water,dirty_water,primordial_soup,blood,infection,color_sand,bioplastic,bioplastic_crumbs%3",
	"M2%10|XX|M2%10",
	"SW:dirt,sand,gravel,ash,mycelium,mud,wet_sand,clay_soil,water,salt_water,dirty_water,primordial_soup,blood,infection,color_sand,bioplastic%3|M1|SW:dirt,sand,gravel,ash,mycelium,mud,wet_sand,clay_soil,water,salt_water,dirty_water,primordial_soup,blood,infection,color_sand,bioplastic,bioplastic_crumbs%3",
];

elements.molten_bioplastic = {
	color: "#ccccac",
	behavior: behaviors.LIQUID,
	viscosity: 300,
	category: "states",
	state: "liquid",
	tempLow: 210,
	stateLow: "bioplastic",
	temp: 230,
	density: 1300,
	hidden: true,
};


elements.glycerol = {
	color: "#eefcee",
	behavior: behaviors.LIQUID,
	viscosity: 1412,
	category: "liquids",
	state: "liquid",
	density: 1261,
	tempLow: 18,
	tempHigh: 290,
	reactions: { }, // empty reaction slot to fill it with a reaction later (depending on mods used)
	burn: 5,
	burnTime: 40,
};
elements.sugar.reactions.hydrogen = { elem1: "glycerol", elem2: [null, null, null, "dirty_water"], tempMin: 120 } // hydrogenation of sugar with possible byproducts

elements.nitro.tempHigh = 218; // More accurate detonation temperature
elements.salt_water.tempLow = -20; // Melting point depression

elements.nitro.tick = function (pixel) { // Exothermic decomposition of nitroglycerin when above 60°
	if (pixel.temp > 60) {
		pixel.temp += 1;

		if (Math.random() > 0.999) { // 1 in 1000 chance each tick
			var possibleElements = ["oxygen", "nitrogen", "nitrogen", "steam", "steam", "steam", "carbon_dioxide", "carbon_dioxide", "carbon_dioxide"]; //array of possibilities for changing the nitroglycerin pixel

			var randomElement = possibleElements[Math.floor(Math.random() * possibleElements.length)]; // Randomly selecting an element from the array

			changePixel(pixel, randomElement); // Change the pixel to the randomly selected element
		}
	}
}

if (enabledMods.includes("mods/chem.js")) {
	runAfterLoad(function () {
		elements.glycerol.reactions.nitric_acid = { elem1: "nitro", elem2: null, chance: 0.05, temp1: 80 }; // Nitric acid nitrates glycerol to make nitroglycerin
		elements.nitric_acid.ignore.push("glycerol", "nitro") // required to avoid the acid dissolving the newly created products

		elements.copper.reactions.sulfuric_acid = { elem1: "copper_sulfate", elem2: "sulfur_dioxide", chance: 0.07, tempMin: 200 };
		elements.oxidized_copper.reactions.sulfuric_acid = { elem1: "copper_sulfate", elem2: null, chance: 0.05}
		elements.sulfuric_acid.ignore.push("copper_sulfate", "molten_copper_sulfate", "oxidized_copper") 

		elements.sodium_hydroxide.ignore.push("grease", "soap", "fat");
		elements.potassium_hydroxide.ignore.push("grease", "soap", "fat");


	});
} else {
	elements.glycerol.reactions.acid = { elem1: "nitro", elem2: null, chance: 0.05, temp1: 80 }; // if we don't have nitric acid from chem.js, "acid" is a good approximation
	elements.acid.ignore.push("glycerol", "nitro")
}

elements.red_cabbage = {
	color: ["#884466", "#774499"],
	behavior: behaviors.POWDER,
	category: "food",
	isFood: true,
	desc: "Can be boiled in water to release its natural pH indicator",
	density: 1300,
	state: "solid",
	tempHigh: 300,
	stateHigh: ["ash", "steam"],
	reactions: {
		water: { elem2: "ph_indicator", tempMin: 50, chance: 0.06 },
		vinegar: { elem1: "pickle", color1: "#442266", chance: 0.01 },
		broth: { color2: "#8855aa", chance: 0.05},
	},
}
elements.snail.reactions.red_cabbage = { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.05 }
elements.slug.reactions.red_cabbage = { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.05 }
elements.bird.reactions.red_cabbage = { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.05 }
elements.fish.reactions.red_cabbage = { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.05 }
elements.head.reactions.red_cabbage = { elem2: null, chance: 0.1 }

elements.ph_indicator = {
	color: "#884499",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "liquid",
	name: " pHIndicator",
	density: 1000,
	tempHigh: 100,
	stateHigh: ["water", "water", "sugar"],
	alias: "Anthocyanin",
	reactions: {
		acid: { color1: "#bb3030" },
		nitric_acid: { color1: "#bb3030" }, //chem.js
		sulfuric_acid: { color1: "#bb3030" }, //chem.js
		vinegar: { color1: "#bb2255" },
		seltzer: { color1: "#bb2288" },
		soda: { color1: "#bb2288" },
		juice: { color1: "#bb2288" },
		copper_sulfate: { color1: "#bb2288" },
		sauce: { color1: "#aa3399"},
		coffee: { color1: "#aa44aa" },
		salt_water: { color1: "#5544cc" },
		blood: { color1: "#5544cc" },
		baking_soda: { color1: "#2255bb" },
		soap: { color1: "#2288bb" },
		ammonia: { color1: "#228877"},
		bleach: { color1: "#99bb44" },
		caustic_potash: { color1: "#d7d733" },
		sodium_hydroxide: { color1: "#d7d733" }, //chem.js
	},

}
elements.potassium.reactions.ph_indicator = { elem1: ["caustic_potash"], elem2: ["hydrogen", "pop", "fire"], chance: 0.01, temp2: 400 }
elements.acid.ignore.push("ph_indicator")