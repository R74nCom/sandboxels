runAfterLoad(function() {
    console.log("Thanks for using bojithekings_mod.js! This is 1.0v")
})

elements.ultronium = {
    color: ["#3a293a", "#77337c"],
    behavior: [
        "XX|CR:radiation%20 AND CR:neutron%10|XX",
        "CR:radiation%20 AND CR:neutron%10|XX|CR:radiation%20 AND CR:neutron%10",
        "XX|CR:radiation%20 AND CR:neutron%10|XX"
    ],
    state: "solid",
    reactions: {
        "neutron": {elem1: "n_explosion", elem2: null, chance: 0.01, tempMin: 600 }
    },
    temp: 500,
    tempHigh: 10000,
    stateHigh: "ultronium_gas",
    renderer: renderPresets.HEATGLOW,
    tick: function(pixel) {
        if (Math.random()<0.01 && pixel.temp < 500) {
            changePixel(pixel, "stable_ultronium")
        }
    },
    category: "solids",
    density: 25000, //in kg/m³
    hardness: 0.80

}

elements.ultronium_gas = {
    color: ["#b45bb4", "#722478"],
    behavior: [
        "M2|CR:radiation%20 AND CR:neutron%10 AND M1|M2",
        "CR:radiation%20 AND CR:neutron%10 AND M1|XX|CR:radiation%20 AND CR:neutron%10 AND M1",
        "M2|CR:radiation%20 AND CR:neutron%10 AND M1|M2"
    ],
    state: "gas",
    reactions: {
        "neutron": {elem1: "n_explosion", elem2: null, chance: 0.05}
    },
    temp: 12500,
    tempLow: 9000,
    stateLow: "ultronium",
    category: "gases",
    density: 12000

}

elements.stable_ultronium = {
    color: ["#362236", "#492a4c"],
    behavior: [
        "XX|CR:radiation%10|XX",
        "CR:radiation%10|XX|CR:radiation%10",
        "XX|CR:radiation%10|XX"
    ],
    state: "solid",
    tempHigh: 1200,
    stateHigh: "ultronium",
    reactions: {
        "neutron": {elem1: "depleted_ultronium", elem2: null, chance: 0.05, tempMin: 400}
    },
    category: "solids",
    density: 22550, //in kg/m³,
    hardness: 0.80

}

elements.depleted_ultronium = {
    color: ["#464646", "#b1a4b5"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX"
    ],
    state: "solid",
    tempHigh: 4000,
    renderer: renderPresets.HEATGLOW,
    stateHigh: "depleted_gas_ultronium",
    category: "solids",
    density: 22300, //in kg/m³
    hardness: 0.80
}

elements.depleted_gas_ultronium = {
    color: ["#3a293a", "#837c84"],
    behavior: behaviors.GAS,
    state: "gas",
    tempLow: 3990,
    stateLow: "depleted_ultronium",
    temp: 4250,
    category: "gases",
    density: 13000
}

elements.supernova.hidden = false
elements.supernova.category = "energy"
elements.n_explosion.hidden = false
elements.n_explosion.category = "energy"

elements.steam.reactions["oxygen"] = {elem1: "humid_air", elem2: null}

elements.humid_air = {
    color: "#9cb8c9",
    behavior: behaviors.GAS,
    state: "gas",
    temp: 40,
    tempLow: 20,
    stateLow: ["water", "oxygen"],
    category: "gases",
    density: 1.4
}


elements.heat_to_infinity = {
    color: "#000000",
    tool: function(pixel) {
        pixel.temp += 1e309
    },
    category: "tools"
}

elements.super_heat = {
    color: "#9c1717",
    tool: function(pixel) {
        pixel.temp += 100000
    },
    category: "tools"
}
elements.super_cool = {
    color: "#9c1717",
    tool: function(pixel) {
        pixel.temp -= 100000
    },
    category: "tools"
}

elements.diamond.tempHigh = 3550
elements.diamond.stateHigh = "carbon_dioxide"

elements.sulfur_gas.reactions["oxygen"] = {elem1: "sulfur_dioxide", elem2: null}

elements.sulfur_dioxide = {
    color: ["#cfd5d8","#d5dbde","#c9d0d3"],
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 2.6,
    stateLow: "liquid_sulfur_dioxide",
    tempLow: -10,
}

elements.liquid_sulfur_dioxide = {
    color: ["#bfc7cb","#b9c2c7"],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1.4,
    stateHigh: "sulfur_dioxide",
    tempHigh: -10
}

elements.magma.tempHigh = 2500
elements.magma.stateHigh = ["sulfur_dioxide", "carbon_dioxide"]

elements.molten_glass.tempHigh = 2500
elements.molten_glass.stateHigh = ["silicon_gas", "oxygen"]

elements.molten_dirt.tempHigh = 2500
elements.molten_dirt.stateHigh = ["silicon_gas", "carbon_dioxide"]

elements.molten_salt.tempHigh = 2500
elements.molten_salt.stateHigh = ["sodium_gas", "chlorine"]

elements.silicon_gas = {
    color: "#c0c0c0",
    behavior: behaviors.GAS,
    state: "gas",
    category: "gases",
    density: 0.5,
    temp: 1500
}

elements.firebal = {
    color: "#fff200",
    behavior: [
        "XX|XX|XX",
        "XX|EX:30>plasma|XX",
        "XX|XX|XX"
    ],
    state: "gas",
    temp: 100000
}

elements.chromium = {
    color: ["#beebf0", "#87c0cc"],
    behavior: behaviors.SOLID,
    category: "solids",
    state: "solid",
    density: 7140,
    conduct: 0.6,
    hardness: 0.85,
    tempHigh: 1907,
    stateHigh: "molten_chromium"
}

elements.molten_chromium = {
    color: ["#ffd500", "#ffae00", "#ff0000"],
    behavior: behaviors.MOLTEN,
    hidden: true,
    state: "liquid",
    density: 6500,
    tempLow: 1907,
    stateLow: "chromium",
    viscosity: 100,
    reactions: {
        "molten_steel": {elem1: "molten_stainless_steel", elem2: null}
    }
}

elements.stainless_steel = {
    color: "#c0c0c0",
	colorKey: {
		"L":"#bababa",
		"B":"#6c6c6c"
	},
	colorPattern: [
		"BBLB",
		"BBBL",
		"BLBB",
		"LBBB"
	],
    behavior: behaviors.SOLID,
    category: "solids",
    state: "solid",
    density: 8000,
    conduct: 0.42,
    hardness: 0.85,
    tempHigh: 1450, 
    stateHigh: "molten_stainless_steel",
    breakInto: "stainless_steel_dust",
}

elements.molten_stainless_steel = {
    color: ["#fff942", "#f49e1d", "#ff4400"],
    behavior: behaviors.MOLTEN,
    hidden: true,
    state: "liquid",
    density: 8000,
    tempLow: 1450,
    stateLow: "stainless_steel",
    viscosity: 120,
    conduct: 1,
}

elements.infinite_burn = {
    color: "#a16868",
    behavior: behaviors.WALL,
    state: "solid",
    burn: 100,
    burnTime: 1e9, //more then one irl year
    fireColor: "#eaff00"
}


elements.h_bomb.behavior = [
    "XX|XX|XX",
	"XX|XX|XX",
	"M2|M1 AND EX:90>plasma,plasma,plasma,plasma,fire,neutron,helium|M2",
]

elements.hydrogen.reactions["hydrogen"] = {
    elem1: "h_explosion" , elem2: null, tempMin: 70000
}

elements.h_explosion = {
    color: "#aeff00",
    state: "gas",
    behavior: [
        "XX|XX|XX",
        "XX|EX:90>plasma,plasma,plasma,plasma,fire,neutron,helium|XX",
        "XX|XX|XX"
    ],
    alias: "thermonuclear explosion",
    category: "fusion_explsosion"
}

elements.short_super_heater = {
    color: "#c14a4a",
    behavior: [
        "XX|HT:5000|XX",
        "HT:5000|DL%10|HT:5000",
        "XX|HT:5000|XX"
    ]
}


elements.cluster_bomb = {
    color: "#9b9b9b",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:10>bomb|M2",
    ],
    category: "weapons"
}

elements.cluster_bomb_squared = {
    color: "#6f6f6f",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:25>cluster_bomb|M2",
    ],
    category: "weapons"
}

elements.cluster_bomb_cubed = {
    color: "#737373",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:50>cluster_bomb_squared|M2",
    ],
    category: "weapons"
}

elements.cluster_bomb_fourth = {
    color: "#525252",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:100>cluster_bomb_cubed|M2",
    ],
    category: "weapons"
}

elements.cluster_bomb_final = {
    color: "#525252",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:250>cluster_bomb_fourth|M2",
    ],
    category: "weapons"
}

elements.compress_to_a_star = {
    color: "#e5ff00",
    tool: function(pixel) {
        if (pixel.element=="hydrogen" && pixel.temp >= 10000) {
            changePixel(pixel, "sun")
        }
    },
    category: "tools"
}

elements.brown_dwarf = {
    color: "#502606",
    state: "gas",
    behavior: behaviors.WALL,   
    temp: 2226,
    tempHigh: 2726,
    stateHigh: "sun",
    tempLow: -23,
    stateLow: "hydrogen",
    category: "special"
}

elements.sun.tempLow = 2225
elements.sun.stateLow = "brown_dwarf"

//to make it more realistic and hoping it doesn't ruin gameplay
elements.plasma.behavior = behaviors.GAS
elements.plasma.temp = 12500

// ISOTOPES category is gonna come next in 1.1v
