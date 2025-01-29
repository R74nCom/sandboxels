elements.netherite = {
    color: "#454141"
    behavior: behaviors.WALL
    category: "yes""
    state: "solid",
}
elements.Kids_Toy = {
    color: "#20aee6"
    behavior: behaviors.BOUNCY
    category: "yes"
    state: "solid",
}
elements.InsertElementNameHere = {
    color: "#7d480c"
    behavior: behaviors.SUPERFLUID
    burnInto: "primordial_soup"
    burn: 100
    category: "yes"
    state: "liquid",
}
elements.amogus = {
	name: "IMPOSTER",
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
	category: "yes",
	insulate: true,
	state: "solid",
	excludeRandom: true,
}
elements.gel = {
     behavior: behaviors.SOLID,
     category: "yes",
     state: "solid",
     color: "#faf8ca",
     ignoreAir: true,
     isFood: true,
}
elements.spit = {
    desc: "hawk tuah"
    color: ["#a6f5f0","#b6f0ec",],
    behavior: behaviors.LIQUID,
    category: "yes",
    state: "liquid",
    density: 1280,
    tempHigh: 105,
    stateHigh: ["steam","fragrance"],
    tempLow: -5,
    stateHigh: "saliva_ice",
    reactions: {
        "water": { elem1: null, chance: 0.5, elem2: "dirty_water", chance: 0.5,
}
}
}
elements.sandboxels = {
    color: "#e6d577",
    category: "yes",
    behavior: [
        "CL%3 AND CH:sand%10|M2|CL%3 AND CH:sand%10",
        "M2|M1|M2",
        "CL%3 AND CH:sand%10|M2|CL%3 AND CH:sand%10",
    ],
    reactions: {
        "sand": { elem1:"void", chance:0.1}
    }
}
