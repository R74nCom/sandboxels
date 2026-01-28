if (!settings.survival) {
    settings.survival = {
        "wall": 999,
        "dirt": 999,
        "sapling": 1,
        "seeds": 5,
        "ice": 25,
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
    if (elements[element].category === "tools") { return }
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
    if (elements[element].category === "tools") { return }
    if (settings.survival[element]) {
        settings.survival[element] -= amount;
        survivalUpdate(element);
    }
    if (settings.survival[element] <= 0) {
        delete settings.survival[element];
        var btn = document.getElementById("elementButton-"+element);
        if (btn) { btn.remove(); }
        selectElement("unknown");
    }
    if (!skipSave) {survivalSave()}
}
function survivalCount(element) {
    return settings.survival[element] || 0;
}
function survivalUpdate(element) {
    if (element === "gold_coin") {
        // if it is not an integer, round it to 0.1
        if (settings.survival.gold_coin % 1 !== 0) {
            settings.survival.gold_coin = Math.round(settings.survival.gold_coin*10)/10;
        }
        document.getElementById("coinCount").innerHTML = settings.survival.gold_coin||0;
    }
    var btn = document.getElementById("elementButton-"+element);
    if (elements[element] && elements[element].category === "tools") { return }
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
    delete elements.lookup.category;
    delete elements.pick;
    delete elements.prop;
    elements.radiation.category = "tools";
    for (var element in elements) {
        if (elements[element].category !== "tools") {
            elements[element].hidden = true;
            if (!settings.survival || Object.keys(settings.survival).length < 25) {
                elements[element].category = "inventory";
            }
        }
        if (elements[element].onShiftSelect) delete elements[element].onShiftSelect;
    }
    for (var element in settings.survival) {
        if (!elements[element]) { continue; }
        if (elements[element].category === "tools") { continue; }
        if (!elements[element].colorObject) {
            elements[element].color = "#ffffff";
            elements[element].colorObject = {"r": 255,"g": 255,"b": 255};
        }
        createElementButton(element);
        document.getElementById("elementButton-"+element).innerHTML += "("+settings.survival[element]+")";
    }
});

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
elements.cloner.ignore = elements.cloner.ignore.concat(["gold","gold_coin","molten_gold","sun","supernova","diamond"]);
elements.cloner.desc = "You can only clone one element at a time!"

elements.smash.tool = function(pixel) {
    if (elements[pixel.element].seed === true) { return }
    if (elements[pixel.element].breakInto !== undefined || (elements[pixel.element].seed !== undefined && elements[pixel.element].seed !== true)) {
        // times 0.25 if not shiftDown else 1
        if (Math.random() < (elements[pixel.element].hardness || 1) * (shiftDown ? 1 : 0.25)) {
            var breakInto = elements[pixel.element].breakInto;
            if (elements[pixel.element].seed && (!breakInto || Math.random() < 0.5)) {
                if (Math.random() < 0.2) {
                    breakInto = elements[pixel.element].seed;
                }
                else {
                    breakInto = null;
                }
            }
            // if breakInto is an array, pick one
            if (Array.isArray(breakInto)) {
                breakInto = breakInto[Math.floor(Math.random() * breakInto.length)];
            }
            if (breakInto === null) {
                deletePixel(pixel.x,pixel.y);
                return;
            }
            var oldelement = pixel.element;
            changePixel(pixel,breakInto);
            pixelTempCheck(pixel);
            if (elements[oldelement].breakIntoColor) {
                pixel.color = pixelColorPick(pixel, elements[oldelement].breakIntoColor);
            }
        }
    }
};

elementWorth = {
    "gold_coin": 1,
    "diamond": 100,
    "ketchup": 15,
    "jelly": 10,
    "soda": 10,
    "toast": 10,
    "oil": 10,
    "bread": 3,
    "glass": 5,
    "rad_glass": 6,
    "glass_shard": 2,
    "rad_shard": 3,
    "paper": 5,
    "broth": 5,
    "honey": 5,
    "caramel": 5,
    "sap": 4,
    "candy": 5,
    "popcorn": 2,
    "flour": 2,
    "lettuce": 2,
    "sauce": 2,
    "wood": 0.2,
    "tree_branch": 0.1,
    "plant": 0.1,
    "mushroom_cap": 0.1,
    "mushroom_gill": 0.3,
    "vine": 0.1,
    "cactus": 0.1,
    "cloner": 0,
    "wall": 0,
    "fire": 0,
    "smoke": 0,
    "plasma": 0,
    "light": 0,
    "laser": 0,
    "liquid_light": 0.1,
    "flash": 0,
    "radiation": 0,
    "petal": -1,
    "cell": -1,
    "cancer": -1,
    "foam": -1,
}
elements.sell = {
    color: ["#fff0b5","#ffe680","#c48821","#986a1a","#eca832","#f0bb62"],
    tool: function(pixel) {
        if (elementWorth[pixel.element] === 0) { return; }
        deletePixel(pixel.x,pixel.y);
        if (elementWorth[pixel.element] === -1) { return; }
        survivalAdd("gold_coin",elementWorth[pixel.element]||1);
    },
    toolHoverStat: function(pixel) {
        return "$"+(elementWorth[pixel.element]||1);
    },
    category: "tools",
    desc: "Exchanges pixels for their market value in Gold Coins"
}
elements.seeds.name = "seed";

/*
~Cloner
~Sell
Shop
    Cloner Reset
    ~Ammonia
    ~Dirt
    ~Water
    ~Seeds
    ~Sapling
    ~Pinecone
    ~Primordial Soup
    ~Worm
    ~Bee
    ~Human
    ~TNT
    Seller (Runs Sell tool on pixels that touch it)
    Buyer (Cloner but uses store price every time, prompt to select item on select)
Prices tab
*/
survivalShop = {
    "dirt*25": 25,
    "water*25": 250,
    "ammonia*25": 500,
    "seeds*1": 500,
    "sapling*1": 500,
    "pinecone*1": 500,
    "tnt*25": 1000,
    "worm*1": 1000,
    "bee*1": 5000,
    "primordial_soup*5": 10000,
    "human*1": 50000,
    "sun*1": 500000,
}
function survivalBuy(element) {
    var price = survivalShop[element];
    if (!price) { alert("The shop isn't selling "+element+"!"); return }
    if (!settings.survival.gold_coin || settings.survival.gold_coin < price) { alert("You can't afford that!"); return }
    survivalRemove("gold_coin",price);
    var amount = 1;
    if (element.indexOf("*") !== -1) { amount = parseInt(element.split("*")[1]); element = element.split("*")[0]; }
    survivalAdd(element,amount);
    selectElement(element);
}
function survivalResetCloner() {
    if (!settings.survival.gold_coin || settings.survival.gold_coin < 1000) { alert("You can't afford that!"); return }
    survivalRemove("gold_coin",1000);
    settings.survivalClone = null;
    survivalSave();
}

worldgentypes = {}
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
    worldgentypes = {}
    loadSave = function() {}
    showSaves = function() {}
    placeImage = function() {}
    chooseElementPrompt = function() {}
    document.getElementById("toolControls").insertAdjacentHTML("beforeend",`<button class="controlButton" title="Erases all survival.js data" onclick="if (confirm('THIS WILL ERASE ALL survival.js DATA!!! ARE YOU SURE?')) {settings.survivalClone=null; settings.survival = null; saveSettings(); location.reload()}">StartOver</button>`);
    createCategoryDiv("shop");
    var shopDiv = document.getElementById("category-shop");
    shopDiv.style.display = "none";
    shopDiv.insertAdjacentHTML("beforeend",`<p>You have $<span id="coinCount">${settings.survival.gold_coin||0}</span></p>`);
    for (var element in survivalShop) {
        var price = survivalShop[element];
        var button = document.createElement("button");
        var name = element;
        var amount = 1;
        if (element.indexOf("*") !== -1) { amount = parseInt(element.split("*")[1]); name = element.split("*")[0]; }
        var elemname = name;
        name = (elements[elemname].name||name).replace(/_/g, " ").replace(".","   ").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}).replace("   ",".").replace(/ /g, "");
        button.classList.add("elementButton");
        button.setAttribute("element",element);
        button.setAttribute("category","shop");
        button.setAttribute("title",amount+" "+name+" for $"+price);
        button.innerHTML = name+"<span style='font-family:Arial;font-size:1.15em'> ("+amount+" for $"+price+")</span>";
        if (elements[elemname]) {
            if (elements[elemname].color instanceof Array) {
                button.style.backgroundImage = "linear-gradient(to bottom right, "+elements[elemname].color.join(", ")+")";
                // choose the middlemost item in array
                var colorObject = elements[elemname].colorObject[Math.floor(elements[elemname].colorObject.length/2)];
                if (elements[elemname].darkText !== false && (elements[elemname].darkText || (colorObject.r+colorObject.g+colorObject.b)/3 > 200)) {
                    button.className += " bright"
                }
            }
            else {
                button.style.background = elements[elemname].color;
                var colorObject = elements[elemname].colorObject;
                if (elements[elemname].darkText !== false && (elements[elemname].darkText || (colorObject.r+colorObject.g+colorObject.b)/3 > 200)) {
                    button.className += " bright"
                }
            }
        }
        button.addEventListener("click",function(){
            survivalBuy(this.getAttribute("element"));
        });
        shopDiv.appendChild(button);
    }
    shopDiv.insertAdjacentHTML("beforeend",`<p><button style="background-color:#dddd00" class="elementButton bright" title="Resets the cloner" onclick="survivalResetCloner()">ResetCloner<span style='font-family:Arial;font-size:1.15em'> ($1000)</span></button></p>`);

    createCategoryDiv("prices");
    var pricesDiv = document.getElementById("category-prices");
    pricesDiv.style.display = "none";
    for (var element in elementWorth) {
        if (elementWorth[element] <= 0) { continue }
        var name = (elements[element].name||element).replace(/_/g, " ").replace(".","   ").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}).replace("   ",".");
        // create text with the name of the element and its worth, separated by •
        var text = name+"="+elementWorth[element] + " • ";
        pricesDiv.insertAdjacentHTML("beforeend",`${text}`);
    }
    pricesDiv.innerHTML = pricesDiv.innerHTML.slice(0,-2);
    pricesDiv.innerHTML = "<p style='font-family:Arial'>"+pricesDiv.innerHTML+"</p>";
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
                if (survivalCount(currentElement) < 1 && elements[currentElement].category !== "tools") {
                    return;
                }
                createPixel(currentElement,x,y);
                if (pixelMap[x][y] && currentElement === pixelMap[x][y].element && (elements[currentElement].customColor || elements[currentElement].singleColor)) {
                    pixelMap[x][y].color = pixelColorPick(pixelMap[x][y],currentColorMap[currentElement]);
                }
                if (elements[currentElement].category !== "tools") { survivalRemove(currentElement,1); }
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