var metalstocorrode = ["iron", "copper", "gold", "brass","steel","nickel","zinc","silver","aluminum","bronze","tin","lead", "rose_gold", "blue_gold", "gallium", "electrum", "purple_gold"]
var biologicaltocorrode = []
var alkalimetals = ["lithium", "sodium", "potassium", "rubidium", "cesium", "radiocesium", "caesium", "caesium_137", "francium", "molten_caesium", "molten_caesium_137", "liquid_cesium", "liquid_radiocesium"]
for (let elementi in elements){
    if (elements[elementi].category == "life" || elements[elementi].category == "food"){
        biologicaltocorrode.push(elementi)
    }
}
biologicaltocorrode.splice(biologicaltocorrode.indexOf("salt"), 1)
biologicaltocorrode.splice(biologicaltocorrode.indexOf("sugar"), 1)
biologicaltocorrode.push("wood")
if (enabledMods.includes("mods/bettermetalscrap.js")){
    for (let metal in metalstocorrode){
        if (!elements[metalstocorrode[metal]].properties){elements[metalstocorrode[metal]].properties = {}}
        elements[metalstocorrode[metal]].properties.scrapType = metalstocorrode[metal]
    }
}
function basicHalogen(pixel){
    for (var i = 0; i < adjacentCoords.length; i++) {
        var coord = adjacentCoords[i];
        var x = pixel.x+coord[0];
        var y = pixel.y+coord[1];
        if (!isEmpty(x, y, true)){
           var otherPixel = pixelMap[x][y]
           if (metalstocorrode.includes(otherPixel.element) && Math.random() < 0.01){
                otherPixel.element = "metal_scrap"
                if (Math.random()<0.5){
                    deletePixel(pixel.x, pixel.y)
                }
           }
           if (biologicaltocorrode.includes(otherPixel.element) && Math.random() < 0.1){
                changePixel(otherPixel, "ash", false)
                if (Math.random()<0.5){
                    deletePixel(pixel.x, pixel.y)
                }
           }
           if (alkalimetals.includes(otherPixel.element) && Math.random() < 0.1){
                changePixel(otherPixel, "salt", false)
                deletePixel(pixel.x, pixel.y)
                otherPixel.temp += 100
           }
        }
    }
}
elements.fluorine = {
    color: ["#c4d067", "#ced87e", "#d8e094", "#e2e9aa", "#ecf1c0"],
    behavior: behaviors.GAS,
    state: "gas",
    category: "gases",
    tempLow: -188,
    stateLow: "liquid_fluorine",
    density: 1.696,
    tick: function(pixel){
        basicHalogen(pixel)
    }
}
elements.liquid_fluorine = {
    color: ["#aed067", "#b8d87e", "#c3e194", "#cee9aa", "#daf1c0"],
    behavior: behaviors.LIQUID,
    state: "liquid",
    tempLow: -220,
    stateLow: "fluorine_ice",
    category: "states",
    tempHigh: -186,
    stateHigh: "fluorine",
    hidden: true,
    density: 1509,
    tick: function(pixel){
        basicHalogen(pixel)
    },
}
elements.fluorine_ice = {
    color: ["#b3c97c", "#b9ce8c", "#bfd39c", "#c5d8ac", "#cdddbb"],
    behavior: behaviors.WALL,
    state: "solid",
    tempHigh: -218,
    stateHigh: "liquid_fluorine",
    category: "states",
    hidden: true,
    density: 1520
}
elements.bromine = {
    color: ["#901100", "#7f1702", "#6e1a05", "#5e1b07", "#4e1b0a"],
    behavior: behaviors.LIQUID,
    state: "liquid",
    tempLow: -7,
    stateLow: "bromine_ice",
    tempHigh: 59,
    stateHigh: "bromine_gas",
    category: "liquids",
    density: 3120,
    tick: function(pixel){
        basicHalogen(pixel);
        if (pixel.isVapor){
            deletePixel(pixel.x, pixel.y)
            return;
        }
        if (pixel.temp > 16 && Math.random() < 0.01){
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coord = adjacentCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x, y)){
                    createPixel("bromine_gas", x, y)
                    pixelMap[x][y].isVapor = true
                    break;
                }
            }
        }
    }
}
elements.bromine_gas = {
    color: ["#8f0000", "#7e0205", "#6e0508", "#5d080a", "#4d0a0a"],
    behavior: behaviors.GAS,
    state: "gas",
    tempLow: 57,
    stateLow: "bromine",
    category: "states",
    hidden: true,
    density: 6,
    tick: function(pixel){
        basicHalogen(pixel)
        if (pixel.isVapor && Math.random() < 0.07){
            deletePixel(pixel.x, pixel.y)
        }
    }
}
elements.bromine_ice = {
    color: ["#8f002b", "#7e0522", "#6d091a", "#5d0a13", "#4d0a0a"],
    behavior: behaviors.WALL,
    state: "solid",
    tempHigh: -5,
    stateHigh: "bromine",
    category: "states",
    hidden: true,
    density: 3119,
    tick: function(pixel){
        basicHalogen(pixel)
        if (pixel.isVapor){
            deletePixel(pixel.x, pixel.y)
            return;
        }
    }
}
elements.iodine = {
    color: ["#323131", "#3a3737", "#423d3f", "#494347", "#504950"],
    behavior: behaviors.WALL,
    state: "solid",
    tempHigh: 114,
    stateHigh: "liquid_iodine",
    category: "solids",
    density: 4940,
    tick: function(pixel){
        basicHalogen(pixel)
    }
}
elements.liquid_iodine = {
    color: ["#7d2d84", "#71267b", "#651f71", "#591868", "#4e115f"],
    behavior: behaviors.LIQUID,
    state: "liquid",
    tempLow: 112,
    stateLow: "iodine",
    tempHigh: 184,
    stateHigh: "iodine_gas",
    category: "states",
    hidden: true,
    density: 3960,
    tick: function(pixel){
        basicHalogen(pixel)
    }
}
elements.iodine_gas = {
    color: ["#923a89", "#84337d", "#762c71", "#692666", "#5c1f5a"],
    behavior: behaviors.GAS,
    state: "gas",
    tempLow: 182,
    stateLow: "liquid_iodine",
    category: "states",
    hidden: true,
    density: 7,
    tick: function(pixel){
        basicHalogen(pixel)
    }
}
elements.astatine = {
    color: ["#303130", "#333633", "#373a37", "#3a3f3a", "#3e443e"],
    behavior: behaviors.RADSOLID,
    state: "solid",
    tempHigh: 302,
    stateHigh: "molten_astatine",
    category: "solids",
    density: 6400,
    tick: function(pixel){
        basicHalogen(pixel)
    }
}
elements.molten_astatine = {
    color: ["#cdaf42", "#d09a2c", "#d38419", "#d66b10", "#d84e13"],
    behavior: behaviors.RADMOLTEN,
    state: "liquid",
    tempHigh: 337,
    stateHigh: "astatine_gas",
    stateLow: "astatine",
    tempLow: 300,
    category: "states",
    hidden: true,
    density: 6400,
    tick: function(pixel){
        basicHalogen(pixel)
    }
}
elements.astatine_gas = {
    color: ["#cdaf42", "#d09a2c", "#d38419", "#d66b10", "#d84e13"],
    behavior: behaviors.GAS,
    state: "gas",
    tempLow: 335,
    stateLow: "molten_astatine",
    category: "states",
    hidden: true,
    density: 7,
    tick: function(pixel){
        basicHalogen(pixel)
    }
}
elements.tennessine = {
    color: ["#675151", "#5b4845", "#4f3f3b", "#433630", "#382d27"],
    behavior: behaviors.RADSOLID,
    state: "solid",
    category: "solids",
    density: 7000,
    tick: function(pixel){
        basicHalogen(pixel)
    }
}
window.addEventListener('load', function() {
    if (elements.polonium){
        elements.astatine.tick = function(pixel){
            basicHalogen(pixel)
            if (Math.random()<0.005){
                for (var i = 0; i < adjacentCoords.length; i++) {
                    var coord = adjacentCoords[i];
                    var x = pixel.x+coord[0];
                    var y = pixel.y+coord[1];
                    if (isEmpty(x, y)){
                        createPixel("positron", x, y)
                        pixelMap[x][y].temp += 270
                        break;
                    }
                }
                changePixel(pixel, "polonium", false)
                pixel.temp += 270
            }
        }
        let oldgas = elements.astatine_gas.tick
        let oldmolten = elements.molten_astatine.tick
        elements.molten_astatine.tick = function(pixel){
            oldmolten(pixel)
            if (Math.random()<0.005){
                for (var i = 0; i < adjacentCoords.length; i++) {
                    var coord = adjacentCoords[i];
                    var x = pixel.x+coord[0];
                    var y = pixel.y+coord[1];
                    if (isEmpty(x, y)){
                        createPixel("positron", x, y)
                        pixelMap[x][y].temp += 270
                        break;
                    }
                }
                changePixel(pixel, "polonium", false)
                pixel.temp += 270
            }
        }
        elements.astatine_gas.tick = function(pixel){
            oldgas(pixel)
            if (Math.random()<0.005){
                for (var i = 0; i < adjacentCoords.length; i++) {
                    var coord = adjacentCoords[i];
                    var x = pixel.x+coord[0];
                    var y = pixel.y+coord[1];
                    if (isEmpty(x, y)){
                        createPixel("positron", x, y)
                        pixelMap[x][y].temp += 270
                        break;
                    }
                }
                changePixel(pixel, "polonium", false)
                pixel.temp += 270
            }
        }
    }
    else {
        elements.astatine.tick = function(pixel){
            basicHalogen(pixel)
            if (Math.random()<0.005){
                changePixel(pixel, "positron", false)
                pixel.temp += 270
                for (var i = 0; i < adjacentCoords.length; i++) {
                    var coord = adjacentCoords[i];
                    var x = pixel.x+coord[0];
                    var y = pixel.y+coord[1];
                    if (!isEmpty(x, y, true)){
                        pixelMap[x][y].temp += 100
                    }
                }
            }
        }
        let oldgas = elements.astatine_gas.tick
        let oldmolten = elements.molten_astatine.tick
        elements.molten_astatine.tick = function(pixel){
            oldmolten(pixel)
            if (Math.random()<0.005){
                changePixel(pixel, "positron", false)
                pixel.temp += 270
                for (var i = 0; i < adjacentCoords.length; i++) {
                    var coord = adjacentCoords[i];
                    var x = pixel.x+coord[0];
                    var y = pixel.y+coord[1];
                    if (!isEmpty(x, y, true)){
                        pixelMap[x][y].temp += 100
                    }
                }
            }
        }
        elements.astatine_gas.tick = function(pixel){
            oldgas(pixel)
            if (Math.random()<0.005){
                changePixel(pixel, "positron", false)
                pixel.temp += 270
                for (var i = 0; i < adjacentCoords.length; i++) {
                    var coord = adjacentCoords[i];
                    var x = pixel.x+coord[0];
                    var y = pixel.y+coord[1];
                    if (!isEmpty(x, y, true)){
                        pixelMap[x][y].temp += 100
                    }
                }
            }
        }
    }
    if (elements.moscovium){
        elements.tennessine.tick = function(pixel){
            basicHalogen(pixel)
            if (Math.random()<0.04){
                changePixel(pixel, "moscovium", false)
                pixel.temp += 450
                for (var i = 0; i < adjacentCoords.length; i++) {
                    var coord = adjacentCoords[i];
                    var x = pixel.x+coord[0];
                    var y = pixel.y+coord[1];
                    if (isEmpty(x, y)){
                        createPixel("helium", x, y)
                        break;
                    }
                }
                for (var i = 0; i < adjacentCoords.length; i++) {
                    var coord = adjacentCoords[i];
                    var x = pixel.x+coord[0];
                    var y = pixel.y+coord[1];
                    if (!isEmpty(x, y, true)){
                        pixelMap[x][y].temp += 200
                    }
                }
            }
        }
    } else {
        elements.tennessine.tick = function(pixel){
            basicHalogen(pixel)
            if (Math.random()<0.04){
                changePixel(pixel, "helium", false)
                pixel.temp += 450
                for (var i = 0; i < adjacentCoords.length; i++) {
                    var coord = adjacentCoords[i];
                    var x = pixel.x+coord[0];
                    var y = pixel.y+coord[1];
                    if (!isEmpty(x, y, true)){
                        pixelMap[x][y].temp += 200
                    }
                }
            }
        }
    }
})