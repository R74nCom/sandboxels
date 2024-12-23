// coded by suss, so the code probably sucks
// lmao it only adds three elements, actually this is my first mod that even ADDS elements
// wait, nobody even reads the mod code, so im essentially talking to myself
// oh well :(

elements.bromine = {
    color: "#4e0e00",
    behavior: [
        "XX|CR:bromine_vapor%5|XX",
        "M2|XX|M2",
        "XX|M1|XX",
    ],
    category: "liquids",
    viscosity: 1.5,
    state: "liquid",
    density: 3102,
    tempLow: -7,
    stateLow: "bromine_ice",
};

elements.bromine_ice = {
    color: "#350900",
    behavior: behaviors.WALL,
    category: "states",
    state: "solid",
    density: 3102,
    tempHigh: -7,
    stateHigh: "bromine",
    temp: -10,
    hidden: true,
};

elements.bromine_vapor = {
    color: "#d48846",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 7.59,
    hidden: true,
}