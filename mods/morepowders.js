elements.template = {
    color: "#ffffff",
    category: "more_powders",
    state: "solid",
    hidden: true,
    behavior: behaviors.POWDER
    }
elements.powder = {
    color: ["#c17d17", "#f2a32e"],
    behavior: behaviors.POWDER,
    category: "more_powders",
        state: "solid",
        reactions: {
            "glue": { elem1: "smoke", elem2: "sticky_powder" },
            "foam": { elem1: "foam_powder", elem2: "foam_powder" },
            "electric": { elem1: null, elem2: "electric_powder" },
            "dust": { elem1: null, elem2: "void_powder" },
        },
        stateHigh: "smoke",
tempHigh: 200,
tempLow: -200,
stateLow: "cold_powder",
stateHigh: "hot_powder",
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
},
tempLow: -200,
stateLow: "powder",
}
elements.up_powder = {
    color: "#8ffcb9",
    behavior: behaviors.AGPOWDER,
    category: "more_powders",
state: "solid",
tempLow: -200,
stateLow: "powder",
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
    elements.frozen_foam_powder = {
        color: ["#c0eded", "#a7cfba"],
        behavior: behaviors.POWDER,
        category: "more_powders",
    state: "gas",
    tempHigh: 1000,
    stateHigh: "foam_powder",
    hidden: true
    }
    elements.electric_powder = {
        color: ["#eae463", "#f9fc45"],
        behavior: [
            "SH|SH|SH",
        "SH|XX|SH",
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
    elements.hot_powder = {
        color: ["#8a3b87", "#d43a3a", "#d43a3a"],
        behavior:[
            "HT|HT|HT",
            "HT|XX|HT",
            "HT AND M2|HT AND M1|HT AND M2",
            ],
        category: "more_powders",
    state: "solid",
    tempLow: -200,
    stateLow: "cold_powder",
    temp: 200,
    hidden: true
    }
    elements.cold_powder = {
        color: ["#8a3b87", "#3f3cd4", "#3f3cd4"],
        behavior:[
            "CO|CO|CO",
            "CO|XX|CO",
            "CO AND M2|CO AND M1|CO AND M2",
            ],
        category: "more_powders",
    state: "solid",
    tempHigh: 400,
    stateHigh: "hot_powder",
    temp: -200,
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