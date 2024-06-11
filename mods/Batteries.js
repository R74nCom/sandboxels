
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
    conduct: 0.01,
    ignore: ["radio_wave"],
};

elements.e_nuke = {
    desc: "Works like a nuke but needs power to explode",
	color: elements.nuke.color,
	hardness: 0.5,
	state: "solid",
	behavior: behaviors.POWDER,
	conduct: 1,
	category: "weapons",
	behaviorOn:  [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:60>plasma,plasma,plasma,plasma,radiation,rad_steam|M2",
    ],
	name: "E-Nuke",
};
elements.drill = {
    color: ["#a7ab81","#a3a685", "#9ba252"],
    tick: function(pixel) {
        for (var i = 0; i < 3; i++) {
            var skip = false;
            if (!isEmpty(pixel.x,pixel.y+1,true)) {
                var p = pixelMap[pixel.x][pixel.y+1];
                if (p.element === "drill") { skip = true; }
                if (Math.random() < 0.9 && elements[p.element].hardness !== 1) {
                    deletePixel(p.x,p.y);
                }
            }
            if (!tryMove(pixel,pixel.x,pixel.y+1,["flash","smoke"]) && !skip) {
                explodeAt(pixel.x,pixel.y,5,"flash");
                var coords = circleCoords(pixel.x,pixel.y,2);
                coords.forEach(function(coord){
                    var x = coord.x;
                    var y = coord.y;
                    if (!isEmpty(x,y,true)) {
                        pixelMap[x][y].temp += 55;
                        pixelTempCheck(pixelMap[x][y]);
                    }
                })
                deletePixel(pixel.x,pixel.y);
                return;
            }
        }
    },
    category: "weapons",
    state: "solid",
    density: 100000000,
    temp: 55,
    hardness: 1,
    maxSize: 3,
    cooldown: defaultCooldown,
    excludeRandom: true,
};
elements.holy_hand_grenade = {
    color: elements.gold.color,
    behavior: [
        "XX|EX:6>god_ray,bless,bless,bless%1|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:6>god_ray,bless,bless,bless%1|M2",
    ],
    behaviorOn: [
        "XX|XX|XX",
        "XX|EX:6>god_ray,bless,bless,bless%1|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    tempHigh: 1455.5,
    stateHigh: ["molten_steel", "god_ray"],
    excludeRandom: true,
    conduct: 1,
    cooldown: defaultCooldown,
};
//Fioushemastor (Aparently needlessly complicated. IDK)
elements.timer_input =  {
    color: "#4d0a03",
    behavior: behaviors.WALL,
    category: "machines",
    insulate: true,
    conduct: 1,
    noMix: true
  }
  
  let TimerDelay = 100
  elements.Timer = {
      color: "#838cc2",
      behavior: behaviors.WALL,
      tick: function(pixel){
        if (pixelTicks == pixel.start) {
          pixel.delay = TimerDelay
        }
        //ceck all surroundings
        for (let offset of adjacentCoords) {
          if (isEmpty(pixel.x+offset[0], pixel.y+offset[1])) continue;
          if (pixelMap[pixel.x+offset[0]][pixel.y+offset[1]].charge && pixelMap[pixel.x+offset[0]][pixel.y+offset[1]].element == "timer_input") {
            let oppositeCoords = {x: pixel.x-offset[0], y: pixel.y-offset[1]}
            pixel.timers.push({start: pixelTicks, coords: oppositeCoords, delay: pixel.delay})
          }
        }
        //go through all timers
        for (let index in pixel.timers) {
          let timer = pixel.timers[index]
          if (timer.start == pixelTicks-pixel.delay) {
            if (isEmpty(timer.coords.x, timer.coords.y, true)) continue;
            pixelMap[timer.coords.x][timer.coords.y].charge = 1
            pixel.timers.splice(index, 1)
          }
        }
  
      },
      onSelect: () => {
        TimerDelay = prompt("what shall the delay be? (in ticks)", 100)
      },
      colorOn: "#ffff59",
      category: "machines",
      tempHigh: 1455.5,
      stateHigh: "molten_steel",
      conduct: 0,
      properties: {
        timers: [],
        delay: 100
      }
  }; 

//ExtraMachines
elements.titanium = {
    desc: "Another metal that does not erode nor conduct electricity",
	conduct: 0,
	color: ["#a1ada5","#ebf5ee","#bac2bc","#848a86","#505251"],
	tempHigh:3000,
    stateHigh: "molten_titanium",
    category: "solids",
    state: "soild",
	 hardness: 1,
    density: 792,
	behavior: behaviors.WALL,
};

elements.molten_titanium = {
    desc: "Melted version of titanium",
    temp : 3000,
	conduct: 0,
	color: ["#d16e04","#FFCC99","#FF6600","#FF7F50","#DC143C","#800020"],
	tempLow:2999,
    stateLow: "titanium",
    category: "states",
    state: "soild",
    density: 792,
	behavior: behaviors.MOLTEN,
};
textures.Reniforced_Titanuim = {
    REINFORCEDTITANIUM: [
        "GiGgggGiGGg",
        "gggGGGGgggg",
        "iiiiiiiiiii",
        "GgGGggggGGg",
        "GggGGgggGGg",
        "igGGGgggggi",
        "GggggggGGGG",
        "GggGGgggggg",
        "Ggggggggggg",
        "ggggggGGggg",
        "Ggggggggggg",
        "iiiiiiiiiii",],
  
   
};                                                                                                                

elements.Reniforced_Titanuim = {
    color: "#787878",
    colorPattern: textures.Reniforced_Titanuim.REINFORCEDTITANIUM,
    colorKey: {
        "g": "#787878",
        "G": "#606060",
        "i": "#332f2f"},
    behavior: behaviors.WALL,
    
    tempHigh: 4000,
    stateHigh : "molten_titanium",
    category: "solids",
    state: "solid",
    density: 5000,
    hardness:1,
    noMix: true
};

