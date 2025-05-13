elements.endstone = {
    color: ["#e5edc2", "#bec797"],
    behavior: behaviors.WALL,
    category: "minecraft",
    state: "solid",
    stateHigh: "molten_endstone",
    tempHigh: 1265
};
elements.molten_endstone = {
    color: ["#6615d6", "#9651f5", "#d3c3eb"],
    behavior: behaviors.LIQUID,
    category: "minecraft",
    state: "liquid",
    stateLow: "endstone",
    tempLow: 1265,
    temp: 1500,
    viscosity: 1000,
    density: 1025
};
elements.netherrack = {
    color: ["#8c2a0a", "#783722"],
    behavior: behaviors.WALL,
    category: "minecraft",
    state: "solid",
    tempHigh: 2750,
    stateHigh: "molten_netherrack",
};
elements.glowstone_dust = {
    color: ["#d9d636", "#fffc63", "#a3a12f", "#e0dd3f"],
    behavior: behaviors.POWDER,
    category: "minecraft",
    state: "solid",
    tempHigh: 2500,
    stateHigh: "molten_glowstone",
    conduct: 0.975,
    density: 1075
};
elements.molten_netherrack = {
    name: "Nether Magma",
    color: ["#f7f09c", "#faf9eb", "#ffffff", "#dcf7f7", "#86dbdb", "#1268a6"],
    behavior: behaviors.LIQUID,
    category: "minecraft",
    state: "liquid",
    tempLow: 2750,
    stateLow: "netherrack",
    temp: 3000,
    viscosity: 1000,
    density: 2305
};
elements.redstone_dust = {
    color: ["#bf2424", "#f22424", "#a12020"],
    behavior: behaviors.POWDER,
    category: "minecraft",
    state: "solid",
    tempHigh: 1275,
    stateHigh: "liquid_redstone",
    density: 1250
};
/*
behaviors.SOUL_SAND = [
        "SA|SA|SA",
        "XX|XX|XX",
        "SA AND M2|SA AND M1|SA AND M2",
    ];
    */
elements.soul_sand = {
    color: ["#91704d", "#704e2b", "#523517"],
    behavior: behaviors.SUPPORTPOWDER,
    category: "minecraft",
    state: "solid",
    tempHigh: 2575,
    stateHigh: "molten_soul_glass",
    density: 1375,
    reactions: {
        "water": { "elem1":"wet_soul_sand", "elem2":null },
    }
};
elements.soul_soil = {
    color: ["#80664b", "#6e553b", "#5c452e"],
    behavior: behaviors.SUPPORTPOWDER,
    category: "minecraft",
    state: "solid",
    tempHigh: 2565,
    stateHigh: "soul_glass",
    density: 1450,
    reactions: {
        "water": { "elem1":"soul_mud", "elem2":null },
    }
};
elements.soul_mud = {
    color: "#6e5437",
    behavior: behaviors.POWDER,
    category: "minecraft",
    state: "solid",
    tempHigh: 1985,
    stateHigh: "soul_adobe",
    density: 1585
};
elements.soul_glass = {
    color: "#7a90c2",
    behavior: behaviors.WALL,
    category: "minecraft",
    state: "solid",
    tempHigh: 2585,
    stateHigh: "molten_soul_glass",
    density: 1685
};
elements.wet_soul_sand = {
    color: ["#5c452e", "#856d56"],
    behavior: behaviors.POWDER,
    category: "minecraft",
    state: "solid",
    tempHigh: 150,
    stateHigh: "soul_sand",
    density: 1660,
};
elements.molten_soul_glass = {
    color: ["#36d7ec", "#2fbacd", "#289faf", "#218491", "#1a6a75"],
    fireColor: "#36d7ec",
    viscosity: 1000,
    behavior: behaviors.MOLTEN,
    category: "minecraft",
    density: 1625,
    hidden: true,
    tempLow: 2540,
    stateLow: "soul_glass",
    state: "liquid",
    temp: 2700,
}
/* unfinished but near:
Soul Adobe,
Molten Soul Glass,
Nether Quartz,
Molten Nether Quartz,
Dripstone,
Molten Dripstone,
Molten Glowstone,
Liquid Redstone,
Soul Flame,
Soul
*/
let wardenMurderList = ["head", "body", "frog", "worm", "fly", "flea", "fish", "bird", "bee"]
function playSculk() {
    var audio = new Audio("https://JustAGenericUsername.github.io/sculk" + Math.floor((Math.random()*6) +1) + ".ogg");
    audio.play();
}
function playShriek() {
    var audio = new Audio("https://JustAGenericUsername.github.io/shriek" + Math.floor((Math.random()*4) +1) + ".ogg");
    audio.play();
}
async function _GNPrompt(message, title = "Prompt", defaultValue = "") { // thanks to ggod
    return new Promise(resolve => {
        promptInput(message, (result) => {
            resolve(result);
        }, title, defaultValue);
    })
}
function turnIntoSpecific(pixel){
    newPixel = pixel.storedPixel
    newPixel.x = pixel.x;
    newPixel.y = pixel.y;
    delete newPixel.del;
    delete newPixel.sculkSpread;
    delete newPixel.rSeed;
    let tempPixel = newPixel;
    pixelMap[pixel.x][pixel.y] = tempPixel
    currentPixels = currentPixels.filter(a => a.x != pixel.x || a.y != pixel.y); currentPixels.push((tempPixel))
}
function findAboveNot(pixel, element){
    for (let i = pixel.y; i <= (0-height); i--){
        if (isEmpty(pixelMap[pixel.x][i], true) && element != "air"){
            return {distance: i, element: "air"}
        } else if (!(pixelMap[pixel.x][i].element != element)){
            return {distance: i, element: pixelMap[pixel.x][i].element}
        }
    }
    return {distance: height, element: "edge"}
}
function findAboveIs(pixel, element){
    for (let i = pixel.y; i <= (0-height); i--){
        if (isEmpty(pixelMap[pixel.x][i], true) && element == "air"){
            return {distance: i, element: "air"}
        } else if (!(pixelMap[pixel.x][i].element == element)){
            return {distance: i, element: element}
        }
    }
    return false
}
let canPlaySculk = 0
let wardenCooldown = 0
let totalSculk = {
    sculk: 0,
    wardens: 0,
    sensors: 0,
    shriekers: 0
}
elements.sculk = {
    color: ["#0c1a22", "#0a171d", "#071319", "#030f14", "#000a0f"],
    behavior: behaviors.SUPPORT,
    density: 1500,
    category: "minecraft",
    tempHigh: 250,
    stateHigh: "experience",
    tick: function(pixel){
        if (!pixel.type){pixel.type = "sculk"}
        if (!pixel.rSeed && pixel.type == "sculk"){pixel.rSeed = [Math.random(), Math.random()]}
        if (!pixel.rSeed && pixel.type == "sensor"){
            pixel.rSeed = true
            pixel.color = pixelColorPick(pixel, "#112b4d")
        }
        if (!pixel.rSeed && pixel.type == "shrieker"){
            pixel.rSeed = true
            pixel.color = pixelColorPick(pixel, "#dad6b8")
        }
        if (pixel.type == "sculk" && pixel.rSeed[0] < 0.05){
            pixel.color = "rgb(40, " + (12*Math.sin((0.05*pixelTicks)+(pixel.rSeed[1]*100)) + 201) + ", " + (46*Math.sin((0.1*pixelTicks)+(pixel.rSeed[1]*100))+201) + ")";
        }
        if (pixel.type == "sculk"){
            if (!pixel.storedPixel){pixel.storedPixel = {element: "dirt", color: pixelColorPick({element: "dirt"}), start: pixel.start, temp: pixel.temp, x: pixel.x, y: pixel.y}}
            if (!pixel.sculkSpread){pixel.sculkSpread = 0}
            if (Math.random()<0.0001){ pixel.sculkSpread ++}
            for (var i = 0; i < squareCoords.length; i++) {
                var x = pixel.x+squareCoords[i][0];
                var y = pixel.y+squareCoords[i][1];
                // higher penalty for top/bottom coords, lower for side coords
                let penalty = 0.9994
                for (var j = 0; j < squareCoords.length; j++) {
                    var jx = x+squareCoords[j][0];
                    var jy = y+squareCoords[j][1];
                    if (isEmpty(jx,jy,true)) {penalty = 0.8}
                }
                if (!isEmpty(x,y,true)) {
                    var newPixel = pixelMap[x][y];
                    if (newPixel.element == "sculk" && newPixel.type == "sculk"){
                        if (pixel.sculkSpread > newPixel.sculkSpread){
                            newPixel.sculkSpread ++
                            pixel.sculkSpread --
                        }
                    } else if (!(["fire", "radiation", "uranium", "plasma", "bless", "god_ray",
                        "experience", "meat", "ash", "cooked_meat", "rotten_meat", "frozen_meat",
                        "cured_meat", "dead_plant", "frozen_plant", "warden", "warden_head", "warden_body",
                        "sculk"].includes(newPixel.element) || wardenMurderList.includes(newPixel.element))){
                        if (Math.random() > (elements[newPixel.element].hardness || 0.2) && Math.random() > penalty && pixel.sculkSpread > 0 && pixel.temp < 80){
                            pixel.sculkSpread --
                            let pixelStorage = newPixel
                            deletePixel(x, y)
                            createPixel("sculk", x, y)
                            pixelMap[x][y].storedPixel = pixelStorage
                        }
                    } else if (["meat", "ash", "cooked_meat", "rotten_meat", "frozen_meat", "cured_meat",
                        "dead_plant", "frozen_plant", "blood", "cell", "cancer"].includes(newPixel.element) && pixel.temp < 80){
                        deletePixel(x, y)
                        pixel.sculkSpread += 3
                    }
                }
            }
        }
        if (pixel.type == "sensor"){
            let cCoords = circleCoords(pixel.x, pixel.y, 8)
            for (var i = 0; i < cCoords.length; i++) {
                var x = cCoords[i].x
                var y = cCoords[i].y
                if (!isEmpty(x, y, true)){
                    if (wardenMurderList.includes(pixelMap[x][y].element)){
                        if (canPlaySculk == 0){playSculk(); canPlaySculk = 4*30}
                    }
                }
            }

        }
        if (pixel.type == "shrieker"){
            if (canPlaySculk >= 3.7*30 && wardenCooldown == 0){
                if (isEmpty(pixel.x-1, pixel.y-2, true)){
                    createPixel("warden", pixel.x-1, pixel.y-2)
                    playShriek()
                    wardenCooldown = 15*30
                }
            }
        }
        let nAirDist = findAboveNot(pixel, "air")
        if (nAirDist){
            if (Math.random() < 0.001 && pixel.sculkSpread >= 2 && nAirDist.distance >= 6  && (nAirDist.element == "air"||nAirDist.element == "edge") && totalSculk.sensors < 10 && pixel.type == "sculk"){
                if (isEmpty(pixel.x, pixel.y-1, true)){
                    createPixel("sculk", pixel.x, pixel.y-1)
                    pixelMap[pixel.x][pixel.y-1].type = "sensor"
                    pixel.sculkSpread -= 2
                }
            }
            else if (Math.random() < 0.0005 && pixel.sculkSpread >= 4 && nAirDist.distance >= 6  && (nAirDist.element == "air"||nAirDist.element == "edge") && totalSculk.shriekers < 4 && pixel.type == "sculk"){
                if (isEmpty(pixel.x, pixel.y-1, true)){
                    createPixel("sculk", pixel.x, pixel.y-1)
                    pixelMap[pixel.x][pixel.y-1].type = "shrieker"
                    pixel.sculkSpread -= 4
                }
            }
        }
    },
    breakInto: "experience",
}
const randgrid1 = Array.from({ length: Math.pow(12, 2) }, () => Math.random() * 2 * Math.PI);
const randgrid2 = Array.from({ length: Math.pow(12, 2) }, () => Math.random() * 2 * Math.PI);
function xpNoise(weight){
    const length = randgrid1.length;
    const weightedGrid = new Array(length);

    for (let i = 0; i < length; i++) {
        weightedGrid[i] = weightedAverage(randgrid1[i], randgrid2[i], weight);
    }

    return weightedGrid;
}
function weightedAverage(num1, num2, weight){
	return ((weight * num1)+((1-weight)*num2))
}
function getScalingFactor(d1, d2){
    return Math.min(d1, d2)/6
}
function badNoise(C, x, y) {
    // Helper function to calculate dot product
    function dotProduct(a, b) {
        return a[0] * b[0] + a[1] * b[1];
    }

    // Function d
    function d(index) {
        return [Math.cos(C[index]), Math.sin(C[index])];
    }

    // Function f
    function f(x, y, t) {
        return x + (y - x) * (6 * t ** 5 - 15 * t ** 4 + 10 * t ** 3);
    }

    // Function g
    function g(x, y, z, w) {
        const dx = x - z;
        const dy = y - w;
        return dotProduct([dx, dy], d(z + w * 6 + 1));
    }

    // Main function h
    const x0 = Math.floor(x);
    const x1 = Math.ceil(x);
    const y0 = Math.floor(y);
    const y1 = Math.ceil(y);

    const g00 = g(x, y, x0, y0);
    const g10 = g(x, y, x1, y0);
    const g01 = g(x, y, x0, y1);
    const g11 = g(x, y, x1, y1);

    const fx = f(g00, g10, x - x0);
    const fy = f(g01, g11, x - x0);

    return Math.sqrt(2) * f(fx, fy, y - y0);
}
elements.experience = {
    color: ["#e0fc2c", "#c2f62b", "#a3f02f", "#83e935", "#5ee13d"],
    behavior: behaviors.SUPERFLUID,
    density: 1600,
    category: "minecraft",
    tick: function(pixel){
        /*
        if (typeof pixel.rSeed != "number"){delete pixel.rSeed}
        if (!pixel.rSeed){pixel.rSeed = Math.random()}
        */
       let scaling = getScalingFactor(width, height)
       pixel.rSeed = badNoise(xpNoise(Math.sin(pixelTicks/30)), pixel.x/scaling, pixel.y/scaling)
        pixel.color = "rgb(" + 70*(Math.sin((4*Math.PI)*pixelTicks/70 + 3*pixel.rSeed)+2.5) + ", 235, 80)"
        if (typeof pixel.storedPixel != "undefined" && Math.random() < 0.8){
            deletePixel(pixel.x, pixel.y)
            turnIntoSpecific(pixel)
            return;
        } else if (pixel.storedPixel){delete pixel.storedPixel}
     /*   // average rseed of neighbors
        for (var i = 0; i < adjacentCoords.length; i++) {
            var x = pixel.x + adjacentCoords[i][0]
            var y = pixel.y + adjacentCoords[i][1]
            if (!isEmpty(x,y,true)){
                let otherPixel = pixelMap[x][y]
                if (otherPixel.element == "experience"){
                    let sum1 = weightedAverage((pixel.rSeed || Math.random()), (otherPixel.rSeed || Math.random()), 0.95)
                    let sum2 = weightedAverage((pixel.rSeed || Math.random()), (otherPixel.rSeed || Math.random()), 0.05)
                    pixel.rSeed = sum1
                    otherPixel.rSeed = sum2
                    pixel.rSeed += (Math.random()/100)-0.005
                    otherPixel.rSeed += (Math.random()/100)-0.005
                }
            }
        }
            */
    },
    glow: true,
}
    if (!elements.bless.reactions){elements.bless.reactions = {}}
    elements.bless.reactions.sculk = {func: turnIntoSpecific, chance: 0.01}
elements.warden = {
    color: "#09273f",
    category: "minecraft",
    properties: {
        dead: false,
        dir: 1,
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            createPixel("warden_body", pixel.x, pixel.y+1);
            pixel.element = "warden_head";
        }
        else if (isEmpty(pixel.x, pixel.y-1)) {
            createPixel("warden_head", pixel.x, pixel.y-1);
            pixelMap[pixel.x][pixel.y-1].color = pixel.color;
            pixel.element = "warden_body";
            pixel.color = pixelColorPick(pixel)
        }
        else {
            deletePixel(pixel.x, pixel.y);
        }
    },
    related: ["warden_body","warden_head"],
    cooldown: defaultCooldown,
}
elements.warden_body = {
    color: "#030b16",
    category: "minecraft",
    hidden: true,
    density: 1500,
    state: "solid",
    conduct: .05,
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        age = pixelTicks - pixel.start;
        if (age > 15*30){
            deletePixel(pixel.x, pixel.y);
        }
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
            }
        }
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
      //      // Turn into rotten_meat if pixelTicks-dead > 500
            if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
      //          changePixel(pixel,"rotten_meat");
      //      }
                deletePixel(pixel.x, pixel.y);
                return
            }
        }

        // Find the head
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "warden_head") {
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
      ///      if (Math.random() < 0.1 && !pixel.charge) {
        //        createPixel("blood", pixel.x, pixel.y-1);
                // set dead to true 15% chance
        //        if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
         //       }
       //     }
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

    },
    reactions: {}
},
elements.warden_head = {
    color: "#145377",
    category: "minecraft",
    hidden: true,
    density: 1080,
    state: "solid",
    conduct: .05,
    properties: {
        dead: false
    },
    tick: function(pixel) {
        age = pixelTicks - pixel.start;
        if (age > 15*30){
            deletePixel(pixel.x, pixel.y);
        }
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            // Turn into rotten_meat if pixelTicks-dead > 500
            if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
           //     changePixel(pixel,"rotten_meat");
                  deletePixel(pixel.x, pixel.y);
                  return
           }
        }

        // Find the body
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "warden_body") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) { // If body is dead, kill head
                pixel.dead = body.dead;
            }
        }
        else { var body = null; pixel.dead = pixelTicks }

        if (tryMove(pixel, pixel.x, pixel.y+1)) {
            // create blood if severed 10% chance
          if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1 && !pixel.charge) {
             //   createPixel("blood", pixel.x, pixel.y+1);
                // set dead to true 15% chance
              //  if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
              }
         //   }
        }
        // homeostasis
        if (pixel.temp > 37) { pixel.temp -= 1; }
        else if (pixel.temp < 37) { pixel.temp += 1; }
    },
    reactions: {}
}
for (i = 0; i < wardenMurderList.length; i++){
    let e = wardenMurderList[i]
    elements.warden_head.reactions[e] = {elem2: "meat", chance: 0.5}
    elements.warden_body.reactions[e] = {elem2: "meat", chance: 0.5}
}
setInterval(function(){
    if (canPlaySculk > 0){
        canPlaySculk --
    }
    if (typeof currentPixels != "undefined"){
        totalSculk = {
            sculk: 0,
            wardens: 0,
            sensors: 0,
            shriekers: 0
        }
        for (let i in currentPixels){
            let pixel = currentPixels[i]
            if (pixel.element == "warden_body"){
                totalSculk.wardens ++
            } else if (pixel.element == "sculk"){
                if (pixel.type == "sculk"){
                    totalSculk.sculk ++
                } else if (pixel.type == "sensor"){
                    totalSculk.sensors ++
                } else if (pixel.type == "shrieker"){
                    totalSculk.shriekers ++
                }
            }
        }
    }
    if (wardenCooldown > 0){
        wardenCooldown --
    }
}, 1000/30)
let channelVar = "0"
elements.sculk_wifi_transmitter = {
    color: "#142c47",
    category: "minecraft",
    behavior: behaviors.WALL,
    tempHigh: 250,
    stateHigh: "dirt",
    hoverStat: function(pixel){
        return pixel.channel || "unset"
    },
    onSelect: async function(){
        let ans1 = await _GNPrompt("What channel should this transmitter be? Wont work if you do multiple while paused. (This is meant to be used in machinery!)", "minecraft.js is asking you...",channelVar||0)
        channelVar = ans1
    },
    tick: function(pixel){
        if (!pixel.channel){pixel.channel = channelVar}
        for (let i in currentPixels){
            let otherPixel = currentPixels[i]
            if (otherPixel.element == "sculk_wifi_receiver" && otherPixel.channel == pixel.channel){
                for (var j = 0; j < adjacentCoords.length; j++){
                    let coord = adjacentCoords[j]
                    let x = otherPixel.x + coord[0]
                    let y = otherPixel.y + coord[1]
                    if (!isEmpty(x, y, true)){
                        let neighborPixel = pixelMap[x][y]
                        if (elements[neighborPixel.element].conduct){
                            neighborPixel.charge = pixel.charge
                        }
                    }
                }
            }
        }
        if (pixel.charge && canPlaySculk <= 0){
            canPlaySculk = 25
            playSculk()
        }
        doDefaults(pixel)
    },
    conduct: 1
}
elements.sculk_wifi_receiver = {
    color:  "#142c47",
    category: "minecraft",
    behaviors: behaviors.WALL,
    tempHigh: 250,
    stateHigh: "dirt",
    hoverStat: function(pixel){
        return pixel.channel || "unset"
    },
    onSelect: async function(){
        let ans1 = await _GNPrompt("What channel should this receiver be? Wont work if you do multiple while paused. (This is meant to be used in machinery!)", "minecraft.js is asking you...", channelVar||0)
        channelVar = ans1
    },
    tick: function(pixel){
        if (!pixel.channel){pixel.channel = channelVar}
    }
}
drawRectangle = function(ctx, color, x, y, width, height, xoffset, yoffset){
    ctx.fillStyle = color;
    ctx.fillRect(canvasCoord(x+xoffset), canvasCoord(y+yoffset), pixelSize*width, pixelSize*height)
}
autoFillDrawRectangle = function(ctx, pixel, width, height, xoffset, yoffset){
    ctx.fillStyle = pixel.color;
    ctx.fillRect(canvasCoord(pixel.x+xoffset), canvasCoord(pixel.y+yoffset), pixelSize*width, pixelSize*height)
}
autoFillColorRectangle = function(ctx, pixel, color, width, height, xoffset, yoffset){
    ctx.fillStyle = color;
    ctx.fillRect(canvasCoord(pixel.x+xoffset), canvasCoord(pixel.y+yoffset), pixelSize*width, pixelSize*height)
}
grabDistances = function(pixel){
    let element = pixel.element
    // first we find upper not the same
    let results = {}
    for (let i = 0; i < height; i++){
        if (isEmpty(pixel.x, pixel.y-i, true) || pixelMap[pixel.x][pixel.y-i].element != element){
            results.top = i
            if (isEmpty(pixel.x, pixel.y-i, true)){
                results.topelement = "air"
            } else {
                results.topelement = pixelMap[pixel.x][pixel.y-i].element
            }
            break;
        }
    }
    // now bottom not same
    for (let i = 0; i < height; i++){
        if (isEmpty(pixel.x, pixel.y+i, true) || pixelMap[pixel.x][pixel.y + i].element != element){
            results.bottom = i
            if (isEmpty(pixel.x, pixel.y+i, true)){
                results.bottomelement = "air"
            } else {
                results.bottomelement = pixelMap[pixel.x][pixel.y + i].element
            }
            break;
        }
    }
    return results
}
elements.dripstone_spike = {
    color: "#927965",
    category: "minecraft",
    behavior: behaviors.WALL,
    tempHigh: 1810,
    stateHigh: "molten_dripstone",
    density: 2550,
    renderer: function(pixel, ctx){
        if (pixel.spikeType == 1){
            autoFillDrawRectangle(ctx, pixel, 1, 1/3, 0, 0)
            autoFillDrawRectangle(ctx, pixel, 2/3, 1, 1/6, 0)}
        else if (pixel.spikeType == 2){
            autoFillDrawRectangle(ctx, pixel, 2/3, 1, 1/6, 0)
        }
        else if (pixel.spikeType == 3){
            autoFillDrawRectangle(ctx, pixel, 2/3, 5/6, 1/6, 0)
            autoFillDrawRectangle(ctx, pixel, 0.5, 1/3, 1/3, 2/3)
        }
        else if (pixel.spikeType == 4){
            autoFillDrawRectangle(ctx, pixel, 0.5, 1/3, 1/3, 0)
            autoFillDrawRectangle(ctx, pixel, 1/3, 1/3, 1/3, 1/6)
            autoFillDrawRectangle(ctx, pixel, 1/6, 0.5, 1/3, 1/3)
        }
        else{
            drawSquare(ctx, pixel.color, pixel.x, pixel.y)
        }
    },
    tick: function(pixel){
        let distance = grabDistances(pixel);
        if (distance.bottom == 1)
            {pixel.spikeType = 4}
        else if (distance.bottom == 2)
            {pixel.spikeType = 3}
        else if (distance.bottom >= 3 && distance.top > 1)
            {pixel.spikeType = 2}
        else 
            {pixel.spikeType = 1}
        if (!pixel.spikeType){console.log(distance)}
        if (distance.topelement == "air" && distance.top == 1){
            // make the entire spike fall
            let fallList = []
            for (let i = 0; i < height; i++){
                if (!isEmpty(pixel.x, pixel.y+i, true) && pixelMap[pixel.x][pixel.y+i].element == "dripstone_spike"){
                    fallList.push(pixelMap[pixel.x][pixel.y+i])
                } else {break}
            }
            fallList = fallList.reverse();
                for (let i = 0; i<fallList.length;i++){
                    if (!tryMove(fallList[i], fallList[i].x, fallList[i].y+1)){
                        deletePixel(fallList[i].x, fallList[i].y)
                        if(!isEmpty(fallList[i].x, fallList[i].y+1, true)){
                            breakPixel(pixelMap[fallList[i].x][fallList[i].y+1])
                        }
                        break;
                    }
                }
        }
    }
}
elements.dripstone = {
    color: "#927965",
    category: "minecraft",
    behavior: behaviors.WALL,
    tempHigh: 1810,
    stateHigh: "molten_dripstone",
    density: 2550
}
elements.molten_dripstone = {
    color: ['#ff7b00', '#ff8d2d', '#ff9d4a', '#ffad65', '#ffbc80'],
    category: "minecraft",
    behavior: behaviors.MOLTEN,
    tempLow: 1800,
    stateLow: "dripstone",
    temp: 1850,
    density: 2500,
    state: "liquid",
    viscosity: 2000
}
elements.obsidian = { //subject to change
    color: "#06030B",
    category: "minecraft",
    behavior: behaviors.WALL,
    tempHigh: 1750,
    stateHigh: "molten_obsidian",
    density: 2400,
    renderer: function(pixel, ctx){
        autoFillColorRectangle(ctx, pixel, "#06030B", 1, 1, 0, 0)
        autoFillColorRectangle(ctx, pixel, "#000100", 1/6, 1/6, 5/6, 5/6)
        autoFillColorRectangle(ctx, pixel, "#000100", 1/6, 1/3, 1/3, 2/3)
        autoFillColorRectangle(ctx, pixel, "#000100", 1/3, 1/6, 1/6, 2/3)
        autoFillColorRectangle(ctx, pixel, "#000100", 1/6, 1/6, 0, 1/6)
        autoFillColorRectangle(ctx, pixel, "#000100", 1/3, 1/6, 1/6, 0)
        autoFillColorRectangle(ctx, pixel, "#271E3D", 1/3, 1/3, 1/2, 0)
        autoFillColorRectangle(ctx, pixel, "#271E3D", 1/2, 1/6, 1/3, 1/6)
        autoFillColorRectangle(ctx, pixel, "#271E3D", 1/3, 1/6, 2/3, 2/3)
        autoFillColorRectangle(ctx, pixel, "#271E3D", 1/6, 1/6, 1/3, 1/2)
        autoFillColorRectangle(ctx, pixel, "#271E3D", 1/6, 1/3, 0, 1/2)
        autoFillColorRectangle(ctx, pixel, "#3B2754", 1/5, 1/6, 5/6, 1/2)
        autoFillColorRectangle(ctx, pixel, "#3B2754", 1/6, 1/6, 1/2, 0)
    }
}
elements.molten_obsidian = {
    color: ['#ff7700', '#df6004', '#bf4905', '#9f3404', '#802000'],
    category: "minecraft",
    behavior: behaviors.MOLTEN,
    tempLow: 1740,
    stateLow: "obsidian",
    temp: 1850,
    density: 2300,
    viscosity: 5000
}