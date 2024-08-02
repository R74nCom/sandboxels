//made by livvo
//first time coding so bear with me

elements.ecofriendly_wood_veneer = {
    color: "#e3bb86",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    hardness: 0.15,
    breakInto: "sawdust",
};
elements.screws_borrowed_from_aunt = {
    color: "#687281",
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    tempHigh: 1538,
    stateHigh: "molten_metal_scrap",
    breakInto: "metal_scrap",
    hardness: 0.8,
    conduct: 0.9,
};
elements.galvanized_square_steel = {
    color: "#4a535c",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    tempHigh: 1200,
    stateHigh: "molten_galvanized_square_steel",
    conduct: 0.5,
};
elements.molten_galvanized_square_steel = {
    color: ["#a14612", "#b0572a", "b35a12", "#b06310"],
    behavior: behaviors.MOLTEN,
    category: "states",
    state: "molten",
    density: 7065,
    viscosity: 500,
    temp: 1200,
    tempLow: 419,
    stateLow: "galvanized_square_steel",
    conduct: 0.5,
    hidden: true
};