elements.earthquake = {
    color: ["#bda791","#997756","#613d19"],
    tick: function(pixel) {
        if (pixel.stage) {
            var coords = circleCoords(pixel.x,pixel.y,pixel.stage);
            if (pixel.stage >= pixel.mag) {
                deletePixel(pixel.x,pixel.y);
                return;
            }
            coords.forEach(function(coord){
                var x = coord.x;
                var y = coord.y;
                if (!isEmpty(x,y,true)) {
                    var p = pixelMap[x][y];
                    if (p.element === "earthquake") { return }
                    if (elements[p.element].breakInto) {
                        // times 0.25 if not shiftDown else 1
                        if (Math.random() < (elements[p.element].hardness || 1) * (shiftDown ? 1 : 0.25)) {
                            var breakInto = elements[p.element].breakInto;
                            // if breakInto is an array, pick one
                            if (Array.isArray(breakInto)) {
                                breakInto = breakInto[Math.floor(Math.random() * breakInto.length)];
                            }
                            if (breakInto === null) {
                                deletePixel(p.x,p.y);
                                return;
                            }
                            var oldelement = p.element;
                            changePixel(p,breakInto);
                            if (elements[oldelement].breakIntoColor) {
                                p.color = pixelColorPick(p, elements[oldelement].breakIntoColor);
                            }
                        }
                    }
                    if (!elements[p.element].movable) { return }
                    tryMove(p,p.x,p.y-1);
                }
            })
            pixel.stage++;
        }
        else if (!tryMove(pixel,pixel.x,pixel.y+1)) {
            // random 10 to 20
            pixel.mag = Math.floor(Math.random() * 10) + 20;
            pixel.stage = 1;
        }
    },
    category: "weapons",
    state: "solid",
    density: 100000000,
    maxSize: 1,
    cooldown: defaultCooldown,
    excludeRandom: true,
}

elements.rad_fluid = {
    behavior: behaviors.LIQUID,
    category: "liquids",
    density: 1500,
    state: "liquid",
}
elements.rad_fluid.color = elements.radiation.color;
elements.rad_fluid.reactions = elements.radiation.reactions;