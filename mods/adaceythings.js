elements.luigi = {
	color: "#4cbb17",
	behavior: behaviors.WALL,
	category: "special",
	state: "solid",
	density: 985
}
elements.luigi_ball = {
	color: "#3dae0a",
	behavior: behaviors.BOUNCY,
	category: "special",
	state: "solid",
	density: 666.67
}
elements.pickle_juice = {
	color: "#edff75",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "liquid",
	density: 1050,
	tempLow:-21,
	stateLow:"pickle_juice_ice",
	reactions: {
		"cucumber": {elem2:"pickle"},
	}
};
elements.pickle_juice_ice = {
	color: "#f4ff86",
	behavior: behaviors.WALL,
	category: "states",
	state: "solid",
	density: 962,
	tempHigh:-21,
	stateHigh:"pickle_juice"
}
elements.cucumber = {
	color: "#04540c",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	density: 410,
	reactions: {
		"salt_water": {elem1:"pickle",elem2:"pickle_juice"},
		"vinegar": {elem1:"pickle",elem2:"pickle_juice"},
		"yogurt": {elem1:null,elem2:"tzatziki"},
	}
};
elements.tzatziki = {
	color: "#ebf2ec",
	behavior: behaviors.POWDER,
	category: "food",
	state: "liquid",
	density: 1014.421,
	alias:["cacık","tarator"]
}
elements.argon = {
	color: "#efd7f7",
	behavior: behaviors.GAS,
	category: "gases",
	state: "gas",
	density: 1.784,
	tempLow:-186,
	stateLow:"liquid_argon"
}
elements.liquid_argon = {
	color: "#f5defa",
	behavior: behaviors.LIQUID,
	category: "states",
	state: "liquid",
	density: 1395.4,
	tempLow:-189,
	stateLow:"argon_ice",
	tempHigh:-186,
	stateHigh:"argon"
}
elements.argon_ice = {
	color: "#f5e5ff",
	behavior: behaviors.WALL,
	category: "states",
	state: "solid",
	density: 1648,
	tempHigh:-189,
	stateHigh:"liquid_argon"
}
elements.krypton = {
	color: "#fae5c0",
	behavior: behaviors.GAS,
	category: "gases",
	state: "gas",
	density: 3.749,
	tempLow:-153,
	stateLow:"liquid_krypton"
}
elements.liquid_krypton = {
	color: "#fcebc6",
	behavior: behaviors.LIQUID,
	category: "states",
	state: "liquid",
	density: 2413,
	tempLow:-157,
	stateLow:"krypton_ice",
	tempHigh:-153,
	stateHigh:"krypton"
}
elements.krypton_ice = {
	color: "#feeecb",
	behavior: behaviors.WALL,
	category: "states",
	state: "solid",
	density: 2800,
	tempHigh:-157,
	stateHigh:"liquid_krypton"
}
elements.xenon = {
	color: "#c9bae3",
	behavior: behaviors.GAS,
	category: "gases",
	state: "gas",
	density: 5.894,
	tempLow:-108,
	stateLow:"liquid_xenon"
}
elements.liquid_xenon = {
	color: "#cdbfe8",
	behavior: behaviors.LIQUID,
	category: "states",
	state: "liquid",
	density: 2942,
	tempLow:-112,
	stateLow:"xenon_ice",
	tempHigh:-108,
	stateHigh:"xenon"
}
elements.xenon_ice = {
	color: "#daceee",
	behavior: behaviors.WALL,
	category: "states",
	state: "solid",
	density: 3408,
	tempHigh:-112,
	stateHigh:"liquid_xenon"
}
elements.NaK = {
	color: "#575050",
	behavior: behaviors.LIQUID, 
	category: "liquids",
	state: "liquid",
	density: 866,
	reactions: {
		"water": {elem1:["caustic_potash","hydrogen"],elem2:"fire"}
	}
};
elements.obsidian = {
	color: ["#020202","#3d2856","#281f3f","#110d1d","#06030c"],
	behavior: behaviors.WALL,
	category: "solids",
	state: "solid",
	density: 2400,
	tempHigh:900,
	stateHigh:"magma"
}
elements.polonium={
	color: "#1ff2dd",
	category:"solids",
	customColor: false,
	hidden:false,
	state: "solid",
	density: 9320,
	behavior: [
		"XX|CR:radiation%4|XX",
		"CR:radiation%5|CH:lead%1.444|CR:radiation%5",
		"XX|XX|XX",
	],
	canPlace: true,
	glow: true,
	reactions: {
		"acid": {elem1:null,elem2:"pink_polonium_solution"},
		"neutral_acid": {elem1:null,elem2:"pink_polonium_solution"},
		"vinegar": {elem1:null,elem2:"pink_polonium_solution"}
	}
};
elements.stable_polonium={
	color: "#18ecd5",
	category:"solids",
	customColor: false,
	hidden:false,
	state: "solid",
	density: 9320,
	canPlace: true,
	glow: true,
	reactions: {
		"acid": {elem1:null,elem2:"pink_polonium_solution"},
		"neutral_acid": {elem1:null,elem2:"pink_polonium_solution"},
		"vinegar": {elem1:null,elem2:"pink_polonium_solution"}
	}
};
elements.pink_polonium_solution={
	color: "#ed95dd",
	category:"liquids",
	customColor: false,
	hidden:false,
	state: "liquid",
	canPlace: true,
	behavior: [
		"CH:light%1|CH:light%2|CH:light%1",
		"XX|CH:yellow_polonium_solution%3.5|XX",
		"XX|XX|XX",
	],
	glow: false
};
elements.yellow_polonium_solution={
	color: "#f2f538",
	category:"liquids",
	customColor: false,
	hidden:false,
	state: "liquid",
	canPlace: true,
	glow: false
}
elements.water.reactions.pickle = {elem1:"pickle_juice", elem2:"pickle"}
elements.salt_water.reactions.pickle = {elem1:"pickle_juice", elem2:"pickle"}
elements.sodium.reactions.potassium = {elem1:"NaK",elem2:null}
