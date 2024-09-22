elements.sandboxels_screen_off = {
    name:"screen",
    color: "#454545",
    behavior: behaviors.WALL,
    behaviorOn: [
    "XX|XX|XX",
    "XX|CH:sandboxels_screen|XX",
    "XX|XX|XX",
    ],
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    conduct: 1,
    breakInto: "glass_shard",
    tempLow: -80,
    stateLow: "glass_shard",
    category: "digital",
    state: "solid",
    density: 1200,
    desc: "Shock to turn on."
},
  
elements.sandboxels_screen = {
    name:"screen",
    hidden:true,
    color: "#1D1D1D",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|XX|XX",
    ],
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    conduct: 1,
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","sand"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "digital",
    state: "solid",
    density: 1200,
},
  
elements.sand_screen = {
    name:"screen",
    hidden:true,
    color: "#e6d577",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|XX|XX",
    ],
    properties: {
        dtemp: 20,
    },
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    conduct: 1,
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","sand"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "digital",
    tick: function(pixel) {
        if (!isEmpty(pixel.x,pixel.y+1,true)) {
            var newPixel = pixelMap[pixel.x][pixel.y+1];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,"sand_screen");
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
                pixel.dtemp = 0;
            }
            else if (newPixel.element === "water_screen") {
                changePixel(newPixel,"sand_screen");
                pixel.dtemp = newPixel.dtemp;
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"water_screen");
            }
            else if (newPixel.element === "ice_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "steam_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "rock_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (Math.random() > 0.5 && !isEmpty(pixel.x+1,pixel.y+1,true)) {
                var newPixel = pixelMap[pixel.x+1][pixel.y+1];
                if (newPixel.element === "sandboxels_screen") {
                    changePixel(newPixel,"sand_screen");
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");
                    pixel.dtemp = 0;
                }
                else if (newPixel.element === "water_screen") {
                    changePixel(newPixel,"sand_screen");
                    pixel.dtemp = newPixel.dtemp;
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"water_screen");
                }
                else if (newPixel.element === "ice_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "steam_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "sand_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "rock_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
            }
            else if (!isEmpty(pixel.x-1,pixel.y+1,true)) {
                var newPixel = pixelMap[pixel.x-1][pixel.y+1];
                if (newPixel.element === "sandboxels_screen") {
                    changePixel(newPixel,"sand_screen");
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");
                    pixel.dtemp = 0;
                }
                else if (newPixel.element === "water_screen") {
                    changePixel(newPixel,"sand_screen");
                    pixel.dtemp = newPixel.dtemp;
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"water_screen");
                }
                else if (newPixel.element === "ice_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "steam_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "sand_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "rock_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
            }
        }
    },
    state: "solid",
    density: 1200,
},

elements.rock_screen = {
    name:"screen",
    hidden:true,
    color: ["#808080","#4f4f4f","#949494"],
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|XX|XX",
    ],
    properties: {
        dtemp: 20,
    },
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    conduct: 1,
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","rock"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "digital",
    tick: function(pixel) {
        if (!isEmpty(pixel.x,pixel.y+1,true)) {
            var newPixel = pixelMap[pixel.x][pixel.y+1];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,"rock_screen");
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
                pixel.dtemp = 0;
            }
            else if (newPixel.element === "water_screen") {
                changePixel(newPixel,"rock_screen");
                pixel.dtemp = newPixel.dtemp;
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"water_screen");
            }
            else if (newPixel.element === "ice_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "steam_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "sand_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (Math.random() > 0.5 && !isEmpty(pixel.x+1,pixel.y+1,true)) {
                var newPixel = pixelMap[pixel.x+1][pixel.y+1];
                if (newPixel.element === "sandboxels_screen") {
                    changePixel(newPixel,"rock_screen");
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");
                    pixel.dtemp = 0;
                }
                else if (newPixel.element === "water_screen") {
                    changePixel(newPixel,"rock_screen");
                    pixel.dtemp = newPixel.dtemp;
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"water_screen");
                }
                else if (newPixel.element === "ice_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "steam_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "sand_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "rock_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
            }
            else if (!isEmpty(pixel.x-1,pixel.y+1,true)) {
                var newPixel = pixelMap[pixel.x-1][pixel.y+1];
                if (newPixel.element === "sandboxels_screen") {
                    changePixel(newPixel,"rock_screen");
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");
                    pixel.dtemp = 0;
                }
                else if (newPixel.element === "water_screen") {
                    changePixel(newPixel,"rock_screen");
                    pixel.dtemp = newPixel.dtemp;
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"water_screen");
                }
                else if (newPixel.element === "ice_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "steam_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "sand_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "rock_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
            }
        }
    },
    state: "solid",
    density: 1200,
},

elements.water_screen = {
    name:"screen",
    hidden:true,
    color: "#2167ff",
    behavior: [
    "XX|XX|XX",
    "SW:sandboxels_screen|XX|SW:sandboxels_screen",
    "SW:sandboxels_screen|XX|SW:sandboxels_screen",
    ],
    properties: {
        dtemp: 20,
    },
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    conduct: 1,
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","water"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "digital",
    tick: function(pixel) {
        if (Math.random() > 0.2 && !isEmpty(pixel.x,pixel.y+1,true)) {
            var newPixel = pixelMap[pixel.x][pixel.y+1];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,"water_screen");
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
                pixel.dtemp = 0;
            }
            else if (newPixel.element === "ice_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "steam_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "sand_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "rock_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (Math.random() > 0.5 && !isEmpty(pixel.x+1,pixel.y+1,true)) {
                var newPixel = pixelMap[pixel.x+1][pixel.y+1];
                if (newPixel.element === "sandboxels_screen") {
                    changePixel(newPixel,"water_screen");
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");
                    pixel.dtemp = 0;
                }
                else if (newPixel.element === "ice_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "steam_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "sand_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "rock_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
            }
            else if (!isEmpty(pixel.x-1,pixel.y+1,true)) {
                var newPixel = pixelMap[pixel.x-1][pixel.y+1];
                if (newPixel.element === "sandboxels_screen") {
                    changePixel(newPixel,"water_screen");
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");
                    pixel.dtemp = 0;
                }
                else if (newPixel.element === "ice_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "steam_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "sand_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "rock_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
            }
        }
        else if (Math.random() > 0.5 && !isEmpty(pixel.x+1,pixel.y,true)) {
            var newPixel = pixelMap[pixel.x+1][pixel.y];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,"water_screen");
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
                pixel.dtemp = 0;
            }
            else if (newPixel.element === "ice_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "steam_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "sand_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "rock_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
        }
        else if (!isEmpty(pixel.x-1,pixel.y,true)) {
            var newPixel = pixelMap[pixel.x-1][pixel.y];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,"water_screen");
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
                pixel.dtemp = 0;
            }
            else if (newPixel.element === "ice_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "steam_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "sand_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "rock_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
        }
        if (pixel.dtemp < 0) { changePixel(pixel,"ice_screen") }
        if (pixel.dtemp > 99) { changePixel(pixel,"steam_screen") }
    },
    state: "solid",
    density: 1200,
},

elements.steam_screen = {
    name:"screen",
    hidden:true,
    color: "#abd6ff",
    behavior: [
    "SW:sandboxels_screen|XX|SW:sandboxels_screen",
    "XX|XX|XX",
    "SW:sandboxels_screen|XX|SW:sandboxels_screen",
    ],
    properties: {
        dtemp: 150,
    },
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    conduct: 1,
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","steam"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "digital",
    tick: function(pixel) {
        if (Math.random() > 0.75 && !isEmpty(pixel.x+1,pixel.y-1,true)) {
            var newPixel = pixelMap[pixel.x+1][pixel.y-1];
            if (newPixel.element === "sandboxels_screen") {
                newPixel.dtemp = pixel.dtemp;
                changePixel(newPixel,"steam_screen");
                changePixel(pixel,"sandboxels_screen");
            }
            else if (newPixel.element === "ice_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "water_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "sand_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "rock_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
        }
        else if (Math.random() > 0.75 && !isEmpty(pixel.x-1,pixel.y-1,true)) {
            var newPixel = pixelMap[pixel.x-1][pixel.y-1];
            if (newPixel.element === "sandboxels_screen") {
                newPixel.dtemp = pixel.dtemp;
                changePixel(newPixel,"steam_screen");
                changePixel(pixel,"sandboxels_screen");
            }
            else if (newPixel.element === "ice_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "water_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "sand_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "rock_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
        }
        else if (Math.random() > 0.75 && !isEmpty(pixel.x+1,pixel.y+1,true)) {
            var newPixel = pixelMap[pixel.x+1][pixel.y+1];
            if (newPixel.element === "sandboxels_screen") {
                newPixel.dtemp = pixel.dtemp;
                changePixel(newPixel,"steam_screen");
                changePixel(pixel,"sandboxels_screen");
            }
            else if (newPixel.element === "ice_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "water_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "sand_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "rock_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
        }
        else if (Math.random() > 0.5 && !isEmpty(pixel.x-1,pixel.y+1,true)) {
            var newPixel = pixelMap[pixel.x-1][pixel.y+1];
            if (newPixel.element === "sandboxels_screen") {
                newPixel.dtemp = pixel.dtemp;
                changePixel(newPixel,"steam_screen");
                changePixel(pixel,"sandboxels_screen");
            }
            else if (newPixel.element === "ice_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "water_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "sand_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "rock_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
        }
        if (pixel.dtemp < 100) { changePixel(pixel,"water_screen") }
    },
    state: "solid",
    density: 1200,
},

elements.ice_screen = {
    name:"screen",
    hidden:true,
    color: "#b2daeb",
    behavior: behaviors.WALL,
    properties: {
        dtemp: 0,
    },
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    conduct: 1,
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","ice"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "digital",
    tick: function(pixel) {
        if (pixel.dtemp > 5) { changePixel(pixel,"water_screen") }
    },
    state: "solid",
    density: 1200,
},

elements.wall_screen = {
    name:"screen",
    hidden:true,
    color: "#808080",
    behavior: behaviors.WALL,
    properties: {
        dtemp: 0,
    },
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    conduct: 1,
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","concrete"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "digital",
    state: "solid",
    density: 1200,
},

elements.digital_sand = {
    color: "#e6d577",
    behavior: [
        "CH:sandboxels_screen>sand_screen|CH:sandboxels_screen>sand_screen|CH:sandboxels_screen>sand_screen",
        "CH:sandboxels_screen>sand_screen|CH:sandboxels_screen>sand_screen|CH:sandboxels_screen>sand_screen",
        "CH:sandboxels_screen>sand_screen|CH:sandboxels_screen>sand_screen|CH:sandboxels_screen>sand_screen",
    ],
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"sand_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "digital",
    desc: "Use on screen to place digital sand."
},

elements.digital_rock = {
    color: ["#808080","#4f4f4f","#949494"],
    behavior: [
        "CH:sandboxels_screen>rock_screen|CH:sandboxels_screen>rock_screen|CH:sandboxels_screen>rock_screen",
        "CH:sandboxels_screen>rock_screen|CH:sandboxels_screen>rock_screen|CH:sandboxels_screen>rock_screen",
        "CH:sandboxels_screen>rock_screen|CH:sandboxels_screen>rock_screen|CH:sandboxels_screen>rock_screen",
    ],
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"rock_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "digital",
    desc: "Use on screen to place digital sand."
},

elements.digital_water = {
    color: "#2167ff",
    behavior: [
        "CH:sandboxels_screen>water_screen|CH:sandboxels_screen>water_screen|CH:sandboxels_screen>water_screen",
        "CH:sandboxels_screen>water_screen|CH:sandboxels_screen>water_screen|CH:sandboxels_screen>water_screen",
        "CH:sandboxels_screen>water_screen|CH:sandboxels_screen>water_screen|CH:sandboxels_screen>water_screen",
    ],
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"water_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "digital",
    desc: "Use on a screen to place digital water."
},

elements.digital_ice = {
    color: "#b2daeb",
    behavior: [
        "CH:sandboxels_screen>ice_screen|CH:sandboxels_screen>ice_screen|CH:sandboxels_screen>ice_screen",
        "CH:sandboxels_screen>ice_screen|CH:sandboxels_screen>ice_screen|CH:sandboxels_screen>ice_screen",
        "CH:sandboxels_screen>ice_screen|CH:sandboxels_screen>ice_screen|CH:sandboxels_screen>ice_screen",
    ],
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"ice_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "digital",
    desc: "Use on a screen to place digital ice."
},

elements.digital_steam = {
    color: "#abd6ff",
    behavior: [
        "CH:sandboxels_screen>steam_screen|CH:sandboxels_screen>steam_screen|CH:sandboxels_screen>steam_screen",
        "CH:sandboxels_screen>steam_screen|CH:sandboxels_screen>steam_screen|CH:sandboxels_screen>steam_screen",
        "CH:sandboxels_screen>steam_screen|CH:sandboxels_screen>steam_screen|CH:sandboxels_screen>steam_screen",
    ],
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"steam_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "digital",
    desc: "Use on a screen to place digital ice."
},

elements.digital_wall = {
    color: "#808080",
    behavior: [
        "CH:sandboxels_screen>ice_screen|CH:sandboxels_screen>ice_screen|CH:sandboxels_screen>ice_screen",
        "CH:sandboxels_screen>ice_screen|CH:sandboxels_screen>ice_screen|CH:sandboxels_screen>ice_screen",
        "CH:sandboxels_screen>ice_screen|CH:sandboxels_screen>ice_screen|CH:sandboxels_screen>ice_screen",
    ],
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"wall_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "digital",
    desc: "Use on a screen to place digital walls."
},

elements.digital_heat = {
    color: "#ff0000",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sand_screen.id) {
            pixel.dtemp += 1 
        }
        else if (elements[pixel.element].id === elements.rock_screen.id) {
            pixel.dtemp += 1 
        }
        else if (elements[pixel.element].id === elements.water_screen.id) {
            pixel.dtemp += 1 
        }
        else if (elements[pixel.element].id === elements.steam_screen.id) {
            pixel.dtemp += 1 
        }
        else if (elements[pixel.element].id === elements.ice_screen.id) {
            pixel.dtemp += 1 
        }
    },
    insulate:true,
    canPlace: false,
    category: "digital",
    desc: "Use on a screen to heat digital elements."
},

elements.digital_cool = {
    color: "#0000ff",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sand_screen.id) {
            pixel.dtemp -= 1 
        }
        else if (elements[pixel.element].id === elements.rock_screen.id) {
            pixel.dtemp -= 1 
        }
        else if (elements[pixel.element].id === elements.water_screen.id) {
            pixel.dtemp -= 1 
        }
        else if (elements[pixel.element].id === elements.steam_screen.id) {
            pixel.dtemp -= 1 
        }
        else if (elements[pixel.element].id === elements.ice_screen.id) {
            pixel.dtemp -= 1 
        }
    },
    insulate:true,
    canPlace: false,
    category: "digital",
    desc: "Use on a screen to cool digital elements."
},

elements.digital_roomtemp = {
    color: "#b1c96d",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sand_screen.id) {
            pixel.dtemp = 20
        }
        else if (elements[pixel.element].id === elements.rock_screen.id) {
            pixel.dtemp = 20
        }
        else if (elements[pixel.element].id === elements.water_screen.id) {
            pixel.dtemp = 20
        }
        else if (elements[pixel.element].id === elements.steam_screen.id) {
            pixel.dtemp = 20
        }
        else if (elements[pixel.element].id === elements.ice_screen.id) {
            pixel.dtemp = 20 
        }
    },
    insulate:true,
    canPlace: false,
    category: "digital",
    desc: "Use on a screen to make digital elements room temperature."
},

elements.digital_smash = {
    color: ["#666666","#888888","#666666"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.rock_screen.id) {
            changePixel(pixel,"sand_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "digital",
    desc: "Use on a screen to smash digital elements."
},

elements.digital_erase = {
    color: "#fdb5ff",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sand_screen.id) {
            changePixel(pixel,"sandboxels_screen"); 
        }
        else if (elements[pixel.element].id === elements.rock_screen.id) {
            changePixel(pixel,"sandboxels_screen"); 
        }
        else if (elements[pixel.element].id === elements.water_screen.id) {
            changePixel(pixel,"sandboxels_screen"); 
        }
        else if (elements[pixel.element].id === elements.steam_screen.id) {
            changePixel(pixel,"sandboxels_screen"); 
        }
        else if (elements[pixel.element].id === elements.ice_screen.id) {
            changePixel(pixel,"sandboxels_screen"); 
        }
        else if (elements[pixel.element].id === elements.wall_screen.id) {
            changePixel(pixel,"sandboxels_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "digital",
    desc: "Use on a screen to erase digital elements."
};

if (!elements.malware.reactions) { elements.malware.reactions = {} }
    elements.malware.reactions.sandboxels_screen = { "elem2": ["sand_screen","sandboxels_screen_off",null], chance:0.1 };
    elements.malware.reactions.sand_screen = { "elem2": ["wall_screen","sandboxels_screen_off",null], chance:0.1 };
    elements.malware.reactions.rock_screen = { "elem2": ["ice_screen","sandboxels_screen_off",null], chance:0.1 };
    elements.malware.reactions.water_screen = { "elem2": ["steam_screen","sandboxels_screen_off",null], chance:0.1 };
    elements.malware.reactions.steam_screen = { "elem2": ["water_screen","sandboxels_screen_off",null], chance:0.1 };
    elements.malware.reactions.ice_screen = { "elem2": ["rock_screen","sandboxels_screen_off",null], chance:0.1 };
    elements.malware.reactions.wall_screen = { "elem2": ["sand_screen","sandboxels_screen_off",null], chance:0.1 };
