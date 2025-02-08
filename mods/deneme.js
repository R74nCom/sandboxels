elements.carbonite = {
    color: "#343634",
    behavior: behaviors.WALL,
    category: "star wars",
    state: "solid",
    density: 1000,
    tempHigh: 1000,
    stateHigh: "carbondioxide",
    reactions:{
	"acid": {elem1: null, elem2: "slag"},
	
}

};

elements.light_saber = {
	color: "#06d106",
	behavior: behaviors.WALL,
	category: "star wars",
	state: "solid"
}

// look it up:
// https://starwars.fandom.com/wiki/Plastoid
// stormtrooper armor
elements.plastoid = {
	color: "#FFAAAA",
	behavior: behaviors.WALL,
	category: "star wars",
	state: "solid",
	density: 400,
	tempHigh: 300,
	stateHigh: "molten_plastic",
	hardness: 1,
	burn: 0
};

elements.green_milk ={
	color: "#95f595",
	behavior: behaviors.LIQUID,
	category: "star wars",
	state: "liquid",
	viscosity: 100,
	density: 720,
};

elements.laser_blast = {
	color: "#ff0000",
	behavior: behaviors.BOUNCY,
	category: "star wars",
};
elements.tibanna_gas ={
	color: "#d99a9a",
	behavior: behaviors.GAS,
	category: "star wars",
	burn: 100,
	burnTime: 1,

}
elements.milk_water = {
	color: "#e4fade",
	behavior: behaviors.LIQUID,
	category: "star wars",
	hidden: true,
	viscosity: 90,
	state: "liquid",
	density: 1,
};

elements.water.reactions.green_milk = {elem1: null, elem2: "milk_water"}
