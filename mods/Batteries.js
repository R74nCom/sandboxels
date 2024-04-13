
elements.charged_battery= {
    color: "#9c6c25",
    behavior: [
        "XX|SH%50|XX", // shocks (adds charge)
        "SH%50|CH:low_battery%0.05|SH%50",
        "XX|SH%50|XX",
    ],
    colorOn: "#00ff00",
    category: "machines",
    tempHigh: 1455.5,
    stateHigh: ["molten_steel","explosion","acid_gas"],
    charge: 0.5,
    conduct: 1,
};
elements.low_battery= {
    color: "#9c6c25",
    behavior: [
        "XX|SH%10|XX", // shocks (adds charge)
        "SH%10|CH:dead_battery%0.05|SH%10",
        "XX|SH%10|XX",
    ],
    behaviorOn:  [
        "XX|SH%10|XX", // shocks (adds charge)
        "SH%10|CH:charged_battery%0.05|SH%10",
        "XX|SH%10|XX",
    ],
    colorOn: "#4fb613",
    category: "machines",
    tempHigh: 1455.5,
    stateHigh: ["molten_steel","explosion","acid_gas"],
    charge: 0.5,
    conduct: 0.75,
};
elements.dead_battery= {
    color: "#9c6c25",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    behaviorOn:  [
        "XX|XX|XX",
        "XX|CH:low_battery%0.05|XX",
        "XX|XX|XX",
    ],
    colorOn: "#699e19",
    category: "machines",
    tempHigh: 1455.5,
    stateHigh: ["molten_steel","explosion","acid_gas"],
    charge: 0.5,
    conduct: 0.5,
};
elements.radio_broadcaster= {
    color: "#78784c",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|SH AND CR:radio_wave AND CR:radio_wave|XX",
        "SH AND CR:radio_wave AND CR:radio_wave|XX|SH AND CR:radio_wave AND CR:radio_wave",
        "XX|SH AND CR:radio_wave AND CR:radio_wave|XX",
    ],
    colorOn: "#ffff59",
    category: "machines",
    tempHigh: 1455.5,
    stateHigh: ["molten_steel","explosion","acid_gas"],
    conduct: 1
};
elements.radio_receiver= {
    color: "#78784c",
    behavior: behaviors.WALL,
    reactions: {radio_wave: {elem2: "electric", chance: 0.75}},
    colorOn: "#ffff59",
    category: "machines",
    tempHigh: 1455.5,
    stateHigh: ["molten_steel","explosion","acid_gas"],
    conduct: 1
};
elements.radio_wave= {
    color: ["#000000"],
    behavior: behaviors.BOUNCY,
    behaviorOn: [
            ["XX","CL","XX"],
            ["CL","DL%5","CL"],
            ["XX","CL","XX"]
        ]
    ,
    colorOn: "#000000",
    tick: function(pixel){
		if (currentElement == "radio_wave"){
			pixel.color = "rgb(15, 15, 15)";
		} else {
			pixel.color = "rgba(0, 0, 0, -1)";
		}
	},
    category: "energy",
    density: 1,
    //charge: 0.5,
    conduct: 0.01
};
