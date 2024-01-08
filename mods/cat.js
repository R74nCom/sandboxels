// made by squarescreamyt

elements.cat = {
    color: ["#c05811","#cf7941","#d4ccc5","#ffe7b3","#f7b484","#ef7d51","#c15c37","#8e4024","#5f2612","#3a2930","#6b4540","#9d654f","#c68b68","#e2b98d","#ffe8aa","#292c33","#4b4f55","#76797e","#a5a6a7","#d5cfcd","#fff1e8"],
	state: "solid",
    behavior: [
        "M2%1|M2%2|M2%1",
        "M2%10|XX|M2%10",
        "XX|M1|XX",
    ],
    reactions: {
        "meat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "cooked_meat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "fish": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "rat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "cat_food": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.3 },
        "mercury": { elem1:"rotten_meat", chance:0.1 },
        "bleach": { elem1:"rotten_meat", chance:0.1 },
        "infection": { elem1:"rotten_meat", chance:0.025 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cyanide": { elem1:"rotten_meat", chance:0.1 },
        "chlorine": { elem1:"meat", chance:0.1 },
        "alcohol": { elem1:"meat", chance:0.025 },
        "dirty_water": { elem1:"rotten_meat", chance:0.0001 },
        "pool_water": { elem1:"rotten_meat", chance:0.005 },
        "vinegar": { elem1:"rotten_meat", chance:0.001 },
    },
    egg: "kitten",
    foodNeed: 10,
    temp: 30,
    tempHigh: 100,
    stateHigh: "cooked_meat",
    tempLow: -18,
    stateLow: "frozen_meat",
    category:"life",
    breakInto: "rotten_meat",
    burn:15,
    burnTime:300,
    state: "solid",
    density: 1450,
    conduct: 0.2
};

elements.kitten = {
    color: ["#c05811","#cf7941","#d4ccc5","#ffe7b3","#f7b484","#ef7d51","#c15c37","#8e4024","#5f2612","#3a2930","#6b4540","#9d654f","#c68b68","#e2b98d","#ffe8aa","#292c33","#4b4f55","#76797e","#a5a6a7","#d5cfcd","#fff1e8"],
	state: "solid",
    behavior: [
        "M2%1|M2%2|M2%1",
        "M2%10|FX%5 AND CH:cat%0.1|M2%10",
        "XX|M1|XX",
    ],
    reactions: {
        "meat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "cooked_meat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "fish": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "cat_food": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "rat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.3 },
        "mercury": { elem1:"rotten_meat", chance:0.1 },
        "bleach": { elem1:"rotten_meat", chance:0.1 },
        "infection": { elem1:"rotten_meat", chance:0.025 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cyanide": { elem1:"rotten_meat", chance:0.1 },
        "chlorine": { elem1:"meat", chance:0.1 },
        "alcohol": { elem1:"meat", chance:0.025 },
        "dirty_water": { elem1:"rotten_meat", chance:0.0001 },
        "pool_water": { elem1:"rotten_meat", chance:0.005 },
        "vinegar": { elem1:"rotten_meat", chance:0.001 },
    },
    egg: "kitten",
    foodNeed: 10,
    temp: 30,
    tempHigh: 100,
    stateHigh: "cooked_meat",
    tempLow: -18,
    stateLow: "frozen_meat",
    category:"life",
    breakInto: "rotten_meat",
    burn:15,
    burnTime:300,
    state: "solid",
    density: 1450,
    conduct: 0.2
};

elements.cat_food = {
	color: ["#b0853c","#c28e4a","#ab8e38","#b56845","#ab6f44","#b57f38"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
    tempHigh: 1000,
    stateHigh: ["ash", "smoke"],
    density: 820.33,
    isFood: true
};

if (!elements.batter.reactions) elements.batter.reactions = {};
elements.batter.reactions.meat = { elem1: "cat_food", elem2: "cat_food" }