if(enabledMods.includes("mods/chem.js")) {
	runAfterLoad(function() {
		randomBlacklist = ["quark_matter", "liquid_neutronium", "molten_neutronium", "neutronium", "neutronium_gas"];
		for(i = 0; i < randomBlacklist.length; i++) {
			var element = randomBlacklist[i];
			elements[element].excludeRandom = true;
		};
	});
};