elements.replace_all = {
	color: "#ef7f3f",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		if(pixel.charge) { //when shocked
		//console.log("ouch")
			if(!outOfBounds(pixel.x,pixel.y+1) && !isEmpty(pixel.x,pixel.y+1) && !outOfBounds(pixel.x,pixel.y-1) && !isEmpty(pixel.x,pixel.y-1)) { //check if pixels exists above and below to store the elements of
				//console.log("elems stored")
				if(pixelMap[pixel.x][pixel.y-1].element != pixel.element) { //exclude self and only fire once
					//console.log("self excluded from replacement")
					pixel.target = pixelMap[pixel.x][pixel.y+1].element 
					//console.log("target set to " + pixel.target)
					pixel.replacement = pixelMap[pixel.x][pixel.y-1].element 
					//console.log("replacement set to " + pixel.replacement)
					pixel.active = true
					//console.log("replacer activated")
				}
			}
		}
		if(pixel.active) {
			//console.log("is this on now?")
			if(pixel.target && pixel.replacement) { //safety
				//console.log("target and replacement exist, iterating...")
				for (var i = 0; i < width; i++) {
					for (var j = 0; j < height; j++) {
						if(isEmpty(i,j,true) == false) {
							//console.log("pixel at (" + i + "," + j + ") exists")
							if(pixelMap[i][j].element == pixel.target) {
							//console.log(pixel.target + " detected, replacing")
								if(isEmpty(i,j,true) == false) { changePixel(pixelMap[i][j],pixel.replacement) }
							}
						}
					}
				}
			}
			pixel.active = false //de-activate
			if(pixel.charge) { delete pixel.charge}
			if(pixel.chargeCD) { delete pixel.chargeCD}
		}
	},
	category: "special",
	state: "solid",
	density: 1,
	conduct: elements.water.conduct + 0.1,
}