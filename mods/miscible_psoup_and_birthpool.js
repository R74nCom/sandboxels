runAfterLoad(function() {
	if(enabledMods.includes("mods/fey_and_more.js")) {
		elements.birthpool.density = 1250
		elements.primordial_soup.density = 1250
		elements.birthpool.state = "liquid";
	};
});
