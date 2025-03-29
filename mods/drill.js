elements.iron_drill = {
    color: ["#474747","#2b2b2b","#636363"],
    behavior: [
    "DL%5 AND MX|CR:drill_base|DL%5 AND MX",
    "MX|LB:drill_base|MX",
    "MX|M1 AND SM%10 AND MX|MX",
],
    category: "machines",
    state: "solid",
    tempHigh: 1538,
    stateHigh: "molten_iron",
    density: 7860,
    noMix: true,
};

elements.drill_base = {
    color: "#808080",
    behavior: [
    "XX|CR:drill_support AND CH:drill_support|XX",
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

elements.drill_support = {
    color: "#323232",
    behavior: [
    "XX|CR:drill_top|XX",
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

elements.drill_top = {
    color: "#323232",
    behavior: [
    "XX|XX|XX",
    "XX|XX|CR:drill_side1",
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
elements.drill_side1 = {
    color: "#323232",
    behavior: [
    "XX|XX|XX",
    "XX|XX|CR:drill_side2",
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

elements.drill_side2 = {
    color: "#323232",
    behavior: [
    "XX|XX|XX",
    "XX|XX|CR:drill_side3",
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

elements.drill_side3 = {
    color: "#323232",
    behavior: [
    "XX|XX|XX",
    "XX|XX|CR:drill_side4",
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

elements.drill_side4 = {
    color: "#323232",
    behavior: [
    "XX|XX|XX",
    "XX|XX|CR:drill_side5%35 AND CR:drill_side4%65",
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

elements.drill_side5 = {
    color: "#323232",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|CR:drill_support_down|XX",
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

elements.drill_support_down = {
    color: "#323232",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|CR:drill_support_down|XX",
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
    "DL%7 AND MX|CR:drill_base|DL%7 AND MX",
    "MX|LB:drill_base|MX",
    "MX|M1 AND SM%25 AND MX|MX",
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
    "DL%6 AND MX|CR:drill_base|DL%6 AND MX",
    "MX|LB:drill_base|MX",
    "MX|M1 AND SM%15 AND MX|MX",
],
    category: "machines",
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
    "DL%1 AND MX|CR:drill_base|DL%1 AND MX",
    "MX|LB:drill_base|MX",
    "MX|M1 AND SM%1 AND MX|MX",
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

elements.glass_drill = {
    color: "#5e807d",
    behavior: [
    "DL%10 AND MX|CR:drill_base|DL%10 AND MX",
    "MX|LB:drill_base AND SM%1|MX",
    "MX|M1 AND SM%40 AND MX|MX",
],
    category: "machines",
    breakInto: "glass_shard",
    state: "solid",
    tempHigh: 1500,
    stateHigh: "molten_glass",
    density: 2500,
    noMix: true,
    darkText: false,
};

elements.void_drill = {
    color: "#000000",
    behavior: [
    "DL|CR:drill_base|DL",
    "DL|LB:drill_base|DL",
    "DL|M1 AND DL|DL",
],
    category: "machines",
    state: "solid",
    density: 999999999999999,
    noMix: true,
    darkText: false,
};
elements.hydraulic_press = {
    color: ["#474747","#2b2b2b","#636363"],
    behavior: [
    "XX|XX|XX",
    "XX|LB:hydraulic_press|XX",
    "XX|M1 AND SM|XX",
],
    category: "machines",
    state: "solid",
    tempHigh: 1538,
    stateHigh: "molten_iron",
    density: 7860,
    noMix: true,
};
