elements.vomit = {
	color: ["#d9cb89", "#dbe6a1", "#e3da94", "#f5e6a4", "#f2f0e9", "#ded276", "#f0d58d"],
	behavior: [
		"XX|DB%3.5|XX",
		"DB%3.5 AND M2|XX|DB%3.5 AND M2",
		"DB%3.5 AND M1|DB%7 AND M1|DB%3.5 AND M1",
	],
	ignore: ["glass","glass_shard","baked_clay","acid_gas","neutral_acid","acid","water","steam","ice","snow","wall","brick","plastic","dirt","sand","mud","rock","wet_sand","gravel","vomit","vomit_snow","frozen_vomit"],
	reactions: {
		"ash": { "elem1":"neutral_acid", "elem2":null },
		"limestone": { "elem1":"neutral_acid", "elem2":null },
		"quicklime": { "elem1":"neutral_acid", "elem2":null },
		"slaked_lime": { "elem1":"neutral_acid", "elem2":null },
		"borax": { "elem1":"neutral_acid", "elem2":null },
		"ammonia": { "elem1":"neutral_acid", "elem2":null },
		"iron": { "elem1":["vomit","vomit","vomit",null], "elem2":"rust" },
		"copper": { "elem1":["vomit","vomit","vomit",null], "elem2":"oxidized_copper" },
	},
	category: "vomit",
	tempHigh: 100,
	stateHigh: ["acid_gas","steam","plague"],
	tempLow: 0, //https://www.sciencedirect.com/science/article/pii/S0021925818757876/pdf?md5=dcf060653cff604b4e7297265d71594f&pid=1-s2.0-S0021925818757876-main.pdf
	stateLow: "frozen_vomit",
	state: "liquid",
	density: 1049,
},

elements.acid_gas.ignore.push("water")
elements.acid_gas.ignore.push("steam")
elements.acid_gas.ignore.push("ice")
elements.acid_gas.ignore.push("snow")
elements.acid_gas.ignore.push("vomit")
elements.acid_gas.ignore.push("vomit_snow")
elements.acid_gas.ignore.push("frozen_vomit")

elements.acid.ignore.push("water")
elements.acid.ignore.push("steam")
elements.acid.ignore.push("ice")
elements.acid.ignore.push("snow")
elements.acid.ignore.push("vomit")
elements.acid.ignore.push("vomit_snow")
elements.acid.ignore.push("frozen_vomit")

elements.frozen_vomit = {
	color: ["#e9dba9", "#ebf6c1", "#f3eab4", "#fff6c4", "#fffff9", "#eee296", "#ffe5ad"],
	behavior: [
		"XX|DB%2|XX",
		"DB%2|XX|DB%2",
		"DB%2|DB%4|DB%2",
	],
	ignore: ["glass","glass_shard","baked_clay","acid_gas","neutral_acid","acid","water","steam","ice","snow","wall","brick","plastic","dirt","sand","mud","rock","wet_sand","gravel","vomit","vomit_snow","frozen_vomit"],
	reactions: {
		"ash": { "elem1":"neutral_acid", "elem2":null },
		"limestone": { "elem1":"neutral_acid", "elem2":null },
		"quicklime": { "elem1":"neutral_acid", "elem2":null },
		"slaked_lime": { "elem1":"neutral_acid", "elem2":null },
		"borax": { "elem1":"neutral_acid", "elem2":null },
		"ammonia": { "elem1":"neutral_acid", "elem2":null },
		"iron": { "elem1":["vomit","vomit","vomit",null], "elem2":"rust" },
		"copper": { "elem1":["vomit","vomit","vomit",null], "elem2":"oxidized_copper" },
	},
	category: "vomit",
	tempHigh: 0,
	stateHigh: "vomit",
	state: "solids",
	hidden: true,
	density: 1049,
	breakInto: "vomit_snow",
},

elements.vomit_snow = {
	color: ["#e9dba9", "#ebf6c1", "#f3eab4", "#fff6c4", "#fffff9", "#eee296", "#ffe5ad"],
	behavior: [
		"XX|DB%3|XX",
		"DB%3|XX|DB%3",
		"DB%3 AND M2|DB%6 AND M1|DB%3 AND M2",
	],
	ignore: ["glass","glass_shard","baked_clay","acid_gas","neutral_acid","acid","water","steam","ice","snow","wall","brick","plastic","dirt","sand","mud","rock","wet_sand","gravel","vomit","vomit_snow","frozen_vomit"],
	reactions: {
		"ash": { "elem1":"neutral_acid", "elem2":null },
		"limestone": { "elem1":"neutral_acid", "elem2":null },
		"quicklime": { "elem1":"neutral_acid", "elem2":null },
		"slaked_lime": { "elem1":"neutral_acid", "elem2":null },
		"borax": { "elem1":"neutral_acid", "elem2":null },
		"ammonia": { "elem1":"neutral_acid", "elem2":null },
		"iron": { "elem1":["vomit","vomit","vomit",null], "elem2":"rust" },
		"copper": { "elem1":["vomit","vomit","vomit",null], "elem2":"oxidized_copper" },
	},
	category: "liquids",
	tempHigh: 100,
	stateHigh: ["acid_gas","steam"],
	state: "solid",
	hidden: true,
	density: 1049,
}

runAfterLoad(function() {
	if(enabledMods.includes("mods/funny_liquid.js")) { //Vomit should kill cum, but I'm protecting cum for the "funny".
		elements.vomit.ignore.push("cum");
		elements.vomit.ignore.push("cum_water");
		elements.vomit.ignore.push("cum_ice");
		elements.vomit.ignore.push("precum");
		elements.vomit.ignore.push("precum_ice");
		elements.vomit.ignore.push("cum_water_ice");
		elements.vomit.ignore.push("dead_cum");
		elements.vomit.ignore.push("dead_cum_water");
		elements.vomit.ignore.push("dead_cum_ice");
		elements.vomit.ignore.push("dead_cum_water_ice");
		elements.vomit.ignore.push("cummy_mud");
		elements.vomit.ignore.push("dead_cummy_mud");
		elements.vomit.ignore.push("cummy_sand");
		elements.vomit.ignore.push("dead_cummy_sand");
		elements.vomit.ignore.push("cummy_permafrost");
		elements.vomit.ignore.push("dead_cummy_permafrost");
		elements.vomit.ignore.push("cummy_snake");
		elements.vomit.ignore.push("cum_slime");
		elements.vomit.ignore.push("burnt_cum");
		elements.vomit.ignore.push("cum_fairy");
		elements.vomit.ignore.push("cum_bomb");
		elements.vomit.ignore.push("cum_reviver");
		elements.vomit.ignore.push("cum_snow");
		elements.vomit.ignore.push("dead_cum_snow");
		elements.vomit.ignore.push("precum_snow");
	}

	if(enabledMods.includes("mods/funny_liquid_2.js")) {
			eLists.IMPURITY.push("piss");
			eLists.IMPURITY.push("piss_water");
			eLists.IMPURITY.push("piss_ice");
			eLists.IMPURITY.push("piss_water_ice");
			eLists.IMPURITY.push("pissed_mud");
			eLists.IMPURITY.push("pissed_sand");
			eLists.IMPURITY.push("pissed_permafrost");
			eLists.IMPURITY.push("piss_fairy");
			eLists.IMPURITY.push("piss_bomb");
	}

	if(enabledMods.includes("mods/funny_solid.js")) {
		elements.vomit.ignore.push("shit");
		elements.vomit.ignore.push("dried_shit");
		elements.vomit.ignore.push("diarrhea");
		elements.vomit.ignore.push("frozen_shit");
		elements.vomit.ignore.push("frozen_diarrhea");
	}

	foodArray = []
	
	foodArray = Object.keys(elements).filter(function(e) {
	    return elements[e].category == "food";
	});

	manualFoodArray = ["honey","caramel","molasses","ketchup","chocolate_syrup"]

	/*if(enabledMods.includes("mods/ketchup_mod.js")) {
		//TODO: ketchup mod integration
	}*/

	if(foodArray && manualFoodArray) {
		for(i = 0; i < manualFoodArray.length; i++) {
			foodArray.push(manualFoodArray[i])
		}
	}
	
	if(foodArray) {
		for(i = 0; i < foodArray.length; i++) {
			elements.vomit.reactions[foodArray[i]] = { elem1: ["vomit","vomit","vomit","vomit","vomit",null,null], elem2: [foodArray[i],null], chance: 0.6 }
		}
	}
});
