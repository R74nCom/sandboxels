//aircrafts
elements.bomb.ignore = ["super_bomber_left","super_bomber_right"],
elements.fast_bullet_left = {
    color: "#4c4e42",
    behavior: [
        "XX|DL|XX",
        "XX|XX|XX",
        "XX|DL|XX",
    ],
tick: function(pixel) {
        for (var i=0; i<3; i++) {
            if (!tryMove(pixel, pixel.x-3, pixel.y)) {
                if (!isEmpty(pixel.x-3, pixel.y,true)) {
                    var newPixel = pixelMap[pixel.x-3][pixel.y];
                    if (newPixel.element === "fast_bullet_left") { break; }
                    if (elements[newPixel.element].state == "solid") {
                        if (Math.random() > (elements[newPixel.element].hardness || 0)) {
                            if (elements[newPixel.element].breakInto) {
                                breakPixel(newPixel);
                            }
                            else {
                                deletePixel(newPixel.x, newPixel.y);
                            }}}}
                deletePixel(pixel.x,pixel.y);
                break;
            }}},
    category: "ammunition",
    state: "solid",
    insulate: true,
},
elements.fast_bullet_right = {
    color: "#4c4e42",
    behavior: [
        "XX|DL|XX",
        "XX|XX|XX",
        "XX|DL|XX",
    ],
    tick: function(pixel) {
        for (var i=0; i<3; i++) {
            if (!tryMove(pixel, pixel.x+3, pixel.y)) {
                if (!isEmpty(pixel.x+3, pixel.y,true)) {
                    var newPixel = pixelMap[pixel.x+3][pixel.y];
                    if (newPixel.element === "fast_bullet_right") { break; }
                    if (elements[newPixel.element].state == "solid") {
                        if (Math.random() > (elements[newPixel.element].hardness || 0)) {
                            if (elements[newPixel.element].breakInto) {
                                breakPixel(newPixel);
                            }
                            else {
                                deletePixel(newPixel.x, newPixel.y);
                            }}}}
                deletePixel(pixel.x,pixel.y);
                break;
            }}},
    category: "ammunition",
    state: "solid",
    insulate: true,
},
elements.flak_cannon = {
    color: "#C0C0C0",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|CR:flak|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    conduct: 1,
},
    elements.flak = {
    color: "#f0f0f0",
    tick: function(pixel) {
        if ((pixel.temp > 10 || pixel.charge) && !pixel.burning) {
            pixel.burning = true;
            pixel.burnStart = pixelTicks;
        }
        if (pixel.burning) {
            if (!tryMove(pixel, pixel.x, pixel.y-1)) {
                // tryMove again to the top left or top right
                tryMove(pixel, pixel.x+(Math.random() < 0.5 ? -1 : 1), pixel.y-1);
            }
            if (pixelTicks-pixel.burnStart > 50 && Math.random() < 0.005) {
                explodeAt(pixel.x, pixel.y, 10, "flak_shrapnel");
            }
        }
        else {
            if (!tryMove(pixel, pixel.x, pixel.y+1)) {
                // tryMove again to the bottom left or bottom right
                tryMove(pixel, pixel.x+(Math.random() < 0.5 ? -1 : 1), pixel.y+1);
            }
        }
        doDefaults(pixel);
    },
    burn: 90,
    burnTime: 100,
    density: 2000,
    conduct: 1,
    state: "solid",
    category: "ammunition"
},
    elements.flak_shrapnel = {
    color: "#71797E",
       behavior: [
        "XX|XX|XX",
        "XX|EX:5 %10|XX",
        "M2|M1|M2",
    ],
    burn: 90,
    burnTime: 100,
    density: 2000,
    conduct: 1,
    state: "solid",
    category: "ammunition"
},
elements.fighter_jet_left = {
    color: "#bcc6cc",
    behavior: [
        "M1%0.2|M2%0.005 AND EX:5>metal_scrap|M2%0.005 AND EX:5>metal_scrap",
        "M1 AND CR:fast_bullet_left|XX|CR:smoke AND EX:5>metal_scrap",
        "M1%0.2|M2%0.005 AND EX:5>metal_scrap|M2%0.005 AND EX:5>metal_scrap",
    ],
tick: function(pixel) {
    for (var i=0; i<2; i++) {
            if (!tryMove(pixel, pixel.x-1, pixel.y)) {
                if (!isEmpty(pixel.x-1, pixel.y,true)) {
                    var newPixel = pixelMap[pixel.x-1][pixel.y];
                    if (newPixel.element === "fast_bullet_left") { break; }
                    if (elements[newPixel.element].state == "solid") {
                        if (Math.random() > (elements[newPixel.element].hardness || 0)) {
                            if (elements[newPixel.element].breakInto) {
                                breakPixel(newPixel);
                            }
                            else {
                                deletePixel(newPixel.x, newPixel.y);
                            }}}}
                deletePixel(pixel.x,pixel.y);
                break;
            }}},
    category: "aircrafts",
    breakInto: "metal_scrap"
 },
elements.fighter_jet_right = {
    color: "#bcc6cc",
    behavior: [
        "M2%0.005 AND EX:5>metal_scrap|M2%0.005 AND EX:5>metal_scrap|M1%0.2",
        "CR:smoke AND EX:5>metal_scrap|XX|M1 AND CR:fast_bullet_right",
        "M2%0.005 AND EX:5>metal_scrap|M2%0.005 AND EX:5>metal_scrap|M1%0.2",
    ],
tick: function(pixel) {
    for (var i=0; i<2; i++) {
            if (!tryMove(pixel, pixel.x+1, pixel.y)) {
                if (!isEmpty(pixel.x+1, pixel.y,true)) {
                    var newPixel = pixelMap[pixel.x+1][pixel.y];
                    if (newPixel.element === "fast_bullet_right") { break; }
                    if (elements[newPixel.element].state == "solid") {
                        if (Math.random() > (elements[newPixel.element].hardness || 0)) {
                            if (elements[newPixel.element].breakInto) {
                                breakPixel(newPixel);
                            }
                            else {
                                deletePixel(newPixel.x, newPixel.y);
                            }}}}
                deletePixel(pixel.x,pixel.y);
                break;
            }}},
    category: "aircrafts",
    breakInto: "metal_scrap"
 },
elements.airliner_left = {
    color: "#fafafa",
    category: "aircrafts",
    behavior: [
        "M1%3 AND EX:7>fire,fire,fire,metal_scrap|XX|XX",
        "M1 AND EX:7>fire,fire,fire,metal_scrap|XX|XX",
        "M1%3 AND EX:7>fire,fire,fire,metal_scrap|XX|CR:smoke%10",
    ],
    burnTime: 1000,
    burn: 40,
    burnInto: "metal_scrap",
    breakInto: "metal_scrap",
    conduct: 1
},
elements.airliner_right = {
    color: "#fafafa",
    category: "aircrafts",
    behavior: [
        "XX|XX|M1%3 AND EX:7>fire,fire,fire,metal_scrap",
        "XX|XX|M1 AND EX:7>fire,fire,fire,metal_scrap",
        "CR:smoke%10|XX|M1%3 AND EX:7>fire,fire,fire,metal_scrap",
    ],
    burnTime: 1000,
    burn: 40,
    burnInto: "metal_scrap",
    breakInto: "metal_scrap",
    conduct: 1
},
elements.bomber_left = {
    color: "#fafafa",
    category: "aircrafts",
    behavior: [
        "M1%3 AND EX:7>fire,fire,fire,metal_scrap|XX|XX",
        "M1 AND EX:7>fire,fire,fire,metal_scrap|XX|XX",
        "M1%3 AND EX:7>fire,fire,fire,metal_scrap|XX|CR:smoke%10 AND CR:bomb",
    ],
    burnTime: 1000,
    burn: 40,
    burnInto: "metal_scrap",
    breakInto: "metal_scrap",
    conduct: 1
},
elements.bomber_right = {
    color: "#fafafa",
    category: "aircrafts",
    behavior: [
        "XX|XX|M1%3 AND EX:7>fire,fire,fire,metal_scrap",
        "XX|XX|M1 AND EX:7>fire,fire,fire,metal_scrap",
        "CR:smoke%10 AND CR:bomb|XX|M1%3 AND EX:7>fire,fire,fire,metal_scrap",
    ],
    burnTime: 1000,
    burn: 40,
    burnInto: "metal_scrap",
    breakInto: "metal_scrap",
    conduct: 1
},
elements.super_bomber_left = {
    color: "#000000",
    category: "aircrafts",
    behavior: [
        "XX|XX|XX",
        "M1%3 AND EX:7>fire,fire,fire,metal_scrap|XX|XX",
        "M1 AND EX:7>fire,fire,fire,metal_scrap|XX|XX",
        "M1%3 AND CR:bomb|CR:bomb|CR:smoke%10 AND CR:bomb",
        "CR:bomb|CR:bomb|CR:bomb",  
    ],
    ignore: "bomb",
    burnTime: 1000,
    burn: 40,
    burnInto: "metal_scrap",
    breakInto: "metal_scrap",
    conduct: 1
},
elements.super_bomber_right = {
    color: "#000000",
    category: "aircrafts",
    behavior: [
        "XX|XX|XX",
        "XX|XX|M1%3 AND EX:7>fire,fire,fire,metal_scrap",
        "XX|XX|M1 AND EX:7>fire,fire,fire,metal_scrap",
        "CR:smoke%10 AND CR:bomb|CR:bomb|M1%3 AND CR:bomb",
        "CR:bomb|CR:bomb|CR:bomb",  
    ],
    ignore: "bomb",
    burnTime: 1000,
    burn: 40,
    burnInto: "metal_scrap",
    breakInto: "metal_scrap",
    conduct: 1
}