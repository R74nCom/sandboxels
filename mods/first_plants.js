elements.clay.reactions = {
	"water": {elem1: "wet_clay", elem2: "none"}
};

elements.wet_clay = {
	color: "#cebf96",
	category: "land",
	state: "solid",
	behavior: behaviors.STURDYPOWDER,
	reactions: {
		"plant": {elem2: "charcoal"},
		"grass": {elem2: "charcoal"},
		"algae": {elem2: "charcoal"},
		"sapling": {elem2: "charcoal"},
		"pinecone": {elem2: "charcoal"},
		"cactus": {elem2: "charcoal"},
		"kelp": {elem2: "charcoal"},
		"seeds": {elem2: "charcoal"},
		"vine": {elem2: "charcoal"},
		"bamboo_plant": {elem2: "charcoal"},
		"lichen": {elem2: "charcoal"},
		"wood": {elem2: "charcoal"},
		"evergreen": {elem2: "charcoal"}
	}
};