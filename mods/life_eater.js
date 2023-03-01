var modName = "mods/life_eater.js";
var fireMod = "mods/fire_mod.js";

if(!enabledMods.includes(fireMod)) {
	enabledMods.splice(enabledMods.indexOf(modName),0,fireMod);
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert(`The ${fireMod} mod is required and has been automatically inserted (reload for this to take effect).`);
} else {

	var lifeEaterCategories = ["life","auto creepers","shit","cum","food","fantastic creatures","fey","auto_fey"];
	var lifeEaterBlacklist = ["life_eater_virus","life_eater_slurry"];
	var lifeEaterWhitelist = ["blood","poop","blood_ice","wood","wood_plank","sawdust","straw","paper","birthpool","dried_poop","gloomfly","meat_monster","rotten_ravager","bone_beast","withery","withery_plant","banana","apple","rotten_apple","apioform_player","apioform_bee","apioform","apiodiagoform","sugar_cactus","sugar_cactus_seed","flowering_sugar_cactus"];

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
					(lifeEaterCategories.includes(elements[newPixel.element].category) || lifeEaterWhitelist.includes(newPixel.element)) && 
					!lifeEaterBlacklist.includes(newPixel.element) &&
					!isLifeEaterFairy //exclude fairies which produce life eater
				) {
					changePixel(newPixel,"life_eater_slurry");
					convertedPixels.push(newPixel);
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
		stateHigh: elements.metal_scrap.stateHigh.concat("life_eater_virus","life_eater_virus","life_eater_virus"),
	};

}
