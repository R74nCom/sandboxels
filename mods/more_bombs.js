var modName = "mods/more_bombs.js";
var runAfterAutogenMod = "mods/runAfterAutogen and onload restructure.js";
var libraryMod = "mods/code_library.js";

if(enabledMods.includes(runAfterAutogenMod) && enabledMods.includes(libraryMod)) {
	eLists.BOMB = ["bomb", "tnt", "c4", "grenade", "dynamite", "gunpowder", "firework", "nuke", "h_bomb", "dirty_bomb", "emp_bomb", "sticky_bomb", "cold_bomb", "hot_bomb", "electro_bomb", "water_bomb", "antimatter_bomb", "flashbang", "smoke_grenade", "fireball", "landmine", "cluster_bomb", "cluster_nuke", "op_hottester_bomb", "anti-bomb", "electric_bomblet", "electric_cluster_bomb", "radioactive_popper", "acid_bomb", "amalgamated_bomb"];
	var excludedBombElements = ["water", "antimatter", "acid"];

	//Generate bombs
	if(urlParams.get('generateBombs') !== null) { //if the variable exists at all
		generateBombs = true
	} else { //if it doesn't (and it returns null)
		generateBombs = false
	}

	function tryJoin(stringOrArray,joiner) {
		//console.log(`tryJoin: ${stringOrArray}`);
		if(typeof(stringOrArray) === "string") {
			//console.log("tryJoin: String");
			return stringOrArray;
		} else if(Array.isArray(stringOrArray)) {
			//console.log("tryJoin: Array");
			return stringOrArray.join(joiner);
		} else {
			throw new TypeError(`Unexpected type: ${typeof(stringOrArray)}`);
		};
	};

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

	function hotterBomb(pixel,x,y,radius,fire,smoke,power,damage) {
		//console.log(`Radius: ${radius}\nPower: ${power}\nPixel: (${pixel.x},${pixel.y})\nDamage: ${damage}`);
		//console.log(`Expected temperature increase for pixel at (${pixel.x},${pixel.y}): ${800 * ((1 + (7 * damage)) ** 2) * ((power ** 2) * 1.5)}`);
		pixel.temp += (800 * ((1 + (7 * damage)) ** 2) * ((power ** 2) * 1.5));
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

	amalgamatedBombFire = "plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,smoke,plasma,plasma,fire,smoke,fire,smoke,plasma,metal_scrap,metal_scrap,metal_scrap,metal_scrap,metal_scrap,acid,acid,oil,oil,oil,oil,oil,oil,oil,plasma,plasma,plasma,plasma,plasma,smoke,plasma,plasma,fire,smoke,plasma,metal_scrap,metal_scrap,metal_scrap,metal_scrap,metal_scrap,metal_scrap,flash,flash,flash,flash,flash,acid_gas,acid_gas,acid_gas,acid,oil,oil,oil,oil,oil,oil,oil,oil,oil,oil,plasma,plasma,plasma,plasma,metal_scrap,metal_scrap,metal_scrap,metal_scrap,metal_scrap,acid,acid,oil,oil,oil,oil,oil,oil,oil,plasma,plasma,plasma,plasma,plasma,smoke,plasma,plasma,fire,smoke,plasma,metal_scrap,metal_scrap,metal_scrap,metal_scrap,metal_scrap,metal_scrap,electric_cluster_bomb,electric_cluster_bomb,flash,flash,flash,flash,flash,acid_gas,acid_gas,acid_gas,acid,oil,oil,oil,oil,oil,oil,oil,oil,oil,oil,plasma,plasma,plasma,plasma,plague,plague,plague,plague,plague,plague,radiation,radiation,radiation,radiation,radiation,radiation,radiation,radiation,uranium,uranium,uranium,uranium,uranium,uranium,greek_fire,greek_fire,greek_fire,greek_fire,greek_fire,antimatter,antimatter,antimatter,antimatter,antimatter,smoke_grenade,antimatter,smoke_grenade,fireball,flash,acid_gas,acid_gas,acid_gas,plague,plague,plague,plague,plague,plague,radiation,radiation,radiation,radiation,radiation,radiation,radiation,radiation,uranium,uranium,uranium,uranium,uranium,uranium,greek_fire,greek_fire,greek_fire,greek_fire,greek_fire,antimatter,antimatter,antimatter,antimatter,antimatter,smoke_grenade,antimatter,flash,acid_gas,acid_gas,acid_gas,radiation,radiation,radiation,radiation,plague,acid_gas,acid_gas,acid_gas,chlorine,chlorine,chlorine"

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

	//genfunc
	function generateBomb(bombElements,isAfterScriptLoading=false) {//it can be a single element, though
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
		for(aaf = 0; aaf < bombElements.length; aaf++) {
			var elementOfBomb = bombElements[aaf];
			var startColor;
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
					startColor = startColor.concat(elements[elementOfBomb[ll]].color);
				};
			} else { //they should all be strings, so here
				bombName = `${elementOfBomb}_bomb`; //auto placer element name
				startColor = elements[elementOfBomb].color;
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
			
			//console.log(elementOfBomb);
			
			if(!elementExists(bombName)) {
				elements[bombName] = {
					color: startColor,
					insulate: true,
					flippableX: true,
					colorObject: newColorObject,
					behavior: [
						["XX",`EX:10>${elementOfBomb}`,"XX"],
						["XX","XX","XX"],
						["M2",`M1 AND EX:10>${elementOfBomb}`,"M2"]
					],
					category: "auto_bombs",
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
				if(typeof(bombChoices) === "undefined") {
					bombChoices = []
				};
				if(!bombChoices.includes(bombName)) {
					bombChoices.push(bombName);
				};
				if(isAfterScriptLoading) {
					elements[bombName].flippableX = true;
					elementCount++; //increment for new bomb element
					createElementButton(bombName);
					elements[bombName].id = nextid++;
					document.getElementById("extraInfo").innerHTML = "<small><p>There are " + elementCount + " elements, including " + hiddenCount + " hidden ones.</p><p>©2021-" + new Date().getFullYear() + ". All Rights Reserved. <a href='https://r74n.com'>R74n</a></p></small>"; //update extra info counts (and the copyright year, due to the method used)
				};
			};
		};
	};
	
	runAfterAutogen(function() {
		if(elementExists("vaporized_rock")) {
			elements.molten_dirt.tempHigh = 3000;
			elements.molten_dirt.stateHigh = "vaporized_rock";
		};
		if(generateBombs) {
			var tempArray = Object.keys(elements);
			tempArray.push(["rock", "sand"]);
			generateBomb(tempArray,false)
		};
	});
	
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
} else {
	if(!enabledMods.includes(runAfterAutogenMod))	{ enabledMods.splice(enabledMods.indexOf(modName),0,runAfterAutogenMod) };
	if(!enabledMods.includes(libraryMod))			{ enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod) };
	alert(`The "${runAfterAutogenMod}" and "${libraryMod}" mods are all required; any missing mods in this list have been automatically inserted (reload for this to take effect).`)
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
};
