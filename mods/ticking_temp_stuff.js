elements.super_heater = {
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
	insulate: true,
	state: "solid",
},

elements.super_cooler = {
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
	insulate: true,
	state: "solid",
},

elements.super_warmer = {
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
	insulate: true,
	state: "solid",
},

elements.super_heater_2 = {
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
	insulate: true,
	state: "solid",
	hidden: true,
},

elements.super_cooler_2 = {
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
	insulate: true,
	state: "solid",
	hidden: true,
},

elements.super_warmer_2 = {
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
	insulate: true,
	state: "solid",
	hidden: true,
},

elements.global_heater = {
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
	insulate: true,
	state: "solid",
	hidden: true,
},

elements.global_cooler = {
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
	insulate: true,
	state: "solid",
	hidden: true,
},

elements.global_warmer = {
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
	name: "Adjustable Global Warmer",
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
},

elements.super_heater_3 = {
	color: "#ff7f00",
	uwu: 0,
	tick: function(pixel) {
		tempInc = 50
		pixel.uwu = 0
		range = 10
		for (let i = -8; i < 9; i++) {
			for (let j = -8; j < 9; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					if (pixelMap[pixel.x+j][pixel.y+i].element == pixel.element) {
						pixel.uwu += 1
					}
				}
			}
		}
		pixel.uwu -= 1
		if(pixel.uwu == undefined || pixel.uwu == null || isNaN(pixel.uwu)) {
			pixel.uwu = 0
		} else {
			tempInc += (pixel.uwu*15)
			range += Math.floor((Math.sqrt(pixel.uwu+1))**1.2)
		}
		for (let i = (-1*range); i < (range + 1); i++) {
			for (let j = (-1*range); j < (range + 1); j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					pixelMap[pixel.x+j][pixel.y+i].temp += tempInc
				}
			}
		}
	},
	category:"machines",
	insulate: true,
	state: "solid",
},

elements.super_cooler_3 = {
	color: "#007fff",
	uwu: 0,
	tick: function(pixel) {
		tempDec = 50
		pixel.uwu = 0
		range = 10
		for (let i = -8; i < 9; i++) {
			for (let j = -8; j < 9; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					if (pixelMap[pixel.x+j][pixel.y+i].element == pixel.element) {
						pixel.uwu += 1
					}
				}
			}
		}
		pixel.uwu -= 1
		if(pixel.uwu == undefined || pixel.uwu == null || isNaN(pixel.uwu)) {
			pixel.uwu = 0
		} else {
			tempDec += (pixel.uwu*15)
			range += Math.floor((Math.sqrt(pixel.uwu+1))**1.2)
		}
		for (let i = (-1*range); i < (range + 1); i++) {
			for (let j = (-1*range); j < (range + 1); j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					(pixelMap[pixel.x+j][pixel.y+i].temp < (-273 + tempDec)) ? pixelMap[pixel.x+j][pixel.y+i].temp = -273 : pixelMap[pixel.x+j][pixel.y+i].temp -= tempDec
				}
			}
		}
	},
	category:"machines",
	insulate: true,
	state: "solid",
},

elements.super_warmer_3 = {
	color: "#7fff7f",
	uwu: 0,
	tick: function(pixel) {
		pixel.uwu = 0
		range = 10
		for (let i = -8; i < 9; i++) {
			for (let j = -8; j < 9; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					if (pixelMap[pixel.x+j][pixel.y+i].element == pixel.element) {
						pixel.uwu += 1
					}
				}
			}
		}
		pixel.uwu -= 1
		if(pixel.uwu == undefined || pixel.uwu == null || isNaN(pixel.uwu)) {
			pixel.uwu = 0
		} else {
			range += Math.floor((Math.sqrt(pixel.uwu+1))**1.2)
		}
		for (let i = (-1*range); i < (range + 1); i++) {
			for (let j = (-1*range); j < (range + 1); j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					pixelMap[pixel.x+j][pixel.y+i].temp = 20
				}
			}
		}
	},
	category:"machines",
	insulate: true,
	state: "solid",
},

elements.tc = { //temperature checker
	name: "Temperature Checker",
	color: ["#000000","#000000"],
	tick: function(pixel) {
		if(pixel.temp < -255) {
			pixel.color = "rgb(0,0,255)"
		} else if(pixel.temp >= -255 && pixel.temp < 0) {
			pixel.color = "rgb(0,0," + Math.abs(pixel.temp) + ")"
		} else if(pixel.temp <= 255) {
			pixel.color = "rgb(" + pixel.temp % 256 + ",0,0)"
		} else if(pixel.temp <= 65535) {
			pixel.color = "rgb(255," + Math.floor(pixel.temp / 256) + ",0)"
		} else if(pixel.temp <= 16777215) {
			pixel.color = "rgb(255,255," + Math.floor(pixel.temp / 65536) + ")"
		} else {
			pixel.color = "rgb(255,255,255)"
		}
	},
	category:"machines",
	insulate: true,
	state: "solid",
}
