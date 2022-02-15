elements.iron.hardness = 0.74
//https://www.engineeringtoolbox.com/bhn-brinell-hardness-number-d_1365.html
//https://en.wikipedia.org/wiki/Hardnesses_of_the_elements_(data_page)
//"Annealed chissel steel" hardness and then divided by iron hardness (Brinell)
//sqrt()ed like IACS-derived conductivities and scaled to the 0.8 hardness of steel
//and because 1 means infinite hardness, the others are derived using
//1-(0.26/(otherThingBHN/200))
//it doesn't matter much anyway but I'd like to have some semblance/veneer of accuracy

//Copper exists

elements.ruthenium = {
    color: ["#e8ebca","#eaebd5"], //color pulled from my ass because I don't want another gray metal
    behavior: behaviors.WALL,
    tempHigh: 2334,
    category: "solids",
    density: 12450,
    conduct: 0.45,
    hardness: 0.97593,
},

elements.molten_ruthenium = {
    density: 10650,
},

elements.rhodium = {
    color: ["#f0e4df","#f7eae4"], //it looked slightly reddish on Wikipedia
    behavior: behaviors.WALL,
    tempHigh: 1964,
    category: "solids",
    density: 12410,
    conduct: 0.59,
    hardness: 0.94694,
},

elements.molten_rhodium = {
    density: 10700,
},

elements.palladium = {
    color: ["#fff8ed","#f5e6ce","#faeccf"], //Terraria reference
    behavior: behaviors.WALL,
    tempHigh: 1555,
    category: "solids",
    density: 12023,
    conduct: 0.38,
    hardness: 0.82667,
},

elements.molten_palladium = {
    density: 10380,
},

//Silver exists

elements.rhenium = {
    color: ["#e5f0d1","#e6edda"], //it looks like almost every other metal but in some pictures the lighting makes it look ever-so-slightly greenish
    behavior: behaviors.WALL,
    tempHigh: 3186,
    category: "solids",
    density: 21020,
    conduct: 0.29,
    hardness: 0.96061,
},

elements.molten_rhenium = {
    density: 18900,
},

elements.osmium = {
    color: ["#d8e1eb","#cee1f0"], //it looks bluish
    behavior: behaviors.WALL,
    tempHigh: 3033,
    category: "solids",
    density: 22590,
    conduct: 0.40,
    hardness: 0.98673,
},

elements.molten_osmium = {
    density: 2e4,
},

elements.iridium = {
    color: ["#dfb9f0","#d6a9eb","#dfd1ed","#eeeeee"], //Minecraft and Stardew Valley reference
    behavior: behaviors.WALL,
    tempHigh: 2446,
    category: "solids",
    density: 22560,
    conduct: 0.54,
    hardness: 0.96886,
},

elements.molten_iridium = {
    density: 19000,
},

elements.platinum = {
    color: ["#dddddd","#d7d7d7"],
    behavior: behaviors.WALL,
    tempHigh: 1768,
    category: "solids",
    density: 21450,
    conduct: 0.38,
    hardness: 0.83226,
},

elements.molten_platinum = {
    density: 19770,
},

//Gold exists

elements.mercury = {
    color: ["#d1d1d1", "#bababa"],
    behavior: behaviors.LIQUID,
    tempHigh: 357,
    stateHigh: "mercury_gas",
    tempLow: -39,
    stateLow: "frozen_mercury",
    category: "liquids",
    density: 13534,
    conduct: 0.13,
    breakInto: "mercury_gas",
},

elements.frozen_mercury = {
    color: ["#d1d1d1", "#bababa"],
    density: 14184,
    behavior: behaviors.WALL,
    conduct: 0.13,
    tempHigh: -39,
    temp: -50,
    stateHigh: "mercury",
    category: "solids",
    hidden: true,
    hardness: 0.2775, //(desperately scaled Mohs hardness)
},

elements.mercury_gas = { //hg d@bp extrapolated from density change with temperature: 12743
    density: 8.477,
    color: ["#d1d1d1", "#bababa"],
    colorOn: ["#96ffbf", "#9cffc2", "#9effe7"],
    conduct: 0.13,
    behavior: behaviors.GAS,
    tempLow: 357,
    temp: 400,
    stateLow: "mercury",
    category: "gases",
    hidden: true,
}
