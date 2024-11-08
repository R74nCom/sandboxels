elements.electron = {
	color: "#faffa1",
	behavior: behaviors.GAS,
	category: "energy",
	state: "gas",
	reactions: {
	"ash": { elem1: "acid_gas", elem2: "neutron" }
	"battery": { elem1: "bomb", elem2: "neutron" }
	"greek_fire": { elem1: "fire", elem2: "neutron" }
	"wire": { elem1: "steel", elem2: "neutron" }
	"vine": { elem1: "plant", elem2: "neutron" }
	"wood": { elem1: "acid_gas", elem2: "neutron" }
	"glass": { elem1: "potassium", elem2: "neutron" }
	"stained_glass": { elem1: "potassium", elem2: "glass" }
	},
};
elements.iodum = {
	color: "#4d4218",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "liquid",
	reactions: {
	"concrete": { elem1: "ash", elem2: null }
	},
};
