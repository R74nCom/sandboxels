// Mod deprecated. Merged with base game.

/*elements.human = {
    color: ["#f5eac6","#d4c594","#a89160","#7a5733","#523018","#361e0e"],
    category: "life",
    properties: {
        dead: false,
        dir: 1,
        panic: 0,
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            createPixel("body", pixel.x, pixel.y+1);
            pixel.element = "head";
        }
        else if (isEmpty(pixel.x, pixel.y-1)) {
            createPixel("head", pixel.x, pixel.y-1);
            pixelMap[pixel.x][pixel.y-1].color = pixel.color;
            pixel.element = "body";
            pixel.color = pixelColorPick(pixel)
        }
        else {
            deletePixel(pixel.x, pixel.y);
        }
    },
};

// If pixelTicks%60 == 0, look left and right from the head 20 pixels.
//    If something favorable is found, set target to that pixel.
//    If something unfavorable is found, set target to a few pixels in the opposite direction. Raise panic attribute.
//    If nothing is found, set target to null.
//    If target is not null, switch direction towards target.
// Favorable Things: food category, wood, tree_branch, plant, bamboo, gold_coin, firefly, frog
// Unfavorable Things: acid, fire, magma, plasma, cold_fire, electric, laser, infection, cancer, rat, bee, blood, weapons category, superheater, freezer, tesla_coil, virus, gray_goo, antimatter, void
// Panic attribute, 0-1, increases movement rate.
// On fire raises panic.
// Trample: grass, petal, pistil
// Regulate temperature.


elements.body = {
    color: ["#049699","#638A61"],
    category: "life",
    hidden: true,
    density: 1500,
    state: "solid",
    conduct: 25,
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -30,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    reactions: {
        "cancer": { "elem1":"cancer", "chance":0.005 },
        "radiation": { "elem1":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
    },
    properties: {
        dead: false,
        dir: 1,
        panic: 0,
    },
    tick: function(pixel) {
        if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
            if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
                var headpixel = pixelMap[pixel.x][pixel.y-2];
                if (headpixel.element == "head") {
                    if (isEmpty(pixel.x, pixel.y-1)) {
                        movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
                    }
                }
            }
        }
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            // Turn into rotten_meat if pixelTicks-dead > 500
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
            }
            return
        }

        // Find the head
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head") {
            var head = pixelMap[pixel.x][pixel.y-1];
            if (head.dead) { // If head is dead, kill body
                pixel.dead = head.dead;
            }
        }
        else { var head = null }

        if (isEmpty(pixel.x, pixel.y-1)) {
            // create blood if decapitated 10% chance
            if (Math.random() < 0.1) {
                createPixel("blood", pixel.x, pixel.y-1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
        else if (head == null) { return }
        else if (Math.random() < 0.1) { // Move 10% chance
            var movesToTry = [
                [1*pixel.dir,0],
                [1*pixel.dir,-1],
            ];
            // While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
                    if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1])) {
                        movePixel(head, head.x+move[0], head.y+move[1]);
                        break;
                    }
                }
            }
            // 15% chance to change direction
            if (Math.random() < 0.15) {
                pixel.dir *= -1;
            }
        }

    },
};

elements.head = {
    color: ["#f5eac6","#d4c594","#a89160","#7a6433","#524018"],
    category: "life",
    hidden: true,
    density: 1080,
    state: "solid",
    conduct: 25,
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -30,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    reactions: {
        "cancer": { "elem1":"cancer", "chance":0.005 },
        "radiation": { "elem1":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
    },
    properties: {
        dead: false
    },
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            // Turn into rotten_meat if pixelTicks-dead > 500
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return
            }
        }

        // Find the body
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) { // If body is dead, kill head
                pixel.dead = body.dead;
            }
        }
        else { var body = null }

        if (isEmpty(pixel.x, pixel.y+1)) {
            tryMove(pixel, pixel.x, pixel.y+1);
            // create blood if severed 10% chance
            if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1) {
                createPixel("blood", pixel.x, pixel.y+1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
    }
};

if (!elements.blood.reactions) {
    elements.blood.reactions = {};
}
// Blood mud
elements.blood.reactions.dirt = {
    "elem1": null,
    "elem2": "mud",
}
// Blood sand
elements.blood.reactions.sand = {
    "elem1": null,
    "elem2": "wet_sand",
}*/