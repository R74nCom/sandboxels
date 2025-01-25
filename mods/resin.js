/*
//there's gonna be a lot
//based on 2024 minecraft april fools
//todo list: chemical, diorite, ender, fishy, galactic, honey, insect, jinn, kraken, lunar, metallic, nether, organic, and pigment impurities
    reactions: { //do reactions
    "fletching_station" = { "elem1":null, "elem2":"toxic_resin_10" }
    },
*/


elements.fletching_station = {
    name: "fletching_table",
    color: elements.head.color,
    behavior: behaviors.POWDER,
    tempHigh: 345,
    stateHigh: ["smoke"],
    breakInto: ["feather","feather","feather","sawdust","target"],
    category: "fletching",
    state: "solid",
    density: 1200,
},

elements.target = {
    color: elements.dynamite.color,
    behavior: behaviors.POWDER,
    tempHigh: 250,
    stateHigh: ["molten_plastic"],
    breakInto: ["plastic"],
    category: "fletching",
    state: "solid",
    density: 1200,
},

elements.normal_resin = {
    name: "resin",
    color: elements.sap.color,
    behavior: behaviors.POWDER,
    tempHigh: 345,
    stateHigh: ["smoke"],
    conduct: 1,
    breakInto: ["sap"],
    category: "resin",
    state: "solid",
    density: 1540,
},

elements.toxic_resin_1 = {
    name: "resin",
    hidden: "true",
    color: elements.honey.color,
    behavior: behaviors.POWDER,
    tempHigh: 345,
    stateHigh: ["smoke"],
    conduct: 1,
    breakInto: ["sap"],
    category: "resin",
    state: "solid",
    density: 1540,
    desc: "Abysmal Clarity, Air Bubble Impurities",
    reactions: {
    "fletching_station" = { "elem1":null, "elem2":"toxic_resin_2" }
    },
},

elements.toxic_resin_2 = {
    name: "resin",
    hidden: "true",
    color: elements.honey.color,
    behavior: behaviors.POWDER,
    tempHigh: 345,
    stateHigh: ["smoke"],
    conduct: 1,
    breakInto: ["sap"],
    category: "resin",
    state: "solid",
    density: 1540,
    desc: "Blemished Clarity, Air Bubble Impurities",
    reactions: {
    "fletching_station" = { "elem1":null, "elem2":"toxic_resin_3" }
    },
},

elements.toxic_resin_3 = {
    name: "resin",
    hidden: "true",
    color: elements.honey.color,
    behavior: behaviors.POWDER,
    tempHigh: 345,
    stateHigh: ["smoke"],
    conduct: 1,
    breakInto: ["sap"],
    category: "resin",
    state: "solid",
    density: 1540,
    desc: "Clouded Clarity, Air Bubble Impurities",
    reactions: {
    "fletching_station" = { "elem1":null, "elem2":"toxic_resin_4" }
    },
},

elements.toxic_resin_4 = {
    name: "resin",
    hidden: "true",
    color: elements.honey.color,
    behavior: behaviors.POWDER,
    tempHigh: 345,
    stateHigh: ["smoke"],
    conduct: 1,
    breakInto: ["sap"],
    category: "resin",
    state: "solid",
    density: 1540,
    desc: "Dull Clarity, Air Bubble Impurities",
    reactions: {
    "fletching_station" = { "elem1":null, "elem2":"toxic_resin_5" }
    },
},

elements.toxic_resin_5 = {
    name: "resin",
    hidden: "true",
    color: elements.honey.color,
    behavior: behaviors.POWDER,
    tempHigh: 345,
    stateHigh: ["smoke"],
    conduct: 1,
    breakInto: ["sap"],
    category: "resin",
    state: "solid",
    density: 1540,
    desc: "Eventual Clarity, Air Bubble Impurities",
    reactions: {
    "fletching_station" = { "elem1":null, "elem2":"toxic_resin_6" }
    },
},

elements.toxic_resin_6 = {
    name: "resin",
    hidden: "true",
    color: elements.honey.color,
    behavior: behaviors.POWDER,
    tempHigh: 345,
    stateHigh: ["smoke"],
    conduct: 1,
    breakInto: ["sap"],
    category: "resin",
    state: "solid",
    density: 1540,
    desc: "Faint Clarity, Air Bubble Impurities",
    reactions: {
    "fletching_station" = { "elem1":null, "elem2":"toxic_resin_10" }
    },
},

elements.toxic_resin_7 = {
    name: "resin",
    hidden: "true",
    color: elements.honey.color,
    behavior: behaviors.POWDER,
    tempHigh: 345,
    stateHigh: ["smoke"],
    conduct: 1,
    breakInto: ["sap"],
    category: "resin",
    state: "solid",
    density: 1540,
    desc: "Glimmering Clarity, Air Bubble Impurities",
    reactions: {
    "fletching_station" = { "elem1":null, "elem2":"toxic_resin_8" }
    },
},

elements.toxic_resin_8 = {
    name: "resin",
    hidden: "true",
    color: elements.honey.color,
    behavior: behaviors.POWDER,
    tempHigh: 345,
    stateHigh: ["smoke"],
    conduct: 1,
    breakInto: ["sap"],
    category: "resin",
    state: "solid",
    density: 1540,
    desc: "Hazy Clarity, Air Bubble Impurities",
    reactions: {
    "fletching_station" = { "elem1":null, "elem2":"toxic_resin_9" }
    },
},

elements.toxic_resin_9 = {
    name: "resin",
    hidden: "true",
    color: elements.honey.color,
    behavior: behaviors.POWDER,
    tempHigh: 345,
    stateHigh: ["smoke"],
    conduct: 1,
    breakInto: ["sap"],
    category: "resin",
    state: "solid",
    density: 1540,
    desc: "Icy Clarity, Air Bubble Impurities",
    reactions: {
    "fletching_station" = { "elem1":null, "elem2":"toxic_resin_a" }
    },
},

elements.toxic_resin_a = {
    name: "resin",
    hidden: "true",
    color: elements.honey.color,
    behavior: behaviors.POWDER,
    tempHigh: 345,
    stateHigh: ["smoke"],
    conduct: 1,
    breakInto: ["sap"],
    category: "resin",
    state: "solid",
    density: 1540,
    desc: "Jewel Clarity, Air Bubble Impurities",
    reactions: {
    "fletching_station" = { "elem1":null, "elem2":"amber" }
    },
},

elements.toxic_resin_b = {
    name: "resin",
    hidden: "true",
    color: elements.honey.color,
    behavior: behaviors.POWDER,
    tempHigh: 345,
    stateHigh: ["smoke"],
    conduct: 1,
    breakInto: ["sap"],
    category: "resin",
    state: "solid",
    density: 1540,
    desc: "Abysmal Clarity, Bug Impurities",
    reactions: {
    "fletching_station" = { "elem1":null, "elem2":"toxic_resin_c" }
    },
},

elements.toxic_resin_c = {
    name: "resin",
    hidden: "true",
    color: elements.honey.color,
    behavior: behaviors.POWDER,
    tempHigh: 345,
    stateHigh: ["smoke"],
    conduct: 1,
    breakInto: ["sap"],
    category: "resin",
    state: "solid",
    density: 1540,
    desc: "Blemished Clarity, Bug Impurities",
    reactions: {
    "fletching_station" = { "elem1":null, "elem2":"toxic_resin_d" }
    },
},

elements.toxic_resin_d = {
    name: "resin",
    hidden: "true",
    color: elements.honey.color,
    behavior: behaviors.POWDER,
    tempHigh: 345,
    stateHigh: ["smoke"],
    conduct: 1,
    breakInto: ["sap"],
    category: "resin",
    state: "solid",
    density: 1540,
    desc: "Clouded Clarity, Bug Impurities",
    reactions: {
    "fletching_station" = { "elem1":null, "elem2":"toxic_resin_e" }
    },
},

elements.toxic_resin_e = {
    name: "resin",
    hidden: "true",
    color: elements.honey.color,
    behavior: behaviors.POWDER,
    tempHigh: 345,
    stateHigh: ["smoke"],
    conduct: 1,
    breakInto: ["sap"],
    category: "resin",
    state: "solid",
    density: 1540,
    desc: "Dull Clarity, Bug Impurities",
    reactions: {
    "fletching_station" = { "elem1":null, "elem2":"toxic_resin_f" }
    },
},

elements.toxic_resin_f = {
    name: "resin",
    hidden: "true",
    color: elements.honey.color,
    behavior: behaviors.POWDER,
    tempHigh: 345,
    stateHigh: ["smoke"],
    conduct: 1,
    breakInto: ["sap"],
    category: "resin",
    state: "solid",
    density: 1540,
    desc: "Eventual Clarity, Bug Impurities",
    reactions: {
    "fletching_station" = { "elem1":null, "elem2":"toxic_resin_10" }
    },
},

elements.toxic_resin_10 = {
    name: "resin",
    hidden: "true",
    color: elements.honey.color,
    behavior: behaviors.POWDER,
    tempHigh: 345,
    stateHigh: ["smoke"],
    conduct: 1,
    breakInto: ["sap"],
    category: "resin",
    state: "solid",
    density: 1540,
    desc: "Faint Clarity, Bug Impurities",
    reactions: {
    "fletching_station" = { "elem1":null, "elem2":"toxic_resin_11" }
    },
},

elements.toxic_resin_11 = {
    name: "resin",
    hidden: "true",
    color: elements.honey.color,
    behavior: behaviors.POWDER,
    tempHigh: 345,
    stateHigh: ["smoke"],
    conduct: 1,
    breakInto: ["sap"],
    category: "resin",
    state: "solid",
    density: 1540,
    desc: "Glimmering Clarity, Bug Impurities",
    reactions: {
    "fletching_station" = { "elem1":null, "elem2":"toxic_resin_12" }
    },
},

elements.toxic_resin_12 = {
    name: "resin",
    hidden: "true",
    color: elements.honey.color,
    behavior: behaviors.POWDER,
    tempHigh: 345,
    stateHigh: ["smoke"],
    conduct: 1,
    breakInto: ["sap"],
    category: "resin",
    state: "solid",
    density: 1540,
    desc: "Hazy Clarity, Bug Impurities",
    reactions: {
    "fletching_station" = { "elem1":null, "elem2":"toxic_resin_13" }
    },
},

elements.toxic_resin_13 = {
    name: "resin",
    hidden: "true",
    color: elements.honey.color,
    behavior: behaviors.POWDER,
    tempHigh: 345,
    stateHigh: ["smoke"],
    conduct: 1,
    breakInto: ["sap"],
    category: "resin",
    state: "solid",
    density: 1540,
    desc: "Icy Clarity, Bug Impurities",
    reactions: {
    "fletching_station" = { "elem1":null, "elem2":"toxic_resin_14" }
    },
},

elements.toxic_resin_14 = {
    name: "resin",
    hidden: "true",
    color: elements.honey.color,
    behavior: behaviors.POWDER,
    tempHigh: 345,
    stateHigh: ["smoke"],
    conduct: 1,
    breakInto: ["sap"],
    category: "resin",
    state: "solid",
    density: 1540,
    desc: "Jewel Clarity, Bug Impurities",
    reactions: {
    "fletching_station" = { "elem1":null, "elem2":"amber" }
    },
},

// so much more to go, i'll take a break for now.
