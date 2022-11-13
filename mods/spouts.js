var modName = "mods/spouts.js";
var runAfterAutogenMod = "mods/runAfterAutogen and onload restructure.js";
var libraryMod = "mods/code_library.js";

if(enabledMods.includes(runAfterAutogenMod) && enabledMods.includes(libraryMod)) {
	if(urlParams.get('spoutIncludeRandom') !== null) { //if the variable exists at all
		spoutIncludeRandom = true
	} else { //if it doesn't (and it returns null)
		spoutIncludeRandom = false
	}

	var excludedSpoutElements = ["ketchup", "liquid_cloner", "fire_cloner"]
	var includedSpouts = ["ketchup_spout", "spout", "udder", "torch", "sun"]
	var backupCategoryWhitelist = ["land","powders","weapons","food","life","corruption","states","fey","Fantastic Creatures","dyes","energy liquids","random liquids","random gases","random rocks"];
	var backupElementWhitelist = ["mercury", "chalcopyrite_ore", "chalcopyrite_dust", "copper_concentrate", "fluxed_copper_concentrate", "unignited_pyrestone", "ignited_pyrestone", "everfire_dust", "extinguished_everfire_dust", "mistake", "polusium_oxide", "vaporized_polusium_oxide", "glowstone_dust", "redstone_dust", "soul_mud", "wet_soul_sand", "nitrogen_snow", "fusion_catalyst", "coal", "coal_coke", "blast_furnace_fuel", "molten_mythril"];
	//forces elements that logically should be spouted, but are refused even though the condition is true, to be spouted
	function defaultSpoutCondition(name) {
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
		if(excludedSpoutElements.includes(name)) {
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
		for(aaf = 0; aaf < spoutElements.length; aaf++) {
			var elementOfSpout = spoutElements[aaf];
			var startColor;
			var randomExcl = 0;
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
			if(isAfterScriptLoading) {
				elementCount++; //increment for new spout element
				createElementButton(spoutName);
				elements[spoutName].id = nextid++;
				document.getElementById("extraInfo").innerHTML = "<small><p>There are " + elementCount + " elements, including " + hiddenCount + " hidden ones.</p><p>©2021-" + new Date().getFullYear() + ". All Rights Reserved. <a href='https://r74n.com'>R74n</a></p></small>"; //update extra info counts (and the copyright year, due to the method used)
			};
		};
	};

	runAfterAutogen(function() {
		liquidArray = Object.keys(elements).filter(function(e) {
			return (defaultSpoutCondition(e));
		});
		liquidArray.push(["rock","sand"]);
		/*for(i = 0; i < liquidArray.length; i++) {
			elements[`${liquidArray[i]}_spout`] = {
				color: elements[liquidArray[i]].color,
				colorObject: elements[liquidArray[i]].colorObject,
				behavior: [
					["XX",`CR:${liquidArray[i]}`,"XX"],
					[`CR:${liquidArray[i]}`,"XX",`CR:${liquidArray[i]}`],
					["XX",`CR:${liquidArray[i]}`,"XX"]
				],
				category: "spouts",
				temp: elements[liquidArray[i]].temp,
				hardness: 1,
			};
			if(spoutIncludeRandom) {
				elements[liquidArray[i]].excludeRandom ? elements[`${liquidArray[i]}_spout`].excludeRandom = true : elements[`${liquidArray[i]}_spout`].excludeRandom = false;
			} else {
				elements[`${liquidArray[i]}_spout`].excludeRandom = true;
			};
		};
		spoutChoices = Object.keys(elements).filter(function(e) {
			return elements[e].category == "spouts" || includedSpouts.includes(elements[e]);
		});
		spoutChoices = spoutChoices.filter(function(e) {
			return !elements[e.slice(0,-6)].excludeRandom;
		});*/
		generateSpout(liquidArray,false);
	});

	elements.random_spout = {
		color: ["#3e5f8a","#a334ec","#ea96f9","#a6ecf6","#70ebc8","#d9286b","#7eed91","#a18b30"],
		behavior: behaviors.WALL,
		category: "special",
		excludeRandom: true,
		tick: function(pixel) {
			changePixel(pixel,spoutChoices[Math.floor(Math.random() * spoutChoices.length)])
		},
	};
} else {
	if(!enabledMods.includes(runAfterAutogenMod))	{ enabledMods.splice(enabledMods.indexOf(modName),0,runAfterAutogenMod) };
	if(!enabledMods.includes(libraryMod))			{ enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod) };
	alert(`The "${runAfterAutogenMod}" and "${libraryMod}" mods are required; any missing mods in this list have been automatically inserted (reload for this to take effect).`)
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
};
