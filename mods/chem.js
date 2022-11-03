elements.fluorine = {
	color: "#FFFFBF",
	behavior: behaviors.GAS,
	ignore: ["FOOF","solid_FOOF","oxygen","liquid_oxygen","oxygen_ice","chlorine","liquid_chlorine","liquid_hydrogen_fluoride","liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_acid","hydrofluoric_acid_gas","fire","smoke","acid_gas","neutral_acid","acid","acid_cloud","water","salt_water","sugar_water","dirty_water","steam","gold","hydrogen"],
	tick: function(pixel) {
		let change = false;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (!(i === 0 && j === 0) && !isEmpty(pixel.x+i,pixel.y+j,true)
					&& !elements[pixel.element].ignore.includes(pixelMap[pixel.x+i][pixel.y+j].element)) {
					if(!elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness || Math.random() > elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"fire");
						change = true;
					}
				}
			}
		}
		if (change) {
			changePixel(pixel,"fire");
		}
	},
	reactions: {
		"water": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"salt_water": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"sugar_water": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"dirty_water": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"steam": { "elem1": "hydrofluoric_acid_gas", "elem2": "hydrogen" },
		"acid_gas": { "elem1": "hydrofluoric_acid_gas", "elem2": "hydrogen" },
		"neutral_acid": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"acid": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"liquid_oxygen": { "elem1": "FOOF", "elem2": null },
		"hydrogen": { "elem1": "hydrogen_fluoride", "elem2":null },
	},
	tempLow: -188.1,
	stateLow: "liquid_fluorine",
	state: "gas",
	category:"gases",
	density: 1.7,
	stain: 0.005,
}

elements.liquid_fluorine = {
	color: "#ffff3b",
	behavior: behaviors.LIQUID,
	ignore: ["FOOF","solid_FOOF","oxygen","liquid_oxygen","oxygen_ice","chlorine","liquid_chlorine","liquid_hydrogen_fluoride","liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_acid","hydrofluoric_acid_gas","fire","smoke","acid_gas","neutral_acid","acid","acid_cloud","water","salt_water","sugar_water","dirty_water","steam","gold","hydrogen"],
	tick: function(pixel) {
		let change = false;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (!(i === 0 && j === 0) && !isEmpty(pixel.x+i,pixel.y+j,true)
					&& !elements[pixel.element].ignore.includes(pixelMap[pixel.x+i][pixel.y+j].element)) {
					if(Math.random() < 0.01 && (!elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness || Math.random() > elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness)) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"fire");
						change = true;
					}
				}
			}
		}
		if (change && Math.random() < 0.02) {
			changePixel(pixel,"fire");
		}
	},
	reactions: {
		"water": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"salt_water": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"sugar_water": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"dirty_water": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"steam": { "elem1": "hydrofluoric_acid_gas", "elem2": "hydrogen" },
		"acid_gas": { "elem1": "hydrofluoric_acid_gas", "elem2": "hydrogen" },
		"neutral_acid": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"acid": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"hydrogen": { "elem1": "hydrogen_fluoride", "elem2":null },
	},
	temp: -198.1,
	tempHigh: -188.1,
	stateHigh: "fluorine",
	tempLow: -219.7,
	state: "liquid",
	category:"liquids",
	density: 1.7,
	stain: 0.005,
}

elements.hydrofluoric_acid = {
	color: ["#c8cf91","#efff5e","#a0cc39"],
	ignore: ["fire","liquid_hydrogen_fluoride","liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_acid","hydrofluoric_acid_gas","acid_gas","neutral_acid","acid","acid_cloud","water","salt_water","sugar_water","dirty_water","steam","gold"],
	tick: function(pixel) {
		let change = false;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (!(i === 0 && j === 0) && !isEmpty(pixel.x+i,pixel.y+j,true)
					&& !elements[pixel.element].ignore.includes(pixelMap[pixel.x+i][pixel.y+j].element)) {
					if(!elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness || Math.random() > elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"fire");
						change = true;
					}
				}
			}
		}
		if (change) {
			if(Math.random() < 0.2) {
				changePixel(pixel,"hydrogen_fluoride");
			} else {
				deletePixel(pixel.x,pixel.y);
				return;
			}
		} else {
			behaviors.LIQUID(pixel);
		}
	},
	reactions: {
		"water": { "elem1": "hydrofluoric_acid", "elem2": "dirty_water" },
		"salt_water": { "elem1": "hydrofluoric_acid", "elem2": "dirty_water" },
		"sugar_water": { "elem1": "hydrofluoric_acid", "elem2": "dirty_water" },
	},
	state: "liquid",
	category:"liquids",
    density: 1150,
	stain: 0.005,
	tempHigh: 400,
	stateHigh: "fire",
	tempLow: -58.88,
}


elements.hydrofluoric_acid_gas = {
	color: ["#acb37d","#bfcc4b","#668224"],
	ignore: ["liquid_hydrogen_fluoride","liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_acid","hydrofluoric_acid_gas","acid_gas","neutral_acid","acid","acid_cloud","water","salt_water","sugar_water","dirty_water","steam","gold"],
	tick: function(pixel) {
		let change = false;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (!(i === 0 && j === 0) && !isEmpty(pixel.x+i,pixel.y+j,true)
					&& !elements[pixel.element].ignore.includes(pixelMap[pixel.x+i][pixel.y+j].element)) {
					if(!elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness || Math.random() > elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"fire");
						change = true;
					}
				}
			}
		}
		if (change) {
			if(Math.random() < 0.2) {
				changePixel(pixel,"hydrogen_fluoride");
			} else {
				deletePixel(pixel.x,pixel.y);
			}
		} else {
			behaviors.GAS(pixel);
		}
	},
	reactions: {
		"water": { "elem1": "hydrofluoric_acid_gas", "elem2": "dirty_water" },
		"salt_water": { "elem1": "hydrofluoric_acid_gas", "elem2": "dirty_water" },
		"sugar_water": { "elem1": "hydrofluoric_acid_gas", "elem2": "dirty_water" },
	},
	state: "gas",
    density: 1.63,
	stain: 0.005,
	tempHigh: 400,
	stateHigh: "fire",
	tempLow: -10,
	stateLow: "hydrofluoric_acid",
	category:"gases",
}

elements.hydrogen_fluoride = {
	color: "#f2f28d",
	behavior: behaviors.GAS,
	ignore: ["liquid_hydrogen_fluoride","liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_acid","hydrofluoric_acid_gas","fire","smoke","acid_gas","neutral_acid","acid","acid_cloud","water","salt_water","sugar_water","dirty_water","steam","gold","hydrogen"],
	tick: function(pixel) {
		let change = false;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (!(i === 0 && j === 0) && !isEmpty(pixel.x+i,pixel.y+j,true)
					&& !elements[pixel.element].ignore.includes(pixelMap[pixel.x+i][pixel.y+j].element)) {
					if(!elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness || Math.random() > elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"fire");
						change = true;
					}
				}
			}
		}
		if (change && Math.random() < 0.2) {
			changePixel(pixel,"fire");
		}
	},
	reactions: {
		"water": { "elem1": "hydrofluoric_acid", "elem2": null },
		"salt_water": { "elem1": "hydrofluoric_acid", "elem2": null },
		"sugar_water": { "elem1": "hydrofluoric_acid", "elem2": null },
		"dirty_water": { "elem1": "hydrofluoric_acid", "elem2": null },
		"steam": { "elem1": "hydrofluoric_acid_gas", "elem2": null },
		"acid_gas": { "elem1": "hydrofluoric_acid_gas", "elem2": null },
		"neutral_acid": { "elem1": "hydrofluoric_acid", "elem2": null },
		"acid": { "elem1": "hydrofluoric_acid", "elem2": null },
	},
	state: "gas",
	category:"gases",
	density: 1.7,
	stain: 0.005,
	tempLow: -19.5,
	stateLow: "liquid_hydrogen_fluoride",
}

elements.liquid_hydrogen_fluoride = {
	color: "#e2e28d",
	behavior: behaviors.LIQUID,
	ignore: ["liquid_hydrogen_fluoride","liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_acid","hydrofluoric_acid_gas","fire","smoke","acid_gas","neutral_acid","acid","acid_cloud","water","salt_water","sugar_water","dirty_water","steam","gold","hydrogen"],
	tick: function(pixel) {
		let change = false;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (!(i === 0 && j === 0) && !isEmpty(pixel.x+i,pixel.y+j,true)
					&& !elements[pixel.element].ignore.includes(pixelMap[pixel.x+i][pixel.y+j].element)) {
					if(!elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness || Math.random() > elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"fire");
						change = true;
					}
				}
			}
		}
		if (change && Math.random() < 0.2) {
			changePixel(pixel,"fire");
		}
	},
	reactions: {
		"water": { "elem1": "hydrofluoric_acid", "elem2": null },
		"salt_water": { "elem1": "hydrofluoric_acid", "elem2": null },
		"sugar_water": { "elem1": "hydrofluoric_acid", "elem2": null },
		"dirty_water": { "elem1": "hydrofluoric_acid", "elem2": null },
		"steam": { "elem1": "hydrofluoric_acid_gas", "elem2": null },
		"acid_gas": { "elem1": "hydrofluoric_acid_gas", "elem2": null },
		"neutral_acid": { "elem1": "hydrofluoric_acid", "elem2": null },
		"acid": { "elem1": "hydrofluoric_acid", "elem2": null },
	},
	state: "liquid",
	hidden: true,
	density: 1.7,
	stain: 0.005,
	temp: -20.5,
	tempHigh: -19.5,
	stateHigh: "hydrogen_fluoride",
	tempLow: -83.6,
}

elements.FOOF = {
	color: "#fa1e1e",
	behavior: behaviors.LIQUID,
	ignore: ["FOOF","solid_FOOF","fluorine","liquid_fluorine","fluorine_ice","liquid_oxygen","oxygen_ice","oxygen","fire"],
	tick: function(pixel) {
		let change = false;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (!(i === 0 && j === 0) && !isEmpty(pixel.x+i,pixel.y+j,true)
					&& !elements[pixel.element].ignore.includes(pixelMap[pixel.x+i][pixel.y+j].element)) {
					if(!elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness || Math.random() > elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"fire");
						change = true;
					}
				}
			}
		}
		if (change && Math.random() < 0.5) {
			changePixel(pixel,"explosion");
		} else if (Math.random() < 0.0001) {
			if(Math.random() < 0.5) {
				changePixel(pixel,"oxygen");
			} else {
				changePixel(pixel,"fluorine");
			}
		}
	},
	state: "liquid",
	category:"liquids",
	density: 1450,
	stain: 0.01,
	temp: -120,
	tempHigh: -57,
	stateHigh: ["oxygen","fluorine","explosion"],
	tempLow: -154,
	stateLow: "solid_FOOF",
}

elements.solid_FOOF = {
	color: "#fa4a1e",
	behavior: behaviors.WALL,
	ignore: ["FOOF","solid_FOOF","fluorine","liquid_fluorine","fluorine_ice","liquid_oxygen","oxygen_ice","oxygen","fire"],
	tick: function(pixel) {
		let change = false;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (!(i === 0 && j === 0) && !isEmpty(pixel.x+i,pixel.y+j,true)
					&& !elements[pixel.element].ignore.includes(pixelMap[pixel.x+i][pixel.y+j].element)) {
					if(!elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness || Math.random() > elements[pixelMap[pixel.x+i][pixel.y+j].element].hardness) {
						changePixel(pixelMap[pixel.x+i][pixel.y+j],"fire");
						change = true;
					}
				}
			}
		}
		if (change && Math.random() < 0.5) {
			changePixel(pixel,"explosion");
		} else if (Math.random() < 0.00005) {
			if(Math.random() < 0.5) {
				changePixel(pixel,"oxygen");
			} else {
				changePixel(pixel,"fluorine");
			}
		}
	},
	state: "solid",
	category: "solids",
	density: 1450,
	stain: 0.01,
	temp: -160,
	tempHigh: -154,
	stateHigh: "FOOF",
}

if (!elements.acid.ignore) {
	acid.ignore = [];
}
if (!elements.acid_gas.ignore) {
	acid_gas.ignore = [];
}

elements.acid.ignore.push("liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_acid","hydrofluoric_acid_gas");
elements.acid_gas.ignore.push("liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_acid","hydrofluoric_acid_gas");



elements.nitric_oxide = {
	color: "#b8926c",
	behavior: behaviors.GAS,
	reactions: {
		"steam": { "elem1": "smog", "elem2": null, "chance":0.01 },
		"oxygen": { "elem1": "nitrogen_dioxide", "elem2": null},
	},
	tempLow: -152,
	category: "gases",
	state: "gas",
	density: 1.34,
}

elements.liquid_nitric_oxide = {
	tempLow: -164,
	hidden: true,
}

elements.nitrogen_dioxide = {
	color: "#964B00",
	behavior: behaviors.GAS,
	reactions: {
		"steam": { "elem1": "smog", "elem2": null, "chance":0.01 },
		"ammonia": { "elem1": "fertilizer", "elem2": null},
		"blood": { "elem1":null, "elem2":"infection", "chance":0.01 },
		"water": { "elem1":null, "elem2":"dirty_water", "chance":0.01 },
		"plant": { "elem1":null, "elem2":"dead_plant", "chance":0.01 },
		"grass": { "elem1":null, "elem2":"dead_plant", "chance":0.01 },
		"algae": { "elem1":null, "elem2":null, "chance":0.01 },
		"mushroom_spore": { "elem1":null, "elem2":null, "chance":0.01 },
		"lichen": { "elem1":null, "elem2":null, "chance":0.01 },
		"rat": { "elem1":null, "elem2":"rotten_meat", "chance":0.01 },
		"frog": { "elem1":null, "elem2":"rotten_meat", "chance":0.01 },
		"fish": { "elem1":null, "elem2":"rotten_meat", "chance":0.01 },
		"head": { "elem1":null, "elem2":"rotten_meat", "chance":0.01 },
		"body": { "elem1":null, "elem2":"rotten_meat", "chance":0.01 },
		"ant": { "elem1":null, "elem2":null, "chance":0.01 },
		"worm": { "elem1":null, "elem2":null, "chance":0.01 },
		"fly": { "elem1":null, "elem2":null, "chance":0.01 },
		"firefly": { "elem1":null, "elem2":null, "chance":0.01 },
		"bee": { "elem1":null, "elem2":null, "chance":0.01 },
		"slug": { "elem1":null, "elem2":"slime", "chance":0.01 },
		"snail": { "elem1":null, "elem2":"calcium", "chance":0.01 },
		"sapling": { "elem1":null, "elem2":"dead_plant", "chance":0.01 },
		"root": { "elem1":null, "elem2":"dead_plant", "chance":0.01 },
		"flower_seed": { "elem1":null, "elem2":"dead_plant", "chance":0.01 },
		"pistil": { "elem1":null, "elem2":"dead_plant", "chance":0.01 },
		"petal": { "elem1":null, "elem2":"dead_plant", "chance":0.01 },
		"grass_seed": { "elem1":null, "elem2":"dead_plant", "chance":0.01 },
		"meat": { "elem1":null, "elem2":"rotten_meat", "chance":0.01 },
	},
	temp: 30,
	tempLow: 21.15,
	category: "gases",
	state: "gas",
	density: 1.88,
}

elements.liquid_nitrogen_dioxide = {
	tempLow: -9.3,
	hidden: true,
}


elements.fertilizer = {
	color: "#e6c3a1",
	behavior: behaviors.POWDER,
	reactions: {
		"plant": { "elem1":"plant", "chance":0.5 },
		"wheat_seed": { "elem1":"wheat", "chance":0.5 },
		"grass": { "elem1":"grass", "chance":0.5 },
		"grass_seed": { "elem1":"grass", "chance":0.5 },
		"bamboo_plant": { "elem1":"bamboo", "chance":0.5 },
		"flower_seed": { "elem1":"flower_seed", "chance":0.5 },
		"petal": { "elem1":"flower_seed", "chance":0.5 },
		"vine": { "elem1":"vine", "chance":0.5 },
		"sapling": { "elem1":"tree_branch", "chance":0.5 },
		"tree_branch": { "elem1":"tree_branch", "chance":0.5 },
		"corn_seed": { "elem1":"corn", "chance":0.5 },
		"root": { "elem1":"root", "chance":0.5 },
		"dirt": { "elem1":"grass", "chance":0.5 },
		"mud": { "elem1":"grass", "chance":0.5 },
		"potato_seed": { "elem1":"potato", "chance":0.5 },
		"yeast": { "elem1":"yeast", "chance":0.5 },
	},
    tempHigh: 169.6,
	stateHigh: "fire",
	category: "powders",
	state: "solid",
	density: 1725,
}

elements.ammonia.reactions["oxygen"] = { "elem1": "steam", "elem2": "nitric_oxide" }

elements.supernova.behavior = [
	"XX|XX|XX",
	"XX|EX:80>plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,molten_iron,molten_uranium,molten_lead AND CH:neutronium,neutronium,neutronium,liquid_neutronium,quark_matter,void|XX",
	"XX|XX|XX",
]


elements.gamma_ray_burst = {
	color: ["#ffb48f","#ffd991","#ffad91"],
	behavior: [
		"XX|XX|XX",
		"XX|EX:100>plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,molten_uranium,molten_gold,molten_tungsten,molten_lead AND CH:void|XX",
		"XX|XX|XX",
	],
	temp: 99999999700,
	category: "energy",
	state: "gas",
	density: 1000,
	hardness: 1,
	hidden: true,
	excludeRandom: true,
	maxSize: 1,
}


elements.neutronium = {
	color: "#aaffff",
	behavior: [
		"XX|CR:neutron%0.1|XX",
		"CR:neutron%0.1|XX|CR:neutron%0.1",
		"XX|CR:neutron%0.1|XX",
	],
	temp: 1e6,
	tempHigh: 1e7,
	stateHigh: "liquid_neutronium",
	breakInto: "gamma_ray_burst",
	category: "special",
	state: "solid",
	density: 4e17,
	excludeRandom: true,
}



elements.liquid_neutronium = {
	color: "#ffffaa",
	behavior2: [
		"XX|CR:neutron%0.2|XX".split("|"),
		"M1 AND CR:neutron%0.2|XX|M1 AND CR:neutron%0.2".split("|"),
		"M1|M1|M1".split("|"),
	],
	tick: function(pixel) {
		if(
		((!isEmpty(pixel.x+1,pixel.y,false) && 
		(isEmpty(pixel.x+1,pixel.y,true) || pixelMap[pixel.x+1][pixel.y].element !== "liquid_neutronium")) || 
		(!isEmpty(pixel.x-1,pixel.y,false) && 
		(isEmpty(pixel.x-1,pixel.y,true) || pixelMap[pixel.x-1][pixel.y].element !== "liquid_neutronium"))) && 
		!(outOfBounds(pixel.x,pixel.y-1) ||
		!isEmpty(pixel.x,pixel.y-1,true)))
		{
			tryMove(pixel, pixel.x, pixel.y-1);
		}
		else
		{
			pixelTick(pixel,elements.liquid_neutronium.behavior2);
		}
		doDefaults(pixel);
	},
	temp: 2e7,
	tempLow: 1e7,
	stateLow: "neutronium",
	breakInto: "gamma_ray_burst",
	category: "special",
	state: "liquid",
	density: 2e17,
	excludeRandom: true,
}

elements.liquid_helium.behavior2 = [
		"XX|XX|XX".split("|"),
		"M1|XX|M1".split("|"),
		"M1|M1|M1".split("|"),
	];
elements.liquid_helium.behavior = null;

elements.liquid_helium.tick = function(pixel) {
	if(
	((!isEmpty(pixel.x+1,pixel.y,false) && 
	(isEmpty(pixel.x+1,pixel.y,true) || pixelMap[pixel.x+1][pixel.y].element !== "liquid_helium")) || 
	(!isEmpty(pixel.x-1,pixel.y,false) && 
	(isEmpty(pixel.x-1,pixel.y,true) || pixelMap[pixel.x-1][pixel.y].element !== "liquid_helium"))) && 
	!(outOfBounds(pixel.x,pixel.y-1) ||
	!isEmpty(pixel.x,pixel.y-1,true)))
	{
		tryMove(pixel, pixel.x, pixel.y-1);
	}
	else
	{
		pixelTick(pixel,elements.liquid_helium.behavior2);
	}
}


elements.quark_matter = {
	color: ["#ff0000","#00ff00","#0000ff"],
	behavior: [
		"XX|CR:neutron%0.1 AND CR:proton%0.1|XX",
		"M2 AND CR:neutron%0.1 AND CR:proton%0.1|XX|M2 AND CR:neutron%0.1 AND CR:proton%0.1",
		"M1|M1|M1",
	],
	tick: function(pixel) {
		pixel.color = pixelColorPick(pixel);
	},
	tempHigh: 1e8,
	temp: 2e7,
	stateHigh: "gamma_ray_burst",
	breakInto: "gamma_ray_burst",
	category: "special",
	state: "liquid",
	density: 4e18,
	excludeRandom: true,
}
