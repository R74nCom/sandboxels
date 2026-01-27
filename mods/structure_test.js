var modName = "mods/structure_test.js";
var libraryMod = "mods/code_library.js";

dependOn("code_library.js", function(){
	arrayLoaderVoids = ["air", "null", null];
	buildingOneSegmentDoor = ["concrete","wood_plank","concrete","wood_plank","concrete"];
	buildingOneSegmentWindows = ["concrete","glass_pane","concrete","glass_pane","concrete"];
	buildingOneSegmentConcrete = ["concrete","concrete","concrete","concrete","concrete"];

	buildingTwoSegments = [
		["concrete","concrete","concrete","concrete","concrete"],
		["concrete","concrete","concrete","concrete","concrete"],
		["brick","wood_plank","brick"],
		["glass_pane","wood_plank","glass_pane"],
		["brick","brick","brick"],
		["wood","wood_plank","wood_plank","wood_plank","wood"],
		["wood_plank","wood_plank","wood_plank"],
		["wood_plank"]
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

	canSupportWithEdge = function(x,y) {
		if(outOfBounds(x,y)) { //count edges
			return true;
		} else {
			if(!isEmpty(x,y,true)) { //if there is a pixel
				if(elements[pixelMap[x][y].element].state === "solid") {
					return true;
				} else {
					return false;
				};
			};
		};
	};

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

	function loadPixelRowFromArrayWithColorRowArray(pixelArray,colorArray,centerX,centerY,evenLengthBiasedLeft=true,doOverwrite=true,doColorOffset=false) {
		var arrayLength = pixelArray.length;
		var leftmostOffset = (evenLengthBiasedLeft ? Math.floor(0 - ((arrayLength - 1) / 2)) : Math.ceil(0 - ((arrayLength - 1) / 2))) //floor and ceil have no effect on the integer values produced by odd lengths
		var forEnd = 0 - leftmostOffset;
		//var randomColor = `rgb(${r0to255()},${r0to255()},${r0to255()})`;
		for(i = 0; i < arrayLength; i++) {
			var newElement = pixelArray[i];
			var newColor = colorArray[i];
			//console.log(newColor);
			if(doColorOffset && !["null",null].includes(newColor)) {
				newColor = convertHslObjects(normalizeColorToHslObject(newColor),"rgbjson");
				var colorOffset = Math.floor(Math.random() * (Math.random() > 0.5 ? -1 : 1) * Math.random() * 15);
				for(colorlet in newColor) {
					newColor[colorlet] += colorOffset;
				};
				newColor = convertColorFormats(newColor,"rgb");
			};
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
						pixelMap[x][y].color = newColor;
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
				pixelMap[x][y].color = newColor;
			}
			//pixelMap[x][y].color = randomColor;
		};
	};

	delete elements.rad_glass.stateHigh;

	elements.glass.hardness = 0.25,
	elements.rad_glass.hardness = 0.25,

	//Prereq elements
	elements.crumbling_concrete = {
		color: "#ababab",
		tick: function(pixel) {
			var px = pixel.x;
			var py = pixel.y;

			if (pixel.start === pixelTicks) {return}

			var supportCondition1 = (canSupportWithEdge(px-1,py-1) && canSupportWithEdge(px+1,py-1))	// V shape
			var supportCondition2 = (canSupportWithEdge(px-1,py) && canSupportWithEdge(px+1,py)) 		// - shape
			var supportCondition3 = (canSupportWithEdge(px-1,py+1) && canSupportWithEdge(px+1,py+1))	// Λ shape
			var supportCondition4 = (canSupportWithEdge(px-1,py+1) && canSupportWithEdge(px+1,py-1))	// / shape
			var supportCondition5 = (canSupportWithEdge(px-1,py-1) && canSupportWithEdge(px+1,py+1))	// \ shape
			var supportCondition6 = (canSupportWithEdge(px-1,py-1) && canSupportWithEdge(px+1,py))		// '- shape
			var supportCondition7 = (canSupportWithEdge(px-1,py+1) && canSupportWithEdge(px+1,py))		// ,- shape
			var supportCondition8 = (canSupportWithEdge(px+1,py-1) && canSupportWithEdge(px-1,py))		// -' shape
			var supportCondition9 = (canSupportWithEdge(px+1,py+1) && canSupportWithEdge(px-1,py))		// -, shape
			var supportCondition10 = (canSupportWithEdge(px,py+1) && canSupportWithEdge(px,py-1))		// | shape
			var supports = (supportCondition1 || supportCondition2 || supportCondition3 || supportCondition4 || supportCondition5 || supportCondition6 || supportCondition7 || supportCondition8 || supportCondition9 || supportCondition10);

			if(!supports) {
				behaviors.POWDER(pixel);
			};
			
			doDefaults(pixel);
		},
		tempHigh: 1500,
		stateHigh: "magma",
		category: "powders",
		state: "solid",
		density: 2400,
		hardness: 0.5,
		breakInto: "dust",
	};

	elements.attach_powder_silk = {
		color: ["#ebebeb", "#e6d9d1"],
		properties: {
			"attached": false,
			"attachOffsets": [null, null],
		},
		tick: function(pixel) {
			if (pixel.start === pixelTicks) {return}
			if(pixel.attached) {
				if(pixel.attachOffsets === null) {
					pixel.attached = false;
				} else if(pixel.attachOffsets.includes(null)) {
					pixel.attached = false;
				} else {
					var attachCoords = [pixel.x + pixel.attachOffsets[0], pixel.y + pixel.attachOffsets[1]];
					if(isEmpty(attachCoords[0],attachCoords[1],false)) { //consider OOB full
						pixel.attached = false;
					};
				};
			} else {
				behaviors.POWDER(pixel);
			};
			doDefaults(pixel);
		},
		burnInto: "ash",
		burn:75,
		burnTime:25,
		category: "solids",
		state: "solid",
		density: 1000,
		hidden: true
	};

	elements.glass_pane = {
		color: ["#5e807d","#679e99"],
		behavior: behaviors.SUPPORT,
		reactions: {
			"radiation": { "elem1":"rad_glass_pane", "chance":0.33 },
		},
		tempHigh: 1500,
		stateHigh: "molten_glass",
		hardness: 0.2,
		category: "solids",
		state: "solid",
		density: 2500,
		breakInto: "glass_shard",
		hidden: true,
	};

	elements.rad_glass_pane = {
		color: ["#648c64","#6aad83"],
		behavior: [
			"XX|CR:radiation%0.075|XX",
			"SP AND CR:radiation%0.075|XX|SP AND CR:radiation%0.075",
			"XX|M1 AND CR:radiation%0.075|XX",
		],
		tempHigh: 1500,
		hardness: 0.2,
		stateHigh: "molten_rad_glass",
		category: "solids",
		state: "solid",
		density: 2500,
		breakInto: "rad_glass_shard",
		hidden: true,
	};

	elements.wood.hardness = 0.2;

	elements.wood_plank = {
		color: "#ab6c3f",
		behavior: behaviors.SUPPORT,
		tempHigh: 400,
		stateHigh: ["ember","charcoal","fire","fire","fire"],
		category: "solids",
		burn: 5,
		burnTime: 300,
		burnInto: ["ember","charcoal","fire"],
		state: "solid",
		hardness: 0.2,
		breakInto: "sawdust",
	};

	elements.hanging_concrete = {
		color: "#ababab",
		behavior: [
			"XX|SP|XX",
			"XX|XX|XX",
			"M2|M1|M2" //crumbling from the top down is acceptable
		],
		tempHigh: 1500,
		stateHigh: "magma",
		category: "powders",
		state: "solid",
		density: 2400,
		hardness: 0.5,
		breakInto: "dust",
		hidden: true,
	};

	elements.support_copper = {
		color: ["#A95232","#BE4322","#C76035"],
		behavior: behaviors.SUPPORT,
		reactions: {
			"water": { "elem1":"oxidized_copper", chance:0.0025 },
			"salt_water": { "elem1":"oxidized_copper", chance:0.005 },
			"dirty_water": { "elem1":"oxidized_copper", chance:0.04 },
			"sugar_water": { "elem1":"oxidized_copper", chance:0.0035 },
			"seltzer": { "elem1":"oxidized_copper", chance:0.006 },
		},
		category: "solids",
		tempHigh: 1085,
		stateHigh: "molten_copper",
		density: 8960,
		conduct: 0.95,
		hardness: 0.3,
		hidden: true,
	};

	elements.support_bulb = {
		color: "#a8a897",
		behavior: behaviors.SUPPORTPOWDER,
		behaviorOn: [
			"XX|CR:light|XX",
			"CR:light AND SP|XX|CR:light AND SP",
			"M2|CR:light AND M1|M2"
		],
		colorOn: "#ebebc3",
		category: "machines",
		tempHigh: 1500,
		stateHigh: ["molten_glass","molten_glass","molten_copper"],
		conduct: 1,
		breakInto: "glass_shard",
		hidden: true,
	};

	elements.support_plastic = {
		color: "#c5dede",
		behavior: behaviors.SUPPORT,
		tempHigh: 250,
		stateHigh: "molten_plastic",
		burn: 10,
		burnTime: 200,
		burnInto: ["dioxin","smoke","dioxin","smoke","stench"],
		category: "solids",
		state: "solid",
		density: 1052,
		hidden: true,
	};

	elements.support_steel = {
		color: "#71797E",
		behavior: behaviors.SUPPORT,
		tempHigh: 1455.5,
		stateHigh: "molten_steel",
		category: "solids",
		density: 7850,
		conduct: 0.42,
		hardness: 0.8,
	};

	var newAcidIgnores = ["glass_pane", "rad_glass_pane", "rad_glass_shard", "hanging_plastic"];
	for(i = 0; i < newAcidIgnores.length; i++) {
		elements.acid.ignore.push(newAcidIgnores[i]);
		elements.acid_gas.ignore.push(newAcidIgnores[i]);
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

	elements.attach_concrete = {
		color: "#ababab",
		properties: {
			"attached": false,
			"attachOffsets": [null, null],
		},
		tick: function(pixel) {
			if (pixel.start === pixelTicks) {return}
			if(pixel.attached) {
				if(pixel.attachOffsets === null) {
					pixel.attached = false;
				} else if(pixel.attachOffsets.includes(null)) {
					pixel.attached = false;
				} else {
					var attachCoords = [pixel.x + pixel.attachOffsets[0], pixel.y + pixel.attachOffsets[1]];
					if(isEmpty(attachCoords[0],attachCoords[1],false)) { //consider OOB full
						pixel.attached = false;
					};
				};
			} else { //Support behavior if not attached
				if(!isEmpty(pixel.x-1,pixel.y,true) || !isEmpty(pixel.x+1,pixel.y,true)) {
					tryMove(pixel,pixel.x,pixel.y+1);
				};
			};
			doDefaults(pixel);
		},
		tempHigh: 1500,
		stateHigh: "magma",
		category: "powders",
		state: "solid",
		density: 2400,
		hardness: 0.5,
		breakInto: "dust",
	};

	elements.steel_plate_ledge = {
		color: "#F2F2F2",
		tick: function(pixel) {
			if(pixel.attached) {
				if(pixel.attachOffsets === null) {
					pixel.attached = false;
				} else if(pixel.attachOffsets.includes(null)) {
					pixel.attached = false;
				} else {
					var attachCoords = [pixel.x + pixel.attachOffsets[0], pixel.y + pixel.attachOffsets[1]];
					if(isEmpty(attachCoords[0],attachCoords[1],false)) { //consider OOB full
						pixel.attached = false;
					};
				};
			} else { //Move if not attached
				tryMove(pixel,pixel.x,pixel.y+1);
			};
			doDefaults(pixel);
		},
		properties: {
			"attached": false,
			"attachOffsets": [null, null],
		},
		tempHigh: 1455.5,
		stateHigh: "molten_steel",
		category: "solids",
		density: 785,
		conduct: 0.32,
		hardness: 0.7,
		breakInto: "metal_scrap",
	};

	//Seeds
	elements.building_1_seed = {
		tick: function(pixel) {
			for(cx = -4; cx <= 4; cx++) {
				for(cy = -4; cy <= 4; cy++) {
					if(cx === 0 && cy === 0) {
						continue;
					};
					var finalCoords = [pixel.x+cx,pixel.y+cy];
					if(isEmpty(...finalCoords,true)) {
						continue;
					} else {
						var otherPixel = pixelMap[finalCoords[0]][finalCoords[1]];
						if(otherPixel.element === pixel.element) {
							deletePixel(...finalCoords);
						};
					};
				};
			};
			if(!isEmpty(pixel.x,pixel.y-1,true)) {
				swapPixels(pixel,pixelMap[pixel.x][pixel.y-1]);
				return;
			};
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
			for(cx = -4; cx <= 4; cx++) {
				for(cy = -4; cy <= 4; cy++) {
					if(cx === 0 && cy === 0) {
						continue;
					};
					var finalCoords = [pixel.x+cx,pixel.y+cy];
					if(isEmpty(...finalCoords,true)) {
						continue;
					} else {
						var otherPixel = pixelMap[finalCoords[0]][finalCoords[1]];
						if(otherPixel.element === pixel.element) {
							deletePixel(...finalCoords);
						};
					};
				};
			};
			if(!isEmpty(pixel.x,pixel.y-1,true)) {
				swapPixels(pixel,pixelMap[pixel.x][pixel.y-1]);
				return;
			};
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

	function _toggleDesertBuildings() {
		var layer = worldgentypes.desert.layers[0];
		if(layer[1] !== "building_1_seed") { //if the first layer isn't a building layer, add one
			worldgentypes.desert.layers.unshift([0.95,"building_1_seed",0.01]);
		} else if(layer[1] === "building_1_seed") { //if the first layer is a building layer, remove it
			worldgentypes.desert.layers.shift();
		};
	};
}, true);