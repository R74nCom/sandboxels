elements.dusty_water = {
    color: "#7C7C95",
    behavior: behaviors.LIQUID,
    tempHigh: 105,
    stateHigh: ["steam","dust_cloud"],
    tempLow: 0,
    stateLowName: "dusty_ice",
    viscosity: 10,
    reactions: {
        "rock": { elem2: "wet_sand", chance: 0.0004 },
		"exoplanetary_rock": { elem2: "exoplanetary_sand", chance: 0.0004 },
        "limestone": { elem2: "wet_sand", chance: 0.0004 },
        "plant": { elem1:"water", chance:0.05 },
        "algae": { elem1:"water", chance:0.05 },
        "kelp": { elem1:"water", chance:0.05 },
        "charcoal": { elem1:"water", chance:0.02 },
        "gravel": { elem1:"water", chance:0.01 },
        "fly": { elem2:"dead_bug", chance:0.1, oneway:true },
        "firefly": { elem2:"dead_bug", chance:0.1, oneway:true },
        "bee": { elem2:"dead_bug", chance:0.05, oneway:true },
        "stink_bug": { elem2:"dead_bug", chance:0.1, oneway:true },
    },
    hidden: true,
    state: "liquid",
    density: 1005,
    conduct: 0.01,
    extinguish: true,
    category: "exoplanet",
}

elements.exoplanetary_sand = {
    color: ["#A29C7D","#c0c0c0","#808080","#4f4f4f","#808080","#949494","#A29C7D"],
    behavior: behaviors.POWDER,
    reactions: {
        "tornado":{elem1:"sandstorm", oneway:true},
    },
    tempHigh: 1700,
    stateHigh: "molten_exoplanetary_glass",
    category: "exoplanet",
    state: "solid",
    density: 1602
}

elements.exoplanetary_glass = {
    color: ["#6F807F","#6F807F","#748F8D","#6F807F","#6F807F"],
    colorPattern: textures.GLASS,
    colorKey: {
        "g": "#6F807F",
        "s": "#728886",
        "S": "#748F8D"},
    behavior: behaviors.WALL,
    reactions: {
        "radiation": { elem1:"rad_glass", chance:0.33 },
        "rad_steam": { elem1:"rad_glass", elem2:null, chance:0.33 },
        "fallout": { elem1:"rad_glass", elem2:"radiation", chance:0.1 }
    },
    tempHigh: 1500,
    category: "exoplanet",
    state: "solid",
    density: 2500,
    breakInto: "exoplanetary_sand",
    noMix: true,
    hidden: true,
}

elements.molten_exoplanetary_glass = {
    reactions: {
        "radiation": { elem1:"molten_rad_glass", chance:0.66 },
        "rad_steam": { elem1:"molten_rad_glass", elem2:null, chance:0.33 },
        "molten_uranium": { elem1:"molten_rad_glass", elem2:null },
        "fallout": { elem1:"molten_rad_glass", elem2:"radiation" }
    },
    hidden: true,
    category: "exoplanet",
}

elements.dust_cloud = {
    color: ["#808080","#2e2e2e","#2e2e2e"],
    behavior: [
        "XX|M1%0.5|M2%0.5",
        "XX|CH:exoplanetary_dust%0.075|M1%2.5 AND BO",
        "XX|M1%0.5|M2%0.5",
    ],
    reactions: {
        "fireball": { elem1:null, elem2:"fire_cloud", chance:0.25 }
    },
    category: "exoplanet",
    tempHigh: 825,
    stateHigh: ["exoplanetary_rock","exoplanetary_rock","fire",],
    hidden: true,
    state: "gas",
    density: 0.7,
    ignoreAir: true
}

elements.exoplanetary_dust = {
    color: "#808080",
    behavior: [
		"XX|XX|XX",
		"XX|XX|XX",
		"M2|M1|M2",
	],
	reactions: {
		"water": { elem2: "dusty_water", elem1: null },
    },
    category: "exoplanet",
	breakInto: ["exoplanetary_dust","exoplanetary_dust","exoplanetary_dust","dust_cloud"],
    burn: 10,
    burnTime: 1,
    tempHigh: 700,
	burnInto:"exoplanetary_rock",
    stateHigh: "exoplanetary_rock",
    state: "solid",
    density: 1490
}

elements.exoplanetary_rock = {
    color: ["#c0c0c0","#4f4f4f","#949494"],
    behavior: behaviors.POWDER,
    reactions: {
        "fly": { elem2:"dead_bug", chance:0.25, oneway:true },
        "firefly": { elem2:"dead_bug", chance:0.2, oneway:true },
        "stink_bug": { elem2:"dead_bug", chance:0.15, oneway:true },
        "bee": { elem2:"dead_bug", chance:0.1, oneway:true },
        "bird": { elem2:"feather", chance:0.025, oneway:true },
        "egg": { elem2:"yolk", oneway:true },
        "grass": { elem2:null, chance:0.005, oneway:true },
        "bone": { elem2:"oil", tempMin:300, chance:0.005, oneway:true },
        "dead_plant": { elem2:"charcoal", tempMin:200, chance:0.005, oneway:true },
        "charcoal": { elem2:"diamond", tempMin:800, tempMax:900, chance:0.005, oneway:true },
        "sand": { elem2:"packed_sand", tempMin:500, chance:0.005, oneway:true },
        "wet_sand": { elem2:"packed_sand", chance:0.005, oneway:true },
    },
    tempHigh: 950,
    stateHigh: "exoplanetary_magma",
    category: "exoplanet",
    state: "solid",
    density: 2550,
    hardness: 0.5,
    breakInto: ["exoplanetary_sand","exoplanetary_sand","exoplanetary_dust","dust_cloud"]
}

elements.exoplanetary_magma = {
    color: ["#ff6f00","#ff8c00","#ff4d00"],
    behavior: behaviors.MOLTEN,
    reactions: {
        "ice": { elem1: "basalt" },
        "ash": { elem1: "molten_tuff", "elem2":null },
        "molten_ash": { elem1: "molten_tuff", "elem2":null },
        "charcoal": { elem2:"diamond", tempMin:800, tempMax:900, chance:0.005, oneway:true },
    },
    temp: 1200,
    tempLow: 800,
    stateLow: ["basalt","exoplanetary_rock","exoplanetary_rock","exoplanetary_rock"],
    viscosity: 10000,
    state: "liquid",
    density: 2725,
    alias: "alien lava",
    category: "exoplanet",
    hidden: true,
}

elements.exoplanetary_rock = {
    color: ["#c0c0c0","#4f4f4f","#949494"],
    behavior: behaviors.POWDER,
    reactions: {
        "fly": { elem2:"dead_bug", chance:0.25, oneway:true },
        "firefly": { elem2:"dead_bug", chance:0.2, oneway:true },
        "stink_bug": { elem2:"dead_bug", chance:0.15, oneway:true },
        "bee": { elem2:"dead_bug", chance:0.1, oneway:true },
        "bird": { elem2:"feather", chance:0.025, oneway:true },
        "egg": { elem2:"yolk", oneway:true },
        "grass": { elem2:null, chance:0.005, oneway:true },
        "bone": { elem2:"oil", tempMin:300, chance:0.005, oneway:true },
        "dead_plant": { elem2:"charcoal", tempMin:200, chance:0.005, oneway:true },
        "charcoal": { elem2:"diamond", tempMin:800, tempMax:900, chance:0.005, oneway:true },
        "sand": { elem2:"packed_sand", tempMin:500, chance:0.005, oneway:true },
        "wet_sand": { elem2:"packed_sand", chance:0.005, oneway:true },
    },
    tempHigh: 950,
    stateHigh: "exoplanetary_magma",
    category: "exoplanet",
    state: "solid",
    density: 2550,
    hardness: 0.5,
    breakInto: ["exoplanetary_sand","exoplanetary_sand","exoplanetary_dust","dust_cloud"]
}

worldgentypes.exoplanet = {
	layers: [
		[0.9, "exoplanetary_dust"],
		[0.1, "exoplanetary_sand", 0.15],
		[0.2, "dusty_ice", 0.075],
		[0.05, "exoplanetary_rock"],
		[0, "basalt"],
	],
	decor: [
		["exoplanetary_dust", 0.05],
		["dust_cloud", 0.25]
	],
	baseHeight: 0.5,
	temperature: -15
}

worldgentypes.exo_ocean = {
	layers: [
		[0.99, "exoplanetary_dust"],
		[0.40, "dusty_ice"],
		[0.25, "bone", 0.01],
		[0.25, "dusty_ice"],
		[0.1, "exoplanetary_sand"],
		[0.03, "exoplanetary_rock", 0.5],
		[0.03, "exoplanetary_rock"],
		[0, "basalt"],
	],
	decor: [
		["dust_cloud", 0.1, 10],
	],
	temperature: -15
}