elements.bacteria = {
	color: ["#e6d3f2", "#c098d9", "#6e318f", "#6e318f"],
	behavior: behaviors.WALL,
	tick: function(pixel) {
		neighbors = [[-1,0],[0,-1],[1,0],[0,1]]
		if(pixel.charge) { //when shocked
			if(!outOfBounds(pixel.x,pixel.y+1) && !isEmpty(pixel.x,pixel.y+1)) { //check if a pixel exists below to store the element of
				if(!pixel.active && !pixel.target && pixelMap[pixel.x][pixel.y+1].element != pixel.element) { //exclude self and only fire once
					pixel.target = pixelMap[pixel.x][pixel.y+1].element 
					pixel.active = true
				} else if(pixel.active || pixel.target || pixelMap[pixel.x][pixel.y+1].element == pixel.element) {
					pixel.active = pixel.active
					pixel.target = pixel.target
				}
			}
		}
		if(pixel.active) { 
			if(pixel.target) { //safety
				for(i = 0; i < neighbors.length; i++) { //iterate through neighbor spots
					if(!isEmpty(pixel.x+neighbors[i][0],pixel.y+neighbors[i][1],true)) { //check for neighbors
						if(pixelMap[pixel.x+neighbors[i][0]][pixel.y+neighbors[i][1]].element == pixel.target) { //if neighbor element is the target
							changePixel(pixelMap[pixel.x+neighbors[i][0]][pixel.y+neighbors[i][1]],pixel.element) //change neighbors to itself
							pixelMap[pixel.x+neighbors[i][0]][pixel.y+neighbors[i][1]].target = pixel.target //set new bacteria target
							pixelMap[pixel.x+neighbors[i][0]][pixel.y+neighbors[i][1]].active = true //activate new bacteria
						}
					}
				}
			}
			if(Math.random() < 0.02) { //decay
				if(!isEmpty(pixel.x,pixel.y)) { //check if position is empty
					if(pixelMap[pixel.x][pixel.y].element == pixel.element) { //check if position is still bacteria
						deletePixel(pixel.x,pixel.y)
					}
				}
			}
		}
		/*if(pixel.active && pixel.target) { //debug
			pixel.color = "rgb(255,0,0)"
		}*/
	},
	category: "special",
	state: "solid",
	density: 1,
	conduct: elements.water.conduct + 0.1,
},

elements.replacer_bacteria = {
	color: ["#fcbbc0", "#f28089", "#f04f5c", "#f04f5c"],
	behavior: behaviors.WALL,
	tick: function(pixel) {
		neighbors = [[-1,0],[0,-1],[1,0],[0,1]]
		if(pixel.charge) { //when shocked
			if(!outOfBounds(pixel.x,pixel.y+1) && !isEmpty(pixel.x,pixel.y+1) && !outOfBounds(pixel.x,pixel.y-1) && !isEmpty(pixel.x,pixel.y-1)) { //check if pixels exists above and below to store the elements of
				if(!pixel.active && !pixel.target && !pixel.replacement && pixelMap[pixel.x][pixel.y+1].element != pixel.element) { //exclude self and only fire once
					pixel.target = pixelMap[pixel.x][pixel.y+1].element 
					pixel.replacement = pixelMap[pixel.x][pixel.y-1].element 
					pixel.active = true
				} else if(pixel.active || pixel.target || pixel.replacement || pixelMap[pixel.x][pixel.y+1].element == pixel.element) {
					pixel.active = pixel.active
					pixel.target = pixel.target
					pixel.replacement = pixel.replacement
				}
			}
		}
		if(pixel.active) {
			if(pixel.target && pixel.replacement) { //safety
				for(i = 0; i < neighbors.length; i++) { //iterate through neighbor spots
					if(!isEmpty(pixel.x+neighbors[i][0],pixel.y+neighbors[i][1],true)) { //check for neighbors
						if(pixelMap[pixel.x+neighbors[i][0]][pixel.y+neighbors[i][1]].element == pixel.target) { //if neighbor element is the target
							changePixel(pixelMap[pixel.x+neighbors[i][0]][pixel.y+neighbors[i][1]],pixel.element) //change neighbors to itself
							pixelMap[pixel.x+neighbors[i][0]][pixel.y+neighbors[i][1]].target = pixel.target //set new bacteria target
							pixelMap[pixel.x+neighbors[i][0]][pixel.y+neighbors[i][1]].replacement = pixel.replacement //set new bacteria replacement
							pixelMap[pixel.x+neighbors[i][0]][pixel.y+neighbors[i][1]].active = true //activate new bacteria
						}
					}
				}
				if(!isEmpty(pixel.x,pixel.y)) { //check if own position is empty
					if(pixelMap[pixel.x][pixel.y].element == pixel.element) { //check if own position is still bacteria
						changePixel(pixelMap[pixel.x][pixel.y],pixel.replacement)
					}
				}
			}
		}
		/*if(pixel.active && pixel.target && pixel.replacement) { //debug
			pixel.color = "rgb(0,255,0)"
		}*/
	},
	category: "special",
	state: "solid",
	density: 1,
	conduct: elements.water.conduct + 0.1,
},

elements.jammer_block = {
	color: "#c0cf7e",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		neighbors = [[-1,0],[0,-1],[1,0],[0,1]]
		if(pixel.charge) { //when shocked
            for (var i = 0; i < width; i++) {
                for (var j = 0; j < height; j++) {
					if(isEmpty(i,j,true) == false) {
						if(pixelMap[i][j].element == "bacteria") {
							if(isEmpty(i,j,true) == false) { deletePixel(i,j) }
						} else if(pixelMap[i][j].element == "replacer_bacteria") {
							if(pixelMap[i][j].replacement) {
								if(isEmpty(i,j,true) == false) { changePixel(pixelMap[i][j],pixelMap[i][j].replacement) }
							} else {
								if(isEmpty(i,j,true) == false) { deletePixel(i,j) }
							}
						}
					}
                }
            }
		}
	},
	category: "special",
	state: "solid",
	density: 1,
	conduct: elements.water.conduct + 0.1,
}