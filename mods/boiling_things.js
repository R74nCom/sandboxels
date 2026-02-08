var modName = "mods/boiling_things.js";
var libraryMod = "mods/code_library.js";

dependOn("code_library.js", function(){

	//glass {

		elements.molten_glass = {
			tempHigh: 2200,
			stateHigh: "vaporized_glass",
		}
		
		elements.vaporized_glass = {
			color: ["#D6B049","#E8D957","#E8AE57"],
			behavior: [
				"M2|M1|M2",
				"M1|XX|M1",
				"M2|M1|M2",
			],
			reactions: {
				"vaporized_glass": { "elem1": null, "elem2": "hot_glass_cloud", "chance":0.3, "y":[0,15] },
				"hot_glass_cloud": { "elem1": "hot_glass_cloud", "chance":0.4, "y":[0,15] },
			},
			density: 2, //very rough approximation based on https://nvlpubs.nist.gov/nistpubs/jres/46/jresv46n3p176_A1b.pdf
			temp: 2300, //https://www.sciencealert.com/did-this-piece-of-glass-really-break-a-law-of-thermodynamics
			tempLow: 2200,
			stateLow: "molten_glass",
			category: "gases",
			state: "gas",
			hidden: true,
		},

		elements.hot_glass_cloud = {
			color: ["#B69089","#C8B997","#C88E77"],
			behavior: [
				"XX|XX|XX",
				"M1%7|CH:molten_glass%0.05|M1%7",
				"XX|XX|XX",
			],
			density: 2,
			temp: 2300,
			tempLow: 2200,
			stateLow: "cold_glass_cloud",
			category: "gases",
			state: "gas",
		},
		
		elements.cold_glass_cloud = {
			color: ["#967089","#A89997","#A86E77"],
			behavior: [
				"XX|XX|XX",
				"M1%7|CH:glass_shard%0.05|M1%7",
				"XX|XX|XX",
			],
			density: 2,
			temp: 2000,
			tempHigh: 2200,
			stateHigh: "hot_glass_cloud",
			category: "gases",
			state: "gas",
		},

	//}

	// ash {

		elements.ash.tempHigh = 1200          //https://www.quora.com/Can-you-melt-ashes
		elements.ash.stateHigh = "molten_ash" //https://www.sciencedirect.com/science/article/pii/S1877705817326772
		
		elements.molten_ash = {
			color: ["#df6f30","#df8c30","#df4d30"],
			behavior: behaviors.MOLTEN,
			temp: 1300,
			tempLow: 1200,
			stateLow: "ash",
			tempHigh: 1700, //https://authors.library.caltech.edu/58447/1/018-Senior.pdf
							//https://pubs.acs.org/doi/10.1021/ef049693l
			stateHigh: "vaporized_ash",
			viscosity: 10000,
			category: "liquids",
			state: "liquid",
			density: 2725,
		},

		elements.vaporized_ash = {
			color: ["#df9f50","#dfbc50","#df7d50"],
			behavior: [
				"M2|M1|M2",
				"M1|XX|M1",
				"M2|M1|M2",
			],
			reactions: {
				"vaporized_ash": { "elem1": null, "elem2": "hot_ash_cloud", "chance":0.3, "y":[0,15] },
				"hot_ash_cloud": { "elem1": "hot_ash_cloud", "chance":0.4, "y":[0,15] },
			},
			temp: 1800,
			tempLow: 1700,
			stateLow: "molten_ash",
			category: "gases",
			state: "gas",
			hidden: true,
			density: 3,
		},
		
		elements.hot_ash_cloud = {
			color: ["#bf8f50","#bfac50","#bf7d50"],
			behavior: [
				"XX|XX|XX",
				"M1%7|CH:molten_ash%0.05|M1%7",
				"XX|XX|XX",
			],
			density: 0.7,
			temp: 1800,
			tempLow: 1700,
			stateLow: "cold_ash_cloud",
			category: "gases",
			state: "gas",
		},
		
		elements.cold_ash_cloud = {
			color: ["#af8f50","#ab9c50","#af6d50"],
			behavior: [
				"XX|XX|XX",
				"M1%7|CH:ash%0.05|M1%7",
				"XX|XX|XX",
			],
			density: 0.7,
			temp: 1600,
			tempHigh: 1700,
			stateHigh: "hot_ash_cloud",
			category: "gases",
			state: "gas",
		},

	//}

	// charcoal {

		elements.charcoal.tempHigh = 800
		elements.charcoal.stateHigh = "carbon_dioxide"

	//}

	//carbon dioxide {

		/*fuck this, i can't work out the offset-infested math
		function carbonDioxideDecompRatio(temp) {
			//
			//	K is the ratio of O_2 to CO_2
			//	If K = 100, there is 100 times more O_2
			//	If K = 1, there is a 1:1 ratio
			//
			return Math.E**(((1110190+(13.083*(temp-298)))-(temp*(149.498+(13.083*(Math.log(temp/298))))))/(-8.31446*temp))
		}

		function carbonDioxideDecompChance(temp) {
			//Expected 0.5 at 6275.6434478747902
			if(typeof(temp) === "undefined") {
				throw new Error("Temp must be specified~");
			};
			if(typeof(temp) == "string") {
				temp = parseFloat(temp);
			};
			if(isNaN(temp)) {
				throw new TypeError(typeof(temp) == "number" ? "Temp cannot be NaN~" : "Temp must be a number~");
			};
			if(temp == Infinity) {
				return 1;
			};
			if(temp <= 0) {
				return 0;
			};
			var K = carbonDioxideDecompRatio(temp);
			return 1-(1/(K+1));
		};
		*/
		
		var hasNM = enabledMods.includes("mods/Neutronium Mod.js");

		//Mass given is the molar mass of O_2 molecule (31.999 g)
		//O_2 bond energy is 495 kJ/mol
		//Heat capacity is 0.918 J/(g*K)
		//in case the link goes down: c = Q/(m * delta-T); c = capacity, m = mass, delta-T = temp change, energy = Q
		//https://www.calctool.org/thermodynamics/specific-heat
		tupleAdverbs = ['Nullly', 'Singly', 'Doubly', 'Triply', 'Quadruply', 'Quintuply', 'Sextuply', 'Septuply', 'Octuply', 'Nonuply', 'Decuply', 'Undecuply', 'Duodecuply', 'Tredecuply', 'Quattuordecuply', 'Quindecuply', 'Sexdecuply', 'Septendecuply', 'Octodecuply', 'Novemdecuply', 'Vigintuply', 'Unvigintuply', 'Duovigintuply', 'Trevigintuply', 'Quattuorvigintuply', 'Quinvigintuply', 'Sexvigintuply', 'Septenvigintuply', 'Octovigintuply', 'Novemvigintuply', 'Trigintuply'].map(x => x.toLowerCase());

	//}

	// baking soda {

		elements.baking_soda.tempHigh = 150,
		elements.baking_soda.stateHigh = ["water","carbon_dioxide","calcined_soda"]

		// decomposition result {

			elements.calcined_soda = { //TODO: decomposition?
				color: "#ededed",
				behavior: behaviors.POWDER,
				reactions: {
					"water": { "elem1": "washing_soda", "elem2": null } //should be 10x water
					//"carbon_dioxide": not possible: Na_{2}CO_{3} + CO_{2} + H_{2}O → 2NaHCO_{3}
				},
				category: "powders",
				state: "solid",
				density: 2540,
				tempHigh: 851,
			}

			if(!elements.molten_calcined_soda) {
				elements.molten_calcined_soda = {}
			}

			elements.molten_calcined_soda.temp = 1700
			elements.molten_calcined_soda.tempHigh = 1600
			elements.molten_calcined_soda.stateHigh = "vaporized_calcined_soda"
			elements.molten_calcined_soda.density = 1920
			
			elements.vaporized_calcined_soda = {
				color: ["#ffbf60","#ffdc60","#ff9d60"],
				behavior: [
					"M2|M1|M2",
					"M1|XX|M1",
					"M2|M1|M2",
				],
				reactions: {
					"vaporized_calcined_soda": { "elem1": null, "elem2": "hot_calcined_soda_cloud", "chance":0.3, "y":[0,15] },
					"hot_calcined_soda_cloud": { "elem1": "hot_calcined_soda_cloud", "chance":0.4, "y":[0,15] },
				},
				temp: 1700,
				tempLow: 1600,
				stateLow: "molten_calcined_soda",
				category: "gases",
				state: "gas",
				hidden: true,
				density: 1.5, //bs
			},
			
			elements.hot_calcined_soda_cloud = {
				color: ["#cfbf70","#cfcc70","#cf9d70"],
				behavior: [
					"XX|XX|XX",
					"M1%7|CH:molten_calcined_soda%0.05|M1%7",
					"XX|XX|XX",
				],
				density: 0.7,
				temp: 1700,
				tempLow: 1600,
				stateLow: "cold_calcined_soda_cloud",
				category: "gases",
				state: "gas",
			},
			
			elements.cold_calcined_soda_cloud = {
				color: ["#afaf70","#afac70","#af8d70"],
				behavior: [
					"XX|XX|XX",
					"M1%7|CH:calcined_soda%0.05|M1%7",
					"XX|XX|XX",
				],
				density: 0.7,
				temp: 1500,
				tempHigh: 1600,
				stateHigh: "hot_calcined_soda_cloud",
				category: "gases",
				state: "gas",
			},

		//}
			
		// decomp hydrate {

			elements.washing_soda = {
				color: "#ededed",
				behavior: behaviors.POWDER,
				//no reactions because it always requires ******* water
				category: "powders",
				state: "solid",
				density: 1460,
				tempHigh: 400,
				stateHigh: ["water","calcined_soda"],
			}
			
		//}

		//alkalinities {

			elements.acid.reactions.baking_soda = { "elem1":"neutral_acid", "elem2":null }
			elements.acid.reactions.calcined_soda = { "elem1":"neutral_acid", "elem2":null }
			elements.acid.reactions.washing_soda = { "elem1":"neutral_acid", "elem2":null }
			
		//}

	//}

	// calcium {

		elements.molten_calcium = {
			tempHigh: 2200,
			stateHigh: "vaporized_calcium",
		}
		
		elements.vaporized_calcium = {
			color: ["#ffc94a", "#fcd34c", "#ffae36", "#ff9c40","#ffcd90","#cf8d50"],
			behavior: [
				"M2|M1|M2",
				"M1|XX|M1",
				"M2|M1|M2",
			],
			reactions: {
				"vaporized_calcium": { "elem1": null, "elem2": "hot_calcium_cloud", "chance":0.3, "y":[0,15] },
				"hot_calcium_cloud": { "elem1": "hot_calcium_cloud", "chance":0.4, "y":[0,15] },
			},
			density: 1.5, //most of these density values are complete bullshit due to a lack of research
			temp: 1550,
			tempLow: 1484,
			stateLow: "molten_calcium",
			category: "gases",
			state: "gas",
			hidden: true,
		},
		
		elements.hot_calcium_cloud = {
			color: ["#dfa98a", "#dcb38c", "#df8e76", "#ef8c60","#efbdb0","#af8d70"],
			behavior: [
				"XX|XX|XX",
				"M1%7|CH:molten_calcium%0.05|M1%7",
				"XX|XX|XX",
			],
			density: 1.5,
			temp: 1550,
			tempLow: 842,
			stateLow: "cold_calcium_cloud",
			category: "gases",
			state: "gas",
		},
		
		elements.cold_calcium_cloud = {
			color: ["#bf998a", "#bca38c", "#bf8e76", "#cf8c60","#cfadb0","#9f8d70"],
			behavior: [
				"XX|XX|XX",
				"M1%7|CH:calcium%0.05|M1%7",
				"XX|XX|XX",
			],
			density: 2,
			temp: 800,
			tempHigh: 842,
			stateHigh: "hot_calcium_cloud",
			category: "gases",
			state: "gas",
		}

	//}

	// clay {

		if(!elements.baked_clay) {
			elements.baked_clay = {}
		}

		elements.baked_clay.tempHigh = 1600 //the range of melting points online is so fucking wide
		elements.baked_clay.stateHigh = "molten_clay"

		elements.molten_clay = {
			color: ["#ff6d23","#ff5723","#ff4100"],
			behavior: [
				"XX|CR:fire%2.5|XX",
				"M2|XX|M2",
				"M1|M1|M1",
			],
			temp: 1700,
			tempLow: 1600,
			stateLow: "baked_clay",
			viscosity: 10000,
			hidden: true,
			state: "liquid",
			density: 1800,
			tempHigh: 2980,
			stateHigh: "vaporized_clay",
			category: "liquids",
		}

		elements.vaporized_clay = {
			color: ["#ff8d43","#ff7743","#ff6120"],
			behavior: [
				"M2|M1|M2",
				"M1|XX|M1",
				"M2|M1|M2",
			],
			reactions: {
				"vaporized_clay": { "elem1": null, "elem2": "hot_clay_cloud", "chance":0.3, "y":[0,15] },
				"hot_clay_cloud": { "elem1": "hot_clay_cloud", "chance":0.4, "y":[0,15] },
			},
			density: 1.6,
			temp: 1700,
			tempLow: 1600,
			stateLow: "molten_clay",
			category: "gases",
			state: "gas",
			hidden: true,
		},
		
		elements.hot_clay_cloud = {
			color: ["#ff9945", "#fca347", "#ff7e31"],
			behavior: [
				"XX|XX|XX",
				"M1%7|CH:molten_clay%0.05|M1%7",
				"XX|XX|XX",
			],
			density: 1.5,
			temp: 1550,
			tempLow: 842,
			stateLow: "cold_clay_cloud",
			category: "gases",
			state: "gas",
		},
		
		elements.cold_clay_cloud = {
			color: ["#ef7945", "#ec8347", "#ef5e31"],
			behavior: [
				"XX|XX|XX",
				"M1%7|CH:baked_clay%0.05|M1%7",
				"XX|XX|XX",
			],
			density: 2,
			temp: 800,
			tempHigh: 842,
			stateHigh: "hot_clay_cloud",
			category: "gases",
			state: "gas",
		},

	//}

	// salt {

		elements.molten_salt = {
			tempHigh: 1465,
			stateHigh: "vaporized_salt",
		}
		
		elements.vaporized_salt = {
			color: ["#ff9f60","#ffbc60","#ff7d60"],
			behavior: [
				"M2|M1|M2",
				"M1|XX|M1",
				"M2|M1|M2",
			],
			reactions: {
				"vaporized_salt": { "elem1": null, "elem2": "hot_salt_cloud", "chance":0.3, "y":[0,15] },
				"hot_salt_cloud": { "elem1": "hot_salt_cloud", "chance":0.4, "y":[0,15] },
			},
			density: 1946,
			temp: 1550,
			tempLow: 1465,
			stateLow: "molten_salt",
			category: "gases",
			state: "gas",
			hidden: true,
		},
		
		elements.hot_salt_cloud = {
			color: ["#ef8f30","#efac60","#ef6d60"],
			behavior: [
				"XX|XX|XX",
				"M1%7|CH:molten_salt%0.05|M1%7",
				"XX|XX|XX",
			],
			density: 2.2,
			temp: 1550,
			tempLow: 801,
			stateLow: "cold_salt_cloud",
			category: "gases",
			state: "gas",
		},
		
		elements.cold_salt_cloud = {
			color: ["#cf7f60","#cf9c60","#cf7d60"],
			behavior: [
				"XX|XX|XX",
				"M1%7|CH:salt%0.05|M1%7",
				"XX|XX|XX",
			],
			density: 2.2,
			temp: 700,
			tempHigh: 801,
			stateHigh: "hot_salt_cloud",
			category: "gases",
			state: "gas",
		}

	//}

	runAfterLoad(function() {
		if(elements.acid_gas.tempHigh) {
			delete elements.acid_gas.tempHigh
		}
		if(elements.acid_gas.stateHigh) {
			delete elements.acid_gas.stateHigh
		}
		elements.acid.stateHigh = "acid_gas"
		elements.acid_gas.tempLow = 400
		elements.acid_gas.stateLow = "acid"
		elements.yogurt.tempHigh = 400
		elements.yogurt.stateHigh = "ash"
		elements.dust.tempHigh = 400
		elements.dust.stateHigh = "fire"

		if(enabledMods.includes("mods/fey_and_more.js")) {
			//mistake
				elements.concoction.reactions.vaporized_glass = { "elem1": "mistake", "elem2": null }
				elements.concoction.reactions.hot_glass_cloud = { "elem1": "mistake", "elem2": null }
				elements.concoction.reactions.cold_glass_cloud = { "elem1": "mistake", "elem2": null }
				elements.concoction.reactions.molten_ash = { "elem1": "mistake", "elem2": null }
				elements.concoction.reactions.vaporized_ash = { "elem1": "mistake", "elem2": null }
				elements.concoction.reactions.hot_ash_cloud = { "elem1": "mistake", "elem2": null }
				elements.concoction.reactions.cold_ash_cloud = { "elem1": "mistake", "elem2": null }
				elements.concoction.reactions.calcined_soda = { "elem1": "mistake", "elem2": null }
				elements.concoction.reactions.molten_calcined_soda = { "elem1": "mistake", "elem2": null }
				elements.concoction.reactions.vaporized_calcined_soda = { "elem1": "mistake", "elem2": null }
				elements.concoction.reactions.hot_calcined_soda_cloud = { "elem1": "mistake", "elem2": null }
				elements.concoction.reactions.cold_calcined_soda_cloud = { "elem1": "mistake", "elem2": null }
				elements.concoction.reactions.washing_soda = { "elem1": "mistake", "elem2": null }
				elements.concoction.reactions.vaporized_calcium = { "elem1": "mistake", "elem2": null }
				elements.concoction.reactions.hot_calcium_cloud = { "elem1": "mistake", "elem2": null }
				elements.concoction.reactions.cold_calcium_cloud = { "elem1": "mistake", "elem2": null }
				elements.concoction.reactions.molten_clay = { "elem1": "mistake", "elem2": null }
				elements.concoction.reactions.vaporized_clay = { "elem1": "mistake", "elem2": null }
				elements.concoction.reactions.hot_clay_cloud = { "elem1": "mistake", "elem2": null }
				elements.concoction.reactions.cold_clay_cloud = { "elem1": "mistake", "elem2": null }
				elements.concoction.reactions.vaporized_salt = { "elem1": "mistake", "elem2": null }
				elements.concoction.reactions.hot_salt_cloud = { "elem1": "mistake", "elem2": null }
				elements.concoction.reactions.cold_salt_cloud = { "elem1": "mistake", "elem2": null }
		};

	});
}, true);