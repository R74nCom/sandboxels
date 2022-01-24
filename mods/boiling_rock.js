elements.vaporized_rock = {
    color: ["#ffc94a", "#fcd34c", "#ffae36"],
    behavior: [
        "M2|M1|M2",
        "M1|XX|M1",
        "M2|M1|M2",
    ],
    reactions: {
        "vaporized_rock": { "elem1": null, "elem2": "lava_cloud", "chance":0.3, "y":[0,15] },
        "lava_cloud": { "elem1": "lava_cloud", "chance":0.4, "y":[0,15] },
    },
    density: 2452, //just magma density * 0.9
    temp: 3100,
    tempLow: 3000,
    stateLow: "magma",
    category: "gases",
    state: "gas",
    hidden: true,
},
elements.magma.tempHigh = 3000
elements.magma.stateHigh = "vaporized_rock"
elements.lava_cloud = {
    color: ["#b57b2a", "#d47b15", "#cf7317", "#db830f"],
    behavior: [
        "XX|XX|XX",
        "M1%7|CH:magma%0.05|M1%7",
        "XX|XX|XX",
    ],
    density: 2,
    temp: 3000,
    tempLow: 850,
    stateLow: "rock_cloud",
    category: "gases",
    state: "gas",
},
elements.rock_cloud = {
    color: ["#ba8843", "#c28a4a", "#bf8245", "#c4904b"],
    behavior: [
        "XX|XX|XX",
        "M1%7|CH:basalt,basalt,basalt,rock%0.05|M1%7",
        "XX|XX|XX",
    ],
    density: 2,
    temp: 800,
    tempHigh: 3000,
    stateHigh: "lava_cloud",
    category: "gases",
    state: "gas",
},

elements.vaporized_glass = {
    color: ["#D6B049","#E8D957","#E8AE57"],
    behavior: [
        "M2|M1|M2",
        "M1|XX|M1",
        "M2|M1|M2",
    ],
    reactions: {
        "vaporized_glass": { "elem1": null, "elem2": "hot_glass_cloud", "chance":0.3, "y":[0,15] },
        "hot_glass_cloud": { "elem1": "glass_cloud", "chance":0.4, "y":[0,15] },
    },
    density: 2, //very rough approximation based on https://nvlpubs.nist.gov/nistpubs/jres/46/jresv46n3p176_A1b.pdf
    temp: 2300, //https://www.sciencealert.com/did-this-piece-of-glass-really-break-a-law-of-thermodynamics
    tempLow: 2200,
    stateLow: "molten_glass",
    category: "gases",
    state: "gas",
    hidden: true,
},
elements.hot_glass_cloud = {
    color: ["#B69089","#C8B997","#C88E77"],
    behavior: [
        "XX|XX|XX",
        "M1%7|CH:molten_glass%0.05|M1%7",
        "XX|XX|XX",
    ],
    density: 2,
    temp: 2300,
    tempLow: 2200,
    stateLow: "cold_glass_cloud",
    category: "gases",
    state: "gas",
},
elements.cold_glass_cloud = {
    color: ["#967089","#A89997","#A86E77"],
    behavior: [
        "XX|XX|XX",
        "M1%7|CH:glass_shard%0.05|M1%7",
        "XX|XX|XX",
    ],
    density: 2,
    temp: 2000,
    tempHigh: 2200,
    stateHigh: "hot_glass_cloud",
    category: "gases",
    state: "gas",
},

elements.molten_glass = {
    tempHigh: 2200,
    stateHigh: "vaporized_glass",
}

runAfterLoad(function() {
    if(enabledMods.includes("mods/fey_and_more.js")) {
        elements.molten_glass.tempHigh = 2200
        elements.molten_glass.stateHigh = "vaporized_glass"

        //mistake
            elements.concoction.reactions.vaporized_rock = { "elem1": "mistake", "elem2": null }
            elements.concoction.reactions.lava_cloud = { "elem1": "mistake", "elem2": null }
            elements.concoction.reactions.rock_cloud = { "elem1": "mistake", "elem2": null }
            elements.concoction.reactions.vaporized_glass = { "elem1": "mistake", "elem2": null }
            //elements.concoction.reactions.glass_cloud = { "elem1": "mistake", "elem2": null }
            //elements.concoction.reactions.glass_cloud = { "elem1": "mistake", "elem2": null }
    };
});
