/*	elements.yellow_ultragiant = {
		color: convertColorFormats("#f7f990","rgb"),
		colorObject: convertColorFormats("#f7f990","json"),
		behavior: behaviors.WALL,
		tick: function(pixel) {
			seededCreateLargeStar(pixel.x,pixel.y,14,17,5000,11000,Math.random);
		},
		category: "stars",
		state: "gas",
		density: 1000,
		id: nextid,
	};
	nextid++;
	elementCount++;
	createElementButton("yellow_ultragiant");*/
	
var modName = "mods/bigger_star_spawners.js";
var promptMod = "mods/prompt.js";
if(enabledMods.includes(promptMod)) {
	//luminosity class -I
	elements.red_ultragiant = {
		color: "#f04343",
		behavior: behaviors.WALL,
		tick: function(pixel) {
			seededCreateLargeStar(pixel.x,pixel.y,15,18,1500,3000,Math.random);
		},
		category: "stars",
		state: "gas",
		excludeRandom: true,
		maxSize: 1,
		cooldown: defaultCooldown,
		density: 1000,
	};

	elements.blue_ultragiant = {
		color: "#5488f0",
		behavior: behaviors.WALL,
		tick: function(pixel) {
			seededCreateLargeStar(pixel.x,pixel.y,14,17,17000,85000,Math.random);
		},
		category: "stars",
		state: "gas",
		excludeRandom: true,
		maxSize: 1,
		cooldown: defaultCooldown,
		density: 1000,
	};

	elements.yellow_ultragiant = {
		color: "#fafc7e",
		behavior: behaviors.WALL,
		tick: function(pixel) {
			seededCreateLargeStar(pixel.x,pixel.y,14,17,4500,9500,Math.random);
		},
		category: "stars",
		state: "gas",
		excludeRandom: true,
		maxSize: 1,
		cooldown: defaultCooldown,
		density: 1000,
	};


	//luminosity class -II
	elements.red_super_ultragiant = {
		color: "#f23329",
		behavior: behaviors.WALL,
		tick: function(pixel) {
			seededCreateLargeStar(pixel.x,pixel.y,21,25,1400,2900,Math.random);
		},
		category: "stars",
		state: "gas",
		excludeRandom: true,
		maxSize: 1,
		cooldown: defaultCooldown,
		density: 1000,
	};

	elements.blue_super_ultragiant = {
		color: "#3b85ed",
		behavior: behaviors.WALL,
		tick: function(pixel) {
			seededCreateLargeStar(pixel.x,pixel.y,20,24,16000,86000,Math.random);
		},
		category: "stars",
		state: "gas",
		excludeRandom: true,
		maxSize: 1,
		cooldown: defaultCooldown,
		density: 1000,
	};

	elements.yellow_super_ultragiant = {
		color: "#fcfc65",
		behavior: behaviors.WALL,
		tick: function(pixel) {
			seededCreateLargeStar(pixel.x,pixel.y,20,24,4000,9000,Math.random);
		},
		category: "stars",
		state: "gas",
		excludeRandom: true,
		maxSize: 1,
		cooldown: defaultCooldown,
		density: 1000,
	};


	//luminosity class -III
	elements.red_hyper_ultragiant = {
		color: "#f51a0f",
		behavior: behaviors.WALL,
		tick: function(pixel) {
			seededCreateLargeStar(pixel.x,pixel.y,28,31,1300,2800,Math.random);
		},
		category: "stars",
		state: "gas",
		excludeRandom: true,
		maxSize: 1,
		cooldown: defaultCooldown,
		density: 1000,
	};

	elements.blue_hyper_ultragiant = {
		color: "#1b8bf2",
		behavior: behaviors.WALL,
		tick: function(pixel) {
			seededCreateLargeStar(pixel.x,pixel.y,27,30,15000,87000,Math.random);
		},
		category: "stars",
		state: "gas",
		excludeRandom: true,
		maxSize: 1,
		cooldown: defaultCooldown,
		density: 1000,
	};

	elements.yellow_hyper_ultragiant = {
		color: "#faeb46",
		behavior: behaviors.WALL,
		tick: function(pixel) {
			seededCreateLargeStar(pixel.x,pixel.y,27,30,4000,8500,Math.random);
		},
		category: "stars",
		state: "gas",
		excludeRandom: true,
		maxSize: 1,
		cooldown: defaultCooldown,
		density: 1000,
	};


	//luminosity class -IV
	elements.red_ultra_ultragiant = {
		color: "#e01a00",
		behavior: behaviors.WALL,
		tick: function(pixel) {
			seededCreateLargeStar(pixel.x,pixel.y,34,37,1200,2700,Math.random);
		},
		category: "stars",
		state: "gas",
		excludeRandom: true,
		maxSize: 1,
		cooldown: defaultCooldown,
		density: 1000,
	};

	elements.blue_ultra_ultragiant = {
		color: "#0782ed",
		behavior: behaviors.WALL,
		tick: function(pixel) {
			seededCreateLargeStar(pixel.x,pixel.y,33,36,14000,88000,Math.random);
		},
		category: "stars",
		state: "gas",
		excludeRandom: true,
		maxSize: 1,
		cooldown: defaultCooldown,
		density: 1000,
	};

	elements.yellow_ultra_ultragiant = {
		color: "#f7d52a",
		behavior: behaviors.WALL,
		tick: function(pixel) {
			seededCreateLargeStar(pixel.x,pixel.y,33,36,4000,8000,Math.random);
		},
		category: "stars",
		state: "gas",
		excludeRandom: true,
		maxSize: 1,
		cooldown: defaultCooldown,
		density: 1000,
	};
} else {
	if(!enabledMods.includes(promptMod)) { enabledMods.splice(enabledMods.indexOf(modName),0,promptMod) };
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert(`The "${promptMod}" mod is required and has been automatically inserted (reload for this to take effect).`);
};