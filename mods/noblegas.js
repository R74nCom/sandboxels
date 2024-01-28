elements.argon = {
    color: elements.neon.color,
    behavior: behaviors.GAS,
    colorOn: ["#c831ee","#d683eb","#7a258f"],
    category: "gases",
    state: "gas",
    tempLow: -185.8,
    stateLow: "liquid_argon",
    density: 1.784,
    conduct: 0.8
}
elements.liquid_argon = {
    color: elements.neon.color,
    behavior: behaviors.LIQUID,
    colorOn: ["#c831ee","#d683eb","#7a258f"],
    category: "states",
    state: "liquid",
    tempHigh: -183.8,
    stateHigh: "argon",
    density: 1401,
    tempLow: -189.3,
    stateLow: "frozen_argon",
    conduct: 0.8
}
elements.frozen_argon = {
    color: elements.neon.color,
    behavior: behaviors.WALL,
    colorOn: ["#c831ee","#d683eb","#7a258f"],
    category: "states",
    state: "solid",
    tempHigh: -187.3,
    stateHigh: "liquid_argon",
    density: 1616,
    conduct: 0.8
}
elements.krypton = {
    color: elements.neon.color,
    behavior: behaviors.GAS,
    colorOn: ["#c49dce","#ac8ab4","#715579"],
    category: "gases",
    state: "gas",
    tempLow: -153.22,
    stateLow: "liquid_krypton",
    density: 3.75,
    conduct: 0.8
}
elements.liquid_krypton = {
    color: elements.neon.color,
    behavior: behaviors.LIQUID,
    colorOn: ["#c49dce","#ac8ab4","#715579"],
    category: "states",
    state: "liquid",
    tempHigh: -150.22,
    stateHigh: "krypton",
    density: 2423,
    tempLow: -157.36,
    stateLow: "frozen_krypton",
    conduct: 0.8
}
elements.frozen_krypton = {
    color: elements.neon.color,
    behavior: behaviors.WALL,
    colorOn: ["#c49dce","#ac8ab4","#715579"],
    category: "states",
    state: "solid",
    tempHigh: -154.36,
    stateHigh: "liquid_krypton",
    density: 2160,
    conduct: 0.8
}
elements.xenon = {
    color: elements.neon.color,
    behavior: behaviors.GAS,
    colorOn: ["#627eca","#4572d3","#333cb1"],
    category: "gases",
    state: "gas",
    tempLow: -108,
    stateLow: "liquid_xenon",
    density: 5.9,
    conduct: 0.8
}
elements.liquid_xenon = {
    color: elements.neon.color,
    behavior: behaviors.LIQUID,
    colorOn: ["#627eca","#4572d3","#333cb1"],
    category: "states",
    state: "liquid",
    tempHigh: -104,
    stateHigh: "xenon",
    density: 2948,
    tempLow: -111.8,
    stateLow: "frozen_xenon",
    conduct: 0.8
}
elements.frozen_xenon = {
    color: elements.neon.color,
    behavior: behaviors.WALL,
    colorOn: ["#627eca","#4572d3","#333cb1"],
    category: "states",
    state: "solid",
    tempHigh: -109.8,
    stateHigh: "liquid_xenon",
    density: 3410,
    conduct: 0.8
}