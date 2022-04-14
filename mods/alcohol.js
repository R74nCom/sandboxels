elements.alcohol.name = "ethanol"
elements.alcohol.viscosity = elements.alcohol.viscosity * (1.074/1.0016)

elements.methanol = {
    color: "#c9c5b1",
    behavior: behaviors.LIQUID,
    reactions: {
        "virus": { "elem2":null },
        "plague": { "elem2":null },
        "head": { "elem2":"rotten_meat", "chance": 0.8 },
        "body": { "elem2":"rotten_meat", "chance": 0.8 },
    },
    viscosity: 1*(0.553/1.0016),
    tempHigh: 64.7,
    stateHigh: ["steam","carbon_dioxide"], //todo: alcohols' phase transitions
    burn: 100,
    burnTime: 2,
    fireColor: "#b2c5d1",
    category: "liquids",
    state: "liquid",
    density: 792,
    stain: -0.25,
}


elements.methanol = {
    color: "#c9c5b1",
    behavior: behaviors.LIQUID,
    reactions: {
        "virus": { "elem2":null },
        "plague": { "elem2":null },
        "head": { "elem2":"rotten_meat", "chance": 0.8 },
        "body": { "elem2":"rotten_meat", "chance": 0.8 },
    },
    viscosity: 1*(0.553/1.0016),
    tempHigh: 64.7,
    stateHigh: ["steam","carbon_dioxide"], //todo: alcohols' phase transitions
    burn: 100,
    burnTime: 2,
    fireColor: "#b2c5d1",
    category: "liquids",
    state: "liquid",
    density: 792,
    stain: -0.25,
}

elements.propanol = {
    color: "#c9c5b1",
    behavior: behaviors.LIQUID,
    reactions: {
        "virus": { "elem2":null },
        "plague": { "elem2":null },
    },
    viscosity: 1*(1.945/1.0016),
    tempHigh: 97,
    stateHigh: ["steam","carbon_dioxide"],
    burn: 100,
    burnTime: 3,
    fireColor: "#ced8de",
    category: "liquids",
    state: "liquid",
    density: 803,
    stain: -0.25,
}

elements.isopropanol = {
    color: "#c9c5b1",
    behavior: behaviors.LIQUID,
    reactions: {
        "virus": { "elem2":null },
        "plague": { "elem2":null },
    },
    viscosity: 1*(2.052/1.0016),
    tempHigh: 82.5,
    stateHigh: ["steam","carbon_dioxide"],
    burn: 100,
    burnTime: 3,
    fireColor: "#d1c958",
    category: "liquids",
    state: "liquid",
    density: 786,
    stain: -0.25,
}

elements.butanol = {
    color: "#c9c5b1",
    behavior: behaviors.LIQUID,
    reactions: {
        "virus": { "elem2":null },
        "plague": { "elem2":null },
    },
    viscosity: 1*(2.53/1.0016),
    tempHigh: 118,
    stateHigh: ["steam","carbon_dioxide"],
    burn: 100,
    burnTime: 3,
    category: "liquids",
    state: "liquid",
    density: 810,
    stain: -0.25,
}