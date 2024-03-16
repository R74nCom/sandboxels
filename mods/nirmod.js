// helper objects for pixel
const cat = {
	TOOLS: "tools",
	LAND: "land",
	LIQUIDS: "liquids",
	LIFE: "life",
	POWDERS: "powders",
	SOLIDS: "solids",
	ENERGY: "energy",
	WEAPONS: "weapons",
	GASES: "gases",
	FOOD: "food",
	MACHINES: "machines",
	SPECIAL: "special",
	STATES: "states",
}
const state = {
	SOLID: "solid",
	LIQUID: "liquid",
	GAS: "gas",
}
const bb = {
	POWDER_OLD: behaviors.POWDER_OLD,
	POWDER: behaviors.POWDER,
	AGPOWDER: behaviors.AGPOWDER,
	LIQUID_OLD: behaviors.LIQUID_OLD,
	LIQUID: behaviors.LIQUID,
	SUPERFLUID_OLD: behaviors.SUPERFLUID_OLD,
	SUPERFLUID: behaviors.SUPERFLUID,
	LIGHTWEIGHT: behaviors.LIGHTWEIGHT,
	SLIDE: behaviors.SLIDE,
	AGLIQUID: behaviors.AGLIQUID,
	WALL: behaviors.WALL,
	UL_UR: behaviors.UL_UR,
	UL_UR_OPTIMIZED: behaviors.UL_UR_OPTIMIZED,
	GAS_OLD: behaviors.GAS_OLD,
	GAS: behaviors.GAS,
	DGAS: behaviors.DGAS,
	SUPPORT: behaviors.SUPPORT,
	SUPPORTPOWDER: behaviors.SUPPORTPOWDER,
	DELETE: behaviors.DELETE,
	FILL: behaviors.FILL,
	CLONER: behaviors.CLONER,
	STURDYPOWDER: behaviors.STURDYPOWDER,
	SELFDELETE: behaviors.SELFDELETE,
	FOAM: behaviors.FOAM,
	BUBBLE: behaviors.BUBBLE,
	STICKY: behaviors.STICKY,
	MOLTEN: behaviors.MOLTEN,
	RADPOWDER: behaviors.RADPOWDER,
	RADMOLTEN: behaviors.RADMOLTEN,
	RADLIQUID: behaviors.RADLIQUID,
	BOUNCY: behaviors.BOUNCY,
	FEEDPIXEL: behaviors.FEEDPIXEL,
	KILLPIXEL1: behaviors.KILLPIXEL1,
	KILLPIXEL2: behaviors.KILLPIXEL2,
	FLY: behaviors.FLY,
	CRAWLER: behaviors.CRAWLER,
}

class Type {
	constructor(name) {
		this.name = name;
		this.color = "#ffffff";
		this.behavior = behaviors.WALL;
		this.category = "land";
		this.state = "solid";
		this.hidden = false;
		this.density = undefined;
		this.tempHigh = undefined;
		this.stateHigh = undefined;
		this.tempLow = undefined;
		this.stateLow = undefined;
		this.temp = undefined;
		this.reactions = undefined;
		this.viscosity = undefined;
	}

	setColor(color) {
		if (typeof color == "string" && !color.startsWith("#")) color = "#" + color;
		this.color = color;
		this.colorObject = hexToRGB(color);
	}
	Add() {
		const {...elem} = this;
		elements[this.name] = elem;
	}
}

function createPowders() {
	const Ni = new Type("nirme");
	Ni.setColor("22b14c");
	Ni.behavior = bb.POWDER;
	Ni.category = cat.POWDERS;
	Ni.state = state.SOLID;
	Ni.density = 1752;
	Ni.reactions = {
		"water": { elem1: "dull_nirme", elem2: null },
		"salt_water": { elem1: "dull_nirme", elem2: null },
	}
	Ni.Add();

	const DNi = new Type("dull_nirme");
	DNi.setColor("5c916c");
	DNi.behavior = bb.STURDYPOWDER;
	DNi.category = cat.STATES;
	DNi.state = state.SOLID;
	DNi.density = 1752;
	DNi.hidden = true;
	DNi.Add();

	const Em = new Type("emerald");
	Em.setColor(["#00f49f", "#2fe094", "#b3ffd6", "#5fd9c5"]);
	Em.behavior = bb.POWDER;
	Em.category = cat.POWDERS;
	Em.state = state.SOLID;
	Em.density = 2750;
	Em.Add();
}

function createMetals() {
	const Tg = new Type("thingite");
	Tg.setColor("4f5263");
	Tg.behavior = bb.WALL;
	Tg.category = cat.SOLIDS;
	Tg.state = state.SOLID;
	Tg.density = 9408;
	Tg.tempHigh = 700;
	Tg.stateHigh = "molten_thingite";
	Tg.Add();

	const MTg = new Type("molten_thingite");
	MTg.setColor("5f9cba");
	MTg.behavior = bb.MOLTEN;
	MTg.category = cat.STATES;
	MTg.state = state.LIQUID;
	MTg.density = 9408;
	MTg.temp = 700;
	MTg.tempLow = 600;
	MTg.stateLow = "thingite";
	MTg.hidden = true;
	MTg.Add();

	const Or = new Type("orangium");
	Or.setColor("b89256");
	Or.behavior = bb.WALL;
	Or.category = cat.SOLIDS;
	Or.state = state.SOLID;
	Or.density = 12403;
	Or.tempHigh = 1600;
	Or.stateHigh = "molten_orangium";
	Or.Add();

	const MOr = new Type("molten_orangium");
	MOr.setColor("cca833");
	MOr.behavior = bb.MOLTEN;
	MOr.category = cat.STATES;
	MOr.state = state.LIQUID;
	MOr.density = 12403;
	MOr.temp = 1600;
	MOr.tempLow = 1500;
	MOr.stateLow = "orangium";
	MOr.hidden = true;
	MOr.Add();
}

createPowders();
createMetals();