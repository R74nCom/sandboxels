currentShape = "square";
shapeOrder = ["square","circle","triangle","inverted triangle","rhombus","squircle","twinkle","slash","backslash"];
shapeExclusionConditions = {
	/*"square": function(x,y,size,mouseX,mouseY,topLeft,bottomRight) {
		return false
	},*/
	"triangle": function(x,y,size,mouseX,mouseY,topLeft,bottomRight) {
		var xOffset = (x - topLeft[0]);
		var yOffset = (y - topLeft[1]);
		var distanceFromCenterLine;
		if(size % 2 == 0) {
			distanceFromCenterLine = Math.abs((size / 2) - (xOffset + 0.5))
		} else {
			distanceFromCenterLine = Math.abs(mouseX - x);
		};
		var distanceProportion = distanceFromCenterLine / size;
		var hpovp = ((yOffset + (size % 2 == 0)) / size) / 2; //halvedPossiblyOffsetVerticalProportion
		return distanceProportion > (hpovp + 0.01);
	},
	"inverted triangle": function(x,y,size,mouseX,mouseY,topLeft,bottomRight) {
		var xOffset = (x - topLeft[0]);
		var yOffset = (y - topLeft[1]);
		var distanceFromCenterLine;
		if(size % 2 == 0) {
			distanceFromCenterLine = Math.abs((size / 2) - (xOffset + 0.5))
		} else {
			distanceFromCenterLine = Math.abs(mouseX - x);
		};
		var distanceProportion = distanceFromCenterLine / size;
		var hpovpc = (1 - ((yOffset + (size % 2 !== 0)) / size)) / 2; //halvedPossiblyOffsetVerticalProportionComplement
		return distanceProportion > (hpovpc + 0.01);
	},
	"rhombus": function(x,y,size,mouseX,mouseY,topLeft,bottomRight) {
		var xOffset = (x - topLeft[0]);
		var yOffset = (y - topLeft[1]);
		var xDistanceFromCenterLine;
		if(size % 2 == 0) { xDistanceFromCenterLine = Math.abs((size / 2) - (xOffset + 0.5)) } else { xDistanceFromCenterLine = Math.abs(mouseX - x) };
		var yDistanceFromCenterLine;
		if(size % 2 == 0) { yDistanceFromCenterLine = Math.abs((size / 2) - (yOffset + 0.5)) } else { yDistanceFromCenterLine = Math.abs(mouseY - y) };
		return (xDistanceFromCenterLine + yDistanceFromCenterLine) > (size / 2) //i was just messing around, i didn't expect this to actually be the right condition :sob:
	},
	"squircle": function(x,y,size,mouseX,mouseY,topLeft,bottomRight) {
		var xOffset = (x - topLeft[0]);
		var yOffset = (y - topLeft[1]);
		var xDistanceFromCenterLine;
		if(size % 2 == 0) { xDistanceFromCenterLine = Math.abs((size / 2) - (xOffset + 0.5)) } else { xDistanceFromCenterLine = Math.abs(mouseX - x) };
		var yDistanceFromCenterLine;
		if(size % 2 == 0) { yDistanceFromCenterLine = Math.abs((size / 2) - (yOffset + 0.5)) } else { yDistanceFromCenterLine = Math.abs(mouseY - y) };
		return ( (((xDistanceFromCenterLine ** 3) + (yDistanceFromCenterLine ** 3)) ** (1/3)) > (size / 2)) || ((size > 2) && (size <= 6) && ((xDistanceFromCenterLine + yDistanceFromCenterLine) == (size - 1)));
	},
	"twinkle": function(x,y,size,mouseX,mouseY,topLeft,bottomRight) {
		var xOffset = (x - topLeft[0]);
		var yOffset = (y - topLeft[1]);
		var xDistanceFromCenterLine;
		if(size % 2 == 0) { xDistanceFromCenterLine = Math.abs((size / 2) - (xOffset + 0.5)) } else { xDistanceFromCenterLine = Math.abs(mouseX - x) };
		var yDistanceFromCenterLine;
		if(size % 2 == 0) { yDistanceFromCenterLine = Math.abs((size / 2) - (yOffset + 0.5)) } else { yDistanceFromCenterLine = Math.abs(mouseY - y) };
		return ((((xDistanceFromCenterLine ** (1/2)) + (yDistanceFromCenterLine ** (1/2))) ** (2)) > ((size / (size % 2 ? 2 : 1.7)))) && (xDistanceFromCenterLine > 0.5) && (yDistanceFromCenterLine > 0.5)
	},
	"circle": function(x,y,size,mouseX,mouseY,topLeft,bottomRight) {
		var xOffset = (x - topLeft[0]);
		var yOffset = (y - topLeft[1]);
		var xDistanceFromCenterLine;
		if(size % 2 == 0) { xDistanceFromCenterLine = Math.abs((size / 2) - (xOffset + 0.5)) } else { xDistanceFromCenterLine = Math.abs(mouseX - x) };
		var yDistanceFromCenterLine;
		if(size % 2 == 0) { yDistanceFromCenterLine = Math.abs((size / 2) - (yOffset + 0.5)) } else { yDistanceFromCenterLine = Math.abs(mouseY - y) };
		if( (((xDistanceFromCenterLine ** 2) + (yDistanceFromCenterLine ** 2)) ** (1/2)) > (size / 2)) { return true }; //structured this way for legibility
		if( ((xDistanceFromCenterLine + yDistanceFromCenterLine) == 2) && (size == 3)) { return true };
		if( ((xDistanceFromCenterLine + yDistanceFromCenterLine) >= 3.5) && (size == 6)) { return true };
		if( ((xDistanceFromCenterLine + yDistanceFromCenterLine) >= 4.5) && (size == 8) && !(Math.abs(xDistanceFromCenterLine) === Math.abs(yDistanceFromCenterLine))) { return true };
		if( //i can't explain how these rules work, but they just do
			(size % 2 == 1) &&
			(size > 5) &&
			((xDistanceFromCenterLine + yDistanceFromCenterLine) >= (size - 3)) &&
			!(Math.abs(xDistanceFromCenterLine) === Math.abs(yDistanceFromCenterLine))
		) { return true };
		return false
	},
	"slash": function(x,y,size,mouseX,mouseY,topLeft,bottomRight) {
		var xOffset = (x - topLeft[0]);
		var yOffset = (y - topLeft[1]);
		var yOffsetComplement = (size - 1) - yOffset;
		if(xOffset == yOffsetComplement) { return false };
		if(xOffset == yOffsetComplement + 1) { return false };
		return true
	},
	"backslash": function(x,y,size,mouseX,mouseY,topLeft,bottomRight) {
		var xOffset = (x - topLeft[0]);
		var yOffset = (y - topLeft[1]);
		if(xOffset == yOffset) { return false };
		if(xOffset == yOffset + 1) { return false };
		return true
	}
}

function mouseRange(mouseX,mouseY,size,shapeOverride=null) {
	var shape = shapeOverride ?? currentShape ?? "square";
	var coords = [];
	size = size || mouseSize;
	if (elements[currentElement].maxSize < mouseSize) {
		var mouseOffset = Math.trunc(elements[currentElement].maxSize/2);
	}
	else {
		var mouseOffset = Math.trunc(size/2);
	}
	var topLeft = [mouseX-mouseOffset,mouseY-mouseOffset];
	var bottomRight = [mouseX+mouseOffset,mouseY+mouseOffset];
	if(size % 2 == 0) {
		bottomRight[0]--;
		bottomRight[1]--;
	};
	var exclusionFunction = shapeExclusionConditions[shape] ?? null;
	if((shape !== "square") && (exclusionFunction == null)) {
		logMessage(`Shape ${shape} not recognized!`)
		return []
	};

	// Starting at the top left, go through each pixel
	for (var x = topLeft[0]; x <= bottomRight[0]; x++) {
		for (var y = topLeft[1]; y <= bottomRight[1]; y++) {
			// If the pixel is empty, add it to coords
			if((shape !== "square") && exclusionFunction?.(x,y,size,mouseX,mouseY,topLeft,bottomRight)) {
				continue
			};
			coords.push([x,y]);
		}
	};
	return coords
};

document.addEventListener("keydown", function(e) {
	//shift+8 to change cursor shape, alt+8 to cycle backwards
	if (e.keyCode == 56 && [1,2].includes(shiftDown)) {
		var currentShapeIndex = shapeOrder.indexOf(currentShape);
		var newIndex;
		switch(shiftDown) {
			default:
			case 1:
				newIndex = (currentShapeIndex + 1) % shapeOrder.length;
				break
			case 2:
				newIndex = (currentShapeIndex - 1) % shapeOrder.length;
				if(newIndex < 0) { newIndex = shapeOrder.length - 1 };
				break
		};
		currentShape = shapeOrder[newIndex];
		logMessage(`Current shape: ${currentShape}`)
	}
})
