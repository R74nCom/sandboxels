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