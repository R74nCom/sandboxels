// by 𝔜𝔒𝔖𝔈𝔉
//penguins.js v4.0 are the last update (for the moment) enjoy with the mod (:

//v 1.0 some ice animals
elements.penguin = {
    name: "penguin",
    color: ["#0c0c12","#babae3","#02022e","#d2d2fc","#000000","#5946f0","#5b5b5c","#95a7c4","#f5f17f","#723911"],
    state: "solid",
    behavior: [
        "XX|SW:water,salt_water,sugar_water,dirty_water%10|XX",
        "BO:polar_bear,polar_bear_cub,killer_whale%50|FX%1|M1 AND SW:water,salt_water,sugar_water,dirty_water%15 AND BO:polar_bear,polar_bear_cub,killer_whale%40",
        "M2|M1|M1 AND SW:water,salt_water,sugar_water,dirty_water%15"
    ],
    reactions: {
        "meat": { elem2:null, chance:0.2 },
        "cooked_meat": { elem2:null, chance:0.2 },
        "fish": { elem2:null, chance:0.2 },
        "plant": { elem2:null, chance:0.2 },
        "frozen_fish": { elem2:null, chance:0.3 },
        "herring": { elem2:null, chance:0.3 },
        "oxygen": { elem2:"carbon_dioxide", chance:0.3 },
        "poison": { elem1:"rotten_meat", chance:0.1 },
        "bleach": { elem1:"rotten_meat", chance:0.1 },
        "infection": { elem1:"rotten_meat", chance:0.025 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cyanide": { elem1:"rotten_meat", chance:0.1 },
        "chlorine": { elem1:"meat", chance:0.1 },
        "alcohol": { elem1:"meat", chance:0.025 },
        "dirty_water": { elem1:"rotten_meat", chance:0.0001 },
        "pool_water": { elem1:"rotten_meat", chance:0.005 },
        "vinegar": { elem1:"rotten_meat", chance:0.001 }

    },
    egg: "little_penguin", 
    foodNeed: 10,
    temp: 30,
    tempHigh: 1000,
    stateHigh: "frozen_penguin",
    tempLow: -210,
    stateLow: "frozen_penguin",
    category:"life",
    breakInto: "rotten_meat",
    burn:15,
    burnTime:300,
    density: 1450,
    conduct: 0.2
};

elements.little_penguin = {
    name: "little penguin",
    color: ["#e0e0e0","#cad7ed","#4e6282","#373f4a","#fff6a8","#723911"],
    state: "solid",
    behavior: [
        "XX|SW:water,salt_water,sugar_water,dirty_water%10|XX",
        "BO:polar_bear,polar_bear_cub,killer_whale%60|FX%1|M1 AND SW:water,salt_water,sugar_water,dirty_water%15 AND BO:polar_bear,polar_bear_cub,killer_whale%50",
        "M2|M1|M1 AND SW:water,salt_water,sugar_water,dirty_water%15"
    ],
    reactions: {
        "meat": { elem2:null, chance:0.2 },
        "cooked_meat": { elem2:null, chance:0.2 },
        "fish": { elem2:null, chance:0.2 },
        "frozen_fish": { elem2:null, chance:0.3 },
        "herring": { elem2:null, chance:0.3 },
        "oxygen": { elem2:"carbon_dioxide", chance:0.3 },
        "poison": { elem1:"rotten_meat", chance:0.1 },
        "bleach": { elem1:"rotten_meat", chance:0.1 },
        "infection": { elem1:"rotten_meat", chance:0.025 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cyanide": { elem1:"rotten_meat", chance:0.1 },
        "chlorine": { elem1:"meat", chance:0.1 },
        "alcohol": { elem1:"meat", chance:0.025 },
        "dirty_water": { elem1:"rotten_meat", chance:0.0001 },
        "pool_water": { elem1:"rotten_meat", chance:0.005 },
        "vinegar": { elem1:"rotten_meat", chance:0.001 }
    },
    egg: "little_penguin",
    foodNeed: 10,
    temp: 30,
    tempHigh: 100,
    stateHigh: "frozen_little_penguin",
    tempLow: -100,
    stateLow: "frozen_little_penguin",
    category:"life",
    breakInto: "rotten_meat",
    burn:15,
    burnTime:300,
    density: 1450,
    conduct: 0.2
};

elements.polar_bear = {
    color: ["#ffffff", "#f0f0f0", "#e3e3e3", "#111111"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "AT:penguin,little_penguin,seal,rat%35|FX%1|M1 AND AT:penguin,little_penguin,seal,rat%25",
        "M2|M1|M1"
    ],
    ignore: ["polar_bear", "polar_bear_cub"],
    reactions: {
        "fish": { elem2: null, chance: 0.2 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 },
        "bleach": { elem1: "rotten_meat", chance: 0.1 },
        "infection": { elem1: "rotten_meat", chance: 0.025 },
        "herring": { elem2: null, chance: 0.3 },
        "penguin": { elem2: null, chance: 0.3 },
        "seal": { elem2: null, chance: 0.3 },
        "little_penguin": { elem2: null, chance: 0.3 }
    },
    foodNeed: 15,
    temp: 31,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -150,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 250,
    density: 1500,
    conduct: 0.2
};

elements.polar_bear_cub = {
    color: ["#ffffff", "#f5f5f5"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "AT:penguin,little_penguin,rat%20|FX%1|M1 AND AT:penguin,little_penguin,rat%15",
        "M2|M1|M1"
    ],
    ignore: ["polar_bear", "polar_bear_cub"],
    reactions: {
        "fish": { elem2: null, chance: 0.2 },
        "herring": { elem2: null, chance: 0.2 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 }
    },
    baby: "polar_bear",
    foodNeed: 8,
    temp: 31,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 250,
    density: 1480,
    conduct: 0.2
};

elements.seal = {
    color: ["#7a7a7a", "#5c5c5c", "#a1a1a1", "#0f0f0f", "#dbd5d5", "#7d5a40"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "BO:polar_bear,polar_bear_cub,killer_whale%60|FX%1|M1 AND BO:polar_bear,polar_bear_cub,killer_whale%40",
        "M2|M1|M1"
    ],
    reactions: {
        "fish": { elem2: null, chance: 0.25 },
        "frozen_fish": { elem2: null, chance: 0.3 },
        "herring": { elem2: null, chance: 0.3 },
        "algae": { elem2: null, chance: 0.3 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    egg: "seal",
    foodNeed: 12,
    temp: 35,
    tempHigh: 90,
    stateHigh: "cooked_meat",
    tempLow: -120,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 280,
    density: 1350,
    conduct: 0.2
};

elements.seal_pup = {
    name: "seal pup",
    color: [
        "#ffffff", "#fbfbfb", "#f7f7f7", "#f4f4f6", "#f0f0f2", 
        "#edf0f2", "#e5e9ec", "#e1e5e8", "#dcdfe3", "#edeae6", 
        "#f5f2eb", "#eae6df", "#e3ded7", "#ded9d0", "#d4cec4",
        "#ccc6be", "#c4bcb5"
    ],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "BO:polar_bear,polar_bear_cub,killer_whale,arctic_wolf,inuit_body%80|FX%1|M1%35 AND BO:polar_bear,polar_bear_cub,killer_whale,arctic_wolf,inuit_body%60",
        "M2%30|M1%35|M1%35"
    ],
    ignore: ["seal", "seal_pup"],
    reactions: {
        "algae": { elem2: null, chance: 0.15 },
        "herring": { elem2: null, chance: 0.15 },
        "frozen_fish": { elem2: null, chance: 0.15 },
        "fish": { elem2: null, chance: 0.1 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    baby: "seal",
    foodNeed: 6,
    temp: 35,
    tempHigh: 85,
    stateHigh: "cooked_meat",
    tempLow: -130,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 12,
    burnTime: 240,
    density: 1250,
    conduct: 0.22
};

elements.killer_whale = {
    color: ["#0a0a0f", "#030305", "#ffffff", "#d6d6d6"],
    state: "solid",
    behavior: [
        "XX|M2%5 AND SW:water,salt_water,sugar_water,seltzer,pool_water,primordial_soup%14|XX",
        "AT:penguin,little_penguin,seal,polar_bear,polar_bear_cub,rat,herring,narwhal,clam%40 AND SW:water,salt_water,sugar_water,seltzer,pool_water,primordial_soup%30|FX%0.5|AT:penguin,little_penguin,seal,polar_bear,polar_bear_cub,rat,seal_pup%30 AND SW:water,salt_water,sugar_water,seltzer,pool_water,primordial_soup%30",
        "M2|XX|M2 AND SW:water,salt_water,sugar_water,seltzer,pool_water,primordial_soup%5"
    ],
    ignore: ["killer_whale"],
    reactions: {
        "fish": { elem2: null, chance: 0.3 },
        "herring": { elem2: null, chance: 0.3 },
        "penguin": { elem2: null, chance: 0.3 },
        "seal": { elem2: null, chance: 0.3 },
        "seal_pup": { elem2: null, chance: 0.3 },
        "little_penguin": { elem2: null, chance: 0.3 },
        "clam": { elem2: null, chance: 0.3 },
        "narwhal": { elem2: null, chance: 0.3 },
        "walrus": { elem2: null, chance: 0.3 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 }
    },
    category: "life",
    foodNeed: 20,
    temp: 36,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -80,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 200,
    density: 1026,
    conduct: 0.1
};

elements.herring = {
    color: ["#C0C0C0", "#6a8085", "#b0b7bc"],  
    state: "solid",
    behavior: [
         "XX|M2%5|SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%14",
         "XX|FX%0.5|BO",
         "M2|M1|M2 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%5"
    ], 
    ignore: ["herring"],  
    reactions: {
        "algae": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "grass": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "fish": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "plant": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.3 },
        "poison": { elem1:"rotten_meat", chance:0.1 },
        "bleach": { elem1:"rotten_meat", chance:0.1 }
    },
    category: "life",
    foodNeed: 4,
    temp: 10,
    tempHigh: 55,
    stateHigh: "cooked_meat",
    tempLow: -15,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 10,
    burnTime: 180,
    density: 1015,
    conduct: 0.15
};


elements.frozen_penguin = {
    color: ["#a1c1e0", "#0c0c12", "#84a9cc"], 
    state: "solid",
    behavior: behaviors.WALL, 
    category: "ice solids",
    density: 917,
    temp: 1005,               
    tempLow: 0,
    stateLow: "penguin",      
    conduct: 0.1
};

elements.frozen_little_penguin = {
    color: ["#cad7ed", "#e0e0e0", "#4e6282"], 
    state: "solid",
    behavior: behaviors.WALL, 
    category: "ice solids",
    density: 917,
    temp: 105,                
    tempLow: 0,
    stateLow: "little_penguin", 
    conduct: 0.1
};

//v 2.0 fixed bugs and another some animals
elements.clam = {
    color: ["#d1c7bd", "#a89b8d", "#ede6de"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "XX|FX%0.1 AND M1 AND SW:water,salt_water,sugar_water%100|XX",
        "M2|XX|M2"
    ],
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.1 },
        "poison": { elem1: "rotten_meat", chance: 0.2 }
    },
    category: "life",
    foodNeed: 2,
    temp: 8,
    tempHigh: 50,
    stateHigh: "cooked_meat",
    tempLow: -20,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};

elements.walrus = {
    color: ["#634a3b", "#7c604f", "#4f3729", "#bda698"],
    state: "solid",
    behavior: [
        "XX|SW:water,salt_water,sugar_water%5|XX",
        "BO:polar_bear,killer_whale%40|FX%1|M1 AND SW:water,salt_water,sugar_water%10 AND BO:polar_bear,killer_whale%20",
        "M2|M1|M1 AND SW:water,salt_water,sugar_water%10"
    ],
    reactions: {
        "algae": { elem2: null, chance: 0.25 },
        "herring": { elem2: null, chance: 0.25 },
        "clam": { elem2: null, chance: 0.35 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 },
        "fish": { elem2: null, chance: 0.3 },
        "plant": { elem2: null, chance: 0.3 }
    },
    egg: "walrus",
    foodNeed: 14,
    temp: 36,
    tempHigh: 85,
    stateHigh: "cooked_meat",
    tempLow: -130,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 260,
    density: 1200,
    conduct: 0.18
};

elements.arctic_wolf = {
    color: ["#fcfcfc", "#eaeaea", "#d3d3d3", "#b5b5b5"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "AT:penguin,little_penguin,rat,rabbit,seal%40 AND BO:polar_bear%40|FX%1|M1%80 AND AT:penguin,little_penguin,rat,rabbit,seal%30 AND BO:polar_bear%30",
        "M2%50|M1%80|M1%80"
    ],
    ignore: ["arctic_wolf"],
    reactions: {
        "meat": { elem2: null, chance: 0.25 },
        "cooked_meat": { elem2: null, chance: 0.25 },                                                                                 
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 },
        "bleach": { elem1: "rotten_meat", chance: 0.1 },
        "infection": { elem1: "rotten_meat", chance: 0.025 },
        "herring": { elem2: null, chance: 0.3 },
        "penguin": { elem2: null, chance: 0.3 },
        "artic_hare": { elem2: null, chance: 0.3 },
        "seal": { elem2: null, chance: 0.3 },
        "little_penguin": { elem2: null, chance: 0.3 },
        "fish": { elem2: null, chance: 0.3 }
    },
    egg: "arctic_wolf",
    foodNeed: 12,
    temp: 32,
    tempHigh: 78,
    stateHigh: "cooked_meat",
    tempLow: -140,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 220,
    density: 1400,
    conduct: 0.22
};

//v 3.0 another artic animals and stuff...
elements.arctic_hare = {
    color: ["#ffffff", "#f7f7f7", "#eeeeee", "#111111", "#662c0e"],
    state: "solid",
    behavior: [
        "XX|M1%30 AND SW:water,salt_water%5|XX",
        "BO:polar_bear,arctic_wolf%70|FX%1|M1%95 AND BO:polar_bear,arctic_wolf%50",
        "M2%70|M1%95|M1%95"
    ],
    ignore: ["arctic_hare"],
    reactions: {
        "plant": { elem2: null, chance: 0.25 },
        "grass": { elem2: null, chance: 0.25 },
        "mod_tundra_grass": { elem2: null, chance: 0.5 },
        "algae": { elem2: null, chance: 0.2 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    egg: "arctic_hare",
    foodNeed: 6,
    temp: 33,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -145,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 10,
    burnTime: 180,
    density: 1100,
    conduct: 0.25
};
 elements.arctic_owl = {
    color: ["#ffffff", "#fbfbfb", "#f7f7f7", "#fad61d"],
    state: "solid",
    behavior: [
        "M2|M1 AND AT:arctic_hare,rat%50|M2",
        "M1|FLY AND AT:arctic_hare,rat%30|M1",
        "M2|M1|M2"
    ],
    ignore: ["arctic_owl"],
    reactions: {
        "meat": { elem2: null, chance: 0.25 },
        "cooked_meat": { elem2: null, chance: 0.25 },
        "artic_hare": { elem2: null, chance: 0.38 },
        "herring": { elem2: null, chance: 0.25 },
        "fish": { elem2: null, chance: 0.25 },
        "cooked_meat": { elem2: null, chance: 0.2 },
        "walrus": { elem2: null, chance: 0.2 },
        "rat": { elem2: null, chance: 0.25 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    egg: "arctic_owl",
    foodNeed: 10,
    temp: 34,
    tempHigh: 76,
    stateHigh: "cooked_meat",
    tempLow: -150,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 200,
    density: 1000,
    conduct: 0.2
};
elements.inuit_head = {
    color: ["#d9c3b0", "#e0dacb"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "BO:polar_bear,killer_whale,arctic_wolf%40|FX%1|M1 AND BO:polar_bear,killer_whale,arctic_wolf%30",
        "XX|CR:inuit_body|XX"
    ],
    ignore: ["inuit_head", "inuit_body"],
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 }
    },
    foodNeed: 12,
    temp: 36,
    tempHigh: 45,
    stateHigh: "meat",
    tempLow: -60,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "meat",
    density: 1030,
    conduct: 0.1
};

elements.arctic_fox = {
    color: ["#ffffff", "#f2f2f2", "#e6e6e6", "#222222", "#d7beab", "#e5c2a3", "#c4a482"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "AT:arctic_hare,rat,penguin,little_penguin%40 AND BO:polar_bear,arctic_wolf%50|FX%1|M1%85 AND AT:arctic_hare,rat,penguin,little_penguin%30 AND BO:polar_bear,arctic_wolf%30",
        "M2%60|M1%85|M1%85"
    ],
    ignore: ["arctic_fox"],
    reactions: {
        "meat": { elem2: null, chance: 0.25 },
        "cooked_meat": { elem2: null, chance: 0.25 },
       "artic_hare": { elem2: null, chance: 0.25 },
        "artic_owl": { elem2: null, chance: 0.25 },
        "herring": { elem2: null, chance: 0.25 },
        "plant": { elem2: null, chance: 0.25 },
        "fish": { elem2: null, chance: 0.25 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    egg: "arctic_fox",
    foodNeed: 8,
    temp: 32,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -150,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 12,
    burnTime: 200,
    density: 1200,
    conduct: 0.22
};

elements.inuit = {
    color: ["#54453b", "#36424f", "#64605d"],
    category: "life",
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y + 1)) {
            createPixel("inuit_body", pixel.x, pixel.y + 1);
            if (!isEmpty(pixel.x, pixel.y + 1, true) && pixelMap[pixel.x][pixel.y + 1].element == "inuit_body") {
                pixelMap[pixel.x][pixel.y + 1].color = pixelColorPick(pixelMap[pixel.x][pixel.y + 1]);
            }
            pixel.element = "inuit_head";
            pixel.color = pixelColorPick(pixel);
        } else if (isEmpty(pixel.x, pixel.y - 1)) {
            createPixel("inuit_head", pixel.x, pixel.y - 1);
            pixel.element = "inuit_body";
        } else {
            deletePixel(pixel.x, pixel.y);
        }
    }
};

elements.inuit_body = {
    color: ["#543d2b", "#3a4f66"],
    category: "life",
    hidden: true,
    density: 1500,
    state: "solid",
    conduct: 25,
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -273,
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    reactions: {
        "cancer": { "elem1": "cancer", "chance": 0.005 },
        "radiation": { "elem1": ["ash", "meat", "rotten_meat", "cooked_meat"], "chance": 0.4 },
    },
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        if (tryMove(pixel, pixel.x, pixel.y + 1)) {
            if (!isEmpty(pixel.x, pixel.y - 2, true)) {
                var headpixel = pixelMap[pixel.x][pixel.y - 2];
                if (headpixel.element == "inuit_head") {
                    if (isEmpty(pixel.x, pixel.y - 1)) {
                        movePixel(pixelMap[pixel.x][pixel.y - 2], pixel.x, pixel.y - 1);
                    } else {
                        swapPixels(pixelMap[pixel.x][pixel.y - 2], pixelMap[pixel.x][pixel.y - 1]);
                    }
                }
            }
        }

        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            if (pixelTicks - pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
            }
            return;
        }
        if (!isEmpty(pixel.x, pixel.y - 1, true) && pixelMap[pixel.x][pixel.y - 1].element == "inuit_head") {
            var head = pixelMap[pixel.x][pixel.y - 1];
            if (head.dead) { pixel.dead = head.dead; }
        } else { var head = null; }
        if (isEmpty(pixel.x, pixel.y - 1)) {
            if (Math.random() < 0.1) {
                createPixel("blood", pixel.x, pixel.y - 1);
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }

        if (head == null) {
            // Aquí se puede agregar lógica adicional si es necesario
        }

        if (hat == null) {
            hat = pixelMap[pixel.x][pixel.y - 1];
        }

        if (Math.random() < 0.1) {
            var movesToTry = [
                [1 * pixel.dir, 0],
                [1 * pixel.dir, -1]
            ];
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x + move[0], pixel.y + move[1] - 1) && isEmpty(pixel.x + move[0], pixel.y + move[1] - 2)) {
                    if (tryMove(pixel, pixel.x + move[0], pixel.y + move[1])) {
                        if (head) movePixel(head, head.x + move[0], head.y + move[1]);
                        if (hat) movePixel(hat, hat.x + move[0], hat.y + move[1]);
                        break;
                    }
                }
            }
            if (Math.random() < 0.15) { pixel.dir *= -1; }
        }
    }
};

elements.inuit_head = {
    color: ["#d9c3b0", "#e0dacb"],
    category: "life",
    hidden: true,
    density: 1080,
    state: "solid",
    conduct: 25,
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -273,
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    reactions: {
        "cancer": { "elem1": "cancer", "chance": 0.005 },
        "radiation": { "elem1": ["ash", "meat", "rotten_meat", "cooked_meat"], "chance": 0.4 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 },
    },
    properties: {
        dead: false
    },
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            if (pixelTicks - pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }
        if (!isEmpty(pixel.x, pixel.y + 1, true) && pixelMap[pixel.x][pixel.y + 1].element == "inuit_body") {
            var body = pixelMap[pixel.x][pixel.y + 1];
            if (body.dead) {
                pixel.dead = body.dead;
            }
        } else { var body = null; }
        if (isEmpty(pixel.x, pixel.y + 1)) {
            tryMove(pixel, pixel.x, pixel.y + 1);
            if (isEmpty(pixel.x, pixel.y + 1) && !pixel.dead && Math.random() < 0.1) {
                createPixel("blood", pixel.x, pixel.y + 1);
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
    }
};


elements.narwhal = {
    color: ["#2a3b4c", "#3a4f66", "#5c7385", "#7a8f9f", "#ffffff", "#111111"],
    state: "solid",
    behavior: [
        "XX|M2%5 AND SW:water,salt_water,sugar_water,dirty_water%14|XX",
        "AT:fish,herring,clam%35 AND BO:killer_whale%40|FX%0.5|AT:fish,herring,clam%25 AND BO:killer_whale%30",
        "M2|XX|M2 AND SW:water,salt_water,sugar_water,dirty_water%5"
    ],
    ignore: ["narwhal"],
    reactions: {
        "fish": { elem2: null, chance: 0.35 },
        "herring": { elem2: null, chance: 0.35 },
        "clam": { elem2: null, chance: 0.35 },
        "cooked_meat": {elem2:null,chance:0.35 },
        "algae": { elem2: null, chance: 0.35 },
        "plant": { elem2: null, chance: 0.35 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    category: "life",
    foodNeed: 15,
    temp: 35,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -80,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 200,
    density: 1026,
    conduct: 0.12
};

elements.reindeer = {
    color: ["#8b5a2b", "#a07855", "#bc987e", "#d2b48c", "#eeeeee"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "BO:polar_bear,arctic_wolf,inuit_body%30|FX%1|M1%75 AND BO:polar_bear,arctic_wolf,inuit_body%20",
        "M2%50|M1%75|M1%75"
    ],
    ignore: ["reindeer", "flying_reindeer"],
    reactions: {
        "plant": { elem2: null, chance: 0.25 },
        "grass": { elem2: null, chance: 0.25 },
        "mod_tundra_grass": { elem2: null, chance: 0.5 },
        "algae": { elem2: null, chance: 0.2 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    egg: "reindeer",
    foodNeed: 8,
    temp: 34,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -150,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 220,
    density: 1300,
    conduct: 0.22
};

elements.flying_reindeer = {
    color: ["#a0522d", "#cd853f", "#deb887", "#782e00", "#c27342"],
    state: "solid",
    behavior: [
        "M2|M1 AND BO:polar_bear,arctic_wolf,inuit_body%30|M2",
        "M1|FLY|M1",
        "M2|M1|M2"
    ],
    ignore: ["reindeer", "flying_reindeer"],
    reactions: {
        "sugar": { elem2: null, chance: 0.25 },
        "caramel": { elem2: null, chance: 0.25 },
        "dirt": { elem2: "rainbow", chance: 0.25 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    egg: "flying_reindeer",
    foodNeed: 8,
    temp: 34,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -150,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 220,
    density: 1000,
    conduct: 0.22
};

elements.santa_hat = {
    color: ["#ff0000", "#d60000"],
    category: "life",
    hidden: true,
    density: 1010,
    state: "solid",
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -273,
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 },
    },
    properties: { dead: false, deadTime: 0 }, // Agregado deadTime
    tick: function(pixel) {
        doHeat(pixel);
        if (pixel.dead) {
            pixel.deadTime++; // Incrementar el tiempo muerto
            if (pixel.deadTime > 200) { // Cambiar la condición
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        } else {
            pixel.deadTime = 0; // Reiniciar el contador si no está muerto
        }
        if (!isEmpty(pixel.x, pixel.y + 2, true) && pixelMap[pixel.x][pixel.y + 2].element == "santa") {
            var body = pixelMap[pixel.x][pixel.y + 2];
            if (body.dead) { pixel.dead = body.dead; }
        } else { var body = null; }
        if (isEmpty(pixel.x, pixel.y + 1)) {
            tryMove(pixel, pixel.x, pixel.y + 1);
        }
    }
};

elements.santa_head = {
    color: ["#d9c3b0", "#e0dacb"],
    category: "life",
    hidden: true,
    density: 1040,
    state: "solid",
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -273,
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 },
        "gingerbread_man": { elem1: "santa_head", elem2: null, chance: 0.35 }
    },
    properties: { dead: false, deadTime: 0 }, // Agregado deadTime
    tick: function(pixel) {
        doHeat(pixel);
        if (pixel.dead) {
            pixel.deadTime++; // Incrementar el tiempo muerto
            if (pixel.deadTime > 200) { // Cambiar la condición
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        } else {
            pixel.deadTime = 0; // Reiniciar el contador si no está muerto
        }
        if (!isEmpty(pixel.x, pixel.y + 1, true) && pixelMap[pixel.x][pixel.y + 1].element == "santa") {
            var body = pixelMap[pixel.x][pixel.y + 1];
            if (body.dead) { pixel.dead = body.dead; }
        } else { var body = null; }
    }
};

elements.santa = {
    name: "santa",
    color: ["#ff0000", "#d60000"],
    category: "life",
    properties: {
        dead: false,
        dir: 1,
        panic: 0,
        deadTime: 0 // Agregado deadTime
    },
    onPlace: function(pixel) {
        logMessage("merry christmas");
    },
    reactions: {
        "gingerbread_man": { elem1: "santa", elem2: null, chance: 0.35 }
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y - 1) && isEmpty(pixel.x, pixel.y - 2)) {
            createPixel("santa_head", pixel.x, pixel.y - 1);
            createPixel("santa_hat", pixel.x, pixel.y - 2);
            if (!isEmpty(pixel.x, pixel.y - 1, true) && pixelMap[pixel.x][pixel.y - 1].element == "santa_head") {
                pixelMap[pixel.x][pixel.y - 1].color = pixelColorPick(pixelMap[pixel.x][pixel.y - 1]);
            }
            if (!isEmpty(pixel.x, pixel.y - 2, true) && pixelMap[pixel.x][pixel.y - 2].element == "santa_hat") {
                pixelMap[pixel.x][pixel.y - 2].color = pixelColorPick(pixelMap[pixel.x][pixel.y - 2]);
            }
            pixel.color = pixelColorPick(pixel);
        }
        if (tryMove(pixel, pixel.x, pixel.y + 1)) {
            if (!isEmpty(pixel.x, pixel.y - 2, true) && pixelMap[pixel.x][pixel.y - 2].element == "santa_head") {
                if (isEmpty(pixel.x, pixel.y - 1)) movePixel(pixelMap[pixel.x][pixel.y - 2], pixel.x, pixel.y - 1);
            }
            if (!isEmpty(pixel.x, pixel.y - 3, true) && pixelMap[pixel.x][pixel.y - 3].element == "santa_hat") {
                if (isEmpty(pixel.x, pixel.y - 2)) movePixel(pixelMap[pixel.x][pixel.y - 3], pixel.x, pixel.y - 2);
            }
        }
        doHeat(pixel);
        if (pixel.dead) {
            pixel.deadTime++; // Incrementar el tiempo muerto
            if (pixel.deadTime > 200) { // Cambiar la condición
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
            }
            return;
        } else {
            pixel.deadTime = 0; // Reiniciar el contador si no está muerto
        }
        if (!isEmpty(pixel.x, pixel.y - 1, true) && pixelMap[pixel.x][pixel.y - 1].element == "santa_head") {
            var head = pixelMap[pixel.x][pixel.y - 1];
            if (head.dead) { pixel.dead = head.dead; }
        } else { var head = null; }
        if (!isEmpty(pixel.x, pixel.y - 2, true) && pixelMap[pixel.x][pixel.y - 2].element == "santa_hat") {
            var hat = pixelMap[pixel.x][pixel.y - 2];
        } else { var hat = null; }
        if (head == null || hat == null) { return; }
        if (Math.random() < 0.12) {
            var movesToTry = [
                [1 * pixel.dir, 0],
                [1 * pixel.dir, -1]
            ];
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x + move[0], pixel.y + move[1] - 1) && isEmpty(pixel.x + move[0], pixel.y + move[1] - 2)) {
                    if (tryMove(pixel, pixel.x + move[0], pixel.y + move[1])) {
                        movePixel(head, head.x + move[0], head.y + move[1]);
                        movePixel(hat, hat.x + move[0], hat.y + move[1]);
                        break;
                    }
                }
            }
            if (Math.random() < 0.15) { pixel.dir *= -1; }
        }
    }
};

elements.gingerbread_man = {
    name: "gingerbread man ",
    color: ["#c48b53", "#b3773e", "#a1642a", "#ffffff", "#5bc0be"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "BO:santa,lemming,arctic_fox,polar_bear%50|FX%1|M1%70 AND BO:santa,lemming,arctic_fox,polar_bear%40",
        "M2%30|M1%70|M1%70"
    ],
    ignore: ["gingerbread_man"],
    reactions: {
        "water": { elem1: "sugar_water", chance: 0.15 },
        "salt_water": { elem1: "sugar_water", chance: 0.15 },
        "dirty_water": { elem1: "sugar_water", chance: 0.15 },
        "milk": { elem1: "sugar_water", chance: 0.2 },
        "thermal_water": { elem1: "sugar_water", chance: 0.2 },
        "fire": { elem1: "ash", chance: 0.1 },
        "magma": { elem1: "smoke", chance: 0.3 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.2 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    egg: "gingerbread_man",
    foodNeed: 4,
    temp: 20,
    tempHigh: 180,
    stateHigh: "ash",
    tempLow: -100,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "sugar",
    burn: 15,
    burnTime: 120,
    density: 1100,
    conduct: 0.15
};

elements.marlon_hat = {
    color: ["#ff6600", "#cc5200"],
    category: "life",
    hidden: true,
    density: 1010,
    state: "solid",
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -273,
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 }
    },
    properties: { dead: false },
    tick: function(pixel) {
        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }
        if (!isEmpty(pixel.x, pixel.y+2, true) && pixelMap[pixel.x][pixel.y+2].element == "marlon") {
            var body = pixelMap[pixel.x][pixel.y+2];
            if (body.dead) { pixel.dead = body.dead; }
        } else { var body = null; }
        if (isEmpty(pixel.x, pixel.y+1)) {
            tryMove(pixel, pixel.x, pixel.y+1);
        }
    }
};


elements.marlon_hat = {
    color: ["#ff6600", "#cc5200"],
    category: "life",
    hidden: true,
    density: 1010,
    state: "solid",
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -273,
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 }
    },
    properties: { dead: false },
    tick: function(pixel) {
        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }
        if (!isEmpty(pixel.x, pixel.y+2, true) && pixelMap[pixel.x][pixel.y+2].element == "marlon") {
            var body = pixelMap[pixel.x][pixel.y+2];
            if (body.dead) { pixel.dead = body.dead; }
        } else { var body = null; }
        if (isEmpty(pixel.x, pixel.y+1)) {
            tryMove(pixel, pixel.x, pixel.y+1);
        }
    }
};

elements.marlon_head = {
    color: ["#d9c3b0", "#e0dacb"],
    category: "life",
    hidden: true,
    density: 1040,
    state: "solid",
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -273,
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 }
    },
    properties: { dead: false },
    tick: function(pixel) {
        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "marlon") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) { pixel.dead = body.dead; }
        } else { var body = null; }
    }
};

elements.marlon = {
    name: "marlon",
    color: ["#1ab1c5", "#1471a3"],
    category: "life",
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    onPlace: function(pixel) {
        logMessage("it's me, marlon");
    },
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y-1) && isEmpty(pixel.x, pixel.y-2)) {
            createPixel("marlon_head", pixel.x, pixel.y-1);
            createPixel("marlon_hat", pixel.x, pixel.y-2);
            if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "marlon_head") {
                pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1]);
            }
            if (!isEmpty(pixel.x, pixel.y-2, true) && pixelMap[pixel.x][pixel.y-2].element == "marlon_hat") {
                pixelMap[pixel.x][pixel.y-2].color = pixelColorPick(pixelMap[pixel.x][pixel.y-2]);
            }
            pixel.color = pixelColorPick(pixel);
        }
        if (tryMove(pixel, pixel.x, pixel.y+1)) {
            if (!isEmpty(pixel.x, pixel.y-2, true) && pixelMap[pixel.x][pixel.y-2].element == "marlon_head") {
                if (isEmpty(pixel.x, pixel.y-1)) movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
            }
            if (!isEmpty(pixel.x, pixel.y-3, true) && pixelMap[pixel.x][pixel.y-3].element == "marlon_hat") {
                if (isEmpty(pixel.x, pixel.y-2)) movePixel(pixelMap[pixel.x][pixel.y-3], pixel.x, pixel.y-2);
            }
        }
        
        var frontX = pixel.x + pixel.dir;
        if (frontX >= 0 && frontX < width) {
            if (!isEmpty(frontX, pixel.y, true) && pixelMap[frontX][pixel.y].element === "little_penguin") {
                var target = pixelMap[frontX][pixel.y];
                var targetX = target.x + (pixel.dir * 6);
                var targetY = target.y - 8;
                if (targetX >= 0 && targetX < width && targetY >= 0 && targetY < height) {
                    if (isEmpty(targetX, targetY)) {
                        movePixel(target, targetX, targetY);
                        logMessage("¡Al precipicio!");
                    }
                }
            }
         frontX = pixel.x - pixel.dir;
        }

        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
            }
            return;
        }
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "marlon_head") {
            var head = pixelMap[pixel.x][pixel.y-1];
            if (head.dead) { pixel.dead = head.dead; }
        } else { var head = null; }
        if (!isEmpty(pixel.x, pixel.y-2, true) && pixelMap[pixel.x][pixel.y-2].element == "marlon_hat") {
            var hat = pixelMap[pixel.x][pixel.y-2];
        } else { var hat = null; }
        if (head == null || hat == null) { return; }
        if (Math.random() < 0.12) {
            var movesToTry = [
                [1*pixel.dir,0],
                [1*pixel.dir,-1]
            ];
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1) && isEmpty(pixel.x+move[0], pixel.y+move[1]-2)) {
                    if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1])) {
                        movePixel(head, head.x+move[0], head.y+move[1]);
                        movePixel(hat, hat.x+move[0], hat.y+move[1]);
                        break;
                    }
                }
            }
            if (Math.random() < 0.15) { pixel.dir *= -1; }
        }
    }
};


elements.beluga_whale = {
    name: "beluga",
    color: ["#ffffff", "#f9fbfb", "#f0f4f4", "#e1e8e8", "#c8d6e5", "#d1d8e0", "#f1f2f6", "#edf2f4"],
    state: "solid",
    behavior: [
        "XX|M2%5 AND SW:water,salt_water,sugar_water,dirty_water%14|XX",
        "AT:fish,herring,clam%30 AND BO:killer_whale%50|FX%0.5|AT:fish,herring,clam%20 AND BO:killer_whale%40",
        "M2|XX|M2 AND SW:water,salt_water,sugar_water,dirty_water%5"
    ],
    ignore: ["beluga_whale"],
    reactions: {
        "fish": { elem2: null, chance: 0.3 },
       "frozen_fish": { elem2: null, chance: 0.3 },
        "herring": { elem2: null, chance: 0.3 },
        "clam": { elem2: null, chance: 0.3 },
        "algae": { elem2: null, chance: 0.25 },
        "plant": { elem2: null, chance: 0.3 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },

    category: "life",
    foodNeed: 14,
    temp: 35,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -85,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 200,
    density: 1025,
    conduct: 0.11
};
elements.lemming = {
    color: ["#5b92e5", "#7ba7ed", "#ffffff", "#3b6cc4"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "AT:fish,herring,cooked_meat,chocolate,caramel%60 AND BO:polar_bear%15|FX%1|M1%95 AND AT:fish,herring,cooked_meat,chocolate,caramel%50",
        "M2%40|M1%95|M1%95"
    ],
    ignore: ["lemming"],
    reactions: {
        "fish": { elem2: "lemming", chance: 0.15 },
        "herring": { elem2: "lemming", chance: 0.15 },
        "chocolate": { elem2: "lemming", chance: 0.3 },
        "sugar": { elem2: "lemming", chance: 0.25 },
        "caramel": { elem2: "lemming", chance: 0.3 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    egg: "lemming",
    foodNeed: 5,
    temp: 36,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -120,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 10,
    burnTime: 150,
    density: 1100,
    conduct: 0.2
};

elements.igloo_ice = {
    color: ["#e6f2f2", "#d1e0e0", "#bfe6e6"],
    state: "solid",
    behavior: behaviors.WALL,
    category: "ice solids",
    temp: -40,
    tempHigh: 120,
    stateHigh: "water",
    density: 920,
    conduct: 0.01,
    hardness: 0.5
};

elements.greenland_shark = {
    name: "Greenland shark",
    color: ["#3d4246", "#2f3235", "#212325", "#4a4641", "#1a1c1e"],
    state: "solid",
    category: "life",
    behavior: [
        "XX|M2%1 AND SW:water,salt_water,dirty_water%5|XX",
        "AT:fish,herring,clam,meat,rotten_meat,cooked_meat%40|FX%0.2|AT:fish,herring,clam,meat,rotten_meat,cooked_meat%30",
        "M2%5|XX|M2%1 AND SW:water,salt_water,dirty_water%5"
    ],
    ignore: ["greenland_shark"],
    reactions: {
        "fish": { elem2: null, chance: 0.35 },
        "herring": { elem2: null, chance: 0.35 },
        "clam": { elem2: null, chance: 0.35 },
        "meat": { elem2: null, chance: 0.5 },
        "rotten_meat": { elem2: null, chance: 0.6 },
        "cooked_meat": { elem2: null, chance: 0.5 },
        "frozen_meat": { elem2: null, chance: 0.5 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.2 },
        "poison": { elem1: "rotten_meat", chance: 0.05 }
    },
    foodNeed: 12,
    temp: 2,
    tempHigh: 55,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 250,
    density: 1032,
    conduct: 0.1
};

elements.igloo = {
    color: ["#e6f2f2", "#ffffff", "#d1e0e0"],
    category: "ice solids",
    state: "solid",
    density: 2000,
    maxSize: 1,
    cooldown: 20,
    onPlace: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;
        while (y < 1000 && isEmpty(x, y+1)) {
            y++;
        }
        if (isEmpty(x, y-5)) createPixel("igloo_ice", x, y-5);
        if (isEmpty(x-1, y-5)) createPixel("igloo_ice", x-1, y-5);
        if (isEmpty(x+1, y-5)) createPixel("igloo_ice", x+1, y-5);
        if (isEmpty(x-2, y-4)) createPixel("igloo_ice", x-2, y-4);
        if (isEmpty(x+2, y-4)) createPixel("igloo_ice", x+2, y-4);
        if (isEmpty(x-3, y-3)) createPixel("igloo_ice", x-3, y-3);
        if (isEmpty(x+3, y-3)) createPixel("igloo_ice", x+3, y-3);
        if (isEmpty(x-4, y-2)) createPixel("igloo_ice", x-4, y-2);
        if (isEmpty(x+4, y-2)) createPixel("igloo_ice", x+4, y-2);
        if (Math.random() < 0.20) {
            if (isEmpty(x, y-2)) createPixel("inuit", x, y-2);
        }
        if (isEmpty(x-4, y-1)) createPixel("igloo_ice", x-4, y-1);
        if (isEmpty(x+4, y-1)) createPixel("igloo_ice", x+4, y-1);
        for (var i = -4; i <= 4; i++) {
            if (isEmpty(x+i, y)) createPixel("igloo_ice", x+i, y);
        }
        deletePixel(pixel.x, pixel.y);
    }
};

elements.igloo_large = {
    color: ["#cce6e6", "#92f0f7", "#99cdcd"],
    category: "ice solids",
    state: "solid",
    density: 2000,
    maxSize: 1,
    cooldown: 20,
    onPlace: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;
        while (y < 1000 && isEmpty(x, y+1)) {
            y++;
        }
        if (isEmpty(x, y-7)) createPixel("igloo_ice", x, y-7);
        if (isEmpty(x-1, y-7)) createPixel("igloo_ice", x-1, y-7);
        if (isEmpty(x+1, y-7)) createPixel("igloo_ice", x+1, y-7);
        if (isEmpty(x-2, y-6)) createPixel("igloo_ice", x-2, y-6);
        if (isEmpty(x+2, y-6)) createPixel("igloo_ice", x+2, y-6);
        if (isEmpty(x-3, y-5)) createPixel("igloo_ice", x-3, y-5);
        if (isEmpty(x+3, y-5)) createPixel("igloo_ice", x+3, y-5);
        if (isEmpty(x-4, y-4)) createPixel("igloo_ice", x-4, y-4);
        if (isEmpty(x+4, y-4)) createPixel("igloo_ice", x+4, y-4);
        if (isEmpty(x-5, y-3)) createPixel("igloo_ice", x-5, y-3);
        if (isEmpty(x+5, y-3)) createPixel("igloo_ice", x+5, y-3);
        if (isEmpty(x-5, y-2)) createPixel("igloo_ice", x-5, y-2);
        if (isEmpty(x+5, y-2)) createPixel("igloo_ice", x+5, y-2);
        if (isEmpty(x-5, y-1)) createPixel("igloo_ice", x-5, y-1);
        if (isEmpty(x+5, y-1)) createPixel("igloo_ice", x+5, y-1);
        
        if (isEmpty(x-2, y-2)) createPixel("inuit", x-2, y-2);
        if (isEmpty(x, y-2)) createPixel("inuit", x, y-2);
        if (isEmpty(x+2, y-2)) createPixel("inuit", x+2, y-2);

        for (var i = -5; i <= 5; i++) {
            if (isEmpty(x+i, y)) createPixel("igloo_ice", x+i, y);
        }
        deletePixel(pixel.x, pixel.y);
    }
};

elements.igloo_huge = {
    color: ["#99cdcd", "#80c0c0", "#66b2b2"],
    category: "ice solids",
    state: "solid",
    density: 2000,
    maxSize: 1,
    cooldown: 20,
    onPlace: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;
        while (y < 1000 && isEmpty(x, y+1)) {
            y++;
        }
        if (isEmpty(x, y-9)) createPixel("igloo_ice", x, y-9);
        if (isEmpty(x-1, y-9)) createPixel("igloo_ice", x-1, y-9);
        if (isEmpty(x+1, y-9)) createPixel("igloo_ice", x+1, y-9);
        if (isEmpty(x-2, y-8)) createPixel("igloo_ice", x-2, y-8);
        if (isEmpty(x+2, y-8)) createPixel("igloo_ice", x+2, y-8);
        if (isEmpty(x-3, y-7)) createPixel("igloo_ice", x-3, y-7);
        if (isEmpty(x+3, y-7)) createPixel("igloo_ice", x+3, y-7);
        if (isEmpty(x-4, y-6)) createPixel("igloo_ice", x-4, y-6);
        if (isEmpty(x+4, y-6)) createPixel("igloo_ice", x+4, y-6);
        if (isEmpty(x-5, y-5)) createPixel("igloo_ice", x-5, y-5);
        if (isEmpty(x+5, y-5)) createPixel("igloo_ice", x+5, y-5);
        if (isEmpty(x-6, y-4)) createPixel("igloo_ice", x-6, y-4);
        if (isEmpty(x+6, y-4)) createPixel("igloo_ice", x+6, y-4);
        if (isEmpty(x-6, y-3)) createPixel("igloo_ice", x-6, y-3);
        if (isEmpty(x+6, y-3)) createPixel("igloo_ice", x+6, y-3);
        if (isEmpty(x-6, y-2)) createPixel("igloo_ice", x-6, y-2);
        if (isEmpty(x+6, y-2)) createPixel("igloo_ice", x+6, y-2);
        if (isEmpty(x-6, y-1)) createPixel("igloo_ice", x-6, y-1);
        if (isEmpty(x+6, y-1)) createPixel("igloo_ice", x+6, y-1);
        
        if (isEmpty(x-3, y-2)) createPixel("inuit", x-3, y-2);
        if (isEmpty(x-1, y-2)) createPixel("inuit", x-1, y-2);
        if (isEmpty(x, y-4)) createPixel("inuit", x, y-4);
        if (isEmpty(x+1, y-2)) createPixel("inuit", x+1, y-2);
        if (isEmpty(x+3, y-2)) createPixel("inuit", x+3, y-2);
        if (isEmpty(x, y-2)) createPixel("seal", x, y-2);

        for (var i = -6; i <= 6; i++) {
            if (isEmpty(x+i, y)) createPixel("igloo_ice", x+i, y);
        }
        deletePixel(pixel.x, pixel.y);
    }
};
elements.packed_ice_wall = {
    color: ["#a1c1e0", "#b3d1ff", "#8cbfff"],
    state: "solid",
    behavior: behaviors.WALL,
    category: "ice solids",
    temp: -50,
    tempHigh: 300,
    stateHigh: "water",
    density: 950,
    conduct: 0,
    hardness: 0.8
};

elements.icicle = {
    name: "icicle",
    color: ["#e6f2f2", "#bfe6e6", "#d1e0e0"],
    category: "ice solids",
    state: "solid",
    temp: -40,
    tempHigh: 150,
    stateHigh: "water",
    density: 920,
    conduct: 0.01,
    renderer: function(pixel, ctx) {
        var size = pixelSize;
        var cx = canvasCoord(pixel.x);
        var cy = canvasCoord(pixel.y);
        ctx.fillStyle = pixel.color;
        if (pixel.spikeType === 1) {
            ctx.fillRect(cx + size/3, cy, size/3, size/3);
            ctx.fillRect(cx + size/6, cy + size/3, size*2/3, size*2/3);
        } else if (pixel.spikeType === 2) {
            ctx.fillRect(cx + size/6, cy, size*2/3, size);
        } else if (pixel.spikeType === 3) {
            ctx.fillRect(cx + size/3, cy + size*2/3, size/2, size/3);
        } else if (pixel.spikeType === 4) {
            ctx.fillRect(cx + size/3, cy, size/2, size/3);
            ctx.fillRect(cx + size/3, cy + size/6, size/3, size/3);
            ctx.fillRect(cx + size/3, cy + size/3, size/6, size/2);
        } else {
            ctx.fillRect(cx, cy, size, size);
        }
    },
    tick: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;
        var head = y;
        while (head > 0 && !isEmpty(x, head-1, true) && pixelMap[x][head-1].element === "icicle") {
            head--;
        }
        var base = y;
        while (base < height-1 && !isEmpty(x, base+1, true) && pixelMap[x][base+1].element === "icicle") {
            base++;
        }
        var totalLength = base - head + 1;
        var localIndex = y - head + 1;
        if (totalLength === 1) {
            pixel.spikeType = 4;
        } else if (localIndex === 1) {
            pixel.spikeType = 4;
        } else if (localIndex === 2) {
            pixel.spikeType = 3;
        } else if (localIndex === totalLength) {
            pixel.spikeType = 1;
        } else {
            pixel.spikeType = 2;
        }
        if (isEmpty(x, head-1)) {
            for (var i = base; i >= y; i--) {
                if (!isEmpty(x, i, true) && pixelMap[x][i].element === "icicle") {
                    var currentPixel = pixelMap[x][i];
                    if (isEmpty(x, i+1)) {
                        tryMove(currentPixel, x, i+1);
                    } else if (!isEmpty(x, i+1, true)) {
                        var target = pixelMap[x][i+1];
                        if (target.element !== "icicle" && target.element !== "packed_ice_wall" && target.element !== "permafrost_ice") {
                            if (elements[target.element] && elements[target.element].category === "life") {
                                target.element = "frozen_meat";
                                target.color = pixelColorPick(target);
                            } else {
                                deletePixel(x, i+1);
                            }
                        }
                    }
                }
            }
        }
    }
};

elements.cryo_nuke = {
    color: ["#00ffff", "#33ffff", "#00cccc", "#111111"],
    state: "solid",
    category: "weapons",
    density: 3000,
    maxSize: 1,
    cooldown: 50,
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            tryMove(pixel, pixel.x, pixel.y+1);
        } 
        else {
            var downPixel = pixelMap[pixel.x][pixel.y+1];
            if (downPixel && downPixel.element !== "cryo_nuke") {
                var radius = 30;
                var startX = Math.max(0, pixel.x - radius);
                var endX = Math.min(width - 1, pixel.x + radius);
                var startY = Math.max(0, pixel.y - radius);
                var endY = Math.min(height - 1, pixel.y + radius);

                for (var x = startX; x <= endX; x++) {
                    for (var y = startY; y <= endY; y++) {
                        var dist = Math.sqrt(Math.pow(x - pixel.x, 2) + Math.pow(y - pixel.y, 2));
                        if (dist <= radius) {
                            if (!isEmpty(x, y, true)) {
                                var target = pixelMap[x][y];
                                if (target.element !== "cryo_nuke") {
                                    target.temp = -273;
                                    if (target.element === "water" || target.element === "salt_water" || target.element === "dirty_water") {
                                        changePixel(target, "ice");
                                    } else if (target.element === "meat" || elements[target.element].category === "life") {
                                        if (target.element !== "inuit" && target.element !== "inuit_body" && target.element !== "inuit_head") {
                                            target.element = "packed_ice_wall";
                                            target.color = pixelColorPick(target);
                                        }
                                    } else if (target.element === "fire" || target.element === "smoke") {
                                        deletePixel(x, y);
                                    }
                                }
                            }
                        }
                    }
                }
                deletePixel(pixel.x, pixel.y);
            }
        }
    }
};

elements.iceberg = {
    color: ["#a1c1e0", "#b3d1ff", "#ffffff", "#8cbfff"],
    category: "ice solids",
    state: "solid",
    density: 2000,
    maxSize: 1,
    cooldown: 20,
    onPlace: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;
        while (y < 1000 && isEmpty(x, y+1)) {
            y++;
        }
        for (var h = 0; h < 20; h++) {
            var widthOffset = 22 - h;
            for (var i = -widthOffset; i <= widthOffset; i++) {
                if (isEmpty(x+i, y-h)) createPixel("packed_ice_wall", x+i, y-h);
            }
        }
        for (var h = 1; h <= 15; h++) {
            var widthOffset = 22 - h;
            for (var i = -widthOffset; i <= widthOffset; i++) {
                if (isEmpty(x+i, y+h)) createPixel("packed_ice_wall", x+i, y+h);
            }
        }
        if (Math.random() < 0.30) {
            var surfaceY = y - 20;
            if (isEmpty(x-12, surfaceY)) createPixel("penguin", x-12, surfaceY);
            if (isEmpty(x-4, surfaceY)) createPixel("penguin", x-4, surfaceY);
            if (isEmpty(x+4, surfaceY)) createPixel("penguin", x+4, surfaceY);
            if (isEmpty(x+12, surfaceY)) createPixel("penguin", x+12, surfaceY);
        }
        deletePixel(pixel.x, pixel.y);
    }
};

//v 4.0 historical and omega
elements.emperor_hat = {
    color: "#fad61d",
    category: "life",
    hidden: true,
    density: 1010,
    state: "solid",
    tempHigh: 1000,
    stateHigh: "frozen_penguin",
    tempLow: -210,
    stateLow: "frozen_penguin",
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 }
    },
    properties: { dead: false },
    tick: function(pixel) {
        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }
        if (!isEmpty(pixel.x, pixel.y+2, true) && pixelMap[pixel.x][pixel.y+2].element == "emperor_penguin") {
            var body = pixelMap[pixel.x][pixel.y+2];
            if (body.dead) { pixel.dead = body.dead; }
        } else { var body = null; }
    }
};

elements.emperor_head = {
    color: ["#0c0c12", "#babae3", "#02022e", "#d2d2fc", "#000000", "#5b5b5c", "#95a7c4"],
    category: "life",
    hidden: true,
    density: 1040,
    state: "solid",
    tempHigh: 1000,
    stateHigh: "frozen_penguin",
    tempLow: -210,
    stateLow: "frozen_penguin",
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 }
    },
    properties: { dead: false },
    tick: function(pixel) {
        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "emperor_penguin") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) { pixel.dead = body.dead; }
        } else { var body = null; }
    }
};

elements.emperor_penguin = {
    name: "emperor penguin",
    color: ["#ff6600"],
    category: "life",
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y-1) && isEmpty(pixel.x, pixel.y-2)) {
            createPixel("emperor_head", pixel.x, pixel.y-1);
            createPixel("emperor_hat", pixel.x, pixel.y-2);
            if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "emperor_head") {
                pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1]);
            }
            pixel.color = pixelColorPick(pixel);
        }
        if (tryMove(pixel, pixel.x, pixel.y+1)) {
            if (!isEmpty(pixel.x, pixel.y-2, true) && pixelMap[pixel.x][pixel.y-2].element == "emperor_head") {
                if (isEmpty(pixel.x, pixel.y-1)) movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
            }
            if (!isEmpty(pixel.x, pixel.y-3, true) && pixelMap[pixel.x][pixel.y-3].element == "emperor_hat") {
                if (isEmpty(pixel.x, pixel.y-2)) movePixel(pixelMap[pixel.x][pixel.y-3], pixel.x, pixel.y-2);
            }
        }
        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
            }
            return;
        }
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "emperor_head") {
            var head = pixelMap[pixel.x][pixel.y-1];
            if (head.dead) { pixel.dead = head.dead; }
        } else { var head = null; }
        if (!isEmpty(pixel.x, pixel.y-2, true) && pixelMap[pixel.x][pixel.y-2].element == "emperor_hat") {
            var hat = pixelMap[pixel.x][pixel.y-2];
        } else { var hat = null; }
        if (head == null || hat == null) { return; }
        if (Math.random() < 0.1) {
            var movesToTry = [
                [1*pixel.dir,0],
                [1*pixel.dir,-1]
            ];
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1) && isEmpty(pixel.x+move[0], pixel.y+move[1]-2)) {
                    if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1])) {
                        movePixel(head, head.x+move[0], head.y+move[1]);
                        movePixel(hat, hat.x+move[0], hat.y+move[1]);
                        break;
                    }
                }
            }
            if (Math.random() < 0.15) { pixel.dir *= -1; }
        }
    }
};


elements.emperor_throne = {
    color: ["#5082b0", "#3d668a"],
    state: "solid",
    category: "ice solids",
    behavior: behaviors.WALL,
    density: 4000,
    temp: -30,
    tempHigh: 200,
    stateHigh: "water"
};

elements.ice_castle = {
    color: ["#7fa8d1", "#a1c1e0", "#ffffff", "#b3d1ff"],
    category: "ice solids",
    state: "solid",
    density: 3000,
    maxSize: 1,
    cooldown: 30,
    onPlace: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;
        while (y < 1000 && isEmpty(x, y+1)) {
            y++;
        }
        
        for (var h = 0; h <= 35; h++) {
            for (var i = -32; i <= 32; i++) {
                if (h <= 8 && i >= -8 && i <= 8) {
                    continue;
                }
                if (isEmpty(x+i, y-h)) createPixel("packed_ice_wall", x+i, y-h);
            }
        }
        
        var towers = [-26, 0, 26];
        for (var t = 0; t < towers.length; t++) {
            var tx = x + towers[t];
            for (var h = 36; h <= 42; h++) {
                for (var i = -5; i <= 5; i++) {
                    if (isEmpty(tx+i, y-h)) createPixel("packed_ice_wall", tx+i, y-h);
                }
            }
            
            var almenaY = y - 43;
            if (isEmpty(tx-5, almenaY)) createPixel("packed_ice_wall", tx-5, almenaY);
            if (isEmpty(tx-3, almenaY)) createPixel("packed_ice_wall", tx-3, almenaY);
            if (isEmpty(tx-1, almenaY)) createPixel("packed_ice_wall", tx-1, almenaY);
            if (isEmpty(tx+1, almenaY)) createPixel("packed_ice_wall", tx+1, almenaY);
            if (isEmpty(tx+3, almenaY)) createPixel("packed_ice_wall", tx+3, almenaY);
            if (isEmpty(tx+5, almenaY)) createPixel("packed_ice_wall", tx+5, almenaY);
        }
        
        for (var f = 43; f <= 47; f++) {
            if (isEmpty(x+4, y-f)) createPixel("wood", x+4, y-f);
        }
        for (var pX = 5; pX <= 8; pX++) {
            if (isEmpty(x+pX, y-47)) createPixel("paper", x+pX, y-47);
            if (isEmpty(x+pX, y-46)) createPixel("paper", x+pX, y-46);
        }
        
        var kingY = y - 43;
        if (isEmpty(x-2, kingY)) createPixel("emperor_throne", x-2, kingY);
        if (isEmpty(x-2, kingY-1)) createPixel("emperor_penguin", x-2, kingY-1);
        
        var guardY = y - 43;
        var spots = [-29, -27, -23, -21, 21, 23, 27, 29];
        for (var g = 0; g < spots.length; g++) { // <-- ¡VARIABLE DE BUCLE CORREGIDA!
            var gx = x + spots[g];
            if (isEmpty(gx, guardY)) createPixel("penguin", gx, guardY);
        }

        var babyY = y - 1;
        var babySpots = [-6, -3, 0, 3, 6];
        for (var b = 0; b < babySpots.length; b++) {
            var bx = x + babySpots[b];
            if (isEmpty(bx, babyY)) createPixel("little_penguin", bx, babyY);
        }

        deletePixel(pixel.x, pixel.y);
    }
};

elements.yeti_head = {
    color: ["#d9c3b0", "#e0dacb"],
    category: "life",
    hidden: true,
    density: 1100,
    state: "solid",
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -273,
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 }
    },
    properties: { dead: false },
    tick: function(pixel) {
        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }
        if (!isEmpty(pixel.x, pixel.y+2, true) && pixelMap[pixel.x][pixel.y+2].element == "yeti") {
            var body = pixelMap[pixel.x][pixel.y+2];
            if (body.dead) { pixel.dead = body.dead; }
        } else { var body = null; }
        if (isEmpty(pixel.x, pixel.y+1)) {
            tryMove(pixel, pixel.x, pixel.y+1);
        }
    }
};

elements.yeti_body = {
    color: ["#ffffff", "#f2f2f2", "#eaeaea", "#f7f5f0", "#e8e5df", "#d3d3d3", "#b5b5b5", "#f5f2eb", "#eae6df", "#e3ded7"],
    category: "life",
    hidden: true,
    density: 1150,
    state: "solid",
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -273,
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 }
    },
    properties: { dead: false },
    tick: function(pixel) {
        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "yeti") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) { pixel.dead = body.dead; }
        } else { var body = null; }
    }
};

elements.yeti = {
    name: "yeti",
    color: ["#ffffff", "#f2f2f2", "#eaeaea", "#f7f5f0", "#e8e5df", "#d3d3d3", "#b5b5b5", "#f5f2eb", "#eae6df", "#e3ded7"],
    category: "life",
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y-1) && isEmpty(pixel.x, pixel.y-2)) {
            createPixel("yeti_body", pixel.x, pixel.y-1);
            createPixel("yeti_head", pixel.x, pixel.y-2);
            if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "yeti_body") {
                pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1]);
            }
            if (!isEmpty(pixel.x, pixel.y-2, true) && pixelMap[pixel.x][pixel.y-2].element == "yeti_head") {
                pixelMap[pixel.x][pixel.y-2].color = pixelColorPick(pixelMap[pixel.x][pixel.y-2]);
            }
            pixel.color = pixelColorPick(pixel);
        }
        if (tryMove(pixel, pixel.x, pixel.y+1)) {
            if (!isEmpty(pixel.x, pixel.y-2, true) && pixelMap[pixel.x][pixel.y-2].element == "yeti_body") {
                if (isEmpty(pixel.x, pixel.y-1)) movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
            }
            if (!isEmpty(pixel.x, pixel.y-3, true) && pixelMap[pixel.x][pixel.y-3].element == "yeti_head") {
                if (isEmpty(pixel.x, pixel.y-2)) movePixel(pixelMap[pixel.x][pixel.y-3], pixel.x, pixel.y-2);
            }
        }
        
        var frontX = pixel.x + pixel.dir;
        if (frontX >= 0 && frontX < width) {
            var checkY = [pixel.y, pixel.y-1, pixel.y-2];
            for (var yIndex = 0; yIndex < checkY.length; yIndex++) {
                var cy = checkY[yIndex];
                if (!isEmpty(frontX, cy, true)) {
                    var target = pixelMap[frontX][cy];
                    if (target && target.element !== "yeti" && target.element !== "yeti_body" && target.element !== "yeti_head") {
                        if (elements[target.element] && elements[target.element].category === "life") {
                            var targetX = target.x + (pixel.dir * 8);
                            var targetY = target.y - 6;
                            if (targetX >= 0 && targetX < width && targetY >= 0 && targetY < height) {
                                if (isEmpty(targetX, targetY)) {
                                    movePixel(target, targetX, targetY);
                                 
                                }
                            }
                        }
                    }
                }
            }
        }

        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
            }
            return;
        }
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "yeti_body") {
            var body = pixelMap[pixel.x][pixel.y-1];
            if (body.dead) { pixel.dead = body.dead; }
        } else { var body = null; }
        if (!isEmpty(pixel.x, pixel.y-2, true) && pixelMap[pixel.x][pixel.y-2].element == "yeti_head") {
            var head = pixelMap[pixel.x][pixel.y-2];
        } else { var head = null; }
        if (body == null || head == null) { return; }
        
        if (Math.random() < 0.95) {
            var movesToTry = [
                [1*pixel.dir, 0],
                [1*pixel.dir, -1]
            ];
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1) && isEmpty(pixel.x+move[0], pixel.y+move[1]-2)) {
                    if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1])) {
                        movePixel(body, body.x+move[0], body.y+move[1]);
                        movePixel(head, head.x+move[0], head.y+move[1]);
                        break;
                    }
                }
            }
            if (Math.random() < 0.08) { pixel.dir *= -1; }
        }
    }
};

elements.fossil_block = {
    name: "fossil block",
    color: ["#998674", "#aa9885", "#8c755d", "#9d8d7e"],
    state: "solid",
    behavior: behaviors.WALL,
    category: "ice solids",
    density: 2800,
    hardness: 0.9,
    breakInto: "petroleum",
    tempHigh: 1000,
    stateHigh: "petroleum"
};

elements.permafrost_ice = {
    name: "permafrost ice",
    color: ["#8bd0fa", "#4a738c", "#6da3bf"],
    state: "solid",
    behavior: behaviors.WALL,
    category: "ice solids",
    density: 940,
    temp: -10,
    conduct: 0,
    hardness: 0.85
};

elements.permafrost_snow = {
    name: "permafrost snow",
    color: ["#d9e5eb", "#c2d1db", "#ebf2f7"],
    state: "solid",
    breakInto: "mod_powered_snow",
    behavior: behaviors.POWDER,
    category: "ice solids",
    density: 450,
    temp: -8,
    conduct: 0.01
};

elements.thermal_water = {
    name: "thermal water",
    color: ["#55c3d7", "#7eb3e9", "#66e3ff"],
    state: "liquid",
    behavior: behaviors.LIQUID,
    category: "ice solids",
    density: 995,
    temp: 40,
    tempHigh: 100,
    stateHigh: "steam",
    tempLow: 10,
    stateLow: "water",
    reactions: {
        "ice": { elem2: "water", chance: 0.4 },
        "frozen_meat": { elem2: "meat", chance: 0.3 },
        "gingerbread_man": { elem2: "termal_water", chance: 0.3 }
    },
    tick: function(pixel) {
        if (Math.random() < 0.03) {
            if (isEmpty(pixel.x, pixel.y-1)) {
                createPixel("smoke", pixel.x, pixel.y-1);
            }
        }
    }
};

elements.frozen_yeti_head = {
    color: ["#a1c1e0", "#d9c3b0", "#84a9cc"],
    category: "ice solids",
    hidden: true,
    state: "solid",
    density: 2000,
    behavior: behaviors.WALL,
    temp: -50,
    tempHigh: 0,
    stateHigh: "yeti_head"
};

elements.frozen_yeti_body = {
    color: ["#a1c1e0", "#ffffff", "#84a9cc"],
    category: "ice solids",
    hidden: true,
    state: "solid",
    density: 2000,
    behavior: behaviors.WALL,
    temp: -50,
    tempHigh: 0,
    stateHigh: "yeti_body"
};

elements.frozen_yeti = {
    name: "frozen yeti",
    color: ["#a1c1e0", "#ffffff", "#84a9cc"],
    category: "ice solids",
    state: "solid",
    density: 2000,
    behavior: behaviors.WALL,
    temp: -50,
    tempHigh: 0,
    stateHigh: "yeti"
};

elements.frozen_yeti_head = {
    color: ["#a1c1e0", "#d9c3b0", "#84a9cc"],
    category: "ice solids",
    hidden: true,
    state: "solid",
    density: 2000,
    behavior: behaviors.WALL,
    temp: -50,
    tempHigh: 0,
    stateHigh: "yeti_head"
};

elements.frozen_yeti_body = {
    color: ["#a1c1e0", "#ffffff", "#84a9cc"],
    category: "ice solids",
    hidden: true,
    state: "solid",
    density: 2000,
    behavior: behaviors.WALL,
    temp: -50,
    tempHigh: 0,
    stateHigh: "yeti_body"
};

elements.frozen_yeti = {
    name: "frozen yeti",
    color: ["#a1c1e0", "#ffffff", "#84a9cc"],
    category: "ice solids",
    state: "solid",
    density: 2000,
    behavior: behaviors.WALL,
    temp: -50,
    tempHigh: 0,
    stateHigh: "yeti"
};

elements.frozen_yeti_head = {
    color: ["#a1c1e0", "#d9c3b0", "#84a9cc"],
    category: "ice solids",
    hidden: true,
    state: "solid",
    density: 2000,
    behavior: behaviors.WALL,
    temp: -50,
    tempHigh: 0,
    stateHigh: "yeti_head"
};

elements.frozen_yeti_body = {
    color: ["#a1c1e0", "#ffffff", "#84a9cc"],
    category: "ice solids",
    hidden: true,
    state: "solid",
    density: 2000,
    behavior: behaviors.WALL,
    temp: -50,
    tempHigh: 0,
    stateHigh: "yeti_body"
};

elements.frozen_yeti = {
    name: "frozen yeti",
    color: ["#a1c1e0", "#ffffff", "#84a9cc"],
    category: "ice solids",
    state: "solid",
    density: 2000,
    behavior: behaviors.WALL,
    temp: -50,
    tempHigh: 20,
    stateHigh: "yeti"
};

elements.arctic_monkey = {
    color: ["#959595","#8c7f76","#665b51","#f49c9a","#ffb2a8","#f8c7ed"],
    category: "life",
    properties: {
        dead: false,
        dir: 1,
        panic: 0,
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            createPixel("body", pixel.x, pixel.y+1);
            pixel.element = "head";
        }
        else if (isEmpty(pixel.x, pixel.y-1)) {
            createPixel("head", pixel.x, pixel.y-1);
            pixelMap[pixel.x][pixel.y-1].color = pixel.color;
            pixel.element = "body";
            pixel.color = pixelColorPick(pixel)
        }
        else {
            deletePixel(pixel.x, pixel.y);
        }
    },
};


elements.body = {
    color: ["#766a62","#87817b","#4a4948","#e6d9d0"],
    category: "life",
    hidden: true,
    density: 1500,
    state: "solid",
    conduct: 25,
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -30,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    reactions: {
        "cancer": { "elem1":"cancer", "chance":0.005 },
        "radiation": { "elem1":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
    },
    properties: {
        dead: false,
        dir: 1,
        panic: 0,
    },
    tick: function(pixel) {
        if (tryMove(pixel, pixel.x, pixel.y+1)) { 
            if (!isEmpty(pixel.x, pixel.y-2, true)) { 
                var headpixel = pixelMap[pixel.x][pixel.y-2];
                if (headpixel.element == "head") {
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
        
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
            }
            return
        }

        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head") {
            var head = pixelMap[pixel.x][pixel.y-1];
            if (head.dead) { // If head is dead, kill body
                pixel.dead = head.dead;
            }
        }
        else { var head = null }

        if (isEmpty(pixel.x, pixel.y-1)) {
            // create blood if decapitated 10% chance
            if (Math.random() < 0.1) {
                createPixel("blood", pixel.x, pixel.y-1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
        else if (head == null) { return }
        else if (Math.random() < 0.1) { 
            var movesToTry = [
                [1*pixel.dir,0],
                [1*pixel.dir,-1],
            ];
           
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
                    if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1])) {
                        movePixel(head, head.x+move[0], head.y+move[1]);
                        break;
                    }
                }
            }
            if (Math.random() < 0.15) {
                pixel.dir *= -1;
            }
        }

    },
},

elements.head = {
    color: ["#f283c3","#ec6e96","#ff0062","#f64fa5","#ff7d7d"],
    category: "life",
    hidden: true,
    density: 1080,
    state: "solid",
    conduct: 25,
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -30,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    reactions: {
        "cancer": { "elem1":"cancer", "chance":0.005 },
        "radiation": { "elem1":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
    },
    properties: {
        dead: false
    },
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }

        
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) { // If body is dead, kill head
                pixel.dead = body.dead;
            }
        }
        else { var body = null }

        if (isEmpty(pixel.x, pixel.y+1)) {
            tryMove(pixel, pixel.x, pixel.y+1);
            // create blood if severed 10% chance
            if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1) {
                createPixel("blood", pixel.x, pixel.y+1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
    }
};

elements.dodo = {
    color: ["#8b6651", "#a18c5c", "#9f897f","#a67931"],
    behavior: [
    "XX|SW:water,salt_water,sugar_water,dirty_water%10|XX",
    "BO:polar_bear,polar_bear_cub,killer_whale%50|FX%1|M1 AND SW:water,salt_water,sugar_water,dirty_water%15 AND BO:polar_bear,polar_bear_cub,killer_whale%40",
    "M2|M1|M1 AND SW:water,salt_water,sugar_water,dirty_water%15"
],

    category: "life",
    state: "solid",
    density: 1050,

    tempHigh: 100,
    stateHigh: "cooked_meat",

    burn: 5,
    burnTime: 250,
    burnInto: "cooked_meat",

    reactions: {
        seeds: { elem2: null, chance: 0.35 },
        clam: { elem2: null, chance: 0.35 },
        oxygen: { elem2: "carbon_dioxide", chance: 0.3 },
        poison: { elem1: "rotten_meat", chance: 0.2 },
        plant: { elem2: null, chance: 0.05 },
        algae: {elem2: null, chance: 0.05 },
        watermelon: { elem2: null, chance: 0.65 }
    }
};

elements.watermelon = {
    name: "watermelon",
    color: ["#2f7d32", "#1f5f2a", "#1a7f2b"],
    behavior: behaviors.WALL,
    category: "food",
    state: "solid",
    density: 950,
    breakInto: "seeds"
};

elements.mammoth = {
    name: "mammoth",
       color: ["#7B3F00", "#8B4513", "#A0522D", "#8F4E2B", "#9B5A32",
    "#A65E2E", "#B5651D", "#C0783E", "#AD6F3B", "#925C3B",
    "#A97142", "#B87333", "#C08050", "#8D5524", "#6F4E37",
    "#AA6C39", "#BE6E32",
    "#F5E6C8", "#F3E5AB", "#FFF1D0"
 ],
    category: "life",
    state: "solid",
    density: 1800,
    properties: {
        dir: 1
    },
    reactions: {
        "plant": { elem2: null, chance: 0.15 },
        "grass": { elem2: null, chance: 0.15 },
        "mod_tundra_grass": { elem2: null, chance: 0.15 },
        "leaves": { elem2: null, chance: 0.1 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 }
    },
    foodNeed: 20,
    temp: 35,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 300,
    tick: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;

        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);

        if (isEmpty(x + 1, y) && isEmpty(x, y + 1) && isEmpty(x + 1, y + 1)) {
            createPixel("mammoth_body", x + 1, y);
            createPixel("mammoth_back_leg", x, y + 1);
            createPixel("mammoth_front_leg", x + 1, y + 1);
        }

        if (
            isEmpty(x + 1, y) || isEmpty(x, y + 1) || isEmpty(x + 1, y + 1) ||
            pixelMap[x + 1][y].element !== "mammoth_body" ||
            pixelMap[x][y + 1].element !== "mammoth_back_leg" ||
            pixelMap[x + 1][y + 1].element !== "mammoth_front_leg"
        ) {
            return;
        }

        var body = pixelMap[x + 1][y];
        var backLeg = pixelMap[x][y + 1];
        var frontLeg = pixelMap[x + 1][y + 1];

        if (isEmpty(x, y + 2) && isEmpty(x + 1, y + 2)) {
            movePixel(backLeg, x, y + 2);
            movePixel(frontLeg, x + 1, y + 2);
            movePixel(pixel, x, y + 1);
            movePixel(body, x + 1, y + 1);
            return;
        }

        if (Math.random() < 0.1) {
            if (pixel.dir > 0 && x + 2 < width &&
                isEmpty(x + 2, y) && isEmpty(x + 2, y + 1)) {
                movePixel(body, x + 2, y);
                movePixel(frontLeg, x + 2, y + 1);
                movePixel(pixel, x + 1, y);
                movePixel(backLeg, x + 1, y + 1);
            } else if (pixel.dir < 0 && x > 0 &&
                isEmpty(x - 1, y) && isEmpty(x - 1, y + 1)) {
                movePixel(pixel, x - 1, y);
                movePixel(backLeg, x - 1, y + 1);
                movePixel(body, x, y);
                movePixel(frontLeg, x, y + 1);
            } else {
                pixel.dir *= -1;
            }
        }
    }
};

elements.mammoth_body = {
    name: "mammoth body",
        color: ["#7B3F00", "#8B4513", "#A0522D", "#8F4E2B", "#9B5A32",
    "#A65E2E", "#B5651D", "#C0783E", "#AD6F3B", "#925C3B",
    "#A97142", "#B87333", "#C08050", "#8D5524", "#6F4E37",
    "#AA6C39", "#BE6E32",
    "#F5E6C8", "#F3E5AB", "#FFF1D0"
 ],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};

elements.mammoth_back_leg = {
    name: "mammoth back leg",
    color: ["#7B3F00", "#8B4513", "#A0522D", "#8F4E2B", "#9B5A32",
    "#A65E2E", "#B5651D", "#C0783E", "#AD6F3B", "#925C3B",
    "#A97142", "#B87333", "#C08050", "#8D5524", "#6F4E37",
    "#AA6C39", "#BE6E32",
    "#F5E6C8", "#F3E5AB", "#FFF1D0"
 ],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};

elements.mammoth_front_leg = {
    name: "mammoth front leg",
    color: ["#7B3F00", "#8B4513", "#A0522D", "#8F4E2B", "#9B5A32",
    "#A65E2E", "#B5651D", "#C0783E", "#AD6F3B", "#925C3B",
    "#A97142", "#B87333", "#C08050", "#8D5524", "#6F4E37",
    "#AA6C39", "#BE6E32",
    "#F5E6C8", "#F3E5AB", "#FFF1D0"
 ],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};
//the mammoth is a moving box LOL

elements.big_polar_bear = {
    name: "big polar bear",
    color: ["#ffffff"],
    category: "life",
    state: "solid",
    density: 1800,
    properties: { dir: 1 },
    reactions: {
        "fish": { elem2: null, chance: 0.25 },
        "seal": { elem2: null, chance: 0.3 },
        "penguin": { elem2: null, chance: 0.3 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 }
    },
    foodNeed: 18,
    temp: 35,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 300,
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);

        var x = pixel.x;
        var y = pixel.y;

        if (x + 1 >= width || y + 1 >= height) return;

        if (
            isEmpty(x + 1, y) &&
            isEmpty(x, y + 1) &&
            isEmpty(x + 1, y + 1)
        ) {
            createPixel("big_polar_bear_body", x + 1, y);
            createPixel("big_polar_bear_back_leg", x, y + 1);
            createPixel("big_polar_bear_front_leg", x + 1, y + 1);
            return;
        }

        if (
            isEmpty(x + 1, y, true) ||
            isEmpty(x, y + 1, true) ||
            isEmpty(x + 1, y + 1, true) ||
            pixelMap[x + 1][y].element !== "big_polar_bear_body" ||
            pixelMap[x][y + 1].element !== "big_polar_bear_back_leg" ||
            pixelMap[x + 1][y + 1].element !== "big_polar_bear_front_leg"
        ) return;

        var body = pixelMap[x + 1][y];
        var backLeg = pixelMap[x][y + 1];
        var frontLeg = pixelMap[x + 1][y + 1];

        pixel.dir = pixel.dir || 1;

        if (Math.random() < 0.1) {
            if (pixel.dir > 0 && x + 2 < width &&
                isEmpty(x + 2, y) && isEmpty(x + 2, y + 1)) {
                movePixel(body, x + 2, y);
                movePixel(frontLeg, x + 2, y + 1);
                movePixel(pixel, x + 1, y);
                movePixel(backLeg, x + 1, y + 1);
            } else if (pixel.dir < 0 && x > 0 &&
                isEmpty(x - 1, y) && isEmpty(x - 1, y + 1)) {
                movePixel(pixel, x - 1, y);
                movePixel(backLeg, x - 1, y + 1);
                movePixel(body, x, y);
                movePixel(frontLeg, x, y + 1);
            } else {
                pixel.dir *= -1;
            }
        }

        x = pixel.x;
        y = pixel.y;

        if (
            y + 2 < height &&
            isEmpty(x, y + 2) &&
            isEmpty(x + 1, y + 2)
        ) {
            movePixel(pixelMap[x][y + 1], x, y + 2);
            movePixel(pixelMap[x + 1][y + 1], x + 1, y + 2);
            movePixel(pixel, x, y + 1);
            movePixel(pixelMap[x + 1][y], x + 1, y + 1);
        }
    }
};

elements.big_polar_bear_body = {
    name: "big polar bear body",
    color: ["#ffffff"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};

elements.big_polar_bear_back_leg = {
    name: "big polar bear back leg",
    color: ["#ffffff"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};

elements.big_polar_bear_front_leg = {
    name: "big polar bear front leg",
    color: ["#ffffff"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};
elements.big_walrus_body = {
    name: "big walrus body",
    color: ["#3d281b", "#5c4130", "#493123", "#553521"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};

elements.big_walrus_tusk = {
    name: "big walrus tusk",
    color: ["#fffdf5"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "bone"
};

elements.big_walrus_front_leg = {
    name: "big walrus front leg",
    color: ["#3d281b", "#5c4130", "#493123", "#553521"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};

elements.woolly_rhino = {
    name: "woolly rhino",
    color: ["#ffffff"],
    category: "life",
    state: "solid",
    density: 1800,
    properties: { dir: 1 },
    reactions: {
        "plant": { elem2: null, chance: 0.2 },
        "grass": { elem2: null, chance: 0.2 },
        "mod_tundra_grass": { elem2: null, chance: 0.5 },
        "leaves": { elem2: null, chance: 0.1 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 }
    },
    foodNeed: 18,
    temp: 35,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 300,
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);

        var x = pixel.x;
        var y = pixel.y;

        if (x + 1 >= width || y + 1 >= height) return;

        if (
            isEmpty(x + 1, y) &&
            isEmpty(x, y + 1) &&
            isEmpty(x + 1, y + 1)
        ) {
            createPixel("woolly_rhino_body", x + 1, y);
            createPixel("woolly_rhino_back_leg", x, y + 1);
            createPixel("woolly_rhino_front_leg", x + 1, y + 1);
            return;
        }

        if (
            isEmpty(x + 1, y, true) ||
            isEmpty(x, y + 1, true) ||
            isEmpty(x + 1, y + 1, true) ||
            pixelMap[x + 1][y].element !== "woolly_rhino_body" ||
            pixelMap[x][y + 1].element !== "woolly_rhino_back_leg" ||
            pixelMap[x + 1][y + 1].element !== "woolly_rhino_front_leg"
        ) return;

        var body = pixelMap[x + 1][y];
        var backLeg = pixelMap[x][y + 1];
        var frontLeg = pixelMap[x + 1][y + 1];

        pixel.dir = pixel.dir || 1;

        if (Math.random() < 0.1) {
            if (pixel.dir > 0 && x + 2 < width &&
                isEmpty(x + 2, y) && isEmpty(x + 2, y + 1)) {
                movePixel(body, x + 2, y);
                movePixel(frontLeg, x + 2, y + 1);
                movePixel(pixel, x + 1, y);
                movePixel(backLeg, x + 1, y + 1);
            } else if (pixel.dir < 0 && x > 0 &&
                isEmpty(x - 1, y) && isEmpty(x - 1, y + 1)) {
                movePixel(pixel, x - 1, y);
                movePixel(backLeg, x - 1, y + 1);
                movePixel(body, x, y);
                movePixel(frontLeg, x, y + 1);
            } else {
                pixel.dir *= -1;
            }
        }

        x = pixel.x;
        y = pixel.y;

        if (
            y + 2 < height &&
            isEmpty(x, y + 2) &&
            isEmpty(x + 1, y + 2)
        ) {
            movePixel(pixelMap[x][y + 1], x, y + 2);
            movePixel(pixelMap[x + 1][y + 1], x + 1, y + 2);
            movePixel(pixel, x, y + 1);
            movePixel(pixelMap[x + 1][y], x + 1, y + 1);
        }
    }
};

elements.woolly_rhino_body = {
    name: "woolly rhino body",
    color: ["#75675b", "#887668", "#695c51", "#9a8876"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};

elements.woolly_rhino_back_leg = {
    name: "woolly rhino back leg",
    color: ["#75675b", "#887668", "#695c51", "#9a8876"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};

elements.woolly_rhino_front_leg = {
    name: "woolly rhino front leg",
    color: ["#75675b", "#887668", "#695c51", "#9a8876"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};
elements.saber_tooth_tiger = {
    name: "saber-tooth tiger",
    color: ["#b8793e", "#c98b4d", "#9f6335", "#d6a15c"],
    category: "life",
    state: "solid",
    density: 1800,
    properties: { dir: 1 },
    reactions: {
        "meat": { elem2: null, chance: 0.3 },
        "rotten_meat": { elem2: null, chance: 0.2 },
        "arctic_hare": { elem2: null, chance: 0.3 },
        "reindeer": { elem2: null, chance: 0.25 },
        "dodo": { elem2: null, chance: 0.2 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 }
    },
    foodNeed: 18,
    temp: 35,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 300,
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);

        var x = pixel.x;
        var y = pixel.y;

        if (x + 1 >= width || y + 1 >= height) return;

        if (
            isEmpty(x + 1, y) &&
            isEmpty(x, y + 1) &&
            isEmpty(x + 1, y + 1)
        ) {
            createPixel("saber_tooth_tiger_body", x + 1, y);
            createPixel("saber_tooth_tiger_tusk", x, y + 1);
            createPixel("saber_tooth_tiger_front_leg", x + 1, y + 1);
            return;
        }

        if (
            isEmpty(x + 1, y, true) ||
            isEmpty(x, y + 1, true) ||
            isEmpty(x + 1, y + 1, true) ||
            pixelMap[x + 1][y].element !== "saber_tooth_tiger_body" ||
            pixelMap[x][y + 1].element !== "saber_tooth_tiger_tusk" ||
            pixelMap[x + 1][y + 1].element !== "saber_tooth_tiger_front_leg"
        ) return;

        var body = pixelMap[x + 1][y];
        var tusk = pixelMap[x][y + 1];
        var frontLeg = pixelMap[x + 1][y + 1];

        pixel.dir = pixel.dir || 1;

        if (Math.random() < 0.1) {
            if (pixel.dir > 0 && x + 2 < width &&
                isEmpty(x + 2, y) && isEmpty(x + 2, y + 1)) {
                movePixel(body, x + 2, y);
                movePixel(frontLeg, x + 2, y + 1);
                movePixel(pixel, x + 1, y);
                movePixel(tusk, x + 1, y + 1);
            } else if (pixel.dir < 0 && x > 0 &&
                isEmpty(x - 1, y) && isEmpty(x - 1, y + 1)) {
                movePixel(pixel, x - 1, y);
                movePixel(tusk, x - 1, y + 1);
                movePixel(body, x, y);
                movePixel(frontLeg, x, y + 1);
            } else {
                pixel.dir *= -1;
            }
        }

        x = pixel.x;
        y = pixel.y;

        if (
            y + 2 < height &&
            isEmpty(x, y + 2) &&
            isEmpty(x + 1, y + 2)
        ) {
            movePixel(pixelMap[x][y + 1], x, y + 2);
            movePixel(pixelMap[x + 1][y + 1], x + 1, y + 2);
            movePixel(pixel, x, y + 1);
            movePixel(pixelMap[x + 1][y], x + 1, y + 1);
        }
    }
};

elements.saber_tooth_tiger_body = {
    name: "saber-tooth tiger body",
    color: ["#b8793e", "#c98b4d", "#9f6335", "#d6a15c"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};

elements.saber_tooth_tiger_tusk = {
    name: "saber-tooth tiger tusk",
    color: ["#fffdf5"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "bone"
};

elements.saber_tooth_tiger_front_leg = {
    name: "saber-tooth tiger front leg",
    color: ["#b8793e", "#c98b4d", "#9f6335", "#d6a15c"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};

elements.frozen_fossil = {
    name: "frozen fossil",
    color: ["#5a5958", "#888887", "#807f7e", "#474747"],
    state: "solid",
    behavior: behaviors.WALL,
    category: "ice solids",
    density: 2800,
    hardness: 0.9,
    breakInto: "bone",
    temp: -50,
    tempHigh: 0,
    stateHigh: "fossil_block",
    tempLow: -100,
    stateLow: "permafrost_ice",
};

elements.petroleum = {
    name: "petroleum",
    color: ["#0d1011", "#0d1218", "#202020"],
    state: "liquid",
    behavior: behaviors.LIQUID,
    category: "ice solids",
    density: 995,
    temp: 20,
    tempHigh: 100,
    stateHigh: "steam",
    tempLow: -50,
    stateLow: "smoke",
    reactions: {
        "water": { elem2: "dirty_water", chance: 0.4 },
        "fossil": { elem2: "petroleum", chance: 0.3 },
        "fire": { elem2: "oil", chance: 0.93 },
         "magma":{elem2:"oil", chance:0.93}
    },

};

elements.absolute_zero_gas = {
    name: "absolute zero gas",
    color: ["#c8f7ff", "#94dff0", "#e8fcff"],
    behavior: behaviors.GAS,
    category: "weapons",
    state: "gas",
    density: 0.3,
    temp: -273,
    tick: function(pixel) {
        var radius = 2;

        for (var x = Math.max(0, pixel.x - radius); x <= Math.min(width - 1, pixel.x + radius); x++) {
            for (var y = Math.max(0, pixel.y - radius); y <= Math.min(height - 1, pixel.y + radius); y++) {
                var distanceX = x - pixel.x;
                var distanceY = y - pixel.y;

                if (distanceX * distanceX + distanceY * distanceY > radius * radius) {
                    continue;
                }

                if (isEmpty(x, y, true)) {
                    continue;
                }

                var target = pixelMap[x][y];

                if (target === pixel) {
                    continue;
                }

                target.temp = -273;

                if (
                    target.element === "water" ||
                    target.element === "salt_water" ||
                    target.element === "dirty_water" ||
                    target.element === "sugar_water"
                ) {
                    changePixel(target, "ice");
                } else if (
                    elements[target.element] &&
                    elements[target.element].category === "life"
                ) {
                    changePixel(target, "frozen_meat");
                } else {
                    doHeat(target);
                }
            }
        }

        deletePixel(pixel.x, pixel.y);
    }
};


elements.snowman = {
    name: "snowman",
    color: ["#f2f7fa", "#e8f0f4", "#ffffff"],
    category: "ice solids",
    state: "solid",
    behavior: behaviors.WALL,
    density: 700,
    tempHigh: 0,
    stateHigh: "water",
    breakInto: "snow",
    onPlace: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;

        if (x < 1 || x >= width - 1 || y < 3) return;

        var parts = [
            ["snowman_middle", x, y - 1],
            ["snowman_head", x, y - 2],
            ["snowman_hat", x, y - 3],
            ["snowman_nose", x + 1, y - 2],
            ["wood", x - 1, y - 1],
            ["wood", x + 1, y - 1]
        ];

        for (var i = 0; i < parts.length; i++) {
            if (!isEmpty(parts[i][1], parts[i][2])) return;
        }

        for (var i = 0; i < parts.length; i++) {
            createPixel(parts[i][0], parts[i][1], parts[i][2]);
        }
    }
};

elements.snowman_middle = {
    name: "snowman middle",
    color: ["#f2f7fa", "#e8f0f4", "#ffffff"],
    category: "solids",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 650,
    tempHigh: 0,
    stateHigh: "water",
    breakInto: "snow"
};

elements.snowman_head = {
    name: "snowman head",
    color: ["#f2f7fa", "#e8f0f4", "#ffffff"],
    category: "solids",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 600,
    tempHigh: 0,
    stateHigh: "water",
    breakInto: "snow"
};

elements.snowman_hat = {
    name: "snowman hat",
    color: ["#20252b", "#303840"],
    category: "solids",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1200,
    tempHigh: 200,
    stateHigh: "ash",
    breakInto: "ash"
};

elements.snowman_nose = {
    name: "snowman nose",
    color: ["#ed7926", "#f28c28"],
    category: "solids",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 900,
    breakInto: "watermelon"
};

function moveLivingSnowman(parts, dx, dy) {
    for (var i = 0; i < parts.length; i++) {
        var targetX = parts[i].x + dx;
        var targetY = parts[i].y + dy;

        if (
            targetX < 0 || targetX >= width ||
            targetY < 0 || targetY >= height
        ) return false;

        if (!isEmpty(targetX, targetY, true)) {
            var occupant = pixelMap[targetX][targetY];
            if (parts.indexOf(occupant) === -1) return false;
        }
    }

    var orderedParts = parts.slice().sort(function(a, b) {
        if (dx > 0) return b.x - a.x;
        if (dx < 0) return a.x - b.x;
        if (dy > 0) return b.y - a.y;
        return a.y - b.y;
    });

    for (var i = 0; i < orderedParts.length; i++) {
        var part = orderedParts[i];
        movePixel(part, part.x + dx, part.y + dy);
    }

    return true;
}

elements.living_snowman = {
    name: "living snowman",
    color: ["#f2f7fa", "#e8f0f4", "#ffffff"],
    category: "life",
    state: "solid",
    density: 700,
    properties: {
        dir: 1,
        nextMove: 0
    },
    tempHigh: 0,
    stateHigh: "water",
    breakInto: "snow",
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);

        var x = pixel.x;
        var y = pixel.y;

        if (x < 1 || x >= width - 1 || y < 3) return;

        var partSpecs = [
            ["living_snowman_middle", x, y - 1],
            ["living_snowman_head", x, y - 2],
            ["living_snowman_hat", x, y - 3],
            ["living_snowman_nose", x + 1, y - 2],
            ["living_snowman_arm", x - 1, y - 1],
            ["living_snowman_arm", x + 1, y - 1]
        ];

        var allPartsEmpty = true;

        for (var i = 0; i < partSpecs.length; i++) {
            if (!isEmpty(partSpecs[i][1], partSpecs[i][2])) {
                allPartsEmpty = false;
                break;
            }
        }

        if (allPartsEmpty) {
            for (var i = 0; i < partSpecs.length; i++) {
                createPixel(partSpecs[i][0], partSpecs[i][1], partSpecs[i][2]);
            }
            pixel.nextMove = pixelTicks + 10;
            return;
        }

        var parts = [pixel];

        for (var i = 0; i < partSpecs.length; i++) {
            var partX = partSpecs[i][1];
            var partY = partSpecs[i][2];

            if (isEmpty(partX, partY, true)) return;

            var part = pixelMap[partX][partY];
            if (part.element !== partSpecs[i][0]) return;

            parts.push(part);
        }

        pixel.dir = pixel.dir || 1;

        if (isEmpty(pixel.x, pixel.y + 1) && moveLivingSnowman(parts, 0, 1)) {
            return;
        }

        if (pixelTicks >= pixel.nextMove) {
            if (!moveLivingSnowman(parts, pixel.dir, 0)) {
                pixel.dir *= -1;
                moveLivingSnowman(parts, pixel.dir, 0);
            }

            pixel.nextMove = pixelTicks + 10;
        }
    }
};

elements.living_snowman_middle = {
    name: "living snowman middle",
    color: ["#f2f7fa", "#e8f0f4", "#ffffff"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 650,
    tempHigh: 0,
    stateHigh: "water",
    breakInto: "snow"
};

elements.living_snowman_head = {
    name: "living snowman head",
    color: ["#f2f7fa", "#e8f0f4", "#ffffff"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 600,
    tempHigh: 0,
    stateHigh: "water",
    breakInto: "snow"
};

elements.living_snowman_hat = {
    name: "living snowman hat",
    color: ["#20252b", "#303840"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1200,
    tempHigh: 200,
    stateHigh: "ash",
    breakInto: "ash"
};

elements.living_snowman_nose = {
    name: "living snowman nose",
    color: ["#ed7926", "#f28c28"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 900,
    breakInto: "watermelon"
};

elements.living_snowman_arm = {
    name: "living snowman arm",
    color: ["#7a4d2b", "#684022"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1200,
    breakInto: "wood"
};

var auroraColors = [
    "#39ff14",
    "#19e6b5",
    "#20c7e8",
    "#528bff",
    "#a855f7",
    "#39ff14"
];

elements.aurora = {
    name: "aurora",
    color: auroraColors,
    category: "ice solids",
    state: "gas",
    behavior: behaviors.GAS,
    density: 0.2,
    temp: -30,
    tick: function(pixel) {
        if (pixel.auroraPhase === undefined) {
            pixel.auroraPhase = Math.floor(Math.random() * auroraColors.length);
        }

        if (pixelTicks % 8 === 0) {
            pixel.auroraPhase =
                (pixel.auroraPhase + 1) % auroraColors.length;
            pixel.color = auroraColors[pixel.auroraPhase];
        }
    }
};


// by 𝔜𝔒𝔖𝔈𝔉
//penguins.js v2.0 fixed various bugs and added walrus, artic wolf and clam (:

//v 1.0 some ice animals
elements.penguin = {
    name: "penguin",
    color: ["#0c0c12","#babae3","#02022e","#d2d2fc","#000000","#5946f0","#5b5b5c","#95a7c4","#f5f17f","#723911"],
    state: "solid",
    behavior: [
        "XX|SW:water,salt_water,sugar_water,dirty_water%10|XX",
        "BO:polar_bear,polar_bear_cub,killer_whale%50|FX%1|M1 AND SW:water,salt_water,sugar_water,dirty_water%15 AND BO:polar_bear,polar_bear_cub,killer_whale%40",
        "M2|M1|M1 AND SW:water,salt_water,sugar_water,dirty_water%15"
    ],
    reactions: {
        "meat": { elem2:null, chance:0.2 },
        "cooked_meat": { elem2:null, chance:0.2 },
        "fish": { elem2:null, chance:0.2 },
        "plant": { elem2:null, chance:0.2 },
        "frozen_fish": { elem2:null, chance:0.3 },
        "herring": { elem2:null, chance:0.3 },
        "oxygen": { elem2:"carbon_dioxide", chance:0.3 },
        "poison": { elem1:"rotten_meat", chance:0.1 },
        "bleach": { elem1:"rotten_meat", chance:0.1 },
        "infection": { elem1:"rotten_meat", chance:0.025 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cyanide": { elem1:"rotten_meat", chance:0.1 },
        "chlorine": { elem1:"meat", chance:0.1 },
        "alcohol": { elem1:"meat", chance:0.025 },
        "dirty_water": { elem1:"rotten_meat", chance:0.0001 },
        "pool_water": { elem1:"rotten_meat", chance:0.005 },
        "vinegar": { elem1:"rotten_meat", chance:0.001 }

    },
    egg: "little_penguin", 
    foodNeed: 10,
    temp: 30,
    tempHigh: 1000,
    stateHigh: "frozen_penguin",
    tempLow: -210,
    stateLow: "frozen_penguin",
    category:"life",
    breakInto: "rotten_meat",
    burn:15,
    burnTime:300,
    density: 1450,
    conduct: 0.2
};

elements.little_penguin = {
    name: "little penguin",
    color: ["#e0e0e0","#cad7ed","#4e6282","#373f4a","#fff6a8","#723911"],
    state: "solid",
    behavior: [
        "XX|SW:water,salt_water,sugar_water,dirty_water%10|XX",
        "BO:polar_bear,polar_bear_cub,killer_whale%60|FX%1|M1 AND SW:water,salt_water,sugar_water,dirty_water%15 AND BO:polar_bear,polar_bear_cub,killer_whale%50",
        "M2|M1|M1 AND SW:water,salt_water,sugar_water,dirty_water%15"
    ],
    reactions: {
        "meat": { elem2:null, chance:0.2 },
        "cooked_meat": { elem2:null, chance:0.2 },
        "fish": { elem2:null, chance:0.2 },
        "frozen_fish": { elem2:null, chance:0.3 },
        "herring": { elem2:null, chance:0.3 },
        "oxygen": { elem2:"carbon_dioxide", chance:0.3 },
        "poison": { elem1:"rotten_meat", chance:0.1 },
        "bleach": { elem1:"rotten_meat", chance:0.1 },
        "infection": { elem1:"rotten_meat", chance:0.025 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cyanide": { elem1:"rotten_meat", chance:0.1 },
        "chlorine": { elem1:"meat", chance:0.1 },
        "alcohol": { elem1:"meat", chance:0.025 },
        "dirty_water": { elem1:"rotten_meat", chance:0.0001 },
        "pool_water": { elem1:"rotten_meat", chance:0.005 },
        "vinegar": { elem1:"rotten_meat", chance:0.001 }
    },
    egg: "little_penguin",
    foodNeed: 10,
    temp: 30,
    tempHigh: 100,
    stateHigh: "frozen_little_penguin",
    tempLow: -100,
    stateLow: "frozen_little_penguin",
    category:"life",
    breakInto: "rotten_meat",
    burn:15,
    burnTime:300,
    density: 1450,
    conduct: 0.2
};

elements.polar_bear = {
    color: ["#ffffff", "#f0f0f0", "#e3e3e3", "#111111"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "AT:penguin,little_penguin,seal,rat%35|FX%1|M1 AND AT:penguin,little_penguin,seal,rat%25",
        "M2|M1|M1"
    ],
    ignore: ["polar_bear", "polar_bear_cub"],
    reactions: {
        "fish": { elem2: null, chance: 0.2 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 },
        "bleach": { elem1: "rotten_meat", chance: 0.1 },
        "infection": { elem1: "rotten_meat", chance: 0.025 },
        "herring": { elem2: null, chance: 0.3 },
        "penguin": { elem2: null, chance: 0.3 },
        "seal": { elem2: null, chance: 0.3 },
        "little_penguin": { elem2: null, chance: 0.3 }
    },
    foodNeed: 15,
    temp: 31,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -150,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 250,
    density: 1500,
    conduct: 0.2
};

elements.polar_bear_cub = {
    color: ["#ffffff", "#f5f5f5"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "AT:penguin,little_penguin,rat%20|FX%1|M1 AND AT:penguin,little_penguin,rat%15",
        "M2|M1|M1"
    ],
    ignore: ["polar_bear", "polar_bear_cub"],
    reactions: {
        "fish": { elem2: null, chance: 0.2 },
        "herring": { elem2: null, chance: 0.2 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 }
    },
    baby: "polar_bear",
    foodNeed: 8,
    temp: 31,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 250,
    density: 1480,
    conduct: 0.2
};

elements.seal = {
    color: ["#7a7a7a", "#5c5c5c", "#a1a1a1", "#0f0f0f", "#dbd5d5", "#7d5a40"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "BO:polar_bear,polar_bear_cub,killer_whale%60|FX%1|M1 AND BO:polar_bear,polar_bear_cub,killer_whale%40",
        "M2|M1|M1"
    ],
    reactions: {
        "fish": { elem2: null, chance: 0.25 },
        "frozen_fish": { elem2: null, chance: 0.3 },
        "herring": { elem2: null, chance: 0.3 },
        "algae": { elem2: null, chance: 0.3 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    egg: "seal",
    foodNeed: 12,
    temp: 35,
    tempHigh: 90,
    stateHigh: "cooked_meat",
    tempLow: -120,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 280,
    density: 1350,
    conduct: 0.2
};

elements.seal_pup = {
    name: "seal pup",
    color: [
        "#ffffff", "#fbfbfb", "#f7f7f7", "#f4f4f6", "#f0f0f2", 
        "#edf0f2", "#e5e9ec", "#e1e5e8", "#dcdfe3", "#edeae6", 
        "#f5f2eb", "#eae6df", "#e3ded7", "#ded9d0", "#d4cec4",
        "#ccc6be", "#c4bcb5"
    ],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "BO:polar_bear,polar_bear_cub,killer_whale,arctic_wolf,inuit_body%80|FX%1|M1%35 AND BO:polar_bear,polar_bear_cub,killer_whale,arctic_wolf,inuit_body%60",
        "M2%30|M1%35|M1%35"
    ],
    ignore: ["seal", "seal_pup"],
    reactions: {
        "algae": { elem2: null, chance: 0.15 },
        "herring": { elem2: null, chance: 0.15 },
        "frozen_fish": { elem2: null, chance: 0.15 },
        "fish": { elem2: null, chance: 0.1 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    baby: "seal",
    foodNeed: 6,
    temp: 35,
    tempHigh: 85,
    stateHigh: "cooked_meat",
    tempLow: -130,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 12,
    burnTime: 240,
    density: 1250,
    conduct: 0.22
};

elements.killer_whale = {
    color: ["#0a0a0f", "#030305", "#ffffff", "#d6d6d6"],
    state: "solid",
    behavior: [
        "XX|M2%5 AND SW:water,salt_water,sugar_water,seltzer,pool_water,primordial_soup%14|XX",
        "AT:penguin,little_penguin,seal,polar_bear,polar_bear_cub,rat,herring,narwhal,clam%40 AND SW:water,salt_water,sugar_water,seltzer,pool_water,primordial_soup%30|FX%0.5|AT:penguin,little_penguin,seal,polar_bear,polar_bear_cub,rat,seal_pup%30 AND SW:water,salt_water,sugar_water,seltzer,pool_water,primordial_soup%30",
        "M2|XX|M2 AND SW:water,salt_water,sugar_water,seltzer,pool_water,primordial_soup%5"
    ],
    ignore: ["killer_whale"],
    reactions: {
        "fish": { elem2: null, chance: 0.3 },
        "herring": { elem2: null, chance: 0.3 },
        "penguin": { elem2: null, chance: 0.3 },
        "seal": { elem2: null, chance: 0.3 },
        "seal_pup": { elem2: null, chance: 0.3 },
        "little_penguin": { elem2: null, chance: 0.3 },
        "clam": { elem2: null, chance: 0.3 },
        "narwhal": { elem2: null, chance: 0.3 },
        "walrus": { elem2: null, chance: 0.3 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 }
    },
    category: "life",
    foodNeed: 20,
    temp: 36,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -80,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 200,
    density: 1026,
    conduct: 0.1
};

elements.frozen_penguin = {
    color: ["#a1c1e0", "#0c0c12", "#84a9cc"], 
    state: "solid",
    behavior: behaviors.WALL, 
    category: "ice solids",
    density: 917,
    temp: 1005,               
    tempLow: 0,
    stateLow: "penguin",      
    conduct: 0.1
};

elements.frozen_little_penguin = {
    color: ["#cad7ed", "#e0e0e0", "#4e6282"], 
    state: "solid",
    behavior: behaviors.WALL, 
    category: "ice solids",
    density: 917,
    temp: 105,                
    tempLow: 0,
    stateLow: "little_penguin", 
    conduct: 0.1
};

//v 2.0 fixed bugs and another some animals
elements.clam = {
    color: ["#d1c7bd", "#a89b8d", "#ede6de"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "XX|FX%0.1 AND M1 AND SW:water,salt_water,sugar_water%100|XX",
        "M2|XX|M2"
    ],
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.1 },
        "poison": { elem1: "rotten_meat", chance: 0.2 }
    },
    category: "life",
    foodNeed: 2,
    temp: 8,
    tempHigh: 50,
    stateHigh: "cooked_meat",
    tempLow: -20,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};

elements.walrus = {
    color: ["#634a3b", "#7c604f", "#4f3729", "#bda698"],
    state: "solid",
    behavior: [
        "XX|SW:water,salt_water,sugar_water%5|XX",
        "BO:polar_bear,killer_whale%40|FX%1|M1 AND SW:water,salt_water,sugar_water%10 AND BO:polar_bear,killer_whale%20",
        "M2|M1|M1 AND SW:water,salt_water,sugar_water%10"
    ],
    reactions: {
        "algae": { elem2: null, chance: 0.25 },
        "herring": { elem2: null, chance: 0.25 },
        "clam": { elem2: null, chance: 0.35 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 },
        "fish": { elem2: null, chance: 0.3 },
        "plant": { elem2: null, chance: 0.3 }
    },
    egg: "walrus",
    foodNeed: 14,
    temp: 36,
    tempHigh: 85,
    stateHigh: "cooked_meat",
    tempLow: -130,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 260,
    density: 1200,
    conduct: 0.18
};

elements.arctic_wolf = {
    color: ["#fcfcfc", "#eaeaea", "#d3d3d3", "#b5b5b5"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "AT:penguin,little_penguin,rat,rabbit,seal%40 AND BO:polar_bear%40|FX%1|M1%80 AND AT:penguin,little_penguin,rat,rabbit,seal%30 AND BO:polar_bear%30",
        "M2%50|M1%80|M1%80"
    ],
    ignore: ["arctic_wolf"],
    reactions: {
        "meat": { elem2: null, chance: 0.25 },
        "cooked_meat": { elem2: null, chance: 0.25 },                                                                                 
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 },
        "bleach": { elem1: "rotten_meat", chance: 0.1 },
        "infection": { elem1: "rotten_meat", chance: 0.025 },
        "herring": { elem2: null, chance: 0.3 },
        "penguin": { elem2: null, chance: 0.3 },
        "artic_hare": { elem2: null, chance: 0.3 },
        "seal": { elem2: null, chance: 0.3 },
        "little_penguin": { elem2: null, chance: 0.3 },
        "fish": { elem2: null, chance: 0.3 }
    },
    egg: "arctic_wolf",
    foodNeed: 12,
    temp: 32,
    tempHigh: 78,
    stateHigh: "cooked_meat",
    tempLow: -140,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 220,
    density: 1400,
    conduct: 0.22
};

//v 3.0 another artic animals and stuff...
elements.arctic_hare = {
    color: ["#ffffff", "#f7f7f7", "#eeeeee", "#111111", "#662c0e"],
    state: "solid",
    behavior: [
        "XX|M1%30 AND SW:water,salt_water%5|XX",
        "BO:polar_bear,arctic_wolf%70|FX%1|M1%95 AND BO:polar_bear,arctic_wolf%50",
        "M2%70|M1%95|M1%95"
    ],
    ignore: ["arctic_hare"],
    reactions: {
        "plant": { elem2: null, chance: 0.25 },
        "grass": { elem2: null, chance: 0.25 },
        "mod_tundra_grass": { elem2: null, chance: 0.5 },
        "algae": { elem2: null, chance: 0.2 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    egg: "arctic_hare",
    foodNeed: 6,
    temp: 33,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -145,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 10,
    burnTime: 180,
    density: 1100,
    conduct: 0.25
};
 elements.arctic_owl = {
    color: ["#ffffff", "#fbfbfb", "#f7f7f7", "#fad61d"],
    state: "solid",
    behavior: [
        "M2|M1 AND AT:arctic_hare,rat%50|M2",
        "M1|FLY AND AT:arctic_hare,rat%30|M1",
        "M2|M1|M2"
    ],
    ignore: ["arctic_owl"],
    reactions: {
        "meat": { elem2: null, chance: 0.25 },
        "cooked_meat": { elem2: null, chance: 0.25 },
        "artic_hare": { elem2: null, chance: 0.38 },
        "herring": { elem2: null, chance: 0.25 },
        "fish": { elem2: null, chance: 0.25 },
        "cooked_meat": { elem2: null, chance: 0.2 },
        "walrus": { elem2: null, chance: 0.2 },
        "rat": { elem2: null, chance: 0.25 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    egg: "arctic_owl",
    foodNeed: 10,
    temp: 34,
    tempHigh: 76,
    stateHigh: "cooked_meat",
    tempLow: -150,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 200,
    density: 1000,
    conduct: 0.2
};
elements.inuit_head = {
    color: ["#d9c3b0", "#e0dacb"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "BO:polar_bear,killer_whale,arctic_wolf%40|FX%1|M1 AND BO:polar_bear,killer_whale,arctic_wolf%30",
        "XX|CR:inuit_body|XX"
    ],
    ignore: ["inuit_head", "inuit_body"],
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 }
    },
    foodNeed: 12,
    temp: 36,
    tempHigh: 45,
    stateHigh: "meat",
    tempLow: -60,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "meat",
    density: 1030,
    conduct: 0.1
};

elements.arctic_fox = {
    color: ["#ffffff", "#f2f2f2", "#e6e6e6", "#222222", "#d7beab", "#e5c2a3", "#c4a482"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "AT:arctic_hare,rat,penguin,little_penguin%40 AND BO:polar_bear,arctic_wolf%50|FX%1|M1%85 AND AT:arctic_hare,rat,penguin,little_penguin%30 AND BO:polar_bear,arctic_wolf%30",
        "M2%60|M1%85|M1%85"
    ],
    ignore: ["arctic_fox"],
    reactions: {
        "meat": { elem2: null, chance: 0.25 },
        "cooked_meat": { elem2: null, chance: 0.25 },
       "artic_hare": { elem2: null, chance: 0.25 },
        "artic_owl": { elem2: null, chance: 0.25 },
        "herring": { elem2: null, chance: 0.25 },
        "plant": { elem2: null, chance: 0.25 },
        "fish": { elem2: null, chance: 0.25 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    egg: "arctic_fox",
    foodNeed: 8,
    temp: 32,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -150,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 12,
    burnTime: 200,
    density: 1200,
    conduct: 0.22
};

elements.inuit = {
    color: ["#54453b", "#36424f", "#64605d"],
    category: "life",
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            createPixel("inuit_body", pixel.x, pixel.y+1);
            if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "inuit_body") {
                pixelMap[pixel.x][pixel.y+1].color = pixelColorPick(pixelMap[pixel.x][pixel.y+1]);
            }
            pixel.element = "inuit_head";
            pixel.color = pixelColorPick(pixel);
        }
        else if (isEmpty(pixel.x, pixel.y-1)) {
            createPixel("inuit_head", pixel.x, pixel.y-1);
            pixel.element = "inuit_body";
        }
        else {
            deletePixel(pixel.x, pixel.y);
        }
    }
};

elements.inuit_body = {
    color: ["#543d2b", "#3a4f66"],
    category: "life",
    hidden: true,
    density: 1500,
    state: "solid",
    conduct: 25,
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -273,
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    reactions: {
        "cancer": { "elem1":"cancer", "chance":0.005 },
        "radiation": { "elem1":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
    },
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        if (tryMove(pixel, pixel.x, pixel.y+1)) {
            if (!isEmpty(pixel.x, pixel.y-2, true)) {
                var headpixel = pixelMap[pixel.x][pixel.y-2];
                if (headpixel.element == "inuit_head") {
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
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
            }
            return;
        }
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "inuit_head") {
            var head = pixelMap[pixel.x][pixel.y-1];
            if (head.dead) { pixel.dead = head.dead; }
        }
        else { var head = null; }
        if (isEmpty(pixel.x, pixel.y-1)) {
            if (Math.random() < 0.1) {
                createPixel("blood", pixel.x, pixel.y-1);
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
        else if (head == null) { return; }
        else if (Math.random() < 0.1) { 
            var movesToTry = [
                [1*pixel.dir,0],
                [1*pixel.dir,-1]
            ];
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
                    if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1])) {
                        movePixel(head, head.x+move[0], head.y+move[1]);
                        break;
                    }
                }
            }
            if (Math.random() < 0.15) {
                pixel.dir *= -1;
            }
        }
    }
};

elements.inuit_head = {
    color: ["#d9c3b0", "#e0dacb"],
    category: "life",
    hidden: true,
    density: 1080,
    state: "solid",
    conduct: 25,
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -273,
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    reactions: {
        "cancer": { "elem1":"cancer", "chance":0.005 },
        "radiation": { "elem1":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 },
    },
    properties: {
        dead: false
    },
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "inuit_body") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) {
                pixel.dead = body.dead;
            }
        }
        else { var body = null; }
        if (isEmpty(pixel.x, pixel.y+1)) {
            tryMove(pixel, pixel.x, pixel.y+1);
            if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1) {
                createPixel("blood", pixel.x, pixel.y+1);
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
    }
};

elements.narwhal = {
    color: ["#2a3b4c", "#3a4f66", "#5c7385", "#7a8f9f", "#ffffff", "#111111"],
    state: "solid",
    behavior: [
        "XX|M2%5 AND SW:water,salt_water,sugar_water,dirty_water%14|XX",
        "AT:fish,herring,clam%35 AND BO:killer_whale%40|FX%0.5|AT:fish,herring,clam%25 AND BO:killer_whale%30",
        "M2|XX|M2 AND SW:water,salt_water,sugar_water,dirty_water%5"
    ],
    ignore: ["narwhal"],
    reactions: {
        "fish": { elem2: null, chance: 0.35 },
        "herring": { elem2: null, chance: 0.35 },
        "clam": { elem2: null, chance: 0.35 },
        "cooked_meat": {elem2:null,chance:0.35 },
        "algae": { elem2: null, chance: 0.35 },
        "plant": { elem2: null, chance: 0.35 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    category: "life",
    foodNeed: 15,
    temp: 35,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -80,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 200,
    density: 1026,
    conduct: 0.12
};

elements.reindeer = {
    color: ["#8b5a2b", "#a07855", "#bc987e", "#d2b48c", "#eeeeee"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "BO:polar_bear,arctic_wolf,inuit_body%30|FX%1|M1%75 AND BO:polar_bear,arctic_wolf,inuit_body%20",
        "M2%50|M1%75|M1%75"
    ],
    ignore: ["reindeer", "flying_reindeer"],
    reactions: {
        "plant": { elem2: null, chance: 0.25 },
        "grass": { elem2: null, chance: 0.25 },
        "mod_tundra_grass": { elem2: null, chance: 0.5 },
        "algae": { elem2: null, chance: 0.2 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    egg: "reindeer",
    foodNeed: 8,
    temp: 34,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -150,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 220,
    density: 1300,
    conduct: 0.22
};

elements.flying_reindeer = {
    color: ["#a0522d", "#cd853f", "#deb887", "#782e00", "#c27342"],
    state: "solid",
    behavior: [
        "M2|M1 AND BO:polar_bear,arctic_wolf,inuit_body%30|M2",
        "M1|FLY|M1",
        "M2|M1|M2"
    ],
    ignore: ["reindeer", "flying_reindeer"],
    reactions: {
        "sugar": { elem2: null, chance: 0.25 },
        "caramel": { elem2: null, chance: 0.25 },
        "dirt": { elem2: "rainbow", chance: 0.25 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    egg: "flying_reindeer",
    foodNeed: 8,
    temp: 34,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -150,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 220,
    density: 1000,
    conduct: 0.22
};

elements.santa_hat = {
    color: ["#ff0000", "#d60000"],
    category: "life",
    hidden: true,
    density: 1010,
    state: "solid",
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -273,
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 },
    },
    properties: { dead: false },
    tick: function(pixel) {
        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }
        if (!isEmpty(pixel.x, pixel.y+2, true) && pixelMap[pixel.x][pixel.y+2].element == "santa") {
            var body = pixelMap[pixel.x][pixel.y+2];
            if (body.dead) { pixel.dead = body.dead; }
        } else { var body = null; }
        if (isEmpty(pixel.x, pixel.y+1)) {
            tryMove(pixel, pixel.x, pixel.y+1);
        }
    }
};

elements.santa_head = {
    color: ["#d9c3b0", "#e0dacb"],
    category: "life",
    hidden: true,
    density: 1040,
    state: "solid",
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -273,
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 },
        "gingerbread_man": { elem1: "santa_head", elem2: null, chance: 0.35 }
    },
    properties: { dead: false },
    tick: function(pixel) {
        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "santa") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) { pixel.dead = body.dead; }
        } else { var body = null; }
    }
};

elements.santa = {
    name: "santa",
    color: ["#ff0000", "#d60000"],
    category: "life",
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    onPlace: function(pixel) {
        logMessage("merry christmas");
    },
    reactions: {
        "gingerbread_man": { elem1: "santa", elem2: null, chance: 0.35 }
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y-1) && isEmpty(pixel.x, pixel.y-2)) {
            createPixel("santa_head", pixel.x, pixel.y-1);
            createPixel("santa_hat", pixel.x, pixel.y-2);
            if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "santa_head") {
                pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1]);
            }
            if (!isEmpty(pixel.x, pixel.y-2, true) && pixelMap[pixel.x][pixel.y-2].element == "santa_hat") {
                pixelMap[pixel.x][pixel.y-2].color = pixelColorPick(pixelMap[pixel.x][pixel.y-2]);
            }
            pixel.color = pixelColorPick(pixel);
        }
        if (tryMove(pixel, pixel.x, pixel.y+1)) {
            if (!isEmpty(pixel.x, pixel.y-2, true) && pixelMap[pixel.x][pixel.y-2].element == "santa_head") {
                if (isEmpty(pixel.x, pixel.y-1)) movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
            }
            if (!isEmpty(pixel.x, pixel.y-3, true) && pixelMap[pixel.x][pixel.y-3].element == "santa_hat") {
                if (isEmpty(pixel.x, pixel.y-2)) movePixel(pixelMap[pixel.x][pixel.y-3], pixel.x, pixel.y-2);
            }
        }
        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
            }
            return;
        }
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "santa_head") {
            var head = pixelMap[pixel.x][pixel.y-1];
            if (head.dead) { pixel.dead = head.dead; }
        } else { var head = null; }
        if (!isEmpty(pixel.x, pixel.y-2, true) && pixelMap[pixel.x][pixel.y-2].element == "santa_hat") {
            var hat = pixelMap[pixel.x][pixel.y-2];
        } else { var hat = null; }
        if (head == null || hat == null) { return; }
        if (Math.random() < 0.12) {
            var movesToTry = [
                [1*pixel.dir,0],
                [1*pixel.dir,-1]
            ];
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1) && isEmpty(pixel.x+move[0], pixel.y+move[1]-2)) {
                    if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1])) {
                        movePixel(head, head.x+move[0], head.y+move[1]);
                        movePixel(hat, hat.x+move[0], hat.y+move[1]);
                        break;
                    }
                }
            }
            if (Math.random() < 0.15) { pixel.dir *= -1; }
        }
    }
};



elements.gingerbread_man = {
    name: "gingerbread man ",
    color: ["#c48b53", "#b3773e", "#a1642a", "#ffffff", "#5bc0be"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "BO:santa,lemming,arctic_fox,polar_bear%50|FX%1|M1%70 AND BO:santa,lemming,arctic_fox,polar_bear%40",
        "M2%30|M1%70|M1%70"
    ],
    ignore: ["gingerbread_man"],
    reactions: {
        "water": { elem1: "sugar_water", chance: 0.15 },
        "salt_water": { elem1: "sugar_water", chance: 0.15 },
        "dirty_water": { elem1: "sugar_water", chance: 0.15 },
        "milk": { elem1: "sugar_water", chance: 0.2 },
        "thermal_water": { elem1: "sugar_water", chance: 0.2 },
        "fire": { elem1: "ash", chance: 0.1 },
        "magma": { elem1: "smoke", chance: 0.3 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.2 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    egg: "gingerbread_man",
    foodNeed: 4,
    temp: 20,
    tempHigh: 180,
    stateHigh: "ash",
    tempLow: -100,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "sugar",
    burn: 15,
    burnTime: 120,
    density: 1100,
    conduct: 0.15
};

elements.marlon_hat = {
    color: ["#ff6600", "#cc5200"],
    category: "life",
    hidden: true,
    density: 1010,
    state: "solid",
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -273,
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 }
    },
    properties: { dead: false },
    tick: function(pixel) {
        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }
        if (!isEmpty(pixel.x, pixel.y+2, true) && pixelMap[pixel.x][pixel.y+2].element == "marlon") {
            var body = pixelMap[pixel.x][pixel.y+2];
            if (body.dead) { pixel.dead = body.dead; }
        } else { var body = null; }
        if (isEmpty(pixel.x, pixel.y+1)) {
            tryMove(pixel, pixel.x, pixel.y+1);
        }
    }
};


elements.marlon_hat = {
    color: ["#ff6600", "#cc5200"],
    category: "life",
    hidden: true,
    density: 1010,
    state: "solid",
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -273,
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 }
    },
    properties: { dead: false },
    tick: function(pixel) {
        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }
        if (!isEmpty(pixel.x, pixel.y+2, true) && pixelMap[pixel.x][pixel.y+2].element == "marlon") {
            var body = pixelMap[pixel.x][pixel.y+2];
            if (body.dead) { pixel.dead = body.dead; }
        } else { var body = null; }
        if (isEmpty(pixel.x, pixel.y+1)) {
            tryMove(pixel, pixel.x, pixel.y+1);
        }
    }
};

elements.marlon_head = {
    color: ["#d9c3b0", "#e0dacb"],
    category: "life",
    hidden: true,
    density: 1040,
    state: "solid",
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -273,
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 }
    },
    properties: { dead: false },
    tick: function(pixel) {
        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "marlon") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) { pixel.dead = body.dead; }
        } else { var body = null; }
    }
};

elements.marlon = {
    name: "marlon",
    color: ["#1ab1c5", "#1471a3"],
    category: "life",
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    onPlace: function(pixel) {
        logMessage("it's me, marlon");
    },
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y-1) && isEmpty(pixel.x, pixel.y-2)) {
            createPixel("marlon_head", pixel.x, pixel.y-1);
            createPixel("marlon_hat", pixel.x, pixel.y-2);
            if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "marlon_head") {
                pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1]);
            }
            if (!isEmpty(pixel.x, pixel.y-2, true) && pixelMap[pixel.x][pixel.y-2].element == "marlon_hat") {
                pixelMap[pixel.x][pixel.y-2].color = pixelColorPick(pixelMap[pixel.x][pixel.y-2]);
            }
            pixel.color = pixelColorPick(pixel);
        }
        if (tryMove(pixel, pixel.x, pixel.y+1)) {
            if (!isEmpty(pixel.x, pixel.y-2, true) && pixelMap[pixel.x][pixel.y-2].element == "marlon_head") {
                if (isEmpty(pixel.x, pixel.y-1)) movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
            }
            if (!isEmpty(pixel.x, pixel.y-3, true) && pixelMap[pixel.x][pixel.y-3].element == "marlon_hat") {
                if (isEmpty(pixel.x, pixel.y-2)) movePixel(pixelMap[pixel.x][pixel.y-3], pixel.x, pixel.y-2);
            }
        }
        
        var frontX = pixel.x + pixel.dir;
        if (frontX >= 0 && frontX < width) {
            if (!isEmpty(frontX, pixel.y, true) && pixelMap[frontX][pixel.y].element === "little_penguin") {
                var target = pixelMap[frontX][pixel.y];
                var targetX = target.x + (pixel.dir * 6);
                var targetY = target.y - 8;
                if (targetX >= 0 && targetX < width && targetY >= 0 && targetY < height) {
                    if (isEmpty(targetX, targetY)) {
                        movePixel(target, targetX, targetY);
                        logMessage("¡Al precipicio!");
                    }
                }
            }
         frontX = pixel.x - pixel.dir;
        }

        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
            }
            return;
        }
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "marlon_head") {
            var head = pixelMap[pixel.x][pixel.y-1];
            if (head.dead) { pixel.dead = head.dead; }
        } else { var head = null; }
        if (!isEmpty(pixel.x, pixel.y-2, true) && pixelMap[pixel.x][pixel.y-2].element == "marlon_hat") {
            var hat = pixelMap[pixel.x][pixel.y-2];
        } else { var hat = null; }
        if (head == null || hat == null) { return; }
        if (Math.random() < 0.12) {
            var movesToTry = [
                [1*pixel.dir,0],
                [1*pixel.dir,-1]
            ];
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1) && isEmpty(pixel.x+move[0], pixel.y+move[1]-2)) {
                    if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1])) {
                        movePixel(head, head.x+move[0], head.y+move[1]);
                        movePixel(hat, hat.x+move[0], hat.y+move[1]);
                        break;
                    }
                }
            }
            if (Math.random() < 0.15) { pixel.dir *= -1; }
        }
    }
};


elements.beluga_whale = {
    name: "beluga",
    color: ["#ffffff", "#f9fbfb", "#f0f4f4", "#e1e8e8", "#c8d6e5", "#d1d8e0", "#f1f2f6", "#edf2f4"],
    state: "solid",
    behavior: [
        "XX|M2%5 AND SW:water,salt_water,sugar_water,dirty_water%14|XX",
        "AT:fish,herring,clam%30 AND BO:killer_whale%50|FX%0.5|AT:fish,herring,clam%20 AND BO:killer_whale%40",
        "M2|XX|M2 AND SW:water,salt_water,sugar_water,dirty_water%5"
    ],
    ignore: ["beluga_whale"],
    reactions: {
        "fish": { elem2: null, chance: 0.3 },
       "frozen_fish": { elem2: null, chance: 0.3 },
        "herring": { elem2: null, chance: 0.3 },
        "clam": { elem2: null, chance: 0.3 },
        "algae": { elem2: null, chance: 0.25 },
        "plant": { elem2: null, chance: 0.3 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },

    category: "life",
    foodNeed: 14,
    temp: 35,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -85,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 200,
    density: 1025,
    conduct: 0.11
};
elements.lemming = {
    color: ["#5b92e5", "#7ba7ed", "#ffffff", "#3b6cc4"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "AT:fish,herring,cooked_meat,chocolate,caramel%60 AND BO:polar_bear%15|FX%1|M1%95 AND AT:fish,herring,cooked_meat,chocolate,caramel%50",
        "M2%40|M1%95|M1%95"
    ],
    ignore: ["lemming"],
    reactions: {
        "fish": { elem2: "lemming", chance: 0.15 },
        "herring": { elem2: "lemming", chance: 0.15 },
        "chocolate": { elem2: "lemming", chance: 0.3 },
        "sugar": { elem2: "lemming", chance: 0.25 },
        "caramel": { elem2: "lemming", chance: 0.3 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    egg: "lemming",
    foodNeed: 5,
    temp: 36,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -120,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 10,
    burnTime: 150,
    density: 1100,
    conduct: 0.2
};

elements.igloo_ice = {
    color: ["#e6f2f2", "#d1e0e0", "#bfe6e6"],
    state: "solid",
    behavior: behaviors.WALL,
    category: "ice solids",
    temp: -40,
    tempHigh: 120,
    stateHigh: "water",
    density: 920,
    conduct: 0.01,
    hardness: 0.5
};

elements.greenland_shark = {
    name: "Greenland shark",
    color: ["#3d4246", "#2f3235", "#212325", "#4a4641", "#1a1c1e"],
    state: "solid",
    category: "life",
    behavior: [
        "XX|M2%1 AND SW:water,salt_water,dirty_water%5|XX",
        "AT:fish,herring,clam,meat,rotten_meat,cooked_meat%40|FX%0.2|AT:fish,herring,clam,meat,rotten_meat,cooked_meat%30",
        "M2%5|XX|M2%1 AND SW:water,salt_water,dirty_water%5"
    ],
    ignore: ["greenland_shark"],
    reactions: {
        "fish": { elem2: null, chance: 0.35 },
        "herring": { elem2: null, chance: 0.35 },
        "clam": { elem2: null, chance: 0.35 },
        "meat": { elem2: null, chance: 0.5 },
        "rotten_meat": { elem2: null, chance: 0.6 },
        "cooked_meat": { elem2: null, chance: 0.5 },
        "frozen_meat": { elem2: null, chance: 0.5 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.2 },
        "poison": { elem1: "rotten_meat", chance: 0.05 }
    },
    foodNeed: 12,
    temp: 2,
    tempHigh: 55,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 250,
    density: 1032,
    conduct: 0.1
};

elements.igloo = {
    color: ["#e6f2f2", "#ffffff", "#d1e0e0"],
    category: "ice solids",
    state: "solid",
    density: 2000,
    maxSize: 1,
    cooldown: 20,
    onPlace: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;
        while (y < 1000 && isEmpty(x, y+1)) {
            y++;
        }
        if (isEmpty(x, y-5)) createPixel("igloo_ice", x, y-5);
        if (isEmpty(x-1, y-5)) createPixel("igloo_ice", x-1, y-5);
        if (isEmpty(x+1, y-5)) createPixel("igloo_ice", x+1, y-5);
        if (isEmpty(x-2, y-4)) createPixel("igloo_ice", x-2, y-4);
        if (isEmpty(x+2, y-4)) createPixel("igloo_ice", x+2, y-4);
        if (isEmpty(x-3, y-3)) createPixel("igloo_ice", x-3, y-3);
        if (isEmpty(x+3, y-3)) createPixel("igloo_ice", x+3, y-3);
        if (isEmpty(x-4, y-2)) createPixel("igloo_ice", x-4, y-2);
        if (isEmpty(x+4, y-2)) createPixel("igloo_ice", x+4, y-2);
        if (Math.random() < 0.20) {
            if (isEmpty(x, y-2)) createPixel("inuit", x, y-2);
        }
        if (isEmpty(x-4, y-1)) createPixel("igloo_ice", x-4, y-1);
        if (isEmpty(x+4, y-1)) createPixel("igloo_ice", x+4, y-1);
        for (var i = -4; i <= 4; i++) {
            if (isEmpty(x+i, y)) createPixel("igloo_ice", x+i, y);
        }
        deletePixel(pixel.x, pixel.y);
    }
};

elements.igloo_large = {
    color: ["#cce6e6", "#92f0f7", "#99cdcd"],
    category: "ice solids",
    state: "solid",
    density: 2000,
    maxSize: 1,
    cooldown: 20,
    onPlace: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;
        while (y < 1000 && isEmpty(x, y+1)) {
            y++;
        }
        if (isEmpty(x, y-7)) createPixel("igloo_ice", x, y-7);
        if (isEmpty(x-1, y-7)) createPixel("igloo_ice", x-1, y-7);
        if (isEmpty(x+1, y-7)) createPixel("igloo_ice", x+1, y-7);
        if (isEmpty(x-2, y-6)) createPixel("igloo_ice", x-2, y-6);
        if (isEmpty(x+2, y-6)) createPixel("igloo_ice", x+2, y-6);
        if (isEmpty(x-3, y-5)) createPixel("igloo_ice", x-3, y-5);
        if (isEmpty(x+3, y-5)) createPixel("igloo_ice", x+3, y-5);
        if (isEmpty(x-4, y-4)) createPixel("igloo_ice", x-4, y-4);
        if (isEmpty(x+4, y-4)) createPixel("igloo_ice", x+4, y-4);
        if (isEmpty(x-5, y-3)) createPixel("igloo_ice", x-5, y-3);
        if (isEmpty(x+5, y-3)) createPixel("igloo_ice", x+5, y-3);
        if (isEmpty(x-5, y-2)) createPixel("igloo_ice", x-5, y-2);
        if (isEmpty(x+5, y-2)) createPixel("igloo_ice", x+5, y-2);
        if (isEmpty(x-5, y-1)) createPixel("igloo_ice", x-5, y-1);
        if (isEmpty(x+5, y-1)) createPixel("igloo_ice", x+5, y-1);
        
        if (isEmpty(x-2, y-2)) createPixel("inuit", x-2, y-2);
        if (isEmpty(x, y-2)) createPixel("inuit", x, y-2);
        if (isEmpty(x+2, y-2)) createPixel("inuit", x+2, y-2);

        for (var i = -5; i <= 5; i++) {
            if (isEmpty(x+i, y)) createPixel("igloo_ice", x+i, y);
        }
        deletePixel(pixel.x, pixel.y);
    }
};

elements.igloo_huge = {
    color: ["#99cdcd", "#80c0c0", "#66b2b2"],
    category: "ice solids",
    state: "solid",
    density: 2000,
    maxSize: 1,
    cooldown: 20,
    onPlace: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;
        while (y < 1000 && isEmpty(x, y+1)) {
            y++;
        }
        if (isEmpty(x, y-9)) createPixel("igloo_ice", x, y-9);
        if (isEmpty(x-1, y-9)) createPixel("igloo_ice", x-1, y-9);
        if (isEmpty(x+1, y-9)) createPixel("igloo_ice", x+1, y-9);
        if (isEmpty(x-2, y-8)) createPixel("igloo_ice", x-2, y-8);
        if (isEmpty(x+2, y-8)) createPixel("igloo_ice", x+2, y-8);
        if (isEmpty(x-3, y-7)) createPixel("igloo_ice", x-3, y-7);
        if (isEmpty(x+3, y-7)) createPixel("igloo_ice", x+3, y-7);
        if (isEmpty(x-4, y-6)) createPixel("igloo_ice", x-4, y-6);
        if (isEmpty(x+4, y-6)) createPixel("igloo_ice", x+4, y-6);
        if (isEmpty(x-5, y-5)) createPixel("igloo_ice", x-5, y-5);
        if (isEmpty(x+5, y-5)) createPixel("igloo_ice", x+5, y-5);
        if (isEmpty(x-6, y-4)) createPixel("igloo_ice", x-6, y-4);
        if (isEmpty(x+6, y-4)) createPixel("igloo_ice", x+6, y-4);
        if (isEmpty(x-6, y-3)) createPixel("igloo_ice", x-6, y-3);
        if (isEmpty(x+6, y-3)) createPixel("igloo_ice", x+6, y-3);
        if (isEmpty(x-6, y-2)) createPixel("igloo_ice", x-6, y-2);
        if (isEmpty(x+6, y-2)) createPixel("igloo_ice", x+6, y-2);
        if (isEmpty(x-6, y-1)) createPixel("igloo_ice", x-6, y-1);
        if (isEmpty(x+6, y-1)) createPixel("igloo_ice", x+6, y-1);
        
        if (isEmpty(x-3, y-2)) createPixel("inuit", x-3, y-2);
        if (isEmpty(x-1, y-2)) createPixel("inuit", x-1, y-2);
        if (isEmpty(x, y-4)) createPixel("inuit", x, y-4);
        if (isEmpty(x+1, y-2)) createPixel("inuit", x+1, y-2);
        if (isEmpty(x+3, y-2)) createPixel("inuit", x+3, y-2);
        if (isEmpty(x, y-2)) createPixel("seal", x, y-2);

        for (var i = -6; i <= 6; i++) {
            if (isEmpty(x+i, y)) createPixel("igloo_ice", x+i, y);
        }
        deletePixel(pixel.x, pixel.y);
    }
};
elements.packed_ice_wall = {
    color: ["#a1c1e0", "#b3d1ff", "#8cbfff"],
    state: "solid",
    behavior: behaviors.WALL,
    category: "ice solids",
    temp: -50,
    tempHigh: 300,
    stateHigh: "water",
    density: 950,
    conduct: 0,
    hardness: 0.8
};

elements.icicle = {
    name: "icicle",
    color: ["#e6f2f2", "#bfe6e6", "#d1e0e0"],
    category: "ice solids",
    state: "solid",
    temp: -40,
    tempHigh: 150,
    stateHigh: "water",
    density: 920,
    conduct: 0.01,
    renderer: function(pixel, ctx) {
        var size = pixelSize;
        var cx = canvasCoord(pixel.x);
        var cy = canvasCoord(pixel.y);
        ctx.fillStyle = pixel.color;
        if (pixel.spikeType === 1) {
            ctx.fillRect(cx + size/3, cy, size/3, size/3);
            ctx.fillRect(cx + size/6, cy + size/3, size*2/3, size*2/3);
        } else if (pixel.spikeType === 2) {
            ctx.fillRect(cx + size/6, cy, size*2/3, size);
        } else if (pixel.spikeType === 3) {
            ctx.fillRect(cx + size/6, cy, size*2/3, size*5/6);
            ctx.fillRect(cx + size/3, cy + size*2/3, size/2, size/3);
        } else if (pixel.spikeType === 4) {
            ctx.fillRect(cx + size/3, cy, size/2, size/3);
            ctx.fillRect(cx + size/3, cy + size/6, size/3, size/3);
            ctx.fillRect(cx + size/3, cy + size/3, size/6, size/2);
        } else {
            ctx.fillRect(cx, cy, size, size);
        }
    },
    tick: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;
        var head = y;
        while (head > 0 && !isEmpty(x, head-1, true) && pixelMap[x][head-1].element === "icicle") {
            head--;
        }
        var base = y;
        while (base < height-1 && !isEmpty(x, base+1, true) && pixelMap[x][base+1].element === "icicle") {
            base++;
        }
        var totalLength = base - head + 1;
        var localIndex = y - head + 1;
        if (totalLength === 1) {
            pixel.spikeType = 4;
        } else if (localIndex === 1) {
            pixel.spikeType = 4;
        } else if (localIndex === 2) {
            pixel.spikeType = 3;
        } else if (localIndex === totalLength) {
            pixel.spikeType = 1;
        } else {
            pixel.spikeType = 2;
        }
        if (isEmpty(x, head-1)) {
            for (var i = base; i >= y; i--) {
                if (!isEmpty(x, i, true) && pixelMap[x][i].element === "icicle") {
                    var currentPixel = pixelMap[x][i];
                    if (isEmpty(x, i+1)) {
                        tryMove(currentPixel, x, i+1);
                    } else if (!isEmpty(x, i+1, true)) {
                        var target = pixelMap[x][i+1];
                        if (target.element !== "icicle" && target.element !== "packed_ice_wall" && target.element !== "permafrost_ice") {
                            if (elements[target.element] && elements[target.element].category === "life") {
                                target.element = "frozen_meat";
                                target.color = pixelColorPick(target);
                            } else {
                                deletePixel(x, i+1);
                            }
                        }
                    }
                }
            }
        }
    }
};

elements.cryo_nuke = {
    color: ["#00ffff", "#33ffff", "#00cccc", "#111111"],
    state: "solid",
    category: "weapons",
    density: 3000,
    maxSize: 1,
    cooldown: 50,
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            tryMove(pixel, pixel.x, pixel.y+1);
        } 
        else {
            var downPixel = pixelMap[pixel.x][pixel.y+1];
            if (downPixel && downPixel.element !== "cryo_nuke") {
                var radius = 30;
                var startX = Math.max(0, pixel.x - radius);
                var endX = Math.min(width - 1, pixel.x + radius);
                var startY = Math.max(0, pixel.y - radius);
                var endY = Math.min(height - 1, pixel.y + radius);

                for (var x = startX; x <= endX; x++) {
                    for (var y = startY; y <= endY; y++) {
                        var dist = Math.sqrt(Math.pow(x - pixel.x, 2) + Math.pow(y - pixel.y, 2));
                        if (dist <= radius) {
                            if (!isEmpty(x, y, true)) {
                                var target = pixelMap[x][y];
                                if (target.element !== "cryo_nuke") {
                                    target.temp = -273;
                                    if (target.element === "water" || target.element === "salt_water" || target.element === "dirty_water") {
                                        changePixel(target, "ice");
                                    } else if (target.element === "meat" || elements[target.element].category === "life") {
                                        if (target.element !== "inuit" && target.element !== "inuit_body" && target.element !== "inuit_head") {
                                            target.element = "packed_ice_wall";
                                            target.color = pixelColorPick(target);
                                        }
                                    } else if (target.element === "fire" || target.element === "smoke") {
                                        deletePixel(x, y);
                                    }
                                }
                            }
                        }
                    }
                }
                deletePixel(pixel.x, pixel.y);
            }
        }
    }
};

elements.iceberg = {
    color: ["#a1c1e0", "#b3d1ff", "#ffffff", "#8cbfff"],
    category: "ice solids",
    state: "solid",
    density: 2000,
    maxSize: 1,
    cooldown: 20,
    onPlace: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;
        while (y < 1000 && isEmpty(x, y+1)) {
            y++;
        }
        for (var h = 0; h < 20; h++) {
            var widthOffset = 22 - h;
            for (var i = -widthOffset; i <= widthOffset; i++) {
                if (isEmpty(x+i, y-h)) createPixel("packed_ice_wall", x+i, y-h);
            }
        }
        for (var h = 1; h <= 15; h++) {
            var widthOffset = 22 - h;
            for (var i = -widthOffset; i <= widthOffset; i++) {
                if (isEmpty(x+i, y+h)) createPixel("packed_ice_wall", x+i, y+h);
            }
        }
        if (Math.random() < 0.30) {
            var surfaceY = y - 20;
            if (isEmpty(x-12, surfaceY)) createPixel("penguin", x-12, surfaceY);
            if (isEmpty(x-4, surfaceY)) createPixel("penguin", x-4, surfaceY);
            if (isEmpty(x+4, surfaceY)) createPixel("penguin", x+4, surfaceY);
            if (isEmpty(x+12, surfaceY)) createPixel("penguin", x+12, surfaceY);
        }
        deletePixel(pixel.x, pixel.y);
    }
};

//v 4.0 historical and omega
elements.emperor_hat = {
    color: "#fad61d",
    category: "life",
    hidden: true,
    density: 1010,
    state: "solid",
    tempHigh: 1000,
    stateHigh: "frozen_penguin",
    tempLow: -210,
    stateLow: "frozen_penguin",
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 }
    },
    properties: { dead: false },
    tick: function(pixel) {
        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }
        if (!isEmpty(pixel.x, pixel.y+2, true) && pixelMap[pixel.x][pixel.y+2].element == "emperor_penguin") {
            var body = pixelMap[pixel.x][pixel.y+2];
            if (body.dead) { pixel.dead = body.dead; }
        } else { var body = null; }
    }
};

elements.emperor_head = {
    color: ["#0c0c12", "#babae3", "#02022e", "#d2d2fc", "#000000", "#5b5b5c", "#95a7c4"],
    category: "life",
    hidden: true,
    density: 1040,
    state: "solid",
    tempHigh: 1000,
    stateHigh: "frozen_penguin",
    tempLow: -210,
    stateLow: "frozen_penguin",
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 }
    },
    properties: { dead: false },
    tick: function(pixel) {
        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "emperor_penguin") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) { pixel.dead = body.dead; }
        } else { var body = null; }
    }
};

elements.emperor_penguin = {
    name: "emperor penguin",
    color: ["#ff6600"],
    category: "life",
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y-1) && isEmpty(pixel.x, pixel.y-2)) {
            createPixel("emperor_head", pixel.x, pixel.y-1);
            createPixel("emperor_hat", pixel.x, pixel.y-2);
            if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "emperor_head") {
                pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1]);
            }
            pixel.color = pixelColorPick(pixel);
        }
        if (tryMove(pixel, pixel.x, pixel.y+1)) {
            if (!isEmpty(pixel.x, pixel.y-2, true) && pixelMap[pixel.x][pixel.y-2].element == "emperor_head") {
                if (isEmpty(pixel.x, pixel.y-1)) movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
            }
            if (!isEmpty(pixel.x, pixel.y-3, true) && pixelMap[pixel.x][pixel.y-3].element == "emperor_hat") {
                if (isEmpty(pixel.x, pixel.y-2)) movePixel(pixelMap[pixel.x][pixel.y-3], pixel.x, pixel.y-2);
            }
        }
        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
            }
            return;
        }
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "emperor_head") {
            var head = pixelMap[pixel.x][pixel.y-1];
            if (head.dead) { pixel.dead = head.dead; }
        } else { var head = null; }
        if (!isEmpty(pixel.x, pixel.y-2, true) && pixelMap[pixel.x][pixel.y-2].element == "emperor_hat") {
            var hat = pixelMap[pixel.x][pixel.y-2];
        } else { var hat = null; }
        if (head == null || hat == null) { return; }
        if (Math.random() < 0.1) {
            var movesToTry = [
                [1*pixel.dir,0],
                [1*pixel.dir,-1]
            ];
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1) && isEmpty(pixel.x+move[0], pixel.y+move[1]-2)) {
                    if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1])) {
                        movePixel(head, head.x+move[0], head.y+move[1]);
                        movePixel(hat, hat.x+move[0], hat.y+move[1]);
                        break;
                    }
                }
            }
            if (Math.random() < 0.15) { pixel.dir *= -1; }
        }
    }
};


elements.emperor_throne = {
    color: ["#5082b0", "#3d668a"],
    state: "solid",
    category: "ice solids",
    behavior: behaviors.WALL,
    density: 4000,
    temp: -30,
    tempHigh: 200,
    stateHigh: "water"
};

elements.ice_castle = {
    color: ["#7fa8d1", "#a1c1e0", "#ffffff", "#b3d1ff"],
    category: "ice solids",
    state: "solid",
    density: 3000,
    maxSize: 1,
    cooldown: 30,
    onPlace: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;
        while (y < 1000 && isEmpty(x, y+1)) {
            y++;
        }
        
        for (var h = 0; h <= 35; h++) {
            for (var i = -32; i <= 32; i++) {
                if (h <= 8 && i >= -8 && i <= 8) {
                    continue;
                }
                if (isEmpty(x+i, y-h)) createPixel("packed_ice_wall", x+i, y-h);
            }
        }
        
        var towers = [-26, 0, 26];
        for (var t = 0; t < towers.length; t++) {
            var tx = x + towers[t];
            for (var h = 36; h <= 42; h++) {
                for (var i = -5; i <= 5; i++) {
                    if (isEmpty(tx+i, y-h)) createPixel("packed_ice_wall", tx+i, y-h);
                }
            }
            
            var almenaY = y - 43;
            if (isEmpty(tx-5, almenaY)) createPixel("packed_ice_wall", tx-5, almenaY);
            if (isEmpty(tx-3, almenaY)) createPixel("packed_ice_wall", tx-3, almenaY);
            if (isEmpty(tx-1, almenaY)) createPixel("packed_ice_wall", tx-1, almenaY);
            if (isEmpty(tx+1, almenaY)) createPixel("packed_ice_wall", tx+1, almenaY);
            if (isEmpty(tx+3, almenaY)) createPixel("packed_ice_wall", tx+3, almenaY);
            if (isEmpty(tx+5, almenaY)) createPixel("packed_ice_wall", tx+5, almenaY);
        }
        
        for (var f = 43; f <= 47; f++) {
            if (isEmpty(x+4, y-f)) createPixel("wood", x+4, y-f);
        }
        for (var pX = 5; pX <= 8; pX++) {
            if (isEmpty(x+pX, y-47)) createPixel("paper", x+pX, y-47);
            if (isEmpty(x+pX, y-46)) createPixel("paper", x+pX, y-46);
        }
        
        var kingY = y - 43;
        if (isEmpty(x-2, kingY)) createPixel("emperor_throne", x-2, kingY);
        if (isEmpty(x-2, kingY-1)) createPixel("emperor_penguin", x-2, kingY-1);
        
        var guardY = y - 43;
        var spots = [-29, -27, -23, -21, 21, 23, 27, 29];
        for (var g = 0; g < spots.length; g++) { // <-- ¡VARIABLE DE BUCLE CORREGIDA!
            var gx = x + spots[g];
            if (isEmpty(gx, guardY)) createPixel("penguin", gx, guardY);
        }

        var babyY = y - 1;
        var babySpots = [-6, -3, 0, 3, 6];
        for (var b = 0; b < babySpots.length; b++) {
            var bx = x + babySpots[b];
            if (isEmpty(bx, babyY)) createPixel("little_penguin", bx, babyY);
        }

        deletePixel(pixel.x, pixel.y);
    }
};

elements.yeti_head = {
    color: ["#d9c3b0", "#e0dacb"],
    category: "life",
    hidden: true,
    density: 1100,
    state: "solid",
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -273,
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 }
    },
    properties: { dead: false },
    tick: function(pixel) {
        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }
        if (!isEmpty(pixel.x, pixel.y+2, true) && pixelMap[pixel.x][pixel.y+2].element == "yeti") {
            var body = pixelMap[pixel.x][pixel.y+2];
            if (body.dead) { pixel.dead = body.dead; }
        } else { var body = null; }
        if (isEmpty(pixel.x, pixel.y+1)) {
            tryMove(pixel, pixel.x, pixel.y+1);
        }
    }
};

elements.yeti_body = {
    color: ["#ffffff", "#f2f2f2", "#eaeaea", "#f7f5f0", "#e8e5df", "#d3d3d3", "#b5b5b5", "#f5f2eb", "#eae6df", "#e3ded7"],
    category: "life",
    hidden: true,
    density: 1150,
    state: "solid",
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -273,
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 }
    },
    properties: { dead: false },
    tick: function(pixel) {
        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "yeti") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) { pixel.dead = body.dead; }
        } else { var body = null; }
    }
};

elements.yeti = {
    name: "yeti",
    color: ["#ffffff", "#f2f2f2", "#eaeaea", "#f7f5f0", "#e8e5df", "#d3d3d3", "#b5b5b5", "#f5f2eb", "#eae6df", "#e3ded7"],
    category: "life",
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y-1) && isEmpty(pixel.x, pixel.y-2)) {
            createPixel("yeti_body", pixel.x, pixel.y-1);
            createPixel("yeti_head", pixel.x, pixel.y-2);
            if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "yeti_body") {
                pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1]);
            }
            if (!isEmpty(pixel.x, pixel.y-2, true) && pixelMap[pixel.x][pixel.y-2].element == "yeti_head") {
                pixelMap[pixel.x][pixel.y-2].color = pixelColorPick(pixelMap[pixel.x][pixel.y-2]);
            }
            pixel.color = pixelColorPick(pixel);
        }
        if (tryMove(pixel, pixel.x, pixel.y+1)) {
            if (!isEmpty(pixel.x, pixel.y-2, true) && pixelMap[pixel.x][pixel.y-2].element == "yeti_body") {
                if (isEmpty(pixel.x, pixel.y-1)) movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
            }
            if (!isEmpty(pixel.x, pixel.y-3, true) && pixelMap[pixel.x][pixel.y-3].element == "yeti_head") {
                if (isEmpty(pixel.x, pixel.y-2)) movePixel(pixelMap[pixel.x][pixel.y-3], pixel.x, pixel.y-2);
            }
        }
        
        var frontX = pixel.x + pixel.dir;
        if (frontX >= 0 && frontX < width) {
            var checkY = [pixel.y, pixel.y-1, pixel.y-2];
            for (var yIndex = 0; yIndex < checkY.length; yIndex++) {
                var cy = checkY[yIndex];
                if (!isEmpty(frontX, cy, true)) {
                    var target = pixelMap[frontX][cy];
                    if (target && target.element !== "yeti" && target.element !== "yeti_body" && target.element !== "yeti_head") {
                        if (elements[target.element] && elements[target.element].category === "life") {
                            var targetX = target.x + (pixel.dir * 8);
                            var targetY = target.y - 6;
                            if (targetX >= 0 && targetX < width && targetY >= 0 && targetY < height) {
                                if (isEmpty(targetX, targetY)) {
                                    movePixel(target, targetX, targetY);
                                 
                                }
                            }
                        }
                    }
                }
            }
        }

        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
            }
            return;
        }
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "yeti_body") {
            var body = pixelMap[pixel.x][pixel.y-1];
            if (body.dead) { pixel.dead = body.dead; }
        } else { var body = null; }
        if (!isEmpty(pixel.x, pixel.y-2, true) && pixelMap[pixel.x][pixel.y-2].element == "yeti_head") {
            var head = pixelMap[pixel.x][pixel.y-2];
        } else { var head = null; }
        if (body == null || head == null) { return; }
        
        if (Math.random() < 0.95) {
            var movesToTry = [
                [1*pixel.dir, 0],
                [1*pixel.dir, -1]
            ];
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1) && isEmpty(pixel.x+move[0], pixel.y+move[1]-2)) {
                    if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1])) {
                        movePixel(body, body.x+move[0], body.y+move[1]);
                        movePixel(head, head.x+move[0], head.y+move[1]);
                        break;
                    }
                }
            }
            if (Math.random() < 0.08) { pixel.dir *= -1; }
        }
    }
};

elements.fossil_block = {
    name: "fossil block",
    color: ["#998674", "#aa9885", "#8c755d", "#9d8d7e"],
    state: "solid",
    behavior: behaviors.WALL,
    category: "ice solids",
    density: 2800,
    hardness: 0.9,
    breakInto: "petroleum",
    tempHigh: 1000,
    stateHigh: "petroleum"
};

elements.permafrost_ice = {
    name: "permafrost ice",
    color: ["#8bd0fa", "#4a738c", "#6da3bf"],
    state: "solid",
    behavior: behaviors.WALL,
    category: "ice solids",
    density: 940,
    temp: -10,
    conduct: 0,
    hardness: 0.85
};

elements.permafrost_snow = {
    name: "permafrost snow",
    color: ["#d9e5eb", "#c2d1db", "#ebf2f7"],
    state: "solid",
    behavior: behaviors.POWDER,
    category: "ice solids",
    density: 450,
    temp: -8,
    conduct: 0.01
};

elements.thermal_water = {
    name: "thermal water",
    color: ["#55c3d7", "#7eb3e9", "#66e3ff"],
    state: "liquid",
    behavior: behaviors.LIQUID,
    category: "ice solids",
    density: 995,
    temp: 40,
    tempHigh: 1000000000,
    stateHigh: "steam",
    tempLow: 10,
    stateLow: "water",
    reactions: {
        "ice": { elem2: "water", chance: 0.4 },
        "frozen_meat": { elem2: "meat", chance: 0.3 },
        "gingerbread_man": { elem2: "termal_water", chance: 0.3 }
    },
    tick: function(pixel) {
        if (Math.random() < 0.03) {
            if (isEmpty(pixel.x, pixel.y-1)) {
                createPixel("smoke", pixel.x, pixel.y-1);
            }
        }
    }
};

elements.frozen_yeti_head = {
    color: ["#a1c1e0", "#d9c3b0", "#84a9cc"],
    category: "ice solids",
    hidden: true,
    state: "solid",
    density: 2000,
    behavior: behaviors.WALL,
    temp: -50,
    tempHigh: 0,
    stateHigh: "yeti_head"
};

elements.frozen_yeti_body = {
    color: ["#a1c1e0", "#ffffff", "#84a9cc"],
    category: "ice solids",
    hidden: true,
    state: "solid",
    density: 2000,
    behavior: behaviors.WALL,
    temp: -50,
    tempHigh: 0,
    stateHigh: "yeti_body"
};

elements.frozen_yeti = {
    name: "frozen yeti",
    color: ["#a1c1e0", "#ffffff", "#84a9cc"],
    category: "ice solids",
    state: "solid",
    density: 2000,
    behavior: behaviors.WALL,
    temp: -50,
    tempHigh: 0,
    stateHigh: "yeti"
};

elements.frozen_yeti_head = {
    color: ["#a1c1e0", "#d9c3b0", "#84a9cc"],
    category: "ice solids",
    hidden: true,
    state: "solid",
    density: 2000,
    behavior: behaviors.WALL,
    temp: -50,
    tempHigh: 0,
    stateHigh: "yeti_head"
};

elements.frozen_yeti_body = {
    color: ["#a1c1e0", "#ffffff", "#84a9cc"],
    category: "ice solids",
    hidden: true,
    state: "solid",
    density: 2000,
    behavior: behaviors.WALL,
    temp: -50,
    tempHigh: 0,
    stateHigh: "yeti_body"
};

elements.frozen_yeti = {
    name: "frozen yeti",
    color: ["#a1c1e0", "#ffffff", "#84a9cc"],
    category: "ice solids",
    state: "solid",
    density: 2000,
    behavior: behaviors.WALL,
    temp: -50,
    tempHigh: 0,
    stateHigh: "yeti"
};

elements.frozen_yeti_head = {
    color: ["#a1c1e0", "#d9c3b0", "#84a9cc"],
    category: "ice solids",
    hidden: true,
    state: "solid",
    density: 2000,
    behavior: behaviors.WALL,
    temp: -50,
    tempHigh: 0,
    stateHigh: "yeti_head"
};

elements.frozen_yeti_body = {
    color: ["#a1c1e0", "#ffffff", "#84a9cc"],
    category: "ice solids",
    hidden: true,
    state: "solid",
    density: 2000,
    behavior: behaviors.WALL,
    temp: -50,
    tempHigh: 0,
    stateHigh: "yeti_body"
};

elements.frozen_yeti = {
    name: "frozen yeti",
    color: ["#a1c1e0", "#ffffff", "#84a9cc"],
    category: "ice solids",
    state: "solid",
    density: 2000,
    behavior: behaviors.WALL,
    temp: -50,
    tempHigh: 20,
    stateHigh: "yeti"
};

elements.arctic_monkey = {
    color: ["#f283c3","#ec6e96","#ff0062","#f64fa5","#ff7d7d"],
    category: "life",
    properties: {
        dead: false,
        dir: 1,
        panic: 0,
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            createPixel("body", pixel.x, pixel.y+1);
            pixel.element = "head";
        }
        else if (isEmpty(pixel.x, pixel.y-1)) {
            createPixel("head", pixel.x, pixel.y-1);
            pixelMap[pixel.x][pixel.y-1].color = pixel.color;
            pixel.element = "body";
            pixel.color = pixelColorPick(pixel)
        }
        else {
            deletePixel(pixel.x, pixel.y);
        }
    },
};


elements.body = {
    color: ["#766a62","#87817b","#4a4948","#e6d9d0"],
    category: "life",
    hidden: true,
    density: 1500,
    state: "solid",
    conduct: 25,
    tempHigh: 255000,
    stateHigh: "cooked_meat",
    tempLow: -30,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    reactions: {
        "cancer": { "elem1":"cancer", "chance":0.005 },
        "radiation": { "elem1":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
    },
    properties: {
        dead: false,
        dir: 1,
        panic: 0,
    },
    tick: function(pixel) {
        if (tryMove(pixel, pixel.x, pixel.y+1)) { 
            if (!isEmpty(pixel.x, pixel.y-2, true)) { 
                var headpixel = pixelMap[pixel.x][pixel.y-2];
                if (headpixel.element == "head") {
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
        
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
            }
            return
        }

        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head") {
            var head = pixelMap[pixel.x][pixel.y-1];
            if (head.dead) { // If head is dead, kill body
                pixel.dead = head.dead;
            }
        }
        else { var head = null }

        if (isEmpty(pixel.x, pixel.y-1)) {
            // create blood if decapitated 10% chance
            if (Math.random() < 0.1) {
                createPixel("blood", pixel.x, pixel.y-1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
        else if (head == null) { return }
        else if (Math.random() < 0.1) { 
            var movesToTry = [
                [1*pixel.dir,0],
                [1*pixel.dir,-1],
            ];
           
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
                    if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1])) {
                        movePixel(head, head.x+move[0], head.y+move[1]);
                        break;
                    }
                }
            }
            if (Math.random() < 0.15) {
                pixel.dir *= -1;
            }
        }

    },
},

elements.head = {
    color: ["#f283c3","#ec6e96","#ff0062","#f64fa5","#ff7d7d"],
    category: "life",
    hidden: true,
    density: 1080,
    state: "solid",
    conduct: 25,
    tempHigh: 255000,
    stateHigh: "cooked_meat",
    tempLow: -30,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    reactions: {
        "cancer": { "elem1":"cancer", "chance":0.005 },
        "radiation": { "elem1":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
    },
    properties: {
        dead: false
    },
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }

        
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) { // If body is dead, kill head
                pixel.dead = body.dead;
            }
        }
        else { var body = null }

        if (isEmpty(pixel.x, pixel.y+1)) {
            tryMove(pixel, pixel.x, pixel.y+1);
            // create blood if severed 10% chance
            if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1) {
                createPixel("blood", pixel.x, pixel.y+1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
    }
};

elements.dodo = {
    color: ["#8b6651", "#a18c5c", "#9f897f","#a67931"],
    behavior: [
    "XX|SW:water,salt_water,sugar_water,dirty_water%10|XX",
    "BO:polar_bear,polar_bear_cub,killer_whale%50|FX%1|M1 AND SW:water,salt_water,sugar_water,dirty_water%15 AND BO:polar_bear,polar_bear_cub,killer_whale%40",
    "M2|M1|M1 AND SW:water,salt_water,sugar_water,dirty_water%15"
],

    category: "life",
    state: "solid",
    density: 1050,

    tempHigh: 100,
    stateHigh: "cooked_meat",

    burn: 5,
    burnTime: 250,
    burnInto: "cooked_meat",

    reactions: {
        seeds: { elem2: null, chance: 0.35 },
        clam: { elem2: null, chance: 0.35 },
        oxygen: { elem2: "carbon_dioxide", chance: 0.3 },
        poison: { elem1: "rotten_meat", chance: 0.2 },
        plant: { elem2: null, chance: 0.05 },
        algae: {elem2: null, chance: 0.05 },
        watermelon: { elem2: null, chance: 0.65 }
    }
};

elements.watermelon = {
    name: "watermelon",
    color: ["#2f7d32", "#1f5f2a", "#1a7f2b"],
    behavior: behaviors.WALL,
    category: "food",
    state: "solid",
    density: 950,
    breakInto: "seeds"
};

elements.mammoth = {
    name: "mammoth",
       color: ["#7B3F00", "#8B4513", "#A0522D", "#8F4E2B", "#9B5A32",
    "#A65E2E", "#B5651D", "#C0783E", "#AD6F3B", "#925C3B",
    "#A97142", "#B87333", "#C08050", "#8D5524", "#6F4E37",
    "#AA6C39", "#BE6E32",
    "#F5E6C8", "#F3E5AB", "#FFF1D0"
 ],
    category: "life",
    state: "solid",
    density: 1800,
    properties: {
        dir: 1
    },
    reactions: {
        "plant": { elem2: null, chance: 0.15 },
        "grass": { elem2: null, chance: 0.15 },
        "leaves": { elem2: null, chance: 0.1 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 }
    },
    foodNeed: 20,
    temp: 35,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 300,
    tick: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;

        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);

        if (isEmpty(x + 1, y) && isEmpty(x, y + 1) && isEmpty(x + 1, y + 1)) {
            createPixel("mammoth_body", x + 1, y);
            createPixel("mammoth_back_leg", x, y + 1);
            createPixel("mammoth_front_leg", x + 1, y + 1);
        }

        if (
            isEmpty(x + 1, y) || isEmpty(x, y + 1) || isEmpty(x + 1, y + 1) ||
            pixelMap[x + 1][y].element !== "mammoth_body" ||
            pixelMap[x][y + 1].element !== "mammoth_back_leg" ||
            pixelMap[x + 1][y + 1].element !== "mammoth_front_leg"
        ) {
            return;
        }

        var body = pixelMap[x + 1][y];
        var backLeg = pixelMap[x][y + 1];
        var frontLeg = pixelMap[x + 1][y + 1];

        if (isEmpty(x, y + 2) && isEmpty(x + 1, y + 2)) {
            movePixel(backLeg, x, y + 2);
            movePixel(frontLeg, x + 1, y + 2);
            movePixel(pixel, x, y + 1);
            movePixel(body, x + 1, y + 1);
            return;
        }

        if (Math.random() < 0.1) {
            if (pixel.dir > 0 && x + 2 < width &&
                isEmpty(x + 2, y) && isEmpty(x + 2, y + 1)) {
                movePixel(body, x + 2, y);
                movePixel(frontLeg, x + 2, y + 1);
                movePixel(pixel, x + 1, y);
                movePixel(backLeg, x + 1, y + 1);
            } else if (pixel.dir < 0 && x > 0 &&
                isEmpty(x - 1, y) && isEmpty(x - 1, y + 1)) {
                movePixel(pixel, x - 1, y);
                movePixel(backLeg, x - 1, y + 1);
                movePixel(body, x, y);
                movePixel(frontLeg, x, y + 1);
            } else {
                pixel.dir *= -1;
            }
        }
    }
};

elements.mammoth_body = {
    name: "mammoth body",
        color: ["#7B3F00", "#8B4513", "#A0522D", "#8F4E2B", "#9B5A32",
    "#A65E2E", "#B5651D", "#C0783E", "#AD6F3B", "#925C3B",
    "#A97142", "#B87333", "#C08050", "#8D5524", "#6F4E37",
    "#AA6C39", "#BE6E32",
    "#F5E6C8", "#F3E5AB", "#FFF1D0"
 ],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};

elements.mammoth_back_leg = {
    name: "mammoth back leg",
    color: ["#7B3F00", "#8B4513", "#A0522D", "#8F4E2B", "#9B5A32",
    "#A65E2E", "#B5651D", "#C0783E", "#AD6F3B", "#925C3B",
    "#A97142", "#B87333", "#C08050", "#8D5524", "#6F4E37",
    "#AA6C39", "#BE6E32",
    "#F5E6C8", "#F3E5AB", "#FFF1D0"
 ],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};

elements.mammoth_front_leg = {
    name: "mammoth front leg",
    color: ["#7B3F00", "#8B4513", "#A0522D", "#8F4E2B", "#9B5A32",
    "#A65E2E", "#B5651D", "#C0783E", "#AD6F3B", "#925C3B",
    "#A97142", "#B87333", "#C08050", "#8D5524", "#6F4E37",
    "#AA6C39", "#BE6E32",
    "#F5E6C8", "#F3E5AB", "#FFF1D0"
 ],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};
//the mammoth is a moving box LOL

elements.big_polar_bear = {
    name: "big polar bear",
    color: ["#ffffff"],
    category: "life",
    state: "solid",
    density: 1800,
    properties: { dir: 1 },
    reactions: {
        "fish": { elem2: null, chance: 0.25 },
        "seal": { elem2: null, chance: 0.3 },
        "penguin": { elem2: null, chance: 0.3 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 }
    },
    foodNeed: 18,
    temp: 35,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 300,
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);

        var x = pixel.x;
        var y = pixel.y;

        if (x + 1 >= width || y + 1 >= height) return;

        if (
            isEmpty(x + 1, y) &&
            isEmpty(x, y + 1) &&
            isEmpty(x + 1, y + 1)
        ) {
            createPixel("big_polar_bear_body", x + 1, y);
            createPixel("big_polar_bear_back_leg", x, y + 1);
            createPixel("big_polar_bear_front_leg", x + 1, y + 1);
            return;
        }

        if (
            isEmpty(x + 1, y, true) ||
            isEmpty(x, y + 1, true) ||
            isEmpty(x + 1, y + 1, true) ||
            pixelMap[x + 1][y].element !== "big_polar_bear_body" ||
            pixelMap[x][y + 1].element !== "big_polar_bear_back_leg" ||
            pixelMap[x + 1][y + 1].element !== "big_polar_bear_front_leg"
        ) return;

        var body = pixelMap[x + 1][y];
        var backLeg = pixelMap[x][y + 1];
        var frontLeg = pixelMap[x + 1][y + 1];

        pixel.dir = pixel.dir || 1;

        if (Math.random() < 0.1) {
            if (pixel.dir > 0 && x + 2 < width &&
                isEmpty(x + 2, y) && isEmpty(x + 2, y + 1)) {
                movePixel(body, x + 2, y);
                movePixel(frontLeg, x + 2, y + 1);
                movePixel(pixel, x + 1, y);
                movePixel(backLeg, x + 1, y + 1);
            } else if (pixel.dir < 0 && x > 0 &&
                isEmpty(x - 1, y) && isEmpty(x - 1, y + 1)) {
                movePixel(pixel, x - 1, y);
                movePixel(backLeg, x - 1, y + 1);
                movePixel(body, x, y);
                movePixel(frontLeg, x, y + 1);
            } else {
                pixel.dir *= -1;
            }
        }

        x = pixel.x;
        y = pixel.y;

        if (
            y + 2 < height &&
            isEmpty(x, y + 2) &&
            isEmpty(x + 1, y + 2)
        ) {
            movePixel(pixelMap[x][y + 1], x, y + 2);
            movePixel(pixelMap[x + 1][y + 1], x + 1, y + 2);
            movePixel(pixel, x, y + 1);
            movePixel(pixelMap[x + 1][y], x + 1, y + 1);
        }
    }
};

elements.big_polar_bear_body = {
    name: "big polar bear body",
    color: ["#ffffff"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};

elements.big_polar_bear_back_leg = {
    name: "big polar bear back leg",
    color: ["#ffffff"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};

elements.big_polar_bear_front_leg = {
    name: "big polar bear front leg",
    color: ["#ffffff"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};
elements.big_walrus = {
    name: "big walrus",
    color: ["#3d281b", "#5c4130", "#493123", "#553521"],
    category: "life",
    state: "solid",
    density: 1800,
    properties: { dir: 1 },
    reactions: {
        "fish": { elem2: null, chance: 0.3 },
        "clam": { elem2: null, chance: 0.35 },
        "herring": { elem2: null, chance: 0.25 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 }
    },
    foodNeed: 18,
    temp: 35,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 300,
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);

        var x = pixel.x;
        var y = pixel.y;

        if (x + 1 >= width || y + 1 >= height) return;

        if (
            isEmpty(x + 1, y) &&
            isEmpty(x, y + 1) &&
            isEmpty(x + 1, y + 1)
        ) {
            createPixel("big_walrus_body", x + 1, y);
            createPixel("big_walrus_tusk", x, y + 1);
            createPixel("big_walrus_front_leg", x + 1, y + 1);
            return;
        }

        if (
            isEmpty(x + 1, y, true) ||
            isEmpty(x, y + 1, true) ||
            isEmpty(x + 1, y + 1, true) ||
            pixelMap[x + 1][y].element !== "big_walrus_body" ||
            pixelMap[x][y + 1].element !== "big_walrus_tusk" ||
            pixelMap[x + 1][y + 1].element !== "big_walrus_front_leg"
        ) return;

        var body = pixelMap[x + 1][y];
        var tusk = pixelMap[x][y + 1];
        var frontLeg = pixelMap[x + 1][y + 1];

        pixel.dir = pixel.dir || 1;

        if (Math.random() < 0.1) {
            if (pixel.dir > 0 && x + 2 < width &&
                isEmpty(x + 2, y) && isEmpty(x + 2, y + 1)) {
                movePixel(body, x + 2, y);
                movePixel(frontLeg, x + 2, y + 1);
                movePixel(pixel, x + 1, y);
                movePixel(tusk, x + 1, y + 1);
            } else if (pixel.dir < 0 && x > 0 &&
                isEmpty(x - 1, y) && isEmpty(x - 1, y + 1)) {
                movePixel(pixel, x - 1, y);
                movePixel(tusk, x - 1, y + 1);
                movePixel(body, x, y);
                movePixel(frontLeg, x, y + 1);
            } else {
                pixel.dir *= -1;
            }
        }

        x = pixel.x;
        y = pixel.y;

        if (
            y + 2 < height &&
            isEmpty(x, y + 2) &&
            isEmpty(x + 1, y + 2)
        ) {
            movePixel(pixelMap[x][y + 1], x, y + 2);
            movePixel(pixelMap[x + 1][y + 1], x + 1, y + 2);
            movePixel(pixel, x, y + 1);
            movePixel(pixelMap[x + 1][y], x + 1, y + 1);
        }
    }
};

elements.big_walrus_body = {
    name: "big walrus body",
    color: ["#3d281b", "#5c4130", "#493123", "#553521"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};

elements.big_walrus_tusk = {
    name: "big walrus tusk",
    color: ["#fffdf5"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "bone"
};

elements.big_walrus_front_leg = {
    name: "big walrus front leg",
    color: ["#3d281b", "#5c4130", "#493123", "#553521"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};

elements.woolly_rhino = {
    name: "woolly rhino",
    color: ["#ffffff"],
    category: "life",
    state: "solid",
    density: 1800,
    properties: { dir: 1 },
    reactions: {
        "plant": { elem2: null, chance: 0.2 },
        "grass": { elem2: null, chance: 0.2 },
        "mod_tundra_grass": { elem2: null, chance: 0.5 },
        "leaves": { elem2: null, chance: 0.1 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 }
    },
    foodNeed: 18,
    temp: 35,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 300,
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);

        var x = pixel.x;
        var y = pixel.y;

        if (x + 1 >= width || y + 1 >= height) return;

        if (
            isEmpty(x + 1, y) &&
            isEmpty(x, y + 1) &&
            isEmpty(x + 1, y + 1)
        ) {
            createPixel("woolly_rhino_body", x + 1, y);
            createPixel("woolly_rhino_back_leg", x, y + 1);
            createPixel("woolly_rhino_front_leg", x + 1, y + 1);
            return;
        }

        if (
            isEmpty(x + 1, y, true) ||
            isEmpty(x, y + 1, true) ||
            isEmpty(x + 1, y + 1, true) ||
            pixelMap[x + 1][y].element !== "woolly_rhino_body" ||
            pixelMap[x][y + 1].element !== "woolly_rhino_back_leg" ||
            pixelMap[x + 1][y + 1].element !== "woolly_rhino_front_leg"
        ) return;

        var body = pixelMap[x + 1][y];
        var backLeg = pixelMap[x][y + 1];
        var frontLeg = pixelMap[x + 1][y + 1];

        pixel.dir = pixel.dir || 1;

        if (Math.random() < 0.1) {
            if (pixel.dir > 0 && x + 2 < width &&
                isEmpty(x + 2, y) && isEmpty(x + 2, y + 1)) {
                movePixel(body, x + 2, y);
                movePixel(frontLeg, x + 2, y + 1);
                movePixel(pixel, x + 1, y);
                movePixel(backLeg, x + 1, y + 1);
            } else if (pixel.dir < 0 && x > 0 &&
                isEmpty(x - 1, y) && isEmpty(x - 1, y + 1)) {
                movePixel(pixel, x - 1, y);
                movePixel(backLeg, x - 1, y + 1);
                movePixel(body, x, y);
                movePixel(frontLeg, x, y + 1);
            } else {
                pixel.dir *= -1;
            }
        }

        x = pixel.x;
        y = pixel.y;

        if (
            y + 2 < height &&
            isEmpty(x, y + 2) &&
            isEmpty(x + 1, y + 2)
        ) {
            movePixel(pixelMap[x][y + 1], x, y + 2);
            movePixel(pixelMap[x + 1][y + 1], x + 1, y + 2);
            movePixel(pixel, x, y + 1);
            movePixel(pixelMap[x + 1][y], x + 1, y + 1);
        }
    }
};

elements.woolly_rhino_body = {
    name: "woolly rhino body",
    color: ["#75675b", "#887668", "#695c51", "#9a8876"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};

elements.woolly_rhino_back_leg = {
    name: "woolly rhino back leg",
    color: ["#75675b", "#887668", "#695c51", "#9a8876"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};

elements.woolly_rhino_front_leg = {
    name: "woolly rhino front leg",
    color: ["#75675b", "#887668", "#695c51", "#9a8876"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};
elements.saber_tooth_tiger = {
    name: "saber-tooth tiger",
    color: ["#b8793e", "#c98b4d", "#9f6335", "#d6a15c"],
    category: "life",
    state: "solid",
    density: 1800,
    properties: { dir: 1 },
    reactions: {
        "meat": { elem2: null, chance: 0.3 },
        "rotten_meat": { elem2: null, chance: 0.2 },
        "arctic_hare": { elem2: null, chance: 0.3 },
        "reindeer": { elem2: null, chance: 0.25 },
        "dodo": { elem2: null, chance: 0.2 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 }
    },
    foodNeed: 18,
    temp: 35,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 300,
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);

        var x = pixel.x;
        var y = pixel.y;

        if (x + 1 >= width || y + 1 >= height) return;

        if (
            isEmpty(x + 1, y) &&
            isEmpty(x, y + 1) &&
            isEmpty(x + 1, y + 1)
        ) {
            createPixel("saber_tooth_tiger_body", x + 1, y);
            createPixel("saber_tooth_tiger_tusk", x, y + 1);
            createPixel("saber_tooth_tiger_front_leg", x + 1, y + 1);
            return;
        }

        if (
            isEmpty(x + 1, y, true) ||
            isEmpty(x, y + 1, true) ||
            isEmpty(x + 1, y + 1, true) ||
            pixelMap[x + 1][y].element !== "saber_tooth_tiger_body" ||
            pixelMap[x][y + 1].element !== "saber_tooth_tiger_tusk" ||
            pixelMap[x + 1][y + 1].element !== "saber_tooth_tiger_front_leg"
        ) return;

        var body = pixelMap[x + 1][y];
        var tusk = pixelMap[x][y + 1];
        var frontLeg = pixelMap[x + 1][y + 1];

        pixel.dir = pixel.dir || 1;

        if (Math.random() < 0.1) {
            if (pixel.dir > 0 && x + 2 < width &&
                isEmpty(x + 2, y) && isEmpty(x + 2, y + 1)) {
                movePixel(body, x + 2, y);
                movePixel(frontLeg, x + 2, y + 1);
                movePixel(pixel, x + 1, y);
                movePixel(tusk, x + 1, y + 1);
            } else if (pixel.dir < 0 && x > 0 &&
                isEmpty(x - 1, y) && isEmpty(x - 1, y + 1)) {
                movePixel(pixel, x - 1, y);
                movePixel(tusk, x - 1, y + 1);
                movePixel(body, x, y);
                movePixel(frontLeg, x, y + 1);
            } else {
                pixel.dir *= -1;
            }
        }

        x = pixel.x;
        y = pixel.y;

        if (
            y + 2 < height &&
            isEmpty(x, y + 2) &&
            isEmpty(x + 1, y + 2)
        ) {
            movePixel(pixelMap[x][y + 1], x, y + 2);
            movePixel(pixelMap[x + 1][y + 1], x + 1, y + 2);
            movePixel(pixel, x, y + 1);
            movePixel(pixelMap[x + 1][y], x + 1, y + 1);
        }
    }
};

elements.saber_tooth_tiger_body = {
    name: "saber-tooth tiger body",
    color: ["#b8793e", "#c98b4d", "#9f6335", "#d6a15c"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};

elements.saber_tooth_tiger_tusk = {
    name: "saber-tooth tiger tusk",
    color: ["#fffdf5"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "bone"
};

elements.saber_tooth_tiger_front_leg = {
    name: "saber-tooth tiger front leg",
    color: ["#b8793e", "#c98b4d", "#9f6335", "#d6a15c"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};

elements.frozen_fossil = {
    name: "frozen fossil",
    color: ["#5a5958", "#888887", "#807f7e", "#474747"],
    state: "solid",
    behavior: behaviors.WALL,
    category: "ice solids",
    density: 2800,
    hardness: 0.9,
    breakInto: "bone",
    temp: -50,
    tempHigh: 0,
    stateHigh: "fossil_block",
    tempLow: -100,
    stateLow: "permafrost_ice",
};

elements.petroleum = {
    name: "petroleum",
    color: ["#0d1011", "#0d1218", "#202020"],
    state: "liquid",
    behavior: behaviors.LIQUID,
    category: "ice solids",
    density: 995,
    temp: 20,
    tempHigh: 100,
    stateHigh: "carbon_dioxide",
    tempLow: -50,
    stateLow: "smoke",
    reactions: {
        "water": { elem2: "dirty_water", chance: 0.4 },
        "fossil": { elem2: "petroleum", chance: 0.3 },
        "fire": { elem2: "oil", chance: 0.93 },
         "magma":{elem2:"oil", chance:0.93}
    },

};

elements.absolute_zero_gas = {
    name: "absolute zero gas",
    color: ["#c8f7ff", "#94dff0", "#e8fcff"],
    behavior: behaviors.GAS,
    category: "weapons",
    state: "gas",
    density: 0.3,
    temp: -273,
    tick: function(pixel) {
        var radius = 2;

        for (var x = Math.max(0, pixel.x - radius); x <= Math.min(width - 1, pixel.x + radius); x++) {
            for (var y = Math.max(0, pixel.y - radius); y <= Math.min(height - 1, pixel.y + radius); y++) {
                var distanceX = x - pixel.x;
                var distanceY = y - pixel.y;

                if (distanceX * distanceX + distanceY * distanceY > radius * radius) {
                    continue;
                }

                if (isEmpty(x, y, true)) {
                    continue;
                }

                var target = pixelMap[x][y];

                if (target === pixel) {
                    continue;
                }

                target.temp = -273;

                if (
                    target.element === "water" ||
                    target.element === "salt_water" ||
                    target.element === "dirty_water" ||
                    target.element === "sugar_water"
                ) {
                    changePixel(target, "ice");
                } else if (
                    elements[target.element] &&
                    elements[target.element].category === "life"
                ) {
                    changePixel(target, "frozen_meat");
                } else {
                    doHeat(target);
                }
            }
        }

        deletePixel(pixel.x, pixel.y);
    }
};


elements.snowman = {
    name: "snowman",
    color: ["#f2f7fa", "#e8f0f4", "#ffffff"],
    category: "ice solids",
    state: "solid",
    behavior: behaviors.WALL,
    density: 700,
    tempHigh: 0,
    stateHigh: "water",
    breakInto: "snow",
    onPlace: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;

        if (x < 1 || x >= width - 1 || y < 3) return;

        var parts = [
            ["snowman_middle", x, y - 1],
            ["snowman_head", x, y - 2],
            ["snowman_hat", x, y - 3],
            ["snowman_nose", x + 1, y - 2],
            ["wood", x - 1, y - 1],
            ["wood", x + 1, y - 1]
        ];

        for (var i = 0; i < parts.length; i++) {
            if (!isEmpty(parts[i][1], parts[i][2])) return;
        }

        for (var i = 0; i < parts.length; i++) {
            createPixel(parts[i][0], parts[i][1], parts[i][2]);
        }
    }
};

elements.snowman_middle = {
    name: "snowman middle",
    color: ["#f2f7fa", "#e8f0f4", "#ffffff"],
    category: "solids",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 650,
    tempHigh: 0,
    stateHigh: "water",
    breakInto: "snow"
};

elements.snowman_head = {
    name: "snowman head",
    color: ["#f2f7fa", "#e8f0f4", "#ffffff"],
    category: "solids",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 600,
    tempHigh: 0,
    stateHigh: "water",
    breakInto: "snow"
};

elements.snowman_hat = {
    name: "snowman hat",
    color: ["#20252b", "#303840"],
    category: "solids",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1200,
    tempHigh: 200,
    stateHigh: "ash",
    breakInto: "ash"
};

elements.snowman_nose = {
    name: "snowman nose",
    color: ["#ed7926", "#f28c28"],
    category: "solids",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 900,
    breakInto: "watermelon"
};

function moveLivingSnowman(parts, dx, dy) {
    for (var i = 0; i < parts.length; i++) {
        var targetX = parts[i].x + dx;
        var targetY = parts[i].y + dy;

        if (
            targetX < 0 || targetX >= width ||
            targetY < 0 || targetY >= height
        ) return false;

        if (!isEmpty(targetX, targetY, true)) {
            var occupant = pixelMap[targetX][targetY];
            if (parts.indexOf(occupant) === -1) return false;
        }
    }

    var orderedParts = parts.slice().sort(function(a, b) {
        if (dx > 0) return b.x - a.x;
        if (dx < 0) return a.x - b.x;
        if (dy > 0) return b.y - a.y;
        return a.y - b.y;
    });

    for (var i = 0; i < orderedParts.length; i++) {
        var part = orderedParts[i];
        movePixel(part, part.x + dx, part.y + dy);
    }

    return true;
}

elements.living_snowman = {
    name: "living snowman",
    color: ["#f2f7fa", "#e8f0f4", "#ffffff"],
    category: "life",
    state: "solid",
    density: 700,
    properties: {
        dir: 1,
        nextMove: 0
    },
    tempHigh: 0,
    stateHigh: "water",
    breakInto: "snow",
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);

        var x = pixel.x;
        var y = pixel.y;

        if (x < 1 || x >= width - 1 || y < 3) return;

        var partSpecs = [
            ["living_snowman_middle", x, y - 1],
            ["living_snowman_head", x, y - 2],
            ["living_snowman_hat", x, y - 3],
            ["living_snowman_nose", x + 1, y - 2],
            ["living_snowman_arm", x - 1, y - 1],
            ["living_snowman_arm", x + 1, y - 1]
        ];

        var allPartsEmpty = true;

        for (var i = 0; i < partSpecs.length; i++) {
            if (!isEmpty(partSpecs[i][1], partSpecs[i][2])) {
                allPartsEmpty = false;
                break;
            }
        }

        if (allPartsEmpty) {
            for (var i = 0; i < partSpecs.length; i++) {
                createPixel(partSpecs[i][0], partSpecs[i][1], partSpecs[i][2]);
            }
            pixel.nextMove = pixelTicks + 10;
            return;
        }

        var parts = [pixel];

        for (var i = 0; i < partSpecs.length; i++) {
            var partX = partSpecs[i][1];
            var partY = partSpecs[i][2];

            if (isEmpty(partX, partY, true)) return;

            var part = pixelMap[partX][partY];
            if (part.element !== partSpecs[i][0]) return;

            parts.push(part);
        }

        pixel.dir = pixel.dir || 1;

        if (isEmpty(pixel.x, pixel.y + 1) && moveLivingSnowman(parts, 0, 1)) {
            return;
        }

        if (pixelTicks >= pixel.nextMove) {
            if (!moveLivingSnowman(parts, pixel.dir, 0)) {
                pixel.dir *= -1;
                moveLivingSnowman(parts, pixel.dir, 0);
            }

            pixel.nextMove = pixelTicks + 10;
        }
    }
};

elements.living_snowman_middle = {
    name: "living snowman middle",
    color: ["#f2f7fa", "#e8f0f4", "#ffffff"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 650,
    tempHigh: 0,
    stateHigh: "water",
    breakInto: "snow"
};

elements.living_snowman_head = {
    name: "living snowman head",
    color: ["#f2f7fa", "#e8f0f4", "#ffffff"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 600,
    tempHigh: 0,
    stateHigh: "water",
    breakInto: "snow"
};

elements.living_snowman_hat = {
    name: "living snowman hat",
    color: ["#20252b", "#303840"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1200,
    tempHigh: 200,
    stateHigh: "ash",
    breakInto: "ash"
};

elements.living_snowman_nose = {
    name: "living snowman nose",
    color: ["#ed7926", "#f28c28"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 900,
    breakInto: "watermelon"
};

elements.living_snowman_arm = {
    name: "living snowman arm",
    color: ["#7a4d2b", "#684022"],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1200,
    breakInto: "wood"
};

var auroraColors = [
    "#39ff14",
    "#19e6b5",
    "#20c7e8",
    "#528bff",
    "#a855f7",
    "#39ff14"
];

elements.aurora = {
    name: "aurora",
    color: auroraColors,
    category: "ice solids",
    state: "gas",
    behavior: behaviors.GAS,
    density: 0.2,
    temp: -30,
    tick: function(pixel) {
        if (pixel.auroraPhase === undefined) {
            pixel.auroraPhase = Math.floor(Math.random() * auroraColors.length);
        }

        if (pixelTicks % 8 === 0) {
            pixel.auroraPhase =
                (pixel.auroraPhase + 1) % auroraColors.length;
            pixel.color = auroraColors[pixel.auroraPhase];
        }
    }
};

elements.avalanche = {
    name: "avalanche",
    color: ["#e6eef2", "#d7e3e9", "#cbd9e0"],
    category: "ice solids",
    state: "solid",
    behavior: behaviors.WALL,
    maxSize: 1,
    cooldown: defaultCooldown,
    onPlace: function(pixel) {
        var centerX = pixel.x;
        var centerY = pixel.y;

        for (var row = 0; row < 41; row++) {
            var halfWidth = 4 + row * 2;
            var y = centerY - 40 + row;

            for (var offsetX = -halfWidth; offsetX <= halfWidth; offsetX++) {
                var x = centerX + offsetX;

                if (x < 0 || x >= width || y < 0 || y >= height) continue;

                if (x === centerX && y === centerY) {
                    changePixel(pixel, "permafrost_snow");
                } else if (isEmpty(x, y)) {
                    createPixel("permafrost_snow", x, y);
                }
            }
        }
    }
};

elements.methane_hydrate = {
    name: "methane hydrate",
    color: ["#d9edf2", "#c6e2e8", "#eef8fa"],
    category: "ice solids",
    state: "solid",
    behavior: behaviors.WALL,
    density: 920,
    temp: -20,
    hardness: 0.7,
    breakInto: "ice",
    tick: function(pixel) {
        if (pixel.temp <= -5 || pixel.y <= 0 || pixel.x >= width) return;
        if (!isEmpty(pixel.x, pixel.y - 1)) return;

        createPixel("methane", pixel.x, pixel.y - 1);
        changePixel(pixel, "water");
    }
};

elements.frozen_carcass = {
    name: "frozen carcass",
    color: ["#9da9a8", "#b4bebc", "#879592"],
    category: "ice solids",
    state: "solid",
    behavior: behaviors.WALL,
    density: 1100,
    temp: -20,
    hardness: 0.4,
    breakInto: "bone",
    tick: function(pixel) {
        if (pixel.temp <= -1 || pixel.x + 1 >= width) return;
        if (!isEmpty(pixel.x + 1, pixel.y)) return;

        createPixel("bone", pixel.x + 1, pixel.y);
        changePixel(pixel, "meat");
    }
};

var iceFloeWaterTypes = [
    "water",
    "salt_water",
    "dirty_water",
    "sugar_water",
    "pool_water"
];

elements.ice_floe = {
    name: "ice floe",
    color: ["#b7ddeb", "#c9e6ef", "#a6d2e2"],
    category: "ice solids",
    state: "solid",
    density: 900,
    temp: -5,
    tempHigh: 0,
    stateHigh: "water",
    breakInto: "ice",
    hardness: 0.5,
    tick: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;

        if (y + 1 >= height) return;

        if (
            !isEmpty(x, y + 1, true) &&
            iceFloeWaterTypes.indexOf(pixelMap[x][y + 1].element) !== -1 &&
            y > 0 &&
            isEmpty(x, y - 1)
        ) {
            tryMove(pixel, x, y - 1);
            return;
        }

        if (isEmpty(x, y + 1)) {
            tryMove(pixel, x, y + 1);
            return;
        }

        if (Math.random() < 0.03) {
            var direction = Math.random() < 0.5 ? -1 : 1;
            var nextX = x + direction;

            if (
                nextX >= 0 &&
                nextX < width &&
                y + 1 < height &&
                isEmpty(nextX, y) &&
                !isEmpty(nextX, y + 1, true) &&
                iceFloeWaterTypes.indexOf(pixelMap[nextX][y + 1].element) !== -1
            ) {
                tryMove(pixel, nextX, y);
            }
        }
    }
};

function canMoveSegmentedAnimal(parts, dx, dy) {
    for (var i = 0; i < parts.length; i++) {
        var targetX = parts[i].x + dx;
        var targetY = parts[i].y + dy;

        if (
            targetX < 0 || targetX >= width ||
            targetY < 0 || targetY >= height
        ) return false;

        if (!isEmpty(targetX, targetY, true)) {
            var occupant = pixelMap[targetX][targetY];
            if (parts.indexOf(occupant) === -1) return false;
        }
    }

    return true;
}

function moveSegmentedAnimal(parts, dx, dy) {
    if (!canMoveSegmentedAnimal(parts, dx, dy)) return false;

    var orderedParts = parts.slice().sort(function(a, b) {
        if (dx > 0) return b.x - a.x;
        if (dx < 0) return a.x - b.x;
        if (dy > 0) return b.y - a.y;
        return a.y - b.y;
    });

    for (var i = 0; i < orderedParts.length; i++) {
        var part = orderedParts[i];
        movePixel(part, part.x + dx, part.y + dy);
    }

    return true;
}

function tickSegmentedAnimal(pixel, partSpecs) {
    var x = pixel.x;
    var y = pixel.y;
    var parts = [pixel];
    var allPartsEmpty = true;

    for (var i = 0; i < partSpecs.length; i++) {
        var partX = x + partSpecs[i].dx;
        var partY = y + partSpecs[i].dy;

        if (
            partX < 0 || partX >= width ||
            partY < 0 || partY >= height
        ) return;

        if (!isEmpty(partX, partY)) {
            allPartsEmpty = false;
        }
    }

    if (allPartsEmpty) {
        for (var i = 0; i < partSpecs.length; i++) {
            createPixel(
                partSpecs[i].element,
                x + partSpecs[i].dx,
                y + partSpecs[i].dy
            );
        }

        pixel.nextMove = pixelTicks + 12;
        return;
    }

    for (var i = 0; i < partSpecs.length; i++) {
        var partX = x + partSpecs[i].dx;
        var partY = y + partSpecs[i].dy;

        if (isEmpty(partX, partY, true)) return;

        var part = pixelMap[partX][partY];
        if (part.element !== partSpecs[i].element) return;

        parts.push(part);
    }

    pixel.dir = pixel.dir || 1;

    if (canMoveSegmentedAnimal(parts, 0, 1)) {
        moveSegmentedAnimal(parts, 0, 1);
        return;
    }

    if (pixel.nextMove === undefined || pixelTicks >= pixel.nextMove) {
        if (!moveSegmentedAnimal(parts, pixel.dir, 0)) {
            pixel.dir *= -1;
            moveSegmentedAnimal(parts, pixel.dir, 0);
        }

        pixel.nextMove = pixelTicks + 12;
    }
}

function defineAnimalSegment(spec, category) {
    elements[spec.element] = {
        name: spec.name,
        color: spec.color,
        category: category,
        hidden: true,
        state: "solid",
        behavior: behaviors.WALL,
        density: spec.density || 1200,
        tempHigh: 80,
        stateHigh: "cooked_meat",
        tempLow: -100,
        stateLow: "frozen_meat",
        breakInto: spec.breakInto || "rotten_meat"
    };
}

var giantSlothParts = [
    {
        element: "giant_sloth_head",
        name: "giant sloth head",
        dx: 0,
        dy: -2,
        color: ["#70513b", "#806044", "#9a7655"]
    },
    {
        element: "giant_sloth_body",
        name: "giant sloth body",
        dx: 0,
        dy: -1,
        color: ["#604735", "#79583f", "#8b694d"]
    },
    {
        element: "giant_sloth_left_arm",
        name: "giant sloth left arm",
        dx: -1,
        dy: -1,
        color: ["#604735", "#79583f", "#8b694d"]
    },
    {
        element: "giant_sloth_right_arm",
        name: "giant sloth right arm",
        dx: 1,
        dy: -1,
        color: ["#604735", "#79583f", "#8b694d"]
    },
    {
        element: "giant_sloth_left_foot",
        name: "giant sloth left foot",
        dx: -1,
        dy: 0,
        color: ["#4d392c", "#634936"]
    },
    {
        element: "giant_sloth_right_foot",
        name: "giant sloth right foot",
        dx: 1,
        dy: 0,
        color: ["#4d392c", "#634936"]
    }
];

elements.giant_sloth = {
    name: "giant sloth",
    color: ["#604735", "#79583f", "#8b694d"],
    category: "life",
    state: "solid",
    density: 1500,
    properties: {
        dir: 1,
        nextMove: 0
    },
    reactions: {
        "leaves": { elem2: null, chance: 0.2 },
        "plant": { elem2: null, chance: 0.15 },
        "fruit": { elem2: null, chance: 0.15 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 }
    },
    foodNeed: 15,
    temp: 35,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 12,
    burnTime: 250,
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        tickSegmentedAnimal(pixel, giantSlothParts);
    }
};

for (var i = 0; i < giantSlothParts.length; i++) {
    defineAnimalSegment(giantSlothParts[i], "life");
}

var glyptodonParts = [
    {
        element: "glyptodon_shell_left",
        name: "glyptodon shell",
        dx: -1,
        dy: -1,
        color: ["#625b43", "#777052", "#898060"],
        breakInto: "bone",
        density: 1600
    },
    {
        element: "glyptodon_shell_center",
        name: "glyptodon shell",
        dx: 0,
        dy: -1,
        color: ["#625b43", "#777052", "#898060"],
        breakInto: "bone",
        density: 1600
    },
    {
        element: "glyptodon_shell_right",
        name: "glyptodon shell",
        dx: 1,
        dy: -1,
        color: ["#625b43", "#777052", "#898060"],
        breakInto: "bone",
        density: 1600
    },
    {
        element: "glyptodon_tail",
        name: "glyptodon tail",
        dx: -2,
        dy: 0,
        color: ["#514a38", "#6d654b"],
        breakInto: "bone"
    },
    {
        element: "glyptodon_back_leg",
        name: "glyptodon back leg",
        dx: -1,
        dy: 0,
        color: ["#766b54", "#897c62"]
    },
    {
        element: "glyptodon_front_leg",
        name: "glyptodon front leg",
        dx: 1,
        dy: 0,
        color: ["#766b54", "#897c62"]
    },
    {
        element: "glyptodon_head",
        name: "glyptodon head",
        dx: 2,
        dy: 0,
        color: ["#8b8069", "#a0947a"]
    }
];

elements.glyptodon = {
    name: "glyptodon",
    color: ["#766b54", "#897c62"],
    category: "life",
    state: "solid",
    density: 1600,
    properties: {
        dir: 1,
        nextMove: 0
    },
    reactions: {
        "plant": { elem2: null, chance: 0.2 },
        "grass": { elem2: null, chance: 0.2 },
        "mod_tundra_grass": { elem2: null, chance: 0.5 },
        "leaves": { elem2: null, chance: 0.1 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 }
    },
    foodNeed: 12,
    temp: 35,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 12,
    burnTime: 250,
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        tickSegmentedAnimal(pixel, glyptodonParts);
    }
};

for (var i = 0; i < glyptodonParts.length; i++) {
    defineAnimalSegment(glyptodonParts[i], "life");
}

elements.ibex = {
    name: "mountain goat",
    color: ["#806b54", "#9b8468", "#6b5948", "#d9d0c2"],
    category: "life",
    state: "solid",
    behavior: [
        "XX|M1%20|XX",
        "BO:snow_leopard,arctic_wolf,polar_bear,big_polar_bear%50|FX%1|M1%80 AND BO:snow_leopard,arctic_wolf,polar_bear,big_polar_bear%35",
        "M2%50|M1%80|M1%80"
    ],
    ignore: ["ibex"],
    reactions: {
        "plant": { elem2: null, chance: 0.2 },
        "grass": { elem2: null, chance: 0.2 },
        "mod_tundra_grass": { elem2: null, chance: 0.5 },
        "leaves": { elem2: null, chance: 0.1 },
        "lichen": { elem2: null, chance: 0.15 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    baby: "ibex",
    foodNeed: 8,
    temp: 35,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -120,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 12,
    burnTime: 220,
    density: 1100
};

var snowLeopardPrey = [
    "ibex",
    "arctic_hare",
    "lemming",
    "rat",
    "reindeer",
    "dodo",
    "penguin",
    "little_penguin",
    "seal",
    "seal_pup"
];

var snowLeopardReactions = {
    "meat": { elem2: null, chance: 0.4 },
    "rotten_meat": { elem2: null, chance: 0.2 },
    "fish": { elem2: null, chance: 0.2 },
    "herring": { elem2: null, chance: 0.2 },
    "frozen_fish": { elem2: null, chance: 0.2 },
    "ibex": { elem2: null, chance: 0.45 },
    "arctic_hare": { elem2: null, chance: 0.4 },
    "lemming": { elem2: null, chance: 0.4 },
    "rat": { elem2: null, chance: 0.35 },
    "reindeer": { elem2: null, chance: 0.3 },
    "dodo": { elem2: null, chance: 0.35 },
    "penguin": { elem2: null, chance: 0.3 },
    "little_penguin": { elem2: null, chance: 0.4 },
    "seal": { elem2: null, chance: 0.3 },
    "seal_pup": { elem2: null, chance: 0.4 },
    "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
    "poison": { elem1: "rotten_meat", chance: 0.1 }
};

elements.snow_leopard = {
    name: "snow leopard",
    color: ["#d9d6cf", "#c9c7c2", "#a9a8a5", "#777777", "#f2f0e9"],
    category: "life",
    state: "solid",
    behavior: [
        "XX|M1%10|XX",
        "AT:" + snowLeopardPrey.join(",") + "%45|FX%1|M1%80 AND AT:" + snowLeopardPrey.join(",") + "%35",
        "M2%60|M1%80|M1%80"
    ],
    ignore: ["snow_leopard"],
    properties: {
        jumpTicks: 0
    },
    reactions: snowLeopardReactions,
    foodNeed: 14,
    temp: 35,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 14,
    burnTime: 240,
    density: 1050,
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);

        if (pixel.jumpTicks > 0) {
            if (isEmpty(pixel.x, pixel.y - 1)) {
                tryMove(pixel, pixel.x, pixel.y - 1);
                pixel.jumpTicks--;
            } else {
                pixel.jumpTicks = 0;
            }
        } else if (
            !isEmpty(pixel.x, pixel.y + 1) &&
            Math.random() < 0.04
        ) {
            pixel.jumpTicks = 14;
        }
    }
};

var iceDinoShape = [
    [0, -6], [1, -6],
    [0, -5], [1, -5], [2, -5],
    [0, -4],
    [0, -3], [1, -3],
    [0, -2],
    [-1, -1], [0, -1]
];

function canMoveDino(parts, dx, dy) {
    for (var i = 0; i < parts.length; i++) {
        var targetX = parts[i].x + dx;
        var targetY = parts[i].y + dy;

        if (
            targetX < 0 || targetX >= width ||
            targetY < 0 || targetY >= height
        ) return false;

        if (!isEmpty(targetX, targetY, true)) {
            if (parts.indexOf(pixelMap[targetX][targetY]) === -1) {
                return false;
            }
        }
    }

    return true;
}

function moveDino(parts, dx, dy) {
    if (!canMoveDino(parts, dx, dy)) return false;

    var orderedParts = parts.slice().sort(function(a, b) {
        if (dx > 0) return b.x - a.x;
        if (dx < 0) return a.x - b.x;
        if (dy > 0) return b.y - a.y;
        return a.y - b.y;
    });

    for (var i = 0; i < orderedParts.length; i++) {
        var part = orderedParts[i];
        movePixel(part, part.x + dx, part.y + dy);
    }

    return true;
}

function orientDino(pixel, partNames, parts) {
    var oldShapeDir = pixel.shapeDir;
    var newShapeDir = pixel.dir;

    if (oldShapeDir === newShapeDir) return true;

    for (var i = 0; i < iceDinoShape.length; i++) {
        var targetX = pixel.x + iceDinoShape[i][0] * newShapeDir;
        var targetY = pixel.y + iceDinoShape[i][1];

        if (
            targetX < 0 || targetX >= width ||
            targetY < 0 || targetY >= height
        ) {
            pixel.dir *= -1;
            return false;
        }

        if (!isEmpty(targetX, targetY, true)) {
            if (parts.indexOf(pixelMap[targetX][targetY]) === -1) {
                pixel.dir *= -1;
                return false;
            }
        }
    }

    for (var i = 1; i < parts.length; i++) {
        deletePixel(parts[i].x, parts[i].y);
    }

    for (var i = 0; i < iceDinoShape.length; i++) {
        createPixel(
            partNames[i],
            pixel.x + iceDinoShape[i][0] * newShapeDir,
            pixel.y + iceDinoShape[i][1]
        );
    }

    pixel.shapeDir = newShapeDir;
    pixel.nextMove = pixelTicks + 12;
    return true;
}

function tickDino(pixel, partNames) {
    doHeat(pixel);
    doBurning(pixel);
    doElectricity(pixel);

    var x = pixel.x;
    var y = pixel.y;

    pixel.dir = pixel.dir || 1;

    if (pixel.shapeDir === undefined) {
        pixel.shapeDir = pixel.dir;
    }

    if (x < 2 || x + 2 >= width || y < 6) return;

    var allPartsEmpty = true;

    for (var i = 0; i < iceDinoShape.length; i++) {
        var partX = x + iceDinoShape[i][0] * pixel.shapeDir;
        var partY = y + iceDinoShape[i][1];

        if (!isEmpty(partX, partY)) {
            allPartsEmpty = false;
            break;
        }
    }

    if (allPartsEmpty) {
        for (var i = 0; i < iceDinoShape.length; i++) {
            createPixel(
                partNames[i],
                x + iceDinoShape[i][0] * pixel.shapeDir,
                y + iceDinoShape[i][1]
            );
        }

        pixel.nextMove = pixelTicks + 12;
        return;
    }

    var parts = [pixel];

    for (var i = 0; i < iceDinoShape.length; i++) {
        var partX = x + iceDinoShape[i][0] * pixel.shapeDir;
        var partY = y + iceDinoShape[i][1];

        if (isEmpty(partX, partY, true)) return;

        var part = pixelMap[partX][partY];
        if (part.element !== partNames[i]) return;

        parts.push(part);
    }

    if (pixel.shapeDir !== pixel.dir) {
        orientDino(pixel, partNames, parts);
        return;
    }

    if (canMoveDino(parts, 0, 1)) {
        moveDino(parts, 0, 1);
        return;
    }

    if (pixel.nextMove === undefined || pixelTicks >= pixel.nextMove) {
        if (!moveDino(parts, pixel.dir, 0)) {
            pixel.dir *= -1;
            orientDino(pixel, partNames, parts);
        } else {
            pixel.nextMove = pixelTicks + 12;
        }
    }
}

function registerIceDino(elementName, displayName, colors) {
    var partNames = [];

    for (var i = 0; i < iceDinoShape.length; i++) {
        partNames.push(elementName + "_segment_" + i);
    }

    elements[elementName] = {
        name: displayName,
        color: colors,
        category: "life",
        state: "solid",
        density: 1400,
        properties: {
            dir: 1,
            shapeDir: 1,
            nextMove: 0
        },
        temp: -30,
        tempHigh: 0,
        stateHigh: "fossil_block",
        breakInto: "fossil_block",
        burn: 12,
        burnTime: 240,
        tick: function(pixel) {
            tickDino(pixel, partNames);
        }
    };

    for (var i = 0; i < partNames.length; i++) {
        elements[partNames[i]] = {
            name: displayName + " segment",
            color: colors,
            category: "life",
            hidden: true,
            state: "solid",
            behavior: behaviors.WALL,
            density: 1400,
            temp:-30,
            tempHigh: 0,
            stateHigh: "fossil_block",
            breakInto: "fossil_block"
        };
    }
}

registerIceDino(
    "snow_dinosaur",
    "snow dinosaur",
    ["#f6fbff", "#e5f0f5", "#d2e2e9", "#ffffff"]
);

registerIceDino(
    "ice_dinosaur",
    "ice dinosaur",
    ["#8bd8ed", "#58b6d1", "#398daa", "#c1f0fa"]
);

elements.ice_cave = {
    name: "ice cave",
    color: ["#a1c1e0", "#b3d1ff", "#8cbfff"],
    category: "ice solids",
    state: "solid",
    behavior: behaviors.WALL,
    maxSize: 1,
    cooldown: defaultCooldown,
    onSelect: function() {
        mouseSize = 1;
    },
    onPlace: function(pixel) {
        var pattern = [
            "..111111111..",
            "111111111111111",
            "11444444411111",
            "..777777...11111.",
            "..7.7.77...11111.",
            "...7.7.7...11111.",
            "...........1144411",
            "...........1148411",
            "...........1144411",
            "...........1111111",
            "...........1111111",
            " 11.....11111111",
            "31112221166111",
            ".1111111666611",
            "..111161111611",
            "...11111111111"
        ];

        var blockSize = 5;
        var startX = pixel.x;
        var floorY = pixel.y;

        while (floorY + 1 < height && isEmpty(startX, floorY + 1)) {
            floorY++;
        }

        var startY = floorY - pattern.length * blockSize + 1;

        for (var row = 0; row < pattern.length; row++) {
            for (var column = 0; column < pattern[row].length; column++) {
                var symbol = pattern[row][column];

                if (symbol === "7") {
                    var previousSymbol = row > 0
                        ? pattern[row - 1][column]
                        : "";

                    if (previousSymbol === "4" || previousSymbol === "7") {
                        var icicleX =
                            startX + column * blockSize + Math.floor(blockSize / 2);
                        var icicleY = startY + row * blockSize;

                        if (
                            icicleX >= 0 && icicleX < width &&
                            icicleY >= 0 && icicleY < height &&
                            isEmpty(icicleX, icicleY)
                        ) {
                            createPixel("icicle", icicleX, icicleY);
                        }
                    }

                    continue;
                }

                if (symbol === "8") {
                    var yetiX =
                        startX + column * blockSize + Math.floor(blockSize / 2);
                    var yetiY =
                        startY + row * blockSize + Math.floor(blockSize / 2);

                    if (
                        yetiX >= 0 && yetiX < width &&
                        yetiY >= 0 && yetiY < height &&
                        isEmpty(yetiX, yetiY)
                    ) {
                        createPixel("frozen_yeti", yetiX, yetiY);
                    }

                    continue;
                }

                var verticalOffset = 0;
                var material;

                if (symbol === "2") {
                    verticalOffset = 1;
                    material = "packed_ice_wall";
                } else if (symbol === "3") {
                    verticalOffset = -1;
                    material = "packed_ice_wall";
                } else if (symbol === "1") {
                    material = "packed_ice_wall";
                } else if (symbol === "4") {
                    material = "permafrost_ice";
                } else if (symbol === "6") {
                    material = "fossil_block";
                } else {
                    continue;
                }

                for (var blockX = 0; blockX < blockSize; blockX++) {
                    for (var blockY = 0; blockY < blockSize; blockY++) {
                        var x = startX + column * blockSize + blockX;
                        var y = startY +
                            (row + verticalOffset) * blockSize +
                            blockY;

                        if (x < 0 || x >= width || y < 0 || y >= height) continue;
                        if (x === pixel.x && y === pixel.y) continue;

                        if (isEmpty(x, y)) {
                            createPixel(material, x, y);
                        }
                    }
                }
            }
        }

        deletePixel(pixel.x, pixel.y);
    }
};

elements.tar_pit = {
    name: "tar pit",
    color: ["#141414", "#0a0a0d", "#1f1f1f", "#111111"],
    state: "liquid",
    behavior: behaviors.STICKY,
    category: "ice solids",
    density: 2500,
    viscosity: 100000,
    stink: true,
    reactions: {
        "fire": { elem1: "fire", elem2: "oil", chance: 0.2 },
        "magma": { elem1: "fire", elem2: "oil", chance: 0.8 },
        "torch": { elem1: "fire", elem2: "oil", chance: 1.0 },
        "penguin": { elem1: "tar_pit", elem2: "tar_pit", chance: 1.0 },
        "little_penguin": { elem1: "tar_pit", elem2: "tar_pit", chance: 1.0 },
        "emperor_penguin": { elem1: "tar_pit", elem2: "tar_pit", chance: 1.0 },
        "mammoth": { elem1: "tar_pit", elem2: "tar_pit", chance: 1.0 },
        "yeti": { elem1: "tar_pit", elem2: "tar_pit", chance: 1.0 },
        "inuit_body": { elem1: "tar_pit", elem2: "tar_pit", chance: 1.0 },
        "santa": { elem1: "tar_pit", elem2: "tar_pit", chance: 1.0 },
        "polar_bear": { elem1: "tar_pit", elem2: "tar_pit", chance: 1.0 },
        "arctic_wolf": { elem1: "tar_pit", elem2: "tar_pit", chance: 1.0 },
        "saber_tooth_tiger": { elem1: "tar_pit", elem2: "tar_pit", chance: 1.0 },
        "yeti_body": { elem1: "tar_pit", elem2: "tar_pit", chance: 1.0 },
        "yeti_head": { elem1: "tar_pit", elem2: "tar_pit", chance: 1.0 }
    }
};



elements.ambared_fossil = {
    name: "ambared fossil",
    color: ["#e67e22", "#d35400", "#f39c12", "#e67e22"],
    state: "solid",
    behavior: behaviors.WALL,
    category: "ice solids",
    density: 2600,
    tempHigh: 800,
    stateHigh: "fossil_block"
};

elements.ambared_fossil = {
    name: "ambared fossil",
    color: ["#e67e22", "#d35400", "#f39c12", "#e67e22"],
    state: "solid",
    behavior: behaviors.WALL,
    category: "ice solids",
    density: 2600,
    tempHigh: 800,
    stateHigh: "fossil_block"
};

elements.mod_amber = {
    name: "amber",
    color: ["#f1c40f", "#f39c12", "#e67e22"],
    state: "solid",
    behavior: behaviors.STICKY,
    category: "ice solids",
    density: 1200,
    temp: -80,
    reactions: {
        "fire": { elem1: "fire", elem2: "fire", chance: 0.5 },
        "magma": { elem1: "smoke", elem2: "magma", chance: 0.8 },
        "penguin": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "little_penguin": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "emperor_penguin": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "mammoth": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "mammoth_body": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "mammoth_front_leg": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "mammoth_back_leg": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "yeti": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "yeti_body": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "yeti_head": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "inuit_body": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "santa": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "polar_bear": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "arctic_wolf": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "saber_tooth_tiger": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "saber_tooth_tiger_body": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "saber_tooth_tiger_front_leg": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "saber_tooth_tiger_tusk": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "seal": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "seal_pup": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "greenland_shark": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "killer_whale": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "narwhal": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "beluga_whale": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "walrus": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "arctic_fox": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "arctic_hare": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "arctic_owl": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "lemming": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "reindeer": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "flying_reindeer": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 },
        "gingerbread_man": { elem1: "ambared_fossil", elem2: "ambared_fossil", chance: 1.0 }
    }
};

elements.mod_extinction_meteor = {
    name: "extinction meteor",
    color: ["#ff1a00", "#ff6600", "#990000", "#ffcc00", "#330000"],
    state: "solid",
    category: "weapons",
    density: 6000,
    maxSize: 1,
    temp: Infinity,
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            tryMove(pixel, pixel.x, pixel.y+1);
        } else {
            var radius = 45;
            var startX = Math.max(0, pixel.x - radius);
            var endX = Math.min(width - 1, pixel.x + radius);
            var startY = Math.max(0, pixel.y - radius);
            var endY = Math.min(height - 1, pixel.y + radius);

            for (var x = startX; x <= endX; x++) {
                for (var y = startY; y <= endY; y++) {
                    var dist = Math.sqrt(Math.pow(x - pixel.x, 2) + Math.pow(y - pixel.y, 2));
                    if (dist <= radius) {
                        if (!isEmpty(x, y, true)) {
                            var target = pixelMap[x][y];
                            if (target.element === "extinction_meteor") continue;

                            if (elements[target.element] && elements[target.element].category === "life") {
                                if (Math.random() < 0.65) {
                                    target.element = "fossil_block";
                                } else {
                                    target.element = "bone";
                                }
                                target.color = pixelColorPick(target);
                                target.temp = 1200;
                            } else if (target.element === "water" || target.element === "salt_water" || target.element === "dirty_water" || target.element === "thermal_waters") {
                                changePixel(target, "steam");
                            } else if (target.element === "ice" || target.element === "packed_ice_wall" || target.element === "permafrost_ice" || target.element === "permafrost_snow") {
                                changePixel(target, "water");
                            } else if (Math.random() < 0.6) {
                                deletePixel(x, y);
                            }
                        }
                    }
                }
            }
            deletePixel(pixel.x, pixel.y);
        }
    }
};

elements.mod_volcanic_rock = {
    name: "volcanic rock",
    color: ["#2e2524", "#241d1c", "#3b302f", "#171414"],
    state: "solid",
    behavior: behaviors.WALL,
    category: "ice solids",
    density: 3200,
    hardness: 0.9,
    conduct: 0.01
};

elements.thermal_vent = {
    name: "thermal vent",
    color: ["#2c2523", "#3a302c", "#1f1a18", "#423835"],
    category: "ice solids",
    state: "solid",
    density: 4500,
    maxSize: 1,
    cooldown: 40,
    onPlace: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;
        while (y < 1000 && isEmpty(x, y+1)) {
            y++;
        }
        
        for (var h = 0; h <= 18; h++) {
            var thick = (h < 5) ? 3 : (h < 12) ? 2 : 1;
            
            for (var t = 1; t <= thick; t++) {
                if (isEmpty(x - 1 - t, y - h)) {
                    createPixel("mod_volcanic_rock", x - 1 - t, y - h);
                    if (!isEmpty(x - 1 - t, y - h, true)) {
                        pixelMap[x - 1 - t][y - h].temp = 1800;
                    }
                }
                if (isEmpty(x + 1 + t, y - h)) {
                    createPixel("mod_volcanic_rock", x + 1 + t, y - h);
                    if (!isEmpty(x + 1 + t, y - h, true)) {
                        pixelMap[x + 1 + t][y - h].temp = 1800;
                    }
                }
            }
            
            if (h < 18) {
                if (isEmpty(x - 1, y - h)) createPixel("magma", x - 1, y - h);
                if (isEmpty(x, y - h)) createPixel("magma", x, y - h);
                if (isEmpty(x + 1, y - h)) createPixel("magma", x + 1, y - h);
                
                if (!isEmpty(x - 1, y - h, true)) pixelMap[x - 1][y - h].temp = Infinity;
                if (!isEmpty(x, y - h, true)) pixelMap[x][y - h].temp = Infinity;
                if (!isEmpty(x + 1, y - h, true)) pixelMap[x + 1][y - h].temp = Infinity;
            }
            
            if (h === 18) {
                if (isEmpty(x, y - h - 1)) createPixel("smoke", x, y - h - 1);
                if (isEmpty(x - 1, y - h - 1)) createPixel("smoke", x - 1, y - h - 1);
                if (isEmpty(x + 1, y - h - 1)) createPixel("smoke", x + 1, y - h - 1);
                if (Math.random() < 0.4 && isEmpty(x, y - h - 2)) createPixel("sulfur", x, y - h - 2);
            }
        }
        deletePixel(pixel.x, pixel.y);
    }
};


elements.mod_monkey_jacuzzi = {
    name: "monkey jacuzzi",
    color: ["#4da6ff", "#5c554e", "#ffffff", "#8b5a2b"],
    category: "ice solids",
    state: "solid",
    density: 3000,
    maxSize: 1,
    cooldown: 30,
    onPlace: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;
        while (y < 1000 && isEmpty(x, y+1)) {
            y++;
        }

        for (var h = -6; h <= 3; h++) {
            for (var i = -12; i <= 12; i++) {
                var tx = x + i;
                var ty = y + h;
                if (tx < 0 || tx >= width || ty < 0 || ty >= height) continue;

                var isLeftSnow = (i >= -12 && i <= -9 && h >= -4 && h <= 0);
                var isRightSnow = (i >= 9 && i <= 12 && h >= -4 && h <= 0);
                var isStoneBase = (h >= 1 && h <= 3 && i >= -8 && i <= 8);
                var isStoneWalls = (h >= -4 && h <= 0 && (i === -8 || i === 8));
                var isWaterPool = (h >= -4 && h <= 0 && i >= -7 && i <= 7);

                if (isLeftSnow || isRightSnow) {
                    if (isEmpty(tx, ty)) createPixel("permafrost_snow", tx, ty);
                } else if (isStoneBase || isStoneWalls) {
                    createPixel("mod_volcanic_rock", tx, ty);
                } else if (isWaterPool) {
                    createPixel("thermal_water", tx, ty);
                }
            }
        }

        var skyY = y - 30;
        if (skyY < 0) skyY = 2;
        var spots = [-5, -3, 0, 3, 5];
        for (var m = 0; m < spots.length; m++) {
            var mx = x + spots[m];
            if (mx >= 0 && mx < width && isEmpty(mx, skyY)) {
                createPixel("arctic_monkey", mx, skyY);
                if (!isEmpty(mx, skyY, true)) {
                    pixelMap[mx][skyY].temp = 25;
                }
            }
        }

        deletePixel(pixel.x, pixel.y);
    }
};

var iceDragonOffsets = [
    [-3, -1], [-2, -1], [-1, 0],
    [0, -2], [-1, -1], [0, 1],
    [1, -4], [1, -3], [1, -2], [1, -1], [1, 0], [1, 1],
    [2, 5], [2, 4], [2, 3], [2, 2], [2, 1],
    [3, 4], [3, 3], [3, 2], 
    [4, 3], [4, 2],
    [5, 2], [6, 2], [7, 2], [5, 3], 
];

function getIceDragonParts(pixel) {
    var parts = [pixel];

    for (var i = 0; i < iceDragonOffsets.length; i++) {
        var partX = pixel.x + iceDragonOffsets[i][0] * pixel.dir;
        var partY = pixel.y + iceDragonOffsets[i][1];

        if (
            partX < 0 || partX >= width ||
            partY < 0 || partY >= height ||
            isEmpty(partX, partY, true)
        ) return null;

        var part = pixelMap[partX][partY];
        if (part.element !== "mod_ice_dragon_segment_" + i) return null;

        parts.push(part);
    }

    return parts;
}

function canMoveIceDragon(parts, dx, dy) {
    for (var i = 0; i < parts.length; i++) {
        var targetX = parts[i].x + dx;
        var targetY = parts[i].y + dy;

        if (
            targetX < 0 || targetX >= width ||
            targetY < 0 || targetY >= height
        ) return false;

        if (!isEmpty(targetX, targetY, true)) {
            if (parts.indexOf(pixelMap[targetX][targetY]) === -1) {
                return false;
            }
        }
    }

    return true;
}

function moveIceDragon(parts, dx, dy) {
    if (!canMoveIceDragon(parts, dx, dy)) return false;

    var orderedParts = parts.slice().sort(function(a, b) {
        if (dx > 0) return b.x - a.x;
        if (dx < 0) return a.x - b.x;
        if (dy > 0) return b.y - a.y;
        return a.y - b.y;
    });

    for (var i = 0; i < orderedParts.length; i++) {
        var part = orderedParts[i];
        movePixel(part, part.x + dx, part.y + dy);
    }

    return true;
}

function turnIceDragon(pixel, parts) {
    var newDirection = -pixel.dir;

    for (var i = 0; i < iceDragonOffsets.length; i++) {
        var targetX = pixel.x + iceDragonOffsets[0][0] * newDirection;
        var targetY = pixel.y + iceDragonOffsets[i][1];

        if (
            targetX < 0 || targetX >= width ||
            targetY < 0 || targetY >= height
        ) return false;

        if (!isEmpty(targetX, targetY, true)) {
            if (parts.indexOf(pixelMap[targetX][targetY]) === -1) {
                return false;
            }
        }
    }

    for (var i = 1; i < parts.length; i++) {
        deletePixel(parts[i].x, parts[i].y);
    }

    pixel.dir = newDirection;

    for (var i = 0; i < iceDragonOffsets.length; i++) {
        createPixel(
            "mod_ice_dragon_segment_" + i,
            pixel.x + iceDragonOffsets[i][0] * pixel.dir,
            pixel.y + iceDragonOffsets[i][1]
        );
    }

    return true;
}

elements.mod_ice_dragon = {
    name: "ice dragon",
    color: ["#86dceb", "#a1c1e0", "#b3d1ff", "#c1f0fa"],
    category: "life",
    state: "solid",
    density: 1400,
    properties: {
        dir: 1,
        flightPhase: 0
    },
    temp: -30,
    tempHigh: 0,
    stateHigh: "fossil_block",
    breakInto: "fossil_block",
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);

        pixel.dir = pixel.dir || 1;

        var allPartsEmpty = true;

        for (var i = 0; i < iceDragonOffsets.length; i++) {
            var partX = pixel.x + iceDragonOffsets[i][0] * pixel.dir;
            var partY = pixel.y + iceDragonOffsets[i][1];

            if (
                partX < 0 || partX >= width ||
                partY < 0 || partY >= height
            ) return;

            if (!isEmpty(partX, partY)) {
                allPartsEmpty = false;
                break;
            }
        }

        if (allPartsEmpty) {
            for (var i = 0; i < iceDragonOffsets.length; i++) {
                createPixel(
                    "mod_ice_dragon_segment_" + i,
                    pixel.x + iceDragonOffsets[i][0] * pixel.dir,
                    pixel.y + iceDragonOffsets[i][1]
                );
            }

            pixel.nextMove = pixelTicks + 4;
            return;
        }

        var parts = getIceDragonParts(pixel);
        if (!parts) return;
        if (pixelTicks < pixel.nextMove) return;

        var flightSteps = [0, -1, 0, 1];
        var verticalStep = flightSteps[pixel.flightPhase % flightSteps.length];

        if (!moveIceDragon(parts, pixel.dir, verticalStep)) {
            if (!moveIceDragon(parts, pixel.dir, -1)) {
                if (!turnIceDragon(pixel, parts)) {
                    pixel.nextMove = pixelTicks + 4;
                    return;
                }
            }
        }

        pixel.flightPhase++;
        pixel.nextMove = pixelTicks + 4;
    }
};



for (var i = 0; i < iceDragonOffsets.length; i++) {
    elements["mod_ice_dragon_segment_" + i] = {
        name: "ice dragon segment",
        color: ["#86dceb", "#a1c1e0", "#b3d1ff", "#c1f0fa"],
        category: "life",
        hidden: true,
        state: "solid",
        behavior: behaviors.WALL,
        density: 1400,
        temp: -70,
        tempHigh: 0,
        stateHigh: "fossil_block",
        breakInto: "fossil_block"
    };
}

 
    elements.ice_man = {
     color: ["#a7d5e1","#65afff","#63b0e3","#c2e2ea","#dceef3"],
    category: "life",
    properties: {
        dead: false,
        dir: 1,
        panic: 0,
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            createPixel("mod_ice_man_body", pixel.x, pixel.y+1);
            pixel.element = "mod_ice_man_head";
        }
        else if (isEmpty(pixel.x, pixel.y-1)) {
            createPixel("mod_ice_man_head", pixel.x, pixel.y-1);
            pixelMap[pixel.x][pixel.y-1].color = pixel.color;
            pixel.element = "mod_ice_man_body";
            pixel.color = pixelColorPick(pixel)
        }
        else {
            deletePixel(pixel.x, pixel.y);
        }
    },
};



elements.mod_ice_man_body = {
    color: ["#a7d5e1","#65afff","#63b0e3","#c2e2ea","#dceef3"],
    category: "life",
    hidden: true,
    density: 1500,
    state: "solid",
    conduct: 25,
    temp:-70,
    tempHigh: 50,
    stateHigh: "water",
    burn: 10,
    burnTime: 250,
    burnInto: "water",
    reactions: {
        "cancer": { "elem1":"cancer", "chance":0.005 },
        "radiation": { "elem1":["ash","water","steam","thermal_water"], "chance":0.4 },
    },
    properties: {
        dead: false,
        dir: 1,
        panic: 0,
    },
    tick: function(pixel) {
        if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
            if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
                var headpixel = pixelMap[pixel.x][pixel.y-2];
                if (headpixel.element == "mod_ice_man_head") {
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

            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "packed_ice_wall";
                pixel.color = pixelColorPick(pixel);
            }
            return
        }


        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "mod_ice_man_head") {
            var head = pixelMap[pixel.x][pixel.y-1];
            if (head.dead) { 
                pixel.dead = head.dead;
            }
        }
        else { var head = null }

        if (isEmpty(pixel.x, pixel.y-1)) {

            if (Math.random() < 0.1) {
                createPixel("water", pixel.x, pixel.y-1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
        else if (head == null) { return }
        else if (Math.random() < 0.1) { 
            var movesToTry = [
                [1*pixel.dir,0],
                [1*pixel.dir,-1],
            ];
          
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
                    if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1])) {
                        movePixel(head, head.x+move[0], head.y+move[1]);
                        break;
                    }
                }
            }

            if (Math.random() < 0.15) {
                pixel.dir *= -1;
            }
        }

    },
};

elements.mod_ice_man_head = {
    color: ["#a7d5e1","#65afff","#63b0e3","#c2e2ea","#dceef3"],
    category: "life",
    hidden: true,
    density: 1080,
    state: "solid",
    conduct: 25,
    temp:-70,
    tempHigh: 50,
    stateHigh: "water",
    tempLow: -70,
    stateLow: "packed_ice_wall",
    burn: 10,
    burnTime: 250,
    burnInto: "water",
    reactions: {
        "cancer": { "elem1":"cancer", "chance":0.005 },
        "radiation": { "elem1":["ash","water","steam","thermal_water"], "chance":0.4 },
    },
    properties: {
        dead: false
    },
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "packed_ice_wall";
                pixel.color = pixelColorPick(pixel);
                return
            }
        }


        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "mod_ice_man_body") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) { 
                pixel.dead = body.dead;
            }
        }
        else { var body = null }

        if (isEmpty(pixel.x, pixel.y+1)) {
            tryMove(pixel, pixel.x, pixel.y+1);
            if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1) {
                createPixel("water", pixel.x, pixel.y+1);

                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
    }
};

elements.mod_moose = {
    name: "moose",
    color: ["#7a5230", "#633d1c", "#523315", "#8c5e38", "#a66f46"],
    category: "life",
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "BO:saber_tooth_tiger,arctic_wolf,polar_bear%50|FX%1|M1%80 AND BO:saber_tooth_tiger,arctic_wolf,polar_bear%40",
        "M2%50|M1%80|M1%80"
    ],
    reactions: {
        "plant": { elem2: null, chance: 0.2 },
        "grass": { elem2: null, chance: 0.2 },
        "mod_tundra_grass": { elem2: null, chance: 0.5 },
        "watermelon": { elem2: null, chance: 0.2 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },

    foodNeed: 8,
    temp: 34,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -140,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 220,
    density: 1200,
    conduct: 0.22
};

    elements.mod_muskox = {
    name: "muskox",
       color: ["#302316", "#2b231b", "#291d12"
 ],

    category: "life",
    state: "solid",
    density: 1800,
    properties: {
        dir: 1
    },
    reactions: {
        "plant": { elem2: null, chance: 0.15 },
        "grass": { elem2: null, chance: 0.15 },
        "mod_tundra_grass": { elem2: null, chance: 0.15 },
        "leaves": { elem2: null, chance: 0.1 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 }
    },
    foodNeed: 20,
    temp: 35,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 300,
    tick: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;

        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);

        if (isEmpty(x + 1, y) && isEmpty(x, y + 1) && isEmpty(x + 1, y + 1)) {
            createPixel("mod_muskox_body", x + 1, y);
            createPixel("mod_muskox_back_leg", x, y + 1);
            createPixel("mod_muskox_front_leg", x + 1, y + 1);
        }

        if (
            isEmpty(x + 1, y) || isEmpty(x, y + 1) || isEmpty(x + 1, y + 1) ||
            pixelMap[x + 1][y].element !== "mod_muskox_body" ||
            pixelMap[x][y + 1].element !== "mod_muskox_back_leg" ||
            pixelMap[x + 1][y + 1].element !== "mod_muskox_front_leg"
        ) {
            return;
        }

        var body = pixelMap[x + 1][y];
        var backLeg = pixelMap[x][y + 1];
        var frontLeg = pixelMap[x + 1][y + 1];

        if (isEmpty(x, y + 2) && isEmpty(x + 1, y + 2)) {
            movePixel(backLeg, x, y + 2);
            movePixel(frontLeg, x + 1, y + 2);
            movePixel(pixel, x, y + 1);
            movePixel(body, x + 1, y + 1);
            return;
        }

        if (Math.random() < 0.1) {
            if (pixel.dir > 0 && x + 2 < width &&
                isEmpty(x + 2, y) && isEmpty(x + 2, y + 1)) {
                movePixel(body, x + 2, y);
                movePixel(frontLeg, x + 2, y + 1);
                movePixel(pixel, x + 1, y);
                movePixel(backLeg, x + 1, y + 1);
            } else if (pixel.dir < 0 && x > 0 &&
                isEmpty(x - 1, y) && isEmpty(x - 1, y + 1)) {
                movePixel(pixel, x - 1, y);
                movePixel(backLeg, x - 1, y + 1);
                movePixel(body, x, y);
                movePixel(frontLeg, x, y + 1);
            } else {
                pixel.dir *= -1;
            }
        }
    }
};

elements.mod_muskox_body = {
    name: "muskox body",
        color: ["#F5E6C8", "#F3E5AB", "#FFF1D0"
 ],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "bone"
};

elements.mod_muskox_back_leg = {
    name: "muskox back leg",
    color: ["#302316", "#2b231b", "#291d12"
 ],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};

elements.mod_muskox_front_leg = {
    name: "muxkox front leg",
    color: ["#302316", "#2b231b", "#291d12"
 ],
    category: "life",
    hidden: true,
    state: "solid",
    behavior: behaviors.WALL,
    density: 1800,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};
    elements.mod_tundra_grass = {
    name: "tundra grass",
    color: ["#4d5744", "#52594c", "#45523c"],
    category: "ice solids",
    state: "solid",
    temp: -1,
    highTemp: 30,
    stateHigh: "grass",
    templow: -200,
    stateLow: "permafrost_snow",
    behavior: behaviors.GRASS,
    reactions: {
        "fire": { elem1: "smoke", elem2: "fire", chance: 0.5 },
        "magma": { elem1: "smoke", elem2: "magma", chance: 0.8 }
    },
    density: 1200,
    burn: 15,
    burnTime: 100,
    burnInto: "ash"
};

    elements.mod_snowflakes = {
    name: "snowflakes",
    color: ["#FFFFFF", "#F0F0F0", "#E0E0E0"],
    category: "ice solids",
    state: "solid",
    temp: -10,
    highTemp: 10,
    stateHigh: "water",
    behavior: behaviors.POWDER,
    density: 100,
};


elements.mod_capybara = {
    name: "capybara",
    color: ["#543718","#8b5a2b", "#a0522d", "#6e473b", "#5c4033","#723911"],
    state: "solid",
    behavior: [
        "XX|SW:water,salt_water,sugar_water,dirty_water%10|XX",
        "BO:polar_bear,polar_bear_cub,killer_whale%50|FX%1|M1 AND SW:water,salt_water,sugar_water,dirty_water%15 AND BO:polar_bear,polar_bear_cub,killer_whale%40",
        "M2|M1|M1 AND SW:water,salt_water,sugar_water,dirty_water%15"
    ],
    reactions: {
        "meat": { elem2:null, chance:0.2 },
        "cooked_meat": { elem2:null, chance:0.2 },
        "fish": { elem2:null, chance:0.2 },
        "plant": { elem2:null, chance:0.2 },
    "grass": { elem2:null, chance:0.2 },
    "tundra_grass": { elem2:null, chance:0.2 },
    "watermelon": { elem2:null, chance:0.2 },
    "algae": { elem2:null, chance:0.2 },
        "frozen_fish": { elem2:null, chance:0.3 },
        "herring": { elem2:null, chance:0.3 },
        "oxygen": { elem2:"carbon_dioxide", chance:0.3 },
        "poison": { elem1:"rotten_meat", chance:0.1 },
        "bleach": { elem1:"rotten_meat", chance:0.1 },
        "infection": { elem1:"rotten_meat", chance:0.025 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cyanide": { elem1:"rotten_meat", chance:0.1 },
        "chlorine": { elem1:"meat", chance:0.1 },
        "alcohol": { elem1:"meat", chance:0.025 },
        "dirty_water": { elem1:"rotten_meat", chance:0.0001 },
        "pool_water": { elem1:"rotten_meat", chance:0.005 },
        "vinegar": { elem1:"rotten_meat", chance:0.001 }

    },
    foodNeed: 10,
    temp: 30,
    tempHigh: 100,
    stateHigh: "cooked_meat",
    tempLow: -210,
    stateLow: "frozen_meat",
    category:"life",
  hidden: true,
    breakInto: "rotten_meat",
    burn:15,
    burnTime:300,
    density: 1450,
    conduct: 0.2
}; 

 elements.mod_pseudotherium_argentinus = {
    name: "pseudotherium argentinus",
    color: ["#7a5230", "#633d1c", "#523315", "#8c5e38", "#a66f46"],
    category: "life",
    state: "solid",
    behavior: [
     "XX|SW:water,salt_water,sugar_water,dirty_water%10|XX",
        "BO:polar_bear,polar_bear_cub,killer_whale%50|FX%1|M1 AND SW:water,salt_water,sugar_water,dirty_water%15 AND BO:polar_bear,polar_bear_cub,killer_whale%40",
        "M2|M1|M1 AND SW:water,salt_water,sugar_water,dirty_water%15"
    ],
    reactions: {
        "plant": { elem2: null, chance: 0.2 },
        "grass": { elem2: null, chance: 0.2 },
        "mod_tundra_grass": { elem2: null, chance: 0.5 },
        "mod_prehistoric_nut": { elem2: null, chance: 0.15 },
        "watermelon": { elem2: null, chance: 0.2 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },

    foodNeed: 8,
    temp: 34,
    tempHigh: 1000,
    stateHigh: "cooked_meat",
    tempLow: -200,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 220,
    density: 1200,
    conduct: 0.22
};
elements.mod_prehistoric_nut = {
    name: "prehistoric nut",
    color: ["#8B4513", "#A0522D", "#D2691E", "#CD853F", "#F4A460"],
    category: "ice solids",
    state: "solid",
    density: 1200,
    reactions: {

"magma": { elem1: "smoke", elem2: "magma", chance: 0.8 }

    },
    temp: 20,
    burn: 5,
    burnTime: 100,
    highTemp: Infinity,
    stateHigh: "ash",
    lowTemp: -379,
    stateLow: "fossil_block",
    breakInto: "fossil_block",
};

elements.powdered_snow = {
    name: "permafrost powdered snow",
    color: ["#FFFFFF", "#F0F0F0", "#E0E0E0"],
    behavior: behaviors.POWDER,

reactions: {
        "magma": { elem1: "smoke", elem2: "magma", chance: 0.8 },
        "fire": { elem1: "smoke", elem2: "fire", chance: 0.5 },
        "human": { elem1: "mod_ice_man", chance: 0.1 }
    },
    category: "ice solids",
    state: "solid",
    density: 100,
    temp: -10,
    breakInto: "mod_snowflakes"
};
