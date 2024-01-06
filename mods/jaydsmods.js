elements.test_element = {
	color: "#ff0000",
	behavior: behaviors.POWDER,
	category: "land",
	state: "solid",
    reactions: {
        "dirt": { elem1: null, elem2: "mud" },
        }
    },
elements.tsar_bomba = {
    color: "#524c41",
    behavior: [
        "XX|EX:150>plasma|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:150>plasma|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1700,
    excludeRandom: true,
    cooldown: defaultCooldown
}
elements.meese = {
    color: "#996515",
    behavior: [
        "XX|XX|XX",
        "XX|FX%0.25|M2%0.5 AND BO",
        "XX|M1|XX",
    ],
     category: "life"
    },
elements.blackpowder = {
    color: ["#555D50","#36454F"],
    behavior: behaviors.STURDYPOWDER,
    category: "powders",
    burn: 100,
    burnTime: 250,
    tempHigh: 292,
    state: "solid",
    density: 5150,
    },
elements.rp1= {
    color: "#db5968",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1700,
    alias: "rocket propellant 1",
    burn: 100,
    burnTime: 400,
    };
