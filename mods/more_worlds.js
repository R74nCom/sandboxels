elements.oil_cloud = {
    color: "#8c4331",
	behavior: [
		"XX|XX|XX",
		"XX|CH:oil%0.05|M1%2.5 AND BO",
		"XX|XX|XX",
	],
    category:"gases",
    temp: 30,
    state: "gas",
    density: 0.5,
	burn: 60,
	burnTime: 15,
	burnInto: "explosion", //atomization moment
    ignoreAir: true,
    stain: 0.02,
};

elements.oil_cloud_floater = {
    color: "#8c4331",
	behavior: [
		"M2|M1|M2",
		"M1%80|CH:oil_cloud%0.2|M1%80",
		"M%60|XX|M2%60",
	],
	reactions: {
		"oil_cloud_floater": { elem1: "oil_cloud", elem2: "oil_cloud", chance: 0.003 },
		"oil_cloud": { elem1: "oil_cloud", elem2: "oil_cloud", chance: 0.01 }
	},
    category:"gases",
    temp: 30, //otherwise identical
    state: "gas",
    density: 0.5,
	burn: 60,
	burnTime: 15,
	burnInto: "explosion", //atomization moment
    ignoreAir: true,
    stain: 0.02,
};

worldgentypes.tnt_world = {
	name: "TNT World", //unimplemented
	layers: [
		[0.9, "oil_cloud_floater"],
		[0.65, "coal", 0.1],
		[0.65, "nitroglycerin"],
		[0.55, "nitroglycerin", 0.5],
		[0.2, "coal", 0.2],
		[0.2, "tnt"],
		[0.05, "coal", 0.3],
		[0.05, "c4"],
		[0, "coal", 0.4],
		[0, "lamp_oil"]
	]
};