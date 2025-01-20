document.onkeydown = function(ki)/*keyboard_input*/ {
    //a
    if (ki.keyCode == 65) {
        KA = true;
    }
    //d
    if (ki.keyCode == 68) {
        KD = true;
    }
    //w
    if (ki.keyCode == 87) {
        KW = true;
    }
    //s
    if (ki.keyCode == 83) {
        KS = true;
    }
    if (ki.keyCode == 86) {
        KJ = true;
    }
    if (ki.keyCode == 78) {
        KL = true;
    }
    if (ki.keyCode == 71) {
        KI = true;
    }
    if (ki.keyCode == 66) {
        KK = true;
    }
    if (ki.keyCode == 81) {
        KQ = true;
    }
    if (ki.keyCode == 90) {
        ammo = 300;
        missile = 20;
    }
}
document.onkeyup = function(i2)/*input 2*/ {
    //a
    if (i2.keyCode == 65) {
        KA = false;
        ul = false;
        dl = false;
    }
    //d
    if (i2.keyCode == 68) {
        KD = false;
        ur = false;
        dr = false;
    }
    //w
    if (i2.keyCode == 87) {
        KW = false;
        ul = false;
        ur = false;
    }
    //s
    if (i2.keyCode == 83) {
        KS = false;
        dl = false;
        dr = false;
    }
    if (i2.keyCode == 86) {
        KJ = false;
    }
    if (i2.keyCode == 78) {
        KL = false;
    }
    if (i2.keyCode == 71) {
        KI = false;
    }
    if (i2.keyCode == 66) {
        KK = false;
    }
    if (i2.keyCode == 81) {
        KQ = false;
    }
}
var KA = false;
var KD = false;
var KW = false;
var KS = false;
var KJ = false;
var KL = false;
var KI = false;
var KK = false;
var KQ = false;
var vX = 2;
var vY = 2;
var ul = false;
var ur = false;
var dl = false;
var dr = false;
var ammo = 300;
var missile = 20;
elements.cfj = {
    name: "c_fighter_jet",
    tick: function(pixel) {
    logMessage("|");
    logMessage("|[Callsign: Box 1]");
    logMessage("|[Codename: 'Player]'");
    logMessage("|");
    logMessage("|[Operation: 'Sandbox']");
    logMessage("|['Box Squadron']");
    logMessage("|");
    logMessage("|[Ammo:" + ammo +"]");
    logMessage("|[Missiles:" + missile +"]");
    logMessage("|");
    if (KA === true) {
            tryMove (pixel,pixel.x-vX,pixel.y)
        }
    if (KD === true) {
            tryMove (pixel,pixel.x+vX,pixel.y)
        }
    if (KW === true) {
            tryMove (pixel,pixel.x,pixel.y-vY)
        }
    if (KS === true) {
            tryMove (pixel,pixel.x,pixel.y+vY)
        }
    if (KJ === true && missile > 0) {
            createPixel("cfj_missile_left",pixel.x-1,pixel.y);
            missile--;
        }
    if (KL === true && missile > 0) {
            createPixel("cfj_missile_right",pixel.x+1,pixel.y);
            missile--;
        }
    if (KI === true && missile > 0) {
            createPixel("cfj_missile_up",pixel.x,pixel.y-1);
            missile--;
        }
    if (KK === true && missile > 0) {
            createPixel("cfj_missile_down",pixel.x,pixel.y+1);
            missile--;
        }
    if (KQ === true) {
         if (KA === true && dl === false && ul === false && ammo > 0) {
            createPixel("cfj_b_l",pixel.x-4,pixel.y);
            ammo--;
             }
        if (KD === true && dr === false && ur === false && ammo > 0) {
            createPixel("cfj_b_r",pixel.x+4,pixel.y);
            ammo--;
             }
        if (KW === true && ul === false && ur === false && ammo > 0) {
            createPixel("cfj_b_u",pixel.x,pixel.y-4);
            ammo--;
             }
        if (KS === true && dl === false && dr === false && ammo > 0) {
            createPixel("cfj_b_d",pixel.x,pixel.y+4);
            ammo--;
             }
         if (KA === true && KW === true && ammo > 0) {
            createPixel("cfj_b_ul",pixel.x-4,pixel.y-4);
             ul = true;
             ammo--;
             }
        if (KD === true && KW === true && ammo > 0) {
            createPixel("cfj_b_ur",pixel.x+4,pixel.y-4);
            ur = true;
            ammo--;
             }
        if (KA === true && KS === true && ammo > 0) {
            createPixel("cfj_b_dl",pixel.x-4,pixel.y-4);
            dl = true;
            ammo--;
             }
        if (KD === true && KS === true && ammo > 0) {
            createPixel("cfj_b_dr",pixel.x+4,pixel.y+4);
            dr = true;
            ammo--;
             }
        }
    },
    category: "cfj",
    states:"solid",
    color:"#FFFFFF",
},
elements.cfj_missile_left = {
    color: "#524c41",
    category: "cfj",
    state: "solid",
    behavior: [
        "XX|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|XX",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|M2 AND EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|M1|XX|EX:20>missile_shrapnel|CR:smoke AND EX:20>missile_shrapnel|EX:20>missile_shrapnel",
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
    cooldown: defaultCooldown,
    ignore: "cfj",
},
elements.cfj_missile_right = {
    color: "#524c41",
    category: "cfj",
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
    cooldown: defaultCooldown,
    ignore: "cfj",
},
elements.cfj_missile_up = {
    color: "#524c41",
    category: "cfj",
    state: "solid",
    behavior: [
        "XX|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|XX",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|M2 AND EX:20>missile_shrapnel|M1 AND EX:20>missile_shrapnel|M2 AND EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|XX|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|CR:smoke AND EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "XX|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|XX",
    ],
    tick: function(pixel) {
        for (var i=0; i<3; i++) {
            if (!tryMove(pixel, pixel.x, pixel.y-1)) {
                if (!isEmpty(pixel.x, pixel.y-1,true)) {
                    }
                }
            }
        },
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown,
    ignore: "cfj",
},
elements.cfj_missile_down = {
    color: "#524c41",
    category: "cfj",
    state: "solid",
    behavior: [
        "XX|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|XX",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|CR:smoke AND EX:20>missile_shrapnel|M2 AND EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|XX||EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|M2 AND EX:20>missile_shrapnel|M1 AND EX:20>missile_shrapnel|M2 AND EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel",
        "XX|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|EX:20>missile_shrapnel|XX",
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
    cooldown: defaultCooldown,
    ignore: "cfj",
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
elements.cfj_b_l = {
    color: "#4c4e42",
    behavior: [
        "DB|DB|DB",
        "DB|XX|DB",
        "DB|DB|DB",
    ],
    tick: function(pixel) {
        for (var i=0; i<3; i++) {
            if (!tryMove(pixel, pixel.x-3, pixel.y)) {
                deletePixel(pixel.x,pixel.y)
                }
            }
    },
    category: "cfj",
    state: "solid",
    insulate: true,
    ignore: "cfj",
},
elements.cfj_b_r = {
    color: "#4c4e42",
    behavior: [
        "DB|DB|DB",
        "DB|XX|DB",
        "DB|DB|DB",
    ],
tick: function(pixel) {
        for (var i=0; i<3; i++) {
            if (!tryMove(pixel, pixel.x+3, pixel.y)) {
                deletePixel(pixel.x,pixel.y)
                }
            }
    },
    category: "cfj",
    state: "solid",
    insulate: true,
    ignore: "cfj",
},
elements.cfj_b_u = {
    color: "#4c4e42",
    behavior: [
        "DB|DB|DB",
        "DB|XX|DB",
        "DB|DB|DB",
    ],
    tick: function(pixel) {
        for (var i=0; i<3; i++) {
            if (!tryMove(pixel, pixel.x, pixel.y-3)) {
                deletePixel(pixel.x,pixel.y)
                }
            }
    },
    category: "cfj",
    state: "solid",
    insulate: true,
    ignore: "cfj",
},
elements.cfj_b_d = {
    color: "#4c4e42",
    behavior: [
        "DB|DB|DB",
        "DB|XX|DB",
        "DB|DB|DB",
    ],
    tick: function(pixel) {
        for (var i=0; i<3; i++) {
            if (!tryMove(pixel, pixel.x, pixel.y+3)) {
                deletePixel(pixel.x,pixel.y)
                }
            }
    },
    category: "cfj",
    state: "solid",
    insulate: true,
    ignore: "cfj",
},
elements.cfj_b_ul = {
    color: "#4c4e42",
    behavior: [
        "DB|DB|DB",
        "DB|XX|DB",
        "DB|DB|DB",
    ],
tick: function(pixel) {
        for (var i=0; i<3; i++) {
            if (!tryMove(pixel, pixel.x-3, pixel.y-3)) {
                deletePixel(pixel.x,pixel.y)
                }
            }
    },
    category: "cfj",
    state: "solid",
    insulate: true,
    ignore: "cfj",
},
elements.cfj_b_dl = {
    color: "#4c4e42",
    behavior: [
        "DB|DB|DB",
        "DB|XX|DB",
        "DB|DB|DB",
    ],
    tick: function(pixel) {
        for (var i=0; i<3; i++) {
            if (!tryMove(pixel, pixel.x-3, pixel.y+3)) {
                deletePixel(pixel.x,pixel.y)
                }
            }
    },
    category: "cfj",
    state: "solid",
    insulate: true,
    ignore: "cfj",
},
elements.cfj_b_ur = {
    color: "#4c4e42",
    behavior: [
        "DB|DB|DB",
        "DB|XX|DB",
        "DB|DB|DB",
    ],
    tick: function(pixel) {
        for (var i=0; i<3; i++) {
            if (!tryMove(pixel, pixel.x+3, pixel.y-3)) {
                deletePixel(pixel.x,pixel.y)
                }
            }
    },
    category: "cfj",
    state: "solid",
    insulate: true,
    ignore: "cfj",
},
elements.cfj_b_dr = {
    color: "#4c4e42",
    behavior: [
        "DB|DB|DB",
        "DB|XX|DB",
        "DB|DB|DB",
    ],
    tick: function(pixel) {
        for (var i=0; i<3; i++) {
            if (!tryMove(pixel, pixel.x+3, pixel.y+3)) {
                deletePixel(pixel.x,pixel.y)
                }
            }
    },
    category: "cfj",
    state: "solid",
    insulate: true,
    ignore: "cfj",
}