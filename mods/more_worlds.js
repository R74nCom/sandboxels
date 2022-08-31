//TNT world

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
		[0.0, "coal", 0.4],
		[0.0, "lamp_oil"]
	]
};

runAfterLoad(function() {
	if(enabledMods.includes("mods/glenn_gases.js")) {
		worldgentypes.tnt_world.layers.unshift([0.9, "red_gas", 0.50])
	};
});

//Ice world

elements.snow_cloud_floater = {
    color: "#7e8691",
	behavior: [
		"M2|M1|M2",
		"M1%80|CH:snow_cloud%0.2|M1%80",
		"M%60|XX|M2%60",
	],
	reactions: {
		"snow_cloud_floater": { elem1: "snow_cloud", elem2: "snow_cloud", chance: 0.003 },
		"snow_cloud": { elem1: "snow_cloud", elem2: "snow_cloud", chance: 0.01 }
	},
	category:"gases",
	temp:-10,
	tempHigh:30,
	stateHigh:"rain_cloud",
	tempLow:-200,
	stateLow:"hail_cloud",
	state:"gas",
	density:0.55,
	conduct:0.01,
	movable:true,
	isGas:true
};

worldgentypes.ice = {
	name: "TNT World", //unimplemented
	layers: [
		//[0.95, "snow_cloud_floater"], //le cutting room floor has arrived
		[0.9, "snow"],
		[0.65, "ice"],
		[0.6, "gravel"],
		[0.35, "permafrost"],
		[0, "rock"]
	],
	temperature: -20
};

//Nuclear wasteland

behaviors.RAD_POWDER = [
	"XX|CR:radiation%2|XX",
	"CR:radiation%2|XX|CR:radiation%2",
	"M2|M1 AND CR:radiation%2|M2",
],
behaviors.RAD_STURDYPOWDER = [
	"XX|CR:radiation%2|XX",
	"CR:radiation%2|XX|CR:radiation%2",
	"XX|M1 AND CR:radiation%2|XX",
],
behaviors.RAD_SUPPORT = [
	"CR:radiation%1|CR:radiation%2|CR:radiation%1",
	"SP AND CR:radiation%2|XX|SP AND CR:radiation%2",
	"XX|M1 AND CR:radiation%2|XX",
],
behaviors.RAD_SUPPORTPOWDER = [
	"CR:radiation%1|CR:radiation%2|CR:radiation%1",
	"SP AND CR:radiation%2|XX|SP AND CR:radiation%2",
	"M2|M1 AND CR:radiation%2|M2",
],
behaviors.RAD_LIQUID = [
	"XX|CR:radiation%2|XX",
	"M2 AND CR:radiation%2|XX|M2 AND CR:radiation%2",
	"M1|M1 AND CR:radiation%2|M1",
],
behaviors.RAD_WALL = [
	"CR:radiation%0.7|CR:radiation%1.4|CR:radiation%0.7",
	"CR:radiation%1.4|XX%0000000000000|CR:radiation%1.4",
	"CR:radiation%0.7|CR:radiation%1.4|CR:radiation%0.7",
],
behaviors.RAD_GAS = [
	"M2 AND CR:radiation%1|M1 AND CR:radiation%2|M2 AND CR:radiation%1",
	"M1 AND CR:radiation%2|XX AND CR:radiation%2|M1 AND CR:radiation%2",
	"M2 AND CR:radiation%1|M1 AND CR:radiation%2|M2 AND CR:radiation%1",
],
behaviors.RAD_MOLTEN = [
	"XX|CR:radiation%2.5 AND CR:fire%2.5|XX",
	"M2 AND CR:radiation%1|XX|M2 AND CR:radiation%1",
	"M1|M1 AND CR:radiation%1|M1",
],

console.log(behaviors.RAD_POWDER) //forcing it to acknowledge the behaviors i just added instead of giving me "undefined"

elements.irradiated_dirt = {
	color: ["#70762b","#4c5c21","#50571a","#4c6b1e"],
	behavior: behaviors.RAD_POWDER,
	tempHigh:1200,
	stateHigh: "irradiated_molten_dirt",
	reactions: {
		"dirt": { "elem1":"dirt", "elem2":"irradiated_dirt", "chance":0.0005, "oneway":true },
	},
	tempLow: -50,
	stateLow: "irradiated_permafrost",
	category: "Irradiated",
	state: "solid",
	density: 1220,
};

elements.irradiated_molten_dirt = {
    "behavior": behaviors.RAD_MOLTEN,
    "hidden": true,
    "state": "liquid",
    "category": "states",
    "color": ["#e09315", "#e07615", "#e05800", "#987310", "#985c10", "#984500", "#a06c0d", "#a0570d", "#a04100", "#98850f", "#986b0f", "#985000"],
    "temp": 1250,
    "tempLow": 1100,
    "stateLow": "irradiated_dirt",
    "density": 1098,
    "viscosity": 10000
}

elements.molten_irradiated_dirt = {
	behavior: behaviors.RAD_MOLTEN
}

elements.irradiated_glass = {
	color: ["#597a58","#719171"],
	colorOn: ["#6dab67","#88b567"],
	behavior: behaviors.RAD_WALL,
	tempHigh: 1500,
	category: "solids",
	state: "solid",
	density: 2500,
	breakInto: "irradiated_glass_shard",
	conduct: 0.01,
};

elements.molten_irradiated_glass = {
	behavior: behaviors.RAD_MOLTEN
};

elements.irradiated_glass_shard = {
	color: ["#597a58","#719171", "#628263"],
	colorOn: ["#6dab67","#88b567", "#7bad6f"],
	behavior: behaviors.RAD_POWDER,
	tempHigh: 1500,
	stateHigh: "molten_irradiated_glass",
	category: "powders",
	state: "solid",
	density: 2500,
	conduct: 0.01,
};

elements.irradiated_sand = {
	color: "#cbdb7b",
	behavior: behaviors.RAD_POWDER,
	tempHigh: 1700,
	stateHigh: "molten_irradiated_glass",
	category: "Irradiated",
	state: "solid",
	density: 1602
};

elements.irradiated_mud = {
	color: "#3c401c",
	behavior: behaviors.RAD_STURDYPOWDER,
	reactions: {
		"irradiated_dirt": { "elem1":"irradiated_dirt", "elem2":"irradiated_mud", "chance":0.0005, "oneway":true },
		"irradiated_sand": { "elem1":"irradiated_dirt", "elem2":"irradiated_wet_sand", "chance":0.0005, "oneway":true },
		"sand": { "elem1":"irradiated_dirt", "elem2":"irradiated_wet_sand", "chance":0.0005, "oneway":true },
		"dirt": { "elem1":"irradiated_dirt", "elem2":"irradiated_mud", "chance":0.0005, "oneway":true },
	},
	tempHigh: 100,
	stateHigh: "irradiated_mudstone",
	tempLow: -50,
	stateLow: "irradiated_permafrost",
	category: "Irradiated",
	state: "solid",
	density: 1730,
	stain: 0.02,
};

elements.irradiated_wet_sand = {
	color: ["#848c3a","#969e4c"],
	behavior: behaviors.RAD_STURDYPOWDER,
	reactions: {
		"irradiated_sand": { "elem1":"irradiated_sand", "elem2":"irradiated_wet_sand", "chance":0.0005, "oneway":true },
		"irradiated_dirt": { "elem1":"irradiated_sand", "elem2":"irradiated_mud", "chance":0.0005, "oneway":true },
		"sand": { "elem1":"irradiated_sand", "elem2":"irradiated_wet_sand", "chance":0.0005, "oneway":true },
		"dirt": { "elem1":"irradiated_sand", "elem2":"irradiated_mud", "chance":0.0005, "oneway":true },
	},
	tempHigh: 100,
	stateHigh: "irradiated_packed_sand",
	category: "Irradiated",
	state: "solid",
	density: 1905,
};

var namelessArray = ["dirt","sand","mud","wet_sand"];
for(i = 0; i < namelessArray.length; i++) {
	var elementt = namelessArray[i];
	if(!elements[elementt].reactions) {
		elements[elementt].reactions = {};
	};
};

elements.water.reactions.radiation = { elem1: "irradiated_water", elem2: null, chance:0.25 },
elements.radiation.reactions.water = { elem2: "irradiated_water", elem1: null, chance:0.25 },
elements.dirt.reactions.radiation = { elem1: "irradiated_dirt", elem2: null, chance:0.25 },
elements.radiation.reactions.dirt = { elem2: "irradiated_dirt", elem1: null, chance:0.25 },
elements.sand.reactions.radiation = { elem1: "irradiated_sand", elem2: null, chance:0.25 },
elements.radiation.reactions.sand = { elem2: "irradiated_sand", elem1: null, chance:0.25 },
elements.mud.reactions.radiation = { elem1: "irradiated_mud", elem2: null, chance:0.25 },
elements.radiation.reactions.mud = { elem2: "irradiated_mud", elem1: null, chance:0.25 },
elements.wet_sand.reactions.radiation = { elem1: "irradiated_wet_sand", elem2: null, chance:0.25 },
elements.radiation.reactions.wet_sand = { elem2: "irradiated_wet_sand", elem1: null, chance:0.25 },

elements.irradiated_water = {
	color: "#85cf57",
	behavior: behaviors.RAD_LIQUID,
	tempHigh: 100,
	stateHigh: ["rad_steam","rad_steam","fallout"],
	tempLow: -5,
	stateLow: "irradiated_ice",
	category: "Irradiated",
	heatCapacity: 4.184,
	reactions: {
		"water": { elem1: "water", elem2: "irradiated_water", chance:0.05 }, //swap
		"dirt": { // React with (water reacts with dirt to make mud)
			"elem1": null, // First element transforms into; in this case, water deletes itself
			"elem2": "irradiated_dirt", // Second element transforms into; in this case, dirt turns to mud
		},
		"sand": { "elem1": null, "elem2": "irradiated_wet_sand", },
		"rat": { "elem2": "rotten_meat", chance:0.005 },
		"plague": { "elem2": null, chance: 0.3, },
		//"quicklime": { "elem1": null, "elem2": "slaked_lime", },
		"rock": { "elem2": "irradiated_wet_sand", "chance": 0.00035 },
		//"ruins": { "elem2": "rock", "chance": 0.00035 },
		"mudstone": { "elem2": "irradiated_mud", "chance": 0.00035 },
		"irradiated_mudstone": { "elem2": "irradiated_mud", "chance": 0.00035 },
		"packed_sand": { "elem2": "irradiated_wet_sand", "chance": 0.00035 },
		"irradiated_packed_sand": { "elem2": "irradiated_wet_sand", "chance": 0.00035 },
		"fly": { "elem2":"dead_bug", "chance":0.1, "oneway":true },
		"firefly": { "elem2":"dead_bug", "chance":0.1, "oneway":true },
		"bee": { "elem2":"dead_bug", "chance":0.05, "oneway":true },
		"stink_bug": { "elem2":"dead_bug", "chance":0.1, "oneway":true },
	},
	state: "liquid",
	density: 997,
	conduct: 0.03,
	stain: 0.02,
}

elements.rad_steam.behavior = behaviors.RAD_GAS;
elements.rad_steam.stateLow = "irradiated_water";
elements.rad_cloud.behavior =  [
	"XX|XX|XX",
	"XX|CH:fallout,radiation,irradiated_water%0.025|M1%2.5 AND BO",
	"CR:radiation%0.05|CR:radiation%0.05|CR:radiation%0.05",
];
elements.rad_cloud.tempLow = 0;
elements.rad_cloud.stateLow = "rad_snowcloud";
elements.fallout.behavior = behaviors.RAD_POWDER;

elements.irradiated_permafrost = {
	color: ["#51613d","#495234","#3b4a30","#4a4f35"],
	behavior: behaviors.RAD_SUPPORT,
	temp: -50,
	tempHigh: 10,
	stateHigh: "irradiated_mudstone",
	category: "Irradiated",
	state: "solid",
	density: 700,
};

elements.irradiated_mudstone = {
	color: "#4f5e25",
	behavior: behaviors.RAD_SUPPORT,
	tempHigh:1200,
	stateHigh: "molten_irradiated_dirt",
	tempLow: -50,
	stateLow: "irradiated_permafrost",
	category: "Irradiated",
	state: "solid",
	density: 1250,
	breakInto: "irradiated_dirt",
};

elements.irradiated_packed_sand = {
	color: "#79945c",
	behavior: behaviors.RAD_SUPPORT,
	tempHigh: 1700,
	stateHigh: "molten_irradiated_glass",
	category: "Irradiated",
	state: "solid",
	density: 1682,
	breakInto: "irradiated_sand",
};

elements.irradiated_ice = {
	color: "#b7e0b4",
	behavior: behaviors.RAD_WALL,
	temp: 0,
	tempHigh: 5,
	stateHigh: "irradiated_water",
	category: "solids",
	state: "solid",
	density: 917,
	breakInto: "irradiated_snow",
};

elements.irradiated_snow = {
	color: "#d5f2d3",
	behavior: behaviors.RAD_POWDER,
	temp: 0,
	tempHigh: 5,
	tempLow: -100,
	stateLow: "irradiated_packed_snow",
	stateHigh: "irradiated_water",
	category: "Irradiated",
	state: "solid",
	density: 100,
};

elements.irradiated_packed_snow = {
	color: "#a7d4a3",
	behavior: behaviors.RAD_SUPPORTPOWDER,
	temp: 0,
	tempHigh: 20,
	tempLow: -200,
	stateLow: "irradiated_ice",
	stateHigh: "irradiated_water",
	category: "Irradiated",
	state: "solid",
	density: 400,
	hidden: true,
};

elements.rad_snowcloud = {
	color: ["#2d6e31","#416e21"],
	behavior: [
		"XX|XX|XX",
		"XX|CH:fallout,radiation,irradiated_snow%0.025|M1%2.5 AND BO",
		"CR:radiation%0.05|CR:radiation%0.05|CR:radiation%0.05",
	],
	category:"Irradiated",
	hidden: true,
	state: "gas",
	density: 0.5,
	ignoreAir: true,
	temp: -20,
	tempHigh: 0,
	stateHigh: "rad_cloud",
};

elements.rad_snowcloud_floater = {
	color: ["#2d6e31","#416e21"],
	behavior: [
		"M2|M1|M2",
		"M1%80|CH:rad_snowcloud_%0.2|M1%80",
		"M%60|XX|M2%60",
	],
	reactions: {
		"rad_snowcloud_floater": { elem1: "rad_snowcloud", elem2: "rad_snowcloud", chance: 0.003 },
		"rad_snowcloud": { elem1: "rad_snowcloud", elem2: "rad_snowcloud", chance: 0.01 }
	},
	category:"Irradiated",
	hidden: true,
	state: "gas",
	density: 0.5,
	temp: -20,
	tempHigh: 0,
	stateHigh: "rad_cloud",
};

elements.irradiated_rock = {
	color: ["#768063","#444f3f","#7a9476"],
	behavior: behaviors.RAD_POWDER,
	tempHigh: 950,
	stateHigh: "irradiated_magma",
	category: "Irradiated",
	state: "solid",
	density: 2550,
	hardness: 0.5,
	breakInto: ["sand","gravel"],
};

elements.irradiated_gravel = {
	color: ["#d1e3c8","#a6b090","#657360","#4d523f"],
	behavior: behaviors.RAD_POWDER,
	category: "Irradiated",
	tempHigh: 950,
	stateHigh: "irradiated_magma",
	state: "solid",
	density: 1680,
	hardness: 0.2,
	breakInto: "irradiated_sand",
};

elements.irradiated_basalt = {
	color: ["#262e20","#23331f","#3f4235"],
	behavior: behaviors.RAD_STURDYPOWDER,
	tempHigh: 1262.5,
	stateHigh: "irradiated_magma",
	category: "Irradiated",
	state: "solid",
	density: 3000,
	hardness: 0.65,
	breakInto: "irradiated_gravel",
};

elements.irradiated_magma = {
	color: ["#ff9100","#ffae00","#ff8400"],
	behavior: behaviors.RAD_MOLTEN,
	reactions: {
		"ice": { "elem1": "irradiated_basalt" },
		"irradiated_ice": { "elem1": "irradiated_basalt" },
		"magma": { "elem1":"magma", "elem2":"irradiated_magma", "chance":0.0005, "oneway":true },
	},
	temp: 1500,
	tempLow: 850,
	stateLow: ["irradiated_basalt","irradiated_basalt","irradiated_basalt","irradiated_rock"],
	viscosity: 10000,
	category: "Irradiated",
	state: "liquid",
	density: 2725,
};

if(enabledMods.includes("mods/some_tf_liquids.js")) {
	elements.irradiated_basalt_gravel = {
		color: ["#394d37", "#3b452f", "#3f452a", "#2d3d2c"],
		behavior: behaviors.RAD_POWDER,
		tempHigh: 1262.5,
		stateHigh: "irradiated_magma",
		category: "Irradiated",
		state: "solid",
		density: 1975,
		hardness: 0.26,
	}
	elements.irradiated_basalt.breakInto = "irradiated_basalt_gravel";
};

worldgentypes.nuclear_wasteland = {
	layers: [
		[0.9, "smoke", 0.5],
		[0.9, "rad_snowcloud_floater", 0.75],
		[0.82, "fallout", 0.4],
		[0.7, "dead_plant", 0.12],
		[0.55, "irradiated_dirt"],
		[0.45, "irradiated_rock"],
		[0.35, "irradiated_rock", 0.5],
		[0.3, "irradiated_gravel", 0.5],
		[0.05, "rock"],
		[0, "basalt"],
	],
	temperature: -5 //nuclear winter
};
