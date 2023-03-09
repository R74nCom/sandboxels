var modName = "mods/injector.js";
var libraryMod = "mods/code_library.js";
var structureMod = "mods/structure_test.js";
var rbtMod = "mods/randomness_but_tick.js";

if(enabledMods.includes(libraryMod) && enabledMods.includes(structureMod) && enabledMods.includes(rbtMod)) { 
	var injectorPoisonCategories = ["life","auto creepers","shit","cum","food","fantastic creatures","fey","auto_fey"];
	var injectorPoisonBlacklist = ["injector_poison","dead_matter","poisoned_dirt"];
	var injectorPoisonWhitelist = ["blood","poop","blood_ice","wood","wood_plank","sawdust","straw","paper","birthpool","dried_poop","gloomfly","meat_monster","rotten_ravager","bone_beast","withery","withery_plant","banana","apple","rotten_apple","apioform_player","apioform_bee","apioform","apiodiagoform","sugar_cactus","sugar_cactus_seed","flowering_sugar_cactus","tree_branch","sap","silk","red_velvet","silk_velvet","ketchup", "enchanted_ketchup", "frozen_ketchup", "poisoned_ketchup", "frozen_poisoned_ketchup", "ketchup_spout", "ketchup_cloud", "poisoned_ketchup_cloud", "ketchup_snow", "ketchup_snow_cloud", "poisoned_ketchup_snow", "poisoned_ketchup_snow_cloud", "ketchup_gas", "poisoned_ketchup_gas", "ketchup_powder", "poisoned_ketchup_powder", "eketchup_spout", "ketchup_metal", "antiketchup", "dirty_ketchup", "ketchup_gold", "molten_ketchup_metal", "ketchup_fairy", "ketchup_metal_scrap", "ketchup_gold_scrap", "molten_ketchup_gold", "mycelium","vaccine","antibody","infection","sap","caramel","molasses","melted_chocolate","soda","mustard","fry_sauce","tomato_sauce","sugary_tomato_sauce","bio_ooze","zombie_blood","feather","tooth","decayed_tooth","plaque","tartar","bacteria","replacer_bacteria","pop_rocks"];
	var injectorPoisonSubstitutions = {
		"dirt": "poisoned_dirt",
		"dry_dirt": "poisoned_dirt",
		"sand": "poisoned_dirt",
		"wet_sand": "poisoned_dirt",
		"mud": "poisoned_dirt",
		"sandy_water": "injector_poison",
		"water": "injector_poison",
	};

	var blue = "rgb(0,0,255)";
	var cyan = "rgb(0,255,255)";
	var green = "rgb(0,255,0)";
	var yellow = "rgb(255,255,0)";
	var orange = "rgb(255,127,0)";
	var red = "rgb(255,0,0)";
	var gray = "rgb(127,127,127)";

	function debugPoisonColor(pixel) {
		pixel.poison ??= 0;
		if(pixel.poison > 5) {
			pixel.color = blue;
		} else if(pixel.poison > 1.5) {
			pixel.color = cyan;
		} else if(pixel.poison > 1) {
			pixel.color = green;
		} else if(pixel.poison > 0.5) {
			pixel.color = yellow;
		} else if(pixel.poison > 0.05) {
			pixel.color = orange;
		} else if(pixel.poison > 0) {
			pixel.color = red;
		} else {
			pixel.color = gray;
		};
	};

	function spreadInjectorPoison(pixel) {
		var convertedPixels = [];
		for(i = 0; i < adjacentCoords.length; i++) { //iterate through neighbor spots
			if(!isEmpty(pixel.x+adjacentCoords[i][0],pixel.y+adjacentCoords[i][1],true)) { //check for adjacentCoords
				var newPixel = pixelMap[pixel.x+adjacentCoords[i][0]][pixel.y+adjacentCoords[i][1]]
				var isInjectorPoisonFairy = (elements[newPixel.element].category == "auto_fey" && newPixel.element.includes("life_eater_"))
				//console.log(newPixel.element,isInjectorPoisonFairy);
				if(
					(injectorPoisonCategories.includes(elements[newPixel.element].category) || injectorPoisonWhitelist.includes(newPixel.element) || Object.keys(injectorPoisonSubstitutions).includes(newPixel.element)) && 
					!injectorPoisonBlacklist.includes(newPixel.element) &&
					!isInjectorPoisonFairy //exclude fairies which produce life eater
				) {
					if(Object.keys(injectorPoisonSubstitutions).includes(newPixel.element)) {
						if(["water","sandy_water"].includes(newPixel.element) && Math.random() < 0.8) {
							continue;
						};
						var data = injectorPoisonSubstitutions[newPixel.element];
						while(data instanceof Array) {
							data = data[Math.floor(Math.random() * data.length)];
						};
						if(data === null) {
							if(newPixel) { deletePixel(newPixel.x,newPixel.y) };
						} else {
							changePixel(newPixel,data);
							convertedPixels.push(newPixel);
						};
					} else {
						changePixel(newPixel,"dead_matter");
						convertedPixels.push(newPixel);
					};
				};
			};
		};
		return convertedPixels.length == 0 ? false : convertedPixels;
	};

	elements.injector_poison = {
		properties: {
			didWeakColorChange: 0,
			poison: 15,
		},
		stain: 0.2,
		color: ["#f70a98", "#ff308d"],
		behavior: behaviors.LIQUID,
		tick: function(pixel) {
			//console.log(pixel.poison);
			pixel.didWeakColorChange ??= 0;
			if(isNaN(pixel.poison)) {
				pixel.poison = 15;
				return;
			};
			var convertedPixels = spreadInjectorPoison(pixel);
			if((convertedPixels.length ?? 0) !== 0) {
				for(i = 0; i < convertedPixels.length; i++) {
					convertedPixels[i].poison ??= Math.max(convertedPixels[i].element == "injector_poison" ? 0.9 : 0,pixel.poison - 1);
				};
				pixel.poison--;

				if(pixel.poison <= -1) {
					deletePixel(pixel.x,pixel.y);
					return;
				};
			};
			if(pixel.poison < 5 && pixel.didWeakColorChange == 0) {
				pixel.color = changeSaturation(changeLuminance(pixel.color,0.7 ** (1/3),"multiply","hsljson"),0.7 ** (1/3),"multiply","rgb");
				pixel.didWeakColorChange = 1;
			};
			if(pixel.poison < 1 && pixel.didWeakColorChange == 1) {
				pixel.color = changeSaturation(changeLuminance(pixel.color,0.7 ** (1/3),"multiply","hsljson"),0.7 ** (1/3),"multiply","rgb");
				pixel.didWeakColorChange = 2;
			};
			if(pixel.poison < 0.1 && pixel.didWeakColorChange == 2) {
				pixel.color = changeSaturation(changeLuminance(pixel.color,0.7 ** (1/3),"multiply","hsljson"),0.7 ** (1/3),"multiply","rgb");
				pixel.didWeakColorChange = 3;
			};

			if(pixel.poison >= 0.1 && pixel.didWeakColorChange == 3) {
				pixel.color = changeSaturation(changeLuminance(pixel.color,1/(0.7 ** (1/3)),"multiply","hsljson"),1/(0.7 ** (1/3)),"multiply","rgb");
				pixel.didWeakColorChange = 2;
			};
			if(pixel.poison >= 1 && pixel.didWeakColorChange == 2) {
				pixel.color = changeSaturation(changeLuminance(pixel.color,1/(0.7 ** (1/3)),"multiply","hsljson"),1/(0.7 ** (1/3)),"multiply","rgb");
				pixel.didWeakColorChange = 1;
			};
			if(pixel.poison >= 5 && pixel.didWeakColorChange == 1) {
				pixel.color = changeSaturation(changeLuminance(pixel.color,1/(0.7 ** (1/3)),"multiply","hsljson"),1/(0.7 ** (1/3)),"multiply","rgb");
				pixel.didWeakColorChange = 0;
			};

			if(pixel.poison <= 0 && Math.random() < 0.1) {
				deletePixel(pixel.x,pixel.y);
				return;
			};
			
			if(isNaN(pixel.poison)) {
				pixel.poison = 15;
			};
			for(z = 0; z < 3; z++) {
				spreadingPropertyReturn(pixel,"poison",injectorPoisonBlacklist).forEach(x => spreadingPropertyReturn(x,"poison",injectorPoisonBlacklist));
			};

			//debugPoisonColor(pixel);
		},
		category: "weapons",
		state: "liquid",
		density: 1000,
		excludeRandom: true,
		/*tempHigh: 300,
		stateHigh: null,*/
		forceAutoGen: true
	};

	elements.dead_matter = {
		color: ["#6b5869", "#99508c", "#b53c8b"],
		behavior: behaviors.POWDER,
		tick: function(pixel) {
			if(isNaN(pixel.poison)) {
				pixel.poison = 10;
			};
			if(pixel.poison > 0.05) {
				var convertedPixels = spreadInjectorPoison(pixel);
				if((convertedPixels.length ?? 0) !== 0) {
					if(Math.random() < 0.2) {
						var randomConverted = randomChoice(convertedPixels);
						swapNumericPropertyValues(pixel,randomConverted,"poison",injectorPoisonBlacklist);
					};
					for(i = 0; i < convertedPixels.length; i++) {
						convertedPixels[i].poison ??= Math.max(0,pixel.poison - 1);
					};
					pixel.poison--;
				};
			};

			for(z = 0; z < 3; z++) {
				spreadingPropertyReturn(pixel,"poison",injectorPoisonBlacklist).forEach(x => spreadingPropertyReturn(x,"poison",injectorPoisonBlacklist));
			};

			if(pixel.poison < 0) {
				pixel.poison = 0
			};
			
			if(pixel.temp > 350 || (pixel.poison <= 1 && Math.random() < 0.04)) {
				if(Math.random() < pixel.poison) {
					changePixelReturn(pixel,"injector_poison").poison = pixel.poison * 0.85;
					return;
				} else {
					deletePixel(pixel.x,pixel.y);
					return;
				};
			};

			//debugPoisonColor(pixel);
		},
		category: "life",
		state: "solid",
		density: 1050,
		excludeRandom: true,
	};

	elements.poisoned_dirt = {
		behavior: behaviors.POWDER,
		color: ["#665e66","#735370","#805265"],
		tick: function(pixel) {
			if(isNaN(pixel.poison)) {
				pixel.poison = 10;
			};
			if(pixel.poison > 0.05) {
				var convertedPixels = spreadInjectorPoison(pixel);
				if((convertedPixels.length ?? 0) !== 0) {
					if(Math.random() < 0.2) {
						var randomConverted = randomChoice(convertedPixels);
						swapNumericPropertyValues(pixel,randomConverted,"poison",injectorPoisonBlacklist);
					};
					for(i = 0; i < convertedPixels.length; i++) {
						convertedPixels[i].poison ??= Math.max(0,pixel.poison - 1);
					};
					pixel.poison--;
				};
			};

			for(z = 0; z < 3; z++) {
				spreadingPropertyReturn(pixel,"poison",injectorPoisonBlacklist).forEach(x => spreadingPropertyReturn(x,"poison",injectorPoisonBlacklist));
			};

			if(pixel.poison < 0) {
				pixel.poison = 0
			};

			//debugPoisonColor(pixel);
		},
		category: "life",
		state: "solid",
		density: 1220,
		excludeRandom: true,
	};
	
	
	//Injector data and decoding
	var injectorCrystalPinks = {
		"0": "rgb(239,109,189)",
		"1": "rgb(253,185,241)",
		"2": "rgb(253,207,234)",
		"3": "rgb(253,161,225)",
		"4": "rgb(253,156,206)",
		"5": "rgb(249,139,249)",
		"6": "rgb(235,95,190)",
		"7": "rgb(221,26,132)",
		"8": "rgb(246,68,183)",
		"9": "rgb(184,24,95)",
		"~": "rgb(221,26,132)",
		"!": "rgb(230,64,191)",
		"@": "rgb(136,12,60)",
		"#": "rgb(221,26,132)"
	}

	var poisonPink = "rgb(253,54,196)";

	var injectorMetalColors = {
		"A": "rgb(82,95,136)",
		"B": "rgb(35,57,94)",
		"C": "rgb(60,79,120)",
		"D": "rgb(74,100,148)", 
		"E": "rgb(44,64,101)",
		"F": "rgb(242,45,166)" //pink lines
	};

	var vanishingMetalColors = {
		"X": "rgb(60,79,120)",
		"Y": "rgb(242,45,166)" //pink lines
	};

	var glassColor = "rgb(168,206,217)"; //G

	var red = "rgb(255,0,0)"; //for unknown item

	injectorData = [
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : :0:1:2:2:2:2:2:2:2:2:3: : : : : : : ",
		" : : : : :0:0:1:2:2:2:2:2:2:2:2:2:2:4:4: : : : : ",
		" : : : : :5:5:6:6:6:6:6:6:6:7:7:7:7:8:8: : : : : ",
		" : : : : :5:5:6:6:6:6:6:6:7:7:7:7:7:8:8: : : : : ",
		" : : : : : :5:5:6:6:6:6:7:7:7:7:7:8:8: : : : : : ",
		" : : : : : :5:5:6:6:6:7:7:7:7:7:7:8:8: : : : : : ",
		" : : : : : :5:5:6:6:7:7:7:7:7:7:7:8:8: : : : : : ",
		" : : : : : :5:5:6:7:7:7:7:7:7:7:7:8:8: : : : : : ",
		" : : : : : : :5:5:7:7:7:7:7:7:7:8:8: : : : : : : ",
		" : : : : : : :5:5:7:7:7:7:7:7:7:8:8: : : : : : : ",
		" : : : : : : :9:9:9:~:!:!:!:@:#:#:#: : : : : : : ",
		" : : : : : : : :B:9:B:~:!:@:B:#:B: : : : : : : : ",
		" : : : : : : :A:A:A:A:A:A:A:A:A:A:A: : : : : : : ",
		" : : : : : : : :B:B:B:B:B:B:B:B:B: : : : : : : : ",
		" : : : : : : :A:A:A:A:A:A:A:A:A:A:A: : : : : : : ",
		" : : : : : : :G:G:G:G:G:G:G:G:G:G:G: : : : : : : ",
		" : : : : : : :G:$:$:$:$:$:$:$:$:$:G: : : : : : : ",
		" : : : : : : :G:$:$:$:$:$:$:$:$:$:G: : : : : : : ",
		" : : : : : : :G:$:$:$:$:$:$:$:$:$:G: : : : : : : ",
		" : : : : : : :G:G:$:$:$:$:$:$:$:G:G: : : : : : : ",
		" : : : : : : : :G:$:$:$:$:$:$:$:G: : : : : : : : ",
		" : : : : : : : :G:$:$:$:$:$:$:$:G: : : : : : : : ",
		" : : : : : : : :G:$:$:$:$:$:$:$:G: : : : : : : : ",
		" : : : : : : : :G:$:$:$:$:$:$:$:G: : : : : : : : ",
		" : : : : : : :G:G:$:$:$:$:$:$:$:G:G: : : : : : : ",
		" : : : : : : :G:$:$:$:$:$:$:$:$:$:G: : : : : : : ",
		" : : : : : :G:G:$:$:$:$:$:$:$:$:$:G:G: : : : : : ",
		" : : : : : :G:$:$:$:$:$:$:$:$:$:$:$:G: : : : : : ",
		" : : : : : :G:$:$:$:$:$:$:$:$:$:$:$:G: : : : : : ",
		" : : : : : :G:$:$:$:$:$:$:$:$:$:$:$:G: : : : : : ",
		" : : :C: :G:G:G:G:G:G:G:X:G:G:G:G:G:G:G: :C: : : ",
		" : :C:C: :C:C:C:C:C:C:C:X:C:C:C:C:C:C:C: :C:C: : ",
		" :C:C:C: : :D:C:C:C:C:C:X:C:C:C:C:C:D: : :C:C:C: ",
		" :C:C:E:C: :C:D: :F:C:C:Y:C:C:F: :D:C: :C:E:C:C: ", //H = seed location
		"C:C:C: :C:C:C: : :C:C:F:X:C:F:C: : :C:C:C: :C:C:C",
		"E:C:C: : :C: : : : :F:C:X:F:C: : : : :C: : :C:C:E",
		"C:E:E: : : : : : : :C:C:Y:C:C: : : : : : : :E:E:C",
		"C:C:C: : : : : : : : :F:X:C: : : : : : : : :C:C:C",
		" :C:C:C: : : : : : : :C:X:F: : : : : : : :C:C:C: ",
		" :C:C:C: : : : : : : : :Y: : : : : : : : :C:C:C: ",
		" : :C:C: : : : : : : : :X: : : : : : : : :C:C: : ",
		" : : :C: : : : : : : : : : : : : : : : : :C: : : "
	];

	injectorColorData = [
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : ",
		" : : : : : : : : : : : : : : : : : : : : : : : : "
	];

	injectorData = injectorData.map(x => x.split(":"));
	injectorColorData = injectorColorData.map(x => x.split(":"));

	function injectorDataDecoder(character) {
		var element, color;
		if(injectorCrystalPinks[character]) {
			element = "glass";
			color = injectorCrystalPinks[character];
		} else if(injectorMetalColors[character]) {
			element = "steel";
			color = injectorMetalColors[character];
		} else if(vanishingMetalColors[character]) {
			element = "vanishing_steel";
			color = vanishingMetalColors[character];
		} else {
			switch(character) {
				case "$":
					element = "injector_poison";
					color = poisonPink;
					break;
				case "G":
					element = "glass";
					color = glassColor;
					break;
				case " ":
					element = "null";
					color = "null";
					break;
				default:
					element = "wall";
					color = red;
			};
		};
		return [element,color];
	};

	for(x = 0; x < injectorData.length; x++) {
		for(y = 0; y < injectorData[x].length; y++) {
			var decodedData = injectorDataDecoder(injectorData[x][y]);
			injectorData[x][y] = decodedData[0];
			injectorColorData[x][y] = decodedData[1];
		};
	};

	function spawnInjectorAt(x,y) {
		//var tries = 0;
		for(q = 0; q < injectorData.length; q++) {
			//console.log("q is: " + q);
			//tries++;
			//if(tries > 100) {
				//break;
			//};
			loadPixelRowFromArrayWithColorRowArray(injectorData[q],injectorColorData[q],x,y+q,true,true)
		};	
	};

	elements.injector_seed = {
		tick: function(pixel) {
			if(!tryMove(pixel,pixel.x,pixel.y+1)) {
				spawnInjectorAt(pixel.x,pixel.y - 34)
			};
		},
		excludeRandom: true,
		desc: '<span style="color: #ff007f">Spawns the Injector.</span>',
		cooldown: 8,
		state: "solid",
		hardness: 1,
		category: "structures",
		color: ["#586075", "#ff2b84"],
	};
} else {
	if(!enabledMods.includes(libraryMod))		{ enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod) };
	if(!enabledMods.includes(structureMod))	{ enabledMods.splice(enabledMods.indexOf(modName),0,structureMod) };
	if(!enabledMods.includes(rbtMod))	{ enabledMods.splice(enabledMods.indexOf(modName),0,rbtMod) };
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert(`The "${libraryMod}", "${structureMod}", and "${rbtMod}" mods are required; any missing mods have been automatically inserted (reload for this to take effect).`)
};