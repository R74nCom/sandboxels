elements.soup = {
    color: "#AC4A2E",
    behavior: behaviors.LIQUID,
    category: "food",
    viscosity: 74000,
    state: "liquid",
    density: 720
};
elements.wet_soup = {
    color: "#C15C3F",
    behavior: behaviors.LIQUID,
    category: "food",
    viscosity: 6400,
    state: "liquid",
    density: 320
};
elements.guacamole = {
    color: "#67A555",
    behavior: behaviors.LIQUID,
    category: "food",
    viscosity: 4640,
    state: "liquid",
    density: 993
};
elements.cream = {
    color: ["#E1D3A2","#E5DBB7"],
    behavior: behaviors.LIQUID,
    category: "food",
    stateHigh: "gas",
    viscosity: 4640,
    state: "liquid",
    density: 993
};
elements.poop = {
    color: "#8A4D24",
	behavior: [
		"XX|CR:plague%0.1 AND CR:fly%0.01 AND CR:methane%0.0316|XX",
		"XX|CH:dried_poop%0.02|XX",
		"M2%50|M1 AND SW:water%50|M2%50",
	],
    category: "life",
    viscosity: 1,
    reactions: {},
    state: "liquid",
    density: 43
};
elements.dried_poop = {
    color: "#442714",
    behavior: behaviors.POWDER,
    category: "powders",
    viscosity: 1,
    state: "solid",
    density: 43
};
elements.tar = {
    color: "#101217",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 45000,
    state: "liquid",
    burn: 10,
    reactions: {},
    burnTime: 200,
    fireColor: "#101217",
    density: 1
};
elements.cinder = {
    color: "#171210",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 70,
    state: "liquid",
    burn: 5,
    burnTime: 70,
    fireColor: "#FF4F00",
    density: 343
};
elements.paste = {
    color: "#C4AA98",
    behavior: behaviors.WALL,
    category: "solids",
     stateHigh: ["liquid_paste"],
    state: "solid",
    density: 230
};
elements.husk = {
    color: ["#C4AA98", "#9E836B", "#A5876D", "#AE7D64", "#C87B67"],
    behavior: behaviors.WALL,
    category: "solids",
    reactions: {},
    state: "solid"
};
elements.remnant = {
    color: "#3C382B",
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    density: 1730
};
elements.rot = {
    color: ["#101217", "#853A2A"],
	behavior: [
		"XX|CR:fly%0.054|XX",
		"XX|XX|XX",
		"XX|CR:rot%0.054|XX",
	],
    category: "liquids",
    viscosity: 1,
    state: "liquid",
    reactions: {},
    density: 2
};
elements.liquid_paste = {
    color: "#D8D4C1",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 150430,
    state: "liquid",
    density: 230
};
elements.water.reactions.soup = { "elem1":"wet_soup", "elem2":"salt_water" };
elements.tar.reactions.magma = { "elem1":"smoke", "elem2":"cinder" };
elements.poop.reactions.water = { "elem1":"dried_poop", "elem2":"fly" };
elements.tar.reactions.husk = { "elem1":"rot", "elem2":"fly" };
elements.husk.reactions.molasses = { "elem1":"smoke", "elem2":"remnant" };
elements.rot.reactions.fire = { "elem1":"smoke", "elem2":"cinder" };
elements.water.reactions.rot = { "elem1":"blood", "elem2":"slag" };

