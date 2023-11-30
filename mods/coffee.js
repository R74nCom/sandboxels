// Coffee Mod - Since coffee has been confirmed for a future update, I wanted to see what it might be like :)
// Created by Cerulean - special thanks to ggod :D
// If you have any suggestions for the mod, please leave a dm at @playblooket on discord (me)
// I'm not a pro modder, don't expect much lololol
// Version 1.0 // Last update - Nov 22

elements.coffee = {
    color: "#22120d",
    behavior: behaviors.LIQUID,
    temp: 75,
    category: "food",
    viscosity: 27,
    tempHigh: 200,
    stateHigh: ["steam", "fragrance"],
    tempLow: 4,
    stateLow: "iced_coffee", 
    state: "liquid",
    density: 308
};

elements.iced_coffee = {
    color: "#271f1c",
    behavior: behaviors.LIQUID,
    temp: -5,
    category: "food",
    viscosity: 35,
    state: "liquid",
    tempHigh: 10,
    stateHigh: "coffee",
    tempLow: -20,
    stateLow: ["ice", "ground_coffee_bean"],
    density: 308
};

elements.latte = {
    color: "#92817b",
    behavior: behaviors.LIQUID,
    temp: 75,
    category: "food",
    viscosity: 20,
    tempHigh: 200,
    stateHigh: ["steam", "fragrance"],
    tempLow: 4,
    stateLow: "iced_latte",
    state: "liquid",
    density: 822
};

elements.iced_latte = {
    color: "#271f1c",
    behavior: behaviors.LIQUID,
    temp: -5,
    category: "food",
    viscosity: 35,
    state: "liquid",
    tempHigh: 10,
    stateHigh: "latte",
    tempLow: -20,
    stateLow: ["ice", "ground_coffee_bean", "creamer"],
    density: 822
};

elements.creamer = {
    color: "#efe8e4",
    behavior: behaviors.LIQUID,
    category: "food",
    viscosity: 5,
    state: "liquid",
    tempLow: -25,
    stateLow: "ice_cream",
    tempHigh: 150,
    stateHigh: ["steam", "oil", "sugar"],
    density: 500
};

elements.coffee_bean = {
    color: "#552717",
    behavior: behaviors.POWDER,
    category: "food",
    viscosity: 1,
    state: "solid",
    tempLow: -20,
    stateLow: "frozen_coffee_bean",
    tempHigh: 200,
    stateHigh: "roasted_coffee_bean",
    breakInto: ["coffee_grounds", "ground_coffee_bean"],
    density: 500
};

elements.coffee_grounds = {
    color: "#34160b",
    behavior: behaviors.POWDER,
    category: "powders",
    viscosity: 1,
    state: "solid",
    tempHigh: 1200,
    stateHigh: "molten_dirt",
    tempLow: -50,
    stateLow: "permafrost",
    density: 550
};

elements.ground_coffee_bean = {
    color: "#552717",
    behavior: behaviors.POWDER,
    category: "food",
    viscosity: 1,
    state: "solid",
    tempHigh: 200,
    stateHigh: "roasted_ground_coffee_bean", 
    tempLow: -20,
    stateLow: "frozen_coffee_bean",
    density: 450
};

elements.frozen_coffee_bean = {
    color: "#5d4037",
    behavior: behaviors.POWDER,
    temp: -25
    category: "food",
    viscosity: 1,
    state: "solid",
    tempHigh: -10,
    stateHigh: "coffee_bean",
    density: 550
};

elements.frozen_ground_coffee_bean = {
    color: "#533328",
    behavior: behaviors.POWDER,
    temp: -25
    category: "food",
    viscosity: 1,
    state: "solid",
    tempLow: -10,
    stateLow: "ground_coffee_bean",
    density: 600
};

elements.roasted_ground_coffee_bean = {
    color: "#803e29",
    behavior: behaviors.POWDER,
    temp: 150
    category: "food",
    viscosity: 1,
    state: "solid",
    tempHigh: 350,
    stateHigh: "ash",
    tempLow: -20,
    stateLow: "frozen_ground_coffee_bean",
    density: 350
};

elements.roasted_coffee_bean = {
    color: "#9e5842",
    behavior: behaviors.POWDER,
    category: "food",
    viscosity: 1,
    state: "solid",
    tempLow: -20,
    stateLow: "frozen_coffee_bean",
    tempHigh: 300,
    stateHigh: "ash",
    breakInto: ["coffee_grounds", "roasted_ground_coffee_bean"]
    density: 400
};

elements.toffee = {
    color: "#bf8d5f",
    behavior: behaviors.POWDER,
    category: "food",
    viscosity: 1,
    state: "solid",
    tempHigh: 186,
    stateHigh: "sugar",
    breakInto: ["sugar", "h_bomb"]
    density: 1000
};

elements.espresso = {
    color: "#170701",
    behavior: behaviors.LIQUID,
    temp: 75,
    category: "food",
    viscosity: 27,
    tempHigh: 200,
    stateHigh: ["steam", "fragrance"],
    tempLow: 4,
    stateLow: "iced_espresso", 
    state: "liquid",
    density: 700
};

elements.iced_espresso = {
    color: "#2a1a12",
    behavior: behaviors.LIQUID,
    temp: -5,
    category: "food",
    viscosity: 35,
    state: "liquid",
    tempHigh: 10,
    stateHigh: "espresso",
    tempLow: -20,
    stateLow: ["ice", "roasted_ground_coffee_bean"],
    density: 700
};

elements.cacaoffee = {
    color: "#33180b",
    behavior: behaviors.LIQUID,
    temp: 75,
    category: "food",
    viscosity: 27,
    tempHigh: 200,
    stateHigh: ["steam", "melted_chocolate"],
    tempLow: 4,
    stateLow: ["chocolate", "iced_coffee"], 
    state: "liquid",
    density: 308
};

elements.milk.reactions.coffee = { "elem1":"latte"};
elements.creamer.reactions.coffee = { "elem1":"latte"};
elements.milk.reactions.ground_coffee_bean = { "elem1":"latte"};
elements.creamer.reactions.roasted_ground_coffee_bean = { "elem1":"espresso"};
elements.water.reactions.ground_coffee_bean = { "elem1":"coffee"};
elements.water.reactions.coffee_grounds = { "elem1":"mud"};
elements.chocolate.reactions.coffee = { "elem1":"latte"};
