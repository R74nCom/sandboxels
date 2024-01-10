elements.green_apple = {
	color: "#2ab54f",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	tempHigh: "120",
	stateHigh: "ash",
	breakInto: "juice",
	reactions: {
		"milk": { elem1: "fruit_milk", elem2: "fruit_milk" },
		"red_apple": { elem1: "mixed_apples", elem2: "mixed_apples" },
	}
}; 
elements.red_apple = {
	color: "#e83838",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	tempHigh: "120",
	stateHigh: "ash",
	breakInto: "juice",
	reactions: {
		"milk": { elem1: "fruit_milk", elem2: "fruit_milk" },
		"green_apple": { elem1: "mixed_apples", elem2: "mixed_apples" },
	}
};
elements.mixed_apples = {
	color: ["#d13030", "#bf3d3d", "#369e3d", "#39b359"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	tempHigh: "120",
	stateHigh: "ash",
	breakInto: "juice",
	reactions: {
		"milk": { elem1: "fruit_milk", elem2: "fruit_milk" },
		"sugar": { elem1: "mixed_sweet_apples", elem2: "mixed_sweet_apples" },
	}
};
elements.mixed_sweet_apples = {
	color: ["#d93f3f", "#d45555", "#50b556", "#50cc70"],
	behavior: behaviors.POWDER,
	category: "states",
	state: "solid",
	tempHigh: "135",
	stateHigh: "ash",
	breakInto: "juice",
	hidden: true,
	reactions: {
		"milk": {elem1: "fruit_milk", elem2: "fruit_milk" },
		"flour": {elem1: "apple_pie", elem2: "apple_pie" },
	}
};
elements.apple_pie = {
	color: "#f0b55d",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	tempHigh: "156",
	stateHigh: "ash",
	hidden: true,
};
elements.pear = {
	color: "#3a8c3c",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	tempHigh: "120",
	stateHigh: "ash",
	breakInto: "juice",
	reactions: {
		"milk": {elem1: "fruit_milk", elem2: "fruit_milk" },
	}
};
elements.coconut = {
	color: "#8c6d3a",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	tempHigh: "166",
	stateHigh: "ash",
	breakInto: "coconut_flesh",
};
elements.coconut_flesh = {
	color: "#faf4eb",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	tempHigh: "134",
	stateHigh: "ash",
	hidden: true,
	reactions: {
		"water": {elem1: "coconut_milk", elem2: "coconut_milk" },
	}
};
	
elements.coconut_milk = {
	color: "#f7f5f2",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "liquid",
	tempHigh: "124",
	stateHigh: "steam",
	tempLow: "-10",
	stateLow: "frozen_coconut_milk",
	hidden: true,
};
elements.frozen_coconut_milk = {
	color: "#f0fcfc",
	behavior: behaviors.WALL,
	category: "states",
	state: "ice",
	tempHigh: "-10",
	stateHigh: "coconut_milk",
	hidden: true,
};