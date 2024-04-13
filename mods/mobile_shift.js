mobileshift = null;
mobileShiftButton = document.createElement("button");
mobileShiftButton.onclick = function() {
    if (mobileshift == "shift") {
        mobileshift = null;this.setAttribute("on","false");
        onShiftDown(1); 
    } else {
        mobileshift = "shift";
        this.setAttribute("on","true");
        onShiftDown(0); 
    };
    focusGame();
    on="false"
};
mobileShiftButton.textContent = "Shift";
window.addEventListener("load",function(){
   document.getElementById("toolControls").appendChild(mobileShiftButton); 
});

elements.heat.tool = function(pixel) {
    if (mobileshift == "shift" || shiftDown) {pixel.temp += elements.heat.temp+(Math.random()*elements.heat.temp*1.5)*20;}
    else {pixel.temp += elements.heat.temp+(Math.random()*elements.heat.temp*1.5);}
    pixelTempCheck(pixel);
}
elements.cool.tool = function(pixel) {
    if (shiftDown) {pixel.temp += elements.cool.temp+(Math.random()*elements.cool.temp*1.5)*20;}
    else {pixel.temp += elements.cool.temp+(Math.random()*elements.cool.temp*1.5);}
    pixelTempCheck(pixel);
}
elements.drag.tool = function(pixel) {
    if (!dragStart) {
        dragStart = pixelTicks;
        draggingPixels = [];
    }
    if (pixelTicks === dragStart && !pixel.drag && (elements[pixel.element].movable || shiftDown || mobileshift == "shift")) {
        pixel.drag = true;
        draggingPixels.push(pixel);
    }
}
elements.paint.tool = function(pixel) {
    if (!shiftDown && mobileshift != "shift") {
        pixel.color = pixelColorPick(pixel,currentColor)
    }
    else {
        // convert the hex of currentColor to rgb and set it as a string
        var rgb = currentColor.replace("#","").match(/.{1,2}/g);
        for (var i = 0; i < rgb.length; i++) {
            rgb[i] = parseInt(rgb[i],16);
        }
        pixel.color = "rgb(" + rgb.join(",") + ")"
    }
    delete pixel.origColor;
}
elements.milk.onMix = function(milk1, milk2) {
    if (shiftDown && Math.random() < 0.01 || mobileshift == "shift" && Math.random() < 0.01) {
        changePixel(milk1,"butter")
    }
}
elements.cream.onMix = function(milk1, milk2) {
    if ((shiftDown && Math.random() < 0.01 || mobileshift == "shift" && Math.random() < 0.01) || (elements[milk2.element].id === elements.milk.id && Math.random() < 0.00025)) {
        changePixel(milk1,"butter")
    }
}
elements.batter.onMix = function(batter,ingredient) {
    if (elements[ingredient.element].isFood && elements[ingredient.element].id !== elements.batter.id && elements[ingredient.element].id !== elements.flour.id && elements[ingredient.element].id !== elements.yolk.id && elements[ingredient.element].id !== elements.dough.id && elements[ingredient.element].id !== elements.baked_batter.id) {
        var rgb1 = batter.color.match(/\d+/g);
        var rgb2 = ingredient.color.match(/\d+/g);
        // average the colors
        var rgb = [
            Math.round((parseInt(rgb1[0])*10+parseInt(rgb2[0]))/11),
            Math.round((parseInt(rgb1[1])*10+parseInt(rgb2[1]))/11),
            Math.round((parseInt(rgb1[2])*10+parseInt(rgb2[2]))/11)
        ];
        // convert rgb to hex
        var hex = RGBToHex(rgb);
        batter.color = pixelColorPick(batter, hex);
        if ((elements[ingredient.element].density > elements.batter.density || shiftDown || mobileshift == "shift") && Math.random() < 0.05) {
            // 50% change to delete ingredient
            if (Math.random() < 0.5) { deletePixel(ingredient.x, ingredient.y); }
            else {
                ingredient.color = pixelColorPick(ingredient, hex);
            }
        }
    }
}
elements.cook.tool = function(pixel) {
    if (!shiftDown && mobileshift != "shift") {
        pixel.temp += 0.5;
        pixelTempCheck(pixel);
    }
    else {
        pixel.temp += 1;
        pixelTempCheck(pixel);
    }
}
elements.debug.tool = function(pixel) {
    mouseIsDown = false;
    shiftDown = false;
    mobileshift = null;
    var output = pixel.element.toUpperCase()+" at x"+pixel.x+", y"+pixel.y+", tick"+pixelTicks+"\n";
    for (var i in pixel) {
        if (i !== "x" && i !== "y" && i !== "element") {
            output += "  " + i + ": " + pixel[i] + "\n";
        }
    }
    console.log(output);
    console.log(JSON.stringify(pixel));
    alert(output);
    lastDebug = pixelTicks;
}
function mouseClick(e) {
    if (showingMenu && currentElement != "lookup") {
        closeMenu();
        return false;
    }
    mouseIsDown = true;
    lastPlace = -100;
    if (e.button === 0) {
        mouseType = "left";
    }
    else if (e.button === 2) {
        mouseType = "right";
    }
    else if (e.button === 1) {
        mouseType = "middle";
    }
    else {
        mouseType = "left";
    }
    if ((e.button === 0 || e.touches) && placingImage) {
        if (e.touches) { mouseMove(e); }
        placeImage();
        return false;
    }
    else if (mobileshift == "shift"  && e.button !== 1 && !((elements[currentElement].tool || elements[currentElement].category==="tools") && mouseType==="left")|| shiftDown && e.button !== 1 && !((elements[currentElement].tool || elements[currentElement].category==="tools") && mouseType==="left")) {
        shaping = 1;
        shapeStart = mousePos;
    }
    if (elements[currentElement].singleColor) {
        // choose random item from .color
        if (Array.isArray(elements[currentElement].color)) {
            currentColor = elements[currentElement].color[Math.floor(Math.random() * elements[currentElement].color.length)];
        }
        else { currentColor = elements[currentElement].color;}
        // convert from rgb(r,g,b) to #rrggbb
        // RGBToHex takes an array of integers
        if (currentColor.indexOf("rgb") !== -1) {
            var rgb = currentColor.match(/\d+/g);
            currentColor = RGBToHex([parseInt(rgb[0]),parseInt(rgb[1]),parseInt(rgb[2])]);
        }
    }
    mouseMove(e);
    return false;
}
function placeImage(placementX,placementY,scale) {
    if (!scale) { scale = mouseSize }
    // downscale the <img to mouseSize x mouseSize and draw it
    var canvas = document.createElement("canvas");
    // set width or height proportional to mouseSize
    if (placingImage.width > placingImage.height) {
        canvas.width = mouseSize;
        canvas.height = Math.round(placingImage.height/placingImage.width*mouseSize);
    }
    else {
        canvas.height = mouseSize;
        canvas.width = Math.round(placingImage.width/placingImage.height*mouseSize);
    }
    var newWidth = canvas.width;
    var newHeight = canvas.height;
    var ctx = canvas.getContext("2d");
    if (settings.imagesmooth === 0) {
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
    }
    ctx.drawImage(placingImage,0,0,newWidth,newHeight);
    var newImage = ctx.getImageData(0,0,newWidth,newHeight);
    var elem = (settings.imageelem || "wood");
    if (!elements[elem] || elements[elem].tool || elements[elem].canPlace===false) { elem = "wood";}
    // loop through each pixel in the ImageData
    for (var x = 0; x < newWidth; x++) {
        for (var y = 0; y < newHeight; y++) {
            var i = (y*newWidth+x)*4;
            var r = newImage.data[i];
            var g = newImage.data[i+1];
            var b = newImage.data[i+2];
            var a = newImage.data[i+3];
            if (a > 0.33) {
                // mousePos is the center of the image
                var pixelX = (placementX||mousePos.x) - Math.round(newWidth/2) + x+1;
                var pixelY = (placementY||mousePos.y) - Math.round(newHeight/2) + y+1;
                if (isEmpty(pixelX,pixelY)) {
                    createPixel(elem,pixelX,pixelY);
                    pixelMap[pixelX][pixelY].color = pixelColorPick(pixelMap[pixelX][pixelY], RGBToHex([r,g,b]));
                }
                else if (!outOfBounds(pixelX,pixelY) && (mobileshift == "shift" || shiftDown || mode === "replace")) {
                    changePixel(pixelMap[pixelX][pixelY],elem);
                    pixelMap[pixelX][pixelY].color = pixelColorPick(pixelMap[pixelX][pixelY], RGBToHex([r,g,b]));
                }
            }
        }
    }
}
function mouse1Action(e,mouseX=undefined,mouseY=undefined,startPos) {
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
                if (!(elements[pixel.element].movable !== true || elements[pixel.element].noMix === true) || shiftDown || mobileshift == "shift") {
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
        else if (currentElement === "random" && isEmpty(x, y)) {
            // create pixel with random element from "randomChoices" array
            currentPixels.push(new Pixel(x, y, randomChoices[Math.floor(Math.random() * randomChoices.length)]));
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
        else if (mode === "replace") {
            if (outOfBounds(x,y)) {
                continue;
            }
            // Remove pixel at position from currentPixels
            var index = currentPixels.indexOf(pixelMap[x][y]);
            if (index > -1) {
                currentPixels.splice(index, 1);
            }
            if (currentElement == "random") {
                currentPixels.push(new Pixel(x, y, randomChoices[Math.floor(Math.random() * randomChoices.length)]));
            }
            else {
                currentPixels.push(new Pixel(x, y, currentElement));
            }
            if (elements[currentElement].customColor || elements[currentElement].singleColor) {
                pixelMap[x][y].color = pixelColorPick(currentElement,currentColor);
            }
            if (currentElementProp) {
                for (var key in currentElementProp) {
                    pixelMap[x][y][key] = currentElementProp[key]
                }
            }
        }
        else if (isEmpty(x, y)) {
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
        // 1. repeat for each pixel in mixList
        // 2. choose 2 random pixels and swap their x and y
        // 3. remove pixel from mixList
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
