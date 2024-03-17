function building_1_segment() {
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
function filldirt2x5() {
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
}
elements.building_1 = {
    color: "#a78d38",
    tick: function(pixel) {
        if (!isEmpty(pixel.x,pixel.y+1)) {
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
                filldirt2x5();
                movePixel(pixel,pixel.x,pixel.y-1);
                createPixel("concrete",pixel.x+1,pixel.y+1);
                createPixel("concrete",pixel.x-1,pixel.y+1);
                createPixel("concrete",pixel.x+2,pixel.y+1);
                createPixel("concrete",pixel.x-2,pixel.y+1);
                createPixel("wood",pixel.x,pixel.y+1);
                pixel.limit = 10 + Math.floor(Math.random() * 5)*2;
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
            building_1_segment();
        }
        else if (pixel.foundation == true && pixel.height >= pixel.limit) {
            pixel.built = true;
        }
        if (pixel.built == true) {
            changePixel(pixel,"wood");
        }
        doDefaults(pixel);
    },
    properties: {
        height:0,
        limit:0,
        foundation:false,
        built:false
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
elements.building_1_tall = {
    color: "#d9c243",
    tick: function(pixel) {
        if (!isEmpty(pixel.x,pixel.y+1)) {
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
                filldirt2x5();
                movePixel(pixel,pixel.x,pixel.y-1);
                createPixel("concrete",pixel.x+1,pixel.y+1);
                createPixel("concrete",pixel.x-1,pixel.y+1);
                createPixel("concrete",pixel.x+2,pixel.y+1);
                createPixel("concrete",pixel.x-2,pixel.y+1);
                createPixel("wood",pixel.x,pixel.y+1);
                pixel.limit = 15 + Math.floor(Math.random() * 10)*2;
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
            building_1_segment();
        }
        else if (pixel.foundation == true && pixel.height >= pixel.limit) {
            pixel.built = true;
        }
        if (pixel.built == true) {
            changePixel(pixel,"wood");
        }
        doDefaults(pixel);
    },
    properties: {
        height:0,
        limit:0,
        foundation:false,
        built:false
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
        doDefaults(pixel);
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
