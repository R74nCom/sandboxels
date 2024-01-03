function acidReact(acid,element,product1,product2,temp)
{
	if(product1 !== null)
        elements[acid].ignore.push(product1);
	if(product2 !== null)
        elements[acid].ignore.push(product2);
    elements[acid].ignore.push(element);
	elements[acid].reactions[element] = { "elem1": product1, "elem2": product2, "temp1": temp, "temp2": temp };
}

elements.fluorine = {
	color: "#FFFFBF",
	behavior: behaviors.GAS,
	ignore: ["FOOF","solid_FOOF","oxygen","liquid_oxygen","oxygen_ice","chlorine","liquid_chlorine","liquid_hydrogen_fluoride","liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_acid","hydrofluoric_ice","hydrofluoric_acid_gas","fire","smoke","acid_gas","neutral_acid","acid","acid_cloud","water","salt_water","sugar_water","dirty_water","steam","gold","hydrogen","polytetrafluoroethylene","molten_polytetrafluoroethylene","tungsten","tungsten_hexafluoride"],
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
		"seltzer": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"pool_water": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"primordial_soup": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"neutral_acid": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"liquid_oxygen": { "elem1": "FOOF", "elem2": null },
		"hydrogen": { "elem1": "hydrogen_fluoride", "elem2":"fire" },
		"tungsten": { "elem1": "tungsten_hexafluoride", "elem2": "fire" },
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
	ignore: ["FOOF","solid_FOOF","oxygen","liquid_oxygen","oxygen_ice","chlorine","liquid_chlorine","liquid_hydrogen_fluoride","liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_acid","hydrofluoric_ice","hydrofluoric_acid_gas","fire","smoke","acid_gas","neutral_acid","acid","acid_cloud","water","salt_water","sugar_water","dirty_water","steam","seltzer","pool_water","primordial_soup","gold","hydrogen","polytetrafluoroethylene","molten_polytetrafluoroethylene","tungsten","tungsten_hexafluoride"],
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
		"seltzer": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"pool_water": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"primordial_soup": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"neutral_acid": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"neutral_acid": { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" },
		"hydrogen": { "elem1": "hydrogen_fluoride", "elem2": "fire" },
		"tungsten": { "elem1": "tungsten_hexafluoride", "elem2": "fire" },
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
	ignore: ["fire","liquid_hydrogen_fluoride","liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_acid","hydrofluoric_ice","hydrofluoric_acid_gas","acid_gas","neutral_acid","acid","acid_cloud","water","salt_water","sugar_water","dirty_water","steam","seltzer","pool_water","primordial_soup","gold","polytetrafluoroethylene","molten_polytetrafluoroethylene","chloroform","chloroform_gas","chloroform_ice","tetrafluoroethylene","tungsten","tungsten_hexafluoride"],
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
		"water": { "elem2": "dirty_water" },
		"salt_water": { "elem2": "dirty_water" },
		"sugar_water": { "elem2": "dirty_water" },
		"seltzer": { "elem2": "dirty_water" },
		"pool_water": { "elem2": "dirty_water" },
		"primordial_soup": { "elem2": "dirty_water" },
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
	ignore: ["liquid_hydrogen_fluoride","liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_acid","hydrofluoric_ice","hydrofluoric_acid_gas","acid_gas","neutral_acid","acid","acid_cloud","water","salt_water","sugar_water","dirty_water","steam","gold","polytetrafluoroethylene","molten_polytetrafluoroethylene","chloroform","chloroform_gas","chloroform_ice","tetrafluoroethylene","tungsten","tungsten_hexafluoride"],
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
		"water": { "elem2": "dirty_water" },
		"salt_water": { "elem2": "dirty_water" },
		"sugar_water": { "elem2": "dirty_water" },
		"seltzer": { "elem2": "dirty_water" },
		"pool_water": { "elem2": "dirty_water" },
		"primordial_soup": { "elem2": "dirty_water" },
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
		"seltzer": { "elem1": "hydrofluoric_acid", "elem2": null },
		"pool_water": { "elem1": "hydrofluoric_acid", "elem2": null },
		"primordial_soup": { "elem1": "hydrofluoric_acid", "elem2": null },
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
		if (change && Math.random() < 0.01) {
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
		if (change && Math.random() < 0.01) {
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


elements.tungsten_hexafluoride = {
	color: "#f5f57a",
	behavior: behaviors.GAS,
	reactions: {
		"water": { "elem1": "hydrofluoric_acid", "elem2": "tungsten" },
		"salt_water": { "elem1": "hydrofluoric_acid", "elem2": "tungsten" },
		"sugar_water": { "elem1": "hydrofluoric_acid", "elem2": "tungsten" },
		"dirty_water": { "elem1": "hydrofluoric_acid", "elem2": "tungsten" },
		"steam": { "elem1": "hydrofluoric_acid_gas", "elem2": "tungsten" },
		"seltzer": { "elem1": "hydrofluoric_acid_gas", "elem2": "tungsten" },
		"pool_water": { "elem1": "hydrofluoric_acid_gas", "elem2": "tungsten" },
		"primordial_soup": { "elem1": "hydrofluoric_acid_gas", "elem2": "tungsten" },
		"neutral_acid": { "elem1": "hydrofluoric_acid", "elem2": "tungsten" },
	},
	tempLow: 17.1,
	state: "gas",
	category:"gases",
	density: 12.4,
	stain: 0.005,
};

elements.liquid_tungsten_hexafluoride = {
	density: 4560,
	tempLow: 2.3,
};

if (!elements.acid.ignore) {
	elements.acid.ignore = [];
};
if (!elements.acid_gas.ignore) {
	elements.acid_gas.ignore = [];
};
defaultAcidIgnore = structuredClone(elements.acid.ignore);
defaultAcidGasIgnore = structuredClone(elements.acid_gas.ignore);



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
	"potassium": { "elem1":"explosion" },
	"meat": { "elem2":"rotten_meat", "elem1":null, "chance":0.5 },
};

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
};

acids = [elements.acid, elements.acid_gas, elements.fluorine, elements.liquid_fluorine, elements.hydrofluoric_acid, elements.hydrofluoric_acid_gas, elements.hydrogen_fluoride, elements.liquid_hydrogen_fluoride];
ignoreAcid = [];
trueAcids = ["acid", "hydrofluoric_acid"];
trueAcidGases = ["acid_gas", "hydrofluoric_acid_gas"];


if (enabledMods.includes("mods/generative_mods.js")) {
runAfterLoad(function() {
    generateCloud("hydrofluoric_acid");
    elements["hydrofluoric_acid_gas"].reactions["hydrofluoric_acid_gas"]= { "elem1": null, "elem2": "hydrofluoric_acid_cloud", "chance":0.3, "y":[0,12], "setting":"clouds" };
    elements["hydrofluoric_acid_gas"].reactions["rain_cloud"]= { "elem1": null, "elem2":  "hydrofluoric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["hydrofluoric_acid_gas"].reactions["cloud"]= { "elem1": null, "elem2":  "hydrofluoric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["hydrofluoric_acid_gas"].reactions["snow_cloud"]= { "elem1": null, "elem2":  "hydrofluoric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["hydrofluoric_acid_gas"].reactions["hail_cloud"]= { "elem1": null, "elem2":  "hydrofluoric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["hydrofluoric_acid_gas"].reactions["pyrocumulus"]= { "elem1": null, "elem2":  "hydrofluoric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["hydrofluoric_acid_gas"].reactions["fire_cloud"]= { "elem1": null, "elem2":  "hydrofluoric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    
    elements["cloud"].reactions["anesthesia"] = { elem1:"nitric_acid_cloud", elem2:null, chance:0.05 };
    elements["rain_cloud"].reactions["anesthesia"] = { elem1:"nitric_acid_cloud", elem2:null, chance:0.05 };
    
});
}
function createAcid(name,reactions, gasReactions, color, categoryhidden, categoryhiddenGas, tempHigh, tempLowGas, tempLow, tempHighGas, density, densityGas)
{
	elements[name] = {
        forceAutoGen: true,
		color: color,
		behavior: [
			"XX|DB%5|XX",
			"DB%5 AND M2|XX|DB%5 AND M2",
			"DB%5 AND M2|DB%10 AND M1|DB%5 AND M2",
		],
		ignore: defaultAcidIgnore.concat(ignoreAcid),
		reactions: reactions,
		category: "liquids",
        hidden: categoryhidden,
		tempHigh: tempHigh,
		stateHigh: name + "_gas",
		tempLow: tempLow,
		burn: 30,
		burnTime: 1,
		state: "liquid",
		density: density
	}
	elements[name+"_gas"] = {
		behavior: [
			"M1|DB%5 AND M1|M1",
			"DB%5 AND M1|XX|DB%5 AND M1",
			"DB%5 AND M1|DB%10 AND M1|DB%5 AND M1",
		],
		ignore: defaultAcidGasIgnore.concat(ignoreAcid),
		reactions: gasReactions,
		category: "gases",
        hidden: categoryhiddenGas,
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
    elements.bless.reactions[name] = { elem2: "hydrogen" };
    elements.bless.reactions[name+"_gas"] = { elem2: "hydrogen" };
    if (enabledMods.includes("mods/generative_mods.js")) {
		runAfterLoad(function() {
        generateCloud(name);
        elements[name+"_gas"].reactions[name+"_gas"]= { "elem1": null, "elem2": name + "_cloud", "chance":0.3, "y":[0,12], "setting":"clouds" };
        elements[name+"_gas"].reactions["rain_cloud"]= { "elem1": null, "elem2":  name + "_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
        elements[name+"_gas"].reactions["cloud"]= { "elem1": null, "elem2":  name + "_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
        elements[name+"_gas"].reactions["snow_cloud"]= { "elem1": null, "elem2":  name + "_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
        elements[name+"_gas"].reactions["hail_cloud"]= { "elem1": null, "elem2":  name + "_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
        elements[name+"_gas"].reactions["pyrocumulus"]= { "elem1": null, "elem2":  name + "_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
        elements[name+"_gas"].reactions["fire_cloud"]= { "elem1": null, "elem2":  name + "_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    });
	}
    else
    {
        elements[name+"_gas"].reactions[name+"_gas"]= { "elem1": null, "elem2": "acid_cloud", "chance":0.3, "y":[0,12], "setting":"clouds" };
    }
    acids.push(elements[name], elements[name+"_gas"]);
    acidIgnore([name, name + "_gas", name + "_ice", name + "_cloud"]);
}

function acidIgnore(ignore)
{
    for(let i = 0; i < acids.length; i++)
    {
        acids[i].ignore = acids[i].ignore.concat(ignore);
    }
    ignoreAcid = ignoreAcid.concat(ignore);
}


acidIgnore(["acid", "acid_gas", "acid_ice", "liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","liquid_hydrogen_fluoride","hydrogen_fluoride_ice","hydrofluoric_acid_ice","hydrofluoric_acid","hydrofluoric_acid_gas","hydrofluoric_acid_cloud","acid_cloud"]);
elements.acid.name = "hydrochloricAcid";
elements.acid_gas.name = "hydrochloricAcidGas";

createAcid("generic_acid",defaultAcidReactions,defaultAcidGasReactions,"#80d488",true,true,110,100,-10,400,1020,1)
elements.generic_acid.name = "acid";
elements.generic_acid_gas.name = "acid_gas";

trueAcids.push("generic_acid")
trueAcidGases.push("generic_acid_gas");

if (!enabledMods.includes("mods/generative_mods.js")) {
    elements.acid_cloud.behavior = [
                        "XX|XX|XX",
                        "XX|CH:generic_acid%0.05|M1%2.5 AND BO",
                        "XX|XX|XX",
                    ];
}

createAcid("nitric_acid",structuredClone(defaultAcidReactions),structuredClone(defaultAcidGasReactions),["#91993c","#6b7041","#5f614b"],false,false,83,70,-42,400,1500,1.5)

acidReact("nitric_acid","ammonia","fertilizer",null,0);
acidReact("nitric_acid_gas","ammonia","fertilizer",null,0);

trueAcids.push("nitric_acid")
trueAcidGases.push("nitric_acid_gas");

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
		"water": { "elem1":null, "elem2":"nitric_acid", "chance":0.01 },
		"dirty_water": { "elem1":null, "elem2":"nitric_acid", "chance":0.01 },
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
		"meat": { "elem1":null, "elem2":"rotten_meat", "chance":0.01 }
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

if (enabledMods.includes("mods/generative_mods.js")) {
    elements["nitrogen_dioxide"].reactions["rain_cloud"]= { "elem1": null, "elem2":  "nitric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["nitrogen_dioxide"].reactions["cloud"]= { "elem1": null, "elem2":  "nitric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["nitrogen_dioxide"].reactions["snow_cloud"]= { "elem1": null, "elem2":  "nitric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["nitrogen_dioxide"].reactions["hail_cloud"]= { "elem1": null, "elem2":  "nitric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["nitrogen_dioxide"].reactions["pyrocumulus"]= { "elem1": null, "elem2":  "nitric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["nitrogen_dioxide"].reactions["fire_cloud"]= { "elem1": null, "elem2":  "nitric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["nitrogen_dioxide"].reactions["thunder_cloud"]= { "elem1": null, "elem2":  "nitric_acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
}
else
{
    elements["nitrogen_dioxide"].reactions["rain_cloud"]= { "elem1": null, "elem2":  "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["nitrogen_dioxide"].reactions["cloud"]= { "elem1": null, "elem2":  "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["nitrogen_dioxide"].reactions["snow_cloud"]= { "elem1": null, "elem2":  "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["nitrogen_dioxide"].reactions["hail_cloud"]= { "elem1": null, "elem2":  "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["nitrogen_dioxide"].reactions["pyrocumulus"]= { "elem1": null, "elem2":  "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["nitrogen_dioxide"].reactions["fire_cloud"]= { "elem1": null, "elem2":  "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
    elements["nitrogen_dioxide"].reactions["thunder_cloud"]= { "elem1": null, "elem2":  "acid_cloud", "chance":0.4, "y":[0,12], "setting":"clouds" };
}

acidIgnore(["nitric_oxide","liquid_nitric_oxide","nitric_oxide_ice","nitrogen_dioxide","liquid_nitrogen_dioxide","nitrogen_dioxide_ice"]);

elements.fertilizer = {
	color: "#e6c3a1",
	behavior: behaviors.POWDER,
	reactions: {
		"plant": { "elem1":"plant", "chance":0.05 },
		"wheat_seed": { "elem1":"wheat", "chance":0.05 },
		"grass": { "elem1":"grass", "chance":0.05 },
		"grass_seed": { "elem1":"grass", "chance":0.05 },
		"bamboo_plant": { "elem1":"bamboo", "chance":0.05 },
		"flower_seed": { "elem1":"flower_seed", "chance":0.05 },
		"petal": { "elem1":"flower_seed", "chance":0.05 },
		"vine": { "elem1":"vine", "chance":0.05 },
		"sapling": { "elem1":"tree_branch", "chance":0.05 },
		"tree_branch": { "elem1":"tree_branch", "chance":0.05 },
		"corn_seed": { "elem1":"corn", "chance":0.05 },
		"root": { "elem1":"root", "chance":0.05 },
		"dirt": { "elem1":"grass", "chance":0.05 },
		"mud": { "elem1":"grass", "chance":0.05 },
		"potato_seed": { "elem1":"potato", "chance":0.05 },
		"yeast": { "elem1":"yeast", "chance":0.05 },
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
	"XX|EX:80>plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,molten_iron,molten_uranium,molten_lead,oxygen,molten_sodium,sulfur_gas,fluorine,neon,molten_potassium,chlorine,molten_calcium,molten_titanium,molten_nickel,molten_copper,molten_zinc,gallium_gas,bromine_gas,iodine_gas AND CH:neutronium,neutronium,quark_matter,void|XX",
	"XX|XX|XX",
];


elements.gamma_ray_burst = {
	color: ["#ffb48f","#ffd991","#ffad91"],
	behavior: [
		"XX|XX|XX",
		"XX|EX:100>plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,molten_gold,molten_uranium,molten_lead,molten_tungsten,molten_nickel,molten_copper,molten_zinc,gallium_gas,bromine_gas,iodine_gas,molten_tin,molten_silver AND CH:void|XX",
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
	breakInto: ["gamma_ray_burst","supernova","supernova"],
	category: "special",
	state: "solid",
	density: 4e17,
	hardness: 0.999,
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
        ((!isEmpty(pixel.x-1,pixel.y,false) && 
        (isEmpty(pixel.x-1,pixel.y,true) || pixelMap[pixel.x-1][pixel.y].element !== "liquid_neutronium"))) && 
        !(outOfBounds(pixel.x-1,pixel.y-1) ||
        !isEmpty(pixel.x-1,pixel.y-1,true)))
        {
            tryMove(pixel, pixel.x-1, pixel.y-1);
        }
        else if(
        ((!isEmpty(pixel.x+1,pixel.y,false) && 
        (isEmpty(pixel.x+1,pixel.y,true) || pixelMap[pixel.x+1][pixel.y].element !== "liquid_neutronium"))) && 
        !(outOfBounds(pixel.x+1,pixel.y-1) ||
        !isEmpty(pixel.x+1,pixel.y-1,true)))
        {
            tryMove(pixel, pixel.x+1, pixel.y-1);
        }
		else if(
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
	breakInto: ["gamma_ray_burst","supernova","supernova"],
	category: "special",
	state: "liquid",
	density: 2e17,
	hardness: 0.999,
	excludeRandom: true,
};

elements.liquid_helium.behavior2 = [
		"XX|XX|XX".split("|"),
		"M1|XX|M1".split("|"),
		"M1|M1|M1".split("|"),
	];
elements.liquid_helium.behavior = null;

elements.liquid_helium.tick = function(pixel) {
    if(Math.random() < 0.9)
    {
        if(
        ((!isEmpty(pixel.x-1,pixel.y,false) && 
        (isEmpty(pixel.x-1,pixel.y,true) || pixelMap[pixel.x-1][pixel.y].element !== "liquid_helium"))) && 
        !(outOfBounds(pixel.x-1,pixel.y-1) ||
        !isEmpty(pixel.x-1,pixel.y-1,true)))
        {
            tryMove(pixel, pixel.x-1, pixel.y-1);
        }
        else if(
        ((!isEmpty(pixel.x+1,pixel.y,false) && 
        (isEmpty(pixel.x+1,pixel.y,true) || pixelMap[pixel.x+1][pixel.y].element !== "liquid_helium"))) && 
        !(outOfBounds(pixel.x+1,pixel.y-1) ||
        !isEmpty(pixel.x+1,pixel.y-1,true)))
        {
            tryMove(pixel, pixel.x+1, pixel.y-1);
        }
        else if(
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
    else 
    {
        pixelTick(pixel,elements.liquid_helium.behavior2);
    }
	doDefaults(pixel);
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
	temp: 2e7,
	breakInto: "gamma_ray_burst",
	category: "special",
	state: "liquid",
	density: 4e18,
	hardness: 0.999,
	excludeRandom: true,
};

elements.sulfur.burnInto = ["sulfur_dioxide"];
elements.molten_sulfur.burnInto = ["sulfur_dioxide"];
elements.sulfur_gas.burnInto = ["sulfur_dioxide"];
elements.sulfur.reactions["hydrogen"] = { "elem1": "hydrogen_sulfide", "elem2": null};

elements.sulfur_dioxide = {
	color: "#FFF700",
	behavior: behaviors.GAS,
	reactions: {
		"water": { "elem1": null, "elem2": "sulfuric_acid" },
		"salt_water": { "elem1": null, "elem2": "sulfuric_acid" },
		"sugar_water": { "elem1": null, "elem2": "sulfuric_acid" },
		"dirty_water": { "elem1": null, "elem2": "sulfuric_acid" },
		"steam": { "elem1": null, "elem2": "sulfuric_acid_gas" },
		"acid_gas": { "elem1": null, "elem2": "sulfuric_acid_gas" },
		"neutral_acid": { "elem1": null, "elem2": "sulfuric_acid" },
		"seltzer": { "elem1": null, "elem2": "sulfuric_acid" },
		"pool_water": { "elem1": null, "elem2": "sulfuric_acid" },
		"primordial_soup": { "elem1": null, "elem2": "sulfuric_acid" },
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

elements.hydrogen_sulfide = {
    color: "#d9e366",
    behavior: behaviors.GAS,
    reactions: {
        "oxygen": { "elem2":"stench" },
        "water": { "elem1":null, "elem2":"dirty_water" },
		"salt_water": { "elem1":null, "elem2":"dirty_water" },
		"sugar_water": { "elem1":null, "elem2":"dirty_water" },
		"dirty_water": { "elem1":null, "elem2":"dirty_water" },
		"acid_gas": { "elem1":null, "elem2":"dirty_water" },
		"neutral_acid": { "elem1":null, "elem2":"dirty_water" },
		"seltzer": { "elem1":null, "elem2":"dirty_water" },
		"pool_water": { "elem1":null, "elem2":"dirty_water" },
		"primordial_soup": { "elem1":null, "elem2":"dirty_water" },
        "nitrogen": { "elem2":"stench" },
        "baking_soda": { "elem1":null }
    },
    category: "gases",
    tempHigh: 1000,
    stateHigh: "fire",
    state: "gas",
    density: 1.539,
    tempLow: -59.55,
    burn: 1,
    burnTime: 10,
    burnInto: ["sulfur_dioxide","steam"],
    fireColor: ["#8180CC","#7F84E6"],
}

acidIgnore(["sulfur_dioxide","liquid_sulfur_dioxide","sulfur_dioxide_ice"]);

elements.acid.ignore.push("liquid_hydrogen_sulfide");
elements.acid_gas.ignore.push("liquid_hydrogen_sulfide");

acidReact("acid","pyrite","iron_chloride","hydrogen_sulfide",50);
acidReact("acid_gas","pyrite","iron_chloride","hydrogen_sulfide",50);

elements.iron_chloride = {
    color: ["#207d09","#b51259"],
    behavior: behaviors.POWDER,
    reactions: {
        "dirty_water": { "elem1": null, "elem2":"water" },
        //"ethylene": { "elem2":"one_two_dichloroethane" }, todo: vinyl chloride
    },
    category: "powders",
    tempHigh: 307.6,
    state: "solid",
    density: 2900,
}

createAcid("sulfuric_acid",structuredClone(defaultAcidReactions),structuredClone(defaultAcidGasReactions),["#e9e05e","#c2bd7a","#9e9c7b"],false,false,337,337,10,500,1830,1.26)

elements.sulfuric_acid.ignore.push("charcoal");
elements.sulfuric_acid_gas.ignore.push("charcoal");
elements.sulfuric_acid.reactions["water"] = { "elem1":"sulfuric_acid", "elem2":"dirty_water"};
elements.sulfuric_acid.reactions["sugar_water"] = { "elem1":"sulfuric_acid", "elem2":"dirty_water"};
elements.sulfuric_acid.reactions["dirty_water"] = { "elem1":"sulfuric_acid", "elem2":"dirty_water"};
elements.sulfuric_acid.reactions["acid_gas"] = { "elem1":"sulfuric_acid", "elem2":"dirty_water"};
elements.sulfuric_acid.reactions["neutral_acid"] = { "elem1":"sulfuric_acid", "elem2":"dirty_water"};
elements.sulfuric_acid.reactions["seltzer"] = { "elem1":"sulfuric_acid", "elem2":"dirty_water"};
elements.sulfuric_acid.reactions["pool_water"] = { "elem1":"sulfuric_acid", "elem2":"dirty_water"};
elements.sulfuric_acid.reactions["primordial_soup"] = { "elem1":"sulfuric_acid", "elem2":"dirty_water"};
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


acidReact("sulfuric_acid","magnesium_oxide","epsom_salt",null,50);
acidReact("sulfuric_acid_gas","magnesium_oxide","epsom_salt",null,50);

trueAcids.push("sulfuric_acid")
trueAcidGases.push("sulfuric_acid_gas");

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
			pixel.origColor = pixel.color.match(/\d+/g);
		}
		if (pixel.origColor != pixel.color) {
			pixel.color = "rgb("+pixel.origColor.join(",")+")";
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


elements.methanol = {
	color: "#969380",
	behavior: behaviors.LIQUID,
    reactions: {
        "plant": { elem2:"dead_plant", elem1:null, chance:0.05 },
        "cell": { elem2:[null,"dna"], chance:0.075 },
        "blood": { elem2:[null,"dna"], chance:0.075 },
        "antibody": { elem2:[null,"dna"], chance:0.075 },
        "infection": { elem2:[null,"dna"], chance:0.075 },
        "cancer": { elem2:[null,"dna"], chance:0.0375 },
        "flea": { elem2:"dead_bug", elem1:null },
        "termite": { elem2:"dead_bug", elem1:null },
        "ant": { elem2:"dead_bug", elem1:null },
        "frog": { elem2:"meat", chance: 0.05 },
        "evergreen": { elem2:"dead_plant", chance: 0.05 },
        "cactus": { elem2:"dead_plant", chance: 0.05 },
        "paper": { elem2:"cellulose" },
        "primordial_soup": { elem2:"water" },
    },
	state: "liquid",
	category: "liquids",
	density: 792,
    tempLow: -97.6,
	tempHigh: 64.7,
    burn: 100,
    burnTime: 3,
    fireColor: ["#80acf0","#96cdfe","#bee6d4"],
}


elements.carbon_dioxide.reactions.hydrogen = { elem1:"steam", elem2:"methanol", tempMin: 100 }



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
			pixel.origColor = pixel.color.match(/\d+/g);
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
        "chlorine": { "elem1":"chloroethane", "elem2": null, "chance":0.01 }
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
        "acid_gas": { "elem1":"chloroethane", "elem2":null },
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


elements.liquid_ethylene = {
    tempHigh: -103.7,
    stateHigh: "ethylene",
    tempLow: -154.4,
};
elements.liquid_ethane = {
    tempHigh: -88.5,
    stateHigh: "ethane",
    tempLow: -128.2,
};


elements.liquid_ethylene = {
    tempHigh: -103.7,
    stateHigh: "ethylene",
    tempLow: -169.2,
};
elements.liquid_ethane = {
    tempHigh: -88.5,
    stateHigh: "ethane",
    tempLow: -182.8,
};

elements.liquid_chloroethane = {
    tempHigh: -12.27,
    stateHigh: "chloroethane",
    tempLow: -138.7,
};

elements.liquid_propane = {
    tempHigh: -42.25,
    stateHigh: "propane",
    tempLow: -187.7,
};



elements.acid.ignore.push("ethylene","ethylene_ice","liquid_ethylene","chloroethane","chloroethane_ice","liquid_chloroethane");
elements.acid_gas.ignore.push("ethylene","ethylene_ice","liquid_ethylene","chloroethane","chloroethane_ice","liquid_chloroethane");



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
    fireColor: "#ffffff",
    burnInto: "magnesium_oxide",
    hardness: 0.5,
};
elements.molten_magnesium = {
    density: 1738,
    color: ["#cc9c7c", "#ebb896", "#f5bb95", "#f7cd9c", "#fcd2a2", "#fff8f0"],
    hidden: true,
    state: "liquid",
    behavior: behaviors.MOLTEN,
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
    fireColor: "#ffffff",
    burnInto: "magnesium_oxide",
};


elements.magnesium_oxide = {
    color: "#f0f0f0",
    behavior: behaviors.POWDER,
    reactions: {
        "quicklime": { "elem1": "cement", "elem2": null},
    },
    category: "powders",
    density: 3600,
    state: "solid",
    tempHigh: 2852,
};


elements.magnesium_chloride = {
    color: "#bfbfbf",
    behavior: behaviors.POWDER,
    category: "powders",
    density: 2640,
    state: "solid",
    tempHigh: 714,
    stateHigh: "molten_magnesium_chloride",
};

elements.molten_magnesium_chloride = {
    behavior: behaviors.MOLTEN,
    behaviorOn: [
        "XX|CR:fire%2.5|XX",
        "M2|CH:chlorine,magnesium%25|M2",
        "M1|M1|M1",
    ],
    hidden: true,
    temp: 750,
    density: 2620,
    state: "liquid",
    conduct: 0.3,
};

elements.francium = {
    color: "#3eff3b",
    behavior: [
        "XX|CR:radiation%50|XX",
        "CR:radiation%50|CH:radon%0.1|CR:radiation%50",
        "M2|M1|M2",
    ],
    tick: function(pixel) {
        pixel.temp += 5;
    },
    reactions: {
        "water": { "elem1":"radon", "elem2":"rad_pop"},
        "salt_water": { "elem1":"radon", "elem2":"rad_pop"},
        "sugar_water": { "elem1":"radon", "elem2":"rad_pop"},
        "dirty_water": { "elem1":"radon", "elem2":"rad_pop"},
        "seltzer": { "elem1":"radon", "elem2":"rad_pop"},
        "steam": { "elem1":"radon", "elem2":"rad_pop"},
        "rad_steam": { "elem1":"radon", "elem2":"rad_pop"},
		"seltzer": { "elem1":"radon", "elem2":"rad_pop"},
		"pool_water": { "elem1":"radon", "elem2":"rad_pop"},
		"primordial_soup": { "elem1":"radon", "elem2":"rad_pop"},
        "quark_matter": { "elem1":"stable_francium", "elem2":"quark_matter"}
    },
    tempHigh: 27,
    category: "powders",
    state: "solid",
    density: 2480,
};
elements.molten_francium = {
    color: "#9ff31e",
    behavior: [
        "XX|CR:radiation%50|XX",
        "M2 AND CR:radiation%50|CH:radon%0.1|M2 AND CR:radiation%50",
        "M1|M1|M1",
    ],
    tick: function(pixel) {
        pixel.temp += 5;
    },
    reactions: {
        "water": { "elem1":"radon", "elem2":"rad_pop"},
        "salt_water": { "elem1":"radon", "elem2":"rad_pop"},
        "sugar_water": { "elem1":"radon", "elem2":"rad_pop"},
        "dirty_water": { "elem1":"radon", "elem2":"rad_pop"},
        "seltzer": { "elem1":"radon", "elem2":"rad_pop"},
        "steam": { "elem1":"radon", "elem2":"rad_pop"},
        "rad_steam": { "elem1":"radon", "elem2":"rad_pop"},
		"seltzer": { "elem1":"radon", "elem2":"rad_pop"},
		"pool_water": { "elem1":"radon", "elem2":"rad_pop"},
		"primordial_soup": { "elem1":"radon", "elem2":"rad_pop"},
        "quark_matter": { "elem1":"stable_francium", "elem2":"quark_matter"}
    },
    tempLow: 27,
    hidden: true,
    state: "liquid",
    density: 2480,
};


elements.astatine = {
    color: "#5a5e5a",
    behavior: [
        "XX|CR:radiation%50|XX",
        "CR:radiation%50|CH:polonium,big_pop%0.1|CR:radiation%50",
        "M2|M1|M2",
    ],
    tick: function(pixel) {
        pixel.temp += 5;
    },
    reactions: {
        "quark_matter": { "elem1":"stable_astatine", "elem2":"quark_matter"}
    },
    tempHigh: 107, //pulled out of ass-tatine
    category: "powders",
    state: "solid",
    density: 8910,
};
elements.molten_astatine = {
    color: "#aab0a0",
    behavior: [
        "XX|CR:radiation%50|XX",
        "M2 AND CR:radiation%50|CH:polonium,big_pop%0.1|M2 AND CR:radiation%50",
        "M1|M1|M1",
    ],
    reactions: {
        "quark_matter": { "elem1":"molten_stable_astatine", "elem2":"quark_matter"}
    },
    tick: function(pixel) {
        pixel.temp += 5;
    },
    tempLow: 107, //pulled out of ass-tatine
    hidden: true,
    state: "liquid",
    density: 8910,
};

elements.radon = {
    color: "#b6ffb5",
    behavior: [
        "M2|M1 AND CR:radiation%10|M2",
        "M1 AND CR:radiation%10|CH:polonium%0.1|M1 AND CR:radiation%10",
        "M2|M1 AND CR:radiation%10|M2",
    ],
    reactions: {
        "quark_matter": { "elem1":"stable_radon", "elem2":"quark_matter"}
    },
    tick: function(pixel) {
        pixel.temp += 1;
    },
    category: "gases",
    state: "gas",
    density: 9.73,
};


elements.polonium = {
    color: "#56b870",
    behavior: [
        "XX|CR:radiation%10|XX",
        "CR:radiation%10|CH:lead%0.1|CR:radiation%10",
        "XX|CR:radiation%10|XX",
    ],
    reactions: {
        "quark_matter": { "elem1":"stable_polonium", "elem2":"quark_matter"}
    },
    tick: function(pixel) {
        pixel.temp += 1;
    },
    tempHigh: 254,
    category: "solids",
    state: "solid",
    density: 9196,
};
elements.molten_polonium = {
    color: ["#ace638","#acb838","#ac8a00"],
    behavior: [
        "XX|CR:fire,CR:radiation%12.5|XX",
        "M2 AND CR:radiation%10|CH:lead%0.1|M2 AND CR:radiation%10",
        "M1|M1|M1",
    ],
    reactions: {
        "quark_matter": { "elem1":"molten_stable_polonium", "elem2":"quark_matter"}
    },
    tick: function(pixel) {
        pixel.temp += 1;
    },
    tempLow: 254,
    hidden: true,
    state: "liquid",
    density: 9196,
};

elements.rad_pop = {
    color: ["#ffb48f","#ffd991","#ffad91"],
    behavior: [
        "XX|XX|XX",
        "XX|EX:10>fire,radiation,radiation|XX",
        "XX|XX|XX",
    ],
    category: "energy",
    state: "gas",
    density: 1000,
    excludeRandom: true,
    hidden: true,
};


function blendColors(colorA, colorB, amount = 0.5) {
    const [rA, gA, bA] = colorA.match(/\w\w/g).map((c) => parseInt(c, 16));
    const [rB, gB, bB] = colorB.match(/\w\w/g).map((c) => parseInt(c, 16));
    const r = Math.round(rA + (rB - rA) * amount).toString(16).padStart(2, '0');
    const g = Math.round(gA + (gB - gA) * amount).toString(16).padStart(2, '0');
    const b = Math.round(bA + (bB - bA) * amount).toString(16).padStart(2, '0');
    return '#' + r + g + b;
}


elements.stable_radon = {
    color: [blendColors("#b6ffb5","#ff0000"),blendColors("#b6ffb5","#00ff00"),blendColors("#b6ffb5","#0000ff")],
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 9.73,
    hidden: true,
    tempLow: -61.7,
};

elements.liquid_stable_radon = {
    tempLow: -71,
};


elements.stable_polonium = {
    color: [blendColors("#56b870","#ff0000"),blendColors("#56b870","#00ff00"),blendColors("#56b870","#0000ff")],
    behavior: behaviors.WALL,
    reactions: {
        "oxygen": { "elem1":"polonium_dioxide", "elem2": null},
    },
    tempHigh: 254,
    hidden: true,
    category: "solids",
    state: "solid",
    density: 9196,
};
elements.molten_stable_polonium = {
    color: [blendColors("#ace638","#ff0000"),blendColors("#acb838","#00ff00"),blendColors("#ac8a00","#0000ff")],
    behavior: behaviors.MOLTEN,
    reactions: {
        "oxygen": { "elem1":"polonium_dioxide", "elem2": null},
        "magnesium": { "elem1":"magnesium_polonide", "elem2": null},
        "molten_magnesium": { "elem1":"magnesium_polonide", "elem2": null},
    },
    tempLow: 254,
    hidden: true,
    state: "liquid",
    density: 9196,
};


elements.stable_astatine = {
    color: [blendColors("#5a5e5a","#ff0000"),blendColors("#5a5e5a","#00ff00"),blendColors("#5a5e5a","#0000ff")],
    behavior: behaviors.POWDER,
    tempHigh: 107, //pulled out of ass-tatine
    reactions: {
        "water": { "elem1":"hydroastatic_acid", "elem2":null},
        "salt_water": { "elem1":"hydroastatic_acid", "elem2":null},
        "sugar_water": { "elem1":"hydroastatic_acid", "elem2":null},
        "dirty_water": { "elem1":"hydroastatic_acid", "elem2":null},
        "seltzer": { "elem1":"hydroastatic_acid", "elem2":null},
        "steam": { "elem1":"hydroastatic_acid", "elem2":null},
        "rad_steam": { "elem1":"hydroastatic_acid", "elem2":null},
		"seltzer": { "elem1":"hydroastatic_acid", "elem2":null},
		"pool_water": { "elem1":"hydroastatic_acid", "elem2":null},
		"primordial_soup": { "elem1":"hydroastatic_acid", "elem2":null},
    },
    category: "powders",
    state: "solid",
    hidden: true,
    density: 8910,
};
elements.molten_stable_astatine = {
    color: [blendColors("#aab0a0","#ff0000"),blendColors("#aab0a0","#00ff00"),blendColors("#aab0a0","#0000ff")],
    behavior: behaviors.LIQUID,
    tempLow: 107, //pulled out of ass-tatine
    reactions: {
        "water": { "elem1":"hydroastatic_acid", "elem2":null},
        "salt_water": { "elem1":"hydroastatic_acid", "elem2":null},
        "sugar_water": { "elem1":"hydroastatic_acid", "elem2":null},
        "dirty_water": { "elem1":"hydroastatic_acid", "elem2":null},
        "seltzer": { "elem1":"hydroastatic_acid", "elem2":null},
        "steam": { "elem1":"hydroastatic_acid", "elem2":null},
        "rad_steam": { "elem1":"hydroastatic_acid", "elem2":null},
		"seltzer": { "elem1":"hydroastatic_acid", "elem2":null},
		"pool_water": { "elem1":"hydroastatic_acid", "elem2":null},
		"primordial_soup": { "elem1":"hydroastatic_acid", "elem2":null},
    },
    hidden: true,
    state: "liquid",
    density: 8910,
};

createAcid("hydroastatic_acid",structuredClone(defaultAcidReactions),structuredClone(defaultAcidGasReactions),[blendColors("#5a5e5a","#ff0000",.25),blendColors("#5a5e5a","#00ff00",.25),blendColors("#5a5e5a","#0000ff",.25)],true,true,100,100,0,1000,1200,1)

elements.hydroastatic_acid.ignore.push("astatine","molten_astatine","stable_astatine","molten_stable_astatine");
elements.hydroastatic_acid_gas.ignore.push("astatine","molten_astatine","stable_astatine","molten_stable_astatine");

trueAcids.push("hydroastatic_acid");
trueAcidGases.push("hydroastatic_acid_gas");

elements.hydroastatic_acid.reactions["water"] = { "elem1":"hydroastatic_acid", "elem2":"dirty_water"};
elements.hydroastatic_acid.reactions["sugar_water"] = { "elem1":"sulfuric_acid", "elem2":"dirty_water"};
elements.hydroastatic_acid.reactions["dirty_water"] = { "elem1":"sulfuric_acid", "elem2":"dirty_water"};
elements.hydroastatic_acid.reactions["acid_gas"] = { "elem1":"sulfuric_acid", "elem2":"dirty_water"};
elements.hydroastatic_acid.reactions["neutral_acid"] = { "elem1":"sulfuric_acid", "elem2":"dirty_water"};
elements.hydroastatic_acid.reactions["seltzer"] = { "elem1":"sulfuric_acid", "elem2":"dirty_water"};
elements.hydroastatic_acid.reactions["pool_water"] = { "elem1":"sulfuric_acid", "elem2":"dirty_water"};
elements.hydroastatic_acid.reactions["primordial_soup"] = { "elem1":"sulfuric_acid", "elem2":"dirty_water"};

elements.polonium_dioxide = {
    color: "#ffff7f",
    behavior: behaviors.POWDER,
    tempHigh: 500,
    hidden: true,
    state: "solid",
    density: 8900,
};

elements.magnesium_polonide = {
    color: [blendColors("#b5b5b5","#ff0000",.25),blendColors("#b5b5b5","#00ff00",.25),blendColors("#b5b5b5","#0000ff",.25)],
    behavior: behaviors.POWDER,
    tempHigh: 1800,
    hidden: true,
    state: "solid",
    density: 6700,
};

acidReact("acid","magnesium_polonide","magnesium_chloride","polonium_hydride",100);
acidReact("acid_gas","magnesium_polonide","magnesium_chloride","polonium_hydride",100);
acidReact("acid","molten_magnesium_polonide","magnesium_chloride","polonium_hydride",100);
acidReact("acid_gas","molten_magnesium_polonide","magnesium_chloride","polonium_hydride",100);
elements.acid.ignore.push("magnesium_polonide","molten_magnesium_polonide","polonium_hydride","polonium_hydride_ice","polonium_hydride_gas","magnesium_chloride","molten_magnesium_chloride");
elements.acid_gas.ignore.push("magnesium_polonide","molten_magnesium_polonide","polonium_hydride","polonium_hydride_ice","polonium_hydride_gas","magnesium_chloride","molten_magnesium_chloride");

elements.polonium_hydride = {
    density: 2450,
    color: "#838396",
    hidden: true,
    state: "liquid",
    behavior: behaviors.LIQUID,
    tempLow: -35.3,
    tempHigh: 36.1,
    burn: 1,
    burnTime: 10,
    burnInto: ["polonium_dioxide","steam"],
};

elements.stable_francium = {
    color: [blendColors("#3eff3b","#ff0000"),blendColors("#3eff3b","#00ff00"),blendColors("#3eff3b","#0000ff")],
    behavior: behaviors.POWDER,
    reactions: {
        "water": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "salt_water": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "sugar_water": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "dirty_water": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "seltzer": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "steam": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "rad_steam": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
		"seltzer": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
		"pool_water": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
		"primordial_soup": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
    },
    tempHigh: 27,
    category: "powders",
    state: "solid",
    density: 2480,
    hidden: true,
};
elements.molten_stable_francium = {
    color: [blendColors("#9ff31e","#ff0000"),blendColors("#9ff31e","#00ff00"),blendColors("#9ff31e","#0000ff")],
    behavior: behaviors.LIQUID,
    reactions: {
        "water": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "salt_water": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "sugar_water": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "dirty_water": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "seltzer": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "steam": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "rad_steam": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
		"seltzer": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
		"pool_water": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
		"primordial_soup": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
    },
    tempLow: 27,
    state: "liquid",
    hidden: true,
    density: 2480,
};


elements.big_pop = {
    color: ["#ffb48f","#ffd991","#ffad91"],
    behavior: [
        "XX|XX|XX",
        "XX|EX:10|XX",
        "XX|XX|XX",
    ],
    category: "energy",
    state: "gas",
    density: 1000,
    excludeRandom: true,
    hidden: true,
};

elements.potassium_salt_water = {
    color: "#416ed1",
    behavior: behaviors.LIQUID,
    tempHigh: 102,
    stateHigh: ["steam","potassium_salt"],
    tempLow: -2,
    stateLowName: "potassium_salt_ice",
    category: "liquids",
    reactions: {
        "dirt": { elem1: null, elem2: "mud" },
        "sand": { elem1: null, elem2: "wet_sand" },
        "clay_soil": { elem1: null, elem2: "clay" },
        "dust": { elem1: "dirty_water", elem2: null },
        "ash": { elem1: "dirty_water", elem2: null },
        "carbon_dioxide": { elem1: "dirty_water", elem2: null },
        "sulfur": { elem1: "dirty_water", elem2: null },
        "charcoal": { elem1: "dirty_water", chance:0.005 },
        "rat": { elem1: "dirty_water", chance:0.005 },
        "plague": { elem1: "dirty_water", elem2: null },
        "fallout": { elem1: "dirty_water", chance:0.25 },
        "radiation": { elem1: "dirty_water", chance:0.25 },
        "rust": { elem1: "dirty_water", chance:0.005 },
        "quicklime": { elem1: null, elem2: "slaked_lime" },
        "rock": { elem2: "wet_sand", chance: 0.0005 },
        "fly": { elem2:"dead_bug", chance:0.1, "oneway":true },
        "firefly": { elem2:"dead_bug", chance:0.1, "oneway":true },
        "bee": { elem2:"dead_bug", chance:0.05, "oneway":true },
        "stink_bug": { elem2:"dead_bug", chance:0.1, "oneway":true },
        "cancer": { elem1: "dirty_water", chance:0.25 },
        // electrolysis:
        "aluminum": { elem1:["hydrogen","hydrogen","oxygen","potassium_salt"], charged:true, chance:0.0025 },
        "zinc": { elem1:["hydrogen","hydrogen","oxygen","potassium_salt"], charged:true, chance:0.015 },
        "steel": { elem1:["hydrogen","hydrogen","oxygen","potassium_salt"], charged:true, chance:0.0125 },
        "iron": { elem1:["hydrogen","hydrogen","oxygen","potassium_salt"], charged:true, chance:0.0125 },
        "tin": { elem1:["hydrogen","hydrogen","oxygen","potassium_salt"], charged:true, chance:0.01 },
        "lead": { elem1:["hydrogen","hydrogen","oxygen","potassium_salt"], charged:true, chance:0.01 },
        "brass": { elem1:["hydrogen","hydrogen","oxygen","potassium_salt"], charged:true, chance:0.001 },
        "bronze": { elem1:["hydrogen","hydrogen","oxygen","potassium_salt"], charged:true, chance:0.001 },
        "copper": { elem1:["hydrogen","hydrogen","oxygen","potassium_salt"], charged:true, chance:0.0075 },
        "silver": { elem1:["hydrogen","hydrogen","oxygen","potassium_salt"], charged:true, chance:0.0075 },
        "gold": { elem1:["hydrogen","hydrogen","oxygen","potassium_salt"], charged:true, chance:0.0075 },
    },
    state: "liquid",
    density: 1026,
    conduct: 0.1,
    stain: -0.66
};


elements.potassium = {
    color: ["#8e8ba3","#8797a8","#7d6a75","#879dad"],
    tick: function(pixel) {
        for (var i = 0; i < adjacentCoords.length; i++) {
            var x = pixel.x+adjacentCoords[i][0];
            var y = pixel.y+adjacentCoords[i][1];
            if (isEmpty(x,y)) {
                if (Math.random() < 0.005) { deletePixel(pixel.x,pixel.y) }
                break
            } } },
    reactions: {
        "chlorine": { elem1:"potassium_salt", elem2:"big_pop" },
        "water": { elem1:"big_pop" },
        "salt_water": { elem1:"big_pop" },
        "sugar_water": { elem1:"big_pop" },
        "dirty_water": { elem1:"big_pop" },
		"seltzer": { elem1:"big_pop" },
		"pool_water": { elem1:"big_pop" },
		"primordial_soup": { elem1:"big_pop" },
        "acid": { elem1:"explosion" }
    },
    tempHigh: 63.5,
    category: "solids",
    state: "solid",
    density: 890,
    conduct: 0.85,
    hardness: 0.04,
    burn:40,
    burnTime: 200,
    fireColor: ["#ff00ee","#ff6bf5"]
};
elements.molten_potassium = {
    tempLow: 63.5,
    tempHigh: 757.6,
    burn:40,
    burnTime: 200,
    fireColor: ["#ff00ee","#ff6bf5"],
    reactions: {
        "chlorine": { elem1:"potassium_salt", elem2:"big_pop" },
        "water": { elem1:"big_pop" },
        "salt_water": { elem1:"big_pop" },
        "sugar_water": { elem1:"big_pop" },
        "dirty_water": { elem1:"big_pop" },
		"seltzer": { elem1:"big_pop" },
		"pool_water": { elem1:"big_pop" },
		"primordial_soup": { elem1:"big_pop" },
        "acid": { elem1:"explosion" }
    }
};
elements.potassium_gas = {
    color: "#5e6fdb"
};
elements.molten_salt = {};
elements.molten_potassium_salt = {};

    elements.molten_salt.reactions = {};
    elements.molten_salt.reactions.aluminum = { elem1:["sodium","chlorine"], charged:true, chance:0.0025 };
    elements.molten_salt.reactions.zinc = { elem1:["sodium","chlorine"], charged:true, chance:0.015 };
    elements.molten_salt.reactions.steel = { elem1:["sodium","chlorine"], charged:true, chance:0.0125 };
    elements.molten_salt.reactions.iron = { elem1:["sodium","chlorine"], charged:true, chance:0.0125 };
    elements.molten_salt.reactions.tin = { elem1:["sodium","chlorine"], charged:true, chance:0.01 };
    elements.molten_salt.reactions.lead = { elem1:["sodium","chlorine"], charged:true, chance:0.01 };
    elements.molten_salt.reactions.brass = { elem1:["sodium","chlorine"], charged:true, chance:0.001 };
    elements.molten_salt.reactions.bronze = { elem1:["sodium","chlorine"], charged:true, chance:0.001 };
    elements.molten_salt.reactions.copper = { elem1:["sodium","chlorine"], charged:true, chance:0.0075 };
    elements.molten_salt.reactions.silver = { elem1:["sodium","chlorine"], charged:true, chance:0.0075 };
    elements.molten_salt.reactions.gold = { elem1:["sodium","chlorine"], charged:true, chance:0.0075 };
    elements.molten_salt.conduct = 0.7;

    elements.molten_potassium_salt.reactions = {};
    elements.molten_potassium_salt.reactions.aluminum = { elem1:["potassium","chlorine"], charged:true, chance:0.0025 };
    elements.molten_potassium_salt.reactions.zinc = { elem1:["potassium","chlorine"], charged:true, chance:0.015 };
    elements.molten_potassium_salt.reactions.steel = { elem1:["potassium","chlorine"], charged:true, chance:0.0125 };
    elements.molten_potassium_salt.reactions.iron = { elem1:["potassium","chlorine"], charged:true, chance:0.0125 };
    elements.molten_potassium_salt.reactions.tin = { elem1:["potassium","chlorine"], charged:true, chance:0.01 };
    elements.molten_potassium_salt.reactions.lead = { elem1:["potassium","chlorine"], charged:true, chance:0.01 };
    elements.molten_potassium_salt.reactions.brass = { elem1:["potassium","chlorine"], charged:true, chance:0.001 };
    elements.molten_potassium_salt.reactions.bronze = { elem1:["potassium","chlorine"], charged:true, chance:0.001 };
    elements.molten_potassium_salt.reactions.copper = { elem1:["potassium","chlorine"], charged:true, chance:0.0075 };
    elements.molten_potassium_salt.reactions.silver = { elem1:["potassium","chlorine"], charged:true, chance:0.0075 };
    elements.molten_potassium_salt.reactions.gold = { elem1:["potassium","chlorine"], charged:true, chance:0.0075 };
    elements.molten_potassium_salt.conduct = 0.7;
    elements.molten_potassium_salt.burn = 0;
    elements.molten_potassium.burn = 0;
    
    //Hall–Heroult process
    elements.molten_cryolite_solution = {};
    elements.molten_cryolite_solution.reactions = {};
    elements.molten_cryolite_solution.reactions.charcoal = { elem1:"molten_aluminum", elem2:"carbon_dioxide" };


elements.niter = {
	color: "#f0efcc",
	behavior: behaviors.POWDER,
	reactions: {
		"plant": { "elem1":"plant", "chance":0.05 },
		"wheat_seed": { "elem1":"wheat", "chance":0.05 },
		"grass": { "elem1":"grass", "chance":0.05 },
		"grass_seed": { "elem1":"grass", "chance":0.05 },
		"bamboo_plant": { "elem1":"bamboo", "chance":0.05 },
		"flower_seed": { "elem1":"flower_seed", "chance":0.05 },
		"petal": { "elem1":"flower_seed", "chance":0.05 },
		"vine": { "elem1":"vine", "chance":0.05 },
		"sapling": { "elem1":"tree_branch", "chance":0.05 },
		"tree_branch": { "elem1":"tree_branch", "chance":0.05 },
		"corn_seed": { "elem1":"corn", "chance":0.05 },
		"root": { "elem1":"root", "chance":0.05 },
		"dirt": { "elem1":"grass", "chance":0.05 },
		"mud": { "elem1":"grass", "chance":0.05 },
		"potato_seed": { "elem1":"potato", "chance":0.05 },
		"yeast": { "elem1":"yeast", "chance":0.05 },
		"sulfur": { "elem1":"gunpowder", "elem2": null},
	},
    tempHigh: 334,
	stateHigh: "fire",
	category: "powders",
	state: "solid",
	density: 2109,
};
elements.potassium_salt.hidden = false;


elements.fluorite = {
    color: ["#8fc4f2","#d0e5f7"],
    behavior: behaviors.POWDER,
    category: "land",
    density: 3180,
    state: "solid",
    tempHigh: 1418,
    reactions: {
        "sulfuric_acid": { "elem1": "hydrogen_fluoride", "elem2":"chalk" },
    }
};

elements.sulfuric_acid.ignore.push("chalk","fluorite");
elements.sulfuric_acid_gas.ignore.push("chalk","fluorite");

elements.hydrogen_fluoride.ignore.push("chalk","fluorite");
elements.liquid_hydrogen_fluoride.ignore.push("chalk","fluorite");

elements.chalk = {
    color: ["#e0e0e0","#bfbfbf"],
    behavior: behaviors.POWDER,
    category: "land",
    density: 2320,
    state: "solid",
    tempHigh: 1460,
    stain: 0.05
};

elements.sulfur.reactions.fluorine = { elem1:"sulfur_hexafluoride", elem2: "fire"};

elements.sulfur_hexafluoride = {
    color: "#f2ff00",
    behavior: behaviors.GAS,
    category: "gases",
    density: 6.17,
    state: "gas",
    tempLow: -50.8
};


elements.liquid_sulfur_hexafluoride = {
    tempLow: -64
};

createAcid("hexafluorosilicic_acid",structuredClone(defaultAcidReactions),structuredClone(defaultAcidGasReactions),["#ebeed8","#f9ffc2","#c7e189"],true,true,100,100,0,1000,1460,1)

trueAcids.push("hexafluorosilicic_acid");
trueAcidGases.push("hexafluorosilicic_acid_gas");


elements.hydrofluoric_acid.ignore.push("sand","hexafluorosilicic_acid","hexafluorosilicic_acid_gas","potassium_carbonate","potassium_fluoride","carbon_dioxide","hydrogen");
elements.hydrofluoric_acid_gas.ignore.push("sand","hexafluorosilicic_acid","hexafluorosilicic_acid_gas","potassium_carbonate","potassium_fluoride","carbon_dioxide","hydrogen");
elements.hydrogen_fluoride.ignore.push("sand","hexafluorosilicic_acid","hexafluorosilicic_acid_gas","potassium_carbonate","potassium_fluoride","carbon_dioxide","hydrogen");
elements.liquid_hydrogen_fluoride.ignore.push("sand","hexafluorosilicic_acid","hexafluorosilicic_acid_gas","potassium_carbonate","potassium_fluoride","carbon_dioxide","hydrogen");
elements.hexafluorosilicic_acid.ignore.push("sand");
elements.hexafluorosilicic_acid_gas.ignore.push("sand");

acidReact("hydrofluoric_acid","sand","hexafluorosilicic_acid","fire",0);
acidReact("hydrofluoric_acid_gas","sand","hexafluorosilicic_acid","fire",0);
acidReact("hydrofluoric_acid","potassium_carbonate","potassium_fluoride","carbon_dioxide",100);
acidReact("hydrofluoric_acid_gas","potassium_carbonate","potassium_fluoride","carbon_dioxide",100);
acidReact("hydrogen_fluoride","potassium_carbonate","potassium_fluoride","carbon_dioxide",100);
acidReact("liquid_hydrogen_fluoride","potassium_carbonate","potassium_fluoride","carbon_dioxide",100);
acidReact("hydrofluoric_acid","potassium_carbonate",["hydrogen","fluorine"],"potassium_fluoride",100);
acidReact("hydrofluoric_acid_gas","potassium_carbonate",["hydrogen","fluorine"],"potassium_fluoride",100);

elements.fluorine.ignore.push("sand","potassium_fluoride","carbon_dioxide");
elements.liquid_fluorine.ignore.push("sand","potassium_fluoride","carbon_dioxide");

elements.potassium_carbonate = {
    color: "#e2e1e8",
    behavior: behaviors.POWDER,
    category: "powders",
    hidden: true,
    density: 2430,
    state: "solid",
    tempHigh: 891
}


elements.potassium_fluoride = {
    color: "#e8e8e1",
    behavior: behaviors.POWDER,
    category: "powders",
    hidden: true,
    density: 2480,
    state: "solid",
    tempHigh: 858
}


elements.soy_sauce = {
    color: "#470500",
    behavior: behaviors.LIQUID,
    tempLow: -5,
    tempHigh: 105,
    state: "liquid",
    category:"liquids",
    density: 1200,
    stain: 0.5
};

elements.bromine = {
    color: "#470500",
    behavior: behaviors.LIQUID,
    tick: function(pixel) {
            if(pixel.temp > 0 && Math.random() < 0.001) {
                changePixel(pixelMap[pixel.x][pixel.y],"bromine_gas",false);
            }
    },
    reactions: {
        "water": { elem1: "pool_water", elem2:null },
        "dirty_water": { elem2:"water" },
        "potassium": { elem1:"potassium_bromide", elem2:null },
        "root": { elem2:null, chance:0.025 },
        "tree_branch": { elem2:"wood", chance:0.015 },
        "pistil": { elem2:"dead_plant", chance:0.025 },
        "algae": { elem2:"dead_plant", elem2:null, chance:0.035 },
        "cell": { elem2:null, chance:0.02 },
        "plague": { elem2:null },
        "frog": { elem2:"meat", chance:0.1 },
        "virus": { elem2:null },
    },
    tempLow: -7.2,
    tempHigh: 58.8,
    state: "liquid",
    category:"liquids",
    density: 3102,
    stain: 0.5
};

elements.bromine_gas = {
    behavior: behaviors.GAS,
    tick: function(pixel) {
            if(pixel.temp < 58.8 && pixel.temp > 0 && Math.random() < 0.01) {
                changePixel(pixelMap[pixel.x][pixel.y],"bromine",false);
            }
    },
    reactions: {
        "water": { elem1: "pool_water", elem2:null },
        "dirty_water": { elem2:"water" },
        "potassium": { elem1:"potassium_bromide", elem2:null },
        "root": { elem2:null, chance:0.025 },
        "tree_branch": { elem2:"wood", chance:0.015 },
        "pistil": { elem2:"dead_plant", chance:0.025 },
        "algae": { elem2:"dead_plant", elem2:null, chance:0.035 },
        "cell": { elem2:null, chance:0.02 },
        "plague": { elem2:null },
        "frog": { elem2:"meat", chance:0.1 },
        "virus": { elem2:null },
    },
    tempLow: 0,
    stateLow: "bromine",
    state: "gas",
    category:"gases",
    hidden: true,
    density: 7.59,
    stain: 0.5
};


elements.potassium_bromide = {
    color: ["#fccaca","#f7cbcb"],
    behavior: behaviors.POWDER,
    category: "powders",
    tempHigh: 734,
    state: "solid",
    density: 2740
};

elements.silver_bromide = {
    color: ["#fcfcca","#f7f24f"],
    tick: function(pixel) {
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (!isEmpty(pixel.x+i,pixel.y+j,true) && (pixelMap[pixel.x+i][pixel.y+j].element === "light" || pixelMap[pixel.x+i][pixel.y+j].element === "liquid_light")) {
                    
					for (let k = -1; k <= 1; k++) {
						for (let l = -1; l <= 1; l++) {
							if(!isEmpty(pixel.x+k,pixel.y+l,true) && pixelMap[pixel.x+k][pixel.y+l].element === "silver_bromide")
							{
								pixelMap[pixel.x+k][pixel.y+l].color = pixelMap[pixel.x+i][pixel.y+j].color;
							}
						}
					}
					if(pixelMap[pixel.x+i][pixel.y+j].element === "light")
					{
						deletePixel(pixel.x+i,pixel.y+j);
					}
				}
			}
		}
	},
    behavior: behaviors.POWDER,
    category: "powders",
    tempHigh: 430,
    state: "solid",
    density: 6470
};


elements.nitric_acid.reactions["silver"] = { elem1: "nitrogen_dioxide", elem2: "silver_nitrate"};
elements.nitric_acid_gas.reactions["silver"] = { elem1: "nitrogen_dioxide", elem2: "silver_nitrate"};

elements.nitric_acid.ignore.push("silver","silver_nitrate");
elements.nitric_acid_gas.ignore.push("silver","silver_nitrate");

elements.silver_nitrate = {
    color: ["#cad7fc","#cbd2f7"],
    behavior: behaviors.POWDER,
    reactions: {
        "potassium_bromide": {elem1: "niter", elem2: "silver_bromide"}
    },
    category: "powders",
    tempHigh: 209,
    state: "solid",
    density: 2740,
    hidden: true
};
elements.molten_silver_nitrate = {
    tempHigh: 440,
    stateHigh: ["silver","nitrogen_dioxide","oxygen"],
}

createAcid("hydrobromic_acid",structuredClone(defaultAcidReactions),structuredClone(defaultAcidGasReactions),["#ff3b3b","#ca0000","#9e7b7b"],true,true,100,100,0,1000,1100,1)

trueAcids.push("hydrobromic_acid");
trueAcidGases.push("hydrobromic_acid_gas");

acidReact("sulfuric_acid","bromine","sulfuric_acid","hydrobromic_acid",50);
acidReact("sulfuric_acid","bromine_ice","sulfuric_acid","hydrobromic_acid",50);
acidReact("sulfuric_acid","bromine_gas","sulfuric_acid","hydrobromic_acid",50);
acidReact("sulfuric_acid_gas","bromine","sulfuric_acid","hydrobromic_acid",50);
acidReact("sulfuric_acid_gas","bromine_ice","sulfuric_acid","hydrobromic_acid",50);
acidReact("sulfuric_acid_gas","bromine_gas","sulfuric_acid","hydrobromic_acid",50);
elements.hydrobromic_acid.ignore.push("bromine","bromine_ice","bromine_gas");
elements.hydrobromic_acid_gas.ignore.push("bromine","bromine_ice","bromine_gas");

acidReact("sulfuric_acid","potassium_salt","potassium_sulfate","acid",50);
acidReact("sulfuric_acid_gas","potassium_salt","potassium_sulfate","acid",50);
acidReact("sulfuric_acid","niter","potassium_sulfate","nitric_acid",50);
acidReact("sulfuric_acid_gas","niter","potassium_sulfate","nitric_acid",50);
acidReact("sulfuric_acid","potassium_bromide","potassium_sulfate","hydrobromic_acid",50);
acidReact("sulfuric_acid_gas","potassium_bromide","potassium_sulfate","hydrobromic_acid",50);

elements.acid.ignore.push("potassium_sulfate","potassium_salt");
elements.acid_gas.ignore.push("potassium_sulfate","potassium_salt");
elements.nitric_acid.ignore.push("potassium_sulfate","niter");
elements.nitric_acid_gas.ignore.push("potassium_sulfate","niter");
elements.hydrobromic_acid.ignore.push("potassium_sulfate","niter");
elements.hydrobromic_acid_gas.ignore.push("potassium_sulfate","potassium_bromide");

elements.potassium_sulfate = {
	color: "#f0d8cc",
	behavior: behaviors.POWDER,
	reactions: {
		"plant": { "elem1":"plant", "chance":0.05 },
		"wheat_seed": { "elem1":"wheat", "chance":0.05 },
		"grass": { "elem1":"grass", "chance":0.05 },
		"grass_seed": { "elem1":"grass", "chance":0.05 },
		"bamboo_plant": { "elem1":"bamboo", "chance":0.05 },
		"flower_seed": { "elem1":"flower_seed", "chance":0.05 },
		"petal": { "elem1":"flower_seed", "chance":0.05 },
		"vine": { "elem1":"vine", "chance":0.05 },
		"sapling": { "elem1":"tree_branch", "chance":0.05 },
		"tree_branch": { "elem1":"tree_branch", "chance":0.05 },
		"corn_seed": { "elem1":"corn", "chance":0.05 },
		"root": { "elem1":"root", "chance":0.05 },
		"dirt": { "elem1":"grass", "chance":0.05 },
		"mud": { "elem1":"grass", "chance":0.05 },
		"potato_seed": { "elem1":"potato", "chance":0.05 },
		"yeast": { "elem1":"yeast", "chance":0.05 },
	},
    tempHigh: 1069,
	category: "powders",
	state: "solid",
	density: 2660,
    hidden: true
};

elements.sodium_chlorate = {
	color: "#cff0cc",
	behavior: behaviors.POWDER,
	reactions: {
		"gold": { elem1:"sodium_perchlorate", charged:true, chance:0.1 }
	},
    tempHigh: 255,
    stateHigh: "fire",
	category: "powders",
	state: "solid",
	density: 2490,
    hidden: true,
    conduct: 0.1,
};

elements.chlorine.reactions["bleach"] = { elem1: "sodium_chlorate", elem2: null};

elements.sodium_perchlorate = {
	color: "#d6f0cc",
	behavior: behaviors.POWDER,
	reactions: {
		"acid": { elem1:"perchloric_acid", elem2: "salt"}
	},
    tempHigh: 468,
    stateHigh: "fire",
	category: "powders",
	state: "solid",
	density: 2499,
    hidden: true
};

elements.acid.ignore.push("salt","sodium_perchlorate");
elements.acid_gas.ignore.push("salt","sodium_perchlorate");

createAcid("perchloric_acid",structuredClone(defaultAcidReactions),structuredClone(defaultAcidGasReactions),["#ff963b","#ca6800","#c48a56"],true,true,100,100,0,1000,1768,1)

elements.perchloric_acid.tick = function(pixel) {
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
				changePixel(pixel,"pop");
			} else {
				deletePixel(pixel.x,pixel.y);
				return;
			}
		} else {
			behaviors.LIQUID(pixel);
		}
	}
delete elements.perchloric_acid.behavior;


elements.perchloric_acid_gas.tick = function(pixel) {
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
				changePixel(pixel,"pop");
			} else {
				deletePixel(pixel.x,pixel.y);
				return;
			}
		} else {
			behaviors.GAS(pixel);
		}
	}
elements.perchloric_acid_gas.behavior = [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ];

trueAcids.push("perchloric_acid");
trueAcidGases.push("perchloric_acid_gas");

acidReact("perchloric_acid","ammonia","rocket_fuel",null,100);
acidReact("perchloric_acid_gas","ammonia","rocket_fuel",null,100);

elements.perchloric_acid.ignore.push("salt","sodium_perchlorate","rocket_fuel");
elements.perchloric_acid_gas.ignore.push("salt","sodium_perchlorate","rocket_fuel");

elements.rocket_fuel = {
	color: "#edcfca",
	behavior: behaviors.POWDER,
    tempHigh: 200,
    stateHigh: "big_explosion",
	category: "weapons",
	state: "solid",
	density: 1950,
    burn: 100,
    burnTime: 100,
    burnInto: "big_explosion",
    excludeRandom: true
};

elements.big_explosion = {
    color: ["#ffb48f","#ffd991","#ffad91"],
    behavior: [
        "XX|XX|XX",
        "XX|EX:20|XX",
        "XX|XX|XX",
    ],
    temp: 300,
    category: "energy",
    state: "gas",
    density: 1000,
    excludeRandom: true,
    noMix: true
}

elements.iodine = {
    color: ["#240030","#15061a","#752191"],
    behavior: behaviors.POWDER,
    tick: function(pixel) {
            if(pixel.temp > 25 && Math.random() < 0.001) {
                changePixel(pixelMap[pixel.x][pixel.y],"iodine_gas",false);
            }
    },
    reactions: {
        "water": { elem1: "disinfectant", elem2:null },
        "dirty_water": { elem2:"water" },
        "potato": { color2: "#3e0252"},
        "bread": { color2: "#3e0252"},
        "toast": { color2: "#3e0252"},
        "flour": { color2: "#3e0252"},
        "dough": { color2: "#3e0252"},
        "batter": { color2: "#3e0252"},
        "hydrogen": { elem1: "hydrogen_iodide", elem2:null },
        "hydrogen_sulfide": { elem1: "hydrogen_iodide", elem2: "sulfur" },
        "algae": { elem2:"dead_plant", elem2:null, chance:0.035 },
        "cell": { elem2:null, chance:0.02 },
        "plague": { elem2:null },
        "virus": { elem2:null },
    },
    tempHigh: 113,
    stateHigh: "molten_iodine",
    state: "solid",
    category:"powders",
    density: 4933,
    stain: 0.01
};

elements.molten_iodine = {
    color: ["#360147","#2b0d36","#9b2ebf"],
    forceAutoGen: true,
    behavior: behaviors.LIQUID,
    tempHigh: 184,
    tempLow: 113,
    temp: 123,
    stateHigh: "iodine_gas",
    stateLow: "iodine",
    state: "liquid",
    hidden: true,
};

elements.iodine_gas = {
    behavior: behaviors.GAS,
    tick: function(pixel) {
            if(pixel.temp < 113 && pixel.temp > 25 && Math.random() < 0.01) {
                changePixel(pixelMap[pixel.x][pixel.y],"iodine",false);
            }
    },
    tempLow: 25,
    stateLow: "iodine",
    state: "gas",
    category:"gases",
    hidden: true,
    density: 11.27,
    stain: 0.01
};

elements.disinfectant = {
    color: "#2d004f",
    behavior: behaviors.LIQUID,
    reactions: {
        "blood": { elem1:null, elem2: "water" },
        "dirty_water": { elem2: "water" },
        "plague": { elem2: null },
        "virus": { elem2: null },
        "infection": { elem2: null },
        "mushroom_spore": { elem2: null },
        "lichen": { elem2: null },
        "rotten_meat": { elem2: "meat" },
        "rotten_cheese": { elem2: "cheese" },
        "stench": { elem2: null },
        "cancer": { elem2: null, chance:0.01 },
        "rat": { elem2: null, chance:0.01 },
        "ant": { elem2: "dead_bug", chance:0.1 },
        "bee": { elem2: "dead_bug", chance:0.1 },
        "fly": { elem2: "dead_bug", chance:0.1 },
        "firefly": { elem2: "dead_bug", chance:0.1 },
        "worm": { elem2: "dead_bug", chance:0.1 },
        "flea": { elem2: "dead_bug", chance:0.1 },
        "termite": { elem2: "dead_bug", chance:0.1 },
        "stink_bug": { elem2: "dead_bug", chance:0.1 },
    },
    tempHigh: 100,
    tempLow: 0,
    stateHigh: ["steam", "iodine"],
    state: "liquid",
    category:"liquids",
    density: 1020,
    stain: 0.01
};

createAcid("hydroiodic_acid",structuredClone(defaultAcidReactions),structuredClone(defaultAcidGasReactions),["#9670ff","#da6afc","#a77af5","#9670ff","#da6afc","#a77af5","#633a1d"],true,true,100,100,0,1000,1150,1)

trueAcids.push("hydroiodic_acid");
trueAcidGases.push("hydroiodic_acid_gas");

elements.hydrogen_iodide = {
	color: "#aa8df2",
	behavior: behaviors.GAS,
	reactions: {
		"water": { "elem1": "hydroiodic_acid", "elem2": null },
		"salt_water": { "elem1": "hydroiodic_acid", "elem2": null },
		"sugar_water": { "elem1": "hydroiodic_acid", "elem2": null },
		"dirty_water": { "elem1": "hydroiodic_acid", "elem2": null },
		"seltzer": { "elem1": "hydroiodic_acid", "elem2": null },
		"pool_water": { "elem1": "hydroiodic_acid", "elem2": null },
		"primordial_soup": { "elem1": "hydroiodic_acid", "elem2": null },
		"steam": { "elem1": "hydroiodic_acid_gas", "elem2": null },
		"neutral_acid": { "elem1": "hydroiodic_acid", "elem2": null },
	},
	state: "gas",
	category:"gases",
    hidden: true,
	density: 2.85,
	tempLow: -35.4,
	stateLow: "liquid_hydrogen_iodide",
    forceAutoGen: true
};

elements.liquid_hydrogen_iodide = {
	reactions: {
		"water": { "elem1": "hydroiodic_acid", "elem2": null },
		"salt_water": { "elem1": "hydroiodic_acid", "elem2": null },
		"sugar_water": { "elem1": "hydroiodic_acid", "elem2": null },
		"dirty_water": { "elem1": "hydroiodic_acid", "elem2": null },
		"seltzer": { "elem1": "hydroiodic_acid", "elem2": null },
		"pool_water": { "elem1": "hydroiodic_acid", "elem2": null },
		"primordial_soup": { "elem1": "hydroiodic_acid", "elem2": null },
		"steam": { "elem1": "hydroiodic_acid_gas", "elem2": null },
		"neutral_acid": { "elem1": "hydroiodic_acid", "elem2": null },
	},
    state: "liquid",
	tempLow: -50.8,
};

elements.hydroiodic_acid.ignore.push("hydrogen_iodide","liquid_hydrogen_iodide","hydrogen_iodide_ice");
elements.hydroiodic_acid_gas.ignore.push("hydrogen_iodide","liquid_hydrogen_iodide","hydrogen_iodide_ice");

elements.hydroiodic_acid.reactions["water"] = { "elem1":"hydroiodic_acid", "elem2":"dirty_water"};
elements.hydroiodic_acid.reactions["salt_water"] = { "elem1":"hydroiodic_acid", "elem2":"dirty_water"};
elements.hydroiodic_acid.reactions["sugar_water"] = { "elem1":"hydroiodic_acid", "elem2":"dirty_water"};
elements.hydroiodic_acid.reactions["dirty_water"] = { "elem1":"hydroiodic_acid", "elem2":"dirty_water"};
elements.hydroiodic_acid.reactions["seltzer"] = { "elem1":"hydroiodic_acid", "elem2":"dirty_water"};
elements.hydroiodic_acid.reactions["pool_water"] = { "elem1":"hydroiodic_acid", "elem2":"dirty_water"};
elements.hydroiodic_acid.reactions["primordial_soup"] = { "elem1":"hydroiodic_acid", "elem2":"dirty_water"};


  
elements.bauxite = {
    color: ["#915a30","#cc7533"],
    behavior: behaviors.POWDER,
    category: "land",
    density: 2420,
    state: "solid",
    tempHigh: 300
};

elements.sodium_aluminate_solution = {
    color: ["#bdb3e6","#b4adeb"],
    behavior: behaviors.LIQUID,
    category: "liquids",
	hidden: true,
    density: 1005,
    state: "liquid",
    tempHigh: 100,
	stateHigh: ["sodium_aluminate","steam"],
    reactions: {
        //Bayer process
        "carbon_dioxide": { elem1:"aluminum_hydroxide", elem2: ["sodium_carbonate_solution","spent_sodium_aluminate_solution"] },
    },
};


elements.spent_sodium_aluminate_solution = {
    color: ["#696380","#7a759e"],
    behavior: behaviors.LIQUID,
    category: "liquids",
	hidden: true,
    density: 1005,
    state: "liquid",
    tempHigh: 100,
	stateHigh: ["sodium_aluminate","sodium_aluminate","sodium_aluminate","gallium","steam","steam","steam","steam"],
};


elements.sodium_aluminate = {
    color: ["#e6c9b3","#ebc8ad"],
    behavior: behaviors.POWDER,
    category: "powders",
	hidden: true,
    density: 1500,
    state: "solid",
    tempHigh: 1650,
    reactions: {
        "water": { elem1: "sodium_aluminate_solution", elem2: null },
    },
};

elements.sodium_carbonate_solution = {
    color: ["#c5c1d6","#afacc2"],
    behavior: behaviors.LIQUID,
    category: "liquids",
	hidden: true,
    density: 1005,
    state: "liquid",
    tempHigh: 100,
	stateHigh: ["sodium_carbonate","steam"],
};


elements.sodium_carbonate = {
    color: "#d8dae6",
    behavior: behaviors.POWDER,
    category: "powders",
    hidden: false,
    density: 2540,
    state: "solid",
    tempHigh: 851,
    reactions: {
        "water": { elem1: "sodium_carbonate_solution", elem2: null },
    },
}


elements.aluminum_hydroxide = {
    color: "#d1cbcb",
    behavior: behaviors.POWDER,
    category: "powders",
    hidden: true,
    density: 2420,
    state: "solid",
    tempHigh: 300,
    stateHigh: ["alumina","steam"],
}

elements.alumina = {
    color: "#d1cbcb",
    behavior: behaviors.SOLID,
    category: "solids",
    density: 3987,
    state: "solid",
    tempHigh: 2072,
    reactions: {
        "molten_cryolite_mixture": { elem1: "molten_cryolite_solution", elem2: "molten_cryolite_solution"},
    },
}



elements.cryolite = {
    color: ["#9ab6d9","#dae4f0"],
    behavior: behaviors.POWDER,
    category: "land",
    density: 2900,
    state: "solid",
    tempHigh: 950,
    reactions: {
        "aluminum_trifluoride": { elem1: "cryolite_mixture", elem2: "cryolite_mixture"},
    },
}


elements.aluminum_trifluoride = {
    color: ["#ebf4ff","#e3fdff"],
    behavior: behaviors.POWDER,
    category: "powders",
    hidden: true,
    density: 3100,
    state: "solid",
    tempHigh: 1290,
}


elements.molten_aluminum_trifluoride = {
    tempHigh: 1290,
    tempLow: 1290,
}

elements.aluminum_trifluoride_gas = {
    tempLow: 1290,
}




elements.cryolite_mixture = {
    color: [blendColors("#9ab6d9","#ebf4ff"),blendColors("#dae4f0","#e3fdff")],
    behavior: behaviors.POWDER,
    category: "powders",
    hidden: true,
    density: 2910,
    state: "solid",
    tempHigh: 950,
}

elements.cryolite_solution = {
    color: [blendColors(blendColors("#9ab6d9","#ebf4ff"),"#d1cbcb"),blendColors(blendColors("#dae4f0","#e3fdff"),"#d1cbcb")],
    behavior: behaviors.POWDER,
    category: "powders",
    hidden: true,
    density: 2920,
    state: "solid",
    tempHigh: 950,
}

elements.sodium_fluoride = {
    color: ["#8aebce","#b9edde"],
    behavior: behaviors.POWDER,
    category: "powders",
    density: 2558,
    state: "solid",
    tempHigh: 993,
}


//boron

acidReact("acid","borax","boric_acid","salt",0);
acidReact("acid_gas","borax","boric_acid","salt",0);

elements.boric_acid = {
    color: "#fbffeb",
    behavior: behaviors.POWDER,
    category: "powders",
    density: 1435,
    state: "solid",
    tempHigh: 170,
    reactions: {
        "hydrofluoric_acid": { elem1: "fluoroboric_acid", elem2: "dirty_water"},
        "hydrofluoric_acid_gas": { elem1: "fluoroboric_acid_gas", elem2: "steam"},
    },
}

acidReact("hydrofluoric_acid","boric_acid","fluoroboric_acid","dirty_water",50);
acidReact("hydrofluoric_acid_gas","boric_acid","fluoroboric_acid_gas","steam",50);

elements.hydrofluoric_acid.ignore.push("boric_acid","molten_boric_acid");
elements.hydrofluoric_acid_gas.ignore.push("boric_acid","molten_boric_acid");

elements.borax.hidden = false;

acidReact("sulfuric_acid","salt","acid","sodium_sulfate");
acidReact("sulfuric_acid_gas","salt","acid","sodium_sulfate");
elements.acid.ignore.push("sodium_sulfate");
elements.acid_gas.ignore.push("sodium_sulfate");

elements.sodium_sulfate = {
    color: "#f3f2f5",
    behavior: behaviors.POWDER,
    category: "powders",
    density: 2664,
    state: "solid",
    hidden: true,
    tempHigh: 884,
}


elements.boron = {
    color: ["#80736a","#a2999c","#5e5544","#292d2c"],
    behavior: behaviors.WALL,
    category: "solids",
    density: 2080,
    state: "solid",
    tempHigh: 2076,
    fireColor:["#34eb67","#5ceb34"],
    reactions: {
        "chlorine": { elem1: "boron_trichloride", elem2: null},
        "liquid_chlorine": { elem1: "boron_trichloride", elem2: null},
        "fluorine": { elem1: "boron_trifluoride", elem2: null},
        "liquid_fluorine": { elem1: "boron_trifluoride", elem2: null},
    },
}

elements.fluorine.ignore.push("boron","molten_boron");
elements.liquid_fluorine.ignore.push("boron","molten_boron");


elements.boron_trioxide = {
    color: "#c6c5c7",
    behavior: behaviors.POWDER,
    category: "powders",
    density: 2550,
    state: "solid",
    hidden: true,
    tempHigh: 450,
    fireColor:["#34eb67","#5ceb34"],
}


elements.molten_boron_trioxide = {
    reactions: {
        "chlorine": { elem1: "boron_trichloride", elem2: null},
    },
}

acidReact("sulfuric_acid","borax","boron_trioxide","sodium_sulfate",200);
acidReact("sulfuric_acid_gas","borax","boron_trioxide","sodium_sulfate",200);

acidReact("hydrofluoric_acid","boron_trioxide","boron_trifluoride","fire",0);
acidReact("hydrofluoric_acid_gas","boron_trioxide","boron_trifluoride","fire",0);

acidReact("hydrogen_fluoride","boron_trioxide","boron_trifluoride","fire",0);
acidReact("liquid_hydrogen_fluoride","boron_trioxide","boron_trifluoride","fire",0);

elements.boron_trifluoride = {
    color: "#d5d9ce",
    behavior: behaviors.GAS,
    category: "gases",
    density: 2.76,
    state: "gas",
    hidden: true,
    tempLow: -100.3,
    reactions: {
        "water": { elem1: "fluoroboric_acid", elem2: "boric_acid"},
        "dirty_water": { elem1: "fluoroboric_acid", elem2: "boric_acid"},
        "salt_water": { elem1: "fluoroboric_acid", elem2: "boric_acid"},
        "sugar_water": { elem1: "fluoroboric_acid", elem2: "boric_acid"},
        "steam": { elem1: "fluoroboric_acid_gas", elem2: "boric_acid"},
		"seltzer": { elem1: "fluoroboric_acid", elem2: "boric_acid"},
		"pool_water": { elem1: "fluoroboric_acid", elem2: "boric_acid"},
		"primordial_soup": { elem1: "fluoroboric_acid", elem2: "boric_acid"},
    },
}

elements.liquid_boron_trifluoride = {
    tempLow: -126.8,
}


elements.boron_trichloride = {
    color: "#ddf0dd",
    behavior: behaviors.GAS,
    category: "gases",
    density: 4.9,
    state: "gas",
    hidden: true,
    tempLow: 12.6,
    reactions: {
        "water": { elem1: "acid", elem2: "boric_acid"},
        "dirty_water": { elem1: "acid", elem2: "boric_acid"},
        "salt_water": { elem1: "acid", elem2: "boric_acid"},
        "sugar_water": { elem1: "acid", elem2: "boric_acid"},
        "steam": { elem1: "acid_gas", elem2: "boric_acid"},
		"seltzer": { elem1: "acid", elem2: "boric_acid"},
		"pool_water": { elem1: "acid", elem2: "boric_acid"},
		"primordial_soup": { elem1: "acid", elem2: "boric_acid"},
        "hydrogen": { elem1: "boron", elem2: "acid_gas"},
    },
}

elements.liquid_boron_trichloride = {
    tempLow: -107.3,
}


createAcid("fluoroboric_acid",{
		"water": { "elem2": "dirty_water" },
		"salt_water": { "elem2": "dirty_water" },
		"sugar_water": { "elem2": "dirty_water" },
		"seltzer": { "elem2": "dirty_water" },
		"pool_water": { "elem2": "dirty_water" },
		"primordial_soup": { "elem2": "dirty_water" },
	},{
		"water": { "elem2": "dirty_water" },
		"salt_water": { "elem2": "dirty_water" },
		"sugar_water": { "elem2": "dirty_water" },
		"seltzer": { "elem2": "dirty_water" },
		"pool_water": { "elem2": "dirty_water" },
		"primordial_soup": { "elem2": "dirty_water" },
	},["#3bffdb","#00caaf","#56c4a3"],true,true,100,100,0,1000,1020,1)

elements.fluoroboric_acid.ignore.push("boron_trifluoride","liquid_boron_trifluoride","boron_trifluoride_ice");
elements.fluoroboric_acid_gas.ignore.push("boron_trifluoride","liquid_boron_trifluoride","boron_trifluoride_ice");
elements.fluoroboric_acid.ignore.push("boric_acid","molten_boric_acid");
elements.fluoroboric_acid_gas.ignore.push("boric_acid","molten_boric_acid");
elements.fluoroboric_acid.tick = function(pixel) {
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
				changePixel(pixel,"boron_trifluoride");
			} else {
				deletePixel(pixel.x,pixel.y);
				return;
			}
		} else {
			behaviors.LIQUID(pixel);
		}
	}
    
delete elements.fluoroboric_acid.behavior;


elements.fluoroboric_acid_gas.tick = function(pixel) {
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
				changePixel(pixel,"boron_trifluoride");
			} else {
				deletePixel(pixel.x,pixel.y);
				return;
			}
		} else {
			behaviors.GAS(pixel);
		}
	};
    
elements.fluoroboric_acid_gas.behavior = [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ];


trueAcids.push("fluoroboric_acid");
trueAcidGases.push("fluoroboric_acid_gas");

acidReact("fluoroboric_acid","sodium_carbonate","sodium_tetrafluoroborate",["carbon_dioxide,steam"],50);
acidReact("fluoroboric_acid_gas","sodium_carbonate","sodium_tetrafluoroborate",["carbon_dioxide,steam"],50);
acidReact("fluoroboric_acid","sodium_carbonate_solution","sodium_tetrafluoroborate",["seltzer,steam"],50);
acidReact("fluoroboric_acid_gas","sodium_carbonate_solution","sodium_tetrafluoroborate",["seltzer,steam"],50);


behaviors.CAUSTIC = [
    "XX|DB%5|XX",
    "DB%5|XX|DB%5",
    "DB%5 AND M2|DB%10 AND M1|DB%5 AND M2",
];
behaviors.MOLTEN_CAUSTIC = [
    "XX|DB%5 AND CR:fire%2.5|XX",
    "DB%5 AND M2|XX|DB%5 AND M2",
    "DB%5 AND M2|DB%10 AND M1|DB%5 AND M2",
];
elements.sodium_hydride = {
    color: ["#9e9e9e","#4f4f4f","#616161","#454545"],
    tempHigh: 638,
    stateHigh: ["sodium","hydrogen"],
    behavior: behaviors.CAUSTIC,
    fireColor: "#ffff00",
    reactions: {
        "chlorine": { elem1:"salt", elem2:"acid_gas" },
        "vinegar": { elem1:"sodium_acetate", elem2:null, attr1:{"foam":15} },
        "water": { elem1:["pop","pop","hydrogen","hydrogen"], chance:0.1, temp2:250 },
        "salt_water": { elem1:["pop","pop","hydrogen","hydrogen"], chance:0.1, temp2:250 },
        "sugar_water": { elem1:["pop","pop","hydrogen","hydrogen"], chance:0.1, temp2:250 },
        "dirty_water": { elem1:["pop","pop","hydrogen","hydrogen"], chance:0.1, temp2:250 },
        "seltzer": { elem1:["pop","pop","hydrogen","hydrogen"], chance:0.1, temp2:250 },
        "pool_water": { elem1:["pop","pop","hydrogen","hydrogen"], chance:0.1, temp2:250 },
        "primordial_soup": { elem1:["pop","pop","hydrogen","hydrogen"], chance:0.1, temp2:250 }
    },
    category: "powders",
    state: "solid",
    hidden: true,
    density: 1390,
    burn:75,
    burnTime:120,
};


acids.push(elements.sodium_hydride);
elements.sodium_hydride.ignore = defaultAcidIgnore.concat(ignoreAcid);
acidIgnore(["sodium_hydride"]);

elements.molten_sodium.reactions.hydrogen = { elem1: "sodium_hydride", elem2: null};


elements.methanol.reactions.sodium = { elem1: "sodium_methoxide", elem2: "hydrogen", temp1: 200, temp2: 200};
elements.methanol.reactions.molten_sodium = { elem1: "sodium_methoxide", elem2: "hydrogen", temp1: 200, temp2: 200};

elements.sodium_methoxide = {
    color: ["#c4c4c4","#8c8c8c","#ababab","#787878"],
    tempHigh: 127,
    behavior: behaviors.CAUSTIC,
    fireColor: "#ffff00",
    category: "powders",
    state: "solid",
    hidden: true,
    density: 970,
    burn:5,
    burnTime:100,
    reactions: {
        "water": { elem1:"methanol", elem2:"sodium_hydroxide" },
        "salt_water": { elem1:"methanol", elem2:"sodium_hydroxide" },
        "sugar_water": { elem1:"methanol", elem2:"sodium_hydroxide" },
        "dirty_water": { elem1:"methanol", elem2:"sodium_hydroxide" },
        "seltzer": { elem1:"methanol", elem2:"sodium_hydroxide" },
        "pool_water": { elem1:"methanol", elem2:"sodium_hydroxide" },
        "primordial_soup": { elem1:"methanol", elem2:"sodium_hydroxide" },
    }
};

elements.molten_sodium_methoxide = {
    behavior: behaviors.MOLTEN_CAUSTIC,
    tempLow: 127,
}


acids.push(elements.sodium_methoxide);
acids.push(elements.molten_sodium_methoxide);
elements.sodium_methoxide.ignore = defaultAcidIgnore.concat(ignoreAcid).concat(["sodium","molten_sodium","hydrogen","methanol","methanol_gas","trimethyl_borate"]);
elements.molten_sodium_methoxide.ignore = defaultAcidGasIgnore.concat(ignoreAcid).concat(["sodium","molten_sodium","hydrogen","methanol","methanol_gas","trimethyl_borate"]);
acidIgnore(["sodium_methoxide","molten_sodium_methoxide"]);






elements.trimethyl_borate = {
    color: "#c4bc89",
    tempHigh: 69,
    tempLow: -34,
    behavior: behaviors.LIQUID,
    reactions: {
        "sodium_hydride": { elem1:"sodium_borohydride", elem2:"sodium_methoxide" },
    },
    category: "liquids",
    state: "liquid",
    hidden: true,
    density: 932,
    burn:100,
    burnTime:10,
    fireColor:["#34eb67","#5ceb34"],
};

elements.sodium_borohydride = {
    color: ["#d3d3de","#c7c7eb","#ededfc","#d9d9d9"],
    tempHigh: 400,
    behavior: behaviors.CAUSTIC,
    fireColor:["#34eb67","#5ceb34"],
    category: "powders",
    state: "solid",
    density: 1070,
    stateHigh: ["sodium_hydride","sodium","boron"],
    reactions: {},
};

acids.push(elements.sodium_borohydride);
elements.sodium_borohydride.ignore = defaultAcidIgnore.concat(ignoreAcid).concat(["sodium","molten_sodium","hydrogen","boron","trimethyl_borate"]);
acidIgnore(["sodium_borohydride"]);
elements.sodium_hydride.ignore.push(["sodium","molten_sodium","hydrogen","boron"]);


elements.sodium_tetrafluoroborate = {
    color: ["#deded3","#ebebc7","#fcfced","#d9d9d9"],
    tempHigh: 384,
    behavior: behaviors.POWDER,
    fireColor:["#34eb67","#5ceb34"],
    category: "powders",
    state: "solid",
    hidden: true,
    density: 2470,
    stateHigh: ["sodium_fluoride","boron_trifluoride"],
};

elements.fluoroboric_acid.ignore.push("sodium_tetrafluoroborate");
elements.fluoroboric_acid_gas.ignore.push("sodium_tetrafluoroborate");

acidReact("sodium_hydride","boron_trifluoride","diborane","sodium_tetrafluoroborate",20);
acidReact("sulfuric_acid","sodium_borohydride","diborane","hydrogen",50);



elements.diborane = {
    color: "#ffcac9",
    tempLow: -92.5,
    behavior: behaviors.GAS,
    fireColor:["#34eb67","#5ceb34"],
    category: "gases",
    state: "gas",
    density: 1.131,
    burn:100,
    burnTime:20,
    burnInto:"boron_trioxide",
    reactions:{
        "oxygen": { elem1:"boron_trioxide", elem2:"fire" },
        "water": { elem1:"boric_acid", elem2:"hydrogen", temp1:100},
        "salt_water": { elem1:"boric_acid", elem2:"hydrogen", temp1:100},
        "sugar_water": { elem1:"boric_acid", elem2:"hydrogen", temp1:100},
        "dirty_water": { elem1:"boric_acid", elem2:"hydrogen", temp1:100},
        "seltzer": { elem1:"boric_acid", elem2:"hydrogen", temp1:100},
        "pool_water": { elem1:"boric_acid", elem2:"hydrogen", temp1:100},
        "primordial_soup": { elem1:"boric_acid", elem2:"hydrogen", temp1:100},
    },
    tempHigh: 200,
    stateHigh: ["pentaborane","pentaborane","decaborane"],
};

elements.liquid_diborane = {
    tempLow: -164,
}




elements.decaborane = {
    color: "#d9cece",
    tempHigh: 98,
    behavior: behaviors.POWDER,
    fireColor:["#34eb67","#5ceb34"],
    category: "powders",
    state: "solid",
    hidden: true,
    density: 940,
    burn:100,
    burnTime:100,
    burnInto:"boron_trioxide",
    reactions:{
        "oxygen": { elem1:"boron_trioxide", elem2:"fire" },
        "water": { elem1:"boric_acid", elem2:"hydrogen", temp1:100},
        "salt_water": { elem1:"boric_acid", elem2:"hydrogen", temp1:100},
        "sugar_water": { elem1:"boric_acid", elem2:"hydrogen", temp1:100},
        "dirty_water": { elem1:"boric_acid", elem2:"hydrogen", temp1:100},
        "seltzer": { elem1:"boric_acid", elem2:"hydrogen", temp1:100},
        "pool_water": { elem1:"boric_acid", elem2:"hydrogen", temp1:100},
        "primordial_soup": { elem1:"boric_acid", elem2:"hydrogen", temp1:100},
    }
};

elements.molten_decaborane = {
    behavior: behaviors.LIQUID,
    tempLow: 98,
    burn:100,
    burnTime:1000,
    burnInto:"boron_trioxide",
    reactions:{
        "oxygen": { elem1:"boron_trioxide", elem2:"fire" },
        "water": { elem1:"boric_acid", elem2:"hydrogen", temp1:100},
        "salt_water": { elem1:"boric_acid", elem2:"hydrogen", temp1:100},
        "sugar_water": { elem1:"boric_acid", elem2:"hydrogen", temp1:100},
        "dirty_water": { elem1:"boric_acid", elem2:"hydrogen", temp1:100},
        "seltzer": { elem1:"boric_acid", elem2:"hydrogen", temp1:100},
        "pool_water": { elem1:"boric_acid", elem2:"hydrogen", temp1:100},
        "primordial_soup": { elem1:"boric_acid", elem2:"hydrogen", temp1:100},
    },
    fireColor:["#34eb67","#5ceb34"],
    category: "liquids",
    state: "liquid",
    hidden: true,
}



elements.pentaborane = {
    color: "#f7b5b5",
    tempHigh: 60.1,
    tempLow: -46.8,
    behavior: behaviors.LIQUID,
    fireColor:["#34eb67","#5ceb34"],
    category: "liquids",
    state: "liquid",
    hidden: true,
    density: 618,
    burn:100,
    burnTime:1,
    burnInto:"explosion",
    reactions:{
        "oxygen": { elem1:"boron_trioxide", elem2:"explosion" },
        "water": { elem1:"boric_acid", elem2:"hydrogen", temp1:200},
        "salt_water": { elem1:"boric_acid", elem2:"hydrogen", temp1:200},
        "sugar_water": { elem1:"boric_acid", elem2:"hydrogen", temp1:200},
        "dirty_water": { elem1:"boric_acid", elem2:"hydrogen", temp1:200},
        "seltzer": { elem1:"boric_acid", elem2:"hydrogen", temp1:200},
        "pool_water": { elem1:"boric_acid", elem2:"hydrogen", temp1:200},
        "primordial_soup": { elem1:"boric_acid", elem2:"hydrogen", temp1:200},
    }
};

elements.pentaborane_gas = {
    tempHigh: 250,
    stateHigh: "decaborane",
}




acidReact("sodium_borohydride","boron_trifluoride","sodium_octahydrotriborate",["sodium_fluoride","hydrogen"],20);
acidReact("hydrobromic_acid","sodium_octahydrotriborate","sodium_bromoheptahydrotriborate","hydrogen",20);

elements.sodium_octahydrotriborate = {
    color: ["#ded3de","#ebc7eb","#fbedfb","#e3cce3"],
    tempHigh: 500, //i have no idea
    behavior: behaviors.POWDER,
    fireColor:["ffff00","#34eb67","#5ceb34"],
    category: "powders",
    state: "solid",
    hidden: true,
    density: 1070, //???
    burn:5,
    burnTime:10,
    burnInto: "boron_trioxide",
    stateHigh: "sodium_dodecaborate"
};

elements.sodium_dodecaborate = {
    color: "#f5aef5",
    tempHigh: 700, //see above comment
    behavior: behaviors.POWDER,
    fireColor:["ffff00","#34eb67","#5ceb34"],
    category: "powders",
    state: "solid",
    hidden: true,
    density: 1050, //guess
    burn:1,
    burnTime:10,
    burnInto: "boron_trioxide",
};




elements.sodium_bromoheptahydrotriborate = {
    color: ["#ded9d3","#ebd9c7","#fbf4ed","#e3d5cc"],
    tempHigh: 150, //idk
    behavior: behaviors.POWDER,
    fireColor:["ffff00","#34eb67","#5ceb34"],
    category: "powders",
    state: "solid",
    hidden: true,
    density: 1090, //idk
    burn:5,
    burnTime:10,
    burnInto: "boron_trioxide",
    stateHigh: ["pentaborane","sodium_bromide","hydrogen"]
};






let defaultBaseReactions = {
	"grape": { "elem2":"juice", "color1":"#291824" },
	"sodium": { "elem1":"pop" },
	"meat": { "elem2":"rotten_meat", "elem1":null, "chance":0.5 },
}

let defaultBaseGasReactions = {
	"grape": { "elem2":"juice", "color1":"#291824" },
	"sodium": { "elem1":"pop" },
	"meat": { "elem2":"rotten_meat", "elem1":null, "chance":0.4 },
}


createAcid("francium_hydroxide",structuredClone(defaultBaseReactions),structuredClone(defaultBaseGasReactions),["#863bff","#4d00ca","#897b9e"],true,true,100,100,0,1000,1200,1)

function acidNeutralize(base)
{
    for(let i = 0; i < trueAcids.length; i++)
    {
        elements[trueAcids[i]].reactions[base] = { "elem1":"neutral_acid", "elem2":null };
    }
    for(let i = 0; i < trueAcidGases.length; i++)
    {
        elements[trueAcidGases[i]].reactions[base] = { "elem1":"hydrogen", "elem2":null };
    }
}

acidNeutralize("sodium_hydride");

acidNeutralize("sodium_methoxide");
acidNeutralize("molten_sodium_methoxide");


elements.francium_hydroxide.breakInto = "francium_hydroxide";
elements.francium_hydroxide_gas.breakInto = "francium_hydroxide_gas";
delete elements.francium_hydroxide.burn;
delete elements.francium_hydroxide_gas.burn;
acidNeutralize("francium_hydroxide");
acidNeutralize("francium_hydroxide_gas");

createAcid("sodium_hydroxide",structuredClone(defaultBaseReactions),structuredClone(defaultBaseGasReactions),["#fc3bff","#c000ca","#9b7b9e"],false,true,100,100,0,1000,1050,1);
acidNeutralize("sodium_hydroxide");
acidNeutralize("sodium_hydroxide_gas");

createAcid("potassium_hydroxide",structuredClone(defaultBaseReactions),structuredClone(defaultBaseGasReactions),["#3bc4ff","#0062ca","#7b949e"],false,true,100,100,0,1000,1075,1);
acidNeutralize("potassium_hydroxide");
acidNeutralize("potassium_hydroxide_gas");


createAcid("red_mud",structuredClone(defaultBaseReactions),structuredClone(defaultBaseGasReactions),["#ab3d24","#cc5d2d","#a81b1b"],true,true,1600,1600,0,Infinity,5200,3);
acidNeutralize("red_mud");
acidNeutralize("red_mud_gas");
elements.red_mud.viscosity = 1000000;
elements.red_mud.reactions.water = {"elem2":"dirty_water" };
elements.red_mud.reactions.salt_water = {"elem2":"dirty_water" };
elements.red_mud.reactions.sugar_water = {"elem2":"dirty_water" };
elements.red_mud.reactions.seltzer = {"elem2":"dirty_water" };
elements.red_mud.reactions.pool_water = {"elem2":"dirty_water" };
elements.red_mud.reactions.primordial_soup = {"elem2":"dirty_water" };
elements.potassium_hydroxide.reactions["fertilizer"] = { elem1: "niter", elem2: "ammonia"};
elements.potassium_hydroxide_gas.reactions["fertilizer"] = { elem1: "niter", elem2: "ammonia"};
elements.potassium_hydroxide.ignore.push("fertilizer","niter","ammonia");
elements.potassium_hydroxide_gas.ignore.push("fertilizer","niter","ammonia");


elements.potassium_hydroxide.reactions["carbon_dioxide"] = { elem1: "potassium_carbonate", elem2: null};
elements.potassium_hydroxide_gas.reactions["carbon_dioxide"] = { elem1: "potassium_carbonate", elem2: null};
elements.potassium_hydroxide.ignore.push("carbon_dioxide","potassium_carbonate");
elements.potassium_hydroxide_gas.ignore.push("carbon_dioxide","potassium_carbonate");

elements.salt_water.reactions["mercury"] = { elem1:["sodium_hydroxide","chlorine","hydrogen"], charged:true, chance:0.02 };
elements.sodium_hydroxide.ignore.push("mercury");
elements.sodium_hydroxide.ignore.push("salt_water");
elements.potassium_salt_water.reactions["mercury"] = { elem1:["potassium_hydroxide","chlorine","hydrogen"], charged:true, chance:0.02 };
elements.potassium_hydroxide.ignore.push("mercury");
elements.potassium_hydroxide.ignore.push("potassium_salt_water");

acidReact("sodium_hydroxide","bauxite","sodium_aluminate_solution","red_mud",10);
acidReact("sodium_hydroxide_gas","bauxite","sodium_aluminate_solution","red_mud",10);
elements.red_mud.ignore.push("bauxite","sodium_aluminate_solution","sodium_aluminate_solution_ice","sodium_aluminate","molten_sodium_aluminate","sodium_carbonate_solution","spent_sodium_aluminate_solution","spent_sodium_aluminate_solution_ice","aluminum_hydroxide","alumina","molten_alumina");
elements.red_mud_gas.ignore.push("bauxite","sodium_aluminate_solution","sodium_aluminate_solution_ice","sodium_aluminate","molten_sodium_aluminate","sodium_carbonate_solution","spent_sodium_aluminate_solution","spent_sodium_aluminate_solution_ice","aluminum_hydroxide","alumina","molten_alumina");
elements.sodium_hydroxide.ignore.push("sodium_aluminate_solution","sodium_aluminate_solution_ice","sodium_aluminate","molten_sodium_aluminate","sodium_carbonate_solution","spent_sodium_aluminate_solution","spent_sodium_aluminate_solution_ice","aluminum_hydroxide","alumina","molten_alumina");
elements.sodium_hydroxide_gas.ignore.push("sodium_aluminate_solution","sodium_aluminate_solution_ice","sodium_aluminate","molten_sodium_aluminate","sodium_carbonate_solution","spent_sodium_aluminate_solution","spent_sodium_aluminate_solution_ice","aluminum_hydroxide","alumina","molten_alumina");



//Cryolite
acidReact("hydrofluoric_acid","sodium_aluminate","cryolite","fire",0);
acidReact("hydrofluoric_acid_gas","sodium_aluminate","cryolite","fire",0);

acidReact("hydrogen_fluoride","sodium_aluminate","cryolite","fire",0);
acidReact("liquid_hydrogen_fluoride","sodium_aluminate","cryolite","fire",0);

elements.hydrofluoric_acid.ignore.push("molten_cryolite","molten_sodium_aluminate");
elements.hydrofluoric_acid_gas.ignore.push("molten_cryolite","molten_sodium_aluminate");
elements.hydrogen_fluoride.ignore.push("molten_cryolite","molten_sodium_aluminate");
elements.liquid_hydrogen_fluoride.ignore.push("molten_cryolite","molten_sodium_aluminate");

acidReact("hexafluorosilicic_acid","sodium_aluminate","cryolite","sand",0);
acidReact("hexafluorosilicic_acid_gas","sodium_aluminate","cryolite","sand",0);
elements.hexafluorosilicic_acid.ignore.push("molten_cryolite","molten_sodium_aluminate");
elements.hexafluorosilicic_acid_gas.ignore.push("molten_cryolite","molten_sodium_aluminate");

//Aluminum trifluoride
acidReact("hydrofluoric_acid","alumina","aluminum_trifluoride","fire",0);
acidReact("hydrofluoric_acid_gas","alumina","aluminum_trifluoride","fire",0);

acidReact("hydrogen_fluoride","alumina","aluminum_trifluoride","fire",0);
acidReact("liquid_hydrogen_fluoride","alumina","aluminum_trifluoride","fire",0);

elements.hydrofluoric_acid.ignore.push("molten_alumina","molten_aluminum_trifluoride");
elements.hydrofluoric_acid_gas.ignore.push("molten_alumina","molten_aluminum_trifluoride");
elements.hydrogen_fluoride.ignore.push("molten_alumina","molten_aluminum_trifluoride");
elements.liquid_hydrogen_fluoride.ignore.push("molten_alumina","molten_aluminum_trifluoride");


acidReact("hydrofluoric_acid","aluminum_hydroxide","aluminum_trifluoride","fire",0);
acidReact("hydrofluoric_acid_gas","aluminum_hydroxide","aluminum_trifluoride","fire",0);

acidReact("hydrogen_fluoride","aluminum_hydroxide","aluminum_trifluoride","fire",0);
acidReact("liquid_hydrogen_fluoride","aluminum_hydroxide","aluminum_trifluoride","fire",0);

acidReact("hydrofluoric_acid","sodium_hydroxide","sodium_fluoride","fire",0);
acidReact("hydrofluoric_acid_gas","sodium_hydroxide","sodium_fluoride","fire",0);
acidReact("hydrofluoric_acid","sodium_hydroxide_gas","sodium_fluoride","fire",0);
acidReact("hydrofluoric_acid_gas","sodium_hydroxide_gas","sodium_fluoride","fire",0);

elements.sodium_hydroxide.ignore.push("sodium_fluoride");
elements.sodium_hydroxide_gas.ignore.push("sodium_fluoride");


elements.sodium_hydroxide.ignore.push("sodium_methoxide","methanol");
elements.sodium_hydroxide_gas.ignore.push("sodium_methoxide","methanol");
elements.sodium_hydroxide.ignore.push("sodium_methoxide","methanol");
elements.sodium_hydroxide_gas.ignore.push("sodium_methoxide","methanol");

acidReact("fluoroboric_acid","sodium_hydroxide","sodium_tetrafluoroborate",null,50);
acidReact("fluoroboric_acid_gas","sodium_hydroxide","sodium_tetrafluoroborate",null,50);
acidReact("fluoroboric_acid","sodium_hydroxide_gas","sodium_tetrafluoroborate",null,50);
acidReact("fluoroboric_acid_gas","sodium_hydroxide_gas","sodium_tetrafluoroborate",null,50);


acidNeutralize("sodium_hydride");

elements.bless.reactions["FOOF"] = {elem2: "oxygen"};
elements.bless.reactions["solid_FOOF"] = {elem2: "oxygen"};
elements.bless.reactions["fluorine"] = {elem2: null};
elements.bless.reactions["liquid_fluorine"] = {elem2: null};
elements.bless.reactions["fluorine_ice"] = {elem2: null};
elements.bless.reactions["hydrogen_fluoride"] = {elem2: "hydrogen"};
elements.bless.reactions["liquid_hydrogen_fluoride"] = {elem2: "hydrogen"};
elements.bless.reactions["hydrogen_fluoride_ice"] = {elem2: "hydrogen"};
elements.bless.reactions["hydrofluoric_acid"] = {elem2: "hydrogen"};
elements.bless.reactions["hydrofluoric_acid_ice"] = {elem2: "hydrogen"};
elements.bless.reactions["francium"] = {elem2: null};
elements.bless.reactions["molten_francium"] = {elem2: null};
elements.bless.reactions["astatine"] = {elem2: null};
elements.bless.reactions["molten_astatine"] = {elem2: null};
elements.bless.reactions["big_pop"] = {elem2: null};
elements.bless.reactions["rad_pop"] = {elem2: null};
elements.bless.reactions["radon"] = {elem2: null};
elements.bless.reactions["polonium"] = {elem2: null};
elements.bless.reactions["molten_polonium"] = {elem2: null};
elements.bless.reactions["neutronium"] = {elem2: "neutron"};
elements.bless.reactions["liquid_neutronium"] = {elem2: "neutron"};
elements.bless.reactions["quark_matter"] = {elem2: ["neutron","proton"]};
elements.bless.reactions["gamma_ray_burst"] = {elem2: null};
elements.bless.reactions["nitrogen_dioxide"] = {elem2: "oxygen"};
elements.bless.reactions["liquid_nitrogen_dioxide"] = {elem2: "oxygen"};
elements.bless.reactions["sulfur_dioxide"] = {elem2: "oxygen"};
elements.bless.reactions["liquid_sulfur_dioxide"] = {elem2: "oxygen"};
elements.bless.reactions["sulfur_dioxide_ice"] = {elem2: "oxygen"};
elements.bless.reactions["hydrogen_sulfide"] = {elem2: "hydrogen"};
elements.bless.reactions["liquid_hydrogen_sulfide"] = {elem2: "hydrogen"};
elements.bless.reactions["rocket_fuel"] = {elem2: null};


elements.FOOF.ignore.push("foof_grass","foof_grass_seed");
elements.solid_FOOF.ignore.push("foof_grass","foof_grass_seed");
elements.fluorine.ignore.push("foof_grass","foof_grass_seed");
elements.liquid_fluorine.ignore.push("foof_grass","foof_grass_seed");

elements.foof_grass= {
    color: ["#980909","#8b2708","#852a11","#7b1212","#6d1d13"],
    tick: function(pixel) {
        if (!tryMove(pixel,pixel.x,pixel.y+1)) {
            if (pixel.h < 2 && Math.random() < 0.0005 && isEmpty(pixel.x,pixel.y-1)) {
                createPixel(pixel.element,pixel.x,pixel.y-1);
                pixelMap[pixel.x][pixel.y-1].h = pixel.h+1;
            }
            var coords = [
                [pixel.x+1,pixel.y],
                [pixel.x-1,pixel.y],
                [pixel.x+1,pixel.y+1],
                [pixel.x-1,pixel.y+1],
            ];
            for (var i = 0; i < coords.length; i++) {
                if (Math.random() < 0.005 && isEmpty(coords[i][0],coords[i][1])) {
                    if (!isEmpty(coords[i][0],coords[i][1]+1,true)) {
                        var soil = pixelMap[coords[i][0]][coords[i][1]+1];
                        if (eLists.SOIL.indexOf(soil.element) !== -1) {
                            createPixel(pixel.element,coords[i][0],coords[i][1]);
                        }
                    }
                }
            }
        }
        doDefaults(pixel);
    },
    properties: {
        "h": 0
    },
    reactions: {
        "vinegar": { elem1:"explosion", elem2:null, chance:0.035 },
        "mercury": { elem1:"explosion", elem2:null, chance:0.01 },
    },
	temp: -120,
	tempHigh: -57,
	stateHigh: ["oxygen","fluorine","explosion"],
    tempLow: -200,
    stateLow: "solid_FOOF",
    burn:50,
    burnTime:20,
    breakInto: "FOOF",
    category:"life",
    state: "solid",
    density: 1400,
    hidden: true,
    seed: "foof_grass_seed"
};


elements.foof_grass_seed = {
    color: ["#980909","#8b2708","#852a11","#7b1212","#6d1d13"],
    behavior: [
        "XX|M2%0.05|XX",
        "XX|L2:grass|XX",
        "XX|M1|XX",
    ],
	temp: -120,
	tempHigh: -57,
	stateHigh: ["oxygen","fluorine","explosion"],
    tempLow: -200,
    stateLow: "solid_FOOF",
    burn: 50,
    burnTime: 20,
    category: "life",
    state: "solid",
    density: 1400,
    breakInto: "FOOF",
    hidden: true,
    cooldown: defaultCooldown,
    seed: true
};