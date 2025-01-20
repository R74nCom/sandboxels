//betterelec.js, I will add more soon

elements.transformer = {
    tempHigh: 114,
    tempLow: -101,
    stateHigh: "spark",
    stateLow: "coldfire",
    color: "#ffffff",
	behavior: behaviors.WALL,
	category: "machines",
	state: "solid",
    conduct: 1,
    }

elements.battery_box = {
    color: "#cfc9b4",
    category: "machines",
     behavior: [
        "XX|SH|XX", // shocks (adds charge)
        "SH|SH|XX",
        "XX|XX|SH", 
     ]
}

elements.spark = {
    behavior: behaviors.FOAM,
    category: "energy",
    state: "gas",
    color: "#e07d26",
    conduct: 1,
}

elements.light_without_particles = {
     color: "#ebebc3",
    buttonColor: "#a8a897",
    renderer: renderPresets.LED,
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    category: "machines",
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_copper"],
    conduct: 1,
    breakInto: "glass_shard",
    forceSaveColor: true
}

elements.wood.conduct = 1
