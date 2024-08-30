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
    reactions: {
        "algae": {elem2: "lichen"},
    }
};
elements.screws_borrowed_from_aunt = {
    color: ["#687281", "#e4e7ed", "#687281", "#4f5969", "#939ead"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    tempHigh: 1538,
    stateHigh: "molten_metal_scrap",
    breakInto: "metal_scrap",
    hardness: 0.8,
    conduct: 0.9,
    density: 3000,
    reactions: {
        "water": {elem1: "rust", chance: 0.002},
        "salt_water": {elem1: "rust", chance: 0.004},
        "dirty_water": {elem1: "rust", chance: 0.03},
        "pool_water": {elem1: "rust", chance: 0.03},
        "sugar_water": {elem1: "rust", chance: 0.003},
        "seltzer": {elem1: "rust", chance: 0.005},
        "salt": {elem1: "rust", chance: 0.003},
        "blood": {elem1: "rust", chance: 0.002},
        "infection": {elem1: "rust", chance: 0.002},
        "antibody": {elem1: "rust", chance: 0.002},
        "coffee": {elem1: "rust", chance: 0.0002},
        "tea": {elem1: "rust", chance: 0.0002},
        "broth": {elem1: "rust", chance: 0.0002},
        "juice": {elem1: "rust", chance: 0.0002},
        "nut_milk": {elem1: "rust", chance: 0.0002},
    }
};
elements.galvanized_square_steel = {
    color: "#545e69",
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
if (!elements.steel.reactions) elements.molten_zinc.reactions = {};
elements.steel.reactions.molten_zinc = { elem1: "galvanized_square_steel", elem2: null }
