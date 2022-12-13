elements.amogus = {
	name: "Amogus",
	color: "#ffffff",
	cooldown: 6,
	tick: function(pixel) {
	pixel.arr=[["brick",  "brick",  "brick"],
			   ["brick",  "glass",  "glass"],
			   ["brick",  "brick",  "brick"],
			   ["brick",   "air",   "brick"]];
	pixel.carr=[[ "rgb(255,0,0)",	"rgb(255,0,0)",		"rgb(255,0,0)"	],
				[ "rgb(255,0,0)",	"rgb(0,255,255)",	"rgb(0,255,255)"],
				[ "rgb(255,0,0)",	"rgb(255,0,0)",		"rgb(255,0,0)"	],
				[ "rgb(255,0,0)",	"null",				"rgb(255,0,0)"	]];

		aa = (0 - (Math.floor(pixel.arr[0].length / 2))) //Center align code
		na = Math.abs(aa)
		if(pixel.arr[0].length % 2 == 1) {
			bb = ((Math.floor(pixel.arr[0].length / 2)) + 1)
		} else if(pixel.arr[0].length % 2 == 0) {
			bb = (Math.floor(pixel.arr[0].length / 2))
		}

		cc = (0 - (Math.floor(pixel.arr.length / 2)))
		nc = Math.abs(cc)
		if(pixel.arr.length % 2 == 1) {
			dd = ((Math.floor(pixel.arr.length / 2)) + 1)
		} else if(pixel.arr.length % 2 == 0) {
			dd = (Math.floor(pixel.arr.length / 2))
		}
		for (let j = cc; j < dd; j++) { //Iterative placing and coloring of pixels
			for (let i = aa; i < bb; i++) {
				if(!isEmpty(pixel.x+i,pixel.y+j,true)) {
					if(pixel.arr[j+nc][i+na] !== "null") {
						deletePixel(pixel.x+i,pixel.y+j)
					}
				}
				if(pixel.arr[j+nc][i+na]) {
					if(isEmpty(pixel.x+i,pixel.y+j,false) && pixel.arr[j+nc][i+na] !== "null" && pixel.arr[j+nc][i+na] !== "air") {
						createPixel(pixel.arr[j+nc][i+na],pixel.x+i,pixel.y+j)
						if(pixel.carr[j+nc][i+na]) {
							if(!isEmpty(pixel.x+i,pixel.y+j,true) && pixel.carr[j+nc][i+na] != "null") {
								pixelMap[pixel.x+i][pixel.y+j].color = pixel.carr[j+nc][i+na]
							}
						}
					}
				}
			}
		}
	},
	category:"structures",
	insulate: true,
	state: "solid",
	excludeRandom: true,
},

elements.amogus_seed = {
	name: "Amogus Seed",
	color: "#df2f47",
	cooldown: 6,
	behavior: [
		"DL:amogus_seed|DL:amogus_seed AND M2|DL:amogus_seed",
		"DL:amogus_seed|C2:amogus|DL:amogus_seed",
		"DL:amogus_seed|SW:amogus_seed AND DL:amogus_seed AND M1|DL:amogus_seed"
	],
	category:"structures",
	insulate: true,
	state: "solid",
	density: 2018,
}
