elements.Ultra_Steel = {
	color: "#8f748f",
	behavior: behaviors.WALL,
	category: "solid",
	state: "solid",
	tempHigh: 26525,
	stateHigh: "Molten_Ultra_Steel",
};

elements.Molten_Ultra_Steel = {
	color: ["#bf56bf","#873987","#d158d1","#a145a1"],
	behavior: behaviors.LIQUID,
	category: "states",
	state: "liquid",
	tempLow: 24725,
	stateLow: "Ultra_Steel",
	reactions: {
		"molten_gold": { elem1: "salt",  elem2: "salt" },
	}
};
