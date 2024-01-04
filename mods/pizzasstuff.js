elements.Fruit_Slushy = {
	color: "#b867cf",
	behavior: behaviors.SUPERFLUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.Chocolate_Slushy = {
	color: "#4f2e16",
	behavior: behaviors.SUPERFLUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.Chocolate_Sauce = {
	color: "#754828",
	behavior: behaviors.SUPERFLUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.Cooking_Oil = {
	color: "#c4ab4f",
	behavior: behaviors.SUPERFLUID,
	category: "liquids",
	state: "solid",
	reactions: {
        "meat": { elem1: null, elem2: "Chicken_Nuggets" },
		"potato": { elem1: null, elem2: "Fries" },
	}
};

elements.Chicken_Nuggets = {
	color: "#967242",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.Fries = {
	color: "#ebba34",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};


elements.Smashed_Ice = {
	color: "#c3d4e6",
	behavior: behaviors.SUPERFLUID,
	category: "food",
	state: "solid",
	 reactions: {
        "grape": { elem1: null, elem2: "Fruit_Slushy" },
		"chocolate": { elem1: null, elem2: "Chocolate_Slushy" },
    },
};

elements.Moss = {
	color: "#389639",
	behavior: behaviors.STURDYPOWDER,
	category: "life",
	state: "solid",
};

elements.Moth = {
	color: "#665233",
	behavior: behaviors.BOUNCY,
	category: "life",
	state: "solid",
};