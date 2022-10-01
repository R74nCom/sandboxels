function pyth(xA,yA,xB,yB) {
    var a = Math.abs(xB - xA);
    var b = Math.abs(yB - yA);
    var c = Math.sqrt(a**2 + b**2);
    return c;
};

function test(centerX,centerY,integer,chosenElement,createPixels=true,replacePixels=true,radialColor=false) {
	if(!elements[chosenElement]) {
		alert("Element " + chosenElement + " doesn't exist!");
		return false;
	};
	integer = Math.round(integer);
    for(i = 1; i < width; i++) {
        for(j = 1; j < height; j++) {
            var distance = pyth(centerX,centerY,i,j);
            if(Math.round(distance) % integer == 0) {
                if(isEmpty(i,j,false) && createPixels) {
                    createPixel(chosenElement,i,j);
                } else if(!isEmpty(i,j,true) && !outOfBounds(i,j) && replacePixels) {
					changePixel(pixelMap[i][j],chosenElement);
				};
            };
        };
    };
	return true;
};

function rctest(centerX,centerY,integer,chosenElement,createPixels=true,replacePixels=true,distanceScale=1,saturation=50,luminance=50) {
	saturation = Math.max(0,Math.min(100,saturation))
	luminance = Math.max(0,Math.min(100,luminance))
	if(!elements[chosenElement]) {
		alert("Element " + chosenElement + " doesn't exist!");
		return false;
	};
	integer = Math.round(integer);
    for(i = 1; i < width; i++) {
        for(j = 1; j < height; j++) {
            var distance = pyth(centerX,centerY,i,j);
            if(Math.round(distance) % integer == 0) {
                if(isEmpty(i,j,false) && createPixels) {
                    createPixel(chosenElement,i,j);
					var distancePrevariable = Math.round(distance * distanceScale) % 360
					pixelMap[i][j].color = `hsl(${distancePrevariable},${saturation}%,${luminance}%)`;
                } else if(!isEmpty(i,j,true) && !outOfBounds(i,j) && replacePixels) {
					changePixel(pixelMap[i][j],chosenElement);
					var distancePrevariable = Math.round(distance * distanceScale) % 360
					pixelMap[i][j].color = `hsl(${distancePrevariable},${saturation}%,${luminance}%)`;
				};
            };
        };
    };
	return true;
};

var canSupportWithEdge = function(x,y) {
	if(outOfBounds(x,y)) { //count edges
		return true;
	} else {
		if(!isEmpty(x,y,true)) { //if there is a pixel
			if(elements[pixelMap[x][y].element].state === "solid") {
				return true;
			} else {
				return false;
			};
		};
	};
};

/*var csweCharacter = function(x,y) { //Debug function
	if(canSupportWithEdge(x,y)) {
		return "X";
	} else {
		return ".";
	};
};*/

xor = function(c1,c2) { //Unused
	if(!!c1 && !c2) {
		return true;
	} else if(!c1 && !!c2) {
		return true;
	} else {
		return false;
	};
};

var powderMovementSnippet = function(pixel) { //Unused
	if (!tryMove(pixel, pixel.x, pixel.y+1)) {
		if (Math.random() < 0.5) {
			if (!tryMove(pixel, pixel.x+1, pixel.y+1)) {
				tryMove(pixel, pixel.x-1, pixel.y+1);
			};
		} else {
			if (!tryMove(pixel, pixel.x-1, pixel.y+1)) {
				tryMove(pixel, pixel.x+1, pixel.y+1);
			};
		};
	};
};

var sturdyMovementSnippet = function(pixel) { //readability wrapper
	tryMove(pixel, pixel.x, pixel.y+1);
};

function includesArray(parentArray, testArray) { //from portals.js
    for (let i = 0; i < parentArray.length; i++) {
        if (parentArray[i].every(function(value, index) { return value === testArray[index]})) {
            return true;
        };
    };
    return false;
};

ddAnchorArray = [];

distanceScale = 1;

elements.hsl_tool_test = { //with help from ryan
    color: ["#cf3030","cf7f30","#cfcf30"],
    tool: function(pixel) {
		pixel.color = "hsl("+(pixelTicks%360)+",50%,50%)"
	},
    customColor: true,
    category: "color tools", //the toolbar is getting cluttered
    excludeRandom: true, //the toolbar is getting cluttered
};

elements.temporal_wall_test = {
	color: ["#8f8f8f","3f3f3f"],
	behavior: behaviors.WALL,
	properties: {
		counter: 1,
		active: true,
	},
	tick: function(pixel) {
		for(i = 0; i < 1; i++) { //dummy for
			if(!pixel) {
				break;
			};
			if(pixel.active) {
				if(pixel.counter == width) {
					pixel.active = false;
				};
				if(!isEmpty(pixel.counter,pixel.y) || outOfBounds(pixel.counter,pixel.y)) {
					pixel.counter++;
				} else {
					createPixel("wall",pixel.counter,pixel.y);
					pixel.counter++;
				};
			};
		};
	},
	state: "solid",
	density: 1000,
	category: "special",
};

elements.steel_silk = {
	color: ["#DCDEDF", "#C7C9CA", "#B9BBBC"],
	tick: function(pixel) {
		var px = pixel.x;
		var py = pixel.y;

		var supportCondition1 = (canSupportWithEdge(px-1,py-1) && canSupportWithEdge(px+1,py-1))	// V shape
		var supportCondition2 = (canSupportWithEdge(px-1,py) && canSupportWithEdge(px+1,py)) 		// - shape
		var supportCondition3 = (canSupportWithEdge(px-1,py+1) && canSupportWithEdge(px+1,py+1))	// Λ shape
		var supportCondition4 = (canSupportWithEdge(px-1,py+1) && canSupportWithEdge(px+1,py-1))	// / shape
		var supportCondition5 = (canSupportWithEdge(px-1,py-1) && canSupportWithEdge(px+1,py+1))	// \ shape
		var supportCondition6 = (canSupportWithEdge(px-1,py-1) && canSupportWithEdge(px+1,py))		// '- shape
		var supportCondition7 = (canSupportWithEdge(px-1,py+1) && canSupportWithEdge(px+1,py))		// ,- shape
		var supportCondition8 = (canSupportWithEdge(px+1,py-1) && canSupportWithEdge(px-1,py))		// -' shape
		var supportCondition9 = (canSupportWithEdge(px+1,py+1) && canSupportWithEdge(px-1,py))		// -, shape
		//var supportCondition6 = xor(canSupportWithEdge(px-1,py-1),canSupportWithEdge(px+1,py+1))	// one-side support
		var supports = (supportCondition1 || supportCondition2 || supportCondition3 || supportCondition4 || supportCondition5 || supportCondition6 || supportCondition7 || supportCondition8 || supportCondition9);
		/*if(pixelTicks % 10 == 0) {
			console.log(`Pixel at (${px},${py})`);
			console.log(`> ${csweCharacter(px-1,py-1)} ${csweCharacter(px+1,py-1)}\n> ${csweCharacter(px-1,py*1)} ${csweCharacter(px+1,py*1)}\n> ${csweCharacter(px-1,py+1)} ${csweCharacter(px+1,py+1)}`);
		};*/

		if (pixel.start === pixelTicks) {return}
		if (pixel.charge && elements[pixel.element].behaviorOn) {
			pixelTick(pixel)
		};

		if(!supports) {
			powderMovementSnippet(pixel);
		};
	},
	tempHigh: 1455.5,
	stateHigh: ["molten_steel", "molten_steel", "molten_steel", "molten_steel", "molten_steel", "molten_steel", "molten_steel", "molten_steel", "molten_steel", null],
	category: "solids",
	conduct: 0.48,
	hardness: 0.79,
	movable: true,
	category: "solids",
	state: "solid",
	density: 6850,
	breakInto: "metal_scrap",
};

function includesArray(parentArray, testArray) {
    for (let i = 0; i < parentArray.length; i++) {
        if (parentArray[i].every(function(value, index) { return value === testArray[index]})) {
            return true;
        }
    }
    return false;
}

elements.distance_display = {
	color: "#00FFFF",
	properties: {
		distanceGetter: null,
	},
	tick: function(pixel) {
		var distance = Infinity;
		var oldDistance = Infinity;
		
		//if(!ddAnchorArray) { ddAnchorArray = [] }
		/*if(!Array.isArray(ddAnchorArray)) { ddAnchorArray = [] }
		for (var i = 1; i < width; i++) { //Find and store all anchor pixels
			for (var j = 1; j < height; j++) {
			};
		};*/
		
		var px = pixel.x;
		var py = pixel.y;
		
		if(ddAnchorArray.length > 0) {
			for(i = 0; i < ddAnchorArray.length; i++) {
				var newX = ddAnchorArray[i][0];
				var newY = ddAnchorArray[i][1];
				if(isEmpty(newX,newY)) {
					ddAnchorArray.splice(i,1);
				} else {
					var checkPixel = pixelMap[newX][newY];
					if(checkPixel.element !== "distance_display_anchor") {
						ddAnchorArray.splice(i,1);
					} else {
						distanceCandidate = pyth(px,py,newX,newY);
						if(distanceCandidate < distance) {
							distance = pyth(px,py,newX,newY);
						};
					};
				};
			};
		} else {
			distance = null;
		};
		
		pixel.distanceGetter = distance;
		
		if(distance !== null) {
			var processedDistance = Math.min(255,Math.max(0,Math.round(distance * distanceScale)));
			pixel.color = `rgb(0,${processedDistance},255)`;
		} else {
			pixel.color = `rgb(0,255,255)`;
		};
	},
	category: "machines",
	state: "solid",
};

elements.distance_display_anchor = {
	color: "#0000FF",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		var px = pixel.x;
		var py = pixel.y;
		if(!includesArray(ddAnchorArray,[px,py])) {
			ddAnchorArray.push([px,py]);
		};
	},
	category: "machines",
	state: "solid",
};
