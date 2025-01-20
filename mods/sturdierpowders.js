tryMove = function(pixel,nx,ny,leaveBehind,force) {
    if (pixel.drag && !force) { return true; }
    var info = elements[pixel.element];
    var oob = outOfBounds(nx,ny);
    if (isEmpty(nx,ny,false,oob)) { // If coords is empty, move to coords
        if(Math.random() > (elements[newPixel.element].friction ? elements[newPixel.element].friction : 0.02))
        {
            pixel.grounded = true;
        }
        else
        {
            pixel.grounded = false;
        }
        movePixel(pixel,nx,ny,leaveBehind);
        return true;
    }
    else if (!oob) {
        // Reactions
        newPixel = pixelMap[nx][ny];
        if(!pixel.grounded && Math.random() > (elements[newPixel.element].friction ? elements[newPixel.element].friction : 0.02)) {
            newPixel.grounded = false;
        }
        if(Math.random() > (elements[newPixel.element].friction ? elements[newPixel.element].friction : 0.02))
        {
            pixel.grounded = true;
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


function pixelTick(pixel,custom=null) {
    if (pixel.start === pixelTicks) {return}
    if (elements[pixel.element] === undefined) {
        pixel.invalidElement = pixel.element;
        changePixel(pixel,"unknown");
        return;
    }
    var info = elements[pixel.element];
    if (custom) { var behavior = custom; }
    else if (pixel.charge && info.behaviorOn) { var behavior = info.behaviorOn; }
    else { var behavior = info.behavior; }
    if (pixel.flipX) { behavior = flipBehavior(behavior,"x"); }
    if (pixel.flipY) { behavior = flipBehavior(behavior,"y"); }
    if (pixel.r) { behavior = rotateBehavior(behavior,pixel.r); }
    var x = pixel.x;
    var y = pixel.y;
    var move1Spots = [];
    var move2Spots = [];
    var supportSpots = [];
    var swapSpots = [];
    var leaveBehind = null;
    var leaveBehind1 = null;
    var leaveBehind2 = null;
    var move = true;
    // Parse behavior
    for (var by = 0; by < behavior.length; by++) {
var behaviorby = behavior[by];
for (var bx = 0; bx < behaviorby.length; bx++) {
    var b0 = behaviorby[bx];
    if (b0 === "XX") {continue}
    //if (b.includes(" OR ")) {
    //    b = b.split(" OR ")[Math.floor(Math.random()*b.split(" OR ").length)];
    //}
    // Loop through b0.split(" AND ")
    if (b0.indexOf(" AND ") !== -1) { var andsplit = b0.split(" AND "); }
    else { var andsplit = [b0]; }
    for (var i = 0; i < andsplit.length; i++) {
        var b = andsplit[i];
        if (b.indexOf(":") !== -1) {
            var arg = b.split(":")[1].split(/[\:\%]/)[0];
            if (b.indexOf("%") === -1) {
                b = b.split(/[\:\%]/)[0];
            }
        }
        else { var arg = null;}
        // If b has "%" followed by a number in it, it's a chance to move
        if (b.indexOf("%") !== -1) {
            // Split the string at the "%" and use the second half as the chance (float)
            var chance = parseFloat(b.split("%")[1]);
            //console.log(b+": "+(Math.random()*100 < chance));
            b = b.split(/[\:\%]/)[0];
        }
        else { var chance = 100; }
        if (chance===100 || Math.random()*100 < chance) {
            var newCoords = behaviorCoords(x,y,bx,by);
            switch (b) {
            default: break;
            case "M1":
                if (info.viscosity !== undefined) {
                    if (!((Math.random()*100) < 100 / Math.pow(info.viscosity, 0.25))) {
                        newCoords.x = x;
                    }
                }
                move1Spots.push(newCoords);
                break;
            case "M2":
                if (pixel.grounded || info.viscosity !== undefined) {
                    if (!((Math.random()*100) < 100 / Math.pow(info.viscosity, 0.25))) {
                        newCoords.x = x;
                    }
                }
                move2Spots.push(newCoords);
                break;
            case "SP":
                supportSpots.push({x:newCoords.x,y:newCoords.y,arg:arg});
                break;
            case "SA":
                if (!isEmpty(newCoords.x,newCoords.y,true)) {
                    move = false;
                }
                break;
            case "DL":
                if (!isEmpty(newCoords.x,newCoords.y,true)) {
                    // if the pixel at newCoords is the same element as the pixel, ignore
                    newPixel = pixelMap[newCoords.x][newCoords.y];
                    // if info.ignore exists and newPixel.element is in it
                    if (info.ignore && info.ignore.indexOf(newPixel.element) !== -1) {
                        continue;
                    }
                    if ((!(newPixel.element == pixel.element)) || (newCoords.x == x && newCoords.y == y)) {
                        if (arg != null) { var args = arg.split(","); }
                        if (arg == null || args.indexOf(newPixel.element) !== -1) {
                            if (!elements[newPixel.element].hardness || Math.random() > elements[newPixel.element].hardness) {
                                deletePixel(newCoords.x,newCoords.y);
                                if (newCoords.x == x && newCoords.y == y) {
                                    var deleted = true;
                                }
                                swapSpots = [];
                            }
                        }
                    }
                }
                break;
            case "DB":
                if (!isEmpty(newCoords.x,newCoords.y,true)) {
                    // if the pixel at newCoords is the same element as the pixel, ignore
                    newPixel = pixelMap[newCoords.x][newCoords.y];
                    // if info.ignore exists and newPixel.element is in it
                    if (info.ignore && info.ignore.indexOf(newPixel.element) !== -1) {
                        continue;
                    }
                    if (!(newPixel.element == pixel.element)) {
                        if (arg != null) { var args = arg.split(","); }
                        if (arg == null || args.indexOf(newPixel.element) !== -1) {
                            if (!elements[newPixel.element].hardness || Math.random() > elements[newPixel.element].hardness) {
                                deletePixel(newCoords.x,newCoords.y);
                                if (pixelMap[pixel.x][pixel.y] != undefined) {
                                    deletePixel(pixel.x,pixel.y);
                                }
                                var deleted = true;
                                swapSpots = [];
                            }
                        }
                    }
                }
                break;
            case "CH":
                if (!isEmpty(newCoords.x,newCoords.y,true)) {
                    var newPixel = pixelMap[newCoords.x][newCoords.y];
                    if (info.ignore && info.ignore.indexOf(newPixel.element) !== -1) {
                        continue;
                    }
                    if (!elements[newPixel.element].hardness || Math.random() > elements[newPixel.element].hardness || (newCoords.x == x && newCoords.y == y)) {
                        if (arg.indexOf(">") !== -1) {
                            var argfrom = arg.split(">")[0];
                            if (argfrom.indexOf(",") !== -1) {
                                if (argfrom.split(",").indexOf(newPixel.element) === -1) {
                                    continue;
                                }
                            }
                            else if (argfrom !== newPixel.element) {
                                continue;
                            }
                            var argto = arg.split(">")[1];
                        }
                        else {
                            var argfrom = null;
                            var argto = arg;
                        }
                        if (argto.indexOf(",") !== -1) {
                            var argto = argto.split(",")[Math.floor(Math.random()*argto.split(",").length)];
                        }
                        if (elements[argto]) {
                            if (elements[newPixel.element].id !== elements[argto].id) {
                                changePixel(newPixel,argto);
                            }
                        }
                    }
                }
                break;
            case "SW":
                if (!isEmpty(newCoords.x,newCoords.y,true)) {
                    var newPixel = pixelMap[newCoords.x][newCoords.y];
                    if (arg != null) { var args = arg.split(","); }
                    if (arg == null || args.indexOf(newPixel.element) !== -1) {
                        if (!elements[newPixel.element].hardness || Math.random() > elements[newPixel.element].hardness) {
                            swapSpots.push({x:newCoords.x,y:newCoords.y});
                        }
                    }
                }
                break;
            case "CR":
                if (isEmpty(newCoords.x,newCoords.y)) {
                    if (arg == null) {
                        arg = pixel.element;
                    }
                    else if (arg.indexOf(",") !== -1) {
                        arg = arg.split(",")[Math.floor(Math.random()*arg.split(",").length)];
                    }
                    if (elements[arg]) {
                        createPixel(arg,newCoords.x,newCoords.y);
                        if (info.fireColor && arg==="fire") {
                            pixelMap[newCoords.x][newCoords.y].color = pixelColorPick(pixelMap[newCoords.x][newCoords.y],info.fireColor);
                        }
                        pixelMap[newCoords.x][newCoords.y].temp = pixel.temp
                        pixelTempCheck(pixelMap[newCoords.x][newCoords.y]);
                    }
                }
                break;
            case "CL":
                if (isEmpty(newCoords.x,newCoords.y)) {
                    if (arg == null || pixel.temp >= parseFloat(arg)) {
                        clonePixel(pixel,newCoords.x,newCoords.y);
                    }
                }
                break;
            case "CF":
                if (pixel.clone) {
                    if (isEmpty(newCoords.x,newCoords.y)) {
                        createPixel(pixel.clone,newCoords.x,newCoords.y);
                        pixelMap[newCoords.x][newCoords.y].temp = pixel.temp;
                        pixelTempCheck(pixelMap[newCoords.x][newCoords.y]);
                    }
                }
                else {
                    if (!isEmpty(newCoords.x,newCoords.y,true)) {
                        newPixel = pixelMap[newCoords.x][newCoords.y];
                        if (info.ignore && info.ignore.indexOf(newPixel.element) !== -1) {
                            continue;
                        }
                        if (newPixel.element != pixel.element && newPixel.element != "wire") {
                            pixel.clone = newPixel.element;
                            pixel.temp = newPixel.temp;
                        }
                        else if (newPixel.clone) {
                            pixel.clone = newPixel.clone;
                            pixel.temp = newPixel.temp;
                        }
                    }
                }
                break;
            case "SH":
                if (!isEmpty(newCoords.x,newCoords.y,true)) {
                    var newPixel = pixelMap[newCoords.x][newCoords.y];
                    var con = elements[newPixel.element].conduct;
                    if (con != undefined) {
                        if (Math.random() < con) { // If random number is less than conductivity
                            if (!newPixel.charge && !newPixel.chargeCD && (arg == null || newPixel.element == arg)) {
                                newPixel.charge = (parseFloat(arg) || 1);
                                if (elements[newPixel.element].colorOn) {
                                    newPixel.color = pixelColorPick(newPixel);
                                }
                            }
                        }
                    }
                }
                break;
            case "ST": //Stick
                if (!isEmpty(newCoords.x,newCoords.y,true)) {
                    var newPixel = pixelMap[newCoords.x][newCoords.y];
                    if (info.ignore && info.ignore.indexOf(newPixel.element) !== -1) {
                        continue;
                    }
                    if (newPixel.element != pixel.element && (arg == null || newPixel.element == arg)) {
                        var sticking = true
                    }
                }
                break;
            case "LB":
            case "L1":
            case "L2":
                if (arg != null && arg.indexOf(",") !== -1) {
                    arg = arg.split(",")[Math.floor(Math.random()*arg.split(",").length)];
                }
                if (elements[arg]) {
                    if (b=="LB") {leaveBehind = arg;}
                    else if (b=="L1") {leaveBehind1 = arg;}
                    else if (b=="L2") {leaveBehind2 = arg;}
                }
                break;
            case "CC":
                if (!isEmpty(newCoords.x,newCoords.y,true)) {
                    var newPixel = pixelMap[newCoords.x][newCoords.y];
                    if (arg == null) {arg = newPixel.colorObject}
                    else {
                        if (arg.indexOf(",") !== -1) {
                            arg = arg.split(",")[Math.floor(Math.random()*arg.split(",").length)];
                        }
                        if (!arg.startsWith("#")) {
                            arg = "#" + arg;
                        }
                    }
                    newPixel.color = pixelColorPick(newPixel,arg);
                }
                break;
            case "HT":
                if (!isEmpty(newCoords.x,newCoords.y,true)) {
                    var newPixel = pixelMap[newCoords.x][newCoords.y];
                    // if the element isn't the same or the coords ARE the same
                    if (!(newPixel.element == pixel.element) || (newCoords.x == pixel.x && newCoords.y == pixel.y)) {
                        if (arg != null) {arg = parseFloat(arg)}
                        else {arg = 1}
                        if (isNaN(arg)) {arg = 1}
                        newPixel.temp += arg;
                        pixelTempCheck(newPixel);
                    }
                }
                break;
            case "CO":
                if (!isEmpty(newCoords.x,newCoords.y,true)) {
                    var newPixel = pixelMap[newCoords.x][newCoords.y];
                    if (!(newPixel.element == pixel.element) || (newCoords.x == pixel.x && newCoords.y == pixel.y)) {
                        if (arg != null) {arg = parseFloat(arg)}
                        else {arg = 1}
                        if (isNaN(arg)) {arg = 1}
                        newPixel.temp -= arg;
                        pixelTempCheck(newPixel);
                    }
                }
                break;
            case "FX":
                if (!isEmpty(newCoords.x,newCoords.y,true)) {
                    var newPixel = pixelMap[newCoords.x][newCoords.y];
                    if (elements[newPixel.element].flippableX) {
                        if (arg === "0") { newPixel.flipX = false; }
                        else if (arg === "1") { newPixel.flipX = true; }
                        newPixel.flipX = !newPixel.flipX;
                    }
                }
                break;
            case "FY":
                if (!isEmpty(newCoords.x,newCoords.y,true)) {
                    var newPixel = pixelMap[newCoords.x][newCoords.y];
                    if (elements[newPixel.element].flippableY) {
                        if (arg === "0") { newPixel.flipY = false; }
                        else if (arg === "1") { newPixel.flipY = true; }
                        else { newPixel.flipY = !newPixel.flipY; }
                    }
                }
                break;
            case "RT":
                if (!isEmpty(newCoords.x,newCoords.y,true)) {
                    var newPixel = pixelMap[newCoords.x][newCoords.y];
                    // If arg isn't null, set arg to a random choice from arg.split(",")
                    if (arg != null && arg.indexOf(",") !== -1) {
                        arg = arg.split(",")[Math.floor(Math.random()*arg.split(",").length)];
                    }
                    if (elements[newPixel.element].rotatable) {
                        newPixel.r = ((newPixel.r||0) + (parseInt(arg)||1)) % 4;
                    }
                }
                break;
            case "BO":
                if (!isEmpty(newCoords.x,newCoords.y) && (outOfBounds(newCoords.x,newCoords.y) || elements[pixelMap[newCoords.x][newCoords.y].element].id === elements[pixel.element].id || elements[pixelMap[newCoords.x][newCoords.y].element].state === "solid")) {
                    if (info.flippableX) {
                        pixel.flipX = !pixel.flipX;
                    }
                    if (info.flippableY) {
                        pixel.flipY = !pixel.flipY;
                    }
                    if (info.rotatable) {
                        // If arg isn't null, set arg to a random choice from arg.split(",")
                        if (arg != null && arg.indexOf(",") !== -1) {
                            arg = arg.split(",")[Math.floor(Math.random()*arg.split(",").length)];
                        }
                        if (pixel.r !== undefined) {
                            pixel.r = (pixel.r + (parseInt(arg)||2)) % 4;
                        }
                        else { pixel.r = (parseInt(arg)||2); }
                    }
                }
                break;
            case "C2":
                if (arg.indexOf(",") !== -1) {
                    arg = arg.split(",")[Math.floor(Math.random()*arg.split(",").length)];
                }
                var C2 = arg;
                break;
            case "EX":
                if (!isEmpty(newCoords.x,newCoords.y)) {
                    if (outOfBounds(newCoords.x,newCoords.y) || (newCoords.x == x && newCoords.y == y) || (pixel.element !== pixelMap[newCoords.x][newCoords.y].element && elements[pixelMap[newCoords.x][newCoords.y].element].state !== "gas")) {
                        // if arg contains ">", var fire = everything after it, arg = everything before it
                        if (arg.indexOf(">") !== -1) {
                            var fire = arg.split(">")[1];
                            arg = arg.split(">")[0];
                        }
                        else { var fire = "fire" }
                        // arg = a number
                        if (arg != null) {
                            arg = parseInt(arg);
                            if (isNaN(arg)) {arg = 3}
                        }
                        else {arg = 3}
                        explodeAt(x,y,arg,fire);
                        if (!pixel.del && info.hardness !== 1) {
                            deletePixel(x,y);
                            var deleted = true;
                        }
                        swapSpots = [];
                    }
                }
                break;
            }


        }
    }
    }
    }
    if (typeof deleted !== "undefined") {return;}
    if (supportSpots.length > 0) {
        var supportCount = 0;
        var allEmpty = true;
        for (var i = 0; i < supportSpots.length; i++) {
            var bx = supportSpots[i].x;
            var by = supportSpots[i].y;
            var arg = supportSpots[i].arg;
            if (!isEmpty(bx,by,true)) {
                if (info.ignore && info.ignore.indexOf(pixelMap[bx][by].element) !== -1) {continue;}
                if ((arg == null && !validDensitySwaps[info.state][elements[pixelMap[bx][by].element].state]) || pixelMap[bx][by].element == arg) {
                    supportCount++;
                }
            }
        }
        if (supportCount == supportSpots.length) {
            move = false;
        }
    }
    
    var moved = false;

    if (swapSpots.length > 0) {
        var coords = swapSpots[Math.floor(Math.random()*swapSpots.length)];
        if (pixelMap[coords.x][coords.y] != undefined) {
            swapPixels(pixel,pixelMap[coords.x][coords.y]);
            move = false;
            moved = true;
        }
    }

    if (typeof sticking !== "undefined") {
        move = false;
    }
    
    // Move First Priority
    if (move) {
        if (move1Spots.length > 0) {
            // While move1Spots is not empty
            while (move1Spots.length > 0) {
                // coords = random item of move1Spots
                var coords = move1Spots[Math.floor(Math.random()*move1Spots.length)];
                var nx = coords.x;
                var ny = coords.y;
                moved = tryMove(pixel,nx,ny,leaveBehind1 || leaveBehind);
                if (moved) {
                    break;
                }
                else {
                    // remove coords from move1Spots
                    move1Spots.splice(move1Spots.indexOf(coords),1);
                }

                
            }
        }
        // Move Second Priority
        if (!moved && move2Spots.length > 0) {
            // While move2Spots is not empty
            while (move2Spots.length > 0) {
                // coords = random item of move2Spots
                var coords = move2Spots[Math.floor(Math.random()*move2Spots.length)];
                var nx = coords.x;
                var ny = coords.y;
                moved = tryMove(pixel,nx,ny,leaveBehind2 || leaveBehind);
                if (moved) {
                    if (typeof C2 !== "undefined" && elements[C2]) {
                        changePixel(pixel,C2);
                    }
                    break;
                }
                else {
                    // remove coords from move2Spots
                    move2Spots.splice(move2Spots.indexOf(coords),1);
                }
            }
        }
    }
    doAirDensity(pixel);


    // Change tempearture if needed (unused)
    /*if (info.tempChange != undefined) {
        pixel.temp += info.tempChange;
        pixelTempCheck(pixel);
    }*/

    // Burning
    doBurning(pixel);

    // Heat Transfer
    if (info.insulate !== true) {
        doHeat(pixel);
    }

    // Electricity Transfer
    doElectricity(pixel);

    // Staining
    if (info.stain) {
        doStaining(pixel);
    }


}


behaviors.POWDER2 = function(pixel) {
    if (pixel.start === pixelTicks) {return}
    if (pixel.charge && elements[pixel.element].behaviorOn) {
        pixelTick(pixel)
    }
    console.log(pixel.grounded);
    if (!pixel.grounded) {
        if(!tryMove(pixel, pixel.x, pixel.y+1)) {
            if (Math.random() < 0.5) {
                if (!tryMove(pixel, pixel.x+1, pixel.y+1)) {
                    tryMove(pixel, pixel.x-1, pixel.y+1);
                }
            } else {
                if (!tryMove(pixel, pixel.x-1, pixel.y+1)) {
                    tryMove(pixel, pixel.x+1, pixel.y+1);
                }
            }
        }
    }
    else
    {
        tryMove(pixel, pixel.x, pixel.y+1);
    }
    doDefaults(pixel);
}

runAfterLoad(function() {
    for(let i in elements) {
        if(elements[i].behavior === behaviors.POWDER) {
            elements[i].behavior = behaviors.POWDER2;
        }
    }
});