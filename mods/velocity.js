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
                        }
                    }
                    pixel.vx = 0;
                }
            }
            if (pixel.vx) { pixel.vx -= Math.sign(pixel.vx); }
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
                        }
                    }
                    pixel.vy = 0;
                    return;
                }
            }
            if (pixel.vy) { pixel.vy -= Math.sign(pixel.vy); }
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
            // VELOCITY
            doVelocity(pixel);
            if (elements[pixel.element].tick) { // Run tick function if it exists
                elements[pixel.element].tick(pixel);
            }
            if (pixel.del) {continue}
            if (elements[pixel.element].behavior) { // Parse behavior if it exists
                pixelTick(pixel);
            }
        };
        if (elements[pixel.element].isGas) {
            pixelsLast.push(pixel);
        }
        else {
            pixelsFirst.push(pixel);
        }
    }
    adjacentCoords = [
        [0,1],
        [0,-1],
        [1,0],
        [-1,0]
    ];
    biCoords = [
        [0,1],
        [1,0]
    ];
    // Draw the current pixels
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    var pixelDrawList = pixelsFirst.concat(pixelsLast);
    for (var i = 0; i < pixelDrawList.length; i++) {
        pixel = pixelDrawList[i];
        if (pixelMap[pixel.x][pixel.y] == undefined) {continue}
        if (view===null || view===3) {
            ctx.fillStyle = pixel.color;
        }
        else if (view === 2) { // thermal view
            // set the color to pixel.temp, from hottest at 0 hue to coldest 225 hue, with the minimum being -273, max being 6000
            var temp = pixel.temp;
            if (temp < -273) {temp = -273}
            if (temp > 6000) {temp = 6000}
            var hue = 225 - (temp/6000)*225;
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
        if ((view === null || view === 4) && elements[pixel.element].state === "gas") {
            ctx.globalAlpha = 0.5;
            ctx.fillRect((pixel.x-1)*pixelSize, (pixel.y)*pixelSize, pixelSize*3, pixelSize);
            ctx.fillRect((pixel.x)*pixelSize, (pixel.y-1)*pixelSize, pixelSize, pixelSize*3);
            ctx.globalAlpha = 1;
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
    if ((!paused) || forceTick) {pixelTicks++};
}


})