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

elements.superheater4 = {
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
	insulate:true,
	state: "solid",
},

elements.supercooler4 = {
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
	insulate:true,
	state: "solid",
},

elements.superwarmer4 = {
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
	insulate:true,
	state: "solid",
},

elements.tc = { //temperature checker
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
	insulate:true,
	state: "solid",
},

elements.discharge = {
	color: "#7f7f7f",
	tick: function(pixel) {
		for (var i = 1; i < width; i++) {
			for (var j = 1; j < height; j++) {
				if (!isEmpty(i,j)) {
					pixelMap[i][j].charge = 0
				}
			}
		}
		deletePixel(pixel.x, pixel.y)
	},
	category:"special",
	insulate:true,
	state: "solid",
	behavior: behaviors.SELFDELETE,
},

elements.troll_powder = {
	color: ["#ffffff","#000000"],
	tick: function(pixel) {
		ddd = Math.random()
		eee = Math.random()
		fff = 1-eee
		doHeat(pixel);
		doBurning(pixel);
		if(ddd < 0.9) {
			if(!tryMove(pixel, pixel.x, pixel.y+1)) {
				if(eee < 1/2) { tryMove(pixel, pixel.x-1, pixel.y+1) } else tryMove(pixel, pixel.x+1, pixel.y+1)
			}
			if(Math.random() < 0.0017) {
				if(fff < 1/5) { tryMove(pixel, pixel.x-2, pixel.y-1) }
				if(fff < 2/5) { tryMove(pixel, pixel.x-1, pixel.y-2) }
				if(fff < 3/5) { tryMove(pixel, pixel.x, pixel.y-3) }
				if(fff < 4/5) { tryMove(pixel, pixel.x+1, pixel.y-2) }
				if(fff < 5/5) { tryMove(pixel, pixel.x+2, pixel.y-1) }
			}
			if(Math.random() < 0.0003) { tryMove(pixel, pixel.y, pixel.y); }
			if(Math.random() < 0.0003) { tryMove(pixel, pixel.x, pixel.x); }		
			if(((Math.floor(pixel.x/2) % 2 == 0) && (Math.floor(pixel.y/2) % 2 == 0)) || ((Math.floor(pixel.x/2) % 2 == 1) && (Math.floor(pixel.y/2) % 2 == 1))) {
				pixel.color = "rgb(32,32,32)"
			} else {
				pixel.color = "rgb(224,224,224)"
			}
		}

		if(ddd >= 0.9) {
			if(!tryMove(pixel, pixel.x, pixel.y-1)) {
				if(eee < 1/2) { tryMove(pixel, pixel.x-1, pixel.y-1) } else tryMove(pixel, pixel.x+1, pixel.y-1)
			}
			if(Math.random() < 0.0017) {
				if(fff < 1/5) { tryMove(pixel, pixel.x-2, pixel.y+1) }
				if(fff < 2/5) { tryMove(pixel, pixel.x-1, pixel.y+2) }
				if(fff < 3/5) { tryMove(pixel, pixel.x, pixel.y+3) }
				if(fff < 4/5) { tryMove(pixel, pixel.x+1, pixel.y+2) }
				if(fff < 5/5) { tryMove(pixel, pixel.x+2, pixel.y+1) }
			}
			if(Math.random() < 0.0003) { tryMove(pixel, pixel.y, pixel.y); }
			if(Math.random() < 0.0003) { tryMove(pixel, pixel.x, pixel.x); }		
			if(((Math.floor(pixel.x/2) % 2 == 0) && (Math.floor(pixel.y/2) % 2 == 0)) || ((Math.floor(pixel.x/2) % 2 == 1) && (Math.floor(pixel.y/2) % 2 == 1))) {
				pixel.color = "rgb(32,32,32)"
			} else {
				pixel.color = "rgb(224,224,224)"
			}
			pixel.temp = pixel.temp + ((Math.floor(Math.random()*3) - 1)*2)
		}
	},
	category: "powders",
	state: "solid",
	density: 1602,
}

elements.void_first = {
	color: "#262626",
	tick: function(pixel) {
		//store 4 touching pixels in variables if the variables don't exist
		if(!outOfBounds(pixel.x,pixel.y-1) && !isEmpty(pixel.x,pixel.y-1)) {
			if(!pixel.dc1 && pixelMap[pixel.x][pixel.y-1].element != pixel.element) {
				pixel.dc1 = pixelMap[pixel.x][pixel.y-1].element
			}
		}
		if(!outOfBounds(pixel.x+1,pixel.y) && !isEmpty(pixel.x+1,pixel.y)) {
			if(!pixel.dc2 && pixelMap[pixel.x+1][pixel.y].element != pixel.element) {
				pixel.dc2 = pixelMap[pixel.x+1][pixel.y].element
			}
		}
		if(!outOfBounds(pixel.x,pixel.y+1) && !isEmpty(pixel.x,pixel.y+1)) {
			if(!pixel.dc3 && pixelMap[pixel.x][pixel.y+1].element != pixel.element) {
				pixel.dc3 = pixelMap[pixel.x][pixel.y+1].element
			}
		}
		if(!outOfBounds(pixel.x-1,pixel.y) && !isEmpty(pixel.x-1,pixel.y)) {
			if(!pixel.dc3 && pixelMap[pixel.x-1][pixel.y].element != pixel.element) {
				pixel.dc4 = pixelMap[pixel.x-1][pixel.y].element
			}
		}
		//choose from 1
		if(pixel.dc1 && !pixel.dc2 && !pixel.dc3 && !pixel.dc4) {
			if(!pixel.delete) {
				pixel.delete = pixel.dc1
			}
		}
		if(!pixel.dc1 && pixel.dc2 && !pixel.dc3 && !pixel.dc4) {
			if(!pixel.delete) {
				pixel.delete = pixel.dc2
			}
		}
		if(!pixel.dc1 && !pixel.dc2 && pixel.dc3 && !pixel.dc4) {
			if(!pixel.delete) {
				pixel.delete = pixel.dc3
			}
		}
		if(!pixel.dc1 && !pixel.dc2 && !pixel.dc3 && pixel.dc4) {
			if(!pixel.delete) {
				pixel.delete = pixel.dc4
			}
		}
		ggg = Math.random()
		hhh = Math.random()
		iii = Math.random()
		//choose from 2
		//1100 and 0011
		if(pixel.dc1 && pixel.dc2 && !pixel.dc3 && !pixel.dc4) {
			if(!pixel.delete) {
				if(ggg < 1/2) {
					pixel.delete = pixel.dc1
				} else {
					pixel.delete = pixel.dc2
				}
			}
		}
		if(!pixel.dc1 && !pixel.dc2 && pixel.dc3 && pixel.dc4) {
			if(!pixel.delete) {
				if(ggg < 1/2) {
					pixel.delete = pixel.dc3
				} else {
					pixel.delete = pixel.dc4
				}
			}
		}
		//1010 and 0101
		if(pixel.dc1 && !pixel.dc2 && pixel.dc3 && !pixel.dc4) {
			if(!pixel.delete) {
				if(ggg < 1/2) {
					pixel.delete = pixel.dc1
				} else {
					pixel.delete = pixel.dc3
				}
			}
		}
		if(!pixel.dc1 && pixel.dc2 && !pixel.dc3 && pixel.dc4) {
			if(!pixel.delete) {
				if(ggg < 1/2) {
					pixel.delete = pixel.dc2
				} else {
					pixel.delete = pixel.dc4
				}
			}
		}
		//0110 and 1001
		if(!pixel.dc1 && pixel.dc2 && pixel.dc3 && !pixel.dc4) {
			if(!pixel.delete) {
				if(ggg < 1/2) {
					pixel.delete = pixel.dc2
				} else {
					pixel.delete = pixel.dc3
				}
			}
		}
		if(pixel.dc1 && !pixel.dc2 && !pixel.dc3 && pixel.dc4) {
			if(!pixel.delete) {
				if(ggg < 1/2) {
					pixel.delete = pixel.dc1
				} else {
					pixel.delete = pixel.dc4
				}
			}
		}
		//choose from 3
		//0111
		if(!pixel.dc1 && pixel.dc2 && pixel.dc3 && pixel.dc4) {
			if(!pixel.delete) {
				if(hhh < 1/3) {
					pixel.delete = pixel.dc2
				} else if(hhh < 2/3) {
					pixel.delete = pixel.dc3
				} else {
					pixel.delete = pixel.dc4
				}
			}
		}
		//1011
		if(pixel.dc1 && !pixel.dc2 && pixel.dc3 && pixel.dc4) {
			if(!pixel.delete) {
				if(hhh < 1/3) {
					pixel.delete = pixel.dc1
				} else if(hhh < 2/3) {
					pixel.delete = pixel.dc3
				} else {
					pixel.delete = pixel.dc4
				}
			}
		}
		//1101
		if(pixel.dc1 && pixel.dc2 && !pixel.dc3 && pixel.dc4) {
			if(!pixel.delete) {
				if(hhh < 1/3) {
					pixel.delete = pixel.dc1
				} else if(hhh < 2/3) {
					pixel.delete = pixel.dc2
				} else {
					pixel.delete = pixel.dc4
				}
			}
		}
		//1110
		if(pixel.dc1 && pixel.dc2 && pixel.dc3 && !pixel.dc4) {
			if(!pixel.delete) {
				if(hhh < 1/3) {
					pixel.delete = pixel.dc1
				} else if(hhh < 2/3) {
					pixel.delete = pixel.dc2
				} else {
					pixel.delete = pixel.dc3
				}
			}
		}
		//choose from 4
		//1111
		if(pixel.dc1 && pixel.dc2 && pixel.dc3 && pixel.dc4) {
			if(!pixel.delete) {
				if(iii < 1/4) {
					pixel.delete = pixel.dc1
				} else if(iii < 2/4) {
					pixel.delete = pixel.dc2
				} else if(iii < 3/4) {
					pixel.delete = pixel.dc3
				} else {
					pixel.delete = pixel.dc4
				}
			}
		}
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					if(pixel.delete) {
						if(pixelMap[pixel.x+j][pixel.y+i].element == pixel.delete) {
							deletePixel(pixel.x+j,pixel.y+i)
						}
					}
				}
			}
		}
	},
	category:"special",
	hardness: 1,
}
