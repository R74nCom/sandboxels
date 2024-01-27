elements.green_gold = {
    color: ["#94c7a3","#7bb298","#94c7a3"],
    behavior: behaviors.WALL,
    tempHigh: 500,
    category: "solids",
    density: 13000,
	burnInto: ["molten_green_gold"],
    conduct: 0.87,
};
elements.molten_green_gold = {
    color: "#d9f046",
    behavior: behaviors.MOLTEN,
    tempHigh: 500,
    category: "states",
    density: 13000,
    conduct: 0.87,
	Hidden: true
};
