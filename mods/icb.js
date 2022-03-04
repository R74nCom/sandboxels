for (var i = 3; i <= 15; i++) {
    elements[`cluster_bomb_${i}`] = {
        name: `${i}- cluster bomb`,
        color: "#7d776d",
        behavior: [
            `XX|EX:10>smoke,smoke,smoke,smoke,smoke,cluster_bomb_${i-1}|XX`,
            "XX|XX|XX",
            `M2|M1 AND EX:10>smoke,smoke,smoke,smoke,smoke,cluster_bomb_${i-1}|M2`,
        ],
        category: "weapons",
        state: "solid",
        density: 1300,
        tempHigh: 1455.5,
        stateHigh: "molten_steel",
        excludeRandom: true,
    }
}

elements.cluster_bomb_2 = {
    color: "#7d776d",
    behavior: [
        "XX|EX:10>smoke,smoke,smoke,smoke,smoke,cluster_bomb|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:10>smoke,smoke,smoke,smoke,smoke,cluster_bomb|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    tempHigh: 1455.5,
    stateHigh: "molten_steel",
    excludeRandom: true,
}
