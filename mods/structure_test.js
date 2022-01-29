elements.room = {
	name: "Room",
	color: "#ffffff",
	tick: function(pixel) {
		arr =[["brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "glass",  "glass",  "glass",  "glass",  "glass",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick"],
			  ["brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "glass",  "glass",  "glass",  "glass",  "glass",  "brick",  "battery","brick",  "brick",  "brick",  "brick",  "brick"],
			  ["glass",  "glass",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",   "light","light_bulb","air",    "air",    "air",    "glass",  "glass"],
			  ["glass",  "glass",  "light",  "light",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "light",  "air",    "air",    "air",    "glass",  "glass"],
			  ["glass",  "glass",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "brass"],
			  ["glass",  "glass",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "wood" ],
			  ["brick",  "brick",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "wood" ],
			  ["brick",  "brick",  "straw",  "straw",  "straw",  "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "wood" ],
			  ["brick",  "brick",  "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "iron",   "air",    "air",    "air",    "air",    "air",    "air",    "wood",   "wood" ],
			  ["brick",  "brick",  "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "straw",  "iron",   "air",    "air",    "light",  "air",    "air",    "air",    "wood",   "brass"],
			  ["brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick"],
			  ["brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick"]]

/*arr = [["brick","brick","brick","brick","brick"], //(Test Array)
 ["brick","air",  "iron", "air",  "brick"],
 ["brick","iron", "air",  "iron", "brick"],
 ["brick","air",  "air",  "air",  "brick"],
 ["brick","brick","brick","brick","brick"]]*/

		aa = (0 - (Math.floor(arr[0].length / 2)))
		na = Math.abs(aa)
		if(arr[0].length % 2 == 1) {
			bb = ((Math.floor(arr[0].length / 2)) + 1)
		} else if(arr[0].length % 2 == 0) {
			bb = (Math.floor(arr[0].length / 2))
		}

		cc = (0 - (Math.floor(arr.length / 2)))
		nc = Math.abs(cc)
		if(arr.length % 2 == 1) {
			dd = ((Math.floor(arr.length / 2)) + 1)
		} else if(arr.length % 2 == 0) {
			dd = (Math.floor(arr.length / 2))
		}
		for (let j = cc; j < dd; j++) {
			for (let i = aa; i < bb; i++) {
				if(!isEmpty(pixel.x+i,pixel.y+j) && !outOfBounds(pixel.x+i,pixel.y+j)) {
					if(arr[j+nc][i+na] != "null" || arr[j+nc][i+na] == "air") {
						deletePixel(pixel.x+i,pixel.y+j)
					}
				}
				if(arr[j+nc][i+na]) {
					if(isEmpty(pixel.x+i,pixel.y+j) && arr[j+nc][i+na] != "null" && arr[j+nc][i+na] != "air" && !outOfBounds(pixel.x+i,pixel.y+j)) {
						createPixel(arr[j+nc][i+na],pixel.x+i,pixel.y+j)
					}
				}
			}
		}
	},
	category:"structures",
	insulate: true,
	state: "solid",
}
