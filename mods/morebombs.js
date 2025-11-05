function explodeAtPlus(x,y,radius,fire="fire",decimate=false,harmless=false,) {
            // if fire contains , split it into an array
            if (fire.indexOf(",") !== -1) {
                fire = fire.split(",");
            }
            var coords = circleCoords(x,y,radius);
            var power = radius/10;
            //for (var p = 0; p < Math.round(radius/10+1); p++) {
            for (var i = 0; i < coords.length; i++) {
                // damage value is based on distance from x and y
                var damage = Math.random() + (Math.floor(Math.sqrt(Math.pow(coords[i].x-x,2) + Math.pow(coords[i].y-y,2)))) / radius;
                // invert
                damage = 1 - damage;
                if (damage < 0) { damage = 0; }
                damage *= power;
                if (decimate) {
                    damage = 1
                }
                if (harmless) {
                    damage = 0.21
                }
                if (isEmpty(coords[i].x,coords[i].y)) {
                    // create smoke or fire depending on the damage if empty
                    if (damage < 0.02) { } // do nothing
                    else if (damage < 0.2) {
                        createPixel("smoke",coords[i].x,coords[i].y);
                    }
                    else {
                        // if fire is an array, choose a random item
                        if (Array.isArray(fire)) {
                            createPixel(fire[Math.floor(Math.random() * fire.length)],coords[i].x,coords[i].y);
                        }
                        else {
                            createPixel(fire,coords[i].x,coords[i].y);
                        }
                    }
                }
                else if (!outOfBounds(coords[i].x,coords[i].y)) {
                    // damage the pixel
                    var pixel = pixelMap[coords[i].x][coords[i].y];
                    var info = elements[pixel.element];
                    if (info.hardness) { // lower damage depending on hardness(0-1)
                        if (info.hardness < 1) {
                            // more hardness = less damage, logarithmic
                            damage *= Math.pow((1-info.hardness),info.hardness);
                        }
                        else { damage = 0; }
                    }
                    if (damage > 0.9) {
                        if (Array.isArray(fire)) {
                            var newfire = fire[Math.floor(Math.random() * fire.length)];
                        }
                        else {
                            var newfire = fire;
                        }
                        changePixel(pixel,newfire);
                        continue;
                    }
                    else if (damage > 0.25) {
                        if (info.breakInto !== undefined) {
                            breakPixel(pixel);
                            continue;
                        }
                        else {
                            if (Array.isArray(fire)) {
                                var newfire = fire[Math.floor(Math.random() * fire.length)];
                            }
                            else {
                                var newfire = fire;
                            }
                            if (elements[pixel.element].onBreak !== undefined) {
                                elements[pixel.element].onBreak(pixel);
                            }
                            changePixel(pixel,newfire);
                            continue;
                        }
                    }
                    if (damage > 0.75 && info.burn) {
                        pixel.burning = true;
                        pixel.burnStart = pixelTicks;
                    }
                    pixel.temp += damage*radius*power;
                    pixelTempCheck(pixel);
                    if (enabledMods.includes("mods/velocity.js")) {
                        if (!elements[pixel.element].excludeRandom) {
                            var angle = Math.atan2(pixel.y-y,pixel.x-x);
                            pixel.vx = Math.round((pixel.vx|0) + Math.cos(angle) * (radius * power/10));
                            pixel.vy = Math.round((pixel.vy|0) + Math.sin(angle) * (radius * power/10));
                        }
                    }
                }
            }
        }

elements.gunpowder.breakInto = "explosion"





elements.napalm_bomb = { 
    color: ["#f4bf66","#e7c47a","#b79157"],
    behavior: [
        "XX|EX:20>nitro|XX",
        "XX|LB:fire%55|XX",
        "XX|M1 AND EX:20>nitro|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    tempHigh: 10455.5,
    stateHigh: "molten_steel",
    ignore: ["antimatter"],
    excludeRandom: true,
    cooldown: defaultCooldown
}
elements.poison_bomb = { 
    color: ["#255d23","#429941","#84b063"],
    behavior: [
        "XX|EX:20>acid_cloud|XX",
        "XX|LB:poison_gas%5|XX",
        "XX|M1 AND EX:20>acid_cloud|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    tempHigh: 10455.5,
    stateHigh: ["molten_steel","poison_gas"],
    ignore: ["antimatter"],
    excludeRandom: true,
    cooldown: defaultCooldown
}
/*elements.tnt = {
    color: "#c92a2a",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "XX|EX:10|XX",
        "XX|XX|XX",
    ],
    conduct: 1,
    category: "weapons",
    burn: 100,
    burnTime: 1,
    burnInto: "explosion",
    tempHigh: 600,
    stateHigh: "explosion",
    state: "solid",
    density: 1630,
    excludeRandom: true,
    alias: "trinitrotoluene"
} */
/* "firework": {
    color: "#c44f45",
    tick: function(pixel) {
        if ((pixel.temp > 1000 || pixel.charge) && !pixel.burning) {
            pixel.burning = true;
            pixel.burnStart = pixelTicks;
        }
        if (pixel.burning) {
            if (!tryMove(pixel, pixel.x, pixel.y-1)) {
                // tryMove again to the top left or top right
                tryMove(pixel, pixel.x+(Math.random() < 0.5 ? -1 : 1), pixel.y-1);
            }
            if (pixelTicks-pixel.burnStart > 50 && Math.random() < 0.1) {
                explodeAt(pixel.x, pixel.y, 10, "fw_ember");
            }
        }
        else {
            if (!tryMove(pixel, pixel.x, pixel.y+1)) {
                // tryMove again to the bottom left or bottom right
                tryMove(pixel, pixel.x+(Math.random() < 0.5 ? -1 : 1), pixel.y+1);
            }
        }
        doDefaults(pixel);
    },
    burn: 90,
    burnTime: 100,
    properties: { burning:false },
    burning: true,
    density: 2000,
    conduct: 1,
    state: "solid",
    category: "weapons"
} */

elements.tnt_x_5 = {
    color: "#c92a2a",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "XX|EX:30|XX",
        "XX|XX|XX",
    ],
    conduct: 1,
    category: "weapons",
    burn: 100,
    burnTime: 1,
    burnInto: "explosion",
    tempHigh: 600,
    stateHigh: "explosion",
    state: "solid",
    density: 1630,
    excludeRandom: true,
    alias: "trinitrotoluene"
}
elements.tnt_x_20 = {
    color: "#c92a2a",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "XX|EX:60|XX",
        "XX|XX|XX",
    ],
    conduct: 1,
    category: "weapons",
    burn: 100,
    burnTime: 1,
    burnInto: "explosion",
    tempHigh: 600,
    stateHigh: "explosion",
    state: "solid",
    density: 1630,
    excludeRandom: true,
    alias: "trinitrotoluene"
}
elements.freeze_bomb = { 
    color: ["#66e6f4","#7ab4e7","#0682d0"],
    behavior: [
        "XX|EX:20>rime|XX",
        "XX|LB:cold_fire%55|XX",
        "XX|M1 AND EX:20>rime|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    tempHigh: 10455.5,
    stateHigh: "molten_steel",
    ignore: ["antimatter"],
    excludeRandom: true,
    cooldown: defaultCooldown
}
elements.shock_bomb = { 
    color: ["#ffff00","#fcff4e","#fff8a9"],
    behavior: [
        "XX|EX:20>lightning|XX",
        "XX|LB:electric%55 AND LB:lighting%02|XX",
        "XX|M1 AND EX:20>electric|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    tempHigh: 10455.5,
    stateHigh: "molten_steel",
    ignore: ["antimatter"],
    excludeRandom: true,
    cooldown: defaultCooldown
}
elements.chemical_bomb = {
    color: "#1b5019",
    tick: function(pixel) {
        if ((pixel.temp > 1000 || pixel.charge) && !pixel.burning) {
            pixel.burning = true;
            pixel.burnStart = pixelTicks;
        }
        if (pixel.burning) {
            if (!tryMove(pixel, pixel.x, pixel.y-1)) {
                // tryMove again to the top left or top right
                tryMove(pixel, pixel.x+(Math.random() < 0.5 ? -1 : 1), pixel.y-1);
            }
            if (pixelTicks-pixel.burnStart > 50 && Math.random() < 0.1) {
                explodeAt(pixel.x, pixel.y, 10, "poison_bomb");
            }
        }
        else {
            if (!tryMove(pixel, pixel.x, pixel.y+1)) {
                // tryMove again to the bottom left or bottom right
                tryMove(pixel, pixel.x+(Math.random() < 0.5 ? -1 : 1), pixel.y+1);
            }
        }
        doDefaults(pixel);
    },
    burn: 90,
    burnTime: 100,
    properties: { burning:false },
    burning: true,
    density: 2000,
    conduct: 1,
    state: "solid",
    category: "weapons"
}
elements.tnt_x_100 = {
    color: "#c92a2a",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "XX|EX:100|XX",
        "XX|XX|XX",
    ],
    conduct: 1,
    category: "weapons",
    burn: 100,
    burnTime: 1,
    burnInto: "explosion",
    tempHigh: 600,
    stateHigh: "explosion",
    state: "solid",
    density: 1630,
    excludeRandom: true,
    alias: "trinitrotoluene"
}
elements.poseidon_bomb = { 
    color: ["#182fa2","#4e3ab3","#10304c"],
    behavior: [
        "XX|EX:20>tsunami|XX",
        "XX|LB:water|XX",
        "XX|M1 AND EX:20>tsunami|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    tempHigh: 10455.5,
    stateHigh: "molten_steel",
    ignore: ["water"],
    excludeRandom: true,
    cooldown: defaultCooldown
}
elements.meteor_bomb = {
    color: "#f72c15",
    tick: function(pixel) {
        if ((pixel.temp > 1000 || pixel.charge) && !pixel.burning) {
            pixel.burning = true;
            pixel.burnStart = pixelTicks;
        }
        if (pixel.burning) {
            if (!tryMove(pixel, pixel.x, pixel.y-1)) {
                // tryMove again to the top left or top right
                tryMove(pixel, pixel.x+(Math.random() < 0.5 ? -1 : 1), pixel.y-1);
            }
            if (pixelTicks-pixel.burnStart > 50 && Math.random() < 0.1) {
                explodeAt(pixel.x, pixel.y, 10, "fireball");
            }
        }
        else {
            if (!tryMove(pixel, pixel.x, pixel.y+1)) {
                // tryMove again to the bottom left or bottom right
                tryMove(pixel, pixel.x+(Math.random() < 0.5 ? -1 : 1), pixel.y+1);
            }
        }
        doDefaults(pixel);
    },
    burn: 90,
    burnTime: 100,
    properties: { burning:false },
    burning: true,
    density: 2000,
    conduct: 1,
    state: "solid",
    category: "weapons"
}
elements.pompeii_bomb = { 
    color: ["#ff4800","#a4641f","#4c2710"],
    behavior: [
        "XX|XX|XX",
        "XX|LB:lava_rocket|XX",
        "XX|M1 AND EX:20>lava_rocket|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    tempurature: 1000,
    ignore: ["magma"],
    excludeRandom: true,
    cooldown: defaultCooldown
}
elements.lava_rocket = {
    color: "#ff6f47",
    behavior: [
        "M1|XX|M1",
        "M2|L1:magma AND DL%10|M2",
        "XX|XX|XX"
    ],
    category: "weapons",
    state: "solid",
    density: 7300,
    cooldown: defaultCooldown
}
elements.tnt_x_500 = {
    color: "#c92a2a",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "XX|EX:140|XX",
        "XX|XX|XX",
    ],
    conduct: 1,
    category: "weapons",
    burn: 100,
    burnTime: 1,
    burnInto: "explosion",
    tempHigh: 600,
    stateHigh: "explosion",
    state: "solid",
    density: 1630,
    excludeRandom: true,
    alias: "trinitrotoluene"
}
elements.blood_bomb = { 
    color: ["#a2182f","#d36273","#5f0928"],
    behavior: [
        "XX|EX:20>blood|XX",
        "XX|LB:blood|XX",
        "XX|M1 AND EX:20>blood|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    tempHigh: 10455.5,
    stateHigh: "molten_steel",
    ignore: ["blood"],
    excludeRandom: true,
    cooldown: defaultCooldown
}
elements.pipe_bomb = {
    color: ["#494856","#343f5b","#585858"],
    behavior: behaviors.POWDER,
    behaviorOn: [
        "XX|XX|XX",
        "XX|EX:15|XX",
        "XX|XX|XX",
    ],
    reactions: {
        "body": {elem1:"explosion", chance:0.5}
    },
    conduct: 1,
    category: "weapons",
    tempHigh: 600,
    stateHigh: "explosion",
    state: "solid",
    density: 1300,
    breakInto: "explosion",
    excludeRandom: true
}
elements.vortex_bomb = {
    color: elements.void.color,
    behavior:[
        "XX|M2|XX",
        "XX|C2:vortex|XX",
        "XX|M1|XX",
    ],
    category: "weapons",
    onSelect: async function() {
        logMessage("This looks much cooler if you have glow.js installed!")
    },
}
elements.vortex = {
    color: "#000000",
    behavior: [
        "DL|DL|DL",
        "DL|XX|DL",
        "DL|DL|DL",
    ],
    reactions: {
        "vortex":{elem2:null}
    },
    hoverStat: function(pixel){
        return pixel.emit.toString().toUpperCase()
    },
    tick: function(pixel) {
        if (!pixel.emit) {
			pixel.emit = 1
		}
        /*dodeletey
        deletePixel(pixel.x + 1, pixel.y);
        deletePixel(pixel.x - 1, pixel.y);
        deletePixel(pixel.x, pixel.y + 1);
        deletePixel(pixel.x, pixel.y - 1);
        */
        var voidStart = Math.round(0 - (pixel.emit));
        var voidEnd = Math.round(pixel.emit);
        for (var x = voidStart; x < voidEnd; x++) {
            for (var y = voidStart; y < voidEnd; y++) {
        	var checkx = pixel.x + y;
        	var checky = pixel.y + x;
        	if (!isEmpty(checkx,checky,true)) {
                var sensed = pixelMap[checkx][checky];
                if(sensed.y > pixel.y) {
                    if(!tryMove(sensed, sensed.x, sensed.y - 2)){
                        tryMove(sensed, sensed.x, sensed.y - 1);
                    }
                    else {
                        tryMove(sensed, sensed.x, sensed.y - 2);
                    }
                }
                if(sensed.y < pixel.y) {
                    tryMove(sensed, sensed.x, sensed.y + 1);
                }
                if(sensed.x > pixel.x) {
                    tryMove(sensed, sensed.x - 1, sensed.y);
                }
                if(sensed.x < pixel.x) {
                    tryMove(sensed, sensed.x + 1, sensed.y);
                }
			}
            }
        }
        doDefaults(pixel);
        pixel.emit = (Math.round((pixel.emit + 0.1) * 10)) / 10;
        if(pixel.emit > 20){
            changePixel(pixel,"retreating_vortex");
        }
        if(pixel.emit < 1.6){
            tryMove(pixel, pixel.x, pixel.y-1);
        }
        //easing the stop
        if(pixel.emit == 1.8){
            tryMove(pixel, pixel.x, pixel.y-1);
        }
        if(pixel.emit == 2.1){
            tryMove(pixel, pixel.x, pixel.y-1);
        }
        if(pixel.emit % 3 === 0){

        }
    },
    emit: 1,
    emitColor: "#ffc800",
    category: "special",
}
elements.retreating_vortex = {
    color: "#000000",
    hoverStat: function(pixel){
        return pixel.emit.toString().toUpperCase()
    },
    tick: function(pixel) {
        if (pixel.start === pixelTicks) {
			pixel.emit = 20
		}
        pixel.emit = (Math.round((pixel.emit - 0.2) * 10)) / 10;
        if(pixel.emit < 0){
            changePixel(pixel,"flash");
        }
    },
    emit: 20,
    emitColor: "#ffc800",
    category: "special",
    hidden: true,
}
elements.corrosion_bomb = { 
    color: elements.rust.color,
    behavior: [
        "XX|XX|XX",
        "XX|LB:corrosion_cloud%5|XX",
        "XX|M1 AND EX:20>corrosion_cloud|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    tempHigh: 10455.5,
    stateHigh: ["slag","acid","oxygen"],
    ignore: ["corrosion_cloud"],
    excludeRandom: true,
    cooldown: defaultCooldown
}
elements.corrosion_cloud = {
    color: ["#77583e","#895328","#6c6661",],
    behavior: [
        "XX|XX|XX",
        "XX|DL%1|M1%2.5 AND BO",
        "XX|XX|XX",
    ],
    reactions: {
        "steel":{elem2:"hyper_rust"},
        "iron":{elem2:"hyper_rust"},
        "body":{elem2:"hyper_rust"},
        "head":{elem2:"hyper_rust"},
    },
    category:"gases",
    burn: 15,
    burnTime: 5,
    state: "gas",
    density: 0.7,
    ignoreAir: true
}
elements.hyper_rust = {
    color: ["#ae551c","#bc6e39","#925f49"],
    behavior: [
        "XX|XX|XX",
        "SP|CH:rust%5|SP",
        "XX|M1|XX",
    ],
    tick:function(pixel){
        for (var i = 0; i < adjacentCoords.length; i++) {
        	var coords = adjacentCoords[i];
        	var x = pixel.x + coords[0];
        	var y = pixel.y + coords[1];
        	if (!isEmpty(x,y,true)) {
                var sensed = pixelMap[x][y];
            	if (sensed.element == 'iron' || sensed.element == 'steel') {
				    changePixel(sensed,"hyper_rust");
            	}
			}
        }
    },
    tempHigh: 1538,
    stateHigh: "molten_iron",
    category: "special",
    state: "solid",
    density: 5250,
    conduct: 0.37,
    hardness: 0.3,
    alias: "iron oxide"
}
elements.polymorph_bomb = { 
    color: ["#89157d","#5342b8","#57a4b7","#89157d",],
    tick:function(pixel) {
        if (pixel.start === pixelTicks) {return}
        if (pixel.charge && elements[pixel.element].behaviorOn) {
            pixelTick(pixel);
            return;
        }
        if (!tryMove(pixel, pixel.x, pixel.y+1)) {
            explodeAtPlus(pixel.x, pixel.y, 10, "polymorph", false, true);
            deletePixel(pixel.x,pixel.y);
        }
        doDefaults(pixel);
    },
    category: "weapons",
    state: "solid",
    density: 1300,
    tempHigh: 10455.5,
    stateHigh: "molten_steel",
    ignore: ["antimatter"],
    excludeRandom: true,
    cooldown: defaultCooldown
}
elements.polymorph = {
    color: ["#89157d","#5342b8","#57a4b7","#89157d",],
    behavior: [
        "CL%5|CL%5|CL%5",
        "CL%5|DL%40|CL%5",
        "M1%15 AND CL%6|M1%50 AND CL%13|M1%15 AND CL%6",
    ],
    category: "energy",
    reactions: {
        "bone": {elem2:"poly_poof"},
        "blood": {elem2:"poly_poof"},
        "bone_marrow": {elem2:"poly_poof"},
    },
    state: "gas",
    density: 2.1,
    insulate: true,
    ignoreAir: true,
}
const POLYMORPHABLE = ["bone","blood","bone_marrow","meat","body","head"];
elements.poly_poof = {
    color: ["#89157d","#5342b8","#57a4b7","#89157d",],
    behavior: [
        "M2%5|M2%5|M2%5",
        "M2%5|CH:frog,fish,bird,worm,slug%1|M2%5",
        "M1%15|M1%50|M1%15",
    ],
    category: "energy",
    tick:function(pixel){
        for (var i = 0; i < adjacentCoords.length; i++) {
        	var coords = adjacentCoords[i];
        	var x = pixel.x + coords[0];
        	var y = pixel.y + coords[1];
        	if (!isEmpty(x,y,true)) {
                var sensed = pixelMap[x][y];
            	if (POLYMORPHABLE.includes(sensed.element)) {
				    changePixel(sensed,"poly_poof");
            	}
			}
        }
    },
    state: "gas",
    density: 2.1,
    insulate: true,
    ignoreAir: true,
}
elements.sublimation_charge = {
    color: elements.slag.color,
    tick:function(pixel) {
        if (pixel.start === pixelTicks) {return}
        if (pixel.charge && elements[pixel.element].behaviorOn) {
            pixelTick(pixel);
            return;
        }
        if (!tryMove(pixel, pixel.x, pixel.y+1)) {
            explodeAtPlus(pixel.x, pixel.y, 10, "sublimation_particle", true, false);
        }
        doDefaults(pixel);
    },
    category: "weapons",
    state: "solid",
    density: 1300,
    tempHigh: 10455.5,
    stateHigh: "molten_steel",
    ignore: ["dust_cloud"],
    excludeRandom: true,
    cooldown: defaultCooldown
}
elements.sublimation_particle = {
    color: "#000000",
    behavior: [
        "XX|CR:dust_cloud%95|XX",
        "XX|DL|XX",
        "XX|XX|XX",
    ],
    category: "energy",
    tick:function(pixel){
        for (var i = 0; i < adjacentCoords.length; i++) {
        	var coords = adjacentCoords[i];
        	var x = pixel.x + coords[0];
        	var y = pixel.y + coords[1];
        	if (!isEmpty(x,y,true)) {
                var sensed = pixelMap[x][y];
            	changePixel(sensed,"dust_cloud");
			}
        }
    },
    state: "gas",
    density: 2.1,
    insulate: true,
    ignoreAir: true,
}
elements.dust_cloud = {
    color: "#666666",
    behavior: [
        "XX|XX|XX",
        "XX|CH:dust%0.05 AND DL%1|M1%2.5 AND BO",
        "XX|XX|XX",
    ],
    reactions: {
        "ash": { elem1:"cloud", elem2:null, chance:0.05 },
        "limestone": { elem1:"cloud", elem2:null, chance:0.05 },
        "quicklime": { elem1:"cloud", elem2:null, chance:0.05 },
        "slaked_lime": { elem1:"cloud", elem2:null, chance:0.05 },
        "borax": { elem1:"cloud", elem2:null, chance:0.05 },
        "ammonia": { elem1:"cloud", elem2:null, chance:0.05 },
        "bleach": { elem1:"cloud", elem2:null, chance:0.05 }
    },
    category:"gases",
    burn: 15,
    burnTime: 5,
    state: "gas",
    density: 0.7,
    ignoreAir: true
}
elements.quantum_entanglement_charge = { 
    color: ["#4aff44","#8b958b","#77d330"],
    tick:function(pixel) {
        if (pixel.start === pixelTicks) {return}
        if (pixel.charge && elements[pixel.element].behaviorOn) {
            pixelTick(pixel);
            return;
        }
        if (!tryMove(pixel, pixel.x, pixel.y+1)) {
            explodeAtPlus(pixel.x, pixel.y, 10, "quantum_entangle", false, true);
            deletePixel(pixel.x,pixel.y);
        }
        doDefaults(pixel);
    },
    category: "weapons",
    state: "solid",
    density: 1300,
    tempHigh: 10455.5,
    stateHigh: ["molten_steel","poison_gas"],
    ignore: ["antimatter"],
    excludeRandom: true,
    cooldown: defaultCooldown
}
elements.quantum_entangle = { //hard-coded
    color: "#000000",
    behavior: [
        "SW|SW|SW",
        "SW|DL%10|SW",
        "SW|SW|SW",
    ],
    category: "special",
    darkText: true,
    canPlace: false,
    hidden: true,
}
elements.destructive_photon = {
    color: "#ffffff",
    tick: function(pixel) {
    if (Math.random() < 0.02) {
        deletePixel(pixel.x,pixel.y);
        return;
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
                newPixel.temp += 999;
                pixelTempCheck(newPixel);
            }
            if (!elements.light.reactions[newPixel.element]) {
                pixel.color = newPixel.color;
            }
        }
        pixel.bx = -pixel.bx;
    }
    if (pixel.by && !tryMove(pixel, pixel.x, pixel.y+pixel.by)) {
        var newY = pixel.y + pixel.by;
        if (!isEmpty(pixel.x, newY, true)) {
            var newPixel = pixelMap[pixel.x][pixel.y+pixel.by];
            if (!elements[newPixel.element].insulate) {
                newPixel.temp += 999;
                pixelTempCheck(newPixel);
            }
            if (!elements.light.reactions[newPixel.element]) {
                pixel.color = newPixel.color;
            }
        }
        pixel.by = -pixel.by;
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
    temp: 1000,
    tempLow: -273,
    stateLow: ["liquid_light",null],
    stateLowColorMultiplier: 0.8,
    category: "energy",
    state: "gas",
    density: 0.00001,
    ignoreAir: true,
}
elements.supernova_flare = { 
    color: ["#c7edff","#e9fcff","#ffffff"],
    behavior: [
        "XX|XX|XX",
        "XX|LB:warning_flare|XX",
        "XX|M1 AND EX:5>supernova|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    ignore: ["antimatter"],
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.warning_flare = {
    color: "#ff0000",
    behavior: [
        "XX|XX|XX",
        "XX|DL%80|XX",
        "XX|XX|XX"
    ],
    category: "energy",
    state: "gas",
    density: 7300,
    cooldown: defaultCooldown,
    emit: 10
}

elements.orbital_railgun_summoner = {
    color: "#00ffff",
    behavior: [
        "XX|M2|XX",
        "XX|C2:railgun_target_active|XX",
        "XX|M1|XX"
    ],
    category: "weapons",
    state: "solid",
    density: 7300,
    cooldown: defaultCooldown,
    emit: 10
}
elements.railgun_target_active = {
    color: "#00ffff",
    behavior: [
        "XX|CR:railgun_setup%1|XX",
        "CR:scan_left|CH:railgun_target|CR:scan_right",
        "XX|XX|XX"
    ],
    category: "special",
    state: "gas",
    density: 7300,
    cooldown: defaultCooldown,
    emit: 10
}
elements.railgun_target = {
    color: "#00ffff",
    behavior: [
        "XX|M1 AND BO|XX",
        "XX|CH:railgun_target_active|XX",
        "XX|XX|XX"
    ],
    category: "special",
    state: "gas",
    density: 7300,
    cooldown: defaultCooldown,
    emit: 20
}
elements.scan_left = {
    color: "#00ffff",
    tick:function(pixel) {
        if(!tryMove(pixel,pixel.x - 1, pixel.y)){
            deletePixel(pixel.x,pixel.y);
        }
    },
    category: "special",
    state: "gas",
    density: 7300,
    cooldown: defaultCooldown,
    emit: 10
}
elements.scan_right = {
    color: "#00ffff",
    tick:function(pixel) {
        if(!tryMove(pixel,pixel.x + 1, pixel.y)){
            deletePixel(pixel.x,pixel.y);
        }
    },
    category: "special",
    state: "gas",
    density: 7300,
    cooldown: defaultCooldown,
    emit: 10
}
elements.railgun_setup = {
    color: "#00ffff",
    tick:function(pixel) {
        if(!tryMove(pixel,pixel.x, pixel.y - 1)){
            deletePixel(pixel.x,pixel.y - 1);
            if(!tryMove(pixel,pixel.x,pixel.y - 1)){
                explodeAtPlus(pixel.x,pixel.y,20,fire="railgun_beam",true,false,)
            };
        };
    },
    category: "special",
    state: "gas",
    density: 7300,
    cooldown: defaultCooldown,
    emit: 10
}
elements.railgun_beam = {
    color: ["#00ffff","#71ffff"],
    tick: function(pixel) {
        var x = pixel.x;
        for (var y = pixel.y+1; y < height+1; y++) {
            if (outOfBounds(x, y)) {
                if (isEmpty(x, y-1)) { createPixel("fire", x, y-1); }
                break;
            }
            if (isEmpty(x, y)) {
                if (Math.random() > 0.1) { continue }
                createPixel("flash", x, y);
                pixelMap[x][y].delay = (y - pixel.y) / 8;
                pixelMap[x][y].color = "#00f7ff";
            }
            else {
                if (elements[pixelMap[x][y].element].id === elements.flash.id) { continue }
                if (elements[pixelMap[x][y].element].id === elements.railgun_beam.id) { break }
                if (!elements[pixelMap[x][y].element].isGas && isEmpty(x, y-1)) {
                    createPixel("railgun_blast", x, y-1);
                }
                if (Math.random() > 0.1) { continue }
                pixelMap[x][y].temp = 300;
            }
        }
        deletePixel(pixel.x, pixel.y);
    },
    category: "energy",
    state: "gas",
    density: 1,
    excludeRandom: true,
    noMix: true
}
elements.railgun_blast = {
    color: "#00d5ff",
    tick: function(pixel) {
        for (var i=0; i<3; i++) {
            if (!tryMove(pixel, pixel.x, pixel.y+1)) {
                if (!isEmpty(pixel.x, pixel.y+1,true)) {
                    var newPixel = pixelMap[pixel.x][pixel.y+1];
                    if (newPixel.element === "railgun_blast") { break; }
                    if (elements[newPixel.element].state == "solid") {
                        if (Math.random() > (elements[newPixel.element].hardness || 0)) {
                            if (elements[newPixel.element].breakInto) {
                                breakPixel(newPixel);
                            }
                            else {
                                explodeAtPlus(newPixel.x,newPixel.y,10,"fire",false,false,)
                            }}}}
                deletePixel(pixel.x,pixel.y);
                break;
            }}},
    temp: 300,
    category: "powders",
    state: "gas",
    density: 850,
    insulate: true,
    hidden: true
}
elements.six_seven = {
    hidden: true
}
elements.cryo_nuke = {
    color: "#365253",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:60>cold_plasma,cold_plasma,cold_plasma,cold_fire,radiation|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1500,
    excludeRandom: true,
    cooldown: defaultCooldown
}
elements.cold_plasma = {
    color: ["#00c3ff","#84c4d9","#00e5ff"],
    behavior: behaviors.DGAS,
    behaviorOn: [
        "M2|M1|M2",
        "CL%5 AND M1|XX|CL%5 AND M1",
        "M2|M1|M2",
    ],
    temp:-273,
    tempHigh:-260,
    stateHigh: "cold_fire",
    category: "energy",
    state: "gas",
    density: 1,
    //charge: 0.5,
    conduct: 1
}
elements.cherry_bomb = {
    color: "#6e1a1a",
    behavior: [
        "XX|EX:40>juice,smoke,smoke,smoke%1|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:40>juice,smoke,smoke,smoke%1|M2",
    ],
    behaviorOn: [
        "XX|XX|XX",
        "XX|EX:40>juice,smoke,smoke,smoke%1|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    tempHigh: 1455.5,
    stateHigh: "steam",
    excludeRandom: true,
    conduct: 1,
    cooldown: defaultCooldown,
    nocheer: true
}
elements.taco_bell_taco = {
    color: "#ffeb68",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
    category: "food",
    state: "solid",
    density: 1300,
    tempHigh: 1455.5,
    stateHigh: "steam",
    excludeRandom: true,
    conduct: 1,
    cooldown: defaultCooldown,
    nocheer: true
}
elements.body.reactions.taco_bell_taco = {elem2:"taco_bell", chance:0.5}
elements.taco_bell = {
    color: ["#ffb48f","#ffd991","#ffad91"],
    behavior: [
        "XX|XX|XX",
        "XX|EX:10>diahrrea|XX",
        "XX|XX|XX",
    ],
    temp: 300,
    category: "energy",
    state: "gas",
    density: 1000,
    excludeRandom: true,
    noMix: true
}
elements.diahrrea = {
    color: "#50300c",
    behavior: [
        "XX|CR:stench%1|XX",
        "M2%10|XX|M2%10",
        "M1|M1|M1",
    ],
    reactions: {
        "blood": { elem2:"infection", chance:0.01 },
        "frog": { elem2:"rotten_meat", chance:0.005 },
        "fish": { elem2:"rotten_meat", chance:0.005 },
        "meat": { elem2:"rotten_meat", chance:0.005 },
        "alcohol": { elem1:"acid", chance:0.2 },
        "epsom_salt": { elem1:"acid", chance:0.3 },
        "body": { elem1:"barf", chance:0.1 },
    },
    viscosity: 15,
    tempHigh: 124.55,
    stateHigh: ["plague","plague","plague","salt","oxygen"],
    tempLow: 0,
    category: "liquids",
    hidden: true,
    state: "liquid",
    density: 1060,
    stain: 0.2
}
