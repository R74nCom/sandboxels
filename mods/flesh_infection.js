// by Nekonico

eLists.FESTER = ["fleshy_dirt","dirt","rock","rock_wall","basalt","limestone","steel","iron","glass_shard","dead_bug","mud","sand","wet_sand","clay_soil","clay","mycelium","skin","meat","rotten_meat","wood","ant_wall","dead_plant","plant","hair","bone","cancer","straw","cloth","brick","bamboo","sponge","paper","plastic","concrete"],

elements.fleshy_dirt = {
    color: ["#81512F","#895933","#825231","#906159"],
    behavior: [
        "CH:dirt,mud>fleshy_dirt%1|CH:grass>flesh_mound%0.5 AND CH:root>vein_root%0.5 AND CH:fiber>fibrous_flesh%0.5|CH:dirt,mud>fleshy_dirt%1",
        "XX|XX|XX",
        "M2 AND CH:dirt,mud>fleshy_dirt%1|M1 AND CH:dirt,mud>fleshy_dirt%0.5|M2 AND CH:dirt,mud>fleshy_dirt%1",
    ],
    category: "flesh",
    state: "solid",
    density: 2000,
    tempHigh: 225,
    stateHigh: "dirt",
    tempLow: -50,
    stateLow: "permafrost",
    burn: 20,
    burnTime: 40,
    burnInto: "dirt",
};

elements.teeth = {
	color: "#d9d9d9",
	behavior: [
        "XX|SM%0.75|XX",
        "ST:flesh_mound|XX|ST:flesh_mound",
        "XX|ST:flesh_mound AND M1|XX",
    ],
	reactions: {
		"acid": { elem1: "quicklime", elem2: null },
        "head": { elem2:["flesh_mound",null,null,null], chance:0.01 },
        "body": { elem2:["flesh_mound",null,null,null], chance:0.01 },
        "frog": { elem2:["flesh_mound",null,null,null], chance:0.05 },
        "tadpole": { elem2:["flesh_mound",null,null,null], chance:0.05 },
        "fish": { elem2:["flesh_mound",null,null,null], chance:0.05 },
        "rat": { elem2:["flesh_mound",null,null,null], chance:0.05 },
        "bird": { elem2:["flesh_mound",null,null,null], chance:0.05 },
        "worm": { elem2:["flesh_mound",null], chance:0.1 },
        "fly": { elem2:["flesh_mound",null], chance:0.1 },
        "ant": { elem2:["flesh_mound",null], chance:0.1 },
        "frog": { elem2:["flesh_mound",null], chance:0.05 },
        "snail": { elem2:["flesh_mound","quicklime"] },
        "slug": { elem2:["flesh_mound",null], chance:0.1 },
        "meat": { elem2:["flesh_mound",null,null,null], chance:0.1 },
        "blood": { elem2:null, chance:0.05 },
        "infection": { elem2:null, chance:0.04 },
        "bone": { elem2:null, chance:0.1 },
        "cooked_meat": { elem2:null, chance:0.1 },
        "rotten_meat": { elem2:null, chance:0.1 },
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
        "beans": { elem2:null, chance:0.2 },
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
	category:"flesh",
	tempHigh: 1000, 
	stateHigh: ["steam","salt","meat","quicklime"],
	state: "solid",
	density: 2000,
	hardness: 0.5,
	breakInto: ["flesh_mound","quicklime"],
    hidden: true,
    excludeRandom: true,
},

elements.flesh_mound = {
    color: ["#9e4839","#ba6449","#d2856c","#a14940","#E94336"],
    behavior: [
        "XX|CR:acidic_bile%0.005 AND CH:grass>flesh_mound%0.5 AND CR:fleshwood_sapling%0.0001|XX",
        "CR:acidic_bile%0.005 AND CH:grass>flesh_mound%0.5|XX|CR:acidic_bile%0.005 AND CH:grass>flesh_mound%0.5",
        "XX|CR:acidic_bile%0.005 AND CH:grass>flesh_mound%0.5 AND CH:dirt>fleshy_dirt%0.5|XX",
    ],
    tick: function(pixel) {
        if (pixel.start === pixelTicks && pixel.fruit === undefined && !pixel.stop) {
            if (Math.random() < 0.95) {
                pixel.fruit = Math.random() < 0.75 ? "flesh_beast" : "teeth";
            }
            else { pixel.fruit = "acidic_bile" }
        }
        if (!isEmpty(pixel.x-1,pixel.y,true)) {
            if (pixelMap[pixel.x-1][pixel.y].fruit === undefined && pixelMap[pixel.x-1][pixel.y].element === "flesh_mound") {
                pixelMap[pixel.x-1][pixel.y].fruit = pixel.fruit;
            }
        }
        if (!isEmpty(pixel.x+1,pixel.y,true)) {
            if (pixelMap[pixel.x+1][pixel.y].fruit === undefined && pixelMap[pixel.x+1][pixel.y].element === "flesh_mound") {
                pixelMap[pixel.x+1][pixel.y].fruit = pixel.fruit;
            }
        }
        if (!isEmpty(pixel.x,pixel.y+1,true)) {
            if (pixelMap[pixel.x][pixel.y+1].fruit === undefined && pixelMap[pixel.x][pixel.y+1].element === "flesh_mound") {
                pixelMap[pixel.x][pixel.y+1].fruit = pixel.fruit;
            }
        }
        if (!isEmpty(pixel.x,pixel.y-1,true)) {
            if (pixelMap[pixel.x][pixel.y-1].fruit === undefined && pixelMap[pixel.x][pixel.y-1].element === "flesh_mound") {
                pixelMap[pixel.x][pixel.y-1].fruit = pixel.fruit;
            }
        }
        if (isEmpty(pixel.x,pixel.y-1)) {
            pixel.sp = 0; //not supported
        }
        else if (!outOfBounds(pixel.x,pixel.y-1) && pixelMap[pixel.x][pixel.y-1].element === "flesh_mound" && pixelMap[pixel.x][pixel.y-1].sp === 0) {
            pixel.sp = 0;
        }
        else { pixel.sp = 1 } //supported
        if (pixel.stop) {
            if (pixel.sp === 0) { tryMove(pixel, pixel.x, pixel.y+1); }
            return;
        }
        if (pixel.sp === 0) { tryMove(pixel, pixel.x, pixel.y+1); }
        else {
            if (pixel.fert && pixel.stage && Math.random() < 0.01 && isEmpty(pixel.x,pixel.y+1)) {
                clonePixel(pixel,pixel.x,pixel.y+1);
                pixelMap[pixel.x][pixel.y+1].fert = true;
                pixelMap[pixel.x][pixel.y+1].stage = pixel.stage-1;
            }
        }
        if (pixel.fert===undefined) { // able to grow down
            pixel.fert = Math.random() < 0.50;
        }
        if (pixel.stage===undefined) {
            pixel.stage = Math.floor(Math.random()*20)+10;
        }
        if (Math.random() < 0.03 && isEmpty(pixel.x-1,pixel.y) && !isEmpty(pixel.x-1,pixel.y-1) && (outOfBounds(pixel.x-1,pixel.y-1) || pixelMap[pixel.x-1][pixel.y-1].element !== "flesh_mound")) {
            createPixel("flesh_mound",pixel.x-1,pixel.y);
            pixelMap[pixel.x-1][pixel.y].fruit = pixel.fruit;
        }
        if (Math.random() < 0.03 && isEmpty(pixel.x+1,pixel.y) && !isEmpty(pixel.x+1,pixel.y-1) && (outOfBounds(pixel.x+1,pixel.y-1) || pixelMap[pixel.x+1][pixel.y-1].element !== "flesh_mound")) {
            createPixel("flesh_mound",pixel.x+1,pixel.y);
            pixelMap[pixel.x+1][pixel.y].fruit = pixel.fruit;
        }
        if (Math.random() < 0.03 && isEmpty(pixel.x,pixel.y-1) && (
            (!isEmpty(pixel.x-1,pixel.y-1) && (outOfBounds(pixel.x-1,pixel.y-1) || pixelMap[pixel.x-1][pixel.y-1].element !== "flesh_mound")) ||
            (!isEmpty(pixel.x+1,pixel.y-1) && (outOfBounds(pixel.x+1,pixel.y-1) || pixelMap[pixel.x+1][pixel.y-1].element !== "flesh_mound")))
        ) {
            createPixel("flesh_mound",pixel.x,pixel.y-1);
            pixelMap[pixel.x][pixel.y-1].fruit = pixel.fruit;
        }
        if (pixel.fruit && Math.random() < 0.0001) {
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coords = adjacentCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (isEmpty(x,y)) {
                    createPixel(pixel.fruit,x,y)
                    break;
                }
            }
        }
        if (pixel.h < 2 && Math.random() < 0.0005 && isEmpty(pixel.x,pixel.y-1)) {
            createPixel(pixel.element,pixel.x,pixel.y-1);
            pixelMap[pixel.x][pixel.y-1].h = pixel.h+1;
        }
        var coords = [
            [pixel.x+1,pixel.y],
            [pixel.x-1,pixel.y],
            [pixel.x+1,pixel.y+1],
            [pixel.x-1,pixel.y+1],
        ];
        for (var i = 0; i < coords.length; i++) {
            if (Math.random() < 0.005 && isEmpty(coords[i][0],coords[i][1])) {
                if (!isEmpty(coords[i][0],coords[i][1]+1,true)) {
                    var soil = pixelMap[coords[i][0]][coords[i][1]+1];
                    if (eLists.FESTER.indexOf(soil.element) !== -1) {
                        createPixel(pixel.element,coords[i][0],coords[i][1]);
                    }
                }
            }
        }
        if (Math.random() < 0.0002 && pixel.age > 500 && pixel.temp < 90 && pixel.rooting === false) {
            pixel.rooting = true;
        }
        if (Math.random() < 0.002 && pixel.age > 500 && pixel.temp < 90 && pixel.rooting === true) {
            if (!outOfBounds(pixel.x,pixel.y+1)) {
                var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                if (dirtPixel && (eLists.FESTER.indexOf(dirtPixel.element) !== -1 || dirtPixel.element === "grass")) {
                    changePixel(dirtPixel,"vein_root");
                }
            }
        }
        pixel.age++;
        doDefaults(pixel);
    },
    ignore: ["teeth","flesh_mound","flesh_beast"],
    renderer: renderPresets.PLANTCHAR,
    properties: {
        "h": 0,
        "age": 0,
        "rooting": false,
        "fruit": undefined,
    },
    reactions: {
        "cell": { elem2:"flesh_mound", chance:0.005 },
        "skin": { elem2:"flesh_mound", chance:0.005 },
        "sugar_water": { elem2:"flesh_mound", chance:0.05 },
        "acidic_bile": { elem2:null, chance:0.005 },
        "plant": { elem2:["dead_plant","solid_flesh"], chance:0.005 },
        "dead_plant": { elem2:"flesh_mound", chance:0.005 },
        "sapling": { elem2:"fleshwood_sapling", chance:0.005 },
        "wood": { elem2:"dry_fleshwood", chance:0.005 },
        "tree_branch": { elem2:"fleshwood", chance:0.005 },
        "head": { elem2:"flesh_mound", chance:0.001},
        "body": { elem2:"flesh_mound", chance:0.001 },
        "frog": { elem2:"flesh_mound", chance:0.005 },
        "tadpole": { elem2:"flesh_mound", chance:0.005 },
        "fish": { elem2:"flesh_mound", chance:0.005 },
        "rat": { elem2:"flesh_mound", chance:0.005 },
        "bird": { elem2:"flesh_mound", chance:0.005 },
    },
    tempHigh: 100,
    stateHigh: "meat",
    tempLow: -2,
    stateLow: "frozen_meat",
    burn:3,
    burnTime:20,
    breakInto: "meat",
    category:"flesh",
    state: "solid",
    density: 1400,
}

elements.vein_root = {
    color: ["#c72114","#8d3728","#a95338","#c72114","#d83225","#c1745b","#903830", "#c72114",],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "CH:fleshy_dirt,dirt,mud,sand,wet_sand,clay_soil,clay,mycelium,grass,color_sand,skin,meat,rotten_meat,concrete,dead_plant,dead_bug,root>vein_root,fibrous_flesh%0.5 AND CR:vein_root%0.005|CH:fleshy_dirt,dirt,mud,sand,wet_sand,clay_soil,clay,mycelium,grass,color_sand,skin,meat,rotten_meat,concrete,dead_plant,dead_bug,root>vein_root,fibrous_flesh,fibrous_flesh%0.5|CH:fleshy_dirt,dirt,mud,sand,wet_sand,clay_soil,clay,mycelium,grass,color_sand,skin,meat,rotten_meat,concrete,dead_plant,dead_bug,root>vein_root,fibrous_flesh%0.5 AND CR:vein_root%0.005",
    ],
    reactions: {
        "rock": { elem2:"sand", chance:0.0008 },
        "mud": { elem2:"dirt", chance:0.01 },
        "wet_sand": { elem2:"sand", chance:0.01 },
        "water": { elem2:null, chance:0.001 },
        "blood": { elem2:null, chance:0.01 },
        "sugar_water": { elem2:null, chance:0.0025 },
        "acidic_bile": { elem2:null, chance:0.0025 }
    },
    tempHigh: 175,
    stateHigh: "meat",
    tempLow: -50,
    stateLow: "frozen_meat",
    burn: 20,
    burnTime: 60,
    burnInto: "meat",
    breakInto: "blood",
    category: "flesh",
    state: "solid",
    density: 1250,
    conduct: 0.1,
    hidden: true
}

elements.fibrous_flesh = {
    color: ["#c72114","#7c2617","#984227","#c72114","#b0634a","#802720","#c72114"],
    behavior: behaviors.STURDYPOWDER,
    tempHigh:175,
    stateHigh: "meat",
    tempLow: -50,
    stateLow: "frozen_meat",
    burn: 20,
    burnTime: 60,
    burnInto: "meat",
    category:"flesh",
    hidden: true,
    breakInto: "blood",
    state: "solid",
    density: 462
}

elements.solid_flesh = {
    color: ["#7c2617","#984227","#c72114","#b0634a","#802720"],
    behavior: behaviors.WALL,
    reactions: {
        "plant": { elem2:["dead_plant","solid_flesh"], chance:0.005 },
        "grass": { elem2:["dead_plant","flesh_mound"], chance:0.005 },
        "tree_branch": { elem1:null, elem2:"fleshwood" },
        "sapling": { elem2:"fleshwood_sapling", chance:0.005 },
    },
    tempHigh:175,
    stateHigh: "meat",
    tempLow: -50,
    stateLow: "frozen_meat",
    burn: 20,
    burnTime: 60,
    burnInto: "meat",
    category:"flesh",
    hidden: true,
    breakInto: ["blood","meat","meat"],
    state: "solid",
    density: 462
}

elements.flesh_beast = {
    color: ["#9e4839","#ba6449","#a14940"],
    behavior: [
        "XX|CR:acidic_bile%0.05 AND M2%0.5|M2%5 AND SW:acidic_bile,meat,rotten_meat,blood%14",
        "XX|FX%2|M2%50 AND BO",
        "XX|M1|M2%50 AND SW:acidic_bile,meat,rotten_meat,blood%14",
    ],
    reactions: {
        "cell": { elem2:"flesh_mound", chance:0.05, func:behaviors.FEEDPIXEL  },
        "head": { elem2:["flesh_mound",null], chance:0.01, func:behaviors.FEEDPIXEL  },
        "body": { elem2:["flesh_mound",null], chance:0.01, func:behaviors.FEEDPIXEL  },
        "frog": { elem2:["flesh_mound",null], chance:0.05, func:behaviors.FEEDPIXEL  },
        "tadpole": { elem2:["flesh_mound",null], chance:0.05, func:behaviors.FEEDPIXEL  },
        "fish": { elem2:["flesh_mound",null], chance:0.05, func:behaviors.FEEDPIXEL  },
        "rat": { elem2:["flesh_mound",null], chance:0.05, func:behaviors.FEEDPIXEL  },
        "bird": { elem2:["flesh_mound",null], chance:0.05, func:behaviors.FEEDPIXEL  },
        "bone": { elem2:"quicklime", chance:0.005, func:behaviors.FEEDPIXEL  },
        "bone_marrow": { elem2:["flesh_mound","quicklime"], chance:0.005, func:behaviors.FEEDPIXEL  },
        "skin": { elem2:"flesh_mound", chance:0.005, func:behaviors.FEEDPIXEL  },
        "sugar": { elem2:null, chance:0.04, func:behaviors.FEEDPIXEL  },
        "sugar_water": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL  },
        "plant": { elem2:["dead_plant","flesh_mound",null], chance:0.005, func:behaviors.FEEDPIXEL  },
        "grass": { elem2:["dead_plant","flesh_mound",null], chance:0.005, func:behaviors.FEEDPIXEL  },
        "oxygen": { elem2:"carbon_dioxide", chance:0.5 },
        "meat": { elem2:["flesh_mound",null], chance:0.01, func:behaviors.FEEDPIXEL },
        "cooked_meat": { elem2:["flesh_mound",null,null,null], chance:0.1, func:behaviors.FEEDPIXEL },
        "rotten_meat": { elem2:["flesh_mound","plague",null,null], chance:0.1, func:behaviors.FEEDPIXEL },
        "cheese": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "rotten_cheese": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "melted_cheese": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "tomato": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "sauce": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "vine": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "evergreen": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "algae": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "grass_seed": { elem2:null, chance:0.3 , func:behaviors.FEEDPIXEL},
        "wheat_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "wheat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "potato_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "potato": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "corn_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "corn": { elem2:null, chance:0.1 , func:behaviors.FEEDPIXEL},
        "lichen": { elem2:null, chance:0.04, func:behaviors.FEEDPIXEL },
        "flower_seed": { elem2:null, chance:0.4 , func:behaviors.FEEDPIXEL},
        "flour": { elem2:null, chance:0.1 , func:behaviors.FEEDPIXEL},
        "dough": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "bread": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "toast": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "gingerbread": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "rice": { elem2:null, chance:0.1 , func:behaviors.FEEDPIXEL},
        "yogurt": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "beans": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "salt": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "sugar": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "crumb": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "herb": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "popcorn": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "candy": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "caramel": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "lichen": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "egg": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "yolk": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "eggnog": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "milk": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "grape": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "batter": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "baked_batter": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "butter": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "melted_butter": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "lettuce": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "baked_potato": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "ice_cream": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "cream": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "pumpkin": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "pumpkin_seed": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "coffee_bean": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "coffee_ground": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "nut": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "nut_meat": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "nut_butter": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "jelly": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "worm": { elem2:["flesh_mound",null], chance:0.1, func:behaviors.FEEDPIXEL },
        "fly": { elem2:["flesh_mound",null], chance:0.1, func:behaviors.FEEDPIXEL },
        "ant": { elem2:["flesh_mound",null], chance:0.1, func:behaviors.FEEDPIXEL },
        "frog": { elem2:["flesh_mound",null], chance:0.05, func:behaviors.FEEDPIXEL },
        "snail": { elem2:["flesh_mound","quicklime"], chance:0.1, func:behaviors.FEEDPIXEL },
        "slug": { elem2:["flesh_mound",null], chance:0.1, func:behaviors.FEEDPIXEL },
        "sapling": { elem2:"fleshwood_sapling", chance:0.005 },
        "wood": { elem2:"dry_fleshwood", chance:0.005 },
        "tree_branch": { elem2:"fleshwood", chance:0.005 },
    },
    foodNeed: 2,
    egg: "flesh_beast",
    category: "flesh",
    temp: 37.6,
    tempHigh: 120,
    stateHigh: "rotten_meat",
    tempLow: -18,
    stateLow: "frozen_meat",
    breakInto: ["acidic_bile","rotten_meat"],
    burn:80,
    burnTime:150,
    state: "solid",
    density: 1450,
    conduct: 0.25
}

elements.fleshwood_sapling = {
    color: ["#7c2617","#984227","#c72114","#b0634a","#802720"],
    tick: function(pixel) {
        if (!tryMove(pixel,pixel.x,pixel.y+1)) {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel && (eLists.FESTER.indexOf(dirtPixel.element) !== -1 || dirtPixel.element === "grass")) {
                        changePixel(dirtPixel,"vein_root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    if (!pixel.wc) {
                        var c = Math.random();
                        if (c < 0.01) { pixel.wc="#632e1f"; pixel.lc="#7c2617" }
                        else if (c < 0.05) { pixel.wc="#9e4839"; pixel.lc="#7c2617" }
                        else if (c < 0.1) { pixel.wc="#9e4839"; pixel.lc="#984227" }
                        else if (c < 0.2) { pixel.wc="#a14940"; pixel.lc="#984227" }
                        else if (c < 0.3) { pixel.wc="#ba6449"; pixel.lc="#c72114" }
                        else if (c < 0.4) { pixel.wc="#a14940"; pixel.lc="#c72114" }
                        else if (c < 0.45) { pixel.wc="#ba6449"; pixel.lc="#b0634a" }
                        else if (c < 0.5) { pixel.wc="#a14940"; pixel.lc="#b0634a" }
                        else { pixel.wc="#9e4839"; pixel.lc="#802720" }
                        pixel.color = pixelColorPick(pixel, pixel.lc);
                    }
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "dry_fleshwood" : "fleshwood",pixel.x,pixel.y+1);
                    pixelMap[pixel.x][pixel.y+1].wc = pixel.wc;
                    pixelMap[pixel.x][pixel.y+1].lc = pixel.lc;
                    pixelMap[pixel.x][pixel.y+1].color = pixelColorPick(pixelMap[pixel.x][pixel.y+1], pixel.wc);
                }
            }
            else if (pixel.age > 1000 && Math.random() < 0.05) {
                changePixel(pixel,"dry_fleshwood");
                pixel.color = pixelColorPick(pixel, pixel.wc);
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0
    },
    tempHigh: 100,
    stateHigh: "meat",
    tempLow: -25,
    stateLow: "meat",
    burn: 65,
    burnTime: 15,
    category: "flesh",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true
}

elements.fleshwood = {
    color: ["#9e4839","#ba6449","#a14940"],
    tick: function(pixel) {
        if (!pixel.burning) {
            if (!pixel.lc) { pixel.lc = "#7c2617" }
            if (!pixel.wc) { pixel.wc = "#ba6449" }
            if (isEmpty(pixel.x-1,pixel.y-1) && Math.random() < 0.02) {
                if (Math.random() < 0.55) {
                    createPixel("solid_flesh",pixel.x-1,pixel.y-1);
                    pixelMap[pixel.x-1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x-1][pixel.y-1], pixel.lc);
                }
                else {
                    createPixel("fleshwood",pixel.x-1,pixel.y-1);
                    pixelMap[pixel.x-1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x-1][pixel.y-1], pixel.wc);
                    pixelMap[pixel.x-1][pixel.y-1].wc = pixel.wc;
                    pixelMap[pixel.x-1][pixel.y-1].lc = pixel.lc;
                }
            }
            if (isEmpty(pixel.x+1,pixel.y-1) && Math.random() < 0.02) {
                if (Math.random() < 0.55) {
                    createPixel("solid_flesh",pixel.x+1,pixel.y-1);
                    pixelMap[pixel.x+1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x+1][pixel.y-1], pixel.lc);
                }
                else {
                    createPixel("fleshwood",pixel.x+1,pixel.y-1);
                    pixelMap[pixel.x+1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x+1][pixel.y-1], pixel.wc);
                    pixelMap[pixel.x+1][pixel.y-1].wc = pixel.wc;
                    pixelMap[pixel.x+1][pixel.y-1].lc = pixel.lc;
                }
            }
            if (isEmpty(pixel.x,pixel.y-1) && Math.random() < 0.02) {
                if (Math.random() < 0.8) {
                    createPixel("solid_flesh",pixel.x,pixel.y-1);
                    pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1], pixel.lc);
                }
                else {
                    createPixel("fleshwood",pixel.x,pixel.y-1);
                    pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1], pixel.wc);
                    pixelMap[pixel.x][pixel.y-1].wc = pixel.wc;
                    pixelMap[pixel.x][pixel.y-1].lc = pixel.lc;
                }
            }
        }
        doDefaults(pixel);
    },
    renderer: renderPresets.WOODCHAR,
    reactions: {
        "plant": { elem2:["dead_plant","solid_flesh"], chance:0.005 },
        "grass": { elem2:["dead_plant","flesh_mound"], chance:0.005 },
        "tree_branch": { elem1:null, elem2:"fleshwood" },
        "sapling": { elem2:"fleshwood_sapling", chance:0.005 },
    },
    movable: false,
    tempHigh: 175,
    stateHigh: "meat",
    tempLow: -30,
    stateLow: "meat",
    category: "flesh",
    burn: 2,
    burnTime: 300,
    burnInto: ["blood","ash","cooked_meat","ash"],
    hidden: true,
    state: "solid",
    density: 1500,
    hardness: 0.15,
    breakInto: ["blood","meat"],
    forceSaveColor: true
}

elements.dry_fleshwood = {
    color: ["#9e4839","#ba6449","#a14940"],
    behavior: behaviors.WALL,
    renderer: renderPresets.WOODCHAR,
    reactions: {
        "plant": { elem2:["dead_plant","solid_flesh"], chance:0.005 },
        "grass": { elem2:["dead_plant","flesh_mound"], chance:0.005 },
        "tree_branch": { elem1:null, elem2:"fleshwood" },
        "sapling": { elem2:"fleshwood_sapling", chance:0.005 },
    },
    tempHigh: 400,
    stateHigh: ["ash","cooked_meat","fire","fire","fire"],
    tempLow: -30,
    stateLow: "meat",
    category: "solids",
    burn: 5,
    burnTime: 300,
    burnInto: ["ash","cooked_meat","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: ["blood","meat"],
    forceSaveColor: true
}

elements.acidic_bile = {
    color: ["#81cf63","#81cf63","#81cf63","#81cf63","#81cf63","#81cf63","#439809","#258b08","#118511","#127b12","#136d14"],
    behavior: [
        "XX|DB%1|XX",
        "DB%1 AND M2%25|DL%0.001|DB%1 AND M2%25",
        "DB%1 AND M2%25|DB%2 AND M1|DB%1 AND M2%25",
    ],
    ignore: ["flesh_beast","flesh_mound","vein_root","glass","rad_glass","glass_shard","rad_shard","stained_glass","baked_clay","acid","acid_gas","neutral_acid","acid_cloud","water","salt_water","sugar_water","dirty_water","copper","gold","porcelain","plastic","bead","microplastic","molten_plastic","pool_water","chlorine","hydrogen","gold_coin","silver","nickel","calcium","bone","earthquake","tornado","tsunami","liquid_light","sensor"],
    reactions: {
        "ash": { elem1:null, elem2:null },
        "limestone": { elem1:null, elem2:["calcium","carbon_dioxide"] },
        "quicklime": { elem1:null, elem2:null },
        "slaked_lime": { elem1:null, elem2:null },
        "borax": { elem1:null, elem2:null },
        "ammonia": { elem1:null, elem2:null },
        "bleach": { elem1:null, elem2:null },
        "cement": { elem1:null, elem2:null },
	"glass": { elem1:null, elem2:"glass_shard", chance:0.05 },
        "caustic_potash": { elem1:"water", elem2:"potassium_salt" },
        "bone": { elem2:"flesh_mound", chance:0.01 },
        "water": { elem1:null, elem2:"dirty_water" },
        "salt_water": { elem1:null, elem2:"water" },
        "sugar_water": { elem1:null, elem2:"water" },
        "plant": { elem2:["dead_plant","flesh_mound"], chance:0.005 },
        "grass": { elem2:["dead_plant","flesh_mound"], chance:0.005 },
        "tree_branch": { elem1:null, elem2:["dry_fleshwood","dry_fleshwood","dead_plant","fleshwood"] },
        "charcoal": { elem1:null, elem2:"carbon_dioxide" },
        "rock": { elem1:null, elem2:"sand", chance:0.05 },
        "baking_soda": { elem1:"salt_water", elem2:["carbon_dioxide","foam"] },
        "calcium": { elem1:"chlorine", elem2:"hydrogen", chance:0.01 },
        "zinc": { elem1:"hydrogen", elem2:null, chance:0.03 },
        "sugar": { elem1:"steam", elem2:"carbon_dioxide" },
        "sapling": { elem2:"fleshwood_sapling", chance:0.005 },
    },
    tempHigh: 120,
    stateHigh: ["steam","steam","salt"],
    tempLow: 0,
    category:"flesh",
    state: "liquid",
    density: 1450,
    stain: 0.05
}
