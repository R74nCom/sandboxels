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
    density: 1300,
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
    }