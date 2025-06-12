airResistance = 0.1;
terminalVelocity = 5;
gravityPull = 0.2;

validateMoves((pixel,nx,ny) => {
    if (elements[pixel.element].isGas) return true;
    if (isEmpty(pixel.x,pixel.y+1) && pixel.y-ny < 0) { //goes down usually
        pixel.vy = (pixel.vy||0) + gravityPull;
    }
    return true;
})

runPerPixel((pixel) => {

    let vx = pixel.vx;
    let vy = pixel.vy;
    if (vx === undefined ) vx = 0;
    else if (Math.abs(vx) > terminalVelocity) vx = (vx + terminalVelocity) / 2;
    if (vy === undefined ) vy = 0;
    else if (Math.abs(vy) > terminalVelocity) vy = (vy + terminalVelocity) / 2;

    if (vx !== 0 || vy !== 0) {

        if (!elements[pixel.element].movable) {
            pixel.vx = 0;
            pixel.vy = 0;
            return;
        };

        // Calculate change in position; Random chance for in-between decimal values
        const changeX = Math.trunc(vx) +
                      (Math.random() < (vx % 1) ? Math.sign(vx) : 0);
        const changeY = Math.trunc(vy) +
                      (Math.random() < (vy % 1) ? Math.sign(vy) : 0);

        const loopFor = Math.max(Math.abs(changeX),Math.abs(changeY));
        // console.log(Math.trunc(vy));

        // let hit = false;
        for (let i = 0; i < loopFor; i++) {
            const newX = pixel.x + (changeX ? Math.sign(changeX) : 0);
            const newY = pixel.y + (changeY ? Math.sign(changeY) : 0);

            if (!tryMove(pixel,newX,newY)) {
                if (!isEmpty(newX,newY,true)) {
                    const newPixel = pixelMap[newX][newY];
                    newPixel.vx = (newPixel.vx||0) + vx*0.6;
                    newPixel.vy = (newPixel.vy||0) + vy*0.6;
                }
                vx = vx*0.4;
                vy = vy*0.4;
            };
        }

        // const newX = pixel.x + changeX;
        // const newY = pixel.y + changeY;

        const multiplier = (1-airResistance);
        pixel.vx = vx * multiplier;
        pixel.vy = vy * multiplier;

        // Cut off very low decimal values
        if (Math.abs(pixel.vx) < 0.01) pixel.vx = 0;
        if (Math.abs(pixel.vy) < 0.01) pixel.vy = 0;

    }

})

elements.push_up = {
    color: "#ffffff",
    tool: function(pixel) {
        pixel.vx = (Math.random() * 2) * (Math.random() < 0.5 ? 1 : -1);
        pixel.vy = (Math.random() * 2) * -1;
    },
    category: "special"
}

elements.repeller = {
    color: "#ffffff",
    tick: function(pixel) {
        var coords = circleCoords(pixel.x,pixel.y,5);
        for (var i = 0; i < coords.length; i++) {
            var coord = coords[i];
            if (!isEmpty(coord.x,coord.y,true)) {
                if (!elements[pixelMap[coord.x][coord.y].element].movable) continue;
                pixelMap[coord.x][coord.y].vx = (pixelMap[coord.x][coord.y].vx||0) + (Math.random() < 0.5 ? 1 : -1);
                pixelMap[coord.x][coord.y].vy = (pixelMap[coord.x][coord.y].vy||0) -1;
            }
        }
    },
    movable: false,
    category: "machines",
    emit: true
}

viewInfo["4"] = { // Velocity View
    name: "velocity",
    pixel: function(pixel,ctx) {
        const thermalMin = -5;
        const thermalMax = 5;

        var temp = pixel.vx || 0;
        var hue = Math.round((temp - thermalMin) / (thermalMax - thermalMin) * 255);
        if (hue < 0) {hue = 0}
        if (hue > 225) {hue = 225}
        drawSquare(ctx,"hsl("+hue+",100%,50%)",pixel.x,pixel.y)
    }
}


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
        var distance = (Math.floor(Math.sqrt(Math.pow(coords[i].x-x,2) + Math.pow(coords[i].y-y,2)))) / radius;
        const dirX = coords[i].x > x ? 1 : -1;
        const dirY = coords[i].y > y ? 1 : -1;
        var damage = Math.random() + distance;
        // invert
        damage = 1 - damage;
        if (damage < 0) { damage = 0; }
        damage *= power;
        if (isEmpty(coords[i].x,coords[i].y)) {
            // create smoke or fire depending on the damage if empty
            if (damage < 0.02) { } // do nothing
            else if (damage < 0.2) {
                createPixel("smoke",coords[i].x,coords[i].y);
                pixelMap[coords[i].x][coords[i].y].vy = power * (1-distance) * -1;
                pixelMap[coords[i].x][coords[i].y].vx = power * (1-distance) * dirX;
            }
            else {
                // if fire is an array, choose a random item
                if (Array.isArray(fire)) {
                    createPixel(fire[Math.floor(Math.random() * fire.length)],coords[i].x,coords[i].y);
                }
                else {
                    createPixel(fire,coords[i].x,coords[i].y);
                }
                pixelMap[coords[i].x][coords[i].y].vy = 2*power * -1;
                pixelMap[coords[i].x][coords[i].y].vx = 2*power * dirX;
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
            pixel.vy = 3 * (1-distance) * -1;
            pixel.vx = 3 * (1-distance) * dirX;
            if (damage > 0.9) {
                if (Array.isArray(fire)) {
                    var newfire = fire[Math.floor(Math.random() * fire.length)];
                }
                else {
                    var newfire = fire;
                }
                changePixel(pixel,newfire);
                // pixel.vy = 10 * damage * (Math.random() < 0.5 ? 1 : -1);
                // pixel.vx = 10 * damage * (Math.random() < 0.5 ? 1 : -1);
                continue;
            }
            else if (damage > 0.25) {
                if (isBreakable(pixel)) {
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
                    // pixel.vy = 10 * damage * (Math.random() < 0.5 ? 1 : -1);
                    // pixel.vx = 10 * damage * (Math.random() < 0.5 ? 1 : -1);
                    continue;
                }
            }
            if (damage > 0.75 && info.burn) {
                pixel.burning = true;
                pixel.burnStart = pixelTicks;
            }
            pixel.temp += damage*radius*power;
            pixel.vy = 3 * (1-distance) * -1;
            pixel.vx = 3 * (1-distance) * dirX;
            // console.log(pixel.vy);
            pixelTempCheck(pixel);
        }
    }
}