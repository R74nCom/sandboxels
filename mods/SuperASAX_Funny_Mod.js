//Made by SuperASAX or SuperAAX
elements.spread_bomb = {
    color: "#524c41",
    behavior: [
        "XX|EX:10|XX",
        "XX|DL|XX",
        "M2 AND CL|M1 AND EX:10|M2 AND CL",
    ],
    category: "Super's Funny Mod",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
},

elements.random_bomb = {
    color: "#524c41",
    behavior: [
        "XX|EX:10|XX",
        "CL%10|DL%5|CL%10",
        "M2 AND CL%10|M1%25 AND EX:10|M2 AND CL%10",
    ],
    category: "Super's Funny Mod",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
},

elements.strange_spread = {
    color: "#ABCDEF",
    category: "Super's Funny Mod",
    behavior: [
        "CL%90|XX|CL%90",
        "XX|EX:5%0.1|XX",
        "M2 AND CL%10|M1%25|M2 AND CL%10",
    ],
},

elements.cheese_matter = {
    color: "#fcba03",
    tick: function(pixel) {
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coords = adjacentCoords[i];
            var x = pixel.x + coords[0];
            var y = pixel.y + coords[1];
            if ((Math.random() < 0.05 || coords[0]) && !isEmpty(x,y,true)) {
                var elem = pixelMap[x][y].element;
                if (elements.cheese_matter.ignore.indexOf(elem) === -1 && elements[elem].hardness !== 1) {
                    if (coords[1]) {
                        swapPixels(pixel,pixelMap[x][y]);
                    }
                    else {
                        changePixel(pixelMap[x][y],"cheese_matter");
                    }
                }
            }
        }
        var move1Spots = [
            [pixel.x, pixel.y+1],
            [pixel.x+1, pixel.y+1],
            [pixel.x-1, pixel.y+1],
        ]
        if (Math.random() < 0.1) { move1Spots.push([pixel.x-1,pixel.y]) }
        if (Math.random() < 0.1) { move1Spots.push([pixel.x+1,pixel.y]) }
        if (Math.random() < 0.1) { move1Spots.push([pixel.x,pixel.y-1]) }
        if (Math.random() < 0.1) { move1Spots.push([pixel.x-1,pixel.y-1]) }
        if (Math.random() < 0.1) { move1Spots.push([pixel.x+1,pixel.y-1]) }
        for (var i = 0; i < move1Spots.length; i++) {
            var j = Math.floor(Math.random()*move1Spots.length);
            var coords = move1Spots[j];
            if (tryMove(pixel, coords[0], coords[1])) { break; }
            else { move1Spots.splice(j, 1); }
        }
        doDefaults(pixel);
    },
    reactions: {
        "void": { elem1:"explosion" }
    },
    category: "Super's Funny Mod",
    state: "solid",
    density: 2000,
    excludeRandom: true,
    ignore: ["fire","smoke","antimatter","strange_matter","wall","ewall","plasma","void","border","cheese"],
    behavior: [
        "XX|XX|XX",
        "XX|CH:cheese%5|XX",
        "XX|XX|XX",
    ],
},



elements.antiball = {
    color: "#EEA537",
    behavior: [
        "ST|ST AND M1|ST",
        "ST|XX|ST",
        "ST|ST|ST",
    ],
    state: "solid",
    category: "Super's Funny Mod"
}; 