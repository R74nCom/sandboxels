elements.lab = {
    color: "#ff0000",
    behaviorOn: behaviors.WALL,
    behavior: [
        "CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wire|CR:wire|CR:wire|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall",
        "CR:wall|DL|XX|XX|XX|XX|XX|CR:e_cr|CR:wall|CR:sensor|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|XX|XX|XX|XX|XX|XX|XX|CR:glass|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|XX|XX|XX|XX|XX|XX|XX|CR:glass|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|CR:wall|CR:wall|CR:wall|XX|CR:wall|CR:wall|CR:wall|CR:wall|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|XX|XX|XX|XX|XX|XX|XX|CR:wall|CR:wall|CR:wall|CR:wire|xx|CR:wall|XX|XX|XX|XX|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|CR:ecloner|XX|CR:wall|XX|XX|XX|XX|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|XX|XX|XX|XX|XX|XX|XX|CR:wall|CR:wall|CR:wall|CR:wire|CR:wall|CR:wall|XX|XX|XX|XX|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|XX|XX|XX|XX|XX|XX|XX|CR:glass|XX|XX|CR:sensor|CR:wall|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|XX|XX|XX|XX|XX|XX|XX|CR:glass|XX|XX|XX|CR:wall|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|XX|XX|XX|XX|XX|XX|XX|CR:wall|CR:wall|XX|CR:wall|CR:wall|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|XX|XX|XX|XX|XX|XX|XX|CR:wall|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|XX|XX|XX|XX|XX|XX|XX|CR:wall|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|XX|XX|XX|XX|XX|XX|XX|CR:wall|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|XX|XX|XX|XX|XX|XX|XX|CR:wall|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|XX|XX|XX|XX|XX|XX|XX|CR:wall|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|XX|XX|XX|XX|XX|XX|XX|CR:wall|XX|XX|XX|XX|XX|XX|XX|CR:player|CR:player_2|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|XX|XX|XX|XX|XX|XX|XX|CR:wall|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|XX|XX|XX|XX|XX|XX|XX|CR:wall|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|XX|XX|XX|XX|XX|XX|XX|CR:wall|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|XX|XX|XX|XX|XX|XX|XX|CR:wall|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|XX|XX|XX|XX|XX|XX|XX|CR:wall|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|XX|XX|XX|XX|XX|XX|XX|CR:wall|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|XX|CR:wall|CR:wall|CR:wall|XX|CR:wall|CR:wall|CR:wall|CR:wall|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|CR:wire|CR:wall|CR:wire|CR:wall|CR:wire|CR:wall|CR:wire|CR:wall|XX|XX|XX|CR:wall|XX|XX|XX|XX|CR:wall|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|CR:wire|CR:wire|CR:wire|CR:wire|CR:wire|CR:wire|CR:wire|CR:wall|XX|XX|XX|CR:wall|XX|XX|XX|XX|CR:wall|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|CR:wall|CR:wall|CR:wall|CR:wire|CR:wall|CR:wall|CR:wall|CR:wire|CR:sensor|XX|XX|CR:wall|XX|XX|XX|XX|CR:wall|XX|XX|XX|XX|XX|CR:wall",
        "CR:wall|CR:wall|CR:wall|CR:wall|CR:wire|CR:wire|CR:wire|CR:wire|CR:wire|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall|CR:wall",
    ],
    category: "lab",
    state: "solid",
};
elements.e_cr = {
    name: "e-cr",
    color: "#dddd00",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|CR:human|XX"
    ],
    tick: function(pixel) {
        if (pixel.create) { return }
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coords = adjacentCoords[i];
            var x = pixel.x + coords[0];
            var y = pixel.y + coords[1];
            if (!isEmpty(x,y,true)) {
                pixel.temp = pixelMap[x][y].temp;
                if (pixelMap[x][y].create) { pixel.create = pixelMap[x][y].create; break }
                var element = pixelMap[x][y].element;
                if (element === pixel.element || elements[pixel.element].ignore.indexOf(element) !== -1) { continue }
                pixel.create = element;
                break;
            }
        }
    },
    ignore: ["cloner","slow_cloner","clone_powder","floating_cloner","wire","ewall","wire","sensor","battery"],
    category:"machines",
    insulate:true,
    darkText: true,
    conduct: 1,
    hardness: 1,
    movable: false
}
var libraryMod = "mods/code_library.js";

if(enabledMods.includes(libraryMod)) {
    sussyKey = null;
    isShift = false;
    isAlt = false;

    document.addEventListener("keydown", function(modifierDownListener) {
        // User presses shift
        if (modifierDownListener.keyCode == 16) {
            isShift = true;
        }
        // User presses alt
        if (modifierDownListener.keyCode == 18) {
            isAlt = true;
        }
    });

    document.addEventListener("keyup", function(modifierUpListener) {
        // User releases shift
        if (modifierUpListener.keyCode == 16) {
            isShift = false;
        }
        // User releases alt
        if (modifierUpListener.keyCode == 18) {
            isAlt = false;
        }
    });

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
            case 86:
                sussyKey = "V";
                break;
        };
    });

    function controllablePixelTryCreatePixelNullCheck(element,x,y) {
        if(!elements[element]) { //catch the null
            return false;
        };
        if(isEmpty(x,y)) {
            tryCreatePixel(element,x,y);
            return true;
        } else {
            return false;
        }
    }

    elements.player = {
        color: "#FFFFFF",
        colorOn: "#FFFF00",
        behavior: behaviors.WALL,
        state: "solid",
        density: 2000,
        maxSize: 1,
        conduct: 1,
        hardness: 1,
        tick: function(pixel) {
            var xx = pixel.x;
            var yy = pixel.y;
            userElement = currentElement;
            if(userElement === pixel.element) {
                userElement = null;
            };
            if(isShift && !isAlt) {
                sussyKey === "Z" ? pixel.color = "rgb(255,191,127)" : pixel.color = "rgb(255,127,127)";
            }
            if(isAlt && !isShift) {
                sussyKey === "Z" ? pixel.color = "rgb(191,255,127)" : pixel.color = "rgb(127,255,127)";
            }
            if(isAlt && isShift) {
                sussyKey === "Z" ? pixel.color = "rgb(255,255,0)" : pixel.color = "rgb(255,255,127)";
            }
            if(!isAlt && !isShift) {
                sussyKey === "Z" ? pixel.color = "rgb(255,255,191)" : pixel.color = "rgb(255,255,255)";
            }
            if(sussyKey !== null) {
                switch (sussyKey) {
                    case "W":
                        isAlt ? controllablePixelTryCreatePixelNullCheck(userElement,xx,yy-1) : tryMove(pixel,xx,yy-1);
                        if(!isShift) {
                            sussyKey = null;
                        }
                        break;
                    case "A":
                        isAlt ? controllablePixelTryCreatePixelNullCheck(userElement,xx-1,yy) : tryMove(pixel,xx-1,yy);
                        if(!isShift) {
                            sussyKey = null;
                        }
                        break;
                    case "S":
                        isAlt ? controllablePixelTryCreatePixelNullCheck(userElement,xx,yy+1) : tryMove(pixel,xx,yy+1);
                        if(!isShift) {
                            sussyKey = null;
                        }
                        break;
                    case "D":
                        tryMove(pixel,xx+1,yy);
                        if(!isShift) {
                            sussyKey = null;
                        }
                        break;
                    case "V": //Alt+D is something else in some browsers.
                        if(isAlt) {
                            controllablePixelTryCreatePixelNullCheck(userElement,xx+1,yy);
                        };
                        if(!isShift) {
                            sussyKey = null;
                        }
                        break;
                    case "X":
                        explodeAt(xx,yy,5)
                        if(!isShift) {
                            sussyKey = null;
                        }
                        break;
                    case "Z":
                        if (!pixel.charge && !pixel.chargeCD && !isEmpty(pixel.x,pixel.y,true)) {
                            pixel.charge = 1;
                        }
                        if(!isShift === 0) {
                            sussyKey = null;
                        }
                        break;
                    case "Q": //Use if a key gets stuck
                        sussyKey = null;
                        isShift = null;
                        isAlt = null;
                        break;
                }
            }
        },
    };
} else {
    alert(`The ${libraryMod} mod is required and has been automatically inserted (reload for this to take effect).`)
    enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod)
    localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
};


var libraryMod = "mods/code_library.js";

if(enabledMods.includes(libraryMod)) {
    sussyKey = null;
    isShift = false;
    isAlt = false;

    document.addEventListener("keydown", function(modifierDownListener) {
        // User presses shift
        if (modifierDownListener.keyCode == 16) {
            isShift = true;
        }
        // User presses alt
        if (modifierDownListener.keyCode == 18) {
            isAlt = true;
        }
    });

    document.addEventListener("keyup", function(modifierUpListener) {
        // User releases shift
        if (modifierUpListener.keyCode == 16) {
            isShift = false;
        }
        // User releases alt
        if (modifierUpListener.keyCode == 18) {
            isAlt = false;
        }
    });

    document.addEventListener("keyup", function(sussyListener) {
        switch (sussyListener.keyCode) {
            case 73:
                sussyKey = "I";
                break;
            case 74:
                sussyKey = "J";
                break;
            case 75:
                sussyKey = "K";
                break;
            case 76:
                sussyKey = "L";
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
            case 86:
                sussyKey = "V";
                break;
        };
    });

    function controllablePixelTryCreatePixelNullCheck(element,x,y) {
        if(!elements[element]) { //catch the null
            return false;
        };
        if(isEmpty(x,y)) {
            tryCreatePixel(element,x,y);
            return true;
        } else {
            return false;
        }
    }

    elements.player_2 = {
        color: "#FFFFFF",
        colorOn: "#FFFF00",
        behavior: behaviors.WALL,
        state: "solid",
        density: 2000,
        maxSize: 1,
        conduct: 1,
        hardness: 1,
        tick: function(pixel) {
            var xx = pixel.x;
            var yy = pixel.y;
            userElement = currentElement;
            if(userElement === pixel.element) {
                userElement = null;
            };
            if(isShift && !isAlt) {
                sussyKey === "Z" ? pixel.color = "rgb(255,191,127)" : pixel.color = "rgb(255,127,127)";
            }
            if(isAlt && !isShift) {
                sussyKey === "Z" ? pixel.color = "rgb(191,255,127)" : pixel.color = "rgb(127,255,127)";
            }
            if(isAlt && isShift) {
                sussyKey === "Z" ? pixel.color = "rgb(255,255,0)" : pixel.color = "rgb(255,255,127)";
            }
            if(!isAlt && !isShift) {
                sussyKey === "Z" ? pixel.color = "rgb(255,255,191)" : pixel.color = "rgb(255,255,255)";
            }
            if(sussyKey !== null) {
                switch (sussyKey) {
                    case "I":
                        isAlt ? controllablePixelTryCreatePixelNullCheck(userElement,xx,yy-1) : tryMove(pixel,xx,yy-1);
                        if(!isShift) {
                            sussyKey = null;
                        }
                        break;
                    case "J":
                        isAlt ? controllablePixelTryCreatePixelNullCheck(userElement,xx-1,yy) : tryMove(pixel,xx-1,yy);
                        if(!isShift) {
                            sussyKey = null;
                        }
                        break;
                    case "K":
                        isAlt ? controllablePixelTryCreatePixelNullCheck(userElement,xx,yy+1) : tryMove(pixel,xx,yy+1);
                        if(!isShift) {
                            sussyKey = null;
                        }
                        break;
                    case "L":
                        tryMove(pixel,xx+1,yy);
                        if(!isShift) {
                            sussyKey = null;
                        }
                        break;
                    case "V": //Alt+D is something else in some browsers.
                        if(isAlt) {
                            controllablePixelTryCreatePixelNullCheck(userElement,xx+1,yy);
                        };
                        if(!isShift) {
                            sussyKey = null;
                        }
                        break;
                    case "X":
                        explodeAt(xx,yy,5)
                        if(!isShift) {
                            sussyKey = null;
                        }
                        break;
                    case "Z":
                        if (!pixel.charge && !pixel.chargeCD && !isEmpty(pixel.x,pixel.y,true)) {
                            pixel.charge = 1;
                        }
                        if(!isShift === 0) {
                            sussyKey = null;
                        }
                        break;
                    case "Q": //Use if a key gets stuck
                        sussyKey = null;
                        isShift = null;
                        isAlt = null;
                        break;
                }
            }
        },
    };
} else {
    alert(`The ${libraryMod} mod is required and has been automatically inserted (reload for this to take effect).`)
    enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod)
    localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
};



// i know it looks messy but it works

// if u dont belive me test it but place it in the center of the canvas
