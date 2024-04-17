function toObject(color)
{
    color = color.match(/\d+/g);
    return color;
}

function react(elem1,elem2,product1,product2,temp)
{
    elements[elem1].reactions[elem2] = { "elem1": product1, "elem2": product2, "temp1": temp, "temp2": temp };
}
function acidReact(elem1,elem2,product1,product2,temp = 0)
{
    if(elements[elem1] && elements[elem1].ignore)
    {
        if(product1 !== null)
        {
            if(product1 instanceof Array)
            {
                elements[elem1].ignore.push(...product1);
            }
        }
        if(product2 !== null)
        {
            if(product2 instanceof Array)
            {
                elements[elem1].ignore.push(...product2);
            }
        }
        elements[elem1].ignore.push(elem2);
    }
    if(elements[elem2] && elements[elem2].ignore)
    {
        if(product1 !== null)
        {
            if(product1 instanceof Array)
            {
                elements[elem2].ignore.push(...product1);
            }
        }
        if(product2 !== null)
        {
            if(product2 instanceof Array)
            {
                elements[elem2].ignore.push(...product2);
            }
        }
        elements[elem2].ignore.push(elem1);
    }
    if(product1 !== null)
        if(elements[product1] && elements[product1].ignore)
        {
            if(product2 !== null)
                elements[product1].ignore.push(product2);
            elements[product1].ignore.push(elem1);
            elements[product1].ignore.push(elem2);
        }
    if(product2 !== null)
        if(elements[product2] && elements[product2].ignore)
        {
            if(product1 !== null)
                elements[product2].ignore.push(product1);
            elements[product2].ignore.push(elem1);
            elements[product2].ignore.push(elem2);
        }
    if(!elements[elem1].reactions[elem2])
    {
        elements[elem1].reactions[elem2] = { "elem1": product1, "elem2": product2, "temp1": temp, "temp2": temp };
    }
}

elements.fluorine = {
	color: "#FFFFBF",
	behavior: behaviors.GAS,
	ignore: ["foof","solid_foof","oxygen","liquid_oxygen","oxygen_ice","chlorine","liquid_chlorine","liquid_hydrogen_fluoride","liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_acid","hydrofluoric_ice","hydrofluoric_acid_gas","fire","smoke","acid_gas","neutral_acid","acid","acid_cloud","water","salt_water","sugar_water","dirty_water","steam","gold","hydrogen","polytetrafluoroethylene","molten_polytetrafluoroethylene","tungsten","tungsten_hexafluoride"],
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
		"liquid_oxygen": { "elem1": "foof", "elem2": null },
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
	ignore: ["foof","solid_foof","oxygen","liquid_oxygen","oxygen_ice","chlorine","liquid_chlorine","liquid_hydrogen_fluoride","liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","hydrofluoric_acid","hydrofluoric_ice","hydrofluoric_acid_gas","fire","smoke","acid_gas","neutral_acid","acid","acid_cloud","water","salt_water","sugar_water","dirty_water","steam","seltzer","pool_water","primordial_soup","gold","hydrogen","polytetrafluoroethylene","molten_polytetrafluoroethylene","tungsten","tungsten_hexafluoride"],
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
    density: 1020,
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
    category: "liquids",
	hidden: true,
	density: 1.7,
	stain: 0.005,
	temp: -20.5,
	tempHigh: -19.5,
	stateHigh: "hydrogen_fluoride",
	tempLow: -83.6,
};


runAfterLoad(function() {
    reactList("fluorine", eLists.WATER, { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" });
    reactList("liquid_fluorine", eLists.WATER, { "elem1": "hydrofluoric_acid", "elem2": "hydrogen" });
    reactList("hydrogen_fluoride", eLists.WATER, { "elem1": "hydrofluoric_acid", "elem2": null });
    reactList("liquid_hydrogen_fluoride", eLists.WATER, { "elem1": "hydrofluoric_acid", "elem2": null });
});

elements.foof = {
	color: "#fa1e1e",
	behavior: behaviors.LIQUID,
	ignore: ["foof","solid_foof","fluorine","liquid_fluorine","fluorine_ice","liquid_oxygen","oxygen_ice","oxygen","fire","polytetrafluoroethylene","molten_polytetrafluoroethylene"],
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
	stateLow: "solid_foof",
    reactions: {}
};

elements.solid_foof = {
	color: "#fa4a1e",
	behavior: behaviors.WALL,
	ignore: ["foof","solid_foof","fluorine","liquid_fluorine","fluorine_ice","liquid_oxygen","oxygen_ice","oxygen","fire","polytetrafluoroethylene","molten_polytetrafluoroethylene"],
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
	stateHigh: "foof",
};


elements.tungsten_hexafluoride = {color: "#f5f57a",behavior: behaviors.GAS,tempLow: 17.1,state: "gas",category:"gases",density: 12.4,stain: 0.005,
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
};



elements.liquid_tungsten_hexafluoride = {density: 4560,tempLow: 2.3,};

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
    "caustic_potash": { "elem1":"neutral_acid", "elem2":null },
    "radium_hydroxide": { "elem1":"neutral_acid", "elem2":null },
    "actinium_hydroxide": { "elem1":"neutral_acid", "elem2":null },
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


eListAdd("CAUSTIC", ["acid", "acid_gas", "fluorine", "liquid_fluorine", "hydrofluoric_acid", "hydrofluoric_acid_gas", "hydrogen_fluoride", "liquid_hydrogen_fluoride"]);
eListAdd("CAUSTICIGNORE", []);

eListAdd("ACID", ["acid", "hydrofluoric_acid"]);
eListAdd("ACIDGAS", ["acid_gas", "hydrofluoric_acid_gas"]);


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
function createAcid(name,reactions, gasReactions, color, categoryhidden, categoryhiddenGas, tempHigh, tempLowGas, tempLow, tempHighGas, density, densityGas, type, compound = "acid")
{
	elements[name] = {
        forceAutoGen: true,
		color: color,
		behavior: [
			"XX|DB%5|XX",
			"DB%5 AND M2|XX|DB%5 AND M2",
			"DB%5 AND M2|DB%10 AND M1|DB%5 AND M2",
		],
		ignore: defaultAcidIgnore.concat(eLists.CAUSTICIGNORE),
		reactions: reactions,
		category: "liquids",
        hidden: categoryhidden,
		tempHigh: tempHigh,
		stateHigh: name + "_gas",
		tempLow: tempLow,
		state: "liquid",
		density: density
	}
	elements[name+"_gas"] = {
		behavior: [
			"M1|DB%5 AND M1|M1",
			"DB%5 AND M1|XX|DB%5 AND M1",
			"DB%5 AND M1|DB%10 AND M1|DB%5 AND M1",
		],
		ignore: defaultAcidGasIgnore.concat(eLists.CAUSTICIGNORE),
		reactions: gasReactions,
		category: "gases",
        hidden: categoryhiddenGas,
		tempHigh: tempHighGas,
		stateHigh: "fire",
		tempLow: tempLowGas,
        stateLow: name,
        temp: tempLowGas + 20,
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
    eLists.CAUSTIC.push(name, name+"_gas");
    acidIgnore([name, name + "_gas", name + "_ice", name + "_cloud"]);
    if(type) {
        eListAddIon(type, [name, name+"_gas"], compound);
    }
    if(compound == "acid") {
        eListAddIon("HYDROGEN", [name, name+"_gas"], compound);
    }
}

function eListAddIon(listName, itemList, compoundType = "default", priority = 0)
{
    eListAdd(listName, itemList);
    if (typeof itemList === "string") { itemList = [itemList]; }
    for (var i = 0; i < itemList.length; i++) {
        if(!elements[itemList[i]]) {
            elements[itemList[i]] = {};
        }
        if (!elements[itemList[i]].salt) {
            elements[itemList[i]].salt = {};
        }
        if (!elements[itemList[i]].salt[compoundType]) {
            elements[itemList[i]].salt[compoundType] = {};
            elements[itemList[i]].salt[compoundType].priority = priority;
            elements[itemList[i]].salt[compoundType].components = [];
        }
        if (elements[itemList[i]].salt[compoundType].components.indexOf(listName) === -1) {
            elements[itemList[i]].salt[compoundType].components.push(listName);
        }
    }
}

function acidIgnore(ignore)
{
    for(let i = 0; i < eLists.CAUSTIC.length; i++)
    {
        elements[eLists.CAUSTIC[i]].ignore = elements[eLists.CAUSTIC[i]].ignore.concat(ignore);
    }
    eLists.CAUSTICIGNORE = eLists.CAUSTICIGNORE.concat(ignore);
}

eListAdd("WATER", ["water", "salt_water", "sugar_water", "dirty_water", "neutral_acid", "seltzer", "pool_water", "primordial_soup"]);
function reactList(element, list, reaction) {
    for(let i = 0; i < list.length; i++)
    {
        acidReact(element, list[i], reaction.elem1, reaction.elem2);
        elements[element].reactions[list[i]] = reaction;
    }
}

function createSalt(name,nameWater,color,colorWater,hidden,hiddenWater,tempHigh,tempLowWater,tempHighWater,density,densityWater,cation,anion)
{
    if(!elements[name])
    {
        elements[name] = {
            color: color,
            behavior: behaviors.POWDER,
            category: "powders",
            density: density,
            state: "solid",
            tempHigh: tempHigh,
            reactions: {
                "ice": { elem1:null, elem2:nameWater, chance:0.1 },
                "rime": { elem1:null, elem2:nameWater, chance:0.075 },
                "snow": { elem1:null, elem2:nameWater, chance:0.25 },
                "packed_snow": { elem1:null, elem2:nameWater, chance:0.05 },
                "packed_ice": { elem1:null, elem2:nameWater, chance:0.01 },
                "water": { elem2: nameWater, elem1: null }
            },
            hidden: hidden
        }
    }
    if(!elements[nameWater])
    {
        
        elements[nameWater] = {
            color: colorWater,
            behavior: behaviors.LIQUID,
            tempHigh: tempHighWater,
            stateHigh: ["steam",name],
            tempLow: tempLowWater,
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
                "aluminum": { elem1:["hydrogen","hydrogen","oxygen",name], charged:true, chance:0.0025 },
                "zinc": { elem1:["hydrogen","hydrogen","oxygen",name], charged:true, chance:0.015 },
                "steel": { elem1:["hydrogen","hydrogen","oxygen",name], charged:true, chance:0.0125 },
                "iron": { elem1:["hydrogen","hydrogen","oxygen",name], charged:true, chance:0.0125 },
                "tin": { elem1:["hydrogen","hydrogen","oxygen",name], charged:true, chance:0.01 },
                "lead": { elem1:["hydrogen","hydrogen","oxygen",name], charged:true, chance:0.01 },
                "brass": { elem1:["hydrogen","hydrogen","oxygen",name], charged:true, chance:0.001 },
                "bronze": { elem1:["hydrogen","hydrogen","oxygen",name], charged:true, chance:0.001 },
                "copper": { elem1:["hydrogen","hydrogen","oxygen",name], charged:true, chance:0.0075 },
                "silver": { elem1:["hydrogen","hydrogen","oxygen",name], charged:true, chance:0.0075 },
                "gold": { elem1:["hydrogen","hydrogen","oxygen",name], charged:true, chance:0.0075 },
                "fire": { elem2: "smoke" },
                "snow": { elem2:"slush" },
                "rat": { elem1:"dirty_water", chance:0.2 },
                "slug": { elem2: "slime", elem1: null },
                "snail": { elem2: "calcium", elem1: null },
                "torch": { elem2:"wood" },
                "light": { "color2":"#a1bac9" },
                "sawdust": { elem2:"cellulose", elem1:null },
                "oxygen": { elem2:"foam" },
                "paper": { elem2:"cellulose", elem1:null },
                "pollen": { elem2: null },
                "soda": { elem1:"foam", chance:0.01 },
                "ice_nine": { elem1: "ice_nine" },
                "ant_wall": { elem2:["mud","mud","wet_sand"], elem1:null, chance:0.007 },
                "iron": { elem2:"rust", chance:0.005 },
                "copper": { elem2:"oxidized_copper", chance:0.005 },
                "steel": { elem2:"rust", chance:0.004 },
                "bronze": { elem2:"oxidized_copper", chance:0.0025 },
                "soap": { elem1: "water" },
                "soap": { elem2: ["foam","bubble"], chance:0.005 },
                "dye": { elem2:null, chance:0.05 },
                "ink": { elem2:null, chance:0.01 },
                "sodium": { elem2:["pop","pop","pop","hydrogen"], chance:0.01, temp1:250 },
                "molten_sodium": { elem2:["pop","pop","pop","hydrogen"], chance:0.01, temp1:250 },
                "radiation": { elem2:"rad_steam", chance:0.4 },
                "confetti": { elem2:[null,"cellulose"], chance:0.001 },
                "greek_fire": { func: function(p,pixel){if (!pixel.burning) { pixel.burning=true; pixel.burnStart=pixelTick }}},
            },
            state: "liquid",
            density: densityWater,
            conduct: 0.1,
            stain: -0.66,
            hidden: hiddenWater
        };
    }
    eListAddIon(cation, [name,nameWater,"molten_" + name]);
    eListAddIon(anion, [name,nameWater,"molten_" + name]);
    eListAdd("WATER", nameWater);
    eListAdd("COMPOUND", name);
}

createSalt("salt","salt_water",null,null,false,false,0,0,0,0,0,"SODIUM","CHLORIDE");


acidIgnore(["acid", "acid_gas", "acid_ice", "liquid_fluorine","fluorine","fluorine_ice","hydrogen_fluoride","liquid_hydrogen_fluoride","hydrogen_fluoride_ice","hydrofluoric_acid_ice","hydrofluoric_acid","hydrofluoric_acid_gas","hydrofluoric_acid_cloud","acid_cloud"]);
elements.acid.name = "hydrochloricAcid";
elements.acid_gas.name = "hydrochloricAcidGas";
eListAddIon("CHLORIDE", ["acid", "acid_gas"],"acid");
eListAddIon("HYDROGEN", ["acid", "acid_gas"],"acid");
eListAddIon("FLUORIDE", ["hydrofluoric_acid", "hydrofluoric_acid_gas"],"acid");
eListAddIon("HYDROGEN", ["hydrofluoric_acid", "hydrofluoric_acid_gas"],"acid");

createAcid("generic_acid",defaultAcidReactions,defaultAcidGasReactions,"#80d488",true,true,110,100,-10,400,1020,1)
elements.generic_acid.name = "acid";
elements.generic_acid_gas.name = "acid_gas";

eLists.ACID.push("generic_acid")
eLists.ACIDGAS.push("generic_acid_gas");

if (!enabledMods.includes("mods/generative_mods.js")) {
    elements.acid_cloud.behavior = [
                        "XX|XX|XX",
                        "XX|CH:generic_acid%0.05|M1%2.5 AND BO",
                        "XX|XX|XX",
                    ];
}

createAcid("nitric_acid",structuredClone(defaultAcidReactions),structuredClone(defaultAcidGasReactions),["#91993c","#6b7041","#5f614b"],false,false,83,70,-42,400,1500,1.5,"NITRATE")

acidReact("nitric_acid","ammonia","fertilizer",null,0);
acidReact("nitric_acid_gas","ammonia","fertilizer",null,0);

eLists.ACID.push("nitric_acid")
eLists.ACIDGAS.push("nitric_acid_gas");

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

runAfterLoad(function() {
    reactList("nitrogen_dioxide", eLists.WATER, { "elem1":null, "elem2":"nitric_acid", "chance":0.01 });
});

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
		"steam": { "elem1": null, "elem2": "sulfuric_acid_gas" },
		"acid_gas": { "elem1": null, "elem2": "sulfuric_acid_gas" },
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


runAfterLoad(function() {
    reactList("sulfur_dioxide", eLists.WATER, { "elem1": null, "elem2": "sulfuric_acid" });
});

elements.liquid_sulfur_dioxide = {
	color: "#d1cb17",
	behavior: behaviors.LIQUID,
    category: "liquids",
	reactions: elements.sulfur_dioxide.reactions,
	tempHigh: -10,
    temp: -15,
	tempLow: -72,
    stateHigh: "sulfur_dioxide",
	state: "liquid",
	hidden: true,
	density: 1435,
};

elements.hydrogen_sulfide = {
    color: "#d9e366",
    behavior: behaviors.GAS,
    reactions: {
        "oxygen": { "elem2":"stench" },
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


runAfterLoad(function() {
    reactList("hydrogen_sulfide", eLists.WATER, { "elem1":null, "elem2":"dirty_water" });
});

acidIgnore(["sulfur_dioxide","liquid_sulfur_dioxide","sulfur_dioxide_ice"]);

elements.acid.ignore.push("liquid_hydrogen_sulfide");
elements.acid_gas.ignore.push("liquid_hydrogen_sulfide");

acidReact("acid","pyrite","iron_dichloride_solution","hydrogen_sulfide",50);
acidReact("acid_gas","pyrite","iron_dichloride_solution","hydrogen_sulfide",50);


function blendColors(colorA, colorB, amount = 0.5) {
    const [rA, gA, bA] = colorA.match(/\w\w/g).map((c) => parseInt(c, 16));
    const [rB, gB, bB] = colorB.match(/\w\w/g).map((c) => parseInt(c, 16));
    const r = Math.round(rA + (rB - rA) * amount).toString(16).padStart(2, '0');
    const g = Math.round(gA + (gB - gA) * amount).toString(16).padStart(2, '0');
    const b = Math.round(bA + (bB - bA) * amount).toString(16).padStart(2, '0');
    return '#' + r + g + b;
}

createSalt("iron_dichloride","iron_dichloride_solution",["#207d09","#b51259"],[blendColors("#207d09","#2167ff",0.5),blendColors("#b51259","#2167ff",0.5)],false,true,307.6,-2,102,2900,1030,"IRONII","CHLORIDE");

createAcid("sulfuric_acid",structuredClone(defaultAcidReactions),structuredClone(defaultAcidGasReactions),["#e9e05e","#c2bd7a","#9e9c7b"],false,false,337,337,10,500,1830,1.26,"SULFATE")

elements.sulfuric_acid.ignore.push("charcoal");
elements.sulfuric_acid_gas.ignore.push("charcoal");

runAfterLoad(function() {
    reactList("sulfuric_acid", eLists.WATER, { "elem2":"dirty_water"});
});
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

eLists.ACID.push("sulfuric_acid")
eLists.ACIDGAS.push("sulfuric_acid_gas");

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
    category: "gases",
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
    category: "liquids",
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
    forceAutoGen: true,
};
elements.molten_titanium = {
    color: ["#e0921d", "#e89e2e", "#f7b24a", "#fce168", "#fceca2", "#fffcf0"],
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
    forceAutoGen: true
};
elements.molten_rutile = {
    color: ["#e3907f", "#e68f3e"],
    reactions: {
        "chlorine": { "elem1": "titanium_tetrachloride", "elem2":null },
    },
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
    stateLow: "solid_titanium_tetrachloride",
};
eListAddIon("TITANIUMIV","solid_titanium_tetrachloride");
eListAddIon("CHLORIDE","solid_titanium_tetrachloride");
eListAddIon("TITANIUMIV","titanium_tetrachloride");
eListAddIon("CHLORIDE","titanium_tetrachloride");
eListAddIon("TITANIUMIV","titanium_tetrachloride_gas");
eListAddIon("CHLORIDE","titanium_tetrachloride_gas");
eListAdd("INSOLUBLE","titanium_tetrachloride");
elements.titanium_tetrachloride_gas = {
    behavior: behaviors.GAS,
    hidden: true,
    category: "gases",
    density: 500,
    state: "gas",
    temp: 200,
    tempLow: 136.4,
    stateLow: "titanium_tetrachloride"
};
elements.solid_titanium_tetrachloride = {
    behavior: behaviors.WALL,
    hidden: true,
    category: "solids",
    density: 1728,
    state: "solid",
    temp: -50,
    tempHigh: -24,
    stateHigh: "titanium_tetrachloride"
};



createSalt("titanium_trichloride","titanium_trichloride_solution","#c71585",blendColors("#c71585","#2167ff",0.4),false,true,440,-2,102,2640,1020,"TITANIUMIII","CHLORIDE");

elements["titanium_trichloride"].behavior = behaviors.SOLID;
elements["titanium_trichloride"].category = "solids";
elements["titanium_trichloride"].stateHigh = ["chlorine","titanium_tetrachloride"];
delete elements["molten_titanium_trichloride"];

elements.magnesium.burnInto = "magnesium_oxide";
elements.molten_magnesium.burnInto = "magnesium_oxide";
elements.molten_magnesium.reactions = {
    "titanium_tetrachloride": { "elem1": "titanium", "elem2": "magnesium_chloride"},
    "titanium_tetrachloride_gas": { "elem1": "titanium", "elem2": "magnesium_chloride"},
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


eListAdd("INSOLUBLE","magnesium_oxide");
eListAddIon("MAGNESIUM","magnesium_oxide");
eListAddIon("OXIDE","magnesium_oxide");
eListAddIon("MAGNESIUM","molten_magnesium_oxide");
eListAddIon("OXIDE","molten_magnesium_oxide");


elements.molten_magnesium_chloride = {
    behaviorOn: [
        "XX|CR:fire%2.5|XX",
        "M2|CH:chlorine,magnesium%25|M2",
        "M1|M1|M1",
    ],
    conduct: 0.3,
};

createSalt("magnesium_chloride","magnesium_chloride_solution","#bfbfbf",blendColors("#bfbfbf","#2167ff",0.75),false,true,714,-2,102,2320,1015,"MAGNESIUM","CHLORIDE");

elements.magnesium_chloride.forceAutoGen = true;


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
        "steam": { "elem1":"radon", "elem2":"rad_pop"},
        "rad_steam": { "elem1":"radon", "elem2":"rad_pop"},
        "quark_matter": { "elem1":"stable_francium", "elem2":"quark_matter"}
    },
    tempHigh: 27,
    category: "powders",
    state: "solid",
    density: 2480,
    conduct: 0.70,
};

runAfterLoad(function() {
    reactList("francium", eLists.WATER, { "elem1":"radon", "elem2":"rad_pop"});
});

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
        "steam": { "elem1":"radon", "elem2":"rad_pop"},
        "rad_steam": { "elem1":"radon", "elem2":"rad_pop"},
        "quark_matter": { "elem1":"stable_francium", "elem2":"quark_matter"}
    },
    tempLow: 27,
    hidden: true,
    state: "liquid",
    density: 2480,
    conduct: 0.70,
};

runAfterLoad(function() {
    reactList("molten_francium", eLists.WATER, { "elem1":"radon", "elem2":"rad_pop"});
});


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
    tempHigh: 301,
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
    tempLow: 301,
    hidden: true,
    state: "liquid",
    density: 8910,
    tempHigh: 336,
};
elements.astatine_gas = {
    behavior: [
        "M2|M1 AND CR:radiation%50|M2",
        "M1 AND CR:radiation%50|CH:polonium,big_pop%0.1|M1 AND CR:radiation%50",
        "M2|M1 AND CR:radiation%50|M2",
    ],
    reactions: {
        "quark_matter": { "elem1":"molten_stable_astatine", "elem2":"quark_matter"}
    },
    tick: function(pixel) {
        pixel.temp += 5;
    }
}

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
    tempHigh: 301,
    reactions: {
        "steam": { "elem1":"hydroastatic_acid", "elem2":null},
        "rad_steam": { "elem1":"hydroastatic_acid", "elem2":null},
    },
    category: "powders",
    state: "solid",
    hidden: true,
    density: 8910,
};


runAfterLoad(function() {
    reactList("stable_astatine", eLists.WATER, { "elem1":"hydroastatic_acid", "elem2":null});
});

elements.molten_stable_astatine = {
    color: [blendColors("#aab0a0","#ff0000"),blendColors("#aab0a0","#00ff00"),blendColors("#aab0a0","#0000ff")],
    behavior: behaviors.LIQUID,
    tempLow: 301,
    reactions: {
        "steam": { "elem1":"hydroastatic_acid", "elem2":null},
        "rad_steam": { "elem1":"hydroastatic_acid", "elem2":null},
    },
    hidden: true,
    state: "liquid",
    density: 8910,
    tempHigh: 336,
};


runAfterLoad(function() {
    reactList("molten_stable_astatine", eLists.WATER, { "elem1":"hydroastatic_acid", "elem2":null});
});

createAcid("hydroastatic_acid",structuredClone(defaultAcidReactions),structuredClone(defaultAcidGasReactions),[blendColors("#5a5e5a","#ff0000",.25),blendColors("#5a5e5a","#00ff00",.25),blendColors("#5a5e5a","#0000ff",.25)],true,true,100,100,0,1000,1200,1,"ASTATIDE")

elements.hydroastatic_acid.ignore.push("astatine","molten_astatine","stable_astatine","molten_stable_astatine");
elements.hydroastatic_acid_gas.ignore.push("astatine","molten_astatine","stable_astatine","molten_stable_astatine");

eLists.ACID.push("hydroastatic_acid");
eLists.ACIDGAS.push("hydroastatic_acid_gas");



runAfterLoad(function() {
    reactList("hydroastatic_acid", eLists.WATER, {"elem2":"dirty_water"});
});

elements.polonium_dioxide = {
    color: [blendColors("#ffff7f","#ff0000"), blendColors("#ffff7f","#00ff00"), blendColors("#ffff7f","#0000ff")],
    behavior: behaviors.POWDER,
    tempHigh: 500,
    hidden: true,
    state: "solid",
    density: 8900,
    category: "powders",
};

eListAdd("INSOLUBLE","polonium_dioxide");
eListAddIon("POLONIUMIV","polonium_dioxide");
eListAddIon("OXIDE","polonium_dioxide");
eListAddIon("POLONIUMIV","molten_polonium_dioxide");
eListAddIon("OXIDE","molten_polonium_dioxide");


createSalt("magnesium_polonide","magnesium_polonide_solution",[blendColors("#b5b5b5","#ff0000",.25),blendColors("#b5b5b5","#00ff00",.25),blendColors("#b5b5b5","#0000ff",.25)],[blendColors("#2167ff","#ff0000",0.25),blendColors("#2167ff","#00ff00",0.25),blendColors("#2167ff","#0000ff",0.25)],true,true,1800,-2,102,6700,1050,"MAGNESIUM","POLONIDE");


acidReact("acid","magnesium_polonide","magnesium_chloride_solution","polonium_hydride",100);
acidReact("acid_gas","magnesium_polonide","magnesium_chloride_solution","polonium_hydride",100);
acidReact("acid","molten_magnesium_polonide","magnesium_chloride_solution","polonium_hydride",100);
acidReact("acid_gas","molten_magnesium_polonide","magnesium_chloride_solution","polonium_hydride",100);
elements.acid.ignore.push("polonium_hydride_ice","polonium_hydride_gas","magnesium_chloride");
elements.acid_gas.ignore.push("polonium_hydride_ice","polonium_hydride_gas","magnesium_chloride");

elements.polonium_hydride = {
    density: 2450,
    color: [blendColors("#838396","#ff0000"), blendColors("#838396","#00ff00"), blendColors("#838396","#0000ff")],
    hidden: true,
    state: "liquid",
    behavior: behaviors.LIQUID,
    tempLow: -35.3,
    tempHigh: 36.1,
    stain: 0.05,
    burn: 1,
    burnTime: 10,
    burnInto: ["polonium_dioxide","steam"],
    category: "liquids",
};

elements.polonium_hydride_gas = {
    density: 8.29,
};

elements.stable_francium = {
    color: [blendColors("#3eff3b","#ff0000"),blendColors("#3eff3b","#00ff00"),blendColors("#3eff3b","#0000ff")],
    behavior: behaviors.POWDER,
    reactions: {
        "steam": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "rad_steam": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
    },
    tempHigh: 27,
    category: "powders",
    state: "solid",
    density: 2480,
    hidden: true,
    conduct: 0.70,
};


runAfterLoad(function() {
    reactList("stable_francium", eLists.WATER, { "elem1":"francium_hydroxide", "elem2":"big_pop"});
});


elements.molten_stable_francium = {
    color: [blendColors("#9ff31e","#ff0000"),blendColors("#9ff31e","#00ff00"),blendColors("#9ff31e","#0000ff")],
    behavior: behaviors.LIQUID,
    reactions: {
        "steam": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
        "rad_steam": { "elem1":"francium_hydroxide", "elem2":"big_pop"},
    },
    tempLow: 27,
    state: "liquid",
    hidden: true,
    density: 2480,
    conduct: 0.70,
};

runAfterLoad(function() {
    reactList("molten_stable_francium", eLists.WATER, { "elem1":"francium_hydroxide", "elem2":"big_pop"});
});

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

createSalt("potassium_salt","potassium_salt_water",["#f2f2f2","#e0e0e0"],"#416ed1",false,false,292,-2,102,3980,1026,"POTASSIUM","CHLORIDE");

elements.potassium.reactions = {
    "chlorine": { elem1:"potassium_salt", elem2:null, chance:0.05 },
    "smog": { elem1:["potassium_hydroxide","pop"], elem2:["hydrogen","pop","fire"], chance:0.01, temp2:400 },
    "electric": { elem1:[null,"pop"], elem2:["pop","fire"], chance:0.05, temp2:400 },
};

runAfterLoad(function() {
    reactList("potassium", eLists.WATER, { elem1:["potassium_hydroxide","pop"], elem2:["hydrogen","pop","fire"], chance:0.01, temp2:400 });
});

elements.molten_potassium.reactions = {
    "chlorine": { elem1:"potassium_salt", elem2:null, chance:0.05 },
    "smog": { elem1:["potassium_hydroxide","pop"], elem2:["hydrogen","pop","fire"], chance:0.01, temp2:400 },
    "electric": { elem1:[null,"pop"], elem2:["pop","fire"], chance:0.05, temp2:400 },
};

runAfterLoad(function() {
    reactList("molten_potassium", eLists.WATER, { elem1:["potassium_hydroxide","pop"], elem2:["hydrogen","pop","fire"], chance:0.01, temp2:400 });
});

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
createSalt("niter","niter_solution","#f0efcc",blendColors("#f0efcc","#2167ff",0.75),false,true,334,-2,102,2109,1011,"POTASSIUM","NITRATE");
elements["niter"].stateHigh = "fire";
elements["niter"].reactions = Object.assign(elements["niter"].reactions,{
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
	});
elements["niter_solution"].reactions = Object.assign(elements["niter_solution"].reactions,{
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
		"sulfur": { "elem1":"gunpowder", "elem2": "water"},
	});
delete elements["molten_niter"];


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


eListAddIon("CALCIUM","fluorite");
eListAddIon("FLUORIDE","fluorite");
eListAddIon("CALCIUM","molten_fluorite");
eListAddIon("FLUORIDE","molten_fluorite");
eListAdd("INSOLUBLE","fluorite");
eListAddIon("CALCIUM","chalk");
eListAddIon("SULFATE","chalk");
eListAddIon("CALCIUM","molten_chalk");
eListAddIon("SULFATE","molten_chalk");
eListAdd("INSOLUBLE","chalk");

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

createAcid("hexafluorosilicic_acid",structuredClone(defaultAcidReactions),structuredClone(defaultAcidGasReactions),["#ebeed8","#f9ffc2","#c7e189"],true,true,100,100,0,1000,1460,1,"HEXAFLUOROSILICATE")

eLists.ACID.push("hexafluorosilicic_acid");
eLists.ACIDGAS.push("hexafluorosilicic_acid_gas");


elements.hydrofluoric_acid.ignore.push("sand","hexafluorosilicic_acid","hexafluorosilicic_acid_gas","potassium_carbonate","potassium_fluoride","carbon_dioxide","hydrogen");
elements.hydrofluoric_acid_gas.ignore.push("sand","hexafluorosilicic_acid","hexafluorosilicic_acid_gas","potassium_carbonate","potassium_fluoride","carbon_dioxide","hydrogen");
elements.hydrogen_fluoride.ignore.push("sand","hexafluorosilicic_acid","hexafluorosilicic_acid_gas","potassium_carbonate","potassium_fluoride","carbon_dioxide","hydrogen");
elements.liquid_hydrogen_fluoride.ignore.push("sand","hexafluorosilicic_acid","hexafluorosilicic_acid_gas","potassium_carbonate","potassium_fluoride","carbon_dioxide","hydrogen");
elements.hexafluorosilicic_acid.ignore.push("sand");
elements.hexafluorosilicic_acid_gas.ignore.push("sand");

acidReact("hydrofluoric_acid","sand","hexafluorosilicic_acid","fire",0);
acidReact("hydrofluoric_acid_gas","sand","hexafluorosilicic_acid","fire",0);
acidReact("hydrofluoric_acid","potassium_carbonate","potassium_fluoride_solution","carbon_dioxide",100);
acidReact("hydrofluoric_acid_gas","potassium_carbonate","potassium_fluoride_solution","carbon_dioxide",100);
acidReact("hydrogen_fluoride","potassium_carbonate","potassium_fluoride_solution","carbon_dioxide",100);
acidReact("liquid_hydrogen_fluoride","potassium_carbonate","potassium_fluoride_solution","carbon_dioxide",100);


acidReact("hydrofluoric_acid","potassium_carbonate_solution","potassium_fluoride_solution","carbon_dioxide",100);
acidReact("hydrofluoric_acid_gas","potassium_carbonate_solution","potassium_fluoride_solution","carbon_dioxide",100);
acidReact("hydrogen_fluoride","potassium_carbonate_solution","potassium_fluoride_solution","carbon_dioxide",100);
acidReact("liquid_hydrogen_fluoride","potassium_carbonate_solution","potassium_fluoride_solution","carbon_dioxide",100);

acidReact("hydrofluoric_acid","potassium_fluoride","fluorine","potassium_fluoride_solution",100);
acidReact("hydrofluoric_acid_gas","potassium_fluoride","fluorine","potassium_fluoride_solution",100);
acidReact("hydrofluoric_acid","potassium_fluoride","fluorine",["potassium_fluoride_solution",null],100);
acidReact("hydrofluoric_acid_gas","potassium_fluoride","fluorine",["potassium_fluoride_solution",null],100);

elements.fluorine.ignore.push("sand","potassium_carbonate","potassium_fluoride","carbon_dioxide");
elements.liquid_fluorine.ignore.push("sand","potassium_carbonate","potassium_fluoride","carbon_dioxide");

createSalt("potassium_carbonate","potassium_carbonate_solution","#e2e1e8",blendColors("#e2e1e8","#2167ff",0.75),true,true,891,-2,102,2430,1024,"POTASSIUM","CARBONATE");
createSalt("potassium_fluoride","potassium_fluoride_solution","#e8e8e1",blendColors("#e8e8e1","#2167ff",0.75),true,true,858,-2,102,2480,1020,"POTASSIUM","FLUORIDE");


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
        "sodium": { elem1:"sodium_bromide", elem2:null },
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
        "sodium": { elem1:"sodium_bromide", elem2:null },
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

createSalt("potassium_bromide","potassium_bromide_solution",["#fccaca","#f7cbcb"],blendColors("#fccaca","#2167ff",0.75),false,true,734,-2,102,2740,1050,"POTASSIUM","BROMIDE");
createSalt("sodium_bromide","sodium_bromide_solution",["#f5f4ed","#f2f2eb"],blendColors("#f5f4ed","#2167ff",0.75),false,true,747,-2,102,3210,1040,"SODIUM","BROMIDE");

elements.silver_bromide = {
    color: ["#fcfcca","#f7f24f"],
    tick: function(pixel) {
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (!isEmpty(pixel.x+i,pixel.y+j,true) && Math.random() < 0.1 && (pixelMap[pixel.x+i][pixel.y+j].element === "light" || pixelMap[pixel.x+i][pixel.y+j].element === "laser" || pixelMap[pixel.x+i][pixel.y+j].element === "liquid_light")) {
                    
                    let coords = circleCoords(pixel.x+i,pixel.y+j,20);
                    for (var n = 0; n < coords.length; n++) {
                        k = coords[n].x;
                        l = coords[n].y;
                        distance = (k-pixel.x-i)*(k-pixel.x-i) + (l-pixel.y-j)*(l-pixel.y-j);
                        if(!isEmpty(k,l,true) && pixelMap[k][l].element === "silver_bromide")
                        {
                            if(distance <= 0) {console.log("a");}
                            pixelMap[k][l].color = pixelColorPick(pixelMap[k][l],blendColors(RGBToHex(toObject(pixelMap[k][l].color)),RGBToHex(toObject(pixelMap[pixel.x+i][pixel.y+j].color)),1/distance));
                        }
					}
					if(pixelMap[pixel.x+i][pixel.y+j].element === "light" || pixelMap[pixel.x+i][pixel.y+j].element === "laser")
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

eListAddIon("SILVER","silver_bromide");
eListAddIon("BROMIDE","silver_bromide");
eListAdd("INSOLUBLE","silver_bromide");
eListAddIon("SILVER","molten_silver_bromide");
eListAddIon("BROMIDE","molten_silver_bromide");



elements.nitric_acid.reactions["silver"] = { elem1: "nitrogen_dioxide", elem2: "silver_nitrate_solution"};
elements.nitric_acid_gas.reactions["silver"] = { elem1: "nitrogen_dioxide", elem2: "silver_nitrate_solution"};

elements.nitric_acid.ignore.push("silver","silver_nitrate","silver_nitrate_solution");
elements.nitric_acid_gas.ignore.push("silver","silver_nitrate","silver_nitrate_solution");

elements.molten_silver_nitrate = {
    tempHigh: 440,
    stateHigh: ["silver","nitrogen_dioxide","oxygen","fire"],
}

createSalt("silver_nitrate","silver_nitrate_solution",["#cad7fc","#cbd2f7"],blendColors("#cad7fc","#2167ff",0.5),true,true,209,-2,102,4350,1060,"SILVER","NITRATE");

elements.silver_nitrate_solution.reactions["potassium_bromide"] = { elem1: "niter_solution", elem2: "silver_bromide"};
elements.silver_nitrate_solution.reactions["potassium_bromide_solution"] = { elem1: "niter_solution", elem2: "silver_bromide"};


createAcid("hydrobromic_acid",structuredClone(defaultAcidReactions),structuredClone(defaultAcidGasReactions),["#ff3b3b","#ca0000","#9e7b7b"],true,true,100,100,0,1000,1100,1,"BROMIDE")

eLists.ACID.push("hydrobromic_acid");
eLists.ACIDGAS.push("hydrobromic_acid_gas");

acidReact("sulfuric_acid","bromine","sulfuric_acid","hydrobromic_acid",50);
acidReact("sulfuric_acid","bromine_ice","sulfuric_acid","hydrobromic_acid",50);
acidReact("sulfuric_acid","bromine_gas","sulfuric_acid","hydrobromic_acid",50);
acidReact("sulfuric_acid_gas","bromine","sulfuric_acid","hydrobromic_acid",50);
acidReact("sulfuric_acid_gas","bromine_ice","sulfuric_acid","hydrobromic_acid",50);
acidReact("sulfuric_acid_gas","bromine_gas","sulfuric_acid","hydrobromic_acid",50);

acidReact("sulfuric_acid","potassium_salt","potassium_sulfate","acid",50);
acidReact("sulfuric_acid_gas","potassium_salt","potassium_sulfate","acid",50);
acidReact("sulfuric_acid","niter","potassium_sulfate","nitric_acid",50);
acidReact("sulfuric_acid_gas","niter","potassium_sulfate","nitric_acid",50);
acidReact("sulfuric_acid","potassium_bromide","potassium_sulfate","hydrobromic_acid",50);
acidReact("sulfuric_acid_gas","potassium_bromide","potassium_sulfate","hydrobromic_acid",50);


createSalt("potassium_sulfate","potassium_sulfate_solution","#f0d8cc",blendColors("#f0d8cc","#2167ff",0.75),true,true,1069,-2,102,2660,1012,"POTASSIUM","SULFATE");
elements["niter"].reactions = Object.assign(elements["potassium_sulfate"].reactions,{
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
	});
elements["niter_solution"].reactions = Object.assign(elements["potassium_sulfate_solution"].reactions,{
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
	});
    
createSalt("sodium_chlorate","sodium_chlorate_solution","#cff0cc",blendColors("#cff0cc","#2167ff",0.25),true,true,255,-2,102,2490,1011,"SODIUM","CHLORATE");
elements.sodium_chlorate.stateHigh = "fire";
elements.sodium_chlorate_solution.reactions["gold"] = { elem1:"sodium_perchlorate_solution", charged:true, chance:0.1 };

elements.chlorine.reactions["bleach"] = { elem1: "sodium_chlorate_solution", elem2: null};
delete elements["molten_sodium_chlorate"];

createSalt("sodium_perchlorate","sodium_perchlorate_solution","#cff0cc",blendColors("#d6f0cc","#2167ff",0.25),true,true,468,-2,102,2499,1011,"SODIUM","PERCHLORATE");
elements.sodium_perchlorate.stateHigh = "fire";
elements.sodium_perchlorate.reactions["acid"] = { elem1:"perchloric_acid", elem2:"salt"};
elements.sodium_perchlorate_solution.reactions["acid"] = { elem1:"perchloric_acid", elem2:"salt_water"};

elements.acid.ignore.push("salt","sodium_perchlorate","sodium_perchlorate_solution");
elements.acid_gas.ignore.push("salt","sodium_perchlorate","sodium_perchlorate_solution");
delete elements["molten_sodium_perchlorate"];

createAcid("perchloric_acid",structuredClone(defaultAcidReactions),structuredClone(defaultAcidGasReactions),["#ff963b","#ca6800","#c48a56"],true,true,100,100,0,1000,1768,1,"PERCHLORATE")

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
				changePixel(pixel,"big_pop");
			} else {
				deletePixel(pixel.x,pixel.y);
				return;
			}
		} else {
			behaviors.LIQUID(pixel);
		}
	}
delete elements.perchloric_acid.behavior;
elements.perchloric_acid.burn = 0;
elements.perchloric_acid.ignore.push("fire","smoke");

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
				changePixel(pixel,"big_pop");
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
elements.perchloric_acid_gas.burn = 0;
elements.perchloric_acid_gas.ignore.push("fire","smoke");

eLists.ACID.push("perchloric_acid");
eLists.ACIDGAS.push("perchloric_acid_gas");

acidReact("perchloric_acid","ammonia","rocket_fuel",null,100);
acidReact("perchloric_acid_gas","ammonia","rocket_fuel",null,100);

elements.perchloric_acid.ignore.push("salt","sodium_perchlorate","sodium_perchlorate_solution");
elements.perchloric_acid_gas.ignore.push("salt","sodium_perchlorate","sodium_perchlorate_solution");

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
    category: "liquids",
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

createAcid("hydroiodic_acid",structuredClone(defaultAcidReactions),structuredClone(defaultAcidGasReactions),["#9670ff","#da6afc","#a77af5","#9670ff","#da6afc","#a77af5","#633a1d"],true,true,100,100,0,1000,1150,1,"IODIDE")

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

runAfterLoad(function() {
    reactList("hydrogen_iodide", eLists.WATER, { "elem1": "hydroiodic_acid", "elem2": null });
});

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

runAfterLoad(function() {
    reactList("liquid_hydrogen_iodide", eLists.WATER, { "elem1": "hydroiodic_acid", "elem2": null });
});

elements.hydroiodic_acid.ignore.push("hydrogen_iodide","liquid_hydrogen_iodide","hydrogen_iodide_ice");
elements.hydroiodic_acid_gas.ignore.push("hydrogen_iodide","liquid_hydrogen_iodide","hydrogen_iodide_ice");


eListAddIon("HYDROGEN","hydrogen_iodide");
eListAddIon("IODIDE","hydrogen_iodide");
eListAddIon("HYDROGEN","liquid_hydrogen_iodide");
eListAddIon("IODIDE","liquid_hydrogen_iodide");
eListAddIon("HYDROGEN","hydroiodic_acid");
eListAddIon("IODIDE","hydroiodic_acid");
eListAddIon("HYDROGEN","hydroiodic_acid_gas");
eListAddIon("IODIDE","hydroiodic_acid_gas");
runAfterLoad(function() {
    reactList("hydroiodic_acid", eLists.WATER, { "elem2":"dirty_water"});
});


  
elements.bauxite = {
    color: ["#915a30","#cc7533"],
    behavior: behaviors.POWDER,
    category: "land",
    density: 2420,
    state: "solid",
    tempHigh: 300
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

createSalt("sodium_aluminate","sodium_aluminate_solution",["#e6c9b3","#ebc8ad"],["#bdb3e6","#b4adeb"],true,true,1650,-2,102,1500,1005,"SODIUM","ALUMINATE");
elements.sodium_aluminate_solution.reactions["carbon_dioxide"] = { elem1:"aluminum_hydroxide", elem2: ["sodium_carbonate_solution","spent_sodium_aluminate_solution"] };


createSalt("sodium_carbonate","sodium_carbonate_solution","#d8dae6",["#c5c1d6","#afacc2"],true,true,851,-2,102,2540,1010,"SODIUM","CARBONATE");
createSalt("ammonium_chloride","ammonium_chloride_solution","#daeced",["#a299c7","#7e76b3"],true,true,338 ,-2,102,1519,1008,"AMMONIUM","CHLORIDE");
elements["ammonium_chloride"].stateHigh = ["ammonia", "acid_gas"];
delete elements["molten_ammonium_chloride"];
acidReact("acid_gas","ammonia","ammonium_chloride",null,0);


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


eListAddIon("ALUMINUM","aluminum_hydroxide");
eListAddIon("HYDROXIDE","aluminum_hydroxide");
eListAdd("INSOLUBLE","aluminum_hydroxide");

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

eListAddIon("ALUMINUM","alumina");
eListAddIon("OXIDE","alumina");
eListAdd("INSOLUBLE","alumina");

eListAddIon("ALUMINUM","molten_alumina");
eListAddIon("OXIDE","molten_alumina");




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

eListAddIon("SODIUM","cryolite");
eListAddIon("HEXAFLUOROALUMINATE","cryolite");
eListAdd("INSOLUBLE","cryolite");

eListAddIon("SODIUM","molten_cryolite");
eListAddIon("HEXAFLUOROALUMINATE","molten_cryolite");


elements.aluminum_trifluoride = {
    color: ["#ebf4ff","#e3fdff"],
    behavior: behaviors.POWDER,
    category: "powders",
    hidden: true,
    density: 3100,
    state: "solid",
    tempHigh: 1290,
}

eListAddIon("ALUMINUM","aluminum_trifluoride");
eListAddIon("FLUORIDE","aluminum_trifluoride");
eListAdd("INSOLUBLE","aluminum_trifluoride");

eListAddIon("ALUMINUM","aluminum_trifluoride_gas");
eListAddIon("FLUORIDE","aluminum_trifluoride_gas");



elements.molten_aluminum_trifluoride = {
    tempHigh: 1290,
    tempLow: 1290,
}

elements.aluminum_trifluoride_gas = {
    tempLow: 1290,
    state: "gas",
    stateLow: "molten_aluminum_trifluoride"
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


createSalt("sodium_fluoride","sodium_fluoride_solution",["#8aebce","#b9edde"],["#8ad0eb","#b9e3ed"],false,true,993,-2,102,2558,1012,"SODIUM","FLUORIDE");

elements.magnesium_fluoride = {
    color: ["#aaabae","#a9adae"],
    behavior: behaviors.POWDER,
    category: "powders",
    density: 3148,
    state: "solid",
    tempHigh: 1263,
    reactions: {
        "sulfuric_acid": { "elem1": "hydrogen_fluoride", "elem2":"epsom_salt" },
    },
    hidden: true
};

eListAddIon("MAGNESIUM","magnesium_fluoride");
eListAddIon("FLUORIDE","magnesium_fluoride");
eListAdd("INSOLUBLE","magnesium_fluoride");

eListAddIon("MAGNESIUM","molten_magnesium_fluoride");
eListAddIon("FLUORIDE","molten_magnesium_fluoride");


elements.sulfuric_acid.ignore.push("epsom_salt","magnesium_fluoride");
elements.sulfuric_acid_gas.ignore.push("epsom_salt","magnesium_fluoride");

elements.hydrogen_fluoride.ignore.push("epsom_salt","magnesium_fluoride");
elements.liquid_hydrogen_fluoride.ignore.push("epsom_salt","magnesium_fluoride");

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
        "neutron": {elem2: null}
    },
}

acidReact("hydrofluoric_acid","boric_acid","fluoroboric_acid","dirty_water",50);
acidReact("hydrofluoric_acid_gas","boric_acid","fluoroboric_acid_gas","steam",50);

elements.hydrofluoric_acid.ignore.push("molten_boric_acid");
elements.hydrofluoric_acid_gas.ignore.push("molten_boric_acid");

elements.borax.hidden = false;

createSalt("sodium_sulfate","sodium_sulfate_solution","#f3f2f5",blendColors("#f3f2f5","#2167ff",0.5),true,true,884,-2,102,2664,1013,"SODIUM","SULFATE");

acidReact("sulfuric_acid","salt","acid","sodium_sulfate_solution");
acidReact("sulfuric_acid_gas","salt","acid","sodium_sulfate_solution");
acidReact("sulfuric_acid","salt_water","acid","sodium_sulfate_solution");
acidReact("sulfuric_acid_gas","salt_water","acid","sodium_sulfate_solution");

eListAddIon("BORON","boric_acid","base");
eListAddIon("HYDROXIDE","boric_acid","base");
eListAddIon("BORATE","boric_acid","acid");
eListAddIon("HYDROGEN","boric_acid","acid");
eListAdd("INSOLUBLE","boric_acid");

eListAddIon("BORON","molten_boric_acid","base");
eListAddIon("HYDROXIDE","molten_boric_acid","base");
eListAddIon("BORATE","molten_boric_acid","acid");
eListAddIon("HYDROGEN","molten_boric_acid","acid");

eListAdd("AMPHOTERIC","boric_acid");
eListAdd("AMPHOTERIC","molten_boric_acid");


eListAddIon("BORATE","borax");
eListAddIon("SODIUM","borax");
eListAdd("INSOLUBLE","borax");

eListAddIon("BORATE","molten_borax");
eListAddIon("SODIUM","molten_borax");



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

eListAddIon("BORON","boron_trioxide");
eListAddIon("OXIDE","boron_trioxide");
eListAdd("INSOLUBLE","boron_trioxide");

eListAddIon("BORON","molten_boron_trioxide");
eListAddIon("OXIDE","molten_boron_trioxide");



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
        "steam": { elem1: "fluoroboric_acid_gas", elem2: "boric_acid"},
    },
}

eListAddIon("BORON","boron_trifluoride");
eListAddIon("FLUORIDE","boron_trifluoride");
eListAdd("INSOLUBLE","boron_trifluoride");

runAfterLoad(function() {
    reactList("boron_trifluoride", eLists.WATER, { elem1: "fluoroboric_acid", elem2: "boric_acid"});
});


elements.liquid_boron_trifluoride = {
    tempLow: -126.8,
}

eListAddIon("BORON","liquid_boron_trifluoride");
eListAddIon("FLUORIDE","liquid_boron_trifluoride");
eListAddIon("BORON","boron_trifluoride_ice");
eListAddIon("FLUORIDE","boron_trifluoride_ice");

elements.boron_trichloride = {
    color: "#ddf0dd",
    behavior: behaviors.GAS,
    category: "gases",
    density: 4.9,
    state: "gas",
    hidden: true,
    tempLow: 12.6,
    reactions: {
        "steam": { elem1: "acid_gas", elem2: "boric_acid"},
        "hydrogen": { elem1: "boron", elem2: "acid_gas"},
    },
}

eListAddIon("BORON","boron_trichloride");
eListAddIon("CHLORIDE","boron_trichloride");
eListAddIon("BORON","liquid_boron_trichloride");
eListAddIon("CHLORIDE","liquid_boron_trichloride");
eListAddIon("BORON","boron_trichloride_ice");
eListAddIon("CHLORIDE","boron_trichloride_ice");
eListAdd("INSOLUBLE","boron_trichloride");


runAfterLoad(function() {
    reactList("boron_trichloride", eLists.WATER, { elem1: "acid", elem2: "boric_acid"});
});

elements.liquid_boron_trichloride = {
    tempLow: -107.3,
}


runAfterLoad(function() {
    reactList("fluoroboric_acid", eLists.WATER, { "elem2": "dirty_water" });
});

runAfterLoad(function() {
    reactList("fluoroboric_acid_gas", eLists.WATER, { "elem2": "dirty_water" });
});

createAcid("fluoroboric_acid",{},{},["#3bffdb","#00caaf","#56c4a3"],true,true,100,100,0,1000,1020,1,"TETRAFLUOROBORATE")

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

elements.fluoroboric_acid.ignore.push("molten_boric_acid");
elements.fluoroboric_acid_gas.ignore.push("molten_boric_acid");

eLists.ACID.push("fluoroboric_acid");
eLists.ACIDGAS.push("fluoroboric_acid_gas");

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
    },
    category: "powders",
    state: "solid",
    hidden: true,
    density: 1390,
    burn:75,
    burnTime:120,
};

eListAddIon("SODIUM","sodium_hydride","base");
eListAddIon("HYDRIDE","sodium_hydride","base");
eListAdd("INSOLUBLE","sodium_hydride");


runAfterLoad(function() {
    reactList("sodium_hydride", eLists.WATER, { elem1:["pop","pop","hydrogen","hydrogen"], chance:0.1, temp2:250 });
});

eLists.CAUSTIC.push("sodium_hydride");
elements.sodium_hydride.ignore = defaultAcidIgnore.concat(eLists.CAUSTICIGNORE);
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

eListAddIon("SODIUM","sodium_methoxide","base");
eListAddIon("METHOXIDE","sodium_methoxide","base");
eListAdd("INSOLUBLE","sodium_methoxide");
eListAddIon("SODIUM","molten_sodium_methoxide","base");
eListAddIon("METHOXIDE","molten_sodium_methoxide","base");



runAfterLoad(function() {
    reactList("sodium_methoxide", eLists.WATER, { elem1:"methanol", elem2:"sodium_hydroxide" });
});


elements.molten_sodium_methoxide = {
    behavior: behaviors.MOLTEN_CAUSTIC,
    tempLow: 127,
}


eLists.CAUSTIC.push("sodium_methoxide");
eLists.CAUSTIC.push("molten_sodium_methoxide");
elements.sodium_methoxide.ignore = defaultAcidIgnore.concat(eLists.CAUSTICIGNORE).concat(["sodium","molten_sodium","hydrogen","methanol","methanol_gas","trimethyl_borate"]);
elements.molten_sodium_methoxide.ignore = defaultAcidGasIgnore.concat(eLists.CAUSTICIGNORE).concat(["sodium","molten_sodium","hydrogen","methanol","methanol_gas","trimethyl_borate"]);
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

createSalt("sodium_borohydride","sodium_borohydride_solution",["#d3d3de","#c7c7eb","#ededfc","#d9d9d9"],["#ababc7","#9d9dd1","#bdbddb","#a8a8a8"],false,true,400,-2,102,1070,1005,"SODIUM","BOROHYDRIDE");

elements.sodium_borohydride.behavior = behaviors.CAUSTIC;
elements.sodium_borohydride_solution.behavior = [
        "XX|DB%5|XX",
        "DB%5 AND M2|XX|DB%5 AND M2",
        "DB%5 AND M2|DB%10 AND M1|DB%5 AND M2",
    ];
elements.sodium_borohydride.fireColor = ["#34eb67","#5ceb34"];
elements.sodium_borohydride_solution.fireColor = ["#34eb67","#5ceb34"];
elements.sodium_borohydride.stateHigh = ["sodium_hydride","sodium","boron"];

delete elements["molten_sodium_borohydride"];

eLists.CAUSTIC.push("sodium_borohydride");
eLists.CAUSTIC.push("sodium_borohydride_solution");
elements.sodium_borohydride.ignore = defaultAcidIgnore.concat(eLists.CAUSTICIGNORE).concat(["sodium","molten_sodium","hydrogen","boron","trimethyl_borate"]);
elements.sodium_borohydride_solution.ignore = defaultAcidIgnore.concat(eLists.CAUSTICIGNORE).concat(["sodium","molten_sodium","hydrogen","boron","trimethyl_borate"]);
acidIgnore(["sodium_borohydride","sodium_borohydride_solution"]);
elements.sodium_hydride.ignore.push(["sodium","molten_sodium","hydrogen","boron"]);


createSalt("sodium_tetrafluoroborate","sodium_tetrafluoroborate_solution",["#deded3","#ebebc7","#fcfced","#d9d9d9"],["#ababb7","#9d9dc1","#bdbdcb","#a8a898"],true,true,384,-2,102,2470,1012,"SODIUM","TETRAFLUOROBORATE");

elements.sodium_tetrafluoroborate.stateHigh = ["sodium_fluoride","boron_trifluoride"];
elements.sodium_tetrafluoroborate.fireColor = ["#34eb67","#5ceb34"];

delete elements["molten_sodium_tetrafluoroborate"];

elements.fluoroboric_acid.ignore.push("sodium_tetrafluoroborate","sodium_tetrafluoroborate_solution");
elements.fluoroboric_acid_gas.ignore.push("sodium_tetrafluoroborate","sodium_tetrafluoroborate_solution");

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



runAfterLoad(function() {
    reactList("diborane", eLists.WATER, { elem1:"boric_acid", elem2:"hydrogen", temp1:100});
});

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
    }
};
runAfterLoad(function() {
    reactList("decaborane", eLists.WATER, { elem1:"boric_acid", elem2:"hydrogen", temp1:100});
});

elements.molten_decaborane = {
    behavior: behaviors.LIQUID,
    tempLow: 98,
    burn:100,
    burnTime:1000,
    burnInto:"boron_trioxide",
    reactions:{
        "oxygen": { elem1:"boron_trioxide", elem2:"fire" },
    },
    fireColor:["#34eb67","#5ceb34"],
    category: "liquids",
    state: "liquid",
    hidden: true,
    density: 900,
}

runAfterLoad(function() {
    reactList("molten_decaborane", eLists.WATER, { elem1:"boric_acid", elem2:"hydrogen", temp1:100});
});



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
    }
};

runAfterLoad(function() {
    reactList("pentaborane", eLists.WATER, { elem1:"boric_acid", elem2:"hydrogen", temp1:100});
});

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

eListAddIon("SODIUM","sodium_octahydrotriborate");
eListAddIon("OCTAHYDROTRIBORATE","sodium_octahydrotriborate");
eListAdd("INSOLUBLE","sodium_octahydrotriborate");


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

eListAddIon("SODIUM","sodium_dodecaborate");
eListAddIon("DODECABORATE","sodium_dodecaborate");
eListAdd("INSOLUBLE","sodium_dodecaborate");
eListAddIon("SODIUM","molten_sodium_dodecaborate");
eListAddIon("DODECABORATE","molten_sodium_dodecaborate");




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


eListAddIon("SODIUM","sodium_bromoheptahydrotriborate");
eListAddIon("BROMOHEPTAHYDROTRIBORATE","sodium_bromoheptahydrotriborate");
eListAdd("INSOLUBLE","sodium_bromoheptahydrotriborate");

//elements.indium = {
//    
//}

//quit snooping around



elements.uraninite = {
    color: ["#545323","#50573b","#656660","#4d4933","#615e4a","#525043"],
    behavior: [
        "XX|CR:radiation%0.05|XX",
        "CR:radiation%0.05|XX|CR:radiation%0.05",
        "M2|M1|M2",
    ],
    tempHigh: 2865,
    category: "land",
    state: "solid",
    density: 10970
}


elements.yellowcake = {
    color: ["#dbd827","#bce346","#a8c418","#d9bb1a","#dec418","#cfb615"],
    behavior: [
        "XX|CR:radiation%0.05|XX",
        "CR:radiation%0.05|XX|CR:radiation%0.05",
        "M2|M1|M2",
    ],
    tempHigh: 1150,
    category: "powders",
    hidden: true,
    state: "solid",
    density: 8300,
    reactions: {
        "hydrogen": { elem1:["uranium_dioxide","uranium_dioxide","uranium_dioxide","uranium_dioxide","thorium_dioxide"], elem2:"steam" },
    }
}

elements.yellowcake_solution = {
    color: "#d2ed6f",
    ignore: elements.sulfuric_acid.ignore.concat(eLists.CAUSTICIGNORE).concat(["radiation","yellowcake","uraninite"]),
    behavior: [
        "XX|DB%5 AND CR:radiation%0.05|XX",
        "DB%5 AND M2 AND CR:radiation%0.05|XX|DB%5 AND M2 AND CR:radiation%0.05",
        "DB%5 AND M2|DB%10 AND M1|DB%5 AND M2",
    ],
    tempHigh: 337,
    category: "liquids",
    stateHigh: ["sulfuric_acid_gas","yellowcake"],
    state: "liquid",
    hidden: true,
    density: 1850,
    reactions: {}
}


acidIgnore(["yellowcake_solution"]);
eLists.CAUSTIC.push("yellowcake_solution");
eLists.ACID.push("yellowcake_solution");

acidReact("sulfuric_acid","uraninite","yellowcake_solution",null,50);
acidReact("sulfuric_acid_gas","uraninite","yellowcake","sulfuric_acid_gas",50);
acidReact("sulfuric_acid","yellowcake","yellowcake_solution","yellowcake_solution",50);


elements.alpha_particle = {
    color: "#ff7878",
    behavior: [
        "XX|XX|XX",
        "XX|CH:helium%0.01 AND DL%0.25|XX",
        "XX|XX|XX",
    ],
    reactions: {
        "electric": { elem1:null, elem2:"helium", temp2:200 }
    },
    tick: behaviors.BOUNCY,
    temp: 35,
    category: "energy",
    state: "gas",
    density: 0.00012,
    ignoreAir: true
}

elements.depleted_uranium = {
    color: ["#599e61","#364d3c","#494d4a","#6c8a42","#798d65","#b5e089"],
    behavior: [
        "XX|CR:alpha_particle%0.01|XX",
        "CR:alpha_particle%0.01|CH:thorium%0.001|CR:alpha_particle%0.01",
        "M2|M1|M2",
    ],
    reactions: {
        "neutron": { elem2: null, func: depleted_uranium},
        "oxygen": { elem1:"depleted_uranium_dioxide", elem2: null, chance:0.1},
        "meat": { elem2:"rotten_meat", chance:0.1 },
        "cheese": { elem2:"rotten_cheese", chance:0.1 },
        "quark_matter": {elem1: "stable_uranium"}
    },
    tempHigh: 1132.2,
    category: "powders",
    hidden: true,
    state: "solid",
    density: 19100,
    hardness: 0.6,
    conduct: 0.235
}

runAfterLoad(function() {
    reactList("depleted_uranium", eLists.WATER, { elem2: "dirty_water", chance:0.25 });
});



elements.molten_depleted_uranium = {
    behavior: [
        "XX|CR:fire%2.5 AND CR:alpha_particle%0.01|XX",
        "M2 AND CR:alpha_particle%0.01|XX|M2 AND CR:alpha_particle%0.01",
        "M1|M1|M1",
    ],
    reactions: {
        "neutron": { elem2: null, func:depleted_uranium},
        "quark_matter": {elem1: "stable_uranium"}
    }
}

elements.enriched_uranium = {
    color: ["#599e61","#364d3c","#494d4a","#6c8a42","#798d65","#b5e089"],
    behavior: [
        "XX|CR:radiation%2.5 AND CR:alpha_particle%0.1|XX",
        "CR:radiation%2.5 AND CR:alpha_particle%0.1|CH:thorium%0.05 AND CH:protactinium%0.01|CR:radiation%2.5 AND CR:alpha_particle%0.1",
        "M2|M1|M2",
    ],
    reactions: {
        "neutron": { func:enriched_uranium, temp1: 150},
        "oxygen": { elem1:"enriched_uranium_dioxide", elem2: null, chance:0.1},
        "meat": { elem2:"rotten_meat", chance:0.1 },
        "cheese": { elem2:"rotten_cheese", chance:0.1 },
        "quark_matter": {elem1: "stable_uranium"}
    },
    tempHigh: 1132.2,
    category: "powders",
    hidden: true,
    state: "solid",
    density: 19100,
    hardness: 0.6,
    conduct: 0.235,
    excludeRandom: true
}

runAfterLoad(function() {
    reactList("enriched_uranium", eLists.WATER, { elem2: "dirty_water", chance:0.25 });
});

runAfterLoad(function() {
    reactList("uranium", eLists.WATER, { elem2: "dirty_water", chance:0.25 });
});



elements.molten_enriched_uranium = {
    behavior: [
        "XX|CR:fire%2.5 AND CR:radiation%2.5 AND CR:alpha_particle%0.1|XX",
        "M2 AND CR:radiation%2.5 AND CR:alpha_particle%0.1|XX|M2 AND CR:radiation%2.5 AND CR:alpha_particle%0.1",
        "M1|M1|M1",
    ],
    reactions: {
        "neutron": { func: enriched_uranium, temp1: 150},
        "quark_matter": {elem1: "stable_uranium"}
    }
}
function enriched_uranium(pixel,p) {
    if(pixel.temp >= 500)
    {
        transmuteAround(pixel);
        changePixel(pixel, "n_explosion");
    }
    if(Math.random() < 0.1)
    {
        changePixel(pixel, "neptunium");
    }
    elementCircle(p.x,p.y,2,"neutron");
}


function depleted_uranium(pixel,p) {
    if(Math.random() < 0.1)
    {
        changePixel(pixel, "plutonium");
    }
}


elements.stable_uranium = {
    color: [blendColors("#599e61","#ff0000"),blendColors("#364d3c","#00ff00"),blendColors("#494d4a","#0000ff"),blendColors("#6c8a42","#ff0000"),blendColors("#798d65","#00ff00"),blendColors("#b5e089","#0000ff")],
    behavior: behaviors.POWDER,
    reactions: {
        "oxygen": { elem1:"stable_uranium_dioxide", elem2: null, chance:0.1},
        "meat": { elem2:"rotten_meat", chance:0.1 },
        "cheese": { elem2:"rotten_cheese", chance:0.1 },
        "water": { elem2: "dirty_water", chance:0.25 }
    },
    tempHigh: 1132.2,
    category: "powders",
    hidden: true,
    state: "solid",
    density: 19100,
    hardness: 0.6,
    conduct: 0.235,
};
runAfterLoad(function() {
    reactList("stable_uranium", eLists.WATER, { elem2: "dirty_water", chance:0.25 });
});

elements.uranium.reactions["oxygen"] = { elem1:"uranium_dioxide", elem2: null, chance:0.1};
elements.uranium.reactions["quark_matter"] = { elem1:"stable_uranium"};
elements.uranium.behavior = [
        "XX|CR:radiation%1 AND CR:alpha_particle%0.01|XX",
        "CR:radiation%1 AND CR:alpha_particle%0.01|CH:thorium%0.001|CR:radiation%1 AND CR:alpha_particle%0.01",
        "M2|M1|M2",
    ];
elements.molten_uranium.behavior = [
        "XX|CR:fire%2.5 AND CR:radiation%1 AND CR:alpha_particle%0.01|XX",
        "M2 AND CR:radiation%1 AND CR:alpha_particle%0.01|XX|M2 AND CR:radiation%1 AND CR:alpha_particle%0.01",
        "M1|M1|M1",
    ];
elements.molten_uranium.reactions["quark_matter"] = { elem1:"stable_uranium"};


eListAddIon("URANIUMIV","uranium_dioxide");
eListAddIon("OXIDE","uranium_dioxide");
eListAdd("INSOLUBLE","uranium_dioxide");
eListAddIon("ENRICHEDURANIUMIV","enriched_uranium_dioxide");
eListAddIon("OXIDE","enriched_uranium_dioxide");
eListAdd("INSOLUBLE","enriched_uranium_dioxide");
eListAddIon("DEPLETEDURANIUMIV","depleted_uranium_dioxide");
eListAddIon("OXIDE","depleted_uranium_dioxide");
eListAdd("INSOLUBLE","depleted_uranium_dioxide");
eListAddIon("STABLEURANIUMIV","stable_uranium_dioxide");
eListAddIon("OXIDE","stable_uranium_dioxide");
eListAdd("INSOLUBLE","stable_uranium_dioxide");

elements.uranium_dioxide = {
    color: ["#474744","#21211f","#2b2b2b","#9c998c","#40403f","#24231d"],
    behavior: [
        "XX|CR:radiation%0.05|XX",
        "CR:radiation%0.05|XX|CR:radiation%0.05",
        "M2|M1|M2",
    ],
    reactions: {
        "neutron": { temp1: 25},
    },
    tempHigh: 2865,
    category: "powders",
    state: "solid",
    density: 10970
}


elements.molten_uranium_dioxide = {
    behavior: [
        "XX|CR:fire%2.5 AND CR:radiation%0.05|XX",
        "M2 AND CR:radiation%0.05|XX|M2 AND CR:radiation%0.05",
        "M1|M1|M1",
    ],
    reactions: {
        "neutron": { temp1: 25}
    }
}


elements.depleted_uranium_dioxide = {
    color: ["#474744","#21211f","#2b2b2b","#9c998c","#40403f","#24231d"],
    behavior: behaviors.POWDER,
    reactions: {
        "neutron": { elem2: null},
    },
    tempHigh: 2865,
    category: "powders",
    hidden: true,
    state: "solid",
    density: 10970
}


elements.stable_uranium_dioxide = {
    color: [blendColors("#474744","#ff0000"),blendColors("#21211f","#00ff00"),blendColors("#2b2b2b","#0000ff"),blendColors("#9c998c","#ff0000"),blendColors("#40403f","#00ff00"),blendColors("#24231d","#0000ff")],
    behavior: behaviors.POWDER,
    reactions: {
        "neutron": { elem2: null}
    },
    tempHigh: 2865,
    category: "powders",
    hidden: true,
    state: "solid",
    density: 10970
};

elements.enriched_uranium_dioxide = {
    color: ["#474744","#21211f","#2b2b2b","#9c998c","#40403f","#24231d"],
    behavior: [
        "XX|CR:radiation%0.25|XX",
        "CR:radiation%0.25|XX|CR:radiation%0.25",
        "M2|M1|M2",
    ],
    reactions: {
        "neutron": {func:function(pixel,p) {
            if(pixel.temp >= 500)
            {
                transmuteAround(pixel);
                changePixel(pixel, "n_explosion");
            }
            elementCircle(p.x,p.y,2,"neutron");
        }, temp1: 150},
    },
    tempHigh: 2865,
    category: "powders",
    hidden: true,
    state: "solid",
    density: 10970
};

elements.molten_enriched_uranium_dioxide = {
    behavior: [
        "XX|CR:fire%2.5 AND CR:radiation%0.25|XX",
        "M2 AND CR:radiation%0.25|XX|M2 AND CR:radiation%0.25",
        "M1|M1|M1",
    ],
    reactions: {
        "neutron": {func:function(pixel,p) {transmuteAround(pixel);changePixel(pixel, "n_explosion"); elementCircle(p.x,p.y,2,"neutron")}},
    }
};

function reduce(element, element2, result) {
    if(element2 === "oxygen") {
        
        Object.assign(elements[element].reactions, {
            "molten_magnesium": { elem1: result, elem2: "magnesium_oxide"},
            "molten_calcium": { elem1: result, elem2: "quicklime"},
            //"molten_sodium": { elem1: result, elem2: "sodium_oxide"},
        });
    }
    if(element2 === "fluorine") {
        
        Object.assign(elements[element].reactions, {
            "molten_magnesium": { elem1: result, elem2: "magnesium_fluoride"},
            "molten_calcium": { elem1: result, elem2: "fluorite"},
            "molten_sodium": { elem1: result, elem2: "sodium_fluoride"},
            "molten_sodium": { elem1: result, elem2: "potassium_fluoride"},
        });
    }
}

reduce("uranium_dioxide", "oxygen", "uranium");
reduce("enriched_uranium_dioxide", "oxygen", "enriched_uranium");
reduce("depleted_uranium_dioxide", "oxygen", "depleted_uranium");
reduce("stable_uranium_dioxide", "oxygen", "stable_uranium");



acidReact("hydrofluoric_acid","uranium_dioxide","uranium_tetrafluoride","fire");
acidReact("hydrofluoric_acid","depleted_uranium_dioxide","depleted_uranium_tetrafluoride","fire");
acidReact("hydrofluoric_acid","enriched_uranium_dioxide","enriched_uranium_tetrafluoride","fire");
acidReact("hydrofluoric_acid","stable_uranium_dioxide","stable_uranium_tetrafluoride","fire");
acidReact("hydrofluoric_acid_gas","uranium_dioxide","uranium_tetrafluoride","fire");
acidReact("hydrofluoric_acid_gas","depleted_uranium_dioxide","depleted_uranium_tetrafluoride","fire");
acidReact("hydrofluoric_acid_gas","enriched_uranium_dioxide","enriched_uranium_tetrafluoride","fire");
acidReact("hydrofluoric_acid_gas","stable_uranium_dioxide","stable_uranium_tetrafluoride","fire");
acidReact("hydrogen_fluoride","uranium_dioxide","uranium_tetrafluoride","fire");
acidReact("hydrogen_fluoride","depleted_uranium_dioxide","depleted_uranium_tetrafluoride","fire");
acidReact("hydrogen_fluoride","enriched_uranium_dioxide","enriched_uranium_tetrafluoride","fire");
acidReact("hydrogen_fluoride","stable_uranium_dioxide","stable_uranium_tetrafluoride","fire");
acidReact("liquid_hydrogen_fluoride","uranium_dioxide","uranium_tetrafluoride","fire");
acidReact("liquid_hydrogen_fluoride","depleted_uranium_dioxide","depleted_uranium_tetrafluoride","fire");
acidReact("liquid_hydrogen_fluoride","enriched_uranium_dioxide","enriched_uranium_tetrafluoride","fire");
acidReact("liquid_hydrogen_fluoride","stable_uranium_dioxide","stable_uranium_tetrafluoride","fire");

elements.hydrofluoric_acid.ignore.push("uranium_hexafluoride","enriched_uranium_hexafluoride","depleted_uranium_hexafluoride","stable_uranium_hexafluoride");
elements.hydrofluoric_acid_gas.ignore.push("uranium_hexafluoride","enriched_uranium_hexafluoride","depleted_uranium_hexafluoride","stable_uranium_hexafluoride");
elements.hydrogen_fluoride.ignore.push("uranium_hexafluoride","enriched_uranium_hexafluoride","depleted_uranium_hexafluoride","stable_uranium_hexafluoride");
elements.liquid_hydrogen_fluoride.ignore.push("uranium_hexafluoride","enriched_uranium_hexafluoride","depleted_uranium_hexafluoride","stable_uranium_hexafluoride");


eListAddIon("URANIUMIV","uranium_tetrafluoride");
eListAddIon("FLUORIDE","uranium_tetrafluoride");
eListAdd("INSOLUBLE","uranium_tetrafluoride");
eListAddIon("ENRICHEDURANIUMIV","enriched_uranium_tetrafluoride");
eListAddIon("FLUORIDE","enriched_uranium_tetrafluoride");
eListAdd("INSOLUBLE","enriched_uranium_tetrafluoride");
eListAddIon("DEPLETEDURANIUMIV","depleted_uranium_tetrafluoride");
eListAddIon("FLUORIDE","depleted_uranium_tetrafluoride");
eListAdd("INSOLUBLE","depleted_uranium_tetrafluoride");
eListAddIon("STABLEURANIUMIV","stable_uranium_tetrafluoride");
eListAddIon("FLUORIDE","stable_uranium_tetrafluoride");
eListAdd("INSOLUBLE","stable_uranium_tetrafluoride");


elements.uranium_tetrafluoride = {
    color: ["#495747","#394d38","#5a7859"],
    behavior: [
        "XX|CR:radiation%0.05|XX",
        "CR:radiation%0.05|XX|CR:radiation%0.05",
        "M2|M1|M2",
    ],
    reactions: {},
    tempHigh: 1036,
    category: "powders",
    state: "solid",
    density: 6700,
    hidden: true
}


elements.molten_uranium_tetrafluoride = {
    behavior: [
        "XX|CR:fire%2.5 AND CR:radiation%0.05|XX",
        "M2 AND CR:radiation%0.05|XX|M2 AND CR:radiation%0.05",
        "M1|M1|M1",
    ]
}


elements.depleted_uranium_tetrafluoride = {
    color: ["#495747","#394d38","#5a7859"],
    behavior: behaviors.POWDER,
    reactions: {},
    tempHigh: 1036,
    category: "powders",
    state: "solid",
    density: 6700,
    hidden: true
}


elements.stable_uranium_tetrafluoride = {
    color: [blendColors("#495747","#ff0000"),blendColors("#394d38","#00ff00"),blendColors("#5a7859","#0000ff")],
    behavior: behaviors.POWDER,
    reactions: {},
    tempHigh: 1036,
    category: "powders",
    state: "solid",
    density: 6700,
    hidden: true
}

elements.enriched_uranium_tetrafluoride = {
    color: ["#495747","#394d38","#5a7859"],
    behavior: [
        "XX|CR:radiation%0.25|XX",
        "CR:radiation%0.25|XX|CR:radiation%0.25",
        "M2|M1|M2",
    ],
    reactions: {},
    tempHigh: 1036,
    category: "powders",
    state: "solid",
    density: 6700,
    hidden: true
}


elements.molten_enriched_uranium_tetrafluoride = {
    behavior: [
        "XX|CR:fire%2.5 AND CR:radiation%0.25|XX",
        "M2 AND CR:radiation%0.25|XX|M2 AND CR:radiation%0.25",
        "M1|M1|M1",
    ]
}



acidReact("fluorine","uranium_tetrafluoride","uranium_hexafluoride","fire");
acidReact("fluorine","depleted_uranium_tetrafluoride","depleted_uranium_hexafluoride","fire");
acidReact("fluorine","enriched_uranium_tetrafluoride","enriched_uranium_hexafluoride","fire");
acidReact("fluorine","stable_uranium_tetrafluoride","stable_uranium_hexafluoride","fire");
acidReact("liquid_fluorine","uranium_tetrafluoride","uranium_hexafluoride","fire");
acidReact("liquid_fluorine","depleted_uranium_tetrafluoride","depleted_uranium_hexafluoride","fire");
acidReact("liquid_fluorine","enriched_uranium_tetrafluoride","enriched_uranium_hexafluoride","fire");
acidReact("liquid_fluorine","stable_uranium_tetrafluoride","stable_uranium_hexafluoride","fire");

reduce("uranium_tetrafluoride", "fluorine", "uranium");
reduce("enriched_uranium_tetrafluoride", "fluorine", "enriched_uranium");
reduce("depleted_uranium_tetrafluoride", "fluorine", "depleted_uranium");
reduce("stable_uranium_tetrafluoride", "fluorine", "stable_uranium");


eListAddIon("URANIUMVI","uranium_hexafluoride");
eListAddIon("FLUORIDE","uranium_hexafluoride");
eListAdd("INSOLUBLE","uranium_hexafluoride");
eListAddIon("ENRICHEDURANIUMVI","enriched_uranium_hexafluoride");
eListAddIon("FLUORIDE","enriched_uranium_hexafluoride");
eListAdd("INSOLUBLE","enriched_uranium_hexafluoride");
eListAddIon("DEPLETEDURANIUMVI","depleted_uranium_hexafluoride");
eListAddIon("FLUORIDE","depleted_uranium_hexafluoride");
eListAdd("INSOLUBLE","depleted_uranium_hexafluoride");
eListAddIon("STABLEURANIUMVI","stable_uranium_hexafluoride");
eListAddIon("FLUORIDE","stable_uranium_hexafluoride");
eListAdd("INSOLUBLE","stable_uranium_hexafluoride");


elements.uranium_hexafluoride = {
    color: "#f7fff7",
    behavior: [
        "XX|CR:radiation%0.05|XX",
        "CR:radiation%0.05|XX|CR:radiation%0.05",
        "M2|M1|M2",
    ],
    reactions: {
        "hydrogen": { elem1: "uranium_tetrafluoride", elem2: "hydrogen_fluoride" }
    },
    tempHigh: 56.5,
    category: "powders",
    state: "solid",
    density: 5090,
    stateHighName: "uranium_hexafluoride_gas",
    forceAutoGen: true,
    hidden: true
}



elements.uranium_hexafluoride_gas = {
    behavior: behaviors.GAS,
    behavior2: [
        ["XX","CR:radiation%0.25","XX"],
        ["CR:radiation%0.25","XX","CR:radiation%0.25"],
        ["XX","CR:radiation%0.25","XX"]
    ],
    tick: function(pixel) {
        pixelTick(pixel,elements[pixel.element].behavior2);
    },
    state: "gas",
    density: 12.84,
    reactions: {
        "hydrogen": { elem1: "uranium_tetrafluoride", elem2: "hydrogen_fluoride" }
    },
    onCentrifuge: function(pixel) {
        if(Math.random() < 0.05) {
            if(Math.random() < 0.8) {
                changePixel(pixel,"depleted_uranium_hexafluoride");
            }
            else
            {
                changePixel(pixel,"enriched_uranium_hexafluoride");
            }
        }
    },
}


elements.depleted_uranium_hexafluoride = {
    color: "#f7fff7",
    behavior: behaviors.POWDER,
    reactions: {
        "hydrogen": { elem1: "depleted_uranium_tetrafluoride", elem2: "hydrogen_fluoride" }
    },
    tempHigh: 56.5,
    category: "powders",
    state: "solid",
    density: 5090,
    stateHighName: "depleted_uranium_hexafluoride_gas",
    forceAutoGen: true,
    hidden: true
}


elements.depleted_uranium_hexafluoride_gas = {
    behavior: behaviors.GAS,
    state: "gas",
    density: 12.84,
    reactions: {
        "hydrogen": { elem1: "depleted_uranium_tetrafluoride", elem2: "hydrogen_fluoride" }
    },
}



elements.stable_uranium_hexafluoride = {
    color: [blendColors("#f7fff7","#ff0000"),blendColors("#f7fff7","#00ff00"),blendColors("#f7fff7","#0000ff")],
    behavior: behaviors.POWDER,
    reactions: {
        "hydrogen": { elem1: "stable_uranium_tetrafluoride", elem2: "hydrogen_fluoride" }
    },
    tempHigh: 56.5,
    category: "powders",
    state: "solid",
    density: 5090,
    stateHighName: "stable_uranium_hexafluoride_gas",
    forceAutoGen: true,
    hidden: true
}


elements.stable_uranium_hexafluoride_gas = {
    behavior: behaviors.GAS,
    state: "gas",
    density: 12.84,
    reactions: {
        "hydrogen": { elem1: "stable_uranium_tetrafluoride", elem2: "hydrogen_fluoride" }
    },
}



elements.enriched_uranium_hexafluoride = {
    color: "#f7fff7",
    behavior: [
        "XX|CR:radiation%0.25|XX",
        "CR:radiation%0.25|XX|CR:radiation%0.25",
        "M2|M1|M2",
    ],
    reactions: {
        "hydrogen": { elem1: "enriched_uranium_tetrafluoride", elem2: "hydrogen_fluoride" }
    },
    tempHigh: 56.5,
    category: "powders",
    state: "solid",
    density: 5090,
    stateHighName: "enriched_uranium_hexafluoride_gas",
    forceAutoGen: true,
    hidden: true
}


elements.enriched_uranium_hexafluoride_gas = {
    behavior: behaviors.GAS,
    behavior2: [
        ["XX","CR:radiation%0.25","XX"],
        ["CR:radiation%0.25","XX","CR:radiation%0.25"],
        ["XX","CR:radiation%0.25","XX"]
    ],
    tick: function(pixel) {
        pixelTick(pixel,elements[pixel.element].behavior2);
    },
    reactions: {
        "hydrogen": { elem1: "enriched_uranium_tetrafluoride", elem2: "hydrogen_fluoride" }
    },
    state: "gas",
    density: 12.84
}

runAfterLoad(function() {
    reactList("uranium_hexafluoride", eLists.WATER, { "elem1": "uranium_tetrafluoride", elem2: "hydrofluoric_acid" });
    reactList("depleted_uranium_hexafluoride", eLists.WATER, { "elem1": "depleted_uranium_tetrafluoride", elem2: "hydrofluoric_acid" });
    reactList("enriched_uranium_hexafluoride", eLists.WATER, { "elem1": "enriched_uranium_tetrafluoride", elem2: "hydrofluoric_acid" });
    reactList("stable_uranium_hexafluoride", eLists.WATER, { "elem1": "stable_uranium_tetrafluoride", elem2: "hydrofluoric_acid" });
    reactList("uranium_hexafluoride_gas", eLists.WATER, { "elem1": "uranium_tetrafluoride", elem2: "hydrofluoric_acid" });
    reactList("depleted_uranium_hexafluoride_gas", eLists.WATER, { "elem1": "depleted_uranium_tetrafluoride", elem2: "hydrofluoric_acid" });
    reactList("enriched_uranium_hexafluoride_gas", eLists.WATER, { "elem1": "enriched_uranium_tetrafluoride", elem2: "hydrofluoric_acid" });
    reactList("stable_uranium_hexafluoride_gas", eLists.WATER, { "elem1": "stable_uranium_tetrafluoride", elem2: "hydrofluoric_acid" });
});

elements.radium = {
    color: "#3bdeff",
    behavior: [
        "XX|CR:radiation%10|XX",
        "CR:radiation%10|CH:radon%0.1|CR:radiation%10",
        "M2|M1|M2",
    ],
    tick: function(pixel) {
        pixel.temp += 1;
    },
    reactions: {
        "quark_matter": { "elem1":"stable_radium"},
    },
    tempHigh: 700,
    category: "powders",
    state: "solid",
    density: 5500,
    conduct: 0.40,
};


runAfterLoad(function() {
    reactList("radium", eLists.WATER, { "elem1": ["radium_water","rad_pop"], elem2:["hydrogen","bubble"], chance:0.05, temp2:350, func:radiumWater });
});

elements.molten_radium = {
    behavior: [
        "XX|CR:radiation%10|XX",
        "M2 AND CR:radiation%10|CH:radon%0.01|M2 AND CR:radiation%10",
        "M1|M1|M1",
    ],
    tick: function(pixel) {
        pixel.temp += 1;
    },
    reactions: {
        "quark_matter": { "elem1":"stable_radium"},
    },
    conduct: 0.40
}

runAfterLoad(function() {
    reactList("molten_radium", eLists.WATER, { "elem1": ["radium_water","rad_pop"], elem2:["hydrogen","bubble"], chance:0.05, temp2:350, func:radiumWater });
});

function radiumWater(pixel,p) {
    elementCircle(pixel.x,pixel.y,15,"radium_water",0.1,eLists.WATER);
}

elements.radium_water = {
    color: "#3bc4ff",
    behavior: [
        "XX|CR:radiation%0.05|XX",
        "M2 AND CR:radiation%0.05|XX|M2 AND CR:radiation%0.05",
        "M1|M1|M1",
    ],
    reactions: {
        "head": { elem2:null, chance:0.4 },
    },
    tempHigh: 100,
    stateHigh: "rad_steam",
    state: "liquid",
    density: 1100,
    category: "liquids",
    hidden: true,
    tempLow: 0
}

eListAdd("WATER","radium_water");

elements.actinium = {
    color: "#62ebf0",
    behavior: [
        "XX|CR:alpha_particle%0.1 AND CR:radiation%10|XX",
        "CR:alpha_particle%0.1 AND CR:radiation%10|CH:radium%0.02|CR:alpha_particle%0.1 AND CR:radiation%10",
        "M2|M1|M2",
    ],
    tick: function(pixel) {
        pixel.temp += 2.5;
    },
    reactions: {
        "quark_matter": { "elem1":"stable_actinium"}
    },
    tempHigh: 1227,
    category: "powders",
    state: "solid",
    density: 10000,
    conduct: 0.225
};
elements.molten_actinium = {
    behavior: [
        "XX|CR:fire%2.5 AND CR:alpha_particle%0.1 AND CR:radiation%10|XX",
        "M2 AND CR:alpha_particle%0.1 AND CR:radiation%10|CH:radium%0.02|M2 AND CR:alpha_particle%0.1 AND CR:radiation%10",
        "M1|M1|M1",
    ],
    tick: function(pixel) {
        pixel.temp += 2.5;
    },
    reactions: {
        "quark_matter": { "elem1":"stable_actinium"}
    },
    conduct: 0.225
}

elements.thorium = {
    color: ["#599e8a","#364d4b","#494d4c","#428a58","#658d7a","#89e0a2"],
    behavior: [
        "XX|CR:alpha_particle%0.01|XX",
        "CR:alpha_particle%0.01|CH:lead%0.001|CR:alpha_particle%0.01",
        "XX|CR:alpha_particle%0.01|XX",
    ],
    reactions: {
        "neutron": { temp1: 100, func:function(pixel,p) {if(Math.random() < 0.1) {changePixel(pixel, "radium"); elementCircle(p.x,p.y,2,"neutron");}}},
        "oxygen": { elem1:"thorium_dioxide", elem2: null, chance:0.1},
        "quark_matter": {elem1: "stable_thorium"}
    },
    tempHigh: 1750,
    category: "solids",
    state: "solid",
    density: 11700,
    hardness: 0.7,
    conduct: 0.235
};
elements.molten_thorium = {
    behavior: [
        "XX|CR:alpha_particle%0.01|XX",
        "M2 AND CR:alpha_particle%0.01|XX|M2 AND CR:alpha_particle%0.01",
        "M1|M1|M1",
    ],
    reactions: {
        "neutron": { temp1: 100, func:function(pixel,p) {if(Math.random() < 0.1) {changePixel(pixel, "radium"); elementCircle(p.x,p.y,2,"neutron");}}},
        "oxygen": { elem1:"thorium_dioxide", elem2: null},
        "quark_matter": {elem1: "stable_thorium"}
    }
}

elements.protactinium = {
    color: ["#9899a3","#44464a","#5a5b5e"],
    behavior: [
        "XX|CR:alpha_particle%0.01 AND CR:radiation%2|XX",
        "CR:alpha_particle%0.01 AND CR:radiation%2|CH:actinium%0.01|CR:alpha_particle%0.01 AND CR:radiation%2",
        "M2|M1|M2",
    ],
    reactions: {
        "quark_matter": {elem1: "stable_protactinium"}
    },
    tempHigh: 1568,
    category: "powders",
    state: "solid",
    density: 15700,
    hardness: 0.1,
    conduct: 0.235
}

elements.molten_protactinium = {
    behavior: [
        "XX|CR:fire%2.5 AND CR:alpha_particle%0.01 AND CR:radiation%2|XX",
        "M2 AND CR:alpha_particle%0.01 AND CR:radiation%2|CH:actinium%0.01|M2 AND CR:alpha_particle%0.01 AND CR:radiation%2",
        "M1|M1|M1",
    ],
    reactions: {
        "quark_matter": {elem1: "stable_protactinium"}
    }
}



elements.neptunium = {
    color: ["#626580","#3f4a61","#4a5463"],
    behavior: [
        "XX|CR:neutron%0.1 AND CR:radiation%2|XX",
        "CR:neutron%0.1 AND CR:radiation%2|CH:thorium%0.025|CR:neutron%0.1 AND CR:radiation%2",
        "XX|CR:neutron%0.1 AND CR:radiation%2|XX",
    ],
    reactions: {
        "quark_matter": {elem1: "stable_neptunium"},
        "neutron": {func:fissile, temp1: 150}
    },
    tempHigh: 639,
    category: "solids",
    state: "solid",
    density: 19380,
    hardness: 0.7,
    conduct: 0.2
}

elements.molten_neptunium = {
    behavior: [
        "XX|CR:fire%2.5 AND CR:neutron%0.1 AND CR:radiation%2|XX",
        "M2 AND CR:neutron%0.1 AND CR:radiation%2|CH:thorium%0.025|M2 AND CR:neutron%0.1 AND CR:radiation%2",
        "M1|M1|M1",
    ],
    reactions: {
        "quark_matter": {elem1: "stable_neptunium"},
        "neutron": {func:fissile, temp1: 150}
    }
}

function fissile(pixel,p) {
    if(pixel.temp >= 500)
    {
        transmuteAround(pixel);
        changePixel(pixel, "n_explosion");
    }
    elementCircle(p.x,p.y,2,"neutron");
}


elements.plutonium = {
    color: ["#5fc29f","#5d9e7d","#5b7d6b"],
    behavior: [
        "XX|CR:neutron%0.05 AND CR:radiation%2|XX",
        "CR:neutron%0.05 AND CR:radiation%2|CH:enriched_uranium%0.025|CR:neutron%0.05 AND CR:radiation%2",
        "XX|CR:neutron%0.05 AND CR:radiation%2|XX",
    ],
    reactions: {
        "oxygen": { elem1:"plutonium_dioxide", elem2: null},
        "quark_matter": {elem1: "stable_plutonium"},
        "neutron": {func:plutonium, temp1: 150}
    },
    tempHigh: 639,
    category: "solids",
    state: "solid",
    density: 19850,
    hardness: 0.7,
    conduct: 0.2
}
elements.stable_plutonium = {
    color: [blendColors("#5fc29f","#ff0000"),blendColors("#5d9e7d","#00ff00"),blendColors("#5b7d6b","#0000ff")],
    behavior: behaviors.POWDER,
    reactions: {
        "oxygen": { elem1:"stable_plutonium_dioxide", elem2: null}
    },
    tempHigh: 639,
    category: "solids",
    state: "solid",
    density: 19850,
    hardness: 0.7,
    conduct: 0.2,
    hidden: true
};

runAfterLoad(function() {
    reactList("plutonium", eLists.WATER, { elem2: "dirty_water", chance:0.25 });
});
runAfterLoad(function() {
    reactList("stable_plutonium", eLists.WATER, { elem2: "dirty_water", chance:0.25 });
});

elements.plutonium_dioxide = {
    color: ["#edcf47","#c7a924","#e3c129"],
    behavior: [
        "XX|CR:radiation%0.25|XX",
        "CR:radiation%0.25|XX|CR:radiation%0.25",
        "M2|M1|M2",
    ],
    reactions: {
        "neutron": {func:function(pixel,p) {
            if(pixel.temp >= 500)
            {
                transmuteAround(pixel);
                changePixel(pixel, "n_explosion");
            }
            elementCircle(p.x,p.y,2,"neutron");
        }, temp1: 150},
    },
    tempHigh: 2744,
    category: "powders",
    hidden: true,
    state: "solid",
    density: 11500
};

elements.molten_plutonium_dioxide = {
    behavior: [
        "XX|CR:fire%2.5 AND CR:radiation%0.25|XX",
        "M2 AND CR:radiation%0.25|XX|M2 AND CR:radiation%0.25",
        "M1|M1|M1",
    ],
    reactions: {
        "neutron": {func:function(pixel,p) {transmuteAround(pixel);changePixel(pixel, "n_explosion"); elementCircle(p.x,p.y,2,"neutron")}},
    }
};
elements.stable_plutonium_dioxide = {
    color: [blendColors("#edcf47","#ff0000"),blendColors("#c7a924","#00ff00"),blendColors("#e3c129","#0000ff")],
    behavior: behaviors.POWDER,
    reactions: {
        "neutron": { elem2: null}
    },
    tempHigh: 2744,
    category: "powders",
    hidden: true,
    state: "solid",
    density: 11500
};

reduce("plutonium_dioxide", "oxygen", "plutonium");
reduce("stable_plutonium_dioxide", "oxygen", "stable_plutonium");



acidReact("hydrofluoric_acid","plutonium_dioxide","plutonium_tetrafluoride","fire");
acidReact("hydrofluoric_acid","stable_plutonium_dioxide","plutonium_tetrafluoride","fire");
acidReact("hydrofluoric_acid_gas","plutonium_dioxide","plutonium_tetrafluoride","fire");
acidReact("hydrofluoric_acid_gas","stable_plutonium_dioxide","plutonium_tetrafluoride","fire");
acidReact("hydrogen_fluoride","plutonium_dioxide","plutonium_tetrafluoride","fire");
acidReact("hydrogen_fluoride","stable_plutonium_dioxide","plutonium_tetrafluoride","fire");
acidReact("liquid_hydrogen_fluoride","plutonium_dioxide","plutonium_tetrafluoride","fire");
acidReact("liquid_hydrogen_fluoride","stable_plutonium_dioxide","plutonium_tetrafluoride","fire");

elements.hydrofluoric_acid.ignore.push("plutonium_hexafluoride","stable_plutonium_hexafluoride");
elements.hydrofluoric_acid_gas.ignore.push("plutonium_hexafluoride","stable_plutonium_hexafluoride");
elements.hydrogen_fluoride.ignore.push("plutonium_hexafluoride","stable_plutonium_hexafluoride");
elements.liquid_hydrogen_fluoride.ignore.push("plutonium_hexafluoride","stable_plutonium_hexafluoride");

eListAddIon("PLUTONIUMIV","plutonium_tetrafluoride");
eListAddIon("FLUORIDE","plutonium_tetrafluoride");
eListAdd("INSOLUBLE","plutonium_tetrafluoride");
eListAddIon("STABLEPLUTONIUMIV","stable_plutonium_tetrafluoride");
eListAddIon("FLUORIDE","stable_plutonium_tetrafluoride");
eListAdd("INSOLUBLE","stable_plutonium_tetrafluoride");


elements.plutonium_tetrafluoride = {
    color: ["#a13d0b","#85401d","#733211"],
    behavior: [
        "XX|CR:radiation%0.05|XX",
        "CR:radiation%0.05|XX|CR:radiation%0.05",
        "M2|M1|M2",
    ],
    reactions: {},
    tempHigh: 1027,
    category: "powders",
    state: "solid",
    density: 7100,
    hidden: true
}


elements.molten_plutonium_tetrafluoride = {
    behavior: [
        "XX|CR:fire%2.5 AND CR:radiation%0.05|XX",
        "M2 AND CR:radiation%0.05|XX|M2 AND CR:radiation%0.05",
        "M1|M1|M1",
    ]
}


elements.stable_plutonium_tetrafluoride = {
    color: [blendColors("#a13d0b","#ff0000"),blendColors("#85401d","#00ff00"),blendColors("#733211","#0000ff")],
    behavior: behaviors.POWDER,
    reactions: {},
    tempHigh: 1027,
    category: "powders",
    state: "solid",
    density: 7100,
    hidden: true
}

acidReact("fluorine","plutonium_tetrafluoride","plutonium_hexafluoride","fire");
acidReact("fluorine","stable_plutonium_tetrafluoride","stable_plutonium_hexafluoride","fire");
acidReact("liquid_fluorine","plutonium_tetrafluoride","plutonium_hexafluoride","fire");
acidReact("liquid_fluorine","stable_plutonium_tetrafluoride","stable_plutonium_hexafluoride","fire");
acidReact("foof","plutonium_tetrafluoride","plutonium_hexafluoride",null);
acidReact("foof","stable_plutonium_tetrafluoride","stable_plutonium_hexafluoride",null);

reduce("plutonium_tetrafluoride", "fluorine", "plutonium");
reduce("stable_plutonium_tetrafluoride", "fluorine", "stable_plutonium");


eListAddIon("PLUTONIUMVI","plutonium_hexafluoride");
eListAddIon("FLUORIDE","plutonium_hexafluoride");
eListAdd("INSOLUBLE","plutonium_hexafluoride");
eListAddIon("STABLEPLUTONIUMVI","stable_plutonium_hexafluoride");
eListAddIon("FLUORIDE","stable_plutonium_hexafluoride");
eListAdd("INSOLUBLE","stable_plutonium_hexafluoride");


elements.plutonium_hexafluoride = {
    color: "#6e2602",
    behavior: [
        "XX|CR:radiation%0.05|XX",
        "CR:radiation%0.05|XX|CR:radiation%0.05",
        "M2|M1|M2",
    ],
    reactions: {
        "hydrogen": { elem1: "plutonium_hexafluoride", elem2: "hydrogen_fluoride" }
    },
    tempHigh: 62.5,
    category: "powders",
    state: "solid",
    density: 5080,
    stateHighName: "plutonium_hexafluoride_gas",
    forceAutoGen: true,
    hidden: true
}



elements.plutonium_hexafluoride_gas = {
    behavior: behaviors.GAS,
    behavior2: [
        ["XX","CR:radiation%0.25","XX"],
        ["CR:radiation%0.25","XX","CR:radiation%0.25"],
        ["XX","CR:radiation%0.25","XX"]
    ],
    tick: function(pixel) {
        pixelTick(pixel,elements[pixel.element].behavior2);
    },
    state: "gas",
    density: 14.88,
    reactions: {
        "hydrogen": { elem1: "plutonium_tetrafluoride", elem2: "hydrogen_fluoride" }
    },
}


elements.stable_plutonium_hexafluoride = {
    color: [blendColors("#6e2602","#ff0000"),blendColors("#6e2602","#00ff00"),blendColors("#6e2602","#0000ff")],
    behavior: behaviors.POWDER,
    reactions: {
        "hydrogen": { elem1: "stable_plutonium_tetrafluoride", elem2: "hydrogen_fluoride" }
    },
    tempHigh: 62.5,
    category: "powders",
    state: "solid",
    density: 5080,
    stateHighName: "stable_plutonium_hexafluoride_gas",
    forceAutoGen: true,
    hidden: true
}


elements.stable_plutonium_hexafluoride_gas = {
    behavior: behaviors.GAS,
    state: "gas",
    density: 14.88,
    reactions: {
        "hydrogen": { elem1: "stable_plutonium_tetrafluoride", elem2: "hydrogen_fluoride" }
    },
}



runAfterLoad(function() {
    reactList("plutonium_hexafluoride", eLists.WATER, { "elem1": "plutonium_tetrafluoride", elem2: "hydrofluoric_acid" });
    reactList("stable_plutonium_hexafluoride", eLists.WATER, { "elem1": "stable_plutonium_tetrafluoride", elem2: "hydrofluoric_acid" });
});


elements.molten_plutonium = {
    behavior: [
        "XX|CR:fire%2.5 AND CR:neutron%0.05 AND CR:radiation%2|XX",
        "M2 AND CR:neutron%0.05 AND CR:radiation%2|CH:enriched_uranium%0.025|M2 AND CR:neutron%0.05 AND CR:radiation%2",
        "M1|M1|M1",
    ],
    reactions: {
        "quark_matter": {elem1: "stable_plutonium"},
        "neutron": {func:plutonium, temp1: 150}
    }
}


function plutonium(pixel,p) {
    if(pixel.temp >= 500)
    {
        transmuteAround(pixel);
        changePixel(pixel, "n_explosion");
        elementCircle(p.x,p.y,5,"neutron");
    }
    if(Math.random() < 0.1)
    {
        changePixel(pixel, "americium");
    }
    elementCircle(p.x,p.y,2,"neutron");
}

elements.americium = {
    color: ["#42ebaf","#59d998","#d0dbd5"],
    behavior: [
        "XX|CR:neutron%0.1 AND CR:radiation%2 AND CR:alpha_particle%2|XX",
        "CR:neutron%0.1 AND CR:radiation%2 AND CR:alpha_particle%2|CH:neptunium%0.05 AND CH:plutonium%0.05|CR:neutron%0.1 AND CR:radiation%2 AND CR:alpha_particle%2",
        "XX|CR:neutron%0.1 AND CR:radiation%2 AND CR:alpha_particle%2|XX",
    ],
    reactions: {
        "quark_matter": {elem1: "stable_americium"},
        "neutron": {func:americium, temp1: 150}
    },
    tempHigh: 1176,
    category: "solids",
    state: "solid",
    density: 12000,
    hardness: 0.9,
    conduct: 0.2
}

elements.stable_americium = {
    color: [blendColors("#42ebaf","#ff0000"),blendColors("#59d998","#00ff00"),blendColors("#d0dbd5","#0000ff")],
    behavior: behaviors.WALL,
    tempHigh: 1176,
    category: "solids",
    state: "solid",
    density: 12000,
    hardness: 0.9,
    conduct: 0.2,
    hidden: true
}

elements.molten_americium = {
    behavior: [
        "XX|CR:fire%2.5 AND CR:neutron%0.1 AND CR:radiation%2 AND CR:alpha_particle%2|XX",
        "M2 AND CR:neutron%0.1 AND CR:radiation%2 AND CR:alpha_particle%2|CH:neptunium%0.05 AND CH:plutonium%0.05|M2 AND CR:neutron%0.1 AND CR:radiation%2 AND CR:alpha_particle%2",
        "M1|M1|M1",
    ],
    reactions: {
        "quark_matter": {elem1: "stable_americium"},
        "neutron": {func:americium, temp1: 150}
    }
}

function americium(pixel,p) {
    if(pixel.temp >= 500)
    {
        transmuteAround(pixel);
        changePixel(pixel, "n_explosion");
        elementCircle(p.x,p.y,5,"neutron");
    }
    if(Math.random() < 0.1)
    {
        changePixel(pixel, "curium");
    }
    elementCircle(p.x,p.y,2,"neutron");
}


elements.curium = {
    color: ["#fab1f1","#d6c9d5","#e0b1d6"],
    behavior: [
        "XX|CR:neutron%0.5 AND CR:radiation%1 AND CR:alpha_particle%1|XX",
        "CR:neutron%0.5 AND CR:radiation%1 AND CR:alpha_particle%1|CH:plutonium%0.075|CR:neutron%0.5 AND CR:radiation%1 AND CR:alpha_particle%1",
        "XX|CR:neutron%0.5 AND CR:radiation%1 AND CR:alpha_particle%1|XX",
    ],
    reactions: {
        "quark_matter": {elem1: "stable_curium"},
        "neutron": {func:curium, temp1: 175}
    },
    tempHigh: 1340,
    category: "solids",
    state: "solid",
    density: 13510,
    hardness: 0.9,
    conduct: 0.2
}

elements.stable_curium = {
    color: [blendColors("#fab1f1","#ff0000"),blendColors("#d6c9d5","#00ff00"),blendColors("#e0b1d6","#0000ff")],
    behavior: behaviors.WALL,
    tempHigh: 1340,
    category: "solids",
    state: "solid",
    density: 13510,
    hardness: 0.9,
    conduct: 0.2,
    hidden: true
}

elements.molten_curium = {
    behavior: [
        "XX|CR:fire%2.5 AND CR:neutron%0.5 AND CR:radiation%1 AND CR:alpha_particle%1|XX",
        "M2 AND CR:neutron%0.5 AND CR:radiation%1 AND CR:alpha_particle%1|CH:plutonium%0.075|M2 AND CR:neutron%0.5 AND CR:radiation%1 AND CR:alpha_particle%1",
        "M1|M1|M1",
    ],
    reactions: {
        "quark_matter": {elem1: "stable_curium"},
        "neutron": {func:curium, temp1: 150}
    }
}

function curium(pixel,p) {
    if(pixel.temp >= 500)
    {
        transmuteAround(pixel);
        changePixel(pixel, "n_explosion");
        elementCircle(p.x,p.y,5,"neutron");
    }
    if(Math.random() < 0.1)
    {
        changePixel(pixel, "berkelium");
    }
    elementCircle(p.x,p.y,2,"neutron");
}


elements.berkelium = {
    color: ["#f2edfa","#bdbccf","#d7cae8"],
    behavior: [
        "XX|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|XX",
        "CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|CH:californium%0.075|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1",
        "XX|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|XX",
    ],
    reactions: {
        "quark_matter": {elem1: "stable_berkelium"},
        "neutron": {func:berkelium, temp1: 175}
    },
    tempHigh: 986,
    category: "solids",
    state: "solid",
    density: 13250,
    hardness: 0.9,
    conduct: 0.2
}

elements.stable_berkelium = {
    color: [blendColors("#f2edfa","#ff0000"),blendColors("#bdbccf","#00ff00"),blendColors("#d7cae8","#0000ff")],
    behavior: behaviors.WALL,
    tempHigh: 986,
    category: "solids",
    state: "solid",
    density: 13250,
    hardness: 0.9,
    conduct: 0.2,
    hidden: true
}

elements.molten_berkelium = {
    behavior: [
        "XX|CR:fire%2.5 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|XX",
        "M2 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|CH:californium%0.075|M2 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1",
        "M1|M1|M1",
    ],
    reactions: {
        "quark_matter": {elem1: "stable_berkelium"},
        "neutron": {func:berkelium, temp1: 150}
    }
}

function berkelium(pixel,p) {
    if(pixel.temp >= 500)
    {
        transmuteAround(pixel);
        changePixel(pixel, "n_explosion");
        elementCircle(p.x,p.y,5,"neutron");
    }
    if(Math.random() < 0.1)
    {
        changePixel(pixel, "californium");
    }
    elementCircle(p.x,p.y,2,"neutron",0.2);
}


elements.californium = {
    color: ["#dfd0f7","#bcbade","#b99be0"],
    behavior: [
        "XX|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|XX",
        "CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|CH:curium%0.05 AND CH:einsteinium%0.05|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1",
        "XX|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|XX",
    ],
    reactions: {
        "quark_matter": {elem1: "stable_californium"},
        "neutron": {func:californium, temp1: 175}
    },
    tempHigh: 900 ,
    category: "solids",
    state: "solid",
    density: 15100,
    hardness: 0.9,
    conduct: 0.2
}

elements.stable_californium = {
    color: [blendColors("#dfd0f7","#ff0000"),blendColors("#bcbade","#00ff00"),blendColors("#b99be0","#0000ff")],
    behavior: behaviors.WALL,
    tempHigh: 900 ,
    category: "solids",
    state: "solid",
    density: 15100,
    hardness: 0.9,
    conduct: 0.2,
    hidden: true
}

elements.molten_californium = {
    behavior: [
        "XX|CR:fire%2.5 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|XX",
        "M2 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|CH:curium%0.05 AND CH:einsteinium%0.05|M2 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1",
        "M1|M1|M1",
    ],
    reactions: {
        "quark_matter": {elem1: "stable_californium"},
        "neutron": {func:californium, temp1: 150}
    }
}

function californium(pixel,p) {
    if(pixel.temp >= 500)
    {
        transmuteAround(pixel);
        changePixel(pixel, "n_explosion");
        elementCircle(p.x,p.y,5,"neutron");
    }
    if(Math.random() < 0.1)
    {
        changePixel(pixel, "einsteinium");
    }
    elementCircle(p.x,p.y,2,"neutron",0.25);
}


elements.einsteinium = {
    color: ["#3aa6c2","#b8edf1","#83d9e4"],
    behavior: [
        "XX|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|XX",
        "CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|CH:berkelium%0.05 AND CH:fermium%0.05|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1",
        "XX|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|XX",
    ],
    reactions: {
        "quark_matter": {elem1: "stable_einsteinium"},
        "neutron": {func:einsteinium, temp1: 175}
    },
    tempHigh: 1133,
    category: "solids",
    state: "solid",
    density: 8840,
    hardness: 0.9,
    conduct: 0.2
}

elements.stable_einsteinium = {
    color: [blendColors("#3aa6c2","#ff0000"),blendColors("#b8edf1","#00ff00"),blendColors("#83d9e4","#0000ff")],
    behavior: behaviors.WALL,
    tempHigh: 1133,
    category: "solids",
    state: "solid",
    density: 8840,
    hardness: 0.9,
    conduct: 0.2,
    hidden: true
}

elements.molten_einsteinium = {
    behavior: [
        "XX|CR:fire%2.5 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|XX",
        "M2 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|CH:berkelium%0.05 AND CH:fermium%0.05|M2 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1",
        "M1|M1|M1",
    ],
    reactions: {
        "quark_matter": {elem1: "stable_einsteinium"},
        "neutron": {func:einsteinium, temp1: 150}
    }
}

function einsteinium(pixel,p) {
    if(pixel.temp >= 500)
    {
        transmuteAround(pixel);
        changePixel(pixel, "n_explosion");
        elementCircle(p.x,p.y,5,"neutron");
    }
    if(Math.random() < 0.1)
    {
        changePixel(pixel, "fermium");
    }
    elementCircle(p.x,p.y,3,"neutron");
}


elements.fermium = {
    color: ["#c8a7fc","#cecbf2","#d5bff2"],
    behavior: [
        "XX|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|XX",
        "CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|CH:californium%0.1|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1",
        "XX|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|XX",
    ],
    reactions: {
        "quark_matter": {elem1: "stable_fermium"},
        "neutron": {func:fermium, temp1: 175}
    },
    tempHigh: 1800,
    category: "solids",
    state: "solid",
    density: 9710,
    hardness: 0.9,
    conduct: 0.2
}

elements.stable_fermium = {
    color: [blendColors("#c8a7fc","#ff0000"),blendColors("#cecbf2","#00ff00"),blendColors("#d5bff2","#0000ff")],
    behavior: behaviors.WALL,
    tempHigh: 1800,
    category: "solids",
    state: "solid",
    density: 9710,
    hardness: 0.9,
    conduct: 0.2,
    hidden: true
}

elements.molten_fermium = {
    behavior: [
        "XX|CR:fire%2.5 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|XX",
        "M2 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|CH:californium%0.1|M2 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1",
        "M1|M1|M1",
    ],
    reactions: {
        "quark_matter": {elem1: "stable_fermium"},
        "neutron": {func:fermium, temp1: 150}
    }
}

function fermium(pixel,p) {
    if(pixel.temp >= 500)
    {
        changePixel(pixel, "n_explosion");
        elementCircle(p.x,p.y,5,"neutron");
    }
    elementCircle(p.x,p.y,3,"neutron",0.2);
}


function transmuteAround(pixel) {
    elementCircle(pixel.x,pixel.y,40,"radium",0.1,["thorium","molten_thorium"]);
    elementCircle(pixel.x,pixel.y,40,"plutonium",0.1,["depleted_uranium","molten_depleted_uranium"]);
    elementCircle(pixel.x,pixel.y,40,"neptunium",0.1,["enriched_uranium","molten_enriched_uranium"]);
    elementCircle(pixel.x,pixel.y,40,"americium",0.1,["plutonium","molten_plutonium"]);
    elementCircle(pixel.x,pixel.y,40,"curium",0.1,["americium","molten_americium"]);
    elementCircle(pixel.x,pixel.y,40,"berkelium",0.1,["curium","molten_curium"]);
    elementCircle(pixel.x,pixel.y,40,"californium",0.1,["berkelium","molten_berkelium"]);
    elementCircle(pixel.x,pixel.y,40,"einsteinium",0.1,["californium","molten_californium"]);
    elementCircle(pixel.x,pixel.y,40,"fermium",0.1,["einsteinium","molten_einsteinium"]);
}



function elementCircle(x,y,radius,pixelType="fire",chance = 0.1,replace = [null]) {
    
    if (!Array.isArray(replace)) {
        replace = [replace]
    }
    // if pixelType includes , split it into an array
    if (pixelType.indexOf(",") !== -1) {
        pixelType = pixelType.split(",");
    }
    var coords = circleCoords(x,y,radius);
    for (var i = 0; i < coords.length; i++) {
        if (isEmpty(coords[i].x,coords[i].y) && replace.includes(null)) {
            if (Math.random() > chance) { } // do nothing
            else {
                // if pixelType is an array, choose a random item
                if (Array.isArray(pixelType)) {
                    createPixel(pixelType[Math.floor(Math.random() * pixelType.length)],coords[i].x,coords[i].y);
                }
                else {
                    createPixel(pixelType,coords[i].x,coords[i].y);
                }
            }
        }
        if (!isEmpty(coords[i].x,coords[i].y, true) && replace.includes(pixelMap[coords[i].x][coords[i].y].element)) {
            if (Math.random() > chance) { } // do nothing
            else {
                // if pixelType is an array, choose a random item
                if (Array.isArray(pixelType)) {
                    changePixel(pixelMap[coords[i].x][coords[i].y],pixelType[Math.floor(Math.random() * pixelType.length)]);
                }
                else {
                    changePixel(pixelMap[coords[i].x][coords[i].y],pixelType);
                }
            }
        }
    }
}



elements.thorium_dioxide = {
    color: ["#313331","#1a1a18","#171717","#24231d","#262622","#171613"],
    behavior: [
        "XX|CR:radiation%0.01|XX",
        "CR:radiation%0.01|XX|CR:radiation%0.01",
        "M2|M1|M2",
    ],
    reactions: {},
    hidden: true,
    tempHigh: 2865,
    category: "powders",
    state: "solid",
    density: 10970
}

elements.stable_thorium_dioxide = {
    color: [blendColors("#313331","#ff0000"),blendColors("#1a1a18","#00ff00"),blendColors("#171717","#0000ff"),blendColors("#24231d","#ff0000"),blendColors("#262622","#00ff00"),blendColors("#171613","#0000ff")],
    behavior: behaviors.POWDER,
    reactions: {},
    hidden: true,
    tempHigh: 2865,
    category: "powders",
    state: "solid",
    density: 10970
}

eListAddIon("THORIUMIV","thorium_dioxide");
eListAddIon("OXIDE","thorium_dioxide");
eListAdd("INSOLUBLE","thorium_dioxide");
eListAddIon("STABLETHORIUMIV","stable_thorium_dioxide");
eListAddIon("OXIDE","stable_thorium_dioxide");
eListAdd("INSOLUBLE","stable_thorium_dioxide");

acidReact("hydrofluoric_acid","thorium_dioxide","thorium_tetrafluoride","fire");
acidReact("hydrofluoric_acid","stable_thorium_dioxide","stable_thorium_tetrafluoride","fire");
acidReact("hydrofluoric_acid_gas","thorium_dioxide","thorium_tetrafluoride","fire");
acidReact("hydrofluoric_acid_gas","stable_thorium_dioxide","stable_thorium_tetrafluoride","fire");
acidReact("hydrogen_fluoride","thorium_dioxide","thorium_tetrafluoride","fire");
acidReact("hydrogen_fluoride","stable_thorium_dioxide","stable_thorium_tetrafluoride","fire");
acidReact("liquid_hydrogen_fluoride","thorium_dioxide","thorium_tetrafluoride","fire");
acidReact("liquid_hydrogen_fluoride","stable_thorium_dioxide","stable_thorium_tetrafluoride","fire");


elements.thorium_tetrafluoride = {
    color: "#e5e6e5",
    behavior: [
        "XX|CR:radiation%0.01|XX",
        "CR:radiation%0.01|XX|CR:radiation%0.01",
        "M2|M1|M2",
    ],
    reactions: {},
    hidden: true,
    tempHigh: 1110,
    category: "powders",
    state: "solid",
    density: 6300
}

elements.stable_thorium_tetrafluoride = {
    color: [blendColors("#e5e6e5","#ff0000"),blendColors("#e5e6e5","#00ff00"),blendColors("#e5e6e5","#0000ff")],
    behavior: behaviors.POWDER,
    reactions: {},
    hidden: true,
    tempHigh: 1110,
    category: "powders",
    state: "solid",
    density: 6300
}

eListAddIon("THORIUMIV","thorium_tetrafluoride");
eListAddIon("OXIDE","thorium_tetrafluoride");
eListAdd("INSOLUBLE","thorium_tetrafluoride");
eListAddIon("STABLETHORIUMIV","stable_thorium_tetrafluoride");
eListAddIon("OXIDE","stable_thorium_tetrafluoride");
eListAdd("INSOLUBLE","stable_thorium_tetrafluoride");

reduce("thorium_dioxide", "oxygen", "thorium");
reduce("stable_thorium_dioxide", "oxygen", "stable_thorium");
reduce("thorium_tetrafluoride", "fluorine", "thorium");
reduce("stable_thorium_tetrafluoride", "fluorine", "stable_thorium");


elements.stable_thorium = {
    color: [blendColors("#599e8a","#ff0000"),blendColors("#364d4b","#00ff00"),blendColors("#494d4c","#0000ff"),blendColors("#428a58","#ff0000"),blendColors("#658d7a","#00ff00"),blendColors("#89e0a2","#0000ff")],
    behavior: behaviors.WALL,
    reactions: {
        "oxygen": { elem1:"stable_thorium_dioxide", elem2: null}
    },
    tempHigh: 1750,
    category: "solids",
    state: "solid",
    hidden: true,
    density: 11700,
    hardness: 0.7,
    conduct: 0.235
};
elements.molten_stable_thorium = {
    reactions: {
        "oxygen": { elem1:"stable_thorium_dioxide", elem2: null}
    }
}

elements.stable_radium = {
    color: [blendColors("#3bdeff","#ff0000"),blendColors("#3bdeff","#00ff00"),blendColors("#3bdeff","#0000ff")],
    behavior: behaviors.POWDER,
    reactions: {
        "oxygen": { "elem1":"radium_oxide"},
    },
    tempHigh: 700,
    category: "powders",
    state: "solid",
    density: 5500,
    hidden: true,
    conduct: 0.40
};


elements.radium_oxide = {
    color: [blendColors("#b2d9d9","#ff0000",0.25),blendColors("#b2d9d9","#00ff00",0.25),blendColors("#b2d9d9","#0000ff",0.25)],
    behavior: behaviors.POWDER,
    reactions: {},
    hidden: true,
    tempHigh: 2327,
    category: "powders",
    state: "solid",
    density: 12000,
};


eListAddIon("RADIUM","radium_oxide");
eListAddIon("OXIDE","radium_oxide");
eListAdd("INSOLUBLE","radium_oxide");


elements.radium_hydroxide = {
    color: [blendColors("#f2fafa","#ff0000",0.25),blendColors("#f2fafa","#00ff00",0.25),blendColors("#f2fafa","#0000ff",0.25)],
    behavior: behaviors.POWDER,
    hidden: true,
    tempHigh: 600,
    reactions: {},
    stateHigh: "radium_oxide",
    category: "powders",
    state: "solid",
    density: 12000,
};

eListAdd("BASE","radium_hydroxide");
eListAddIon("RADIUM","radium_hydroxide","base");
eListAddIon("HYDROXIDE","radium_hydroxide","base");
eListAdd("INSOLUBLE","radium_hydroxide");

createSalt("radium_chloride","radium_chloride_solution",[blendColors("#faf3de","#ff0000",0.25),blendColors("#faf3de","#00ff00",0.25),blendColors("#faf3de","#0000ff",0.25)],[blendColors("#8eadef","#ff0000",0.25),blendColors("#8eadef","#00ff00",0.25),blendColors("#8eadef","#0000ff",0.25)],true,true,900,-2,102,4900,1050,"RADIUM","CHLORIDE");

elements.radium_chloride_solution.reactions["mercury"] = { elem1:["stable_radium","chlorine","hydrogen"], charged:true, chance:0.02 };



elements.molten_stable_radium = {
    reactions: {
        "oxygen": { "elem1":"radium_oxide"},
    },
    conduct: 0.40
};

runAfterLoad(function() {
    reactList("radium_oxide", eLists.WATER, { "elem1": "radium_hydroxide", "elem2": null, chance:0.01 });
    reactList("stable_radium", eLists.WATER, { "elem1": ["radium_hydroxide","pop"], elem2:["hydrogen","bubble"], chance:0.05, temp2:350 });
    reactList("molten_stable_radium", eLists.WATER, { "elem1": ["radium_hydroxide","pop"], elem2:["hydrogen","bubble"], chance:0.05, temp2:350 });
});

elements.stable_actinium = {
    color: [blendColors("#e5e6e5","#ff0000",0.25),blendColors("#62ebf0","#00ff00"),blendColors("#62ebf0","#0000ff")],
    behavior: behaviors.POWDER,
    reactions: {
        "oxygen": { "elem1":"actinium_oxide"},
    },
    hidden: true,
    tempHigh: 1227,
    category: "powders",
    state: "solid",
    density: 10000,
    conduct: 0.225
};
elements.molten_stable_actinium = {
    reactions: {
        "oxygen": { "elem1":"actinium_oxide"},
    },
    conduct: 0.225
};


runAfterLoad(function() {
    reactList("stable_actinium", eLists.WATER, { "elem1": "actinium_hydroxide", "elem2": "hydrogen", chance:0.01 });
    reactList("molten_stable_actinium", eLists.WATER, { "elem1": "actinium_hydroxide", "elem2": "hydrogen", chance:0.01 });
});


elements.actinium_oxide = {
    color: [blendColors("#ebf5f5","#ff0000",0.25),blendColors("#ebf5f5","#00ff00",0.25),blendColors("#ebf5f5","#0000ff",0.25)],
    behavior: behaviors.POWDER,
    reactions: {
		"water": { "elem1": "actinium_hydroxide", "elem2": null, chance:0.01 },
		"salt_water": { "elem1": "actinium_hydroxide", "elem2": null, chance:0.01 },
		"sugar_water": { "elem1": "actinium_hydroxide", "elem2": null, chance:0.01 },
		"dirty_water": { "elem1": "actinium_hydroxide", "elem2": null, chance:0.01 },
		"steam": { "elem1": "actinium_hydroxide", "elem2": null, chance:0.01 },
		"seltzer": { "elem1": "actinium_hydroxide", "elem2": null, chance:0.01 },
		"pool_water": { "elem1": "actinium_hydroxide", "elem2": null, chance:0.01 },
		"primordial_soup": { "elem1": "actinium_hydroxide", "elem2": null, chance:0.01 },
    },
    hidden: true,
    tempHigh: 2327,
    category: "powders",
    state: "solid",
    density: 12000,
};

runAfterLoad(function() {
    reactList("actinium_oxide", eLists.WATER, { "elem1": "actinium_hydroxide", "elem2": null, chance:0.01 });
});



elements.actinium_hydroxide = {
    color: [blendColors("#f2cef2","#ff0000",0.25),blendColors("#f2cef2","#00ff00",0.25),blendColors("#f2cef2","#0000ff",0.25)],
    behavior: behaviors.POWDER,
    hidden: true,
    tempHigh: 350,
    stateHigh: ["actinium_oxide","steam"],
    category: "powders",
    state: "solid",
    density: 12000,
};


eListAdd("BASE","actinium_hydroxide");
eListAddIon("ACTINIUM","actinium_hydroxide","base");
eListAddIon("HYDROXIDE","actinium_hydroxide","base");
eListAdd("INSOLUBLE","actinium_hydroxide");

reduce("actinium_oxide", "oxygen", "stable_actinium");


elements.stable_protactinium = {
    color: [blendColors("#9899a3","#ff0000"),blendColors("#44464a","#00ff00"),blendColors("#5a5b5e","#0000ff")],
    behavior: behaviors.POWDER, 
    reactions: {
        "oxygen": { "elem1":"protactinium_v_oxide", chance:0.01},
		"steam": { "elem1": "protactinium_hydroxide", "elem2": "hydrogen", chance:0.01 },
    },

    tempHigh: 1568,
    category: "powders",
    state: "solid",
    density: 15700,
    hardness: 0.1,
    conduct: 0.235,
    hidden: true
};

elements.molten_stable_protactinium = {
    reactions: {
        "oxygen": { "elem1":"protactinium_v_oxide", chance:0.01},
		"steam": { "elem1": "protactinium_hydroxide", "elem2": "hydrogen", chance:0.01 },
    },
};


eListAdd("BASE","protactinium_hydroxide");
eListAddIon("PROTACTINIUMV","protactinium_hydroxide","base");
eListAddIon("HYDROXIDE","protactinium_hydroxide","base");
eListAdd("INSOLUBLE","protactinium_hydroxide");

elements.protactinium_hydroxide = {
    color: [blendColors("#95c7c7","#ff0000",0.25),blendColors("#95c7c7","#00ff00",0.25),blendColors("#95c7c7","#0000ff",0.25)],
    behavior: behaviors.POWDER,
    hidden: true,
    tempHigh: 350,
    category: "powders",
    state: "solid",
    stateHigh: ["protactinium_v_oxide","steam"],
    density: 12000,
};

elements.protactinium_v_oxide = {
    color: [blendColors("#353b3b","#ff0000",0.25),blendColors("#353b3b","#00ff00",0.25),blendColors("#353b3b","#0000ff",0.25)],
    behavior: behaviors.POWDER,
    hidden: true,
    tempHigh: 2500,
    category: "powders",
    state: "solid",
    density: 12000,
    reactions: {},
};

eListAddIon("PROTACTINIUMV","protactinium_v_oxide");
eListAddIon("OXIDE","protactinium_v_oxide");
eListAdd("INSOLUBLE","protactinium_v_oxide");


acidReact("hydrofluoric_acid","protactinium_v_oxide","protactinium_pentafluoride","fire",0);
acidReact("hydrofluoric_acid_gas","protactinium_v_oxide","protactinium_pentafluoride","fire",0);
acidReact("hydrogen_fluoride","protactinium_v_oxide","protactinium_pentafluoride","fire",0);
acidReact("liquid_hydrogen_fluoride","protactinium_v_oxide","protactinium_pentafluoride","fire",0);

elements.protactinium_pentafluoride = {
    color: [blendColors("#cbf2ec","#ff0000",0.25),blendColors("#cbf2ec","#00ff00",0.25),blendColors("#cbf2ec","#0000ff",0.25)],
    behavior: behaviors.POWDER,
    hidden: true,
    tempHigh: 2500,
    category: "powders",
    state: "solid",
    density: 12000,
    reactions: {},
};

eListAddIon("PROTACTINIUMV","protactinium_pentafluoride");
eListAddIon("OXIDE","protactinium_pentafluoride");
eListAdd("INSOLUBLE","protactinium_pentafluoride");


reduce("protactinium_v_oxide", "oxygen", "stable_protactinium");
reduce("protactinium_pentafluoride", "fluorine", "stable_protactinium");

elements.stable_neptunium = {
    color: [blendColors("#626580","#ff0000"),blendColors("#3f4a61","#00ff00"),blendColors("#4a5463","#0000ff")],
    behavior: behaviors.WALL, 
    reactions: {
        "oxygen": { "elem1":"neptunium_dioxide", chance:0.01}
    },
    tempHigh: 639,
    category: "solids",
    state: "solid",
    density: 19380,
    hardness: 0.7,
    conduct: 0.2,
    hidden: true
};

elements.molten_stable_neptunium = {
    reactions: {
        "oxygen": { "elem1":"neptunium_dioxide", chance:0.01}
    },
};


elements.neptunium_dioxide = {
    color: [blendColors("#47c94f","#ff0000"),blendColors("#47c94f","#00ff00"),blendColors("#47c94f","#0000ff")],
    behavior: behaviors.POWDER,
    hidden: true,
    tempHigh: 2600,
    category: "powders",
    state: "solid",
    density: 12000,
    reactions: {},
};


eListAddIon("NEPTUNIUMIV","neptunium_dioxide");
eListAddIon("OXIDE","neptunium_dioxide");
eListAdd("INSOLUBLE","neptunium_dioxide");

elements.neptunium_tetrafluoride = {
    color: [blendColors("#73e67a","#ff0000"),blendColors("#73e67a","#00ff00"),blendColors("#73e67a","#0000ff")],
    behavior: behaviors.POWDER,
    hidden: true,
    tempHigh: 2550,
    category: "powders",
    state: "solid",
    density: 12000,
    reactions: {},
};

eListAddIon("NEPTUNIUMIV","neptunium_tetrafluoride");
eListAddIon("FLUORIDE","neptunium_tetrafluoride");
eListAdd("INSOLUBLE","neptunium_tetrafluoride");

acidReact("hydrofluoric_acid","neptunium_dioxide","neptunium_tetrafluoride","fire",0);
acidReact("hydrofluoric_acid_gas","neptunium_dioxide","neptunium_tetrafluoride","fire",0);
acidReact("hydrogen_fluoride","neptunium_dioxide","neptunium_tetrafluoride","fire",0);
acidReact("liquid_hydrogen_fluoride","neptunium_dioxide","neptunium_tetrafluoride","fire",0);

acidReact("fluorine","neptunium_tetrafluoride","neptunium_hexafluoride","fire",0);
acidReact("liquid_fluorine","neptunium_tetrafluoride","neptunium_hexafluoride","fire",0);
acidReact("fluorine","neptunium_dioxide","neptunium_hexafluoride","fire",0);
acidReact("liquid_fluorine","neptunium_dioxide","neptunium_hexafluoride","fire",0);

eListAddIon("NEPTUNIUMVI","neptunium_hexafluoride");
eListAddIon("FLUORIDE","neptunium_hexafluoride");
eListAdd("INSOLUBLE","neptunium_hexafluoride");

reduce("neptunium_dioxide", "oxygen", "stable_neptunium");
reduce("neptunium_tetrafluoride", "fluorine", "stable_neptunium");

elements.neptunium_hexafluoride = {
    color: [blendColors("#eda042","#ff0000"),blendColors("#eda042","#00ff00"),blendColors("#eda042","#0000ff")],
    behavior: behaviors.POWDER,
    reactions: {
        "hydrogen": { elem1: "neptunium_tetrafluoride", elem2: "hydrogen_fluoride" }
    },
    tempHigh: 55,
    category: "powders",
    state: "solid",
    density: 5000,
    stateHighName: "neptunium_hexafluoride_gas",
    forceAutoGen: true,
    hidden: true
}


elements.neptunium_hexafluoride_gas = {
    behavior: behaviors.GAS,
    state: "gas",
    density: 14.591,
    reactions: {
        "hydrogen": { elem1: "neptunium_tetrafluoride", elem2: "hydrogen_fluoride" }
    },
}


runAfterLoad(function() {
    reactList("neptunium_hexafluoride", eLists.WATER, { "elem1": "neptunium_tetrafluoride", elem2: "hydrofluoric_acid" });
    reactList("neptunium_hexafluoride_gas", eLists.WATER, { "elem1": "neptunium_tetrafluoride", elem2: "hydrofluoric_acid" });
});



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


createAcid("francium_hydroxide",structuredClone(defaultBaseReactions),structuredClone(defaultBaseGasReactions),[blendColors("#863bff","#ff0000"),blendColors("#4d00ca","#00ff00"),blendColors("#897b9e","#0000ff")],true,true,100,100,0,1000,1200,1,"FRANCIUM","base")

eListAddIon("HYDROXIDE",["francium_hydroxide","francium_hydroxide_gas"],"base");

eListAdd("BASE", []);


function acidNeutralize(base)
{
    for(let i = 0; i < eLists.ACID.length; i++)
    {
        elements[eLists.ACID[i]].reactions[base] = { "elem1":"neutral_acid", "elem2":null };
    }
    for(let i = 0; i < eLists.ACIDGAS.length; i++)
    {
        elements[eLists.ACIDGAS[i]].reactions[base] = { "elem1":"hydrogen", "elem2":null };
    }
    eLists.BASE.push(base);
    if(eLists.HYDROGEN.indexOf(base) >= 0)
    {
        eLists.HYDROGEN.splice(eLists.HYDROGEN.indexOf(base),1);
    }
    if(elements[base].salt)
    for(i in elements[base].salt)
    {
        if(elements[base].salt[i])
        {
            if(elements[base].salt[i].components.indexOf("HYDROGEN") >= 0)
            {
                elements[base].salt[i].components.splice(elements[base].salt[i].components.indexOf("HYDROGEN"),1);
            }
        }
    }
}


acidNeutralize("radium_hydroxide");
acidNeutralize("actinium_hydroxide");
acidNeutralize("protactinium_hydroxide");


elements.caustic_soda = {
    color: "#ffe8ff",
    behavior: behaviors.CAUSTIC,
    category: "powders",
    tempHigh: 323,
    state: "solid",
    density: 2130,
    hidden: true,
    alias: "sodium hydroxide powder"
}

acidNeutralize("sodium_hydride");

acidNeutralize("sodium_methoxide");
acidNeutralize("molten_sodium_methoxide");


elements.francium_hydroxide.breakInto = "francium_hydroxide";
elements.francium_hydroxide_gas.breakInto = "francium_hydroxide_gas";
acidNeutralize("francium_hydroxide");
acidNeutralize("francium_hydroxide_gas");

createAcid("sodium_hydroxide",structuredClone(defaultBaseReactions),structuredClone(defaultBaseGasReactions),["#fc3bff","#c000ca","#9b7b9e"],false,true,100,100,0,1000,1050,1,"SODIUM","base");
acidNeutralize("sodium_hydroxide");
acidNeutralize("sodium_hydroxide_gas");
eListAddIon("HYDROXIDE",["sodium_hydroxide","sodium_hydroxide_gas"],"base");

eLists.CAUSTIC.push("caustic_soda");
acidNeutralize("caustic_soda");
elements.caustic_soda.ignore = elements.sodium_hydroxide.ignore;
acidIgnore(["caustic_soda"]);

eListAddIon("SODIUM",["caustic_soda","molten_caustic_soda"],"base");
eListAddIon("HYDROXIDE",["caustic_soda","molten_caustic_soda"],"base");
eListAdd("COMPOUND","caustic_soda");

elements.caustic_soda.behavior = behaviors.CAUSTIC;
if(!elements.caustic_soda.reactions)
{
    elements.caustic_soda.reactions = {};
}
elements.caustic_soda.reactions["water"] = { elem1:"sodium_hydroxide", elem2:null };
elements.caustic_soda.reactions["salt_water"] = { elem1:"sodium_hydroxide", elem2:null };
elements.caustic_soda.reactions["sugar_water"] = { elem1:"sodium_hydroxide", elem2:null };
elements.caustic_soda.reactions["dirty_water"] = { elem1:"sodium_hydroxide", elem2:null };
elements.caustic_soda.reactions["seltzer"] = { elem1:"sodium_hydroxide", elem2:null };
elements.caustic_soda.reactions["pool_water"] = { elem1:"sodium_hydroxide", elem2:null };

elements.sodium_hydroxide_gas.tempHigh = 150;
elements.sodium_hydroxide_gas.stateHigh = ["caustic_soda","steam"];

createAcid("potassium_hydroxide",structuredClone(defaultBaseReactions),structuredClone(defaultBaseGasReactions),["#3bc4ff","#0062ca","#7b949e"],false,true,100,100,0,1000,1075,1,"POTASSIUM","base");
acidNeutralize("potassium_hydroxide");
acidNeutralize("potassium_hydroxide_gas");
eListAddIon("HYDROXIDE",["potassium_hydroxide","potassium_hydroxide_gas"],"base");

eLists.CAUSTIC.push("caustic_potash");
acidNeutralize("caustic_potash");
elements.caustic_potash.ignore = elements.potassium_hydroxide.ignore;
acidIgnore(["caustic_potash"]);


eListAddIon("POTASSIUM",["caustic_potash","molten_caustic_potash"],"base");
eListAddIon("HYDROXIDE",["caustic_potash","molten_caustic_potash"],"base");
eListAdd("COMPOUND","caustic_potash");


elements.caustic_potash.behavior = behaviors.CAUSTIC;
if(!elements.caustic_potash.reactions)
{
    elements.caustic_potash.reactions = {};
}
elements.caustic_potash.reactions["water"] = { elem1:"potassium_hydroxide", elem2:null };
elements.caustic_potash.reactions["salt_water"] = { elem1:"potassium_hydroxide", elem2:null };
elements.caustic_potash.reactions["sugar_water"] = { elem1:"potassium_hydroxide", elem2:null };
elements.caustic_potash.reactions["dirty_water"] = { elem1:"potassium_hydroxide", elem2:null };
elements.caustic_potash.reactions["seltzer"] = { elem1:"potassium_hydroxide", elem2:null };
elements.caustic_potash.reactions["pool_water"] = { elem1:"potassium_hydroxide", elem2:null };

elements.potassium_hydroxide_gas.tempHigh = 150;
elements.potassium_hydroxide_gas.stateHigh = ["caustic_potash","steam"];

createAcid("red_mud",structuredClone(defaultBaseReactions),structuredClone(defaultBaseGasReactions),["#ab3d24","#cc5d2d","#a81b1b"],true,true,1600,1600,0,Infinity,5200,3,"REDMUD","base");
acidNeutralize("red_mud");
acidNeutralize("red_mud_gas");
elements.red_mud.viscosity = 1000000;
elements.red_mud.reactions.water = {"elem2":"dirty_water" };
elements.red_mud.reactions.salt_water = {"elem2":"dirty_water" };
elements.red_mud.reactions.sugar_water = {"elem2":"dirty_water" };
elements.red_mud.reactions.seltzer = {"elem2":"dirty_water" };
elements.red_mud.reactions.pool_water = {"elem2":"dirty_water" };
elements.red_mud.reactions.primordial_soup = {"elem2":"dirty_water" };

acidReact("potassium_hydroxide","fertilizer","niter","ammonia",10);
acidReact("potassium_hydroxide_gas","fertilizer","niter","ammonia",10);


acidReact("potassium_hydroxide","carbon_dioxide","potassium_carbonate",null,10);
acidReact("potassium_hydroxide_gas","carbon_dioxide","potassium_carbonate",null,10);
elements.potassium_hydroxide.ignore.push("carbon_dioxide","potassium_carbonate");
elements.potassium_hydroxide_gas.ignore.push("carbon_dioxide","potassium_carbonate");

elements.salt_water.reactions["mercury"] = { elem1:["sodium_hydroxide","chlorine","hydrogen"], charged:true, chance:0.02 };
elements.sodium_hydroxide.ignore.push("mercury","chlorine","salt_water");
elements.sodium_hydroxide_gas.ignore.push("mercury","chlorine","salt_water");
elements.potassium_salt_water.reactions["mercury"] = { elem1:["potassium_hydroxide","chlorine","hydrogen"], charged:true, chance:0.02 };
elements.potassium_hydroxide.ignore.push("mercury","chlorine","potassium_salt_water");
elements.potassium_hydroxide_gas.ignore.push("mercury","chlorine","potassium_salt_water");

acidReact("sodium_hydroxide","bauxite","sodium_aluminate_solution","red_mud",10);
acidReact("sodium_hydroxide_gas","bauxite","sodium_aluminate_solution","red_mud",10);
elements.red_mud.ignore.push("sodium_aluminate_solution_ice","sodium_aluminate","molten_sodium_aluminate","sodium_carbonate_solution","spent_sodium_aluminate_solution","spent_sodium_aluminate_solution_ice","aluminum_hydroxide","alumina","molten_alumina");
elements.red_mud_gas.ignore.push("sodium_aluminate_solution_ice","sodium_aluminate","molten_sodium_aluminate","sodium_carbonate_solution","spent_sodium_aluminate_solution","spent_sodium_aluminate_solution_ice","aluminum_hydroxide","alumina","molten_alumina");
elements.sodium_hydroxide.ignore.push("sodium_aluminate_solution_ice","sodium_aluminate","molten_sodium_aluminate","sodium_carbonate_solution","spent_sodium_aluminate_solution","spent_sodium_aluminate_solution_ice","aluminum_hydroxide","alumina","molten_alumina");
elements.sodium_hydroxide_gas.ignore.push("sodium_aluminate_solution_ice","sodium_aluminate","molten_sodium_aluminate","sodium_carbonate_solution","spent_sodium_aluminate_solution","spent_sodium_aluminate_solution_ice","aluminum_hydroxide","alumina","molten_alumina");



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

elements.hydrofluoric_acid.ignore.push("molten_alumina","aluminum_trifluoride_gas");
elements.hydrofluoric_acid_gas.ignore.push("molten_alumina","aluminum_trifluoride_gas");
elements.hydrogen_fluoride.ignore.push("molten_alumina","aluminum_trifluoride_gas");
elements.liquid_hydrogen_fluoride.ignore.push("molten_alumina","aluminum_trifluoride_gas");


acidReact("hydrofluoric_acid","aluminum_hydroxide","aluminum_trifluoride","fire",0);
acidReact("hydrofluoric_acid_gas","aluminum_hydroxide","aluminum_trifluoride","fire",0);

acidReact("hydrogen_fluoride","aluminum_hydroxide","aluminum_trifluoride","fire",0);
acidReact("liquid_hydrogen_fluoride","aluminum_hydroxide","aluminum_trifluoride","fire",0);

acidReact("hydrofluoric_acid","sodium_hydroxide","sodium_fluoride_solution","fire",0);
acidReact("hydrofluoric_acid_gas","sodium_hydroxide","sodium_fluoride_solution","fire",0);
acidReact("hydrofluoric_acid","sodium_hydroxide_gas","sodium_fluoride_solution","fire",0);
acidReact("hydrofluoric_acid_gas","sodium_hydroxide_gas","sodium_fluoride_solution","fire",0);

acidReact("acid","sodium_hydroxide","salt_water",null,0);
acidReact("acid_gas","sodium_hydroxide","salt_water",null,0);
acidReact("acid","sodium_hydroxide_gas","salt_water",null,0);
acidReact("acid_gas","sodium_hydroxide_gas","salt_water",null,0);

acidReact("acid","potassium_hydroxide","potassium_salt_water",null,0);
acidReact("acid_gas","potassium_hydroxide","potassium_salt_water",null,0);
acidReact("acid","potassium_hydroxide_gas","potassium_salt_water",null,0);
acidReact("acid_gas","potassium_hydroxide_gas","potassium_salt_water",null,0);



elements.sodium_hydroxide.ignore.push("sodium_methoxide","methanol");
elements.sodium_hydroxide_gas.ignore.push("sodium_methoxide","methanol");
elements.sodium_hydroxide.ignore.push("sodium_methoxide","methanol");
elements.sodium_hydroxide_gas.ignore.push("sodium_methoxide","methanol");

acidReact("fluoroboric_acid","sodium_hydroxide","sodium_tetrafluoroborate",null,50);
acidReact("fluoroboric_acid_gas","sodium_hydroxide","sodium_tetrafluoroborate",null,50);
acidReact("fluoroboric_acid","sodium_hydroxide_gas","sodium_tetrafluoroborate",null,50);
acidReact("fluoroboric_acid_gas","sodium_hydroxide_gas","sodium_tetrafluoroborate",null,50);



elements.bless.reactions["foof"] = {elem2: "oxygen"};
elements.bless.reactions["solid_foof"] = {elem2: "oxygen"};
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
elements.bless.reactions["diborane"] = {elem2: "hydrogen"};
elements.bless.reactions["pentaborane"] = {elem2: "hydrogen"};
elements.bless.reactions["decaborane"] = {elem2: "hydrogen"};
elements.bless.reactions["sodium_hydride"] = {elem2: "hydrogen"};
elements.bless.reactions["sodium_borohydride"] = {elem2: "hydrogen"};
elements.bless.reactions["sodium_borohydride_solution"] = {elem2: "water"};
elements.bless.reactions["uraninite"] = {elem2: "rock"};
elements.bless.reactions["yellowcake_solution"] = {elem2: ["rock","hydrogen","rock","hydrogen","rock","hydrogen","baked_batter","hydrogen"]};
elements.bless.reactions["yellowcake"] = {elem2: ["rock","rock","rock","baked_batter"]};
elements.bless.reactions["depleted_uranium"] = {elem2: "rock"};
elements.bless.reactions["enriched_uranium"] = {elem2: "rock"};
elements.bless.reactions["uranium_dioxide"] = {elem2: "rock"};
elements.bless.reactions["depleted_uranium_dioxide"] = {elem2: "rock"};
elements.bless.reactions["enriched_uranium_dioxide"] = {elem2: "rock"};
elements.bless.reactions["uranium_tetrafluoride"] = {elem2: "rock"};
elements.bless.reactions["depleted_uranium_tetrafluoride"] = {elem2: "rock"};
elements.bless.reactions["enriched_uranium_tetrafluoride"] = {elem2: "rock"};
elements.bless.reactions["uranium_hexafluoride"] = {elem2: "rock"};
elements.bless.reactions["depleted_uranium_hexafluoride"] = {elem2: "rock"};
elements.bless.reactions["enriched_uranium_hexafluoride"] = {elem2: "rock"};
elements.bless.reactions["stable_uranium_hexafluoride"] = {elem2: "stable_uranium"};
elements.bless.reactions["molten_depleted_uranium"] = {elem2: "magma"};
elements.bless.reactions["molten_enriched_uranium"] = {elem2: "magma"};
elements.bless.reactions["molten_uranium_dioxide"] = {elem2: "magma"};
elements.bless.reactions["molten_depleted_uranium_dioxide"] = {elem2: "magma"};
elements.bless.reactions["molten_enriched_uranium_dioxide"] = {elem2: "magma"};
elements.bless.reactions["molten_uranium_tetrafluoride"] = {elem2: "magma"};
elements.bless.reactions["molten_depleted_uranium_tetrafluoride"] = {elem2: "magma"};
elements.bless.reactions["molten_enriched_uranium_tetrafluoride"] = {elem2: "magma"};
elements.bless.reactions["uranium_hexafluoride_gas"] = {elem2: "rock"};
elements.bless.reactions["depleted_uranium_hexafluoride_gas"] = {elem2: "rock"};
elements.bless.reactions["enriched_uranium_hexafluoride_gas"] = {elem2: "rock"};
elements.bless.reactions["stable_uranium_hexafluoride_gas"] = {elem2: "stable_uranium"};
elements.bless.reactions["neptunium"] = {elem2: "rock"};
elements.bless.reactions["molten_neptunium"] = {elem2: "rock"};
elements.bless.reactions["enriched_uranium_hexafluoride_gas"] = {elem2: "rock"};
elements.bless.reactions["radium"] = {elem2: null};
elements.bless.reactions["molten_radium"] = {elem2: null};
elements.bless.reactions["actinium"] = {elem2: null};
elements.bless.reactions["molten_actinium"] = {elem2: null};
elements.bless.reactions["thorium"] = {elem2: "rock"};
elements.bless.reactions["molten_thorium"] = {elem2: "magma"};
elements.bless.reactions["thorium_dioxide"] = {elem2: "rock"};
elements.bless.reactions["molten_thorium_dioxide"] = {elem2: "magma"};
elements.bless.reactions["thorium_tetrafluoride"] = {elem2: "rock"};
elements.bless.reactions["molten_thorium_tetrafluoride"] = {elem2: "magma"};
elements.bless.reactions["protactinium"] = {elem2: "rock"};
elements.bless.reactions["molten_protactinium"] = {elem2: "magma"};
elements.bless.reactions["neptunium"] = {elem2: "rock"};
elements.bless.reactions["molten_neptunium"] = {elem2: "magma"};
elements.bless.reactions["neptunium_hexafluoride"] = {elem2: "stable_neptunium"};
elements.bless.reactions["neptunium_hexafluoride_gas"] = {elem2: "stable_neptunium"};
elements.bless.reactions["plutonium"] = {elem2: "rock"};
elements.bless.reactions["molten_plutonium"] = {elem2: "magma"};
elements.bless.reactions["plutonium_dioxide"] = {elem2: "rock"};
elements.bless.reactions["molten_plutonium_dioxide"] = {elem2: "magma"};
elements.bless.reactions["plutonium_tetrafluoride"] = {elem2: "rock"};
elements.bless.reactions["molten_plutonium_tetrafluoride"] = {elem2: "magma"};
elements.bless.reactions["plutonium_hexafluoride"] = {elem2: "rock"};
elements.bless.reactions["plutonium_hexafluoride_gas"] = {elem2: "magma"};
elements.bless.reactions["stable_plutonium_hexafluoride"] = {elem2: "stable_plutonium"};
elements.bless.reactions["stable_plutonium_hexafluoride_gas"] = {elem2: "stable_plutonium"};
elements.bless.reactions["americium"] = {elem2: "rock"};
elements.bless.reactions["molten_americium"] = {elem2: "magma"};
elements.bless.reactions["curium"] = {elem2: "rock"};
elements.bless.reactions["molten_curium"] = {elem2: "magma"};
elements.bless.reactions["berkelium"] = {elem2: "rock"};
elements.bless.reactions["molten_berkelium"] = {elem2: "magma"};
elements.bless.reactions["californium"] = {elem2: "rock"};
elements.bless.reactions["molten_californium"] = {elem2: "magma"};
elements.bless.reactions["einsteinium"] = {elem2: "rock"};
elements.bless.reactions["molten_einsteinium"] = {elem2: "magma"};
elements.bless.reactions["fermium"] = {elem2: "rock"};
elements.bless.reactions["molten_fermium"] = {elem2: "magma"};


elements.foof.ignore.push("foof_grass","foof_grass_seed");
elements.solid_foof.ignore.push("foof_grass","foof_grass_seed");
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
    stateLow: "solid_foof",
    burn:50,
    burnTime:20,
    breakInto: "foof",
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
    stateLow: "solid_foof",
    burn: 50,
    burnTime: 20,
    category: "life",
    state: "solid",
    density: 1400,
    breakInto: "foof",
    hidden: true,
    cooldown: defaultCooldown,
    seed: true
};

elements.centrifuge= {
    color: "#89888f",
    category: "machines",
    tempHigh: 1455.5,
    stateHigh: "molten_steel",
    tick: function(pixel) {
        if(!pixel.del)
        {
            for(let i = 0; i < 10; i++)
            {
                for(let j = 1; j < 10; j++)
                {
                    let x = [pixel.x + i, pixel.x - j, pixel.x - i, pixel.x + j];
                    let y = [pixel.y + j, pixel.y + i, pixel.y - j, pixel.y - i];
                    var oob = outOfBounds(x[0],y[0]) || outOfBounds(x[1],y[1]) || outOfBounds(x[2],y[2]) || outOfBounds(x[3],y[3]);
                    if(!oob)
                    {
                        pixels = [null,null,null,null]
                        let immovable = false;
                        for(let k = 0; k < 4; k++)
                        {
                            pixels[k] = !isEmpty(x[k],y[k],true) ? pixelMap[x[k]][y[k]] : null;
                            if(pixels[k] && !elements[pixels[k].element].movable)
                            {
                                immovable = true;
                            }
                        }
                        if(!immovable)
                        {
                            for(let k = 0; k < 4; k++)
                            {
                                if(pixelMap[x[k]][y[k]])
                                {
                                    delete pixelMap[x[k]][y[k]];
                                }
                            }
                            for(let k = 0; k < 4; k++)
                            {
                                if(pixels[k] && !pixels[k].del)
                                {
                                    pixels[k].x = x[(k+1)%4];
                                    pixels[k].y = y[(k+1)%4];
                                    movePixel(pixels[k],x[(k+1)%4], y[(k+1)%4]);
                                }
                            }
                            
                            for(let k = 0; k < 4; k++)
                            {
                                if(pixels[k] && elements[pixels[k].element].onCentrifuge)
                                {
                                    elements[pixels[k].element].onCentrifuge(pixels[k]);
                                }
                            }
                        }
                    }
                }
            }
        }
        doDefaults(pixel);
    },
    movable: false
};


for(let i = 0; i < eLists.INSOLUBLE.length; i++)
{
    eListAdd("COMPOUND",eLists.INSOLUBLE[i]);
}

eListAdd("COMPOUND","water");
eListAddIon("HYDROGEN","water");
eListAddIon("HYDROXIDE","water");

eListAdd("COMPOUND","methanol");
eListAddIon("HYDROGEN","methanol");
eListAddIon("METHOXIDE","methanol");

eListAdd("COMPOUND","vinegar");
eListAdd("ACID","vinegar");
eListAddIon("HYDROGEN","vinegar","acid");
eListAddIon("ACETATE","vinegar","acid");

createSalt("baking_soda","baking_soda_solution",["#f2f2f2","#e0e0e0"],"#7494db",false,true,292,-2,102,3980,1026,"SODIUM","BICARBONATE");

delete elements["molten_baking_soda"];

eListAdd("COMPOUND","baking_soda");
eListAdd("BASE","baking_soda");
eListAdd("COMPOUND","baking_soda_solution");
eListAdd("BASE","baking_soda_solution");
eListAddIon("SODIUM","baking_soda","base");
eListAddIon("BICARBONATE","baking_soda","base");
eListAddIon("SODIUM","baking_soda_solution","base");
eListAddIon("BICARBONATE","baking_soda_solution","base");

elements["baking_soda"].reactions["sodium_hydroxide"] = {elem1: "sodium_carbonate_solution", elem2: "null"};
elements["baking_soda"].reactions["sodium_hydroxide_gas"] = {elem1: "sodium_carbonate_solution", elem2: "null"};
elements["baking_soda_solution"].reactions["sodium_hydroxide"] = {elem1: "sodium_carbonate_solution", elem2: "null"};
elements["baking_soda_solution"].reactions["sodium_hydroxide_gas"] = {elem1: "sodium_carbonate_solution", elem2: "null"};

createSalt("sodium_acetate","sodium_acetate_solution",["#f2f2f2","#e0e0e0"],"#7ea2f2",false,true,292,-2,102,3980,1028,"SODIUM","ACETATE");

eListAdd("ACID","seltzer");
eListAddIon("HYDROGEN","seltzer","acid");
eListAddIon("CARBONATE","seltzer","acid");
eListAddIon("HYDROGEN","seltzer","bicarbonate");
eListAddIon("BICARBONATE","seltzer","bicarbonate");

eListAdd("ACID","soda");
eListAddIon("HYDROGEN","soda","acid");
eListAddIon("CARBONATE","soda","acid");
eListAddIon("HYDROGEN","soda","bicarbonate");
eListAddIon("BICARBONATE","soda","bicarbonate");

eListAdd("ACID","pilk");
eListAddIon("HYDROGEN","pilk","acid");
eListAddIon("CARBONATE","pilk","acid");
eListAddIon("HYDROGEN","pilk","bicarbonate");
eListAddIon("BICARBONATE","pilk","bicarbonate");


eListAdd("COMPOUND","copper_sulfate");
eListAddIon("COPPERII","copper_sulfate");
eListAddIon("SULFATE","copper_sulfate");

eListAddIon("COPPERII","molten_copper_sulfate");
eListAddIon("SULFATE","molten_copper_sulfate");

function listMatching(list)
{
    let result = [];
    for(let i in elements)
    {
        let valid = false;
        if(elements[i].salt)
        {
            for(let ii in elements[i].salt)
            {
                let valid2 = true;
                
                for(let j = 0; j < list.length; j++)
                {
                    if(!elements[i].salt[ii].components.includes(list[j]))
                    {
                        valid2 = false;
                        continue;
                    }
                }
                
                for(let j = 0; j < elements[i].salt[ii].components.length; j++)
                {
                    if(!list.includes(elements[i].salt[ii].components[j]))
                    {
                        valid2 = false;
                        continue;
                    }
                }
                valid = valid || valid2;
            }
        }
        if(valid)
        {
            result.push(i);
        }
    }
    return result;
}

function listMatching2(list, elem)
{
    let result = [];
    for(let i = 0; i < elem.length; i++)
    {
        let valid = true;
        for(let j = 0; j < list.length; j++)
        {
            if(!eLists[list[j]].includes(elem[i]))
            {
                valid = false;
                break;
            }
        }
        if(valid)
        {
            result.push(elem[i]);
        }
    }
    return result;
}

runAfterAutogen(function() {
    for(let ii = 0; ii < eLists.WATER.length; ii++)
    {
        let i = eLists.WATER[ii];
        if(!elements[i])
        {
            console.log(i);
            continue;
        }
        if(!elements[i].reactions)
        {
            elements[i].reactions = {};
        }
        for(let jj = 0; jj < eLists.WATER.length; jj++)
        {
            let j = eLists.WATER[jj];
            if(i != j && elements[i].salt && elements[j].salt)
            {
                let priorityA = -Infinity;
                let priorityB = -Infinity;
                for(let iii in elements[i].salt)
                {
                    if(priorityA > elements[i].salt[iii].priority)
                    {
                        continue;
                    }
                    for(let jjj in elements[j].salt)
                    {
                        if(priorityB > elements[j].salt[jjj].priority)
                        {
                            continue;
                        }
                        if(elements[i].salt[iii].components.length > 1 && elements[j].salt[jjj].components.length > 1)
                        {
                            let match1 = listMatching([elements[i].salt[iii].components[0],elements[j].salt[jjj].components[1]]);
                            let match2 = listMatching([elements[i].salt[iii].components[1],elements[j].salt[jjj].components[0]]);
                            let match3 = listMatching([elements[i].salt[iii].components[0],elements[j].salt[jjj].components[0]]);
                            let match4 = listMatching([elements[i].salt[iii].components[1],elements[j].salt[jjj].components[1]]);
                            
                            let water1 = listMatching2(["WATER"],match1);
                            let water2 = listMatching2(["WATER"],match2);
                            let water3 = listMatching2(["WATER"],match3);
                            let water4 = listMatching2(["WATER"],match4);
                            let salt1 = listMatching2(["INSOLUBLE"],match1);
                            let salt2 = listMatching2(["INSOLUBLE"],match2);
                            let salt3 = listMatching2(["INSOLUBLE"],match3);
                            let salt4 = listMatching2(["INSOLUBLE"],match4);
                            
                            let productsA = [];
                            let productsB = [];
                            
                            if(water1.length > 0 && salt2.length > 0)
                            {
                                productsA = productsA.concat(water1);
                                productsB = productsB.concat(salt2);
                            }
                            if(water2.length > 0 && salt1.length > 0)
                            {
                                productsA = productsA.concat(water2);
                                productsB = productsB.concat(salt1);
                            }
                            
                            
                            if(water3.length > 0 && salt4.length > 0)
                            {
                                productsA = productsA.concat(water3);
                                productsB = productsB.concat(salt4);
                            }
                            if(water4.length > 0 && salt3.length > 0)
                            {
                                productsA = productsA.concat(water4);
                                productsB = productsB.concat(salt3);
                            }
                            
                            if(productsA.length > 0 && productsB.length > 0)
                            {
                                acidReact(i,j,productsA,productsB,0);
                                console.log("precipitate");
                                console.log(i);
                                console.log(j);
                                console.log(productsA);
                                console.log(productsB);
                                priorityA = elements[i].salt[iii].priority;
                                priorityB = elements[j].salt[jjj].priority;
                                continue;
                            }
                            
                            
                            if(elements[i].salt[iii].components[0] == elements[j].salt[jjj].components[0] || elements[i].salt[iii].components[1] == elements[j].salt[jjj].components[1] || 
                            elements[i].salt[iii].components[1] == elements[j].salt[jjj].components[0] || elements[i].salt[iii].components[0] == elements[j].salt[jjj].components[1])
                            {
                                continue;
                            }
                            
                            productsA = [];
                            productsB = [];
                            
                            if(water1.length > 0 && water2.length > 0)
                            {
                                productsA = productsA.concat(water1);
                                productsB = productsB.concat(water2);
                            }
                            
                            if(water3.length > 0 && water4.length > 0)
                            {
                                productsA = productsA.concat(water3);
                                productsB = productsB.concat(water4);
                            }
                            
                            
                            if(productsA.length > 0 && productsB.length > 0)
                            {
                                elements[i].reactions[j] = { elem1:productsA, elem2:productsB, chance:0.001, oneway:true };
                                console.log(i);
                                console.log(j);
                                console.log(productsA);
                                console.log(productsB);
                                priorityA = elements[i].salt[iii].priority;
                                priorityB = elements[j].salt[jjj].priority;
                            }
                        }
                    }
                }
            }
        }
    }
    let acids = eLists.ACID.concat(eLists.ACIDGAS).concat(eLists.AMPHOTERIC);
    for(let ii = 0; ii < acids.length; ii++)
    {
        let i = acids[ii];
        if(!elements[i])
        {
            console.log(i);
            continue;
        }
        if(!elements[i].reactions)
        {
            elements[i].reactions = {};
        }
        let bases = eLists.BASE.concat(eLists.AMPHOTERIC);
        for(let jj = 0; jj < bases.length; jj++)
        {
            let j = bases[jj];
            if(i != j && elements[i].salt && elements[j].salt && elements[i].salt["acid"].components.length > 1 && elements[j].salt["base"].components.length > 1)
            {
                let productsA = [];
                let productsB = [];
                
                let match = [listMatching([elements[i].salt["acid"].components[0],elements[j].salt["base"].components[1]]),
                listMatching([elements[i].salt["acid"].components[1],elements[j].salt["base"].components[0]]),
                listMatching([elements[i].salt["acid"].components[0],elements[j].salt["base"].components[0]]),
                listMatching([elements[i].salt["acid"].components[1],elements[j].salt["base"].components[1]])];
                
                let compounds = [listMatching2(["COMPOUND"],match[0]),listMatching2(["COMPOUND"],match[1]),listMatching2(["COMPOUND"],match[2]),listMatching2(["COMPOUND"],match[3])];
                
                
                for(let n = 0; n < compounds.length; n++)
                {
                    let m = n-1;
                    if(n%2 == 0)
                    {
                        m = n+1;
                    }
                    if(compounds[n].includes("water"))
                    {
                        let water1 = listMatching2(["WATER"],match[m]);
                        if(water1.length > 0)
                        {
                            compounds[m] = water1;
                            compounds[n].splice(compounds[n].indexOf("water"),1);
                            if(compounds[n].length == 0)
                                compounds[n] = [null];
                        }
                    }
                }
                
                if(compounds[0].length > 0 && compounds[1].length > 0)
                {
                    productsA = productsA.concat(compounds[0]);
                    productsB = productsB.concat(compounds[1]);
                }
                if(compounds[2].length > 0 && compounds[3].length > 0)
                {
                    productsA = productsA.concat(compounds[2]);
                    productsB = productsB.concat(compounds[3]);
                }
                if(productsA.length > 0 && productsB.length > 0)
                {
                    let reactionTemp = 0;
                    if(elements[i].salt["acid"].components.includes("FLUORIDE") && elements[i].salt["acid"].components.includes("HYDROGEN"))
                    {
                        if(productsB[0] === null && productsB.length === 1)
                        {
                            productsB = ["fire"];
                        }
                        else
                        {
                            productsB.push("fire");
                        }
                    }
                    if((elements[i].salt["acid"].components.includes("SULFATE") || elements[i].salt["acid"].components.includes("CHLORIDE")) && elements[i].salt["acid"].components.includes("HYDROGEN"))
                    {
                        reactionTemp = 50;
                    }
                    acidReact(i,j,productsA,productsB,reactionTemp);
                    console.log("neutral");
                    console.log(i);
                    console.log(j);
                    console.log(compounds);
                    console.log(productsA);
                    console.log(productsB);
                }
            }
        }
    }
});