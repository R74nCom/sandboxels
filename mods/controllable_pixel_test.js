var modName = "mods/controllable_pixel_test.js";
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
			case 72:
				sussyKey = "H";
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

	elements.controllable_pixel = {
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
					case "H": //Alt+D is something else in some browsers.
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
	}
} else {
	alert(`The ${libraryMod} mod is required and has been automatically inserted (reload for this to take effect).`)
	enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod)
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
};
