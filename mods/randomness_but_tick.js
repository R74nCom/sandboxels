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
},

this.aaa = ["plasma","plasma","plasma","plasma","plasma","plasma","plasma","plasma","plasma","plasma","plasma","plasma","smoke","plasma","plasma","fire","smoke","fire","smoke","plasma","metal_scrap","metal_scrap","metal_scrap","metal_scrap","metal_scrap","acid","acid","oil","oil","oil","oil","oil","oil","oil","plasma","plasma","plasma","plasma","plasma","smoke","plasma","plasma","fire","smoke","plasma","metal_scrap","metal_scrap","metal_scrap","metal_scrap","metal_scrap","metal_scrap","flash","flash","flash","flash","flash","acid_gas","acid_gas","acid_gas","acid","oil","oil","oil","oil","oil","oil","oil","oil","oil","oil","plasma","plasma","plasma","plasma","metal_scrap","metal_scrap","metal_scrap","metal_scrap","metal_scrap","acid","acid","oil","oil","oil","oil","oil","oil","oil","plasma","plasma","plasma","plasma","plasma","smoke","plasma","plasma","fire","smoke","plasma","metal_scrap","metal_scrap","metal_scrap","metal_scrap","metal_scrap","metal_scrap","seb","seb","flash","flash","flash","flash","flash","acid_gas","acid_gas","acid_gas","acid","oil","oil","oil","oil","oil","oil","oil","oil","oil","oil","plasma","plasma","plasma","plasma","plague","plague","plague","plague","plague","plague","radiation","radiation","radiation","radiation","radiation","radiation","radiation","radiation","uranium","uranium","uranium","uranium","uranium","uranium","greek_fire","greek_fire","greek_fire","greek_fire","greek_fire","antimatter","antimatter","antimatter","antimatter","antimatter","smoke_grenade","antimatter","smoke_grenade","fireball","flash","acid_gas","acid_gas","acid_gas","plague","plague","plague","plague","plague","plague","radiation","radiation","radiation","radiation","radiation","radiation","radiation","radiation","uranium","uranium","uranium","uranium","uranium","uranium","greek_fire","greek_fire","greek_fire","greek_fire","greek_fire","antimatter","antimatter","antimatter","antimatter","antimatter","smoke_grenade","antimatter","flash","acid_gas","acid_gas","acid_gas"]

this.bbb = ["smoke","smoke","smoke","metal_scrap","metal_scrap","metal_scrap","metal_scrap","metal_scrap","acid","acid","oil","oil","oil","oil","oil","oil","oil","smoke","smoke","metal_scrap","metal_scrap","metal_scrap","metal_scrap","metal_scrap","metal_scrap","flash","flash","flash","flash","flash","acid_gas","acid_gas","acid_gas","acid","oil","oil","oil","oil","oil","oil","oil","oil","oil","oil","metal_scrap","metal_scrap","metal_scrap","metal_scrap","metal_scrap","acid","acid","oil","oil","oil","oil","oil","oil","oil","smoke","smoke","metal_scrap","metal_scrap","metal_scrap","metal_scrap","metal_scrap","metal_scrap","seb","flash","flash","flash","flash","flash","acid_gas","acid_gas","acid_gas","acid","oil","oil","oil","oil","oil","oil","oil","oil","oil","oil","plague","plague","plague","plague","plague","plague","radiation","radiation","radiation","radiation","radiation","radiation","radiation","radiation","uranium","uranium","uranium","uranium","uranium","uranium","greek_fire","greek_fire","greek_fire","greek_fire","greek_fire","antimatter","antimatter","antimatter","antimatter","antimatter","smoke_grenade","antimatter","smoke_grenade","flash","acid_gas","acid_gas","acid_gas","plague","plague","plague","plague","plague","plague","radiation","radiation","radiation","radiation","radiation","radiation","radiation","radiation","uranium","uranium","uranium","uranium","uranium","uranium","greek_fire","greek_fire","greek_fire","greek_fire","greek_fire","antimatter","smoke_grenade","flash","acid_gas","acid_gas","acid_gas"]

elements.amalgamated_bomb = {
    color: ["#FF0000","#FF0000","#FFFF00","#FFFF00","#00FF00","#00FF00","#0000FF","#0000FF"],
	tick: function(pixel) {
		eee = Math.random()
		doHeat(pixel);
		if(!isEmpty(pixel.x,pixel.y-1) && !outOfBounds(pixel.x,pixel.y-1)) {
			if(pixelMap[pixel.x][pixel.y-1].element != pixel.element) {
				steppedOn = true
			} else steppedOn = false
		} else {
			steppedOn = false
		}
		if(!isEmpty(pixel.x,pixel.y+1) && !outOfBounds(pixel.x,pixel.y+1)) {
			if(pixelMap[pixel.x][pixel.y+1].element != pixel.element) {
				landed = true
			} else landed = false
		} else {
			landed = false
		}
		if(outOfBounds(pixel.x,pixel.y+1)) {
			landed = true
		}
		tryMove(pixel, pixel.x, pixel.y+1)
		if(steppedOn == true || landed == true) {
		fire = bbb
		smoke = bbb
		radius = 45
		x = pixel.x
		y = pixel.y
		//SECONDARY
			// if fire contains , split it into an array
			if (fire.includes(",")) {
				fire = fire.split(",");
			}
			// if smoke contains , split it into an array
			if (smoke.includes(",")) {
				smoke = smoke.split(",");
			}
			var coords = circleCoords(x,y,radius);
			var power = radius/10;
			//for (var p = 0; p < Math.round(radius/10+1); p++) {
			for (var i = 0; i < coords.length; i++) {
				// damage value is based on distance from x and y
				var damage = Math.random() + (Math.floor(Math.sqrt(Math.pow(coords[i].x-x,2) + Math.pow(coords[i].y-y,2)))) / radius;
				// invert
				damage = 1 - damage;
				if (damage < 0) { damage = 0; }
				damage *= power;
				if (isEmpty(coords[i].x,coords[i].y)) {
					// create smoke or fire depending on the damage if empty
					if (damage < 0.02) { } // do nothing
					else if (damage < 0.2) {
						// if smoke is an array, choose a random item
						if (Array.isArray(smoke)) {
							createPixel(smoke[Math.floor(Math.random() * smoke.length)],coords[i].x,coords[i].y);
						}
						else {
							createPixel(smoke,coords[i].x,coords[i].y);
						}
					}
					else {
						// if fire is an array, choose a random item
						if (Array.isArray(fire)) {
							createPixel(fire[Math.floor(Math.random() * fire.length)],coords[i].x,coords[i].y);
						}
						else {
							createPixel(fire,coords[i].x,coords[i].y);
						}
					}
				}
				else if (!outOfBounds(coords[i].x,coords[i].y)) {
					// damage the pixel
					var pixel = pixelMap[coords[i].x][coords[i].y];
					var info = elements[pixel.element];
					if (info.hardness) { // lower damage depending on hardness(0-1)
						if (info.hardness < 1) {
							damage = damage * ((1 - info.hardness)*10);
						}
						else { damage = 0; }
					}
					if (damage > 0.25) {
						if (info.breakInto) {
							// if it is an array, choose a random item, else just use the value
							if (Array.isArray(info.breakInto)) {
								var result = info.breakInto[Math.floor(Math.random() * info.breakInto.length)];
							}
							else {
								var result = info.breakInto;
							}
							// change the pixel to the result
							pixel.element = result;
							pixel.color = pixelColorPick(pixel);
							if (elements[result].burning) {
								pixel.burning = true;
								pixel.burnStart = pixelTicks;
							}
							else if (pixel.burning && !elements[result].burn) {
								pixel.burning = false;
								delete pixel.burnStart;
							}
						}
						else {
							if (Array.isArray(fire)) {
								var newfire = fire[Math.floor(Math.random() * fire.length)];
							}
							else {
								var newfire = fire;
							}
							pixel.element = newfire;
							pixel.color = pixelColorPick(pixel);
							if (elements[newfire].burning) {
								pixel.burning = true;
								pixel.burnStart = pixelTicks;
							}
							else if (pixel.burning && !elements[newfire].burn) {
								pixel.burning = false;
								delete pixel.burnStart;
							}
						}
					}
					if (damage > 0.75) {
						if (info.burn) {
							pixel.burning = true;
							pixel.burnStart = pixelTicks;
						}
					}
					pixel.temp += damage*radius*power;
					pixelTempCheck(pixel);
				}
			}
		
		fire = aaa
		smoke = aaa
		radius = 30
		//PRIMARY
			// if fire contains , split it into an array
			if (fire.includes(",")) {
				fire = fire.split(",");
			}
			// if smoke contains , split it into an array
			if (smoke.includes(",")) {
				smoke = smoke.split(",");
			}
			var coords = circleCoords(x,y,radius);
			var power = radius/10;
			//for (var p = 0; p < Math.round(radius/10+1); p++) {
			for (var i = 0; i < coords.length; i++) {
				// damage value is based on distance from x and y
				var damage = Math.random() + (Math.floor(Math.sqrt(Math.pow(coords[i].x-x,2) + Math.pow(coords[i].y-y,2)))) / radius;
				// invert
				damage = 1 - damage;
				if (damage < 0) { damage = 0; }
				damage *= power;
				if (isEmpty(coords[i].x,coords[i].y)) {
					// create smoke or fire depending on the damage if empty
					if (damage < 0.02) { } // do nothing
					else if (damage < 0.2) {
						// if smoke is an array, choose a random item
						if (Array.isArray(smoke)) {
							createPixel(smoke[Math.floor(Math.random() * smoke.length)],coords[i].x,coords[i].y);
						}
						else {
							createPixel(smoke,coords[i].x,coords[i].y);
						}
					}
					else {
						// if fire is an array, choose a random item
						if (Array.isArray(fire)) {
							createPixel(fire[Math.floor(Math.random() * fire.length)],coords[i].x,coords[i].y);
						}
						else {
							createPixel(fire,coords[i].x,coords[i].y);
						}
					}
				}
				else if (!outOfBounds(coords[i].x,coords[i].y)) {
					// damage the pixel
					var pixel = pixelMap[coords[i].x][coords[i].y];
					var info = elements[pixel.element];
					if (info.hardness) { // lower damage depending on hardness(0-1)
						if (info.hardness < 1) {
							damage = damage * ((1 - info.hardness)*10);
						}
						else { damage = 0; }
					}
					if (damage > 0.25) {
						if (info.breakInto) {
							// if it is an array, choose a random item, else just use the value
							if (Array.isArray(info.breakInto)) {
								var result = info.breakInto[Math.floor(Math.random() * info.breakInto.length)];
							}
							else {
								var result = info.breakInto;
							}
							// change the pixel to the result
							pixel.element = result;
							pixel.color = pixelColorPick(pixel);
							if (elements[result].burning) {
								pixel.burning = true;
								pixel.burnStart = pixelTicks;
							}
							else if (pixel.burning && !elements[result].burn) {
								pixel.burning = false;
								delete pixel.burnStart;
							}
						}
						else {
							if (Array.isArray(fire)) {
								var newfire = fire[Math.floor(Math.random() * fire.length)];
							}
							else {
								var newfire = fire;
							}
							pixel.element = newfire;
							pixel.color = pixelColorPick(pixel);
							if (elements[newfire].burning) {
								pixel.burning = true;
								pixel.burnStart = pixelTicks;
							}
							else if (pixel.burning && !elements[newfire].burn) {
								pixel.burning = false;
								delete pixel.burnStart;
							}
						}
					}
					if (damage > 0.75) {
						if (info.burn) {
							pixel.burning = true;
							pixel.burnStart = pixelTicks;
						}
					}
					pixel.temp += damage*radius*power;
					pixelTempCheck(pixel);
				}
			}
		}
	},
    category: "weapons",
    state: "solid",
    density: 1800,
    excludeRandom: true,
    extraInfo: "a little bit of everything <img aria-label=\":eggTF:\" src=\"https://cdn.discordapp.com/emojis/861270810151616545.png\" alt=\":eggTF:\" draggable=\"false\" data-type=\"emoji\" data-id=\"861270810151616545\" style=\"-o-object-fit: contain; object-fit: contain; width: 1.375em; height: 1.375em; vertical-align: bottom; text-indent: -9999px;\" title=\":eggTF:\">&nbsp;",
},

elements.colder_bomb = {
    color: "#43648e",
	tick: function(pixel) {
		eee = Math.random()
		doHeat(pixel);
		if(!isEmpty(pixel.x,pixel.y-1) && !outOfBounds(pixel.x,pixel.y-1)) {
			if(pixelMap[pixel.x][pixel.y-1].element != pixel.element) {
				steppedOn = true
			} else steppedOn = false
		} else {
			steppedOn = false
		}
		if(!isEmpty(pixel.x,pixel.y+1) && !outOfBounds(pixel.x,pixel.y+1)) {
			if(pixelMap[pixel.x][pixel.y+1].element != pixel.element) {
				landed = true
			} else landed = false
		} else {
			landed = false
		}
		if(outOfBounds(pixel.x,pixel.y+1)) {
			landed = true
		}
		tryMove(pixel, pixel.x, pixel.y+1)
		if(steppedOn == true || landed == true) {
			fire = ["cold_fire","cold_fire","cold_fire","snow","liquid_nitrogen"]
			smoke = ["cold_fire","snow","liquid_nitrogen"]
			radius = 15
			x = pixel.x
			y = pixel.y
			// if fire contains , split it into an array
			if (fire.includes(",")) {
				fire = fire.split(",");
			}
			// if smoke contains , split it into an array
			if (smoke.includes(",")) {
				smoke = smoke.split(",");
			}
			var coords = circleCoords(x,y,radius);
			var power = radius/10;
			//for (var p = 0; p < Math.round(radius/10+1); p++) {
			for (var i = 0; i < coords.length; i++) {
				// damage value is based on distance from x and y
				var damage = Math.random() + (Math.floor(Math.sqrt(Math.pow(coords[i].x-x,2) + Math.pow(coords[i].y-y,2)))) / radius;
				// invert
				damage = 1 - damage;
				if (damage < 0) { damage = 0; }
				damage *= power;
				if (isEmpty(coords[i].x,coords[i].y)) {
					// create smoke or fire depending on the damage if empty
					if (damage < 0.02) { } // do nothing
					else if (damage < 0.2) {
						// if smoke is an array, choose a random item
						if (Array.isArray(smoke)) {
							createPixel(smoke[Math.floor(Math.random() * smoke.length)],coords[i].x,coords[i].y);
						}
						else {
							createPixel(smoke,coords[i].x,coords[i].y);
						}
					}
					else {
						// if fire is an array, choose a random item
						if (Array.isArray(fire)) {
							createPixel(fire[Math.floor(Math.random() * fire.length)],coords[i].x,coords[i].y);
						}
						else {
							createPixel(fire,coords[i].x,coords[i].y);
						}
					}
				}
				else if (!outOfBounds(coords[i].x,coords[i].y)) {
					// damage the pixel
					var pixel = pixelMap[coords[i].x][coords[i].y];
					var info = elements[pixel.element];
					if (info.hardness) { // lower damage depending on hardness(0-1)
						if (info.hardness < 1) {
							damage = damage * ((1 - info.hardness)*10);
						}
						else { damage = 0; }
					}
					if (damage > 0.25) {
						if (info.breakInto) {
							// if it is an array, choose a random item, else just use the value
							if (Array.isArray(info.breakInto)) {
								var result = info.breakInto[Math.floor(Math.random() * info.breakInto.length)];
							}
							else {
								var result = info.breakInto;
							}
							// change the pixel to the result
							pixel.element = result;
							pixel.color = pixelColorPick(pixel);
							if (elements[result].burning) {
								pixel.burning = true;
								pixel.burnStart = pixelTicks;
							}
							else if (pixel.burning && !elements[result].burn) {
								pixel.burning = false;
								delete pixel.burnStart;
							}
						}
						else {
							if (Array.isArray(fire)) {
								var newfire = fire[Math.floor(Math.random() * fire.length)];
							}
							else {
								var newfire = fire;
							}
							pixel.element = newfire;
							pixel.color = pixelColorPick(pixel);
							if (elements[newfire].burning) {
								pixel.burning = true;
								pixel.burnStart = pixelTicks;
							}
							else if (pixel.burning && !elements[newfire].burn) {
								pixel.burning = false;
								delete pixel.burnStart;
							}
						}
					}
					if (damage > 0.75) {
						if (info.burn) {
							pixel.burning = true;
							pixel.burnStart = pixelTicks;
						}
					}
					pixel.temp -= damage*radius*power;
					pixelTempCheck(pixel);
				}
			}
		}
	},
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
},

elements.op_hottester_bomb = {
    color: "#cc436e",
	tick: function(pixel) {
		eee = Math.random()
		doHeat(pixel);
		if(!isEmpty(pixel.x,pixel.y-1) && !outOfBounds(pixel.x,pixel.y-1)) {
			if(pixelMap[pixel.x][pixel.y-1].element != pixel.element) {
				steppedOn = true
			} else steppedOn = false
		} else {
			steppedOn = false
		}
		if(!isEmpty(pixel.x,pixel.y+1) && !outOfBounds(pixel.x,pixel.y+1)) {
			if(pixelMap[pixel.x][pixel.y+1].element != pixel.element) {
				landed = true
			} else landed = false
		} else {
			landed = false
		}
		if(outOfBounds(pixel.x,pixel.y+1)) {
			landed = true
		}
		tryMove(pixel, pixel.x, pixel.y+1)
		if(steppedOn == true || landed == true) {
			fire = "plasma"
			smoke = "plasma"
			radius = 15
			x = pixel.x
			y = pixel.y
			// if fire contains , split it into an array
			if (fire.includes(",")) {
				fire = fire.split(",");
			}
			// if smoke contains , split it into an array
			if (smoke.includes(",")) {
				smoke = smoke.split(",");
			}
			var coords = circleCoords(x,y,radius);
			var power = radius/10;
			//for (var p = 0; p < Math.round(radius/10+1); p++) {
			for (var i = 0; i < coords.length; i++) {
				// damage value is based on distance from x and y
				var damage = Math.random() + (Math.floor(Math.sqrt(Math.pow(coords[i].x-x,2) + Math.pow(coords[i].y-y,2)))) / radius;
				// invert
				damage = 1 - damage;
				if (damage < 0) { damage = 0; }
				damage *= power;
				if (isEmpty(coords[i].x,coords[i].y)) {
					// create smoke or fire depending on the damage if empty
					if (damage < 0.02) { } // do nothing
					else if (damage < 0.2) {
						// if smoke is an array, choose a random item
						if (Array.isArray(smoke)) {
							createPixel(smoke[Math.floor(Math.random() * smoke.length)],coords[i].x,coords[i].y);
						}
						else {
							createPixel(smoke,coords[i].x,coords[i].y);
						}
					}
					else {
						// if fire is an array, choose a random item
						if (Array.isArray(fire)) {
							createPixel(fire[Math.floor(Math.random() * fire.length)],coords[i].x,coords[i].y);
						}
						else {
							createPixel(fire,coords[i].x,coords[i].y);
						}
					}
				}
				else if (!outOfBounds(coords[i].x,coords[i].y)) {
					// damage the pixel
					var pixel = pixelMap[coords[i].x][coords[i].y];
					var info = elements[pixel.element];
					if (info.hardness) { // lower damage depending on hardness(0-1)
						if (info.hardness < 1) {
							damage = damage * ((1 - info.hardness)*10);
						}
						else { damage = 0; }
					}
					if (damage <= 0.25) {
						pixel.temp -= Math.floor((damage*radius*power*10)**1.3)
					}
					if (damage > 0.25) {
						if (info.breakInto) {
							// if it is an array, choose a random item, else just use the value
							if (Array.isArray(info.breakInto)) {
								var result = info.breakInto[Math.floor(Math.random() * info.breakInto.length)];
							}
							else {
								var result = info.breakInto;
							}
							// change the pixel to the result
							pixel.element = result;
							pixel.color = pixelColorPick(pixel);
							if (elements[result].burning) {
								pixel.burning = false;
							}
							else if (pixel.burning && !elements[result].burn) {
								pixel.burning = false;
							}
						}
						else {
							if (Array.isArray(fire)) {
								var newfire = fire[Math.floor(Math.random() * fire.length)];
							}
							else {
								var newfire = fire;
							}
							pixel.element = newfire;
							pixel.color = pixelColorPick(pixel);
							if (elements[newfire].burning) {
								pixel.burning = false;
							}
							else if (pixel.burning && !elements[newfire].burn) {
								pixel.burning = false;
							}
						}
						pixel.temp -= Math.floor((damage*radius*power*15)**1.5)
					}
					if (damage > 0.75) {
						if (info.burn) {
							pixel.burning = false;
							pixel.temp -= Math.floor((damage*radius*power*20)**1.7)
						}
					}
					pixel.temp -= Math.floor((damage*radius*power*5)**1.1);
					pixelTempCheck(pixel);
				}
			}
		}
	},
    category: "weapons",
    state: "solid",
    temp: 7065,
    density: 1300,
    excludeRandom: true,
}

/**
*  color-temperature.js
*
*  Neil Bartlett
*  neilbartlett.com
*  2015-01-22
*
*  Copyright [2015] [Neil Bartlett] *
*
* Color Temperature is the color due to black body radiation at a given
* temperature. The temperature is given in Kelvin. The concept is widely used
* in photography and in tools such as f.lux.
*
* The function here converts a given color temperature into a near equivalent
* in the RGB colorspace. The function is based on a curve fit on standard sparse
* set of Kelvin to RGB mappings.
*
* Two conversions are presented here. The one colorTempertature2RGBUSingTH
* is a JS version of the algorithm developed by Tanner Helland. The second is a
* slightly more accurate conversion based on a refitting of the original data
* using different curve fit functions. The performance cost of the two
* approaches is very similar and in general the second algorithm is preferred.
*
* NOTE The approximations used are suitable for photo-mainpulation and other
* non-critical uses. They are not suitable for medical or other high accuracy
* use cases.
*
* Accuracy is best between 1000K and 40000K.
*
* See http://github.com/neilbartlett/color-temperature for further details.
*
**/

//[Code licensed under the MIT License]

//[Tanner Helland version omitted]

/**
 * A more accurate version algorithm based on a different curve fit to the
 * original RGB to Kelvin data.
  * Input: color temperature in degrees Kelvin
  * Output: json object of red, green and blue components of the Kelvin temperature
 */
 colorTemperature2rgb = function(kelvin) {

  var temperature = kelvin / 100.0;
  var red, green, blue;

  if (temperature < 66.0) {
    red = 255;
  } else {
    // a + b x + c Log[x] /.
    // {a -> 351.97690566805693`,
    // b -> 0.114206453784165`,
    // c -> -40.25366309332127
    //x -> (kelvin/100) - 55}
    red = temperature - 55.0;
    red = 351.97690566805693+ 0.114206453784165 * red - 40.25366309332127 * Math.log(red);
    if (red < 0) red = 0;
    if (red > 255) red = 255;
  }

  /* Calculate green */

  if (temperature < 66.0) {

    // a + b x + c Log[x] /.
    // {a -> -155.25485562709179`,
    // b -> -0.44596950469579133`,
    // c -> 104.49216199393888`,
    // x -> (kelvin/100) - 2}
    green = temperature - 2;
    green = -155.25485562709179 - 0.44596950469579133 * green + 104.49216199393888 * Math.log(green);
    if (green < 0) green = 0;
    if (isNaN(green)) green = 0;
    if (green > 255) green = 255;

  } else {

    // a + b x + c Log[x] /.
    // {a -> 325.4494125711974`,
    // b -> 0.07943456536662342`,
    // c -> -28.0852963507957`,
    // x -> (kelvin/100) - 50}
    green = temperature - 50.0;
    green = 325.4494125711974 + 0.07943456536662342 * green - 28.0852963507957 * Math.log(green);
    if (green < 0) green = 0;
    if (green > 255) green = 255;

  }

  /* Calculate blue */

  if (temperature >= 66.0) {
    blue = 255;
  } else {

    if (temperature <= 20.0) {
      blue = 0;
    } else {

      // a + b x + c Log[x] /.
      // {a -> -254.76935184120902`,
      // b -> 0.8274096064007395`,
      // c -> 115.67994401066147`,
      // x -> kelvin/100 - 10}
      blue = temperature - 10;
      blue = -254.76935184120902 + 0.8274096064007395 * blue + 115.67994401066147 * Math.log(blue);
      if (blue < 0) blue = 0;
      if (blue > 255) blue = 255;
    }
  }

  //return {red: Math.round(red), blue: Math.round(blue), green: Math.round(green)};
  return "rgb("+Math.round(red)+","+Math.round(green)+","+Math.round(blue)+")"
}

//[reverse conversion omitted]

elements.color_temp_test = {
	color: "#111111",
	tick: function(pixel) {
		if(!pixel.oldColor) {
			pixel.oldColor = pixel.color
		}
		if(!pixel.lerpValue) {
			pixel.lerpValue = 0
		}
		if(!pixel.lerpAR) {
			pixel.lerpAR = 0
		}
		if(!pixel.lerpAG) {
			pixel.lerpAG = 0
		}
		if(!pixel.lerpAB) {
			pixel.lerpAB = 0
		}
		if(!pixel.lerpBR) {
			pixel.lerpBR = 0
		}
		if(!pixel.lerpBG) {
			pixel.lerpBG = 0
		}
		if(!pixel.lerpBB) {
			pixel.lerpBB = 0
		}
		if(!pixel.lerpedR) {
			pixel.lerpedR = 0
		}
		if(!pixel.lerpedG) {
			pixel.lerpedG = 0
		}
		if(!pixel.lerpedB) {
			pixel.lerpedB = 0
		}
		if(!pixel.lerpedColor) {
			pixel.lerpedColor = ""
		}
		if(pixel.temp < 525) {
			pixel.color = pixel.oldColor
		}
		if(pixel.temp >= 525 && pixel.temp < 1582) {
			pixel.lerpValue = (pixel.temp-524)/(1581-524)
			pixel.lerpAR = pixel.oldColor.split(",")[0].slice(4)
			pixel.lerpAG = pixel.oldColor.split(",")[1]
			pixel.lerpAB = pixel.oldColor.split(",")[2].slice(0,-1)
			pixel.lerpBR = colorTemperature2rgb(pixel.temp + 273.15).split(",")[0].slice(4)
			pixel.lerpBG = colorTemperature2rgb(pixel.temp + 273.15).split(",")[1]
			pixel.lerpBB = colorTemperature2rgb(pixel.temp + 273.15).split(",")[2].slice(0,-1)
			pixel.lerpedR = pixel.lerpBR*pixel.lerpValue + pixel.lerpAR*(1-pixel.lerpValue)
			pixel.lerpedG = pixel.lerpBG*pixel.lerpValue + pixel.lerpAG*(1-pixel.lerpValue)
			pixel.lerpedB = pixel.lerpBB*pixel.lerpValue + pixel.lerpAB*(1-pixel.lerpValue)
			pixel.lerpedColor = "rgb(" + pixel.lerpedR + "," + pixel.lerpedG + "," + pixel.lerpedB + ")"
			pixel.color = pixel.lerpedColor
		}
		if(pixel.temp >= 1582) {
			pixel.color = colorTemperature2rgb(pixel.temp + 273.15)
		}
		doHeat(pixel);
	},
	category: "special",
	temp: -273,
},

elements.rainbow_alt_test = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/180)));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/180+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/180+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "special",
}

runAfterLoad(function() {
  if(enabledMods.includes("mods/fey_and_more.js")) {
    aaa.push("poisonwater")
    aaa.push("poisonwater")
    aaa.push("poisonwater")
    aaa.push("poisonwater")
    aaa.push("mystic_fire")
    aaa.push("mystic_fire")
    aaa.push("firesea")
    aaa.push("firesea")
    aaa.push("firesea")
    aaa.push("poisonwater")
    aaa.push("poisonwater")
    aaa.push("poisonwater")
    aaa.push("poisonwater")
    aaa.push("mystic_fire")
    aaa.push("mystic_fire")
    aaa.push("firesea")
    aaa.push("firesea")
    aaa.push("firesea")
    aaa.push("lektre")
    aaa.push("lektre")
    aaa.push("lektre")
    bbb.push("poisonwater")
    bbb.push("poisonwater")
    bbb.push("poisonwater")
    bbb.push("poisonwater")
    bbb.push("mystic_fire")
    bbb.push("mystic_fire")
    bbb.push("firesea")
    bbb.push("firesea")
    bbb.push("firesea")
    bbb.push("poisonwater")
    bbb.push("poisonwater")
    bbb.push("poisonwater")
    bbb.push("poisonwater")
    bbb.push("mystic_fire")
    bbb.push("mystic_fire")
    bbb.push("firesea")
    bbb.push("firesea")
    bbb.push("firesea")
    bbb.push("lektre")
    bbb.push("lektre")
    bbb.push("lektre")
  }
  if(enabledMods.includes("mods/Neutronium Mod.js")) {
    aaa.push("flamer")
    aaa.push("flamebomb")
    aaa.push("flamer")
    aaa.push("flamebomb")
    bbb.push("flamer")
    bbb.push("flamebomb")
    bbb.push("flamer")
    bbb.push("flamebomb")
  }
  if(enabledMods.includes("mods/randomness.js")) {
    aaa.push("burning_unnamed_gas")
    aaa.push("burning_unnamed_gas")
    aaa.push("burning_unnamed_gas")
    aaa.push("burning_unnamed_gas")
    aaa.push("warp")
    aaa.push("warp")
    aaa.push("warp")
    aaa.push("warp")
    aaa.push("warp")
    aaa.push("warp")
    aaa.push("bomb_2")
    aaa.push("bomb_2")
    aaa.push("bomb_2")
    aaa.push("op_hottester_bomb")
    bbb.push("unnamed_gas")
    bbb.push("unnamed_gas")
    bbb.push("unnamed_gas")
    bbb.push("unnamed_gas")
    bbb.push("warp")
    bbb.push("warp")
    bbb.push("warp")
    bbb.push("warp")
    bbb.push("warp")
    bbb.push("warp")
  }
});
