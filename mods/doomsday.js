elements.Doomsday = {
    color: "#ff0000",
    behavior: [
        "XX|EX:100000>plasma,plasma,plasma,plasma,fire,fire,plasma,plasma,plasma,plasma,fire,fire,fire,fire,fire,plasma,plasma,plasma,plasma,fire,fire,fire,fire,fire,fire,fire,fire,fire,fire,plasma,plasma,plasma,plasma,fire,fire,fire,fire,fire|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:10000>plasma,plasma,plasma,plasma,fire,fire,fire,fire,fire,plasma,plasma,plasma,plasma,fire,fire,fire,fire,fire,fire,fire,fire,fire,fire,plasma,plasma,plasma,plasma,fire,fire,fire,fire,fire|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1600,
    excludeRandom: true,
    alias: "Say goodbye to your computer chucklenuts",
    cooldown: defaultCooldown
}
elements.Plasma_cannon = {
    color: "#6a00ff",
    behavior: [
        "XX|EX:90>plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:90>plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1600,
    excludeRandom: true,
    alias: "Plasma cannon :D",
    cooldown: defaultCooldown
}
elements.Cluster_Nuke = {
    color: "#6a00ff",
    behavior: [
        "XX|EX:90>plasma,fire,nuke|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:90>plasma,fire,fire,fire,nuke,nuke,nuke|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1600,
    excludeRandom: true,
    alias: "Plasma cannon :D",
    cooldown: defaultCooldown
}
elements.Infinibomb = {
    color: "#6a00ff",
    behavior: [
        "XX|EX:20>plasma,fire|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:20>plasma,fire,fire,fire,Infinibomb|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1600,
    excludeRandom: true,
    alias: "Plasma cannon :D",
    cooldown: defaultCooldown
}