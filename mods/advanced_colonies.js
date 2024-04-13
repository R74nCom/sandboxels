elements.male_davler = {
	color: "#afe7ed",
	behavior: behaviors.CRAWLER,
	category: "davlers",
	state: "solid",
	tempHigh: 125,
	stateHigh: "dead_bug",
	breakInto: "davler_remains",
	reactions: {
		"sugar": { elem2: null },
		"meat": { elem2: null },
		"rotten_meat": { elem2: null },
		"cooked_meat": { elem1: "davler_remains" },
		"dough": { elem2: null },
		"baking_soda": { elem1: "davler_remains" }
	}
};

elements.female_davler = {
	color: "#c1ecf1",
	behavior: behaviors.CRAWLER,
	category: "davlers",
	state: "solid",
	tempHigh: 125,
	stateHigh: "dead_bug",
	breakInto: "davler_remains",
	reactions: {
		"sugar": { elem2: null },
		"meat": { elem2: null },
		"rotten_meat": { elem2: null },
		"cooked_meat": { elem1: "davler_remains" },
		"dough": { elem2: null },
		"baking_soda": { elem1: "davler_remains" }
	}
};

elements.davler_queen = {
	color: "#3495eb",
	behavior: behaviors.CRAWLER,
	category: "davlers",
	state: "solid",
	tempHigh: 150,
	stateHigh: "davler_remains",
	breakInto: "davler_remains",
	properties: {
		"eaten": 0
	},
	tick: function(pixel) {
		if (pixel.eaten > 2) {
			pixel.eaten = 0
			createPixel('larvae', pixel.x + 1, pixel.y)
		}
	},
	reactions: {
		"sugar": { elem2: null, func: function(pixel){pixel.eaten = pixel.eaten +1} },
		"meat": { elem2: null },
		"rotten_meat": { elem2: null },
		"cooked_meat": { elem1: "dead_bug" },
		"dough": { elem2: null },
		"baking_soda": { elem1: "dead_bug" }
	}
};	

elements.larvae = {
	color: ["#f2e9c9", "#ebd798"],
	behavior: behaviors.POWDER,
	category: "davlers",
	state: "solid",
	tempHigh: 150,
	stateHigh: "dead_bug",
	breakInto: "yolk",
	properties: {
		"hatch": 300,
		"fertilized": false
	},
	tick: function(pixel) {
		if (pixel.hatch < 1) {
			const nX = pixel.x
			const nY = pixel.y
			deletePixel(pixel.x, pixel.y)
			const chance = Math.floor(Math.random() * ( 2 - 1 + 1)) + 1
			if (chance == 1) {
				createPixel('female_davler', nX, nY)
			} else {
				createPixel('male_davler', nX, nY)
			}
		} else {
			if (pixel.fertilized == true) {
				pixel.hatch = pixel.hatch - 1
			}
		}
	},
	reactions: {
		"baking_soda": { elem1: "dead_bug" },
		"male_davler": { func: function(pixel){pixel.fertilized = true } }
	}
};	

elements.davler_remains = {
	color: elements.dead_bug.color,
	behavior: behaviors.POWDER,
	state: "solid",
	tempHigh: 150,
	stateHigh: ["ash", "fire"],
	category: "davlers",
	reactions: {
		"yolk": { elem2: "artificial_larvae", elem1: null }
	}
};

elements.artificial_larvae = {
	color: ["#f2e9c9", "#ebd798"],
	behavior: behaviors.POWDER,
	category: "davlers",
	state: "solid",
	tempHigh: 150,
	stateHigh: "dead_bug",
	breakInto: "yolk",
	properties: {
		"hatch": 450,
		"fertilized": false
	},
	tick: function(pixel) {
		if (pixel.hatch < 1) {
			const nX = pixel.x
			const nY = pixel.y
			deletePixel(pixel.x, pixel.y)
			const chance = Math.floor(Math.random() * ( 4 - 1 + 1)) + 1
			if (chance == 1) {
				createPixel('female_davler', nX, nY)
			} else if ( chance == 2 ) {
				createPixel('male_davler', nX, nY)
			} else {
				createPixel('dead_bug', nX, nY)
			}
		} else {
			if (pixel.fertilized == true) {
				pixel.hatch = pixel.hatch - 1
			}
		}
	},
	reactions: {
		"baking_soda": { elem1: "dead_bug" },
		"male_davler": { func: function(pixel){pixel.fertilized = true } }
	}
};	
