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
},

elements.offset_fourth_y = {
    color: ["#000000", "#ff00ff", "#000000", "#ff00ff", "#000000", "#ff00ff", "#000000", "#ff00ff"],
    tool: function(pixel) {
        tryMove(pixel,pixel.x,pixel.y+0.25);
		pixelTempCheck(pixel)
    },
    category: "tools",
},

elements.offset_half_y = {
    color: ["#000000", "#ff00ff", "#000000", "#ff00ff", "#000000", "#ff00ff", "#000000", "#ff00ff"],
    tool: function(pixel) {
        tryMove(pixel,pixel.x,pixel.y+0.5);
		pixelTempCheck(pixel)
    },
    category: "tools",
},

elements.offset_three_fourth_y = {
    color: ["#000000", "#ff00ff", "#000000", "#ff00ff", "#000000", "#ff00ff", "#000000", "#ff00ff"],
    tool: function(pixel) {
        tryMove(pixel,pixel.x,pixel.y+0.75);
		pixelTempCheck(pixel)
    },
    category: "tools",
},

elements.troll5 = {
	color: "#eeeeee",
	tick: function() {
		for (var i = 1; i < width; i++) {
			for (var j = 1; j < height; j++) {
				if (!isEmpty(i,j)) {
					if(!pixelMap[i][j].r) {
						pixelMap[i][j].r = 0
					}
					pixelMap[i][j].r = (pixelMap[i][j].r + 1) % 4
				}
			}
		}
	},
	category: "machines",
	insulate: true,
	state: "solid",
	excludeRandom: true,
}

elements.troll6 = {
	color: "#eeeeee",
	tick: function() {
            if(pixel.temp < -273) {
                pixel.temp = -273;
            };
            if(isNaN(pixel.temp)) {
                pixel.temp = -1;
            };
            pixel.bemp = Math.floor(pixel.temp);
            if(pixel.bemp > 273) {
                pixel.bemp = 273;
            };
            if(pixel.temp >= 4000) {
                pixelTicks = -1;
                pixel.temp = 4000;
            } else {
                pixelTicks += pixel.bemp;
            };
	},
	category: "machines",
	insulate: true,
	state: "solid",
	excludeRandom: true,
        temp: -1,
},

elements.troll7 = {
	color: "#eeeeee",
	tick: function(pixel) {
		for (var i = 1; i < width; i++) {
			for (var j = 1; j < height; j++) {
				if (!isEmpty(i,j)) {
                                        piskel = pixelMap[i][j]
					if(Math.random() < 0.003 && piskel.element != pixel.element) { piskel.temp += (Math.floor(Math.random() * 500 + 1) - 250) }
				}
			}
		}
	},
	category: "machines",
	insulate: true,
	state: "solid",
	excludeRandom: true,
}
