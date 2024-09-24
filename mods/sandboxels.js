/* mod by nekonico */

window.addEventListener("load", () => { 
    document.getElementById("elementButton-sandboxels_screen")?.remove()
}) 

window.addEventListener("load", () => { 
    document.getElementById("elementButton-sand_screen")?.remove()
}) 

window.addEventListener("load", () => { 
    document.getElementById("elementButton-rock_screen")?.remove()
}) 

window.addEventListener("load", () => { 
    document.getElementById("elementButton-wall_screen")?.remove()
}) 

window.addEventListener("load", () => { 
    document.getElementById("elementButton-water_screen")?.remove()
}) 

window.addEventListener("load", () => { 
    document.getElementById("elementButton-steam_screen")?.remove()
}) 

window.addEventListener("load", () => { 
    document.getElementById("elementButton-ice_screen")?.remove()
}) 

window.addEventListener("load", () => { 
    document.getElementById("elementButton-wood_screen")?.remove()
}) 

window.addEventListener("load", () => { 
    document.getElementById("elementButton-saw_screen")?.remove()
}) 

window.addEventListener("load", () => { 
    document.getElementById("elementButton-cellulose_screen")?.remove()
}) 

window.addEventListener("load", () => { 
    document.getElementById("elementButton-paper_screen")?.remove()
}) 

elements.digitalizer = {
    color: ["#d1c6be","#b5c0ad","#b9b8bc"],
    behavior: behaviors.WALL,
    onSelect: function() {
        logMessage("Do not digitalize unregistered elements!");
    },
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    conduct: 1,
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","sand"],
    tempLow: -80,
    stateLow: "glass_shard",
    category: "digital",
    tick: function(pixel) {
        if (!isEmpty(pixel.x,pixel.y-1,true) && !isEmpty(pixel.x,pixel.y+1,true)) {
            var newPixel = pixelMap[pixel.x][pixel.y-1];
            var screen = pixelMap[pixel.x][pixel.y+1];
            if (screen.element === "sandboxels_screen") {
                if (newPixel.element === "sand" && screen.element === "sandboxels_screen") {
                    changePixel(screen,"sand_screen");
                    deletePixel(newPixel.x,newPixel.y)
                }
                else if (newPixel.element === "ice" && screen.element === "sandboxels_screen") {
                    changePixel(screen,"ice_screen");
                    deletePixel(newPixel.x,newPixel.y)
                }
                else if (newPixel.element === "steam" && screen.element === "sandboxels_screen") {
                    changePixel(screen,"steam_screen");
                    deletePixel(newPixel.x,newPixel.y)
                }
                else if (newPixel.element === "water" && screen.element === "sandboxels_screen") {
                    changePixel(screen,"water_screen");
                    deletePixel(newPixel.x,newPixel.y)
                }
                else if (newPixel.element === "wood" && screen.element === "sandboxels_screen") {
                    changePixel(screen,"wood_screen");
                    deletePixel(newPixel.x,newPixel.y)
                }
                else if (newPixel.element === "paper" && screen.element === "sandboxels_screen") {
                    changePixel(screen,"paper_screen");
                    deletePixel(newPixel.x,newPixel.y)
                }
                else if (newPixel.element === "sawdust" && screen.element === "sandboxels_screen") {
                    changePixel(screen,"saw_screen");
                    deletePixel(newPixel.x,newPixel.y)
                }
                else if (newPixel.element === "cellulose" && screen.element === "sandboxels_screen") {
                    changePixel(screen,"cellulose_screen");
                    deletePixel(newPixel.x,newPixel.y)
                }
                else if (newPixel.element === "rock" && screen.element === "sandboxels_screen") {
                    changePixel(screen,"rock_screen");
                    deletePixel(newPixel.x,newPixel.y)
                }
                else if (newPixel.element === "wall" && screen.element === "sandboxels_screen") {
                    changePixel(screen,"wall_screen");
                    deletePixel(newPixel.x,newPixel.y)
                }
                else {
                    changePixel(screen,"malware");
                    deletePixel(newPixel.x,newPixel.y)
                }
            } 
        }
    },
    state: "solid",
    density: 1200,
    desc: "Digitalizes elements."
},

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
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","sand"],
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
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","sand"],
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
            else if (newPixel.element === "wood_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "paper_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "saw_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "cellulose_screen") {
                changePixel(newPixel,"sand_screen");
                pixel.dtemp = newPixel.dtemp;
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"cellulose_screen");
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
                else if (newPixel.element === "wood_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "paper_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "saw_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "cellulose_screen") {
                    changePixel(newPixel,"sand_screen");
                    pixel.dtemp = newPixel.dtemp;
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"cellulose_screen");
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
                else if (newPixel.element === "wood_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "paper_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "saw_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "cellulose_screen") {
                    changePixel(newPixel,"sand_screen");
                    pixel.dtemp = newPixel.dtemp;
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"cellulose_screen");
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
            else if (newPixel.element === "steam_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "cellulose_screen") {
                changePixel(newPixel,"rock_screen");
                pixel.dtemp = newPixel.dtemp;
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"cellulose_screen");
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
                else if (newPixel.element === "wood_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "paper_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "saw_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "cellulose_screen") {
                    changePixel(newPixel,"rock_screen");
                    pixel.dtemp = newPixel.dtemp;
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"cellulose_screen");
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
                else if (newPixel.element === "wood_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "paper_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "saw_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "cellulose_screen") {
                    changePixel(newPixel,"rock_screen");
                    pixel.dtemp = newPixel.dtemp;
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"cellulose_screen");
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
    
elements.saw_screen = {
    name:"screen",
    hidden:true,
    color: ["#dec150","#c7b15a"],
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
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","sawdust"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "digital",
    tick: function(pixel) {
        if (!isEmpty(pixel.x,pixel.y+1,true)) {
            var newPixel = pixelMap[pixel.x][pixel.y+1];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,"saw_screen");
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
                pixel.dtemp = 0;
            }
            else if (newPixel.element === "water_screen") {
                changePixel(newPixel,"cellulose_screen");
                pixel.dtemp = newPixel.dtemp;
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"water_screen");
            }
            else if (newPixel.element === "steam_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "cellulose_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (Math.random() > 0.5 && !isEmpty(pixel.x+1,pixel.y+1,true)) {
                var newPixel = pixelMap[pixel.x+1][pixel.y+1];
                if (newPixel.element === "sandboxels_screen") {
                    changePixel(newPixel,"saw_screen");
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");
                    pixel.dtemp = 0;
                }
                else if (newPixel.element === "water_screen") {
                    changePixel(newPixel,"cellulose_screen");
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
                else if (newPixel.element === "wood_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "paper_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "saw_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "cellulose_screen") {
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
                    changePixel(newPixel,"saw_screen");
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");
                    pixel.dtemp = 0;
                }
                else if (newPixel.element === "water_screen") {
                    changePixel(newPixel,"cellulose_screen");
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
                else if (newPixel.element === "wood_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "paper_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "saw_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "cellulose_screen") {
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

elements.cellulose_screen = {
    name:"screen",
    hidden:true,
    color: "#c7d4c9",
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
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","cellulose"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "digital",
    tick: function(pixel) {
        if (Math.random() > 0.2 && !isEmpty(pixel.x,pixel.y+1,true)) {
            var newPixel = pixelMap[pixel.x][pixel.y+1];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,"cellulose_screen");
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
                pixel.dtemp = 0;
            }
            else if (newPixel.element === "water_screen") {
                changePixel(newPixel,"cellulose_screen");
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
            else if (newPixel.element === "wood_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "paper_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "saw_screen") {
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
                    changePixel(newPixel,"cellulose_screen");
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");
                    pixel.dtemp = 0;
                }
                else if (newPixel.element === "water_screen") {
                    changePixel(newPixel,"cellulose_screen");
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
                else if (newPixel.element === "wood_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "paper_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "saw_screen") {
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
                    changePixel(newPixel,"cellulose_screen");
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");
                    pixel.dtemp = 0;
                }
                else if (newPixel.element === "water_screen") {
                    changePixel(newPixel,"cellulose_screen");
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
                else if (newPixel.element === "wood_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "paper_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "saw_screen") {
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
                changePixel(newPixel,"cellulose_screen");
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
                pixel.dtemp = 0;
            }
            else if (newPixel.element === "water_screen") {
                changePixel(newPixel,"cellulose_screen");
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
            else if (newPixel.element === "wood_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "paper_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "saw_screen") {
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
                changePixel(newPixel,"cellulose_screen");
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
                pixel.dtemp = 0;
            }
            else if (newPixel.element === "water_screen") {
                changePixel(newPixel,"cellulose_screen");
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
            else if (newPixel.element === "wood_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "paper_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "saw_screen") {
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
        if (pixel.dtemp > 99) { changePixel(pixel,"paper_screen") }
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
            else if (newPixel.element === "wood_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "saw_screen") {
                changePixel(newPixel,"cellulose_screen");
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
                pixel.dtemp = 0;
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
                else if (newPixel.element === "wood_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "saw_screen") {
                    changePixel(newPixel,"cellulose_screen");
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");
                    pixel.dtemp = 0;
                }
                else if (newPixel.element === "paper_screen") {
                    changePixel(newPixel,"cellulose_screen");
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");
                    pixel.dtemp = 0;
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
                else if (newPixel.element === "wood_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "saw_screen") {
                    changePixel(newPixel,"cellulose_screen");
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");
                    pixel.dtemp = 0;
                }
                else if (newPixel.element === "paper_screen") {
                    changePixel(newPixel,"cellulose_screen");
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");
                    pixel.dtemp = 0;
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
            else if (newPixel.element === "wood_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "saw_screen") {
                changePixel(newPixel,"cellulose_screen");
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
                pixel.dtemp = 0;
            }
            else if (newPixel.element === "paper_screen") {
                changePixel(newPixel,"cellulose_screen");
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
                pixel.dtemp = 0;
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
            else if (newPixel.element === "wood_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "saw_screen") {
                changePixel(newPixel,"cellulose_screen");
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
                pixel.dtemp = 0;
            }
            else if (newPixel.element === "paper_screen") {
                changePixel(newPixel,"cellulose_screen");
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
                pixel.dtemp = 0;
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
            else if (newPixel.element === "wood_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "paper_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "saw_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "cellulose_screen") {
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
            else if (newPixel.element === "wood_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "paper_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "saw_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "cellulose_screen") {
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
            else if (newPixel.element === "wood_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "paper_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "saw_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "cellulose_screen") {
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
            else if (newPixel.element === "wood_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "paper_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "saw_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "cellulose_screen") {
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

elements.wood_screen = {
    name:"screen",
    hidden:true,
    color: "#a0522d",
    behavior: behaviors.WALL,
    properties: {
        dtemp: 20,
    },
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    conduct: 1,
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","wood"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "digital",
    state: "solid",
    density: 1200,
},

elements.paper_screen = {
    name:"screen",
    hidden:true,
    color: "#f0f0f0",
    behavior: behaviors.WALL,
    properties: {
        dtemp: 20,
    },
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    conduct: 1,
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","paper"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "digital",
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
    desc: "Use on a screen to place digital steam."
},

elements.digital_wood = {
    color: "#a0522d",
    behavior: [
        "CH:sandboxels_screen>wood_screen|CH:sandboxels_screen>wood_screen|CH:sandboxels_screen>wood_screen",
        "CH:sandboxels_screen>wood_screen|CH:sandboxels_screen>wood_screen|CH:sandboxels_screen>wood_screen",
        "CH:sandboxels_screen>wood_screen|CH:sandboxels_screen>wood_screen|CH:sandboxels_screen>wood_screen",
    ],
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"wood_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "digital",
    desc: "Use on a screen to place digital wood."
},

elements.digital_paper = {
    color: "#f0f0f0",
    behavior: [
        "CH:sandboxels_screen>paper_screen|CH:sandboxels_screen>paper_screen|CH:sandboxels_screen>paper_screen",
        "CH:sandboxels_screen>paper_screen|CH:sandboxels_screen>paper_screen|CH:sandboxels_screen>paper_screen",
        "CH:sandboxels_screen>paper_screen|CH:sandboxels_screen>paper_screen|CH:sandboxels_screen>paper_screen",
    ],
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"paper_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "digital",
    desc: "Use on a screen to place digital paper."
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
    desc: "Use on a screen to place digital wall."
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
        else if (elements[pixel.element].id === elements.saw_screen.id) {
            pixel.dtemp += 1 
        }
        else if (elements[pixel.element].id === elements.water_screen.id) {
            pixel.dtemp += 1 
        }
        else if (elements[pixel.element].id === elements.cellulose_screen.id) {
            pixel.dtemp += 1 
        }
        else if (elements[pixel.element].id === elements.steam_screen.id) {
            pixel.dtemp += 1 
        }
        else if (elements[pixel.element].id === elements.ice_screen.id) {
            pixel.dtemp += 1 
        }
        else if (elements[pixel.element].id === elements.wood_screen.id) {
            pixel.dtemp += 1 
        }
        else if (elements[pixel.element].id === elements.paper_screen.id) {
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
        else if (elements[pixel.element].id === elements.saw_screen.id) {
            pixel.dtemp -= 1 
        }
        else if (elements[pixel.element].id === elements.water_screen.id) {
            pixel.dtemp -= 1 
        }
        else if (elements[pixel.element].id === elements.cellulose_screen.id) {
            pixel.dtemp -= 1 
        }
        else if (elements[pixel.element].id === elements.steam_screen.id) {
            pixel.dtemp -= 1 
        }
        else if (elements[pixel.element].id === elements.ice_screen.id) {
            pixel.dtemp -= 1 
        }
        else if (elements[pixel.element].id === elements.wood_screen.id) {
            pixel.dtemp -= 1 
        }
        else if (elements[pixel.element].id === elements.paper_screen.id) {
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
        else if (elements[pixel.element].id === elements.saw_screen.id) {
            pixel.dtemp = 20 
        }
        else if (elements[pixel.element].id === elements.water_screen.id) {
            pixel.dtemp = 20
        }
        else if (elements[pixel.element].id === elements.cellulose_screen.id) {
            pixel.dtemp = 20
        }
        else if (elements[pixel.element].id === elements.steam_screen.id) {
            pixel.dtemp = 20
        }
        else if (elements[pixel.element].id === elements.ice_screen.id) {
            pixel.dtemp = 20
        }
        else if (elements[pixel.element].id === elements.wood_screen.id) {
            pixel.dtemp = 20
        }
        else if (elements[pixel.element].id === elements.paper_screen.id) {
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
        else if (elements[pixel.element].id === elements.wood_screen.id) {
            changePixel(pixel,"saw_screen"); 
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
        else if (elements[pixel.element].id === elements.saw_screen.id) {
            changePixel(pixel,"sandboxels_screen"); 
        }
        else if (elements[pixel.element].id === elements.water_screen.id) {
            changePixel(pixel,"sandboxels_screen"); 
        }
        else if (elements[pixel.element].id === elements.cellulose_screen.id) {
            changePixel(pixel,"sandboxels_screen"); 
        }
        else if (elements[pixel.element].id === elements.steam_screen.id) {
            changePixel(pixel,"sandboxels_screen"); 
        }
        else if (elements[pixel.element].id === elements.ice_screen.id) {
            changePixel(pixel,"sandboxels_screen"); 
        }
        else if (elements[pixel.element].id === elements.wood_screen.id) {
            changePixel(pixel,"sandboxels_screen"); 
        }
        else if (elements[pixel.element].id === elements.paper_screen.id) {
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
    elements.malware.reactions.sandboxels_screen = { "elem2": ["sand_screen","sandboxels_screen_off","sandboxels_screen_off","malware"] };
    elements.malware.reactions.saw_screen = { "elem2": ["wall_screen","wall_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.sand_screen = { "elem2": ["paper_screen","paper_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.rock_screen = { "elem2": ["wood_screen","wood_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.cellulose_screen = { "elem2": ["ice_screen","ice_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.water_screen = { "elem2": ["steam_screen","steam_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.steam_screen = { "elem2": ["water_screen","water_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.ice_screen = { "elem2": ["cellulose_screen","cellulose_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.wood_screen = { "elem2": ["rock_screen","rock_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.paper_screen = { "elem2": ["sand_screen","sand_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.wall_screen = { "elem2": ["saw_screen","saw_screen","sandboxels_screen_off","malware"] };
