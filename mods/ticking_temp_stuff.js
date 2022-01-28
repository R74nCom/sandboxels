elements.superheater2 = {
	color: "#ff0000",
	tick: function(pixel) {
		for (let i = -4; i < 5; i++) {
			for (let j = -4; j < 5; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					pixelMap[pixel.x+j][pixel.y+i].temp += 15
				}
			}
		}
	},
	category:"machines",
	insulate:true,
	state: "solid",
},

elements.supercooler2 = {
	color: "#0000ff",
	tick: function(pixel) {
		for (let i = -4; i < 5; i++) {
			for (let j = -4; j < 5; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					pixelMap[pixel.x+j][pixel.y+i].temp < -258 ? pixelMap[pixel.x+j][pixel.y+i].temp = -273 : pixelMap[pixel.x+j][pixel.y+i].temp -= 15
				}
			}
		}
	},
	category:"machines",
	insulate:true,
	state: "solid",
},

elements.superwarmer2 = {
	color: "#00ff00",
	tick: function(pixel) {
		for (let i = -4; i < 5; i++) {
			for (let j = -4; j < 5; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					pixelMap[pixel.x+j][pixel.y+i].temp = 20
				}
			}
		}
	},
	category:"machines",
	insulate:true,
	state: "solid",
},

elements.superheater3 = {
	color: "#ff2200",
	tick: function(pixel) {
		for (let i = -9; i < 10; i++) {
			for (let j = -9; j < 10; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					pixelMap[pixel.x+j][pixel.y+i].temp += 25
				}
			}
		}
	},
	category:"machines",
	insulate:true,
	state: "solid",
},

elements.supercooler3 = {
	color: "#0022ff",
	tick: function(pixel) {
		for (let i = -9; i < 10; i++) {
			for (let j = -9; j < 10; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					pixelMap[pixel.x+j][pixel.y+i].temp < -248 ? pixelMap[pixel.x+j][pixel.y+i].temp = -273 : pixelMap[pixel.x+j][pixel.y+i].temp -= 25
				}
			}
		}
	},
	category:"machines",
	insulate:true,
	state: "solid",
},

elements.superwarmer3 = {
	color: "#22ff22",
	tick: function(pixel) {
		for (let i = -9; i < 10; i++) {
			for (let j = -9; j < 10; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					pixelMap[pixel.x+j][pixel.y+i].temp = 20
				}
			}
		}
	},
	category:"machines",
	insulate:true,
	state: "solid",
},

elements.globalheater = {
	color: "#ff6666",
	tick: function(pixel) {
		for (var i = 1; i < width; i++) {
			for (var j = 1; j < height; j++) {
				if (!isEmpty(i,j)) {
					pixelMap[i][j].temp += 1
				}
			}
		}
	},
	category:"machines",
	insulate:true,
	state: "solid",
	hidden: true,
},

elements.globalcooler = {
	color: "#6666ff",
	tick: function(pixel) {
		for (var i = 1; i < width; i++) {
			for (var j = 1; j < height; j++) {
				if (!isEmpty(i,j)) {
					pixelMap[i][j].temp <= -272 ? pixelMap[i][j].temp = -273 : pixelMap[i][j].temp -= 1
				}
			}
		}
	},
	category:"machines",
	insulate:true,
	state: "solid",
	hidden: true,
},

elements.globalwarmer = {
	color: "#66ff66",
	tick: function(pixel) {
		for (var i = 1; i < width; i++) {
			for (var j = 1; j < height; j++) {
				if (!isEmpty(i,j)) {
					pixelMap[i][j].temp = 20
				}
			}
		}
	},
	category: "machines",
	insulate: true,
	state: "solid",
	hidden: true,
},

elements.agw = { //adjustable global warmer
	color: "#66ff66",
	tick: function(pixel) {
		for (var i = 1; i < width; i++) {
			for (var j = 1; j < height; j++) {
				if (!isEmpty(i,j)) {
					pixelMap[i][j].temp = pixel.temp
					doHeat(pixelMap[i][j])
				}
			}
		}
	},
	category: "machines",
	insulate: true,
	state: "solid",
	hidden: true,
}