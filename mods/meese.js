// made by squarescreamyt

elements.meese = {
    color: "#6e4526",
	state: "solid",
    behavior: [
        "M2%1|M2%2|M2%1",
        "M2%10|XX|M2%10",
        "XX|M1|XX",
    ],
    reactions: {
        "grass": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "plant": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.3 },
        "mercury": { elem1:"rotten_meat", chance:0.1 },
        "bleach": { elem1:"rotten_meat", chance:0.1 },
        "infection": { elem1:"rotten_meat", chance:0.025 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cyanide": { elem1:"rotten_meat", chance:0.1 },
        "chlorine": { elem1:"meat", chance:0.1 },
        "alcohol": { elem1:"meat", chance:0.025 },
        "dirty_water": { elem1:"rotten_meat", chance:0.0001 },
    },
    egg: "meese",
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
