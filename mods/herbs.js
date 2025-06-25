elements.amarsium_plant = {
    color: "#F2B3C1",
    behavior: [
        "XX|XX|XX",
        "CR:amarsium_leaf%10|FX%5|XX",
        "XX|XX|XX",
    ],
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 50,
    burnTime: 20,
    breakInto: "dead_plant",
    category: "life",
    state: "solid",
    density: 1700,
}
elements.amarsium_seed = {
    color: "#E9969A",
    behavior: [
        "XX|M2%5|XX",
        "XX|L2:amarsium_plant AND C2:amarsium_leaf%7.5|XX",
        "XX|M1|XX",
    ],
    tick: behaviors.SEEDRISE,
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 50,
    burnTime: 20,
    breakInto: null,
    category: "life",
    state: "solid",
    density: 1400,
    cooldown: defaultCooldown,
    seed: true
}
elements.amarsium_leaf = {
    color: "#7A8F6F",
    behavior: [
        ["XX|XX|XX"],
        ['SA:amarsium_plant', 'FX%0.25', 'SA:amarsium_plant'],
        ['M2%10', 'M1%10', 'M1%10']
    ],
    tempHigh: 75,
    stateHigh: "dried_amarsium_leaf",
    tempLow: -3,
    stateLow: "dead_plant",
    burn: 50,
    burnTime: 20,
    breakInto: null,
    category: "life",
    state: "solid",
    density: 200,
}
elements.dried_amarsium_leaf = {
    color: "#C19A6B",
    behavior: [
        ["XX|XX|XX"],
        ['XX', 'FX%0.25', 'XX'],
        ['M2%10', 'M1%10', 'M1%10']
    ],
    tempHigh: 250,
    stateHigh: "fire",
    burn: 75,
    burnTime: 5,
    breakInto: "amarsium_crushed_leaf",
    category: "life",
    state: "solid",
    density: 100,
}
elements.amarsium_crushed_leaf = {
    color: "#C19A6B",
    behavior: [
        ["XX|XX|XX"],
        ['XX', 'FX%0.25', 'XX'],
        ['M2%7', 'M1%7', 'M1%7']
    ],
    tempHigh: 250,
    stateHigh: "fire",
    burn: 75,
    burnTime: 5,
    category: "powders",
    state: "solid",
    density: 100,
    reactions: {
        water: { elem1: null, elem2: "amarsium" }
    }
}
elements.amarsium = {
    color: "#D87093",
    behavior: behaviors.LIQUID,
    tempHigh: 110,
    stateHigh: ["steam", "fragrance"],
    category: "liquids",
    state: "solid",
    density: 1300,
    isHerb: true,
    stain: -1,
    reactions: {
        dirty_water: {elem2: "water"},
        rotten_meat: {elem2: "meat"},
        infection: {elem2: "blood"},
        cancer: {elem2: "cell"},
        dirty_water: {elem2: "water"},
        dead_plant: {elem2: "plant"},
        poison: {elem2: "antidote"},
        dirty_water: {elem2: "water"},
        uranium: {elem2: "rock"},
        rad_glass: {elem2: "glass"},
        acid: {elem2: "neutral_acid"},
    }
}

elements.herb_annihilator = {
	color: ["#666666","#888888","#666666"],
	tool: function(pixel) {
		let elem = elements[pixel.element]
		if (elem["isHerb"]) {
            deletePixel(pixel.x, pixel.y)
        }

	},
	category: "tools",
	excludeRandom: true,
	desc: "Annihilates herb liquids."
}