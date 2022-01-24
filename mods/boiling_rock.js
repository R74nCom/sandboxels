elements.vaporized_rock = {
    color: ["#ffc94a", "#fcd34c", "#ffae36"],
    behavior: [
        "M2|M1|M2",
		"M1|XX|M1",
		"M2|M1|M2",
	],
	reactions: {
		"vaporized_rock": { "elem1": null, "elem2": "lava_cloud", "chance":0.3, "y":[0,15] },
		"lava_cloud": { "elem1": "lava_cloud", "chance":0.4, "y":[0,15] },
	},
    density: 2452, //just magma density * 0.9
    temp: 3100,
    tempLow: 3000,
    stateLow: "magma",
    category: "gases",
    state: "gas",
    hidden: true,
},
elements.magma.tempHigh = 3000
elements.magma.stateHigh = "vaporized_rock"
elements.lava_cloud = {
    color: ["#b57b2a", "#d47b15", "#cf7317", "#db830f"],
    behavior: [
        "XX|XX|XX",
		"M1%7|CH:magma%0.05|M1%7",
		"XX|XX|XX",
	],
    density: 2,
    temp: 3000,
    tempLow: 850,
    stateLow: "rock_cloud",
    category: "gases",
    state: "gas",
},
elements.rock_cloud = {
    color: ["#ba8843", "#c28a4a", "#bf8245", "#c4904b"],
    behavior: [
        "XX|XX|XX",
		"M1%7|CH:basalt,basalt,basalt,rock%0.05|M1%7",
		"XX|XX|XX",
	],
    density: 2,
    temp: 800,
    tempHigh: 3000,
    stateHigh: "lava_cloud",
    category: "gases",
    state: "gas",
}

runAfterLoad(function() {
    if(enabledMods.includes("mods/fey_and_more.js")) {
		//mistake
			elements.concoction.reactions.vaporized_rock = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.lava_cloud = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.rock_cloud = { "elem1": "mistake", "elem2": null },
	};
}
