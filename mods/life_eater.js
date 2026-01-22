var modName = "mods/life_eater.js";
var fireMod = "mods/fire_mod.js";

dependOn("fire_mod.js", function() {

	var lifeEaterCategories = ["life","auto creepers","food","fantastic creatures","fey","auto_fey"];
	var lifeEaterBlacklist = ["life_eater_virus","life_eater_slurry","life_eater_infected_dirt"];
	var lifeEaterWhitelist = ["blood","poop","blood_ice","wood","wood_plank","sawdust","straw","paper","birthpool","dried_poop","gloomfly","meat_monster","rotten_ravager","bone_beast","withery","withery_plant","banana","apple","rotten_apple","apioform_player","apioform_bee","apioform","apiodiagoform","sugar_cactus","sugar_cactus_seed","flowering_sugar_cactus","tree_branch","sap","silk","red_velvet","silk_velvet","ketchup", "enchanted_ketchup", "frozen_ketchup", "poisoned_ketchup", "frozen_poisoned_ketchup", "ketchup_spout", "ketchup_cloud", "poisoned_ketchup_cloud", "ketchup_snow", "ketchup_snow_cloud", "poisoned_ketchup_snow", "poisoned_ketchup_snow_cloud", "ketchup_gas", "poisoned_ketchup_gas", "ketchup_powder", "poisoned_ketchup_powder", "eketchup_spout", "ketchup_metal", "antiketchup", "dirty_ketchup", "ketchup_gold", "molten_ketchup_metal", "ketchup_fairy", "ketchup_metal_scrap", "ketchup_gold_scrap", "molten_ketchup_gold", "mycelium","vaccine","antibody","infection","sap","caramel","molasses","melted_chocolate","soda","mustard","fry_sauce","tomato_sauce","sugary_tomato_sauce","bio_ooze","zombie_blood","feather","tooth","decayed_tooth","plaque","tartar","bacteria","replacer_bacteria","pop_rocks"];
	var lifeEaterSubstitutions = {
		"dirt": "life_eater_infected_dirt",
	};


	function tryCreatePlus(element,centerX,centerY) {
		var plusCoords = adjacentCoords.concat([[0,0]]);
		var pixels = 0;
		for(let i = 0; i < plusCoords.length; i++) {
			var newX = centerX + plusCoords[i][0];
			var newY = centerY + plusCoords[i][1];
			if(isEmpty(newX,newY)) {
				while(element instanceof Array) { element = element[Math.floor(Math.random() * element.length)] };
				createPixel(element,newX,newY);
				pixels++;
			};
		};
		return pixels;
	};

	function spreadLifeEater(pixel) {
		var convertedPixels = [];
		for(i = 0; i < adjacentCoords.length; i++) { //iterate through neighbor spots
			if(!isEmpty(pixel.x+adjacentCoords[i][0],pixel.y+adjacentCoords[i][1],true)) { //check for adjacentCoords
				var newPixel = pixelMap[pixel.x+adjacentCoords[i][0]][pixel.y+adjacentCoords[i][1]]
				var isLifeEaterFairy = (elements[newPixel.element].category == "auto_fey" && newPixel.element.includes("life_eater_"))
				//console.log(newPixel.element,isLifeEaterFairy);
				if(
					(lifeEaterCategories.includes(elements[newPixel.element].category) || lifeEaterWhitelist.includes(newPixel.element) || Object.keys(lifeEaterSubstitutions).includes(newPixel.element)) && 
					!lifeEaterBlacklist.includes(newPixel.element) &&
					!isLifeEaterFairy //exclude fairies which produce life eater
				) {
					if(Object.keys(lifeEaterSubstitutions).includes(newPixel.element)) {
						var data = lifeEaterSubstitutions[newPixel.element];
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
						changePixel(newPixel,"life_eater_slurry");
						convertedPixels.push(newPixel);
					};
				};
			};
		};
		return convertedPixels;
	};

	elements.life_eater_explosion = {
		color: ["#96c785","#f0d654","#ffb47a"],
		behavior: [
			"XX|XX|XX",
			"XX|EX:9>plasma,fire,life_eater_virus|XX",
			"XX|XX|XX",
		],
		temp: 1600,
		category: "energy",
		state: "gas",
		density: 1000,
		excludeRandom: true,
		hidden: true,
	},

	elements.life_eater_virus = {
		color: ["#7bb064", "#aabd60", "#9e9e29"],
		behavior: behaviors.GAS,
		tick: function(pixel) {
			spreadLifeEater(pixel).forEach(infectedPixel => spreadLifeEater(infectedPixel));
		},
		category: "life",
		state: "gas",
		density: airDensity,
		excludeRandom: true,
		tempHigh: 300,
		stateHigh: null,
	};

	elements.life_eater_slurry = {
		color: ["#3d6e29", "#666617", "#7d5716"],
		behavior: behaviors.LIQUID,
		properties: {
			methaned: false,
		},
		tick: function(pixel) {
			spreadLifeEater(pixel).forEach(infectedPixel => spreadLifeEater(infectedPixel));
			
			if(pixelTicks - pixel.start > 6) {
				if(!pixel.methaned && Math.random() < 0.2) {
					changePixel(pixel,Math.random() < 0.2 ? "life_eater_virus" : "methane");
				} else {
					pixel.methaned = true;
				};
				tryCreatePlus(["methane","methane","methane","methane","life_eater_virus"],pixel.x,pixel.y);
				return;
			};
		},
		category: "life",
		state: "liquid",
		density: 1050,
		burn: 100,
		burnTime: 10,
		fireSpawnTemp: 1500,
		burnTempChange: 200,
		burnInto: ["life_eater_virus","plasma","fire","life_eater_explosion"],
		excludeRandom: true,
	};

	var crRule50 = "CR:life_eater_virus,methane,methane,methane%0.5";
	var crRule100 = "CR:life_eater_virus,methane,methane,methane%1";

	elements.life_eater_infected_dirt = {
		behavior: [
			"XX|"+crRule100+"|XX",
			crRule50+"|XX|"+crRule50,
			"M2|M1 AND "+crRule50+"|M2",
		],
		color: ["#757137","#617a35","#66622c","#707538"],
		tick: function(pixel) {
			spreadLifeEater(pixel).forEach(infectedPixel => spreadLifeEater(infectedPixel));
		},
		category: "life",
		state: "liquid",
		density: 1050,
		burn: 70,
		burnTime: 15,
		fireSpawnTemp: 1400,
		burnTempChange: 180,
		burnInto: ["life_eater_virus","fire","plasma","life_eater_explosion"],
		excludeRandom: true,
	};
	
	for(i = 0; i < 4; i++) {
		elements.life_eater_infected_dirt.burnInto.push(elements.dry_dirt ? "dry_dirt" : "sand");
	};

	elements.virus_bomb = {
		color: "#accc70",
		behavior: [
			"XX|EX:16>life_eater_virus|XX",
			"XX|XX|XX",
			"XX|EX:16>life_eater_virus AND M1|XX"
		],
		density: 3500,
		hardness: 0.95,
		breakInto: "life_eater_virus",
		tempHigh: 2400,
		category: "weapons",
		excludeRandom: true,
		stateHigh: elements.metal_scrap.stateHigh.concat("life_eater_virus","life_eater_virus","life_eater_virus"),
	};

}, true);
