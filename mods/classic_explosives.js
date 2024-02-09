elements.sticky_bomb = {
    color: "#233096",
    behavior: [
        "XX|ST AND EX:10%2|XX",
        "ST AND EX:10%2|XX|ST AND EX:10%2",
        "XX|M1 AND ST AND EX:10%2|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    tempHigh: 1455.5,
    stateHigh: ["molten_steel","slime"],
    excludeRandom: true,
    cooldown: defaultCooldown
}
if (!elements.slime.reactions) { elements.slime.reactions = {} }
elements.slime.reactions.bomb = { elem2:"sticky_bomb", elem2:null }
elements.cluster_bomb = {
    color: "#7d776d",
    behavior: [
        "XX|EX:10>smoke,smoke,smoke,smoke,smoke,grenade|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:10>smoke,smoke,smoke,smoke,smoke,grenade|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    tempHigh: 1455.5,
    stateHigh: "molten_steel",
    excludeRandom: true,
    cooldown: defaultCooldown
}
elements.electro_bomb = {
    color: "#6e6d43",
    behavior: [
        "XX|EX:10>electric|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:10>electric|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    tempHigh: 1655.5,
    stateHigh: "molten_steel",
    excludeRandom: true,
    cooldown: defaultCooldown
}
elements.water_bomb = {
    color: "#34599e",
    behavior: [
        "XX|EX:10>water|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:10>water|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    tempHigh: 1455.5,
    stateHigh: "molten_steel",
    excludeRandom: true,
    cooldown: defaultCooldown
}