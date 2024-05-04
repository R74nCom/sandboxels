elements.kaeud = {
    behavior: behaviors.CRAWLER,
    category: "life",
    state: "solid",
    density: 1500,
    color: ["#576bde","#7385eb"],
    tempHigh: 250,
    stateHigh: "yamada_wishes",
    tempLow: -30,
    stateLow: "hidden_yamada_wishes",
    temp: 37,
};


elements.yamada_wishes = {
    behavior: behaviors.GAS,
    category: "life",
    state: "gas",
    color: ["#9197ba","#a8b1e0"],
    density: 1.21,
    hidden: true,
    burn: 20,
    burntime: 1000,
    fireColor: "#4d67ff",
    darkText: true,
    tempLow: -30,
    stateLow: "hidden_yamada_wishes",
};

elements.hidden_yamada_wishes = {
    behavior: behaviors.SOLID,
    category: "life",
    state: "solid",
    color: ["#303552","#42496b"],
    density: 120,
    hidden: true,
    tempHigh: 20,
    stateHigh: "yamada_wishes",
    temp: -30
};

elements.chat = {
    behavior: behaviors.GAS,
    category: "life",
    state: "gas",
    color: "#d3d4db",
    hidden: true,
};

elements.triangle = {
    behavior: behaviors.CRAWLER,
    category: "life",
    state: "solid",
    darkText: true,
    color: ["#d1d1d1","#ebedeb"],
    density: 1500,
    tempHigh: 2000000,
    stateHigh: "square_mom",
    breakInto: "meat",
    reactions: {
        "triangle_mom": { elem1: ["blood","blood","blood" ] },
    }
};

elements.triangle_mom = {
    behavior: behaviors.WALL,
    category: "unbeatable_entity",
    state: "solid",
    color: "#b3b3b3",
    breakInto: "supernova",
};

elements.sobble = {
    behavior: behaviors.CRAWLER,
    category: "life",
    state: "solid",
    color: ["#55bef2","#55bef2"],
    density: 1200,
    tempHigh: 110,
    stateHigh: ["water","blood","bone"],
    tempLow: -10,
    stateLow: ["ice","blood"],
    breakInto: ["blood","bone","water"],
    burn: 70,
    burntime: 20,
    reactions: {
        "triangle_mom": { elem1: "blood" },
    }
}
