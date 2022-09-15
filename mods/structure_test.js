elements.room = {
	name: "Room",
	color: "#ffffff",
	arr: [],
	tick: function(pixel) {
	pixel.arr=[["brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "glass",  "glass",  "glass",  "glass",  "glass",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick"],
			  ["brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "glass",  "glass",  "glass",  "glass",  "glass",  "brick",  "battery","brick",  "brick",  "brick",  "brick",  "brick"],
			  ["glass",  "glass",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "light","light_bulb","air",    "air",    "air",    "glass",  "glass"],
			  ["glass",  "glass",  "light",  "light",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "light",  "air",    "air",    "air",    "glass",  "glass"],
			  ["glass",  "glass",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "brass"],
			  ["glass",  "glass",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "wood" ],
			  ["brick",  "brick",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "wood" ],
			  ["brick",  "brick",  "iron",   "straw",  "straw",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "wood" ],
			  ["brick",  "brick",  "iron",   "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "iron",   "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "wood" ],
			  ["brick",  "brick",  "iron",   "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "iron",   "air",    "air",    "light",  "air",    "air",    "air",    "wood",   "brass"],
			  ["brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick"],
			  ["brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick"]]

/*pixel.arr = [["brick","brick","brick","brick","brick"], //(Test pixel.array)
 ["brick","air",  "iron", "air",  "brick"],
 ["brick","iron", "air",  "iron", "brick"],
 ["brick","air",  "air",  "air",  "brick"],
 ["brick","brick","brick","brick","brick"]]*/

		aa = (0 - (Math.floor(pixel.arr[0].length / 2)))
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
		for (let j = cc; j < dd; j++) {
			for (let i = aa; i < bb; i++) {
				if(!isEmpty(pixel.x+i,pixel.y+j) && !outOfBounds(pixel.x+i,pixel.y+j)) {
					if(pixel.arr[j+nc][i+na] != "null" || pixel.arr[j+nc][i+na] == "air") {
						deletePixel(pixel.x+i,pixel.y+j)
					}
				}
				if(pixel.arr[j+nc][i+na]) {
					if(isEmpty(pixel.x+i,pixel.y+j) && pixel.arr[j+nc][i+na] != "null" && pixel.arr[j+nc][i+na] != "air" && !outOfBounds(pixel.x+i,pixel.y+j)) {
						createPixel(pixel.arr[j+nc][i+na],pixel.x+i,pixel.y+j)
					}
				}
			}
		}
	},
	category:"structures",
	insulate: true,
	state: "solid",
	excludeRandom: true,
};

elements.altroom = {
	name: "Altered Room",
	color: "#ffffff",
	arr: [],
	tick: function(pixel) {
	pixel.arr=[["brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick"],
			  ["brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "battery","brick",  "brick",  "brick",  "brick",  "brick"],
			  ["glass",  "glass",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "light","light_bulb","air",    "air",    "air",    "glass",  "glass"],
			  ["glass",  "glass",  "light",  "light",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "light",  "air",    "air",    "air",    "glass",  "glass"],
			  ["brass",  "wood",   "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "brass"],
			  ["wood",   "wood",   "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "wood" ],
			  ["wood",   "wood",   "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "wood" ],
			  ["wood",   "wood",   "air",    "air",    "iron",   "straw",  "straw",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "wood" ],
			  ["wood",   "wood",   "air",    "air",    "iron",   "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "iron",   "air",    "air",    "air",    "air",    "wood",   "wood" ],
			  ["brass",  "wood",   "air",    "air",    "iron",   "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "iron",   "light",  "air",    "air",    "air",    "wood",   "brass"],
			  ["brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick"],
			  ["brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick", "battery", "brick",  "brick",  "brick",  "brick",  "brick"]]

		aa = (0 - (Math.floor(pixel.arr[0].length / 2)))
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
		for (let j = cc; j < dd; j++) {
			for (let i = aa; i < bb; i++) {
				if(!isEmpty(pixel.x+i,pixel.y+j) && !outOfBounds(pixel.x+i,pixel.y+j)) {
					if(pixel.arr[j+nc][i+na] !=  "air" || pixel.arr[j+nc][i+na] == "air") {
						deletePixel(pixel.x+i,pixel.y+j)
					}
				}
				if(pixel.arr[j+nc][i+na]) {
					if(isEmpty(pixel.x+i,pixel.y+j) && pixel.arr[j+nc][i+na] !=  "air" && pixel.arr[j+nc][i+na] != "air" && !outOfBounds(pixel.x+i,pixel.y+j)) {
						createPixel(pixel.arr[j+nc][i+na],pixel.x+i,pixel.y+j)
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

elements.nst = {
	name: "Nested Structure Test",
	color: "#ffffff",
	arr: [],
	tick: function(pixel) {
	pixel.arr=[["altroom",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "brick",    "brick" ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "brick",    "brick" ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   ["altroom",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "brick",    "brick" ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "brick",    "brick" ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   ["altroom",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "brick",    "brick" ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "brick",    "brick" ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   ["altroom",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "brick",    "brick" ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "brick",    "brick" ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   ["altroom",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",      "air"  ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "brick",    "brick" ],
			   [  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "brick",    "brick" ]]

		aa = (0 - (Math.floor(pixel.arr[0].length / 2)))
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
		for (let j = cc; j < dd; j++) {
			for (let i = aa; i < bb; i++) {
				if(!isEmpty(pixel.x+i,pixel.y+j) && !outOfBounds(pixel.x+i,pixel.y+j)) {
					if(pixel.arr[j+nc][i+na] !=  "air" || pixel.arr[j+nc][i+na] == "air") {
						deletePixel(pixel.x+i,pixel.y+j)
					}
				}
				if(pixel.arr[j+nc][i+na]) {
					if(isEmpty(pixel.x+i,pixel.y+j) && pixel.arr[j+nc][i+na] !=  "air" && pixel.arr[j+nc][i+na] != "air" && !outOfBounds(pixel.x+i,pixel.y+j)) {
						createPixel(pixel.arr[j+nc][i+na],pixel.x+i,pixel.y+j)
					}
				}
			}
		}
	},
	category:"structures",
	insulate: true,
	state: "solid",
	excludeRandom: true,
};
