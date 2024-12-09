// created by sqec
// coming soon: apartments, small houses

function building_1_segment(pixel) {
    if (pixel.foundation = true && pixel.height < pixel.limit) {
        if (isEmpty(pixel.x+1,pixel.y-pixel.height) &&
        isEmpty(pixel.x-1,pixel.y-pixel.height) &&
        isEmpty(pixel.x+2,pixel.y-pixel.height) &&
        isEmpty(pixel.x-2,pixel.y-pixel.height) &&
        isEmpty(pixel.x+2,pixel.y-1-pixel.height) &&
        isEmpty(pixel.x-2,pixel.y-1-pixel.height) &&
        isEmpty(pixel.x+1,pixel.y-1-pixel.height) &&
        isEmpty(pixel.x-1,pixel.y-1-pixel.height) &&
        isEmpty(pixel.x,pixel.y-1-pixel.height) &&
        isEmpty(pixel.x,pixel.y-pixel.height)) {
            createPixel("glass",pixel.x+1,pixel.y-pixel.height);
            createPixel("glass",pixel.x-1,pixel.y-pixel.height);
            createPixel("concrete",pixel.x+2,pixel.y-pixel.height);
            createPixel("concrete",pixel.x-2,pixel.y-pixel.height);
            createPixel("concrete",pixel.x+1,pixel.y-1-pixel.height);
            createPixel("concrete",pixel.x-1,pixel.y-1-pixel.height);
            createPixel("concrete",pixel.x+2,pixel.y-1-pixel.height);
            createPixel("concrete",pixel.x-2,pixel.y-1-pixel.height);
            createPixel("concrete",pixel.x,pixel.y-1-pixel.height);
            createPixel("concrete",pixel.x,pixel.y-pixel.height);
            pixel.height = pixel.height+2
        }
    }
}
function clearbase3x5(pixel) {
    if (pixel.clearbase = false && pixel.height < pixel.limit) {
        pixel.clearbase = true
        deletePixel(pixel.x-1,pixel.y)
        deletePixel(pixel.x+1,pixel.y)
        deletePixel(pixel.x-2,pixel.y)
        deletePixel(pixel.x+2,pixel.y)
        deletePixel(pixel.x,pixel.y-1)
        deletePixel(pixel.x-1,pixel.y-1)
        deletePixel(pixel.x+1,pixel.y-1)
        deletePixel(pixel.x-2,pixel.y-1)
        deletePixel(pixel.x+2,pixel.y-1)
        deletePixel(pixel.x,pixel.y-2)
        deletePixel(pixel.x-1,pixel.y-2)
        deletePixel(pixel.x+1,pixel.y-2)
        deletePixel(pixel.x-2,pixel.y-2)
        deletePixel(pixel.x+2,pixel.y-2)
    }
}
function filldirt2x5(pixel) {
    var dirtPixelElem = pixelMap[pixel.x][pixel.y+1];
    if (!isEmpty(pixel.x,pixel.y+1) && !outOfBounds(pixel.x,pixel.y+1)) {
            dirtPixelElem = pixelMap[pixel.x][pixel.y+1].element
        }
    if (isEmpty(pixel.x+1,pixel.y+1)) {
        createPixel(dirtPixelElem,pixel.x+1,pixel.y+1);
    }
    if (isEmpty(pixel.x-1,pixel.y+1)) {
        createPixel(dirtPixelElem,pixel.x-1,pixel.y+1);
    }
    if (isEmpty(pixel.x+2,pixel.y+1)) {
        createPixel(dirtPixelElem,pixel.x+2,pixel.y+1);
    }
    if (isEmpty(pixel.x-2,pixel.y+1)) {
        createPixel(dirtPixelElem,pixel.x-2,pixel.y+1);
    }
    if (isEmpty(pixel.x+2,pixel.y+2)) {
        createPixel(dirtPixelElem,pixel.x+2,pixel.y+2);
    }
    if (isEmpty(pixel.x-2,pixel.y+2)) {
        createPixel(dirtPixelElem,pixel.x-2,pixel.y+2);
    }
    if (isEmpty(pixel.x+1,pixel.y+2)) {
        createPixel(dirtPixelElem,pixel.x+2,pixel.y+2);
    }
    if (isEmpty(pixel.x-1,pixel.y+2)) {
        createPixel(dirtPixelElem,pixel.x-2,pixel.y+2);
    }
    if (isEmpty(pixel.x,pixel.y+2)) {
        createPixel(dirtPixelElem,pixel.x-2,pixel.y+2);
    }
}
elements.building_1 = {
    color: "#ffc800",
    tick: function(pixel) {
        if (!isEmpty(pixel.x,pixel.y+1)) {
            clearbase3x5(pixel);
            if (isEmpty(pixel.x+1,pixel.y) &&
            isEmpty(pixel.x-1,pixel.y) &&
            isEmpty(pixel.x+2,pixel.y) &&
            isEmpty(pixel.x-2,pixel.y) &&
            isEmpty(pixel.x+2,pixel.y-1) &&
            isEmpty(pixel.x-2,pixel.y-1) &&
            isEmpty(pixel.x+1,pixel.y-1) &&
            isEmpty(pixel.x-1,pixel.y-1) &&
            isEmpty(pixel.x,pixel.y-1) &&
            isEmpty(pixel.x+2,pixel.y-2) &&
            isEmpty(pixel.x-2,pixel.y-2) &&
            isEmpty(pixel.x+1,pixel.y-2) &&
            isEmpty(pixel.x-1,pixel.y-2) &&
            isEmpty(pixel.x,pixel.y-2)) {
                filldirt2x5(pixel);
                movePixel(pixel,pixel.x,pixel.y-1);
                createPixel("concrete",pixel.x+1,pixel.y+1);
                createPixel("concrete",pixel.x-1,pixel.y+1);
                createPixel("concrete",pixel.x+2,pixel.y+1);
                createPixel("concrete",pixel.x-2,pixel.y+1);
                createPixel("wood",pixel.x,pixel.y+1);
                pixel.limit = 5 + Math.floor(Math.random() * 25)*2;
                createPixel("concrete",pixel.x+1,pixel.y);
                createPixel("concrete",pixel.x-1,pixel.y);
                createPixel("concrete",pixel.x+2,pixel.y);
                createPixel("concrete",pixel.x-2,pixel.y);
                createPixel("concrete",pixel.x+1,pixel.y-1);
                createPixel("concrete",pixel.x-1,pixel.y-1);
                createPixel("concrete",pixel.x+2,pixel.y-1);
                createPixel("concrete",pixel.x-2,pixel.y-1);
                createPixel("concrete",pixel.x,pixel.y-1);
                pixel.foundation = true;
                pixel.height = pixel.height+2
            }
        }
        if (pixel.foundation == true && pixel.height < pixel.limit) {
            building_1_segment(pixel);
        }
        else if (pixel.foundation == true && pixel.height >= pixel.limit) {
            pixel.built = true;
        }
        if (pixel.built == true || pixel.age > 100) {
            changePixel(pixel,"wood");
        }
        pixel.age++
        doDefaults(pixel);
    },
    properties: {
        height:0,
        limit:0,
        foundation:false,
        built:false,
        clearbase:false,
        age:0
    },
    category: "citybuilding",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    maxSize: 1,
    excludeRandom: true,
    behavior: behaviors.STURDYPOWDER,
};
elements.small_tree_1 = {
    color: "#4bd943",
    tick: function(pixel) {
        if (!isEmpty(pixel.x,pixel.y+1)) {
            if (isEmpty(pixel.x+1,pixel.y-1) &&
            isEmpty(pixel.x-1,pixel.y-1) &&
            isEmpty(pixel.x,pixel.y-1) &&
            isEmpty(pixel.x+1,pixel.y-2) &&
            isEmpty(pixel.x-1,pixel.y-2) &&
            isEmpty(pixel.x,pixel.y-2) &&
            isEmpty(pixel.x+1,pixel.y-3) &&
            isEmpty(pixel.x-1,pixel.y-3) &&
            isEmpty(pixel.x,pixel.y-3)) {
                createPixel("wood",pixel.x,pixel.y-1);
                createPixel("wood",pixel.x,pixel.y-2);
                createPixel("plant",pixel.x,pixel.y-3);
                createPixel("plant",pixel.x-1,pixel.y-1);
                createPixel("plant",pixel.x-1,pixel.y-2);
                createPixel("plant",pixel.x-1,pixel.y-3);
                createPixel("plant",pixel.x+1,pixel.y-1);
                createPixel("plant",pixel.x+1,pixel.y-2);
                createPixel("plant",pixel.x+1,pixel.y-3);
                changePixel(pixel,"wood");
            }
        }
        if (pixel.age > 50) {
            changePixel(pixel,"wood");
        }
        pixel.age++
        doDefaults(pixel);
    },
    properties: {
        age:0
    },
    category: "citybuilding",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    maxSize: 1,
    excludeRandom: true,
    behavior: behaviors.STURDYPOWDER,
};
