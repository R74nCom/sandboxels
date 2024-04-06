/*
 * Mod created by Tisquares
 * Every dessert idea is provided by the community. 
 * Don't see your favorite dessert? Let me know!
 * 
 * Got questions? Contact tisqbisque on Discord!
 */
// Dulce de leche items - BASE COMPLETE
elements.dulce_de_leche = {
    color: ["#c56600","#f7a204","#ca6400","#893604"],
    category: "Community",
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 250,
    stateHigh: ["fragrance","smoke","smoke"],
    hidden: true,
    desc: "Added in the first version of the mod. From undexconocidox_26419.\n"
}
elements.sweetened_condensed_milk = {
    color: ["#ffe9ba","#fbd396","#fde2a9"],
    category: "Community",
    behavior: behaviors.LIQUID,
    tempHigh: 175,
    stateHigh: "dulce_de_leche",
    hidden: true,
    desc: "Added in the first version of the mod. Made by mixing Milk and Sugar at 85°C+.\n",
}

// Chocotorta items - BASE COMPLETE
elements.cream_cheese = {
    color: ["#ebe9ea","#e4dfdd","#eeeeee"],
    category: "Community",
    behavior: behaviors.SUPPORTPOWDER,
    hidden: true,
    desc: "Added in the first version of the mod. Made by mixing Acid with Milk or Cream.\n",
}
elements.cocoa_bean = {
    color: ["#e16f51","#e28e67","#e18550","#84574d"],
    category: "Community",
    behavior: behaviors.STURDYPOWDER,
    breakInto: "cocoa_powder",
    desc: "Added in the first version of the mod.\n",
}
elements.cocoa_powder = {
    color: ["#855344","#6d4c41","#40271d"],
    behavior: behaviors.POWDER,
    onMix: function(powder, doughcheck) {
        if (doughcheck.name == "dough" && shiftDown && Math.random() < 0.01) {
            changePixel(powder,"chocolate_biscuit_dough");
            changePixel(doughcheck,"chocolate_biscuit_dough");
        }
    },
    reactions: {
        "dough": { elem1:null, elem2:"chocolate_biscuit_dough" },
    },
    category: "Community",
    hidden: true,
    desc: "Added in the first version of the mod. Made by Smashing Cocoa Bean.\n",
}
elements.chocolate_biscuit_dough = {
    name: "choco_Biscuit_Dough",
    color: "#623727",
    category: "Community",
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 94,
    stateHigh: "chocolate_biscuit",
    burn: 40,
    burnTime: 25,
    burnInto: "ash",
    state: "solid",
    density: 526.9,
    isFood: true,
    hidden: true,
    desc: "Added in the first version of the mod. Made by mixing Cocoa Powder with Dough.\n",
}
elements.chocolate_biscuit = {
    name: "choco_Biscuit",
    color: "#864B36",
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 550,
    stateHigh: ["smoke","smoke","smoke","ash"],
    breakInto: "crumb",
    state: "solid",
    density: 233.96,
    isFood: true,
    category: "Community",
    hidden: true,
    desc: "Added in the first version of the mod. Made by cooking Choco Biscuit Dough at 94°C+. Can be layered with other items to make chocotorta, from undexconocidox_26419.\n",
}

// Haupia items - BASE COMPLETE
elements.coconut = {
    color: ["#793b1e","#995c31","#5f3015"],
    behavior: behaviors.POWDER,
    breakInto: ["coconut_milk","tinder"],
    category: "Community",
    desc: "Added in the first version of the mod.\n",
}
elements.coconut_milk = {
    color: ["#f3f3f3","#e4ddcb","#f8f8f8"],
    behavior: behaviors.LIQUID,
    category: "Community",
    reactions: {
        "sugar": { elem1:null, elem2:"haupia_mix", tempMin:90 },
    },
    density: 1031.33,
    hidden: true,
    desc: "Added in the first version of the mod. Made by smashing Coconut.\n",
}
elements.haupia_mix = {
    color: ["#f3f3f3","#e4ddcb","#f8f8f8"],
    behavior: behaviors.LIQUID,
    tempLow: 3,
    category: "Community",
    stateLow: "haupia",
    density: 1242.67,
    hidden: true,
    desc: "Added in the first version of the mod. Made by mixing Coconut Milk and Sugar at 90°C+.\n",
}
elements.haupia = {
    color: ["#ffffff","#f8f8f8","#f7f9f8"],
    behavior: behaviors.SUPPORT,
    density: 1300,
    category: "Community",
    hidden: true,
    desc: "Added in the first version of the mod. Made by cooling Haupia Mix at 3°C-. From tisqbisque.\n"
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