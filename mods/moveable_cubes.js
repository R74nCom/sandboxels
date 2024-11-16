elements.steel_cube = {
    color: "#71797e",
    colorKey: {
        "L":"#888f94",
        "B":"#71797e"
    },
    colorPattern: [
        "BBLB",
        "BBBL",
        "BLBB",
        "LBBB"
    ],
    reactions: {
        "water": { elem1:"rust", chance:0.002 },
        "salt_water": { elem1:"rust", chance:0.004 },
        "dirty_water": { elem1:"rust", chance:0.03 },
        "pool_water": { elem1:"rust", chance:0.03 },
        "sugar_water": { elem1:"rust", chance:0.003 },
        "seltzer": { elem1:"rust", chance:0.005 },
        "salt": { elem1:"rust", chance:0.003 },
        "blood": { elem1:"rust", chance:0.002 },
        "infection": { elem1:"rust", chance:0.002 },
        "antibody": { elem1:"rust", chance:0.002 },
        "coffee": { elem1:"rust", chance:0.0002 },
        "tea": { elem1:"rust", chance:0.0002 },
        "broth": { elem1:"rust", chance:0.0002 },
        "juice": { elem1:"rust", chance:0.0002 },
        "nut_milk": { elem1:"rust", chance:0.0002 },
    },
    tempHigh: 1455.5,
    stateHigh: "molten_steel",
    category: "cubes",
    density: 7850,
    conduct: 0.42,
    hardness: 0.8,
    tick: function(pixel) {
        if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
            if (!isEmpty(pixel.x, pixel.y-2, true)) { 
                var cube2 = pixelMap[pixel.x][pixel.y-2];
                if (cube2.element == "steel") {
                    if (isEmpty(pixel.x, pixel.y-1)) {
                        movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
                    }
                }
            }
            if (!isEmpty(pixel.x+1, pixel.y-1, true)) { 
                var cube2 = pixelMap[pixel.x+1][pixel.y-1];
                if (cube2.element == "steel") {
                    if (isEmpty(pixel.x+1, pixel.y)) {
                        movePixel(pixelMap[pixel.x+1][pixel.y-1], pixel.x+1, pixel.y);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x+1][pixel.y-1], pixelMap[pixel.x+1][pixel.y]);
                    }
                }
            }
            if (!isEmpty(pixel.x+2, pixel.y-1, true)) { 
                var cube2 = pixelMap[pixel.x+2][pixel.y-1];
                if (cube2.element == "steel") {
                    if (isEmpty(pixel.x+2, pixel.y)) {
                        movePixel(pixelMap[pixel.x+2][pixel.y-1], pixel.x+2, pixel.y);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x+2][pixel.y-1], pixelMap[pixel.x+2][pixel.y]);
                    }
                }
            }
            if (!isEmpty(pixel.x-1, pixel.y-1, true)) { 
                var cube2 = pixelMap[pixel.x-1][pixel.y-1];
                if (cube2.element == "steel") {
                    if (isEmpty(pixel.x-1, pixel.y)) {
                        movePixel(pixelMap[pixel.x-1][pixel.y-1], pixel.x-1, pixel.y);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x-1][pixel.y-1], pixelMap[pixel.x-1][pixel.y]);
                    }
                }
            }
            if (!isEmpty(pixel.x-2, pixel.y-1, true)) { 
                var cube2 = pixelMap[pixel.x-2][pixel.y-1];
                if (cube2.element == "steel") {
                    if (isEmpty(pixel.x-2, pixel.y)) {
                        movePixel(pixelMap[pixel.x-2][pixel.y-1], pixel.x-2, pixel.y);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x-2][pixel.y-1], pixelMap[pixel.x-2][pixel.y]);
                    }
                }
            }
            if (!isEmpty(pixel.x+1, pixel.y-2, true)) { 
                var cube2 = pixelMap[pixel.x+1][pixel.y-2];
                if (cube2.element == "steel") {
                    if (isEmpty(pixel.x+1, pixel.y-1)) {
                        movePixel(pixelMap[pixel.x+1][pixel.y-2], pixel.x+1, pixel.y-1);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x+1][pixel.y-2], pixelMap[pixel.x+1][pixel.y-1]);
                    }
                }
            }
            if (!isEmpty(pixel.x+2, pixel.y-2, true)) { 
                var cube2 = pixelMap[pixel.x+2][pixel.y-2];
                if (cube2.element == "steel") {
                    if (isEmpty(pixel.x+2, pixel.y-1)) {
                        movePixel(pixelMap[pixel.x+2][pixel.y-2], pixel.x+2, pixel.y-1);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x+2][pixel.y-2], pixelMap[pixel.x+2][pixel.y-1]);
                    }
                }
            }
            if (!isEmpty(pixel.x-1, pixel.y-2, true)) { 
                var cube2 = pixelMap[pixel.x-1][pixel.y-2];
                if (cube2.element == "steel") {
                    if (isEmpty(pixel.x-1, pixel.y-1)) {
                        movePixel(pixelMap[pixel.x-1][pixel.y-2], pixel.x-1, pixel.y-1);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x-1][pixel.y-2], pixelMap[pixel.x-1][pixel.y-1]);
                    }
                }
            }
            if (!isEmpty(pixel.x-2, pixel.y-2, true)) { 
                var cube2 = pixelMap[pixel.x-2][pixel.y-2];
                if (cube2.element == "steel") {
                    if (isEmpty(pixel.x-2, pixel.y-1)) {
                        movePixel(pixelMap[pixel.x-2][pixel.y-2], pixel.x-2, pixel.y-1);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x-2][pixel.y-2], pixelMap[pixel.x-2][pixel.y-1]);
                    }
                }
            }
        }
    }
}

elements.wood_cube = {
    color: "#a0522d",
    behavior: behaviors.WALL,
    renderer: renderPresets.WOODCHAR,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "cubes",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    forceSaveColor: true,
    tick: function(pixel) {
        if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
            if (!isEmpty(pixel.x, pixel.y-2, true)) { 
                var cube2 = pixelMap[pixel.x][pixel.y-2];
                if (cube2.element == "wood") {
                    if (isEmpty(pixel.x, pixel.y-1)) {
                        movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
                    }
                }
            }
            if (!isEmpty(pixel.x+1, pixel.y-1, true)) { 
                var cube2 = pixelMap[pixel.x+1][pixel.y-1];
                if (cube2.element == "wood") {
                    if (isEmpty(pixel.x+1, pixel.y)) {
                        movePixel(pixelMap[pixel.x+1][pixel.y-1], pixel.x+1, pixel.y);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x+1][pixel.y-1], pixelMap[pixel.x+1][pixel.y]);
                    }
                }
            }
            if (!isEmpty(pixel.x+2, pixel.y-1, true)) { 
                var cube2 = pixelMap[pixel.x+2][pixel.y-1];
                if (cube2.element == "wood") {
                    if (isEmpty(pixel.x+2, pixel.y)) {
                        movePixel(pixelMap[pixel.x+2][pixel.y-1], pixel.x+2, pixel.y);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x+2][pixel.y-1], pixelMap[pixel.x+2][pixel.y]);
                    }
                }
            }
            if (!isEmpty(pixel.x-1, pixel.y-1, true)) { 
                var cube2 = pixelMap[pixel.x-1][pixel.y-1];
                if (cube2.element == "wood") {
                    if (isEmpty(pixel.x-1, pixel.y)) {
                        movePixel(pixelMap[pixel.x-1][pixel.y-1], pixel.x-1, pixel.y);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x-1][pixel.y-1], pixelMap[pixel.x-1][pixel.y]);
                    }
                }
            }
            if (!isEmpty(pixel.x-2, pixel.y-1, true)) { 
                var cube2 = pixelMap[pixel.x-2][pixel.y-1];
                if (cube2.element == "wood") {
                    if (isEmpty(pixel.x-2, pixel.y)) {
                        movePixel(pixelMap[pixel.x-2][pixel.y-1], pixel.x-2, pixel.y);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x-2][pixel.y-1], pixelMap[pixel.x-2][pixel.y]);
                    }
                }
            }
            if (!isEmpty(pixel.x+1, pixel.y-2, true)) { 
                var cube2 = pixelMap[pixel.x+1][pixel.y-2];
                if (cube2.element == "wood") {
                    if (isEmpty(pixel.x+1, pixel.y-1)) {
                        movePixel(pixelMap[pixel.x+1][pixel.y-2], pixel.x+1, pixel.y-1);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x+1][pixel.y-2], pixelMap[pixel.x+1][pixel.y-1]);
                    }
                }
            }
            if (!isEmpty(pixel.x+2, pixel.y-2, true)) { 
                var cube2 = pixelMap[pixel.x+2][pixel.y-2];
                if (cube2.element == "wood") {
                    if (isEmpty(pixel.x+2, pixel.y-1)) {
                        movePixel(pixelMap[pixel.x+2][pixel.y-2], pixel.x+2, pixel.y-1);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x+2][pixel.y-2], pixelMap[pixel.x+2][pixel.y-1]);
                    }
                }
            }
            if (!isEmpty(pixel.x-1, pixel.y-2, true)) { 
                var cube2 = pixelMap[pixel.x-1][pixel.y-2];
                if (cube2.element == "wood") {
                    if (isEmpty(pixel.x-1, pixel.y-1)) {
                        movePixel(pixelMap[pixel.x-1][pixel.y-2], pixel.x-1, pixel.y-1);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x-1][pixel.y-2], pixelMap[pixel.x-1][pixel.y-1]);
                    }
                }
            }
            if (!isEmpty(pixel.x-2, pixel.y-2, true)) { 
                var cube2 = pixelMap[pixel.x-2][pixel.y-2];
                if (cube2.element == "wood") {
                    if (isEmpty(pixel.x-2, pixel.y-1)) {
                        movePixel(pixelMap[pixel.x-2][pixel.y-2], pixel.x-2, pixel.y-1);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x-2][pixel.y-2], pixelMap[pixel.x-2][pixel.y-1]);
                    }
                }
            }
        }
    }
}