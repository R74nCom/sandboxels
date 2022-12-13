var modName = "mods/cpt_alt.js";
var explodeAtPlusMod = "mods/explodeAtPlus.js";
var libraryMod = "mods/code_library.js";

if(enabledMods.includes(explodeAtPlusMod) && enabledMods.includes(libraryMod)) {
	actExcludedElements = ["wall","alt_controllable_pixel"];
	
	function actTryMove(pixel,x,y) {
		if(!tryMove(pixel,x,y)) {
			if(outOfBounds(x,y)) {
				return false;
			};
			if(!isEmpty(x,y,true)) {
				var newPixel = pixelMap[x][y];
				var newElement = newPixel.element;
				if(actExcludedElements.includes(newElement)) {
					return false;
				};
				if(newElement == pixel.element) { //Copy-paste of "break" code
					swapPixels(pixel,newPixel);
					return true;
				} else {
					breakCircle(newPixel.x,newPixel.y,pixel.breakAroundRadius,false,false,false); //does nothing to elements without breakIntos if defaultBreakIntoDust is false
					swapPixels(pixel,newPixel);
					return true;
				};
			} else {
				return false;
			};
		} else {
			return true;
		};
	};
	
	function cptaEapFunction(pixel,x,y,radius,fire,smoke,power,damage) {
		var coords = circleCoords(pixel.x,pixel.y,radius);
		for (var i = 0; i < coords.length; i++) {
			var x = coords[i].x;
			var y = coords[i].y;
			if(isEmpty(x,y)) { //if there's space for fire
				if (Array.isArray(fire)) { //this should remain "fire"
					var newfire = fire[Math.floor(Math.random() * fire.length)];
				} else {
					var newfire = fire;
				};
				createPixel(newfire,x,y); //add fire
				var firePixel = pixelMap[x][y];
				firePixel.temp = Math.max(elements[newfire].temp,firePixel.temp);
				firePixel.burning = true;
			};
			if(!isEmpty(x,y,true)) {
				pixel.temp += (400 * ((1 + (5 * damage)) ** 2) * ((power ** 1.5) * 1.5));
				pixelTempCheck(pixel);
			};
			if(enabledMods.includes("mods/velocity.js")) {
				if (!elements[pixel.element].excludeVelocity) {
					var angle = Math.atan2(pixel.y-y,pixel.x-x);
					pixel.vx = Math.round((pixel.vx|0) + Math.cos(angle) * (radius * power/10));
					pixel.vy = Math.round((pixel.vy|0) + Math.sin(angle) * (radius * power/10));
				}
			};
		};
	};

	alt_sussyKey = null;
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

	document.addEventListener("keyup", function(alt_sussyListener) {
		switch (alt_sussyListener.keyCode) {
			case 87:
				alt_sussyKey = "W";
				break;
			case 65:
				alt_sussyKey = "A";
				break;
			case 83:
				alt_sussyKey = "S";
				break;
			case 68:
				alt_sussyKey = "D";
				break;
			case 81:
				alt_sussyKey = "Q";
				break;
			case 88:
				alt_sussyKey = "X";
				break;
			case 90:
				alt_sussyKey = "Z";
				break;
			case 72:
				alt_sussyKey = "H";
				break;
			case 76:
				alt_sussyKey = "L";
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

	elements.alt_controllable_pixel = {
		color: "#7F7F7F",
		colorOn: "#FFFF00",
		behavior: behaviors.WALL,
		state: "solid",
		density: 2000,
		maxSize: 1,
		conduct: 1,
		hardness: 1,
		movable: true,
		desc: "it breaks things more<br/>Use the console or enable prop.js to set speed / explosionRadius / circleRadius / breakAroundRadius (though it has an Illogical™ random resetting bug)",
		breakInto: "alt_controllable_pixel",
		properties: {
			speed: 1,
			explosionRadius: 8,
			circleRadius: 8,
			breakAroundRadius: 4,
		},
		excludeVelocity: true,
		tick: function(pixel) {
			userElement = currentElement;
			if(userElement === pixel.element) {
				userElement = null;
			};
			if(isShift && !isAlt) {
				alt_sussyKey === "Z" ? pixel.color = "rgb(255,191,127)" : pixel.color = "rgb(255,127,127)";
			}
			if(isAlt && !isShift) {
				alt_sussyKey === "Z" ? pixel.color = "rgb(191,255,127)" : pixel.color = "rgb(127,255,127)";
			}
			if(isAlt && isShift) {
				alt_sussyKey === "Z" ? pixel.color = "rgb(255,255,0)" : pixel.color = "rgb(255,255,127)";
			}
			if(!isAlt && !isShift) {
				alt_sussyKey === "Z" ? pixel.color = "rgb(255,255,191)" : pixel.color = "rgb(255,255,255)";
			}
			if(alt_sussyKey !== null) {
				switch (alt_sussyKey) {
					case "W":
						if(isAlt) { controllablePixelTryCreatePixelNullCheck(userElement,pixel.x,pixel.y-1) } else { for(move = 0; move < pixel.speed; move++) { actTryMove(pixel,pixel.x,pixel.y-1) } };
						if(!isShift) {
							alt_sussyKey = null;
						}
						break;
					case "A":
						if(isAlt) { controllablePixelTryCreatePixelNullCheck(userElement,pixel.x-1,pixel.y) } else { for(move = 0; move < pixel.speed; move++) { actTryMove(pixel,pixel.x-1,pixel.y) } };
						if(!isShift) {
							alt_sussyKey = null;
						}
						break;
					case "S":
						if(isAlt) { controllablePixelTryCreatePixelNullCheck(userElement,pixel.x,pixel.y+1) } else { for(move = 0; move < pixel.speed; move++) { actTryMove(pixel,pixel.x,pixel.y+1) } };
						if(!isShift) {
							alt_sussyKey = null;
						}
						break;
					case "D":
						for(move = 0; move < pixel.speed; move++) { actTryMove(pixel,pixel.x+1,pixel.y) };
						if(!isShift) {
							alt_sussyKey = null;
						}
						break;
					case "H": //Alt+D is something else in some browsers.
						if(isAlt) {
							controllablePixelTryCreatePixelNullCheck(userElement,pixel.x+1,pixel.y);
						};
						if(!isShift) {
							alt_sussyKey = null;
						}
						break;
					case "X": 
						explodeAtPlus(pixel.x,pixel.y,pixel.explosionRadius,"plasma,fire,fire","fire,smoke,smoke",null,cptaEapFunction)
						if(!isShift) {
							alt_sussyKey = null;
						}
						break;
					case "Z":
						if (!pixel.charge && !pixel.chargeCD && !isEmpty(pixel.x,pixel.y,true)) {
							pixel.charge = 1;
						}
						if(!isShift === 0) {
							alt_sussyKey = null;
						}
						break;
					case "L":
						if(userElement !== null) {
							fillCircle(currentElement,pixel.x,pixel.y,pixel.circleRadius,false);
							if(!isShift === 0) {
								alt_sussyKey = null;
							}
						};
						break;
					case "Q": //Use if a key gets stuck
						alt_sussyKey = null;
						isShift = null;
						isAlt = null;
						break;
				}
			}
		},
	}
} else {
	if(!enabledMods.includes(explodeAtPlusMod))		{ enabledMods.splice(enabledMods.indexOf(modName),0,explodeAtPlusMod) };
	if(!enabledMods.includes(libraryMod))			{ enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod) };
	alert(`The "${libraryMod}" and "${explodeAtPlusMod}" mods are required; any missing mods in this list have been automatically inserted (reload for this to take effect).`)
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
};
