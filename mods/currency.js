//i swear i'll update the colors next time ;-;

//to do: atm

elements.generic_dollar = {
    color: "#4f9e56",
    behavior: [
        "XX|XX|XX",
        "XX|FX%0.25|XX",
        "M2%15|M1%15|M1%15",
    ],
    category: "currency",
    state: "solid",
    tempHigh: 230,
    stateHigh: ["ash", "smoke", "smoke", "smoke"],
    burn: 20,
    burnTime: 200,
    burnInto: ["ash", "smoke", "smoke", "smoke"],
    breakInto: "confetti",
    reactions: {
        "body": {elem1: null, chance: 0.05}
    }
}
elements.generic_coin = {
    color: "#989b9e",
    behavior: behaviors.POWDER,
    category: "currency",
    state: "solid",
    tempHigh: 1175,
    stateHigh: "cupro_nickel",
    density: 8950,
    conduct: 0.8,
    hardness: 0.7,
    reactions: {
        "body": {elem1: null, chance: 0.05}
    }
}  
elements.u_s_dollar = {
    color: ["#8caa7d"],
    //stole this color from ryan's spring.js
    behavior: [
        "XX|XX|XX",
        "XX|FX%0.25|XX",
        "M2%15|M1%15|M1%15",
    ],
    category: "currency",
    state: "solid",
    tempHigh: 230,
    stateHigh: ["ash", "smoke", "smoke", "smoke"],
    burn: 20,
    burnTime: 200,
    burnInto: ["ash", "smoke", "smoke", "smoke"],
    breakInto: "confetti",
    reactions: {
        "body": {elem1: null, chance: 0.05}
    }
}
//apparently us coins are made of copper and nickel aka cupro-nickel  
elements.u_s_coin = {
    color: "#7f8082",
    behavior: behaviors.POWDER,
    category: "currency",
    state: "solid",
    tempHigh: 1175,
    stateHigh: "cupro_nickel",
    density: 8950,
    conduct: 0.8,
    hardness: 0.7,
    reactions: {
        "body": {elem1: null, chance: 0.05}
    }
}  
elements.cupro_nickel = {
    color: "#995829",
    behavior: behaviors.MOLTEN,
    category: "states",
    state: "liquid",
    temp: 1300,
    tempLow: 1175,
    stateLow: "coin",
    density: 7900,
    viscosity: 1000,
    conduct: 0.8,
}
if (!elements.molten_copper.reactions) elements.molten_nickel.reactions = {};
elements.molten_copper.reactions.molten_nickel = { elem1: "cupro_nickel", elem2: null }

elements.euro = {
    color: "#ba7fb4",
    behavior: [
        "XX|XX|XX",
        "XX|FX%0.25|XX",
        "M2%15|M1%15|M1%15",
    ],
    category: "currency",
    state: "solid",
    tempHigh: 230,
    stateHigh: ["ash", "smoke", "smoke", "smoke"],
    burn: 20,
    burnTime: 200,
    burnInto: ["ash", "smoke", "smoke", "smoke"],
    breakInto: "confetti",
    reactions: {
        "body": {elem1: null, chance: 0.05}
    }
}
elements.euro_coin = {
    color: "#9e8957",
    behavior: behaviors.POWDER,
    category: "currency",
    state: "solid",
    tempHigh: 1175,
    stateHigh: "nordic_gold",
    density: 8950,
    conduct: 0.8,
    hardness: 0.7,
    reactions: {
        "body": {elem1: null, chance: 0.05}
    }
}   
elements.a_u_dollar = {
    color: "#9e5798",
    behavior: [
        "XX|XX|XX",
        "XX|FX%0.25|XX",
        "M2%15|M1%15|M1%15",
    ],
    category: "currency",
    state: "solid",
    tempHigh: 230,
    stateHigh: ["ash", "smoke", "smoke", "smoke"],
    burn: 20,
    burnTime: 200,
    burnInto: ["ash", "smoke", "smoke", "smoke"],
    breakInto: "confetti",
    reactions: {
        "body": {elem1: null, chance: 0.05}
    }
}
elements.a_u_coin = {
    color: "#85754c",
    behavior: behaviors.POWDER,
    category: "currency",
    state: "solid",
    tempHigh: 1175,
    stateHigh: "cupro_nickel",
    density: 8950,
    conduct: 0.8,
    hardness: 0.7,
    reactions: {
        "body": {elem1: null, chance: 0.05}
    }
}
elements.chocolate_coin = {
    color: "#472b19",
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    tempHigh: 31,
    stateHigh: ["melted_chocolate", "melted_chocolate", "melted_chocolate", "melted_chocolate", "melted_chocolate", "melted_chocolate", "melted_chocolate",  "melted_chocolate", "melted_chocolate", "melted_chocolate", "melted_chocolate", "melted_chocolate", "melted_chocolate", "gold_coin"],
    density: 1325,
    isFood: true,
    reactions: {
        "body": {elem1: null, chance: 0.05},
    }
}
elements.s_g_dollar = {
    color: "#e3a32b",
    behavior: [
        "XX|XX|XX",
        "XX|FX%0.25|XX",
        "M2%15|M1%15|M1%15",
    ],
    category: "currency",
    state: "solid",
    tempHigh: 230,
    stateHigh: ["ash", "smoke", "smoke", "smoke"],
    burn: 20,
    burnTime: 200,
    burnInto: ["ash", "smoke", "smoke", "smoke"],
    breakInto: "confetti",
    reactions: {
        "body": {elem1: null, chance: 0.05}
    }
}
elements.s_g_coin = {
    color: "#c8cbcc",
    behavior: behaviors.POWDER,
    category: "currency",
    state: "solid",
    tempHigh: 1175,
    stateHigh: ["cupro_nickel", "nordic_gold"],
    density: 8950,
    conduct: 0.8,
    hardness: 0.7,
    reactions: {
        "body": {elem1: null, chance: 0.05}
    }
}
elements.nordic_gold = {
    color: "#b09b61",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    tempHigh: 1175,
    stateHigh: "molten_nordic_gold",
    conduct: 0.8,
}
elements.molten_nordic_gold = {
    color: "#a1742d",
    behavior: behaviors.MOLTEN,
    category: "states",
    state: "liquid",
    temp: 1300,
    tempLow: 1175,
    stateLow: "coin",
    density: 7900,
    viscosity: 1000,
    conduct: 0.8,
}
if (!elements.molten_aluminum.reactions) elements.molten_bronze.reactions = {};
elements.molten_aluminum.reactions.molten_bronze = { elem1: "molten_nordic_gold", elem2: null }

elements.greedy_block = {
    color: "#ffdd00",
    behavior: behaviors.WALL,
    category: "special",
    state: "solid",
    reactions: {
        "generic_dollar": {elem2: null},
        "generic_coin": {elem2: null},
        "u_s_dollar": {elem2: null},
        "u_s_coin": {elem2: null},
        "euro": {elem2: null},
        "euro_coin": {elem2: null},
        "a_u_dollar": {elem2: null},
        "a_u_coin": {elem2: null},
        "s_g_dollar": {elem2: null},
        "s_g_coin": {elem2: null},
        "chocolate_coin": {elem2: null},
        "gold_coin": {elem2: null},
        "diamond": {elem2: null},
        "head": {elem1: null, chance: 0.2},
        "body": {elem1: null, chance: 0.2},
    }
}