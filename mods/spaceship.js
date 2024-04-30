elements.power_core = {
   color: ["#10F7F3", "#5AEDEB", "#BDFCFB"],
    behavior: behaviors.WALL,
    temp: 250,
    category: "special",
    stateHigh: "n_explosion",
    tempHigh: 9500,
    state: "solid",
    desc: "The power core for your spaceship! Make sure it doesnt reach 9500 degrees!"    ,
    tick: function(pixel) {
    const elementToCheck = "core_casing";
let isValid = true;
for (let i = pixel.x - 4; i < pixel.x + 4; i++) {
   for (let j = pixel.y - 4; j < pixel.y + 4; j++) {
        if (Math.abs(pixel.x - i) === 4 || Math.abs(pixel.y - j) === 4) {isValid &= pixelMap[i][j]?.element === elementToCheck;}
        else if (i !== pixel.x && j !== pixel.y) isValid &= isEmpty(i, j);
    }
}
// if (!pixel.alerted) {
   // if (isValid) { alert("Power Core succesfully stored") }
  //  else { alert("Invalid core! Make sure its a 9x9 hollow box with the pixel in the middle!"); }
   // pixel.alerted = true;
// } Not finished Yet
if (pixel.temp === 5000) { pixel.color = pixelColorPick(pixel,"#F92810");}
        else if ( pixel.temp < 2000) { pixel.color = pixelColorPick(pixel,"#F9B610");}
        else { pixel.color = pixelColorPick(pixel,"#5AEDEB");}
    if (isValid) { if (pixelMap[pixel.x][pixel.y-4].element === "core_casing") 
      {createPixel("core_energizer", pixel.x, pixel.y-5);}} 
     else {{createPixel("core_energizer", pixel.x, pixel.y-4);}
    }
},
};
elements.thrusters = {
    color: ["#8D8D8C", "#666666"],
    behavior: behaviors.WALL,
    category: "special",
    behaviorOn: [
    "XX|XX|XX",
    "XX|XX|CR:fire",
    "XX|XX|XX",
  ],
  state: "solid",
  desc: "Use this to drive your ship! (Cosmetic)",
  conduct:1,
};
elements.core_wall = {
    color: ["#6EB5F1", "#708494"],
    behavior: behaviors.WALL,
    hardness: 1,
    density: 90000000,
    desc: "Harder than anything in the world!",
    category: "special",
};
elements.space_blaster = {
   color: ["#10F7F3", "#5AEDEB", "#BDFCFB"],
    tick: function(pixel) {
        for (var i = 0; i < 3; i++) {
            var skip = false;
            if (!isEmpty(pixel.x,pixel.y-1,true)) {
                var p = pixelMap[pixel.x][pixel.y-1];
                if (p.element === "space_blaster") { skip = true; }
                if (Math.random() < 0.9 && elements[p.element].hardness !== 1) {
                    deletePixel(p.x,p.y);
                }
            }
            if (!tryMove(pixel,pixel.x-1,pixel.y,["flash","heat_ray","electric"]) && !skip) {
                explodeAt(pixel.x,pixel.y,30,"plasma");
                var coords = circleCoords(pixel.x,pixel.y,15);
                coords.forEach(function(coord) {
                    var x = coord.x;
                    var y = coord.y;
                    if (!isEmpty(x,y,true)) {
                        pixelMap[x][y].temp += 10000;
                        pixelTempCheck(pixelMap[x][y]);
                    }
                })
                deletePixel(pixel.x,pixel.y);
                return;
            }
        }
    },
    category: "energy",
    state: "solid",
    density: 100000000,
    temp: 10000,
    hardness: 1,
    maxSize: 3,
    cooldown: defaultCooldown,
    excludeRandom: true,
    desc: "A energized blaster pixel",
};
elements.space_gunner_LEFT = {
   color: ["#708494", "#5A6873"],
    behavior: behaviors.WALL,
    category: "special",
    behaviorOn: [
    "XX|XX|XX",
    "CR:space_blaster|XX|XX",
    "XX|XX|XX",
  ],
  state: "solid",
  desc: "Use this to shoot your enemies! (Shoots Left)",
  conduct:1,
};
elements.space_gunner_RIGHT = {
   color: ["#708494", "#5A6873"],
    behavior: behaviors.WALL,
    category: "special",
    behaviorOn: [
    "XX|XX|XX",
    "XX|XX|CR:space_blaster",
    "XX|XX|XX",
  ],
  state: "solid",
  desc: "Use this to shoot your enemies! (Shoots Right)",
  conduct:1,
};
elements.core_energizer = {
   color: "#FFFB00",
   hidden: true,
   behavior: behaviors.WALL,
   state: "solid",
   tick: function(pixel) {
      createPixel("radiation", pixel.x, pixel.y+1)
   },
};
elements.core_casing = {
    color: ["#4A7375","#C1D875","#8BFCF3"],
    reactions: {
        "radiation": { elem2:"electric", temp1:200 }
    },
    behavior: behaviors.WALL,
    category: "special",
    density: 2710,
    conduct: 0.73,
    hardness: 1,
    desc: "Casing for the inner core!",
    };