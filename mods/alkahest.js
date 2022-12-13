alkahestBlacklist = ["alkahest","alkahest_fairy","wall","alkahest_spout"]

elements.alkahest = {
	color: "#33eeee",
	behavior: behaviors.LIQUID_OLD,
	state: "liquid",
	category: "liquids",
	density: 3308,
	hardness: 1,
	tick: function(pixel) {
		for(i = 0; i < adjacentCoords.length; i++) {
			if(Math.random() < 0.1) {
				var pX = pixel.x
				var pY = pixel.y
				var oX = adjacentCoords[i][0];
				var oY = adjacentCoords[i][1];
				var checkPosX = pX+oX;
				var checkPosY = pY+oY;
				if(!isEmpty(checkPosX,checkPosY,true)) {
					var newPixel = pixelMap[checkPosX][checkPosY];
					var newElement = newPixel.element;
					if(!alkahestBlacklist.includes(newElement)) { //unless someone's willing to implement dragon parts
						if(typeof(pixel[newElement]) === "undefined") {
							pixel[newElement] = 0;
						};
						pixel[newElement]++;
						deletePixel(checkPosX,checkPosY);
					};
				};
			};
		};
	},
};
