var modName = "mods/clouds.js";
var runAfterAutogenMod = "mods/runAfterAutogen and onload restructure.js";
var libraryMod = "mods/code_library.js";

if(enabledMods.includes(runAfterAutogenMod) && enabledMods.includes(libraryMod)) {
	if(urlParams.get('cloudIncludeRandom') !== null) { //if the variable exists at all
		cloudIncludeRandom = true
	} else { //if it doesn't (and it returns null)
		cloudIncludeRandom = false
	}

	var excludedCloudElements = ["snow", "fire", "hail", "acid"];
	var includedClouds = ["cloud", "rain_cloud", "snow_cloud", "fire_cloud", "hail_cloud", "acid_cloud"];
	var backupCategoryWhitelist = ["land","powders","weapons","food","life","corruption","states","fey","Fantastic Creatures","dyes","energy liquids","random liquids","random gases","random rocks"];
	var backupElementWhitelist = ["mercury", "chalcopyrite_ore", "chalcopyrite_dust", "copper_concentrate", "fluxed_copper_concentrate", "unignited_pyrestone", "ignited_pyrestone", "everfire_dust", "extinguished_everfire_dust", "mistake", "polusium_oxide", "vaporized_polusium_oxide", "glowstone_dust", "redstone_dust", "soul_mud", "wet_soul_sand", "nitrogen_snow", "fusion_catalyst", "coal", "coal_coke", "blast_furnace_fuel", "molten_mythril"];
	//forces elements that logically should be clouded, but are refused even though the condition is true, to be clouded
	function defaultCloudCondition(name) {
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
		if(excludedCloudElements.includes(name)) {
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
	function generateCloud(cloudElements,isAfterScriptLoading=false) {//it can be a single element, though
		//To specify an array cloud, have the array be inside another array.
		/*For reasons related to how element colors are loaded, if this function is being run from a JS mod file, isAfterScriptLoading should be false.
		Otherwise, you'll get TypeErrors for some reason when trying to place your cloud.  If this is being run after the game has loaded (e.g. in the console),
		then isAfterScriptLoading should be true or you might also get TypeErrors (this latter case was a bit inconsistent when I tested it, but 
		the former case wasn't. **isAfterScriptLoading must be false when this function is run from a JS mod file**.*/
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
		for(aaf = 0; aaf < cloudElements.length; aaf++) {
			var elementOfCloud = cloudElements[aaf];
			var startColor;
			var randomExcl = 0;
			//console.log("randomExcl set")
			//console.log(elementOfCloud);

			var cloudName;

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
			
			startColor = changeLuminance(changeSaturation(startColor,0.5,"multiply","hsl_json"),0.5,"multiply","rgb");
			
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
			
			if(!elementExists(cloudName)) {
				elements[cloudName] = {
					color: startColor,
					insulate: true,
					colorObject: newColorObject,
					behavior: [
						["XX","XX","XX"],
						["XX",`CH:${elementOfCloud}%0.05`,"M1%2.5 AND BO"],
						["XX","XX","XX"]
					],
					category: "clouds",
					temp: firstTemp,
					state: "gas",
					density: 0.6,
					ignoreAir: true,
					conduct: 0.01,
				};
			};

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
		};
	};

	runAfterAutogen(function() {
		liquidArray = Object.keys(elements).filter(function(e) {
			return (defaultCloudCondition(e));
		});
		liquidArray.push(["rock","sand"]);
		generateCloud(liquidArray,false);
	});

	elements.random_cloud = {
		color: ["#3e5f8a","#a334ec","#ea96f9","#a6ecf6","#70ebc8","#d9286b","#7eed91","#a18b30"],
		behavior: behaviors.WALL,
		category: "special",
		excludeRandom: true,
		tick: function(pixel) {
			changePixel(pixel,cloudChoices[Math.floor(Math.random() * cloudChoices.length)])
		},
	};
} else {
	if(!enabledMods.includes(runAfterAutogenMod))	{ enabledMods.splice(enabledMods.indexOf(modName),0,runAfterAutogenMod) };
	if(!enabledMods.includes(libraryMod))			{ enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod) };
	alert(`The "${runAfterAutogenMod}" and "${libraryMod}" mods are required; any missing mods in this list have been automatically inserted (reload for this to take effect).`)
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
};
