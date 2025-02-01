elements.dalgona = {
	desc: "Dalgona candy from Squid Game",
	color: "#c49543",
	behavior: behaviors.WALL,
	category: "food",
	state: "solid",
	isFood: true,
	tempHigh: 400,
	stateHigh: "smoke",
	tempLow: -20,
	stateLow: "salted_caramel",
	breakInto: "salted_sugar",
};

elements.salted_caramel = {
	color: "#c48537",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	isFood: true,
	tempHigh: 400,
	temp: -20,
	stateHigh: "smoke",
	tempLow: -50,
	stateLow: "candy",
	breakInto: "salted_sugar",
};
elements.salted_sugar = {
	color: "#fcfcfc",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	isFood: true,
	tempHigh: 170,
	temp: -20,
	stateHigh: "salted_caramel",
};

elements.sugar.reactions.salt = { elem1:"salted_sugar", elem2: null };
elements.caramel.reactions.salt = { elem1:"salted_caramel", elem2: null };
elements.caramel.reactions.baking_soda = { elem1:"dalgona", elem2: null };
