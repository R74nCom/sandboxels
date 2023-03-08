var modName = "mods/nellfire.js";
var groundMod = "mods/the_ground.js";

if(enabledMods.includes(groundMod)) {

	function makeRegularRainbow(steps,s,l,outputFormat="rgb") {
		var hslArray = [];
		var divisionSize = 360 / steps;
		for(i = 0; i < 360; i += divisionSize) {
			hslArray.push({h: i, s: s, l: l});
		};
		return hslArray.map(x => convertHslObjects(x,outputFormat));
	};

	function rainbowSunColor(pixel) {
		var age = pixelTicks - pixel.start;
		var ss, ll;
		if (pixel.temp < 0) { ss = 20; ll = 10; var c=0 }
		else if (pixel.temp < 300) { ss = 20; ll = 15; var c=0 }
		else if (pixel.temp < 500) { ss = 30; ll = 20; var c=0.00003 }
		else if (pixel.temp < 850) { ss = 30; ll = 25; var c=0.0001 }
		else if (pixel.temp < 1300) { ss = 35; ll = 30; var c=0.0004 }
		else if (pixel.temp < 1800) { ss = 40; ll = 35; var c=0.001 }
		else if (pixel.temp < 2100) { ss = 45; ll = 40; var c=0.0025 }
		else if (pixel.temp < 2400) { ss = 50; ll = 45; var c=0.004 }
		else if (pixel.temp < 3200) { ss = 55; ll = 50; var c=0.007 }
		else if (pixel.temp < 3900) { ss = 65; ll = 55; var c=0.01 }
		else if (pixel.temp < 4600) { ss = 70; ll = 60; var c=0.015 }
		else if (pixel.temp < 6100) { ss = 75; ll = 65; var c=0.025 }
		else if (pixel.temp < 7200) { ss = 85; ll = 65; var c=0.035 }
		else if (pixel.temp < 8300) { ss = 95; ll = 70; var c=0.05 }
		else if (pixel.temp < 10400) { ss = 100; ll = 72.5; var c=0.07 }
		else if (pixel.temp < 12500) { ss = 100; ll = 75; var c=0.1 }
		else if (pixel.temp < 15600) { ss = 100; ll = 77.5; var c=0.125 }
		else if (pixel.temp < 18700) { ss = 100; ll = 80; var c=0.15 }
		else if (pixel.temp < 21800) { ss = 100; ll = 85; var c=0.175 }
		else if (pixel.temp < 28900) { ss = 100; ll = 90; var c=0.2 }
		else if (pixel.temp < 36000) { ss = 100; ll = 92.5; var c=0.25 }
		else if (pixel.temp < 45600) { ss = 100; ll = 94; var c=0.3 }
		else if (pixel.temp < 52200) { ss = 100; ll = 96.5; var c=0.4 }
		else if (pixel.temp < 58300) { ss = 100; ll = 98; var c=0.5 }
		else if (pixel.temp < 63400) { ss = 100; ll = 98.5; var c=0.6 }
		else if (pixel.temp < 68500) { ss = 100; ll = 98.5; var c=0.7 }
		else if (pixel.temp < 73600) { ss = 100; ll = 98.5; var c=0.8 }
		else { ss = 100; ll = 98.5; var c=0.9 }
		
		var hslJson = {h: (age) % 360, s: ss, l: ll};
		pixel.color = pixelColorPick(pixel,convertHslObjects(hslJson,"hex"));

		return c;
	};


	elements.rainbow_sun = {
		color: ["#ffbdbd", "#f2ffbd", "#bdffd7", "#bdd7ff", "#f2bdff"],
		tick: function(pixel) {
			starLightAndConduction(pixel,rainbowSunColor(pixel),["sun","nellsun","rainbow_sun"])
		},
		reactions: {
			"hydrogen": { "elem2":"helium", "temp1":5 },
			"helium": { "elem2":"carbon_dioxide", "temp1":5, "tempMax":3600 },
			"carbon_dioxide": { "elem2":"neon", "temp1":5, "tempMax":1800 },
		},
		temp: 5700,
		tempLow: -100,
		stateLow: "supernova",
		category: "special",
		state: "gas",
		//density: 1408, 
		insulate: true,
		nellfireImmune: true,
	};

	elements.rainbow_fire = {
		color: [
			{h: 330, s: 100, l: 56},
			{h: 0, s: 100, l: 59},
			{h: 22, s: 100, l: 58},
			{h: 42, s: 100, l: 57},
			{h: 60, s: 100, l: 55},
			{h: 73, s: 100, l: 49},
			{h: 120, s: 100, l: 49.5},
			{h: 159, s: 100, l: 52},
			{h: 159, s: 100, l: 52},
			{h: 180, s: 100, l: 49.5},
			{h: 197, s: 100, l: 59},
			{h: 240, s: 100, l: 58.5},
			{h: 280, s: 94, l: 53},
			{h: 307, s: 100, l: 55}
		].map(x => convertHslObjects(x,"hex")),
		behavior: behaviors.UL_UR,
		reactions: {
			"fire": { "elem1": "rainbow_fire" },
			"water": { "elem1": "color_smoke" },
			"steam": { "elem1": "color_smoke" },
			"carbon_dioxide": { "elem1": "color_smoke" },
			"dirty_water": { "elem1": "color_smoke" },
			"salt_water": { "elem1": "color_smoke" },
			"sugar_water": { "elem1": "color_smoke" },
		},
		nellfireImmune: true,
		fireSpawnChance: 0,
		temp:610,
		tempLow:102,
		stateLow: "color_smoke",
		tempHigh: 7000,
		stateHigh: "plasma",
		category: "energy",
		burning: true,
		burnTime: 44,
		burnInto: "color_smoke",
		state: "gas",
		density: 0.21,
		ignoreAir: true,
		noMix: true,
	};
	
	elements.color_smoke.tempHigh = 610;
	elements.color_smoke.stateHigh = "rainbow_fire";

	elements.rainbow_glass = {
		color: makeRegularRainbow(12,100,70,"hex"),
		behavior: behaviors.WALL,
		tempHigh: 1765,
		category: "solids",
		state: "solid",
		density: 2711,
		breakInto: "rainbow_glass_shard",
		noMix: true,
		nellfireImmune: true,
	};

	elements.rainbow_glass_shard = {
		color: makeRegularRainbow(18,70,65,"hex"),
		behavior: behaviors.POWDER,
		tempHigh: 1784,
		stateHigh: "molten_rainbow_glass",
		category: "powders",
		state: "solid",
		density: 2213,
		nellfireImmune: true,
	};

	elements.rainbow_sand = {
		color: makeRegularRainbow(7,100,94,"hex").concat("#fbfbfb"),
		behavior: behaviors.POWDER,
		tempHigh: 1731,
		stateHigh: "molten_rainbow_glass",
		category: "land",
		state: "solid",
		density: 1733,
		_data: ["rainbow_sand_material","rainbow_sand_material","particulate"],
		nellfireImmune: true,
	};

	runAfterLoad(function() {
		elements.water.reactions.rainbow_sand = { elem1: null, elem2: "wet_rainbow_sand" };
		elements.water.reactions.wet_rainbow_sand = { "elem1": "rainbow_sand_water", "elem2": [ "rainbow_sand", "rainbow_sand", "rainbow_sand", "rainbow_sand_water" ], "chance": 0.01 };
	});

	elements.wet_rainbow_sand = {
		color: makeRegularRainbow(7,100,84,"hex").concat("#e0e0e0"),
		behavior: behaviors.STURDYPOWDER,
		category: "land",
		reactions: {
			"dirt": { "elem1":"sand", "elem2":"mud", "chance":0.0005, "oneway":true },
		},
		state: "solid",
		tempHigh: 100,
		stateHigh: "packed_rainbow_sand",
		tempLow: -50,
		stateLow:"packed_rainbow_sand",
		density: 1733 * 0.595 + 150,
		_data: ["rainbow_sand_material","rainbow_sand_material","wet_particulate"],
		nellfireImmune: true,
	};

	elements.packed_rainbow_sand = {
		color: makeRegularRainbow(7,70,86,"hex").concat("#dbdbdb"),
		behavior: behaviors.SUPPORT,
		category: "land",
		state: "solid",
		tempHigh: 1731,
		stateHigh: "rainbow_glass",
		density: 1733 * 0.59,
		breakInto: "rainbow_sand",
		_data: ["rainbow_sand_material","rainbow_sand_material","packed_particulate"],
		nellfireImmune: true,
	};

	makeNonSandSedimentationElements("rainbow_sand","rainbow_sand_water","rainbow_sandstone");

	elements.rainbow_sandstone.color = makeRegularRainbow(14,90,71,"hex").concat("#b5b5b5");

	var immunes = ["rainbow_sand_water", "rainbow_sand_sediment", "rainbow_sandstone", "phirite", "solid_phirite", "phirite_gravel", "aphirite", "solid_aphirite", "phirite_sand", "wet_phirite_sand", "packed_phirite_sand", "aphirite_gravel", "aphirite_sand", "wet_aphirite_sand", "packed_aphirite_sand", "vesirite", "solid_vesirite", "vesirite_gravel", "vesirite_sand", "wet_vesirite_sand", "packed_vesirite_sand", "vitirite", "solid_vitirite", "vitirite_shard", "vitirite_sand", "wet_vitirite_sand", "packed_vitirite_sand", "rainbow_magma", "vaporized_rainbow_magma", "rainbow_magma_cloud", "phirite_sandy_water", "phirite_sand_sediment", "phirite_sandstone", "aphirite_sandy_water", "aphirite_sand_sediment", "aphirite_sandstone", "vesirite_sandy_water", "vesirite_sand_sediment", "vesirite_sandstone", "vitirite_sandy_water", "vitirite_sand_sediment", "vitirite_sandstone", "phirite_dust", "aphirite_dust", "vesirite_dust", "vitirite_dust" ];

	runAfterLoad(function() {
		for(i = 0; i < immunes.length; i++) {
			if(!elements[immunes[i]]) {
				console.error(immunes[i]);
				continue;
			}
			elements[immunes[i]].nellfireImmune = true;
		};
	});

newIgneousCompositionFamily(
		"rainbow",
		133487,
		5512,
		-71,
		-17,
		4555,
		
		"phirite",
		makeRegularRainbow(6,70,45,"hex"),
		1671,
		4004,
		
		"aphirite",
		makeRegularRainbow(24,63,75,"hex").concat("#bfbfbf"),
		1685,
		3951,
		
		"vesirite",
		makeRegularRainbow(13,55,80,"hex").concat(makeRegularRainbow(13,45,50,"hex")),
		1712,
		2918,
		
		"vitirite",
		makeRegularRainbow(30,70,35,"hex").concat("#595959"),
		2054,
		3741,
		
		3,7
	);
} else {
	enabledMods.splice(enabledMods.indexOf(modName),0,groundMod);
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert(`The ${groundMod} mod is required and has been automatically inserted (reload for this to take effect).`);
};
