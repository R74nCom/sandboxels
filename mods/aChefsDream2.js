// created by SquareScreamYT
// the sequel to aChefsDream!

runAfterLoad(function() {
    console.log("Thanks for using aChefsDream2.js! -sqec")
})

var mods_to_include = ["mods/aChefsDream.js"]

var mods_included = mods_to_include.map(mod => enabledMods.includes(mod));
var all_mods_included = mods_included.reduce(function(a,b) { return a && b });

if(!all_mods_included) {
    var mods_needed = mods_to_include.filter(function(modPath) { return !(enabledMods.includes(modPath)) });

    mods_needed.forEach(function(modPath) {
		enabledMods.splice(enabledMods.indexOf("mods/aChefsDream2"),0,modPath);
	});
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
}

// Pork and Pigs

elements.pig = {
    color: ["#9c6732", "#dbb997", "#fcaeae"],
    behavior: [
        "M2%1|XX|M2%1",
        "M2%10|XX|M2%10",
        "XX|M1|XX",
    ],
    category:"life",
	state: "solid",
    reactions: {
        "petal": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "corn": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "lettuce": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "wheat": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "grass": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "grape": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "pumpkin_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "pumpkin": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "nut": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "lichen": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.3 },
        "mercury": { elem1:"rotten_meat", chance:0.1 },
        "bleach": { elem1:"rotten_meat", chance:0.1 },
        "infection": { elem1:"rotten_meat", chance:0.025 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cyanide": { elem1:"rotten_meat", chance:0.1 },
        "chlorine": { elem1:"meat", chance:0.1 },
        "dirty_water": { elem1:"rotten_meat", chance:0.0001 },
    },
    egg: "piglet",
    foodNeed: 10,
    temp: 40,
    tempHigh: 75,
    stateHigh: "cooked_pork",
    tempLow: -18,
    stateLow: "frozen_meat",
    breakInto: "raw_pork",
    burn:85,
    burnTime:450,
    state: "solid",
    density: 1117,
    conduct: 0.3,
    extractInto: "raw_pork",
};
elements.piglet = {
    color: ["#f7bebe", "#d1a88e"],
    behavior: [
        "M2%1|XX|M2%1",
        "M2%10|FX%5 AND CH:pig%0.1|M2%10",
        "XX|M1|XX",
    ],
    category: "life",
    state: "solid",
    foodNeed: 20,
    temp: 40,
    tempHigh: 75,
    stateHigh: "cooked_pork",
    tempLow: -18,
    stateLow: "frozen_meat",
    breakInto: "blood",
    burn:85,
    burnTime:450,
    state: "solid",
    density: 900,
    conduct: 0.1,
    reactions: {
        "petal": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "corn": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "lettuce": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "wheat": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "grass": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "grape": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "pumpkin_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "pumpkin": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "nut": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "lichen": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.3 },
        "mercury": { elem1:"rotten_meat", chance:0.1 },
        "bleach": { elem1:"rotten_meat", chance:0.1 },
        "infection": { elem1:"rotten_meat", chance:0.025 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cyanide": { elem1:"rotten_meat", chance:0.1 },
        "chlorine": { elem1:"meat", chance:0.1 },
        "dirty_water": { elem1:"rotten_meat", chance:0.0001 },
    },
};

elements.barbecued_pork = {
    color:["#a1391f","#ab5e32"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:55,
    tempHigh: 600,
    stateHigh: ["ash","smoke"],
    isFood: true,
    hidden: true,
}
elements.cooked_pork = {
    color: ["#e6bf8a", "#e3be96"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp: 40,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    hidden: true,
    alias: "cooked_pork"
};

elements.raw_pork = {
    color: ["#ed5d47", "#e0423d"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    burnInto: "cooked_pork",
    temp:25,
    tempHigh: 200,
    stateHigh: "cooked_pork",
    reactions: {
        "charcoal": {elem1: "barbecued_pork", tempMin: 70},
        "fire": {elem1: "barbecued_pork"}
    }
};

// Extraction tool

elements.extract = {
    color: "#82452c",
    // other needed properties
    tool: (pixel) => {
        //store extractInto as a variable for legibility
        var extractInto = elements[pixel.element].extractInto;
        //if there’s no extractInto, it should equal undefined, which is falsey and !undefined = true
        if (!extractInto) { return };
        //if extractInto is an array, randomly pick one of its elements
        if(extractInto instanceof Array) { extractInto = extractInto[Math.floor(Math.random() * extractInto.length)] };
        //change pixel into the (chosen) element
        if (shiftDown) {
            if (Math.random() < 0.5) {
                var thiselement = pixel.element;
                changePixel(pixel, extractInto)
                pixelTempCheck(pixel);
                if (elements[thiselement].extractIntoColor) {
                    pixel.color = pixelColorPick(pixel, elements[thiselement].extractIntoColor);
                }
            }
        }
        else if (!shiftDown) {
            if (Math.random() < 0.1) {
                var thiselement = pixel.element;
                changePixel(pixel, extractInto)
                pixelTempCheck(pixel);
                if (elements[thiselement].extractIntoColor) {
                    pixel.color = pixelColorPick(pixel, elements[thiselement].extractIntoColor);
                }
            }
        }
    },
    category: "tools",
    canPlace: false,
    desc: "Use on pixels to extract the essence from them, if possible. [BETA]"
}

// spices

elements.allspice = {
    color: ["#7B5B3A", "#A75B3D", "#B67B57", "#C19A6B"],
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    isFood: true,
    temp: 20,
    hidden: true,
    tempHigh: 250,
    stateHigh: ["ash", "smoke"],
}

elements.cumin = {
    color: "#A58459",
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    isFood: true,
    temp: 20,
    hidden: true,
    tempHigh: 250,
    stateHigh: ["ash", "smoke"],
}

elements.paprika = {
    color: ["#C72C29","#b22b02"],
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    isFood: true,
    temp: 20,
    hidden: true,
    tempHigh: 250,
    stateHigh: ["ash", "smoke"],
}

elements.turmeric = {
    color: ["#E5B635","#D9A322"],
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    isFood: true,
    temp: 20,
    hidden: true,
    tempHigh: 250,
    stateHigh: ["ash", "smoke"],
}

elements.saffron = {
    color: ["#b83b3b","#a82525"],
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    isFood: true,
    temp: 20,
    hidden: true,
    tempHigh: 250,
    stateHigh: ["ash", "smoke"],
}

// sugarcane

elements.sugarcane_plant = {
    color: ["#fbc852","#dfad54"],
    behavior: [
        "XX|M2%2|XX",
        "XX|L2:sugarcane AND C2:sugarcane%10|XX",
        "XX|M1|XX",
    ],
    tick: behaviors.SEEDRISE,
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "sugarcane",
    burn: 30,
    burnTime: 100,
    category: "life",
    state: "solid",
    density: 686,
    breakInto: "cane_sugar",
    cooldown: defaultCooldown,
    seed: true
}
elements.sugarcane = {
    color: ["#7cc05c","#77a052"],
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 380,
    stateHigh: ["ember","fire","fire","fire"],
    burn: 10,
    burnTime: 200,
    burnInto: ["ember","fire","fire","fire"],
    category: "food",
    state: "solid",
    density: 686,
    breakInto: "cane_sugar",
    seed: "sugarcane_plant"
}
elements.cane_sugar = {
    color: "#ffeedb",
    behavior: behaviors.POWDER,
    reactions: {
        "grape": { elem1:null, elem2:"jelly", chance:0.005, tempMin:100 },
        "water": { elem1:null, elem2:"sugar_water"},
    },
    category: "food",
    tempHigh: 186,
    stateHigh: "caramel",
    state: "solid",
    density: 1590,
    isFood: true
}
elements.tea_leaves = {
    color: ["#3e6e26","#507e28","#759e2e"],
    reactions: {
        "water": { elem2:"tea", tempMin:80 },
        "salt_water": { elem2:"tea", tempMin:80 },
        "sugar_water": { elem2:"tea", tempMin:80 },
        "seltzer": { elem2:"tea", tempMin:80 },
        "stench": { elem2:null, chance:0.25 },
        "steam": { elem2:"fragrance", chance:0.1 },
        "flea": { elem2:null, chance:0.01 },
        "termite": { elem2:null, chance:0.01 },
        "fly": { elem2:null, chance:0.01 },
        "ant": { elem2:null, chance:0.01 },
        "stink_bug": { elem2:null, chance:0.01 },
    },
    behavior: behaviors.POWDER,
    tempHigh: 300,
    stateHigh: ["fire","smoke","smoke","smoke","ash"],
    tempLow: -2,
    stateLow: "frozen_plant",
    burn:10,
    burnTime:300,
    burnInto: ["fire","smoke","smoke","smoke","smoke","smoke","smoke","fragrance"],
    category:"food",
    state: "solid",
    density: 1400,
    isFood: true,
}
elements.cinnamon = {
    color: "#986544",
    reactions: {
        "stench": { elem2:null, chance:0.25 },
        "steam": { elem2:"fragrance", chance:0.1 },
        "flea": { elem2:null, chance:0.01 },
        "termite": { elem2:null, chance:0.01 },
        "fly": { elem2:null, chance:0.01 },
        "ant": { elem2:null, chance:0.01 },
        "stink_bug": { elem2:null, chance:0.01 },
    },
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 300,
    stateHigh: ["fire","smoke","smoke","smoke","ash"],
    burn:10,
    burnTime:300,
    burnInto: ["fire","smoke","smoke","smoke","fragrance"],
    category:"food",
    state: "solid",
    density: 1400,
    isFood: true,
    breakInto: "cinnamon_powder"
}
elements.cinnamon_powder = {
    color: "#D2691E",
    reactions: {
        "stench": { elem2:null, chance:0.25 },
        "steam": { elem2:"fragrance", chance:0.1 },
        "flea": { elem2:null, chance:0.01 },
        "termite": { elem2:null, chance:0.01 },
        "fly": { elem2:null, chance:0.01 },
        "ant": { elem2:null, chance:0.01 },
        "stink_bug": { elem2:null, chance:0.01 },
    },
    behavior: behaviors.POWDER,
    tempHigh: 300,
    stateHigh: ["fire","smoke","smoke","smoke","ash"],
    burn:10,
    burnTime:300,
    burnInto: ["fire","smoke","smoke","smoke","smoke","smoke","smoke","fragrance"],
    category:"food",
    state: "solid",
    density: 1400,
    isFood: true,
}
elements.cola_syrup = {
    color: "#4f0e0e",
    behavior: behaviors.LIQUID,
    tempHigh: 170,
    stateHigh: ["sugar","smoke","smoke"],
    tempLow: -15,
    category:"liquids",
    state: "liquid",
    viscosity: 15,
    hidden: true,
    density: 1400,
    reactions: {
        "seltzer": { elem1: ["cola_syrup", "cola_syrup", "foam"], elem2:"soda"},
        "soda": { elem1: "foam", chance:0.001},
    },
}
if (!elements.sugar_water.reactions) elements.sugar_water.reactions = {};
elements.sugar_water.reactions.lemon_juice = { elem1: "sugar_water", elem2: null, color1: "#fff7ba" }
if (!elements.sugar_water.reactions) elements.sugar_water.reactions = {};
elements.sugar_water.reactions.cinnamon_powder = { elem1: "cola_syrup", elem2: null }