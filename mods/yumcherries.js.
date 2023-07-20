var modName = "mods/cherries.js";
var onTryMoveIntoMod = "mods/onTryMoveInto.js";
var libraryMod = "mods/code_library.js";

if(enabledMods.includes(onTryMoveIntoMod) && enabledMods.includes(libraryMod)) {
	randomNumberFromOneToThree = function() {
		return 1 + Math.floor(Math.random() * 3)
	};
	
	debugSpeedGrowth = false;
	logLeaves = false;
	cherryAttachWhitelist = ["cherry_log","cherry_branch_1","cherry_branch_2","blossom","cherry_leaf","cherry_plant_top","cherry"];
	
	cherryDirtElements = ["dirt","mud","sand","wet_sand","clay_soil","mycelium","grass"];

	function logPixelCoords(pixel) {
		return `(${pixel.x}, ${pixel.y})`
	};

	function hasPixel(x,y,elementInput) {
		if(isEmpty(x,y,true)) { //if empty, it can't have a pixel
			return false;
		} else {
			if(elementInput.includes(",")) { //CSTA
				elementInput = elementInput.split(",");
			};
			if(Array.isArray(elementInput)) { //if element list
				return elementInput.includes(pixelMap[x][y].element);
			} else { //if single element
				return pixelMap[x][y].element === elementInput;
			};
		};		
	};

	elements.cherry_seed = {
		color: "#8b4513",
		tick: function(pixel) {
			if(pixel.cherryRange === null) {
				pixel.cherryRange = randomNumberFromOneToThree();
			};
			
			if (isEmpty(pixel.x,pixel.y+1)) {
				movePixel(pixel,pixel.x,pixel.y+1);
			} else {
				if (Math.random() < (debugSpeedGrowth ? 0.09 : 0.03) && pixel.age > (debugSpeedGrowth ? 20 : 50) && pixel.temp < 100) {
					if (!outOfBounds(pixel.x,pixel.y+1)) {
						var dirtPixel = pixelMap[pixel.x][pixel.y+1];
						if (cherryDirtElements.includes(dirtPixel.element)) {
							changePixel(dirtPixel,"root");
						};
					};
					if (isEmpty(pixel.x,pixel.y-1)) {
						movePixel(pixel,pixel.x,pixel.y-1);
						createPixel("cherry_log",pixel.x,pixel.y+1);
						pixelMap[pixel.x][pixel.y+1].cherryRange = pixel.cherryRange; //pass cherry range down to log
					};
				} else if (pixel.age > (debugSpeedGrowth ? 500 : 1000)) {
					changePixel(pixel,"cherry_plant_top");
				};
				pixel.age++;
			};
			if(Math.random() < 0.01 && pixel.age > 200) {
				changePixel(pixel,"cherry_plant_top");
			};
			doDefaults(pixel);
		},
		properties: {
			"age": 0,
			//"cherryRange": null, //apparently this is suddenly, in an illogical, never-before-seen, completely new, unprecedented incident of bad behavior, evaluated before being put into the property database, so RNG has to be done in tick
			"cherryRange": null,
		},
		tempHigh: 100,
		stateHigh: "dead_plant",
		tempLow: -2,
		stateLow: "frozen_plant",
		burn: 5,
		burnInto: ["steam", "ash"],
		burnTime: 600,
		category: "life",
		state: "solid",
		density: 1500,
		cooldown: defaultCooldown,
	};

	elements.cherry_log = {
		hidden: true,
		color: "#310a0b",
		tick: function(pixel) {
			if(pixel.cherryRange === null) {
				pixel.cherryRange = randomNumberFromOneToThree();
			};

			if (pixel.age > 60 && pixel.temp < 100 && !pixel.grewPeduncle) {
				var peduncleOffsets = [-1, 1]; //placed to the left, placed to the right
				for(i = 0; i < peduncleOffsets.length; i++) {
					if (isEmpty(pixel.x+peduncleOffsets[i],pixel.y,false)) {
						if (Math.random() < 0.005) {
							createPixel("cherry_branch_1",pixel.x+peduncleOffsets[i],pixel.y);
							pixelMap[pixel.x+peduncleOffsets[i]][pixel.y].dir = Math.sign(peduncleOffsets[i]);
							pixelMap[pixel.x+peduncleOffsets[i]][pixel.y].cherryRange = pixel.cherryRange; //pass cherry range down to branch
							if(Math.random() < 0.8) { pixel.grewPeduncle = true; } //20% chance to not mark as true, allowing for a chance to try another branch
						};
					};
				};
			};
			pixel.age++;
			doDefaults(pixel);
		},
		properties: {
			"age": 0,
			"grewPeduncle": false,
			"cherryRange": null,
		},
		tempHigh: 100,
		stateHigh: "dead_plant",
		tempLow: -2,
		stateLow: "frozen_plant",
		burn: 5,
		burnInto: ["steam", "ash"],
		burnTime: 600,
		category: "life",
		state: "solid",
		density: 1500,
	};

	elements.cherry = {
		color: "#f7022a",
		tick: function(pixel) {
			if(pixel.attached) {
				var attachCoords = [pixel.x+Math.sign(pixel.attachDirection), pixel.y];
				if(isEmpty(attachCoords[0],attachCoords[1],false)) {
					pixel.attached = false;
				};
			} else { //Move if not attached
				if (!tryMove(pixel, pixel.x, pixel.y+1)) {
					if(Math.random() < 0.9) {
						if (Math.random() < 0.5) {
							if (!tryMove(pixel, pixel.x+1, pixel.y+1)) {
								tryMove(pixel, pixel.x-1, pixel.y+1);
							};
						} else {
							if (!tryMove(pixel, pixel.x-1, pixel.y+1)) {
								tryMove(pixel, pixel.x+1, pixel.y+1);
							};
						};
					};
				};
			};
			doDefaults(pixel);
			var shouldSpoil = true; //spoil by default
			if(pixel.attached) { //if it's attached
				if(!isEmpty(attachCoords[0],attachCoords[1],true)) { //if the attachment coords are a pixel and not OOB
					var attachPixel = pixelMap[attachCoords[0]][attachCoords[1]];
					var attachElement = attachPixel.element;
					if(cherryAttachWhitelist.includes(attachElement)) {//if the element is a whitelisted "don't spoil" element
						shouldSpoil = false; //then don't spoil
					};
				};
			};
			if(shouldSpoil) { //spoil if not attached
				if(pixel.temp > -14 && pixel.temp <= 4) { //(no spoiling below 14C)
					pixel.spoilage += Math.max(Math.min(scale(pixel.temp,-14,4,0,9),9),0)
				} else if(pixel.temp > 4) {
					pixel.spoilage += Math.max(Math.min(scale(pixel.temp,4,20,9,30),40),0)
				};
			};
			if(pixel.spoilage > 14400) { //3600 = 120 ticks at 20C 
				if(Math.random() < 0.05) {
					changePixel(pixel,"spoiled_cherry");
				};
			};
		},
		properties: {
			"spoilage":0,
			"attached": false,
			"attachDirection": (!Math.floor(Math.random() * 2)) ? 1 : -1,
		},
		burn: 5,
		burnInto: ["steam", "ash"],
		burnTime: 600,
		tempHigh: 200,
		stateHigh: ["steam", "ash"],
		onTryMoveInto: function(pixel,otherPixel) {
			var otherInfo = elements[otherPixel.element]
			if(typeof(otherInfo.state) === "string" && otherInfo.state !== "gas") {
				pixel.attached = false;
			};
		},
	};

	elements.cherry_branch_1 = {
		hidden: true,
		name: "cherry branch (offshoot)",
		color: "#310a0b",
		tick: function(pixel) {
			if(pixel.cherryRange === null) {
				pixel.cherryRange = randomNumberFromOneToThree();
			};

			if (pixel.age > 20 && pixel.temp < 100) {
				var peduncleCoords1 = [pixel.x + pixel.dir, pixel.y];
				var peduncleCoords2 = [pixel.x + pixel.dir, pixel.y + 1];
				if(isEmpty(peduncleCoords1[0],peduncleCoords1[1],false) && isEmpty(peduncleCoords2[0],peduncleCoords2[1],false)) { 
					if(Math.random() < 0.5) {
						createPixel(pixel.element,peduncleCoords1[0],peduncleCoords1[1]);
						pixelMap[peduncleCoords1[0]][peduncleCoords1[1]].dir = pixel.dir;
						pixelMap[peduncleCoords1[0]][peduncleCoords1[1]].cherryRange = pixel.cherryRange; //pass cherry range down to next pixel of branch horizontal
					} else {
						createPixel("cherry_branch_2",peduncleCoords2[0],peduncleCoords2[1]);
						pixelMap[peduncleCoords2[0]][peduncleCoords2[1]].cherryRange = pixel.cherryRange; //pass cherry range down to diagonal offshoot
					};
				};
			};
			pixel.age++;
			doDefaults(pixel);
		},
		properties: {
			"dir": (!Math.floor(Math.random() * 2)) ? 1 : -1,
			"age": 0,
			//"cherryRange": (1 + (Math.floor(Math.random() * 3))), //1-3
			"cherryRange": null,
		},
		tempHigh: 100,
		stateHigh: "dead_plant",
		tempLow: -2,
		stateLow: "frozen_plant",
		burn: 5,
		burnInto: ["steam", "ash"],
		burnTime: 600,
		category: "life",
		state: "solid",
		density: 1500,
	};

	elements.cherry_branch_2 = {
		hidden: true,
		name: "cherry branch (hanging)",
		color: "#310a0b",
		tick: function(pixel) {
			if(pixel.cherryRange === null) {
				pixel.cherryRange = randomNumberFromOneToThree();
			};

			// Grow/Flower
			if (pixel.age > 20 && pixel.temp < 100) {
				var growthCoords = [pixel.x, pixel.y + 1];
				if(isEmpty(...growthCoords)) { 
					if(Math.random() < 0.9) {
						createPixel(pixel.element,...growthCoords);
						pixelMap[growthCoords[0]][growthCoords[1]].cherryRange = pixel.cherryRange; //pass cherry range down to next pixel of branch vertical
					} else {
						createPixel("blossom",...growthCoords); // cherry flower
					};
				};
			};
			
			//Make cherries
			if (pixel.age > 40 && pixel.temp < 100) {
				var cherryOffsets = [-1, 1]; //placed to the left, placed to the right
				for(i = 0; i < cherryOffsets.length; i++) {
					//console.log(`Looping through left and right positions: ${cherryOffsets}`);
					for(j = 1; j < pixel.cherryRange + 1; j++) { //for max cherry distance, using the cherry range
						//console.log(`Looping through cherry offset multipliers: ${j}`);
						if (isEmpty(pixel.x+(j * cherryOffsets[i]),pixel.y,false)) { //if there's an empty space
							//console.log(`Cherry position is empty: [${j * cherryOffsets[i]}, 0]\nTrying cherry at (${pixel.x+(j * cherryOffsets[i])},${pixel.y})`);
							if (Math.random() < (debugSpeedGrowth ? 0.05 : 0.005)) { //try to place the cherry
								//console.log(`Placing cherry`);
								createPixel("cherry",pixel.x+(j * cherryOffsets[i]),pixel.y);
								pixelMap[pixel.x+(j * cherryOffsets[i])][pixel.y].attached = true;
								pixelMap[pixel.x+(j * cherryOffsets[i])][pixel.y].attachDirection = -1 * Math.sign(cherryOffsets[i]); //attach dir is the opposite of placement dir so it attaches towards the stem
							} else {
								//console.log(`NOT placing cherry`);
							};
							//console.log(`Cherry tried, stopping iteration`);
							break; //and then stop iteration
						} else {
							//console.log(`Cherry position is NOT empty: [${j * cherryOffsets[i]}, 0]\nSkipping this offset`);
							continue; //if not empty, skip that pixel and move on the next distance
						};
						//console.log(`====End of side try====`);
					};					
					//console.log(`####End of side iterator####`);
				};
				//console.log(`>>>>End of cherry iterator<<<<`);
			};
			pixel.age++;
			doDefaults(pixel);
			//console.log(`\nEnd of branch tick\n`);
		},
		properties: {
			"age": 0, 
			//"cherryRange": (1 + (Math.floor(Math.random() * 3))), //1-3
			"cherryRange": null,
		},
		tempHigh: 100,
		stateHigh: "dead_plant",
		tempLow: -2,
		stateLow: "frozen_plant",
		burn: 5,
		burnInto: ["steam", "ash"],
		burnTime: 600,
		category: "life",
		state: "solid",
		density: 1500,
	};

	elements.spoiled_cherry = {
		hidden: true,
		color: "#594b29",
		behavior: [
			"XX|CR:stench,fly%0.1|XX",
			"M2%0.5|CH:dirty_water,fly,fly%0.007|M2%0.5",
			"M2|M1|M2"
		],
		stain: 0.01,
		burn: 5,
		burnInto: ["steam", "ash"],
		burnTime: 600,
		tempHigh: 200,
		stateHigh: ["steam", "ash"],
	};

	elements.fly.reactions.spoiled_cherry = { "elem2":null, chance:0.15, func:behaviors.FEEDPIXEL };

	elements.cherry_leaf = {
		hidden: true,
		color: "#9df24e",
		tick: function(pixel) {
			if(pixel.cherryRange === null) {
				pixel.cherryRange = randomNumberFromOneToThree();
			};

			if(pixel.attached) {
				var attachCoords = [pixel.x + pixel.attachOffsets[0], pixel.y + pixel.attachOffsets[1]];
				if(isEmpty(attachCoords[0],attachCoords[1],false)) { //consider OOB full
					pixel.attached = false;
				};
			} else { //Move if not attached
				if(Math.random() < 0.2) {
					if (!tryMove(pixel, pixel.x, pixel.y+1)) {
						if(Math.random() < 0.4) {
							if (Math.random() < 0.5) {
								if (!tryMove(pixel, pixel.x+1, pixel.y+1)) {
									tryMove(pixel, pixel.x-1, pixel.y+1);
								};
							} else {
								if (!tryMove(pixel, pixel.x-1, pixel.y+1)) {
									tryMove(pixel, pixel.x+1, pixel.y+1);
								};
							};
						};
					};
				};
			};
			doDefaults(pixel);
		},
		properties: {
			"attached": false,
			"attachOffsets": [(!Math.floor(Math.random() * 2)) ? 1 : -1, 0],
			"cherryRange": null,
		},
		burn: 5,
		burnInto: ["steam", "ash"],
		burnTime: 600,
		tempHigh: 200,
		stateHigh: ["steam", "ash"],
		onTryMoveInto: function(pixel,otherPixel) { //Move through
			var otherElement = otherPixel.element; //var element for readability
			
			var otherInfo = elements[otherElement]; //var info
			
			var otherState = "solid"; //consider things solid by default
			if(typeof(otherInfo.state) === "string") {
				otherState = otherInfo.state; //get actual state if it exists
			};
			
			var otherDensity = 1000; //consider density 1000 by default
			if(typeof(otherInfo.density) === "number") {
				otherDensity = otherInfo.density; //get actual density if it exists
			};
			
			var react = false; //default to no reaction
			if(typeof(otherInfo.reactions) === "object") { //look for reactions
				if(typeof(otherInfo.reactions[pixel.element]) === "object") { //look for reactions involving this element
					react = true; //if there are any, set reaction flag to true
				};
			};
			
			if(otherElement.endsWith("head") || otherElement.endsWith("body")) {
				//i don't want to make general MPL handling so I'll just try to exclude them;
				if(otherElement !== "antibody") {
					//exclude antibody from exclusion
					return false;
				};
			};
			
			if(otherElement !== pixel.element) { //allow this element from piling on itself
				if(logLeaves) { console.log("Other element is not cherry leaves") }; //yes, this code is for cherry leaves
				if(react) { //if there was a reaction in that previous step
					if(logLeaves) { console.log("Reacting pixels") };
					reactPixels(otherPixel,pixel); //react
				} else { //if no such reaction existed, move through
					if(logLeaves) { console.log("Moving pixels") };
					if((otherState !== "solid") || (otherState === "solid" && otherDensity > 100)) { //admit any non-solid, or any solid with a density over 100
						var pX = pixel.x; //var pixel coords for no particular reason
						var pY = pixel.y;
						var oX = otherPixel.x; //var other pixel's coords for no particular reason
						var oY = otherPixel.y;
						if(logLeaves) { console.log(`${otherElement} pixel (${oX},${oY}) trying to move info leaf block (${pX},${pY})`) };
						var dX = oX - pX; //get the difference between this's X and other's X; if the other pixel is moving from the space immediately to the right, this dX value should be 1
						var dY = oY - pY;
						var iDX = -1 * dX; //get the additive inverse; if we want to move such a pixel from the right to the left, we would change its +1 X offset to a -1 X offset for the coord sto move it to
						var iDY = -1 * dY;
						if(logLeaves) { console.log(`Old offset (relative to leaf): [${dX},${dY}], new offset [${iDX},${iDY}]`) };
						var fX = pX + iDX; //combine this pixel's X with the inverted offset we just made;
										   //assuming this pixel is (23,31) and the other pixel is trying to move in to the left into this from (24,31),
										   //the dX would be [1, 0], signifying that the other pixel is 1 pixel to the right of this
										   //the space to the left of this, where it would go, is (22,31), and the offset for that pixel relative to this is [-1, 0]
										   //to get the [-1, 0], we'd need to flip that [1, 0] offset (lmao flip that the song by loona), hence the inverse
						var fY = pY + iDY;
						if(logLeaves) { console.log(`Calculated final position: (${fX},${fY}), moving other pixel from (${oX},${oY})`) };
						tryMove(otherPixel,fX,fY);
					};
				};
			};
		},
	};
	
	/*if(!elements.diamond.reactions) { //test reaction
		elements.diamond.reactions = {};
	};
	
	elements.diamond.reactions.cherry_leaf = { "elem2": "dead_plant" };*/

	elements.cherry_plant_top = {
		hidden: true,
		color: "#310a0b",
		tick: function(pixel) {
			if(pixel.cherryRange === null) {
				pixel.cherryRange = randomNumberFromOneToThree();
			};

			if (pixel.age > 30 && pixel.temp < 100) {
				if(!pixel.grewLeftLeaves) {
					for(i = (0 - pixel.leafRange); i < 0; i++) { //left half
						if(i == 0) {
							continue;
						};
						
						var leafOffset = i; //readability
						var leafX = pixel.x + leafOffset; //set X to cherry_plant_top pixel's X + offset/index
						var leafAttachOffset = [1, 0]; //difference 1: attaches rightwards (+) for leaves left (-) of center
						var leafY = pixel.y; //set Y to default cherry_plant_top pixel's Y
						if(Math.abs(leafOffset) == pixel.leafRange) {
							leafY++; //place edge leaves 1 pixel downwards;
							leafAttachOffset[1] = -1; //compensate by subtracting 1 from Y attach offset (less Y = higher position, so they attach diagonally up-right or up-left)
						};

						if(outOfBounds(leafX,leafY)) {
							continue;
						};

						if (isEmpty(leafX,leafY,false)) {
							createPixel("cherry_leaf",leafX,leafY);
							pixelMap[leafX][leafY].attached = true; //set leaf's attached to true
							pixelMap[leafX][leafY].attachOffsets = leafAttachOffset; //array of 2 numbers
							pixelMap[leafX][leafY].cherryRange = pixel.cherryRange;
							pixel.grewLeftLeaves = true; //difference 2: separate flag for left side
						} else {
							break;
						};
					};
				};

				if(!pixel.grewRightLeaves) {
					for(i = 1; i < (pixel.leafRange + 1); i++) { //right half
						if(i == 0) {
							continue;
						};
						
						var leafOffset = i; //readability
						var leafX = pixel.x + leafOffset; //set X to cherry_plant_top pixel's X + offset/index
						var leafAttachOffset = [-1, 0]; //difference 1: attaches leftwards (-) for leaves right (+) of center
						var leafY = pixel.y; //set Y to default cherry_plant_top pixel's Y
						if(Math.abs(leafOffset) == pixel.leafRange) {
							leafY++; //place edge leaves 1 pixel downwards;
							leafAttachOffset[1] = -1; //compensate by subtracting 1 from Y attach offset (less Y = higher position, so they attach diagonally up-right or up-left)
						};
						
						if(outOfBounds(leafX,leafY)) {
							continue;
						};

						if (isEmpty(leafX,leafY,false)) {
							createPixel("cherry_leaf",leafX,leafY);
							pixelMap[leafX][leafY].attached = true; //set leaf's attached to true
							pixelMap[leafX][leafY].attachOffsets = leafAttachOffset; //array of 2 numbers
							pixelMap[leafX][leafY].cherryRange = pixel.cherryRange;
							pixel.grewRightLeaves = true; //difference 2: separate flag for right side
						} else {
							break;
						};
					};
				};
			};
			pixel.age++;
			doDefaults(pixel);
		},
		properties: {
			"age": 0,
			"leafRange": 2 + (Math.floor(Math.random() * 3)), //2-4
			"grewLeftLeaves": false,
			"grewRightLeaves": false,
			"cherryRange": null,
		},
		tempHigh: 100,
		stateHigh: "dead_plant",
		tempLow: -2,
		stateLow: "frozen_plant",
		burn: 5,
		burnInto: ["steam", "ash"],
		burnTime: 600,
		category: "life",
		state: "solid",
		density: 1500,
	};


	/*elements.cocoa_bean = {
		color: ["#f2ede9", "#f0dfce", "#e8cfb5"],
		behavior: behaviors.SOLID,
		category: "liquids",
		viscosity: 100000,
		state: "liquid",
		density: 593,
		tick: functi
	};*/
} else {
	enabledMods.splice(enabledMods.indexOf(modName),0,onTryMoveIntoMod);
	enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod);
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert(`The ${onTryMoveIntoMod} mod and ${libraryMod} mods are required and have been automatically inserted (reload for this to take effect).`);
};
