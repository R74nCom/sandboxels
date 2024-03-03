elements.ghost_particle = {
	color: "#d9d2d0",
	behavior: behaviors.GAS,
	category: "soul",
	state: "gas",
};

elements.soul_fish = {
    color: ["#808080","#a52a2a"], 
    category: "soul",
    behavior: [
       "XX|CR:flash|XX",
        "CR:flash AND M2|XX|CR:flash AND M2",
        "M1|CR:flash AND M1|M1",
    ],
    reactions: {
        "algae": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "plant": { elem2:null, chance:0.125, func:behaviors.FEEDPIXEL },
        "fly": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "firefly": { elem2:null, chance:0.6, func:behaviors.FEEDPIXEL },
        "worm": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "tadpole": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.5 },
        "dead_bug": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "broth": { elem2:"water", chance:0.2, func:behaviors.FEEDPIXEL },
        "slug": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "herb": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "lettuce": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "dead_plant": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "lichen": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "yeast": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "yogurt": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "tea": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "yolk": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "cell": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "crumb": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "alcohol": { elem1:"meat", chance:0.001 },
    }
    };
elements.soul_anger_block = {
    color: ["#eb4034","#ed2415"], 
    category: "soul",
    behavior: [
       "HT|HT|HT",
       "CR:heat_ray|HT|CR:heat_ray",
       "HT|CR:heat_ray|HT",
    ],
};
elements.soul_dirt = {
		color: ["#999a98", "#e6e7e2", "#dddcda"],
		behavior: behaviors.POWDER,
		properties: {
			"methaned": false,
			"age": 0
		},
		tick: function(pixel) {
			if(pixel.age > 6) {
				if(!pixel.methaned && Math.random() < 0.2) {
					changePixel("ghost_particle",pixel.x,pixel.y);
				} else {
					pixel.methaned = true;
				};
				createPixel("ghost_particle",pixel.x,pixel.y);
			};
			pixel.age++
		},
		category: "soul",
		state: "powder",
		density: 1050,
		excludeRandom: true,
	};
