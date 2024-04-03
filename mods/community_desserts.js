/*
 * Mod created by Tisquares
 * Every dessert idea is provided by the community. 
 * Don't see your favorite dessert? Let me know!
 * 
 * Got questions? Contact tisqbisque on Discord!
 */
// Dulce de leche items
elements.dulce_de_leche = {
    color: ["#c56600","#f7a204","#ca6400","#893604"],
    category: "Community",
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 250,
    stateHigh: ["fragrance","smoke","smoke"],
    hidden: true,
}
elements.sweetened_condensed_milk = {
    color: ["#ffe9ba","#fbd396","#fde2a9"],
    category: "Community",
    behavior: behaviors.LIQUID,
    tempHigh: 175,
    stateHigh: "dulce_de_leche",
    hidden: true,
}

// Chocotorta items
elements.cream_cheese = {
    color: ["#ebe9ea","#e4dfdd","#eeeeee"],
    category: "Community",
    behavior: behaviors.SUPPORTPOWDER,
    hidden: true,
}
elements.cocoa_bean = {
    color: ["#e16f51","#e28e67","#e18550","#84574d"],
    category: "Community",
    behavior: behaviors.STURDYPOWDER,
    breakInto: "cocoa_powder",
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
    category: "Community",
    hidden: true,
}
elements.chocolate_biscuit_dough = {
    name: "chocoBiscuitDough",
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
}
elements.chocolate_biscuit = {
    name: "chocoBiscuit",
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
}

elements.dough.reactions = {
    "water": { elem1: "dough", elem2: null },
    "salt_water": { elem1: "dough", elem2: null },
    "sugar_water": { elem1: "dough", elem2: null },
    "seltzer": { elem1: "dough", elem2: null },
    "pool_water": { elem1: "dough", elem2: null },
    "juice": { elem1: "dough", elem2: null },
    "vinegar": { elem1: "dough", elem2: null },
    "yolk": { elem1: "batter", elem2: null },
    "yogurt": { elem1: "batter", elem2: null },
    "honey": { elem1:"gingerbread", elem2:null },
    "molasses": { elem1:"gingerbread", elem2:null },
    "sap": { elem1:"gingerbread", elem2:null },
    "caramel": { elem1:"gingerbread", elem2:null },
    "broth": { elem1:"dough", elem2:null },
    "soda": { elem1:"dough", elem2:null },
    "tea": { elem1:"dough", elem2:null },
    "blood": { elem1:"dough", elem2:null },
    "infection": { elem1:"dough", elem2:null },
    "antibody": { elem1:"dough", elem2:null },
    "milk": { elem1:"dough", elem2:null },
    "cream": { elem1:"dough", elem2:null },
    // Start mod items here
    "cocoa_powder": { elem1:"chocolate_biscuit_dough", elem2:null },
}

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