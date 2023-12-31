//В этом моде я добавил печёное яблоко
elements.cooked_apple = {
    color: "#271f1c",
    behavior: behaviors.POWDER,
    temp: 20,
    category: "food",
    state: "solid",
    tempHigh: 345,
    stateHigh: "ash",
    tempLow: -30,
    stateLow: "iced_apple",
    density: 475
};

elements.iced_apple = {
	color: "#f7a37e",
	behavior: behaviors.WALL,
	temp: 20,
	category: "states",
	state: "solid",
	tempHigh: 10,
	stateHigh: "cooked_apple",
	density: 745
};
		
	
