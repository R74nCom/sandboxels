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
	stateHigh: ["tar"],
    viscosity: 4640,
    state: "liquid",
    density: 993
};
elements.poop = {
    color: "#8A4D24",
    behavior: behaviors.LIQUID,
    category: "food",
    viscosity: 1,
    state: "liquid",
    density: 43
};
elements.tar = {
    color: "#101217",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 45000,
    state: "liquid",
    burn: 10,
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
elements.liquid_paste = {
    color: "#D8D4C1",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 150430,
    state: "liquid",
    density: 230
};
elements.water.reactions.soup = { "elem1":"wet_soup", "elem2":"dirty_water" };
elements.tar.reactions.magma = { "elem1":"smoke", "elem2":"cinder" };
