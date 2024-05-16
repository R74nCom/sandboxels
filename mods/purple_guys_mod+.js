elements.better_bomb = {
    color: "#823d30",
    behavior: [
        "XX|EX:20|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:20|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.strong_bomb = {
    color: "#09fd62",
    behavior: [
        "XX|EX:50|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:50|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.bomb2 = {
    color: "#68cdf4",
    behavior: [
        "XX|EX:75|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:75|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.super_bomb = {
    color: "#551c41",
    behavior: [
        "XX|EX:125|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:125|M2",
    ],
    category: "weapons", 
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
    category: "weapons", 
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
    category: "weapons", 
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
    category: "weapons", 
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
    category: "weapons", 
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.reverse_galaxy_level_bomb = { 
    color: ["#dfadff", "#699ddb", "#4f76a6", "#8a6b9d", "#94a7bd", "#a47fbb"], 
    behavior: [
        "M2|M1 AND EX:600>plasma4|M2",
        "XX|XX|XX",
        "XX|EX:600>plasma4|XX",
    ],
    category: "weapons", 
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.ultimate_bomb = { 
    color: "#8d00ff",
    behavior: [
        "XX|EX:750>ultimate_plasma|XX", 
        "XX|XX|XX",
        "M2|M1 AND EX:750>ultimate_plasma|M2",
    ],
    category: "weapons", 
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.rdx = {
    color: "#c92a2a",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "XX|EX:15|XX",
        "XX|XX|XX",
    ],
    conduct: 1,
    category: "weapons",
    burn: 100,
    burnTime: 1,
    burnInto: "explosion",
    tempHigh: 600,
    stateHigh: "explosion",
    state: "solid",
    density: 1630,
    excludeRandom: true,
    alias: "Cyclotrimethylenetrinitramine"
}

elements.ice_cream_bomb = { 
    color: "#ffffff", 
    behavior: [
        "XX|EX:20>ice_cream|XX", 
        "XX|XX|XX",
        "M2|M1 AND EX:20>ice_cream|M2",
    ],
    category: "weapons", 
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.human_bomb = {
    color: ["#f3e7db","#f7ead0","#eadaba","#d7bd96","#a07e56","#825c43","#604134","#3a312a"],
    behavior: [
        "XX|EX:15>human|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:15>human|M2",
    ],
    category: "weapons", 
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown,
    temp: 30
}

elements.alien_bomb = {
    color: ["#41ab1d","#4cbf25","#40752e","#871dab","#ac3ad2","#71278a"],
    behavior: [
        "XX|EX:15>alien|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:15>alien|M2",
    ],
    category: "weapons", 
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown,
    temp: 30
}


elements.dirty_sand = { 
    color: ["#a35222", "#a15122", "#7e3f1a", "#f4ba9a", "#fed3ba", "#f2b796"],
    behavior: behaviors.POWDER,
    category: "land", 
    state: "solid",
    density: 2822,
    reactions: {
        "dust": {elem1:"dusty_dirty_sand", elem2:"dusty_dirty_sand"}
        }
}

elements.sandy_dirt = { 
    color: [ "#f4ba9a", "#fed3ba", "#f2b796", "#a35222", "#a15122", "#7e3f1a"],
    behavior: behaviors.POWDER,
    category: "land", 
    state: "solid",
    density: 2282,
    reactions: {
        "dirty_sand": {elem1:"sandy_dirty_sand", elem2:"sandy_dirty_sand"}
        },
    hidden: true
}

elements.wet_dirty_sand = { 
    color: ["#a35210", "#a15110", "#7e3f0a", "#f4ba8a", "#fed2ba", "#f2b784"],
    behavior: behaviors.POWDER,
    category: "land", 
    state: "liquid",
    density: 2822
}
elements.sandy_dirty_sand = { 
    color: ["#a35222", "#a15122", "#7e3f1a", "#f4ba9a", "#fed3ba", "#f2b796", "#f4ba9a", "#fed3ba", "#f2b796"],
    behavior: behaviors.POWDER,
    category: "land", 
    state: "solid",
    density: 5104,
    hidden: true
}

elements.dusty_dirty_sand = { 
    color: ["#a35222", "#a15122", "#7e3f1a", "#f4ba9a", "#fed3ba", "#f2b796", "#6c6c6c", "#8a8a8a", "#989898"],
    behavior: behaviors.POWDER,
    category: "land", 
    state: "solid",
    density: 4312,
    reactions: {
        "water": {elem1:"wet_dusty_dirty_sand", elem2:"wet_dusty_dirty_sand"}
        }
}

elements.wet_dusty_dirty_sand = { 
    color: ["#a35222", "#a15122", "#7e3f1a", "#f4ba9a", "#fed3ba", "#f2b796", "#6c6c6c", "#8a8a8a", "#989898"],
    behavior: behaviors.POWDER,
    category: "land", 
    state: "liquid",
    density: 4312,
}

elements.rocky_dirty_sand = { 
    color: ["#a35222", "#a15122", "#7e3f1a", "#f4ba9a", "#fed3ba", "#f2b796", "#939393", "#c4c4c4", "#777777"],
    behavior: behaviors.POWDER,
    category: "land", 
    state: "solid",
    density: 4502,
    reactions: {
        "dust": {elem1:"dusty_rocky_dirty_sand", elem2:"dusty_rocky_dirty_sand"}
        }
}

elements.wet_rocky_dirty_sand = { 
    color: ["#a35222", "#a15122", "#7e3f1a", "#f4ba9a", "#fed3ba", "#f2b796", "#939393", "#c4c4c4", "#777777"],
    behavior: behaviors.POWDER,
    category: "land", 
    state: "liquid",
    density: 4502
}

elements.dusty_rocky_dirty_sand = { 
    color: ["#a35222", "#a15122", "#7e3f1a", "#f4ba9a", "#fed3ba", "#f2b796", "#939393", "#c4c4c4", "#777777", "#6c6c6c", "#8a8a8a", "#989898"],
    behavior: behaviors.POWDER,
    category: "land", 
    state: "solid",
    density: 5992,
    reactions: {
        "water": {elem1:"wet_dusty_rocky_dirty_sand", elem2:"wet_dusty_rocky_dirty_sand"}
        }
}

elements.wet_dusty_rocky_dirty_sand = { 
    color: ["#a35222", "#a15122", "#7e3f1a", "#f4ba9a", "#fed3ba", "#f2b796", "#939393", "#c4c4c4", "#777777", "#6c6c6c", "#8a8a8a", "#989898"],
    behavior: behaviors.POWDER,
    category: "land", 
    state: "liquid",
    density: 5992
}

elements.reverse_gravity_liquid = { 
    color: "#cdd7e2",
    behavior: behaviors.AGLIQUID	,
    category: "liquids", 
    state: "liquid",
    density: 50,
    reactions: {
        "dirty_sand": { elem1:"sandy_dirt", elem2:"sandy_dirt" }
}

}


elements.reverse_soda = { 
    color: ["#5f2706", "#48230d", "#52250a"],
    behavior: behaviors.AGLIQUID,  behavior: [
        "M2|M1|M2",
        "M2|XX|M2",
        "XX|CR:foam%3|XX",
    ],

    category: "liquids", 
    state: "liquid",
    density: 1030
}

elements.really_really_fizzy_soda = { 
    color: ["#5f2706", "#48230d", "#52250a"],
    behavior: behaviors.LIQUID	,  behavior: [
        "XX|CR:foam%100|XX",
        "M2|M1|M2",
        "M2|XX|M2"
    ],

    category: "liquids", 
    state: "liquid",
    density: 1030
}

elements.fizziest_soda = { 
    color: ["#5f2706", "#48230d", "#52250a"],
    behavior: behaviors.LIQUID	,  behavior: [
        "CR:foam%100|CR:foam%100|CR:foam%100",
        "M2|M1|M2",
        "M2|XX|M2"
    ],

    category: "liquids", 
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

    category: "liquids", 
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
    category: "liquids",
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
}

elements.green_gasoline = {
    color: ["#226624", "#07580a", "#1d591f"],
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
    category: "liquids",
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
}

elements.dark_soda = { 
    color: "#56589f",
    behavior: behaviors.LIQUID	,  behavior: [
        "XX|CR:foam%20|XX",
        "M2|M1|M2",
        "M2|XX|M2"
    ],

    category: "liquids", 
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

    category: "liquids", 
    state: "liquid",
    density: 1030
}


elements.negatively_dense_liquid = { 
    color: "#94ffd1",
    behavior: behaviors.LIQUID	,
    category: "liquids", 
    state: "liquid",
    density: -2000
}

elements.plasma2 = { 
    color: "#caf7ff",
    behavior: behaviors.DGAS	,
    category: "energy", 
    state: "gas",
    density: 50000,
    temp:500000
}

elements.plasma3 = { 
    color: "#9dc6e3",
    behavior: behaviors.DGAS	,
    category: "energy", 
    state: "gas",
    density: 50010,
    temp:200000000
}

elements.plasma4 = { 
    color: "#9de4e3",
    behavior: behaviors.DGAS	,
    category: "energy", 
    state: "gas",
    density: 50050,
    temp:50000000000
}

elements.ultimate_plasma = { 
    color: "#0dfee3",
    behavior: behaviors.DGAS	,
    category: "energy", 
    state: "gas",
    density: 700050,
    temp: 5000000000000000
}

elements.negative_fire = { 
    color: ["#a6bfc4", "#6bd2e4", "#b8dee4", "#32cae4"],
    behavior: behaviors.DGAS	,
    category: "energy", 
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
    category: "weapons", 
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.reinforced_wall = { 
    color: "#ffff01", 
    behavior: behaviors.WALL,
    category: "solids", 
    state: "solid",
    density: 1300,
    hardness:10^81
}

elements.unreinforced_wall = { 
    color: "#ffff82", 
    behavior: behaviors.WALL,
    category: "solids", 
    state: "solid",
    density: 1300,
    hardness:0
}

elements.reinforced_liquid_wall = { 
    color: "#ffff01", 
    behavior: behaviors.LIQUID,
    category: "liquids", 
    state: "liquid",
    density: 1300,
    hardness:10^81
}

elements.how_did_we_get_here = { 
    color: "#ffffff", 
    behavior: [behaviors.LIQUID, behaviors.AGLIQUID],
    category: "special", 
    state: "liquid",
    density: 1300,
    hardness:10^83
}

elements.gullibullium = { 
    color: ["#70bc7a", "#70bb79", "#7cac81"],
    behavior: behaviors.WALL,
    category: "solids", 
    state: "solid",
    density: 1300,
    hardness:0.8,
    tempHigh: 12500

}

elements.r_gullibullium = { 
    color: ["#f0bc7a", "#f0bb79", "#fcac81"],
    behavior: behaviors.WALL,
    category: "solids", 
    state: "solid",
    density: 2600.00001,
    hardness:0.95,
    tempHigh: 80000,
    stateHigh: "molten_r_gullibullium"
}

elements.molten_r_gullibullium = { 
    color: ["#ff721b", "#d0743c", "#dcb03f"],
    behavior: behaviors.MOLTEN,
    category: "liquids", 
    state: "liquid",
    density: 1300,
    hardness:0.95,
    tempLow: 79999,
    temp: 80000,
    tempHigh: 145000,
    stateHigh: "r_gullibullium_gas",
    stateLow: "r_gullibullium"
}

elements.r_gullibullium_gas = { 
    color: ["#ff721b", "#d0743c", "#dcb03f"],
    behavior: behaviors.GAS,
    category: "gases", 
    state: "gas",
    density: 1300,
    hardness:0.95,
    tempLow: 144999,
    temp: 145000,
    stateLow: "molten_r_gullibullium"
}

elements.boba_pearls = { 
    color: "#3b0a57",
    behavior: behaviors.POWDER,
    category: "Boba", 
    state: "solid",
    density: 54678900,
    hardness:0.95
}

elements.vanilla_boba = { 
    color: "#fff0dd",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.mango_boba = { 
    color: "#ffc77d",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.matcha_boba = { 
    color: "#58d168",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.banana_boba = { 
    color: "#ffe1a1",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.banana_cream_boba = { 
    color: "#ffffc1",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.satans_boba = { 
    color: "#852d2d",
    behavior: behaviors.MOLTEN,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25,
    temp: 650
}

elements.peach_boba = { 
    color: "#ffbe73",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.strawberry_boba = { 
    color: "#e27c7c",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.mint_boba = { 
    color: "#8cff9b",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.mint_vanilla_boba = { 
    color: "#c8ffcf",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.classic_boba = { 
    color: "#ffffff",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.taro_boba = { 
    color: "#f1c8ff",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.thai_tea_boba = { 
    color: "#ffc98c",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.jasmine_green_tea_boba = { 
    color: "#d8ffc7",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.honeydew_boba = { 
    color: "#9eff98",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.rose_boba = { 
    color: "#ffe6e6",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.lavender_boba = { 
    color: "#efbfff",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.lychee_boba = { 
    color: "#fff1bf",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.passion_fruit_boba = { 
    color: "#ffb942",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.pineapple_boba = { 
    color: "#ffe742",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.blueberry_boba = { 
    color: "#272a98",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.raspberry_boba = { 
    color: "#ff3333",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.coconut_boba = { 
    color: "#f1f1f1",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.almond_boba = { 
    color: "#e4daa9",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.hazelnut_boba = { 
    color: "#fbf4d4",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.caramel_boba = { 
    color: "#e4ab32",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.chocolate_boba = { 
    color: "#6f4b00",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.coffee_boba = { 
    color: "#866625",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.guava_boba = { 
    color: "#ff390a",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.kiwi_boba = { 
    color: "#09de0f",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.papaya_boba = { 
    color: "#c4ce37",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.black_sesame_boba = { 
    color: "#6e89a9",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.pandan_boba = { 
    color: "#33d460",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.pomegranate_boba = { 
    color: "#ca0000",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.watermelon_boba = { 
    color: "#f26565",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.grapefruit_boba = { 
    color: "#f1962f",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.plum_boba = { 
    color: "#dacfd9",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.jackfruit_boba = { 
    color: "#daa128",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.soursop_boba = { 
    color: "#ded3bb",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.cranberry_boba = { 
    color: "#f81e1e",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.blood_orange_boba = { 
    color: "#ed2115",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.lemonade_boba = { 
    color: "#ffe151",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.guanabana_boba = { 
    color: "#f5f5f5",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.cherry_blossom_boba = { 
    color: "#f598e8",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.cardamom_boba = { 
    color: "#dac370",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.saffron_boba = { 
    color: "#ffe323",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.pistachio_boba = { 
    color: "#9cff90",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.blue_raspberry_boba = { 
    color: "#29c9f1",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.cotton_candy_boba = { 
    color: "#f1cfde",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.bubblegum_boba = { 
    color: "#ff97bc",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.peppermint_boba = { 
    color: ["#ffeff5", "#ff0000"],
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.spearmint_boba = { 
    color: ["#ffeff5", "#00ff00"],
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.strawberry_kiwi_boba = { 
    color: "#ffeff5",
    colorPattern: ["sssss", 
    "sssss", 
    "ssssk", 
    "ssssk", 
    "ssskk", 
    "ssskk", 
    "sskkk", 
    "sskkk", 
    "skkkk", 
    "skkkk", 
    "kkkkk", 
    "kkkkk"],
    colorKey: {
        "s": "#e27c7c",
        "k": "#09de0f"
    },
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.lychee_rose_boba = { 
    color: "#e04b8c",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.raspberry_lemonade_boba = { 
    color: "#e0604a",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.blackberry_boba = { 
    color: "#232048",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.elderflower_boba = { 
    color: "#ef9d5c",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.hibiscus_boba = { 
    color: "#e8a1cd",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 1300,
    hardness:0.25
}

elements.dragon_fruit_boba = { 
    color: "#cd4747",
    behavior: behaviors.LIQUID,
    category: "Boba", 
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
    category: "Boba", 
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
    category: "Boba", 
    state: "liquid",
    density: 1600,
    hardness:0.25
}

elements.nousernamefounds_gallium_boba = { 
    color: ["#b1b1b1", "#bfbfbf", "#9e9e9e"],
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 5100,
    hardness:0.25
}

elements.bart_ender_twixs_birthday_cake_boba = { 
    color: "#e6dbe4",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 2000,
    hardness:0.25
}

elements.sb_boba = { 
    color: ["#000000", "#ffff00", "#3a3a3a", "#ff0000"],
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 2000,
    hardness:0.25
}

elements.sethies_red_boba = { 
    color: "#ff8282",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 2000,
    hardness:0.25
}

elements.sethies_blue_boba = { 
    color: "#82c0ff",
    behavior: behaviors.LIQUID,
    category: "Boba", 
    state: "liquid",
    density: 2010,
    hardness:0.25
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
    category: "weapons"
},

elements.when_you_bomb = {
    color: "#ff0000",
    colorPattern: ["rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrwrrwrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrwwwwwrrr",
    "rwrrrrrwrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr"],
    colorKey: {
        "r": "#ff0000",
        "w": "#ffffff"
    },
    behavior: [
        "XX|EX:40>when_you_particles|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:40>when_you_particles|M2",
    ],
    category: "weapons", 
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.whenyouium = { 
    color: "#ff0000",
    colorPattern: ["rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrwrrwrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrwwwwwrrr",
    "rwrrrrrwrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr"],
    colorKey: {
        "r": "#ff0000",
        "w": "#ffffff"
    },
    behavior: behaviors.WALL,
    category: "solids", 
    state: "solid",
    density: 2000,
    hardness:1.01,
    reactions: {"when_iium": { elem1: "whenweium" },}
    
}

elements.whenweium = { 
    color: "#7f0080",
    colorPattern: [
    "pppppppppp",
    "pppppppppp",
    "pppppppppp",
    "pppppppppp",
    "pppppppppp",
    "pppppppppp",
    "pppppppppp",
    "pppgppgppp",
    "pppppppppp",
    "pppppppppp",
    "pppppppppp",
    "pggggggggp",
    "pppppppppp",
    "pppppppppp",
    "pppppppppp",
    "pppppppppp",
],
    colorKey: {
    "p": "#7f0080",
    "g": "#808080"
    },
    behavior: behaviors.WALL,
    category: "solids", 
    state: "solid",
    density: 2000,
    hardness:1.01
    
}

elements.when_you_particles = { 
    color: "#ff0000",
    colorPattern: ["rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrwrrwrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrwwwwwrrr",
    "rwrrrrrwrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr",
    "rrrrrrrrrr"],
    colorKey: {
        "r": "#ff0000",
        "w": "#ffffff"
    },
    behavior: behaviors.DGAS,
    category: "energy", 
    state: "gas",
    density: 2000,
    hardness:0.98,
    hidden: true,
    temp: 500000000000000
}

elements.when_i_bomb = {
    color: "#0000ff",
    colorPattern: [
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBbBBbBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBbBBBbBBB",
    "BBbbbbbBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB"],
    colorKey: {
        "B": "#0000ff",
        "b": "#000000"
    },
    behavior: [
        "XX|EX:40>when_i_particles|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:40>when_i_particles|M2",
    ],
    category: "weapons", 
    state: "solid",
    density: -1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.when_i_particles = { 
    color: "#0000ff",
    colorPattern: [
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBbBBbBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBbBBBbBBB",
    "BBbbbbbBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB"],
    colorKey: {
        "B": "#0000ff",
        "b": "#000000"
    },
    behavior: behaviors.DGAS,
    category: "energy", 
    state: "gas",
    density: 2000,
    hardness:0.98,
    hidden: true,
    temp: -500000000000000
}

elements.when_iium = { 
    color: "#0000ff",
    colorPattern: [
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBbBBbBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBbBBBbBBB",
    "BBbbbbbBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB",
    "BBBBBBBBBB"],
    colorKey: {
        "B": "#0000ff",
        "b": "#000000"
    },
    behavior: behaviors.WALL,
    category: "solids", 
    state: "solid",
    density: -2000,
    hardness:1.01
    
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
    category: "land",
    state: "solid",
    density: 1302.5,
    hardness: 0.2,
    breakInto: "gravel"
}

elements.water_but_it_stays_liquid = {
    color: "#2167ff",
    behavior: behaviors.LIQUID,
    category: "liquids",
    heatCapacity: 1234213423423554,
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
        "XX|CR:radiation%15|XX",
        "CR:radiation%1|CH:lead%0.001|CR:radiation%15",
        "M2|M1|M2",
    ],
    reactions: {
        "neutron": { elem1:"n_explosion", tempMin:500, chance:0.1 }
    },
    tempHigh: 1132.2,
    category: "powders",
    state: "solid",
    density: 19100,
    hardness: 0.6,
    conduct: 0.235,
    excludeRandom: true
}

elements.paprika = {
    color: ["#df3b3b", "#ef0c0c", "#cf2323"],
    behavior: behaviors.POWDER,
    category: "food", 
    state: "solid",
    density: 1070,
    reactions: {
        "blue_uranium": {elem1:"blue_paprika", elem2:"blue_paprika"}
        }
}

elements.blue_paprika = {
    color: ["#4ba5ff","#71a8de","#b4c7da",],
    behavior: [
        "XX|CR:radiation%20|XX",
        "CR:radiation%1|CH:lead%0.001|CR:radiation%20",
        "M2|M1|M2",
    ],
    category: "Food..?", 
    state: "solid",
    density: 1070
}

elements.pepper = {
    color: ["#18b82d", "#f44343"],
    behavior: behaviors.SUPPORTPOWDER,
    category: "food", 
    state: "solid",
    density: 735,
    tempHigh: 93,
    breakInto: "crushed_pepper"
}

elements.crushed_pepper = {
    color: ["#91dc9b", "#d77c7c"],
    behavior: behaviors.POWDER,
    category: "food", 
    state: "solid",
    density: 735,
    reactions: {
        "salt": {elem1:"paprika", elem2:"paprika"}
        }
}

elements.dusty_ash = {
    color: ["#dcdcdc", "#969696", "#acacac", "#9e9e9e"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 1070
}

elements.cool_flash = {
    color: "#fffdcf",
    tick: function(pixel) {
        if (Math.random() < 0.75 && pixelTicks - pixel.start > 1) {
            deletePixel(pixel.x, pixel.y)
        }
        doHeat(pixel);
    },
    reactions: {
        "blood": { elem1:"pointer" },
        "molten_stained_glass": { elem1:"rainbow" },
        "electric": { elem1:"pointer" },
    },
    category: "energy",
    temp: -3500,
    state: "gas",
    density: 1,
    hidden: true,
    noMix: true
}

elements.sun_flash = {
    color: "#ffffbd",
    tick: function(pixel) {
        if (Math.random() < 0.75 && pixelTicks - pixel.start > 1) {
            deletePixel(pixel.x, pixel.y)
        }
        doHeat(pixel);
    },
    reactions: {
        "blood": { elem1:"pointer" },
        "molten_stained_glass": { elem1:"rainbow" },
        "electric": { elem1:"pointer" },
    },
    category: "energy",
    temp: 5504,
    state: "gas",
    density: 1,
    hidden: true,
    noMix: true
}

elements.radiant_flash = {
    color: "#fffdcf",
    tick: function(pixel) {
        if (Math.random() < 0.75 && pixelTicks - pixel.start > 1) {
            deletePixel(pixel.x, pixel.y)
        }
        doHeat(pixel);
    },
    reactions: {
        "blood": { elem1:"pointer" },
        "molten_stained_glass": { elem1:"rainbow" },
        "electric": { elem1:"pointer" },
    },
    behavior: [
        "XX|CR:radiation%20|XX",
        "CR:radiation%1|CH:lead%0.001|CR:radiation%20",
        "M2|M1|M2",
    ],
    category: "energy",
    temp: -3500,
    state: "gas",
    density: 1,
    hidden: true,
    noMix: true
}

elements.cool_ray = {
    color: ["#00ffff","#00fffe"],
    tick: function(pixel) {
        var x = pixel.x;
        for (var y = pixel.y; y < height; y++) {
            if (outOfBounds(x, y)) {
                break;
            }
            if (isEmpty(x, y)) {
                if (Math.random() > 0.05) { continue }
                createPixel("cool_flash", x, y);
                pixelMap[x][y].color = "#00ffff";
                pixelMap[x][y].temp = -3500;
            }
            else {
                if (elements[pixelMap[x][y].element].isGas) { continue }
                if (elements[pixelMap[x][y].element].id === elements.cool_ray.id) { break }
                pixelMap[x][y].temp += -100;
                pixelTempCheck(pixelMap[x][y]);
                break;
            }
        }
        deletePixel(pixel.x, pixel.y);
    },
    temp: -3500,
    category: "rays",
    state: "gas",
    density: 1,
    excludeRandom: true,
    noMix: true
}

elements.radiant_ray = {
    color: "#00FF00",
    tick: function(pixel) {
        var x = pixel.x;
        for (var y = pixel.y; y < height; y++) {
            if (outOfBounds(x, y)) {
                break;
            }
            if (isEmpty(x, y)) {
                if (Math.random() > 0.05) { continue }
                createPixel("radiant_flash", x, y);
                pixelMap[x][y].color = "#00FF00";
                pixelMap[x][y].temp = 100000000;
            }
            else {
                if (elements[pixelMap[x][y].element].isGas) { continue }
                if (elements[pixelMap[x][y].element].id === elements.radiant_ray.id) { break }
                pixelMap[x][y].temp += 10000;
                pixelTempCheck(pixelMap[x][y]);
                break;
            }
        }
        deletePixel(pixel.x, pixel.y);
    },
    temp: 100000000,
    category: "rays",
    state: "gas",
    density: 1,
    excludeRandom: true,
    noMix: true
}

elements.sun_ray = {
    color: "#ffffbd",
    tick: function(pixel) {
        var x = pixel.x;
        for (var y = pixel.y; y < height; y++) {
            if (outOfBounds(x, y)) {
                break;
            }
            if (isEmpty(x, y)) {
                if (Math.random() > 0.05) { continue }
                createPixel("sun_flash", x, y);
                pixelMap[x][y].color = "#ffffbd";
                pixelMap[x][y].temp = 5504;
            }
            else {
                if (elements[pixelMap[x][y].element].isGas) { continue }
                if (elements[pixelMap[x][y].element].id === elements.sun_ray.id) { break }
                pixelMap[x][y].temp += 170;
                pixelTempCheck(pixelMap[x][y]);
                break;
            }
        }
        deletePixel(pixel.x, pixel.y);
    },
    temp: 5504,
    category: "rays",
    state: "gas",
    density: 1,
    excludeRandom: true,
    noMix: true
}

elements.mega_incinerate = {
    color: ["#e600ff","#d984d8","#ff00e1"],
    tool: function(pixel) {
        pixel.temp += 999999999999999;
        if (!pixel.burning && elements[pixel.element].burn) {
            pixel.burning = true;
            pixel.burnStart = pixelTicks;
        }
        pixelTempCheck(pixel);
    },
    category: "tools",
    excludeRandom: true
}

elements.reinforced_concrete = {
    color: ["#e4e4e4", "#d7d7d7"],
    behavior: behaviors.SUPPORT,
    tempHigh: 3000,
    stateHigh: "magma",
    category: "powders",
    state: "solid",
    density: 4800,
    hardness: 0.75,
    breakInto: "dust",
    darkText: true
}

elements.green_smoke = {
    color: "#64d14f",
    behavior: behaviors.GAS,
    tempHigh: 3000,
    stateHigh: "green_fire",
    category: "gases",
    state: "gas",
    density: 4800,
    hardness: 0.75,
    breakInto: "dust",
    darkText: true
}

elements.green_fire = {
    color: ["#3fb927","#64d14f","#4fe831"],
    tick: function(pixel){
        behaviors.UL_UR_OPTIMIZED(pixel);
        if (!pixel.del && settings.burn===0 && (pixelTicks-pixel.start > 70) && Math.random() < 0.1 ) { changePixel(pixel,"green_smoke") }
    },
    reactions: {
        "water": { elem1: "green_smoke" },
        "steam": { elem1: "green_smoke" },
        "carbon_dioxide": { elem1: "green_smoke" },
        "foam": { elem1: "green_smoke" },
        "dirty_water": { elem1: "green_smoke" },
        "salt_water": { elem1: "green_smoke" },
        "sugar_water": { elem1: "green_smoke" },
        "seltzer": { elem1: "green_smoke" },
        "pool_water": { elem1: "green_smoke" },
        "oxygen": { elem2: null, chance:0.1 },
    },
    temp:600,
    tempLow:100,
    stateLow: "green_smoke",
    tempHigh: 7000,
    stateHigh: "plasma",
    category: "energy",
    burning: true,
    burnTime: 25,
    burnInto: "green_smoke",
    state: "gas",
    density: 0.1,
    ignoreAir: true,
    noMix: true
}

elements.obsidian = { 
    color: "#240d37",
    colorPattern: [
        "DDDDddddddddDDDD",
        "DDDDdddoodddDDDD",
        "DDDDddooooddDDDD",
        "DDDDdddoodddDDDD", 
        "DDDDddddddddDDDD"],
    colorKey: {
        "o": "#49325d",
        "d": "#2c1e38",
        "D": "#240d37"
    },
    behavior: behaviors.WALL,
    category: "solids", 
    state: "weapons",
    density: 2000,
    hardness: 0.25,
    tempHigh: 1710,
    stateHigh: "magma"
    
}

elements.green_ketchup = {
    color: "#18c61e",
    behavior: behaviors.LIQUID,
    reactions: {
        "rust": { elem2:"iron", chance:0.01 },
        "oxidized_copper": { elem2:"copper", chance:0.01 },
        "baking_soda": { "elem1":"carbon_dioxide", elem2:"foam", chance:0.01 },
    },
    viscosity: 50000,
    tempHigh: 260,
    stateHigh: ["carbon_dioxide","methane","steam","salt","sugar"],
    category:"liquids",
    state: "liquid",
    density: 1235,
    stain: 0.05,
    isFood: true
}

elements.muddy_water = {
    color: "#dbc383",
    behavior: behaviors.LIQUID,
    tempHigh: 100,
    stateHigh: "steam",
    tempLow: 0,
    stateLow: "ice",
    category: "liquids",
    heatCapacity: 4.184,
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

elements.deuterium = {
    color: "#557bcf",
    behavior: behaviors.GAS,
    reactions: {
        "oxygen": { elem1:null, elem2:"heavy_water", tempMin:1 },
        "hydrogen": { elem1:"neutron", elem2:"helium", tempMin:10000, temp1:20000, temp2:20000 },
        "nitrogen": { elem1:null, elem2:"oxygen", tempMin:10000 },
        "sulfur": { elem1:null, elem2:"chlorine", tempMin:10000 },
        "neon": { elem1:null, elem2:"sodium", tempMin:10000 },
        "fire": { elem1:"explosion", chance:0.005 },
    },
    category: "gases",
    burn: 100,
    burnTime: 2,
    burnInto: ["fire","fire","fire","fire","fire","fire","fire","fire","fire","fire","fire","fire","steam"],
    tempLow: -253,
    stateLow: "liquid_hydrogen",
    state: "gas",
    density: 0.08375,
    conduct: 0.02,
    colorOn: "#E315D3"
}

elements.heavy_water = {
    color: "#1237ff",
    behavior: behaviors.LIQUID,
    tempHigh: 100,
    stateHigh: "heavy_steam",
    tempLow: 0,
    stateLow: "heavy_ice",
    category: "liquids",
    heatCapacity: 4.184,
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
        "dust": { elem1: "dirty_heavy_water", elem2: null },
        "ash": { elem1: "dirty_heavy_water", elem2: null },
        "cyanide": { elem1: "dirty_heavy_water", elem2: null },
        "cyanide_gas": { elem1: "dirty_heavy_water", elem2: null },
        "carbon_dioxide": { elem1: "seltzer", elem2: null, oneway:true },
        "sulfur": { elem1: "dirty_heavy_water", elem2: null },
        "rat": { elem1: "dirty_heavy_water", chance:0.005 },
        "plague": { elem1: "dirty_heavy_water", elem2: null },
        "rust": { elem1: "dirty_heavy_water", chance:0.005 },
        "lead": { elem1: "dirty_heavy_water", chance:0.005 },
        "solder": { elem1: "dirty_heavy_water", chance:0.005 },
        "fallout": { elem1: "dirty_heavy_water", chance:0.25 },
        "radiation": { elem1: "dirty_heavy_water", chance:0.25 },
        "uranium": { elem1: "dirty_heavy_water", chance:0.25 },
        "rotten_meat": { elem1: "dirty_heavy_water", chance:0.25 },
        "rotten_cheese": { elem1: "dirty_heavy_water", chance:0.25 },
        "cancer": { elem1: "dirty_heavy_water", chance:0.25 },
        "oil": { elem1: "dirty_heavy_water", chance:0.005 },
        "dioxin": { elem1: "dirty_heavy_water", chance:0.1 },
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
        "aluminum": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.0025 },
        "zinc": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.015 },
        "steel": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.0125 },
        "iron": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.0125 },
        "tin": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.01 },
        "brass": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.001 },
        "bronze": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.001 },
        "copper": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.0075 },
        "silver": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.0075 },
        "gold": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.0075 },
    },
    state: "liquid",
    density: 1105.2,
    conduct: 0.02,
    stain: -0.5,
    extinguish: true,
    alias: "Deuterium Oxide"
}

elements.dirty_heavy_water = {
    color: ["#0e8240","#077550","#0c6930"],
    behavior: behaviors.LIQUID,
    tempHigh: 105,
    stateHigh: ["heavy_steam","carbon_dioxide"],
    tempLow: -5,
    stateLowName: "dirty_heavy_ice",
    viscosity: 10,
    category: "liquids",
    reactions: {
        "dirt": { elem1: null, elem2: "mud" },
        "sand": { elem1: null, elem2: "wet_sand" },
        "clay_soil": { elem1: null, elem2: "clay" },
        "rock": { elem2: "wet_sand", chance: 0.0004 },
        "limestone": { elem2: "wet_sand", chance: 0.0004 },
        "plant": { elem1:"heavy_water", chance:0.05 },
        "algae": { elem1:"heavy_water", chance:0.05 },
        "charcoal": { elem1:"heavy_water", chance:0.02 },
        "gravel": { elem1:"heavy_water", chance:0.01 },
        "fly": { elem2:"dead_bug", chance:0.1, oneway:true },
        "firefly": { elem2:"dead_bug", chance:0.1, oneway:true },
        "bee": { elem2:"dead_bug", chance:0.05, oneway:true },
        "stink_bug": { elem2:"dead_bug", chance:0.1, oneway:true }
    },
    hidden: true,
    state: "liquid",
    density: 1113,
    conduct: 0.1,
    extinguish: true
},

elements.heavy_ice = {
    color: "#b2daeb",
    behavior: behaviors.WALL,
    temp: -5,
    tempHigh: 5,
    stateHigh: "heavy_water",
    category: "solids",
    state: "solid",
    density: 1016.5,
    breakInto: "heavy_snow"
}

elements.heavy_snow = {
    color: "#e1f8fc",
    behavior: behaviors.POWDER,
    reactions: {
        "water": { elem1:"heavy_slush", elem2:"heavy_slush" },
        "salt_water": { elem1:"heavy_slush", elem2:"heavy_slush" },
        "dirty_water": { elem1:"heavy_slush", elem2:"heavy_slush" },
        "pool_water": { elem1:"heavy_slush", elem2:"heavy_slush" },
        "sugar_water": { elem1:"heavy_slush", elem2:"heavy_slush" },
        "seltzer": { elem1:"heavy_slush", elem2:"heavy_slush" },
        "uranium": { elem1:"dirty_heavy_water", chance:0.001 },
    },
    temp: -5,
    tempHigh: 18,
    stateHigh: "heavy_water",
    category: "land",
    state: "solid",
    density: 110.9
}

elements.heavy_slush = {
    color: "#81bcd4",
    behavior: behaviors.LIQUID,
    reactions: {
        "dirt": { elem1: null, elem2: "mud" },
        "sand": { elem1: null, elem2: "wet_sand" },
        "uranium": { elem1:"dirty_heavy_water", chance:0.25 },
    },
    temp: -5,
    tempHigh: 18,
    tempLow: -20,
    stateLow: "heavy_ice",
    stateHigh: "heavy_water",
    category: "liquids",
    state: "liquid",
    density: 105.3,
    viscosity: 100,
    hidden: true
}

elements.heavy_steam = {
    color: "#abd6ff",
    behavior: behaviors.GAS,
    reactions: {
        "heavy_steam": { elem1: null, elem2: "cloud", chance:0.3, "y":[0,15], "setting":"clouds" },
        "rain_cloud": { elem1: "rain_cloud", chance:0.4, "y":[0,12], "setting":"clouds" },
        "cloud": { elem1: "cloud", chance:0.4, "y":[0,12], "setting":"clouds" },
        "snow_cloud": { elem1: "rain_cloud", chance:0.4, "y":[0,12], "setting":"clouds" },
        "hail_cloud": { elem1: "rain_cloud", chance:0.4, "y":[0,12], "setting":"clouds" },
        "thunder_cloud": { elem1: "rain_cloud", chance:0.4, "y":[0,12], "setting":"clouds" },
        "pyrocumulus": { elem1: "cloud", chance:0.4, "y":[0,12], "setting":"clouds" },
        "anesthesia": { elem1:"acid_cloud", elem2:null, chance:0.05, "y":[0,12], "setting":"clouds" },
        "fire_cloud": { elem1: "cloud", elem2: "pyrocumulus", chance:0.4, "y":[0,12], "setting":"clouds" },
        "smoke": { elem1: "smog", elem2: null, chance:0.001 },
        "carbon_dioxide": { elem1: "smog", elem2: null, chance:0.001 },
        "plasma": { elem1:"ozone", tempMin:500, charged:true },
        "copper": { elem1:"oxygen", elem2:"oxidized_copper", chance:0.01 },
        "bronze": { elem1:"oxygen", elem2:"oxidized_copper", chance:0.005 },
        "iron": { elem1:"oxygen", elem2:"rust", chance:0.005 },
        "steel": { elem1:"oxygen", elem2:"rust", chance:0.004 },
    },
    temp: 150,
    tempLow: 95,
    extraTempLow: {
        0: "rime"
    },
    stateLow: "heavy_water",
    category: "gases",
    state: "gas",
    density: 0.6,
    conduct: 0.002,
    stain: -0.05,
    alias: "heavy water vapor",
    extinguish: true
},

elements.led_y = {
    behavior: behaviors.WALL,
    reactions: {
        "light": {"charge1":1},
        "liquid_light": {"charge1":1},
    },
    color: "#abab00",
    colorOn: "#ffff00",
    category: "machines",
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    conduct: 1,
    breakInto: "glass_shard"
}

elements.led_p = {
    behavior: behaviors.WALL,
    reactions: {
        "light": {"charge1":1},
        "liquid_light": {"charge1":1},
    },
    color: "#6b00a1",
    colorOn: "#a900ff",
    category: "machines",
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    conduct: 1,
    breakInto: "glass_shard"
}

elements.led_o = {
    behavior: behaviors.WALL,
    reactions: {
        "light": {"charge1":1},
        "liquid_light": {"charge1":1},
    },
    color: "#a16800",
    colorOn: "#ffa500",
    category: "machines",
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    conduct: 1,
    breakInto: "glass_shard"
}

elements.red_lightning = {
    color: "#ff0000",
    tick: function(pixel) {
        if (!pixel.stage) { // create bolt
            var y = pixel.y;
            var xoffset = 0;
            var last = [pixel.x,pixel.y]
            for (var i = 0; i < 100; i++) {
                y++;
                // randomly go back and forth
                if (Math.random() > 0.5) { xoffset++; }
                else { xoffset--; }
                var x = pixel.x + xoffset;
                if (isEmpty(x, y)) {
                    createPixel("red_lightning",x,y);
                    pixelMap[x][y].stage = 1;
                    pixelMap[x][y].color = pixel.color;
                    last = [x,y];
                }
                else if (outOfBounds(x,y) || !elements[pixelMap[x][y].element].isGas) {
                    //strike
                    if (Math.random() < 0.01) { // BALL LIGHTNING
                        pixelMap[last[0]][last[1]].stage = 9;
                    }
                    if (!outOfBounds(x,y)) { pixelMap[x][y].temp = 50000 }
                    explodeAt(x, y, 13, ["plasma","plasma","plasma","red_electric"]);
                    break;
                }
            }
            doDefaults(pixel);
            deletePixel(pixel.x, pixel.y);
        }
        else if (pixel.stage === 9) { // BALL LIGHTNING
            // move either left or right randomly
            if (Math.random() > 0.5) { tryMove(pixel, pixel.x + 1, pixel.y) }
            else { tryMove(pixel, pixel.x - 1, pixel.y) }
            // create electric in a 3x3 area around pixel
            for (var x = pixel.x - 1; x <= pixel.x + 1; x++) {
                for (var y = pixel.y - 1; y <= pixel.y + 1; y++) {
                    if (isEmpty(x, y)) {
                        createPixel("red_electric",x,y);
                        pixelMap[x][y].color = pixel.color;
                    }
                }
            }
            doDefaults(pixel);
            if (pixelTicks - pixel.start >= 250) { deletePixel(pixel.x, pixel.y); }
        }
        else if (pixelTicks - pixel.start >= 4) {
            doDefaults(pixel);
            //deletePixel(pixel.x, pixel.y);
            changePixel(pixel, "red_electric")
        }
        else { doDefaults(pixel); }
    },
    temp: 50000,
    tempLow: -273,
    stateLow: ["liquid_light",null],
    category: "energy",
    state: "gas",
    maxSize: 1,
    cooldown: defaultCooldown,
    density: 1000,
    hardness: 1,
    excludeRandom: true,
    noMix: true
}

elements.purple_lightning = {
    color: "#800080",
    tick: function(pixel) {
        if (!pixel.stage) { // create bolt
            var y = pixel.y;
            var xoffset = 0;
            var last = [pixel.x,pixel.y]
            for (var i = 0; i < 100; i++) {
                y++;
                // randomly go back and forth
                if (Math.random() > 0.5) { xoffset++; }
                else { xoffset--; }
                var x = pixel.x + xoffset;
                if (isEmpty(x, y)) {
                    createPixel("purple_lightning",x,y);
                    pixelMap[x][y].stage = 1;
                    pixelMap[x][y].color = pixel.color;
                    last = [x,y];
                }
                else if (outOfBounds(x,y) || !elements[pixelMap[x][y].element].isGas) {
                    //strike
                    if (Math.random() < 0.01) { // BALL LIGHTNING
                        pixelMap[last[0]][last[1]].stage = 9;
                    }
                    if (!outOfBounds(x,y)) { pixelMap[x][y].temp = 50000 }
                    explodeAt(x, y, 13, ["plasma","plasma","plasma","purple_electric"]);
                    break;
                }
            }
            doDefaults(pixel);
            deletePixel(pixel.x, pixel.y);
        }
        else if (pixel.stage === 9) { // BALL LIGHTNING
            // move either left or right randomly
            if (Math.random() > 0.5) { tryMove(pixel, pixel.x + 1, pixel.y) }
            else { tryMove(pixel, pixel.x - 1, pixel.y) }
            // create electric in a 3x3 area around pixel
            for (var x = pixel.x - 1; x <= pixel.x + 1; x++) {
                for (var y = pixel.y - 1; y <= pixel.y + 1; y++) {
                    if (isEmpty(x, y)) {
                        createPixel("purple_electric",x,y);
                        pixelMap[x][y].color = pixel.color;
                    }
                }
            }
            doDefaults(pixel);
            if (pixelTicks - pixel.start >= 250) { deletePixel(pixel.x, pixel.y); }
        }
        else if (pixelTicks - pixel.start >= 4) {
            doDefaults(pixel);
            //deletePixel(pixel.x, pixel.y);
            changePixel(pixel, "purple_electric")
        }
        else { doDefaults(pixel); }
    },
    temp: 500000,
    tempLow: -273,
    stateLow: ["liquid_light",null],
    category: "energy",
    state: "gas",
    maxSize: 1,
    cooldown: defaultCooldown,
    density: 1000,
    hardness: 1,
    excludeRandom: true,
    noMix: true
}

elements.red_electric = {
    color: "#ff0000",
    behavior: [
        "CL%5|CL%5 AND SH|CL%5",
        "CL%5 AND SH|SH%5 AND DL%50|CL%5 AND SH",
        "M1%15 AND CL%6|M1%50 AND CL%13 AND SH|M1%15 AND CL%6",
    ],
    charge: 5,
    category: "energy",
    state: "gas",
    density: 2.1,
    insulate: true,
    ignoreAir: true
}

elements.purple_electric = {
    color: "#800080",
    behavior: [
        "CL%5|CL%5 AND SH|CL%5",
        "CL%5 AND SH|SH%5 AND DL%50|CL%5 AND SH",
        "M1%15 AND CL%6|M1%50 AND CL%13 AND SH|M1%15 AND CL%6",
    ],
    charge: 20,
    category: "energy",
    state: "gas",
    density: 2.1,
    insulate: true,
    ignoreAir: true
}


elements.blue_electric = {
    color: "#509fc8",
    behavior: [
        "CL%5|CL%5 AND SH|CL%5",
        "CL%5 AND SH|SH%5 AND DL%50|CL%5 AND SH",
        "M1%15 AND CL%6|M1%50 AND CL%13 AND SH|M1%15 AND CL%6",
    ],
    charge: 500,
    category: "energy",
    state: "gas",
    density: 2.1,
    insulate: true,
    ignoreAir: true
}

elements.blue_lightning = {
    color: "#509fc8",
    tick: function(pixel) {
        if (!pixel.stage) { // create bolt
            var y = pixel.y;
            var xoffset = 0;
            var last = [pixel.x,pixel.y]
            for (var i = 0; i < 100; i++) {
                y++;
                // randomly go back and forth
                if (Math.random() > 0.5) { xoffset++; }
                else { xoffset--; }
                var x = pixel.x + xoffset;
                if (isEmpty(x, y)) {
                    createPixel("blue_lightning",x,y);
                    pixelMap[x][y].stage = 1;
                    pixelMap[x][y].color = pixel.color;
                    last = [x,y];
                }
                else if (outOfBounds(x,y) || !elements[pixelMap[x][y].element].isGas) {
                    //strike
                    if (Math.random() < 0.01) { // BALL LIGHTNING
                        pixelMap[last[0]][last[1]].stage = 9;
                    }
                    if (!outOfBounds(x,y)) { pixelMap[x][y].temp = 200000 }
                    explodeAt(x, y, 13, ["plasma","plasma","plasma","blue_electric"]);
                    break;
                }
            }
            doDefaults(pixel);
            deletePixel(pixel.x, pixel.y);
        }
        else if (pixel.stage === 9) { // BALL LIGHTNING
            // move either left or right randomly
            if (Math.random() > 0.5) { tryMove(pixel, pixel.x + 1, pixel.y) }
            else { tryMove(pixel, pixel.x - 1, pixel.y) }
            // create electric in a 3x3 area around pixel
            for (var x = pixel.x - 1; x <= pixel.x + 1; x++) {
                for (var y = pixel.y - 1; y <= pixel.y + 1; y++) {
                    if (isEmpty(x, y)) {
                        createPixel("blue_electric",x,y);
                        pixelMap[x][y].color = pixel.color;
                    }
                }
            }
            doDefaults(pixel);
            if (pixelTicks - pixel.start >= 250) { deletePixel(pixel.x, pixel.y); }
        }
        else if (pixelTicks - pixel.start >= 4) {
            doDefaults(pixel);
            //deletePixel(pixel.x, pixel.y);
            changePixel(pixel, "blue_electric")
        }
        else { doDefaults(pixel); }
    },
    temp: 200000,
    tempLow: -273,
    stateLow: ["liquid_light",null],
    category: "energy",
    state: "gas",
    maxSize: 1,
    cooldown: defaultCooldown,
    density: 1000,
    hardness: 1,
    excludeRandom: true,
    noMix: true
}

elements.silvanium = {
    behavior: behaviors.WALL,
    reactions: {
        "light": {"charge1":1},
        "liquid_light": {"charge1":1},
    },
    color: "#625950",
    colorOn: "#e62525",
    category: "solids",
    tempHigh: 92224,
    conduct: 0.35,
    hardness: 0.48
}

elements.silvanium_alite = {
    behavior: behaviors.WALL,
    reactions: {
        "light": {"charge1":1},
        "liquid_light": {"charge1":1},
    },
    color: ["#7d5ebb", "#9c7bde", "#502d96"],
    colorOn: ["#e62525", "#79d64b"],
    category: "solids",
    tempHigh: 1052224,
    conduct: 0.37,
    hardness: 0.91
}

elements.silvanium_sulfate = {
    behavior: behaviors.WALL,
    reactions: {
        "light": {"charge1":1},
        "liquid_light": {"charge1":1},
    },
    color: "#465f42",
    colorOn: "#25a4e6",
    category: "solids",
    tempHigh: 98224,
    conduct: 0.45,
    hardness: 0.56
}

elements.alienite = {
    behavior: behaviors.WALL,
    reactions: {
        "light": {"charge1":1},
        "liquid_light": {"charge1":1},
    },
    color: ["#aa00d6", "#865d8f", "#ba4ad6", "#7e3290"],
    colorOn: "#79d64b",
    category: "solids",
    tempHigh: 104532,
    conduct: 0.25,
    hardness: 0.84
}

elements.green_filler = {
    color: "#137a63",
    behavior: behaviors.FILL,
    category:"special",
    excludeRandom: true,
    reactions: {
        "neutron": { elem1:"lattice" },
        "proton": { elem1:"vertical" },
        "electric": { elem1:"horizontal" },
        "positron": { elem1:"vertical" },
        "plasma": { elem1:"armageddon", tempMin:500, charged:true },
        "void": { elem1:"green_filler" },
    }
}

elements.alien = {
    // color: ["#f5eac6","#d4c594","#a89160","#7a5733","#523018","#361e0e"],
    color: ["#41ab1d","#4cbf25","#40752e","#871dab","#ac3ad2","#71278a"],
    category: "life",
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            createPixel("alien_body", pixel.x, pixel.y+1);
            pixel.element = "alien_head";
        }
        else if (isEmpty(pixel.x, pixel.y-1)) {
            createPixel("alien_head", pixel.x, pixel.y-1);
            pixelMap[pixel.x][pixel.y-1].color = pixel.color;
            pixel.element = "alien_body";
            pixel.color = pixelColorPick(pixel)
        }
        else {
            deletePixel(pixel.x, pixel.y);
        }
    },
    related: ["alien_body","alien_head"],
    cooldown: defaultCooldown,
    forceSaveColor: true,
}

elements.alien_body = {
    color: ["#efefef","#f0f0f0","#e8e8e8", "#cbcbcb"],
    category: "life",
    hidden: true,
    density: 1500,
    state: "solid",
    conduct: .05,
    temp: 37,
    tempHigh: 850,
    stateHigh: "cooked_meat",
    tempLow: -560,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 450,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat","bone"],
    forceSaveColor: true,
    reactions: {
        "cancer": { elem1:"cancer", chance:0.005 },
        "radiation": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.4 },
        "neutron": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.01 },
        "fallout": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.01 },
        "plague": { elem1:"plague", chance:0.05 },
        "egg": { elem2:"yolk", chance:0.5, oneway:true },
        "grape": { elem2:"juice", chance:0.5, color2:"#291824", oneway:true },
        "ant": { elem2:"dead_bug", chance:0.05, oneway:true },
        "fly": { elem2:"dead_bug", oneway:true },
        "firefly": { elem2:"dead_bug", oneway:true },
        "bee": { elem2:"dead_bug", oneway:true },
        "flea": { elem2:"dead_bug", oneway:true },
        "termite": { elem2:"dead_bug", oneway:true },
        "worm": { elem2:"slime", chance:0.05, oneway:true },
        "stink_bug": { elem2:"stench", oneway:true },
        "grass_seed": { elem2:null, chance:0.05 },
        "gold_coin": { elem2:null, chance:0.05 },
    },
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
            if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
                var headpixel = pixelMap[pixel.x][pixel.y-2];
                if (headpixel.element == "alien_head") {
                    if (isEmpty(pixel.x, pixel.y-1)) {
                        movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
                    }
                }
            }
        }
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            // Turn into rotten_meat if pixelTicks-dead > 500
            if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
                changePixel(pixel,"rotten_meat");
            }
            return
        }

        // Find the head
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "alien_head") {
            var head = pixelMap[pixel.x][pixel.y-1];
            if (head.dead) { // If head is dead, kill body
                pixel.dead = head.dead;
            }
        }
        else { var head = null }
        if (pixel.burning) {
            pixel.panic += 0.1;
            if (head && pixelTicks-pixel.burnStart > 240) {
                pixel.color = head.color;
            }
        }
        else if (pixel.panic > 0) {
            pixel.panic -= 0.1;
        }

        if (isEmpty(pixel.x, pixel.y-1)) {
            // create blood if decapitated 10% chance
            if (Math.random() < 0.1 && !pixel.charge) {
                createPixel("blood", pixel.x, pixel.y-1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
        else if (head == null) { return }
        else if (Math.random() < 0.1*(isEmpty(pixel.x, pixel.y+1) ? 1 : pixel.panic+1)) { // Move 10% chance
            var movesToTry = [
                [1*pixel.dir,0],
                [1*pixel.dir,-1],
            ];
            // While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
                    var origx = pixel.x+move[0];
                    var origy = pixel.y+move[1];
                    if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
                        movePixel(head, head.x+move[0], head.y+move[1]);
                        break;
                    }
                }
            }
            // 15% chance to change direction
            if (Math.random() < 0.15) {
                pixel.dir *= -1;
            }
            // homeostasis
            if (pixel.temp > 37) { pixel.temp -= 1; }
            else if (pixel.temp < 37) { pixel.temp += 1; }
        }

    }
}

elements.alien_head = {
    color: ["#41ab1d","#4cbf25","#40752e","#871dab","#ac3ad2","#71278a"],
    category: "life",
    hidden: true,
    density: 1080,
    state: "solid",
    conduct: .05,
    temp: 37,
    tempHigh: 850,
    stateHigh: "cooked_meat",
    tempLow: -560,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 450,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat","bone"],
    forceSaveColor: true,
    reactions: {
        "cancer": { elem1:"cancer", chance:0.005 },
        "radiation": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.4 },
        "neutron": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.03 },
        "fallout": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.03 },
        "plague": { elem1:"plague", chance:0.05 },
        "oxygen": { elem2:"carbon_dioxide", chance:0.5 },
        "meat": { elem2:null, chance:0.1 },
        "cooked_meat": { elem2:null, chance:0.1 },
        "cured_meat": { elem2:null, chance:0.1 },
        "sugar": { elem2:null, chance:0.1 },
        "broth": { elem2:null, chance:0.2 },
        "yolk": { elem2:null, chance:0.1 },
        "hard_yolk": { elem2:null, chance:0.1 },
        "dough": { elem2:null, chance:0.1 },
        "batter": { elem2:null, chance:0.2 },
        "butter": { elem2:null, chance:0.1 },
        "melted_butter": { elem2:null, chance:0.2 },
        "chocolate": { elem2:null, chance:0.2 },
        "melted_chocolate": { elem2:null, chance:0.3 },
        "grape": { elem2:null, chance:0.1 },
        "tomato": { elem2:null, chance:0.1 },
        "herb": { elem2:null, chance:0.1 },
        "lettuce": { elem2:null, chance:0.1 },
        "corn": { elem2:null, chance:0.1 },
        "popcorn": { elem2:null, chance:0.15 },
        "potato": { elem2:null, chance:0.1 },
        "baked_potato": { elem2:null, chance:0.15 },
        "bread": { elem2:null, chance:0.1 },
        "toast": { elem2:null, chance:0.1 },
        "gingerbread": { elem2:null, chance:0.1 },
        "baked_batter": { elem2:null, chance:0.2 },
        "wheat": { elem2:null, chance:0.1 },
        "candy": { elem2:null, chance:0.1 },
        "yogurt": { elem2:null, chance:0.2 },
        "frozen_yogurt": { elem2:null, chance:0.1 },
        "ice_cream": { elem2:null, chance:0.2 },
        "beans": { elem2:[null,null,null,null,null,null,null,null,"stench"], chance:0.2 },
        "tea": { elem2:null, chance:0.2 },
        "coffee": { elem2:null, chance:0.2 },
        "milk": { elem2:null, chance:0.2 },
        "cream": { elem2:null, chance:0.2 },
        "soda": { elem2:null, chance:0.2 },
        "chocolate_milk": { elem2:null, chance:0.2 },
        "fruit_milk": { elem2:null, chance:0.2 },
        "pilk": { elem2:null, chance:0.2 },
        "eggnog": { elem2:null, chance:0.2 },
        "juice": { elem2:null, chance:0.2 },
        "cheese": { elem2:null, chance:0.1 },
        "melted_cheese": { elem2:null, chance:0.2 },
        "alcohol": { elem2:null, chance:0.2 },
        "antidote": { elem2:null, chance:0.2 },
        "honey": { elem2:null, chance:0.2 },
        "caramel": { elem2:null, chance:0.2 },
        "molasses": { elem2:null, chance:0.05 },
        "ketchup": { elem2:null, chance:0.1 },
        "pumpkin_seed": { elem2:null, chance:0.1 },
        "nut": { elem2:null, chance:0.1 },
        "nut_meat": { elem2:null, chance:0.1 },
        "nut_butter": { elem2:null, chance:0.1 },
        "nut_milk": { elem2:null, chance:0.2 },
        "jelly": { elem2:null, chance:0.2 },
        "mayo": { elem2:null, chance:0.2 },
        "mashed_potato": { elem2:null, chance:0.2 },
        "sauce": { elem2:null, chance:0.2 },
        "pickle": { elem2:null, chance:0.1 },
    },
    properties: {
        dead: false
    },
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            // Turn into rotten_meat if pixelTicks-dead > 500
            if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
                changePixel(pixel,"rotten_meat");
                return
            }
        }

        // Find the body
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "alien_body") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) { // If body is dead, kill head
                pixel.dead = body.dead;
            }
        }
        else { var body = null }

        if (tryMove(pixel, pixel.x, pixel.y+1)) {
            // create blood if severed 10% chance
            if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1 && !pixel.charge) {
                createPixel("blood", pixel.x, pixel.y+1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
        // homeostasis
        if (pixel.temp > 37) { pixel.temp -= 1; }
        else if (pixel.temp < 37) { pixel.temp += 1; }
    }
}

elements.green_tornado = {
    color: ["#39d83f","#65bf69","#718a72", "#5bbf5e"],
    tick: function(pixel) {
        doHeat(pixel);
        if (pixel.stage) {
            if (pixel.stage === -1) {
                if (!isEmpty(pixel.x,pixel.y+1,true)) {
                    var pixel2 = pixelMap[pixel.x][pixel.y+1];
                    if (pixel2.element !== "green_tornado" && elements[pixel2.element].movable) {
                        deletePixel(pixel.x,pixel.y);
                        tryMove(pixel2,pixel2.x,pixel2.y-1);
                        return;
                    }
                }
                if (Math.random() < 0.1) {
                    deletePixel(pixel.x,pixel.y);
                    return;
                }
                return;
            }
            for (var y = 0; y <= pixel.stage; y++) {
                for (var x = -y-0.5; x <= y+0.5; x++) {
                    var nx = Math.round(pixel.x+x/2);
                    var ny = Math.round(pixel.y-y);
                    if (isEmpty(nx,ny)) {
                        createPixel("green_tornado",nx,ny);
                        pixelMap[nx][ny].stage = -1;
                    }
                    else if (!outOfBounds(nx,ny)) {
                        // try to break and then move it up
                        var p = pixelMap[nx][ny];
                        if (elements[p.element].breakInto && Math.random() < (elements[p.element].hardness || 1) * 0.1) {
                            breakPixel(p);
                        }
                        if (p.del || elements[p.element].id === elements.green_tornado.id || !elements[p.element].movable) { continue; }
                        tryMove(p,p.x,p.y-1);
                    }
                }
            }
            for (var y = 0; y <= Math.min(4,pixel.stage); y++) {
                for (var x = -pixel.stage; x <= pixel.stage; x++) {
                    var nx = Math.round(pixel.x+x/2);
                    var ny = pixel.y-y;
                    if (!isEmpty(nx,ny,true) && Math.random() < 0.3) {
                        var p = pixelMap[nx][ny];
                        if (elements[p.element].breakInto && Math.random() < (elements[p.element].hardness || 1) * 0.1) {
                            breakPixel(p);
                        }
                        if (p.del || elements[p.element].id === elements.green_tornado.id || !elements[p.element].movable) { continue; }
                        tryMove(p,p.x,p.y-1);
                    }
                }
            }
            if (pixel.stage < pixel.mag) {
                pixel.stage++;
            }
        }
        else {
            pixel.mag = Math.floor(Math.random() * 7) + 15
            pixel.stage = 1;
            pixel.dir = Math.random() < 0.5 ? -1 : 1;
        }
        tryMove(pixel,pixel.x,pixel.y+1);
        if (Math.random() < 0.1 && !tryMove(pixel,pixel.x+pixel.dir,pixel.y)) {
            tryMove(pixel,pixel.x+pixel.dir,pixel.y-1)
            if (Math.random() < 0.2) {
                pixel.dir = -pixel.dir;
            }
        }
        if (pixelTicks - pixel.start > 400 && Math.random() < 0.2) {
            pixel.stage -= 2;
            pixel.mag -= 1;
            if (pixel.stage < 2) {
                deletePixel(pixel.x,pixel.y);
            }
        }
    },
    category: "weapons",
    state: "gas",
    density: 1.23,
    maxSize: 1,
    cooldown: defaultCooldown,
    excludeRandom: true,
}

elements.green_goo = {
    color: "#64d14f",
    behavior: [
        "XX|CH:green_goo%25|XX",
        "M2%5 AND CH:green_goo%25|DL%5|M2%5 AND CH:green_goo%25",
        "XX|CH:green_goo%25 AND M1|XX",
    ],
    behaviorOn: [
        "XX|XX|XX",
        "XX|DL%10|XX",
        "M1|M2|M1",
    ],
    reactions: {
        "antibody": { elem1:"malware", elem2:null }
    },
    ignore: ["fire","smoke","malware","flash","light","laser"],
    category: "special",
    state: "solid",
    density: 21450,
    excludeRandom: true,
    conduct: 0.25,
    darkText: true
}

elements.beef = {
    color: ["#e45a5a","#e34343","#c03a3a"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "XX|M1|XX",
    ],
    reactions: {
        "dirty_water": { elem1:"rotten_meat", chance:0.1 },
        "fly": { elem1:"rotten_meat", chance:0.2 },
        "dioxin": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cancer": { elem1:"rotten_meat", chance:0.1 },
        "plague": { elem1:"rotten_meat", elem2:null, chance:0.3 },
        "ant": { elem1:"rotten_meat", chance:0.1 },
        "worm": { elem1:"rotten_meat", chance:0.1 },
        "rat": { elem1:"rotten_meat", chance:0.3 },
        "mushroom_spore": { elem1:"rotten_meat", chance:0.1 },
        "mushroom_stalk": { elem1:"rotten_meat", chance:0.1 },
        "mercury": { elem1:"rotten_meat", elem2:null, chance:0.2 },
        "mercury_gas": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "virus": { elem1:"rotten_meat", chance:0.1 },
        "poison": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "infection": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "ink": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "acid": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "acid_gas": { elem1:"rotten_meat", chance:0.4 },
        "cyanide": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "cyanide_gas": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "rotten_cheese": { elem1:"rotten_meat", chance:0.02 },
        "water": { elem2:"broth", tempMin:70 },
        "salt_water": { elem2:"broth", tempMin:70 },
        "sugar_water": { elem2:"broth", tempMin:70 },
        "seltzer": { elem2:"broth", tempMin:70 },
        "salt": { elem1:"cured_meat" },
    },
    tempHigh: 62.8,
    stateHigh: "cooked_beef",
    tempLow: -18,
    stateLow: "frozen_beef",
    category:"food",
    burn:15,
    burnTime:200,
    burnInto:"cooked_beef",
    state: "solid",
    density: 1019.5,
    conduct: 0.2,
    isFood: true
}

elements.frozen_beef = {
    color: ["#81afc8","#509fc8","#7caec8","#356eb1"],
    behavior: behaviors.STURDYPOWDER,
    temp: -18,
    tempHigh: 0,
    stateHigh: "beef",
    category:"food",
    hidden:true,
    state: "solid",
    density: 1067.5,
    isFood: true
}

elements.chicken = {
    color: ["#dbc1b3","#dbc0b9"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "XX|M1|XX",
    ],
    reactions: {
        "dirty_water": { elem1:"rotten_meat", chance:0.1 },
        "fly": { elem1:"rotten_meat", chance:0.2 },
        "dioxin": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cancer": { elem1:"rotten_meat", chance:0.1 },
        "plague": { elem1:"rotten_meat", elem2:null, chance:0.3 },
        "ant": { elem1:"rotten_meat", chance:0.1 },
        "worm": { elem1:"rotten_meat", chance:0.1 },
        "rat": { elem1:"rotten_meat", chance:0.3 },
        "mushroom_spore": { elem1:"rotten_meat", chance:0.1 },
        "mushroom_stalk": { elem1:"rotten_meat", chance:0.1 },
        "mercury": { elem1:"rotten_meat", elem2:null, chance:0.2 },
        "mercury_gas": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "virus": { elem1:"rotten_meat", chance:0.1 },
        "poison": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "infection": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "ink": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "acid": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "acid_gas": { elem1:"rotten_meat", chance:0.4 },
        "cyanide": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "cyanide_gas": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "rotten_cheese": { elem1:"rotten_meat", chance:0.02 },
        "water": { elem2:"broth", tempMin:70 },
        "salt_water": { elem2:"broth", tempMin:70 },
        "sugar_water": { elem2:"broth", tempMin:70 },
        "seltzer": { elem2:"broth", tempMin:70 },
        "salt": { elem1:"cured_meat" },
        "crumb": { elem1:"breaded_chicken" },
    },
    tempHigh: 73.9,
    stateHigh: "cooked_chicken",
    tempLow: -18,
    stateLow: "frozen_meat",
    category:"food",
    burn:15,
    burnTime:200,
    burnInto:"cooked_chicken",
    state: "solid",
    density: 1019.5,
    conduct: 0.2,
    isFood: true
}

elements.frozen_chicken = {
    color: ["#94d4f0","#9ac1d2", "#7fa3b3"],
    behavior: behaviors.STURDYPOWDER,
    temp: -18,
    tempHigh: 0,
    stateHigh: "chicken",
    category:"food",
    hidden:true,
    state: "solid",
    density: 1067.5,
    isFood: true
}

elements.frozen_breaded_chicken = {
    color: ["#94d4f0","#9ac1d2", "#7fa3b3", "#c7a64a","#d3bd82"],
    behavior: behaviors.STURDYPOWDER,
    temp: -18,
    tempHigh: 0,
    stateHigh: "breaded_chicken",
    category:"food",
    hidden:true,
    state: "solid",
    density: 1067.5,
    isFood: true
}

elements.cooked_chicken = {
    color: ["#d4af4b","#a9904b"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "XX|M1|XX",
    ],
    reactions: {
        "dirty_water": { elem1:"rotten_meat", chance:0.1 },
        "fly": { elem1:"rotten_meat", chance:0.2 },
        "dioxin": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cancer": { elem1:"rotten_meat", chance:0.1 },
        "plague": { elem1:"rotten_meat", elem2:null, chance:0.3 },
        "ant": { elem1:"rotten_meat", chance:0.1 },
        "worm": { elem1:"rotten_meat", chance:0.1 },
        "rat": { elem1:"rotten_meat", chance:0.3 },
        "mushroom_spore": { elem1:"rotten_meat", chance:0.1 },
        "mushroom_stalk": { elem1:"rotten_meat", chance:0.1 },
        "mercury": { elem1:"rotten_meat", elem2:null, chance:0.2 },
        "mercury_gas": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "virus": { elem1:"rotten_meat", chance:0.1 },
        "poison": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "infection": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "ink": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "acid": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "acid_gas": { elem1:"rotten_meat", chance:0.4 },
        "cyanide": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "cyanide_gas": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "rotten_cheese": { elem1:"rotten_meat", chance:0.02 },
        "water": { elem2:"broth", tempMin:70 },
        "salt_water": { elem2:"broth", tempMin:70 },
        "sugar_water": { elem2:"broth", tempMin:70 },
        "seltzer": { elem2:"broth", tempMin:70 },
        "salt": { elem1:"cured_meat" },
    },
    tempHigh: 300,
    stateHigh: "ash",
    category:"food",
    burn:15,
    burnTime:200,
    burnInto:"ash",
    state: "solid",
    density: 1019.5,
    conduct: 0.2,
    isFood: true
}

elements.breaded_chicken = {
    color: ["#c7a64a","#d3bd82", "#c7a64a","#d3bd82", "#c7a64a","#d3bd82", "#c7a64a","#d3bd82", "#c7a64a","#d3bd82", "#c7a64a","#d3bd82", "#c7a64a","#d3bd82", "#c7a64a","#d3bd82", "#c7a64a","#d3bd82", "#c7a64a","#d3bd82", "#c7a64a","#d3bd82", "#c7a64a","#d3bd82", "#c7a64a","#d3bd82", "#c7a64a","#d3bd82", "#c7a64a","#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a","#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#d3bd82", "#c7a64a", "#ff8282"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "XX|M1|XX",
    ],
    reactions: {
        "dirty_water": { elem1:"rotten_meat", chance:0.1 },
        "fly": { elem1:"rotten_meat", chance:0.2 },
        "dioxin": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cancer": { elem1:"rotten_meat", chance:0.1 },
        "plague": { elem1:"rotten_meat", elem2:null, chance:0.3 },
        "ant": { elem1:"rotten_meat", chance:0.1 },
        "worm": { elem1:"rotten_meat", chance:0.1 },
        "rat": { elem1:"rotten_meat", chance:0.3 },
        "mushroom_spore": { elem1:"rotten_meat", chance:0.1 },
        "mushroom_stalk": { elem1:"rotten_meat", chance:0.1 },
        "mercury": { elem1:"rotten_meat", elem2:null, chance:0.2 },
        "mercury_gas": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "virus": { elem1:"rotten_meat", chance:0.1 },
        "poison": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "infection": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "ink": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "acid": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "acid_gas": { elem1:"rotten_meat", chance:0.4 },
        "cyanide": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "cyanide_gas": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "rotten_cheese": { elem1:"rotten_meat", chance:0.02 },
        "water": { elem2:"broth", tempMin:70 },
        "salt_water": { elem2:"broth", tempMin:70 },
        "sugar_water": { elem2:"broth", tempMin:70 },
        "seltzer": { elem2:"broth", tempMin:70 },
        "salt": { elem1:"cured_meat" },
        "grease": { elem1:"greasy_breaded_chicken" },
    },
    tempHigh: 73.9,
    stateHigh: "fried_chicken",
    tempLow: -18,
    stateLow: "frozen_meat",
    category:"food",
    burn:15,
    burnTime:200,
    burnInto:"fried_chicken",
    state: "solid",
    density: 1019.5,
    conduct: 0.2,
    isFood: true
}

elements.fried_chicken = {
    color: ["#a9996d","#c8b581"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "XX|M1|XX",
    ],
    reactions: {
        "dirty_water": { elem1:"rotten_meat", chance:0.1 },
        "fly": { elem1:"rotten_meat", chance:0.2 },
        "dioxin": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cancer": { elem1:"rotten_meat", chance:0.1 },
        "plague": { elem1:"rotten_meat", elem2:null, chance:0.3 },
        "ant": { elem1:"rotten_meat", chance:0.1 },
        "worm": { elem1:"rotten_meat", chance:0.1 },
        "rat": { elem1:"rotten_meat", chance:0.3 },
        "mushroom_spore": { elem1:"rotten_meat", chance:0.1 },
        "mushroom_stalk": { elem1:"rotten_meat", chance:0.1 },
        "mercury": { elem1:"rotten_meat", elem2:null, chance:0.2 },
        "mercury_gas": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "virus": { elem1:"rotten_meat", chance:0.1 },
        "poison": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "infection": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "ink": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "acid": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "acid_gas": { elem1:"rotten_meat", chance:0.4 },
        "cyanide": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "cyanide_gas": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "rotten_cheese": { elem1:"rotten_meat", chance:0.02 },
        "water": { elem2:"broth", tempMin:70 },
        "salt_water": { elem2:"broth", tempMin:70 },
        "sugar_water": { elem2:"broth", tempMin:70 },
        "seltzer": { elem2:"broth", tempMin:70 },
        "salt": { elem1:"cured_meat" },
        "grease": { elem1:"greasy_breaded_chicken" },
    },
    tempHigh: 300,
    stateHigh: "ash",
    tempLow: -18,
    stateLow: "frozen_meat",
    category:"food",
    burn:15,
    burnTime:200,
    burnInto:"ash",
    state: "solid",
    density: 1019.5,
    conduct: 0.2,
    isFood: true
}

elements.cooked_beef = {
    color: ["#6b2a2a","#782424","#5c281d"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "XX|M1|XX",
    ],
    reactions: {
        "dirty_water": { elem1:"rotten_meat", chance:0.1 },
        "fly": { elem1:"rotten_meat", chance:0.2 },
        "dioxin": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cancer": { elem1:"rotten_meat", chance:0.1 },
        "plague": { elem1:"rotten_meat", elem2:null, chance:0.3 },
        "ant": { elem1:"rotten_meat", chance:0.1 },
        "worm": { elem1:"rotten_meat", chance:0.1 },
        "rat": { elem1:"rotten_meat", chance:0.3 },
        "mushroom_spore": { elem1:"rotten_meat", chance:0.1 },
        "mushroom_stalk": { elem1:"rotten_meat", chance:0.1 },
        "mercury": { elem1:"rotten_meat", elem2:null, chance:0.2 },
        "mercury_gas": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "virus": { elem1:"rotten_meat", chance:0.1 },
        "poison": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "infection": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "ink": { elem1:"rotten_meat", elem2:null, chance:0.1 },
        "acid": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "acid_gas": { elem1:"rotten_meat", chance:0.4 },
        "cyanide": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "cyanide_gas": { elem1:"rotten_meat", elem2:null, chance:0.5 },
        "rotten_cheese": { elem1:"rotten_meat", chance:0.02 },
        "water": { elem2:"broth", tempMin:70 },
        "salt_water": { elem2:"broth", tempMin:70 },
        "sugar_water": { elem2:"broth", tempMin:70 },
        "seltzer": { elem2:"broth", tempMin:70 },
        "salt": { elem1:"cured_meat" },
    },
    tempHigh: 300,
    stateHigh: "cooked_meat",
    tempLow: -18,
    stateLow: "frozen_meat",
    category:"food",
    burn:15,
    burnTime:200,
    burnInto:"ash",
    state: "solid",
    density: 1019.5,
    conduct: 0.2,
    isFood: true
}

elements.otherworldy_dirt = {
    color: ["#5b9878","#7c998a","#216f46","#437058", "#43524a","#656866", "#59695e"],
    behavior: behaviors.POWDER,
    tempHigh: 5600,
    category:"land",
    state: "solid",
    density: 8321,
    fireColor: ["#4259ff","#697aff","#5361ca"],
}

elements.liquid_fire = {
    color: ["#ff6b21","#ffa600","#ff4000"],
    behavior: behaviors.LIQUID,
    reactions: {
        "water": { elem1: "smoke" },
        "steam": { elem1: "smoke" },
        "carbon_dioxide": { elem1: "smoke" },
        "foam": { elem1: "smoke" },
        "dirty_water": { elem1: "smoke" },
        "salt_water": { elem1: "smoke" },
        "sugar_water": { elem1: "smoke" },
        "seltzer": { elem1: "smoke" },
        "pool_water": { elem1: "smoke" },
        "oxygen": { elem2: null, chance:0.1 },
    },
    temp:600,
    tempLow:100,
    stateLow: "smoke",
    tempHigh: 7000,
    stateHigh: "plasma",
    category: "special",
    state: "liquid",
    density: 0.1,
    ignoreAir: true,
    noMix: true
}

elements.unincinerate = {
    color: ["#e600ff","#d984d8","#ff00e1"],
    tool: function(pixel) {
        pixel.temp += -10000;
        if (!pixel.burning && elements[pixel.element].burn) {
            pixel.burning = true;
            pixel.burnStart = pixelTicks;
        }
        pixelTempCheck(pixel);
    },
    category: "tools",
    excludeRandom: true
}

elements.plasmageddon = {
    color: "#7f19a7",
    behavior: [
        "XX|XX|XX",
        "XX|EX:10>plasmageddon,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma%25 AND DL%10|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    hidden: true,
    excludeRandom: true,
    maxSize: 1,
    cooldown: defaultCooldown
}

elements.wetgeddon = {
    color: "#1953a6",
    behavior: [
        "XX|XX|XX",
        "XX|EX:10>wetgeddon,water,water,water,water,water,water,water,water,water,water,water,water%25 AND DL%2|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    hidden: true,
    excludeRandom: true,
    maxSize: 1,
    cooldown: defaultCooldown
}

elements.eternal_wetgeddon = {
    color: "#1953a6",
    behavior: [
        "XX|XX|XX",
        "XX|EX:10>eternal_wetgeddon,water_but_it_stays_liquid,water_but_it_stays_liquid,water_but_it_stays_liquid,water_but_it_stays_liquid,water_but_it_stays_liquid,water_but_it_stays_liquid,water_but_it_stays_liquid,water_but_it_stays_liquid,water_but_it_stays_liquid,water_but_it_stays_liquid,water_but_it_stays_liquid,water_but_it_stays_liquid%25 AND DL%2|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    hidden: true,
    excludeRandom: true,
    maxSize: 1,
    cooldown: defaultCooldown
}


elements.fast_armageddon = {
    color: "#a62900",
    behavior: [
        "XX|XX|XX",
        "XX|EX:10>armageddon,fire,fire,fire,fire,fire,fire,fire,fire,fire,fire,fire,fire%50 AND DL%10|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    hidden: true,
    excludeRandom: true,
    maxSize: 1,
    cooldown: defaultCooldown
}

elements.turtle = {
    color: ["#249f20", "#124e10"],
    behavior: [
        "SW:water%3|XX|SW:water%3",
        "M2%3|XX|M2%3",
        "SW:water%3|M1 AND CR:turtle_egg%0.05|SW:water%3",

    ],
    reactions: {
        "ash": { elem2:[null,null,null,null,null,null,null,null,null,null,"dirt"], chance:0.1, func:behaviors.FEEDPIXEL },
        "crumb": { elem2:[null,null,null,null,null,null,null,null,null,null,"dirt"], chance:0.1, func:behaviors.FEEDPIXEL },
        "sawdust": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "dust": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "rotten_meat": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "yolk": { elem2:null, chance:0.01, func:behaviors.FEEDPIXEL },
        "frog": { elem2:null, chance:0.04, func:behaviors.FEEDPIXEL },
        "tadpole": { elem2:null, chance:0.04, func:behaviors.FEEDPIXEL },
        "worm": { elem2:null, chance:0.04, func:behaviors.FEEDPIXEL },
        "snail": { elem2:null, chance:0.04, func:behaviors.FEEDPIXEL },
        "slug": { elem2:null, chance:0.04, func:behaviors.FEEDPIXEL },
        "fish": { elem2:null, chance:0.04, func:behaviors.FEEDPIXEL },
        "mudstone": { elem2:"dirt", chance:0.1 },
        "permafrost": { elem2:"dirt", chance:0.1 },
        "packed_sand": { elem2:"sand", chance:0.1 },
        "alcohol": { elem1:null, chance:0.005 },
    },
    tempHigh: 100,
    stateHigh: "ash",
    tempLow: 0,
    stateLow: "frozen_meat",
    category:"life",
    breakInto: ["crushed_shell", "blood"],
    burn:20,
    burnTime:50,
    state: "solid",
    density: 1050,
    conduct: 0.17
}

elements.baby_turtle = {
    color: ["#249f20", "#124e10"],
    behavior: [
        "SW:water%3|XX|SW:water%3",
        "M2%3|CH:turtle%0.01|M2%3",
        "SW:water%3|M1|SW:water%3",

    ],
    reactions: {
        "ash": { elem2:[null,null,null,null,null,null,null,null,null,null,"dirt"], chance:0.1, func:behaviors.FEEDPIXEL },
        "crumb": { elem2:[null,null,null,null,null,null,null,null,null,null,"dirt"], chance:0.1, func:behaviors.FEEDPIXEL },
        "sawdust": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "dust": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "rotten_meat": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "yolk": { elem2:null, chance:0.01, func:behaviors.FEEDPIXEL },
        "frog": { elem2:null, chance:0.04, func:behaviors.FEEDPIXEL },
        "tadpole": { elem2:null, chance:0.04, func:behaviors.FEEDPIXEL },
        "worm": { elem2:null, chance:0.04, func:behaviors.FEEDPIXEL },
        "snail": { elem2:null, chance:0.04, func:behaviors.FEEDPIXEL },
        "slug": { elem2:null, chance:0.04, func:behaviors.FEEDPIXEL },
        "fish": { elem2:null, chance:0.04, func:behaviors.FEEDPIXEL },
        "mudstone": { elem2:"dirt", chance:0.1 },
        "permafrost": { elem2:"dirt", chance:0.1 },
        "packed_sand": { elem2:"sand", chance:0.1 },
        "alcohol": { elem1:null, chance:0.005 },
    },
    tempHigh: 100,
    stateHigh: "ash",
    tempLow: 0,
    stateLow: "frozen_meat",
    category:"life",
    breakInto: ["crushed_shell", "blood"],
    burn:20,
    burnTime:50,
    state: "solid",
    density: 1050,
    conduct: 0.17
}

elements.shell = {
    color: ["#cca47c","#adbb63","#559d81","#d7a073","#d9b297"],
    behavior: behaviors.WALL,
    category: "solids",
    hardness: 0.2,
    noMix: false,
    breakInto: "crushed_shell"
}

elements.crushed_shell = {
    color: ["#cca47c","#adbb63","#559d81","#d7a073","#d9b297"],
    behavior: behaviors.POWDER,
    category: "powders",
    hardness: 0.2,
    noMix: false,
}

elements.turtle_egg = {
    color: ["#a9c7ce","#83c1cf"],
    behavior: behaviors.SUPPORTPOWDER , behavior: [
        "XX|XX|XX",
        "XX|CH:baby_turtle%0.02|XX",
        "XX|M1|XX",
    ],
    category: "life",
    hardness: 0.2,
    noMix: false,
    breakInto: "crushed_shell"
}

elements.radium = {
    color: ["#d9d9d9", "#d0d0d0", "#b3b3b3"],
    behavior: [
        "XX|CR:radiation%1000000|XX",
        "CR:radiation%1000000|CH:lead%0.001|CR:radiation%1000000",
        "M2|M1|M2",
    ],
    reactions: {
        "neutron": { elem1:"n_explosion", tempMin:700, chance:0.1 }
    },
    tempHigh: 1132.2,
    category: "powders",
    state: "solid",
    density: 5500,
    hardness: 0.45,
    conduct: 0.235,
    excludeRandom: true
}

elements.unbreakable_battery = {
    color: "#9d8725",
    behavior: [
        "XX|SH|XX",
        "SH|XX|SH",
        "XX|SH|XX",
    ],
    category: "machines",
    hardness: 1
}

elements.diamond_wall = {
    color: ["#03fcec","#03c6fc","#b3eeff","#8ab0e6"],
    behavior: behaviors.WALL,
    category: "solids",
    tempHigh: 900,
    stateHigh: "carbon_dioxide",
    state: "solid",
    density: 3515,
    hardness: 0.99,
    breakInto: "diamond"
}

elements.osmium = {
    color: ["#bddee4","#a7c3c8","#98b3b7"],
    behavior: behaviors.WALL,
    category: "solids",
    tempHigh: 3033,
    state: "solid",
    density: 3515,
    hardness: 0.7,
    breakInto: "osmium_shard"
}

elements.osmium_shard = {
    color: ["#bddee4","#a7c3c8","#98b3b7"],
    behavior: behaviors.POWDER,
    category: "powders",
    tempHigh: 3033,
    state: "solid",
    density: 3515,
    hardness: 0.7,
}

elements.copper_scrap = {
    color: ["#a95232","#be4322","#c76035"],
    behavior: behaviors.POWDER,
    reactions: {
        "blood": { elem1:"oxidized_copper_scrap", chance:0.003 },
        "infection": { elem1:"oxidized_copper_scrap", chance:0.003 },
        "antibody": { elem1:"oxidized_copper_scrap", chance:0.003 },
        "fire": { elem1:"oxidized_copper_scrap", chance:0.0025 },
    },
    category: "powders",
    tempHigh: 1085,
    density: 8960,
    conduct: 0.95,
    hardness: 0.3,
    fireColor: ["#07BA4F","#00BC5B","#00C2A9","#11B7E7","#C6F2EC"]
}

elements.oxidized_copper_scrap = {
    color: ["#406555","#42564a","#517364"],
    behavior: behaviors.POWDER,
    reactions: {
        "hydrogen": {tempMin:900, elem1:"copper_scrap", elem2:"steam"}
    },
    category: "powders",
    hidden: true,
    tempHigh: 1085,
    stateHigh: "molten_copper",
    density: 8960,
    conduct: 0.85,
    hardness: 0.2,
    alias: "copper carbonate"
}

elements.cleaning_solution = {
    color: "#5894e9",
    behavior: behaviors.LIQUID,
    reactions: {
        "milk": { elem1: null, elem2: "cheese" },
        "pilk": { elem1: null, elem2: "cheese", color2:"#c48a25" },
        "fruit_milk": { elem1: null, elem2: "cheese", color2:"#c2864e" },
        "chocolate_milk": { elem1: null, elem2: "cheese", color2:"#6b4000" },
        "eggnog": { elem1: null, elem2: "cheese", color2:"#ffdb63" },
        "nut_milk": { elem1: null, elem2: "cheese", color2:"#ded0ad" },
        "yogurt": { elem1: null, elem2: "cheese" },
        "baking_soda": { elem1: "sodium_acetate", elem2: "carbon_dioxide", attr1:{"foam":20} },
        "limestone": { elem1: "sodium_acetate", elem2: "carbon_dioxide", attr1:{"foam":5} },
        "rust": { elem2:"iron", chance:0.05 },
        "oxidized_copper": { elem2:"copper", chance:0.05 },
        "egg": { elem2:"yolk", chance:0.0005 },
        "yolk": { elem1:"mayo", elem2:"mayo", chance:0.1 },
        "mushroom_spore": { elem2:null, chance:0.05 },
        "mushroom_gill": { elem2:null, chance:0.05 },
        "mushroom_cap": { elem2:null, chance:0.05 },
        "pollen": { elem2:null, chance:0.05 },
        "salt": { elem1: null, elem2: "sodium_acetate", chance:0.05 },
        "lettuce": { elem2:"pickle", chance:0.01 },
        "egg": { elem2:"pickle", color2:"#e0e0ab", chance:0.01 },
        "tomato": { elem2:"pickle", color2:"#fa6e11", chance:0.01 },
        "grape": { elem2:"pickle", color2:"#b86a4b", chance:0.01 },
        "pumpkin": { elem2:"pickle", color2:"#ffa42e", chance:0.01 },
        "dirt": { elem1: null, elem2: "mud" },
        "sand": { elem1: null, elem2: "wet_sand" },
        "clay_soil": { elem1: null, elem2: "clay" },
    },
    viscosity: 12,
    tempHigh: 100.6,
    stateHigh: ["steam","carbon_dioxide","methane"],
    tempLow: -2.22,
    stateLowName: "frozen_cleaning_solution",
    category: "liquids",
    state: "liquid",
    density: 1006,
    stain: -1.05
}

elements.abs_zero = {
    color: "#a2ddff",
    tool: function(pixel) {
        pixel.temp = absoluteZero
        pixelTempCheck(pixel);
    },
    category: "tools",
    excludeRandom: true
}

elements.firedoesntwork = {
    color: "#c44f45",
    tick: function(pixel) {
        if ((pixel.temp > absoluteZero || pixel.charge) && !pixel.burning) {
            pixel.burning = true;
            pixel.burnStart = pixelTicks;
        }
        if (pixel.burning) {
            if (!tryMove(pixel, pixel.x, pixel.y-1)) {
                // tryMove again to the top left or top right
                tryMove(pixel, pixel.x+(Math.random() < 0.5 ? -1 : 1), pixel.y-1);
            }
            if (pixelTicks-pixel.burnStart > 50 && Math.random() < 0.1) {
                explodeAt(pixel.x, pixel.y, 10, "fw_ember");
            }
        }
        else {
            if (!tryMove(pixel, pixel.x, pixel.y+1)) {
                // tryMove again to the bottom left or bottom right
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
    category: "weapons"
}

elements.blue_firework = {
    color: "#5aa5e0",
    tick: function(pixel) {
        if ((pixel.temp > 1000 || pixel.charge) && !pixel.burning) {
            pixel.burning = true;
            pixel.burnStart = pixelTicks;
        }
        if (pixel.burning) {
            if (!tryMove(pixel, pixel.x, pixel.y-1)) {
                // tryMove again to the top left or top right
                tryMove(pixel, pixel.x+(Math.random() < 0.5 ? -1 : 1), pixel.y-1);
            }
            if (pixelTicks-pixel.burnStart > 50 && Math.random() < 0.1) {
                explodeAt(pixel.x, pixel.y, 10, "blue_fw_ember");
            }
        }
        else {
            if (!tryMove(pixel, pixel.x, pixel.y+1)) {
                // tryMove again to the bottom left or bottom right
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
    category: "weapons"
}

elements.blue_fw_ember = {
    color: ["#ff7a70","#ff9b70","#ffe270","#94ff70","#00ffff","#9b70ff","#ffa8d2"],
    behavior: [
        "XX|XX|XX",
        "XX|DL%12.5|M2",
        "XX|M2|M1",
    ],
    burning: true,
    burnInto: "ash",
    fireElement: "carbon_dioxide",
    rotatable: true,
    temp: 1870,
    tempLow: 0,
    stateLow: "carbon_dioxide",
    category: "energy",
    hidden: true,
    state: "gas",
    density: 700,
    alias: "blue firework ember"
}

elements.yogurt_engine = {
    color: "#f0eff6",
    behavior: behaviors.WALL,
    state: "solid",
    density: 1000,
    category: "machines",
    properties: {
      shocksToDo: 0
    },
    hoverStat: function(pixel){return pixel.shocksToDo || 0},
    tick: function(pixel){
      if (pixel.shocksToDo <= 40){
      for (var i = 0; i < adjacentCoords.length; i++){
        var coord = adjacentCoords[i]
        var x = pixel.x + coord[0]
        var y = pixel.y + coord[1]
        if (!isEmpty(x, y, true)){
          var otherPixel = pixelMap[x][y]
          if (otherPixel.element == "yogurt"){
            deletePixel(x, y)
            if(!pixel.shocksToDo){pixel.shocksToDo = 0}
            pixel.shocksToDo += 5
          }
          else if (otherPixel.element == "yogurt_engine"){
            var otherPixel = pixelMap[x][y]
            var otherShock = otherPixel.shocksToDo || 0
            var currentShock = pixel.shocksToDo || 0
            if (otherShock > currentShock){
              otherPixel.shocksToDo --
              pixel.shocksToDo ++
            } else if (currentShock > otherShock) {
              otherPixel.shocksToDo ++
              pixel.shocksToDo --
            }
          }
        }
      }}
      if (!pixel.charge && !pixel.chargeCD && pixel.shocksToDo){
        for (var i = 0; i < adjacentCoords.length; i++){
          var coord = adjacentCoords[i]
          var x = pixel.x + coord[0]
          var y = pixel.y + coord[1]
          if (!isEmpty(x, y, true)){
            if (elements[pixelMap[x][y].element].conduct > 0){
              pixel.charge = 1
              pixel.shocksToDo --
              break;
            }
          }
        }
      }
    }
  }

elements.bulletproof_glass = {
    color: ["#5e807d","#5e807d","#679e99","#5e807d","#5e807d"],
    colorPattern: textures.GLASS,
    colorKey: {
        "g": "#5e807d",
        "s": "#638f8b",
        "S": "#679e99"},
    behavior: behaviors.WALL,
    tempHigh: 17500,
    category: "solids",
    state: "solid",
    density: 2500,
    noMix: true,
    hardness: 0.8
}

elements.sloil = {
    color: "#497300",
    behavior: behaviors.LIQUID,
    viscosity: 5250,
    tempHigh: 120,
    stateHigh: "steam",
    tempLow: 0,
    category:"liquids",
    state: "liquid",
    density: 1450,
    stain: 0.1
}

elements.rightbullet = {
    color: "#823d30",
    behavior: [
        "XX|XX|XX",
        "XX|XX|M1 AND EX:4",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.leftbullet = {
    color: "#823d30",
    behavior: [
        "XX|XX|XX",
        "M1 AND EX:4|XX|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.right_fastbullet = {
    color: "#823d30",
    behavior: [
        "XX|XX|XX",
        "XX|XX|M1 AND EX:4",
        "XX|XX|XX",
    ],
    category: "weapons",
    tick: function(pixel){
        tryMove(pixel, pixel.x+1, pixel.y)
        tryMove(pixel, pixel.x+1, pixel.y) 
      },
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.left_fastbullet = {
    color: "#823d30",
    behavior: [
        "XX|XX|XX",
        "EX:4 AND M1|XX|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    tick: function(pixel){
        tryMove(pixel, pixel.x-1, pixel.y)
        tryMove(pixel, pixel.x-1, pixel.y) 
      },
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.right_strongbullet = {
    color: "#823d30",
    behavior: [
        "XX|XX|XX",
        "XX|XX|M1 AND EX:8",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.left_strongbullet = {
    color: "#823d30",
    behavior: [
        "XX|XX|XX",
        "M1 AND EX:8|XX|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.right_powerfulbullet = {
    color: "#823d30",
    behavior: [
        "XX|XX|XX",
        "XX|XX|M1 AND EX:16",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.left_powerfulbullet = {
    color: "#823d30",
    behavior: [
        "XX|XX|XX",
        "M1 AND EX:16|XX|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.right_strongestbullet = {
    color: "#823d30",
    behavior: [
        "XX|XX|XX",
        "XX|XX|M1 AND EX:512",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.left_strongestbullet = {
    color: "#823d30",
    behavior: [
        "XX|XX|XX",
        "M1 AND EX:512|XX|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.right_lightning_bullet = {
    color: "#823d30",
    behavior: [
        "XX|XX|XX",
        "XX|XX|M1 AND EX:30>lightning",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.left_lightning_bullet = {
    color: "#823d30",
    behavior: [
        "XX|XX|XX",
        "M1 AND EX:16>lightning|XX|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.right_nuclear_bullet = {
    color: "#823d30",
    behavior: [
        "XX|XX|XX",
        "XX|XX|M1 AND EX:30>n_explosion",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.left_nuclear_bullet = {
    color: "#823d30",
    behavior: [
        "XX|XX|XX",
        "M1 AND EX:16>n_explosion|XX|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.strong_human = {
    // color: ["#f5eac6","#d4c594","#a89160","#7a5733","#523018","#361e0e"],
    color: ["#f3e7db","#f7ead0","#eadaba","#d7bd96","#a07e56","#825c43","#604134","#3a312a"],
    category: "life",
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            createPixel("s_body", pixel.x, pixel.y+1);
            pixel.element = "s_head";
        }
        else if (isEmpty(pixel.x, pixel.y-1)) {
            createPixel("s_head", pixel.x, pixel.y-1);
            pixelMap[pixel.x][pixel.y-1].color = pixel.color;
            pixel.element = "s_body";
            pixel.color = pixelColorPick(pixel)
        }
        else {
            deletePixel(pixel.x, pixel.y);
        }
    },
    related: ["s_body","s_head"],
    cooldown: defaultCooldown,
    forceSaveColor: true,
}

elements.s_body = {
    color: ["#069469","#047e99","#7f5fb0"],
    category: "life",
    hidden: true,
    density: 1500,
    state: "solid",
    conduct: .05,
    temp: 37,
    forceSaveColor: true,
    hardness: 1,
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
            if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
                var headpixel = pixelMap[pixel.x][pixel.y-2];
                if (headpixel.element == "s_head") {
                    if (isEmpty(pixel.x, pixel.y-1)) {
                        movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
                    }
                }
            }
        }
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            // Turn into rotten_meat if pixelTicks-dead > 500
            if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
                changePixel(pixel,"rotten_meat");
            }
            return
        }

        // Find the head
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "s_head") {
            var head = pixelMap[pixel.x][pixel.y-1];
            if (head.dead) { // If head is dead, kill body
                pixel.dead = head.dead;
            }
        }
        else { var head = null }
        if (pixel.burning) {
            pixel.panic += 0.1;
            if (head && pixelTicks-pixel.burnStart > 240) {
                pixel.color = head.color;
            }
        }
        else if (pixel.panic > 0) {
            pixel.panic -= 0.1;
        }

        if (isEmpty(pixel.x, pixel.y-1)) {
            // create blood if decapitated 10% chance
            if (Math.random() < 0.1 && !pixel.charge) {
                createPixel("blood", pixel.x, pixel.y-1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
        else if (head == null) { return }
        else if (Math.random() < 0.1*(isEmpty(pixel.x, pixel.y+1) ? 1 : pixel.panic+1)) { // Move 10% chance
            var movesToTry = [
                [1*pixel.dir,0],
                [1*pixel.dir,-1],
            ];
            // While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
                    var origx = pixel.x+move[0];
                    var origy = pixel.y+move[1];
                    if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
                        movePixel(head, head.x+move[0], head.y+move[1]);
                        break;
                    }
                }
            }
            // 15% chance to change direction
            if (Math.random() < 0.15) {
                pixel.dir *= -1;
            }
            // homeostasis
            if (pixel.temp > 37) { pixel.temp -= 1; }
            else if (pixel.temp < 37) { pixel.temp += 1; }
        }

    }
}

elements.s_head = {
    color: ["#f3e7db","#f7ead0","#eadaba","#d7bd96","#a07e56","#825c43","#604134","#3a312a"],
    category: "life",
    hidden: true,
    density: 1080,
    state: "solid",
    conduct: .05,
    temp: 37,
    hardness: 1,
    forceSaveColor: true,
    properties: {
        dead: false
    },
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            // Turn into rotten_meat if pixelTicks-dead > 500
            if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
                changePixel(pixel,"rotten_meat");
                return
            }
        }

        // Find the body
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "s_body") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) { // If body is dead, kill head
                pixel.dead = body.dead;
            }
        }
        else { var body = null }

        if (tryMove(pixel, pixel.x, pixel.y+1)) {
            // create blood if severed 10% chance
            if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1 && !pixel.charge) {
                createPixel("blood", pixel.x, pixel.y+1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
        // homeostasis
        if (pixel.temp > 37) { pixel.temp -= 1; }
        else if (pixel.temp < 37) { pixel.temp += 1; }
    }
}

elements.super_cloner ={
    color: "#dddd00",
    behavior: [
        "CF|CF|CF",
        "CF|XX|CF",
        "CF|CF|CF",
    ],
    ignore: ["ecloner","slow_cloner","clone_powder","floating_cloner","wall","ewall", "cloner", "mega_cloner", "ultra_cloner"],
    category:"machines",
    insulate:true,
    hardness: 1,
    darkText: true,
}

elements.mega_cloner ={
    color: "#dddd00",
    behavior: [
        "CF|CF|CF|CF|CF",
        "CF|CF|CF|CF|CF",
        "CF|CF|XX|CF|CF",
        "CF|CF|CF|CF|CF",
        "CF|CF|CF|CF|CF",
    ],
    ignore: ["ecloner","slow_cloner","clone_powder","floating_cloner","wall","ewall", "super_cloner", "cloner", "ultra_cloner"],
    category:"machines",
    insulate:true,
    hardness: 1,
    darkText: true,
}

elements.ultra_cloner ={
    color: "#dddd00",
    behavior: [
        "CF|CF|CF|CF|CF|CF|CF|CF|CF",
        "CF|CF|CF|CF|CF|CF|CF|CF|CF",
        "CF|CF|CF|CF|CF|CF|CF|CF|CF",
        "CF|CF|CF|CF|CF|CF|CF|CF|CF",
        "CF|CF|CF|CF|XX|CF|CF|CF|CF",
        "CF|CF|CF|CF|CF|CF|CF|CF|CF",
        "CF|CF|CF|CF|CF|CF|CF|CF|CF",
        "CF|CF|CF|CF|CF|CF|CF|CF|CF",
        "CF|CF|CF|CF|CF|CF|CF|CF|CF",
    ],
    ignore: ["ecloner","slow_cloner","clone_powder","floating_cloner","wall","ewall", "mega_cloner", "super_cloner", "cloner"
    ],
    category:"machines",
    insulate:true,
    hardness: 1,
    darkText: true,
}

elements.magma_bomb = {
    color: "#f13e62",
    behavior: [
        "XX|EX:15>magma|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:15>magma|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

if (!elements.sand.reactions) { elements.sand.reactions = {} }
elements.sand.reactions.dirt = { elem1:"dirty_sand", elem2:"dirty_sand" }

if (!elements.mud.reactions) { elements.mud.reactions = {} }
elements.mud.reactions.water = { elem1:"muddy_water", elem2:"muddy_water" }

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

runAfterAutogen(() => {
    if (!elements.molten_steel.reactions) { elements.molten_steel.reactions = {} }
    elements.molten_steel.reactions.gullibullium = { elem1:"r_gullibullium", elem2:"r_gullibullium" }  
  })

  runAfterAutogen(() => {
    if (!elements.molten_sulfur.reactions) { elements.molten_sulfur.reactions = {} }
    elements.molten_sulfur.reactions.silvanium = { elem1:"silvanium_sulfate", elem2:"silvanium_sulfate" }  
  })

  runAfterAutogen(() => {
    if (!elements.molten_silvanium.reactions) { elements.molten_silvanium.reactions = {} }
    elements.molten_silvanium.reactions.molten_alienite = { elem1:"silvanium_alite", elem2:"silvanium_alite" }  
  })


if (!elements.wall.reactions) { elements.wall.reactions = {} }
elements.wall.reactions.plasma3 = { elem1:"plasma3", elem2:"plasma3" }

if (!elements.wall.reactions) { elements.wall.reactions = {} }
elements.wall.reactions.plasma4 = { elem1:"plasma4", elem2:"plasma4" }

if (!elements.wall.reactions) { elements.wall.reactions = {} }
elements.wall.reactions.ultimate_plasma = { elem1:"ultimate_plasma", elem2:"ultimate_plasma" }

if (!elements.reinforced_wall.reactions) { elements.reinforced_wall.reactions = {} }
elements.reinforced_wall.reactions.plasma3 = { elem1:"plasma3", elem2:"plasma3" }

if (!elements.reinforced_wall.reactions) { elements.reinforced_wall.reactions = {} }
elements.reinforced_wall.reactions.plasma4 = { elem1:"plasma4", elem2:"plasma4" }

if (!elements.reinforced_liquid_wall.reactions) { elements.reinforced_liquid_wall.reactions = {} }
elements.reinforced_liquid_wall.reactions.plasma3 = { elem1:"plasma3", elem2:"plasma3" }

if (!elements.reinforced_liquid_wall.reactions) { elements.reinforced_liquid_wall.reactions = {} }
elements.reinforced_liquid_wall.reactions.plasma4 = { elem1:"plasma4", elem2:"plasma4" }

if (!elements.reinforced_wall.reactions) { elements.reinforced_wall.reactions = {} }
elements.reinforced_wall.reactions.ultimate_plasma = { elem1:"ultimate_plasma", elem2:"ultimate_plasma" }

if (!elements.reinforced_liquid_wall.reactions) { elements.reinforced_liquid_wall.reactions = {} }
elements.reinforced_liquid_wall.reactions.ultimate_plasma = { elem1:"ultimate_plasma", elem2:"ultimate_plasma" }

if (!elements.whenyouium.reactions) { elements.whenyouium.reactions = {} }
elements.whenyouium.reactions.when_you_particles = { elem1:"when_you_particles", elem2:"when_you_particles" }

if (!elements.when_iium.reactions) { elements.when_iium.reactions = {} }
elements.when_iium.reactions.when_i_particles = { elem1:"when_i_particles", elem2:"when_i_particles" }

if (!elements.ash.reactions) { elements.ash.reactions = {} }
elements.ash.reactions.dust = { elem1:"dusty_ash", elem2:"dusty_ash" }

if (!elements.vinegar.reactions) { elements.vinegar.reactions = {} }
elements.vinegar.reactions.alchohol = { elem1:"cleaning_solution", elem2:"cleaning_solution" }

elements.steel.hardness = 0.85

elements.uncharge.category = "tools"

elements.incinerate.category = "tools"

elements.room_temp.category = "tools"

elements.heat_ray.category = "rays"

elements.battery.breakInto = "explosion"

elements.oxidized_copper.category = "solids"

elements.oxidized_copper.behavior = behaviors.SOLID

elements.oxidized_copper.breakInto = "oxidized_copper_scrap"

elements.cloner.ignore = ["ecloner","slow_cloner","clone_powder","floating_cloner","wall","ewall", "mega_cloner", "super_cloner", "ultra_cloner"
],

elements.head.properties = {dead:false,age: 0}
elements.head.tick = function(pixel) {
    pixel.age = (pixel.age||0) + 1
        
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            // Turn into rotten_meat if pixelTicks-dead > 500
            if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
                changePixel(pixel,"rotten_meat");
                return
            }
        }

        // Find the body
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) { // If body is dead, kill head
                pixel.dead = body.dead;
            }
        }
        else { var body = null }

        if (tryMove(pixel, pixel.x, pixel.y+1)) {
            // create blood if severed 10% chance
            if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1 && !pixel.charge) {
                createPixel("blood", pixel.x, pixel.y+1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
        // homeostasis
        if (pixel.temp > 37) { pixel.temp -= 1; }
        else if (pixel.temp < 37) { pixel.temp += 1; }
    }
elements.oil.reactions = {
    "dirt": { elem1:null, elem2:"mud" },
    "sand": { elem1:null, elem2:"wet_sand" },
    "sulfur": { elem1:null, elem2:"greek_fire" },
    "molten_sulfur": { elem1:"greek_fire", elem2:"greek_fire" },
    "slime": { elem1:"sloil"
    }
}

elements.head.hoverStat= function(pixel) { return "age " + pixel.age },

elements.body.color = ["#069469","#047e99","#7f5fb0", "#e85858", "#e8ac58", "#e8cc47", "#48e84e", "#48e7e8", "#488be8", "#9312e8", "#e8136e", "#8e492d"]

elements.room_temp.tools = function(pixel) {
    pixel.temp = (pixel.temp+20)/200;
    pixelTempCheck(pixel);
}


// important colors: ["#000000", "#edff00", "#3a3a3a", "#ff0000"], ["#82c0ff", "#ff8282"], ["#cca77c","#ad8b63","#b59d81","#c7a073","#c9b297"],