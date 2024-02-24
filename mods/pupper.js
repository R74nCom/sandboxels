elements.dog_food = {
	color: ["#654321","#331800","#4b2d0b"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
  isFood: true
};

elements.dog = {
	color: ["#5c4033", "#000000", "#ffffff", "#c4a484"]
	behavior: [
    "XX|XX|XX",
    "M2|XX|M2",
    "M2|M1|M2",
  ],
	category: "life",
	state: "solid",
  reactions: {
    "chocolate": {elem2: null, chance:0.2, func:behaviors.FEEDPIXEL, elem1: "meat"},
    "nut_butter": {elem2: null, chance:0.5, func:behaviors.FEEDPIXEL},
    "dog_food": {elem2: null, chance:0.7, func:behaviors.FEEDPIXEL},
    "mercury": { elem1:"rotten_meat", chance:0.5 },
    "infection": { elem1:"rotten_meat", chance:0.7 },
    "uranium": { elem1:"rotten_meat", chance:0.9 },
};
