var modName = "mods/nellfire.js";
var groundMod = "mods/the_ground.js";
var libHookTickMod = "mods/libhooktick.js";

if(enabledMods.includes(groundMod) && enabledMods.includes(libHookTickMod)) {
	function nellsunColor(pixel) {
		if (pixel.temp < 0) { pixel.color = pixelColorPick(pixel,"#615e5e"); var c=0 }
		else if (pixel.temp < 300) { pixel.color = pixelColorPick(pixel,"#664962"); var c=0 }
		else if (pixel.temp < 500) { pixel.color = pixelColorPick(pixel,"#714487"); var c=0.00004 }
		else if (pixel.temp < 850) { pixel.color = pixelColorPick(pixel,"#6a43bf"); var c=0.00015 }
		else if (pixel.temp < 1300) { pixel.color = pixelColorPick(pixel,"#c356db"); var c=0.0005 }
		else if (pixel.temp < 1800) { pixel.color = pixelColorPick(pixel,"#f04ac4"); var c=0.0015 }
		else if (pixel.temp < 2100) { pixel.color = pixelColorPick(pixel,"#f788c5"); var c=0.004 }
		else if (pixel.temp < 2400) { pixel.color = pixelColorPick(pixel,"#f7a3b8"); var c=0.007 }
		else if (pixel.temp < 3200) { pixel.color = pixelColorPick(pixel,"#ffd1d9"); var c=0.01 }
		else if (pixel.temp < 3900) { pixel.color = pixelColorPick(pixel,"#fce1e1"); var c=0.02 }
		else if (pixel.temp < 4600) { pixel.color = pixelColorPick(pixel,"#fff5f5"); var c=0.035 }
		else if (pixel.temp < 6100) { pixel.color = pixelColorPick(pixel,"#ffffff"); var c=0.05 }
		else if (pixel.temp < 7200) { pixel.color = pixelColorPick(pixel,"#f4fad9"); var c=0.075 } //new in-between state because the transition is too jarring
		else if (pixel.temp < 8300) { pixel.color = pixelColorPick(pixel,"#e4f2c2"); var c=0.1 } //most of these are not real because of the kid named Planckian locus, but it makes it more fun
		else if (pixel.temp < 10400) { pixel.color = pixelColorPick(pixel,"#c6f2a2"); var c=0.125 }
		else if (pixel.temp < 12500) { pixel.color = pixelColorPick(pixel,"#90f277"); var c=0.15 }
		else if (pixel.temp < 15600) { pixel.color = pixelColorPick(pixel,"#75f754"); var c=0.175 }
		else if (pixel.temp < 18700) { pixel.color = pixelColorPick(pixel,"#5aff30"); var c=0.2 }
		else if (pixel.temp < 21800) { pixel.color = pixelColorPick(pixel,"#1df54f"); var c=0.25 }
		else if (pixel.temp < 28900) { pixel.color = pixelColorPick(pixel,"#3ce873"); var c=0.3 }
		else if (pixel.temp < 36000) { pixel.color = pixelColorPick(pixel,"#4fdb90"); var c=0.35 }
		else if (pixel.temp < 45600) { pixel.color = pixelColorPick(pixel,"#5dcfa7"); var c=0.4 }
		else if (pixel.temp < 52200) { pixel.color = pixelColorPick(pixel,"#4fe3af"); var c=0.45 }
		else if (pixel.temp < 58300) { pixel.color = pixelColorPick(pixel,"#3cfad4"); var c=0.5 }
		else if (pixel.temp < 63400) { pixel.color = pixelColorPick(pixel,"#26f8ff"); var c=0.6 }
		else if (pixel.temp < 68500) { pixel.color = pixelColorPick(pixel,"#19d9ff"); var c=0.7 }
		else if (pixel.temp < 73600) { pixel.color = pixelColorPick(pixel,"#08b1ff"); var c=0.8 }
		else { pixel.color = pixelColorPick(pixel,"#0099ff"); var c=0.9 }
		return c;
	};

	function nellSLAC(pixel,c,whitelist=["sun","nellsun"]) {
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

	elements.nellsun = {
		color: ["#ff26ac", "#ffb8e4", "#ffffff", "#b7ffa8", "#2df7b4"],
		tick: function(pixel) {
			nellSLAC(pixel,nellsunColor(pixel));
		},
		reactions: {
			"hydrogen": { "elem2":"helium", "temp1":5 },
			"helium": { "elem2":"carbon_dioxide", "temp1":5, "tempMax":3600 },
			"carbon_dioxide": { "elem2":"neon", "temp1":5, "tempMax":1800 },
		},
		temp: 5504,
		tempLow: -100,
		stateLow: "supernova",
		category: "special",
		state: "gas",
		//density: 1408, 
		insulate: true,
		nellfireImmune: true,
	};

	elements.nellfire = {
		color: ["#ff8929","#ffb429","#ffde0a"],
		behavior: [
			"M1|M1|M1",
			"M1%10 AND M2|HT%2|M1%10 AND M2",
			"XX|M2|XX"
		],
		reactions: {
			"fire": { "elem2": "nellfire" },
			/*"water": { "elem1": "smoke" },
			"steam": { "elem1": "smoke" },
			"carbon_dioxide": { "elem1": "smoke" },
			"dirty_water": { "elem1": "smoke" },
			"salt_water": { "elem1": "smoke" },
			"sugar_water": { "elem1": "smoke" },*/
		},
		tick: function(pixel) {
			if(pixel.burning) {
				delete pixel.burning;
				delete pixel.burnStart;
				pixel.nellburn = true;
				pixel.nellburnStart ??= pixelTicks;
			};
		},
		nellBurningWhenConverted: true,
		temp:900,
		nellFireSpawnChance: 0,
		//tempLow:200,
		//stateLow: "smoke",
		category: "energy",
		burning: true,
		nellburnTime: 50,
		nellburnInto: null,
		state: "gas",
		density: 0.06,
		ignoreAir: true,
		noMix: true,
		desc: "Researchers first came into this place and thought it was Hell&mdash; it wasn't, so they renamed it Nell (Not Hell). They still named the materials in it hell references, though.",
	},

	elements.nellglass = {
		color: ["#a161b0", "#b06177", "#b59159"],
		behavior: behaviors.WALL,
		tempHigh: 1765,
		category: "solids",
		state: "solid",
		density: 5012,
		breakInto: "nellglass_shard",
		noMix: true,
		nellfireImmune: true,
	};

	elements.dantite = {
		color: ["#5effba", "#85edd1", "#62d9c7", "#3efa9c", "#21b9db"],
		tempHigh: 2000,
		behavior: behaviors.POWDER,
		category: "powders",
		state: "solid",
		density: 1442,
		hardness: 0.47,
		nellfireImmune: "torch",
	};

	elements.molten_dantite = {
		color: ["#5eff6b", "#70faaa", "#31e08b", "#a1f051"],
		density: 4012,
		hardness: 0.84,
		nellfireImmune: "torch",
	};

	elements.limtupyte = { //λίμνη τοῦ πυρός
		color: ["#212121", "#212121", "#40221f", "#611d14"],
		behavior: behaviors.WALL,
		category: "solids",
		state: "solid",
		density: 8012,
		hardness: 0.87,
		nellfireImmune: true,
		tempHigh: 9011,
		stateHigh: "alpha_limtupyte",
	};

	elements.alpha_limtupyte = {
		name: "α-limtupyte",
		color: ["#6e1414", "#8f210b", "#a34910", "#c27115"],
		density: 10112,
		behavior: behaviors.MOLTEN,
		category: "molten",
		hidden: true,
		state: "liquid",
		hardness: 0.91,
		nellfireImmune: true,
		temp: 9500,
		tempHigh: 11022,
		stateHigh: "beta_limtupyte",
		tempLow: 9011,
		stateLow: "limtupyte",
	};

	elements.beta_limtupyte = {
		name: "β-limtupyte",
		color: ["#e68917", "#ffbd24", "#ffe940", "#ffff61"],
		density: 13178,
		behavior: behaviors.MOLTEN,
		category: "molten",
		hidden: true,
		state: "liquid",
		hardness: 0.93,
		nellfireImmune: true,
		temp: 12000,
		tempHigh: 14316,
		stateHigh: "limtupyte_gas",
		tempLow: 11022,
		stateLow: "alpha_limtupyte",
	};

	elements.limtupyte_gas = {
		color: ["#ffff80", "#ffe940", "#feffd1", "#ffffff"],
		density: 17.12,
		behavior: behaviors.GAS,
		category: "states",
		hidden: true,
		state: "gas",
		hardness: 1,
		nellfireImmune: true,
		temp: 15000,
		tempLow: 14316,
		stateLow: "beta_limtupyte",
	};

	elements.nellglass_shard = {
		color: ["#7d5f8c","#875966","#9e7b47"],
		behavior: behaviors.POWDER,
		tempHigh: 1765,
		stateHigh: "molten_nellglass",
		category: "powders",
		state: "solid",
		density: 4212,
		nellfireImmune: true,
	};

	elements.nellsand = {
		color: ["#906fa8", "#80747a", "#b08464"],
		behavior: behaviors.POWDER,
		tempHigh: 1911,
		stateHigh: "molten_nellglass",
		category: "land",
		state: "solid",
		density: 3742,
		_data: ["nellsand_material","nellsand_material","particulate"],
		nellfireImmune: true,
	};

	runAfterLoad(function() {
		elements.water.reactions.nellsand = { elem1: null, elem2: "wet_nellsand" };
		elements.water.reactions.wet_nellsand = { "elem1": "nellsand_water", "elem2": [ "nellsand", "nellsand", "nellsand", "nellsand_water" ], "chance": 0.01 };
	});

	elements.wet_nellsand = {
		color: sandizeToHex("nellsand","w"),
		behavior: behaviors.STURDYPOWDER,
		category: "land",
		reactions: {
			"dirt": { "elem1":"sand", "elem2":"mud", "chance":0.0005, "oneway":true },
		},
		state: "solid",
		tempHigh: 100,
		stateHigh: "packed_nellsand",
		tempLow: -50,
		stateLow:"packed_nellsand",
		density: 3742 * 0.595 + 150,
		_data: ["nellsand_material","nellsand_material","wet_particulate"],
		nellfireImmune: true,
	};

	elements.packed_nellsand = {
		color: sandizeToHex("nellsand","p"),
		behavior: behaviors.SUPPORT,
		category: "land",
		state: "solid",
		tempHigh: 1911,
		stateHigh: "nellglass",
		density: 3742 * 0.59,
		breakInto: "nellsand",
		_data: ["nellsand_material","nellsand_material","packed_particulate"],
		nellfireImmune: true,
	};

	makeNonSandSedimentationElements("nellsand","nellsand_water","nellsandstone");

	nellburnObject = {
		"dirt": "nellsand",
		"dry_dirt": "nellsand",
		"mud": "wet_nellsand",
		"mudstone": "packed_nellsand",
		"brass": ["nell_ash","zinc"],
		"thermite": ["nell_ash","zinc"],
		"rose_gold": ["nell_ash","gold"],
		"electrum": ["nell_ash","gold"],
		"molten_brass": ["nell_ash","molten_zinc"],
		"molten_thermite": ["nell_ash","molten_zinc"],
		"molten_rose_gold": ["nell_ash","molten_gold"],
		"molten_electrum": ["nell_ash","molten_gold"],
		"sun": "nellsun",
	};

	var otherImmunes = ["fire","smoke","plasma","cold_fire","radiation","light","proton","neutron","electron","positron","antimatter","cold_smoke","rad_fire","rad_smoke","laser","liquid_fire","liquid_smoke","liquid_plasma","liquid_cold_fire","liquid_cold_smoke","liquid_rad_fire","liquid_rad_fire","liquid_rad_smoke","le_liquid_light","liquid_laser","pure_ice","pure_water","pure_steam","magic","gold","zinc","molten_gold","molten_zinc","pyreite","infernium","molten_pyreite","molten_infernium","infernyrite","molten_infernyrite","infernyreitheum","molten_infernyreitheum","pyrinfernyreitheum","molten_pyrinfernyreitheum","stellar_plasma","liquid_stellar_plasma","hydrogen","liquid_hydrogen","hydrogen_ice","neutronium","molten_neutronium","liquid_neutronium","neutronium_gas","liquid_degenerate_neutronium","gaseous_degenerate_neutronium"].concat(["water","ice","slush","snow","packed_snow","steam",   "heavy_steam","heavy_water","heavy_ice","heavy_snow",    "hydrogen_ice","liquid_hydrogen","hydrogen","ionized_hydrogen",   "liquid_helium","helium","ionized_helium",   "tralphium","liquid_tralphium","ionized_tralphium", "carbon","charcoal","diamond","molten_carbon",   "carbon_monoxide","liquid_carbon_monoxide","carbon_monoxide_ice",   "carbon_dioxide","dry_ice","seltzer","seltzer_ice","foam"]);

	for(let i = 0; i < otherImmunes.length; i++) {
		var element = otherImmunes[i];
		if(elements[element]) { elements[element].nellfireImmune = true };
	};

	runAfterLoad(function() {
		var rockdataElements = Object.keys(elements).filter(function(name) {
			return (
				elements[name]._data && 
				!["blackened_carbonate","nellish","nellsand_material"].includes(elements[name]._data[0])
			)
		});

		for(i = 0; i < rockdataElements.length; i++) {
			name = rockdataElements[i];
			var info = elements[name];
			switch(info._data[1]) {
				case "phanerite":
					switch(info._data[2]) {
						case "igneous_rock":
							nellburnObject[name] = "gehennite"
							break;
						case "solid_igneous_rock":
							nellburnObject[name] = "solid_gehennite"
							break;
						case "igneous_gravel":
							nellburnObject[name] = "gehennite_gravel"
							break;
						case "particulate":
							nellburnObject[name] = "gehennite_sand"
							break;
						case "dust":
							nellburnObject[name] = "gehennite_dust"
							break;
						case "wet_particulate":
							nellburnObject[name] = "wet_gehennite_sand"
							break;
						case "packed_particulate":
							nellburnObject[name] = "packed_gehennite_sand"
							break;
						case "sediment":
							nellburnObject[name] = "gehennite_sand_sediment"
							break;
						case "suspension":
							nellburnObject[name] = "gehennite_sandy_water"
							break;
					};
					break;
				case "aphanite":
					//console.log(info._data[2]);
					switch(info._data[2]) {
						case "igneous_rock":
							nellburnObject[name] = "nellrock"
							break;
						case "solid_igneous_rock":
							nellburnObject[name] = "solid_nellrock"
							break;
						case "igneous_gravel":
							nellburnObject[name] = "nellrock_gravel"
							break;
						case "particulate":
							nellburnObject[name] = "nellrock_sand"
							break;
						case "dust":
							nellburnObject[name] = "nellrock_dust"
							break;
						case "wet_particulate":
							nellburnObject[name] = "wet_nellrock_sand"
							break;
						case "packed_particulate":
							nellburnObject[name] = "packed_nellrock_sand"
							break;
						case "sediment":
							nellburnObject[name] = "nellrock_sand_sediment"
							break;
						case "suspension":
							nellburnObject[name] = "nellrock_sandy_water"
							break;
					};
					break;
				case "vesiculite":
					//console.log(info._data[2]);
					switch(info._data[2]) {
						case "igneous_rock":
							nellburnObject[name] = "hadean_sponge"
							break;
						case "solid_igneous_rock":
							nellburnObject[name] = "solid_hadean_sponge"
							break;
						case "igneous_gravel":
							nellburnObject[name] = "hadean_sponge_gravel"
							break;
						case "particulate":
							nellburnObject[name] = "hadean_sponge_sand"
							break;
						case "dust":
							nellburnObject[name] = "hadean_sponge_dust"
							break;
						case "wet_particulate":
							nellburnObject[name] = "wet_hadean_sponge_sand"
							break;
						case "packed_particulate":
							nellburnObject[name] = "packed_hadean_sponge_sand"
							break;
						case "sediment":
							nellburnObject[name] = "hadean_sponge_sand_sediment"
							break;
						case "suspension":
							nellburnObject[name] = "hadean_sponge_sandy_water"
							break;
					};
					break;
				case "vitrite":
					//console.log(info._data[2]);
					switch(info._data[2]) {
						case "igneous_rock":
							nellburnObject[name] = "gehidian"
							break;
						case "solid_igneous_rock":
							nellburnObject[name] = "solid_gehidian"
							break;
						case "igneous_gravel":
							nellburnObject[name] = "gehidian_gravel"
							break;
						case "particulate":
							nellburnObject[name] = "gehidian_sand"
							break;
						case "dust":
							nellburnObject[name] = "gehidian_dust"
							break;
						case "wet_particulate":
							nellburnObject[name] = "wet_gehidian_sand"
							break;
						case "packed_particulate":
							nellburnObject[name] = "packed_gehidian_sand"
							break;
						case "sediment":
							nellburnObject[name] = "gehidian_sand_sediment"
							break;
						case "suspension":
							nellburnObject[name] = "gehidian_sandy_water"
							break;
					};
					break;
				case "phanerite_sandstone":
					nellburnObject[name] = "gehennite_sandstone"
					break;
				case "aphanite_sandstone":
					nellburnObject[name] = "nellrock_sandstone"
					break;
				case "vesiculite_sandstone":
					nellburnObject[name] = "hadean_sponge_sandstone"
					break;
				case "vitrite_sandstone":
					nellburnObject[name] = "gehidian_sandstone"
					break;
				case "silica_sandstone":
					nellburnObject[name] = "nellsandstone"
					break;
				case "magma":
					switch(info._data[2]) {
						case "liquid":
							nellburnObject[name] = "nellish_magma"
							break;
						case "vaporized":
							nellburnObject[name] = "vaporized_nellish_magma"
							break;
						case "cloud":
							nellburnObject[name] = "nellish_magma_cloud"
							break;
					};
					break;
				case "rock":
					switch(name) {
						case "shale":
							nellburnObject[name] = "nellsandstone"
							break;
						case "limestone":
							nellburnObject[name] = "black_limestone"
							break;
					};
					break;
				case "calcium":
					switch(info._data[2]) {
						case "particulate":
						case "mineral":
							nellburnObject[name] = bccd
							break;
						case "sediment":
							nellburnObject[name] = "blackened_calcium_carbonate_dust_sediment"
							break;
						case "suspension":
							nellburnObject[name] = bccs
							break;
					};
					break;
				case "silica":
					switch(info._data[2]) {
						case "particulate":
							nellburnObject[name] = "nellsand"
							break;
						case "wet_particulate":
							nellburnObject[name] = "wet_nellsand"
							break;
						case "packed_particulate":
							nellburnObject[name] = "packed_nellsand"
							break;
						case "suspension":
							nellburnObject[name] = "nellsand_water"
							break;
						case "sediment":
							nellburnObject[name] = "nellsand_sediment"
							break;
					};
					break;
				case "clay":
					switch(info._data[2]) {
						case "particulate":
							nellburnObject[name] = "nellsand"
							break;
						case "suspension":
							nellburnObject[name] = "nellsand_water"
							break;
						case "sediment":
							nellburnObject[name] = "nellsand_sediment"
							break;
					};
					break;
				default:
					console.log(name,info._data);
			};
		};

		nellfireSpawnBlacklist = ["nellfire"];
	});

	elements.nell_ash = {
		color: ["#ab9393","#947873"],
		behavior: behaviors.POWDER,
		/*reactions: {
			"steam": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,12], "setting":"clouds" },
			"rain_cloud": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,12], "setting":"clouds" },
			"cloud": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,12], "setting":"clouds" },
			"snow_cloud": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,12], "setting":"clouds" },
			"hail_cloud": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,12], "setting":"clouds" },
			"acid_cloud": { "elem1": "pyrocumulus", "chance":0.05, "y":[0,12], "setting":"clouds" },
			"pyrocumulus": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,12], "setting":"clouds" },
			"stench": { "elem2":null, "chance":0.1 }
		},*/
		category:"powders",
		state: "solid",
		nellfireImmune: true,
		tick: function(pixel) {
			if(Math.random() < 0.01 && pixel.temp < 25) {
				pixel.temp++;
			};
		},
		density: 810,
		//tempHigh: 2000,
		//forceAutoGen: true,
		//stateHigh: ["molten_ash","smoke","smoke","smoke"]
	};

	elements.wall.nellfireImmune = true;

	/*
		info.nellfireImmune
		info.nellburnTempChange
		info.nellFireElement
		info.nellFireSpawnTemp
		info.nellFireSpawnChance
		info.nellburn
		info.nellburnInto
		info.nellFireColor
	*/

	function doNellfire(pixel) {
		var info = elements[pixel.element];
		if((info.nellfireImmune && info.nellfireImmune !== "torch") && pixel.nellburn) {
			delete pixel.nellburn;
			delete pixel.nellburnStart;
			return;
		};
		if (pixel.nellburn) { // Burning
			pixel.nellburnStart ??= pixelTicks;
			var nellburnTempChange = info.nellburnTempChange ?? 1;
			var fire = info.nellFireElement === undefined ? "nellfire" : info.nellFireElement; //allow null but disallow undefined
			//console.log(info.nellFireElement,fire);
			while(fire instanceof Array) {
				fire = fire[Math.floor(Math.random()*fire.length)];
			};
			var nellFireTemp = info.nellFireSpawnTemp ?? pixel.temp;
			var nellFireChance = info.nellFireSpawnChance ?? 20;

			pixel.temp += nellburnTempChange ?? 4;
			pixelTempCheck(pixel);
			
			for (var i = 0; i < adjacentCoords.length; i++) { // Burn adjacent pixels
				var x = pixel.x+adjacentCoords[i][0];
				var y = pixel.y+adjacentCoords[i][1];
				if (!isEmpty(x,y,true)) {
					var newPixel = pixelMap[x][y];
					var newInfo = elements[newPixel.element];
					var spreadChance = newInfo.nellburn ?? 15
					if (spreadChance && !newPixel.nellburn) {
						if (Math.floor(Math.random()*100) < spreadChance) {
							newPixel.nellburn = true;
							newPixel.nellburnStart = pixelTicks;
						}
					}
				}
			}

			if (info.nellfireImmune !== "torch" && (pixelTicks - pixel.nellburnStart > (info.nellburnTime || 150)) && Math.floor(Math.random()*100)<(info.nellburn || 25)) {
				var burnInto = info.nellburnInto;
				//console.log(burnInto);
				if(burnInto === undefined) { burnInto = nellburnObject[pixel.element] };
				//console.log(burnInto);
				if(burnInto === undefined) { burnInto = [null,"nell_ash"] };
				//console.log(burnInto);
				while(burnInto instanceof Array) {
					burnInto = burnInto[Math.floor(Math.random()*burnInto.length)];
				};
				//console.log(burnInto);
				if(burnInto == null) { deletePixel(pixel.x,pixel.y); return } else { changePixel(pixel,burnInto,burnInto !== "smoke") };
				if(!elements[burnInto].nellBurningWhenConverted) {
					delete pixel.nellburn;
					delete pixel.nellburnStart;
				};
				//console.log("ass");
				pixel.temp = nellFireTemp;
				if (info.nellFireColor != undefined && burnInto == "nellfire") {
					pixel.color = pixelColorPick(pixel,info.nellFireColor);
				}
				else {
					pixel.color = pixelColorPick(pixel)
				}
			}
			else if (Math.floor(Math.random()*100)<nellFireChance && !nellfireSpawnBlacklist.includes(pixel.element)) { // Spawn fire
				//console.log(fire);
				if (isEmpty(pixel.x,pixel.y-1)) {
					if(fire !== null) {
						createPixel(fire,pixel.x,pixel.y-1);
						pixelMap[pixel.x][pixel.y-1].temp = nellFireTemp;
						if (info.nellFireColor != undefined) {
							pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1],info.nellFireColor);
						};
					};
				}
				// same for below if top is blocked
				else if (isEmpty(pixel.x,pixel.y+1)) {
					if(fire !== null) {
						createPixel(fire,pixel.x,pixel.y+1);
						pixelMap[pixel.x][pixel.y+1].temp = nellFireTemp;
						if (info.nellFireColor != undefined) {
							pixelMap[pixel.x][pixel.y+1].color = pixelColorPick(pixelMap[pixel.x][pixel.y+1],info.nellFireColor);
						};
					};
				}
			}
		}
	}

	newIgneousCompositionFamily(
		"nellish",
		10,
		3012,
		-96,
		-12,
		3812,
		
		"gehennite",
		["#857c71", "#b5a98d", "#91847c", "#948b68", "#8a834a", "#adad34"],
		2011,
		3432,
		
		"nellrock",
		["#a15a42","#997849","#946043","#8c533e","#a66658"],
		2036,
		3371,
		
		"hadean_sponge",
		["#e66785", "#b54761", "#cc8156", "#dbc760", "#ab9a44"],
		2213,
		1012,
		
		"gehidian",
		["#754c2f", "#855d3a", "#702a1c", "#691a41"],
		2054,
		3112,
		
		1,9
	);

	var bccd = "blackened_calcium_carbonate_dust";
	var bccs = "blackened_calcium_carbonate_solution";

	elements.calcium_carbonate_dust.reactions ??= {};
	elements.calcium_carbonate_dust.reactions.charcoal = {
		elem1: bccd, elem2: [bccd, "charcoal", "charcoal"]
	};


	newPowder(bccd,"#948e87",2771,804,["carbon_dioxide","quicklime","charcoal","ash"]);
	elements[bccd]._data = ["blackened_carbonate","blackened_carbonate","particulate"];
	elements[bccd].nellfireImmune = true;

	makeNonSandSedimentationElements(bccd,bccs,"black_limestone");

	elements.blackened_calcium_carbonate_dust_sediment.color = "#756e64";
	elements.blackened_calcium_carbonate_dust_sediment.nellfireImmune = true;

	elements.black_limestone.color = "#575148";
	elements.black_limestone.stateHigh = ["fire","smoke","charcoal","carbon_dioxide","quicklime","quicklime","quicklime","quicklime","quicklime","quicklime","quicklime","quicklime"];
	elements[bccs].nellfireImmune = true;

	elements.water.reactions[bccd] = {
		"elem1":"calcium_carbonate_solution",
		"elem2":[bccd,bccd,bccd,bccs],
		"chance":0.004
	};

	elements.seltzer.reactions[bccd] = {
		"elem1":bccs,
		"elem2":[bccd,bccd,bccd,bccs],
		"chance":0.02
	};

	var resultingAutoElems = [ "gehennite", "solid_gehennite", "gehennite_gravel", "nellrock", "solid_nellrock", "gehennite_sand", "gehennite_dust", "wet_gehennite_sand", "packed_gehennite_sand", "nellrock_gravel", "nellrock_sand", "nellrock_dust", "wet_nellrock_sand", "packed_nellrock_sand", "hadean_sponge", "solid_hadean_sponge", "hadean_sponge_gravel", "hadean_sponge_sand", "hadean_sponge_dust", "wet_hadean_sponge_sand", "packed_hadean_sponge_sand", "gehidian", "solid_gehidian", "gehidian_shard", "gehidian_sand", "gehidian_dust", "wet_gehidian_sand", "packed_gehidian_sand", "nellish_magma", "vaporized_nellish_magma", "nellish_magma_cloud", "gehennite_sandy_water", "gehennite_sand_sediment", "gehennite_sandstone", "nellrock_sandy_water", "nellrock_sand_sediment", "nellrock_sandstone", "hadean_sponge_sandy_water", "hadean_sponge_sand_sediment", "hadean_sponge_sandstone", "gehidian_sandy_water", "gehidian_sand_sediment", "gehidian_sandstone", bccd, bccs, "black_limestone" ] //hard-coded

	runAfterLoad(function() {
		for(i = 0; i < resultingAutoElems.length; i++) {
			if(!elements[resultingAutoElems[i]]) {
				console.error(resultingAutoElems[i]);
				continue;
			}
			elements[resultingAutoElems[i]].nellfireImmune = true;
		};
	});

	everyTick(function() {
		if(paused) { return };
		var nellfirePixels = currentPixels.filter(function(pixel) { return pixel.nellburn });
		for(var pixel in nellfirePixels) {
			doNellfire(nellfirePixels[pixel]);
		};
	});
} else {
	enabledMods.splice(enabledMods.indexOf(modName),0,groundMod);
	enabledMods.splice(enabledMods.indexOf(modName),0,libHookTickMod);
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert(`The ${groundMod} and ${libHookTickMod} mods are required and have been automatically inserted (reload for this to take effect).`);
};
