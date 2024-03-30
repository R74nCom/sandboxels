elements.technetium = {
    category: "powders",
    state: "solid",
    color: "#D3D3D3",
    tempHigh: 2157,
    stateHigh: "molten_technetium",
    density: 11359,
    temp: 20,
    behavior: [
        "XX|CR:radiation%3 AND CR:fallout%0.2|XX",
        "CR:radiation%3 AND CR:fallout%0.2|XX|CR:radiation%3 AND CR:fallout%0.2",
        "M1|CR:radiation%3 AND M2 AND CR:fallout%0.2|M1",
    ],
    reactions: {
        "water": { elem1: null, elem2: "dirty_water" },
    },
}

elements.molten_technetium = {
    category: "states",
    hidden: true,
    state: "liquid",
    color: ["#F2F2E5", "#E0C29F", "#D0CFC7", "#BDB7B0", "#A0958C", "#FFB300", "#F0E68C", "#BD10E0", "#FFF0F5"],
    behavior: [
        "XX|CR:radiation%3 AND CR:fallout%0.2 AND CR:plasma,fire,fire,fire,fire%0.5|XX",
        "M2 AND CR:radiation%3 AND CR:fallout%0.2 AND CR:plasma,fire,fire,fire,fire%0.5|XX|M2 AND CR:radiation%3 AND CR:fallout%0.2 AND CR:plasma,fire,fire,fire,fire%0.5",
        "M1|M1 AND CR:radiation%3 AND CR:fallout%0.2|M1",
    ],
    tempLow: 2157,
    stateLow: "technetium",
    density: 11359,
}

elements.francium = {
    category: "powders",
    state: "solid",
    color: ["#DE0047", "#4169E1", "#007FFF", "#9ACD32", "#FFD700", "#C800C8"],
    behavior: [
        "XX|CR:radiation%1.5|XX",
        "CR:radiation%1.5|XX|CR:radiation%1.5",
        "M2|M1 AND CR:radiation%1.5|M2",
    ],
    tempHigh: 27,
    stateHigh: "molten_francium",
    density: 2480,
}

elements.molten_francium = {
    category: "states",
    hidden: true,
    tempLow: 27,
    stateLow: "francium",
    density: 2480,
    color: ["#C71585", "#FF00FF", "#A020F0", "#4B0082", "#EE82EE", "#FF9933", "#F97A3E", "#F05945"],
    behavior: [
        "XX|CR:fire,fire,fire,fire,plasma%2 AND CR:radiation%0.6|XX",
        "M2 AND CR:fire,fire,fire,fire,plasma%2 AND CR:radiation%0.6|XX|M2 AND CR:fire,fire,fire,fire,plasma%2 AND CR:radiation%0.6",
        "M1|M1 AND CR:fire,fire,fire,fire,plasma%2 AND CR:radiation%0.6|M1",
    ],
}

elements.radium = {
    category: "powders",
    tempHigh: 700,
    stateHigh: "molten_radium",
    density: 5500,
    state: "solid",
    color: ["#F0F0F0", "#C0C0C0", "#A9A9A9", "#707070", "#303030"],
    behavior: [
        "XX|CR:radiation%3|XX",
        "CR:radiation%3|XX|CR:radiation%3",
        "M2|M1 AND CR:radiation%3|M2",
    ],
}

elements.molten_radium = {
    category: "states",
    hidden: true,
    tempLow: 700,
    density: 5500,
    stateLow: "radium",
    color: ["#F0E0D6", "#D3B29E", "#B78473", "#A0534A", "#FFB300", "#F05945"],
    behavior: [
        "XX|CR:fire,fire,fire,fire,plasma%1 AND CR:radiation%3|XX",
        "M2 AND CR:fire,fire,fire,fire,plasma%1 AND CR:radiation%3|XX|M2 AND CR:fire,fire,fire,fire,plasma%1 AND CR:radiation%3",
        "M1|M1 AND CR:fire,fire,fire,fire,plasma%1 AND CR:radiation%3|M1",
    ],
}

elements.rutherfordium = {
    category: "powders",
    state: "solid",
    tempHigh: 2100,
    stateHigh: "molten_rutherfordium",
    density: 17000,
    color: ["#C0C0C0", "#B3B3B3", "#A6A6A6", "#8C8C8C", "#737373"],
    behavior: [
        "XX|CR:radiation%5 AND CR:fallout%0.3|XX",
        "CR:radiation%5 AND CR:fallout%0.3|XX|CR:radiation%5 AND CR:fallout%0.3",
        "M2|M1 AND CR:radiation%5 AND CR:fallout%0.3|M2",
    ],
}

elements.molten_rutherfordium = {
    category: "states",
    state: "liquid",
    hidden: true,
    tempLow: 2100,
    stateLow: "rutherfordium",
    density: 17000,
}

elements.dubnium = {
    category: "solids",
    state: "solid",
    density: 21600,
    color: ["#495057", "#dee2e6", "#ced4da", "#a61e4d"],
    behavior: [
        "XX|CR:radiation%1|XX",
        "CR:radiation%1|XX|CR:radiation%1",
        "XX|CR:radiation%1|XX",
    ],
}

elements.seaborgium = {
    category: "solids",
    state: "solid",
    density: 23500,
    color: ["#ced4da", "#adb5bd", "#868e96", "#339af0", "#4dabf7", "#4263eb", "#3b5bdb", "#1864ab"],
    behavior: [
        "XX|CR:radiation%1|XX",
        "CR:radiation%1|XX|CR:radiation%1",
        "XX|CR:radiation%1|XX",
    ],
}