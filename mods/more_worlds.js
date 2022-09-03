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
	stateHigh: "molten_irradiated_dirt",
	reactions: {
		"dirt": { "elem1":"dirt", "elem2":"irradiated_dirt", "chance":0.0005, "oneway":true },
	},
	tempLow: -50,
	stateLow: "irradiated_permafrost",
	category: "Irradiated",
	state: "solid",
	density: 1220,
};

elements.molten_irradiated_dirt = {
    "behavior": behaviors.RAD_MOLTEN,
    "hidden": true,
    "state": "liquid",
    "category": "Irradiated",
    "color": ["#e09315", "#e07615", "#e05800", "#987310", "#985c10", "#984500", "#a06c0d", "#a0570d", "#a04100", "#98850f", "#986b0f", "#985000"],
    "temp": 1250,
    "tempLow": 1100,
    "stateLow": "irradiated_dirt",
    "density": 1098,
    "viscosity": 10000
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
	behavior: behaviors.RAD_MOLTEN,
	category: "Irradiated",
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
elements.rad_cloud.stateLow = "rad_snow_cloud";
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

elements.rad_snow_cloud = {
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

elements.rad_snow_cloud_floater = {
	color: ["#2d6e31","#416e21"],
	behavior: [
		"M2|M1|M2",
		"M1%80|CH:rad_snow_cloud_%0.2|M1%80",
		"M%60|XX|M2%60",
	],
	reactions: {
		"rad_snow_cloud_floater": { elem1: "rad_snow_cloud", elem2: "rad_snow_cloud", chance: 0.003 },
		"rad_snow_cloud": { elem1: "rad_snow_cloud", elem2: "rad_snow_cloud", chance: 0.01 }
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

irradiatedObject = {
	dirt:					"irradiated_dirt",
	molten_dirt:			"molten_irradiated_dirt",
	glass:					"irradiated_glass",
	irradiated_glass:		"molten_irradiated_glass",
	glass_shard:			"irradiated_glass_shard",
	sand:					"irradiated_sand",
	mud:					"irradiated_mud",
	wet_sand:				"irradiated_wet_sand",
	water:					"irradiated_water",
	permafrost:				"irradiated_permafrost",
	mudstone:				"irradiated_mudstone",
	packed_sand:			"irradiated_packed_sand",
	ice:					"irradiated_ice",
	snow:					"irradiated_snow",
	packed_snow:			"irradiated_packed_snow",
	snow_cloud:				"rad_snow_cloud",
	snow_cloud_floater:		"rad_snow_cloud_floater",
	rock:					"irradiated_rock",
	gravel:					"irradiated_gravel",
	basalt:					"irradiated_basalt",
	magma:					"irradiated_magma"
};

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
//getKeyByValue code by UncleLaz on StackOverflow: https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value"

	//just for fun

elements.super_irradiator = {
	color: "#66ee33",
	tick: function(pixel) {
		var twentiethOfTemp = pixel.temp / 20;
		var roundOf20th = Math.round(twentiethOfTemp);
		var boundedR20 = Math.max(1,Math.min(roundOf20th,11));
		var radius1 = (-1 * boundedR20);
		var radius2 = (boundedR20 + 1);
		for (let i = radius1; i < radius2; i++) {
			for (let j = radius1; j < radius2; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					var destPixel = pixelMap[pixel.x+j][pixel.y+i];
					var elementToCheck = destPixel.element;
					if(irradiatedObject[elementToCheck]) {
						changePixel(destPixel,irradiatedObject[elementToCheck]);
					};
				};
			};
		};
	},
	category:"machines",
	insulate: true,
	state: "solid",
};

elements.super_deirradiator = {
	color: "#dd33ee",
	tick: function(pixel) {
		var twentiethOfTemp = pixel.temp / 20;
		var roundOf20th = Math.round(twentiethOfTemp);
		var boundedR20 = Math.max(1,Math.min(roundOf20th,11));
		var radius1 = (-1 * boundedR20);
		var radius2 = (boundedR20 + 1);
		for (let i = radius1; i < radius2; i++) {
			for (let j = radius1; j < radius2; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					var destPixel = pixelMap[pixel.x+j][pixel.y+i];
					var elementToCheck = destPixel.element;
					if(getKeyByValue(irradiatedObject,elementToCheck)) {
						changePixel(destPixel,getKeyByValue(irradiatedObject,elementToCheck));
					};
				};
			};
		};
	},
	category:"machines",
	insulate: true,
	state: "solid",
};

elements.liquid_irradium = {
	color: "#5499FF",
	behavior: behaviors.RAD_LIQUID,
	tick: function(pixel) {
        for(i = 0; i < adjacentCoords.length; i++) {
            if(!isEmpty(pixel.x+adjacentCoords[i][0],pixel.y+adjacentCoords[i][1],true)) {
				var destPixel = pixelMap[pixel.x+adjacentCoords[i][0]][pixel.y+adjacentCoords[i][1]];
				var elementToCheck = destPixel.element;
				if(irradiatedObject[elementToCheck]) {
					changePixel(destPixel,irradiatedObject[elementToCheck]);
				};
            }
        }
	},
	//Becomes rainbow sand by water or poison, as well as by protocite, or bio-ooze
	//Becomes sulfuric acid on contact with it
	//Becomes corrupt slime by elder fluid
	//Converts black tar and organic soup into itself
	//Turns either grav liquid into aether dust, as well as liquid crystal
	//Turns blood into bloodstone
	//Turns blue slime into black slime
	//Made by {mercury or bio-ooze} and protocite
	category:"liquids",
	state: "liquid",
	density: 18180,	//Cherry-picked from a Tumblr headcanon
					//https://omniblog-of-starbound.tumblr.com/post/188424072728/starbound-element-headcannon-modded-metals
	viscosity: 80.1,	//probably misinterpreting tickDelta, and w/o the game assets, I can't compare against water, so this is in relation to H2SO4 scaled to its density in cP and under the assumption that water visc = 1
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
		[0.9, "rad_snow_cloud_floater", 0.75],
		[0.82, "fallout", 0.4],
		[0.7, "liquid_irradium", 0.05],
		[0.7, "dead_plant", 0.12],
		[0.55, "irradiated_dirt"],
		[0.45, "irradiated_rock"],
		[0.25, "uranium", 0.4],
		[0.35, "irradiated_rock", 0.5],
		[0.3, "irradiated_gravel", 0.5],
		[0.2, "uranium", 0.2],
		[0.05, "rock"],
		[0, "basalt"],
	],
	temperature: -5 //nuclear winter
};


enabledMods.includes("mods/the_ground.js") ? waterIrradiationExclusionArray = ["irradiated_water", "irradiated_wet_sand"]: waterIrradiationExclusionArray = ["irradiated_water"]

filteredWaterIrradiationArray = Object.keys(elements).filter(function(e) {
	return elements[e].category === "Irradiated" && (!waterIrradiationExclusionArray.includes(e));
});

for(i = 0; i < filteredWaterIrradiationArray.length; i++) {
	elements.water.reactions[filteredWaterIrradiationArray[i]] = { "elem1":"irradiated_water", chance: 0.01 }
};

//Dark world

worldgentypes.dark = {
	layers: [
		[0.8, "carbon_dioxide"],
		[0.65, "ink"],
		[0.5, "charcoal"],
		[0, "basalt"]
	]
};

//Requires the_ground.js)

if(enabledMods.includes("mods/the_ground.js")) {

	//Money world
	
	worldgentypes.money = {
		layers: [
			[0.9, "emerald"],
			[0.6, "diamond"],
			[0.3, "gold_coin"],
			[0.1, "ruby", 1/3],
			[0.1, "amethyst", 1/2],
			[0.1, "sapphire"],
			[-0.1, "pearl", 0.4],
			[-0.1, "onyx"]
		]
	};
	
	//Irradiated Desert

		runAfterLoad(function() {

			//Elements from which simplified lithification can spread

				sandstoneLithificationElements.push("irradiated_sand_sediment");
				sandstoneLithificationElements.push("irradiated_sandstone");

			//Water reaction to pick up the fine material (this is very simplified)

				elements.water.reactions.irradiated_wet_sand = {
					"elem1": "irradiated_sandy_water",
					"elem2": ["irradiated_wet_sand","irradiated_wet_sand","irradiated_wet_sand","irradiated_wet_sand","irradiated_wet_sand",null],
					chance: 0.01
				};

				elements.irradiated_water.reactions.wet_sand = {
					"elem1": "irradiated_sandy_water",
					"elem2": ["irradiated_wet_sand","irradiated_wet_sand","irradiated_wet_sand","irradiated_wet_sand","irradiated_wet_sand",null],
					chance: 0.01
				};

				elements.irradiated_water.reactions.irradiated_wet_sand = {
					"elem1": "irradiated_sandy_water",
					"elem2": ["irradiated_wet_sand","irradiated_wet_sand","irradiated_wet_sand","irradiated_wet_sand","irradiated_wet_sand",null],
					chance: 0.01
				};

			//Sediment suspension

				elements.irradiated_sandy_water = {
					color: ["#84A244", "#90AE50"],
					behavior: behaviors.RAD_LIQUID,
					tempHigh: 100,
					stateHigh: ["rad_steam","rad_steam","irradiated_sand"],
					//tempLow: 0,
					//stateLow: "irradiated_sandy_ice",
					category: "liquids",
					heatCapacity: 4.184, //unimplemented
					reactions: {
						"dirt": { // React with (water reacts with dirt to make mud)
							"elem1": [null,null,"irradiated_wet_sand"], // First element transforms into; in this case, water deletes itself
							"elem2": "irradiated_mud", // Second element transforms into; in this case, dirt turns to mud
						},
						"irradiated_dirt": { // React with (water reacts with dirt to make mud)
							"elem1": [null,null,"irradiated_wet_sand"], // First element transforms into; in this case, water deletes itself
							"elem2": "irradiated_mud", // Second element transforms into; in this case, dirt turns to mud
						},
						"water": { "elem1":"irradiated_water", "elem2":"irradiated_sandy_water", "chance":0.025 },
						"irradiated_water": { "elem1":"irradiated_water", "elem2":"irradiated_sandy_water", "chance":0.025 },
						"sand": { "elem1": [null,null,"irradiated_wet_sand"], "elem2": "irradiated_wet_sand", },
						"sandy_water": { "elem1":"irradiated_wet_sand", "elem2":"irradiated_water", "chance": 0.001 },
						"irradiated_sand": { "elem1": [null,null,"irradiated_wet_sand"], "elem2": "irradiated_wet_sand", },
						"irradiated_sandy_water": { "elem1":"irradiated_wet_sand", "elem2":"irradiated_water", "chance": 0.001 },
						"wet_sand": { "elem2":"irradiated_sand_sediment", "chance": 0.0005 },
						"irradiated_wet_sand": { "elem2":"irradiated_sand_sediment", "chance": 0.0005 },
						/*"salt": { "elem1": "salt_water", "elem2": null },
						"sugar": { "elem1": "sugar_water", "elem2": null, },
						"dust": { "elem1": "dirty_water", "elem2": null, },
						"ash": { "elem1": "dirty_water", "elem2": null, },
						"cyanide": { "elem1": "dirty_water", "elem2": null, },
						"carbon_dioxide": { "elem1": "seltzer", "elem2": null, "oneway":true },
						"sulfur": { "elem1": "dirty_water", "elem2": null, },
						"rat": { "elem1": "dirty_water", chance:0.005 },
						"plague": { "elem1": "dirty_water", "elem2": null, },
						"rust": { "elem1": "dirty_water", chance:0.005 },
						"fallout": { "elem1": "dirty_water", chance:0.25 },
						"radiation": { "elem1": "dirty_water", chance:0.25 },
						"uranium": { "elem1": "dirty_water", chance:0.25 },
						"rotten_meat": { "elem1": "dirty_water", chance:0.25 },
						"quicklime": { "elem1": [null,null,"wet_sand"], "elem2": "slaked_lime", },
						"rock": { "elem2": "wet_sand", "chance": 0.00035 },
						"ruins": { "elem2": "rock", "chance": 0.00035 },*/
						"mudstone": { "elem2": "irradiated_mud", "chance": 0.00035 },
						"irradiated_mudstone": { "elem2": "irradiated_mud", "chance": 0.00035 },
						//"methane": { "elem1":"primordial_soup", "elem2":"primordial_soup", tempMin:60, charged:true },
						//"ammonia": { "elem1":"primordial_soup", "elem2":"primordial_soup", tempMin:60, charged:true },
						"fly": { "elem2":"dead_bug", "chance":0.1, "oneway":true },
						"firefly": { "elem2":"dead_bug", "chance":0.1, "oneway":true },
						"bee": { "elem2":"dead_bug", "chance":0.05, "oneway":true },
						"stink_bug": { "elem2":"dead_bug", "chance":0.1, "oneway":true },
					},
					state: "liquid",
					density: 1097,
					conduct: 0.02,
					stain: 0.01,
				}

			//Sediment element where lithification code resides

				elements.irradiated_sand_sediment = {
					hidden: true,
					color: "#afd182",
					hardness: 0.2,
					behavior: [
						"XX|XX|XX",
						"XX|XX|XX",
						"SW:wet_sand,irradiated_wet_sand%1.5 AND M2|SW:wet_sand,irradiated_wet_sand%2.5 AND M1|SW:wet_sand,irradiated_wet_sand%1.5 AND M2"
					],
					reactions: {
						"water": { "elem1":"irradiated_sandy_water", "elem2":"irradiated_sandy_water", "chance":0.025 },
						"irradiated_water": { "elem1":"irradiated_sandy_water", "elem2":"irradiated_sandy_water", "chance":0.025 },
						"sand": { "elem1": [null,null,"irradiated_wet_sand"], "elem2": "irradiated_wet_sand", },
						"irradiated_sand": { "elem1": [null,null,"irradiated_wet_sand"], "elem2": "irradiated_wet_sand", },
						"sandy_water": { "elem1":["irradiated_water","irradiated_water","irradiated_sand_sediment"], "chance":0.001 },
						"irradiated_sandy_water": { "elem1":["irradiated_water","irradiated_water","irradiated_sand_sediment"], "chance":0.001 },
						"wet_sand": { "elem2": "irradiated_sand_sediment", "chance": 0.0005 },
						"irradiated_wet_sand": { "elem2": "irradiated_sand_sediment", "chance": 0.0005 },
					},
					tempHigh: 1700,
					stateHigh: "molten_irradiated_glass",
					category: "land",
					state: "solid",
					density: 1602,
					breakInto: "irradiated_sand",
					tick: function(pixel) {
						var validNeighborArray = Array.apply(null, Array(adjacentCoords.length)).map(function() {return false});
						if(Math.random() < 0.0003) {
							for(i = 0; i < adjacentCoords.length; i++) {
								if(isEmpty(pixel.x+adjacentCoords[i][0],pixel.y+adjacentCoords[i][1],true)) {
									validNeighborArray[i] = false;
								} else if(!isEmpty(pixel.x+adjacentCoords[i][0],pixel.y+adjacentCoords[i][1],true)) {
									/*if(sandstoneLithificationElements.includes(pixelMap[pixel.x+adjacentCoords[i][0]][pixel.y+adjacentCoords[i][1]].element)) {
										validNeighborArray[i] = true;
									} else {
										validNeighborArray[i] = false;
									};*/
									validNeighborArray[i] = sandstoneLithificationElements.includes(pixelMap[pixel.x+adjacentCoords[i][0]][pixel.y+adjacentCoords[i][1]].element);
								};
							};
							if(validNeighborArray.includes(true)) {
								changePixel(pixel,"irradiated_sandstone");
							};
						};
					},
				}

			//Fallback reaction setter

				if(!elements.wet_sand.reactions) {
					elements.wet_sand.reactions = {};
				};

			//Reactions to add

				elements.wet_sand.reactions.irradiated_sand_sediment = {
					elem1: "irradiated_sand_sediment",
					chance: 0.0003
				};

				elements.irradiated_wet_sand.reactions.sand_sediment = {
					elem1: "irradiated_sand_sediment",
					chance: 0.0003
				};

				elements.irradiated_wet_sand.reactions.irradiated_sand_sediment = {
					elem1: "irradiated_sand_sediment",
					chance: 0.0003
				};

				elements.irradiated_wet_sand.reactions.wet_sand = {
					elem1: "irradiated_sand_sediment",
					chance: 0.0003
				};

				elements.wet_sand.reactions.irradiated_wet_sand = {
					elem1: "irradiated_sand_sediment",
					chance: 0.0003
				};

				elements.irradiated_wet_sand.reactions.irradiated_wet_sand = {
					elem1: "irradiated_sand_sediment",
					chance: 0.0003
				};

			//Final rock

				elements.irradiated_sandstone = {
					color: ["#85b357", "#b5d177", "#9cd184", "#7bc25f"],
					behavior: behaviors.RAD_WALL,
					tempHigh: 1500,
					stateHigh: "molten_irradiated_glass",
					category: "Irradiated",
					state: "solid",
					density: 2323, //wide range
					hardness: 0.5,
					breakInto: "irradiated_sand",
				}

			//Worldgen preset for testing

				worldgentypes.irradiated_test_ocean = {
					layers: [
						[0.9, "irradiated_wet_sand", 0.2],
						[0.9, "irradiated_sand", 0.2],
						[0.8, "irradiated_sandy_water", 0.7],
						[0.25, "irradiated_water"],
						[0.1, "irradiated_sand", 0.1],
						[0.1, "clay", 0.1],
						[0.1, "irradiated_gravel", 0.2],
						[0.1, "irradiated_wet_sand"],
						[0.03, "irradiated_gravel", 0.5],
						[0.03, "irradiated_rock"],
						[0, "irradiated_basalt"],
					]
				};

			//Desert

				worldgentypes.nuclear_wasteland_desert = {
					layers: [
						[0.97, "fallout", 0.4],
						[0.95, "irradiated_gravel", 0.6],
						[0.65, "liquid_irradium", 0.01],
						[0.65, "cancer", 0.02],
						[0.65, "bone", 0.02],
						[0.65, "irradiated_sand"],
						[0.55, "cancer", 0.01],
						[0.55, "bone", 0.01],
						[0.3, "irradiated_sandstone"],
						[0.05, "irradiated_rock"],
						[-0.78, "irradiated_basalt"]
					],
					temperature: -13
				};
				
			//Irradiation table updates
			
				irradiatedObject.sandstone = "irradiated_sandstone";
				irradiatedObject.sand_sediment = "irradiated_sand_sediment";
		});
};
