//This mod is on indefinite hiatus

/*
TODO:
Fill in remaining IRs (if they exist, and i might make some up if they don't)
Soils
More sedimentary rocks
Metamorphic rocks
	Ersatz pressure
Merge crimson?
Proper classification of limestone within these code comments
*/

//Functions

	//Star world matter function

		var stellarPlasmaSpreadWhitelist = ["stellar_plasma","liquid_stellar_plasma","liquid_degenerate_neutronium","gaseous_degenerate_neutronium","neutron_star"];

		function starColor(pixel) {
			if (pixel.temp < 0) { pixel.color = pixelColorPick(pixel,"#615e5e"); var c=0 }
			else if (pixel.temp < 200) { pixel.color = pixelColorPick(pixel,"#6e4c4b"); var c=0 }
			else if (pixel.temp < 400) { pixel.color = pixelColorPick(pixel,"#944340"); var c=0.00003 }
			else if (pixel.temp < 650) { pixel.color = pixelColorPick(pixel,"#d14c47"); var c=0.0001 }
			else if (pixel.temp < 900) { pixel.color = pixelColorPick(pixel,"#e35b56"); var c=0.0004 }
			else if (pixel.temp < 1300) { pixel.color = pixelColorPick(pixel,"#eb6a6a"); var c=0.001 }
			else if (pixel.temp < 1500) { pixel.color = pixelColorPick(pixel,"#f27e7e"); var c=0.0025 }
			else if (pixel.temp < 1700) { pixel.color = pixelColorPick(pixel,"#f58e8e"); var c=0.004 }
			else if (pixel.temp < 2400) { pixel.color = pixelColorPick(pixel,"#f59a9a"); var c=0.007 }
			else if (pixel.temp < 3000) { pixel.color = pixelColorPick(pixel,"#faaaaa"); var c=0.01 }
			else if (pixel.temp < 3600) { pixel.color = pixelColorPick(pixel,"#ffbdbd"); var c=0.015 }
			else if (pixel.temp < 5000) { pixel.color = pixelColorPick(pixel,"#ffd5bd"); var c=0.025 }
			else if (pixel.temp < 6000) { pixel.color = pixelColorPick(pixel,"#ffe7bd"); var c=0.035 } //new in-between state because the transition is too jarring
			else if (pixel.temp < 7000) { pixel.color = pixelColorPick(pixel,"#ffffbd"); var c=0.05 } //most of these are not real because of the kid named Planckian locus, but it makes it more fun
			else if (pixel.temp < 9000) { pixel.color = pixelColorPick(pixel,"#feffd6"); var c=0.07 }
			else if (pixel.temp < 11000) { pixel.color = pixelColorPick(pixel,"#f7fff5"); var c=0.1 }
			else if (pixel.temp < 14000) { pixel.color = pixelColorPick(pixel,"#e3fcfc"); var c=0.125 }
			else if (pixel.temp < 17000) { pixel.color = pixelColorPick(pixel,"#d1f6ff"); var c=0.15 }
			else if (pixel.temp < 20000) { pixel.color = pixelColorPick(pixel,"#d1f0ff"); var c=0.175 }
			else if (pixel.temp < 27000) { pixel.color = pixelColorPick(pixel,"#bde0ff"); var c=0.2 }
			else if (pixel.temp < 34000) { pixel.color = pixelColorPick(pixel,"#bdd3ff"); var c=0.25 }
			else if (pixel.temp < 43500) { pixel.color = pixelColorPick(pixel,"#bdc7ff"); var c=0.3 }
			else if (pixel.temp < 50000) { pixel.color = pixelColorPick(pixel,"#c3bdff"); var c=0.4 }
			else if (pixel.temp < 56000) { pixel.color = pixelColorPick(pixel,"#c3bdff"); var c=0.45 }
			else if (pixel.temp < 61000) { pixel.color = pixelColorPick(pixel,"#bba9fc"); var c=0.5 }
			else if (pixel.temp < 66000) { pixel.color = pixelColorPick(pixel,"#a590f5"); var c=0.6 }
			else if (pixel.temp < 71000) { pixel.color = pixelColorPick(pixel,"#a68af2"); var c=0.7 }
			else { pixel.color = pixelColorPick(pixel,"#a26ffc"); var c=0.8 }
			return c;
		};
		
		function starLightAndConduction(pixel,c,whitelist=["sun"]) {
			for (var i = 0; i < adjacentCoords.length; i++) {
				var x = pixel.x+adjacentCoords[i][0];
				var y = pixel.y+adjacentCoords[i][1];
				if (isEmpty(x,y)) {
					if (Math.random() <= c) {
						createPixel("light", x, y);
						pixelMap[x][y].color = pixel.color;
					};
				} else if (!outOfBounds(x,y)) {
					var newPixel = pixelMap[x][y];
					//console.log(whitelist,newPixel.element,whitelist.includes(newPixel.element));
					if (pixel.temp!==newPixel.temp && whitelist.includes(newPixel.element)) {
						var avg = (pixel.temp + newPixel.temp)/2;
						pixel.temp = avg;
						newPixel.temp = avg;
						pixelTempCheck(pixel);
						pixelTempCheck(newPixel);
					}
				}
			}
		};

		ferromagneticMaterials = ["iron", "cobalt", "nickel", "steel", "hematite"];

		if(!enabledMods.includes("mods/code_library.js")) {
			//x = real number
			//L = maximum value
			//x_0 = "the x value of the sigmoid midpoint" i.e. the x center of the bendy part
			//k = steepness
			function logisticCurve(x,L,k,x0) {
				return L/(   1 + (  Math.E ** ( -k * (x - x0) )  )   );
			};

			// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
			// Function from August Miller
			function scale (number, inMin, inMax, outMin, outMax) {
				return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
			};
		};

		function neutronStarLightAndConduction(pixel,c,whitelist=["neutron_star"]) {
			var pixelAge = pixelTicks - pixel.start;
			var coolingFactor;
			var logistic = logisticCurve(pixelAge/1000, 1, 0.6, -7.7);
			if(pixel.temp > 1000000) {
				//console.log('case 1');
				coolingFactor = logistic
			};
			if(pixel.temp <= 1000000 && pixel.temp > 100000) {
				//console.log('case 2');
				//console.log("l",logistic);
				coolingFactor = scale(pixel.temp,1000000,100000,logistic,0.99999);
				//if(pixelAge % 10 == 0 || pixel.temp < 100500) { console.log(coolingFactor) };
			};
			if(pixel.temp < 100000) {
				//console.log('case 3');
				coolingFactor = 0.99999
			};
			//console.log(coolingFactor);
			pixel.temp = ((pixel.temp + 273.15) * coolingFactor) - 273.15;
			
			for (var i = 0; i < adjacentCoords.length; i++) {
				var x = pixel.x+adjacentCoords[i][0];
				var y = pixel.y+adjacentCoords[i][1];
				if (isEmpty(x,y)) {
					if (Math.random() <= c) {
						createPixel(Math.random() < 0.995 ? "light" : "neutron", x, y);
						pixelMap[x][y].color = pixel.color;
					};
				} else if (!outOfBounds(x,y)) {
					var newPixel = pixelMap[x][y];
					//console.log(elements[newPixel.element].conduct);
					if(ferromagneticMaterials.includes(newPixel.element) && (Math.random() < 0.1)) { newPixel.charge = 20 }; //no magnetism in sb
					//console.log(whitelist,newPixel.element,whitelist.includes(newPixel.element));
					if (pixel.temp!==newPixel.temp && whitelist.includes(newPixel.element)) {
						var avg = (pixel.temp + newPixel.temp)/2;
						pixel.temp = avg;
						newPixel.temp = avg;
						pixelTempCheck(pixel);
						pixelTempCheck(newPixel);
					}
				}
			}
		};

		function almostSun(pixel,lightScale=1,whitelist=["sun"]) {
			starLightAndConduction(pixel,starColor(pixel) * lightScale,whitelist);
		};
		
		function nsTick(pixel,lightScale=1,whitelist=["sun"]) {
			neutronStarLightAndConduction(pixel,starColor(pixel) * lightScale,whitelist);
		};
		
		elements.sun.tick = function(pixel) {
			almostSun(pixel);
		};

	//Generalized sedimentation function

		function sedimentation(pixel,sedimentNeighborTable,finalRock,chance=0.0003) {
			if(Math.random() < chance) {
				var validNeighborArray = Array.apply(null, Array(adjacentCoords.length)).map(function() {return false});
				//sedimentSandstoneTries++;
				for(i = 0; i < adjacentCoords.length; i++) {
					//sedimentSandstoneTryIterations++;
					if(isEmpty(pixel.x+adjacentCoords[i][0],pixel.y+adjacentCoords[i][1],true)) {
						validNeighborArray[i] = false;
						//sedimentSandstoneNoDetects++;
					} else if(!isEmpty(pixel.x+adjacentCoords[i][0],pixel.y+adjacentCoords[i][1],true)) {
						/*if(sedimentNeighborTable.includes(pixelMap[pixel.x+adjacentCoords[i][0]][pixel.y+adjacentCoords[i][1]].element)) {
							validNeighborArray[i] = true;
							//sedimentSandstoneDetects++;
						} else {
							validNeighborArray[i] = false;
							//sedimentSandstoneNoDetects++;
						};*/
						validNeighborArray[i] = sedimentNeighborTable.includes(pixelMap[pixel.x+adjacentCoords[i][0]][pixel.y+adjacentCoords[i][1]].element);
					};
				};
				if(validNeighborArray.includes(true)) {
					//sandstoneFormations++;
					changePixel(pixel,finalRock);
				}/* else {
					sandstoneFailures++;
				}*/;
			};
		};

	//Function for mass replacement according to an object

		function transformAround(pixel,range,substitutionObject,reverse=false) {
			var radius1 = (-1 * range);
			var radius2 = (range + 1);
			for (let i = radius1; i < radius2; i++) {
				for (let j = radius1; j < radius2; j++) {
					if(reverse) {
						if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
							var destPixel = pixelMap[pixel.x+j][pixel.y+i];
							var elementToCheck = destPixel.element;
							if(getKeyByValue(radioactiveObject,elementToCheck)) {
								changePixel(destPixel,getKeyByValue(radioactiveObject,elementToCheck));
							};
						};
					} else {
						if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
							var destPixel = pixelMap[pixel.x+j][pixel.y+i];
							var elementToCheck = destPixel.element;
							if(substitutionObject[elementToCheck]) {
								changePixel(destPixel,substitutionObject[elementToCheck]);
							};
						};
					};
				};
			};
		};

	//Previous function with adjacentPixels

		function transformAdjacent(pixel,substitutionObject,reverse=false) {
			for(k = 0; k < adjacentCoords.length; k++) {
				var i = adjacentCoords[k][0]
				var j = adjacentCoords[k][1]
				if(reverse) {
					if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
						var destPixel = pixelMap[pixel.x+j][pixel.y+i];
						var elementToCheck = destPixel.element;
						if(getKeyByValue(radioactiveObject,elementToCheck)) {
							changePixel(destPixel,getKeyByValue(radioactiveObject,elementToCheck));
						};
					};
				} else {
					if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
						var destPixel = pixelMap[pixel.x+j][pixel.y+i];
						var elementToCheck = destPixel.element;
						if(substitutionObject[elementToCheck]) {
							changePixel(destPixel,substitutionObject[elementToCheck]);
						};
					};
				};
			};
		};
		
//Terrain

	//Soils
	
		//Dry
		//Warning: Crippling lack of online information on the properties of the various soils by texture
		
			//Clay
			
				//Clay exists
			
			//Silty clay
				
				//TODO
				
			//Silty Clay Loam
				
				//TODO
				
			//Silty Loam
				
				//TODO
				
			//Silt
			
				//TODO
				
			//Clay Loam
			
				//TODO
				//elements.clay_soil.name = "Clay Loam"
				
			//Medium Loam
				
				//TODO
				//elements.dirt.name = "Medium Loam";
				
			//Sandy Clay
			
				/*elements.sandy_clay = {
					color: "#DDCD8A",
					behavior: behaviors.POWDER,
					tempHigh: 1710,
					tempLow: -50,
					stateLow: "sandy_clay_permafrost",
					category:"land",
					state: "solid",
					density: 1220,
				};*/
				
			//Sandy Clay Loam
			
				//TODO
				
			//Sandy Loam
			
				//TODO
				
			//Loamy Sand
			
				//TODO
				
			//Sand
			
				//Sand exists
				
		//Wet
		
			//Wet Clay
			
				//TODO
			
			//Wet Silty clay
				
				//TODO
				
			//Wet Silty Clay Loam
				
				//TODO
				
			//Wet Silty Loam
				
				//TODO
				
			//Wet Silt
			
				//TODO
				
			//Wet Clay Loam
			
				//TODO
				
			//Wet Medium Loam
				
				//Mud exists
				
			//Wet Sandy Clay
			
				//TODO
				
			//Wet Sandy Clay Loam
			
				//TODO
				
			//Wet Sandy Loam
			
				//TODO
				
			//Wet Loamy Sand
			
				//TODO
				
			//Wet Sand
			
				//Wet Sand exists
				
		//Permafrost

			//Clay Permafrost
			
				//TODO
			
			//Silty clay Permafrost
				
				//TODO
				
			//Silty Clay Loam Permafrost
				
				//TODO
				
			//Silty Loam Permafrost
				
				//TODO
				
			//Silt Permafrost
			
				//TODO
				
			//Clay Loam Permafrost
			
				//TODO
				
			//Medium Loam Permafrost
				
				//Permafrost exists
				
			//Sandy Clay Permafrost
			
				//TODO
				
			//Sandy Clay Loam Permafrost
			
				//TODO
				
			//Sandy Loam Permafrost
			
				//TODO
				
			//Loamy Sand Permafrost
			
				//TODO
				
			//Sand Permafrost
			
				//TODO

		//Radioactive (unmoved/TODO)
	
			//Dry
			
				//Radioactive Clay
				
					//Clay exists
				
				//Radioactive Silty clay
					
					//TODO
					
				//Radioactive Silty Clay Loam
					
					//TODO
					
				//Radioactive Silty Loam
					
					//TODO
					
				//Radioactive Silt
				
					//TODO
					
				//Radioactive Clay Loam
				
					//Clay Soil exists
					
				//Radioactive Medium Loam
					
					//Dirt exists
					
				//Radioactive Sandy Clay
				
					//TODO
					
				//Radioactive Sandy Clay Loam
				
					//TODO
					
				//Radioactive Sandy Loam
				
					//TODO
					
				//Radioactive Loamy Sand
				
					//TODO
					
				//Radioactive Sand
				
					//Sand exists
					
			//Wet
			
				//Radioactive Wet Clay
				
					//TODO
				
				//Radioactive Wet Silty clay
					
					//TODO
					
				//Radioactive Wet Silty Clay Loam
					
					//TODO
					
				//Radioactive Wet Silty Loam
					
					//TODO
					
				//Radioactive Wet Silt
				
					//TODO
					
				//Radioactive Wet Clay Loam
				
					//TODO
					
				//Radioactive Wet Medium Loam
					
					//Mud exists
					
				//Radioactive Wet Sandy Clay
				
					//TODO
					
				//Radioactive Wet Sandy Clay Loam
				
					//TODO
					
				//Radioactive Wet Sandy Loam
				
					//TODO
					
				//Radioactive Wet Loamy Sand
				
					//TODO
					
				//Radioactive Wet Sand
				
					//Wet Sand exists

			//Permafrost
					
				//Radioactive Clay Permafrost
				
					//TODO
				
				//Radioactive Silty clay Permafrost
					
					//TODO
					
				//Radioactive Silty Clay Loam Permafrost
					
					//TODO
					
				//Radioactive Silty Loam Permafrost
					
					//TODO
					
				//Radioactive Silt Permafrost
				
					//TODO
					
				//Radioactive Clay Loam Permafrost
				
					//TODO
					
				//Radioactive Medium Loam Permafrost
					
					//Permafrost exists
					
				//Radioactive Sandy Clay Permafrost
				
					//TODO
					
				//Radioactive Sandy Clay Loam Permafrost
				
					//TODO
					
				//Radioactive Sandy Loam Permafrost
				
					//TODO
					
				//Radioactive Loamy Sand Permafrost
				
					//TODO
					
				//Radioactive Sand Permafrost
				
					//TODO

	//Rocks
	
		//Igneous

			//Phaneritic

				//Felsic: granite

					elements.granite = {
						color: ["#F3C3AD", "#F0AB75", "#DDA888", "#BD927E", "#998473", "#5C5E53", "#BD8366"],
						behavior: behaviors.WALL,
						category: "land",
						tempHigh: 1215,
						stateHigh: "felsic_magma",
						density: 2691,
						hardness: 0.75,
						breakInto: "granite_gravel",
					};

					elements.granite_gravel = {
						color: ["#E3B39D", "#E09B65", "#CD9878", "#AD826E", "#897463", "#4C4E43", "#AD7356", "#F3C3AD", "#F0AB75", "#DDA888", "#BD927E", "#998473", "#5C5E53", "#BD8366", "#FFD3BD", "#FFBB85", "#EDB898", "#CDA28E", "#A99483", "#6C6E63", "#CD9376"],
						behavior: behaviors.POWDER,
						category: "land",
						tempHigh: 1215,
						stateHigh: "felsic_magma",
						density: 1320,
					};

					elements.felsic_magma = {
					  "reactions": {
						"magma": { "elem1": "intermediate_magma", "elem2": "intermediate_magma" },
						"ash": { "elem1": null, "elem2": "molten_slag" },
						"dust": { "elem1": null, "elem2": "molten_slag" },
					  },
					  "name": "felsic magma",
					  "color": ["#FFF457", "#FF9257", "#FF9200", "#FFD63B", "#FFAB3B", "#FF8000", "#FFD244", "#FFA844", "#FF7E00", "#FFB73F", "#FF923F", "#FF6E00", "#FFA53A", "#FF843A", "#FF6300", "#B8762A", "#B85E2A", "#B84700", "#FFA433", "#FF8333", "#FF6200"],
					  "behavior": behaviors.MOLTEN,
					  "temp": 1215,
					  "tempLow": 800,
					  "stateLow": ["rhyolite","rhyolite","rhyolite","granite"],
					  "viscosity": 100000000,
					  "hidden": true,
					  "state": "liquid",
					  "category": "molten",
					  "density": 2421.9
					};

				//Intermediate felsic: granodiorite (such a creative name)

					elements.granodiorite = {
						color: ["#B1AB9D", "#262001", "#A6A292", "#D6C5BC", "#F2F2F2", "#DED8C2", "#978871", "#A8AAA7"], //From image: By Rudolf Pohl - Own work, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=7788350
						behavior: behaviors.WALL,
						category: "land",
						tempHigh: 1050, //poorly searchable term, little findable information, idk if accurate
						stateHigh: "intermediate_felsic_magma",
						density: 2644, //last 2 digits made up again
						hardness: 0.75,
						breakInto: "granodiorite_gravel",
					};

					elements.granodiorite_gravel = {
						color: ["#A19B8D", "#161000", "#969282", "#C6B5AC", "#E2E2E2", "#CEC8B2", "#877861", "#989A97", "#B1AB9D", "#262001", "#A6A292", "#D6C5BC", "#F2F2F2", "#DED8C2", "#978871", "#A8AAA7", "#C1BBAD", "#363011", "#B6B2A2", "#E6D5CC", "#FFFFFF", "#EEE8D2", "#A79881", "#B8BAB7"], //placeholder
						behavior: behaviors.POWDER,
						category: "land",
						tempHigh: 1050,
						stateHigh: "intermediate_felsic_magma",
						density: 1296,
					};

					elements.intermediate_felsic_magma = {
					  "reactions": {
						"magma": { "elem1": "intermediate_magma", "elem2": "intermediate_magma" },
						"ash": { "elem1": null, "elem2": "molten_slag" },
						"dust": { "elem1": null, "elem2": "molten_slag" },
					  },
					  "name": "intermediate felsic magma",
					  "color": ["#FFD64F", "#FFAB4F", "#FF8000", "#7C5831", "#7C5031", "#7C5830", "#FFCB49", "#FFA249", "#FF7A00", "#FFF65E", "#FFC55E", "#FF9400", "#FFFF79", "#FFF279", "#FFB600", "#FFFF61", "#FFD861", "#FFA200", "#FFAA39", "#FF8839", "#FF6600", "#FFD554", "#FFAA54", "#FF8000"],
					  "behavior": behaviors.MOLTEN,
					  "temp": 1200,
					  "tempLow": 1050,
					  "stateLow": ["dacite","dacite","dacite","granodiorite"],
					  "viscosity": 18700000, //10^average of logarithms
					  "hidden": true,
					  "state": "liquid",
					  "category": "molten",
					  "density": 2320, //averaged lower values
					};

				//Intermediate: diorite

					elements.diorite = {
						color: ["#E1E1E1","#B0A696","#707271","#434459","#242424"], //Extracted from image and blended
						//By Michael C. Rygel - Own work, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=31124755
						behavior: behaviors.WALL,
						category: "land",
						tempHigh: 1300,
						stateHigh: "intermediate_magma",
						density: 2822, //last 2 digits made up.
						hardness: 0.70, //bs'd from MH rel to granite
						breakInto: "diorite_gravel",
					};

					elements.diorite_gravel = {
						color: ["#F1F1F1","#E1E1E1","#D1D1D1","#C0B6A6","#B0A696","#A09686","#808281","#707271","#606261","#535469","#434459","#333449","#343434","#242424","#141414"],
						behavior: behaviors.POWDER,
						category: "land",
						tempHigh: 1260,
						stateHigh: "intermediate_magma",
						density: 1717, //approximated from granite values
					};

					elements.intermediate_magma = {
						"reactions": {
							"ash": { "elem1": null, "elem2": "molten_slag" },
							"dust": { "elem1": null, "elem2": "molten_slag" },
						},
						"name": "intermediate magma",
						"color": ["#FFFF70", "#FFE170", "#FFA800", "#FFCF4B", "#FFA64B", "#FF7C00", "#E08E38", "#E07238", "#E05500", "#86552C", "#86442C", "#863300", "#482D12", "#482412", "#481B00"],
						"behavior": behaviors.MOLTEN,
						"temp": 1215,
						"tempLow": 1115,
						"stateLow": ["andesite", "andesite", "andesite", "diorite"],
						"viscosity": 350000,
						"hidden": true,
						"state": "liquid",
						"category": "molten",
						"density": 2450,
					}

				//Mafic: gabbro

					elements.magma.name = "mafic magma" //because it cools into basalt
					//the vanilla viscosity checks out
					elements.rock.name = "gabbro" //based on it melting into mostly basalt, I am assuming that this is mafic magma cooling quickly, and thus assuming that the remainder is magma cooling more slowly into a phaneritic rock, and that woudld be gabbro
					elements.magma.density = 2650

				//Ultramafic: peridotite

					elements.peridotite = {
						color: ["#908557","#A29E78","#7F8044","#C6BC87","#8C8656","#7C7C40","#837840","#8B8B69"],
						behavior: behaviors.WALL,
						category: "land",
						tempHigh: 1400,
						stateHigh: "ultramafic_magma",
						density: 3347, //appr from https://agupubs.onlinelibrary.wiley.com/doi/abs/10.1029/GL003i009p00509#:~:text=Abstract,and%20the%20bulk%20rock%20analyses.
						hardness: 0.76,
						breakInto: "peridotite_gravel",
					};

					elements.peridotite_gravel = {
						color: ["#807547","#928e68","#6f7034","#b6ac77","#7c7646","#6c6c30","#736830","#7b7b59","#908557","#a29e78","#7f8044","#c6bc87","#8c8656","#7c7c40","#837840","#8b8b69","#a09567","#b2ae88","#8f9054","#d6cc97","#9c9666","#8c8c50","#938850","#9b9b79"],
						behavior: behaviors.POWDER,
						category: "land",
						tempHigh: 1400,
						stateHigh: "ultramafic_magma",
						density: 1681,
					};

					elements.ultramafic_magma = {
					  "reactions": {
						"ash": { "elem1": null, "elem2": "molten_slag" },
						"dust": { "elem1": null, "elem2": "molten_slag" },
					  },
					  "name": "ultramafic magma",
					  "color": ["#ffa62b","#ff852b","#ff6300","#ffc53c","#ff9e3c","#ff7600","#fea022","#fe8022","#fe6000","#ffeb43","#ffbc43","#ff8d00","#ffa72b","#ff862b","#ff6400","#f89b20","#f87c20","#f85d00","#ff9620","#ff7820","#ff5a00","#ffad34","#ff8b34","#ff6800"],
					  "behavior": behaviors.MOLTEN,
					  "temp": 1500,
					  "tempLow": 1390,
					  "stateLow": ["peridotite","komatiite","komatiite","komatiite"],
					  "viscosity": 100,
					  "hidden": true,
					  "state": "liquid",
					  "category": "molten",
					  "density": 2800
					};

			//Aphanitic

				//Felsic: rhyolite

					elements.rhyolite = {
						color: ["#A67153","#BF967E","#D9B5A0","#8C533E","#C99F86","#C5997E","#BB8A69"],
						// also from one of Michael C. Rygel's images
						behavior: behaviors.WALL,
						category: "land",
						tempHigh: 800,
						stateHigh: "felsic_magma",
						density: 2555, //very wide range
						hardness: 0.75,
						breakInto: "rhyolite_gravel",
					};

					elements.rhyolite_gravel = {
						color: ["#B68163","#A67153","#966143","#CFA68E","#BF967E","#AF866E","#E9C5B0","#D9B5A0","#C9A590","#9C634E","#8C533E","#7C432E","#D9AF96","#C99F86","#B98F76","#D5A98E","#C5997E","#B5896E","#CB9A79","#BB8A69","#DB7A59"],
						behavior: behaviors.POWDER,
						category: "land",
						tempHigh: 800,
						stateHigh: "felsic_magma",
						density: 1254, //approximated from granite values
					};

				//Intermediate felsic: dacite

					elements.dacite = {
						color: ["#D9CCC5", "#F2E9E4", "#877670", "#A69B97"],
						behavior: behaviors.WALL,
						category: "land",
						tempHigh: 1050,
						stateHigh: "intermediate_felsic_magma",
						density: 2654, //https://books.google.ca/books?id=ObUPAAAAIAAJ&pg=PA181&lpg=PA181&dq=dacite+specific+gravity&source=bl&ots=qn8B4sirWi&sig=Wp_MHqPuUGPNQobcuNP5c5wqkpU&hl=en&sa=X&ei=cimtUaH8Eab7yAH8joDABQ#v=onepage&q=dacite%20specific%20gravity&f=false
						hardness: 0.75,
						breakInto: "dacite_gravel",
					};

					elements.dacite_gravel = {
						color: ["#C9BCB5", "#E2D9D4", "#776660", "#968B87", "#D9CCC5", "#F2E9E4", "#877670", "#A69B97", "#E9DCD5", "#FFF9F4", "#978680", "#B6ABA7"], //placeholder
						behavior: behaviors.POWDER,
						category: "land",
						tempHigh: 1050,
						stateHigh: "intermediate_felsic_magma",
						density: 1300,
					};

				//Intermediate: andesite

					elements.andesite = {
						color: ["#6F7575", "#C5C9CB", "#818787", "#797F7F", "#B5B9BA", "#6D7371", "#909696"],
						behavior: behaviors.WALL,
						category: "land",
						tempHigh: 1215,
						stateHigh: "intermediate_magma",
						density: 2474, //it varies very widely, so I made the last 2 digits up.
						hardness: 0.75,
						breakInto: "andesite_gravel",
					};

					elements.andesite_gravel = {
						color: ['#5f6565', '#b5b9bb', '#717777', '#696f6f', '#a5a9aa', '#5d6361', '#808686', '#6f7575', '#c5c9cb', '#818787', '#797f7f', '#b5b9ba', '#6d7371', '#909696', '#7f8585', '#d5d9db', '#919797', '#898f8f', '#c5c9ca', '#7d8381', '#a0a6a6'],
						behavior: behaviors.POWDER,
						category: "land",
						tempHigh: 1260,
						stateHigh: "intermediate_magma",
						density: 1214, //approximated from granite values
					};

				//Mafic: basalt

					//No changes from vanilla

				//Ultramafic: komatiite

					elements.komatiite = {
						color: ["#AEB5AE","#A9B8B5","#7B8881","#858B87","#949F97","#505B55"],
						behavior: behaviors.WALL,
						category: "land",
						tempHigh: 1600,
						stateHigh: "ultramafic_magma",
						density: 3100, //approximate density extrapolated from intermediate and mafic density
						//the magma's density is more well-known but there's nothing on the solid rock (probably because it's so rare and often metamorphosed)
						hardness: 0.75,
						breakInto: "komatiite_gravel",
					};

					elements.komatiite_gravel = {
						color: ["#9ea59e","#99a8a5","#6b7871","#757b77","#848f87","#404b45","#aeb5ae","#a9b8b5","#7b8881","#858b87","#949f97","#505b55","#bec5be","#b9c8c5","#8b9891","#959b97","#a4afa7","#606b65"],
						behavior: behaviors.POWDER,
						category: "land",
						tempHigh: 1600,
						stateHigh: "ultramafic_magma",
						density: 1650, //approximated from granite values
					};

			//Vesicular

				//Felsic: pumice

					//Pumice goes here

				//Intermediate felsic: ???

					//???

				//Intermediate: scoria

					//Scoria

				//Mafic: still scoria

					//Also scoria
					//Perhaps a "mafic_scoria"-"intermediate scoria" split if the literature allows

				//Ultramafic: ???

					//???

			//Glassy

				//Felsic: obsidian

					//Obsidian

				//Intermediate felsic: ???

					//???

				//Intermediate: ???

					//???

				//Mafic: ???

					//???

				//Ultramafic: ???

					//???

		//Sedimentary

			//Chemical
			
			//Clastic
				
				//Grains < 1/16 mm
			
				//Grains 1/16-2 mm
				//Partly intermingled with the radiation cult
				
					//Dummied-out debug counters

						/*sedimentSandstoneTries = 0;
						sedimentSandstoneTryIterations = 0;
						sedimentSandstoneDetects = 0;
						sedimentSandstoneNoDetects = 0;
						sandstoneFormations = 0;
						sandstoneFailures = 0;*/
				
					//Elements from which simplified lithification can spread

						sandstoneLithificationElements = ["sand_sediment", "sandstone", "radioactive_sand_sediment", "radioactive_sandstone"/*, "crimson_sandstone", "crimson_sand_sediment"*/]

					//Water reaction to pick up the fine material (this is very simplified)

						elements.water.reactions.wet_sand = {
							"elem1": "sandy_water",
							"elem2": ["wet_sand","wet_sand","wet_sand","sandy_water"],
							chance: 0.01
						};

						elements.water.reactions.radioactive_wet_sand = {
							"elem1": "radioactive_sandy_water",
							"elem2": ["radioactive_wet_sand","radioactive_wet_sand","radioactive_wet_sand","radioactive_wet_sand","radioactive_wet_sand",null],
							chance: 0.01
						};

						/*elements.water.reactions.crimson_wet_sand = { /
							"elem1": "crimson_sandy_water",
							"elem2": ["crimson_wet_sand","crimson_wet_sand","crimson_wet_sand","crimson_wet_sand","crimson_wet_sand",null],
							chance: 0.01
						};*/

					//Sediment suspension

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
								"water": { "elem1":"water", "elem2":"sandy_water", "chance":0.025 }, //swap reaction
								"sand": { "elem1": [null,null,"wet_sand"], "elem2": "wet_sand", }, 
								"sandy_water": { "elem1":"water", "elem2":"sand_sediment", "chance": 0.001 }, 
								"wet_sand": { "elem1": "water", "elem2":"sand_sediment", "chance": 0.0005 },
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

					//Sediment element where lithification code resides

						elements.sand_sediment = {
							hidden: true,
							color: "#d3b387",
							hardness: 0.2,
							behavior: [
								"XX|XX|XX",
								"XX|XX|XX",
								"SW:wet_sand%1.5 AND M2|SW:wet_sand%2.5 AND M1|SW:wet_sand%1.5 AND M2"
							],
							reactions: {
								"water": { "elem1":"sandy_water", "elem2":"sandy_water", "chance":0.001 },
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
								sedimentation(pixel,sandstoneLithificationElements,"sandstone")
							},
						}

					//Reactions to add

						elements.wet_sand.reactions.sand_sediment = {
							elem1: "sand_sediment",
							chance: 0.0003
						};

						elements.wet_sand.reactions.wet_sand = {
							elem1: "sand_sediment",
							chance: 0.0003
						};

					//Final rock

						elements.sandstone = {
							color: ["#b27853", "#d1a784", "#d1a784", "#d4996e"],
							behavior: behaviors.WALL,
							tempHigh: 1500,
							stateHigh: "molten_glass",
							category: "land",
							state: "solid",
							density: 2323, //wide range
							hardness: 0.5,
							breakInto: "sand",
						}

					//Worldgen preset for testing

						worldgentypes.sandstone_test_ocean = {
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
						};

					//Changes to vanilla desert

						worldgentypes.desert = {
							layers: [
								[0.95, "gravel", 0.6],
								[0.65, "bone", 0.03],
								[0.65, "sand"],
								[0.55, "bone", 0.02],
								[0.3, "sandstone"],
								[0.05, "rock"],
								[-0.78, "basalt"]
							],
							temperature: 38
						};
						
				//Grains > 2 mm
				
					//Angular fragments

						//Breccia

					//Rounded fragments
					
						//Conglomerate
	
	//Gems
	  //There is a mineral classification scheme, but it will take a while to implement if I ever get around to it.
	  //We're assuming that the crystal structures reform properly because I don't want to have to research and implement refrozen amorphous forms.

		//Emerald
		
			elements.emerald = {
				color: ["#31e31e", "#88fa5a", "#28d419", "#54e823", "#64f235"],
				tempHigh: 1287,
					//1: I can't be arsed to find out what happens to emerald in extreme heat. Apparently, neither can anyone else, and Google is useless for this.
					//2: So I'm just assuming that the chromium impurities are polite and remain in solution with the molten beryl.
				behavior: behaviors.POWDER,
				category: "powders",
				state: "solid",
				density: 2710, //within natural variation
				hardness: 0.8, //Mohs scaled to diamond
			};

		//Amethyst

			elements.amethyst = {
				color: ["#c569e0", "#bd43e0", "#e37aeb", "#ab2fe0", "#b05bd4", "#9b2cdb"],
				tempHigh: 1650,
				//1: Gee, another quartz-like...
				//2: Like with emerald, I'm trusting the impurities to stay dissolved because I don't exactly have any amethyst laying around to melt.
				behavior: behaviors.POWDER,
				category: "powders",
				state: "solid",
				density: 2650,
				hardness: 0.7,
			};

		//Sapphire

			elements.sapphire = {
				color: ["#2d43e3", "#4d5fe3", "#1f30cc", "#375fdb", "#2d39e3"],
				tempHigh: 2040,
					//1: You can actually grow corundum-based gems through the Verneuil process
				behavior: behaviors.POWDER,
				category: "powders",
				state: "solid",
				density: 3980,
				hardness: 0.9,
			}

		//Ruby

			elements.ruby = {
				//Corundum with different impurities, so I can copy/paste everything but the color
				color: ["#ff1222", "#ff4545", "#e30b13", "#fa253b", "#f2120f"],
				tempHigh: 2040,
				behavior: behaviors.POWDER,
				category: "powders",
				state: "solid",
				density: 3980,
				hardness: 0.9,
			}

		//Topaz

			elements.topaz = {
				color: ["#f7f431", "#ffff5c", "#f7e048", "#fae43e", "#fff86e", "#ede321"],
				tempHigh: 1340,
				stateHigh: "mullite", //thermal decomposition
				behavior: behaviors.POWDER,
				category: "powders",
				state: "solid",
				density: 3500,
				hardness: 0.8,
			};
			
		//Mullite

			elements.mullite = {
				color: ["#f2d7bf", "#f5cbdc", "#f2dfd3"], //hardly a gemstone, but i will color it like the others regardless
				tempHigh: 1840,
				behavior: behaviors.POWDER,
				category: "powders",
				state: "solid",
				density: 3110,
				hardness: 0.7,
			};

		//Onyx

			elements.onyx = {
				color: ["#1a1919", "#070605", "#111313"],
				tempHigh: 1650, //another  silicate  mineral
				behavior: behaviors.POWDER,
				category: "powders",
				state: "solid",
				density: 2650,
				hardness: 0.7,
			};

		//Opal

			elements.opal = {
				color: ["#ffcfcf", "#fff0d9", "#fcf7c5", "#e4ffd4", "#d1fff5", "#dcecfa", "#dfdbff", "#f5e0ff", "#f7d0f1"],
				tempHigh: 100,
				stateHigh: ["broken_opal", "broken_opal", "broken_opal", "broken_opal", "broken_opal", "broken_opal", "broken_opal", "broken_opal", "broken_opal", "steam"],
				behavior: behaviors.POWDER,
				category: "powders",
				state: "solid",
				density: 2090,
				hardness: 0.6,
				breakInto: ["quartz", "quartz", "quartz", "quartz", "quartz", "quartz", "quartz", "quartz", "quartz", "water"],
			};

			elements.broken_opal = {
				color: ["#f5e6e6", "#ebe2d5", "#f7f6ed", "#e4eddf", "#d8ebe7", "#d8e0e8", "#e4e3e8", "#f4edf7", "#ebebeb"],
				tempHigh: 1650,
				stateHigh: "molten_quartz",
				behavior: behaviors.POWDER,
				category: "powders",
				state: "solid",
				density: 2322,
				hardness: 0.55, //it cracks
			};

		//Quartz

			elements.quartz = { //silicates, silicates, and more silicates
				color: ["#f0f0f0", "#e3e3e3", "#f7f7f7"],
				tempHigh: 1650, 
				behavior: behaviors.POWDER,
				category: "powders",
				state: "solid",
				density: 2650,
				hardness: 0.7,
			};

			//Re-add molten quartz because it stopped auto-generating
			
			elements.molten_quartz = {"behavior":behaviors.MOLTEN,"hidden":true,"state":"liquid","category":"states","color":['#ffff78', '#fff078', '#ffb400', '#ffff71', '#ffe371', '#ffaa00', '#ffff7b', '#fff77b', '#ffb900'],"temp":1650,"tempLow":1550,"stateLow":"quartz","density":2385,"viscosity":10000,"reactions":{"ash":{"elem1":null,"elem2":"molten_slag"},"dust":{"elem1":null,"elem2":"molten_slag"},"magma":{"elem1":null,"elem2":"molten_slag"}},"movable":true}

			//Use in glass

			elements.molten_quartz.reactions = {
				quicklime: { elem1: "molten_glass", elem2: ["quicklime", "quicklime", "quicklime", "quicklime", "quicklime", "quicklime", "quicklime", "quicklime", "quicklime", null]} //lack of vanilla washing soda, lack of tripartite reactions
			};
			/*
			elements.elem1.reactions = {
				elem2: { elem1: "elem1_becomes", elem2: "elem2_becomes"}
			};
			*/
		
		//Pearl (not a mineral)

			elements.pearl = {
				color: ["#e3e3e3", "#e3e0d1", "#eddbce", "#eef2c9", "#d5f5dc", "#d8f2ec", "#fadcf9", "#e3d1c1", "#f2edc9", "#e0f5d7", "#e2beeb", "#e3e3e3", "#e3e0d1", "#eddbce", "#eef2c9", "#d5f5dc", "#d8f2ec", "#fadcf9", "#e3d1c1", "#f2edc9", "#e0f5d7", "#e2beeb", 	"#38332e"],
				tempHigh: 1340, //yay, more thermal decomposition elements
				behavior: behaviors.POWDER,
				category: "powders",
				state: "solid",
				density: 772, //It is partly made of proteins and is said to burn, but I can't find an ignition point, so here it melts.
				hardness: 0.45,
			};

	//Soil

		//Dry dirt

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
			elements.water.reactions.radioactive_dry_dirt = { elem1: null, elem2: "radioactive_dirt", chance: 0.1 }

			if(!elements.mud.reactions) {
				elements.mud.reactions = {};
			};
			elements.mud.reactions.dry_dirt = { elem1: "dirt", elem2: "dirt", chance: 0.06 }
			elements.mud.reactions.radioactive_dry_dirt = { elem1: "radioactive_dirt", elem2: "radioactive_dirt", chance: 0.06 }

	//Land Element Cults
		/*
		"Cult" is used similarly to its EoD sense; here, it signifies a set of elements that systematically replicates another set of elements except for a given modification.
		In this case, they replicate some land elements; a "yellow" cult, for example, would have yellow_dirt, yellow_mud, yellow_mudstone, yellow_permafrost, yellow_sand...
		*/

		//Radioactive land

			//Radioactive behavior cult (see above)

				behaviors.RAD_POWDER = [
					"XX|CR:radiation%2|XX",
					"CR:radiation%2|HT%1.5|CR:radiation%2",
					"M2|M1 AND CR:radiation%2|M2",
				],
				behaviors.RAD_STURDYPOWDER = [
					"XX|CR:radiation%2|XX",
					"CR:radiation%2|HT%1.5|CR:radiation%2",
					"XX|M1 AND CR:radiation%2|XX",
				],
				behaviors.RAD_SUPPORT = [
					"CR:radiation%1|CR:radiation%2|CR:radiation%1",
					"SP AND CR:radiation%2|HT%1.5|SP AND CR:radiation%2",
					"XX|M1 AND CR:radiation%2|XX",
				],
				behaviors.RAD_SUPPORTPOWDER = [
					"CR:radiation%1|CR:radiation%2|CR:radiation%1",
					"SP AND CR:radiation%2|HT%1.5|SP AND CR:radiation%2",
					"M2|M1 AND CR:radiation%2|M2",
				],
				behaviors.RAD_LIQUID = [
					"XX|CR:radiation%2|XX",
					"M2 AND CR:radiation%2|HT%1.5|M2 AND CR:radiation%2",
					"M1|M1 AND CR:radiation%2|M1",
				],
				behaviors.RAD_WALL = [
					"CR:radiation%0.7|CR:radiation%1.4|CR:radiation%0.7",
					"CR:radiation%1.4|HT%1.50000000000|CR:radiation%1.4",
					"CR:radiation%0.7|CR:radiation%1.4|CR:radiation%0.7",
				],
				behaviors.RAD_GAS = [
					"M2 AND CR:radiation%1.0|M1 AND CR:radiation%2|M2 AND CR:radiation%1",
					"M1 AND CR:radiation%2|HT%1 AND CR:radiation%2|M1 AND CR:radiation%2",
					"M2 AND CR:radiation%1.0|M1 AND CR:radiation%2|M2 AND CR:radiation%1",
				],
				behaviors.RAD_MOLTEN = [
					"XX|CR:radiation%2.5 AND CR:fire%2.5|XX",
					"M2 AND CR:radiation%1|HT%2|M2 AND CR:radiation%1",
					"M1|M1 AND CR:radiation%1|M1",
				]

				//console.log(behaviors.RAD_POWDER) //forcing it to acknowledge the behaviors i just added instead of giving me "undefined"
				
			//Setting reactions (we'll define the elements later)
			
				var namelessArray = ["dirt","sand","mud","wet_sand"];
				for(i = 0; i < namelessArray.length; i++) {
					var elementt = namelessArray[i];
					if(!elements[elementt].reactions) {
						elements[elementt].reactions = {};
					};
				};
			
				elements.water.reactions.radiation = { elem1: "radioactive_water", elem2: null, chance:0.25 },
				elements.radiation.reactions.water = { elem2: "radioactive_water", elem1: null, chance:0.25 },
				elements.dirt.reactions.radiation = { elem1: "radioactive_dirt", elem2: null, chance:0.25 },
				elements.radiation.reactions.dirt = { elem2: "radioactive_dirt", elem1: null, chance:0.25 },
				elements.sand.reactions.radiation = { elem1: "radioactive_sand", elem2: null, chance:0.25 },
				elements.radiation.reactions.sand = { elem2: "radioactive_sand", elem1: null, chance:0.25 },
				elements.mud.reactions.radiation = { elem1: "radioactive_mud", elem2: null, chance:0.25 },
				elements.radiation.reactions.mud = { elem2: "radioactive_mud", elem1: null, chance:0.25 },
				elements.wet_sand.reactions.radiation = { elem1: "radioactive_wet_sand", elem2: null, chance:0.25 },
				elements.radiation.reactions.wet_sand = { elem2: "radioactive_wet_sand", elem1: null, chance:0.25 },

			//Substitution table

				radioactiveObject = {
					dirt:				"radioactive_dirt",
					dry_dirt:			"radioactive_dry_dirt",
					molten_dirt:		"molten_radioactive_dirt",
					glass:				"radioactive_glass",
					molten_glass:		"molten_radioactive_glass",
					glass_shard:		"radioactive_glass_shard",
					sand:				"radioactive_sand",
					mud:				"radioactive_mud",
					wet_sand:			"radioactive_wet_sand",
					water:				"radioactive_water",
					permafrost:			"radioactive_permafrost",
					dry_permafrost:		"radioactive_dry_permafrost",
					mudstone:			"radioactive_mudstone",
					packed_sand:		"radioactive_packed_sand",
					ice:				"radioactive_ice",
					snow:				"radioactive_snow",
					packed_snow:		"radioactive_packed_snow",
					rain_cloud:			"rad_cloud",
					snow_cloud:			"rad_snow_cloud",
					snow_cloud_floater:	"rad_snow_cloud_floater",
					rock:				"radioactive_rock",
					gravel:				"radioactive_gravel",
					basalt:				"radioactive_basalt",
					magma:				"radioactive_magma",
					sandstone:			"radioactive_sandstone",
					sand_sediment: 		"radioactive_sand_sediment"
				};
				
				if(enabledMods.includes("mods/glenn_gases.js")) {
					radioactiveObject.rock_dust = "radioactive_rock_dust";
				};
			
				if(enabledMods.includes("mods/fire_mod.js")) {
					radioactiveObject.fire = "rad_fire";
					radioactiveObject.torch = "rad_torch";
				};
			
				if(enabledMods.includes("mods/structure_test.js")) {
					radioactiveObject.glass = "rad_glass";
					radioactiveObject.glass_pane = "rad_glass_pane";
					radioactiveObject.glass_shard = "rad_glass_shard";
				};
			
			//Reverse lookup function

				function getKeyByValue(object, value) {
				  return Object.keys(object).find(key => object[key] === value);
				}
				//getKeyByValue code by UncleLaz on StackOverflow: https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value"

			//Main elements

				elements.radioactive_dirt = {
					color: ["#70762b","#4c5c21","#50571a","#4c6b1e"],
					behavior: behaviors.RAD_POWDER,
					tempHigh:110,
					stateHigh: "radioactive_dry_dirt",
					reactions: {
						"dirt": { "elem1":"dirt", "elem2":"radioactive_dirt", "chance":0.0005, "oneway":true },
						"dry_dirt": { "elem1":"radioactive_dry_dirt", "elem2":"radioactive_dirt", "chance":0.0005, "oneway":true },
						"radioactive_dry_dirt": { "elem1":"radioactive_dry_dirt", "elem2":"radioactive_dirt", "chance":0.0005, "oneway":true },
					},
					tempLow: -50,
					stateLow: "radioactive_permafrost",
					category: "Radioactive",
					state: "solid",
					density: 1220,
				};

				elements.radioactive_dry_dirt = {
					color: ["#8aa85e","#999c5d","#7f8a45","#b5ad59"],
					behavior: [
						"XX|SW:radioactive_dirt%3 AND SW:radioactive_mud%6 AND CR:radiation%2|XX",
						"AND CR:radiation%2|HT%1.5|CR:radiation%2",
						"M2|M1 AND CR:radiation%2|M2",
					],
					tempHigh:1200,
					stateHigh: "molten_radioactive_dirt",
					tempLow: -50,
					stateLow: "radioactive_dry_permafrost",
					category:"land",
					state: "solid",
					density: 1100,
				},

				elements.molten_radioactive_dirt = {
					"behavior": behaviors.RAD_MOLTEN,
					"hidden": true,
					"state": "liquid",
					"category": "Radioactive",
					"color": ["#e09315", "#e07615", "#e05800", "#987310", "#985c10", "#984500", "#a06c0d", "#a0570d", "#a04100", "#98850f", "#986b0f", "#985000"],
					"temp": 1250,
					"tempLow": 1100,
					"stateLow": "radioactive_dirt",
					"density": 1098,
					"viscosity": 10000
				}

				elements.radioactive_glass = {
					color: ["#597a58","#719171"],
					colorOn: ["#6dab67","#88b567"],
					behavior: behaviors.RAD_WALL,
					tempHigh: 1500,
					category: "solids",
					state: "solid",
					density: 2500,
					breakInto: "radioactive_glass_shard",
					conduct: 0.01,
				};

				elements.molten_radioactive_glass = {
					behavior: behaviors.RAD_MOLTEN,
					category: "Radioactive",
				};

				elements.radioactive_glass_shard = {
					color: ["#597a58","#719171", "#628263"],
					colorOn: ["#6dab67","#88b567", "#7bad6f"],
					behavior: behaviors.RAD_POWDER,
					tempHigh: 1500,
					stateHigh: "molten_radioactive_glass",
					category: "powders",
					state: "solid",
					density: 2500,
					conduct: 0.01,
				};

				elements.radioactive_sand = {
					color: "#cbdb7b",
					behavior: behaviors.RAD_POWDER,
					tempHigh: 1700,
					stateHigh: "molten_radioactive_glass",
					category: "Radioactive",
					state: "solid",
					density: 1602
				};

				elements.radioactive_mud = {
					color: "#3c401c",
					behavior: behaviors.RAD_STURDYPOWDER,
					reactions: {
						"dry_dirt": { "elem1": "radioactive_dirt", "elem2": "radioactive_dirt", chance: 0.06 },
						"radioactive_dirt": { "elem1":"radioactive_dirt", "elem2":"radioactive_mud", "chance":0.0005, "oneway":true },
						"radioactive_sand": { "elem1":"radioactive_dirt", "elem2":"radioactive_wet_sand", "chance":0.0005, "oneway":true },
						"sand": { "elem1":"radioactive_dirt", "elem2":"radioactive_wet_sand", "chance":0.0005, "oneway":true },
						"dirt": { "elem1":"radioactive_dirt", "elem2":"radioactive_mud", "chance":0.0005, "oneway":true },
					},
					tempHigh: 100,
					stateHigh: "radioactive_mudstone",
					tempLow: -50,
					stateLow: "radioactive_permafrost",
					category: "Radioactive",
					state: "solid",
					density: 1730,
					stain: 0.02,
				};

				elements.radioactive_wet_sand = {
					color: ["#848c3a","#969e4c"],
					behavior: behaviors.RAD_STURDYPOWDER,
					reactions: {
						"radioactive_sand": { "elem1":"radioactive_sand", "elem2":"radioactive_wet_sand", "chance":0.0005, "oneway":true },
						"radioactive_dirt": { "elem1":"radioactive_sand", "elem2":"radioactive_mud", "chance":0.0005, "oneway":true },
						"sand": { "elem1":"radioactive_sand", "elem2":"radioactive_wet_sand", "chance":0.0005, "oneway":true },
						"dirt": { "elem1":"radioactive_sand", "elem2":"radioactive_mud", "chance":0.0005, "oneway":true },
						"wet_sand": { "elem1":"radioactive_sand", "elem2":"radioactive_sand_sediment", "chance":0.0005, "oneway":true },
						"sand_sediment": { "elem1":"radioactive_sand", "elem2":"radioactive_sand_sediment", "chance":0.0005, "oneway":true },
						"radioactive_wet_sand": { "elem1":"radioactive_sand", "elem2":"radioactive_sand_sediment", "chance":0.0005, "oneway":true },
						"radioactive_sand_sediment": { "elem1":"radioactive_sand", "elem2":"radioactive_sand_sediment", "chance":0.0005, "oneway":true },
					},
					tempHigh: 100,
					stateHigh: "radioactive_packed_sand",
					category: "Radioactive",
					state: "solid",
					density: 1905,
				};

				elements.radioactive_sandy_water = {
					color: ["#84A244", "#90AE50"],
					behavior: behaviors.RAD_LIQUID,
					tempHigh: 100,
					stateHigh: ["rad_steam","rad_steam","radioactive_sand"],
					//tempLow: 0,
					//stateLow: "radioactive_sandy_ice",
					category: "Radioactive",
					heatCapacity: 4.184, //unimplemented
					reactions: {
						"dirt": { // React with (water reacts with dirt to make mud)
							"elem1": [null,null,"radioactive_wet_sand"], // First element transforms into; in this case, water deletes itself
							"elem2": "radioactive_mud", // Second element transforms into; in this case, dirt turns to mud
						},
						"radioactive_dirt": { // React with (water reacts with dirt to make mud)
							"elem1": [null,null,"radioactive_wet_sand"], // First element transforms into; in this case, water deletes itself
							"elem2": "radioactive_mud", // Second element transforms into; in this case, dirt turns to mud
						},
						"water": { "elem1":"radioactive_water", "elem2":"radioactive_sandy_water", "chance":0.025 },
						"radioactive_water": { "elem1":"radioactive_water", "elem2":"radioactive_sandy_water", "chance":0.025 },
						"sand": { "elem1": [null,null,"radioactive_wet_sand"], "elem2": "radioactive_wet_sand", },
						"radioactive_sand": { "elem1": [null,null,"radioactive_wet_sand"], "elem2": "radioactive_wet_sand", },
						"sandy_water": { "elem1":"radioactive_wet_sand", "elem2":"radioactive_sand_sediment", "chance": 0.001 },
						"radioactive_sandy_water": { "elem1":"radioactive_wet_sand", "elem2":"radioactive_sand_sediment", "chance": 0.001 },
						"wet_sand": { "elem1": "radioactive_water", "elem2":"radioactive_sand_sediment", "chance": 0.0005 },
						"radioactive_wet_sand": { "elem1": "radioactive_water", "elem2":"radioactive_sand_sediment", "chance": 0.0005 },
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
						"mudstone": { "elem2": "radioactive_mud", "chance": 0.00035 },
						"radioactive_mudstone": { "elem2": "radioactive_mud", "chance": 0.00035 },
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

				elements.radioactive_sand_sediment = {
					hidden: true,
					color: "#afd182",
					hardness: 0.2,
					behavior: [
						"XX|XX|XX",
						"XX|XX|XX",
						"SW:wet_sand,radioactive_wet_sand%1.5 AND M2|SW:wet_sand,radioactive_wet_sand%2.5 AND M1|SW:wet_sand,radioactive_wet_sand%1.5 AND M2"
					],
					reactions: {
						"water": { "elem1":"radioactive_sandy_water", "elem2":"radioactive_sandy_water", "chance":0.025 },
						"radioactive_water": { "elem1":"radioactive_sandy_water", "elem2":"radioactive_sandy_water", "chance":0.025 },
						"sand": { "elem1": [null,null,"radioactive_wet_sand"], "elem2": "radioactive_wet_sand", },
						"radioactive_sand": { "elem1": [null,null,"radioactive_wet_sand"], "elem2": "radioactive_wet_sand", },
						"sandy_water": { "elem1":["radioactive_water","radioactive_water","radioactive_sand_sediment"], "chance":0.001 },
						"radioactive_sandy_water": { "elem1":["radioactive_water","radioactive_water","radioactive_sand_sediment"], "chance":0.001 },
						"wet_sand": { "elem2": "radioactive_sand_sediment", "chance": 0.0005 },
						"radioactive_wet_sand": { "elem2": "radioactive_sand_sediment", "chance": 0.0005 },
					},
					tempHigh: 1700,
					stateHigh: "molten_radioactive_glass",
					category: "Radioactive",
					state: "solid",
					density: 1602,
					breakInto: "radioactive_sand",
					tick: function(pixel) {
						sedimentation(pixel,sandstoneLithificationElements,"radioactive_sandstone")
					},
				}

				elements.radioactive_sandstone = {
					color: ["#85b357", "#b5d177", "#9cd184", "#7bc25f"],
					behavior: behaviors.RAD_WALL,
					tempHigh: 1500,
					stateHigh: "molten_radioactive_glass",
					category: "Radioactive",
					state: "solid",
					density: 2323, //wide range
					hardness: 0.5,
					breakInto: "radioactive_sand",
				}

				elements.radioactive_water = {
					color: "#85cf57",
					behavior: behaviors.RAD_LIQUID,
					tempHigh: 100,
					stateHigh: ["rad_steam","rad_steam","fallout"],
					tempLow: -5,
					stateLow: "radioactive_ice",
					category: "Radioactive",
					heatCapacity: 4.184,
					reactions: {
						"water": { elem1: "water", elem2: "radioactive_water", chance:0.05 }, //swap
						"dirt": { // React with (water reacts with dirt to make mud)
							"elem1": null, // First element transforms into; in this case, water deletes itself
							"elem2": "radioactive_dirt", // Second element transforms into; in this case, dirt turns to mud
						},
						"dry_dirt": { "elem1": null, "elem2": "radioactive_dirt", },
						"radioactive_dirt": { "elem1": null, "elem2": "radioactive_dirt", },
						"sand": { "elem1": null, "elem2": "radioactive_wet_sand", },
						"wet_sand": { "elem1": "radioactive_sandy_water", "elem2": ["radioactive_wet_sand","radioactive_wet_sand","radioactive_wet_sand","radioactive_wet_sand","radioactive_wet_sand",null], chance: 0.01 },
						"radioactive_wet_sand": { "elem1": "radioactive_sandy_water", "elem2": ["radioactive_wet_sand","radioactive_wet_sand","radioactive_wet_sand","radioactive_wet_sand","radioactive_wet_sand",null], chance: 0.01 },
						"rat": { "elem2": "rotten_meat", chance:0.005 },
						"plague": { "elem2": null, chance: 0.3, },
						//"quicklime": { "elem1": null, "elem2": "slaked_lime", },
						"rock": { "elem2": "radioactive_wet_sand", "chance": 0.00035 },
						//"ruins": { "elem2": "rock", "chance": 0.00035 },
						"mudstone": { "elem2": "radioactive_mud", "chance": 0.00035 },
						"radioactive_mudstone": { "elem2": "radioactive_mud", "chance": 0.00035 },
						"packed_sand": { "elem2": "radioactive_wet_sand", "chance": 0.00035 },
						"radioactive_packed_sand": { "elem2": "radioactive_wet_sand", "chance": 0.00035 },
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
				elements.rad_steam.stateLow = "radioactive_water";
				elements.rad_cloud.behavior =  [
					"XX|XX|XX",
					"XX|CH:fallout,radiation,radioactive_water%0.025|M1%2.5 AND BO",
					"CR:radiation%0.05|CR:radiation%0.05|CR:radiation%0.05",
				];
				elements.rad_cloud.tempLow = 0;
				elements.rad_cloud.stateLow = "rad_snow_cloud";
				elements.fallout.behavior = behaviors.RAD_POWDER;

				elements.radioactive_permafrost = {
					color: ["#51613d","#495234","#3b4a30","#4a4f35"],
					behavior: behaviors.RAD_SUPPORT,
					temp: -50,
					tempHigh: 10,
					stateHigh: "radioactive_mudstone",
					category: "Radioactive",
					state: "solid",
					density: 700,
				};

				elements.radioactive_dry_permafrost = {
					color: ["#6e9970","#64756a","#4e7864", "#5f8a78"],
					behavior: behaviors.POWDER, //not enough water for cementing
					temp: -50,
					tempHigh: 10,
					stateHigh: "radioactive_dry_dirt",
					category: "land",
					state: "solid",
					density: 1200,
				}

				elements.radioactive_mudstone = {
					color: "#4f5e25",
					behavior: behaviors.RAD_SUPPORT,
					tempHigh:1200,
					stateHigh: "molten_radioactive_dirt",
					tempLow: -50,
					stateLow: "radioactive_permafrost",
					category: "Radioactive",
					state: "solid",
					density: 1250,
					breakInto: "radioactive_dirt",
				};

				elements.radioactive_packed_sand = {
					color: "#79945c",
					behavior: behaviors.RAD_SUPPORT,
					tempHigh: 1700,
					stateHigh: "molten_radioactive_glass",
					category: "Radioactive",
					state: "solid",
					density: 1682,
					breakInto: "radioactive_sand",
				};

				elements.radioactive_ice = {
					color: "#b7e0b4",
					behavior: behaviors.RAD_WALL,
					temp: 0,
					tempHigh: 5,
					stateHigh: "radioactive_water",
					category: "solids",
					state: "solid",
					density: 917,
					breakInto: "radioactive_snow",
				};

				elements.radioactive_snow = {
					color: "#d5f2d3",
					behavior: behaviors.RAD_POWDER,
					temp: 0,
					tempHigh: 5,
					tempLow: -100,
					stateLow: "radioactive_packed_snow",
					stateHigh: "radioactive_water",
					category: "Radioactive",
					state: "solid",
					density: 100,
				};

				elements.radioactive_packed_snow = {
					color: "#a7d4a3",
					behavior: behaviors.RAD_SUPPORTPOWDER,
					temp: 0,
					tempHigh: 20,
					tempLow: -200,
					stateLow: "radioactive_ice",
					stateHigh: "radioactive_water",
					category: "Radioactive",
					state: "solid",
					density: 400,
					hidden: true,
				};

				elements.rad_snow_cloud = {
					color: ["#2d6e31","#416e21"],
					behavior: [
						"XX|XX|XX",
						"XX|CH:fallout,radiation,radioactive_snow%0.025|M1%2.5 AND BO",
						"CR:radiation%0.05|CR:radiation%0.05|CR:radiation%0.05",
					],
					category:"Radioactive",
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
					category:"Radioactive",
					hidden: true,
					state: "gas",
					density: 0.5,
					temp: -20,
					tempHigh: 0,
					stateHigh: "rad_cloud",
				};

				elements.radioactive_rock = {
					color: ["#768063","#444f3f","#7a9476"],
					behavior: behaviors.RAD_POWDER,
					tempHigh: 950,
					stateHigh: "radioactive_magma",
					category: "Radioactive",
					state: "solid",
					density: 2550,
					hardness: 0.5,
					breakInto: ["radioactive_sand","radioactive_gravel"],
				};

				elements.radioactive_gravel = {
					color: ["#d1e3c8","#a6b090","#657360","#4d523f"],
					behavior: behaviors.RAD_POWDER,
					category: "Radioactive",
					tempHigh: 950,
					stateHigh: "radioactive_magma",
					state: "solid",
					density: 1680,
					hardness: 0.2,
					breakInto: "radioactive_sand",
				};

				elements.radioactive_basalt = {
					color: ["#262e20","#23331f","#3f4235"],
					behavior: behaviors.RAD_STURDYPOWDER,
					tempHigh: 1262.5,
					stateHigh: "radioactive_magma",
					category: "Radioactive",
					state: "solid",
					density: 3000,
					hardness: 0.65,
					breakInto: "radioactive_gravel",
				};

				elements.radioactive_magma = {
					color: ["#ff9100","#ffae00","#ff8400"],
					behavior: behaviors.RAD_MOLTEN,
					reactions: {
						"ice": { "elem1": "radioactive_basalt" },
						"radioactive_ice": { "elem1": "radioactive_basalt" },
						"magma": { "elem1":"magma", "elem2":"radioactive_magma", "chance":0.0005, "oneway":true },
					},
					temp: 1500,
					tempLow: 850,
					stateLow: ["radioactive_basalt","radioactive_basalt","radioactive_basalt","radioactive_rock"],
					viscosity: 5000,
					category: "Radioactive",
					state: "liquid",
					density: 2725,
				};

				//(Just for fun)

				elements.super_irradiator = {
					color: "#66ee33",
					tick: function(pixel) {
						var twentiethOfTemp = pixel.temp / 20;
						var roundOf20th = Math.round(twentiethOfTemp);
						var boundedR20 = Math.max(1,Math.min(roundOf20th,11));
						transformAround(pixel,boundedR20,radioactiveObject)
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
						transformAround(pixel,boundedR20,radioactiveObject,reverse=true)
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
							transformAdjacent(pixel,radioactiveObject)
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
				
			//Inter-mod compatibility

				if(enabledMods.includes("mods/some_tf_liquids.js")) {
					elements.radioactive_basalt_gravel = {
						color: ["#394d37", "#3b452f", "#3f452a", "#2d3d2c"],
						behavior: behaviors.RAD_POWDER,
						tempHigh: 1262.5,
						stateHigh: "radioactive_magma",
						category: "Radioactive",
						state: "solid",
						density: 1975,
						hardness: 0.26,
					}
					elements.radioactive_basalt.breakInto = "radioactive_basalt_gravel";
				};

			//Worldgen preset for testing

				worldgentypes.radioactive_sandstone_test_ocean = {
					layers: [
						[0.9, "radioactive_wet_sand", 0.2],
						[0.9, "radioactive_sand", 0.2],
						[0.8, "radioactive_sandy_water", 0.7],
						[0.25, "radioactive_water"],
						[0.1, "radioactive_sand", 0.1],
						[0.1, "clay", 0.1],
						[0.1, "radioactive_gravel", 0.2],
						[0.1, "radioactive_wet_sand"],
						[0.03, "radioactive_gravel", 0.5],
						[0.03, "radioactive_rock"],
						[0, "radioactive_basalt"],
					]
				};

			/*/Water irradiation reactions (must be done last)

				waterIrradiationExclusionArray = ["radioactive_water", "radioactive_wet_sand"]
				
				filteredWaterIrradiationArray = Object.keys(elements).filter(function(e) {
					return elements[e].category === "Radioactive" && (!waterIrradiationExclusionArray.includes(e));
				});

				for(i = 0; i < filteredWaterIrradiationArray.length; i++) {
					elements.water.reactions[filteredWaterIrradiationArray[i]] = { "elem1":"radioactive_water", chance: 0.01 }
				};*/

//Generation

	//TNT world

		//Supplementary elements

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

		//Main preset

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

		//Inter-mod compatibility

			runAfterLoad(function() {
				if(enabledMods.includes("mods/glenn_gases.js")) {
					worldgentypes.tnt_world.layers.unshift([0.9, "red_gas", 0.50])
				};
			});

	//Ice world

		//Supplementary elements

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
			
		//Main preset

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

		//Elements defined above
			
		//Main preset

			worldgentypes.nuclear_wasteland = {
				layers: [
					[0.9, "smoke", 0.5],
					[0.9, "rad_snow_cloud_floater", 0.75],
					[0.82, "fallout", 0.4],
					[0.7, "liquid_irradium", 0.05],
					[0.7, "dead_plant", 0.12],
					[0.55, "radioactive_dirt"],
					[0.45, "radioactive_rock"],
					[0.25, "uranium", 0.4],
					[0.35, "radioactive_rock", 0.5],
					[0.3, "radioactive_gravel", 0.5],
					[0.2, "uranium", 0.2],
					[0.05, "rock"],
					[0, "basalt"],
				],
				temperature: -5 //nuclear winter
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
	
	//Star world
	//If GWSN can have a decidedly Earth-y name and a space concept, then I should be able to do the same
	
		//Supplementary elements

			elements.liquid_stellar_plasma = {
				color: "#ffffbd",
				colorOn: "#ffffbd",
				behavior: [
					"XX|M2%5 AND CR:plasma%1|XX",
					"M2|XX|M2",
					"M1|M1|M1",
				],
				behaviorOn: [
					"XX|M2%10 AND M1%0.5 AND CR:plasma%2.3|XX",
					"M2|XX|M2",
					"M1|M1|M1",
				],
				tick: function(pixel) {
					almostSun(pixel,0.6,stellarPlasmaSpreadWhitelist);
				},
				temp:5500,
				isGas: true,
				tempLow:2300,
				stateLow: "plasma",
				category: "liquids",
				state: "liquid",
				density: 1000, //density actually depends on depth in the star: https://astronomy.stackexchange.com/a/32734
				conduct: 0.5,
			};

			elements.stellar_plasma = {
				color: "#ffffbd",
				colorOn: "#ffffbd",
				behavior: [
					"M2|M1 AND CR:plasma%0.6|M2",
					"M1 AND CR:plasma%0.6|XX|M1 AND CR:plasma%0.6",
					"M2|M1 AND CR:plasma%0.6|M2",
				],
				behaviorOn: [
					"M2|M1 AND CR:plasma%1|M2",
					"M1 AND CR:plasma%1|XX|M1 AND CR:plasma%1",
					"M2|M1 AND CR:plasma%1|M2",
				],
				tick: function(pixel) {
					almostSun(pixel,0.5,stellarPlasmaSpreadWhitelist);
				},
				temp:5500,
				tempLow:2300,
				stateLow: "plasma",
				category: "gases",
				state: "gas",
				density: 10,
				conduct: 0.5,
			};
			
			elements.neutron_star = {
				color: "#e9eaf7",
				colorOn: "#ffffbd",
				behavior: [
					"XX|CR:neutron%0.1|XX", //no neutrinos though
					"CR:neutron%0.1|XX|CR:neutron%0.1",
					"XX|CR:neutron%0.1|XX"
				],
				tick: function(pixel) {
					nsTick(pixel,0.7,stellarPlasmaSpreadWhitelist);
				},
                temp: 1e12,
                category: "special",
                state: "gas",
                density: 1e17,
                insulate: true,
				conduct: 1,
			};
			
			elements.liquid_degenerate_neutronium = {
				color: "#e9eaf7",
				behavior: [
					"XX|M2%5 AND CR:neutron%0.6|XX",
					"M2|XX|M2",
					"M1|M1|M1",
				],
				behaviorOn: [
					"XX|M2%10 AND M1%0.5 AND CR:neutron%1.2|XX",
					"M2|XX|M2",
					"M1|M1|M1",
				],
				tick: function(pixel) {
					nsTick(pixel,0.7,stellarPlasmaSpreadWhitelist);
				},
				temp:1e6,
				isGas: true,
				tempLow:2300,
				stateLow: elements.liquid_neutronium ? "liquid_neutronium" : "neutron",
				category: "liquids",
				state: "liquid",
				density: 100000, //i'm not doing any more research on these neutron stars because google is useless
				conduct: 1,
			};

			elements.gaseous_degenerate_neutronium = {
				color: "#e9eaf7",
				behavior: [
					"M2|M1 AND CR:neutron%0.6|M2",
					"M1 AND CR:neutron%0.6|XX|M1 AND CR:neutron%0.6",
					"M2|M1 AND CR:neutron%0.6|M2",
				],
				behaviorOn: [
					"M2|M1 AND CR:neutron%1|M2",
					"M1 AND CR:neutron%1|XX|M1 AND CR:neutron%1",
					"M2|M1 AND CR:neutron%1|M2",
				],
				tick: function(pixel) {
					nsTick(pixel,0.6,stellarPlasmaSpreadWhitelist);
				},
				temp:1e6,
				isGas: true,
				tempLow:2300,
				stateLow: "neutron",
				category: "gases",
				state: "gas",
				density: 10000, //i'm not doing any more research on these neutron stars because google is useless
				conduct: 1,
			};
			
			if(enabledMods.includes("mods/chem.js")) {
				elements.supernova.behavior = [
					"XX|XX|XX",
					"XX|EX:80>plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,molten_iron,molten_uranium,molten_lead AND CH:neutron_star,neutron_star,neutron_star,neutronium,quark_matter,void|XX",
					"XX|XX|XX",
				]
			};
			
			elements.plasma.noConduct = ["stellar_plasma","liquid_stellar_plasma","liquid_degenerate_neutronium","gaseous_degenerate_neutronium","neutron_star"]; //I can't suppress the charge overlay and keep the tick color, only effective with noConduct.js but not strictly required
			
		//Main preset

			worldgentypes.star = {
				layers: [
					[0.9, "stellar_plasma"],
					[0.65, "liquid_stellar_plasma"],
					[0.4, "liquid_stellar_plasma", 1/2],
					[0, "sun"],
				],
				complexity: 100,
				baseHeight: 0.3,
				temperature: 6500,
			};

	//Radioactive Desert

		//Main preset

			worldgentypes.nuclear_wasteland_desert = {
				layers: [
					[0.97, "fallout", 0.4],
					[0.95, "radioactive_gravel", 0.6],
					[0.65, "liquid_irradium", 0.01],
					[0.65, "cancer", 0.02],
					[0.65, "bone", 0.02],
					[0.65, "radioactive_sand"],
					[0.55, "cancer", 0.01],
					[0.55, "bone", 0.01],
					[0.3, "radioactive_sandstone"],
					[0.05, "radioactive_rock"],
					[-0.78, "radioactive_basalt"]
				],
				temperature: -13
			};
			
