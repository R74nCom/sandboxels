/*sedimentSandstoneTries = 0;
sedimentSandstoneTryIterations = 0;
sedimentSandstoneDetects = 0;
sedimentSandstoneNoDetects = 0;
sandstoneFormations = 0;
sandstoneFailures = 0;*/

cementationElements = ["sand_sediment", "sandstone"]

elements.water.reactions.wet_sand = {
	"elem1": "sandy_water",
	"elem2": ["wet_sand","wet_sand","wet_sand","wet_sand","wet_sand",null],
	chance: 0.01
};

elements.sandy_water = {
	color: ["#768485", "#849294"],
	behavior: behaviors.LIQUID,
	tempHigh: 100,
	stateHigh: ["steam","steam","sand"],
	//tempLow: 0,
	//stateLow: "sandy_ice",
	category: "liquids",
	heatCapacity: 4.184, //unimplemented
	reactions: {
		"dirt": { // React with (water reacts with dirt to make mud)
			"elem1": [null,null,"wet_sand"], // First element transforms into; in this case, water deletes itself
			"elem2": "mud", // Second element transforms into; in this case, dirt turns to mud
		},
		"water": { "elem1":"water", "elem2":"sandy_water", "chance":0.025 },
		"sand": { "elem1": [null,null,"wet_sand"], "elem2": "wet_sand", },
		"sandy_water": { "elem1":"wet_sand", "elem2":"water", "chance": 0.001 },
		"wet_sand": { "elem2":"sand_sediment", "chance": 0.0005 },
		//"salt": { "elem1": "salt_water", "elem2": null },
		//"sugar": { "elem1": "sugar_water", "elem2": null, },
		"dust": { "elem1": "dirty_water", "elem2": null, },
		"ash": { "elem1": "dirty_water", "elem2": null, },
		"cyanide": { "elem1": "dirty_water", "elem2": null, },
		//"carbon_dioxide": { "elem1": "seltzer", "elem2": null, "oneway":true },
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
		"ruins": { "elem2": "rock", "chance": 0.00035 },
		"mudstone": { "elem2": "mud", "chance": 0.00035 },
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

elements.sand_sediment = {
	color: "#d3b387",
	hardness: 0.2,
	behavior: [
		"XX|XX|XX",
		"XX|XX|XX",
		"SW:wet_sand%1.5 AND M2|SW:wet_sand%2.5 AND M1|SW:wet_sand%1.5 AND M2"
	],
	reactions: {
		"water": { "elem1":"sandy_water", "elem2":"sandy_water", "chance":0.025 },
		"sand": { "elem1": [null,null,"wet_sand"], "elem2": "wet_sand", },
		"sandy_water": { "elem1":["water","water","sand_sediment"], "chance":0.001 },
		"wet_sand": { "elem2": "sand_sediment", "chance": 0.0005 },
	},
	tempHigh: 1700,
	stateHigh: "molten_glass",
	category: "land",
	state: "solid",
	density: 1602,
	breakInto: "sand",
	tick: function(pixel) {
		var validNeighborArray = Array.apply(null, Array(adjacentCoords.length)).map(function() {return false});
		if(Math.random() < 0.0003) {
			//sedimentSandstoneTries++;
			for(i = 0; i < adjacentCoords.length; i++) {
				//sedimentSandstoneTryIterations++;
				if(isEmpty(pixel.x+adjacentCoords[i][0],pixel.y+adjacentCoords[i][1],true)) {
					validNeighborArray[i] = false;
					//sedimentSandstoneNoDetects++;
				} else if(!isEmpty(pixel.x+adjacentCoords[i][0],pixel.y+adjacentCoords[i][1],true)) {
					/*if(cementationElements.includes(pixelMap[pixel.x+adjacentCoords[i][0]][pixel.y+adjacentCoords[i][1]].element)) {
						validNeighborArray[i] = true;
						//sedimentSandstoneDetects++;
					} else {
						validNeighborArray[i] = false;
						//sedimentSandstoneNoDetects++;
					};*/
					validNeighborArray[i] = cementationElements.includes(pixelMap[pixel.x+adjacentCoords[i][0]][pixel.y+adjacentCoords[i][1]].element);
				};
			};
			if(validNeighborArray.includes(true)) {
				//sandstoneFormations++;
				changePixel(pixel,"sandstone");
			}/* else {
				sandstoneFailures++;
			}*/;
		};
    },
}

if(!elements.wet_sand.reactions) {
	elements.wet_sand.reactions = {};
};

elements.wet_sand.reactions.sand_sediment = {
	elem1: "sand_sediment",
	chance: 0.0003
};

elements.wet_sand.reactions.wet_sand = {
	elem1: "sand_sediment",
	chance: 0.0003
};

elements.sandstone = {
	color: ["#b27853", "#d1a784", "#d1a784", "#d4996e"],
	behavior: behaviors.WALL,
	tempHigh: 1500,
	stateHigh: "glass",
	category: "land",
	state: "solid",
	density: 2323, //wide range
	hardness: 0.5,
	breakInto: "sand",
}

//"#"

//

worldgentypes.test_ocean = {
	layers: [
		[0.9, "wet_sand", 0.2],
		[0.9, "sand", 0.2],
		[0.8, "sandy_water", 0.7],
		[0.25, "water"],
		[0.1, "sand", 0.1],
		[0.1, "clay", 0.1],
		[0.1, "gravel", 0.2],
		[0.1, "wet_sand"],
		[0.03, "gravel", 0.5],
		[0.03, "rock"],
		[0, "basalt"],
	]
}