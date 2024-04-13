elements.ghost_particle = {
	color: "#d9d2d0",
	behavior: behaviors.DGAS,
	category: "soul",
	state: "gas",
};

elements.soul_fish = {
    color: ["#808080","#a52a2a"], 
    category: "soul",
    behavior: [
            "XX|M2|M1",
	    "XX|FX%2|BO",
	    "XX|XX|M1",
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
    },
	tempHigh: 50000,
	stateHigh: "ghost_particle",
	category:"soul",
	state: "solid",
	density: 1080,
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
			};
			pixel.age++
		},
		category: "soul",
		state: "powder",
		density: 1050,
		excludeRandom: true,
	};

elements.death_reaper = {
	color: "#454545",
	behavior: [
		"XX|M2|M1",
		"XX|FX%2|BO",
		"XX|XX|M1",
	],
	reactions: {
		human: { elem2: ["ghost_particle",null] },
		head: { elem2: ["ghost_particle",null] },
                body: { elem2: ["ghost_particle",null] },
                worm: { elem2: ["ghost_particle",null] },
                fish: { elem2: ["ghost_particle",null] },
                frozen_fish: { elem2: ["ghost_particle",null] },
                slug: { elem2: ["ghost_particle",null] },
                snail: { elem2: ["ghost_particle",null] },
                bird: { elem2: ["ghost_particle",null] },
                rat: { elem2: ["ghost_particle",null] },
                frog: { elem2: ["ghost_particle",null] },
                frozen_frog: { elem2: ["ghost_particle",null] },
                tadpole: { elem2: ["ghost_particle",null] },
                stink_bug: { elem2: ["ghost_particle",null] },
                bee: { elem2: ["ghost_particle",null] },
                ghost_particle: { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
                flea: { elem2: ["ghost_particle",null] },
                termite: { elem2: ["ghost_particle",null] },
                frozen_worm: { elem2: ["ghost_particle",null] },
                flea: { elem2: ["ghost_particle",null] },
                ant: { elem2: ["ghost_particle",null] },
                fly: { elem2: ["ghost_particle",null] },
                firefly: { elem2: ["ghost_particle",null] },
                bee: { elem2: ["ghost_particle",null] },
	},
	tempHigh: 10000,
	stateHigh: "bone",
	category:"soul",
	state: "solid",
	density: 1500,
};
elements.tombstone = {
    color: "#aaaaaa",
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 1500,
    tick: function(pixel) {
            if (isEmpty(pixel.x+1,pixel.y) && Math.random() < 0.1) {
                createPixel("ghost_particle",pixel.x+1,pixel.y);
        }
        doDefaults(pixel);
    },
    stateHigh: "magma",
    category: "soul",
    state: "solid",
    density: 2400,
    hardness: 0.5,
    breakInto: "dust",
    darkText: true
}
elements.tombstone_seed = {
    color: "#eeeff2",
    tick: function(pixel) {
            if (isEmpty(pixel.x+1,pixel.y) &&
            isEmpty(pixel.x-1,pixel.y) 
            isEmpty(pixel.x+1,pixel.y-1) &&
            isEmpty(pixel.x-1,pixel.y-1) &&
            isEmpty(pixel.x,pixel.y-1) &&
            isEmpty(pixel.x+1,pixel.y-2) &&
            isEmpty(pixel.x-1,pixel.y-2) &&
            isEmpty(pixel.x,pixel.y-2) &&
            isEmpty(pixel.x+1,pixel.y-3) &&
            isEmpty(pixel.x-1,pixel.y-3) &&
            isEmpty(pixel.x,pixel.y-3)) {
                createPixel("tombstone",pixel.x+1,pixel.y);
                createPixel("tombstone",pixel.x-1,pixel.y);
                createPixel("tombstone",pixel.x+1,pixel.y-1);
                createPixel("tombstone",pixel.x-1,pixel.y-1);
                createPixel("tombstone",pixel.x,pixel.y-1);
                createPixel("tombstone",pixel.x+1,pixel.y-2);
                createPixel("tombstone",pixel.x-1,pixel.y-2);
                createPixel("tombstone",pixel.x,pixel.y-2);
                createPixel("tombstone",pixel.x+1,pixel.y-3);
                createPixel("tombstone",pixel.x-1,pixel.y-3);
                createPixel("tombstone",pixel.x,pixel.y-3);
        }
        if (pixel.age > 100) {
            changePixel(pixel,"tombstone");
        }
        pixel.age++
        doDefaults(pixel);
    },
    properties: {
        age:0
    },
    category: "soul",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    maxSize: 1,
    excludeRandom: true,
    behavior: behaviors.STURDYPOWDER,
};
