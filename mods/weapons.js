//weapons.js by Jayd also know as JaydRubies
elements.tsar_bomba = {
    color: "#524C41",
    behavior: [
        "XX|EX:150>plasma|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:150>plasma|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
},
elements.little_boy = {
    color: "#F5F5DC",
    behavior: [
        "XX|EX:20>plasma|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:70>plasma,plasma,plasma,plasma,radiation,fallout|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 500,
    excludeRandom: true,
    cooldown: defaultCooldown
},
elements.fat_man = {
    color: ["#ffff00","#333333"],
    behavior: [
        "XX|EX:28>plasma|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:98>plasma,plasma,plasma,plasma,radiation,fallout|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1000,
    excludeRandom: true,
    cooldown: defaultCooldown
},
elements.self_propelled_bomb = {
    color: "#71797E",
    tick: function(pixel) {
        if ((pixel.temp > 1000 || pixel.charge) && !pixel.burning) {
            pixel.burning = true;
            pixel.burnStart = pixelTicks;
        }
        if (pixel.burning) {
            if (!tryMove(pixel, pixel.x, pixel.y-1)) {
                // tryMove again to the top left or top right
                tryMove(pixel, pixel.x+(Math.random() < 0.5 ? -1 : 1), pixel.y-1);
            }
            if (pixelTicks-pixel.burnStart > 50 && Math.random() < 0.1) {
                explodeAt(pixel.x, pixel.y, 10, "bomb");
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
    category: "weapons"
},
elements.left_missile = {
    color: "#4c4e42",
    behavior: [
        "M2|EX:10|XX",
        "M1 AND EX:10|XX|EX:10",
        "M2|EX:10|XX",
    ],
    state: "solid",
    category:"ammunition",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
},
elements.right_missile = {
    color: "#4c4e42",
    behavior: [
        "XX|EX:10|M2",
       "EX:10|XX|M1 AND EX:10",
        "XX|EX:10|M2",
    ],
    state: "solid",
    category:"ammunition",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
},
elements.up_missile = {
    color: "#4c4e42",
    behavior: [
        "M2|M1 AND EX:10|M2",
       "EX:10|XX|EX:10",
        "XX|EX:10|XX",
    ],
    state: "solid",
    category:"ammunition",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
},
    elements.cluster_munition = {
    color: "#444444",
    behavior: [
        "XX|EX:10>smoke,smoke,smoke,smoke,bomb,bomb|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:10>smoke,smoke,smoke,smoke,bomb,cluster_munition|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
},
    elements.RL_cluster_munition = {
    color: "#444444",
    behavior: [
        "XX|XX|XX",
        "CRcluster%20|XX|CR:cluster%20",
        "M2|M1|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
},
    elements.cluster = {
    color: "#444444",
    behavior: [
        "XX|EX:10%10|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:10%10|M2",
    ],
    category: "ammunition",
    state: "solid",
    density: 1300,
    hidden: true,
},
    elements.machine_gun_left = {
    color: "#C0C0C0",
    behavior: [
        "XX|XX|XX",
        "CR:left_bullet|XX|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
},
    elements.machine_gun_right = {
    color: "#C0C0C0",
    behavior: [
        "XX|XX|XX",
        "XX|XX|CR:right_bullet",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
},
elements.left_bullet = {
    color: "#4c4e42",
    behavior: [
        "M2|XX|XX",
        "M1 AND EX:5|XX|XX",
        "M2|XX|XX",
    ],
    state: "solid",
    category:"ammunition",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
},
    elements.right_bullet = {
    color: "#4c4e42",
    behavior: [
        "XX|XX|M2",
        "XX|XX|M1 AND EX:5",
        "XX|XX|M2",
    ],
    state: "solid",
    category:"ammunition",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
},
    elements.e_gun_left = {
    color: "#C0C0C0",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "CR:left_bullet|XX|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    conduct: 1,
    density: 1300,
},
    elements.e_gun_right = {
    color: "#C0C0C0",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "XX|XX|CR:right_bullet",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    conduct: 1,
    density: 1300,
},
    elements.auto_rocket_launcher_left = {
    color: "#C0C0C0",
    behavior: [
        "XX|XX|XX",
        "CR:left_rocket|XX|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
},
    elements.auto_rocket_launcher_right = {
    color: "#C0C0C0",
    behavior: [
        "XX|XX|XX",
        "XX|XX|CR:right_rocket",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
},
elements.left_rocket = {
    color: "#4c4e42",
    behavior: [
        "XX|XX|XX",
        "M1 AND EX:10|XX|XX",
        "XX|XX|XX",
    ],
    state: "solid",
    category:"ammunition",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
},
    elements.right_rocket = {
    color: "#4c4e42",
    behavior: [
        "XX|XX|XX",
        "XX|XX|M1 AND EX:10",
        "XX|XX|XX",
    ],
    state: "solid",
    category:"ammunition",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
},
    elements.e_rocket_launcher_left = {
    color: "#C0C0C0",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "CR:left_rocket|XX|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    conduct: 1,
    density: 1300,
},
    elements.e_rocket_launcher_right = {
    color: "#C0C0C0",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "XX|XX|CR:right_rocket",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    conduct: 1,
    density: 1300,
},
elements.gaster_blast_left = {
    color: "#c5e9f0",
    behavior: [
        "DL|DL|XX",
        "DL AND CR:gaster_blast_left%5|XX|XX",
        "DL|DL|XX",
    ],
    tick: function(pixel) {
        for (var i=0; i<3; i++) {
            if (!tryMove(pixel, pixel.x-2, pixel.y)) {
                if (!isEmpty(pixel.x-2, pixel.y,true)) {
                    var newPixel = pixelMap[pixel.x-2][pixel.y];
                    if (newPixel.element === "gaster_blast_left") { break; }
                    if (elements[newPixel.element].state == "gas") {
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
    category: "energy",
    state: "gas",
    insulate: true,
},
elements.gaster_blast_right = {
    color: "#c5e9f0",
    behavior: [
        "XX|DL|DL",
        "XX|XX|DL AND CR:gaster_blast_right%5",
        "XX|DL|DL",
    ],
    tick: function(pixel) {
        for (var i=0; i<3; i++) {
            if (!tryMove(pixel, pixel.x+2, pixel.y)) {
                if (!isEmpty(pixel.x+2, pixel.y,true)) {
                    var newPixel = pixelMap[pixel.x+2][pixel.y];
                    if (newPixel.element === "gaster_blast_right") { break; }
                    if (elements[newPixel.element].state == "gas") {
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
    category: "energy",
    state: "gas",
    insulate: true,
},
    elements.gaster_blaster_left = {
    color: "#ffffff",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "CR:gaster_blast_left|XX|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    conduct: 20,
},
    elements.gaster_blaster_right = {
    color: "#ffffff",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "XX|XX|CR:gaster_blast_right",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    conduct: 20,
},
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
elements.machine_for_throwing_bombs_at_you_left = {
    color: "#524c41",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "CR:bombs_for_throwing_at_you_left|XX|XX",
        "XXXX|XX",
    ],
    category: "weapons",
    conduct: 1
},
elements.bombs_for_throwing_at_you_left = {
    color: "#524c41",
    category: "ammunition",
    behavior: [
        "XX|EX:10>bomb|XX",
        "XX|XX|XX",
        "M1|M1%10 AND EX:10>bomb|XX",
    ],
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}
elements.machine_for_throwing_bombs_at_right = {
    color: "#524c41",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "XX|XX|CR:bombs_for_throwing_at_you_right",
        "XXXX|XX",
    ],
    category: "weapons",
    conduct: 1
},
elements.bombs_for_throwing_at_you_right = {
    color: "#524c41",
    category: "ammunition",
    behavior: [
        "XX|EX:10>bomb|XX",
        "XX|XX|XX",
        "XX|M1%10 AND EX:10>bomb|M1",
    ],
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
},
elements.energized_orb_left = {
    color: ["#e0e000","#f3f300"],
    category: "energy",
    behavior: [
        "XX|EX:50>electric|XX",
        "M1 AND EX:50>electric|XX|EX:50>electric",
        "XX|EX:50>electric|XX"
    ],
    state: "gas",
},
elements.energized_orb_right = {
    color: ["#e0e000","#f3f300"],
    category: "energy",
    behavior: [
        "XX|EX:50>electric|XX",
        "EX:50>electric|XX|M1 AND EX:50>electric",
        "XX|EX:50>electric|XX"
    ],
    state: "gas",
},
elements.fast_bomb = {
    color: "#524c41",
    category: "weapons",
    state: "solid",
    behavior: [
        "XX|EX:10>explosion|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:10>explosion|M2",
        ],
    tick: function(pixel) {
        for (var i=0; i<3; i++) {
            if (!tryMove(pixel, pixel.x, pixel.y+1)) {
                if (!isEmpty(pixel.x, pixel.y+1,true)) {
                    }
                }
            }
        },
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
},
elements.liquid_bomb = {
    color: "#524c41",
    tick: function(pixel) {
                if (pixel.start === pixelTicks) {return}
                if (pixel.charge && elements[pixel.element].behaviorOn) {
                    pixelTick(pixel)
                }
                if (elements[pixel.element].viscosity && (!((Math.random()*100) < 100 / Math.pow(elements[pixel.element].viscosity, 0.25)))) {
                    var move1Spots = [
                        [pixel.x, pixel.y+1]
                    ]
                }
                else {
                    var move1Spots = [
                        [pixel.x+1, pixel.y+1],
                        [pixel.x, pixel.y+1],
                        [pixel.x-1, pixel.y+1],
                    ]
                }
                var moved = false;
                for (var i = 0; i < move1Spots.length; i++) {
                    var coords = move1Spots[Math.floor(Math.random()*move1Spots.length)];
                    if (tryMove(pixel, coords[0], coords[1])) { moved = true; break; }
                    else { move1Spots.splice(move1Spots.indexOf(coords), 1); }
                }
                if (!moved) {
                    if (elements[pixel.element].viscosity===undefined || !(!((Math.random()*100) < 100 / Math.pow(elements[pixel.element].viscosity, 0.25)))) {
                        if (Math.random() < 0.5) {
                            if (!tryMove(pixel, pixel.x+1, pixel.y)) {
                                tryMove(pixel, pixel.x-1, pixel.y);
                            }
                        } else {
                            if (!tryMove(pixel, pixel.x-1, pixel.y)) {
                                tryMove(pixel, pixel.x+1, pixel.y);
                            }
                        }
                    }
                }
                doDefaults(pixel);
            },
    category: "weapons",
    state: "liquid",
    behavior: [
        "XX|EX:10>explosion|XX",
        "XX|XX|XX",
        "XX|EX:10>explosion|XX",
        ],
    density: 1300,
    excludeRandom: true,
    ignore: "gas_bomb",
    cooldown: defaultCooldown
},
elements.gas_bomb = {
    color: "#524c41",
    tick: function(pixel) {
                if (pixel.start === pixelTicks) {return}
                if (pixel.charge && elements[pixel.element].behaviorOn) {
                    pixelTick(pixel)
                }
                var move1Spots = [
                    [pixel.x, pixel.y+1],
                    [pixel.x, pixel.y-1],
                    [pixel.x+1, pixel.y],
                    [pixel.x-1, pixel.y],
                ]
                var moved = false;
                for (var i = 0; i < move1Spots.length; i++) {
                    var coords = move1Spots[Math.floor(Math.random()*move1Spots.length)];
                    if (tryMove(pixel, coords[0], coords[1])) { moved = true; break; }
                    else { move1Spots.splice(move1Spots.indexOf(coords), 1);}
                }
                if (!moved) {
                    var move2Spots = [
                        [pixel.x+1, pixel.y+1],
                        [pixel.x-1, pixel.y+1],
                        [pixel.x+1, pixel.y-1],
                        [pixel.x-1, pixel.y-1],
                    ]
                    for (var i = 0; i < move2Spots.length; i++) {
                        var coords = move2Spots[Math.floor(Math.random()*move2Spots.length)];
                        if (tryMove(pixel, coords[0], coords[1])) { break; }
                        else { move2Spots.splice(move2Spots.indexOf(coords), 1); }
                    }
                }
                doDefaults(pixel);
            },
    category: "weapons",
    state: "gas",
    behavior: [
        "XX|EX:10>explosion|XX",
        "XX|XX|XX",
        "XX|EX:10>explosion|XX",
        ],
    density: 1300,
    excludeRandom: true,
    ignore: "liquid_bomb",
    cooldown: defaultCooldown
}
elements.tank_left = {
    color: "#bcc6cc",
    category: "vehicles",
    behavior: [
        "M2 AND CR:fast_bullet_left|XX|XX",
        "M1|XX|XX",
        "M1|M1|XX",
    ],
},
elements.tank_right = {
    color: "#bcc6cc",
    category: "vehicles",
    behavior: [
        "XX|XX|M2 AND CR:fast_bullet_right",
        "XX|XX|M1",
        "XX|M1|M1",
    ],
},
elements.realistic_missile_left = {
    color: "#524c41",
    category: "weapons",
    state: "solid",
    behavior: [
        "XX|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|XX",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|M2 AND EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|M1 AND EX:20>missile_shrapnel|XX|EX:20>missile_shrapnel|CR:smoke AND EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|M2 AND EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "XX|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|XX",
    ],
    tick: function(pixel) {
        for (var i=0; i<3; i++) {
            if (!tryMove(pixel, pixel.x-1, pixel.y)) {
                if (!isEmpty(pixel.x-1, pixel.y,true)) {
                    }
                }
            }
        },
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
},
elements.realistic_missile_right = {
    color: "#524c41",
    category: "weapons",
    state: "solid",
    behavior: [
        "XX|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|XX",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|M2 AND EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|CR:smoke AND EX:20>missile_shrapnel|EX:20>missile_shrapnel|XX|M1|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|M2 AND EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "XX|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|XX",
    ],
    tick: function(pixel) {
        for (var i=0; i<3; i++) {
            if (!tryMove(pixel, pixel.x+1, pixel.y)) {
                if (!isEmpty(pixel.x+1, pixel.y,true)) {
                    }
                }
            }
        },
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
},
    elements.missile_shrapnel = {
    color: "#71797E",
       behavior: [
        "XX|XX|XX",
        "XX|EX:5 %20|XX",
        "M2%20|M1%20|M2%20",
    ],
    burn: 90,
    burnTime: 100,
    density: 2000,
    conduct: 1,
    state: "solid",
    category: "ammunition"
},
elements.vlms_left = {
    color: "#71797E",
    tick: function(pixel) {
        if ((pixel.temp > 1000 || pixel.charge) && !pixel.burning) {
            pixel.burning = true;
            pixel.burnStart = pixelTicks;
        }
        if (pixel.burning) {
            if (!tryMove(pixel, pixel.x, pixel.y-1)) {
                // tryMove again to the top left or top right
                tryMove(pixel, pixel.x+(Math.random() < 0.5 ? -1 : 1), pixel.y-1);
            }
            if (pixelTicks-pixel.burnStart > 50 && Math.random() < 0.1) {
                explodeAt(pixel.x, 10, 4, "realistic_missile_left");
                deletePixel(pixel.x,pixel.y)
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
    category: "weapons"
},
elements.vlms_right = {
    color: "#71797E",
    tick: function(pixel) {
        if ((pixel.temp > 1000 || pixel.charge) && !pixel.burning) {
            pixel.burning = true;
            pixel.burnStart = pixelTicks;
        }
        if (pixel.burning) {
            if (!tryMove(pixel, pixel.x, pixel.y-1)) {
                // tryMove again to the top left or top right
                tryMove(pixel, pixel.x+(Math.random() < 0.5 ? -1 : 1), pixel.y-1);
            }
            if (pixelTicks-pixel.burnStart > 50 && Math.random() < 0.1) {
                explodeAt(pixel.x, 10, 4, "realistic_missile_right");
                deletePixel(pixel.x,pixel.y)
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
    category: "weapons"
},
createAtXvar = 0;
createAtYvar = 0;
create1var = "";
elements.element_spawner = {
    color: "#71797E",
    onSelect: function() {
        var answer1 = prompt("Please input the x value.",(createAtXvar||undefined));
        if (!answer1) {return}
        createAtXvar = parseInt(answer1);
        var answer2 = prompt("Please input the y value.",(createAtYvar||undefined));
        if (!answer2) {return}
        createAtYvar = parseInt(answer2);
        var answer3 = prompt("Please input what element should spawn.",(create1var||undefined));
        if (!answer3) {return}
        create1var = answer3;
    },
    tick: function(pixel) {
        if (pixel.charge){
            createPixel(create1var, createAtXvar, createAtYvar);
        }
        doDefaults(pixel);
    },
    density: 1,
    conduct: 1,
    state: "solid",
    category: "machines"
},
elements.railgun_beam_left = {
    color: ["#ff0000","#ff5e00"],
    tick: function(pixel) {
        var y = pixel.y;
        for (var x = pixel.x; x < width; x--) {
            if (outOfBounds(x, y)) {
                break;
            }
            if (isEmpty(x, y)) {
                createPixel("railgun_ammo_left", x, y);
                pixelMap[x][y].temp = 3500;
            }
            else {
                if (elements[pixelMap[x][y].element].isGas) { continue }
                if (elements[pixelMap[x][y].element].id === elements.railgun_beam_left.id) { break }
                pixelMap[x][y].temp += 100;
                pixelTempCheck(pixelMap[x][y]);
                break;
            }
        }
        deletePixel(pixel.x, pixel.y);
    },
    temp: 3500,
    category: "ammunition",
    state: "gas",
    density: 1,
    excludeRandom: true,
    noMix: true
},
elements.railgun_beam_right = {
    color: ["#ff0000","#ff5e00"],
    tick: function(pixel) {
        var y = pixel.y;
        for (var x = pixel.x; x < width; x++) {
            if (outOfBounds(x, y)) {
                break;
            }
            if (isEmpty(x, y)) {
                createPixel("railgun_ammo_right", x, y);
                pixelMap[x][y].temp = 3500;
            }
            else {
                if (elements[pixelMap[x][y].element].isGas) { continue }
                if (elements[pixelMap[x][y].element].id === elements.railgun_beam_right.id) { break }
                pixelMap[x][y].temp += 100;
                pixelTempCheck(pixelMap[x][y]);
                break;
            }
        }
        deletePixel(pixel.x, pixel.y);
    },
    temp: 3500,
    category: "ammunition",
    state: "gas",
    density: 1,
    excludeRandom: true,
    noMix: true
},
elements.railgun_ammo_left = {
    color: ["#ff0000","#ff5e00"],
    category: "ammunition",
    state: "solid",
    density: 1300,
    tick: function(pixel) {
        explodeAt(pixel.x, pixel.y, 10)
        doHeat(pixel);
    },
},
elements.railgun_ammo_right = {
    color: ["#ff0000","#ff5e00"],
    category: "ammunition",
    state: "solid",
    density: 1300,
    tick: function(pixel) {
        explodeAt(pixel.x, pixel.y, 10)
        doHeat(pixel);
    },
},
elements.railgun_left = {
    category: "weapons",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "CR:railgun_beam_left|XX|XX",
        "XX|XX|XX",
    ],
    color: "#71797E",
    conduct: 1,
    hardness: 1,
},
elements.railgun_right = {
    category: "weapons",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "XX|XX|CR:railgun_beam_right",
        "XX|XX|XX",
    ],
    color: "#71797E",
    conduct: 1,
    hardness: 1,
}
