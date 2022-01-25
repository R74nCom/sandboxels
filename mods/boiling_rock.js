elements.vaporized_rock = {
    color: ["#ffc94a", "#fcd34c", "#ffae36"],
    behavior: [
        "M2|M1|M2",
        "M1|XX|M1",
        "M2|M1|M2",
    ],
    reactions: {
        "vaporized_rock": { "elem1": null, "elem2": "lava_cloud", "chance":0.3, "y":[0,15] },
        "lava_cloud": { "elem1": "lava_cloud", "chance":0.4, "y":[0,15] },
    },
    density: 2452, //just magma density * 0.9
    temp: 3100,
    tempLow: 3000,
    stateLow: "magma",
    category: "gases",
    state: "gas",
    hidden: true,
},
elements.magma.tempHigh = 3000
elements.magma.stateHigh = "vaporized_rock"
elements.lava_cloud = {
    color: ["#b57b2a", "#d47b15", "#cf7317", "#db830f"],
    behavior: [
        "XX|XX|XX",
        "M1%7|CH:magma%0.05|M1%7",
        "XX|XX|XX",
    ],
    density: 2,
    temp: 3000,
    tempLow: 850,
    stateLow: "rock_cloud",
    category: "gases",
    state: "gas",
},
elements.rock_cloud = {
    color: ["#ba8843", "#c28a4a", "#bf8245", "#c4904b"],
    behavior: [
        "XX|XX|XX",
        "M1%7|CH:basalt,basalt,basalt,rock%0.05|M1%7",
        "XX|XX|XX",
    ],
    density: 2,
    temp: 800,
    tempHigh: 3000,
    stateHigh: "lava_cloud",
    category: "gases",
    state: "gas",
},

elements.vaporized_glass = {
    color: ["#D6B049","#E8D957","#E8AE57"],
    behavior: [
        "M2|M1|M2",
        "M1|XX|M1",
        "M2|M1|M2",
    ],
    reactions: {
        "vaporized_glass": { "elem1": null, "elem2": "hot_glass_cloud", "chance":0.3, "y":[0,15] },
        "hot_glass_cloud": { "elem1": "glass_cloud", "chance":0.4, "y":[0,15] },
    },
    density: 2, //very rough approximation based on https://nvlpubs.nist.gov/nistpubs/jres/46/jresv46n3p176_A1b.pdf
    temp: 2300, //https://www.sciencealert.com/did-this-piece-of-glass-really-break-a-law-of-thermodynamics
    tempLow: 2200,
    stateLow: "molten_glass",
    category: "gases",
    state: "gas",
    hidden: true,
},
elements.hot_glass_cloud = {
    color: ["#B69089","#C8B997","#C88E77"],
    behavior: [
        "XX|XX|XX",
        "M1%7|CH:molten_glass%0.05|M1%7",
        "XX|XX|XX",
    ],
    density: 2,
    temp: 2300,
    tempLow: 2200,
    stateLow: "cold_glass_cloud",
    category: "gases",
    state: "gas",
},
elements.cold_glass_cloud = {
    color: ["#967089","#A89997","#A86E77"],
    behavior: [
        "XX|XX|XX",
        "M1%7|CH:glass_shard%0.05|M1%7",
        "XX|XX|XX",
    ],
    density: 2,
    temp: 2000,
    tempHigh: 2200,
    stateHigh: "hot_glass_cloud",
    category: "gases",
    state: "gas",
},

elements.molten_glass = {
    tempHigh: 2200,
    stateHigh: "vaporized_glass",
}

elements.ash.tempHigh = 1200          //https://www.quora.com/Can-you-melt-ashes
elements.ash.stateHigh = "molten_ash" //https://www.sciencedirect.com/science/article/pii/S1877705817326772

elements.molten_ash = {
	color: ["#df6f30","#df8c30","#df4d30"],
	behavior: behaviors.MOLTEN,
	temp: 1300,
	tempLow: 1200,
	stateLow: "ash",
	tempHigh: 1700, //https://authors.library.caltech.edu/58447/1/018-Senior.pdf
	                //https://pubs.acs.org/doi/10.1021/ef049693l
	stateHigh: "vaporized_ash",
	viscosity: 10000,
	category: "liquids",
	state: "liquid",
	density: 2725,
},

elements.vaporized_ash = {
	color: ["#df9f50","#dfbc50","#df7d50"],
	behavior: [
		"M2|M1|M2",
		"M1|XX|M1",
		"M2|M1|M2",
	],
	temp: 1800,
	tempLow: 1700,
	stateLow: "molten_ash",
	category: "gases",
	state: "gas",
	hidden: true,
	density: 3, //bs
},

elements.charcoal.tempHigh = 800
elements.charcoal.stateHigh = "carbon_dioxide"

elements.calcined_soda = { //TODO: decomposition?
	color: "#ededed",
	behavior: behaviors.POWDER,
	reactions: {
		"water": { "elem1": "washing_soda", "elem2": null } //should be 10x water
		//"carbon_dioxide": not possible: Na_{2}CO_{3} + CO_{2} + H_{2}O → 2NaHCO_{3}
	},
	category: "powders",
	state: "solid",
	density: 2540,
	tempHigh: 851,
}

if(!elements.molten_calcined_soda) {
	elements.molten_calcined_soda = {}
}

elements.molten_calcined_soda.temp = 1700
elements.molten_calcined_soda.tempHigh = 1600
elements.molten_calcined_soda.stateHigh = "vaporized_calcined_soda"
elements.molten_calcined_soda.density = 1920

elements.washing_soda = {
	color: "#ededed",
	behavior: behaviors.POWDER,
	//no reactions because it always requires ******* water
	category: "powders",
	state: "solid",
	density: 1460,
	tempHigh: 400,
	stateHigh: ["water","calcined_soda"],
}

elements.vaporized_calcined_soda = {
	color: ["#ffbf60","#ffdc60","#ff9d60"],
	behavior: [
		"M2|M1|M2",
		"M1|XX|M1",
		"M2|M1|M2",
	],
	temp: 1700,
	tempLow: 1600,
	stateLow: "molten_calcined_soda",
	category: "gases",
	state: "gas",
	hidden: true,
	density: 1.5, //bs
},

elements.acid.reactions.baking_soda = { "elem1":"neutral_acid", "elem2":null }
elements.acid.reactions.calcined_soda = { "elem1":"neutral_acid", "elem2":null }
elements.acid.reactions.washing_soda = { "elem1":"neutral_acid", "elem2":null }

elements.baking_soda.tempHigh = 150,
elements.baking_soda.stateHigh = ["water","carbon_dioxide","calcined_soda"]

runAfterLoad(function() {
if(elements.acid_gas.tempHigh) {
	delete elements.acid_gas.tempHigh
}
if(elements.acid_gas.stateHigh) {
	delete elements.acid_gas.stateHigh
}
elements.acid.stateHigh = "acid_gas"
elements.acid_gas.tempLow = 400
elements.acid_gas.stateLow = "acid"
elements.yogurt.tempHigh = 400
elements.yogurt.stateHigh = "ash"
elements.dust.tempHigh = 400
elements.dust.stateHigh = "fire"
elements.charcoal.tempHigh = 800
elements.charcoal.stateHigh = "carbon_dioxide"
    if(enabledMods.includes("mods/fey_and_more.js")) {
        elements.molten_glass.tempHigh = 2200
        elements.molten_glass.stateHigh = "vaporized_glass"

        //mistake
            elements.concoction.reactions.vaporized_rock = { "elem1": "mistake", "elem2": null }
            elements.concoction.reactions.lava_cloud = { "elem1": "mistake", "elem2": null }
            elements.concoction.reactions.rock_cloud = { "elem1": "mistake", "elem2": null }
            elements.concoction.reactions.vaporized_glass = { "elem1": "mistake", "elem2": null }
            elements.concoction.reactions.hot_glass_cloud = { "elem1": "mistake", "elem2": null }
            elements.concoction.reactions.cold_glass_cloud = { "elem1": "mistake", "elem2": null }
    };
});
