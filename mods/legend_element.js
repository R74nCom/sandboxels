elements.legendary_energy = {
                        "name": "legendary energy"
                        "color": "#13d649",
	                "behavior": behaviors.GAS
                        "temp": 300,
                        "category": "energy liquids",
                        "state": "gas",
                        "density": 2000,
			"reactions": {
                                "magma": { "elem1": "armageddon", "elem2": null },
                                "void": { "elem1": "light", "elm2": null },
    }

runAfterLoad(function() {
        if(enabledMods.includes("liquid_energy.js")) {
		elements.liquid_legend = {
                        "name": "liquid legend"
		        "color": "#13d644",			
                        "behavior": [
                        "XX|XX|XX",
                        "M2|EX:15>radon,radon,radon,liquid_legend%0.4 AND DL%0.2|M2",
                        "M1|M1|M1",
			],
                        "temp": 300,
                        "category": "energy liquids",
                        "state": "liquid",
                        "density": 2000,
                        "excludeRandom": true,
			"reactions": {
                                "magma": { "elem1": "armageddon", "elem2": null },
                                "void": { "elem1": "light", "elm2": null },
    }

}
runAfterLoad(function() {
        if(enabledMods.includes("bananas.js")) {
           elements.banana_juice = {
                        "name": "banana juice"
		        "color": "#e0f542",
                        "behavior": behaviors.LIQUID
		        "temp": 800,
			"category": "food",
			"state": "liquid",
			"density": 200,
			"excludeRandom": true,

            }
                 
       }

});
