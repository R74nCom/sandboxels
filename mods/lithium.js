	neighbors = [[-1,0],[0,-1],[1,0],[0,1]]

	function exposedToAir(pixel) {	
		if(isEmpty(pixel.x+neighbors[0][0],pixel.y+neighbors[0][1],true) || isEmpty(pixel.x+neighbors[1][0],pixel.y+neighbors[1][1],true) || isEmpty(pixel.x+neighbors[2][0],pixel.y+neighbors[2][1],true) || isEmpty(pixel.x+neighbors[3][0],pixel.y+neighbors[3][1],true)) {
			return true
		} else {
			return false
		}
	}

	function randomChoice(array) {
		return array[Math.floor(Math.random() * array.length)];
	}

	function tryTarnish(pixel,element,chance) {
		if(exposedToAir(pixel)) {
			if(Array.isArray(element)) {
				if(Math.random() < chance) {
					changePixel(pixel,randomChoice(element))
				}
			} else {
				if(Math.random() < chance) {
					changePixel(pixel,element)
				}
			}
		}
	}

	//Non-element: Liquid ammonia
	elements.liquid_ammonia = {
		color: "#bab6a9",
		behavior: behaviors.LIQUID,
		reactions: {
			"methane": { "elem1":null, "elem2":"cyanide", "chance":0.25 },
			"plant": { "elem1":"plant", "chance":0.05 },
			"wheat_seed": { "elem1":"wheat", "chance":0.05 },
			"grass": { "elem1":"grass", "chance":0.05 },
			"grass_seed": { "elem1":"grass", "chance":0.05 },
			"bamboo_plant": { "elem1":"bamboo", "chance":0.05 },
			"flower_seed": { "elem1":"flower_seed", "chance":0.05 },
			"petal": { "elem1":"flower_seed", "chance":0.05 },
			"vine": { "elem1":"vine", "chance":0.05 },
			"sapling": { "elem1":"tree_branch", "chance":0.05 },
			"tree_branch": { "elem1":"tree_branch", "chance":0.05 },
			"corn_seed": { "elem1":"corn", "chance":0.05 },
			"root": { "elem1":"root", "chance":0.05 },
			"dirt": { "elem1":"grass", "chance":0.05 },
			"mud": { "elem1":"grass", "chance":0.05 },
			"potato_seed": { "elem1":"potato", "chance":0.05 },
			"yeast": { "elem1":"yeast", "chance":0.05 },
			"fish": { "elem2":"meat" },
			"frog": { "elem2":"meat" },
		},
		tempHigh: -78,
		stateHigh: "ammonia",
		category: "liquids",
		state: "liquid",
		hidden: true,
		density: 681.9,
	}

	elements.ammonia.tempLow = -78
	elements.ammonia.stateLow = "liquid_ammonia"

	//Hydrogen
	//Hydrogen exists, but its solid form doesn't.
	elements.liquid_hydrogen.tempLow = -259.16
	elements.liquid_hydrogen.stateLow = "hydrogen_ice"

	elements.hydrogen_ice = {
		color: "#E6E6FF",
		behavior: behaviors.WALL,
		density: 76,
		category: "solids",
		state: "solid",
		hidden: true,
		tempHigh: -259,
		stateHigh: "liquid_hydrogen",
	}

	//Lithium
	elements.lithium = {
		color: "#b0ab9d",
		behavior: behaviors.WALL,
		tick: function(pixel) {
			tryTarnish(pixel,"lithium_oxide",0.007) //oxidation
			if(pixel.temp >= 179) {
				pixel.burning = true; //auto-ignition at 179*C
				pixel.burnStart = pixelTicks; 
			}
		},
		reactions: {
			"steam": { "elem1": "hydrogen", "elem2": "lithium_hydroxide" }, //should be 2 Li(s) + 2 H2O -> 2 LiOH (aq) + H2(g) according to https://www.lenntech.com/periodic/water/lithium/lithium-and-water.htm#ixzz7LUgLrzua
			"water": { "elem1": "hydrogen", "elem2": "lithium_hydroxide" }, //should be 2 Li(s) + 2 H2O -> 2 LiOH (aq) + H2(g) according to https://www.lenntech.com/periodic/water/lithium/lithium-and-water.htm#ixzz7LUgLrzua
			"nitrogen": { "elem1": "lithium_nitride", "elem2": "lithium_nitride" }, //should be 6 Li + N2 → 2 Li3N according to Wikipedia
			"liquid_nitrogen": { "elem1": "lithium_nitride", "elem2": "lithium_nitride" }, //should be 6 Li + N2 → 2 Li3N according to Wikipedia
			"liquid_hydrogen": { "elem1": "lithium_hydride", "elem2": "lithium_hydride" }, //2 Li + H2 → 2 LiH
			"ammonia": { "elem1": ["hydrogen",null], "elem2": "lithium_amide" }, //2Li + 2NH_3 → 2LiNH_2 + H_2
			"liquid_ammonia": { "elem1": ["hydrogen",null], "elem2": "lithium_amide" }, //2Li + 2NH_3 → 2LiNH_2 + H_2
		},
		density: 534,
		category: "solids",
		state: "solid",
		conduct: 0.42697,
		hardness: 0.019,
		tempHigh: 180,
		burn: 20,
		burnTime: 130,
		fireColor: "#fc0a22",
	}

	elements.molten_lithium = {
		color: "#b0ab9d",
		behavior: behaviors.LIQUID,
		tick: function(pixel) {
			tryTarnish(pixel,"lithium_oxide",0.014) //oxidation
		},
		reactions: {
			"steam": { "elem1": "hydrogen", "elem2": "lithium_hydroxide" }, //should be 2 Li(s) + 2 H2O -> 2 LiOH (aq) + H2(g) according to https://www.lenntech.com/periodic/water/lithium/lithium-and-water.htm#ixzz7LUgLrzua
			"water": { "elem1": "hydrogen", "elem2": "lithium_hydroxide" }, //should be 2 Li(s) + 2 H2O -> 2 LiOH (aq) + H2(g) according to https://www.lenntech.com/periodic/water/lithium/lithium-and-water.htm#ixzz7LUgLrzua
			"nitrogen": { "elem1": "lithium_nitride", "elem2": "lithium_nitride" }, //should be 6 Li + N2 → 2 Li3N according to Wikipedia
			"liquid_nitrogen": { "elem1": "lithium_nitride", "elem2": "lithium_nitride" }, //should be 6 Li + N2 → 2 Li3N according to Wikipedia
			"liquid_hydrogen": { "elem1": "lithium_hydride", "elem2": "lithium_hydride" }, //2 Li + H2 → 2 LiH
			"ammonia": { "elem1": ["hydrogen",null], "elem2": "lithium_amide" }, //2Li + 2NH_3 → 2LiNH_2 + H_2
			"liquid_ammonia": { "elem1": ["hydrogen",null], "elem2": "lithium_amide" }, //2Li + 2NH_3 → 2LiNH_2 + H_2
		},
		burning: true,
		fireColor: "#fc0a22",
		density: 512,
	}

	elements.lithium_oxide = {
		color: "#eee9ec", //HRT UV-to-visible strategy again
		behavior: behaviors.POWDER,
		reactions: {
			"steam": { "elem1": "lithium_hydroxide", "elem2": "lithium_hydroxide", chance: 0.03 }, //> The oxide reacts slowly
			"water": { "elem1": "lithium_hydroxide", "elem2": "lithium_hydroxide", chance: 0.03 }, //> The oxide reacts slowly
			"carbon_dioxide": { "elem1": null, "elem2": "lithium_carbonate" },
		},
		density: 2013,
		category: "powders",
		state: "solid",
		hidden: true,
		tempHigh: 1438,
	}

	elements.lithium_hydroxide = {
		color: "#eeeeee",
		behavior: behaviors.POWDER,
		reactions: {
			"steam": { "elem1": null, "elem2": "lithium_hydroxide_monohydrate" },
			"water": { "elem1": null, "elem2": "lithium_hydroxide_monohydrate" },
			"carbon_dioxide": { "elem1": "water", "elem2": [null,"lithium_carbonate"], chance: 0.5 }, //simulating 2 LiOH + CO_2 → Li_2_CO_3 + H_2_O
		},
		density: 1460,
		category: "powders",
		state: "solid",
		hidden: true,
		tempHigh: 462,
	}

	elements.lithium_hydroxide_monohydrate = {
		color: "#e0e4e7",
		behavior: behaviors.POWDER,
		reactions: {
			"carbon_dioxide": { "elem1": "water", "elem2": [null,"lithium_carbonate"], chance: 0.5 }, //should be 2x water: 2 LiOH•H_2_O + CO_2 → Li_2_CO_3 + 2 H_2_O
		},
		tick: function(pixel) {
			emptyNeighborArray = [] //get empty neighbors to place split products
			for(i=0;i<4;i++) {
				if(isEmpty(pixel.x+neighbors[i][0],pixel.y+neighbors[i][1],true)) {
					emptyNeighborArray.push(neighbors[i])
				}
			}
			if(pixel.temp >= 100) {
				if(emptyNeighborArray.length > 0) {
					var placement = randomChoice(emptyNeighborArray)
					if(isEmpty(pixel.x+placement[0],pixel.y+placement[1])) {
						createPixel("steam",pixel.x+placement[0],pixel.y+placement[1])
						changePixel(pixel,"lithium_hydroxide")
					}
				}
			}
		},
		density: 1510,
		category: "powders",
		state: "solid",
		hidden: true,
	}

	elements.lithium_carbonate = { //todo?: https://en.wikipedia.org/wiki/Lithium_carbonate
		color: "#eeeeee",
		behavior: behaviors.POWDER,
		density: 2110,
		category: "powders",
		state: "solid",
		hidden: true,
		tempHigh: 723,
	}

	elements.lithium_nitride = {
		color: "#eeeeee",
		behavior: behaviors.POWDER,
		reactions: {
			"steam": { "elem1": "lithium_hydroxide", "elem2": "ammonia" }, //should be Li_3_N + 3 H_2_O → 3 LiOH + NH_3
			"water": { "elem1": "lithium_hydroxide", "elem2": "ammonia" }, //should be Li_3_N + 3 H_2_O → 3 LiOH + NH_3
			"hydrogen": { "elem1": "lithium_hydride", "elem2": "lithium_amide" }, //possibly Li_3_N + H → LiH + LiNH_2
			"liquid_hydrogen": { "elem1": "lithium_hydride", "elem2": "lithium_amide" }, //possibly Li_3_N + H → LiH + LiNH_2
		},
		density: 1270,
		category: "powders",
		state: "solid",
		hidden: true,
		tempHigh: 813,
	}

	elements.lithium_hydride = {
		color: "#eeeeee",
		behavior: behaviors.POWDER,
		reactions: { //this stuff is really f***ing reactive
			//"water": this thing's reaction with water has f***ing hydroxide ions and we know *nothing* about the physical properties of isolated hydroxide ions
			"ammonia": { "elem1": "hydrogen", "elem2": "lithium_amide" },
			"liquid_ammonia": { "elem1": "hydrogen", "elem2": "lithium_amide" },
		},
		density: 780,
		category: "powders",
		state: "solid",
		hidden: true,
		tempHigh: 689,
	}

	elements.lithium_amide = {
		color: "#eeeeee",
		behavior: behaviors.POWDER,
		reactions: {
			"steam": { "elem1": "lithium_hydroxide", "elem2": "ammonia" },
			"water": { "elem1": "lithium_hydroxide", "elem2": "ammonia" },
		},
		density: 1178,
		category: "powders",
		state: "solid",
		hidden: true,
		tempHigh: 375,
	}

	//Sodium exists
