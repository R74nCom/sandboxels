nonAdjacentCoords = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1]
];

//pyrotheum

elements.blazing_pyrotheum = {
	color: "#ffdd55",
	behavior: behaviors.LIQUID,
	tick: function(pixel) {
		if(pixel.temp >= -273 && pixel.temp <= 3707) { //temperature minimum of 3727
			pixel.temp += 50
		} else if(pixel.temp > 3677 && pixel.temp < 3727) {
			pixel.temp = 3727
		}
		var pX = pixel.x;
		var pY = pixel.y;
		for(i = 0; i < adjacentCoords.length; i++) {
			var oX = adjacentCoords[i][0];
			var oY = adjacentCoords[i][1];
			var fX = pX+oX;
			var fY = pY+oY;
			if(!isEmpty(fX,fY,true)) {
				var checkPixel = pixelMap[fX][fY];
				var thisElementName = pixel.element;
				var otherElementName = checkPixel.element;
				var thisElement = elements[pixel.element];
				var otherElement = elements[checkPixel.element];
				thisElementName === otherElementName ? checkPixel.temp+=0.1 : checkPixel.temp==10;
			} else if(isEmpty(fX,fY,false)) {
				if(Math.random() < 0.05) {
					createPixel("fire",fX,fY);
					var checkPixel = pixelMap[fX][fY];
					checkPixel.temp = pixel.temp;
				}
			};
		};
	},
	viscosity: 1.2**4,
	category: "liquids",
	state: "liquid",
	density:1994,
	insulate:false,
	temp: 3727,
},

elements.gelid_cryotheum = {
	color: "#00ddff",
	behavior: behaviors.LIQUID,
	tick: function(pixel) {
		if(pixel.temp >= -223) { //temperature maximum of -223
			pixel.temp -= 50
		} else if(pixel.temp > -223 && pixel.temp < -273) {
			pixel.temp = -223
		}
		var pX = pixel.x;
		var pY = pixel.y;
		for(i = 0; i < adjacentCoords.length; i++) {
			var oX = adjacentCoords[i][0];
			var oY = adjacentCoords[i][1];
			var fX = pX+oX;
			var fY = pY+oY;
			if(!isEmpty(fX,fY,true)) {
				var checkPixel = pixelMap[fX][fY];
				var thisElementName = pixel.element;
				var otherElementName = checkPixel.element;
				var thisElement = elements[pixel.element];
				var otherElement = elements[checkPixel.element];
				thisElementName === otherElementName ? checkPixel.temp-=0.1 : checkPixel.temp-=10;
			};
		};
		/*for(i = 0; i < nonAdjacentCoords.length; i++) {
			var oX = nonAdjacentCoords[i][0];
			var oY = nonAdjacentCoords[i][1];
			var fX = pX+oX;
			var fY = pY+oY;
			if(isEmpty(fX,fY,false)) {
				if(Math.random() < 0.025) {
					createPixel("snow",fX,fY);
					var checkPixel = pixelMap[fX][fY];
					checkPixel.temp = pixel.temp;
				};
			};
		};*/ //It should create snow, but the snow freezes into ice and it leaves unsightly floating ice everywhere.
	},
	viscosity: 3**4,
	category: "liquids",
	state: "liquid",
	density:3988,
	insulate:false,
	temp: -223,
},

elements.tectonic_petrotheum = {
	color: ["#342414","#3C2414","#2C1C14","#543424","#643C28","#74442C"],
	behavior: [
		"XX|XX|XX",
		"M2|XX|M2",
		"M1|M1|M1",
	],
    tick: function(pixel) { //Code from R74n/vanilla "smash" tool
		var pX = pixel.x;
		var pY = pixel.y;
		for(i = 0; i < adjacentCoords.length; i++) {
			var oX = adjacentCoords[i][0];
			var oY = adjacentCoords[i][1];
			var fX = pX+oX;
			var fY = pY+oY;
			if(!isEmpty(fX,fY,true)) {
				var checkPixel = pixelMap[fX][fY];
				var thisElementName = pixel.element;
				var otherElementName = checkPixel.element;
				var thisElement = elements[pixel.element];
				var otherElement = elements[checkPixel.element];
				if (typeof(otherElement.breakInto) !== "undefined") {
					var hardness = null;
					if (typeof(otherElement.hardness) === "number") {
						hardness = otherElement.hardness;
					} else {
						hardness = 1;
					};
					if (Math.random() < hardness) {
						var breakInto = otherElement.breakInto;
						// if breakInto is an array, pick one
						if (Array.isArray(breakInto)) {
							breakInto = breakInto[Math.floor(Math.random() * breakInto.length)];
						};
						changePixel(checkPixel,breakInto);
					}
				}
			};
		};
    },
	temp: 120,
	viscosity: 1.5**4,
	category: "liquids",
	state: "liquid",
	density:3988,
	insulate:false,
},

elements.basalt_gravel = {
	color: ["#4d4c4c", "#42403f", "#333130", "#36322f"],
	behavior: behaviors.POWDER,
	tempHigh: 1262.5,
	stateHigh: "magma",
	category: "land",
	state: "solid",
	density: 1975,
	hardness: 0.26,
},

elements.limestone_gravel = {
	color: ["#c7baa1", "#e8d8b7", "#fcf3d7", "#fffce6"],
	behavior: behaviors.POWDER,
    tempHigh: 825,
    stateHigh: "quicklime",
    category: "land",
    state: "solid",
    density: 1380,
    hardness: 0.16,
    breakInto: ["quicklime","calcium","dust"],
}

if(!Array.isArray(elements.basalt.breakInto)) {
	tempArray = []
	tempArray.push(elements.basalt.breakInto)
	elements.basalt.breakInto = tempArray
}

elements.basalt.breakInto.push("basalt_gravel")
elements.limestone.breakInto.push("limestone_gravel")
elements.limestone.breakInto.push("limestone_gravel")

elements.worm.reactions.limestone_gravel = { "elem2":"calcium", "chance":0.1 },
elements.acid.reactions.limestone_gravel = { "elem1":"neutral_acid", "elem2":null },

elements.zephyrean_aerotheum = {
	color: ["#FFFCD9","#FEFFFC","#FDFFDB","#FFFFE8","#FBF6D3","#F1EDD0"],
	behavior: behaviors.AGLIQUID,
	viscosity: 0.1**4,
	category: "liquids",
	state: "liquid",
	density:-800,
	insulate:false,
};

if(enabledMods.includes("mods/velocity.js")) {
	elements.zephyrean_aerotheum.tick = function(pixel) {
		//"Projectiles that come into contact with zephyrean aerotheum are sent flying in a random direction away from the fluid."
		var pX = pixel.x;
		var pY = pixel.y;
		for(i = 0; i < adjacentCoords.length; i++) {
			var oX = adjacentCoords[i][0];
			var oY = adjacentCoords[i][1];
			var fX = pX+oX;
			var fY = pY+oY;
			if(!isEmpty(fX,fY,true)) {
				var checkPixel = pixelMap[fX][fY];
				var thisElementName = pixel.element;
				var otherElementName = checkPixel.element;
				var thisElement = elements[pixel.element];
				var otherElement = elements[checkPixel.element];
				if(otherElement.movable) {
					if(typeof(checkPixel.vx) === "undefined") {
						checkPixel.vx = 0;
					};
					if(typeof(checkPixel.vy) === "undefined") {
						checkPixel.vy = 0;
					};
					if(Math.random() < 1/3) {
						var randomVxChange = Math.floor(Math.random() * 9) - 4; //random value from -3 to 3
						var randomVyChange = Math.floor(Math.random() * 9) - 4; //different random value from -3 to 3
						//Notes
						/*
							Positive vx = right
							Positive vy = down
							adjacentCoords[0]: [0, 1]	is downward; when it is detected, the pixel there should be sent farther down (positive vy).
							adjacentCoords[1]: [0, -1]	is upward; when it is detected, the pixel there should be sent farther up (negative vy).
							adjacentCoords[2]: [1, 0]	is rightward; when it is detected, the pixel there should be sent farther right (positive vx).
							adjacentCoords[3]: [-1, 0]	is leftward; when it is detected, the pixel there should be sent farther left (negative vx).
						*/
						switch(i) {
							case 0:
								randomVyChange = Math.abs(randomVyChange);
								break;
							case 1:
								randomVyChange = (Math.abs(randomVyChange) * -1) - 1;
								break;
							case 2:
								randomVxChange = Math.abs(randomVxChange);
								break;
							case 3:
								randomVxChange = Math.abs(randomVxChange) * -1;
								break;
							default:
								console.log("Uh-oh, i was somehow above 3!")
						};						
						if(otherElementName !== thisElementName) {
							checkPixel.vx += randomVxChange;
							checkPixel.vy += randomVyChange;
						}
					}
				};
			};
		};
	};
};

elements.energized_glowstone = {
	color: ["#fbb204", "#fcf605", "#fce704", "#f8c414", "#f8e814"],
	behavior: [
		"M1 AND SW:light|M1 AND CR:light%40 AND SW:light|M1 AND SW:light",
		"M2 AND CR:light%40|XX|M2 AND CR:light%40",
		"XX|CR:light%40|XX",
	],
	viscosity: 0.1**4,
	category: "liquids",
	state: "liquid",
	density:-500,
	insulate:false, //TODO: > Energized glowstone source blocks will gradually float upwards if there are no blocks above them. If they float at high levels (layers 120 and above by default) they will condense back into solid glowstone. They will also condense at 80% of this height if the fluid has no space to flow.
},

elements.resonant_ender = {
	color: ["#062c2c", "#062c2c", "#19a8a8", "#0a4646", "#1f8c8e", "#0c5c54", "#0c5c54"],
	behavior: behaviors.LIQUID,
	tick: function(pixel) {
		for (let i = -2; i < 3; i++) {
			for (let j = -2; j < 3; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					if (lifeArray.includes(pixelMap[pixel.x+j][pixel.y+i].element)) {
						pixel.eeex = pixel.x + Math.floor(Math.random() * ((2 * 8) + 1)) - 8
						pixel.eeey = pixel.y + Math.floor(Math.random() * ((2 * 8) + 1)) - 8
						//if human
						//handle heads
						if(pixelMap[pixel.x+j][pixel.y+i].element == "head") {
							if(isEmpty(pixel.eeex,pixel.eeey) && !outOfBounds(pixel.eeex,pixel.eeey) && isEmpty(pixel.eeex,pixel.eeey+1) && !outOfBounds(pixel.eeex,pixel.eeey+1)) {
								tryMove(pixelMap[pixel.x+j][pixel.y+i],pixel.eeex,pixel.eeey)
								tryMove(pixelMap[pixel.x+j][pixel.y+i+1],pixel.eeex,pixel.eeey+1)
							}
						} else if(pixelMap[pixel.x+j][pixel.y+i].element == "body") {
							
						} else {
							if(isEmpty(pixel.eeex,pixel.eeey) && !outOfBounds(pixel.eeex,pixel.eeey)) {
								tryMove(pixelMap[pixel.x+j][pixel.y+i],pixel.eeex,pixel.eeey)
							}
						}
					}
				}
			}
		}
	},
	category: "liquids",
	density: 3000,
	state: "liquid",
	viscosity: 3**4,
}

if(enabledMods.includes("minecraft.js")) {
	minecraftModEnabled = true
} else {
	minecraftModEnabled = false
}

runAfterLoad(function() {
	lifeArray = Object.keys(elements).filter(function(e) {
		return elements[e].category == "life";
	});
	if(minecraftModEnabled == true) {
		elements.redstone_dust.tempHigh = 2500
		elements.redstone_dust.stateHigh = "destabilized_redstone"
		elements.destabilized_redstone = {
			color: ["#9e0303", "#98061a", "#b80704", "#c4020c", "#f70008", "#9e0303", "#98061a", "#b80704", "#e3020a", "#8c0303", "#8c0303"],
			behavior: [
				"XX|SH|XX",
				"M2 AND SH|XX|M2 AND SH",
				"M1|M1 AND SH|M1",
			],
			viscosity: 1.5**4,
			category: "liquids",
			state: "liquid",
			density:1200,
		}
		
		elements.signalum = {
			color: "#ff9321",
			behavior: behaviors.WALL,
			category: "solids",
			density: 10500,
			conduct: 1,
			tempHigh: 1550,
			stateHigh: "molten_signalum",
			state: "solid",
		}
		
if(!elements.molten_sterling) {
elements.molten_sterling = {
    "color": ["#FFA53C","#FF843C","#FF6300","#FFFF71","#FFE871","#FFAE00","#FFEB5C","#FFB55C","#FF8D00"],
    "behavior": behaviors.MOLTEN,
    "temp": 802,
    "tempLow": 702,
    "stateLow": "sterling",
    "viscosity": 10000,
    "hidden": true,
    "state": "liquid",
    "category": "molten",
    "density": 9337.7,
    "conduct": 1,
    "reactions": {
        "ash": {
            "elem1": null,
            "elem2": "molten_slag"
        },
        "dust": {
            "elem1": null,
            "elem2": "molten_slag"
        },
        "magma": {
            "elem1": null,
            "elem2": "molten_slag"
        }
    }
}
}

		if(!elements.molten_sterling.reactions) {
			elements.molten_sterling.reactions = {}
		}

		elements.molten_sterling.reactions.destabilized_redstone = { "elem1": null, "elem2": "molten_signalum" }
		
		elements.molten_signalum = {
			color: "#f17414",
			behavior: behaviors.MOLTEN,
			density: 10500*0.9,
			conduct: 0.30,
			temp:600,
			tempLow: 550,
			stateLow: "signalum",
			category: "liquids",
			state: "liquid",
			hidden: true,
		}

		if(!elements.energized_glowstone.reactions) {
			elements.energized_glowstone.reactions = {}
		}

		elements.energized_glowstone.reactions.gelid_cryotheum = { "elem1":"glowstone_dust" }
	};
});
