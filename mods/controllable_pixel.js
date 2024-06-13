document.onkeydown = function(ki)/*keyboard_input*/ {
    //a
    if (ki.keyCode == 65) {
        KA = true;
        //vX ++;
    }
    //d
    if (ki.keyCode == 68) {
        KD = true;
        //vX ++;
    }
    //w
    if (ki.keyCode == 87) {
        KW = true;
        //vY ++;
    }
    //s
    if (ki.keyCode == 83) {
        KS = true;
        //vY ++;
    }
}
document.onkeyup = function(i2)/*keyboard_input*/ {
    //a
    if (i2.keyCode == 65) {
        KA = false;
        //vX --;
    }
    //d
    if (i2.keyCode == 68) {
        KD = false;
       //vX --;
    }
    //w
    if (i2.keyCode == 87) {
        KW = false;
        //vY = 0;
    }
    //s
    if (i2.keyCode == 83) {
        KS = false;
        //vY = 0;
    }
}
var KA = false;
var KD = false;
var KW = false;
var KS = false;
var vX = 1;
var vY = 1;
elements.c_pixel = {
    tick: function(pixel) {
    /*if (vX === 3) {
            vX --;
        }
    if (vY === 3) {
            vY --;
        }*/
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
    },
    category: "special",
    states:"solid",
    color:"#FFFFFF",
}