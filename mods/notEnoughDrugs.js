//My first mod

//Tools

elements.vape = {
	color: ["#3d3c3b", "#5c5b5a"],
	category: "tools",
	desc: "Smoke drugs. Can turn smokable substances into smoke.",
	tool: function (pixel) {
		if (pixel.element == "meth" || pixel.element == "gold_meth" || pixel.element == "weed" || pixel.element == "fentanyl_crystal") {
			pixel.element = "smoke"
		}
	},
}

elements.sniff = {
	color: ["#5b89a3", "#a6deff"],
	category: "tools",
	desc: "Sniff drugs.",
	tool: function (pixel) {
		if (pixel.element == "meth_shard" || pixel.element == "gold_meth_shard" || pixel.element == "cocaine" || pixel.element == "fentanyl") {
			deletePixel(pixel.x, pixel.y);
		}
	},
}



//Meth

elements.red_phosphorus = {
	color: ["#5e0c0c", "#8f1313", "#a81919", "#400808" ], 
	behavior: behaviors.POWDER,
	category: "powders",
	density: 2340,
	burn: 100,
	burnTime: 500,
	burnInto: "ash",
}


elements.pseudo = {
	color: ["#d61818", "#d12626", "#cc4747", "#821111", "#e31414"],
	behavior: behaviors.POWDER,
	category: "powders",
	density: 1000,
	tempHigh: 500,
	burnInto: "molten_pseudo",
	statehigh: "molten_pseudo",
	reactions: {
		"water": {
			elem1: "foam", elem2: "water", color2: "#de5050" },
 },
}


elements.molten_pseudo = {
	color: ["#7d1616", "#2b0a0a", "#59210b", "#4d2525"],
	behavior: behaviors.MOLTEN,
	category: "states",
	density: 940,
	tempLow: 250,
	stateLow: "pseudo",
	hidden: true,
	viscosity: 1.5,
	reactions: {
		"red_phosphorus": {elem1: "molten_meth", elem2:"molten_meth", temp1: 500, temp2:600},
	},

}

elements.meth = {
	color: ["#d6f7ff", "#bbe5f0", "#b2bdbf"],
	behavior: behaviors.WALL,
	category: "drugs",
	desc: "Recipe: Red phosphorous + molten psuedo.",
	breakInto: "meth_shard",
	density: 980,
	tempHigh: 550,
	stateHigh: "molten_meth",
	reactions: {
		"body": {elem1:["gold_coin", "smoke"]},
	}
}



elements.molten_meth = {
	color: ["#f7975c", "#fab184", "#ffd5ba"],
	behavior: behaviors.MOLTEN,
	category: "states",
	hidden: true,
	density: 10010, 
	temp: 150, 
	tempLow: 225,
	stateLow: "meth", 
	viscosity: 1.5,
	reactions: {
		"molten_gold": {elem1: "molten_gold_meth", elem2:null, temp1:500}
	}
}


elements.meth_shard = {
	color: ["#567487", "#6a8da3", "#345061"],
	behavior: behaviors.POWDER,
	category: "drugs",
	desc:"Recipe: Break meth.",
	density: 950,
	tempHigh: 550,
	stateHigh: "molten_meth",
	reactions: {
		"body": { elem1: ["gold_coin"] },
	}
	
}


elements.gold_meth = {
	color: ["#99814d", "#e6ce9a", "#cca552", "#85512e"],
	beavior: behaviors.WALL,
	category: "drugs",
	desc: "Recipe: Molten meth + molten gold.",
	breakInto: "gold_meth_shard",
	tempHigh: 550,
	stateHigh: "molten_gold_meth",
	reactions: {
		"body": { elem1: ["diamond", "smoke"] },
	}
}


elements.molten_gold_meth = {
	color: ["#e8c97b", "#6e5040", "#a66d1e","#edc661" ],
	behavior: behaviors.MOLTEN,
	category: "states",
	hidden: true,
	density: 1060,
	temp: 150,
	tempLow: 225,
	stateLow: "gold_meth",
	viscosity: 1.5,
}

	elements.gold_meth_shard = {
		color: ["#78643a", "#c2af86", "#7d642f", "#573620"],
		behavior: behaviors.POWDER,
		category: "drugs",
		desc:"Recipe: Break gold meth.",
		hidden: false,
		density: 1000,
		tempHigh: 550,
		stateHigh: "molten_gold_meth",
		reactions: {
			"body": { elem1: ["diamond"] },
		}

	}


//Weed

elements.weed_seed = {
	color: "#6e4022",
	category: "life",
	density: 1000,
	tempHigh: 100,
	tempLow: -100,
	breakInto: "dead_plant",
	stateHigh: "dead_plant",
	stateLow: "frozen_plant",
	behavior: [
			["XX", "CR:weed_branch%5", "XX"],
			["XX", "XX", "XX"],
			["M2", "M1 AND CH:dirt,sand,mud,wet_sand>root%005", "M2"]
	],

}

elements.weed_branch_no_leaf = {
	color: ["#3a9406", "#245e03", "#44b005"],
	category: "life",
	hidden: true,
	density: 1000,
	tempHigh: 100,
	tempLow: -100,
	breakInto: "dead_plant",
	stateHigh: "dead_plant",
	stateLow: "frozen_plant",
	behavior: [
		["XX", "CR:weed_branch%2 AND CR:weed_leaf%0.5", "XX"],
		["XX", "XX", "XX"],
		["XX", "XX", "XX"]
	],
}

elements.weed_branch = {
	color: ["#3a9406", "#245e03", "#44b005"],
	category: "life",
	hidden: true,
	density: 1000,
	tempHigh: 100,
	tempLow: -100,
	breakInto: "dead_plant",
	stateHigh: "dead_plant",
	stateLow: "frozen_plant",
	behavior: [
		["XX", "CR:weed_branch_no_leaf%2 AND CR:weed_leaf%0.5", "XX"],
		["CR:weed_leaf%1", "XX", "CR:weed_leaf%1"],
		["XX", "XX", "XX"]
	],

}


elements.weed_leaf = {
	color: ["#5aa132", "#60c425", "#164723"],
	category: "life",
	hidden: true,
	density: 1000,
	tempHigh: 100,
	tempLow: -100,
	breakInto: "dead_plant",
	stateHigh: "dead_plant",
	stateLow: "frozen_plant",
	behavior: [
		["XX", "XX", "XX"],
		["CR:weed%0.1 AND SA", "XX", "CR:weed%0.1 AND SA"],
		["XX", "XX", "XX"]
	],

}


elements.weed = {
	color: ["#2dbd54", "#a7dbb5", "#0c852c", "#0c3d19"],
	category: "drugs",
	desc: "Recipe: Sow a weed seed and wait.",
	density: 1000,
	tempHigh: 100,
	tempLow: -100,
	breakInto: "dead_plant",
	stateHigh: "dead_plant",
	stateLow: "frozen_plant",
	behavior: behaviors.POWDER,
	reactions: {
		"body": { elem1: ["gold_coin", "smoke"] },
	}
}





//Cocaine






elements.coca_seed = {
	color: "#7a5328",
	category: "life",
	density: 1000,
	tempHigh: 100,
	tempLow: -100,
	breakInto: "dead_plant",
	stateHigh: "dead_plant",
	stateLow: "frozen_plant",
	behavior: [
		["XX", "CR:coca_branch_R%5 AND CR:coca_branch_L%5", "XX"],
		["XX", "XX", "XX"],
		["M2", "M1 AND CH:dirt,sand,mud,wet_sand>root%005", "M2"]
	],

}


elements.coca_branch_T = {
	color: ["#3a9406", "#67914e", "#97c77b"],
	category: "life",
	hidden: true,
	density: 1000,
	tempHigh: 100,
	tempLow: -100,
	breakInto: "dead_plant",
	stateHigh: "dead_plant",
	stateLow: "frozen_plant",
	behavior: [
		["XX", "XX", "XX"],
		["XX", "XX", "XX"],
		["XX", "XX", "XX"]
	],
}

elements.coca_branch_R = {
	color: ["#3a9406", "#67914e", "#97c77b"],
	category: "life",
	hidden: true,
	density: 1000,
	tempHigh: 100,
	tempLow: -100,
	breakInto: "dead_plant",
	stateHigh: "dead_plant",
	stateLow: "frozen_plant",
	behavior: [
		["XX", "CR:coca_branch_L%2 AND CR:coca_branch_T%0.5", "XX"],
		["XX", "XX", "CR:coca_leafR%0.5 AND SP"],
		["XX", "XX", "XX"]
	],
}

elements.coca_branch_L = {
	color: ["#3a9406", "#67914e", "#97c77b"],
	category: "life",
	hidden: true,
	density: 1000,
	tempHigh: 100,
	tempLow: -100,
	breakInto: "dead_plant",
	stateHigh: "dead_plant",
	stateLow: "frozen_plant",
	behavior: [
		["XX", "CR:coca_branch_R%2 AND CR:coca_branch_T%0.5", "XX"],
		["CR:coca_leafR%0.5 AND SP", "XX", "XX"],
		["XX", "XX", "XX"]
	],

}


elements.coca_leaf = {
	color: ["#a7e85d", "#6f9147","#78bf26"],
	category: "life",
	desc:"Recipe: Sow a coca seed wait, then, break the coca leaf.",
	density: 1000,
	tempHigh: 500,
	tempLow: -100,
	stateHigh: "dead_plant",
	stateLow: "frozen_plant",
	behavior: [
		["XX", "XX", "XX"],
		["XX","XX","XX"],
		["M2", "M1", "M2"]
	],

	reactions: {
		"oil": {elem1: "cocaine_base", elem2: "cocaine_base", tempMin: 75 },
	},

}


elements.coca_leafR = {
	color: ["#a7e85d", "#6f9147", "#78bf26"],
	category: "life",
	hidden: true,
	density: 1000,
	tempHigh: 100,
	tempLow: -100,
	breakInto: "coca_leaf",
	stateHigh: "dead_plant",
	stateLow: "frozen_plant",
	behavior: [
		["XX", "XX", "XX"],
		["CR:coca_leafR%0.05 AND SP", "XX", "CR:coca_leafR%0.05 AND SP"],
		["XX", "XX", "XX"]
	],

}


elements.cocaine_base = {
	color: ["#bf9926", "#82691e", "#bfa65c"],
	category: "solids",
	behavior: behaviors.WALL,
	tempHigh: 1000,
	tempLow: -100,
	stateHigh: "molten_cocaine"

}


elements.molten_cocaine = {
	color: ["#f7975c", "#fab184", "#ffd5ba"],
	category: "states",
	hidden: true,
	behavior: behaviors.MOLTEN,
	tempHigh: 1000,
	tempLow: 100,
	stateLow: "cocaine_rock"

}



elements.cocaine_rock = {
	color: ["#ffffff", "#d5d9e0", "#acaeb0"],
	category: "solids",
	hidden: true,
	behavior: behaviors.WALL,
	tempHigh: 1000,
	breakInto: "cocaine",
	stateHigh: "molten_cocaine",

}


elements.cocaine = {
	color: ["#cbced4", "#9b9c9e", "#797b7d"],
	category: "drugs",
	density: 600,
	desc: "Recipe: Mix coca leafs with oil and heat up, then, freeze the mix and break the cocaine rock.",
	behavior: behaviors.POWDER,
	tempHigh: 1000,
	stateHigh: "molten_cocaine",
	reactions: {
		"body": { elem1: ["gold_coin"] },
	}

}



//Fentanyl


elements.phenylacetic_acid = {
	color: ["#ffffff", "#d9d5cc", "#ededeb"],
	category: "powders",
	density: 1180,
	behavior: behaviors.POWDER,
	tempHigh: 1000,
	stateHigh: "ash",
	reactions: {
		"aniline": {
			"func": function (pixel, otherPixel) {
				if (pixel.temp >= 300) {
					changePixel(pixel, "explosion");
					deletePixel(otherPixel.x, otherPixel.y);
				} else if (pixel.temp >= 70) {
					changePixel(pixel, "phenylacetanilide");
					changePixel(otherPixel, "phenylacetanilide");
				}
			}
		}
	}
}




elements.aniline = {
	color: ["#edd591"],
	category: "liquids",
	density: 1020,
	behavior: behaviors.LIQUID,
	tempLow: -15,
	tempHigh: 300,
	stateLow: "aniline_ice",
	stateHigh: "steam",

}


elements.aniline_ice = {
	color: ["#e8e0c8"],
	category: "states",
	hidden: true,
	behavior: behaviors.WALL,
	tempHigh: 20,
	stateHigh: "aniline",

}


elements.phenylacetanilide = {
	color: ["#f2ead8", "#dbd3bf", "#e8dab5"],
	hidden: true,
	category: "powders",
	density: 1210,
	behavior: behaviors.POWDER,
	tempHigh: 1000,
	stateHigh: "ash",

}


elements.piperidine = {
	color: ["#f5f2eb", "#ede6d5", "#c7c4bd"],
	category: "powders",
	density: 860,
	behavior: behaviors.POWDER,
	tempHigh: 1000,
	stateHigh: "ash",
	reactions: {
		"phenylacetanilide": {
			"func": function (pixel, otherPixel) {
				if (pixel.temp >= 300) {
					changePixel(pixel, "explosion");
					deletePixel(otherPixel.x, otherPixel.y);
				} else if (pixel.temp >= 130) {
					changePixel(pixel, "raw_fentanyl");
					changePixel(otherPixel, "raw_fentanyl");
				}
			}
		}
	}
}



elements.raw_fentanyl = {
	color: ["#f2e9d0"],
	category: "liquids",
	density: 1000,
	hidden: true,
	behavior: behaviors.LIQUID,
	tempLow: -15,
	tempHigh: 300,
	stateLow: "fentanyl_crystal",
	stateHigh: "steam",

}





elements.fentanyl_crystal = {
	color: ["#ffffff", "#d9d5cc", "#ededeb"],
	category: "drugs",
	desc: "Recipe: Mix phenylacetic acid with aniline and heat it up to produce phenylacetanilide. Then, mix this with piperidine to make raw fentanyl. Cool it down to obtain fentanyl crystal.",
	breakInto: "fentanyl",
	density: 1180,
	behavior: behaviors.solid,
	tempHigh: 1000,
	stateHigh: "ash",
	reactions: {
		"body": { elem1: ["gold_coin", "smoke"] },
	}
}



elements.fentanyl = {
	color: ["#f2ead8", "#dbd3bf", "#e8dab5"],
	category: "drugs",
	desc:"Recipe: Break fentanyl crystal.",
	density: 500,
	behavior: behaviors.POWDER,
	tempHigh: 1000,
	stateHigh: "ash",
	reactions: {
		"body": { elem1: ["gold_coin"] },
		"alcohol": {elem1:null, elem2:"liquid_fentanyl"},
	}

}



elements.liquid_fentanyl = {
	color: "#97b1db",
	category: "drugs",
	desc: "Recipe: Mix fentanyl with alcohol.",
	density: 1000,
	behavior: behaviors.LIQUID,
	tempHigh: 1000,
	stateHigh: "ash",
	reactions: {
		"body": { elem1: ["gold_coin", "blood"] },
	}

}

