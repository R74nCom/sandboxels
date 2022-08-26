elements.dry_dirt = {
	color: ["#a88e5e","#8f7950","#8a7045","#9e804c"],
	behavior: [
		"XX|SW:dirt%3 AND SW:mud%6|XX",
		"XX|XX|XX",
		"M2|M1|M2",
	],
	tempHigh:1200,
	stateHigh: "molten_dirt",
	tempLow: -50,
	stateLow: "dry_permafrost",
	category:"land",
	state: "solid",
	density: 1100,
},

elements.molten_dirt = { //added manually because the change to dirt will prevent molten_dirt from being auto-generated
    "behavior": behaviors.MOLTEN,
    "hidden": true,
    "state": "liquid",
    "category": "states",
    "color": ["#EC6A15", "#EC5515", "#EC3F00", "#B85210", "#B84210", "#B83100", "#AE4B0D", "#AE3C0D", "#AE2D00", "#D65A0F", "#D6480F", "#D63600"],
    "temp": 1200,
    "tempLow": 1100,
    "stateLow": "dry_dirt",
    "density": 1098,
    "viscosity": 10000
}

if(enabledMods.includes("mods/boiling_rock.js")) {
	elements.molten_dirt.tempHigh = 3000;
	elements.molten_dirt.stateHigh = "vaporized_rock";
};
elements.dry_permafrost = {
	color: ["#5B7870","#535D51","#52746A","#5A7A6F"],
	behavior: behaviors.POWDER, //not enough water for cementing
	temp: -50,
	tempHigh: 10,
	stateHigh: "dry_dirt",
	category: "land",
	state: "solid",
	density: 1200,
}

elements.dirt.tempHigh = 110;
elements.dirt.stateHigh = "dry_dirt";

elements.water.reactions.dry_dirt = { elem1: null, elem2: "dirt", chance: 0.1 }

if(!elements.mud.reactions) {
	elements.mud.reactions = {};
};
elements.mud.reactions.dry_dirt = { elem1: "dirt", elem2: "dirt", chance: 0.06 }
