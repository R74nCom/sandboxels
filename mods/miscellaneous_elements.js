elements.explorder = {
    color: "#ff6600",
    behavior: [
        "XX|XX|XX",
        "XX|CH:water>explosion|XX",
        "M2|M1|M2"
    ],
    category: "evilness",
    state: "solid",
    reactions: {
        "water": { elem1: "supernova", elem2: null }
    },
    desc: 'Unstable element that creates a massive explosion when it comes into contact with water.'
};

elements.netrinth = {
    color: "#0066ff",
    behavior: behaviors.WALL,
    category: 'evilness',
    state: 'solid',
    desc: 'Highly radioactive element that twists structure of atom particles, making them part of radiation, energy can be extracted from it.',
    tick: function(pixel) {
        if (Math.floor(Math.random() * 900) + 1 === 1) {
            tryCreate('radiation', pixel.x, pixel.y+1)
        }
    },
    reactions: {
        "proton": { elem1: "radiation", elem2: null},
        "neutron": { elem1: "radiation", elem2: null},
        "electric": { elem1: "radiation", elem2: null}
    },
    tempHigh: 1000,
    stateHigh: "liquid_netrinth"
};

elements.liquid_netrinth = {
    color: "#0066ff",
    behavior: [
        "XX|XX|XX",
        "M3%15|XX|M3%15",
        "M2%15|M1|M2%15"
    ],
    category: 'states',
    state: 'liquid',
    desc: 'ok nub did you expect liquid netrinth be billion times dangerous and more evil? this damages the atom structure of this element, making it less radioactive, harder to extract energy.',
    tick: function(pixel) {
        if (Math.floor(Math.random() * 1800) + 1 === 1) {
            tryCreate('radiation', pixel.x, pixel.y+1)
        }
    },
    reactions: {
        "proton": { elem1: "radiation", elem2: null},
        "neutron": { elem1: "radiation", elem2: null},
        "electric": { elem1: "radiation", elem2: null}
    },
    tempLow:500,
    stateLow: "netrinth",
    tempHigh: 6000,
    stateHigh: "gas_netrinth",
    temp: 1001
};

elements.gas_netrinth = {
    color: "#76adff",
    behavior: behaviors.GAS,
    category: 'states',
    state: 'gas',
    desc: 'the element atom structure is completely destroyed, making it non radioactive, even after solidifying, no longer extractable energy, and giving it brigher color, also now completely safe.',
    tempLow: 6000,
    stateLow: "safe_liquid_nentrinth",
    temp: 6001
}

elements.safe_liquid_netrinth = {
    color: "#76adff",
    behavior: [
        "XX|XX|XX",
        "M3%15|XX|M3%15",
        "M2%15|M1|M2%15"
    ],
    category: 'states',
    state: 'liquid',
    desc: 'what do you expect this to be',
    tempLow:500,
    stateLow: "safe_netrinth",
    tempHigh: 6000,
    stateHigh: "gas_netrinth",
    temp: 1001
};

elements.safe_netrinth = {
    color: "#76adff",
    behavior: behaviors.WALL,
    category: 'evilness',
    state: 'solid',
    desc: ':/',
    tempHigh: 1000,
    stateHigh: "safe_liquid_netrinth"
};

elements.mercurium = {
    color: ["#740000","#2e2e2e","#1b0047"],
    behavior: behaviors.SUPPORT,
    category: 'evilness',
    state: 'solid',
    desc: 'Very rare and sticky element, DO NOT MISTAKE WITH MERCURY, will explode on high temperatures',
    tick: function(pixel) {
        if (Math.floor(Math.random() * 1000) + 1 === 1) {
            tryCreate('electric', pixel.x, pixel.y-1)
        }
    },
    tempHigh: 4000,
    stateHigh: "supernova"
};

elements.magnetite = {
    color: ["#3a3a3a", "#535353", "#a200d3"],
    behavior: behaviors.WALL,
    category: 'evilness',
    state: 'solid',
    desc: 'A very dense and heavy magnetic element, it can attract and repel other metals.',
    reactions: {
        "iron": { elem1: "magnetite", elem2: null },
        "steel": { elem1: "magnetite", elem2: null },
        "gold": { elem1: "magnetite", elem2: null },
        "copper": { elem1: "magnetite", elem2: null },
        "aluminum": { elem1: "magnetite", elem2: null },
        "lead": { elem1: "magnetite", elem2: null },
        "tungsten": { elem1: "magnetite", elem2: null },
    },
    tick: function(pixel) {
        if (Math.floor(Math.random() * 1000) + 1 === 1) {
            tryCreate('electric', pixel.x, pixel.y-1)
        }
    },
    tempHigh: 3000,
    stateHigh: "molten_magnetite",
    breakInto: "magnetite_powder"
}

elements.molten_magnetite = {
    color: ["#e4e4e4", "#535353", "#e180ff"],
    behavior: behaviors.LIQUID,
    category: 'states',
    state: 'liquid',
    desc: 'magnetite but liquid, and also explodes in electricity during high temperatures',
    tempLow: 3000,
    stateLow: "magnetite",
    temp: 3000,
    tempHigh: 6000,
    stateHigh: 'lightning',
}

elements.netrinth_receiver = {
    color: "#00ffcc",
    behavior: behaviors.WALL,
    category: 'machines',
    state: 'solid',
    desc: 'A device that absorbs radiation from netrinth and converts it into electricity, hoewer destroys the netrinth in the process.',
    conduct: 1,
    tick: function(pixel) {
        // Check adjacent pixels for netrinth or liquid_netrinth
        let dirs = [
            [0, -1], [1, 0], [0, 1], [-1, 0]
        ];
        for (let d = 0; d < dirs.length; d++) {
            let nx = pixel.x + dirs[d][0];
            let ny = pixel.y + dirs[d][1];
            if (isEmpty(nx, ny)) continue;
            let np = pixelMap[nx][ny];
            if (!np) continue;
            if (np.element === "netrinth" || np.element === "liquid_netrinth") {
                // Remove netrinth and create electric
                changePixel(np, "electric");
                break;
            }
        }
    }
};

elements.magnetite_powder = {
    color: ["#3a3a3a", "#535353", "#a200d3"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2"
    ],
    category: 'evilness',
    state: 'solid',
    desc: 'tottaly not the same magnetite as the previous one',
    reactions: {
        "iron": { elem1: "magnetite_powder", elem2: null },
        "steel": { elem1: "magnetite_powder", elem2: null },
        "gold": { elem1: "magnetite_powder", elem2: null },
        "copper": { elem1: "magnetite_powder", elem2: null },
        "aluminum": { elem1: "magnetite_powder", elem2: null },
        "lead": { elem1: "magnetite_powder", elem2: null },
        "tungsten": { elem1: "magnetite_powder", elem2: null },
    },
    tempHigh: 3000,
    stateHigh: "molten_magnetite",
    tick: function(pixel) {
        if (Math.floor(Math.random() * 1000) + 1 === 1) {
            tryCreate('electric', pixel.x, pixel.y-1)
        }
    },
}

elements.side_gravity_powder = {
    color: ["#ff0000", "#ff8800", "#fffb00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"],
    fireColor: ["#ff0000", "#ff8800", "#fffb00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"],
    behavior: [
        "M2|XX|XX",
        "M1|XX|XX",
        "M2|XX|XX"
    ],
    desc: "Powder that falls sideways, isnt that cool?, NO PLEASE DONT THROW TOMATOES AT ME I DONT SUPPORT LGBTQ+",
    category: "evilness",
    state: "solid",
    burn: 20,
}

elements.side_gravity_powder_but_not_directly_sideways = {
    color: ["#ff0000", "#ff8800", "#fffb00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"],
    fireColor: ["#ff0000", "#ff8800", "#fffb00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"],
    behavior: [
        "XX|XX|XX",
        "M2|XX|XX",
        "M1|M2|XX"
    ],
    desc: "Powder that falls sideways, isnt that cool?, NO PLEASE DONT THROW TOMATOES AT ME I DONT SUPPORT LGBTQ+",
    category: "evilness",
    state: "solid",
    burn: 20,
}

elements.explosive_gas = {
    color: "#ff0000",
    behavior: behaviors.GAS,
    category: "evilness",
    state: "gas",
    reactions: {
        "fire": { elem1: "explosion", elem2: null },
        "plasma": { elem1: "supernova", elem2: null},
        "laser": { elem1: "explosion", elem2: null },
        "flash": { elem1: "explosion", elem2: null },
    },
    desc: "boom",
    tempHigh: 21,
    stateHigh: "explosion",
    tempLow: 19,
    stateLow: "explosion",
}

elements.neutronium = {
    color: ["#00ffdd", "#00098b", "rgba(71, 71, 71, 1)"],
    behavior: behaviors.POWDER,
    category: 'evilness',
    glow: true,
    state: 'solid',
    desc: 'A very dense and heavy element, made entirely out of neutrons, it is incredibly rare and valuable, but also very unstable.',
    tempHigh: 1000,
    stateHigh: "neutron",
    density: 10000,
    tick: function(pixel) {
        if (Math.floor(Math.random() * 600) + 1 === 1) {
            tryCreate('neutron', pixel.x, pixel.y-1)
        };
        if (Math.floor(Math.random() * 800) + 1 === 1) {
            tryCreate('electric', pixel.x, pixel.y-1)
        };
    },
    unbreakable: true,
    reactions: {
        "proton": { elem1: "neutron", elem2: null},
    }
}

