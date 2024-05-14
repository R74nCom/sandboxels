
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
        "SH%10|CH:charged_battery%0.045|SH%10",
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
        "XX|CH:low_battery%0.045|XX",
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
    reactions: {electric: {elem1: null, elem2: null, chance: 0.5}},
    density: 1,
    //charge: 0.5,
    conduct: 0.01
};
elements.e_nuke = {
	desc: "Works like the nuke but needs power to explode",
	color: "#534636",
	hardness: elements.nuke.hardness,
	state: "solid",
	behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2",
    ],
	conduct: 1,
	category: "weapons",
	behaviorOn:[
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:60>plasma,plasma,plasma,plasma,radiation,rad_steam|M2",
    ],
};
elements.10_timer= {
    color: ["#000000"],
    behavior: behaviors.WALL,
    colorOn: "#000000",
    tick: ,
elements.gasoline_engine = {
  color: "#6d5f5d",
  behavior: behaviors.WALL,
  state: "solid",
  density: 1000,
  category: "testing",
  properties: {
    time: 10
  },
  tick: function(pixel){
    if (pixel.timer <= 40){
          if(!pixel.timer){pixel.timer = 0}
          pixel.timer -= 10
        }
        else if (otherPixel.element == "gasoline_engine"){
          var otherPixel = pixelMap[x][y]
          var otherShock = otherPixel.timer || 0
          var currentShock = pixel.timer || 0
          if (otherShock == currentShock){break;}
          if (otherShock > currentShock){
            otherPixel.timer --
            pixel.timer ++
          } else {
            otherPixel.timer ++
            pixel.timer --
          }
        }
      }
    }}
    if (!pixel.charge && !pixel.chargeCD && pixel.timer){
      for (var i = 0; i < adjacentCoords.length; i++){
        var coord = adjacentCoords[i]
        var x = pixel.x + coord[0]
        var y = pixel.y + coord[1]
        if (!isEmpty(x, y, true)){
          if (elements[pixelMap[x][y]].conduct > 0){
            pixel.charge = 1
            pixel.timer --
            break;
          }
        }
      }
    }
  }
}
    category: "energy",
    reactions: {electric: {elem1: null, elem2: null, chance: 0.5}},
    density: 1,
    //charge: 0.5,
    conduct: 0
};
