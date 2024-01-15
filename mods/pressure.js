runAfterLoad(function(){
tryMove = function(pixel,nx,ny,leaveBehind,force) {
    if (pixel.drag && !force) { return true; }
    var info = elements[pixel.element];
    var oob = outOfBounds(nx,ny);
    if (isEmpty(nx,ny,false,oob)) { // If coords is empty, move to coords
        movePixel(pixel,nx,ny,leaveBehind);
        return true;
    }
    else if (!oob) {
        // Reactions
        newPixel = pixelMap[nx][ny];
        if (info.density !== undefined) {
            newPixel.pressure = info.density/5000 + (pixel.pressure ? pixel.pressure : 0);
        }
        var rr1 = false;
        if (info.reactions !== undefined && info.reactions[newPixel.element] !== undefined) {
            rr1 = reactPixels(pixel,newPixel)
            if (rr1) {
                return true;
            }
        }
        if (!rr1 && elements[newPixel.element].reactions !== undefined && elements[newPixel.element].reactions[pixel.element] !== undefined && !elements[newPixel.element].reactions[pixel.element].oneway) {
            if (reactPixels(newPixel,pixel)) {
                return true;
            }
        }
        // Density
        if (elements[pixel.element].id !== elements[newPixel.element].id) {
            if (info.density !== undefined && elements[newPixel.element].density !== undefined) {
                // if the pixel's state + ">" + newPixel's state is in validDensitySwaps, and the pixel's density is larger than the newPixel's density, swap the pixels
                if (validDensitySwaps[info.state][elements[newPixel.element].state] && info.density >= elements[newPixel.element].density) {
                    // chance depending on the difference in density
                    if (Math.random() < (info.density - elements[newPixel.element].density)/(info.density + elements[newPixel.element].density)) {
                        swapPixels(pixel,newPixel);
                        return true;
                    }
                }
            }
        }
        // else { // same-element density swapping
        //     if (info.density !== undefined) {
        //         if (validDensitySwaps[info.state][info.state]) {
        //             if (Math.random() < 0.01) {
        //                 swapPixels(pixel,newPixel);
        //                 return true;
        //             }
        //         }
        //     }
        // }
    }
    return false;
}
doVelocity = function(pixel) {
    if ((pixel.vx||pixel.vy) && elements[pixel.element].movable) {
        if (pixel.vx) {
            // move the pixel vx times
            for (var i = 0; i < Math.floor(Math.abs(pixel.vx)); i++) {
                var x = pixel.x+Math.sign(pixel.vx);
                var y = pixel.y;
                if (!tryMove(pixel,x,y)) {
//                    if (!isEmpty(x,y,true)) {
//                        var newPixel = pixelMap[x][y];
//                        if (elements[newPixel.element].movable) {
//                            newPixel.vx = (newPixel.vx||0) + pixel.vx - Math.sign(pixel.vx);
//                            if (elements[pixel.element].breakInto && Math.random()<elements[pixel.element].breakIntoChance) {
//                                changePixel(pixel,elements[pixel.element].breakInto);
//                            }
//                        }
//                    }
                    pixel.vx = -pixel.vx/2;
                    return;
                }
                else
                {
                    pixel.pressure = 0;
                }
                if(pixel.del)
                {
                    return;
                }
            }
            if (pixel.vx) { pixel.vx = Math.abs(pixel.vx)/1.25*Math.sign(pixel.vx) }
        }
        if (pixel.vy) {
            // move the pixel vy times
            for (var i = 0; i < Math.floor(Math.abs(pixel.vy)); i++) {
                var x = pixel.x;
                var y = pixel.y+Math.sign(pixel.vy);
                if (!tryMove(pixel,x,y)) {
//                    if (!isEmpty(x,y,true)) {
//                        var newPixel = pixelMap[x][y];
//                        if (elements[newPixel.element].movable) {
//                            newPixel.vy = (newPixel.vy||0) + pixel.vy - Math.sign(pixel.vy);
//                            if (elements[pixel.element].breakInto && Math.random()<elements[pixel.element].breakIntoChance) {
//                                changePixel(pixel,elements[pixel.element].breakInto);
//                            }
//                        }
//                    }
                    pixel.vy = -pixel.vy/2;
                    return;
                }
                else
                {
                    pixel.pressure = 0;
                }
                if(pixel.del)
                {
                    return;
                }
            }
            if (pixel.vy) { pixel.vy = Math.abs(pixel.vy)/1.25*Math.sign(pixel.vy) }
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
            pixel.prevX = pixel.x;
            pixel.prevY = pixel.y;
            if (pixel.del) {continue}
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
    for (var i = 0; i < newCurrentPixels.length; i++) {
        pixel = newCurrentPixels[i];
        let density = elements[pixel.element].density ? elements[pixel.element].density : 1;
        let accelx = (pixel.x - pixel.prevX)/2 * (1+(pixel.pressure ? pixel.pressure : 0)/density);
        let accely = (pixel.y - pixel.prevY)/2 * (1+(pixel.pressure ? pixel.pressure : 0)/density);
        if(!pixel.vx)
            pixel.vx = accelx;
        else
            pixel.vx += accelx;
        if(!pixel.vy)
            pixel.vy = accely;
        else
            pixel.vy += accely;
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
                pixel.vx = Math.round((pixel.vx|0) + Math.cos(angle) * (radius * power));
                pixel.vy = Math.round((pixel.vy|0) + Math.sin(angle) * (radius * power));
            }
        }
    }
}