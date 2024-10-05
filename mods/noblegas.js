elements.argon = {
    color: elements.neon.color,
    behavior: behaviors.GAS,
    colorOn: ["#c831ee","#d683eb","#7a258f"],
    category: "gases",
    state: "gas",
    tempLow: -185.8,
    stateLow: "liquid_argon",
    density: 1.784,
    conduct: 0.8
}
elements.liquid_argon = {
    color: elements.neon.color,
    behavior: behaviors.LIQUID,
    colorOn: ["#c831ee","#d683eb","#7a258f"],
    category: "states",
    state: "liquid",
    tempHigh: -183.8,
    stateHigh: "argon",
    density: 1401,
    tempLow: -189.3,
    stateLow: "frozen_argon",
    conduct: 0.8
}
elements.frozen_argon = {
    color: elements.neon.color,
    behavior: behaviors.WALL,
    colorOn: ["#c831ee","#d683eb","#7a258f"],
    category: "states",
    state: "solid",
    tempHigh: -187.3,
    stateHigh: "liquid_argon",
    density: 1616,
    conduct: 0.8
}
elements.krypton = {
    color: elements.neon.color,
    behavior: behaviors.GAS,
    colorOn: ["#c49dce","#ac8ab4","#715579"],
    category: "gases",
    state: "gas",
    tempLow: -153.22,
    stateLow: "liquid_krypton",
    density: 3.75,
    conduct: 0.8
}
elements.liquid_krypton = {
    color: elements.neon.color,
    behavior: behaviors.LIQUID,
    colorOn: ["#c49dce","#ac8ab4","#715579"],
    category: "states",
    state: "liquid",
    tempHigh: -150.22,
    stateHigh: "krypton",
    density: 2423,
    tempLow: -157.36,
    stateLow: "frozen_krypton",
    conduct: 0.8
}
elements.frozen_krypton = {
    color: elements.neon.color,
    behavior: behaviors.WALL,
    colorOn: ["#c49dce","#ac8ab4","#715579"],
    category: "states",
    state: "solid",
    tempHigh: -154.36,
    stateHigh: "liquid_krypton",
    density: 2160,
    conduct: 0.8
}
elements.xenon = {
    color: elements.neon.color,
    behavior: behaviors.GAS,
    colorOn: ["#627eca","#4572d3","#333cb1"],
    category: "gases",
    state: "gas",
    tempLow: -108,
    stateLow: "liquid_xenon",
    density: 5.9,
    conduct: 0.8
}
elements.liquid_xenon = {
    color: elements.neon.color,
    behavior: behaviors.LIQUID,
    colorOn: ["#627eca","#4572d3","#333cb1"],
    category: "states",
    state: "liquid",
    tempHigh: -104,
    stateHigh: "xenon",
    density: 2948,
    tempLow: -111.8,
    stateLow: "frozen_xenon",
    conduct: 0.8
}
elements.frozen_xenon = {
    color: elements.neon.color,
    behavior: behaviors.WALL,
    colorOn: ["#627eca","#4572d3","#333cb1"],
    category: "states",
    state: "solid",
    tempHigh: -109.8,
    stateHigh: "liquid_xenon",
    density: 3410,
    conduct: 0.8
}
elements.radon = {
    color: elements.neon.color,
    behavior: behaviors.GAS,
    colorOn: ["#3dd3cb","#32f7e7","#31c0a8"],
    category: "gases",
    state: "gas",
    conduct: 0.8,
    tempLow: -61,
    stateLow: "liquid_radon",
    density: 9.73,
    tick: function(pixel){
        if(elements.polonium){
            if(Math.random()<0.00038){
                for (var i = 0; i < adjacentCoords.length; i++){
                    var coord = adjacentCoords[i];
                    var x = pixel.x+coord[0];
                    var y = pixel.y+coord[1];
                    if (isEmpty(x, y) && Math.random()<0.01){
                        createPixel(x, y, "helium")
                        pixelMap[x][y].temp += 75
                        break;
                    }
                }
                changePixel(pixel, "polonium", false)
                pixel.temp += 100
            }
        }else{
            if(Math.random()<0.00038){
                for (var i = 0; i < adjacentCoords.length; i++){
                    var coord = adjacentCoords[i];
                    var x = pixel.x+coord[0];
                    var y = pixel.y+coord[1];
                    if (!isEmpty(x, y, true) && Math.random()<0.01){
                        pixel.temp += 50
                    }
                }
                changePixel(pixel, "helium", false)
                pixel.temp += 100
            }
        }
        for (var i = 0; i < adjacentCoords.length; i++){
            var coord = adjacentCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (isEmpty(x, y) && Math.random() < 0.001){
                createPixel("radiation", x, y);
            }
        }
    }
}
elements.liquid_radon = {
    color: elements.neon.color,
    behavior: behaviors.LIQUID,
    colorOn: ["#3dd3cb","#32f7e7","#31c0a8"],
    category: "states",
    state: "liquid",
    tempHigh: -58,
    stateHigh: "radon",
    density: 13,
    tempLow: -71,
    stateLow: "frozen_radon",
    conduct: 0.8,
    tick: elements.radon.tick
}
elements.frozen_radon = {
    color: elements.neon.color,
    behavior: behaviors.WALL,
    colorOn: ["#3dd3cb","#32f7e7","#31c0a8"],
    category: "states",
    state: "solid",
    tempHigh: -68,
    stateHigh: "liquid_radon",
    density: 16,
    conduct: 0.8,
    tick: elements.radon.tick
}
elements.oganesson = {
    color: elements.neon.color,
    behavior: behaviors.GAS,
    colorOn: ["#b5e65b","#b9f756","#aee456"],
    category: "gases",
    state: "gas",
    conduct: 0.8,
    density: 9.73,
    tick: function(pixel){
        if(elements.livermorium){
            if(Math.random()<0.038){
                for (var i = 0; i < adjacentCoords.length; i++){
                    var coord = adjacentCoords[i];
                    var x = pixel.x+coord[0];
                    var y = pixel.y+coord[1];
                    if (isEmpty(x, y) && Math.random()<0.01){
                        createPixel(x, y, "helium")
                        pixelMap[x][y].temp += 250
                        break;
                    }
                }
                changePixel(pixel, "livermorium", false)
                pixel.temp += 100
            }
        }else{
            if(Math.random()<0.038){
                for (var i = 0; i < adjacentCoords.length; i++){
                    var coord = adjacentCoords[i];
                    var x = pixel.x+coord[0];
                    var y = pixel.y+coord[1];
                    if (!isEmpty(x, y, true) && Math.random()<0.01){
                        pixel.temp += 100
                    }
                }
                changePixel(pixel, "helium", false)
                pixel.temp += 250
            }
        }
        for (var i = 0; i < adjacentCoords.length; i++){
            var coord = adjacentCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (isEmpty(x, y) && Math.random() < 0.01){
                createPixel("radiation", x, y);
            }
        }
    }
}
// lightmap.js integration function
if (enabledMods.includes("mods/lightmap.js")){
    function nobleGasTick(pixel){
        if (pixel.charge || pixel.chargeCD){
            let color = elements[pixel.element].colorOn
            let randcolor = color[Math.floor(Math.random()*color.length)]
            let rgbcolor = hexToRGB(randcolor)
            console.log(color)
            console.log(randcolor)
            console.log(rgbcolor)
            let x = Math.floor(pixel.x / lightmapScale);
            let y = Math.floor(pixel.y / lightmapScale);
            lightmap[y][x] = { color: [rgbcolor.r, rgbcolor.g, rgbcolor.b] };
        }
    }
    let nobleGases = ["argon", "liquid_argon", "frozen_argon", "krypton", "liquid_krypton", "frozen_krypton", "xenon", "liquid_xenon", "frozen_xenon", "radon", "liquid_radon", "frozen_radon", "oganesson"]
    for (let i = 0; i < nobleGases.length; i++){
        let nobleGas = nobleGases[i]
        if (elements[nobleGas].tick){
            oldTick = elements[nobleGas].tick
            elements[nobleGas].tick = function(pixel){
                nobleGasTick(pixel)
                oldTick(pixel)
            }
        }else{
        elements[nobleGas].tick = function(pixel){
            nobleGasTick(pixel)
        }
    }
    }
}