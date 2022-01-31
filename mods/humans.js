elements.human = {
    color: ["#f5eac6","#d4c594","#a89160","#7a5733","#523018","#361e0e"],
    category: "life",
    properties: {
        dead: false
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

elements.body = {
    color: ["#049699","#638A61"],
    category: "life",
    hidden: true,
    properties: {
        dead: false
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+1)) { // Fall
            movePixel(pixel, pixel.x, pixel.y+1);
            if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
                var headpixel = pixelMap[pixel.x][pixel.y-2];
                if (headpixel.element == "head") {
                    movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
                }
            }
        }
        doHeat(pixel);
        if (pixel.dead) { return }
        if (isEmpty(pixel.x, pixel.y-1)) {
            // create blood if decapitated 10% chance
            if (Math.random() < 0.1) {
                createPixel("blood", pixel.x, pixel.y-1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = true;
                }
            }
        }
        else if (Math.random() < 0.1) { // Move 10% chance
            var movesToTry = [
                [-1,0],
                [1,0],
                [-1,-1],
                [1,-1],
            ]
            var head = pixelMap[pixel.x][pixel.y-1];
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
        }

    },
};

elements.head = {
    color: ["#f5eac6","#d4c594","#a89160","#7a6433","#524018"],
    category: "life",
    hidden: true,
    properties: {
        dead: false
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            movePixel(pixel, pixel.x, pixel.y+1);
            // create blood if severed 10% chance
            if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1) {
                createPixel("blood", pixel.x, pixel.y+1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = true;
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
}