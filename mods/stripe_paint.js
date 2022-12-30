function averageColors(color1,color2,outputType="rgb",weight1=0.5) {
	color1 = convertColorFormats(color1,"json");
	color2 = convertColorFormats(color2,"json");
	theColor = averageColorObjects(color1,color2,weight1);
	return convertColorFormats(theColor,outputType);
};

function stripeFunction(pixel,sineParamFunction) {
	if(pixel.oldColor == undefined || pixel.oldColor == null) {
		pixel.oldColor = pixel.color;
	};

	//oldColor self staining
	for (var i = 0; i < adjacentCoords.length; i++) {
		var x = pixel.x+adjacentCoords[i][0];
		var y = pixel.y+adjacentCoords[i][1];
		if(isEmpty(x,y,true)) {
			continue;
		};
		var otherPixel = pixelMap[x][y];
		if(otherPixel.element == pixel.element && pixel.oldColor && otherPixel.oldColor) {
			otherPixel.oldColor = averageColors(pixel.oldColor,otherPixel.oldColor);
		};
	};
	
	var sineWeight = (1+Math.sin(sineParamFunction(pixel)))/2;
	var preColor = averageColors(pixel.oldColor,"rgb(0,0,0)","json",sineWeight);
	for(colorlet in preColor) {
		preColor[colorlet] = Math.round(preColor[colorlet]);
	};
	pixel.color = convertColorFormats(preColor,"rgb");
};

function horizontalSpf(pixel) {
	return pixel.y;
};

function verticalSpf(pixel) {
	return pixel.x;
};

function diagonalSpf(pixel) {
	return pixel.x+pixel.y;
};

function diagonalAltSpf(pixel) {
	return pixel.x-pixel.y;
};

elements.horizontal_stripe_paint = {
    behavior: behaviors.LIQUID,
	state: "liquid",
	density: 998,
	tempHigh: 100,
	stateHigh: "smoke",
    color: elements.paint.color,
	customColor: true,
	category: "stripe paint",
	properties: {
		oldColor: null
	},
	stain: elements.dye.stain,
    tick: function(pixel) {
		stripeFunction(pixel,horizontalSpf);
    },
};

elements.vertical_stripe_paint = {
    behavior: behaviors.LIQUID,
	state: "liquid",
	density: 998,
	tempHigh: 100,
	stateHigh: "smoke",
    color: elements.paint.color,
	customColor: true,
	category: "stripe paint",
	properties: {
		oldColor: null
	},
	stain: elements.dye.stain,
    tick: function(pixel) {
		stripeFunction(pixel,verticalSpf);
    },
};

elements.diagonal_stripe_paint = {
    behavior: behaviors.LIQUID,
	state: "liquid",
	density: 998,
	tempHigh: 100,
	stateHigh: "smoke",
    color: elements.paint.color,
	customColor: true,
	category: "stripe paint",
	properties: {
		oldColor: null
	},
	stain: elements.dye.stain,
    tick: function(pixel) {
		stripeFunction(pixel,diagonalSpf);
    },
};

elements.diagonal_2_stripe_paint = {
    behavior: behaviors.LIQUID,
	state: "liquid",
	density: 998,
	tempHigh: 100,
	stateHigh: "smoke",
    color: elements.paint.color,
	customColor: true,
	category: "stripe paint",
	properties: {
		oldColor: null
	},
	stain: elements.dye.stain,
    tick: function(pixel) {
		stripeFunction(pixel,diagonalAltSpf);
    },
};