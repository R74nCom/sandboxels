elements.lookup.tick = function(pixel) {
	//console.log(`### Tick ${pixelTicks} ###`);
	//console.log(`Storing coordinates`);
	var pX = pixel.x;
	var pY = pixel.y;
	//console.log(`Position (${pX},${pY})`);
	//console.log(`Iterating`);
	var neighborArray = [];
	for(i = 0; i < adjacentCoords.length; i++) {
		//console.log(`i: ${i}`);
		//console.log(`Initialized array`);
		var coord = adjacentCoords[i];
		//console.log(`Offset pair: ${coord}`);
		var oX = coord[0];
		var oY = coord[1];
		//console.log(`Stored offset pair`);
		var nX = pX+oX;
		var nY = pY+oY;
		//console.log(`Final coordinates: (${nX},${nY}) (index ${i})`);
		if(isEmpty(nX,nY,true)) {
			//console.log(`Skipping empty pixel (${nX},${nY})`);
			continue;
		} else {
			//console.log(`Found pixel at (${nX},${nY})`);
			var newPixel = pixelMap[nX][nY];
			//console.log(`Pixel stored`);
			var newElement = newPixel.element;
			//console.log(`Element is ${newElement}, running exclusion check;`);
			if(newElement !== pixel.element) { //exclude self
				//console.log(`Element is different, storing in array;`);
				neighborArray.push(newElement); //build array of valid neighbors
			};
			//console.log("Finding iteration done");
		};
		//console.log("End of for block (not loop)");
	};
	//console.log(`Loop done: ${neighborArray}`);
	if(neighborArray.length > 0) {
		var changeToElement = neighborArray[Math.floor(Math.random() * neighborArray.length)];
		changePixel(pixel,changeToElement);
	};
};

/*elements.pointer.behavior = [
	"XX|XX|XX","XX|CH:paint|XX","XX|XX|XX"
];*/