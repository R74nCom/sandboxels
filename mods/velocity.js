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

runPerPixel(doVelocity);


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
            // set the pixel.vx and pixel.vy depending on the angle and power
            if (!elements[pixel.element].excludeRandom) {
                var angle = Math.atan2(pixel.y-y,pixel.x-x);
                pixel.vx = Math.round((pixel.vx|0) + Math.cos(angle) * (radius * power/10));
                pixel.vy = Math.round((pixel.vy|0) + Math.sin(angle) * (radius * power/10));
            }
        }
    }
}