elements.st = {
	name: "Structure Test",
	color: "#ffffff",
	tick: function(pixel) {
		arr = 	[["brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "glass",  "glass",  "glass",  "glass",  "glass",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick",  "brick"],
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

/*arr = [["brick","brick","brick","brick","brick","brick","brick"], (Test Array)
 ["brick","air",  "iron", "air",  "brick","brick","brick"],
 ["brick","iron", "air",  "iron", "brick","brick","brick"],
 ["brick","air",  "air",  "air",  "brick","brick","brick"],
 ["brick","brick","brick","brick","brick","brick","brick"]]*/

		aa = (0 - (Math.floor(arr[0].length / 2)))
		na = Math.abs(aa)
		if(arr.length % 2 == 1) {
			bb = ((Math.floor(arr.length / 2)) + 1)
		} else if(arr.length % 2 == 0) {
			bb = (Math.floor(arr.length / 2))
		}
		/*TODO: proper negative array bound variables
		cc = (0 - (Math.floor(arr[0].length / 2)))
		nc = Math.abs(aa)
		if(arr.length % 2 == 1) {
			dd = ((Math.floor(arr.length / 2)) + 1)
		} else if(arr.length % 2 == 0) {
			dd = (Math.floor(arr.length / 2))
		}*/
		for (let i = aa; i < bb; i++) {
			for (let j = aa; j < bb; j++) {
				if(!isEmpty(pixel.x+i,pixel.y+j) && !outOfBounds(pixel.x+i,pixel.y+j)) {
					if(arr[i+na][j+na] != "null" || arr[i+na][j+na] == "air") {
						deletePixel(pixel.x+i,pixel.y+j)
					}
				}
				if(isEmpty(pixel.x+i,pixel.y+j) && arr[i+na][j+na] != "null" && arr[i+na][j+na] != "air" && !outOfBounds(pixel.x+i,pixel.y+j)) {
					createPixel(arr[i+na][j+na],pixel.x+i,pixel.y+j)
				}
			}
		}
	},
	category:"special",
	insulate: true,
	state: "solid",
}