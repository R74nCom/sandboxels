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
	color: "#ffff7f",
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
		
		elements.mentos = {
	color: "#a9fff9",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
		reactions: {
		"soda": { elem1: "foam", elem2: "foam" },
		"sprite": { elem1: "foam", elem2: "foam" } ,
	}
		};
		
		elements.sprite = {
	color: "#b2f3ad",
    behavior: elements.soda.behavior,
	category: "food",
	state: "liquid",
		};
		
		elements.fanta = {
	color: "#ffd500",
    behavior: elements.soda.behavior,
	category: "food",
	state: "liquid",
		};
		
		elements.steampunk_soda = {
	color: "#0fda2f",
    behavior: [
    "XX|CR:radiation,foam%2|XX",
    "M2 AND CR:radiation%2|XX|M2 AND CR:radiation%2",
    "M1|M1|M1",
],
	category: "food",
	state: "liquid",
		};
		
		elements.lime = {
	color: "#b4ff15",
    behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	    reactions: {
        "seltzer": { elem1: null, elem2: "sprite" },
    },
		};
		
		elements.orange = {
	color: "#ffa500",
    behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	    reactions: {
        "seltzer": { elem1: null, elem2: "fanta" },
    },
		};
		
		elements.steampunk_syrup = {
	color: "#0fda2f",
    behavior: behaviors.RADLIQUID,
	category: "food",
	state: "liquid",
		  reactions: {
        "seltzer": { elem1: null, elem2: "steampunk_soda" },
		"flour": { elem1: "steampunk_dough", elem2: null },
    },
		};
		
		elements.steampunk_dough = {
	color: "#0fda2f",
    behavior: [
	"XX|CR:radiation%2|XX",
    "M2 AND CR:radiation%2|XX|M2 AND CR:radiation%2",
    "XX|M1|XX",
	],
	category: "food",
	state: "liquid",
	tempHigh: 135,
	stateHigh: "steampunk_bread",
		};
		
		elements.steampunk_bread = {
	color: "#0fda2f",
    behavior: behaviors.RADSOLID,
	category: "food",
	state: "solid",
	tempHigh: 135,
	stateHigh: "steampunk_syrup",
		};
		
		elements.salami = {
	color: ["#bb0e0e", "#bb0e0e", "#bb0e0e", "#ffffff"],
    behavior: behaviors.SOLID,
	category: "food",
	state: "solid",
	reactions: {
        "flour": { elem1: "slommi", elem2: null },
    },
		};
		
		elements.slommi = {
	color: ["#bb0e0e", "#ffb1b1"],
    behavior: behaviors.SOLID,
	category: "food",
	state: "solid",
	hidden: true,
		};
		
		if (!elements.milk.reactions) elements.milk.reactions = {};
elements.milk.reactions.corn = { elem1: null, elem2: "chowder" }