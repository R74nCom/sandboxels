var modName = "mods/spouts.js";
var runAfterAutogenMod = "mods/runAfterAutogen and onload restructure.js";

if(enabledMods.includes(runAfterAutogenMod)) {
	urlParams = new URLSearchParams(window.location.search);

	if(urlParams.get('spoutIncludeRandom') !== null) { //if the variable exists at all
		spoutIncludeRandom = true
	} else { //if it doesn't (and it returns null)
		spoutIncludeRandom = false
	}

	function makeSpout(name) { //no ex post facto generation support or array spouts for this one
		if(typeof(elements[name]) !== "object") {
			throw new Error(`Nonexistent element ${name}`);
		};
	
		elements[`${name}_spout`] = {
			color: elements[name].color,
			colorObject: elements[name].colorObject,
			behavior: [
				["XX",`CR:${name}`,"XX"],
				[`CR:${name}`,"XX",`CR:${name}`],
				["XX",`CR:${name}`,"XX"]
			],
			category: "spouts",
			temp: elements[name].temp,
			hardness: 1,
		};
		if(spoutIncludeRandom) {
			elements[name].excludeRandom ? elements[`${name}_spout`].excludeRandom = true : elements[`${name}_spout`].excludeRandom = false;
		} else {
			elements[`${name}_spout`].excludeRandom = true;
		};
	};
	
	logString2 = "";
	
	var backupCategoryWhitelist = ["land","powders","weapons","food","life","corruption","states","fey","Fantastic Creatures","dyes","energy liquids","random liquids","random gases","random rocks"];
	var backupElementWhitelist = ["mercury", "chalcopyrite_ore", "chalcopyrite_dust", "copper_concentrate", "fluxed_copper_concentrate", "unignited_pyrestone", "ignited_pyrestone", "everfire_dust", "extinguished_everfire_dust", "mistake", "polusium_oxide", "vaporized_polusium_oxide", "glowstone_dust", "redstone_dust", "soul_mud", "wet_soul_sand", "nitrogen_snow", "fusion_catalyst", "coal", "coal_coke", "blast_furnace_fuel", "molten_mythril"];
	//forces elements that logically should be spouted, but are refused even though the condition is true, to be spouted
	function spoutCondition(name) {
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
		if(spoutBlacklist.includes(name)) {
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
	
	function generateSpouts() {
		/*liquidArray = Object.keys(elements).filter(function(e) {
			return (elements[e].state == "liquid" || elements[e].state == "gas" || elements[e].movable) && !spoutBlacklist.includes(e);
		});*/
		var liquidArray = [];
		
		for (key in elements) {
			if(spoutCondition(key)) {
				liquidArray.push(key);
				logString2 += `Added element ${key} to spoutee list\n`
			} else {
				logString2 += `    Did not add element ${key} to spoutee list\n`
			};
		};
		for(i = 0; i < liquidArray.length; i++) {
			makeSpout(liquidArray[i]);
		};
		spoutChoices = Object.keys(elements).filter(function(e) {
			return elements[e].category == "spouts" || includedSpouts.includes(elements[e]);
		});
		spoutChoices = spoutChoices.filter(function(e) {
			return !elements[e.slice(0,-6)].excludeRandom;
		});
	};

	function _randomInt(max) {
		if(max >= 0) {
			return Math.floor(Math.random() * (max + 1))
		} else {
			return 0 - Math.floor(Math.random() * (Math.abs(max) + 1))
		}
	}

	spoutBlacklist = ["ketchup", "liquid_cloner", "fire_cloner"]
	includedSpouts = ["ketchup_spout", "spout", "udder", "torch", "sun"]

	runAfterLoad(function() { //make sure it's the last function in the list
	  runAfterAutogenList[runAfterAutogenList.length] = function() {
		for (key in elements) { //include a separate movable setter because I'm not willing to run this after final checks
			// If the element's behavior is an array and contains M1 or M2, set its movable to true
			if (elements[key].behavior && typeof elements[key].behavior[0] === "object") {
				var bstring = JSON.stringify(elements[key].behavior);
				if (bstring.indexOf("M1")!==-1 || bstring.indexOf("M2")!==-1) { elements[key].movable = true; }
			}
			if (elements[key].tick) { elements[key].movable = true; }
		}
		//Spout autogen function
		generateSpouts();
	  };
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
	alert(`The ${runAfterAutogenMod} mod is required and has been automatically inserted (reload for this to take effect).`)
	enabledMods.splice(enabledMods.indexOf(modName),0,runAfterAutogenMod)
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
};
