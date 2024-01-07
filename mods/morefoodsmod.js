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
		
		elements.rice = {
	color: "#f6f8ed",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
   reactions: {
	   "broth": { elem1: "risotto", elem2: null },
	   "beans": { elem1: null, elem2: "feijoada"},
            },
		};
		
		elements.risotto = {
	color: "#f8f4e9",
	behavior: behaviors.SUPPORTPOWDER,
	category: "food",
	state: "solid",
		};
		
		elements.feijoada = {
	color: "#291800",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "liquid",
	viscosity: 9
		};
		
		if (!elements.milk.reactions) elements.milk.reactions = {};
elements.milk.reactions.corn = { elem1: null, elem2: "chowder" }