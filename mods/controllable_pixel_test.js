sussyKey = null,

document.addEventListener("keyup", function(sussyListener) {
    switch (sussyListener.keyCode) {
        case 87:
            sussyKey = "W";
            break;
        case 65:
            sussyKey = "A";
            break;
        case 83:
            sussyKey = "S";
            break;
        case 68:
            sussyKey = "D";
            break;
        case 81:
            sussyKey = "Q";
            break;
        case 88:
            sussyKey = "X";
            break;
        case 90:
            sussyKey = "Z";
            break;
    };
});

elements.controllable_pixel = {
    color: "#FFFFFF",
    colorOn: "#FFFF00",
    behavior: behaviors.WALL,
    state: "solid",
    density: 2000,
    conduct: 1,
    hardness: 1,
    tick: function(pixel) {
        var xx = pixel.x
        var yy = pixel.y
        if(sussyKey !== null) {
            switch (sussyKey) {
                case "W":
                    tryMove(pixel,xx,yy-1)
                    if(shiftDown === 0) {
                        sussyKey = null;
                    }
                    break;
                case "A":
                    tryMove(pixel,xx-1,yy)
                    if(shiftDown === 0) {
                        sussyKey = null;
                    }
                    break;
                case "S":
                    tryMove(pixel,xx,yy+1)
                    if(shiftDown === 0) {
                        sussyKey = null;
                    }
                    break;
                case "D":
                    tryMove(pixel,xx+1,yy)
                    if(shiftDown === 0) {
                        sussyKey = null;
                    }
                    break;
                case "X":
                    explodeAt(xx,yy,4)
                    if(shiftDown === 0) {
                        sussyKey = null;
                    }
                    break;
                case "Z":
                    if (!pixel.charge && !pixel.chargeCD && !isEmpty(pixel.x,pixel.y,true)) {
                        pixel.charge = 1;
                    }
                    if(shiftDown === 0) {
                        sussyKey = null;
                    }
                    break;
                case "Q":
                    sussyKey = null;
                    break;
            }
        }
    },
}
