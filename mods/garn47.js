// mod by nekonico :3

behaviors.CAR_DELETE = function(pixel) {
    if (carDieSound) { createPixel("car_explosion",pixel.x, pixel.y), carDieSound.play(); }
},

behaviors.CARFEEDPIXEL = function(pixel) {
    if (!pixel.food) { pixel.food = 1, carDieSound.play(); }
    else { pixel.food ++, carDieSound.play(); }
    if (pixel.food > (elements[pixel.element].foodNeed||30)) {
        // loop through adjacentCoords and check each pixel to lay an egg
        for (var i = 0; i < adjacentCoords.length; i++) {
            var x = pixel.x+adjacentCoords[i][0];
            var y = pixel.y+adjacentCoords[i][1];
            if (isEmpty(x, y)) {
                if (elements[pixel.element].egg) {
                    createPixel(elements[pixel.element].egg,x,y)
                }
                else {
                    createPixel("egg",x,y)
                    pixelMap[x][y].animal = elements[pixel.element].baby || pixel.element;
                    if (elements[pixel.element].eggColor) {
                        pixelMap[x][y].color = pixelColorPick(pixelMap[x][y],elements[pixel.element].eggColor)
                    }
                }
                pixel.food = 0;
                break;
            }
        }
    }
},

document.onkeydown = function(ki)/*keyboard_input*/ {
    //w
    if (ki.keyCode == 87) {
        KW = true;
        //vY ++;
    }
    //s
    if (ki.keyCode == 83) {
        KS = true;
        //vY ++;
    }
}
document.onkeyup = function(i2)/*keyboard_input*/ {
    //w
    if (i2.keyCode == 87) {
        garnWalkSound.pause()
        KW = false
        //vY = 0;
    }
    //s
    if (i2.keyCode == 83) {
        garnWalkSound.pause()
        KS = false
        //vY = 0;
    }
}
var KA = false;
var KD = false;
var KW = false;
var KS = false;
var vX = 1;
var vY = 1;
elements.garn = {
    name: "garn47",
    color: "#52562B",
    category: "special",
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    onPlace: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            createPixel("garn_body", pixel.x, pixel.y+1);
            pixel.element = "garn_head";
        }
        else if (isEmpty(pixel.x, pixel.y-1)) {
            createPixel("garn_head", pixel.x, pixel.y-1);
            pixelMap[pixel.x][pixel.y-1].color = pixel.color;
            pixel.element = "garn_body";
            pixel.color = pixelColorPick(pixel)
        }
        else {
            deletePixel(pixel.x, pixel.y);
        }
    },
    related: ["garn_body","garn_head"],
    cooldown: defaultCooldown,
    forceSaveColor: true,
},

elements.garn_body = {
    name: "garn",
    tick: function(pixel) {
        if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
            if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
                var headpixel = pixelMap[pixel.x][pixel.y-2];
                if (headpixel.element == "garn_head") {
                    if (isEmpty(pixel.x, pixel.y-1)) {
                        movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
                    }
                }
            }
        }
        /*if (vX === 3) {
            vX --;
        }
        if (vY === 3) {
            vY --;
        }*/
        if (KS === true && isEmpty(pixel.x-2, pixel.y-1) && isEmpty(pixel.x-2, pixel.y)) {
            tryMove (pixel,pixel.x-1,pixel.y)
            garnWalkSound.play();
        }
        if (KW === true && isEmpty(pixel.x+2, pixel.y-1) && isEmpty(pixel.x+2, pixel.y)) {
            tryMove (pixel,pixel.x+1,pixel.y)
            garnWalkSound.play();
        }
    },
    category: "special",
    states:"solid",
    color:"#52562B",
}

elements.garn_head = {
    name: "garn",
    tick: function(pixel) {
        /*if (vX === 3) {
            vX --;
        }
        if (vY === 3) {
            vY --;
        }*/
        if (KS === true && isEmpty(pixel.x-2, pixel.y+1) && isEmpty(pixel.x-2, pixel.y)) {
            tryMove (pixel,pixel.x-1,pixel.y)
            garnWalkSound.play();
        }
        if (KW === true && isEmpty(pixel.x+2, pixel.y+1) && isEmpty(pixel.x+2, pixel.y)) {
            tryMove (pixel,pixel.x+1,pixel.y)
            garnWalkSound.play();
        }
    },
    category: "special",
    states:"solid",
    color:"#52562B",
}

elements.car = { // totally carnular
	color: ["#9F8578","#A07D6A"],
    behavior: [
        "XX|XX|XX",
        "XX|FX%0.25 AND CH:car_slide%1|XX",
        "XX|M1|XX",
    ],
    reactions: {
        "meat": { elem2:null, chance:0.2, func:behaviors.CARFEEDPIXEL },
        "cooked_meat": { elem2:null, chance:0.2, func:behaviors.CARFEEDPIXEL },
        "": { elem2:null, chance:0.2, func:behaviors.CARFEEDPIXEL },
        "meat": { elem2:null, chance:0.2, func:behaviors.CARFEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.3 },
        "uranium": { elem2:null, chance:0.1, func:behaviors.CARFEEDPIXEL },
        "milk": { elem2:null, chance:0.1, func:behaviors.CARFEEDPIXEL },
    },
    onDelete: behaviors.CAR_DELETE,
    tick: function(pixel) {
        if (pixel.start === pixelTicks) {return}
        if (!tryMove(pixel, pixel.x, pixel.y+1)) {
            if (pixel.fall < 20) {
                if (Math.random() < 0.5) {
                    if (!tryMove(pixel, pixel.x+1, pixel.y+1)) {
                        tryMove(pixel, pixel.x-1, pixel.y+1);
                    }
                } else {
                    if (!tryMove(pixel, pixel.x-1, pixel.y+1)) {
                        tryMove(pixel, pixel.x+1, pixel.y+1);
                    }
                }
                pixel.fall = 0;
            }
            else if (outOfBounds(pixel.x,pixel.y+1) || (!isEmpty(pixel.x,pixel.y+1,true) && elements.egg.ignore.indexOf(pixelMap[pixel.x][pixel.y+1].element) === -1 && elements[pixelMap[pixel.x][pixel.y+1].element].state === "solid")) {
                pixel.element = "car_explosion"
                carDieSound.play();
            }
            else {pixel.fall = 0}
        }
        else {pixel.fall ++}
        doDefaults(pixel);
    },
    ignore: ["paper","sponge","straw","wheat","rat","frog","pollen","clay","snow","mud","wet_sand","tinder","feather","bread","ice_cream","dough"],
    innerColor: "#9F8578",
    properties: { "fall":0 },
    egg: "car",
    foodNeed: 100,
    maxSize: 1,
    cooldown: 10,
    temp: 20,
    tempHigh: 1500,
    stateHigh: "car_explosion",
    category:"life",
    burn:15,
    burnTime:300,
    state: "solid",
    density: 1450,
    conduct: 0.2
}

elements.car_slide = {
    name: "car",
    hidden: true,
	color: ["#9F8578","#A07D6A"],
    behavior: [
        "XX|XX|XX",
        "XX|FX%0.25 AND CH:car%10|M2 AND BO",
        "XX|M1|XX",
    ],
    reactions: {
        "meat": { elem2:null, chance:0.2, func:behaviors.CARFEEDPIXEL },
        "cooked_meat": { elem2:null, chance:0.2, func:behaviors.CARFEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.3 },
        "uranium": { elem2:null, chance:0.1, func:behaviors.CARFEEDPIXEL },
        "milk": { elem2:null, chance:0.1, func:behaviors.CARFEEDPIXEL },
    },
    onDelete: behaviors.CAR_DELETE,
    tick: function(pixel) {
        if (pixel.start === pixelTicks) {return}
        if (!tryMove(pixel, pixel.x, pixel.y+1)) {
            if (pixel.fall < 20) {
                if (Math.random() < 0.5) {
                    if (!tryMove(pixel, pixel.x+1, pixel.y+1)) {
                        tryMove(pixel, pixel.x-1, pixel.y+1);
                    }
                } else {
                    if (!tryMove(pixel, pixel.x-1, pixel.y+1)) {
                        tryMove(pixel, pixel.x+1, pixel.y+1);
                    }
                }
                pixel.fall = 0;
            }
            else if (outOfBounds(pixel.x,pixel.y+1) || (!isEmpty(pixel.x,pixel.y+1,true) && elements.egg.ignore.indexOf(pixelMap[pixel.x][pixel.y+1].element) === -1 && elements[pixelMap[pixel.x][pixel.y+1].element].state === "solid")) {
                pixel.element = "car_explosion"
                carDieSound.play();
            }
            else {pixel.fall = 0}
        }
        else {pixel.fall ++}
        doDefaults(pixel);
    },
    ignore: ["paper","sponge","straw","wheat","rat","frog","pollen","clay","snow","mud","wet_sand","tinder","feather","bread","ice_cream","dough"],
    innerColor: "#9F8578",
    properties: { "fall":0 },
    egg: "car",
    foodNeed: 100,
    maxSize: 1,
    cooldown: 10,
    tempHigh: 1500,
    stateHigh: "car_explosion",
    category:"life",
    burn:15,
    burnTime:300,
    state: "solid",
    density: 1450,
    conduct: 0.2
}

elements.car_explosion = {
    name: "explosion",
    color: ["#9F8578","#A07D6A"],
    behavior: [
        "XX|XX|XX",
        "XX|EX:5>smoke,fire,smoke,fire,fire,car_shard|XX",
        "XX|XX|XX",
    ],
    temp: 300,
    category: "energy",
    state: "gas",
    density: 1000,
    excludeRandom: true,
    noMix: true
},
elements.car_shard = {
    name: "glass_shard",
    color: ["#9F8578","#A07D6A"],
    behavior: behaviors.POWDER,
    reactions: {
        "radiation": { elem1:"rad_shard", chance:0.33 },
        "rad_steam": { elem1:"rad_shard", elem2:null, chance:0.33 },
        "fallout": { elem1:"rad_shard", elem2:"radiation", chance:0.1 }
    },
    tempHigh: 1500,
    stateHigh: "molten_glass",
    category: "powders",
    state: "solid",
    density: 2500
},

carSound = null;
carDieSound = null;
carEatSound = null;

elements.car.onSelect = function() {
    carSound = new Audio("https://static.wikia.nocookie.net/garn47/images/b/b9/Hello-its-me-car-made-with-Voicemod.mp3/revision/latest?cb=20240824212531");
    carDieSound = new Audio("https://static.wikia.nocookie.net/garn47/images/3/3e/Car-scream-made-with-Voicemod.mp3/revision/latest?cb=20240824214753");
    carEatSound = new Audio("https://static.wikia.nocookie.net/garn47/images/1/1e/Car-eating-made-with-Voicemod.mp3/revision/latest?cb=20240824220937");
}
elements.car.onMouseDown = function() {
    if (carSound) { carSound.play(); }
}

garnSound = null;
garnWalkSound = null;

elements.garn.onSelect = function() {
    garnSound = new Audio("https://static.wikia.nocookie.net/garn47/images/1/17/Garnular2.mp3/revision/latest?cb=20240614060855");
    garnWalkSound = new Audio("https://static.wikia.nocookie.net/garn47/images/8/8b/Garn47-Ingame-Walking.mp3/revision/latest?cb=20240606045834");
}
elements.garn.onMouseDown = function() {
    if (garnSound) { garnSound.play(); }
}

// totally garnular