var modName = "mods/ochem_prerelease.js";
var fireMod = "mods/fire_mod.js";
var changeTempMod = "mods/changeTempReactionParameter.js";

if(enabledMods.includes(fireMod) && enabledMods.includes(changeTempMod)) {
	/*####################################\
	#TODO: Pentyl line physical properties#
	\####################################*/


	//Most hydrocarbons are fantastically colored for convenience
	//Benzene ring
		//Benzene is actually yellowish
			//For combinations, it will represent a + shift in hue
	//Isomerism
		//Isomers like isobutane have slightly increased hue and sat
		//Cis- isomers are darkened and trans- isomers are lightened
	//Chain length
		//Methyl line is purple
			//plus benzene = pink
		//Ethyl line is rose
			//plus benzene = red
		//Propyl line is green
			//plus benzene = mint
		//Butyl line is cyan
			//plus benzene = blue
		//Pentyl line is vermillion
			//plus benzene = orange
	//Bond type
		//Alkanes are lightest
		//Alkenes are darker
		//Alkynes are darkest
		//Benzene is non-ternary with respect to single vs double bond

	//Benzene

		elements.benzene = {
			color: "#edf099",
			behavior: behaviors.LIQUID,
			state: "liquid",
			category: "liquids",
			density: 876,
			burn: 80,
			burnTime: 20,
			burnInto: ["fire","fire","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","steam","dirty_water","dirty_water"],
			reactions: {
				"head": { elem2: "cancer", chance: 0.0017},
				"body": { elem2: "cancer", chance: 0.0017},
			},
			tempLow: 5.53,
			tempHigh: 80.1,
		};

		elements.benzene_gas = {
			density: 2.77 * airDensity,
		};

		elements.benzene_ice = {
			density: 1012,
		};

	//Alk*nes and their substituted benzenes

		//Single carbon line

			//Lowest bond order
				//1 carbon = purple
				elements.methane.color = "#bfabc9";

				elements.liquid_methane ??= {};
				elements.liquid_methane.density = 423;

			//Methene and methyne don't make sense

			//Benzene ver.
				elements.toluene = {
					//meth- purple + benzene hue up = pink
					//liquid initial = more vivid
					color: "#de76cf",
					behavior: behaviors.LIQUID,
					state: "liquid",
					category: "liquids",
					density: 862,
					burn: 80,
					burnTime: 20,
					burnInto: ["fire","fire","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","steam","steam","steam","steam"],
					reactions: {
						"head": { elem2: "cancer", chance: 0.001 }, //unknown/unclassifiable carcinogenicity
						"body": { elem2: "cancer", chance: 0.001 },
					},
					tempHigh: 110.6,
					tempLow: -95,
				};

				elements.toluene_gas = {
					density: 3.1 * airDensity,
				};

		//Double carbon line

			//Lowest bond order
				//Rose
				elements.ethane = {
					color: "#cfa3bb",
					behavior: behaviors.GAS,
					category: "gases",
					tempHigh: 872, //artifically raised by 400 degrees to prevent interference with ethylbenzene dehydrogenation
					stateHigh: "fire",
					reactions: {
						"head": { elem2: "rotten_meat", chance: 0.00015},
						"body": { elem2: "rotten_meat", chance: 0.00015},
					},
					tempLow: -88.5,
					burn: 85,
					burnTime: 5,
					burnInto: ["fire","fire","carbon_dioxide","carbon_dioxide","steam","steam","steam"],
					fireColor: ["#00ffff","#00ffdd"],
					state: "gas",
					density: 1.3562, //absolute density
				};

				elements.liquid_ethane = {
					tempLow: -182.8,
					density: 544,
				};

			//Double bonds
				//ethylene = ethene
				elements.ethylene = {
					color: "#c991b0", 
					behavior: behaviors.GAS,
					state: "gas",
					category: "gases",
					tempHigh: 425,
					stateHigh: "fire",
					density: 1.18,
					burn: 80,
					burnTime: 20,
					burnInto: ["fire","fire","carbon_dioxide","carbon_dioxide","steam","steam"],
					reactions: {
						"head": { elem2: "rotten_meat", chance: 0.0001}, //no mechanism for prolonged exposure causing harm
						"body": { elem2: "rotten_meat", chance: 0.0001},
						"benzene_gas": { tempMin: 220, elem1: null, elem2: "ethylbenzene_gas" },
					},
					tempLow: -103.7
				};

				elements.liquid_ethylene = {
					tempLow: -169.2,
					density: 577, //unknown solid density
				};
				
			//Triple bonds
				//acetylene = ethyne
				elements.acetylene = {
					color: "#b8819f", 
					behavior: behaviors.GAS,
					state: "gas",
					category: "gases",
					reactions: {
						oxygen: { elem1: ["acetylene","oxy_fuel"], elem2: null },
					},
					tick: function(pixel) { //tick-based autoignition point to trigger acetylene fire properties
						if(pixel.temp > 325 && !pixel.burning) {
							pixel.burning = true;
						};
					},
					density: 1.1772, //absolute
					burn: 100,
					burnTime: 10,
					burnTempChange: 20,
					fireSpawnTemp: 2700, //overheat by 500 degrees to compensate for natural cooling effects
					fireSpawnChance: 5, //reduce own flame to reduce said effects from smoke
					fireColor: "#5da8fc",
					burnInto: ["fire","plasma","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","steam","steam"],
					tempLow: -84,
					stateLow: "acetylene_ice",
				};

				elements.acetylene_ice = {
					color: "#ffa8d8",
					behavior: behaviors.POWDER,
					state: "solid",
					category: "states",
					reactions: {
						liquid_oxygen: { elem1: ["acetylene_ice","oxy_fuel_slush"], elem2: null, changeTemp: false },
						oxygen_ice: { elem1: ["acetylene_ice","oxy_fuel_snow"], elem2: null, changeTemp: false },
					},
					tick: function(pixel) {
						if(pixel.temp > 325 && !pixel.burning) {
							pixel.burning = true;
						};
					},
					density: 720,
					burn: 25, //cold
					burnTime: 5,
					burnTempChange: 20,
					fireSpawnTemp: 2700,
					fireSpawnChance: 5,
					fireColor: "#5da8fc",
					burnInto: ["fire","plasma","fire","fire","fire","fire","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","steam","steam"],
					"temp": -100,
					"tempHigh": -84,
					"stateHigh": "acetylene",
					hidden: true,
				};
			
			//Benzene ver.
				elements.ethylbenzene = {
					color: "#de7676",
					//ethene's rose plus benzene's yellow = red
					behavior: behaviors.LIQUID,
					state: "liquid",
					category: "liquids",
					density: 867,
					burn: 75,
					burnTime: 25,
					burnInto: ["fire","fire","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","steam","steam","steam","steam","steam"],
					reactions: {
						"head": { elem2: "cancer", chance: 0.0017 },
						"body": { elem2: "cancer", chance: 0.0017 },
					},
					tempHigh: 136,
					tempLow: -95,
				};

				elements.ethylbenzene_gas = {
					density: 3.7 * airDensity,
					reactions: {
						"head": { elem2: "cancer", chance: 0.0017 },
						"body": { elem2: "cancer", chance: 0.0017 },
						"steam": { tempMin: 600, elem1: ["styrene","hydrogen","styrene","hydrogen","styrene","hydrogen","styrene","hydrogen","styrene","hydrogen","styrene","hydrogen","styrene","hydrogen","styrene","hydrogen","toluene","benzene","methane","ethane"], elem2: "steam", temp1: -3, temp2: -3 },
					},
				};

		//Triple carbon line

			//Single bond
				elements.propane.color = "#b8d4a5";
				elements.propane.tempHigh = 493;
			
			//Double bond
				elements.propylene = { //propene
					color: "#a4c48d",
					behavior: behaviors.GAS,
					category: "gases",
					tempHigh: 458,
					stateHigh: "fire",
					tempLow: -47.6,
					burn: 100,
					burnTime: 5,
					fireColor: ["#00ffff","#00ffdd"],
					state: "gas",
					density: 1.745, //abs. at 25*C
				};

				elements.liquid_propylene = {
					tempLow: -185.2,
					density: 613.9,
				};
			
			//Triple bond
				elements.propyne = { //also methylacetylene
					color: "#8bad72",
					behavior: behaviors.GAS,
					category: "gases",
					tempHigh: 340,
					stateHigh: "fire",
					tempLow: -25.15,
					burn: 85,
					burnTime: 5,
					fireColor: ["#00ffff","#00ffdd"],
					state: "gas",
					density: 1.6656, //abs. at 25*C
				};

				elements.liquid_propylene = {
					tempLow: -102.7,
					density: 671.963,
				};

			//Benzene ver.
				//more obscure organic compound
				elements.propylbenzene = {
					color: "#92debd",
					behavior: behaviors.LIQUID,
					state: "liquid",
					category: "liquids",
					density: 862,
					burn: 75,
					burnTime: 25,
					burnInto: ["fire","fire","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","steam","steam","steam","steam","steam"],
					reactions: {
						//we can probably still assume that it's carcinogenic because it has the phenyl group
						"head": { elem2: "cancer", chance: 0.0017 },
						"body": { elem2: "cancer", chance: 0.0017 },
					},
					tempHigh: 159.2,
					tempLow: -99.5,
				};

				elements.propylbenzene_gas = {
					density: 4.14 * airDensity,
					reactions: {
						"head": { elem2: "cancer", chance: 0.0017 },
						"body": { elem2: "cancer", chance: 0.0017 },
					},
				};

		//Quadruple carbon line

			//Single bond
				elements.butane = {
					color: "#a7dbd9",
					behavior: behaviors.GAS,
					category: "gases",
					tempHigh: 287,
					stateHigh: "fire",
					reactions: {
						"head": { elem2: "rotten_meat", chance: 0.00015},
						"body": { elem2: "rotten_meat", chance: 0.00015},
					},
					tempLow: 1,
					burn: 85,
					burnTime: 5,
					burnInto: ["fire","fire","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","steam","steam","steam","steam","steam"],
					fireColor: ["#00ffff","#00ffdd"],
					state: "gas",
					density: 2.076 * airDensity,
				};

				elements.liquid_butane = {
					tempLow: -134,
					density: 604,
				};

				elements.isobutane = {
					color: "#9cbddb",
					behavior: behaviors.GAS,
					category: "gases",
					tempHigh: 460,
					stateHigh: "fire",
					reactions: {
						"head": { elem2: "rotten_meat", chance: 0.00015},
						"body": { elem2: "rotten_meat", chance: 0.00015},
					},
					tempLow: -11.7,
					burn: 85,
					burnTime: 5,
					burnInto: ["fire","fire","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","steam","steam","steam","steam","steam"],
					fireColor: ["#00ffff","#00ffdd"],
					state: "gas",
					density: 2.51,
				};

				elements.liquid_isobutane = {
					tempLow: -159.42,
					density: 563,
				};

			//Double bond
				elements.butylene = { //butene
					name: "1-butylene",
					color: "#95cfcd",
					behavior: behaviors.GAS,
					category: "gases",
					tempHigh: 385,
					stateHigh: "fire",
					tempLow: -6.47,
					burn: 100,
					burnTime: 5,
					fireColor: ["#00ffff","#00ffdd"],
					state: "gas",
					density: 1.93 * airDensity,
				};

				elements.liquid_butylene = {
					tempLow: -185.3,
					density: 625.63,
				};

				elements.trans_2_butylene = {
					name: "t-butylene-2",
					color: "#a1c9d4",
					behavior: behaviors.GAS,
					category: "gases",
					tempHigh: 324,
					stateHigh: "fire",
					tempLow: 0.8,
					burn: 85,
					burnTime: 5,
					fireColor: ["#00ffff","#00ffdd"],
					state: "gas",
					density: 2 * airDensity,
				};

				elements.liquid_trans_2_butylene = {
					tempLow: -105.5,
					density: 626,
				};

				elements.cis_2_butylene = {
					name: "c-butylene-2",
					color: "#8cbcca",
					behavior: behaviors.GAS,
					category: "gases",
					tempHigh: 324,
					stateHigh: "fire",
					tempLow: 3.7,
					burn: 85,
					burnTime: 5,
					fireColor: ["#00ffff","#00ffdd"],
					state: "gas",
					density: 2 * airDensity,
				};

				elements.liquid_cis_2_butylene = {
					tempLow: -138.9,
					density: 641,
				};

			//Triple bond
				elements.butyne = {
					color: "#81a2b3",
					behavior: behaviors.GAS,
					category: "gases",			
					tempHigh: 444, //Unknown autoignition
					stateHigh: "fire",
					tempLow: 8.08,
					burn: 100,
					burnTime: 5,
					fireColor: ["#00ffff","#00ffdd"],
					state: "gas",
					density: 2.12 * airDensity, //made-up due to also unknown vapor density
				};

				elements.liquid_butyne = {
					tempLow: -125.7,
					density: 678.3,
				};

				//Benzene ver.
				elements.butylbenzene = {
					color: "#7b8ae0",
					behavior: behaviors.LIQUID,
					state: "liquid",
					category: "liquids",
					density: 860.1,
					burn: 75,
					burnTime: 25,
					burnInto: ["fire","fire","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","steam","steam","steam","steam","steam"],
					reactions: {
						"head": { elem2: "cancer", chance: 0.0017 },
						"body": { elem2: "cancer", chance: 0.0017 },
					},
					tempHigh: 183.3,
					tempLow: -87.9,
				};

				elements.butylbenzene_gas = {
					density: 4.6 * airDensity,
					reactions: {
						"head": { elem2: "cancer", chance: 0.0017 },
						"body": { elem2: "cancer", chance: 0.0017 },
					},
				};

				elements.cumene = {
					color: "#8873e6",
					behavior: behaviors.LIQUID,
					state: "liquid",
					category: "liquids",
					density: 862,
					burn: 75,
					density: 0.777,
					burnTime: 25,
					burnInto: ["fire","fire","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","carbon_dioxide","steam","steam"],
					reactions: {
						"head": { elem2: "cancer", chance: 0.0017 },
						"body": { elem2: "cancer", chance: 0.0017 },
					},
					tempHigh: 152,
					tempLow: -96,
				};

				elements.cumene_gas = {
					density: 4.1 * airDensity,
					reactions: {
						"head": { elem2: "cancer", chance: 0.0017 },
						"body": { elem2: "cancer", chance: 0.0017 },
					},
				};
		
		//Quintuple carbon line

	//Other organic compounds

		//Oxygen plus acetylene mixture

				elements.oxy_fuel = {
					color: "#ff5eb4", 
					behavior: behaviors.GAS,
					state: "gas",
					category: "gases",
					tick: function(pixel) { //tick-based autoignition point to trigger acetylene fire properties
						if(pixel.temp > 325 && !pixel.burning) {
							pixel.burning = true;
						};
					},
					density: 1.25,
					burn: 100,
					burnTime: 10,
					burnTempChange: 330,
					fireSpawnTemp: 3100,
					fireSpawnChance: 5, //reduce own flame to reduce said effects from smoke
					fireElement: ["fire","plasma"],
					fireColor: "#5e91ff",
					burnInto: ["fire","plasma"],
					tempLow: -84,
					stateLow: ["oxygen","oxygen","acetylene_ice"],
					hidden: true,
				};

				elements.oxy_fuel_slush = {
					color: "#d85fed", 
					behavior: behaviors.LIQUID,
					viscosity: 100,
					state: "liquid",
					category: "liquids",
					tick: function(pixel) { //tick-based autoignition point to trigger acetylene fire properties
						if(pixel.temp > 325 && !pixel.burning) {
							pixel.burning = true;
						};
					},
					density: 873, //made-up
					burn: 100, 
					burnTime: 10,
					burnTempChange: 330,
					fireSpawnTemp: 3100,
					fireSpawnChance: 5, //reduce own flame to reduce said effects from smoke
					fireElement: ["oxy_fuel","fire","plasma"],
					fireColor: "#5e91ff",
					burnInto: "oxy_fuel",
					temp: -200,
					tempLow: -218.8,
					stateLow: "oxy_fuel_snow",
					tempHigh: -183.94,
					stateHigh: ["oxygen","oxygen","acetylene_ice"],
					hidden: true,
				};

				elements.oxy_fuel_snow = {
					color: "#dd9afc", 
					behavior: behaviors.POWDER,
					state: "solid",
					category: "powders",
					tick: function(pixel) { //tick-based autoignition point to trigger acetylene fire properties
						if(pixel.temp > 325 && !pixel.burning) {
							pixel.burning = true;
						};
					},
					density: 912, //made-up
					burn: 100, 
					temp: -250,
					burnTime: 10,
					burnTempChange: 330,
					fireSpawnTemp: 3100,
					fireSpawnChance: 5, //reduce own flame to reduce said effects from smoke
					fireElement: ["fire","plasma"],
					fireColor: "#5e91ff",
					burnInto: "oxy_fuel",
					tempHigh: -218.8,
					stateHigh: "oxy_fuel_slush",
					hidden: true,
				};

		//Styrene and its polymer

			elements.styrene = {
				color: "#d9d6c3",
				behavior: behaviors.LIQUID,
				state: "liquid",
				category: "liquids",
				density: 909,
				burn: 80,
				burnTime: 25,
				burnInto: ["fire","fire","carbon_dioxide","carbon_dioxide","steam"],
				reactions: {
					"head": { elem2: "cancer", chance: 0.0017 },
					"body": { elem2: "cancer", chance: 0.0017 },
					"hydrogen": { elem1: "ethylbenzene", elem2: null, chance: 0.005 },
					"benzoyl_peroxide": { elem1: "polystyrene", elem2: "benzoic_acid" },
					"polystyrene": { elem1: "polystyrene" },
					"molten_polystyrene": { elem1: "polystyrene" },
				},
				tempLow: -30,
				tempHigh: 145,
			};

			elements.styrene_gas = {
				density: 3.6 * airDensity,
			};

			elements.polystyrene = {
				color: "#f5f5f5",
				behavior: behaviors.WALL,
				state: "solid",
				category: "solids",
				density: 965,
				tempHigh: 100,
				//above this it does thermoplastic things
			};

			elements.molten_polystyrene = {
				color: "#e3e3e3",
				tempLow: 100,
				behavior: behaviors.LIQUID,
				viscosity: 1000,
				reactions: {
					"foam": { elem1: "styrofoam", elem2: ["styrofoam","molten_polystyrene","molten_polystyrene","molten_polystyrene"] },
				},
			};

			elements.styrofoam = {
				color: "#f5f5f5",
				behavior: behaviors.WALL,
				state: "solid",
				category: "solids",
				density: 50,
				tempHigh: 160, //reaction grace period
				stateHigh: [null,null,null,"molten_polystyrene"],
			};

		//Benzoyl peroxide

			elements.benzoyl_peroxide = {
				color: "#ededed",
				behavior: behaviors.POWDER,
				state: "solid",
				category: "powders",
				density: 1.334,
				tempHigh: 103,
				stateHigh: ["benzoic_acid","benzoic_acid","benzoic_acid","fire","explosion"],
			};

		//Benzoic acid

			elements.benzoic_acid = {
				color: "#c9c9c9",
				behavior: behaviors.POWDER,
				state: "solid",
				category: "powders",	
				density: 1.2659,
				tempHigh: 122,
			};

			elements.molten_benzoic_acid = {
				behavior: behaviors.LIQUID,
				color: "#b5b2b0",
				tempHigh: 250,
				density: 1074.9,
				reactions: {
					"molten_copper_sulfate": { tempMin: 200, elem1: ["phenol","phenol","carbon_dioxide"] }, //using air oxygen
				},
			};

			elements.benzoic_acid_gas = {
				density: 4.21 * airDensity,
				reactions: {
					"oxygen": { tempMin: 350, elem1: "phenol", elem2: "carbon_dioxide" },
					"molten_copper_sulfate": { tempMin: 200, elem1: ["phenol","phenol","carbon_dioxide"] },
				},
			};

		//Phenol

			elements.phenol = {
				color: "#dbd3d3",
				behavior: behaviors.POWDER,
				state: "solid",
				category: "powders",
				density: 1070,
				burn: 40,
				burnTime: 70,
				burnInto: ["fire","fire","carbon_dioxide","carbon_dioxide","carbon_dioxide","steam","steam","steam","dioxin"],
				reactions: {
					"head": { elem2: "rotten_meat", chance: 0.003 },
					"body": { elem2: "rotten_meat", chance: 0.003 },
				},
				tempHigh: 40.5,
				tempLow: -95,
			};

			elements.molten_phenol = {
				color: "#cfc2c2",
				behavior: behaviors.LIQUID,
				viscosity: 8,
				reactions: {
					"head": { elem2: "rotten_meat", chance: 0.003 },
					"body": { elem2: "rotten_meat", chance: 0.003 },
				},
				tempHigh: 181.7,
			};

			elements.phenol_gas = {
				reactions: {
					"head": { elem2: "rotten_meat", chance: 0.003 },
					"body": { elem2: "rotten_meat", chance: 0.003 },
				},
				density: 3.24,
			};
		
	//Inorganic compounds

		//Carbon monoxide
		
			elements.carbon_monoxide = {
				color: "#8f8f8f",
				behavior: behaviors.GAS,
				state: "gas",
				category: "gases",
				density: 1.145,
				reactions: {
					"head": { elem2: "rotten_meat", chance: 0.0017},
					"body": { elem2: "rotten_meat", chance: 0.0017},
				},
				tempLow: -191.5,
			};

			elements.liquid_carbon_monoxide = {
				tempLow: -205.02,
				density: 789, //unknown solid density
			};

		//Water
		
			elements.steam.reactions ??= {};
			elements.steam.reactions.charcoal = { tempMin: 680, elem1: "hydrogen", elem2: "carbon_monoxide" };
			elements.steam.reactions.diamond = { tempMin: 680, elem1: "hydrogen", elem2: "carbon_monoxide" };







	/* //Oil refining
	delete elements.oil.tempHigh;

	elements.oil.tick = function(pixel) {
		if(!pixel.role) {
			var value = Math.random()
			if(value < 0.03) {
				pixel.role = "lpg";
			};
		};
		
		if(pixel.role == "lpg") {
			var value = Math.random()
			//LPG composition weighted chooser
		};
		
		
		if(pixel.temp > 30) { //https://www.crownoil.co.uk/guides/crude-oil-fractional-distillation/: Butane and propane and other petroleum gases are formed right at the top of the distillation tower, where it is coolest, a very mild 25°C: the temperature range that forms these gases is between 25°C and 50°C. These gases are the lightest products formed in crude oil distillation and are flammable gases.
			//LPG change switch(pixel.role) statement
		};
	};
	*/
} else {
	enabledMods.splice(enabledMods.indexOf(modName),0,fireMod);
	enabledMods.splice(enabledMods.indexOf(modName),0,changeTempMod);
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert(`The ${fireMod} and ${changeTempMod} mods are required and have been automatically inserted (reload for this to take effect).`);
};
