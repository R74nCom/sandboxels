elements.shit = {
	color: ["#57391b","#47290b","#6e5737","#754e2e","#825324","#5b611e"],
	behavior: [
		"XX|CR:plague%0.1 AND CR:fly%0.01 AND CR:methane%0.0316|XX",
		"ST%65 AND SP|CH:dried_shit%0.02|ST%65 AND SP",
		"M2%50|M1 AND SW:water%50|M2%50",
	],
	reactions: {
		"fly": { "elem1":"fly", "elem2":[null,null,null,null,null,null,"fly"], "chance":0.02, },
	},
	tempHigh: 100,
	stateHigh: ["steam","steam","steam","dried_shit"],
	tempLow: 0,
	stateLow: "frozen_shit",
	category: "shit",
	state: "solid",
	density: 1060,
	stain: 0.34,
},

elements.dried_shit = {
	color: ["#b58738","#8c7245","#ad915f","#b5a174","#705e34","#bdad88"],
	behavior: [
		"XX|CR:plague%0.005 AND CR:fly%0.0005|XX",
		"XX|XX|XX",
		"M2|M1|M2",
	],
	reactions: {
		"fly": { "elem1":"fly", "elem2":[null,null,null,null,null,null,null,"fly"], "chance":0.004, },
	},
	category: "shit",
	state: "solid",
	density: 265,
	burn: 120,
	burnTime: 300,
	burnInto: ["ash",null,null],
	tempHigh: 300, //bs
	stateHigh: ["ash",null,null],
},

elements.diarrhea = {
	color: ["#5c481c","#544513","#754d1c","#8a7829","#ad7315","#755c30"],
	behavior: [
		"XX|CR:plague%0.2 AND CR:fly%0.02|XX",
		"M2%50 AND ST%60|CH:shit%0.0065|M2%50 AND ST%60",
		"M1%65 AND M2|M1|M1%65 AND M2",
	],
	reactions: {
		"fly": { "elem1":"fly", "elem2":[null,null,null,null,null,null,"fly"], "chance":0.02, },
	},
	tempLow: -50,
	stateLow: "frozen_diarrhea",
	tempHigh: 100,
	stateHigh: ["steam","steam","steam","steam","dried_shit"],
	category: "shit",
	state: "liquid",
	density: 1030, //bs
	viscosity: 3,
	stain: 0.51,
},

elements.frozen_shit = {
	color: ["#87695b","#77594b","#9e8777","#a57e6e","#b28364","#8b915e"],
	behavior: behaviors.WALL,
	tempHigh: 0,
	stateHigh: "shit",
	category: "shit",
	state: "solid",
	density: 972,
	hidden: true,
},

elements.frozen_diarrhea = {
	color: ["#4c886c","#948563","#b58d6c","#cab879","#edb365","#b59c80"],
	behavior: behaviors.WALL,
	tempHigh: 0,
	stateHigh: "diarrhea",
	category: "shit",
	state: "solid",
	density: 945,
	hidden: true,
},

elements.water.reactions.shit = { "elem1":["shit","shit","diarrhea"], "elem2":["dirty_water","dirty_water",null] }
elements.water.reactions.dried_shit = { "elem1":"shit", "elem2":["water","dirty_water","water","dirty_water",null] }
elements.water.reactions.diarrhea = { "elem1":"diarrhea", "elem2":"dirty_water" }


runAfterLoad(function() {
	
    if(enabledMods.includes("mods/fey_and_more.js")) {
		//shit elements as impurities {
			eLists.IMPURITY.push("shit");
			eLists.IMPURITY.push("dried_shit");
			eLists.IMPURITY.push("diarrhea");
			eLists.IMPURITY.push("frozen_shit");
			eLists.IMPURITY.push("frozen_diarrhea");
		//}
		//regenerate behaviors of elements that use eLists.IMPURITY {
			elements.pure_water.behavior = [
				"DL:"+eLists.IMPURITY+"|DL:"+eLists.IMPURITY+"|DL:"+eLists.IMPURITY+"",
				"DL:"+eLists.IMPURITY+" AND M2|XX|DL:"+eLists.IMPURITY+" AND M2",
				"DL:"+eLists.IMPURITY+" AND M1|DL:"+eLists.IMPURITY+" AND M1|DL:"+eLists.IMPURITY+" AND M1",
			];
			elements.pure_steam.behavior = [
				"M2 AND DL:"+eLists.IMPURITY+"|M1 AND DL:"+eLists.IMPURITY+"|M2 AND DL:"+eLists.IMPURITY+"",
				"M1 AND DL:"+eLists.IMPURITY+"|XX|M1 AND DL:"+eLists.IMPURITY+"",
				"M2 AND DL:"+eLists.IMPURITY+"|M1 AND DL:"+eLists.IMPURITY+"|M2 AND DL:"+eLists.IMPURITY+"",
			];
		//}
		//shit fairy {
			elements.shit_fairy = {
				color: ["#cc9868","#c2a75f","#bd9751"],
				state: "solid",
				behavior: [
					"XX|M1|M1",
					"XX|FX%5|XX",
					"XX|CR:shit%0.5 AND CR:fairy_dust%0.005 AND M1|M1",
				],
				category: "fey",
			};
		//}
		//eList rebuilding {
			eLists.FAIRY.push("shit_fairy");
			elements.iron.behavior = [
				"XX|DL:"+eLists.FAIRY+"|XX",
				"DL:"+eLists.FAIRY+"|XX|DL:"+eLists.FAIRY+"",
				"XX|DL:"+eLists.FAIRY+"|XX"
			];
			elements.silver.behavior = [
				"XX|DL:"+eLists.FAIRY+"|XX",
				"DL:"+eLists.FAIRY+"|XX|DL:"+eLists.FAIRY+"",
				"XX|DL:"+eLists.FAIRY+"|XX"
			];
		//} 
	
		//concoction support (it's all mistakes) {
			elements.concoction.reactions.shit = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.dried_shit = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.diarrhea = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.frozen_shit = { "elem1": "mistake", "elem2": null },
			elements.concoction.reactions.frozen_diarrhea = { "elem1": "mistake", "elem2": null },
		//}
		//shit fairy creation {
			elements.fairy.reactions.shit = { "elem1": "shit_fairy" }
		//}
	};


    if(enabledMods.includes("mods/fey_and_more.js") && enabledMods.includes("mods/randomness.js")) {
		//additional eList rebuilding for RM steel derivatives
		elements.tungstensteel.behavior = [
			"XX|DL:"+eLists.FAIRY+"|XX",
			"DL:"+eLists.FAIRY+"|XX|DL:"+eLists.FAIRY+"",
			"XX|DL:"+eLists.FAIRY+"|XX",
		],
		elements.molten_tungstensteel.behavior = [
			"XX|DL:"+eLists.FAIRY+" AND CR:fire%2.5|XX",
			"DL:"+eLists.FAIRY+" AND M2|XX|DL:"+eLists.FAIRY+" AND M2",
			"M1|DL:"+eLists.FAIRY+"|M1",
		]
	};
});
