window.addEventListener('load', function() {
	for (var element in elements) {
		if (!elements[element].onPlace) {elements[element].onPlace = function(pixel) {
            pixel.alphaLight = 0.1
        }
	}
    }
});

day = false

bigCircleCoords = [
    [0,-1],
    [0,1],
    [1,0],
    [-1,0],
    [1,1],
    [1,-1],
    [-1,1],
    [-1,-1],
    [0,-2],
    [0,2],
    [2,0],
    [-2,0],
];
bigCircleCoordsShuffle = bigCircleCoords.slice();

elements.light_switch = {
    color: "#d2dfd7",
    behavior: [
        "CR:photon|CR:photon|CR:photon",
        "CR:photon|XX|CR:photon",
        "CR:photon|CR:photon|CR:photon",
    ],
    tool: function(pixel) {},
    onSelect: function() {
        if (day != true) {
            day = true
        }
        else if (day != false) {
            day = false
        }
        selectElement(prevElement);
    },
    category: "tools",
    canPlace: false,
    darkText: true,
    desc: "Use on pixels to move them around."
}

elements.light = {
    color: "#fffdcf",
    tick: function(pixel) {
    if (Math.random() < 0.01) {
        deletePixel(pixel.x,pixel.y);
        return;
    }
    if (pixel.visible < 1000) {
        pixel.visible = 10000
    }
    if (pixel.bx===undefined) {
        // choose 1, 0, or -1
        pixel.bx = Math.random() < 0.5 ? 1 : Math.random() < 0.5 ? 0 : -1;
        pixel.by = Math.random() < 0.5 ? 1 : Math.random() < 0.5 ? 0 : -1;
        // if both are 0, make one of them 1 or -1
        if (pixel.bx===0 && pixel.by===0) {
            if (Math.random() < 0.5) { pixel.bx = Math.random() < 0.5 ? 1 : -1; }
            else { pixel.by = Math.random() < 0.5 ? 1 : -1; }
        }
    }
    // move and invert direction if hit
    if (pixel.bx && !tryMove(pixel, pixel.x+pixel.bx, pixel.y)) {
        var newX = pixel.x + pixel.bx;
        if (!isEmpty(newX, pixel.y, true)) {
            var newPixel = pixelMap[pixel.x+pixel.bx][pixel.y];
            if (!elements[newPixel.element].insulate) {
                newPixel.temp += 1;
                pixelTempCheck(newPixel);
            }
            if (!elements.light.reactions[newPixel.element]) {
                pixel.color = newPixel.color;
            }
            if (!newPixel.visible) { newPixel.visible = 25 }
            else { newPixel.visible += 25 }
            if (elements[newPixel.element].state == "liquid" && elements[newPixel.element].movable != false) {
                swapPixels(pixel,newPixel)
            }
            else {pixel.bx = -pixel.bx;}
        }
        else if (outOfBounds(newX, pixel.y)) {
            pixel.bx = -pixel.bx;
        }
    }
    if (pixel.by && !tryMove(pixel, pixel.x, pixel.y+pixel.by)) {
        var newY = pixel.y + pixel.by;
        if (!isEmpty(pixel.x, newY, true)) {
            var newPixel = pixelMap[pixel.x][pixel.y+pixel.by];
            if (!elements[newPixel.element].insulate) {
                newPixel.temp += 1;
                pixelTempCheck(newPixel);
            }
            if (!elements.light.reactions[newPixel.element]) {
                pixel.color = newPixel.color;
            }
            if (!newPixel.visible) { newPixel.visible = 25 }
            else { newPixel.visible += 25 }
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coords = adjacentCoords[i];
                var x = newPixel.x + coords[0];
                var y = newPixel.y + coords[1];
                if (!isEmpty(x,y,true)) {
                    var adjacentPixel = pixelMap[x][y];
                    if (elements[newPixel.element].id === elements.glass.id || elements[newPixel.element].id === elements.rad_glass.id) {
                        if (!adjacentPixel.visible) { adjacentPixel.visible = 25 }
                        else { adjacentPixel.visible += 25 }
                    }
                    else {
                        if (!adjacentPixel.visible) { adjacentPixel.visible = 10 }
                        else { adjacentPixel.visible += 10 }
                    }
                }
            }
            if (elements[newPixel.element].state == "liquid" && elements[newPixel.element].movable != false) {
                swapPixels(pixel,newPixel)
            }
            else {pixel.by = -pixel.by;}
        }
        else if (outOfBounds(pixel.x, newY)) {
            pixel.by = -pixel.by;
        }
    }
    },
    reactions: {
        "glass": { "color1":["#ff0000","#ff8800","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"] },
        "glass_shard": { "color1":["#ff0000","#ff8800","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"] },
        "rad_glass": { "color1":["#9f6060","#9f8260","#9f9f60","#609f60","#609f9f","#60609f","#9f609f"] },
        "rad_shard": { "color1":["#9f6060","#9f8260","#9f9f60","#609f60","#609f9f","#60609f","#9f609f"] },
        "steam": { "color1":["#ff0000","#ff8800","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"] },
        "rain_cloud": { "color1":["#ff0000","#ff8800","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"] },
        "cloud": { "color1":["#ff0000","#ff8800","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"] },
        "smog": { "color1":["#9f6060","#9f8260","#9f9f60","#609f60","#609f9f","#60609f","#9f609f"] },
        "ice": { "color1":"#c2fff9" },
        "rime": { "color1":"#c2fff9" },
        "water": { "color1":"#a1bac9" },
        "salt_water": { "color1":"#a1bac9" },
        "sugar_water": { "color1":"#a1bac9" },
        "dirty_water": { "color1":"#a1c9a8" },
        "seltzer": { "color1":"#c2fff9" },
        "diamond": { "color1":["#c2c5ff","#c2d9ff"] },
        "rainbow": { "color1":["#ff0000","#ff8800","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"] },
        "static": { "color1":["#ffffff","#bdbdbd","#808080","#424242","#1c1c1c"] }
    },
    properties: {
        visible: 10000,
    },
    temp: 35,
    tempLow: -273,
    stateLow: ["liquid_light",null],
    stateLowColorMultiplier: 0.8,
    category: "energy",
    state: "gas",
    density: 0.00001,
    ignoreAir: true,
    insulate: true,
}

elements.photon = {
    color: "#ffffff",
    grain: 0,
    tick: function(pixel) {
    if (Math.random() < 0.01) {
        deletePixel(pixel.x,pixel.y);
        return;
    }
    if (pixel.visible < 1000) {
        pixel.visible = 10000
    }
    if (pixel.bx===undefined) {
        // choose 1, 0, or -1
        pixel.bx = Math.random() < 0.5 ? 1 : Math.random() < 0.5 ? 0 : -1;
        pixel.by = Math.random() < 0.5 ? 1 : Math.random() < 0.5 ? 0 : -1;
        // if both are 0, make one of them 1 or -1
        if (pixel.bx===0 && pixel.by===0) {
            if (Math.random() < 0.5) { pixel.bx = Math.random() < 0.5 ? 1 : -1; }
            else { pixel.by = Math.random() < 0.5 ? 1 : -1; }
        }
    }
    // move and invert direction if hit
    if (pixel.bx && !tryMove(pixel, pixel.x+pixel.bx, pixel.y)) {
        var newX = pixel.x + pixel.bx;
        if (!isEmpty(newX, pixel.y, true)) {
            var newPixel = pixelMap[pixel.x+pixel.bx][pixel.y];
            if (!newPixel.visible && elements[newPixel.element].id != elements.photon.id) { newPixel.visible = 25 }
            else if (elements[newPixel.element].id != elements.photon.id) { newPixel.visible += 25 }
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coords = adjacentCoords[i];
                var x = newPixel.x + coords[0];
                var y = newPixel.y + coords[1];
                if (!isEmpty(x,y,true)) {
                    var adjacentPixel = pixelMap[x][y];
                    if (elements[adjacentPixel.element].id === elements.glass.id || elements[adjacentPixel.element].id === elements.rad_glass.id || elements[newPixel.element].state == "liquid" || elements[newPixel.element].state == "gas") {
                        if (!adjacentPixel.visible) { adjacentPixel.visible = 25 }
                        else { adjacentPixel.visible += 25 }
                    }
                    else {
                        if (!adjacentPixel.visible) { adjacentPixel.visible = 10 }
                        else { adjacentPixel.visible += 10 }
                        for (var i = 0; i < adjacentCoords.length; i++) {
                            var coords = adjacentCoords[i];
                            var x = adjacentPixel.x + coords[0];
                            var y = adjacentPixel.y + coords[1];
                            if (!isEmpty(x,y,true)) {
                                var adjacentPixel2 = pixelMap[x][y];
                                if (elements[adjacentPixel.element].id === elements.glass.id || elements[adjacentPixel.element].id === elements.rad_glass.id || elements[newPixel.element].state == "liquid" || elements[newPixel.element].state == "gas") {
                                    if (!adjacentPixel2.visible) { adjacentPixel2.visible = 25 }
                                    else { adjacentPixel2.visible += 25 }
                                }
                                else {
                                    if (!adjacentPixel2.visible) { adjacentPixel2.visible = 5 }
                                    else { adjacentPixel2.visible += 5 }
                                }
                            }
                        }
                    }
                }
            }
            if (elements[newPixel.element].state == "liquid" && elements[newPixel.element].movable != false) {
                swapPixels(pixel,newPixel)
            }
            else {pixel.bx = -pixel.bx;}
        }
        else if (outOfBounds(newX, pixel.y)) {
            pixel.bx = -pixel.bx;
        }
    }
    if (pixel.by && !tryMove(pixel, pixel.x, pixel.y+pixel.by)) {
        var newY = pixel.y + pixel.by;
        if (!isEmpty(pixel.x, newY, true)) {
            var newPixel = pixelMap[pixel.x][pixel.y+pixel.by];
            if (!newPixel.visible && elements[newPixel.element].id != elements.photon.id) { newPixel.visible = 25 }
            else if (elements[newPixel.element].id != elements.photon.id) { newPixel.visible += 25 }
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coords = adjacentCoords[i];
                var x = newPixel.x + coords[0];
                var y = newPixel.y + coords[1];
                if (!isEmpty(x,y,true)) {
                    var adjacentPixel = pixelMap[x][y];
                    if (elements[adjacentPixel.element].id === elements.glass.id || elements[adjacentPixel.element].id === elements.rad_glass.id || elements[newPixel.element].state == "liquid" || elements[newPixel.element].state == "gas") {
                        if (!adjacentPixel.visible) { adjacentPixel.visible = 25 }
                        else { adjacentPixel.visible += 25 }
                    }
                    else {
                        if (!adjacentPixel.visible) { adjacentPixel.visible = 10 }
                        else { adjacentPixel.visible += 10 }
                        for (var i = 0; i < adjacentCoords.length; i++) {
                            var coords = adjacentCoords[i];
                            var x = adjacentPixel.x + coords[0];
                            var y = adjacentPixel.y + coords[1];
                            if (!isEmpty(x,y,true)) {
                                var adjacentPixel2 = pixelMap[x][y];
                                if (elements[adjacentPixel.element].id === elements.glass.id || elements[adjacentPixel.element].id === elements.rad_glass.id || elements[newPixel.element].state == "liquid" || elements[newPixel.element].state == "gas") {
                                    if (!adjacentPixel2.visible) { adjacentPixel2.visible = 25 }
                                    else { adjacentPixel2.visible += 25 }
                                }
                                else {
                                    if (!adjacentPixel2.visible) { adjacentPixel2.visible = 5 }
                                    else { adjacentPixel2.visible += 5 }
                                }
                            }
                        }
                    }
                }
            }
            if (elements[newPixel.element].state == "liquid" && elements[newPixel.element].movable != false) {
                swapPixels(pixel,newPixel)
            }
            else {pixel.by = -pixel.by;}
        }
        else if (outOfBounds(pixel.x, newY)) {
            pixel.by = -pixel.by;
        }
    }
    },
    temp: 20,
    stateLowColorMultiplier: 0.8,
    category: "energy",
    state: "gas",
    density: 0,
    ignoreAir: true,
    insulate: true,
    movable: false
}

elements.liquid_light = {
    color: "#bdbc9d",
    //behavior: behaviors.SUPERFLUID,
    tick: function(pixel) {
        if (Math.random() < 0.0001) {
            deletePixel(pixel.x,pixel.y);
            return;
        }
        if (pixel.charge && elements[pixel.element].behaviorOn) {
            pixelTick(pixel)
        }
        if (Math.random() < 0.33) { tryMove(pixel, pixel.x, pixel.y+1) }
        if (!isEmpty(pixel.x, pixel.y+1)) {
            // go either left or right depending on pixel.flipX
            var newx = pixel.flipX ? pixel.x-1 : pixel.x+1;
            if (Math.random() < 0.5) {
                if (!tryMove(pixel, newx, pixel.y)) {
                    if (!outOfBounds(newx, pixel.y) && !elements.liquid_light.reactions[pixelMap[newx][pixel.y].element]) {
                        pixel.color = pixelMap[newx][pixel.y].color;
                        if (!pixelMap[newx][pixel.y].visible) { pixelMap[newx][pixel.y].visible = 25 }
                            else { pixelMap[newx][pixel.y].visible += 25 }
                    }
                    pixel.flipX = !pixel.flipX;
                    if (!tryMove(pixel, newx, pixel.y+1) && !outOfBounds(newx, pixel.y+1) && !elements.liquid_light.reactions[pixelMap[newx][pixel.y+1].element]) {
                        pixel.color = pixelMap[newx][pixel.y+1].color;
                        if (!pixelMap[newx][pixel.y+1].visible) { pixelMap[newx][pixel.y+1].visible = 25 }
                            else { pixelMap[newx][pixel.y+1].visible += 25 }
                    }
                }
            }
            else {
                if (!tryMove(pixel, newx, pixel.y+1)) {
                    if (!outOfBounds(newx, pixel.y+1) && !elements.liquid_light.reactions[pixelMap[newx][pixel.y+1].element]) {
                        pixel.color = pixelMap[newx][pixel.y+1].color;
                        if (!pixelMap[newx][pixel.y+1].visible) { pixelMap[newx][pixel.y+1].visible = 25 }
                        else { pixelMap[newx][pixel.y+1].visible += 25 }
                    }
                    if (!tryMove(pixel, newx, pixel.y)) {
                        pixel.flipX = !pixel.flipX;
                        if (!outOfBounds(newx, pixel.y) && !elements.liquid_light.reactions[pixelMap[newx][pixel.y].element]) {
                            pixel.color = pixelMap[newx][pixel.y].color;
                            if (!pixelMap[newx][pixel.y].visible) { pixelMap[newx][pixel.y].visible = 25 }
                            else { pixelMap[newx][pixel.y].visible += 25 }
                        }
                    }
                }
            }
        }
        doDefaults(pixel);
    },
    reactions: {
        "glass": { "color1":["#ff0000","#ff8800","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"] },
        "glass_shard": { "color1":["#ff0000","#ff8800","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"] },
        "rad_glass": { "color1":["#9f6060","#9f8260","#9f9f60","#609f60","#609f9f","#60609f","#9f609f"] },
        "rad_shard": { "color1":["#9f6060","#9f8260","#9f9f60","#609f60","#609f9f","#60609f","#9f609f"] },
        "steam": { "color1":["#ff0000","#ff8800","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"] },
        "rain_cloud": { "color1":["#ff0000","#ff8800","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"] },
        "cloud": { "color1":["#ff0000","#ff8800","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"] },
        "smog": { "color1":["#9f6060","#9f8260","#9f9f60","#609f60","#609f9f","#60609f","#9f609f"] },
        "laser": { "color1":"#ff0000" },
    },
    temp: -273,
    tempHigh: -272,
    stateHigh: "light",
    category: "energy",
    state: "gas",
    density: 0.00002,
    ignoreAir: true,
    viscosity: 0,
    insulate: true,
    hidden: true
}

elements.bless = {
    color: ["#ffffff","#fffa9c","#00ffff"],
    tool: function(pixel) {
        if (elements.bless.ignore.indexOf(pixel.element) !== -1) { return; }
        if (pixel.burning && !elements[pixel.element].burning) { // stop burning
            delete pixel.burning;
            delete pixel.burnStart;
        }
        if (!elements[pixel.element].insulate) {
            if (pixel.temp > 100) {
                pixel.temp = (pixel.temp+100)/2;
                pixelTempCheck(pixel);
                if (pixel.del) {return}
            }
            if (pixel.temp < -200) {
                pixel.temp = (pixel.temp-200)/2;
                pixelTempCheck(pixel);
                if (pixel.del) {return}
            }
        }
        if (pixel.origColor) {
            pixel.color = "rgb("+pixel.origColor.join(",")+")";
            delete pixel.origColor;
        }
        if (pixel.charge) {
            delete pixel.charge;
            pixel.chargeCD = 16;
        }
        if (!pixel.visible) { 
            pixel.visible = 10
        }
        else { 
            pixel.visible += 10
        }
        if (elements.bless.reactions[pixel.element] && Math.random()<0.25) {
            var r = elements.bless.reactions[pixel.element];
            var elem2 = r.elem2;
            if (elem2 !== undefined) {
                if (Array.isArray(elem2)) { elem2 = elem2[Math.floor(Math.random()*elem2.length)]; }
                if (elem2 === null) { deletePixel(pixel.x,pixel.y) }
                else { changePixel(pixel, elem2); }
            }
            if (r.func) { r.func(pixel,pixel) }
            if (r.color2) { pixel.color = pixelColorPick(pixel,r.color2) }
        }
    },
    ignore: ["sun"],
    behavior: [
        "M2|M1|M2",
        "M1|DL%25|M1",
        "M2|M1|M2",
    ],
    reactions: {
        "cancer": { elem2:null },
        "rust": { elem2: "iron" },
        "oxidized_copper": { elem2: "copper" },
        "blood": { elem2:["antibody",null] },
        "blood_ice": { elem2:"antibody_ice" },
        "dirty_water": { elem2: "water" },
        "plague": { elem2: null },
        "virus": { func: function(pixel1,pixel2){pixel2.heal=true} },
        "filler": { elem2: "wall" },
        "armageddon": { elem2: null },
        "lattice": { elem2: "wall" },
        "vertical": { elem2: "wall" },
        "horizontal": { elem2: "wall" },
        "gray_goo": { elem2: "malware" },
        "infection": { elem2: ["antibody",null] },
        "antibody": { elem2: ["antibody",null] },
        "infection_ice": { elem2: "antibody_ice" },
        "poison": { elem2: "antidote" },
        "poison_gas": { elem2: null },
        "poison_ice": { elem2: null },
        "rotten_meat": { elem2: "meat" },
        "rotten_cheese": { elem2: "cheese", color2:["#B8BA9E","#CDCAB2","#C5CEC0","#7B9691","#41564B"] },
        "carbon_dioxide": { elem2: "oxygen" },
        "pilk": { elem2: "milk" },
        "acid": { elem2: "hydrogen" },
        "acid_gas": { elem2: "hydrogen" },
        "acid_cloud": { elem2: "rain_cloud" },
        "fire_cloud": { elem2: "cloud" },
        "ash": { elem2: null },
        "molten_ash": { elem2: null },
        "pyrocumulus": { elem2: null },
        "cyanide": { elem2: null },
        "cyanide_gas": { elem2: null },
        "ammonia": { elem2: null },
        "liquid_ammonia": { elem2: null },
        "dioxin": { elem2: null },
        "stench": { elem2: null },
        "liquid_stench": { elem2: null },
        "fragrance": { elem2: null },
        "chlorine": { elem2: null },
        "anesthesia": { elem2: null },
        "oil": { elem2: null },
        "bleach": { elem2: null },
        "soda": { elem2: "seltzer" },
        "ink": { elem2: null },
        "dye": { elem2: null },
        "color_smoke": { elem2: null },
        "spray_paint": { elem2: null },
        "cancer": { elem2: null },
        "rat": { elem2: null },
        "flea": { elem2: null },
        "termite": { elem2: null },
        "smog": { elem2: "cloud" },
        "mercury": { elem2: null },
        "slime": { elem2: null },
        "broth": { elem2: "water" },
        "fire": { elem2: "bless" },
        "plasma": { elem2: "bless" },
        "grenade": { elem2: "metal_scrap" },
        "flashbang": { elem2: "metal_scrap" },
        "smoke_grenade": { elem2: "metal_scrap" },
        "greek_fire": { elem2: "smoke" },
        "nitro": { elem2: null },
        "smoke": { elem2: null },
        "lightning": { elem2: null },
        "electric": { elem2: null },
        "positron": { elem2: null },
        "antimatter": { elem2: null },
        "neutron": { elem2: null },
        "proton": { elem2: null },
        "radiation": { elem2: "flash" },
        "uranium": { elem2: "rock" },
        "molten_uranium": { elem2: "magma" },
        "magma": { elem2: "rock" },
        "mercury": { elem2: null },
        "mercury_gas": { elem2: null },
        "solid_mercury": { elem2: null },
        "ice_nine": { elem2: "ice" },
        "strange_matter": { elem2: "neutron" },
        "frozen_frog": { elem2: "frog" },
        "frozen_worm": { elem2: "worm" },
        "molten_thermite": { elem2: "rock" },
        "rad_glass": { elem2: "glass" },
        "rad_shard": { elem2: "glass_shard" },
        "rad_steam": { elem2: "steam" },
        "fallout": { elem2: null },
        "rad_cloud": { elem2: "rain_cloud" },
        "fireball": { elem2: "ball" },
        "bone_marrow": { elem2: "bone" },
        "fly": { elem2: null },
        "dead_bug": { elem2: null },
        "dead_plant": { elem2: "plant" },
        "wood": { func:function(pixel1,pixel2) {if(pixel2.wc){changePixel(pixel2,"tree_branch")}} },
        "slag": { elem2: "rock" },
        "molten_slag": { elem2: "magma" },
        "laser": { elem2: "light" },
        "light": { elem2: "flash" },
        "torch": { elem2: "wood" },
        "explosion": { elem2: null },
        "n_explosion": { elem2: null },
        "supernova": { elem2: null },
        "pop": { elem2: null },
        "ember": { elem2: null },
        "fw_ember": { elem2: null },
        "pollen": { elem2: null },
        "lead": { elem2: "gold" },
        "molten_lead": { elem2: "molten_gold" },
        "dirt": { elem1: "grass", oneway:true },
        "static": { elem2: "rainbow" },
        "tornado": { elem2: null },
        "tsunami": { elem2: null },
        "earthquake": { elem2: null },
        "blaster": { elem2: null },
        "dust": { elem2: null },
        "grease": { elem2: null },
        "meat": { elem2: "cured_meat" },
        "clay_shard": { elem2:"baked_clay" },
        "porcelain_shard": { elem2:"porcelain" },
        "glass_shard": { elem2:"glass" },
        "gunpowder": { elem2:"charcoal" },
        "ruins": { elem2:"rock_wall" },
        "warp": { elem2:null },
        "midas_touch": { elem2:null },
        "web": { elem2:null },
        "heat_ray": { elem2:null },
    },
    temp:20,
    state: "gas",
    density: 0.001,
    canPlace: true,
    category: "energy",
    stain: -0.5
}

viewInfo[1] = { // Real Light View
    name: "",
    effects: true,
    pixel: function(pixel,ctx) {
        if (day != true) {
        if (pixel.visible && elements[pixel.element].id != elements.photon.id) {
            var a = (settings.textures !== 0) ? pixel.alphaLight : undefined;
            if (elements[pixel.element].isGas) {
                drawPlus(ctx,pixel.color,pixel.x,pixel.y,undefined,a)
                if (pixel.visible > 0 && (elements[pixel.element].emit || pixel.emit) || (elements[pixel.element].glow || pixel.glow) || pixel.bright === true || pixel.charge || pixel.burning || pixel.temp > 1025) {
                    pixel.visible += 1
                }
                else if (pixel.visible > 1) {
                    pixel.visible -= 1
                }
                if (pixel.visible > 250) {
                    pixel.visible = 250
                }
                if (pixel.visible > 100 || pixel.bright || (elements[pixel.element].emit || pixel.emit) || (elements[pixel.element].glow || pixel.glow) || pixel.bright === true || pixel.charge || pixel.burning || pixel.temp > 1025) { 
                    pixel.alphaLight = 1
                }
                else if (pixel.visible <= 100) { 
                    pixel.alphaLight = (pixel.visible / 100)
                    if (pixel.alphaLight <= 0.05) {
                        for (var i = 0; i < squareCoordsShuffle.length; i++) {
                            var x = pixel.x+squareCoordsShuffle[i][0];
                            var y = pixel.y+squareCoordsShuffle[i][1];
                            if (isEmpty(x,y)) {
                                pixel.alphaLight = 0.1
                            } 
                            else if (pixel.alphaLight <= 0.025 && !isEmpty(x,y, true)) {
                                for (var i2 = 0; i2 < bigCircleCoordsShuffle.length; i2++) {
                                    var x2 = pixel.x+bigCircleCoordsShuffle[i2][0];
                                    var y2 = pixel.y+bigCircleCoordsShuffle[i2][1];
                                    if (isEmpty(x2,y2)) {
                                        pixel.alphaLight = 0.05
                                    } 
                                    else if (pixel.alphaLight <= 0.015) {
                                        pixel.alphaLight = 0.025
                                    }
                                } 
                            }
                        } 
                    }
                }
                // if (isEmpty(pixel.x+1,pixel.y) || isEmpty(pixel.x-1,pixel.y) || isEmpty(pixel.x,pixel.y+1) || isEmpty(pixel.x,pixel.y-1)) {}
            }
            else {
                drawSquare(ctx,pixel.color,pixel.x,pixel.y,undefined,a)
                if (pixel.visible > 0 && (elements[pixel.element].emit || pixel.emit) || (elements[pixel.element].glow || pixel.glow) || pixel.bright === true || pixel.charge || pixel.burning || pixel.temp > 1025) {
                    pixel.visible += 1
                }
                else if (pixel.visible > 1) {
                    pixel.visible -= 1
                }
                if (pixel.visible > 250) {
                    pixel.visible = 250
                }
                if (pixel.visible > 100 || pixel.bright || (elements[pixel.element].emit || pixel.emit) || (elements[pixel.element].glow || pixel.glow) || pixel.bright === true) { 
                    pixel.alphaLight = 1
                }
                else if (pixel.visible < 0.5 && (pixel.charge || pixel.burning || pixel.temp > 1025)) { 
                    pixel.alphaLight = 0.5
                }
                else if (pixel.visible <= 100) { 
                    pixel.alphaLight = (pixel.visible / 100)
                    if (pixel.alphaLight <= 0.05) {
                        for (var i = 0; i < squareCoordsShuffle.length; i++) {
                            var x = pixel.x+squareCoordsShuffle[i][0];
                            var y = pixel.y+squareCoordsShuffle[i][1];
                            if (isEmpty(x,y)) {
                                pixel.alphaLight = 0.1
                            } 
                            else if (pixel.alphaLight <= 0.025 && !isEmpty(x,y, true)) {
                                for (var i2 = 0; i2 < bigCircleCoordsShuffle.length; i2++) {
                                    var x2 = pixel.x+bigCircleCoordsShuffle[i2][0];
                                    var y2 = pixel.y+bigCircleCoordsShuffle[i2][1];
                                    if (isEmpty(x2,y2)) {
                                        pixel.alphaLight = 0.05
                                    } 
                                    else if (pixel.alphaLight <= 0.015) {
                                        pixel.alphaLight = 0.025
                                    }
                                } 
                            }
                        } 
                    }
                }
            }
            if (pixel.charge && view !== 2) { // Yellow glow on charge
                if (!elements[pixel.element].colorOn) {
                    drawSquare(ctx,"rgba(255,255,0,0.5)",pixel.x,pixel.y);
                }
            }
        }
        else if (!pixel.visible) {
            pixel.visible = 1
        }
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

elements.light_bulb.behaviorOn = [
    "XX|CR:light,photon|XX",
    "CR:light,photon|XX|CR:light,photon",
    "XX|CR:light,photon|XX",
]

elements.sun.tick = function(pixel) {
    // minimum 1726
    // maximum 7726
    if (pixel.eclipse) { pixel.color = pixelColorPick(pixel,"#FD8C03"); var c=0.01}
    else if (pixel.temp < 1500) { pixel.color = pixelColorPick(pixel,"#7a4e43"); }
    else if (pixel.temp < 3600) { pixel.color = pixelColorPick(pixel,"#ffbdbd"); var c=0.015 }
    else if (pixel.temp < 5000) { pixel.color = pixelColorPick(pixel,"#ffd5bd"); var c=0.025 }
    else if (pixel.temp < 7000) { pixel.color = pixelColorPick(pixel,"#ffffbd"); var c=0.05 }
    else if (pixel.temp < 11000) { pixel.color = pixelColorPick(pixel,"#f7fff5"); var c=0.1 }
    else if (pixel.temp < 28000) { pixel.color = pixelColorPick(pixel,"#bde0ff"); var c=0.2 }
    else { pixel.color = pixelColorPick(pixel,"#c3bdff"); var c=0.4 }
    if (pixel.temp < 1500) { var c=0 }
    for (var i = 0; i < adjacentCoords.length; i++) {
        var x = pixel.x+adjacentCoords[i][0];
        var y = pixel.y+adjacentCoords[i][1];
        if (isEmpty(x,y)) {
            if (Math.random() > c) {continue}
            if (Math.random() > 0.75) {
                createPixel("light", x, y);
                pixelMap[x][y].color = pixel.color;
            }
            else {
                createPixel("photon", x, y);
            }
        }
        else if (!outOfBounds(x,y)) {
            var newPixel = pixelMap[x][y];
            if (elements[newPixel.element].id === elements.sun.id) {
                if (pixel.eclipse) { newPixel.eclipse = true }
                if (pixel.temp!==newPixel.temp) {
                    var avg = (pixel.temp + newPixel.temp)/2;
                    pixel.temp = avg;
                    newPixel.temp = avg;
                    pixelTempCheck(pixel);
                    pixelTempCheck(newPixel);
                }
            }
        }
    }
}

elements.sun.tool = function(pixel) {
    if (pixel.element === "light" || pixel.element === "photon") {
        deletePixel(pixel.x,pixel.y);
    }
}

elements.fire.properties = { bright: true }
elements.plasma.properties = { bright: true }
elements.sun.properties = { bright: true }
elements.cold_fire.properties = { bright: true }
elements.laser.properties = { bright: true }
elements.pointer.properties = { bright: true }
elements.flash.properties = { bright: true }
elements.bless.properties = { bright: true }
elements.lightning.properties = { bright: true }
elements.neutron.properties = { bright: true }
elements.proton.properties = { bright: true }
elements.electric.properties = { bright: true }
elements.radiation.properties = { bright: true }
elements.god_ray.properties = { bright: true }
elements.heat_ray.properties = { bright: true }
elements.freeze_ray.properties = { bright: true }
elements.pop.properties = { bright: true }
elements.explosion.properties = { bright: true }
elements.n_explosion.properties = { bright: true }
elements.supernova.properties = { bright: true }
elements.positron.properties = { bright: true }
elements.fw_ember.properties = { bright: true }
elements.ember.properties = { bright: true }
elements.firebal.properties = { bright: true }
elements.blaster.properties = { bright: true }
elements.armageddon.properties = { bright: true }
elements.rad_cloud.properties = { bright: true }
elements.rad_steam.properties = { bright: true }
elements.midas_touch.properties = { bright: true }
elements.malware.properties = { bright: true }
elements.strange_matter.properties = { bright: true }