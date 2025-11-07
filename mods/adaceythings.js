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
	tempLow: -12.6,
	stateHigh: "frozen_NaK",
	tempHigh: 785, 
	stateHigh: "NaK_gas", 
	reactions: {
		"water": {elem1:["caustic_potash","lye"],elem2:["fire","hydrogen"]},
		"dirty_water": {elem1:["caustic_potash","lye"],elem2:["fire","hydrogen"]},
		"seltzer": {elem1:["caustic_potash","lye"],elem2:["fire","hydrogen"]},
		"sugar_water": {elem1:["caustic_potash","lye"],elem2:["fire","hydrogen"]},
		"salt_water": {elem1:["caustic_potash","lye"],elem2:["fire","hydrogen"]},
		"pool_water": {elem1:["caustic_potash","lye"],elem2:["fire","hydrogen"]}
	}
};
elements.frozen_NaK = {
	color: "#777070",
	behavior: behaviors.WALL, 
	category: "states",
	state: "solid",
	density: 8600,
	tempHigh: -12.6, 
	stateHigh: "NaK", 
	reactions: {
		"water": {elem1:["caustic_potash","lye"],elem2:["fire","hydrogen"]},
		"dirty_water": {elem1:["caustic_potash","lye"],elem2:["fire","hydrogen"]},
		"seltzer": {elem1:["caustic_potash","lye"],elem2:["fire","hydrogen"]},
		"sugar_water": {elem1:["caustic_potash","lye"],elem2:["fire","hydrogen"]},
		"salt_water": {elem1:["caustic_potash","lye"],elem2:["fire","hydrogen"]},
		"pool_water": {elem1:["caustic_potash","lye"],elem2:["fire","hydrogen"]}
	}
};
elements.NaK_gas = {
	color: "#372030",
	behavior: behaviors.GAS, 
	category: "states",
	state: "gas",
	density: 3.104,
	tempLow: -785,
	stateLow: "NaK",
		reactions: {
		"water": {elem1:["caustic_potash","lye"],elem2:["fire","hydrogen"]},
		"dirty_water": {elem1:["caustic_potash","lye"],elem2:["fire","hydrogen"]},
		"seltzer": {elem1:["caustic_potash","lye"],elem2:["fire","hydrogen"]},
		"sugar_water": {elem1:["caustic_potash","lye"],elem2:["fire","hydrogen"]},
		"salt_water": {elem1:["caustic_potash","lye"],elem2:["fire","hydrogen"]},
		"pool_water": {elem1:["caustic_potash","lye"],elem2:["fire","hydrogen"]}
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
		"M2|M1|M2",
	],
	glow: false
};
elements.stable_pink_polonium_solution={
	color: "#f49ce3",
	category:"liquids",
	customColor: false,
	hidden:false,
	state: "liquid",
	canPlace: true,
	behavior:behaviors.LIQUID,
	glow: false
}
elements.yellow_polonium_solution={
	color: "#f2f538",
	category:"liquids",
	customColor: false,
	hidden:false,
	state: "liquid",
	canPlace: true,
	glow: false,
	behavior:behaviors.LIQUID
}
elements.those_little_heart_particles_you_get_from_feeding_animals_in_minecraft_you_know_dont_you={
	color:"#e61017",
	category:"special",
	behavior:behaviors.DGAS
}
elements.higgs_field_collapse={
	behavior: [
		"DL%38 AND CH:"void"%30|DL%38 AND CL%30|DL%38 AND CL%30",
		"DL%38 AND CL%30|DL%60|DL%30 AND CL%30",
		"DL%38 AND CL%30|DL%38 AND CL%30|DL%38 AND CL%30",
	],
	color:"#edf0f5",
	category:"weapons",
	maxSize:1,
	hidden:true,
	nocheer:true
}
elements.ferz={
	alias:"fers",
	color:"#6e6b6a",
	category:"special",
	behavior: [
		"M1%8|XX|M1%8",
		"XX|XX|XX",
		"M1%8|XX|M1%8",
	],
	hidden:false
	//slower than wazir because it looks too fast
}
elements.wazir={
	alias:"vasir",
	color:"#ada7a6",
	category:"special", 
	behavior: [
		"XX|M1%10|XX",  
		"M1%10|XX|M1%10",
		"XX|M1%10|XX",
	],
	hidden:false
}
elements.stable_sodium={
	color: ["#484849","#5d5e5f","#6b6968","#747775"],
	reactions: {
		"chlorine": { elem1:"salt", elem2:"pop" },
		"vinegar": { elem1:"sodium_acetate", elem2:[null,null,null,"hydrogen"], attr1:{"foam":15} },
		"water": { elem1:["pop","pop","pop","hydrogen"], chance:0.01, temp2:250 },
		"salt_water": { elem1:["pop","pop","pop","hydrogen"], chance:0.01, temp2:250 },
		"sugar_water": { elem1:["pop","pop","pop","hydrogen"], chance:0.01, temp2:250 },
		"dirty_water": { elem1:["pop","pop","pop","hydrogen"], chance:0.01, temp2:250 },
		"seltzer": { elem1:["pop","pop","pop","hydrogen"], chance:0.01, temp2:250 },
		"pool_water": { elem1:["pop","pop","pop","hydrogen"], chance:0.01, temp2:250 },
		"primordial_soup": { elem1:["pop","pop","pop","hydrogen"], chance:0.01, temp2:250 },
		"nut_milk": { elem1:["pop","pop","pop","hydrogen"], chance:0.01, temp2:250 },
		"acid": { elem1:"explosion" }
	},
	tempHigh: 97.794,
	category: "powders",
	state: "solid",
	density: 968,
	conduct: 0.85,
	hardness: 0.05
},

elements.acid.ignore.push("yellow_polonium_solution")
elements.acid.ignore.push("pink_polonium_solution")
elements.water.reactions.pickle = {elem1:"pickle_juice", elem2:"pickle"}
elements.salt_water.reactions.pickle = {elem1:"pickle_juice", elem2:"pickle"}
elements.sodium.reactions.potassium = {elem1:"NaK",elem2:null}
//gallium is overrated
