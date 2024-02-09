/*
Created by SquareScreamYT and RealerRaddler
Thanks to Alice, nousernamefound and Fioushemastor for helping :)

Upcoming Features:
- onions
- spring onions
- soy sauce
- rice
- seaweed and agar
- pigs, ham and bacon
- garlic
- msg
- stainless steel

v1.5

Changelog (v1.0)
    - added chickens
        - lays chicken eggs
    - added chicks
        - hatches from chicken eggs
        - grows into chickens
    - added chicken eggs
        - added frozen chicken eggs
        - added hard boiled eggs
            - made by putting chicken eggs in hot water
    - added soup
        - made from broth and water
    - added noodles
        - made by putting batter in hot water
    - added chicken meat
        - raw chicken meat
        - cooked chicken meat
        - battered raw chicken
            - made by mixing raw chicken and batter
            - raw chicken nuggets
                - made by mixing battered raw chicken with crumbs
            - (cooked) chicken nuggets
    - added crushed worm
        - chicken food
        - made by smashing worms or mixing worms with rocks
        - added frozen crushed worms
    - added fried potato
        - made by putting potatoes in hot cooking oil
    - added smoked chicken
        - made by putting raw chicken with smoke
    - added boiled chicken
        - made by putting raw chicken in hot water
    - added fried chicken
        - made by putting raw chicken in hot cooking oil
    - added steamed chicken
        - made by putting raw chicken with steam
    - added olives
        - added olives
            - olives can be smashed into cooking oil
        - added olive wood
        - added olive branches
        - added olive leaves
    - added cooking oil




Changelog (v1.1)
    - added apples and related stuff
        - apples
        - applewood
        - apple branches
        - apple leaves
        - apple juice
            - made by smashing apples
        - apple seeds
        - apple slices
            - made by cutting apples
        - apple jam
            - made by putting sugar in apple juice
    - added knife tool
        - cuts, peels, etc. pixels
        - readded potato skin and peeled potato
        - changed fried potato recipe from potato to skinned potato\
    - added pepper
    - added cake
        - made by mixing baked batter and cream
    - added icing sugar
        - made by smashing sugar
    - added icing
        - made by shift-mixing icing sugar
    - noodles description
    - bug fix (freezing crushed worms makes them alive)




Changelog (v1.2)
    - added boilers
    - added steamers
    - added smokers
    - added oranges and related stuff
        - oranges
        - orange wood
        - orange branches
        - orange leaves
        - orange juice
            - made by smashing orange
        - orange seeds
        - orange slices
            - made by cutting oranges
        - orange peels
            - byproduct of cutting oranges into orange slices
        - marmalade
            - made by putting sugar in orange peels and orange slices
    - apple and orange juice now turn into juice ice under 0 degrees
    - apple juice now boils into sugar and steam
    - apple juice now boils at 100 instead of 400
    - added coral and coral stems
    - added tuna
    - added cooked and raw tuna
    - added smoked tuna
        - made by putting raw tuna with smoke
    - added boiled tuna
        - made by putting raw tuna in hot water
    - added fried tuna
        - made by putting raw tuna in hot cooking oil
    - added steamed tuna
        - made by putting raw tuna with steam
    - added salmon
    - added cooked and raw salmon
    - added smoked salmon
        - made by putting raw salmon with smoke
    - added boiled salmon
        - made by putting raw salmon in hot water
    - added fried salmon
        - made by putting raw salmon in hot cooking oil
    - added steamed salmon
        - made by putting raw salmon with steam
    - added grape juice
    - added cream of tartar
    - added wine
    - added corn syrup



Changelog (v1.3)
    - added shrimp
    - added coconuts
        - added coconut stems
        - added coconut leaves
        - added coconut tree tops
        - added coconut milk and coconut juice
        - added cut coconuts
    - salmon and tuna meats no longer melt
    - added knife description
    - added lemons and related stuff
        - lemons
        - lemon wood
        - lemon branches
        - lemon leaves
        - lemon juice
            - made by smashing lemons
        - lemon seeds
        - lemon slices
            - made by cutting lemons
        - lemon zest
            - byproduct of cutting lemons
        - lemon marmalade can now be made by mixing lemon slices or lemon zest with sugar
    - added carrots
    - added carrot seeds and leaves
    - added carrot juice
    - added dry icing



Changelog (v1.3.1)
    - added lemonade



Changelog (v1.3.2)
    - added apple cider vinegar
    - added turnips
    - added turnip seeds and leaves
    - added turnip juice



Changelog (v1.4)
    - added baking powder
    - added corn starch
    - added maple syrup
    - added pancakes
        - added pancake mix
        - added pancake batter
        - added normal pancakes
        - added crispy pancakes
        - added burnt pancakes
    - added strawberries
        - added strawberries
        - added strawberry seeds, stem, and leaves
        - added strawberry juice
    - added whipped cream
    - chicken eggs no longer hatch under 20 degrees
    - added ginger
    - added ginger juice
    - added ginger rhizomes, pseudostems and leaves



Changelog (v1.5)
    - added blueberries
        - added blueberries
        - added blueberry seeds, stem, and leaves
        - added blueberry juice
    - added strawberry and blueberry jam
    - added cut blueberries
    - added advanced dough
    - added carbonic acid
    - added cookies and cookie dough
    - replaced cooking oil with nut oil
    - added boba and boba dough
*/

/*
elements.test = {
    //other needed properties
    cutInto: "elem"
}
*/

elements.knife = {
    color: "#adb5bd",
    // other needed properties
    tool: (pixel) => {
        //store cutInto as a variable for legibility
        var cutInto = elements[pixel.element].cutInto;
        //if there’s no cutInto, it should equal undefined, which is falsey and !undefined = true
        if (!cutInto) { return };
        //if cutInto is an array, randomly pick one of its elements
        if(cutInto instanceof Array) { cutInto = cutInto[Math.floor(Math.random() * cutInto.length)] };
        //change pixel into the (chosen) element      
        changePixel(pixel, cutInto)
    },
    category:"tools",
    canPlace: false,
    desc: "Use on pixels to cut them, if possible."
}

elements.chicken = {
    color: ["#c29046", "#f5d271", "#d4bd7d"],
    behavior: [
        "M2%1|M2%2|M2%1",
        "M2%10|XX|M2%10",
        "XX|M1%33|XX",
    ],
    category:"life",
	state: "solid",
    reactions: {
        "meat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "chicken_nugget": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "grass": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "worm": { elem2: "crushed_worm", chance:0.3},
        "cooked_meat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "fish": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "rat": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "snail": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "frog": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "slug": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "grape": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "wheat_seed": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "flower_seed": { elem2:null, chance:0.32, func:behaviors.FEEDPIXEL },
        "corn_seed": { elem2:null, chance:0.35, func:behaviors.FEEDPIXEL },
        "corn": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "crumb": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "potato_seed": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "grass_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "pumpkin_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "pumpkin": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "nut": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "dead_bug": { elem2:null, chance:0.35, func:behaviors.FEEDPIXEL },
        "bee": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "ant": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "flea": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "termite": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
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
    egg: "chicken_egg",
    foodNeed: 10,
    temp: 40,
    tempHigh: 75,
    stateHigh: "cooked_chicken",
    tempLow: -18,
    stateLow: "frozen_meat",
    breakInto: ["feather", "raw_chicken"],
    burn:85,
    burnTime:450,
    state: "solid",
    density: 1117,
    conduct: 0.3,
};

elements.chicken_egg = {
    color: ["#e0d3ab","#d9cdb5"],
    behavior: [
        "XX|XX|XX",
        "XX|FX%5|XX",
        "M2%30|M1|M2%30",
    ],
    tick: function(pixel) {
        if (Math.random() < 0.1 && pixel.temp > 20) {
            changePixel(pixel,"chick")
        }
    doDefaults(pixel);
    },
    category: "food",
    state: "solid",
    temp: 20,
    tempLow: -18,
    stateLow: "frozen_chicken_egg",
    breakInto: ["yolk"],
    tempHigh: 400,
    stateHigh: ["calcium", "ash"],
    burn:50,
    burnTime:450,
    state: "solid",
    density: 900,
    conduct: 0.1,
    reactions: {
        "water": { elem1:null, elem2:"hard_boiled_egg", chance:10, tempMin:80 }
    }
};

elements.frozen_chicken_egg = {
    color: ["#e0d3cf","#d9cdd3"],
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    temp: -20,
    tempHigh: 10,
    stateHigh: "chicken_egg",
    breakInto: ["calcium", "hard_yolk"],
    burn:50,
    burnTime:450,
    state: "solid",
    density: 900,
    conduct: 0.1,
    hidden: true,
};

elements.hard_boiled_egg = {
	color: ["#e0d3ab","#d9cdb5","#e4d4b4","#f3f3ef"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
    tempHigh: 1000,
    stateHigh: ["ash", "smoke"],
    density: 820.33,
    isFood: true,
    hidden: true,
};

elements.chick = {
    color: ["#ffdf85", "#ffef5c"],
    behavior: [
        "M2%1|M2%2|M2%1",
        "M2%10|FX%5 AND CH:chicken%0.1|M2%10",
        "XX|M1%33|XX",
    ],
    category: "life",
    state: "solid",
    egg: "chicken_egg",
    foodNeed: 20,
    temp: 40,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -18,
    stateLow: "frozen_meat",
    breakInto: "blood",
    burn:85,
    burnTime:450,
    state: "solid",
    density: 900,
    conduct: 0.1,
    reactions: {
        "crushed_worm": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL},
        "meat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "chicken_nugget": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "grass": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "worm": { elem2: "crushed_worm", chance:0.3},
        "cooked_meat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "fish": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "rat": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "snail": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "frog": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "slug": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "grape": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "wheat_seed": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "flower_seed": { elem2:null, chance:0.32, func:behaviors.FEEDPIXEL },
        "corn_seed": { elem2:null, chance:0.35, func:behaviors.FEEDPIXEL },
        "corn": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "crumb": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "potato_seed": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "grass_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "pumpkin_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "pumpkin": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "nut": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "dead_bug": { elem2:null, chance:0.35, func:behaviors.FEEDPIXEL },
        "bee": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "ant": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "flea": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "termite": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "lichen": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.3 },
        "mercury": { elem1:"rotten_meat", chance:0.1 },
        "bleach": { elem1:"rotten_meat", chance:0.1 },
        "infection": { elem1:"rotten_meat", chance:0.025 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cyanide": { elem1:"rotten_meat", chance:0.1 },
        "chlorine": { elem1:"meat", chance:0.1 },
        "dirty_water": { elem1:"rotten_meat", chance:0.0001 },
    }
};

elements.soup = {
    color: "#fbd189",
    behavior: behaviors.LIQUID,
    tempHigh: 130,
    stateHigh: ["steam","steam","steam","fragrance"],
    tempLow: 0,
    category: "food",
    state: "liquid",
    density: 1052,
    conduct: 0.03,
    stain: -0.01,
    isFood: true,
    hidden: true,
}

if (!elements.broth.reactions) elements.broth.reactions = {};
elements.broth.reactions.water = { elem1: "soup", elem2: "soup" }

elements.noodles = {
    desc: "whatever noodles",
    color: ["#F3BA4F", "#F7D161"],
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    temp: 30,
    breakInto: ["crumb"],
    tempHigh: 130,
    stateHigh: ["toast"],
    burn:50,
    burnTime:450,
    state: "solid",
    density: 900,
    conduct: 0.1,
    hidden: true,
};

if (!elements.batter.reactions) elements.batter.reactions = {};
elements.batter.reactions.water = {elem2: "noodles", tempMin: 70}

elements.battered_raw_chicken = {
    color: ["#eacfa9", "#ecd2af"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:25,
    tempHigh: 600,
    stateHigh: ["ash","smoke"],
    reactions: {
        "crumb": { elem1: "raw_chicken_nugget", elem2: null },
    },
    hidden: true,
};

elements.steamed_chicken = {
    color:["#cfba8f", "#d2b788"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:50,
    tempHigh: 600,
    stateHigh: ["ash","smoke"],
    isFood: true,
    hidden: true,
}

elements.smoked_chicken = {
    color:["#AF4523", "#AC481F"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:55,
    tempHigh: 600,
    stateHigh: ["ash","smoke"],
    isFood: true,
    hidden: true,
}

elements.crushed_worm = {
    color: ["#e56932", "#c0714e"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp: 20,
    tempHigh: 50,
    stateHigh: ["ash", "smoke"],
    tempLow: -4,
    stateLow: "frozen_crushed_worm",
    density: 200.33,
    isFood: true,
    hidden: true,
};

elements.worm.reactions.rock = { elem1: "crushed_worm" }
elements.worm.breakInto = "crushed_worm"

elements.frozen_crushed_worm = {
    color: ["#2fcbae", "#3edabd", "#b2d5d9"],  
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp: -4,
    tempHigh: 20,
    stateHigh: "crushed_worm",
    density: 200.33,
    isFood: false,
    hidden: true,
};

elements.cooked_chicken = {
    color: ["#c17c20", "#ebad2b", "#f7b846"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp: 40,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    hidden: true,
};

elements.raw_chicken = {
    color: ["#dfc8bd", "#e2cdc0", "#b9a195"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    burnInto: "cook_chicken",
    temp:25,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    reactions: {
        "batter": { elem1: "battered_raw_chicken", elem2: null },
        "smoke": {elem1: "smoked_chicken"},
        "steam": {elem1: "steamed_chicken"},
        "water": {elem1: "boiled_chicken", tempMin: 70},
        "nut_oil": {elem1: "fried_chicken", tempMin: 70}
    }
};

elements.boiled_chicken = {
    color: ["#F9CC84", "#EDCE89", "#F8CB78"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    isFood: true,
    temp: 65,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    hidden: true,
}

elements.fried_chicken = {
    color: ["#E87D1A", "#E77106", "#E77106"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    isFood: true,
    temp: 90,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    hidden: true,
}

elements.raw_chicken_nugget = {
    color: ["#d6bc7e", "#d2b47a", "#c7a969"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    burnInto: "chicken_nugget",
    temp:25,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    hidden: true,
    reactions: {
        "nut_oil": {elem1: "chicken_nugget", tempMin: 70}
    }
};

elements.chicken_nugget = {
    color: ["#D77105", "#D77105", "#EB8C2C", "#EB8C2C"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp: 40,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    tempLow: -20,
    stateLow: "frozen_chicken_nugget",
    isFood: true,
    density: 100,
    hidden: true,
};

elements.frozen_chicken_nugget = {
    color: ["#45a69c", "#73d9cd", "#3f9f95", "#389d8e"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp: -20,
    tempHigh: 40,
    stateHigh: "chicken_nugget",
    isFood: false,
    density: 100,
    hidden: true,
};

elements.olive_wood = {
    color: "#632e1f",
    behavior: behaviors.WALL,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "solids",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    breakIntoColor: ["#dba66e","#cc8a64"],
}
elements.olive_branch = {
    color: "#632e1f",
    behavior: [
        "CR:olive_leaves,olive_branch%2|CR:olive_leaves,olive_leaves,olive_leaves,olive_branch%2|CR:olive_leaves,olive_branch%2",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tempHigh: 100,
    stateHigh: "olive_wood",
    tempLow: -30,
    stateLow: "olive_wood",
    category: "life",
    burn: 40,
    burnTime: 50,
    burnInto: ["sap","ember","charcoal"],
    hidden: true,
    state: "solid",
    density: 1500,
    hardness: 0.15,
    breakInto: ["sap","sawdust"],
    hidden: true,
}
elements.olive_leaves = {
    color: ["#407603","#376502","#2e5502"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|CR:olive%0.15|XX",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035}
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    seed: "olive_seed",
    hidden: true
}
elements.olive = {
    color: ["#6e8b3d","#7c9d45"],
    behavior: behaviors.POWDER,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "rock": { elem1:"nut_oil", elem2:"rock", chance:0.035, color1: "#ffc844" },
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "nut_oil",
    breakIntoColor: "#ffc844",
    density: 1050,
    isFood: false
}
/*
elements.cooking_oil = {
    color: "#ffc844",
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 400,
    stateHigh: "fire",
    burn: 70,
    burnTime: 300,
    burnInto: ["carbon_dioxide","fire"],
    viscosity: 250,
    state: "liquid",
    density: 825,
    temp: 30,
    reactions: {
        "peeled_potato": {elem2: "fried_potato", tempMin: 70}
    }
},
*/
elements.pepper = {
    color: ["#1f190a", "#2b200d", "#362712", "#3b2211"],
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    isFood: true,
    temp: 20,
    hidden: true,
    tempHigh: 250,
    stateHigh: ["ash", "smoke"],
}

elements.potato.cutInto = ["peeled_potato","peeled_potato","peeled_potato","potato_skin"]//{elem1: ["potato_skin","peeled_potato"] }

elements.potato_skin = {
    color: ["#DC8A5A", "#A86C36", "#DC9A59", "#A76B35"],
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    isFood: true,
    temp: 20,
    hidden: true,
    density: 1100,
    tempHigh: 250,
    stateHigh: ["ash", "smoke"],
}

elements.peeled_potato = {
    color: ["#D6C39F", "#D1C09D", "#D1C09D", "#CDBF9E"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    isFood: true,
    temp: 20,
    hidden: true,
    breakInto: "mashed_potato",
    tempHigh: 176,
    stateHigh: "baked_potato",
    density: 1100,
    reactions: {
        "nut_oil": { elem1: "fried_potato", tempMin: 70 }
    }
}

elements.fried_potato = {
    color: ["#DD7908", "#D57206", "#CA6801", "#D68001"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp: 35,
    hidden: true,
    tempHigh: 600,
    density: 1110,
    stateHigh: ["ash", "smoke"],
    isFood: true,
}

elements.applewood = {
    color: "#632e1f",
    behavior: behaviors.WALL,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "solids",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    breakIntoColor: ["#dba66e","#cc8a64"],
    hidden: true
}
elements.apple_branch = {
    color: "#632e1f",
    behavior: [
        "CR:apple_leaves,apple_branch%2|CR:apple_leaves,apple_branch%2|CR:apple_leaves,apple_branch%2",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tempHigh: 100,
    stateHigh: "applewood",
    tempLow: -30,
    stateLow: "applewood",
    category: "life",
    burn: 40,
    burnTime: 50,
    burnInto: ["sap","ember","charcoal"],
    hidden: true,
    state: "solid",
    density: 1500,
    hardness: 0.15,
    breakInto: ["sap","sawdust"],
}
elements.apple_leaves = {
    color: ["#00d404","#0ec911","#109e12"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|CR:apple%0.15|XX",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    hidden: true
}
elements.apple = {
    color: ["#eb1a1a","#f22c2c","#d62020"],
    behavior: behaviors.POWDER,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "apple_juice",
    cutInto: "apple_slice",
    state: "solid",
    density: 1050,
}

elements.apple_slice = {
    color: "#f0af37",
    behavior: behaviors.STURDYPOWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: ["sugar","steam"],
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "apple_juice",
    state: "solid",
    density: 1050,
    hidden: true,
}

elements.apple_seed = {
    color: "#854610",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "applewood" : "apple_branch",pixel.x,pixel.y+1);
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"applewood");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|FX%10|XX",
        "XX|M1|XX",
    ],
};

elements.apple_juice = {
    color: "#ffde55",
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    reactions: {
        "sugar": { elem1:"apple_jam", elem2:null, chance:0.35 },
        "yeast": { elem1:"apple_cider_vinegar", elem2:null, chance:0.35 }
    },
    tempLow: 0
};

elements.apple_jam = {
    color: "#ebc034",
    behavior: behaviors.LIQUID,
    category: "food",
    tempHigh: 400,
    stateHigh: ["sugar","smoke"],
    burn: 70,
    burnTime: 300,
    viscosity: 750,
    state: "liquid",
    density: 825,
    hidden: true
};

elements.cake = {
    color: ["#f2e5bf","#e8daba"],
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 550,
    stateHigh: "ash",
    category: "food",
    burn: 10,
    burnTime: 400,
    burnInto: ["smoke","smoke","smoke","ash"],
    breakInto: "crumb",
    state: "solid",
    density: 233.96,
    hidden: true,
    isFood: true
};

elements.icing_sugar = {
    color: "#f8f8f1",
    behavior: behaviors.POWDER,
    onMix: function(icing_sugar1, icing_sugar2) {
        if (shiftDown && Math.random() < 0.2) {
            changePixel(icing_sugar1,"icing")
        }
    },
    tempHigh: 186,
    stateHigh: "caramel",
    viscosity: 1.5,
    category: "food",
    state: "solid",
    density: 1036.86,
    isFood: true
};

elements.icing = {
    color: "#fefefb",
    behavior: behaviors.LIQUID,
    onMix: function(icing_sugar1, icing_sugar2) {
        if ((shiftDown && Math.random() < 0.2) || (elements[icing_sugar2.element].id === elements.icing_sugar.id && Math.random() < 0.25)) {
            changePixel(icing_sugar1,"icing")
        }
    },
    tempHigh: 45,
    stateHigh: ["dry_icing"],
    stateLowColorMultiplier: 0.97,
    category: "food",
    isFood: true,
    state: "solid",
    density: 959.97,
    viscosity: 9000,
    hidden: true
};

elements.dry_icing = {
    color: "#fffefa",
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 1000,
    stateHigh: ["smoke","smoke","smoke","steam","steam","calcium"],
    stateLowColorMultiplier: 0.97,
    category: "food",
    isFood: true,
    state: "solid",
    density: 959.97,
    viscosity: 9000,
    hidden: true
};

elements.cream.reactions.baked_batter = {elem2: "cake" }

elements.sugar.breakInto = {elem1: "icing_sugar"}

elements.boiler = {
	color: "#73fff8",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y, true)) {
					if(pixelMap[x][y].temp < -230) {
                    pixelMap[x][y].temp = (pixelMap[x][y].temp + 7)
					} else if(pixelMap[x][y].temp > 270) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp - 7)
					} else if (pixelMap[x][y].temp < 95) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp + 2)
					} else if (pixelMap[x][y].temp > 95) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp - 2)
					}
                }
            }
	},
	category:"machines",
	state:"solid",
	insulate: true,
	noMix: true,
	movable: false,
    temp: 110
};

elements.steamer = {
	color: "#45daff",
	behavior: [
        "CR:steam%90|CR:steam%90|CR:steam%90",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
	category:"machines",
	state:"solid",
	insulate: true,
	noMix: true,
	movable: false,
    temp: 110
};

elements.smoker = {
	color: "#bfa797",
	behavior: [
        "CR:smoke%90|CR:smoke%90|CR:smoke%90",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
	category:"machines",
	state:"solid",
	insulate: true,
	noMix: true,
	movable: false,
    temp: 110
};

elements.orange_wood = {
    color: "#a88c4a",
    behavior: behaviors.WALL,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "solids",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    breakIntoColor: ["#dba66e","#cc8a64"],
    hidden: true
}
elements.orange_branch = {
    color: "#a88c4a",
    behavior: [
        "CR:orange_leaves,orange_branch%2|CR:orange_leaves,orange_branch%2|CR:orange_leaves,orange_branch%2",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tempHigh: 100,
    stateHigh: "orange_wood",
    tempLow: -30,
    stateLow: "orange_wood",
    category: "life",
    burn: 40,
    burnTime: 50,
    burnInto: ["sap","ember","charcoal"],
    hidden: true,
    state: "solid",
    density: 1500,
    hardness: 0.15,
    breakInto: ["sap","sawdust"],
}
elements.orange_leaves = {
    color: ["#61c43d","#5ddb3d","#51d44c"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|CR:orange%0.1|XX",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    hidden: true
}
elements.orange = {
    color: ["#eda137","#e39230","#d1882e"],
    behavior: behaviors.POWDER,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "orange_juice",
    cutInto: ["orange_slice","orange_slice","orange_slice","orange_slice","orange_peels"],
    state: "solid",
    density: 1050,
}

elements.orange_slice = {
    color: "#f5b133",
    behavior: behaviors.STURDYPOWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: ["sugar","steam"],
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "orange_juice",
    state: "solid",
    density: 1050,
    hidden: true,
    reactions: {
        "sugar": { elem1:"marmalade", elem2:null, chance:0.35 }
    },
}

elements.orange_seed = {
    color: "#695531",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "orange_wood" : "orange_branch",pixel.x,pixel.y+1);
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"orange_wood");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|FX%10|XX",
        "XX|M1|XX",
    ],
};

elements.orange_juice = {
    color: "#ffb326",
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    tempLow: 0
};

elements.orange_peels = {
    color: "#d69c31",
    behavior: behaviors.POWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: ["sugar","steam"],
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "orange_juice",
    state: "solid",
    density: 1050,
    hidden: true,
    reactions: {
        "sugar": { elem1:"marmalade", elem2:null, chance:0.35 }
    },
}

elements.marmalade = {
    color: "#fc9a38",
    behavior: behaviors.LIQUID,
    category: "food",
    tempHigh: 400,
    stateHigh: ["sugar","smoke"],
    burn: 70,
    burnTime: 300,
    viscosity: 750,
    state: "liquid",
    density: 825,
    hidden: true
};

elements.tuna = {
    color: ["#3D74BA", "#4A6FB1", "#4A6FB1"],
    behavior: [
        "XX|M2%5|SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%14",
        "XX|FX%0.5|BO",
        "M2|M1|M2 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%5",
    ],
    category: "life",
    state: "solid",
    cutInto: "raw_tuna",
    reactions: {
        "algae": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "plant": { elem2:null, chance:0.125, func:behaviors.FEEDPIXEL },
        "fly": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "firefly": { elem2:null, chance:0.6, func:behaviors.FEEDPIXEL },
        "worm": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "tadpole": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.5 },
        "dead_bug": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "broth": { elem2:"water", chance:0.2, func:behaviors.FEEDPIXEL },
        "slug": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "herb": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "lettuce": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "dead_plant": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "lichen": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "yeast": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "yogurt": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "tea": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "meat": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "rotten_meat": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "cooked_meat": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "yolk": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "cell": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "crumb": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
    },
}

elements.salmon = {
    color: ["#C0C3CF", "#B7BAC3", "#ADB0B8"],
    behavior: [
        "XX|M2%5|SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%14",
        "XX|FX%0.5|BO",
        "M2|M1|M2 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%5",
    ],
    category: "life",
    state: "solid",
    reactions: {
        "algae": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "plant": { elem2:null, chance:0.125, func:behaviors.FEEDPIXEL },
        "fly": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "firefly": { elem2:null, chance:0.6, func:behaviors.FEEDPIXEL },
        "worm": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "tadpole": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.5 },
        "dead_bug": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "broth": { elem2:"water", chance:0.2, func:behaviors.FEEDPIXEL },
        "slug": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "herb": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "lettuce": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "dead_plant": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "lichen": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "yeast": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "yogurt": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "tea": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "meat": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "rotten_meat": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "cooked_meat": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "yolk": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "cell": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "crumb": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
    },
    cutInto: "raw_salmon"
}

elements.coral_stem = {
    color: "#4a5e49",
    behavior: [
        "CR:coral_stem,coral%2|CR:coral,coral_stem,coral,coral%2|CR:coral_stem,coral%2",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tick: function(pixel) {
        if (!pixel.fColor) {
            pixel.fColor = "hsl(" + Math.floor(Math.random()*360) + ",100%,50%)";
        }
        var coordsToCheck = [
            [pixel.x-1,pixel.y],
            [pixel.x+1,pixel.y],
            [pixel.x,pixel.y-1],
            [pixel.x,pixel.y+1],
        ]
        for (var i = 0; i < coordsToCheck.length; i++) {
            var coord = coordsToCheck[i];
            if (isEmpty(coord[0],coord[1])) {
                createPixel("coral",coord[0],coord[1]);
                pixelMap[coord[0]][coord[1]].color = pixel.fColor;
            }
        }
        doDefaults(pixel)
    },
    tempHigh: 100,
    stateHigh: "dead_coral",
    tempLow: -30,
    stateLow: "dead_coral",
    category: "life",
    burn: 40,
    burnTime: 50,
    burnInto: [,"ember","charcoal"],
    hidden: true,
    state: "solid",
    density: 1500,
    hardness: 0.15,
    hidden: true,
}

elements.coral = {
    color: ["#ff0000","#ff8800","#ffff00","#88ff00","#00ff00","#00ff88","#00ffff","#0088ff","#0000ff","#8800ff","#ff00ff"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035}
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    hidden: true,
    properties:{
        "colored": false
    }
}

elements.raw_salmon = {
    color: ["#FD7E19", "#FE842F", "#FD8F45"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    burnInto: "cook_salmon",
    temp:25,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    isFood: true,
    reactions: {
        "smoke": {elem1: "smoked_salmon"},
        "steam": {elem1: "steamed_salmon"},
        "water": {elem1: "boiled_salmon", tempMin: 70},
        "nut_oil": {elem1: "fried_salmon", tempMin: 70}
    }
}

elements.cooked_salmon = {
    color: ["#CB6132", "#D05D18", "#CC5926"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:25,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    isFood: true,
}

elements.smoked_salmon = {
    color: ["#B64431", "#B24932"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:55,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    isFood: true,
}

elements.steamed_salmon = {
    color: ["#BB7B4B", "#B07B54"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:60,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    isFood: true,
}

elements.boiled_salmon = {
    color: ["#F9B080", "#FFB78D"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:70,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    isFood: true,
}

elements.fried_salmon = {
    color: ["#E06643", "#ED774B"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:70,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    isFood: true,
}

elements.raw_tuna = {
    color: ["#EF4A5C", "#F74F65", "#E83A53"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:25,
    burnInto: "cooked_tuna",
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    isFood: true,
    reactions: {
        "smoke": {elem1: "smoked_tuna"},
        "steam": {elem1: "steamed_tuna"},
        "water": {elem1: "boiled_tuna", tempMin: 70},
        "nut_oil": {elem1: "fried_tuna", tempMin: 70}
    }
}

elements.cooked_tuna = {
    color: ["#B76C71", "#C2787C", "#A86265"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:50,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    isFood: true,
}

elements.smoked_tuna = {
    color: ["#9D5C24", "#A4632A"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:55,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    isFood: true,
}

elements.steamed_tuna = {
    color: ["#CFA578", "#D4AC82"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:60,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    isFood: true,
}

elements.boiled_tuna = {
    color: ["#C79F65", "#D9B075"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:70,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    isFood: true,
}

elements.fried_tuna = {
    color: ["#BF8251", "#9F6031"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:70,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    isFood: true,
}

elements.watermelon_seed = {
    color: "#2b2118",
    tick: function(pixel) {
            if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x+1,pixel.y) && Math.random() > 0.7) {
                    movePixel(pixel,pixel.x+1,pixel.y);
                    createPixel(Math.random() > 0.5 ? "watermelon_stem" : "watermelon_stem",pixel.x-1,pixel.y);
                }
                if (isEmpty(pixel.x-1,pixel.y) && Math.random() > 0.7) {
                    movePixel(pixel,pixel.x-1,pixel.y);
                    createPixel(Math.random() > 0.5 ? "watermelon_stem" : "watermelon_stem",pixel.x+1,pixel.y);
                }
                if (!isEmpty(pixel.x+1,pixel.y) && !isEmpty(pixel.x-1,pixel.y) &&isEmpty(pixel.x+1,pixel.y-1) && Math.random() > 0.7) {
                    movePixel(pixel,pixel.x+1,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "watermelon_stem" : "watermelon_stem",pixel.x-1,pixel.y+1);
                }
                if (!isEmpty(pixel.x-1,pixel.y) && !isEmpty(pixel.x+1,pixel.y) &&isEmpty(pixel.x-1,pixel.y-1) && Math.random() > 0.7) {
                    movePixel(pixel,pixel.x-1,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "watermelon_stem" : "watermelon_stem",pixel.x+1,pixel.y+1);
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"watermelon_stem");
            }
            pixel.age++;
        doDefaults(pixel);
    },
    properties: {
        "age":0
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|FX%20|XX",
        "XX|M1|XX",
    ],
};

elements.watermelon_stem = {
    color: "#6ec938",
    behavior: [
        "ST:watermelon_stem|ST:watermelon_stem AND CR:watermelon%0.1|ST:watermelon_stem",
        "ST:watermelon_stem|XX|ST:watermelon_stem",
        "XX|XX|XX",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050
};

elements.watermelon = {
    color: ["#28b02d","#36bf3a"],
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "watermelon_juice",
    cutInto: "watermelon_flesh",
    state: "solid",
    density: 1050,
}

elements.watermelon_flesh = {
    color: "#f53527",
    behavior: behaviors.STURDYPOWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: ["sugar","steam"],
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "watermelon_juice",
    state: "solid",
    density: 1050,
    hidden: true,
}

elements.watermelon_juice = {
    color: "#eb4034",
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    tempLow: 0
};

elements.grape = {
    color: ["#b84b65","#a10e69","#a10e95","#8a3eab"],
    behavior: [
        "XX|ST:vine|XX",
        "ST:vine|XX|ST:vine",
        "M2|M1|M2",
    ],
    reactions: {
        "radiation": { elem1:"explosion", chance:0.1, color1:"#291824" },
        "rock": { elem1:"juice", chance:0.1, color1:"#291824" },
        "concrete": { elem1:"juice", chance:0.1, color1:"#291824" },
        "basalt": { elem1:"juice", chance:0.1, color1:"#291824" },
        "limestone": { elem1:"juice", chance:0.1, color1:"#291824" },
        "tuff": { elem1:"juice", chance:0.1, color1:"#291824" },
        "water": { elem2:"juice", chance:0.005, color2:"#291824" },
        "sugar_water": { elem2:"juice", chance:0.025, color2:"#291824" },
        "acid": { elem1:"juice", color1:"#291824" },
        "acid_gas": { elem1:"juice", color1:"#291824" },
    },
    innerColor: "#cc7492",
    tempHigh: 256,
    stateHigh: ["steam","sugar"],
    category: "food",
    state: "solid",
    density: 825,
    breakInto: "grape_juice",
    ignoreAir: true,
    isFood: true
},

elements.grape_juice = {
    color: "#6d2282",
    behavior: behaviors.LIQUID,
    reactions: {
        "dirt": { elem1: null, elem2: "mud" },
        "sand": { elem1: null, elem2: "wet_sand" },
        "clay_soil": { elem1: null, elem2: "clay" },
        "seltzer": { elem1: "soda", elem2: "foam" },
        "carbon_dioxide": { elem1: "soda", elem2: "foam" },
        "milk": { elem1: "fruit_milk", elem2: "fruit_milk" },
        "yeast": { elem1: ["wine","wine","wine","wine","wine","wine","wine","wine","wine","wine","wine","wine","wine","wine","wine","wine","wine","wine","wine","cream_of_tartar"], elem2: null, chance:80 },
    },
    tempHigh: 160,
    stateHigh: ["steam","sugar"],
    tempLow: -10,
    stateLowColorMultiplier: 1.1,
    category: "liquids",
    state: "liquid",
    density: 1054,
    hidden: true,
    isFood: true
};

elements.cream_of_tartar = {
    color: ["#EFEFEF", "#EBEBEB", "#D8D8D6"],
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    density: 1500,
    isFood: true,
    hidden: true,
    reactions: {
        "sugar_water": {elem2: "corn_syrup", elem1: null, tempMin: 80},
        "carbonic_acid": {elem1: null, elem2: "carbon_dioxide"}
    }
}

elements.corn_syrup = {
    color: ["#FFCD0C", "#E47F00", "#FEB003"],
    behavior: behaviors.LIQUID,
    category: "food",
    state: "liquid",
    tempHigh: 100,
    stateHigh: "caramel",
    isFood: true,
    hidden: true,
    viscosity: 10000
}

if (!elements.baking_soda.reactions) elements.baking_soda.reactions = {};
elements.baking_soda.reactions.water = { elem1: "carbonic_acid", elem2: "carbonic_acid" }

elements.carbonic_acid = {
    color: ["#E0DEA5", "#DFDB9C", "#EBE8BC"],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    hidden: true,
}

elements.wine = {
    color: ["#6F0013", "#6D0112"],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    tempHigh: 100,
    stateHigh: "steam",
    isFood: true,
    density: 1000,
    hidden: true,
    tempLow: 0
}

elements.shrimp = {
    color: ["#EE5422", "#E9683C", "#F3583F", "#EDA270"],
    behavior: [
        "SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%14|M2%7.5 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%5|SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%14",
        "SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%14|FX%20|SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%14",
        "M2 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%15|M1|M2 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%15",
    ],
    category: "life",
    state: "solid",
    reactions: {
        "algae": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "plant": { elem2:null, chance:0.125, func:behaviors.FEEDPIXEL },
        "fly": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "firefly": { elem2:null, chance:0.6, func:behaviors.FEEDPIXEL },
        "worm": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "tadpole": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.5 },
        "dead_bug": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "broth": { elem2:"water", chance:0.2, func:behaviors.FEEDPIXEL },
        "slug": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "herb": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "lettuce": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "dead_plant": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "lichen": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "yeast": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "yogurt": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "tea": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "meat": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "rotten_meat": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "cooked_meat": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "yolk": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "cell": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "crumb": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
    },
}


elements.coconut_seed = {
    color: "#7a603d",
    tick: function(pixel) {
            if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1) && pixel.height < 7) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "coconut_stem" : "coconut_stem",pixel.x,pixel.y+1);
                    
                    pixel.height++
                }
            }
            else if (pixel.age > 150 && pixel.height > 6 && Math.random() < 0.1) {
                changePixel(pixel,"coconut_tree_top");
            }
            pixel.age++;
        doDefaults(pixel);
    },
    properties: {
        "age":0,
        "height": 0
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
};

elements.coconut_stem = {
    color: "#8f6c3f",
    behavior: behaviors.WALL,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "solids",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    breakIntoColor: ["#dba66e","#cc8a64"],
    hidden: true
}
elements.coconut_tree_top = {
    color: "#8f6c3f",
    behavior: behaviors.WALL,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "solids",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    breakIntoColor: ["#dba66e","#cc8a64"],
    properties:{
        "leftleaves": 0,
        "rightleaves": 0,
    },
    hidden: true,
    tick: function(pixel) {
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.rightleaves == 0) {
            if (isEmpty(pixel.x+1,pixel.y)) {
                createPixel(Math.random() > 0.5 ? "coconut_leaves" : "coconut_leaves",pixel.x+1,pixel.y);

                pixel.rightleaves++
            }
        }
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.rightleaves == 1) {
            if (isEmpty(pixel.x+2,pixel.y)) {
                createPixel(Math.random() > 0.5 ? "coconut_leaves" : "coconut_leaves",pixel.x+2,pixel.y);

                pixel.rightleaves++
            }
        }
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.rightleaves == 2) {
            if (isEmpty(pixel.x+3,pixel.y)) {
                createPixel(Math.random() > 0.5 ? "coconut_leaves" : "coconut_leaves",pixel.x+3,pixel.y);

                pixel.rightleaves++
            }
        }
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.rightleaves == 3) {
            if (isEmpty(pixel.x+4,pixel.y+1)) {
                createPixel(Math.random() > 0.5 ? "coconut_leaves" : "coconut_leaves",pixel.x+4,pixel.y+1);

                pixel.rightleaves++
            }
        }


        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.leftleaves == 0) {
            if (isEmpty(pixel.x-1,pixel.y)) {
                createPixel(Math.random() > 0.5 ? "coconut_leaves" : "coconut_leaves",pixel.x-1,pixel.y);

                pixel.leftleaves++
            }
        }
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.leftleaves == 1) {
            if (isEmpty(pixel.x-2,pixel.y)) {
                createPixel(Math.random() > 0.5 ? "coconut_leaves" : "coconut_leaves",pixel.x-2,pixel.y);

                pixel.leftleaves++
            }
        }
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.leftleaves == 2) {
            if (isEmpty(pixel.x-3,pixel.y)) {
                createPixel(Math.random() > 0.5 ? "coconut_leaves" : "coconut_leaves",pixel.x-3,pixel.y);

                pixel.leftleaves++
            }
        }
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.leftleaves == 3) {
            if (isEmpty(pixel.x-4,pixel.y+1)) {
                createPixel(Math.random() > 0.5 ? "coconut_leaves" : "coconut_leaves",pixel.x-4,pixel.y+1);

                pixel.leftleaves++
            }
        }


        if (Math.random() < 0.1 && pixel.age > 70 && pixel.temp < 100 && pixel.leftleaves > 0 && pixel.rightleaves > 0) {
            if (isEmpty(pixel.x+1,pixel.y+1)) {
                createPixel(Math.random() > 0.5 ? "coconut" : "coconut",pixel.x+1,pixel.y+1);
            }
        }
        if (Math.random() < 0.1 && pixel.age > 70 && pixel.temp < 100 && pixel.leftleaves > 0 && pixel.rightleaves > 0) {
            if (isEmpty(pixel.x-1,pixel.y+1)) {
                createPixel(Math.random() > 0.5 ? "coconut" : "coconut",pixel.x-1,pixel.y+1);
            }
        }
        pixel.age++;
    doDefaults(pixel);
},
}
elements.coconut_leaves = {
    color: ["#569923","#5ea12b"],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    hidden: true
}
elements.coconut = {
    color: "#6e4621",
    behavior: [
        "ST:coconut_tree_top|ST:coconut_leaves|ST:coconut_tree_top",
        "ST:coconut_stem|XX|ST:coconut_stem",
        "M2|M1|M2",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "coconut_milk",
    cutInto: ["cut_coconut"],
    state: "solid",
    density: 1050,
}

elements.coconut_milk = {
    color: "#fffcf2",
    behavior: behaviors.LIQUID,
    reactions: {
        "melted_chocolate": { elem1:"chocolate_milk", elem2:null },
        "chocolate": { elem1:"chocolate_milk", elem2:"melted_chocolate", chance:0.05 },
        "juice": { elem1:"fruit_milk", elem2:null, chance:0.05 },
        "soda": { elem1:"pilk", elem2:null, chance:0.1 },
        "yolk": { elem1:"eggnog", elem2:null, chance:0.1 },
        "dirt": { elem1: null, elem2: "mud" },
        "sand": { elem1: null, elem2: "wet_sand" },
        "clay_soil": { elem1: null, elem2: "clay" },
        "caramel": { color1:"#C8B39A", elem2:null, chance:0.05 },
        "sugar": { elem2:null, chance:0.005},
    },
    tempLow: 0,
    stateLow: "ice_cream",
    stateLowColorMultiplier: [0.97,0.93,0.87],
    tempHigh: 93,
    stateHigh: "yogurt",
    viscosity: 1.5,
    category: "liquids",
    state: "liquid",
    density: 825,
    isFood: true
}

elements.tea.reactions.coconut_milk = { elem2:null, color1:"#ad8955", chance:0.005}
elements.coffee.reactions.coconut_milk = { elem2:"foam", color1:"#856545", chance:0.005}

elements.cut_coconut = {
    color: "#fff2cf",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "coconut_juice",
    state: "solid",
    density: 1050,
    hidden: true,
}

elements.coconut_juice = {
    color: "#e9ebe4",
    behavior: behaviors.LIQUID,
    reactions: {
        "dirt": { elem1: null, elem2: "mud" },
        "sand": { elem1: null, elem2: "wet_sand" },
        "clay_soil": { elem1: null, elem2: "clay" },
        "caramel": { color1:"#C8B39A", elem2:null, chance:0.05 },
    },
    tempLow: 0,
    tempHigh: 93,
    stateHigh: ["sugar","steam"],
    viscosity: 1.5,
    category: "liquids",
    state: "liquid",
    density: 1036.86,
    hidden: true,
    isFood: true
}

elements.lemon_wood = {
    color: "#786531",
    behavior: behaviors.WALL,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "solids",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    breakIntoColor: ["#dba66e","#cc8a64"],
}
elements.lemon_branch = {
    color: "#786531",
    behavior: [
        "CR:lemon_leaves,lemon_branch%2|CR:lemon_leaves,lemon_leaves,lemon_leaves,lemon_branch%2|CR:lemon_leaves,lemon_branch%2",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tempHigh: 100,
    stateHigh: "lemon_wood",
    tempLow: -30,
    stateLow: "lemon_wood",
    category: "life",
    burn: 40,
    burnTime: 50,
    burnInto: ["sap","ember","charcoal"],
    hidden: true,
    state: "solid",
    density: 1500,
    hardness: 0.15,
    breakInto: ["sap","sawdust"],
    hidden: true,
}
elements.lemon_leaves = {
    color: ["#42b336","#46a83b"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|CR:lemon%0.15|XX",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035}
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    seed: "lemon_seed",
    hidden: true
}
elements.lemon = {
    color: ["#dbd937","#e0dd28"],
    behavior: behaviors.POWDER,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "sugar": { elem1:"marmalade", elem2:null, color1:"#e0bf2b", chance:0.35 }
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "lemon_juice",
    state: "solid",
    density: 1050,
    isFood: true,
    cutInto: ["lemon_zest","lemon_slice","lemon_slice","lemon_slice","lemon_slice"],
}

elements.lemon_juice = {
    color: "#e0d358",
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    hidden: true,
    tempLow: 0,
    reactions: {
        "sugar": {elem1:"lemonade", elem2: "null", chance:0.35}
    }
};

elements.lemonade = {
    color: "#fff378",
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    hidden: true,
    tempLow: 0
};

elements.lemon_zest = {
    color: "#dbc535",
    behavior: behaviors.POWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: ["sugar","steam"],
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    state: "solid",
    density: 1050,
    hidden: true,
    reactions: {
        "sugar": { elem1:"marmalade", elem2:null, color1:"#e0bf2b", chance:0.35 }
    },
}

elements.lemon_slice = {
    color: "#ebe431",
    behavior: behaviors.STURDYPOWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: ["sugar","steam"],
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "lemon_juice",
    state: "solid",
    density: 1050,
    hidden: true,
    reactions: {
        "sugar": { elem1:"marmalade", elem2:null, color1:"#e0bf2b", chance:0.35 }
    },
}

elements.lemon_seed = {
    color: "#854610",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "lemon_wood" : "lemon_branch",pixel.x,pixel.y+1);
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"lemon_wood");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|FX%10|XX",
        "XX|M1|XX",
    ],
};


elements.carrot_seed = {
    color: "#b08d35",
    tick: function(pixel) {
            if (Math.random() < 0.1 && pixel.age > 100 && pixel.temp < 100 && pixel.leafgrown == true && pixel.growthpixel == 0) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var randomNumber1 = Math.round(Math.random())
                    pixel.growthpixel = pixel.growthpixel+randomNumber1
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        deletePixel(pixel.x,pixel.y+1);
                        movePixel(pixel,pixel.x,pixel.y+1);
                        createPixel("carrot_leaves",pixel.x,pixel.y-1);
                        pixel.growthpixel++;
                    }
                }
            }
            if (Math.random() < 0.1 && pixel.age > 100 && pixel.temp < 100 && pixel.leafgrown == true && pixel.growthpixel > 0 && pixel.growthpixel < 4) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        deletePixel(pixel.x,pixel.y+1);
                        movePixel(pixel,pixel.x,pixel.y+1);
                        createPixel("carrot",pixel.x,pixel.y-1);
                        pixel.growthpixel++;
                    }
                }
            }
            if (!isEmpty(pixel.x,pixel.y+1) && Math.random() > 0.95 && isEmpty(pixel.x-1,pixel.y-1) && isEmpty(pixel.x+1,pixel.y-1) && pixel.leafgrown == false) {
                if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                    createPixel("carrot_leaves",pixel.x-1,pixel.y-1);
                    createPixel("carrot_leaves",pixel.x+1,pixel.y-1);
                    pixel.leafgrown++
                }
            }
            else if (pixel.age > 150 && pixel.growthpixel == 4 && Math.random() < 0.1) {
                changePixel(pixel,"carrot");
            }
            pixel.age++;
        doDefaults(pixel);
    },
    properties: {
        "age":0,
        "growthpixel": 0,
        "leafgrown": false
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
};
elements.carrot_leaves = {
    color: ["#61cc3d","#58c234"],
    behavior: behaviors.WALL,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035}
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    seed: "carrot_seed",
    hidden: true
}
elements.carrot = {
    color: "#e39919",
    behavior: behaviors.STURDYPOWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: ["steam"],
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "carrot_juice",
    state: "solid",
    density: 1050,
    hidden: true,
}

elements.carrot_juice = {
    color: "#f5a742",
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    tempLow: 0,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
};

elements.apple_cider_vinegar = {
    color: "#fffe75",
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    tempLow: 0
};

elements.turnip_seed = {
    color: "#994828",
    tick: function(pixel) {
            if (Math.random() < 0.1 && pixel.age > 100 && pixel.temp < 100 && pixel.leafgrown == true && pixel.growthpixel == 0) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        deletePixel(pixel.x,pixel.y+1);
                        movePixel(pixel,pixel.x,pixel.y+1);
                        createPixel("turnip_leaves",pixel.x,pixel.y-1);
                        pixel.growthpixel++;
                    }
                }
                
            }
            if (pixel.age > 100 && pixel.temp < 100 && pixel.leafgrown == true && pixel.growthpixel > 0 && pixel.growthpixel < 3) {
                if (!outOfBounds(pixel.x-1,pixel.y)) {
                    var pixelleft = pixelMap[pixel.x-1][pixel.y];
                    if (pixelleft.element === "dirt" || pixelleft.element === "mud" || pixelleft.element === "sand" || pixelleft.element === "wet_sand" || pixelleft.element === "clay_soil" || pixelleft.element === "mycelium") {
                        deletePixel(pixel.x-1,pixel.y);
                        createPixel("turnip",pixel.x-1,pixel.y);
                    }
                }
                if (!outOfBounds(pixel.x+1,pixel.y)) {
                    var pixelright = pixelMap[pixel.x+1][pixel.y];
                    if (pixelright.element === "dirt" || pixelright.element === "mud" || pixelright.element === "sand" || pixelright.element === "wet_sand" || pixelright.element === "clay_soil" || pixelright.element === "mycelium") {
                        deletePixel(pixel.x+1,pixel.y);
                        createPixel("turnip",pixel.x+1,pixel.y);
                    }
                }
            }
            if (Math.random() < 0.1 && pixel.age > 100 && pixel.temp < 100 && pixel.leafgrown == true && pixel.growthpixel > 0 && pixel.growthpixel < 3) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        deletePixel(pixel.x,pixel.y+1);
                        movePixel(pixel,pixel.x,pixel.y+1);
                        createPixel("turnip",pixel.x,pixel.y-1);
                        pixel.growthpixel++;
                    }
                }
                
            }
            if (!isEmpty(pixel.x,pixel.y+1) && Math.random() > 0.95 && isEmpty(pixel.x-1,pixel.y-1) && isEmpty(pixel.x+1,pixel.y-1) && pixel.leafgrown == false) {
                var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                    createPixel("turnip_leaves",pixel.x-1,pixel.y-1);
                    createPixel("turnip_leaves",pixel.x+1,pixel.y-1);
                    pixel.leafgrown++
                }
            }
            else if (pixel.age > 150 && pixel.growthpixel == 3 && Math.random() < 0.1) {
                changePixel(pixel,"turnip");
            }
            pixel.age++;
        doDefaults(pixel);
    },
    properties: {
        "age":0,
        "growthpixel": 0,
        "leafgrown": false
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
};
elements.turnip_leaves = {
    color: ["#399431","#3b8c34"],
    behavior: behaviors.WALL,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035}
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    seed: "turnip_seed",
    hidden: true
}
elements.turnip = {
    color: ["#945bb3","#a05cbd","#a053b8","#b364c4"],
    behavior: behaviors.POWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: ["steam"],
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "turnip_juice",
    state: "solid",
    density: 1050,
    hidden: true,
}

elements.turnip_juice = {
    color: "#700f5d",
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    tempLow: 0,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
};

elements.corn = {
    color: ["#f8d223","#d6ba2a","#f7f5ba","#dbd281","#cdb12d"],
    tick: function(pixel) {
        if (pixel.temp >= 180) {
            changePixel(pixel,"popcorn");
            if (isEmpty(pixel.x,pixel.y-1)) {
                tryMove(pixel,pixel.x,pixel.y-1);
                if (isEmpty(pixel.x-1,pixel.y)) { createPixel("pop",pixel.x-1,pixel.y) }
                if (isEmpty(pixel.x+1,pixel.y)) { createPixel("pop",pixel.x+1,pixel.y) }
                if (isEmpty(pixel.x,pixel.y-1)) { createPixel("pop",pixel.x,pixel.y-1) }
                if (isEmpty(pixel.x,pixel.y+1)) { createPixel("pop",pixel.x,pixel.y+1) }
            }
        }
        doDefaults(pixel)
    },
    category: "food",
    burn: 10,
    burnTime: 200,
    breakInto: "corn_starch",
    breakIntoColor: ["#ffe9a8","#ffecb3","#ffe28a"],
    state: "solid",
    density: 721,
    seed: "corn_seed",
    isFood: true,
    movable: false,
}

elements.corn_starch = {
    color: ["#fcf2e1","#f2e7d3","#fcf3de"],
    behavior: behaviors.POWDER,
    reactions: {
        "water": { elem1: "dough", elem2: null },
        "salt_water": { elem1: "dough", elem2: null },
        "sugar_water": { elem1: "dough", elem2: null },
        "seltzer": { elem1: "dough", elem2: null },
        "pool_water": { elem1: "dough", elem2: null },
        "juice": { elem1: "dough", elem2: null },
        "yolk": { elem1: "batter", elem2: null },
        "yogurt": { elem1: "batter", elem2: null },
        "broth": { elem1:"dough", elem2:null },
        "soda": { elem1:"dough", elem2:null },
        "tea": { elem1:"dough", elem2:null },
        "blood": { elem1:"dough", elem2:null },
        "infection": { elem1:"dough", elem2:null },
        "antibody": { elem1:"dough", elem2:null },
        "milk": { elem1:"dough", elem2:null },
        "cream": { elem1:"dough", elem2:null },
        "melted_butter": { elem1:"sauce", elem2:null, color1:"#DF8D32" },
    },
    category: "food",
    tempHigh: 400,
    stateHigh: "fire",
    burn:40,
    burnTime:25,
    state: "solid",
    density: 600,
    isFood: true
}

elements.baking_powder = {
	color: "#fffaf0",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
    burn: 40,
    tempHigh: 400,
    stateHigh: ["salt","carbon_dioxide"],
    burnTime: 25,
    density: 600,
    isFood: true,
	reactions: {
        "flour": { elem1: "pancake_mix", elem2: null, color1: "#e8b77b"},
    },
};

if (!elements.baking_soda.reactions) elements.baking_soda.reactions = {};
elements.baking_soda.reactions.neutral_acid = { elem1: "baking_powder", elem2: null }

elements.pancake_mix = {
    color: ["#f2e9c7","#f7ebbe"],
    behavior: behaviors.POWDER,
    reactions: {
        "water": { elem1: "pancake_batter", elem2: null },
    },
    category: "food",
    tempHigh: 400,
    stateHigh: "fire",
    burn:40,
    burnTime:25,
    state: "solid",
    density: 600,
    isFood: true
},

elements.pancake_batter = {
    color: "#e6da9e",
    behavior: behaviors.LIQUID,
    category: "food",
    tempHigh: 70,
    stateHigh: "pancake",
    stateHighColorMultiplier: 0.9,
    burn:40,
    burnTime:25,
    burnInto:"ash",
    state: "liquid",
    viscosity: 10000,
    density: 1001,
    hidden: true,
    isFood: true
}
elements.sap = {
    color: ["#b67f18","#c86305","#cf7a19","#e4ae3a"],
    behavior: behaviors.LIQUID,
    reactions: {
        "dead_bug": { elem1:"amber", elem2:null, chance:0.1 },
        "ant": { elem1:"amber", elem2:null, chance:0.1 },
        "fly": { elem1:"amber", elem2:null, chance:0.1 },
        "flea": { elem1:"amber", elem2:null, chance:0.1 },
        "termite": { elem1:"amber", elem2:null, chance:0.1 },
        "worm": { elem1:"amber", elem2:null, chance:0.1 },
        "bee": { elem1:"amber", elem2:null, chance:0.1 },
        "firefly": { elem1:"amber", elem2:null, chance:0.1 },
        "stinkbug": { elem1:"amber", elem2:null, chance:0.1 },
        "slug": { elem1:"amber", elem2:null, chance:0.1 },
        "snail": { elem1:"amber", elem2:null, chance:0.1 },
    },
    tempHigh: 104,
    stateHigh: ["maple_syrup","maple_syrup","maple_syrup","sap"],
    tempLow: 0,
    stateLowName: "amber",
    category:"liquids",
    state: "liquid",
    viscosity: 15,
    density: 1400
}
elements.maple_syrup = {
    color: ["#fabb34","#facc34","#fabb34"],
    behavior: behaviors.LIQUID,
    tempHigh: 170,
    stateHigh: ["sugar","smoke","smoke"],
    tempLow: 0,
    category:"liquids",
    state: "liquid",
    viscosity: 15,
    hidden: true,
    density: 1400
}
elements.pancake = {
    color: "#e0d080",
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 95,
    stateHigh: "crispy_pancake",
    category: "food",
    burn: 10,
    burnTime: 400,
    burnInto: ["smoke","smoke","smoke","ash"],
    breakInto: "crumb",
    state: "solid",
    density: 233.96,
    hidden: true,
    isFood: true
}
elements.crispy_pancake = {
    color: "#c7a34a",
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 150,
    stateHigh: "burnt_pancake",
    category: "food",
    burn: 10,
    burnTime: 400,
    burnInto: ["smoke","smoke","smoke","ash"],
    breakInto: "crumb",
    state: "solid",
    density: 233.96,
    hidden: true,
    isFood: true
}
elements.burnt_pancake = {
    color: "#332709",
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 550,
    stateHigh: "ash",
    category: "food",
    burn: 10,
    burnTime: 400,
    burnInto: ["smoke","smoke","smoke","ash"],
    breakInto: "crumb",
    state: "solid",
    density: 233.96,
    hidden: true,
    isFood: true
}
elements.strawberry_seed = {
    color: "#7a7133",
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(pixel,"strawberry_stem");
                    }
                }
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    cooldown: defaultCooldown
}
elements.strawberry_stem = {
    color: "#419c2f",
    behavior: [
        "CR:strawberry_stem,strawberry_leaves,strawberry_leaves,strawberry_leaves,strawberry_leaves%3|CR:strawberry_stem,strawberry_leaves,strawberry_leaves,strawberry_leaves,strawberry_leaves%3|CR:strawberry_stem,strawberry_leaves,strawberry_leaves,strawberry_leaves,strawberry_leaves%3",
        "CR:strawberry_stem,strawberry_leaves,strawberry_leaves,strawberry_leaves,strawberry_leaves%3|XX|CR:strawberry_stem,strawberry_leaves,strawberry_leaves,strawberry_leaves,strawberry_leaves%3",
        "XX|M1|XX",
    ],
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
    },
    properties: {
        "age":0
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
}
elements.strawberry_leaves = {
    color: "#4bad37",
    behavior: [
        "XX|CR:strawberry%2|XX",
        "CR:strawberry%2|XX|CR:strawberry%2",
        "M2|M1|M2",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050
}
elements.strawberry = {
    color: "#f04b3c",
    behavior: [
        "XX|ST:strawberry_stem,strawberry_leaves|XX",
        "ST:strawberry_stem,strawberry_leaves|XX|ST:strawberry_stem,strawberry_leaves",
        "M2|M1|M2",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "strawberry_juice",
    state: "solid",
    density: 1050
}
elements.strawberry_juice = {
    color: "#e03a3a",
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    tempLow: 0,
    reactions: {
        "sugar": { elem1:"strawberry_jam", elem2:null, chance:0.35 },
    },
};

elements.cream = {
    color: "#f7f7f7",
    behavior: behaviors.LIQUID,
    onMix: function(cream1, cream2) {
        if ((shiftDown && Math.random() < 0.01) || (elements[cream2.element].id === elements.cream.id && Math.random() < 0.1)) {
            changePixel(cream1,"whipped_cream")
        }
    },
    reactions: {
        "dirt": { elem1: null, elem2: "mud" },
        "sand": { elem1: null, elem2: "wet_sand" },
        "clay_soil": { elem1: null, elem2: "clay" },
        "melted_chocolate": { color1:"#664934", elem2:null },
        "chocolate": { color1:"#664934", elem2:"melted_chocolate", chance:0.05 },
        "juice": { elem1:"fruit_milk", elem2:null, chance:0.05 },
        "soda": { elem1:"pilk", elem2:null, chance:0.1 },
        "yolk": { elem1:"#eggnog", elem2:null, chance:0.1 },
        "caramel": { color1:"#C8B39A", chance:0.05 },
        "sugar": { elem2:null, chance:0.005},
    },
    viscosity: 1.5,
    tempHigh: 1000,
    stateHigh: ["smoke","smoke","smoke","steam","steam","calcium"],
    tempLow: 0,
    stateLow: "ice_cream",
    stateLowColorMultiplier: 0.97,
    category: "liquids",
    hidden: true,
    isFood: true,
    state: "liquid",
    density: 959.97,
}
elements.whipped_cream = {
    color: "#fafafa",
    behavior: behaviors.LIQUID,
    reactions: {
        "dirt": { elem1: null, elem2: "mud" },
        "sand": { elem1: null, elem2: "wet_sand" },
        "clay_soil": { elem1: null, elem2: "clay" },
        "melted_chocolate": { color1:"#664934", elem2:null },
        "chocolate": { color1:"#664934", elem2:"melted_chocolate", chance:0.05 },
        "juice": { elem1:"fruit_milk", elem2:null, chance:0.05 },
        "soda": { elem1:"pilk", elem2:null, chance:0.1 },
        "yolk": { elem1:"#eggnog", elem2:null, chance:0.1 },
        "caramel": { color1:"#C8B39A", chance:0.05 },
        "sugar": { elem2:null, chance:0.005},
    },
    viscosity: 1.5,
    tempHigh: 1000,
    stateHigh: ["smoke","smoke","smoke","steam","steam","calcium"],
    tempLow: 0,
    stateLow: "ice_cream",
    stateLowColorMultiplier: 0.97,
    category: "food",
    hidden: true,
    isFood: true,
    state: "liquid",
    density: 959.97,
    viscosity: 2500000
}

elements.ginger = {
    color: ["#b88f30","#d6a73a"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2 AND CH:dirt,mud,sand,wet_sand,clay_soil,clay,mycelium,grass,color_sand>ginger,fiber%0.5|M1 AND CH:dirt,mud,sand,wet_sand,clay_soil,clay,mycelium,grass,color_sand>ginger,fiber,fiber%0.5|M2 AND CH:dirt,mud,sand,wet_sand,clay_soil,clay,mycelium,grass,color_sand>ginger,fiber%0.5",
    ],
    reactions: {
        "flour": { elem1:"gingerbread", elem2:null },
        "bread": { elem1:"gingerbread", elem2:null },
    },
    tempHigh: 275,
    stateHigh: "dirt",
    tempLow: -50,
    stateLow: "fiber",
    burn: 20,
    burnTime: 60,
    burnInto: "dirt",
    breakInto: "ginger_juice",
    category: "food",
    state: "solid",
    density: 1250,
    conduct: 0.1,
    hidden: true
}

elements.ginger_rhizome = {
    color: "#c7ad58",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"ginger");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel("ginger_pseudostem",pixel.x,pixel.y+1);
                }
                if (isEmpty(pixel.x+1,pixel.y) && Math.random() < 0.2) {
                    createPixel("ginger_leaves",pixel.x+1,pixel.y);
                }
                if (isEmpty(pixel.x-1,pixel.y) && Math.random() < 0.2) {
                    createPixel("ginger_leaves",pixel.x-1,pixel.y);
                }
            }
            else if (pixel.age > 250) {
                changePixel(pixel,"ginger_leaves");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    breakInto: "ginger_juice",
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|FX%10|XX",
        "XX|M1|XX",
    ],
    reactions: {
        "flour": { elem1:"gingerbread", elem2:null },
        "bread": { elem1:"gingerbread", elem2:null },
    },
};

elements.ginger_pseudostem = {
    color: "#69a82d",
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050
}
elements.ginger_leaves = {
    color: "#52bd31",
    behavior: behaviors.WALL,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
        "carbon_dioxide": { elem2:"oxygen", chance:0.25 },
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050
}
elements.ginger_juice = {
    color: "#ccc056",
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    tempLow: 0,
    reactions: {
        "flour": { elem1:"gingerbread", elem2:null },
        "bread": { elem1:"gingerbread", elem2:null },
    },
};


elements.blueberry_seed = {
    color: "#7a7133",
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(pixel,"blueberry_stem");
                    }
                }
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    cooldown: defaultCooldown
}
elements.blueberry_stem = {
    color: "#419c2f",
    behavior: [
        "CR:blueberry_stem,blueberry_leaves,blueberry_leaves,blueberry_leaves,blueberry_leaves%3|CR:blueberry_stem,blueberry_leaves,blueberry_leaves,blueberry_leaves,blueberry_leaves%3|CR:blueberry_stem,blueberry_leaves,blueberry_leaves,blueberry_leaves,blueberry_leaves%3",
        "CR:blueberry_stem,blueberry_leaves,blueberry_leaves,blueberry_leaves,blueberry_leaves%3|XX|CR:blueberry_stem,blueberry_leaves,blueberry_leaves,blueberry_leaves,blueberry_leaves%3",
        "XX|M1|XX",
    ],
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
    },
    properties: {
        "age":0
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
}
elements.blueberry_leaves = {
    color: "#4bad37",
    behavior: [
        "XX|CR:blueberry%2|XX",
        "CR:blueberry%2|XX|CR:blueberry%2",
        "M2|M1|M2",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050
}
elements.blueberry = {
    color: "#5d4bc4",
    behavior: [
        "XX|ST:blueberry_stem,blueberry_leaves|XX",
        "ST:blueberry_stem,blueberry_leaves|XX|ST:blueberry_stem,blueberry_leaves",
        "M2|M1|M2",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "blueberry_juice",
    state: "solid",
    density: 1050,
    cutInto: "cut_blueberry"
}
elements.blueberry_juice = {
    color: "#5030a1",
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    tempLow: 0,
    reactions: {
        "sugar": { elem1:"blueberry_jam", elem2:null, chance:0.35 },
        "milk": { elem1:"fruit_milk", elem2:null, chance:0.35, color1: "#995fb3" },
    },
};
/*
elements.fruit_slushie = {
    color: "#ffcc54",
    behavior: behaviors.LIQUID,
    reactions: {
        "dirt": { elem1: null, elem2: "mud" },
        "sand": { elem1: null, elem2: "wet_sand" }
    },
    temp: -5,
    tempHigh: 18,
    tempLow: -20,
    stateLow: "ice",
    stateHigh: "water",
    category: "food",
    state: "liquid",
    density: 95,
    viscosity: 100,
    hidden: true
}
*/

elements.strawberry_jam = {
    color: "#c73c3e",
    behavior: behaviors.LIQUID,
    category: "food",
    tempHigh: 400,
    stateHigh: ["sugar","smoke"],
    burn: 70,
    burnTime: 300,
    viscosity: 750,
    state: "liquid",
    density: 825,
    hidden: true
};
elements.blueberry_jam = {
    color: "#281C4B",
    behavior: behaviors.LIQUID,
    category: "food",
    tempHigh: 400,
    stateHigh: ["sugar","smoke"],
    burn: 70,
    burnTime: 300,
    viscosity: 750,
    state: "liquid",
    density: 825,
    hidden: true
};
elements.cut_blueberry = {
    color: "#d4ed8a",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "blueberry_juice",
    state: "solid",
    density: 1050,
    hidden: true
}

if (!elements.yeast.reactions) elements.yeast.reactions = {};
elements.yeast.reactions.flour = { elem1: "advanced_dough", elem2: null }

elements.advanced_dough = {
    color: "#c49f58",
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "milk": { elem2:"broth", color2:"#ECC891", tempMin:70 },
        "cream": { elem2:"broth", color2:"#ECC891", tempMin:70 },
    },
    category: "food",
    tempHigh: 94,
    stateHigh: "bread",
    stateHighColorMultiplier: 0.9,
    burn:40,
    burnTime:25,
    burnInto:"ash",
    state: "solid",
    density: 526.9,
    isFood: true,
    hidden: true
}

if (!elements.melted_chocolate.reactions) elements.melted_chocolate.reactions = {};
elements.melted_chocolate.reactions.flour = { elem1: "cookie_dough", elem2: null }

elements.cookie_dough = {
    color: ["#946826","#9e783f","#8a6d41","#614925"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    tempHigh: 94,
    stateHigh: "cookie",
    stateHighColorMultiplier: 0.8,
    burn:40,
    burnTime:25,
    burnInto:"ash",
    state: "solid",
    density: 526.9,
    isFood: true,
    hidden: true
}

elements.cookie = {
    color: "#7d5f2e",
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 605,
    stateHigh: "ash",
    category: "food",
    burn: 30,
    burnTime: 200,
    burnInto: ["smoke","smoke","smoke","ash"],
    breakInto: "crumb",
    breakIntoColor: "#7d6216",
    state: "solid",
    density: 233.96,
    isFood: true
}

elements.nut_oil.name = "cooking_oil"

// elements.fire.temp = 130

elements.bread.behavior = behaviors.SUPPORT

elements.toast.behavior = behaviors.SUPPORT

if (!elements.caramel.reactions) elements.caramel.reactions = {};
elements.caramel.reactions.corn_starch = { elem1: "boba_dough", elem2: null, chance: 0.35, tempMin: 70}

elements.boba_dough = {
    color: ["#4a2007","#2b1304"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    tempHigh: 400,
    stateHigh: "ash",
    stateHighColorMultiplier: 0.8,
    burn:40,
    burnTime:25,
    burnInto:"ash",
    state: "solid",
    density: 526.9,
    reactions: {
        "water": { elem1:"boba", tempMin:60},
    },
    isFood: true,
    hidden: true
}

elements.boba = {
    color: "#59290c",
    behavior: behaviors.POWDER,
    tempHigh: 300,
    stateHigh: "fire",
    category: "food",
    burn: 30,
    burnTime: 200,
    burnInto: ["smoke","smoke","smoke","ash"],
    breakIntoColor: "#7d6216",
    state: "solid",
    density: 644,
    isFood: true
}
