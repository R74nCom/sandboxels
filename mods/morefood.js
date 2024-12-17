elements.brownsugar = {
	color: "#966202",
	color: "#6e4802",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	stateHigh: "caramel",
	tempHigh: 390,
	tempLow: -3,
	stateLow: "freezebrownsugar",
};

elements.freezebrownsugar = {
	color: "#a6926d",
	behavior: behaviors.WALL,
	category: "food",
	state: "solid",
	stateHigh: "brownsugar",
	tempHigh: 100,
};

elements.fryoil = {
	color: "#e0b234",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	stateHigh: "steam",
	tempHigh: 490,
	tempLow: -3,
	stateLow: "freezefryoil",
};

elements.freezefryoil = {
	color: "#e3c981",
	behavior: behaviors.WALL,
	category: "food",
	state: "solid",
	stateHigh: "fryoil",
	tempHigh: 100,
};