playerKills = 0;

aplReceivedKey = null;
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

entities = ["apioform_bee", "apioform", "apiodiagoform", "apiokinetoform", "apiopyroform", "cryoapioform", "apiopariform"]

function apioTryMove(pixel,nx,ny,leaveBehind=undefined) {
	if(!isEmpty(nx,ny,true) && !outOfBounds(nx.ny)) {
		otherPixel = pixelMap[nx][ny];
		var thisElement = pixel.element;
		var otherElement = otherPixel.element;
		if(thisElement == "apioform_player") {
			if(entities.includes(otherElement)) {
				deletePixel(nx,ny);
				playerKills++;
				movePixel(pixel,nx,ny,leaveBehind)
			};
		} else if(entities.includes(thisElement)) {
			if(otherElement == "apioform_player") {
				deletePixel(nx,ny);
				movePixel(pixel,nx,ny,leaveBehind)
			};
		};
	} else {
		tryMove(pixel,nx,ny,leaveBehind);
	};
}

document.addEventListener("keyup", function(apioformPlayerListener) {
    switch (apioformPlayerListener.keyCode) {
		case 38: //arrow up, letter 87:
            aplReceivedKey = "W";
            break;
        case 37: //arrow left, letter 65
            aplReceivedKey = "A";
            break;
        case 40: //arrow down, letter 83
            aplReceivedKey = "S";
            break;
        case 39: //arrow right, letter 68
            aplReceivedKey = "D";
            break;
        case 27: //escape key, letter 81
            aplReceivedKey = "Q";
            break;
    };
});

elements.apioform_player = {
    color: "#7F7F7F",
    behavior: behaviors.WALL,
    state: "solid",
    density: 2000,
    maxSize: 1,
    hardness: 0.8,
	burnTime: 10,
	burn: 50,
    tick: function(pixel) {
        var xx = pixel.x;
        var yy = pixel.y;
        if(isShift) {
            pixel.color = "rgb(255,127,127)";
        } else {
            pixel.color = "rgb(255,255,255)";
        }
        if(aplReceivedKey !== null) {
            switch (aplReceivedKey) {
                case "W":
                    apioTryMove(pixel,xx,yy-1);
                    if(!isShift) {
                        aplReceivedKey = null;
                    }
                    break;
                case "A":
                    apioTryMove(pixel,xx-1,yy);
                    if(!isShift) {
                        aplReceivedKey = null;
                    }
                    break;
                case "S":
                    apioTryMove(pixel,xx,yy+1);
                    if(!isShift) {
                        aplReceivedKey = null;
                    }
                    break;
                case "D":
                    apioTryMove(pixel,xx+1,yy);
                    if(!isShift) {
                        aplReceivedKey = null;
                    }
                    break;
                case "Q": //Use if a key gets stuck
                    aplReceivedKey = null;
                    isShift = null;
                    break;
            };
        };
    },
}

elements.apioform_bee = {
    color: ["#808020", "#A0A050"],
	properties: {
		stage: ((Math.random() < 0.5) ? 0 : 1),
	},
    behavior: behaviors.WALL,
    state: "solid",
    density: 2000,
    maxSize: 1,
    hardness: 0.8,
	flippableY: true,
    tick: function(pixel) {
		if(isNaN(pixel.stage)) {
			pixel.stage = ((Math.random() < 0.5) ? 0 : 1);
		};
		pixel.stage = Math.min(1,Math.max(0,Math.round(pixel.stage)));	//stage validation

		var moveCoords = (pixel.flipY ? [pixel.x, pixel.y+1] : [pixel.x, pixel.y-1]);
		
																		//direction is randomized by flippableY
		if(pixel.stage === 0) { //color
			pixel.color = "rgb(128,128,32)";
		} else if(pixel.stage === 1) {
			pixel.color = "rgb(160,160,80)";
		};

		if(pixelTicks - pixel.start > 0) { //don't move on first tick, to allow color to normalize
			if(pixel.stage === 0) { //if in still stage
				pixel.stage = 1; //change to moving stage
			} else if(pixel.stage === 1) { //else if in moving stage
				apioTryMove(pixel,moveCoords[0],moveCoords[1]); //move
				pixel.flipY = !pixel.flipY; //flip that
				pixel.stage = 0; //change to still stage
			};
		};

    },
}

elements.apioform = {
    color: "#A08020",
    behavior: behaviors.WALL,
    state: "solid",
    density: 2000,
    maxSize: 1,
    hardness: 0.8,
	rotatable: true,
    tick: function(pixel) {
		if(isNaN(pixel.r)) {
			pixel.r = Math.floor(Math.random() * 4);
		};
		pixel.r = Math.round(pixel.r) % 4;	//rotation validation, probably redundant since rotation is from the base game

		var moveCoords;
		switch (pixel.r) {
			case 0:
				moveCoords = [pixel.x+1, pixel.y+0];
				break;
			case 1:
				moveCoords = [pixel.x+0, pixel.y-1];
				break;
			case 2:
				moveCoords = [pixel.x-1, pixel.y+0];
				break;
			case 3:
				moveCoords = [pixel.x+0, pixel.y+1];
				break;
		};
		//rotation is randomized by rotatable
		
		if(pixelTicks - pixel.start > 0) { //maintained for consistency
			apioTryMove(pixel,moveCoords[0],moveCoords[1]); //move
			pixel.r++; //increment rotation
		};
    },
}

elements.apiodiagoform = {
    color: "#A080A0",
    behavior: behaviors.WALL,
    state: "solid",
    density: 2000,
    maxSize: 1,
    hardness: 0.8,
	rotatable: true,
    tick: function(pixel) {
		if(isNaN(pixel.r)) {
			pixel.r = Math.floor(Math.random() * 4);
		};
		pixel.r = Math.round(pixel.r) % 4;	//rotation validation, probably redundant since rotation is from the base game

		var moveCoords;
		switch (pixel.r) {
			case 0:
				moveCoords = [pixel.x-1, pixel.y-1];
				break;
			case 1:
				moveCoords = [pixel.x-1, pixel.y+1];
				break;
			case 2:
				moveCoords = [pixel.x+1, pixel.y+1];
				break;
			case 3:
				moveCoords = [pixel.x+1, pixel.y-1];
				break;
		};
		//rotation is randomized by rotatable
		
		if(pixelTicks - pixel.start > 0) { //maintained for consistency
			apioTryMove(pixel,moveCoords[0],moveCoords[1]); //move
			pixel.r++; //increment rotation
		};
    },
}
