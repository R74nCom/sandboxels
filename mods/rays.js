// function whenAvailable(names, callback) {
//     var interval = 10; // ms
//     window.setTimeout(function() {
// 		let bool = true;
// 		for(let i = 0; i < names.length; i++)
// 		{
// 			if(!window[names[i]])
// 			{
// 				bool = false;
// 			}
// 		}
//         if (bool) {
//             callback();
//         } else {
//             whenAvailable(names, callback);
//         }
//     }, interval);
// }

var modName = "mods/rays.js";
// var runAfterAutogenMod = "mods/runAfterAutogen2.js";
// var libraryMod = "mods/code_library.js";

dependOn("code_library.js", function(){
	runAfterAutogen(function() {
		snowAndIceCache = Object.keys(elements).filter(function(name) {
			return name.endsWith("snow") || name.endsWith("ice") || name == "rime"
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
					if (elements[pixelMap[x][y].element].id === elements.cold_ray.id) { break }
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
		temp: 20,
		category: "energy",
		state: "gas",
		excludeRandom: true,
		noMix: true
	};

	//combines heat ray and smash ray
	elements.death_ray = {
		color: ["#a88d77", "#ff4a36"],
		tick: function(pixel) {
			var x = pixel.x;
			for (var y = pixel.y; y < height; y++) {
				if (outOfBounds(x, y)) {
					break;
				}
				if (isEmpty(x, y)) {
					if (Math.random() > 0.05) { continue }
					createPixel("insulate_flash", x, y);
					pixelMap[x][y].color = "#eb7b59";
				}
				else {
					var otherPixel = pixelMap[x][y]
					var otherInfo = elements[otherPixel.element];
					otherPixel.temp += (400 * (shiftDown + 1));
					if(otherPixel.del) { continue };
					if (!(grbBreakIntos.includes(otherPixel.element))) {
						if (otherInfo.isGas) {
							if(Math.random() > ((otherInfo.hardness ?? 0) ** (4 + shiftDown))) { breakPixel(otherPixel,false,false) };
							if(hasVelocity && otherPixel && !(lightlikes.includes(otherPixel.element))) {
								var vels = [randomIntegerBetweenTwoValues(-7 - (shiftDown * 2),7 + (shiftDown * 2)),randomIntegerBetweenTwoValues(-7 - (shiftDown * 2),7 + (shiftDown * 2))];
								otherPixel.vx = vels[0];
								otherPixel.vy = vels[1];
							};
							continue;
							
						};
						if (otherInfo.id === elements[pixel.element].id) { break }
						if(Math.random() > ((otherInfo.hardness ?? 0) ** (2 + shiftDown))) { breakPixel(otherPixel,false,false) };
						if(hasVelocity && otherPixel) {
							var vels = [randomIntegerBetweenTwoValues(-9 - (shiftDown * 2),9 + (shiftDown * 2)),randomIntegerBetweenTwoValues(-7 - (shiftDown * 2),0 + (shiftDown * 2))];
							otherPixel.vx = vels[0];
							otherPixel.vy = vels[1];
						};
						if(Math.random() < ((shiftDown / 20) + (Math.max(0.9,0.4 + ((1 - (otherInfo.hardness ?? 0)) / 2))))) { //thanks, I hate random continue
							continue;
						};
						break;
					}
				}
			}
			deletePixel(pixel.x, pixel.y);
		},
		temp: 4000,
		category: "energy",
		state: "gas",
		excludeRandom: true,
		noMix: true
	};

	elements.annihilation_ray = {
		color: ["#220c0c", "#c11515"],
		tick: function(pixel) {
			var x = pixel.x;
			for (var y = pixel.y; y < height; y++) {
				if (outOfBounds(x, y)) {
					break;
				}
				if (isEmpty(x, y)) {
					if (Math.random() > 0.05) { continue }
					createPixel("insulate_flash", x, y);
					pixelMap[x][y].color = "#292929";
				}
				else {
					var otherPixel = pixelMap[x][y];
					var otherInfo = elements[otherPixel?.element];

					if(otherPixel) {
						otherPixel.temp += 2500 * (shiftDown + 1);
						if(otherPixel.del || !otherPixel) { continue };

						if (otherPixel && grbBreakIntos.includes(otherPixel.element)) {
							if(Math.random() < 0.01 && otherPixel) {
								deletePixel(otherPixel.x,otherPixel.y);
							};
							continue;
						} else if(otherPixel) {
							breakPixel(otherPixel,false,false);
							if(otherPixel.del || !otherPixel) {
								continue
							};

							if(otherPixel && hasVelocity) {
								var vels = [randomIntegerBetweenTwoValues(-8,8),randomIntegerBetweenTwoValues(-6,0)];
								otherPixel.vx = vels[0];
								otherPixel.vy = vels[1];
							};

							if(otherPixel && Math.random() < (otherInfo.isGas ? 0.2 : 0.1)) {
								deletePixel(otherPixel.x,otherPixel.y);
								continue;
							};

							if(Math.random() > 0.8) {
								continue;
							};
						};
						if (otherInfo.id === elements[pixel.element].id) { break }
					};
				}
			}
			deletePixel(pixel.x, pixel.y);
		},
		temp: 150000000,
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
	elements.bless.reactions.crimson_grass = { elem2: "grass" };
	elements.bless.reactions.crimstone = { elem2: "rock" };
	elements.bless.reactions.crimsand = { elem2: "sand" };
	elements.bless.reactions.red_ice = { elem2: "ice" };
	elements.bless.reactions.crimgravel = { elem2: "gravel" };
	elements.bless.reactions.crimwater = { elem2: "water" };
	elements.bless.reactions.crimsnow = { elem2: "snow" };
	elements.bless.reactions.vicious_mushroom = { elem2: null };
	elements.bless.reactions.crimson_vine = { elem2: "vine" };
	/*elements.bless.reactions.shadewood = { elem2: "wood" };
	elements.bless.reactions.shadewood_tree_branch = { elem2: "tree_branch" };
	elements.bless.reactions.shadewood_sapling = { elem2: "sapling" };
	elements.bless.reactions.shadewood_sawdust = { elem2: "sawdust" };
	elements.bless.reactions.crimson_leaf = { elem2: "leaf" };*/
	elements.bless.reactions.ichor = { elem2: null }; //per blood, absent the gods' immune systems (apparenly they don't need immune systems because of immortality anyway)
	elements.bless.reactions.virus_bomb = { elem2: null };
	elements.bless.reactions.life_eater_slurry = { elem2: null };
	elements.bless.reactions.life_eater_explosion = { elem2: null };
	elements.bless.reactions.life_eater_virus = { elem2: null };
	elements.bless.reactions.injector_poison = { elem2: null };
	elements.bless.reactions.dead_matter = { elem2: null };
	elements.bless.reactions.life_eater_infected_dirt = { elem2: "dirt" };
	elements.bless.reactions.poisoned_dirt = { elem2: "dirt" };
	elements.bless.reactions.vicious_goldfish = { elem2: "fish" };
	elements.bless.reactions.nellfire = { elem2: "bless" };
	elements.bless.reactions.gloomwind = { elem2: null };
	elements.bless.reactions.gloomfly = { elem2: null };
	elements.bless.reactions.meat_monster = { elem2: null };
	elements.bless.reactions.rotten_ravager = { elem2: null };
	elements.bless.reactions.bone_beast = { elem2: null };
	elements.bless.reactions.poisonwater = { elem2: "water" };
	elements.bless.reactions.poisoned_ice = { elem2: "ice" };
	elements.bless.reactions.poisoned_gas = { elem2: "steam" };
	elements.bless.reactions.corrupt_land = { elem2: "dirt" };
	elements.bless.reactions.corrupt_rock = { elem2: "rock" };
	elements.bless.reactions.withery = { elem2: null };
	elements.bless.reactions.withery_plant = { elem2: null };
	elements.bless.reactions.corrupt_solid_rock = { elem2: "rock_wall" };
	elements.bless.reactions.toxin = { elem2: "antidote" };
	elements.bless.reactions.dead = { elem2: null };
	elements.bless.reactions.brain = { elem2: null };
	elements.bless.reactions.bioooze = { elem2: null };
	elements.bless.tool = function(pixel) {
        if (elements.bless.ignore.indexOf(pixel.element) !== -1) { return; }
        if (pixel.burning) { // stop burning
            delete pixel.burning;
            delete pixel.burnStart;
        }
        if (pixel.nellburn) { // change: stop nellburn
            delete pixel.nellburn;
            delete pixel.nellburnStart;
        }
        if (pixel.temp > 100) {
            pixel.temp = (pixel.temp+100)/2;
            pixelTempCheck(pixel);
            if (pixel.del) {return}
        }
        if (pixel.origColor) {
            pixel.color = "rgb("+pixel.origColor.join(",")+")";
            delete pixel.origColor;
        }
        if (pixel.charge) {
            delete pixel.charge;
            pixel.chargeCD = 16;
        }
        if (elements.bless.reactions[pixel.element] && Math.random()<0.25) {
            var r = elements.bless.reactions[pixel.element];
            var elem2 = r.elem2;
            if (elem2 !== undefined) {
                if (Array.isArray(elem2)) { elem2 = elem2[Math.floor(Math.random()*elem2.length)]; }
                if (elem2 === null) { deletePixel(pixel.x,pixel.y) }
                else { changePixel(pixel, elem2); }
            }
        }
	};
},true);