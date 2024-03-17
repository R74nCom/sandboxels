elements.super_bomb = { // create the bomb
    color: "#524c41", //color
    behavior: [
        "XX|EX:250|XX", //range
        "XX|XX|XX",
        "M2|M1 AND EX:250|M2", //range
    ],
    category: "weapons", 
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}