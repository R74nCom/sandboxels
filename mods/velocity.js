runAfterLoad(function(){

doVelocity = function(pixel) {
    if ((pixel.vx||pixel.vy) && elements[pixel.element].movable) {
        if (pixel.vx) {
            // move the pixel vx times
            for (var i = 0; i < Math.abs(pixel.vx); i++) {
                var x = pixel.x+Math.sign(pixel.vx);
                var y = pixel.y;
                if (!tryMove(pixel,x,y)) {
                    if (!isEmpty(x,y,true)) {
                        var newPixel = pixelMap[x][y];
                        if (elements[newPixel.element].movable) {
                            newPixel.vx = (newPixel.vx||0) + pixel.vx - Math.sign(pixel.vx);
                            if (elements[pixel.element].breakInto && Math.random()<elements[pixel.element].breakIntoChance) {
                                changePixel(pixel,elements[pixel.element].breakInto);
                            }
                        }
                    }
                    pixel.vx = 0;
                }
            }
            if (pixel.vx) { pixel.vx = Math.floor(Math.abs(pixel.vx)/1.25)*Math.sign(pixel.vx) }
        }
        if (pixel.vy) {
            // move the pixel vy times
            for (var i = 0; i < Math.abs(pixel.vy); i++) {
                var x = pixel.x;
                var y = pixel.y+Math.sign(pixel.vy);
                if (!tryMove(pixel,x,y)) {
                    if (!isEmpty(x,y,true)) {
                        var newPixel = pixelMap[x][y];
                        if (elements[newPixel.element].movable) {
                            newPixel.vy = (newPixel.vy||0) + pixel.vy - Math.sign(pixel.vy);
                            if (elements[pixel.element].breakInto && Math.random()<elements[pixel.element].breakIntoChance) {
                                changePixel(pixel,elements[pixel.element].breakInto);
                            }
                        }
                    }
                    pixel.vy = 0;
                    return;
                }
            }
            if (pixel.vy) { pixel.vy = Math.floor(Math.abs(pixel.vy)/1.25)*Math.sign(pixel.vy) }
        }
    }
}

drawPixels = function(forceTick=false) {
    // newCurrentPixels = shuffled currentPixels
    var newCurrentPixels = currentPixels.slice();
    var pixelsFirst = [];
    var pixelsLast = [];
    if (!paused || forceTick) {
        shuffleArray(newCurrentPixels);
    }
    /*{newCurrentPixels.sort(function(p) { // shuffle the pixels but keep elements[p.element].isGas last
        return 0.5 - Math.random();
    })} // shuffle the pixels if not paused*/
    for (var i = 0; i < newCurrentPixels.length; i++) {
        pixel = newCurrentPixels[i];
        //if (pixelMap[pixel.x][pixel.y] == undefined || currentPixels.indexOf(pixel) == -1) {continue}
        if (pixel.del) {continue}
        if (!paused || forceTick) {
            doVelocity(pixel);
            if (elements[pixel.element].tick) { // Run tick function if it exists
                elements[pixel.element].tick(pixel);
            }
            if (pixel.del) {continue}
            if (elements[pixel.element].behavior) { // Parse behavior if it exists
                pixelTick(pixel);
            }
        };
        if (pixel.con) { pixel = pixel.con }
        if (elements[pixel.element].isGas || elements[pixel.element].glow) {
            pixelsLast.push(pixel);
        }
        else {
            pixelsFirst.push(pixel);
        }
    }
    // Draw the current pixels
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    // Clear the canvas
    if (!settings["bg"]) {ctx.clearRect(0, 0, canvas.width, canvas.height)}
    else {
        ctx.fillStyle = settings["bg"];
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    var pixelDrawList = pixelsFirst.concat(pixelsLast);
    for (var i = 0; i < pixelDrawList.length; i++) {
        pixel = pixelDrawList[i];
        if (pixelMap[pixel.x][pixel.y] == undefined) {continue}
        if (pixel.con) { pixel = pixel.con }
        if (view===null || view===3) {
            ctx.fillStyle = pixel.color;
        }
        else if (view === 2) { // thermal view
            var temp = pixel.temp;
            if (temp < -50) {temp = -50}
            if (temp > 6000) {temp = 6000}
            // logarithmic scale, with coldest being 225 (-50 degrees) and hottest being 0 (6000 degrees)
            var hue = Math.round(225 - (Math.log(temp+50)/Math.log(6000+50))*225);
            if (hue < 0) {hue = 0}
            if (hue > 225) {hue = 225}
            ctx.fillStyle = "hsl("+hue+",100%,50%)";
        }
        else if (view === 4) { // smooth view, average of surrounding pixels
            var colorlist = [];
            // check adjacent coords on the pixelMap, add the color to the list if the pixel is not empty and the color indexOf "rgb" is not -1
            for (var j = 0; j < biCoords.length; j++) {
                var x = pixel.x + biCoords[j][0];
                var y = pixel.y + biCoords[j][1];
                if (isEmpty(x,y,true) || elements[pixelMap[x][y].element].state !== elements[pixel.element].state) {continue}
                var color = pixelMap[x][y].color;
                if (color.indexOf("rgb") !== -1) {
                    colorlist.push(color.match(/\d+/g));
                }
            }
            if (colorlist.length === 0) {
                ctx.fillStyle = pixel.color;
            }
            else {
                ctx.fillStyle = averageRGB(colorlist);
            }
        }
        if (ctx.globalAlpha < 1 && !(elements[pixel.element].isGas || elements[pixel.element].glow)) {
            ctx.globalAlpha = 1;
        }
        if ((view === null || view === 4) && (elements[pixel.element].isGas || elements[pixel.element].glow)) {
            if (ctx.globalAlpha!==0.5) { ctx.globalAlpha = 0.5; }
            ctx.fillRect((pixel.x-1)*pixelSize, (pixel.y)*pixelSize, pixelSize*3, pixelSize);
            ctx.fillRect((pixel.x)*pixelSize, (pixel.y-1)*pixelSize, pixelSize, pixelSize*3);
        }
        else { // draw the pixel (default)
            ctx.fillRect(pixel.x*pixelSize, pixel.y*pixelSize, pixelSize, pixelSize);
        }
        if (pixel.charge && view !== 2) { // Yellow glow on charge
            if (!elements[pixel.element].colorOn) {
                ctx.fillStyle = "rgba(255,255,0,0.5)";
                ctx.fillRect(pixel.x*pixelSize, pixel.y*pixelSize, pixelSize, pixelSize);
            }
        }
    }
    if (ctx.globalAlpha < 1) {
        ctx.globalAlpha = 1;
    }

    if (elements[currentElement].maxSize < mouseSize) {
        var mouseOffset = Math.trunc(elements[currentElement].maxSize/2);
    }
    else {
        var mouseOffset = Math.trunc(mouseSize/2);
    }
    var topLeft = [mousePos.x-mouseOffset,mousePos.y-mouseOffset];
    var bottomRight = [mousePos.x+mouseOffset,mousePos.y+mouseOffset];
    // Draw a square around the mouse
    ctx.strokeStyle = "white";
    ctx.strokeRect(topLeft[0]*pixelSize,topLeft[1]*pixelSize,(bottomRight[0]-topLeft[0]+1)*pixelSize,(bottomRight[1]-topLeft[1]+1)*pixelSize);
    // draw one transparent pixel in the center
    if (settings.precision) {
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fillRect(mousePos.x*pixelSize,mousePos.y*pixelSize,pixelSize,pixelSize);
    }
    if ((!paused) || forceTick) {pixelTicks++};
}


})

explodeAt = function(x,y,radius,fire="fire") {
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
                    damage = damage * ((1 - info.hardness)*10);
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
            // set the pixel.vx and pixel.vy depending on the angle and power
            if (!elements[pixel.element].excludeRandom) {
                var angle = Math.atan2(pixel.y-y,pixel.x-x);
                pixel.vx = Math.round((pixel.vx|0) + Math.cos(angle) * (radius * power/10));
                pixel.vy = Math.round((pixel.vy|0) + Math.sin(angle) * (radius * power/10));
            }
        }
    }
}