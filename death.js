elements.chowder = {
	color: "#c7c98b",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
   reactions: {
        "water": { elem1: null, elem2: "soup" },
		    },
		};
		
		elements.soup = {
	color: "#c28719",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "liquid",
	stateHigh: "chowder",
	tempHigh: 100
		};