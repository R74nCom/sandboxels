/*

Food Food Food! Adds more food to Sandboxels.
Created by sugima.

Sandboxels Plus v1

Changelog - 1/25/24 - v1
 - Made the mod :|
 - Added Blueberries
 - Added Lemons
 - Added Rice
 - Added Fried Rice
 - Added Waffle
 - Added Waffle Cone
 - Added Chocolate Ice Cream
 - Added Soup
 - Added Coca Cola
 - Added Flavor Formula
 
*/

elements.blueberry = {
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    color: ["#464196","#2E2B64"],
    breakInto: "juice",
    breakIntoColor: "#1F1C42",
    reactions: {},
};
elements.lemon = {
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    color: ["#f0e79d","#e3d24a"],
    breakInto: "juice",
    breakIntoColor: "#f1e9a6",
    reactions: {},
};
elements.rice = {
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    color: "#ffffff",
    tempHigh: 65,
    stateHigh: "friedrice",
    reactions: {},
};
elements.fried_rice = {
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    color: ["#ff9c5e","#cf6c30"],
    reactions: {},
};
elements.waffle = {
    behavior: behaviors.WALL,
    category: "food",
    state: "solid",
    color: ["#e3a976","#b3855d"],
    reactions: {},
};
elements.waffle = {
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    color: ["#e3a976","#b3855d"],
    tempHigh: 100,
    stateHigh: "wafflecone",
    reactions: {},
};
elements.waffle_cone = {
    behavior: behaviors.WALL,
    category: "food",
    state: "solid",
    color: ["#cc8e58","#b58051"],
    reactions: {},
};
elements.chocolate_ice_cream = {
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    color: "#4d2f1c",
    reactions: {},
};
elements.soup = {
    behavior: behaviors.LIQUID,
    category: "food",
    state: "liquid",
    color: "#c48818",
    reactions: {},
};
elements.coca_cola = {
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    color: "#241711",
    reactions: {},
};
elements.flavor_formula = {
    behavior: behaviors.POWDER,
    category: "liquids",
    state: "solid",
    color: ["#ff0000","#ff6400", "#ffff00", "#04ff00", "#00fff7", "#0400ff", "#b700ff", "#ff0099"],
    reactions: {},
};
if (!elements.flour.reactions) { elements.flour.reactions = {} }
if (!elements.sugar.reactions) { elements.sugar.reactions = {} }
elements.flour.reactions.sugar = { "elem1":"waffle", "elem2": "waffle"};
if (!elements.ice_cream.reactions) { elements.ice_cream.reactions = {} }
elements.ice_cream.reactions.chocolate = { "elem1":"chocolateicecream", "elem2": "chocolateicecream"};
if (!elements.sugar_water.reactions) { elements.sugar_water.reactions = {} }
elements.sugar_water.reactions.flavor_formula = { "elem1":"coca_cola", "elem2": "coca_cola"};
