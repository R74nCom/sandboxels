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
		this.conduct = undefined;
		this.burn = undefined;
		this.burning = undefined;
		this.burnTime = undefined;
		this.burnInto = undefined;
		this.breakInto = undefined;
		this.properties = undefined;
		this.maxSize = undefined;
		this.tool = undefined;
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

function createNirmics() {
	const Ni = new Type("nirme");
	Ni.setColor(["#5fcf80", "#22b14c", "#157330"]);
	Ni.behavior = bb.POWDER;
	Ni.category = cat.POWDERS;
	Ni.state = state.SOLID;
	Ni.density = 1752;
	Ni.tempHigh = 365;
	Ni.stateHigh = "nirliquid";
	Ni.reactions = {
		"water": { elem1: "dull_nirme", elem2: null },
		"salt_water": { elem1: "dull_nirme", elem2: null },
		"sugar_water": { elem1: "dull_nirme", elem2: null },
		"seltzer": { elem1: "dull_nirme", elem2: null },
		"dirty_water": { elem1: "dull_nirme", elem2: null },
		"pool_water": { elem1: "dull_nirme", elem2: null },
		"slush": { elem1: "dull_nirme", elem2: null },
		"diamond": { elem2: "emerald", chance: 0.002 },
		"sulfur": { elem1: "pop", elem2: null },
	}
	Ni.Add();

	const DNi = new Type("dull_nirme");
	DNi.setColor(["#518a62", "#487355"]);
	DNi.behavior = bb.STURDYPOWDER;
	DNi.category = cat.STATES;
	DNi.state = state.SOLID;
	DNi.density = 1752;
	DNi.tempHigh = 365;
	DNi.stateHigh = "nirliquid";
	DNi.hidden = true;
	DNi.Add();

	const Nl = new Type("nirliquid");
	Nl.setColor(["#68cc86", "#60b378", "#579c6b"]);
	Nl.behavior = bb.LIQUID;
	Nl.category = cat.LIQUIDS;
	Nl.state = state.LIQUID;
	Nl.density = 1711;
	Nl.tempLow = -17;
	Nl.stateLow = "nirme";
	Nl.Add();

	const Nr = new Type("nirmoll");
	Nr.setColor("22b14c");
	Nr.behavior = [
		"M2%2 |XX|M2%2 ",
		"M2%10|XX|M2%10",
		"M1%25|M1|M1%25",
	]
	Nr.category = cat.LIFE;
	Nr.state = state.SOLID;
	Nr.density = 40;
	Nr.tempHigh = 50;
	Nr.stateHigh = "nirme";
	Nr.tempHigh = 0;
	Nr.stateHigh = "nirme";
	Nr.breakInto = ["nirme", "nirme", "blood"];
	Nr.reactions = {
		"water": { elem1: "nirme" },
		"salt_water": { elem1: "nirme" },
		"sugar_water": { elem1: "nirme" },
		"seltzer": { elem1: "nirme" },
		"dirty_water": { elem1: "nirme" },
		"pool_water": { elem1: "nirme" },
		"slush": { elem1: "nirme" },
		"acid": { elem1: "nirme" },
		"poison": { elem1: "nirme" },
		"egg": { elem2: "nirmoll", chance: 0.001 },
	}
	Nr.Add();
}

function createMinerals() {
	const Tg = new Type("thingite");
	Tg.setColor("4f5263");
	Tg.behavior = bb.WALL;
	Tg.category = cat.SOLIDS;
	Tg.state = state.SOLID;
	Tg.density = 9408;
	Tg.tempHigh = 700;
	Tg.stateHigh = "molten_thingite";
	Tg.conduct = 0.41;
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
	Or.conduct = 0.26;
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

	const Em = new Type("emerald");
	Em.setColor(["#30e389", "#3ac98c", "#b3ffd6", "#5fd9c5"]);
	Em.behavior = bb.POWDER;
	Em.category = cat.POWDERS;
	Em.state = state.SOLID;
	Em.density = 2750;
	Em.Add();
}

function createOther() {
	const Fw = new Type("firewall");
	Fw.setColor(["#ff6b21","#ffa600","#ff4000"]);
	Fw.behavior = bb.WALL;
	Fw.category = cat.SOLIDS;
	Fw.state = state.SOLID;
	Fw.density = 100;
	Fw.temp = 600;
	Fw.tempLow = 100;
	Fw.stateLow = "wall";
	Fw.tempHigh = 7000;
	Fw.stateHigh = "plasma";
	Fw.breakInto = "fire";
	Fw.reactions = {
		"water": { elem1: "wall", chance: 0.2 },
		"steam": { elem1: "wall", chance: 0.2 },
		"carbon_dioxide": { elem1: "wall", chance: 0.2 },
		"foam": { elem1: "wall", chance: 0.2 },
		"dirty_water": { elem1: "wall", chance: 0.2 },
		"salt_water": { elem1: "wall", chance: 0.2 },
		"sugar_water": { elem1: "wall", chance: 0.2 },
		"seltzer": { elem1: "wall", chance: 0.2 },
		"pool_water": { elem1: "wall", chance: 0.2 },
	},
	Fw.Add();

	const Nz = new Type("nirmizer");
	Nz.setColor("425949");
	Nz.behavior = [
		"XX                 |CH:nirme>nirmoll%10|XX                 ",
		"CH:nirme>nirmoll%10|XX                 |CH:nirme>nirmoll%10",
		"XX                 |CH:nirme>nirmoll%10|XX                 ",
	]
	Nz.category = cat.MACHINES;
	Nz.state = state.SOLID;
	Nz.density = 1220;
	Nz.tempLow = -273;
	Nz.stateLow = "nirme";
	Nz.tempHigh = 3000;
	Nz.stateHigh = "nirliquid";
	Nz.Add();
}

function createTools() {
	const Fr = new Type("freeze");
	Fr.setColor(["#7fcef0", "#b2daeb"]);
	Fr.behavior = [
		"CO:100|CO:100|CO:100",
		"CO:100|CO:100|CO:100",
		"CO:100|CO:100|CO:100",
	],
	Fr.tool = function(pixel) {
		let value = Math.max(30, pixel.temp / 5);
		if (shiftDown) value *= 2;
		pixel.temp -= value;
		pixelTempCheck(pixel);
	}
	Fr.temp = -273;
	Fr.category = cat.ENERGY;
	Fr.insulate = true;
	Fr.canPlace = false;
	Fr.desc = "Use on pixels to heavily decrease temperature."
	Fr.Add();
}

createNirmics();
createMinerals();
createOther();
createTools();