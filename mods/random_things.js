elements.legendary_energy = {
                        name: "legendary energy",
                        color: "#13d649",
	                behavior: [
        "XX|XX|XX",
        "XX|EX:90>plasma,plasma,plasma,plasma,radon,radon,radon,radon,radon,radon,molten_iron,molten_uranium,legendary_energy AND CH:light|XX",
        "XX|XX|XX",
    ],
                        temp: 9869,
	                tempLow: 6382,
	                stateLow: "liquid_legend",
                        category: "energy",
                        state: "gas",
                        density: 3000,
                        hardness: 1,
                        excludeRandom: true,
                        noMix: true,
			reactions: {
                                "magma": { "elem1": "armageddon", "elem2": null },
                                "void": { "elem1": "light", "elm2": null },
          },
},

elements.liquid_legend = {
                        name: "liquid legend",
		        color: "#13d644",			
                        behavior: [
                        "XX|XX|XX",
                        "M2|EX:15>radon,radon,legendary_energy,liquid_legend%0.4 AND DL%0.2|M2",
                        "M1|M1|M1",
			],
                        temp: 6382,
	                tempHigh: 9869,
			stateHigh: "legendary_energy",
                        category: "liquids",
                        state: "liquid",
                        density: 2000,
                        excludeRandom: true,
			reactions: {
                                "magma": { "elem1": "armageddon", "elem2": null },
                         	"void": { "elem1": "light", "elm2": null },
	 },
},

elements.wine = {
                name: "wine",
		color: "#f02263",
                behavior: behaviors.LIQUID,
		temp: 30,
		category: "liquids",
		state: "liquid",
		density: 20,
		excludeRandom: true,
	 },
	
if (enabledMods.includes("bananas.js")) {
    runAfterLoad(function() {
	    elements.banana_juice = {
                        name: "banana juice",
		        color: "#e0f542",
                        behavior: behaviors.LIQUID,
		        temp: 800,
			category: "liquids",
			state: "liquid",
			density: 20,
			excludeRandom: true,
	    }
    }
)};
