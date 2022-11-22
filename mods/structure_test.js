arrayLoaderVoids = ["air", "null", null];

buildingOneSegmentDoor = ["concrete","wood","concrete","wood","concrete"];
buildingOneSegmentWindows = ["concrete","glass_pane","concrete","glass_pane","concrete"];
buildingOneSegmentConcrete = ["concrete","concrete","concrete","concrete","concrete"];

buildingTwoSegments = [
	["concrete","concrete","concrete","concrete","concrete"],
	["concrete","concrete","concrete","concrete","concrete"],
	["brick","wood","brick"],
	["glass_pane","wood","glass_pane"],
	["brick","brick","brick"],
	["wood","wood","wood","wood","wood"],
	["wood","wood","wood"],
	["wood"]
];

oldRoom= [["brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "glass",  "glass",  "glass",  "glass",  "glass",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick"],
		  ["brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "glass",  "glass",  "glass",  "glass",  "glass",  "brick",  "battery","brick",  "brick",  "brick",  "brick",  "brick"],
		  ["glass",  "glass",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "light","light_bulb","air",    "air",    "air",    "glass",  "glass"],
		  ["glass",  "glass",  "light",  "light",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "light",  "air",    "air",    "air",    "glass",  "glass"],
		  ["glass",  "glass",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "brass"],
		  ["glass",  "glass",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "wood" ],
		  ["brick",  "brick",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "wood" ],
		  ["brick",  "brick",  "iron",   "straw",  "straw",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "wood" ],
		  ["brick",  "brick",  "iron",   "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "iron",   "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "wood" ],
		  ["brick",  "brick",  "iron",   "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "iron",   "air",    "air",    "light",  "air",    "air",    "air",    "wood",   "brass"],
		  ["brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick"],
		  ["brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick"]]

altRoom= [["brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick"],
		  ["brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "battery","brick",  "brick",  "brick",  "brick",  "brick"],
		  ["glass",  "glass",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "light","light_bulb","air",    "air",    "air",    "glass",  "glass"],
		  ["glass",  "glass",  "light",  "light",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "light",  "air",    "air",    "air",    "glass",  "glass"],
		  ["brass",  "wood",   "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "brass"],
		  ["wood",   "wood",   "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "wood" ],
		  ["wood",   "wood",   "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "wood" ],
		  ["wood",   "wood",   "air",    "air",    "iron",   "straw",  "straw",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "wood" ],
		  ["wood",   "wood",   "air",    "air",    "iron",   "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "iron",   "air",    "air",    "air",    "air",    "wood",   "wood" ],
		  ["brass",  "wood",   "air",    "air",    "iron",   "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "iron",   "light",  "air",    "air",    "air",    "wood",   "brass"],
		  ["brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick"],
		  ["brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick", "battery", "brick",  "brick",  "brick",  "brick",  "brick"]]

/*function r0to255() {
	return Math.floor(Math.random() * 256);
};*/

function loadPixelRowFromArray(pixelArray,centerX,centerY,evenLengthBiasedLeft=true,doOverwrite=true) {
	var arrayLength = pixelArray.length;
	var leftmostOffset = (evenLengthBiasedLeft ? Math.floor(0 - ((arrayLength - 1) / 2)) : Math.ceil(0 - ((arrayLength - 1) / 2))) //floor and ceil have no effect on the integer values produced by odd lengths
	var forEnd = 0 - leftmostOffset;
	//var randomColor = `rgb(${r0to255()},${r0to255()},${r0to255()})`;
	for(i = 0; i < arrayLength; i++) {
		var newElement = pixelArray[i];
		var x = (centerX + leftmostOffset) + i;
		var y = centerY;
		if(outOfBounds(x,y)) {
			continue;
		};
		if(newElement === "null" || newElement === null) { //do nothing if element is null
			continue;
		};
		//console.log([x,y]);
		if(!isEmpty(x,y,true)) {
			if(doOverwrite) {
				deletePixel(x,y);
				if(newElement !== "air") { //if the new element is "air", don't create a pixel after deleting
					createPixel(newElement,x,y);
				};
				continue;
				//pixelMap[x][y].color = randomColor;
			} else {;
				if(newElement === "air") { //delete on "air" even if doOverwrite is false
					deletePixel(x,y);
				} else {
					continue;
				};
			};
		};
		if(!arrayLoaderVoids.includes(newElement)) { //don't create anything if the element is a special void
			createPixel(newElement,x,y);
		}
		//pixelMap[x][y].color = randomColor;
	};
};

delete elements.rad_glass.stateHigh;

//Prereq elements
elements.glass_pane = {
	color: ["#5e807d","#679e99"],
	behavior: behaviors.SUPPORT,
	reactions: {
		"radiation": { "elem1":"rad_glass_pane", "chance":0.33 },
	},
	tempHigh: 1500,
	category: "solids",
	state: "solid",
	density: 2500,
	breakInto: "glass_shard",
};

elements.rad_glass_pane = {
	color: ["#648c64","#6aad83"],
	behavior: [
		"XX|CR:radiation%0.075|XX",
		"SP AND CR:radiation%0.075|XX|SP AND CR:radiation%0.075",
		"XX|M1 AND CR:radiation%0.075|XX",
	],
	tempHigh: 1500,
	stateHigh: "molten_rad_glass",
	category: "solids",
	state: "solid",
	density: 2500,
	breakInto: "rad_glass_shard",
	hidden: true
};

elements.rad_glass.breakInto = "rad_glass_shard";

if(!elements.glass_shard.reactions) {
	elements.glass_shard.reactions = {};
};
elements.glass_shard.reactions.radiation = { "elem1":"rad_glass_shard", "chance":0.33 };

if(!elements.molten_glass.reactions) {
	elements.molten_glass.reactions = {};
};
elements.molten_glass.reactions.radiation = { "elem1":"molten_rad_glass", "chance":0.33 };

elements.rad_glass_shard = {
	color: ["#648c64","#6aad83","#6a9171"],
	behavior: [
		"XX|CR:radiation%0.075|XX",
		"CR:radiation%0.075|XX|CR:radiation%0.075",
		"M2|M1 AND CR:radiation%0.075|M2",
	],
	tempHigh: 1500,
	stateHigh: "molten_rad_glass",
	category: "powders",
	state: "solid",
	density: 2500,
};

elements.molten_rad_glass = {
	behavior: [
		"XX|CR:radiation%0.15 AND CR:fire%2.5|XX",
		"M2 AND CR:radiation%0.15|XX|M2 AND CR:radiation%0.15",
		"M1|M1 AND CR:radiation%0.15|M1",
	],
};

//Seeds
elements.building_1_seed = {
	tick: function(pixel) {
		if(!tryMove(pixel,pixel.x,pixel.y+1)) {
			var randomHeight = 13 + Math.floor(Math.random() * (8 + 1)) //min 12, variance 8
			var currentHeight = pixel.y + 2;
			var endHeight = pixel.y - randomHeight;
			//bottom 2 rows of concrete, 2 door layers and another concrete (the three of those counting against the final height)
			loadPixelRowFromArray(buildingOneSegmentConcrete,pixel.x,currentHeight,true,false);
			currentHeight--;
			loadPixelRowFromArray(buildingOneSegmentConcrete,pixel.x,currentHeight,true,false);
			currentHeight--;
			loadPixelRowFromArray(buildingOneSegmentDoor,pixel.x,currentHeight,true,true);
			currentHeight--;
			loadPixelRowFromArray(buildingOneSegmentDoor,pixel.x,currentHeight,true,true);
			currentHeight--;
			loadPixelRowFromArray(buildingOneSegmentConcrete,pixel.x,currentHeight,true,true);
			currentHeight--;
			//start looped alternating rows
			while(currentHeight > endHeight) {
				//console.log(currentHeight)
				if(outOfBounds(pixel.x,pixel.y)) {
					break;
				};
				loadPixelRowFromArray(buildingOneSegmentWindows,pixel.x,currentHeight,true,true);
				currentHeight--;
				loadPixelRowFromArray(buildingOneSegmentConcrete,pixel.x,currentHeight,true,true);
				currentHeight--;
			};
		};
	},
	excludeRandom: true,
	desc: "Creates a miniature building made of concrete and glass.",
	cooldown: 6,
	state: "solid",
	hardness: 1,
	category: "structures",
	color: ["#adadad", "#70b8ba", "#adadad", "#70b8ba", "#adadad"],
};

elements.building_2_seed = {
	tick: function(pixel) {
		if(!tryMove(pixel,pixel.x,pixel.y+1)) {
			var currentHeight = pixel.y + 2;
			for(q = 0; q < buildingTwoSegments.length; q++) {
				if(q >= buildingTwoSegments.length) {
					break;
				};
				loadPixelRowFromArray(buildingTwoSegments[q],pixel.x,currentHeight--,true,(q > 1));
			};
		};
	},
	excludeRandom: true,
	desc: "Creates a miniature house.",
	cooldown: 6,
	state: "solid",
	hardness: 1,
	category: "structures",
	color: ["#f05d43", "#f05d43", "#b06f33"],
};

elements.room_seed = {
	color: "#ffffff",
	tick: function(pixel) {
		if(!tryMove(pixel,pixel.x,pixel.y+1)) {
			var currentHeight = pixel.y;
			for(q = oldRoom.length - 1; q > -1; q--) {
				loadPixelRowFromArray(oldRoom[q],pixel.x,currentHeight--,true,true);
			};
		};
	},
	desc: "Creates a large room.",
	excludeRandom: true,
	cooldown: 10,
	state: "solid",
	hardness: 1,
	category: "structures",
};

elements.altered_room_seed = {
	color: "#ffffff",
	tick: function(pixel) {
		if(!tryMove(pixel,pixel.x,pixel.y+1)) {
			var currentHeight = pixel.y;
			for(q = altRoom.length - 1; q > -1; q--) {
				loadPixelRowFromArray(altRoom[q],pixel.x,currentHeight--,true,true);
			};
		};
	},
	desc: "Creates a variant form of the large room used in the old nested structure test.",
	excludeRandom: true,
	cooldown: 10,
	state: "solid",
	hardness: 1,
	category: "structures",
};

elements.altroom_compat = {
	name: "Altered Room (Old)",
	hidden: true,
	color: "#ffffff",
	desc: "An old version of the variant room, kept for compatibility because I don't know how to rework the structure test.",
	tick: function(pixel) {
	pixel.arr=[["brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick"],
			  ["brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "battery","brick",  "brick",  "brick",  "brick",  "brick"],
			  ["glass",  "glass",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "light","light_bulb","air",    "air",    "air",    "glass",  "glass"],
			  ["glass",  "glass",  "light",  "light",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "light",  "air",    "air",    "air",    "glass",  "glass"],
			  ["brass",  "wood",   "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "brass"],
			  ["wood",   "wood",   "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "wood" ],
			  ["wood",   "wood",   "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "wood" ],
			  ["wood",   "wood",   "air",    "air",    "iron",   "straw",  "straw",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "wood" ],
			  ["wood",   "wood",   "air",    "air",    "iron",   "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "iron",   "air",    "air",    "air",    "air",    "wood",   "wood" ],
			  ["brass",  "wood",   "air",    "air",    "iron",   "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "iron",   "light",  "air",    "air",    "air",    "wood",   "brass"],
			  ["brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick"],
			  ["brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick", "battery", "brick",  "brick",  "brick",  "brick",  "brick"]]

		aa = (0 - (Math.floor(pixel.arr[0].length / 2)))
		na = Math.abs(aa)
		if(pixel.arr[0].length % 2 == 1) {
			bb = ((Math.floor(pixel.arr[0].length / 2)) + 1)
		} else if(pixel.arr[0].length % 2 == 0) {
			bb = (Math.floor(pixel.arr[0].length / 2))
		}

		cc = (0 - (Math.floor(pixel.arr.length / 2)))
		nc = Math.abs(cc)
		if(pixel.arr.length % 2 == 1) {
			dd = ((Math.floor(pixel.arr.length / 2)) + 1)
		} else if(pixel.arr.length % 2 == 0) {
			dd = (Math.floor(pixel.arr.length / 2))
		}
		for (let j = cc; j < dd; j++) {
			for (let i = aa; i < bb; i++) {
				if(!isEmpty(pixel.x+i,pixel.y+j) && !outOfBounds(pixel.x+i,pixel.y+j)) {
					if(pixel.arr[j+nc][i+na] !=  "air" || pixel.arr[j+nc][i+na] == "air") {
						deletePixel(pixel.x+i,pixel.y+j)
					}
				}
				if(pixel.arr[j+nc][i+na]) {
					if(isEmpty(pixel.x+i,pixel.y+j) && pixel.arr[j+nc][i+na] !=  "air" && pixel.arr[j+nc][i+na] != "air" && !outOfBounds(pixel.x+i,pixel.y+j)) {
						createPixel(pixel.arr[j+nc][i+na],pixel.x+i,pixel.y+j)
					}
				}
			}
		}
	},
	category:"structures",
	insulate: true,
	state: "solid",
	excludeRandom: true,
},

elements.nested_structure_test = {
	name: "Nested Structure Test (Old)",
	color: "#ffffff",
	cooldown: 13,
	desc: "An old test of structure spawners in structure spawners. Creates several rooms stacked on top of each other.",
	tick: function(pixel) {
		pixel.arr=[["altroom_compat",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "brick",    "brick" ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "brick",    "brick" ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   ["altroom_compat",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "brick",    "brick" ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "brick",    "brick" ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   ["altroom_compat",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "brick",    "brick" ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "brick",    "brick" ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   ["altroom_compat",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "brick",    "brick" ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "brick",    "brick" ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   ["altroom_compat",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "brick",    "brick" ],
				   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "brick",    "brick" ]]

		aa = (0 - (Math.floor(pixel.arr[0].length / 2)))
		na = Math.abs(aa)
		if(pixel.arr[0].length % 2 == 1) {
			bb = ((Math.floor(pixel.arr[0].length / 2)) + 1)
		} else if(pixel.arr[0].length % 2 == 0) {
			bb = (Math.floor(pixel.arr[0].length / 2))
		}

		cc = (0 - (Math.floor(pixel.arr.length / 2)))
		nc = Math.abs(cc)
		if(pixel.arr.length % 2 == 1) {
			dd = ((Math.floor(pixel.arr.length / 2)) + 1)
		} else if(pixel.arr.length % 2 == 0) {
			dd = (Math.floor(pixel.arr.length / 2))
		}
		for (let j = cc; j < dd; j++) {
			for (let i = aa; i < bb; i++) {
				if(!isEmpty(pixel.x+i,pixel.y+j) && !outOfBounds(pixel.x+i,pixel.y+j)) {
					if(pixel.arr[j+nc][i+na] !=  "air" || pixel.arr[j+nc][i+na] == "air") {
						deletePixel(pixel.x+i,pixel.y+j)
					}
				}
				if(pixel.arr[j+nc][i+na]) {
					if(isEmpty(pixel.x+i,pixel.y+j) && pixel.arr[j+nc][i+na] !=  "air" && pixel.arr[j+nc][i+na] != "air" && !outOfBounds(pixel.x+i,pixel.y+j)) {
						createPixel(pixel.arr[j+nc][i+na],pixel.x+i,pixel.y+j)
					}
				}
			}
		}
	},
	category:"structures",
	insulate: true,
	state: "solid",
	excludeRandom: true,
};
