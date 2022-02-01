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
}
