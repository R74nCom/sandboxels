//Glenn's Gases is licensed under the GNU LGPL.
//http://www.gnu.org/licenses/lgpl.html
//https://www.jamieswhiteshirt.com/minecraft/mods/gases/information/?Licensing

//Steam exists.

//Coal only exists in the Neutronium Mod.
elements.coal_dust = {
	color: "#363023",
	behavior: behaviors.GAS,
	tick: function(pixel) {
		if(pixel.burning) {
			explodeAt(pixel.x,pixel.y,11,"fire,ignited_gas")
		}
	},
	category: "gases",
	density: 561,
	state: "gas",
	burn: 132,
	burnTime: 10,
	burnInto: ["ash", "fire", "carbon_dioxide"],
};

//Chlorine only exists in the Neutronium Mod and I don't feel like recreating it, so enable NM for the full experience.

//Natural gas is mostly ammonia, which exists.

elements.red_gas = {
	color: "#c74c52",
	behavior: [
		"M2%50|M1%50|M2%50",
		"M1|XX|M1",
		"M2|M1|M2",
	],
	tick: function(pixel) {
		if(pixel.burning) {
			explodeAt(pixel.x,pixel.y,12,"fire,ignited_gas")
		}
	},
	category: "gases",
	density: 1.5,
	state: "gas",
	burn: 300,
	burnTime: 10,
	burnInto: ["fire", "explosion", "explosion"],
	
};

elements.nitrous_gas = {
	color: "#854428",
	behavior: [
		"M2%50|M1%50|M2%50",
		"M1|XX|M1",
		"M2|M1|M2",
	],
	reactions: {
		"water": {"elem1": "acidic_vapour", "elem2": "acidic_vapour"}
	},
	category: "gases",
	density: 1.5,
	state: "gas",
};

elements.acidic_vapour = {
	color: ["#5282d1", "#4e6fad"],
	behavior: [
		"M2|M1 AND DB|M2",
		"M1 AND DB|XX|M1 AND DB",
		"M2%50|M1%50 AND DB|M2%50",
	],
	ignore: elements.acid.ignore,
	category: "gases",
	density: 1.5,
	state: "gas",
};

elements.void_gas = {
	color: "#111111",
	behavior: [
		"M2%50|M1%50|M2%50",
		"M1|XX|M1",
		"M2|M1|M2",
	],
	reactions: {
		"light": { "elem1": null, "chance": 0.1 },
		"fire": { "elem1": null, "chance": 0.08 },
	},
	category: "gases",
	density: 1.5,
	state: "gas",
};

elements.electric_gas = {
	color: ["#3693b3", "#246e64"],
	behavior: [
		"M2 AND CR:electric%1|M1 AND CR:electric%1|M2 AND CR:electric%1",
		"M1 AND CR:electric%1|XX                  |M1 AND CR:electric%1",
		"M2 AND CR:electric%1|M1 AND CR:electric%1|M2 AND CR:electric%1",
	],
	hardness: 0.6,
	reactions: {
		"corrosive_gas": { "elem2": "turquoise_dust", "elem1": "blue_dust", "chance": 0.5 },
		"blue_dust": { "elem1": null, "elem2": "turquoise_dust", "chance": 0.5 },
	},
	category: "gases",
	density: 1.225,
	state: "gas",
};

corrosiveGasMaxHardness = 0.5

elements.corrosive_gas = {
	color: ["#2929e6", "#151cad"],
	behavior: [
		"M2|M1|M2",
		"M1|XX|M1",
		"M2|M1|M2",
	],
	hardness: 0.6,
	tick: function(pixel) {
		//delete neighbors
		if(!isEmpty(pixel.x-1,pixel.y) && !outOfBounds(pixel.x-1,pixel.y)) {
			if(!elements[pixelMap[pixel.x-1][pixel.y].element].hardness || elements[pixelMap[pixel.x-1][pixel.y].element].hardness <= corrosiveGasMaxHardness) {
				deletePixel(pixel.x-1,pixel.y)
			}
		}
		if(!isEmpty(pixel.x+1,pixel.y) && !outOfBounds(pixel.x+1,pixel.y)) {
			if(!elements[pixelMap[pixel.x+1][pixel.y].element].hardness || elements[pixelMap[pixel.x+1][pixel.y].element].hardness <= corrosiveGasMaxHardness) {
				deletePixel(pixel.x+1,pixel.y)
			}
		}
		if(!isEmpty(pixel.x,pixel.y-1) && !outOfBounds(pixel.x,pixel.y-1)) {
			if(!elements[pixelMap[pixel.x][pixel.y-1].element].hardness || elements[pixelMap[pixel.x][pixel.y-1].element].hardness <= corrosiveGasMaxHardness) {
				deletePixel(pixel.x,pixel.y-1)
			}
		}
		if(!isEmpty(pixel.x,pixel.y+1) && !outOfBounds(pixel.x,pixel.y+1)) {
			if(!elements[pixelMap[pixel.x][pixel.y+1].element].hardness || elements[pixelMap[pixel.x][pixel.y+1].element].hardness <= corrosiveGasMaxHardness) {
				deletePixel(pixel.x,pixel.y+1)
			}
		}
	},
	reactions: {
		"electric_gas": { "elem2": "blue_dust", "elem1": "turquoise_dust", "chance": 0.5 },
		"turquoise_dust": { "elem1": null, "elem2": "blue_dust", "chance": 0.5 },
	},
	category: "gases",
	density: 1.225,
	state: "gas",
};

elements.blue_dust = {
	color: ["#063ca1", "#042d94", "#063ca1", "#042d94", "#1d66ff"],
	behavior: behaviors.POWDER,
	hardness: 0.6,
	category: "powders",
	state: "solid",
	density: 1600,
}

elements.turquoise_dust = {
	color: ["#12a6a6","#1aa3a3","#12a6a6","#1aa3a3","#00ffff"],
	behavior: behaviors.POWDER,
	hardness: 0.6,
	category: "powders",
	state: "solid",
	density: 1600,
}

elements.black_damp = {
	color: "#000000",
	behavior: [
		"M2|M1|M2",
		"M1|XX|M1",
		"M2|M1|M2",
	],
	reactions: {
		"fire": { elem2: null },
	},
	tick: function(pixel) {
		pixel.color = "rgb(0,0,0)"
	},
	hardness: 0.6,
	category: "gases",
	density: 1.225,
	state: "gas",
};

if(!elements.torch.reactions) {
	elements.torch.reactions = {}
}

elements.torch.reactions.black_damp = { elem1: "wood" }

elements.rock_dust = {
	color: "#878783",
	behavior: [
		"M2%50|M1%50|M2%50",
		"M1|XX|M1",
		"M2|M1|M2",
	],
	reactions: {
		"water": {"elem1": "dirty_water", "elem2": null }
	},
	category: "gases",
	density: 1.225,
	state: "gas",
	tempHigh: 950,
	stateHigh: "magma",
}

elements.rock.breakInto.push("rock_dust")

lightArray = ["fire", "plasma", "cold_fire", "light", "laser", "electric", "radiation", "mystic_fire", "liquid_fire", "liquid_plasma", "liquid_cold_fire", "le_liquid_light", "liquid_laser", "liquid_electric", "liquid_radiation", "liquid_mystic_fire", "magma", "liquid_light", "solid_light"]

ledArray = ["led_r", "led_g", "led_b"]

elements.iocalfaeus_gas = {
	color: ["#562173", "#481b61"],
	behavior: [
		"M1|XX|M1",
		"M2|M1|M2",
		"M2%50|M1%50|M2%50",
	],
	tick: function(pixel) {
		if(!pixel.hot) {
			pixel.hot = false
		}
		for (let i = -2; i < 3; i++) {
			for (let j = -2; j < 3; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					if ((lightArray.includes(pixelMap[pixel.x+j][pixel.y+i].element)) || (pixelMap[pixel.x+j][pixel.y+i].element.includes("molten_")) || (pixelMap[pixel.x+j][pixel.y+i].element.includes("vaporized_")) || (ledArray.includes(pixelMap[pixel.x+j][pixel.y+i].element) && pixelMap[pixel.x+j][pixel.y+i].charge)) {
						pixel.hot = true
					}
				}
			}
		}
		if(pixel.hot == true) {
			pixel.temp += 16
		}
		if(pixel.hot == true && Math.random() < 0.02) {
			pixel.hot = false
		}
	},
	category: "gases",
	density: 1.2,
	state: "gas",
}

//Helium exists.

finineRange = 6

elements.finine = {
	color: ["#ffffec", "#fafade", "#ebebd5", "#c9c9b7", "#80806f"],
	behavior: [
		"M2|M1|M2",
		"M1|XX|M1",
		"M2|M1|M2",
	],
	tick: function(pixel) {
		for (let i = -2; i < 3; i++) {
			for (let j = -2; j < 3; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					if (lifeArray.includes(pixelMap[pixel.x+j][pixel.y+i].element)) {
						pixel.eeex = pixel.x + Math.floor(Math.random() * ((2 * finineRange) + 1)) - finineRange
						pixel.eeey = pixel.y + Math.floor(Math.random() * ((2 * finineRange) + 1)) - finineRange
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
	category: "gases",
	density: 1.225,
	state: "gas",
}

//Smoke exists.

elements.ignited_gas = {
	color: ["#fc9a58", "#faae3c", "#ffef3d"],
	behavior: [
		"M2|M1 AND CR:fire%0.5|M2",
		"M1 AND CR:fire%0.5|XX|M1 AND CR:fire%0.5",
		"M2|M1 AND CR:fire%0.5|M2",
	],
	category: "gases",
	state: "gas",
	density: 0.306,
	burning: true,
	burnTime: 30,
	temp: elements.fire.temp,
	burnInto: ["fire","smoke"],
	hidden: true,
}

//Diabaline

elements.diabaline = {
	color: "#7e4e9c",
	behavior: behaviors.POWDER,
	tick: function(pixel) {
		if(!pixel.glow) {
			pixel.glow = false
		}
		if(!pixel.oldColor) {
			pixel.oldColor = pixel.color
		}
		if(!pixel.rA) {
			pixel.rA = 0
		}
		if(!pixel.gA) {
			pixel.gA = 0
		}
		if(!pixel.bA) {
			pixel.bA = 0
		}
		if(!pixel.rB) {
			pixel.rB = 0
		}
		if(!pixel.gB) {
			pixel.gB = 0
		}
		if(!pixel.bB) {
			pixel.bB = 0
		}
		if(!pixel.finalR) {
			pixel.finalR = 0
		}
		if(!pixel.finalG) {
			pixel.finalG = 0
		}
		if(!pixel.finalB) {
			pixel.finalB = 0
		}
		if(!pixel.finalColor) {
			pixel.finalColor = ""
		}
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					if (elements[pixelMap[pixel.x+j][pixel.y+i].element].category == "gases") {
						pixel.glow = true
					}
				}
			}
		}
		if(pixel.glow == true) {
			pixel.rA = pixel.oldColor.split(",")[0].slice(4)
			pixel.gA = pixel.oldColor.split(",")[1]
			pixel.bA = pixel.oldColor.split(",")[2].slice(0,-1)
			pixel.finalR = parseInt(pixel.rA) + 86
			pixel.finalG = parseInt(pixel.gA) + 93
			pixel.finalB = parseInt(pixel.bA) + 81
			pixel.finalColor = "rgb(" + pixel.finalR + "," + pixel.finalG + "," + pixel.finalB + ")"
			pixel.color = pixel.finalColor
		}
		if(pixel.glow == true && Math.random() < 0.02) {
			pixel.glow = false
		}
		if(pixel.glow == false) {
			pixel.color = pixel.oldColor
		}
	},
	category: "solids",
	density: 1500,
	state: "solid",
}


runAfterLoad(function() {
	lifeArray = Object.keys(elements).filter(function(e) {
		return elements[e].category == "life";
	});
	if(!elements.void_gas.reactions) {
		elements.void_gas.reactions = {}
	};
	for(i = 0; i < lifeArray.length; i++) {
		elements.void_gas.reactions[lifeArray[i]] = { "elem2": null, "chance": 0.7 }
	};
	elements.acidic_vapour.ignore = elements.acid.ignore
	if(enabledMods.includes("mods/Neutronium Mod.js")) {
		elements.coal.breakInto = "coal_dust"
	}
	if(enabledMods.includes("mods/boiling_rock.js")) {
		elements.rock_dust.tempHigh = 3000
		elements.rock_dust.stateHigh = "vaporized_rock"
	}
});
