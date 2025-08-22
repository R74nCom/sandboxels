elements.graphite = {
	color: "#030104",
	behavior: behaviors.POWDER,
	category: "land",
	state: "solid",
	tempHigh: 3600,
	stateHigh: "charcoal",
	reactions: {
		"oxygen": { elem1: "carbon_dioxide", elem2: null, tempMin: 700 },
		"fluorine": { elem1: "carbon_tetrafluoride", elem2: null }		
	}
};

elements.fluorine = {
	color: "#b5e61d",
	behavior: behaviors.GAS,
	category: "gas",
	state: "gas",
	density: 1.696,
	reactions: {
		"graphite": {elem1: "carbon_tetrafluoride", elem2: null }
},
	temp: 25,
	flammable: false
};

elements.carbon_tetrafluoride = {
	color: "#ccffff",
	behavior: behaviors.GAS,
	category: "gas",
	density: 3.72,
	flammable: false,
	reactions: { 
		"fire": { elem1: "carbon_dioxide", elem2: "fluorine", tempMin: 2000 }
	}
};
	