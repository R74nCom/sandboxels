elements.superduperheater = {
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

elements.superdupercooler = {
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

elements.superduperwarmer = {
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

elements.supersuperduperheater = {
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

elements.supersuperdupercooler = {
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

elements.supersuperduperwarmer = {
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

elements.sencc = { //same element neighbor count check
	color: "#000000",
	uwu: 0,
	tick: function(pixel) {
		pixel.uwu = 0
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					if (pixelMap[pixel.x+j][pixel.y+i].element == pixel.element) {
						pixel.uwu += 1
					}
				}
			}
		}
		pixel.uwu -= 1
		if(pixel.uwu == undefined || pixel.uwu == null || isNaN(pixel.uwu)) {
			pixel.color = "rgb(127,127,127)"
		} else {
			pixel.color = "rgb(" + (255/8)*pixel.uwu + ",0,0)"
		}
	},
	category: "machines",
	insulate: true,
	state: "solid",
	hidden: true,
},

elements.sencc2 = { //same element neighbor count check
	color: "#000000",
	uwu: 0,
	tick: function(pixel) {
		pixel.uwu = 0
		for (let i = -2; i < 3; i++) {
			for (let j = -2; j < 3; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					if (pixelMap[pixel.x+j][pixel.y+i].element == pixel.element) {
						pixel.uwu += 1
					}
				}
			}
		}
		pixel.uwu -= 1
		if(pixel.uwu == undefined || pixel.uwu == null || isNaN(pixel.uwu)) {
			pixel.color = "rgb(127,127,127)"
		} else {
			pixel.color = "rgb(" + (255/24)*pixel.uwu + ",0,0)"
		}
	},
	category: "machines",
	insulate: true,
	state: "solid",
	hidden: true,
},

elements.sencc2b = { //same element neighbor count check
	color: "#000000",
	uwu: 0,
	owo: 0,
	tick: function(pixel) {
		pixel.uwu = 0
		pixel.owo = 0
		for (let i = -2; i < 3; i++) {
			for (let j = -2; j < 3; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					if (pixelMap[pixel.x+j][pixel.y+i].element == pixel.element) {
						if(pixel.uwu < 8) {
							pixel.uwu += 1
						} else {
							pixel.owo += 1
						}
					}
				}
			}
		}
		pixel.owo -= 1
		if(pixel.uwu == undefined || pixel.uwu == null || isNaN(pixel.uwu) || pixel.owo == undefined || pixel.owo == null || isNaN(pixel.owo)) {
			pixel.color = "rgb(127,127,127)"
		} else {
			pixel.color = "rgb(" + (255/8)*pixel.uwu + "," + (255/16)*pixel.owo + ",0)"
		}
	},
	category: "machines",
	insulate: true,
	state: "solid",
	hidden: true,
},

/*elements.superdupersuperduperheater = {
	color: "#ff7f00",
	uwu: 0,
	tick: function(pixel) {
		tempInc = 40
		pixel.uwu = 0
		range = 13
		for (let i = -9; i < 10; i++) {
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
			range += (((pixel.uwu+2)/20).toFixed(0))
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
	insulate:true,
	state: "solid",
},*/
	
	elements.tempinccheck = {
	color: "#000000",
	tick: function(pixel) {
		pixel.color = "rgb(" + pixel.temp % 256 + ",0,0)"
	},
	category:"machines",
	insulate:true,
	state: "solid",
	hidden: true,
	extraInfo: "Debug tool<br>Changes black to red with increasing heat",
},

