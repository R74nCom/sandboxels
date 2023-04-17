var modName = "mods/rays.js";
var runAfterAutogenMod = "mods/runAfterAutogen and onload restructure.js";
var libraryMod = "mods/code_library.js";

if(enabledMods.includes(runAfterAutogenMod) && enabledMods.includes(libraryMod)) {
	runAfterAutogen(function() {
		snowAndIceCache = Object.keys(elements).filter(function(name) {
			return name.endsWith("snow") || name.endsWith("ice")
		})
	});
	lightlikes = ["light","flash","laser","radiation","insulate_flash"];
	grbBreakIntos = Object.keys(elements).filter(function(elemName) {
		return elements[elemName].breakInto && elements[elemName].breakInto.includes("gamma_ray_burst");
	});

	elements.insulate_flash = {
		hidden: true,
		color: "#fffdcf",
		tick: function(pixel) {
			if (Math.random() < 0.75 && pixelTicks - pixel.start > 1) {
				deletePixel(pixel.x, pixel.y)
			}
		},
		reactions: {
			"blood": { elem1:"pointer" },
			"molten_stained_glass": { elem1:"rainbow" },
			"gray_goo": { elem1:"static" }
		},
		category: "energy",
		temp: 40,
		state: "gas",
		density: 1,
		tempLow: -270,
		stateLow: "light",
		hidden: true,
		noMix: true,
		insulate: true
	};

	elements.heat_ray.tick = function(pixel) {
		var x = pixel.x;
		for (var y = pixel.y; y < height; y++) {
			if (outOfBounds(x, y)) {
				break;
			}
			if (isEmpty(x, y)) {
				if (Math.random() > 0.025) { continue }
				createPixel("insulate_flash", x, y);
				pixelMap[x][y].color = "#ff0000";
			}
			else {
				if (elements[pixelMap[x][y].element].isGas) { pixelMap[x][y].temp -= 50; continue; }
				if (elements[pixelMap[x][y].element].id === elements.heat_ray.id) { break }
				pixelMap[x][y].temp += 100;
				break;
			}
		}
		deletePixel(pixel.x, pixel.y);
	};	

	elements.sun.isSun = true;
	if(elements.nellsun) { elements.nellsun.isSun = true };
	if(elements.rainbow_sun) { elements.rainbow_sun.isSun = true };

	elements.cold_ray = {
		color: ["#00ffae","#00ffff"],
		tick: function(pixel) {
			var x = pixel.x;
			for (var y = pixel.y; y < height; y++) {
				if (outOfBounds(x, y)) {
					break;
				}
				if (isEmpty(x, y)) {
					if (Math.random() > 0.05) { continue }
					createPixel("insulate_flash", x, y);
					pixelMap[x][y].color = "#00ffff";
				}
				else {
					if (elements[pixelMap[x][y].element].isGas) {
						if(elements[pixelMap[x][y].element].isSun) {
							pixelMap[x][y].temp -= 0.5;
						} else {
							pixelMap[x][y].temp -= 50;
						};
						continue; 
					};
					if (elements[pixelMap[x][y].element].id === elements.cool_ray.id) { break }
					pixelMap[x][y].temp -= 150;
					break;
				}
			}
			deletePixel(pixel.x, pixel.y);
		},
		temp: -200,
		category: "energy",
		state: "gas",
		excludeRandom: true,
		noMix: true
	};

	elements.freeze_ray = {
		color: ["#7fbfff","#bfffff"],
		tick: function(pixel) {
			var x = pixel.x;
			for (var y = pixel.y; y < height; y++) {
				if (outOfBounds(x, y)) {
					break;
				}
				if (isEmpty(x, y)) {
					if (Math.random() > 0.02) { continue }
					createPixel("insulate_flash", x, y);
					pixelMap[x][y].color = "#e1f8fc";
				}
				else {
					var otherPixel = pixelMap[x][y];
					var otherInfo = elements[otherPixel.element];
					//Gas: Freeze chance, cool, always penetrate
					if (otherInfo.isGas) {
						if(Math.random() < 0.05 && otherInfo.stateLow) {
							if(otherInfo.stateLow.includes("supernova") || otherInfo.stateLow.includes("gamma_ray_burst")) {
								//do nothing
							} else {
								freezePixel(otherPixel)
							};
						};
						if(elements[otherPixel.element].isSun) {
							otherPixel.temp -= 0.5;
						} else {
							otherPixel.temp -= 50;
						};
						continue;
					};

					//Self: Break
					if (otherInfo.id === elements.freeze_ray.id) { break }

					//Non-gas, Freeze chance, cool more, half penetrate
					if(Math.random() < 0.05 && otherInfo.stateLow) {
						if(otherInfo.stateLow.includes("supernova") || otherInfo.stateLow.includes("gamma_ray_burst")) {
							//do nothing
						} else {
							freezePixel(otherPixel)
						};
					};
					pixelMap[x][y].temp -= 150;

					if(Math.random() < 0.05) {
					
						if(!isEmpty(x,y-1,false)) {
							if(pixelMap[x]?.[y-1]?.element && lightlikes.includes(pixelMap[x][y-1].element)) {
								deletePixel(x,y-1);
							};
						};
						var newSnow = tryCreatePixelReturn("snow",x,y-1);
						if(newSnow) { newSnow.temp = -100 };
					};

					//Penetrate snow and ice
					if(snowAndIceCache && snowAndIceCache.includes(otherPixel.element)) {
						continue;
					};

					if(Math.random() < 0.7) { //thanks, I hate random continue
						continue;
					};
					break;
				}
			}
			deletePixel(pixel.x, pixel.y);
		},
		temp: -200,
		category: "energy",
		state: "gas",
		excludeRandom: true,
		noMix: true
	};

	var hasVelocity = enabledMods.includes("mods/velocity.js");

	elements.smash_ray = {
		color: ["#ff9999", "#8c8279"],
		tick: function(pixel) {
			var x = pixel.x;
			for (var y = pixel.y; y < height; y++) {
				if (outOfBounds(x, y)) {
					break;
				}
				if (isEmpty(x, y)) {
					if (Math.random() > 0.05) { continue }
					createPixel("flash", x, y);
					pixelMap[x][y].color = "#edd0c5";
				}
				else {
					var otherPixel = pixelMap[x][y]
					var otherInfo = elements[otherPixel.element];
					if (!(grbBreakIntos.includes(otherPixel.element))) {
						if (otherInfo.isGas) {
							if(Math.random() > ((otherInfo.hardness ?? 0) ** 2)) { breakPixel(otherPixel,false,false) };
							if(hasVelocity && otherPixel && !(lightlikes.includes(otherPixel.element))) {
								var vels = [randomIntegerBetweenTwoValues(-7,7),randomIntegerBetweenTwoValues(-7,7)];
								otherPixel.vx = vels[0];
								otherPixel.vy = vels[1];
							};
							continue;
							
						};
						if (otherInfo.id === elements.heat_ray.id) { break }
						if(Math.random() > ((otherInfo.hardness ?? 0) ** 2)) { breakPixel(otherPixel,false,false) };
						if(hasVelocity && otherPixel) {
							var vels = [randomIntegerBetweenTwoValues(-7,7),randomIntegerBetweenTwoValues(-5,0)];
							otherPixel.vx = vels[0];
							otherPixel.vy = vels[1];
						};
						if(Math.random() < Math.max(0.8,0.3 + ((1 - (otherInfo.hardness ?? 0)) / 2))) { //thanks, I hate random continue
							continue;
						};
						break;
					}
				}
			}
			deletePixel(pixel.x, pixel.y);
		},
		temp: -200,
		category: "energy",
		state: "gas",
		excludeRandom: true,
		noMix: true
	};

	//bless falls within god ray
	elements.bless.reactions.dry_dirt = { elem2: "dirt" };
	elements.bless.reactions.dead_cum = { elem2: "cum" };
	elements.bless.reactions.dead_cum_water = { elem2: "cum_water" };
	elements.bless.reactions.dead_cum_ice = { elem2: "cum_ice" };
	elements.bless.reactions.dead_cum_water_ice = { elem2: "cum_water_ice" };
	elements.bless.reactions.dead_cum_snow = { elem2: "cum_snow" };
	elements.bless.reactions.dead_cummy_mud = { elem2: "cummy_mud" };
	elements.bless.reactions.dead_cummy_sand = { elem2: "cummy_sand" };
	elements.bless.reactions.dead_cummy_permafrost = { elem2: "cummy_permafrost" };
	elements.bless.reactions.burnt_cum = { elem2: null };
	elements.bless.reactions.poop = { elem2: null };
	elements.bless.reactions.dried_poop = { elem2: null };
	elements.bless.reactions.shit = { elem2: null };
	elements.bless.reactions.dried_shit = { elem2: null };
	elements.bless.reactions.frozen_shit = { elem2: null };
	elements.bless.reactions.diarrhea = { elem2: null };
	elements.bless.reactions.frozen_diarrhea = { elem2: null };
	elements.bless.reactions.piss = { elem2: null };
	elements.bless.reactions.vomit = { elem2: null };
} else {
	if(!enabledMods.includes(libraryMod))			{ enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod) };
	if(!enabledMods.includes(runAfterAutogenMod))	{ enabledMods.splice(enabledMods.indexOf(modName),0,runAfterAutogenMod) };
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert(`The "${runAfterAutogenMod}" and "${libraryMod}" mods are required and have been automatically inserted (reload for this to take effect).`);
};
