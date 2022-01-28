function includesArray(parentArray, testArray) {
    for (let i = 0; i < parentArray.length; i++) {
        if (parentArray[i].every(function(value, index) { return value === testArray[index]})) {
            return true;
        }
    }
    return false;
}

elements.portal_in = {
	color: "#ee7f00",
	tick: function(pixel) {
		if(!pixel.portalArray) { pixel.portalArray = [] }
		if(!Array.isArray(pixel.portalArray)) { pixel.portalArray = [] }
		for (var i = 1; i < width; i++) {
			for (var j = 1; j < height; j++) {
				if (!isEmpty(i,j)) {
					if(pixelMap[i][j].element == "testff") {
						if(!includesArray(pixel.portalArray,[i,j])) {
							pixel.portalArray.push([i,j])
						}
					}
				}
				if (isEmpty(i,j)) {
					if(includesArray(pixel.portalArray,[i,j])) {
						pixel.portalArray = pixel.portalArray.filter(dat => !includesArray(pixel.portalArray,[i,j]))

					}
				}
			}
		}
		if(pixel.portalArray.length > 0) {
			randomDestination = pixel.portalArray[Math.floor((Math.random() * pixel.portalArray.length))]
			if(!isEmpty(pixel.x-1,pixel.y)) {
				tryMove(pixelMap[pixel.x-1][pixel.y],(randomDestination[0] - 1),(randomDestination[1]))
			}
			if(!isEmpty(pixel.x+1,pixel.y)) {
				tryMove(pixelMap[pixel.x+1][pixel.y],(randomDestination[0] + 1),(randomDestination[1]))
			}
			if(!isEmpty(pixel.x,pixel.y-1)) {
				tryMove(pixelMap[pixel.x][pixel.y-1],(randomDestination[0]),(randomDestination[1] - 1))
			}
			if(!isEmpty(pixel.x,pixel.y+1)) {
				tryMove(pixelMap[pixel.x][pixel.y+1],(randomDestination[0]),(randomDestination[1] + 1))
			}
		}
	},
	category: "machines",
	state: "solid",
	portalArray: [],
},

elements.portal_out = {
	color: "#2222ee",
	behavior: behaviors.WALL,
	category: "machines",
	state: "solid",
}