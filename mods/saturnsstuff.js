elements.sand = {
	color: "#e6d577",
	behavior: behaviors.POWDER,
	reactions: {
		"water":{elem1:"wet_sand",elem2:null},
		"salt_water":{elem1:"wet_sand",elem2:"foam"},
		"sugar_water":{elem1:"wet_sand",elem2:null},
		"seltzer":{elem1:"wet_sand",elem2:null},
		"dirty_water":{elem1:"wet_sand",elem2:null},
		"pool_water":{elem1:"wet_sand",elem2:null},
		"slush":{elem1:"wet_sand",elem2:null},
		"soda":{elem1:"wet_sand",elem2:null},
		"juice":{elem1:"wet_sand",elem2:null},
		"milk":{elem1:"wet_sand",elem2:null},
		"chocolate_milk":{elem1:"wet_sand",elem2:null},
		"fruit_milk":{elem1:"wet_sand",elem2:null},
		"pilk":{elem1:"wet_sand",elem2:null},
		"eggnog":{elem1:"wet_sand",elem2:null},
		"nut_milk":{elem1:"wet_sand",elem2:null},
		"cream":{elem1:"wet_sand",elem2:null},
		"vinegar":{elem1:"wet_sand",elem2:null},
		"blood":{elem1:"wet_sand",elem2:null},
		"vaccine":{elem1:"wet_sand",elem2:null},
		"antibody":{elem1:"wet_sand",elem2:null},
		"infection":{elem1:"wet_sand",elem2:null},
		"poison":{elem1:"wet_sand",elem2:null},
		"antidote":{elem1:"wet_sand",elem2:null},
		"tornado":{elem1:"sandstorm", oneway:true},
		"charcoal":{elem1:"filter_powder", elem2: null}
	},
	tempHigh: 1700,
	stateHigh: "molten_glass",
	category: "land",
	state: "solid",
	density: 1602
}

elements.water = {
	color: "#2167ff",
	behavior: behaviors.LIQUID,
	tempHigh: 100,
	stateHigh: "steam",
	tempLow: 0,
	stateLow: "ice",
	category: "liquids",
	heatCapacity: 4.184,
	reactions: {
		"salt": { elem1: "salt_water", elem2: null, temp1:-20 },
		"sugar": { elem1: "sugar_water", elem2: null },
		"honey": { elem1: "sugar_water" },
		"caramel": { elem1: "sugar_water", elem2: null },
		"molasses": { elem1: "sugar_water", chance:0.05 },
		"candy": { elem1: "sugar_water", elem2:"foam", chance:0.005 },
		"dust": { elem1: "dirty_water", elem2: null },
		"ash": { elem1: "dirty_water", elem2: null },
		"cyanide": { elem1: "dirty_water", elem2: null },
		"cyanide_gas": { elem1: "dirty_water", elem2: null },
		"carbon_dioxide": { elem1: "seltzer", elem2: null, oneway:true },
		"sulfur": { elem1: "dirty_water", elem2: null },
		"rat": { elem1: "dirty_water", chance:0.005 },
		"infection": { elem1: "dirty_water", elem2: null },
		"plague": { elem1: "dirty_water", elem2: null },
		"rust": { elem1: "dirty_water", chance:0.005 },
		"lead": { elem1: "dirty_water", chance:0.005 },
		"solder": { elem1: "dirty_water", chance:0.005 },
		"fallout": { elem1: "dirty_water", chance:0.25 },
		"radiation": { elem1: "dirty_water", chance:0.25 },
		"uranium": { elem1: "dirty_water", chance:0.25 },
		"rad_steam": { elem1: "dirty_water", chance:0.02 },
		"rad_glass": { elem1: "dirty_water", chance:0.005 },
		"rad_shard": { elem1: "dirty_water", chance:0.01 },
		"rotten_meat": { elem1: "dirty_water", chance:0.25 },
		"rotten_cheese": { elem1: "dirty_water", chance:0.25 },
		"cancer": { elem1: "dirty_water", chance:0.25 },
		"oil": { elem1: "dirty_water", chance:0.005 },
		"dioxin": { elem1: "dirty_water", chance:0.1 },
		"neutron": { elem1: ["dirty_water","dirty_water","dirty_water","rad_steam"], elem2:null, chance:0.1 },
		"rock": { elem2: "wet_sand", chance: 0.00035 },
		"limestone": { elem2: "wet_sand", chance: 0.00035 },
		"tuff": { elem2: "wet_sand", color2:"#7a6b5c", chance: 0.00035 },
		"ruins": { elem2: "rock", chance: 0.00035 },
		"mudstone": { elem2: "mud", chance: 0.00035 },
		"methane": { elem1:"primordial_soup", elem2:"primordial_soup", tempMin:60, charged:true },
		"ammonia": { elem1:"primordial_soup", elem2:"primordial_soup", tempMin:60, charged:true },
		"fly": { elem2:"dead_bug", chance:0.1, oneway:true },
		"firefly": { elem2:"dead_bug", chance:0.1, oneway:true },
		"bee": { elem2:"dead_bug", chance:0.05, oneway:true },
		"stink_bug": { elem2:"dead_bug", chance:0.1, oneway:true },
		"cured_meat": { elem1:"salt_water", elem2:"meat" },
		"water": { elem2:"bubble", attr2:{"clone":"water"}, chance:0.001, tempMin:85 },
		// electrolysis:
		"aluminum": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0025 },
		"zinc": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.015 },
		"steel": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0125 },
		"iron": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0125 },
		"tin": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.01 },
		"brass": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.001 },
		"bronze": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.001 },
		"copper": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0075 },
		"silver": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0075 },
		"gold": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0075 },
		"glycol":{elem1:"coolant",elem2:"coolant"},
		"filter_powder":{elem1:"filtered_water",elem2: null}
	},
	state: "liquid",
	density: 997,
	conduct: 0.02,
	stain: -0.5,
	extinguish: true
}

elements.glycol = {
	color: "#ededed",
	behavior: behaviors.LIQUID,
	tempHigh: 121,
	stateHigh: "acid",
	tempLow: -12,
	stateLow: "glycol_ice",
	category: "saturns",
	state: "liquid",
	density: 1115,
	alias: "ethylene glycol"
}

elements.glycol_ice = {
	color: "#dedede",
	behavior: behaviors.WALL,
	tempHigh: -11,
	stateHigh: "glycol",
	category: "saturns",
	state: "solid",
	density: 1115,
	alias: "ethylene glycol in ice form"
}

elements.coolant_ice = {
	color: "#beddf7",
	behavior: behaviors.WALL,
	category: "saturns",
	state: "solid",
    density: 997,
    tempHigh: -37,
    stateHigh: "coolant",
    temp: -200,
    reactions: {
        "cooler": { elem1: "supercoolant_ice" },
        "supercooler": { elem1: "supercoolant_ice" }
    },
	breakInto: "coolant"
}

elements.coolant = {
	color: "#77b9f2",
	behavior: behaviors.LIQUID,
	category: "saturns",
	state: "liquid",
    density: 997,
    tempLow: -200,
    stateLow: "coolant_ice",
    tempHigh: 111,
    stateHigh: "fire",
    temp: -100,
    reactions: {
        "cooler": { elem1: "supercoolant" },
        "supercooler": { elem1: "supercoolant" }
    },
	extinguish: true
}

elements.supercoolant_ice = {
	color: "#7db9fa",
	behavior: behaviors.WALL,
	category: "saturns",
	state: "solid",
    density: 997,
    tempHigh: 0,
    stateHigh: "supercoolant",
    temp: -273,
    reactions: {
        "heater": { elem1: "coolant_ice" },
        "superheater": { elem1: "coolant_ice" }
    },
	breakInto: "supercoolant"
}

elements.supercoolant = {
	color: "#3695f5",
	behavior: behaviors.LIQUID,
	category: "saturns",
	state: "liquid",
    density: 997,
    tempLow: -273,
    stateLow: "supercoolant_ice",
    tempHigh: 222,
    stateHigh: "steam",
    temp: -200,
    reactions: {
        "heater": { elem1: "coolant" },
        "superheater": { elem1: "coolant" }
    },
	extinguish: true
}

elements.exploder_question_mark = {
    color: "#ff0548",
    tool: function(pixel) {
        if (pixel.element == "sand")
            pixel.element = "snad"
    },
    category: "saturns",
}

elements.exploder = {
    color: "#ff0548",
    tool: function(pixel) {
        pixel.element = "explosion"
    },
    category: "saturns",
}

elements.n_exploder = {
    color: "#09ff05",
    tool: function(pixel) {
        pixel.element = "n_explosion"
    },
    category: "saturns",
}

elements.wet_snad = {
    color: "#ada67b",
    behavior: behaviors.LIQUID,
    reactions: {
        "snad":{elem1:"snad"}
    },
    tempHigh: 100,
	stateHigh: "snad",
	category: "saturns",
	state: "liquid",
	density: 1603
}
elements.snad = {
	color: "#968b4d",
	behavior: behaviors.SUPPORT,
	reactions: {
		"water":{elem1:"wet_snad",elem2:null},
		"salt_water":{elem1:"wet_snad",elem2:"salt"},
		"sugar_water":{elem1:"wet_snad",elem2:null},
		"seltzer":{elem1:"wet_snad",elem2:null},
		"dirty_water":{elem1:"wet_snad",elem2:null},
		"pool_water":{elem1:"wet_snad",elem2:null},
		"slush":{elem1:"wet_snad",elem2:null},
		"soda":{elem1:"wet_snad",elem2:null},
		"juice":{elem1:"wet_snad",elem2:null},
		"milk":{elem1:"wet_snad",elem2:null},
		"chocolate_milk":{elem1:"wet_snad",elem2:null},
		"fruit_milk":{elem1:"wet_snad",elem2:null},
		"pilk":{elem1:"wet_snad",elem2:null},
		"eggnog":{elem1:"wet_snad",elem2:null},
		"nut_milk":{elem1:"wet_snad",elem2:null},
		"cream":{elem1:"wet_snad",elem2:null},
		"vinegar":{elem1:"wet_snad",elem2:null},
		"blood":{elem1:"wet_snad",elem2:null},
		"vaccine":{elem1:"wet_snad",elem2:null},
		"antibody":{elem1:"wet_snad",elem2:null},
		"infection":{elem1:"wet_snad",elem2:null},
		"poison":{elem1:"wet_snad",elem2:null},
		"antidote":{elem1:"wet_snad",elem2:null},
		"tornado":{elem1:"sad_storm", oneway:true},
	},
	tempHigh: 1700,
	stateHigh: "molten_glass",
	category: "saturns",
	state: "solid",
	density: 1602
}

elements.sad_storm = {
    color: "#a0d4e8",
    behavior: behaviors.SUPERFLUID,
    tempHigh: 1700,
    stateHigh: "sandstorm",
    category: "saturns",
    state: "liquid",
    density: 20000000,
    desc: "it's so sad..."
}

elements.extinguish = {
    color: "#19f7ff",
    behavior: [
		"CO:2|CO:2|CO:2",
		"CO:2|CO:2|CO:2",
		"CO:2|CO:2|CO:2",
	],
	tool: function(pixel) {
		if (shiftDown) {pixel.temp += elements.cool.temp+(Math.random()*elements.cool.temp*200000)*20;}
		else {pixel.temp += elements.cool.temp+(Math.random()*elements.cool.temp*200000);}
		pixelTempCheck(pixel);
	},
	temp: -2,
	insulate:true,
	canPlace: false,
    category: "saturns"
}

elements.temp_neutralizer = {
    color: "#b4f092",
    behavior: [
		"CO:2|CO:2|CO:2",
		"CO:2|CO:2|CO:2",
		"CO:2|CO:2|CO:2",
	],
	tool: function(pixel) {
		pixel.temp = 0
		pixelTempCheck(pixel)
	},
	temp: -2,
	insulate:true,
	canPlace: false,
    category: "saturns"
}

elements.icicle = {
	color: "#81ccd4",
	behavior: [
		"XX|SA|XX",
		"XX|XX|XX",
		"M2|M1|M2"
	],
	reactions: {
		"snow":{elem2: "icicle"},
		"ice":{elem2: "icicle"},
		"slush":{elem2: "icicle"},
		"water":{elem2: "icicle"}
	},
	category: "saturns",
	temp: -5,
	tempHigh: 1,
	stateHigh: "water",
	state: "solid",
	breakInto: "snow"
}

elements.digger = {
	color: "#7affc1",
	behavior: [
		"XX|XX|XX",
		"XX|DL|XX",
		"CH:digger_wall|M1 AND CH:digger AND CR:digger|CH:digger_wall"
	],
	category: "saturns",
	density: 100000,
	state: "solid"
}

elements.digger_plane = {
	color: "#6fad90",
	behavior: [
		"XX|XX|XX",
		"M1|XX|M1",
		"XX|CR:digger%25|XX"
	],
	category: "saturns",
	density: 1000000,
	state: "solid"
}

elements.digger_wall = {
	color: "#1d6e45",
	behavior: behaviors.WALL,
	category: "saturns",
	state: "solid",
	hardness: 0.5,
	noMix: true
}

elements.assimilator = {
	color: "#d52feb",
	behavior: [
		"XX|CH:assimilator%25|XX",
		"CH:assimilator%25|XX|CH:assimilator%25",
		"XX|CH:assimilator%25|XX"
	],
	category: "saturns",
	state: "solid",
	hardness: 0.9,
	noMix: true,
	breakInto: ["virus", "lattice"],
	excludeRandom: true
}

elements.true_assimilator = {
	color: "#e52feb",
	behavior: [
		"XX|CH:true_assimilator|XX",
		"CH:true_assimilator|XX|CH:true_assimilator",
		"XX|CH:true_assimilator|XX"
	],
	category: "saturns",
	state: "solid",
	hardness: 0.9,
	noMix: true,
	breakInto: ["virus", "filler"],
	excludeRandom: true
}

elements.consumer = {
	color: "#eb2fd5",
	behavior: [
		"XX|CR:consumer%25|XX",
		"CR:consumer%25|XX|CR:consumer%25",
		"XX|CR:consumer%25|XX"
	],
	category: "saturns",
	state: "solid",
	hardness: 0.9,
	noMix: true,
	breakInto: ["assimilator", "lattice"],
	excludeRandom: true
}

elements.true_consumer = {
	color: "#fb2fd5",
	behavior: [
		"XX|CR:true_consumer|XX",
		"CR:true_consumer|XX|CR:true_consumer",
		"XX|CR:true_consumer|XX"
	],
	category: "saturns",
	state: "solid",
	hardness: 0.9,
	noMix: true,
	breakInto: ["assimilator", "filler"],
	excludeRandom: true
}

elements.integrator = {
	color: "#eb2f7d",
	behavior: [
		"XX|CR:integrator%25 AND CH:integrator%25|XX",
		"CR:integrator%25 AND CH:integrator%25|XX|CR:integrator%25 AND CH:integrator%25",
		"XX|CR:integrator%25 AND CH:integrator%25|XX"
	],
	category: "saturns",
	state: "solid",
	hardness: 0.9,
	noMix: true,
	breakInto: ["consumer", "assimilator"],
	reactions: {
		"strange_matter":{elem1: "eternial",elem2: "eternial"},
	},
	excludeRandom: true
}

elements.true_integrator = {
	color: "#fb2f7d",
	behavior: [
		"XX|CR:true_integrator AND CH:true_integrator|XX",
		"CR:true_integrator AND CH:true_integrator|XX|CR:true_integrator AND CH:true_integrator",
		"XX|CR:true_integrator AND CH:true_integrator|XX"
	],
	category: "saturns",
	state: "solid",
	hardness: 0.9,
	noMix: true,
	breakInto: ["true_consumer", "true_assimilator"],
	reactions: {
		"strange_matter":{elem1: "absoluterial",elem2: "absoluterial"},
	},
	excludeRandom: true
}

elements.eternial = {
	color: "#eb2f4e",
	behavior: [
		"CR:eternial%25 AND CH:eternial%25|CR:eternial%25 AND CH:eternial%25|CR:eternial%25 AND CH:eternial%25",
		"CR:eternial%25 AND CH:eternial%25|XX|CR:eternial%25 AND CH:eternial%25",
		"CR:eternial%25 AND CH:eternial%25|CR:eternial%25 AND CH:eternial%25|CR:eternial%25 AND CH:eternial%25"
	],
	category: "saturns",
	state: "solid",
	hardness: 0.9,
	noMix: true,
	breakInto: ["integrator", "strange_matter"],
	alias: "eternal material",
	reactions: {
		"strange_matter":{elem2: null}
	},
	excludeRandom: true
}

elements.absoluterial = {
	color: "#fb2f4e",
	behavior: [
		"CR:absoluterial AND CH:absoluterial|CR:absoluterial AND CH:absoluterial|CR:absoluterial AND CH:absoluterial",
		"CR:absoluterial AND CH:absoluterial|XX|CR:absoluterial AND CH:absoluterial",
		"CR:absoluterial AND CH:absoluterial|CR:absoluterial AND CH:absoluterial|CR:absoluterial AND CH:absoluterial"
	],
	category: "saturns",
	state: "solid",
	hardness: 0.9,
	noMix: true,
	breakInto: ["true_integrator", "strange_matter"],
	alias: "absolute material",
	reactions: {
		"strange_matter":{elem2: null}
	},
	excludeRandom: true
}

elements.void_jelly = {
	color: "#1d052b",
	behavior: [
		"XX|DL AND M2%25|XX",
		"DL AND M2%10|XX|DL AND M2%10",
		"XX|DL AND M1|XX"
	],
	category: "saturns",
	hardness: 1,
	state: "solid",
	reactions: {
		"void":{elem2:"void_jelly"},
		"strange_matter":{elem2:"explosion"}
	},
	excludeRandom: true
}

elements.glitch = {
	color: "#000000",
	behavior: [
		"XX|CH:random AND M2|XX",
		"CH:random AND M2|XX|CH:random AND M2",
		"XX|CH:random AND M1|XX"
	],
	category: "saturns",
	hardness: 1,
	tick: function(pixel) {
		var randomColor = "#" + Math.floor(Math.random()*16777215).toString(16); 
		pixel.color = randomColor;
		
		var randomTemp = Math.random() * 1000 - 273; 
		pixel.temperature = randomTemp;
	},
	reactions: {
		"malware":{elem2:"glitch", chance:0.1},
		"virus":{elem2:"glitch", chance:0.1},
		"filler":{elem2:"lattice", chance:0.25},
		"lattice":{elem2:"filler", chance:0.25},
		"void":{elem2:"warp", chance:0.25},
		"warp":{elem2:"void", chance:0.25},
		"snake":{elem2:"loopy", chance:0.25},
		"loopy":{elem2:["snake","ball"], chance:0.25},
		"ball":{elem2:"loopy", chance:0.25},
		"border":{elem2:["wall","null"], chance:0.25},
		"wall":{elem2:["border","null"], chance:0.25},
		"rainbow":{elem2:"static", chance:0.5},
		"static":{elem2:"rainbow", chance:0.5}
	}
}

elements.filtered_water = {
	color: "#578cff",
	behavior: behaviors.LIQUID,
	tempHigh: 100,
	stateHigh: "nice_steam",
	tempLow: 0,
	stateLow: "nice_ice",
	category: "saturns",
	heatCapacity: 4.184,
	reactions: {
		"salt": { elem1: "salt_water", elem2: null, temp1:-20 },
		"sugar": { elem1: "sugar_water", elem2: null },
		"honey": { elem1: "sugar_water" },
		"caramel": { elem1: "sugar_water", elem2: null },
		"molasses": { elem1: "sugar_water", chance:0.05 },
		"candy": { elem1: "sugar_water", elem2:"foam", chance:0.005 },
		"carbon_dioxide": { elem1: "seltzer", elem2: null, oneway:true },
		"rock": { elem2: "wet_sand", chance: 0.00035 },
		"limestone": { elem2: "wet_sand", chance: 0.00035 },
		"tuff": { elem2: "wet_sand", color2:"#7a6b5c", chance: 0.00035 },
		"ruins": { elem2: "rock", chance: 0.00035 },
		"mudstone": { elem2: "mud", chance: 0.00035 },
		"methane": { elem1:"primordial_soup", elem2:"primordial_soup", tempMin:60, charged:true },
		"ammonia": { elem1:"primordial_soup", elem2:"primordial_soup", tempMin:60, charged:true },
		"cured_meat": { elem1:"salt_water", elem2:"meat" },
		"water": { elem2:"bubble", attr2:{"clone":"water"}, chance:0.001, tempMin:85 },
		"filtered_water": { elem2:"bubble", attr2:{"clone":"filtered_water"}, chance:0.001, tempMin:85 },
		// electrolysis:
		"aluminum": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0025 },
		"zinc": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.015 },
		"steel": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0125 },
		"iron": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0125 },
		"tin": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.01 },
		"brass": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.001 },
		"bronze": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.001 },
		"copper": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0075 },
		"silver": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0075 },
		"gold": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0075 },
		"glycol":{elem1:"coolant",elem2:"coolant"},
	}
}
elements.nice_steam = {
	color: "#abd6ff",
	behavior: behaviors.GAS,
	tick: function(pixel) {
		if (pixel.temp > 3000 && Math.random() < 0.01) {
			changePixel(pixel,Math.random() < 0.5 ? "hydrogen" : "oxygen");
		}
	},
	reactions: {
		"nice_steam": { elem1: "cloud", elem2: "cloud", chance:0.05, "y":[0,15], "setting":"clouds" },
		"rain_cloud": { elem1: "rain_cloud", chance:0.4, "y":[0,12], "setting":"clouds" },
		"cloud": { elem1: "cloud", chance:0.4, "y":[0,12], "setting":"clouds" },
		"snow_cloud": { elem1: "rain_cloud", chance:0.4, "y":[0,12], "setting":"clouds" },
		"hail_cloud": { elem1: "rain_cloud", chance:0.4, "y":[0,12], "setting":"clouds" },
		"thunder_cloud": { elem1: "rain_cloud", chance:0.4, "y":[0,12], "setting":"clouds" },
		"pyrocumulus": { elem1: "cloud", chance:0.4, "y":[0,12], "setting":"clouds" },
		"fire_cloud": { elem1: "cloud", elem2: "cloud", chance:0.4, "y":[0,12], "setting":"clouds" },
		"smoke": { elem2: null, chance:0.001 },
		"carbon_dioxide": { elem2: null, chance:0.001 },
		"plasma": { elem1:"ozone", tempMin:500, charged:true },
		"copper": { elem1:"oxygen", chance:0.01 },
		"bronze": { elem1:"oxygen", chance:0.005 },
		"iron": { elem1:"oxygen", chance:0.005 },
		"steel": { elem1:"oxygen", chance:0.004 },
		"tornado":{elem1:"cloud"},
		"melted_wax": { elem1:"explosion" }
	},
	temp: 150,
	tempLow: 95,
	extraTempLow: {
		0: "rime"
	},
	stateLow: "filtered_water",
	category: "saturns",
	state: "gas",
	density: 0.3,
	conduct: 0.001,
	stain: -0.025,
	alias: "water vapor but nice",
	extinguish: true
}

elements.nice_ice = {
	color: "#b2daeb",
	behavior: behaviors.WALL,
	temp: -5,
	tempHigh: 5,
	stateHigh: "filtered_water",
	category: "saturns",
	state: "solid",
	density: 908,
	breakInto: "snow"
}

elements.filter_powder = {
	color: "#7a7862",
	behavior: behaviors.POWDER,
	tempHigh: 100,
	stateHigh: "charcoal",
	category: "saturns",
	state: "solid",
	density: 1080,
	breakInto: "sand",
	reactions: {
		"water": {elem1: null, elem2: "filtered_water"},
		"dirty_water": {elem1: null, elem2: "water"},
		"salt_water": {elem1: "salt", elem2: "filtered_water"},
		"sugar_water": {elem1: "sugar", elem2: "filtered_water"},
		"rock": {elem1: "stable_filter_powder", elem2: null}
	}
}

elements.stable_filter_powder = {
	color: "#7d7c72",
	behavior: behaviors.POWDER,
	tempHigh: 100,
	stateHigh: "charcoal",
	category: "saturns",
	state: "solid",
	density: 1080,
	breakInto: "sand",
	reactions: {
		"water": {elem2: "filtered_water"},
		"dirty_water": {elem2: "water"},
		"salt_water": {elem2: "filtered_water"},
		"sugar_water": {elem2: "filtered_water"}
	}
}

elements.petulantia_ferrobacteria = {
	color: ["#ee3400","ee8300","#eed600"],
	behavior: [
		"XX|M2%10|XX",
		"M1%50|XX|M1%50",
		"XX|M1|XX"
	],
	reactions: {
		"infection": { elem2:"dna", chance:0.015 },
		"antibody": { elem2:"cell", chance:0.01 },
		"cell": { elem2:"dna", chance:0.03 },
		"sugar_water": { elem2:"cell", chance:0.04 },
		"alcohol": { elem2:[null,"dna"], chance:0.02 },
		"poison": { elem1:null, chance:0.02 },
		"plague": { elem2:"infection", chance:0.02 },
		"mercury": { elem1:null, chance:0.02 },
		"chlorine": { elem1:null, chance:0.02 },
		"cyanide": { elem1:null, chance:0.02 },
		"soap": { elem1:null, elem2: null, chance:0.15},
		"oxygen": { elem2:"carbon_dioxide", chance:0.05 },
		"ammonia": { elem2:"nitrogen", chance:0.05 },
		"oil": { elem2:"methane", chance:0.001 },
		"milk": { elem2:"yogurt", chance:0.01 },
		"chocolate_milk": { elem2:"yogurt", chance:0.01, color2:"#4c392c" },
		"fruit_milk": { elem2:"yogurt", chance:0.01, color2:"#977871" },
		"pilk": { elem2:"yogurt", chance:0.01, color2:"#bba789" },
		"eggnog": { elem2:"yogurt", chance:0.01, color2:"#ae9a7e" },
		"dna": { elem2:"petulantia_ferrobacteria", chance:0.5}
	},
	tempHigh: 102,
	stateHigh: ["steam","steam","steam","sugar"],
	tempLow: -2,
	stateLow: ["ice","ice","ice","sugar_ice"],
	state: "solid",
	density: 1000.1,
	category: "saturns",
	breakInto: ["water","dna","dna","dna"],
	alias: "iron-stabber"
}
