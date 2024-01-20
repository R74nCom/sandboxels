elements.green_apple = {
	color: "#2ab54f",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	tempHigh: 120,
	stateHigh: "ash",
	breakInto: "juice",
	breakIntoColor: "#5fba65",
	desc: "Green apple from the greenitemsandmore.js mod.",
	reactions: {
		"milk": { elem1: "fruit_milk", elem2: "fruit_milk", color1: "#86b867", color2: "#70b867" },
		"red_apple": { elem1: "mixed_apples", elem2: "mixed_apples" },
	}
}; 
elements.red_apple = {
	color: "#e83838",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	tempHigh: 120,
	stateHigh: "ash",
	breakInto: "juice",
	breakIntoColor: "#c95555",
	desc: "Red apple from the greenitemsandmore.js mod.",
	reactions: {
		"milk": { elem1: "fruit_milk", elem2: "fruit_milk", color1: "#d65151", color2: "#d65152" },
		"green_apple": { elem1: "mixed_apples", elem2: "mixed_apples" },
	}
};
elements.mixed_apples = {
	color: ["#d13030", "#bf3d3d", "#369e3d", "#39b359"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	tempHigh: 120,
	stateHigh: "ash",
	breakInto: "juice",
	breakIntoColor: ["#ba6859", "#71a676"],
	desc: "Mixed apples from the greenitemsandmore.js mod.",
	reactions: {
		"milk": { elem1: "fruit_milk", elem2: "fruit_milk", color1: "#c47264", color2: "#66bd57"},
		"sugar": { elem1: "mixed_sweet_apples", elem2: "mixed_sweet_apples" },
	}
};
elements.mixed_sweet_apples = {
	color: ["#d93f3f", "#d45555", "#50b556", "#50cc70"],
	behavior: behaviors.POWDER,
	category: "states",
	state: "solid",
	tempHigh: 135,
	stateHigh: "ash",
	breakInto: "juice",
	breakIntoColor: ["#ad746a", "#82ba88"],
	hidden: true,
	desc: "Mixed sweet apples from the greenitemsandmore.js mod.",
	reactions: {
		"milk": {elem1: "fruit_milk", elem2: "fruit_milk", color1: "#f58989", color2: "#71a162"},
		"flour": {elem1: "apple_pie", tempMin: 15, elem2: "apple_pie" },
	}
};
elements.apple_pie = {
	color: "#f0b55d",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	tempHigh: 156,
	stateHigh: "ash",
	desc: "Apple pie from the greenitemsandmore.js mod.",
	hidden: true,
};
elements.pear = {
	color: "#3a8c3c",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	tempHigh: 120,
	stateHigh: "ash",
    breakInto: "juice",
	breakIntoColor: "#5f8f50",
	desc: "Pear from the greenitemsandmore.js mod.",
	reactions: {
		"milk": {elem1: "fruit_milk", elem2: "fruit_milk", color1: "#60c483", color2: "#60c483"},
	}
};
elements.coconut = {
	color: "#8c6d3a",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	tempHigh: 166,
	stateHigh: "ash",
	desc: "Coconut from the greenitemsandmore.js mod.",
	breakInto: "coconut_flesh",
};
elements.coconut_flesh = {
	color: "#faf4eb",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	tempHigh: 134,
	stateHigh: "ash",
	hidden: true,
	desc: "Coconut flesh from the greenitemsandmore.js mod.",
	reactions: {
		"water": {elem1: "coconut_milk", elem2: "coconut_milk" },
	}
};
	
elements.coconut_milk = {
	color: "#f7f5f2",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "liquid",
	tempHigh: 124,
	stateHigh: "steam",
	tempLow: -10,
	stateLow: "frozen_coconut_milk",
	desc: "Coconut milk from the greenitemsandmore.js mod.",
	hidden: true,
};
elements.frozen_coconut_milk = {
	color: "#f0fcfc",
	behavior: behaviors.WALL,
	category: "states",
	state: "ice",
	tempHigh: -10,
	stateHigh: "coconut_milk",
	hidden: true,
	desc: "Frozen coconut milk from the greenitemsandmore.js mod.",
	temp: -20,
};
elements.fruit_doughnut = {
	color: "#de9802",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	tempHigh: 95,
	stateHigh: "ash",
	desc: "Fruit doughnuts, or as dutch people call it: Olliebollen. A newyear snack. Made from flour, yeast and milk. From the greenitemsandmore.js mod.",
	breakInto: "flour",
	hidden: true,
};
elements.dough.reactions = {
  "yeast": { elem1: "fruit_doughnut", elem2: "fruit_doughnut" }
};
elements.beans.tempHigh = "40"
elements.beans.stateHigh = "baked_beans"
elements.baked_beans = {
	color: ["#bf6211", "#c46b1d", "#b35d12", "#a65b19"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	tempLow: 40,
	stateLow: "beans",
	desc: "Baked beans from the greenitemsandmore.js mod.",
	hidden: true,
};
elements.kiwi = {
	color: ["#469e3e", "#9e813e"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	desc: "Kiwi from the greenitemsandmore.js mod.",
	breakInto: "juice",
	breakIntoColor: "#2e7533",
	tempHigh: 120,
	stateHigh: "ash",
};

behaviors.CUSTOMMOVEMENT = [
"M3|XX|M3",
"M2|XX|M2",
"M3|M1|M2",
],

elements.movementtest = {
	color: "#ccc3a9",
	behavior: behaviors.CUSTOMMOVEMENT,
	category: "special",
	state: "solid",
	desc: "movementtest. Used for testing movement. From the greenitemsandmore.js mod.",
};
