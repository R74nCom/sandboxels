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
    document.getElementById("elementButton-blood_screen")?.remove()
}) 

window.addEventListener("load", () => { 
    document.getElementById("elementButton-paper_screen")?.remove()
})

window.addEventListener("load", () => { 
    document.getElementById("elementButton-body_screen")?.remove()
}) 

window.addEventListener("load", () => { 
    document.getElementById("elementButton-head_screen")?.remove()
}) 

elements.danger_suit = {
    color: ["#A8A7AB","#878689"],
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "radiation": { elem2:"electric", temp1:200 },
        "body":{ elem1:null, elem2:"suited_body" },
    },
    tempHigh: 500,
    stateHigh: ["molten_aluminum","smoke","ash"],
    burn: 10,
    burnTime: 300,
    burnInto: ["molten_aluminum","smoke","smoke","smoke","ash"],
    category: "simulation",
    state: "solid",
    density: 2710,
    conduct: 0.73,
    hardness: 0.05,
    breakInto: "metal_scrap",
    fireColor: "#A7B3BF",
    superconductAt: -271.95
},

elements.danger_helmet = {
    color: ["#323233","#434344"],
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "head":{ elem1:null, elem2:"suited_head" },
    },
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_plastic"],
    burn: 10,
    burnTime: 200,
    burnInto: ["glass_shard","glass_shard","glass_shard","glass_shard","dioxin","smoke","dioxin","smoke","stench"],
    category: "simulation",
    state: "solid",
    density: 2500,
    breakInto: "glass_shard",
},

elements.suited_body = {
    color: ["#A8A7AB","#878689"],
    category: "life",
    hidden: true,
    density: 2710,
    state: "solid",
    conduct: .05,
    temp: 37,
    tempHigh: 300,
    stateHigh: ["cooked_meat","cooked_meat","cooked_meat","cooked_meat","ash"],
    tempLow: -75,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: ["cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","molten_aluminum","smoke","smoke","smoke","ash"],
    breakInto: ["blood","meat","bone"],
    forceSaveColor: true,
    reactions: {
        "egg": { elem2:"yolk", chance:0.5, oneway:true },
        "grape": { elem2:"juice", chance:0.5, color2:"#291824", oneway:true },
        "ant": { elem2:"dead_bug", chance:0.05, oneway:true },
        "fly": { elem2:"dead_bug", oneway:true },
        "firefly": { elem2:"dead_bug", oneway:true },
        "bee": { elem2:"dead_bug", oneway:true },
        "flea": { elem2:"dead_bug", oneway:true },
        "termite": { elem2:"dead_bug", oneway:true },
        "worm": { elem2:"slime", chance:0.05, oneway:true },
        "stink_bug": { elem2:"stench", oneway:true },
        "gold_coin": { elem2:null, chance:0.05 },
        "diamond": { elem2:null, chance:0.05 },
        "sun": { elem1:"cooked_meat" },
    },
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
            if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
                var headpixel = pixelMap[pixel.x][pixel.y-2];
                if (headpixel.element == "head") {
                    if (isEmpty(pixel.x, pixel.y-1)) {
                        movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
                    }
                }
                if (headpixel.element == "suited_head") {
                    if (isEmpty(pixel.x, pixel.y-1)) {
                        movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
                    }
                }
            }
        }
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            // Turn into rotten_meat if pixelTicks-dead > 500
            if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
                changePixel(pixel,"rotten_meat");
            }
            return
        }

        // Find the head
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head") {
            var head = pixelMap[pixel.x][pixel.y-1];
            if (head.dead) { // If head is dead, kill body
                pixel.dead = head.dead;
            }
        }
        else if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "suited_head") {
            var head = pixelMap[pixel.x][pixel.y-1];
            if (head.dead) { // If head is dead, kill body
                pixel.dead = head.dead;
            }
        }
        else { var head = null }
        if (pixel.burning) {
            pixel.panic += 0.1;
            if (head && pixelTicks-pixel.burnStart > 240) {
                pixel.color = head.color;
            }
        }
        else if (pixel.panic > 0) {
            pixel.panic -= 0.1;
        }

        if (isEmpty(pixel.x, pixel.y-1)) {
            // create blood if decapitated 10% chance
            if (Math.random() < 0.1 && !pixel.charge) {
                createPixel("blood", pixel.x, pixel.y-1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
        else if (head == null) { return }
        else if (Math.random() < 0.1*(isEmpty(pixel.x, pixel.y+1) ? 1 : pixel.panic+1)) { // Move 10% chance
            var movesToTry = [
                [1*pixel.dir,0],
                [1*pixel.dir,-1],
            ];
            // While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
                    var origx = pixel.x+move[0];
                    var origy = pixel.y+move[1];
                    if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
                        movePixel(head, head.x+move[0], head.y+move[1]);
                        break;
                    }
                }
            }
            // 15% chance to change direction
            if (Math.random() < 0.15) {
                pixel.dir *= -1;
            }
            // homeostasis
            if (pixel.temp > 37) { pixel.temp -= 1; }
            else if (pixel.temp < 37) { pixel.temp += 1; }
        }

    }
},

elements.suited_head = {
    color: ["#46433F","#47443C","#4D483D"],
    category: "life",
    hidden: true,
    density: 1080,
    state: "solid",
    conduct: .05,
    temp: 37,
    tempHigh: 300,
    stateHigh: ["cooked_meat","cooked_meat","cooked_meat","cooked_meat","glass_shard"],
    tempLow: -75,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: ["cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","melted_plastic","glass_shard"],
    breakInto: ["blood","meat","bone","blood","meat","bone","glass_shard"],
    forceSaveColor: true,
    reactions: {
        "oxygen": { elem2:"carbon_dioxide", chance:0.5 },
        "sun": { elem1:"cooked_meat" },
        "water": { elem2:"bubble", attr2:{"clone":"water"}, chance:0.001 },
        "salt_water": { elem2:"bubble", attr2:{"clone":"salt_water"}, chance:0.001 },
        "pool_water": { elem2:"bubble", attr2:{"clone":"pool_water"}, chance:0.001 },
    },
    properties: {
        dead: false
    },
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            // Turn into rotten_meat if pixelTicks-dead > 500
            if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
                changePixel(pixel,"rotten_meat");
                return
            }
        }

        // Find the body
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) { // If body is dead, kill head
                pixel.dead = body.dead;
            }
        }
        else if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "suited_body") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) { // If body is dead, kill head
                pixel.dead = body.dead;
            }
        }
        else { var body = null }

        if (tryMove(pixel, pixel.x, pixel.y+1)) {
            // create blood if severed 10% chance
            if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1 && !pixel.charge) {
                createPixel("blood", pixel.x, pixel.y+1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
        // homeostasis
        if (pixel.temp > 37) { pixel.temp -= 1; }
        else if (pixel.temp < 37) { pixel.temp += 1; }
    }
},

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
    category: "simulation",
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
                else if (newPixel.element === "blood" && screen.element === "sandboxels_screen") {
                    changePixel(screen,"blood_screen");
                    deletePixel(newPixel.x,newPixel.y)
                }
                else if (newPixel.element === "body" && screen.element === "sandboxels_screen") {
                    changePixel(screen,"blood_screen");
                    deletePixel(newPixel.x,newPixel.y)
                }
                else if (newPixel.element === "head" && screen.element === "sandboxels_screen") {
                    changePixel(screen,"blood_screen");
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
                else if (!isEmpty(pixel.x,pixel.y-2,true) && newPixel.element === "suited_body" && screen.element === "sandboxels_screen") {
                    var headPixel = pixelMap[pixel.x][pixel.y-2];
                    if (headPixel.element === "suited_head" && newPixel.element === "suited_body" && screen.element === "sandboxels_screen") {
                        changePixel(screen,"simulated_human");
                        deletePixel(newPixel.x,newPixel.y-1)
                        deletePixel(newPixel.x,newPixel.y)
                    }
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
    desc: "simulatedizes elements."
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
    category: "simulation",
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
    category: "simulation",
    state: "solid",
    density: 1200,
},

elements.simulated_human = {
    hidden:true,
    color: ["#46433F","#47443C","#4D483D"],
    category: "simulation",
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        if (!isEmpty(pixel.x, pixel.y+1),true && pixelMap[pixel.x][pixel.y+1].element === "sandboxels_screen") {
            var newPixel = pixelMap[pixel.x][pixel.y+1];
            newPixel.element = "body_screen";
            pixel.element = "head_screen";
        }
        else if (!isEmpty(pixel.x, pixel.y-1),true && pixelMap[pixel.x][pixel.y-1].element === "sandboxels_screen") {
            var newPixel = pixelMap[pixel.x][pixel.y-1];
            newPixel.element = "head_screen";
            pixel.element = "body_screen";
        }
        else {
            changePixel(pixel, "sandboxels_screen");
        }
    },
    related: ["suited_body","suited_head"],
    cooldown: defaultCooldown,
    forceSaveColor: true,
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
    category: "simulation",
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
            else if (newPixel.element === "blood_screen") {
                changePixel(newPixel,"sand_screen");
                pixel.dtemp = newPixel.dtemp;
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"blood_screen");
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
                else if (newPixel.element === "blood_screen") {
                    changePixel(newPixel,"sand_screen");
                    pixel.dtemp = newPixel.dtemp;
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"blood_screen");
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
                else if (newPixel.element === "blood_screen") {
                    changePixel(newPixel,"sand_screen");
                    pixel.dtemp = newPixel.dtemp;
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"blood_screen");
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
    category: "simulation",
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
            else if (newPixel.element === "blood_screen") {
                changePixel(newPixel,"rock_screen");
                pixel.dtemp = newPixel.dtemp;
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"blood_screen");
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
                else if (newPixel.element === "blood_screen") {
                    changePixel(newPixel,"rock_screen");
                    pixel.dtemp = newPixel.dtemp;
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"blood_screen");
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
                else if (newPixel.element === "blood_screen") {
                    changePixel(newPixel,"rock_screen");
                    pixel.dtemp = newPixel.dtemp;
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"blood_screen");
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
    category: "simulation",
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
    category: "simulation",
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
            else if (newPixel.element === "blood_screen") {
                changePixel(newPixel,"cellulose_screen");
                pixel.dtemp = newPixel.dtemp;
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"blood_screen");
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
                else if (newPixel.element === "blood_screen") {
                    changePixel(newPixel,"cellulose_screen");
                    pixel.dtemp = newPixel.dtemp;
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"blood_screen");
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
                else if (newPixel.element === "blood_screen") {
                    changePixel(newPixel,"cellulose_screen");
                    pixel.dtemp = newPixel.dtemp;
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"blood_screen");
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
            else if (newPixel.element === "blood_screen") {
                changePixel(newPixel,"cellulose_screen");
                pixel.dtemp = newPixel.dtemp;
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"blood_screen");
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
            else if (newPixel.element === "blood_screen") {
                changePixel(newPixel,"cellulose_screen");
                pixel.dtemp = newPixel.dtemp;
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"blood_screen");
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

elements.blood_screen = {
    name:"screen",
    hidden:true,
    color: ["#ff0000","#ee0000"],
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
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","blood"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    tick: function(pixel) {
        if (Math.random() > 0.2 && !isEmpty(pixel.x,pixel.y+1,true)) {
            var newPixel = pixelMap[pixel.x][pixel.y+1];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,"blood_screen");
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
                pixel.dtemp = 0;
            }
            else if (newPixel.element === "water_screen") {
                changePixel(newPixel,"blood_screen");
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
            else if (newPixel.element === "cellulose_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "blood_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "paper_screen") {
                changePixel(newPixel,"cellulose_screen");
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
                pixel.dtemp = 0;
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
                    changePixel(newPixel,"blood_screen");
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");
                    pixel.dtemp = 0;
                }
                else if (newPixel.element === "water_screen") {
                    changePixel(newPixel,"blood_screen");
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
                else if (newPixel.element === "cellulose_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "blood_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "paper_screen") {
                    changePixel(newPixel,"cellulose_screen");
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");
                    pixel.dtemp = 0;
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
                    changePixel(newPixel,"blood_screen");
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");
                    pixel.dtemp = 0;
                }
                else if (newPixel.element === "water_screen") {
                    changePixel(newPixel,"blood_screen");
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
                else if (newPixel.element === "cellulose_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "blood_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "paper_screen") {
                    changePixel(newPixel,"cellulose_screen");
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");
                    pixel.dtemp = 0;
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
                changePixel(newPixel,"blood_screen");
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
                pixel.dtemp = 0;
            }
            else if (newPixel.element === "water_screen") {
                changePixel(newPixel,"blood_screen");
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
            else if (newPixel.element === "cellulose_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "blood_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "paper_screen") {
                changePixel(newPixel,"cellulose_screen");
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
                pixel.dtemp = 0;
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
                changePixel(newPixel,"blood_screen");
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
                pixel.dtemp = 0;
            }
            else if (newPixel.element === "water_screen") {
                changePixel(newPixel,"blood_screen");
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
            else if (newPixel.element === "cellulose_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "blood_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "paper_screen") {
                changePixel(newPixel,"cellulose_screen");
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
                pixel.dtemp = 0;
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
        if (pixel.dtemp > 124) { changePixel(pixel,"steam_screen") }
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
    category: "simulation",
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
            else if (newPixel.element === "cellulose_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "blood_screen") {
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
                else if (newPixel.element === "cellulose_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "blood_screen") {
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
                else if (newPixel.element === "cellulose_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                    pixel.dtemp = newPixel.dtemp;
                }
                else if (newPixel.element === "blood_screen") {
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
            else if (newPixel.element === "cellulose_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "blood_screen") {
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
            else if (newPixel.element === "cellulose_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "blood_screen") {
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
    category: "simulation",
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
            else if (newPixel.element === "blood_screen") {
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
            else if (newPixel.element === "blood_screen") {
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
            else if (newPixel.element === "blood_screen") {
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

elements.body_screen = {
    color: ["#A8A7AB","#878689"],
    name:"screen",
    hidden:true,
    behavior: [
    "XX|CH:sandboxels_screen>blood_screen%0.1|XX",
    "XX|XX|XX",
    "XX|XX|XX",
    ],
    properties: {
        dtemp: 20,
    },
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    conduct: 1,
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","body"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    tick: function(pixel) {
        if (!isEmpty(pixel.x,pixel.y-1,true) && pixelMap[pixel.x][pixel.y-1].element === "head_screen") {
            var headPixel = pixelMap[pixel.x][pixel.y-1]
            if (!isEmpty(pixel.x,pixel.y+1,true)) {
                var newPixel = pixelMap[pixel.x][pixel.y+1]
                if (newPixel.element === "sandboxels_screen") {
                    changePixel(newPixel,"body_screen")
                    newPixel.dtemp = pixel.dtemp
                    changePixel(pixel,"head_screen")
                    pixel.dtemp = headPixel.dtemp
                }
                else if (newPixel.element === "water_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2)
                    pixel.dtemp = newPixel.dtemp
                }
                else if (newPixel.element === "blood_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2)
                    pixel.dtemp = newPixel.dtemp
                }
                else if (newPixel.element === "ice_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2)
                    pixel.dtemp = newPixel.dtemp
                }
                else if (newPixel.element === "steam_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2)
                    pixel.dtemp = newPixel.dtemp
                }
                else if (newPixel.element === "wood_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2)
                    pixel.dtemp = newPixel.dtemp
                }
                else if (newPixel.element === "paper_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2)
                    pixel.dtemp = newPixel.dtemp
                }
                else if (newPixel.element === "saw_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2)
                    pixel.dtemp = newPixel.dtemp
                }
                else if (newPixel.element === "cellulose_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2)
                    pixel.dtemp = newPixel.dtemp
                }
                else if (newPixel.element === "rock_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2)
                    pixel.dtemp = newPixel.dtemp
                }
            }
            else if (Math.random() < 0.01 && !isEmpty(pixel.x+1,pixel.y,true) && !isEmpty(pixel.x+1,pixel.y-1,true)) {
                var newPixel = pixelMap[pixel.x+1][pixel.y];
                var newHeadPixel = pixelMap[pixel.x+1][pixel.y-1];
                if (newPixel.element === "sandboxels_screen" && newHeadPixel.element === "sandboxels_screen") {
                    changePixel(pixel,"sandboxels_screen");
                    changePixel(headPixel,"sandboxels_screen");
                    changePixel(newPixel,"body_screen");
                    changePixel(newHeadPixel,"head_screen");
                    newPixel.dtemp = pixel.dtemp;
                    newHeadPixel.dtemp = headPixel.dtemp;
                    pixel.dtemp = 0;
                    headPixel.dtemp = 0;
                }
            }
            else if (Math.random() < 0.01 && !isEmpty(pixel.x-1,pixel.y,true) && !isEmpty(pixel.x-1,pixel.y-1,true)) {
                var newPixel = pixelMap[pixel.x-1][pixel.y];
                var newHeadPixel = pixelMap[pixel.x-1][pixel.y-1];
                if (newPixel.element === "sandboxels_screen" && newHeadPixel.element === "sandboxels_screen") {
                    changePixel(pixel,"sandboxels_screen");
                    changePixel(headPixel,"sandboxels_screen");
                    changePixel(newPixel,"body_screen");
                    changePixel(newHeadPixel,"head_screen");
                    newPixel.dtemp = pixel.dtemp;
                    newHeadPixel.dtemp = headPixel.dtemp;
                    pixel.dtemp = 0;
                    headPixel.dtemp = 0;
                }
            }
            if (!isEmpty(pixel.x,pixel.y-2,true) && pixelMap[pixel.x][pixel.y-2].element === "head_screen") {
                changePixel(pixelMap[pixel.x][pixel.y-2],"sandboxels_screen");
            }
        }
        else if (!isEmpty(pixel.x,pixel.y+1,true)) {
            var newPixel = pixelMap[pixel.x][pixel.y+1];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,"body_screen");
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
                pixel.dtemp = 0;
            }
            else if (newPixel.element === "water_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "blood_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
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
            else if (newPixel.element === "rock_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
        }
    },
},

elements.head_screen = {
    color: ["#46433F","#47443C","#4D483D"],
    name:"screen",
    hidden:true,
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
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","head"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    tick: function(pixel) {
        if (!isEmpty(pixel.x,pixel.y+1,true)) {
            var newPixel = pixelMap[pixel.x][pixel.y+1];
            if (newPixel.element === "sandboxels_screen") {
                if (Math.random() < 0.1) {
                    changePixel(newPixel,"blood_screen");
                    newPixel.dtemp = pixel.dtemp;
                }
                else {
                    changePixel(newPixel,"head_screen");
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");
                    pixel.dtemp = 0;
                }
            }
            else if (newPixel.element === "water_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
            else if (newPixel.element === "blood_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
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
            else if (newPixel.element === "rock_screen") {
                newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2);
                pixel.dtemp = newPixel.dtemp;
            }
        }
    },
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
    category: "simulation",
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
    category: "simulation",
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
    category: "simulation",
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
    category: "simulation",
    state: "solid",
    density: 1200,
},

elements.simulated_sand = {
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
    category: "simulation",
    desc: "Use on screen to place simulated sand."
},

elements.simulated_rock = {
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
    category: "simulation",
    desc: "Use on screen to place simulated sand."
},

elements.simulated_water = {
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
    category: "simulation",
    desc: "Use on a screen to place simulated water."
},

elements.simulated_ice = {
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
    category: "simulation",
    desc: "Use on a screen to place simulated ice."
},

elements.simulated_steam = {
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
    category: "simulation",
    desc: "Use on a screen to place simulated steam."
},

elements.simulated_blood = {
    color: ["#ff0000","#ee0000"],
    behavior: [
        "CH:sandboxels_screen>blood_screen|CH:sandboxels_screen>blood_screen|CH:sandboxels_screen>blood_screen",
        "CH:sandboxels_screen>blood_screen|CH:sandboxels_screen>blood_screen|CH:sandboxels_screen>blood_screen",
        "CH:sandboxels_screen>blood_screen|CH:sandboxels_screen>blood_screen|CH:sandboxels_screen>blood_screen",
    ],
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"blood_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on a screen to place simulated blood."
},

elements.simulated_sawdust = {
    color: ["#dec150","#c7b15a"],
    behavior: [
        "CH:sandboxels_screen>saw_screen|CH:sandboxels_screen>saw_screen|CH:sandboxels_screen>saw_screen",
        "CH:sandboxels_screen>saw_screen|CH:sandboxels_screen>saw_screen|CH:sandboxels_screen>saw_screen",
        "CH:sandboxels_screen>saw_screen|CH:sandboxels_screen>saw_screen|CH:sandboxels_screen>saw_screen",
    ],
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"saw_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on screen to place simulated sawdust."
},

elements.simulated_wood = {
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
    category: "simulation",
    desc: "Use on a screen to place simulated wood."
},

elements.simulated_paper = {
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
    category: "simulation",
    desc: "Use on a screen to place simulated paper."
},

elements.simulated_wall = {
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
    category: "simulation",
    desc: "Use on a screen to place simulated wall."
},

elements.simulated_heat = {
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
        else if (elements[pixel.element].id === elements.blood_screen.id) {
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
        else if (elements[pixel.element].id === elements.head_screen.id) {
            pixel.dtemp += 1 
        }
        else if (elements[pixel.element].id === elements.body_screen.id) {
            pixel.dtemp += 1 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on a screen to heat simulated elements."
},

elements.simulated_cool = {
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
        else if (elements[pixel.element].id === elements.blood_screen.id) {
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
        else if (elements[pixel.element].id === elements.head_screen.id) {
            pixel.dtemp -= 1 
        }
        else if (elements[pixel.element].id === elements.body_screen.id) {
            pixel.dtemp -= 1 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on a screen to cool simulated elements."
},

elements.simulated_roomtemp = {
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
        else if (elements[pixel.element].id === elements.blood_screen.id) {
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
        else if (elements[pixel.element].id === elements.head_screen.id) {
            pixel.dtemp = 20
        }
        else if (elements[pixel.element].id === elements.body_screen.id) {
            pixel.dtemp = 20
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on a screen to make simulated elements room temperature."
},

elements.simulated_smash = {
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
        else if (elements[pixel.element].id === elements.head_screen.id) {
            changePixel(pixel,"blood_screen"); 
        }
        else if (elements[pixel.element].id === elements.body_screen.id) {
            changePixel(pixel,"blood_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on a screen to smash simulated elements."
},

elements.simulated_erase = {
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
        else if (elements[pixel.element].id === elements.blood_screen.id) {
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
        else if (elements[pixel.element].id === elements.head_screen.id) {
            changePixel(pixel,"sandboxels_screen"); 
        }
        else if (elements[pixel.element].id === elements.body_screen.id) {
            changePixel(pixel,"sandboxels_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on a screen to erase simulated elements."
};

if (!elements.malware.reactions) { elements.malware.reactions = {} }
    elements.malware.reactions.sandboxels_screen = { "elem2": ["sand_screen","sandboxels_screen_off","sandboxels_screen_off","malware"] };
    elements.malware.reactions.saw_screen = { "elem2": ["wall_screen","wall_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.sand_screen = { "elem2": ["paper_screen","paper_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.rock_screen = { "elem2": ["wood_screen","wood_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.cellulose_screen = { "elem2": ["blood_screen","blood_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.blood_screen = { "elem2": ["ice_screen","ice_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.water_screen = { "elem2": ["steam_screen","steam_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.steam_screen = { "elem2": ["water_screen","water_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.ice_screen = { "elem2": ["cellulose_screen","cellulose_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.wood_screen = { "elem2": ["rock_screen","rock_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.paper_screen = { "elem2": ["sand_screen","sand_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.wall_screen = { "elem2": ["saw_screen","saw_screen","sandboxels_screen_off","malware"] };

elements.head.tick = function(pixel) {
    doHeat(pixel);
    doBurning(pixel);
    doElectricity(pixel);
    if (pixel.dead) {
        // Turn into rotten_meat if pixelTicks-dead > 500
        if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
            changePixel(pixel,"rotten_meat");
            return
        }
    }

    // Find the body
    if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body") {
        var body = pixelMap[pixel.x][pixel.y+1];
        if (body.dead) { // If body is dead, kill head
            pixel.dead = body.dead;
        }
    }
    else if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "suited_body") {
        var body = pixelMap[pixel.x][pixel.y+1];
        if (body.dead) { // If body is dead, kill head
            pixel.dead = body.dead;
        }
    }
    else { var body = null }

    if (tryMove(pixel, pixel.x, pixel.y+1)) {
        // create blood if severed 10% chance
        if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1 && !pixel.charge) {
            createPixel("blood", pixel.x, pixel.y+1);
            // set dead to true 15% chance
            if (Math.random() < 0.15) {
                pixel.dead = pixelTicks;
            }
        }
    }
    // homeostasis
    if (pixel.temp > 37) { pixel.temp -= 1; }
    else if (pixel.temp < 37) { pixel.temp += 1; }
}

elements.body.tick = function(pixel) {
    if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
        if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
            var headpixel = pixelMap[pixel.x][pixel.y-2];
            if (headpixel.element == "head") {
                if (isEmpty(pixel.x, pixel.y-1)) {
                    movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
                }
                else {
                    swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
                }
            }
            else if (headpixel.element == "suited_head") {
                if (isEmpty(pixel.x, pixel.y-1)) {
                    movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
                }
                else {
                    swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
                }
            }
        }
    }
    doHeat(pixel);
    doBurning(pixel);
    doElectricity(pixel);
    if (pixel.dead) {
        // Turn into rotten_meat if pixelTicks-dead > 500
        if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
            changePixel(pixel,"rotten_meat");
        }
        return
    }

    // Find the head
    if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head") {
        var head = pixelMap[pixel.x][pixel.y-1];
        if (head.dead) { // If head is dead, kill body
            pixel.dead = head.dead;
        }
    }
    else if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "suited_head") {
        var head = pixelMap[pixel.x][pixel.y-1];
        if (head.dead) { // If head is dead, kill body
            pixel.dead = head.dead;
        }
    }
    else { var head = null }
    if (pixel.burning) {
        pixel.panic += 0.1;
        if (head && pixelTicks-pixel.burnStart > 240) {
            pixel.color = head.color;
        }
    }
    else if (pixel.panic > 0) {
        pixel.panic -= 0.1;
    }

    if (isEmpty(pixel.x, pixel.y-1)) {
        // create blood if decapitated 10% chance
        if (Math.random() < 0.1 && !pixel.charge) {
            createPixel("blood", pixel.x, pixel.y-1);
            // set dead to true 15% chance
            if (Math.random() < 0.15) {
                pixel.dead = pixelTicks;
            }
        }
    }
    else if (head == null) { return }
    else if (Math.random() < 0.1*(isEmpty(pixel.x, pixel.y+1) ? 1 : pixel.panic+1)) { // Move 10% chance
        var movesToTry = [
            [1*pixel.dir,0],
            [1*pixel.dir,-1],
        ];
        // While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
        while (movesToTry.length > 0) {
            var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
            if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
                var origx = pixel.x+move[0];
                var origy = pixel.y+move[1];
                if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
                    movePixel(head, head.x+move[0], head.y+move[1]);
                    break;
                }
            }
        }
        // 15% chance to change direction
        if (Math.random() < 0.15) {
            pixel.dir *= -1;
        }
        // homeostasis
        if (pixel.temp > 37) { pixel.temp -= 1; }
        else if (pixel.temp < 37) { pixel.temp += 1; }
    }
}
