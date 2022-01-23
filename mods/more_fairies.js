if(enabledMods.includes("mods/fey_and_more.js")) {

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
	}

}

elements.acid.ignore.push("fairy")
elements.acid.ignore.push("fairy_dust")
elements.acid.ignore.push("acid_fairy")

runAfterLoad(function() {
    if(enabledMods.includes("mods/fey_and_more.js")) {
		//eList rebuilding {
			eLists.FAIRY.push("acid_fairy");
			eLists.FAIRY.push("oil_fairy");
			eLists.FAIRY.push("honey_fairy");

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
	elements.fairy.reactions.acid = { "elem1": "acid_fairy", "elem2": null }
	elements.fairy.reactions.oil = { "elem1": "oil_fairy", "elem2": null }
	elements.fairy.reactions.honey = { "elem1": "honey_fairy", "elem2": null }
	};
    if(enabledMods.includes("mods/fey_and_more.js") && enabledMods.includes("mods/randomness.js")) {
		elements.warp_fairy = {
			name: "warp fairy",
			color: ["#332f33","#3b3b3b","#413f4a"],
			behavior: [
				"XX|M1|M1",
				"XX|FX%5|XX",
				"XX|CR:warp%0.4 AND CR:fairy_dust%0.005 AND M1|M1",
			],
			state: "solid",
			category: "fey",
		}
		elements.fairy.reactions.warp = { "elem1": "warp_fairy", "elem2": null }
		eLists.FAIRY.push("warp_fairy");
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
