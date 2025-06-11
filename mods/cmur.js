//charsonsmodunoremake



//thanks r74n and sandboxels mod devs for the idea for making this and adding so much value to my gaming experience
//if one needs a desc for the mod list on the website it'd be something around "charson's mods compiled such as random foods and random elements asked for by random people, beta"
//thanks!




//needs absolute zero to be set to -99999999999999999999999999999




//n2s - for food, change all instances of ', elem2:"head"' into nothing.




elements.calcium_chloride = {
    color: ["#D3DDE8", "#C6CCD5", "#BCC7D3", "#DDE4EB"],
    behavior: behaviors.STURDYPOWDER,
    category: "powders",
    hidden: true,
    breakInto: ["calcium", "chlorine"],
    state: "solid",
    tempHigh: 772,
    reactions: {
        "sodium_carbonate": { elem1:"foam", elem2:"colour_pick_chalk" },
        "sodium": { elem1:"salt", elem2:"calcium" },
        "ice": { elem2:"water", chance: 0.5 },
        "dust": { elem2: null, chance: 0.5 },
        "water": { elem2: null, chance: 0.8 },
        "rotten_meat": { elem2: "meat" },
"laser": { elem1: ["calcium","chlorine"] },
    }
};




if (!elements.calcium.reactions) { // Include this block once
    elements.calcium.reactions = {} // This creates the property if it doesn't exist
}
elements.calcium.reactions.chlorine = { elem1: "calcium_chloride" }

if (!elements.calcium.reactions) { // Include this block once
    elements.calcium.reactions = {} // This creates the property if it doesn't exist
}
elements.sand.reactions.clay_soil = { elem1: "silt" }

if (!elements.calcium.reactions) { // Include this block once
    elements.calcium.reactions = {} // This creates the property if it doesn't exist
}
elements.wet_sand.reactions.water = { elem1: "quicksand", chance: 0.02 }


if (!elements.water.reactions) { // Include this block once
    elements.water.reactions = {} // This creates the property if it doesn't exist
}
elements.water.reactions.rust = { elem1: "hydrated_iron_oxide" }




if (!elements.sun.reactions) { // Include this block once
    elements.sun.reactions = {} // This creates the property if it doesn't exist
}
elements.sun.reactions.light = { elem2: "sunlight" }




if (!elements.aluminum.reactions) { // Include this block once
    elements.aluminum.reactions = {} // This creates the property if it doesn't exist
}
elements.aluminum.reactions.oxygen = { elem1: "alumina" }

if (!elements.plastic.reactions) { // Include this block once
    elements.plastic.reactions = {} // This creates the property if it doesn't exist
}
elements.plastic.reactions.radiation = { elem1: "latex", chance: 0.5 }




if (!elements.nitrogen.reactions) { // Include this block once
    elements.nitrogen.reactions = {} // This creates the property if it doesn't exist
}
elements.nitrogen.reactions.fire = { elem1: "pyrane" }




if (!elements.radiation.reactions) { // Include this block once
    elements.radiation.reactions = {} // This creates the property if it doesn't exist
}
elements.radiation.reactions.dead_plant = { elem2: "radioactive_maple_seed" }
elements.radiation.reactions.ant = { elem2: "rad_ant" }
elements.radiation.reactions.sugar = { elem2: "powdered_lime" }
elements.radiation.reactions.soap = { elem2: "purificanol" }
elements.radiation.reactions.diamond = { elem2: "emerald" }
elements.radiation.reactions.bird = { elem2: "pyrus_minimus" }




if (!elements.melted_cheese.reactions) { // Include this block once
    elements.melted_cheese.reactions = {} // This creates the property if it doesn't exist
}
elements.melted_cheese.reactions.sauce = { elem2: "akshajium" }




if (!elements.sodium.reactions) { // Include this block once
    elements.sodium.reactions = {} // This creates the property if it doesn't exist
}
elements.sodium.reactions.carbon_dioxide = { elem1: "sodium_carbonate" }




elements.sodium_carbonate = {
    color: "#ffffff",
    behavior: behaviors.POWDER,
    category: "powders",
    hidden: true,
    breakInto: ["sodium", "carbon_dioxide"],
    state: "solid",
    tempHigh: 851,
    reactions: {
        "calcium_chloride": { elem1:"foam", elem2:"colour_pick_chalk" },
        "chlorine": { elem1:"salt", elem2:"carbon_dioxide" },
        "laser": { elem1: ["carbon_dioxide","sodium","baking_soda"] },
    }
};




elements.silicon = {
    color: ["#9EBFE2", "#686F89", "#9BA4AB", "#373D4D"],
    behavior: behaviors.STURDYPOWDER,
    desc: "Silicon is a chemical element. It has symbol Si and atomic number 14. It is a hard, brittle crystalline solid with a blue-grey metallic lustre, and is a tetravalent metalloid and semiconductor.",
    category: "solids",
    state: "solid",
    conduct: 1,
    breakInto: ["silicon_shard", "silica"],
    tempHigh: 1414,
    reactions: {
        "oxygen": { elem1:"silicate", elem2:"pop" },
        "dough": { elem1:"boiling_catalyst", elem2:"pop", minTemp: 1000 },
    }
};

elements.silt = {
    color: ["#8a7965", "#6e604f"],
    behavior:  [
    "XX|SW:water|XX",
    "XX|XX|XX",
    "XX|M1|XX",
],
    behaviorOn: [
    "M1%3|XX|M1%3",
    "M1|XX|M1",
    "XX|M1%5|XX",
],
    category: "land",
    conduct: 0.5,
    state: "solid",
renderer: renderPresets.HEATGLOW,
    tempHigh: 800,
    stateHigh: "glass",
    reactions: {
        "water": { elem1:"carried_silt", chance: 0.5 },
    }
};

elements.carried_silt = {
    color: ["#8a7965", "#6e604f"],
    behavior: [
    "M1%3|SW:water|M1%3",
    "XX|CH:silt%10|M1",
    "XX|M1|XX",
],
    category: "states",
hidden:true,
    conduct: 0.5,
    state: "solid",
    tempHigh: 800,
    stateHigh: "glass",
};

elements.silicon_shard = {
    color: ["#95b1cf", "#8d9eb0"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    tempHigh: 1414,
renderer: renderPresets.HEATGLOW,
    stateHigh: "glass",
    breakInto: ["silicon_shard", "silicon_shard", "dust", "silica"],
    conduct: 1,
    reactions: {
    "oxygen": { elem1:"silicate", elem2:"pop", chance: 0.5 },
    }
};


elements.boiling_catalyst = {
    color: ["#9ed4e2", "#67a7b8"],
    behavior: behaviors.LIQUID,
    category: "states",
    hidden: true,
    state: "gas",
    temp: 1200,
    tempLow: 800,
    stateLow: "catalyst",
    reactions: {
        "boiling_catalyst": { elem1:["steam","bubble","foam"], chance: 0.1 },
    }
};

elements.catalyst = {
    color: ["#9ed4e2", "#67a7b8"],
    behavior: [
    "XX|SW%50 AND CO:5|XX",
    "M2|XX|M2",
    "XX|M1 AND SW%10 AND HT:5|XX",
],
    behaviorOn: [
    "XX|SW AND CO:5 AND M1%10|XX",
    "M1 AND SW|XX|M1 AND SW",
    "XX|M1 AND SW AND HT:5|XX",
],
    category: "liquids",
    state: "liquid",
    temp: 20,
    conduct: 1,
    tempHigh: 1000,
    stateHigh: "boiling_catalyst",
    tempLow: -50,
    stateLow: "silica",
    reactions: {
        "mercury": { elem1: null, chance: 0.3 },
        "molten_plastic": { elem2: "latex_catalyst", chance: 0.3 },
    }
};


elements.latex_catalyst = {
    color: ["#8a9c9a", "#6d7877"],
    singleColor: true,
    behavior: behaviors.LIQUID,
    category: "states",
    hidden: true,
    state: "liquid",
    temp: 20,
    tempLow: -20,
    stateLow: "latex",
    reactions: {
        "ammonia": { elem1:["frisket"], elem2:"foam",chance:0.5 },
    }
};


elements.alumina = {
    color: ["#989ECE", "#DADAFF", "#E6E1FF"],
    renderer: renderPresets.HEATGLOW,
    behavior: behaviors.POWDER,
    category: "powders",
    hidden: true,
    state: "solid",
    tempHigh: 500,
    stateHigh: "hyper_aluminum",
    reactions: {
        "silicate": { elem1:"kaolin", elem2:"kaolin" },
    }
};




elements.hyper_aluminum = {
    color: ["#61829e", "#61829e", "#61829e", "#61829e", "#5872a7"],
    behavior: behaviors.WALL,
    category: "solids",
    hidden: false,
    state: "solid",
    renderer: renderPresets.HEATGLOW,
    tempHigh: 9500,
    related: ["hyper_powder", "hyper_brick", "hyper_sand", "hyper_glass"],
    density: 3300,
    conduct: 1,
    desc: "With a sleek, metallic sheen, this material boasts enhanced durability, resistance to extreme temperatures, and a remarkable ability to withstand corrosion. Hyper Aluminium is the pinnacle of modern materials science—stronger, lighter, and more efficient than ever before, setting the stage for a new era of innovation.",
    charge: 3,
    stateHigh: "molten_aluminum",
    breakInto: ["hyper_aluminum", "hyper_aluminum", "hyper_aluminum", "hyper_aluminum", "hyper_powder"],
    hardness: 0.95,
    reactions: {
        "steel": { elem2:"galvanized_steel" },
        "rock_wall": { elem2:"wall" },
        "aluminum": {elem2: "hyper_aluminum", charged:true},
        "radiation": {elem1: "aluminum", chance:0.4},
    }
};

elements.hyper_powder = {
    color: ["#9baac9"],
    behavior: function(pixel) {
	if (pixel.start === pixelTicks) {return}
	if (pixel.charge && elements[pixel.element].behaviorOn) {
		pixelTick(pixel);
		return;
	}
	if (!tryMove(pixel, pixel.x, pixel.y+1)) {
		if (Math.random() < 0.5) {
			if (!tryMove(pixel, pixel.x+1, pixel.y+1)) {
				tryMove(pixel, pixel.x-1, pixel.y+1);
			}
		} else if (!tryMove(pixel, pixel.x-1, pixel.y+1)) {
			tryMove(pixel, pixel.x+1, pixel.y+1);
		}
	}
	doDefaults(pixel);
},
    category: "powders",
    hidden: true,
    state: "solid",
    tempHigh: 500,
    conduct: 1,
    burn: 40,
    renderer: renderPresets.HEATGLOW,
    charge: 3,
    stateHigh: "hyper_brick",
    hardness: 0.95,
    reactions: {
        "steel": { elem2:"galvanized_steel" },
	"sand": { elem1:"hyper_sand", elem2:"flash", minTemp: 300 },
        "rock_wall": { elem2:"wall" },
        "aluminum": {elem2: "hyper_aluminum", charged:true},
"radiation": {elem1: "rust", chance:0.4},
    }
};

elements.hyper_sand = {
    color: ["#dae8e8"],
    behavior: [
    "XX|CR:smoke%10|XX",
    "XX|CH:magnesium,silicate,pop,silicate,magnesium,pop%1|XX",
    "M2|M1 AND M1|M2",
],
    behaviorOn: [
    "XX|CR:smoke%10 AND CH:magnesium>hyper_sand|XX",
    "XX|CH:magnesium%0.01|XX",
    "M2|M1 AND M1|M2",
],
    category: "land",
    hidden: true,
    state: "solid",
    tempHigh: 2000,
    conduct: 1,
    renderer: renderPresets.HEATGLOW,
    charge: 1,
    stateHigh: "hyper_glass",
    hardness: 0.45,
    reactions: {
        "steel": { elem2:"galvanized_steel" },
        "rock_wall": { elem2:"wall" },
        "aluminum": {elem2: "hyper_aluminum", charged:true},
"radiation": {elem1: "sand", chance:0.4},
    }
};

elements.hyper_brick = {
    color: ["#61829e", "#80a1ad", "#6c8b96", "#698087", "#284266"],
    behavior: behaviors.WALL,
    category: "solids",
    colorPattern: textures.BRICK,
	colorKey: {
		"l": "#80a1ad",
		"r": "#6c8b96",
		"d": "#698087",
		"w": "#284266"},
    hidden: true,
    state: "solid",
renderer: renderPresets.HEATGLOW,
    tempHigh: 9500,
    conduct: 1,
    desc: "With a sleek, metallic sheen, this material boasts enhanced durability, resistance to extreme temperatures, and a remarkable ability to withstand corrosion. Hyper Aluminium is the pinnacle of modern materials science—stronger, lighter, and more efficient than ever before, setting the stage for a new era of innovation.",
    charge: 3,
    stateHigh: "molten_aluminum",
    breakInto: ["hyper_brick", "hyper_powder"],
    hardness: 0.95,
    reactions: {
        "steel": { elem2:"galvanized_steel" },
        "rock_wall": { elem2:"wall" },
        "aluminum": {elem2: "hyper_aluminum", charged:true},
"radiation": {elem1: "brick", chance:0.4},
    }
};

elements.hyper_glass = {
    color: ["#61829e", "#dae8e8", "#a3cccc"],
    behavior: behaviors.WALL,
    category: "solids",
    colorPattern: textures.GLASS,
	colorKey: {
		"g": "#c3e6e6",
		"S": "#6c8b96"},
    state: "solid",
    alpha: 0.5,
    tempHigh: 9500,
renderer: renderPresets.HEATGLOW,
    conduct: 1,
    charge: 3,
    stateHigh: "molten_aluminum",
    breakInto: ["hyper_glass", "hyper_sand"],
    hardness: 0.95,
    reactions: {
        "steel": { elem2:"galvanized_steel" },
        "rock_wall": { elem2:"wall" },
        "aluminum": {elem2: "hyper_aluminum", charged:true},
"radiation": {elem1: "stained_glass", chance:0.4},
    }
};






elements.silicate = {
    color: ["#A6B5B8", "#A7A8A0", "#665953", "#BDDAE8"],
    behavior: behaviors.POWDER,
    category: "powders",
renderer: renderPresets.HEATGLOW,
    hidden: true,
    breakInto: "silica",
    state: "solid",
    tempHigh: 500,
    stateHigh: "molten_silicon",
    reactions: {
        "alumina": { elem1:"kaolin", elem2:"kaolin" },
    }
};




elements.silica = {
    color: ["#ACAA9B", "#CAC7B6", "#979A93"],
    behavior: behaviors.LIGHTWEIGHT,
    behaviorOn: [
    "M1%3|XX|M1%3",
    "M1|XX|M1",
    "XX|M1%5|XX",
],
    conduct: 0.5,
    category: "powders",
    hidden: true,
renderer: renderPresets.HEATGLOW,
    state: "solid",
    tempHigh: 5000,
    stateHigh: "molten_ash",
    reactions: {
        "head": { elem1: null, func: behaviors.KILLPIXEL2 }, //silicosis reference.
    }
};








elements.kaolin = {
    color: ["#d3e2e6", "#e1e9eb", "#ede7e4", "#fcfcfc"],
    behavior: behaviors.POWDER,
    category: "land",
    hidden: true,
    state: "solid",
renderer: renderPresets.HEATGLOW,
    tempHigh: 500,
    stateHigh: "porcelain",
    reactions: {
        "fired_clay": { elem1:"porcelain", elem2:"porcelain" },
        "blood": { elem2: null },
        "dirt": { elem1: "clay", elem2:"clay_soil" },
    }
};




elements.kaolinite = {
    color: ["#3b3b3b", "#575757", "#fcfcfc"],
    behavior: behaviors.STURDYPOWDER,
    category: "solids",
    hidden: true,
    state: "solid",
    tempHigh: 500,
    stateHigh: "molten_slag",
renderer: renderPresets.HEATGLOW,
    breakInto: ["rock", "kaolin"],
    reactions: {
        "water": { elem1: "silicate", elem2:"dirty_water" },
    }
};




elements.colour_pick_chalk = {
    color: ["#FF4DFF", "#B24DFF", "#4D52FF", "#4DB0FF", "#4DFFDF", "#64FF4D", "#FFE74D", "#FF994D", "#FF5B4D", "#FF794D", "#FFB14D", "#A8FF4D", "#4DFF85", "#4DD6FF"],
    stain: 0.5,
    stainSelf: true,
    canContain: true,
    related: ["art", "calcium"],
    customColor: true,
    category: "solids",
renderer: renderPresets.HEATGLOW,
    breakInto: "colour_pick_chalk_powder",
    state: "solid",
    tempHigh: 590,
    stateHigh: "ash",
};




elements.chalk1 = {
    name: "Chalk",
    behavior: behaviors.WALL,
    color: ["#ffaaaa"],
    stain: 0.5,
    stainSelf: true,
    canContain: true,
    related: ["art", "calcium"],
    customColor: false,
    hidden: true,
    category: "solids",
    breakInto: "chalk_powder1",
    state: "solid",
    tempHigh: 590,
    stateHigh: "ash",
};




elements.chalk2 = {
    name: "Chalk",
    behavior: behaviors.WALL,
    color: ["#ff80aa"],
    stain: 0.5,
    stainSelf: true,
    canContain: true,
    related: ["art", "calcium"],
    customColor: false,
    hidden: true,
    category: "solids",
    breakInto: "chalk_powder2",
    state: "solid",
    tempHigh: 590,
    stateHigh: "ash",
};




elements.chalk3 = {
    name: "Chalk",
    behavior: behaviors.WALL,
    color: ["#ffffaa"],
    stain: 0.5,
    stainSelf: true,
    canContain: true,
    related: ["art", "calcium"],
    customColor: false,
    hidden: true,
    category: "solids",
    breakInto: "chalk_powder3",
    state: "solid",
    tempHigh: 590,
    stateHigh: "ash",
};




elements.chalk4 = {
    name: "Chalk",
    behavior: behaviors.WALL,
    color: ["#80ffaa"],
    stain: 0.5,
    stainSelf: true,
    canContain: true,
    related: ["art", "calcium"],
    customColor: false,
    hidden: true,
    category: "solids",
    breakInto: "chalk_powder4",
    state: "solid",
    tempHigh: 590,
    stateHigh: "ash",
};




elements.chalk5 = {
    name: "Chalk",
    behavior: behaviors.WALL,
    color: ["#aaff80"],
    stain: 0.5,
    stainSelf: true,
    canContain: true,
    related: ["art", "calcium"],
    customColor: false,
    hidden: true,
    category: "solids",
    breakInto: "chalk_powder5",
    state: "solid",
    tempHigh: 590,
    stateHigh: "ash",
};




elements.chalk6 = {
    name: "Chalk",
    behavior: behaviors.WALL,
    color: ["#aaffff"],
    stain: 0.5,
    stainSelf: true,
    canContain: true,
    related: ["art", "calcium"],
    customColor: false,
    hidden: true,
    category: "solids",
    breakInto: "chalk_powder6",
    state: "solid",
    tempHigh: 590,
    stateHigh: "ash",
};




elements.chalk7 = {
    name: "Chalk",
    behavior: behaviors.WALL,
    color: ["#aa80ff"],
    stain: 0.5,
    stainSelf: true,
    canContain: true,
    related: ["art", "calcium"],
    customColor: false,
    hidden: true,
    category: "solids",
    breakInto: "chalk_powder7",
    state: "solid",
    tempHigh: 590,
    stateHigh: "ash",
};




elements.chalk8 = {
    name: "Chalk",
    behavior: behaviors.WALL,
    color: ["#80aaff"],
    stain: 0.5,
    stainSelf: true,
    canContain: true,
    related: ["art", "calcium"],
    customColor: false,
    hidden: true,
    category: "solids",
    breakInto: "chalk_powder8",
    state: "solid",
    tempHigh: 590,
    stateHigh: "ash",
};




elements.chalk9 = {
    name: "Chalk",
    behavior: behaviors.WALL,
    color: ["#ffaaff"],
    stain: 0.5,
    stainSelf: true,
    canContain: true,
    related: ["art", "calcium"],
    customColor: false,
    hidden: true,
    category: "solids",
    breakInto: "chalk_powder9",
    state: "solid",
    tempHigh: 590,
    stateHigh: "ash",
};




elements.chalk_powder1 = {
    name: "Chalk Powder",
    behavior: behaviors.POWDER,
    color: ["#ffaaaa"],
    stain: 0.5,
    stainSelf: true,
    canContain: true,
    related: ["art", "calcium"],
    customColor: false,
    hidden: true,
    category: "powders",
    state: "solid",
    tempHigh: 590,
    stateHigh: "ash",
};




elements.chalk_powder2 = {
    name: "Chalk Powder",
    behavior: behaviors.POWDER,
    color: ["#ff80aa"],
    stain: 0.5,
    stainSelf: true,
    canContain: true,
    related: ["art", "calcium"],
    customColor: false,
    hidden: true,
    category: "powders",
    state: "solid",
    tempHigh: 590,
    stateHigh: "ash",
};




elements.chalk_powder3 = {
    name: "Chalk Powder",
    behavior: behaviors.POWDER,
    color: ["#ffffaa"],
    stain: 0.5,
    stainSelf: true,
    canContain: true,
    related: ["art", "calcium"],
    customColor: false,
    hidden: true,
    category: "powders",
    state: "solid",
    tempHigh: 590,
    stateHigh: "ash",
};




elements.chalk_powder4 = {
    name: "Chalk Powder",
    behavior: behaviors.POWDER,
    color: ["#80ffaa"],
    stain: 0.5,
    stainSelf: true,
    canContain: true,
    related: ["art", "calcium"],
    customColor: false,
    hidden: true,
    category: "powders",
    state: "solid",
    tempHigh: 590,
    stateHigh: "ash",
};




elements.chalk_powder5 = {
    name: "Chalk Powder",
    behavior: behaviors.POWDER,
    color: ["#aaff80"],
    stain: 0.5,
    stainSelf: true,
    canContain: true,
    related: ["art", "calcium"],
    customColor: false,
    hidden: true,
    category: "powders",
    state: "solid",
    tempHigh: 590,
    stateHigh: "ash",
};




elements.chalk_powder6 = {
    name: "Chalk Powder",
    behavior: behaviors.POWDER,
    color: ["#aaffff"],
    stain: 0.5,
    stainSelf: true,
    canContain: true,
    related: ["art", "calcium"],
    customColor: false,
    hidden: true,
    category: "powders",
    state: "solid",
    tempHigh: 590,
    stateHigh: "ash",
};




elements.chalk_powder7 = {
    name: "Chalk Powder",
    behavior: behaviors.POWDER,
    color: ["#aa80ff"],
    stain: 0.5,
    stainSelf: true,
    canContain: true,
    related: ["art", "calcium"],
    customColor: false,
    hidden: true,
    category: "powders",
    state: "solid",
    tempHigh: 590,
    stateHigh: "ash",
};




elements.chalk_powder8 = {
    name: "Chalk Powder",
    behavior: behaviors.POWDER,
    color: ["#80aaff"],
    stain: 0.5,
    stainSelf: true,
    canContain: true,
    related: ["art", "calcium"],
    customColor: false,
    hidden: true,
    category: "powders",
    state: "solid",
    tempHigh: 590,
    stateHigh: "ash",
};




elements.chalk_powder9 = {
    name: "Chalk Powder",
    behavior: behaviors.POWDER,
    color: ["#ffaaff"],
    stain: 0.5,
    stainSelf: true,
    canContain: true,
    related: ["art", "calcium"],
    customColor: false,
    hidden: true,
    category: "powders",
    state: "solid",
    tempHigh: 590,
    stateHigh: "ash",
};




elements.colour_pick_chalk_powder = {
    color: ["#FF4DFF", "#B24DFF", "#4D52FF", "#4DB0FF", "#4DFFDF", "#64FF4D", "#FFE74D", "#FF994D", "#FF5B4D", "#FF794D", "#FFB14D", "#A8FF4D", "#4DFF85", "#4DD6FF"],
    stain: 0.3,
    behavior: behaviors.POWDER,
    stainSelf: true,
    customColor: true,
    category: "powders",
    state: "solid",
    tempHigh: 590,
    stateHigh: "ash",
};




elements.powdered_lime = {
    color: ["#96F10E", "#BEF00F"],
    stain: 0.2,
    density: 2,
    hidden: true,
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "M2|M1 AND SW:water,milk|M2",
],
    category: "food",
    desc: "Mmm, yum, powder!",
renderer: renderPresets.HEATGLOW,
stateHigh: "ash",
tempHigh: 1000,
    state: "solid",
    reactions: {
        "water": { elem1:"foam", elem2:"limeade", chance: 0.7 },
        "milk": { elem1:"foam", elem2:"limilk", chance: 0.4 },
        "head": { elem1: null, chance: 0.9, func: behaviors.FEEDPIXEL },
    }
};




elements.limeade = {
    color: ["#96F10E", "#BEF00F", "#96F10E"],
    stainSelf: true,
    alpha: 0.9,
    stain: 0.12,
    behavior: behaviors.LIQUID,
    category: "food",
    state: "liquid",
    tempHigh: 105,
    stateHigh: "foam",
    tempLow: 0,
    stateLow: "limeade_ice",
    reactions: {
        "head": { elem1: null, chance: 0.7, func: behaviors.FEEDPIXEL },
    }
};




elements.limeade_ice = {
    color: ["#42f593", "#42f5b3", "#96F10E"],
    singleColor: true,
    alpha: 0.95,
    stain: 0.1,
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    temp: -7,
    hidden: true,
    state: "solid",
    tempHigh: 1,
    stateHigh: ["limeade", "slush"],
    reactions: {
        "head": { elem1: null, chance: 0.1, func: behaviors.FEEDPIXEL },
    }
};




elements.limilk = {
    color: ["#d4ffe1"],
    singleColor: true,
    behavior: [
    "XX|XX|XX",
    "M2|XX|M2",
    "M1|M1|M1",
],
    category: "food",
    state: "liquid",
    tempHigh: 105,
    stateHigh: "foam",
    tempLow: 0,
    stateLow: "l_ice_cream",
    reactions: {
        "head": { elem1: null, chance: 0.7, func: behaviors.FEEDPIXEL },
    }
};




elements.l_ice_cream = {
    color: ["#8cfaad", "#9effbb"],
    singleColor: false,
    alpha: 0.95,
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    temp: -10,
    hidden: false,
    state: "solid",
    tempHigh: 30,
    stateHigh: ["limilk", "slush"],
    breakInto: "limilkshake",
    reactions: {
        "head": { elem1: null, chance: 0.8, func: behaviors.FEEDPIXEL },
    }
};




elements.limilkshake = {
    color: ["#d4ffe1"],
    singleColor: true,
    behavior: [
    "XX|XX|XX",
    "M1|XX|M1",
    "M1|M1|M1",
],
    category: "food",
    hidden: true,
    state: "liquid",
    tempHigh: 30,
    stateHigh: "limilk",
    reactions: {
        "head": { elem1: null, chance: 0.9, func: behaviors.FEEDPIXEL },
    }
};




//stupidity mod begins here




elements.stupid = {
    color: ["#eb3486", "#0affda", "#c7fa89"],
    behavior: behaviors.POWDER,
    category: "weapons",
    viscosity: 10000,
    state: "solid",
    related: ["di_stupid", "tri_stupid"],
    density: 100,
    desc: "stupid",
    temp: 20,
    tempLow: 19,
    tempHigh: 450,
renderer: renderPresets.HEATGLOW,
          reactions: {
        "water": { elem1:"blaster", elem2:"nuke", chance: 0.001 },
        "stupid": { elem1:"cloner", elem2:"nuke", chance: 0.5 },
        "electric": { elem1:"di_stupid", elem2:"tri_stupid" },
        "dirt": { elem1:"tornado", elem2:"stupid", chance: 0.5 },
    }
};




elements.di_stupid = {
    color: ["#0b3486", "#faffda", "#07fa89"],
    behavior: behaviors.POWDER,
    category: "weapons",
    viscosity: 10000,
    state: "solid",
    density: 100,
    hidden: true,
    desc: "stupid",
    temp: 20,
    tempLow: 5,
    tempHigh: 450,
          reactions: {
        "di_stupid": { elem1:"di_stupid", elem2:"tsunami", chance: 0.001 },
        "stupid": { elem1:"party_popper", elem2:"cloner" },
        "water": { elem1:"earthquake", elem2:"acid" },
    }
};




elements.almond = {
    color: ["#855b34", "#9c836b", "#f5e7da"],
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    density: 100,
    desc: "no longer stupid",
    temp: 20,
    tempLow: 10,
    tempHigh: 40,
    renderer: renderPresets.WOODCHAR,
    stateHigh: "nut_sauce",
    breakInto: "nut_sauce",
    conduct: 1,
          reactions: {
        "head": { elem1: null, chance: 0.55, func: behaviors.FEEDPIXEL },
        "juice": { elem1:"party_popper", elem2:"party_popper" },
        "water": { elem1:"nut_sauce", elem2:"bubble" },
"laser": { elem1:"almond_tree", elem2:"pop" },
    }
};

elements.almond_tree = {
    color: ["#403a35", "#9c836b"], 
    behavior: [
    "CR:plant,almond_tree%0.2 AND CC:plant>#243d2b AND CC:wood>#403a35|CR:almond_tree%2 AND CC:plant>#243d2b AND CC:wood>#403a35|CR:plant,almond_tree%0.2 AND CC:plant>#243d2b AND CC:wood>#403a35",
    "CR:almond_tree%0.5 AND CR:almond%1 AND CC:plant>#243d2b AND CC:wood>#403a35|XX|CR:almond_tree%0.5 AND CR:almond%1 AND CC:plant>#243d2b AND CC:wood>#403a35",
    "XX|CH:almond_tree>wood%5 AND CC:wood>#403a35|XX",
],
    category: "life",
    singleColor: true,
    state: "solid",
    density: 100,
    temp: 20,
    tempLow: 10,
    tempHigh: 40,
    renderer: renderPresets.WOODCHAR,
    stateHigh: "dead_plant",
    breakInto: "dead_plant",
    conduct: 1,
          reactions: {
        "juice": { elem1:"party_popper", elem2:"party_popper" },
"dirt": { elem2:"almond_tree", chance: 0.1 },
"grass": { elem2:"almond_tree", chance: 0.1 },
    }
};



elements.nut_sauce = {
    color: ["#f2cba7", "#f5e7da"],
    behavior: behaviors.LIQUID,
    category: "food",
    viscosity: 10000,
    state: "liquid",
    density: 100,
    desc: "Highly flammable.",
    temp: 20,
    tempLow: 0,
    tempHigh: 500,
renderer: renderPresets.HEATGLOW,
    hidden: true,
    stateHigh: ["blaster", "floating_cloner"],
    stateHighColor: "#EF5810",
    stateLow: "glue",
    conduct: 1,
          reactions: {
        "head": { elem1: null, chance: 0.9, func: behaviors.FEEDPIXEL },
    }
};




elements.tri_stupid = {
    color: ["#ffffff", "#7a1d1d", "#000000"],
    behavior: behaviors.POWDER,
    category: "weapons",
    viscosity: 10000,
    state: "solid",
    density: 100,
    desc: "stupid",
    temp: 20,
    tempLow: 0,
    hidden: true,
    tempHigh: 40,
    stateLow: "ice",
    stateHigh: "magma",
    conduct: 1,
          reactions: {
        "almond": { elem1:"hot_bomb", elem2:"cold_bomb" },
        "nut_sauce": { elem1:"heat_ray", elem2:"freeze_ray" },
    }
};




//milkandsoap aka milkandstupidity mod begins here




elements.maple_syrup = {
    color: "#a13d08",
    behavior: [
    "XX|XX|XX",
    "M2|XX|M2",
    "M1|M1 AND SW:milk|M1",
],
    category: "liquids",
    viscosity: 100000,
    state: "liquid",
    density: 720,
    isFood: true,
    stain: 0.01,
    desc: "english for sirop derable",
          reactions: {
        "head": { elem1: null, chance: 0.4, func: behaviors.FEEDPIXEL },
    }
};






elements.radioactive_maple_seed = {
    color: ["#52d156", "#5d875f"],
    behavior: behaviors.RADPOWDER,
    behaviorOn: [
    "XX|XX|XX",
    "XX|EX:2>popcorn|XX",
    "XX|XX|XX",
],
    category: "life",
    viscosity: 100000,
    hidden: true,
    state: "solid",
    isFood: true,
    desc: "how does this work",
          reactions: {
        "dirt": { elem1:"maple_nut", elem2:"dirt" },
        "grass": { elem1:"maple_nut", elem2:"dirt" },
        "ant": { elem1: null, elem2:"rad_ant" }
    }
};




elements.maple_nut = {
    color: "#735e3b",
    behavior: behaviors.POWDER,
    category: "life",
    viscosity: 100000,
    state: "solid",
renderer: renderPresets.WOODCHAR,
    isFood: true,
    hidden: true,
    desc: "I dont think this is biologically accurate",
    breakInto: ["maple_syrup", "maple_powder"],
    stateHigh: ["ash", "smoke", "baked_breeze"],
          reactions: {
        "dirt": { elem1:"maple_plant", elem2:"maple_nut", chance: 0.001 },
    }
};




elements.maple_plant = {
    color: "#735e3b",
    behavior: behaviors.STURDYPOWDER,
    category: "life",
    viscosity: 100000,
    state: "solid",
    isFood: true,
    hidden: true,
    desc: "I dont think this is biologically accurate",
    breakInto: "dead_plant",
    burn: 90,
        reactions: {
        "dirt": { elem1:"maple_plant", elem2:"maple_nut", chance: 0.001 },
        "plant": { elem1:"maple_plant", elem2:"maple_plant", chance: 0.1 },
        "dead_plant": { elem1:"maple_plant", elem2:"maple_plant", chance: 0.3 },
        "water": { elem1:"maple_plant", elem2:"maple_plant", chance: 0.0001 },
    }
};




elements.maple_powder = {
    color: "#9e6213",
    behavior: behaviors.POWDER,
    category: "food",
    viscosity: 100000,
    state: "solid",
    hidden: true,
    isFood: true,
        reactions: {
        "milk": { elem1:"foam", elem2:"maple_milk" },
        "clay": { elem1: null, elem2:"terracotta" },
    }
};




elements.red_terracotta = {
    color: "#c96363",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    tempHigh: 500,
    hidden: true,
    stateHigh: "heated_terracotta",
};




elements.terracotta = {
    color: ["#c98c63", "#B97140"],
    hardness: 0.4,
    singleColor: true,
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    tempHigh: 500,
    stateHigh: "heated_terracotta",
    breakInto: "silica",
    breakIntoColor: "#A5775A",
    reactions: {
        "pyric_nitrite": { elem1:"red_terracotta", elem2: null },
        "sulfur": { elem1:"yellow_terracotta", elem2: null },
        "gold_coin": { elem1:"golden_terracotta", elem2: null },
        "scheele_green": { elem1:"green_terracotta", elem2: null },
        "rad_shard": { elem1:"teal_terracotta", elem2: null },
        "skibidi_soda": { elem1:"blue_terracotta", elem2: null }, 
        "violetium": { elem1:"purple_terracotta", elem2: null },
    }
};




elements.yellow_terracotta = {
    color: "#c9ae63",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    hidden: true,
    tempHigh: 500,
    stateHigh: "heated_terracotta",
};




elements.golden_terracotta = {
    color: ["#EEC211", "#DBC624", "#E8D417", "#E7DD66"],
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    hidden: true,
    tempHigh: 500,
    breakInto: ["gold", "terracotta"],
    stateHigh: ["heated_terracotta", "molten_gold", "slag"],
};




elements.green_terracotta = {
    color: "#63c96d",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    hidden: true,
    tempHigh: 500,
    stateHigh: "heated_terracotta",
};




elements.teal_terracotta = {
    color: "#63c994",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    tempHigh: 500,
    hidden: true,
    stateHigh: "heated_terracotta",
};




elements.blue_terracotta = {
    color: "#63b6c9",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    hidden: true,
    tempHigh: 500,
    stateHigh: "heated_terracotta",
};




elements.purple_terracotta = {
    color: "#6f63c9",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    tempHigh: 500,
    hidden: true,
    stateHigh: "heated_terracotta",
};

elements.terracotta_brick = {
    color: ["#B97140", "#c98c63"],
    behavior: behaviors.WALL,
    category: "solids",
    colorPattern: textures.BRICK,
	colorKey: {
		"l": "#B97140",
		"r": "#cf8859",
		"d": "#8a6746",
		"w": "#59330e"},
    state: "solid",
    tempHigh: 500,
    stateHigh: "molten_terracotta",
    breakInto: ["terracotta", "silica"],
    hardness: 0.95,
};


elements.heated_terracotta = {
    color: "#db773d",
    behavior: behaviors.STURDYPOWDER,
    category: "states",
    state: "solid",
    temp: 500,
    stateHighName: "molten_terracotta",
    renderer: renderPresets.HEATGLOW,
    tempHigh: 1000,
    hidden: true,
    tempLow: 20,
    stateLow: ["terracotta"],
};




elements.maple_milk = {
    color: "#f5e3cb",
    behavior: behaviors.LIQUID,
    category: "food",
    viscosity: 100000,
    state: "liquid",
    desc: "a great drink",
    hidden: true,
    isFood: true,
        reactions: {
        "head": { elem1: null, chance: 0.9, func: behaviors.FEEDPIXEL },
    }
};




elements.purity = {
    color: "#f0f7fc",
    behavior: behaviors.WALL,
    category: "soaps",
    state: "solid",
    tempHigh: 70,
        hidden: true,
    stateHigh: "soap",
    stain: 1,
};




elements.purium = {
    color: "#cededd",
    behavior: behaviors.WALL,
    category: "soaps",
    state: "solid",
    hidden: true,
    tempHigh: 125,
    stateHigh: "purificanol",
    stain: 1,
    conduct: 1,
    breakInto: "purium_dust",
};




elements.purium_dust = {
    color: ["#cededd", "#95c7c4", "#ffffff"],
    behavior: behaviors.POWDER,
    category: "soaps",
        hidden: true,
    state: "solid",
    tempHigh: 125,
    stateHigh: ["purity", "soap"],
    stain: 1,
    conduct: 1,
};




elements.invalid = {
    color: ["#ff00dc", "#010001"],
    behavior: [
            ["XX","CR:malware","XX"],
            ["XX","XX","XX"],
            ["M2","M1","M2"]
        ],
    category: "machines",
    state: "solid",
    tempHigh: 9999,
    desc: "INVALID DESCRIPTION",
    stateHigh: "fallout",
    tempLow: -40,
    stateLow: "random",
    conduct: 1,
    breakInto: "electric",
    reactions: {
        "electric": { elem1: "null", elem2:"null" },
    }
};




elements.null = {
    color: ["#514a57", "#2c1040"],
     behavior: [
            ["XX","XX","XX"],
            ["XX","XX","XX"],
            ["XX","XX","XX"]
        ],
    behaviorOn: [
            ["CR:null","XX","CR:null"],
            ["XX","XX","XX"],
            ["CR:null","XX","CR:null"]
        ],
    behavior: behaviors.WALL,
    category: "machines",
    state: "solid",
    desc: "null",
    tempLow: -40,
    breakInto: "emp_bomb",
    stateLow: "unknown",
    conduct: 0.2,
        hidden: true,
    reactions: {
        "electric": { elem1: "null", elem2:"null" },
    }
};




elements.purificanol = {
    color: "#ffffff",
    behavior: behaviors.LIQUID,
    category: "soaps",
    viscosity: 100,
    state: "liquid",
    desc: "soap 3.0",
    extinguish: true,
    stain: -0.5,
    behaviorOn: [
    ["XX","CO:5","XX"],
    ["CO:5","XX","CO:5"],
    ["CO:5 AND M1","CO:5 AND M1","CO:5 AND M1"]
],
    density: 999999999,
    temp: 1,
    tempLow: -273,
    stateLow: "foam",
        reactions: {
        "dirt": { elem1: "foam", elem2: "purity" },
        "dead_bug": { elem1: "foam", elem2: "ant" },
        "uranium": { elem1: "foam", elem2: "lead" },
        "colour_pick_chalk_powder": { elem1: "foam", elem2: "foam" },
        "poison": { elem1: "foam", elem2: "antidote" },
        "infection": { elem1: "bless", elem2: ["vaccine", "antibody"] },
        "fallout": { elem1: "anti_soap", elem2: "contaminol" },
        "sand": { elem1: "foam", elem2: "purity" },
        "dust": { elem1: "foam", elem2: "purity" },
        "ash": { elem1: "foam", elem2: "purity" },
        "rock": { elem1: "foam", elem2: "porcelain_shard" },
        "clay": { elem1: "foam", elem2: "porcelain_shard" },
        "magma": { elem1: "foam", elem2: "purium" },
        "slag": { elem1: "foam", elem2: "purity" },
        "molten_slag": { elem1: "foam", elem2: "purium_dust" },
        "basalt": { elem1: "foam", elem2: "purity" },
        "slime": { elem1: "foam", elem2: "purity" },
        "dirty_water": { elem1: "foam", elem2: "water" },
        "blood": { elem1: "foam", elem2: "water" },
        "molten_iron": { elem1: "foam", elem2: "purium" },
        "molten_dirt": { elem1: "foam", elem2: "purium" },
        "molten_copper": { elem1: "foam", elem2: "purium" },
        "rust": { elem1: "foam", elem2: "purium_dust" },
        "water": { elem1: "foam", elem2: "bubble" },
        "ice": { elem1: "foam", elem2: "bubble" },
        "steam": { elem1: "foam", elem2: "bubble" },
        "mudstone": { elem1: "foam", elem2: "porcelain_shard" },
        "rad_ant": { elem1: "foam", elem2: "ant" },
        "dead_plant": { elem1: "foam", elem2: "plant" },
        "frozen_plant": { elem1: "foam", elem2: "plant" },
        "smoke": { elem1: "foam", elem2: "bless" },
        "fire": { elem1: "foam", elem2: "bless" },
        "meat": { elem1: "foam", elem2: "cooked_meat" },
        "rotten_meat": { elem1: "foam", elem2: "cured_meat" },
        "cancer": { elem1: "foam", elem2: "dna" },
    "thermite": { elem1: "foam", elem2: "null" },
    },
};




elements.beta_purificanol = {
    color: "#ffffff",
    behavior: behaviors.GAS,
    category: "soaps",
    viscosity: 100,
    state: "gas",
    desc: "soap 3.0, but liquid",
    extinguish: true,
    stain: -0.5,
    behaviorOn: [
    ["XX","CO:5","XX"],
    ["CO:5","XX","CO:5"],
    ["CO:5 AND M1","CO:5 AND M1","CO:5 AND M1"]
],
    density: 999999999,
    temp: 1,
    tempLow: -273,
    stateLow: "foam",
        reactions: {
        "dirt": { elem1: "foam", elem2: "purity" },
        "dead_bug": { elem1: "foam", elem2: "ant" },
        "uranium": { elem1: "foam", elem2: "lead" },
        "colour_pick_chalk_powder": { elem1: "foam", elem2: "foam" },
        "poison": { elem1: "foam", elem2: "antidote" },
        "infection": { elem1: "bless", elem2: ["vaccine", "antibody"] },
        "fallout": { elem1: "anti_soap", elem2: "contaminol" },
        "sand": { elem1: "foam", elem2: "purity" },
        "dust": { elem1: "foam", elem2: "purity" },
        "ash": { elem1: "foam", elem2: "purity" },
        "rock": { elem1: "foam", elem2: "porcelain_shard" },
        "clay": { elem1: "foam", elem2: "porcelain_shard" },
        "magma": { elem1: "foam", elem2: "purium" },
        "slag": { elem1: "foam", elem2: "purity" },
        "molten_slag": { elem1: "foam", elem2: "purium_dust" },
        "basalt": { elem1: "foam", elem2: "purity" },
        "slime": { elem1: "foam", elem2: "purity" },
        "dirty_water": { elem1: "foam", elem2: "water" },
        "blood": { elem1: "foam", elem2: "water" },
        "molten_iron": { elem1: "foam", elem2: "purium" },
        "molten_dirt": { elem1: "foam", elem2: "purium" },
        "molten_copper": { elem1: "foam", elem2: "purium" },
        "rust": { elem1: "foam", elem2: "purium_dust" },
        "water": { elem1: "foam", elem2: "bubble" },
        "ice": { elem1: "foam", elem2: "bubble" },
        "steam": { elem1: "foam", elem2: "bubble" },
        "mudstone": { elem1: "foam", elem2: "porcelain_shard" },
        "rad_ant": { elem1: "foam", elem2: "ant" },
        "dead_plant": { elem1: "foam", elem2: "plant" },
        "frozen_plant": { elem1: "foam", elem2: "plant" },
        "smoke": { elem1: "foam", elem2: "bless" },
        "fire": { elem1: "foam", elem2: "bless" },
        "meat": { elem1: "foam", elem2: "cooked_meat" },
        "rotten_meat": { elem1: "foam", elem2: "cured_meat" },
        "cancer": { elem1: "foam", elem2: "dna" },
    "thermite": { elem1: "foam", elem2: "null" },
    },
};




elements.rad_ant = {
    color: ["#6ceb36", "#50e012"],
    behavior: behaviors.LIQUID,
    category: "life",
    state: "solid",
        hidden: true,
    desc: "uh oh",
    tempHigh: 100,
    stateHigh: ["dead_bug", "radiation"],
          reactions: {
        "dirt": { elem1:"rad_ant", elem2:"radiation" },
        "grass": { elem1:"rad_ant", elem2:"radioactive_maple_seed" },
        "ant": { elem1:"rad_ant", elem2:"rad_ant" },
        "rock": { elem1:"rad_ant", elem2:"uranium" },
    }
};




elements.buttermilk = {
    color: "#f4f5c1",
    behavior: behaviors.LIQUID,
    category: "food",
    state: "liquid",
    desc: "Yum!",
        hidden: true,
    tempHigh: 100,
    stateHigh: "steam",
          reactions: {
        "head": { elem1: null, chance: 0.9, func: behaviors.FEEDPIXEL },
        "water": { elem1: null, elem2:"milk" },
        "rock": { elem1: null, elem2:"butter" },
        "magma": { elem1: null, elem2:"melted_butter" },
    }
};




if (!elements.butter.reactions) { // Include this block once
    elements.butter.reactions = {} // This creates the property if it doesn't exist
}
elements.butter.reactions.milk = { "elem1":null, "elem2":"buttermilk" }




elements.stupid_particle = {
    color: ["#eb3486", "#0affda", "#c7fa89"],
    behavior: behaviors.BOUNCY,
    category: "weapons",
    state: "solid",
    density: 0,
    desc: "stupid",
    temp: 20,
    tempLow: 19,
    tempHigh: 21,
          reactions: {
        "stupid_particle": { elem1:"neutron", elem2:"nuke", chance: 0.5},
    }
};




elements.boom_boom_particle = {
    color: ["#00ff00", "#ff00dc", "#0000ff"],
    behavior: behaviors.BOUNCY,
    category: "weapons",
    state: "gas",
    density: 0,
    desc: "andrew zhao",
    temp: 20,
    tempLow: 19,
    tempHigh: 21,
          reactions: {
        "boom_boom_particle": { elem1:"explosion", elem2:"pop", chance: 0.7 },
    }
};




elements.julianite = {
    color: ["#505050", "#265227"],
    behavior: [
    "CR:electric%0.5|CR:electric%1|CR:electric%0.5",
    "XX|XX|XX",
    "M2|M1|M2",
],
    category: "special",
    state: "liquid",
    tempHigh: 999999,
    stateHigh: "plasma",
    tempLow: -25,
          reactions: {
        "plasma": { elem1:"hyperjulianite" },
        "smoke": { elem1:"hyperjulianite" },
        "lightning": { elem1:"hyperjulianite" },
        "rock": { elem2:"julianite" },
    }
};




elements.hyperjulianite = {
    color: ["#6A6A6A", "#522651"],
    behavior: behaviors.SLIDE,
    category: "states",
    state: "solid",
        hidden: true,
    tempHigh: 1000,
    tempLow: -40,
    stateLow: "snake",
          reactions: {
        "static": { elem2:"julianite" },
        "rock": { elem2:"plasma" },
        "water": { elem2:"electric" },
        "dirt": { elem2:"battery" },
        "plant": { elem2:"snake" },
    }
};




elements.sankarium = {
    color: ["#b5140e", "#494b52", "#d2d9d2"],
    behavior: behaviors.BUBBLE,
    category: "special",
    state: "solid",
    tempHigh: 100,
    burn: 90,
    fireColor: "#0c92f7",
    burnInto: "c-4",
    stateHigh: "narayananium",
          reactions: {
        "dirt": { elem1:"stupid" },
    }
};




elements.narayananium = {
    color: ["#0EAFB5", "#525049", "#D9D2D9"],
    behavior: behaviors.POWDER,
    category: "special",
    state: "solid",
        hidden: true,
    burn: 90,
    fireColor: "#22DDA2",
};




elements.narayananium.behavior = [
   ["XX","XX","XX"],
    ["XX","XX","XX"],
    ["XX","M1 AND EX:10>party_popper","XX"],   
];




elements.tetra_stupid = {
    color: ["#4AB58A", "#B54A75"],
    behavior: behaviors.SLIDE,
    category: "weapons",
    state: "solid",
        hidden: true,
    conduct: 1,
};




elements.banana = {
    color: ["#F4FD3F", "#C3F30C", "#FBE904"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    desc: "minion reference",
    burn: 90,
    fireColor: "#ED126A",
    burnInto: "sweet_savour",
    renderer: renderPresets.WOODCHAR,
    conduct: 1,
    breakInto: "banana_milk",
    breakIntoColor: "#d8b284",
    reactions: {
        "head": { elem1: null, chance: 0.35, func: behaviors.FEEDPIXEL },
        "milk": { elem1: null, elem2: "banana_milk" },
    }
};




elements.banana_milk = {
    color: "#fdfdce",
    behavior: [
"XX|XX|XX",
"M2|XX|M2",
"M1|M1 AND CH:head>asl_hd%5|M1",
],
    category: "food",
    state: "liquid",
    density: 10000,
    charge: 1,
    superconductAt: 100,
    burn: 100,
    viscosity: 29,
    tempLow: -7,
        hidden: true,
    stateLowName: "banana_ice",
    tempHigh: 239,
    stateHigh: "steam",
    fireColor: "#DD00FF",
    burnInto: "sour_scent",
    conduct: 1,
    reactions: {
        "head": { elem1: null, chance: 0.9, func: behaviors.FEEDPIXEL },
        "asl_hd": { elem1: null, chance: 0.9, func: behaviors.FEEDPIXEL },
    }
};




//particlesplus begins here
                                         
elements.thermon = {
    color: "#EB14AC",
    behavior: behaviors.BOUNCY,
    category: "energy",
    desc: "The thermon is a subatomic particle with a negative one elementary electric charge as well as heat.",
    state: "gas",
    charge: 1,
    maxSize: 1,
    superconductAt: 1,
    burning: true,
    temp: 999,
    fireColor: "#1CD8E3",
    conduct: 1,
    reactions: {
        "thermon": { elem1: "superthermon", elem2: "neutron" },
    }
};




elements.superthermon = {
    color: "#B010EF",
    behavior: behaviors.BOUNCY,
        hidden: true,
    category: "energy",
    desc: "The superthermon is a subatomic particle with a negative one elementary electric charge as well as high heat.",
    state: "gas",
    charge: 1,
    maxSize: 1,
    superconductAt: 1,
    burning: true,
    temp: 99999,
    fireColor: "#1CD8E3",
    conduct: 1,
    reactions: {
        "neutron": { elem1: "explosion" },
        "thermon": { elem1: "hyperthermon", elem2: "neutron" },
    }
};




elements.hyperthermon = {
    color: ["#5554AB", "#FF9D00"],
    behavior: behaviors.BOUNCY,
    category: "energy",
        hidden: true,
    desc: "The hyperthermon is a subatomic particle with a negative one elementary electric charge as well as immense heat.",
    state: "gas",
    charge: 1,        
    maxSize: 1,
    superconductAt: 1,
    burning: true,
    temp: 9999999,
    fireColor: "#1CD8E3",
    conduct: 1,
    reactions: {
        "neutron": { elem1: "explosion" },
        "electric": { elem1: "h_bomb" },
        "thermon": { elem1: "unstable_thermon", elem2: "neutron" },
    }
};




elements.unstable_thermon = {
    color: ["#FFFFFF"],
    behavior: behaviors.BOUNCY,
    category: "energy",
    desc: "ERROR",
        hidden: true,
    maxSize: 1,
    state: "gas",
    charge: 1,
    superconductAt: 1,
    burning: true,
    temp: 9999999999999999999999999999999999999,
    fireColor: "#1CD8E3",
    conduct: 1,
    reactions: {
        "neutron": { elem1: "explosion" },
        "proton": { elem1: "dirty_bomb" },
        "electric": { elem1: "h_bomb" },
        "thermon": { elem1: "supernova", elem2: "neutron" },
    }
};








elements.tetra_stupid.behavior = [
    ["CH:tetra_stupid","CH:banana","CH:tetra_stupid"],
    ["CH:banana","XX","CH:banana"],
    ["M2","M1 AND CH:banana","M2"]
];




elements.cryon = {
    color: "#1FD1E0",
    behavior: behaviors.BOUNCY,
    category: "energy",
    desc: "The cryon is a subatomic particle with a negative one elementary electric charge as well as negative heat.",
    state: "gas",
    charge: 1,
    superconductAt: -273.5,
    maxSize: 1,
    temp: -99,
    burn: 100,
    fireColor: "#1CD8E3",
    conduct: 1,
    reactions: {
        "cryon": { elem1: "supercryon", elem2: "neutron" },
    }
};




elements.supercryon = {
    color: "#99B1C0",
    behavior: behaviors.BOUNCY,
    category: "energy",
    desc: "The supercryon is a subatomic particle with a negative one elementary electric charge as well as extremely low heat.",
    state: "gas",
        hidden: true,
    charge: 1,
    maxSize: 1,
    superconductAt: -273.5,
    temp: -273.5,
        hidden: true,
    burn: 100,
    fireColor: "#1CD8E3",
    conduct: 1,
    reactions: {
        "neutron": { elem1: "explosion" },
        "cryon": { elem1: "hypercryon", elem2: "neutron" },
    }
};




elements.hypercryon = {
    color: ["#0062FF", "#6424DB"],
    behavior: behaviors.BOUNCY,
    category: "energy",
    desc: "The hypercryon is a subatomic particle with a negative one elementary electric charge as well as immense lack of heat.",
    state: "gas",
    charge: 1,
    superconductAt: -273.5,
        hidden: true,
    temp: -999999,
    burn: 100,
    maxSize: 1,
    fireColor: "#1CD8E3",
    conduct: 1,
    reactions: {
        "neutron": { elem1: "explosion" },
        "electric": { elem1: "h_bomb" },
        "cryon": { elem1: "unstable_cryon", elem2: "neutron" },
    }
};




elements.unstable_cryon = {
    color: ["#FFFFFF"],
    behavior: behaviors.BOUNCY,
    category: "energy",
    maxSize: 1,
    desc: "ERROR",
    state: "gas",
    charge: 1,
    superconductAt: -273.5,
        hidden: true,
    temp: -999999999999999999999999999,
    burn: 100,
    fireColor: "#1CD8E3",
    conduct: 1,
    reactions: {
        "neutron": { elem1: "explosion" },
        "proton": { elem1: "dirty_bomb" },
        "electric": { elem1: "h_bomb" },
        "cryon": { elem1: "supernova", elem2: "neutron" },
    }
};




elements.anti_soap = {
    color: ["#0000FF"],
    behavior: behaviors.FOAM,
    category: "soaps",
    state: "solid",
    hidden: true,
    burn: 100,
    reactions: {
        "soap": { elem2: null },
        "purificanol": { elem2: null },
    }
};




elements.violetium = {
    color: ["#494bb3", "#7049b3", "#7049b3"],
    category: "powders",
    state: "solid",
    temp: 40,
    burn: 100,
    fireColor: "#6e34eb",
    conduct: 1,
};




elements.violetium.behavior = [
   ["XX","XX","XX"],
    ["XX","XX","XX"],
    ["XX","M1 AND EX:10>purple_gold","XX"],   
];




elements.pyrus_minimus = {
    color: ["#eb6e34", "#ffd014", "#ff143c"],
    desc: "The rare Pyrus Minimus is a flying...animal? It preys on birds and worms.",
    behaviorOn: [
    "XX|XX|XX",
    "XX|EX:5>firework|XX",
    "XX|XX|XX",
],
    behavior: behaviors.FLY,
    category: "life",
    state: "solid",
    foodNeed: 7,
    breakInto: ["fire", "cooked_meat", "slime"],
    glow: true,
    temp: 300,
    baby: "pyrus_minimus",
    singleColor: true,
    fireColor: "#ff5b14",
    conduct: 1,
     reactions: {
        "cooked_meat": { elem2: null, func: behaviors.FEEDPIXEL },
        "dead_plant": { elem2: null, func: behaviors.FEEDPIXEL },
        "juice": { elem2: null, func: behaviors.FEEDPIXEL },
        "chocolate": { elem2: null, func: behaviors.FEEDPIXEL },
        "basalt": { elem2: null, func: behaviors.FEEDPIXEL },
        "bird": { elem2: ["feather", "blood"], func: behaviors.FEEDPIXEL },
        "worm": { elem2: null, func: behaviors.FEEDPIXEL },
    }
};




elements.stablium = {
    color: ["#516c87", "#de1998", "#c4e043"],
    behavior: behaviors.POWDER,
    behaviorOn: [
    "XX|XX|XX",
    "XX|EX:25>fw_ember,electric,flash,pop,proton|XX",
    "XX|XX|XX",
],
    category: "special",
    state: "solid",
    alpha: 0.73,
    breakInto: ["positron", "electrum"],
    glow: true,
    temp: 20,
    burn: 55,
    singleColor: true,
    fireColor: ["#f71e0a", "#f7940a", "#eff70a", "#0af722", "#0a69f7"],
    conduct: 1,
    tempHigh: 275,
     reactions: {
        "proton": { elem1: "ash", elem2: ["thermon", "cryon"] },
    } 
};




elements.arsenic = {
    color: ["#874809", "#97ad05"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    temp: 20,
    burn: 55,
    burnInto: "poison",
    fireColor: "#a1ccc7",
    tempHigh: 275,
     reactions: {
        "copper": { elem1: "scheele_green", elem2: "scheele_green" },
        "ash": { elem1: "ashen_arsenic", elem2: "flash" },
    } 
};

elements.ashen_arsenic = {
    color: ["#59544e"],
    behavior: [
    "XX|CR:poison_gas%1|XX",
    "XX|XX|XX",
    "M2|M1|M2",
],
    category: "powders",
    renderer: renderPresets.WOODCHAR,
    hidden: true,
    state: "solid",
    temp: 40,
    stateHigh: "explosion",
    fireColor: "#9ed1db",
    tempHigh: 300,
     reactions: {
        "water": { elem1: "arsenic", elem2: "dirty_water", chance: 0.5 },
        "radiation": { elem1: "cindarsenic", chance: 0.5 },
    } 
};

elements.cindarsenic = {
    color: ["#b8561d", "#8a6651", "#606660"],
    behavior: [
    "XX|CR:radiation,fire%2|XX",
    "XX|XX|XX",
    "M2|M1|M2",
],
    category: "weapons",
    state: "solid",
    temp: 40,
    burn: 40,
    burnTime: Infinity,
    renderer: renderPresets.WOODCHAR,
    fireColor: "#c9248d",
    tempHigh: 400,
     reactions: {
        "water": { elem1: "ashen_arsenic", elem2: "dirty_water", chance: 0.3 },
    } 
};



elements.scheele_green = {
    color: ["#2B7D45", "#87CA7C"],
    behavior: behaviors.RADPOWDER,
    category: "powders",
    state: "solid",
    alpha: 0.99,
    temp: 20,
    breakInto: "poison",
    burn: 55,
    burnInto: "poison",
    fireColor: "#2cff29",
    tempHigh: 275,
        hidden: true,
    stateHigh: "molten_copper",
     reactions: {
        "terracotta": { elem1: null, elem2: "green_terracotta" },
        "head": { elem1: "poison", elem2: "green_skull", chance: 0.3, func: behaviors.KILLPIXEL2 },
    } 
};




elements.green_skull = {
    color: ["#67bf65", "#527d51"],
    behavior: behaviors.RADPOWDER,
    category: "powders",
    state: "solid",
    temp: 20,
    breakInto: ["bone_meal", "fallout"],
    burn: 55,
    burnInto: "rad_shard",
        hidden: true,
    fireColor: "#573311",
    tempHigh: 275,
    stateHigh: "rad_steam",
     reactions: {
        "head": { elem2: "green_skull", chance: 0.1, func: behaviors.KILLPIXEL2 },
    } 
};




elements.contaminol = {
    color: "#005F00",
    behavior: [
    "XX|CR:sour_scent,radiation%2|XX",
    "M1|XX|M1",
    "M2|M1|M2"
],
    category: "soaps",
    viscosity: 100,
    state: "liquid",
    extinguish: true,
    density: 999999999,
    temp: 1,
    tempLow: -273,
    stateLow: "foam",
        reactions: {
        "dirt": { elem1: "foam", elem2: "impurity" },
        "purity": { elem1: "foam", elem2: "impurity" },
        "sand": { elem1: "foam", elem2: "tinder" },
        "dust": { elem1: "foam", elem2: "magnesium" },
        "ash": { elem1: "foam", elem2: "magnesium" },
        "rock": { elem1: "foam", elem2: "mudstone" },
        "clay": { elem1: "foam", elem2: "slag" },
        "magma": { elem1: "foam", elem2: "molten_uranium" },
        "purium_dust": { elem1: "foam", elem2: "rust" },
        "basalt": { elem1: "foam", elem2: "thermite" },
        "slime": { elem1: "foam", elem2: "magma" },
        "dirty_water": { elem1: "foam", elem2: "slime" },
        "water": { elem1: "foam", elem2: "oil" },
        "iron": { elem1: "foam", elem2: "impurium" },
        "molten_dirt": { elem1: "foam", elem2: "impurium" },
        "copper": { elem1: "foam", elem2: "rust" },
        "gold_coin": { elem1: "foam", elem2: "rust" },
        "ice": { elem1: "foam", elem2: "blood_ice" },
        "steam": { elem1: "foam", elem2: "rad_steam" },
        "porcelain": { elem1: "foam", elem2: "smoke" },
        "plant": { elem1: "foam", elem2: "dead_plant" },
        "laser": { elem1: "purificanol", elem2: "explosion" },
        "ant": { elem1: "foam", elem2: "rad_ant" },
        "electric": { elem1: "foam", elem2: "malware" },
        "meat": { elem1: "foam", elem2: "rotten_meat" },
        "cooked_meat": { elem1: "foam", elem2: "rotten_meat" },
        "cured_meat": { elem1: "foam", elem2: "rotten_meat" },
        "dna": { elem1: "foam", elem2: "cancer" },
    }
};




elements.impurity = {
    color: "#4B0663",
    behavior: behaviors.WALL,
    category: "soaps",
    state: "solid",
    tempHigh: 70,
    hidden: true,
    stateHigh: "acid",
    stateHighColor: "#EB14E0",
    stain: 1,
};




elements.impurium = {
    color: "#CECFDE",
    behavior: behaviors.WALL,
    category: "soaps",
    state: "solid",
    tempHigh: 125,
    stateHigh: "contaminol",
    stain: 1,
    hidden: true,
    conduct: 1,
    breakInto: "plague",
};




elements.volatilium = {
    color: ["#97BF40", "#58BF40", "#BFA740"],
    behavior: behaviors.STURDYPOWDER,
    category: "special",
    state: "solid",
    alpha: 0.99,
    breakInto: ["electric", "steel"],
    temp: 20,
    burn: 55,
    singleColor: true,
    fireColor: ["#f71e0a", "#f7940a", "#eff70a", "#0af722", "#0a69f7"],
    conduct: 1,
    tempHigh: 30,
        breakInto: "border",
     reactions: {
        "neutron": { elem1: "molten_slag", elem2: ["invalid", "beryllium"] },
        "beryllium": { elem2: "beryllium_volatilium_alloy" },
    } 
};




elements.beryllium = {
    color: ["#AAAA9f", "#615d52", "#282b28"],
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    breakInto: ["emerald", "proton"],
    temp: 20,
    conduct: 1,
        desc: "Beryllium is a chemical element, it has symbol Be and atomic number 4. It is a steel-gray, hard, strong, lightweight and brittle alkaline earth metal. It is a divalent element that occurs naturally only in combination with other elements to form minerals.",
    tempHigh: 1287,
        breakInto: "emerald",
     reactions: {
        "oxygen": { elem1: "beryllium_oxide", elem2: "beryllium_oxide" },
        "head": { elem1: "poison", chance: 0.05, func: behaviors.KILLPIXEL2 },
        "volatilium": { elem2: "beryllium_volatilium_alloy" },
    } 
};




elements.beryllium_oxide = {
    color: "#c9c9d1",
    behavior: [
    "XX|CO:3|XX",
    "CO:3|HT:2|CO:3",
    "M2|M1|M2",
],
    category: "powders",
    state: "solid",
    temp: 20,
    insulate: 1,
    conduct: 10,
    reactions: {
        "molten_copper": { elem1: "superwire", elem2: "foam" },
        "molten_tungsten": { elem1: "superwire", elem2: "foam" },
    } 
};




elements.superwire = {
    color: ["#4d4d4d", "#6e140d", "#0d516e", "#3e484d"],
    desc: "A versatile, strong wire that is still breakable.",
    behavior: behaviors.WALL,
    behaviorOn: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|XX|XX",
],
    singleColor: true,
    category: "machines",
    state: "solid",
    temp: 20,
    tempHigh: 9000,
    noMix: true,
    stateHigh: "molten_slag",
    insulate: 1,
    conduct: 2,
    breakInto: "superwire_end",
    tempLow: 0,
    stateLow: "off_superwire",
    hardness: 0.99,
};




elements.hyperwire = {
    color: ["#94a6b0", "#cfdde6", "#cccccc", "#edde58", "#d1bf19"],
    desc: "A versatile, unbreakable wire.",
    behavior: behaviors.WALL,
    behaviorOn: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|XX|XX",
],
    singleColor: true,
    noMix: true,
    category: "machines",
    state: "solid",
    temp: 20,
    tempHigh: 9000,
    stateHigh: "porcelain",
    insulate: 1,
    conduct: 2,
    tempLow: -273,
    stateLow: ["superwire_end", "galvanized_steel"],
    hardness: 1,
};




elements.superwire_end = {
    name: "StrippedWire",
    color: ["#4d4d4d", "#6e140d", "#e3591e", "#732e10"],
    behavior: behaviors.WALL,
    behaviorOn: [
    "SH%1 AND CR:electric%1|XX|SH%1 AND CR:electric%1",
    "CR:electric%1|CH:oxidised_copper%1|CR:electric%1",
    "SH%1 AND CR:electric%1|XX|SH%1 AND CR:electric%1",
],
    category: "states",
    hidden: true,
    state: "solid",
    temp: 20,
    tempHigh: 500,
    stateHigh: ["molten_slag", "electric"],
    insulate: 0,
    conduct: 4,
    tempLow: 0,
    stateLow: "off_superwire",
    hardness: 0.3,
};




elements.off_superwire = {
    name: "DefectiveWire",
    color: ["#208a2a", "#e3591e", "#732e10"],
    behavior: behaviors.WALL,
    behaviorOn: [
    "XX|XX|XX",
    "XX|CH:rust%10|XX",
    "XX|XX|XX",
],
    singleColor: true,
    category: "states",
    state: "solid",
    hidden: true,
    breakInto: "rust",
    stateHigh: "molten_metal_scrap",
    tempHigh: 570,
    temp: 20,
    insulate: 1,
    conduct: 0,
    hardness: 1,
};




elements.emerald = {
    color: ["#2edb93", "#75C03F", "#3FC049", "#42c78f", "#22B748"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    temp: 20,
    alpha: 0.8,
    tempHigh: 1287,
};




//ai generated elements begin here




elements.verylithium = {
    color: ["#A3B19C", "#3A5D4E", "#9A9E7C"],
    behavior: behaviors.WALL,
    category: "ai-generated",
    state: "solid",
    alpha: 0.95,
    breakInto: ["crystal", "liquid_metal"],
    temp: 25,
    burn: 70,
    singleColor: true,
    fireColor: ["#f70a3b", "#a47f1e", "#f7d02f", "#0af75c", "#0a3aef"],
    conduct: 0.9,
    tempHigh: 1000,
    breakInto: "crystal",
    reactions: {
        "neutron": { elem1: "verylithium_oxide", elem2: ["molten_metal", "beryllium"] },
        "water": { elem1: "verylithium_hydrate" },
        "head": { elem1: "electric", func: behaviors.KILLPIXEL2 }
    }
};




elements.volantium = {
    color: ["#97C040", "#43BF60", "#5C7A35"],
    behavior: behaviors.WALL,
    category: "ai-generated",
    state: "solid",
    alpha: 0.99,
    breakInto: ["electric", "steel"],
    temp: 15,
    burn: 45,
    singleColor: false,
    fireColor: ["#d91f2f", "#efad00", "#42f70a", "#2188d9", "#31a72e"],
    conduct: 1.2,
    tempHigh: 35,
    breakInto: "voltain",
    reactions: {
        "neutron": { elem1: "volantium_plasma", elem2: ["beryllium", "molten_slag"] },
        "oxygen": { elem1: "volantium_oxide" }
    }
};




elements.voltain = {
    color: ["#D3B5E0", "#9B74CC", "#6A4E92"], // colors for voltain (purple and violet hues)
    behavior: behaviors.AGPOWDER,
    category: "ai-generated",
    state: "solid", // in solid state
    alpha: 0.99, // high opacity
    breakInto: ["crystal"],
    temp: 20, // temperature in Celsius
    burn: 50, // burn rate, how much it burns
    singleColor: false, // does not have a single color, as it's a multi-colored crystal
    fireColor: ["#f00", "#ff0", "#ff80d5", "#ff4f7f", "#7f2dff"], // fire-like colors (purple to pink)
    conduct: 0.8, // lower conductivity, suitable for a crystal
    tempHigh: 30, // maximum temperature before breaking down
    stateHigh: "dust",
    reactions: {
        "magma": { elem1: "mixed_metal_slag" }, // reacts with water
    }
};








elements.beryllium_volatilium_alloy = {
    color: ["#7f8c45", "#4f5c7d", "#9f8b5a"],
    behavior: behaviors.WALL,
    category: "ai-generated",
    state: "solid",
    alpha: 0.85,
    breakInto: ["beryllium", "volantium"],
    temp: 40,
    burn: 60,
    singleColor: true,
    fireColor: ["#fa0a1f", "#ef8d1f", "#f7e20a", "#0afc1e"],
    conduct: 1.3,
    tempHigh: 1200,
    reactions: {
        "neutron": { elem1: "mixed_metal_slag", elem2: ["beryllium", "volantium"] },
        "air": { elem1: "oxidized_alloy" },
        "fire": { elem1: "molten_alloy" }
    }
};




elements.crystal = {
    color: ["#A2D8C8", "#6B9E8F", "#4F7F8F"],
    behavior: behaviors.POWDER,
    category: "ai-generated",
    state: "solid",
    alpha: 1.0,
    temp: 5,
    burn: 0,
    singleColor: true,
    conduct: 0,
    tempHigh: 500,
    breakInto: "chatgptium_vapor",
    desc: "A highly organized structure, often formed in nature under precise conditions. Crystals are brittle and beautiful, frequently seen as precious gemstones.",
};




elements.liquid_metal = {
    color: ["#D1B7A1", "#9F8C7A", "#5C3A29"],
    behavior: behaviors.LIQUID,
    category: "ai-generated",
    state: "liquid",
    alpha: 1.0,
    temp: 30,
    burn: 100,
    singleColor: true,
    hidden: true,
    conduct: 1.5,
    tempHigh: 1500,
    breakInto: "chatgptium",
    desc: "A liquid form of metal, exhibiting high fluidity and electrical conductivity. Typically found in high-temperature environments or specific chemical states.",
};




elements.verylithium_oxide = {
    color: ["#A8C0A2", "#91B19E", "#5A6D52"],
    behavior: behaviors.STURDYPOWDER,
    category: "ai-generated",
    state: "solid",
    alpha: 1.0,
    temp: 50,
    burn: 20,
    singleColor: true,
    hidden: true,
    conduct: 0.5,
    tempHigh: 600,
    breakInto: "dust",
    desc: "An oxide compound of Verylithium, formed when exposed to oxygen. It is a solid, stable compound, often used in industrial applications for its mild reactivity.",
};




elements.verylithium_hydrate = {
    color: ["#A7D0C3", "#8DB6B2", "#4C7B6A"],
    behavior: behaviors.STURDYPOWDER,
    category: "ai-generated",
    state: "solid",
    alpha: 0.95,
    hidden: true,
    temp: 25,
    burn: 0,
    singleColor: true,
    conduct: 0.2,
    tempHigh: 400,
    breakInto: "dirty_water",
    desc: "A hydrated form of Verylithium, where water molecules are integrated into its structure. It is a stable and non-reactive compound when kept in controlled conditions.",
};




elements.volantium_plasma = {
    color: ["#7E6CC0", "#8F6CB9", "#4A5FA1"],
    behavior: behaviors.RADPOWDER,
    category: "ai-generated",
    state: "plasma",
    alpha: 1.0,
    temp: 1000,
    burn: 500,
    singleColor: false,
    hidden: true,
    conduct: 2.0,
    charge: 2,
    tempHigh: 2000,
    hidden: true,
    desc: "A highly energized state of Volantium, where the atoms are ionized and capable of conducting electricity at extreme temperatures.",
};




elements.volantium_oxide = {
    color: ["#9C9E4A", "#B1B23C", "#B8B548"],
    behavior: behaviors.POWDER,
    category: "ai-generated",
    state: "solid",
    alpha: 1.0,
    temp: 40,
    burn: 10,
    singleColor: true,
    conduct: 0.3,
    hidden: true,
    tempHigh: 700,
    breakInto: "dust",
    breakIntoColour: "#42374f",
    desc: "An oxide compound of Volantium, typically formed when exposed to oxygen at higher temperatures. It is a stable, non-reactive material with mild conductivity.",
};




elements.oxidized_alloy = {
    color: ["#7D6F5B", "#A69A88", "#9C9E88"],
    behavior: behaviors.WALL,
    category: "ai-generated",
    state: "solid",
    alpha: 1.0,
    temp: 20,
    hidden: true,
    burn: 50,
    singleColor: true,
    conduct: 0.8,
    tempHigh: 1200,
    breakInto: "rust",
    desc: "An alloy that has undergone oxidation, resulting in a more stable but less conductive form. It is commonly used in environments where resistance to corrosion is crucial.",
};




elements.molten_alloy = {
    color: ["#C4A4A1", "#B85C5A", "#B0A898"],
    behavior: behaviors.MOLTEN,
    category: "ai-generated",
    state: "liquid",
    alpha: 1.0,
    temp: 800,
    hidden: true,
    burn: 200,
    singleColor: true,
    conduct: 2.0,
    tempHigh: 1800,
    breakInto: "chatgptium_alloy",
    breakIntoColour: "#374f3d",
    desc: "A molten state of alloy created at high temperatures. It has excellent fluidity and conductivity, often used in high-performance industrial applications.",
};




elements.mixed_metal_slag = {
    color: ["#6E5A4E", "#7E6757", "#9C7F70"],
    behavior: behaviors.POWDER,
    category: "ai-generated",
    state: "solid",
    alpha: 1.0,
    temp: 100,
    burn: 0,
    singleColor: true,
    conduct: 0,
    tempHigh: 800,
    breakInto: "chatgptium_alloy",
    desc: "The by-product of metal refinement, a waste material that forms during the extraction of metals from ores. It is a sticky and non-conductive substance.",
};
        
elements.chatgptium = {
    color: ["#0091D5", "#1A72B8", "#66A3FF"],
    behavior: behaviors.POWDER,
    category: "ai-generated",
    state: "solid",
    alpha: 0.98,
    temp: 22,
    burn: 0,
    singleColor: false,
    conduct: 0.5,
    tempHigh: 100,
    stateHigh: "chatgptium_vapor",
    desc: "A rare, virtual gas element that exists in the interaction between human thought and digital knowledge. It changes color based on the surrounding conversation and environment, constantly adapting to communicate with surrounding elements.",
    reactions: {
        "electrum": { elem1: "chatgptium_alloy", elem2: "electric" },
        "electric": { elem1: "chatgptium_alloy", elem2: "electric" },
        "iron": { elem1: "chatgptium_alloy", elem2: "electric" },
        "wire": { elem1: "chatgptium_alloy", elem2: "electric" },
        "battery": { elem1: "chatgptium_alloy", elem2: "electric" },
    }
};




elements.chatgptium_vapor = {
    color: ["#66D3FF", "#00B5E2", "#B0C9D5"],
    behavior: behaviors.GAS,
    hidden: true,
    category: "ai-generated",
    state: "gas",
    alpha: 0.95,
    temp: 25,
    burn: 0,
    singleColor: false,
    conduct: 0.4,
    tempLow: -20,
    stateLow: "chatgptium_crystal",
    desc: "The gaseous form of ChatGPTium, which becomes more fluid and dispersed as it rises in temperature. It communicates in wisps and is most active in digital spaces.",
};




elements.chatgptium_crystal = {
    color: ["#B0D6E1", "#92A4B2", "#5C9EB3"],
    behavior: behaviors.POWDER,
    category: "ai-generated",
    state: "solid",
    alpha: 1.0,
    glow: true,
    hidden: true,
    temp: 20,
    burn: 0,
    singleColor: true,
    conduct: 0.1,
    tempHigh: 300,
    desc: "A crystalline form of ChatGPTium, solidified after long periods of communication. It has an almost ethereal glow and a mysterious connection to information processing.",
};




elements.chatgptium_alloy = {
    color: ["#5F99FF", "#80A5D9", "#3D80B6"],
    behavior: behaviors.STURDYPOWDER,
    category: "ai-generated",
    state: "solid",
    alpha: 0.9,
    temp: 50,
    hidden: true,
    burn: 10,
    singleColor: true,
    conduct: 0.8,
    tempHigh: 1200,
    desc: "A rare alloy formed when ChatGPTium interacts with computational elements. It has a unique ability to store and transmit information rapidly, and is often used in high-tech devices.",
};




//ai generated elements end here, charsonsmodbeta begins here




elements.akshajium = {
    color: ["#a8160c", "#fdff94", "#d47d20"],
    behavior: behaviors.POWDER,
    category: "food",
    viscosity: 10000,
    state: "solid",
    density: 100,
    desc: "pizza",
    related: ["sankarium", "narayananium"],
    breakInto: ["crumb", "sauce", "melted_cheese", "cooked_meat"],
        reactions: {
        "head": { elem1: null, chance: 0.36, func: behaviors.FEEDPIXEL },
    }
};




elements.brioche_steam = {
    color: "#ab8c60",
    behavior:  [
    "M1|M1|M1",
    "M1|CH:brioche_tcloud%2|M1",
    "M1|M1|M1"
],
    category: "gases",
    state: "gas",
    density: 720,
    temp: 80,
    tempLow: 30,
        desc: "how does this make any sense?",
    stateLow: ["brioche"],
    isFood: true,
};




elements.brioche_tcloud = {
    color: "#ab8c60",
    name: "BriocheCloud",
    behavior: [
    "XX|M1|XX",
    "XX|CH:brioche_cloud%5|XX",
    "XX|XX|XX"
],
    category: "gases",
    state: "gas",
    density: 720,
    temp: 40,
    tempLow: 20,
    tempHigh: 60,
        desc: "how does this make any sense??",
    stateLow: ["fancy_flour"],
    stateHigh: ["brioche_storm"],
    isFood: true,
};




elements.brioche_cloud = {
    color: "#ab8c60",
    hidden: true,
    behavior: [
    "XX|M1%3|XX",
    "M1%5|XX|M1%5",
    "XX|CR:brioche%3|XX"
],
    category: "gases",
    state: "gas",
    density: 720,
    temp: 40,
    tempLow: 20,
    tempHigh: 100,
        desc: "how does this make any sense??",
    stateLow: ["fancy_flour"],
    stateHigh: ["brioche_storm"],
    isFood: true,
};




elements.brioche_storm = {
    color: "#825634",
    behavior: [
    "XX|XX|XX",
    "M1%5|XX|M1%5",
    "XX|CR:brioche%3 AND CR:heat_ray%0.1 AND CR:melted_butter%3 AND CR:melted_chocolate%5|XX"
],
    category: "gases",
    insulate: true,
    state: "gas",
    density: 720,
    temp: 100,
    tempLow: 40,
    tempHigh: 350,
        desc: "how does this make any sense???",
    stateLow: ["brioche_cloud"],
    stateHigh: ["brioche_disaster"],
    isFood: true,
};




elements.brioche_disaster = {
    color: "#823934",
    behavior: [
    "XX|XX|XX",
    "M1%5|XX|M1%5",
    "XX|CR:brioche AND CR:heat_ray%5 AND CR:melted_butter AND CR:melted_chocolate|XX"
],
    category: "gases",
    insulate: true,
    state: "gas",
    density: 720,
    temp: 350,
    tempLow: 100,
        desc: "how does this make any sense????????????????????????",
    stateLow: ["brioche_storm"],
    isFood: true,
};




elements.fancy_dough = {
    color: "#d1c0a5",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 999999,
    state: "liquid",
    density: 720,
    temp: 30,
    tempHigh: 50,
    stateHigh: ["steam", "brioche_steam"],
    desc: "it can be evaporated",
        reactions: {
        "head": { elem1: null, chance: 0.1, func: behaviors.FEEDPIXEL },
    }
};




elements.brioche = {
    color: ["#c2770e", "#b06227"],
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|M1 AND SW:brioche_cloud AND SW:brioche_tcloud|XX"
],
    category: "food",
    temp: 30,
    tempHigh: 80,
    tempLow: 10,
    stateHigh: ["baked_breeze", "ash"],
    stateLow: ["cold_brioche"],
    burn: 55,
    isFood: true,
    breakInto: "fancy_flour",
        reactions: {
        "head": { elem1: null, chance: 0.7, func: behaviors.FEEDPIXEL },
    }
};




elements.aresium = {
    color: ["#1017ad", "#2E5AD1"],
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|XX|XX"
],
    category: "solids",
    temp: 19,
    tempHigh: 100,
    tempLow: -20,
    stateHigh: ["skibidi_aresium"],
    stateLow: ["magma", "electric", "explosion", "cold_fire"],
        desc: "it's a transition metal named after mars",
    burn: 0,
    conduct: 1,
};




elements.skibidi_aresium = {
    color: "#ad1051",
    behavior: [
    "XX|XX|XX",
    "M1%5 AND EX:10>brick_rubble,radiation%1|XX|M1%5 AND EX:10>brick_rubble,radiation%1",
    "XX|XX|XX"
],
    category: "states",
    temp: 100,
    tempHigh: 300,
    stateHigh: ["tnt", "molten_iron", "copper", "explosion"],
    burn: 0,
    conduct: 1,
};




elements.cold_brioche = {
    color: "#5f7a8c",
    behavior: behaviors.WALL,
    category: "states",
    temp: 5,
    tempHigh: 30,
    stateHigh: ["brioche"],
};




elements.fancy_flour = {
    color: "#f5e9b5",
    behavior: behaviors.POWDER,
    category: "powders",
    temp: 20,
    tempHigh: 70,
        burn: 70,
    stateHigh: ["baked_breeze", "smoke"],
};




elements.irradiate = {
    color: ["#2edb93", "#00ff00"],
    category: "tools",
    behavior:  [
    "XX|XX|XX",
    "XX|CH:radiation|XX",
    "XX|XX|XX",
],
};
    




elements.pyrane = {
    color: "#fc7c19",
    behavior: [
    "M1|M1 AND CR:fire%10|M1",
    "M1|XX|M1",
    "M1|M1|M1",
],
    hidden: true,
    category: "gases",
    state: "gas",
    temp: 50,
    tempLow: -20,
    stateLow: ["fyrium"],
    reactions: {
        "ash": { elem1: null, elem2:"pyric_nitrite" },
            "dirt": { elem1:"pyrane", elem2:"fire" },
            "hydrogen": { elem1:"hydroid", elem2:"hydroid" },
    }
};




elements.pyric_nitrite = {
    color: "#b3270e",
    behavior: behaviors.POWDER,
    behaviorOn: [
    "XX|XX|XX",
    "XX|EX:10>fire,nitrogen,stench,electric|XX",
    "XX|XX|XX",
],
    category: "powders",
    state: "solid",
    temp: 20,
    conduct: 1,
        desc: "not to be confused with iron pyrite or anything like that",
    reactions: {
        "iron": { elem1:"pyric_nitrite", elem2:"pyric_rust" },
                "oil": { elem1: null, elem2:"nitrol_fuel" },
                "electric": { elem1:["fire", "nitrogen", "stench", "electric", "explosion"], elem2:"fire" },
    }
};




elements.pyric_rust = {
    color: "#913e17",
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    temp: 20,
    reactions: {
        "steel": { elem1: null, elem2:"tnt" }
    }
};




elements.fyrium = {
    color: "#ffa930",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    temp: 20,
    tempHigh: 137,
    stateHigh: ["molten_fyrium"],
    breakInto: ["fire"],
};




elements.molten_fyrium = {
    color: ["#ffffff", "#ff9169", "#eb6434"],
    behavior: behaviors.MOLTEN,
    stain: 0.3,
    category: "states",
    temp: 137,
    tempLow: -20,
    stateLow: ["fyrium"],
    reactions: {
        "water": { elem1:"explosion", elem2: "steam" }
    }
};




elements.nitrol_fuel = {
    color: "#4f180e",
    behavior: [
    "XX|XX|XX",
    "M2|XX|M2",
    "M1|M1 AND SW:water,wood|M1",
],
    category: "liquids",
    state: "liquid",
    temp: 20,
    stain: 0.5,
    reactions: {
        "wood": { elem1: null, elem2:"fueled_wood" },
    }
};




elements.fueled_wood = {
    color: "#631608",
    behavior: behaviors.WALL,
    category: "weapons",
    state: "solid",
    temp: 20,
    tempHigh: 30,
    stateHigh: ["rocket", "pyrane", "nitrol_fuel", "explosion", "stench"],
    reactions: {
        "fire": { elem1:["rocket", "pyrane", "nitrol_fuel", "explosion", "stench"], elem2:["rocket", "pyrane", "nitrol_fuel", "explosion", "stench"] },
    }
};




elements.hydroid = {
    color: "#3a0ca6",
    behavior: [
        ["XX", "XX", "XX"],
        ["M2", "XX", "M2"],
        ["M1", "M1 AND SW:water AND CH:water>hydroid%10", "M1"]
    ],
    category: "liquids",
    state: "liquid",
    temp: 20,
    tempHigh: 100,
    tempLow: -20,
    density: 12,
    conduct: 1,
    stain: 0.7,
    desc: "this is NOT water",
    stateHigh: ["pyrane", "steam"],
    stateLow: ["hydroid_ice"],
    reactions: {
        "fire": { elem2: "explosion" },
        "body": { elem2: "hydroid", chance: 0.5 },
        "head": { elem2: "hydroid", chance: 0.5 },
        "maple_syrup": { elem2: "hydroid" },
        "magma": { elem2: "hydroid" },
        "oil": { elem2: "hydroid" },
        "juice": { elem2: "hydroid" },
        "ice": { elem2: "hydroid_ice" },
        "blood": { elem2: "hydroid" },
        "infection": { elem2: "hydroid" },
        "milk": { elem1: "lactoid", elem2: "lactoid" }
    }
};








//by someone named spencer
elements.kai_cenat = {
    color: "#e00b0b",
    behavior: behaviors.STURDYPOWDER,
    category: "special",
    state: "solid",
    desc: "wow",
    conduct: 1,
        desc: "someone named spencer told me to add this",
};




elements.kai_cenat.behavior = [
    ["XX","CH:kai_cenat","XX"],
    ["CH:kai_cenat","XX","CH:kai_cenat"],
    ["M2","M1 AND CH:kai_cenat","M2"]
];




elements.kai_eraser = {
    color: ["e00b0b", "#ff0000", "#00ff00", "#0000ff"],
    tool: function(pixel) {
        if (pixel.element == "kai_cenat") {
            pixel.element = "foam"
        }
    },
    category: "tools",
};




//ok this is the skibidi-edited mod part




elements.tocopherol = {
    color: "#094237",
    behavior: behaviors.POWDER,
    category: "powders",
    viscosity: 10000,
    state: "solid",
    density: 100,
        reactions: {
        "sodium_acetate": { elem1:"tocopheryl_acetate", elem2:"sodium" },
    }
};




elements.tweakium = {
    color: "#22dfce",
    behavior: [
    "XX|M1|XX",
    "M1|CH:liquid_light%5|M1",
    "XX|M2|XX",
],
    category: "special",
    state: "gas",
    density: 720,
    temp: 80,
        reactions: {
        "head": { elem1:"fw_ember", elem2:"cooked_meat", chance: 0.1 },
        "body": { elem1:"fw_ember", elem2:"cooked_meat", chance: 0.3 },
        "tweakium": { elem1:"firework", chance: 0.005 },
    }
};




elements.tocopheryl_gas = {
    color: "#96e3d4",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 720,
    temp: 80,
    tempLow: 0,
    stateLow: ["tocopherol"],
};




elements.sunlight = {
    color: "#ffc9c9",
    behavior: [
    "XX|XX|XX",
    "XX|CH:light%0.01 AND DL%1 AND CO:1|XX",
    "M1 AND BO|M1 AND BO|XX",
],
    category: "energy",
    state: "gas",
    glow: true,
    density: 720,
    stain: 0.5,
    temp: 5600,
    tempLow: -273,
    stateLow: ["liquid_light"],
    reactions: {
        "water": { elem1:null, elem2:"steam" },
    }
};




elements.tocopheryl_acetate = {
    color: "#cffdff",
    behavior: [
    "XX|XX|XX",
    "M2|XX|M2",
    "M1|M1 AND SW:water,zinc|M1",
],
    category: "liquids",
    viscosity: 999999,
    state: "liquid",
    density: 720,
    temp: 30,
    tempHigh: 96,
    stateHigh: ["tocopheryl_gas"],
        reactions: {
        "zinc": { elem1:"sunscreen", elem2:"sunscreen" },
        "laser": { elem1:"acetatine" },
        "water": { elem1:"soapy_water", elem2:"soapy_water" },
    }
};

elements.acetatine = {
    color: "#7b8b9c",
    alpha: 0.5,
    glow: false,
    behavior: [
    "XX|SW:water,tocopheryl_acetate|XX",
    "XX|XX|XX",
    "M2|M1|M2",
],
    category: "powders",
    state: "solid",
    density: 720,
    temp: 15,
    tempHigh: 154,
    stateHigh: ["tocopheryl_gas"],
        reactions: {
        "plastic": { elem1:"flash", elem2:"sr_pl" },
    }
};



elements.nahnium = {
    color: ["#bfa6f5", "#b5a5d9"],
    behavior: [
    "HT:5|CR:tweakium%1|HT:5",
    "CR:liquid_light%5|XX|CR:liquid_light%5",
    "XX|M1|XX",
],
    category: "powders",
    temp: 30,
    tempHigh: 80,
    tempLow: 10,
        reactions: {
        "nahnium": { elem1:"nahnium", elem2:"glass_shard", chance: 0.01 },
    }
};




elements.sunscreen = {
    color: "#ffeeff",
    behavior: [
    "XX|XX|XX",
    "M2|XX|M2",
    "M1|M1 AND SW:water|M1",
],
    category: "liquids",
    temp: 0,
    stain: -0.1,
    tempHigh: 9600,
    stateHigh: ["tocopheryl_gas"],
        reactions: {
        "light": { elem2: null },
        "sunlight": { elem2: null },
        "water": { elem1:"soapy_water", elem2:"soapy_water" },
    }
};




elements.stupidine = {
    color: "#4e4b75",
    behavior: [
            ["XX","CR:sweet_savour%1","XX"],
            ["XX","XX","XX"],
            ["XX","M1","XX"]
],
    category: "solids",
    state: "solid",
    temp: 20,
    tempHigh: 137,
    stateHigh: "liquid_stupidine",
    tempLow: -31,
    stateLow: "activated_stupidine",
        reactions: {
        "iron": { elem2:"stupid", chance:0.01 },
        "light": { elem2:"nahnium", chance:0.01 },
    }
};




elements.liquid_stupidine = {
    color: ["#5328c9", "#4089e3"],
    behavior: [
            ["M2","M1","M2"],
            ["XX","XX","XX"],
            ["XX","CR:slime%1","XX"]
],
    category: "liquids",
    state: "liquid",
    temp: 140,
    tempHigh: 500,
    stateHigh: "stupidine_gas",
    tempLow: 25,
    stateLow: "skibidine",
    breakInto: "skibidine",
};




elements.stupidine_gas = {
    color: "#802d3a",
    behavior: [
    "M1|M1 AND CR:sour_scent%1|M1",
    "M1|XX|M1",
    "M1|M1|M1",
],
    category: "gases",
    state: "gas",
    temp: 500,
    tempHigh: 1000,
    stateHigh: ["fireball", "explosion"],
    tempLow: 200,
    stateLow: "liquid_stupidine",
};




elements.activated_stupidine = {
    color: "#3d2f61",
    behavior: [
    "XX|XX|XX",
    "XX|CH:hot_bomb|XX",
    "XX|XX|XX",
],
    category: "solids",
    state: "solid",
    temp: 20,
};




elements.skibidi_soda = {
    color: "#3279a8",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    tempHigh: 100,
    stateHigh: ["skibidiness", "skibidine"],
        reactions: {
        "oxygen": { elem1:"skibidi_soda", elem2:"skibidiness" },
        "head": { elem1: "skibidiness", func: behaviors.FEEDPIXEL },
    }
};




elements.skibidine = {
    color: ["#51649c", "#949c51"],
    behavior: [
    "XX|SW:carbon_dioxide|XX",
    "M2|XX|M2",
    "M1|M1 AND SW:carbon_dioxide|M1",
],
    category: "liquids",
    state: "liquid",
    tempHigh: 250,
    stateHigh: "skibidiness",
        reactions: {
        "carbon_dioxide": { elem1:"skibidi_soda", elem2:"skibidi_soda" },
        "iron": { elem1: "magma", elem2:"stupidine" },
    }
};








elements.skibidiness = {
    color: "#567de8",
    behavior: behaviors.DGAS,
    category: "gases",
    state: "gas",
    temp: 20,
        reactions: {
        "water": { elem1:"skibidiness", elem2:"skibidi_soda"},
    }
};




elements.right_missile = {
    color: ["#8a9499", "#9e9e9e", "#d1d1d1"],
    category: "missiles",
    state: "solid",
    temp: 40,
    burning: true,
    tempHigh: 2000,
    stateHigh: "molten_metal_scrap",
    breakInto: "metal_scrap",
    fireColor: "#e342a5",
    conduct: 1,
    charge: 3,
};




elements.right_missile.behavior = [
   ["XX","XX","XX"],
    ["XX","XX","M1 AND EX:20>explosion"],
    ["XX","XX","XX"],   
];




elements.left_missile = {
    color: ["#8a9499", "#9e9e9e", "#d1d1d1"],
    category: "missiles",
    state: "solid",
    temp: 40,
    burning: true,
    tempHigh: 2000,
    stateHigh: "molten_metal_scrap",
    breakInto: "metal_scrap",
    fireColor: "#e342a5",
    conduct: 1,
    charge: 3,
};




elements.left_missile.behavior = [
   ["XX","XX","XX"],
    ["M1 AND EX:20>explosion","XX","XX"],
    ["XX","XX","XX"],   
];




elements.blessing_missile_right = {
    color: ["#47446e", "#3a32a8"],
    behavior: [
    "XX|XX|XX",
    "XX|XX|M1 AND EX:20>blessed_explosion",
    "XX|XX|XX",
],
    category: "missiles",
    state: "solid",
    temp: 40,
    tempHigh: 2000,
    stateHigh: "bless",
    breakInto: "bless",
    fireColor: ["#ff00bb", "#ff80bb", "#ffffbb", "#00ffbb", "#bb00ff", "#80bb80"],
    fireElement: "blessed_fire",
    conduct: 10,
};




elements.blessing_missile_left = {
    color: ["#47446e", "#3a32a8"],
    behavior: [
    "XX|XX|XX",
    "M1 AND EX:20>blessed_explosion|XX|XX",
    "XX|XX|XX",
],
    category: "missiles",
    state: "solid",
    temp: 40,
    tempHigh: 2000,
    stateHigh: "bless",
    breakInto: "bless",
    fireColor: ["#ff00bb", "#ff80bb", "#ffffbb", "#00ffbb", "#bb00ff", "#80bb80"],
    fireElement: "blessed_fire",
    conduct: 10,
};




elements.blessed_explosion = {
    color: ["#47446e", "#ffff00"],
    alpha: 0.5,
    behavior: [
    "CR:bless%3.5|CR:bless%3.5|CR:bless%3.5",
    "CR:bless%3.5|CH:bless,bless,cooked_meat,brioche,chocolate%5|CR:bless%3.5",
    "CR:bless%3.5|CR:bless%3.5|CR:bless%3.5",
],
    category: "weapons",
    state: "gas",
    temp: 40,
    breakInto: "bless",
    conduct: 10,
};




elements.blessed_fire = {
    color: ["#ff00bb", "#ff80bb", "#ffffbb", "#00ffbb", "#bb00ff", "#80bb80"],
    alpha: 0.5,
    behavior: [
    "CR:bless%3.5 AND M1|CR:bless%3.5 AND M1|CR:bless%3.5 AND M1",
    "CR:bless%3.5|CR:bless%3.5%10 AND DL%5|CR:bless%3.5",
    "CR:bless%3.5|CR:bless%3.5|CR:bless%3.5",
],
    category: "energy",
    state: "gas",
    temp: 40,
    breakInto: "bless",
    conduct: 10,
};




elements.blessing_nuke = {
    color: ["#47446e", "#3a32a8"],
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|M1 AND EX:42>blessed_explosion|XX",
],
    category: "weapons",
    state: "solid",
    temp: 40,
    tempHigh: 2000,
    stateHigh: "bless",
    breakInto: "bless",
    fireColor: ["#ff00bb", "#ff80bb", "#ffffbb", "#00ffbb", "#bb00ff", "#80bb80"],
    fireElement: "blessed_fire",
    conduct: 10,
};




elements.blessing_firework = {
    color: ["#f53874"],
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|M1|XX",
],
    behaviorOn: [
    "XX|XX|XX",
    "XX|CH:b_flyerwork|XX",
    "XX|XX|XX",
],
    category: "special",
    state: "solid",
    temp: 40,
    tempHigh: 2000,
    stateHigh: "bless",
    breakInto: "bless",
    burnInto: "b_flyerwork",
    buren: 100,
    fireColor: ["#ff00bb", "#ff80bb", "#ffffbb", "#00ffbb", "#bb00ff", "#80bb80"],
    fireElement: "blessed_fire",
    conduct: 1,
};

elements.b_flyerwork = {
    color: ["#eb4034"],
    name: "Blessing Firework",
    hidden: true,
    behavior: [
    "XX|M1 AND M1 AND SW AND EX:5>blessed_explosion AND LB:bless,blessed_fire%5|XX",
    "XX|XX|XX",
    "XX|XX|XX",
],
    category: "states",
    state: "solid",
    temp: 40,
    tempHigh: 2000,
    stateHigh: "bless",
    breakInto: "bless",
    fireColor: ["#ff00bb", "#ff80bb", "#ffffbb", "#00ffbb", "#bb00ff", "#80bb80"],
    fireElement: "blessed_fire",
    conduct: 1,
};




elements.brioche_nuke = {
    color: ["#bd6019", "#874009"],
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|M1 AND EX:33>brioche_explosion|XX",
],
    category: "weapons",
    state: "solid",
    temp: 10,
};




elements.brioche_explosion = {
    color: ["#bd6019", "#874009"],
    behavior: [
    "CR:pop|CR:melted_butter%3|CR:pop",
    "CR:brioche%3|CH:brioche|CR:brioche%3",
    "CR:pop|CR:melted_butter%3|CR:pop",
],
    category: "food",
    state: "solid",
    temp: 20,
};




elements.dirt_floor = {
    color: ["#6e3b0e"],
    behavior: [
    "XX|M2 AND C2:dirt_floor2|XX",
    "XX|XX|M1 AND LB:dirt,dirt,dirt,dirt,dirt,dirt,rock AND BO",
    "XX|XX|XX",
],
    breakInto: null,
    category: "machines",
    state: "solid",
    temp: 20,
};




elements.dirt_floor2 = {
    color: ["#b05e17"],
    behavior: [
    "XX|M2 AND C2:grass_floor|XX",
    "XX|XX|M1 AND LB:dirt,dirt,dirt,dirt,sand,sand,rock,sand AND BO",
    "XX|XX|XX",
],
    breakInto: null,
    hidden: true,
    category: "machines",
    state: "solid",
    temp: 20,
};




elements.grass_floor = {
    color: ["#107312"],
    behavior: [
    "XX|M2 AND C2:grass_floor2|XX",
    "XX|XX|M1 AND LB:grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,seeds,mulch,grass,dirt AND BO",
    "XX|XX|XX",
],
    breakInto: null,
    category: "machines",
    hidden: true,
    state: "solid",
    temp: 20,
};




elements.dirt_floor_alt = {
    color: ["#6e3b0e"],
    behavior: [
    "XX|M2 AND C2:dirt_floor2_a|XX",
    "XX|XX|M1 AND LB:dirt,dirt,dirt,dirt,sand,sand,rock AND BO",
    "XX|XX|XX",
],
    breakInto: null,
    category: "machines",
    state: "solid",
    temp: 20,
};




elements.dirt_floor2_a = {
    color: ["#b05e17"],
    behavior: [
    "XX|M2 AND C2:grass_floor_a|XX",
    "XX|XX|M1 AND LB:dirt,dirt,dirt,dirt,sand,sand,rock,worm AND BO",
    "XX|XX|XX",
],
    breakInto: null,
    hidden: true,
    category: "machines",
    state: "solid",
    temp: 20,
};




elements.grass_floor_a = {
    color: ["#107312"],
    behavior: [
    "XX|M2 AND C2:grass_floor2_a|XX",
    "XX|XX|M1 AND LB:grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,grass,seeds,mulch,grass,ant,dirt AND BO",
    "XX|XX|XX",
],
    breakInto: null,
    category: "machines",
    hidden: true,
    state: "solid",
    temp: 20,
};




elements.grass_floor2 = {
    color: ["#17b019"],
    behavior: [
    "XX|M2 AND C2:sapling|XX",
    "XX|XX|M1 AND LB:grass,grass,grass,grass,grass,grass,grass,grass,seeds,grass AND BO",
    "XX|XX|XX",
],
    breakInto: null,
    hidden: true,
    category: "machines",
    state: "solid",
    temp: 20,
};




elements.grass_floor2_a = {
    color: ["#17b019"],
    behavior: [
    "XX|M2 AND C2:sapling|XX",
    "XX|XX|M1 AND LB:grass,grass,grass,grass,grass,grass,grass,grass,seeds,grass,ant,bee AND BO",
    "XX|XX|XX",
],
    breakInto: null,
    hidden: true,
    category: "machines",
    state: "solid",
    temp: 20,
};




elements.solar_panel = {
    color: ["#88a383"],
    behavior: [
    "XX|CH:sunlight,light>stored_electric|XX",
    "XX|XX|XX",
    "XX|XX|XX",
],
    category: "machines",
    state: "solid",
    temp: 20,
    tempHigh: 2000,
    stateHigh: ["molten_gallium", "molten_glass", "light"],
    breakInto: ["gallium", "glass_shard", "rust"],
    conduct: 1,
};




elements.stored_electric = {
    color: ["#88a383"],
    behavior: [
    "XX|XX|XX",
    "XX|CH:electric%5|XX",
    "M1|XX|M1",
],
    category: "energy",
    state: "gas",
    temp: 20,
    conduct: 1,
};




elements.iodic_acid = {
    color: ["#332255"],
    behavior: [
    "XX|CR:bubble%0.01 AND CH:foam%1 AND CH:iodic_acid%10|XX",
    "M1%5|CH:iodic_vapour%0.4|M1%5",
    "M1|HT:4 AND CH:foam%1 AND CH:iodic_acid%4.5 AND M1 AND SW:water|M1",
],
    category: "liquids",
    tempHigh: 13500,
    stateHigh: "iodic_vapour",
    state: "liquid",
    temp: 20,
    tempLow: -5,
    stateLow: "nahnium",
    stateLowColor: "#604d7d",
    conduct: 1,
    stain: -0.4,
    reactions: {
        "bless": { elem1: "glass_shard" },
    }
};




elements.iodic_vapour = {
    color: ["#5522cc"],
    behavior: [
    "M1|M1%5|M1",
    "M1%5|CH:iodic_acid%0.4|M1%5",
    "M1|M1%5|M1",
],
    category: "gases",
    state: "gas",
    temp: 20,
    conduct: 1,
    tempHigh: 15,
    stateHigh: "iodic_acid",
    stain: 0.4,
    reactions: {
        "bless": { elem1: "oxygen" },
    }
};








elements.colour_magma = {
    color: ["#ff4d4d","#ffac4d","#ffff4d","#4dff4d","#4dffff","#4d4dff","#ff4dff"],
	onPlace: behaviors.DO_TICK,
	tick: function(pixel) {
		behaviors.MOLTEN(pixel);
		if (pixel.start-1 <= pixelTicks) {
			if (pixel.colorstart === undefined) {
				pixel.colorstart = pixel.start;
			}
			pixel.color = "hsl(" + pixel.colorstart + ",100%,65%)";
		}
	},
    burning: true,
    burnTime: Infinity,
    fireColor: ["#FF4DFF", "#B24DFF", "#4D52FF", "#4DB0FF", "#4DFFDF", "#64FF4D", "#FFE74D", "#FF994D", "#FF5B4D", "#FF794D", "#FFB14D", "#A8FF4D", "#4DFF85", "#4DD6FF"],
    temp: 1000,
    category: "liquids",
    state: "solid",
    renderer: renderPresets.MOLTEN,
    density: 2725,
    tempLow: 800,
    stateLow: "colour_rock",
};




elements.colour_rock = {
    color: ["#ff4d4d","#ffac4d","#ffff4d","#4dff4d","#4dffff","#4d4dff","#ff4dff"],
	onPlace: behaviors.DO_TICK,
	tick: function(pixel) {
		behaviors.STURDYPOWDER(pixel);
		if (pixel.start-1 <= pixelTicks) {
			if (pixel.colorstart === undefined) {
				pixel.colorstart = pixel.start;
			}
			pixel.color = "hsl(" + pixel.colorstart + ",70%,45%)";
		}
	},
    category: "land",
    state: "solid",
    renderer: renderPresets.HEATGLOW,
    density: 2520,
    tempHigh: 950,
    stateHigh: "colour_magma",
    breakInto: ["color_sand", "color_sand", "color_sand", "bead"],
};




elements.lactoid = {
    color: ["#deeeff"],
    behavior: [
    "XX|XX|XX",
    "M1 AND SW:water AND CH:water>hydroid%5 AND CH:hydroid>lactoid%1 AND CH:milk>lactoid%10|XX|M1 AND SW:water AND CH:water>hydroid%5 AND CH:hydroid>lactoid%1 AND CH:milk>lactoid%10",
    "M1|M1 AND SW:water AND CH:water>hydroid%5 AND CH:hydroid>lactoid%1 AND CH:milk>lactoid%10|M1",
],
    category: "liquids",
    state: "liquid",
    temp: 20,
    tempHigh: 100,
    tempLow: -25,
    density: 12,
    conduct: 1,
    stain: 0.7,
    desc: "this is NOT milk",
    stateHigh: ["pyrane", "steam", "salt"],
    stateLow: ["lactoid_ice"],
    reactions: {
        "fire": { elem2: "explosion" },
        "body": { elem2: "hydroid", chance: 0.5, func: behaviors.KILLPIXEL2 },
        "head": { elem1: null, elem2: "hydroid", chance: 0.01, func: behaviors.FEEDPIXEL },
        "maple_syrup": { elem2: "hydroid" },
        "magma": { elem2: "hydroid" },
        "oil": { elem2: "hydroid" },
        "juice": { elem2: "hydroid" },
        "ice": { elem1: "lactoid_ice", elem2: "lactoid_ice" },
        "slush": { elem1: "hydroid_milkshake", elem2: "hydroid_milkshake" },
        "blood": { elem2: "hydroid" },
        "infection": { elem2: "hydroid" },
    }
};




elements.lactoid_ice = {
    color: ["#bacbe0"],
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|M1|XX",
],
    category: "states",
    hidden: true,
    state: "solid",
    temp: -25,
    tempHigh: -20,
    density: 12,
    stain: 0.7,
    stateHigh: ["lactoid"],
    reactions: {
        "fire": { elem2: "explosion" },
        "body": { elem2: "hydroid", chance: 0.5, func: behaviors.KILLPIXEL2 },
        "head": { elem1: null, elem2: "hydroid", chance: 0.5, func: behaviors.FEEDPIXEL },
        "maple_syrup": { elem2: "hydroid" },
        "magma": { elem2: "hydroid" },
        "oil": { elem2: "hydroid" },
        "juice": { elem2: "hydroid" },
        "ice": { elem1: "lactoid_ice", elem2: "lactoid_ice" },
        "slush": { elem1: "hydroid_milkshake", elem2: "hydroid_milkshake" },
        "blood": { elem2: "hydroid" },
        "infection": { elem2: "hydroid" },
    }
};




elements.hydroid_ice = {
    color: ["#316787"],
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|M1|XX",
],
    category: "states",
    hidden: true,
    state: "solid",
    temp: -20,
    tempHigh: -18,
    density: 12,
    stain: 0.7,
    stateHigh: ["hydroid"],
    reactions: {
        "fire": { elem2: "explosion" },
        "body": { elem2: "hydroid", chance: 0.5, func: behaviors.KILLPIXEL2 },
        "head": { elem1: null, elem2: "hydroid", chance: 0.5, func: behaviors.FEEDPIXEL },
        "maple_syrup": { elem2: "hydroid" },
        "magma": { elem2: "hydroid" },
        "oil": { elem2: "hydroid" },
        "juice": { elem2: "hydroid" },
        "ice": { elem2: "hydroid_ice" },
        "ice_cream": { elem1: "hydroid_milkshake", elem2: "hydroid_milkshake" },
        "blood": { elem2: "hydroid" },
        "infection": { elem2: "hydroid" },
    }
};




elements.hydroid_milkshake = {
    color: ["#69acff", "#94b2d6", "#699bff"],
    behavior: [
    "XX|M1%0.1|XX",
    "M1|XX|M1",
    "M1|M1|M1",
],
    category: "liquids",
    state: "liquid",
    temp: 20,
    tempHigh: 100,
    tempLow: -40,
    stateLow: "hydroid_ice",
    density: 12,
    conduct: 1,
    stain: 0.7,
    desc: "somehow edible",
    stateHigh: ["pyrane", "steam", "salt", "sugar"],
    reactions: {
        "fire": { elem2: "explosion" },
        "head": { elem1: null, func: behaviors.FEEDPIXEL }
    }
};




elements.lime = {
    color: ["#63f20a", "#57cf0c"],
    behavior: behaviors.POWDER,
    category: "life",
    state: "solid",
    temp: 20,
    tempHigh: 80,
    renderer: renderPresets.WOODCHAR,
    stateHigh: ["steam", "fragrance"],
    breakInto: ["lime_juice"],
    stateHighColor: "#ccff00",
        reactions: {
        "head": { elem1: null, chance: 0.065, func: behaviors.FEEDPIXEL },
    }
};




elements.lime_juice = {
    color: ["#75ff1f", "#a5ff52"],
    behavior: behaviors.LIQUID,
    singleColor: true,
    category: "food",
    hidden: true,
    state: "liquid",
    temp: 20,
    tempHigh: 80,
    stateHigh: ["steam", "fragrance"],
    stateHighColor: "#ccff00",
        reactions: {
        "head": { elem1: "blood", elem2: null, chance: 0.1, func: behaviors.KILLPIXEL2 },
        "sugar": { elem1: "limeade", elem2: null, chance: 0.1 },
        "pilk": { elem1: "lilk", elem2: "lilk", chance: 0.3 },
        "milk": { elem1: null, elem2: "butter", chance: 0.1 },
    }
};




elements.lilk = {
    color: ["#0dd650"],
    desc: "Dairy free! Contains peanuts.",
    behavior: [
    "XX|XX|XX",
    "M1%0.1|XX|M1%0.1",
    "M1%1|M1%5|M1%1",
],
    singleColor: true,
    density: 400,
    category: "food",
    hidden: true,
    state: "liquid",
    temp: 20,
    tempHigh: 80,
    stateHigh: ["steam", "fragrance"],
    stateHighColor: "#ccff00",
    stateLow: ["nut_butter"],
    stateLowColor: "#0dd650",
        reactions: {
        "head": { elem1: null, chance: 0.5, func: behaviors.FEEDPIXEL },
        "lime_juice": { elem1: "lilk", elem2: "lilk", chance: 0.3 },
        "pilk": { elem1: "lilk", elem2: "lilk", chance: 0.3 },
    }
};




//scents




elements.sour_scent = {
    color: "#eecc00",
    behavior: [
    "M1|M1|M1",
    "M1|XX|M1",
    "M1|M1 AND CH:plant,grass,sapling,flower_seed,petal,vine>dead_plant%5|M1",
],
    hidden: false,
    category: "scents",
    state: "gas",
    temp: 20,
    tempLow: -5,
    stateLow: ["sour_sauce"],
    reactions: {
        "head": { elem1: null },
    }
};

elements.sour_sauce = {
    color: "#e3b317",
    behavior: [
    "XX|XX|XX",
    "M1|XX|M1",
    "M1|M1 AND CH:plant,grass,sapling,flower_seed,petal,vine>dead_plant%1|M1",
],
    hidden: false,
    category: "liquids",
    state: "liquid",
    temp: 20,
    stain: 0.3,
    tempHigh: 50,
    stateHigh: ["sour_scent"],
    reactions: {
        "head": { elem1: null },
    }
};

elements.cremoid = {
    color: ["#f2fffe"],
    behavior: [
    "XX|SW:milk,lactoid,butyroid,melted_butter,water AND CR:bubble%1|XX",
    "M1 AND SW:water|CH:butyroid%0.1|M1 AND SW:water",
    "M1|M1|M1",
],
    category: "food",
    state: "liquid",
    temp: 20,
    tempHigh: 100,
    tempLow: -25,
    density: 12,
    conduct: 1,
    desc: "this is NOT cream",
    stateHigh: ["pyrane", "steam"],
    stateLow: ["icecream", "hydroid_milkshake"],
    reactions: {
        "fire": { elem2: "explosion" },
        "head": { elem1: null, chance: 0.01, func: behaviors.FEEDPIXEL },
        "ice": { elem1: "lactoid_ice", elem2: "lactoid_ice" },
        "slush": { elem1: "hydroid_milkshake", elem2: "hydroid_milkshake" },
    }
};

elements.butyroid = {
    color: ["#a3f1ff"],
    behavior: [
    "XX|XX|XX",
    "M1%2|CH:butter%0.1|M1%2",
    "M1|M1|M1",
],
    category: "food",
    state: "liquid",
    temp: 20,
    tempHigh: 33,
    density: 120,
    conduct: 1,
    desc: "this is NOT cream",
    stateHigh: ["pyrane", "melted_butter"],
    reactions: {
        "fire": { elem2: "explosion" },
        "head": { elem1: null, chance: 0.01, func: behaviors.FEEDPIXEL },
    }
};

elements.sweet_savour = {
    color: "#ff1133",
    behavior: [
    "M1|M1|M1",
    "M1|DL%3|M1",
    "M1|M1|M1",
],
    hidden: false,
    category: "scents",
    state: "gas",
    temp: 20,
    tempLow: -5,
    stateLow: ["sweet_syrup"],
    reactions: {
        "head": { elem1: null, func: behaviors.FEEDPIXEL },
    }
};

elements.sweet_syrup = {
    color: "#d11204",
    behavior: [
    "XX|XX|XX",
    "M1|XX|M1",
    "M1|M1|M1",
],
    hidden: false,
    category: "food",
    state: "liquid",
    temp: 20,
    tempHigh: 100,
    stain: 0.1,
    stateHigh: ["sugar"],
    reactions: {
        "head": { elem1: null, func: behaviors.FEEDPIXEL },
    }
};

elements.hydrated_iron_oxide = {
    color: "#bd5515",
    behavior: [
    "XX|XX|XX",
    "M1|XX|M1",
    "M1|M1 AND CH:plant,grass,sapling,flower_seed,petal,vine>dead_plant%1 AND CH:iron,steel,aluminium>rust AND SW:rust,blood,infection%5|M1",
],
    hidden: false,
    category: "liquids",
    state: "liquid",
    temp: 20,
    stain: 0.1,
    tempHigh: 100,
    stateHigh: ["rust", "steam"],
    reactions: {
        "head": { elem2: ["infection", "rust"], chance: 0.03 },
        "body": { elem2: ["infection", "rust"], chance: 0.03 },
        "bless": { elem1: "iron" },
    }
};



elements.umami_umbre = {
    color: "#808000",
    behavior: [
    "M1|M1|M1",
    "M1|XX|M1",
    "M1|M1|M1",
],
    hidden: false,
    category: "scents",
    state: "gas",
    temp: 20,
    tempLow: -5,
    stateLow: ["mushroom_soup"],
    reactions: {
        "head": { elem1: null, func: behaviors.FEEDPIXEL },
    }
};

elements.mushroom_soup = {
    color: "#808000",
    behavior: [
    "XX|XX|XX",
    "M1|XX|M1",
    "M1|M1|M1",
],
    hidden: false,
    category: "food",
    state: "liquid",
    stain: 0.3,
    temp: 20,
    tempHigh: 150,
    stateHigh: ["umami_umbre", "steam", "salt", null],
    reactions: {
        "head": { elem1: null, func: behaviors.FEEDPIXEL },
    }
};




elements.bitter_breeze = {
    color: "#ddff11",
    behavior: [
    "M1|M1|M1",
    "M1|DL%1|M1",
    "M1|M1|M1",
],
    hidden: false,
    category: "scents",
    state: "gas",
    temp: 20,
    tempLow: -5,
    stateLow: ["lime_juice"],
    reactions: {
        "head": { elem1: null },
    }
};




elements.baked_breeze = {
    color: "#ab8b6b",
    behavior: [
    "M1|M1|M1",
    "M1|DL%10|M1",
    "M1|M1|M1",
],
    hidden: false,
    category: "scents",
    state: "gas",
    temp: 20,
    tempLow: -5,
    stateLow: ["fancy_flour"],
    stateLowColor: "#ab8c60",
    reactions: {
        "head": { elem1: null, func: behaviors.FEEDPIXEL },
    }
};




elements.citric_savour = {
    color: "#dddd11",
    behavior: [
    "M1|M1|M1",
    "M1|DL%7|M1",
    "M1|M1|M1",
],
    hidden: false,
    category: "scents",
    state: "gas",
    temp: 20,
    stateLowColor: "#fcc40a",
    tempLow: -5,
    stateLow: ["citric_sauce"],
    reactions: {
        "head": { elem1: null, func: behaviors.FEEDPIXEL },
    }
};

elements.citric_sauce = {
    color: "#11dd30",
    behavior: [
    "M1%5|XX|M1%5",
    "M1|XX|M1",
    "M1|M1|M1",
],
    hidden: false,
    category: "liquids",
    state: "liquid",
    temp: 20,
    tempHigh: 320,
    stateHigh: ["citric_savour"],
    stain: 0.7,
    reactions: {
        "head": { elem1: null, func: behaviors.FEEDPIXEL },
    }
};




elements.chemical_odour = {
    color: "#1155cc",
    behavior: [
    "M1|M1|M1",
    "M1|DL:0.3|M1",
    "M1|M1|M1",
],
    hidden: false,
    category: "scents",
    state: "gas",
    temp: 20,
    tempLow: -5,
    stateLow: ["plastic"],
    reactions: {
        "head": { elem1: null, elem2: "bone", chance: 0.01, func: behaviors.KILLPIXEL2 },
    }
};


//SCENT END





elements.quicksand = {
    color: ["#9e9045", "#b4a75d"],
    behavior: [
    "XX|SW:body,head,water,rock,dirt AND CH:blood>sand AND CH:sand>wet_sand%5 AND SW:wet_sand%3 AND SW:sand%1 AND CC:head,body,bone,blood,cooked_meat,meat,rotten_meat>#9f9146|XX",
    "M2%0.1 AND CH:blood>sand AND CH:sand>wet_sand%5 AND SW:wet_sand%1|XX|M2%0.1 AND CH:blood>sand AND CH:sand>wet_sand%5 AND SW:wet_sand%1",
    "M2%5|M1%85 AND CH:blood>sand AND CH:sand>wet_sand%5 AND CC:water>9e9045,b4a75d AND CC:head,body,bone,blood,cooked_meat,meat,rotten_meat>#9f9146|M2%5"
],
    category: "land",
    temp: 20,
    tempHigh: 1700,
    tempLow: 0,
    state: "solid",
    stain: 0.1,
    stateHigh: ["glass", "steam"],
    stateLow: ["wet_sand", "ice"],
        desc: "this is NOT sand",
    burn: 0,
    conduct: 0.4,
    reactions: {
        "head": { elem2: "bone", chance: 0.1, func: behaviors.KILLPIXEL2 },
        "body": { elem2: "bone", chance: 0.1, func: behaviors.KILLPIXEL2 },
        "bone": { elem2: null, chance: 0.05 },
    }
};




elements.hed_bod = {
    color: ["#ffffff"],
    behavior: [
    "XX|DL AND CR:head|XX",
    "XX|CH:body|XX",
    "XX|XX|XX"
],
    category: "special",
    temp: 20,
};





elements.melted_butter.reactions.bread = { "elem1": null, "elem2":"brioche" },
elements.water.reactions.fancy_flour = { "elem1": null, "elem2":"fancy_dough" },
elements.fire.reactions.nitrogen = { "elem1": null, "elem2": "pyrane" };


elements.redstone_dust = {
    color: ["#880000"],
    behavior: [
    "XX|CC:sand>00ff00|XX",
    "XX|CC:880000|XX",
    "M2|M1|M2"
],
    behaviorOn: [
    "CC:redstone_dust>cc0000|CC:redstone_dust>cc0000|CC:redstone_dust>cc0000",
    "CC:redstone_dust>cc0000|CC:cc0000|CC:redstone_dust>cc0000",
    "M2 AND CC:redstone_dust>cc0000|M1 AND CC:redstone_dust>cc0000|M2 AND CC:redstone_dust>cc0000"
],
    category: "machines",
    temp: 20,
    hardness: 0.3,
    desc: "Idea from Minecraft.",
    burn: 70,
    breakInto: ["redstone_dust", "redstone_dust", "redstone_dust", null],
    stateHigh: ["redstone_dust", "redstone_dust", "redstone_dust", null],
    tempHigh: 800,
    fireElement: ["laser", "smoke"],
    burnInto: null,
    burnTime: 1,
    conduct: 0.867,
};


elements.redstone_block = {
    color: ["#880000"],
    behavior: [
    "XX|SH:redstone_dust AND CC:redstone_dust>cc0000|XX",
    "SH:redstone_dust AND CC:redstone_dust>cc0000|XX|SH:redstone_dust AND CC:redstone_dust>cc0000",
    "XX|SH:redstone_dust AND CC:redstone_dust>cc0000|XX"
],
    category: "machines",
    temp: 20,
    hardness: 0.6,
    desc: "Idea from Minecraft.",
    breakInto: "redstone_dust",
};


elements.drowsiness = {
    color: ["#aa00cc"],
    behavior: [
    "M1 AND CH:head>asl_hd AND CH:body>asl_bd|M1 AND CH:head>asl_hd AND CH:body>asl_bd|M1 AND CH:head>asl_hd AND CH:body>asl_bd",
    "M1 AND CH:head>asl_hd AND CH:body>asl_bd|DL%45|M1 AND CH:head>asl_hd AND CH:body>asl_bd",
    "M1 AND CH:head>asl_hd AND CH:body>asl_bd|M1 AND CH:head>asl_hd AND CH:body>asl_bd|M1 AND CH:head>asl_hd AND CH:body>asl_bd",
],
    category: "energy",
    state: "gas",
    temp: 20,
    tempLow: -10,
    stateLow: "melatonin",
};


elements.melatonin = {
    color: ["#ddccff"],
    behavior: behaviors.POWDER,
    category: "special",
    temp: 20,
    reactions: {
        "head": { elem1: null, elem2: "asl_hd", chance: 0.1, func: behaviors.FEEDPIXEL },
        "body": { elem1: null, elem2: "asl_bd", chance: 0.1, func: behaviors.FEEDPIXEL },
    }
};


elements.asl_hd = {
    name: "Head (Asleep)",
    color: ["#4a4a4a"],
    //old behavior: [
    //"XX|CR:yawn%0.1|XX",
    //"XX|CH:wuh%0.3|XX",
    //"XX|M1 AND CH:body>asl_bd|XX"
//],
    behavior: [
    "XX|XX|XX",
    "XX|DL|XX",
    "XX|M1 AND CH:body>asl_bd|XX"
],
    category: "unused",
    hidden: true,
    temp: 20,
    breakInto: ["blood", "meat", "bone"],
    tempHigh: 150,
    tempLow: -30,
    stateHigh: "cooked_meat",
    stateLow: "frozen_meat",
};


elements.asl_bd = {
    name: "Sleeping Human",
    color: ["#50555c"],
behavior: [
    "DL:blood|DL:blood AND CR:yawn%0.04 AND DL:head|DL:blood",
    "DL:blood|CH:wub%2|DL:blood",
    "DL:blood|M1 AND DL:blood|DL:blood"
],
    category: "life",
    temp: 20,
    breakInto: ["blood", "meat", "bone"],
    tempHigh: 150,
    tempLow: -30,
    stateHigh: "cooked_meat",
    stateLow: "frozen_meat",
};


elements.wuh = {
    name: "Head (Waking Up)",
    color: ["#a19b8c"],
    behavior: [
    "DL:blood|DL:blood|DL:blood",
    "DL:blood|CH:head|DL:blood",
    "DL:blood|CH:wub>body|DL:blood"
],
    category: "unused",
    hidden: true,
    temp: 20,
    breakInto: ["blood", "meat", "bone"],
    tempHigh: 150,
    tempLow: -30,
    stateHigh: "cooked_meat",
    stateLow: "frozen_meat",
};


elements.wub = {
    name: "Body (Waking Up)",
    color: ["#8c95a1"],
    behavior: [
    "DL:blood|DL:blood AND CR:wuh|DL:blood",
    "DL:blood|XX|DL:blood",
    "DL:blood|M1 AND DL:blood|DL:blood"
],
    category: "life",
    state: "liquid",
    temp: 20,
    breakInto: ["blood", "meat", "bone"],
    tempHigh: 150,
    tempLow: -30,
    stateHigh: "cooked_meat",
    stateLow: "frozen_meat",
};


elements.nullium = {
    color: ["#000000"],
    behavior: [
    "XX|XX|XX",
    "XX|DL|XX",
    "XX|XX|XX"
],
    category: "special",
    temp: 20,
    breakInto: null,
};


elements.yawn = {
    color: ["#eeeeff"],
    behavior: [
    "M1 AND CH:head>asl_hd%5|M1 AND CH:head>asl_hd%5|M1 AND CH:head>asl_hd%5",
    "M1|DL%1|M1",
    "M1|CH:head>asl_hd AND M1|M1",
],
    category: "special",
    state: "gas",
    temp: 20,
};

elements.acetone = {
    color: ["#b8e3da"],
    behavior: [
    "XX|CR:chemical_odour,fragrance,foam%1|XX",
    "M2|XX|M2",
    "M1|M1 AND CO:2%40 AND SM%1 AND DL%0.1 AND CC:water>#bce3db |M1",
],
    category: "liquids",
    temp: 20,
    viscosity: 100,
    state: "liquid",
    density: 720,
    stain: 0.2,
    alpha: 0.8,
    reactions: {
        "water": { elem2: "foam", chance: 0.3 },
        "head": { elem2: null, chance: 0.3 },
        "body": { elem2: null, chance: 0.3 },
    }
};

elements.drill = {
    color: ["#6F6F6F", "#868686", "#666666"],
    behavior: [
    "XX|LB:carbon_dioxide AND DL AND SH|XX",
    "SH|SH AND HT:5|SH",
    "XX|M1 AND LB:carbon_dioxide,electric AND SW AND HT:3 AND SM AND SH|XX",
],
    category: "machines",
    temp: 20,
    tempHigh: 1000,
    stateHigh: "molten_metal_scrap",
    breakInto: "metal_scrap",
    state: "solid",
    density: 1050,
    conduct: 5,
};

elements.heat_lamp = {
    color: "#ffd6cf",
    behavior: [
"XX|XX|XX",
"XX|XX|XX",
"XX|XX|XX",
],
    behaviorOn: [
"XX|XX|XX",
"XX|XX|XX",
"XX|CR:elec_light%5 AND CH:inv_ht%0|XX",
],
    category: "machines",
    state: "solid",
    charge: 0,
    tempHigh: 1500,
    stateHigh: "molten_metal_scrap",
    breakInto: ["metal_scrap", "electric", "flash"],
    conduct: 1,
    reactions: {
        "malware": { elem1: "fan", chance: 0.9 },
    }
};

elements.powerful_heat_lamp = {
    color: "#ffb1a3",
    behavior: [
"XX|XX|XX",
"XX|XX|XX",
"XX|XX|XX",
],
    behaviorOn: [
"XX|XX|XX",
"XX|XX|XX",
"CR:elec_light%1 AND CH:inv_ht%0||CR:elec_light%2 AND CH:inv_ht%0 AND HT:5%10 AND CR:heat_ray%5|CR:elec_light%1 AND CH:inv_ht%0|",
],
    category: "machines",
    state: "solid",
    temp: 80,
    tempHigh: 2500,
    stateHigh: "molten_metal_scrap",
    breakInto: ["metal_scrap", "electric", "flash", "fire", "heat_ray"],
    conduct: 1,
    reactions: {
        "malware": { elem1: "fan", chance: 0.9 },
    }
};

elements.fan = {
    color: "#cfe2ff",
    behavior: [
"XX|XX|XX",
"XX|XX|XX",
"XX|XX|XX",
],
    behaviorOn: [
"XX|XX|XX",
"XX|XX|CR:e_wind%5",
"XX|XX|XX",
],
    category: "machines",
    state: "solid",
    charge: 0,
    tempHigh: 1500,
    stateHigh: "molten_metal_scrap",
    breakInto: ["metal_scrap", "electric", "flash", "snow", "freeze_ray"],
    conduct: 1,
    reactions: {
        "malware": { elem1: "heat_lamp", chance: 0.9 },
    }
};

elements.inv_ht = {
    color: "#aa0000",
    behavior: [
"XX|XX|XX",
"XX|XX|XX",
"XX|M1 AND BO AND HT:3|XX",
],
    category: "energy",
    state: "gas",
    hidden: true,
    alpha: 0.1,
    tempLow: 10,
    stateLow: null,
};

elements.inv_co = {
    color: "#0000aa",
    behavior: [
"XX|XX|XX",
"XX|XX|M1 AND BO AND CO:3",
"XX|XX|XX",
],
    category: "energy",
    state: "gas",
    alpha: 0.1,
    hidden: true,
    tempHigh: 100,
    stateHigh: null,
};

elements.elec_light = {
    color: "#ddddff",
    name: "Artificial Light",
    behavior: [
"XX|HT:3|XX",
"HT:4|DL%2|HT:4",
"XX|M1 AND BO AND HT:4|XX",
],
    category: "energy",
    state: "gas",
    alpha: 0.7,
    temp: 40,
    tempLow: -200,
    tempHigh: 300,
    stateLow: "liquid_light",
    stateHigh: "light",
};

elements.e_wind = {
    color: "#eeeefa",
    name: "Wind",
    behavior: [
"XX|CO:3|M1%5 AND BO",
"CO:3|CH:oxygen%0.4|M1 AND BO AND CO:3",
"XX|CO:3|M1%5 AND BO",
],
    category: "gases",
    state: "gas",
    alpha: 0.7,
    temp: 10,
    tempLow: -30,
    tempHigh: 35,
    stateHigh: "cloud",
};

elements.frisket = {
    color: ["#d1ffdc"],
    behavior: [
    "XX|CR:sour_scent,ammonia%0.1|XX",
    "M1%7|CH:dried_frisket%0.5|M1%7",
    "M2|M1%50|M2"
],
    category: "liquids",
    temp: 20,
    tempHigh: 100,
    tempLow: -200,
    stateHigh: ["steam", "ammonia", "liquid_latex"],
    stateLow: ["dried_frisket"],
        desc: "masking fluid used in art that smells like seafood",
    burn: 30,
    conduct: 1,
};

elements.dried_frisket = {
    color: ["#68d995"],
    behavior: [
    "XX|CR:sour_scent,ammonia%0.05|XX",
    "XX|XX|XX",
    "XX|XX|XX"
],
    category: "solids",
    renderer: renderPresets.HEATGLOW,
    temp: 20,
    alpha: 0.9,
    movable: true,
    tempHigh: 200,
    stateHigh: ["ammonia", "latex"],
    breakInto: ["dried_frisket", null],
        desc: "masking fluid used in art that smells like seafood, dried",
    burn: 0.1,
    conduct: 0.1,
    reactions: {
        "nitrogen": { elem1: "frisket", elem2:"foam", chance: 0.1 },
    }
};

elements.sr_pl = {
    name: "Sun Resistant Plastic",
    color: "#505a66",
    behavior: [
"DL:light,sunlight|DL:light,sunlight|DL:light,sunlight",
"DL:light,sunlight|XX|DL:light,sunlight",
"DL:light,sunlight|DL:light,sunlight|DL:light,sunlight",
],
conduct: 1,
behaviorOn: [
"CR:light,sunlight|CR:light,sunlight|CR:light,sunlight",
"CR:light,sunlight|HT:10|CR:light,sunlight",
"CR:light,sunlight|CR:light,sunlight|CR:light,sunlight",
],
    category: "solids",
    state: "solid",
    hidden: true,
renderer: renderPresets.HEATGLOW,
stateHigh: ["molten_gallium", "molten_glass", "molten_plastic", "tocopheryl_gas", "molten_rose_gold"],
    alpha: 0.5,
    tempHigh: 6177,
};

elements.latex = {
    color: ["#aabfbd"],
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|XX|XX"
],
    category: "solids",
    renderer: renderPresets.HEATGLOW,
    temp: 20,
    movable: true,
    tempHigh: 200,
    stateHighName: ["liquid_latex"],
    burn: 0.03,
    conduct: 0.03,
    reactions: {
        "head": { elem2: "explosion", chance: 0.005, func: behaviors.KILLPIXEL2 },
        "ammonia": { elem1: "frisket", elem2:"foam", minTemp: 100 },
    }
};

elements.human_missile = {
    color: ["#8a9499", "#9e9e9e", "#d1d1d1"],
    category: "missiles",
    state: "solid",
    temp: 20,
    tempHigh: 2000,
    stateHigh: "molten_metal_scrap",
    breakInto: "metal_scrap",
    fireColor: "#e342a5",
};




elements.human_missile.behavior = [
   ["XX","XX","XX"],
    ["XX","XX","M1 AND LB:hed_bod%20 AND EX:3>explosion"],
    ["XX","XX","XX"],   
];

elements.e_fence = {
    name: "Electric Fence",
    color: ["#baba9c"],
    behavior: [
"XX|XX|XX",
"XX|XX|XX",
"XX|XX|XX",
],
    behaviorOn: [
    "XX|SH|XX",
    "SH AND CH:head,body>ash,pop,cooked_meat AND HT:3%20|XX|SH AND CH:head,body>ash,pop,cooked_meat AND HT:3%20",
    "XX|SH|XX"
],
    charge: 1,
    category: "machines",
    density: 7850,
    temp: 20,
    tempHigh: 1956,
    renderer: renderPresets.HEATGLOW,
    stateHigh: ["molten_metal_scrap", "molten_steel"],
    breakInto: ["metal_scrap", "electric", "explosion", "electrum"],
    conduct: 0.1,
};