elements.paprika = {
    color: "#b22222",
    category: "Markus Foods",
    behavior: behaviors.POWDER,
    state: "solid",
    tempHigh: 200,
    stateHigh: "ash",
    density: 0.4,
};

elements.spicy_sauce = {
    color: "#a52a2a",
    category: "Markus Foods",
    behavior: behaviors.LIQUID,
    state: "liquid",
    density: 1.0,
    tempHigh: 150,
    stateHigh: "smoke",
};

elements.pepper = {
    color: "#2f1b0c",
    category: "Markus Foods",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 0.7,
    tempHigh: 200,
    stateHigh: "ash",
};

elements.chicken_meat = {
    color: "#e8a07c",
    category: "Markus Foods",
    behavior: behaviors.SOLID,
    state: "solid",
    tempHigh: 75,
    stateHigh: "cooked_chicken",
    tempLow: -5,
    stateLow: "frozen_chicken",
};

elements.cooked_chicken = {
    color: "#c18251",
    category: "Markus Foods",
    behavior: behaviors.SOLID,
    state: "solid",
    tempHigh: 200,
    stateHigh: "ash",
};

elements.frozen_chicken = {
    color: "#d1e1ed",
    category: "Markus Foods",
    behavior: behaviors.SOLID,
    state: "solid",
    tempHigh: 0,
    stateHigh: "chicken_meat",
};

elements.pork_meat = {
    color: "#e89a8b",
    category: "Markus Foods",
    behavior: behaviors.SOLID,
    state: "solid",
    tempHigh: 75,
    stateHigh: "cooked_pork",
    tempLow: -5,
    stateLow: "frozen_pork",
};

elements.cooked_pork = {
    color: "#af7f5d",
    category: "Markus Foods",
    behavior: behaviors.SOLID,
    state: "solid",
    tempHigh: 200,
    stateHigh: "ash",
};

elements.frozen_pork = {
    color: "#c0d4e1",
    category: "Markus Foods",
    behavior: behaviors.SOLID,
    state: "solid",
    tempHigh: 0,
    stateHigh: "pork_meat",
};

elements.olive_oil = {
    color: "#a07d3c",
    state: "liquid",
    category: "Markus Foods",
    behavior: behaviors.LIQUID,
    density: 0.9,
};

elements.breadcrumbs = {
    color: "#e6c27a",
    category: "Markus Foods",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 0.4,
    tempHigh: 250,
    stateHigh: "ash",
};

elements.fried_chicken = {
    color: ["#c0894f", "#a86a3a", "#d19b52"],
    category: "Markus Foods",
    behavior: behaviors.SOLID,
    state: "solid",
    tempHigh: 350,
    stateHigh: "ash",
};

elements.breaded_chicken = {
    color: "#deb887",
    category: "Markus Foods",
    behavior: behaviors.SOLID,
    state: "solid",
    tempHigh: 180,
    stateHigh: "fried_chicken",
};

elements.chicken_meat.reactions = {
    breadcrumbs: { elem1: "breaded_chicken" }
};
