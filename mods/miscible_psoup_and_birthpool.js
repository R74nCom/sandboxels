if(enabledMods.includes("mods/fey_and_more.js")) {
	elements.birthpool.density = elements.primordial_soup.density;
	elements.birthpool.state = "liquid";
};

runAfterLoad(function() {
	if(enabledMods.includes("mods/fey_and_more.js")) {
		elements.birthpool.density = elements.primordial_soup.density;
		elements.birthpool.state = "liquid";
	};
});
