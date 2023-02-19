elements.fluorine = {
	color: "#FFFFBF",
	behavior: behaviors.GAS,
	ignore: ["FOOF","solid_FOOF","oxygen","liquid_oxygen","oxygen_ice","chlorine","liquid_chlorine","liquid_hydrogen_fluoride","liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_acid","hydrofluoric_ice","hydrofluoric_acid_gas","fire","smoke","acid_gas","neutral_acid","acid","acid_cloud","water","salt_water","sugar_water","dirty_water","steam","gold","hydrogen","polytetrafluoroethylene","molten_polytetrafluoroethylene"],
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
		"neutral_acid": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"liquid_oxygen": { "elem1": "FOOF", "elem2": null },
		"hydrogen": { "elem1": "hydrogen_fluoride", "elem2":null },
	},
	tempLow: -188.1,
	stateLow: "liquid_fluorine",
	state: "gas",
	category:"gases",
	density: 1.7,
	stain: 0.005,
};

elements.liquid_fluorine = {
	color: "#ffff3b",
	behavior: behaviors.LIQUID,
	ignore: ["FOOF","solid_FOOF","oxygen","liquid_oxygen","oxygen_ice","chlorine","liquid_chlorine","liquid_hydrogen_fluoride","liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_acid","hydrofluoric_ice","hydrofluoric_acid_gas","fire","smoke","acid_gas","neutral_acid","acid","acid_cloud","water","salt_water","sugar_water","dirty_water","steam","gold","hydrogen","polytetrafluoroethylene","molten_polytetrafluoroethylene"],
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
		"neutral_acid": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"hydrogen": { "elem1": "hydrogen_fluoride", "elem2":null },
	},
	temp: -198.1,
	tempHigh: -188.1,
	stateHigh: "fluorine",
	tempLow: -219.7,
	state: "liquid",
	category:"liquids",
	density: 1505,
	stain: 0.005,
};

elements.hydrofluoric_acid = {
	color: ["#c8cf91","#efff5e","#a0cc39"],
	ignore: ["fire","liquid_hydrogen_fluoride","liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_acid","hydrofluoric_ice","hydrofluoric_acid_gas","acid_gas","neutral_acid","acid","acid_cloud","water","salt_water","sugar_water","dirty_water","steam","gold","polytetrafluoroethylene","molten_polytetrafluoroethylene","chloroform","chloroform_gas","chloroform_ice","tetrafluoroethylene"],
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
	tempHigh: 100,
	stateHigh: "hydrofluoric_acid_gas",
	tempLow: -58.88,
};


elements.hydrofluoric_acid_gas = {
	color: ["#acb37d","#bfcc4b","#668224"],
	ignore: ["liquid_hydrogen_fluoride","liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_acid","hydrofluoric_ice","hydrofluoric_acid_gas","acid_gas","neutral_acid","acid","acid_cloud","water","salt_water","sugar_water","dirty_water","steam","gold","polytetrafluoroethylene","molten_polytetrafluoroethylene","chloroform","chloroform_gas","chloroform_ice","tetrafluoroethylene"],
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
};

elements.hydrogen_fluoride = {
	color: "#f2f28d",
	behavior: behaviors.GAS,
	ignore: ["liquid_hydrogen_fluoride","liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_ice","hydrofluoric_acid","hydrofluoric_acid_gas","fire","smoke","acid_gas","neutral_acid","acid","acid_cloud","water","salt_water","sugar_water","dirty_water","steam","gold","hydrogen","polytetrafluoroethylene","molten_polytetrafluoroethylene","chloroform","chloroform_gas","chloroform_ice","tetrafluoroethylene"],
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
};

elements.liquid_hydrogen_fluoride = {
	color: "#e2e28d",
	behavior: behaviors.LIQUID,
	ignore: ["liquid_hydrogen_fluoride","liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_acid","hydrofluoric_ice","hydrofluoric_acid_gas","fire","smoke","acid_gas","neutral_acid","acid","acid_cloud","water","salt_water","sugar_water","dirty_water","steam","gold","hydrogen","polytetrafluoroethylene","molten_polytetrafluoroethylene","chloroform","chloroform_gas","chloroform_ice","tetrafluoroethylene"],
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
};

elements.FOOF = {
	color: "#fa1e1e",
	behavior: behaviors.LIQUID,
	ignore: ["FOOF","solid_FOOF","fluorine","liquid_fluorine","fluorine_ice","liquid_oxygen","oxygen_ice","oxygen","fire","polytetrafluoroethylene","molten_polytetrafluoroethylene"],
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
};

elements.solid_FOOF = {
	color: "#fa4a1e",
	behavior: behaviors.WALL,
	ignore: ["FOOF","solid_FOOF","fluorine","liquid_fluorine","fluorine_ice","liquid_oxygen","oxygen_ice","oxygen","fire","polytetrafluoroethylene","molten_polytetrafluoroethylene"],
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
};

if (!elements.acid.ignore) {
	acid.ignore = [];
};
if (!elements.acid_gas.ignore) {
	acid_gas.ignore = [];
};



let defaultAcidReactions = {
	"ash": { "elem1":"neutral_acid", "elem2":null },
	"limestone": { "elem1":"neutral_acid", "elem2":null },
	"quicklime": { "elem1":"neutral_acid", "elem2":null },
	"slaked_lime": { "elem1":"neutral_acid", "elem2":null },
	"borax": { "elem1":"neutral_acid", "elem2":null },
	"ammonia": { "elem1":"neutral_acid", "elem2":null },
	"bleach": { "elem1":"neutral_acid", "elem2":null },
	"water": { "elem1":null, "elem2":"dirty_water" },
	"salt_water": { "elem1":null, "elem2":"water" },
	"sugar_water": { "elem1":null, "elem2":"water" },
	"charcoal": { "elem1":null, "elem2":"carbon_dioxide" },
	"grape": { "elem2":"juice", "color1":"#291824" },
	"soap": { "elem1": "hydrogen" },
	"sodium": { "elem1":"explosion" },
	"meat": { "elem2":"rotten_meat", "elem1":null, "chance":0.5 },
}

let defaultAcidGasReactions = {
	"acid_gas": { "elem1": null, "elem2": "acid_cloud", "chance":0.3, "y":[0,12], "setting":"clouds" },
	"rain_cloud": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
	"cloud": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
	"snow_cloud": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
	"hail_cloud": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
	"pyrocumulus": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
	"fire_cloud": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
	"ash": { "elem1":"hydrogen", "elem2":null, "chance":0.05 },
	"limestone": { "elem1":"hydrogen", "elem2":null, "chance":0.05 },
	"quicklime": { "elem1":"hydrogen", "elem2":null, "chance":0.05 },
	"slaked_lime": { "elem1":"hydrogen", "elem2":null, "chance":0.05 },
	"borax": { "elem1":"hydrogen", "elem2":null, "chance":0.05 },
	"ammonia": { "elem1":"hydrogen", "elem2":null, "chance":0.05 },
	"bleach": { "elem1":"hydrogen", "elem2":null, "chance":0.05 },
	"grape": { "elem2":"juice", "color1":"#291824" },
	"soap": { "elem1": "hydrogen" },
	"sodium": { "elem1":"explosion" },
	"meat": { "elem2":"rotten_meat", "elem1":null, "chance":0.4 },
}

acids = [elements.acid, elements.acid_gas, elements.fluorine, elements.liquid_fluorine, elements.hydrofluoric_acid, elements.hydrofluoric_acid_gas, elements.hydrogen_fluoride, elements.liquid_hydrogen_fluoride];
ignoreAcid = [];

function createAcid(name,reactions, gasReactions, color, colorGas, category, categoryGas, tempHigh, tempLowGas, tempLow, tempHighGas, density, densityGas)
{
	elements[name] = {
		color: color,
		behavior: [
			"XX|DB%5|XX",
			"DB%5 AND M2|XX|DB%5 AND M2",
			"DB%5 AND M2|DB%10 AND M1|DB%5 AND M2",
		],
		ignore: elements.acid.ignore.concat(ignoreAcid),
		reactions: reactions,
		category: category,
        hidden: categoryGas === "hidden",
		tempHigh: tempHigh,
		stateHigh: name + "_gas",
		tempLow: tempLow,
		burn: 30,
		burnTime: 1,
		state: "liquid",
		density: density,
	}
	elements[name+"_gas"] = {
		color: colorGas,
		behavior: [
			"M1|DB%5 AND M1|M1",
			"DB%5 AND M1|XX|DB%5 AND M1",
			"DB%5 AND M1|DB%10 AND M1|DB%5 AND M1",
		],
		ignore: elements.acid_gas.ignore.concat(ignoreAcid),
		reactions: gasReactions,
		category: categoryGas,
        hidden: categoryGas === "hidden",
		tempHigh: tempHighGas,
		stateHigh: "fire",
		tempLow: tempLowGas,
        stateLow: name,
        temp: tempLowGas + 20,
		burn: 30,
		burnTime: 1,
		state: "gas",
		density: densityGas,
	}
    acids.push(elements[name], elements[name+"_gas"]);
    acidIgnore([name, name + "_gas", name + "_ice"]);
}

function acidIgnore(ignore)
{
    for(let i = 0; i < acids.length; i++)
    {
        acids[i].ignore = acids[i].ignore.concat(ignore);
    }
    ignoreAcid = ignoreAcid.concat(ignore);
}

acidIgnore(["acid", "acid_gas", "acid_ice", "liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","liquid_hydrogen_fluoride","hydrogen_fluoride_ice","hydrofluoric_acid_ice","hydrofluoric_acid","hydrofluoric_acid_gas"]);
elements.acid.name = "hydrochloricAcid";
elements.acid_gas.name = "hydrochloricAcidGas";

createAcid("generic_acid",defaultAcidReactions,defaultAcidGasReactions,"#80d488","#9bf4a4","hidden","hidden",110,100,-10,400,1020,1)
elements.generic_acid.name = "acid";
elements.generic_acid_gas.name = "acid_gas";

elements.acid_cloud.behavior = [
                    "XX|XX|XX",
                    "XX|CH:generic_acid%0.05|M1%2.5 AND BO",
                    "XX|XX|XX",
                ];

createAcid("nitric_acid",defaultAcidReactions,defaultAcidGasReactions,["#5ee9c7","#7ac2b1","#7c9f96"],["#78edd2","#8eccbe","#8aa8a1"],"liquids","gases",83,70,-42,400,1500,1.5)

elements.nitric_acid.reactions["ammonia"] = { "elem1": "fertilizer", "elem2": null};

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
};

elements.liquid_nitric_oxide = {
	tempLow: -164,
	hidden: true,
};

elements.nitrogen_dioxide = {
	color: "#964B00",
	behavior: behaviors.GAS,
	reactions: {
		"steam": { "elem1": "smog", "elem2": null, "chance":0.01 },
		"blood": { "elem1":null, "elem2":"infection", "chance":0.01 },
		"water": { "elem1":null, "elem2":"acid", "chance":0.01 },
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
		//clouds
		"rain_cloud": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
		"cloud": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
		"snow_cloud": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
		"hail_cloud": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
		"pyrocumulus": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
		"fire_cloud": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
	},
	temp: 30,
	tempLow: 21.15,
	category: "gases",
	state: "gas",
	density: 1.88,
};

elements.liquid_nitrogen_dioxide = {
	tempLow: -9.3,
	hidden: true,
	reactions: structuredClone(elements.nitrogen_dioxide.reactions),
};

acidIgnore(["nitric_oxide","liquid_nitric_oxide","nitric_oxide_ice","nitrogen_dioxide","liquid_nitrogen_dioxide","nitrogen_dioxide_ice"]);

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
};

elements.ammonia.reactions["oxygen"] = { "elem1": "steam", "elem2": "nitric_oxide" };

elements.supernova.behavior = [
	"XX|XX|XX",
	"XX|EX:80>plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,molten_iron,molten_uranium,molten_lead AND CH:neutronium,neutronium,neutronium,liquid_neutronium,quark_matter,void|XX",
	"XX|XX|XX",
];


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
};


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
	tempLow: 1e5,
	stateLow: ["molten_uranium","molten_gold","molten_tungsten","molten_lead"],
	breakInto: "gamma_ray_burst",
	category: "special",
	state: "solid",
	density: 4e17,
	excludeRandom: true,
};



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
};

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
};


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
};

elements.sulfur.burnInto = ["sulfur_dioxide"];
elements.molten_sulfur.burnInto = ["sulfur_dioxide"];
elements.sulfur_gas.burnInto = ["sulfur_dioxide"];


elements.sulfur_dioxide = {
	color: "#FFF700",
	behavior: behaviors.GAS,
	reactions: {
		"water": { "elem1": "sulfuric_acid", "elem2": null },
		"salt_water": { "elem1": "sulfuric_acid", "elem2": null },
		"sugar_water": { "elem1": "sulfuric_acid", "elem2": null },
		"dirty_water": { "elem1": "sulfuric_acid", "elem2": null },
		"steam": { "elem1": "sulfuric_acid_gas", "elem2": null },
		"acid_gas": { "elem1": "sulfuric_acid_gas", "elem2": null },
		"neutral_acid": { "elem1": "sulfuric_acid", "elem2": null },
		//poison
		"blood": { "elem1":null, "elem2":"infection" },
		"soap": { "elem1":null, "chance":0.02 },
		"plant": { "elem1":null, "elem2":"dead_plant" },
		"grass": { "elem1":null, "elem2":"dead_plant" },
		"vine": { "elem1":null, "elem2":"dead_plant" },
		"algae": { "elem1":null, "elem2":null },
		"mushroom_spore": { "elem1":null, "elem2":null },
		"lichen": { "elem1":null, "elem2":null },
		"yeast": { "elem1":null, "elem2":null },
		"rat": { "elem1":null, "elem2":"rotten_meat" },
		"frog": { "elem1":null, "elem2":"rotten_meat" },
		"tadpole": { "elem2":null },
		"fish": { "elem1":null, "elem2":"rotten_meat" },
		"bird": { "elem1":null, "elem2":"rotten_meat" },
		"head": { "elem1":null, "elem2":"rotten_meat" },
		"body": { "elem1":null, "elem2":"rotten_meat" },
		"ant": { "elem1":null, "elem2":"dead_bug" },
		"worm": { "elem1":null, "elem2":"dead_bug" },
		"fly": { "elem1":null, "elem2":"dead_bug" },
		"firefly": { "elem1":null, "elem2":"dead_bug" },
		"bee": { "elem1":null, "elem2":"dead_bug" },
		"stink_bug": { "elem1":null, "elem2":"dead_bug" },
		"termite": { "elem1":null, "elem2":"dead_bug" },
		"flea": { "elem1":null, "elem2":"dead_bug" },
		"slug": { "elem1":null, "elem2":"slime" },
		"snail": { "elem1":null, "elem2":"calcium" },
		"sapling": { "elem1":null, "elem2":"dead_plant" },
		"root": { "elem1":null, "elem2":"dead_plant" },
		"flower_seed": { "elem1":null, "elem2":"dead_plant" },
		"pistil": { "elem1":null, "elem2":"dead_plant" },
		"petal": { "elem1":null, "elem2":"dead_plant" },
		"grass_seed": { "elem1":null, "elem2":"dead_plant" },
		"meat": { "elem1":null, "elem2":"rotten_meat" },
		//clouds
		"rain_cloud": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
		"cloud": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
		"snow_cloud": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
		"hail_cloud": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
		"pyrocumulus": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
		"fire_cloud": { "elem1": null, "elem2": "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" },
	},
	tempLow: -10,
	stateLow: "liquid_sulfur_dioxide",
	state: "gas",
	category:"gases",
	density: 2.6,
};

elements.liquid_sulfur_dioxide = {
	color: "#d1cb17",
	behavior: behaviors.LIQUID,
	reactions: elements.sulfur_dioxide.reactions,
	tempLow: -72,
	state: "liquid",
	hidden: true,
	density: 1435,
};

acidIgnore(["sulfur_dioxide","liquid_sulfur_dioxide","sulfur_dioxide_ice"]);

createAcid("sulfuric_acid",defaultAcidReactions,defaultAcidGasReactions,["#e9e05e","#c2bd7a","#9e9c7b"],["#ede579","#ccc88f","#a8a68a"],"liquids","gases",337,337,10,500,1830,1.26)

elements.sulfuric_acid.ignore.push("charcoal");
elements.sulfuric_acid_gas.ignore.push("charcoal");
elements.sulfuric_acid.reactions["chocolate"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid.reactions["grape"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid.reactions["juice"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid.reactions["corn"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid.reactions["popcorn"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid.reactions["potato"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid.reactions["bread"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid.reactions["toast"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid.reactions["wheat"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid.reactions["flour"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid.reactions["dough"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid.reactions["sugar"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid.reactions["candy"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
delete elements.sulfuric_acid.reactions["charcoal"];
elements.sulfuric_acid_gas.reactions["chocolate"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid_gas.reactions["grape"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid_gas.reactions["juice"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid_gas.reactions["corn"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid_gas.reactions["popcorn"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid_gas.reactions["potato"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid_gas.reactions["bread"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid_gas.reactions["toast"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid_gas.reactions["wheat"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid_gas.reactions["flour"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid_gas.reactions["dough"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid_gas.reactions["sugar"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
elements.sulfuric_acid_gas.reactions["candy"] = { "elem1": "charcoal", "elem2": "steam", "temp2": 200};
delete elements.sulfuric_acid_gas.reactions["charcoal"];

elements.polytetrafluoroethylene = {
	color: "#efefef",
	behavior: behaviors.WALL,
	properties: {
		colored: false
	},
	tick: function(pixel) {
		if(!pixel.colored)
		{
			let rgb = elements.polytetrafluoroethylene.colorObject; 
			
			let coloroffset = Math.floor(Math.random() * (Math.random() > 0.5 ? -1 : 1) * Math.random() * 2);
			let r = rgb.r + coloroffset;
			let g = rgb.g + coloroffset;
			let b = rgb.b + coloroffset;
			pixel.color = "rgb("+r+","+g+","+b+")";
			pixel.colored = true;
			pixel.origColor = pixel.color;
		}
		if (pixel.origColor != pixel.color) {
			pixel.color = pixel.origColor;
		}
	},
	state: "solid",
	category: "solids",
	density: 1450,
	tempHigh: 327,
}
acidIgnore(["polytetrafluoroethylene", "molten_polytetrafluoroethylene", "tetrafluoroethylene"]);


function doStaining(pixel) {
            if (settings["stainoff"]) { return }
            var stain = elements[pixel.element].stain;
            if (stain > 0) {
                var newColor = pixel.color.match(/\d+/g);
            }
            else {
                var newColor = null;
            }

            for (var i = 0; i < adjacentCoords.length; i++) {
                var x = pixel.x+adjacentCoords[i][0];
                var y = pixel.y+adjacentCoords[i][1];
                if (!isEmpty(x,y,true)) {
                    var newPixel = pixelMap[x][y];
                    if ((elements[pixel.element].ignore && elements[pixel.element].ignore.indexOf(newPixel.element) !== -1) || newPixel.element == "polytetrafluoroethylene") {
                        continue;
                    }
                    if ((elements[newPixel.element].id !== elements[pixel.element].id || elements[newPixel.element].stainSelf) && (solidStates[elements[newPixel.element].state] || elements[newPixel.element].id === elements[pixel.element].id)) {
                        if (Math.random() < Math.abs(stain)) {
                            if (stain < 0) {
                                if (newPixel.origColor) {
                                    newColor = newPixel.origColor;
                                }
                                else { continue; }
                            }
                            else if (!newPixel.origColor) {
                                newPixel.origColor = newPixel.color.match(/\d+/g);
                            }
                            // if newPixel.color doesn't start with rgb, continue
                            if (!newPixel.color.match(/^rgb/)) { continue; }
                            // parse rgb color string of newPixel rgb(r,g,b)
                            var rgb = newPixel.color.match(/\d+/g);
                            if (elements[pixel.element].stainSelf && elements[newPixel.element].id === elements[pixel.element].id) {
                                // if rgb and newColor are the same, continue
                                if (rgb[0] === newColor[0] && rgb[1] === newColor[1] && rgb[2] === newColor[2]) { continue; }
                                var avg = [];
                                for (var j = 0; j < rgb.length; j++) {
                                    avg[j] = Math.round((rgb[j]*(1-Math.abs(stain))) + (newColor[j]*Math.abs(stain)));
                                }
                            }
                            else {
                                // get the average of rgb and newColor, more intense as stain reaches 1 
                                var avg = [];
                                for (var j = 0; j < rgb.length; j++) {
                                    avg[j] = Math.floor((rgb[j]*(1-Math.abs(stain))) + (newColor[j]*Math.abs(stain)));
                                }
                            }
                            // set newPixel color to avg
                            newPixel.color = "rgb("+avg.join(",")+")";
                        }
                    }
                }
            }
        }
elements["bleach"].reactions.vinegar = { "elem1":"chlorine", "elem2":null };
elements["bleach"].reactions.alcohol = { "elem1":"chloroform", "elem2":null };
elements["chlorine"].reactions.methane = { "elem1":"chloroform", "elem2":null };

elements.chloroform = {
	color: "#7f7f7f",
	behavior: behaviors.LIQUID,
    reactions: elements.poison.reactions,
	state: "liquid",
	category: "liquids",
	density: 1564,
    tempLow: -63,
	tempHigh: 61,
}

elements.chloroform_gas = {
	color: "#8f8f8f",
	behavior: behaviors.GAS,
    reactions: elements.poison.reactions,
	state: "gas",
    hidden: true,
	density: 4.12,
    tempLow: 61,
    stateLow: "chloroform"
}

elements["chloroform_gas"].reactions.hydrogen_fluoride = { "elem1":"tetrafluoroethylene", "elem2": null, tempMin: 550 };


elements.tetrafluoroethylene = {
	color: "#8f8f8f",
	behavior: behaviors.GAS,
    reactions: {
        "oxygen": { "elem1":"fire", "elem2":"fire" },
        "sulfuric_acid": { "elem1":"polytetrafluoroethylene", "elem2":"sulfuric_acid", "chance":0.25 },
        "sulfuric_acid_gas": { "elem1":"polytetrafluoroethylene", "elem2":"sulfuric_acid_gas", "chance":0.25 },
    },
	state: "gas",
    hidden: true,
    burn: 100,
    burnTime: 2,
	density: 1.52,
}





elements.polyethylene = {
	color: "#a7a7a7",
	behavior: behaviors.WALL,
	properties: {
		colored: false
	},
	tick: function(pixel) {
		if(!pixel.colored)
		{
			let rgb = elements.polyethylene.colorObject; 
			
			let coloroffset = Math.floor(Math.random() * (Math.random() > 0.5 ? -1 : 1) * Math.random() * 2);
			let r = rgb.r + coloroffset;
			let g = rgb.g + coloroffset;
			let b = rgb.b + coloroffset;
			pixel.color = "rgb("+r+","+g+","+b+")";
			pixel.colored = true;
			pixel.origColor = pixel.color;
		}
	},
	state: "solid",
	category: "solids",
	density: 1450,
	tempHigh: 125,
}


elements.ethane = {
    color: "#afafaf",
    behavior: behaviors.GAS,
    reactions: {
        "steam": { "elem1":"hydrogen", "elem2":"ethylene", "chance":0.01 },
        "chlorine": { "elem1":"chloroethane", "elem2": null }
    },
    category: "gases",
    tempHigh: 400,
    stateHigh: "fire",
    tempLow: -88.5,
    burn: 85,
    burnTime: 5,
    fireColor: ["#00ffff","#00ffdd"],
    state: "gas",
    density: 1.356,
};

elements.chloroethane = {
    color: "#afdfaf",
    behavior: behaviors.GAS,
    reactions: {
        "aluminum": { "elem1":"diethylaluminium_chloride", "elem2": null, "chance":0.1 }
    },
    category: "gases",
    tempHigh: 510,
    stateHigh: "fire",
    tempLow: 12.27,
    burn: 85,
    burnTime: 5,
    fireColor: ["#00ffff","#00ffdd"],
    state: "gas",
    density: 2.879,
};

elements.diethylaluminium_chloride = {
    color: "#7faf7f",
    behavior: behaviors.LIQUID,
    category: "hidden",
    hidden: true,
    tempHigh: 125,
    stateHigh: "fire",
    tempLow: -74,
    burn: 85,
    burnTime: 10,
    state: "liquid",
    density: 2.879,
};

elements.ethylene = {
    color: "#a7a7a7",
    behavior: behaviors.GAS,
    reactions: {
        "titanium_trichloride": { "elem1":"polyethylene", "elem2":"titanium_trichloride", "chance":0.1 },
        "diethylaluminium_chloride": { "elem1":"polyethylene", "elem2":"diethylaluminium_chloride", "chance":0.1 },
    },
    category: "gases",
    tempHigh: 400,
    stateHigh: "fire",
    tempLow: -103.7,
    burn: 85,
    burnTime: 5,
    fireColor: ["#00ffff","#00ffdd"],
    state: "gas",
    density: 1.356,
};



elements.titanium = {
    color: "#e3e5e6",
    category: "solids",
    density: 4500,
    state: "solid",
    behavior: behaviors.WALL,
    reactions: {
        "acid": { "elem1": "titanium_trichloride", "elem2": null, "elem2":null },
    },
    stateHigh: "molten_titanium",
    tempHigh: 1668,
    conduct: 0.5,
    hardness: 0.7,
};
elements.molten_titanium = {
    density: 4500,
    color: ["#e0921d", "#e89e2e", "#f7b24a", "#fce168", "#fceca2", "#fffcf0"],
    hidden: true,
    state: "liquid",
    behavior: behaviors.LIQUID,
    stateLow: "titanium",
    tempLow: 1668,
    temp: 2000,
    viscosity: 10000
};

elements.rutile = {
    color: "#522614",
    behavior: behaviors.POWDER,
    category: "land",
    density: 4240,
    state: "solid",
    tempHigh: 1843,
    stateHigh: "molten_rutile",
};
elements.molten_rutile = {
    color: ["#e3907f", "#e68f3e"],
    behavior: behaviors.LIQUID,
    hidden: true,
    reactions: {
        "chlorine": { "elem1": "titanium_tetrachloride", "elem2":null },
    },
    density: 4230,
    state: "liquid",
    temp: 2000,
    tempLow: 1843,
    stateLow: "rutile",
    viscosity: 10000
    };
elements.titanium_tetrachloride = {
    color: "#d9d7b2",
    behavior: behaviors.LIQUID,
    category: "liquids",
    density: 1728,
    state: "liquid",
    tempHigh: 136.4,
    stateHigh: "titanium_tetrachloride_gas",
    tempLow: -24,
    stateLow: "titanium_tetrachloride_crystal",
};
elements.titanium_tetrachloride_gas = {
    color: "#e8edd5",
    behavior: behaviors.GAS,
    hidden: true,
    density: 500,
    state: "gas",
    temp: 200,
    tempLow: 136.4,
    stateLow: "titanium_tetrachloride"
};
elements.titanium_tetrachloride_crystal = {
    color: "#f5fffe",
    behavior: behaviors.WALL,
    hidden: true,
    density: 1728,
    state: "solid",
    temp: -50,
    tempHigh: -24,
    stateHigh: "titanium_tetrachloride"
};


elements.titanium_trichloride = {
    color: "#c71585",
    behavior: behaviors.SOLID,
    category: "solids",
    density: 2640,
    state: "solid",
};

//todo: magnesium for titanium production

elements.magnesium = {
    color: "#dddce6",
    category: "solids",
    state: "solid",
    density: 1738,
    behavior: behaviors.WALL,
    tick: function(pixel) {
        if (pixel.burning) {
            if(pixel.temp < 2200) {
                pixel.temp += 10;
            }
        }
    },
    stateHigh: "molten_magnesium",
    tempHigh: 650,
    conduct: 0.3,
    burn: 1,
    burnTime: 300,
    fireColor: ["#ffffff"],
    burnInto: "magnesium_oxide",
    hardness: 0.5,
};
elements.molten_magnesium = {
    density: 1738,
    color: ["#cc9c7c", "#ebb896", "#f5bb95", "#f7cd9c", "#fcd2a2", "#fff8f0"],
    hidden: true,
    state: "liquid",
    behavior: behaviors.LIQUID,
    reactions: {
        "titanium_tetrachloride": { "elem1": "titanium", "elem2": "magnesium_chloride"},
        "titanium_tetrachloride_gas": { "elem1": "titanium", "elem2": "magnesium_chloride"},
    },
    tick: function(pixel) {
        if (pixel.burning) {
            if(pixel.temp < 2200) {
                pixel.temp += 10;
            }
        }
    },
    stateLow: "magnesium",
    tempLow: 650,
    temp: 1000,
    viscosity: 10000,
    burn: 1,
    conduct: 0.3,
    burnTime: 300,
    fireColor: ["#ffffff"],
    burnInto: "magnesium_oxide",
};


elements.magnesium_oxide = {
    color: "#f0f0f0",
    behavior: behaviors.POWDER,
    reactions: {
        "quicklime": { "elem1": "cement", "elem2": null},
    },
    category: "solids",
    density: 3600,
    state: "solid",
    tempHigh: 2852,
};


elements.magnesium_chloride = {
    color: "#bfbfbf",
    behavior: behaviors.POWDER,
    category: "solids",
    density: 2640,
    state: "solid",
    tempHigh: 714,
    stateHigh: "molten_magnesium_chloride",
};

elements.molten_magnesium_chloride = {
    color: "#bfbfbf",
    behavior: behaviors.MOLTEN,
    behaviorOn: [
        "XX|CR:fire%2.5|XX",
        "M2|CH:chlorine,magnesium%25|M2",
        "M1|M1|M1",
    ],
    reactions: {
        "quicklime": { "elem1": "cement", "elem2": null},
    },
    hidden: true,
    temp: 750,
    density: 2620,
    state: "liquid",
    conduct: 0.3,
};

