
elements.melted_glucose = {
	hidden: true,
	color: "#ffffcc",
	behavior: behaviors.MOLTEN,
	category: "states",
	state: "solid",
	tempLow: 142,
	stateLow: "glucose",
	density: 1.5620
}

elements.condensed_milk = {
	hidden: true,
	color: "#ffffff",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "liguid"
}

elements.glucose = {
	color: "#ffffff",
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
	tempHigh: 145,
	stateHigh: "melted_glucose",
	reactions:{
		"water": {elem1: "sugar_water", elem2: null},
		"poison": {elem1: null, elem2: null},
		"dough": {elem1: null, color2: "#cbb89d"},
		"yeast": {elem1: ["alcohol", "yeast"], chance: 0.01},
		"milk": {elem1: null, elem2: "condensed_milk"},
		"ice_cream": {elem1: null}
		
	},
	density: 1.5620
}

elements.plant.breakInto = ["glucose", "dead_plant"]

elements.juice.stateHigh = ["steam", "glucose"];
elements.rice.reactions.yeast = {elem1: "glucose", elem2: "none", chance: 0.05};

elements.chopper = {
	color: "#aaaaaa",
	category: "tools",
	tool: function(pixel) {
		if (pixel.element == "potato") {
			pixel.element = "starch"
		};
	},
}

elements.starch = {
	color: ["#ffffff", "#eeeeee"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid"
}

elements.sulfuric_acid = {
	color: ["#dddd77", "#dfddfd"],
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "solid",
	reactions: {
		starch: {elem1: "glucose", elem2: "none"}
	}
}

elements.bee.reactions.glucose = {elem2:null, chance:0.15, func:behaviors.FEEDPIXEL}

elements.ascorbic_acid = {
	color: "#c5bb5a",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid"
}

behaviors.BACTERIA = [
						["XX", "SW:dirt", "XX"],
						["SW:dirt", "XX", "SW:dirt"],
						["M1", "SW:dirt", "M1"]
					]

elements.corynebacterium = {
	color: "#2e0116",
	behavior: behaviors.BACTERIA,
	category: "life",
	state: "solid",
	reactions: {
		"glucose": {elem2: "ascorbic_acid"}
	}
}
