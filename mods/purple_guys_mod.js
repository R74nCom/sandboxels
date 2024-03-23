elements.super_bomb = {
    color: "#551c41",
    behavior: [
        "XX|EX:125|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:125|M2",
    ],
    category: "Purple Guy's Mod", 
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.mega_bomb = { 
    color: "#736e7e", 
    behavior: [
        "XX|EX:350|XX", 
        "XX|XX|XX",
        "M2|M1 AND EX:350|M2",
    ],
    category: "Purple Guy's Mod", 
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.ultra_bomb = { 
    color: "#79910a", 
    behavior: [
        "XX|EX:500>plasma2|XX", 
        "XX|XX|XX",
        "M2|M1 AND EX:500>plasma2|M2",
    ],
    category: "Purple Guy's Mod", 
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.bomb_of_despair = { 
    color: ["#000000", "#ff0000"], 
    behavior: [
        "XX|EX:501>plasma3|XX", 
        "XX|XX|XX",
        "M2|M1 AND EX:501>plasma3|M2",
    ],
    category: "Purple Guy's Mod", 
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.galaxy_level_bomb = { 
    color: ["#dfadff", "#699ddb", "#4f76a6", "#8a6b9d", "#94a7bd", "#a47fbb"], 
    behavior: [
        "XX|EX:600>plasma4|XX", 
        "XX|XX|XX",
        "M2|M1 AND EX:600>plasma4|M2",
    ],
    category: "Purple Guy's Mod", 
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.RDX = {
    color: "#c92a2a",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "XX|EX:15|XX",
        "XX|XX|XX",
    ],
    conduct: 1,
    category: "Purple Guy's Mod",
    burn: 100,
    burnTime: 1,
    burnInto: "explosion",
    tempHigh: 600,
    stateHigh: "explosion",
    state: "solid",
    density: 1630,
    excludeRandom: true,
    alias: "Cyclotrimethylenetrinitramine"
},

elements.ice_cream_bomb = { 
    color: "#ffffff", 
    behavior: [
        "XX|EX:20>ice_cream|XX", 
        "XX|XX|XX",
        "M2|M1 AND EX:20>ice_cream|M2",
    ],
    category: "Purple Guy's Mod", 
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}


elements.dirty_sand = { 
    color: ["#a35222", "#a15122", "#7e3f1a", "#f4ba9a", "#fed3ba", "#f2b796"],
    behavior: behaviors.POWDER,
    category: "Purple Guy's Mod", 
    state: "solid",
    density: 2822
}

elements.wet_dirty_sand = { 
    color: ["#a35210", "#a15110", "#7e3f0a", "#f4ba8a", "#fed2ba", "#f2b784"],
    behavior: behaviors.POWDER,
    category: "Purple Guy's Mod", 
    state: "liquid",
    density: 2822
}

elements.rocky_dirty_sand = { 
    color: ["#a35222", "#a15122", "#7e3f1a", "#f4ba9a", "#fed3ba", "#f2b796", "#939393", "#c4c4c4", "#777777"],
    behavior: behaviors.POWDER,
    category: "Purple Guy's Mod", 
    state: "solid",
    density: 4502
}

elements.wet_rocky_dirty_sand = { 
    color: ["#a35222", "#a15122", "#7e3f1a", "#f4ba9a", "#fed3ba", "#f2b796", "#939393", "#c4c4c4", "#777777"],
    behavior: behaviors.POWDER,
    category: "Purple Guy's Mod", 
    state: "liquid",
    density: 4502
}

elements.reverse_gravity_liquid = { 
    color: "#cdd7e2",
    behavior: behaviors.AGLIQUID	,
    category: "Purple Guy's Mod", 
    state: "liquid",
    density: 50
}

elements.reverse_soda = { 
    color: ["#5f2706", "#48230d", "#52250a"],
    behavior: behaviors.AGLIQUID	,  behavior: [
        "M2|M1|M2",
        "M2|XX|M2",
        "XX|CR:foam%3|XX",
    ],

    category: "Purple Guy's Mod", 
    state: "liquid",
    density: 1030
}

elements.really_really_fizzy_soda = { 
    color: ["#5f2706", "#48230d", "#52250a"],
    behavior: behaviors.LIQUID	,  behavior: [
        "XX|CR:foam%500|XX",
        "M2|M1|M2",
        "M2|XX|M2"
    ],

    category: "Purple Guy's Mod", 
    state: "liquid",
    density: 1030
}

elements.orange_soda = { 
    color: ["#ff8f49", "#ff721b", "#e06519"],
    behavior: behaviors.LIQUID	,  behavior: [
        "XX|CR:foam%2.5|XX",
        "M2|M1|M2",
        "M2|XX|M2"
    ],

    category: "Purple Guy's Mod", 
    state: "liquid",
    density: 1030
}

elements.gasoline = {
    color: ["#734216", "#964600", "#735032"],
    behavior: behaviors.LIQUID,
    tick: function(pixel) {
        if (!pixel.burning && pixel.temp > 90 && Math.random() < 0.001) {
            if (pixel.temp < 150) { changePixel(pixel,"propane") }
            else if (pixel.temp < 300) { changePixel(pixel,"molten_plastic") }
            else { changePixel(pixel,"lamp_oil") }
        }
    },
    reactions: {
        "dirt": { elem1:null, elem2:"mud" },
        "sand": { elem1:null, elem2:"wet_sand" },
        "sulfur": { elem1:null, elem2:"greek_fire" },
        "molten_sulfur": { elem1:"greek_fire", elem2:"greek_fire" },
    },
    category: "Purple Guy's Mod",
    tempHigh: 280,
    stateHigh: "fire",
    burn: 70,
    burnTime: 300,
    burnInto: ["carbon_dioxide","fire"],
    viscosity: 250,
    state: "liquid",
    density: 720,
    stain: 0.05,
    alias: "Oil/Petrolium"
},

elements.dark_soda = { 
    color: "#56589f",
    behavior: behaviors.LIQUID	,  behavior: [
        "XX|CR:foam%20|XX",
        "M2|M1|M2",
        "M2|XX|M2"
    ],

    category: "Purple Guy's Mod", 
    state: "liquid",
    density: 1030
}

elements.sb_soda = { 
    color: ["#000000", "#ffff00", "#3a3a3a", "#ff0000"],
    behavior: behaviors.LIQUID	,  behavior: [
        "XX|CR:foam%0.56|XX",
        "M2|M1|M2",
        "M2|XX|M2"
    ],

    category: "Purple Guy's Mod", 
    state: "liquid",
    density: 1030
}


elements.negatively_dense_liquid = { 
    color: "#94ffd1",
    behavior: behaviors.LIQUID	,
    category: "Purple Guy's Mod", 
    state: "liquid",
    density: -2000
}

elements.plasma2 = { 
    color: "#caf7ff",
    behavior: behaviors.DGAS	,
    category: "Purple Guy's Mod", 
    state: "gas",
    density: 50000,
    temp:500000
}

elements.plasma3 = { 
    color: "#9dc6e3",
    behavior: behaviors.DGAS	,
    category: "Purple Guy's Mod", 
    state: "gas",
    density: 50010,
    temp:200000000
}

elements.plasma4 = { 
    color: "#9de4e3",
    behavior: behaviors.DGAS	,
    category: "Purple Guy's Mod", 
    state: "gas",
    density: 50050,
    temp:50000000000
}

elements.negative_fire = { 
    color: ["#a6bfc4", "#6bd2e4", "#b8dee4", "#32cae4"],
    behavior: behaviors.DGAS	,
    category: "Purple Guy's Mod", 
    state: "gas",
    density: -0.1,
    temp:-20000
}

elements.coldest_bomb = { 
    color: "#fffff0", 
    behavior: [
        "XX|EX:55>negative_fire|XX", 
        "XX|XX|XX",
        "M2|M1 AND EX:55>negative_fire|M2",
    ],
    category: "Purple Guy's Mod", 
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.reinforced_wall = { 
    color: "#ffff01", 
    behavior: behaviors.WALL,
    category: "Purple Guy's Mod", 
    state: "solid",
    density: 1300,
    hardness:10^81
}

elements.unreinforced_wall = { 
    color: "#ffff82", 
    behavior: behaviors.WALL,
    category: "Purple Guy's Mod", 
    state: "solid",
    density: 1300,
    hardness:0
}

elements.reinforced_liquid_wall = { 
    color: "#ffff01", 
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Mod", 
    state: "liquid",
    density: 1300,
    hardness:10^81
}

elements.how_did_we_get_here = { 
    color: "#ffffff", 
    behavior: [behaviors.LIQUID, behaviors.AGLIQUID],
    category: "Purple Guy's Mod", 
    state: "liquid",
    density: 1300,
    hardness:10^83
}

elements.gullibullium = { 
    color: ["#70bc7a", "#70bb79", "#7cac81"],
    behavior: behaviors.WALL,
    category: "Purple Guy's Mod", 
    state: "solid",
    density: 1300,
    hardness:0.8,
    tempHigh: 12500

}

elements.reinforced_gullibullium = { 
    color: ["#f0bc7a", "#f0bb79", "#fcac81"],
    behavior: behaviors.WALL,
    category: "Purple Guy's Mod", 
    state: "solid",
    density: 1300,
    hardness:0.95
}

elements.boba_pearls = { 
    color: "#3b0a57",
    behavior: behaviors.POWDER,
    category: "Purple Guy's Boba", 
    state: "solid",
    density: 54678900,
    hardness:0.95
}

elements.vanilla_boba = { 
    color: "#fff0dd",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.mango_boba = { 
    color: "#ffc77d",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.matcha_boba = { 
    color: "#58d168",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.banana_boba = { 
    color: "#ffe1a1",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.satans_boba = { 
    color: "#852d2d",
    behavior: behaviors.MOLTEN,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.peach_boba = { 
    color: "#ffbe73",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.strawberry_boba = { 
    color: "#e27c7c",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.mint_boba = { 
    color: "#8cff9b",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.mint_vanilla_boba = { 
    color: "#c8ffcf",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.classic_boba = { 
    color: "#ffffff",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.taro_boba = { 
    color: "#f1c8ff",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.thai_tea_boba = { 
    color: "#ffc98c",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.jasmine_green_tea_boba = { 
    color: "#d8ffc7",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.honeydew_boba = { 
    color: "#9eff98",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.rose_boba = { 
    color: "#ffe6e6",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.lavender_boba = { 
    color: "#efbfff",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.lychee_boba = { 
    color: "#fff1bf",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.passion_fruit_boba = { 
    color: "#ffb942",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.pineapple_boba = { 
    color: "#ffe742",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.blueberry_boba = { 
    color: "#272a98",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.raspberry_boba = { 
    color: "#ff3333",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.coconut_boba = { 
    color: "#f1f1f1",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.almond_boba = { 
    color: "#e4daa9",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.hazelnut_boba = { 
    color: "#fbf4d4",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.caramel_boba = { 
    color: "#e4ab32",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.chocolate_boba = { 
    color: "#6f4b00",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.coffee_boba = { 
    color: "#866625",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.guava_boba = { 
    color: "#ff390a",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.kiwi_boba = { 
    color: "#09de0f",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.papaya_boba = { 
    color: "#c4ce37",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.black_sesame_boba = { 
    color: "#6e89a9",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.pandan_boba = { 
    color: "#33d460",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.wasters_personal_boba = { 
    color: ["#5ee082", "#4eb96c", "#5bda7f", "#79c38e", "#e9eeea"],
    behavior: behaviors.LIQUID , behavior: [
        "XX|CR:radiation%4|XX",
        "M2|M1|M2",
        "M2|XX|M2"
    ],
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1500,
    hardness:0.25
}

elements.when_yous_personal_boba = { 
    color: ["#5ee082", "#4eb96c", "#5bda7f", "#79c38e", "#00d03a"],
    behavior: behaviors.LIQUID , behavior: [
        "XX|CR:radiation%12|XX",
        "M2|M1|M2",
        "M2|XX|M2"
    ],
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 1600,
    hardness:0.25
}

elements.nousernamefounds_gallium_boba = { 
    color: ["#b1b1b1", "#bfbfbf", "#9e9e9e"],
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 5100,
    hardness:0.25
}

elements.bartender_twix_hartwell_whites_bday_cake_boba = { 
    color: "#e6dbe4",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 2000,
    hardness:0.25
}

elements.sb_boba = { 
    color: ["#000000", "#ffff00", "#3a3a3a", "#ff0000"],
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 2000,
    hardness:0.25
}

elements.sethies_red_boba = { 
    color: "#ff8282",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 2000,
    hardness:0.25
}

elements.sethies_blue_boba = { 
    color: "#82c0ff",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Boba", 
    state: "liquid",
    density: 2010,
    hardness:0.25
}

elements.when_you_bomb = {
    color: "#ff0000",
    behavior: [
        "XX|EX:40>when_you_particles|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:40>when_you_particles|M2",
    ],
    category: "Purple Guy's Mod", 
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.nuclear_firework =  {
    color: "#62b06c",
    tick: function(pixel) {
        if ((pixel.temp > 1000 || pixel.charge) && !pixel.burning) {
            pixel.burning = true;
            pixel.burnStart = pixelTicks;
        }
        if (pixel.burning) {
            if (!tryMove(pixel, pixel.x, pixel.y-1)) {
                tryMove(pixel, pixel.x+(Math.random() < 0.5 ? -1 : 1), pixel.y-1);
            }
            if (pixelTicks-pixel.burnStart > 50 && Math.random() < 0.1) {
                explodeAt(pixel.x, pixel.y, 10, ["radiation", "fw_ember"]);
            }
        }
        else {
            if (!tryMove(pixel, pixel.x, pixel.y+1)) {
                tryMove(pixel, pixel.x+(Math.random() < 0.5 ? -1 : 1), pixel.y+1);
            }
        }
        doDefaults(pixel);
    },
    burn: 90,
    burnTime: 100,
    density: 2000,
    conduct: 1,
    state: "solid",
    category: "Purple Guy's Mod"
},

elements.whenyouium = { 
    color: ["#ff0000", "#dc0000", "#b60000", "#ec2c2c"],
    behavior: behaviors.WALL,
    category: "Purple Guy's Mod", 
    state: "solid",
    density: 2000,
    hardness:1.01
}

elements.when_you_particles = { 
    color: ["#ff0000", "#dc0000", "#b60000", "#ec2c2c"],
    behavior: behaviors.DGAS,
    category: "Purple Guy's Mod", 
    state: "gas",
    density: 2000,
    hardness:0.98,
    hidden: true,
    temp: 500000000000000
}

elements.wekk = { color: ["#927659","#81644B","#685843","#685135","#644F3A"],
    behavior: behaviors.SUPPORTPOWDER,
    reactions: {
    "fly": { elem2:"dead_bug", chance:0.25, oneway:true },
    "firefly": { elem2:"dead_bug", chance:0.2, oneway:true },
    "stink_bug": { elem2:"dead_bug", chance:0.15, oneway:true },
    "bee": { elem2:"dead_bug", chance:0.1, oneway:true },
    "bird": { elem2:"feather", chance:0.025, oneway:true },
    "egg": { elem2:"yolk", oneway:true },
    "bone": { elem2:"oil", tempMin:300, chance:0.005, oneway:true },
    "dead_plant": { elem2:"charcoal", tempMin:200, chance:0.005, oneway:true },
    "charcoal": { elem2:"diamond", tempMin:800, tempMax:900, chance:0.005, oneway:true },
},
    tempHigh: 540,
    stateHigh: "magma",
    category: "Purple Guy's Mod",
    state: "solid",
    density: 1302.5,
    hardness: 0.2,
    breakInto: "gravel"
}

elements.water_but_it_stays_liquid = {
    color: "#2167ff",
    behavior: behaviors.LIQUID,
    category: "Purple Guy's Mod",
    heatCapacity: 1234213423423423,
    reactions: {
        "dirt": {
            elem1: null,
            elem2: "mud",
        },
        "sand": { elem1: null, elem2: "wet_sand" },
        "clay_soil": { elem1: null, elem2: "clay" },
        "salt": { elem1: "salt_water", elem2: null, temp1:-20 },
        "sugar": { elem1: "sugar_water", elem2: null },
        "honey": { elem1: "sugar_water" },
        "caramel": { elem1: "sugar_water" },
        "molasses": { elem1: "sugar_water" },
        "dust": { elem1: "dirty_water", elem2: null },
        "ash": { elem1: "dirty_water", elem2: null },
        "cyanide": { elem1: "dirty_water", elem2: null },
        "cyanide_gas": { elem1: "dirty_water", elem2: null },
        "carbon_dioxide": { elem1: "seltzer", elem2: null, oneway:true },
        "sulfur": { elem1: "dirty_water", elem2: null },
        "rat": { elem1: "dirty_water", chance:0.005 },
        "plague": { elem1: "dirty_water", elem2: null },
        "rust": { elem1: "dirty_water", chance:0.005 },
        "lead": { elem1: "dirty_water", chance:0.005 },
        "solder": { elem1: "dirty_water", chance:0.005 },
        "fallout": { elem1: "dirty_water", chance:0.25 },
        "radiation": { elem1: "dirty_water", chance:0.25 },
        "uranium": { elem1: "dirty_water", chance:0.25 },
        "rotten_meat": { elem1: "dirty_water", chance:0.25 },
        "rotten_cheese": { elem1: "dirty_water", chance:0.25 },
        "cancer": { elem1: "dirty_water", chance:0.25 },
        "oil": { elem1: "dirty_water", chance:0.005 },
        "dioxin": { elem1: "dirty_water", chance:0.1 },
        "quicklime": { elem1: "slaked_lime", elem2: "slaked_lime", temp2:100, temp1:100, chance:0.05 },
        "rock": { elem2: "wet_sand", chance: 0.00035 },
        "limestone": { elem2: "wet_sand", chance: 0.00035 },
        "tuff": { elem2: "wet_sand", color2:"#7a6b5c", chance: 0.00035 },
        "ruins": { elem2: "rock", chance: 0.00035 },
        "mudstone": { elem2: "mud", chance: 0.00035 },
        "methane": { elem1:"primordial_soup", elem2:"primordial_soup", tempMin:60, charged:true },
        "ammonia": { elem1:"primordial_soup", elem2:"primordial_soup", tempMin:60, charged:true },
        "fly": { elem2:"dead_bug", chance:0.1, oneway:true },
        "firefly": { elem2:"dead_bug", chance:0.1, oneway:true },
        "bee": { elem2:"dead_bug", chance:0.05, oneway:true },
        "stink_bug": { elem2:"dead_bug", chance:0.1, oneway:true },
        "cured_meat": { elem1:"salt_water", elem2:"meat" },
        // electrolysis:
        "aluminum": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0025 },
        "zinc": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.015 },
        "steel": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0125 },
        "iron": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0125 },
        "tin": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.01 },
        "brass": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.001 },
        "bronze": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.001 },
        "copper": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0075 },
        "silver": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0075 },
        "gold": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0075 },
    },
    state: "liquid",
    density: 997,
    conduct: 0.02,
    stain: -0.5,
    extinguish: true
}

elements.blue_uranium = {
    color: ["#4ba5ff","#71a8de","#b4c7da","#3e6892","#6da4da","#9dc1e6"],
    behavior: [
        "XX|CR:radiation%20|XX",
        "CR:radiation%1|CH:lead%0.001|CR:radiation%20",
        "M2|M1|M2",
    ],
    reactions: {
        "neutron": { elem1:"n_explosion", tempMin:500, chance:0.1 }
    },
    tempHigh: 1132.2,
    category: "Purple Guy's Mod",
    state: "solid",
    density: 19100,
    hardness: 0.6,
    conduct: 0.235,
    excludeRandom: true
}




if (!elements.sand.reactions) { elements.sand.reactions = {} }
elements.sand.reactions.dirt = { elem1:"dirty_sand", elem2:"dirty_sand" }

if (!elements.dirty_sand.reactions) { elements.dirty_sand.reactions = {} }
elements.dirty_sand.reactions.water = { elem1:"wet_dirty_sand", elem2:"wet_dirty_sand" }

if (!elements.soda.reactions) { elements.soda.reactions = {} }
elements.soda.reactions.reverse_gravity_liquid = { elem1:"reverse_soda", elem2:"reverse_soda" }

if (!elements.wall.reactions) { elements.wall.reactions = {} }
elements.wall.reactions.plasma2 = { elem1:"plasma2", elem2:"plasma2" }

if (!elements.dirty_sand.reactions) { elements.dirty_sand.reactions = {} }
elements.dirty_sand.reactions.gravel = { elem1:"rocky_dirty_sand", elem2:"rocky_dirty_sand" }

if (!elements.rocky_dirty_sand.reactions) { elements.rocky_dirty_sand.reactions = {} }
elements.rocky_dirty_sand.reactions.water = { elem1:"wet_rocky_dirty_sand", elem2:"wet_rocky_dirty_sand" } 

if (!elements.poison.reactions) { elements.poison.reactions = {} }
elements.poison.reactions.antidote = { elem1:"how_did_we_get_here", elem2:"how_did_we_get_here" } 

if (!elements.molten_steel.reactions) { elements.molten_steel.reactions = {} }
elements.molten_steel.reactions.gullibullium = { elem1:"reinforced_gullibullium", elem2:"reinforced_gullibullium" } 

if (!elements.wall.reactions) { elements.wall.reactions = {} }
elements.wall.reactions.plasma3 = { elem1:"plasma3", elem2:"plasma3" }

if (!elements.wall.reactions) { elements.wall.reactions = {} }
elements.wall.reactions.plasma4 = { elem1:"plasma4", elem2:"plasma4" }

if (!elements.reinforced_wall.reactions) { elements.reinforced_wall.reactions = {} }
elements.reinforced_wall.reactions.plasma3 = { elem1:"plasma3", elem2:"plasma3" }

if (!elements.reinforced_wall.reactions) { elements.reinforced_wall.reactions = {} }
elements.reinforced_wall.reactions.plasma4 = { elem1:"plasma4", elem2:"plasma4" }

if (!elements.whenyouium.reactions) { elements.whenyouium.reactions = {} }
elements.whenyouium.reactions.when_you_particles = { elem1:"when_you_particles", elem2:"when_you_particles" }

// important colors: ["#000000", "#edff00", "#3a3a3a", "#ff0000"], ["#82c0ff", "#ff8282"],