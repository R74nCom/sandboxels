
behaviors.YOGURT = [
    "XX|XX|XX",
    "XX|XX|XX",
    "M2%5|M1|M2%5",
];

elements.kefir = {
	color: "#f0f1fa",
	behavior: behaviors.YOGURT,
	category: "liquids",
	state: "solid",
	stateHigh: "yogurt",
	tempHigh: 125,
	reactions: {
		"honey": { elem1: "honey_kefir", elem2: null },
		"caramel": { elem1: "honey_kefir", elem2: null },
		"sugar": { elem1: "honey_kefir", elem2: null },
	}
}

elements.honey_kefir = {
	color: "#ffe7cf",
	behavior: behaviors.YOGURT,
	category: "states",
	state: "solid",
	stateHigh: "honey",
	tempHigh: 125,
}

elements.honey_yogurt = {
	color: "#fff6e6",
	category: "states",
	behavior: behaviors.YOGURT,
	state: "solid",
	stateHigh: "honey",
	tempHigh: 125,
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