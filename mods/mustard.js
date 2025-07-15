elements.mustard_seed = {
	color: ["#E8C096","#EDB470","#F6AE51","#CA8435"],
	behavior: behaviors.POWDER,
	tempHigh: 400,
	stateHigh: "fire",
	burn: 25,
	burnInto: ["fire","smoke","ash"],
	breakInto: ["mustard_meal",null],
	category: "food",
	state: "solid",
	density: 1017,
	isFood: true
};

elements.mustard_meal = {
    color: ["#F2D072","#E1C75E","#D6AC37","#8E4E14","#65300B"],
	behavior: behaviors.POWDER,
    reactions: {
        "water": { elem1:"mustard", elem2:"mustard", chance:0.05 },
        "salt_water": { elem1:"mustard", elem2:"mustard", chance:0.05 },
        "sugar_water": { elem1:"mustard", elem2:"mustard", chance:0.05 },
        "vinegar": { elem1:"mustard", elem2:"mustard", chance:0.05 },
        "juice": { elem1:"mustard", elem2:"mustard", chance:0.05 },
        "alcohol": { elem1:"mustard", elem2:"mustard", chance:0.05 },
    },
	tempHigh: 400,
	stateHigh: "fire",
	burn: 25,
	burnInto: ["fire","smoke","ash"],
	category: "food",
	state: "solid",
	density: 1017,
	isFood: true,
    hidden: true
};

elements.mustard = {
	color: "#d8c42e",
	behavior: behaviors.LIQUID,
	viscosity: 50000,
	tempHigh: 260,
	stateHigh: ["steam","steam","carbon_dioxide","methane"],
	category:"liquids",
	state: "liquid",
	density: 1111.64,
	stain: 0.05,
	isFood: true
};