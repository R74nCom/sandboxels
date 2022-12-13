elements.fwibblen = {
	color: ["#73F092", "#EB7373", "#EDBC7B"],
	behavior: [
		"XX|M2|M1",
		"XX|FX%2|BO",
		"XX|XX|M1",
	],
	reactions: {
		nickel: { elem2: ["fwibblen",null] },
		nickel_scrap: { elem2: ["fwibblen",null] },
	},
	tempHigh: 1100,
	stateHigh: "dead_fwibblen",
	category:"life",
	state: "solid",
	density: 1500,
	conduct: 0.4,
}

elements.dead_fwibblen = {
	color: ["#729E7D", "#B58484", "#C4B299"],
	behavior: behaviors.POWDER,
	tempHigh: 1455,
	stateHigh: ["molten_nickel","molten_nickel","molten_nickel","smoke"],
	category:"life",
	hidden: true,
	state: "solid",
	density: 1400,
	conduct: 0.4,
}

elements.meffwibblen = {
	color: ["#5CE697", "#F05B60", "#EB9560"],
	behavior: [
		"XX|M2|M1",
		"XX|FX%2|BO",
		"XX|XX|M1",
	],
	reactions: {
		fwibblen: { elem2: ["meffwibblen",null] },
		dead_fwibblen: { elem2: ["meffwibblen",null] },
	},
	tempHigh: 1150,
	stateHigh: "dead_meffwibblen",
	category:"life",
	state: "solid",
	density: 1800,
	conduct: 0.44,
}

elements.dead_meffwibblen = {
	color: ["#659E7D", "#B37073", "#B08F7B"],
	behavior: behaviors.POWDER,
	tempHigh: 1455,
	stateHigh: ["molten_nickel","molten_nickel","molten_nickel","molten_nickel","smoke"],
	category:"life",
	hidden: true,
	state: "solid",
	density: 1800,
	conduct: 0.44,
}

//Debug world

/*worldgentypes.nickel = {
	layers: [
		[0, "nickel"],
	]
};*/
