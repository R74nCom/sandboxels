// Mod Loader
runAfterLoadList = [];
// runAfterLoad() takes a function and adds it to the runAfterLoadList.
function runAfterLoad(func) {
    runAfterLoadList.push(func);
}
// If the localStorage key "enabledMods" exists, load it as an array.
// If it doesn't exist, create an empty array.
enabledMods = localStorage.getItem("enabledMods") ? JSON.parse(localStorage.getItem("enabledMods")) : [];
// Run all scripts in the enabledMods array, if it fails print to console
for (var i = 0; i < enabledMods.length; i++) {
    try {
        var script = document.createElement('script');
        var src = enabledMods[i];
        script.src = src;
        document.head.appendChild(script);
    } catch (e) {
        console.log("Error in mod: " + enabledMods[i]);
        console.log(e);
    }
}
// if the URL contains fools=true, load the fools.js mod
if (window.location.href.includes("fools=true")) {
    var script = document.createElement('script');
    script.src = "mods/fools.js"
    document.head.appendChild(script);
}
// add service worker service-worker.js
if (typeof navigator !== 'undefined') {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/service-worker.js');
        });
    }
}
console.log("%c WELCOME TO R74n ", "position: absolute; top: 50%; right: 50%; transform: translate(50%,-50%); font-family: Arial; font-size: 3em; font-weight: 700; color: #00ffff; text-shadow: 1px 1px 1px #14c9c9, 1px 2px 1px #14c9c9, 1px 3px 1px #14c9c9, 1px 4px 1px #14c9c9, 1px 5px 1px #14c9c9, 1px 13px 6px rgba(16,16,16,0.4), 1px 22px 10px rgba(16,16,16,0.2), 1px 25px 35px rgba(16,16,16,0.2), 1px 30px 60px rgba(16,16,16,0.4);padding:10px");
console.log("Sandboxels is developed by R74n and can be played on the official website: https://sandboxels.r74n.com/");
console.log("Can't access? Join our Discord: https://link.r74n.com/discord");
console.log("Found this on another website? Let us know!");
console.log("©2021-" + new Date().getFullYear() + ". All Rights Reserved.");
// If settings is in localStorage, load it. If not, create an empty object.
var settings = localStorage.getItem("settings") ? JSON.parse(localStorage.getItem("settings")) : {};
if (!settings["unlocked"]) {
    settings["unlocked"] = {};
}
function saveSettings() {
    localStorage.setItem("settings", JSON.stringify(settings));
}

function hexToRGB(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
function RGBToHex(rgb) {
    var r = rgb.r || rgb[0];
    var g = rgb.g || rgb[1];
    var b = rgb.b || rgb[2];
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function averageRGB(rgblist) {
    var r = 0;
    var g = 0;
    var b = 0;
    for (var i = 0; i < rgblist.length; i++) {
        var rgb = rgblist[i];
        r += parseInt(rgb.r || rgb[0]);
        g += parseInt(rgb.g || rgb[1]);
        b += parseInt(rgb.b || rgb[2]);
    }
    r = Math.floor(r / rgblist.length);
    g = Math.floor(g / rgblist.length);
    b = Math.floor(b / rgblist.length);
    return "rgb(" + r + "," + g + "," + b + ")";
}

currentPixels = [];
//currentID = 0;
// Pixel class, with attributes such as x, y, and element
class Pixel {
    constructor(x, y, element) {
        this.x = x;
        this.y = y;
        this.element = element;
        var elementInfo = elements[element];
        if (elementInfo.colorPattern && settings.textures !== 0) {
            this.color = elementInfo.colorPattern[y % elementInfo.colorPattern.length][x % elementInfo.colorPattern[0].length];
        }
        else {
            this.color = pixelColorPick(this);
        }
        // If element doesn't have temp attribute, set temp to airTemp
        if (elementInfo.temp == undefined) {
            this.temp = airTemp;
        } else {
            this.temp = elementInfo.temp;
        }
        this.start = pixelTicks;
        //this.id = currentID;
        //currentID++;
        if (elementInfo.burning && settings.burn !== 0) {
            this.burning = true;
            this.burnStart = pixelTicks;
        }
        if (elementInfo.charge) {
            this.charge = elementInfo.charge;
        }
        // If elementInfo.flippableX, set it to true or false randomly
        if (elementInfo.flipX !== undefined) { this.flipX = elementInfo.flipX }
        else if (elementInfo.flippableX) {
            this.flipX = Math.random() >= 0.5;
        }
        // If elementInfo.flippableY, set it to true or false randomly
        if (elementInfo.flipY !== undefined) { this.flipY = elementInfo.flipY }
        else if (elementInfo.flippableY) {
            this.flipY = Math.random() >= 0.5;
        }
        // If elementInfo.rotatable, set it to a number between 0 and 3
        if (elementInfo.r !== undefined) { this.r = elementInfo.r }
        else if (elementInfo.rotatable) {
            this.r = Math.floor(Math.random() * 4);
        }
        // If elementInfo.properties, set each key to its value
        if (elementInfo.properties !== undefined) {
            for (var key in elementInfo.properties) {
                // If it is an array or object, make a copy of it
                if (typeof elementInfo.properties[key] == "object") {
                    this[key] = JSON.parse(JSON.stringify(elementInfo.properties[key]));
                }
                else {
                    this[key] = elementInfo.properties[key];
                }
            }
        }
        pixelMap[x][y] = this;
        if (airTemp !== 20) { pixelTempCheck(this) }
    }
}
// If the screen size is under 768px, set pixelSize to 5, otherwise 6
if (window.innerWidth < 700) {
    pixelSize = 5;
} else {
    pixelSize = 6;
}
pixelSizeHalf = pixelSize / 2;

function outOfBounds(x, y) {
    // Returns true if the pixel is out of bounds
    return y > height - 1 || y < 1 || x > width - 1 || x < 1
}
function isEmpty(x, y, ignoreBounds = false, oob = undefined) {
    if (oob || outOfBounds(x, y)) {
        return ignoreBounds;
    }
    return pixelMap[x][y] == undefined;
}
function canMove(pixel, x, y) {
    if (isEmpty(x, y)) {
        return true;
    }
}
function movePixel(pixel, x, y, leaveBehind = null) {
    // Delete the pixel from the old position
    delete pixelMap[pixel.x][pixel.y];
    if (leaveBehind != null && isEmpty(pixel.x, pixel.y)) { createPixel(leaveBehind, pixel.x, pixel.y); }
    pixel.x = x;
    pixel.y = y;
    pixelMap[x][y] = pixel;
}
function clonePixel(pixel, x, y) {
    currentPixels.push(new Pixel(x, y, pixel.element));
}
function createPixel(element, x, y) {
    if (Array.isArray(element)) {
        element = element[Math.floor(Math.random() * element.length)];
    }
    currentPixels.push(new Pixel(x, y, element));
    checkUnlock(element);
}
function deletePixel(x, y) {
    // remove pixelMap[x][y] from currentPixels
    currentPixels.splice(currentPixels.indexOf(pixelMap[x][y]), 1);
    if (pixelMap[x][y]) { pixelMap[x][y].del = true; }
    delete pixelMap[x][y];
    /*for (var i = 0; i < currentPixels.length; i++) {
        if (currentPixels[i].x == x && currentPixels[i].y == y) {
            currentPixels.splice(i, 1);
            break;
        }
    }*/
    /*if (id != null) {
        for (var i = 0; i < currentPixels.length; i++) {
            if (currentPixels[i].id == id) {
                currentPixels.splice(i, 1);
                return;
            }
        }
    }*/
}
function swapPixels(pixel1, pixel2) {
    var tempX = pixel1.x;
    var tempY = pixel1.y;
    pixel1.x = pixel2.x;
    pixel1.y = pixel2.y;
    pixel2.x = tempX;
    pixel2.y = tempY;
    pixelMap[pixel1.x][pixel1.y] = pixel1;
    pixelMap[pixel2.x][pixel2.y] = pixel2;
}

function changePixel(pixel, element, changetemp = true) {
    pixel.element = element;
    pixel.color = pixelColorPick(pixel);
    pixel.start = pixelTicks;
    var elementInfo = elements[element];
    if (elementInfo.burning == true) {
        pixel.burning = true;
        pixel.burnStart = pixelTicks;
    }
    else if (pixel.burning && !elementInfo.burn) {
        delete pixel.burning;
        delete pixel.burnStart;
    }
    delete pixel.origColor; // remove stain
    if (pixel.r && !elementInfo.rotatable) {
        delete pixel.r;
    }
    if (pixel.flipX && !elementInfo.flippableX) {
        delete pixel.flipX;
    }
    if (pixel.flipY && !elementInfo.flippableY) {
        delete pixel.flipY;
    }
    // If elementInfo.flippableX, set it to true or false randomly
    if (elementInfo.flipX !== undefined) { pixel.flipX = elementInfo.flipX }
    else if (elementInfo.flippableX) {
        pixel.flipX = Math.random() >= 0.5;
    }
    // If elementInfo.flippableY, set it to true or false randomly
    if (elementInfo.flipY !== undefined) { pixel.flipY = elementInfo.flipY }
    else if (elementInfo.flippableY) {
        pixel.flipY = Math.random() >= 0.5;
    }
    if (elementInfo.temp != undefined && changetemp) {
        pixel.temp = elementInfo.temp;
        pixelTempCheck(pixel)
    }
    // If elementInfo.properties, set each key to its value
    if (elementInfo.properties !== undefined) {
        for (var key in elementInfo.properties) {
            // If it is an array or object, make a copy of it
            if (typeof elementInfo.properties[key] == "object") {
                pixel[key] = JSON.parse(JSON.stringify(elementInfo.properties[key]));
            }
            else {
                pixel[key] = elementInfo.properties[key];
            }
        }
    }
    checkUnlock(element);
}
function reactPixels(pixel1, pixel2) {
    var r = elements[pixel1.element].reactions[pixel2.element];
    if (r.setting && settings[r.setting] === 0) {
        return false;
    }
    // r has the attribute "y" which is a range between two y values
    // r.y example: [10,30]
    // return false if y is defined and pixel1's y is not in the range
    if (r.tempMin !== undefined && pixel1.temp < r.tempMin) {
        return false;
    }
    if (r.tempMax !== undefined && pixel1.temp > r.tempMax) {
        return false;
    }
    if (r.burning1 && !pixel1.burning) {
        return false;
    }
    if (r.burning2 && !pixel2.burning) {
        return false;
    }
    if (r.charged && !pixel.charge) {
        return false;
    }
    if (r.chance !== undefined && Math.random() > r.chance) {
        return false;
    }
    if (r.y !== undefined && (pixel1.y < r.y[0] || pixel1.y > r.y[1])) {
        return false;
    }
    if (r.elem1 !== undefined) {
        // if r.elem1 is an array, set elem1 to a random element from the array, otherwise set it to r.elem1
        if (Array.isArray(r.elem1)) {
            var elem1 = r.elem1[Math.floor(Math.random() * r.elem1.length)];
        } else { var elem1 = r.elem1; }

        if (elem1 == null) {
            deletePixel(pixel1.x, pixel1.y);
        }
        else {
            changePixel(pixel1, elem1);
        }
    }
    if (r.charge1) { pixel1.charge = r.charge1; }
    if (r.temp1) { pixel1.temp += r.temp1; pixelTempCheck(pixel1); }
    if (r.color1) { // if it's a list, use a random color from the list, else use the color1 attribute
        pixel1.color = pixelColorPick(pixel1, Array.isArray(r.color1) ? r.color1[Math.floor(Math.random() * r.color1.length)] : r.color1);
    }
    if (r.attr1) { // add each attribute to pixel1
        for (var key in r.attr1) {
            pixel1[key] = r.attr1[key];
        }
    }
    if (r.elem2 !== undefined) {
        // if r.elem2 is an array, set elem2 to a random element from the array, otherwise set it to r.elem2
        if (Array.isArray(r.elem2)) {
            var elem2 = r.elem2[Math.floor(Math.random() * r.elem2.length)];
        } else { var elem2 = r.elem2; }

        if (elem2 == null) {
            deletePixel(pixel2.x, pixel2.y);
        }
        else {
            changePixel(pixel2, elem2);
        }
    }
    if (r.charge2) { pixel2.charge = r.charge2; }
    if (r.temp2) { pixel2.temp += r.temp2; pixelTempCheck(pixel2); }
    if (r.color2) { // if it's a list, use a random color from the list, else use the color2 attribute
        pixel2.color = pixelColorPick(pixel2, Array.isArray(r.color2) ? r.color2[Math.floor(Math.random() * r.color2.length)] : r.color2);
    }
    if (r.attr2) { // add each attribute to pixel2
        for (var key in r.attr2) {
            pixel2[key] = r.attr2[key];
        }
    }
    if (r.func) { r.func(pixel1, pixel2); }
    return r.elem1 !== undefined || r.elem2 !== undefined;
}

loadedSounds = {};
function playSound(sound) {
    if (loadedSounds[sound] === undefined) {
        loadedSounds[sound] = new Audio("sounds/" + sound);
    }
    loadedSounds[sound].play();
}
function stopSound(sound) {
    if (loadedSounds[sound] === undefined) {
        loadedSounds[sound] = new Audio("sounds/" + sound);
    }
    loadedSounds[sound].pause();
    loadedSounds[sound].currentTime = 0;
}
function loopSound(sound) {
    if (loadedSounds[sound] === undefined) {
        loadedSounds[sound] = new Audio("sounds/" + sound);
    }
    loadedSounds[sound].loop = true;
    loadedSounds[sound].play();
}

validDensitySwaps = {
    "solid": {
        "liquid": true,
        "gas": true
    },
    "liquid": {
        "liquid": true,
        "gas": true
    },
    "gas": {
        "gas": true
    },
    undefined: {}
}
function tryMove(pixel, nx, ny, leaveBehind = undefined) {
    var info = elements[pixel.element];
    var oob = outOfBounds(nx, ny);
    if (isEmpty(nx, ny, false, oob)) { // If coords is empty, move to coords
        movePixel(pixel, nx, ny, leaveBehind);
        return true;
    }
    else if (!oob) {
        // Reactions
        newPixel = pixelMap[nx][ny];
        var rr1 = false;
        if (info.reactions !== undefined && info.reactions[newPixel.element] !== undefined) {
            rr1 = reactPixels(pixel, newPixel)
            if (rr1) {
                return true;
            }
        }
        if (!rr1 && elements[newPixel.element].reactions !== undefined && elements[newPixel.element].reactions[pixel.element] !== undefined && !elements[newPixel.element].reactions[pixel.element].oneway) {
            if (reactPixels(newPixel, pixel)) {
                return true;
            }
        }
        // Density
        if (elements[pixel.element].id !== elements[newPixel.element].id) {
            if (info.density !== undefined && elements[newPixel.element].density !== undefined) {
                // if the pixel's state + ">" + newPixel's state is in validDensitySwaps, and the pixel's density is larger than the newPixel's density, swap the pixels
                if (validDensitySwaps[info.state][elements[newPixel.element].state] && info.density >= elements[newPixel.element].density) {
                    // chance depending on the difference in density
                    if (Math.random() < (info.density - elements[newPixel.element].density) / (info.density + elements[newPixel.element].density)) {
                        swapPixels(pixel, newPixel);
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
function behaviorCoords(x, y, bx, by) {
    return { x: x + bx - 1, y: y + by - 1 };
}
function relativeCoords(x, y, bx, by) {
    return { x: bx - 1, y: by - 1 };
}
/* Behavior Example (Sand)
[
    ["XX","XX","XX"],
    ["XX","XX","XX"],
    ["M2","M1","M2"]
]                    */
behaviorCache = {};
function rotateBehavior(behavior, rotation) {
    // returns rotated 2D array counter-clockwise depending on rotation 1, 2, or 3
    // if the rotation is under 0, subtract it from 3
    if (rotation < 0) {
        rotation = 4 + rotation;
    }
    var check = behaviorCache[behavior.toString() + rotation];
    if (check != undefined) { return check; }

    var newBehavior = []
    if (rotation == 1) {
        // rotate counter-clockwise 90 degrees
        for (var i = 0; i < behavior.length; i++) {
            newBehavior[i] = [];
            for (var j = 0; j < behavior[i].length; j++) {
                newBehavior[i][j] = behavior[j][behavior.length - 1 - i];
            }
        }
    }
    else if (rotation == 2) {
        // rotate counter-clockwise 180 degrees
        for (var i = 0; i < behavior.length; i++) {
            newBehavior[i] = [];
            for (var j = 0; j < behavior[i].length; j++) {
                newBehavior[i][j] = behavior[behavior.length - 1 - i][behavior[i].length - 1 - j];
            }
        }
    }
    else if (rotation == 3) {
        // rotate counter-clockwise 270 degrees
        for (var i = 0; i < behavior.length; i++) {
            newBehavior[i] = [];
            for (var j = 0; j < behavior[i].length; j++) {
                newBehavior[i][j] = behavior[behavior[i].length - 1 - j][i];
            }
        }
    }
    else {
        // no rotation
        return behavior;
    }

    behaviorCache[behavior.toString() + rotation] = newBehavior;
    return newBehavior;
}
function flipBehavior(behavior, axis) {
    // returns flipped 2D array depending on axis "x" or "y"
    var check = behaviorCache[behavior.toString() + axis];
    if (check != undefined) { return check; }

    if (axis === "x") {
        var newBehavior = [];
        for (var i = 0; i < behavior.length; i++) {
            newBehavior[i] = [];
            for (var j = 0; j < behavior[i].length; j++) {
                newBehavior[i][j] = behavior[i][behavior[i].length - 1 - j];
            }
        }
        behaviorCache[behavior.toString() + axis] = newBehavior;
        return newBehavior;
    }
    else { // axis === y
        newBehavior = behavior.slice().reverse();
        behaviorCache[behavior.toString() + axis] = newBehavior;
        return newBehavior;
    }

    return behavior;
}

/* Behavior Rules
    XX = Ignore
    M1 = Move (First Priority)
    M2 = Move (Second Priority)
    SP = Support (Doesn't move if all aren't empty)
    SA = Support Any (Doesn't move if any aren't empty)
    DL = Delete
    DB = Delete Both (Self and target)
    CL = Clone
    CF = Clone first touched
    CH = Change
    C2 = Change Self after M2
    CR:element_name = Create a pixel of element_name
    LB:element_name = Leave behind a pixel of element_name when moved (Must be center cell)
    L1:element_name = Leave behind only on M1 moves
    L2:element_name = Leave behind only on M2 moves
    SW = Swap
    HT = Heat
    CO = Cool
    CC = Change Color (Hexadecimal)
    ST = Stick
    SH = Shock with electricity
    FX = Flip X
    FY = Flip Y
    RT = Rotate
    BO = Bounce off of
    EX:radius>fire substitute = Explode on touch
    %number = Chance of rule happening
*/
function pixelTick(pixel, custom = null) {
    if (pixel.start === pixelTicks) { return }
    var info = elements[pixel.element];
    if (custom) { var behavior = custom; }
    else if (pixel.charge && info.behaviorOn) { var behavior = info.behaviorOn; }
    else { var behavior = info.behavior; }
    if (pixel.flipX) { behavior = flipBehavior(behavior, "x"); }
    if (pixel.flipY) { behavior = flipBehavior(behavior, "y"); }
    if (pixel.r) { behavior = rotateBehavior(behavior, pixel.r); }
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
            if (b0 === "XX") { continue }
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
                else { var arg = null; }
                // If b has "%" followed by a number in it, it's a chance to move
                if (b.indexOf("%") !== -1) {
                    // Split the string at the "%" and use the second half as the chance (float)
                    var chance = parseFloat(b.split("%")[1]);
                    //console.log(b+": "+(Math.random()*100 < chance));
                    b = b.split(/[\:\%]/)[0];
                }
                else { var chance = 100; }
                if (chance == 100 || Math.random() * 100 < chance) {
                    var newCoords = behaviorCoords(x, y, bx, by);
                    switch (b) {
                        default: break;
                        case "M1":
                            if (info.viscosity !== undefined) {
                                if (!((Math.random() * 100) < 100 / Math.pow(info.viscosity, 0.25))) {
                                    newCoords.x = x;
                                }
                            }
                            move1Spots.push(newCoords);
                            break;
                        case "M2":
                            if (info.viscosity !== undefined) {
                                if (!((Math.random() * 100) < 100 / Math.pow(info.viscosity, 0.25))) {
                                    newCoords.x = x;
                                }
                            }
                            move2Spots.push(newCoords);
                            break;
                        case "SP":
                            supportSpots.push({ x: newCoords.x, y: newCoords.y, arg: arg });
                            break;
                        case "SA":
                            if (!isEmpty(newCoords.x, newCoords.y, true)) {
                                move = false;
                            }
                            break;
                        case "DL":
                            if (!isEmpty(newCoords.x, newCoords.y, true)) {
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
                                            deletePixel(newCoords.x, newCoords.y);
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
                            if (!isEmpty(newCoords.x, newCoords.y, true)) {
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
                                            deletePixel(newCoords.x, newCoords.y);
                                            if (pixelMap[pixel.x][pixel.y] != undefined) {
                                                deletePixel(pixel.x, pixel.y);
                                            }
                                            var deleted = true;
                                            swapSpots = [];
                                        }
                                    }
                                }
                            }
                            break;
                        case "CH":
                            if (!isEmpty(newCoords.x, newCoords.y, true)) {
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
                                        var argto = argto.split(",")[Math.floor(Math.random() * argto.split(",").length)];
                                    }
                                    if (elements[argto]) {
                                        if (elements[newPixel.element].id !== elements[argto].id) {
                                            changePixel(newPixel, argto);
                                        }
                                    }
                                }
                            }
                            break;
                        case "SW":
                            if (!isEmpty(newCoords.x, newCoords.y, true)) {
                                var newPixel = pixelMap[newCoords.x][newCoords.y];
                                if (arg != null) { var args = arg.split(","); }
                                if (arg == null || args.indexOf(newPixel.element) !== -1) {
                                    if (!elements[newPixel.element].hardness || Math.random() > elements[newPixel.element].hardness) {
                                        swapSpots.push({ x: newCoords.x, y: newCoords.y });
                                    }
                                }
                            }
                            break;
                        case "CR":
                            if (isEmpty(newCoords.x, newCoords.y)) {
                                if (arg == null) {
                                    arg = pixel.element;
                                }
                                else if (arg.indexOf(",") !== -1) {
                                    arg = arg.split(",")[Math.floor(Math.random() * arg.split(",").length)];
                                }
                                if (elements[arg]) {
                                    createPixel(arg, newCoords.x, newCoords.y);
                                    if (info.fireColor && arg === "fire") {
                                        pixelMap[newCoords.x][newCoords.y].color = pixelColorPick(pixelMap[newCoords.x][newCoords.y], info.fireColor);
                                    }
                                    pixelMap[newCoords.x][newCoords.y].temp = pixel.temp
                                }
                            }
                            break;
                        case "CL":
                            if (isEmpty(newCoords.x, newCoords.y)) {
                                if (arg == null || pixel.temp >= parseFloat(arg)) {
                                    clonePixel(pixel, newCoords.x, newCoords.y);
                                }
                            }
                            break;
                        case "CF":
                            if (pixel.clone) {
                                if (isEmpty(newCoords.x, newCoords.y)) {
                                    createPixel(pixel.clone, newCoords.x, newCoords.y);
                                    pixelMap[newCoords.x][newCoords.y].temp = pixel.temp;
                                }
                            }
                            else {
                                if (!isEmpty(newCoords.x, newCoords.y, true)) {
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
                            if (!isEmpty(newCoords.x, newCoords.y, true)) {
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
                            if (!isEmpty(newCoords.x, newCoords.y, true)) {
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
                                arg = arg.split(",")[Math.floor(Math.random() * arg.split(",").length)];
                            }
                            if (elements[arg]) {
                                if (b == "LB") { leaveBehind = arg; }
                                else if (b == "L1") { leaveBehind1 = arg; }
                                else if (b == "L2") { leaveBehind2 = arg; }
                            }
                            break;
                        case "CC":
                            if (!isEmpty(newCoords.x, newCoords.y, true)) {
                                var newPixel = pixelMap[newCoords.x][newCoords.y];
                                if (arg == null) { arg = newPixel.colorObject }
                                else {
                                    if (arg.indexOf(",") !== -1) {
                                        arg = arg.split(",")[Math.floor(Math.random() * arg.split(",").length)];
                                    }
                                    if (!arg.startsWith("#")) {
                                        arg = "#" + arg;
                                    }
                                }
                                newPixel.color = pixelColorPick(newPixel, arg);
                            }
                            break;
                        case "HT":
                            if (!isEmpty(newCoords.x, newCoords.y, true)) {
                                var newPixel = pixelMap[newCoords.x][newCoords.y];
                                // if the element isn't the same or the coords ARE the same
                                if (!(newPixel.element == pixel.element) || (newCoords.x == pixel.x && newCoords.y == pixel.y)) {
                                    if (arg != null) { arg = parseFloat(arg) }
                                    else { arg = 1 }
                                    if (isNaN(arg)) { arg = 1 }
                                    newPixel.temp += arg;
                                    pixelTempCheck(newPixel);
                                }
                            }
                            break;
                        case "CO":
                            if (!isEmpty(newCoords.x, newCoords.y, true)) {
                                var newPixel = pixelMap[newCoords.x][newCoords.y];
                                if (!(newPixel.element == pixel.element) || (newCoords.x == pixel.x && newCoords.y == pixel.y)) {
                                    if (arg != null) { arg = parseFloat(arg) }
                                    else { arg = 1 }
                                    if (isNaN(arg)) { arg = 1 }
                                    newPixel.temp -= arg;
                                    pixelTempCheck(newPixel);
                                }
                            }
                            break;
                        case "FX":
                            if (!isEmpty(newCoords.x, newCoords.y, true)) {
                                var newPixel = pixelMap[newCoords.x][newCoords.y];
                                if (elements[newPixel.element].flippableX) {
                                    if (arg === "0") { newPixel.flipX = false; }
                                    else if (arg === "1") { newPixel.flipX = true; }
                                    newPixel.flipX = !newPixel.flipX;
                                }
                            }
                            break;
                        case "FY":
                            if (!isEmpty(newCoords.x, newCoords.y, true)) {
                                var newPixel = pixelMap[newCoords.x][newCoords.y];
                                if (elements[newPixel.element].flippableY) {
                                    if (arg === "0") { newPixel.flipY = false; }
                                    else if (arg === "1") { newPixel.flipY = true; }
                                    else { newPixel.flipY = !newPixel.flipY; }
                                }
                            }
                            break;
                        case "RT":
                            if (!isEmpty(newCoords.x, newCoords.y, true)) {
                                var newPixel = pixelMap[newCoords.x][newCoords.y];
                                // If arg isn't null, set arg to a random choice from arg.split(",")
                                if (arg != null && arg.indexOf(",") !== -1) {
                                    arg = arg.split(",")[Math.floor(Math.random() * arg.split(",").length)];
                                }
                                if (elements[newPixel.element].rotatable) {
                                    newPixel.r = ((newPixel.r || 0) + (parseInt(arg) || 1)) % 4;
                                }
                            }
                            break;
                        case "BO":
                            if (!isEmpty(newCoords.x, newCoords.y) && (outOfBounds(newCoords.x, newCoords.y) || elements[pixelMap[newCoords.x][newCoords.y].element].id === elements[pixel.element].id || elements[pixelMap[newCoords.x][newCoords.y].element].state === "solid")) {
                                if (info.flippableX) {
                                    pixel.flipX = !pixel.flipX;
                                }
                                if (info.flippableY) {
                                    pixel.flipY = !pixel.flipY;
                                }
                                if (info.rotatable) {
                                    // If arg isn't null, set arg to a random choice from arg.split(",")
                                    if (arg != null && arg.indexOf(",") !== -1) {
                                        arg = arg.split(",")[Math.floor(Math.random() * arg.split(",").length)];
                                    }
                                    if (pixel.r !== undefined) {
                                        pixel.r = (pixel.r + (parseInt(arg) || 2)) % 4;
                                    }
                                    else { pixel.r = (parseInt(arg) || 2); }
                                }
                            }
                            break;
                        case "C2":
                            if (arg.indexOf(",") !== -1) {
                                arg = arg.split(",")[Math.floor(Math.random() * arg.split(",").length)];
                            }
                            var C2 = arg;
                            break;
                        case "EX":
                            if (!isEmpty(newCoords.x, newCoords.y)) {
                                if (outOfBounds(newCoords.x, newCoords.y) || (newCoords.x == x && newCoords.y == y) || (pixel.element !== pixelMap[newCoords.x][newCoords.y].element && elements[pixelMap[newCoords.x][newCoords.y].element].state !== "gas")) {
                                    // if arg contains ">", var fire = everything after it, arg = everything before it
                                    if (arg.indexOf(">") !== -1) {
                                        var fire = arg.split(">")[1];
                                        arg = arg.split(">")[0];
                                    }
                                    else { var fire = "fire" }
                                    // arg = a number
                                    if (arg != null) {
                                        arg = parseInt(arg);
                                        if (isNaN(arg)) { arg = 3 }
                                    }
                                    else { arg = 3 }
                                    explodeAt(x, y, arg, fire);
                                    if (!pixel.del && info.hardness !== 1) {
                                        deletePixel(x, y);
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
    if (typeof deleted !== "undefined") { return; }
    if (supportSpots.length > 0) {
        var supportCount = 0;
        var allEmpty = true;
        for (var i = 0; i < supportSpots.length; i++) {
            var bx = supportSpots[i].x;
            var by = supportSpots[i].y;
            var arg = supportSpots[i].arg;
            if (!isEmpty(bx, by, true)) {
                if (info.ignore && info.ignore.indexOf(pixelMap[bx][by].element) !== -1) { continue; }
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
        var coords = swapSpots[Math.floor(Math.random() * swapSpots.length)];
        if (pixelMap[coords.x][coords.y] != undefined) {
            swapPixels(pixel, pixelMap[coords.x][coords.y]);
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
                var coords = move1Spots[Math.floor(Math.random() * move1Spots.length)];
                var nx = coords.x;
                var ny = coords.y;
                moved = tryMove(pixel, nx, ny, leaveBehind1 || leaveBehind);
                if (moved) {
                    break;
                }
                else {
                    // remove coords from move1Spots
                    move1Spots.splice(move1Spots.indexOf(coords), 1);
                }


            }
        }
        // Move Second Priority
        if (!moved && move2Spots.length > 0) {
            // While move2Spots is not empty
            while (move2Spots.length > 0) {
                // coords = random item of move2Spots
                var coords = move2Spots[Math.floor(Math.random() * move2Spots.length)];
                var nx = coords.x;
                var ny = coords.y;
                moved = tryMove(pixel, nx, ny, leaveBehind2 || leaveBehind);
                if (moved) {
                    if (typeof C2 !== "undefined" && elements[C2]) {
                        changePixel(pixel, C2);
                    }
                    break;
                }
                else {
                    // remove coords from move2Spots
                    move2Spots.splice(move2Spots.indexOf(coords), 1);
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

function doDefaults(pixel) {
    if (pixel.del) { return }
    var info = elements[pixel.element];
    if (info.insulate !== true) { doHeat(pixel) };
    doAirDensity(pixel);
    doBurning(pixel);
    doElectricity(pixel);
    if (info.stain) { doStaining(pixel) };
}

function doAirDensity(pixel) {
    if (pixel.del) { return }
    var info = elements[pixel.element];
    if (!info.ignoreAir && info.density !== undefined && info.movable === true && info.density < airDensity) {
        // Air Density
        // if the pixel's state + ">" + newPixel's state is in validDensitySwaps, and the pixel's density is larger than the newPixel's density, swap the pixels
        if (validDensitySwaps.gas[info.state]) {
            // chance depending on the difference in density
            if (Math.random() < (airDensity - info.density) / (airDensity + info.density)) {
                tryMove(pixel, pixel.x, pixel.y - 1);
            }
        }
    }
}

function doBurning(pixel) {
    if (settings.burn === 0) { return }
    if (pixel.burning) { // Burning
        var info = elements[pixel.element];
        pixel.temp += 1;
        pixelTempCheck(pixel);
        if (pixel.temp < 0) {
            delete pixel.burning;
            delete pixel.burnStart;
            return;
        }
        for (var i = 0; i < adjacentCoords.length; i++) { // Burn adjacent pixels
            var x = pixel.x + adjacentCoords[i][0];
            var y = pixel.y + adjacentCoords[i][1];
            if (!isEmpty(x, y, true)) {
                var newPixel = pixelMap[x][y];
                if (elements[newPixel.element].burn && !newPixel.burning) {
                    if (Math.floor(Math.random() * 100) < elements[newPixel.element].burn) {
                        newPixel.burning = true;
                        newPixel.burnStart = pixelTicks;
                    }
                }
            }
        }

        if ((pixelTicks - pixel.burnStart > (info.burnTime || 200)) && Math.floor(Math.random() * 100) < (info.burn || 10)) {
            var burnInto = info.burnInto;
            if (burnInto == undefined) {
                burnInto = 'fire';
            }
            else if (burnInto instanceof Array) {
                burnInto = burnInto[Math.floor(Math.random() * burnInto.length)];
            }
            changePixel(pixel, burnInto);
            if (info.fireColor != undefined && burnInto == "fire") {
                pixel.color = pixelColorPick(pixel, info.fireColor);
            }
            else {
                pixel.color = pixelColorPick(pixel)
            }
        }
        else if (Math.floor(Math.random() * 100) < 10 && pixel.element != "fire") { // Spawn fire
            if (isEmpty(pixel.x, pixel.y - 1)) {
                createPixel((info.fireElement || "fire"), pixel.x, pixel.y - 1);
                pixelMap[pixel.x][pixel.y - 1].temp = pixel.temp//+(pixelTicks - (pixel.burnStart || 0));
                if (info.fireColor != undefined) {
                    pixelMap[pixel.x][pixel.y - 1].color = pixelColorPick(pixelMap[pixel.x][pixel.y - 1], info.fireColor);
                }
            }
            // same for below if top is blocked
            else if (isEmpty(pixel.x, pixel.y + 1)) {
                createPixel((info.fireElement || "fire"), pixel.x, pixel.y + 1);
                pixelMap[pixel.x][pixel.y + 1].temp = pixel.temp//+(pixelTicks - (pixel.burnStart || 0));
                if (info.fireColor != undefined) {
                    pixelMap[pixel.x][pixel.y + 1].color = pixelColorPick(pixelMap[pixel.x][pixel.y + 1], info.fireColor);
                }
            }
        }

    }
}

function doHeat(pixel) {
    // Check right and bottom adjacent pixels
    for (var i = 0; i < biCoords.length; i++) {
        var x = pixel.x + biCoords[i][0];
        var y = pixel.y + biCoords[i][1];
        if (!isEmpty(x, y, true)) {
            var newPixel = pixelMap[x][y];
            // Skip if both temperatures are the same
            if (pixel.temp == newPixel.temp || elements[newPixel.element].insulate == true) {
                continue;
            }
            // Set both pixel temperatures to their average
            var avg = (pixel.temp + newPixel.temp) / 2;
            pixel.temp = avg;
            newPixel.temp = avg;
            pixelTempCheck(pixel);
            pixelTempCheck(newPixel);
        }
    }
}

function doElectricity(pixel) {
    if (pixel.charge) {
        // Check each adjacent pixel, if that pixel's charge is false, set it to the same charge
        for (var i = 0; i < adjacentCoords.length; i++) {
            var x = pixel.x + adjacentCoords[i][0];
            var y = pixel.y + adjacentCoords[i][1];
            if (!isEmpty(x, y, true)) {
                var newPixel = pixelMap[x][y];
                var con = elements[newPixel.element].conduct;
                if (con == undefined) { continue }
                if (Math.random() < con) { // If random number is less than conductivity
                    if (!newPixel.charge && !newPixel.chargeCD) {
                        newPixel.charge = 1;
                        if (elements[newPixel.element].colorOn) {
                            newPixel.color = pixelColorPick(newPixel);
                        }
                    }
                }
                else if (elements[newPixel.element].insulate != true) { // Otherwise heat the pixel (Resistance simulation)
                    newPixel.temp += pixel.charge / 4;
                    pixelTempCheck(newPixel);
                }
            }
        }
        pixel.charge -= 0.25;
        if (pixel.charge <= 0) {
            delete pixel.charge;
            pixel.chargeCD = 4;
        }
    }
    // Lower charge cooldown
    else if (pixel.chargeCD) {
        pixel.chargeCD -= 1;
        if (pixel.chargeCD <= 0) {
            delete pixel.chargeCD;
            if (elements[pixel.element].colorOn) {
                pixel.color = pixelColorPick(pixel);
            }
        }
    }
}

solidStates = { solid: true };
liquidStates = { liquid: true };
gasStates = { gas: true };

function doStaining(pixel) {
    if (settings["stain"] === 0) { return }
    var stain = elements[pixel.element].stain;
    if (stain > 0) {
        var newColor = pixel.color.match(/\d+/g);
    }
    else {
        var newColor = null;
    }

    for (var i = 0; i < adjacentCoords.length; i++) {
        var x = pixel.x + adjacentCoords[i][0];
        var y = pixel.y + adjacentCoords[i][1];
        if (!isEmpty(x, y, true)) {
            var newPixel = pixelMap[x][y];
            if (elements[pixel.element].ignore && elements[pixel.element].ignore.indexOf(newPixel.element) !== -1) {
                continue;
            }
            if ((elements[newPixel.element].id !== elements[pixel.element].id || elements[newPixel.element].stainSelf) && (solidStates[elements[newPixel.element].state] || elements[newPixel.element].id === elements[pixel.element].id)) {
                if (Math.random() < Math.abs(stain)) {
                    if (stain < 0) {
                        if (newPixel.origColor) {
                            newColor = newPixel.origColor;
                        }
                        else { continue; }
                    }
                    else if (!newPixel.origColor) {
                        newPixel.origColor = newPixel.color.match(/\d+/g);
                    }
                    // if newPixel.color doesn't start with rgb, continue
                    if (!newPixel.color.match(/^rgb/)) { continue; }
                    // parse rgb color string of newPixel rgb(r,g,b)
                    var rgb = newPixel.color.match(/\d+/g);
                    if (elements[pixel.element].stainSelf && elements[newPixel.element].id === elements[pixel.element].id) {
                        // if rgb and newColor are the same, continue
                        if (rgb[0] === newColor[0] && rgb[1] === newColor[1] && rgb[2] === newColor[2]) { continue; }
                        var avg = [];
                        for (var j = 0; j < rgb.length; j++) {
                            avg[j] = Math.round((rgb[j] * (1 - Math.abs(stain))) + (newColor[j] * Math.abs(stain)));
                        }
                    }
                    else {
                        // get the average of rgb and newColor, more intense as stain reaches 1 
                        var avg = [];
                        for (var j = 0; j < rgb.length; j++) {
                            avg[j] = Math.floor((rgb[j] * (1 - Math.abs(stain))) + (newColor[j] * Math.abs(stain)));
                        }
                    }
                    // set newPixel color to avg
                    newPixel.color = "rgb(" + avg.join(",") + ")";
                }
            }
        }
    }
}

function pixelColorPick(pixel, customColor = null) {
    var element = pixel.element;
    var elementInfo = elements[element];
    //if (elementInfo.behavior instanceof Array) {

    if (pixel.charge && elementInfo.colorOn) {
        customColor = elementInfo.colorOn;
    }
    if (customColor != null) {
        if (Array.isArray(customColor)) {
            customColor = customColor[Math.floor(Math.random() * customColor.length)];
        }
        if (customColor.startsWith("#")) {
            customColor = hexToRGB(customColor);
        }
        var rgb = customColor;
    }
    else {
        var rgb = elements[element].colorObject; // {r, g, b}
        // If rgb is an array, choose a random item
        if (Array.isArray(rgb)) {
            rgb = rgb[Math.floor(Math.random() * rgb.length)];
        }
    }
    // Randomly darken or lighten the RGB color
    var coloroffset = Math.floor(Math.random() * (Math.random() > 0.5 ? -1 : 1) * Math.random() * 15);
    var r = rgb.r + coloroffset;
    var g = rgb.g + coloroffset;
    var b = rgb.b + coloroffset;
    // Make sure the color is within the RGB range
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
    var color = "rgb(" + r + "," + g + "," + b + ")";

    /*}
    else {
        var color = elementInfo.color;
        if (Array.isArray(color)) {
            color = color[Math.floor(Math.random() * color.length)];
        }
    }*/
    return color;
}
function pixelTempCheck(pixel) {
    var elementInfo = elements[pixel.element];
    if (pixel.temp < absoluteZero) { // Absolute Zero
        pixel.temp = absoluteZero;
    }
    // If the pixel's temp >= the elementInfo tempHigh, change pixel.element to elementInfo.stateHigh
    if (pixel.temp >= elementInfo.tempHigh) {
        var result = elementInfo.stateHigh;
        if (elementInfo.extraTempHigh) {
            for (var extraTemp in elementInfo.extraTempHigh) {
                if (pixel.temp >= extraTemp) {
                    result = elementInfo.extraTempHigh[extraTemp];
                }
            }
        }
        // If result is an array, choose a random item
        if (Array.isArray(result)) {
            result = result[Math.floor(Math.random() * result.length)];
        }
        if (result === null) { deletePixel(pixel.x, pixel.y); return false }
        else {
            if (elements[result].customColor) {
                var color = pixel.color;
                changePixel(pixel, result, false);
                pixel.color = color;
            }
            else if (elementInfo.stateHighColorMultiplier) {
                var color = pixel.color;
                changePixel(pixel, result, false);
                var rgb = color.match(/\d+/g);
                var m = elementInfo.stateHighColorMultiplier;
                if (Array.isArray(m)) {
                    m = m[Math.floor(Math.random() * m.length)];
                }
                var r = Math.floor(rgb[0] * m);
                var g = Math.floor(rgb[1] * m);
                var b = Math.floor(rgb[2] * m);
                // Make sure the color is within the RGB range
                r = Math.max(0, Math.min(255, r));
                g = Math.max(0, Math.min(255, g));
                b = Math.max(0, Math.min(255, b));
                pixel.color = "rgb(" + r + "," + g + "," + b + ")";
            }
            else { changePixel(pixel, result, false); }
            if (elementInfo.fireColor && result === "fire") {
                pixel.color = pixelColorPick(pixel, elementInfo.fireColor);
            }
        }
    }
    // If the pixel's temp <= the elementInfo tempLow, change pixel.element to elementInfo.stateLow
    else if (pixel.temp <= elementInfo.tempLow) {
        var result = elementInfo.stateLow;
        if (elementInfo.extraTempLow) {
            for (var extraTemp in elementInfo.extraTempLow) {
                if (pixel.temp <= extraTemp) {
                    result = elementInfo.extraTempLow[extraTemp];
                }
            }
        }
        // If result is an array, choose a random item
        if (Array.isArray(result)) {
            result = result[Math.floor(Math.random() * result.length)];
        }
        if (result === null) { deletePixel(pixel.x, pixel.y); return false }
        else {
            if (elements[result].customColor) {
                var color = pixel.color;
                changePixel(pixel, result, false);
                pixel.color = color;
            }
            else if (elementInfo.stateLowColorMultiplier) {
                var color = pixel.color;
                changePixel(pixel, result, false);
                var rgb = color.match(/\d+/g);
                var m = elementInfo.stateLowColorMultiplier;
                if (Array.isArray(m)) {
                    m = m[Math.floor(Math.random() * m.length)];
                }
                var r = Math.floor(rgb[0] * m);
                var g = Math.floor(rgb[1] * m);
                var b = Math.floor(rgb[2] * m);
                // Make sure the color is within the RGB range
                r = Math.max(0, Math.min(255, r));
                g = Math.max(0, Math.min(255, g));
                b = Math.max(0, Math.min(255, b));
                pixel.color = "rgb(" + r + "," + g + "," + b + ")";
            }
            else { changePixel(pixel, result, false); }
        }
    }
    return true;
}
function getNeighbors(pixel) {
    var neighbors = [];
    var x = pixel.x;
    var y = pixel.y;
    if (!isEmpty(x - 1, y, true)) { neighbors.push(pixelMap[x - 1][y]); }
    if (!isEmpty(x + 1, y, true)) { neighbors.push(pixelMap[x + 1][y]); }
    if (!isEmpty(x, y - 1, true)) { neighbors.push(pixelMap[x][y - 1]); }
    if (!isEmpty(x, y + 1, true)) { neighbors.push(pixelMap[x][y + 1]); }
    return neighbors;
}

function circleCoords(x, y, radius) {
    var coords = [];
    for (var i = x - radius; i <= x + radius; i++) {
        for (var j = y - radius; j <= y + radius; j++) {
            if (Math.pow(i - x, 2) + Math.pow(j - y, 2) <= Math.pow(radius, 2)) {
                coords.push({ x: i, y: j });
            }
        }
    }
    return coords;
}
function lineCoords(x1, y1, x2, y2, width) {
    // use the coordinates and the width to return a list of coordinates in a pixel line
    var coords = [];
    var x = x1;
    var y = y1;
    var dx = Math.abs(x2 - x1);
    var dy = Math.abs(y2 - y1);
    var sx = (x1 < x2) ? 1 : -1;
    var sy = (y1 < y2) ? 1 : -1;
    var err = dx - dy;
    while (true) {
        coords.push([x, y]);
        if (x == x2 && y == y2) { break; }
        var e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x += sx; }
        if (e2 < dx) { err += dx; y += sy; }
    }
    var newcoords = [];
    // loop through mouseRange(x,y,width) of each coordinate and add to coords if not already in coords
    for (var i = 0; i < coords.length; i++) {
        var x = coords[i][0];
        var y = coords[i][1];
        var range = mouseRange(x, y, width);
        for (var j = 0; j < range.length; j++) {
            var x2 = range[j][0];
            var y2 = range[j][1];
            if (!coords.indexOf([x2, y2]) > -1) {
                newcoords.push([x2, y2]);
            }
        }
    }
    return newcoords;
}
function drawCirclePixels(x, y, radius) {
    var coords = circleCoords(x, y, radius);
    for (var i = 0; i < coords.length; i++) {
        if (isEmpty(coords[i].x, coords[i].y)) {
            createPixel(currentElement, coords[i].x, coords[i].y);
        }
    }
}
// pixelMap is a 2D array of pixels.
// function to get a new 2D array of pixels from a rectangular area
function selection(x1, y1, x2, y2) {
    var selection = [];
    for (var i = x1; i <= x2; i++) {
        selection[i] = [];
        for (var j = y1; j <= y2; j++) {
            selection[i][j] = pixelMap[i][j];
        }
    }
    return selection;
}
unicodeSkips = {
    0: 65, // null -> 0
    58: 65, // : -> A
    91: 97, // [ -> a
    123: 192, // { -> À
    215: 216, // × -> Ø
    247: 248, // ÷ -> ø
    688: 880,
    884: 886,
    888: 891,
    894: 895,
    896: 902,
    903: 904,
    907: 908,
    909: 910,
    930: 931,
    1155: 1162,
    1328: 1329,
    1367: 1376,
    1417: 1488,
    1514: 12448,
    12544: 13312
};
// version;codes;pixels;
function generateSave(pixelarray = null) {
    if (pixelarray == null) {
        pixelarray = pixelMap;
    }
    var n = 65;
    var codes = "";
    var codelist = { " ": " " };
    var save = "";
    // Add char*the number of consecutive pixels with the same element
    var lastelem = "";
    var samecount = 0;
    for (var i = 0; i < pixelarray.length; i++) {
        for (var j = 0; j < pixelarray[i].length; j++) {
            var pixel = pixelarray[i][j];
            if (pixel) {
                if (codelist[pixel.element] == undefined) {
                    var char = String.fromCharCode(n);
                    codelist[pixel.element] = char;
                    codes += char + "=" + pixel.element + ",";
                    n++;
                }
                if (pixel.element == lastelem) {
                    samecount++;
                }
                else {
                    if (samecount > 0) {
                        save += codelist[lastelem] + "*" + samecount;
                    }
                    samecount = 1;
                    lastelem = pixel.element;
                }
            }
            else {
                // use " " for empty pixels
                if (lastelem == " ") {
                    samecount++;
                }
                else {
                    if (samecount > 0) {
                        save += codelist[lastelem] + "*" + samecount
                    }
                    samecount = 1;
                    lastelem = " ";
                }
            }
        }
        save += "|";
    }
    // save = codes(without the last character) + save
    save = codes.slice(0, -1) + ";" + save;
    return save;
}
function explodeAt(x, y, radius, fire = "fire") {
    // if fire contains , split it into an array
    if (fire.indexOf(",") !== -1) {
        fire = fire.split(",");
    }
    var coords = circleCoords(x, y, radius);
    var power = radius / 10;
    //for (var p = 0; p < Math.round(radius/10+1); p++) {
    for (var i = 0; i < coords.length; i++) {
        // damage value is based on distance from x and y
        var damage = Math.random() + (Math.floor(Math.sqrt(Math.pow(coords[i].x - x, 2) + Math.pow(coords[i].y - y, 2)))) / radius;
        // invert
        damage = 1 - damage;
        if (damage < 0) { damage = 0; }
        damage *= power;
        if (isEmpty(coords[i].x, coords[i].y)) {
            // create smoke or fire depending on the damage if empty
            if (damage < 0.02) { } // do nothing
            else if (damage < 0.2) {
                createPixel("smoke", coords[i].x, coords[i].y);
            }
            else {
                // if fire is an array, choose a random item
                if (Array.isArray(fire)) {
                    createPixel(fire[Math.floor(Math.random() * fire.length)], coords[i].x, coords[i].y);
                }
                else {
                    createPixel(fire, coords[i].x, coords[i].y);
                }
            }
        }
        else if (!outOfBounds(coords[i].x, coords[i].y)) {
            // damage the pixel
            var pixel = pixelMap[coords[i].x][coords[i].y];
            var info = elements[pixel.element];
            if (info.hardness) { // lower damage depending on hardness(0-1)
                if (info.hardness < 1) {
                    // more hardness = less damage, logarithmic
                    damage *= Math.pow((1 - info.hardness), info.hardness);
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
                changePixel(pixel, newfire);
                continue;
            }
            else if (damage > 0.25) {
                if (info.breakInto) {
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
                    changePixel(pixel, newfire);
                    continue;
                }
            }
            if (damage > 0.75 && info.burn) {
                pixel.burning = true;
                pixel.burnStart = pixelTicks;
            }
            pixel.temp += damage * radius * power;
            pixelTempCheck(pixel);
        }
    }
}
function breakPixel(pixel) {
    if (!elements[pixel.element].breakInto) { return; }
    // if it is an array, choose a random item, else just use the value
    if (Array.isArray(elements[pixel.element].breakInto)) {
        var result = elements[pixel.element].breakInto[Math.floor(Math.random() * elements[pixel.element].breakInto.length)];
    }
    else {
        var result = elements[pixel.element].breakInto;
    }
    // change the pixel to the result
    if (result === null) {
        deletePixel(pixel.x, pixel.y);
        return;
    }
    if (elements[pixel.element].breakIntoColor) {
        var oldelement = pixel.element;
        changePixel(pixel, result);
        pixel.color = pixelColorPick(pixel, elements[oldelement].breakIntoColor);
    }
    else {
        changePixel(pixel, result);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
adjacentCoords = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
];
biCoords = [
    [0, 1],
    [1, 0]
];
function drawPixels(forceTick = false) {
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
        if (pixel.del) { continue }
        if (!paused || forceTick) {
            if (elements[pixel.element].tick) { // Run tick function if it exists
                elements[pixel.element].tick(pixel);
            }
            if (pixel.del) { continue }
            if (elements[pixel.element].behavior) { // Parse behavior if it exists
                pixelTick(pixel);
            }
        };
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
    var pixelDrawList = pixelsFirst.concat(pixelsLast);
    for (var i = 0; i < pixelDrawList.length; i++) {
        pixel = pixelDrawList[i];
        if (pixelMap[pixel.x][pixel.y] == undefined) { continue }
        if (view === null || view === 3) {
            ctx.fillStyle = pixel.color;
        }
        else if (view === 2) { // thermal view
            // set the color to pixel.temp, from hottest at 0 hue to coldest 225 hue, with the minimum being -273, max being 6000
            var temp = pixel.temp;
            if (temp < -273) { temp = -273 }
            if (temp > 6000) { temp = 6000 }
            var hue = 225 - (temp / 6000) * 225;
            if (hue < 0) { hue = 0 }
            if (hue > 225) { hue = 225 }
            ctx.fillStyle = "hsl(" + hue + ",100%,50%)";
        }
        else if (view === 4) { // smooth view, average of surrounding pixels
            var colorlist = [];
            // check adjacent coords on the pixelMap, add the color to the list if the pixel is not empty and the color indexOf "rgb" is not -1
            for (var j = 0; j < biCoords.length; j++) {
                var x = pixel.x + biCoords[j][0];
                var y = pixel.y + biCoords[j][1];
                if (isEmpty(x, y, true) || elements[pixelMap[x][y].element].state !== elements[pixel.element].state) { continue }
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
            if (ctx.globalAlpha !== 0.5) { ctx.globalAlpha = 0.5; }
            ctx.fillRect((pixel.x - 1) * pixelSize, (pixel.y) * pixelSize, pixelSize * 3, pixelSize);
            ctx.fillRect((pixel.x) * pixelSize, (pixel.y - 1) * pixelSize, pixelSize, pixelSize * 3);
        }
        else { // draw the pixel (default)
            ctx.fillRect(pixel.x * pixelSize, pixel.y * pixelSize, pixelSize, pixelSize);
        }
        if (pixel.charge && view !== 2) { // Yellow glow on charge
            if (!elements[pixel.element].colorOn) {
                ctx.fillStyle = "rgba(255,255,0,0.5)";
                ctx.fillRect(pixel.x * pixelSize, pixel.y * pixelSize, pixelSize, pixelSize);
            }
        }
    }
    if (ctx.globalAlpha < 1) {
        ctx.globalAlpha = 1;
    }
    if ((!paused) || forceTick) { pixelTicks++ };
}
function tick() {
    if (!elements) return;

    // If mouseIsDown, do mouseAction
    if (mouseIsDown && !shaping) {
        mouseAction(null, mousePos.x, mousePos.y);
    }
    // Get the canvas
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    // Clear the canvas
    if (!settings["bg"]) { ctx.clearRect(0, 0, canvas.width, canvas.height) }
    else {
        ctx.fillStyle = settings["bg"];
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (!paused && settings.events) {
        doRandomEvents();
    }

    drawPixels();

    if (shaping) {
        if (shaping === 1) { // Draw a white line from shapeStart.x to shapeStart.y
            ctx.beginPath();
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;
            ctx.moveTo(shapeStart.x * pixelSize + pixelSizeHalf, shapeStart.y * pixelSize + pixelSizeHalf);
            ctx.lineTo(mousePos.x * pixelSize + pixelSizeHalf, mousePos.y * pixelSize + pixelSizeHalf);
            ctx.stroke();
            ctx.lineWidth = 1;
        }
    }

    if (elements[currentElement].maxSize < mouseSize) {
        var mouseOffset = Math.trunc(elements[currentElement].maxSize / 2);
    }
    else {
        var mouseOffset = Math.trunc(mouseSize / 2);
    }
    var topLeft = [mousePos.x - mouseOffset, mousePos.y - mouseOffset];
    var bottomRight = [mousePos.x + mouseOffset, mousePos.y + mouseOffset];
    // Draw a rectangle around the mouse
    ctx.strokeStyle = "white";
    ctx.strokeRect(topLeft[0] * pixelSize, topLeft[1] * pixelSize, (bottomRight[0] - topLeft[0] + 1) * pixelSize, (bottomRight[1] - topLeft[1] + 1) * pixelSize);
    updateStats();
    //ticks ++;
}

currentElement = "sand";
currentColor = "#ff0000";
mouseIsDown = false;
isMobile = false;
mouseType = null;
function mouseClick(e) {
    if (showingMenu && currentElement != "lookup") {
        closeMenu();
        return false;
    }
    mouseIsDown = true;
    lastPlace = 0;
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
    else if (shiftDown && e.button !== 1 && !((elements[currentElement].tool || elements[currentElement].category === "tools") && mouseType === "left")) {
        shaping = 1;
        shapeStart = mousePos;
    }
    mouseMove(e);
    return false;
}
function placeImage(placementX, placementY, scale) {
    if (!scale) { scale = mouseSize }
    // downscale the <img to mouseSize x mouseSize and draw it
    var canvas = document.createElement("canvas");
    // set width or height proportional to mouseSize
    if (placingImage.width > placingImage.height) {
        canvas.width = mouseSize;
        canvas.height = Math.round(placingImage.height / placingImage.width * mouseSize);
    }
    else {
        canvas.height = mouseSize;
        canvas.width = Math.round(placingImage.width / placingImage.height * mouseSize);
    }
    var newWidth = canvas.width;
    var newHeight = canvas.height;
    var ctx = canvas.getContext("2d");
    if (settings.imagesmooth === 0) {
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
    }
    ctx.drawImage(placingImage, 0, 0, newWidth, newHeight);
    var newImage = ctx.getImageData(0, 0, newWidth, newHeight);
    // loop through each pixel in the ImageData
    for (var x = 0; x < newWidth; x++) {
        for (var y = 0; y < newHeight; y++) {
            var i = (y * newWidth + x) * 4;
            var r = newImage.data[i];
            var g = newImage.data[i + 1];
            var b = newImage.data[i + 2];
            var a = newImage.data[i + 3];
            if (a > 0.33) {
                // mousePos is the center of the image
                var pixelX = (placementX || mousePos.x) - Math.round(newWidth / 2) + x + 1;
                var pixelY = (placementY || mousePos.y) - Math.round(newHeight / 2) + y + 1;
                if (isEmpty(pixelX, pixelY)) {
                    var elem = (settings.imageelem || "wood");
                    if (!elements[elem]) { elem = "wood"; }
                    createPixel(elem, pixelX, pixelY);
                    pixelMap[pixelX][pixelY].color = pixelColorPick(pixelMap[pixelX][pixelY], RGBToHex([r, g, b]));
                }
            }
        }
    }
}
function mouseUp(e) {
    mouseIsDown = false;
    if (shaping) {
        if (shaping === 1) { // Draw a line
            mouseAction(null, mousePos.x, mousePos.y, shapeStart);
        }
        shaping = 0;
        shapeStart = null;
    }
}

function getMousePos(canvas, evt) {
    // If evt.touches is defined, use the first touch
    if (evt.touches) {
        evt.preventDefault();
        evt = evt.touches[0];
        isMobile = true;
    }
    var rect = canvas.getBoundingClientRect();
    return {
        // Round to nearest pixel
        x: Math.round((evt.clientX - rect.left) / pixelSize - 0.5),
        y: Math.round((evt.clientY - rect.top) / pixelSize - 0.5)
    };
}
function mouseMove(e) {
    if (mouseIsDown && !shaping && !placingImage) {
        mouseAction(e);
    }
    else {
        var canvas = document.getElementById("game");
        lastPos = mousePos;
        mousePos = getMousePos(canvas, e);
    }
}
function mouseAction(e, mouseX, mouseY, startPos) {
    if (mouseType == "left") { mouse1Action(e, mouseX, mouseY, startPos); }
    else if (mouseType == "right") { mouse2Action(e, mouseX, mouseY, startPos); }
    else if (mouseType == "middle") { mouseMiddleAction(e, mouseX, mouseY); }
}
mouseSize = 5;
mousePos = { x: 0, y: 0 };
lastPos = mousePos;
lastPlace = 0;
function mouseRange(mouseX, mouseY, size) {
    var coords = [];
    size = size || mouseSize;
    if (elements[currentElement].maxSize < mouseSize) {
        var mouseOffset = Math.trunc(elements[currentElement].maxSize / 2);
    }
    else {
        var mouseOffset = Math.trunc(size / 2);
    }
    var topLeft = [mouseX - mouseOffset, mouseY - mouseOffset];
    var bottomRight = [mouseX + mouseOffset, mouseY + mouseOffset];
    // Starting at the top left, go through each pixel
    for (var x = topLeft[0]; x <= bottomRight[0]; x++) {
        for (var y = topLeft[1]; y <= bottomRight[1]; y++) {
            // If the pixel is empty, add it to coords
            coords.push([x, y]);
        }
    }
    return coords;
}
function mouse1Action(e, mouseX = undefined, mouseY = undefined, startPos) {
    if (currentElement == "erase") { mouse2Action(e, mouseX, mouseY); return; }
    else if (currentElement == "pick") { mouseMiddleAction(e, mouseX, mouseY); return; }
    // If x and y are undefined, get the mouse position
    if (mouseX == undefined && mouseY == undefined) {
        var canvas = document.getElementById("game");
        var ctx = canvas.getContext("2d");
        lastPos = mousePos;
        mousePos = getMousePos(canvas, e);
        var mouseX = mousePos.x;
        var mouseY = mousePos.y;
    }
    if (currentElement == "lookup") {
        if (!isEmpty(mouseX, mouseY, true)) {
            showInfo(pixelMap[mouseX][mouseY].element);
        }
        return;
    }
    var cooldowned = false;
    if ((mouseSize === 1 || elements[currentElement].maxSize === 1) && elements[currentElement].cooldown) {
        if (pixelTicks - lastPlace < elements[currentElement].cooldown) {
            return;
        }
        cooldowned = true;
    }
    lastPlace = pixelTicks;
    startPos = startPos || lastPos
    if (!(isMobile || (cooldowned && startPos.x === lastPos.x && startPos.y === lastPos.y) || elements[currentElement].tool || elements[currentElement].category === "tools")) {
        var coords = lineCoords(startPos.x, startPos.y, mouseX, mouseY);
    }
    else { var coords = mouseRange(mouseX, mouseY); }
    var element = elements[currentElement];
    var mixList = [];
    // For each x,y in coords
    for (var i = 0; i < coords.length; i++) {
        var x = coords[i][0];
        var y = coords[i][1];

        // If element name is heat or cool
        if (currentElement === "heat" || currentElement === "cool") {
            if (!isEmpty(x, y, false)) {
                if (outOfBounds(x, y)) {
                    continue;
                }
                var pixel = pixelMap[x][y];
                if (shiftDown) { pixel.temp += element.temp + (Math.random() * element.temp * 1.5) * 20; }
                else { pixel.temp += element.temp + (Math.random() * element.temp * 1.5); }
                pixelTempCheck(pixel);
            }
        }
        else if (currentElement === "mix") {
            if (!isEmpty(x, y, true)) {
                var pixel = pixelMap[x][y];
                if (elements[pixel.element].noMix !== true || shiftDown) {
                    mixList.push(pixel);
                }
            }
        }
        else if (currentElement === "shock") {
            if (!isEmpty(x, y, true)) {
                // One loop that repeats 5 times if shiftDown else 1 time
                for (var j = 0; j < (shiftDown ? 5 : 1); j++) {
                    var pixel = pixelMap[x][y];
                    var con = elements[pixel.element].conduct;
                    if (con == undefined) { continue }
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
        else if (elements[currentElement].tool && !(elements[currentElement].canPlace && isEmpty(x, y))) {
            // run the tool function on the pixel
            if (!isEmpty(x, y, true)) {
                var pixel = pixelMap[x][y];
                // if the current element has an ignore property and the pixel's element is in the ignore property, don't do anything
                if (elements[currentElement].ignore && elements[currentElement].ignore.indexOf(pixel.element) != -1) {
                    continue;
                }
                elements[currentElement].tool(pixel);
            }
        }
        else if (mode === "replace") {
            if (outOfBounds(x, y)) {
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
            if (elements[currentElement].customColor) {
                pixelMap[x][y].color = pixelColorPick(currentElement, currentColor);
            }
        }
        else if (isEmpty(x, y)) {
            currentPixels.push(new Pixel(x, y, currentElement));
            if (elements[currentElement].customColor) {
                pixelMap[x][y].color = pixelColorPick(currentElement, currentColor);
            }
        }
    }
    if (currentElement == "mix") {
        // 1. repeat for each pixel in mixList
        // 2. choose 2 random pixels and swap their x and y
        // 3. remove pixel from mixList
        for (var i = 0; i < mixList.length; i++) {
            var pixel1 = mixList[Math.floor(Math.random() * mixList.length)];
            var pixel2 = mixList[Math.floor(Math.random() * mixList.length)];
            swapPixels(pixel1, pixel2);
            mixList.splice(mixList.indexOf(pixel1), 1);
            mixList.splice(mixList.indexOf(pixel2), 1);
            if (elements[pixel1.element].onMix) {
                elements[pixel1.element].onMix(pixel1, pixel2);
            }
            if (elements[pixel2.element].onMix) {
                elements[pixel2.element].onMix(pixel2, pixel1);
            }
        }

    }
}
function mouse2Action(e, mouseX = undefined, mouseY = undefined, startPos) {
    // Erase pixel at mouse position
    if (mouseX == undefined && mouseY == undefined) {
        var canvas = document.getElementById("game");
        var ctx = canvas.getContext("2d");
        lastPos = mousePos;
        mousePos = getMousePos(canvas, e);
        var mouseX = mousePos.x;
        var mouseY = mousePos.y;
    }
    // If the current element is "pick" or "lookup", coords = [mouseX,mouseY]
    if (currentElement == "pick" || currentElement == "lookup") {
        var coords = [[mouseX, mouseY]];
    }
    else if (!isMobile) {
        startPos = startPos || lastPos
        var coords = lineCoords(startPos.x, startPos.y, mouseX, mouseY);
    }
    else {
        var coords = mouseRange(mouseX, mouseY);
    }
    // For each x,y in coords
    for (var i = 0; i < coords.length; i++) {
        var x = coords[i][0];
        var y = coords[i][1];

        if (!isEmpty(x, y)) {
            if (outOfBounds(x, y)) {
                continue
            }
            var pixel = pixelMap[x][y];
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
function mouseMiddleAction(e, mouseX = undefined, mouseY = undefined) {
    if (mouseX == undefined && mouseY == undefined) {
        var canvas = document.getElementById("game");
        var ctx = canvas.getContext("2d");
        lastPos = mousePos;
        mousePos = getMousePos(canvas, e);
        var mouseX = mousePos.x;
        var mouseY = mousePos.y;
    }
    if (!isEmpty(mouseX, mouseY, true)) {
        var pixel = pixelMap[mouseX][mouseY];
        selectElement(pixel.element);
        selectCategory(elements[pixel.element].category);
        mouseIsDown = false;
    }
}
lastScroll = new Date().getTime();
function wheelHandle(e) {
    e.preventDefault();
    // check if scroll is within the last 25ms
    if (new Date().getTime() - lastScroll < 25) {
        return;
    }
    lastScroll = new Date().getTime();
    var deltaY = e.deltaY;
    if (deltaY > 0) { deltaY = 1; }
    else { deltaY = -1.5; }
    mouseSize += Math.round(deltaY * 1.5);
    if (mouseSize < 1) { mouseSize = 1; }
    if (mouseSize > (height > width ? height : width)) { mouseSize = (height > width ? height : width); }
}
function chooseElementPrompt() {
    var e = prompt("Enter the element's ID")
    if (!e) { return; }
    // replace spaces with underscores
    e = e.replace(/ /g, "_");
    es = mostSimilarElement(e);
    if (es !== null) {
        selectElement(es);
        selectCategory(elements[es].category);
    }
    else {
        alert("Element \"" + e + "\" not found");
    }
}
function togglePause() {
    paused = !paused;
    if (paused) {
        document.getElementById("pauseButton").setAttribute("on", "true");
    }
    else {
        document.getElementById("pauseButton").setAttribute("on", "false");
    }
}
function resetPrompt() {
    if (settings.resetwarning === 0 || currentPixels.length === 0 || confirm('Are you sure you want to clear the whole scene?')) { clearAll(); };
}
function doFrame() {
    if (!paused) {
        paused = true;
        document.getElementById("pauseButton").setAttribute("on", "true");
    }
    drawPixels(true);
}

function selectElement(element) {
    var e1 = document.getElementById("elementButton-" + currentElement);
    if (e1 != null) { e1.setAttribute("current", "false"); }
    if (elements[currentElement].onUnselect) {
        elements[currentElement].onUnselect();
    }
    currentElement = element;
    if (elements[element].customColor) {
        // show the colorSelector
        document.getElementById("colorSelector").style.display = "block";
    }
    else {
        // hide the colorSelector
        document.getElementById("colorSelector").style.display = "none";
    }
    if (elements[element].onSelect) {
        elements[element].onSelect();
    }
    var e2 = document.getElementById("elementButton-" + element);
    if (!e2) { return; }
    e2.setAttribute("current", "true");
    // if e2 has the class "notify", remove it
    if (e2.classList.contains("notify")) {
        e2.classList.remove("notify");
    }
}
function editDistance(s1, s2) { s1 = s1.toLowerCase(); s2 = s2.toLowerCase(); var costs = new Array(); for (var i = 0; i <= s1.length; i++) { var lastValue = i; for (var j = 0; j <= s2.length; j++) { if (i == 0) costs[j] = j; else { if (j > 0) { var newValue = costs[j - 1]; if (s1.charAt(i - 1) != s2.charAt(j - 1)) newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1; costs[j - 1] = lastValue; lastValue = newValue; } } } if (i > 0) costs[s2.length] = lastValue; } return costs[s2.length]; }
function similarity(s1, s2) { var longer = s1; var shorter = s2; if (s1.length < s2.length) { longer = s2; shorter = s1; } var longerLength = longer.length; if (longerLength == 0) { return 1.0; } return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength); }
function mostSimilarElement(s) {
    var max = 0;
    var maxElement = "";
    for (var e in elements) {
        var sim = similarity(e, s);
        if (sim > max) {
            max = sim;
            maxElement = e;
        }
        if (elements[e].alias && elements[e].alias === s) {
            max = 0.99;
            maxElement = e;
        }
    }
    if (max < 0.5) { return null }
    return maxElement;
}
function selectCategory(category) {
    var categoryButton = document.getElementById("categoryButton-" + category);
    if (!categoryButton) { return }
    // if categoryButton has the class "notify", remove it
    if (categoryButton.classList.contains("notify")) {
        categoryButton.classList.remove("notify");
    }
    var categoryDiv = document.getElementById("category-" + category);
    // Show this categoryDiv and hide all others
    for (var i = 0; i < categoryButton.parentNode.children.length; i++) {
        var e = categoryDiv.parentNode.children[i];
        e.style.display = "none";
        // Set the categoryButton of categoryDiv's category attribute to current=false
        document.getElementById("categoryButton-" + e.getAttribute("category")).setAttribute("current", false);
    }
    categoryDiv.style.display = "block";
    categoryButton.setAttribute("current", true);
}
viewKey = {
    2: "thermal",
    3: "basic",
    4: "smooth"
}
function setView(n) {
    if (n <= 4 && n > 1) { // range of number keys with valid views
        view = n;
    }
    else { // reset view
        view = null;
    }
}

function createElementButton(element) {
    var button = document.createElement("button");
    // if the element has the attribute "name", use that as the button's text, otherwise use the element with underscores replaced by spaces
    if (elements[element].name) {
        button.innerHTML = elements[element].name;
        // make sure the first letter is capitalized
        button.innerHTML = button.innerHTML.charAt(0).toUpperCase() + button.innerHTML.slice(1);
    }
    else {
        button.innerHTML = element.replace(/_/g, " ");
        //capitalize first letter of each word
        button.innerHTML = button.innerHTML.replace(".", "   ").replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace("   ", ".").replace(/ /g, "");
    }
    //set attribute of element to the element
    button.setAttribute("element", element);
    button.setAttribute("current", "false");
    button.className = "elementButton";
    //color of the element
    // if the element color is an array, make a gradient background color, otherwise, set the background color to the element color
    if (elements[element].color instanceof Array) {
        button.style.backgroundImage = "linear-gradient(to bottom right, " + elements[element].color.join(", ") + ")";
        // choose the middlemost item in array
        var colorObject = elements[element].colorObject[Math.floor(elements[element].colorObject.length / 2)];
        if (elements[element].darkText !== false && (elements[element].darkText || (colorObject.r + colorObject.g + colorObject.b) / 3 > 200)) {
            button.className += " bright"
        }
    }
    else {
        button.style.background = elements[element].color;
        var colorObject = elements[element].colorObject;
        if (elements[element].darkText !== false && (elements[element].darkText || (colorObject.r + colorObject.g + colorObject.b) / 3 > 200)) {
            button.className += " bright"
        }
    }
    button.id = "elementButton-" + element;
    button.onclick = function () {
        selectElement(this.getAttribute("element"));
    }
    // on right click, show the element's info
    button.oncontextmenu = function (e) {
        e.preventDefault();
        closeMenu();
        showInfo(this.getAttribute("element"));
    }
    if (!elements[element].category) {
        elements[element].category = "other";
    }
    var categoryDiv = document.getElementById("category-" + elements[element].category);
    if (categoryDiv === null) {
        createCategoryDiv(elements[element].category);
        categoryDiv = document.getElementById("category-" + elements[element].category);
        categoryDiv.style.display = "none";
    }
    categoryDiv.appendChild(button);
}
function createCategoryDiv(category) {
    categoryButton = document.createElement("button");
    categoryButton.id = "categoryButton-" + category;
    categoryButton.innerHTML = category.replace(".", "   ").replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace("   ", ".").replace(/ /g, "");;
    categoryButton.className = "categoryButton";
    categoryButton.setAttribute("category", category);
    categoryButton.onclick = function () {
        selectCategory(this.getAttribute("category"));
    }
    document.getElementById("categoryControls").appendChild(categoryButton);
    var categoryDiv = document.createElement("div");
    //categoryDiv.innerHTML = "<span class='categoryName'>"+category+"</span>";
    categoryDiv.setAttribute("id", "category-" + category);
    categoryDiv.setAttribute("category", category);
    categoryDiv.setAttribute("class", "category");
    document.getElementById("elementControls").appendChild(categoryDiv);
}
function checkUnlock(element) {
    if (elements[element].hidden && !settings.unlocked[element]) {
        settings.unlocked[element] = true;
        if (settings.unhide === 2) {
            createElementButton(element)
            var categoryButton = document.querySelector(".categoryButton[current='true']");
            var currentCategory = categoryButton.getAttribute("category");
            if (currentCategory !== elements[element].category) {
                document.getElementById("categoryButton-" + elements[element].category).classList.add("notify");
            }
            // add notify to the elementButton of the element
            document.getElementById("elementButton-" + element).classList.add("notify");
        }
        saveSettings();
    }
}

worldgentypes = {
    // layers: [minimum y from bottom, element, chance per pixel]
    "grass": {
        layers: [
            [0.85, "grass"],
            [0.50, "dirt"],
            [0.05, "rock"],
            [0, "basalt"],
        ]
    },
    "flower_field": {
        layers: [
            [0.90, "grass"],
            [0.50, "dirt"],
            [0.05, "rock"],
            [0, "basalt"],
        ],
        decor: [
            ["flower_seed", 0.1]
        ]
    },
    "wheat_field": {
        layers: [
            [0.50, "mud"],
            [0.25, "rock"],
            [0, "basalt"],
        ],
        decor: [
            ["wheat_seed", 0.25]
        ],
        baseHeight: 0.35
    },
    "tide_pool": {
        layers: [
            [0.98, "primordial_soup"],
            [0.92, "water"],
            [0.50, "sand"],
            [0.25, "rock"],
            [0, "basalt"],
        ],
        decor: [
            ["methane", 0.1],
            ["rain_cloud", 0.75]
        ],
        baseHeight: 0.35,
        temperature: 30
    },
    "dirt": {
        layers: [
            [0.50, "dirt"],
            [0.05, "rock"],
            [0, "basalt"],
        ]
    },
    "snow": {
        layers: [
            [0.85, "snow"],
            [0.50, "dirt"],
            [0.05, "rock"],
            [0, "basalt"],
        ],
        decor: [
            ["pinecone", 0.05],
            ["snow_cloud", 0.75]
        ],
        baseHeight: 0.25,
        temperature: -5
    },
    "rain": {
        layers: [
            [0.85, "dirt"],
            [0.05, "rock"],
            [0, "basalt"],
        ],
        decor: [
            ["cloud", 1, 2],
            ["rain_cloud", 1, 7],
            ["rain_cloud", 1, 10],
            ["rain_cloud", 1, 13],
            ["rain_cloud", 1, 15],
        ],
        baseHeight: 0.25
    },
    "forest": {
        layers: [
            [0.95, "grass"],
            [0.50, "dirt"],
            [0.05, "rock"],
            [0, "basalt"],
        ],
        decor: [ // [element, chance, distance from top]
            ["sapling", 0.075],
            ["bird", 0.025, 10],
        ],
        baseHeight: 0.25
    },
    "jungle": {
        layers: [
            [0.95, "grass"],
            [0.50, "mud"],
            [0.05, "gravel"],
            [0, "basalt"],
        ],
        decor: [
            ["sapling", 0.075],
            ["bamboo_plant", 0.05],
            ["frog", 0.05, 10],
            ["bird", 0.05, 5, ["#ff0000", "#00ff00", "#00ffff", "#0000ff"]],
        ],
        baseHeight: 0.25
    },
    "taiga": {
        layers: [
            [0.95, "mud"],
            [0.50, "dirt"],
            [0.05, "rock"],
            [0, "basalt"],
        ],
        decor: [
            ["pinecone", 0.075],
            ["snow_cloud", 0.75]
        ],
        baseHeight: 0.25,
        temperature: -5
    },
    "mushrooms": {
        layers: [
            [0.50, "dirt"],
            [0.05, "rock"],
            [0, "basalt"],
        ],
        decor: [
            ["mushroom_spore", 0.075],
        ],
        baseHeight: 0.25
    },
    "ocean": {
        layers: [
            [0.25, "water"],
            [0.1, "clay", 0.1],
            [0.1, "gravel", 0.2],
            [0.1, "wet_sand"],
            [0.03, "gravel", 0.5],
            [0.03, "rock"],
            [0, "basalt"],
        ],
        decor: [
            ["fish", 0.1, 10],
            ["snail", 0.01, 10],
            ["algae", 0.4, 10],
        ]
    },
    "rock": {
        layers: [
            [0, "rock"],
        ],
        baseHeight: 0.33
    },
    "volcanic": {
        layers: [
            [0.3, "basalt"],
            [0.2, "basalt", 0.5],
            [0, "magma"]
        ],
        decor: [
            ["pyrocumulus", 0.75]
        ],
        baseHeight: 0.4,
        temperature: 950
    },
    "desert": {
        layers: [
            [0.55, "sand"],
            [0.35, "bone", 0.03],
            [0.35, "charcoal", 0.03],
            [0.30, "dirt"],
            [0.05, "rock"],
            [0, "basalt"],
        ],
        decor: [ // [element, chance, distance from top]
            ["cactus", 0.05],
        ],
        temperature: 38,
    }
};
function clearAll() {
    currentPixels = [];
    pixelMap = [];
    for (var i = 0; i < width; i++) {
        pixelMap[i] = [];
        for (var j = 0; j < height; j++) {
            pixelMap[i][j] = undefined;
        }
    }
    pixelTicks = 0;
    if (settings["worldgen"] && settings["worldgen"] != "off") {
        worldGen(worldgentypes[settings["worldgen"]]);
    }
}
function mean(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}
function generateTerrainHeights(width, heightVariance, complexity) {
    // array of (width) 0s
    var newHeights = [];
    for (var i = 0; i < width; i++) {
        newHeights[i] = 0;
    }
    // do midpoint displacement (complexity) times on newHeights
    for (var i = 0; i < complexity; i++) {
        var newHeights2 = [];
        for (var j = 0; j < width; j++) {
            newHeights2[j] = 0;
        }
        for (var j = 0; j < width; j++) {
            var x = j;
            var y = newHeights[j];
            var y2 = y + Math.random() * heightVariance - heightVariance / 2;
            newHeights2[x] = y2;
        }
        newHeights = newHeights2;
    }
    return newHeights;
}
function worldGen(worldtype) {
    var complexity = worldtype.complexity || 20;
    var heightVariance = worldtype.heightVariance || 0.5;
    var baseHeight = height - (height * (worldtype.baseHeight || 0.5));
    var layers = worldtype.layers || { 0: "rock" };
    var yoffsets = generateTerrainHeights(width, heightVariance, complexity);
    // 2D world vertical generator
    for (var x = 1; x < width; x++) {
        var yoffset = yoffsets[x];
        var worldHeight = baseHeight + yoffset;
        for (var y = 0; y < height; y++) {
            // Change element type based on y, from grass > dirt > rock > basalt
            if (y > worldHeight) {
                // distance from the bottom of worldHeight
                var frombottom = worldHeight - (y - worldHeight);
                var element = null;
                for (var i in layers) {
                    var layer = layers[i];
                    if (layer[0] == 0 && yoffset < 0) {
                        layer[0] = yoffset;
                    }
                    if (frombottom > worldHeight * layer[0] && Math.random() < (layer[2] || 1)) {
                        if (elements[layer[1]]) {
                            element = layer[1];
                            break
                        }
                    }
                }
                if (element) {
                    createPixel(element, x, y);
                    if (worldtype.temperature) {
                        pixelMap[x][y].temp = worldtype.temperature;
                    }
                }
            }
        }
    }
    // decor
    if (worldtype.decor) {
        for (var i = 0; i < worldtype.decor.length; i++) {
            var decor = worldtype.decor[i];
            var element = decor[0];
            var chance = decor[1];
            for (var x = 1; x < width; x++) {
                var y = decor[2] || 5;
                // add or subtract worldtype.decorVariance from y
                y += Math.round(Math.random() * (worldtype.decorVariance || 2) - (worldtype.decorVariance || 2) / 2);
                if (Math.random() < chance && isEmpty(x, y)) {
                    createPixel(element, x, y);
                    if (worldtype.temperature) {
                        pixelMap[x][y].temp = worldtype.temperature;
                    }
                    if (decor[3]) {
                        pixelMap[x][y].color = pixelColorPick(pixelMap[x][y], decor[3])
                    }
                }
            }
        }
    }
}

randomEvents = {
    "falling_pixel": function () {
        // random x between 1 and width-1
        var x = Math.floor(Math.random() * (width - 1)) + 1;
        // random y between 1 and 6
        var y = Math.floor(Math.random() * 6) + 1;
        if (isEmpty(x, y)) {
            // random element from randomEventChoices.falling_pixel
            var element = randomEventChoices.falling_pixel[Math.floor(Math.random() * randomEventChoices.falling_pixel.length)];
            // if element is an array, choose a random element from the array
            if (Array.isArray(element)) {
                element = element[Math.floor(Math.random() * element.length)];
            }
            createPixel(element, x, y);
        }
    },
    "element_circle": function () {
        // random x between 1 and width-1
        var x = Math.floor(Math.random() * (width - 1)) + 1;
        // random y between 1 and height-1
        var y = Math.floor(Math.random() * (height - 1)) + 1;
        // random radius between 3 and 7
        var radius = Math.floor(Math.random() * 4) + 3;
        // random element from randomEventChoices.element_circle
        var element = randomEventChoices.element_circle[Math.floor(Math.random() * randomEventChoices.element_circle.length)];
        var coords = circleCoords(x, y, radius);
        for (var i = 0; i < coords.length; i++) {
            var coord = coords[i];
            if (isEmpty(coord.x, coord.y)) {
                createPixel(element, coord.x, coord.y);
            }
        }
    },
    "explosion": function () {
        // similar but do explodeAt(x,y,radius,element)
        var x = Math.floor(Math.random() * (width - 1)) + 1;
        var y = Math.floor(Math.random() * (height - 1)) + 1;
        var radius = Math.floor(Math.random() * 4) + 3;
        var element = randomEventChoices.explosion[Math.floor(Math.random() * randomEventChoices.explosion.length)];
        explodeAt(x, y, radius, element);
    },
    "temperature": function () {
        // set the temperature in a random circle to a random value between -200 and 200
        var x = Math.floor(Math.random() * (width - 1)) + 1;
        var y = Math.floor(Math.random() * (height - 1)) + 1;
        var radius = Math.floor(Math.random() * 4) + 3;
        var temp = Math.floor(Math.random() * 400) - 200;
        var coords = circleCoords(x, y, radius);
        for (var i = 0; i < coords.length; i++) {
            var coord = coords[i];
            if (!outOfBounds(coord.x, coord.y) && !isEmpty(coord.x, coord.y)) {
                pixelMap[coord.x][coord.y].temp += temp;
            }
        }
    }
}
randomEventChoices = {
    "falling_pixel": ["fireball", "fallout", "seeds", ["bomb", "cold_bomb", "cluster_bomb"], "human", "gold_coin", "feather", "glitter", "homunculus", "egg", "frozen_frog", "sapling", "smoke_grenade", "party_popper", "lightning", "frozen_worm", "pinecone"],
    "element_circle": ["carbon_dioxide", "primordial_soup", "fly", "steam", "oxygen", "sugar", "bee", "firefly", "tadpole", "flash", "foam", "bless"],
    "explosion": ["fire", "cold_fire", "methane", "electric", "light", "laser", "radiation", "plasma", "liquid_nitrogen", "liquid_helium", "liquid_neon", "acid_gas", "fw_ember", "malware", ["stench", "plague"], ["firework", "fire", "fire"], "bubble", "confetti", "balloon", "dye", "bless"]
}
function doRandomEvents() {
    var chance = settings.events;
    if (Math.random() < chance) {
        // run a random function from randomEvents
        var event = randomEvents[Object.keys(randomEvents)[Math.floor(Math.random() * Object.keys(randomEvents).length)]];
        event();
    }
}

shiftDownTypes = {
    1: "[↑ ]",
    2: "[A ]",
    3: "[ ↑]",
    4: "[ A]"
}
// Update stats
function updateStats() {
    var statsDiv = document.getElementById("stats");
    var stats = "<span id='stat-pos' class='stat'>x" + mousePos.x + ",y" + mousePos.y + "</span>";
    stats += "<span id='stat-pixels' class='stat'>Pxls:" + currentPixels.length + "</span>";
    stats += "<span id='stat-tps' class='stat'>" + tps + "tps</span>";
    stats += "<span id='stat-ticks' class='stat'>" + pixelTicks + "</span>";
    if ((typeof pixelMap).length === 9) { return; }
    if (pixelMap[mousePos.x] !== undefined) {
        var currentPixel = pixelMap[mousePos.x][mousePos.y];
        if (currentPixel !== undefined) {
            stats += "<span id='stat-element' class='stat'>Elem:" + (elements[currentPixel.element].name || currentPixel.element).toUpperCase() + "</span>";
            stats += "<span id='stat-temperature' class='stat'>Temp:" + formatTemp(currentPixel.temp) + "</span>";
            if (currentPixel.charge) {
                stats += "<span id='stat-charge' class='stat'>C" + currentPixel.charge + "</span>";
            }
            if (currentPixel.burning) {
                stats += "<span id='stat-burning' class='stat'>Burning</span>";
            }
        }
    }
    if (shiftDown) {
        stats += "<span id='stat-shift' class='stat'>" + shiftDownTypes[shiftDown] + "</span>";
    }
    // If the view is not null, show the view in all caps
    if (view !== null) {
        stats += "<span id='stat-view' class='stat'>" + viewKey[view] + "</span>";
    }
    statsDiv.innerHTML = stats;
}

function formatTemp(temp) { // temp is Celcius
    if (!settings["units"] || settings["units"] === "m") { // Celsius
        return Math.round(temp) + "°C"
    }
    else if (settings["units"] === "i") { // Fahrenheit
        return Math.round(temp * 1.8 + 32) + "°F"
    }
    else if (settings["units"] === "s") { // Kelvin
        return Math.round(temp + 273.15) + "K"
    }
}
function formatDensity(density) { // temp is kg/m3
    var digits = 2;
    // if the number is more than 2 digits long, round to 0 digits
    if (density > 100) { digits = 0; }
    else if (density > 10) { digits = 1; }
    // default/metric = kg/m3, imperial = lb/ft3, si = g/cm3
    if (!settings["units"] || settings["units"] === "m") { // kg/m3
        return density.toFixed(digits) + " kg⁄m<sup>3</sup>"
    }
    else if (settings["units"] === "i") { // lb/ft3
        return (density / 16.018).toFixed(digits) + " lb⁄ft<sup>3</sup>"
    }
    else if (settings["units"] === "s") { // g/cm3
        // round to 2 decimal places
        return ((density / 10) / 100).toFixed(digits) + " g⁄cm<sup>3</sup>"
    }
}

showingMenu = false;
function infoLink(l) {
    if (l instanceof Array) {
        var newtext = "";
        for (var i = 0; i < l.length; i++) {
            var element = l[i];
            // add to newtext a span with the element's name and its onclick to showInfo(element)
            if (element == "pixels" || element == "itself") { newtext += element + ", " }
            else { newtext += "<span class='infoLink' onclick='showInfo(\"" + element + "\")'>" + (elements[element].name || element).toUpperCase().replace(/_/g, " ") + "</span>, "; }
        }
        // remove the last comma and space
        newtext = newtext.substring(0, newtext.length - 2);
        return newtext
    }
    else {
        if (l == "pixels" || l == "[???]" || l == "itself") { return l }
        else { return "<span class='infoLink' onclick='showInfo(\"" + l + "\")'>" + l.toUpperCase().replace(/_/g, " ") + "</span>"; }
    }
}
function showInfo(element, back = false) { // this is such a mess please don't look at it
    showingMenu = "info";
    var infoParent = document.getElementById("infoParent");
    infoParent.style.display = "block";
    var infoSearch = document.getElementById("infoSearch");
    infoSearch.focus();
    var infoTitle = document.getElementById("infoTitle");
    var infoText = document.getElementById("infoText");
    var error = false;
    if (element != undefined) {
        // replace all spaces with underscores
        element = element.replace(/ /g, "_").toLowerCase();
        infoSearch.value = element.toUpperCase();
        info = elements[element];
        if (info) {
            infoTitle.innerHTML = info.name || element.replace(/_/g, " ");
            infoTitle.innerHTML = infoTitle.innerHTML.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
            infoText.innerHTML = "";
            if (info.hidden && !settings.unlocked[element]) { infoText.innerHTML += "\nYou haven't discovered this yet.\n" }
            if (info.color) {
                if (!(info.color instanceof Array)) {
                    infoText.innerHTML += "\nColor: <span style='background-color:" + info.color + "'>     </span>";
                }
                else {
                    //gradient
                    var gradient = info.color;
                    var gradientString = "linear-gradient(to right";
                    for (var i = 0; i < gradient.length; i++) {
                        gradientString += ", " + gradient[i] + " " + (i * 100 / gradient.length) + "%";
                    }
                    gradientString += ")";
                    infoText.innerHTML += "\nColor: <span style='background:" + gradientString + "'>     </span>";
                }
            }
            if (info.desc) {
                infoText.innerHTML += "\n" + info.desc;
            }
            else if (info.extraInfo) {
                infoText.innerHTML += "\n" + info.extraInfo;
            }

            var moves = false;
            var deletes = [];
            var swaps = [];
            var creates = [];
            var heats = false;
            var cools = false;
            var clones = false;
            var explodes = false;
            var sticks = [];
            if (info.behavior) {
                // for x and y in behavior array
                for (var i = 0; i < info.behavior.length; i++) {
                    for (var j = 0; j < info.behavior[i][1].length; j++) {
                        var b0 = info.behavior[i][j];
                        if (!b0) { continue; }
                        for (var k = 0; k < b0.split(" AND ").length; k++) {
                            var b = b0.split(" AND ")[k];
                            // remove everything after %
                            b = b.split("%")[0];
                            if (b.indexOf(":") != -1) {
                                var arg = b.split(":")[1];
                            }
                            else { var arg = undefined }
                            var b = b.split(":")[0];
                            if (b == "M1" || b == "M2") {
                                moves = true;
                            }
                            else if (b == "DL") {
                                if (i == 1 && j == 1) { arg = "itself" }
                                else if (!arg) { arg = "pixels" }
                                if (deletes.indexOf(arg) == -1) { deletes = deletes.concat(arg.split(",")); }
                            }
                            else if (b == "SW") {
                                if (!arg) { arg = "pixels" }
                                if (swaps.indexOf(arg) == -1) { swaps = swaps.concat(arg.split(",")); }
                            }
                            else if (b == "CL") {
                                clones = true;
                            }
                            else if (b == "CR" || b == "CH" || b == "LB" || b == "L1" || b == "L2") {
                                if (!arg) { arg = "[???]" }
                                else if (arg.indexOf(">") != -1) { arg = arg.split(">")[1]; }
                                if (creates.indexOf(arg) == -1) { creates = creates.concat(arg.split(",")); }
                            }
                            else if (b == "HT") {
                                heats = true;
                            }
                            else if (b == "CO") {
                                cools = true;
                            }
                            else if (b == "ST") {
                                if (!arg) { arg = "pixels" }
                                if (sticks.indexOf(arg) == -1) { sticks = sticks.concat(arg.split(",")); }
                            }
                            else if (b == "EX") {
                                explodes = true;
                            }


                        }
                    }
                }
            }
            // make sure deletes, swaps, creates, and sticks have no duplicate items
            deletes = deletes.filter(function (item, pos) { return deletes.indexOf(item) == pos; });
            swaps = swaps.filter(function (item, pos) { return swaps.indexOf(item) == pos; });
            creates = creates.filter(function (item, pos) { return creates.indexOf(item) == pos; });
            sticks = sticks.filter(function (item, pos) { return sticks.indexOf(item) == pos; });
            if (info.category == "tools" || info.tool) { infoText.innerHTML += "\nTool." }
            else {
                if (!moves && info.behavior) { infoText.innerHTML += "\nStationary."; }
                if (info.category) { infoText.innerHTML += "\nCategory: " + infoLink(info.category) + "."; }
                if (info.conduct) { infoText.innerHTML += "\nConducts electricity."; }
                if (swaps.length > 0) { infoText.innerHTML += "\nMoves through " + infoLink(swaps) + "."; }
                if (creates.length > 0) { infoText.innerHTML += "\nMakes " + infoLink(creates) + "."; }
                if (clones) { infoText.innerHTML += "\nClones self." }
                if (deletes.length > 0) { infoText.innerHTML += "\nDeletes " + infoLink(deletes) + "."; }
                if (heats) { infoText.innerHTML += "\nHeats pixels." }
                if (cools) { infoText.innerHTML += "\nCools pixels." }
                if (sticks.length > 0) { infoText.innerHTML += "\nSticks to " + infoLink(sticks) + "."; }
                if (explodes) { infoText.innerHTML += "\nExplodes." }
                if (settings["unhide"] !== 1 && info.hidden) { infoText.innerHTML += "\nHidden by default."; }
                if (info.density != undefined) { infoText.innerHTML += "\nDensity: " + formatDensity(info.density) + "."; }
                if (info.tempHigh != undefined) {
                    infoText.innerHTML += "\nTurns into " + infoLink(info.stateHigh || "[???]") + " above " + formatTemp(info.tempHigh) + ".";
                }
                if (info.tempLow != undefined) {
                    infoText.innerHTML += "\nTurns into " + infoLink(info.stateLow || "[???]") + " below " + formatTemp(info.tempLow) + ".";
                }
                if (info.burn != undefined) { infoText.innerHTML += "\nFlammability: " + info.burn + "%."; }
                if (info.burnTime != undefined) {
                    infoText.innerHTML += "\nBurns for " + info.burnTime + " tick";
                    if (info.burnTime != 1) { infoText.innerHTML += "s"; }
                    infoText.innerHTML += ".";
                }
                if (info.burnInto) { infoText.innerHTML += "\nBurns into " + infoLink(info.burnInto) + "."; }
                if (info.fireColor) {
                    if (!(info.fireColor instanceof Array)) {
                        infoText.innerHTML += "\nFlame Color: <span style='background-color:" + info.fireColor + "'>     </span>";
                    }
                    else {
                        //gradient
                        var gradient = info.fireColor;
                        var gradientString = "linear-gradient(to right";
                        for (var i = 0; i < gradient.length; i++) {
                            gradientString += ", " + gradient[i] + " " + (i * 100 / gradient.length) + "%";
                        }
                        gradientString += ")";
                        infoText.innerHTML += "\nFlame Color: <span style='background:" + gradientString + "'>     </span>";
                    }
                }
                if (info.breakInto) { infoText.innerHTML += "\nBreaks into " + infoLink(info.breakInto) + "."; }
                if (info.stain) {
                    if (info.stain < 0) { infoText.innerHTML += "\nCleans stains."; }
                    else { infoText.innerHTML += "\nStains solids."; }
                }
                if (info.customColor) { infoText.innerHTML += "\nColor is customizable."; }
                if (info.reactions) {
                    infoText.innerHTML += "\nReacts with " + infoLink(Object.keys(info.reactions)) + ".";
                }
                if (info.related) {
                    infoText.innerHTML += "\n\n";
                    var related = info.related;
                    if (typeof related == "string") { related = [related]; }
                    infoText.innerHTML += "See Also: " + infoLink(related) + ".";
                }
                if (info.alias) {
                    infoText.innerHTML += "\n\n";
                    var alias = info.alias;
                    if (typeof alias == "string") { alias = [alias]; }
                    infoText.innerHTML += "Also known as " + alias.join(", ").toUpperCase() + ".";
                }
            }
        }
        else if (categoryList.indexOf(element) !== -1) {
            infoTitle.innerHTML = element;
            infoTitle.innerHTML = infoTitle.innerHTML.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
            var matchingCategory = [];
            // loop through all elements, and add to matchingCategory if it matches the category
            for (e in elements) {
                if (elements[e].category === element) {
                    matchingCategory.push(e);
                }
            }
            infoText.innerHTML = "\nCategory of " + matchingCategory.length + ".\n\n";
            // infoLink of each item in matchingCategory on new lines
            var temptext = "";
            for (var i = 0; i < matchingCategory.length; i++) {
                temptext += infoLink(matchingCategory[i]) + "\n";
            }
            infoText.innerHTML += temptext;
        }
        else if (element === "") {
            infoTitle.innerHTML = "Browse";
            infoText.innerHTML = "\n" + infoLink("all") + " • " + infoLink("undiscovered") + " • " + infoLink("discovered") + "\n\n";
            var temptext = "";
            for (var i = 0; i < categoryList.length; i++) {
                temptext += infoLink(categoryList[i]) + "\n";
            }
            infoText.innerHTML += temptext + infoLink("hidden");
        }
        else if (element === "undiscovered") {
            infoTitle.innerHTML = "Undiscovered";
            var temptext = "";
            var n = 0;
            for (e in elements) {
                if (elements[e].hidden && !settings.unlocked[e]) {
                    temptext += infoLink(e) + "\n";
                    n++;
                }
            }
            // sort temptext lines alphabetically
            temptext = temptext.split("\n"); temptext.sort(); temptext = temptext.join("\n");
            infoTitle.innerHTML += " (" + n + ")";
            if (temptext === "") { temptext = "You discovered everything!\n\nJoin our <a href='https://discord.gg/ejUc6YPQuS'>Discord</a> to stay up to date with updates."; }
            infoText.innerHTML = temptext;
        }
        else if (element === "all") {
            infoTitle.innerHTML = "All (" + elementCount + ")";
            var temptext = "";
            for (e in elements) { temptext += infoLink(e) + "\n"; }
            // sort temptext lines alphabetically
            temptext = temptext.split("\n"); temptext.sort(); temptext = temptext.join("\n");
            infoText.innerHTML = temptext;
        }
        else if (element === "discovered") {
            infoTitle.innerHTML = "Discovered";
            var temptext = "";
            var n = 0;
            for (e in elements) {
                if (!elements[e].hidden || settings.unlocked[e]) {
                    temptext += infoLink(e) + "\n";
                    n++;
                }
            }
            // sort temptext lines alphabetically
            temptext = temptext.split("\n"); temptext.sort(); temptext = temptext.join("\n");
            infoTitle.innerHTML += " (" + n + ")";
            infoText.innerHTML = temptext;
        }
        else if (element === "hidden") {
            infoTitle.innerHTML = "Hidden (" + hiddenCount + ")";
            var temptext = "";
            for (e in elements) {
                if (elements[e].hidden) { temptext += infoLink(e) + "\n"; }
            }
            // sort temptext lines alphabetically
            temptext = temptext.split("\n"); temptext.sort(); temptext = temptext.join("\n");
            if (temptext === "") { temptext = "You discovered everything!\n\nJoin our <a href='https://discord.gg/ejUc6YPQuS'>Discord</a> to stay up to date with updates."; }
            infoText.innerHTML = temptext;
        }
        else if (element === "air") {
            infoTitle.innerHTML = "Air";
            infoText.innerHTML = "\nColor: <span>     </span>\nCategory: " + infoLink("gases") + ".\nDensity: " + formatDensity(airDensity) + "."
        }
        else {
            infoTitle.innerHTML = "";
            infoText.innerHTML = "";
            error = true;
        }
    }
    else {
        infoTitle.innerHTML = "";
        infoText.innerHTML = "";
    }
    infoText.innerHTML += "\n\n\n\n";
    if (error) { infoSearch.style.backgroundColor = "rgb(100, 33, 33)"; }
    else {
        infoSearch.style.backgroundColor = "rgb(66, 66, 66)";
        if (!back && infoHistory[infoHistory.length - 1] !== element) { infoHistory.push(element); }
    }
    if (infoHistory.length > 1) {
        document.getElementById("infoBackButton").style.display = "inline-block";
    }
    else {
        document.getElementById("infoBackButton").style.display = "none";
    }
}
infoHistory = [];
function infoBack() {
    if (infoHistory.length > 0) {
        infoHistory.pop()
        showInfo(infoHistory[infoHistory.length - 1], true);
    }
}
function closeMenu() {
    if (!showingMenu) { return; }
    if (showingMenu == "info") {
        var infoParent = document.getElementById("infoParent");
        var infoSearch = document.getElementById("infoSearch");
        infoParent.style.display = "none";
        infoSearch.value = "";
        showingMenu = false;
        infoHistory = [];
    }
    else if (showingMenu == "mods") {
        var modParent = document.getElementById("modParent");
        var modManagerUrl = document.getElementById("modManagerUrl");
        modParent.style.display = "none";
        modManagerUrl.value = "";
        showingMenu = false;
    }
    else if (showingMenu == "settings") {
        var settingsParent = document.getElementById("settingsParent");
        settingsParent.style.display = "none";
        showingMenu = false;
    }
    else {
        // do it to all elements with the class "menuParent"
        var menuParents = document.getElementsByClassName("menuParent");
        for (var i = 0; i < menuParents.length; i++) {
            menuParents[i].style.display = "none";
        }
        showingMenu = false;
    }
}
function showModManager() {
    var modParent = document.getElementById("modParent");
    var modManagerUrl = document.getElementById("modManagerUrl");
    modParent.style.display = "block";
    modManagerUrl.focus();
    showingMenu = "mods";
}
function addMod(url) {
    // remove trailing slashes
    while (url.charAt(url.length - 1) == "/") { url = url.substring(0, url.length - 1); }
    // if the mod is in enabledMods, return
    for (var i = 0; i < enabledMods.length; i++) {
        if (enabledMods[i] == url) { return; }
    }
    // if the url doesn't have a slash or a dot, alert
    if (url.indexOf("/") == -1 && url.indexOf(".") == -1) {
        alert("Invalid mod URL.");
        return;
    }
    // if the url doesn't start with http, add "mods/" to the beginning
    if (url.indexOf("http") == -1) { url = "mods/" + url; }
    // add it to enabledMods and set the localStorage
    enabledMods.push(url);
    localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
    // add to modManagerList
    var modManagerList = document.getElementById("modManagerList");
    var modName = url.split("/").pop();
    modManagerList.innerHTML += "<li><a href='" + url + "' target='_blank'>" + modName + "</a> <span class='removeModX' onclick='removeMod(\"" + url + "\")'>X</span></li>";
    document.getElementById("noMods").style.display = "none";
    alert("Added mod. Refresh the page to see changes.");
}
function removeMod(url) {
    // remove url from enabledMods and set the localStorage
    for (var i = 0; i < enabledMods.length; i++) {
        if (enabledMods[i] == url) {
            enabledMods.splice(i, 1);
            break;
        }
    }
    if (enabledMods.length === 0) {
        document.getElementById("noMods").style.display = "block";
    }
    localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
    // remove from modManagerList by href
    var modManagerList = document.getElementById("modManagerList");
    var modManagerListLinks = modManagerList.getElementsByTagName("a");
    for (var i = 0; i < modManagerListLinks.length; i++) {
        if (modManagerListLinks[i].href.endsWith(url)) {
            modManagerListLinks[i].parentNode.remove();
            break;
        }
    }
    alert("Removed mod. Refresh the page to see changes.");
}
function showSettings() {
    var settingsParent = document.getElementById("settingsParent");
    settingsParent.style.display = "block";
    showingMenu = "settings";
}
function setSetting(setting, value) {
    settings[setting] = value;
    saveSettings();
}
function toggleInput(input, setting) {
    if (input.getAttribute("state") === "0") {
        input.setAttribute("state", "1");
        input.value = "ON";
        setSetting(setting, 1);
    }
    else {
        input.setAttribute("state", "0");
        input.value = "OFF";
        setSetting(setting, 0);
    }
}

shiftDown = 0;
shaping = 0;
shapeStart = null;
placingImage = null;
// On window load, run tick() 20 times per second
tps = 30;
tickInterval = window.setInterval(tick, 1000 / tps);
function resetInterval(newtps = 30) {
    window.clearInterval(tickInterval);
    tickInterval = window.setInterval(tick, 1000 / newtps);
}
//ticks = 0;
pixelTicks = 0;

mode = null;
view = settings.view || null;
paused = false;
function focusGame() { document.getElementById("game").focus(); if (showingMenu) { closeMenu(); } }
//on window load
window.onload = function () {
    // If the browser is Firefox, set #categoryControls padding-bottom:11px;
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        document.getElementById("categoryControls").style.paddingBottom = "11px";
    }

    // Loop through runAfterLoadList and run each function
    for (var i = 0; i < runAfterLoadList.length; i++) {
        runAfterLoadList[i]();
    }

    // Loop through behaviors and each behavior, if it is a string, split the items and replace the value with the array
    for (var behavior in behaviors) {
        if (typeof behaviors[behavior][0] === "string") {
            var newbehavior = [];
            for (var i = 0; i < behaviors[behavior].length; i++) {
                newbehavior.push(behaviors[behavior][i].split("|"));
            }
            behaviors[behavior] = newbehavior;
        }
    }

    // convert every color in the elements object to rgb
    for (var key in elements) {
        if (elements.hasOwnProperty(key)) {
            // if the element has no color, skip it
            if (elements[key].color === undefined) {
                continue;
            }
            // if the color is an array, loop over each one
            if (elements[key].color instanceof Array) {
                var rgbs = [];
                var rgbos = [];
                for (var i = 0; i < elements[key].color.length; i++) {
                    var c = elements[key].color[i];
                    if (c.startsWith("#")) {
                        var rgb = hexToRGB(c);
                        rgbs.push("rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")");
                        rgbos.push(rgb);
                    }
                    else {
                        rgbs.push(c);
                    }
                }
                elements[key].color = rgbs;
                elements[key].colorObject = rgbos;
            } else {
                // if elements[key].color starts with #
                if (elements[key].color.startsWith("#")) {
                    var rgb = hexToRGB(elements[key].color);
                    elements[key].color = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
                    elements[key].colorObject = rgb;
                }
            }
        }
    }

    autoElements = {
        "molten": { // Solid -> Liquid
            rgb: [[2, 1.25, 0.5], [2, 1, 0.5], [2, 0.75, 0]],
            behavior: behaviors.MOLTEN,
            type: "high",
            viscosity: 10000,
            hidden: true,
            state: "liquid",
            tempDiff: -100
        },
        "frozen": { // Liquid -> Solid
            rgb: [[1.2, 1.2, 1.3]],
            behavior: behaviors.WALL,
            type: "low",
            hidden: true,
            state: "solid"
        },
        "condense": { // Gas -> Liquid
            rgb: [[0.5, 0.5, 0.5]],
            behavior: behaviors.LIQUID,
            type: "low",
            hidden: true,
            state: "liquid"
        },
        "vaporize": { // Liquid -> Gas
            rgb: [[1.5, 1.5, 1.5]],
            behavior: behaviors.GAS,
            type: "high",
            hidden: true,
            state: "gas"
        }
    }

    // Automatic molten element generation
    function autoGen(newname, element, autoType) {
        var autoInfo = autoElements[autoType];
        var newcolor = elements[element].colorObject;
        var colorList = [];
        var colorObjectList = [];
        // if newcolor is not an array, put it in an array
        if (!(newcolor instanceof Array)) { newcolor = [newcolor]; }
        // for every color in the newcolor array, add a new color with the same value, but with the r and g values increased
        for (var i = 0; i < newcolor.length; i++) {
            var c = newcolor[i];
            for (var j = 0; j < autoInfo.rgb.length; j++) {
                var newc = autoInfo.rgb[j];
                r = Math.floor(c.r * newc[0]);
                g = Math.floor(c.g * newc[1]);
                b = Math.floor(c.b * newc[2]);
                if (r > 255) { r = 255; } if (g > 255) { g = 255; }
                colorList.push("rgb(" + r + "," + g + "," + b + ")");
                colorObjectList.push({ r: r, g: g, b: b });
            }
        }
        var newelem = {
            //"name": newname.replaceAll("_"," "),
            behavior: autoInfo.behavior,
            hidden: autoInfo.hidden || false,
            state: autoInfo.state || "solid",
            category: autoInfo.category || "states"
        }
        if (colorList.length <= 1) { colorList = colorList[0]; }
        if (colorObjectList.length <= 1) { colorObjectList = colorObjectList[0]; }
        newelem.color = colorList;
        newelem.colorObject = colorObjectList;
        var multiplier = 1.1;
        if (autoInfo.type === "high") {
            if (!elements[element].stateHigh) { elements[element].stateHigh = newname; }
            newelem.temp = elements[element].tempHigh;
            newelem.tempLow = elements[element].tempHigh + (autoInfo.tempDiff || 0);
            newelem.stateLow = element;
            // Change density by *0.9
            if (elements[element].density) { newelem.density = Math.round(elements[element].density * 0.9 * 10) / 10; }
        }
        else if (autoInfo.type === "low") {
            if (!elements[element].stateLow) { elements[element].stateLow = newname; }
            newelem.temp = elements[element].tempLow;
            newelem.tempHigh = elements[element].tempLow + (autoInfo.tempDiff || 0);
            newelem.stateHigh = element;
            multiplier = 0.5;
            // Change density by *1.1
            if (elements[element].density) { newelem.density = Math.round(elements[element].density * 1.1 * 10) / 10; }
        }
        if (!elements[element].ignore) { elements[element].ignore = [] }
        elements[element].ignore.push(newname);
        if (elements[element].viscosity || autoInfo.viscosity) {
            newelem.viscosity = elements[element].viscosity || autoInfo.viscosity;
        }
        // Change by *multiplier
        if (elements[element].conduct) { newelem.conduct = Math.round(elements[element].conduct * multiplier * 10) / 10; }
        if (elements[element].burn) { newelem.burn = Math.round(elements[element].burn * multiplier * 10) / 10; }
        if (elements[element].burnTime) { newelem.burnTime = Math.round(elements[element].burnTime * multiplier * 10) / 10; }
        if (elements[element].burnInto) { newelem.burnInto = elements[element].burnInto; }
        if (elements[element].fireColor) { newelem.fireColor = elements[element].fireColor; }
        // If the new element doesn't exist, add it
        if (!elements[newname]) { elements[newname] = newelem; }
        else {
            // Loop through newelem's keys and values, copy them to the new element if they are not already defined
            for (var key in newelem) {
                if (elements[newname][key] == undefined) { elements[newname][key] = newelem[key]; }
            }
        }

        if (autoType === "molten" && (elements.molten_slag && elements.molten_slag.ignore && elements.molten_slag.ignore.indexOf(element) === -1)) { // Slag reactions
            if (newname !== "molten_slag") {
                if (!elements[newname].reactions) { elements[newname].reactions = {}; }
                elements[newname].reactions.ash = { elem1: null, elem2: "molten_slag" };
                elements[newname].reactions.dust = { elem1: null, elem2: "molten_slag" };
                elements[newname].reactions.magma = { elem1: null, elem2: "molten_slag" }
                elements[newname].reactions.smog = { elem1: null, elem2: "molten_slag" }
                elements[newname].reactions.pyrocumulus = { elem1: null, elem2: "molten_slag" }
                elements[newname].reactions.dioxin = { elem1: null, elem2: "molten_slag" }
                elements[newname].reactions.poison_gas = { elem1: null, elem2: "molten_slag" }
            };
        }
    }
    // Loop through each element. If it has a tempHigh, but not a stateHigh, create a new molten element
    for (element in elements) {
        if (elements[element].tempHigh !== undefined && (elements[element].stateHigh === undefined || elements[element].forceAutoGen)) {
            var newname = elements[element].stateHighName;
            if ((elements[element].state === "solid" || !elements[element].state)) { // Melting
                if (!newname) { newname = "molten_" + element }
                autoGen(newname, element, "molten");
            }
            else if (elements[element].state === "liquid") { // Evaporating
                if (!newname) {
                    newname = element;
                    if (newname.startsWith("liquid_")) { newname = newname.substring(7); }
                    if (newname.startsWith("molten_")) { newname = newname.substring(7); }
                    newname += "_gas";
                }
                autoGen(newname, element, "vaporize");
            }
        }
        if (elements[element].tempLow !== undefined && (elements[element].stateLow === undefined || elements[element].forceAutoGen)) {
            var newname = elements[element].stateLowName;
            if (elements[element].state === "liquid") { // Freezing
                if (!newname) {
                    newname = element;
                    if (newname.startsWith("liquid_")) { newname = newname.substring(7); }
                    if (newname.endsWith("_water")) { newname = newname.substring(0, newname.length - 6); }
                    newname += "_ice";
                }
                autoGen(newname, element, "frozen");
            }
            else if (elements[element].state === "gas") { // Condensing
                if (!newname) {
                    newname = element;
                    if (newname.endsWith("_gas")) { newname = newname.substring(0, newname.length - 4); }
                    newname = "liquid_" + newname;
                }
                autoGen(newname, element, "condense");
            }
        }
        if (elements[element].behavior && typeof elements[element].behavior[0] === "string") {
            var newbehavior = [];
            for (var i = 0; i < elements[element].behavior.length; i++) {
                newbehavior.push(elements[element].behavior[i].split("|"));
            }
            elements[element].behavior = newbehavior;
        }
        if (elements[element].behaviorOn && typeof elements[element].behaviorOn[0] === "string") {
            var newbehavior = [];
            for (var i = 0; i < elements[element].behaviorOn.length; i++) {
                newbehavior.push(elements[element].behaviorOn[i].split("|"));
            }
            elements[element].behaviorOn = newbehavior;
        }
    }

    // Loop through each element, final checks
    nextid = 1;
    for (key in elements) {
        elements[key].id = nextid;
        nextid++;
        // If the element has no behavior, set it to behaviors.WALL
        if (!elements[key].behavior && !elements[key].tick) {
            elements[key].tick = function (pixel) { };
        }
        // If the behavior is a function, delete it and set tick to it instead
        if (typeof elements[key].behavior === "function") {
            if (elements[key].tick) {
                elements[key].tick1 = elements[key].tick;
                elements[key].tick2 = elements[key].behavior;
                elements[key].tick = function (pixel) {
                    if (pixel.start === pixelTicks) { return }
                    var id = elements[pixel.element].id;
                    elements[pixel.element].tick1(pixel);
                    if (!pixel.del && id === elements[pixel.element].id) {
                        elements[pixel.element].tick2(pixel);
                    }
                }
            }
            else {
                elements[key].tick = elements[key].behavior;
            }
            delete elements[key].behavior;
        }
        // If the element has no color, set it to white
        if (elements[key].color === undefined) {
            elements[key].color = "rgb(255,255,255)";
            elements[key].colorObject = { r: 255, g: 255, b: 255 };
        }
        // If the element's behavior is an array and contains M1 or M2, set its movable to true
        if (elements[key].behavior && typeof elements[key].behavior[0] === "object") {
            var bstring = JSON.stringify(elements[key].behavior);
            if (bstring.indexOf("M1") !== -1 || bstring.indexOf("M2") !== -1) { elements[key].movable = true; }
        }
        if (elements[key].tick) { elements[key].movable = true; }
        if (elements[key].behavior) {
            // If the element's behavior[1][1] includes "FX", set it's flippableX to true
            if (elements[key].behavior[1][1].indexOf("FX") !== -1) {
                elements[key].flippableX = true;
            }
            // If the element's behavior[1][1] includes "FY", set it's flippableY to true
            if (elements[key].behavior[1][1].indexOf("FY") !== -1) {
                elements[key].flippableY = true;
            }

            // If the element's behavior stringified includes "BO", loop through the behavior
            if (elements[key].behavior.toString().indexOf("BO") !== -1 && !elements[key].rotatable) {
                for (var i = 0; i < elements[key].behavior.length; i++) {
                    // Loop through each array in the behavior
                    for (var j = 0; j < elements[key].behavior[i].length; j++) {
                        // If the behavior includes "BO", set the behaviorOn to the behavior
                        if (elements[key].behavior[i][j].indexOf("BO") !== -1) {
                            if ((i == 0 && j == 0) || (i == 0 && j == 2) || (i == 2 && j == 0) && (i == 2 && j == 2)) {
                                elements[key].flippableX = true;
                                elements[key].flippableY = true;
                            }
                            else if (i == 0 || i == 2) {
                                elements[key].flippableY = true;
                            }
                            else if (j == 0 || j == 2) {
                                elements[key].flippableX = true;
                            }
                        }
                    }
                }
            }

            // If the element's behavior[1][1] includes "RT", set it's rotatable to "true"
            if (elements[key].behavior[1][1].indexOf("RT") !== -1) {
                elements[key].rotatable = true;
            }

        }

        // If the element's state is "gas", isGas = true
        if (elements[key].state === "gas") {
            elements[key].isGas = true;
        }
        // Else if the state is not "solid" or "liquid", delete it
        else if (elements[key].state !== "solid" && elements[key].state !== "liquid") {
            delete elements[key].state;
        }

        // If the element has reactions, loop through each one (it is an object), if the value for elem1 or elem2 is not an element and is not null, remove that key
        if (elements[key].reactions) {
            for (var reaction in elements[key].reactions) {
                // If elem1 exists
                if (elements[key].reactions[reaction].elem1) {
                    // If elem1 is an array, loop through each element, else check once. Don't delete if it === null
                    if (Array.isArray(elements[key].reactions[reaction].elem1)) {
                        for (var i = 0; i < elements[key].reactions[reaction].elem1.length; i++) {
                            if (elements[key].reactions[reaction].elem1[i] && !elements[elements[key].reactions[reaction].elem1[i]]) {
                                elements[key].reactions[reaction].elem1.splice(i, 1);
                            }
                        }
                    }
                    else if (elements[key].reactions[reaction].elem1 && !elements[elements[key].reactions[reaction].elem1]) {
                        delete elements[key].reactions[reaction].elem1;
                    }
                }
                // If elem2 exists
                if (elements[key].reactions[reaction].elem2) {
                    // If elem2 is an array, loop through each element, else check once. Don't delete if it === null
                    if (Array.isArray(elements[key].reactions[reaction].elem2)) {
                        for (var i = 0; i < elements[key].reactions[reaction].elem2.length; i++) {
                            if (elements[key].reactions[reaction].elem2[i] && !elements[elements[key].reactions[reaction].elem2[i]]) {
                                elements[key].reactions[reaction].elem2.splice(i, 1);
                            }
                        }
                    }
                    else if (elements[key].reactions[reaction].elem2 && !elements[elements[key].reactions[reaction].elem2]) {
                        delete elements[key].reactions[reaction].elem2;
                    }
                }
            }
        }

        // If the element's stateHigh or stateLow is not an element, remove it and tempHigh/Low
        if (elements[key].stateHigh) {
            // If it's an array, do it for each item, otherwise, just do it once
            if (Array.isArray(elements[key].stateHigh)) {
                for (var i = 0; i < elements[key].stateHigh.length; i++) {
                    if (!elements[elements[key].stateHigh[i]] && elements[key].stateHigh[i] !== null) {
                        elements[key].stateHigh.splice(i, 1);
                    }
                }
                if (elements[key].stateHigh.length == 0) {
                    delete elements[key].stateHigh;
                    delete elements[key].tempHigh;
                }
            }
            else {
                if (!elements[elements[key].stateHigh] && elements[key].stateHigh !== null) {
                    delete elements[key].stateHigh;
                    delete elements[key].tempHigh;
                }
            }
        }
        if (elements[key].stateLow) {
            if (Array.isArray(elements[key].stateLow)) {
                for (var i = 0; i < elements[key].stateLow.length; i++) {
                    if (!elements[elements[key].stateLow[i]] && elements[key].stateLow[i] !== null) {
                        elements[key].stateLow.splice(i, 1);
                    }
                }
                if (elements[key].stateLow.length == 0) {
                    delete elements[key].stateLow;
                    delete elements[key].tempLow;
                }
            }
            else {
                if (!elements[elements[key].stateLow] && elements[key].stateLow !== null) {
                    delete elements[key].stateLow;
                    delete elements[key].tempLow;
                }
            }
        }
        // same for burnInto
        if (elements[key].burnInto) {
            if (Array.isArray(elements[key].burnInto)) {
                for (var i = 0; i < elements[key].burnInto.length; i++) {
                    if (!elements[elements[key].burnInto[i]]) {
                        delete elements[key].burnInto[i];
                    }
                }
                if (elements[key].burnInto.length == 0) {
                    delete elements[key].burnInto;
                }
            }
            else {
                if (!elements[elements[key].burnInto]) {
                    delete elements[key].burnInto;
                }
            }
        }
        // same for breakInto
        if (elements[key].breakInto) {
            if (Array.isArray(elements[key].breakInto)) {
                for (var i = 0; i < elements[key].breakInto.length; i++) {
                    if (elements[key].breakInto[i] !== null && !elements[elements[key].breakInto[i]]) { delete elements[key].breakInto[i]; }
                }
                if (elements[key].breakInto.length == 0) { delete elements[key].breakInto; }
            }
            else {
                if (elements[key].breakInto[i] !== null && !elements[elements[key].breakInto]) { delete elements[key].breakInto; }
            }
        }

        if (elements[key].colorPattern) {
            if (!elements[key].colorKey) {
                delete elements[key].colorPattern;
            }
            else {
                var newPattern = [];
                for (var i = 0; i < elements[key].colorPattern.length; i++) {
                    newPattern.push([]);
                    var line = elements[key].colorPattern[i];
                    // loop through each character in the line
                    for (var j = 0; j < line.length; j++) {
                        var char = line[j];
                        if (elements[key].colorKey[char]) {
                            if (elements[key].colorKey[char].startsWith("#")) {
                                var rgb = hexToRGB(elements[key].colorKey[char]);
                                elements[key].colorKey[char] = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
                            }
                            newPattern[i].push(elements[key].colorKey[char]);
                        }
                        else {
                            newPattern[i].push("rgb(255,255,255)");
                        }
                    }
                }
                elements[key].colorPattern = newPattern;
                delete elements[key].colorKey;
            }
        }


    }

    // Generate worldgen options
    // Loop through the worldgentypes object, add the key to the #worldgenselect select as an option with the value of the key and the name of the key capitalized and underscores replaced with spaces
    for (var key in worldgentypes) {
        document.getElementById("worldgenselect").innerHTML += "<option value='" + key + "'>" + key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()) + "</option>";
    }
    if (settings["worldgen"] && !worldgentypes[settings["worldgen"]]) {
        settings["worldgen"] = "off";
    }

    // Loop through randomEventChoices, and loop through the array of each. If the element doesn't exist, remove it from the array.
    for (var key in randomEventChoices) {
        for (var i = 0; i < randomEventChoices[key].length; i++) {
            if (!elements[randomEventChoices[key][i]]) {
                randomEventChoices[key].splice(i, 1);
            }
        }
    }

    // Poison == poison gas reactions
    if (elements.poison && elements.poison_gas) {
        if (elements.poison.reactions) {
            elements.poison_gas.reactions = elements.poison.reactions;
        }
    }

    // Load settings
    // Loop through all the elements with setting-span class.
    // If the span's setting attribute is in settings, set the first select or input to the value of the setting.
    var settingSpans = document.getElementsByClassName("setting-span");
    for (var i = 0; i < settingSpans.length; i++) {
        var setting = settingSpans[i].getAttribute("setting");
        if (setting in settings) {
            var settingValue = settings[setting];
            var toggleButtons = settingSpans[i].getElementsByClassName("toggleInput");
            if (toggleButtons.length > 0) {
                if (settingValue == 1) {
                    toggleButtons[0].setAttribute("state", "1");
                    toggleButtons[0].value = "ON";
                }
                else {
                    toggleButtons[0].setAttribute("state", "0");
                    toggleButtons[0].value = "OFF";
                }
            }
            else {
                var settingElements = settingSpans[i].getElementsByTagName("select")
                if (settingElements.length === 0) {
                    settingElements = settingSpans[i].getElementsByTagName("input");
                }
                if (settingElements.length > 0) {
                    settingElements[0].value = settingValue;
                }
            }
        }
    }



    var gameCanvas = document.getElementById("game");
    // Get context
    var ctx = gameCanvas.getContext("2d");
    var newWidth = Math.ceil(window.innerWidth * 0.9 / pixelSize) * pixelSize;
    var newHeight = Math.ceil(window.innerHeight * 0.675 / pixelSize) * pixelSize;
    // If the new width is greater than 800, set it to 800
    if (newWidth > 1000) { newWidth = 1000; }
    // If we are on a desktop and the new height is greater than 600, set it to 600
    if (window.innerWidth > 1000 && newHeight > 500) { newHeight = 500; }
    ctx.canvas.width = newWidth;
    ctx.canvas.height = newHeight;
    document.getElementById("gameDiv").style.width = newWidth + "px";
    document.getElementById("loadingP").style.display = "none";
    document.getElementById("canvasDiv").style.display = "block";


    width = Math.round(newWidth / pixelSize) - 1;
    height = Math.round(newHeight / pixelSize) - 1;
    mousePos = { x: width / 2, y: height / 2 };
    if (settings["worldgen"]) {
        clearAll();
    }
    else {
        // Object with width arrays of pixels starting at 0
        pixelMap = [];
        for (var i = 0; i < width; i++) {
            pixelMap[i] = [];
        }
    }
    // randomChoices = the keys of "elements" with any element with the category "tools" or the property excludeRandom set to true removed
    randomChoices = Object.keys(elements).filter(function (e) {
        return elements[e].excludeRandom != true && elements[e].category != "tools" && !elements[e].tool;
    });
    gameCanvas.addEventListener("mousedown", mouseClick);
    gameCanvas.addEventListener("touchstart", mouseClick, { passive: false });
    window.addEventListener("mouseup", mouseUp);
    window.addEventListener("touchend", mouseUp, { passive: false });
    window.addEventListener("mousemove", mouseMove);
    gameCanvas.addEventListener("touchmove", mouseMove, { passive: false });
    gameCanvas.addEventListener("wheel", wheelHandle);
    gameCanvas.ontouchstart = function (e) {
        if (e.touches) e = e.touches[0];
        return false;
    }
    gameCanvas.addEventListener("dragenter", function (e) { e.stopPropagation(); e.preventDefault(); })
    gameCanvas.addEventListener("dragover", function (e) { e.stopPropagation(); e.preventDefault(); })
    gameCanvas.addEventListener("drop", function (e) {
        e.stopPropagation();
        e.preventDefault();
        var url = e.dataTransfer.getData('text/plain');
        if (url) {
            var img = new Image();
            img.onload = function () { placingImage = img; placeImage(); placingImage = null; }
            img.src = url;
            // for img file(s), read the file & draw to canvas
        } else {
            console.log(e.dataTransfer.files)
            if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) { return; }
            var file = e.dataTransfer.files[0];
            if (file.type.indexOf('image/') === -1) { return; }
            var img = document.createElement("img");
            img.classList.add("obj");
            img.file = file;
            var reader = new FileReader();
            reader.onload = (function (aImg) {
                return function (e) {
                    aImg.onload = function () {
                        placingImage = aImg;
                        placeImage();
                        placingImage = null;
                    }
                    // e.target.result is a dataURL for the image
                    aImg.src = e.target.result;
                };
            })(img);
            reader.readAsDataURL(file);
        }
    }, false);
    // if pasted image, draw to canvas
    window.addEventListener("paste", function (e) {
        if (e.clipboardData) {
            var items = e.clipboardData.items;
            if (!items) { return; }
            var item = items[items.length - 1];
            if (item.type.indexOf('image/') === -1) { return; }
            var blob = item.getAsFile();
            var URLObj = window.URL || window.webkitURL;
            var source = URLObj.createObjectURL(blob);
            var img = new Image();
            img.onload = function () { placingImage = img; placeImage(); placingImage = null; }
            img.src = source;
        }
    }, false);
    window.onbeforeunload = function () { // Confirm leaving page if there are pixels on-screen
        if (currentPixels.length > 0) {
            return 'Are you sure you want to leave?';
        }
    };
    // If enabledMods has items, add an li to modManagerList for each item with the href to the item, target blank, and the item's name, with "<span class="removeModX" onclick='removeMod('>X</span>" after the link
    if (enabledMods.length > 0) {
        modManagerList = document.getElementById("modManagerList");
        for (var i = 0; i < enabledMods.length; i++) {
            var mod = enabledMods[i];
            // modName is the last part of the mod's path
            var modName = mod.split("/").pop();
            modManagerList.innerHTML += "<li><a href='" + mod + "' target='_blank'>" + modName + "</a> <span class='removeModX' onclick='removeMod(\"" + mod + "\")'>X</span></li>";
        }
    }
    else {
        document.getElementById("noMods").style.display = "block";
    }
    document.getElementById("game").oncontextmenu = function (e) { e.preventDefault(); return false; }
    // If the user presses [ or -, decrease the mouse size by 2
    document.addEventListener("keydown", function (e) {
        if (e.ctrlKey || e.metaKey) {
            return
        }
        // else if tab, set document.body.class to "usingTab"
        else if (e.keyCode == 9) {
            document.body.classList.add("usingTab");
        }
        // F1 = hide #underDiv, #infoParent, #modParent, #pagetitle, #colorSelector if they aren't hidden, otherwise show them
        if (e.keyCode == 112) {
            e.preventDefault();
            if (document.getElementById("underDiv").style.display == "none") {
                document.getElementById("underDiv").style.display = "block";
                document.getElementById("pagetitle").style.display = "block";
                document.getElementById("colorSelector").style.display = "block";
                document.getElementById("bottomInfoBox").style.display = "block";
            } else {
                document.getElementById("underDiv").style.display = "none";
                if (showingMenu) {
                    closeMenu()
                };
                document.getElementById("pagetitle").style.display = "none";
                document.getElementById("colorSelector").style.display = "none";
                document.getElementById("bottomInfoBox").style.display = "none";
            }
        }
        if (showingMenu) {
            // esc or / or tab / or \ (while in settings) to close
            if (e.keyCode == 27 || (e.keyCode == 191 && showingMenu == "info") || e.keyCode == 9 || (e.keyCode == 220 && showingMenu == "settings")) {
                e.preventDefault();
                closeMenu();
            }
            // enter to clear infoSearch
            else if (e.keyCode == 13 && showingMenu == "info") {
                var infoSearch = document.getElementById("infoSearch");
                infoSearch.value = "";
                showInfo();
            }
            return;
        }
        if (e.keyCode == 219 || e.keyCode == 189) {
            if (shiftDown) { mouseSize = 1 }
            else {
                mouseSize -= 2;
                if (mouseSize < 1) { mouseSize = 1; }
            }
        }
        // If the user presses ] or =, increase the mouse size by 2
        if (e.keyCode == 221 || e.keyCode == 187) {
            if (shiftDown) { mouseSize = (mouseSize + 15) - ((mouseSize + 15) % 15) }
            else { mouseSize += 2; }
            // if height>width and mouseSize>height, set mouseSize to height, if width>height and mouseSize>width, set mouseSize to width
            if (mouseSize > (height > width ? height : width)) { mouseSize = (height > width ? height : width); }
        }
        // User presses shift
        else if (e.keyCode == 16) {
            if (event.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT) {
                shiftDown = 1;
            } else if (event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
                shiftDown = 3;
            }
        }
        // User presses alt
        else if (e.keyCode == 18) {
            if (event.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT) {
                shiftDown = 2;
            } else if (event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
                shiftDown = 4;
            }
        }
        // p or spacebar or ` or k = pause
        if (e.keyCode == 80 || e.keyCode == 32 || e.keyCode == 192 || e.keyCode == 75) {
            e.preventDefault();
            togglePause();
        }
        // e = chooseElementPrompt()
        else if (e.keyCode == 69) {
            e.preventDefault();
            chooseElementPrompt();
        }
        // r = resetPrompt()
        else if (e.keyCode == 82) {
            e.preventDefault();
            resetPrompt();
        }
        // . = doFrame()
        else if (e.keyCode == 190) {
            e.preventDefault();
            doFrame();
        }
        // / or i = showInfo()
        else if (e.keyCode == 191 || e.keyCode == 73) {
            e.preventDefault();
            showInfo();
        }
        // f = full screen
        else if (e.keyCode == 70) {
            e.preventDefault();
            if (document.fullscreenElement) {
                document.exitFullscreen(document.body);
            } else {
                requestFullScreen(document.body);
            }
        }
        // 0-9 = setView(the number)
        else if (e.keyCode >= 48 && e.keyCode <= 57) {
            // if not command or control down, set view to the number
            e.preventDefault();
            setView(e.keyCode - 48);
        }
        // right arrow = switch the category to the one after the current category
        else if (e.keyCode == 39) {
            e.preventDefault();
            // in categoryControls, find the button with the class categoryButton and the attribute current="true"
            var currentButton = document.querySelector(".categoryButton[current='true']");
            var currentCategory = currentButton.getAttribute("category");
            // get the categoryButton that is after the current one in the div
            var nextButton = currentButton.nextElementSibling;
            // if there is no next button, go to the first one
            if (nextButton == null) {
                nextButton = document.querySelector(".categoryButton");
            }
            var nextCategory = nextButton.getAttribute("category");
            selectCategory(nextCategory);
            // focus on categoryControls
            document.getElementById("categoryControls").focus();
        }
        // left arrow = switch the category to the one before the current category
        else if (e.keyCode == 37) {
            e.preventDefault();
            // in categoryControls, find the button with the class categoryButton and the attribute current="true"
            var currentButton = document.querySelector(".categoryButton[current='true']");
            var currentCategory = currentButton.getAttribute("category");
            // get the categoryButton that is before the current one in the div
            var prevButton = currentButton.previousElementSibling;
            // if there is no previous button, go to the last one
            if (prevButton == null) {
                prevButton = document.querySelector(".categoryButton:last-child");
            }
            var prevCategory = prevButton.getAttribute("category");
            selectCategory(prevCategory);
        }
        // m = closeMenu() and showModManager()
        else if (e.keyCode == 77) {
            e.preventDefault();
            closeMenu();
            showModManager();
        }
        // \ = closeMenu() and showSettings()
        else if (e.keyCode == 220) {
            e.preventDefault();
            closeMenu();
            showSettings();
        }
        // c or F2 = screenshot
        else if (e.keyCode == 67 || e.keyCode == 113) {
            e.preventDefault();
            var link = document.createElement('a');
            link.setAttribute('download', 'sandboxels-screenshot.png');
            link.setAttribute('href', document.getElementById("game").toDataURL("image/png").replace("image/png", "image/octet-stream"));
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }


        // x = explodeAt()
        /*else if (e.keyCode == 88) {
            e.preventDefault();
            explodeAt(mousePos.x, mousePos.y, Math.round(mouseSize/2));
        }*/

    });
    // If the user releases either shift
    document.addEventListener("keyup", function (e) {
        if (e.keyCode == 16 || e.keyCode == 18) {
            shiftDown = 0;
            if (shaping) {
                shaping = 0;
                shapeStart = null;
            }
        }
    });

    // Create buttons for elements
    // For each element type in elements, create a button in controls that sets the current element to that type
    // Alphabetically sort and loop through dictionary named "elements"
    elementCount = 0;
    hiddenCount = 0;
    categoryList = [];
    for (var element in elements) {
        elementCount++;
        if (settings.cheerful && elements[element].nocheer) {
            elements[element].hidden = true;
            hiddenCount++;
            continue;
        }
        var category = elements[element].category;
        if (category == null) { category = "other" }
        if (categoryList.indexOf(category) === -1) {
            categoryList.push(category);
        }
        if (elements[element].hidden && (!settings["unhide"] || (settings["unhide"] === 2 && !settings.unlocked[element]))) { hiddenCount++; continue; }
        var categoryDiv = document.getElementById("category-" + category);
        if (categoryDiv == null) {
            createCategoryDiv(category);
            categoryDiv = document.getElementById("category-" + category);
        }
        createElementButton(element);
    }
    // Set the first button in categoryControls div to be the current category
    document.getElementById("categoryControls").children[0].click()
    document.getElementById("extraInfo").insertAdjacentHTML("beforeend", "<small><p>v" + currentversion + " • " + elementCount + " elements, including " + hiddenCount + " hidden ones.</p><p>©2021-" + new Date().getFullYear() + ". All Rights Reserved. <a style='color:#00ffff' href='https://r74n.com'>R74n</a></p></small>");
    selectElement(currentElement);
    focusGame();
    // For every button element, onkeyup="event.preventDefault()"
    var buttonElements = document.getElementsByTagName("button");
    for (var i = 0; i < buttonElements.length; i++) {
        buttonElements[i].onkeyup = function (e) {
            e.preventDefault();
        }
    }

    if (window.self !== window.top && !location.ancestorOrigins[0].includes("itch.io")) {
        // Open a message that tells the user they aren't on the real website
        var menuParent = document.createElement("div");
        menuParent.className = "menuParent";
        menuParent.style.display = "block";
        menuParent.innerHTML = `<div class="menuScreen">
<button class="XButton" onclick="closeMenu();">-</button>
<span class="menuTitle">Sandboxels</span>
<div class="menuText" style="padding-top:1em">
You may be on a website that has embedded our game involuntarily.
<br><br>
The real game is at this URL: <a href="https://sandboxels.r74n.com" target="_blank">sandboxels.R74n.com</a>.
<br><br>
Please use the main website to support us instead.
<br><br>
You can also join our <a href="https://discord.gg/ejUc6YPQuS" target="_blank">Discord</a> if that isn't possible.
</div>
<br><br><br><br>
</div>`
        document.body.appendChild(menuParent);
        showingMenu = "alert";
    }
    //get the first .elementButton in the first .category, and selectElement(button.element)
    var firstDiv = document.getElementsByClassName("category")[0];
    var firstElementButton = firstDiv.getElementsByClassName("elementButton")[0];
    selectElement(firstElementButton.getAttribute("element"));

}