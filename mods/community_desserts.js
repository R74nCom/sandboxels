/*
 * Mod created by Tisquares
 * Every dessert idea is provided by the community. 
 * Don't see your favorite dessert? Let me know!
 * 
 * Got questions? Contact tisqbisque on Discord!
 * 
 * This version: 1.1
 */

// Dulce de leche items
elements.dulce_de_leche = {
    alias: "manjar",
    color: ["#c56600","#f7a204","#ca6400","#893604"],
    category: "Community",
    state: "liquid",
    behavior: behaviors.LIQUID,
    reactions: {
        "cream_cheese": { elem1:"dulce_de_leche", elem2:null, color1:["#DFAB73","#fbcc75","#e2aa73","#be9075"], oneway:true }, // for recipe accuracy :3
    },
    tempLow: -20,
    stateLow: "candy",
    tempHigh: 250,
    stateHigh: ["fragrance","smoke","smoke"],
    viscosity: 500,
    stain: 0.02,
    density: 1284.93,
    hidden: true,
    isFood: true,
    desc: "Added in the first version of the mod.\nMade by heating Sweetened Condensed Milk at 175°C+.\nFrom undexconocidox_26419.\n"
}
elements.sweetened_condensed_milk = {
    color: ["#ffe9ba","#fbd396","#fde2a9"],
    category: "Community",
    state: "liquid",
    behavior: behaviors.LIQUID,
    tempLow: 0,
    stateLow: ["ice_cream","sugar"],
    tempHigh: 175,
    stateHigh: "dulce_de_leche",
    viscosity: 5,
    stain: 0.015,
    density: 1050.83,
    hidden: true,
    isFood: true,
    desc: "Added in the first version of the mod.\nMade by mixing Milk and Sugar at 85°C+.\n",
}

// Chocotorta items
elements.cream_cheese = {
    color: ["#ebe9ea","#e4dfdd","#eeeeee"],
    category: "Community",
    state: "solid",
    behavior: behaviors.STURDYPOWDER,
    //reactions: {
        // For future use
    //},
    tempHigh: 65,
    stateHigh: "melted_cheese",
    stateHighColor: ["#fbffff","#f6f6f6"],
    hardness: 0.01,
    density: 980.61,
    hidden: true,
    isFood: true,
    desc: "Added in the first version of the mod.\nMade by mixing Acid with Milk or Cream.\n",
}
elements.cocoa_bean = {
    color: ["#e16f51","#e28e67","#e18550","#84574d"],
    category: "Community",
    state: "solid",
    behavior: behaviors.POWDER,
    // Has no reactions
    breakInto: "cocoa_powder",
    density: 593,
    tempHigh: 179.4,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    // not hidden by default
    // not food don't eat it
    desc: "Added in the first version of the mod.\n",
}
elements.cocoa_powder = {
    color: ["#855344","#6d4c41","#40271d"],
    category: "Community",
    state: "solid",
    behavior: behaviors.POWDER,
    onMix: function(powder, doughcheck) {
        if (elements[doughcheck.element].id == elements.dough.id && shiftDown && Math.random() < 0.25) {
            deletePixel(powder.x,powder.y);
            changePixel(doughcheck,"chocolate_biscuit_dough");
        }
    },
    density: 363.5,
    tempHigh: 50,
    stateHigh: "smoke",
    hidden: true,
    isFood: true,
    desc: "Added in the first version of the mod.\nMade by Smashing Cocoa Bean.\n",
}
elements.chocolate_biscuit_dough = {
    color: "#623727",
    category: "Community",
    state: "solid",
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 94,
    stateHigh: "chocolate_biscuit",
    burn: 40,
    burnTime: 25,
    burnInto: "ash",
    density: 526.9,
    isFood: true,
    hidden: true,
    desc: "Added in the first version of the mod.\nMade by hard mixing Cocoa Powder with Dough.\n",
}
elements.chocolate_biscuit = {
    color: "#864B36",
    category: "Community",
    state: "solid",
    behavior: behaviors.STURDYPOWDER,
    breakInto: "crumb",
    breakIntoColor: ["#af8264","#b28461","#aa7852","#a8744b"],
    tempHigh: 232.2,
    stateHigh: ["smoke","smoke","smoke","ash"],
    density: 233.96,
    isFood: true,
    hidden: true,
    desc: "Added in the first version of the mod.\nMade by cooking Choco Biscuit Dough at 94°C+.\nCan be layered with other items to make chocotorta, from undexconocidox_26419.\n",
}

// Haupia items
elements.coconut = {
    color: ["#793b1e","#995c31","#5f3015"],
    category: "Community",
    state: "solid",
    behavior: behaviors.POWDER,
    breakInto: ["coconut_milk","tinder"],
    tempHigh: 225,
    stateHigh: ["steam","ash","smoke"],
    density: 822,
    desc: "Added in the first version of the mod.\n",
}
elements.coconut_milk = {
    color: ["#f3f3f3","#e4ddcb","#f8f8f8"],
    category: "Community",
    state: "liquid",
    behavior: behaviors.LIQUID,
    reactions: {
        "sugar": { elem1:null, elem2:"haupia_mix", tempMin:90 },
    },
    tempHigh: 102,
    stateHigh: "steam",
    tempLow: -0.5,
    stateLowName: "coconut_ice",
    viscosity: 1.8,
    density: 1031.33,
    hidden: true,
    isFood: true,
    desc: "Added in the first version of the mod.\nMade by smashing Coconut.\n",
}
elements.haupia_mix = {
    color: ["#f3f3f3","#e4ddcb","#f8f8f8"],
    category: "Community",
    state: "liquid",
    behavior: behaviors.LIQUID,
    tempHigh: 105,
    stateHigh: "steam",
    tempLow: 3,
    stateLow: "haupia",
    viscosity: 2.3,
    density: 1242.67,
    hidden: true,
    desc: "Added in the first version of the mod.\nMade by mixing Coconut Milk and Sugar at 90°C+.\n",
}
elements.haupia = {
    color: ["#ffffff","#f8f8f8","#f7f9f8"],
    category: "Community",
    state: "solid",
    behavior: behaviors.SUPPORT,
    tempHigh: 105,
    stateHigh: ["steam","fragrance"],
    density: 1300,
    hidden: true,
    isFood: true,
    desc: "Added in the first version of the mod.\nMade by cooling Haupia Mix at 3°C-.\nFrom tisqbisque.\n"
}

// Adjusting existing elements here
elements.milk.reactions = {
    "melted_chocolate": { elem1:"chocolate_milk", elem2:null },
    "chocolate": { elem1:"chocolate_milk", elem2:"melted_chocolate", chance:0.05 },
    "coffee_ground": { elem1:"chocolate_milk", chance:0.05 },
    "juice": { elem1:"fruit_milk", elem2:null, chance:0.05 },
    "soda": { elem1:"pilk", elem2:null, chance:0.1 },
    "yolk": { elem1:"eggnog", elem2:null, chance:0.1 },
    "cell": { elem1:"yogurt", chance:0.1 },
    "ash": { elem1:"soap", chance:0.1 },
    "dirt": { elem1: null, elem2: "mud" },
    "sand": { elem1: null, elem2: "wet_sand" },
    "clay_soil": { elem1: null, elem2: "clay" },
    "caramel": { color1:"#C8B39A", elem2:null, chance:0.05 },
    // Start mod items here
    "sugar": { elem1:"sweetened_condensed_milk", elem2:null, chance:0.05, tempMin:85 },
    "acid": { elem1:null, elem2:"cream_cheese", chance:0.8 },
}

elements.cream.reactions = {
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
    // Start mod items here
    "acid": { elem1:null, elem2:"cream_cheese", chance:0.8 },
}

// Mod items first
elements.acid.ignore = ["cream_cheese","cream","milk",
                        "glass","rad_glass","glass_shard","rad_shard","stained_glass","baked_clay","acid_gas","neutral_acid","acid_cloud","water","salt_water","sugar_water","dirty_water","copper","gold","porcelain","plastic","bead","microplastic","molten_plastic","pool_water","chlorine","hydrogen","gold_coin","silver","nickel","calcium","bone"];