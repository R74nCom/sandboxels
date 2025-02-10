//it would be cool to put this on the website :D
//thanks r74n and sandboxels mod devs for the idea for making this and adding so much value to my gaming experience
//if one needs a desc for the mod list on the website it'd be something around "charson's mods compiled such as random foods and random elements asked for by random people, beta"
//thanks!

elements.syrup = {
    color: "#a13d08",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 100000,
    state: "liquid",
    density: 720,
    isFood: true,
    desc: "maple syrup",
	reactions: {
        "head": { elem1: null, elem2:"head" },
    }
};

elements.akshajium = {
    color: ["#a8160c", "#fdff94", "#d47d20"],
    behavior: behaviors.POWDER,
    category: "food",
    viscosity: 10000,
    state: "solid",
    density: 100,
    desc: "its pizza",
	reactions: {
        "head": { elem1: null, elem2:"head" },
    }
};

elements.brioche_steam = {
    color: "#ab8c60",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 720,
    temp: 80,
    tempLow: 30,
	desc: "how does this make any sense?",
    stateLow: ["brioche"],
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
        "head": { elem1: null, elem2:"head" },
    }
};

elements.brioche = {
    color: ["#c2770e", "#b06227"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    temp: 30,
    tempHigh: 80,
    tempLow: 10,
    stateHigh: ["fragrance", "ash"],
    stateLow: ["cold_brioche"],
    burn: 55,
    isFood: true,
    breakInto: "fancy_flour",
	reactions: {
        "head": { elem1: null, elem2:"head" },
    }
};

elements.aresium = {
    color: "#1017ad",
    behavior: behaviors.WALL,
    category: "solids",
    temp: 19,
    tempHigh: 100,
    tempLow: -20,
    stateHigh: ["skibidi_aresium"],
    stateLow: ["magma", "electric"],
	desc: "it's a transition metal named after mars",
    burn: 0,
    conduct: 1,
};

elements.skibidi_aresium = {
    color: "#ad1051",
    behavior: behaviors.MOLTEN,
    category: "states",
    temp: 100,
    tempHigh: 153,
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
    stateHigh: ["fragrance", "smoke"],
};

//thanks to the creator of stickyslime.js for this code
elements.syrup.behavior = [
    "XX|ST|XX",
    "ST AND M2|XX|ST AND M2",
    "XX|ST AND M1|XX",
];

elements.briochify = {
    color: ["#c2770e", "#ff0000", "#00ff00", "#0000ff", "#ffdec4"],
    tool: function(pixel) {
        if (pixel.element == "bread") {
            pixel.element = "brioche"
        }
	if (pixel.element == "flour") {
            pixel.element = "fancy_flour"
        }
	if (pixel.element == "dough") {
            pixel.element = "fancy_dough"
        }
	if (pixel.element == "steam") {
            pixel.element = "brioche_steam"
        }
	if (pixel.element == "kai_cenat") {
            pixel.element = "brioche"
        }
    },
    category: "tools",
};

elements.pyrane = {
    color: "#fc7c19",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    temp: 50,
	desc: "this is a ripoff of nitrogen gas",
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
    category: "powders",
    state: "solid",
    temp: 20,
    conduct: 1,
	desc: "not to be confused with iron pyrite or anything like that",
    reactions: {
        "iron": { elem1:"pyric_nitrite", elem2:"pyric_rust" },
		"oil": { elem1: null, elem2:"nitrol_fuel" },
		"electric": { elem1:["fire", "nitrogen", "stench", "electric", "explosion"], elem2:"fire" },
		"shock": { elem1:["fire", "nitrogen", "stench", "electric", "explosion"], elem2:"fire" },
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
    color: "#ffffff",
    behavior: behaviors.MOLTEN,
    category: "states",
    temp: 137,
    tempLow: -20,
    stateLow: ["fyrium"],
    reactions: {
        "water": { elem1:"fire", elem2:"water" }
    }
};

elements.nitrol_fuel = {
    color: "#4f180e",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    temp: 20,
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
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    temp: 20,
    tempHigh: 100,
    density: 12,
	conduct: 1,
	desc: "this is NOT water",
    stateHigh: ["pyrane", "steam"],
    reactions: {
        "fire": { elem1: "hydroid", elem2:"explosion" },
		"body": { elem1: "hydroid", elem2:"fyrium" },
        "head": { elem1: "hydroid", elem2:"pyrane" },
        "water": { elem1: "hydroid", elem2:"hydroid" },
        "syrup": { elem1: "hydroid", elem2:"hydroid" },
		"magma": { elem1: "hydroid", elem2:"hydroid" },
		"oil": { elem1: "hydroid", elem2:"hydroid" },
        "juice": { elem1: "hydroid", elem2:"hydroid" },
        "syrup": { elem1: "hydroid", elem2:"hydroid" },
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

//ok this is the skibididdy mod part

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

elements.freakium = {
    color: "#ff4fed",
    behavior: behaviors.DGAS,
    category: "gases",
    state: "gas",
    density: 720,
    temp: 80,
    tempLow: 30,
        reactions: {
        "head": { elem1:"baby_oil", elem2:"meat" },
        "body": { elem1:"baby_oil", elem2:"meat" },
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

elements.tocopheryl_acetate = {
    color: "#cffdff",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 999999,
    state: "liquid",
    density: 720,
    temp: 30,
    tempHigh: 96,
    stateHigh: ["tocopheryl_gas"],
        reactions: {
        "oil": { elem1:"baby_oil", elem2:"baby_oil" },
    }
};

elements.diddium = {
    color: ["#210742", "#9e20d4"],
    behavior: behaviors.STURDYPOWDER,
    category: "powders",
    temp: 30,
    tempHigh: 80,
    tempLow: 10,
        reactions: {
        "diddium": { elem1:"diddium", elem2:"stable_diddium" },
    }
};

elements.stable_diddium = {
    color: ["#210742", "#9e20d4"],
    behavior: behaviors.WALL,
    category: "states",
    temp: 30,
    tempHigh: 80,
    tempLow: 10,
        reactions: {
        "diddium": { elem1:"freakium", elem2:"diddium" },
        "stable_diddium": { elem1:"diddium", elem2:"baby_oil" },
    }
};

elements.baby_oil = {
    color: "#ffeecc",
    behavior: behaviors.LIQUID,
    category: "liquids",
    temp: 30,
    tempHigh: 96,
    stateHigh: ["tocopheryl_gas"],
        reactions: {
        "uranium": { elem1: null, elem2:"diddium" },
        "diddium": { elem1:"stable_diddium", elem2:"freakium" },
    }
};

elements.stupidine = {
    color: "#4e4b75",
    behavior: behaviors.STURDYPOWDER,
    category: "solids",
    state: "solid",
    temp: 20,
    tempHigh: 137,
    stateHigh: "liquid_stupidine",
    tempLow: -31,
    stateLow: "activated_stupidine",
        reactions: {
        "stupidine": { elem1: "stupidine", elem2:"fragrance" },
    }
};

elements.liquid_stupidine = {
    color: ["#5328c9", "4089e3"],
    behavior: behaviors.AGLIQUID,
    category: "liquids",
    state: "liquid",
    temp: 140,
    tempHigh: 500,
    stateHigh: "stupidine_gas",
    tempLow: 25,
    stateLow: "skibidine",
        reactions: {
        "liquid_stupidine": { elem1:"liquid_stupidine", elem2:"slime" },
    }
};

elements.stupidine_gas = {
    color: "#802d3a",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    temp: 500,
    tempHigh: 1000,
    stateHigh: ["nuke", "explosion"],
    tempLow: 200,
    stateLow: "liquid_stupidine",
        reactions: {
        "stupidine_gas": { elem1:"stupidine_gas", elem2:"stench" },
    }
};

elements.activated_stupidine = {
    color: "#3d2f61",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    temp: 20,
        reactions: {
        "stupidine": { elem1:"explosion", elem2:"explosion" },
    }
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
        "head": { elem1: "skibidiness", elem2:"head" },
    }
};

elements.skibidine = {
    color: ["#51649c", "949c51"],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
        reactions: {
        "carbon_dioxide": { elem1:"skibidi_soda", elem2:"skibidi_soda" },
        "iron": { elem1: "magma", elem2:"stupidine" },
    }
};


elements.skibidiness = {
    color: "#567de8",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    temp: 20,
        reactions: {
        "water": { elem1:"skibidiness", elem2:"skibidi_soda"},
    }
};

//idk how these work and most of them don't idk why but this is just a beta so...

elements.melted_butter.reactions.bread = { "elem1": null, "elem2":"brioche" },
elements.water.reactions.fancy_flour = { "elem1": null, "elem2":"fancy_dough" },
elements.wood.reactions.nitrol_fuel = { "elem1":"fueled_wood", "elem2": null },
	
elements.brioche.breakInto = "fancy_flour";
elements.fyrium.breakInto = "fire";

elements.fire.reactions.nitrogen = { "elem1": null, "elem2": "pyrane" },
elements.ash.reactions.pyrane = { "elem1":"pyric_nitrite", "elem2": null },
elements.oil.reactions.pyric_nitrite = { "elem1":"nitrol_fuel", "elem2": null },
elements.hydrogen.reactions.pyrane = { "elem1":"hydroid", "elem2": null },
elements.fire.reactions.fueled_wood = { "elem1": "fire", "elem2": ["rocket", "pyrane", "nitrol_fuel", "explosion", "stench"] };
elements.water.reactions.molten_fyrium = { "elem1": null, "elem2":["fire", "explosion"] },

elements.brioche.breakInto = "fancy_flour";
elements.fyrium.breakInto = "fire";
