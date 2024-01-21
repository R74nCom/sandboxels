elements.leek = {
    color: ["#3ad664","#34cf5d","#20d450","#2fd65c"],
    behavior: behaviors.SOLID,
    category: "food",
    viscosity: 35,
    state: "solid",
    density: 9999,
    breakInto: "leek_mash",
};

elements.leek_mash = {
    color: "#75eb95",
    behavior: behaviors.POWDER,
    category: "food",
    viscosity: 35,
    state: "solid",
    density: 9999,
	reactions: {
        "mashed_potato": { elem1: "leek_soup", elem2: "leek_soup" },
    },
};

elements.leek_soup = {
    color: ["#b8eb75","#b6ed6d"],
    behavior: behaviors.LIQUID,
    category: "food",
    viscosity: 35,
    state: "liquid",
    density: 800,
};

