/*
herbs
heat into steamed herb
smash into tea powder
tea powder + hot water = colored tea
*/

elements.herb.tempHigh = 100;
elements.herb.stateHigh = ["steamed_herb","steamed_herb","steam",null];

if (!elements.herb.reactions) {
    elements.herb.reactions = {};
}
elements.herb.reactions.steam = { elem1:"steamed_herb" }

elements.steamed_herb = {
	color: ["#5a790c","#698f1f","#849d33","#b3c74d"],
	reactions: {
		"water": { elem2:"tea", tempMin:80 },
		"salt_water": { elem2:"tea", tempMin:80 },
		"sugar_water": { elem2:"tea", tempMin:80 },
		"seltzer": { elem2:"tea", tempMin:80 },
		"stench": { elem2:null, chance:0.25 },
		"steam": { elem2:"fragrance", chance:0.1 },
		"flea": { elem2:null, chance:0.01 },
		"termite": { elem2:null, chance:0.01 },
		"fly": { elem2:null, chance:0.01 },
		"ant": { elem2:null, chance:0.01 },
		"stink_bug": { elem2:null, chance:0.01 }
	},
	behavior: behaviors.POWDER,
	tempHigh: 300,
	stateHigh: ["fire","smoke","smoke","smoke","ash"],
	tempLow: -2,
	stateLow: "frozen_plant",
	burn:10,
	burnTime:300,
	burnInto: ["fire","smoke","smoke","smoke","smoke","smoke","smoke","fragrance"],
	category:"food",
	state: "solid",
	density: 1300,
	isFood: true,
    hidden: true,
    breakInto: ["tea_powder",null]
};

elements.tea_powder = {
    color: ["#C4CD3F","#B7C134","#97A328"],
    grain: 2,
	reactions: {
		"water": { elem2:"tea", tempMin:80, elem1:null },
		"salt_water": { elem2:"tea", tempMin:80, elem1:null },
		"sugar_water": { elem2:"tea", tempMin:80, elem1:null },
		"seltzer": { elem2:"tea", tempMin:80, elem1:null },
		"tea": { tempMin:80, elem1:null, chance:0.01 },
		"stench": { elem2:null, chance:0.25 },
		"steam": { elem2:"fragrance", chance:0.1 },
		"flea": { elem2:null, chance:0.01 },
		"termite": { elem2:null, chance:0.01 },
		"fly": { elem2:null, chance:0.01 },
		"ant": { elem2:null, chance:0.01 },
		"stink_bug": { elem2:null, chance:0.01 }
	},
	behavior: behaviors.POWDER,
	tempHigh: 300,
	stateHigh: ["fire","smoke","smoke","smoke","ash"],
	burn:10,
	burnTime:300,
	burnInto: ["fire","smoke","smoke","smoke","smoke","smoke","smoke","fragrance"],
	category:"food",
	state: "solid",
	density: 1200,
	isFood: true,
    hidden: true
}
elements.water.reactions.tea_powder = { elem1:"tea", chance:0.0002 }

elements.pumpkin.breakInto = ["pumpkin_seed","pumpkin_mash","pumpkin_mash","pumpkin_mash",null];

elements.pumpkin_mash = {
	color: ["#DF7E06","#eba100"],
	behavior: behaviors.STURDYPOWDER,
	tempHigh: 125,
	stateHigh: ["pumpkin_spice","pumpkin_spice",null],
	category: "food",
	state: "liquid",
	density: 490.3,
	isFood: true,
	hidden: true,
}

elements.pumpkin_seed.tempHigh = 125;
elements.pumpkin_seed.stateHigh = ["pumpkin_spice","pumpkin_spice",null];

elements.pumpkin_spice = {
	color: "#8d4f03",
	grain: 1.5,
	behavior: behaviors.POWDER,
	tempHigh: 400,
	stateHigh: ["smoke","smoke","smoke","smoke","ash"],
	category: "food",
	state: "solid",
	density: 490.3,
	isFood: true,
	hidden: true,
}

elements.coffee.reactions.pumpkin_spice = { elem2:null, color1:"#6A2F03", chance:0.005 };
elements.coffee.reactions.pumpkin_mash = { elem2:null, color1:"#6A2F03", chance:0.005 };

elements.apple = {
	color: ["#b22424","#f5c517","#66b447"],
	grain: 2,
	behavior: behaviors.POWDER,
	// singleColor: true,
	category: "food",
	state: "solid",
	density: 750,
	isFood: true,
	breakInto: "juice",
	tempHigh: 175,
	stateHigh: ["applesauce",null]
}

elements.applesauce = {
	color: "#E7C45A",
	behavior: behaviors.LIQUID,
	viscosity: 50000,
	tempHigh: 400,
	stateHigh: "smoke",
	category: "food",
	state: "liquid",
	density: 750,
	isFood: true,
	hidden: true,
}