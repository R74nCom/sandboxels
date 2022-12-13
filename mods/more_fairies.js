var modName = "mods/more_fairies.js";
var runAfterAutogenMod = "mods/runAfterAutogen and onload restructure.js";
var libraryMod = "mods/code_library.js";
var feyAndMoreMod = "mods/fey_and_more.js";

if(enabledMods.includes(runAfterAutogenMod) && enabledMods.includes(libraryMod) && enabledMods.includes(feyAndMoreMod)) {
	//keep old fairies
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

	var excludedFairyElements = []
	var backupCategoryWhitelist = ["land","powders","weapons","food","life","corruption","states","fey","Fantastic Creatures","dyes","energy liquids","random liquids","random gases","random rocks"];
	var backupElementWhitelist = ["mercury", "chalcopyrite_ore", "chalcopyrite_dust", "copper_concentrate", "fluxed_copper_concentrate", "unignited_pyrestone", "ignited_pyrestone", "everfire_dust", "extinguished_everfire_dust", "mistake", "polusium_oxide", "vaporized_polusium_oxide", "glowstone_dust", "redstone_dust", "soul_mud", "wet_soul_sand", "nitrogen_snow", "fusion_catalyst", "coal", "coal_coke", "blast_furnace_fuel", "molten_mythril"];
	//forces elements that logically should be fairied, but are refused even though the condition is true, to be fairied
	function defaultFairyCondition(name) {
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
		if(excludedFairyElements.includes(name)) {
			return false
		};
		var include = false;
		if(["liquid","gas"].includes(state)) {
			include = true;
		};
		if(info.movable) {
			include = true;
		};
		if(backupCategoryWhitelist.includes(category)) {
			include = true;
		};
		if(backupElementWhitelist.includes(name)) {
			include = true;
		};
		if(category.includes("mudstone")) {
			include = true;
		};
		//console.log(include);
		return include;
	};
	
	if(urlParams.get('fairyIncludeRandom') !== null) { //if the variable exists at all
		fairyIncludeRandom = true
	} else { //if it doesn't (and it returns null)
		fairyIncludeRandom = false
	}

	//Generate creepers
	if(urlParams.get('generateFairies') !== null) { //if the variable exists at all
		generateFairies = true
	} else { //if it doesn't (and it returns null)
		generateFairies = false
	}

	//Generator function

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

	//Standalone generator
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
		for(aaf = 0; aaf < fairyElements.length; aaf++) {
			var elementOfFairy = fairyElements[aaf];
			var startColor;
			var randomExcl = 0;
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
				if(fairyIncludeRandom) {
					randomExcl ? elements[fairyName].excludeRandom = true : elements[fairyName].excludeRandom = false;
				} else {
					elements[fairyName].excludeRandom = true;
				};
				if(isAfterScriptLoading) {
					elements[fairyName].flippableX = true;
					elementCount++; //increment for new fairy element
					createElementButton(fairyName);
					elements[fairyName].id = nextid++;
					document.getElementById("extraInfo").innerHTML = "<small><p>There are " + elementCount + " elements, including " + hiddenCount + " hidden ones.</p><p>©2021-" + new Date().getFullYear() + ". All Rights Reserved. <a href='https://r74n.com'>R74n</a></p></small>"; //update extra info counts (and the copyright year, due to the method used)
				};
			};
		};
	};

	runAfterAutogen(function() {
		if(generateFairies) {
			fairyArray = Object.keys(elements).filter(function(e) { //same criteria as spouts
				return (defaultFairyCondition(e));
			});
			fairyArray.push(["rock","sand"]);
			generateFairy(fairyArray,false);
		};
	});

	elements.spawn_random_fairy = {
		color: ["#3e5f8a","#a334ec","#ea96f9","#a6ecf6","#70ebc8","#d9286b","#7eed91","#a18b30"],
		behavior: behaviors.WALL,
		category: "special",
		excludeRandom: true,
		tick: function(pixel) {
			changePixel(pixel,fairyChoices[Math.floor(Math.random() * fairyChoices.length)])
		},
	};

	//Post-generation tasks
		//Manual eLists.FAIRY updates
	runAfterLoad(function() {
		eLists.FAIRY.push("acid_fairy");
		eLists.FAIRY.push("oil_fairy");
		eLists.FAIRY.push("honey_fairy");
	});

		//Revamp fairykill
	behaviors.FAIRYKILL_OLD = behaviors.FAIRYKILL;
	behaviors.FAIRYKILL = function(pixel) {
		if (pixel.start === pixelTicks) {return}
		if (pixel.charge && elements[pixel.element].behaviorOn) {
			pixelTick(pixel)
		}
		var ignore = [];
		if(typeof(elements[pixel.element].ignore) !== "undefined") {
			ignore = elements[pixel.element].ignore;
		};
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
	
		//Add updated fairykills
	var fairykillElements = ["iron", "silver", "steel", "tungstensteel"];
	for(q = 0; q < fairykillElements.length; q++) {
		var name = fairykillElements[q];
		if(elementExists(name)) {
			elements[name].behavior = behaviors.FAIRYKILL;
		};
	};
} else {
	if(!enabledMods.includes(runAfterAutogenMod))	{ enabledMods.splice(enabledMods.indexOf(modName),0,runAfterAutogenMod) };
	if(!enabledMods.includes(libraryMod))			{ enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod) };
	if(!enabledMods.includes(feyAndMoreMod))		{ enabledMods.splice(enabledMods.indexOf(modName),0,feyAndMoreMod) };
	alert(`The "${runAfterAutogenMod}", "${libraryMod}", and "${feyAndMoreMod}" mods are required; any missing mods in this list have been automatically inserted (reload for this to take effect).`)
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
};
