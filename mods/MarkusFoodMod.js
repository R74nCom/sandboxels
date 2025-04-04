elements.paprika = {
    color: "#b22222",
    category: "Markus Foods",
    behavior: behaviors.POWDER,
    state: "solid",
    tempHigh: 200,
    stateHigh: "ash",
    density: 0.4,
    isFood: true,
};

elements.spicy_sauce = {
    color: "#a52a2a",
    category: "Markus Foods",
    behavior: behaviors.LIQUID,
    state: "liquid",
    density: 1.0,
    tempHigh: 150,
    stateHigh: "smoke",
    isFood: true,
};

elements.black_pepper = {
    color: "#2f1b0c",
    category: "Markus Foods",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 0.7,
    tempHigh: 200,
    stateHigh: "ash",
    isFood: true,
};

elements.chicken_meat = {
    color: "#e8a07c",
    category: "Markus Foods",
    behavior: behaviors.STURDYPOWDER,
    state: "solid",
    tempHigh: 75,
    stateHigh: "cooked_chicken",
    tempLow: -5,
    stateLow: "frozen_chicken",
    isFood: true,
};

elements.cooked_chicken = {
    color: "#c18251",
    category: "Markus Foods",
    behavior: behaviors.STURDYPOWDER,
    state: "solid",
    tempHigh: 200,
    stateHigh: "ash",
    isFood: true,
};

elements.frozen_chicken = {
    color: "#d1e1ed",
    category: "Markus Foods",
    behavior: behaviors.STURDYPOWDER,
    state: "solid",
    tempHigh: 0,
    stateHigh: "chicken_meat",
    isFood: true,
};

elements.pork_meat = {
    color: "#e89a8b",
    category: "Markus Foods",
    behavior: behaviors.STURDYPOWDER,
    state: "solid",
    tempHigh: 75,
    stateHigh: "cooked_pork",
    tempLow: -5,
    stateLow: "frozen_pork",
    isFood: true,
};

elements.cooked_pork = {
    color: "#af7f5d",
    category: "Markus Foods",
    behavior: behaviors.STURDYPOWDER,
    state: "solid",
    tempHigh: 200,
    stateHigh: "ash",
    isFood: true,
};

elements.frozen_pork = {
    color: "#c0d4e1",
    category: "Markus Foods",
    behavior: behaviors.STURDYPOWDER,
    state: "solid",
    tempHigh: 0,
    stateHigh: "pork_meat",
    isFood: true,
};

elements.breadcrumbs = {
    color: "#e6c27a",
    category: "Markus Foods",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 0.4,
    tempHigh: 250,
    stateHigh: "ash",
    isFood: true,
};

elements.fried_chicken = {
    color: ["#c0894f", "#a86a3a", "#d19b52"],
    category: "Markus Foods",
    behavior: behaviors.STURDYPOWDER,
    state: "solid",
    tempHigh: 350,
    stateHigh: "ash",
    isFood: true,
};

elements.breaded_chicken = {
    color: "#deb887",
    category: "Markus Foods",
    behavior: behaviors.STURDYPOWDER,
    state: "solid",
    tempHigh: 180,
    stateHigh: "fried_chicken",
    isFood: true,
};

elements.chicken_meat.reactions = {
    breadcrumbs: { elem1: "breaded_chicken" }
};

const newFoods = {
    cinnamon: "#8B5A2B",
    garlic: "#FFF5E1",
    onion: "#D4A76A",
    tomato: "#FF6347",
    lettuce: "#32CD32",
    potato: "#D2B48C",
    cooked_potato: "#E3C16F",
    chili_powder: "#FF4500",
    carrot: "#FFA500",
    cucumber: "#4CAF50",
    salt: "#FFFFFF",
    sugar: "#FFF5EE",
    honey: "#FFD700",
    cheese: "#FFD700",
    butter: "#FFDD44",
    egg: "#FFF5C3",
    cooked_egg: "#F4C542",
    banana: "#FFE135",
    apple: "#FF0000",
    blueberry: "#4B0082",
    strawberry: "#FF4D4D",
    watermelon: "#FF6666",
    grapes: "#6A0DAD",
    avocado: "#568203",
    basil: "#228B22",
    oregano: "#6B8E23",
    ginger: "#D2691E",
    turmeric: "#E49B0F",
    nutmeg: "#8B4513",
    clove: "#5C4033",
    cabbage: "#4CBB17",
    cauliflower: "#FFFAF0",
    mushroom: "#8B4513",
    spinach: "#2E8B57",
    radish: "#F5A9B8",
    broccoli: "#228B22",
    green_peas: "#7CFC00",
    bell_pepper: "#32CD32",
    sweet_potato: "#FF7F50",
    coconut: "#FFF8DC",
    lemon: "#FFFACD",
    lime: "#98FB98",
    kiwi: "#32CD32",
    pear: "#9ACD32",
    peach: "#FFDAB9",
    plum: "#8E4585",
    pomegranate: "#8B0000",
    fig: "#8B4513",
    date: "#A52A2A",
    raisin: "#6B4226",
    apricot: "#FBCEB1",
    coconut_milk: "#FFF0F5",
    yogurt: "#F5FFFA",
    cream: "#FFF8DC",
    peanut_butter: "#C8A2A8",
    sesame_seeds: "#FFF5EE",
    tahini: "#F4A460",
    almond: "#D2691E",
    walnut: "#8B4513",
    pistachio: "#4B8A3D",
    cashew: "#D2B48C",
    hazelnut: "#8B5A2B",
    macadamia: "#E1C699",
    pine_nuts: "#FFDDC1",
    sunflower_seeds: "#FFF8DC",
    chia_seeds: "#D2691E",
    flaxseeds: "#8B4513",
};

for (const [name, color] of Object.entries(newFoods)) {
    elements[name] = {
        color,
        category: "Markus Foods",
        behavior: behaviors.POWDER,
        state: "solid",
        isFood: true,
    };
}

const newLiquids = {
    water: "#00BFFF",
    milk: "#FFFFFF",
    orange_juice: "#FFA500",
    apple_juice: "#FF4500",
    grape_juice: "#6A0DAD",
    lemon_juice: "#FFFACD",
    coconut_water: "#BFD8B8",
    tomato_juice: "#FF6347",
    coffee: "#6F4F1F",
    tea: "#D3D3D3",
    cola: "#6B3F2F",
    wine: "#800000",
    beer: "#F4A300",
    whiskey: "#B86B38",
    rum: "#C39A6E",
    vodka: "#F0F8FF",
    fruit_punch: "#FF69B4",
    smoothie: "#FFB6C1",
    soy_milk: "#F5F5DC",
    coconut_milk: "#FFF0F5",
};

for (const [name, color] of Object.entries(newLiquids)) {
    elements[name] = {
        color,
        category: "Markus Foods",
        behavior: behaviors.LIQUID,
        state: "liquid",
        isFood: true,
    };
}

elements.carbonated_water = {
    color: "#B0E0E6",
    category: "Markus Foods",
    behavior: behaviors.LIQUID,
    state: "liquid",
    isFood: true,
    density: 1.0,
};

elements.fanta_syrup = {
    color: "#FF7F00",
    category: "Markus Foods",
    behavior: behaviors.LIQUID,
    state: "liquid",
    tempHigh: 100,
    stateHigh: "steam",
    isFood: true,
};

elements.cola_syrup = {
    color: "#301a10",
    category: "Markus Foods",
    behavior: behaviors.LIQUID,
    state: "liquid",
    tempHigh: 100,
    stateHigh: "steam",
    isFood: true,
};

elements.sprite_syrup = {
    color: "#A8F0A5",
    category: "Markus Foods",
    behavior: behaviors.LIQUID,
    state: "liquid",
    tempHigh: 100,
    stateHigh: "steam",
    isFood: true,
};

elements.soda = {
    color: "#FFD700",
    category: "Markus Foods",
    behavior: behaviors.LIQUID,
    state: "liquid",
    isFood: true,
};

elements.fanta = {
    color: "#FF7F00",
    category: "Markus Foods",
    behavior: behaviors.LIQUID,
    state: "liquid",
    isFood: true,
};

elements.cola = {
    color: "#261710",
    category: "Markus Foods",
    behavior: behaviors.LIQUID,
    state: "liquid",
    isFood: true,
};

elements.sprite = {
    color: "#A8F0A5",
    category: "Markus Foods",
    behavior: behaviors.LIQUID,
    state: "liquid",
    isFood: true,
};

elements.soda.reactions = {
    fanta_syrup: { elem1: "fanta" },
    cola_syrup: { elem1: "cola" },
    sprite_syrup: { elem1: "sprite" },
};

// Adding the recipes for sodas
elements.fanta_syrup.reactions = {
    carbonated_water: { elem1: "fanta" },
};

elements.cola_syrup.reactions = {
    carbonated_water: { elem1: "cola" },
};

elements.sprite_syrup.reactions = {
    carbonated_water: { elem1: "sprite" },
};
