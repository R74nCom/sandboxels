/*
TODO:
Porphyritic, vesicular, vitreous, and fragmental IRs (if they exist, and i might make some up if they don't)
Other rocks that fit these categories??
Sedimentary and metamorphic rocks in general
Proper classification of limestone in comments
*/

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
			
				//Dummied-out debug counters

					/*sedimentSandstoneTries = 0;
					sedimentSandstoneTryIterations = 0;
					sedimentSandstoneDetects = 0;
					sedimentSandstoneNoDetects = 0;
					sandstoneFormations = 0;
					sandstoneFailures = 0;*/
			
				//Elements from which simplified lithification can spread

					sandstoneLithificationElements = ["sand_sediment", "sandstone"]

				//Water reaction to pick up the fine material (this is very simplified)

					elements.water.reactions.wet_sand = {
						"elem1": "sandy_water",
						"elem2": ["wet_sand","wet_sand","wet_sand","wet_sand","wet_sand",null],
						chance: 0.01
					};

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
										/*if(sandstoneLithificationElements.includes(pixelMap[pixel.x+adjacentCoords[i][0]][pixel.y+adjacentCoords[i][1]].element)) {
											validNeighborArray[i] = true;
											//sedimentSandstoneDetects++;
										} else {
											validNeighborArray[i] = false;
											//sedimentSandstoneNoDetects++;
										};*/
										validNeighborArray[i] = sandstoneLithificationElements.includes(pixelMap[pixel.x+adjacentCoords[i][0]][pixel.y+adjacentCoords[i][1]].element);
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

				//Fallback reaction setter

					if(!elements.wet_sand.reactions) {
						elements.wet_sand.reactions = {};
					};

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
					
				//Irradiated version in more_worlds.js

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

		if(!elements.mud.reactions) {
			elements.mud.reactions = {};
		};
		elements.mud.reactions.dry_dirt = { elem1: "dirt", elem2: "dirt", chance: 0.06 }
