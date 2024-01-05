elements.poop = {
    color: "#411900",
    density: 200,
    state: "solid",
    burn: 5,
    tempHigh: 400,
    burnTime: 200,
    burnInto: ["driedPoop"],
    category: "gross stuff",
}

elements.driedPoop = {
    behavior: behaviors.POWDER,
    color: '#181100',
    state: 'powder',
    category: "gross stuff",
    reactions: { 
        "water": { elem1: null, elem2: "wetPoop" },
        "milk": { elem1: null, elem2: "poopyMilk" },

    },
    density: 10
}

elements.wetPoop = {
    behavior: behaviors.LIQUID,
    color: "#A9844F",
    state: 'liquid',
    category: 'gross stuff',
    density: '25'
}

elements.poopyMilk = {
    behavior: behaviors.LIQUID,
    color: '#BEB2AD',
    state: 'liquid',
    category: "gross stuff",
    density: 10
}

elements.peePee = {
    behavior: behaviors.LIQUID,
    color: '#f1ed00',
    state: 'liquid',
    category: "gross stuff",
    tempHigh: 100,
    stateHigh: ["ammonia", "fragrance"],
    density: 25
}

elements.ammonia = {
    behavior: behaviors.GAS,
    color: '#E5E4E2',
    category: 'gross stuff',
    density: .86,
    state: 'gas',
}