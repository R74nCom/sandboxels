elements.delete_all_of_element = {
	name: "delete all of element",
	color: ["#a7a7a7", "#a7a7a7", "#a7a7a7", "#a7a7a7", "#000000", "#000000", "#000000", "#000000"],
	tool: function(pixel) {
		for (var i = 1; i < width; i++) {
			for (var j = 1; j < height; j++) {
				if (!isEmpty(i,j)) {
					if(pixelMap[i][j].element == pixel.element) {
						deletePixel(i,j)
					}
				}
			}
		}
	},
	category: "tools",
	excludeRandom: true,
};
