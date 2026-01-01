elements.broken_core = {
    color: "#2e2e2e",
    behavior: behaviors.POWDER,
    temp: 30,
    desc: "Broken core. Result of overheat of safe/medium type cores.",
    state: "solid",
    category: "cores",
}

elements.fa_explosion = {
    color: ["#00ffa2", "#06c982"],
    behavior: [
        "XX|XX|XX",
        "XX|EX:390>plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,radiation,radiation,radiation,radiation,radiation,supernova,supernova,oxygen|XX",
        "XX|XX|XX",
    ],
    category: "cores",
    temp: 5473876573873892387,
    desc: "SUPER POWERFUL EXPLOSION.",
}

elements.safe_core = {
    color: "#ffc400",
    behavior: behaviors.WALL,
    temp: 300,
    desc: "Basic core. Doesn't heat up very much.",
    category: "cores",
    state: "solid",
    stateHigh: "broken_core",
    tempHigh: 4000,
    tick: function (pixel) {
        pixel.temp += 8;
    },
}

elements.nuclear_core = {
    color: "#eaff00",
    behavior: behaviors.WALL,
    temp: 600,
    desc: "Nuclear core. Doesn't heat up... much.",
    category: "cores",
    state: "solid",
    stateHigh: "broken_core",
    tempHigh: 9000,
    tick: function (pixel) {
        pixel.temp += 21;
    },
    hardness: 1,
}

elements.thermonuclear_core = {
    color: "#03fc5e",
    behavior: behaviors.WALL,
    temp: 9000,
    desc: "Thermo-nuclear core. USE WITH EXTREME CAUTION.",
    category: "cores",
    state: "solid",
    stateHigh: "n_explosion",
    tempHigh: 96000,
    tick: function (pixel) {
        pixel.temp += 147;
    },
    hardness: 1,
}

elements.thermonuclear_fusion_core = {
    color: "#630134",
    behavior: behaviors.WALL,
    temp: 754803,
    desc: "Fusion core, basically the most destructive core. KEEP OUT AND DON'T USE.",
    category: "cores",
    state: "solid",
    stateHigh: "fa_explosion",
    tempHigh: 9600000,
    tick: function (pixel) {
        pixel.temp += 19047;
    },
    hardness: 1,
}

elements.reactor_fluid = {
    color: "#00a5b8",
    behavior: behaviors.LIQUID,
    temp: -50,
    tempHigh: 500,
    stateHigh: "steam",
    desc: "Nuclear reactor cooling fluid. You can use it instead of water.",
    state: "liquid",
    category: "cores"
}
