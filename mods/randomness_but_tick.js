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
		for (let i = -3; i < 4; i++) {
			for (let j = -3; j < 4; j++) {
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

elements.sencc3 = { //same element neighbor count check
	color: "#000000",
	uwu: 0,
	tick: function(pixel) {
		pixel.uwu = 0
		var squadius = 3
		for (let i = (-1*squadius); i < (squadius+1); i++) {
			for (let j = (-1*squadius); j < (squadius+1); j++) {
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
			pixel.color = "rgb(" + (255/((((squadius*2)+1)**2)-1))*pixel.uwu + ",0,0)"
		}
	},
	category: "machines",
	insulate: true,
	state: "solid",
	hidden: true,
},

elements.sencc4 = { //same element neighbor count check
	color: "#000000",
	uwu: 0,
	tick: function(pixel) {
		pixel.uwu = 0
		var squadius = 4
		for (let i = (-1*squadius); i < (squadius+1); i++) {
			for (let j = (-1*squadius); j < (squadius+1); j++) {
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
			pixel.color = "rgb(" + (255/((((squadius*2)+1)**2)-1))*pixel.uwu + ",0,0)"
		}
	},
	category: "machines",
	insulate: true,
	state: "solid",
	hidden: true,
},

elements.sencc5 = { //same element neighbor count check
	color: "#000000",
	uwu: 0,
	tick: function(pixel) {
		pixel.uwu = 0
		var squadius = 5
		for (let i = (-1*squadius); i < (squadius+1); i++) {
			for (let j = (-1*squadius); j < (squadius+1); j++) {
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
			pixel.color = "rgb(" + (255/((((squadius*2)+1)**2)-1))*pixel.uwu + ",0,0)"
		}
	},
	category: "machines",
	insulate: true,
	state: "solid",
	hidden: true,
},

elements.sencc6 = { //same element neighbor count check
	color: "#000000",
	uwu: 0,
	tick: function(pixel) {
		pixel.uwu = 0
		var squadius = 6
		for (let i = (-1*squadius); i < (squadius+1); i++) {
			for (let j = (-1*squadius); j < (squadius+1); j++) {
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
			pixel.color = "rgb(" + (255/((((squadius*2)+1)**2)-1))*pixel.uwu + ",0,0)"
		}
	},
	category: "machines",
	insulate: true,
	state: "solid",
	hidden: true,
},

elements.sencc7 = { //same element neighbor count check
	color: "#000000",
	uwu: 0,
	tick: function(pixel) {
		pixel.uwu = 0
		var squadius = 7
		for (let i = (-1*squadius); i < (squadius+1); i++) {
			for (let j = (-1*squadius); j < (squadius+1); j++) {
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
			pixel.color = "rgb(" + (255/((((squadius*2)+1)**2)-1))*pixel.uwu + ",0,0)"
		}
	},
	category: "machines",
	insulate: true,
	state: "solid",
	hidden: true,
},

elements.sencc8 = { //same element neighbor count check
	color: "#000000",
	uwu: 0,
	tick: function(pixel) {
		pixel.uwu = 0
		var squadius = 8
		for (let i = (-1*squadius); i < (squadius+1); i++) {
			for (let j = (-1*squadius); j < (squadius+1); j++) {
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
			pixel.color = "rgb(" + (255/((((squadius*2)+1)**2)-1))*pixel.uwu + ",0,0)"
		}
	},
	category: "machines",
	insulate: true,
	state: "solid",
	hidden: true,
},

elements.sencc9 = { //same element neighbor count check
	color: "#000000",
	uwu: 0,
	tick: function(pixel) {
		pixel.uwu = 0
		var squadius = 9
		for (let i = (-1*squadius); i < (squadius+1); i++) {
			for (let j = (-1*squadius); j < (squadius+1); j++) {
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
			pixel.color = "rgb(" + (255/((((squadius*2)+1)**2)-1))*pixel.uwu + ",0,0)"
		}
	},
	category: "machines",
	insulate: true,
	state: "solid",
	hidden: true,
},

elements.sencc10 = { //same element neighbor count check
	color: "#000000",
	uwu: 0,
	tick: function(pixel) {
		pixel.uwu = 0
		var squadius = 10
		for (let i = (-1*squadius); i < (squadius+1); i++) {
			for (let j = (-1*squadius); j < (squadius+1); j++) {
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
			pixel.color = "rgb(" + (255/((((squadius*2)+1)**2)-1))*pixel.uwu + ",0,0)"
		}
	},
	category: "machines",
	insulate: true,
	state: "solid",
	hidden: true,
},

elements.sencc11 = { //same element neighbor count check
	color: "#000000",
	uwu: 0,
	tick: function(pixel) {
		pixel.uwu = 0
		var squadius = 11
		for (let i = (-1*squadius); i < (squadius+1); i++) {
			for (let j = (-1*squadius); j < (squadius+1); j++) {
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
			pixel.color = "rgb(" + (255/((((squadius*2)+1)**2)-1))*pixel.uwu + ",0,0)"
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
},

elements.void_first = {
	color: "#262626",
	tick: function(pixel) {
		if(!pixel.void) {
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
				if(!pixel.void) {
					pixel.void = pixel.dc1
				}
			}
			if(!pixel.dc1 && pixel.dc2 && !pixel.dc3 && !pixel.dc4) {
				if(!pixel.void) {
					pixel.void = pixel.dc2
				}
			}
			if(!pixel.dc1 && !pixel.dc2 && pixel.dc3 && !pixel.dc4) {
				if(!pixel.void) {
					pixel.void = pixel.dc3
				}
			}
			if(!pixel.dc1 && !pixel.dc2 && !pixel.dc3 && pixel.dc4) {
				if(!pixel.void) {
					pixel.void = pixel.dc4
				}
			}
			ggg = Math.random()
			hhh = Math.random()
			iii = Math.random()
			//choose from 2
			//1100 and 0011
			if(pixel.dc1 && pixel.dc2 && !pixel.dc3 && !pixel.dc4) {
				if(!pixel.void) {
					if(ggg < 1/2) {
						pixel.void = pixel.dc1
					} else {
						pixel.void = pixel.dc2
					}
				}
			}
			if(!pixel.dc1 && !pixel.dc2 && pixel.dc3 && pixel.dc4) {
				if(!pixel.void) {
					if(ggg < 1/2) {
						pixel.void = pixel.dc3
					} else {
						pixel.void = pixel.dc4
					}
				}
			}
			//1010 and 0101
			if(pixel.dc1 && !pixel.dc2 && pixel.dc3 && !pixel.dc4) {
				if(!pixel.void) {
					if(ggg < 1/2) {
						pixel.void = pixel.dc1
					} else {
						pixel.void = pixel.dc3
					}
				}
			}
			if(!pixel.dc1 && pixel.dc2 && !pixel.dc3 && pixel.dc4) {
				if(!pixel.void) {
					if(ggg < 1/2) {
						pixel.void = pixel.dc2
					} else {
						pixel.void = pixel.dc4
					}
				}
			}
			//0110 and 1001
			if(!pixel.dc1 && pixel.dc2 && pixel.dc3 && !pixel.dc4) {
				if(!pixel.void) {
					if(ggg < 1/2) {
						pixel.void = pixel.dc2
					} else {
						pixel.void = pixel.dc3
					}
				}
			}
			if(pixel.dc1 && !pixel.dc2 && !pixel.dc3 && pixel.dc4) {
				if(!pixel.void) {
					if(ggg < 1/2) {
						pixel.void = pixel.dc1
					} else {
						pixel.void = pixel.dc4
					}
				}
			}
			//choose from 3
			//0111
			if(!pixel.dc1 && pixel.dc2 && pixel.dc3 && pixel.dc4) {
				if(!pixel.void) {
					if(hhh < 1/3) {
						pixel.void = pixel.dc2
					} else if(hhh < 2/3) {
						pixel.void = pixel.dc3
					} else {
						pixel.void = pixel.dc4
					}
				}
			}
			//1011
			if(pixel.dc1 && !pixel.dc2 && pixel.dc3 && pixel.dc4) {
				if(!pixel.void) {
					if(hhh < 1/3) {
						pixel.void = pixel.dc1
					} else if(hhh < 2/3) {
						pixel.void = pixel.dc3
					} else {
						pixel.void = pixel.dc4
					}
				}
			}
			//1101
			if(pixel.dc1 && pixel.dc2 && !pixel.dc3 && pixel.dc4) {
				if(!pixel.void) {
					if(hhh < 1/3) {
						pixel.void = pixel.dc1
					} else if(hhh < 2/3) {
						pixel.void = pixel.dc2
					} else {
						pixel.void = pixel.dc4
					}
				}
			}
			//1110
			if(pixel.dc1 && pixel.dc2 && pixel.dc3 && !pixel.dc4) {
				if(!pixel.void) {
					if(hhh < 1/3) {
						pixel.void = pixel.dc1
					} else if(hhh < 2/3) {
						pixel.void = pixel.dc2
					} else {
						pixel.void = pixel.dc3
					}
				}
			}
			//choose from 4
			//1111
			if(pixel.dc1 && pixel.dc2 && pixel.dc3 && pixel.dc4) {
				if(!pixel.void) {
					if(iii < 1/4) {
						pixel.void = pixel.dc1
					} else if(iii < 2/4) {
						pixel.void = pixel.dc2
					} else if(iii < 3/4) {
						pixel.void = pixel.dc3
					} else {
						pixel.void = pixel.dc4
					}
				}
			}
		} else if(pixel.void) {
			if(pixel.dc1 || pixel.dc2 || pixel.dc3 || pixel.dc4) {
				delete pixel.dc1;
				delete pixel.dc2;
				delete pixel.dc3;
				delete pixel.dc4;
			}
		}
		
		for(i = 0; i < adjacentCoords.length; i++) {
			var pX = pixel.x; var pY = pixel.y; var oX = adjacentCoords[i][0]; var oY = adjacentCoords[i][1]; var nX = pX+oX; var nY = pY+oY;
			if(!isEmpty(nX,nY,true)) {
				var newPixel = pixelMap[nX][nY]
				var newElement = newPixel.element;
				if(newElement != pixel.element && newElement === pixel.void) {
					deletePixel(nX,nY);
				};
			};
		};
	},
	category:"special",
	hardness: 1,
},

elements.converter = {
	color: "#2ec408",
	tick: function(pixel) {
		if(!pixel.changeTo) {
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
				if(!pixel.changeTo) {
					pixel.changeTo = pixel.dc1
				}
			}
			if(!pixel.dc1 && pixel.dc2 && !pixel.dc3 && !pixel.dc4) {
				if(!pixel.changeTo) {
					pixel.changeTo = pixel.dc2
				}
			}
			if(!pixel.dc1 && !pixel.dc2 && pixel.dc3 && !pixel.dc4) {
				if(!pixel.changeTo) {
					pixel.changeTo = pixel.dc3
				}
			}
			if(!pixel.dc1 && !pixel.dc2 && !pixel.dc3 && pixel.dc4) {
				if(!pixel.changeTo) {
					pixel.changeTo = pixel.dc4
				}
			}
			ggg = Math.random()
			hhh = Math.random()
			iii = Math.random()
			//choose from 2
			//1100 and 0011
			if(pixel.dc1 && pixel.dc2 && !pixel.dc3 && !pixel.dc4) {
				if(!pixel.changeTo) {
					if(ggg < 1/2) {
						pixel.changeTo = pixel.dc1
					} else {
						pixel.changeTo = pixel.dc2
					}
				}
			}
			if(!pixel.dc1 && !pixel.dc2 && pixel.dc3 && pixel.dc4) {
				if(!pixel.changeTo) {
					if(ggg < 1/2) {
						pixel.changeTo = pixel.dc3
					} else {
						pixel.changeTo = pixel.dc4
					}
				}
			}
			//1010 and 0101
			if(pixel.dc1 && !pixel.dc2 && pixel.dc3 && !pixel.dc4) {
				if(!pixel.changeTo) {
					if(ggg < 1/2) {
						pixel.changeTo = pixel.dc1
					} else {
						pixel.changeTo = pixel.dc3
					}
				}
			}
			if(!pixel.dc1 && pixel.dc2 && !pixel.dc3 && pixel.dc4) {
				if(!pixel.changeTo) {
					if(ggg < 1/2) {
						pixel.changeTo = pixel.dc2
					} else {
						pixel.changeTo = pixel.dc4
					}
				}
			}
			//0110 and 1001
			if(!pixel.dc1 && pixel.dc2 && pixel.dc3 && !pixel.dc4) {
				if(!pixel.changeTo) {
					if(ggg < 1/2) {
						pixel.changeTo = pixel.dc2
					} else {
						pixel.changeTo = pixel.dc3
					}
				}
			}
			if(pixel.dc1 && !pixel.dc2 && !pixel.dc3 && pixel.dc4) {
				if(!pixel.changeTo) {
					if(ggg < 1/2) {
						pixel.changeTo = pixel.dc1
					} else {
						pixel.changeTo = pixel.dc4
					}
				}
			}
			//choose from 3
			//0111
			if(!pixel.dc1 && pixel.dc2 && pixel.dc3 && pixel.dc4) {
				if(!pixel.changeTo) {
					if(hhh < 1/3) {
						pixel.changeTo = pixel.dc2
					} else if(hhh < 2/3) {
						pixel.changeTo = pixel.dc3
					} else {
						pixel.changeTo = pixel.dc4
					}
				}
			}
			//1011
			if(pixel.dc1 && !pixel.dc2 && pixel.dc3 && pixel.dc4) {
				if(!pixel.changeTo) {
					if(hhh < 1/3) {
						pixel.changeTo = pixel.dc1
					} else if(hhh < 2/3) {
						pixel.changeTo = pixel.dc3
					} else {
						pixel.changeTo = pixel.dc4
					}
				}
			}
			//1101
			if(pixel.dc1 && pixel.dc2 && !pixel.dc3 && pixel.dc4) {
				if(!pixel.changeTo) {
					if(hhh < 1/3) {
						pixel.changeTo = pixel.dc1
					} else if(hhh < 2/3) {
						pixel.changeTo = pixel.dc2
					} else {
						pixel.changeTo = pixel.dc4
					}
				}
			}
			//1110
			if(pixel.dc1 && pixel.dc2 && pixel.dc3 && !pixel.dc4) {
				if(!pixel.changeTo) {
					if(hhh < 1/3) {
						pixel.changeTo = pixel.dc1
					} else if(hhh < 2/3) {
						pixel.changeTo = pixel.dc2
					} else {
						pixel.changeTo = pixel.dc3
					}
				}
			}
			//choose from 4
			//1111
			if(pixel.dc1 && pixel.dc2 && pixel.dc3 && pixel.dc4) {
				if(!pixel.changeTo) {
					if(iii < 1/4) {
						pixel.changeTo = pixel.dc1
					} else if(iii < 2/4) {
						pixel.changeTo = pixel.dc2
					} else if(iii < 3/4) {
						pixel.changeTo = pixel.dc3
					} else {
						pixel.changeTo = pixel.dc4
					}
				}
			}
		} else if(pixel.changeTo) {
			if(pixel.dc1 || pixel.dc2 || pixel.dc3 || pixel.dc4) {
				delete pixel.dc1;
				delete pixel.dc2;
				delete pixel.dc3;
				delete pixel.dc4;
			}
		}
		
		for(i = 0; i < adjacentCoords.length; i++) {
			var pX = pixel.x; var pY = pixel.y; var oX = adjacentCoords[i][0]; var oY = adjacentCoords[i][1]; var nX = pX+oX; var nY = pY+oY;
			if(!isEmpty(nX,nY,true)) {
				var newPixel = pixelMap[nX][nY]
				var newElement = newPixel.element;
				if(newElement != pixel.element) {
					changePixel(newPixel,pixel.changeTo)
				};
			};
		};
	},
	category:"special",
	hardness: 1,
},

conveyorIgnoreList = ["conveyor_1","conveyor_2","wall"]

elements.conveyor_1 = {
	color: "#7f7f7f",
	tick: function(pixel) {
		//top right
		if (!isEmpty(pixel.x,pixel.y-1) && !outOfBounds(pixel.x,pixel.y-1)) {
			if (pixelMap[pixel.x][pixel.y-1].element == "body") {
				if(!isEmpty(pixel.x,pixel.y-2) && !outOfBounds(pixel.x,pixel.y-2)) {
					if (pixelMap[pixel.x][pixel.y-2].element == "head") {
						if(isEmpty(pixel.x+1,pixel.y-1) && isEmpty(pixel.x+1,pixel.y-2) && !outOfBounds(pixel.x+1,pixel.y-1) && !outOfBounds(pixel.x+1,pixel.y-2)) {
							tryMove(pixelMap[pixel.x][pixel.y-1],pixel.x+1,pixel.y-1)
							tryMove(pixelMap[pixel.x][pixel.y-2],pixel.x+1,pixel.y-2)
						}
					}
				} else {
					if(isEmpty(pixel.x+1,pixel.y-1) && !outOfBounds(pixel.x+1,pixel.y-1)) {
						tryMove(pixelMap[pixel.x][pixel.y-1],pixel.x+1,pixel.y-1)
					}
				}
			} else if(!conveyorIgnoreList.includes(pixelMap[pixel.x][pixel.y-1].element)) {
				tryMove(pixelMap[pixel.x][pixel.y-1],pixel.x+1,pixel.y-1)
			}
		}
		//right down
		if (!isEmpty(pixel.x+1,pixel.y) && !outOfBounds(pixel.x+1,pixel.y)) {
			if (pixelMap[pixel.x+1][pixel.y].element == "body") {
				if(!isEmpty(pixel.x+1,pixel.y-1) && !outOfBounds(pixel.x+1,pixel.y-1)) {
					if (pixelMap[pixel.x+1][pixel.y-1].element == "head") {
						if(isEmpty(pixel.x+1,pixel.y+1) && !outOfBounds(pixel.x+1,pixel.y+1)) {
							tryMove(pixelMap[pixel.x+1][pixel.y],pixel.x+1,pixel.y+1)
							tryMove(pixelMap[pixel.x+1][pixel.y-1],pixel.x+1,pixel.y)
						}
					}
				} else {
					if(isEmpty(pixel.x+1,pixel.y+1) && !outOfBounds(pixel.x+1,pixel.y+1)) {
						tryMove(pixelMap[pixel.x+1][pixel.y],pixel.x+1,pixel.y+1)
					}
				}
			} else if(!conveyorIgnoreList.includes(pixelMap[pixel.x+1][pixel.y].element)) {
				tryMove(pixelMap[pixel.x+1][pixel.y],pixel.x+1,pixel.y+1)
			}
		}
		//bottom left
		if (!isEmpty(pixel.x,pixel.y+1) && !outOfBounds(pixel.x,pixel.y+1)) {
			if (pixelMap[pixel.x][pixel.y+1].element == "head") {
				if(!isEmpty(pixel.x,pixel.y+2) && !outOfBounds(pixel.x,pixel.y+2)) {
					if (pixelMap[pixel.x][pixel.y+2].element == "body") {
						if(isEmpty(pixel.x-1,pixel.y+1) && isEmpty(pixel.x-1,pixel.y+2) && !outOfBounds(pixel.x-1,pixel.y+2) && !outOfBounds(pixel.x-1,pixel.y+2)) {
							tryMove(pixelMap[pixel.x][pixel.y+1],pixel.x-1,pixel.y+1)
							tryMove(pixelMap[pixel.x][pixel.y+2],pixel.x-1,pixel.y+2)
						}
					}
				} else {
					if(isEmpty(pixel.x-1,pixel.y+1) && !outOfBounds(pixel.x-1,pixel.y+1)) {
						tryMove(pixelMap[pixel.x][pixel.y+1],pixel.x-1,pixel.y+1)
					}
				}
			} else if(!conveyorIgnoreList.includes(pixelMap[pixel.x][pixel.y+1].element)) {
				tryMove(pixelMap[pixel.x][pixel.y+1],pixel.x-1,pixel.y+1)
			}
		}
		//left up
		if (!isEmpty(pixel.x-1,pixel.y) && !outOfBounds(pixel.x-1,pixel.y)) {
			if (pixelMap[pixel.x-1][pixel.y].element == "head") {
				if(!isEmpty(pixel.x-1,pixel.y+1) && !outOfBounds(pixel.x-1,pixel.y+1)) {
					if (pixelMap[pixel.x-1][pixel.y+1].element == "body") {
						if(isEmpty(pixel.x-1,pixel.y-1) && !outOfBounds(pixel.x-1,pixel.y-1)) {
							tryMove(pixelMap[pixel.x-1][pixel.y],pixel.x-1,pixel.y-1)
							tryMove(pixelMap[pixel.x-1][pixel.y+1],pixel.x-1,pixel.y)
						}
					}
				} else {
					if(isEmpty(pixel.x-1,pixel.y-1) && !outOfBounds(pixel.x-1,pixel.y-1)) {
						tryMove(pixelMap[pixel.x-1][pixel.y],pixel.x-1,pixel.y-1)
					}
				}
			} else if(!conveyorIgnoreList.includes(pixelMap[pixel.x-1][pixel.y].element)) {
				tryMove(pixelMap[pixel.x-1][pixel.y],pixel.x-1,pixel.y-1)
			}
		}
	},
	category: "machines",
	insulate: true,
	state: "solid",
},

elements.conveyor_2 = {
	color: "#7f7f7f",
	tick: function(pixel) {
		//top left
		if (!isEmpty(pixel.x,pixel.y-1) && !outOfBounds(pixel.x,pixel.y-1)) {
			if (pixelMap[pixel.x][pixel.y-1].element == "body") {
				if(!isEmpty(pixel.x,pixel.y-2) && !outOfBounds(pixel.x,pixel.y-2)) {
					if (pixelMap[pixel.x][pixel.y-2].element == "head") {
						if(isEmpty(pixel.x-1,pixel.y-1) && isEmpty(pixel.x-1,pixel.y-2) && !outOfBounds(pixel.x-1,pixel.y-1) && !outOfBounds(pixel.x-1,pixel.y-2)) {
							tryMove(pixelMap[pixel.x][pixel.y-1],pixel.x-1,pixel.y-1)
							tryMove(pixelMap[pixel.x][pixel.y-2],pixel.x-1,pixel.y-2)
						}
					}
				} else {
					if(isEmpty(pixel.x-1,pixel.y-1) && !outOfBounds(pixel.x-1,pixel.y-1)) {
						tryMove(pixelMap[pixel.x][pixel.y-1],pixel.x-1,pixel.y-1)
					}
				}
			} else if(!conveyorIgnoreList.includes(pixelMap[pixel.x][pixel.y-1].element)) {
				tryMove(pixelMap[pixel.x][pixel.y-1],pixel.x-1,pixel.y-1)
			}
		}
		//right up
		if (!isEmpty(pixel.x+1,pixel.y) && !outOfBounds(pixel.x+1,pixel.y)) {
			if (pixelMap[pixel.x+1][pixel.y].element == "head") {
				if(!isEmpty(pixel.x+1,pixel.y+1) && !outOfBounds(pixel.x+1,pixel.y+1)) {
					if (pixelMap[pixel.x+1][pixel.y+1].element == "body") {
						if(isEmpty(pixel.x+1,pixel.y-1) && !outOfBounds(pixel.x+1,pixel.y-1)) {
							tryMove(pixelMap[pixel.x+1][pixel.y],pixel.x+1,pixel.y-1)
							tryMove(pixelMap[pixel.x+1][pixel.y+1],pixel.x+1,pixel.y)
						}
					}
				} else {
					if(isEmpty(pixel.x+1,pixel.y-1) && !outOfBounds(pixel.x+1,pixel.y-1)) {
						tryMove(pixelMap[pixel.x+1][pixel.y],pixel.x+1,pixel.y-1)
					}
				}
			} else if(!conveyorIgnoreList.includes(pixelMap[pixel.x+1][pixel.y].element)) {
				tryMove(pixelMap[pixel.x+1][pixel.y],pixel.x+1,pixel.y-1)
			}
		}
		//bottom right
		if (!isEmpty(pixel.x,pixel.y+1) && !outOfBounds(pixel.x,pixel.y+1)) {
			if (pixelMap[pixel.x][pixel.y+1].element == "head") {
				if(!isEmpty(pixel.x,pixel.y+2) && !outOfBounds(pixel.x,pixel.y+2)) {
					if (pixelMap[pixel.x][pixel.y+2].element == "body") {
						if(isEmpty(pixel.x+1,pixel.y+1) && isEmpty(pixel.x+1,pixel.y+2) && !outOfBounds(pixel.x+1,pixel.y+2) && !outOfBounds(pixel.x+1,pixel.y+2)) {
							tryMove(pixelMap[pixel.x][pixel.y+1],pixel.x+1,pixel.y+1)
							tryMove(pixelMap[pixel.x][pixel.y+2],pixel.x+1,pixel.y+2)
						}
					}
				} else {
					if(isEmpty(pixel.x+1,pixel.y+1) && !outOfBounds(pixel.x+1,pixel.y+1)) {
						tryMove(pixelMap[pixel.x][pixel.y+1],pixel.x+1,pixel.y+1)
					}
				}
			} else if(!conveyorIgnoreList.includes(pixelMap[pixel.x][pixel.y+1].element)) {
				tryMove(pixelMap[pixel.x][pixel.y+1],pixel.x+1,pixel.y+1)
			}
		}
		//left down
		if (!isEmpty(pixel.x-1,pixel.y) && !outOfBounds(pixel.x-1,pixel.y)) {
			if (pixelMap[pixel.x-1][pixel.y].element == "body") {
				if(!isEmpty(pixel.x-1,pixel.y-1) && !outOfBounds(pixel.x-1,pixel.y-1)) {
					if (pixelMap[pixel.x-1][pixel.y-1].element == "head") {
						if(isEmpty(pixel.x-1,pixel.y+1) && !outOfBounds(pixel.x-1,pixel.y+1)) {
							tryMove(pixelMap[pixel.x-1][pixel.y],pixel.x-1,pixel.y+1)
							tryMove(pixelMap[pixel.x-1][pixel.y-1],pixel.x-1,pixel.y)
						}
					}
				} else {
					if(isEmpty(pixel.x-1,pixel.y+1) && !outOfBounds(pixel.x-1,pixel.y+1)) {
						tryMove(pixelMap[pixel.x-1][pixel.y],pixel.x-1,pixel.y+1)
					}
				}
			} else if(!conveyorIgnoreList.includes(pixelMap[pixel.x-1][pixel.y].element)) {
				tryMove(pixelMap[pixel.x-1][pixel.y],pixel.x-1,pixel.y+1)
			}
		}
	},
	category: "machines",
	insulate: true,
	state: "solid",
},

elements.vanishing_wall = {
	behavior: behaviors.WALL,
	color: "#8080b0",
	colorObject: hexToRGB("#8080b0"),
	density: 3333,
	tick: function(pixel) {
		pixelTick(pixel)
		if(pixel.charge) {
			if(!isEmpty(pixel.x,pixel.y)) {
				deletePixel(pixel.x,pixel.y)
			}
		}
	},
	category: "special",
	state: "solid",
	hardness: 1,
	insulate: true,
	conduct: 1,
	extraInfo: "It disappears when charged.",
},

elements.vanishing_steel = {
	color: "#71797E",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		pixelTick(pixel);
		if(pixel.charge) {
			if(!isEmpty(pixel.x,pixel.y)) {
				deletePixel(pixel.x,pixel.y);
			};
		};
	},
	category: "solids",
	state: "solid",
	density: 7850,
	conduct: 1,
	hardness: 0.8,
	//tempHigh: 1455.5, //JavaScript Illogically refuses to autogen
	forceAutoGen: true,
};

//go fuck yourself javascript
//why the fuck won't you FUCKING generate the molten element
//I am not adding another FUCKING dependency today
elements.polka_dotted_powder = {
	color: ["#000000","#000000","#7f7f7f","#ffffff","#ffffff"],
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
	density: 1400,
	tick: function(pixel) {
		if(pixel.y % 6 == 0) {
			if(pixel.x % 6 == 0) {
				pixel.color = "rgb(255,255,255)"
			} else {
				if(!settings.bg || settings.bg == "#000000") {
					pixel.color = "rgb(15,15,15)"
				} else {
					pixel.color = "rgb(0,0,0)"
				}
			} 
		} else if((pixel.y + 3) % 6 == 0) {
			if((pixel.x + 3) % 6 == 0) {
				pixel.color = "rgb(255,255,255)"
			} else {
				if(!settings.bg || settings.bg == "#000000") {
					pixel.color = "rgb(15,15,15)"
				} else {
					pixel.color = "rgb(0,0,0)"
				}
			} 
		} else {
			if(!settings.bg || settings.bg == "#000000") {
				pixel.color = "rgb(15,15,15)"
			} else {
				pixel.color = "rgb(0,0,0)"
			}
		}
	},
	tempHigh: 800,
},

elements.molten_polka_dotted_powder = {
	color: ["#ff7f00","#ff7f00","#ff9f00","#ffbf00","#ffbf00"],
	density: 1100,
	tick: function(pixel) {
		if(pixel.y % 6 == 0) {
			if(pixel.x % 6 == 0) {
				pixel.color = "rgb(255,191,0)"
			} else {
				if(!settings.bg || settings.bg == "#ff7f00") {
					pixel.color = "rgb(255,143,16)"
				} else {
					pixel.color = "rgb(255,127,16)"
				}
			} 
		} else if((pixel.y + 3) % 6 == 0) {
			if((pixel.x + 3) % 6 == 0) {
				pixel.color = "rgb(255,191,0)"
			} else {
				if(!settings.bg || settings.bg == "#ff7f00") {
					pixel.color = "rgb(255,143,16)"
				} else {
					pixel.color = "rgb(255,127,16)"
				}
			} 
		} else {
			if(!settings.bg || settings.bg == "#ff7f00") {
				pixel.color = "rgb(255,143,16)"
			} else {
				pixel.color = "rgb(255,127,16)"
			}
		}
	},
	temp: 850,
	tempLow: 800,
	stateLow: "polka_dotted_powder",
	tempHigh: 2000,
	stateHigh: "vaporized_polka_dotted_powder",
	viscosity: 6,
	hidden: true,
},

elements.vaporized_polka_dotted_powder = {
	color: ["#ffdf7f","#ffdf7f","#ffefbf","#ffffff","#ffffff"],
	behavior: behaviors.GAS,
	category: "gases",
	state: "gas",
	density: 550,
	tick: function(pixel) {
		if(pixel.y % 6 == 0) {
			if(pixel.x % 6 == 0) {
				pixel.color = "rgb(255,255,255)"
			} else {
				if(!settings.bg || settings.bg == "#ffdf7f") {
					pixel.color = "rgb(255,233,137)"
				} else {
					pixel.color = "rgb(255,223,127)"
				}
			} 
		} else if((pixel.y + 3) % 6 == 0) {
			if((pixel.x + 3) % 6 == 0) {
				pixel.color = "rgb(255,255,255)"
			} else {
				if(!settings.bg || settings.bg == "#ffdf7f") {
					pixel.color = "rgb(255,143,16)"
				} else {
					pixel.color = "rgb(255,233,137)"
				}
			} 
		} else {
			if(!settings.bg || settings.bg == "#ffdf7f") {
				pixel.color = "rgb(255,233,137)"
			} else {
				pixel.color = "rgb(255,223,127)"
			}
		}
	},
	temp: 2200,
	tempLow: 2000,
	stateLow: "molten_polka_dotted_powder",
	tempHigh: 8000,
	stateHigh: "ionized_polka_dotted_powder",
	hidden: true,
},

elements.ionized_polka_dotted_powder = {
	color: ["#fffff0","#fffff0","#fffff7","#ffffff","#ffffff"],
	behavior: [
		"M2 AND CR:plasma%0.3|M1|M2 AND CR:plasma%0.3",
		"M1|XX|M1",
		"M2 AND CR:plasma%0.3|M1|M2 AND CR:plasma%0.3",
	],
	category: "gases",
	state: "gas",
	density: 0.02,
	tick: function(pixel) {
		if(pixel.y % 6 == 0) {
			if(pixel.x % 6 == 0) {
				pixel.color = "rgb(255,255,255)"
			} else {
				if(!settings.bg || settings.bg == "#fffff0") {
					pixel.color = "rgb(255,255,247)"
				} else {
					pixel.color = "rgb(255,255,240)"
				}
			} 
		} else if((pixel.y + 3) % 6 == 0) {
			if((pixel.x + 3) % 6 == 0) {
				pixel.color = "rgb(255,255,255)"
			} else {
				if(!settings.bg || settings.bg == "#fffff0") {
					pixel.color = "rgb(255,255,247)"
				} else {
					pixel.color = "rgb(255,255,240)"
				}
			} 
		} else {
			if(!settings.bg || settings.bg == "#fffff0") {
				pixel.color = "rgb(255,255,247)"
			} else {
				pixel.color = "rgb(255,255,240)"
			}
		}
	},
	temp: 8500,
	tempLow: 8000,
	stateLow: "vaporized_polka_dotted_powder",
	hidden: true,
},

elements.hdet = {
	name: "heat- dependent explosion text",
	color: "#33aa44",
	behavior: behaviors.POWDER,
	tick: function(pixel) {
		if(pixel.charge > 0) {
			var temp = pixel.temp
			if(temp < 0) {
				temp = 0
			}
			if(temp >= 0 && temp < 1) {
				temp = 1
			}
			if(temp > 56000) {
				temp = 56000
			}
			if(isNaN(temp) || isNaN(pixel.temp)) {
				temp = 20
				pixel.temp = 20
			}
			var r = ((Math.sqrt((Math.log(temp)/Math.log(20)))*(temp**0.5))/(6000**0.126284318))/2
			explodeAt(pixel.x,pixel.y,Math.floor(r))
			if(temp > 200) {
				if(Math.random() < (Math.log(temp)/Math.log(56000))**9) {
					pixel.charge = 1
					if(pixel.chargeCD) {
						delete pixel.chargeCD
					}
				}
			}
			if(isNaN(temp) || isNaN(pixel.temp)) {
				temp = 20
				pixel.temp = 20
			}
		}
	},
	density: 1200,
	conduct: 0.5,
	state: "solid",
	category: "special"
},

function randInt(max) {
   return Math.floor(Math.random() * (max + 1))
}

function randIntR(min,max) {
	if(min > max) {
		var temp = max; //the need of a temporary space has always annoyed me
		max = min;
		min = temp;
	};
	return Math.floor(Math.random() * (max - min + 1)) + min
};

elements.lower_color_copy = {
	behavior: behaviors.POWDER,
	tick: function(pixel) {
		if(!isEmpty(pixel.x,pixel.y+1,true)) {
			pixel.color = pixelMap[pixel.x][pixel.y+1].color;
		} else {
			if(settings.bg) {
				pixel.color = settings.bg;
			} else {
				pixel.color = "#000000";
			}
		}
	},
	color: ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#007FFF", "#0000FF", "#7F00FF"],
	density: 1250,
	breakInto: ["metal_scrap", "glass_shard"],
	hardness: 0.7,
}
