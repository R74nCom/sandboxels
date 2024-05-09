elements.thread = {
	color: "#fff3e6",
	behavior: behaviors.SUPPORTPOWDER,
	category: "thread",
	state: "solid",
	tempHigh: "50",
	stateHigh: "ash",
	hardness: "0.2",
	breakInto: "wool",
	density: " 1314",
	burn: "99",
	burnTime: "40",
	burnInto: "ash",
	reactions: {
        "weavepowder": { elem1: null, elem2: "rope" },

	}
}

elements.wool = {
	color: "#e2e1d8",
	behavior: behaviors.STURDYPOWDER,
	category: "thread",
	state: "solid",
	tempHigh: "40",
	stateHigh: "ash",
	hardness: "1",
	density: " 1314",
	burn: "90",
	burnTime: "40",
	burnInto: "ash",
	reactions: {
        "weavepowder": { elem1: null, elem2: "thread" },
	}
}
elements.weavepowder = {
	color: "#494736",
	behavior: behaviors.POWDER,
	category: "thread",
	state: "solid",
	tempHigh: "5000000",
	stateHigh: "dust",
	hardness: "1",
	density: " 1314",
	burn: "0",
	burnTime: "0",
	burnInto: "dust",
	reactions: {
        "wool": { elem1: "thread", elem2: null },
		"thread": { elem1: "rope", elem2: null },
	}
	
}
elements.rope = {
	color: "#ffe6cc",
	behavior: behaviors.SUPPORT,
	category: "thread",
	state: "solid",
	tempHigh: "60",
	stateHigh: "ash",
	hardness: "0.4",
	breakInto: "thread",
	density: " 1314",
	burn: "85",
	burnTime: "50",
	burnInto: "ash",
}
elements.sheep = {
    color: ["#FFFFE8", "#F4FFFF", "#FFF7F2","#796464","#282828"],
    behavior: [
        "M2%1|M2%1|M2%1",
        "M2%3|XX|M2%3",
        "XX|M1|XX",
    ],
    reactions: {
        "grass": { elem2:null, chance:0.04, func:behaviors.FEEDPIXEL },
        "dead_plant": { elem2:null, chance:0.04, func:behaviors.FEEDPIXEL },
        "plant": { elem2:null, chance:0.04, func:behaviors.FEEDPIXEL },
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
		"body": { elem1:["wool","sheep"], chance:0.1 },
    },
    egg: "lamb",
    foodNeed: 10,
    temp: 30,
    tempHigh: 100,
    stateHigh: "cooked_meat",
    tempLow: -18,
    stateLow: "frozen_meat",
    category:"life",
    breakInto: ["meat", "wool"],
    burn:15,
    burnTime:300,
    state: "solid",
    density: 1450,
    conduct: 0.2
};

elements.lamb = {
    color: ["#FFFFE8", "#F4FFFF", "#FFF7F2","#796464","#282828"],
	state: "solid",
    behavior: [
        "M2%1|M2%2|M2%1",
        "M2%4|FX%5 AND CH:sheep%0.1|M2%4",
        "XX|M1|XX",
    ],
    reactions: {
        "grass": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "dead_plant": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "plant": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
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
		"body": { elem1:["wool","sheep"], chance:0.1 },
    },
    egg: "lamb",
    foodNeed: 20,
    temp: 30,
    tempHigh: 100,
    stateHigh: "cooked_meat",
    tempLow: -18,
    stateLow: "frozen_meat",
    category:"life",
    breakInto: ["meat","wool"],
    burn:15,
    burnTime:300,
    state: "solid",
    density: 1450,
    conduct: 0.2
};
converter1Var = 0;
converter2Var = 0;
elements.loom = {
	color: "#296127",
	behavior: behaviors.WALL,
	category: "machines",
	tick: function(pixel) {
		if (pixel.start === pixelTicks){
			pixel.contype = converter2Var;
			pixel.specialturn = converter1Var;
		}
		 for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y, true)) {
					var otherPixel = pixelMap[x][y];
					if ((otherPixel.element == pixel.specialturn || pixel.specialturn == "all") && !elements.converter.ignore.includes(otherPixel.element)){
						changePixel(otherPixel, pixel.contype)
					}
                }
            }
	},
	onSelect: function() {
        var answer5 = prompt("Please input what type of element should be converted. Write \"all\" to include everything.",(converter1Var||undefined));
        if (!answer5) { return }
		converter1Var = answer5;
		var answer6 = prompt("Please input what it should turn into.",(converter2Var||undefined));
        if (!answer6) { return }
		converter2Var = answer6;
    },
	movable: false,
},
