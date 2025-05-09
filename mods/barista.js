/*
Barista Mods by Salmonfishyy (eu)
Add many ingredients for drinks

Changelog - Foundation Level (v0.1)
 - Matcha Elements
*/

elements.matcha_powder = {
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    color: ["#74A662","#74A12E"],
    density: 400,
    tempHigh: 80,
    stateHigh: "burn_matcha",
    isFood: true,
    desc: "Fine green powder from tea leaves. Vibrant color, earthy taste, and packed with antioxidants. Used in drinks, desserts, and rituals. Basically, classy leaf dust. Watch out for heat and oxygen!",
    reactions: { 
        "oxygen": { elem2: "broke_matcha", chance: 0.5 },
        "dirty_water": { elem2: "null", chance: 0.5 },
        "pool_water": { elem2: "null", chance: 0.5 },
        "water": { elem2: "matcha_tea", chance: 0.5 },
        "seltzer": { elem2: "matcha_soda", chance: 0.5 },
        "salt_water": { elem2: "salty_matcha", chance: 0.5 },
        "sugar_water": { elem2: "sweet_matcha", chance: 0.5 }
    }
};

elements.broke_matcha = {
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    color: ["#556B2F","#8B4513"],
    density: 400,
    desc: "Broke matcha—once a proud green powder, now a sad, terrible mess. Faded, bitter, and questioning its life choices. Now useless."
};

elements.matcha_tea = {
    behavior: behaviors.LIQUID,
    category: "food",
    state: "liquid",
    color: ["#5F8A3D"],
    density: 1000,
    isFood: true,
    desc: "Thick green drink, kinda earthy, kinda bitter. Looks like a magic potion, feels like a forest hug. Smooth, strong, and definitely plotting something...",
    reactions: { 
        "milk": { elem2: "matcha_latte", chance: 0.5 },
        "cream": { elem2: "matcha_latte", chance: 0.5 },
        "salt": { elem2: "salty_matcha", chance: 0.5 },
        "sugar": { elem2: "sweet_matcha", chance: 0.5 },
        "carbon_dioxide": { elem2: "matcha_soda", chance: 0.5 }
    }
};

elements.matcha_latte = {
    behavior: behaviors.LIQUID,
    category: "food",
    state: "liquid",
    color: ["#DDEEAF"],
    density: 1000,
    isFood: true,
    desc: "Green tea and milk mixed together. Smooth, slightly sweet, and a bit earthy. Looks fancy, tastes cozy.",
    reactions: { 
        "milk": { elem2:null, chance: 0.5 },
        "cream": { elem2:null, chance: 0.5 }
    }
};

elements.salty_matcha = {
    behavior: behaviors.LIQUID,
    category: "food",
    state: "liquid",
    color: ["#A2B57D"],
    density: 1000,
    isFood: true,
    desc: "Green tea but slightly salty. Confusing, kinda wrong, yet somehow still drinkable. Like matcha decided to rebel.",
    reactions: {
        "salt": { elem2:null, chance: 0.5 }
    }
};

elements.matcha_soda = {
    behavior: behaviors.LIQUID,
    behavior: [
		"XX|CR:foam%3|XX",
		"M2|XX|M2",
		"M2|M1|M2",
	],
tick: function(pixel) {
		if (Math.random() < 0.05 && isEmpty(pixel.x,pixel.y-1)) {
			let foam = releaseElement(pixel, "foam");
			if (foam) foam.color = pixelColorPick(foam,"#7EBF5C");
		}
},

	onMix: function(pixel) {
		releaseElement(pixel, "foam", shiftDown)
	},

    category: "food",
    state: "liquid",
    color: ["#7EBF5C"],
    density: 1000,
    isFood: true,
    desc: "Carbonated green tea. Slightly bitter, extra fizzy. Tastes fresh, feels weird...",
    reactions: { 
        "carbon_dioxide": { elem2:null, chance: 0.5 }
    }
};

elements.oolong_leaves = {
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    color: ["#CDB361","#8F6B3A"],
    density: 200,
    isFood: true,
    tempHigh: 120, 
    stateHigh: "roasted_oolong",
    desc: "Dark, twisty tea leaves that look kinda serious. Smell fancy, taste like tea that went through a phase. Smooth, strong, and slightly dramatic. UNDER CONSTRUCTION AHAHAHAHA"
};

elements.roasted_oolong = {
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    color: ["#8F6B3A","#654321"],
    density: 220,
    isFood: true,
    desc: "Roasted oolong—deeper flavor, slightly smoky, and probably wiser now. UNDER CONSTRUCTION AHAHAHAHA"
};