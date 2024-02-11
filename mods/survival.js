if (!settings.survival) {
    settings.survival = {
        "wall": 999,
        "dirt": 999,
        "sapling": 1,
        "seeds": 5,
        "water": 25,
        "cloner": 1,
    }
}
settings.survival.cloner = 1;
settings.unhide = 0;
// settings.survivalClone=null; settings.survival = null; saveSettings();

survivalTimeout = null;
function survivalSave() {
    if (survivalTimeout) { clearTimeout(survivalTimeout); }
    survivalTimeout = setTimeout(function(){
        saveSettings();
    },1000);
}
function survivalAdd(element,amount,skipSave) {
    if (settings.survival[element]) {
        settings.survival[element] += amount;
    }
    else {
        settings.survival[element] = amount;
    }
    survivalUpdate(element);
    if (!skipSave) {survivalSave()}
}
function survivalRemove(element,amount,skipSave) {
    if (settings.survival[element]) {
        settings.survival[element] -= amount;
        survivalUpdate(element);
    }
    if (settings.survival[element] <= 0) {
        delete settings.survival[element];
        var btn = document.getElementById("elementButton-"+element);
        if (btn) { btn.remove(); }
    }
    if (!skipSave) {survivalSave()}
}
function survivalCount(element) {
    return settings.survival[element] || 0;
}
function survivalUpdate(element) {
    var btn = document.getElementById("elementButton-"+element);
    if (btn) {
        btn.innerHTML = btn.innerHTML.split("(")[0]+"("+settings.survival[element]+")";
    }
    else if (elements[element]) {
        createElementButton(element);
        document.getElementById("elementButton-"+element).innerHTML += "("+settings.survival[element]+")";
    }
}

runAfterAutogen(function(){
    elements.erase.name = "pick_up";
    delete elements.paint.category;
    delete elements.pick;
    for (var element in elements) {
        if (elements[element].category !== "tools") {
            elements[element].hidden = true;
            elements[element].category = "survival";
        }
    }
    for (var element in settings.survival) {
        if (!elements[element]) { continue; }
        createElementButton(element);
        document.getElementById("elementButton-"+element).innerHTML += "("+settings.survival[element]+")";
    }
});

/*
Cloner
Sell
*/

delete elements.cloner.behavior;
elements.cloner.tick = function(pixel) {
    if (settings.survivalClone) {
        if (Math.random() < 0.025) {
            // 1 or -1
            var x = pixel.x + (Math.random() < 0.5 ? 1 : -1);
            var y = pixel.y + (Math.random() < 0.5 ? 1 : -1);
            if (isEmpty(x,y)) {
                createPixel(settings.survivalClone,x,y);
            }
        }
    }
    else {
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coords = adjacentCoords[i];
            var x = pixel.x + coords[0];
            var y = pixel.y + coords[1];
            if (!isEmpty(x,y,true)) {
                if (pixelMap[x][y].clone) { pixel.clone = pixelMap[x][y].clone; break }
                var element = pixelMap[x][y].element;
                if (element === pixel.element || elements[pixel.element].ignore.indexOf(element) !== -1) { continue }
                settings.survivalClone = element;
                survivalSave();
                break;
            }
        }
    }
};

elementWorth = {
    "gold_coin": 1,
    "diamond": 100,
    "sap": 5,
    "cloner": 0,
    "wall": 0,
}
elements.sell = {
    color: ["#fff0b5","#ffe680","#c48821","#986a1a","#eca832","#f0bb62"],
    tool: function(pixel) {
        if (elementWorth[pixel.element] === 0) { return; }
        deletePixel(pixel.x,pixel.y);
        survivalAdd("gold_coin",elementWorth[pixel.element]||1);
    },
    category: "tools",
}

window.addEventListener("load",function(){
    // move to start of tools
    var erase = document.getElementById("elementButton-erase");
    var sell = document.getElementById("elementButton-sell");
    var parent = erase.parentElement;
    parent.removeChild(sell);
    parent.insertBefore(sell,parent.firstChild);
    parent.removeChild(erase);
    parent.insertBefore(erase,parent.firstChild);
    document.getElementById("replaceButton").remove();
    document.getElementById("savesButton").remove();
    document.getElementById("elemSelectButton").remove();
    doRandomEvents = function() {}
    worldGen = function() {}
    loadSave = function() {}
    showSaves = function() {}
    placeImage = function() {}
    chooseElementPrompt = function() {}
    document.getElementById("toolControls").insertAdjacentHTML("beforeend",`<button class="controlButton" title="Erases all survival.js data" onclick="if (confirm('THIS WILL ERASE ALL survival.js DATA!!! ARE YOU SURE?')) {settings.survivalClone=null; settings.survival = null; saveSettings(); location.reload()}">StartOver</button>`);
});
runAfterLoad(function(){
    checkUnlock = function(element) {
        return;
    }
    oldClearAll = clearAll;
    clearAll = function() {
        if (currentPixels && currentPixels.length > 0) {
            for (var i = 0; i < currentPixels.length; i++) {
                var pixel = currentPixels[i];
                if (pixel && pixel.element) {
                    survivalAdd(pixel.element,1);
                }
            }
        }
        oldClearAll();
    }
    mouseAction = function(e,mouseX,mouseY,startPos) {
        if (mouseType == "left") {
            mouse1Action(e,mouseX,mouseY,startPos);
        }
        else if (mouseType == "right") { mouse2Action(e,mouseX,mouseY,startPos); }
        else if (mouseType == "middle") { mouseMiddleAction(e,mouseX,mouseY); }
    }
    mouse1Action = function(e,mouseX=undefined,mouseY=undefined,startPos) {
        if (currentElement === "erase") { mouse2Action(e,mouseX,mouseY); return; }
        else if (currentElement === "pick") { mouseMiddleAction(e,mouseX,mouseY); return; }
        // If x and y are undefined, get the mouse position
        if (mouseX == undefined && mouseY == undefined) {
            // var canvas = document.getElementById("game");
            // var ctx = canvas.getContext("2d");
            lastPos = mousePos;
            mousePos = getMousePos(canvas, e);
            var mouseX = mousePos.x;
            var mouseY = mousePos.y;
        }
        var cooldowned = false;
        if ((mouseSize===1 || elements[currentElement].maxSize===1) && elements[currentElement].cooldown) {
            if (pixelTicks-lastPlace < elements[currentElement].cooldown) {
                return;
            }
            cooldowned = true;
        }
        lastPlace = pixelTicks;
        startPos = startPos || lastPos
        if (!(isMobile || (cooldowned && startPos.x===lastPos.x && startPos.y===lastPos.y) || elements[currentElement].tool || elements[currentElement].category==="tools")) {
            var coords = lineCoords(startPos.x,startPos.y,mouseX,mouseY);
        }
        else { var coords = mouseRange(mouseX,mouseY); }
        var element = elements[currentElement];
        var mixList = [];
        // For each x,y in coords
        for (var i = 0; i < coords.length; i++) {
            var x = coords[i][0];
            var y = coords[i][1];

            if (currentElement === "mix") {
                if (!isEmpty(x,y,true)) {
                    var pixel = pixelMap[x][y];
                    if (!(elements[pixel.element].movable !== true || elements[pixel.element].noMix === true) || shiftDown) {
                        mixList.push(pixel);
                    }
                }
            }
            else if (currentElement === "shock") {
                if (!isEmpty(x,y,true)) {
                    // One loop that repeats 5 times if shiftDown else 1 time
                    for (var j = 0; j < (shiftDown ? 5 : 1); j++) {
                        var pixel = pixelMap[x][y];
                        var con = elements[pixel.element].conduct;
                        if (con == undefined) {continue}
                        if (Math.random() < con) { // If random number is less than conductivity
                            if (!pixel.charge && !pixel.chargeCD) {
                                pixel.charge = 1;
                                if (elements[pixel.element].colorOn) {
                                    pixel.color = pixelColorPick(pixel);
                                }
                            }
                        }
                        else if (elements[pixel.element].insulate != true) { // Otherwise heat the pixel (Resistance simulation)
                            pixel.temp += 0.25;
                            pixelTempCheck(pixel);
                        }
                    }
                }
            }
            else if (elements[currentElement].tool && !(elements[currentElement].canPlace && isEmpty(x,y))) {
                // run the tool function on the pixel
                if (!isEmpty(x,y,true)) {
                    var pixel = pixelMap[x][y];
                    // if the current element has an ignore property and the pixel's element is in the ignore property, don't do anything
                    if (elements[currentElement].ignore && elements[currentElement].ignore.indexOf(pixel.element) != -1) {
                        continue;
                    }
                    elements[currentElement].tool(pixel);
                }
            }
            else if (isEmpty(x, y)) {
                if (survivalCount(currentElement) < 1) {
                    return;
                }
                survivalRemove(currentElement,1);
                currentPixels.push(new Pixel(x, y, currentElement));
                if (elements[currentElement].customColor || elements[currentElement].singleColor) {
                    pixelMap[x][y].color = pixelColorPick(currentElement,currentColor);
                }
                if (currentElementProp) {
                    for (var key in currentElementProp) {
                        pixelMap[x][y][key] = currentElementProp[key]
                    }
                }
            }
        }
        if (currentElement == "mix") {
            for (var i = 0; i < mixList.length; i++) {
                var pixel1 = mixList[Math.floor(Math.random()*mixList.length)];
                var pixel2 = mixList[Math.floor(Math.random()*mixList.length)];
                swapPixels(pixel1,pixel2);
                mixList.splice(mixList.indexOf(pixel1),1);
                mixList.splice(mixList.indexOf(pixel2),1);
                if (elements[pixel1.element].onMix) {
                    elements[pixel1.element].onMix(pixel1,pixel2);
                }
                if (elements[pixel2.element].onMix) {
                    elements[pixel2.element].onMix(pixel2,pixel1);
                }
            }

        }
    }
    mouse2Action = function(e,mouseX=undefined,mouseY=undefined,startPos) {
        // Erase pixel at mouse position
        if (mouseX == undefined && mouseY == undefined) {
            // var canvas = document.getElementById("game");
            // var ctx = canvas.getContext("2d");
            lastPos = mousePos;
            mousePos = getMousePos(canvas, e);
            var mouseX = mousePos.x;
            var mouseY = mousePos.y;
        }
        if (dragStart) {
            dragStart = 0;
            for (var i = 0; i < draggingPixels.length; i++) {
                var pixel = draggingPixels[i];
                delete pixel.drag;
            }
            draggingPixels = null;
        }
        // If the current element is "pick" or "lookup", coords = [mouseX,mouseY]
        if (currentElement == "pick" || currentElement == "lookup") {
            var coords = [[mouseX,mouseY]];
        }
        else if (!isMobile) {
            startPos = startPos || lastPos
            var coords = lineCoords(startPos.x,startPos.y,mouseX,mouseY);
        }
        else {
            var coords = mouseRange(mouseX,mouseY);
        }
        // For each x,y in coords
        for (var i = 0; i < coords.length; i++) {
            var x = coords[i][0];
            var y = coords[i][1];

            if (!isEmpty(x, y)) {
                if (outOfBounds(x,y)) {
                    continue
                }
                var pixel = pixelMap[x][y];
                survivalAdd(pixel.element,1);
                delete pixelMap[x][y];
                // Remove pixel from currentPixels
                for (var j = 0; j < currentPixels.length; j++) {
                    if (currentPixels[j].x == x && currentPixels[j].y == y) {
                        currentPixels.splice(j, 1);
                        break;
                    }
                }
            }
        }
    }
})

window.addEventListener("beforeunload",function(){
    clearAll();
    saveSettings();
});