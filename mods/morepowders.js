elements.powder = {
    color: ["#786d6d", "#968888"],
    behavior: behaviors.POWDER,
    category: "more_powders",
        state: "solid",
        reactions: {
            "glue": { elem1: "smoke", elem2: "sticky_powder" },
            "foam": { elem1: "foam_powder", elem2: "foam_powder" },
            "electric": { elem1: null, elem2: "electric_powder" },
            "dust": { elem1: null, elem2: "void_powder" },
            "grenade": { elem1: null, elem2: "powder_nuke" },
            "dna": { elem1: null, elem2: "alive_powder" },
            "fire": { elem1: null, elem2: "fire_powder" },
            "cold_fire": { elem1: null, elem2: "cold_fire_powder" },
        },
}
elements.gas_powder = {
    color: "#b98ffc",
    behavior: behaviors.POWDER,
    category: "more_powders",
state: "gas",
stateHigh: "smoke",
tempHigh: 2000,
reactions: {
    "up_powder": { elem1: null, elem2: "up_gas_powder" },
    "grenade": { elem1: null, elem2: "gas_powder_nuke" },
},
tempLow: -200,
stateLow: "powder",
}
elements.up_powder = {
    color: ["#8ffcb9", "#71cac5"],
    behavior: behaviors.AGPOWDER,
    category: "more_powders",
state: "solid",
tempLow: -200,
stateLow: "powder",
reactions: {
    "grenade": { elem1: null, elem2: "up_powder_nuke" },
},
breakInto: "up_powder_shard",
},
elements.up_powder_shard = {
    color: ["#54a59b", "#408792"],
    behavior: behaviors.POWDER,
    category: "more_powders",
state: "solid",
tempLow: -200,
stateLow: "up_powder",
},
elements.up_gas_powder = {
    color: ["#a2c5da", "#a0a7d8"],
    behavior: behaviors.AGPOWDER,
    category: "more_powders",
state: "gas",
stateHigh: "gas_powder",
tempHigh: 1000,
hidden: true,
tempLow: -200,
stateLow: "powder",
}
elements.slow_powder = {
    color: "#c9445c",
    behavior:[
        "XX|XX|XX",
        "XX|XX|XX",
        "M2%20|M1%20|M2%20",
        ],
    category: "more_powders",
state: "solid",
stateHigh: "smoke",
tempHigh: 2000,
reactions: {
    "gas_powder": { elem1: null, elem2: "slow_gas_powder" },
    "up_powder": { elem1: null, elem2: "slow_up_powder" },
    "grenade": { elem1: null, elem2: "slow_powder_nuke" },
},
tempLow: -200,
stateLow: "powder",
}
elements.slow_gas_powder = {
    color: "#c069aa",
    behavior:[
        "XX|XX|XX",
        "XX|XX|XX",
        "M2%20|M1%20|M2%20",
        ],
    category: "more_powders",
state: "gas",
stateHigh: "gas_powder",
tempHigh: 1000,
hidden: true,
tempLow: -200,
stateLow: "powder",
}
elements.slow_up_powder = {
    color:["#aba18a", "#a4aa8a"],
    behavior:[
        "M2%20|M1%20|M2%20",
        "XX|XX|XX",
        "XX|XX|XX",
        ],
    category: "more_powders",
state: "solid",
stateHigh: "up_powder",
tempHigh: 1000,
hidden: true,
reactions: {
    "slow_powder": { elem1: null, elem2: "slower_up_powder" },
},
tempLow: -200,
stateLow: "powder",
}
elements.slower_up_powder = {
    color: ["#b5827b", "#b59e7b"],
    behavior:[
        "M2%10|M1%10|M2%10",
        "XX|XX|XX",
        "XX|XX|XX",
        ],
    category: "more_powders",
state: "solid",
stateHigh: "up_powder",
tempHigh: 1000,
hidden: true,
tempLow: -200,
stateLow: "powder",
}
elements.sticky_powder = {
    color: ["#badd96", "#96dd96"],
    behavior:[
        "ST|ST|ST",
        "ST|XX|ST",
        "ST AND M2|ST AND M1|ST AND M2",
        ],
        category: "more_powders",
        state: "solid",
        hidden: true,
        tempLow: -200,
        stateLow: "powder",
    }
    elements.foam_powder = {
        color: ["#e0be8b", "#ffffff"],
        behavior: behaviors.FOAM,
        category: "more_powders",
    state: "gas",
    tempLow: -200,
    stateLow: "frozen_foam_powder",
    hidden: true
    }
    elements.electric_powder = {
        color: ["#eae463", "#f9fc45"],
        behavior: [
            "SH|SH|SH",
        "SH|LB:electric%5|SH",
        "SH AND M2|SH AND M1|SH AND M2",
        ],
        category: "more_powders",
            state: "solid",
            reactions: {
            },
            stateHigh: "smoke",
    tempHigh: 500,
    tempLow: -1000,
    stateLow: "powder",
    hidden: true
    }
    elements.void_powder = {
        color: "#303031",
        category: "more_powders",
    state: "solid",
    hidden: true,
    behavior: [
        "DL|DL|DL",
        "DL|XX|DL",
        "DL AND M2|DL AND M1|DL AND M2",
    ]
    }
    elements.powder_nuke = {
        color: "#46745d",
        behavior: [
            "XX|XX|XX",
            "XX|XX|XX",
            "XX|M1 AND EX:25>powder|XX",
        ],
        category: "more_powders",
        state: "solid",
        hidden:true,
        excludeRandom: true
    }
    elements.gas_powder_nuke = {
        color: "#406a6a",
        behavior: [
            "XX|XX|XX",
            "XX|XX|XX",
            "XX|M1 AND EX:25>gas_powder|XX",
        ],
        category: "more_powders",
        state: "gas",
        hidden:true,
        excludeRandom: true
    }
    elements.up_powder_nuke = {
        color: "#688686",
        behavior: [
            "XX|M1 AND EX:25>up_powder|XX",
            "XX|XX|XX",
            "XX|XX|XX",
        ],
        category: "more_powders",
        state: "solid",
        hidden:true,
        excludeRandom: true
    }
    elements.slow_powder_nuke = {
        color: "#746262",
        behavior: [
            "XX|XX|XX",
            "XX|XX|XX",
            "M1%20|M1%20 AND EX:22>slow_powder|M1%20",
        ],
        category: "more_powders",
        state: "solid",
        hidden:true,
        excludeRandom: true
    }
    elements.rainbow_powder = {
        color: ["#ff0000","#ff8800","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"],
        tick: function(pixel) {
            var t = pixelTicks+pixel.x+pixel.y;
            var r = Math.floor(127*(1-Math.cos(t*Math.PI/90)));
            var g = Math.floor(127*(1-Math.cos(t*Math.PI/90+2*Math.PI/3)));
            var b = Math.floor(127*(1-Math.cos(t*Math.PI/90+4*Math.PI/3)));
            pixel.color = "rgb("+r+","+g+","+b+")";
        },
        behavior: behaviors.POWDER,
        category: "more_powders",
        state: "solid",
        breakInto: "static",
    }
    elements.alive_powder = {
        color: ["#f74177", "#f78177"],
        behavior: behaviors.CRAWLER,
        category: "more_powders",
            state: "solid",
            stateHigh: "smoke",
    tempHigh: 100,
    tempLow: -250,
    stateLow: "frozen_meat",
    stateHigh: "cooked_powder",
    }
    elements.cooked_powder = {
        color: ["#b53811", "#b54211"],
        behavior: behaviors.POWDER,
        category: "more_powders",
            state: "solid",
            stateHigh: "smoke",
    tempHigh: 400,
    tempLow: -250,
    stateLow: "frozen_meat",
    stateHigh: "smoke",
    }
    elements.fire_powder = {
        color: ["#c07d5d", "#c23000", "#c0521b"],
        behavior: [
            "XX|CR:fire%2|XX",
            "XX|LB:fire%4|XX",
            "M2|M1|M2",
        ],
        category: "more_powders",
            state: "solid",
    density: 997,
    conduct: 0.02,
    stain: -0.5,
    temp:218,
    tempLow: -250,
    stateLow: "coldfire_powder",
    }
    elements.coldfire_powder = {
        color: ["#004fbd", "#138fb9", "#00b8b1"],
        behavior: [
            "XX|CR:cold_fire%2|XX",
            "XX|LB:cold_fire%4|XX",
            "M2|M1|M2",
        ],
        category: "more_powders",
            state: "solid",
    density: 997,
    conduct: 0.02,
    stain: -0.5,
    temp:-104,
    tempHigh: 250,
    stateHigh: "fire_powder",
    }
    elements.left_powder = {
        color: "#645bb0",
        behavior:[
            "M2|XX|XX",
            "M1|XX|XX",
            "M2|XX|XX",
            ],
        category: "more_powders",
    state: "solid",
        }
    elements.right_powder = {
        color: "#b95b5b",
        behavior:[
            "XX|XX|M2",
            "XX|XX|M1",
            "XX|XX|M2",
            ],
        category: "more_powders",
    state: "solid",
        }
    elements.color_powder = {
        color: ["#6b2e2e","#6b4f2e","#6b6b2e","#2e6b2e","#2e6b6b","#2e2e6b","#6b2e6b"],
        behavior: behaviors.POWDER,
        category: "more_powders",
    state: "solid",
    density: 1.977,
    customColor: true
        }
        worldgentypes.powder_world = {
            layers: [
                [0.95, "sticky_powder"],
                [0.50, "powder"],
                [0.25, "slow_up_powder"],
                [0.15, "slower_up_powder"],
            ],
            decor: [ // [element, chance, distance from top]
                ["alive_powder", 0.08],
                // ["alive_powder", 0.025, 10],
            ],
            baseHeight: 0.35
        }
