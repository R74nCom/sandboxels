elements.troll1 = {
	color: "#eeeeee",
	tick: function(pixel) {
		for (var i = 1; i < width; i++) {
			for (var j = 1; j < height; j++) {
				if (!isEmpty(i,j)) {
					if(Math.random() < 0.003 && pixelMap[i][j].element != pixel.element) { deletePixel(i,j) }
				}
			}
		if(i == width) {
			i = 1
		}
		}
	},
	category: "machines",
	insulate: true,
	state: "solid",
	excludeRandom: true,
},

elements.troll2 = {
	color: "#eeeeee",
	tick: function(pixel) {
		for (var i = 1; i < width; i++) {
			for (var j = 1; j < height; j++) {
				if (!isEmpty(i,j)) {
					if(Math.random() < 0.005) { pixelMap[i][j].color = "rgb(0,0,0)" }
				}
			}
		if(i == width) {
			i = 1
		}
		}
	},
	category: "machines",
	insulate: true,
	state: "solid",
	excludeRandom: true,
},

elements.troll3 = {
	color: "#eeeeee",
	tick: function(pixel) {
		for (var i = 1; i < width; i++) {
			for (var j = 1; j < height; j++) {
				if (!isEmpty(i,j)) {
					if(Math.random() < 0.05) { swapPixels(pixel,pixelMap[i][j]) }
				}
			}
		if(i == width) {
			i = 1
		}
		}
	},
	category: "machines",
	insulate: true,
	state: "solid",
	excludeRandom: true,
}
