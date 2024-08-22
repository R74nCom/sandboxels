
// created by Rain :o 20/8 2024

elements.car = {
	//color: ["#E37F6F", "#B075DF", "#4F8FEF"],
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
	stateHigh: ["molten_aluminum", "molten_plastic", "glass"],
	breakInto: ["aluminum", "plastic", "glass_shard"],
	flippableX: true,
	desc: "Powered by electricity. Can hang on conductive materials for suspension railway",
	reactions: {
		"malware": { elem2: "electric" },
	},
	tick: function (pixel) {

		if (pixel.tramFlip === undefined) {
			pixel.tramFlip = 1; //tramFlip works like carFlip for the car
		}

		if (pixel.charge > 0) { //only if powered by electricity

			if (isEmpty(pixel.x + 1 * pixel.tramFlip, pixel.y - 1) && !isEmpty(pixel.x + 1 * pixel.tramFlip, pixel.y - 2)) {
				var diUpPixel = pixelMap[pixel.x + 1 * pixel.tramFlip][pixel.y - 2] //establishes the variable. Must be down here because it would crash if there is no diUpPixel
				if (elements[diUpPixel.element].conduct && diUpPixel.element !== "tram") { //^ is also the reason this is a seperate if statement
					tryMove(pixel, pixel.x + 1 * pixel.tramFlip, pixel.y - 1); //move diagonally upwards if there is support
				}
				else {
					pixel.tramFlip = pixel.tramFlip * -1;
				}
			}
			else if (isEmpty(pixel.x + 1 * pixel.tramFlip, pixel.y) && !isEmpty(pixel.x + 1 * pixel.tramFlip, pixel.y - 1)) {
				var sidePixel = pixelMap[pixel.x + 1 * pixel.tramFlip][pixel.y - 1]
				if (elements[sidePixel.element].conduct && sidePixel.element !== "tram") { 
					tryMove(pixel, pixel.x + 1 * pixel.tramFlip, pixel.y); //move to the side if there is support
				}
				else {
					pixel.tramFlip = pixel.tramFlip * -1;
				}
			}
			else if (isEmpty(pixel.x + 1 * pixel.tramFlip, pixel.y + 1) && !isEmpty(pixel.x + 1 * pixel.tramFlip, pixel.y)) {
				var diDownPixel = pixelMap[pixel.x + 1 * pixel.tramFlip][pixel.y]
				if (elements[diDownPixel.element].conduct && diDownPixel.element !== "tram") {
					tryMove(pixel, pixel.x + 1 * pixel.tramFlip, pixel.y + 1); //move diagonally downwards if there is support
				}
				else {
					pixel.tramFlip = pixel.tramFlip * -1;
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
				pixel.tramFlip = pixel.tramFlip * -1;
            }

		}
		else { //if not powered
			if (!isEmpty(pixel.x, pixel.y - 1)) {
				var upPixel = pixelMap[pixel.x][pixel.y - 1]  //looks at the properties of the pixel above
				if (elements[upPixel.element].conduct > 0.1 && upPixel.element !== "tram") { //if the pixel above is conductive but not tram
					//nothing happens ie it doesn't fall
				}
				else {
					tryMove(pixel, pixel.x, pixel.y + 1); //it falls down
				}
			}
			else {
				tryMove(pixel, pixel.x, pixel.y + 1); //it falls down (same as above)
            }
            
		}
		doDefaults(pixel)
    },
};
elements.bouncy_ball = {
	color: "#e35693",
	behavior: behaviors.WALL,
	tempHigh: 250,
	stateHigh: ["borax", "glue"],
	category: "special",
	conduct: 1,
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
			if (pixel.fallDist > 0) {
				tryMove(pixel, pixel.x, pixel.y - 1)
				pixel.fallDist -= 1
			} else {
				pixel.isFalling = true;
				pixel.fallDist -= 1 //makes the ball lose 1 pixel height each bounce, useful at the end when * 3/4 only results in fractions
            }
			
        }

    }
};
elements.borax.reactions.slime = { elem1: "bouncy_ball", elem2: null};