elements.dog_food = {
	color: ["#402101", "#1f1001", "#2e1701", "#2b1601", "#261604"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
    tempHigh: 500,
    stateHigh: "ash",
    isFood: true,
};

elements.ice_cube = {
	color: ["#ccf4ff", "#c6e3f5", "#b6d1f2",],
	behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX"
    ],
	category: "food",
	state: "solid",
    temp: -5,
    tempHigh: 0,
    stateHigh: "water",
    isFood: true,
};

elements.dog_with_rabies = {
	color: ["#c7a950", "#f7f6eb", "#152617", "#665d20", "#454420" ],
	behavior: [
        "XX|XX|XX",
        "M2%25|LB:foam%25|M2%25",
        "M2|M1|M2"
    ],
    reactions: {
        "meat": {elem2:null, chance:0.5, func:behaviors.FEEDPIXEL },
        "egg": {elem2:null, chance:0.5, func:behaviors.FEEDPIXEL },
        "yolk": {elem2:null, chance:0.5, func:behaviors.FEEDPIXEL },
        "cheese": {elem2:null, chance:0.5, func:behaviors.FEEDPIXEL },
        "ice_cube": {elem2:null, chance:0.8, func:behaviors.FEEDPIXEL },
        "cooked_meat": {elem2:null, chance:0.5, func:behaviors.FEEDPIXEL },
        "chocolate": {elem2:null, chance: 0.2, func:behaviors.FEEDPIXEL, elem1: "rotten_meat"},
        "grape": {elem2:null, chance: 0.2, func:behaviors.FEEDPIXEL, elem1: "rotten_meat"},
        "rat": {elem2:null, chance: 0.3, func:behaviors.FEEDPIXEL },
        "dog_food": {elem2:null, chance: 0.8, func:behaviors.FEEDPIXEL },
        "nut_butter": {elem2:null, chance: 0.5, func:behaviors.FEEDPIXEL },
    },
	category:"life",
	state:"solid",
    tempHigh: 100,
    stateHigh: "cooked_meat",
    breakInto: "rotten_meat",
    tempLow: -20,
    stateLow: "frozen_meat",
    hidden: true,
};

elements.dog = {
	color: ["c78950", "#ffffff", "#262524", "#664120", "#453120" ],
	behavior: [
        "XX|XX|XX",
        "M2%7|XX|M2%7",
        "M2|M1|M2"
    ],
    reactions: {
        "meat": {elem2:null, chance:0.5, func:behaviors.FEEDPIXEL },
        "egg": {elem2:null, chance:0.5, func:behaviors.FEEDPIXEL },
        "yolk": {elem2:null, chance:0.5, func:behaviors.FEEDPIXEL },
        "cheese": {elem2:null, chance:0.5, func:behaviors.FEEDPIXEL },
        "ice_cube": {elem2:null, chance:0.8, func:behaviors.FEEDPIXEL },
        "cooked_meat": {elem2:null, chance:0.5, func:behaviors.FEEDPIXEL },
        "chocolate": {elem2:null, chance: 0.2, func:behaviors.FEEDPIXEL, elem1: "rotten_meat"},
        "grape": {elem2:null, chance: 0.2, func:behaviors.FEEDPIXEL, elem1: "rotten_meat"},
        "rat": {elem2:null, chance: 0.3, func:behaviors.FEEDPIXEL },
        "dog_food": {elem2:null, chance: 0.8, func:behaviors.FEEDPIXEL },
        "nut_butter": {elem2:null, chance: 0.5, func:behaviors.FEEDPIXEL },
        "infection": {elem1:"dog_with_rabies", chance:0.4 },
        "dog_with_rabies": {elem1:"dog_with_rabies", chance:0.3},
    },
	category:"life",
	state:"solid",
    tempHigh: 100,
    stateHigh: "cooked_meat",
    breakInto: "rotten_meat",
    tempLow: -20,
    stateLow: "frozen_meat",
};