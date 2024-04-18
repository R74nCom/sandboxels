// to do list:
// Give the powders more vibrant colors (I do not want to do this)
// Add ingots (this is giong to be hell for me)
// More reactions (aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa)
// More metals? (why am I doing this again?)
// Finish molten elements (How many elements did I make again?)
// Give the molten elements more unique colors (I do not want to do this)

elements.Mithril = {
    color: ["#66dede", "#78c4c4", "#6bbfa7", "#51fca9", "#6598b5", "#86a1db", "#61ad6e"],
    behavior: behaviors.POWDER,
    category: "powders",
    state:  "solid",
    density: 200,
    stateHigh: "Molten_Mithril",
    tempHigh: 2000,
};
elements.Palladium = {
    color: ["#e67c47", "#61280c", "#9c3402", "#f57231", "#fc9662"],
    behavior: behaviors.POWDER,
    category: "powders",
    state:  "solid",
    density: 200,
    tempHigh: 9000,
    stateHigh: "Molten_Palladium",
};
elements.Adamantium = {
    color: ["#a30303", "#5e1111", "#400303", "#451a1a", "#805454"],
    behavior: behaviors.POWDER,
    category: "powders",
    state:  "solid",
    density: 200,
    tempHigh: 11000,
    stateHigh: "Molten_Adamantium",
};
elements.Orichalcum = {
    color: ["#de55ed", "#bc13cf", "#8c3396", "#a952b3", "#bc08d1"],
    behavior: behaviors.POWDER,
    category: "powders",
    state:  "solid",
    density: 200,
    tempHigh: 10500,
    stateHigh: "Molten_Orichalcum",
};
elements.Brightsteel = {
    color: ["#c4d10f", "#c2cc35", "#dde386", "#778003", "#dff005"],
    behavior: 
    [
        ["CR:light%0.05","CR:light%0.05","CR:light%0.05"],
        ["CR:light%0.05","XX","CR:light%0.05"],
        ["M2","M1","M2"]
    ],
    category: "powders",
    state:  "solid",
    density: 200,
    stateHigh: "Molten_Brightsteel",
    tempHigh: 5000,
};
elements.Darksteel = {
    color: ["#8f8786", "#2e2625", "#120b0b", "#000000", "#000000"],
    behavior: 
    [
        ["CR:light%0.05","CR:light%0.05","CR:light%0.05"],
        ["CR:light%0.05","XX","CR:light%0.05"],
        ["M2","M1","M2"]
    ],
    category: "powders",
    state:  "solid",
    density: 200,
    tempHigh: 10500,
    stateHigh: "Molten_Darksteel",
    reactions: {
        "Brightsteel": {elem1: "It_Go_Boom", elem2: null}
    },
};
elements.Luminite = {
    color: ["#77d0ed", "#2b3b40", "#01171f", "#02a0d9", "#bfe7f5"],
    behavior: 
    [
        ["CR:light%0.05","CR:light%0.05","CR:light%0.05"],
        ["CR:light%0.05","XX","CR:light%0.05"],
        ["M2","M1","M2"]
    ],
    category: "powders",
    state:  "solid",
    density: 200,
};
elements.Etherium = {
    color: ["#4b5f66", "#363d40", "#545b5e", "#2b363b", "#4a5559"],
    behavior: behaviors.POWDER,
    category: "powders",
    state:  "solid",
    density: 200,
};
elements.Voidmetal = {
    color: ["#4b5f66", "#363d40", "#545b5e", "#2b363b", "#4a5559"],
    behavior: [
        ["DL%0.01","DL%0.01","DL%0.01"],
        ["DL%0.01","XX","DL%0.01"],
        ["M2 AND DL%0.01","M1 AND DL%0.01","M2 AND DL%0.01"]
    ],
    category: "powders",
    state:  "solid",
    density: 200,
};
elements.Cosmilite = {
    color: ["#473d4f", "#381e4d", "#6c5b7a", "#baa3cc", "#7d0bd6"],
    behavior: 
    [
        ["CR:light%0.005","CR:light%0.005","CR:light%0.005"],
        ["CR:light%0.005","XX","CR:light%0.005"],
        ["M2","M1","M2"]
    ],
    category: "powders",
    state:  "solid",
    density: 200,
};
elements.Diathrylium = {
    color: ["#3d5c80", "#688fbd", "#b5bdc7", "#8aafde", "#2765b3", "#213c5c"],
    behavior: 
    [
        ["CR:electric%0.005 AND CR:lightning%0.000005","CR:electric%0.005 AND CR:lightning%0.000005","CR:electric%0.005 AND CR:lightning%0.000005"],
        ["CR:electric%0.005 AND CR:lightning%0.000005","XX","CR:electric%0.005 AND CR:lightning%0.000005"],
        ["M2","M1","M2"]
    ],
    category: "powders",
    state:  "solid",
    density: 200,
    temp: 0,
};
elements.Kiaxorite = {
    color: ["#bac942", "#b8bf7c", "#738008", "#6a7035", "#6a7035"],
    behavior: behaviors.POWDER,
    category: "powders",
    state:  "solid",
    density: 200,
    reactions: {
        "Diathrylium": {elem1: "h_bomb", elem2: null}
    },
};
elements.It_Go_Boom = {
    color: "#000000",
    behavior:    [
        ["XX","XX","XX"],
        ["XX","XX","XX"],
        ["M2 AND EX:50","M1 AND EX:50","M2 AND EX:50"]
    ],
    category: "weapons",
    state: "soild",
    density: 90,
    hidden:true,
};

// Molten elements

elements.Molten_Mithril = {
    color: ["#d49a4e", "#8a530a", "#dea862", "#e37124", "#6e3108"],
    behavior: behaviors.MOLTEN,
    category: "states",
    state: "liquid",
    density: "2000",
    temp: 2000,
    stateLow: "Mithril",
    tempLow: 1990,
};
elements.Molten_Adamantium = {
    color: ["#d49a4e", "#8a530a", "#dea862", "#e37124", "#6e3108"],
    behavior: behaviors.MOLTEN,
    category: "states",
    state: "liquid",
    density: "2000",
    temp: 9000,
    stateLow: "Adamantium",
    tempLow: 8800,
};
elements.Molten_Palladium = {
    color: ["#d49a4e", "#8a530a", "#dea862", "#e37124", "#6e3108"],
    behavior: behaviors.MOLTEN,
    category: "states",
    state: "liquid",
    density: "2000",
    temp: 11000,
    stateLow: "Palladium",
    tempLow: 10090,
};
elements.Molten_Orichalcum = {
    color: ["#d49a4e", "#8a530a", "#dea862", "#e37124", "#6e3108"],
    behavior: behaviors.MOLTEN,
    category: "states",
    state: "liquid",
    density: "2000",
    temp: 10500,
    stateLow: "Orichalcum",
    tempLow: 10000,
};
elements.Molten_Brightsteel = {
    color: ["#d49a4e", "#8a530a", "#dea862", "#e37124", "#6e3108"],
    behavior: behaviors.MOLTEN,
    category: "states",
    state: "liquid",
    density: "2000",
    temp: 5000,
    stateLow: "Brightsteel",
    tempLow: 4090,
};
elements.Molten_Darksteel = {
    color: ["#d49a4e", "#8a530a", "#dea862", "#e37124", "#6e3108"],
    behavior: behaviors.MOLTEN,
    category: "states",
    state: "liquid",
    density: "2000",
    temp: 10500,
    stateLow: "Darksteel",
    tempLow: 10000,
    reactions: {
        "Molten_Brightsteel": {elem1: "h_bomb"},
    },
};