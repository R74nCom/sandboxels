urlParams = new URLSearchParams(window.location.search);

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
	}
}

runAfterLoad(function() {
	if(enabledMods.includes("mods/fey_and_more.js")) {
		for (var i = 2; i <= fairyAmount + 1; i++) {
			eLists.FAIRY.push(`${i}-fairy`);
		}
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
	};
    if(enabledMods.includes("mods/fey_and_more.js") && enabledMods.includes("mods/randomness.js")) {
		if(elements.tungstensteel && elements.molten_tungstensteel) {
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
		}
	};
	if(!elements.rainbow.reactions) {
		elements.rainbow.reactions = {}
	}
	elements.rainbow.reactions.fairy = { "elem1": "2-fairy", "elem2": null }
	delete elements[`${fairyAmount + 1}-fairy`].reactions
});
