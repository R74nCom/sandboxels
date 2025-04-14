
behaviors.YOGURT = [
    "XX|XX|XX",
    "XX|XX|XX",
    "M2%5|M1|M2%5",
];

elements.kefir = {
	color: "#f0f1fa",
	behavior: behaviors.YOGURT,
	category: "food",
	state: "solid",
	stateHigh: "yogurt",
	stateLow: "frozen_kefir",
	stateLowColorMultiplier: 1.05,
	tempHigh: 125,
	tempLow: 0,
	reactions: {
		"honey": { elem1: "honey_kefir", elem2: null },
		"caramel": { elem1: "honey_kefir", elem2: null },
		"sugar": { elem1: "honey_kefir", elem2: null },
	}
}

elements.frozen_kefir = {
	temp: -5,
	tempHigh: 0,
	stateHigh: "kefir",
	breakInto: "kefir",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	isFood: true,
	stateHighColorMultiplier: 0.955,
}

elements.honey_kefir = {
	color: "#ffe7cf",
	behavior: behaviors.YOGURT,
	category: "states",
	state: "solid",
	stateHigh: "honey",
	stateLowName: "frozen_kefir",
	stateLowColorMultiplier: 1.05,
	tempHigh: 125,
	tempLow: 0,
}

elements.honey_yogurt = {
	color: "#fff6e6",
	category: "states",
	behavior: behaviors.YOGURT,
	tempHigh: 1000,
	stateHigh: ["smoke","smoke","honey","calcium"],
	tempLow: 0,
	stateLowName: "frozen_yogurt",
	stateLowColorMultiplier: 1.05,
	state: "liquid",
	density: 820.33,
	isFood: true,
	alias: "honey_yoghurt",
}

elements.beet = {
	color: "#ff576d",
	category: "food",
	behavior: behaviors.POWDER,
	state: "solid",
	stateHigh: "beet_juice",
	tempHigh: 125,
	breakInto: "beet_juice",
}

elements.beet_juice = {
	color: "#ff0062",
	category: "liquids",
	behavior: behaviors.LIQUID,
	state: "solid",
	stateHigh: "sugar",
	tempHigh: 125,
	stateLow: "frozen_beet_juice",
	stateLowColorMultiplier: 1.15,
	tempLow: 0,
}

elements.frozen_beet_juice = {
	temp: -5,
	tempHigh: 0,
	stateHigh: "beet_juice",
	breakInto: "beet_juice",
	behavior: behaviors.STURDYPOWDER,
	category: "states",
	isFood: true,
	stateHighColorMultiplier: 0.955,
}

const swaps = {
  "meat": "cooked_meat",
  "kefir": "honey_kefir",
  "bread": "toast",
  "yogurt": "honey_yogurt",
  "egg": "yolk",
  "wheat": "flour",
  "frozen_meat": "meat",
  "coffee_beans": "coffee_ground",
  "coffee_ground": "coffee",
  "corn": "popcorn",
  "flour": "dough",
  "potato": "baked_potato",
  "beet": "beet_juice",
};
elements.prepare = {
    color: "#ffe7cf",
    tool: function(pixel) {
        if (pixel.element in swaps) {
          changePixel(pixel, swaps[pixel.element])
        }
    },
    category: "tools",
};

if (!elements.yogurt.reactions) { // Include this block once
    elements.yogurt.reactions = {} // This creates the property if it doesn't exist
}
elements.yogurt.reactions.honey = { "elem1":"honey_yogurt", "elem2":null }