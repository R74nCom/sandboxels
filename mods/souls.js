elements.soul = {
    color: "#87fff9",
    tick: function(pixel) {
        if (pixel.y <= 1) { deletePixel(pixel.x,pixel.y); return; }
        if (Math.random() < 0.05) {
            if (!tryMove(pixel,pixel.x,pixel.y-1)) {
                if (!isEmpty(pixel.x,pixel.y-1,true)) {
                    var hitPixel = pixelMap[pixel.x][pixel.y-1];
                    if (elements[hitPixel.element].movable) {
                        swapPixels(pixel,hitPixel);
                    }
                }
            }
        }
        var dir = pixel.flipX ? -1 : 1;
        if (!pixel.stage) {
            if (Math.random() < 0.25) {
                if (!tryMove(pixel,pixel.x+dir,pixel.y-( Math.random() < 0.33 ? 1 : 0 ))) {
                    pixel.flipX = !pixel.flipX;
                }
                if (Math.random() < 0.1) {
                    pixel.stage = 1;
                    pixel.flipX = Math.random() < 0.5;
                }
            }
        }
        else if (pixel.stage === 1) {
            if (!tryMove(pixel,pixel.x+dir,pixel.y+1)) { pixel.flipX = !pixel.flipX; }
            if (Math.random() < 0.25) {
                pixel.stage = 2;
                pixel.flipX = Math.random() < 0.5;
            }
        }
        else if (pixel.stage === 2) {
            if (Math.random() < 0.25) {
                var dirX = Math.floor(Math.random() * (2 - -1) + -1);
                var dirY = Math.floor(Math.random() * (2 - -1) + -1);
                tryMove(pixel,pixel.x+dirX,pixel.y+dirY);
            }
            if (Math.random() < 0.01) {
                pixel.stage = 0;
                pixel.flipX = Math.random() < 0.5;
            }
        }
        if (!pixel.glow) {
            if (Math.random() < 0.25) { pixel.glow = true; }
        }
        else if (Math.random() < 0.01) {
            pixel.glow = false;
            delete pixel.glow;
        }
        if (Math.random() < 0.0002 && isEmpty(pixel.x,pixel.y+1)) {
            createPixel("ectoplasm",pixel.x,pixel.y+1);
        }
        if (Math.random() < 0.001) {
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coords = adjacentCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (isEmpty(x,y)) {
                    createPixel("flash",x,y);
                    pixelMap[x][y].temp = -10;
                }
            }
        }
        doDefaults(pixel);
    },
    reactions: {
        "light_bulb": { charged:true, elem2:"explosion" },
        "led_r": { charged:true, elem2:"explosion" },
        "led_g": { charged:true, elem2:"explosion" },
        "led_b": { charged:true, elem2:"explosion" },
        "wire": { charge2:1, chance:0.05 },
        "body": { attr2:{"panic":20} },
        "proton": { elem1:null },
    },
    temp: -10,
    hardness: 100,
    flippableX: true,
    glow: true,
    state: "gas",
    density: 1000,
    ignoreAir: true,
    category: "life",
    insulate: true,
    hidden: true,
    emit: 3
}

elements.ectoplasm = {
    color: ["#ADF9E7","#c1fbed"],
    behavior: behaviors.LIQUID,
    tick: function(pixel) {
        if (pixel.temp >= -10 && Math.random() < 0.01 && pixelTicks-pixel.start > 100) {
            deletePixel(pixel.x,pixel.y)
        }
    },
    reactions: {
        "body": { attr2:{"panic":20} },
        "rock_wall": { elem1:null, elem2:"tombstone" }
    },
    temp: -10,
    category: "liquids",
    state: "liquid",
    density: 0.0001,
    ignoreAir: true,
    insulate: true,
    viscosity: 1666,
    hardness: 100,
    hidden: true,
    emit: 2
}

elements.head.breakInto = "soul";
elements.head.burnInto = "soul";
elements.head.stateHigh = "soul";
elements.head.stateLow = "soul";
elements.head.onDelete = function(pixel) {
    for (var i = 0; i < adjacentCoords.length; i++) {
        var coord = adjacentCoords[i];
        var x = pixel.x+coord[0];
        var y = pixel.y+coord[1];
        if (!isEmpty(x,y,true) && pixelMap[x][y].panic !== undefined) {
            pixelMap[x][y].panic += 20;
        }
    }
    releaseElement(pixel,"soul");
}
elements.head.onChange = function(pixel,element) {
    for (var i = 0; i < adjacentCoords.length; i++) {
        var coord = adjacentCoords[i];
        var x = pixel.x+coord[0];
        var y = pixel.y+coord[1];
        if (!isEmpty(x,y,true) && pixelMap[x][y].panic !== undefined) {
            pixelMap[x][y].panic += 20;
        }
    }
    if (element !== "soul") {
        releaseElement(pixel,"soul");
    }
}

elements.bless.reactions.soul = { elem2:"human" }
elements.bless.reactions.ectoplasm = { elem2:null }
elements.bless.reactions.tombstone = { elem2:"rock_wall" }

elements.tombstone = {
    color: ["#5f5f5f","#434343","#282828"],
    behavior: [
        "XX|CR:soul%0.01|XX",
        "CR:soul%0.01|XX|CR:soul%0.01",
        "XX|XX|XX",
    ],
    category:"special",
    tempHigh: 950,
    stateHigh: "magma",
    state: "solid",
    density: 2550,
    hardness: 0.5,
    breakInto: ["rock","rock","rock","rock","soul","ectoplasm"],
    onStateHigh: function(pixel) {
        releaseElement(pixel,"soul");
    },
    buttonGlow: "#87fff9"
}