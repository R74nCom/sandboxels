        function pixelTickMod1(pixel) {
            if (pixel.start === pixelTicks) {return}
            var info = elements[pixel.element];
            if (pixel.charge && info.behaviorOn) { var behavior = info.behaviorOn; }
            else { var behavior = info.behavior; }
            if (pixel.flipX) { behavior = flipBehavior(behavior,"x"); }
            if (pixel.flipY) { behavior = flipBehavior(behavior,"y"); }
            if (pixel.r) { behavior = rotateBehavior(behavior,pixel.r); }
            var x = pixel.x;
            var y = pixel.y;
            var move1Spots = [];
            var move2Spots = [];
            var move3Spots = [];
            var supportSpots = [];
            var swapSpots = [];
            var leaveBehind = null;
            var leaveBehind1 = null;
            var leaveBehind2 = null;
            var leaveBehind3 = null;
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
                    if (b0.includes(" AND ")) { var andsplit = b0.split(" AND "); }
                    else { var andsplit = [b0]; }
                    for (var i = 0; i < andsplit.length; i++) {
                        var b = andsplit[i];
                        if (b.includes(":")) {
                            var arg = b.split(":")[1].split(/[\:\%]/)[0];
                            if (!b.includes("%")) {
                                b = b.split(/[\:\%]/)[0];
                            }
                        }
                        else { var arg = null;}
                        // If b has "%" followed by a number in it, it's a chance to move
                        if (b.includes("%")) {
                            // Split the string at the "%" and use the second half as the chance (float)
                            var chance = parseFloat(b.split("%")[1]);
                            //console.log(b+": "+(Math.random()*100 < chance));
                            b = b.split(/[\:\%]/)[0];
                        }
                        else { var chance = 100; }
                        if (chance==100 || Math.random()*100 < chance) {
                            var newCoords = behaviorCoords(x,y,bx,by);
                            if (b == "M1") {
                                if (info.viscosity != undefined) {
                                    if (!((Math.random()*100) < 100 / ((info.viscosity) ** 0.25))) {
                                        newCoords.x = x;
                                    }
                                }
                                move1Spots.push(newCoords);
                            }
                            else if (b == "M2") {
                                if (info.viscosity != undefined) {
                                    if (!((Math.random()*100) < 100 / ((info.viscosity) ** 0.25))) {
                                        newCoords.x = x;
                                    }
                                }
                                move2Spots.push(newCoords);
                            }
                            else if (b == "M3") {
                                if (info.viscosity != undefined) {
                                    if (!((Math.random()*100) < 100 / ((info.viscosity) ** 0.25))) {
                                        newCoords.x = x;
                                    }
                                }
                                move3Spots.push(newCoords);
                            }
                            else if (b == "SP") {
                                supportSpots.push({x:newCoords.x,y:newCoords.y,arg:arg});
                            }
                            else if (b == "SA") {
                                if (!isEmpty(newCoords.x,newCoords.y,true)) {
                                    move = false;
                                }
                            }
                            else if (b == "DL") {
                                if (!isEmpty(newCoords.x,newCoords.y,true)) {
                                    // if the pixel at newCoords is the same element as the pixel, ignore
                                    newPixel = pixelMap[newCoords.x][newCoords.y];
                                    // if info.ignore exists and newPixel.element is in it
                                    if (info.ignore && info.ignore.includes(newPixel.element)) {
                                        continue;
                                    }
                                    if ((!(newPixel.element == pixel.element)) || (newCoords.x == x && newCoords.y == y)) {
                                        if (arg != null) { var args = arg.split(","); }
                                        if (arg == null || args.includes(newPixel.element)) {
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
                            }
                            else if (b == "DB") { // Delete Both
                                if (!isEmpty(newCoords.x,newCoords.y,true)) {
                                    // if the pixel at newCoords is the same element as the pixel, ignore
                                    newPixel = pixelMap[newCoords.x][newCoords.y];
                                    // if info.ignore exists and newPixel.element is in it
                                    if (info.ignore && info.ignore.includes(newPixel.element)) {
                                        continue;
                                    }
                                    if (!(newPixel.element == pixel.element)) {
                                        if (arg != null) { var args = arg.split(","); }
                                        if (arg == null || args.includes(newPixel.element)) {
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
                            }
                            //Change pixel
                            else if (b == "CH") {
                                if (!isEmpty(newCoords.x,newCoords.y,true)) {
                                    var newPixel = pixelMap[newCoords.x][newCoords.y];
                                    if (!elements[newPixel.element].hardness || Math.random() > elements[newPixel.element].hardness) {
                                        if (arg.includes(">")) {
                                            var argfrom = arg.split(">")[0];
                                            var argto = arg.split(">")[1];
                                        }
                                        else {
                                            var argfrom = null;
                                            var argto = arg;
                                        }
                                        if (argto.includes(",")) {
                                            var argto = argto.split(",")[Math.floor(Math.random()*argto.split(",").length)];
                                        }
                                        if (elements[argto]) {
                                            if ((newPixel.element != argto) && (argfrom == null || argfrom == newPixel.element)) {
                                                newPixel.element = argto;
                                                newPixel.color = pixelColorPick(newPixel);
                                                newPixel.start = pixelTicks;
                                                if (elements[argto].burning != true) {
                                                    newPixel.burning = false;
                                                }
                                                else {
                                                    newPixel.burning = true;
                                                    newPixel.burnStart = pixelTicks;
                                                }
                                                if (newPixel.r && !elements[argto].rotatable) {
                                                    newPixel.r = false;
                                                }
                                                if (newPixel.flipX && !elements[argto].flippableX) {
                                                    newPixel.flipX = false;
                                                }
                                                if (newPixel.flipY && !elements[argto].flippableY) {
                                                    newPixel.flipY = false;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            //Swap
                            else if (b == "SW") {
                                if (!isEmpty(newCoords.x,newCoords.y,true)) {
                                    var newPixel = pixelMap[newCoords.x][newCoords.y];
                                    if (arg != null) { var args = arg.split(","); }
                                    if (arg == null || args.includes(newPixel.element)) {
                                        if (!elements[newPixel.element].hardness || Math.random() > elements[newPixel.element].hardness) {
                                            swapSpots.push({x:newCoords.x,y:newCoords.y});
                                        }
                                    }
                                }
                            }
                            //Create pixel
                            else if (b == "CR") {
                                if (isEmpty(newCoords.x,newCoords.y)) {
                                    if (arg == null) {
                                        arg = pixel.element;
                                    }
                                    else if (arg.includes(",")) {
                                        arg = arg.split(",")[Math.floor(Math.random()*arg.split(",").length)];
                                    }
                                    if (elements[arg]) {
                                        createPixel(arg,newCoords.x,newCoords.y);
                                        pixelMap[newCoords.x][newCoords.y].temp = pixel.temp
                                    }
                                }
                            }
                            // Clone self
                            else if (b == "CL") {
                                if (isEmpty(newCoords.x,newCoords.y)) {
                                    if (arg == null || pixel.temp >= parseFloat(arg)) {
                                        clonePixel(pixel,newCoords.x,newCoords.y);
                                    }
                                }
                            }
                            // Clone first touched
                            else if (b == "CF") {
                                if (pixel.clone) {
                                    if (isEmpty(newCoords.x,newCoords.y)) {
                                        createPixel(pixel.clone,newCoords.x,newCoords.y);
                                        pixelMap[newCoords.x][newCoords.y].temp = pixel.temp;
                                    }
                                }
                                else {
                                    if (!isEmpty(newCoords.x,newCoords.y,true)) {
                                        newPixel = pixelMap[newCoords.x][newCoords.y];
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
                            }
                            else if (b=="SH") {
                                if (!isEmpty(newCoords.x,newCoords.y,true)) {
                                    var newPixel = pixelMap[newCoords.x][newCoords.y];
                                    var con = elements[newPixel.element].conduct;
                                    if (con != undefined) {
                                        if (Math.random() < con) { // If random number is less than conductivity
                                            if (!newPixel.charge && !newPixel.chargeCD) {
                                                newPixel.charge = (parseFloat(arg) || 1);
                                                if (elements[newPixel.element].colorOn) {
                                                    newPixel.color = pixelColorPick(newPixel);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            //Stick
                            else if (b=="ST") {
                                if (!isEmpty(newCoords.x,newCoords.y,true)) {
                                    var newPixel = pixelMap[newCoords.x][newCoords.y];
                                    if (newPixel.element != pixel.element && (arg == null || newPixel.element == arg)) {
                                        var sticking = true
                                    }
                                }
                            }
                            //Leave behind element
                            else if (b == "LB" || b == "L1" || b == "L2" || b == "L3") {
                                if (arg != null && arg.includes(",")) {
                                    arg = arg.split(",")[Math.floor(Math.random()*arg.split(",").length)];
                                }
                                if (elements[arg]) {
                                    if (b=="LB") {leaveBehind = arg;}
                                    else if (b=="L1") {leaveBehind1 = arg;}
                                    else if (b=="L2") {leaveBehind2 = arg;}
                                    else if (b=="L3") {leaveBehind3 = arg;}
                                }
                            }
                            //Change color
                            else if (b == "CC") {
                                if (!isEmpty(newCoords.x,newCoords.y,true)) {
                                    var newPixel = pixelMap[newCoords.x][newCoords.y];
                                    if (arg == null) {arg = newPixel.colorObject}
                                    else {
                                        if (arg.includes(",")) {
                                            arg = arg.split(",")[Math.floor(Math.random()*arg.split(",").length)];
                                        }
                                        if (!arg.startsWith("#")) {
                                            arg = "#" + arg;
                                        }
                                    }
                                    newPixel.color = pixelColorPick(newPixel,arg);
                                }
                            }
                            //Heat
                            else if (b == "HT") {
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
                            }
                            //Cool
                            else if (b == "CO") {
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
                            }

                            // Flip X
                            else if (b == "FX") {
                                if (!isEmpty(newCoords.x,newCoords.y,true)) {
                                    var newPixel = pixelMap[newCoords.x][newCoords.y];
                                    if (elements[newPixel.element].flippableX) {
                                        if (arg === "0") { newPixel.flipX = false; }
                                        else if (arg === "1") { newPixel.flipX = true; }
                                        newPixel.flipX = !newPixel.flipX;
                                    }
                                }
                            }
                            // Flip Y
                            else if (b == "FY") {
                                if (!isEmpty(newCoords.x,newCoords.y,true)) {
                                    var newPixel = pixelMap[newCoords.x][newCoords.y];
                                    if (elements[newPixel.element].flippableY) {
                                        if (arg === "0") { newPixel.flipY = false; }
                                        else if (arg === "1") { newPixel.flipY = true; }
                                        else { newPixel.flipY = !newPixel.flipY; }
                                    }
                                }
                            }
                            // Rotate
                            else if (b == "RT") {
                                if (!isEmpty(newCoords.x,newCoords.y,true)) {
                                    var newPixel = pixelMap[newCoords.x][newCoords.y];
                                    // If arg isn't null, set arg to a random choice from arg.split(",")
                                    if (arg != null && arg.includes(",")) {
                                        arg = arg.split(",")[Math.floor(Math.random()*arg.split(",").length)];
                                    }
                                    if (elements[newPixel.element].rotatable) {
                                        newPixel.r = ((newPixel.r||0) + (parseInt(arg)||1)) % 4;
                                    }
                                }
                            }
                            // Bounce
                            else if (b == "BO") {
                                if (!isEmpty(newCoords.x,newCoords.y)) {
                                    if (info.flippableX) {
                                        pixel.flipX = !pixel.flipX;
                                    }
                                    if (info.flippableY) {
                                        pixel.flipY = !pixel.flipY;
                                    }
                                    if (info.rotatable) {
                                        // If arg isn't null, set arg to a random choice from arg.split(",")
                                        if (arg != null && arg.includes(",")) {
                                            arg = arg.split(",")[Math.floor(Math.random()*arg.split(",").length)];
                                        }
                                        if (pixel.r !== undefined) {
                                            pixel.r = (pixel.r + (parseInt(arg)||2)) % 4;
                                        }
                                        else { pixel.r = (parseInt(arg)||2); }
                                    }
                                }
                            }
                            // Change When M2
                            else if (b == "C2") {
                                if (arg.includes(",")) {
                                    arg = arg.split(",")[Math.floor(Math.random()*arg.split(",").length)];
                                }
                                var C2 = arg;
                            }
                            // Change When M3
                            else if (b == "C3") {
                                if (arg.includes(",")) {
                                    arg = arg.split(",")[Math.floor(Math.random()*arg.split(",").length)];
                                }
                                var C3 = arg;
                            }
                            // Explode
                            else if (b == "EX") {
                                if (!isEmpty(newCoords.x,newCoords.y)) {
                                    if (outOfBounds(newCoords.x,newCoords.y) || (newCoords.x == x && newCoords.y == y) || (pixel.element !== pixelMap[newCoords.x][newCoords.y].element && elements[pixelMap[newCoords.x][newCoords.y].element].state !== "gas")) {
                                        // if arg contains ">", var fire = everything after it, arg = everything before it
                                        if (arg.includes(">")) {
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
                        if ((arg == null && !validDensitySwaps.includes(info.state+">"+elements[pixelMap[bx][by].element].state)) || pixelMap[bx][by].element == arg) {
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
                                pixel.element = C2;
                                pixel.color = pixelColorPick(pixel);
                                pixel.start = pixelTicks;
                                if (elements[C2].burning != true) {
                                    pixel.burning = false;
                                }
                                else {
                                    pixel.burning = true;
                                    pixel.burnStart = pixelTicks;
                                }
                            }
                            break;
                        }
                        else {
                            // remove coords from move2Spots
                            move2Spots.splice(move2Spots.indexOf(coords),1);
                        }
                    }
                    //Move Third Priority
                        if (!moved && move3Spots.length > 0) {
                        // While move3Spots is not empty
                        while (move3Spots.length > 0) {
                            // coords = random item of move3Spots
                            var coords = move3Spots[Math.floor(Math.random()*move3Spots.length)];
                            var nx = coords.x;
                            var ny = coords.y;
                            moved = tryMove(pixel,nx,ny,leaveBehind3 || leaveBehind);
                            if (moved) {
                                if (typeof C3 !== "undefined" && elements[C3]) {
                                    pixel.element = C3;
                                    pixel.color = pixelColorPick(pixel);
                                    pixel.start = pixelTicks;
                                    if (elements[C3].burning != true) {
                                        pixel.burning = false;
                                    }
                                    else {
                                        pixel.burning = true;
                                        pixel.burnStart = pixelTicks;
                                    }
                                }
                                break;
                            }
                            else {
                                // remove coords from move3Spots
                                move3Spots.splice(move3Spots.indexOf(coords),1);
                            }
                        }
                    }
                }
            }


            // Change tempearture if needed (unused)
            /*if (info.tempChange != undefined) {
                pixel.temp += info.tempChange;
                pixelTempCheck(pixel);
            }*/

            // Burning
            doBurning(pixel);

            // Heat Transfer
            if (info.insulate != true) {
                doHeat(pixel);
            }

            // Electricity Transfer
            doElectricity(pixel);


        }

elements.m3test = {
	"color": "#00ff00",
	"behavior": [
		"XX|M3|XX",
		"XX|L3:wood|M2",
		"XX|M1|XX"
	],
	tick: function(pixel) {
		pixelTickMod1(pixel)
	},
	"density": 1200,
	"state": "solid",
	"category": "land"
}