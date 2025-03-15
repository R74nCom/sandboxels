// mod by nekonico 

window.addEventListener("load", () => { 
    document.getElementById("elementButton-sandboxels_screen")?.remove()
    document.getElementById("elementButton-sand_screen")?.remove()
    document.getElementById("elementButton-wet_sand_screen")?.remove()
    document.getElementById("elementButton-rock_screen")?.remove()
    document.getElementById("elementButton-wall_screen")?.remove()
    document.getElementById("elementButton-water_screen")?.remove()
    document.getElementById("elementButton-steam_screen")?.remove()
    document.getElementById("elementButton-ice_screen")?.remove()
    document.getElementById("elementButton-wood_screen")?.remove()
    document.getElementById("elementButton-sawdust_screen")?.remove()
    document.getElementById("elementButton-cellulose_screen")?.remove()
    document.getElementById("elementButton-blood_screen")?.remove()
    document.getElementById("elementButton-paper_screen")?.remove()
    document.getElementById("elementButton-body_screen")?.remove()
    document.getElementById("elementButton-head_screen")?.remove()
    document.getElementById("elementButton-ash_screen")?.remove()
    document.getElementById("elementButton-mud_screen")?.remove()
    document.getElementById("elementButton-dirt_screen")?.remove()
    document.getElementById("elementButton-bird_screen")?.remove()
    document.getElementById("elementButton-fly_screen")?.remove()
    document.getElementById("elementButton-rat_screen")?.remove()
    document.getElementById("elementButton-oxygen_screen")?.remove()
    document.getElementById("elementButton-fire_screen")?.remove()
    document.getElementById("elementButton-smoke_screen")?.remove()
    document.getElementById("elementButton-simulated_human")?.remove()
}) 

viewInfo[8] = { // Screen Thermal View
    name: "screen therm",
    pixel: function(pixel,ctx) {
        if (elements[pixel.element].isScreen == true) {
        var temp = pixel.dtemp;
        if (temp < -50) {temp = -50}
        if (temp > 6000) {temp = 6000}
        // logarithmic scale, with coldest being 225 (-50 degrees) and hottest being 0 (6000 degrees)
        var hue = Math.round(225 - (Math.log(temp+100)/Math.log(6000+100))*225);
        if (hue < 0) {hue = 0}
        if (hue > 225) {hue = 225}
        drawSquare(ctx,"hsl("+hue+",100%,50%)",pixel.x,pixel.y)
        }
        else {
            var a = (settings.textures !== 0) ? pixel.alpha : undefined;
            if (((elements[pixel.element].isGas && elements[pixel.element].glow !== false) || elements[pixel.element].glow || pixel.glow) && pixel.glow !== false) {
                drawPlus(ctx,pixel.color,pixel.x,pixel.y,undefined,a)
                // if (isEmpty(pixel.x+1,pixel.y) || isEmpty(pixel.x-1,pixel.y) || isEmpty(pixel.x,pixel.y+1) || isEmpty(pixel.x,pixel.y-1)) {}
            }
            else {
                drawSquare(ctx,pixel.color,pixel.x,pixel.y,undefined,a)
            }
            if (pixel.charge && view !== 2) { // Yellow glow on charge
                if (!elements[pixel.element].colorOn) {
                    drawSquare(ctx,"rgba(255,255,0,0.5)",pixel.x,pixel.y);
                }
            }
        }
    }
}

screenTemp = function(pixel) {
    for (var i = 0; i < biCoords.length; i++) {
        var x = pixel.x+biCoords[i][0];
        var y = pixel.y+biCoords[i][1];
        if (!isEmpty(x,y,true)) {
            var newPixel = pixelMap[x][y];
            if (elements[newPixel.element].isScreen) {
                // Skip if both temperatures are the same
                if (pixel.dtemp === newPixel.dtemp || elements[newPixel.element].insulate === true) {
                    continue;
                }
                // Set both pixel temperatures to their average
                var avg = (pixel.dtemp + newPixel.dtemp)/2;
                pixel.dtemp = avg;
                newPixel.dtemp = avg;
                pixelTempCheck(pixel);
                pixelTempCheck(newPixel);
            }
        }
    }
}

doScreenBurning =  function(pixel) {
    if (pixel.digburning) { // Burning
        if (pixel.digburnStart === undefined) { pixel.digburnStart = pixelTicks }
        var info = elements[pixel.element];
        if (!info.insulate) { pixel.dtemp += 1; }
        if (pixel.dtemp < 0) {
            pixel.digburning = undefined;
            pixel.digburnStart = undefined;
            return;
        }
        for (var i = 0; i < adjacentCoords.length; i++) { // Burn adjacent pixels
            var x = pixel.x+adjacentCoords[i][0];
            var y = pixel.y+adjacentCoords[i][1];
            if (!isEmpty(x,y,true)) {
                var newPixel = pixelMap[x][y];
                if (elements[newPixel.element].dburn && !newPixel.digburning) {
                    if (Math.floor(Math.random()*100) < elements[newPixel.element].dburn) {
                        newPixel.digburning = true;
                        newPixel.digburnStart = pixelTicks;
                    }
                }
                if (elements[newPixel.element].dextinguish && elements[pixel.element].digburning !== true) {
                    pixel.digburning = undefined;
                    pixel.digburnStart = undefined;
                    return;
                }
            }
        }

        if ((pixelTicks - pixel.digburnStart > (info.digburnTime || 200)) && Math.floor(Math.random()*100)<(info.dburn || 10) && !(info.digburnTime === undefined && info.hardness >= 1)) {
            var digburnInto = info.digburnInto;
            if (digburnInto === undefined) {
                digburnInto = "fire_screen";
            }
            else if (digburnInto instanceof Array) {
                digburnInto = digburnInto[Math.floor(Math.random()*digburnInto.length)];
            }
            changePixel(pixel,digburnInto);
            if (info.digfireColor !== undefined && digburnInto === "fire_screen") {
                pixel.color = pixelColorPick(pixel,info.digfireColor);
            }
            else {
                pixel.color = pixelColorPick(pixel)
            }
        }
        else if (Math.floor(Math.random()*100)<10 && info.id !== elements.fire_screen.id && info.digfireElement !== null) { // Spawn fire
            if (!isEmpty(pixel.x,pixel.y-1)) {
                var firePixel = pixelMap[pixel.x][pixel.y-1]
                if (firePixel.element === "sandboxels_screen") {
                    changePixel(firePixel,(info.digfireElement || "fire_screen"));
                    firePixel.dtemp = pixel.dtemp//+(pixelTicks - (pixel.digburnStart || 0));
                    if (info.digfireColor !== undefined) {
                        firePixel.color = pixelColorPick(pixelMap[pixel.x][pixel.y-1],info.digfireColor);
                    }
                }
                else if (!isEmpty(pixel.x,pixel.y+1)) {
                    var firePixel = pixelMap[pixel.x][pixel.y+1]
                    if (firePixel.element === "sandboxels_screen") {
                        changePixel(firePixel,(info.digfireElement || "fire_screen"));
                        firePixel.dtemp = pixel.dtemp//+(pixelTicks - (pixel.burnStart || 0));
                        if (info.digfireColor !== undefined) {
                            firePixel.color = pixelColorPick(pixelMap[pixel.x][pixel.y+1],info.digfireColor);
                        }
                    }
                }
            }
            // same for below if top is blocked
            else if (!isEmpty(pixel.x,pixel.y+1)) {
                var firePixel = pixelMap[pixel.x][pixel.y+1]
                if (firePixel.element === "sandboxels_screen") {
                    changePixel(firePixel,(info.digfireElement || "fire_screen"));
                    firePixel.dtemp = pixel.dtemp//+(pixelTicks - (pixel.burnStart || 0));
                    if (info.digfireColor !== undefined) {
                        firePixel.color = pixelColorPick(pixelMap[pixel.x][pixel.y+1],info.digfireColor);
                    }
                }
            }
        }

    }
}

elements.sandboxels_screen_off = {
    name:"screen",
    color: "#454545",
    behavior: behaviors.WALL,
    tick: function(pixel) {
        if (pixel.dtemp !== 20) { pixel.dtemp = 20 }
        if (pixel.charge) { pixel.charges = pixelTicks }
        if (pixelTicks - 1 > pixel.charges) {
            changePixel(pixel,"sandboxels_screen")
        }
    },
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
}
  
elements.sandboxels_screen = {
    name:"screen",
    hidden:true,
    color: "#1D1D1D",
    behavior: behaviors.WALL,
    tick: function(pixel) {
        if (pixel.dtemp !== 20) { pixel.dtemp = 20 }
        if (pixel.charge) { pixel.charge = 0 }
    },
    conduct: 1,
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","sand"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    state: "solid",
    density: 1200,
}

elements.simulated_heat = {
    color: "#ff0000",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tool: function(pixel) {
        if (elements[pixel.element].isScreen === true) {
            pixel.dtemp += 2 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on a screen to heat simulated elements."
}

elements.simulated_cool = {
    color: "#0000ff",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tool: function(pixel) {
        if (elements[pixel.element].isScreen === true) {
            pixel.dtemp -= 2
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on a screen to cool simulated elements."
}

elements.simulated_roomtemp = {
    color: "#b1c96d",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tool: function(pixel) {
        if (elements[pixel.element].isScreen === true) {
            pixel.dtemp = 20
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on a screen to make simulated elements room temperature."
}

elements.simulated_smash = {
    color: ["#666666","#888888","#666666"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tool: function(pixel) {
        if (elements[pixel.element].isScreen === true && elements[pixel.element].digBreakInto) {
            changePixel(pixel,elements[pixel.element].digBreakInto); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on a screen to smash simulated elements."
}

elements.simulated_erase = {
    color: "#fdb5ff",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tool: function(pixel) {
        if (elements[pixel.element].isScreen === true) {
            changePixel(pixel,"sandboxels_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on a screen to erase simulated elements."
}

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
            newPixel.dir = 1
            pixel.element = "head_screen";
        }
        else if (!isEmpty(pixel.x, pixel.y-1),true && pixelMap[pixel.x][pixel.y-1].element === "sandboxels_screen") {
            var newPixel = pixelMap[pixel.x][pixel.y-1];
            newPixel.element = "head_screen";
            pixel.element = "body_screen";
            pixel.dir = 1
        }
        else {
            changePixel(pixel, "sandboxels_screen");
        }
    },
    related: ["suited_body","suited_head"],
    cooldown: defaultCooldown,
    forceSaveColor: true,
}

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
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","sand"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    isScreen: true,
    isMoving: true,
    isSolid: true,
    tick: function(pixel) {
        screenTemp(pixel)
        if (!isEmpty(pixel.x,pixel.y+1,true)) {
            var newPixel = pixelMap[pixel.x][pixel.y+1];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,pixel.element);
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
            }
            else if (elements[newPixel.element].isScreen === true) {
                if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isSolid !== true && elements[newPixel.element].isMoving === true) {
                    swapPixels(newPixel, pixel)
                }
            }
            if (Math.random() > 0.5 && !isEmpty(pixel.x+1,pixel.y+1,true) && !isEmpty(pixel.x,pixel.y+1,true)) {
                newPixel = pixelMap[pixel.x+1][pixel.y+1];
                if (newPixel.element === "sandboxels_screen") {
                    changePixel(newPixel,pixel.element);
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");

                }
                else if (elements[newPixel.element].isScreen === true) {
                    if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isSolid !== true && elements[newPixel.element].isMoving === true) {
                        swapPixels(newPixel, pixel)
                    }
                }
            }
            else if (!isEmpty(pixel.x-1,pixel.y+1,true) && !isEmpty(pixel.x,pixel.y+1,true)) {
                newPixel = pixelMap[pixel.x-1][pixel.y+1];
                if (newPixel.element === "sandboxels_screen") {
                    changePixel(newPixel,pixel.element);
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");

                }
                else if (elements[newPixel.element].isScreen === true) {
                    if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isSolid !== true && elements[newPixel.element].isMoving === true) {
                        swapPixels(newPixel, pixel)
                    }
                }
            }
        }
    },
    state: "solid",
    density: 1602,
}

elements.wet_sand_screen = {
    name:"screen",
    hidden:true,
    color: ["#a19348","#b5a85e"],
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
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","wet_sand"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    isScreen: true,
    isMoving: true,
    isSolid: true,
    tick: function(pixel) {
        screenTemp(pixel)
        if (!isEmpty(pixel.x,pixel.y+1,true)) {
            var newPixel = pixelMap[pixel.x][pixel.y+1];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,pixel.element);
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
            }
            else if (elements[newPixel.element].isScreen === true) {
                if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isSolid !== true && elements[newPixel.element].isMoving === true) {
                    swapPixels(newPixel, pixel)
                }
            }
        }
    },
    state: "solid",
    density: 1905,
}

elements.dirt_screen = {
    name:"screen",
    hidden:true,
    color: ["#76552b","#5c4221","#573c1a","#6b481e"],
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
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","dirt"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    isScreen: true,
    isMoving: true,
    isSolid: true,
    tick: function(pixel) {
        screenTemp(pixel)
        if (!isEmpty(pixel.x,pixel.y+1,true)) {
            var newPixel = pixelMap[pixel.x][pixel.y+1];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,pixel.element);
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
            }
            else if (elements[newPixel.element].isScreen === true) {
                if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isSolid !== true && elements[newPixel.element].isMoving === true) {
                    swapPixels(newPixel, pixel)
                }
            }
            if (Math.random() > 0.5 && !isEmpty(pixel.x+1,pixel.y+1,true) && !isEmpty(pixel.x,pixel.y+1,true)) {
                newPixel = pixelMap[pixel.x+1][pixel.y+1];
                if (newPixel.element === "sandboxels_screen") {
                    changePixel(newPixel,pixel.element);
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");

                }
                else if (elements[newPixel.element].isScreen === true) {
                    if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isSolid !== true && elements[newPixel.element].isMoving === true) {
                        swapPixels(newPixel, pixel)
                    }
                }
            }
            else if (!isEmpty(pixel.x-1,pixel.y+1,true) && !isEmpty(pixel.x,pixel.y+1,true)) {
                newPixel = pixelMap[pixel.x-1][pixel.y+1];
                if (newPixel.element === "sandboxels_screen") {
                    changePixel(newPixel,pixel.element);
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");

                }
                else if (elements[newPixel.element].isScreen === true) {
                    if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isSolid !== true && elements[newPixel.element].isMoving === true) {
                        swapPixels(newPixel, pixel)
                    }
                }
            }
        }
    },
    state: "solid",
    density: 1602,
}

elements.mud_screen = {
    name:"screen",
    hidden:true,
    color: "#382417",
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
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","mud"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    isScreen: true,
    isMoving: true,
    isSolid: true,
    tick: function(pixel) {
        screenTemp(pixel)
        if (!isEmpty(pixel.x,pixel.y+1,true)) {
            var newPixel = pixelMap[pixel.x][pixel.y+1];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,pixel.element);
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
            }
            else if (elements[newPixel.element].isScreen === true) {
                if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isSolid !== true && elements[newPixel.element].isMoving === true) {
                    swapPixels(newPixel, pixel)
                }
            }
        }
    },
    state: "solid",
    density: 1905,
}

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
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","rock"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    digBreakInto: "sand_screen",
    isScreen: true,
    isMoving: true,
    isSolid: true,
    tick: function(pixel) {
        screenTemp(pixel)
        if (!isEmpty(pixel.x,pixel.y+1,true)) {
            var newPixel = pixelMap[pixel.x][pixel.y+1];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,pixel.element);
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
            }
            else if (elements[newPixel.element].isScreen === true) {
                if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isSolid !== true && elements[newPixel.element].isMoving === true) {
                    swapPixels(newPixel, pixel)
                }
            }
            if (Math.random() > 0.5 && !isEmpty(pixel.x+1,pixel.y+1,true) && !isEmpty(pixel.x,pixel.y+1,true)) {
                newPixel = pixelMap[pixel.x+1][pixel.y+1];
                if (newPixel.element === "sandboxels_screen") {
                    changePixel(newPixel,pixel.element);
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");

                }
                else if (elements[newPixel.element].isScreen === true) {
                    if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isSolid !== true && elements[newPixel.element].isMoving === true) {
                        swapPixels(newPixel, pixel)
                    }
                }
            }
            else if (!isEmpty(pixel.x-1,pixel.y+1,true) && !isEmpty(pixel.x,pixel.y+1,true)) {
                newPixel = pixelMap[pixel.x-1][pixel.y+1];
                if (newPixel.element === "sandboxels_screen") {
                    changePixel(newPixel,pixel.element);
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");

                }
                else if (elements[newPixel.element].isScreen === true) {
                    if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isSolid !== true && elements[newPixel.element].isMoving === true) {
                        swapPixels(newPixel, pixel)
                    }
                }
            }
        }
    },
    state: "solid",
    density: 2550,
}
    
elements.sawdust_screen = {
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
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","sawdust"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    isScreen: true,
    isMoving: true,
    dburn: 25,
    digburnTime: 150,
    digburnInto: ["fire_screen","fire_screen","fire_screen","ash_screen"],
    tick: function(pixel) {
        if (pixel.dtemp > 400) { changePixel(pixel,"fire_screen") }
        screenTemp(pixel)
        doScreenBurning(pixel)
        if (!isEmpty(pixel.x,pixel.y+1,true)) {
            var newPixel = pixelMap[pixel.x][pixel.y+1];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,pixel.element);
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
            }
            else if (elements[newPixel.element].isScreen === true) {
                if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isSolid !== true && elements[newPixel.element].isMoving === true) {
                    swapPixels(newPixel, pixel)
                }
            }
            if (Math.random() > 0.5 && !isEmpty(pixel.x+1,pixel.y+1,true) && !isEmpty(pixel.x,pixel.y+1,true)) {
                newPixel = pixelMap[pixel.x+1][pixel.y+1];
                if (newPixel.element === "sandboxels_screen") {
                    changePixel(newPixel,pixel.element);
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");

                }
                else if (elements[newPixel.element].isScreen === true) {
                    if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isSolid !== true && elements[newPixel.element].isMoving === true) {
                        swapPixels(newPixel, pixel)
                    }
                }
            }
            else if (!isEmpty(pixel.x-1,pixel.y+1,true) && !isEmpty(pixel.x,pixel.y+1,true)) {
                newPixel = pixelMap[pixel.x-1][pixel.y+1];
                if (newPixel.element === "sandboxels_screen") {
                    changePixel(newPixel,pixel.element);
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");

                }
                else if (elements[newPixel.element].isScreen === true) {
                    if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isSolid !== true && elements[newPixel.element].isMoving === true) {
                        swapPixels(newPixel, pixel)
                    }
                }
            }
        }
    },
    state: "solid",
    density: 393,
}

elements.ash_screen = {
    name:"screen",
    hidden:true,
    color: ["#8c8c8c","#9c9c9c"],
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
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","sawdust"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    isScreen: true,
    isMoving: true,
    tick: function(pixel) {
        screenTemp(pixel)
        if (!isEmpty(pixel.x,pixel.y+1,true)) {
            var newPixel = pixelMap[pixel.x][pixel.y+1];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,pixel.element);
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
            }
            else if (elements[newPixel.element].isScreen === true) {
                if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isSolid !== true && elements[newPixel.element].isMoving === true) {
                    swapPixels(newPixel, pixel)
                }
            }
            if (Math.random() > 0.5 && !isEmpty(pixel.x+1,pixel.y+1,true) && !isEmpty(pixel.x,pixel.y+1,true)) {
                newPixel = pixelMap[pixel.x+1][pixel.y+1];
                if (newPixel.element === "sandboxels_screen") {
                    changePixel(newPixel,pixel.element);
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");

                }
                else if (elements[newPixel.element].isScreen === true) {
                    if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isSolid !== true && elements[newPixel.element].isMoving === true) {
                        swapPixels(newPixel, pixel)
                    }
                }
            }
            else if (!isEmpty(pixel.x-1,pixel.y+1,true) && !isEmpty(pixel.x,pixel.y+1,true)) {
                newPixel = pixelMap[pixel.x-1][pixel.y+1];
                if (newPixel.element === "sandboxels_screen") {
                    changePixel(newPixel,pixel.element);
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");

                }
                else if (elements[newPixel.element].isScreen === true) {
                    if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isSolid !== true && elements[newPixel.element].isMoving === true) {
                        swapPixels(newPixel, pixel)
                    }
                }
            }
        }
    },
    state: "solid",
    density: 700,
}

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
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","cellulose"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    isScreen: true,
    isMoving: true,
    tick: function(pixel) {
        if (pixel.dtemp > 99) { changePixel(pixel,"paper_screen") }
        screenTemp(pixel)
        if (Math.random() > 0.2 && !isEmpty(pixel.x,pixel.y+1,true)) {
            var newPixel = pixelMap[pixel.x][pixel.y+1];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,pixel.element);
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
            }
            else if (elements[newPixel.element].isScreen === true) {
                if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isMoving === true) {
                    swapPixels(newPixel, pixel)
                }
            }
            else if (Math.random() > 0.5 && !isEmpty(pixel.x+1,pixel.y+1,true)) {
                newPixel = pixelMap[pixel.x+1][pixel.y+1];
                if (newPixel.element === "sandboxels_screen") {
                    changePixel(newPixel,pixel.element);
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");

                }
                else if (elements[newPixel.element].isScreen === true) {
                    pixel.dtemp = newPixel.dtemp;
                    newPixel.dtemp = pixel.dtemp;
                    if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isMoving === true) {
                        swapPixels(newPixel, pixel)
                    }
                }
            }
            else if (!isEmpty(pixel.x-1,pixel.y+1,true)) {
                newPixel = pixelMap[pixel.x-1][pixel.y+1];
                if (newPixel.element === "sandboxels_screen") {
                    changePixel(newPixel,pixel.element);
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");

                }
                else if (elements[newPixel.element].isScreen === true) {
                    pixel.dtemp = newPixel.dtemp;
                    newPixel.dtemp = pixel.dtemp;
                    if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isMoving === true) {
                        swapPixels(newPixel, pixel)
                    }
                }
            }
        }
        else if (Math.random() > 0.5 && !isEmpty(pixel.x+1,pixel.y,true)) {
            var newPixel = pixelMap[pixel.x+1][pixel.y];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,pixel.element);
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
            }
            else if (elements[newPixel.element].isScreen === true) {
                if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isMoving === true) {
                    swapPixels(newPixel, pixel)
                }
            }
        }
        else if (!isEmpty(pixel.x-1,pixel.y,true)) {
            var newPixel = pixelMap[pixel.x-1][pixel.y];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,pixel.element);
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
            }
            else if (elements[newPixel.element].isScreen === true) {
                if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isMoving === true) {
                    swapPixels(newPixel, pixel)
                }
            }
        }
    },
    state: "solid",
    density: 1500,
}

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
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","blood"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    isScreen: true,
    isMoving: true,
    tick: function(pixel) {
        if (pixel.dtemp > 99) { changePixel(pixel,"steam_screen") }
        screenTemp(pixel)
        if (Math.random() > 0.2 && !isEmpty(pixel.x,pixel.y+1,true)) {
            var newPixel = pixelMap[pixel.x][pixel.y+1];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,pixel.element);
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
            }
            else if (elements[newPixel.element].isScreen === true) {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2)
                    pixel.dtemp = newPixel.dtemp
                    if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isMoving === true) {
                        swapPixels(newPixel, pixel)
                    }
                    if (elements[newPixel.element].id === elements.sand_screen.id) {
                        changePixel(newPixel, "wet_sand_screen")
                        changePixel(pixel, "sandboxels_screen")
                    }
            }
            else if (Math.random() > 0.5 && !isEmpty(pixel.x+1,pixel.y+1,true)) {
                newPixel = pixelMap[pixel.x+1][pixel.y+1];
                if (newPixel.element === "sandboxels_screen") {
                    changePixel(newPixel,pixel.element);
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");

                }
                else if (elements[newPixel.element].isScreen === true) {
                    pixel.dtemp = newPixel.dtemp;
                    newPixel.dtemp = pixel.dtemp;
                    if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isMoving === true) {
                        swapPixels(newPixel, pixel)
                    }
                    if (elements[newPixel.element].id === elements.sand_screen.id) {
                        changePixel(newPixel, "wet_sand_screen")
                        changePixel(pixel, "sandboxels_screen")
                    }
                }
            }
            else if (!isEmpty(pixel.x-1,pixel.y+1,true)) {
                newPixel = pixelMap[pixel.x-1][pixel.y+1];
                if (newPixel.element === "sandboxels_screen") {
                    changePixel(newPixel,pixel.element);
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");

                }
                else if (elements[newPixel.element].isScreen === true) {
                    pixel.dtemp = newPixel.dtemp;
                    newPixel.dtemp = pixel.dtemp;
                    if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isMoving === true) {
                        swapPixels(newPixel, pixel)
                    }
                    if (elements[newPixel.element].id === elements.sand_screen.id) {
                        changePixel(newPixel, "wet_sand_screen")
                        changePixel(pixel, "sandboxels_screen")
                    }
                }
            }
        }
        else if (Math.random() > 0.5 && !isEmpty(pixel.x+1,pixel.y,true)) {
            var newPixel = pixelMap[pixel.x+1][pixel.y];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,pixel.element);
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
            }
            else if (elements[newPixel.element].isScreen === true) {
                if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isMoving === true) {
                    swapPixels(newPixel, pixel)
                }
                if (elements[newPixel.element].id === elements.sand_screen.id) {
                    changePixel(newPixel, "wet_sand_screen")
                    changePixel(pixel, "sandboxels_screen")
                }
            }
        }
        else if (!isEmpty(pixel.x-1,pixel.y,true)) {
            var newPixel = pixelMap[pixel.x-1][pixel.y];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,pixel.element);
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
            }
            else if (elements[newPixel.element].isScreen === true) {
                if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isMoving === true) {
                    swapPixels(newPixel, pixel)
                }
                if (elements[newPixel.element].id === elements.sand_screen.id) {
                    changePixel(newPixel, "wet_sand_screen")
                    changePixel(pixel, "sandboxels_screen")
                }
            }
        }
    },
    state: "solid",
    density: 1060,
}
    
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
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","water"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    isScreen: true,
    isMoving: true,
    tick: function(pixel) {
        if (pixel.dtemp < 0) { changePixel(pixel,"ice_screen") }
        if (pixel.dtemp > 99) { changePixel(pixel,"steam_screen") }
        screenTemp(pixel)
        if (Math.random() > 0.2 && !isEmpty(pixel.x,pixel.y+1,true)) {
            var newPixel = pixelMap[pixel.x][pixel.y+1];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,pixel.element);
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
            }
            else if (elements[newPixel.element].isScreen === true) {
                if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isMoving === true) {
                    swapPixels(newPixel, pixel)
                }
                if (elements[newPixel.element].id === elements.sand_screen.id) {
                    changePixel(newPixel, "wet_sand_screen")
                    changePixel(pixel, "sandboxels_screen")
                }
                if (elements[newPixel.element].id === elements.dirt_screen.id) {
                    changePixel(newPixel, "mud_screen")
                    changePixel(pixel, "sandboxels_screen")
                }
                if (elements[newPixel.element].id === elements.sawdust_screen.id || elements[newPixel.element].id === elements.paper_screen.id) {
                    changePixel(newPixel, "cellulose_screen")
                    changePixel(pixel, "sandboxels_screen")
                }
            }
            else if (Math.random() > 0.5 && !isEmpty(pixel.x+1,pixel.y+1,true)) {
                newPixel = pixelMap[pixel.x+1][pixel.y+1];
                if (newPixel.element === "sandboxels_screen") {
                    changePixel(newPixel,pixel.element);
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");

                }
                else if (elements[newPixel.element].isScreen === true) {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2)
                    pixel.dtemp = newPixel.dtemp
                    if (elements[newPixel.element].id === elements.sand_screen.id) {
                        changePixel(newPixel, "wet_sand_screen")
                        changePixel(pixel, "sandboxels_screen")
                    }
                    if (elements[newPixel.element].id === elements.dirt_screen.id) {
                        changePixel(newPixel, "mud_screen")
                        changePixel(pixel, "sandboxels_screen")
                    }
                    if (elements[newPixel.element].id === elements.sawdust_screen.id || elements[newPixel.element].id === elements.paper_screen.id) {
                        changePixel(newPixel, "cellulose_screen")
                        changePixel(pixel, "sandboxels_screen")
                    }
                }
            }
            else if (!isEmpty(pixel.x-1,pixel.y+1,true)) {
                newPixel = pixelMap[pixel.x-1][pixel.y+1];
                if (newPixel.element === "sandboxels_screen") {
                    changePixel(newPixel,pixel.element);
                    newPixel.dtemp = pixel.dtemp;
                    changePixel(pixel,"sandboxels_screen");

                }
                else if (elements[newPixel.element].isScreen === true) {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2)
                    pixel.dtemp = newPixel.dtemp
                    if (elements[newPixel.element].id === elements.sand_screen.id) {
                        changePixel(newPixel, "wet_sand_screen")
                        changePixel(pixel, "sandboxels_screen")
                    }
                    if (elements[newPixel.element].id === elements.dirt_screen.id) {
                        changePixel(newPixel, "mud_screen")
                        changePixel(pixel, "sandboxels_screen")
                    }
                    if (elements[newPixel.element].id === elements.sawdust_screen.id || elements[newPixel.element].id === elements.paper_screen.id) {
                        changePixel(newPixel, "cellulose_screen")
                        changePixel(pixel, "sandboxels_screen")
                    }
                }
            }
        }
        else if (Math.random() > 0.5 && !isEmpty(pixel.x+1,pixel.y,true)) {
            var newPixel = pixelMap[pixel.x+1][pixel.y];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,pixel.element);
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
            }
            else if (elements[newPixel.element].isScreen === true) {
                if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isMoving === true) {
                    swapPixels(newPixel, pixel)
                }
                if (elements[newPixel.element].id === elements.sand_screen.id) {
                    changePixel(newPixel, "wet_sand_screen")
                    changePixel(pixel, "sandboxels_screen")
                }
                if (elements[newPixel.element].id === elements.dirt_screen.id) {
                    changePixel(newPixel, "mud_screen")
                    changePixel(pixel, "sandboxels_screen")
                }
                if (elements[newPixel.element].id === elements.sawdust_screen.id || elements[newPixel.element].id === elements.paper_screen.id) {
                    changePixel(newPixel, "cellulose_screen")
                    changePixel(pixel, "sandboxels_screen")
                }
            }
        }
        else if (!isEmpty(pixel.x-1,pixel.y,true)) {
            var newPixel = pixelMap[pixel.x-1][pixel.y];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,pixel.element);
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
            }
            else if (elements[newPixel.element].isScreen === true) {
                if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isMoving === true) {
                    swapPixels(newPixel, pixel)
                }
                if (elements[newPixel.element].id === elements.sand_screen.id) {
                    changePixel(newPixel, "wet_sand_screen")
                    changePixel(pixel, "sandboxels_screen")
                }
                if (elements[newPixel.element].id === elements.dirt_screen.id) {
                    changePixel(newPixel, "mud_screen")
                    changePixel(pixel, "sandboxels_screen")
                }
                if (elements[newPixel.element].id === elements.sawdust_screen.id || elements[newPixel.element].id === elements.paper_screen.id) {
                    changePixel(newPixel, "cellulose_screen")
                    changePixel(pixel, "sandboxels_screen")
                }
            }
        }
    },
    state: "solid",
    density: 997,
}

elements.steam_screen = {
    name:"screen",
    hidden:true,
    color: "#abd6ff",
    properties: {
        dtemp: 150,
    },
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","steam"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    isScreen: true,
    isMoving: true,
    tick: function(pixel) {
        if (pixel.dtemp < 100) { changePixel(pixel,"water_screen") }
        screenTemp(pixel)
        if (Math.random() > 0.5) {
            pixel.dir1 = 1
        }
        else {
            pixel.dir1 = -1
        }
        if (Math.random() < 0.5) {
            pixel.dir2 = 1
        }
        else {
            pixel.dir2 = -1
        }
        if (Math.random() > 0.25 && !isEmpty(pixel.x+(pixel.dir1),pixel.y-(pixel.dir2),true)) {
            var newPixel = pixelMap[pixel.x+(pixel.dir1)][pixel.y-(pixel.dir2)];
            if (newPixel.element === "sandboxels_screen") {
                changePixel(newPixel,pixel.element);
                newPixel.dtemp = pixel.dtemp;
                changePixel(pixel,"sandboxels_screen");
            }
            else if (elements[newPixel.element].isScreen === true) {
            }
        }
    },
    state: "solid",
    density: 0.6,
}

elements.oxygen_screen = {
    name:"screen",
    hidden:true,
    color: "#99c7ff",
    properties: {
        dtemp: 20,
    },
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","oxygen"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    isScreen: true,
    isMoving: true,
    tick: function(pixel) {
        screenTemp(pixel)
        if (Math.random() > 0.5) {
            pixel.dir1 = 1
        }
        else {
            pixel.dir1 = -1
        }
        if (Math.random() < 0.5) {
            pixel.dir2 = 1
        }
        else {
            pixel.dir2 = -1
        }
        if (Math.random() > 0.5 && !isEmpty(pixel.x+(pixel.dir1),pixel.y-(pixel.dir2),true)) {
            var newPixel = pixelMap[pixel.x+(pixel.dir1)][pixel.y-(pixel.dir2)];
            if (newPixel.element === "sandboxels_screen") {
                swapPixels(newPixel, pixel)
            }
            else if (elements[newPixel.element].isScreen === true) {
            }
        }
    },
    state: "solid",
    density: 1.292,
}

elements.fire_screen = {
    name:"screen",
    hidden:true,
    color: ["#ff6b21","#ffa600","#ff4000"],
    properties: {
        dtemp: 600,
    },
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","oxygen"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    isScreen: true,
    isMoving: true,
    digburning: true,
    digburnTime: 25,
    digburnInto: "smoke_screen",
    tick: function(pixel) {
        if (pixel.dtemp < 100) { changePixel(pixel,"smoke_screen") }
        screenTemp(pixel)
        doScreenBurning(pixel)
        if (Math.random() > 0.975) {
            changePixel(pixel,"smoke_screen")
        }
        if (Math.random() > 0.5) {
            pixel.dir1 = 1
        }
        else {
            pixel.dir1 = -1
        }
        if (Math.random() < 0.75) {
            pixel.dir2 = 1
        }
        else {
            pixel.dir2 = -1
        }
        if (Math.random() > 0.05 && !isEmpty(pixel.x+(pixel.dir1),pixel.y-(pixel.dir2),true)) {
            var newPixel = pixelMap[pixel.x+(pixel.dir1)][pixel.y-(pixel.dir2)];
            if (newPixel.element === "sandboxels_screen") {
                swapPixels(newPixel, pixel)
            }
            else if (elements[newPixel.element].isScreen === true) {
            }
        }
    },
    state: "solid",
    density: 0.1,
}

elements.smoke_screen = {
    name:"screen",
    hidden:true,
    color: "#383838",
    properties: {
        dtemp: 20,
    },
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","oxygen"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    isScreen: true,
    isMoving: true,
    tick: function(pixel) {
        if (pixel.dtemp > 1000) { changePixel(pixel,"fire_screen") }
        screenTemp(pixel)
        if (Math.random() > 0.95) {
            changePixel(pixel,"sandboxels_screen")
        }
        if (Math.random() > 0.5) {
            pixel.dir1 = 1
        }
        else {
            pixel.dir1 = -1
        }
        if (Math.random() < 0.5) {
            pixel.dir2 = 1
        }
        else {
            pixel.dir2 = -1
        }
        if (Math.random() > 0.5 && !isEmpty(pixel.x+(pixel.dir1),pixel.y-(pixel.dir2),true)) {
            var newPixel = pixelMap[pixel.x+(pixel.dir1)][pixel.y-(pixel.dir2)];
            if (newPixel.element === "sandboxels_screen") {
                swapPixels(newPixel, pixel)
            }
            else if (elements[newPixel.element].isScreen === true) {
            }
        }
    },
    state: "solid",
    density: 1.292,
}

elements.body_screen = {
    color: ["#A8A7AB","#878689"],
    name:"screen",
    hidden:true,
    behavior: behaviors.WALL,
    properties: {
        dtemp: 20,
        dir: 1,
    },
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","body"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    digBreakInto: "blood_screen",
    isScreen: true,
    isSolid: true,
    dburn: 10,
    digburnTime: 250,
    digburnInto: ["fire_screen","ash_screen","ash_screen"],
    tick: function(pixel) {
        if (pixel.dtemp > 300) { changePixel(pixel,"ash_screen") }
        screenTemp(pixel)
        doScreenBurning(pixel)
        if (!isEmpty(pixel.x,pixel.y-1,true) && pixelMap[pixel.x][pixel.y-1].element === "head_screen") {
            var headPixel = pixelMap[pixel.x][pixel.y-1]
            if (Math.random() > 0.9) {
                pixel.dir *= -1
            }
            if (!isEmpty(pixel.x,pixel.y+1,true)) {
                var newPixel = pixelMap[pixel.x][pixel.y+1]
                if (newPixel.element === "sandboxels_screen") {
                    swapPixels(headPixel, pixel)
                    swapPixels(newPixel, pixel)
                }
                else if (elements[newPixel.element].isScreen === true) {
                    if (Math.random() < 0.5 && !isEmpty(pixel.x+pixel.dir,pixel.y,true) && !isEmpty(pixel.x+pixel.dir,pixel.y-1,true)) {
                        var newPixel = pixelMap[pixel.x+pixel.dir][pixel.y];
                        var newHeadPixel = pixelMap[pixel.x+pixel.dir][pixel.y-1];
                        if (newPixel.element === "sandboxels_screen" && newHeadPixel.element === "sandboxels_screen") {
                            swapPixels(newPixel, pixel)
                            swapPixels(headPixel, newHeadPixel)
                        }
                        else if (newPixel.element !== "sandboxels_screen" && newHeadPixel.element === "sandboxels_screen") {
                            var newPixel2 = newHeadPixel;
                            var newHeadPixel2 = pixelMap[newHeadPixel.x][newHeadPixel.y-1];
                            if (newPixel2.element === "sandboxels_screen" && newHeadPixel2.element === "sandboxels_screen") {
                                swapPixels(newPixel2, pixel)
                                swapPixels(headPixel, newHeadPixel2)
                            }
                        }
                    }
                }
            }
            else if (Math.random() < 0.5 && !isEmpty(pixel.x+pixel.dir,pixel.y,true) && !isEmpty(pixel.x+pixel.dir,pixel.y-1,true)) {
                var newPixel = pixelMap[pixel.x+pixel.dir][pixel.y];
                var newHeadPixel = pixelMap[pixel.x+pixel.dir][pixel.y-1];
                if (newPixel.element === "sandboxels_screen" && newHeadPixel.element === "sandboxels_screen") {
                    swapPixels(newPixel, pixel)
                    swapPixels(headPixel, newHeadPixel)
                }
                else if (newPixel.element !== "sandboxels_screen" && newHeadPixel.element === "sandboxels_screen") {
                    var newPixel2 = newHeadPixel;
                    var newHeadPixel2 = pixelMap[newHeadPixel.x][newHeadPixel.y-1];
                    if (newPixel2.element === "sandboxels_screen" && newHeadPixel2.element === "sandboxels_screen") {
                        swapPixels(newPixel2, pixel)
                        swapPixels(headPixel, newHeadPixel2)
                    }
                }
            }
        }
        else if (!isEmpty(pixel.x,pixel.y+1,true)) {
            var newPixel = pixelMap[pixel.x][pixel.y+1];
            if (newPixel.element === "sandboxels_screen") {
                swapPixels(newPixel, pixel)
            }
            else if (elements[newPixel.element].isScreen === true) {
            }
        }
    },
}

elements.head_screen = {
    color: ["#46433F","#47443C","#4D483D"],
    name:"screen",
    hidden:true,
    behavior: behaviors.WALL,
    properties: {
        dtemp: 20,
    },
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","head"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    digBreakInto: "blood_screen",
    isScreen: true,
    isSolid: true,
    dburn: 10,
    digburnTime: 250,
    digburnInto: ["fire_screen","ash_screen","ash_screen"],
    tick: function(pixel) {
        if (pixel.dtemp > 300) { changePixel(pixel,"ash_screen") }
        screenTemp(pixel)
        doScreenBurning(pixel)
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

                }
            }
            else if (elements[newPixel.element].isScreen === true) {
            }
        }
    },
}

elements.fly_screen = {
    name:"screen",
    hidden:true,
    color: "#4c4e42",
    properties: {
        dtemp: 20,
        dir: 1,
    },
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","fly"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    digBreakInto: "blood_screen",
    isScreen: true,
    isMoving: true,
    isSolid: true,
    dburn: 95,
    digburnTime: 25,
    digburnInto: ["fire_screen","ash_screen","ash_screen"],
    tick: function(pixel) {
        if (pixel.dtemp > 100) { changePixel(pixel,"ash_screen") }
        screenTemp(pixel)
        doScreenBurning(pixel)
        if (outOfBounds(pixel.x+(pixel.dir),pixel.y) || isEmpty(pixel.x+(pixel.dir),pixel.y)) {
            if (pixel.dir === -1) {
                pixel.dir = 1
            }
            else if (pixel.dir === 1) {
                pixel.dir = -1
            }
        }
        if (Math.random() > 0.5 && !isEmpty(pixel.x+(pixel.dir),pixel.y-1,true)) {
            var newPixel = pixelMap[pixel.x+(pixel.dir)][pixel.y-1];
            if (newPixel.element === "sandboxels_screen") {
                swapPixels(newPixel, pixel)
            }
            else if (elements[newPixel.element].isScreen === true || newPixel.element !== "sandboxels_screen") {
                if (pixel.dir === -1) {
                    pixel.dir = 1
                }
                else if (pixel.dir === 1) {
                    pixel.dir = -1
                }
            }
        }
        else if (!isEmpty(pixel.x+(pixel.dir),pixel.y+1,true)) {
            var newPixel = pixelMap[pixel.x+(pixel.dir)][pixel.y+1];
            if (newPixel.element === "sandboxels_screen") {
                swapPixels(newPixel, pixel)
            }
            else if (elements[newPixel.element].isScreen === true || newPixel.element !== "sandboxels_screen") {
                if (pixel.dir === -1) {
                    pixel.dir = 1
                }
                else if (pixel.dir === 1) {
                    pixel.dir = -1
                }
            }
        }
    },
    state: "solid",
    density: 600,
}

elements.bird_screen = {
    name:"screen",
    hidden:true,
    color: "#997457",
    properties: {
        dtemp: 20,
        dir: 1,
    },
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","bird"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    digBreakInto: "blood_screen",
    isScreen: true,
    isMoving: true,
    isSolid: true,
    dburn: 2,
    digburnTime: 100,
    digburnInto: ["fire_screen","ash_screen","ash_screen"],
    tick: function(pixel) {
        if (pixel.dtemp > 300) { changePixel(pixel,"ash_screen") }
        screenTemp(pixel)
        doScreenBurning(pixel)
        if (outOfBounds(pixel.x+(pixel.dir),pixel.y) || isEmpty(pixel.x+(pixel.dir),pixel.y)) {
            if (pixel.dir === -1) {
                pixel.dir = 1
            }
            else if (pixel.dir === 1) {
                pixel.dir = -1
            }
        }
        if (Math.random() > 0.25 && !isEmpty(pixel.x+(pixel.dir),pixel.y,true)) {
            var newPixel = pixelMap[pixel.x+(pixel.dir)][pixel.y];
            if (newPixel.element === "sandboxels_screen") {
                swapPixels(newPixel, pixel)
            }
            else if (elements[newPixel.element].isScreen === true || newPixel.element !== "sandboxels_screen") {
                if (elements[newPixel.element].id === elements.fly_screen.id && Math.random() < 0.5) {
                    changePixel(newPixel, "sandboxels_screen")
                }
                if (pixel.dir === -1) {
                    pixel.dir = 1
                }
                else if (pixel.dir === 1) {
                    pixel.dir = -1
                }
            }
        }
        else {
            if (Math.random() > 0.5 && !isEmpty(pixel.x+(pixel.dir),pixel.y+1,true)) {
                var newPixel = pixelMap[pixel.x+(pixel.dir)][pixel.y+1];
                if (newPixel.element === "sandboxels_screen") {
                    swapPixels(newPixel, pixel)
                }
                else if (elements[newPixel.element].isScreen === true || newPixel.element !== "sandboxels_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2)
                    pixel.dtemp = newPixel.dtemp
                    if (elements[newPixel.element].id === elements.fly_screen.id && Math.random() < 0.5) {
                        changePixel(newPixel, "sandboxels_screen")
                    }
                    if (pixel.dir === -1) {
                        pixel.dir = 1
                    }
                    else if (pixel.dir === 1) {
                        pixel.dir = -1
                    }
                }
            }
            else if (!isEmpty(pixel.x+(pixel.dir),pixel.y-1,true)) {
                var newPixel = pixelMap[pixel.x+(pixel.dir)][pixel.y-1];
                if (newPixel.element === "sandboxels_screen") {
                    swapPixels(newPixel, pixel)
                }
                else if (elements[newPixel.element].isScreen === true || newPixel.element !== "sandboxels_screen") {
                    newPixel.dtemp = ((pixel.dtemp + newPixel.dtemp) / 2)
                    pixel.dtemp = newPixel.dtemp
                    if (elements[newPixel.element].id === elements.fly_screen.id && Math.random() < 0.5) {
                        changePixel(newPixel, "sandboxels_screen")
                    }
                    if (pixel.dir === -1) {
                        pixel.dir = 1
                    }
                    else if (pixel.dir === 1) {
                        pixel.dir = -1
                    }
                }
            }
        }
    },
    state: "solid",
    density: 400,
}

elements.rat_screen = {
    color: ["#a698a9","#8c7d82","#ccc3cf"],
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
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","rat"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    digBreakInto: "blood_screen",
    isScreen: true,
    isSolid: true,
    isMoving: true,
    dburn: 2,
    digburnTime: 100,
    digburnInto: ["fire_screen","ash_screen","ash_screen"],
    tick: function(pixel) {
        if (pixel.dtemp > 300) { changePixel(pixel,"ash_screen") }
        screenTemp(pixel)
        doScreenBurning(pixel)
        if (!isEmpty(pixel.x,pixel.y+1,true)) {
            var newPixel = pixelMap[pixel.x][pixel.y+1]
            if (newPixel.element === "sandboxels_screen") {
                swapPixels(newPixel,pixel);
            }
            else if (Math.random() < 0.25 && elements[newPixel.element].isScreen === true) {
                if (elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isSolid !== true && elements[newPixel.element].isMoving === true) {
                    swapPixels(newPixel, pixel)
                }
                if (Math.random() < 0.5 && !isEmpty(pixel.x+1,pixel.y,true) && !isEmpty(pixel.x+1,pixel.y-1,true)) {
                    var newPixel = pixelMap[pixel.x+1][pixel.y];
                    var newUpPixel = pixelMap[pixel.x+1][pixel.y-1];
                    if (newPixel.element === "sandboxels_screen" || elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isSolid !== true && elements[newPixel.element].isMoving === true) {
                        swapPixels(newPixel,pixel);
                    }
                    else if (newPixel.element !== "sandboxels_screen" && newUpPixel.element === "sandboxels_screen") {
                        swapPixels(newUpPixel,pixel);
                    }
                }
                else if (!isEmpty(pixel.x-1,pixel.y,true) && !isEmpty(pixel.x-1,pixel.y-1,true)) {
                    var newPixel = pixelMap[pixel.x-1][pixel.y];
                    var newUpPixel = pixelMap[pixel.x-1][pixel.y-1];
                    if (newPixel.element === "sandboxels_screen" || elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isSolid !== true && elements[newPixel.element].isMoving === true) {
                        swapPixels(newPixel,pixel);
                    }
                    else if (newPixel.element !== "sandboxels_screen" && newUpPixel.element === "sandboxels_screen") {
                        swapPixels(newUpPixel,pixel);
                    }
                }
            }
        }
        else if (Math.random() < 0.25) {
            if (Math.random() < 0.5 && !isEmpty(pixel.x+1,pixel.y,true) && !isEmpty(pixel.x+1,pixel.y-1,true)) {
                var newPixel = pixelMap[pixel.x+1][pixel.y];
                var newUpPixel = pixelMap[pixel.x+1][pixel.y-1];
                if (newPixel.element === "sandboxels_screen" || elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isSolid !== true && elements[newPixel.element].isMoving === true) {
                    swapPixels(newPixel,pixel);
                }
                else if (newPixel.element !== "sandboxels_screen" && newUpPixel.element === "sandboxels_screen") {
                    swapPixels(newUpPixel,pixel);
                }
            }
            else if (!isEmpty(pixel.x-1,pixel.y,true) && !isEmpty(pixel.x-1,pixel.y-1,true)) {
                var newPixel = pixelMap[pixel.x-1][pixel.y];
                var newUpPixel = pixelMap[pixel.x-1][pixel.y-1];
                if (newPixel.element === "sandboxels_screen" || elements[newPixel.element].density < elements[pixel.element].density && elements[newPixel.element].isSolid !== true && elements[newPixel.element].isMoving === true) {
                    swapPixels(newPixel,pixel);
                }
                else if (newPixel.element !== "sandboxels_screen" && newUpPixel.element === "sandboxels_screen") {
                    swapPixels(newUpPixel,pixel);
                }
            }
        }    
    },
    density: 1450,
}

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
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","ice"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    isScreen: true,
    isSolid: true,
    tick: function(pixel) {
        if (pixel.dtemp > 5) { changePixel(pixel,"water_screen") }
        screenTemp(pixel)
    },
    state: "solid",
    density: 1200,
}

elements.wood_screen = {
    name:"screen",
    hidden:true,
    color: "#a0522d",
    behavior: behaviors.WALL,
    properties: {
        dtemp: 20,
    },
    digBreakInto: "sawdust_screen",
    isScreen: true,
    isSolid: true,
    dburn: 5,
    digburnTime: 300,
    digburnInto: ["fire_screen","ash_screen"],
    tick: function(pixel) {
        if (pixel.dtemp > 400) { changePixel(pixel,"fire_screen") }
        screenTemp(pixel)
        doScreenBurning(pixel)
    },
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","wood"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    state: "solid",
    density: 1200,
}

elements.paper_screen = {
    name:"screen",
    hidden:true,
    color: "#f0f0f0",
    behavior: behaviors.WALL,
    properties: {
        dtemp: 20,
    },
    isScreen: true,
    isSolid: true,
    dburn: 70,
    digburnTime: 300,
    digburnInto: ["fire_screen","fire_screen","fire_screen","fire_screen","fire_screen","fire_screen","ash_screen"],
    tick: function(pixel) {
        if (pixel.dtemp > 248) { changePixel(pixel,"fire_screen") }
        screenTemp(pixel)
        doScreenBurning(pixel)
    },
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","paper"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    state: "solid",
    density: 1200,
}

elements.wall_screen = {
    name:"screen",
    hidden:true,
    color: "#808080",
    behavior: behaviors.WALL,
    properties: {
        dtemp: 0,
    },
    isScreen: true,
    isSolid: true,
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    breakInto: ["glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","glass_shard","concrete"],
    tempLow: -45,
    stateLow: "sandboxels_screen_off",
    category: "simulation",
    state: "solid",
    density: 1200,
}

elements.simulated_sand = {
    color: "#e6d577",
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"sand_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on screen to place simulated sand."
}

elements.simulated_dirt = {
    color: ["#76552b","#5c4221","#573c1a","#6b481e"],
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"dirt_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on screen to place simulated dirt."
}

elements.simulated_wet_sand = {
    color: ["#a19348","#b5a85e"],
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"wet_sand_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on screen to place simulated wet sand."
}

elements.simulated_mud = {
    color: "#382417",
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"mud_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on screen to place simulated mud."
}

elements.simulated_rock = {
    color: ["#808080","#4f4f4f","#949494"],
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"rock_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on screen to place simulated sand."
}

elements.simulated_ash = {
    color: ["#8c8c8c","#9c9c9c"],
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"ash_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on screen to place simulated ash."
}

elements.simulated_water = {
    color: "#2167ff",
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"water_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on a screen to place simulated water."
}

elements.simulated_ice = {
    color: "#b2daeb",
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"ice_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on a screen to place simulated ice."
}

elements.simulated_steam = {
    color: "#abd6ff",
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"steam_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on a screen to place simulated steam."
}

elements.simulated_blood = {
    color: ["#ff0000","#ee0000"],
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"blood_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on a screen to place simulated blood."
}

elements.simulated_fly = {
    color: "#4c4e42",
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"fly_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on a screen to place simulated flies."
}

elements.simulated_bird = {
    color: "#997457",
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"bird_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on a screen to place simulated birds."
}

elements.simulated_rat = {
    color: ["#a698a9","#8c7d82","#ccc3cf"],
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"rat_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on a screen to place simulated rats."
}

elements.simulated_oxygen = {
    color: "#99c7ff",
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"oxygen_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on a screen to place simulated oxygen."
}

elements.simulated_fire = {
    color: ["#ff6b21","#ffa600","#ff4000"],
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"fire_screen"); 
            pixel.digburning = true
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on a screen to place simulated fire."
}

elements.simulated_smoke = {
    color: "#383838",
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"smoke_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on a screen to place simulated smoke."
}

elements.simulated_sawdust = {
    color: ["#dec150","#c7b15a"],
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"sawdust_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on screen to place simulated sawdust."
}

elements.simulated_wood = {
    color: "#a0522d",
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"wood_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on a screen to place simulated wood."
}

elements.simulated_paper = {
    color: "#f0f0f0",
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"paper_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on a screen to place simulated paper."
}

elements.simulated_wall = {
    color: "#808080",
    tool: function(pixel) {
        if (elements[pixel.element].id === elements.sandboxels_screen.id) {
            changePixel(pixel,"wall_screen"); 
        }
    },
    insulate:true,
    canPlace: false,
    category: "simulation",
    desc: "Use on a screen to place simulated wall."
}

elements.danger_suit = {
    color: ["#A8A7AB","#878689"],
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "radiation": { elem2:"electric", temp1:200 },
        "body":{ elem1:null, elem2:"suited_body" },
    },
    tempHigh: 500,
    stateHigh: ["molten_aluminum","smoke","ash"],
    burn: 1,
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
}

elements.danger_helmet = {
    color: ["#323233","#434344"],
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "head":{ elem1:null, elem2:"suited_head" },
    },
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_plastic"],
    burn: 1,
    burnTime: 200,
    burnInto: ["glass_shard","glass_shard","glass_shard","glass_shard","dioxin","smoke","dioxin","smoke","stench"],
    category: "simulation",
    state: "solid",
    density: 2500,
    breakInto: "glass_shard",
}

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
}

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
}

elements.digitalizer = {
    color: ["#d1c6be","#b5c0ad","#b9b8bc"],
    behavior: behaviors.WALL,
    onSelect: function() {
        logMessage("Do not digitalize unregistered elements!");
    },
    tempHigh: 600,
    stateHigh: ["molten_aluminum","molten_aluminum","molten_aluminum","molten_gallium"],
    breakInto: ["metal_scrap"],
    tempLow: -80,
    stateLow: "glass_shard",
    category: "simulation",
    tick: function(pixel) {
        if (!isEmpty(pixel.x,pixel.y-1,true) && !isEmpty(pixel.x,pixel.y+1,true)) {
            var newPixel = pixelMap[pixel.x][pixel.y-1];
            var screen = pixelMap[pixel.x][pixel.y+1];
            if (screen.element === "sandboxels_screen") {
                var newElement = newPixel.element
                var newElementName = `${newElement}_screen`
                if (newElement === "body") {
                    changePixel(screen,"blood_screen");
                    deletePixel(newPixel.x,newPixel.y)
                }
                else if (newElement === "head") {
                    changePixel(screen,"blood_screen");
                    deletePixel(newPixel.x,newPixel.y)
                }
                else if (!isEmpty(pixel.x,pixel.y-2,true) && newElement === "suited_body") {
                    var headPixel = pixelMap[pixel.x][pixel.y-2];
                    if (headPixel.element === "suited_head" && newElement === "suited_body") {
                        changePixel(screen,"simulated_human");
                        deletePixel(newPixel.x,newPixel.y-1)
                        deletePixel(newPixel.x,newPixel.y)
                    }
                    else {
                        changePixel(screen,"blood_screen");
                        deletePixel(newPixel.x,newPixel.y)
                    }
                }
                else if (elements[newElementName]) {
                    changePixel(screen,newElementName);
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
    desc: "digitalizes elements."
}

if (!elements.malware.reactions) { elements.malware.reactions = {} }
    elements.malware.reactions.sandboxels_screen = { "elem2": ["sand_screen","sandboxels_screen_off","sandboxels_screen_off","malware"] };
    elements.malware.reactions.sawdust_screen = { "elem2": ["wall_screen","wall_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.sand_screen = { "elem2": ["paper_screen","paper_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.rock_screen = { "elem2": ["wood_screen","wood_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.cellulose_screen = { "elem2": ["blood_screen","blood_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.blood_screen = { "elem2": ["ice_screen","ice_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.water_screen = { "elem2": ["steam_screen","steam_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.steam_screen = { "elem2": ["water_screen","water_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.ice_screen = { "elem2": ["cellulose_screen","cellulose_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.wood_screen = { "elem2": ["rock_screen","rock_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.paper_screen = { "elem2": ["sand_screen","sand_screen","sandboxels_screen_off","malware"] };
    elements.malware.reactions.wall_screen = { "elem2": ["sawdust_screen","sawdust_screen","sandboxels_screen_off","malware"] };

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
