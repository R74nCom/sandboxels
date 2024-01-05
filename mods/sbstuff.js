elements.rice = {
	color: "#d1d1d1",
	behavior: behaviors.POWDER,
	category: "food",
	state: "liquid",
	reactions: {
		"fire": { elem1: "rice", elem2: "burnt_rice" },
		"heat": { elem1: "rice", elem2: "burnt_rice" },
		"plasma": { elem1: "fire", elem2: "ash" },
		"incinerate": { elem1: "fire", elem2: "ash" },
		"heat_ray": { elem1: "fire", elem2: "ash" },
	}
};

elements.burnt_rice = {
	color: "#242424",
	behavior: behaviors.POWDER,
	category: "food",
	state: "liquid",
	reactions: {
		"water": { elem1 : null, elem2: "dirty_water" },
	}
};