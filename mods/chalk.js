elements.calcium_chloride = {
    color: ["#D3DDE8", "#C6CCD5", "#BCC7D3", "#DDE4EB"],
    behavior: behaviors.STURDYPOWDER,
    category: "powders",
    hidden: false,
    breakInto: ["calcium", "chlorine"],
    state: "solid",
    tempHigh: 772,
    reactions: {
        "sodium_carbonate": { elem1:"foam", elem2:["colour_pick_chalk_powder","chalk_powder1","chalk_powder3","chalk_powder2","chalk_powder4","chalk_powder5","chalk_powder6","chalk_powder7","chalk_powder8","chalk_powder9",] },
        "sodium": { elem1:"salt", elem2:"calcium" },
        "ice": { elem2:"water", chance: 0.5 },
        "dust": { elem2: null, chance: 0.5 },
        "water": { elem2: null, chance: 0.8 },
        "rotten_meat": { elem2: "meat" },
        "laser": { elem1: ["calcium","chlorine"] },
    }
};

if (!elements.sodium.reactions) { // Include this block once
    elements.sodium.reactions = {} // This creates the property if it doesn't exist
}
elements.sodium.reactions.carbon_dioxide = { elem1: "sodium_carbonate" }




elements.sodium_carbonate = {
    color: "#ffffff",
    behavior: behaviors.POWDER,
    category: "powders",
    hidden: false,
    breakInto: ["sodium", "carbon_dioxide"],
    state: "solid",
    tempHigh: 851,
    reactions: {
        "calcium_chloride": { elem1:"foam", elem2:"colour_pick_chalk" },
        "chlorine": { elem1:"salt", elem2:"carbon_dioxide" },
        "laser": { elem1: ["carbon_dioxide","sodium"] },
    }
};


if (!elements.calcium.reactions) { // Include this block once
    elements.calcium.reactions = {} // This creates the property if it doesn't exist
}
elements.calcium.reactions.chlorine = { elem1: "calcium_chloride" }

elements.colour_pick_chalk = {
    color: ["#FF4DFF", "#B24DFF", "#4D52FF", "#4DB0FF", "#4DFFDF", "#64FF4D", "#FFE74D", "#FF994D", "#FF5B4D", "#FF794D", "#FFB14D", "#A8FF4D", "#4DFF85", "#4DD6FF"],
    stain: 0.5,
    stainSelf: true,
    canContain: true,
    related: ["art", "calcium", "calcium_chloride", "sodium_carbonate"],
    customColor: true,
    category: "chalk",
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
    related: ["art", "calcium", "calcium_chloride", "sodium_carbonate"],
    customColor: false,
    hidden: false,
    category: "chalk",
    breakInto: "chalk_powder1",
    state: "solid",
    tempHigh: 590,
    stateHigh: "ash",
};

elements.rainbow_chalk = {
    name: "Rainbow Chalk",
    onPlace: behaviors.DO_TICK,
	tick: function(pixel) {
		if (pixel.start-1 <= pixelTicks) {
			if (pixel.colorstart === undefined) {
				pixel.colorstart = pixel.start;
			}
			pixel.color = "hsl(" + pixel.colorstart + ",100%,65%)";
		}
	},
    color: ["#ff4d4d","#ffac4d","#ffff4d","#4dff4d","#4dffff","#4d4dff","#ff4dff"],
    stain: 0.5,
    stainSelf: true,
    canContain: true,
    related: ["art", "calcium", "calcium_chloride", "sodium_carbonate"],
    customColor: false,
    hidden: false,
    category: "chalk",
    breakInto: "chalk_powder_r",
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
    related: ["art", "calcium", "calcium_chloride", "sodium_carbonate"],
    customColor: false,
    hidden: false,
    category: "chalk",
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
    related: ["art", "calcium", "calcium_chloride", "sodium_carbonate"],
    customColor: false,
    hidden: false,
    category: "chalk",
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
    related: ["art", "calcium", "calcium_chloride", "sodium_carbonate"],
    customColor: false,
    hidden: false,
    category: "chalk",
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
    related: ["art", "calcium", "calcium_chloride", "sodium_carbonate"],
    customColor: false,
    hidden: false,
    category: "chalk",
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
    related: ["art", "calcium", "calcium_chloride", "sodium_carbonate"],
    customColor: false,
    hidden: false,
    category: "chalk",
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
    related: ["art", "calcium", "calcium_chloride", "sodium_carbonate"],
    customColor: false,
    hidden: false,
    category: "chalk",
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
    related: ["art", "calcium", "calcium_chloride", "sodium_carbonate"],
    customColor: false,
    hidden: false,
    category: "chalk",
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
    related: ["art", "calcium", "calcium_chloride", "sodium_carbonate"],
    customColor: false,
    hidden: false,
    category: "chalk",
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
    related: ["art", "calcium", "calcium_chloride", "sodium_carbonate"],
    customColor: false,
    hidden: false,
    category: "chalk",
    state: "solid",
    tempHigh: 590,
    stateHigh: "ash",
};

elements.chalk_powder_r = {
    name: "Rainbow Chalk Powder",
    onPlace: behaviors.DO_TICK,
	tick: function(pixel) {
		behaviors.POWDER(pixel);
		if (pixel.start-1 <= pixelTicks) {
			if (pixel.colorstart === undefined) {
				pixel.colorstart = pixel.start;
			}
			pixel.color = "hsl(" + pixel.colorstart + ",100%,65%)";
		}
	},
    color: ["#ff4d4d","#ffac4d","#ffff4d","#4dff4d","#4dffff","#4d4dff","#ff4dff"],
    stain: 0.5,
    stainSelf: true,
    canContain: true,
    related: ["art", "calcium", "calcium_chloride", "sodium_carbonate"],
    customColor: false,
    hidden: false,
    category: "chalk",
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
    related: ["art", "calcium", "calcium_chloride", "sodium_carbonate"],
    customColor: false,
    hidden: false,
    category: "chalk",
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
    related: ["art", "calcium", "calcium_chloride", "sodium_carbonate"],
    customColor: false,
    hidden: false,
    category: "chalk",
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
    related: ["art", "calcium", "calcium_chloride", "sodium_carbonate"],
    customColor: false,
    hidden: false,
    category: "chalk",
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
    related: ["art", "calcium", "calcium_chloride", "sodium_carbonate"],
    customColor: false,
    hidden: false,
    category: "chalk",
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
    related: ["art", "calcium", "calcium_chloride", "sodium_carbonate"],
    customColor: false,
    hidden: false,
    category: "chalk",
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
    related: ["art", "calcium", "calcium_chloride", "sodium_carbonate"],
    customColor: false,
    hidden: false,
    category: "chalk",
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
    related: ["art", "calcium", "calcium_chloride", "sodium_carbonate"],
    customColor: false,
    hidden: false,
    category: "chalk",
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
    related: ["art", "calcium", "calcium_chloride", "sodium_carbonate"],
    customColor: false,
    hidden: false,
    category: "chalk",
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
    category: "chalk",
    state: "solid",
    tempHigh: 590,
    stateHigh: "ash",
};

elements.i_chalk_powder = {
    name: "Incendiary Chalk Powder",
    behavior: [
"XX|CR:fire%5 AND CR:ember%0.1|XX",
"XX|CH:pop,ember%0.05 AND HT:5%2|XX",
"M2|M1|M2",
],
    color: ["#ffb37d"],
    stain: 0.5,
    stainSelf: true,
    temp: 70,
    canContain: true,
    related: ["art", "calcium", "calcium_chloride", "sodium_carbonate"],
    customColor: false,
    hidden: false,
    category: "chalk",
    state: "solid",
    tempHigh: 590,
    stateHigh: "flashbang",
};