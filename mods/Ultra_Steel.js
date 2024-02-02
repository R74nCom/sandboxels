elements.Ultra_Steel = {
	color: "#8f748f",
	behavior: behaviors.WALL,
	category: "solids",
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

elements.Chocolate_Muffin = {
	color: ["#7e4d32","#492500","#5e3400","#360101"],
	behavior: behavior.WALL,
	category: "food",
	state: "solid",
};
	
elements.Cacao_Beans = {
	color: "#48291C",
	behavior: behaviors.POWDER,
	breakInto: "Crushed_Cacao_Beans"
};

elements.Crushed_Cacao_Beans = {
	color: ["#48291C","#543324","#3d251a"],
	behavior: behaviors.POWDER,
	reactions: {
		"sugar": {elem1: "Chocolate_Mixture"}
};

elements.Chocolate_Mixture = {
	color: ["#7B3F00","#572e03","#824a10"],
	behavior: behaviors.POWDER,
	reactions: {
		"Milk": {elem1: "Chocolate"}
};

elements.Chocolate = {
	color: "#48291C",
	behavior: behaviors.WALL,
	reactions: {
		"Dough": {elem1: "Chocolate_Dough"}
};

elements.Chocolate_Dough = {
	color: "#",
	behavior: behaviors.LIQUID,
	tempHigh: 450,
	stateHigh: "Chocolate_Muffin",
};
