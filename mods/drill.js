elements.iron_drill = {
    color: ["#474747","#2b2b2b","#808080"],
    behavior: [
    "DL AND MX|CR:drill_base|DL AND MX",
    "MX:true|XX|MX:true",
    "MX:true|M1 AND SM%10 AND MX:true|MX:true",
],
    category: "machines",
    breakInto: "metal_scrap",
    state: "solid",
    tempHigh: 1538,
    stateHigh: "molten_iron",
    density: 7860,
    noMix: true,
};

elements.drill_base = {
    color: "#595959",
    behavior: [
    "XX|CR:drill_support AND CH:drill_support|XX",
    "XX|XX|XX",
    "XX|M1|XX",
],
    category: "machines",
    breakInto: "metal_scrap",
    state: "solid",
    tempHigh: 1538,
    stateHigh: "molten_iron",
    density: 7860,
    noMix: true,
    hidden: true,
};

elements.drill_support = {
    color: "#242424",
    behavior: [
    "XX|CH:drill_support|XX",
    "XX|XX|XX",
    "XX|XX|XX",
],
    category: "machines",
    breakInto: "metal_scrap",
    state: "solid",
    tempHigh: 1538,
    stateHigh: "molten_iron",
    density: 7860,
    noMix: true,
    hidden: true,
};

elements.gold_drill = {
    color: ["#f7c736","#ffe596","#d1a41d"],
    behavior: [
    "DL AND MX|CR:drill_base|DL AND MX",
    "MX:true|XX|MX:true",
    "MX:true|M1 AND SM%25 AND MX:true|MX:true",
],
    category: "machines",
    breakInto: "gold_coin",
    state: "solid",
    tempHigh: 1064,
    stateHigh: "molten_gold",
    density: 19300,
    noMix: true,
    darkText: false,
};

elements.brass_drill = {
    color: ["#ad7f47","#874a00"],
    behavior: [
    "DL AND MX|CR:drill_base|DL AND MX",
    "MX:true|XX|MX:true",
    "MX:true|M1 AND SM%8 AND MX:true|MX:true",
],
    category: "machines",
    breakInto: "metal_scrap",
    state: "solid",
    tempHigh: 927,
    stateHigh: "molten_brass",
    density: 8550,
    noMix: true,
    darkText: false,
};

elements.egg_drill = {
    color: "#ffe69c",
    behavior: [
    "DL AND MX|CR:drill_base|DL AND MX",
    "MX:true|XX|MX:true",
    "MX:true|M1 AND SM%1 AND MX:true|MX:true",
],
    category: "machines",
    breakInto: "yolk",
    state: "solid",
    tempHigh: 1500,
    stateHigh: "steam",
    density: 1031,
    noMix: true,
    darkText: true,
};

elements.void_drill = {
    color: "#000000",
    behavior: [
    "DL|CR:drill_base|DL",
    "DL|XX|DL",
    "DL|M1 AND DL|DL",
],
    category: "machines",
    state: "solid",
    density: 999999999999999,
    noMix: true,
    darkText: false,
};