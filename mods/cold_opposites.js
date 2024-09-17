//Made by SuperASAX or SuperAAX

elements.torch = {
    color: "#d68542",
    behavior: [
        "CR:fire%50|CR:fire|CR:fire%50",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    reactions: {
        "water": { elem1:"wood" },
        "sugar_water": { elem1:"wood" },
        "salt_water": { elem1:"wood" },
        "seltzer": { elem1:"wood" },
        "dirty_water": { elem1:"wood" },
        "pool_water": { elem1:"wood" },
        "steam": { elem1:"wood" },
        "smog": { elem1:"wood" },
        "rain_cloud": { elem1:"wood" },
        "cloud": { elem1:"wood" },
        "snow_cloud": { elem1:"wood" },
        "hail_cloud": { elem1:"wood" },
        "thunder_cloud": { elem1:"wood" },
        "ice_nine": { elem1:"wood" }
    },
    temp:600,
    category:"special",
    breakInto: "sawdust",
    tempLow: -273,
    stateLow: "wood"
},
elements.cold_torch = {
    color: "#d68542",
    behavior: [
        "CR:cold_fire%50|CR:cold_fire|CR:cold_fire%50",
        "XX|CO|XX",
        "XX|XX|XX",
    ],
    temp:-273,
    category:"special",
    breakInto: "sawdust",
    tempHigh: 0,
    stateHigh: "wood"
},
elements.extinguisher= {
    color: "#d6baa9",
    behavior: [
        "CR:eanprop|CR:eanprop|CR:eanprop",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    temp:-30,
    category: "machines",
    conduct: 0.73
},
elements.eanprop = {
    color: "#cfcfcf",
    behavior: behaviors.GAS,
    temp:-25,
    category: "gases",
    tempLow: -43,
    stateLow: "cold_fire",
    state: "gas",
    density: 2.0098,
    alias: "gas"
};