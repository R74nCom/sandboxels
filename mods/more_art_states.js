/*
A mod that adds some extra states of the art element.
(c) ACrazyPencil 2025
*/

elements.powder_art = {
    name: "Powder Art",
    color: "#ffffff",
	behavior: behaviors.POWDER,
	tool: function(pixel) {
		if (pixel.element === "paper") {
			deletePixel(pixel.x,pixel.y)
		}
	},
	canPlace: true,
	customColor: true,
    category: "powders",
    related: ["art", "liquid_art", "gas_art", "breakable_art"],
    burn: false,
    hardness: 1,
	conduct: false,
	stain: 0,
	state: "powder"
}

elements.liquid_art = {
    name: "Liquid Art",
	behavior: behaviors.LIQUID,
	tool: function(pixel) {
		if (pixel.element === "paper") {
			deletePixel(pixel.x,pixel.y)
		}
	},
	canPlace: true,
	customColor: true,
    category: "liquids",
    related: ["art", "powder_art", "breakable_art", "gas_art"],
    burn: false,
    hardness: 1,
	conduct: false,
	stain: 0,
	state: "liquid"
}

elements.gas_art = {
    name: "Gas Art",
	behavior: behaviors.GAS,
	tool: function(pixel) {
		if (pixel.element === "paper") {
			deletePixel(pixel.x,pixel.y)
		}
	},
	canPlace: true,
	customColor: true,
    category: "gases",
    related: ["art", "powder_art", "liquid_art", "breakable_art"],
    burn: false,
    hardness: 1,
	conduct: false,
	stain: 0,
    state: "gas"
}

elements.breakable_art = {
	name: "Breakable Art",
	behavior: behaviors.WALL,
	tool: function(pixel) {
		if (pixel.element === "paper") {
			deletePixel(pixel.x,pixel.y)
		}
	},
	canPlace: true,
	customColor: true,
    category: "solids",
    related: ["art", "powder_art", "liquid_art"],
    burn: false,
	conduct: false,
	stain: 0,
    state: "solid",
	tempLow: -45.555556,
	stateLow: "liquid_art",
	tempHigh: 204.444444,
	stateHigh: "gas_art",
	breakInto: "powder_art",
	breakIntoColorMultiplier: [1,1,1],
}

elements.art.related = ["powder_art", "liquid_art", "gas_art", "breakable_art"]
elements.art.hardness = 1
