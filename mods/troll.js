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
},

elements.troll4 = {
	color: "#eeeeee",
	tick: function(pixel) {
		for (var i = 1; i < width; i++) {
			for (var j = 1; j < height; j++) {
				var eeaa = (Math.floor(Math.random()*5))-2
				if(Math.random() < 0.00007) { explodeAt(i,j,9+eeaa) }
				if(j == height) { j == 1 }
			}
			if(i == height) { i == 1 }
		}
	},
	category: "machines",
	insulate: true,
	hardness: 1.0,
	state: "solid",
	excludeRandom: true,
}
