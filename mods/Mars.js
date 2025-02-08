elements.mars_gunk = {
    color: "#121212",
    behavior: behaviors.DGAS,
    category: "gunk",
    state: "gases",
    extraInfo: "GUNK",
    stain: 0.7
}
elements.mars_dust = {
	color: ["#ab2a20","#c53227"],
	behavior: behaviors.POWDER,
	category: "mars",
	state: "solid",
        density: 1602,
        tempHigh: 500,
        hardness: 0.975,
        stateHigh: "molten_mars",
        tempLow: -170,
        stateLow: "mars_rock",
        extraInfo: "Dust Samples from mars. Can freeze into Mars Rock."
}
elements.molten_mars = {
	color: "#ffc338",
	behavior: behaviors.MOLTEN,
	category: "mars",
	state: "liquid",
        hidden: "true",
    extraInfo: "The Result of Burnt-up mars stuff. Some turn into this faster more than others.",
        temp: 2500
}
elements.plasma_mars = {
    color: "#ffc338",
    behavior: behaviors.MOLTEN,
    category: "mars",
    state: "liquid",
    hidden: "false",
    extraInfo: "Molten Mars but Plasma.",
    temp: 2500
}
elements.mars_rock = {
	color: ["#a51002","#bd1102"],
	behavior: behaviors.STURDYPOWDER,
	category: "mars",
	state: "solid",
        density: 1605,
        tempHigh: 800,
        hardness: 0.75,
        stateHigh: "molten_mars",
        breakInto: "mars_dust",
        tempLow: -273,
        stateLow: "mars_rock_wall",
        extraInfo: "The Freezing of Mars Dust. Can be used for normal land."
}
elements.support_mars_rock = {
	color: ["#a51002","#bd1102"],
	behavior: behaviors.SUPPORTPOWDER,
	category: "mars",
	state: "solid",
        density: 800,
        tempHigh: 150,
        hardness: 0.9,
        stateHigh: "molten_mars",
        breakInto: "mars_rock",
        hidden: "true",
        extraInfo: "Mars Rock but Support Powder."
}
elements.mars_rock_wall = {
	color: ["#591813","#bd1102"],
	behavior: behaviors.WALL,
	category: "mars",
	state: "solid",
        density: 20,
        tempHigh: 2500,
        hardness: 0.35,
        stateHigh: "mars_dust",
        breakInto: "mars_rock",
        extraInfo: "The Freezing of Mars Rock. A wall that keeps the Earthlings Away!"
}
elements.mars_ironheart_ore = {
    color: ["#e8e8e8", "#bd1102"],
    behavior: behaviors.WALL,
    category: "mars",
    state: "solid",
    density: 2500,
    tempHigh: 2500,
    hardness: 0.15,
    stateHigh: "mars_dust",
    breakInto: "mars_ironheart",
    extraInfo: "Ore. Very Soft"
}
elements.mars_ironheart = {
    color: ["#e8e8e8", "#bd1102"],
    behavior: behaviors.STURDYPOWDER,
    category: "mars",
    state: "solid",
    density: 1500,
    tempHigh: 2500,
    hardness: 1,
    stateHigh: "molten_mars",
    extraInfo: "Mars Stuff.",
    hidden: "true",
    reactions: {
        "mars_furnace": { elem1: "ironheart", elem2: "ironheart" },
        "nosmoker": { elem1: "ironheart", elem2: "ironheart" },    },
}
elements.mars_furnace = {
    color: ["#870002","#870507"],
    behavior: [
        "XX|CR:mars_gunk%12|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    category: "furnaces",
    state: "solid",
    hardness: 0.6,
    stateHigh: "molten_mars",
    extraInfo: "Used to turn Ironheart into Ironheart Solids"
}
elements.nosmoker = {
    color: ["#870002", "#870507"],
    behavior: behaviors.WALL,
    category: "furnaces",
    state: "solid",
    extraInfo: "Used to turn Ironheart into Ironheart Solids"
}
elements.ironheart = {
    color: "#e9825a",
    behavior: [
        "SA|XX|SA|",
        "XX|XX|XX|",
        "M1|M1|M1|",
    ],
    category: "mars",
    density: 900,
    state: "solid",
    stateHigh: "molten_mars",
    extraInfo: "Very Good and Sturdy."
}
elements.antigunk = {
    color: "#cecece",
    behavior: behaviors.DGAS,
    category: "gunk",
    state: "gas",
    extraInfo: "GUNK",
    stain: -0.7
}
elements.red_gold_powder = {
    color: ["#e27b58", "#bd1102"],
    behavior: behaviors.POWDER,
    category: "mars",
    state: "solid",
    tempHigh: 750,
    stateHigh: "red_gold",
    extraInfo: "Powder Which can turn into Red Gold.",
    density: 1602
}
elements.red_gold = {
    color: ["#D20103", "#E4080A", "#EFC3CA"],
    behavior: behaviors.POWDER,
    category: "mars",
    state: "solid",
    density: 1350,
    hardness: 0.7,
    breakInto: "mars_dust",
    tempHigh: 4500,
    stateHigh: "liquid_red_gold",
    extraInfo: "Red Gold.",
}
elements.liquid_red_gold = {
    color: ["#D201A4", "#E4081B"],
    behavior: behaviors.LIQUID,
    category: "mars",
    state: "liquid",
    density: 8,
    extraInfo: "Red Gold but a fludid.",
    temp: 5500
}

// 1.4.4
// most elements done :D
// iron heart ore
// iron heart
// GUNK
// furnace
//anti gunk
// new mars and gunk catagory
// made things sink
// last things changes
