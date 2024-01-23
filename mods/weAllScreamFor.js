/*
A Sandboxels mod dedicated to creating yummy ice cream creations! My first Sandboxels mod.
Made by rottenEgghead @ https://github.com/rottenEgghead

Current elements: Waffle cone, Strawberry, Sprinkles, Chocolate chips, Oreos, M&Ms, Cherries, Banana, Coconut (shavings/water)
Current renamed elements: Chocolate -> Chocolate bar, Nut -> Peanut
Current tools: Freeze

** v.1.0 **
N/A
*/

var mainCat = "food";
var smallDensity = 233.95;
var foodTempHigh = 176;
var defChance = 0.05;

if (!elements.ice_cream.reactions) { elements.ice_cream.reaction = {}; };
elements.ice_cream.temp = -15;
elements.ice_cream.reactions = {
    "strawberry": { color1: ["#f5dad7", "#ffbfbf", "#f7a3a3"], chance: defChance },
    "gingerbread": { color1: ["#f0cbad", "#dec4af"], chance: defChance },
    "coffee": { color1: [], chance: defChance },
    "crumb": { color1: ["#f0cbad", "#dec4af"], chance: defChance },
    "oreo_crumb": { color1: ["#e8e2e1", "#666161", "#8a8888"], chance: defChance },
    "oreo": { color1: ["#e8e2e1", "#666161", "#8a8888"], chance: defChance },
    "mnms": { color1: ["#ebe6e6", "#ebe6e6", "#ffd9d9", "#fffcd9", "#ddffd9", "#d9d9ff"], chance: defChance },
    "nut_butter": { color1: ["#f0ece9", "#f5cd98", "#cfaf84"], chance: defChance },
    "melted_chocolate": { color1: ["#785E4C", "#8c664c", "#b37449"], chance: defChance },
};

elements.chocolate.name = "Chocolate Bar";
elements.chocolate.behavior = behaviors.WALL;
elements.chocolate.breakInto = "chocolate_chips";

elements.coffee.tempLow = -15;
elements.coffee.hidden = false;

elements.nut.name = "Peanut";
elements.nut_butter.name = "Peanut Butter";
elements.nut_meat.name = "Peanut Meat";
elements.nut_milk.name = "Peanut Milk";



/* Tools */
elements.freeze = {
    color: ["#BCE7FF", "#65C7FF", "#BCE7FF", "#65C7FF", "#BCE7FF", "#65C7FF"],
    tool: function (pixel) {
        if (!shiftDown) {
            pixel.temp -= 0.5;
            pixelTempCheck(pixel);
        } else {
            pixel.temp -= 1;
            pixelTempCheck(pixel);
        }
    },
    category: "energy",
    excludeRandom: true,
};



/* Elements */
elements.strawberry = {
    color: "#e63e57",
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    hidden: false,
    isFood: true,

    breakInto: "juice",
    breakIntoColor: "#db4f64",
    stateHigh: ["steam", "sugar"],
    density: 1154,
};
elements.banana = {
    color: ["#F5D273", "#FFE093"],
    behavior: behaviors.STURDYPOWDER,
    category: mainCat,
    state: "solid",
    hidden: false,
    isFood: true,

    tempHigh: 142,
    density: 876,
};
elements.coconut = {
    color: ["#503733", "#402926"],
    behavior: behaviors.WALL,
    category: mainCat,
    state: "solid",
    hidden: false,
    isFood: true,

    tempLow: 0,
    burnInto: "steam",
    breakInto: ["coconut_shavings", "coconut_water", "coconut_water"],
    density: 352,
};
elements.coconut_shavings = {
    color: ["#E7E1DF", "#F5F1F0"],
    behavior: behaviors.POWDER,
    category: mainCat,
    state: "solid",
    hidden: false,
    isFood: true,

    tempLow: 0,
    burnInto: "steam",
    density: 233,
};
elements.coconut_water = {
    color: "#D7E0DF",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    hidden: true,
    isFood: true,

    tempLow: 0,
    burnInto: "steam",
    density: 1000,
};
elements.waffle_cone = {
    color: ["#d49d66", "#bf8449"],
    behavior: behaviors.WALL,
    category: mainCat,
    state: "solid",
    hidden: false,
    isFood: true,

    tempHigh: foodTempHigh,
    burn: 30,
    burnTime: 200,
    burnInto: ["smoke", "smoke", "smoke", "ash"],
    breakInto: "crumb",
    breakIntoColor: "#d49d66",
    density: smallDensity,
};
elements.sprinkles = {
    color: ["#eb726a", "#ebca6a", "#88eb6a", "#6aaceb", "#eb6ade"],
    behavior: behaviors.POWDER,
    category: mainCat,
    state: "solid",
    hidden: false,
    isFood: true,

    tempHigh: foodTempHigh,
    stateHigh: "caramel",
    density: smallDensity,
};
elements.chocolate_chips = {
    color: "#382a20",
    behavior: behaviors.POWDER,
    category: mainCat,
    state: "solid",
    hidden: true,
    isFood: true,

    tempHigh: 31,
    stateHigh: "melted_chocolate",
    density: 1325,
};
elements.oreo = {
    color: "#302c2b",
    behavior: behaviors.STURDYPOWDER,
    category: mainCat,
    state: "solid",
    hidden: false,
    isFood: true,

    tempHigh: foodTempHigh,
    stateHigh: "caramel",
    breakInto: "oreo_crumb",
    density: smallDensity,
};
elements.oreo_crumb = {
    color: "#302c2b",
    behavior: behaviors.POWDER,
    category: mainCat,
    state: "solid",
    hidden: true,
    isFood: true,

    tempHigh: foodTempHigh,
    stateHigh: "caramel",
    density: smallDensity,
};
elements.mnms = {
    name: "M&Ms",
    color: ["#f71f14", "#f2d622", "#2279f2", "#45f222", "#5e3f32"],
    behavior: behaviors.POWDER,
    category: mainCat,
    state: "solid",
    hidden: false,
    isFood: true,

    tempHigh: 31,
    stateHigh: "melted_chocolate",
    density: 1325,
};
elements.cherry = {
    name: "Cherries",
    color: "#ab261d",
    behavior: behaviors.WALL,
    category: mainCat,
    state: "solid",
    hidden: false,
    isFood: true,

    tempHigh: 256,
    stateHigh: ["steam", "sugar"],
    density: 1154,
    breakInto: "jelly",
    breakIntoColor: ["#8c142a", "#800a20"],
};
