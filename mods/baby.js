// mod by suss
// this took me a tiny bit to make
// also, why are you even reading the comments unless you’re viewing the pr or smth
// guh

elements.baby = {
    color: ["#f3e7db","#f7ead0","#eadaba","#d7bd96","#a07e56","#825c43","#604134","#3a312a"],
    behavior: [
    "XX|XX|XX",
    "M2%3|XX|M2%3",
    "XX|M1|XX",
],
    category: "life",
    breakInto: ["meat", "meat", "blood"],
    state: "solid",
    tempHigh: 120,
    tempLow: -20,
    stateHigh: "ash_baby",
    stateLow: "frozen_meat",
    density: 1050,
    reactions: {
        "infection": {func: function(pixel1, pixel2){pixel2.element = "coughing_baby"}},
        "cancer": {func: function(pixel1, pixel2){pixel2.element = "coughing_baby"}},
        "plague": {func: function(pixel1, pixel2){pixel2.element = "coughing_baby"}},
        "magical_growth_stuff_that_sometimes_also_changes_the_humans_race": { "elem1":null, "elem2":"human" },
        "milk": { "elem2":null }
        }
};
// hydrogen bomb versus coughing baby
elements.coughing_baby = {
    color: ["#f3e7db","#f7ead0","#eadaba","#d7bd96","#a07e56","#825c43","#604134","#3a312a"],
    behavior: [
    "XX|XX|XX",
    "M2%3|EX:10>infection,plague,cancer%0.1|M2%3",
    "XX|M1|XX",
],
    category: "life",
    breakInto: ["meat", "blood", "blood", "meat", "meat", "infection", "plague", "cancer"],
    state: "solid",
    density: 1050,
    hidden: true,
    reactions: {
        "antibody": {func: function(pixel1, pixel2){pixel2.element = "baby"}},
        "magical_growth_stuff_that_sometimes_also_changes_the_humans_race": { "elem1":null, "elem2":"explosion" }
        }
};

elements.magical_growth_stuff_that_sometimes_also_changes_the_humans_race = {
    color: ["#b5ffe1","#93e5ab","#65b981","d8f3dc"],
    behavior: behaviors.POWDER,
    category: "life",
    density: 6969,
    state: "solid",
};
// peak
elements.ash_baby = {
    color: "#333333",
    behavior: behaviors.POWDER,
    state: "solid",
    tempHigh: 121,
    stateHigh: "ash",
    category: "life",
    density: 1050,
    hidden: true,
};