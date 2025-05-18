console.log("Welcome!")

elements.electron = {
	color: "#faffa1",
	behavior: behaviors.GAS,
	category: "energy",
	state: "gas",
	reactions: {
	"ash": { "elem1": "acid_gas" },
	"battery": { "elem1": "bomb" },
	"greek_fire": { elem1: "fire" },
	"wire": { "elem1": "steel" },
	"vine": { "elem1": "plant" },
	"wood": { "elem1": "acid_gas" },
	"glass": { "elem1": "potassium" },
	"stained_glass": { "elem1": "potassium" },
	}
};

elements.iodum = {
	color: ["#4d4218","#ffca00"],
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "solid",
	tempHigh: 94.1,
	stateHigh: "iodum_gas",
	reactions: {
	"concrete": { "elem1": "ash", "chance": 0.6 },
	}
};

elements.iodum_gas = {
	color: ["#4d4218","#ffca00"],
	behavior: behaviors.GAS,
	category: "states",
	state: "gas",
	tempLow: 21,
	stateLow: "iodum",
	reactions: {
	"ash": { "elem1": "steam" },
	"cloud": { "elem1": "ozone" },
	"rain_cloud": { "elem1": "oxygen" },
	}
};

elements.salvador_powder = {
	color: ["#484742","#3b3b3b","#cfccc0","#56544d","#ffe994"],
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
	burn: 5,
	burnTime: 30,
	burnInto: ["bless"],
	tempHigh: 53.6,
	stateHigh: "salvador_water",
	tempLow: -7,
	stateLow: "god_ray",
	glow: true,
	reactions: {
	"rad_cloud": { "elem1": "bless" },
	"cloud": { "elem1": "ozone", "chance": 0.2 },
	"radiation": { "elem1": "water" },
	"dirt": { "elem1": "mud" },
	"basalt": { "elem1": "gravel", "chance": 0.4 },
	}
};

elements.salvador_water = {
	color: ["#2986cc","#16537e","#0086ff","#9da0f7","#54aeff"],
	behavior: behaviors.SUPERFLUID,
	category: "liquids",
	state: "solid",
	tempLow: 53.5,
	stateLow: "salvador_powder",
	density: 26,
	glow: true,
	reactions: {
	"rad_cloud": { "elem1": "bless" },
	"cloud": { "elem1": "ozone", "chance": 0.2 },
	"radiation": { "elem1": "water" },
	"dirt": { "elem1": "mud" },
	"basalt": { "elem1": "gravel", "chance": 0.4 },
	"plague": { "elem1": "water" },
	}
};
