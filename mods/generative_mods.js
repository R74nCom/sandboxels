var modName = "mods/generative_mods.js";
var explodeAtPlusMod = "mods/explodeAtPlus.js";
var runAfterAutogenMod = "mods/runAfterAutogen and onload restructure.js";
var libraryMod = "mods/code_library.js";
var feyAndMoreMod = "mods/fey_and_more.js";
var mobsMod = "mods/mobs.js";

if(enabledMods.includes(runAfterAutogenMod) && enabledMods.includes(explodeAtPlusMod) && enabledMods.includes(libraryMod) && enabledMods.includes(feyAndMoreMod) && enabledMods.includes(mobsMod)) {
	
	//urlParams reads
		
		//Bombs

			if(urlParams.get('generateBombs') !== null) { //if the variable exists at all
				generateBombs = true
			} else { //if it doesn't (and it returns null)
				generateBombs = false
			}

			if(urlParams.get('bombAmount') != null) { //null check
				bombAmount = urlParams.get('bombAmount')
				if(isNaN(bombAmount) || bombAmount === "" || bombAmount === null) { //NaN check
					 bombAmount = 10
				}
				bombAmount = parseInt(bombAmount)
				if(bombAmount > 50) {
					alert("Maximum amount of additional bomb/anti-bomb pairs is 50.\nOnly 50 were added.")
				} else if(bombAmount < 1) {
					alert("Minimum amount of additional bomb/anti-bomb pairs is 1.\n1 pair was added.")
				}
				bombAmount = Math.min(50,Math.max(bombAmount,1))
			} else {
				bombAmount = 10
			}

		//Clouds

			if(urlParams.get('generateClouds') !== null) { //if the variable exists at all
				generateClouds = true
			} else { //if it doesn't (and it returns null)
				generateClouds = false
			}

			if(urlParams.get('cloudIncludeRandom') !== null) { //if the variable exists at all
				cloudIncludeRandom = true
			} else { //if it doesn't (and it returns null)
				cloudIncludeRandom = false
			}

		//Creepers

			//Include generated creepers in Random tool?
			if(urlParams.get('creeperIncludeRandom') !== null) { //if the variable exists at all
				creeperIncludeRandom = true
			} else { //if it doesn't (and it returns null)
				creeperIncludeRandom = false
			}

			//Generate creepers
			if(urlParams.get('generateCreepers') !== null) { //if the variable exists at all
				generateCreepers = true
			} else { //if it doesn't (and it returns null)
				generateCreepers = false
			}

		//Fairies

			if(urlParams.get('fairyIncludeRandom') !== null) { //if the variable exists at all
				fairyIncludeRandom = true
			} else { //if it doesn't (and it returns null)
				fairyIncludeRandom = false
			}

			//Generate fairies
			if(urlParams.get('generateFairies') !== null) { //if the variable exists at all
				generateFairies = true
			} else { //if it doesn't (and it returns null)
				generateFairies = false
			}
			
			if(urlParams.get('fairyAmount') != null) { //null check
				fairyAmount = urlParams.get('fairyAmount')
				if(isNaN(fairyAmount) || fairyAmount === "" || fairyAmount === null) { //NaN check
					 fairyAmount = 10
				}
				fairyAmount = parseInt(fairyAmount)
				if(fairyAmount > 10000) {
					alert("Maximum amount of additional fairies is 10000.\nOnly 10000 fairies were added.")
				} else if(fairyAmount < 1) {
					alert("Minimum amount of additional fairies is 1.\n1 fairy was added.")
				}
				fairyAmount = Math.min(10000,Math.max(fairyAmount,1))
			} else {
				fairyAmount = 10
}

		//Spouts

			//Generate spouts
			if(urlParams.get('generateSpouts') !== null) { //if the variable exists at all
				generateSpouts = true
			} else { //if it doesn't (and it returns null)
				generateSpouts = false
			}

			if(urlParams.get('spoutIncludeRandom') !== null) { //if the variable exists at all
				spoutIncludeRandom = true
			} else { //if it doesn't (and it returns null)
				spoutIncludeRandom = false
			}

	//Requisite variables

		//Bombs

			amalgamatedBombFire = "plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,smoke,plasma,plasma,fire,smoke,fire,smoke,plasma,metal_scrap,metal_scrap,metal_scrap,metal_scrap,metal_scrap,acid,acid,oil,oil,oil,oil,oil,oil,oil,plasma,plasma,plasma,plasma,plasma,smoke,plasma,plasma,fire,smoke,plasma,metal_scrap,metal_scrap,metal_scrap,metal_scrap,metal_scrap,metal_scrap,flash,flash,flash,flash,flash,acid_gas,acid_gas,acid_gas,acid,oil,oil,oil,oil,oil,oil,oil,oil,oil,oil,plasma,plasma,plasma,plasma,metal_scrap,metal_scrap,metal_scrap,metal_scrap,metal_scrap,acid,acid,oil,oil,oil,oil,oil,oil,oil,plasma,plasma,plasma,plasma,plasma,smoke,plasma,plasma,fire,smoke,plasma,metal_scrap,metal_scrap,metal_scrap,metal_scrap,metal_scrap,metal_scrap,electric_cluster_bomb,electric_cluster_bomb,flash,flash,flash,flash,flash,acid_gas,acid_gas,acid_gas,acid,oil,oil,oil,oil,oil,oil,oil,oil,oil,oil,plasma,plasma,plasma,plasma,plague,plague,plague,plague,plague,plague,radiation,radiation,radiation,radiation,radiation,radiation,radiation,radiation,uranium,uranium,uranium,uranium,uranium,uranium,greek_fire,greek_fire,greek_fire,greek_fire,greek_fire,antimatter,antimatter,antimatter,antimatter,antimatter,smoke_grenade,antimatter,smoke_grenade,fireball,flash,acid_gas,acid_gas,acid_gas,plague,plague,plague,plague,plague,plague,radiation,radiation,radiation,radiation,radiation,radiation,radiation,radiation,uranium,uranium,uranium,uranium,uranium,uranium,greek_fire,greek_fire,greek_fire,greek_fire,greek_fire,antimatter,antimatter,antimatter,antimatter,antimatter,smoke_grenade,antimatter,flash,acid_gas,acid_gas,acid_gas,radiation,radiation,radiation,radiation,plague,acid_gas,acid_gas,acid_gas,chlorine,chlorine,chlorine"
			eLists.BOMB = ["bomb", "tnt", "c4", "grenade", "dynamite", "gunpowder", "firework", "nuke", "h_bomb", "dirty_bomb", "emp_bomb", "sticky_bomb", "cold_bomb", "hot_bomb", "electro_bomb", "water_bomb", "antimatter_bomb", "flashbang", "smoke_grenade", "fireball", "landmine", "cluster_bomb", "cluster_nuke", "op_hottester_bomb", "anti-bomb", "electric_bomblet", "electric_cluster_bomb", "radioactive_popper", "acid_bomb", "amalgamated_bomb"];
			var excludedBombElements = ["water", "antimatter", "acid"];

		//Clouds

			eLists.CLOUD = ["cloud", "rain_cloud", "snow_cloud", "fire_cloud", "hail_cloud", "acid_cloud", "pyrocumulus"];
			var includedClouds = ["cloud", "rain_cloud", "snow_cloud", "fire_cloud", "hail_cloud", "acid_cloud", "pyrocumulus"];
			var excludedCloudElements = ["snow", "fire", "hail", "acid"];
			if(typeof(behaviorGenerators) === "undefined") { behaviorGenerators = {} };

		//Creepers

			var placeholderColor = "#FF00FF";
			var hslOffsets = [[0, -5, 5], [0, -20, 10], [0, 0, 10], [0, -20, 10], [0, -35, 0], [0, -20, -30], [0, 10, -10], [0, 10, 20], [0, -20, 10], [0, -10, 5]];
			var colorOfRandomCreeper = ["#7ba883", "#8aba8a", "#87b292", "#8aba8a", "#71a171", "#346434", "#4d6d72", "#a0caad", "#8aba8a", "#7dac7f"]

		//Fairies

			var excludedFairyElements = []
			var backupCategoryWhitelist = ["land","powders","weapons","food","life","corruption","states","fey","Fantastic Creatures","dyes","energy liquids","random liquids","random gases","random rocks"];
			var backupElementWhitelist = ["mercury", "chalcopyrite_ore", "chalcopyrite_dust", "copper_concentrate", "fluxed_copper_concentrate", "unignited_pyrestone", "ignited_pyrestone", "everfire_dust", "extinguished_everfire_dust", "mistake", "polusium_oxide", "vaporized_polusium_oxide", "glowstone_dust", "redstone_dust", "soul_mud", "wet_soul_sand", "nitrogen_snow", "fusion_catalyst", "coal", "coal_coke", "blast_furnace_fuel", "molten_mythril"];

		//Spouts
			eLists.SPOUT = ["spout", "udder", "torch"];
			var excludedSpoutElements = ["ketchup", "liquid_cloner", "fire_cloner"]
			var includedSpouts = ["ketchup_spout", "spout", "udder", "torch"]
			var backupCategoryWhitelist = ["land","powders","weapons","food","life","corruption","states","fey","Fantastic Creatures","dyes","energy liquids","random liquids","random gases","random rocks"];
			var backupElementWhitelist = ["mercury", "chalcopyrite_ore", "chalcopyrite_dust", "copper_concentrate", "fluxed_copper_concentrate", "unignited_pyrestone", "ignited_pyrestone", "everfire_dust", "extinguished_everfire_dust", "mistake", "polusium_oxide", "vaporized_polusium_oxide", "glowstone_dust", "redstone_dust", "soul_mud", "wet_soul_sand", "nitrogen_snow", "fusion_catalyst", "coal", "coal_coke", "blast_furnace_fuel", "molten_mythril"];


	//Requisite non-generating functions

		//Bombs

			function firebombFire(pixel,x,y,radius,fire,smoke,power,damage) {
				var coords = circleCoords(pixel.x,pixel.y,radius);
				for (var i = 0; i < coords.length; i++) {
					var x = coords[i].x;
					var y = coords[i].y;
					if(!isEmpty(x,y,true)) {
						var pixel = pixelMap[x][y];
						var info = elements[pixel.element];
						var cursedFireChance = 0.15 + power;
						if (info.burn) { //Light everything on fire
							pixel.burning = true;
							pixel.burnStart = pixelTicks;
							pixel.temp += 10; //smoke prevention
						} else if(Math.random() < cursedFireChance) { //(15+power)%/px cursed burning
							pixel.burning = true;
							pixel.burnStart = pixelTicks;
							pixel.temp += 10;
						};
					} else if(isEmpty(x,y)) { //if there's space for fire
						if (Array.isArray(fire)) { //this should remain "fire"
							var newfire = fire[Math.floor(Math.random() * fire.length)];
						} else {
							var newfire = fire;
						};
						createPixel(newfire,x,y); //add fire
						var firePixel = pixelMap[x][y];
						firePixel.temp = Math.max(elements[newfire].temp,firePixel.temp);
						firePixel.burning = true;
					};
				};
			};

			function hotterBomb(pixel,x,y,radius,fire,smoke,power,damage) {
				//console.log(`Radius: ${radius}\nPower: ${power}\nPixel: (${pixel.x},${pixel.y})\nDamage: ${damage}`);
				//console.log(`Expected temperature increase for pixel at (${pixel.x},${pixel.y}): ${800 * ((1 + (7 * damage)) ** 2) * ((power ** 2) * 1.5)}`);
				pixel.temp += (800 * ((1 + (7 * damage)) ** 2) * ((power ** 2) * 1.5));
			};

			function starbombHeat(pixel,x,y,radius,fire,smoke,power,damage) { //Massively heats depending on distance from explosion center
				var distanceFromEdge = Math.max(0,radius - coordPyth(pixel.x,pixel.y,x,y));
				var radiusRelatedIncrease = 10 ** logN(distanceFromEdge,5);
				pixel.temp += (10000 * radiusRelatedIncrease);
				pixelTempCheck(pixel);
			};

		//Clouds

			behaviorGenerators.cloud = function(element) {
				if(element instanceof Array) { element = element.join(",") };
				return [
					["XX","XX","XX"],
					["XX",`CH:${element}%0.05`,"M1%2.5 AND BO"],
					["XX","XX","XX"]
				];
			};

			behaviorGenerators.heavy_cloud = function(element) {
				if(element instanceof Array) { element = element.join(",") };
				return [
					["XX","XX","XX"],
					["XX",`CH:${element}%0.1`,"M1%2.5 AND BO"],
					["XX",`CR:${element}%0.05`,"XX"]
				];
			};

			behaviorGenerators.heavier_cloud = function(element) {
				if(element instanceof Array) { element = element.join(",") };
				return [
					["XX","XX","XX"],
					["XX",`CH:${element}%0.2`,"M1%2.5 AND BO"],
					["XX",`CR:${element}%0.1`,"XX"]
				];
			};

			behaviorGenerators.heaviest_cloud = function(element) {
				if(element instanceof Array) { element = element.join(",") };
				return [
					["XX","XX","XX"],
					["XX",`CH:${element}%0.4`,"M1%2.5 AND BO"],
					["XX",`CR:${element}%0.2`,"XX"]
				];
			};

			behaviorGenerators.heaviester_cloud = function(element) {
				if(element instanceof Array) { element = element.join(",") };
				return [
					["XX","XX","XX"],
					["XX",`CH:${element}%0.8`,"M1%2.5 AND BO"],
					["XX",`CR:${element}%0.4`,"XX"]
				];
			};

			behaviorGenerators.heaviestest_cloud = function(element) {
				if(element instanceof Array) { element = element.join(",") };
				return [
					["XX",`CR:${element}%0.8`,"XX"],
					[`CR:${element}%0.05`,`CH:${element}%3`,`CR:${element}%0.05 AND M1%2.5 AND BO`],
					["XX",`CR:${element}%0.8`,"XX"]
				];
			};

			function placeDownwardColumn(element,xx,yy,creationChance) {
				if(element.includes(",")) { element = element.split(",") };
				var newElement = element;
				//console.log(JSON.stringify(element));
				//console.log("from " + xx + "," + yy)
				if(!outOfBounds(xx,yy)) {
					for(i = yy; i < pixelMap[xx].length; i++) {
						if(Array.isArray(element)) {
							newElement = element[Math.floor(Math.random() * element.length)];
						};
						//console.log(JSON.stringify(newElement));
						if(isEmpty(xx,i,false)) {
							if(Math.random() < creationChance) {
								createPixel(newElement,xx,i)
							}
						} else if(!isEmpty(xx,i,true)) {
							var newPixel = pixelMap[xx][i];
							var otherElement = newPixel.element;
							var newState = elements[otherElement].state ?? "solid"; //assume undefined = solid
							if(newState !== "solid") {
								continue;
							} else {
								break;
							};
						} else if(outOfBounds(xx,i)) {
							break;
						}; 
					};
				};
			};

			function singleColumn(pixel,element,chance,fillAmountDecimal) {
				if(Math.random() < chance) {
					placeDownwardColumn(element,pixel.x,pixel.y+1,fillAmountDecimal);
				}
			};

			function multiColumn(pixel,element,chance,fillAmountDecimal,columnRadius) {
				if(Math.random() < chance) {
					for(j = 0 - columnRadius; j <= columnRadius; j++) {
						placeDownwardColumn(element,pixel.x+j,pixel.y+1,fillAmountDecimal);
					};
				}
			};

		//Creepers

			autoCreeperPlacerTick = function(pixel) {
				var creeperElement = elements[pixel.element].creeperType;
				var headName,bodyName;
				if(typeof(creeperElement === "string")) { //comma separated string check
					if(creeperElement.includes(",")) { //if it is
						creeperElement = creeperElement.split(","); //to array
						creeperElement = creeperElement.filter(function(e) { //strip nonexistent elements
							return typeof(elements[e]) === "object";
						});
					};
				};
				if(Array.isArray(creeperElement)) {
					headName = `${creeperElement.join("_")}_creeper_head`; //auto head element name
					bodyName = `${creeperElement.join("_")}_creeper_body`; //auto body element name
				} else {
					headName = `${creeperElement}_creeper_head`; //auto head element name
					bodyName = `${creeperElement}_creeper_body`; //auto body element name
				};
				if (isEmpty(pixel.x, pixel.y+1)) {
					createPixel(bodyName, pixel.x, pixel.y+1);
					pixel.element = headName;
					pixel.color = pixelColorPick(pixel)
				} else if (isEmpty(pixel.x, pixel.y-1)) {
					createPixel(headName, pixel.x, pixel.y-1);
					pixel.element = bodyName;
					pixel.color = pixelColorPick(pixel)
				} else {
					deletePixel(pixel.x, pixel.y);
				};
			};

			autoCreeperBodyTick = function(pixel) {
				var creeperElement = elements[pixel.element].creeperType;
				var headName,bodyName,explodeInto;
				if(typeof(creeperElement === "string")) { //comma separated string check
					if(creeperElement.includes(",")) { //if it is
						creeperElement = creeperElement.split(","); //to array
						creeperElement = creeperElement.filter(function(e) { //strip nonexistent elements
							return typeof(elements[e]) === "object";
						});
					};
				};
				if(Array.isArray(creeperElement)) {
					headName = `${creeperElement.join("_")}_creeper_head`; //auto head element name
					bodyName = `${creeperElement.join("_")}_creeper_body`; //auto body element name
					explodeInto = creeperElement.join(","); //auto body element name
				} else {
					headName = `${creeperElement}_creeper_head`; //auto head element name
					bodyName = `${creeperElement}_creeper_body`; //auto body element name
					explodeInto = creeperElement; //auto body element name
				};
				if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
					if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
						var headPixel = pixelMap[pixel.x][pixel.y-2];
						if (headPixel.element == headName) {
							if (isEmpty(pixel.x, pixel.y-1)) {
								movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
							}
							else {
								swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
							}
						}
					}
				}
				doHeat(pixel);
				doBurning(pixel);
				doElectricity(pixel);
				if (pixel.dead) {
					// Turn into rotten_meat if pixelTicks-dead > 500
					if (pixelTicks-pixel.dead > 200) {
						Math.random() < 0.1 ? changePixel(pixel,"gunpowder") : changePixel(pixel,"rotten_meat");
					}
					return
				}

				// Find the head
				if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == headName) {
					var head = pixelMap[pixel.x][pixel.y-1];
					if (head.dead) { // If head is dead, kill body
						pixel.dead = head.dead;
					}
				}
				else { var head = null }

				if (isEmpty(pixel.x, pixel.y-1)) {
					// create blood if decapitated 10% chance
					if (Math.random() < 0.1) {
						createPixel("blood", pixel.x, pixel.y-1);
						// set dead to true 15% chance
						if (Math.random() < 0.15) {
							pixel.dead = pixelTicks;
						}
					}
				}
				else if (head == null) { return }
				else if (Math.random() < 0.1) { // Move 10% chance
					var movesToTry = [
						[1*pixel.dir,0],
						[1*pixel.dir,-1],
					];
					// While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
					while (movesToTry.length > 0) {
						var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
						if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
							if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1])) {
								movePixel(head, head.x+move[0], head.y+move[1]);
								break;
							};
						};
					};
					// 15% chance to change direction while not chasing a human
					if(!head.following) {
						if (Math.random() < 0.15) {
							pixel.dir *= -1;
							//console.log("*turns around cutely to face ${pixel.dir < 0 ? 'left' : 'right'}*");
						};
					}/* else {
						//console.log("*chases cutely*");
					};*/
				};

				if(pixel.charge) {
					pixel.charged = true;
				};
				
				if(head) {
					if(typeof(head.charge) !== "undefined") {
						if(head.charge) {
							pixel.charged = true;
						};
					};
					if(typeof(head.charged) !== "undefined") {
						if(head.charged) {
							pixel.charged = true;
						};
					};
				};

				if(typeof(pixel.charged) === "undefined") {
					pixel.charged = false;
				};

				if(pixel.charged) {
					var explosionRadius = 7;
					if(!pixel.didChargeBlueTinted) { //do once, on initial charge
						//console.log("something something halsey lyric");
						var color = pixel.color;
						if(color.startsWith("rgb")) {
							//console.log("rgb detected");
							color = color.split(","); //split color for addition
							var red = parseFloat(color[0].substring(4));
							var green = parseFloat(color[1]);
							var blue = parseFloat(color[2].slice(0,-1));
							red = rgbColorBound(red + 51);
							green = rgbColorBound(green + 51);
							blue = rgbColorBound(blue + 102);
							color = `rgb(${red},${green},${blue})`;
							pixel.color = color;
							//console.log("color set");
						} else if(color.startsWith("hsl")) {
							//console.log("hsl detected");
							color = color.split(","); //split color for addition
							var hue = parseFloat(color[0].substring(4));
							var saturation = parseFloat(color[1].slice(0,-1));
							var luminance = parseFloat(color[2].slice(0,-2));
							hue = hue % 360; //piecewise hue shift
							if(hue <= 235 && hue >= 135) {
								hue = 185;
							} else if(hue < 135) {
								hue += 50;
							} else if(hue > 235 && hue < 360) {
								hue -= 50;
							};
							saturation = slBound (saturation + 10);
							luminance = slBound(luminance + 20);
							color = `hsl(${hue},${saturation}%,${luminance}%)`;
							pixel.color = color;
							//console.log("color set");
						};
						pixel.didChargeBlueTinted = true;
					};
				} else {
					var explosionRadius = 5;
				};
				
				if(pixel.burning) {
					pixel.hissing = true;
					if(!pixel.hissStart) {
						pixel.hissStart = pixelTicks;
					};
					if(!pixel.burnStart) { //I don't like errors.
						pixel.burnStart = pixel.ticks;
					};
					if(pixelTicks - pixel.burnStart > 30) {
						//console.log("Kaboom?");
						explodeAt(pixel.x,pixel.y,explosionRadius,creeperElement);
						//console.log("Yes, Rico, kaboom.");
					};
				};

				//Head hissing color handler: keeps track of head's hissing for coloring purposes
				for(i = 0; i < 1; i++) { //dummy for loop
					if(pixel.dead || !head || head.dead) { //can't hiss without a head according to the classic creeper anatomy
						//console.log("ss-- oof");
						pixel.hissing = false;
						break;
					};
					if(head.hissing) {
						//console.log("Ssssssss");
						if(!head.hissStart) {
							//console.log("t-30 ticks or whatever it was");
							head.hissStart = pixelTicks;
						};

						//Color code {
							var ticksHissing = pixelTicks - head.hissStart;
							var color = pixel.color; //do on each hissing tick
							if(color.startsWith("rgb")) {
								//console.log("rgb detected");
								color = color.split(","); //split color for addition
								var red = parseFloat(color[0].substring(4));
								var green = parseFloat(color[1]);
								var blue = parseFloat(color[2].slice(0,-1));
								red = rgbColorBound(red + ticksHissing);
								green = rgbColorBound(green + ticksHissing);
								blue = rgbColorBound(blue + ticksHissing);
								color = `rgb(${red},${green},${blue})`;
								pixel.color = color;
								//console.log("color set");
							} else if(color.startsWith("hsl")) {
								//console.log("hsl detected");
								color = color.split(","); //split color for addition
								var hue = parseFloat(color[0].substring(4));
								var saturation = parseFloat(color[1].slice(0,-1));
								var luminance = parseFloat(color[2].slice(0,-2));
								//console.log("the j");
								luminance = slBound(luminance + 1.176);
								//console.log(luminance);
								color = `hsl(${hue},${saturation}%,${luminance}%)`;
								pixel.color = color;
								//console.log("color set");
							};
						//}
					};
				};
			};

			autoCreeperHeadTick = function(pixel) {
				var creeperElement = elements[pixel.element].creeperType;
				var headName,bodyName,explodeInto;
				if(typeof(creeperElement === "string")) { //comma separated string check
					if(creeperElement.includes(",")) { //if it is
						creeperElement = creeperElement.split(","); //to array
						creeperElement = creeperElement.filter(function(e) { //strip nonexistent elements
							return typeof(elements[e]) === "object";
						});
					};
				};
				if(Array.isArray(creeperElement)) {
					headName = `${creeperElement.join("_")}_creeper_head`; //auto head element name
					bodyName = `${creeperElement.join("_")}_creeper_body`; //auto body element name
					explodeInto = creeperElement.join(","); //auto body element name
				} else {
					headName = `${creeperElement}_creeper_head`; //auto head element name
					bodyName = `${creeperElement}_creeper_body`; //auto body element name
					explodeInto = creeperElement; //auto body element name
				};
				doHeat(pixel);
				doBurning(pixel);
				doElectricity(pixel);
				if (pixel.dead) {
					// Turn into rotten_meat if pixelTicks-dead > 500
					if (pixelTicks-pixel.dead > 200) {
						Math.random() < 0.1 ? changePixel(pixel,"gunpowder") : changePixel(pixel,"rotten_meat");
						return
					}
				}

				// Find the body
				if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == bodyName) {
					var body = pixelMap[pixel.x][pixel.y+1];
					if (body.dead) { // If body is dead, kill head
						pixel.dead = body.dead;
					}
				}
				else { var body = null }

				if(body) {
					if(body.dir !== pixel.dir) { //hacky workaround: lock head dir to body dir
						pixel.dir = body.dir;
					};
				};

				if (isEmpty(pixel.x, pixel.y+1)) {
					tryMove(pixel, pixel.x, pixel.y+1);
					// create blood if severed 10% chance
					if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1) {
						createPixel("blood", pixel.x, pixel.y+1);
						// set dead to true 15% chance
						if (Math.random() < 0.15) {
							pixel.dead = pixelTicks;
						}
					}
				}
				
				//start of most new code
				var pX = pixel.x;
				var pY = pixel.y;
				
				if(pixel.charge) {
					pixel.charged = true;
				};
				
				if(body) {
					if(typeof(body.charge) !== "undefined") {
						if(body.charge) {
							pixel.charged = true;
						};
					};
					if(typeof(body.charged) !== "undefined") {
						if(body.charged) {
							pixel.charged = true;
						};
					};
				};
				
				if(typeof(pixel.charged) === "undefined") {
					pixel.charged = false;
				};

				if(pixel.charged) {
					var explosionRadius = 10;
					if(!pixel.didChargeBlueTinted) { //do once, on initial charge
						//console.log("something something halsey lyric");
						var color = pixel.color;
						if(color.startsWith("rgb")) {
							//console.log("rgb detected");
							color = color.split(","); //split color for addition
							var red = parseFloat(color[0].substring(4));
							var green = parseFloat(color[1]);
							var blue = parseFloat(color[2].slice(0,-1));
							red = rgbColorBound(red + 51);
							green = rgbColorBound(green + 51);
							blue = rgbColorBound(blue + 102);
							color = `rgb(${red},${green},${blue})`;
							pixel.color = color;
							//console.log("color set");
						} else if(color.startsWith("hsl")) {
							//console.log("hsl detected");
							color = color.split(","); //split color for addition
							var hue = parseFloat(color[0].substring(4));
							var saturation = parseFloat(color[1].slice(0,-1));
							var luminance = parseFloat(color[2].slice(0,-2));
							hue = hue % 360; //piecewise hue shift
							if(hue <= 235 && hue >= 135) {
								hue = 185;
							} else if(hue < 135) {
								hue += 50;
							} else if(hue > 235 && hue < 360) {
								hue -= 50;
							};
							saturation = slBound (saturation + 10);
							luminance = slBound(luminance + 20);
							color = `hsl(${hue},${saturation}%,${luminance}%)`;
							pixel.color = color;
							//console.log("color set");
						};
						pixel.didChargeBlueTinted = true;
					};
				} else {
					var explosionRadius = 7;
				};
				
				//Human detection loop (looks ahead according to direction and sets the "following" variable to true, telling the body to lock the direction)
				var directionAdverb = "left";
				if(pixel.dir > 0) {
					directionAdverb = "right";
				};
				//console.log(`Looking ${directionAdverb}`)
				if(pixel.dir === -1) {
					for(i = -4; i < 4+1; i++) {
						var oY = i;
						//console.log(`Starting row look at row ${pY+oY}`)
						for(j = (-1); j > (-16 - 1); j--) {
							var oX = j;
							var nX = pX+oX;
							var nY = pY+oY;
							if(outOfBounds(nX,nY)) {
								//console.log(`Stopping row look at pixel (${nX},${nY}) due to OoB`)
								break;
							};
							if(isEmpty(nX,nY)) {
								////console.log(`Skipping pixel (${nX},${nY}) (empty)`)
								continue;
							};
							if(!isEmpty(nX,nY,true)) {
								var newPixel = pixelMap[nX][nY];
								var newElement = newPixel.element;
								if(enemyHumanoidArray.includes(newElement)) {
									//console.log(`Human part found at (${nX},${nY})`)
									if(!newPixel.dead) {
										pixel.following = true;
										//console.log(`Human detected at (${nX},${nY})`)
										//Start "hissing" if a human is close enough
										if(coordPyth(pX,pY,nX,nY) <= 3.15) { //probably misapplying the tolerance from the MC Wiki line: "Creepers will chase after any player, as long as it is within a 16 block (±5%) radius"
											pixel.hissing = true;
											if(!pixel.hissStart) {
												pixel.hissStart = pixelTicks;
											};
										};
									};
								} else {
									//console.log(`Stopping row look at pixel (${nX},${nY}) due to non-human pixel in the way`)
									break; //can't see through humans
								};
							};
						};
					};
				} else if(pixel.dir === 1) {
					for(i = -4; i < 4+1; i++) {
						var oY = i;
						//console.log(`Starting row look at row ${pY+oY}`)
						for(j = 1; j < 16 + 1; j++) {
							var oX = j;
							var nX = pX+oX;
							var nY = pY+oY;
							if(outOfBounds(nX,nY)) {
								//console.log(`Stopping row look at pixel (${nX},${nY}) due to OoB`)
								break;
							};
							if(isEmpty(nX,nY)) {
								////console.log(`Skipping pixel (${nX},${nY}) (empty)`)
								continue;
							};
							if(!isEmpty(nX,nY,true)) {
								var newPixel = pixelMap[nX][nY];
								var newElement = newPixel.element;
								if(enemyHumanoidArray.includes(newElement)) {
									//console.log(`Human part found at (${nX},${nY})`)
									if(!newPixel.dead) {
										pixel.following = true;
										//console.log(`Human detected at (${nX},${nY})`)
										//Start "hissing" if a human is close enough
										if(coordPyth(pX,pY,nX,nY) <= 3.15) {
											pixel.hissing = true;
											if(!pixel.hissStart) {
												pixel.hissStart = pixelTicks;
											};
										};
										break;
									};
								} else {
									//console.log(`Stopping row look at pixel (${nX},${nY}) due to non-human pixel in the way`)
									break;
								};
							};
						};
					};
				};
				
				//Pre-explosion handler: keeps track of time before the kaboom
				for(i = 0; i < 1; i++) { //dummy for loop
					if(pixel.hissing) {
						//console.log("Ssssssss");
						if(pixel.dead || !body || body.dead) { //can't explode without a body according to the classic creeper anatomy
							//console.log("ss-- oof");
							pixel.hissing = false;
							break;
						};
						if(!pixel.hissStart) {
							//console.log("t-30 ticks or whatever it was");
							pixel.hissStart = pixelTicks;
						};
						//Color code {
							var ticksHissing = pixelTicks - pixel.hissStart;
							var color = pixel.color; //do on each hissing tick
							if(color.startsWith("rgb")) {
								//console.log("rgb detected");
								color = color.split(","); //split color for addition
								var red = parseFloat(color[0].substring(4));
								var green = parseFloat(color[1]);
								var blue = parseFloat(color[2].slice(0,-1));
								red = rgbColorBound(red + ticksHissing);
								green = rgbColorBound(green + ticksHissing);
								blue = rgbColorBound(blue + ticksHissing);
								color = `rgb(${red},${green},${blue})`;
								pixel.color = color;
								//console.log("color set");
							} else if(color.startsWith("hsl")) {
								//console.log("hsl detected");
								color = color.split(","); //split color for addition
								var hue = parseFloat(color[0].substring(4));
								var saturation = parseFloat(color[1].slice(0,-1));
								var luminance = parseFloat(color[2].slice(0,-2));
								luminance = slBound(luminance + 1.176);
								color = `hsl(${hue},${saturation}%,${luminance}%)`;
								pixel.color = color;
								//console.log("color set");
							};
						//}

						if(pixelTicks - pixel.hissStart > 30) {
							//console.log("Kaboom?");
							//console.log(`Exploding with element ${creeperElement} and radius ${explosionRadius} (charged: ${pixel.charged})`);
							explodeAt(body.x,body.y,explosionRadius,explodeInto);
							//console.log("Yes, Rico, kaboom.");
						};
					};
				};
				
				if(Math.random() < 0.01) { //1% chance each tick to lose interest
					pixel.following = false;
					//console.log("Meh.");
				};
			};

		//Several
	
			function commonMovableCriteria(name) {
				if(typeof(elements[name]) !== "object") {
					throw new Error(`Nonexistent element ${name}`);
				};
				var info = elements[name];
				//console.log(`${name} (${JSON.stringify(elements[name])})`);
				if(typeof(info.state) === "undefined") {
					var state = null;
				} else {
					var state = info.state;
				};
				if(typeof(info.category) === "undefined") {
					var category = "other";
				} else {
					var category = info.category;
				};
				if(excludedFairyElements.includes(name) || excludedCloudElements.includes(name)) {
					return false
				};
				if(elements[name].behavior && elements[name].behavior.toString() == elements.wall.behavior.toString() && !elements[name].tick) {
					return false;
				};
				if(["liquid","gas"].includes(state)) {
					return true;
				};
				if(info.movable) {
					return true;
				};
				if(backupCategoryWhitelist.includes(category)) {
					return true;
				};
				if(backupElementWhitelist.includes(name)) {
					return true;
				};
				if(category.includes("mudstone")) {
					return true;
				};
				return false;
			};

	//runAfterLoad calls
	
		//Bombs

			runAfterLoad(function() {
			  if(enabledMods.includes("mods/fey_and_more.js")) {
				amalgamatedBombFire += ",poisonwater".repeat(8);
				amalgamatedBombFire += ",mystic_fire".repeat(4);
				amalgamatedBombFire += ",firesea".repeat(6);
				amalgamatedBombFire += ",lektre".repeat(6);
			  };
			  if(enabledMods.includes("mods/Neutronium Mod.js")) {
				amalgamatedBombFire += ",flamer".repeat(3);
				amalgamatedBombFire += ",flamebomb".repeat(3);
				amalgamatedBombFire += ",toxin".repeat(3);
			  };
			  if(enabledMods.includes("mods/randomness.js")) {
				amalgamatedBombFire += ",burning_unnamed_gas".repeat(4);
				amalgamatedBombFire += ",warp".repeat(6);
				amalgamatedBombFire += ",bomb_3".repeat(3);
				amalgamatedBombFire += ",op_hottester_bomb".repeat(3);
				eLists.BOMB.push("unnamed_bomb");
				eLists.BOMB.push("warp_bomb");
			  };
			  if(enabledMods.includes("mods/glenn_gases.js")) {
				amalgamatedBombFire += ",electric_gas".repeat(3);
				amalgamatedBombFire += ",corrosive_gas".repeat(3);
				amalgamatedBombFire += ",iocalfaeus_gas".repeat(3);
				amalgamatedBombFire += ",ignited_gas".repeat(3);
				amalgamatedBombFire += ",finine".repeat(3);
				amalgamatedBombFire += ",acidic_vapour".repeat(3);
				amalgamatedBombFire += ",nitrous_gas".repeat(3);
				amalgamatedBombFire += ",void_gas".repeat(3);
				amalgamatedBombFire += ",black_damp".repeat(3);
			  };
			  if(enabledMods.includes("mods/some_tf_liquids.js")) {
				amalgamatedBombFire += ",blazing_pyrotheum".repeat(5);
				amalgamatedBombFire += ",tectonic_petrotheum".repeat(7);
				amalgamatedBombFire += ",resonant_ender".repeat(5);
			  };
			  if(enabledMods.includes("mods/chem.js")) {
				amalgamatedBombFire += ",FOOF".repeat(8);
			  };
			  if(enabledMods.includes("mods/the_ground.js")) {
				amalgamatedBombFire += ",liquid_irradium".repeat(7);
			  };
			  if(enabledMods.includes("mods/bioooze.js")) {
				amalgamatedBombFire += ",bioooze".repeat(8);
			  };
			});
			
		//Fairies

			runAfterLoad(function() {
				if(typeof(eLists.FAIRY) === "undefined") { eLists.FAIRY = [] };
				eLists.FAIRY.push("acid_fairy");
				eLists.FAIRY.push("oil_fairy");
				eLists.FAIRY.push("honey_fairy");
				fairyChoices = eLists.FAIRY;
				for(i = 0; i < eLists.FAIRY.length; i++) {
					var fairyName = eLists.FAIRY[i];
					if(!fairyChoices.includes(fairyName)) {
						fairyChoices.push(fairyName);
					};
				};
			});

	//Non-generated elements
	
		//Bombs

			elements.anti_bomb = {
				color: "#625c71",
				behavior: [
					"M2|M1 AND EX:10|M2",
					"XX|XX|XX",
					"XX|EX:10|XX",
				],
				category: "weapons",
				state: "solid",
				density: 1300,
				excludeRandom: true,
				cooldown: defaultCooldown,
			};

			elements.firebomb = {
				color: "#ee7e3e",
				tick: function(pixel) {
					if(!isEmpty(pixel.x,pixel.y-1,true)) { //[0][1] EX (ignore bounds)
						var newPixel = pixelMap[pixel.x][pixel.y-1];
						var newElement = newPixel.element;
						var newInfo = elements[newElement];
						if(newInfo.state !== "gas" && newElement !== pixel.element) {
							explodeAtPlus(pixel.x,pixel.y,10,"fire,fire,fire,fire,fire,greek_fire","fire",null,firebombFire);
						};
					};
					if(!isEmpty(pixel.x,pixel.y+1,true)) { //[2][1] EX (don't ignore bounds, non-bound case)
						var newPixel = pixelMap[pixel.x][pixel.y+1];
						var newElement = newPixel.element;
						var newInfo = elements[newElement];
						if(newInfo.state !== "gas" && newElement !== pixel.element) {
							explodeAtPlus(pixel.x,pixel.y,10,"fire,fire,fire,fire,fire,greek_fire","fire",null,firebombFire);
						};
					};
					if(outOfBounds(pixel.x,pixel.y+1)) { //[2][1] EX (don't ignore bounds, bound case)
						explodeAtPlus(pixel.x,pixel.y,10,"fire,fire,fire,fire,fire,greek_fire","fire",null,firebombFire);
					};
					if(!tryMove(pixel,pixel.x,pixel.y+1)) { //behaviors.POWDER
						Math.random() < 0.5 ? tryMove(pixel,pixel.x-1,pixel.y+1) : tryMove(pixel,pixel.x+1,pixel.y+1);
					};
				},
				category: "weapons",
				state: "solid",
				density: 1500,
				excludeRandom: true,
				desc: "An advanced incendiary weapon. <br/>To enable automatic bomb generation, set the generateBombs query parameter.",
			};

			elements.cluster_nuke = {
				color: "#e3f636",
				behavior: [
					"CR:radiation%5|EX:90>plasma,plasma,plasma,nuke,nuke,nuke,radiation,radiation,radiation,rad_steam,rad_steam,radiation,rad_steam AND CR:radiation%5|CR:radiation%5",
					"CR:radiation%5|XX|CR:radiation%5",
					"M2 AND CR:radiation%5|M1 AND EX:90>plasma,plasma,plasma,nuke,nuke,nuke,radiation,radiation,radiation,rad_steam,rad_steam,radiation,rad_steam AND CR:radiation%5|M2 AND CR:radiation%5",
				],
				category: "weapons",
				state: "solid",
				density: 1500,
				excludeRandom: true,
				desc: "It's a nuke that drops more nukes. <br/>To enable automatic bomb generation, set the generateBombs query parameter.",
			};
			
			elements.anti_bomb = {
				color: "#525c61",
				behavior: [
					"M2|M1 AND EX:10|M2",
					"XX|XX|XX",
					"XX|EX:10|XX",
				],
				category: "weapons",
				state: "solid",
				density: 1300,
				excludeRandom: true,
			};

			elements.electric_bomblet = {
				color: "#ffffff",
				behavior: [
					"SH%50|EX:8>electric AND SH%50|SH%50",
					"SH%50|EX:9>electric%0.5|SH%50",
					"M2 AND SH%50|M1 AND SH%50 AND EX:8>electric AND SW:electric|M2 AND SH%50",
				],
				category: "weapons",
				state: "solid",
				density: 1200,
				hidden: true,
				excludeRandom: true,
				hardness: 0.3,
			};

			elements.electric_cluster_bomb = {
				color: "#ffffff",
				behavior: [
					"SH%50|EX:8>electric_bomblet AND SH%50|SH%50",
					"SH%50|XX|SH%50",
					"M2 AND SH%50|M1 AND SH%50 AND EX:8>electric_bomblet AND SW:electric|M2 AND SH%50",
				],
				category: "weapons",
				state: "solid",
				density: 1800,
				hidden: true,
				excludeRandom: true,
				hardness: 0.3,
			};

			elements.radioactive_popper = {
				color: "#d6ce72",
				behavior: [
					"XX|EX:7>radiation|XX",
					"XX|XX|XX",
					"M2|M1 AND EX:7>radiation|M2",
				],
				category: "weapons",
				state: "solid",
				density: 1200,
				hidden: true,
				excludeRandom: true,
				hardness: 0.3,
				cooldown: 3,
			};

			elements.acid_bomb = {
				color: "#7d8a63",
				behavior: [
					"XX|EX:15>acid_gas|XX",
					"XX|XX|XX",
					"M2|M1 AND EX:15>acid_gas|M2",
				],
				category: "weapons",
				state: "solid",
				density: 1400,
				excludeRandom: true,
				cooldown: defaultCooldown,
			};

			elements.amalgamated_bomb = {
				color: ["#FF0000","#FF0000","#FFFF00","#FFFF00","#00FF00","#00FF00","#0000FF","#0000FF"],
				tick: function(pixel) {
					doDefaults(pixel);
					if(!isEmpty(pixel.x,pixel.y-1,true)) { //[0][1] EX (ignore bounds)
						var newPixel = pixelMap[pixel.x][pixel.y-1];
						var newElement = newPixel.element;
						var newInfo = elements[newElement];
						if(newInfo.state !== "gas" && newElement !== pixel.element) {
							explodeAtPlus(pixel.x,pixel.y,70,amalgamatedBombFire,amalgamatedBombFire);
						};
					};
					if(!isEmpty(pixel.x,pixel.y+1,true)) { //[2][1] EX (don't ignore bounds, non-bound case)
						var newPixel = pixelMap[pixel.x][pixel.y+1];
						var newElement = newPixel.element;
						var newInfo = elements[newElement];
						if(newInfo.state !== "gas" && newElement !== pixel.element) {
							explodeAtPlus(pixel.x,pixel.y,70,amalgamatedBombFire,amalgamatedBombFire);
						};
					};
					if(outOfBounds(pixel.x,pixel.y+1)) { //[2][1] EX (don't ignore bounds, bound case)
						explodeAtPlus(pixel.x,pixel.y,70,amalgamatedBombFire,amalgamatedBombFire);
					};
					if(!tryMove(pixel,pixel.x,pixel.y+1)) { //behaviors.POWDER
						Math.random() < 0.5 ? tryMove(pixel,pixel.x-1,pixel.y+1) : tryMove(pixel,pixel.x+1,pixel.y+1);
					};
				},
				category: "weapons",
				state: "solid",
				temp: 7065,
				density: 158000,
				excludeRandom: true,
			};

			elements.op_hottester_bomb = {
				color: "#cc436e",
				properties: {
					radius: 15, //just so people can edit it per pixel to be stupidly high
				},
				tick: function(pixel) {
					doDefaults(pixel);
					if(!isEmpty(pixel.x,pixel.y-1,true)) { //[0][1] EX (ignore bounds)
						var newPixel = pixelMap[pixel.x][pixel.y-1];
						var newElement = newPixel.element;
						var newInfo = elements[newElement];
						if(newInfo.state !== "gas" && newElement !== pixel.element) {
							explodeAtPlus(pixel.x,pixel.y,pixel.radius,"plasma","plasma",hotterBomb,hotterBomb,false);
						};
					};
					if(!isEmpty(pixel.x,pixel.y+1,true)) { //[2][1] EX (don't ignore bounds, non-bound case)
						var newPixel = pixelMap[pixel.x][pixel.y+1];
						var newElement = newPixel.element;
						var newInfo = elements[newElement];
						if(newInfo.state !== "gas" && newElement !== pixel.element) {
							explodeAtPlus(pixel.x,pixel.y,pixel.radius,"plasma","plasma",hotterBomb,hotterBomb,false);
						};
					};
					if(outOfBounds(pixel.x,pixel.y+1)) { //[2][1] EX (don't ignore bounds, bound case)
						explodeAtPlus(pixel.x,pixel.y,pixel.radius,"plasma","plasma",hotterBomb,hotterBomb,false);
					};
					if(!tryMove(pixel,pixel.x,pixel.y+1)) { //behaviors.POWDER
						Math.random() < 0.5 ? tryMove(pixel,pixel.x-1,pixel.y+1) : tryMove(pixel,pixel.x+1,pixel.y+1);
					};
				},
				category: "weapons",
				state: "solid",
				temp: 7065,
				density: 1900,
				excludeRandom: true,
			};

			if(enabledMods.includes("mods/the_ground.js")) { //uses things from that but not worth requiring for the whole mod
				elements.star_bomb = {
					color: "#fffbb5",
					properties: {
						radius: 50, //just so people can edit it per pixel to be stupidly high
					},
					tick: function(pixel) {
						var starFire = "stellar_plasma,stellar_plasma,stellar_plasma,liquid_stellar_plasma,liquid_stellar_plasma,plasma,plasma";
						var starSmoke = "light,light,radiation";
						doDefaults(pixel);
						if(!isEmpty(pixel.x,pixel.y-1,true)) { //[0][1] EX (ignore bounds)
							var newPixel = pixelMap[pixel.x][pixel.y-1];
							newPixel.temp += 10000000; //[0][1] HT:10000000
							var newElement = newPixel.element;
							var newInfo = elements[newElement];
							if(newInfo.state !== "gas" && newElement !== pixel.element) {
								explodeAtPlus(pixel.x,pixel.y,pixel.radius,starFire,starSmoke,starbombHeat,starbombHeat,false);
							};
						};
						if(!isEmpty(pixel.x,pixel.y+1,true)) { //[2][1] EX (don't ignore bounds, non-bound case)
							var newPixel = pixelMap[pixel.x][pixel.y+1];
							newPixel.temp += 10000000;
							var newElement = newPixel.element;
							var newInfo = elements[newElement];
							if(newInfo.state !== "gas" && newElement !== pixel.element) {
								explodeAtPlus(pixel.x,pixel.y,pixel.radius,starFire,starSmoke,starbombHeat,starbombHeat,false);
							};
						};
						if(outOfBounds(pixel.x,pixel.y+1)) { //[2][1] EX (don't ignore bounds, bound case)
							explodeAtPlus(pixel.x,pixel.y,pixel.radius,starFire,starSmoke,starbombHeat,starbombHeat,false);
						};
						if(!tryMove(pixel,pixel.x,pixel.y+1)) { //behaviors.POWDER
							Math.random() < 0.5 ? tryMove(pixel,pixel.x-1,pixel.y+1) : tryMove(pixel,pixel.x+1,pixel.y+1);
						};
					},
					category: "weapons",
					state: "solid",
					density: 3.663e33,
					excludeRandom: true,
					cooldown: defaultCooldown
				};
			};

		//Fairies
	
			elements.acid_fairy = {
				name: "acid fairy",
				color: ["#e2f777","#d1ff94","#d8f7c1"],
				behavior: [
					"XX|M1|M1",
					"XX|FX%5|XX",
					"XX|CR:acid%0.5 AND CR:fairy_dust%0.005 AND M1|M1",
				],
				state: "solid",
				category: "fey",
				desc: "Like the other fairies, but with acid. <br/>To enable automatic fairy generation, set the generateFairies query parameter.",
			}

			elements.oil_fairy = {
				name: "oil fairy",
				color: ["#636360","#a6956f","#a3816d","#cfc191"],
				behavior: [
					"XX|M1|M1",
					"XX|FX%5|XX",
					"XX|CR:oil%0.5 AND CR:fairy_dust%0.005 AND M1|M1",
				],
				state: "solid",
				category: "fey",
				desc: "Like the other fairies, but with oil. <br/>To enable automatic fairy generation, set the generateFairies query parameter.",
			}

			elements.honey_fairy = {
				name: "honey fairy",
				color: ["#ffeaa6","#ffe987","#f2e7c2"],
				behavior: [
					"XX|M1|M1",
					"XX|FX%5|XX",
					"XX|CR:honey%0.5 AND CR:fairy_dust%0.005 AND M1|M1",
				],
				state: "solid",
				category: "fey",
				desc: "Like the other fairies, but with sweet honey. <br/>To enable automatic fairy generation, set the generateFairies query parameter.",
			}

	//Sequential generations

		//Bombs

			for (var i = 2; i <= bombAmount + 1; i++) {
				elements[`bomb_${i}`] = {
					name: `bomb ${i}`,
					color: "#624c41",
					behavior: [
						`XX|EX:${5*(i+1)}>fire|XX`,
						"XX|XX|XX",
						`M2|M1 AND EX:${5*(i+1)}>fire|M2`,
					],
					state: "solid",
					density: 1300 * 8**((i-1)/2),
					excludeRandom:true,
					category: "weapons",
					desc: `${5*(i+1)/10} times the radius of the regular bomb`,
					cooldown: defaultCooldown,
				};
				eLists.BOMB.push(`bomb_${i}`);
			};

			for (var i = 2; i <= bombAmount + 1; i++) {
				elements[`anti_bomb_${i}`] = {
					color: "#625c71",
					behavior: [
						`M2|M1 AND EX:${5*(i+1)}>fire|M2`,
						"XX|XX|XX",
						`XX|EX:${5*(i+1)}>fire|XX`,
					],
					state: "solid",
					density: 1300 * 8**((i-1)/2),
					excludeRandom:true,
					category: "weapons",
					desc: `${5*(i+1)/10} times the radius of the regular anti-bomb`,
					cooldown: defaultCooldown,
				};
				eLists.BOMB.push(`anti_bomb_${i}`);
			};

		//Fairies

			//For statement by charPointer
			if(enabledMods.includes("mods/fey_and_more.js")) {
				for (var i = 2; i <= fairyAmount + 1; i++) {
				  elements[`${i}-fairy`] = {
					name: `${i}-fairy`,
					color: ["#33007a","#8e009f","#09009f"],
					behavior: [
					  "XX|M1|M1",
					  "XX|FX%5|XX",
					  `XX|CR:${i-1}-fairy%1 AND CR:fairy_dust%0.005 AND M1|M1`,
					],
					reactions: {
					  "glitter": { "elem1": `${i+1}-fairy`, "elem2": null }
					},
					state: "solid",
					excludeRandom:true,
					category: "fey",
					hidden: true,
				  }
				  if (i == fairyAmount) { elements[`${i}-fairy`]["reactions"] = {}; }
				  if (i == 2) elements[`${i}-fairy`]["behavior"][2] = `XX|CR:fairy%1 AND CR:fairy_dust%0.005 AND M1|M1`;
				  eLists.FAIRY.push(`${i}-fairy`);
				}
				//post-gen
				if(!elements.rainbow.reactions) { //rainbow promotes fairy
					elements.rainbow.reactions = {};
				};
				elements.rainbow.reactions.fairy = { "elem1": "2-fairy", "elem2": null }
				//remove last fairy's reaction
				delete elements[`${fairyAmount + 1}-fairy`].reactions
			};

	//Main generator functions

		//Bombs

			function generateBomb(bombElements,isAfterScriptLoading=false,bombNumber=1) {//it can be a single element, though
				bombNumber = Math.max(0,bombNumber);
			
				//To specify an array bomb, have the array be inside another array.
				/*For reasons related to how element colors are loaded, if this function is being run from a JS mod file, isAfterScriptLoading should be false.
				Otherwise, you'll get TypeErrors for some reason when trying to place your bomb.  If this is being run after the game has loaded (e.g. in the console),
				then isAfterScriptLoading should be true or you might also get TypeErrors (this latter case was a bit inconsistent when I tested it, but 
				the former case wasn't. **isAfterScriptLoading must be false when this function is run from a JS mod file**.*/
				if(typeof(bombElements) === "string") { //it should be an array, so string check
					//console.log("String detected");
					if(bombElements.includes(",")) { //comma-separated string?
						//console.log("Splitting string to array");
						bombElements = bombElements.split(","); //,SS to array
					} else {
						//console.log("Wrapping string in array");
						bombElements = [bombElements]; //single string to array 
					};
				};
				var returns = [];
				for(aaf = 0; aaf < bombElements.length; aaf++) {
					var elementOfBomb = bombElements[aaf];
					var startColor;
					var randomExcl = 0;
					//console.log(elementOfBomb);

					var bombName;

					if(typeof(elementOfBomb === "string")) { //comma separated string check
						if(elementOfBomb.includes(",")) { //if it is
							elementOfBomb = elementOfBomb.split(","); //to array
							elementOfBomb = elementOfBomb.filter(function(e) { //strip nonexistent elements
								return typeof(elements[e]) === "object";
							});
						};
					};
					if(Array.isArray(elementOfBomb)) {
						bombName = `${elementOfBomb.join("_")}_bomb`; //auto placer element name
						
						//array case color concatenator (bombs are always excludeRandom)
						startColor = [];
						//console.log(elementOfBomb);
						for(ll = 0; ll < elementOfBomb.length; ll++) {
							if(typeof(elements[elementOfBomb[ll]].excludeRandom !== "undefined")) { //if excludeRandom exists (prevent TypeError)
								if(elements[elementOfBomb[ll]].excludeRandom) { //it it's true
									randomExcl = 1; //the whole array bomb is excluded (from spawnRandomBomb)
									//console.log("array nyet" + elementOfBomb);
								};
							};
							startColor = startColor.concat(elements[elementOfBomb[ll]].color);
						};
					} else { //they should all be strings, so here
						bombName = `${elementOfBomb}_bomb`; //auto placer element name
						startColor = elements[elementOfBomb].color;
						if(typeof(elements[elementOfBomb].excludeRandom !== "undefined")) { //if excludeRandom exists (prevent TypeError)
							if(elements[elementOfBomb].excludeRandom) { //it it's true
								//console.log("nyet " + elementOfBomb);
								randomExcl = 1; //the bomb is excluded
							} else {
								//console.log("allow " + elementOfBomb);
								randomExcl = 0;
							};
						};
					};

						//Color gen
					if(Array.isArray(startColor)) { //Average arrays, make colors rgb()
						startColor = averageRgbPrefixedColorArray(startColor);
					} else {
						startColor = rgbHexCatcher(startColor);
					};
					
					startColor = addColors(changeLuminance(changeSaturation(startColor,0.6,"multiply","hsl_json"),0.5,"multiply","rgb"),"rgb(24,0,0)","rgb");
					
					var newColorObject = rgbStringToObject(startColor);
					
						//End color gen
					
													//The bomb
					
					//console.log(elementOfBomb);
					var firstInfo, firstTemp;
					if(Array.isArray(elementOfBomb)) {
						firstInfo = elements[elementOfBomb[0]];
						firstTemp = airTemp;
						if(typeof(firstInfo.temp) !== "undefined") {
							firstTemp = firstInfo.temp;
						};
					} else {
						firstInfo = elements[elementOfBomb];
						firstTemp = airTemp;
						if(typeof(firstInfo.temp) !== "undefined") {
							firstTemp = firstInfo.temp;
						};
					};
					
					elementOfBomb = tryJoin(elementOfBomb,",");
					descElement = tryJoin(elementOfBomb,", ");
					
					//console.log(elementOfBomb);
					
					if(bombNumber !== 1) {
						bombName += `_${bombNumber}`;
					};
					
					if(!elementExists(bombName)) {
						elements[bombName] = {
							color: startColor,
							insulate: true,
							flippableX: true,
							colorObject: newColorObject,
							behavior: [
								["XX",`EX:${5*(bombNumber+1)}>${elementOfBomb}`,"XX"],
								["XX","XX","XX"],
								["M2",`M1 AND EX:${5*(bombNumber+1)}>${elementOfBomb}`,"M2"]
							],
							category: "auto_bombs",
							desc: `Explodes into ${descElement}<br/>Radius: ${5*(bombNumber+1)}`,
							temp: firstTemp,
							excludeRandom: true,
						};
						if(typeof(eLists) === "undefined") {
							eLists = {};
						};
						if(typeof(eLists.BOMB) === "undefined") {
							eLists.BOMB = [];
						};
						eLists.BOMB.push(bombName);
						if(!randomExcl) {
							if(typeof(bombChoices) === "undefined") {
								bombChoices = []
							};
							if(!bombChoices.includes(bombName)) {
								bombChoices.push(bombName);
							};
						}
						if(isAfterScriptLoading) {
							elements[bombName].flippableX = true;
							elementCount++; //increment for new bomb element
							createElementButton(bombName);
							elements[bombName].id = nextid++;
							document.getElementById("extraInfo").innerHTML = "<small><p>There are " + elementCount + " elements, including " + hiddenCount + " hidden ones.</p><p>©2021-" + new Date().getFullYear() + ". All Rights Reserved. <a href='https://r74n.com'>R74n</a></p></small>"; //update extra info counts (and the copyright year, due to the method used)
						};
					};
					returns.push(bombName);
				};
				return returns;
			};

		//Clouds

		//Clouds

			function generateCloud(cloudElements,cloudType=0,isAfterScriptLoading=false) {//it can be a single element, though
				//To specify an array cloud, have the array be inside another array.
				/*For reasons related to how element colors are loaded, if this function is being run from a JS mod file, isAfterScriptLoading should be false.
				Otherwise, you'll get TypeErrors for some reason when trying to place your cloud.  If this is being run after the game has loaded (e.g. in the console),
				then isAfterScriptLoading should be true or you might also get TypeErrors (this latter case was a bit inconsistent when I tested it, but 
				the former case wasn't. **isAfterScriptLoading must be false when this function is run from a JS mod file**.*/
				if(cloudType !== "*") {
					if(typeof(cloudElements) === "string") { //it should be an array, so string check
						//console.log("String detected");
						if(cloudElements.includes(",")) { //comma-separated string?
							//console.log("Splitting string to array");
							cloudElements = cloudElements.split(","); //,SS to array
						} else {
							//console.log("Wrapping string in array");
							cloudElements = [cloudElements]; //single string to array 
						};
					};
					var returns = [];
					for(aaf = 0; aaf < cloudElements.length; aaf++) {
						var elementOfCloud = cloudElements[aaf];
						var startColor;
						var randomExcl = 0;
						//console.log("randomExcl set")
						//console.log(elementOfCloud);

						var cloudName, cloudPrefix, cloudBehavior;

						switch(cloudType) {
							case 0:
								cloudPrefix = "";
								cloudBehavior = behaviorGenerators.cloud(elementOfCloud);
								break;
							case 1:
								cloudPrefix = "heavy_";
								cloudBehavior = behaviorGenerators.heavy_cloud(elementOfCloud);
								break;
							case 2:
								cloudPrefix = "heavier_";
								cloudBehavior = behaviorGenerators.heavier_cloud(elementOfCloud);
								break;
							case 3:
								cloudPrefix = "heaviest_";
								cloudBehavior = behaviorGenerators.heaviest_cloud(elementOfCloud);
								break;
							case 4:
								cloudPrefix = "heaviester_";
								cloudBehavior = behaviorGenerators.heaviester_cloud(elementOfCloud);
								break;
							case 5:
								cloudPrefix = "heaviestest_";
								cloudBehavior = behaviorGenerators.heaviestest_cloud(elementOfCloud);
								break;
							default:
								throw new RangeError("Cloud type must be between 0 and 5");
						};

						if(typeof(elementOfCloud === "string")) { //comma separated string check
							if(elementOfCloud.includes(",")) { //if it is
								elementOfCloud = elementOfCloud.split(","); //to array
								elementOfCloud = elementOfCloud.filter(function(e) { //strip nonexistent elements
									return typeof(elements[e]) === "object";
								});
							};
						};
						if(Array.isArray(elementOfCloud)) {
							cloudName = `${elementOfCloud.join("_")}_cloud`; //auto placer element name
							
							//array case color concatenator and excludeRandom handler
							startColor = [];
							//console.log(elementOfCloud);
							for(ll = 0; ll < elementOfCloud.length; ll++) {
								if(typeof(elements[elementOfCloud[ll]].excludeRandom !== "undefined")) { //if excludeRandom exists (prevent TypeError)
									if(elements[elementOfCloud[ll]].excludeRandom) { //it it's true
										randomExcl = 1; //the whole array cloud is excluded
										//console.log("array nyet" + elementOfCloud);
									};
								};
								//console.log(elementOfCloud[ll]);
								startColor = startColor.concat(elements[elementOfCloud[ll]].color);
							};
						} else { //they should all be strings, so here
							cloudName = `${elementOfCloud}_cloud`; //auto placer element name
							startColor = elements[elementOfCloud].color;
							if(typeof(elements[elementOfCloud].excludeRandom !== "undefined")) { //if excludeRandom exists (prevent TypeError)
								if(elements[elementOfCloud].excludeRandom) { //it it's true
									//console.log("nyet " + elementOfCloud);
									randomExcl = 1; //the cloud is excluded
								} else {
									//console.log("allow " + elementOfCloud);
									randomExcl = 0;
								};
							};
						};
							//Color gen
						if(Array.isArray(startColor)) { //Average arrays, make colors rgb()
							startColor = averageRgbPrefixedColorArray(startColor);
						} else {
							startColor = rgbHexCatcher(startColor);
						};
						
						startColor = changeLuminance(
							changeSaturation(
								startColor,
								(0.4 + (cloudType/10)),
								"multiply",
								"hsl_json"
							),
							(0.6 - (cloudType/10)),
							"multiply",
							"rgb"
						);
						
						var newColorObject = rgbStringToObject(startColor);
						
							//End color gen
						
														//The cloud
						
						//console.log(elementOfCloud);
						var firstInfo, firstTemp;
						if(Array.isArray(elementOfCloud)) {
							firstInfo = elements[elementOfCloud[0]];
							firstTemp = airTemp;
							if(typeof(firstInfo.temp) !== "undefined") {
								firstTemp = firstInfo.temp;
							};
						} else {
							firstInfo = elements[elementOfCloud];
							firstTemp = airTemp;
							if(typeof(firstInfo.temp) !== "undefined") {
								firstTemp = firstInfo.temp;
							};
						};
						
						elementOfCloud = tryJoin(elementOfCloud,",");
						
						//console.log(elementOfCloud);
						
						cloudName = cloudPrefix + cloudName;
						
						if(elementExists(cloudName)) {
							cloudName = "auto_" + cloudName;
						};
						
						elements[cloudName] = {
							color: startColor,
							cloudType: elementOfCloud,
							insulate: true,
							colorObject: newColorObject,
							behavior: cloudBehavior,
							category: "clouds",
							temp: firstTemp,
							state: "gas",
							density: 0.6 * (2**cloudType),
							ignoreAir: true,
							conduct: 0.01 * (2**cloudType),
						};
						
						if(cloudType === 4) { //column tick for heaviester clouds
							elements[cloudName].tick = function(pixel) {
								singleColumn(pixel,elements[pixel.element].cloudType,0.01,0.3);
							};
						};

						if(cloudType === 5) { //three-column tick for heaviestest clouds
							elements[cloudName].tick = function(pixel) {
								multiColumn(pixel,elements[pixel.element].cloudType,0.02,0.4,1);
							};
						};

						eLists.CLOUD.push(cloudName);

						if(!randomExcl) {
							if(typeof(cloudChoices) === "undefined") {
								cloudChoices = []
							};
							if(!cloudChoices.includes(cloudName)) {
								cloudChoices.push(cloudName);
							};
						}
						if(cloudIncludeRandom) {
							randomExcl ? elements[cloudName].excludeRandom = true : elements[cloudName].excludeRandom = false;
						} else {
							elements[cloudName].excludeRandom = true;
						};
						if(isAfterScriptLoading) {
							elementCount++; //increment for new cloud element
							createElementButton(cloudName);
							elements[cloudName].id = nextid++;
							document.getElementById("extraInfo").innerHTML = "<small><p>There are " + elementCount + " elements, including " + hiddenCount + " hidden ones.</p><p>©2021-" + new Date().getFullYear() + ". All Rights Reserved. <a href='https://r74n.com'>R74n</a></p></small>"; //update extra info counts (and the copyright year, due to the method used)
						};
						returns.push(cloudName);
					};
					return returns;
				} else if(cloudType === "*") {
					var trueReturns = [];
					for(cloudTypeForIndex = 0; cloudTypeForIndex <= 5; cloudTypeForIndex++) {
						trueReturns = trueReturns.concat(generateCloud(cloudElements,cloudTypeForIndex,isAfterScriptLoading));
					};
					return trueReturns;
				};
			};

		//Creepers

			function generateCreeper(creeperElements,isAfterScriptLoading=false) {//it can be a single element, though
				//To specify an array creeper, have the array be inside another array.
				/*For reasons related to how element colors are loaded, if this function is being run from a JS mod file, isAfterScriptLoading should be false.
				Otherwise, you'll get TypeErrors for some reason when trying to place your creeper.  If this is being run after the game has loaded (e.g. in the console),
				then isAfterScriptLoading should be true or you might also get TypeErrors (this latter case was a bit inconsistent when I tested it, but 
				the former case wasn't. **isAfterScriptLoading must be false when this function is run from a JS mod file**.
				If isAfterScriptLoading is true, buttons (depending on the hiding setting) will be added to the auto creeper category, the 3 new elements per creeper will be assigned IDs, and the footer will be updated with the increased element counts.*/
				if(typeof(creeperElements) === "string") { //it should be an array, so string check
					//console.log("String detected");
					if(creeperElements.includes(",")) { //comma-separated string?
						//console.log("Splitting string to array");
						creeperElements = creeperElements.split(","); //,SS to array
					} else {
						//console.log("Wrapping string in array");
						creeperElements = [creeperElements]; //single string to array 
					};
				};
				var returns = [];
				for(aaf = 0; aaf < creeperElements.length; aaf++) {
					var elementOfCreeper = creeperElements[aaf];
					var startColor;
					var randomExcl = 0;
					//console.log("randomExcl set")
					//console.log(elementOfCreeper);

					var headName,bodyName,placerName,descElement;

					if(typeof(elementOfCreeper === "string")) { //comma separated string check
						if(elementOfCreeper.includes(",")) { //if it is
							elementOfCreeper = elementOfCreeper.split(","); //to array
							elementOfCreeper = elementOfCreeper.filter(function(e) { //strip nonexistent elements
								return typeof(elements[e]) === "object";
							});
						};
					};
					if(Array.isArray(elementOfCreeper)) {
						headName = `${elementOfCreeper.join("_")}_creeper_head`; //auto head element name
						bodyName = `${elementOfCreeper.join("_")}_creeper_body`; //auto body element name
						placerName = `${elementOfCreeper.join("_")}_creeper`; //auto placer element name
						descElement = elementOfCreeper.join(", "); //auto explosion element list
						
						//array case color concatenator and excludeRandom handler
						startColor = [];
						//console.log(elementOfCreeper);
						for(ll = 0; ll < elementOfCreeper.length; ll++) {
							if(typeof(elements[elementOfCreeper[ll]].excludeRandom !== "undefined")) { //if excludeRandom exists (prevent TypeError)
								if(elements[elementOfCreeper[ll]].excludeRandom) { //it it's true
									randomExcl = 1; //the whole array creeper is excluded
									//console.log("array nyet" + elementOfCreeper);
								};
							};
							//console.log(elementOfCreeper[ll]);
							startColor = startColor.concat(elements[elementOfCreeper[ll]].color);
						};
					} else { //they should all be strings, so here
						headName = `${elementOfCreeper}_creeper_head`; //auto head element name
						bodyName = `${elementOfCreeper}_creeper_body`; //auto body element name
						placerName = `${elementOfCreeper}_creeper`; //auto placer element name
						descElement = elementOfCreeper; //auto explosion element
						startColor = elements[elementOfCreeper].color;
						if(typeof(elements[elementOfCreeper].excludeRandom !== "undefined")) { //if excludeRandom exists (prevent TypeError)
							if(elements[elementOfCreeper].excludeRandom) { //it it's true
								//console.log("nyet " + elementOfCreeper);
								randomExcl = 1; //the creeper is excluded
							} else {
								//console.log("allow " + elementOfCreeper);
								randomExcl = 0;
							};
						};
					};
						//Color gen
					if(Array.isArray(startColor)) { //Average arrays, make colors rgb()
						startColor = averageRgbPrefixedColorArray(startColor);
					} else {
						startColor = rgbHexCatcher(startColor);
					};
					var preColor = rgbStringToHSL(startColor);
					var colorsArray = [preColor, preColor, preColor, preColor, preColor, preColor, preColor, preColor, preColor, preColor]
					var colorObjectArray = [];
					for(q = 0; q < hslOffsets.length; q++) {
						colorsArray[q] = addArraysInPairs(colorsArray[q],hslOffsets[q]);
						colorsArray[q] = hslToHex(...colorsArray[q]);
						colorObjectArray[q] = hexToRGB(colorsArray[q]); //outputs hex
						if(isAfterScriptLoading) { // if it's after the hex -> RGB conversion
							var coq = colorObjectArray[q]; //pull the object
							//console.log(coq.r);
							colorsArray[q] = `rgb(${coq.r},${coq.g},${coq.b})`; //and change to the RGB from its values
						};
					};
					
						//End color gen
					
					//console.log(`${headName}; ${bodyName}; ${placerName}; ${descElement}`)

													//Placer
					elements[placerName] = {
						movable: true,
						creeperType: elementOfCreeper,
						color: colorsArray,
						colorObject: colorObjectArray,
						category: "auto creepers",
						properties: {
							dead: false,
							dir: 1,
							panic: 0,
							following: false,
						},
						tick: function(pixel) {
							autoCreeperPlacerTick(pixel);
						},
						related: [bodyName,headName,"creeper"],
						desc: `Auto-generated creeper.<br/>Explodes into ${descElement}.`,
					};
					
					eLists.CREEPER.push(placerName);
					
													//Body
					elements[bodyName] = {
						movable: true,
						creeperType: elementOfCreeper,
						color: colorsArray,
						colorObject: colorObjectArray,
						category: "auto creepers",
						hidden: true,
						excludeRandom: true,
						density: 1500,
						state: "solid",
						conduct: 25,
						tempHigh: 250,
						stateHigh: "cooked_meat",
						tempLow: -30,
						stateLow: "frozen_meat",
						burn: 10,
						burnTime: 250,
						burnInto: ["cooked_meat","cooked_meat","cooked_meat","cooked_meat","gunpowder"],
						breakInto: ["blood","gunpowder"],
						reactions: {
							"cancer": { "elem1":"cancer", "chance":0.005 },
							"radiation": { "elem1":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
							"plague": { "elem1":"plague", "chance":0.05 },
						},
						properties: {
							dead: false,
							dir: 1,
							panic: 0,
							charged: false,
							didChargeBlueTinted: false,
						},
						tick: function(pixel) {
							autoCreeperBodyTick(pixel);
						},
					};

													//Head
					elements[headName] = {
						movable: true,
						creeperType: elementOfCreeper,
						color: colorsArray,
						colorObject: colorObjectArray,
						category: "auto creepers",
						hidden: true,
						excludeRandom: true,
						density: 1080,
						state: "solid",
						conduct: 25,
						tempHigh: 250,
						stateHigh: "cooked_meat",
						tempLow: -30,
						stateLow: "frozen_meat",
						burn: 10,
						burnTime: 250,
						burnInto: ["cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","gunpowder"],
						breakInto: "blood",
						reactions: {
							"cancer": { "elem1":"cancer", "chance":0.005 },
							"radiation": { "elem1":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
							"plague": { "elem1":"plague", "chance":0.05 },
							"oxygen": { "elem2":"carbon_dioxide", "chance":0.5 },
						},
						properties: {
							dead: false,
							following: false,
							hissing: false,
							charged: false,
							didChargeBlueTinted: false,
						},
						tick: function(pixel) {
							autoCreeperHeadTick(pixel);
						},
					};
					if(isAfterScriptLoading) {
						elementCount += 3; //placer, body, head
						createElementButton(placerName)
						if(settings["unhide"] === 0) { //hide some elements: body and head would be hidden, so only update hidden count
							hiddenCount += 2;
						} else if(settings["unhide"] === 1) { //unhide all elements: b/h would not be hidden, so only create their buttons
							createElementButton(bodyName);
							createElementButton(headName);
						} else if(settings["unhide"] === 2) {
							settings.unlocked[bodyName] ? createElementButton(bodyName) : hiddenCount++; //ternary: if headName is unlocked, create button, else increase hiddenCount
							settings.unlocked[headName] ? createElementButton(headName) : hiddenCount++; //above with headName
						};
						elements[placerName].id = nextid++; //set placer's id to nextid and then increment nextid 
						elements[bodyName].id = nextid++; //repeat with body and head
						elements[headName].id = nextid++;
						headBodyObject[headName] = bodyName;
						document.getElementById("extraInfo").innerHTML = "<small><p>There are " + elementCount + " elements, including " + hiddenCount + " hidden ones.</p><p>©2021-" + new Date().getFullYear() + ". All Rights Reserved. <a href='https://r74n.com'>R74n</a></p></small>"; //update extra info counts (and the copyright year, due to the method used)
					};
					if(creeperIncludeRandom) {
						randomExcl ? elements[placerName].excludeRandom = true : elements[placerName].excludeRandom = false;
					} else {
						elements[placerName].excludeRandom = true;
					};
					if(!randomExcl) {
						//console.log("spawn enabling " + placerName);
						spawnCreepers.push(placerName);
					} else {
						//console.log("nyetted " + placerName);
					};
					returns.push(placerName);
				};
				return returns;
			};

		//Fairies

			function generateFairy(fairyElements,isAfterScriptLoading=false) {//it can be a single element, though
				//To specify an array fairy, have the array be inside another array.
				/*For reasons related to how element colors are loaded, if this function is being run from a JS mod file, isAfterScriptLoading should be false.
				Otherwise, you'll get TypeErrors for some reason when trying to place your fairy.  If this is being run after the game has loaded (e.g. in the console),
				then isAfterScriptLoading should be true or you might also get TypeErrors (this latter case was a bit inconsistent when I tested it, but 
				the former case wasn't. **isAfterScriptLoading must be false when this function is run from a JS mod file**.*/
				if(typeof(fairyElements) === "string") { //it should be an array, so string check
					//console.log("String detected");
					if(fairyElements.includes(",")) { //comma-separated string?
						//console.log("Splitting string to array");
						fairyElements = fairyElements.split(","); //,SS to array
					} else {
						//console.log("Wrapping string in array");
						fairyElements = [fairyElements]; //single string to array 
					};
				};
				var returns = [];
				for(aaf = 0; aaf < fairyElements.length; aaf++) {
					var elementOfFairy = fairyElements[aaf];
					var startColor;
					var randomExcl = 0;
					var isNocheer = 0;
					//console.log("randomExcl set")
					//console.log(elementOfFairy);

					var fairyName;

					if(typeof(elementOfFairy === "string")) { //comma separated string check
						if(elementOfFairy.includes(",")) { //if it is
							elementOfFairy = elementOfFairy.split(","); //to array
							elementOfFairy = elementOfFairy.filter(function(e) { //strip nonexistent elements
								return typeof(elements[e]) === "object";
							});
						};
					};
					if(Array.isArray(elementOfFairy)) {
						fairyName = `${elementOfFairy.join("_")}_fairy`; //auto placer element name
						
						//array case color concatenator and excludeRandom handler
						startColor = [];
						//console.log(elementOfFairy);
						for(ll = 0; ll < elementOfFairy.length; ll++) {
							if(typeof(elements[elementOfFairy[ll]].excludeRandom !== "undefined")) { //if excludeRandom exists (prevent TypeError)
								if(elements[elementOfFairy[ll]].excludeRandom) { //it it's true
									randomExcl = 1; //the whole array fairy is excluded
									//console.log("array nyet" + elementOfFairy);
								};
							};
							//console.log(elementOfFairy[ll]);
							startColor = startColor.concat(elements[elementOfFairy[ll]].color);
						};

						for(ll = 0; ll < elementOfFairy.length; ll++) {
							if(typeof(elements[elementOfFairy[ll]].nocheer !== "undefined")) { //if nocheer exists (prevent TypeError)
								if(elements[elementOfFairy[ll]].nocheer) { //it it's true
									isNocheer = 1; //the whole array fairy is excluded
									//console.log("array nyet" + elementOfFairy);
								};
							};
							//console.log(elementOfFairy[ll]);
							startColor = startColor.concat(elements[elementOfFairy[ll]].color);
						};
					} else { //they should all be strings, so here
						fairyName = `${elementOfFairy}_fairy`; //auto placer element name
						startColor = elements[elementOfFairy].color;
						if(typeof(elements[elementOfFairy].excludeRandom !== "undefined")) { //if excludeRandom exists (prevent TypeError)
							if(elements[elementOfFairy].excludeRandom) { //it it's true
								//console.log("nyet " + elementOfFairy);
								randomExcl = 1; //the fairy is excluded
							} else {
								//console.log("allow " + elementOfFairy);
								randomExcl = 0;
							};
						};

						if(typeof(elements[elementOfFairy].nocheer !== "undefined")) { //if nocheer exists (prevent TypeError)
							if(elements[elementOfFairy].nocheer) { //it it's true
								//console.log("nyet " + elementOfFairy);
								isNocheer = 1; //the fairy is excluded
							} else {
								//console.log("allow " + elementOfFairy);
								isNocheer = 0;
							};
						};
					};
						//Color gen
					if(Array.isArray(startColor)) { //Average arrays, make colors rgb()
						startColor = averageRgbPrefixedColorArray(startColor);
					} else {
						startColor = rgbHexCatcher(startColor);
					};
					
					//console.log(`rgbStringToObject(${startColor}) from more_fairies.js`)
					var newColorObjectArray = [];			
					var newColorArray = [];

					for(i = 0; i < elements.fairy.color.length; i++) {
						var newFairyColorlet = elements.fairy.color[i];
						var newColor = multiplyColors(startColor,newFairyColorlet);
						var newColorJSON = multiplyColors(startColor,newFairyColorlet,"json");
						newColorArray.push(newColor);
						newColorObjectArray.push(newColorJSON);
					};

						//End color gen
					
													//The fairy
					
					//console.log(elementOfFairy);
					var firstInfo, firstTemp;
					if(Array.isArray(elementOfFairy)) {
						firstInfo = elements[elementOfFairy[0]];
						firstTemp = airTemp;
						if(typeof(firstInfo.temp) !== "undefined") {
							firstTemp = firstInfo.temp;
						};
					} else {
						firstInfo = elements[elementOfFairy];
						firstTemp = airTemp;
						if(typeof(firstInfo.temp) !== "undefined") {
							firstTemp = firstInfo.temp;
						};
					};
					
					elementOfFairy = tryJoin(elementOfFairy,",");
					
					//console.log(elementOfFairy);
					
					if(!elementExists(fairyName)) {
						elements[fairyName] = {
							color: newColorArray,
							insulate: true,
							flippableX: true,
							colorObject: newColorObjectArray,
							behavior: [
								["XX","M1","M1"],
								["XX","FX%5","XX"],
								["XX",`CR:${elementOfFairy}%0.5 AND CR:fairy_dust%0.005 AND M1`,"M1"]
							],
							category: "auto_fey",
							temp: firstTemp,
							hardness: 1,
						};
						if(typeof(eLists) === "undefined") {
							eLists = {};
						};
						if(typeof(eLists.FAIRY) === "undefined") {
							eLists.FAIRY = [];
						};
						eLists.FAIRY.push(fairyName);
						if(!randomExcl) {
							if(typeof(fairyChoices) === "undefined") {
								fairyChoices = []
							};
							if(!fairyChoices.includes(fairyName)) {
								fairyChoices.push(fairyName);
							};
						}
						if(isNocheer) {
							elements[fairyName].nocheer = true;
						}
						if(fairyIncludeRandom) {
							randomExcl ? elements[fairyName].excludeRandom = true : elements[fairyName].excludeRandom = false;
						} else {
							elements[fairyName].excludeRandom = true;
						};
						if(isAfterScriptLoading) {
							elements[fairyName].flippableX = true;
							elementCount++; //increment for new fairy element
							if (settings.cheerful && elements[fairyName].nocheer) {
								elements[fairyName].hidden = true;
								hiddenCount++;
							} else {						
								createElementButton(fairyName);
							};
							elements[fairyName].id = nextid++;
							document.getElementById("extraInfo").innerHTML = "<small><p>There are " + elementCount + " elements, including " + hiddenCount + " hidden ones.</p><p>©2021-" + new Date().getFullYear() + ". All Rights Reserved. <a href='https://r74n.com'>R74n</a></p></small>"; //update extra info counts (and the copyright year, due to the method used)
						};
					};
					returns.push(fairyName);
				};
				return returns;
			};

		//Spouts

			function generateSpout(spoutElements,isAfterScriptLoading=false) {//it can be a single element, though
				//To specify an array spout, have the array be inside another array.
				/*For reasons related to how element colors are loaded, if this function is being run from a JS mod file, isAfterScriptLoading should be false.
				Otherwise, you'll get TypeErrors for some reason when trying to place your spout.  If this is being run after the game has loaded (e.g. in the console),
				then isAfterScriptLoading should be true or you might also get TypeErrors (this latter case was a bit inconsistent when I tested it, but 
				the former case wasn't. **isAfterScriptLoading must be false when this function is run from a JS mod file**.*/
				if(typeof(spoutElements) === "string") { //it should be an array, so string check
					//console.log("String detected");
					if(spoutElements.includes(",")) { //comma-separated string?
						//console.log("Splitting string to array");
						spoutElements = spoutElements.split(","); //,SS to array
					} else {
						//console.log("Wrapping string in array");
						spoutElements = [spoutElements]; //single string to array 
					};
				};
				var returns = [];
				for(aaf = 0; aaf < spoutElements.length; aaf++) {
					var elementOfSpout = spoutElements[aaf];
					var startColor;
					var randomExcl = 0;
					var isNocheer = 0;
					//console.log("randomExcl set")
					//console.log(elementOfSpout);

					var spoutName;

					if(typeof(elementOfSpout === "string")) { //comma separated string check
						if(elementOfSpout.includes(",")) { //if it is
							elementOfSpout = elementOfSpout.split(","); //to array
							elementOfSpout = elementOfSpout.filter(function(e) { //strip nonexistent elements
								return typeof(elements[e]) === "object";
							});
						};
					};
					if(Array.isArray(elementOfSpout)) {
						spoutName = `${elementOfSpout.join("_")}_spout`; //auto placer element name
						
						//array case color concatenator and excludeRandom handler
						startColor = [];
						//console.log(elementOfSpout);
						for(ll = 0; ll < elementOfSpout.length; ll++) {
							if(typeof(elements[elementOfSpout[ll]].excludeRandom !== "undefined")) { //if excludeRandom exists (prevent TypeError)
								if(elements[elementOfSpout[ll]].excludeRandom) { //it it's true
									randomExcl = 1; //the whole array spout is excluded
									//console.log("array nyet" + elementOfSpout);
								};
							};
							//console.log(elementOfSpout[ll]);
							startColor = startColor.concat(elements[elementOfSpout[ll]].color);
						};

						for(ll = 0; ll < elementOfSpout.length; ll++) {
							if(typeof(elements[elementOfSpout[ll]].nocheer !== "undefined")) { //if nocheer exists (prevent TypeError)
								if(elements[elementOfSpout[ll]].nocheer) { //it it's true
									isNocheer = 1; //the whole array spout is excluded
									//console.log("array nyet" + elementOfSpout);
								};
							};
							//console.log(elementOfSpout[ll]);
							startColor = startColor.concat(elements[elementOfSpout[ll]].color);
						};
					} else { //they should all be strings, so here
						spoutName = `${elementOfSpout}_spout`; //auto placer element name
						startColor = elements[elementOfSpout].color;
						if(typeof(elements[elementOfSpout].excludeRandom !== "undefined")) { //if excludeRandom exists (prevent TypeError)
							if(elements[elementOfSpout].excludeRandom) { //it it's true
								//console.log("nyet " + elementOfSpout);
								randomExcl = 1; //the spout is excluded
							} else {
								//console.log("allow " + elementOfSpout);
								randomExcl = 0;
							};
						};

						if(typeof(elements[elementOfSpout].nocheer !== "undefined")) { //if nocheer exists (prevent TypeError)
							if(elements[elementOfSpout].nocheer) { //it it's true
								//console.log("nyet " + elementOfSpout);
								isNocheer = 1; //the spout is excluded
							} else {
								//console.log("allow " + elementOfSpout);
								isNocheer = 0;
							};
						};
					};
						//Color gen
					if(Array.isArray(startColor)) { //Average arrays, make colors rgb()
						startColor = averageRgbPrefixedColorArray(startColor);
					} else {
						startColor = rgbHexCatcher(startColor);
					};
					
					var newColorObject = rgbStringToObject(startColor);
					
						//End color gen
					
													//The spout
					
					//console.log(elementOfSpout);
					var firstInfo, firstTemp;
					if(Array.isArray(elementOfSpout)) {
						firstInfo = elements[elementOfSpout[0]];
						firstTemp = airTemp;
						if(typeof(firstInfo.temp) !== "undefined") {
							firstTemp = firstInfo.temp;
						};
					} else {
						firstInfo = elements[elementOfSpout];
						firstTemp = airTemp;
						if(typeof(firstInfo.temp) !== "undefined") {
							firstTemp = firstInfo.temp;
						};
					};
					
					elementOfSpout = tryJoin(elementOfSpout,",");
					
					//console.log(elementOfSpout);
					
					elements[spoutName] = {
						color: startColor,
						insulate: true,
						colorObject: newColorObject,
						behavior: [
							["XX",`CR:${elementOfSpout}`,"XX"],
							[`CR:${elementOfSpout}`,"XX",`CR:${elementOfSpout}`],
							["XX",`CR:${elementOfSpout}`,"XX"]
						],
						category: "spouts",
						temp: firstTemp,
						hardness: 1,
					};
					if(!randomExcl) {
						if(typeof(spoutChoices) === "undefined") {
							spoutChoices = []
						};
						if(!spoutChoices.includes(spoutName)) {
							spoutChoices.push(spoutName);
						};
					}
					if(spoutIncludeRandom) {
						randomExcl ? elements[spoutName].excludeRandom = true : elements[spoutName].excludeRandom = false;
					} else {
						elements[spoutName].excludeRandom = true;
					};
					if(isNocheer) {
						elements[spoutName].nocheer = true;
					}
					if(isAfterScriptLoading) {
						elementCount++; //increment for new spout element
						if (settings.cheerful && elements[spoutName].nocheer) {
							elements[spoutName].hidden = true;
							hiddenCount++;
						} else {						
							createElementButton(spoutName);
						};
						elements[spoutName].id = nextid++;
						document.getElementById("extraInfo").innerHTML = "<small><p>There are " + elementCount + " elements, including " + hiddenCount + " hidden ones.</p><p>©2021-" + new Date().getFullYear() + ". All Rights Reserved. <a href='https://r74n.com'>R74n</a></p></small>"; //update extra info counts (and the copyright year, due to the method used)
					};
					
					eLists.SPOUT.push(spoutName);
					returns.push(spoutName);
				};
				return returns;
			};
	
	//Other runAfterAutogen
	
		//Bombs

			runAfterAutogen(function() {
				if(elementExists("vaporized_rock")) {
					elements.molten_dirt.tempHigh = 3000;
					elements.molten_dirt.stateHigh = "vaporized_rock";
				};
			});

		//Modless orphaned code that I don't want meeting La Maison

			runAfterAutogen(function() {
				var solidBlacklist = ["mistake", "birthpool", "firesea"]; //exclude these since they seem to be liquid
				
				solids = Object.keys(elements).filter(function(e) {
					return elements[e].category === "solids" && !solidBlacklist.includes(e);
				});
				
				for(i = 0; i < solids.length; i++) { //A lot of elements in solids, particularly metals, are missing a "state: solid".
					var solidName = solids[i]
					elements[solidName].state = "solid";
				};
			});

	//Mass generation calls

		//Bombs

			runAfterAutogen(function() {
				if(generateBombs) {
					var tempArray = Object.keys(elements);
					tempArray.push(["rock", "sand"]);
					generateBomb(tempArray,false)
				};
			});

		//Creepers

			runAfterAutogen(function() {
				if(generateCreepers) {
					var tempArray = Object.keys(elements);
					tempArray.push(["rock", "sand"]);
					generateCreeper(tempArray,false)
				};
			});

		//Several

			runAfterAutogen(function() {
				cloudElements = [...Object.keys(elements).filter(function(e) { //same criteria as spouts
					return (commonMovableCriteria(e,excludedCloudElements));
				}),["rock","sand"]];
				fairyElements = [...Object.keys(elements).filter(function(e) { //same criteria as spouts
					return (commonMovableCriteria(e,excludedFairyElements));
				}),["rock","sand"]];
				spoutElements = [...Object.keys(elements).filter(function(e) { //same criteria as spouts
					return (commonMovableCriteria(e,excludedSpoutElements));
				}),["rock","sand"]];
				if(generateFairies) { 
					generateFairy(fairyElements,false);
				};
				if(generateClouds) { 
					generateCloud(cloudElements,"*",false);
				};
				if(generateSpouts) { 
					generateSpout(spoutElements,false);
				};
			});

	//Random spawners

		//Bombs

			elements.spawn_random_bomb = {
				color: ["#141c23","#340f3c","#4b2d3f","#35463f","#244633","#460c1b","#294725","#34290c"],
				behavior: behaviors.WALL,
				category: "special",
				excludeRandom: true,
				tick: function(pixel) {
					if(bombChoices == undefined || bombChoices.length == 0) {
						deletePixel(pixel.x,pixel.y);
						return false;
					};
					changePixel(pixel,bombChoices[Math.floor(Math.random() * bombChoices.length)])
				},
			};

		//Clouds

			elements.spawn_random_cloud = {
				color: ["#3e5f8a","#a334ec","#ea96f9","#a6ecf6","#70ebc8","#d9286b","#7eed91","#a18b30"],
				behavior: behaviors.WALL,
				category: "special",
				excludeRandom: true,
				tick: function(pixel) {
					if(cloudChoices == undefined || cloudChoices.length == 0) {
						deletePixel(pixel.x,pixel.y);
						return false;
					};
					changePixel(pixel,cloudChoices[Math.floor(Math.random() * cloudChoices.length)])
				},
			};

		//Creepers

			elements.spawn_random_creeper = {
				color: colorOfRandomCreeper,
				behavior: behaviors.WALL,
				category: "special",
				excludeRandom: false, //see below
				movable: true,
				tick: function(pixel) {
					if(spawnCreepers == undefined || spawnCreepers.length == 0) {
						deletePixel(pixel.x,pixel.y);
						return false;
					};
					changePixel(pixel,spawnCreepers[Math.floor(Math.random() * spawnCreepers.length)]) //spawnCreepers is already excludeRandom filtered
				},
			};

		//Fairies

			elements.spawn_random_fairy = {
				color: ["#3e5f8a","#a334ec","#ea96f9","#a6ecf6","#70ebc8","#d9286b","#7eed91","#a18b30"],
				behavior: behaviors.WALL,
				category: "special",
				excludeRandom: true,
				tick: function(pixel) {
					if(fairyChoices == undefined || fairyChoices.length == 0) {
						deletePixel(pixel.x,pixel.y);
						return false;
					};
					changePixel(pixel,fairyChoices[Math.floor(Math.random() * fairyChoices.length)])
				},
			};
			
		//Spouts

			elements.spawn_random_spout = {
				color: ["#3e5f8a","#a334ec","#ea96f9","#a6ecf6","#70ebc8","#d9286b","#7eed91","#a18b30"],
				behavior: behaviors.WALL,
				category: "special",
				excludeRandom: true,
				tick: function(pixel) {
					if(spoutChoices == undefined || spoutChoices.length == 0) {
						deletePixel(pixel.x,pixel.y);
						return false;
					};
					changePixel(pixel,spoutChoices[Math.floor(Math.random() * spoutChoices.length)])
				},
			};

	//Other post-generation
	
		//Fairies
	
			//FAIRYKILL
			behaviors.FAIRYKILL_OLD = behaviors.FAIRYKILL;
			behaviors.FAIRYKILL = function(pixel) {
				if (pixel.start === pixelTicks) {return}
				if (pixel.charge && elements[pixel.element].behaviorOn) {
					pixelTick(pixel)
				}
				var ignore = (elements[pixel.element].ignore == "undefined" ? [] : elements[pixel.element].ignore);
				for(i = 0; i < adjacentCoords.length; i++) {
					var coord = adjacentCoords[i];
					var offsetX = coord[0];
					var offsetY = coord[1];
					var newX = pixel.x+offsetX;
					var newY = pixel.y+offsetY;
					if(!isEmpty(newX,newY,true)) {
						var newPixel = pixelMap[newX][newY];
						var newElement = newPixel.element;
						var isIgnored = (newElement === ignore || ignore.includes(newElement))
						if(eLists.FAIRY.includes(newElement) && !isIgnored) {
							deletePixel(newX,newY);
						};
					};
				};
				doDefaults(pixel);
			};
	
			//Add ignores
			var ignoreArray = ["acid", "iron", "silver", "steel", "tungstensteel", "void", "liquid_void", "chute", "vute", "drute", "drolute", "volute", "alkahest", "acid_gas"];
			for(l = 0; l < ignoreArray.length; l++) {
				var name = ignoreArray[l];
				var fairyName = `${ignoreArray[l]}_fairy`;
				if(elementExists(name) && elementExists(fairyName)) {
					var baseInfo = elements[name];
					if(typeof(baseInfo.ignore) === "undefined") {
						baseInfo.ignore = [];
					} else if(typeof(baseInfo.ignore) === "string") {
						baseInfo.ignore = [baseInfo.ignore];
					};
					baseInfo.ignore.push(fairyName);
				};
			};
	
			//Update FAIRYKILL elements
			var fairykillElements = ["iron", "silver", "steel", "tungstensteel"];
			for(q = 0; q < fairykillElements.length; q++) {
				var name = fairykillElements[q];
				if(elementExists(name)) {
					elements[name].behavior = behaviors.FAIRYKILL;
				};
			};
} else {
	if(!enabledMods.includes(runAfterAutogenMod))	{ enabledMods.splice(enabledMods.indexOf(modName),0,runAfterAutogenMod) };
	if(!enabledMods.includes(explodeAtPlusMod))		{ enabledMods.splice(enabledMods.indexOf(modName),0,explodeAtPlusMod) };
	if(!enabledMods.includes(libraryMod))			{ enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod) };
	if(!enabledMods.includes(feyAndMoreMod))		{ enabledMods.splice(enabledMods.indexOf(modName),0,feyAndMoreMod) };
	if(!enabledMods.includes(mobsMod))				{ enabledMods.splice(enabledMods.indexOf(modName),0,mobsMod) };
	alert(`The "${runAfterAutogenMod}", "${libraryMod}", "${explodeAtPlusMod}", "${feyAndMoreMod}", and "${mobsMod}" mods are required; any missing mods in this list have been automatically inserted (reload for this to take effect).`)
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
};
