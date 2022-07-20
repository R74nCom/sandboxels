elements.liquid_void = {
	color: "#262626",
	behavior: [
		"XX|DL|XX",
		"DL AND M2|XX|DL AND M2",
		"M1|DL AND M1|M1",
	],
	ignore: ["liquid_void", "void", "wall", "cloner", "ecloner", "slow_cloner", "clone_powder", "floating_cloner", "clone_liquid", "liquid_cloner", "fire_cloner", "antigravity_powder_cloner", "floating_cloner_spout", "clone_liquid_spout", "liquid_cloner_spout", "fire_cloner_spout", "converter", "liquid_void_spout"],
	/*The hardcoded array of cloners is used because I don't know how to detect them.
	Generation code: 
		elementArray = Object.keys(elements);
		for (let i = 0; i < elementArray.length; i++) {
			var elementName = elementArray[i];
			if(elementName.indexOf("lone") !== -1) {
				console.log(elementName);
			};
		};
	*/
	category: "liquids",
	state: "liquid",
	density: 6969,
	excludeRandom: true,
}

if(!elements.void.ignore) {
	elements.void.ignore = [];
};

elements.void.ignore.push("liquid_void");
