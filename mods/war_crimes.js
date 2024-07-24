// feel free to add to/improve this mod

// this has bee worked on by:
// voidapex11

elements.tear_gas = {
    color: "#d5dce6",
    behavior: [
        "XX|XX|XX",
        "XX|XX|M2%2.5 AND BO",
        "XX|M1%1|XX"
    ],
    tick: function (pixel) {
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coords = adjacentCoords[i];
            var x = pixel.x + coords[0];
            var y = pixel.y + coords[1];
            try { // this code causes errors acationally, who knows why.
                if (!isEmpty(x, y)) {
                    if (pixelMap[x][y].element == "tear_gas_grenade") {
                        var x = pixel.x - coords[0];
                        var y = pixel.y - coords[1];
                        tryMove(pixel, x, y)
                    }
                }
            } catch {} // lazy fix 
        }
    },
    category: "weapons",
    temp: 20,
    cooldown: 1,
    reactions: {
        "head": { elem2: ["head", "rotten_meat"], elem1: ["tear_gas", "tear_gas", "salt_water"], chance: 0.1, oneway: true },
        "body": { elem2: "rotten_meat", chance: 0.05, oneway: true },
    },
    tempLow: -30,
    state: "gas",
    density: 0.4,
    ignoreAir: true,
};

elements.tear_gas_grenade = {
    color: "#65665c",
    behavior: [
        "XX|CR:tear_gas|XX",
        "CR:tear_gas%80|EX:4>tear_gas%5|CR:tear_gas%80",
        "M2|M1|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 7300,
    conduct: 0.73,
    tempHigh: 1455.5,
    stateHigh: "molten_steel",
    excludeRandom: true,
    cooldown: 5,
    nocheer: true,
};

elements.sonic_grenade = {
    color: "#65665c",
    tick: function (pixel) {
        if (!pixel.primed) {
            ground=false
            num = 0
            coords=lineCoords(pixel.x,pixel.y,pixel.x,pixel.y+20)
            for (coord in coords) {
                pxl=coords[coord]
                if (!isEmpty(pxl[0],pxl[1])) {
                    if (num>=5) {
                        ground=true
                        break
                    }
                    if (elements[pixel.element].density>100||elements[pixel.element].hardness!==undefined) {
                        num++
                    }
                } else {
                    num--
                }
            }
            if (ground) {
                pixel.primed=true
            }
        }
        if ((pixel.primed||!isEmpty(pixel.x, pixel.y + 1))&&((Math.random() < 0.05) || (isEmpty(pixel.x, pixel.y + 1) && Math.random() < 0.3))) {
            // if ~random chance~ or it has something below it & ~higher random chance~: explode
            coords = circleCoords(pixel.x, pixel.y, 10);
            for (i in coords) {
                coord = coords[i]
                var x = coord.x;
                var y = coord.y;
                if (!isEmpty(x, y, true)) {
                    pxl = pixelMap[x][y]
                    if ((typeof elements[pxl.element].density == "number")||(elements[pxl.element].hardness!==undefined)) {
                        if ((elements[pxl.element].density > 2000)||(elements[pxl.element].hardness!==undefined)) {
                            if (elements[pxl.element].breakInto&&(Math.random()>0.2||pxl.element=="glass")) {
                                if (Math.random()>0.4) {
                                    deletePixel(x,y)
                                } else {
                                    breakPixel(pxl);
                                }
                                pxl = pixelMap[x][y]
                            }
                        }
                    }
                }
            }
            explodeAt(pixel.x, pixel.y, 3, "smoke")
            deletePixel(pixel.x, pixel.y)
            return
        } else {
            if (isEmpty(pixel.x, pixel.y + 1, true)) {
                // first, try to move straight down
                tryMove(pixel, pixel.x, pixel.y + 1)
            } else if ((Math.random() < 0.5) && isEmpty(pixel.x + 1, pixel.y + 1, true)) {
                tryMove(pixel, pixel.x + 1, pixel.y + 1)
            } else if (isEmpty(pixel.x - 1, pixel.y + 1, true)) {
                tryMove(pixel, pixel.x - 1, pixel.y + 1)
            }
        }
    },
    category: "weapons",
    state: "solid",
    density: 7300,
    conduct: 0.73,
    tempHigh: 1455.5,
    stateHigh: "molten_steel",
    excludeRandom: true,
    cooldown: 5,
    nocheer: true,
};